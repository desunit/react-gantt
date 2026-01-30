import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback,
} from 'react';
import CellGrid from './CellGrid.jsx';
import Bars from './Bars.jsx';
import { hotkeys } from '@svar-ui/grid-store';
import storeContext from '../../context';
import { useStore, useStoreWithCounter } from '@svar-ui/lib-react';
import './Chart.css';
import TimeScales from './TimeScale.jsx';
import { useRenderTime } from '../../helpers/debug.js';

function Chart(props) {
  const {
    readonly,
    fullWidth,
    fullHeight,
    taskTemplate,
    cellBorders,
    highlightTime,
    multiTaskRows = false,
    rowMapping = null,
    marqueeSelect = false,
    copyPaste = false,
    scrollToCurrentWeek = false,
    currentWeekColor = null,
    allowTaskIntersection = true,
  } = props;

  const api = useContext(storeContext);

  const [selected, selectedCounter] = useStoreWithCounter(api, '_selected');
  const rScrollTop = useStore(api, 'scrollTop');
  const cellHeight = useStore(api, 'cellHeight');
  const cellWidth = useStore(api, 'cellWidth');
  const scales = useStore(api, '_scales');
  const markers = useStore(api, '_markers');
  const rScrollTask = useStore(api, '_scrollTask');
  const zoom = useStore(api, 'zoom');
  const rTasks = useStore(api, '_tasks');

  const [chartHeight, setChartHeight] = useState();
  const chartRef = useRef(null);
  const zoomAccumulatorRef = useRef(0);
  const hasScrolledToCurrentWeekRef = useRef(false);

  const extraRows = 1 + (scales?.rows?.length || 0);

  // Compute adjusted Y positions for multiTaskRows
  const taskYPositions = useMemo(() => {
    if (!multiTaskRows || !rowMapping || !rTasks?.length) return null;

    const yMap = new Map();
    const rowIndexMap = new Map();
    const seenRows = [];

    rTasks.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });

    rTasks.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      const rowIndex = rowIndexMap.get(rowId) ?? 0;
      yMap.set(task.id, rowIndex * cellHeight);
    });

    return yMap;
  }, [rTasks, multiTaskRows, rowMapping, cellHeight]);

  const selectStyle = useMemo(() => {
    const t = [];
    if (selected && selected.length && cellHeight) {
      selected.forEach((obj) => {
        // Use adjusted Y if multiTaskRows is enabled
        const adjustedY = taskYPositions?.get(obj.id) ?? obj.$y;
        t.push({ height: `${cellHeight}px`, top: `${adjustedY - 3}px` });
      });
    }
    return t;
  }, [selectedCounter, cellHeight, taskYPositions]);

  const chartGridHeight = useMemo(
    () => Math.max(chartHeight || 0, fullHeight),
    [chartHeight, fullHeight],
  );

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    if (typeof rScrollTop === 'number') {
      el.scrollTop = rScrollTop;
    }
  }, [rScrollTop]);

  const onScroll = () => {
    const scroll = { left: true };
    setScroll(scroll);
  };

  function setScroll(scroll) {
    const el = chartRef.current;
    if (!el) return;
    const pos = {};
    if (scroll.left) pos.left = el.scrollLeft;
    api.exec('scroll-chart', pos);
  }

  function dataRequest() {
    const el = chartRef.current;
    const clientHeightLocal = chartHeight || 0;
    const num = Math.ceil(clientHeightLocal / (cellHeight || 1)) + 1;
    const pos = Math.floor(((el && el.scrollTop) || 0) / (cellHeight || 1));
    const start = Math.max(0, pos - extraRows);
    const end = pos + num + extraRows;
    const from = start * (cellHeight || 0);
    api.exec('render-data', {
      start,
      end,
      from,
    });
  }

  useEffect(() => {
    dataRequest();
  }, [chartHeight, rScrollTop]);

  const showTask = useCallback(
    (value) => {
      if (!value) return;

      const { id, mode } = value;

      if (mode.toString().indexOf('x') < 0) return;
      const el = chartRef.current;
      if (!el) return;
      const { clientWidth } = el;
      const task = api.getTask(id);
      if (task.$x + task.$w < el.scrollLeft) {
        api.exec('scroll-chart', { left: task.$x - (cellWidth || 0) });
        el.scrollLeft = task.$x - (cellWidth || 0);
      } else if (task.$x >= clientWidth + el.scrollLeft) {
        const width = clientWidth < task.$w ? cellWidth || 0 : task.$w;
        api.exec('scroll-chart', { left: task.$x - clientWidth + width });
        el.scrollLeft = task.$x - clientWidth + width;
      }
    },
    [api, cellWidth],
  );

  useEffect(() => {
    showTask(rScrollTask);
  }, [rScrollTask]);

  function onWheel(e) {
    if (zoom && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const el = chartRef.current;
      const offset = e.clientX - (el ? el.getBoundingClientRect().left : 0);

      // Accumulate delta for smoother zoom (threshold ~3 wheel ticks)
      zoomAccumulatorRef.current += e.deltaY;
      const threshold = 150;

      if (Math.abs(zoomAccumulatorRef.current) >= threshold) {
        const dir = -Math.sign(zoomAccumulatorRef.current);
        zoomAccumulatorRef.current = 0;
        api.exec('zoom-scale', {
          dir,
          offset,
        });
      }
    }
  }

  const getHoliday = useCallback((cell) => {
    const style = highlightTime(cell.date, cell.unit);
    if (style)
      return {
        css: style,
        width: cell.width,
      };
    return null;
  }, [highlightTime]);

  const holidays = useMemo(() => {
    if (!scales || !highlightTime) return null;
    // Support day, hour, and week units for highlighting
    const supportedUnits = ['hour', 'day', 'week'];
    if (!supportedUnits.includes(scales.minUnit)) return null;

    // Calculate left positions for each cell
    let accumulatedLeft = 0;
    return scales.rows[scales.rows.length - 1].cells.map((cell) => {
      const holiday = getHoliday(cell);
      const left = accumulatedLeft;
      accumulatedLeft += cell.width;
      if (holiday) {
        return { ...holiday, left };
      }
      return null;
    });
  }, [scales, highlightTime, getHoliday]);

  const handleHotkey = useCallback(
    (ev) => {
      ev.eventSource = 'chart';
      api.exec('hotkey', ev);
    },
    [api],
  );

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const update = () => setChartHeight(el.clientHeight);
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [chartRef.current]);

  const cleanupRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    if (cleanupRef.current) return;
    cleanupRef.current = hotkeys(el, {
      keys: {
        arrowup: true,
        arrowdown: true,
      },
      exec: (v) => handleHotkey(v),
    });
    return () => {
      cleanupRef.current?.destroy();
      cleanupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;

    const handler = onWheel;
    node.addEventListener('wheel', handler);
    return () => {
      node.removeEventListener('wheel', handler);
    };
  }, [onWheel]);

  // Scroll to center current week on mount
  useEffect(() => {
    if (!scrollToCurrentWeek || hasScrolledToCurrentWeekRef.current) return;
    if (!scales || !chartRef.current || !chartHeight) return;

    const el = chartRef.current;
    const { clientWidth } = el;

    // Find current week cell in the bottom scale row
    const now = new Date();
    const cells = scales.rows[scales.rows.length - 1]?.cells;
    if (!cells) return;

    let currentWeekIndex = -1;
    let accumulatedWidth = 0;
    const cellPositions = []; // Store {left, width} for each cell

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cellPositions.push({ left: accumulatedWidth, width: cell.width });

      const cellStart = cell.date;
      // Week cell: check if now is within 7 days of the cell start
      if (cell.unit === 'week') {
        const cellEnd = new Date(cellStart);
        cellEnd.setDate(cellEnd.getDate() + 7);
        if (now >= cellStart && now < cellEnd) {
          currentWeekIndex = i;
        }
      } else if (cell.unit === 'day') {
        // Day cell: check if same date
        if (
          now.getFullYear() === cellStart.getFullYear() &&
          now.getMonth() === cellStart.getMonth() &&
          now.getDate() === cellStart.getDate()
        ) {
          currentWeekIndex = i;
        }
      }
      accumulatedWidth += cell.width;
    }

    // Use previous week if current week found
    let targetIndex = currentWeekIndex;
    if (currentWeekIndex > 0) {
      targetIndex = currentWeekIndex - 1; // Previous week
    }

    if (targetIndex >= 0 && cellPositions[targetIndex]) {
      const target = cellPositions[targetIndex];
      // Scroll so previous week is at the left edge of viewport
      const scrollLeft = Math.max(0, target.left);
      el.scrollLeft = scrollLeft;
      api.exec('scroll-chart', { left: scrollLeft });
      hasScrolledToCurrentWeekRef.current = true;
    }
  }, [scrollToCurrentWeek, scales, chartHeight, api]);

  useRenderTime("chart");
  
  return (
    <div
      className="wx-mR7v2Xag wx-chart"
      tabIndex={-1}
      ref={chartRef}
      onScroll={onScroll}
    >
      <TimeScales highlightTime={highlightTime} scales={scales} />
      {markers && markers.length ? (
        <div
          className="wx-mR7v2Xag wx-markers"
          style={{ height: `${chartGridHeight}px` }}
        >
          {markers.map((marker, i) => (
            <div
              key={i}
              className={`wx-mR7v2Xag wx-marker ${marker.css || ''}`}
              style={{ left: `${marker.left}px` }}
            >
              <div className="wx-mR7v2Xag wx-content">{marker.text}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className="wx-mR7v2Xag wx-area"
        style={{ width: `${fullWidth}px`, height: `${chartGridHeight}px` }}
      >
        {holidays ? (
          <div
            className="wx-mR7v2Xag wx-gantt-holidays"
            style={{ height: '100%' }}
          >
            {holidays.map((holiday, i) =>
              holiday ? (
                <div
                  key={i}
                  className={'wx-mR7v2Xag ' + holiday.css}
                  style={{
                    width: `${holiday.width}px`,
                    left: `${holiday.left}px`,
                  }}
                />
              ) : null,
            )}
          </div>
        ) : null}

        <CellGrid borders={cellBorders} />

        {selected && selected.length
          ? selected.map((obj, index) =>
              obj.$y ? (
                <div
                  key={obj.id}
                  className="wx-mR7v2Xag wx-selected"
                  data-id={obj.id}
                  style={selectStyle[index]}
                ></div>
              ) : null,
            )
          : null}

        <Bars
          readonly={readonly}
          taskTemplate={taskTemplate}
          multiTaskRows={multiTaskRows}
          rowMapping={rowMapping}
          marqueeSelect={marqueeSelect}
          copyPaste={copyPaste}
          allowTaskIntersection={allowTaskIntersection}
        />
      </div>
    </div>
  );
}

export default Chart;
