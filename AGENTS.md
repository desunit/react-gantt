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

## Copy-Paste with Preview Feature

### Feature Description

Ctrl+C copies selected tasks, Ctrl+V enters paste preview mode showing ghost tasks that follow the cursor. Click confirms paste, Esc cancels.

### CRITICAL: Position Calculation Learnings

When `lengthUnit="week"`, the gantt snaps task rendering to week boundaries. This creates challenges for copy-paste:

#### Problem: Visual Width Mismatch

Tasks with same duration can have different visual widths (`$w`) depending on which days they span:

- Task Mon→Fri (4 days) within 1 week column → `$w: 80px`
- Task Sat→Sat (7 days) crossing week boundary → `$w: 160px`

**Solution**: Store exact duration in DAYS, not cells/weeks. Store day-of-week offset to preserve position within week.

#### Problem: Ghost Preview Position Offset

Converting pixel→date→pixel causes offset errors because:

- `pixelToDate()` returns dates based on `scales.start` alignment
- `scales.start` may not be Monday-aligned (depends on Gantt's `start` prop)
- `dateToPixel()` may not match gantt's internal `$x` calculation

**Solution**: Calculate ghost position DIRECTLY from pixels:

```js
const cellIndex = Math.floor(currentX / lengthUnitWidth);
const x = (cellIndex + task._startCellOffset) * lengthUnitWidth;
```

#### Problem: Paste Position Offset (1-Week Shift)

Original code snapped to Monday in `executePaste()`, causing tasks to appear in the wrong week when `scales.start` wasn't Monday-aligned.

**Solution**: Use `targetDate` directly without Monday snapping. The paste position should match the visual column, which is based on `scales.start`.

### Clipboard Data Structure

When copying tasks, store these fields:

```js
{
  ...taskData,
  _startCellOffset: number,   // Weeks from base task (for multi-task alignment)
  _startDayOfWeek: number,    // 0=Mon, 6=Sun (preserve position within week)
  _durationDays: number,      // Exact days (NOT cells!) for correct visual width
  _originalWidth: number,     // $w value for ghost preview
  _originalHeight: number,    // $h value for ghost preview (includes margins)
}
```

### Implementation (Bars.jsx)

**Module-level clipboard:**

```js
let clipboardTasks = [];
let clipboardBaseDate = null;
let clipboardParent = null;
```

**State:**

```js
const [pastePreview, setPastePreview] = useState(null);
// Shape: { tasks: [], baseDate, parent, currentX }
```

**Copy handler stores (all dates already UTC):**

- `_startCellOffset`: `getCellOffset(task.start, baseDate, scales)` - weeks from earliest task
- `_startDayOfWeek`: `(task.start.getUTCDay() + 6) % 7` - converts JS Sun=0 to Mon=0 (UTC)
- `_durationDays`: `Math.round((end - start) / msPerDay)` - exact days

**Paste execution (all UTC):**

```js
// Use targetDate directly - DON'T snap to Monday!
// The library positions tasks based on scales.start which may not be Monday-aligned
const targetColumnStart = new Date(targetDate);
targetColumnStart.setUTCHours(0, 0, 0, 0);

// Calculate new dates using cell offset and day-of-week offset
const cellOffset = addCells(targetColumnStart, task._startCellOffset, scales);
const newStart = new Date(
  cellOffset.getTime() + task._startDayOfWeek * msPerDay,
);
newStart.setUTCHours(0, 0, 0, 0);
const newEnd = new Date(newStart.getTime() + task._durationDays * msPerDay);
```

**Important**: Do NOT snap to Monday in paste execution. The visual column position is determined by `scales.start`, not by Monday. Snapping to Monday causes a 1-week offset when `scales.start` is not Monday-aligned.

**Ghost preview position (IMPORTANT - use pixels directly):**

```js
// DON'T convert through dates - causes offset errors!
const cellIndex = Math.floor(currentX / lengthUnitWidth);
const x = (cellIndex + task._startCellOffset) * lengthUnitWidth;
const w = task._originalWidth;
const h = task._originalHeight;
```

### Helper Functions (all operate on UTC dates)

```js
// Pixel to date (snaps to cell start) - scales.start is already UTC
const pixelToDate = (px, scales) => {
  const units = Math.floor(px / scales.lengthUnitWidth);
  const date = new Date(
    scales.start.getTime() + units * daysPerUnit * msPerDay,
  );
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

// Cell offset between dates (in whole cells)
const getCellOffset = (date, baseDate, scales) => {
  return Math.round((date.getTime() - baseDate.getTime()) / msPerUnit);
};

// Add cells to date (returns UTC midnight)
const addCells = (date, cells, scales) => {
  const result = new Date(date.getTime() + cells * msPerUnit);
  result.setUTCHours(0, 0, 0, 0);
  return result;
};
```

### Key Behaviors

- **Same parent only**: Tasks must share parent to be copied together
- **Row preserved**: Each task keeps its original `row` value
- **Undo batching**: Uses `history.startBatch()`/`endBatch()` + `skipUndo` for single undo
- **Esc cancels**: Separate keydown listener for reliability

### Files Modified

- `src/components/chart/Bars.jsx` - Main copy-paste logic
- `src/components/chart/Bars.css` - Ghost styling

### CSS

```css
.wx-paste-preview.wx-bar.wx-GKbcLEGA {
  opacity: 0.5;
  pointer-events: none;
  z-index: 5;
  border: 2px dashed var(--wx-color-primary, #2196f3);
}
```

### Usage

```jsx
<Gantt tasks={tasks} copyPaste={true} undo={true} />
```

## onScaleClick Callback

### Feature Description

Fires when a user clicks a time scale header cell. Threaded through: Gantt → Layout → Chart → TimeScale.

### Type

```typescript
onScaleClick?: (date: Date, unit: string, event?: MouseEvent) => void;
```

- `date` — cell start date (passed by store, may be local-time)
- `unit` — scale unit: `'month'`, `'week'`, `'day'`, `'hour'`
- `event` — native `MouseEvent` from the click (for target detection, positioning)

### Implementation

**TimeScale.jsx** — the only file with non-trivial logic:

```jsx
onClick={(e) => onScaleClick(cell.date, cell.unit, e.nativeEvent)}
style={{ cursor: onScaleClick ? 'pointer' : undefined }}
```

### Files Modified

- `types/index.d.ts` — added `onScaleClick` to Gantt FC props
- `src/components/Gantt.jsx` — destructure prop, pass to Layout
- `src/components/Layout.jsx` — forward to Chart
- `src/components/chart/Chart.jsx` — forward to TimeScales
- `src/components/chart/TimeScale.jsx` — onClick handler + cursor style

### Usage

```jsx
<Gantt
  onScaleClick={(date, unit, event) => {
    if (unit === 'week') {
      console.log('Clicked week starting', date);
    }
  }}
/>
```

The consumer can use `highlightTime` alongside `onScaleClick` to visually mark selected columns.

## Summary Bar Counts Feature

### Feature Description

Displays per-column child task counts directly on summary (project) bars. Each column of the summary bar shows how many child tasks overlap that column. Zeros are shown for empty columns (dimmed). The summary bar text (project name) is hidden when counts are active.

### Implementation Strategy

Prop-gated feature (`summaryBarCounts`), same threading pattern as `multiTaskRows`. Computation and rendering in Bars.jsx only — no store changes needed.

### Implementation (Bars.jsx)

**Computation** (`summaryColCounts` useMemo):
```js
// Map<summaryId, Map<colIndex, count>>
// 1. Build parent→children map from rTasksValue
// 2. For each child: startCol = floor($x / luw), endCol = ceil(($x+$w) / luw)
// 3. Increment count for each column in [startCol, endCol)
```

**Rendering** (inside summary bar `<div>`, after content):
- Iterates ALL columns spanned by the summary bar (startCol to endCol)
- Each column rendered as absolutely positioned `<span>` at `left: (col * luw - task.$x)px`
- Shows `0` with `.wx-week-count-zero` (50% opacity) for columns with no children
- Summary bar text suppressed: `wx-content` renders empty string when feature is on

### Key Design Decisions
- **Text suppressed**: Summary bar hides project name text when counts are active (counts replace text)
- **Zeros shown**: All columns in bar range show a count, including `0` (dimmed via opacity)
- **Computed in Bars.jsx**: Needs `$x`/`$w` from store, avoids extra prop threading
- **Works with any `lengthUnit`**: Uses `lengthUnitWidth` generically (week, day, month)
- **`taskTemplate` compatible**: Counts render as sibling overlay div, unaffected by templates

### CSS Classes
```css
.wx-summary-week-counts  /* Container: absolute, overflow: visible, pointer-events: none, z-index: 3 */
.wx-week-count            /* Count span: 14px bold, white with text-shadow */
.wx-week-count-zero       /* Zero counts: 50% opacity */
```

### Files Modified
- `types/index.d.ts` — Added `summaryBarCounts?: boolean` to `IGanttConfig`
- `src/components/Gantt.jsx` — Accept prop, pass to Layout
- `src/components/Layout.jsx` — Forward to Chart
- `src/components/chart/Chart.jsx` — Forward to Bars
- `src/components/chart/Bars.jsx` — `summaryColCounts` useMemo + rendering in summary bars
- `src/components/chart/Bars.css` — Overlay and count styling

### Demo
- Component: `demos/cases/GanttSummaryBarCounts.jsx`
- Route: `/summary-bar-counts/:skin`
- 2 projects (Alpha: 3 children, Beta: 2 children), overlapping date ranges
- Uses `multiTaskRows + summaryBarCounts + lengthUnit="week"`

### Usage
```jsx
<Gantt
  tasks={tasks}
  scales={scales}
  lengthUnit="week"
  multiTaskRows={true}
  summaryBarCounts={true}
/>
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

## UTC Date Handling

**CRITICAL: All dates MUST be UTC** - no timezone conversions inside the library. The consumer (e.g., operations-ui) is responsible for passing UTC dates.

### Why This Matters

Copy-paste relies on `getUTCDay()` to calculate day-of-week offsets. If dates are local instead of UTC:

- A Monday task might appear as Saturday/Sunday depending on timezone
- Pasted tasks will be offset by days or even weeks
- Visual position won't match the actual dates

**Bug example**: `new Date(2026, 3, 27)` creates April 27 at LOCAL midnight. In UTC+3 timezone, this becomes `2026-04-26T21:00:00.000Z` (April 26!), causing `getUTCDay()` to return Saturday instead of Monday.

### The scales.start Alignment Fix

The Gantt store (`@svar-ui/gantt-store`) processes the `start` prop and creates `scales.start`. This value has two problems:

1. May be at local midnight (e.g., 21:00 UTC in UTC+3), not 00:00 UTC
2. May not be on Monday (e.g., Sunday), breaking week-based calculations

**Solution**: In `Bars.jsx`, we normalize `scalesValue.start` to **Monday at UTC midnight**:

```js
const scalesValue = useMemo(() => {
  if (!scalesValueRaw?.start) return scalesValueRaw;
  // First normalize to UTC midnight
  const utcDate = new Date(
    Date.UTC(
      scalesValueRaw.start.getFullYear(),
      scalesValueRaw.start.getMonth(),
      scalesValueRaw.start.getDate(),
    ),
  );
  // Then snap to Monday of that week (ISO week starts Monday)
  const dayOfWeek = utcDate.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(utcDate.getTime() + daysToMonday * 86400000);
  monday.setUTCHours(0, 0, 0, 0);
  return { ...scalesValueRaw, start: monday };
}, [scalesValueRaw]);
```

This ensures:

- `pixelToDate()` returns Mondays for week-based calculations
- `_startDayOfWeek` (0=Mon, 1=Tue, etc.) works correctly when added
- Paste operations land in the correct visual column

### Simple Rules

1. **All dates passed to Gantt must be UTC** (created with `Date.UTC()`)
2. **All dates from Gantt events are UTC** (no conversion needed)
3. **No `localToUTC` or timezone conversions inside Bars.jsx**
4. **scales.start is normalized to Monday at UTC midnight** in Bars.jsx useMemo

### Creating UTC Dates

```js
// CORRECT - UTC midnight
new Date(Date.UTC(2026, 3, 27)); // → 2026-04-27T00:00:00.000Z

// WRONG - Local midnight (offset in UTC)
new Date(2026, 3, 27); // → 2026-04-26T21:00:00.000Z (in UTC+3)

// Helper function for demos
const utc = (y, m, d) => new Date(Date.UTC(y, m, d));
```

### UTC Methods Used

| Local Method    | UTC Method         |
| --------------- | ------------------ |
| `getDay()`      | `getUTCDay()`      |
| `getDate()`     | `getUTCDate()`     |
| `getMonth()`    | `getUTCMonth()`    |
| `getFullYear()` | `getUTCFullYear()` |
| `setDate()`     | `setUTCDate()`     |
| `setHours()`    | `setUTCHours()`    |

### Key Functions (Bars.jsx)

```js
// scales.start is normalized to Monday at UTC midnight in useMemo (see above)

// Pixel to date - returns Monday of clicked week (UTC midnight)
const pixelToDate = (px, scales) => {
  const units = Math.floor(px / scales.lengthUnitWidth);
  const date = new Date(
    scales.start.getTime() + units * daysPerUnit * msPerDay,
  );
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

// Add cells (weeks) to a date - returns UTC midnight
const addCells = (date, cells, scales) => {
  const result = new Date(date.getTime() + cells * msPerUnit);
  result.setUTCHours(0, 0, 0, 0);
  return result;
};

// Copy handler - store day offset from Monday (Mon=0, Sun=6)
const startDayOfWeek = task.start ? (task.start.getUTCDay() + 6) % 7 : 0;

// Paste handler - add day offset to Monday to get correct start day
const newStart = new Date(
  cellOffset.getTime() + (task._startDayOfWeek || 0) * msPerDay,
);
```

### Consumer Responsibility

The consumer (operations-ui) handles boundary conversions:

```js
// DatePicker returns local → convert to UTC immediately
const handleDateChange = (ev) => {
  const utcDate = localToUTC(ev.value);
  setDate(utcDate);
};

// Pass UTC dates to Gantt
<Gantt start={utcStartDate} tasks={tasksWithUtcDates} />;
```

### Files Using UTC

- **Bars.jsx** - `pixelToDate()`, `addCells()`, `executePaste()`, copy handler
- **Chart.jsx** - Current week detection for scroll-to-current-week
- **Gantt.jsx** - `isCurrentWeek()` calculation for week highlighting
