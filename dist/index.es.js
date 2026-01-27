import { jsxs as Me, jsx as a, Fragment as Ve } from "react/jsx-runtime";
import { createContext as Nt, useMemo as v, useState as he, useContext as Le, useCallback as M, useRef as ie, useEffect as se, Fragment as St, forwardRef as bt, useImperativeHandle as vt } from "react";
import { context as ze, Button as dt, Field as Lt, Text as It, Combo as At, DatePicker as Dt, TimePicker as Ht, Locale as zt, RichSelect as Gt, TwoState as Wt, Slider as Pt, Counter as _t, Material as ut, Willow as ft, WillowDark as ht } from "@svar-ui/react-core";
import { locate as He, locateID as Fe, locateAttr as Yt, dateToString as Ue, locale as Ze } from "@svar-ui/lib-dom";
import { en as Je } from "@svar-ui/gantt-locales";
import { en as rt } from "@svar-ui/core-locales";
import { EventBusRouter as Xt } from "@svar-ui/lib-state";
import { prepareEditTask as Tt, grid as Ft, extendDragOptions as Kt, isSegmentMoveAllowed as Ot, DataStore as Vt, normalizeLinks as Bt, normalizeZoom as qt, defaultColumns as jt, parseTaskDates as mt, defaultTaskTypes as Qt, getToolbarButtons as xt, handleAction as $t, isHandledAction as Mt, getMenuOptions as gt, getEditorItems as Ut } from "@svar-ui/gantt-store";
import { defaultColumns as ts, defaultEditorItems as ns, defaultMenuOptions as ss, defaultTaskTypes as rs, defaultToolbarButtons as os, getEditorItems as is, getMenuOptions as ls, getToolbarButtons as cs, registerScaleUnit as as } from "@svar-ui/gantt-store";
import { useWritableProp as st, useStore as _, useStoreWithCounter as Qe, writable as Zt, useStoreLater as Pe } from "@svar-ui/lib-react";
import { hotkeys as Ct } from "@svar-ui/grid-store";
import { Grid as Jt, HeaderMenu as en } from "@svar-ui/react-grid";
import { flushSync as tn } from "react-dom";
import { Toolbar as wt } from "@svar-ui/react-toolbar";
import { ContextMenu as nn } from "@svar-ui/react-menu";
import { Editor as sn, registerEditorItem as Ke } from "@svar-ui/react-editor";
import { registerEditorItem as us } from "@svar-ui/react-editor";
const _e = Nt(null);
function Ye(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function rn(t, n, s) {
  const l = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: l.top - o.top,
    left: l.left - o.left,
    dt: l.bottom - s.clientY,
    db: s.clientY - l.top
  };
}
function pt(t) {
  return t && t.getAttribute("data-context-id");
}
const yt = 5;
function on(t, n) {
  let s, l, o, E, r, g, x, y, d;
  function S(w) {
    E = w.clientX, r = w.clientY, g = {
      ...rn(s, t, w),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function W(w) {
    s = He(w), pt(s) && (o = Ye(s), d = setTimeout(() => {
      y = !0, n && n.touchStart && n.touchStart(), S(w.touches[0]);
    }, 500), t.addEventListener("touchmove", z), t.addEventListener("contextmenu", R), window.addEventListener("touchend", q));
  }
  function R(w) {
    if (y || d)
      return w.preventDefault(), !1;
  }
  function X(w) {
    w.which === 1 && (s = He(w), pt(s) && (o = Ye(s), t.addEventListener("mousemove", B), window.addEventListener("mouseup", k), S(w)));
  }
  function c(w) {
    t.removeEventListener("mousemove", B), t.removeEventListener("touchmove", z), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", q), document.body.style.userSelect = "", w && (t.removeEventListener("mousedown", X), t.removeEventListener("touchstart", W));
  }
  function H(w) {
    const F = w.clientX - E, J = w.clientY - r;
    if (!l) {
      if (Math.abs(F) < yt && Math.abs(J) < yt || n && n.start && n.start({ id: o, e: w }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = g.left + "px", l.style.top = g.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const re = Math.round(Math.max(0, g.top + J));
      if (n && n.move && n.move({ id: o, top: re, detail: x }) === !1)
        return;
      const K = n.getTask(o), L = K.$y;
      if (!g.start && g.y == L) return G();
      g.start = !0, g.y = K.$y - 4, l.style.top = re + "px";
      const le = document.elementFromPoint(
        w.clientX,
        w.clientY
      ), p = He(le);
      if (p && p !== s) {
        const b = Ye(p), A = p.getBoundingClientRect(), U = A.top + A.height / 2, ce = w.clientY + g.db > U && p.nextElementSibling !== s, ee = w.clientY - g.dt < U && p.previousElementSibling !== s;
        x?.after == b || x?.before == b ? x = null : ce ? x = { id: o, after: b } : ee && (x = { id: o, before: b });
      }
    }
  }
  function B(w) {
    H(w);
  }
  function z(w) {
    y ? (w.preventDefault(), H(w.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function q() {
    y = null, d && (clearTimeout(d), d = null), G();
  }
  function k() {
    G();
  }
  function G() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: o, top: g.top })), o = s = l = g = x = null, c();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", X), t.addEventListener("touchstart", W), {
    destroy() {
      c(!0);
    }
  };
}
function ln({ row: t, column: n }) {
  function s(o, E) {
    return {
      justifyContent: E.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ Me("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
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
function kt({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ a("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ a(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function cn(t) {
  const {
    readonly: n,
    compactMode: s,
    width: l = 0,
    display: o = "all",
    columnWidth: E = 0,
    onTableAPIChange: r,
    multiTaskRows: g = !1,
    rowMapping: x = null
  } = t, [y, d] = st(E), [S, W] = he(), R = Le(ze.i18n), X = v(() => R.getGroup("gantt"), [R]), c = Le(_e), H = _(c, "scrollTop"), B = _(c, "cellHeight"), z = _(c, "_scrollTask"), q = _(c, "_selected"), k = _(c, "area"), G = _(c, "_tasks"), w = _(c, "_scales"), F = _(c, "columns"), J = _(c, "_sort"), re = _(c, "calendar"), K = _(c, "durationUnit"), L = _(c, "splitTasks"), [le, p] = he(null), b = v(() => !G || !k ? [] : G.slice(k.start, k.end), [G, k]), A = M(
    (i, m) => {
      if (m === "add-task")
        c.exec(m, {
          target: i,
          task: { text: X("New Task") },
          mode: "child",
          show: !0
        });
      else if (m === "open-task") {
        const $ = b.find((V) => V.id === i);
        ($?.data || $?.lazy) && c.exec(m, { id: i, mode: !$.open });
      }
    },
    [b]
  ), U = M(
    (i) => {
      const m = Fe(i), $ = i.target.dataset.action;
      $ && i.preventDefault(), m ? $ === "add-task" || $ === "open-task" ? A(m, $) : c.exec("select-task", {
        id: m,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : $ === "add-task" && A(null, $);
    },
    [c, A]
  ), ce = ie(null), ee = ie(null), [ue, Z] = he(0), [u, P] = he(!1);
  se(() => {
    const i = ee.current;
    if (!i || typeof ResizeObserver > "u") return;
    const m = () => Z(i.clientWidth);
    m();
    const $ = new ResizeObserver(m);
    return $.observe(i), () => $.disconnect();
  }, []);
  const Y = ie(null), te = M(
    (i) => {
      const m = i.id, { before: $, after: V } = i, ge = i.onMove;
      let me = $ || V, Te = $ ? "before" : "after";
      if (ge) {
        if (Te === "after") {
          const Ee = c.getTask(me);
          Ee.data?.length && Ee.open && (Te = "before", me = Ee.data[0].id);
        }
        Y.current = { id: m, [Te]: me };
      } else Y.current = null;
      c.exec("move-task", {
        id: m,
        mode: Te,
        target: me,
        inProgress: ge
      });
    },
    [c]
  ), O = v(() => k?.from ?? 0, [k]), oe = v(() => w?.height ?? 0, [w]), pe = v(() => !s && o !== "grid" ? (y ?? 0) > (l ?? 0) : (y ?? 0) > (ue ?? 0), [s, o, y, l, ue]), ve = v(() => {
    const i = {};
    return pe && o === "all" || o === "grid" && pe ? i.width = y : o === "grid" && (i.width = "100%"), i;
  }, [pe, o, y]), N = v(() => le && !b.find((i) => i.id === le.id) ? [...b, le] : b, [b, le]), j = v(() => {
    if (!g || !x) return N;
    const i = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
    return N.forEach(($) => {
      const V = x.taskRows.get($.id) ?? $.id;
      m.has(V) || (i.set(V, {
        ...$,
        $rowTasks: x.rowMap.get(V) || [$.id]
      }), m.add(V));
    }), Array.from(i.values());
  }, [N, g, x]), xe = v(() => {
    let i = (F || []).map((V) => {
      V = { ...V };
      const ge = V.header;
      if (typeof ge == "object") {
        const me = ge.text && X(ge.text);
        V.header = { ...ge, text: me };
      } else V.header = X(ge);
      return V;
    });
    const m = i.findIndex((V) => V.id === "text"), $ = i.findIndex((V) => V.id === "add-task");
    if (m !== -1 && (i[m].cell && (i[m]._cell = i[m].cell), i[m].cell = ln), $ !== -1) {
      i[$].cell = i[$].cell || kt;
      const V = i[$].header;
      if (typeof V != "object" && (i[$].header = { text: V }), i[$].header.cell = V.cell || kt, n)
        i.splice($, 1);
      else if (s) {
        const [ge] = i.splice($, 1);
        i.unshift(ge);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [F, X, n, s]), be = v(() => o === "all" ? `${l}px` : o === "grid" ? "calc(100% - 4px)" : xe.find((i) => i.id === "add-task") ? "50px" : "0", [o, l, xe]), Ce = v(() => {
    if (j && J?.length) {
      const i = {};
      return J.forEach(({ key: m, order: $ }, V) => {
        i[m] = {
          order: $,
          ...J.length > 1 && { index: V }
        };
      }), i;
    }
    return {};
  }, [j, J]), $e = M(() => xe.some((i) => i.flexgrow && !i.hidden), []), Re = v(() => $e(), [$e, u]), Se = v(() => {
    let i = o === "chart" ? xe.filter(($) => $.id === "add-task") : xe;
    const m = o === "all" ? l : ue;
    if (!Re) {
      let $ = y, V = !1;
      if (xe.some((ge) => ge.$width)) {
        let ge = 0;
        $ = xe.reduce((me, Te) => (Te.hidden || (ge += Te.width, me += Te.$width || Te.width), me), 0), ge > $ && $ > m && (V = !0);
      }
      if (V || $ < m) {
        let ge = 1;
        return V || (ge = (m - 50) / ($ - 50 || 1)), i.map((me) => (me.id !== "add-task" && !me.hidden && (me.$width || (me.$width = me.width), me.width = me.$width * ge), me));
      }
    }
    return i;
  }, [o, xe, Re, y, l, ue]), de = M(
    (i) => {
      if (!$e()) {
        const m = Se.reduce(($, V) => (i && V.$width && (V.$width = V.width), $ + (V.hidden ? 0 : V.width)), 0);
        m !== y && d(m);
      }
      P(!0), P(!1);
    },
    [$e, Se, y, d]
  ), f = M(() => {
    xe.filter((m) => m.flexgrow && !m.hidden).length === 1 && xe.forEach((m) => {
      m.$width && !m.flexgrow && !m.hidden && (m.width = m.$width);
    });
  }, []), Q = M(
    (i) => {
      if (!n) {
        const m = Fe(i), $ = Yt(i, "data-col-id");
        !($ && xe.find((ge) => ge.id == $))?.editor && m && c.exec("show-editor", { id: m });
      }
    },
    [c, n]
    // cols is defined later; relies on latest value at call time
  ), fe = v(
    () => Array.isArray(q) ? q.map((i) => i.id) : [],
    [q]
  ), C = M(() => {
    if (ce.current && j !== null) {
      const i = ce.current.querySelector(".wx-body");
      i && (i.style.top = -((H ?? 0) - (O ?? 0)) + "px");
    }
    ee.current && (ee.current.scrollTop = 0);
  }, [j, H, O]);
  se(() => {
    ce.current && C();
  }, [H, O, C]), se(() => {
    const i = ce.current;
    if (!i) return;
    const m = i.querySelector(".wx-table-box .wx-body");
    if (!m || typeof ResizeObserver > "u") return;
    const $ = new ResizeObserver(() => {
      C();
    });
    return $.observe(m), () => {
      $.disconnect();
    };
  }, [Se, ve, o, be, j, C]), se(() => {
    if (!z || !S) return;
    const { id: i } = z, m = S.getState().focusCell;
    m && m.row !== i && ce.current && ce.current.contains(document.activeElement) && S.exec("focus-cell", {
      row: i,
      column: m.column
    });
  }, [z, S]);
  const ke = M(
    ({ id: i }) => {
      if (n) return !1;
      c.getTask(i).open && c.exec("open-task", { id: i, mode: !1 });
      const m = c.getState()._tasks.find(($) => $.id === i);
      if (p(m || null), !m) return !1;
    },
    [c, n]
  ), De = M(
    ({ id: i, top: m }) => {
      Y.current ? te({ ...Y.current, onMove: !1 }) : c.exec("drag-task", {
        id: i,
        top: m + (O ?? 0),
        inProgress: !1
      }), p(null);
    },
    [c, te, O]
  ), Oe = M(
    ({ id: i, top: m, detail: $ }) => {
      $ && te({ ...$, onMove: !0 }), c.exec("drag-task", {
        id: i,
        top: m + (O ?? 0),
        inProgress: !0
      });
    },
    [c, te, O]
  );
  se(() => {
    const i = ce.current;
    return i ? on(i, {
      start: ke,
      end: De,
      move: Oe,
      getTask: c.getTask
    }).destroy : void 0;
  }, [c, ke, De, Oe]);
  const We = M(
    (i) => {
      const { key: m, isInput: $ } = i;
      if (!$ && (m === "arrowup" || m === "arrowdown"))
        return i.eventSource = "grid", c.exec("hotkey", i), !1;
      if (m === "enter") {
        const V = S?.getState().focusCell;
        if (V) {
          const { row: ge, column: me } = V;
          me === "add-task" ? A(ge, "add-task") : me === "text" && A(ge, "open-task");
        }
      }
    },
    [c, A, S]
  ), Ie = ie(null), Be = () => {
    Ie.current = {
      setTableAPI: W,
      handleHotkey: We,
      sortVal: J,
      api: c,
      adjustColumns: f,
      setColumnWidth: de,
      tasks: b,
      calendarVal: re,
      durationUnitVal: K,
      splitTasksVal: L,
      onTableAPIChange: r
    };
  };
  Be(), se(() => {
    Be();
  }, [
    W,
    We,
    J,
    c,
    f,
    de,
    b,
    re,
    K,
    L,
    r
  ]);
  const et = M((i) => {
    W(i), i.intercept("hotkey", (m) => Ie.current.handleHotkey(m)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (m) => {
      const $ = Ie.current.sortVal, { key: V, add: ge } = m, me = $ ? $.find((Ee) => Ee.key === V) : null;
      let Te = "asc";
      return me && (Te = !me || me.order === "asc" ? "desc" : "asc"), c.exec("sort-tasks", {
        key: V,
        order: Te,
        add: ge
      }), !1;
    }), i.on("resize-column", () => {
      Ie.current.setColumnWidth(!0);
    }), i.on("hide-column", (m) => {
      m.mode || Ie.current.adjustColumns(), Ie.current.setColumnWidth();
    }), i.intercept("update-cell", (m) => {
      const { id: $, column: V, value: ge } = m, me = Ie.current.tasks.find((Te) => Te.id === $);
      if (me) {
        const Te = { ...me };
        let Ee = ge;
        Ee && !isNaN(Ee) && !(Ee instanceof Date) && (Ee *= 1), Te[V] = Ee, Tt(
          Te,
          {
            calendar: Ie.current.calendarVal,
            durationUnit: Ie.current.durationUnitVal,
            splitTasks: Ie.current.splitTasksVal
          },
          V
        ), c.exec("update-task", {
          id: $,
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
      style: { flex: `0 0 ${be}` },
      ref: ee,
      children: /* @__PURE__ */ a(
        "div",
        {
          ref: ce,
          style: ve,
          className: "wx-rHj6070p wx-table",
          onClick: U,
          onDoubleClick: Q,
          children: /* @__PURE__ */ a(
            Jt,
            {
              init: et,
              sizes: {
                rowHeight: B,
                headerHeight: (oe ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: j,
              columns: Se,
              selectedRows: [...fe],
              sortMarks: Ce
            }
          )
        }
      )
    }
  );
}
function an({ borders: t = "" }) {
  const n = Le(_e), s = _(n, "cellWidth"), l = _(n, "cellHeight"), o = ie(null), [E, r] = he("#e4e4e4");
  se(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const x = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      r(x ? x.substring(x.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const g = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${Ft(s, l, E, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ a("div", { ref: o, style: g });
}
function dn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = Le(_e), o = _(l, "_links"), E = _(l, "criticalPath"), r = ie(null), g = M(
    (x) => {
      const y = x?.target?.classList;
      !y?.contains("wx-line") && !y?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return se(() => {
    if (!s && n && r.current) {
      const x = (y) => {
        r.current && !r.current.contains(y.target) && g(y);
      };
      return document.addEventListener("click", x), () => {
        document.removeEventListener("click", x);
      };
    }
  }, [s, n, g]), /* @__PURE__ */ Me("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((x) => {
      const y = "wx-dkx3NwEn wx-line" + (E && x.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
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
function un(t) {
  const { task: n, type: s } = t;
  function l(E) {
    const r = n.segments[E];
    return {
      left: `${r.$x}px`,
      top: "0px",
      width: `${r.$w}px`,
      height: "100%"
    };
  }
  function o(E) {
    if (!n.progress) return 0;
    const r = n.duration * n.progress / 100, g = n.segments;
    let x = 0, y = 0, d = null;
    do {
      const S = g[y];
      y === E && (x > r ? d = 0 : d = Math.min((r - x) / S.duration, 1) * 100), x += S.duration, y++;
    } while (d === null && y < g.length);
    return d || 0;
  }
  return /* @__PURE__ */ a("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((E, r) => /* @__PURE__ */ Me(
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
        /* @__PURE__ */ a("div", { className: "wx-content", children: E.text || "" })
      ]
    },
    r
  )) });
}
function fn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: o = null,
    marqueeSelect: E = !1
  } = t, r = Le(_e), [g, x] = Qe(r, "_tasks"), [y, d] = Qe(r, "_links"), S = _(r, "area"), W = _(r, "_scales"), R = _(r, "taskTypes"), X = _(r, "baselines"), [c, H] = Qe(r, "_selected"), B = _(r, "_scrollTask"), z = _(r, "criticalPath"), q = _(r, "tasks"), k = _(r, "schedule"), G = _(r, "splitTasks"), w = v(() => {
    if (!S || !Array.isArray(g)) return [];
    const e = S.start ?? 0, h = S.end ?? 0;
    return g.slice(e, h).map((T) => ({ ...T }));
  }, [x, S]), F = _(r, "cellHeight"), J = v(() => {
    if (!l || !o || !w.length) return w;
    const e = /* @__PURE__ */ new Map(), h = [];
    return g.forEach((T) => {
      const I = o.taskRows.get(T.id) ?? T.id;
      e.has(I) || (e.set(I, h.length), h.push(I));
    }), w.map((T) => {
      const I = o.taskRows.get(T.id) ?? T.id, D = e.get(I) ?? 0;
      return {
        ...T,
        $y: D * F,
        $y_base: T.$y_base !== void 0 ? D * F : void 0
      };
    });
  }, [w, l, o, g, F]), re = v(
    () => W.lengthUnitWidth,
    [W]
  ), K = ie(!1), [L, le] = he(void 0), [p, b] = he(null), A = ie(null), [U, ce] = he(null), [ee, ue] = he(void 0), Z = ie(null), [u, P] = he(0), [Y, te] = he(null), [O, oe] = he(null), pe = ie(null), ve = v(() => {
    const e = pe.current;
    return !!(c.length && e && e.contains(document.activeElement));
  }, [c, pe.current]), N = v(() => ve && c[c.length - 1]?.id, [ve, c]);
  se(() => {
    if (B && ve && B) {
      const { id: e } = B, h = pe.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      h && h.focus({ preventScroll: !0 });
    }
  }, [B]), se(() => {
    const e = pe.current;
    if (e && (P(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const h = new ResizeObserver((T) => {
        T[0] && P(T[0].contentRect.width);
      });
      return h.observe(e), () => h.disconnect();
    }
  }, [pe.current]);
  const j = M(() => {
    document.body.style.userSelect = "none";
  }, []), xe = M(() => {
    document.body.style.userSelect = "";
  }, []), be = M(
    (e, h, T) => {
      if (h.target.classList.contains("wx-line") || (T || (T = r.getTask(Ye(e))), T.type === "milestone" || T.type === "summary")) return "";
      const I = He(h, "data-segment");
      I && (e = I);
      const { left: D, width: ne } = e.getBoundingClientRect(), ae = (h.clientX - D) / ne;
      let ye = 0.2 / (ne > 200 ? ne / 200 : 1);
      return ae < ye ? "start" : ae > 1 - ye ? "end" : "";
    },
    [r]
  ), Ce = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return g.forEach((I) => {
        e.set(I.id, I.$y);
      }), e;
    const h = /* @__PURE__ */ new Map(), T = [];
    return g.forEach((I) => {
      const D = o.taskRows.get(I.id) ?? I.id;
      h.has(D) || (h.set(D, T.length), T.push(D));
    }), g.forEach((I) => {
      const D = o.taskRows.get(I.id) ?? I.id, ne = h.get(D) ?? 0;
      e.set(I.id, ne * F);
    }), e;
  }, [g, l, o, F]), $e = M(
    (e) => {
      const h = pe.current;
      if (!h) return [];
      const T = h.parentElement?.scrollLeft || 0, I = h.parentElement?.parentElement?.scrollTop || 0, D = Math.min(e.startX, e.currentX), ne = Math.max(e.startX, e.currentX), ae = Math.min(e.startY, e.currentY), ye = Math.max(e.startY, e.currentY);
      return g.filter((we) => {
        const Ae = we.$x - T, Ge = we.$x + we.$w - T, Xe = (Ce.get(we.id) ?? we.$y) - I, Ne = Xe + we.$h;
        return Ae < ne && Ge > D && Xe < ye && Ne > ae;
      });
    },
    [g, Ce]
  ), Re = v(() => new Set(c.map((e) => e.id)), [c, H]), Se = M(
    (e) => Re.has(e),
    [Re]
  ), de = M(
    (e, h) => {
      const { clientX: T } = h, I = Ye(e), D = r.getTask(I), ne = h.target.classList;
      if (!h.target.closest(".wx-delete-button") && !n) {
        if (ne.contains("wx-progress-marker")) {
          const { progress: ae } = r.getTask(I);
          A.current = {
            id: I,
            x: T,
            progress: ae,
            dx: 0,
            node: e,
            marker: h.target
          }, h.target.classList.add("wx-progress-in-drag");
        } else {
          const ae = be(e, h, D) || "move", ye = {
            id: I,
            mode: ae,
            x: T,
            dx: 0,
            l: D.$x,
            w: D.$w
          };
          if (G && D.segments?.length) {
            const we = He(h, "data-segment");
            we && (ye.segmentIndex = we.dataset.segment * 1, Kt(D, ye));
          }
          b(ye);
        }
        j();
      }
    },
    [r, n, be, j, G]
  ), f = M(
    (e) => {
      if (e.button !== 0) return;
      const h = He(e);
      if (!h && E && !n) {
        const T = pe.current;
        if (!T) return;
        const I = T.getBoundingClientRect(), D = e.clientX - I.left, ne = e.clientY - I.top;
        te({
          startX: D,
          startY: ne,
          currentX: D,
          currentY: ne,
          ctrlKey: e.ctrlKey || e.metaKey
        }), j();
        return;
      }
      if (h) {
        if (E && !n && c.length > 1) {
          const T = Ye(h);
          if (Se(T)) {
            const I = e.target.classList;
            if (!I.contains("wx-link") && !I.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const D = r.getTask(T);
              if (!be(h, e, D)) {
                const ae = /* @__PURE__ */ new Map();
                c.forEach((ye) => {
                  const we = r.getTask(ye.id);
                  if (we) {
                    if (k?.auto && we.type === "summary") return;
                    ae.set(ye.id, {
                      $x: we.$x,
                      $w: we.$w,
                      start: we.start,
                      end: we.end
                    });
                  }
                }), oe({
                  baseTaskId: T,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: ae
                }), j();
                return;
              }
            }
          }
        }
        de(h, e);
      }
    },
    [de, E, n, c, Se, r, be, k, j]
  ), Q = M(
    (e) => {
      const h = He(e);
      h && (Z.current = setTimeout(() => {
        ue(!0), de(h, e.touches[0]);
      }, 300));
    },
    [de]
  ), fe = M(
    (e) => {
      ce(e && { ...y.find((h) => h.id === e) });
    },
    [y]
  ), C = M(() => {
    if (Y) {
      const e = $e(Y);
      Y.ctrlKey ? e.forEach((h) => {
        r.exec("select-task", { id: h.id, toggle: !0, marquee: !0 });
      }) : (c.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), e.forEach((h, T) => {
        r.exec("select-task", {
          id: h.id,
          toggle: T > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), te(null), xe(), K.current = !0;
      return;
    }
    if (O) {
      const { dx: e, originalPositions: h } = O, T = Math.round(e / re);
      if (T !== 0) {
        let I = !0;
        h.forEach((D, ne) => {
          const ae = r.getTask(ne);
          ae && (r.exec("update-task", {
            id: ne,
            diff: T,
            task: { start: ae.start, end: ae.end },
            skipUndo: !I
            // Only first task creates undo entry
          }), I = !1);
        }), K.current = !0;
      } else
        h.forEach((I, D) => {
          r.exec("drag-task", {
            id: D,
            left: I.$x,
            width: I.$w,
            inProgress: !1
          });
        });
      oe(null), xe();
      return;
    }
    if (A.current) {
      const { dx: e, id: h, marker: T, value: I } = A.current;
      A.current = null, typeof I < "u" && e && r.exec("update-task", {
        id: h,
        task: { progress: I },
        inProgress: !1
      }), T.classList.remove("wx-progress-in-drag"), K.current = !0, xe();
    } else if (p) {
      const { id: e, mode: h, dx: T, l: I, w: D, start: ne, segment: ae, index: ye } = p;
      if (b(null), ne) {
        const we = Math.round(T / re);
        if (!we)
          r.exec("drag-task", {
            id: e,
            width: D,
            left: I,
            inProgress: !1,
            ...ae && { segmentIndex: ye }
          });
        else {
          let Ae = {}, Ge = r.getTask(e);
          ae && (Ge = Ge.segments[ye]), h === "move" ? (Ae.start = Ge.start, Ae.end = Ge.end) : Ae[h] = Ge[h], r.exec("update-task", {
            id: e,
            diff: we,
            task: Ae,
            ...ae && { segmentIndex: ye }
          });
        }
        K.current = !0;
      }
      xe();
    }
  }, [r, xe, p, re, Y, O, $e, c]), ke = M(
    (e, h) => {
      const { clientX: T, clientY: I } = h;
      if (!n) {
        if (Y) {
          const D = pe.current;
          if (!D) return;
          const ne = D.getBoundingClientRect(), ae = T - ne.left, ye = I - ne.top;
          te((we) => ({
            ...we,
            currentX: ae,
            currentY: ye
          }));
          return;
        }
        if (O) {
          const D = T - O.startX;
          O.originalPositions.forEach((ne, ae) => {
            const ye = ne.$x + D;
            r.exec("drag-task", {
              id: ae,
              left: ye,
              width: ne.$w,
              inProgress: !0
            });
          }), oe((ne) => ({ ...ne, dx: D }));
          return;
        }
        if (A.current) {
          const { node: D, x: ne, id: ae } = A.current, ye = A.current.dx = T - ne, we = Math.round(ye / D.offsetWidth * 100);
          let Ae = A.current.progress + we;
          A.current.value = Ae = Math.min(
            Math.max(0, Ae),
            100
          ), r.exec("update-task", {
            id: ae,
            task: { progress: Ae },
            inProgress: !0
          });
        } else if (p) {
          fe(null);
          const { mode: D, l: ne, w: ae, x: ye, id: we, start: Ae, segment: Ge, index: at } = p, Xe = r.getTask(we), Ne = T - ye;
          if (!Ae && Math.abs(Ne) < 20 || D === "start" && ae - Ne < re || D === "end" && ae + Ne < re || D === "move" && (Ne < 0 && ne + Ne < 0 || Ne > 0 && ne + ae + Ne > u) || p.segment && !Ot(Xe, p))
            return;
          const nt = { ...p, dx: Ne };
          let qe, je;
          if (D === "start" ? (qe = ne + Ne, je = ae - Ne) : D === "end" ? (qe = ne, je = ae + Ne) : D === "move" && (qe = ne + Ne, je = ae), r.exec("drag-task", {
            id: we,
            width: je,
            left: qe,
            inProgress: !0,
            ...Ge && { segmentIndex: at }
          }), !nt.start && (D === "move" && Xe.$x == ne || D !== "move" && Xe.$w == ae)) {
            K.current = !0, C();
            return;
          }
          nt.start = !0, b(nt);
        } else {
          const D = He(e);
          if (D) {
            const ne = r.getTask(Ye(D)), ye = He(e, "data-segment") || D, we = be(ye, h, ne);
            ye.style.cursor = we && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      p,
      re,
      u,
      be,
      fe,
      C,
      Y,
      O
    ]
  ), De = M(
    (e) => {
      ke(e, e);
    },
    [ke]
  ), Oe = M(
    (e) => {
      ee ? (e.preventDefault(), ke(e, e.touches[0])) : Z.current && (clearTimeout(Z.current), Z.current = null);
    },
    [ee, ke]
  ), We = M(() => {
    C();
  }, [C]), Ie = M(() => {
    ue(null), Z.current && (clearTimeout(Z.current), Z.current = null), C();
  }, [C]);
  se(() => (window.addEventListener("mouseup", We), () => {
    window.removeEventListener("mouseup", We);
  }), [We]);
  const Be = M(
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
  ), et = ["e2s", "s2s", "e2e", "s2e"], i = M((e, h) => et[(e ? 1 : 0) + (h ? 0 : 2)], []), m = M(
    (e, h) => {
      const T = L.id, I = L.start;
      return e === T ? !0 : !!y.find((D) => D.target == e && D.source == T && D.type === i(I, h));
    },
    [L, d, i]
  ), $ = M(() => {
    L && le(null);
  }, [L]), V = M(
    (e) => {
      if (K.current) {
        K.current = !1;
        return;
      }
      const h = Fe(e.target);
      if (h) {
        const T = e.target.classList;
        if (T.contains("wx-link")) {
          const I = T.contains("wx-left");
          if (!L) {
            le({ id: h, start: I });
            return;
          }
          L.id !== h && !m(h, I) && r.exec("add-link", {
            link: {
              source: L.id,
              target: h,
              type: i(L.start, I)
            }
          });
        } else if (T.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: U.id }), ce(null);
        else {
          let I;
          const D = He(e, "data-segment");
          D && (I = D.dataset.segment * 1), r.exec("select-task", {
            id: h,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: I
          });
        }
      }
      $();
    },
    [
      r,
      L,
      d,
      U,
      m,
      i,
      $
    ]
  ), ge = M((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), me = M((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Te = M(
    (e) => {
      if (ee || Z.current)
        return e.preventDefault(), !1;
    },
    [ee]
  ), Ee = v(
    () => R.map((e) => e.id),
    [R]
  ), ot = M(
    (e) => {
      let h = Ee.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (h = `task ${h}`), h;
    },
    [Ee]
  ), it = M(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), tt = M(
    (e) => z && q.byId(e).$critical,
    [z, q]
  ), lt = M(
    (e) => {
      if (k?.auto) {
        const h = q.getSummaryId(e, !0), T = q.getSummaryId(L.id, !0);
        return L?.id && !(Array.isArray(h) ? h : [h]).includes(
          L.id
        ) && !(Array.isArray(T) ? T : [T]).includes(e);
      }
      return L;
    },
    [k, q, L]
  ), ct = v(() => {
    if (!Y) return null;
    const e = Math.min(Y.startX, Y.currentX), h = Math.min(Y.startY, Y.currentY), T = Math.abs(Y.currentX - Y.startX), I = Math.abs(Y.currentY - Y.startY);
    return {
      left: `${e}px`,
      top: `${h}px`,
      width: `${T}px`,
      height: `${I}px`
    };
  }, [Y]);
  return /* @__PURE__ */ Me(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${J.length ? J[0].$h : 0}px` },
      ref: pe,
      onContextMenu: Te,
      onMouseDown: f,
      onMouseMove: De,
      onTouchStart: Q,
      onTouchMove: Oe,
      onTouchEnd: Ie,
      onClick: V,
      onDoubleClick: Be,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ a(
          dn,
          {
            onSelectLink: fe,
            selectedLink: U,
            readonly: n
          }
        ),
        J.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const h = `wx-bar wx-${ot(e.type)}` + (ee && p && e.id === p.id ? " wx-touch" : "") + (L && L.id === e.id ? " wx-selected" : "") + (Re.has(e.id) ? " wx-selected" : "") + (tt(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (G && e.segments ? " wx-split" : ""), T = "wx-link wx-left" + (L ? " wx-visible" : "") + (!L || !m(e.id, !0) && lt(e.id) ? " wx-target" : "") + (L && L.id === e.id && L.start ? " wx-selected" : "") + (tt(e.id) ? " wx-critical" : ""), I = "wx-link wx-right" + (L ? " wx-visible" : "") + (!L || !m(e.id, !1) && lt(e.id) ? " wx-target" : "") + (L && L.id === e.id && !L.start ? " wx-selected" : "") + (tt(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Me(St, { children: [
            !e.$skip && /* @__PURE__ */ Me(
              "div",
              {
                className: "wx-GKbcLEGA " + h,
                style: ge(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: N === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === U?.target && U?.type[2] === "s" ? /* @__PURE__ */ a(
                    dt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + T, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Me(Ve, { children: [
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
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: it }) : G && e.segments ? /* @__PURE__ */ a(un, { task: e, type: ot(e.type) }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ Me(Ve, { children: [
                    /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: it }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === U?.target && U?.type[2] === "e" ? /* @__PURE__ */ a(
                    dt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + I, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            X && !e.$skip_baseline ? /* @__PURE__ */ a(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: me(e)
              }
            ) : null
          ] }, e.id);
        }),
        Y && ct && /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: ct })
      ]
    }
  );
}
function hn(t) {
  const { highlightTime: n } = t, s = Le(_e), l = _(s, "_scales");
  return /* @__PURE__ */ a("div", { className: "wx-ZkvhDKir wx-scale", style: { width: l.width }, children: (l?.rows || []).map((o, E) => /* @__PURE__ */ a(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((r, g) => {
        const x = n ? n(r.date, r.unit) : "", y = "wx-cell " + (r.css || "") + " " + (x || "");
        return /* @__PURE__ */ a(
          "div",
          {
            className: "wx-ZkvhDKir " + y,
            style: { width: `${r.width}px` },
            children: r.value
          },
          g
        );
      })
    },
    E
  )) });
}
const mn = /* @__PURE__ */ new Map();
function xn(t) {
  const n = ie(null), s = ie(0), l = ie(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, se(() => {
    if (o)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const E = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        mn.set(t, E), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: E })
        );
      }), () => cancelAnimationFrame(l.current);
  });
}
function gn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: l,
    taskTemplate: o,
    cellBorders: E,
    highlightTime: r,
    multiTaskRows: g = !1,
    rowMapping: x = null,
    marqueeSelect: y = !1
  } = t, d = Le(_e), [S, W] = Qe(d, "_selected"), R = _(d, "scrollTop"), X = _(d, "cellHeight"), c = _(d, "cellWidth"), H = _(d, "_scales"), B = _(d, "_markers"), z = _(d, "_scrollTask"), q = _(d, "zoom"), k = _(d, "_tasks"), [G, w] = he(), F = ie(null), J = 1 + (H?.rows?.length || 0), re = v(() => {
    if (!g || !x || !k?.length) return null;
    const u = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), Y = [];
    return k.forEach((te) => {
      const O = x.taskRows.get(te.id) ?? te.id;
      P.has(O) || (P.set(O, Y.length), Y.push(O));
    }), k.forEach((te) => {
      const O = x.taskRows.get(te.id) ?? te.id, oe = P.get(O) ?? 0;
      u.set(te.id, oe * X);
    }), u;
  }, [k, g, x, X]), K = v(() => {
    const u = [];
    return S && S.length && X && S.forEach((P) => {
      const Y = re?.get(P.id) ?? P.$y;
      u.push({ height: `${X}px`, top: `${Y - 3}px` });
    }), u;
  }, [W, X, re]), L = v(
    () => Math.max(G || 0, l),
    [G, l]
  );
  se(() => {
    const u = F.current;
    u && typeof R == "number" && (u.scrollTop = R);
  }, [R]);
  const le = () => {
    p();
  };
  function p(u) {
    const P = F.current;
    if (!P) return;
    const Y = {};
    Y.left = P.scrollLeft, d.exec("scroll-chart", Y);
  }
  function b() {
    const u = F.current, Y = Math.ceil((G || 0) / (X || 1)) + 1, te = Math.floor((u && u.scrollTop || 0) / (X || 1)), O = Math.max(0, te - J), oe = te + Y + J, pe = O * (X || 0);
    d.exec("render-data", {
      start: O,
      end: oe,
      from: pe
    });
  }
  se(() => {
    b();
  }, [G, R]);
  const A = M(
    (u) => {
      if (!u) return;
      const { id: P, mode: Y } = u;
      if (Y.toString().indexOf("x") < 0) return;
      const te = F.current;
      if (!te) return;
      const { clientWidth: O } = te, oe = d.getTask(P);
      if (oe.$x + oe.$w < te.scrollLeft)
        d.exec("scroll-chart", { left: oe.$x - (c || 0) }), te.scrollLeft = oe.$x - (c || 0);
      else if (oe.$x >= O + te.scrollLeft) {
        const pe = O < oe.$w ? c || 0 : oe.$w;
        d.exec("scroll-chart", { left: oe.$x - O + pe }), te.scrollLeft = oe.$x - O + pe;
      }
    },
    [d, c]
  );
  se(() => {
    A(z);
  }, [z]);
  function U(u) {
    if (q && (u.ctrlKey || u.metaKey)) {
      u.preventDefault();
      const P = F.current, Y = -Math.sign(u.deltaY), te = u.clientX - (P ? P.getBoundingClientRect().left : 0);
      d.exec("zoom-scale", {
        dir: Y,
        offset: te
      });
    }
  }
  function ce(u) {
    const P = r(u.date, u.unit);
    return P ? {
      css: P,
      width: u.width
    } : null;
  }
  const ee = v(() => H && (H.minUnit === "hour" || H.minUnit === "day") && r ? H.rows[H.rows.length - 1].cells.map(ce) : null, [H, r]), ue = M(
    (u) => {
      u.eventSource = "chart", d.exec("hotkey", u);
    },
    [d]
  );
  se(() => {
    const u = F.current;
    if (!u) return;
    const P = () => w(u.clientHeight);
    P();
    const Y = new ResizeObserver(() => P());
    return Y.observe(u), () => {
      Y.disconnect();
    };
  }, [F.current]);
  const Z = ie(null);
  return se(() => {
    const u = F.current;
    if (u && !Z.current)
      return Z.current = Ct(u, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (P) => ue(P)
      }), () => {
        Z.current?.destroy(), Z.current = null;
      };
  }, []), se(() => {
    const u = F.current;
    if (!u) return;
    const P = U;
    return u.addEventListener("wheel", P), () => {
      u.removeEventListener("wheel", P);
    };
  }, [U]), xn("chart"), /* @__PURE__ */ Me(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: F,
      onScroll: le,
      children: [
        /* @__PURE__ */ a(hn, { highlightTime: r, scales: H }),
        B && B.length ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${L}px` },
            children: B.map((u, P) => /* @__PURE__ */ a(
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
        /* @__PURE__ */ Me(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${L}px` },
            children: [
              ee ? /* @__PURE__ */ a(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: ee.map(
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
              /* @__PURE__ */ a(an, { borders: E }),
              S && S.length ? S.map(
                (u, P) => u.$y ? /* @__PURE__ */ a(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": u.id,
                    style: K[P]
                  },
                  u.id
                ) : null
              ) : null,
              /* @__PURE__ */ a(
                fn,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: g,
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
function wn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: l = "x",
    onMove: o,
    onDisplayChange: E,
    compactMode: r,
    containerWidth: g = 0,
    leftThreshold: x = 50,
    rightThreshold: y = 50
  } = t, [d, S] = st(t.value ?? 0), [W, R] = st(t.display ?? "all");
  function X(ee) {
    let ue = 0;
    n == "center" ? ue = s / 2 : n == "before" && (ue = s);
    const Z = {
      size: [s + "px", "auto"],
      p: [ee - ue + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let u in Z) Z[u] = Z[u].reverse();
    return Z;
  }
  const [c, H] = he(!1), [B, z] = he(null), q = ie(0), k = ie(), G = ie(), w = ie(W);
  se(() => {
    w.current = W;
  }, [W]), se(() => {
    B === null && d > 0 && z(d);
  }, [B, d]);
  function F(ee) {
    return l == "x" ? ee.clientX : ee.clientY;
  }
  const J = M(
    (ee) => {
      const ue = k.current + F(ee) - q.current;
      S(ue);
      let Z;
      ue <= x ? Z = "chart" : g - ue <= y ? Z = "grid" : Z = "all", w.current !== Z && (R(Z), w.current = Z), G.current && clearTimeout(G.current), G.current = setTimeout(() => o && o(ue), 100);
    },
    [g, x, y, o]
  ), re = M(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", H(!1), window.removeEventListener("mousemove", J), window.removeEventListener("mouseup", re);
  }, [J]), K = v(
    () => W !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [W, l]
  ), L = M(
    (ee) => {
      !r && (W === "grid" || W === "chart") || (q.current = F(ee), k.current = d, H(!0), document.body.style.cursor = K, document.body.style.userSelect = "none", window.addEventListener("mousemove", J), window.addEventListener("mouseup", re));
    },
    [K, J, re, d, r, W]
  );
  function le() {
    R("all"), B !== null && (S(B), o && o(B));
  }
  function p(ee) {
    if (r) {
      const ue = W === "chart" ? "grid" : "chart";
      R(ue), E(ue);
    } else if (W === "grid" || W === "chart")
      le(), E("all");
    else {
      const ue = ee === "left" ? "chart" : "grid";
      R(ue), E(ue);
    }
  }
  function b() {
    p("left");
  }
  function A() {
    p("right");
  }
  const U = v(() => X(d), [d, n, s, l]), ce = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${W}`,
    c ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Me(
    "div",
    {
      className: "wx-pFykzMlT " + ce,
      onMouseDown: L,
      style: { width: U.size[0], height: U.size[1], cursor: K },
      children: [
        /* @__PURE__ */ Me("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: b
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: A
            }
          ) })
        ] }),
        /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const pn = 650;
function Rt(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let E of o)
        if (E.target === document.body) {
          let r = E.contentRect.width <= pn;
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
function yn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: l,
    highlightTime: o,
    onTableAPIChange: E,
    multiTaskRows: r = !1,
    rowMapping: g = null,
    marqueeSelect: x = !1
  } = t, y = Le(_e), d = _(y, "_tasks"), S = _(y, "_scales"), W = _(y, "cellHeight"), R = _(y, "columns"), X = _(y, "_scrollTask"), c = _(y, "undo"), [H, B] = he(!1);
  let [z, q] = he(0);
  const [k, G] = he(0), [w, F] = he(0), [J, re] = he(void 0), [K, L] = he("all"), le = ie(null), p = M(
    (N) => {
      B((j) => (N !== j && (N ? (le.current = K, K === "all" && L("grid")) : (!le.current || le.current === "all") && L("all")), N));
    },
    [K]
  );
  se(() => {
    const N = Rt(p);
    return N.observe(), () => {
      N.disconnect();
    };
  }, [p]);
  const b = v(() => {
    let N;
    return R.every((j) => j.width && !j.flexgrow) ? N = R.reduce((j, xe) => j + parseInt(xe.width), 0) : H && K === "chart" ? N = parseInt(R.find((j) => j.id === "action")?.width) || 50 : N = 440, z = N, N;
  }, [R, H, K]);
  se(() => {
    q(b);
  }, [b]);
  const A = v(
    () => (k ?? 0) - (J ?? 0),
    [k, J]
  ), U = v(() => S.width, [S]), ce = v(() => {
    if (!r || !g)
      return d.length * W;
    const N = /* @__PURE__ */ new Set();
    return d.forEach((j) => {
      const xe = g.taskRows.get(j.id) ?? j.id;
      N.add(xe);
    }), N.size * W;
  }, [d, W, r, g]), ee = v(
    () => S.height + ce + A,
    [S, ce, A]
  ), ue = v(
    () => z + U,
    [z, U]
  ), Z = ie(null), u = M(() => {
    Promise.resolve().then(() => {
      if ((k ?? 0) > (ue ?? 0)) {
        const N = (k ?? 0) - z;
        y.exec("expand-scale", { minWidth: N });
      }
    });
  }, [k, ue, z, y]);
  se(() => {
    let N;
    return Z.current && (N = new ResizeObserver(u), N.observe(Z.current)), () => {
      N && N.disconnect();
    };
  }, [Z.current, u]), se(() => {
    u();
  }, [U]);
  const P = ie(null), Y = ie(null), te = M(() => {
    const N = P.current;
    N && y.exec("scroll-chart", {
      top: N.scrollTop
    });
  }, [y]), O = ie({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  se(() => {
    O.current = {
      rTasks: d,
      rScales: S,
      rCellHeight: W,
      scrollSize: A,
      ganttDiv: P.current,
      ganttHeight: w ?? 0
    };
  }, [d, S, W, A, w]);
  const oe = M(
    (N) => {
      if (!N) return;
      const {
        rTasks: j,
        rScales: xe,
        rCellHeight: be,
        scrollSize: Ce,
        ganttDiv: $e,
        ganttHeight: Re
      } = O.current;
      if (!$e) return;
      const { id: Se } = N, de = j.findIndex((f) => f.id === Se);
      if (de > -1) {
        const f = Re - xe.height, Q = de * be, fe = $e.scrollTop;
        let C = null;
        Q < fe ? C = Q : Q + be > fe + f && (C = Q - f + be + Ce), C !== null && (y.exec("scroll-chart", { top: Math.max(C, 0) }), P.current.scrollTop = Math.max(C, 0));
      }
    },
    [y]
  );
  se(() => {
    oe(X);
  }, [X]), se(() => {
    const N = P.current, j = Y.current;
    if (!N || !j) return;
    const xe = () => {
      tn(() => {
        F(N.offsetHeight), G(N.offsetWidth), re(j.offsetWidth);
      });
    }, be = new ResizeObserver(xe);
    return be.observe(N), () => be.disconnect();
  }, [P.current]);
  const pe = ie(null), ve = ie(null);
  return se(() => {
    ve.current && (ve.current.destroy(), ve.current = null);
    const N = pe.current;
    if (N)
      return ve.current = Ct(N, {
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
        exec: (j) => {
          j.isInput || y.exec("hotkey", j);
        }
      }), () => {
        ve.current?.destroy(), ve.current = null;
      };
  }, [c]), /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-gantt", ref: P, onScroll: te, children: /* @__PURE__ */ a(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ee, width: "100%" },
      ref: Y,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: w,
            width: J
          },
          children: /* @__PURE__ */ Me("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: pe, children: [
            R.length ? /* @__PURE__ */ Me(Ve, { children: [
              /* @__PURE__ */ a(
                cn,
                {
                  display: K,
                  compactMode: H,
                  columnWidth: b,
                  width: z,
                  readonly: s,
                  fullHeight: ce,
                  onTableAPIChange: E,
                  multiTaskRows: r,
                  rowMapping: g
                }
              ),
              /* @__PURE__ */ a(
                wn,
                {
                  value: z,
                  display: K,
                  compactMode: H,
                  containerWidth: k,
                  onMove: (N) => q(N),
                  onDisplayChange: (N) => L(N)
                }
              )
            ] }) : null,
            /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-content", ref: Z, children: /* @__PURE__ */ a(
              gn,
              {
                readonly: s,
                fullWidth: U,
                fullHeight: ce,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: o,
                multiTaskRows: r,
                rowMapping: g,
                marqueeSelect: x
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function kn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function bn(t, n) {
  return typeof t == "function" ? t : Ue(t, n);
}
function Et(t, n) {
  return t.map(({ format: s, ...l }) => ({
    ...l,
    format: bn(s, n)
  }));
}
function vn(t, n) {
  const s = kn(n);
  for (let l in s)
    s[l] = Ue(s[l], t);
  return s;
}
function Tn(t, n) {
  if (!t || !t.length) return t;
  const s = Ue("%d-%m-%Y", n);
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
function $n(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Et(s.scales, n)
    }))
  } : t;
}
const Mn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Cn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Kn = bt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: l = Qt,
  tasks: o = [],
  selected: E = [],
  activeTask: r = null,
  links: g = [],
  scales: x = Cn,
  columns: y = jt,
  start: d = null,
  end: S = null,
  lengthUnit: W = "day",
  durationUnit: R = "day",
  cellWidth: X = 100,
  cellHeight: c = 38,
  scaleHeight: H = 36,
  readonly: B = !1,
  cellBorders: z = "full",
  zoom: q = !1,
  baselines: k = !1,
  highlightTime: G = null,
  init: w = null,
  autoScale: F = !0,
  unscheduledTasks: J = !1,
  criticalPath: re = null,
  schedule: K = { type: "forward" },
  projectStart: L = null,
  projectEnd: le = null,
  calendar: p = null,
  undo: b = !1,
  splitTasks: A = !1,
  multiTaskRows: U = !1,
  marqueeSelect: ce = !1,
  ...ee
}, ue) {
  const Z = ie();
  Z.current = ee;
  const u = v(() => new Vt(Zt), []), P = v(() => ({ ...rt, ...Je }), []), Y = Le(ze.i18n), te = v(() => Y ? Y.extend(P, !0) : Ze(P), [Y, P]), O = v(() => te.getRaw().calendar, [te]), oe = v(() => {
    let de = {
      zoom: $n(q, O),
      scales: Et(x, O),
      columns: Tn(y, O),
      links: Bt(g),
      cellWidth: X
    };
    return de.zoom && (de = {
      ...de,
      ...qt(
        de.zoom,
        vn(O, te.getGroup("gantt")),
        de.scales,
        X
      )
    }), de;
  }, [q, x, y, g, X, O, te]), pe = ie(null);
  pe.current !== o && (mt(o, { durationUnit: R, splitTasks: A, calendar: p }), pe.current = o), se(() => {
    mt(o, { durationUnit: R, splitTasks: A, calendar: p });
  }, [o, R, p, A]);
  const ve = v(() => {
    if (!U) return null;
    const de = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), Q = (fe) => {
      fe.forEach((C) => {
        const ke = C.row ?? C.id;
        f.set(C.id, ke), de.has(ke) || de.set(ke, []), de.get(ke).push(C.id), C.data && C.data.length > 0 && Q(C.data);
      });
    };
    return Q(o), { rowMap: de, taskRows: f };
  }, [o, U]), N = v(() => u.in, [u]), j = ie(null);
  j.current === null && (j.current = new Xt((de, f) => {
    const Q = "on" + Mn(de);
    Z.current && Z.current[Q] && Z.current[Q](f);
  }), N.setNext(j.current));
  const [xe, be] = he(null), Ce = ie(null);
  Ce.current = xe;
  const $e = v(
    () => ({
      getState: u.getState.bind(u),
      getReactiveState: u.getReactive.bind(u),
      getStores: () => ({ data: u }),
      exec: N.exec,
      setNext: (de) => (j.current = j.current.setNext(de), j.current),
      intercept: N.intercept.bind(N),
      on: N.on.bind(N),
      detach: N.detach.bind(N),
      getTask: u.getTask.bind(u),
      serialize: u.serialize.bind(u),
      getTable: (de) => de ? new Promise((f) => setTimeout(() => f(Ce.current), 1)) : Ce.current,
      getHistory: () => u.getHistory()
    }),
    [u, N]
  );
  vt(
    ue,
    () => ({
      ...$e
    }),
    [$e]
  );
  const Re = ie(0);
  se(() => {
    Re.current ? u.init({
      tasks: o,
      links: oe.links,
      start: d,
      columns: oe.columns,
      end: S,
      lengthUnit: W,
      cellWidth: oe.cellWidth,
      cellHeight: c,
      scaleHeight: H,
      scales: oe.scales,
      taskTypes: l,
      zoom: oe.zoom,
      selected: E,
      activeTask: r,
      baselines: k,
      autoScale: F,
      unscheduledTasks: J,
      markers: s,
      durationUnit: R,
      criticalPath: re,
      schedule: K,
      projectStart: L,
      projectEnd: le,
      calendar: p,
      undo: b,
      _weekStart: O.weekStart,
      splitTasks: A
    }) : w && w($e), Re.current++;
  }, [
    $e,
    w,
    o,
    oe,
    d,
    S,
    W,
    c,
    H,
    l,
    E,
    r,
    k,
    F,
    J,
    s,
    R,
    re,
    K,
    L,
    le,
    p,
    b,
    O,
    A,
    u
  ]), Re.current === 0 && u.init({
    tasks: o,
    links: oe.links,
    start: d,
    columns: oe.columns,
    end: S,
    lengthUnit: W,
    cellWidth: oe.cellWidth,
    cellHeight: c,
    scaleHeight: H,
    scales: oe.scales,
    taskTypes: l,
    zoom: oe.zoom,
    selected: E,
    activeTask: r,
    baselines: k,
    autoScale: F,
    unscheduledTasks: J,
    markers: s,
    durationUnit: R,
    criticalPath: re,
    schedule: K,
    projectStart: L,
    projectEnd: le,
    calendar: p,
    undo: b,
    _weekStart: O.weekStart,
    splitTasks: A
  });
  const Se = v(() => p ? (de, f) => f == "day" && !p.getDayHours(de) || f == "hour" && !p.getDayHours(de) ? "wx-weekend" : "" : G, [p, G]);
  return /* @__PURE__ */ a(ze.i18n.Provider, { value: te, children: /* @__PURE__ */ a(_e.Provider, { value: $e, children: /* @__PURE__ */ a(
    yn,
    {
      taskTemplate: n,
      readonly: B,
      cellBorders: z,
      highlightTime: Se,
      onTableAPIChange: be,
      multiTaskRows: U,
      rowMapping: ve,
      marqueeSelect: ce
    }
  ) }) });
});
function On({ api: t = null, items: n = [] }) {
  const s = Le(ze.i18n), l = v(() => s || Ze(Je), [s]), o = v(() => l.getGroup("gantt"), [l]), E = Pe(t, "_selected"), r = Pe(t, "undo"), g = Pe(t, "history"), x = Pe(t, "splitTasks"), y = ["undo", "redo"], d = v(() => {
    const W = xt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : xt({
      undo: r,
      splitTasks: x
    })).map((X) => {
      let c = { ...X, disabled: !1 };
      return c.handler = Mt(W, c.id) ? (H) => $t(t, H.id, null, o) : c.handler, c.text && (c.text = o(c.text)), c.menuText && (c.menuText = o(c.menuText)), c;
    });
  }, [n, t, o, r, x]), S = v(() => {
    const W = [];
    return d.forEach((R) => {
      const X = R.id;
      if (X === "add-task")
        W.push(R);
      else if (y.includes(X))
        y.includes(X) && W.push({
          ...R,
          disabled: R.isDisabled(g)
        });
      else {
        if (!E?.length || !t) return;
        W.push({
          ...R,
          disabled: R.isDisabled && E.some((c) => R.isDisabled(c, t.getState()))
        });
      }
    }), W.filter((R, X) => {
      if (t && R.isHidden)
        return !E.some((c) => R.isHidden(c, t.getState()));
      if (R.comp === "separator") {
        const c = W[X + 1];
        if (!c || c.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, E, g, d]);
  return s ? /* @__PURE__ */ a(wt, { items: S }) : /* @__PURE__ */ a(ze.i18n.Provider, { value: l, children: /* @__PURE__ */ a(wt, { items: S }) });
}
const Vn = bt(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: o = null,
  at: E = "point",
  children: r,
  onClick: g,
  css: x
}, y) {
  const d = ie(null), S = ie(null), W = Le(ze.i18n), R = v(() => W || Ze({ ...Je, ...rt }), [W]), X = v(() => R.getGroup("gantt"), [R]), c = Pe(s, "taskTypes"), H = Pe(s, "selected"), B = Pe(s, "_selected"), z = Pe(s, "splitTasks"), q = v(() => gt({ splitTasks: !0 }), []);
  se(() => {
    s && (s.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), s.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [s]);
  function k(p) {
    return p.map((b) => (b = { ...b }, b.text && (b.text = X(b.text)), b.subtext && (b.subtext = X(b.subtext)), b.data && (b.data = k(b.data)), b));
  }
  function G() {
    const p = n.length ? n : gt({ splitTasks: z }), b = p.find((A) => A.id === "convert-task");
    return b && (b.data = [], (c || []).forEach((A) => {
      b.data.push(b.dataFactory(A));
    })), k(p);
  }
  const w = v(() => G(), [s, n, c, z, X]), F = v(
    () => B && B.length ? B : [],
    [B]
  ), J = M(
    (p, b) => {
      let A = p ? s?.getTask(p) : null;
      if (l) {
        const U = l(p, b);
        A = U === !0 ? A : U;
      }
      if (A) {
        const U = Fe(b.target, "data-segment");
        U !== null ? S.current = { id: A.id, segmentIndex: U } : S.current = A.id, (!Array.isArray(H) || !H.includes(A.id)) && s && s.exec && s.exec("select-task", { id: A.id });
      }
      return A;
    },
    [s, l, H]
  ), re = M(
    (p) => {
      const b = p.action;
      b && (Mt(q, b.id) && $t(s, b.id, S.current, X), g && g(p));
    },
    [s, X, g, q]
  ), K = M(
    (p, b) => {
      const A = F.length ? F : b ? [b] : [];
      let U = o ? A.every((ce) => o(p, ce)) : !0;
      if (U && (p.isHidden && (U = !A.some(
        (ce) => p.isHidden(ce, s.getState(), S.current)
      )), p.isDisabled)) {
        const ce = A.some(
          (ee) => p.isDisabled(ee, s.getState(), S.current)
        );
        p.disabled = ce;
      }
      return U;
    },
    [o, F, s]
  );
  vt(y, () => ({
    show: (p, b) => {
      d.current && d.current.show && d.current.show(p, b);
    }
  }));
  const L = M((p) => {
    d.current && d.current.show && d.current.show(p);
  }, []), le = /* @__PURE__ */ Me(Ve, { children: [
    /* @__PURE__ */ a(
      nn,
      {
        filter: K,
        options: w,
        dataKey: "id",
        resolver: J,
        onClick: re,
        at: E,
        ref: d,
        css: x
      }
    ),
    /* @__PURE__ */ a("span", { onContextMenu: L, "data-menu-ignore": "true", children: typeof r == "function" ? r() : r })
  ] });
  if (!W && ze.i18n?.Provider) {
    const p = ze.i18n.Provider;
    return /* @__PURE__ */ a(p, { value: R, children: le });
  }
  return le;
});
function Rn({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Le(ze.i18n).getGroup("gantt"), E = _(t, "activeTask"), r = _(t, "_activeTask"), g = _(t, "_links"), x = _(t, "schedule"), y = _(t, "unscheduledTasks"), [d, S] = he();
  function W() {
    if (E) {
      const H = g.filter((z) => z.target == E).map((z) => ({ link: z, task: t.getTask(z.source) })), B = g.filter((z) => z.source == E).map((z) => ({ link: z, task: t.getTask(z.target) }));
      return [
        { title: o("Predecessors"), data: H },
        { title: o("Successors"), data: B }
      ];
    }
  }
  se(() => {
    S(W());
  }, [E, g]);
  const R = v(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function X(H) {
    n ? t.exec("delete-link", { id: H }) : (S(
      (B) => (B || []).map((z) => ({
        ...z,
        data: z.data.filter((q) => q.link.id !== H)
      }))
    ), s && s({
      id: H,
      action: "delete-link",
      data: { id: H }
    }));
  }
  function c(H, B) {
    n ? t.exec("update-link", {
      id: H,
      link: B
    }) : (S(
      (z) => (z || []).map((q) => ({
        ...q,
        data: q.data.map(
          (k) => k.link.id === H ? { ...k, link: { ...k.link, ...B } } : k
        )
      }))
    ), s && s({
      id: H,
      action: "update-link",
      data: {
        id: H,
        link: B
      }
    }));
  }
  return /* @__PURE__ */ a(Ve, { children: (d || []).map(
    (H, B) => H.data.length ? /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ a(Lt, { label: H.title, position: "top", children: /* @__PURE__ */ a("table", { children: /* @__PURE__ */ a("tbody", { children: H.data.map((z) => /* @__PURE__ */ Me("tr", { children: [
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-task-name", children: z.task.text || "" }) }),
      x?.auto && z.link.type === "e2s" ? /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ a(
        It,
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
          options: R,
          onChange: (q) => c(z.link.id, { type: q.value }),
          children: ({ option: q }) => q.label
        }
      ) }) }),
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => X(z.link.id),
          role: "button"
        }
      ) })
    ] }, z.link.id)) }) }) }) }, B) : null
  ) });
}
function En(t) {
  const { value: n, time: s, format: l, onchange: o, onChange: E, ...r } = t, g = E ?? o;
  function x(y) {
    const d = new Date(y.value);
    d.setHours(n.getHours()), d.setMinutes(n.getMinutes()), g && g({ value: d });
  }
  return /* @__PURE__ */ Me("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ a(
      Dt,
      {
        ...r,
        value: n,
        onChange: x,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ a(Ht, { value: n, onChange: g, format: l }) : null
  ] });
}
Ke("select", Gt);
Ke("date", En);
Ke("twostate", Wt);
Ke("slider", Pt);
Ke("counter", _t);
Ke("links", Rn);
function Bn({
  api: t,
  items: n = [],
  css: s = "",
  layout: l = "default",
  readonly: o = !1,
  placement: E = "sidebar",
  bottomBar: r = !0,
  topBar: g = !0,
  autoSave: x = !0,
  focus: y = !1,
  hotkeys: d = {}
}) {
  const S = Le(ze.i18n), W = v(() => S || Ze({ ...Je, ...rt }), [S]), R = v(() => W.getGroup("gantt"), [W]), X = W.getRaw(), c = v(() => {
    const f = X.gantt?.dateFormat || X.formats?.dateFormat;
    return Ue(f, X.calendar);
  }, [X]), H = v(() => {
    if (g === !0 && !o) {
      const f = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: R("Delete"),
          id: "delete"
        }
      ];
      return x ? { items: f } : {
        items: [
          ...f,
          {
            comp: "button",
            type: "primary",
            text: R("Save"),
            id: "save"
          }
        ]
      };
    }
    return g;
  }, [g, o, x, R]), [B, z] = he(!1), q = v(
    () => B ? "wx-full-screen" : "",
    [B]
  ), k = M((f) => {
    z(f);
  }, []);
  se(() => {
    const f = Rt(k);
    return f.observe(), () => {
      f.disconnect();
    };
  }, [k]);
  const G = _(t, "_activeTask"), w = _(t, "activeTask"), F = _(t, "unscheduledTasks"), J = _(t, "links"), re = _(t, "splitTasks"), K = v(
    () => re && w?.segmentIndex,
    [re, w]
  ), L = v(
    () => K || K === 0,
    [K]
  ), le = v(
    () => Ut({ unscheduledTasks: F }),
    [F]
  ), p = _(t, "undo"), [b, A] = he({}), [U, ce] = he(null), [ee, ue] = he(), [Z, u] = he(null), P = _(t, "taskTypes"), Y = v(() => {
    if (!G) return null;
    let f;
    if (L && G.segments ? f = { ...G.segments[K] } : f = { ...G }, o) {
      let Q = { parent: f.parent };
      return le.forEach(({ key: fe, comp: C }) => {
        if (C !== "links") {
          const ke = f[fe];
          C === "date" && ke instanceof Date ? Q[fe] = c(ke) : C === "slider" && fe === "progress" ? Q[fe] = `${ke}%` : Q[fe] = ke;
        }
      }), Q;
    }
    return f || null;
  }, [G, L, K, o, le, c]);
  se(() => {
    ue(Y);
  }, [Y]), se(() => {
    A({}), u(null), ce(null);
  }, [w]);
  function te(f, Q) {
    return f.map((fe) => {
      const C = { ...fe };
      if (fe.config && (C.config = { ...C.config }), C.comp === "links" && t && (C.api = t, C.autoSave = x, C.onLinksChange = pe), C.comp === "select" && C.key === "type") {
        const ke = C.options ?? (P || []);
        C.options = ke.map((De) => ({
          ...De,
          label: R(De.label)
        }));
      }
      return C.comp === "slider" && C.key === "progress" && (C.labelTemplate = (ke) => `${R(C.label)} ${ke}%`), C.label && (C.label = R(C.label)), C.config?.placeholder && (C.config.placeholder = R(C.config.placeholder)), Q && (C.isDisabled && C.isDisabled(Q, t.getState()) ? C.disabled = !0 : delete C.disabled), C;
    });
  }
  const O = v(() => {
    let f = n.length ? n : le;
    return f = te(f, ee), ee ? f.filter(
      (Q) => !Q.isHidden || !Q.isHidden(ee, t.getState())
    ) : f;
  }, [n, le, ee, P, R, t, x]), oe = v(
    () => O.map((f) => f.key),
    [O]
  );
  function pe({ id: f, action: Q, data: fe }) {
    A((C) => ({
      ...C,
      [f]: { action: Q, data: fe }
    }));
  }
  const ve = M(() => {
    for (let f in b)
      if (J.byId(f)) {
        const { action: Q, data: fe } = b[f];
        t.exec(Q, fe);
      }
  }, [t, b, J]), N = M(() => {
    const f = w?.id || w;
    if (L) {
      if (G?.segments) {
        const Q = G.segments.filter(
          (fe, C) => C !== K
        );
        t.exec("update-task", {
          id: f,
          task: { segments: Q }
        });
      }
    } else
      t.exec("delete-task", { id: f });
  }, [t, w, L, G, K]), j = M(() => {
    t.exec("show-editor", { id: null });
  }, [t]), xe = M(
    (f) => {
      const { item: Q, changes: fe } = f;
      Q.id === "delete" && N(), Q.id === "save" && (fe.length ? j() : ve()), Q.comp && j();
    },
    [t, w, x, ve, N, j]
  ), be = M(
    (f, Q, fe) => (F && f.type === "summary" && (f.unscheduled = !1), Tt(f, t.getState(), Q), fe || ce(!1), f),
    [F, t]
  ), Ce = M(
    (f) => {
      f = {
        ...f,
        unscheduled: F && f.unscheduled && f.type !== "summary"
      }, delete f.links, delete f.data, (oe.indexOf("duration") === -1 || f.segments && !f.duration) && delete f.duration;
      const Q = {
        id: w?.id || w,
        task: f,
        ...L && { segmentIndex: K }
      };
      x && U && (Q.inProgress = U), t.exec("update-task", Q), x || ve();
    },
    [
      t,
      w,
      F,
      x,
      ve,
      oe,
      L,
      K,
      U
    ]
  ), $e = M(
    (f) => {
      let { update: Q, key: fe, input: C } = f;
      if (C && ce(!0), f.update = be({ ...Q }, fe, C), !x) ue(f.update);
      else if (!Z && !C) {
        const ke = O.find((We) => We.key === fe), De = Q[fe];
        (!ke.validation || ke.validation(De)) && (!ke.required || De) && Ce(f.update);
      }
    },
    [x, be, Z, O, Ce]
  ), Re = M(
    (f) => {
      x || Ce(f.values);
    },
    [x, Ce]
  ), Se = M((f) => {
    u(f.errors);
  }, []), de = v(
    () => p ? {
      "ctrl+z": (f) => {
        f.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (f) => {
        f.preventDefault(), t.exec("redo");
      }
    } : {},
    [p, t]
  );
  return Y ? /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ a(
    sn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${q} ${s}`,
      items: O,
      values: Y,
      topBar: H,
      bottomBar: r,
      placement: E,
      layout: l,
      readonly: o,
      autoSave: x,
      focus: y,
      onAction: xe,
      onSave: Re,
      onValidation: Se,
      onChange: $e,
      hotkeys: d && { ...de, ...d }
    }
  ) }) : null;
}
const qn = ({ children: t, columns: n = null, api: s }) => {
  const [l, o] = he(null);
  return se(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ a(en, { api: l, columns: n, children: t });
};
function jn(t) {
  const { api: n, content: s, children: l } = t, o = ie(null), E = ie(null), [r, g] = he({}), [x, y] = he(null), [d, S] = he({});
  function W(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const G = k.getAttribute("data-tooltip-id"), w = k.getAttribute("data-tooltip-at"), F = k.getAttribute("data-tooltip");
        if (G || F) return { id: G, tooltip: F, target: k, at: w };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  se(() => {
    const k = E.current;
    if (k && d && (d.text || s)) {
      const G = k.getBoundingClientRect();
      let w = !1, F = d.left, J = d.top;
      G.right >= r.right && (F = r.width - G.width - 5, w = !0), G.bottom >= r.bottom && (J = d.top - (G.bottom - r.bottom + 2), w = !0), w && S((re) => re && { ...re, left: F, top: J });
    }
  }, [d, r, s]);
  const R = ie(null), X = 300, c = (k) => {
    clearTimeout(R.current), R.current = setTimeout(() => {
      k();
    }, X);
  };
  function H(k) {
    let { id: G, tooltip: w, target: F, at: J } = W(k.target);
    if (S(null), y(null), !w)
      if (G)
        w = z(G);
      else {
        clearTimeout(R.current);
        return;
      }
    const re = k.clientX;
    c(() => {
      G && y(B(q(G)));
      const K = F.getBoundingClientRect(), L = o.current, le = L ? L.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let p, b;
      J === "left" ? (p = K.top + 5 - le.top, b = K.right + 5 - le.left) : (p = K.top + K.height - le.top, b = re - le.left), g(le), S({ top: p, left: b, text: w });
    });
  }
  function B(k) {
    return n?.getTask(q(k)) || null;
  }
  function z(k) {
    return B(k)?.text || "";
  }
  function q(k) {
    const G = parseInt(k);
    return isNaN(G) ? k : G;
  }
  return /* @__PURE__ */ Me(
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
            ref: E,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: s ? /* @__PURE__ */ a(s, { data: x }) : d.text ? /* @__PURE__ */ a("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function Qn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ut, { fonts: t, children: n() }) : /* @__PURE__ */ a(ut, { fonts: t });
}
function Un({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ft, { fonts: t, children: n }) : /* @__PURE__ */ a(ft, { fonts: t });
}
function Zn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ht, { fonts: t, children: n }) : /* @__PURE__ */ a(ht, { fonts: t });
}
export {
  Vn as ContextMenu,
  Bn as Editor,
  Kn as Gantt,
  qn as HeaderMenu,
  Qn as Material,
  On as Toolbar,
  jn as Tooltip,
  Un as Willow,
  Zn as WillowDark,
  ts as defaultColumns,
  ns as defaultEditorItems,
  ss as defaultMenuOptions,
  rs as defaultTaskTypes,
  os as defaultToolbarButtons,
  is as getEditorItems,
  ls as getMenuOptions,
  cs as getToolbarButtons,
  us as registerEditorItem,
  as as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
