import { jsxs as Ie, jsx as i, Fragment as Je } from 'react/jsx-runtime';
import {
  createContext as Yt,
  useMemo as v,
  useState as ge,
  useContext as Pe,
  useCallback as C,
  useRef as oe,
  useEffect as re,
  Fragment as Ft,
  forwardRef as Et,
  useImperativeHandle as Dt,
} from 'react';
import {
  context as _e,
  Button as xt,
  Field as Ot,
  Text as Xt,
  Combo as Kt,
  DatePicker as Vt,
  TimePicker as Bt,
  Locale as qt,
  RichSelect as jt,
  TwoState as Ut,
  Slider as Qt,
  Counter as Zt,
  Material as pt,
  Willow as yt,
  WillowDark as kt,
} from '@svar-ui/react-core';
import {
  locate as Ge,
  locateID as qe,
  locateAttr as Jt,
  dateToString as nt,
  locale as st,
} from '@svar-ui/lib-dom';
import { en as rt } from '@svar-ui/gantt-locales';
import { en as it } from '@svar-ui/core-locales';
import { EventBusRouter as en } from '@svar-ui/lib-state';
import {
  prepareEditTask as St,
  grid as tn,
  extendDragOptions as nn,
  isSegmentMoveAllowed as sn,
  DataStore as rn,
  normalizeLinks as on,
  normalizeZoom as ln,
  defaultColumns as cn,
  parseTaskDates as bt,
  defaultTaskTypes as an,
  getToolbarButtons as vt,
  handleAction as Nt,
  isHandledAction as Lt,
  getMenuOptions as Tt,
  getEditorItems as un,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as ps,
  defaultEditorItems as ys,
  defaultMenuOptions as ks,
  defaultTaskTypes as bs,
  defaultToolbarButtons as vs,
  getEditorItems as Ts,
  getMenuOptions as $s,
  getToolbarButtons as Ms,
  registerScaleUnit as Cs,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as ct,
  useStore as H,
  useStoreWithCounter as tt,
  writable as dn,
  useStoreLater as Ye,
} from '@svar-ui/lib-react';
import { hotkeys as It } from '@svar-ui/grid-store';
import { Grid as fn, HeaderMenu as hn } from '@svar-ui/react-grid';
import { flushSync as mn } from 'react-dom';
import { Toolbar as $t } from '@svar-ui/react-toolbar';
import { ContextMenu as gn } from '@svar-ui/react-menu';
import { Editor as wn, registerEditorItem as je } from '@svar-ui/react-editor';
import { registerEditorItem as Es } from '@svar-ui/react-editor';
const Fe = Yt(null);
function Oe(t) {
  const n = t.getAttribute('data-id'),
    s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function xn(t, n, s) {
  const c = t.getBoundingClientRect(),
    r = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: c.top - r.top,
    left: c.left - r.left,
    dt: c.bottom - s.clientY,
    db: s.clientY - c.top,
  };
}
function Mt(t) {
  return t && t.getAttribute('data-context-id');
}
const Ct = 5;
function pn(t, n) {
  let s, c, r, N, g, o, f, I, x;
  function q(p) {
    (N = p.clientX),
      (g = p.clientY),
      (o = {
        ...xn(s, t, p),
        y: n.getTask(r).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function E(p) {
    (s = Ge(p)),
      Mt(s) &&
        ((r = Oe(s)),
        (x = setTimeout(() => {
          (I = !0), n && n.touchStart && n.touchStart(), q(p.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', L),
        t.addEventListener('contextmenu', m),
        window.addEventListener('touchend', z));
  }
  function m(p) {
    if (I || x) return p.preventDefault(), !1;
  }
  function W(p) {
    p.which === 1 &&
      ((s = Ge(p)),
      Mt(s) &&
        ((r = Oe(s)),
        t.addEventListener('mousemove', j),
        window.addEventListener('mouseup', D),
        q(p)));
  }
  function h(p) {
    t.removeEventListener('mousemove', j),
      t.removeEventListener('touchmove', L),
      document.body.removeEventListener('mouseup', D),
      document.body.removeEventListener('touchend', z),
      (document.body.style.userSelect = ''),
      p &&
        (t.removeEventListener('mousedown', W),
        t.removeEventListener('touchstart', E));
  }
  function R(p) {
    const Z = p.clientX - N,
      U = p.clientY - g;
    if (!c) {
      if (
        (Math.abs(Z) < Ct && Math.abs(U) < Ct) ||
        (n && n.start && n.start({ id: r, e: p }) === !1)
      )
        return;
      (c = s.cloneNode(!0)),
        (c.style.pointerEvents = 'none'),
        c.classList.add('wx-reorder-task'),
        (c.style.position = 'absolute'),
        (c.style.left = o.left + 'px'),
        (c.style.top = o.top + 'px'),
        (s.style.visibility = 'hidden'),
        s.parentNode.insertBefore(c, s);
    }
    if (c) {
      const de = Math.round(Math.max(0, o.top + U));
      if (n && n.move && n.move({ id: r, top: de, detail: f }) === !1) return;
      const _ = n.getTask(r),
        ae = _.$y;
      if (!o.start && o.y == ae) return A();
      (o.start = !0), (o.y = _.$y - 4), (c.style.top = de + 'px');
      const le = document.elementFromPoint(p.clientX, p.clientY),
        T = Ge(le);
      if (T && T !== s) {
        const a = Oe(T),
          K = T.getBoundingClientRect(),
          J = K.top + K.height / 2,
          ue = p.clientY + o.db > J && T.nextElementSibling !== s,
          ne = p.clientY - o.dt < J && T.previousElementSibling !== s;
        f?.after == a || f?.before == a
          ? (f = null)
          : ue
            ? (f = { id: r, after: a })
            : ne && (f = { id: r, before: a });
      }
    }
  }
  function j(p) {
    R(p);
  }
  function L(p) {
    I
      ? (p.preventDefault(), R(p.touches[0]))
      : x && (clearTimeout(x), (x = null));
  }
  function z() {
    (I = null), x && (clearTimeout(x), (x = null)), A();
  }
  function D() {
    A();
  }
  function A() {
    s && (s.style.visibility = ''),
      c &&
        (c.parentNode.removeChild(c),
        n && n.end && n.end({ id: r, top: o.top })),
      (r = s = c = o = f = null),
      h();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', W),
    t.addEventListener('touchstart', E),
    {
      destroy() {
        h(!0);
      },
    }
  );
}
function yn({ row: t, column: n }) {
  function s(r, N) {
    return {
      justifyContent: N.align,
      paddingLeft: `${(r.$level - 1) * 20}px`,
    };
  }
  const c = n && n._cell;
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-pqc08MHU wx-content',
    style: s(t, n),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ i('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ i('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ i('div', {
        className: 'wx-pqc08MHU wx-text',
        children: c ? /* @__PURE__ */ i(c, { row: t, column: n }) : t.text,
      }),
    ],
  });
}
function Rt({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ i('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ i('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': s,
        }),
      })
    : null;
}
function kn(t) {
  const {
      readonly: n,
      compactMode: s,
      width: c = 0,
      display: r = 'all',
      columnWidth: N = 0,
      onTableAPIChange: g,
      multiTaskRows: o = !1,
      rowMapping: f = null,
    } = t,
    [I, x] = ct(N),
    [q, E] = ge(),
    m = Pe(_e.i18n),
    W = v(() => m.getGroup('gantt'), [m]),
    h = Pe(Fe),
    R = H(h, 'scrollTop'),
    j = H(h, 'cellHeight'),
    L = H(h, '_scrollTask'),
    z = H(h, '_selected'),
    D = H(h, 'area'),
    A = H(h, '_tasks'),
    p = H(h, '_scales'),
    Z = H(h, 'columns'),
    U = H(h, '_sort'),
    de = H(h, 'calendar'),
    _ = H(h, 'durationUnit'),
    ae = H(h, 'splitTasks'),
    [le, T] = ge(null),
    a = v(
      () => (!A || !D ? [] : o && f ? A : A.slice(D.start, D.end)),
      [A, D, o, f],
    ),
    K = C(
      (l, y) => {
        if (y === 'add-task')
          h.exec(y, {
            target: l,
            task: { text: W('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (y === 'open-task') {
          const $ = a.find((G) => G.id === l);
          ($?.data || $?.lazy) && h.exec(y, { id: l, mode: !$.open });
        }
      },
      [a],
    ),
    J = C(
      (l) => {
        const y = qe(l),
          $ = l.target.dataset.action;
        $ && l.preventDefault(),
          y
            ? $ === 'add-task' || $ === 'open-task'
              ? K(y, $)
              : h.exec('select-task', {
                  id: y,
                  toggle: l.ctrlKey || l.metaKey,
                  range: l.shiftKey,
                  show: !0,
                })
            : $ === 'add-task' && K(null, $);
      },
      [h, K],
    ),
    ue = oe(null),
    ne = oe(null),
    [se, be] = ge(0),
    [Re, Ae] = ge(!1);
  re(() => {
    const l = ne.current;
    if (!l || typeof ResizeObserver > 'u') return;
    const y = () => be(l.clientWidth);
    y();
    const $ = new ResizeObserver(y);
    return $.observe(l), () => $.disconnect();
  }, []);
  const $e = oe(null),
    De = C(
      (l) => {
        const y = l.id,
          { before: $, after: G } = l,
          ke = l.onMove;
        let me = $ || G,
          Ee = $ ? 'before' : 'after';
        if (ke) {
          if (Ee === 'after') {
            const We = h.getTask(me);
            We.data?.length &&
              We.open &&
              ((Ee = 'before'), (me = We.data[0].id));
          }
          $e.current = { id: y, [Ee]: me };
        } else $e.current = null;
        h.exec('move-task', {
          id: y,
          mode: Ee,
          target: me,
          inProgress: ke,
        });
      },
      [h],
    ),
    te = v(() => (o && f ? 0 : (D?.from ?? 0)), [D, o, f]),
    d = v(() => p?.height ?? 0, [p]),
    P = v(
      () => (!s && r !== 'grid' ? (I ?? 0) > (c ?? 0) : (I ?? 0) > (se ?? 0)),
      [s, r, I, c, se],
    ),
    F = v(() => {
      const l = {};
      return (
        (P && r === 'all') || (r === 'grid' && P)
          ? (l.width = I)
          : r === 'grid' && (l.width = '100%'),
        l
      );
    }, [P, r, I]),
    O = v(
      () => (le && !a.find((l) => l.id === le.id) ? [...a, le] : a),
      [a, le],
    ),
    V = v(() => {
      if (!o || !f) return O;
      const l = /* @__PURE__ */ new Map(),
        y = /* @__PURE__ */ new Set();
      return (
        O.forEach(($) => {
          const G = f.taskRows.get($.id) ?? $.id;
          y.has(G) ||
            (l.set(G, {
              ...$,
              $rowTasks: f.rowMap.get(G) || [$.id],
            }),
            y.add(G));
        }),
        Array.from(l.values())
      );
    }, [O, o, f]),
    ie = v(() => {
      let l = (Z || []).map((G) => {
        G = { ...G };
        const ke = G.header;
        if (typeof ke == 'object') {
          const me = ke.text && W(ke.text);
          G.header = { ...ke, text: me };
        } else G.header = W(ke);
        return G;
      });
      const y = l.findIndex((G) => G.id === 'text'),
        $ = l.findIndex((G) => G.id === 'add-task');
      if (
        (y !== -1 && (l[y].cell && (l[y]._cell = l[y].cell), (l[y].cell = yn)),
        $ !== -1)
      ) {
        l[$].cell = l[$].cell || Rt;
        const G = l[$].header;
        if (
          (typeof G != 'object' && (l[$].header = { text: G }),
          (l[$].header.cell = G.cell || Rt),
          n)
        )
          l.splice($, 1);
        else if (s) {
          const [ke] = l.splice($, 1);
          l.unshift(ke);
        }
      }
      return l.length > 0 && (l[l.length - 1].resize = !1), l;
    }, [Z, W, n, s]),
    he = v(
      () =>
        r === 'all'
          ? `${c}px`
          : r === 'grid'
            ? 'calc(100% - 4px)'
            : ie.find((l) => l.id === 'add-task')
              ? '50px'
              : '0',
      [r, c, ie],
    ),
    k = v(() => {
      if (V && U?.length) {
        const l = {};
        return (
          U.forEach(({ key: y, order: $ }, G) => {
            l[y] = {
              order: $,
              ...(U.length > 1 && { index: G }),
            };
          }),
          l
        );
      }
      return {};
    }, [V, U]),
    Q = C(() => ie.some((l) => l.flexgrow && !l.hidden), []),
    fe = v(() => Q(), [Q, Re]),
    we = v(() => {
      let l = r === 'chart' ? ie.filter(($) => $.id === 'add-task') : ie;
      const y = r === 'all' ? c : se;
      if (!fe) {
        let $ = I,
          G = !1;
        if (ie.some((ke) => ke.$width)) {
          let ke = 0;
          ($ = ie.reduce(
            (me, Ee) => (
              Ee.hidden || ((ke += Ee.width), (me += Ee.$width || Ee.width)), me
            ),
            0,
          )),
            ke > $ && $ > y && (G = !0);
        }
        if (G || $ < y) {
          let ke = 1;
          return (
            G || (ke = (y - 50) / ($ - 50 || 1)),
            l.map(
              (me) => (
                me.id !== 'add-task' &&
                  !me.hidden &&
                  (me.$width || (me.$width = me.width),
                  (me.width = me.$width * ke)),
                me
              ),
            )
          );
        }
      }
      return l;
    }, [r, ie, fe, I, c, se]),
    Se = C(
      (l) => {
        if (!Q()) {
          const y = we.reduce(
            ($, G) => (
              l && G.$width && (G.$width = G.width),
              $ + (G.hidden ? 0 : G.width)
            ),
            0,
          );
          y !== I && x(y);
        }
        Ae(!0), Ae(!1);
      },
      [Q, we, I, x],
    ),
    w = C(() => {
      ie.filter((y) => y.flexgrow && !y.hidden).length === 1 &&
        ie.forEach((y) => {
          y.$width && !y.flexgrow && !y.hidden && (y.width = y.$width);
        });
    }, []),
    ce = C(
      (l) => {
        if (!n) {
          const y = qe(l),
            $ = Jt(l, 'data-col-id');
          !($ && ie.find((ke) => ke.id == $))?.editor &&
            y &&
            h.exec('show-editor', { id: y });
        }
      },
      [h, n],
      // cols is defined later; relies on latest value at call time
    ),
    xe = v(() => (Array.isArray(z) ? z.map((l) => l.id) : []), [z]),
    X = oe(te);
  (X.current = te),
    re(() => {
      const l = ($) => {
        if (ue.current) {
          const G = ue.current.querySelector('.wx-body');
          G && (G.style.top = -(($ ?? 0) - (X.current ?? 0)) + 'px');
        }
        ne.current && (ne.current.scrollTop = 0);
      };
      return (
        l(R),
        h.on('scroll-chart', ({ top: $ }) => {
          $ !== void 0 && l($);
        })
      );
    }, [h, R]),
    re(() => {
      if (ue.current) {
        const l = ue.current.querySelector('.wx-body');
        l && (l.style.top = -((R ?? 0) - (te ?? 0)) + 'px');
      }
    }, [te]),
    re(() => {
      const l = ue.current;
      if (!l) return;
      const y = l.querySelector('.wx-table-box .wx-body');
      if (!y || typeof ResizeObserver > 'u') return;
      const $ = new ResizeObserver(() => {
        if (ue.current) {
          const G = ue.current.querySelector('.wx-body');
          G && (G.style.top = -((R ?? 0) - (X.current ?? 0)) + 'px');
        }
      });
      return (
        $.observe(y),
        () => {
          $.disconnect();
        }
      );
    }, [we, F, r, he, V, R]),
    re(() => {
      if (!L || !q) return;
      const { id: l } = L,
        y = q.getState().focusCell;
      y &&
        y.row !== l &&
        ue.current &&
        ue.current.contains(document.activeElement) &&
        q.exec('focus-cell', {
          row: l,
          column: y.column,
        });
    }, [L, q]);
  const Y = C(
      ({ id: l }) => {
        if (n) return !1;
        h.getTask(l).open && h.exec('open-task', { id: l, mode: !1 });
        const y = h.getState()._tasks.find(($) => $.id === l);
        if ((T(y || null), !y)) return !1;
      },
      [h, n],
    ),
    ye = C(
      ({ id: l, top: y }) => {
        $e.current
          ? De({ ...$e.current, onMove: !1 })
          : h.exec('drag-task', {
              id: l,
              top: y + (te ?? 0),
              inProgress: !1,
            }),
          T(null);
      },
      [h, De, te],
    ),
    ve = C(
      ({ id: l, top: y, detail: $ }) => {
        $ && De({ ...$, onMove: !0 }),
          h.exec('drag-task', {
            id: l,
            top: y + (te ?? 0),
            inProgress: !0,
          });
      },
      [h, De, te],
    );
  re(() => {
    const l = ue.current;
    return l
      ? pn(l, {
          start: Y,
          end: ye,
          move: ve,
          getTask: h.getTask,
        }).destroy
      : void 0;
  }, [h, Y, ye, ve]);
  const Le = C(
      (l) => {
        const { key: y, isInput: $ } = l;
        if (!$ && (y === 'arrowup' || y === 'arrowdown'))
          return (l.eventSource = 'grid'), h.exec('hotkey', l), !1;
        if (y === 'enter') {
          const G = q?.getState().focusCell;
          if (G) {
            const { row: ke, column: me } = G;
            me === 'add-task'
              ? K(ke, 'add-task')
              : me === 'text' && K(ke, 'open-task');
          }
        }
      },
      [h, K, q],
    ),
    Te = oe(null),
    He = () => {
      Te.current = {
        setTableAPI: E,
        handleHotkey: Le,
        sortVal: U,
        api: h,
        adjustColumns: w,
        setColumnWidth: Se,
        tasks: a,
        calendarVal: de,
        durationUnitVal: _,
        splitTasksVal: ae,
        onTableAPIChange: g,
      };
    };
  He(),
    re(() => {
      He();
    }, [E, Le, U, h, w, Se, a, de, _, ae, g]);
  const Xe = C((l) => {
    E(l),
      l.intercept('hotkey', (y) => Te.current.handleHotkey(y)),
      l.intercept('scroll', () => !1),
      l.intercept('select-row', () => !1),
      l.intercept('sort-rows', (y) => {
        const $ = Te.current.sortVal,
          { key: G, add: ke } = y,
          me = $ ? $.find((We) => We.key === G) : null;
        let Ee = 'asc';
        return (
          me && (Ee = !me || me.order === 'asc' ? 'desc' : 'asc'),
          h.exec('sort-tasks', {
            key: G,
            order: Ee,
            add: ke,
          }),
          !1
        );
      }),
      l.on('resize-column', () => {
        Te.current.setColumnWidth(!0);
      }),
      l.on('hide-column', (y) => {
        y.mode || Te.current.adjustColumns(), Te.current.setColumnWidth();
      }),
      l.intercept('update-cell', (y) => {
        const { id: $, column: G, value: ke } = y,
          me = Te.current.tasks.find((Ee) => Ee.id === $);
        if (me) {
          const Ee = { ...me };
          let We = ke;
          We && !isNaN(We) && !(We instanceof Date) && (We *= 1),
            (Ee[G] = We),
            St(
              Ee,
              {
                calendar: Te.current.calendarVal,
                durationUnit: Te.current.durationUnitVal,
                splitTasks: Te.current.splitTasksVal,
              },
              G,
            ),
            h.exec('update-task', {
              id: $,
              task: Ee,
            });
        }
        return !1;
      }),
      g && g(l);
  }, []);
  return /* @__PURE__ */ i('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${he}` },
    ref: ne,
    children: /* @__PURE__ */ i('div', {
      ref: ue,
      style: F,
      className: 'wx-rHj6070p wx-table',
      onClick: J,
      onDoubleClick: ce,
      children: /* @__PURE__ */ i(fn, {
        init: Xe,
        sizes: {
          rowHeight: j,
          headerHeight: (d ?? 0) - 1,
        },
        rowStyle: (l) =>
          l.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (l) =>
          `wx-rHj6070p wx-text-${l.align}${l.id === 'add-task' ? ' wx-action' : ''}`,
        data: V,
        columns: we,
        selectedRows: [...xe],
        sortMarks: k,
      }),
    }),
  });
}
function bn({ borders: t = '' }) {
  const n = Pe(Fe),
    s = H(n, 'cellWidth'),
    c = H(n, 'cellHeight'),
    r = oe(null),
    [N, g] = ge('#e4e4e4');
  re(() => {
    if (typeof getComputedStyle < 'u' && r.current) {
      const f = getComputedStyle(r.current).getPropertyValue(
        '--wx-gantt-border',
      );
      g(f ? f.substring(f.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const o = {
    width: '100%',
    height: '100%',
    background: s != null && c != null ? `url(${tn(s, c, N, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ i('div', { ref: r, style: o });
}
function vn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const c = Pe(Fe),
    r = H(c, '_links'),
    N = H(c, 'criticalPath'),
    g = oe(null),
    o = C(
      (f) => {
        const I = f?.target?.classList;
        !I?.contains('wx-line') && !I?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    re(() => {
      if (!s && n && g.current) {
        const f = (I) => {
          g.current && !g.current.contains(I.target) && o(I);
        };
        return (
          document.addEventListener('click', f),
          () => {
            document.removeEventListener('click', f);
          }
        );
      }
    }, [s, n, o]),
    /* @__PURE__ */ Ie('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (r || []).map((f) => {
          const I =
            'wx-dkx3NwEn wx-line' +
            (N && f.$critical ? ' wx-critical' : '') +
            (s ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ i(
            'polyline',
            {
              className: I,
              points: f.$p,
              onClick: () => !s && t(f.id),
              'data-link-id': f.id,
            },
            f.id,
          );
        }),
        !s &&
          n &&
          /* @__PURE__ */ i('polyline', {
            ref: g,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function Tn(t) {
  const { task: n, type: s } = t;
  function c(N) {
    const g = n.segments[N];
    return {
      left: `${g.$x}px`,
      top: '0px',
      width: `${g.$w}px`,
      height: '100%',
    };
  }
  function r(N) {
    if (!n.progress) return 0;
    const g = (n.duration * n.progress) / 100,
      o = n.segments;
    let f = 0,
      I = 0,
      x = null;
    do {
      const q = o[I];
      I === N &&
        (f > g ? (x = 0) : (x = Math.min((g - f) / q.duration, 1) * 100)),
        (f += q.duration),
        I++;
    } while (x === null && I < o.length);
    return x || 0;
  }
  return /* @__PURE__ */ i('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((N, g) =>
      /* @__PURE__ */ Ie(
        'div',
        {
          className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
          'data-segment': g,
          style: c(g),
          children: [
            n.progress
              ? /* @__PURE__ */ i('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ i('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${r(g)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ i('div', {
              className: 'wx-content',
              children: N.text || '',
            }),
          ],
        },
        g,
      ),
    ),
  });
}
let et = [],
  lt = null,
  Ze = null;
const $n = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: c, lengthUnit: r } = n,
    N = 864e5,
    g =
      r === 'week'
        ? 7
        : r === 'month'
          ? 30
          : r === 'quarter'
            ? 91
            : r === 'year'
              ? 365
              : 1,
    o = Math.floor(t / c);
  return new Date(s.getTime() + o * g * N);
};
function Mn(t) {
  const {
      readonly: n,
      taskTemplate: s,
      multiTaskRows: c = !1,
      rowMapping: r = null,
      marqueeSelect: N = !1,
      copyPaste: g = !1,
    } = t,
    o = Pe(Fe),
    [f, I] = tt(o, '_tasks'),
    [x, q] = tt(o, '_links'),
    E = H(o, 'area'),
    m = H(o, '_scales'),
    W = H(o, 'taskTypes'),
    h = H(o, 'baselines'),
    [R, j] = tt(o, '_selected'),
    L = H(o, '_scrollTask'),
    z = H(o, 'scrollTop'),
    D = H(o, 'criticalPath'),
    A = H(o, 'tasks'),
    p = H(o, 'schedule'),
    Z = H(o, 'splitTasks'),
    U = v(() => {
      if (!E || !Array.isArray(f)) return [];
      const e = E.start ?? 0,
        u = E.end ?? 0;
      return c && r
        ? f.map((b) => ({ ...b }))
        : f.slice(e, u).map((b) => ({ ...b }));
    }, [I, E, c, r]),
    de = H(o, 'cellHeight'),
    _ = v(() => {
      if (!c || !r || !U.length) return U;
      const e = /* @__PURE__ */ new Map(),
        u = [];
      return (
        f.forEach((b) => {
          const M = r.taskRows.get(b.id) ?? b.id;
          e.has(M) || (e.set(M, u.length), u.push(M));
        }),
        U.map((b) => {
          const M = r.taskRows.get(b.id) ?? b.id,
            S = e.get(M) ?? 0;
          return {
            ...b,
            $y: S * de,
            $y_base: b.$y_base !== void 0 ? S * de : void 0,
          };
        })
      );
    }, [U, c, r, f, de]),
    ae = v(() => m.lengthUnitWidth, [m]),
    le = v(() => m.lengthUnit || 'day', [m]),
    T = oe(!1),
    [a, K] = ge(void 0),
    [J, ue] = ge(null),
    ne = oe(null),
    [se, be] = ge(null),
    [Re, Ae] = ge(void 0),
    $e = oe(null),
    [De, te] = ge(0),
    [d, P] = ge(null),
    [F, O] = ge(null),
    [V, ie] = ge(null),
    he = oe(null),
    k = v(() => {
      const e = he.current;
      return !!(R.length && e && e.contains(document.activeElement));
    }, [R, he.current]),
    Q = v(() => k && R[R.length - 1]?.id, [k, R]);
  re(() => {
    if (L && k && L) {
      const { id: e } = L,
        u = he.current?.querySelector(`.wx-bar[data-id='${e}']`);
      u && u.focus({ preventScroll: !0 });
    }
  }, [L]),
    re(() => {
      const e = he.current;
      if (e && (te(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const u = new ResizeObserver((b) => {
          b[0] && te(b[0].contentRect.width);
        });
        return u.observe(e), () => u.disconnect();
      }
    }, [he.current]);
  const fe = C(() => {
      document.body.style.userSelect = 'none';
    }, []),
    we = C(() => {
      document.body.style.userSelect = '';
    }, []),
    Se = C(
      (e, u, b) => {
        if (
          u.target.classList.contains('wx-line') ||
          (b || (b = o.getTask(Oe(e))),
          b.type === 'milestone' || b.type === 'summary')
        )
          return '';
        const M = Ge(u, 'data-segment');
        M && (e = M);
        const { left: S, width: B } = e.getBoundingClientRect(),
          ee = (u.clientX - S) / B;
        let pe = 0.2 / (B > 200 ? B / 200 : 1);
        return ee < pe ? 'start' : ee > 1 - pe ? 'end' : '';
      },
      [o],
    ),
    w = v(() => {
      const e = /* @__PURE__ */ new Map();
      if (!c || !r)
        return (
          f.forEach((M) => {
            e.set(M.id, M.$y);
          }),
          e
        );
      const u = /* @__PURE__ */ new Map(),
        b = [];
      return (
        f.forEach((M) => {
          const S = r.taskRows.get(M.id) ?? M.id;
          u.has(S) || (u.set(S, b.length), b.push(S));
        }),
        f.forEach((M) => {
          const S = r.taskRows.get(M.id) ?? M.id,
            B = u.get(S) ?? 0;
          e.set(M.id, B * de);
        }),
        e
      );
    }, [f, c, r, de]),
    ce = C(
      (e) => {
        const u = he.current;
        if (!u) return [];
        const M = u.parentElement?.parentElement?.scrollLeft || 0,
          S = c && r ? 0 : z || 0,
          B = Math.min(e.startX, e.currentX),
          ee = Math.max(e.startX, e.currentX),
          pe = Math.min(e.startY, e.currentY),
          Me = Math.max(e.startY, e.currentY);
        return f.filter((Ce) => {
          const ze = Ce.$x - M,
            Ke = Ce.$x + Ce.$w - M,
            Ne = (w.get(Ce.id) ?? Ce.$y) - S,
            Be = Ne + Ce.$h;
          return ze < ee && Ke > B && Ne < Me && Be > pe;
        });
      },
      [f, w, c, r, z],
    ),
    xe = v(() => new Set(R.map((e) => e.id)), [R, j]),
    X = C((e) => xe.has(e), [xe]),
    Y = C(
      (e, u) => {
        const { clientX: b } = u,
          M = Oe(e),
          S = o.getTask(M),
          B = u.target.classList;
        if (!u.target.closest('.wx-delete-button') && !n) {
          if (B.contains('wx-progress-marker')) {
            const { progress: ee } = o.getTask(M);
            (ne.current = {
              id: M,
              x: b,
              progress: ee,
              dx: 0,
              node: e,
              marker: u.target,
            }),
              u.target.classList.add('wx-progress-in-drag');
          } else {
            const ee = Se(e, u, S) || 'move',
              pe = {
                id: M,
                mode: ee,
                x: b,
                dx: 0,
                l: S.$x,
                w: S.$w,
              };
            if (Z && S.segments?.length) {
              const Me = Ge(u, 'data-segment');
              Me && ((pe.segmentIndex = Me.dataset.segment * 1), nn(S, pe));
            }
            ue(pe);
          }
          fe();
        }
      },
      [o, n, Se, fe, Z],
    ),
    ye = C(
      (e) => {
        if (e.button !== 0) return;
        const u = Ge(e);
        if (!u && N && !n) {
          const b = he.current;
          if (!b) return;
          const M = b.getBoundingClientRect(),
            S = e.clientX - M.left,
            B = e.clientY - M.top;
          if (g) {
            const pe = b.parentElement?.parentElement?.scrollLeft || 0,
              Me = S + pe,
              Ce = $n(Me, m);
            Ce && ie(Ce);
          }
          P({
            startX: S,
            startY: B,
            currentX: S,
            currentY: B,
            ctrlKey: e.ctrlKey || e.metaKey,
          }),
            fe();
          return;
        }
        if (u) {
          if (N && !n && R.length > 1) {
            const b = Oe(u);
            if (X(b)) {
              const M = e.target.classList;
              if (
                !M.contains('wx-link') &&
                !M.contains('wx-progress-marker') &&
                !e.target.closest('.wx-delete-button')
              ) {
                const S = o.getTask(b);
                if (!Se(u, e, S)) {
                  const ee = /* @__PURE__ */ new Map();
                  R.forEach((pe) => {
                    const Me = o.getTask(pe.id);
                    if (Me) {
                      if (p?.auto && Me.type === 'summary') return;
                      ee.set(pe.id, {
                        $x: Me.$x,
                        $w: Me.$w,
                        start: Me.start,
                        end: Me.end,
                      });
                    }
                  }),
                    O({
                      baseTaskId: b,
                      startX: e.clientX,
                      dx: 0,
                      originalPositions: ee,
                    }),
                    fe();
                  return;
                }
              }
            }
          }
          Y(u, e);
        }
      },
      [Y, N, g, n, R, X, o, Se, p, fe, m],
    ),
    ve = C(
      (e) => {
        const u = Ge(e);
        u &&
          ($e.current = setTimeout(() => {
            Ae(!0), Y(u, e.touches[0]);
          }, 300));
      },
      [Y],
    ),
    Le = C(
      (e) => {
        be(e && { ...x.find((u) => u.id === e) });
      },
      [x],
    ),
    Te = C(() => {
      if (d) {
        const e = ce(d);
        d.ctrlKey
          ? e.forEach((u) => {
              o.exec('select-task', { id: u.id, toggle: !0, marquee: !0 });
            })
          : (R.length > 0 && o.exec('select-task', { id: null, marquee: !0 }),
            e.forEach((u, b) => {
              o.exec('select-task', {
                id: u.id,
                toggle: b > 0,
                // First one replaces, rest toggle (add)
                marquee: !0,
              });
            })),
          P(null),
          we(),
          (T.current = !0);
        return;
      }
      if (F) {
        const { dx: e, originalPositions: u } = F,
          b = Math.round(e / ae);
        if (b !== 0) {
          let M = !0;
          u.forEach((S, B) => {
            const ee = o.getTask(B);
            ee &&
              (o.exec('update-task', {
                id: B,
                diff: b,
                task: { start: ee.start, end: ee.end },
                skipUndo: !M,
                // Only first task creates undo entry
              }),
              (M = !1));
          }),
            (T.current = !0);
        } else
          u.forEach((M, S) => {
            o.exec('drag-task', {
              id: S,
              left: M.$x,
              width: M.$w,
              inProgress: !1,
            });
          });
        O(null), we();
        return;
      }
      if (ne.current) {
        const { dx: e, id: u, marker: b, value: M } = ne.current;
        (ne.current = null),
          typeof M < 'u' &&
            e &&
            o.exec('update-task', {
              id: u,
              task: { progress: M },
              inProgress: !1,
            }),
          b.classList.remove('wx-progress-in-drag'),
          (T.current = !0),
          we();
      } else if (J) {
        const {
          id: e,
          mode: u,
          dx: b,
          l: M,
          w: S,
          start: B,
          segment: ee,
          index: pe,
        } = J;
        if ((ue(null), B)) {
          const Me = Math.round(b / ae);
          if (!Me)
            o.exec('drag-task', {
              id: e,
              width: S,
              left: M,
              inProgress: !1,
              ...(ee && { segmentIndex: pe }),
            });
          else {
            let Ce = {},
              ze = o.getTask(e);
            ee && (ze = ze.segments[pe]);
            const Ke = 1440 * 60 * 1e3,
              Ne =
                Me *
                (le === 'week'
                  ? 7
                  : le === 'month'
                    ? 30
                    : le === 'quarter'
                      ? 91
                      : le === 'year'
                        ? 365
                        : 1) *
                Ke;
            u === 'move'
              ? ((Ce.start = new Date(ze.start.getTime() + Ne)),
                (Ce.end = new Date(ze.end.getTime() + Ne)))
              : u === 'start'
                ? ((Ce.start = new Date(ze.start.getTime() + Ne)),
                  (Ce.end = ze.end))
                : u === 'end' &&
                  ((Ce.start = ze.start),
                  (Ce.end = new Date(ze.end.getTime() + Ne))),
              o.exec('update-task', {
                id: e,
                task: Ce,
                ...(ee && { segmentIndex: pe }),
              });
          }
          T.current = !0;
        }
        we();
      }
    }, [o, we, J, ae, le, d, F, ce, R]),
    He = C(
      (e, u) => {
        const { clientX: b, clientY: M } = u;
        if (!n) {
          if (d) {
            const S = he.current;
            if (!S) return;
            const B = S.getBoundingClientRect(),
              ee = b - B.left,
              pe = M - B.top;
            P((Me) => ({
              ...Me,
              currentX: ee,
              currentY: pe,
            }));
            return;
          }
          if (F) {
            const S = b - F.startX;
            F.originalPositions.forEach((B, ee) => {
              const pe = B.$x + S;
              o.exec('drag-task', {
                id: ee,
                left: pe,
                width: B.$w,
                inProgress: !0,
              });
            }),
              O((B) => ({ ...B, dx: S }));
            return;
          }
          if (ne.current) {
            const { node: S, x: B, id: ee } = ne.current,
              pe = (ne.current.dx = b - B),
              Me = Math.round((pe / S.offsetWidth) * 100);
            let Ce = ne.current.progress + Me;
            (ne.current.value = Ce = Math.min(Math.max(0, Ce), 100)),
              o.exec('update-task', {
                id: ee,
                task: { progress: Ce },
                inProgress: !0,
              });
          } else if (J) {
            Le(null);
            const {
                mode: S,
                l: B,
                w: ee,
                x: pe,
                id: Me,
                start: Ce,
                segment: ze,
                index: Ke,
              } = J,
              Ve = o.getTask(Me),
              Ne = b - pe;
            if (
              (!Ce && Math.abs(Ne) < 20) ||
              (S === 'start' && ee - Ne < ae) ||
              (S === 'end' && ee + Ne < ae) ||
              (S === 'move' &&
                ((Ne < 0 && B + Ne < 0) || (Ne > 0 && B + ee + Ne > De))) ||
              (J.segment && !sn(Ve, J))
            )
              return;
            const Be = { ...J, dx: Ne };
            let Ue, Qe;
            if (
              (S === 'start'
                ? ((Ue = B + Ne), (Qe = ee - Ne))
                : S === 'end'
                  ? ((Ue = B), (Qe = ee + Ne))
                  : S === 'move' && ((Ue = B + Ne), (Qe = ee)),
              o.exec('drag-task', {
                id: Me,
                width: Qe,
                left: Ue,
                inProgress: !0,
                ...(ze && { segmentIndex: Ke }),
              }),
              !Be.start &&
                ((S === 'move' && Ve.$x == B) || (S !== 'move' && Ve.$w == ee)))
            ) {
              (T.current = !0), Te();
              return;
            }
            (Be.start = !0), ue(Be);
          } else {
            const S = Ge(e);
            if (S) {
              const B = o.getTask(Oe(S)),
                pe = Ge(e, 'data-segment') || S,
                Me = Se(pe, u, B);
              pe.style.cursor = Me && !n ? 'col-resize' : 'pointer';
            }
          }
        }
      },
      [o, n, J, ae, De, Se, Le, Te, d, F],
    ),
    Xe = C(
      (e) => {
        He(e, e);
      },
      [He],
    ),
    l = C(
      (e) => {
        Re
          ? (e.preventDefault(), He(e, e.touches[0]))
          : $e.current && (clearTimeout($e.current), ($e.current = null));
      },
      [Re, He],
    ),
    y = C(() => {
      Te();
    }, [Te]),
    $ = C(() => {
      Ae(null),
        $e.current && (clearTimeout($e.current), ($e.current = null)),
        Te();
    }, [Te]);
  re(
    () => (
      window.addEventListener('mouseup', y),
      () => {
        window.removeEventListener('mouseup', y);
      }
    ),
    [y],
  );
  const G = C(
      (e) => {
        if (!n) {
          const u = qe(e.target);
          if (u && !e.target.classList.contains('wx-link')) {
            const b = qe(e.target, 'data-segment');
            o.exec('show-editor', {
              id: u,
              ...(b !== null && { segmentIndex: b }),
            });
          }
        }
      },
      [o, n],
    ),
    ke = ['e2s', 's2s', 'e2e', 's2e'],
    me = C((e, u) => ke[(e ? 1 : 0) + (u ? 0 : 2)], []),
    Ee = C(
      (e, u) => {
        const b = a.id,
          M = a.start;
        return e === b
          ? !0
          : !!x.find(
              (S) => S.target == e && S.source == b && S.type === me(M, u),
            );
      },
      [a, q, me],
    ),
    We = C(() => {
      a && K(null);
    }, [a]),
    Wt = C(
      (e) => {
        if (T.current) {
          T.current = !1;
          return;
        }
        const u = qe(e.target);
        if (u) {
          const b = e.target.classList;
          if (b.contains('wx-link')) {
            const M = b.contains('wx-left');
            if (!a) {
              K({ id: u, start: M });
              return;
            }
            a.id !== u &&
              !Ee(u, M) &&
              o.exec('add-link', {
                link: {
                  source: a.id,
                  target: u,
                  type: me(a.start, M),
                },
              });
          } else if (b.contains('wx-delete-button-icon'))
            o.exec('delete-link', { id: se.id }), be(null);
          else {
            let M;
            const S = Ge(e, 'data-segment');
            S && (M = S.dataset.segment * 1),
              o.exec('select-task', {
                id: u,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: M,
              });
          }
        }
        We();
      },
      [o, a, q, se, Ee, me, We],
    ),
    zt = C(
      (e) => ({
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      }),
      [],
    ),
    Pt = C(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    Gt = C(
      (e) => {
        if (Re || $e.current) return e.preventDefault(), !1;
      },
      [Re],
    ),
    at = v(() => W.map((e) => e.id), [W]),
    ut = C(
      (e) => {
        let u = at.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (u = `task ${u}`), u
        );
      },
      [at],
    ),
    dt = C(
      (e) => {
        o.exec(e.action, e.data);
      },
      [o],
    ),
    ot = C((e) => D && A.byId(e).$critical, [D, A]),
    ft = C(
      (e) => {
        if (p?.auto) {
          const u = A.getSummaryId(e, !0),
            b = A.getSummaryId(a.id, !0);
          return (
            a?.id &&
            !(Array.isArray(u) ? u : [u]).includes(a.id) &&
            !(Array.isArray(b) ? b : [b]).includes(e)
          );
        }
        return a;
      },
      [p, A, a],
    ),
    ht = oe(null);
  ht.current = V;
  const mt = C(() => {
      const e = o.getState()._selected;
      if (!e || !e.length) return;
      const u = e
        .map((B) => {
          const ee = o.getTask(B.id);
          if (!ee) return null;
          const {
            $x: pe,
            $y: Me,
            $w: Ce,
            $h: ze,
            $skip: Ke,
            $level: Ve,
            $index: Ne,
            $y_base: Be,
            $x_base: Ue,
            $w_base: Qe,
            $h_base: Fn,
            $skip_baseline: On,
            $critical: Xn,
            $reorder: Kn,
            ..._t
          } = ee;
          return _t;
        })
        .filter(Boolean);
      if (!u.length) return;
      const M = u[0].parent,
        S = u.filter((B) => B.parent === M);
      S.length !== 0 &&
        ((et = S),
        (Ze = M),
        (lt = et.reduce(
          (B, ee) => (ee.start && (!B || ee.start < B) ? ee.start : B),
          null,
        )));
    }, [o]),
    gt = C(() => {
      const e = ht.current;
      if (!et.length || !e || !lt || Ze == null) return;
      const u = e.getTime() - lt.getTime(),
        b = o.getHistory();
      b?.startBatch(),
        et.forEach((M, S) => {
          const B = `task-${Date.now()}-${S}`,
            ee = M.start ? new Date(M.start.getTime() + u) : null,
            pe = M.end ? new Date(M.end.getTime() + u) : null;
          o.exec('add-task', {
            task: {
              ...M,
              id: B,
              start: ee,
              end: pe,
              // Keep original parent and row from copied task
              parent: Ze,
              row: M.row,
              // Each task keeps its own row
            },
            target: Ze,
            mode: 'child',
            skipUndo: S > 0,
          });
        }),
        b?.endBatch();
    }, [o]);
  re(
    () =>
      g
        ? o.intercept('hotkey', (u) => {
            if (u.key === 'ctrl+c' || u.key === 'meta+c') return mt(), !1;
            if (u.key === 'ctrl+v' || u.key === 'meta+v') return gt(), !1;
          })
        : void 0,
    [g, o, mt, gt],
  );
  const wt = v(() => {
    if (!d) return null;
    const e = Math.min(d.startX, d.currentX),
      u = Math.min(d.startY, d.currentY),
      b = Math.abs(d.currentX - d.startX),
      M = Math.abs(d.currentY - d.startY);
    return {
      left: `${e}px`,
      top: `${u}px`,
      width: `${b}px`,
      height: `${M}px`,
    };
  }, [d]);
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${_.length ? _[0].$h : 0}px` },
    ref: he,
    onContextMenu: Gt,
    onMouseDown: ye,
    onMouseMove: Xe,
    onTouchStart: ve,
    onTouchMove: l,
    onTouchEnd: $,
    onClick: Wt,
    onDoubleClick: G,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ i(vn, {
        onSelectLink: Le,
        selectedLink: se,
        readonly: n,
      }),
      _.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const u =
            `wx-bar wx-${ut(e.type)}` +
            (Re && J && e.id === J.id ? ' wx-touch' : '') +
            (a && a.id === e.id ? ' wx-selected' : '') +
            (xe.has(e.id) ? ' wx-selected' : '') +
            (ot(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (Z && e.segments ? ' wx-split' : ''),
          b =
            'wx-link wx-left' +
            (a ? ' wx-visible' : '') +
            (!a || (!Ee(e.id, !0) && ft(e.id)) ? ' wx-target' : '') +
            (a && a.id === e.id && a.start ? ' wx-selected' : '') +
            (ot(e.id) ? ' wx-critical' : ''),
          M =
            'wx-link wx-right' +
            (a ? ' wx-visible' : '') +
            (!a || (!Ee(e.id, !1) && ft(e.id)) ? ' wx-target' : '') +
            (a && a.id === e.id && !a.start ? ' wx-selected' : '') +
            (ot(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ Ie(
          Ft,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ Ie('div', {
                  className: 'wx-GKbcLEGA ' + u,
                  style: zt(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: Q === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === se?.target && se?.type[2] === 's'
                        ? /* @__PURE__ */ i(xt, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ i('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ i('div', {
                            className: 'wx-GKbcLEGA ' + b,
                            children: /* @__PURE__ */ i('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ Ie(Je, {
                          children: [
                            e.progress && !(Z && e.segments)
                              ? /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ i('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            !n && !(Z && e.segments)
                              ? /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            s
                              ? /* @__PURE__ */ i(s, {
                                  data: e,
                                  api: o,
                                  onAction: dt,
                                })
                              : Z && e.segments
                                ? /* @__PURE__ */ i(Tn, {
                                    task: e,
                                    type: ut(e.type),
                                  })
                                : /* @__PURE__ */ i('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ Ie(Je, {
                          children: [
                            /* @__PURE__ */ i('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            s
                              ? /* @__PURE__ */ i(s, {
                                  data: e,
                                  api: o,
                                  onAction: dt,
                                })
                              : /* @__PURE__ */ i('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    n
                      ? null
                      : e.id === se?.target && se?.type[2] === 'e'
                        ? /* @__PURE__ */ i(xt, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ i('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ i('div', {
                            className: 'wx-GKbcLEGA ' + M,
                            children: /* @__PURE__ */ i('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                  ],
                }),
              h && !e.$skip_baseline
                ? /* @__PURE__ */ i('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: Pt(e),
                  })
                : null,
            ],
          },
          e.id,
        );
      }),
      d &&
        wt &&
        /* @__PURE__ */ i('div', {
          className: 'wx-GKbcLEGA wx-marquee-selection',
          style: wt,
        }),
    ],
  });
}
function Cn(t) {
  const { highlightTime: n } = t,
    s = Pe(Fe),
    c = H(s, '_scales');
  return /* @__PURE__ */ i('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: c.width },
    children: (c?.rows || []).map((r, N) =>
      /* @__PURE__ */ i(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${r.height}px` },
          children: (r.cells || []).map((g, o) => {
            const f = n ? n(g.date, g.unit) : '',
              I = 'wx-cell ' + (g.css || '') + ' ' + (f || ''),
              x = typeof g.value == 'string' && g.value.includes('<');
            return /* @__PURE__ */ i(
              'div',
              {
                className: 'wx-ZkvhDKir ' + I,
                style: { width: `${g.width}px` },
                ...(x
                  ? { dangerouslySetInnerHTML: { __html: g.value } }
                  : { children: g.value }),
              },
              o,
            );
          }),
        },
        N,
      ),
    ),
  });
}
const Rn = /* @__PURE__ */ new Map();
function En(t) {
  const n = oe(null),
    s = oe(0),
    c = oe(null),
    r = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    s.current++,
    re(() => {
      if (r)
        return (
          cancelAnimationFrame(c.current),
          (c.current = requestAnimationFrame(() => {
            const N = {
              label: t,
              time: performance.now() - n.current,
              renders: s.current,
              timestamp: Date.now(),
            };
            Rn.set(t, N),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: N }),
              );
          })),
          () => cancelAnimationFrame(c.current)
        );
    });
}
function Dn(t) {
  const {
      readonly: n,
      fullWidth: s,
      fullHeight: c,
      taskTemplate: r,
      cellBorders: N,
      highlightTime: g,
      multiTaskRows: o = !1,
      rowMapping: f = null,
      marqueeSelect: I = !1,
      copyPaste: x = !1,
      scrollToCurrentWeek: q = !1,
      currentWeekColor: E = null,
    } = t,
    m = Pe(Fe),
    [W, h] = tt(m, '_selected'),
    R = H(m, 'scrollTop'),
    j = H(m, 'cellHeight'),
    L = H(m, 'cellWidth'),
    z = H(m, '_scales'),
    D = H(m, '_markers'),
    A = H(m, '_scrollTask'),
    p = H(m, 'zoom'),
    Z = H(m, '_tasks'),
    [U, de] = ge(),
    _ = oe(null),
    ae = oe(0),
    le = oe(!1),
    T = 1 + (z?.rows?.length || 0),
    a = v(() => {
      if (!o || !f || !Z?.length) return null;
      const d = /* @__PURE__ */ new Map(),
        P = /* @__PURE__ */ new Map(),
        F = [];
      return (
        Z.forEach((O) => {
          const V = f.taskRows.get(O.id) ?? O.id;
          P.has(V) || (P.set(V, F.length), F.push(V));
        }),
        Z.forEach((O) => {
          const V = f.taskRows.get(O.id) ?? O.id,
            ie = P.get(V) ?? 0;
          d.set(O.id, ie * j);
        }),
        d
      );
    }, [Z, o, f, j]),
    K = v(() => {
      const d = [];
      return (
        W &&
          W.length &&
          j &&
          W.forEach((P) => {
            const F = a?.get(P.id) ?? P.$y;
            d.push({ height: `${j}px`, top: `${F - 3}px` });
          }),
        d
      );
    }, [h, j, a]),
    J = v(() => Math.max(U || 0, c), [U, c]);
  re(() => {
    const d = _.current;
    d && typeof R == 'number' && (d.scrollTop = R);
  }, [R]);
  const ue = () => {
    ne();
  };
  function ne(d) {
    const P = _.current;
    if (!P) return;
    const F = {};
    (F.left = P.scrollLeft), m.exec('scroll-chart', F);
  }
  function se() {
    const d = _.current,
      F = Math.ceil((U || 0) / (j || 1)) + 1,
      O = Math.floor(((d && d.scrollTop) || 0) / (j || 1)),
      V = Math.max(0, O - T),
      ie = O + F + T,
      he = V * (j || 0);
    m.exec('render-data', {
      start: V,
      end: ie,
      from: he,
    });
  }
  re(() => {
    se();
  }, [U, R]);
  const be = C(
    (d) => {
      if (!d) return;
      const { id: P, mode: F } = d;
      if (F.toString().indexOf('x') < 0) return;
      const O = _.current;
      if (!O) return;
      const { clientWidth: V } = O,
        ie = m.getTask(P);
      if (ie.$x + ie.$w < O.scrollLeft)
        m.exec('scroll-chart', { left: ie.$x - (L || 0) }),
          (O.scrollLeft = ie.$x - (L || 0));
      else if (ie.$x >= V + O.scrollLeft) {
        const he = V < ie.$w ? L || 0 : ie.$w;
        m.exec('scroll-chart', { left: ie.$x - V + he }),
          (O.scrollLeft = ie.$x - V + he);
      }
    },
    [m, L],
  );
  re(() => {
    be(A);
  }, [A]);
  function Re(d) {
    if (p && (d.ctrlKey || d.metaKey)) {
      d.preventDefault();
      const P = _.current,
        F = d.clientX - (P ? P.getBoundingClientRect().left : 0);
      if (((ae.current += d.deltaY), Math.abs(ae.current) >= 150)) {
        const V = -Math.sign(ae.current);
        (ae.current = 0),
          m.exec('zoom-scale', {
            dir: V,
            offset: F,
          });
      }
    }
  }
  const Ae = C(
      (d) => {
        const P = g(d.date, d.unit);
        return P
          ? {
              css: P,
              width: d.width,
            }
          : null;
      },
      [g],
    ),
    $e = v(() => {
      if (!z || !g || !['hour', 'day', 'week'].includes(z.minUnit)) return null;
      let P = 0;
      return z.rows[z.rows.length - 1].cells.map((F) => {
        const O = Ae(F),
          V = P;
        return (P += F.width), O ? { ...O, left: V } : null;
      });
    }, [z, g, Ae]),
    De = C(
      (d) => {
        (d.eventSource = 'chart'), m.exec('hotkey', d);
      },
      [m],
    );
  re(() => {
    const d = _.current;
    if (!d) return;
    const P = () => de(d.clientHeight);
    P();
    const F = new ResizeObserver(() => P());
    return (
      F.observe(d),
      () => {
        F.disconnect();
      }
    );
  }, [_.current]);
  const te = oe(null);
  return (
    re(() => {
      const d = _.current;
      if (d && !te.current)
        return (
          (te.current = It(d, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (P) => De(P),
          })),
          () => {
            te.current?.destroy(), (te.current = null);
          }
        );
    }, []),
    re(() => {
      const d = _.current;
      if (!d) return;
      const P = Re;
      return (
        d.addEventListener('wheel', P),
        () => {
          d.removeEventListener('wheel', P);
        }
      );
    }, [Re]),
    re(() => {
      if (!q || le.current || !z || !_.current || !U) return;
      const d = _.current,
        { clientWidth: P } = d,
        F = /* @__PURE__ */ new Date(),
        O = z.rows[z.rows.length - 1]?.cells;
      if (!O) return;
      let V = -1,
        ie = 0;
      const he = [];
      for (let Q = 0; Q < O.length; Q++) {
        const fe = O[Q];
        he.push({ left: ie, width: fe.width });
        const we = fe.date;
        if (fe.unit === 'week') {
          const Se = new Date(we);
          Se.setDate(Se.getDate() + 7), F >= we && F < Se && (V = Q);
        } else
          fe.unit === 'day' &&
            F.getFullYear() === we.getFullYear() &&
            F.getMonth() === we.getMonth() &&
            F.getDate() === we.getDate() &&
            (V = Q);
        ie += fe.width;
      }
      let k = V;
      if ((V > 0 && (k = V - 1), k >= 0 && he[k])) {
        const Q = he[k],
          fe = Math.max(0, Q.left);
        (d.scrollLeft = fe),
          m.exec('scroll-chart', { left: fe }),
          (le.current = !0);
      }
    }, [q, z, U, m]),
    En('chart'),
    /* @__PURE__ */ Ie('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: _,
      onScroll: ue,
      children: [
        /* @__PURE__ */ i(Cn, { highlightTime: g, scales: z }),
        D && D.length
          ? /* @__PURE__ */ i('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${J}px` },
              children: D.map((d, P) =>
                /* @__PURE__ */ i(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${d.css || ''}`,
                    style: { left: `${d.left}px` },
                    children: /* @__PURE__ */ i('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: d.text,
                    }),
                  },
                  P,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ Ie('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${s}px`, height: `${J}px` },
          children: [
            $e
              ? /* @__PURE__ */ i('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: $e.map((d, P) =>
                    d
                      ? /* @__PURE__ */ i(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + d.css,
                            style: {
                              width: `${d.width}px`,
                              left: `${d.left}px`,
                            },
                          },
                          P,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ i(bn, { borders: N }),
            W && W.length
              ? W.map((d, P) =>
                  d.$y
                    ? /* @__PURE__ */ i(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': d.id,
                          style: K[P],
                        },
                        d.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ i(Mn, {
              readonly: n,
              taskTemplate: r,
              multiTaskRows: o,
              rowMapping: f,
              marqueeSelect: I,
              copyPaste: x,
            }),
          ],
        }),
      ],
    })
  );
}
function Sn(t) {
  const {
      position: n = 'after',
      size: s = 4,
      dir: c = 'x',
      onMove: r,
      onDisplayChange: N,
      compactMode: g,
      containerWidth: o = 0,
      leftThreshold: f = 50,
      rightThreshold: I = 50,
    } = t,
    [x, q] = ct(t.value ?? 0),
    [E, m] = ct(t.display ?? 'all');
  function W(ne) {
    let se = 0;
    n == 'center' ? (se = s / 2) : n == 'before' && (se = s);
    const be = {
      size: [s + 'px', 'auto'],
      p: [ne - se + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (c != 'x') for (let Re in be) be[Re] = be[Re].reverse();
    return be;
  }
  const [h, R] = ge(!1),
    [j, L] = ge(null),
    z = oe(0),
    D = oe(),
    A = oe(),
    p = oe(E);
  re(() => {
    p.current = E;
  }, [E]),
    re(() => {
      j === null && x > 0 && L(x);
    }, [j, x]);
  function Z(ne) {
    return c == 'x' ? ne.clientX : ne.clientY;
  }
  const U = C(
      (ne) => {
        const se = D.current + Z(ne) - z.current;
        q(se);
        let be;
        se <= f ? (be = 'chart') : o - se <= I ? (be = 'grid') : (be = 'all'),
          p.current !== be && (m(be), (p.current = be)),
          A.current && clearTimeout(A.current),
          (A.current = setTimeout(() => r && r(se), 100));
      },
      [o, f, I, r],
    ),
    de = C(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        R(!1),
        window.removeEventListener('mousemove', U),
        window.removeEventListener('mouseup', de);
    }, [U]),
    _ = v(
      () => (E !== 'all' ? 'auto' : c == 'x' ? 'ew-resize' : 'ns-resize'),
      [E, c],
    ),
    ae = C(
      (ne) => {
        (!g && (E === 'grid' || E === 'chart')) ||
          ((z.current = Z(ne)),
          (D.current = x),
          R(!0),
          (document.body.style.cursor = _),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', U),
          window.addEventListener('mouseup', de));
      },
      [_, U, de, x, g, E],
    );
  function le() {
    m('all'), j !== null && (q(j), r && r(j));
  }
  function T(ne) {
    if (g) {
      const se = E === 'chart' ? 'grid' : 'chart';
      m(se), N(se);
    } else if (E === 'grid' || E === 'chart') le(), N('all');
    else {
      const se = ne === 'left' ? 'chart' : 'grid';
      m(se), N(se);
    }
  }
  function a() {
    T('left');
  }
  function K() {
    T('right');
  }
  const J = v(() => W(x), [x, n, s, c]),
    ue = [
      'wx-resizer',
      `wx-resizer-${c}`,
      `wx-resizer-display-${E}`,
      h ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-pFykzMlT ' + ue,
    onMouseDown: ae,
    style: { width: J.size[0], height: J.size[1], cursor: _ },
    children: [
      /* @__PURE__ */ Ie('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ i('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ i('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: a,
            }),
          }),
          /* @__PURE__ */ i('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ i('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: K,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ i('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const Nn = 650;
function At(t) {
  let n;
  function s() {
    (n = new ResizeObserver((r) => {
      for (let N of r)
        if (N.target === document.body) {
          let g = N.contentRect.width <= Nn;
          t(g);
        }
    })),
      n.observe(document.body);
  }
  function c() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: s,
    disconnect: c,
  };
}
function Ln(t) {
  const {
      taskTemplate: n,
      readonly: s,
      cellBorders: c,
      highlightTime: r,
      onTableAPIChange: N,
      multiTaskRows: g = !1,
      rowMapping: o = null,
      marqueeSelect: f = !1,
      copyPaste: I = !1,
      scrollToCurrentWeek: x = !1,
      currentWeekColor: q = null,
    } = t,
    E = Pe(Fe),
    m = H(E, '_tasks'),
    W = H(E, '_scales'),
    h = H(E, 'cellHeight'),
    R = H(E, 'columns'),
    j = H(E, '_scrollTask'),
    L = H(E, 'undo'),
    z = v(() => {
      if (!g) return o;
      const k = /* @__PURE__ */ new Map(),
        Q = /* @__PURE__ */ new Map();
      return (
        m.forEach((fe) => {
          const we = fe.row ?? fe.id;
          Q.set(fe.id, we), k.has(we) || k.set(we, []), k.get(we).push(fe.id);
        }),
        { rowMap: k, taskRows: Q }
      );
    }, [m, g, o]),
    [D, A] = ge(!1);
  let [p, Z] = ge(0);
  const [U, de] = ge(0),
    [_, ae] = ge(0),
    [le, T] = ge(void 0),
    [a, K] = ge('all'),
    J = oe(null),
    ue = C(
      (k) => {
        A(
          (Q) => (
            k !== Q &&
              (k
                ? ((J.current = a), a === 'all' && K('grid'))
                : (!J.current || J.current === 'all') && K('all')),
            k
          ),
        );
      },
      [a],
    );
  re(() => {
    const k = At(ue);
    return (
      k.observe(),
      () => {
        k.disconnect();
      }
    );
  }, [ue]);
  const ne = v(() => {
    let k;
    return (
      R.every((Q) => Q.width && !Q.flexgrow)
        ? (k = R.reduce((Q, fe) => Q + parseInt(fe.width), 0))
        : D && a === 'chart'
          ? (k = parseInt(R.find((Q) => Q.id === 'action')?.width) || 50)
          : (k = 440),
      (p = k),
      k
    );
  }, [R, D, a]);
  re(() => {
    Z(ne);
  }, [ne]);
  const se = v(() => (U ?? 0) - (le ?? 0), [U, le]),
    be = v(() => W.width, [W]),
    Re = v(() => {
      if (!g || !z) return m.length * h;
      const k = /* @__PURE__ */ new Set();
      return (
        m.forEach((Q) => {
          const fe = z.taskRows.get(Q.id) ?? Q.id;
          k.add(fe);
        }),
        k.size * h
      );
    }, [m, h, g, z]),
    Ae = v(() => W.height + Re + se, [W, Re, se]),
    $e = v(() => p + be, [p, be]),
    De = oe(null),
    te = C(() => {
      Promise.resolve().then(() => {
        if ((U ?? 0) > ($e ?? 0)) {
          const k = (U ?? 0) - p;
          E.exec('expand-scale', { minWidth: k });
        }
      });
    }, [U, $e, p, E]);
  re(() => {
    let k;
    return (
      De.current && ((k = new ResizeObserver(te)), k.observe(De.current)),
      () => {
        k && k.disconnect();
      }
    );
  }, [De.current, te]),
    re(() => {
      te();
    }, [be]);
  const d = oe(null),
    P = oe(null),
    F = C(() => {
      const k = d.current;
      k &&
        E.exec('scroll-chart', {
          top: k.scrollTop,
        });
    }, [E]),
    O = oe({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  re(() => {
    O.current = {
      rTasks: m,
      rScales: W,
      rCellHeight: h,
      scrollSize: se,
      ganttDiv: d.current,
      ganttHeight: _ ?? 0,
    };
  }, [m, W, h, se, _]);
  const V = C(
    (k) => {
      if (!k) return;
      const {
        rTasks: Q,
        rScales: fe,
        rCellHeight: we,
        scrollSize: Se,
        ganttDiv: w,
        ganttHeight: ce,
      } = O.current;
      if (!w) return;
      const { id: xe } = k,
        X = Q.findIndex((Y) => Y.id === xe);
      if (X > -1) {
        const Y = ce - fe.height,
          ye = X * we,
          ve = w.scrollTop;
        let Le = null;
        ye < ve ? (Le = ye) : ye + we > ve + Y && (Le = ye - Y + we + Se),
          Le !== null &&
            (E.exec('scroll-chart', { top: Math.max(Le, 0) }),
            (d.current.scrollTop = Math.max(Le, 0)));
      }
    },
    [E],
  );
  re(() => {
    V(j);
  }, [j]),
    re(() => {
      const k = d.current,
        Q = P.current;
      if (!k || !Q) return;
      const fe = () => {
          mn(() => {
            ae(k.offsetHeight), de(k.offsetWidth), T(Q.offsetWidth);
          });
        },
        we = new ResizeObserver(fe);
      return we.observe(k), () => we.disconnect();
    }, [d.current]);
  const ie = oe(null),
    he = oe(null);
  return (
    re(() => {
      he.current && (he.current.destroy(), (he.current = null));
      const k = ie.current;
      if (k)
        return (
          (he.current = It(k, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              'meta+c': !0,
              'meta+v': !0,
              'meta+x': !0,
              'meta+d': !0,
              backspace: !0,
              'ctrl+z': L,
              'ctrl+y': L,
              'meta+z': L,
              'meta+shift+z': L,
            },
            exec: (Q) => {
              Q.isInput || E.exec('hotkey', Q);
            },
          })),
          () => {
            he.current?.destroy(), (he.current = null);
          }
        );
    }, [L]),
    /* @__PURE__ */ i('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: d,
      onScroll: F,
      children: /* @__PURE__ */ i('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: Ae, width: '100%' },
        ref: P,
        children: /* @__PURE__ */ i('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: _,
            width: le,
          },
          children: /* @__PURE__ */ Ie('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: ie,
            children: [
              R.length
                ? /* @__PURE__ */ Ie(Je, {
                    children: [
                      /* @__PURE__ */ i(kn, {
                        display: a,
                        compactMode: D,
                        columnWidth: ne,
                        width: p,
                        readonly: s,
                        fullHeight: Re,
                        onTableAPIChange: N,
                        multiTaskRows: g,
                        rowMapping: z,
                      }),
                      /* @__PURE__ */ i(Sn, {
                        value: p,
                        display: a,
                        compactMode: D,
                        containerWidth: U,
                        onMove: (k) => Z(k),
                        onDisplayChange: (k) => K(k),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ i('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: De,
                children: /* @__PURE__ */ i(Dn, {
                  readonly: s,
                  fullWidth: be,
                  fullHeight: Re,
                  taskTemplate: n,
                  cellBorders: c,
                  highlightTime: r,
                  multiTaskRows: g,
                  rowMapping: z,
                  marqueeSelect: f,
                  copyPaste: I,
                  scrollToCurrentWeek: x,
                  currentWeekColor: q,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function In(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function An(t, n) {
  return typeof t == 'function' ? t : nt(t, n);
}
function Ht(t, n) {
  return t.map(({ format: s, ...c }) => ({
    ...c,
    format: An(s, n),
  }));
}
function Hn(t, n) {
  const s = In(n);
  for (let c in s) s[c] = nt(s[c], t);
  return s;
}
function Wn(t, n) {
  if (!t || !t.length) return t;
  const s = nt('%d-%m-%Y', n);
  return t.map((c) =>
    c.template
      ? c
      : c.id === 'start' || c.id == 'end'
        ? {
            ...c,
            //store locale template for unscheduled tasks
            _template: (r) => s(r),
            template: (r) => s(r),
          }
        : c.id === 'duration'
          ? {
              ...c,
              _template: (r) => r,
              template: (r) => r,
            }
          : c,
  );
}
function zn(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((s) => ({
          ...s,
          scales: Ht(s.scales, n),
        })),
      }
    : t;
}
const Pn = (t) =>
    t
      .split('-')
      .map((n) => (n ? n.charAt(0).toUpperCase() + n.slice(1) : ''))
      .join(''),
  Gn = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  cs = Et(function (
    {
      taskTemplate: n = null,
      markers: s = [],
      taskTypes: c = an,
      tasks: r = [],
      selected: N = [],
      activeTask: g = null,
      links: o = [],
      scales: f = Gn,
      columns: I = cn,
      start: x = null,
      end: q = null,
      lengthUnit: E = 'day',
      durationUnit: m = 'day',
      cellWidth: W = 100,
      cellHeight: h = 38,
      scaleHeight: R = 36,
      readonly: j = !1,
      cellBorders: L = 'full',
      zoom: z = !1,
      baselines: D = !1,
      highlightTime: A = null,
      init: p = null,
      autoScale: Z = !0,
      unscheduledTasks: U = !1,
      criticalPath: de = null,
      schedule: _ = { type: 'forward' },
      projectStart: ae = null,
      projectEnd: le = null,
      calendar: T = null,
      undo: a = !1,
      splitTasks: K = !1,
      multiTaskRows: J = !1,
      marqueeSelect: ue = !1,
      copyPaste: ne = !1,
      currentWeekHighlight: se = !1,
      currentWeekColor: be = null,
      scrollToCurrentWeek: Re = !1,
      ...Ae
    },
    $e,
  ) {
    const De = oe();
    De.current = Ae;
    const te = v(() => new rn(dn), []),
      d = v(() => ({ ...it, ...rt }), []),
      P = Pe(_e.i18n),
      F = v(() => (P ? P.extend(d, !0) : st(d)), [P, d]),
      O = v(() => F.getRaw().calendar, [F]),
      V = v(() => {
        let Y = {
          zoom: zn(z, O),
          scales: Ht(f, O),
          columns: Wn(I, O),
          links: on(o),
          cellWidth: W,
        };
        return (
          Y.zoom &&
            (Y = {
              ...Y,
              ...ln(Y.zoom, Hn(O, F.getGroup('gantt')), Y.scales, W),
            }),
          Y
        );
      }, [z, f, I, o, W, O, F]),
      ie = oe(null);
    ie.current !== r &&
      (bt(r, { durationUnit: m, splitTasks: K, calendar: T }),
      (ie.current = r)),
      re(() => {
        bt(r, { durationUnit: m, splitTasks: K, calendar: T });
      }, [r, m, T, K]);
    const he = v(() => {
        if (!J) return null;
        const Y = /* @__PURE__ */ new Map(),
          ye = /* @__PURE__ */ new Map(),
          ve = (Le) => {
            Le.forEach((Te) => {
              const He = Te.row ?? Te.id;
              ye.set(Te.id, He),
                Y.has(He) || Y.set(He, []),
                Y.get(He).push(Te.id),
                Te.data && Te.data.length > 0 && ve(Te.data);
            });
          };
        return ve(r), { rowMap: Y, taskRows: ye };
      }, [r, J]),
      k = v(() => te.in, [te]),
      Q = oe(null);
    Q.current === null &&
      ((Q.current = new en((Y, ye) => {
        const ve = 'on' + Pn(Y);
        De.current && De.current[ve] && De.current[ve](ye);
      })),
      k.setNext(Q.current));
    const [fe, we] = ge(null),
      Se = oe(null);
    Se.current = fe;
    const w = v(
      () => ({
        getState: te.getState.bind(te),
        getReactiveState: te.getReactive.bind(te),
        getStores: () => ({ data: te }),
        exec: k.exec,
        setNext: (Y) => ((Q.current = Q.current.setNext(Y)), Q.current),
        intercept: k.intercept.bind(k),
        on: k.on.bind(k),
        detach: k.detach.bind(k),
        getTask: te.getTask.bind(te),
        serialize: te.serialize.bind(te),
        getTable: (Y) =>
          Y
            ? new Promise((ye) => setTimeout(() => ye(Se.current), 1))
            : Se.current,
        getHistory: () => te.getHistory(),
      }),
      [te, k],
    );
    Dt(
      $e,
      () => ({
        ...w,
      }),
      [w],
    );
    const ce = oe(0);
    re(() => {
      ce.current
        ? te.init({
            tasks: r,
            links: V.links,
            start: x,
            columns: V.columns,
            end: q,
            lengthUnit: E,
            cellWidth: V.cellWidth,
            cellHeight: h,
            scaleHeight: R,
            scales: V.scales,
            taskTypes: c,
            zoom: V.zoom,
            selected: N,
            activeTask: g,
            baselines: D,
            autoScale: Z,
            unscheduledTasks: U,
            markers: s,
            durationUnit: m,
            criticalPath: de,
            schedule: _,
            projectStart: ae,
            projectEnd: le,
            calendar: T,
            undo: a,
            _weekStart: O.weekStart,
            splitTasks: K,
          })
        : p && p(w),
        ce.current++;
    }, [
      w,
      p,
      r,
      V,
      x,
      q,
      E,
      h,
      R,
      c,
      N,
      g,
      D,
      Z,
      U,
      s,
      m,
      de,
      _,
      ae,
      le,
      T,
      a,
      O,
      K,
      te,
    ]),
      ce.current === 0 &&
        te.init({
          tasks: r,
          links: V.links,
          start: x,
          columns: V.columns,
          end: q,
          lengthUnit: E,
          cellWidth: V.cellWidth,
          cellHeight: h,
          scaleHeight: R,
          scales: V.scales,
          taskTypes: c,
          zoom: V.zoom,
          selected: N,
          activeTask: g,
          baselines: D,
          autoScale: Z,
          unscheduledTasks: U,
          markers: s,
          durationUnit: m,
          criticalPath: de,
          schedule: _,
          projectStart: ae,
          projectEnd: le,
          calendar: T,
          undo: a,
          _weekStart: O.weekStart,
          splitTasks: K,
        });
    const xe = v(() => {
        const Y = /* @__PURE__ */ new Date(),
          ye = O?.weekStart ?? 0,
          ve = new Date(Y),
          Te = (ve.getDay() - ye + 7) % 7;
        ve.setDate(ve.getDate() - Te), ve.setHours(0, 0, 0, 0);
        const He = new Date(ve);
        return He.setDate(He.getDate() + 7), (Xe) => Xe >= ve && Xe < He;
      }, [O]),
      X = v(
        () => (Y, ye) => {
          let ve = [];
          if (T)
            ye == 'day' && !T.getDayHours(Y) && ve.push('wx-weekend'),
              ye == 'hour' && !T.getDayHours(Y) && ve.push('wx-weekend');
          else if (A) {
            const Le = A(Y, ye);
            Le && ve.push(Le);
          }
          return (
            se &&
              (ye === 'week' || ye === 'day') &&
              xe(Y) &&
              ve.push('wx-current-week'),
            ve.join(' ')
          );
        },
        [T, A, se, xe],
      );
    return /* @__PURE__ */ i(_e.i18n.Provider, {
      value: F,
      children: /* @__PURE__ */ i(Fe.Provider, {
        value: w,
        children: /* @__PURE__ */ i(Ln, {
          taskTemplate: n,
          readonly: j,
          cellBorders: L,
          highlightTime: X,
          onTableAPIChange: we,
          multiTaskRows: J,
          rowMapping: he,
          marqueeSelect: ue,
          copyPaste: ne,
          scrollToCurrentWeek: Re,
          currentWeekColor: be,
        }),
      }),
    });
  });
function is({ api: t = null, items: n = [] }) {
  const s = Pe(_e.i18n),
    c = v(() => s || st(rt), [s]),
    r = v(() => c.getGroup('gantt'), [c]),
    N = Ye(t, '_selected'),
    g = Ye(t, 'undo'),
    o = Ye(t, 'history'),
    f = Ye(t, 'splitTasks'),
    I = ['undo', 'redo'],
    x = v(() => {
      const E = vt({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : vt({
              undo: g,
              splitTasks: f,
            })
      ).map((W) => {
        let h = { ...W, disabled: !1 };
        return (
          (h.handler = Lt(E, h.id) ? (R) => Nt(t, R.id, null, r) : h.handler),
          h.text && (h.text = r(h.text)),
          h.menuText && (h.menuText = r(h.menuText)),
          h
        );
      });
    }, [n, t, r, g, f]),
    q = v(() => {
      const E = [];
      return (
        x.forEach((m) => {
          const W = m.id;
          if (W === 'add-task') E.push(m);
          else if (I.includes(W))
            I.includes(W) &&
              E.push({
                ...m,
                disabled: m.isDisabled(o),
              });
          else {
            if (!N?.length || !t) return;
            E.push({
              ...m,
              disabled:
                m.isDisabled && N.some((h) => m.isDisabled(h, t.getState())),
            });
          }
        }),
        E.filter((m, W) => {
          if (t && m.isHidden)
            return !N.some((h) => m.isHidden(h, t.getState()));
          if (m.comp === 'separator') {
            const h = E[W + 1];
            if (!h || h.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, N, o, x]);
  return s
    ? /* @__PURE__ */ i($t, { items: q })
    : /* @__PURE__ */ i(_e.i18n.Provider, {
        value: c,
        children: /* @__PURE__ */ i($t, { items: q }),
      });
}
const as = Et(function (
  {
    options: n = [],
    api: s = null,
    resolver: c = null,
    filter: r = null,
    at: N = 'point',
    children: g,
    onClick: o,
    css: f,
  },
  I,
) {
  const x = oe(null),
    q = oe(null),
    E = Pe(_e.i18n),
    m = v(() => E || st({ ...rt, ...it }), [E]),
    W = v(() => m.getGroup('gantt'), [m]),
    h = Ye(s, 'taskTypes'),
    R = Ye(s, 'selected'),
    j = Ye(s, '_selected'),
    L = Ye(s, 'splitTasks'),
    z = v(() => Tt({ splitTasks: !0 }), []);
  re(() => {
    s &&
      (s.on('scroll-chart', () => {
        x.current && x.current.show && x.current.show();
      }),
      s.on('drag-task', () => {
        x.current && x.current.show && x.current.show();
      }));
  }, [s]);
  function D(T) {
    return T.map(
      (a) => (
        (a = { ...a }),
        a.text && (a.text = W(a.text)),
        a.subtext && (a.subtext = W(a.subtext)),
        a.data && (a.data = D(a.data)),
        a
      ),
    );
  }
  function A() {
    const T = n.length ? n : Tt({ splitTasks: L }),
      a = T.find((K) => K.id === 'convert-task');
    return (
      a &&
        ((a.data = []),
        (h || []).forEach((K) => {
          a.data.push(a.dataFactory(K));
        })),
      D(T)
    );
  }
  const p = v(() => A(), [s, n, h, L, W]),
    Z = v(() => (j && j.length ? j : []), [j]),
    U = C(
      (T, a) => {
        let K = T ? s?.getTask(T) : null;
        if (c) {
          const J = c(T, a);
          K = J === !0 ? K : J;
        }
        if (K) {
          const J = qe(a.target, 'data-segment');
          J !== null
            ? (q.current = { id: K.id, segmentIndex: J })
            : (q.current = K.id),
            (!Array.isArray(R) || !R.includes(K.id)) &&
              s &&
              s.exec &&
              s.exec('select-task', { id: K.id });
        }
        return K;
      },
      [s, c, R],
    ),
    de = C(
      (T) => {
        const a = T.action;
        a && (Lt(z, a.id) && Nt(s, a.id, q.current, W), o && o(T));
      },
      [s, W, o, z],
    ),
    _ = C(
      (T, a) => {
        const K = Z.length ? Z : a ? [a] : [];
        let J = r ? K.every((ue) => r(T, ue)) : !0;
        if (
          J &&
          (T.isHidden &&
            (J = !K.some((ue) => T.isHidden(ue, s.getState(), q.current))),
          T.isDisabled)
        ) {
          const ue = K.some((ne) => T.isDisabled(ne, s.getState(), q.current));
          T.disabled = ue;
        }
        return J;
      },
      [r, Z, s],
    );
  Dt(I, () => ({
    show: (T, a) => {
      x.current && x.current.show && x.current.show(T, a);
    },
  }));
  const ae = C((T) => {
      x.current && x.current.show && x.current.show(T);
    }, []),
    le = /* @__PURE__ */ Ie(Je, {
      children: [
        /* @__PURE__ */ i(gn, {
          filter: _,
          options: p,
          dataKey: 'id',
          resolver: U,
          onClick: de,
          at: N,
          ref: x,
          css: f,
        }),
        /* @__PURE__ */ i('span', {
          onContextMenu: ae,
          'data-menu-ignore': 'true',
          children: typeof g == 'function' ? g() : g,
        }),
      ],
    });
  if (!E && _e.i18n?.Provider) {
    const T = _e.i18n.Provider;
    return /* @__PURE__ */ i(T, { value: m, children: le });
  }
  return le;
});
function _n({ api: t, autoSave: n, onLinksChange: s }) {
  const r = Pe(_e.i18n).getGroup('gantt'),
    N = H(t, 'activeTask'),
    g = H(t, '_activeTask'),
    o = H(t, '_links'),
    f = H(t, 'schedule'),
    I = H(t, 'unscheduledTasks'),
    [x, q] = ge();
  function E() {
    if (N) {
      const R = o
          .filter((L) => L.target == N)
          .map((L) => ({ link: L, task: t.getTask(L.source) })),
        j = o
          .filter((L) => L.source == N)
          .map((L) => ({ link: L, task: t.getTask(L.target) }));
      return [
        { title: r('Predecessors'), data: R },
        { title: r('Successors'), data: j },
      ];
    }
  }
  re(() => {
    q(E());
  }, [N, o]);
  const m = v(
    () => [
      { id: 'e2s', label: r('End-to-start') },
      { id: 's2s', label: r('Start-to-start') },
      { id: 'e2e', label: r('End-to-end') },
      { id: 's2e', label: r('Start-to-end') },
    ],
    [r],
  );
  function W(R) {
    n
      ? t.exec('delete-link', { id: R })
      : (q((j) =>
          (j || []).map((L) => ({
            ...L,
            data: L.data.filter((z) => z.link.id !== R),
          })),
        ),
        s &&
          s({
            id: R,
            action: 'delete-link',
            data: { id: R },
          }));
  }
  function h(R, j) {
    n
      ? t.exec('update-link', {
          id: R,
          link: j,
        })
      : (q((L) =>
          (L || []).map((z) => ({
            ...z,
            data: z.data.map((D) =>
              D.link.id === R ? { ...D, link: { ...D.link, ...j } } : D,
            ),
          })),
        ),
        s &&
          s({
            id: R,
            action: 'update-link',
            data: {
              id: R,
              link: j,
            },
          }));
  }
  return /* @__PURE__ */ i(Je, {
    children: (x || []).map((R, j) =>
      R.data.length
        ? /* @__PURE__ */ i(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ i(Ot, {
                label: R.title,
                position: 'top',
                children: /* @__PURE__ */ i('table', {
                  children: /* @__PURE__ */ i('tbody', {
                    children: R.data.map((L) =>
                      /* @__PURE__ */ Ie(
                        'tr',
                        {
                          children: [
                            /* @__PURE__ */ i('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ i('div', {
                                className: 'wx-j93aYGQf wx-task-name',
                                children: L.task.text || '',
                              }),
                            }),
                            f?.auto && L.link.type === 'e2s'
                              ? /* @__PURE__ */ i('td', {
                                  className: 'wx-j93aYGQf wx-cell wx-link-lag',
                                  children: /* @__PURE__ */ i(Xt, {
                                    type: 'number',
                                    placeholder: r('Lag'),
                                    value: L.link.lag,
                                    disabled: I && g?.unscheduled,
                                    onChange: (z) => {
                                      z.input || h(L.link.id, { lag: z.value });
                                    },
                                  }),
                                })
                              : null,
                            /* @__PURE__ */ i('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ i('div', {
                                className: 'wx-j93aYGQf wx-wrapper',
                                children: /* @__PURE__ */ i(Kt, {
                                  value: L.link.type,
                                  placeholder: r('Select link type'),
                                  options: m,
                                  onChange: (z) =>
                                    h(L.link.id, { type: z.value }),
                                  children: ({ option: z }) => z.label,
                                }),
                              }),
                            }),
                            /* @__PURE__ */ i('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ i('i', {
                                className:
                                  'wx-j93aYGQf wxi-delete wx-delete-icon',
                                onClick: () => W(L.link.id),
                                role: 'button',
                              }),
                            }),
                          ],
                        },
                        L.link.id,
                      ),
                    ),
                  }),
                }),
              }),
            },
            j,
          )
        : null,
    ),
  });
}
function Yn(t) {
  const { value: n, time: s, format: c, onchange: r, onChange: N, ...g } = t,
    o = N ?? r;
  function f(I) {
    const x = new Date(I.value);
    x.setHours(n.getHours()),
      x.setMinutes(n.getMinutes()),
      o && o({ value: x });
  }
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ i(Vt, {
        ...g,
        value: n,
        onChange: f,
        format: c,
        buttons: ['today'],
        clear: !1,
      }),
      s ? /* @__PURE__ */ i(Bt, { value: n, onChange: o, format: c }) : null,
    ],
  });
}
je('select', jt);
je('date', Yn);
je('twostate', Ut);
je('slider', Qt);
je('counter', Zt);
je('links', _n);
function us({
  api: t,
  items: n = [],
  css: s = '',
  layout: c = 'default',
  readonly: r = !1,
  placement: N = 'sidebar',
  bottomBar: g = !0,
  topBar: o = !0,
  autoSave: f = !0,
  focus: I = !1,
  hotkeys: x = {},
}) {
  const q = Pe(_e.i18n),
    E = v(() => q || st({ ...rt, ...it }), [q]),
    m = v(() => E.getGroup('gantt'), [E]),
    W = E.getRaw(),
    h = v(() => {
      const w = W.gantt?.dateFormat || W.formats?.dateFormat;
      return nt(w, W.calendar);
    }, [W]),
    R = v(() => {
      if (o === !0 && !r) {
        const w = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: m('Delete'),
            id: 'delete',
          },
        ];
        return f
          ? { items: w }
          : {
              items: [
                ...w,
                {
                  comp: 'button',
                  type: 'primary',
                  text: m('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return o;
    }, [o, r, f, m]),
    [j, L] = ge(!1),
    z = v(() => (j ? 'wx-full-screen' : ''), [j]),
    D = C((w) => {
      L(w);
    }, []);
  re(() => {
    const w = At(D);
    return (
      w.observe(),
      () => {
        w.disconnect();
      }
    );
  }, [D]);
  const A = H(t, '_activeTask'),
    p = H(t, 'activeTask'),
    Z = H(t, 'unscheduledTasks'),
    U = H(t, 'links'),
    de = H(t, 'splitTasks'),
    _ = v(() => de && p?.segmentIndex, [de, p]),
    ae = v(() => _ || _ === 0, [_]),
    le = v(() => un({ unscheduledTasks: Z }), [Z]),
    T = H(t, 'undo'),
    [a, K] = ge({}),
    [J, ue] = ge(null),
    [ne, se] = ge(),
    [be, Re] = ge(null),
    Ae = H(t, 'taskTypes'),
    $e = v(() => {
      if (!A) return null;
      let w;
      if ((ae && A.segments ? (w = { ...A.segments[_] }) : (w = { ...A }), r)) {
        let ce = { parent: w.parent };
        return (
          le.forEach(({ key: xe, comp: X }) => {
            if (X !== 'links') {
              const Y = w[xe];
              X === 'date' && Y instanceof Date
                ? (ce[xe] = h(Y))
                : X === 'slider' && xe === 'progress'
                  ? (ce[xe] = `${Y}%`)
                  : (ce[xe] = Y);
            }
          }),
          ce
        );
      }
      return w || null;
    }, [A, ae, _, r, le, h]);
  re(() => {
    se($e);
  }, [$e]),
    re(() => {
      K({}), Re(null), ue(null);
    }, [p]);
  function De(w, ce) {
    return w.map((xe) => {
      const X = { ...xe };
      if (
        (xe.config && (X.config = { ...X.config }),
        X.comp === 'links' &&
          t &&
          ((X.api = t), (X.autoSave = f), (X.onLinksChange = P)),
        X.comp === 'select' && X.key === 'type')
      ) {
        const Y = X.options ?? (Ae || []);
        X.options = Y.map((ye) => ({
          ...ye,
          label: m(ye.label),
        }));
      }
      return (
        X.comp === 'slider' &&
          X.key === 'progress' &&
          (X.labelTemplate = (Y) => `${m(X.label)} ${Y}%`),
        X.label && (X.label = m(X.label)),
        X.config?.placeholder &&
          (X.config.placeholder = m(X.config.placeholder)),
        ce &&
          (X.isDisabled && X.isDisabled(ce, t.getState())
            ? (X.disabled = !0)
            : delete X.disabled),
        X
      );
    });
  }
  const te = v(() => {
      let w = n.length ? n : le;
      return (
        (w = De(w, ne)),
        ne
          ? w.filter((ce) => !ce.isHidden || !ce.isHidden(ne, t.getState()))
          : w
      );
    }, [n, le, ne, Ae, m, t, f]),
    d = v(() => te.map((w) => w.key), [te]);
  function P({ id: w, action: ce, data: xe }) {
    K((X) => ({
      ...X,
      [w]: { action: ce, data: xe },
    }));
  }
  const F = C(() => {
      for (let w in a)
        if (U.byId(w)) {
          const { action: ce, data: xe } = a[w];
          t.exec(ce, xe);
        }
    }, [t, a, U]),
    O = C(() => {
      const w = p?.id || p;
      if (ae) {
        if (A?.segments) {
          const ce = A.segments.filter((xe, X) => X !== _);
          t.exec('update-task', {
            id: w,
            task: { segments: ce },
          });
        }
      } else t.exec('delete-task', { id: w });
    }, [t, p, ae, A, _]),
    V = C(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    ie = C(
      (w) => {
        const { item: ce, changes: xe } = w;
        ce.id === 'delete' && O(),
          ce.id === 'save' && (xe.length ? V() : F()),
          ce.comp && V();
      },
      [t, p, f, F, O, V],
    ),
    he = C(
      (w, ce, xe) => (
        Z && w.type === 'summary' && (w.unscheduled = !1),
        St(w, t.getState(), ce),
        xe || ue(!1),
        w
      ),
      [Z, t],
    ),
    k = C(
      (w) => {
        (w = {
          ...w,
          unscheduled: Z && w.unscheduled && w.type !== 'summary',
        }),
          delete w.links,
          delete w.data,
          (d.indexOf('duration') === -1 || (w.segments && !w.duration)) &&
            delete w.duration;
        const ce = {
          id: p?.id || p,
          task: w,
          ...(ae && { segmentIndex: _ }),
        };
        f && J && (ce.inProgress = J), t.exec('update-task', ce), f || F();
      },
      [t, p, Z, f, F, d, ae, _, J],
    ),
    Q = C(
      (w) => {
        let { update: ce, key: xe, input: X } = w;
        if ((X && ue(!0), (w.update = he({ ...ce }, xe, X)), !f)) se(w.update);
        else if (!be && !X) {
          const Y = te.find((Le) => Le.key === xe),
            ye = ce[xe];
          (!Y.validation || Y.validation(ye)) &&
            (!Y.required || ye) &&
            k(w.update);
        }
      },
      [f, he, be, te, k],
    ),
    fe = C(
      (w) => {
        f || k(w.values);
      },
      [f, k],
    ),
    we = C((w) => {
      Re(w.errors);
    }, []),
    Se = v(
      () =>
        T
          ? {
              'ctrl+z': (w) => {
                w.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (w) => {
                w.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [T, t],
    );
  return $e
    ? /* @__PURE__ */ i(qt, {
        children: /* @__PURE__ */ i(wn, {
          css: `wx-XkvqDXuw wx-gantt-editor ${z} ${s}`,
          items: te,
          values: $e,
          topBar: R,
          bottomBar: g,
          placement: N,
          layout: c,
          readonly: r,
          autoSave: f,
          focus: I,
          onAction: ie,
          onSave: fe,
          onValidation: we,
          onChange: Q,
          hotkeys: x && { ...Se, ...x },
        }),
      })
    : null;
}
const ds = ({ children: t, columns: n = null, api: s }) => {
  const [c, r] = ge(null);
  return (
    re(() => {
      s && s.getTable(!0).then(r);
    }, [s]),
    /* @__PURE__ */ i(hn, { api: c, columns: n, children: t })
  );
};
function fs(t) {
  const { api: n, content: s, children: c } = t,
    r = oe(null),
    N = oe(null),
    [g, o] = ge({}),
    [f, I] = ge(null),
    [x, q] = ge({});
  function E(D) {
    for (; D; ) {
      if (D.getAttribute) {
        const A = D.getAttribute('data-tooltip-id'),
          p = D.getAttribute('data-tooltip-at'),
          Z = D.getAttribute('data-tooltip');
        if (A || Z) return { id: A, tooltip: Z, target: D, at: p };
      }
      D = D.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  re(() => {
    const D = N.current;
    if (D && x && (x.text || s)) {
      const A = D.getBoundingClientRect();
      let p = !1,
        Z = x.left,
        U = x.top;
      A.right >= g.right && ((Z = g.width - A.width - 5), (p = !0)),
        A.bottom >= g.bottom &&
          ((U = x.top - (A.bottom - g.bottom + 2)), (p = !0)),
        p && q((de) => de && { ...de, left: Z, top: U });
    }
  }, [x, g, s]);
  const m = oe(null),
    W = 300,
    h = (D) => {
      clearTimeout(m.current),
        (m.current = setTimeout(() => {
          D();
        }, W));
    };
  function R(D) {
    let { id: A, tooltip: p, target: Z, at: U } = E(D.target);
    if ((q(null), I(null), !p))
      if (A) p = L(A);
      else {
        clearTimeout(m.current);
        return;
      }
    const de = D.clientX;
    h(() => {
      A && I(j(z(A)));
      const _ = Z.getBoundingClientRect(),
        ae = r.current,
        le = ae
          ? ae.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let T, a;
      U === 'left'
        ? ((T = _.top + 5 - le.top), (a = _.right + 5 - le.left))
        : ((T = _.top + _.height - le.top), (a = de - le.left)),
        o(le),
        q({ top: T, left: a, text: p });
    });
  }
  function j(D) {
    return n?.getTask(z(D)) || null;
  }
  function L(D) {
    return j(D)?.text || '';
  }
  function z(D) {
    const A = parseInt(D);
    return isNaN(A) ? D : A;
  }
  return /* @__PURE__ */ Ie('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: r,
    onMouseMove: R,
    children: [
      x && (x.text || s)
        ? /* @__PURE__ */ i('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: N,
            style: { top: `${x.top}px`, left: `${x.left}px` },
            children: s
              ? /* @__PURE__ */ i(s, { data: f })
              : x.text
                ? /* @__PURE__ */ i('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: x.text,
                  })
                : null,
          })
        : null,
      c,
    ],
  });
}
function hs({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ i(pt, { fonts: t, children: n() })
    : /* @__PURE__ */ i(pt, { fonts: t });
}
function ms({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ i(yt, { fonts: t, children: n })
    : /* @__PURE__ */ i(yt, { fonts: t });
}
function gs({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ i(kt, { fonts: t, children: n })
    : /* @__PURE__ */ i(kt, { fonts: t });
}
export {
  as as ContextMenu,
  us as Editor,
  cs as Gantt,
  ds as HeaderMenu,
  hs as Material,
  is as Toolbar,
  fs as Tooltip,
  ms as Willow,
  gs as WillowDark,
  ps as defaultColumns,
  ys as defaultEditorItems,
  ks as defaultMenuOptions,
  bs as defaultTaskTypes,
  vs as defaultToolbarButtons,
  Ts as getEditorItems,
  $s as getMenuOptions,
  Ms as getToolbarButtons,
  Es as registerEditorItem,
  Cs as registerScaleUnit,
};
//# sourceMappingURL=index.es.js.map
