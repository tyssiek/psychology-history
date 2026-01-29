
import React, { useState, useEffect, useMemo } from 'react';
import { AppData, NodeRaw, ChapterRaw, NodeType } from '../types';
import { UI_PL } from '../constants';

interface DetailsPanelProps {
  selectedId: string | null;
  data: AppData;
  onNavigate: (id: string) => void;
  hideAnswers: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
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

const DetailsPanel: React.FC<DetailsPanelProps> = ({ selectedId, data, onNavigate, hideAnswers, isCollapsed, onToggle }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => { setRevealed({}); }, [selectedId]);

  const node = data.nodes.find(n => n.id === selectedId);
  const chapter = data.chapters.find(c => c.chapter_id === selectedId);
  const entity = node || chapter;

  // Breadcrumb logic
  const breadcrumbs = useMemo(() => {
    if (!entity) return [];
    const crumbs: { id: string, label: string }[] = [];

    if (node) {
      const ch = data.chapters.find(c => c.chapter_id === node.chapter_id);
      if (ch) crumbs.push({ id: ch.chapter_id, label: ch.title });

      // Check if member of school
      const schoolRel = data.edges.find(e => e.source_id === node.id && e.relation === 'member_of');
      if (schoolRel) {
        const schoolNode = data.nodes.find(n => n.id === schoolRel.target_id);
        if (schoolNode) crumbs.push({ id: schoolNode.id, label: schoolNode.label });
      }

      crumbs.push({ id: node.id, label: node.label });
    } else if (chapter) {
      crumbs.push({ id: chapter.chapter_id, label: chapter.title });
    }

    return crumbs;
  }, [entity, data]);

  if (isCollapsed) {
    return (
      <div className="w-10 flex-shrink-0 bg-white border-l border-slate-200 h-screen flex flex-col items-center py-4 z-20 transition-all duration-300">
        <button onClick={onToggle} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded mb-4 transition-colors" aria-label="Rozwiń szczegóły" title="Rozwiń">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" transform="rotate(180 12 12)" /></svg>
        </button>
        <div className="flex-1 w-full relative">
           <div className="absolute top-10 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap origin-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{UI_PL.details}</span>
           </div>
        </div>
      </div>
    );
  }

  if (!selectedId || !entity) return (
    <div className="flex-1 min-w-[350px] bg-white h-screen flex flex-col border-l border-slate-200 font-sans transition-all duration-300">
      <div className="p-4 border-b border-slate-50 flex justify-end">
        <button onClick={onToggle} className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors" aria-label="Zwiń szczegóły" title="Zwiń">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center text-slate-400">
        <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <p className="text-xs uppercase font-bold tracking-widest">{UI_PL.select_node_hint}</p>
        </div>
      </div>
    </div>
  );

  const isChapter = !node;
  const showContent = (key: string) => !hideAnswers || revealed[key];
  const typeKey = isChapter ? 'chapter' : (node as NodeRaw).type;
  const displayType = (UI_PL as any)[typeKey] || typeKey;

  return (
    <div className="flex-1 min-w-[350px] bg-white h-screen overflow-y-auto border-l border-slate-200 flex flex-col font-sans transition-all duration-300">
      {/* Breadcrumb Header */}
      <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id}>
                {idx > 0 && <svg className="w-3 h-3 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                <button 
                    onClick={() => onNavigate(crumb.id)}
                    className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${idx === breadcrumbs.length - 1 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    {crumb.label.length > 20 ? crumb.label.slice(0, 17) + '...' : crumb.label}
                </button>
            </React.Fragment>
            ))}
        </div>
        <button onClick={onToggle} className="ml-2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors flex-shrink-0" aria-label="Zwiń szczegóły" title="Zwiń">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="p-6 space-y-8">
        <div className="flex items-center space-x-2">
            <span className="uppercase text-[10px] font-black px-2 py-1 rounded bg-slate-100 text-slate-500 tracking-wider flex items-center">
                {renderTypeIcon(typeKey)}
                {displayType}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
                {entity.source_pages ? `${UI_PL.pages}: ${entity.source_pages}` : ''}
            </span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{isChapter ? (entity as ChapterRaw).title : (entity as NodeRaw).label}</h2>
        
        <div className="space-y-8">
            <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                    {UI_PL.summary} {hideAnswers && !revealed.summary && <span className="text-orange-500 animate-pulse text-[9px] lowercase font-bold">{UI_PL.reveal_content}</span>}
                </h3>
                <div onClick={() => setRevealed(r => ({...r, summary: true}))} className={`p-5 rounded-2xl border transition-all duration-300 ${!showContent('summary') ? 'bg-slate-50 cursor-pointer hover:bg-orange-50 blur-sm select-none' : 'bg-blue-50/30 border-blue-100 shadow-sm'}`}>
                    <p className="text-sm text-slate-700 leading-relaxed italic">{isChapter ? (entity as ChapterRaw).one_liner : (entity as NodeRaw).summary}</p>
                </div>
            </section>

            {!isChapter && (entity as NodeRaw).details && (
                <section>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                        {UI_PL.details} {hideAnswers && !revealed.details && <span className="text-orange-500 text-[9px] lowercase font-bold">{UI_PL.reveal_content}</span>}
                    </h3>
                    <div onClick={() => setRevealed(r => ({...r, details: true}))} className={`p-5 rounded-2xl border transition-all duration-300 ${!showContent('details') ? 'bg-slate-50 cursor-pointer hover:bg-orange-50 blur-sm select-none' : 'bg-white border-slate-100'}`}>
                        <p className="text-sm text-slate-600 leading-relaxed">{(entity as NodeRaw).details}</p>
                    </div>
                </section>
            )}

            {!isChapter && (entity as NodeRaw).keywords && (
                <section>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{UI_PL.concepts_and_terms}</h3>
                    <div className="flex flex-wrap gap-2">
                        {(entity as NodeRaw).keywords.split('|').map((k, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all cursor-default">{k}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{UI_PL.connections}</h3>
            <div className="grid grid-cols-1 gap-3">
                {data.edges.filter(e => e.source_id === selectedId || e.target_id === selectedId).map((e, i) => {
                    const targetId = e.source_id === selectedId ? e.target_id : e.source_id;
                    const targetNode = data.nodes.find(n => n.id === targetId);
                    const targetChapter = data.chapters.find(c => c.chapter_id === targetId);
                    const label = targetNode?.label || targetChapter?.title || targetId;
                    const type = targetNode?.type || (targetChapter ? 'chapter' : 'unknown');
                    const displayT = (UI_PL as any)[type] || type;
                    
                    return (
                        <button key={i} onClick={() => onNavigate(targetId)} className="text-left p-3 rounded-xl hover:bg-blue-50 border border-slate-50 hover:border-blue-100 group transition-all flex items-center justify-between">
                            <div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase mb-0.5 tracking-tighter opacity-70">{e.relation}</div>
                                <div className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors flex items-center">
                                    <span className="mr-2 opacity-40">{e.source_id === selectedId ? '→' : '←'}</span>
                                    {label}
                                </div>
                            </div>
                            <span className="text-[9px] uppercase font-bold text-slate-300 bg-slate-50 px-1.5 py-0.5 rounded-full group-hover:bg-blue-100 group-hover:text-blue-400 transition-all">{displayT}</span>
                        </button>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
