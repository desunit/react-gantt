import { useMemo } from 'react';
import { Gantt } from '../../src/';

export default function GanttMarqueeSelect({ skinSettings }) {
  const tasks = useMemo(() => [
    // Acme Corp
    { id: 'acme', text: 'Acme Corp', parent: 0, type: 'summary', open: true },
    // John Smith
    { id: 'john', text: 'John Smith', parent: 'acme', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 13), row: 'john' },
    { id: 'john-2', text: 'John Smith', parent: 'acme', type: 'task', start: new Date(2026, 2, 16), end: new Date(2026, 2, 22), row: 'john' },
    { id: 'john-3', text: 'John Smith', parent: 'acme', type: 'task', start: new Date(2026, 3, 6), end: new Date(2026, 3, 17), row: 'john' },
    // Sarah Chen
    { id: 'sarah', text: 'Sarah Chen', parent: 'acme', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 8), row: 'sarah' },
    { id: 'sarah-2', text: 'Sarah Chen', parent: 'acme', type: 'task', start: new Date(2026, 2, 12), end: new Date(2026, 2, 20), row: 'sarah' },
    { id: 'sarah-3', text: 'Sarah Chen', parent: 'acme', type: 'task', start: new Date(2026, 2, 30), end: new Date(2026, 3, 10), row: 'sarah' },
    // Mike Johnson
    { id: 'mike', text: 'Mike Johnson', parent: 'acme', type: 'task', start: new Date(2026, 2, 9), end: new Date(2026, 2, 20), row: 'mike' },
    { id: 'mike-2', text: 'Mike Johnson', parent: 'acme', type: 'task', start: new Date(2026, 2, 23), end: new Date(2026, 3, 3), row: 'mike' },

    // TechStart Inc
    { id: 'techstart', text: 'TechStart Inc', parent: 0, type: 'summary', open: true },
    // Emily Davis
    { id: 'emily', text: 'Emily Davis', parent: 'techstart', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 10), row: 'emily' },
    { id: 'emily-2', text: 'Emily Davis', parent: 'techstart', type: 'task', start: new Date(2026, 2, 16), end: new Date(2026, 2, 27), row: 'emily' },
    { id: 'emily-3', text: 'Emily Davis', parent: 'techstart', type: 'task', start: new Date(2026, 3, 1), end: new Date(2026, 3, 12), row: 'emily' },
    // Alex Brown
    { id: 'alex', text: 'Alex Brown', parent: 'techstart', type: 'task', start: new Date(2026, 2, 5), end: new Date(2026, 2, 15), row: 'alex' },
    { id: 'alex-2', text: 'Alex Brown', parent: 'techstart', type: 'task', start: new Date(2026, 3, 1), end: new Date(2026, 3, 8), row: 'alex' },
    { id: 'alex-3', text: 'Alex Brown', parent: 'techstart', type: 'task', start: new Date(2026, 3, 13), end: new Date(2026, 3, 24), row: 'alex' },

    // GlobalSoft
    { id: 'globalsoft', text: 'GlobalSoft', parent: 0, type: 'summary', open: true },
    // Lisa Wang
    { id: 'lisa', text: 'Lisa Wang', parent: 'globalsoft', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 6), row: 'lisa' },
    { id: 'lisa-2', text: 'Lisa Wang', parent: 'globalsoft', type: 'task', start: new Date(2026, 2, 9), end: new Date(2026, 2, 18), row: 'lisa' },
    { id: 'lisa-3', text: 'Lisa Wang', parent: 'globalsoft', type: 'task', start: new Date(2026, 2, 23), end: new Date(2026, 3, 5), row: 'lisa' },
    { id: 'lisa-4', text: 'Lisa Wang', parent: 'globalsoft', type: 'task', start: new Date(2026, 3, 10), end: new Date(2026, 3, 20), row: 'lisa' },
    // Tom Wilson
    { id: 'tom', text: 'Tom Wilson', parent: 'globalsoft', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 13), row: 'tom' },
    { id: 'tom-2', text: 'Tom Wilson', parent: 'globalsoft', type: 'task', start: new Date(2026, 2, 20), end: new Date(2026, 3, 1), row: 'tom' },
  ], []);

  const scales = useMemo(
    () => [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 1, format: '%w' },
    ],
    [],
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
        <strong>Instructions:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Click and drag on empty space to create a selection rectangle</li>
          <li>Release to select all tasks within the rectangle</li>
          <li>Hold Ctrl/Cmd while dragging to add to existing selection</li>
          <li>Drag any selected task to move ALL selected tasks together</li>
          <li>Press Ctrl+Z to undo the entire bulk move</li>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <Gantt
          {...skinSettings}
          tasks={tasks}
          scales={scales}
          marqueeSelect={true}
          multiTaskRows={true}
          undo={true}
        />
      </div>
    </div>
  );
}
