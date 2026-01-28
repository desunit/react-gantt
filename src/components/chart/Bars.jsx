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

function Bars(props) {
  const {
    readonly,
    taskTemplate: TaskTemplate,
    multiTaskRows = false,
    rowMapping = null,
    marqueeSelect = false,
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
    return rTasksValue.slice(start, end).map((a) => ({ ...a }));
  }, [rTasksCounter, areaValue]);

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
  // Bulk move state
  const [bulkMove, setBulkMove] = useState(null);

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

  // Get tasks intersecting with a rectangle (viewport-relative coordinates)
  const getIntersectingTasks = useCallback(
    (rect) => {
      const container = containerRef.current;
      if (!container) return [];

      // Get current scroll offsets
      const scrollLeft = container.parentElement?.scrollLeft || 0;
      const scrollTop = container.parentElement?.parentElement?.scrollTop || 0;

      const minX = Math.min(rect.startX, rect.currentX);
      const maxX = Math.max(rect.startX, rect.currentX);
      const minY = Math.min(rect.startY, rect.currentY);
      const maxY = Math.max(rect.startY, rect.currentY);

      return rTasksValue.filter((task) => {
        // Task positions are absolute (content space)
        // Convert to viewport-relative by subtracting scroll
        const taskLeft = task.$x - scrollLeft;
        const taskRight = task.$x + task.$w - scrollLeft;
        const taskAbsoluteY = taskYPositions.get(task.id) ?? task.$y;
        const taskTop = taskAbsoluteY - scrollTop;
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

      const node = locate(e);

      // Marquee selection: click on empty space
      if (!node && marqueeSelect && !readonly) {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        // Use viewport-relative coordinates (no scroll offset added)
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        setMarquee({
          startX,
          startY,
          currentX: startX,
          currentY: startY,
          ctrlKey: e.ctrlKey || e.metaKey,
        });
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
    [down, marqueeSelect, readonly, selectedValue, isTaskSelected, api, getMoveMode, schedule, startDrag],
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
    if (marquee) {
      const intersecting = getIntersectingTasks(marquee);

      if (marquee.ctrlKey) {
        // Additive selection: toggle each intersecting task
        intersecting.forEach((task) => {
          api.exec('select-task', { id: task.id, toggle: true, marquee: true });
        });
      } else {
        // Replace selection: clear and select all intersecting
        // First clear selection
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
        originalPositions.forEach((origPos, taskId) => {
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

      if (!readonly) {
        // Handle marquee selection drag
        if (marquee) {
          const container = containerRef.current;
          if (!container) return;
          const rect = container.getBoundingClientRect();
          // Use viewport-relative coordinates (no scroll offset added)
          const currentX = clientX - rect.left;
          const currentY = clientY - rect.top;

          setMarquee((prev) => ({
            ...prev,
            currentX,
            currentY,
          }));
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

  const onClick = useCallback(
    (e) => {
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        return;
      }

      const id = locateID(e.target);
      if (id) {
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
        const barClass =
          `wx-bar wx-${taskTypeCss(task.type)}` +
          (touched && taskMove && task.id === taskMove.id ? ' wx-touch' : '') +
          (linkFrom && linkFrom.id === task.id ? ' wx-selected' : '') +
          (selectedIds.has(task.id) ? ' wx-selected' : '') +
          (isTaskCritical(task.id) ? ' wx-critical' : '') +
          (task.$reorder ? ' wx-reorder-task' : '') +
          (splitTasks && task.segments ? ' wx-split' : '');
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
    </div>
  );
}

export default Bars;
