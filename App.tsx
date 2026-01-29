
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

const BREAKPOINTS = {
  DESKTOP: 1200,
  TABLET: 768
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

  // Responsive State
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isDesktop = windowWidth >= BREAKPOINTS.DESKTOP;
  const isTablet = windowWidth >= BREAKPOINTS.TABLET && windowWidth < BREAKPOINTS.DESKTOP;
  const isMobile = windowWidth < BREAKPOINTS.TABLET;

  // Layout State
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(() => {
    if (window.innerWidth < BREAKPOINTS.DESKTOP) return true;
    return localStorage.getItem('leftPanelCollapsed') === 'true';
  });
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(() => {
    if (window.innerWidth < BREAKPOINTS.DESKTOP) return true;
    return localStorage.getItem('rightPanelCollapsed') === 'true';
  });
  
  // Drawer visibility for Tablet/Mobile
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [layoutTrigger, setLayoutTrigger] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync mobile/tablet states when crossing breakpoints
  useEffect(() => {
    if (isDesktop) {
      setLeftPanelCollapsed(localStorage.getItem('leftPanelCollapsed') === 'true');
      setRightPanelCollapsed(localStorage.getItem('rightPanelCollapsed') === 'true');
      setIsSidebarDrawerOpen(false);
    } else {
      setLeftPanelCollapsed(true);
      setRightPanelCollapsed(true);
    }
  }, [isDesktop]);

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

  useEffect(() => {
    if (mode === ViewMode.Story) {
        setShowChapterRelations(filter.showConnections);
    }
  }, [filter.showConnections, mode]);

  const toggleLeftPanel = () => {
    if (isDesktop) {
      const newState = !leftPanelCollapsed;
      setLeftPanelCollapsed(newState);
      localStorage.setItem('leftPanelCollapsed', String(newState));
    } else {
      setIsSidebarDrawerOpen(!isSidebarDrawerOpen);
    }
    setLayoutTrigger(t => t + 1);
  };

  const toggleRightPanel = () => {
    if (isDesktop) {
      const newState = !rightPanelCollapsed;
      setRightPanelCollapsed(newState);
      localStorage.setItem('rightPanelCollapsed', String(newState));
    } else {
      setIsDetailsOpen(!isDetailsOpen);
    }
    setLayoutTrigger(t => t + 1);
  };

  const handleJumpToNode = useCallback((nodeId: string, chapterId?: string) => {
    if (chapterId && chapterId !== activeStoryChapterId) {
        setActiveStoryChapterId(chapterId);
    }
    setSelectedId(nodeId);
    // Auto open details on selection in mobile/tablet
    if (!isDesktop) {
      setIsDetailsOpen(true);
      setIsSidebarDrawerOpen(false);
    }
  }, [activeStoryChapterId, isDesktop]);

  const mindMapData = useMemo(() => {
    if (!data) return null;
    const nodes = buildTree(data, mode, filter, activeStoryChapterId);
    return { 
        id: 'layout-root', 
        type: NodeType.Chapter, 
        data: { title: 'Root' } as any, 
        children: nodes 
    } as TreeNodeType;
  }, [data, mode, filter, activeStoryChapterId]);

  const mapKey = useMemo(() => {
    const filterHash = btoa(JSON.stringify(filter.types) + filter.searchQuery).slice(0, 8);
    return `${mode}_${activeStoryChapterId}_${filter.studyLayerEnabled}_${filterHash}`;
  }, [mode, activeStoryChapterId, filter.studyLayerEnabled, filter.types, filter.searchQuery]);

  if (loading || !mindMapData) return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-sans tracking-widest text-xs animate-pulse uppercase">{UI_PL.knowledge_initializing}</div>;

  const sortedChapters = data ? [...data.chapters].sort((a,b) => parseInt(a.order) - parseInt(b.order)) : [];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 relative">
      {/* Sidebar - Persistent on Desktop, Drawer on Tablet/Mobile */}
      <Sidebar 
        mode={mode} setMode={setMode} filter={filter} setFilter={setFilter} onReset={() => setFilter(INITIAL_FILTER)} 
        chapters={sortedChapters} 
        activeChapterId={activeStoryChapterId} onSelectChapter={setActiveStoryChapterId} 
        showChapterRelations={showChapterRelations} setShowChapterRelations={setShowChapterRelations}
        onPatchUpload={setPatchCsv}
        fullData={data!}
        onJumpToNode={handleJumpToNode}
        isCollapsed={isDesktop ? leftPanelCollapsed : !isSidebarDrawerOpen}
        onToggle={toggleLeftPanel}
        responsiveMode={isDesktop ? 'desktop' : 'drawer'}
      />

      {/* Main Content Area (Map) */}
      <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Top Controls Bar */}
        <div className="absolute top-0 left-0 right-0 p-3 pointer-events-none z-30 flex justify-between items-start">
            <div className="flex gap-2">
              <button 
                onClick={toggleLeftPanel} 
                className="pointer-events-auto p-2 bg-white/95 backdrop-blur shadow-lg border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 transition-colors"
                title="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-lg text-xs font-black text-slate-700 border border-slate-200 flex items-center gap-3 transition-all">
                <span className={`uppercase tracking-widest px-2 py-0.5 rounded text-[10px] ${mode === ViewMode.Story ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{ (UI_PL as any)[mode] || mode }</span>
                <span className="w-px h-3 bg-slate-200"></span>
                <span className="truncate max-w-[120px] sm:max-w-[300px] uppercase tracking-wider opacity-80 text-[10px] sm:text-xs">
                  {mode === ViewMode.Story 
                    ? (data!.chapters.find(c => c.chapter_id === activeStoryChapterId)?.title || UI_PL.chapter) 
                    : UI_PL.history_atlas}
                </span>
            </div>

            <div className="flex gap-2">
               {selectedId && (
                 <button 
                  onClick={toggleRightPanel} 
                  className="pointer-events-auto p-2 bg-white/95 backdrop-blur shadow-lg border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 transition-colors"
                  title="Szczegóły"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
               )}
            </div>
        </div>

        <MindMap 
          key={mapKey}
          data={mindMapData} 
          selectedId={selectedId} 
          onSelect={(id) => {
            setSelectedId(id);
            if (!isDesktop) setIsDetailsOpen(true);
          }} 
          fullData={data!} 
          showChapterRelations={showChapterRelations} 
          mode={mode}
          layoutTrigger={layoutTrigger}
        />
      </div>

      {/* Details - Persistent on Desktop, Drawer/Sheet on Tablet/Mobile */}
      <DetailsPanel 
        selectedId={selectedId} 
        data={data!} 
        onNavigate={handleJumpToNode} 
        hideAnswers={filter.hideAnswers}
        isCollapsed={isDesktop ? rightPanelCollapsed : !isDetailsOpen}
        onToggle={toggleRightPanel}
        responsiveMode={isDesktop ? 'desktop' : (isMobile ? 'sheet' : 'drawer')}
      />

      {/* Mobile/Tablet Backdrop for Sidebar */}
      {!isDesktop && isSidebarDrawerOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarDrawerOpen(false)}
        />
      )}
      
      {/* Mobile/Tablet Backdrop for Details (Tablet only, Mobile uses sheet) */}
      {isTablet && isDetailsOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-40 transition-opacity"
          onClick={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
