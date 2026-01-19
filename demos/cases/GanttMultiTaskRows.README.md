# Multiple Tasks Per Row Demo

## Overview

This demo showcases the `multiTaskRows` feature, which allows multiple tasks to be displayed side-by-side in the same row when they share the same `row` property value.

## What You'll See

The demo displays a simple project timeline with tasks organized into 2 rows:

### 1. **Development Row** (row: 'development')

- Database Schema (Weeks 1-2: Mar 2-15, 90% complete)
- [Gap: Week 3]
- Backend API (Weeks 4-5: Mar 23 - Apr 5, 50% complete)
- Frontend Components (Week 6: Apr 6-12, 40% complete)
- Total span: 6 weeks with tasks displayed side-by-side in one row

### 2. **Testing Row** (row: 'testing')

- Unit Tests (Weeks 2-3: Mar 9-22, 70% complete)
- [Gap: Week 4]
- Integration Tests (Weeks 5-6: Mar 30 - Apr 12, 30% complete)
- E2E Tests (Week 7: Apr 13-19, 10% complete)
- Similar pattern showing multiple tasks in a single row

## Key Features Demonstrated

1. **Multiple Tasks Per Row**: Both rows show 3 tasks sharing the same vertical space
2. **Time Gaps**: Demonstrates tasks with spacing between them in the same row
3. **Sequential Pattern**: Similar patterns in both rows (2 weeks + gap + 3 weeks)
4. **Time Scale**: Month/Year and Week scales for better time visualization

## Benefits

- **Compact Visualization**: 6 tasks displayed in 2 rows instead of 6 rows
- **Logical Grouping**: Related tasks visually grouped by category (development vs testing)
- **Better Overview**: Easier to see parallel workstreams at a glance

## How to Use

Enable the feature by setting `multiTaskRows={true}` on the Gantt component and assign the same `row` value to tasks that should share a row:

```jsx
<Gantt tasks={tasks} multiTaskRows={true} />
```

Tasks:

```js
{ id: 1, text: 'Task A', row: 'rowX', ... },
{ id: 2, text: 'Task B', row: 'rowX', ... }, // Shares row with Task A
```
