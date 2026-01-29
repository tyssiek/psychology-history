
import { CSV_CHAPTERS, CSV_EDGES, CSV_NODES } from '../constants';
import { AppData, ChapterRaw, EdgeRaw, NodeRaw, NodeType, TreeNode, ViewMode, FilterState } from '../types';

const parseCSV = <T>(csvText: string): T[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const result: T[] = [];
  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    let currentLine = lines[i];
    let values: string[] = [];
    let insideQuote = false;
    let value = '';
    for (const char of currentLine) {
      if (char === '"') insideQuote = !insideQuote;
      else if (char === ',' && !insideQuote) {
        values.push(value.trim());
        value = '';
      } else value += char;
    }
    values.push(value.trim());
    headers.forEach((header, index) => {
      let val = values[index] || '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      obj[header] = val;
    });
    result.push(obj as T);
  }
  return result;
};

export const fetchData = async (patchCsv?: string): Promise<AppData> => {
  let nodes: NodeRaw[] = [];
  let chapters: ChapterRaw[] = [];
  let edges: EdgeRaw[] = [];

  try {
    const [nodesRes, chaptersRes, edgesRes] = await Promise.all([
      fetch('/data/nodes.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/data/chapters.json').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/data/edges.json').then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    if (nodesRes && chaptersRes && edgesRes) {
      nodes = nodesRes;
      chapters = chaptersRes;
      edges = edgesRes;
      console.log('Data loaded from JSON successfully.');
    } else {
      throw new Error('Falling back to CSV');
    }
  } catch (e) {
    console.warn('JSON fetch failed, falling back to local CSV strings.', e);
    nodes = parseCSV<NodeRaw>(CSV_NODES);
    chapters = parseCSV<ChapterRaw>(CSV_CHAPTERS);
    edges = parseCSV<EdgeRaw>(CSV_EDGES);
  }

  if (patchCsv) {
    const patchedNodes = parseCSV<NodeRaw>(patchCsv);
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    patchedNodes.forEach(p => {
      if (nodeMap.has(p.id)) {
        const existing = nodeMap.get(p.id)!;
        Object.keys(p).forEach(key => {
          const k = key as keyof NodeRaw;
          if (p[k]) (existing as any)[k] = p[k];
        });
      } else {
        nodes.push(p);
      }
    });
  }
  return { chapters, nodes, edges };
};

// Helper: Parse year for sorting
const getYear = (timeStr: string): number => {
  if (!timeStr || timeStr === 'UNKNOWN') return 9999;
  const y = parseInt(timeStr);
  return isNaN(y) ? 9999 : y;
};

const isNodeVisible = (node: NodeRaw, filter: FilterState, mode: ViewMode, activeChapterId: string | null): boolean => {
  // A) Story Mode Filters
  if (mode === ViewMode.Story) {
    // 1. Must be in the active chapter
    if (node.chapter_id !== activeChapterId) return false;

    // 2. Filter by Type toggles
    const isCore = [NodeType.Chapter, NodeType.School].includes(node.type as NodeType);
    if (!isCore) {
      if (node.type === NodeType.Person && !filter.showPeople) return false;
      if (node.type === NodeType.Experiment && !filter.showExperiments) return false;
    }
  } 
  // B) Explore Mode Filters
  else {
    // Manual type filters
    if (!filter.types[node.type] && node.type !== 'chapter') return false;
  }

  // C) Common Study Layer Logic
  const isStudyType = [NodeType.Concept, NodeType.Method, NodeType.Context].includes(node.type as NodeType);
  if (isStudyType && !filter.studyLayerEnabled) return false;

  // D) Time Filters
  if (node.time_start === 'UNKNOWN' || node.time_end === 'UNKNOWN') {
    if (!filter.includeUnknown) return false;
  } else {
    const start = parseInt(node.time_start);
    const end = parseInt(node.time_end);
    const filterStart = filter.yearStart === '' ? -9999 : filter.yearStart;
    const filterEnd = filter.yearEnd === '' ? 9999 : filter.yearEnd;
    if (!isNaN(start) && !isNaN(end) && !(start <= filterEnd && end >= filterStart)) return false;
  }

  // E) Search Filtering
  if (filter.searchQuery.trim() !== '') {
    const q = filter.searchQuery.toLowerCase();
    return node.label.toLowerCase().includes(q) || node.keywords.toLowerCase().includes(q) || node.summary.toLowerCase().includes(q);
  }

  return true;
};

// We now return a FLAT structure of children for the layout engine to organize.
// No more deep nesting (e.g. School -> Person) because we want specific columns.
export const buildTree = (data: AppData, mode: ViewMode, filter: FilterState, activeChapterId: string | null = null): TreeNode[] => {
  const { chapters, nodes } = data;
  
  // 1. Identify relevant nodes based on visibility logic
  let relevantNodes = nodes.filter(n => isNodeVisible(n, filter, mode, activeChapterId));

  // 2. In Explore Mode, we also need the Chapter nodes themselves if they match filters
  if (mode === ViewMode.Explore && filter.types[NodeType.Chapter]) {
    // Create NodeRaw-like objects for chapters to treat them uniformly
    const chapterNodes = chapters.map(c => ({
      id: c.chapter_id,
      label: c.title,
      type: NodeType.Chapter,
      chapter_id: c.chapter_id,
      time_start: c.time_start,
      time_end: c.time_end,
      summary: c.one_liner,
      details: '',
      keywords: 'chapter',
      source_pages: c.source_pages
    } as NodeRaw));
    
    // Filter chapters by search/time if needed ( reusing isNodeVisible logic partially )
    const visibleChapters = chapterNodes.filter(c => {
       // Minimal check for search/time on chapters
       if (filter.searchQuery.trim() !== '') {
         const q = filter.searchQuery.toLowerCase();
         if (!c.label.toLowerCase().includes(q) && !c.summary.toLowerCase().includes(q)) return false;
       }
       return true; 
    });

    relevantNodes = [...visibleChapters, ...relevantNodes];
  }

  // 3. Convert to TreeNode format
  // We return a flat list. The MindMap component will handle the columnar layout.
  return relevantNodes.map(n => ({
    id: n.id,
    data: n,
    type: n.type as NodeType,
    children: [], // No nesting
    matchesFilter: filter.searchQuery.length > 0 // Simple highlighter flag
  }));
};
