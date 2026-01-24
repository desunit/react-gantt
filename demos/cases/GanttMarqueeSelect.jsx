import { useMemo } from 'react';
import { Gantt } from '../../src/';

export default function GanttMarqueeSelect({ skinSettings }) {
  const tasks = useMemo(() => [
    {
      id: 1,
      text: 'Planning Phase',
      start: new Date(2026, 2, 2),
      end: new Date(2026, 2, 8),
      progress: 100,
      parent: 0,
      type: 'task',
    },
    {
      id: 2,
      text: 'Requirements',
      start: new Date(2026, 2, 9),
      end: new Date(2026, 2, 15),
      progress: 80,
      parent: 0,
      type: 'task',
    },
    {
      id: 3,
      text: 'Design',
      start: new Date(2026, 2, 16),
      end: new Date(2026, 2, 29),
      progress: 60,
      parent: 0,
      type: 'task',
    },
    {
      id: 4,
      text: 'Development',
      start: new Date(2026, 2, 23),
      end: new Date(2026, 3, 12),
      progress: 30,
      parent: 0,
      type: 'task',
    },
    {
      id: 5,
      text: 'Testing',
      start: new Date(2026, 3, 6),
      end: new Date(2026, 3, 19),
      progress: 10,
      parent: 0,
      type: 'task',
    },
    {
      id: 6,
      text: 'Deployment',
      start: new Date(2026, 3, 20),
      end: new Date(2026, 3, 26),
      progress: 0,
      parent: 0,
      type: 'task',
    },
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
          undo={true}
        />
      </div>
    </div>
  );
}
