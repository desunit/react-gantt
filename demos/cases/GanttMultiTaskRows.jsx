import { useMemo } from 'react';
import { Gantt } from '../../src/';
import './GanttMultiTaskRows.css';

export default function GanttMultiTaskRows({ skinSettings }) {
  const data = useMemo(() => {
    const tasks = [
      // Row 1 - Development: 2 weeks, gap 1 week, then 3 weeks
      {
        id: 1,
        text: 'Database Schema',
        start: new Date(2026, 2, 2),  // March 2 (Week 1 start)
        end: new Date(2026, 2, 15),   // March 15 (Week 2 end)
        progress: 90,
        parent: 0,
        type: 'task',
        row: 'development',
      },
      // [Gap: Week 3 - March 16-22]
      {
        id: 2,
        text: 'Backend API',
        start: new Date(2026, 2, 23), // March 23 (Week 4 start)
        end: new Date(2026, 3, 5),    // April 5 (Week 5 end)
        progress: 50,
        parent: 0,
        type: 'task',
        row: 'development',
      },
      {
        id: 3,
        text: 'Frontend Components',
        start: new Date(2026, 3, 6),  // April 6 (Week 6 start)
        end: new Date(2026, 3, 12),   // April 12 (Week 6 end)
        progress: 40,
        parent: 0,
        type: 'task',
        row: 'development',
      },

      // Row 2 - Testing: similar pattern
      {
        id: 4,
        text: 'Unit Tests',
        start: new Date(2026, 2, 9),  // March 9 (Week 2 start)
        end: new Date(2026, 2, 22),   // March 22 (Week 3 end)
        progress: 70,
        parent: 0,
        type: 'task',
        row: 'testing',
      },
      // [Gap: Week 4 - March 23-29]
      {
        id: 5,
        text: 'Integration Tests',
        start: new Date(2026, 2, 30), // March 30 (Week 5 start)
        end: new Date(2026, 3, 12),   // April 12 (Week 6 end)
        progress: 30,
        parent: 0,
        type: 'task',
        row: 'testing',
      },
      {
        id: 6,
        text: 'E2E Tests',
        start: new Date(2026, 3, 13), // April 13 (Week 7 start)
        end: new Date(2026, 3, 19),   // April 19 (Week 7 end)
        progress: 10,
        parent: 0,
        type: 'task',
        row: 'testing',
      },
    ];

    const scales = [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 1, format: '%w' },
    ];

    return { tasks, scales };
  }, []);

  return (
    <Gantt
      {...skinSettings}
      tasks={data.tasks}
      scales={data.scales}
      multiTaskRows={true}
    />
  );
}
