
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
  responsiveMode: 'desktop' | 'drawer' | 'sheet';
}

const renderTypeIcon = (type: string) => {
  const props = { className: "w-3 h-3 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" };
  const stroke = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 2 };
  switch (type.toLowerCase()) {
    case 'chapter':
      return <svg {...props}><path {...stroke} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'school':
      return <svg {...props}><path {...stroke} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>;
    case 'person':
      return <svg {...props}><path {...stroke} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
    default:
      return null;
  }
};

const DetailsPanel: React.FC<DetailsPanelProps> = ({ selectedId, data, onNavigate, hideAnswers, isCollapsed, onToggle, responsiveMode }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => { setRevealed({}); }, [selectedId]);

  const node = data.nodes.find(n => n.id === selectedId);
  const chapter = data.chapters.find(c => c.chapter_id === selectedId);
  const entity = node || chapter;

  const breadcrumbs = useMemo(() => {
    if (!entity) return [];
    const crumbs: { id: string, label: string }[] = [];
    if (node) {
      const ch = data.chapters.find(c => c.chapter_id === node.chapter_id);
      if (ch) crumbs.push({ id: ch.chapter_id, label: ch.title });
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

  // Desktop collapsed handle
  if (responsiveMode === 'desktop' && isCollapsed) {
    return (
      <div className="w-10 flex-shrink-0 bg-white border-l border-slate-200 h-screen flex flex-col items-center py-4 z-20 transition-all duration-300">
        <button onClick={onToggle} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded mb-4 transition-colors" aria-label="Rozwiń szczegóły" title="Rozwiń">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" transform="rotate(180 12 12)" /></svg>
        </button>
        <div className="flex-1 w-full relative">
           <div className="absolute top-10 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap origin-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{UI_PL.details}</span>
           </div>
        </div>
      </div>
    );
  }

  // Determine base styles based on mode
  let wrapperClasses = "bg-white flex flex-col font-sans transition-all duration-300 ease-in-out shadow-2xl z-50";
  if (responsiveMode === 'desktop') {
    wrapperClasses += ` w-[420px] h-screen border-l border-slate-200 ${isCollapsed ? '-mr-[420px]' : 'mr-0'}`;
  } else if (responsiveMode === 'drawer') {
    wrapperClasses += ` fixed top-0 right-0 w-[320px] h-screen ${isCollapsed ? 'translate-x-full' : 'translate-x-0'}`;
  } else if (responsiveMode === 'sheet') {
    wrapperClasses += ` fixed bottom-0 left-0 right-0 h-[70vh] rounded-t-3xl border-t border-slate-100 ${isCollapsed ? 'translate-y-full' : 'translate-y-0'}`;
  }

  if (!selectedId || !entity) {
    if (responsiveMode === 'desktop') {
        return (
            <div className={wrapperClasses}>
              <div className="p-4 border-b border-slate-50 flex justify-end">
                <button onClick={onToggle} className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors" title="Zwiń">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center text-slate-300">
                <div className="text-center p-8">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    <p className="text-[10px] uppercase font-black tracking-widest leading-loose">{UI_PL.select_node_hint}</p>
                </div>
              </div>
            </div>
          );
    }
    return null;
  }

  const isChapter = !node;
  const showContent = (key: string) => !hideAnswers || revealed[key];
  const typeKey = isChapter ? 'chapter' : (node as NodeRaw).type;
  const displayType = (UI_PL as any)[typeKey] || typeKey;

  return (
    <div className={wrapperClasses}>
      {/* Mobile Handle for Sheet */}
      {responsiveMode === 'sheet' && (
        <div className="h-1.5 w-12 bg-slate-200 rounded-full mx-auto mt-3 mb-1" />
      )}

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide pr-4">
            {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id}>
                {idx > 0 && <svg className="w-2.5 h-2.5 text-slate-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                <button 
                    onClick={() => onNavigate(crumb.id)}
                    className={`text-[9px] font-black uppercase tracking-tight transition-colors ${idx === breadcrumbs.length - 1 ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    {crumb.label.length > 20 ? crumb.label.slice(0, 17) + '...' : crumb.label}
                </button>
            </React.Fragment>
            ))}
        </div>
        <button onClick={onToggle} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0" aria-label="Zwiń" title="Zwiń">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        <div className="flex items-center justify-between">
            <span className="uppercase text-[9px] font-black px-2 py-1 rounded-lg bg-slate-100 text-slate-500 tracking-widest flex items-center">
                {renderTypeIcon(typeKey)}
                {displayType}
            </span>
            {entity.source_pages && (
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest opacity-60">
                {UI_PL.pages}: {entity.source_pages}
              </span>
            )}
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{isChapter ? (entity as ChapterRaw).title : (entity as NodeRaw).label}</h2>
        
        <div className="space-y-8">
            <section>
                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex justify-between items-center">
                    {UI_PL.summary} {hideAnswers && !revealed.summary && <span className="text-orange-500 animate-pulse text-[8px] tracking-normal font-bold uppercase">{UI_PL.reveal_content}</span>}
                </h3>
                <div onClick={() => setRevealed(r => ({...r, summary: true}))} className={`p-5 rounded-3xl border transition-all duration-300 ${!showContent('summary') ? 'bg-slate-50 cursor-pointer hover:bg-orange-50 blur-sm select-none border-transparent' : 'bg-blue-50/40 border-blue-100'}`}>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{isChapter ? (entity as ChapterRaw).one_liner : (entity as NodeRaw).summary}</p>
                </div>
            </section>

            {!isChapter && (entity as NodeRaw).details && (
                <section>
                    <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex justify-between items-center">
                        {UI_PL.details} {hideAnswers && !revealed.details && <span className="text-orange-500 text-[8px] tracking-normal font-bold uppercase">{UI_PL.reveal_content}</span>}
                    </h3>
                    <div onClick={() => setRevealed(r => ({...r, details: true}))} className={`p-5 rounded-3xl border transition-all duration-300 ${!showContent('details') ? 'bg-slate-50 cursor-pointer hover:bg-orange-50 blur-sm select-none border-transparent' : 'bg-white border-slate-100'}`}>
                        <p className="text-[13px] text-slate-600 leading-relaxed">{(entity as NodeRaw).details}</p>
                    </div>
                </section>
            )}

            {!isChapter && (entity as NodeRaw).keywords && (
                <section>
                    <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{UI_PL.concepts_and_terms}</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {(entity as NodeRaw).keywords.split('|').map((k, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all cursor-default">{k}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 pb-12">
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{UI_PL.connections}</h3>
            <div className="grid grid-cols-1 gap-2">
                {data.edges.filter(e => e.source_id === selectedId || e.target_id === selectedId).map((e, i) => {
                    const targetId = e.source_id === selectedId ? e.target_id : e.source_id;
                    const targetNode = data.nodes.find(n => n.id === targetId);
                    const targetChapter = data.chapters.find(c => c.chapter_id === targetId);
                    if (!targetNode && !targetChapter) return null;

                    const label = targetNode?.label || targetChapter?.title || targetId;
                    const type = targetNode?.type || (targetChapter ? 'chapter' : 'unknown');
                    const displayT = (UI_PL as any)[type] || type;
                    
                    return (
                        <button key={i} onClick={() => onNavigate(targetId)} className="text-left p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-50 hover:border-slate-200 group transition-all flex items-center justify-between">
                            <div className="pr-4 overflow-hidden">
                                <div className="text-[8px] text-slate-400 font-black uppercase mb-0.5 tracking-wider opacity-70">{e.relation}</div>
                                <div className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors flex items-center">
                                    <span className="mr-2 opacity-30 flex-shrink-0">{e.source_id === selectedId ? '→' : '←'}</span>
                                    <span className="truncate">{label}</span>
                                </div>
                            </div>
                            <span className="text-[8px] uppercase font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-lg flex-shrink-0">{displayT}</span>
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
