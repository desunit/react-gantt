import { useMemo } from 'react';
import { Gantt } from '../../src/';

export default function GanttMarqueeSelect({ skinSettings }) {
  // First task starts Mar 2, 2026. Start date 20 weeks before = Oct 13, 2025
  const startDate = new Date(2025, 9, 13); // 20 weeks before first task

  const tasks = useMemo(() => [
    // Horizon Media (Stellar Brands)
    { id: 'horizon', text: 'Horizon Media (Stellar Brands)', parent: 0, type: 'summary', open: true },
    { id: 'anderson-1', text: 'Anderson, Marcus', parent: 'horizon', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 13), row: 'horizon-anderson', $css: 'rotation-bar' },
    { id: 'anderson-2', text: 'Anderson, Marcus', parent: 'horizon', type: 'task', start: new Date(2026, 2, 16), end: new Date(2026, 2, 27), row: 'horizon-anderson', $css: 'rotation-bar' },
    { id: 'anderson-3', text: 'Anderson, Marcus', parent: 'horizon', type: 'task', start: new Date(2026, 3, 6), end: new Date(2026, 3, 17), row: 'horizon-anderson', $css: 'rotation-bar' },
    { id: 'nakamura-1', text: 'Nakamura, Yuki', parent: 'horizon', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 8), row: 'horizon-nakamura', $css: 'rotation-bar' },
    { id: 'nakamura-2', text: 'Nakamura, Yuki', parent: 'horizon', type: 'task', start: new Date(2026, 2, 12), end: new Date(2026, 2, 20), row: 'horizon-nakamura', $css: 'rotation-bar' },
    { id: 'nakamura-3', text: 'Nakamura, Yuki', parent: 'horizon', type: 'task', start: new Date(2026, 2, 30), end: new Date(2026, 3, 10), row: 'horizon-nakamura', $css: 'rotation-bar' },
    { id: 'oconnor-1', text: "O'Connor, Patrick", parent: 'horizon', type: 'task', start: new Date(2026, 2, 9), end: new Date(2026, 2, 20), row: 'horizon-oconnor', $css: 'rotation-bar' },
    { id: 'oconnor-2', text: "O'Connor, Patrick", parent: 'horizon', type: 'task', start: new Date(2026, 2, 23), end: new Date(2026, 3, 3), row: 'horizon-oconnor', $css: 'rotation-bar' },

    // CloudNine Platform (Vertex Solutions)
    { id: 'cloudnine', text: 'CloudNine Platform (Vertex Solutions)', parent: 0, type: 'summary', open: true },
    { id: 'berg-1', text: 'Berg, Helena', parent: 'cloudnine', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 10), row: 'cloudnine-berg', $css: 'rotation-bar' },
    { id: 'berg-2', text: 'Berg, Helena', parent: 'cloudnine', type: 'task', start: new Date(2026, 2, 16), end: new Date(2026, 2, 27), row: 'cloudnine-berg', $css: 'rotation-bar' },
    { id: 'berg-3', text: 'Berg, Helena', parent: 'cloudnine', type: 'task', start: new Date(2026, 3, 1), end: new Date(2026, 3, 12), row: 'cloudnine-berg', $css: 'rotation-bar' },
    { id: 'santos-1', text: 'Santos, Rafael', parent: 'cloudnine', type: 'task', start: new Date(2026, 2, 5), end: new Date(2026, 2, 15), row: 'cloudnine-santos', $css: 'rotation-bar' },
    { id: 'santos-2', text: 'Santos, Rafael', parent: 'cloudnine', type: 'task', start: new Date(2026, 3, 1), end: new Date(2026, 3, 8), row: 'cloudnine-santos', $css: 'rotation-bar' },
    { id: 'santos-3', text: 'Santos, Rafael', parent: 'cloudnine', type: 'task', start: new Date(2026, 3, 13), end: new Date(2026, 3, 24), row: 'cloudnine-santos', $css: 'rotation-bar' },

    // DataSync Pro (Nexus Corp)
    { id: 'datasync', text: 'DataSync Pro (Nexus Corp)', parent: 0, type: 'summary', open: true },
    { id: 'kim-1', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 6), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'kim-2', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: new Date(2026, 2, 9), end: new Date(2026, 2, 18), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'kim-3', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: new Date(2026, 2, 23), end: new Date(2026, 3, 5), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'kim-4', text: 'Kim, Ji-Won', parent: 'datasync', type: 'task', start: new Date(2026, 3, 10), end: new Date(2026, 3, 20), row: 'datasync-kim', $css: 'rotation-bar' },
    { id: 'mueller-1', text: 'Mueller, Franz', parent: 'datasync', type: 'task', start: new Date(2026, 2, 2), end: new Date(2026, 2, 13), row: 'datasync-mueller', $css: 'rotation-bar' },
    { id: 'mueller-2', text: 'Mueller, Franz', parent: 'datasync', type: 'task', start: new Date(2026, 2, 20), end: new Date(2026, 3, 1), row: 'datasync-mueller', $css: 'rotation-bar' },
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
          <li>Press Ctrl+Z to undo the entire bulk move</li>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <Gantt
          {...skinSettings}
          tasks={tasks}
          scales={scales}
          columns={columns}
          start={startDate}
          cellWidth={80}
          cellHeight={38}
          scaleHeight={28}
          lengthUnit="week"
          marqueeSelect={true}
          multiTaskRows={true}
          undo={true}
          currentWeekHighlight={true}
          scrollToCurrentWeek={true}
        />
      </div>
    </div>
  );
}
