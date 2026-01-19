# Multiple Tasks Per Row - Usage Example

## Overview

The `multiTaskRows` feature allows multiple tasks to be displayed side-by-side in the same row when they share the same `row` property value. This enables more compact visualization of parallel activities.

## Basic Usage

```jsx
import { Gantt } from '@svar-ui/react-gantt';

const tasks = [
  {
    id: 1,
    text: 'Task 1',
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 5),
    row: 'row1', // Multiple tasks with same row value will share a row
  },
  {
    id: 2,
    text: 'Task 2',
    start: new Date(2024, 0, 6),
    end: new Date(2024, 0, 10),
    row: 'row1', // This task shares row1 with Task 1
  },
  {
    id: 3,
    text: 'Task 3',
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 8),
    row: 'row2', // This task is in a different row
  },
];

function App() {
  return (
    <Gantt
      tasks={tasks}
      multiTaskRows={true} // Enable the feature
    />
  );
}
```

## Key Features

1. **Horizontal Stacking**: Tasks with the same `row` value are positioned side-by-side based on their time ranges
2. **Time Overlap**: Tasks in the same row can overlap in time - they will render at the same vertical position
3. **Grid Display**: The grid shows the first task's text for each row
4. **Backward Compatible**: If `multiTaskRows` is false (default) or if tasks don't have a `row` property, each task gets its own row

## Row Property

- **Type**: `TID | number` (string, number, or any ID type)
- **Optional**: If not specified, the task's `id` is used as the row identifier
- **Behavior**: Tasks with the same `row` value are grouped together

## Example with Different Row Configurations

```jsx
const tasks = [
  // Row A - two tasks that don't overlap in time
  { id: 1, text: 'Design', start: '2024-01-01', end: '2024-01-05', row: 'A' },
  { id: 2, text: 'Review', start: '2024-01-06', end: '2024-01-08', row: 'A' },

  // Row B - two tasks that overlap in time (both visible)
  { id: 3, text: 'Backend', start: '2024-01-01', end: '2024-01-10', row: 'B' },
  { id: 4, text: 'Frontend', start: '2024-01-05', end: '2024-01-15', row: 'B' },

  // Row C - single task (no sharing)
  { id: 5, text: 'Testing', start: '2024-01-10', end: '2024-01-20', row: 'C' },

  // Default behavior - no row property means unique row
  { id: 6, text: 'Deploy', start: '2024-01-20', end: '2024-01-25' },
];
```

## Height Calculation

When `multiTaskRows` is enabled:

- Chart height is based on the number of unique rows (not the number of tasks)
- Example: 10 tasks sharing 3 rows = 3 rows of height
- Example: 10 tasks with unique row values = 10 rows of height

## Interaction

- **Selection**: Click individual tasks to select them
- **Editing**: Double-click individual tasks to edit them
- **Drag**: Horizontal dragging works per-task to adjust time
- **Grid**: The grid shows one row per unique `row` value with the first task's properties

## Implementation Notes

1. Tasks are grouped by their `row` property value
2. All tasks in a row share the same vertical position ($y coordinate)
3. Tasks maintain their own horizontal position ($x coordinate) based on start time
4. The grid aggregates tasks by row and displays the first task's text
