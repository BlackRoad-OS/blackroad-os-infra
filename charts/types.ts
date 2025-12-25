/**
 * Swimlane Kanban Chart Types
 * Supports visualization for 30,000 humans across multiple pods/teams
 */

export type KanbanColumn = 'backlog' | 'doing' | 'review' | 'blocked' | 'done';

export type TaskStatus = 'green' | 'red' | 'white' | 'empty';

export type TaskType = 
  | '📚' // docs
  | '🧬' // research
  | '💻' // coding
  | '🧪' // testing
  | '🚀' // deploy
  | '📦' // package
  | '🔐' // security
  | '🧯' // incident
  | '⛓️‍💥' // breaking change
  | '✅' // complete
  | '🎁' // gift/surprise
  | '🌱' // growing
  | '🛠' // working
  | '🔍'; // reviewing

export type Mood = 
  | '🙂' // happy
  | '😐' // neutral
  | '🫥' // empty/uncertain
  | '😭' // sad/stressed
  | '🥳' // celebrating
  | '🌱' // growing
  | '🔥' // on fire
  | '✨' // sparkling
  | '❄️' // frozen/blocked
  | '🌟' // star performer
  | '🐣' // new/starting
  | '🛠' // working
  | '🔍' // reviewing
  | '😤' // frustrated
  | '🥹' // emotional
  | '🎁' // gift/surprise
  | '😮‍💨'; // exhausted

export interface Task {
  type: TaskType;
  status: TaskStatus;
}

export interface ColumnData {
  tasks: Task[];
}

export interface PodData {
  id: string;
  name: string;
  emoji: string;
  columns: {
    backlog: ColumnData;
    doing: ColumnData;
    review: ColumnData;
    blocked: ColumnData;
    done: ColumnData;
  };
  mood?: {
    backlog: Mood;
    doing: Mood;
    review: Mood;
    blocked: Mood;
    done: Mood;
  };
}

export interface SwimlaneBoard {
  pods: PodData[];
}

export interface GanttTask {
  type: TaskType;
  status: TaskStatus;
  offset: number; // 0-7, where the bar starts
  duration: number; // 1-4, length of the bar
}

export interface GanttColumnData {
  tasks: GanttTask[];
}

export interface PodGanttData extends Omit<PodData, 'columns'> {
  columns: {
    backlog: GanttColumnData;
    doing: GanttColumnData;
    review: GanttColumnData;
    blocked: GanttColumnData;
    done: GanttColumnData;
  };
}

export interface CountBarData {
  backlog: number; // 0-7
  doing: number;
  review: number;
  blocked: number;
  done: number;
}

export interface PodCountBarData {
  id: string;
  name: string;
  emoji: string;
  counts: CountBarData;
}
