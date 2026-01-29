
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { TreeNode, NodeType, AppData, ViewMode, NodeRaw, ChapterRaw } from '../types';
import { UI_PL } from '../constants';

interface MindMapProps {
  data: TreeNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  fullData: AppData;
  showChapterRelations: boolean;
  mode: ViewMode;
  layoutTrigger: number;
}

// Visual Constants
const NODE_WIDTH = 180;
const NODE_HEIGHT = 40;
const COL_GAP = 120;
const ROW_GAP = 20;
const PADDING = 100;

// Type Icons (Reused) - Fixed Dimensions
const renderTypeIcon = (type: string) => {
  const props = { width: 18, height: 18, className: "node-icon", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" };
  const strokeProps = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 2 };

  switch (type.toLowerCase()) {
    case 'chapter':
      return <svg {...props}><path {...strokeProps} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'school':
      return <svg {...props}><path {...strokeProps} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
    case 'person':
      return <svg {...props}><path {...strokeProps} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    case 'experiment':
        return <svg {...props}><path {...strokeProps} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
    case 'method':
        return <svg {...props}><path {...strokeProps} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
    case 'concept':
        return <svg {...props}><path {...strokeProps} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
    case 'context':
        return <svg {...props}><path {...strokeProps} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    default:
      return null;
  }
};

const getTypeColor = (t: string) => {
  switch (t) {
    case NodeType.Chapter: return '#f1f5f9';
    case NodeType.School: return '#fff7ed';
    case NodeType.Person: return '#eff6ff';
    case NodeType.Experiment: return '#ecfdf5';
    case NodeType.Method: return '#faf5ff';
    case NodeType.Concept: return '#fdf2f8';
    case NodeType.Context: return '#f8fafc';
    default: return '#ffffff';
  }
};

const getTypeStroke = (t: string) => {
  switch (t) {
    case NodeType.Chapter: return '#475569';
    case NodeType.School: return '#ea580c';
    case NodeType.Person: return '#2563eb';
    case NodeType.Experiment: return '#059669';
    case NodeType.Method: return '#9333ea';
    case NodeType.Concept: return '#db2777';
    case NodeType.Context: return '#64748b';
    default: return '#cbd5e1';
  }
};

interface PlacedNode {
  id: string;
  data: NodeRaw | ChapterRaw;
  type: string;
  x: number;
  y: number;
}

const MindMap: React.FC<MindMapProps> = ({ data, selectedId, onSelect, fullData, showChapterRelations, mode, layoutTrigger }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<any>(null);

  const [placedNodes, setPlacedNodes] = useState<PlacedNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<{ id: string, label: string, type: string, time: string, summary: string, keywords: string[], x: number, y: number } | null>(null);

  // Helper: Sort nodes by Time (asc), then Name (asc)
  const sortNodes = (a: TreeNode, b: TreeNode) => {
    const aData = a.data;
    const bData = b.data;
    if (!aData || !bData) return 0;
    
    // Handle Unknowns last
    const aTime = aData.time_start === 'UNKNOWN' ? 9999 : parseInt(aData.time_start);
    const bTime = bData.time_start === 'UNKNOWN' ? 9999 : parseInt(bData.time_start);

    if (aTime !== bTime) return aTime - bTime;
    
    const aLabel = 'label' in aData ? aData.label : (aData as ChapterRaw).title;
    const bLabel = 'label' in bData ? bData.label : (bData as ChapterRaw).title;

    return (aLabel || '').localeCompare(bLabel || '');
  };

  // --- CUSTOM LAYOUT ENGINE ---
  const calculateLayout = useCallback(() => {
    if (!data || !data.children) return;

    // Flatten logic is now implied because buildTree returns children on the root
    const nodes = data.children;
    const newPlacedNodes: PlacedNode[] = [];

    // Define Columns based on Mode
    let columnDefinitions: { types: string[], xIndex: number }[] = [];

    if (mode === ViewMode.Story) {
      // Story Mode: Chapter/School -> Study -> Experiments -> People
      columnDefinitions = [
        { types: [NodeType.Chapter, NodeType.School], xIndex: 0 },
        { types: [NodeType.Concept, NodeType.Method, NodeType.Context], xIndex: 1 },
        { types: [NodeType.Experiment], xIndex: 2 },
        { types: [NodeType.Person], xIndex: 3 },
      ];
    } else {
      // Explore Mode: Chapters/Schools -> People -> Experiments -> Study
      columnDefinitions = [
        { types: [NodeType.Chapter, NodeType.School], xIndex: 0 },
        { types: [NodeType.Person], xIndex: 1 },
        { types: [NodeType.Experiment], xIndex: 2 },
        { types: [NodeType.Concept, NodeType.Method, NodeType.Context], xIndex: 3 },
      ];
    }

    // Group nodes by column
    const columnGroups: TreeNode[][] = [[], [], [], []];

    nodes.forEach(node => {
      const type = node.type;
      const colDef = columnDefinitions.find(cd => cd.types.includes(type));
      if (colDef) {
        columnGroups[colDef.xIndex].push(node);
      }
    });

    // Position Nodes
    columnGroups.forEach((group, colIndex) => {
      group.sort(sortNodes);

      let currentY = PADDING;
      
      group.forEach(node => {
        if (!node.data) return;

        const x = PADDING + colIndex * (NODE_WIDTH + COL_GAP);
        const y = currentY;
        
        newPlacedNodes.push({
          id: node.id,
          data: node.data,
          type: node.type,
          x,
          y
        });

        currentY += NODE_HEIGHT + ROW_GAP;
      });
    });

    setPlacedNodes(newPlacedNodes);

  }, [data, mode]);

  useEffect(() => { calculateLayout(); }, [calculateLayout]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom().scaleExtent([0.05, 4]).on('zoom', (e) => {
      d3.select('#zoom-wrapper').attr('transform', e.transform);
    });
    svg.call(zoom as any);
    zoomRef.current = zoom;
    // Initial Fit
    setTimeout(fitToView, 100); 
  }, [placedNodes.length]); 

  // Handle fit view triggers
  useEffect(() => {
    setTimeout(fitToView, 350);
  }, [layoutTrigger, placedNodes]);

  useEffect(() => {
    if (selectedId) focusSelected();
  }, [selectedId]);

  const fitToView = () => {
    if (!svgRef.current || placedNodes.length === 0) return;
    
    const xMin = d3.min(placedNodes, d => d.x)!;
    const xMax = d3.max(placedNodes, d => d.x + NODE_WIDTH)!;
    const yMin = d3.min(placedNodes, d => d.y)!;
    const yMax = d3.max(placedNodes, d => d.y + NODE_HEIGHT)!;

    const w = containerRef.current!.clientWidth;
    const h = containerRef.current!.clientHeight;
    
    const contentW = xMax - xMin + PADDING * 2;
    const contentH = yMax - yMin + PADDING * 2;
    
    const scale = Math.min(w / contentW, h / contentH, 1.2);
    const translateX = (w - contentW * scale) / 2 - xMin * scale + PADDING * scale;
    const translateY = (h - contentH * scale) / 2 - yMin * scale + PADDING * scale;

    d3.select(svgRef.current).transition().duration(500).call(
      zoomRef.current.transform, 
      d3.zoomIdentity.translate(translateX, translateY).scale(scale)
    );
  };

  const focusSelected = () => {
    if (!selectedId || !zoomRef.current || placedNodes.length === 0) return;
    const node = placedNodes.find(d => d.id === selectedId);
    if (!node) return;
    
    const w = containerRef.current!.clientWidth;
    const h = containerRef.current!.clientHeight;
    
    d3.select(svgRef.current!).transition().duration(750).call(
      zoomRef.current.transform,
      d3.zoomIdentity.translate(w / 2 - (node.x + NODE_WIDTH/2), h / 2 - (node.y + NODE_HEIGHT/2)).scale(1)
    );
  };

  // --- EDGE DRAWING ---
  const edgesToRender = useMemo(() => {
    const nodeMap = new Map(placedNodes.map(n => [n.id, n]));
    const renderedEdges: { source: PlacedNode, target: PlacedNode, label: string, isHighlighted: boolean }[] = [];

    fullData.edges.forEach(edge => {
      const source = nodeMap.get(edge.source_id);
      const target = nodeMap.get(edge.target_id);

      if (source && target) {
        let isVisible = false;
        let isHighlighted = false;

        if (mode === ViewMode.Story) {
          isVisible = true;
          if (selectedId && (edge.source_id === selectedId || edge.target_id === selectedId)) {
            isHighlighted = true;
          }
        } else {
          // Explore Mode: Only show edges connected to selectedId
          if (selectedId && (edge.source_id === selectedId || edge.target_id === selectedId)) {
            isVisible = true;
            isHighlighted = true;
          }
        }

        if (isVisible) {
          renderedEdges.push({ source, target, label: edge.relation, isHighlighted });
        }
      }
    });
    return renderedEdges;
  }, [placedNodes, fullData.edges, selectedId, mode]);

  const handleNodeMouseEnter = (e: React.MouseEvent, n: PlacedNode) => {
    const raw = n.data;
    const time = raw.time_start ? `${raw.time_start}-${raw.time_end || '?'}` : 'NIEZNANE';
    
    let summary = '';
    if ('summary' in raw) summary = raw.summary;
    else if ('one_liner' in raw) summary = (raw as ChapterRaw).one_liner;

    let keywords: string[] = [];
    if ('keywords' in raw) keywords = raw.keywords.split('|').slice(0, 3);
    
    const label = 'label' in raw ? raw.label : (raw as ChapterRaw).title;

    setHoveredNode({ id: n.id, label, type: n.type, time, summary, keywords, x: e.clientX, y: e.clientY });
  };

  const isNodeDimmed = (nodeId: string) => {
    if (!selectedId) return false;
    if (selectedId === nodeId) return false;
    const isNeighbor = fullData.edges.some(e => 
      (e.source_id === selectedId && e.target_id === nodeId) || 
      (e.target_id === selectedId && e.source_id === nodeId)
    );
    return !isNeighbor;
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-50 relative overflow-hidden">
      {/* Background Watermark - Absolute Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden z-0">
         <svg className="w-[80vh] h-[80vh] text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
      </div>

      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <button onClick={() => d3.select(svgRef.current!).transition().call(zoomRef.current.scaleBy, 1.5)} className="w-8 h-8 bg-white shadow-md rounded-full font-bold hover:bg-slate-50 transition-colors">+</button>
        <button onClick={() => d3.select(svgRef.current!).transition().call(zoomRef.current.scaleBy, 0.6)} className="w-8 h-8 bg-white shadow-md rounded-full font-bold hover:bg-slate-50 transition-colors">-</button>
        <button onClick={fitToView} className="p-1 px-3 bg-white shadow-md rounded-full text-[10px] uppercase font-bold hover:bg-slate-50 transition-colors whitespace-nowrap">{UI_PL.fit_view}</button>
      </div>

      <svg ref={svgRef} width="100%" height="100%" className="relative z-10">
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orientation="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-dimmed" markerWidth="6" markerHeight="6" refX="6" refY="3" orientation="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#cbd5e1" />
          </marker>
        </defs>
        <g id="zoom-wrapper">
          {edgesToRender.map((link, i) => {
            const sx = link.source.x + NODE_WIDTH;
            const sy = link.source.y + NODE_HEIGHT / 2;
            const tx = link.target.x;
            const ty = link.target.y + NODE_HEIGHT / 2;
            const path = `M${sx},${sy} C${(sx+tx)/2},${sy} ${(sx+tx)/2},${ty} ${tx},${ty}`;
            return (
              <path 
                key={`link-${i}`} 
                d={path} 
                fill="none" 
                stroke={link.isHighlighted ? '#3b82f6' : '#cbd5e1'} 
                strokeWidth={link.isHighlighted ? 2 : 1} 
                opacity={link.isHighlighted ? 1 : 0.4}
                markerEnd={link.isHighlighted ? "url(#arrow)" : "url(#arrow-dimmed)"}
              />
            );
          })}

          {placedNodes.map(n => {
            const sel = selectedId === n.id;
            const dimmed = isNodeDimmed(n.id);
            const label = 'label' in n.data ? n.data.label : (n.data as ChapterRaw).title;

            return (
              <g 
                key={n.id} 
                transform={`translate(${n.x},${n.y})`} 
                className="cursor-pointer transition-opacity duration-300"
                opacity={dimmed ? 0.3 : 1}
                onClick={() => onSelect(n.id)}
                onMouseEnter={(e) => handleNodeMouseEnter(e, n)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect 
                  width={NODE_WIDTH} 
                  height={NODE_HEIGHT} 
                  rx={6} 
                  fill={getTypeColor(n.type)} 
                  stroke={sel ? '#3b82f6' : getTypeStroke(n.type)} 
                  strokeWidth={sel ? 2 : 1} 
                  className={`shadow-sm ${sel ? 'filter drop-shadow-md' : ''}`}
                />
                
                {/* Fixed Icon Container */}
                <g transform="translate(12, 11)">
                   {renderTypeIcon(n.type)}
                </g>

                <text 
                  x={36} 
                  y={25} 
                  fontSize="11" 
                  fill="#1e293b" 
                  fontWeight={sel ? 'bold' : 'normal'} 
                  className="pointer-events-none select-none font-sans"
                >
                  {label.length > 21 ? label.slice(0, 19) + '...' : label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {hoveredNode && (
        <div 
          className="fixed pointer-events-none bg-white border border-slate-200 rounded-lg shadow-2xl p-3 z-50 w-64 transform -translate-x-1/2 -translate-y-[calc(100%+10px)] transition-all animate-in fade-in zoom-in duration-200"
          style={{ left: hoveredNode.x, top: hoveredNode.y }}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider bg-slate-100 px-1.5 py-0.5 rounded flex items-center">
                {renderTypeIcon(hoveredNode.type)}
                {(UI_PL as any)[hoveredNode.type] || hoveredNode.type}
            </span>
            <span className="text-[10px] font-mono text-slate-400">{hoveredNode.time}</span>
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1 leading-tight">{hoveredNode.label}</h4>
          {hoveredNode.summary && <p className="text-[11px] text-slate-500 leading-relaxed mb-2 line-clamp-2 italic">{hoveredNode.summary}</p>}
          <div className="flex flex-wrap gap-1">
            {hoveredNode.keywords.map(kw => <span key={kw} className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">{kw}</span>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMap;
