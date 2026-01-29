
export enum NodeType {
  Chapter = 'chapter',
  School = 'school',
  Person = 'person',
  Experiment = 'experiment',
  Concept = 'concept',
  Method = 'method',
  Context = 'context',
}

export interface ChapterRaw {
  chapter_id: string;
  order: string;
  title: string;
  time_start: string;
  time_end: string;
  one_liner: string;
  source_pages: string;
}

export interface NodeRaw {
  id: string;
  label: string;
  type: string;
  chapter_id: string;
  time_start: string;
  time_end: string;
  summary: string;
  details: string;
  keywords: string;
  source_pages: string;
}

export interface EdgeRaw {
  source_id: string;
  target_id: string;
  relation: string;
  note: string;
  source_pages: string;
}

export interface AppData {
  chapters: ChapterRaw[];
  nodes: NodeRaw[];
  edges: EdgeRaw[];
}

// Added isExpanded and matchesFilter to TreeNode interface to resolve compilation errors in TreeNode component
export interface TreeNode {
  id: string;
  data?: NodeRaw | ChapterRaw;
  type: NodeType | 'root';
  children: TreeNode[];
  isExpanded?: boolean;
  matchesFilter?: boolean;
}

export interface FilterState {
  searchQuery: string;
  types: Record<string, boolean>;
  yearStart: number | '';
  yearEnd: number | '';
  includeUnknown: boolean;
  studyLayerEnabled: boolean;
  hideAnswers: boolean;
  // Multi-select layers for Story Mode
  showPeople: boolean;
  showExperiments: boolean;
  showConnections: boolean;
}

export enum ViewMode {
  Story = 'story',
  Explore = 'explore',
}
