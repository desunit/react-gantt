# React Gantt Project Context

## Project Overview

This is `@svar-ui/react-gantt` - a customizable, high-performance React Gantt chart component for building project timelines.

## Architecture

### Component Structure

```
src/
├── components/
│   ├── Gantt.jsx           # Main component - data setup, API, store init
│   ├── Layout.jsx          # Layout manager - height calc, Grid + Chart
│   ├── grid/
│   │   └── Grid.jsx        # Left side table view
│   └── chart/
│       ├── Chart.jsx       # Right side timeline view
│       └── Bars.jsx        # Task bars rendering
├── helpers/
│   └── reorder.js          # Drag & drop logic
└── index.js                # Package exports
```

### Data Flow

1. **Gantt.jsx** - Entry point

   - Accepts props (tasks, links, columns, etc.)
   - Initializes DataStore from `@svar-ui/gantt-store` (in node_modules)
   - Provides API context to children
   - Handles configuration normalization

2. **Layout.jsx** - Layout orchestrator

   - Calculates full height based on task/row count
   - Manages Grid + Chart split view
   - Handles scrolling coordination

3. **Grid.jsx** - Table side

   - Displays task properties in columns
   - Handles row selection, inline editing
   - Uses `@svar-ui/react-grid` for table rendering

4. **Chart.jsx** - Timeline side

   - Renders time scales
   - Manages chart viewport
   - Contains Bars component

5. **Bars.jsx** - Task visualization
   - Renders individual task bars
   - Handles drag interactions (resize, move, progress)
   - Manages task links

### Store Architecture

The core data store (`@svar-ui/gantt-store`) is in node_modules and **not editable**. Key implications:

- Store provides `_tasks` array with computed properties like `$x`, `$y`, `$w`, `$h`
- Cannot modify store's core logic or types
- Must work around store by:
  - Computing derived data in React components (useMemo)
  - Passing data through props
  - Adjusting display in UI layer

### Type System

- Base types defined in `node_modules/@svar-ui/gantt-store/dist/types/types.d.ts`
- Project types extended in `types/index.d.ts`
- Uses TypeScript but components are `.jsx` files

## Recent Implementation: Multi-Task Rows Feature

### Feature Description

Allows multiple tasks to share the same row by assigning them the same `row` property value. Tasks are positioned horizontally side-by-side based on their time ranges.

### Implementation Strategy

Since the store is read-only, the implementation is entirely in React component layer:

1. **Data Model** (types/index.d.ts)

   - Extended `ITask` with optional `row?: TID | number`
   - Extended `IConfig` with `multiTaskRows?: boolean`

2. **Row Mapping** (Gantt.jsx)

   ```js
   const rowMapping = useMemo(() => {
     const rowMap = new Map(); // rowId -> taskIds[]
     const taskRows = new Map(); // taskId -> rowId
     // Build mappings by traversing tasks
   }, [tasks, multiTaskRows]);
   ```

3. **Height Calculation** (Layout.jsx)

   ```js
   const fullHeight = useMemo(() => {
     if (!multiTaskRows) return rTasks.length * rCellHeight;
     // Count unique rows instead of tasks
     const uniqueRows = new Set(
       rTasks.map((t) => rowMapping.taskRows.get(t.id) ?? t.id),
     );
     return uniqueRows.size * rCellHeight;
   }, [rTasks, rCellHeight, multiTaskRows, rowMapping]);
   ```

4. **Grid Aggregation** (Grid.jsx)

   ```js
   const gridRows = useMemo(() => {
     if (!multiTaskRows) return allTasks;
     // Group tasks by row, show first task's properties
     const rowMap = new Map();
     allTasks.forEach(task => {
       const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
       if (!rowMap.has(rowId)) {
         rowMap.set(rowId, { ...task, $rowTasks: [...] });
       }
     });
     return Array.from(rowMap.values());
   }, [allTasks, multiTaskRows, rowMapping]);
   ```

5. **Position Adjustment** (Bars.jsx)
   ```js
   const adjustedTasks = useMemo(() => {
     if (!multiTaskRows) return tasks;
     // Build rowIndex map and adjust $y positions
     const rowIndexMap = new Map();
     // Map rowId to rowIndex (sequential 0, 1, 2...)
     return tasks.map((task) => ({
       ...task,
       $y: rowIndex * cellHeight,
     }));
   }, [tasks, multiTaskRows, rowMapping, cellHeight]);
   ```

### Key Files Modified

- `types/index.d.ts` - Type definitions
- `src/components/Gantt.jsx` - Row mapping logic, prop passing
- `src/components/Layout.jsx` - Height calculation, prop forwarding
- `src/components/grid/Grid.jsx` - Row aggregation for grid display
- `src/components/chart/Chart.jsx` - Prop forwarding to Bars
- `src/components/chart/Bars.jsx` - Y-position recalculation

### Demo Location

- Component: `demos/cases/GanttMultiTaskRows.jsx`
- Route: `/multi-task-rows/:skin`
- Shows 6 tasks in 2 rows spanning 7 weeks (March-April 2026)
- Pattern per row: 2 weeks → 1 week gap → 3 weeks (tasks aligned to week boundaries)
- Time scales: Month/Year and Week

### Usage

**Basic Example:**

```jsx
import { Gantt } from '@svar-ui/react-gantt';

const tasks = [
  {
    id: 1,
    text: 'Task 1',
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 5),
    row: 'row1', // Tasks with same row value share a row
  },
  {
    id: 2,
    text: 'Task 2',
    start: new Date(2024, 0, 6),
    end: new Date(2024, 0, 10),
    row: 'row1', // Shares row with Task 1
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

**Key Behaviors:**

- **Horizontal Stacking**: Tasks with same `row` value positioned side-by-side based on time
- **Time Overlap**: Tasks can overlap in time; both render at same vertical position
- **Grid Display**: Grid shows first task's text for each row
- **Backward Compatible**: Default behavior when `multiTaskRows={false}` or no `row` property

**Row Property:**

- Type: `TID | number` (string, number, any ID type)
- Optional: If omitted, task's `id` is used as row identifier
- Behavior: Tasks with same value are grouped together

**Height Calculation:**

- Chart height = unique row count × cell height (not task count)
- 10 tasks in 3 rows = 3 rows height
- 10 tasks with unique rows = 10 rows height

**Interaction:**

- Selection: Click individual tasks to select
- Editing: Double-click individual tasks to edit
- Drag: Horizontal drag per-task to adjust time
- Grid: One row per unique `row` value showing first task's properties

## Marquee Selection + Bulk Move Feature

### Feature Description

Click-drag on empty chart area creates a selection rectangle. All intersecting tasks get selected. Drag any selected task to move ALL selected tasks synchronously.

### IMPORTANT: Task `parent` Property Required

**All tasks MUST have a `parent` property** for marquee selection and bulk move to work correctly:

- Summary/root tasks: `parent: 0`
- Child tasks: `parent: '<parent-id>'`

Without the `parent` property, tasks become orphaned from the tree structure and selection/drag operations fail silently.

```jsx
// CORRECT - all tasks have parent
const tasks = [
  { id: 'project-1', text: 'Project', type: 'summary', parent: 0 },
  {
    id: 'task-1',
    text: 'Task',
    type: 'task',
    parent: 'project-1',
    row: 'row1',
  },
  {
    id: 'task-2',
    text: 'Task 2',
    type: 'task',
    parent: 'project-1',
    row: 'row1',
  },
];

// WRONG - missing parent on child tasks
const tasks = [
  { id: 'project-1', text: 'Project', type: 'summary' }, // missing parent: 0
  { id: 'task-1', text: 'Task', type: 'task', row: 'row1' }, // missing parent!
];
```

### Implementation (Bars.jsx)

**State:**

```js
const [marquee, setMarquee] = useState(null); // {startX, startY, currentX, currentY, ctrlKey}
const [bulkMove, setBulkMove] = useState(null); // {baseTaskId, startX, dx, originalPositions}
```

**Key Functions:**

- `getIntersectingTasks(rect)` - Returns tasks whose bounds overlap selection rectangle
- `isTaskSelected(taskId)` - Checks if task is in current selection

**Mouse Event Flow:**

1. **mousedown on empty space** → Start marquee with coords + modifier keys
2. **mousedown on selected task** (when multiple selected) → Start bulk move, store original positions
3. **mousemove with marquee** → Update currentX/Y
4. **mousemove with bulkMove** → Apply dx offset to all selected via `drag-task`
5. **mouseup with marquee** → Find intersecting tasks, call `select-task` for each
6. **mouseup with bulkMove** → Execute `update-task` for each (first task creates undo entry)

### Key Behaviors

- **Ctrl/Cmd+marquee**: Additive selection (toggle each task)
- **Plain marquee**: Replace selection
- **Bulk move undo**: Uses `skipUndo` for all but first task → single Ctrl+Z undoes entire move
- **Summary tasks**: Excluded from bulk move when `schedule?.auto` is enabled

### Files Modified

- `types/index.d.ts` - Added `marqueeSelect?: boolean`
- `src/components/Gantt.jsx` - Accept prop, pass to Layout
- `src/components/Layout.jsx` - Pass to Chart
- `src/components/chart/Chart.jsx` - Pass to Bars
- `src/components/chart/Bars.jsx` - Main implementation
- `src/components/chart/Bars.css` - Marquee rectangle styling

### Demo

- Component: `demos/cases/GanttMarqueeSelect.jsx`
- Route: `/marquee-select/:skin`

### Usage

```jsx
<Gantt
  tasks={tasks}
  marqueeSelect={true}
  undo={true} // Enable undo for bulk move
/>
```

### CSS

```css
.wx-marquee-selection.wx-GKbcLEGA {
  position: absolute;
  border: 2px dashed var(--wx-color-primary, #2196f3);
  background-color: rgba(33, 150, 243, 0.1);
  pointer-events: none;
  z-index: 10;
}
```

## Development Patterns

### Adding New Features

When the feature requires store-level changes:

- ❌ **Cannot** modify `@svar-ui/gantt-store` (node_modules)
- ✅ **Can** compute derived data in React components using useMemo
- ✅ **Can** extend types in `types/index.d.ts`
- ✅ **Can** pass computed data through component props

### Props Flow

```
Gantt (data prep)
  ↓ props
Layout (height calc)
  ↓ props
Grid + Chart (display)
  ↓ props
Bars (rendering)
```

All computed data must flow down through this chain.

### Demo Creation

1. Create component in `demos/cases/YourDemo.jsx`
2. Import in `demos/routes.js`
3. Add route entry: `['/path/:skin', 'Title', Component, 'FileName']`
4. Use `getData()` from `demos/data.js` or create custom data
5. Accept `{ skinSettings }` prop and spread it to Gantt

## Useful Commands

```bash
npm run dev        # Start dev server
npm run build      # Build production bundle
npm run lint       # Run ESLint
```

## Dependencies

### Core

- `@svar-ui/gantt-store` - Core Gantt data store and logic
- `@svar-ui/react-grid` - Grid component for left panel
- `@svar-ui/react-core` - Base UI components
- `@svar-ui/lib-react` - React utilities (writable, useStore)

### Key Packages

- `date-fns` - Date manipulation
- React 18+ - UI framework

## Important Notes

1. **Store is Read-Only**: The `@svar-ui/gantt-store` package cannot be modified. All customizations must be in React layer.

2. **Computed Properties**: Store adds `$x`, `$y`, `$w`, `$h` to tasks. These are recomputed by store on data changes.

3. **Task Tree**: Store maintains tasks as a tree structure. Parent-child relationships affect many operations.

4. **Reactive State**: Use `useStore(api, 'propertyName')` to subscribe to store changes.

5. **Props Pattern**: Complex features require threading props through multiple components (Gantt → Layout → Grid/Chart → Bars).

6. **Demo Convention**: Demos accept `skinSettings` prop for theming consistency.

## Recent Learnings

### Working Around Read-Only Store

The multi-task rows implementation demonstrates the pattern:

1. Accept new prop at Gantt level
2. Compute derived data structures (maps, lookups) in Gantt
3. Pass both flag and data down through Layout
4. Apply transformations at each level:
   - Layout: height calculation
   - Grid: row aggregation
   - Bars: position adjustment

### Performance Considerations

- Use `useMemo` extensively for derived computations
- Row mapping is built once in Gantt, reused throughout
- Position adjustments only happen for visible tasks (via area slicing)

### Type Extensions

Extending store types without modifying node_modules:

```typescript
import { ITask as IBaseTask } from '@svar-ui/gantt-store';

export interface ITask extends IBaseTask {
  customProp?: string;
}
```

This shadows the imported type with extended version.
