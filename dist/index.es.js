import { jsxs as Te, jsx as a, Fragment as Ye } from "react/jsx-runtime";
import { createContext as Mt, useMemo as $, useState as ae, useContext as Ne, useCallback as T, useRef as re, useEffect as te, Fragment as Rt, forwardRef as wt, useImperativeHandle as pt } from "react";
import { context as ze, Button as lt, Field as Et, Text as Nt, Combo as St, DatePicker as Lt, TimePicker as Dt, Locale as At, RichSelect as It, TwoState as Ht, Slider as zt, Counter as Gt, Material as it, Willow as ct, WillowDark as at } from "@svar-ui/react-core";
import { locate as He, locateID as Ke, locateAttr as Wt, dateToString as Qe, locale as Ue } from "@svar-ui/lib-dom";
import { en as Ze } from "@svar-ui/gantt-locales";
import { en as st } from "@svar-ui/core-locales";
import { EventBusRouter as _t } from "@svar-ui/lib-state";
import { prepareEditTask as yt, grid as Pt, extendDragOptions as Xt, isSegmentMoveAllowed as Ft, DataStore as Kt, normalizeLinks as Ot, normalizeZoom as Vt, defaultColumns as Yt, parseTaskDates as ut, defaultTaskTypes as Bt, getToolbarButtons as dt, handleAction as kt, isHandledAction as bt, getMenuOptions as ft, getEditorItems as qt } from "@svar-ui/gantt-store";
import { defaultColumns as Zn, defaultEditorItems as Jn, defaultMenuOptions as es, defaultTaskTypes as ts, defaultToolbarButtons as ns, getEditorItems as ss, getMenuOptions as rs, getToolbarButtons as os, registerScaleUnit as ls } from "@svar-ui/gantt-store";
import { useWritableProp as tt, useStore as G, useStoreWithCounter as nt, writable as jt, useStoreLater as Ge } from "@svar-ui/lib-react";
import { hotkeys as vt } from "@svar-ui/grid-store";
import { Grid as Qt, HeaderMenu as Ut } from "@svar-ui/react-grid";
import { flushSync as Zt } from "react-dom";
import { Toolbar as ht } from "@svar-ui/react-toolbar";
import { ContextMenu as Jt } from "@svar-ui/react-menu";
import { Editor as en, registerEditorItem as Oe } from "@svar-ui/react-editor";
import { registerEditorItem as cs } from "@svar-ui/react-editor";
const We = Mt(null);
function Xe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function tn(t, n, s) {
  const c = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: c.top - o.top,
    left: c.left - o.left,
    dt: c.bottom - s.clientY,
    db: s.clientY - c.top
  };
}
function mt(t) {
  return t && t.getAttribute("data-context-id");
}
const xt = 5;
function nn(t, n) {
  let s, c, o, N, r, b, w, y, u;
  function S(h) {
    N = h.clientX, r = h.clientY, b = {
      ...tn(s, t, h),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function H(h) {
    s = He(h), mt(s) && (o = Xe(s), u = setTimeout(() => {
      y = !0, n && n.touchStart && n.touchStart(), S(h.touches[0]);
    }, 500), t.addEventListener("touchmove", D), t.addEventListener("contextmenu", E), window.addEventListener("touchend", j));
  }
  function E(h) {
    if (y || u)
      return h.preventDefault(), !1;
  }
  function P(h) {
    h.which === 1 && (s = He(h), mt(s) && (o = Xe(s), t.addEventListener("mousemove", q), window.addEventListener("mouseup", p), S(h)));
  }
  function i(h) {
    t.removeEventListener("mousemove", q), t.removeEventListener("touchmove", D), document.body.removeEventListener("mouseup", p), document.body.removeEventListener("touchend", j), document.body.style.userSelect = "", h && (t.removeEventListener("mousedown", P), t.removeEventListener("touchstart", H));
  }
  function L(h) {
    const Z = h.clientX - N, Q = h.clientY - r;
    if (!c) {
      if (Math.abs(Z) < xt && Math.abs(Q) < xt || n && n.start && n.start({ id: o, e: h }) === !1)
        return;
      c = s.cloneNode(!0), c.style.pointerEvents = "none", c.classList.add("wx-reorder-task"), c.style.position = "absolute", c.style.left = b.left + "px", c.style.top = b.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(c, s);
    }
    if (c) {
      const J = Math.round(Math.max(0, b.top + Q));
      if (n && n.move && n.move({ id: o, top: J, detail: w }) === !1)
        return;
      const k = n.getTask(o), ue = k.$y;
      if (!b.start && b.y == ue) return _();
      b.start = !0, b.y = k.$y - 4, c.style.top = J + "px";
      const V = document.elementFromPoint(
        h.clientX,
        h.clientY
      ), v = He(V);
      if (v && v !== s) {
        const x = Xe(v), z = v.getBoundingClientRect(), ne = z.top + z.height / 2, ee = h.clientY + b.db > ne && v.nextElementSibling !== s, se = h.clientY - b.dt < ne && v.previousElementSibling !== s;
        w?.after == x || w?.before == x ? w = null : ee ? w = { id: o, after: x } : se && (w = { id: o, before: x });
      }
    }
  }
  function q(h) {
    L(h);
  }
  function D(h) {
    y ? (h.preventDefault(), L(h.touches[0])) : u && (clearTimeout(u), u = null);
  }
  function j() {
    y = null, u && (clearTimeout(u), u = null), _();
  }
  function p() {
    _();
  }
  function _() {
    s && (s.style.visibility = ""), c && (c.parentNode.removeChild(c), n && n.end && n.end({ id: o, top: b.top })), o = s = c = b = w = null, i();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", P), t.addEventListener("touchstart", H), {
    destroy() {
      i(!0);
    }
  };
}
function sn({ row: t, column: n }) {
  function s(o, N) {
    return {
      justifyContent: N.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const c = n && n._cell;
  return /* @__PURE__ */ Te("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ a(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ a("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ a("div", { className: "wx-pqc08MHU wx-text", children: c ? /* @__PURE__ */ a(c, { row: t, column: n }) : t.text })
  ] });
}
function gt({ column: t, cell: n }) {
  const s = $(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ a("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ a(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function rn(t) {
  const {
    readonly: n,
    compactMode: s,
    width: c = 0,
    display: o = "all",
    columnWidth: N = 0,
    onTableAPIChange: r,
    multiTaskRows: b = !1,
    rowMapping: w = null
  } = t, [y, u] = tt(N), [S, H] = ae(), E = Ne(ze.i18n), P = $(() => E.getGroup("gantt"), [E]), i = Ne(We), L = G(i, "scrollTop"), q = G(i, "cellHeight"), D = G(i, "_scrollTask"), j = G(i, "_selected"), p = G(i, "area"), _ = G(i, "_tasks"), h = G(i, "_scales"), Z = G(i, "columns"), Q = G(i, "_sort"), J = G(i, "calendar"), k = G(i, "durationUnit"), ue = G(i, "splitTasks"), [V, v] = ae(null), x = $(() => !_ || !p ? [] : _.slice(p.start, p.end), [_, p]), z = T(
    (l, g) => {
      if (g === "add-task")
        i.exec(g, {
          target: l,
          task: { text: P("New Task") },
          mode: "child",
          show: !0
        });
      else if (g === "open-task") {
        const M = x.find((F) => F.id === l);
        (M?.data || M?.lazy) && i.exec(g, { id: l, mode: !M.open });
      }
    },
    [x]
  ), ne = T(
    (l) => {
      const g = Ke(l), M = l.target.dataset.action;
      M && l.preventDefault(), g ? M === "add-task" || M === "open-task" ? z(g, M) : i.exec("select-task", {
        id: g,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : M === "add-task" && z(null, M);
    },
    [i, z]
  ), ee = re(null), se = re(null), [f, A] = ae(0), [Y, X] = ae(!1);
  te(() => {
    const l = se.current;
    if (!l || typeof ResizeObserver > "u") return;
    const g = () => A(l.clientWidth);
    g();
    const M = new ResizeObserver(g);
    return M.observe(l), () => M.disconnect();
  }, []);
  const xe = re(null), oe = T(
    (l) => {
      const g = l.id, { before: M, after: F } = l, me = l.onMove;
      let de = M || F, ke = M ? "before" : "after";
      if (me) {
        if (ke === "after") {
          const Ee = i.getTask(de);
          Ee.data?.length && Ee.open && (ke = "before", de = Ee.data[0].id);
        }
        xe.current = { id: g, [ke]: de };
      } else xe.current = null;
      i.exec("move-task", {
        id: g,
        mode: ke,
        target: de,
        inProgress: me
      });
    },
    [i]
  ), le = $(() => p?.from ?? 0, [p]), ge = $(() => h?.height ?? 0, [h]), Ce = $(() => !s && o !== "grid" ? (y ?? 0) > (c ?? 0) : (y ?? 0) > (f ?? 0), [s, o, y, c, f]), ve = $(() => {
    const l = {};
    return Ce && o === "all" || o === "grid" && Ce ? l.width = y : o === "grid" && (l.width = "100%"), l;
  }, [Ce, o, y]), C = $(() => V && !x.find((l) => l.id === V.id) ? [...x, V] : x, [x, V]), B = $(() => {
    if (!b || !w) return C;
    const l = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set();
    return C.forEach((M) => {
      const F = w.taskRows.get(M.id) ?? M.id;
      g.has(F) || (l.set(F, {
        ...M,
        $rowTasks: w.rowMap.get(F) || [M.id]
      }), g.add(F));
    }), Array.from(l.values());
  }, [C, b, w]), fe = $(() => {
    let l = (Z || []).map((F) => {
      F = { ...F };
      const me = F.header;
      if (typeof me == "object") {
        const de = me.text && P(me.text);
        F.header = { ...me, text: de };
      } else F.header = P(me);
      return F;
    });
    const g = l.findIndex((F) => F.id === "text"), M = l.findIndex((F) => F.id === "add-task");
    if (g !== -1 && (l[g].cell && (l[g]._cell = l[g].cell), l[g].cell = sn), M !== -1) {
      l[M].cell = l[M].cell || gt;
      const F = l[M].header;
      if (typeof F != "object" && (l[M].header = { text: F }), l[M].header.cell = F.cell || gt, n)
        l.splice(M, 1);
      else if (s) {
        const [me] = l.splice(M, 1);
        l.unshift(me);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [Z, P, n, s]), $e = $(() => o === "all" ? `${c}px` : o === "grid" ? "calc(100% - 4px)" : fe.find((l) => l.id === "add-task") ? "50px" : "0", [o, c, fe]), Me = $(() => {
    if (B && Q?.length) {
      const l = {};
      return Q.forEach(({ key: g, order: M }, F) => {
        l[g] = {
          order: M,
          ...Q.length > 1 && { index: F }
        };
      }), l;
    }
    return {};
  }, [B, Q]), be = T(() => fe.some((l) => l.flexgrow && !l.hidden), []), Se = $(() => be(), [be, Y]), Le = $(() => {
    let l = o === "chart" ? fe.filter((M) => M.id === "add-task") : fe;
    const g = o === "all" ? c : f;
    if (!Se) {
      let M = y, F = !1;
      if (fe.some((me) => me.$width)) {
        let me = 0;
        M = fe.reduce((de, ke) => (ke.hidden || (me += ke.width, de += ke.$width || ke.width), de), 0), me > M && M > g && (F = !0);
      }
      if (F || M < g) {
        let me = 1;
        return F || (me = (g - 50) / (M - 50 || 1)), l.map((de) => (de.id !== "add-task" && !de.hidden && (de.$width || (de.$width = de.width), de.width = de.$width * me), de));
      }
    }
    return l;
  }, [o, fe, Se, y, c, f]), ce = T(
    (l) => {
      if (!be()) {
        const g = Le.reduce((M, F) => (l && F.$width && (F.$width = F.width), M + (F.hidden ? 0 : F.width)), 0);
        g !== y && u(g);
      }
      X(!0), X(!1);
    },
    [be, Le, y, u]
  ), d = T(() => {
    fe.filter((g) => g.flexgrow && !g.hidden).length === 1 && fe.forEach((g) => {
      g.$width && !g.flexgrow && !g.hidden && (g.width = g.$width);
    });
  }, []), O = T(
    (l) => {
      if (!n) {
        const g = Ke(l), M = Wt(l, "data-col-id");
        !(M && fe.find((me) => me.id == M))?.editor && g && i.exec("show-editor", { id: g });
      }
    },
    [i, n]
    // cols is defined later; relies on latest value at call time
  ), he = $(
    () => Array.isArray(j) ? j.map((l) => l.id) : [],
    [j]
  ), I = T(() => {
    if (ee.current && B !== null) {
      const l = ee.current.querySelector(".wx-body");
      l && (l.style.top = -((L ?? 0) - (le ?? 0)) + "px");
    }
    se.current && (se.current.scrollTop = 0);
  }, [B, L, le]);
  te(() => {
    ee.current && I();
  }, [L, le, I]), te(() => {
    const l = ee.current;
    if (!l) return;
    const g = l.querySelector(".wx-table-box .wx-body");
    if (!g || typeof ResizeObserver > "u") return;
    const M = new ResizeObserver(() => {
      I();
    });
    return M.observe(g), () => {
      M.disconnect();
    };
  }, [Le, ve, o, $e, B, I]), te(() => {
    if (!D || !S) return;
    const { id: l } = D, g = S.getState().focusCell;
    g && g.row !== l && ee.current && ee.current.contains(document.activeElement) && S.exec("focus-cell", {
      row: l,
      column: g.column
    });
  }, [D, S]);
  const pe = T(
    ({ id: l }) => {
      if (n) return !1;
      i.getTask(l).open && i.exec("open-task", { id: l, mode: !1 });
      const g = i.getState()._tasks.find((M) => M.id === l);
      if (v(g || null), !g) return !1;
    },
    [i, n]
  ), Ie = T(
    ({ id: l, top: g }) => {
      xe.current ? oe({ ...xe.current, onMove: !1 }) : i.exec("drag-task", {
        id: l,
        top: g + (le ?? 0),
        inProgress: !1
      }), v(null);
    },
    [i, oe, le]
  ), Ve = T(
    ({ id: l, top: g, detail: M }) => {
      M && oe({ ...M, onMove: !0 }), i.exec("drag-task", {
        id: l,
        top: g + (le ?? 0),
        inProgress: !0
      });
    },
    [i, oe, le]
  );
  te(() => {
    const l = ee.current;
    return l ? nn(l, {
      start: pe,
      end: Ie,
      move: Ve,
      getTask: i.getTask
    }).destroy : void 0;
  }, [i, pe, Ie, Ve]);
  const Fe = T(
    (l) => {
      const { key: g, isInput: M } = l;
      if (!M && (g === "arrowup" || g === "arrowdown"))
        return l.eventSource = "grid", i.exec("hotkey", l), !1;
      if (g === "enter") {
        const F = S?.getState().focusCell;
        if (F) {
          const { row: me, column: de } = F;
          de === "add-task" ? z(me, "add-task") : de === "text" && z(me, "open-task");
        }
      }
    },
    [i, z, S]
  ), Re = re(null), _e = () => {
    Re.current = {
      setTableAPI: H,
      handleHotkey: Fe,
      sortVal: Q,
      api: i,
      adjustColumns: d,
      setColumnWidth: ce,
      tasks: x,
      calendarVal: J,
      durationUnitVal: k,
      splitTasksVal: ue,
      onTableAPIChange: r
    };
  };
  _e(), te(() => {
    _e();
  }, [
    H,
    Fe,
    Q,
    i,
    d,
    ce,
    x,
    J,
    k,
    ue,
    r
  ]);
  const Be = T((l) => {
    H(l), l.intercept("hotkey", (g) => Re.current.handleHotkey(g)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (g) => {
      const M = Re.current.sortVal, { key: F, add: me } = g, de = M ? M.find((Ee) => Ee.key === F) : null;
      let ke = "asc";
      return de && (ke = !de || de.order === "asc" ? "desc" : "asc"), i.exec("sort-tasks", {
        key: F,
        order: ke,
        add: me
      }), !1;
    }), l.on("resize-column", () => {
      Re.current.setColumnWidth(!0);
    }), l.on("hide-column", (g) => {
      g.mode || Re.current.adjustColumns(), Re.current.setColumnWidth();
    }), l.intercept("update-cell", (g) => {
      const { id: M, column: F, value: me } = g, de = Re.current.tasks.find((ke) => ke.id === M);
      if (de) {
        const ke = { ...de };
        let Ee = me;
        Ee && !isNaN(Ee) && !(Ee instanceof Date) && (Ee *= 1), ke[F] = Ee, yt(
          ke,
          {
            calendar: Re.current.calendarVal,
            durationUnit: Re.current.durationUnitVal,
            splitTasks: Re.current.splitTasksVal
          },
          F
        ), i.exec("update-task", {
          id: M,
          task: ke
        });
      }
      return !1;
    }), r && r(l);
  }, []);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${$e}` },
      ref: se,
      children: /* @__PURE__ */ a(
        "div",
        {
          ref: ee,
          style: ve,
          className: "wx-rHj6070p wx-table",
          onClick: ne,
          onDoubleClick: O,
          children: /* @__PURE__ */ a(
            Qt,
            {
              init: Be,
              sizes: {
                rowHeight: q,
                headerHeight: (ge ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: B,
              columns: Le,
              selectedRows: [...he],
              sortMarks: Me
            }
          )
        }
      )
    }
  );
}
function on({ borders: t = "" }) {
  const n = Ne(We), s = G(n, "cellWidth"), c = G(n, "cellHeight"), o = re(null), [N, r] = ae("#e4e4e4");
  te(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const w = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      r(w ? w.substring(w.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const b = {
    width: "100%",
    height: "100%",
    background: s != null && c != null ? `url(${Pt(s, c, N, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ a("div", { ref: o, style: b });
}
function ln({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const c = Ne(We), o = G(c, "_links"), N = G(c, "criticalPath"), r = re(null), b = T(
    (w) => {
      const y = w?.target?.classList;
      !y?.contains("wx-line") && !y?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return te(() => {
    if (!s && n && r.current) {
      const w = (y) => {
        r.current && !r.current.contains(y.target) && b(y);
      };
      return document.addEventListener("click", w), () => {
        document.removeEventListener("click", w);
      };
    }
  }, [s, n, b]), /* @__PURE__ */ Te("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((w) => {
      const y = "wx-dkx3NwEn wx-line" + (N && w.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ a(
        "polyline",
        {
          className: y,
          points: w.$p,
          onClick: () => !s && t(w.id),
          "data-link-id": w.id
        },
        w.id
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
function cn(t) {
  const { task: n, type: s } = t;
  function c(N) {
    const r = n.segments[N];
    return {
      left: `${r.$x}px`,
      top: "0px",
      width: `${r.$w}px`,
      height: "100%"
    };
  }
  function o(N) {
    if (!n.progress) return 0;
    const r = n.duration * n.progress / 100, b = n.segments;
    let w = 0, y = 0, u = null;
    do {
      const S = b[y];
      y === N && (w > r ? u = 0 : u = Math.min((r - w) / S.duration, 1) * 100), w += S.duration, y++;
    } while (u === null && y < b.length);
    return u || 0;
  }
  return /* @__PURE__ */ a("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((N, r) => /* @__PURE__ */ Te(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": r,
      style: c(r),
      children: [
        n.progress ? /* @__PURE__ */ a("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ a(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(r)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ a("div", { className: "wx-content", children: N.text || "" })
      ]
    },
    r
  )) });
}
function an(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: c = !1,
    rowMapping: o = null,
    marqueeSelect: N = !1
  } = t, r = Ne(We), [b, w] = nt(r, "_tasks"), [y, u] = nt(r, "_links"), S = G(r, "area"), H = G(r, "_scales"), E = G(r, "taskTypes"), P = G(r, "baselines"), i = G(r, "_selected"), L = G(r, "_scrollTask"), q = G(r, "criticalPath"), D = G(r, "tasks"), j = G(r, "schedule"), p = G(r, "splitTasks"), _ = $(() => {
    if (!S || !Array.isArray(b)) return [];
    const e = S.start ?? 0, m = S.end ?? 0;
    return b.slice(e, m).map((R) => ({ ...R }));
  }, [w, S]), h = G(r, "cellHeight"), Z = $(() => {
    if (!c || !o || !_.length) return _;
    const e = /* @__PURE__ */ new Map(), m = [];
    return b.forEach((R) => {
      const K = o.taskRows.get(R.id) ?? R.id;
      e.has(K) || (e.set(K, m.length), m.push(K));
    }), _.map((R) => {
      const K = o.taskRows.get(R.id) ?? R.id, W = e.get(K) ?? 0;
      return {
        ...R,
        $y: W * h,
        $y_base: R.$y_base !== void 0 ? W * h : void 0
      };
    });
  }, [_, c, o, b, h]), Q = $(
    () => H.lengthUnitWidth,
    [H]
  ), J = re(!1), [k, ue] = ae(void 0), [V, v] = ae(null), x = re(null), [z, ne] = ae(null), [ee, se] = ae(void 0), f = re(null), [A, Y] = ae(0), [X, xe] = ae(null), [oe, le] = ae(null), ge = re(null), Ce = $(() => {
    const e = ge.current;
    return !!(i.length && e && e.contains(document.activeElement));
  }, [i, ge.current]), ve = $(() => Ce && i[i.length - 1]?.id, [Ce, i]);
  te(() => {
    if (L && Ce && L) {
      const { id: e } = L, m = ge.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      m && m.focus({ preventScroll: !0 });
    }
  }, [L]), te(() => {
    const e = ge.current;
    if (e && (Y(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const m = new ResizeObserver((R) => {
        R[0] && Y(R[0].contentRect.width);
      });
      return m.observe(e), () => m.disconnect();
    }
  }, [ge.current]);
  const C = T(() => {
    document.body.style.userSelect = "none";
  }, []), B = T(() => {
    document.body.style.userSelect = "";
  }, []), fe = T(
    (e, m, R) => {
      if (m.target.classList.contains("wx-line") || (R || (R = r.getTask(Xe(e))), R.type === "milestone" || R.type === "summary")) return "";
      const K = He(m, "data-segment");
      K && (e = K);
      const { left: W, width: U } = e.getBoundingClientRect(), ie = (m.clientX - W) / U;
      let we = 0.2 / (U > 200 ? U / 200 : 1);
      return ie < we ? "start" : ie > 1 - we ? "end" : "";
    },
    [r]
  ), $e = T(
    (e) => {
      const m = Math.min(e.startX, e.currentX), R = Math.max(e.startX, e.currentX), K = Math.min(e.startY, e.currentY), W = Math.max(e.startY, e.currentY);
      return b.filter((U) => {
        const ie = U.$x, we = U.$x + U.$w, ye = U.$y, De = U.$y + U.$h;
        return ie < R && we > m && ye < W && De > K;
      });
    },
    [b]
  ), Me = T(
    (e) => i.some((m) => m.id === e),
    [i]
  ), be = T(
    (e, m) => {
      const { clientX: R } = m, K = Xe(e), W = r.getTask(K), U = m.target.classList;
      if (!m.target.closest(".wx-delete-button") && !n) {
        if (U.contains("wx-progress-marker")) {
          const { progress: ie } = r.getTask(K);
          x.current = {
            id: K,
            x: R,
            progress: ie,
            dx: 0,
            node: e,
            marker: m.target
          }, m.target.classList.add("wx-progress-in-drag");
        } else {
          const ie = fe(e, m, W) || "move", we = {
            id: K,
            mode: ie,
            x: R,
            dx: 0,
            l: W.$x,
            w: W.$w
          };
          if (p && W.segments?.length) {
            const ye = He(m, "data-segment");
            ye && (we.segmentIndex = ye.dataset.segment * 1, Xt(W, we));
          }
          v(we);
        }
        C();
      }
    },
    [r, n, fe, C, p]
  ), Se = T(
    (e) => {
      if (e.button !== 0) return;
      const m = He(e);
      if (!m && N && !n) {
        const R = ge.current;
        if (!R) return;
        const K = R.getBoundingClientRect(), W = e.clientX - K.left + R.parentElement.scrollLeft, U = e.clientY - K.top + R.parentElement.parentElement.scrollTop;
        xe({
          startX: W,
          startY: U,
          currentX: W,
          currentY: U,
          ctrlKey: e.ctrlKey || e.metaKey
        }), C();
        return;
      }
      if (m) {
        if (N && !n && i.length > 1) {
          const R = Xe(m);
          if (Me(R)) {
            const K = e.target.classList;
            if (!K.contains("wx-link") && !K.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const W = r.getTask(R);
              if (!fe(m, e, W)) {
                const ie = /* @__PURE__ */ new Map();
                i.forEach((we) => {
                  const ye = r.getTask(we.id);
                  if (ye) {
                    if (j?.auto && ye.type === "summary") return;
                    ie.set(we.id, {
                      $x: ye.$x,
                      $w: ye.$w,
                      start: ye.start,
                      end: ye.end
                    });
                  }
                }), le({
                  baseTaskId: R,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: ie
                }), C();
                return;
              }
            }
          }
        }
        be(m, e);
      }
    },
    [be, N, n, i, Me, r, fe, j, C]
  ), Le = T(
    (e) => {
      const m = He(e);
      m && (f.current = setTimeout(() => {
        se(!0), be(m, e.touches[0]);
      }, 300));
    },
    [be]
  ), ce = T(
    (e) => {
      ne(e && { ...y.find((m) => m.id === e) });
    },
    [y]
  ), d = T(() => {
    if (X) {
      const e = $e(X);
      X.ctrlKey ? e.forEach((m) => {
        r.exec("select-task", { id: m.id, toggle: !0 });
      }) : (i.length > 0 && r.exec("select-task", { id: null }), e.forEach((m, R) => {
        r.exec("select-task", {
          id: m.id,
          toggle: R > 0
          // First one replaces, rest toggle (add)
        });
      })), xe(null), B(), J.current = !0;
      return;
    }
    if (oe) {
      const { dx: e, originalPositions: m } = oe, R = Math.round(e / Q);
      if (R !== 0) {
        let K = !0;
        m.forEach((W, U) => {
          const ie = r.getTask(U);
          ie && (r.exec("update-task", {
            id: U,
            diff: R,
            task: { start: ie.start, end: ie.end },
            skipUndo: !K
            // Only first task creates undo entry
          }), K = !1);
        }), J.current = !0;
      } else
        m.forEach((K, W) => {
          r.exec("drag-task", {
            id: W,
            left: K.$x,
            width: K.$w,
            inProgress: !1
          });
        });
      le(null), B();
      return;
    }
    if (x.current) {
      const { dx: e, id: m, marker: R, value: K } = x.current;
      x.current = null, typeof K < "u" && e && r.exec("update-task", {
        id: m,
        task: { progress: K },
        inProgress: !1
      }), R.classList.remove("wx-progress-in-drag"), J.current = !0, B();
    } else if (V) {
      const { id: e, mode: m, dx: R, l: K, w: W, start: U, segment: ie, index: we } = V;
      if (v(null), U) {
        const ye = Math.round(R / Q);
        if (!ye)
          r.exec("drag-task", {
            id: e,
            width: W,
            left: K,
            inProgress: !1,
            ...ie && { segmentIndex: we }
          });
        else {
          let De = {}, Pe = r.getTask(e);
          ie && (Pe = Pe.segments[we]), m === "move" ? (De.start = Pe.start, De.end = Pe.end) : De[m] = Pe[m], r.exec("update-task", {
            id: e,
            diff: ye,
            task: De,
            ...ie && { segmentIndex: we }
          });
        }
        J.current = !0;
      }
      B();
    }
  }, [r, B, V, Q, X, oe, $e, i]), O = T(
    (e, m) => {
      const { clientX: R, clientY: K } = m;
      if (!n) {
        if (X) {
          const W = ge.current;
          if (!W) return;
          const U = W.getBoundingClientRect(), ie = R - U.left + W.parentElement.scrollLeft, we = K - U.top + W.parentElement.parentElement.scrollTop;
          xe((ye) => ({
            ...ye,
            currentX: ie,
            currentY: we
          }));
          return;
        }
        if (oe) {
          const W = R - oe.startX;
          oe.originalPositions.forEach((U, ie) => {
            const we = U.$x + W;
            r.exec("drag-task", {
              id: ie,
              left: we,
              width: U.$w,
              inProgress: !0
            });
          }), le((U) => ({ ...U, dx: W }));
          return;
        }
        if (x.current) {
          const { node: W, x: U, id: ie } = x.current, we = x.current.dx = R - U, ye = Math.round(we / W.offsetWidth * 100);
          let De = x.current.progress + ye;
          x.current.value = De = Math.min(
            Math.max(0, De),
            100
          ), r.exec("update-task", {
            id: ie,
            task: { progress: De },
            inProgress: !0
          });
        } else if (V) {
          ce(null);
          const { mode: W, l: U, w: ie, x: we, id: ye, start: De, segment: Pe, index: Ct } = V, Je = r.getTask(ye), Ae = R - we;
          if (!De && Math.abs(Ae) < 20 || W === "start" && ie - Ae < Q || W === "end" && ie + Ae < Q || W === "move" && (Ae < 0 && U + Ae < 0 || Ae > 0 && U + ie + Ae > A) || V.segment && !Ft(Je, V))
            return;
          const et = { ...V, dx: Ae };
          let qe, je;
          if (W === "start" ? (qe = U + Ae, je = ie - Ae) : W === "end" ? (qe = U, je = ie + Ae) : W === "move" && (qe = U + Ae, je = ie), r.exec("drag-task", {
            id: ye,
            width: je,
            left: qe,
            inProgress: !0,
            ...Pe && { segmentIndex: Ct }
          }), !et.start && (W === "move" && Je.$x == U || W !== "move" && Je.$w == ie)) {
            J.current = !0, d();
            return;
          }
          et.start = !0, v(et);
        } else {
          const W = He(e);
          if (W) {
            const U = r.getTask(Xe(W)), we = He(e, "data-segment") || W, ye = fe(we, m, U);
            we.style.cursor = ye && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      V,
      Q,
      A,
      fe,
      ce,
      d,
      X,
      oe
    ]
  ), he = T(
    (e) => {
      O(e, e);
    },
    [O]
  ), I = T(
    (e) => {
      ee ? (e.preventDefault(), O(e, e.touches[0])) : f.current && (clearTimeout(f.current), f.current = null);
    },
    [ee, O]
  ), pe = T(() => {
    d();
  }, [d]), Ie = T(() => {
    se(null), f.current && (clearTimeout(f.current), f.current = null), d();
  }, [d]);
  te(() => (window.addEventListener("mouseup", pe), () => {
    window.removeEventListener("mouseup", pe);
  }), [pe]);
  const Ve = T(
    (e) => {
      if (!n) {
        const m = Ke(e.target);
        if (m && !e.target.classList.contains("wx-link")) {
          const R = Ke(e.target, "data-segment");
          r.exec("show-editor", {
            id: m,
            ...R !== null && { segmentIndex: R }
          });
        }
      }
    },
    [r, n]
  ), Fe = ["e2s", "s2s", "e2e", "s2e"], Re = T((e, m) => Fe[(e ? 1 : 0) + (m ? 0 : 2)], []), _e = T(
    (e, m) => {
      const R = k.id, K = k.start;
      return e === R ? !0 : !!y.find((W) => W.target == e && W.source == R && W.type === Re(K, m));
    },
    [k, u, Re]
  ), Be = T(() => {
    k && ue(null);
  }, [k]), l = T(
    (e) => {
      if (J.current) {
        J.current = !1;
        return;
      }
      const m = Ke(e.target);
      if (m) {
        const R = e.target.classList;
        if (R.contains("wx-link")) {
          const K = R.contains("wx-left");
          if (!k) {
            ue({ id: m, start: K });
            return;
          }
          k.id !== m && !_e(m, K) && r.exec("add-link", {
            link: {
              source: k.id,
              target: m,
              type: Re(k.start, K)
            }
          });
        } else if (R.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: z.id }), ne(null);
        else {
          let K;
          const W = He(e, "data-segment");
          W && (K = W.dataset.segment * 1), r.exec("select-task", {
            id: m,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: K
          });
        }
      }
      Be();
    },
    [
      r,
      k,
      u,
      z,
      _e,
      Re,
      Be
    ]
  ), g = T((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), M = T((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), F = T(
    (e) => {
      if (ee || f.current)
        return e.preventDefault(), !1;
    },
    [ee]
  ), me = $(
    () => E.map((e) => e.id),
    [E]
  ), de = T(
    (e) => {
      let m = me.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (m = `task ${m}`), m;
    },
    [me]
  ), ke = T(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), Ee = T(
    (e) => q && D.byId(e).$critical,
    [q, D]
  ), rt = T(
    (e) => {
      if (j?.auto) {
        const m = D.getSummaryId(e, !0), R = D.getSummaryId(k.id, !0);
        return k?.id && !(Array.isArray(m) ? m : [m]).includes(
          k.id
        ) && !(Array.isArray(R) ? R : [R]).includes(e);
      }
      return k;
    },
    [j, D, k]
  ), ot = $(() => {
    if (!X) return null;
    const e = Math.min(X.startX, X.currentX), m = Math.min(X.startY, X.currentY), R = Math.abs(X.currentX - X.startX), K = Math.abs(X.currentY - X.startY);
    return {
      left: `${e}px`,
      top: `${m}px`,
      width: `${R}px`,
      height: `${K}px`
    };
  }, [X]);
  return /* @__PURE__ */ Te(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${Z.length ? Z[0].$h : 0}px` },
      ref: ge,
      onContextMenu: F,
      onMouseDown: Se,
      onMouseMove: he,
      onTouchStart: Le,
      onTouchMove: I,
      onTouchEnd: Ie,
      onClick: l,
      onDoubleClick: Ve,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ a(
          ln,
          {
            onSelectLink: ce,
            selectedLink: z,
            readonly: n
          }
        ),
        Z.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const m = `wx-bar wx-${de(e.type)}` + (ee && V && e.id === V.id ? " wx-touch" : "") + (k && k.id === e.id ? " wx-selected" : "") + (Ee(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (p && e.segments ? " wx-split" : ""), R = "wx-link wx-left" + (k ? " wx-visible" : "") + (!k || !_e(e.id, !0) && rt(e.id) ? " wx-target" : "") + (k && k.id === e.id && k.start ? " wx-selected" : "") + (Ee(e.id) ? " wx-critical" : ""), K = "wx-link wx-right" + (k ? " wx-visible" : "") + (!k || !_e(e.id, !1) && rt(e.id) ? " wx-target" : "") + (k && k.id === e.id && !k.start ? " wx-selected" : "") + (Ee(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Te(Rt, { children: [
            !e.$skip && /* @__PURE__ */ Te(
              "div",
              {
                className: "wx-GKbcLEGA " + m,
                style: g(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: ve === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === z?.target && z?.type[2] === "s" ? /* @__PURE__ */ a(
                    lt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + R, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Te(Ye, { children: [
                    e.progress && !(p && e.segments) ? /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(p && e.segments) ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: ke }) : p && e.segments ? /* @__PURE__ */ a(cn, { task: e, type: de(e.type) }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ Te(Ye, { children: [
                    /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: ke }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === z?.target && z?.type[2] === "e" ? /* @__PURE__ */ a(
                    lt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + K, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            P && !e.$skip_baseline ? /* @__PURE__ */ a(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: M(e)
              }
            ) : null
          ] }, e.id);
        }),
        X && ot && /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: ot })
      ]
    }
  );
}
function un(t) {
  const { highlightTime: n } = t, s = Ne(We), c = G(s, "_scales");
  return /* @__PURE__ */ a("div", { className: "wx-ZkvhDKir wx-scale", style: { width: c.width }, children: (c?.rows || []).map((o, N) => /* @__PURE__ */ a(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((r, b) => {
        const w = n ? n(r.date, r.unit) : "", y = "wx-cell " + (r.css || "") + " " + (w || "");
        return /* @__PURE__ */ a(
          "div",
          {
            className: "wx-ZkvhDKir " + y,
            style: { width: `${r.width}px` },
            children: r.value
          },
          b
        );
      })
    },
    N
  )) });
}
const dn = /* @__PURE__ */ new Map();
function fn(t) {
  const n = re(null), s = re(0), c = re(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, te(() => {
    if (o)
      return cancelAnimationFrame(c.current), c.current = requestAnimationFrame(() => {
        const N = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        dn.set(t, N), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: N })
        );
      }), () => cancelAnimationFrame(c.current);
  });
}
function hn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: c,
    taskTemplate: o,
    cellBorders: N,
    highlightTime: r,
    multiTaskRows: b = !1,
    rowMapping: w = null,
    marqueeSelect: y = !1
  } = t, u = Ne(We), [S, H] = nt(u, "_selected"), E = G(u, "scrollTop"), P = G(u, "cellHeight"), i = G(u, "cellWidth"), L = G(u, "_scales"), q = G(u, "_markers"), D = G(u, "_scrollTask"), j = G(u, "zoom"), [p, _] = ae(), h = re(null), Z = 1 + (L?.rows?.length || 0), Q = $(() => {
    const f = [];
    return S && S.length && P && S.forEach((A) => {
      f.push({ height: `${P}px`, top: `${A.$y - 3}px` });
    }), f;
  }, [H, P]), J = $(
    () => Math.max(p || 0, c),
    [p, c]
  );
  te(() => {
    const f = h.current;
    f && typeof E == "number" && (f.scrollTop = E);
  }, [E]);
  const k = () => {
    ue();
  };
  function ue(f) {
    const A = h.current;
    if (!A) return;
    const Y = {};
    Y.left = A.scrollLeft, u.exec("scroll-chart", Y);
  }
  function V() {
    const f = h.current, Y = Math.ceil((p || 0) / (P || 1)) + 1, X = Math.floor((f && f.scrollTop || 0) / (P || 1)), xe = Math.max(0, X - Z), oe = X + Y + Z, le = xe * (P || 0);
    u.exec("render-data", {
      start: xe,
      end: oe,
      from: le
    });
  }
  te(() => {
    V();
  }, [p, E]);
  const v = T(
    (f) => {
      if (!f) return;
      const { id: A, mode: Y } = f;
      if (Y.toString().indexOf("x") < 0) return;
      const X = h.current;
      if (!X) return;
      const { clientWidth: xe } = X, oe = u.getTask(A);
      if (oe.$x + oe.$w < X.scrollLeft)
        u.exec("scroll-chart", { left: oe.$x - (i || 0) }), X.scrollLeft = oe.$x - (i || 0);
      else if (oe.$x >= xe + X.scrollLeft) {
        const le = xe < oe.$w ? i || 0 : oe.$w;
        u.exec("scroll-chart", { left: oe.$x - xe + le }), X.scrollLeft = oe.$x - xe + le;
      }
    },
    [u, i]
  );
  te(() => {
    v(D);
  }, [D]);
  function x(f) {
    if (j && (f.ctrlKey || f.metaKey)) {
      f.preventDefault();
      const A = h.current, Y = -Math.sign(f.deltaY), X = f.clientX - (A ? A.getBoundingClientRect().left : 0);
      u.exec("zoom-scale", {
        dir: Y,
        offset: X
      });
    }
  }
  function z(f) {
    const A = r(f.date, f.unit);
    return A ? {
      css: A,
      width: f.width
    } : null;
  }
  const ne = $(() => L && (L.minUnit === "hour" || L.minUnit === "day") && r ? L.rows[L.rows.length - 1].cells.map(z) : null, [L, r]), ee = T(
    (f) => {
      f.eventSource = "chart", u.exec("hotkey", f);
    },
    [u]
  );
  te(() => {
    const f = h.current;
    if (!f) return;
    const A = () => _(f.clientHeight);
    A();
    const Y = new ResizeObserver(() => A());
    return Y.observe(f), () => {
      Y.disconnect();
    };
  }, [h.current]);
  const se = re(null);
  return te(() => {
    const f = h.current;
    if (f && !se.current)
      return se.current = vt(f, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (A) => ee(A)
      }), () => {
        se.current?.destroy(), se.current = null;
      };
  }, []), te(() => {
    const f = h.current;
    if (!f) return;
    const A = x;
    return f.addEventListener("wheel", A), () => {
      f.removeEventListener("wheel", A);
    };
  }, [x]), fn("chart"), /* @__PURE__ */ Te(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: h,
      onScroll: k,
      children: [
        /* @__PURE__ */ a(un, { highlightTime: r, scales: L }),
        q && q.length ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${J}px` },
            children: q.map((f, A) => /* @__PURE__ */ a(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${f.css || ""}`,
                style: { left: `${f.left}px` },
                children: /* @__PURE__ */ a("div", { className: "wx-mR7v2Xag wx-content", children: f.text })
              },
              A
            ))
          }
        ) : null,
        /* @__PURE__ */ Te(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${J}px` },
            children: [
              ne ? /* @__PURE__ */ a(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: ne.map(
                    (f, A) => f ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + f.css,
                        style: {
                          width: `${f.width}px`,
                          left: `${A * f.width}px`
                        }
                      },
                      A
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ a(on, { borders: N }),
              S && S.length ? S.map(
                (f, A) => f.$y ? /* @__PURE__ */ a(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": f.id,
                    style: Q[A]
                  },
                  f.id
                ) : null
              ) : null,
              /* @__PURE__ */ a(
                an,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: b,
                  rowMapping: w,
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
function mn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: c = "x",
    onMove: o,
    onDisplayChange: N,
    compactMode: r,
    containerWidth: b = 0,
    leftThreshold: w = 50,
    rightThreshold: y = 50
  } = t, [u, S] = tt(t.value ?? 0), [H, E] = tt(t.display ?? "all");
  function P(se) {
    let f = 0;
    n == "center" ? f = s / 2 : n == "before" && (f = s);
    const A = {
      size: [s + "px", "auto"],
      p: [se - f + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (c != "x")
      for (let Y in A) A[Y] = A[Y].reverse();
    return A;
  }
  const [i, L] = ae(!1), [q, D] = ae(null), j = re(0), p = re(), _ = re(), h = re(H);
  te(() => {
    h.current = H;
  }, [H]), te(() => {
    q === null && u > 0 && D(u);
  }, [q, u]);
  function Z(se) {
    return c == "x" ? se.clientX : se.clientY;
  }
  const Q = T(
    (se) => {
      const f = p.current + Z(se) - j.current;
      S(f);
      let A;
      f <= w ? A = "chart" : b - f <= y ? A = "grid" : A = "all", h.current !== A && (E(A), h.current = A), _.current && clearTimeout(_.current), _.current = setTimeout(() => o && o(f), 100);
    },
    [b, w, y, o]
  ), J = T(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", L(!1), window.removeEventListener("mousemove", Q), window.removeEventListener("mouseup", J);
  }, [Q]), k = $(
    () => H !== "all" ? "auto" : c == "x" ? "ew-resize" : "ns-resize",
    [H, c]
  ), ue = T(
    (se) => {
      !r && (H === "grid" || H === "chart") || (j.current = Z(se), p.current = u, L(!0), document.body.style.cursor = k, document.body.style.userSelect = "none", window.addEventListener("mousemove", Q), window.addEventListener("mouseup", J));
    },
    [k, Q, J, u, r, H]
  );
  function V() {
    E("all"), q !== null && (S(q), o && o(q));
  }
  function v(se) {
    if (r) {
      const f = H === "chart" ? "grid" : "chart";
      E(f), N(f);
    } else if (H === "grid" || H === "chart")
      V(), N("all");
    else {
      const f = se === "left" ? "chart" : "grid";
      E(f), N(f);
    }
  }
  function x() {
    v("left");
  }
  function z() {
    v("right");
  }
  const ne = $(() => P(u), [u, n, s, c]), ee = [
    "wx-resizer",
    `wx-resizer-${c}`,
    `wx-resizer-display-${H}`,
    i ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Te(
    "div",
    {
      className: "wx-pFykzMlT " + ee,
      onMouseDown: ue,
      style: { width: ne.size[0], height: ne.size[1], cursor: k },
      children: [
        /* @__PURE__ */ Te("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: x
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: z
            }
          ) })
        ] }),
        /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const xn = 650;
function Tt(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let N of o)
        if (N.target === document.body) {
          let r = N.contentRect.width <= xn;
          t(r);
        }
    }), n.observe(document.body);
  }
  function c() {
    n && (n.disconnect(), n = null);
  }
  return {
    observe: s,
    disconnect: c
  };
}
function gn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: c,
    highlightTime: o,
    onTableAPIChange: N,
    multiTaskRows: r = !1,
    rowMapping: b = null,
    marqueeSelect: w = !1
  } = t, y = Ne(We), u = G(y, "_tasks"), S = G(y, "_scales"), H = G(y, "cellHeight"), E = G(y, "columns"), P = G(y, "_scrollTask"), i = G(y, "undo"), [L, q] = ae(!1);
  let [D, j] = ae(0);
  const [p, _] = ae(0), [h, Z] = ae(0), [Q, J] = ae(void 0), [k, ue] = ae("all"), V = re(null), v = T(
    (C) => {
      q((B) => (C !== B && (C ? (V.current = k, k === "all" && ue("grid")) : (!V.current || V.current === "all") && ue("all")), C));
    },
    [k]
  );
  te(() => {
    const C = Tt(v);
    return C.observe(), () => {
      C.disconnect();
    };
  }, [v]);
  const x = $(() => {
    let C;
    return E.every((B) => B.width && !B.flexgrow) ? C = E.reduce((B, fe) => B + parseInt(fe.width), 0) : L && k === "chart" ? C = parseInt(E.find((B) => B.id === "action")?.width) || 50 : C = 440, D = C, C;
  }, [E, L, k]);
  te(() => {
    j(x);
  }, [x]);
  const z = $(
    () => (p ?? 0) - (Q ?? 0),
    [p, Q]
  ), ne = $(() => S.width, [S]), ee = $(() => {
    if (!r || !b)
      return u.length * H;
    const C = /* @__PURE__ */ new Set();
    return u.forEach((B) => {
      const fe = b.taskRows.get(B.id) ?? B.id;
      C.add(fe);
    }), C.size * H;
  }, [u, H, r, b]), se = $(
    () => S.height + ee + z,
    [S, ee, z]
  ), f = $(
    () => D + ne,
    [D, ne]
  ), A = re(null), Y = T(() => {
    Promise.resolve().then(() => {
      if ((p ?? 0) > (f ?? 0)) {
        const C = (p ?? 0) - D;
        y.exec("expand-scale", { minWidth: C });
      }
    });
  }, [p, f, D, y]);
  te(() => {
    let C;
    return A.current && (C = new ResizeObserver(Y), C.observe(A.current)), () => {
      C && C.disconnect();
    };
  }, [A.current, Y]), te(() => {
    Y();
  }, [ne]);
  const X = re(null), xe = re(null), oe = T(() => {
    const C = X.current;
    C && y.exec("scroll-chart", {
      top: C.scrollTop
    });
  }, [y]), le = re({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  te(() => {
    le.current = {
      rTasks: u,
      rScales: S,
      rCellHeight: H,
      scrollSize: z,
      ganttDiv: X.current,
      ganttHeight: h ?? 0
    };
  }, [u, S, H, z, h]);
  const ge = T(
    (C) => {
      if (!C) return;
      const {
        rTasks: B,
        rScales: fe,
        rCellHeight: $e,
        scrollSize: Me,
        ganttDiv: be,
        ganttHeight: Se
      } = le.current;
      if (!be) return;
      const { id: Le } = C, ce = B.findIndex((d) => d.id === Le);
      if (ce > -1) {
        const d = Se - fe.height, O = ce * $e, he = be.scrollTop;
        let I = null;
        O < he ? I = O : O + $e > he + d && (I = O - d + $e + Me), I !== null && (y.exec("scroll-chart", { top: Math.max(I, 0) }), X.current.scrollTop = Math.max(I, 0));
      }
    },
    [y]
  );
  te(() => {
    ge(P);
  }, [P]), te(() => {
    const C = X.current, B = xe.current;
    if (!C || !B) return;
    const fe = () => {
      Zt(() => {
        Z(C.offsetHeight), _(C.offsetWidth), J(B.offsetWidth);
      });
    }, $e = new ResizeObserver(fe);
    return $e.observe(C), () => $e.disconnect();
  }, [X.current]);
  const Ce = re(null), ve = re(null);
  return te(() => {
    ve.current && (ve.current.destroy(), ve.current = null);
    const C = Ce.current;
    if (C)
      return ve.current = vt(C, {
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
          "ctrl+z": i,
          "ctrl+y": i,
          "meta+z": i,
          "meta+shift+z": i
        },
        exec: (B) => {
          B.isInput || y.exec("hotkey", B);
        }
      }), () => {
        ve.current?.destroy(), ve.current = null;
      };
  }, [i]), /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-gantt", ref: X, onScroll: oe, children: /* @__PURE__ */ a(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: se, width: "100%" },
      ref: xe,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: h,
            width: Q
          },
          children: /* @__PURE__ */ Te("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Ce, children: [
            E.length ? /* @__PURE__ */ Te(Ye, { children: [
              /* @__PURE__ */ a(
                rn,
                {
                  display: k,
                  compactMode: L,
                  columnWidth: x,
                  width: D,
                  readonly: s,
                  fullHeight: ee,
                  onTableAPIChange: N,
                  multiTaskRows: r,
                  rowMapping: b
                }
              ),
              /* @__PURE__ */ a(
                mn,
                {
                  value: D,
                  display: k,
                  compactMode: L,
                  containerWidth: p,
                  onMove: (C) => j(C),
                  onDisplayChange: (C) => ue(C)
                }
              )
            ] }) : null,
            /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-content", ref: A, children: /* @__PURE__ */ a(
              hn,
              {
                readonly: s,
                fullWidth: ne,
                fullHeight: ee,
                taskTemplate: n,
                cellBorders: c,
                highlightTime: o,
                multiTaskRows: r,
                rowMapping: b,
                marqueeSelect: w
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function wn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function pn(t, n) {
  return typeof t == "function" ? t : Qe(t, n);
}
function $t(t, n) {
  return t.map(({ format: s, ...c }) => ({
    ...c,
    format: pn(s, n)
  }));
}
function yn(t, n) {
  const s = wn(n);
  for (let c in s)
    s[c] = Qe(s[c], t);
  return s;
}
function kn(t, n) {
  if (!t || !t.length) return t;
  const s = Qe("%d-%m-%Y", n);
  return t.map((c) => c.template ? c : c.id === "start" || c.id == "end" ? {
    ...c,
    //store locale template for unscheduled tasks
    _template: (o) => s(o),
    template: (o) => s(o)
  } : c.id === "duration" ? {
    ...c,
    _template: (o) => o,
    template: (o) => o
  } : c);
}
function bn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: $t(s.scales, n)
    }))
  } : t;
}
const vn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Tn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Xn = wt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: c = Bt,
  tasks: o = [],
  selected: N = [],
  activeTask: r = null,
  links: b = [],
  scales: w = Tn,
  columns: y = Yt,
  start: u = null,
  end: S = null,
  lengthUnit: H = "day",
  durationUnit: E = "day",
  cellWidth: P = 100,
  cellHeight: i = 38,
  scaleHeight: L = 36,
  readonly: q = !1,
  cellBorders: D = "full",
  zoom: j = !1,
  baselines: p = !1,
  highlightTime: _ = null,
  init: h = null,
  autoScale: Z = !0,
  unscheduledTasks: Q = !1,
  criticalPath: J = null,
  schedule: k = { type: "forward" },
  projectStart: ue = null,
  projectEnd: V = null,
  calendar: v = null,
  undo: x = !1,
  splitTasks: z = !1,
  multiTaskRows: ne = !1,
  marqueeSelect: ee = !1,
  ...se
}, f) {
  const A = re();
  A.current = se;
  const Y = $(() => new Kt(jt), []), X = $(() => ({ ...st, ...Ze }), []), xe = Ne(ze.i18n), oe = $(() => xe ? xe.extend(X, !0) : Ue(X), [xe, X]), le = $(() => oe.getRaw().calendar, [oe]), ge = $(() => {
    let ce = {
      zoom: bn(j, le),
      scales: $t(w, le),
      columns: kn(y, le),
      links: Ot(b),
      cellWidth: P
    };
    return ce.zoom && (ce = {
      ...ce,
      ...Vt(
        ce.zoom,
        yn(le, oe.getGroup("gantt")),
        ce.scales,
        P
      )
    }), ce;
  }, [j, w, y, b, P, le, oe]), Ce = re(null);
  Ce.current !== o && (ut(o, { durationUnit: E, splitTasks: z, calendar: v }), Ce.current = o), te(() => {
    ut(o, { durationUnit: E, splitTasks: z, calendar: v });
  }, [o, E, v, z]);
  const ve = $(() => {
    if (!ne) return null;
    const ce = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), O = (he) => {
      he.forEach((I) => {
        const pe = I.row ?? I.id;
        d.set(I.id, pe), ce.has(pe) || ce.set(pe, []), ce.get(pe).push(I.id), I.data && I.data.length > 0 && O(I.data);
      });
    };
    return O(o), { rowMap: ce, taskRows: d };
  }, [o, ne]), C = $(() => Y.in, [Y]), B = re(null);
  B.current === null && (B.current = new _t((ce, d) => {
    const O = "on" + vn(ce);
    A.current && A.current[O] && A.current[O](d);
  }), C.setNext(B.current));
  const [fe, $e] = ae(null), Me = re(null);
  Me.current = fe;
  const be = $(
    () => ({
      getState: Y.getState.bind(Y),
      getReactiveState: Y.getReactive.bind(Y),
      getStores: () => ({ data: Y }),
      exec: C.exec,
      setNext: (ce) => (B.current = B.current.setNext(ce), B.current),
      intercept: C.intercept.bind(C),
      on: C.on.bind(C),
      detach: C.detach.bind(C),
      getTask: Y.getTask.bind(Y),
      serialize: Y.serialize.bind(Y),
      getTable: (ce) => ce ? new Promise((d) => setTimeout(() => d(Me.current), 1)) : Me.current,
      getHistory: () => Y.getHistory()
    }),
    [Y, C]
  );
  pt(
    f,
    () => ({
      ...be
    }),
    [be]
  );
  const Se = re(0);
  te(() => {
    Se.current ? Y.init({
      tasks: o,
      links: ge.links,
      start: u,
      columns: ge.columns,
      end: S,
      lengthUnit: H,
      cellWidth: ge.cellWidth,
      cellHeight: i,
      scaleHeight: L,
      scales: ge.scales,
      taskTypes: c,
      zoom: ge.zoom,
      selected: N,
      activeTask: r,
      baselines: p,
      autoScale: Z,
      unscheduledTasks: Q,
      markers: s,
      durationUnit: E,
      criticalPath: J,
      schedule: k,
      projectStart: ue,
      projectEnd: V,
      calendar: v,
      undo: x,
      _weekStart: le.weekStart,
      splitTasks: z
    }) : h && h(be), Se.current++;
  }, [
    be,
    h,
    o,
    ge,
    u,
    S,
    H,
    i,
    L,
    c,
    N,
    r,
    p,
    Z,
    Q,
    s,
    E,
    J,
    k,
    ue,
    V,
    v,
    x,
    le,
    z,
    Y
  ]), Se.current === 0 && Y.init({
    tasks: o,
    links: ge.links,
    start: u,
    columns: ge.columns,
    end: S,
    lengthUnit: H,
    cellWidth: ge.cellWidth,
    cellHeight: i,
    scaleHeight: L,
    scales: ge.scales,
    taskTypes: c,
    zoom: ge.zoom,
    selected: N,
    activeTask: r,
    baselines: p,
    autoScale: Z,
    unscheduledTasks: Q,
    markers: s,
    durationUnit: E,
    criticalPath: J,
    schedule: k,
    projectStart: ue,
    projectEnd: V,
    calendar: v,
    undo: x,
    _weekStart: le.weekStart,
    splitTasks: z
  });
  const Le = $(() => v ? (ce, d) => d == "day" && !v.getDayHours(ce) || d == "hour" && !v.getDayHours(ce) ? "wx-weekend" : "" : _, [v, _]);
  return /* @__PURE__ */ a(ze.i18n.Provider, { value: oe, children: /* @__PURE__ */ a(We.Provider, { value: be, children: /* @__PURE__ */ a(
    gn,
    {
      taskTemplate: n,
      readonly: q,
      cellBorders: D,
      highlightTime: Le,
      onTableAPIChange: $e,
      multiTaskRows: ne,
      rowMapping: ve,
      marqueeSelect: ee
    }
  ) }) });
});
function Fn({ api: t = null, items: n = [] }) {
  const s = Ne(ze.i18n), c = $(() => s || Ue(Ze), [s]), o = $(() => c.getGroup("gantt"), [c]), N = Ge(t, "_selected"), r = Ge(t, "undo"), b = Ge(t, "history"), w = Ge(t, "splitTasks"), y = ["undo", "redo"], u = $(() => {
    const H = dt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : dt({
      undo: r,
      splitTasks: w
    })).map((P) => {
      let i = { ...P, disabled: !1 };
      return i.handler = bt(H, i.id) ? (L) => kt(t, L.id, null, o) : i.handler, i.text && (i.text = o(i.text)), i.menuText && (i.menuText = o(i.menuText)), i;
    });
  }, [n, t, o, r, w]), S = $(() => {
    const H = [];
    return u.forEach((E) => {
      const P = E.id;
      if (P === "add-task")
        H.push(E);
      else if (y.includes(P))
        y.includes(P) && H.push({
          ...E,
          disabled: E.isDisabled(b)
        });
      else {
        if (!N?.length || !t) return;
        H.push({
          ...E,
          disabled: E.isDisabled && N.some((i) => E.isDisabled(i, t.getState()))
        });
      }
    }), H.filter((E, P) => {
      if (t && E.isHidden)
        return !N.some((i) => E.isHidden(i, t.getState()));
      if (E.comp === "separator") {
        const i = H[P + 1];
        if (!i || i.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, N, b, u]);
  return s ? /* @__PURE__ */ a(ht, { items: S }) : /* @__PURE__ */ a(ze.i18n.Provider, { value: c, children: /* @__PURE__ */ a(ht, { items: S }) });
}
const Kn = wt(function({
  options: n = [],
  api: s = null,
  resolver: c = null,
  filter: o = null,
  at: N = "point",
  children: r,
  onClick: b,
  css: w
}, y) {
  const u = re(null), S = re(null), H = Ne(ze.i18n), E = $(() => H || Ue({ ...Ze, ...st }), [H]), P = $(() => E.getGroup("gantt"), [E]), i = Ge(s, "taskTypes"), L = Ge(s, "selected"), q = Ge(s, "_selected"), D = Ge(s, "splitTasks"), j = $(() => ft({ splitTasks: !0 }), []);
  te(() => {
    s && (s.on("scroll-chart", () => {
      u.current && u.current.show && u.current.show();
    }), s.on("drag-task", () => {
      u.current && u.current.show && u.current.show();
    }));
  }, [s]);
  function p(v) {
    return v.map((x) => (x = { ...x }, x.text && (x.text = P(x.text)), x.subtext && (x.subtext = P(x.subtext)), x.data && (x.data = p(x.data)), x));
  }
  function _() {
    const v = n.length ? n : ft({ splitTasks: D }), x = v.find((z) => z.id === "convert-task");
    return x && (x.data = [], (i || []).forEach((z) => {
      x.data.push(x.dataFactory(z));
    })), p(v);
  }
  const h = $(() => _(), [s, n, i, D, P]), Z = $(
    () => q && q.length ? q : [],
    [q]
  ), Q = T(
    (v, x) => {
      let z = v ? s?.getTask(v) : null;
      if (c) {
        const ne = c(v, x);
        z = ne === !0 ? z : ne;
      }
      if (z) {
        const ne = Ke(x.target, "data-segment");
        ne !== null ? S.current = { id: z.id, segmentIndex: ne } : S.current = z.id, (!Array.isArray(L) || !L.includes(z.id)) && s && s.exec && s.exec("select-task", { id: z.id });
      }
      return z;
    },
    [s, c, L]
  ), J = T(
    (v) => {
      const x = v.action;
      x && (bt(j, x.id) && kt(s, x.id, S.current, P), b && b(v));
    },
    [s, P, b, j]
  ), k = T(
    (v, x) => {
      const z = Z.length ? Z : x ? [x] : [];
      let ne = o ? z.every((ee) => o(v, ee)) : !0;
      if (ne && (v.isHidden && (ne = !z.some(
        (ee) => v.isHidden(ee, s.getState(), S.current)
      )), v.isDisabled)) {
        const ee = z.some(
          (se) => v.isDisabled(se, s.getState(), S.current)
        );
        v.disabled = ee;
      }
      return ne;
    },
    [o, Z, s]
  );
  pt(y, () => ({
    show: (v, x) => {
      u.current && u.current.show && u.current.show(v, x);
    }
  }));
  const ue = T((v) => {
    u.current && u.current.show && u.current.show(v);
  }, []), V = /* @__PURE__ */ Te(Ye, { children: [
    /* @__PURE__ */ a(
      Jt,
      {
        filter: k,
        options: h,
        dataKey: "id",
        resolver: Q,
        onClick: J,
        at: N,
        ref: u,
        css: w
      }
    ),
    /* @__PURE__ */ a("span", { onContextMenu: ue, "data-menu-ignore": "true", children: typeof r == "function" ? r() : r })
  ] });
  if (!H && ze.i18n?.Provider) {
    const v = ze.i18n.Provider;
    return /* @__PURE__ */ a(v, { value: E, children: V });
  }
  return V;
});
function $n({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Ne(ze.i18n).getGroup("gantt"), N = G(t, "activeTask"), r = G(t, "_activeTask"), b = G(t, "_links"), w = G(t, "schedule"), y = G(t, "unscheduledTasks"), [u, S] = ae();
  function H() {
    if (N) {
      const L = b.filter((D) => D.target == N).map((D) => ({ link: D, task: t.getTask(D.source) })), q = b.filter((D) => D.source == N).map((D) => ({ link: D, task: t.getTask(D.target) }));
      return [
        { title: o("Predecessors"), data: L },
        { title: o("Successors"), data: q }
      ];
    }
  }
  te(() => {
    S(H());
  }, [N, b]);
  const E = $(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function P(L) {
    n ? t.exec("delete-link", { id: L }) : (S(
      (q) => (q || []).map((D) => ({
        ...D,
        data: D.data.filter((j) => j.link.id !== L)
      }))
    ), s && s({
      id: L,
      action: "delete-link",
      data: { id: L }
    }));
  }
  function i(L, q) {
    n ? t.exec("update-link", {
      id: L,
      link: q
    }) : (S(
      (D) => (D || []).map((j) => ({
        ...j,
        data: j.data.map(
          (p) => p.link.id === L ? { ...p, link: { ...p.link, ...q } } : p
        )
      }))
    ), s && s({
      id: L,
      action: "update-link",
      data: {
        id: L,
        link: q
      }
    }));
  }
  return /* @__PURE__ */ a(Ye, { children: (u || []).map(
    (L, q) => L.data.length ? /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ a(Et, { label: L.title, position: "top", children: /* @__PURE__ */ a("table", { children: /* @__PURE__ */ a("tbody", { children: L.data.map((D) => /* @__PURE__ */ Te("tr", { children: [
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-task-name", children: D.task.text || "" }) }),
      w?.auto && D.link.type === "e2s" ? /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ a(
        Nt,
        {
          type: "number",
          placeholder: o("Lag"),
          value: D.link.lag,
          disabled: y && r?.unscheduled,
          onChange: (j) => {
            j.input || i(D.link.id, { lag: j.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ a(
        St,
        {
          value: D.link.type,
          placeholder: o("Select link type"),
          options: E,
          onChange: (j) => i(D.link.id, { type: j.value }),
          children: ({ option: j }) => j.label
        }
      ) }) }),
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => P(D.link.id),
          role: "button"
        }
      ) })
    ] }, D.link.id)) }) }) }) }, q) : null
  ) });
}
function Cn(t) {
  const { value: n, time: s, format: c, onchange: o, onChange: N, ...r } = t, b = N ?? o;
  function w(y) {
    const u = new Date(y.value);
    u.setHours(n.getHours()), u.setMinutes(n.getMinutes()), b && b({ value: u });
  }
  return /* @__PURE__ */ Te("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ a(
      Lt,
      {
        ...r,
        value: n,
        onChange: w,
        format: c,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ a(Dt, { value: n, onChange: b, format: c }) : null
  ] });
}
Oe("select", It);
Oe("date", Cn);
Oe("twostate", Ht);
Oe("slider", zt);
Oe("counter", Gt);
Oe("links", $n);
function On({
  api: t,
  items: n = [],
  css: s = "",
  layout: c = "default",
  readonly: o = !1,
  placement: N = "sidebar",
  bottomBar: r = !0,
  topBar: b = !0,
  autoSave: w = !0,
  focus: y = !1,
  hotkeys: u = {}
}) {
  const S = Ne(ze.i18n), H = $(() => S || Ue({ ...Ze, ...st }), [S]), E = $(() => H.getGroup("gantt"), [H]), P = H.getRaw(), i = $(() => {
    const d = P.gantt?.dateFormat || P.formats?.dateFormat;
    return Qe(d, P.calendar);
  }, [P]), L = $(() => {
    if (b === !0 && !o) {
      const d = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: E("Delete"),
          id: "delete"
        }
      ];
      return w ? { items: d } : {
        items: [
          ...d,
          {
            comp: "button",
            type: "primary",
            text: E("Save"),
            id: "save"
          }
        ]
      };
    }
    return b;
  }, [b, o, w, E]), [q, D] = ae(!1), j = $(
    () => q ? "wx-full-screen" : "",
    [q]
  ), p = T((d) => {
    D(d);
  }, []);
  te(() => {
    const d = Tt(p);
    return d.observe(), () => {
      d.disconnect();
    };
  }, [p]);
  const _ = G(t, "_activeTask"), h = G(t, "activeTask"), Z = G(t, "unscheduledTasks"), Q = G(t, "links"), J = G(t, "splitTasks"), k = $(
    () => J && h?.segmentIndex,
    [J, h]
  ), ue = $(
    () => k || k === 0,
    [k]
  ), V = $(
    () => qt({ unscheduledTasks: Z }),
    [Z]
  ), v = G(t, "undo"), [x, z] = ae({}), [ne, ee] = ae(null), [se, f] = ae(), [A, Y] = ae(null), X = G(t, "taskTypes"), xe = $(() => {
    if (!_) return null;
    let d;
    if (ue && _.segments ? d = { ..._.segments[k] } : d = { ..._ }, o) {
      let O = { parent: d.parent };
      return V.forEach(({ key: he, comp: I }) => {
        if (I !== "links") {
          const pe = d[he];
          I === "date" && pe instanceof Date ? O[he] = i(pe) : I === "slider" && he === "progress" ? O[he] = `${pe}%` : O[he] = pe;
        }
      }), O;
    }
    return d || null;
  }, [_, ue, k, o, V, i]);
  te(() => {
    f(xe);
  }, [xe]), te(() => {
    z({}), Y(null), ee(null);
  }, [h]);
  function oe(d, O) {
    return d.map((he) => {
      const I = { ...he };
      if (he.config && (I.config = { ...I.config }), I.comp === "links" && t && (I.api = t, I.autoSave = w, I.onLinksChange = Ce), I.comp === "select" && I.key === "type") {
        const pe = I.options ?? (X || []);
        I.options = pe.map((Ie) => ({
          ...Ie,
          label: E(Ie.label)
        }));
      }
      return I.comp === "slider" && I.key === "progress" && (I.labelTemplate = (pe) => `${E(I.label)} ${pe}%`), I.label && (I.label = E(I.label)), I.config?.placeholder && (I.config.placeholder = E(I.config.placeholder)), O && (I.isDisabled && I.isDisabled(O, t.getState()) ? I.disabled = !0 : delete I.disabled), I;
    });
  }
  const le = $(() => {
    let d = n.length ? n : V;
    return d = oe(d, se), se ? d.filter(
      (O) => !O.isHidden || !O.isHidden(se, t.getState())
    ) : d;
  }, [n, V, se, X, E, t, w]), ge = $(
    () => le.map((d) => d.key),
    [le]
  );
  function Ce({ id: d, action: O, data: he }) {
    z((I) => ({
      ...I,
      [d]: { action: O, data: he }
    }));
  }
  const ve = T(() => {
    for (let d in x)
      if (Q.byId(d)) {
        const { action: O, data: he } = x[d];
        t.exec(O, he);
      }
  }, [t, x, Q]), C = T(() => {
    const d = h?.id || h;
    if (ue) {
      if (_?.segments) {
        const O = _.segments.filter(
          (he, I) => I !== k
        );
        t.exec("update-task", {
          id: d,
          task: { segments: O }
        });
      }
    } else
      t.exec("delete-task", { id: d });
  }, [t, h, ue, _, k]), B = T(() => {
    t.exec("show-editor", { id: null });
  }, [t]), fe = T(
    (d) => {
      const { item: O, changes: he } = d;
      O.id === "delete" && C(), O.id === "save" && (he.length ? B() : ve()), O.comp && B();
    },
    [t, h, w, ve, C, B]
  ), $e = T(
    (d, O, he) => (Z && d.type === "summary" && (d.unscheduled = !1), yt(d, t.getState(), O), he || ee(!1), d),
    [Z, t]
  ), Me = T(
    (d) => {
      d = {
        ...d,
        unscheduled: Z && d.unscheduled && d.type !== "summary"
      }, delete d.links, delete d.data, (ge.indexOf("duration") === -1 || d.segments && !d.duration) && delete d.duration;
      const O = {
        id: h?.id || h,
        task: d,
        ...ue && { segmentIndex: k }
      };
      w && ne && (O.inProgress = ne), t.exec("update-task", O), w || ve();
    },
    [
      t,
      h,
      Z,
      w,
      ve,
      ge,
      ue,
      k,
      ne
    ]
  ), be = T(
    (d) => {
      let { update: O, key: he, input: I } = d;
      if (I && ee(!0), d.update = $e({ ...O }, he, I), !w) f(d.update);
      else if (!A && !I) {
        const pe = le.find((Fe) => Fe.key === he), Ie = O[he];
        (!pe.validation || pe.validation(Ie)) && (!pe.required || Ie) && Me(d.update);
      }
    },
    [w, $e, A, le, Me]
  ), Se = T(
    (d) => {
      w || Me(d.values);
    },
    [w, Me]
  ), Le = T((d) => {
    Y(d.errors);
  }, []), ce = $(
    () => v ? {
      "ctrl+z": (d) => {
        d.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (d) => {
        d.preventDefault(), t.exec("redo");
      }
    } : {},
    [v, t]
  );
  return xe ? /* @__PURE__ */ a(At, { children: /* @__PURE__ */ a(
    en,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${j} ${s}`,
      items: le,
      values: xe,
      topBar: L,
      bottomBar: r,
      placement: N,
      layout: c,
      readonly: o,
      autoSave: w,
      focus: y,
      onAction: fe,
      onSave: Se,
      onValidation: Le,
      onChange: be,
      hotkeys: u && { ...ce, ...u }
    }
  ) }) : null;
}
const Vn = ({ children: t, columns: n = null, api: s }) => {
  const [c, o] = ae(null);
  return te(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ a(Ut, { api: c, columns: n, children: t });
};
function Yn(t) {
  const { api: n, content: s, children: c } = t, o = re(null), N = re(null), [r, b] = ae({}), [w, y] = ae(null), [u, S] = ae({});
  function H(p) {
    for (; p; ) {
      if (p.getAttribute) {
        const _ = p.getAttribute("data-tooltip-id"), h = p.getAttribute("data-tooltip-at"), Z = p.getAttribute("data-tooltip");
        if (_ || Z) return { id: _, tooltip: Z, target: p, at: h };
      }
      p = p.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  te(() => {
    const p = N.current;
    if (p && u && (u.text || s)) {
      const _ = p.getBoundingClientRect();
      let h = !1, Z = u.left, Q = u.top;
      _.right >= r.right && (Z = r.width - _.width - 5, h = !0), _.bottom >= r.bottom && (Q = u.top - (_.bottom - r.bottom + 2), h = !0), h && S((J) => J && { ...J, left: Z, top: Q });
    }
  }, [u, r, s]);
  const E = re(null), P = 300, i = (p) => {
    clearTimeout(E.current), E.current = setTimeout(() => {
      p();
    }, P);
  };
  function L(p) {
    let { id: _, tooltip: h, target: Z, at: Q } = H(p.target);
    if (S(null), y(null), !h)
      if (_)
        h = D(_);
      else {
        clearTimeout(E.current);
        return;
      }
    const J = p.clientX;
    i(() => {
      _ && y(q(j(_)));
      const k = Z.getBoundingClientRect(), ue = o.current, V = ue ? ue.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let v, x;
      Q === "left" ? (v = k.top + 5 - V.top, x = k.right + 5 - V.left) : (v = k.top + k.height - V.top, x = J - V.left), b(V), S({ top: v, left: x, text: h });
    });
  }
  function q(p) {
    return n?.getTask(j(p)) || null;
  }
  function D(p) {
    return q(p)?.text || "";
  }
  function j(p) {
    const _ = parseInt(p);
    return isNaN(_) ? p : _;
  }
  return /* @__PURE__ */ Te(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: L,
      children: [
        u && (u.text || s) ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: N,
            style: { top: `${u.top}px`, left: `${u.left}px` },
            children: s ? /* @__PURE__ */ a(s, { data: w }) : u.text ? /* @__PURE__ */ a("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: u.text }) : null
          }
        ) : null,
        c
      ]
    }
  );
}
function Bn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(it, { fonts: t, children: n() }) : /* @__PURE__ */ a(it, { fonts: t });
}
function qn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ct, { fonts: t, children: n }) : /* @__PURE__ */ a(ct, { fonts: t });
}
function jn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(at, { fonts: t, children: n }) : /* @__PURE__ */ a(at, { fonts: t });
}
export {
  Kn as ContextMenu,
  On as Editor,
  Xn as Gantt,
  Vn as HeaderMenu,
  Bn as Material,
  Fn as Toolbar,
  Yn as Tooltip,
  qn as Willow,
  jn as WillowDark,
  Zn as defaultColumns,
  Jn as defaultEditorItems,
  es as defaultMenuOptions,
  ts as defaultTaskTypes,
  ns as defaultToolbarButtons,
  ss as getEditorItems,
  rs as getMenuOptions,
  os as getToolbarButtons,
  cs as registerEditorItem,
  ls as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
