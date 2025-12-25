/**
 * Example data for swimlane Kanban charts
 */

import { PodData, PodCountBarData, PodGanttData } from './types';

export const examplePods: PodData[] = [
  {
    id: 'pod-01',
    name: 'Pod-01',
    emoji: '🐣',
    columns: {
      backlog: {
        tasks: [
          { type: '📚', status: 'green' },
          { type: '📚', status: 'green' },
          { type: '📚', status: 'white' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'white' },
          { type: '🧬', status: 'white' },
          { type: '💻', status: 'green' },
          { type: '💻', status: 'green' },
          { type: '💻', status: 'white' },
        ],
      },
      doing: { tasks: [] },
      review: { tasks: [] },
      blocked: { tasks: [] },
      done: { tasks: [] },
    },
    mood: {
      backlog: '🙂',
      doing: '😐',
      review: '🫥',
      blocked: '😭',
      done: '🥳',
    },
  },
  {
    id: 'pod-02',
    name: 'Pod-02',
    emoji: '🐍',
    columns: {
      backlog: { tasks: [] },
      doing: {
        tasks: [
          { type: '💻', status: 'green' },
          { type: '💻', status: 'green' },
          { type: '💻', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🧪', status: 'white' },
          { type: '🧪', status: 'white' },
          { type: '🚀', status: 'white' },
          { type: '🚀', status: 'white' },
          { type: '🚀', status: 'white' },
        ],
      },
      review: { tasks: [] },
      blocked: { tasks: [] },
      done: { tasks: [] },
    },
    mood: {
      backlog: '🌱',
      doing: '🔥',
      review: '✨',
      blocked: '❄️',
      done: '🌟',
    },
  },
  {
    id: 'pod-03',
    name: 'Pod-03',
    emoji: '🐠',
    columns: {
      backlog: { tasks: [] },
      doing: { tasks: [] },
      review: {
        tasks: [
          { type: '📚', status: 'green' },
          { type: '📚', status: 'green' },
          { type: '📚', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🧪', status: 'white' },
        ],
      },
      blocked: { tasks: [] },
      done: { tasks: [] },
    },
    mood: {
      backlog: '🐣',
      doing: '🛠',
      review: '🔍',
      blocked: '😭',
      done: '🎁',
    },
  },
  {
    id: 'pod-04',
    name: 'Pod-04',
    emoji: '🌱',
    columns: {
      backlog: { tasks: [] },
      doing: { tasks: [] },
      review: { tasks: [] },
      blocked: {
        tasks: [
          { type: '📚', status: 'red' },
          { type: '📚', status: 'red' },
          { type: '📚', status: 'red' },
          { type: '🧬', status: 'red' },
          { type: '🧬', status: 'red' },
          { type: '🧬', status: 'white' },
          { type: '💻', status: 'red' },
          { type: '💻', status: 'white' },
          { type: '💻', status: 'white' },
        ],
      },
      done: { tasks: [] },
    },
    mood: {
      backlog: '😤',
      doing: '🥹',
      review: '😐',
      blocked: '😭',
      done: '🙂',
    },
  },
  {
    id: 'pod-05',
    name: 'Pod-05',
    emoji: '👑',
    columns: {
      backlog: { tasks: [] },
      doing: { tasks: [] },
      review: { tasks: [] },
      blocked: { tasks: [] },
      done: {
        tasks: [
          { type: '📚', status: 'green' },
          { type: '📚', status: 'green' },
          { type: '📚', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '🧬', status: 'green' },
          { type: '💻', status: 'green' },
          { type: '💻', status: 'green' },
          { type: '💻', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🧪', status: 'green' },
          { type: '🚀', status: 'green' },
          { type: '🚀', status: 'green' },
          { type: '🚀', status: 'green' },
        ],
      },
    },
    mood: {
      backlog: '🙂',
      doing: '🙂',
      review: '🙂',
      blocked: '🙂',
      done: '🥳',
    },
  },
];

export const exampleCountBars: PodCountBarData[] = [
  {
    id: 'pod-01',
    name: 'Pod-01',
    emoji: '🐣',
    counts: {
      backlog: 7,
      doing: 4,
      review: 2,
      blocked: 1,
      done: 5,
    },
  },
  {
    id: 'pod-02',
    name: 'Pod-02',
    emoji: '🐍',
    counts: {
      backlog: 4,
      doing: 5,
      review: 3,
      blocked: 0,
      done: 2,
    },
  },
  {
    id: 'pod-03',
    name: 'Pod-03',
    emoji: '🐠',
    counts: {
      backlog: 2,
      doing: 3,
      review: 5,
      blocked: 1,
      done: 3,
    },
  },
  {
    id: 'pod-04',
    name: 'Pod-04',
    emoji: '🌱',
    counts: {
      backlog: 5,
      doing: 2,
      review: 1,
      blocked: 4,
      done: 1,
    },
  },
  {
    id: 'pod-05',
    name: 'Pod-05',
    emoji: '👑',
    counts: {
      backlog: 1,
      doing: 2,
      review: 3,
      blocked: 0,
      done: 7,
    },
  },
];

export const exampleGanttPods: PodGanttData[] = [
  {
    id: 'pod-01',
    name: 'Pod-01',
    emoji: '🐣',
    columns: {
      backlog: {
        tasks: [{ type: '📚', status: 'green', offset: 0, duration: 3 }],
      },
      doing: {
        tasks: [{ type: '💻', status: 'green', offset: 1, duration: 3 }],
      },
      review: {
        tasks: [{ type: '🧪', status: 'green', offset: 2, duration: 3 }],
      },
      blocked: {
        tasks: [{ type: '🚀', status: 'red', offset: 3, duration: 3 }],
      },
      done: {
        tasks: [{ type: '📦', status: 'green', offset: 4, duration: 3 }],
      },
    },
  },
  {
    id: 'pod-02',
    name: 'Pod-02',
    emoji: '🐍',
    columns: {
      backlog: {
        tasks: [{ type: '🧬', status: 'green', offset: 0, duration: 2 }],
      },
      doing: {
        tasks: [{ type: '💻', status: 'green', offset: 1, duration: 4 }],
      },
      review: {
        tasks: [{ type: '🔐', status: 'green', offset: 3, duration: 3 }],
      },
      blocked: {
        tasks: [{ type: '🧯', status: 'red', offset: 3, duration: 4 }],
      },
      done: {
        tasks: [{ type: '🎁', status: 'green', offset: 5, duration: 2 }],
      },
    },
  },
  {
    id: 'pod-03',
    name: 'Pod-03',
    emoji: '🐠',
    columns: {
      backlog: {
        tasks: [{ type: '📚', status: 'green', offset: 0, duration: 4 }],
      },
      doing: {
        tasks: [{ type: '🧬', status: 'green', offset: 1, duration: 4 }],
      },
      review: {
        tasks: [{ type: '💻', status: 'green', offset: 2, duration: 4 }],
      },
      blocked: {
        tasks: [{ type: '⛓️‍💥', status: 'red', offset: 3, duration: 3 }],
      },
      done: {
        tasks: [{ type: '✅', status: 'green', offset: 4, duration: 3 }],
      },
    },
  },
  {
    id: 'pod-04',
    name: 'Pod-04',
    emoji: '🌱',
    columns: {
      backlog: {
        tasks: [{ type: '🧪', status: 'green', offset: 0, duration: 3 }],
      },
      doing: {
        tasks: [{ type: '💻', status: 'green', offset: 1, duration: 3 }],
      },
      review: {
        tasks: [{ type: '📚', status: 'green', offset: 2, duration: 3 }],
      },
      blocked: {
        tasks: [{ type: '🚀', status: 'red', offset: 3, duration: 4 }],
      },
      done: {
        tasks: [{ type: '✅', status: 'green', offset: 5, duration: 2 }],
      },
    },
  },
  {
    id: 'pod-05',
    name: 'Pod-05',
    emoji: '👑',
    columns: {
      backlog: {
        tasks: [{ type: '🌱', status: 'green', offset: 0, duration: 2 }],
      },
      doing: {
        tasks: [{ type: '🛠', status: 'green', offset: 1, duration: 3 }],
      },
      review: {
        tasks: [{ type: '🔍', status: 'green', offset: 2, duration: 3 }],
      },
      blocked: {
        tasks: [{ type: '🧯', status: 'red', offset: 3, duration: 3 }],
      },
      done: {
        tasks: [{ type: '🎁', status: 'green', offset: 4, duration: 3 }],
      },
    },
  },
];
