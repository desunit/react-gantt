import { useMemo } from 'react';
import { Gantt } from '../../src/';

// Helper to create UTC dates
const utc = (y, m, d) => new Date(Date.UTC(y, m, d));

export default function GanttMarqueeSelect({ skinSettings }) {
  // First task starts Mar 2, 2026. Start date 20 weeks before = Oct 13, 2025
  const startDate = utc(2025, 9, 13); // 20 weeks before first task
  const endDate = utc(2026, 11, 31); // December 31, 2026

  const tasks = useMemo(() => [
    // Horizon Media (Stellar Brands)
    { id: 'horizon', text: 'Horizon Media (Stellar Brands)', parent: 0, type: 'summary', open: true },
    // Test case: 13-day task starting Monday Apr 27 (same as Gordijenko issue)
    { id: 'testcase-1', text: 'TestCase, Debug', parent: 'horizon', type: 'task', start: utc(2026, 3, 27), end: utc(2026, 4, 10), row: 'horizon-testcase', $css: 'rotation-bar' },
    { id: 'anderson-1', text: 'Anderson, Marcus', parent: 'horizon', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 13), row: 'horizon-anderson', $css: 'rotation-bar' },
    { id: 'anderson-2', text: 'Anderson, Marcus', parent: 'horizon', type: 'task', start: utc(2026, 2, 10), end: utc(2026, 2, 20), row: 'horizon-anderson', $css: 'rotation-bar' }, // Overlaps with anderson-1!
    { id: 'anderson-3', text: 'Anderson, Marcus', parent: 'horizon', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'horizon-anderson', $css: 'rotation-bar' },
    { id: 'nakamura-1', text: 'Nakamura, Yuki', parent: 'horizon', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 8), row: 'horizon-nakamura', $css: 'rotation-bar' },
    { id: 'nakamura-2', text: 'Nakamura, Yuki', parent: 'horizon', type: 'task', start: utc(2026, 2, 12), end: utc(2026, 2, 20), row: 'horizon-nakamura', $css: 'rotation-bar' },
    { id: 'nakamura-3', text: 'Nakamura, Yuki', parent: 'horizon', type: 'task', start: utc(2026, 2, 30), end: utc(2026, 3, 10), row: 'horizon-nakamura', $css: 'rotation-bar' },
    { id: 'oconnor-1', text: "O'Connor, Patrick", parent: 'horizon', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 20), row: 'horizon-oconnor', $css: 'rotation-bar' },
    { id: 'oconnor-2', text: "O'Connor, Patrick", parent: 'horizon', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'horizon-oconnor', $css: 'rotation-bar' },
    { id: 'chen-1', text: 'Chen, Wei', parent: 'horizon', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 16), row: 'horizon-chen', $css: 'rotation-bar' },
    { id: 'chen-2', text: 'Chen, Wei', parent: 'horizon', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'horizon-chen', $css: 'rotation-bar' },

    // CloudNine Platform (Vertex Solutions)
    { id: 'cloudnine', text: 'CloudNine Platform (Vertex Solutions)', parent: 0, type: 'summary', open: true },
    { id: 'berg-1', text: 'Berg, Helena', parent: 'cloudnine', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 10), row: 'cloudnine-berg', $css: 'rotation-bar' },
    { id: 'berg-2', text: 'Berg, Helena', parent: 'cloudnine', type: 'task', start: utc(2026, 2, 16), end: utc(2026, 2, 27), row: 'cloudnine-berg', $css: 'rotation-bar' },
    { id: 'berg-3', text: 'Berg, Helena', parent: 'cloudnine', type: 'task', start: utc(2026, 3, 1), end: utc(2026, 3, 12), row: 'cloudnine-berg', $css: 'rotation-bar' },
    { id: 'santos-1', text: 'Santos, Rafael', parent: 'cloudnine', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 15), row: 'cloudnine-santos', $css: 'rotation-bar' },
    { id: 'santos-2', text: 'Santos, Rafael', parent: 'cloudnine', type: 'task', start: utc(2026, 3, 1), end: utc(2026, 3, 8), row: 'cloudnine-santos', $css: 'rotation-bar' },
    { id: 'santos-3', text: 'Santos, Rafael', parent: 'cloudnine', type: 'task', start: utc(2026, 3, 13), end: utc(2026, 3, 24), row: 'cloudnine-santos', $css: 'rotation-bar' },
    { id: 'petrov-1', text: 'Petrov, Anna', parent: 'cloudnine', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 13), row: 'cloudnine-petrov', $css: 'rotation-bar' },
    { id: 'petrov-2', text: 'Petrov, Anna', parent: 'cloudnine', type: 'task', start: utc(2026, 2, 20), end: utc(2026, 3, 1), row: 'cloudnine-petrov', $css: 'rotation-bar' },
    { id: 'johnson-1', text: 'Johnson, Emily', parent: 'cloudnine', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 20), row: 'cloudnine-johnson', $css: 'rotation-bar' },
    { id: 'johnson-2', text: 'Johnson, Emily', parent: 'cloudnine', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'cloudnine-johnson', $css: 'rotation-bar' },

    // DataSync Pro (Nexus Corp)
    { id: 'datasync', text: 'DataSync Pro (Nexus Corp)', parent: 0, type: 'summary', open: true },
    { id: 'kim-1', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 6), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'kim-2', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 18), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'kim-3', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 5), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'kim-4', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: utc(2026, 3, 10), end: utc(2026, 3, 20), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'mueller-1', text: 'Mueller, Franz', parent: 'datasync', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 13), row: 'datasync-mueller', $css: 'rotation-bar' },
    { id: 'mueller-2', text: 'Mueller, Franz', parent: 'datasync', type: 'task', start: utc(2026, 2, 20), end: utc(2026, 3, 1), row: 'datasync-mueller', $css: 'rotation-bar' },
    { id: 'garcia-1', text: 'Garcia, Sofia', parent: 'datasync', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 16), row: 'datasync-garcia', $css: 'rotation-bar' },
    { id: 'garcia-2', text: 'Garcia, Sofia', parent: 'datasync', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'datasync-garcia', $css: 'rotation-bar' },
    { id: 'lee-1', text: 'Lee, David', parent: 'datasync', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 20), row: 'datasync-lee', $css: 'rotation-bar' },
    { id: 'lee-2', text: 'Lee, David', parent: 'datasync', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'datasync-lee', $css: 'rotation-bar' },

    // Aurora Analytics (TechVista)
    { id: 'aurora', text: 'Aurora Analytics (TechVista)', parent: 0, type: 'summary', open: true },
    { id: 'williams-1', text: 'Williams, James', parent: 'aurora', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 13), row: 'aurora-williams', $css: 'rotation-bar' },
    { id: 'williams-2', text: 'Williams, James', parent: 'aurora', type: 'task', start: utc(2026, 2, 16), end: utc(2026, 2, 27), row: 'aurora-williams', $css: 'rotation-bar' },
    { id: 'williams-3', text: 'Williams, James', parent: 'aurora', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'aurora-williams', $css: 'rotation-bar' },
    { id: 'brown-1', text: 'Brown, Sarah', parent: 'aurora', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 16), row: 'aurora-brown', $css: 'rotation-bar' },
    { id: 'brown-2', text: 'Brown, Sarah', parent: 'aurora', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'aurora-brown', $css: 'rotation-bar' },
    { id: 'taylor-1', text: 'Taylor, Michael', parent: 'aurora', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 10), row: 'aurora-taylor', $css: 'rotation-bar' },
    { id: 'taylor-2', text: 'Taylor, Michael', parent: 'aurora', type: 'task', start: utc(2026, 2, 16), end: utc(2026, 2, 27), row: 'aurora-taylor', $css: 'rotation-bar' },
    { id: 'taylor-3', text: 'Taylor, Michael', parent: 'aurora', type: 'task', start: utc(2026, 3, 1), end: utc(2026, 3, 12), row: 'aurora-taylor', $css: 'rotation-bar' },
    { id: 'martinez-1', text: 'Martinez, Carlos', parent: 'aurora', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 20), row: 'aurora-martinez', $css: 'rotation-bar' },
    { id: 'martinez-2', text: 'Martinez, Carlos', parent: 'aurora', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'aurora-martinez', $css: 'rotation-bar' },

    // Pulse Commerce (RetailMax)
    { id: 'pulse', text: 'Pulse Commerce (RetailMax)', parent: 0, type: 'summary', open: true },
    { id: 'wilson-1', text: 'Wilson, Lisa', parent: 'pulse', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 13), row: 'pulse-wilson', $css: 'rotation-bar' },
    { id: 'wilson-2', text: 'Wilson, Lisa', parent: 'pulse', type: 'task', start: utc(2026, 2, 20), end: utc(2026, 3, 1), row: 'pulse-wilson', $css: 'rotation-bar' },
    { id: 'moore-1', text: 'Moore, Robert', parent: 'pulse', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 16), row: 'pulse-moore', $css: 'rotation-bar' },
    { id: 'moore-2', text: 'Moore, Robert', parent: 'pulse', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'pulse-moore', $css: 'rotation-bar' },
    { id: 'moore-3', text: 'Moore, Robert', parent: 'pulse', type: 'task', start: utc(2026, 3, 10), end: utc(2026, 3, 20), row: 'pulse-moore', $css: 'rotation-bar' },
    { id: 'jackson-1', text: 'Jackson, Emma', parent: 'pulse', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 20), row: 'pulse-jackson', $css: 'rotation-bar' },
    { id: 'jackson-2', text: 'Jackson, Emma', parent: 'pulse', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'pulse-jackson', $css: 'rotation-bar' },
    { id: 'white-1', text: 'White, Thomas', parent: 'pulse', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 10), row: 'pulse-white', $css: 'rotation-bar' },
    { id: 'white-2', text: 'White, Thomas', parent: 'pulse', type: 'task', start: utc(2026, 2, 16), end: utc(2026, 2, 27), row: 'pulse-white', $css: 'rotation-bar' },

    // Quantum Edge (InnoSoft)
    { id: 'quantum', text: 'Quantum Edge (InnoSoft)', parent: 0, type: 'summary', open: true },
    { id: 'harris-1', text: 'Harris, Jennifer', parent: 'quantum', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 16), row: 'quantum-harris', $css: 'rotation-bar' },
    { id: 'harris-2', text: 'Harris, Jennifer', parent: 'quantum', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'quantum-harris', $css: 'rotation-bar' },
    { id: 'harris-3', text: 'Harris, Jennifer', parent: 'quantum', type: 'task', start: utc(2026, 3, 10), end: utc(2026, 3, 20), row: 'quantum-harris', $css: 'rotation-bar' },
    { id: 'clark-1', text: 'Clark, Daniel', parent: 'quantum', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 13), row: 'quantum-clark', $css: 'rotation-bar' },
    { id: 'clark-2', text: 'Clark, Daniel', parent: 'quantum', type: 'task', start: utc(2026, 2, 20), end: utc(2026, 3, 1), row: 'quantum-clark', $css: 'rotation-bar' },
    { id: 'lewis-1', text: 'Lewis, Amanda', parent: 'quantum', type: 'task', start: utc(2026, 2, 9), end: utc(2026, 2, 20), row: 'quantum-lewis', $css: 'rotation-bar' },
    { id: 'lewis-2', text: 'Lewis, Amanda', parent: 'quantum', type: 'task', start: utc(2026, 3, 6), end: utc(2026, 3, 17), row: 'quantum-lewis', $css: 'rotation-bar' },
    { id: 'walker-1', text: 'Walker, Kevin', parent: 'quantum', type: 'task', start: utc(2026, 2, 2), end: utc(2026, 2, 10), row: 'quantum-walker', $css: 'rotation-bar' },
    { id: 'walker-2', text: 'Walker, Kevin', parent: 'quantum', type: 'task', start: utc(2026, 2, 16), end: utc(2026, 2, 27), row: 'quantum-walker', $css: 'rotation-bar' },
    { id: 'walker-3', text: 'Walker, Kevin', parent: 'quantum', type: 'task', start: utc(2026, 3, 1), end: utc(2026, 3, 12), row: 'quantum-walker', $css: 'rotation-bar' },
    { id: 'young-1', text: 'Young, Michelle', parent: 'quantum', type: 'task', start: utc(2026, 2, 5), end: utc(2026, 2, 16), row: 'quantum-young', $css: 'rotation-bar' },
    { id: 'young-2', text: 'Young, Michelle', parent: 'quantum', type: 'task', start: utc(2026, 2, 23), end: utc(2026, 3, 3), row: 'quantum-young', $css: 'rotation-bar' },
  ], []);

  const scales = useMemo(
    () => [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 1, format: '%w' },
    ],
    [],
  );

  const columns = useMemo(() => [{ id: 'text', header: 'Name', flexgrow: 1 }], []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .wx-gantt .wx-bar.rotation-bar { background: #10b981; border-color: #059669; }
        .wx-gantt .wx-bar.rotation-bar.wx-selected {
          background: #059669;
          border: 2px solid #047857;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4);
        }
        .wx-gantt .wx-bar .wx-progress-marker { display: none; }
      `}</style>
      <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
        <strong>Instructions:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Click and drag on empty space to create a selection rectangle</li>
          <li>Release to select all tasks within the rectangle</li>
          <li>Hold Ctrl/Cmd while dragging to add to existing selection</li>
          <li>Drag any selected task to move ALL selected tasks together</li>
          <li><strong>Copy/Paste:</strong> Select tasks, press Ctrl+C to copy, click on empty space, press Ctrl+V to paste</li>
          <li>Press Ctrl+Z to undo</li>
          <li><strong>Overlap Warning:</strong> Tasks that overlap in the same row show a red border and warning icon</li>
        </ul>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Gantt
          {...skinSettings}
          tasks={tasks}
          scales={scales}
          columns={columns}
          start={startDate}
          end={endDate}
          cellWidth={80}
          cellHeight={38}
          scaleHeight={28}
          lengthUnit="week"
          marqueeSelect={true}
          copyPaste={true}
          multiTaskRows={true}
          undo={true}
          currentWeekHighlight={true}
          scrollToCurrentWeek={true}
          allowTaskIntersection={false}
        />
      </div>
    </div>
  );
}
