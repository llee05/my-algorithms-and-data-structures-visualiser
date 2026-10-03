/** Catalogue scaffolding: implement another lesson, then mark it as available. */
export const lessons = [
  {
    id: 'bubble-sort',
    title: 'Bubble sort',
    category: 'Sorting',
    available: true,
  },
  {
    id: 'merge-sort',
    title: 'Merge sort',
    category: 'Sorting',
    available: false,
  },
  {
    id: 'quick-sort',
    title: 'Quick sort',
    category: 'Sorting',
    available: false,
  },
  {
    id: 'binary-search',
    title: 'Binary search',
    category: 'Searching',
    available: false,
  },
  {
    id: 'stack',
    title: 'Stack',
    category: 'Data structures',
    available: false,
  },
  {
    id: 'queue',
    title: 'Queue',
    category: 'Data structures',
    available: false,
  },
  {
    id: 'binary-tree',
    title: 'Binary tree',
    category: 'Data structures',
    available: false,
  },
] as const
