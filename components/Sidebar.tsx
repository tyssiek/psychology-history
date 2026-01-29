
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FilterState, ViewMode, NodeType, ChapterRaw, AppData, NodeRaw } from '../types';
import { UI_PL } from '../constants';

interface SidebarProps {
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
  filter: FilterState;
  setFilter: (f: FilterState) => void;
  onReset: () => void;
  chapters: ChapterRaw[];
  activeChapterId: string | null;
  onSelectChapter: (id: string) => void;
  showChapterRelations: boolean;
  setShowChapterRelations: (val: boolean) => void;
  onPatchUpload: (csv: string) => void;
  fullData: AppData;
  onJumpToNode: (nodeId: string, chapterId?: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  responsiveMode: 'desktop' | 'drawer';
}

const renderTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'chapter':
      return <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'school':
      return <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
    case 'person':
      return <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    default:
      return null;
  }
};

const Sidebar: React.FC<SidebarProps> = ({
  mode,
  setMode,
  filter,
  setFilter,
  onReset,
  chapters,
  activeChapterId,
  onSelectChapter,
  onPatchUpload,
  fullData,
  onJumpToNode,
  isCollapsed,
  onToggle,
  responsiveMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleTypeChange = (type: string) => {
    setFilter({ ...filter, types: { ...filter.types, [type]: !filter.types[type] } });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPatchUpload(ev.target?.result as string);
    reader.readAsText(file);
  };

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const matches: { id: string, label: string, type: string, chapterId?: string, chapterTitle?: string }[] = [];

    fullData.chapters.forEach(c => {
      if (c.title.toLowerCase().includes(q)) {
        matches.push({ id: c.chapter_id, label: c.title, type: 'chapter' });
      }
    });

    fullData.nodes.forEach(n => {
      if (n.label.toLowerCase().includes(q) || n.keywords.toLowerCase().includes(q)) {
        const ch = fullData.chapters.find(c => c.chapter_id === n.chapter_id);
        matches.push({ id: n.id, label: n.label, type: n.type, chapterId: n.chapter_id, chapterTitle: ch?.title });
      }
    });

    return matches.slice(0, 10);
  }, [searchQuery, fullData]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Drawer classes vs Desktop classes
  const baseClasses = "bg-white h-screen flex flex-col font-sans z-50 transition-all duration-300 ease-in-out";
  const layoutClasses = responsiveMode === 'desktop' 
    ? `w-80 border-r border-slate-200 shadow-lg ${isCollapsed ? '-ml-80' : 'ml-0'}`
    : `fixed top-0 left-0 w-[280px] shadow-2xl border-r border-slate-200 ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`;

  // Collapsed handle for desktop only
  if (responsiveMode === 'desktop' && isCollapsed) {
    return (
      <div className="w-10 flex-shrink-0 bg-white border-r border-slate-200 h-screen flex flex-col items-center py-4 z-40 transition-all duration-300">
        <button onClick={onToggle} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded mb-4 transition-colors" aria-label="Rozwiń menu" title="Rozwiń">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
        <div className="flex-1 w-full relative">
           <div className="absolute top-10 left-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap origin-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{UI_PL.history_atlas}</span>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${layoutClasses}`}>
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">Atlas Psychologiczny</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 opacity-70">Historia i Współczesność</p>
        </div>
        <button onClick={onToggle} className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors" aria-label="Zwiń menu" title="Zwiń">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setMode(ViewMode.Story)} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === ViewMode.Story ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>{UI_PL.story}</button>
          <button onClick={() => setMode(ViewMode.Explore)} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === ViewMode.Explore ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>{UI_PL.explore}</button>
        </div>

        {/* Global Study Layer Toggle */}
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between">
            <div className="flex flex-col">
                <label className="text-[10px] font-black text-purple-700 uppercase tracking-wider">{UI_PL.study_layer}</label>
                <span className="text-[9px] text-purple-400 leading-none">Dodatkowe pojęcia i metody</span>
            </div>
            <button onClick={() => setFilter({ ...filter, studyLayerEnabled: !filter.studyLayerEnabled })} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${filter.studyLayerEnabled ? 'bg-purple-600' : 'bg-slate-300'}`}>
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${filter.studyLayerEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
        </div>

        {/* Learning Toggles (Story Mode Only) */}
        {mode === ViewMode.Story && (
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{UI_PL.learning_layers}</label>
            <div className="space-y-2">
              {[
                { key: 'showPeople', label: UI_PL.people, color: 'text-blue-600', bg: 'bg-blue-50' },
                { key: 'showExperiments', label: UI_PL.experiments, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { key: 'showConnections', label: UI_PL.connections, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map(layer => (
                <button 
                    key={layer.key}
                    onClick={() => setFilter({ ...filter, [layer.key]: !((filter as any)[layer.key]) })}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all ${ (filter as any)[layer.key] ? `${layer.bg} border-current ${layer.color}` : 'bg-white border-slate-100 text-slate-400' }`}
                >
                    <span className="text-[10px] font-bold uppercase tracking-wide">{layer.label}</span>
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${ (filter as any)[layer.key] ? 'border-current' : 'border-slate-200'}`}>
                        { (filter as any)[layer.key] && <div className="w-2 h-2 rounded-full bg-current" /> }
                    </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Typeahead */}
        <div className="relative" ref={searchRef}>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{UI_PL.jump_to_knowledge}</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder={UI_PL.search_placeholder} 
              value={searchQuery} 
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }} 
              className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50" 
            />
            <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto">
              {searchResults.map((res) => (
                <button 
                  key={res.id} 
                  onClick={() => { 
                    onJumpToNode(res.id, res.chapterId); 
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }} 
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 group transition-colors"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{res.label}</span>
                    <span className="text-[9px] uppercase font-black text-slate-300 px-1.5 py-0.5 bg-slate-50 rounded flex items-center">
                        {renderTypeIcon(res.type)}
                        {(UI_PL as any)[res.type] || res.type}
                    </span>
                  </div>
                  {res.chapterTitle && <div className="text-[9px] text-slate-400 italic">W: {res.chapterTitle}</div>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hide Answers Toggle */}
        <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
            <label className="text-[10px] font-black text-orange-700 uppercase tracking-widest">{UI_PL.hide_answers}</label>
            <button onClick={() => setFilter({ ...filter, hideAnswers: !filter.hideAnswers })} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${filter.hideAnswers ? 'bg-orange-600' : 'bg-slate-300'}`}>
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${filter.hideAnswers ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
        </div>

        {/* Explore Mode Filters */}
        {mode === ViewMode.Explore && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{UI_PL.visible_node_types}</label>
            <div className="grid grid-cols-2 gap-2">
              {[NodeType.Chapter, NodeType.School, NodeType.Person, NodeType.Experiment].map(type => (
                <label key={type} className="flex items-center space-x-2 text-[10px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-white transition-all">
                  <input type="checkbox" checked={filter.types[type] || false} onChange={() => handleTypeChange(type)} className="rounded text-blue-600 border-slate-300" />
                  <span className="capitalize font-bold">{(UI_PL as any)[type] || type}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Story Mode: Chapter List */}
        {mode === ViewMode.Story && (
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Rozdziały</label>
            <div className="space-y-1">
              {chapters.map(c => (
                <button key={c.chapter_id} onClick={() => onSelectChapter(c.chapter_id)} className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] transition-all ${activeChapterId === c.chapter_id ? 'bg-blue-600 text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span className="truncate block">{c.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <button onClick={onReset} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">{UI_PL.reset_default}</button>
          <div className="text-center opacity-30 text-[9px] font-bold uppercase tracking-widest pb-4">Atlas Psychologii v2.0</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
