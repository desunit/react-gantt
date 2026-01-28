import { jsxs as Re, jsx as a, Fragment as Ve } from "react/jsx-runtime";
import { createContext as St, useMemo as b, useState as de, useContext as Ae, useCallback as $, useRef as re, useEffect as se, Fragment as Lt, forwardRef as vt, useImperativeHandle as Tt } from "react";
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
  let s, l, o, S, r, x, g, y, d;
  function L(p) {
    S = p.clientX, r = p.clientY, x = {
      ...on(s, t, p),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function D(p) {
    s = ze(p), yt(s) && (o = Ye(s), d = setTimeout(() => {
      y = !0, n && n.touchStart && n.touchStart(), L(p.touches[0]);
    }, 500), t.addEventListener("touchmove", z), t.addEventListener("contextmenu", C), window.addEventListener("touchend", B));
  }
  function C(p) {
    if (y || d)
      return p.preventDefault(), !1;
  }
  function _(p) {
    p.which === 1 && (s = ze(p), yt(s) && (o = Ye(s), t.addEventListener("mousemove", q), window.addEventListener("mouseup", k), L(p)));
  }
  function c(p) {
    t.removeEventListener("mousemove", q), t.removeEventListener("touchmove", z), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", B), document.body.style.userSelect = "", p && (t.removeEventListener("mousedown", _), t.removeEventListener("touchstart", D));
  }
  function H(p) {
    const X = p.clientX - S, J = p.clientY - r;
    if (!l) {
      if (Math.abs(X) < kt && Math.abs(J) < kt || n && n.start && n.start({ id: o, e: p }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = x.left + "px", l.style.top = x.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const oe = Math.round(Math.max(0, x.top + J));
      if (n && n.move && n.move({ id: o, top: oe, detail: g }) === !1)
        return;
      const O = n.getTask(o), ie = O.$y;
      if (!x.start && x.y == ie) return G();
      x.start = !0, x.y = O.$y - 4, l.style.top = oe + "px";
      const R = document.elementFromPoint(
        p.clientX,
        p.clientY
      ), M = ze(R);
      if (M && M !== s) {
        const m = Ye(M), Y = M.getBoundingClientRect(), Q = Y.top + Y.height / 2, ee = p.clientY + x.db > Q && M.nextElementSibling !== s, ae = p.clientY - x.dt < Q && M.previousElementSibling !== s;
        g?.after == m || g?.before == m ? g = null : ee ? g = { id: o, after: m } : ae && (g = { id: o, before: m });
      }
    }
  }
  function q(p) {
    H(p);
  }
  function z(p) {
    y ? (p.preventDefault(), H(p.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function B() {
    y = null, d && (clearTimeout(d), d = null), G();
  }
  function k() {
    G();
  }
  function G() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: o, top: x.top })), o = s = l = x = g = null, c();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", _), t.addEventListener("touchstart", D), {
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
    multiTaskRows: x = !1,
    rowMapping: g = null
  } = t, [y, d] = rt(S), [L, D] = de(), C = Ae(Ge.i18n), _ = b(() => C.getGroup("gantt"), [C]), c = Ae(We), H = W(c, "scrollTop"), q = W(c, "cellHeight"), z = W(c, "_scrollTask"), B = W(c, "_selected"), k = W(c, "area"), G = W(c, "_tasks"), p = W(c, "_scales"), X = W(c, "columns"), J = W(c, "_sort"), oe = W(c, "calendar"), O = W(c, "durationUnit"), ie = W(c, "splitTasks"), [R, M] = de(null), m = b(() => !G || !k ? [] : G.slice(k.start, k.end), [G, k]), Y = $(
    (i, h) => {
      if (h === "add-task")
        c.exec(h, {
          target: i,
          task: { text: _("New Task") },
          mode: "child",
          show: !0
        });
      else if (h === "open-task") {
        const v = m.find((K) => K.id === i);
        (v?.data || v?.lazy) && c.exec(h, { id: i, mode: !v.open });
      }
    },
    [m]
  ), Q = $(
    (i) => {
      const h = Fe(i), v = i.target.dataset.action;
      v && i.preventDefault(), h ? v === "add-task" || v === "open-task" ? Y(h, v) : c.exec("select-task", {
        id: h,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : v === "add-task" && Y(null, v);
    },
    [c, Y]
  ), ee = re(null), ae = re(null), [le, ue] = de(0), [U, w] = de(!1);
  se(() => {
    const i = ae.current;
    if (!i || typeof ResizeObserver > "u") return;
    const h = () => ue(i.clientWidth);
    h();
    const v = new ResizeObserver(h);
    return v.observe(i), () => v.disconnect();
  }, []);
  const P = re(null), F = $(
    (i) => {
      const h = i.id, { before: v, after: K } = i, pe = i.onMove;
      let ge = v || K, Te = v ? "before" : "after";
      if (pe) {
        if (Te === "after") {
          const De = c.getTask(ge);
          De.data?.length && De.open && (Te = "before", ge = De.data[0].id);
        }
        P.current = { id: h, [Te]: ge };
      } else P.current = null;
      c.exec("move-task", {
        id: h,
        mode: Te,
        target: ge,
        inProgress: pe
      });
    },
    [c]
  ), V = b(() => k?.from ?? 0, [k]), Z = b(() => p?.height ?? 0, [p]), xe = b(() => !s && o !== "grid" ? (y ?? 0) > (l ?? 0) : (y ?? 0) > (le ?? 0), [s, o, y, l, le]), fe = b(() => {
    const i = {};
    return xe && o === "all" || o === "grid" && xe ? i.width = y : o === "grid" && (i.width = "100%"), i;
  }, [xe, o, y]), E = b(() => R && !m.find((i) => i.id === R.id) ? [...m, R] : m, [m, R]), te = b(() => {
    if (!x || !g) return E;
    const i = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set();
    return E.forEach((v) => {
      const K = g.taskRows.get(v.id) ?? v.id;
      h.has(K) || (i.set(K, {
        ...v,
        $rowTasks: g.rowMap.get(K) || [v.id]
      }), h.add(K));
    }), Array.from(i.values());
  }, [E, x, g]), we = b(() => {
    let i = (X || []).map((K) => {
      K = { ...K };
      const pe = K.header;
      if (typeof pe == "object") {
        const ge = pe.text && _(pe.text);
        K.header = { ...pe, text: ge };
      } else K.header = _(pe);
      return K;
    });
    const h = i.findIndex((K) => K.id === "text"), v = i.findIndex((K) => K.id === "add-task");
    if (h !== -1 && (i[h].cell && (i[h]._cell = i[h].cell), i[h].cell = cn), v !== -1) {
      i[v].cell = i[v].cell || bt;
      const K = i[v].header;
      if (typeof K != "object" && (i[v].header = { text: K }), i[v].header.cell = K.cell || bt, n)
        i.splice(v, 1);
      else if (s) {
        const [pe] = i.splice(v, 1);
        i.unshift(pe);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [X, _, n, s]), ve = b(() => o === "all" ? `${l}px` : o === "grid" ? "calc(100% - 4px)" : we.find((i) => i.id === "add-task") ? "50px" : "0", [o, l, we]), $e = b(() => {
    if (te && J?.length) {
      const i = {};
      return J.forEach(({ key: h, order: v }, K) => {
        i[h] = {
          order: v,
          ...J.length > 1 && { index: K }
        };
      }), i;
    }
    return {};
  }, [te, J]), Ce = $(() => we.some((i) => i.flexgrow && !i.hidden), []), Le = b(() => Ce(), [Ce, U]), Ne = b(() => {
    let i = o === "chart" ? we.filter((v) => v.id === "add-task") : we;
    const h = o === "all" ? l : le;
    if (!Le) {
      let v = y, K = !1;
      if (we.some((pe) => pe.$width)) {
        let pe = 0;
        v = we.reduce((ge, Te) => (Te.hidden || (pe += Te.width, ge += Te.$width || Te.width), ge), 0), pe > v && v > h && (K = !0);
      }
      if (K || v < h) {
        let pe = 1;
        return K || (pe = (h - 50) / (v - 50 || 1)), i.map((ge) => (ge.id !== "add-task" && !ge.hidden && (ge.$width || (ge.$width = ge.width), ge.width = ge.$width * pe), ge));
      }
    }
    return i;
  }, [o, we, Le, y, l, le]), he = $(
    (i) => {
      if (!Ce()) {
        const h = Ne.reduce((v, K) => (i && K.$width && (K.$width = K.width), v + (K.hidden ? 0 : K.width)), 0);
        h !== y && d(h);
      }
      w(!0), w(!1);
    },
    [Ce, Ne, y, d]
  ), u = $(() => {
    we.filter((h) => h.flexgrow && !h.hidden).length === 1 && we.forEach((h) => {
      h.$width && !h.flexgrow && !h.hidden && (h.width = h.$width);
    });
  }, []), j = $(
    (i) => {
      if (!n) {
        const h = Fe(i), v = Xt(i, "data-col-id");
        !(v && we.find((pe) => pe.id == v))?.editor && h && c.exec("show-editor", { id: h });
      }
    },
    [c, n]
    // cols is defined later; relies on latest value at call time
  ), me = b(
    () => Array.isArray(B) ? B.map((i) => i.id) : [],
    [B]
  ), N = $(() => {
    if (ee.current && te !== null) {
      const i = ee.current.querySelector(".wx-body");
      i && (i.style.top = -((H ?? 0) - (V ?? 0)) + "px");
    }
    ae.current && (ae.current.scrollTop = 0);
  }, [te, H, V]);
  se(() => {
    ee.current && N();
  }, [H, V, N]), se(() => {
    const i = ee.current;
    if (!i) return;
    const h = i.querySelector(".wx-table-box .wx-body");
    if (!h || typeof ResizeObserver > "u") return;
    const v = new ResizeObserver(() => {
      N();
    });
    return v.observe(h), () => {
      v.disconnect();
    };
  }, [Ne, fe, o, ve, te, N]), se(() => {
    if (!z || !L) return;
    const { id: i } = z, h = L.getState().focusCell;
    h && h.row !== i && ee.current && ee.current.contains(document.activeElement) && L.exec("focus-cell", {
      row: i,
      column: h.column
    });
  }, [z, L]);
  const ke = $(
    ({ id: i }) => {
      if (n) return !1;
      c.getTask(i).open && c.exec("open-task", { id: i, mode: !1 });
      const h = c.getState()._tasks.find((v) => v.id === i);
      if (M(h || null), !h) return !1;
    },
    [c, n]
  ), Ie = $(
    ({ id: i, top: h }) => {
      P.current ? F({ ...P.current, onMove: !1 }) : c.exec("drag-task", {
        id: i,
        top: h + (V ?? 0),
        inProgress: !1
      }), M(null);
    },
    [c, F, V]
  ), Oe = $(
    ({ id: i, top: h, detail: v }) => {
      v && F({ ...v, onMove: !0 }), c.exec("drag-task", {
        id: i,
        top: h + (V ?? 0),
        inProgress: !0
      });
    },
    [c, F, V]
  );
  se(() => {
    const i = ee.current;
    return i ? ln(i, {
      start: ke,
      end: Ie,
      move: Oe,
      getTask: c.getTask
    }).destroy : void 0;
  }, [c, ke, Ie, Oe]);
  const Xe = $(
    (i) => {
      const { key: h, isInput: v } = i;
      if (!v && (h === "arrowup" || h === "arrowdown"))
        return i.eventSource = "grid", c.exec("hotkey", i), !1;
      if (h === "enter") {
        const K = L?.getState().focusCell;
        if (K) {
          const { row: pe, column: ge } = K;
          ge === "add-task" ? Y(pe, "add-task") : ge === "text" && Y(pe, "open-task");
        }
      }
    },
    [c, Y, L]
  ), Se = re(null), qe = () => {
    Se.current = {
      setTableAPI: D,
      handleHotkey: Xe,
      sortVal: J,
      api: c,
      adjustColumns: u,
      setColumnWidth: he,
      tasks: m,
      calendarVal: oe,
      durationUnitVal: O,
      splitTasksVal: ie,
      onTableAPIChange: r
    };
  };
  qe(), se(() => {
    qe();
  }, [
    D,
    Xe,
    J,
    c,
    u,
    he,
    m,
    oe,
    O,
    ie,
    r
  ]);
  const tt = $((i) => {
    D(i), i.intercept("hotkey", (h) => Se.current.handleHotkey(h)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (h) => {
      const v = Se.current.sortVal, { key: K, add: pe } = h, ge = v ? v.find((De) => De.key === K) : null;
      let Te = "asc";
      return ge && (Te = !ge || ge.order === "asc" ? "desc" : "asc"), c.exec("sort-tasks", {
        key: K,
        order: Te,
        add: pe
      }), !1;
    }), i.on("resize-column", () => {
      Se.current.setColumnWidth(!0);
    }), i.on("hide-column", (h) => {
      h.mode || Se.current.adjustColumns(), Se.current.setColumnWidth();
    }), i.intercept("update-cell", (h) => {
      const { id: v, column: K, value: pe } = h, ge = Se.current.tasks.find((Te) => Te.id === v);
      if (ge) {
        const Te = { ...ge };
        let De = pe;
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
      ref: ae,
      children: /* @__PURE__ */ a(
        "div",
        {
          ref: ee,
          style: fe,
          className: "wx-rHj6070p wx-table",
          onClick: Q,
          onDoubleClick: j,
          children: /* @__PURE__ */ a(
            en,
            {
              init: tt,
              sizes: {
                rowHeight: q,
                headerHeight: (Z ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: te,
              columns: Ne,
              selectedRows: [...me],
              sortMarks: $e
            }
          )
        }
      )
    }
  );
}
function dn({ borders: t = "" }) {
  const n = Ae(We), s = W(n, "cellWidth"), l = W(n, "cellHeight"), o = re(null), [S, r] = de("#e4e4e4");
  se(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const g = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      r(g ? g.substring(g.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const x = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${Kt(s, l, S, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ a("div", { ref: o, style: x });
}
function un({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = Ae(We), o = W(l, "_links"), S = W(l, "criticalPath"), r = re(null), x = $(
    (g) => {
      const y = g?.target?.classList;
      !y?.contains("wx-line") && !y?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return se(() => {
    if (!s && n && r.current) {
      const g = (y) => {
        r.current && !r.current.contains(y.target) && x(y);
      };
      return document.addEventListener("click", g), () => {
        document.removeEventListener("click", g);
      };
    }
  }, [s, n, x]), /* @__PURE__ */ Re("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((g) => {
      const y = "wx-dkx3NwEn wx-line" + (S && g.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ a(
        "polyline",
        {
          className: y,
          points: g.$p,
          onClick: () => !s && t(g.id),
          "data-link-id": g.id
        },
        g.id
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
    const r = n.duration * n.progress / 100, x = n.segments;
    let g = 0, y = 0, d = null;
    do {
      const L = x[y];
      y === S && (g > r ? d = 0 : d = Math.min((r - g) / L.duration, 1) * 100), g += L.duration, y++;
    } while (d === null && y < x.length);
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
  } = t, r = Ae(We), [x, g] = Ue(r, "_tasks"), [y, d] = Ue(r, "_links"), L = W(r, "area"), D = W(r, "_scales"), C = W(r, "taskTypes"), _ = W(r, "baselines"), [c, H] = Ue(r, "_selected"), q = W(r, "_scrollTask"), z = W(r, "criticalPath"), B = W(r, "tasks"), k = W(r, "schedule"), G = W(r, "splitTasks"), p = b(() => {
    if (!L || !Array.isArray(x)) return [];
    const e = L.start ?? 0, f = L.end ?? 0;
    return x.slice(e, f).map((T) => ({ ...T }));
  }, [g, L]), X = W(r, "cellHeight"), J = b(() => {
    if (!l || !o || !p.length) return p;
    const e = /* @__PURE__ */ new Map(), f = [];
    return x.forEach((T) => {
      const I = o.taskRows.get(T.id) ?? T.id;
      e.has(I) || (e.set(I, f.length), f.push(I));
    }), p.map((T) => {
      const I = o.taskRows.get(T.id) ?? T.id, A = e.get(I) ?? 0;
      return {
        ...T,
        $y: A * X,
        $y_base: T.$y_base !== void 0 ? A * X : void 0
      };
    });
  }, [p, l, o, x, X]), oe = b(
    () => D.lengthUnitWidth,
    [D]
  ), O = b(
    () => D.lengthUnit || "day",
    [D]
  ), ie = re(!1), [R, M] = de(void 0), [m, Y] = de(null), Q = re(null), [ee, ae] = de(null), [le, ue] = de(void 0), U = re(null), [w, P] = de(0), [F, V] = de(null), [Z, xe] = de(null), fe = re(null), E = b(() => {
    const e = fe.current;
    return !!(c.length && e && e.contains(document.activeElement));
  }, [c, fe.current]), te = b(() => E && c[c.length - 1]?.id, [E, c]);
  se(() => {
    if (q && E && q) {
      const { id: e } = q, f = fe.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      f && f.focus({ preventScroll: !0 });
    }
  }, [q]), se(() => {
    const e = fe.current;
    if (e && (P(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const f = new ResizeObserver((T) => {
        T[0] && P(T[0].contentRect.width);
      });
      return f.observe(e), () => f.disconnect();
    }
  }, [fe.current]);
  const we = $(() => {
    document.body.style.userSelect = "none";
  }, []), ve = $(() => {
    document.body.style.userSelect = "";
  }, []), $e = $(
    (e, f, T) => {
      if (f.target.classList.contains("wx-line") || (T || (T = r.getTask(Ye(e))), T.type === "milestone" || T.type === "summary")) return "";
      const I = ze(f, "data-segment");
      I && (e = I);
      const { left: A, width: ne } = e.getBoundingClientRect(), ce = (f.clientX - A) / ne;
      let be = 0.2 / (ne > 200 ? ne / 200 : 1);
      return ce < be ? "start" : ce > 1 - be ? "end" : "";
    },
    [r]
  ), Ce = b(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return x.forEach((I) => {
        e.set(I.id, I.$y);
      }), e;
    const f = /* @__PURE__ */ new Map(), T = [];
    return x.forEach((I) => {
      const A = o.taskRows.get(I.id) ?? I.id;
      f.has(A) || (f.set(A, T.length), T.push(A));
    }), x.forEach((I) => {
      const A = o.taskRows.get(I.id) ?? I.id, ne = f.get(A) ?? 0;
      e.set(I.id, ne * X);
    }), e;
  }, [x, l, o, X]), Le = $(
    (e) => {
      const f = fe.current;
      if (!f) return [];
      const T = f.parentElement?.scrollLeft || 0, I = f.parentElement?.parentElement?.scrollTop || 0, A = Math.min(e.startX, e.currentX), ne = Math.max(e.startX, e.currentX), ce = Math.min(e.startY, e.currentY), be = Math.max(e.startY, e.currentY);
      return x.filter((ye) => {
        const Ee = ye.$x - T, He = ye.$x + ye.$w - T, _e = (Ce.get(ye.id) ?? ye.$y) - I, Me = _e + ye.$h;
        return Ee < ne && He > A && _e < be && Me > ce;
      });
    },
    [x, Ce]
  ), Ne = b(() => new Set(c.map((e) => e.id)), [c, H]), he = $(
    (e) => Ne.has(e),
    [Ne]
  ), u = $(
    (e, f) => {
      const { clientX: T } = f, I = Ye(e), A = r.getTask(I), ne = f.target.classList;
      if (!f.target.closest(".wx-delete-button") && !n) {
        if (ne.contains("wx-progress-marker")) {
          const { progress: ce } = r.getTask(I);
          Q.current = {
            id: I,
            x: T,
            progress: ce,
            dx: 0,
            node: e,
            marker: f.target
          }, f.target.classList.add("wx-progress-in-drag");
        } else {
          const ce = $e(e, f, A) || "move", be = {
            id: I,
            mode: ce,
            x: T,
            dx: 0,
            l: A.$x,
            w: A.$w
          };
          if (G && A.segments?.length) {
            const ye = ze(f, "data-segment");
            ye && (be.segmentIndex = ye.dataset.segment * 1, Ot(A, be));
          }
          Y(be);
        }
        we();
      }
    },
    [r, n, $e, we, G]
  ), j = $(
    (e) => {
      if (e.button !== 0) return;
      const f = ze(e);
      if (!f && S && !n) {
        const T = fe.current;
        if (!T) return;
        const I = T.getBoundingClientRect(), A = e.clientX - I.left, ne = e.clientY - I.top;
        V({
          startX: A,
          startY: ne,
          currentX: A,
          currentY: ne,
          ctrlKey: e.ctrlKey || e.metaKey
        }), we();
        return;
      }
      if (f) {
        if (S && !n && c.length > 1) {
          const T = Ye(f);
          if (he(T)) {
            const I = e.target.classList;
            if (!I.contains("wx-link") && !I.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const A = r.getTask(T);
              if (!$e(f, e, A)) {
                const ce = /* @__PURE__ */ new Map();
                c.forEach((be) => {
                  const ye = r.getTask(be.id);
                  if (ye) {
                    if (k?.auto && ye.type === "summary") return;
                    ce.set(be.id, {
                      $x: ye.$x,
                      $w: ye.$w,
                      start: ye.start,
                      end: ye.end
                    });
                  }
                }), xe({
                  baseTaskId: T,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: ce
                }), we();
                return;
              }
            }
          }
        }
        u(f, e);
      }
    },
    [u, S, n, c, he, r, $e, k, we]
  ), me = $(
    (e) => {
      const f = ze(e);
      f && (U.current = setTimeout(() => {
        ue(!0), u(f, e.touches[0]);
      }, 300));
    },
    [u]
  ), N = $(
    (e) => {
      ae(e && { ...y.find((f) => f.id === e) });
    },
    [y]
  ), ke = $(() => {
    if (F) {
      const e = Le(F);
      F.ctrlKey ? e.forEach((f) => {
        r.exec("select-task", { id: f.id, toggle: !0, marquee: !0 });
      }) : (c.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), e.forEach((f, T) => {
        r.exec("select-task", {
          id: f.id,
          toggle: T > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), V(null), ve(), ie.current = !0;
      return;
    }
    if (Z) {
      const { dx: e, originalPositions: f } = Z, T = Math.round(e / oe);
      if (T !== 0) {
        let I = !0;
        f.forEach((A, ne) => {
          const ce = r.getTask(ne);
          ce && (r.exec("update-task", {
            id: ne,
            diff: T,
            task: { start: ce.start, end: ce.end },
            skipUndo: !I
            // Only first task creates undo entry
          }), I = !1);
        }), ie.current = !0;
      } else
        f.forEach((I, A) => {
          r.exec("drag-task", {
            id: A,
            left: I.$x,
            width: I.$w,
            inProgress: !1
          });
        });
      xe(null), ve();
      return;
    }
    if (Q.current) {
      const { dx: e, id: f, marker: T, value: I } = Q.current;
      Q.current = null, typeof I < "u" && e && r.exec("update-task", {
        id: f,
        task: { progress: I },
        inProgress: !1
      }), T.classList.remove("wx-progress-in-drag"), ie.current = !0, ve();
    } else if (m) {
      const { id: e, mode: f, dx: T, l: I, w: A, start: ne, segment: ce, index: be } = m;
      if (Y(null), ne) {
        const ye = Math.round(T / oe);
        if (!ye)
          r.exec("drag-task", {
            id: e,
            width: A,
            left: I,
            inProgress: !1,
            ...ce && { segmentIndex: be }
          });
        else {
          let Ee = {}, He = r.getTask(e);
          ce && (He = He.segments[be]);
          const Be = 1440 * 60 * 1e3, Me = ye * (O === "week" ? 7 : O === "month" ? 30 : O === "quarter" ? 91 : O === "year" ? 365 : 1) * Be;
          f === "move" ? (Ee.start = new Date(He.start.getTime() + Me), Ee.end = new Date(He.end.getTime() + Me)) : f === "start" ? (Ee.start = new Date(He.start.getTime() + Me), Ee.end = He.end) : f === "end" && (Ee.start = He.start, Ee.end = new Date(He.end.getTime() + Me)), r.exec("update-task", {
            id: e,
            task: Ee,
            ...ce && { segmentIndex: be }
          });
        }
        ie.current = !0;
      }
      ve();
    }
  }, [r, ve, m, oe, O, F, Z, Le, c]), Ie = $(
    (e, f) => {
      const { clientX: T, clientY: I } = f;
      if (!n) {
        if (F) {
          const A = fe.current;
          if (!A) return;
          const ne = A.getBoundingClientRect(), ce = T - ne.left, be = I - ne.top;
          V((ye) => ({
            ...ye,
            currentX: ce,
            currentY: be
          }));
          return;
        }
        if (Z) {
          const A = T - Z.startX;
          Z.originalPositions.forEach((ne, ce) => {
            const be = ne.$x + A;
            r.exec("drag-task", {
              id: ce,
              left: be,
              width: ne.$w,
              inProgress: !0
            });
          }), xe((ne) => ({ ...ne, dx: A }));
          return;
        }
        if (Q.current) {
          const { node: A, x: ne, id: ce } = Q.current, be = Q.current.dx = T - ne, ye = Math.round(be / A.offsetWidth * 100);
          let Ee = Q.current.progress + ye;
          Q.current.value = Ee = Math.min(
            Math.max(0, Ee),
            100
          ), r.exec("update-task", {
            id: ce,
            task: { progress: Ee },
            inProgress: !0
          });
        } else if (m) {
          N(null);
          const { mode: A, l: ne, w: ce, x: be, id: ye, start: Ee, segment: He, index: Be } = m, _e = r.getTask(ye), Me = T - be;
          if (!Ee && Math.abs(Me) < 20 || A === "start" && ce - Me < oe || A === "end" && ce + Me < oe || A === "move" && (Me < 0 && ne + Me < 0 || Me > 0 && ne + ce + Me > w) || m.segment && !Vt(_e, m))
            return;
          const st = { ...m, dx: Me };
          let je, Qe;
          if (A === "start" ? (je = ne + Me, Qe = ce - Me) : A === "end" ? (je = ne, Qe = ce + Me) : A === "move" && (je = ne + Me, Qe = ce), r.exec("drag-task", {
            id: ye,
            width: Qe,
            left: je,
            inProgress: !0,
            ...He && { segmentIndex: Be }
          }), !st.start && (A === "move" && _e.$x == ne || A !== "move" && _e.$w == ce)) {
            ie.current = !0, ke();
            return;
          }
          st.start = !0, Y(st);
        } else {
          const A = ze(e);
          if (A) {
            const ne = r.getTask(Ye(A)), be = ze(e, "data-segment") || A, ye = $e(be, f, ne);
            be.style.cursor = ye && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      m,
      oe,
      w,
      $e,
      N,
      ke,
      F,
      Z
    ]
  ), Oe = $(
    (e) => {
      Ie(e, e);
    },
    [Ie]
  ), Xe = $(
    (e) => {
      le ? (e.preventDefault(), Ie(e, e.touches[0])) : U.current && (clearTimeout(U.current), U.current = null);
    },
    [le, Ie]
  ), Se = $(() => {
    ke();
  }, [ke]), qe = $(() => {
    ue(null), U.current && (clearTimeout(U.current), U.current = null), ke();
  }, [ke]);
  se(() => (window.addEventListener("mouseup", Se), () => {
    window.removeEventListener("mouseup", Se);
  }), [Se]);
  const tt = $(
    (e) => {
      if (!n) {
        const f = Fe(e.target);
        if (f && !e.target.classList.contains("wx-link")) {
          const T = Fe(e.target, "data-segment");
          r.exec("show-editor", {
            id: f,
            ...T !== null && { segmentIndex: T }
          });
        }
      }
    },
    [r, n]
  ), i = ["e2s", "s2s", "e2e", "s2e"], h = $((e, f) => i[(e ? 1 : 0) + (f ? 0 : 2)], []), v = $(
    (e, f) => {
      const T = R.id, I = R.start;
      return e === T ? !0 : !!y.find((A) => A.target == e && A.source == T && A.type === h(I, f));
    },
    [R, d, h]
  ), K = $(() => {
    R && M(null);
  }, [R]), pe = $(
    (e) => {
      if (ie.current) {
        ie.current = !1;
        return;
      }
      const f = Fe(e.target);
      if (f) {
        const T = e.target.classList;
        if (T.contains("wx-link")) {
          const I = T.contains("wx-left");
          if (!R) {
            M({ id: f, start: I });
            return;
          }
          R.id !== f && !v(f, I) && r.exec("add-link", {
            link: {
              source: R.id,
              target: f,
              type: h(R.start, I)
            }
          });
        } else if (T.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: ee.id }), ae(null);
        else {
          let I;
          const A = ze(e, "data-segment");
          A && (I = A.dataset.segment * 1), r.exec("select-task", {
            id: f,
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
      R,
      d,
      ee,
      v,
      h,
      K
    ]
  ), ge = $((e) => ({
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
      if (le || U.current)
        return e.preventDefault(), !1;
    },
    [le]
  ), it = b(
    () => C.map((e) => e.id),
    [C]
  ), lt = $(
    (e) => {
      let f = it.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (f = `task ${f}`), f;
    },
    [it]
  ), ct = $(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), nt = $(
    (e) => z && B.byId(e).$critical,
    [z, B]
  ), at = $(
    (e) => {
      if (k?.auto) {
        const f = B.getSummaryId(e, !0), T = B.getSummaryId(R.id, !0);
        return R?.id && !(Array.isArray(f) ? f : [f]).includes(
          R.id
        ) && !(Array.isArray(T) ? T : [T]).includes(e);
      }
      return R;
    },
    [k, B, R]
  ), dt = b(() => {
    if (!F) return null;
    const e = Math.min(F.startX, F.currentX), f = Math.min(F.startY, F.currentY), T = Math.abs(F.currentX - F.startX), I = Math.abs(F.currentY - F.startY);
    return {
      left: `${e}px`,
      top: `${f}px`,
      width: `${T}px`,
      height: `${I}px`
    };
  }, [F]);
  return /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${J.length ? J[0].$h : 0}px` },
      ref: fe,
      onContextMenu: De,
      onMouseDown: j,
      onMouseMove: Oe,
      onTouchStart: me,
      onTouchMove: Xe,
      onTouchEnd: qe,
      onClick: pe,
      onDoubleClick: tt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ a(
          un,
          {
            onSelectLink: N,
            selectedLink: ee,
            readonly: n
          }
        ),
        J.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const f = `wx-bar wx-${lt(e.type)}` + (le && m && e.id === m.id ? " wx-touch" : "") + (R && R.id === e.id ? " wx-selected" : "") + (Ne.has(e.id) ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (G && e.segments ? " wx-split" : ""), T = "wx-link wx-left" + (R ? " wx-visible" : "") + (!R || !v(e.id, !0) && at(e.id) ? " wx-target" : "") + (R && R.id === e.id && R.start ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : ""), I = "wx-link wx-right" + (R ? " wx-visible" : "") + (!R || !v(e.id, !1) && at(e.id) ? " wx-target" : "") + (R && R.id === e.id && !R.start ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Re(Lt, { children: [
            !e.$skip && /* @__PURE__ */ Re(
              "div",
              {
                className: "wx-GKbcLEGA " + f,
                style: ge(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: te === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === ee?.target && ee?.type[2] === "s" ? /* @__PURE__ */ a(
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
                  n ? null : e.id === ee?.target && ee?.type[2] === "e" ? /* @__PURE__ */ a(
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
            _ && !e.$skip_baseline ? /* @__PURE__ */ a(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Te(e)
              }
            ) : null
          ] }, e.id);
        }),
        F && dt && /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: dt })
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
      children: (o.cells || []).map((r, x) => {
        const g = n ? n(r.date, r.unit) : "", y = "wx-cell " + (r.css || "") + " " + (g || "");
        return /* @__PURE__ */ a(
          "div",
          {
            className: "wx-ZkvhDKir " + y,
            style: { width: `${r.width}px` },
            children: r.value
          },
          x
        );
      })
    },
    S
  )) });
}
const gn = /* @__PURE__ */ new Map();
function xn(t) {
  const n = re(null), s = re(0), l = re(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
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
    multiTaskRows: x = !1,
    rowMapping: g = null,
    marqueeSelect: y = !1
  } = t, d = Ae(We), [L, D] = Ue(d, "_selected"), C = W(d, "scrollTop"), _ = W(d, "cellHeight"), c = W(d, "cellWidth"), H = W(d, "_scales"), q = W(d, "_markers"), z = W(d, "_scrollTask"), B = W(d, "zoom"), k = W(d, "_tasks"), [G, p] = de(), X = re(null), J = re(0), oe = 1 + (H?.rows?.length || 0), O = b(() => {
    if (!x || !g || !k?.length) return null;
    const w = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), F = [];
    return k.forEach((V) => {
      const Z = g.taskRows.get(V.id) ?? V.id;
      P.has(Z) || (P.set(Z, F.length), F.push(Z));
    }), k.forEach((V) => {
      const Z = g.taskRows.get(V.id) ?? V.id, xe = P.get(Z) ?? 0;
      w.set(V.id, xe * _);
    }), w;
  }, [k, x, g, _]), ie = b(() => {
    const w = [];
    return L && L.length && _ && L.forEach((P) => {
      const F = O?.get(P.id) ?? P.$y;
      w.push({ height: `${_}px`, top: `${F - 3}px` });
    }), w;
  }, [D, _, O]), R = b(
    () => Math.max(G || 0, l),
    [G, l]
  );
  se(() => {
    const w = X.current;
    w && typeof C == "number" && (w.scrollTop = C);
  }, [C]);
  const M = () => {
    m();
  };
  function m(w) {
    const P = X.current;
    if (!P) return;
    const F = {};
    F.left = P.scrollLeft, d.exec("scroll-chart", F);
  }
  function Y() {
    const w = X.current, F = Math.ceil((G || 0) / (_ || 1)) + 1, V = Math.floor((w && w.scrollTop || 0) / (_ || 1)), Z = Math.max(0, V - oe), xe = V + F + oe, fe = Z * (_ || 0);
    d.exec("render-data", {
      start: Z,
      end: xe,
      from: fe
    });
  }
  se(() => {
    Y();
  }, [G, C]);
  const Q = $(
    (w) => {
      if (!w) return;
      const { id: P, mode: F } = w;
      if (F.toString().indexOf("x") < 0) return;
      const V = X.current;
      if (!V) return;
      const { clientWidth: Z } = V, xe = d.getTask(P);
      if (xe.$x + xe.$w < V.scrollLeft)
        d.exec("scroll-chart", { left: xe.$x - (c || 0) }), V.scrollLeft = xe.$x - (c || 0);
      else if (xe.$x >= Z + V.scrollLeft) {
        const fe = Z < xe.$w ? c || 0 : xe.$w;
        d.exec("scroll-chart", { left: xe.$x - Z + fe }), V.scrollLeft = xe.$x - Z + fe;
      }
    },
    [d, c]
  );
  se(() => {
    Q(z);
  }, [z]);
  function ee(w) {
    if (B && (w.ctrlKey || w.metaKey)) {
      w.preventDefault();
      const P = X.current, F = w.clientX - (P ? P.getBoundingClientRect().left : 0);
      if (J.current += w.deltaY, Math.abs(J.current) >= 150) {
        const Z = -Math.sign(J.current);
        J.current = 0, d.exec("zoom-scale", {
          dir: Z,
          offset: F
        });
      }
    }
  }
  function ae(w) {
    const P = r(w.date, w.unit);
    return P ? {
      css: P,
      width: w.width
    } : null;
  }
  const le = b(() => H && (H.minUnit === "hour" || H.minUnit === "day") && r ? H.rows[H.rows.length - 1].cells.map(ae) : null, [H, r]), ue = $(
    (w) => {
      w.eventSource = "chart", d.exec("hotkey", w);
    },
    [d]
  );
  se(() => {
    const w = X.current;
    if (!w) return;
    const P = () => p(w.clientHeight);
    P();
    const F = new ResizeObserver(() => P());
    return F.observe(w), () => {
      F.disconnect();
    };
  }, [X.current]);
  const U = re(null);
  return se(() => {
    const w = X.current;
    if (w && !U.current)
      return U.current = Rt(w, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (P) => ue(P)
      }), () => {
        U.current?.destroy(), U.current = null;
      };
  }, []), se(() => {
    const w = X.current;
    if (!w) return;
    const P = ee;
    return w.addEventListener("wheel", P), () => {
      w.removeEventListener("wheel", P);
    };
  }, [ee]), xn("chart"), /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: X,
      onScroll: M,
      children: [
        /* @__PURE__ */ a(mn, { highlightTime: r, scales: H }),
        q && q.length ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${R}px` },
            children: q.map((w, P) => /* @__PURE__ */ a(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${w.css || ""}`,
                style: { left: `${w.left}px` },
                children: /* @__PURE__ */ a("div", { className: "wx-mR7v2Xag wx-content", children: w.text })
              },
              P
            ))
          }
        ) : null,
        /* @__PURE__ */ Re(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${R}px` },
            children: [
              le ? /* @__PURE__ */ a(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: le.map(
                    (w, P) => w ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + w.css,
                        style: {
                          width: `${w.width}px`,
                          left: `${P * w.width}px`
                        }
                      },
                      P
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ a(dn, { borders: S }),
              L && L.length ? L.map(
                (w, P) => w.$y ? /* @__PURE__ */ a(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": w.id,
                    style: ie[P]
                  },
                  w.id
                ) : null
              ) : null,
              /* @__PURE__ */ a(
                hn,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: x,
                  rowMapping: g,
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
    containerWidth: x = 0,
    leftThreshold: g = 50,
    rightThreshold: y = 50
  } = t, [d, L] = rt(t.value ?? 0), [D, C] = rt(t.display ?? "all");
  function _(ae) {
    let le = 0;
    n == "center" ? le = s / 2 : n == "before" && (le = s);
    const ue = {
      size: [s + "px", "auto"],
      p: [ae - le + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let U in ue) ue[U] = ue[U].reverse();
    return ue;
  }
  const [c, H] = de(!1), [q, z] = de(null), B = re(0), k = re(), G = re(), p = re(D);
  se(() => {
    p.current = D;
  }, [D]), se(() => {
    q === null && d > 0 && z(d);
  }, [q, d]);
  function X(ae) {
    return l == "x" ? ae.clientX : ae.clientY;
  }
  const J = $(
    (ae) => {
      const le = k.current + X(ae) - B.current;
      L(le);
      let ue;
      le <= g ? ue = "chart" : x - le <= y ? ue = "grid" : ue = "all", p.current !== ue && (C(ue), p.current = ue), G.current && clearTimeout(G.current), G.current = setTimeout(() => o && o(le), 100);
    },
    [x, g, y, o]
  ), oe = $(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", H(!1), window.removeEventListener("mousemove", J), window.removeEventListener("mouseup", oe);
  }, [J]), O = b(
    () => D !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [D, l]
  ), ie = $(
    (ae) => {
      !r && (D === "grid" || D === "chart") || (B.current = X(ae), k.current = d, H(!0), document.body.style.cursor = O, document.body.style.userSelect = "none", window.addEventListener("mousemove", J), window.addEventListener("mouseup", oe));
    },
    [O, J, oe, d, r, D]
  );
  function R() {
    C("all"), q !== null && (L(q), o && o(q));
  }
  function M(ae) {
    if (r) {
      const le = D === "chart" ? "grid" : "chart";
      C(le), S(le);
    } else if (D === "grid" || D === "chart")
      R(), S("all");
    else {
      const le = ae === "left" ? "chart" : "grid";
      C(le), S(le);
    }
  }
  function m() {
    M("left");
  }
  function Y() {
    M("right");
  }
  const Q = b(() => _(d), [d, n, s, l]), ee = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${D}`,
    c ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Re(
    "div",
    {
      className: "wx-pFykzMlT " + ee,
      onMouseDown: ie,
      style: { width: Q.size[0], height: Q.size[1], cursor: O },
      children: [
        /* @__PURE__ */ Re("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: m
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: Y
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
    rowMapping: x = null,
    marqueeSelect: g = !1
  } = t, y = Ae(We), d = W(y, "_tasks"), L = W(y, "_scales"), D = W(y, "cellHeight"), C = W(y, "columns"), _ = W(y, "_scrollTask"), c = W(y, "undo"), [H, q] = de(!1);
  let [z, B] = de(0);
  const [k, G] = de(0), [p, X] = de(0), [J, oe] = de(void 0), [O, ie] = de("all"), R = re(null), M = $(
    (E) => {
      q((te) => (E !== te && (E ? (R.current = O, O === "all" && ie("grid")) : (!R.current || R.current === "all") && ie("all")), E));
    },
    [O]
  );
  se(() => {
    const E = Et(M);
    return E.observe(), () => {
      E.disconnect();
    };
  }, [M]);
  const m = b(() => {
    let E;
    return C.every((te) => te.width && !te.flexgrow) ? E = C.reduce((te, we) => te + parseInt(we.width), 0) : H && O === "chart" ? E = parseInt(C.find((te) => te.id === "action")?.width) || 50 : E = 440, z = E, E;
  }, [C, H, O]);
  se(() => {
    B(m);
  }, [m]);
  const Y = b(
    () => (k ?? 0) - (J ?? 0),
    [k, J]
  ), Q = b(() => L.width, [L]), ee = b(() => {
    if (!r || !x)
      return d.length * D;
    const E = /* @__PURE__ */ new Set();
    return d.forEach((te) => {
      const we = x.taskRows.get(te.id) ?? te.id;
      E.add(we);
    }), E.size * D;
  }, [d, D, r, x]), ae = b(
    () => L.height + ee + Y,
    [L, ee, Y]
  ), le = b(
    () => z + Q,
    [z, Q]
  ), ue = re(null), U = $(() => {
    Promise.resolve().then(() => {
      if ((k ?? 0) > (le ?? 0)) {
        const E = (k ?? 0) - z;
        y.exec("expand-scale", { minWidth: E });
      }
    });
  }, [k, le, z, y]);
  se(() => {
    let E;
    return ue.current && (E = new ResizeObserver(U), E.observe(ue.current)), () => {
      E && E.disconnect();
    };
  }, [ue.current, U]), se(() => {
    U();
  }, [Q]);
  const w = re(null), P = re(null), F = $(() => {
    const E = w.current;
    E && y.exec("scroll-chart", {
      top: E.scrollTop
    });
  }, [y]), V = re({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  se(() => {
    V.current = {
      rTasks: d,
      rScales: L,
      rCellHeight: D,
      scrollSize: Y,
      ganttDiv: w.current,
      ganttHeight: p ?? 0
    };
  }, [d, L, D, Y, p]);
  const Z = $(
    (E) => {
      if (!E) return;
      const {
        rTasks: te,
        rScales: we,
        rCellHeight: ve,
        scrollSize: $e,
        ganttDiv: Ce,
        ganttHeight: Le
      } = V.current;
      if (!Ce) return;
      const { id: Ne } = E, he = te.findIndex((u) => u.id === Ne);
      if (he > -1) {
        const u = Le - we.height, j = he * ve, me = Ce.scrollTop;
        let N = null;
        j < me ? N = j : j + ve > me + u && (N = j - u + ve + $e), N !== null && (y.exec("scroll-chart", { top: Math.max(N, 0) }), w.current.scrollTop = Math.max(N, 0));
      }
    },
    [y]
  );
  se(() => {
    Z(_);
  }, [_]), se(() => {
    const E = w.current, te = P.current;
    if (!E || !te) return;
    const we = () => {
      nn(() => {
        X(E.offsetHeight), G(E.offsetWidth), oe(te.offsetWidth);
      });
    }, ve = new ResizeObserver(we);
    return ve.observe(E), () => ve.disconnect();
  }, [w.current]);
  const xe = re(null), fe = re(null);
  return se(() => {
    fe.current && (fe.current.destroy(), fe.current = null);
    const E = xe.current;
    if (E)
      return fe.current = Rt(E, {
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
        exec: (te) => {
          te.isInput || y.exec("hotkey", te);
        }
      }), () => {
        fe.current?.destroy(), fe.current = null;
      };
  }, [c]), /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-gantt", ref: w, onScroll: F, children: /* @__PURE__ */ a(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ae, width: "100%" },
      ref: P,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: p,
            width: J
          },
          children: /* @__PURE__ */ Re("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: xe, children: [
            C.length ? /* @__PURE__ */ Re(Ve, { children: [
              /* @__PURE__ */ a(
                an,
                {
                  display: O,
                  compactMode: H,
                  columnWidth: m,
                  width: z,
                  readonly: s,
                  fullHeight: ee,
                  onTableAPIChange: S,
                  multiTaskRows: r,
                  rowMapping: x
                }
              ),
              /* @__PURE__ */ a(
                pn,
                {
                  value: z,
                  display: O,
                  compactMode: H,
                  containerWidth: k,
                  onMove: (E) => B(E),
                  onDisplayChange: (E) => ie(E)
                }
              )
            ] }) : null,
            /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-content", ref: ue, children: /* @__PURE__ */ a(
              wn,
              {
                readonly: s,
                fullWidth: Q,
                fullHeight: ee,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: o,
                multiTaskRows: r,
                rowMapping: x,
                marqueeSelect: g
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
  links: x = [],
  scales: g = Rn,
  columns: y = Qt,
  start: d = null,
  end: L = null,
  lengthUnit: D = "day",
  durationUnit: C = "day",
  cellWidth: _ = 100,
  cellHeight: c = 38,
  scaleHeight: H = 36,
  readonly: q = !1,
  cellBorders: z = "full",
  zoom: B = !1,
  baselines: k = !1,
  highlightTime: G = null,
  init: p = null,
  autoScale: X = !0,
  unscheduledTasks: J = !1,
  criticalPath: oe = null,
  schedule: O = { type: "forward" },
  projectStart: ie = null,
  projectEnd: R = null,
  calendar: M = null,
  undo: m = !1,
  splitTasks: Y = !1,
  multiTaskRows: Q = !1,
  marqueeSelect: ee = !1,
  ...ae
}, le) {
  const ue = re();
  ue.current = ae;
  const U = b(() => new qt(Jt), []), w = b(() => ({ ...ot, ...et }), []), P = Ae(Ge.i18n), F = b(() => P ? P.extend(w, !0) : Je(w), [P, w]), V = b(() => F.getRaw().calendar, [F]), Z = b(() => {
    let he = {
      zoom: Mn(B, V),
      scales: Nt(g, V),
      columns: $n(y, V),
      links: Bt(x),
      cellWidth: _
    };
    return he.zoom && (he = {
      ...he,
      ...jt(
        he.zoom,
        Tn(V, F.getGroup("gantt")),
        he.scales,
        _
      )
    }), he;
  }, [B, g, y, x, _, V, F]), xe = re(null);
  xe.current !== o && (gt(o, { durationUnit: C, splitTasks: Y, calendar: M }), xe.current = o), se(() => {
    gt(o, { durationUnit: C, splitTasks: Y, calendar: M });
  }, [o, C, M, Y]);
  const fe = b(() => {
    if (!Q) return null;
    const he = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), j = (me) => {
      me.forEach((N) => {
        const ke = N.row ?? N.id;
        u.set(N.id, ke), he.has(ke) || he.set(ke, []), he.get(ke).push(N.id), N.data && N.data.length > 0 && j(N.data);
      });
    };
    return j(o), { rowMap: he, taskRows: u };
  }, [o, Q]), E = b(() => U.in, [U]), te = re(null);
  te.current === null && (te.current = new Ft((he, u) => {
    const j = "on" + Cn(he);
    ue.current && ue.current[j] && ue.current[j](u);
  }), E.setNext(te.current));
  const [we, ve] = de(null), $e = re(null);
  $e.current = we;
  const Ce = b(
    () => ({
      getState: U.getState.bind(U),
      getReactiveState: U.getReactive.bind(U),
      getStores: () => ({ data: U }),
      exec: E.exec,
      setNext: (he) => (te.current = te.current.setNext(he), te.current),
      intercept: E.intercept.bind(E),
      on: E.on.bind(E),
      detach: E.detach.bind(E),
      getTask: U.getTask.bind(U),
      serialize: U.serialize.bind(U),
      getTable: (he) => he ? new Promise((u) => setTimeout(() => u($e.current), 1)) : $e.current,
      getHistory: () => U.getHistory()
    }),
    [U, E]
  );
  Tt(
    le,
    () => ({
      ...Ce
    }),
    [Ce]
  );
  const Le = re(0);
  se(() => {
    Le.current ? U.init({
      tasks: o,
      links: Z.links,
      start: d,
      columns: Z.columns,
      end: L,
      lengthUnit: D,
      cellWidth: Z.cellWidth,
      cellHeight: c,
      scaleHeight: H,
      scales: Z.scales,
      taskTypes: l,
      zoom: Z.zoom,
      selected: S,
      activeTask: r,
      baselines: k,
      autoScale: X,
      unscheduledTasks: J,
      markers: s,
      durationUnit: C,
      criticalPath: oe,
      schedule: O,
      projectStart: ie,
      projectEnd: R,
      calendar: M,
      undo: m,
      _weekStart: V.weekStart,
      splitTasks: Y
    }) : p && p(Ce), Le.current++;
  }, [
    Ce,
    p,
    o,
    Z,
    d,
    L,
    D,
    c,
    H,
    l,
    S,
    r,
    k,
    X,
    J,
    s,
    C,
    oe,
    O,
    ie,
    R,
    M,
    m,
    V,
    Y,
    U
  ]), Le.current === 0 && U.init({
    tasks: o,
    links: Z.links,
    start: d,
    columns: Z.columns,
    end: L,
    lengthUnit: D,
    cellWidth: Z.cellWidth,
    cellHeight: c,
    scaleHeight: H,
    scales: Z.scales,
    taskTypes: l,
    zoom: Z.zoom,
    selected: S,
    activeTask: r,
    baselines: k,
    autoScale: X,
    unscheduledTasks: J,
    markers: s,
    durationUnit: C,
    criticalPath: oe,
    schedule: O,
    projectStart: ie,
    projectEnd: R,
    calendar: M,
    undo: m,
    _weekStart: V.weekStart,
    splitTasks: Y
  });
  const Ne = b(() => M ? (he, u) => u == "day" && !M.getDayHours(he) || u == "hour" && !M.getDayHours(he) ? "wx-weekend" : "" : G, [M, G]);
  return /* @__PURE__ */ a(Ge.i18n.Provider, { value: F, children: /* @__PURE__ */ a(We.Provider, { value: Ce, children: /* @__PURE__ */ a(
    kn,
    {
      taskTemplate: n,
      readonly: q,
      cellBorders: z,
      highlightTime: Ne,
      onTableAPIChange: ve,
      multiTaskRows: Q,
      rowMapping: fe,
      marqueeSelect: ee
    }
  ) }) });
});
function Vn({ api: t = null, items: n = [] }) {
  const s = Ae(Ge.i18n), l = b(() => s || Je(et), [s]), o = b(() => l.getGroup("gantt"), [l]), S = Pe(t, "_selected"), r = Pe(t, "undo"), x = Pe(t, "history"), g = Pe(t, "splitTasks"), y = ["undo", "redo"], d = b(() => {
    const D = xt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : xt({
      undo: r,
      splitTasks: g
    })).map((_) => {
      let c = { ..._, disabled: !1 };
      return c.handler = Ct(D, c.id) ? (H) => Mt(t, H.id, null, o) : c.handler, c.text && (c.text = o(c.text)), c.menuText && (c.menuText = o(c.menuText)), c;
    });
  }, [n, t, o, r, g]), L = b(() => {
    const D = [];
    return d.forEach((C) => {
      const _ = C.id;
      if (_ === "add-task")
        D.push(C);
      else if (y.includes(_))
        y.includes(_) && D.push({
          ...C,
          disabled: C.isDisabled(x)
        });
      else {
        if (!S?.length || !t) return;
        D.push({
          ...C,
          disabled: C.isDisabled && S.some((c) => C.isDisabled(c, t.getState()))
        });
      }
    }), D.filter((C, _) => {
      if (t && C.isHidden)
        return !S.some((c) => C.isHidden(c, t.getState()));
      if (C.comp === "separator") {
        const c = D[_ + 1];
        if (!c || c.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, S, x, d]);
  return s ? /* @__PURE__ */ a(pt, { items: L }) : /* @__PURE__ */ a(Ge.i18n.Provider, { value: l, children: /* @__PURE__ */ a(pt, { items: L }) });
}
const qn = vt(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: o = null,
  at: S = "point",
  children: r,
  onClick: x,
  css: g
}, y) {
  const d = re(null), L = re(null), D = Ae(Ge.i18n), C = b(() => D || Je({ ...et, ...ot }), [D]), _ = b(() => C.getGroup("gantt"), [C]), c = Pe(s, "taskTypes"), H = Pe(s, "selected"), q = Pe(s, "_selected"), z = Pe(s, "splitTasks"), B = b(() => wt({ splitTasks: !0 }), []);
  se(() => {
    s && (s.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), s.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [s]);
  function k(M) {
    return M.map((m) => (m = { ...m }, m.text && (m.text = _(m.text)), m.subtext && (m.subtext = _(m.subtext)), m.data && (m.data = k(m.data)), m));
  }
  function G() {
    const M = n.length ? n : wt({ splitTasks: z }), m = M.find((Y) => Y.id === "convert-task");
    return m && (m.data = [], (c || []).forEach((Y) => {
      m.data.push(m.dataFactory(Y));
    })), k(M);
  }
  const p = b(() => G(), [s, n, c, z, _]), X = b(
    () => q && q.length ? q : [],
    [q]
  ), J = $(
    (M, m) => {
      let Y = M ? s?.getTask(M) : null;
      if (l) {
        const Q = l(M, m);
        Y = Q === !0 ? Y : Q;
      }
      if (Y) {
        const Q = Fe(m.target, "data-segment");
        Q !== null ? L.current = { id: Y.id, segmentIndex: Q } : L.current = Y.id, (!Array.isArray(H) || !H.includes(Y.id)) && s && s.exec && s.exec("select-task", { id: Y.id });
      }
      return Y;
    },
    [s, l, H]
  ), oe = $(
    (M) => {
      const m = M.action;
      m && (Ct(B, m.id) && Mt(s, m.id, L.current, _), x && x(M));
    },
    [s, _, x, B]
  ), O = $(
    (M, m) => {
      const Y = X.length ? X : m ? [m] : [];
      let Q = o ? Y.every((ee) => o(M, ee)) : !0;
      if (Q && (M.isHidden && (Q = !Y.some(
        (ee) => M.isHidden(ee, s.getState(), L.current)
      )), M.isDisabled)) {
        const ee = Y.some(
          (ae) => M.isDisabled(ae, s.getState(), L.current)
        );
        M.disabled = ee;
      }
      return Q;
    },
    [o, X, s]
  );
  Tt(y, () => ({
    show: (M, m) => {
      d.current && d.current.show && d.current.show(M, m);
    }
  }));
  const ie = $((M) => {
    d.current && d.current.show && d.current.show(M);
  }, []), R = /* @__PURE__ */ Re(Ve, { children: [
    /* @__PURE__ */ a(
      sn,
      {
        filter: O,
        options: p,
        dataKey: "id",
        resolver: J,
        onClick: oe,
        at: S,
        ref: d,
        css: g
      }
    ),
    /* @__PURE__ */ a("span", { onContextMenu: ie, "data-menu-ignore": "true", children: typeof r == "function" ? r() : r })
  ] });
  if (!D && Ge.i18n?.Provider) {
    const M = Ge.i18n.Provider;
    return /* @__PURE__ */ a(M, { value: C, children: R });
  }
  return R;
});
function En({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Ae(Ge.i18n).getGroup("gantt"), S = W(t, "activeTask"), r = W(t, "_activeTask"), x = W(t, "_links"), g = W(t, "schedule"), y = W(t, "unscheduledTasks"), [d, L] = de();
  function D() {
    if (S) {
      const H = x.filter((z) => z.target == S).map((z) => ({ link: z, task: t.getTask(z.source) })), q = x.filter((z) => z.source == S).map((z) => ({ link: z, task: t.getTask(z.target) }));
      return [
        { title: o("Predecessors"), data: H },
        { title: o("Successors"), data: q }
      ];
    }
  }
  se(() => {
    L(D());
  }, [S, x]);
  const C = b(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function _(H) {
    n ? t.exec("delete-link", { id: H }) : (L(
      (q) => (q || []).map((z) => ({
        ...z,
        data: z.data.filter((B) => B.link.id !== H)
      }))
    ), s && s({
      id: H,
      action: "delete-link",
      data: { id: H }
    }));
  }
  function c(H, q) {
    n ? t.exec("update-link", {
      id: H,
      link: q
    }) : (L(
      (z) => (z || []).map((B) => ({
        ...B,
        data: B.data.map(
          (k) => k.link.id === H ? { ...k, link: { ...k.link, ...q } } : k
        )
      }))
    ), s && s({
      id: H,
      action: "update-link",
      data: {
        id: H,
        link: q
      }
    }));
  }
  return /* @__PURE__ */ a(Ve, { children: (d || []).map(
    (H, q) => H.data.length ? /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ a(It, { label: H.title, position: "top", children: /* @__PURE__ */ a("table", { children: /* @__PURE__ */ a("tbody", { children: H.data.map((z) => /* @__PURE__ */ Re("tr", { children: [
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-task-name", children: z.task.text || "" }) }),
      g?.auto && z.link.type === "e2s" ? /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ a(
        Dt,
        {
          type: "number",
          placeholder: o("Lag"),
          value: z.link.lag,
          disabled: y && r?.unscheduled,
          onChange: (B) => {
            B.input || c(z.link.id, { lag: B.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ a(
        At,
        {
          value: z.link.type,
          placeholder: o("Select link type"),
          options: C,
          onChange: (B) => c(z.link.id, { type: B.value }),
          children: ({ option: B }) => B.label
        }
      ) }) }),
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => _(z.link.id),
          role: "button"
        }
      ) })
    ] }, z.link.id)) }) }) }) }, q) : null
  ) });
}
function Nn(t) {
  const { value: n, time: s, format: l, onchange: o, onChange: S, ...r } = t, x = S ?? o;
  function g(y) {
    const d = new Date(y.value);
    d.setHours(n.getHours()), d.setMinutes(n.getMinutes()), x && x({ value: d });
  }
  return /* @__PURE__ */ Re("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ a(
      Ht,
      {
        ...r,
        value: n,
        onChange: g,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ a(zt, { value: n, onChange: x, format: l }) : null
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
  topBar: x = !0,
  autoSave: g = !0,
  focus: y = !1,
  hotkeys: d = {}
}) {
  const L = Ae(Ge.i18n), D = b(() => L || Je({ ...et, ...ot }), [L]), C = b(() => D.getGroup("gantt"), [D]), _ = D.getRaw(), c = b(() => {
    const u = _.gantt?.dateFormat || _.formats?.dateFormat;
    return Ze(u, _.calendar);
  }, [_]), H = b(() => {
    if (x === !0 && !o) {
      const u = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: C("Delete"),
          id: "delete"
        }
      ];
      return g ? { items: u } : {
        items: [
          ...u,
          {
            comp: "button",
            type: "primary",
            text: C("Save"),
            id: "save"
          }
        ]
      };
    }
    return x;
  }, [x, o, g, C]), [q, z] = de(!1), B = b(
    () => q ? "wx-full-screen" : "",
    [q]
  ), k = $((u) => {
    z(u);
  }, []);
  se(() => {
    const u = Et(k);
    return u.observe(), () => {
      u.disconnect();
    };
  }, [k]);
  const G = W(t, "_activeTask"), p = W(t, "activeTask"), X = W(t, "unscheduledTasks"), J = W(t, "links"), oe = W(t, "splitTasks"), O = b(
    () => oe && p?.segmentIndex,
    [oe, p]
  ), ie = b(
    () => O || O === 0,
    [O]
  ), R = b(
    () => Zt({ unscheduledTasks: X }),
    [X]
  ), M = W(t, "undo"), [m, Y] = de({}), [Q, ee] = de(null), [ae, le] = de(), [ue, U] = de(null), w = W(t, "taskTypes"), P = b(() => {
    if (!G) return null;
    let u;
    if (ie && G.segments ? u = { ...G.segments[O] } : u = { ...G }, o) {
      let j = { parent: u.parent };
      return R.forEach(({ key: me, comp: N }) => {
        if (N !== "links") {
          const ke = u[me];
          N === "date" && ke instanceof Date ? j[me] = c(ke) : N === "slider" && me === "progress" ? j[me] = `${ke}%` : j[me] = ke;
        }
      }), j;
    }
    return u || null;
  }, [G, ie, O, o, R, c]);
  se(() => {
    le(P);
  }, [P]), se(() => {
    Y({}), U(null), ee(null);
  }, [p]);
  function F(u, j) {
    return u.map((me) => {
      const N = { ...me };
      if (me.config && (N.config = { ...N.config }), N.comp === "links" && t && (N.api = t, N.autoSave = g, N.onLinksChange = xe), N.comp === "select" && N.key === "type") {
        const ke = N.options ?? (w || []);
        N.options = ke.map((Ie) => ({
          ...Ie,
          label: C(Ie.label)
        }));
      }
      return N.comp === "slider" && N.key === "progress" && (N.labelTemplate = (ke) => `${C(N.label)} ${ke}%`), N.label && (N.label = C(N.label)), N.config?.placeholder && (N.config.placeholder = C(N.config.placeholder)), j && (N.isDisabled && N.isDisabled(j, t.getState()) ? N.disabled = !0 : delete N.disabled), N;
    });
  }
  const V = b(() => {
    let u = n.length ? n : R;
    return u = F(u, ae), ae ? u.filter(
      (j) => !j.isHidden || !j.isHidden(ae, t.getState())
    ) : u;
  }, [n, R, ae, w, C, t, g]), Z = b(
    () => V.map((u) => u.key),
    [V]
  );
  function xe({ id: u, action: j, data: me }) {
    Y((N) => ({
      ...N,
      [u]: { action: j, data: me }
    }));
  }
  const fe = $(() => {
    for (let u in m)
      if (J.byId(u)) {
        const { action: j, data: me } = m[u];
        t.exec(j, me);
      }
  }, [t, m, J]), E = $(() => {
    const u = p?.id || p;
    if (ie) {
      if (G?.segments) {
        const j = G.segments.filter(
          (me, N) => N !== O
        );
        t.exec("update-task", {
          id: u,
          task: { segments: j }
        });
      }
    } else
      t.exec("delete-task", { id: u });
  }, [t, p, ie, G, O]), te = $(() => {
    t.exec("show-editor", { id: null });
  }, [t]), we = $(
    (u) => {
      const { item: j, changes: me } = u;
      j.id === "delete" && E(), j.id === "save" && (me.length ? te() : fe()), j.comp && te();
    },
    [t, p, g, fe, E, te]
  ), ve = $(
    (u, j, me) => (X && u.type === "summary" && (u.unscheduled = !1), $t(u, t.getState(), j), me || ee(!1), u),
    [X, t]
  ), $e = $(
    (u) => {
      u = {
        ...u,
        unscheduled: X && u.unscheduled && u.type !== "summary"
      }, delete u.links, delete u.data, (Z.indexOf("duration") === -1 || u.segments && !u.duration) && delete u.duration;
      const j = {
        id: p?.id || p,
        task: u,
        ...ie && { segmentIndex: O }
      };
      g && Q && (j.inProgress = Q), t.exec("update-task", j), g || fe();
    },
    [
      t,
      p,
      X,
      g,
      fe,
      Z,
      ie,
      O,
      Q
    ]
  ), Ce = $(
    (u) => {
      let { update: j, key: me, input: N } = u;
      if (N && ee(!0), u.update = ve({ ...j }, me, N), !g) le(u.update);
      else if (!ue && !N) {
        const ke = V.find((Xe) => Xe.key === me), Ie = j[me];
        (!ke.validation || ke.validation(Ie)) && (!ke.required || Ie) && $e(u.update);
      }
    },
    [g, ve, ue, V, $e]
  ), Le = $(
    (u) => {
      g || $e(u.values);
    },
    [g, $e]
  ), Ne = $((u) => {
    U(u.errors);
  }, []), he = b(
    () => M ? {
      "ctrl+z": (u) => {
        u.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (u) => {
        u.preventDefault(), t.exec("redo");
      }
    } : {},
    [M, t]
  );
  return P ? /* @__PURE__ */ a(Gt, { children: /* @__PURE__ */ a(
    rn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${B} ${s}`,
      items: V,
      values: P,
      topBar: H,
      bottomBar: r,
      placement: S,
      layout: l,
      readonly: o,
      autoSave: g,
      focus: y,
      onAction: we,
      onSave: Le,
      onValidation: Ne,
      onChange: Ce,
      hotkeys: d && { ...he, ...d }
    }
  ) }) : null;
}
const jn = ({ children: t, columns: n = null, api: s }) => {
  const [l, o] = de(null);
  return se(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ a(tn, { api: l, columns: n, children: t });
};
function Qn(t) {
  const { api: n, content: s, children: l } = t, o = re(null), S = re(null), [r, x] = de({}), [g, y] = de(null), [d, L] = de({});
  function D(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const G = k.getAttribute("data-tooltip-id"), p = k.getAttribute("data-tooltip-at"), X = k.getAttribute("data-tooltip");
        if (G || X) return { id: G, tooltip: X, target: k, at: p };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  se(() => {
    const k = S.current;
    if (k && d && (d.text || s)) {
      const G = k.getBoundingClientRect();
      let p = !1, X = d.left, J = d.top;
      G.right >= r.right && (X = r.width - G.width - 5, p = !0), G.bottom >= r.bottom && (J = d.top - (G.bottom - r.bottom + 2), p = !0), p && L((oe) => oe && { ...oe, left: X, top: J });
    }
  }, [d, r, s]);
  const C = re(null), _ = 300, c = (k) => {
    clearTimeout(C.current), C.current = setTimeout(() => {
      k();
    }, _);
  };
  function H(k) {
    let { id: G, tooltip: p, target: X, at: J } = D(k.target);
    if (L(null), y(null), !p)
      if (G)
        p = z(G);
      else {
        clearTimeout(C.current);
        return;
      }
    const oe = k.clientX;
    c(() => {
      G && y(q(B(G)));
      const O = X.getBoundingClientRect(), ie = o.current, R = ie ? ie.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let M, m;
      J === "left" ? (M = O.top + 5 - R.top, m = O.right + 5 - R.left) : (M = O.top + O.height - R.top, m = oe - R.left), x(R), L({ top: M, left: m, text: p });
    });
  }
  function q(k) {
    return n?.getTask(B(k)) || null;
  }
  function z(k) {
    return q(k)?.text || "";
  }
  function B(k) {
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
            children: s ? /* @__PURE__ */ a(s, { data: g }) : d.text ? /* @__PURE__ */ a("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
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
