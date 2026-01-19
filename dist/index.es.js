import { jsxs as me, jsx as c, Fragment as Pe } from 'react/jsx-runtime';
import {
  createContext as wt,
  useMemo as C,
  useState as ie,
  useContext as Te,
  useCallback as R,
  useRef as J,
  useEffect as Z,
  Fragment as pt,
  forwardRef as at,
  useImperativeHandle as dt,
} from 'react';
import {
  context as Ee,
  Button as Ze,
  Field as yt,
  Text as kt,
  Combo as bt,
  DatePicker as vt,
  TimePicker as Tt,
  Locale as Ct,
  RichSelect as $t,
  TwoState as Mt,
  Slider as Rt,
  Counter as Nt,
  Material as Je,
  Willow as et,
  WillowDark as tt,
} from '@svar-ui/react-core';
import {
  locate as Ne,
  locateID as He,
  locateAttr as Et,
  dateToString as Ke,
  locale as Be,
} from '@svar-ui/lib-dom';
import { en as je } from '@svar-ui/gantt-locales';
import { en as Ue } from '@svar-ui/core-locales';
import { EventBusRouter as St } from '@svar-ui/lib-state';
import {
  prepareEditTask as ut,
  grid as Lt,
  extendDragOptions as Dt,
  isSegmentMoveAllowed as At,
  DataStore as It,
  normalizeLinks as Ht,
  normalizeZoom as zt,
  defaultColumns as Gt,
  parseTaskDates as nt,
  defaultTaskTypes as Wt,
  getToolbarButtons as st,
  handleAction as ft,
  isHandledAction as ht,
  getMenuOptions as rt,
  getEditorItems as _t,
} from '@svar-ui/gantt-store';
import {
  defaultColumns as Vn,
  defaultEditorItems as Kn,
  defaultMenuOptions as Bn,
  defaultTaskTypes as jn,
  defaultToolbarButtons as Xn,
  getEditorItems as Yn,
  getMenuOptions as qn,
  getToolbarButtons as Qn,
  registerScaleUnit as Un,
} from '@svar-ui/gantt-store';
import {
  useWritableProp as qe,
  useStore as A,
  useStoreWithCounter as Qe,
  writable as Pt,
  useStoreLater as Se,
} from '@svar-ui/lib-react';
import { hotkeys as mt } from '@svar-ui/grid-store';
import { Grid as Ot, HeaderMenu as Ft } from '@svar-ui/react-grid';
import { flushSync as Vt } from 'react-dom';
import { Toolbar as ot } from '@svar-ui/react-toolbar';
import { ContextMenu as Kt } from '@svar-ui/react-menu';
import { Editor as Bt, registerEditorItem as Ge } from '@svar-ui/react-editor';
import { registerEditorItem as Jn } from '@svar-ui/react-editor';
const Le = wt(null);
function ze(t) {
  const n = t.getAttribute('data-id'),
    s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function jt(t, n, s) {
  const i = t.getBoundingClientRect(),
    r = n.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: i.top - r.top,
    left: i.left - r.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top,
  };
}
function lt(t) {
  return t && t.getAttribute('data-context-id');
}
const it = 5;
function Xt(t, n) {
  let s, i, r, a, g, $, h, x, f;
  function G(v) {
    (a = v.clientX),
      (g = v.clientY),
      ($ = {
        ...jt(s, t, v),
        y: n.getTask(r).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function D(v) {
    (s = Ne(v)),
      lt(s) &&
        ((r = ze(s)),
        (f = setTimeout(() => {
          (x = !0), n && n.touchStart && n.touchStart(), G(v.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', O),
        t.addEventListener('contextmenu', N),
        window.addEventListener('touchend', z));
  }
  function N(v) {
    if (x || f) return v.preventDefault(), !1;
  }
  function H(v) {
    v.which === 1 &&
      ((s = Ne(v)),
      lt(s) &&
        ((r = ze(s)),
        t.addEventListener('mousemove', W),
        window.addEventListener('mouseup', E),
        G(v)));
  }
  function d(v) {
    t.removeEventListener('mousemove', W),
      t.removeEventListener('touchmove', O),
      document.body.removeEventListener('mouseup', E),
      document.body.removeEventListener('touchend', z),
      (document.body.style.userSelect = ''),
      v &&
        (t.removeEventListener('mousedown', H),
        t.removeEventListener('touchstart', D));
  }
  function V(v) {
    const K = v.clientX - a,
      Y = v.clientY - g;
    if (!i) {
      if (
        (Math.abs(K) < it && Math.abs(Y) < it) ||
        (n && n.start && n.start({ id: r, e: v }) === !1)
      )
        return;
      (i = s.cloneNode(!0)),
        (i.style.pointerEvents = 'none'),
        i.classList.add('wx-reorder-task'),
        (i.style.position = 'absolute'),
        (i.style.left = $.left + 'px'),
        (i.style.top = $.top + 'px'),
        (s.style.visibility = 'hidden'),
        s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const M = Math.round(Math.max(0, $.top + Y));
      if (n && n.move && n.move({ id: r, top: M, detail: h }) === !1) return;
      const q = n.getTask(r),
        j = q.$y;
      if (!$.start && $.y == j) return S();
      ($.start = !0), ($.y = q.$y - 4), (i.style.top = M + 'px');
      const ee = document.elementFromPoint(v.clientX, v.clientY),
        y = Ne(ee);
      if (y && y !== s) {
        const k = ze(y),
          _ = y.getBoundingClientRect(),
          Q = _.top + _.height / 2,
          ne = v.clientY + $.db > Q && y.nextElementSibling !== s,
          u = v.clientY - $.dt < Q && y.previousElementSibling !== s;
        h?.after == k || h?.before == k
          ? (h = null)
          : ne
            ? (h = { id: r, after: k })
            : u && (h = { id: r, before: k });
      }
    }
  }
  function W(v) {
    V(v);
  }
  function O(v) {
    x
      ? (v.preventDefault(), V(v.touches[0]))
      : f && (clearTimeout(f), (f = null));
  }
  function z() {
    (x = null), f && (clearTimeout(f), (f = null)), S();
  }
  function E() {
    S();
  }
  function S() {
    s && (s.style.visibility = ''),
      i &&
        (i.parentNode.removeChild(i),
        n && n.end && n.end({ id: r, top: $.top })),
      (r = s = i = $ = h = null),
      d();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', H),
    t.addEventListener('touchstart', D),
    {
      destroy() {
        d(!0);
      },
    }
  );
}
function Yt({ row: t, column: n }) {
  function s(r, a) {
    return {
      justifyContent: a.align,
      paddingLeft: `${(r.$level - 1) * 20}px`,
    };
  }
  const i = n && n._cell;
  return /* @__PURE__ */ me('div', {
    className: 'wx-pqc08MHU wx-content',
    style: s(t, n),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ c('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ c('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ c('div', {
        className: 'wx-pqc08MHU wx-text',
        children: i ? /* @__PURE__ */ c(i, { row: t, column: n }) : t.text,
      }),
    ],
  });
}
function ct({ column: t, cell: n }) {
  const s = C(() => t.id, [t?.id]);
  return n || t.id == 'add-task'
    ? /* @__PURE__ */ c('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ c('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': s,
        }),
      })
    : null;
}
function qt(t) {
  const {
      readonly: n,
      compactMode: s,
      width: i = 0,
      display: r = 'all',
      columnWidth: a = 0,
      onTableAPIChange: g,
      multiTaskRows: $ = !1,
      rowMapping: h = null,
    } = t,
    [x, f] = qe(a),
    [G, D] = ie(),
    N = Te(Ee.i18n),
    H = C(() => N.getGroup('gantt'), [N]),
    d = Te(Le),
    V = A(d, 'scrollTop'),
    W = A(d, 'cellHeight'),
    O = A(d, '_scrollTask'),
    z = A(d, '_selected'),
    E = A(d, 'area'),
    S = A(d, '_tasks'),
    v = A(d, '_scales'),
    K = A(d, 'columns'),
    Y = A(d, '_sort'),
    M = A(d, 'calendar'),
    q = A(d, 'durationUnit'),
    j = A(d, 'splitTasks'),
    [ee, y] = ie(null),
    k = C(() => (!S || !E ? [] : S.slice(E.start, E.end)), [S, E]),
    _ = R(
      (l, w) => {
        if (w === 'add-task')
          d.exec(w, {
            target: l,
            task: { text: H('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (w === 'open-task') {
          const e = k.find((o) => o.id === l);
          (e?.data || e?.lazy) && d.exec(w, { id: l, mode: !e.open });
        }
      },
      [k],
    ),
    Q = R(
      (l) => {
        const w = He(l),
          e = l.target.dataset.action;
        e && l.preventDefault(),
          w
            ? e === 'add-task' || e === 'open-task'
              ? _(w, e)
              : d.exec('select-task', {
                  id: w,
                  toggle: l.ctrlKey || l.metaKey,
                  range: l.shiftKey,
                  show: !0,
                })
            : e === 'add-task' && _(null, e);
      },
      [d, _],
    ),
    ne = J(null),
    u = J(null),
    [T, I] = ie(0),
    [U, de] = ie(!1);
  Z(() => {
    const l = u.current;
    if (!l || typeof ResizeObserver > 'u') return;
    const w = () => I(l.clientWidth);
    w();
    const e = new ResizeObserver(w);
    return e.observe(l), () => e.disconnect();
  }, []);
  const re = J(null),
    ae = R(
      (l) => {
        const w = l.id,
          { before: e, after: o } = l,
          b = l.onMove;
        let p = e || o,
          F = e ? 'before' : 'after';
        if (b) {
          if (F === 'after') {
            const le = d.getTask(p);
            le.data?.length && le.open && ((F = 'before'), (p = le.data[0].id));
          }
          re.current = { id: w, [F]: p };
        } else re.current = null;
        d.exec('move-task', {
          id: w,
          mode: F,
          target: p,
          inProgress: b,
        });
      },
      [d],
    ),
    oe = C(() => E?.from ?? 0, [E]),
    ke = C(() => v?.height ?? 0, [v]),
    he = C(
      () => (!s && r !== 'grid' ? (x ?? 0) > (i ?? 0) : (x ?? 0) > (T ?? 0)),
      [s, r, x, i, T],
    ),
    L = C(() => {
      const l = {};
      return (
        (he && r === 'all') || (r === 'grid' && he)
          ? (l.width = x)
          : r === 'grid' && (l.width = '100%'),
        l
      );
    }, [he, r, x]),
    te = C(
      () => (ee && !k.find((l) => l.id === ee.id) ? [...k, ee] : k),
      [k, ee],
    ),
    ue = C(() => {
      if (!$ || !h) return te;
      const l = /* @__PURE__ */ new Map(),
        w = /* @__PURE__ */ new Set();
      return (
        te.forEach((e) => {
          const o = h.taskRows.get(e.id) ?? e.id;
          w.has(o) ||
            (l.set(o, {
              ...e,
              $rowTasks: h.rowMap.get(o) || [e.id],
            }),
            w.add(o));
        }),
        Array.from(l.values())
      );
    }, [te, $, h]),
    ce = C(() => {
      let l = (K || []).map((o) => {
        o = { ...o };
        const b = o.header;
        if (typeof b == 'object') {
          const p = b.text && H(b.text);
          o.header = { ...b, text: p };
        } else o.header = H(b);
        return o;
      });
      const w = l.findIndex((o) => o.id === 'text'),
        e = l.findIndex((o) => o.id === 'add-task');
      if (
        (w !== -1 && (l[w].cell && (l[w]._cell = l[w].cell), (l[w].cell = Yt)),
        e !== -1)
      ) {
        l[e].cell = l[e].cell || ct;
        const o = l[e].header;
        if (
          (typeof o != 'object' && (l[e].header = { text: o }),
          (l[e].header.cell = o.cell || ct),
          n)
        )
          l.splice(e, 1);
        else if (s) {
          const [b] = l.splice(e, 1);
          l.unshift(b);
        }
      }
      return l.length > 0 && (l[l.length - 1].resize = !1), l;
    }, [K, H, n, s]),
    ye = C(
      () =>
        r === 'all'
          ? `${i}px`
          : r === 'grid'
            ? 'calc(100% - 4px)'
            : ce.find((l) => l.id === 'add-task')
              ? '50px'
              : '0',
      [r, i, ce],
    ),
    xe = C(() => {
      if (ue && Y?.length) {
        const l = {};
        return (
          Y.forEach(({ key: w, order: e }, o) => {
            l[w] = {
              order: e,
              ...(Y.length > 1 && { index: o }),
            };
          }),
          l
        );
      }
      return {};
    }, [ue, Y]),
    be = R(() => ce.some((l) => l.flexgrow && !l.hidden), []),
    Ce = C(() => be(), [be, U]),
    se = C(() => {
      let l = r === 'chart' ? ce.filter((e) => e.id === 'add-task') : ce;
      const w = r === 'all' ? i : T;
      if (!Ce) {
        let e = x,
          o = !1;
        if (ce.some((b) => b.$width)) {
          let b = 0;
          (e = ce.reduce(
            (p, F) => (
              F.hidden || ((b += F.width), (p += F.$width || F.width)), p
            ),
            0,
          )),
            b > e && e > w && (o = !0);
        }
        if (o || e < w) {
          let b = 1;
          return (
            o || (b = (w - 50) / (e - 50 || 1)),
            l.map(
              (p) => (
                p.id !== 'add-task' &&
                  !p.hidden &&
                  (p.$width || (p.$width = p.width), (p.width = p.$width * b)),
                p
              ),
            )
          );
        }
      }
      return l;
    }, [r, ce, Ce, x, i, T]),
    fe = R(
      (l) => {
        if (!be()) {
          const w = se.reduce(
            (e, o) => (
              l && o.$width && (o.$width = o.width),
              e + (o.hidden ? 0 : o.width)
            ),
            0,
          );
          w !== x && f(w);
        }
        de(!0), de(!1);
      },
      [be, se, x, f],
    ),
    m = R(() => {
      ce.filter((w) => w.flexgrow && !w.hidden).length === 1 &&
        ce.forEach((w) => {
          w.$width && !w.flexgrow && !w.hidden && (w.width = w.$width);
        });
    }, []),
    X = R(
      (l) => {
        if (!n) {
          const w = He(l),
            e = Et(l, 'data-col-id');
          !(e && ce.find((b) => b.id == e))?.editor &&
            w &&
            d.exec('show-editor', { id: w });
        }
      },
      [d, n],
      // cols is defined later; relies on latest value at call time
    ),
    B = C(() => (Array.isArray(z) ? z.map((l) => l.id) : []), [z]),
    P = R(() => {
      if (ne.current && ue !== null) {
        const l = ne.current.querySelector('.wx-body');
        l && (l.style.top = -((V ?? 0) - (oe ?? 0)) + 'px');
      }
      u.current && (u.current.scrollTop = 0);
    }, [ue, V, oe]);
  Z(() => {
    ne.current && P();
  }, [V, oe, P]),
    Z(() => {
      const l = ne.current;
      if (!l) return;
      const w = l.querySelector('.wx-table-box .wx-body');
      if (!w || typeof ResizeObserver > 'u') return;
      const e = new ResizeObserver(() => {
        P();
      });
      return (
        e.observe(w),
        () => {
          e.disconnect();
        }
      );
    }, [se, L, r, ye, ue, P]),
    Z(() => {
      if (!O || !G) return;
      const { id: l } = O,
        w = G.getState().focusCell;
      w &&
        w.row !== l &&
        ne.current &&
        ne.current.contains(document.activeElement) &&
        G.exec('focus-cell', {
          row: l,
          column: w.column,
        });
    }, [O, G]);
  const ge = R(
      ({ id: l }) => {
        if (n) return !1;
        d.getTask(l).open && d.exec('open-task', { id: l, mode: !1 });
        const w = d.getState()._tasks.find((e) => e.id === l);
        if ((y(w || null), !w)) return !1;
      },
      [d, n],
    ),
    Re = R(
      ({ id: l, top: w }) => {
        re.current
          ? ae({ ...re.current, onMove: !1 })
          : d.exec('drag-task', {
              id: l,
              top: w + (oe ?? 0),
              inProgress: !1,
            }),
          y(null);
      },
      [d, ae, oe],
    ),
    We = R(
      ({ id: l, top: w, detail: e }) => {
        e && ae({ ...e, onMove: !0 }),
          d.exec('drag-task', {
            id: l,
            top: w + (oe ?? 0),
            inProgress: !0,
          });
      },
      [d, ae, oe],
    );
  Z(() => {
    const l = ne.current;
    return l
      ? Xt(l, {
          start: ge,
          end: Re,
          move: We,
          getTask: d.getTask,
        }).destroy
      : void 0;
  }, [d, ge, Re, We]);
  const Ae = R(
      (l) => {
        const { key: w, isInput: e } = l;
        if (!e && (w === 'arrowup' || w === 'arrowdown'))
          return (l.eventSource = 'grid'), d.exec('hotkey', l), !1;
        if (w === 'enter') {
          const o = G?.getState().focusCell;
          if (o) {
            const { row: b, column: p } = o;
            p === 'add-task'
              ? _(b, 'add-task')
              : p === 'text' && _(b, 'open-task');
          }
        }
      },
      [d, _, G],
    ),
    ve = J(null),
    _e = () => {
      ve.current = {
        setTableAPI: D,
        handleHotkey: Ae,
        sortVal: Y,
        api: d,
        adjustColumns: m,
        setColumnWidth: fe,
        tasks: k,
        calendarVal: M,
        durationUnitVal: q,
        splitTasksVal: j,
        onTableAPIChange: g,
      };
    };
  _e(),
    Z(() => {
      _e();
    }, [D, Ae, Y, d, m, fe, k, M, q, j, g]);
  const Oe = R((l) => {
    D(l),
      l.intercept('hotkey', (w) => ve.current.handleHotkey(w)),
      l.intercept('scroll', () => !1),
      l.intercept('select-row', () => !1),
      l.intercept('sort-rows', (w) => {
        const e = ve.current.sortVal,
          { key: o, add: b } = w,
          p = e ? e.find((le) => le.key === o) : null;
        let F = 'asc';
        return (
          p && (F = !p || p.order === 'asc' ? 'desc' : 'asc'),
          d.exec('sort-tasks', {
            key: o,
            order: F,
            add: b,
          }),
          !1
        );
      }),
      l.on('resize-column', () => {
        ve.current.setColumnWidth(!0);
      }),
      l.on('hide-column', (w) => {
        w.mode || ve.current.adjustColumns(), ve.current.setColumnWidth();
      }),
      l.intercept('update-cell', (w) => {
        const { id: e, column: o, value: b } = w,
          p = ve.current.tasks.find((F) => F.id === e);
        if (p) {
          const F = { ...p };
          let le = b;
          le && !isNaN(le) && !(le instanceof Date) && (le *= 1),
            (F[o] = le),
            ut(
              F,
              {
                calendar: ve.current.calendarVal,
                durationUnit: ve.current.durationUnitVal,
                splitTasks: ve.current.splitTasksVal,
              },
              o,
            ),
            d.exec('update-task', {
              id: e,
              task: F,
            });
        }
        return !1;
      }),
      g && g(l);
  }, []);
  return /* @__PURE__ */ c('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${ye}` },
    ref: u,
    children: /* @__PURE__ */ c('div', {
      ref: ne,
      style: L,
      className: 'wx-rHj6070p wx-table',
      onClick: Q,
      onDoubleClick: X,
      children: /* @__PURE__ */ c(Ot, {
        init: Oe,
        sizes: {
          rowHeight: W,
          headerHeight: (ke ?? 0) - 1,
        },
        rowStyle: (l) =>
          l.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (l) =>
          `wx-rHj6070p wx-text-${l.align}${l.id === 'add-task' ? ' wx-action' : ''}`,
        data: ue,
        columns: se,
        selectedRows: [...B],
        sortMarks: xe,
      }),
    }),
  });
}
function Qt({ borders: t = '' }) {
  const n = Te(Le),
    s = A(n, 'cellWidth'),
    i = A(n, 'cellHeight'),
    r = J(null),
    [a, g] = ie('#e4e4e4');
  Z(() => {
    if (typeof getComputedStyle < 'u' && r.current) {
      const h = getComputedStyle(r.current).getPropertyValue(
        '--wx-gantt-border',
      );
      g(h ? h.substring(h.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const $ = {
    width: '100%',
    height: '100%',
    background: s != null && i != null ? `url(${Lt(s, i, a, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ c('div', { ref: r, style: $ });
}
function Ut({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = Te(Le),
    r = A(i, '_links'),
    a = A(i, 'criticalPath'),
    g = J(null),
    $ = R(
      (h) => {
        const x = h?.target?.classList;
        !x?.contains('wx-line') && !x?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    Z(() => {
      if (!s && n && g.current) {
        const h = (x) => {
          g.current && !g.current.contains(x.target) && $(x);
        };
        return (
          document.addEventListener('click', h),
          () => {
            document.removeEventListener('click', h);
          }
        );
      }
    }, [s, n, $]),
    /* @__PURE__ */ me('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (r || []).map((h) => {
          const x =
            'wx-dkx3NwEn wx-line' +
            (a && h.$critical ? ' wx-critical' : '') +
            (s ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ c(
            'polyline',
            {
              className: x,
              points: h.$p,
              onClick: () => !s && t(h.id),
              'data-link-id': h.id,
            },
            h.id,
          );
        }),
        !s &&
          n &&
          /* @__PURE__ */ c('polyline', {
            ref: g,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: n.$p,
          }),
      ],
    })
  );
}
function Zt(t) {
  const { task: n, type: s } = t;
  function i(a) {
    const g = n.segments[a];
    return {
      left: `${g.$x}px`,
      top: '0px',
      width: `${g.$w}px`,
      height: '100%',
    };
  }
  function r(a) {
    if (!n.progress) return 0;
    const g = (n.duration * n.progress) / 100,
      $ = n.segments;
    let h = 0,
      x = 0,
      f = null;
    do {
      const G = $[x];
      x === a &&
        (h > g ? (f = 0) : (f = Math.min((g - h) / G.duration, 1) * 100)),
        (h += G.duration),
        x++;
    } while (f === null && x < $.length);
    return f || 0;
  }
  return /* @__PURE__ */ c('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: n.segments.map((a, g) =>
      /* @__PURE__ */ me(
        'div',
        {
          className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
          'data-segment': g,
          style: i(g),
          children: [
            n.progress
              ? /* @__PURE__ */ c('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ c('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${r(g)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ c('div', {
              className: 'wx-content',
              children: a.text || '',
            }),
          ],
        },
        g,
      ),
    ),
  });
}
function Jt(t) {
  const {
      readonly: n,
      taskTemplate: s,
      multiTaskRows: i = !1,
      rowMapping: r = null,
    } = t,
    a = Te(Le),
    [g, $] = Qe(a, '_tasks'),
    [h, x] = Qe(a, '_links'),
    f = A(a, 'area'),
    G = A(a, '_scales'),
    D = A(a, 'taskTypes'),
    N = A(a, 'baselines'),
    H = A(a, '_selected'),
    d = A(a, '_scrollTask'),
    V = A(a, 'criticalPath'),
    W = A(a, 'tasks'),
    O = A(a, 'schedule'),
    z = A(a, 'splitTasks'),
    E = C(() => {
      if (!f || !Array.isArray(g)) return [];
      const e = f.start ?? 0,
        o = f.end ?? 0;
      return g.slice(e, o).map((b) => ({ ...b }));
    }, [$, f]),
    S = A(a, 'cellHeight'),
    v = C(() => {
      if (!i || !r || !E.length) return E;
      const e = /* @__PURE__ */ new Map(),
        o = [];
      return (
        g.forEach((b) => {
          const p = r.taskRows.get(b.id) ?? b.id;
          e.has(p) || (e.set(p, o.length), o.push(p));
        }),
        E.map((b) => {
          const p = r.taskRows.get(b.id) ?? b.id,
            F = e.get(p) ?? 0;
          return {
            ...b,
            $y: F * S,
            $y_base: b.$y_base !== void 0 ? F * S : void 0,
          };
        })
      );
    }, [E, i, r, g, S]),
    K = C(() => G.lengthUnitWidth, [G]),
    Y = J(!1),
    [M, q] = ie(void 0),
    [j, ee] = ie(null),
    y = J(null),
    [k, _] = ie(null),
    [Q, ne] = ie(void 0),
    u = J(null),
    [T, I] = ie(0),
    U = J(null),
    de = C(() => {
      const e = U.current;
      return !!(H.length && e && e.contains(document.activeElement));
    }, [H, U.current]),
    re = C(() => de && H[H.length - 1]?.id, [de, H]);
  Z(() => {
    if (d && de && d) {
      const { id: e } = d,
        o = U.current?.querySelector(`.wx-bar[data-id='${e}']`);
      o && o.focus({ preventScroll: !0 });
    }
  }, [d]),
    Z(() => {
      const e = U.current;
      if (e && (I(e.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const o = new ResizeObserver((b) => {
          b[0] && I(b[0].contentRect.width);
        });
        return o.observe(e), () => o.disconnect();
      }
    }, [U.current]);
  const ae = R(() => {
      document.body.style.userSelect = 'none';
    }, []),
    oe = R(() => {
      document.body.style.userSelect = '';
    }, []),
    ke = R(
      (e, o, b) => {
        if (
          o.target.classList.contains('wx-line') ||
          (b || (b = a.getTask(ze(e))),
          b.type === 'milestone' || b.type === 'summary')
        )
          return '';
        const p = Ne(o, 'data-segment');
        p && (e = p);
        const { left: F, width: le } = e.getBoundingClientRect(),
          we = (o.clientX - F) / le;
        let pe = 0.2 / (le > 200 ? le / 200 : 1);
        return we < pe ? 'start' : we > 1 - pe ? 'end' : '';
      },
      [a],
    ),
    he = R(
      (e, o) => {
        const { clientX: b } = o,
          p = ze(e),
          F = a.getTask(p),
          le = o.target.classList;
        if (!o.target.closest('.wx-delete-button') && !n) {
          if (le.contains('wx-progress-marker')) {
            const { progress: we } = a.getTask(p);
            (y.current = {
              id: p,
              x: b,
              progress: we,
              dx: 0,
              node: e,
              marker: o.target,
            }),
              o.target.classList.add('wx-progress-in-drag');
          } else {
            const we = ke(e, o, F) || 'move',
              pe = {
                id: p,
                mode: we,
                x: b,
                dx: 0,
                l: F.$x,
                w: F.$w,
              };
            if (z && F.segments?.length) {
              const Me = Ne(o, 'data-segment');
              Me && ((pe.segmentIndex = Me.dataset.segment * 1), Dt(F, pe));
            }
            ee(pe);
          }
          ae();
        }
      },
      [a, n, ke, ae, z],
    ),
    L = R(
      (e) => {
        if (e.button !== 0) return;
        const o = Ne(e);
        o && he(o, e);
      },
      [he],
    ),
    te = R(
      (e) => {
        const o = Ne(e);
        o &&
          (u.current = setTimeout(() => {
            ne(!0), he(o, e.touches[0]);
          }, 300));
      },
      [he],
    ),
    ue = R(
      (e) => {
        _(e && { ...h.find((o) => o.id === e) });
      },
      [h],
    ),
    ce = R(() => {
      if (y.current) {
        const { dx: e, id: o, marker: b, value: p } = y.current;
        (y.current = null),
          typeof p < 'u' &&
            e &&
            a.exec('update-task', {
              id: o,
              task: { progress: p },
              inProgress: !1,
            }),
          b.classList.remove('wx-progress-in-drag'),
          (Y.current = !0),
          oe();
      } else if (j) {
        const {
          id: e,
          mode: o,
          dx: b,
          l: p,
          w: F,
          start: le,
          segment: we,
          index: pe,
        } = j;
        if ((ee(null), le)) {
          const Me = Math.round(b / K);
          if (!Me)
            a.exec('drag-task', {
              id: e,
              width: F,
              left: p,
              inProgress: !1,
              ...(we && { segmentIndex: pe }),
            });
          else {
            let Ie = {},
              De = a.getTask(e);
            we && (De = De.segments[pe]),
              o === 'move'
                ? ((Ie.start = De.start), (Ie.end = De.end))
                : (Ie[o] = De[o]),
              a.exec('update-task', {
                id: e,
                diff: Me,
                task: Ie,
                ...(we && { segmentIndex: pe }),
              });
          }
          Y.current = !0;
        }
        oe();
      }
    }, [a, oe, j, K]),
    ye = R(
      (e, o) => {
        const { clientX: b } = o;
        if (!n)
          if (y.current) {
            const { node: p, x: F, id: le } = y.current,
              we = (y.current.dx = b - F),
              pe = Math.round((we / p.offsetWidth) * 100);
            let Me = y.current.progress + pe;
            (y.current.value = Me = Math.min(Math.max(0, Me), 100)),
              a.exec('update-task', {
                id: le,
                task: { progress: Me },
                inProgress: !0,
              });
          } else if (j) {
            ue(null);
            const {
                mode: p,
                l: F,
                w: le,
                x: we,
                id: pe,
                start: Me,
                segment: Ie,
                index: De,
              } = j,
              Xe = a.getTask(pe),
              $e = b - we;
            if (
              (!Me && Math.abs($e) < 20) ||
              (p === 'start' && le - $e < K) ||
              (p === 'end' && le + $e < K) ||
              (p === 'move' &&
                (($e < 0 && F + $e < 0) || ($e > 0 && F + le + $e > T))) ||
              (j.segment && !At(Xe, j))
            )
              return;
            const Ye = { ...j, dx: $e };
            let Fe, Ve;
            if (
              (p === 'start'
                ? ((Fe = F + $e), (Ve = le - $e))
                : p === 'end'
                  ? ((Fe = F), (Ve = le + $e))
                  : p === 'move' && ((Fe = F + $e), (Ve = le)),
              a.exec('drag-task', {
                id: pe,
                width: Ve,
                left: Fe,
                inProgress: !0,
                ...(Ie && { segmentIndex: De }),
              }),
              !Ye.start &&
                ((p === 'move' && Xe.$x == F) || (p !== 'move' && Xe.$w == le)))
            ) {
              (Y.current = !0), ce();
              return;
            }
            (Ye.start = !0), ee(Ye);
          } else {
            const p = Ne(e);
            if (p) {
              const F = a.getTask(ze(p)),
                we = Ne(e, 'data-segment') || p,
                pe = ke(we, o, F);
              we.style.cursor = pe && !n ? 'col-resize' : 'pointer';
            }
          }
      },
      [a, n, j, K, T, ke, ue, ce],
    ),
    xe = R(
      (e) => {
        ye(e, e);
      },
      [ye],
    ),
    be = R(
      (e) => {
        Q
          ? (e.preventDefault(), ye(e, e.touches[0]))
          : u.current && (clearTimeout(u.current), (u.current = null));
      },
      [Q, ye],
    ),
    Ce = R(() => {
      ce();
    }, [ce]),
    se = R(() => {
      ne(null),
        u.current && (clearTimeout(u.current), (u.current = null)),
        ce();
    }, [ce]);
  Z(
    () => (
      window.addEventListener('mouseup', Ce),
      () => {
        window.removeEventListener('mouseup', Ce);
      }
    ),
    [Ce],
  );
  const fe = R(
      (e) => {
        if (!n) {
          const o = He(e.target);
          if (o && !e.target.classList.contains('wx-link')) {
            const b = He(e.target, 'data-segment');
            a.exec('show-editor', {
              id: o,
              ...(b !== null && { segmentIndex: b }),
            });
          }
        }
      },
      [a, n],
    ),
    m = ['e2s', 's2s', 'e2e', 's2e'],
    X = R((e, o) => m[(e ? 1 : 0) + (o ? 0 : 2)], []),
    B = R(
      (e, o) => {
        const b = M.id,
          p = M.start;
        return e === b
          ? !0
          : !!h.find(
              (F) => F.target == e && F.source == b && F.type === X(p, o),
            );
      },
      [M, x, X],
    ),
    P = R(() => {
      M && q(null);
    }, [M]),
    ge = R(
      (e) => {
        if (Y.current) {
          Y.current = !1;
          return;
        }
        const o = He(e.target);
        if (o) {
          const b = e.target.classList;
          if (b.contains('wx-link')) {
            const p = b.contains('wx-left');
            if (!M) {
              q({ id: o, start: p });
              return;
            }
            M.id !== o &&
              !B(o, p) &&
              a.exec('add-link', {
                link: {
                  source: M.id,
                  target: o,
                  type: X(M.start, p),
                },
              });
          } else if (b.contains('wx-delete-button-icon'))
            a.exec('delete-link', { id: k.id }), _(null);
          else {
            let p;
            const F = Ne(e, 'data-segment');
            F && (p = F.dataset.segment * 1),
              a.exec('select-task', {
                id: o,
                toggle: e.ctrlKey || e.metaKey,
                range: e.shiftKey,
                segmentIndex: p,
              });
          }
        }
        P();
      },
      [a, M, x, k, B, X, P],
    ),
    Re = R(
      (e) => ({
        left: `${e.$x}px`,
        top: `${e.$y}px`,
        width: `${e.$w}px`,
        height: `${e.$h}px`,
      }),
      [],
    ),
    We = R(
      (e) => ({
        left: `${e.$x_base}px`,
        top: `${e.$y_base}px`,
        width: `${e.$w_base}px`,
        height: `${e.$h_base}px`,
      }),
      [],
    ),
    Ae = R(
      (e) => {
        if (Q || u.current) return e.preventDefault(), !1;
      },
      [Q],
    ),
    ve = C(() => D.map((e) => e.id), [D]),
    _e = R(
      (e) => {
        let o = ve.includes(e) ? e : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(e) || (o = `task ${o}`), o
        );
      },
      [ve],
    ),
    Oe = R(
      (e) => {
        a.exec(e.action, e.data);
      },
      [a],
    ),
    l = R((e) => V && W.byId(e).$critical, [V, W]),
    w = R(
      (e) => {
        if (O?.auto) {
          const o = W.getSummaryId(e, !0),
            b = W.getSummaryId(M.id, !0);
          return (
            M?.id &&
            !(Array.isArray(o) ? o : [o]).includes(M.id) &&
            !(Array.isArray(b) ? b : [b]).includes(e)
          );
        }
        return M;
      },
      [O, W, M],
    );
  return /* @__PURE__ */ me('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${v.length ? v[0].$h : 0}px` },
    ref: U,
    onContextMenu: Ae,
    onMouseDown: L,
    onMouseMove: xe,
    onTouchStart: te,
    onTouchMove: be,
    onTouchEnd: se,
    onClick: ge,
    onDoubleClick: fe,
    onDragStart: (e) => (e.preventDefault(), !1),
    children: [
      /* @__PURE__ */ c(Ut, {
        onSelectLink: ue,
        selectedLink: k,
        readonly: n,
      }),
      v.map((e) => {
        if (e.$skip && e.$skip_baseline) return null;
        const o =
            `wx-bar wx-${_e(e.type)}` +
            (Q && j && e.id === j.id ? ' wx-touch' : '') +
            (M && M.id === e.id ? ' wx-selected' : '') +
            (l(e.id) ? ' wx-critical' : '') +
            (e.$reorder ? ' wx-reorder-task' : '') +
            (z && e.segments ? ' wx-split' : ''),
          b =
            'wx-link wx-left' +
            (M ? ' wx-visible' : '') +
            (!M || (!B(e.id, !0) && w(e.id)) ? ' wx-target' : '') +
            (M && M.id === e.id && M.start ? ' wx-selected' : '') +
            (l(e.id) ? ' wx-critical' : ''),
          p =
            'wx-link wx-right' +
            (M ? ' wx-visible' : '') +
            (!M || (!B(e.id, !1) && w(e.id)) ? ' wx-target' : '') +
            (M && M.id === e.id && !M.start ? ' wx-selected' : '') +
            (l(e.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ me(
          pt,
          {
            children: [
              !e.$skip &&
                /* @__PURE__ */ me('div', {
                  className: 'wx-GKbcLEGA ' + o,
                  style: Re(e),
                  'data-tooltip-id': e.id,
                  'data-id': e.id,
                  tabIndex: re === e.id ? 0 : -1,
                  children: [
                    n
                      ? null
                      : e.id === k?.target && k?.type[2] === 's'
                        ? /* @__PURE__ */ c(Ze, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ c('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ c('div', {
                            className: 'wx-GKbcLEGA ' + b,
                            children: /* @__PURE__ */ c('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    e.type !== 'milestone'
                      ? /* @__PURE__ */ me(Pe, {
                          children: [
                            e.progress && !(z && e.segments)
                              ? /* @__PURE__ */ c('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ c('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${e.progress}%` },
                                  }),
                                })
                              : null,
                            !n && !(z && e.segments)
                              ? /* @__PURE__ */ c('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${e.progress}% - 10px)`,
                                  },
                                  children: e.progress,
                                })
                              : null,
                            s
                              ? /* @__PURE__ */ c(s, {
                                  data: e,
                                  api: a,
                                  onAction: Oe,
                                })
                              : z && e.segments
                                ? /* @__PURE__ */ c(Zt, {
                                    task: e,
                                    type: _e(e.type),
                                  })
                                : /* @__PURE__ */ c('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: e.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ me(Pe, {
                          children: [
                            /* @__PURE__ */ c('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            s
                              ? /* @__PURE__ */ c(s, {
                                  data: e,
                                  api: a,
                                  onAction: Oe,
                                })
                              : /* @__PURE__ */ c('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: e.text,
                                }),
                          ],
                        }),
                    n
                      ? null
                      : e.id === k?.target && k?.type[2] === 'e'
                        ? /* @__PURE__ */ c(Ze, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ c('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ c('div', {
                            className: 'wx-GKbcLEGA ' + p,
                            children: /* @__PURE__ */ c('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                  ],
                }),
              N && !e.$skip_baseline
                ? /* @__PURE__ */ c('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (e.type === 'milestone' ? ' wx-milestone' : ''),
                    style: We(e),
                  })
                : null,
            ],
          },
          e.id,
        );
      }),
    ],
  });
}
function en(t) {
  const { highlightTime: n } = t,
    s = Te(Le),
    i = A(s, '_scales');
  return /* @__PURE__ */ c('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: i.width },
    children: (i?.rows || []).map((r, a) =>
      /* @__PURE__ */ c(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${r.height}px` },
          children: (r.cells || []).map((g, $) => {
            const h = n ? n(g.date, g.unit) : '',
              x = 'wx-cell ' + (g.css || '') + ' ' + (h || '');
            return /* @__PURE__ */ c(
              'div',
              {
                className: 'wx-ZkvhDKir ' + x,
                style: { width: `${g.width}px` },
                children: g.value,
              },
              $,
            );
          }),
        },
        a,
      ),
    ),
  });
}
const tn = /* @__PURE__ */ new Map();
function nn(t) {
  const n = J(null),
    s = J(0),
    i = J(null),
    r = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()),
    s.current++,
    Z(() => {
      if (r)
        return (
          cancelAnimationFrame(i.current),
          (i.current = requestAnimationFrame(() => {
            const a = {
              label: t,
              time: performance.now() - n.current,
              renders: s.current,
              timestamp: Date.now(),
            };
            tn.set(t, a),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: a }),
              );
          })),
          () => cancelAnimationFrame(i.current)
        );
    });
}
function sn(t) {
  const {
      readonly: n,
      fullWidth: s,
      fullHeight: i,
      taskTemplate: r,
      cellBorders: a,
      highlightTime: g,
      multiTaskRows: $ = !1,
      rowMapping: h = null,
    } = t,
    x = Te(Le),
    [f, G] = Qe(x, '_selected'),
    D = A(x, 'scrollTop'),
    N = A(x, 'cellHeight'),
    H = A(x, 'cellWidth'),
    d = A(x, '_scales'),
    V = A(x, '_markers'),
    W = A(x, '_scrollTask'),
    O = A(x, 'zoom'),
    [z, E] = ie(),
    S = J(null),
    v = 1 + (d?.rows?.length || 0),
    K = C(() => {
      const u = [];
      return (
        f &&
          f.length &&
          N &&
          f.forEach((T) => {
            u.push({ height: `${N}px`, top: `${T.$y - 3}px` });
          }),
        u
      );
    }, [G, N]),
    Y = C(() => Math.max(z || 0, i), [z, i]);
  Z(() => {
    const u = S.current;
    u && typeof D == 'number' && (u.scrollTop = D);
  }, [D]);
  const M = () => {
    q();
  };
  function q(u) {
    const T = S.current;
    if (!T) return;
    const I = {};
    (I.left = T.scrollLeft), x.exec('scroll-chart', I);
  }
  function j() {
    const u = S.current,
      I = Math.ceil((z || 0) / (N || 1)) + 1,
      U = Math.floor(((u && u.scrollTop) || 0) / (N || 1)),
      de = Math.max(0, U - v),
      re = U + I + v,
      ae = de * (N || 0);
    x.exec('render-data', {
      start: de,
      end: re,
      from: ae,
    });
  }
  Z(() => {
    j();
  }, [z, D]);
  const ee = R(
    (u) => {
      if (!u) return;
      const { id: T, mode: I } = u;
      if (I.toString().indexOf('x') < 0) return;
      const U = S.current;
      if (!U) return;
      const { clientWidth: de } = U,
        re = x.getTask(T);
      if (re.$x + re.$w < U.scrollLeft)
        x.exec('scroll-chart', { left: re.$x - (H || 0) }),
          (U.scrollLeft = re.$x - (H || 0));
      else if (re.$x >= de + U.scrollLeft) {
        const ae = de < re.$w ? H || 0 : re.$w;
        x.exec('scroll-chart', { left: re.$x - de + ae }),
          (U.scrollLeft = re.$x - de + ae);
      }
    },
    [x, H],
  );
  Z(() => {
    ee(W);
  }, [W]);
  function y(u) {
    if (O && (u.ctrlKey || u.metaKey)) {
      u.preventDefault();
      const T = S.current,
        I = -Math.sign(u.deltaY),
        U = u.clientX - (T ? T.getBoundingClientRect().left : 0);
      x.exec('zoom-scale', {
        dir: I,
        offset: U,
      });
    }
  }
  function k(u) {
    const T = g(u.date, u.unit);
    return T
      ? {
          css: T,
          width: u.width,
        }
      : null;
  }
  const _ = C(
      () =>
        d && (d.minUnit === 'hour' || d.minUnit === 'day') && g
          ? d.rows[d.rows.length - 1].cells.map(k)
          : null,
      [d, g],
    ),
    Q = R(
      (u) => {
        (u.eventSource = 'chart'), x.exec('hotkey', u);
      },
      [x],
    );
  Z(() => {
    const u = S.current;
    if (!u) return;
    const T = () => E(u.clientHeight);
    T();
    const I = new ResizeObserver(() => T());
    return (
      I.observe(u),
      () => {
        I.disconnect();
      }
    );
  }, [S.current]);
  const ne = J(null);
  return (
    Z(() => {
      const u = S.current;
      if (u && !ne.current)
        return (
          (ne.current = mt(u, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (T) => Q(T),
          })),
          () => {
            ne.current?.destroy(), (ne.current = null);
          }
        );
    }, []),
    Z(() => {
      const u = S.current;
      if (!u) return;
      const T = y;
      return (
        u.addEventListener('wheel', T),
        () => {
          u.removeEventListener('wheel', T);
        }
      );
    }, [y]),
    nn('chart'),
    /* @__PURE__ */ me('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: S,
      onScroll: M,
      children: [
        /* @__PURE__ */ c(en, { highlightTime: g, scales: d }),
        V && V.length
          ? /* @__PURE__ */ c('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${Y}px` },
              children: V.map((u, T) =>
                /* @__PURE__ */ c(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${u.css || ''}`,
                    style: { left: `${u.left}px` },
                    children: /* @__PURE__ */ c('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: u.text,
                    }),
                  },
                  T,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ me('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${s}px`, height: `${Y}px` },
          children: [
            _
              ? /* @__PURE__ */ c('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: _.map((u, T) =>
                    u
                      ? /* @__PURE__ */ c(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + u.css,
                            style: {
                              width: `${u.width}px`,
                              left: `${T * u.width}px`,
                            },
                          },
                          T,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ c(Qt, { borders: a }),
            f && f.length
              ? f.map((u, T) =>
                  u.$y
                    ? /* @__PURE__ */ c(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': u.id,
                          style: K[T],
                        },
                        u.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ c(Jt, {
              readonly: n,
              taskTemplate: r,
              multiTaskRows: $,
              rowMapping: h,
            }),
          ],
        }),
      ],
    })
  );
}
function rn(t) {
  const {
      position: n = 'after',
      size: s = 4,
      dir: i = 'x',
      onMove: r,
      onDisplayChange: a,
      compactMode: g,
      containerWidth: $ = 0,
      leftThreshold: h = 50,
      rightThreshold: x = 50,
    } = t,
    [f, G] = qe(t.value ?? 0),
    [D, N] = qe(t.display ?? 'all');
  function H(u) {
    let T = 0;
    n == 'center' ? (T = s / 2) : n == 'before' && (T = s);
    const I = {
      size: [s + 'px', 'auto'],
      p: [u - T + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (i != 'x') for (let U in I) I[U] = I[U].reverse();
    return I;
  }
  const [d, V] = ie(!1),
    [W, O] = ie(null),
    z = J(0),
    E = J(),
    S = J(),
    v = J(D);
  Z(() => {
    v.current = D;
  }, [D]),
    Z(() => {
      W === null && f > 0 && O(f);
    }, [W, f]);
  function K(u) {
    return i == 'x' ? u.clientX : u.clientY;
  }
  const Y = R(
      (u) => {
        const T = E.current + K(u) - z.current;
        G(T);
        let I;
        T <= h ? (I = 'chart') : $ - T <= x ? (I = 'grid') : (I = 'all'),
          v.current !== I && (N(I), (v.current = I)),
          S.current && clearTimeout(S.current),
          (S.current = setTimeout(() => r && r(T), 100));
      },
      [$, h, x, r],
    ),
    M = R(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        V(!1),
        window.removeEventListener('mousemove', Y),
        window.removeEventListener('mouseup', M);
    }, [Y]),
    q = C(
      () => (D !== 'all' ? 'auto' : i == 'x' ? 'ew-resize' : 'ns-resize'),
      [D, i],
    ),
    j = R(
      (u) => {
        (!g && (D === 'grid' || D === 'chart')) ||
          ((z.current = K(u)),
          (E.current = f),
          V(!0),
          (document.body.style.cursor = q),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', Y),
          window.addEventListener('mouseup', M));
      },
      [q, Y, M, f, g, D],
    );
  function ee() {
    N('all'), W !== null && (G(W), r && r(W));
  }
  function y(u) {
    if (g) {
      const T = D === 'chart' ? 'grid' : 'chart';
      N(T), a(T);
    } else if (D === 'grid' || D === 'chart') ee(), a('all');
    else {
      const T = u === 'left' ? 'chart' : 'grid';
      N(T), a(T);
    }
  }
  function k() {
    y('left');
  }
  function _() {
    y('right');
  }
  const Q = C(() => H(f), [f, n, s, i]),
    ne = [
      'wx-resizer',
      `wx-resizer-${i}`,
      `wx-resizer-display-${D}`,
      d ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ me('div', {
    className: 'wx-pFykzMlT ' + ne,
    onMouseDown: j,
    style: { width: Q.size[0], height: Q.size[1], cursor: q },
    children: [
      /* @__PURE__ */ me('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ c('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ c('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: k,
            }),
          }),
          /* @__PURE__ */ c('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ c('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: _,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ c('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const on = 650;
function xt(t) {
  let n;
  function s() {
    (n = new ResizeObserver((r) => {
      for (let a of r)
        if (a.target === document.body) {
          let g = a.contentRect.width <= on;
          t(g);
        }
    })),
      n.observe(document.body);
  }
  function i() {
    n && (n.disconnect(), (n = null));
  }
  return {
    observe: s,
    disconnect: i,
  };
}
function ln(t) {
  const {
      taskTemplate: n,
      readonly: s,
      cellBorders: i,
      highlightTime: r,
      onTableAPIChange: a,
      multiTaskRows: g = !1,
      rowMapping: $ = null,
    } = t,
    h = Te(Le),
    x = A(h, '_tasks'),
    f = A(h, '_scales'),
    G = A(h, 'cellHeight'),
    D = A(h, 'columns'),
    N = A(h, '_scrollTask'),
    H = A(h, 'undo'),
    [d, V] = ie(!1);
  let [W, O] = ie(0);
  const [z, E] = ie(0),
    [S, v] = ie(0),
    [K, Y] = ie(void 0),
    [M, q] = ie('all'),
    j = J(null),
    ee = R(
      (L) => {
        V(
          (te) => (
            L !== te &&
              (L
                ? ((j.current = M), M === 'all' && q('grid'))
                : (!j.current || j.current === 'all') && q('all')),
            L
          ),
        );
      },
      [M],
    );
  Z(() => {
    const L = xt(ee);
    return (
      L.observe(),
      () => {
        L.disconnect();
      }
    );
  }, [ee]);
  const y = C(() => {
    let L;
    return (
      D.every((te) => te.width && !te.flexgrow)
        ? (L = D.reduce((te, ue) => te + parseInt(ue.width), 0))
        : d && M === 'chart'
          ? (L = parseInt(D.find((te) => te.id === 'action')?.width) || 50)
          : (L = 440),
      (W = L),
      L
    );
  }, [D, d, M]);
  Z(() => {
    O(y);
  }, [y]);
  const k = C(() => (z ?? 0) - (K ?? 0), [z, K]),
    _ = C(() => f.width, [f]),
    Q = C(() => {
      if (!g || !$) return x.length * G;
      const L = /* @__PURE__ */ new Set();
      return (
        x.forEach((te) => {
          const ue = $.taskRows.get(te.id) ?? te.id;
          L.add(ue);
        }),
        L.size * G
      );
    }, [x, G, g, $]),
    ne = C(() => f.height + Q + k, [f, Q, k]),
    u = C(() => W + _, [W, _]),
    T = J(null),
    I = R(() => {
      Promise.resolve().then(() => {
        if ((z ?? 0) > (u ?? 0)) {
          const L = (z ?? 0) - W;
          h.exec('expand-scale', { minWidth: L });
        }
      });
    }, [z, u, W, h]);
  Z(() => {
    let L;
    return (
      T.current && ((L = new ResizeObserver(I)), L.observe(T.current)),
      () => {
        L && L.disconnect();
      }
    );
  }, [T.current, I]),
    Z(() => {
      I();
    }, [_]);
  const U = J(null),
    de = J(null),
    re = R(() => {
      const L = U.current;
      L &&
        h.exec('scroll-chart', {
          top: L.scrollTop,
        });
    }, [h]),
    ae = J({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  Z(() => {
    ae.current = {
      rTasks: x,
      rScales: f,
      rCellHeight: G,
      scrollSize: k,
      ganttDiv: U.current,
      ganttHeight: S ?? 0,
    };
  }, [x, f, G, k, S]);
  const oe = R(
    (L) => {
      if (!L) return;
      const {
        rTasks: te,
        rScales: ue,
        rCellHeight: ce,
        scrollSize: ye,
        ganttDiv: xe,
        ganttHeight: be,
      } = ae.current;
      if (!xe) return;
      const { id: Ce } = L,
        se = te.findIndex((fe) => fe.id === Ce);
      if (se > -1) {
        const fe = be - ue.height,
          m = se * ce,
          X = xe.scrollTop;
        let B = null;
        m < X ? (B = m) : m + ce > X + fe && (B = m - fe + ce + ye),
          B !== null &&
            (h.exec('scroll-chart', { top: Math.max(B, 0) }),
            (U.current.scrollTop = Math.max(B, 0)));
      }
    },
    [h],
  );
  Z(() => {
    oe(N);
  }, [N]),
    Z(() => {
      const L = U.current,
        te = de.current;
      if (!L || !te) return;
      const ue = () => {
          Vt(() => {
            v(L.offsetHeight), E(L.offsetWidth), Y(te.offsetWidth);
          });
        },
        ce = new ResizeObserver(ue);
      return ce.observe(L), () => ce.disconnect();
    }, [U.current]);
  const ke = J(null),
    he = J(null);
  return (
    Z(() => {
      he.current && (he.current.destroy(), (he.current = null));
      const L = ke.current;
      if (L)
        return (
          (he.current = mt(L, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': H,
              'ctrl+y': H,
            },
            exec: (te) => {
              te.isInput || h.exec('hotkey', te);
            },
          })),
          () => {
            he.current?.destroy(), (he.current = null);
          }
        );
    }, [H]),
    /* @__PURE__ */ c('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: U,
      onScroll: re,
      children: /* @__PURE__ */ c('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: ne, width: '100%' },
        ref: de,
        children: /* @__PURE__ */ c('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: S,
            width: K,
          },
          children: /* @__PURE__ */ me('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: ke,
            children: [
              D.length
                ? /* @__PURE__ */ me(Pe, {
                    children: [
                      /* @__PURE__ */ c(qt, {
                        display: M,
                        compactMode: d,
                        columnWidth: y,
                        width: W,
                        readonly: s,
                        fullHeight: Q,
                        onTableAPIChange: a,
                        multiTaskRows: g,
                        rowMapping: $,
                      }),
                      /* @__PURE__ */ c(rn, {
                        value: W,
                        display: M,
                        compactMode: d,
                        containerWidth: z,
                        onMove: (L) => O(L),
                        onDisplayChange: (L) => q(L),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ c('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: T,
                children: /* @__PURE__ */ c(sn, {
                  readonly: s,
                  fullWidth: _,
                  fullHeight: Q,
                  taskTemplate: n,
                  cellBorders: i,
                  highlightTime: r,
                  multiTaskRows: g,
                  rowMapping: $,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function cn(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function an(t, n) {
  return typeof t == 'function' ? t : Ke(t, n);
}
function gt(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: an(s, n),
  }));
}
function dn(t, n) {
  const s = cn(n);
  for (let i in s) s[i] = Ke(s[i], t);
  return s;
}
function un(t, n) {
  if (!t || !t.length) return t;
  const s = Ke('%d-%m-%Y', n);
  return t.map((i) =>
    i.template
      ? i
      : i.id === 'start' || i.id == 'end'
        ? {
            ...i,
            //store locale template for unscheduled tasks
            _template: (r) => s(r),
            template: (r) => s(r),
          }
        : i.id === 'duration'
          ? {
              ...i,
              _template: (r) => r,
              template: (r) => r,
            }
          : i,
  );
}
function fn(t, n) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((s) => ({
          ...s,
          scales: gt(s.scales, n),
        })),
      }
    : t;
}
const hn = (t) =>
    t
      .split('-')
      .map((n) => (n ? n.charAt(0).toUpperCase() + n.slice(1) : ''))
      .join(''),
  mn = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  Dn = at(function (
    {
      taskTemplate: n = null,
      markers: s = [],
      taskTypes: i = Wt,
      tasks: r = [],
      selected: a = [],
      activeTask: g = null,
      links: $ = [],
      scales: h = mn,
      columns: x = Gt,
      start: f = null,
      end: G = null,
      lengthUnit: D = 'day',
      durationUnit: N = 'day',
      cellWidth: H = 100,
      cellHeight: d = 38,
      scaleHeight: V = 36,
      readonly: W = !1,
      cellBorders: O = 'full',
      zoom: z = !1,
      baselines: E = !1,
      highlightTime: S = null,
      init: v = null,
      autoScale: K = !0,
      unscheduledTasks: Y = !1,
      criticalPath: M = null,
      schedule: q = { type: 'forward' },
      projectStart: j = null,
      projectEnd: ee = null,
      calendar: y = null,
      undo: k = !1,
      splitTasks: _ = !1,
      multiTaskRows: Q = !1,
      ...ne
    },
    u,
  ) {
    const T = J();
    T.current = ne;
    const I = C(() => new It(Pt), []),
      U = C(() => ({ ...Ue, ...je }), []),
      de = Te(Ee.i18n),
      re = C(() => (de ? de.extend(U, !0) : Be(U)), [de, U]),
      ae = C(() => re.getRaw().calendar, [re]),
      oe = C(() => {
        let se = {
          zoom: fn(z, ae),
          scales: gt(h, ae),
          columns: un(x, ae),
          links: Ht($),
          cellWidth: H,
        };
        return (
          se.zoom &&
            (se = {
              ...se,
              ...zt(se.zoom, dn(ae, re.getGroup('gantt')), se.scales, H),
            }),
          se
        );
      }, [z, h, x, $, H, ae, re]),
      ke = J(null);
    ke.current !== r &&
      (nt(r, { durationUnit: N, splitTasks: _, calendar: y }),
      (ke.current = r)),
      Z(() => {
        nt(r, { durationUnit: N, splitTasks: _, calendar: y });
      }, [r, N, y, _]);
    const he = C(() => {
        if (!Q) return null;
        const se = /* @__PURE__ */ new Map(),
          fe = /* @__PURE__ */ new Map(),
          m = (X) => {
            X.forEach((B) => {
              const P = B.row ?? B.id;
              fe.set(B.id, P),
                se.has(P) || se.set(P, []),
                se.get(P).push(B.id),
                B.data && B.data.length > 0 && m(B.data);
            });
          };
        return m(r), { rowMap: se, taskRows: fe };
      }, [r, Q]),
      L = C(() => I.in, [I]),
      te = J(null);
    te.current === null &&
      ((te.current = new St((se, fe) => {
        const m = 'on' + hn(se);
        T.current && T.current[m] && T.current[m](fe);
      })),
      L.setNext(te.current));
    const [ue, ce] = ie(null),
      ye = J(null);
    ye.current = ue;
    const xe = C(
      () => ({
        getState: I.getState.bind(I),
        getReactiveState: I.getReactive.bind(I),
        getStores: () => ({ data: I }),
        exec: L.exec,
        setNext: (se) => ((te.current = te.current.setNext(se)), te.current),
        intercept: L.intercept.bind(L),
        on: L.on.bind(L),
        detach: L.detach.bind(L),
        getTask: I.getTask.bind(I),
        serialize: I.serialize.bind(I),
        getTable: (se) =>
          se
            ? new Promise((fe) => setTimeout(() => fe(ye.current), 1))
            : ye.current,
        getHistory: () => I.getHistory(),
      }),
      [I, L],
    );
    dt(
      u,
      () => ({
        ...xe,
      }),
      [xe],
    );
    const be = J(0);
    Z(() => {
      be.current
        ? I.init({
            tasks: r,
            links: oe.links,
            start: f,
            columns: oe.columns,
            end: G,
            lengthUnit: D,
            cellWidth: oe.cellWidth,
            cellHeight: d,
            scaleHeight: V,
            scales: oe.scales,
            taskTypes: i,
            zoom: oe.zoom,
            selected: a,
            activeTask: g,
            baselines: E,
            autoScale: K,
            unscheduledTasks: Y,
            markers: s,
            durationUnit: N,
            criticalPath: M,
            schedule: q,
            projectStart: j,
            projectEnd: ee,
            calendar: y,
            undo: k,
            _weekStart: ae.weekStart,
            splitTasks: _,
          })
        : v && v(xe),
        be.current++;
    }, [
      xe,
      v,
      r,
      oe,
      f,
      G,
      D,
      d,
      V,
      i,
      a,
      g,
      E,
      K,
      Y,
      s,
      N,
      M,
      q,
      j,
      ee,
      y,
      k,
      ae,
      _,
      I,
    ]),
      be.current === 0 &&
        I.init({
          tasks: r,
          links: oe.links,
          start: f,
          columns: oe.columns,
          end: G,
          lengthUnit: D,
          cellWidth: oe.cellWidth,
          cellHeight: d,
          scaleHeight: V,
          scales: oe.scales,
          taskTypes: i,
          zoom: oe.zoom,
          selected: a,
          activeTask: g,
          baselines: E,
          autoScale: K,
          unscheduledTasks: Y,
          markers: s,
          durationUnit: N,
          criticalPath: M,
          schedule: q,
          projectStart: j,
          projectEnd: ee,
          calendar: y,
          undo: k,
          _weekStart: ae.weekStart,
          splitTasks: _,
        });
    const Ce = C(
      () =>
        y
          ? (se, fe) =>
              (fe == 'day' && !y.getDayHours(se)) ||
              (fe == 'hour' && !y.getDayHours(se))
                ? 'wx-weekend'
                : ''
          : S,
      [y, S],
    );
    return /* @__PURE__ */ c(Ee.i18n.Provider, {
      value: re,
      children: /* @__PURE__ */ c(Le.Provider, {
        value: xe,
        children: /* @__PURE__ */ c(ln, {
          taskTemplate: n,
          readonly: W,
          cellBorders: O,
          highlightTime: Ce,
          onTableAPIChange: ce,
          multiTaskRows: Q,
          rowMapping: he,
        }),
      }),
    });
  });
function An({ api: t = null, items: n = [] }) {
  const s = Te(Ee.i18n),
    i = C(() => s || Be(je), [s]),
    r = C(() => i.getGroup('gantt'), [i]),
    a = Se(t, '_selected'),
    g = Se(t, 'undo'),
    $ = Se(t, 'history'),
    h = Se(t, 'splitTasks'),
    x = ['undo', 'redo'],
    f = C(() => {
      const D = st({ undo: !0, splitTasks: !0 });
      return (
        n.length
          ? n
          : st({
              undo: g,
              splitTasks: h,
            })
      ).map((H) => {
        let d = { ...H, disabled: !1 };
        return (
          (d.handler = ht(D, d.id) ? (V) => ft(t, V.id, null, r) : d.handler),
          d.text && (d.text = r(d.text)),
          d.menuText && (d.menuText = r(d.menuText)),
          d
        );
      });
    }, [n, t, r, g, h]),
    G = C(() => {
      const D = [];
      return (
        f.forEach((N) => {
          const H = N.id;
          if (H === 'add-task') D.push(N);
          else if (x.includes(H))
            x.includes(H) &&
              D.push({
                ...N,
                disabled: N.isDisabled($),
              });
          else {
            if (!a?.length || !t) return;
            D.push({
              ...N,
              disabled:
                N.isDisabled && a.some((d) => N.isDisabled(d, t.getState())),
            });
          }
        }),
        D.filter((N, H) => {
          if (t && N.isHidden)
            return !a.some((d) => N.isHidden(d, t.getState()));
          if (N.comp === 'separator') {
            const d = D[H + 1];
            if (!d || d.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, a, $, f]);
  return s
    ? /* @__PURE__ */ c(ot, { items: G })
    : /* @__PURE__ */ c(Ee.i18n.Provider, {
        value: i,
        children: /* @__PURE__ */ c(ot, { items: G }),
      });
}
const In = at(function (
  {
    options: n = [],
    api: s = null,
    resolver: i = null,
    filter: r = null,
    at: a = 'point',
    children: g,
    onClick: $,
    css: h,
  },
  x,
) {
  const f = J(null),
    G = J(null),
    D = Te(Ee.i18n),
    N = C(() => D || Be({ ...je, ...Ue }), [D]),
    H = C(() => N.getGroup('gantt'), [N]),
    d = Se(s, 'taskTypes'),
    V = Se(s, 'selected'),
    W = Se(s, '_selected'),
    O = Se(s, 'splitTasks'),
    z = C(() => rt({ splitTasks: !0 }), []);
  Z(() => {
    s &&
      (s.on('scroll-chart', () => {
        f.current && f.current.show && f.current.show();
      }),
      s.on('drag-task', () => {
        f.current && f.current.show && f.current.show();
      }));
  }, [s]);
  function E(y) {
    return y.map(
      (k) => (
        (k = { ...k }),
        k.text && (k.text = H(k.text)),
        k.subtext && (k.subtext = H(k.subtext)),
        k.data && (k.data = E(k.data)),
        k
      ),
    );
  }
  function S() {
    const y = n.length ? n : rt({ splitTasks: O }),
      k = y.find((_) => _.id === 'convert-task');
    return (
      k &&
        ((k.data = []),
        (d || []).forEach((_) => {
          k.data.push(k.dataFactory(_));
        })),
      E(y)
    );
  }
  const v = C(() => S(), [s, n, d, O, H]),
    K = C(() => (W && W.length ? W : []), [W]),
    Y = R(
      (y, k) => {
        let _ = y ? s?.getTask(y) : null;
        if (i) {
          const Q = i(y, k);
          _ = Q === !0 ? _ : Q;
        }
        if (_) {
          const Q = He(k.target, 'data-segment');
          Q !== null
            ? (G.current = { id: _.id, segmentIndex: Q })
            : (G.current = _.id),
            (!Array.isArray(V) || !V.includes(_.id)) &&
              s &&
              s.exec &&
              s.exec('select-task', { id: _.id });
        }
        return _;
      },
      [s, i, V],
    ),
    M = R(
      (y) => {
        const k = y.action;
        k && (ht(z, k.id) && ft(s, k.id, G.current, H), $ && $(y));
      },
      [s, H, $, z],
    ),
    q = R(
      (y, k) => {
        const _ = K.length ? K : k ? [k] : [];
        let Q = r ? _.every((ne) => r(y, ne)) : !0;
        if (
          Q &&
          (y.isHidden &&
            (Q = !_.some((ne) => y.isHidden(ne, s.getState(), G.current))),
          y.isDisabled)
        ) {
          const ne = _.some((u) => y.isDisabled(u, s.getState(), G.current));
          y.disabled = ne;
        }
        return Q;
      },
      [r, K, s],
    );
  dt(x, () => ({
    show: (y, k) => {
      f.current && f.current.show && f.current.show(y, k);
    },
  }));
  const j = R((y) => {
      f.current && f.current.show && f.current.show(y);
    }, []),
    ee = /* @__PURE__ */ me(Pe, {
      children: [
        /* @__PURE__ */ c(Kt, {
          filter: q,
          options: v,
          dataKey: 'id',
          resolver: Y,
          onClick: M,
          at: a,
          ref: f,
          css: h,
        }),
        /* @__PURE__ */ c('span', {
          onContextMenu: j,
          'data-menu-ignore': 'true',
          children: typeof g == 'function' ? g() : g,
        }),
      ],
    });
  if (!D && Ee.i18n?.Provider) {
    const y = Ee.i18n.Provider;
    return /* @__PURE__ */ c(y, { value: N, children: ee });
  }
  return ee;
});
function xn({ api: t, autoSave: n, onLinksChange: s }) {
  const r = Te(Ee.i18n).getGroup('gantt'),
    a = A(t, 'activeTask'),
    g = A(t, '_activeTask'),
    $ = A(t, '_links'),
    h = A(t, 'schedule'),
    x = A(t, 'unscheduledTasks'),
    [f, G] = ie();
  function D() {
    if (a) {
      const V = $.filter((O) => O.target == a).map((O) => ({
          link: O,
          task: t.getTask(O.source),
        })),
        W = $.filter((O) => O.source == a).map((O) => ({
          link: O,
          task: t.getTask(O.target),
        }));
      return [
        { title: r('Predecessors'), data: V },
        { title: r('Successors'), data: W },
      ];
    }
  }
  Z(() => {
    G(D());
  }, [a, $]);
  const N = C(
    () => [
      { id: 'e2s', label: r('End-to-start') },
      { id: 's2s', label: r('Start-to-start') },
      { id: 'e2e', label: r('End-to-end') },
      { id: 's2e', label: r('Start-to-end') },
    ],
    [r],
  );
  function H(V) {
    n
      ? t.exec('delete-link', { id: V })
      : (G((W) =>
          (W || []).map((O) => ({
            ...O,
            data: O.data.filter((z) => z.link.id !== V),
          })),
        ),
        s &&
          s({
            id: V,
            action: 'delete-link',
            data: { id: V },
          }));
  }
  function d(V, W) {
    n
      ? t.exec('update-link', {
          id: V,
          link: W,
        })
      : (G((O) =>
          (O || []).map((z) => ({
            ...z,
            data: z.data.map((E) =>
              E.link.id === V ? { ...E, link: { ...E.link, ...W } } : E,
            ),
          })),
        ),
        s &&
          s({
            id: V,
            action: 'update-link',
            data: {
              id: V,
              link: W,
            },
          }));
  }
  return /* @__PURE__ */ c(Pe, {
    children: (f || []).map((V, W) =>
      V.data.length
        ? /* @__PURE__ */ c(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ c(yt, {
                label: V.title,
                position: 'top',
                children: /* @__PURE__ */ c('table', {
                  children: /* @__PURE__ */ c('tbody', {
                    children: V.data.map((O) =>
                      /* @__PURE__ */ me(
                        'tr',
                        {
                          children: [
                            /* @__PURE__ */ c('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ c('div', {
                                className: 'wx-j93aYGQf wx-task-name',
                                children: O.task.text || '',
                              }),
                            }),
                            h?.auto && O.link.type === 'e2s'
                              ? /* @__PURE__ */ c('td', {
                                  className: 'wx-j93aYGQf wx-cell wx-link-lag',
                                  children: /* @__PURE__ */ c(kt, {
                                    type: 'number',
                                    placeholder: r('Lag'),
                                    value: O.link.lag,
                                    disabled: x && g?.unscheduled,
                                    onChange: (z) => {
                                      z.input || d(O.link.id, { lag: z.value });
                                    },
                                  }),
                                })
                              : null,
                            /* @__PURE__ */ c('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ c('div', {
                                className: 'wx-j93aYGQf wx-wrapper',
                                children: /* @__PURE__ */ c(bt, {
                                  value: O.link.type,
                                  placeholder: r('Select link type'),
                                  options: N,
                                  onChange: (z) =>
                                    d(O.link.id, { type: z.value }),
                                  children: ({ option: z }) => z.label,
                                }),
                              }),
                            }),
                            /* @__PURE__ */ c('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ c('i', {
                                className:
                                  'wx-j93aYGQf wxi-delete wx-delete-icon',
                                onClick: () => H(O.link.id),
                                role: 'button',
                              }),
                            }),
                          ],
                        },
                        O.link.id,
                      ),
                    ),
                  }),
                }),
              }),
            },
            W,
          )
        : null,
    ),
  });
}
function gn(t) {
  const { value: n, time: s, format: i, onchange: r, onChange: a, ...g } = t,
    $ = a ?? r;
  function h(x) {
    const f = new Date(x.value);
    f.setHours(n.getHours()),
      f.setMinutes(n.getMinutes()),
      $ && $({ value: f });
  }
  return /* @__PURE__ */ me('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ c(vt, {
        ...g,
        value: n,
        onChange: h,
        format: i,
        buttons: ['today'],
        clear: !1,
      }),
      s ? /* @__PURE__ */ c(Tt, { value: n, onChange: $, format: i }) : null,
    ],
  });
}
Ge('select', $t);
Ge('date', gn);
Ge('twostate', Mt);
Ge('slider', Rt);
Ge('counter', Nt);
Ge('links', xn);
function Hn({
  api: t,
  items: n = [],
  css: s = '',
  layout: i = 'default',
  readonly: r = !1,
  placement: a = 'sidebar',
  bottomBar: g = !0,
  topBar: $ = !0,
  autoSave: h = !0,
  focus: x = !1,
  hotkeys: f = {},
}) {
  const G = Te(Ee.i18n),
    D = C(() => G || Be({ ...je, ...Ue }), [G]),
    N = C(() => D.getGroup('gantt'), [D]),
    H = D.getRaw(),
    d = C(() => {
      const m = H.gantt?.dateFormat || H.formats?.dateFormat;
      return Ke(m, H.calendar);
    }, [H]),
    V = C(() => {
      if ($ === !0 && !r) {
        const m = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: N('Delete'),
            id: 'delete',
          },
        ];
        return h
          ? { items: m }
          : {
              items: [
                ...m,
                {
                  comp: 'button',
                  type: 'primary',
                  text: N('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return $;
    }, [$, r, h, N]),
    [W, O] = ie(!1),
    z = C(() => (W ? 'wx-full-screen' : ''), [W]),
    E = R((m) => {
      O(m);
    }, []);
  Z(() => {
    const m = xt(E);
    return (
      m.observe(),
      () => {
        m.disconnect();
      }
    );
  }, [E]);
  const S = A(t, '_activeTask'),
    v = A(t, 'activeTask'),
    K = A(t, 'unscheduledTasks'),
    Y = A(t, 'links'),
    M = A(t, 'splitTasks'),
    q = C(() => M && v?.segmentIndex, [M, v]),
    j = C(() => q || q === 0, [q]),
    ee = C(() => _t({ unscheduledTasks: K }), [K]),
    y = A(t, 'undo'),
    [k, _] = ie({}),
    [Q, ne] = ie(null),
    [u, T] = ie(),
    [I, U] = ie(null),
    de = A(t, 'taskTypes'),
    re = C(() => {
      if (!S) return null;
      let m;
      if ((j && S.segments ? (m = { ...S.segments[q] }) : (m = { ...S }), r)) {
        let X = { parent: m.parent };
        return (
          ee.forEach(({ key: B, comp: P }) => {
            if (P !== 'links') {
              const ge = m[B];
              P === 'date' && ge instanceof Date
                ? (X[B] = d(ge))
                : P === 'slider' && B === 'progress'
                  ? (X[B] = `${ge}%`)
                  : (X[B] = ge);
            }
          }),
          X
        );
      }
      return m || null;
    }, [S, j, q, r, ee, d]);
  Z(() => {
    T(re);
  }, [re]),
    Z(() => {
      _({}), U(null), ne(null);
    }, [v]);
  function ae(m, X) {
    return m.map((B) => {
      const P = { ...B };
      if (
        (B.config && (P.config = { ...P.config }),
        P.comp === 'links' &&
          t &&
          ((P.api = t), (P.autoSave = h), (P.onLinksChange = he)),
        P.comp === 'select' && P.key === 'type')
      ) {
        const ge = P.options ?? (de || []);
        P.options = ge.map((Re) => ({
          ...Re,
          label: N(Re.label),
        }));
      }
      return (
        P.comp === 'slider' &&
          P.key === 'progress' &&
          (P.labelTemplate = (ge) => `${N(P.label)} ${ge}%`),
        P.label && (P.label = N(P.label)),
        P.config?.placeholder &&
          (P.config.placeholder = N(P.config.placeholder)),
        X &&
          (P.isDisabled && P.isDisabled(X, t.getState())
            ? (P.disabled = !0)
            : delete P.disabled),
        P
      );
    });
  }
  const oe = C(() => {
      let m = n.length ? n : ee;
      return (
        (m = ae(m, u)),
        u ? m.filter((X) => !X.isHidden || !X.isHidden(u, t.getState())) : m
      );
    }, [n, ee, u, de, N, t, h]),
    ke = C(() => oe.map((m) => m.key), [oe]);
  function he({ id: m, action: X, data: B }) {
    _((P) => ({
      ...P,
      [m]: { action: X, data: B },
    }));
  }
  const L = R(() => {
      for (let m in k)
        if (Y.byId(m)) {
          const { action: X, data: B } = k[m];
          t.exec(X, B);
        }
    }, [t, k, Y]),
    te = R(() => {
      const m = v?.id || v;
      if (j) {
        if (S?.segments) {
          const X = S.segments.filter((B, P) => P !== q);
          t.exec('update-task', {
            id: m,
            task: { segments: X },
          });
        }
      } else t.exec('delete-task', { id: m });
    }, [t, v, j, S, q]),
    ue = R(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    ce = R(
      (m) => {
        const { item: X, changes: B } = m;
        X.id === 'delete' && te(),
          X.id === 'save' && (B.length ? ue() : L()),
          X.comp && ue();
      },
      [t, v, h, L, te, ue],
    ),
    ye = R(
      (m, X, B) => (
        K && m.type === 'summary' && (m.unscheduled = !1),
        ut(m, t.getState(), X),
        B || ne(!1),
        m
      ),
      [K, t],
    ),
    xe = R(
      (m) => {
        (m = {
          ...m,
          unscheduled: K && m.unscheduled && m.type !== 'summary',
        }),
          delete m.links,
          delete m.data,
          (ke.indexOf('duration') === -1 || (m.segments && !m.duration)) &&
            delete m.duration;
        const X = {
          id: v?.id || v,
          task: m,
          ...(j && { segmentIndex: q }),
        };
        h && Q && (X.inProgress = Q), t.exec('update-task', X), h || L();
      },
      [t, v, K, h, L, ke, j, q, Q],
    ),
    be = R(
      (m) => {
        let { update: X, key: B, input: P } = m;
        if ((P && ne(!0), (m.update = ye({ ...X }, B, P)), !h)) T(m.update);
        else if (!I && !P) {
          const ge = oe.find((Ae) => Ae.key === B),
            Re = X[B];
          (!ge.validation || ge.validation(Re)) &&
            (!ge.required || Re) &&
            xe(m.update);
        }
      },
      [h, ye, I, oe, xe],
    ),
    Ce = R(
      (m) => {
        h || xe(m.values);
      },
      [h, xe],
    ),
    se = R((m) => {
      U(m.errors);
    }, []),
    fe = C(
      () =>
        y
          ? {
              'ctrl+z': (m) => {
                m.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (m) => {
                m.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [y, t],
    );
  return re
    ? /* @__PURE__ */ c(Ct, {
        children: /* @__PURE__ */ c(Bt, {
          css: `wx-XkvqDXuw wx-gantt-editor ${z} ${s}`,
          items: oe,
          values: re,
          topBar: V,
          bottomBar: g,
          placement: a,
          layout: i,
          readonly: r,
          autoSave: h,
          focus: x,
          onAction: ce,
          onSave: Ce,
          onValidation: se,
          onChange: be,
          hotkeys: f && { ...fe, ...f },
        }),
      })
    : null;
}
const zn = ({ children: t, columns: n = null, api: s }) => {
  const [i, r] = ie(null);
  return (
    Z(() => {
      s && s.getTable(!0).then(r);
    }, [s]),
    /* @__PURE__ */ c(Ft, { api: i, columns: n, children: t })
  );
};
function Gn(t) {
  const { api: n, content: s, children: i } = t,
    r = J(null),
    a = J(null),
    [g, $] = ie({}),
    [h, x] = ie(null),
    [f, G] = ie({});
  function D(E) {
    for (; E; ) {
      if (E.getAttribute) {
        const S = E.getAttribute('data-tooltip-id'),
          v = E.getAttribute('data-tooltip-at'),
          K = E.getAttribute('data-tooltip');
        if (S || K) return { id: S, tooltip: K, target: E, at: v };
      }
      E = E.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  Z(() => {
    const E = a.current;
    if (E && f && (f.text || s)) {
      const S = E.getBoundingClientRect();
      let v = !1,
        K = f.left,
        Y = f.top;
      S.right >= g.right && ((K = g.width - S.width - 5), (v = !0)),
        S.bottom >= g.bottom &&
          ((Y = f.top - (S.bottom - g.bottom + 2)), (v = !0)),
        v && G((M) => M && { ...M, left: K, top: Y });
    }
  }, [f, g, s]);
  const N = J(null),
    H = 300,
    d = (E) => {
      clearTimeout(N.current),
        (N.current = setTimeout(() => {
          E();
        }, H));
    };
  function V(E) {
    let { id: S, tooltip: v, target: K, at: Y } = D(E.target);
    if ((G(null), x(null), !v))
      if (S) v = O(S);
      else {
        clearTimeout(N.current);
        return;
      }
    const M = E.clientX;
    d(() => {
      S && x(W(z(S)));
      const q = K.getBoundingClientRect(),
        j = r.current,
        ee = j
          ? j.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let y, k;
      Y === 'left'
        ? ((y = q.top + 5 - ee.top), (k = q.right + 5 - ee.left))
        : ((y = q.top + q.height - ee.top), (k = M - ee.left)),
        $(ee),
        G({ top: y, left: k, text: v });
    });
  }
  function W(E) {
    return n?.getTask(z(E)) || null;
  }
  function O(E) {
    return W(E)?.text || '';
  }
  function z(E) {
    const S = parseInt(E);
    return isNaN(S) ? E : S;
  }
  return /* @__PURE__ */ me('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: r,
    onMouseMove: V,
    children: [
      f && (f.text || s)
        ? /* @__PURE__ */ c('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: a,
            style: { top: `${f.top}px`, left: `${f.left}px` },
            children: s
              ? /* @__PURE__ */ c(s, { data: h })
              : f.text
                ? /* @__PURE__ */ c('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: f.text,
                  })
                : null,
          })
        : null,
      i,
    ],
  });
}
function Wn({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ c(Je, { fonts: t, children: n() })
    : /* @__PURE__ */ c(Je, { fonts: t });
}
function _n({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ c(et, { fonts: t, children: n })
    : /* @__PURE__ */ c(et, { fonts: t });
}
function Pn({ fonts: t = !0, children: n }) {
  return n
    ? /* @__PURE__ */ c(tt, { fonts: t, children: n })
    : /* @__PURE__ */ c(tt, { fonts: t });
}
export {
  In as ContextMenu,
  Hn as Editor,
  Dn as Gantt,
  zn as HeaderMenu,
  Wn as Material,
  An as Toolbar,
  Gn as Tooltip,
  _n as Willow,
  Pn as WillowDark,
  Vn as defaultColumns,
  Kn as defaultEditorItems,
  Bn as defaultMenuOptions,
  jn as defaultTaskTypes,
  Xn as defaultToolbarButtons,
  Yn as getEditorItems,
  qn as getMenuOptions,
  Qn as getToolbarButtons,
  Jn as registerEditorItem,
  Un as registerScaleUnit,
};
//# sourceMappingURL=index.es.js.map
