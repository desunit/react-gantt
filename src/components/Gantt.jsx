import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  useState,
  useContext,
} from 'react';

// core widgets lib
import { context } from '@svar-ui/react-core';

// locales
import { locale as l } from '@svar-ui/lib-dom';
import { en } from '@svar-ui/gantt-locales';
import { en as coreEn } from '@svar-ui/core-locales';

// stores
import { EventBusRouter } from '@svar-ui/lib-state';
import {
  DataStore,
  defaultColumns,
  defaultTaskTypes,
  parseTaskDates,
  normalizeZoom,
  normalizeLinks,
} from '@svar-ui/gantt-store';

// context
import StoreContext from '../context';

// store factory
import { writable } from '@svar-ui/lib-react';

// ui
import Layout from './Layout.jsx';

// helpers
import {
  prepareScales,
  prepareFormats,
  prepareColumns,
  prepareZoom,
} from '../helpers/prepareConfig.js';

const camelize = (s) =>
  s
    .split('-')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ''))
    .join('');

const defaultScales = [
  { unit: 'month', step: 1, format: '%F %Y' },
  { unit: 'day', step: 1, format: '%j' },
];

const Gantt = forwardRef(function Gantt(
  {
    taskTemplate = null,
    markers = [],
    taskTypes = defaultTaskTypes,
    tasks = [],
    selected = [],
    activeTask = null,
    links = [],
    scales = defaultScales,
    columns = defaultColumns,
    start = null,
    end = null,
    lengthUnit = 'day',
    durationUnit = 'day',
    cellWidth = 100,
    cellHeight = 38,
    scaleHeight = 36,
    readonly = false,
    cellBorders = 'full',
    zoom = false,
    baselines = false,
    highlightTime: highlightTimeProp = null,
    init = null,
    autoScale = true,
    unscheduledTasks = false,
    criticalPath = null,
    schedule = { type: 'forward' },
    projectStart = null,
    projectEnd = null,
    calendar = null,
    undo = false,
    splitTasks = false,
    multiTaskRows = false,
    marqueeSelect = false,
    copyPaste = false,
    currentWeekHighlight = false,
    currentWeekColor = null,
    scrollToCurrentWeek = false,
    allowTaskIntersection = true,
    ...restProps
  },
  ref,
) {
  // keep latest rest props for event routing
  const restPropsRef = useRef();
  restPropsRef.current = restProps;

  // init stores
  const dataStore = useMemo(() => new DataStore(writable), []);

  // locale and formats
  // uses same logic as the Locale component
  const words = useMemo(() => ({ ...coreEn, ...en }), []);
  const i18nCtx = useContext(context.i18n);
  const locale = useMemo(() => {
    if (!i18nCtx) return l(words);
    return i18nCtx.extend(words, true);
  }, [i18nCtx, words]);

  // prepare configuration objects
  const lCalendar = useMemo(() => locale.getRaw().calendar, [locale]);

  const normalizedConfig = useMemo(() => {
    let config = {
      zoom: prepareZoom(zoom, lCalendar),
      scales: prepareScales(scales, lCalendar),
      columns: prepareColumns(columns, lCalendar),
      links: normalizeLinks(links),
      cellWidth,
    };
    if (config.zoom) {
      config = {
        ...config,
        ...normalizeZoom(
          config.zoom,
          prepareFormats(lCalendar, locale.getGroup('gantt')),
          config.scales,
          cellWidth,
        ),
      };
    }
    return config;
  }, [zoom, scales, columns, links, cellWidth, lCalendar, locale]);

  // parse task dates effect
  const parsedTasksRef = useRef(null);
  if (parsedTasksRef.current !== tasks) {
    parseTaskDates(tasks, { durationUnit, splitTasks, calendar });
    parsedTasksRef.current = tasks;
  }
  useEffect(() => {
    parseTaskDates(tasks, { durationUnit, splitTasks, calendar });
  }, [tasks, durationUnit, calendar, splitTasks]);

  // row mapping for multiTaskRows feature
  const rowMapping = useMemo(() => {
    if (!multiTaskRows) return null;

    const rowMap = new Map(); // rowId -> taskIds[]
    const taskRows = new Map(); // taskId -> rowId

    const buildRowMap = (taskList) => {
      taskList.forEach((task) => {
        const rowId = task.row ?? task.id;
        taskRows.set(task.id, rowId);

        if (!rowMap.has(rowId)) {
          rowMap.set(rowId, []);
        }
        rowMap.get(rowId).push(task.id);

        if (task.data && task.data.length > 0) {
          buildRowMap(task.data);
        }
      });
    };

    buildRowMap(tasks);

    return { rowMap, taskRows };
  }, [tasks, multiTaskRows]);

  const firstInRoute = useMemo(() => dataStore.in, [dataStore]);

  const lastInRouteRef = useRef(null);
  if (lastInRouteRef.current === null) {
    lastInRouteRef.current = new EventBusRouter((a, b) => {
      const name = 'on' + camelize(a);
      if (restPropsRef.current && restPropsRef.current[name]) {
        restPropsRef.current[name](b);
      }
    });
    firstInRoute.setNext(lastInRouteRef.current);
  }

  // writable prop for two-way binding tableAPI
  const [tableAPI, setTableAPI] = useState(null);
  const tableAPIRef = useRef(null);
  tableAPIRef.current = tableAPI;

  // public API
  const api = useMemo(
    () => ({
      getState: dataStore.getState.bind(dataStore),
      getReactiveState: dataStore.getReactive.bind(dataStore),
      getStores: () => ({ data: dataStore }),
      exec: firstInRoute.exec,
      setNext: (ev) => {
        lastInRouteRef.current = lastInRouteRef.current.setNext(ev);
        return lastInRouteRef.current;
      },
      intercept: firstInRoute.intercept.bind(firstInRoute),
      on: firstInRoute.on.bind(firstInRoute),
      detach: firstInRoute.detach.bind(firstInRoute),
      getTask: dataStore.getTask.bind(dataStore),
      serialize: dataStore.serialize.bind(dataStore),
      getTable: (waitRender) =>
        waitRender
          ? new Promise((res) => setTimeout(() => res(tableAPIRef.current), 1))
          : tableAPIRef.current,
      getHistory: () => dataStore.getHistory(),
    }),
    [dataStore, firstInRoute],
  );

  // expose API via ref
  useImperativeHandle(
    ref,
    () => ({
      ...api,
    }),
    [api],
  );

  const initOnceRef = useRef(0);
  useEffect(() => {
    if (!initOnceRef.current) {
      if (init) init(api);
    } else {
      // const prev = dataStore.getState();
      dataStore.init({
        tasks,
        links: normalizedConfig.links,
        start,
        columns: normalizedConfig.columns,
        end,
        lengthUnit,
        cellWidth: normalizedConfig.cellWidth,
        cellHeight,
        scaleHeight,
        scales: normalizedConfig.scales,
        taskTypes,
        zoom: normalizedConfig.zoom,
        selected,
        activeTask,
        baselines,
        autoScale,
        unscheduledTasks,
        markers,
        durationUnit,
        criticalPath,
        schedule,
        projectStart,
        projectEnd,
        calendar,
        undo,
        _weekStart: lCalendar.weekStart,
        splitTasks,
      });
    }
    initOnceRef.current++;
  }, [
    api,
    init,
    tasks,
    normalizedConfig,
    start,
    end,
    lengthUnit,
    cellHeight,
    scaleHeight,
    taskTypes,
    selected,
    activeTask,
    baselines,
    autoScale,
    unscheduledTasks,
    markers,
    durationUnit,
    criticalPath,
    schedule,
    projectStart,
    projectEnd,
    calendar,
    undo,
    lCalendar,
    splitTasks,
    dataStore,
  ]);

  if (initOnceRef.current === 0) {
    dataStore.init({
      tasks,
      links: normalizedConfig.links,
      start,
      columns: normalizedConfig.columns,
      end,
      lengthUnit,
      cellWidth: normalizedConfig.cellWidth,
      cellHeight,
      scaleHeight,
      scales: normalizedConfig.scales,
      taskTypes,
      zoom: normalizedConfig.zoom,
      selected,
      activeTask,
      baselines,
      autoScale,
      unscheduledTasks,
      markers,
      durationUnit,
      criticalPath,
      schedule,
      projectStart,
      projectEnd,
      calendar,
      undo,
      _weekStart: lCalendar.weekStart,
      splitTasks,
    });
  }

  // Helper to check if a date is in the current week (UTC)
  const isCurrentWeek = useMemo(() => {
    const now = new Date();
    const weekStart = lCalendar?.weekStart ?? 0; // 0 = Sunday, 1 = Monday

    // Get start of current week (UTC)
    const currentWeekStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const dayOfWeek = currentWeekStart.getUTCDay();
    const diff = (dayOfWeek - weekStart + 7) % 7;
    currentWeekStart.setUTCDate(currentWeekStart.getUTCDate() - diff);
    currentWeekStart.setUTCHours(0, 0, 0, 0);

    // Get end of current week (UTC)
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setUTCDate(currentWeekEnd.getUTCDate() + 7);

    return (date) => date >= currentWeekStart && date < currentWeekEnd;
  }, [lCalendar]);

  // highlightTime from calendar + current week
  const highlightTime = useMemo(() => {
    return (day, unit) => {
      let classes = [];

      // Calendar-based highlighting (weekends)
      if (calendar) {
        if (unit == 'day' && !calendar.getDayHours(day)) classes.push('wx-weekend');
        if (unit == 'hour' && !calendar.getDayHours(day)) classes.push('wx-weekend');
      } else if (highlightTimeProp) {
        const result = highlightTimeProp(day, unit);
        if (result) classes.push(result);
      }

      // Current week highlighting
      if (currentWeekHighlight && (unit === 'week' || unit === 'day')) {
        if (isCurrentWeek(day)) {
          classes.push('wx-current-week');
        }
      }

      return classes.join(' ');
    };
  }, [calendar, highlightTimeProp, currentWeekHighlight, isCurrentWeek]);

  return (
    <context.i18n.Provider value={locale}>
      <StoreContext.Provider value={api}>
        <Layout
          taskTemplate={taskTemplate}
          readonly={readonly}
          cellBorders={cellBorders}
          highlightTime={highlightTime}
          onTableAPIChange={setTableAPI}
          multiTaskRows={multiTaskRows}
          rowMapping={rowMapping}
          marqueeSelect={marqueeSelect}
          copyPaste={copyPaste}
          scrollToCurrentWeek={scrollToCurrentWeek}
          currentWeekColor={currentWeekColor}
          allowTaskIntersection={allowTaskIntersection}
        />
      </StoreContext.Provider>
    </context.i18n.Provider>
  );
});

export default Gantt;
