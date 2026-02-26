import { useMemo } from 'react';
import { Gantt } from '../../src/';

export default function GanttSummaryBarCounts({ skinSettings }) {
  const data = useMemo(() => {
    const utc = (y, m, d) => new Date(Date.UTC(y, m, d));

    const tasks = [
      // Project A
      {
        id: 'proj-a',
        text: 'Project Alpha',
        type: 'summary',
        parent: 0,
        open: true,
        start: utc(2026, 2, 2),
        end: utc(2026, 3, 19),
      },
      {
        id: 'a1',
        text: 'Design',
        type: 'task',
        parent: 'proj-a',
        row: 'a-row1',
        start: utc(2026, 2, 2),
        end: utc(2026, 2, 15),
        progress: 80,
      },
      {
        id: 'a2',
        text: 'Backend',
        type: 'task',
        parent: 'proj-a',
        row: 'a-row2',
        start: utc(2026, 2, 9),
        end: utc(2026, 2, 29),
        progress: 40,
      },
      {
        id: 'a3',
        text: 'Frontend',
        type: 'task',
        parent: 'proj-a',
        row: 'a-row3',
        start: utc(2026, 2, 16),
        end: utc(2026, 3, 5),
        progress: 20,
      },

      // Project B
      {
        id: 'proj-b',
        text: 'Project Beta',
        type: 'summary',
        parent: 0,
        open: true,
        start: utc(2026, 2, 23),
        end: utc(2026, 3, 26),
      },
      {
        id: 'b1',
        text: 'Research',
        type: 'task',
        parent: 'proj-b',
        row: 'b-row1',
        start: utc(2026, 2, 23),
        end: utc(2026, 3, 5),
        progress: 60,
      },
      {
        id: 'b2',
        text: 'Prototype',
        type: 'task',
        parent: 'proj-b',
        row: 'b-row2',
        start: utc(2026, 3, 6),
        end: utc(2026, 3, 26),
        progress: 10,
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
      lengthUnit="week"
      multiTaskRows={true}
      summaryBarCounts={true}
    />
  );
}
