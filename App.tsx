
import React, { useState, useEffect, useMemo } from 'react';
import { AppData, FilterState, ViewMode, NodeType, TreeNode as TreeNodeType } from './types';
import { fetchData, buildTree } from './services/dataService';
import Sidebar from './components/Sidebar';
import DetailsPanel from './components/DetailsPanel';
import MindMap from './components/MindMap';
import { UI_PL } from './constants';

const INITIAL_FILTER: FilterState = {
  searchQuery: '',
  types: { [NodeType.Chapter]: true, [NodeType.School]: true, [NodeType.Person]: true, [NodeType.Experiment]: true, [NodeType.Concept]: true, [NodeType.Method]: true, [NodeType.Context]: true },
  yearStart: '', yearEnd: '', includeUnknown: true, studyLayerEnabled: false, hideAnswers: false,
  showPeople: true, showExperiments: true, showConnections: false
};

const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<ViewMode>(ViewMode.Story);
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeStoryChapterId, setActiveStoryChapterId] = useState<string | null>(null);
  const [showChapterRelations, setShowChapterRelations] = useState(false);
  const [patchCsv, setPatchCsv] = useState<string | undefined>(undefined);

  // Layout State
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(() => localStorage.getItem('leftPanelCollapsed') === 'true');
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(() => localStorage.getItem('rightPanelCollapsed') === 'true');
  const [layoutTrigger, setLayoutTrigger] = useState(0);

  useEffect(() => {
    fetchData(patchCsv).then((d) => {
      setData(d);
      setLoading(false);
      if (d.chapters.length && !activeStoryChapterId) {
        const firstChapterId = [...d.chapters].sort((a,b) => parseInt(a.order) - parseInt(b.order))[0].chapter_id;
        setActiveStoryChapterId(firstChapterId);
      }
    });
  }, [patchCsv]);

  // Sync internal relation toggle with the new multi-select layer
  useEffect(() => {
    if (mode === ViewMode.Story) {
        setShowChapterRelations(filter.showConnections);
    }
  }, [filter.showConnections, mode]);

  const toggleLeftPanel = () => {
    const newState = !leftPanelCollapsed;
    setLeftPanelCollapsed(newState);
    localStorage.setItem('leftPanelCollapsed', String(newState));
    setLayoutTrigger(t => t + 1);
  };

  const toggleRightPanel = () => {
    const newState = !rightPanelCollapsed;
    setRightPanelCollapsed(newState);
    localStorage.setItem('rightPanelCollapsed', String(newState));
    setLayoutTrigger(t => t + 1);
  };

  const mindMapData = useMemo(() => {
    if (!data) return null;
    // Pass activeStoryChapterId to buildTree so filtering happens at the source
    const nodes = buildTree(data, mode, filter, activeStoryChapterId);
    
    // Return a dummy root containing the flat list of nodes.
    // MindMap component will handle the custom layout.
    return { 
        id: 'layout-root', 
        type: NodeType.Chapter, 
        data: { title: 'Root' } as any, 
        children: nodes 
    } as TreeNodeType;

  }, [data, mode, filter, activeStoryChapterId]);

  const handleJumpToNode = (nodeId: string, chapterId?: string) => {
    if (chapterId && chapterId !== activeStoryChapterId) {
        setActiveStoryChapterId(chapterId);
    }
    setSelectedId(nodeId);
  };

  const mapKey = useMemo(() => {
    const filterHash = btoa(JSON.stringify(filter.types) + filter.searchQuery).slice(0, 8);
    // Include layoutTrigger in key to force re-mount if necessary, although component handles prop updates.
    // Changing key resets zoom state, which might be desired on major mode switches but not filters.
    // We will keep key stable on simple filters to allow transitions if we implement them, 
    // but the prompt says "clean render", so changing key ensures no D3 artifacts.
    return `${mode}_${activeStoryChapterId}_${filter.studyLayerEnabled}_${filterHash}`;
  }, [mode, activeStoryChapterId, filter.studyLayerEnabled, filter.types, filter.searchQuery]);

  if (loading || !mindMapData) return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-sans tracking-widest text-xs animate-pulse uppercase">{UI_PL.knowledge_initializing}</div>;

  const sortedChapters = data ? [...data.chapters].sort((a,b) => parseInt(a.order) - parseInt(b.order)) : [];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        mode={mode} setMode={setMode} filter={filter} setFilter={setFilter} onReset={() => setFilter(INITIAL_FILTER)} 
        chapters={sortedChapters} 
        activeChapterId={activeStoryChapterId} onSelectChapter={setActiveStoryChapterId} 
        showChapterRelations={showChapterRelations} setShowChapterRelations={setShowChapterRelations}
        onPatchUpload={setPatchCsv}
        fullData={data!}
        onJumpToNode={handleJumpToNode}
        isCollapsed={leftPanelCollapsed}
        onToggle={toggleLeftPanel}
      />

      <div className="flex-1 bg-slate-100 border-r border-slate-200 relative overflow-hidden flex flex-col transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none z-10 flex justify-center">
            <div className="bg-white/95 backdrop-blur px-6 py-2 rounded-full shadow-2xl text-xs font-black text-slate-700 border border-slate-200 flex items-center gap-4 transition-all">
                <span className={`uppercase tracking-widest px-2 py-0.5 rounded ${mode === ViewMode.Story ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{ (UI_PL as any)[mode] || mode }</span>
                <span className="w-px h-4 bg-slate-200"></span>
                <span className="truncate max-w-[300px] uppercase tracking-wider opacity-80">
                  {mode === ViewMode.Story 
                    ? (data!.chapters.find(c => c.chapter_id === activeStoryChapterId)?.title || UI_PL.chapter) 
                    : UI_PL.history_atlas}
                </span>
            </div>
        </div>
        <MindMap 
          key={mapKey}
          data={mindMapData} 
          selectedId={selectedId} 
          onSelect={setSelectedId} 
          fullData={data!} 
          showChapterRelations={showChapterRelations} 
          mode={mode}
          layoutTrigger={layoutTrigger}
        />
      </div>

      <DetailsPanel 
        selectedId={selectedId} 
        data={data!} 
        onNavigate={handleJumpToNode} 
        hideAnswers={filter.hideAnswers}
        isCollapsed={rightPanelCollapsed}
        onToggle={toggleRightPanel}
      />
    </div>
  );
};

export default App;
