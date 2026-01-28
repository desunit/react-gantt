import { jsxs as Re, jsx as a, Fragment as Ve } from "react/jsx-runtime";
import { createContext as St, useMemo as b, useState as ue, useContext as Ae, useCallback as $, useRef as ie, useEffect as se, Fragment as Lt, forwardRef as vt, useImperativeHandle as Tt } from "react";
import { context as Ge, Button as ut, Field as It, Text as Dt, Combo as At, DatePicker as Ht, TimePicker as zt, Locale as Gt, RichSelect as Pt, TwoState as Wt, Slider as _t, Counter as Yt, Material as ft, Willow as ht, WillowDark as mt } from "@svar-ui/react-core";
import { locate as ze, locateID as Fe, locateAttr as Xt, dateToString as Ze, locale as Je } from "@svar-ui/lib-dom";
import { en as et } from "@svar-ui/gantt-locales";
import { en as ot } from "@svar-ui/core-locales";
import { EventBusRouter as Ft } from "@svar-ui/lib-state";
import { prepareEditTask as $t, grid as Kt, extendDragOptions as Ot, isSegmentMoveAllowed as Vt, DataStore as qt, normalizeLinks as Bt, normalizeZoom as jt, defaultColumns as Qt, parseTaskDates as gt, defaultTaskTypes as Ut, getToolbarButtons as xt, handleAction as Mt, isHandledAction as Ct, getMenuOptions as wt, getEditorItems as Zt } from "@svar-ui/gantt-store";
import { defaultColumns as ns, defaultEditorItems as ss, defaultMenuOptions as rs, defaultTaskTypes as os, defaultToolbarButtons as is, getEditorItems as ls, getMenuOptions as cs, getToolbarButtons as as, registerScaleUnit as ds } from "@svar-ui/gantt-store";
import { useWritableProp as rt, useStore as W, useStoreWithCounter as Ue, writable as Jt, useStoreLater as Pe } from "@svar-ui/lib-react";
import { hotkeys as Rt } from "@svar-ui/grid-store";
import { Grid as en, HeaderMenu as tn } from "@svar-ui/react-grid";
import { flushSync as nn } from "react-dom";
import { Toolbar as pt } from "@svar-ui/react-toolbar";
import { ContextMenu as sn } from "@svar-ui/react-menu";
import { Editor as rn, registerEditorItem as Ke } from "@svar-ui/react-editor";
import { registerEditorItem as fs } from "@svar-ui/react-editor";
const We = St(null);
function Ye(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function on(t, n, s) {
  const l = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: l.top - o.top,
    left: l.left - o.left,
    dt: l.bottom - s.clientY,
    db: s.clientY - l.top
  };
}
function yt(t) {
  return t && t.getAttribute("data-context-id");
}
const kt = 5;
function ln(t, n) {
  let s, l, o, S, r, w, x, y, d;
  function L(p) {
    S = p.clientX, r = p.clientY, w = {
      ...on(s, t, p),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function D(p) {
    s = ze(p), yt(s) && (o = Ye(s), d = setTimeout(() => {
      y = !0, n && n.touchStart && n.touchStart(), L(p.touches[0]);
    }, 500), t.addEventListener("touchmove", z), t.addEventListener("contextmenu", C), window.addEventListener("touchend", q));
  }
  function C(p) {
    if (y || d)
      return p.preventDefault(), !1;
  }
  function Y(p) {
    p.which === 1 && (s = ze(p), yt(s) && (o = Ye(s), t.addEventListener("mousemove", V), window.addEventListener("mouseup", k), L(p)));
  }
  function c(p) {
    t.removeEventListener("mousemove", V), t.removeEventListener("touchmove", z), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", q), document.body.style.userSelect = "", p && (t.removeEventListener("mousedown", Y), t.removeEventListener("touchstart", D));
  }
  function H(p) {
    const F = p.clientX - S, Z = p.clientY - r;
    if (!l) {
      if (Math.abs(F) < kt && Math.abs(Z) < kt || n && n.start && n.start({ id: o, e: p }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = w.left + "px", l.style.top = w.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const re = Math.round(Math.max(0, w.top + Z));
      if (n && n.move && n.move({ id: o, top: re, detail: x }) === !1)
        return;
      const O = n.getTask(o), te = O.$y;
      if (!w.start && w.y == te) return G();
      w.start = !0, w.y = O.$y - 4, l.style.top = re + "px";
      const E = document.elementFromPoint(
        p.clientX,
        p.clientY
      ), M = ze(E);
      if (M && M !== s) {
        const g = Ye(M), X = M.getBoundingClientRect(), B = X.top + X.height / 2, J = p.clientY + w.db > B && M.nextElementSibling !== s, ce = p.clientY - w.dt < B && M.previousElementSibling !== s;
        x?.after == g || x?.before == g ? x = null : J ? x = { id: o, after: g } : ce && (x = { id: o, before: g });
      }
    }
  }
  function V(p) {
    H(p);
  }
  function z(p) {
    y ? (p.preventDefault(), H(p.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function q() {
    y = null, d && (clearTimeout(d), d = null), G();
  }
  function k() {
    G();
  }
  function G() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: o, top: w.top })), o = s = l = w = x = null, c();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", Y), t.addEventListener("touchstart", D), {
    destroy() {
      c(!0);
    }
  };
}
function cn({ row: t, column: n }) {
  function s(o, S) {
    return {
      justifyContent: S.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ Re("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ a(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ a("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ a("div", { className: "wx-pqc08MHU wx-text", children: l ? /* @__PURE__ */ a(l, { row: t, column: n }) : t.text })
  ] });
}
function bt({ column: t, cell: n }) {
  const s = b(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ a("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ a(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function an(t) {
  const {
    readonly: n,
    compactMode: s,
    width: l = 0,
    display: o = "all",
    columnWidth: S = 0,
    onTableAPIChange: r,
    multiTaskRows: w = !1,
    rowMapping: x = null
  } = t, [y, d] = rt(S), [L, D] = ue(), C = Ae(Ge.i18n), Y = b(() => C.getGroup("gantt"), [C]), c = Ae(We), H = W(c, "scrollTop"), V = W(c, "cellHeight"), z = W(c, "_scrollTask"), q = W(c, "_selected"), k = W(c, "area"), G = W(c, "_tasks"), p = W(c, "_scales"), F = W(c, "columns"), Z = W(c, "_sort"), re = W(c, "calendar"), O = W(c, "durationUnit"), te = W(c, "splitTasks"), [E, M] = ue(null), g = b(() => !G || !k ? [] : G.slice(k.start, k.end), [G, k]), X = $(
    (i, m) => {
      if (m === "add-task")
        c.exec(m, {
          target: i,
          task: { text: Y("New Task") },
          mode: "child",
          show: !0
        });
      else if (m === "open-task") {
        const v = g.find((K) => K.id === i);
        (v?.data || v?.lazy) && c.exec(m, { id: i, mode: !v.open });
      }
    },
    [g]
  ), B = $(
    (i) => {
      const m = Fe(i), v = i.target.dataset.action;
      v && i.preventDefault(), m ? v === "add-task" || v === "open-task" ? X(m, v) : c.exec("select-task", {
        id: m,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : v === "add-task" && X(null, v);
    },
    [c, X]
  ), J = ie(null), ce = ie(null), [le, ae] = ue(0), [u, P] = ue(!1);
  se(() => {
    const i = ce.current;
    if (!i || typeof ResizeObserver > "u") return;
    const m = () => ae(i.clientWidth);
    m();
    const v = new ResizeObserver(m);
    return v.observe(i), () => v.disconnect();
  }, []);
  const oe = ie(null), _ = $(
    (i) => {
      const m = i.id, { before: v, after: K } = i, xe = i.onMove;
      let me = v || K, Te = v ? "before" : "after";
      if (xe) {
        if (Te === "after") {
          const De = c.getTask(me);
          De.data?.length && De.open && (Te = "before", me = De.data[0].id);
        }
        oe.current = { id: m, [Te]: me };
      } else oe.current = null;
      c.exec("move-task", {
        id: m,
        mode: Te,
        target: me,
        inProgress: xe
      });
    },
    [c]
  ), j = b(() => k?.from ?? 0, [k]), U = b(() => p?.height ?? 0, [p]), be = b(() => !s && o !== "grid" ? (y ?? 0) > (l ?? 0) : (y ?? 0) > (le ?? 0), [s, o, y, l, le]), ye = b(() => {
    const i = {};
    return be && o === "all" || o === "grid" && be ? i.width = y : o === "grid" && (i.width = "100%"), i;
  }, [be, o, y]), R = b(() => E && !g.find((i) => i.id === E.id) ? [...g, E] : g, [g, E]), ee = b(() => {
    if (!w || !x) return R;
    const i = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
    return R.forEach((v) => {
      const K = x.taskRows.get(v.id) ?? v.id;
      m.has(K) || (i.set(K, {
        ...v,
        $rowTasks: x.rowMap.get(K) || [v.id]
      }), m.add(K));
    }), Array.from(i.values());
  }, [R, w, x]), ge = b(() => {
    let i = (F || []).map((K) => {
      K = { ...K };
      const xe = K.header;
      if (typeof xe == "object") {
        const me = xe.text && Y(xe.text);
        K.header = { ...xe, text: me };
      } else K.header = Y(xe);
      return K;
    });
    const m = i.findIndex((K) => K.id === "text"), v = i.findIndex((K) => K.id === "add-task");
    if (m !== -1 && (i[m].cell && (i[m]._cell = i[m].cell), i[m].cell = cn), v !== -1) {
      i[v].cell = i[v].cell || bt;
      const K = i[v].header;
      if (typeof K != "object" && (i[v].header = { text: K }), i[v].header.cell = K.cell || bt, n)
        i.splice(v, 1);
      else if (s) {
        const [xe] = i.splice(v, 1);
        i.unshift(xe);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [F, Y, n, s]), ve = b(() => o === "all" ? `${l}px` : o === "grid" ? "calc(100% - 4px)" : ge.find((i) => i.id === "add-task") ? "50px" : "0", [o, l, ge]), $e = b(() => {
    if (ee && Z?.length) {
      const i = {};
      return Z.forEach(({ key: m, order: v }, K) => {
        i[m] = {
          order: v,
          ...Z.length > 1 && { index: K }
        };
      }), i;
    }
    return {};
  }, [ee, Z]), Ce = $(() => ge.some((i) => i.flexgrow && !i.hidden), []), Le = b(() => Ce(), [Ce, u]), Ne = b(() => {
    let i = o === "chart" ? ge.filter((v) => v.id === "add-task") : ge;
    const m = o === "all" ? l : le;
    if (!Le) {
      let v = y, K = !1;
      if (ge.some((xe) => xe.$width)) {
        let xe = 0;
        v = ge.reduce((me, Te) => (Te.hidden || (xe += Te.width, me += Te.$width || Te.width), me), 0), xe > v && v > m && (K = !0);
      }
      if (K || v < m) {
        let xe = 1;
        return K || (xe = (m - 50) / (v - 50 || 1)), i.map((me) => (me.id !== "add-task" && !me.hidden && (me.$width || (me.$width = me.width), me.width = me.$width * xe), me));
      }
    }
    return i;
  }, [o, ge, Le, y, l, le]), fe = $(
    (i) => {
      if (!Ce()) {
        const m = Ne.reduce((v, K) => (i && K.$width && (K.$width = K.width), v + (K.hidden ? 0 : K.width)), 0);
        m !== y && d(m);
      }
      P(!0), P(!1);
    },
    [Ce, Ne, y, d]
  ), f = $(() => {
    ge.filter((m) => m.flexgrow && !m.hidden).length === 1 && ge.forEach((m) => {
      m.$width && !m.flexgrow && !m.hidden && (m.width = m.$width);
    });
  }, []), Q = $(
    (i) => {
      if (!n) {
        const m = Fe(i), v = Xt(i, "data-col-id");
        !(v && ge.find((xe) => xe.id == v))?.editor && m && c.exec("show-editor", { id: m });
      }
    },
    [c, n]
    // cols is defined later; relies on latest value at call time
  ), he = b(
    () => Array.isArray(q) ? q.map((i) => i.id) : [],
    [q]
  ), N = $(() => {
    if (J.current && ee !== null) {
      const i = J.current.querySelector(".wx-body");
      i && (i.style.top = -((H ?? 0) - (j ?? 0)) + "px");
    }
    ce.current && (ce.current.scrollTop = 0);
  }, [ee, H, j]);
  se(() => {
    J.current && N();
  }, [H, j, N]), se(() => {
    const i = J.current;
    if (!i) return;
    const m = i.querySelector(".wx-table-box .wx-body");
    if (!m || typeof ResizeObserver > "u") return;
    const v = new ResizeObserver(() => {
      N();
    });
    return v.observe(m), () => {
      v.disconnect();
    };
  }, [Ne, ye, o, ve, ee, N]), se(() => {
    if (!z || !L) return;
    const { id: i } = z, m = L.getState().focusCell;
    m && m.row !== i && J.current && J.current.contains(document.activeElement) && L.exec("focus-cell", {
      row: i,
      column: m.column
    });
  }, [z, L]);
  const pe = $(
    ({ id: i }) => {
      if (n) return !1;
      c.getTask(i).open && c.exec("open-task", { id: i, mode: !1 });
      const m = c.getState()._tasks.find((v) => v.id === i);
      if (M(m || null), !m) return !1;
    },
    [c, n]
  ), Ie = $(
    ({ id: i, top: m }) => {
      oe.current ? _({ ...oe.current, onMove: !1 }) : c.exec("drag-task", {
        id: i,
        top: m + (j ?? 0),
        inProgress: !1
      }), M(null);
    },
    [c, _, j]
  ), Oe = $(
    ({ id: i, top: m, detail: v }) => {
      v && _({ ...v, onMove: !0 }), c.exec("drag-task", {
        id: i,
        top: m + (j ?? 0),
        inProgress: !0
      });
    },
    [c, _, j]
  );
  se(() => {
    const i = J.current;
    return i ? ln(i, {
      start: pe,
      end: Ie,
      move: Oe,
      getTask: c.getTask
    }).destroy : void 0;
  }, [c, pe, Ie, Oe]);
  const Xe = $(
    (i) => {
      const { key: m, isInput: v } = i;
      if (!v && (m === "arrowup" || m === "arrowdown"))
        return i.eventSource = "grid", c.exec("hotkey", i), !1;
      if (m === "enter") {
        const K = L?.getState().focusCell;
        if (K) {
          const { row: xe, column: me } = K;
          me === "add-task" ? X(xe, "add-task") : me === "text" && X(xe, "open-task");
        }
      }
    },
    [c, X, L]
  ), Se = ie(null), qe = () => {
    Se.current = {
      setTableAPI: D,
      handleHotkey: Xe,
      sortVal: Z,
      api: c,
      adjustColumns: f,
      setColumnWidth: fe,
      tasks: g,
      calendarVal: re,
      durationUnitVal: O,
      splitTasksVal: te,
      onTableAPIChange: r
    };
  };
  qe(), se(() => {
    qe();
  }, [
    D,
    Xe,
    Z,
    c,
    f,
    fe,
    g,
    re,
    O,
    te,
    r
  ]);
  const tt = $((i) => {
    D(i), i.intercept("hotkey", (m) => Se.current.handleHotkey(m)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (m) => {
      const v = Se.current.sortVal, { key: K, add: xe } = m, me = v ? v.find((De) => De.key === K) : null;
      let Te = "asc";
      return me && (Te = !me || me.order === "asc" ? "desc" : "asc"), c.exec("sort-tasks", {
        key: K,
        order: Te,
        add: xe
      }), !1;
    }), i.on("resize-column", () => {
      Se.current.setColumnWidth(!0);
    }), i.on("hide-column", (m) => {
      m.mode || Se.current.adjustColumns(), Se.current.setColumnWidth();
    }), i.intercept("update-cell", (m) => {
      const { id: v, column: K, value: xe } = m, me = Se.current.tasks.find((Te) => Te.id === v);
      if (me) {
        const Te = { ...me };
        let De = xe;
        De && !isNaN(De) && !(De instanceof Date) && (De *= 1), Te[K] = De, $t(
          Te,
          {
            calendar: Se.current.calendarVal,
            durationUnit: Se.current.durationUnitVal,
            splitTasks: Se.current.splitTasksVal
          },
          K
        ), c.exec("update-task", {
          id: v,
          task: Te
        });
      }
      return !1;
    }), r && r(i);
  }, []);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ve}` },
      ref: ce,
      children: /* @__PURE__ */ a(
        "div",
        {
          ref: J,
          style: ye,
          className: "wx-rHj6070p wx-table",
          onClick: B,
          onDoubleClick: Q,
          children: /* @__PURE__ */ a(
            en,
            {
              init: tt,
              sizes: {
                rowHeight: V,
                headerHeight: (U ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: ee,
              columns: Ne,
              selectedRows: [...he],
              sortMarks: $e
            }
          )
        }
      )
    }
  );
}
function dn({ borders: t = "" }) {
  const n = Ae(We), s = W(n, "cellWidth"), l = W(n, "cellHeight"), o = ie(null), [S, r] = ue("#e4e4e4");
  se(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const x = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      r(x ? x.substring(x.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const w = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${Kt(s, l, S, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ a("div", { ref: o, style: w });
}
function un({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = Ae(We), o = W(l, "_links"), S = W(l, "criticalPath"), r = ie(null), w = $(
    (x) => {
      const y = x?.target?.classList;
      !y?.contains("wx-line") && !y?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return se(() => {
    if (!s && n && r.current) {
      const x = (y) => {
        r.current && !r.current.contains(y.target) && w(y);
      };
      return document.addEventListener("click", x), () => {
        document.removeEventListener("click", x);
      };
    }
  }, [s, n, w]), /* @__PURE__ */ Re("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((x) => {
      const y = "wx-dkx3NwEn wx-line" + (S && x.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ a(
        "polyline",
        {
          className: y,
          points: x.$p,
          onClick: () => !s && t(x.id),
          "data-link-id": x.id
        },
        x.id
      );
    }),
    !s && n && /* @__PURE__ */ a(
      "polyline",
      {
        ref: r,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function fn(t) {
  const { task: n, type: s } = t;
  function l(S) {
    const r = n.segments[S];
    return {
      left: `${r.$x}px`,
      top: "0px",
      width: `${r.$w}px`,
      height: "100%"
    };
  }
  function o(S) {
    if (!n.progress) return 0;
    const r = n.duration * n.progress / 100, w = n.segments;
    let x = 0, y = 0, d = null;
    do {
      const L = w[y];
      y === S && (x > r ? d = 0 : d = Math.min((r - x) / L.duration, 1) * 100), x += L.duration, y++;
    } while (d === null && y < w.length);
    return d || 0;
  }
  return /* @__PURE__ */ a("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((S, r) => /* @__PURE__ */ Re(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": r,
      style: l(r),
      children: [
        n.progress ? /* @__PURE__ */ a("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ a(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(r)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ a("div", { className: "wx-content", children: S.text || "" })
      ]
    },
    r
  )) });
}
function hn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: o = null,
    marqueeSelect: S = !1
  } = t, r = Ae(We), [w, x] = Ue(r, "_tasks"), [y, d] = Ue(r, "_links"), L = W(r, "area"), D = W(r, "_scales"), C = W(r, "taskTypes"), Y = W(r, "baselines"), [c, H] = Ue(r, "_selected"), V = W(r, "_scrollTask"), z = W(r, "criticalPath"), q = W(r, "tasks"), k = W(r, "schedule"), G = W(r, "splitTasks"), p = b(() => {
    if (!L || !Array.isArray(w)) return [];
    const e = L.start ?? 0, h = L.end ?? 0;
    return w.slice(e, h).map((T) => ({ ...T }));
  }, [x, L]), F = W(r, "cellHeight"), Z = b(() => {
    if (!l || !o || !p.length) return p;
    const e = /* @__PURE__ */ new Map(), h = [];
    return w.forEach((T) => {
      const I = o.taskRows.get(T.id) ?? T.id;
      e.has(I) || (e.set(I, h.length), h.push(I));
    }), p.map((T) => {
      const I = o.taskRows.get(T.id) ?? T.id, A = e.get(I) ?? 0;
      return {
        ...T,
        $y: A * F,
        $y_base: T.$y_base !== void 0 ? A * F : void 0
      };
    });
  }, [p, l, o, w, F]), re = b(
    () => D.lengthUnitWidth,
    [D]
  ), O = b(
    () => D.lengthUnit || "day",
    [D]
  ), te = ie(!1), [E, M] = ue(void 0), [g, X] = ue(null), B = ie(null), [J, ce] = ue(null), [le, ae] = ue(void 0), u = ie(null), [P, oe] = ue(0), [_, j] = ue(null), [U, be] = ue(null), ye = ie(null), R = b(() => {
    const e = ye.current;
    return !!(c.length && e && e.contains(document.activeElement));
  }, [c, ye.current]), ee = b(() => R && c[c.length - 1]?.id, [R, c]);
  se(() => {
    if (V && R && V) {
      const { id: e } = V, h = ye.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      h && h.focus({ preventScroll: !0 });
    }
  }, [V]), se(() => {
    const e = ye.current;
    if (e && (oe(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const h = new ResizeObserver((T) => {
        T[0] && oe(T[0].contentRect.width);
      });
      return h.observe(e), () => h.disconnect();
    }
  }, [ye.current]);
  const ge = $(() => {
    document.body.style.userSelect = "none";
  }, []), ve = $(() => {
    document.body.style.userSelect = "";
  }, []), $e = $(
    (e, h, T) => {
      if (h.target.classList.contains("wx-line") || (T || (T = r.getTask(Ye(e))), T.type === "milestone" || T.type === "summary")) return "";
      const I = ze(h, "data-segment");
      I && (e = I);
      const { left: A, width: ne } = e.getBoundingClientRect(), de = (h.clientX - A) / ne;
      let ke = 0.2 / (ne > 200 ? ne / 200 : 1);
      return de < ke ? "start" : de > 1 - ke ? "end" : "";
    },
    [r]
  ), Ce = b(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return w.forEach((I) => {
        e.set(I.id, I.$y);
      }), e;
    const h = /* @__PURE__ */ new Map(), T = [];
    return w.forEach((I) => {
      const A = o.taskRows.get(I.id) ?? I.id;
      h.has(A) || (h.set(A, T.length), T.push(A));
    }), w.forEach((I) => {
      const A = o.taskRows.get(I.id) ?? I.id, ne = h.get(A) ?? 0;
      e.set(I.id, ne * F);
    }), e;
  }, [w, l, o, F]), Le = $(
    (e) => {
      const h = ye.current;
      if (!h) return [];
      const T = h.parentElement?.scrollLeft || 0, I = h.parentElement?.parentElement?.scrollTop || 0, A = Math.min(e.startX, e.currentX), ne = Math.max(e.startX, e.currentX), de = Math.min(e.startY, e.currentY), ke = Math.max(e.startY, e.currentY);
      return w.filter((we) => {
        const Ee = we.$x - T, He = we.$x + we.$w - T, _e = (Ce.get(we.id) ?? we.$y) - I, Me = _e + we.$h;
        return Ee < ne && He > A && _e < ke && Me > de;
      });
    },
    [w, Ce]
  ), Ne = b(() => new Set(c.map((e) => e.id)), [c, H]), fe = $(
    (e) => Ne.has(e),
    [Ne]
  ), f = $(
    (e, h) => {
      const { clientX: T } = h, I = Ye(e), A = r.getTask(I), ne = h.target.classList;
      if (!h.target.closest(".wx-delete-button") && !n) {
        if (ne.contains("wx-progress-marker")) {
          const { progress: de } = r.getTask(I);
          B.current = {
            id: I,
            x: T,
            progress: de,
            dx: 0,
            node: e,
            marker: h.target
          }, h.target.classList.add("wx-progress-in-drag");
        } else {
          const de = $e(e, h, A) || "move", ke = {
            id: I,
            mode: de,
            x: T,
            dx: 0,
            l: A.$x,
            w: A.$w
          };
          if (G && A.segments?.length) {
            const we = ze(h, "data-segment");
            we && (ke.segmentIndex = we.dataset.segment * 1, Ot(A, ke));
          }
          X(ke);
        }
        ge();
      }
    },
    [r, n, $e, ge, G]
  ), Q = $(
    (e) => {
      if (e.button !== 0) return;
      const h = ze(e);
      if (!h && S && !n) {
        const T = ye.current;
        if (!T) return;
        const I = T.getBoundingClientRect(), A = e.clientX - I.left, ne = e.clientY - I.top;
        j({
          startX: A,
          startY: ne,
          currentX: A,
          currentY: ne,
          ctrlKey: e.ctrlKey || e.metaKey
        }), ge();
        return;
      }
      if (h) {
        if (S && !n && c.length > 1) {
          const T = Ye(h);
          if (fe(T)) {
            const I = e.target.classList;
            if (!I.contains("wx-link") && !I.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const A = r.getTask(T);
              if (!$e(h, e, A)) {
                const de = /* @__PURE__ */ new Map();
                c.forEach((ke) => {
                  const we = r.getTask(ke.id);
                  if (we) {
                    if (k?.auto && we.type === "summary") return;
                    de.set(ke.id, {
                      $x: we.$x,
                      $w: we.$w,
                      start: we.start,
                      end: we.end
                    });
                  }
                }), be({
                  baseTaskId: T,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: de
                }), ge();
                return;
              }
            }
          }
        }
        f(h, e);
      }
    },
    [f, S, n, c, fe, r, $e, k, ge]
  ), he = $(
    (e) => {
      const h = ze(e);
      h && (u.current = setTimeout(() => {
        ae(!0), f(h, e.touches[0]);
      }, 300));
    },
    [f]
  ), N = $(
    (e) => {
      ce(e && { ...y.find((h) => h.id === e) });
    },
    [y]
  ), pe = $(() => {
    if (_) {
      const e = Le(_);
      _.ctrlKey ? e.forEach((h) => {
        r.exec("select-task", { id: h.id, toggle: !0, marquee: !0 });
      }) : (c.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), e.forEach((h, T) => {
        r.exec("select-task", {
          id: h.id,
          toggle: T > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), j(null), ve(), te.current = !0;
      return;
    }
    if (U) {
      const { dx: e, originalPositions: h } = U, T = Math.round(e / re);
      if (T !== 0) {
        let I = !0;
        h.forEach((A, ne) => {
          const de = r.getTask(ne);
          de && (r.exec("update-task", {
            id: ne,
            diff: T,
            task: { start: de.start, end: de.end },
            skipUndo: !I
            // Only first task creates undo entry
          }), I = !1);
        }), te.current = !0;
      } else
        h.forEach((I, A) => {
          r.exec("drag-task", {
            id: A,
            left: I.$x,
            width: I.$w,
            inProgress: !1
          });
        });
      be(null), ve();
      return;
    }
    if (B.current) {
      const { dx: e, id: h, marker: T, value: I } = B.current;
      B.current = null, typeof I < "u" && e && r.exec("update-task", {
        id: h,
        task: { progress: I },
        inProgress: !1
      }), T.classList.remove("wx-progress-in-drag"), te.current = !0, ve();
    } else if (g) {
      const { id: e, mode: h, dx: T, l: I, w: A, start: ne, segment: de, index: ke } = g;
      if (X(null), ne) {
        const we = Math.round(T / re);
        if (!we)
          r.exec("drag-task", {
            id: e,
            width: A,
            left: I,
            inProgress: !1,
            ...de && { segmentIndex: ke }
          });
        else {
          let Ee = {}, He = r.getTask(e);
          de && (He = He.segments[ke]);
          const Be = 1440 * 60 * 1e3, Me = we * (O === "week" ? 7 : O === "month" ? 30 : O === "quarter" ? 91 : O === "year" ? 365 : 1) * Be;
          h === "move" ? (Ee.start = new Date(He.start.getTime() + Me), Ee.end = new Date(He.end.getTime() + Me)) : h === "start" ? (Ee.start = new Date(He.start.getTime() + Me), Ee.end = He.end) : h === "end" && (Ee.start = He.start, Ee.end = new Date(He.end.getTime() + Me)), r.exec("update-task", {
            id: e,
            task: Ee,
            ...de && { segmentIndex: ke }
          });
        }
        te.current = !0;
      }
      ve();
    }
  }, [r, ve, g, re, O, _, U, Le, c]), Ie = $(
    (e, h) => {
      const { clientX: T, clientY: I } = h;
      if (!n) {
        if (_) {
          const A = ye.current;
          if (!A) return;
          const ne = A.getBoundingClientRect(), de = T - ne.left, ke = I - ne.top;
          j((we) => ({
            ...we,
            currentX: de,
            currentY: ke
          }));
          return;
        }
        if (U) {
          const A = T - U.startX;
          U.originalPositions.forEach((ne, de) => {
            const ke = ne.$x + A;
            r.exec("drag-task", {
              id: de,
              left: ke,
              width: ne.$w,
              inProgress: !0
            });
          }), be((ne) => ({ ...ne, dx: A }));
          return;
        }
        if (B.current) {
          const { node: A, x: ne, id: de } = B.current, ke = B.current.dx = T - ne, we = Math.round(ke / A.offsetWidth * 100);
          let Ee = B.current.progress + we;
          B.current.value = Ee = Math.min(
            Math.max(0, Ee),
            100
          ), r.exec("update-task", {
            id: de,
            task: { progress: Ee },
            inProgress: !0
          });
        } else if (g) {
          N(null);
          const { mode: A, l: ne, w: de, x: ke, id: we, start: Ee, segment: He, index: Be } = g, _e = r.getTask(we), Me = T - ke;
          if (!Ee && Math.abs(Me) < 20 || A === "start" && de - Me < re || A === "end" && de + Me < re || A === "move" && (Me < 0 && ne + Me < 0 || Me > 0 && ne + de + Me > P) || g.segment && !Vt(_e, g))
            return;
          const st = { ...g, dx: Me };
          let je, Qe;
          if (A === "start" ? (je = ne + Me, Qe = de - Me) : A === "end" ? (je = ne, Qe = de + Me) : A === "move" && (je = ne + Me, Qe = de), r.exec("drag-task", {
            id: we,
            width: Qe,
            left: je,
            inProgress: !0,
            ...He && { segmentIndex: Be }
          }), !st.start && (A === "move" && _e.$x == ne || A !== "move" && _e.$w == de)) {
            te.current = !0, pe();
            return;
          }
          st.start = !0, X(st);
        } else {
          const A = ze(e);
          if (A) {
            const ne = r.getTask(Ye(A)), ke = ze(e, "data-segment") || A, we = $e(ke, h, ne);
            ke.style.cursor = we && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      g,
      re,
      P,
      $e,
      N,
      pe,
      _,
      U
    ]
  ), Oe = $(
    (e) => {
      Ie(e, e);
    },
    [Ie]
  ), Xe = $(
    (e) => {
      le ? (e.preventDefault(), Ie(e, e.touches[0])) : u.current && (clearTimeout(u.current), u.current = null);
    },
    [le, Ie]
  ), Se = $(() => {
    pe();
  }, [pe]), qe = $(() => {
    ae(null), u.current && (clearTimeout(u.current), u.current = null), pe();
  }, [pe]);
  se(() => (window.addEventListener("mouseup", Se), () => {
    window.removeEventListener("mouseup", Se);
  }), [Se]);
  const tt = $(
    (e) => {
      if (!n) {
        const h = Fe(e.target);
        if (h && !e.target.classList.contains("wx-link")) {
          const T = Fe(e.target, "data-segment");
          r.exec("show-editor", {
            id: h,
            ...T !== null && { segmentIndex: T }
          });
        }
      }
    },
    [r, n]
  ), i = ["e2s", "s2s", "e2e", "s2e"], m = $((e, h) => i[(e ? 1 : 0) + (h ? 0 : 2)], []), v = $(
    (e, h) => {
      const T = E.id, I = E.start;
      return e === T ? !0 : !!y.find((A) => A.target == e && A.source == T && A.type === m(I, h));
    },
    [E, d, m]
  ), K = $(() => {
    E && M(null);
  }, [E]), xe = $(
    (e) => {
      if (te.current) {
        te.current = !1;
        return;
      }
      const h = Fe(e.target);
      if (h) {
        const T = e.target.classList;
        if (T.contains("wx-link")) {
          const I = T.contains("wx-left");
          if (!E) {
            M({ id: h, start: I });
            return;
          }
          E.id !== h && !v(h, I) && r.exec("add-link", {
            link: {
              source: E.id,
              target: h,
              type: m(E.start, I)
            }
          });
        } else if (T.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: J.id }), ce(null);
        else {
          let I;
          const A = ze(e, "data-segment");
          A && (I = A.dataset.segment * 1), r.exec("select-task", {
            id: h,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: I
          });
        }
      }
      K();
    },
    [
      r,
      E,
      d,
      J,
      v,
      m,
      K
    ]
  ), me = $((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Te = $((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), De = $(
    (e) => {
      if (le || u.current)
        return e.preventDefault(), !1;
    },
    [le]
  ), it = b(
    () => C.map((e) => e.id),
    [C]
  ), lt = $(
    (e) => {
      let h = it.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (h = `task ${h}`), h;
    },
    [it]
  ), ct = $(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), nt = $(
    (e) => z && q.byId(e).$critical,
    [z, q]
  ), at = $(
    (e) => {
      if (k?.auto) {
        const h = q.getSummaryId(e, !0), T = q.getSummaryId(E.id, !0);
        return E?.id && !(Array.isArray(h) ? h : [h]).includes(
          E.id
        ) && !(Array.isArray(T) ? T : [T]).includes(e);
      }
      return E;
    },
    [k, q, E]
  ), dt = b(() => {
    if (!_) return null;
    const e = Math.min(_.startX, _.currentX), h = Math.min(_.startY, _.currentY), T = Math.abs(_.currentX - _.startX), I = Math.abs(_.currentY - _.startY);
    return {
      left: `${e}px`,
      top: `${h}px`,
      width: `${T}px`,
      height: `${I}px`
    };
  }, [_]);
  return /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${Z.length ? Z[0].$h : 0}px` },
      ref: ye,
      onContextMenu: De,
      onMouseDown: Q,
      onMouseMove: Oe,
      onTouchStart: he,
      onTouchMove: Xe,
      onTouchEnd: qe,
      onClick: xe,
      onDoubleClick: tt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ a(
          un,
          {
            onSelectLink: N,
            selectedLink: J,
            readonly: n
          }
        ),
        Z.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const h = `wx-bar wx-${lt(e.type)}` + (le && g && e.id === g.id ? " wx-touch" : "") + (E && E.id === e.id ? " wx-selected" : "") + (Ne.has(e.id) ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (G && e.segments ? " wx-split" : ""), T = "wx-link wx-left" + (E ? " wx-visible" : "") + (!E || !v(e.id, !0) && at(e.id) ? " wx-target" : "") + (E && E.id === e.id && E.start ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : ""), I = "wx-link wx-right" + (E ? " wx-visible" : "") + (!E || !v(e.id, !1) && at(e.id) ? " wx-target" : "") + (E && E.id === e.id && !E.start ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Re(Lt, { children: [
            !e.$skip && /* @__PURE__ */ Re(
              "div",
              {
                className: "wx-GKbcLEGA " + h,
                style: me(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: ee === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === J?.target && J?.type[2] === "s" ? /* @__PURE__ */ a(
                    ut,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + T, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Re(Ve, { children: [
                    e.progress && !(G && e.segments) ? /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(G && e.segments) ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: ct }) : G && e.segments ? /* @__PURE__ */ a(fn, { task: e, type: lt(e.type) }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ Re(Ve, { children: [
                    /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: ct }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === J?.target && J?.type[2] === "e" ? /* @__PURE__ */ a(
                    ut,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + I, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            Y && !e.$skip_baseline ? /* @__PURE__ */ a(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Te(e)
              }
            ) : null
          ] }, e.id);
        }),
        _ && dt && /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: dt })
      ]
    }
  );
}
function mn(t) {
  const { highlightTime: n } = t, s = Ae(We), l = W(s, "_scales");
  return /* @__PURE__ */ a("div", { className: "wx-ZkvhDKir wx-scale", style: { width: l.width }, children: (l?.rows || []).map((o, S) => /* @__PURE__ */ a(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((r, w) => {
        const x = n ? n(r.date, r.unit) : "", y = "wx-cell " + (r.css || "") + " " + (x || "");
        return /* @__PURE__ */ a(
          "div",
          {
            className: "wx-ZkvhDKir " + y,
            style: { width: `${r.width}px` },
            children: r.value
          },
          w
        );
      })
    },
    S
  )) });
}
const gn = /* @__PURE__ */ new Map();
function xn(t) {
  const n = ie(null), s = ie(0), l = ie(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, se(() => {
    if (o)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const S = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        gn.set(t, S), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: S })
        );
      }), () => cancelAnimationFrame(l.current);
  });
}
function wn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: l,
    taskTemplate: o,
    cellBorders: S,
    highlightTime: r,
    multiTaskRows: w = !1,
    rowMapping: x = null,
    marqueeSelect: y = !1
  } = t, d = Ae(We), [L, D] = Ue(d, "_selected"), C = W(d, "scrollTop"), Y = W(d, "cellHeight"), c = W(d, "cellWidth"), H = W(d, "_scales"), V = W(d, "_markers"), z = W(d, "_scrollTask"), q = W(d, "zoom"), k = W(d, "_tasks"), [G, p] = ue(), F = ie(null), Z = 1 + (H?.rows?.length || 0), re = b(() => {
    if (!w || !x || !k?.length) return null;
    const u = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), oe = [];
    return k.forEach((_) => {
      const j = x.taskRows.get(_.id) ?? _.id;
      P.has(j) || (P.set(j, oe.length), oe.push(j));
    }), k.forEach((_) => {
      const j = x.taskRows.get(_.id) ?? _.id, U = P.get(j) ?? 0;
      u.set(_.id, U * Y);
    }), u;
  }, [k, w, x, Y]), O = b(() => {
    const u = [];
    return L && L.length && Y && L.forEach((P) => {
      const oe = re?.get(P.id) ?? P.$y;
      u.push({ height: `${Y}px`, top: `${oe - 3}px` });
    }), u;
  }, [D, Y, re]), te = b(
    () => Math.max(G || 0, l),
    [G, l]
  );
  se(() => {
    const u = F.current;
    u && typeof C == "number" && (u.scrollTop = C);
  }, [C]);
  const E = () => {
    M();
  };
  function M(u) {
    const P = F.current;
    if (!P) return;
    const oe = {};
    oe.left = P.scrollLeft, d.exec("scroll-chart", oe);
  }
  function g() {
    const u = F.current, oe = Math.ceil((G || 0) / (Y || 1)) + 1, _ = Math.floor((u && u.scrollTop || 0) / (Y || 1)), j = Math.max(0, _ - Z), U = _ + oe + Z, be = j * (Y || 0);
    d.exec("render-data", {
      start: j,
      end: U,
      from: be
    });
  }
  se(() => {
    g();
  }, [G, C]);
  const X = $(
    (u) => {
      if (!u) return;
      const { id: P, mode: oe } = u;
      if (oe.toString().indexOf("x") < 0) return;
      const _ = F.current;
      if (!_) return;
      const { clientWidth: j } = _, U = d.getTask(P);
      if (U.$x + U.$w < _.scrollLeft)
        d.exec("scroll-chart", { left: U.$x - (c || 0) }), _.scrollLeft = U.$x - (c || 0);
      else if (U.$x >= j + _.scrollLeft) {
        const be = j < U.$w ? c || 0 : U.$w;
        d.exec("scroll-chart", { left: U.$x - j + be }), _.scrollLeft = U.$x - j + be;
      }
    },
    [d, c]
  );
  se(() => {
    X(z);
  }, [z]);
  function B(u) {
    if (q && (u.ctrlKey || u.metaKey)) {
      u.preventDefault();
      const P = F.current, oe = -Math.sign(u.deltaY), _ = u.clientX - (P ? P.getBoundingClientRect().left : 0);
      d.exec("zoom-scale", {
        dir: oe,
        offset: _
      });
    }
  }
  function J(u) {
    const P = r(u.date, u.unit);
    return P ? {
      css: P,
      width: u.width
    } : null;
  }
  const ce = b(() => H && (H.minUnit === "hour" || H.minUnit === "day") && r ? H.rows[H.rows.length - 1].cells.map(J) : null, [H, r]), le = $(
    (u) => {
      u.eventSource = "chart", d.exec("hotkey", u);
    },
    [d]
  );
  se(() => {
    const u = F.current;
    if (!u) return;
    const P = () => p(u.clientHeight);
    P();
    const oe = new ResizeObserver(() => P());
    return oe.observe(u), () => {
      oe.disconnect();
    };
  }, [F.current]);
  const ae = ie(null);
  return se(() => {
    const u = F.current;
    if (u && !ae.current)
      return ae.current = Rt(u, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (P) => le(P)
      }), () => {
        ae.current?.destroy(), ae.current = null;
      };
  }, []), se(() => {
    const u = F.current;
    if (!u) return;
    const P = B;
    return u.addEventListener("wheel", P), () => {
      u.removeEventListener("wheel", P);
    };
  }, [B]), xn("chart"), /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: F,
      onScroll: E,
      children: [
        /* @__PURE__ */ a(mn, { highlightTime: r, scales: H }),
        V && V.length ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${te}px` },
            children: V.map((u, P) => /* @__PURE__ */ a(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${u.css || ""}`,
                style: { left: `${u.left}px` },
                children: /* @__PURE__ */ a("div", { className: "wx-mR7v2Xag wx-content", children: u.text })
              },
              P
            ))
          }
        ) : null,
        /* @__PURE__ */ Re(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${te}px` },
            children: [
              ce ? /* @__PURE__ */ a(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: ce.map(
                    (u, P) => u ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + u.css,
                        style: {
                          width: `${u.width}px`,
                          left: `${P * u.width}px`
                        }
                      },
                      P
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ a(dn, { borders: S }),
              L && L.length ? L.map(
                (u, P) => u.$y ? /* @__PURE__ */ a(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": u.id,
                    style: O[P]
                  },
                  u.id
                ) : null
              ) : null,
              /* @__PURE__ */ a(
                hn,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: w,
                  rowMapping: x,
                  marqueeSelect: y
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function pn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: l = "x",
    onMove: o,
    onDisplayChange: S,
    compactMode: r,
    containerWidth: w = 0,
    leftThreshold: x = 50,
    rightThreshold: y = 50
  } = t, [d, L] = rt(t.value ?? 0), [D, C] = rt(t.display ?? "all");
  function Y(ce) {
    let le = 0;
    n == "center" ? le = s / 2 : n == "before" && (le = s);
    const ae = {
      size: [s + "px", "auto"],
      p: [ce - le + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let u in ae) ae[u] = ae[u].reverse();
    return ae;
  }
  const [c, H] = ue(!1), [V, z] = ue(null), q = ie(0), k = ie(), G = ie(), p = ie(D);
  se(() => {
    p.current = D;
  }, [D]), se(() => {
    V === null && d > 0 && z(d);
  }, [V, d]);
  function F(ce) {
    return l == "x" ? ce.clientX : ce.clientY;
  }
  const Z = $(
    (ce) => {
      const le = k.current + F(ce) - q.current;
      L(le);
      let ae;
      le <= x ? ae = "chart" : w - le <= y ? ae = "grid" : ae = "all", p.current !== ae && (C(ae), p.current = ae), G.current && clearTimeout(G.current), G.current = setTimeout(() => o && o(le), 100);
    },
    [w, x, y, o]
  ), re = $(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", H(!1), window.removeEventListener("mousemove", Z), window.removeEventListener("mouseup", re);
  }, [Z]), O = b(
    () => D !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [D, l]
  ), te = $(
    (ce) => {
      !r && (D === "grid" || D === "chart") || (q.current = F(ce), k.current = d, H(!0), document.body.style.cursor = O, document.body.style.userSelect = "none", window.addEventListener("mousemove", Z), window.addEventListener("mouseup", re));
    },
    [O, Z, re, d, r, D]
  );
  function E() {
    C("all"), V !== null && (L(V), o && o(V));
  }
  function M(ce) {
    if (r) {
      const le = D === "chart" ? "grid" : "chart";
      C(le), S(le);
    } else if (D === "grid" || D === "chart")
      E(), S("all");
    else {
      const le = ce === "left" ? "chart" : "grid";
      C(le), S(le);
    }
  }
  function g() {
    M("left");
  }
  function X() {
    M("right");
  }
  const B = b(() => Y(d), [d, n, s, l]), J = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${D}`,
    c ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-pFykzMlT " + J,
      onMouseDown: te,
      style: { width: B.size[0], height: B.size[1], cursor: O },
      children: [
        /* @__PURE__ */ Re("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: g
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: X
            }
          ) })
        ] }),
        /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const yn = 650;
function Et(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let S of o)
        if (S.target === document.body) {
          let r = S.contentRect.width <= yn;
          t(r);
        }
    }), n.observe(document.body);
  }
  function l() {
    n && (n.disconnect(), n = null);
  }
  return {
    observe: s,
    disconnect: l
  };
}
function kn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: l,
    highlightTime: o,
    onTableAPIChange: S,
    multiTaskRows: r = !1,
    rowMapping: w = null,
    marqueeSelect: x = !1
  } = t, y = Ae(We), d = W(y, "_tasks"), L = W(y, "_scales"), D = W(y, "cellHeight"), C = W(y, "columns"), Y = W(y, "_scrollTask"), c = W(y, "undo"), [H, V] = ue(!1);
  let [z, q] = ue(0);
  const [k, G] = ue(0), [p, F] = ue(0), [Z, re] = ue(void 0), [O, te] = ue("all"), E = ie(null), M = $(
    (R) => {
      V((ee) => (R !== ee && (R ? (E.current = O, O === "all" && te("grid")) : (!E.current || E.current === "all") && te("all")), R));
    },
    [O]
  );
  se(() => {
    const R = Et(M);
    return R.observe(), () => {
      R.disconnect();
    };
  }, [M]);
  const g = b(() => {
    let R;
    return C.every((ee) => ee.width && !ee.flexgrow) ? R = C.reduce((ee, ge) => ee + parseInt(ge.width), 0) : H && O === "chart" ? R = parseInt(C.find((ee) => ee.id === "action")?.width) || 50 : R = 440, z = R, R;
  }, [C, H, O]);
  se(() => {
    q(g);
  }, [g]);
  const X = b(
    () => (k ?? 0) - (Z ?? 0),
    [k, Z]
  ), B = b(() => L.width, [L]), J = b(() => {
    if (!r || !w)
      return d.length * D;
    const R = /* @__PURE__ */ new Set();
    return d.forEach((ee) => {
      const ge = w.taskRows.get(ee.id) ?? ee.id;
      R.add(ge);
    }), R.size * D;
  }, [d, D, r, w]), ce = b(
    () => L.height + J + X,
    [L, J, X]
  ), le = b(
    () => z + B,
    [z, B]
  ), ae = ie(null), u = $(() => {
    Promise.resolve().then(() => {
      if ((k ?? 0) > (le ?? 0)) {
        const R = (k ?? 0) - z;
        y.exec("expand-scale", { minWidth: R });
      }
    });
  }, [k, le, z, y]);
  se(() => {
    let R;
    return ae.current && (R = new ResizeObserver(u), R.observe(ae.current)), () => {
      R && R.disconnect();
    };
  }, [ae.current, u]), se(() => {
    u();
  }, [B]);
  const P = ie(null), oe = ie(null), _ = $(() => {
    const R = P.current;
    R && y.exec("scroll-chart", {
      top: R.scrollTop
    });
  }, [y]), j = ie({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  se(() => {
    j.current = {
      rTasks: d,
      rScales: L,
      rCellHeight: D,
      scrollSize: X,
      ganttDiv: P.current,
      ganttHeight: p ?? 0
    };
  }, [d, L, D, X, p]);
  const U = $(
    (R) => {
      if (!R) return;
      const {
        rTasks: ee,
        rScales: ge,
        rCellHeight: ve,
        scrollSize: $e,
        ganttDiv: Ce,
        ganttHeight: Le
      } = j.current;
      if (!Ce) return;
      const { id: Ne } = R, fe = ee.findIndex((f) => f.id === Ne);
      if (fe > -1) {
        const f = Le - ge.height, Q = fe * ve, he = Ce.scrollTop;
        let N = null;
        Q < he ? N = Q : Q + ve > he + f && (N = Q - f + ve + $e), N !== null && (y.exec("scroll-chart", { top: Math.max(N, 0) }), P.current.scrollTop = Math.max(N, 0));
      }
    },
    [y]
  );
  se(() => {
    U(Y);
  }, [Y]), se(() => {
    const R = P.current, ee = oe.current;
    if (!R || !ee) return;
    const ge = () => {
      nn(() => {
        F(R.offsetHeight), G(R.offsetWidth), re(ee.offsetWidth);
      });
    }, ve = new ResizeObserver(ge);
    return ve.observe(R), () => ve.disconnect();
  }, [P.current]);
  const be = ie(null), ye = ie(null);
  return se(() => {
    ye.current && (ye.current.destroy(), ye.current = null);
    const R = be.current;
    if (R)
      return ye.current = Rt(R, {
        keys: {
          "ctrl+c": !0,
          "ctrl+v": !0,
          "ctrl+x": !0,
          "ctrl+d": !0,
          "meta+c": !0,
          "meta+v": !0,
          "meta+x": !0,
          "meta+d": !0,
          backspace: !0,
          "ctrl+z": c,
          "ctrl+y": c,
          "meta+z": c,
          "meta+shift+z": c
        },
        exec: (ee) => {
          ee.isInput || y.exec("hotkey", ee);
        }
      }), () => {
        ye.current?.destroy(), ye.current = null;
      };
  }, [c]), /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-gantt", ref: P, onScroll: _, children: /* @__PURE__ */ a(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ce, width: "100%" },
      ref: oe,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: p,
            width: Z
          },
          children: /* @__PURE__ */ Re("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: be, children: [
            C.length ? /* @__PURE__ */ Re(Ve, { children: [
              /* @__PURE__ */ a(
                an,
                {
                  display: O,
                  compactMode: H,
                  columnWidth: g,
                  width: z,
                  readonly: s,
                  fullHeight: J,
                  onTableAPIChange: S,
                  multiTaskRows: r,
                  rowMapping: w
                }
              ),
              /* @__PURE__ */ a(
                pn,
                {
                  value: z,
                  display: O,
                  compactMode: H,
                  containerWidth: k,
                  onMove: (R) => q(R),
                  onDisplayChange: (R) => te(R)
                }
              )
            ] }) : null,
            /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-content", ref: ae, children: /* @__PURE__ */ a(
              wn,
              {
                readonly: s,
                fullWidth: B,
                fullHeight: J,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: o,
                multiTaskRows: r,
                rowMapping: w,
                marqueeSelect: x
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function bn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function vn(t, n) {
  return typeof t == "function" ? t : Ze(t, n);
}
function Nt(t, n) {
  return t.map(({ format: s, ...l }) => ({
    ...l,
    format: vn(s, n)
  }));
}
function Tn(t, n) {
  const s = bn(n);
  for (let l in s)
    s[l] = Ze(s[l], t);
  return s;
}
function $n(t, n) {
  if (!t || !t.length) return t;
  const s = Ze("%d-%m-%Y", n);
  return t.map((l) => l.template ? l : l.id === "start" || l.id == "end" ? {
    ...l,
    //store locale template for unscheduled tasks
    _template: (o) => s(o),
    template: (o) => s(o)
  } : l.id === "duration" ? {
    ...l,
    _template: (o) => o,
    template: (o) => o
  } : l);
}
function Mn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Nt(s.scales, n)
    }))
  } : t;
}
const Cn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Rn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], On = vt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: l = Ut,
  tasks: o = [],
  selected: S = [],
  activeTask: r = null,
  links: w = [],
  scales: x = Rn,
  columns: y = Qt,
  start: d = null,
  end: L = null,
  lengthUnit: D = "day",
  durationUnit: C = "day",
  cellWidth: Y = 100,
  cellHeight: c = 38,
  scaleHeight: H = 36,
  readonly: V = !1,
  cellBorders: z = "full",
  zoom: q = !1,
  baselines: k = !1,
  highlightTime: G = null,
  init: p = null,
  autoScale: F = !0,
  unscheduledTasks: Z = !1,
  criticalPath: re = null,
  schedule: O = { type: "forward" },
  projectStart: te = null,
  projectEnd: E = null,
  calendar: M = null,
  undo: g = !1,
  splitTasks: X = !1,
  multiTaskRows: B = !1,
  marqueeSelect: J = !1,
  ...ce
}, le) {
  const ae = ie();
  ae.current = ce;
  const u = b(() => new qt(Jt), []), P = b(() => ({ ...ot, ...et }), []), oe = Ae(Ge.i18n), _ = b(() => oe ? oe.extend(P, !0) : Je(P), [oe, P]), j = b(() => _.getRaw().calendar, [_]), U = b(() => {
    let fe = {
      zoom: Mn(q, j),
      scales: Nt(x, j),
      columns: $n(y, j),
      links: Bt(w),
      cellWidth: Y
    };
    return fe.zoom && (fe = {
      ...fe,
      ...jt(
        fe.zoom,
        Tn(j, _.getGroup("gantt")),
        fe.scales,
        Y
      )
    }), fe;
  }, [q, x, y, w, Y, j, _]), be = ie(null);
  be.current !== o && (gt(o, { durationUnit: C, splitTasks: X, calendar: M }), be.current = o), se(() => {
    gt(o, { durationUnit: C, splitTasks: X, calendar: M });
  }, [o, C, M, X]);
  const ye = b(() => {
    if (!B) return null;
    const fe = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), Q = (he) => {
      he.forEach((N) => {
        const pe = N.row ?? N.id;
        f.set(N.id, pe), fe.has(pe) || fe.set(pe, []), fe.get(pe).push(N.id), N.data && N.data.length > 0 && Q(N.data);
      });
    };
    return Q(o), { rowMap: fe, taskRows: f };
  }, [o, B]), R = b(() => u.in, [u]), ee = ie(null);
  ee.current === null && (ee.current = new Ft((fe, f) => {
    const Q = "on" + Cn(fe);
    ae.current && ae.current[Q] && ae.current[Q](f);
  }), R.setNext(ee.current));
  const [ge, ve] = ue(null), $e = ie(null);
  $e.current = ge;
  const Ce = b(
    () => ({
      getState: u.getState.bind(u),
      getReactiveState: u.getReactive.bind(u),
      getStores: () => ({ data: u }),
      exec: R.exec,
      setNext: (fe) => (ee.current = ee.current.setNext(fe), ee.current),
      intercept: R.intercept.bind(R),
      on: R.on.bind(R),
      detach: R.detach.bind(R),
      getTask: u.getTask.bind(u),
      serialize: u.serialize.bind(u),
      getTable: (fe) => fe ? new Promise((f) => setTimeout(() => f($e.current), 1)) : $e.current,
      getHistory: () => u.getHistory()
    }),
    [u, R]
  );
  Tt(
    le,
    () => ({
      ...Ce
    }),
    [Ce]
  );
  const Le = ie(0);
  se(() => {
    Le.current ? u.init({
      tasks: o,
      links: U.links,
      start: d,
      columns: U.columns,
      end: L,
      lengthUnit: D,
      cellWidth: U.cellWidth,
      cellHeight: c,
      scaleHeight: H,
      scales: U.scales,
      taskTypes: l,
      zoom: U.zoom,
      selected: S,
      activeTask: r,
      baselines: k,
      autoScale: F,
      unscheduledTasks: Z,
      markers: s,
      durationUnit: C,
      criticalPath: re,
      schedule: O,
      projectStart: te,
      projectEnd: E,
      calendar: M,
      undo: g,
      _weekStart: j.weekStart,
      splitTasks: X
    }) : p && p(Ce), Le.current++;
  }, [
    Ce,
    p,
    o,
    U,
    d,
    L,
    D,
    c,
    H,
    l,
    S,
    r,
    k,
    F,
    Z,
    s,
    C,
    re,
    O,
    te,
    E,
    M,
    g,
    j,
    X,
    u
  ]), Le.current === 0 && u.init({
    tasks: o,
    links: U.links,
    start: d,
    columns: U.columns,
    end: L,
    lengthUnit: D,
    cellWidth: U.cellWidth,
    cellHeight: c,
    scaleHeight: H,
    scales: U.scales,
    taskTypes: l,
    zoom: U.zoom,
    selected: S,
    activeTask: r,
    baselines: k,
    autoScale: F,
    unscheduledTasks: Z,
    markers: s,
    durationUnit: C,
    criticalPath: re,
    schedule: O,
    projectStart: te,
    projectEnd: E,
    calendar: M,
    undo: g,
    _weekStart: j.weekStart,
    splitTasks: X
  });
  const Ne = b(() => M ? (fe, f) => f == "day" && !M.getDayHours(fe) || f == "hour" && !M.getDayHours(fe) ? "wx-weekend" : "" : G, [M, G]);
  return /* @__PURE__ */ a(Ge.i18n.Provider, { value: _, children: /* @__PURE__ */ a(We.Provider, { value: Ce, children: /* @__PURE__ */ a(
    kn,
    {
      taskTemplate: n,
      readonly: V,
      cellBorders: z,
      highlightTime: Ne,
      onTableAPIChange: ve,
      multiTaskRows: B,
      rowMapping: ye,
      marqueeSelect: J
    }
  ) }) });
});
function Vn({ api: t = null, items: n = [] }) {
  const s = Ae(Ge.i18n), l = b(() => s || Je(et), [s]), o = b(() => l.getGroup("gantt"), [l]), S = Pe(t, "_selected"), r = Pe(t, "undo"), w = Pe(t, "history"), x = Pe(t, "splitTasks"), y = ["undo", "redo"], d = b(() => {
    const D = xt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : xt({
      undo: r,
      splitTasks: x
    })).map((Y) => {
      let c = { ...Y, disabled: !1 };
      return c.handler = Ct(D, c.id) ? (H) => Mt(t, H.id, null, o) : c.handler, c.text && (c.text = o(c.text)), c.menuText && (c.menuText = o(c.menuText)), c;
    });
  }, [n, t, o, r, x]), L = b(() => {
    const D = [];
    return d.forEach((C) => {
      const Y = C.id;
      if (Y === "add-task")
        D.push(C);
      else if (y.includes(Y))
        y.includes(Y) && D.push({
          ...C,
          disabled: C.isDisabled(w)
        });
      else {
        if (!S?.length || !t) return;
        D.push({
          ...C,
          disabled: C.isDisabled && S.some((c) => C.isDisabled(c, t.getState()))
        });
      }
    }), D.filter((C, Y) => {
      if (t && C.isHidden)
        return !S.some((c) => C.isHidden(c, t.getState()));
      if (C.comp === "separator") {
        const c = D[Y + 1];
        if (!c || c.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, S, w, d]);
  return s ? /* @__PURE__ */ a(pt, { items: L }) : /* @__PURE__ */ a(Ge.i18n.Provider, { value: l, children: /* @__PURE__ */ a(pt, { items: L }) });
}
const qn = vt(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: o = null,
  at: S = "point",
  children: r,
  onClick: w,
  css: x
}, y) {
  const d = ie(null), L = ie(null), D = Ae(Ge.i18n), C = b(() => D || Je({ ...et, ...ot }), [D]), Y = b(() => C.getGroup("gantt"), [C]), c = Pe(s, "taskTypes"), H = Pe(s, "selected"), V = Pe(s, "_selected"), z = Pe(s, "splitTasks"), q = b(() => wt({ splitTasks: !0 }), []);
  se(() => {
    s && (s.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), s.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [s]);
  function k(M) {
    return M.map((g) => (g = { ...g }, g.text && (g.text = Y(g.text)), g.subtext && (g.subtext = Y(g.subtext)), g.data && (g.data = k(g.data)), g));
  }
  function G() {
    const M = n.length ? n : wt({ splitTasks: z }), g = M.find((X) => X.id === "convert-task");
    return g && (g.data = [], (c || []).forEach((X) => {
      g.data.push(g.dataFactory(X));
    })), k(M);
  }
  const p = b(() => G(), [s, n, c, z, Y]), F = b(
    () => V && V.length ? V : [],
    [V]
  ), Z = $(
    (M, g) => {
      let X = M ? s?.getTask(M) : null;
      if (l) {
        const B = l(M, g);
        X = B === !0 ? X : B;
      }
      if (X) {
        const B = Fe(g.target, "data-segment");
        B !== null ? L.current = { id: X.id, segmentIndex: B } : L.current = X.id, (!Array.isArray(H) || !H.includes(X.id)) && s && s.exec && s.exec("select-task", { id: X.id });
      }
      return X;
    },
    [s, l, H]
  ), re = $(
    (M) => {
      const g = M.action;
      g && (Ct(q, g.id) && Mt(s, g.id, L.current, Y), w && w(M));
    },
    [s, Y, w, q]
  ), O = $(
    (M, g) => {
      const X = F.length ? F : g ? [g] : [];
      let B = o ? X.every((J) => o(M, J)) : !0;
      if (B && (M.isHidden && (B = !X.some(
        (J) => M.isHidden(J, s.getState(), L.current)
      )), M.isDisabled)) {
        const J = X.some(
          (ce) => M.isDisabled(ce, s.getState(), L.current)
        );
        M.disabled = J;
      }
      return B;
    },
    [o, F, s]
  );
  Tt(y, () => ({
    show: (M, g) => {
      d.current && d.current.show && d.current.show(M, g);
    }
  }));
  const te = $((M) => {
    d.current && d.current.show && d.current.show(M);
  }, []), E = /* @__PURE__ */ Re(Ve, { children: [
    /* @__PURE__ */ a(
      sn,
      {
        filter: O,
        options: p,
        dataKey: "id",
        resolver: Z,
        onClick: re,
        at: S,
        ref: d,
        css: x
      }
    ),
    /* @__PURE__ */ a("span", { onContextMenu: te, "data-menu-ignore": "true", children: typeof r == "function" ? r() : r })
  ] });
  if (!D && Ge.i18n?.Provider) {
    const M = Ge.i18n.Provider;
    return /* @__PURE__ */ a(M, { value: C, children: E });
  }
  return E;
});
function En({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Ae(Ge.i18n).getGroup("gantt"), S = W(t, "activeTask"), r = W(t, "_activeTask"), w = W(t, "_links"), x = W(t, "schedule"), y = W(t, "unscheduledTasks"), [d, L] = ue();
  function D() {
    if (S) {
      const H = w.filter((z) => z.target == S).map((z) => ({ link: z, task: t.getTask(z.source) })), V = w.filter((z) => z.source == S).map((z) => ({ link: z, task: t.getTask(z.target) }));
      return [
        { title: o("Predecessors"), data: H },
        { title: o("Successors"), data: V }
      ];
    }
  }
  se(() => {
    L(D());
  }, [S, w]);
  const C = b(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function Y(H) {
    n ? t.exec("delete-link", { id: H }) : (L(
      (V) => (V || []).map((z) => ({
        ...z,
        data: z.data.filter((q) => q.link.id !== H)
      }))
    ), s && s({
      id: H,
      action: "delete-link",
      data: { id: H }
    }));
  }
  function c(H, V) {
    n ? t.exec("update-link", {
      id: H,
      link: V
    }) : (L(
      (z) => (z || []).map((q) => ({
        ...q,
        data: q.data.map(
          (k) => k.link.id === H ? { ...k, link: { ...k.link, ...V } } : k
        )
      }))
    ), s && s({
      id: H,
      action: "update-link",
      data: {
        id: H,
        link: V
      }
    }));
  }
  return /* @__PURE__ */ a(Ve, { children: (d || []).map(
    (H, V) => H.data.length ? /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ a(It, { label: H.title, position: "top", children: /* @__PURE__ */ a("table", { children: /* @__PURE__ */ a("tbody", { children: H.data.map((z) => /* @__PURE__ */ Re("tr", { children: [
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-task-name", children: z.task.text || "" }) }),
      x?.auto && z.link.type === "e2s" ? /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ a(
        Dt,
        {
          type: "number",
          placeholder: o("Lag"),
          value: z.link.lag,
          disabled: y && r?.unscheduled,
          onChange: (q) => {
            q.input || c(z.link.id, { lag: q.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ a(
        At,
        {
          value: z.link.type,
          placeholder: o("Select link type"),
          options: C,
          onChange: (q) => c(z.link.id, { type: q.value }),
          children: ({ option: q }) => q.label
        }
      ) }) }),
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => Y(z.link.id),
          role: "button"
        }
      ) })
    ] }, z.link.id)) }) }) }) }, V) : null
  ) });
}
function Nn(t) {
  const { value: n, time: s, format: l, onchange: o, onChange: S, ...r } = t, w = S ?? o;
  function x(y) {
    const d = new Date(y.value);
    d.setHours(n.getHours()), d.setMinutes(n.getMinutes()), w && w({ value: d });
  }
  return /* @__PURE__ */ Re("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ a(
      Ht,
      {
        ...r,
        value: n,
        onChange: x,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ a(zt, { value: n, onChange: w, format: l }) : null
  ] });
}
Ke("select", Pt);
Ke("date", Nn);
Ke("twostate", Wt);
Ke("slider", _t);
Ke("counter", Yt);
Ke("links", En);
function Bn({
  api: t,
  items: n = [],
  css: s = "",
  layout: l = "default",
  readonly: o = !1,
  placement: S = "sidebar",
  bottomBar: r = !0,
  topBar: w = !0,
  autoSave: x = !0,
  focus: y = !1,
  hotkeys: d = {}
}) {
  const L = Ae(Ge.i18n), D = b(() => L || Je({ ...et, ...ot }), [L]), C = b(() => D.getGroup("gantt"), [D]), Y = D.getRaw(), c = b(() => {
    const f = Y.gantt?.dateFormat || Y.formats?.dateFormat;
    return Ze(f, Y.calendar);
  }, [Y]), H = b(() => {
    if (w === !0 && !o) {
      const f = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: C("Delete"),
          id: "delete"
        }
      ];
      return x ? { items: f } : {
        items: [
          ...f,
          {
            comp: "button",
            type: "primary",
            text: C("Save"),
            id: "save"
          }
        ]
      };
    }
    return w;
  }, [w, o, x, C]), [V, z] = ue(!1), q = b(
    () => V ? "wx-full-screen" : "",
    [V]
  ), k = $((f) => {
    z(f);
  }, []);
  se(() => {
    const f = Et(k);
    return f.observe(), () => {
      f.disconnect();
    };
  }, [k]);
  const G = W(t, "_activeTask"), p = W(t, "activeTask"), F = W(t, "unscheduledTasks"), Z = W(t, "links"), re = W(t, "splitTasks"), O = b(
    () => re && p?.segmentIndex,
    [re, p]
  ), te = b(
    () => O || O === 0,
    [O]
  ), E = b(
    () => Zt({ unscheduledTasks: F }),
    [F]
  ), M = W(t, "undo"), [g, X] = ue({}), [B, J] = ue(null), [ce, le] = ue(), [ae, u] = ue(null), P = W(t, "taskTypes"), oe = b(() => {
    if (!G) return null;
    let f;
    if (te && G.segments ? f = { ...G.segments[O] } : f = { ...G }, o) {
      let Q = { parent: f.parent };
      return E.forEach(({ key: he, comp: N }) => {
        if (N !== "links") {
          const pe = f[he];
          N === "date" && pe instanceof Date ? Q[he] = c(pe) : N === "slider" && he === "progress" ? Q[he] = `${pe}%` : Q[he] = pe;
        }
      }), Q;
    }
    return f || null;
  }, [G, te, O, o, E, c]);
  se(() => {
    le(oe);
  }, [oe]), se(() => {
    X({}), u(null), J(null);
  }, [p]);
  function _(f, Q) {
    return f.map((he) => {
      const N = { ...he };
      if (he.config && (N.config = { ...N.config }), N.comp === "links" && t && (N.api = t, N.autoSave = x, N.onLinksChange = be), N.comp === "select" && N.key === "type") {
        const pe = N.options ?? (P || []);
        N.options = pe.map((Ie) => ({
          ...Ie,
          label: C(Ie.label)
        }));
      }
      return N.comp === "slider" && N.key === "progress" && (N.labelTemplate = (pe) => `${C(N.label)} ${pe}%`), N.label && (N.label = C(N.label)), N.config?.placeholder && (N.config.placeholder = C(N.config.placeholder)), Q && (N.isDisabled && N.isDisabled(Q, t.getState()) ? N.disabled = !0 : delete N.disabled), N;
    });
  }
  const j = b(() => {
    let f = n.length ? n : E;
    return f = _(f, ce), ce ? f.filter(
      (Q) => !Q.isHidden || !Q.isHidden(ce, t.getState())
    ) : f;
  }, [n, E, ce, P, C, t, x]), U = b(
    () => j.map((f) => f.key),
    [j]
  );
  function be({ id: f, action: Q, data: he }) {
    X((N) => ({
      ...N,
      [f]: { action: Q, data: he }
    }));
  }
  const ye = $(() => {
    for (let f in g)
      if (Z.byId(f)) {
        const { action: Q, data: he } = g[f];
        t.exec(Q, he);
      }
  }, [t, g, Z]), R = $(() => {
    const f = p?.id || p;
    if (te) {
      if (G?.segments) {
        const Q = G.segments.filter(
          (he, N) => N !== O
        );
        t.exec("update-task", {
          id: f,
          task: { segments: Q }
        });
      }
    } else
      t.exec("delete-task", { id: f });
  }, [t, p, te, G, O]), ee = $(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ge = $(
    (f) => {
      const { item: Q, changes: he } = f;
      Q.id === "delete" && R(), Q.id === "save" && (he.length ? ee() : ye()), Q.comp && ee();
    },
    [t, p, x, ye, R, ee]
  ), ve = $(
    (f, Q, he) => (F && f.type === "summary" && (f.unscheduled = !1), $t(f, t.getState(), Q), he || J(!1), f),
    [F, t]
  ), $e = $(
    (f) => {
      f = {
        ...f,
        unscheduled: F && f.unscheduled && f.type !== "summary"
      }, delete f.links, delete f.data, (U.indexOf("duration") === -1 || f.segments && !f.duration) && delete f.duration;
      const Q = {
        id: p?.id || p,
        task: f,
        ...te && { segmentIndex: O }
      };
      x && B && (Q.inProgress = B), t.exec("update-task", Q), x || ye();
    },
    [
      t,
      p,
      F,
      x,
      ye,
      U,
      te,
      O,
      B
    ]
  ), Ce = $(
    (f) => {
      let { update: Q, key: he, input: N } = f;
      if (N && J(!0), f.update = ve({ ...Q }, he, N), !x) le(f.update);
      else if (!ae && !N) {
        const pe = j.find((Xe) => Xe.key === he), Ie = Q[he];
        (!pe.validation || pe.validation(Ie)) && (!pe.required || Ie) && $e(f.update);
      }
    },
    [x, ve, ae, j, $e]
  ), Le = $(
    (f) => {
      x || $e(f.values);
    },
    [x, $e]
  ), Ne = $((f) => {
    u(f.errors);
  }, []), fe = b(
    () => M ? {
      "ctrl+z": (f) => {
        f.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (f) => {
        f.preventDefault(), t.exec("redo");
      }
    } : {},
    [M, t]
  );
  return oe ? /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ a(
    rn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${q} ${s}`,
      items: j,
      values: oe,
      topBar: H,
      bottomBar: r,
      placement: S,
      layout: l,
      readonly: o,
      autoSave: x,
      focus: y,
      onAction: ge,
      onSave: Le,
      onValidation: Ne,
      onChange: Ce,
      hotkeys: d && { ...fe, ...d }
    }
  ) }) : null;
}
const jn = ({ children: t, columns: n = null, api: s }) => {
  const [l, o] = ue(null);
  return se(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ a(tn, { api: l, columns: n, children: t });
};
function Qn(t) {
  const { api: n, content: s, children: l } = t, o = ie(null), S = ie(null), [r, w] = ue({}), [x, y] = ue(null), [d, L] = ue({});
  function D(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const G = k.getAttribute("data-tooltip-id"), p = k.getAttribute("data-tooltip-at"), F = k.getAttribute("data-tooltip");
        if (G || F) return { id: G, tooltip: F, target: k, at: p };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  se(() => {
    const k = S.current;
    if (k && d && (d.text || s)) {
      const G = k.getBoundingClientRect();
      let p = !1, F = d.left, Z = d.top;
      G.right >= r.right && (F = r.width - G.width - 5, p = !0), G.bottom >= r.bottom && (Z = d.top - (G.bottom - r.bottom + 2), p = !0), p && L((re) => re && { ...re, left: F, top: Z });
    }
  }, [d, r, s]);
  const C = ie(null), Y = 300, c = (k) => {
    clearTimeout(C.current), C.current = setTimeout(() => {
      k();
    }, Y);
  };
  function H(k) {
    let { id: G, tooltip: p, target: F, at: Z } = D(k.target);
    if (L(null), y(null), !p)
      if (G)
        p = z(G);
      else {
        clearTimeout(C.current);
        return;
      }
    const re = k.clientX;
    c(() => {
      G && y(V(q(G)));
      const O = F.getBoundingClientRect(), te = o.current, E = te ? te.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let M, g;
      Z === "left" ? (M = O.top + 5 - E.top, g = O.right + 5 - E.left) : (M = O.top + O.height - E.top, g = re - E.left), w(E), L({ top: M, left: g, text: p });
    });
  }
  function V(k) {
    return n?.getTask(q(k)) || null;
  }
  function z(k) {
    return V(k)?.text || "";
  }
  function q(k) {
    const G = parseInt(k);
    return isNaN(G) ? k : G;
  }
  return /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: H,
      children: [
        d && (d.text || s) ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: S,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: s ? /* @__PURE__ */ a(s, { data: x }) : d.text ? /* @__PURE__ */ a("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function Un({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ft, { fonts: t, children: n() }) : /* @__PURE__ */ a(ft, { fonts: t });
}
function Zn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ht, { fonts: t, children: n }) : /* @__PURE__ */ a(ht, { fonts: t });
}
function Jn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(mt, { fonts: t, children: n }) : /* @__PURE__ */ a(mt, { fonts: t });
}
export {
  qn as ContextMenu,
  Bn as Editor,
  On as Gantt,
  jn as HeaderMenu,
  Un as Material,
  Vn as Toolbar,
  Qn as Tooltip,
  Zn as Willow,
  Jn as WillowDark,
  ns as defaultColumns,
  ss as defaultEditorItems,
  rs as defaultMenuOptions,
  os as defaultTaskTypes,
  is as defaultToolbarButtons,
  ls as getEditorItems,
  cs as getMenuOptions,
  as as getToolbarButtons,
  fs as registerEditorItem,
  ds as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
