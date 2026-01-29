
import React, { useState, useEffect } from 'react';
import { TreeNode as TreeNodeType, NodeType } from '../types';

interface TreeNodeProps {
  node: TreeNodeType;
  selectedId: string | null;
  onSelect: (id: string) => void;
  depth?: number;
  forceExpand?: boolean;
}

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'root': return 'text-slate-900 font-bold';
    case NodeType.School: return 'text-orange-600';
    case NodeType.Person: return 'text-blue-600';
    case NodeType.Experiment: return 'text-emerald-600';
    case NodeType.Method: return 'text-purple-600';
    case NodeType.Concept: return 'text-pink-600';
    case NodeType.Context: return 'text-slate-500 italic';
    default: return 'text-slate-700';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'root': 
    case NodeType.Chapter:
      return (
      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    );
    case NodeType.School: return (
      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
    );
    case NodeType.Person: return (
      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    );
    case NodeType.Experiment: return (
      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    );
    default: return <div className="w-2 h-2 rounded-full bg-slate-400 mr-2 flex-shrink-0"></div>;
  }
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, selectedId, onSelect, depth = 0, forceExpand }) => {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded || false);

  useEffect(() => {
    if (forceExpand !== undefined) {
      setIsExpanded(forceExpand);
    } else if (node.matchesFilter) {
      setIsExpanded(true);
    }
  }, [node.matchesFilter, forceExpand]);

  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;
  const label = node.data ? ('label' in node.data ? node.data.label : node.data.title) : node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`select-none ${depth > 0 ? 'ml-4' : ''}`}>
      <div 
        className={`
          flex items-center py-1 px-2 rounded cursor-pointer transition-colors border-l-2
          ${isSelected 
            ? 'bg-blue-50 border-blue-600' 
            : 'hover:bg-slate-50 border-transparent'}
          ${node.matchesFilter ? 'bg-yellow-50' : ''}
        `}
        onClick={handleClick}
      >
        <div 
          onClick={hasChildren ? handleToggle : undefined}
          className={`mr-1 p-1 rounded hover:bg-slate-200 text-slate-400 ${hasChildren ? 'cursor-pointer' : 'invisible'}`}
        >
          {isExpanded ? (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          )}
        </div>

        <div className={`flex items-center ${getTypeColor(node.type)}`}>
           {getTypeIcon(node.type)}
           <span className="text-sm truncate max-w-[250px] sm:max-w-md" title={label}>
             {label}
           </span>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="border-l border-slate-200 ml-3">
          {node.children.map(child => (
            <TreeNode 
              key={child.id} 
              node={child} 
              selectedId={selectedId} 
              onSelect={onSelect} 
              depth={depth + 1}
              forceExpand={forceExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
