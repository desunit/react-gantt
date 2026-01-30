import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { locate, locateID } from '@svar-ui/lib-dom';
import { getID } from '../../helpers/locate';
import storeContext from '../../context';
import { useStore, useStoreWithCounter } from '@svar-ui/lib-react';
import { isSegmentMoveAllowed, extendDragOptions } from '@svar-ui/gantt-store';
import { Button } from '@svar-ui/react-core';
import Links from './Links.jsx';
import BarSegments from './BarSegments.jsx';
import './Bars.css';

// Module-level clipboard (persists across renders)
let clipboardTasks = [];
let clipboardBaseDate = null;
let clipboardParent = null;

// Convert local date to UTC date (same calendar day)
const localToUTC = (date) => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

// Pixel to date conversion helper - snaps to cell start (beginning of week/day/etc)
// All date operations use UTC to ignore timezones
const pixelToDate = (px, scales) => {
  if (!scales || !scales.start) return null;
  const { start, lengthUnitWidth, lengthUnit } = scales;
  const msPerDay = 86400000;
  const daysPerUnit = lengthUnit === 'week' ? 7 : lengthUnit === 'month' ? 30 : lengthUnit === 'quarter' ? 91 : lengthUnit === 'year' ? 365 : 1;
  // Floor to snap to the beginning of the cell
  const units = Math.floor(px / lengthUnitWidth);
  // Convert start to UTC first (it might be at local midnight)
  const startUTC = localToUTC(start);
  const date = new Date(startUTC.getTime() + units * daysPerUnit * msPerDay);
  return date;
};

// Get cell offset (in whole cells) between two dates
const getCellOffset = (date, baseDate, scales) => {
  if (!scales || !date || !baseDate) return 0;
  const { lengthUnit } = scales;
  const msPerDay = 86400000;
  const daysPerUnit = lengthUnit === 'week' ? 7 : lengthUnit === 'month' ? 30 : lengthUnit === 'quarter' ? 91 : lengthUnit === 'year' ? 365 : 1;
  const msPerUnit = daysPerUnit * msPerDay;
  return Math.round((date.getTime() - baseDate.getTime()) / msPerUnit);
};

// Add cells to a date (UTC)
const addCells = (date, cells, scales) => {
  if (!scales || !date) return date;
  const { lengthUnit } = scales;
  const msPerDay = 86400000;
  const daysPerUnit = lengthUnit === 'week' ? 7 : lengthUnit === 'month' ? 30 : lengthUnit === 'quarter' ? 91 : lengthUnit === 'year' ? 365 : 1;
  const msPerUnit = daysPerUnit * msPerDay;
  const result = new Date(date.getTime() + cells * msPerUnit);
  // Normalize to start of day (UTC midnight)
  result.setUTCHours(0, 0, 0, 0);
  return result;
};

// Check if two horizontal bounds overlap (AABB collision)
const boundsOverlap = (left1, right1, left2, right2) => {
  return left1 < right2 && right1 > left2;
};

function Bars(props) {
  const {
    readonly,
    taskTemplate: TaskTemplate,
    multiTaskRows = false,
    rowMapping = null,
    marqueeSelect = false,
    copyPaste = false,
    allowTaskIntersection = true,
  } = props;

  const api = useContext(storeContext);

  const [rTasksValue, rTasksCounter] = useStoreWithCounter(api, '_tasks');
  const [rLinksValue, rLinksCounter] = useStoreWithCounter(api, '_links');
  const areaValue = useStore(api, 'area');
  const scalesValue = useStore(api, '_scales');
  const taskTypesValue = useStore(api, 'taskTypes');
  const baselinesValue = useStore(api, 'baselines');
  const [selectedValue, selectedCounter] = useStoreWithCounter(api, '_selected');
  const scrollTaskStore = useStore(api, '_scrollTask');
  const criticalPath = useStore(api, 'criticalPath');
  const tree = useStore(api, 'tasks');
  const schedule = useStore(api, 'schedule');
  const splitTasks = useStore(api, 'splitTasks');

  const tasks = useMemo(() => {
    if (!areaValue || !Array.isArray(rTasksValue)) return [];
    const start = areaValue.start ?? 0;
    const end = areaValue.end ?? 0;

    // When multiTaskRows is enabled, the store's area calculation doesn't account
    // for reduced row count. Include all tasks and let CSS overflow handle visibility.
    // This is safe because the container height is already correctly calculated.
    if (multiTaskRows && rowMapping) {
      return rTasksValue.map((a) => ({ ...a }));
    }

    return rTasksValue.slice(start, end).map((a) => ({ ...a }));
  }, [rTasksCounter, areaValue, multiTaskRows, rowMapping]);

  // Adjust task $y positions for multiTaskRows
  const cellHeight = useStore(api, 'cellHeight');
  const adjustedTasks = useMemo(() => {
    if (!multiTaskRows || !rowMapping || !tasks.length) return tasks;

    // Build rowId to rowIndex map
    const rowIndexMap = new Map();
    const seenRows = [];

    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });

    // Adjust $y for visible tasks
    return tasks.map((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      const rowIndex = rowIndexMap.get(rowId) ?? 0;
      return {
        ...task,
        $y: rowIndex * cellHeight,
        $y_base: task.$y_base !== undefined ? rowIndex * cellHeight : undefined,
      };
    });
  }, [tasks, multiTaskRows, rowMapping, rTasksValue, cellHeight]);

  const lengthUnitWidth = useMemo(
    () => scalesValue.lengthUnitWidth,
    [scalesValue],
  );

  const lengthUnit = useMemo(
    () => scalesValue.lengthUnit || 'day',
    [scalesValue],
  );

  const ignoreNextClickRef = useRef(false);

  const [linkFrom, setLinkFrom] = useState(undefined);
  const [taskMove, setTaskMove] = useState(null);
  const progressFromRef = useRef(null);

  const [selectedLink, setSelectedLink] = useState(null);

  const [touched, setTouched] = useState(undefined);
  const touchTimerRef = useRef(null);

  const [totalWidth, setTotalWidth] = useState(0);

  // Marquee selection state
  const [marquee, setMarquee] = useState(null);
  // Ref to track latest marquee coords (since React state may not update before mouseup)
  const marqueeRef = useRef(null);
  // Bulk move state
  const [bulkMove, setBulkMove] = useState(null);
  // Paste target position (for copy/paste feature)
  const [pasteTargetDate, setPasteTargetDate] = useState(null);
  // Paste preview mode state
  const [pastePreview, setPastePreview] = useState(null);
  // Shape: { tasks: [], baseDate, parent, currentX }
  // Ref for copy/paste handler to avoid stale closure
  const pasteTargetDateRef = useRef(null);
  pasteTargetDateRef.current = pasteTargetDate;
  // Track last mouse X position in container (for paste preview initial position)
  const lastMouseXRef = useRef(200);

  const containerRef = useRef(null);

  const hasFocus = useMemo(() => {
    const el = containerRef.current;
    return !!(
      selectedValue.length &&
      el &&
      el.contains(document.activeElement)
    );
  }, [selectedValue, containerRef.current]);

  const focused = useMemo(() => {
    return hasFocus && selectedValue[selectedValue.length - 1]?.id;
  }, [hasFocus, selectedValue]);

  useEffect(() => {
    if (!scrollTaskStore) return;
    if (hasFocus && scrollTaskStore) {
      const { id } = scrollTaskStore;
      const node = containerRef.current?.querySelector(
        `.wx-bar[data-id='${id}']`,
      );
      if (node) node.focus({ preventScroll: true });
    }
  }, [scrollTaskStore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setTotalWidth(el.offsetWidth || 0);
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]) {
          setTotalWidth(entries[0].contentRect.width);
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, [containerRef.current]);

  const startDrag = useCallback(() => {
    document.body.style.userSelect = 'none';
  }, []);

  const endDrag = useCallback(() => {
    document.body.style.userSelect = '';
  }, []);

  const getMoveMode = useCallback(
    (node, e, task) => {
      if (e.target.classList.contains('wx-line')) return '';
      if (!task) task = api.getTask(getID(node));
      if (task.type === 'milestone' || task.type === 'summary') return '';

      const segmentNode = locate(e, 'data-segment');
      if (segmentNode) node = segmentNode;

      const { left, width } = node.getBoundingClientRect();
      const p = (e.clientX - left) / width;
      let delta = 0.2 / (width > 200 ? width / 200 : 1);
      if (p < delta) return 'start';
      if (p > 1 - delta) return 'end';
      return '';
    },
    [api],
  );

  // Compute which tasks are overlapping with others in the same row
  // Returns a Set of task IDs that have collisions
  const overlappingTaskIds = useMemo(() => {
    const overlapping = new Set();

    // Only check for overlaps if allowTaskIntersection is false and multiTaskRows is enabled
    if (allowTaskIntersection || !multiTaskRows || !rowMapping) {
      return overlapping;
    }

    // Group tasks by row
    const tasksByRow = new Map();
    rTasksValue.forEach((task) => {
      // Skip summary and milestone tasks
      if (task.type === 'summary' || task.type === 'milestone') return;

      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!tasksByRow.has(rowId)) {
        tasksByRow.set(rowId, []);
      }
      tasksByRow.get(rowId).push(task);
    });

    // Check each row for overlaps
    tasksByRow.forEach((rowTasks) => {
      if (rowTasks.length < 2) return;

      // Check each pair of tasks in the row
      for (let i = 0; i < rowTasks.length; i++) {
        for (let j = i + 1; j < rowTasks.length; j++) {
          const task1 = rowTasks[i];
          const task2 = rowTasks[j];

          const left1 = task1.$x;
          const right1 = task1.$x + task1.$w;
          const left2 = task2.$x;
          const right2 = task2.$x + task2.$w;

          if (boundsOverlap(left1, right1, left2, right2)) {
            overlapping.add(task1.id);
            overlapping.add(task2.id);
          }
        }
      }
    });

    return overlapping;
  }, [allowTaskIntersection, multiTaskRows, rowMapping, rTasksValue, rTasksCounter]);

  // Precompute adjusted Y positions for all tasks (used for marquee intersection)
  const taskYPositions = useMemo(() => {
    const yMap = new Map();

    if (!multiTaskRows || !rowMapping) {
      // No multi-row adjustment - use original $y
      rTasksValue.forEach((task) => {
        yMap.set(task.id, task.$y);
      });
      return yMap;
    }

    // Build rowIndex map
    const rowIndexMap = new Map();
    const seenRows = [];
    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });

    // Compute adjusted Y for each task
    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      const rowIndex = rowIndexMap.get(rowId) ?? 0;
      yMap.set(task.id, rowIndex * cellHeight);
    });

    return yMap;
  }, [rTasksValue, multiTaskRows, rowMapping, cellHeight]);

  // Map rowId to Y position (for paste preview ghosts)
  const rowYPositions = useMemo(() => {
    const yMap = new Map();

    if (!multiTaskRows || !rowMapping) {
      // Without multiTaskRows, each task is its own row
      rTasksValue.forEach((task) => {
        yMap.set(task.id, task.$y);
        if (task.row !== undefined) {
          yMap.set(task.row, task.$y);
        }
      });
      return yMap;
    }

    // Build rowIndex map
    const rowIndexMap = new Map();
    const seenRows = [];
    rTasksValue.forEach((task) => {
      const rowId = rowMapping.taskRows.get(task.id) ?? task.id;
      if (!rowIndexMap.has(rowId)) {
        rowIndexMap.set(rowId, seenRows.length);
        seenRows.push(rowId);
      }
    });

    // Map rowId to Y position
    rowIndexMap.forEach((rowIndex, rowId) => {
      yMap.set(rowId, rowIndex * cellHeight);
    });

    return yMap;
  }, [rTasksValue, multiTaskRows, rowMapping, cellHeight]);

  // Get tasks intersecting with a rectangle
  // Marquee coordinates are already in content-space because getBoundingClientRect()
  // on a scrolled element returns position accounting for scroll offset
  const getIntersectingTasks = useCallback(
    (rect) => {
      const container = containerRef.current;
      if (!container) return [];

      // Marquee coords are already content-space (no scroll adjustment needed)
      // because getBoundingClientRect() on .wx-bars accounts for parent scroll
      const minX = Math.min(rect.startX, rect.currentX);
      const maxX = Math.max(rect.startX, rect.currentX);
      const minY = Math.min(rect.startY, rect.currentY);
      const maxY = Math.max(rect.startY, rect.currentY);

      return rTasksValue.filter((task) => {
        const taskLeft = task.$x;
        const taskRight = task.$x + task.$w;
        const taskAbsoluteY = taskYPositions.get(task.id) ?? task.$y;
        const taskTop = taskAbsoluteY;
        const taskBottom = taskTop + task.$h;

        return (
          taskLeft < maxX &&
          taskRight > minX &&
          taskTop < maxY &&
          taskBottom > minY
        );
      });
    },
    [rTasksValue, taskYPositions],
  );

  // Set of selected task IDs for fast lookup
  const selectedIds = useMemo(() => {
    return new Set(selectedValue.map((s) => s.id));
  }, [selectedValue, selectedCounter]);

  // Check if a task is in the current selection
  const isTaskSelected = useCallback(
    (taskId) => {
      return selectedIds.has(taskId);
    },
    [selectedIds],
  );

  const down = useCallback(
    (node, point) => {
      const { clientX } = point;
      const id = getID(node);
      const task = api.getTask(id);
      const css = point.target.classList;
      if (point.target.closest('.wx-delete-button')) return;
      if (!readonly) {
        if (css.contains('wx-progress-marker')) {
          const { progress } = api.getTask(id);
          progressFromRef.current = {
            id,
            x: clientX,
            progress,
            dx: 0,
            node,
            marker: point.target,
          };
          point.target.classList.add('wx-progress-in-drag');
        } else {
          const mode = getMoveMode(node, point, task) || 'move';

          const newTaskMove = {
            id,
            mode,
            x: clientX,
            dx: 0,
            l: task.$x,
            w: task.$w,
          };

          if (splitTasks && task.segments?.length) {
            const segNode = locate(point, 'data-segment');
            if (segNode) {
              newTaskMove.segmentIndex = segNode.dataset['segment'] * 1;
              extendDragOptions(task, newTaskMove);
            }
          }

          setTaskMove(newTaskMove);
        }
        startDrag();
      }
    },
    [api, readonly, getMoveMode, startDrag, splitTasks],
  );

  const mousedown = useCallback(
    (e) => {
      if (e.button !== 0) return;

      // Skip mousedown processing when in paste preview mode
      // Let onClick handle the paste confirmation
      if (pastePreview) return;

      const node = locate(e);

      // Marquee selection: click on empty space
      if (!node && marqueeSelect && !readonly) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        // Convert viewport coordinates to content-space coordinates
        // The .wx-bars element spans the full content width, so its bounding rect
        // already accounts for scroll - no need to add scrollLeft
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        // Track click position for paste target (copyPaste feature)
        // Update ref directly for immediate access (state update may not be ready before Ctrl+V)
        if (copyPaste) {
          const clickDate = pixelToDate(startX, scalesValue);
          if (clickDate) {
            pasteTargetDateRef.current = clickDate; // Direct ref update for immediate access
            setPasteTargetDate(clickDate);
          }
        }

        const marqueeData = {
          startX,
          startY,
          currentX: startX,
          currentY: startY,
          ctrlKey: e.ctrlKey || e.metaKey,
        };
        setMarquee(marqueeData);
        marqueeRef.current = marqueeData;
        startDrag();
        return;
      }

      if (!node) return;

      // Bulk move: click on already-selected task when multiple tasks are selected
      if (marqueeSelect && !readonly && selectedValue.length > 1) {
        const id = getID(node);
        if (isTaskSelected(id)) {
          const css = e.target.classList;
          // Don't start bulk move if clicking on link markers, progress marker, or delete buttons
          if (
            !css.contains('wx-link') &&
            !css.contains('wx-progress-marker') &&
            !e.target.closest('.wx-delete-button')
          ) {
            // Check if we're at a resize edge - if so, don't start bulk move
            const task = api.getTask(id);
            const mode = getMoveMode(node, e, task);
            if (!mode) {
              // Start bulk move
              const originalPositions = new Map();
              selectedValue.forEach((sel) => {
                const t = api.getTask(sel.id);
                if (t) {
                  // Skip summary tasks when auto-schedule is on
                  if (schedule?.auto && t.type === 'summary') return;
                  originalPositions.set(sel.id, {
                    $x: t.$x,
                    $w: t.$w,
                    start: t.start,
                    end: t.end,
                  });
                }
              });

              setBulkMove({
                baseTaskId: id,
                startX: e.clientX,
                dx: 0,
                originalPositions,
              });
              startDrag();
              return;
            }
          }
        }
      }

      down(node, e);
    },
    [down, marqueeSelect, copyPaste, readonly, selectedValue, isTaskSelected, api, getMoveMode, schedule, startDrag, scalesValue, pastePreview],
  );

  const touchstart = useCallback(
    (e) => {
      const node = locate(e);
      if (node) {
        touchTimerRef.current = setTimeout(() => {
          setTouched(true);
          down(node, e.touches[0]);
        }, 300);
      }
    },
    [down],
  );

  const onSelectLink = useCallback(
    (id) => {
      setSelectedLink(id && { ...rLinksValue.find((link) => link.id === id) });
    },
    [rLinksValue],
  );

  const up = useCallback(() => {
    // Handle marquee selection finalization
    // Use ref instead of state since React may not have flushed state updates yet
    const currentMarquee = marqueeRef.current;
    if (currentMarquee) {
      const intersecting = getIntersectingTasks(currentMarquee);

      if (currentMarquee.ctrlKey) {
        // Additive selection: toggle each intersecting task
        intersecting.forEach((task) => {
          api.exec('select-task', { id: task.id, toggle: true, marquee: true });
        });
      } else {
        // Replace selection: clear first, then select intersecting
        // First clear any existing selection
        if (selectedValue.length > 0) {
          api.exec('select-task', { id: null, marquee: true });
        }
        // Then select all intersecting tasks
        intersecting.forEach((task, index) => {
          api.exec('select-task', {
            id: task.id,
            toggle: index > 0, // First one replaces, rest toggle (add)
            marquee: true,
          });
        });
      }

      setMarquee(null);
      marqueeRef.current = null;
      endDrag();
      ignoreNextClickRef.current = true;
      return;
    }

    // Handle bulk move finalization
    if (bulkMove) {
      const { dx, originalPositions } = bulkMove;
      const diff = Math.round(dx / lengthUnitWidth);

      if (diff !== 0) {
        let isFirst = true;
        originalPositions.forEach((_origPos, taskId) => {
          const task = api.getTask(taskId);
          if (task) {
            api.exec('update-task', {
              id: taskId,
              diff,
              task: { start: task.start, end: task.end },
              skipUndo: !isFirst, // Only first task creates undo entry
            });
            isFirst = false;
          }
        });
        ignoreNextClickRef.current = true;
      } else {
        // No actual move, reset visual positions
        originalPositions.forEach((origPos, taskId) => {
          api.exec('drag-task', {
            id: taskId,
            left: origPos.$x,
            width: origPos.$w,
            inProgress: false,
          });
        });
      }

      setBulkMove(null);
      endDrag();
      return;
    }

    if (progressFromRef.current) {
      const { dx, id, marker, value } = progressFromRef.current;
      progressFromRef.current = null;
      if (typeof value != 'undefined' && dx)
        api.exec('update-task', {
          id,
          task: { progress: value },
          inProgress: false,
        });
      marker.classList.remove('wx-progress-in-drag');

      ignoreNextClickRef.current = true;
      endDrag();
    } else if (taskMove) {
      const { id, mode, dx, l, w, start, segment, index } = taskMove;
      setTaskMove(null);
      if (start) {
        const diff = Math.round(dx / lengthUnitWidth);

        if (!diff) {
          api.exec('drag-task', {
            id,
            width: w,
            left: l,
            inProgress: false,
            ...(segment && { segmentIndex: index }),
          });
        } else {
          let update = {};
          let task = api.getTask(id);
          if (segment) task = task.segments[index];

          // Calculate new dates directly instead of relying on store's diff handling
          const msPerDay = 24 * 60 * 60 * 1000;
          const daysPerUnit = lengthUnit === 'week' ? 7 : lengthUnit === 'month' ? 30 : lengthUnit === 'quarter' ? 91 : lengthUnit === 'year' ? 365 : 1;
          const diffMs = diff * daysPerUnit * msPerDay;

          if (mode === 'move') {
            update.start = new Date(task.start.getTime() + diffMs);
            update.end = new Date(task.end.getTime() + diffMs);
          } else if (mode === 'start') {
            update.start = new Date(task.start.getTime() + diffMs);
            update.end = task.end; // Keep end fixed for resize
          } else if (mode === 'end') {
            update.start = task.start; // Keep start fixed for resize
            update.end = new Date(task.end.getTime() + diffMs);
          }

          api.exec('update-task', {
            id,
            task: update,
            ...(segment && { segmentIndex: index }),
          });
        }
        ignoreNextClickRef.current = true;
      }

      endDrag();
    }
  }, [api, endDrag, taskMove, lengthUnitWidth, lengthUnit, marquee, bulkMove, getIntersectingTasks, selectedValue]);

  const move = useCallback(
    (e, point) => {
      const { clientX, clientY } = point;

      // Always track mouse X position for paste preview initial position
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        lastMouseXRef.current = clientX - rect.left;
      }

      // Handle paste preview mode - ghosts follow cursor
      if (pastePreview) {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const currentX = clientX - rect.left;
        setPastePreview(prev => ({ ...prev, currentX }));
        return; // Don't process other interactions
      }

      if (!readonly) {
        // Handle marquee selection drag
        if (marquee) {
          const container = containerRef.current;
          if (!container) return;
          const rect = container.getBoundingClientRect();

          // Convert to content-space coordinates (consistent with task.$x)
          const currentX = clientX - rect.left;
          const currentY = clientY - rect.top;

          // Update both state (for rendering) and ref (for immediate access in mouseup)
          setMarquee((prev) => ({
            ...prev,
            currentX,
            currentY,
          }));
          if (marqueeRef.current) {
            marqueeRef.current.currentX = currentX;
            marqueeRef.current.currentY = currentY;
          }
          return;
        }

        // Handle bulk move drag
        if (bulkMove) {
          const dx = clientX - bulkMove.startX;

          // Apply visual offset to all selected tasks
          bulkMove.originalPositions.forEach((origPos, taskId) => {
            const newLeft = origPos.$x + dx;
            api.exec('drag-task', {
              id: taskId,
              left: newLeft,
              width: origPos.$w,
              inProgress: true,
            });
          });

          setBulkMove((prev) => ({ ...prev, dx }));
          return;
        }

        if (progressFromRef.current) {
          const { node, x, id } = progressFromRef.current;
          const dx = (progressFromRef.current.dx = clientX - x);

          const diff = Math.round((dx / node.offsetWidth) * 100);
          let progress = progressFromRef.current.progress + diff;
          progressFromRef.current.value = progress = Math.min(
            Math.max(0, progress),
            100,
          );

          api.exec('update-task', {
            id,
            task: { progress },
            inProgress: true,
          });
        } else if (taskMove) {
          onSelectLink(null);
          const { mode, l, w, x, id, start, segment, index } = taskMove;
          const task = api.getTask(id);
          const dx = clientX - x;
          if (
            (!start && Math.abs(dx) < 20) ||
            (mode === 'start' && w - dx < lengthUnitWidth) ||
            (mode === 'end' && w + dx < lengthUnitWidth) ||
            (mode === 'move' &&
              ((dx < 0 && l + dx < 0) ||
                (dx > 0 && l + w + dx > totalWidth))) ||
            (taskMove.segment && !isSegmentMoveAllowed(task, taskMove))
          )
            return;

          const nextTaskMove = { ...taskMove, dx };

          let left, width;
          if (mode === 'start') {
            left = l + dx;
            width = w - dx;
          } else if (mode === 'end') {
            left = l;
            width = w + dx;
          } else if (mode === 'move') {
            left = l + dx;
            width = w;
          }

          api.exec('drag-task', {
            id,
            width: width,
            left: left,
            inProgress: true,
            ...(segment && { segmentIndex: index }),
          });

          if (
            !nextTaskMove.start &&
            ((mode === 'move' && task.$x == l) ||
              (mode !== 'move' && task.$w == w))
          ) {
            ignoreNextClickRef.current = true;
            up();
            return;
          }
          nextTaskMove.start = true;
          setTaskMove(nextTaskMove);
        } else {
          const taskNode = locate(e);
          if (taskNode) {
            const task = api.getTask(getID(taskNode));
            const segNode = locate(e, 'data-segment');
            const barNode = segNode || taskNode;
            const mode = getMoveMode(barNode, point, task);
            barNode.style.cursor = mode && !readonly ? 'col-resize' : 'pointer';
          }
        }
      }
    },
    [
      api,
      readonly,
      taskMove,
      lengthUnitWidth,
      totalWidth,
      getMoveMode,
      onSelectLink,
      up,
      marquee,
      bulkMove,
      pastePreview,
    ],
  );

  const mousemove = useCallback(
    (e) => {
      move(e, e);
    },
    [move],
  );

  const touchmove = useCallback(
    (e) => {
      if (touched) {
        e.preventDefault();
        move(e, e.touches[0]);
      } else if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = null;
      }
    },
    [touched, move],
  );

  const mouseup = useCallback(() => {
    up();
  }, [up]);

  const touchend = useCallback(() => {
    setTouched(null);
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
    up();
  }, [up]);

  useEffect(() => {
    window.addEventListener('mouseup', mouseup);
    return () => {
      window.removeEventListener('mouseup', mouseup);
    };
  }, [mouseup]);

  const onDblClick = useCallback(
    (e) => {
      if (!readonly) {
        const id = locateID(e.target);
        if (id && !e.target.classList.contains('wx-link')) {
          const segmentIndex = locateID(e.target, 'data-segment');
          api.exec('show-editor', {
            id,
            ...(segmentIndex !== null && { segmentIndex }),
          });
        }
      }
    },
    [api, readonly],
  );

  const types = ['e2s', 's2s', 'e2e', 's2e'];
  const getLinkType = useCallback((fromStart, toStart) => {
    return types[(fromStart ? 1 : 0) + (toStart ? 0 : 2)];
  }, []);

  const alreadyLinked = useCallback(
    (target, toStart) => {
      const source = linkFrom.id;
      const fromStart = linkFrom.start;

      if (target === source) return true;

      return !!rLinksValue.find((l) => {
        return (
          l.target == target &&
          l.source == source &&
          l.type === getLinkType(fromStart, toStart)
        );
      });
    },
    [linkFrom, rLinksCounter, getLinkType],
  );

  const removeLinkMarker = useCallback(() => {
    if (linkFrom) {
      setLinkFrom(null);
    }
  }, [linkFrom]);

  // Execute paste - creates new tasks at target position
  // Tasks are pasted within the same parent, each task keeps its original row
  const executePaste = useCallback((targetDate, tasks, parent) => {
    if (!tasks.length || !targetDate) return;
    // Note: parent can be 0 (root level), so check for undefined/null specifically
    if (parent === undefined || parent === null) return;

    const msPerDay = 86400000;
    const history = api.getHistory();
    history?.startBatch();

    // Snap target date to the start of the week (Monday) - UTC
    const targetWeekStart = new Date(targetDate);
    const dow = targetWeekStart.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const daysToMonday = dow === 0 ? -6 : 1 - dow;
    targetWeekStart.setUTCDate(targetWeekStart.getUTCDate() + daysToMonday);
    targetWeekStart.setUTCHours(0, 0, 0, 0);

    tasks.forEach((task, i) => {
      const newId = `task-${Date.now()}-${i}`;
      // Calculate the week offset from the target week, then add the day-of-week offset
      const weekOffset = addCells(targetWeekStart, task._startCellOffset || 0, scalesValue);
      const newStart = new Date(weekOffset.getTime() + (task._startDayOfWeek || 0) * msPerDay);
      newStart.setUTCHours(0, 0, 0, 0);
      // Add exact duration in days (not weeks!) to preserve visual width
      const newEnd = new Date(newStart.getTime() + (task._durationDays || 7) * msPerDay);
      newEnd.setUTCHours(0, 0, 0, 0);
      console.log('[paste] task:', task.text, 'newStart:', newStart, 'newEnd:', newEnd, '_durationDays:', task._durationDays, '_startDayOfWeek:', task._startDayOfWeek);

      api.exec('add-task', {
        task: {
          id: newId,
          text: task.text,
          start: newStart,
          end: newEnd,
          type: task.type || 'task',
          parent: parent,
          row: task.row,
        },
        target: parent,
        mode: 'child',
        skipUndo: i > 0,
      });
    });

    history?.endBatch();
  }, [api, scalesValue]);

  const onClick = useCallback(
    (e) => {
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        return;
      }

      // Handle paste preview confirm
      if (pastePreview && pastePreview.currentX != null) {
        const targetDate = pixelToDate(pastePreview.currentX, scalesValue);
        if (targetDate) {
          executePaste(targetDate, pastePreview.tasks, pastePreview.parent);
        }
        setPastePreview(null);
        return;
      }

      const id = locateID(e.target);
      if (id) {
        // Debug: log task info on click
        const clickedTask = api.getTask(id);
        const renderedTask = rTasksValue.find(t => t.id === id);
        console.log('[click] task:', clickedTask?.text, 'id:', id);
        console.log('[click] api.getTask:', { start: clickedTask?.start, end: clickedTask?.end, duration: clickedTask?.duration });
        console.log('[click] rendered:', { start: renderedTask?.start, end: renderedTask?.end, $w: renderedTask?.$w, $x: renderedTask?.$x });

        const css = e.target.classList;
        if (css.contains('wx-link')) {
          const toStart = css.contains('wx-left');
          if (!linkFrom) {
            setLinkFrom({ id, start: toStart });
            return;
          }

          if (linkFrom.id !== id && !alreadyLinked(id, toStart)) {
            api.exec('add-link', {
              link: {
                source: linkFrom.id,
                target: id,
                type: getLinkType(linkFrom.start, toStart),
              },
            });
          }
        } else if (css.contains('wx-delete-button-icon')) {
          api.exec('delete-link', { id: selectedLink.id });
          setSelectedLink(null);
        } else {
          let segmentIndex;
          const segmentNode = locate(e, 'data-segment');
          if (segmentNode) segmentIndex = segmentNode.dataset.segment * 1;
          api.exec('select-task', {
            id,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex,
          });
        }
      }
      removeLinkMarker();
    },
    [
      api,
      linkFrom,
      rLinksCounter,
      selectedLink,
      alreadyLinked,
      getLinkType,
      removeLinkMarker,
      pastePreview,
      scalesValue,
      executePaste,
    ],
  );

  const taskStyle = useCallback((task) => {
    return {
      left: `${task.$x}px`,
      top: `${task.$y}px`,
      width: `${task.$w}px`,
      height: `${task.$h}px`,
    };
  }, []);

  const baselineStyle = useCallback((task) => {
    return {
      left: `${task.$x_base}px`,
      top: `${task.$y_base}px`,
      width: `${task.$w_base}px`,
      height: `${task.$h_base}px`,
    };
  }, []);

  const contextmenu = useCallback(
    (ev) => {
      if (touched || touchTimerRef.current) {
        ev.preventDefault();
        return false;
      }
    },
    [touched],
  );

  const taskTypeIds = useMemo(
    () => taskTypesValue.map((t) => t.id),
    [taskTypesValue],
  );

  const taskTypeCss = useCallback(
    (type) => {
      let css = taskTypeIds.includes(type) ? type : 'task';
      if (!['task', 'milestone', 'summary'].includes(type)) {
        css = `task ${css}`;
      }
      return css;
    },
    [taskTypeIds],
  );

  const forward = useCallback(
    (ev) => {
      api.exec(ev.action, ev.data);
    },
    [api],
  );

  const isTaskCritical = useCallback(
    (taskId) => {
      return criticalPath && tree.byId(taskId).$critical;
    },
    [criticalPath, tree],
  );

  const isLinkMarkerVisible = useCallback(
    (id) => {
      if (schedule?.auto) {
        const summaryIds = tree.getSummaryId(id, true);
        const linkFromSummaryIds = tree.getSummaryId(linkFrom.id, true);
        return (
          linkFrom?.id &&
          !(Array.isArray(summaryIds) ? summaryIds : [summaryIds]).includes(
            linkFrom.id,
          ) &&
          !(
            Array.isArray(linkFromSummaryIds)
              ? linkFromSummaryIds
              : [linkFromSummaryIds]
          ).includes(id)
        );
      }
      return linkFrom;
    },
    [schedule, tree, linkFrom],
  );

  // Copy handler - stores selected tasks in module-level clipboard
  // Only allows copying tasks from the same parent (company), but different rows are OK
  const handleCopy = useCallback(() => {
    const selected = api.getState()._selected;
    if (!selected || !selected.length) return;

    const msPerDay = 86400000;

    // Get all selected tasks with their render data from _tasks
    const tasks = selected.map((sel) => {
      const task = api.getTask(sel.id);
      if (!task) return null;
      // Find the rendered task to get $w (pixel width) and row
      const renderedTask = rTasksValue.find(t => t.id === sel.id);
      if (!renderedTask) return null;
      const { $x, $y, $h, $w, $skip, $level, $index, $y_base, $x_base, $w_base, $h_base, $skip_baseline, $critical, $reorder, ...clean } = renderedTask;
      // Calculate exact duration in days (not cells!) to preserve visual width
      const durationDays = renderedTask.end && renderedTask.start
        ? Math.round((renderedTask.end.getTime() - renderedTask.start.getTime()) / msPerDay)
        : 0;
      // Store day-of-week offset (0=Mon, 6=Sun) to preserve position within week
      // Convert to UTC first since renderedTask.start might be at local midnight
      const startUTC = renderedTask.start ? localToUTC(renderedTask.start) : null;
      const startDayOfWeek = startUTC
        ? (startUTC.getUTCDay() + 6) % 7  // Convert JS Sun=0 to Mon=0
        : 0;
      console.log('[copy] task:', task.text, 'durationDays:', durationDays, 'startDayOfWeek:', startDayOfWeek, '$w:', $w);
      return { ...clean, _durationDays: durationDays, _startDayOfWeek: startDayOfWeek, _originalWidth: $w, _originalHeight: $h };
    }).filter(Boolean);

    if (!tasks.length) return;

    // Check that all tasks have the same parent (company)
    const firstTask = tasks[0];
    const commonParent = firstTask.parent;

    // Filter to only include tasks with matching parent (different rows OK)
    const validTasks = tasks.filter(t => t.parent === commonParent);

    if (validTasks.length === 0) return;

    // Store base date (earliest start) - convert to UTC for consistent alignment
    const baseDate = validTasks.reduce((min, t) => {
      if (!t.start) return min;
      const startUTC = localToUTC(t.start);
      return !min || startUTC < min ? startUTC : min;
    }, null);

    // Store clipboard data with cell offsets (weeks between tasks) and day-level precision
    // Convert all dates to UTC for consistent calculations
    clipboardTasks = validTasks.map(t => ({
      ...t,
      start: t.start ? localToUTC(t.start) : t.start,
      end: t.end ? localToUTC(t.end) : t.end,
      _startCellOffset: getCellOffset(t.start ? localToUTC(t.start) : null, baseDate, scalesValue),
    }));
    clipboardParent = commonParent;
    clipboardBaseDate = baseDate;
  }, [api, scalesValue]);

  // Hotkey intercept for copy/paste
  useEffect(() => {
    if (!copyPaste) return;

    const unsub = api.intercept('hotkey', (ev) => {
      if (ev.key === 'ctrl+c' || ev.key === 'meta+c') {
        handleCopy();
        return false;
      }
      if (ev.key === 'ctrl+v' || ev.key === 'meta+v') {
        // Enter paste preview mode instead of immediate paste
        if (!clipboardTasks.length || !clipboardBaseDate) return false;
        // Use last tracked mouse position for immediate ghost display
        setPastePreview({
          tasks: clipboardTasks,
          baseDate: clipboardBaseDate,
          parent: clipboardParent,
          currentX: lastMouseXRef.current, // Show ghosts at current mouse position
        });
        return false;
      }
    });
    return unsub;
  }, [copyPaste, api, handleCopy]);

  // Escape key to cancel paste preview (separate listener for reliability)
  useEffect(() => {
    if (!pastePreview) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setPastePreview(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [pastePreview]);

  // Compute marquee rectangle style
  const marqueeStyle = useMemo(() => {
    if (!marquee) return null;
    const left = Math.min(marquee.startX, marquee.currentX);
    const top = Math.min(marquee.startY, marquee.currentY);
    const width = Math.abs(marquee.currentX - marquee.startX);
    const height = Math.abs(marquee.currentY - marquee.startY);
    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }, [marquee]);

  return (
    <div
      className="wx-GKbcLEGA wx-bars"
      style={{ lineHeight: `${adjustedTasks.length ? adjustedTasks[0].$h : 0}px` }}
      ref={containerRef}
      onContextMenu={contextmenu}
      onMouseDown={mousedown}
      onMouseMove={mousemove}
      onTouchStart={touchstart}
      onTouchMove={touchmove}
      onTouchEnd={touchend}
      onClick={onClick}
      onDoubleClick={onDblClick}
      onDragStart={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <Links
        onSelectLink={onSelectLink}
        selectedLink={selectedLink}
        readonly={readonly}
      />
      {adjustedTasks.map((task) => {
        if (task.$skip && task.$skip_baseline) return null;
        const isOverlapping = overlappingTaskIds.has(task.id);
        const barClass =
          `wx-bar wx-${taskTypeCss(task.type)}` +
          (touched && taskMove && task.id === taskMove.id ? ' wx-touch' : '') +
          (linkFrom && linkFrom.id === task.id ? ' wx-selected' : '') +
          (selectedIds.has(task.id) ? ' wx-selected' : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '') +
          (task.$reorder ? ' wx-reorder-task' : '') +
          (splitTasks && task.segments ? ' wx-split' : '') +
          (isOverlapping ? ' wx-collision' : '');
        const leftLinkClass =
          'wx-link wx-left' +
          (linkFrom ? ' wx-visible' : '') +
          (!linkFrom ||
          (!alreadyLinked(task.id, true) && isLinkMarkerVisible(task.id))
            ? ' wx-target'
            : '') +
          (linkFrom && linkFrom.id === task.id && linkFrom.start
            ? ' wx-selected'
            : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '');
        const rightLinkClass =
          'wx-link wx-right' +
          (linkFrom ? ' wx-visible' : '') +
          (!linkFrom ||
          (!alreadyLinked(task.id, false) && isLinkMarkerVisible(task.id))
            ? ' wx-target'
            : '') +
          (linkFrom && linkFrom.id === task.id && !linkFrom.start
            ? ' wx-selected'
            : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '');
        return (
          <Fragment key={task.id}>
            {!task.$skip && (
              <div
                className={'wx-GKbcLEGA ' + barClass}
                style={taskStyle(task)}
                data-tooltip-id={task.id}
                data-id={task.id}
                tabIndex={focused === task.id ? 0 : -1}
              >
                {!readonly ? (
                  task.id === selectedLink?.target &&
                  selectedLink?.type[2] === 's' ? (
                    <Button
                      type="danger"
                      css="wx-left wx-delete-button wx-delete-link"
                    >
                      <i className="wxi-close wx-delete-button-icon"></i>
                    </Button>
                  ) : (
                    <div className={'wx-GKbcLEGA ' + leftLinkClass}>
                      <div className="wx-GKbcLEGA wx-inner"></div>
                    </div>
                  )
                ) : null}

                {task.type !== 'milestone' ? (
                  <>
                    {task.progress && !(splitTasks && task.segments) ? (
                      <div className="wx-GKbcLEGA wx-progress-wrapper">
                        <div
                          className="wx-GKbcLEGA wx-progress-percent"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    ) : null}
                    {!readonly && !(splitTasks && task.segments) ? (
                      <div
                        className="wx-GKbcLEGA wx-progress-marker"
                        style={{ left: `calc(${task.progress}% - 10px)` }}
                      >
                        {task.progress}
                      </div>
                    ) : null}
                    {TaskTemplate ? (
                      <TaskTemplate data={task} api={api} onAction={forward} />
                    ) : splitTasks && task.segments ? (
                      <BarSegments task={task} type={taskTypeCss(task.type)} />
                    ) : (
                      <div className="wx-GKbcLEGA wx-content">
                        {task.text || ''}
                      </div>
                    )}
                    {isOverlapping && (
                      <div className="wx-GKbcLEGA wx-collision-warning" title="This task overlaps with another task in the same row">
                        !
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="wx-GKbcLEGA wx-content"></div>
                    {TaskTemplate ? (
                      <TaskTemplate data={task} api={api} onAction={forward} />
                    ) : (
                      <div className="wx-GKbcLEGA wx-text-out">{task.text}</div>
                    )}
                  </>
                )}

                {!readonly ? (
                  task.id === selectedLink?.target &&
                  selectedLink?.type[2] === 'e' ? (
                    <Button
                      type="danger"
                      css="wx-right wx-delete-button wx-delete-link"
                    >
                      <i className="wxi-close wx-delete-button-icon"></i>
                    </Button>
                  ) : (
                    <div className={'wx-GKbcLEGA ' + rightLinkClass}>
                      <div className="wx-GKbcLEGA wx-inner"></div>
                    </div>
                  )
                ) : null}
              </div>
            )}
            {baselinesValue && !task.$skip_baseline ? (
              <div
                className={
                  'wx-GKbcLEGA wx-baseline' +
                  (task.type === 'milestone' ? ' wx-milestone' : '')
                }
                style={baselineStyle(task)}
              ></div>
            ) : null}
          </Fragment>
        );
      })}
      {marquee && marqueeStyle && (
        <div className="wx-GKbcLEGA wx-marquee-selection" style={marqueeStyle} />
      )}
      {pastePreview && pastePreview.currentX != null && (
        pastePreview.tasks.map((task, i) => {
          // Calculate ghost x position directly from pixel position (snap to week cell)
          const cellIndex = Math.floor(pastePreview.currentX / lengthUnitWidth);
          const x = (cellIndex + (task._startCellOffset || 0)) * lengthUnitWidth;
          // Use original width and height for accurate ghost size
          const w = task._originalWidth || lengthUnitWidth;
          const h = task._originalHeight || cellHeight;
          // Find row Y position using rowYPositions map or fallback
          const rowY = rowYPositions.get(task.row) ?? (task.$y || 0);
          return (
            <div
              key={`preview-${i}`}
              className="wx-GKbcLEGA wx-bar wx-task wx-paste-preview"
              style={{ left: x, top: rowY, width: w, height: h }}
            >
              <div className="wx-GKbcLEGA wx-content">{task.text}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Bars;
