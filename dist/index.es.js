import { jsxs as Pe, jsx as u, Fragment as Ze } from "react/jsx-runtime";
import { createContext as Zt, useMemo as $, useState as pe, useContext as Ge, useCallback as N, useRef as se, useEffect as ce, Fragment as Jt, forwardRef as Ht, useImperativeHandle as At } from "react";
import { context as Ke, Button as vt, Field as en, Text as tn, Combo as nn, DatePicker as sn, TimePicker as rn, Locale as on, RichSelect as ln, TwoState as cn, Slider as an, Counter as un, Material as Tt, Willow as $t, WillowDark as Mt } from "@svar-ui/react-core";
import { locate as Ye, locateID as Be, locateAttr as dn, dateToString as st, locale as rt } from "@svar-ui/lib-dom";
import { en as ot } from "@svar-ui/gantt-locales";
import { en as dt } from "@svar-ui/core-locales";
import { EventBusRouter as fn } from "@svar-ui/lib-state";
import { prepareEditTask as Wt, grid as hn, extendDragOptions as mn, isSegmentMoveAllowed as gn, DataStore as wn, normalizeLinks as xn, normalizeZoom as pn, defaultColumns as yn, parseTaskDates as Ct, defaultTaskTypes as kn, getToolbarButtons as Dt, handleAction as _t, isHandledAction as zt, getMenuOptions as Rt, getEditorItems as bn } from "@svar-ui/gantt-store";
import { defaultColumns as Is, defaultEditorItems as Ps, defaultMenuOptions as Hs, defaultTaskTypes as As, defaultToolbarButtons as Ws, getEditorItems as _s, getMenuOptions as zs, getToolbarButtons as Gs, registerScaleUnit as Os } from "@svar-ui/gantt-store";
import { useWritableProp as ut, useStore as X, useStoreWithCounter as nt, writable as vn, useStoreLater as Fe } from "@svar-ui/lib-react";
import { hotkeys as Gt } from "@svar-ui/grid-store";
import { Grid as Tn, HeaderMenu as $n } from "@svar-ui/react-grid";
import { flushSync as Mn } from "react-dom";
import { Toolbar as Et } from "@svar-ui/react-toolbar";
import { ContextMenu as Cn } from "@svar-ui/react-menu";
import { Editor as Dn, registerEditorItem as Ue } from "@svar-ui/react-editor";
import { registerEditorItem as Ys } from "@svar-ui/react-editor";
const qe = Zt(null);
function Ve(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Rn(t, n, s) {
  const i = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: i.top - o.top,
    left: i.left - o.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top
  };
}
function St(t) {
  return t && t.getAttribute("data-context-id");
}
const Nt = 5;
function En(t, n) {
  let s, i, o, L, h, k, r, b, p;
  function B(C) {
    L = C.clientX, h = C.clientY, k = {
      ...Rn(s, t, C),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function q(C) {
    s = Ye(C), St(s) && (o = Ve(s), p = setTimeout(() => {
      b = !0, n && n.touchStart && n.touchStart(), B(C.touches[0]);
    }, 500), t.addEventListener("touchmove", _), t.addEventListener("contextmenu", M), window.addEventListener("touchend", U));
  }
  function M(C) {
    if (b || p)
      return C.preventDefault(), !1;
  }
  function w(C) {
    C.which === 1 && (s = Ye(C), St(s) && (o = Ve(s), t.addEventListener("mousemove", W), window.addEventListener("mouseup", v), B(C)));
  }
  function d(C) {
    t.removeEventListener("mousemove", W), t.removeEventListener("touchmove", _), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", U), document.body.style.userSelect = "", C && (t.removeEventListener("mousedown", w), t.removeEventListener("touchstart", q));
  }
  function K(C) {
    const Q = C.clientX - L, re = C.clientY - h;
    if (!i) {
      if (Math.abs(Q) < Nt && Math.abs(re) < Nt || n && n.start && n.start({ id: o, e: C }) === !1)
        return;
      i = s.cloneNode(!0), i.style.pointerEvents = "none", i.classList.add("wx-reorder-task"), i.style.position = "absolute", i.style.left = k.left + "px", i.style.top = k.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const Z = Math.round(Math.max(0, k.top + re));
      if (n && n.move && n.move({ id: o, top: Z, detail: r }) === !1)
        return;
      const fe = n.getTask(o), V = fe.$y;
      if (!k.start && k.y == V) return H();
      k.start = !0, k.y = fe.$y - 4, i.style.top = Z + "px";
      const ue = document.elementFromPoint(
        C.clientX,
        C.clientY
      ), D = Ye(ue);
      if (D && D !== s) {
        const f = Ve(D), G = D.getBoundingClientRect(), ne = G.top + G.height / 2, he = C.clientY + k.db > ne && D.nextElementSibling !== s, oe = C.clientY - k.dt < ne && D.previousElementSibling !== s;
        r?.after == f || r?.before == f ? r = null : he ? r = { id: o, after: f } : oe && (r = { id: o, before: f });
      }
    }
  }
  function W(C) {
    K(C);
  }
  function _(C) {
    b ? (C.preventDefault(), K(C.touches[0])) : p && (clearTimeout(p), p = null);
  }
  function U() {
    b = null, p && (clearTimeout(p), p = null), H();
  }
  function v() {
    H();
  }
  function H() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: o, top: k.top })), o = s = i = k = r = null, d();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", w), t.addEventListener("touchstart", q), {
    destroy() {
      d(!0);
    }
  };
}
function Sn({ row: t, column: n }) {
  function s(o, L) {
    return {
      justifyContent: L.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const i = n && n._cell;
  return /* @__PURE__ */ Pe("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ u(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ u("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ u("div", { className: "wx-pqc08MHU wx-text", children: i ? /* @__PURE__ */ u(i, { row: t, column: n }) : t.text })
  ] });
}
function Lt({ column: t, cell: n }) {
  const s = $(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ u("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ u(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function Nn(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: o = "all",
    columnWidth: L = 0,
    onTableAPIChange: h,
    multiTaskRows: k = !1,
    rowMapping: r = null
  } = t, [b, p] = ut(L), [B, q] = pe(), M = Ge(Ke.i18n), w = $(() => M.getGroup("gantt"), [M]), d = Ge(qe), K = X(d, "scrollTop"), W = X(d, "cellHeight"), _ = X(d, "_scrollTask"), U = X(d, "_selected"), v = X(d, "area"), H = X(d, "_tasks"), C = X(d, "_scales"), Q = X(d, "columns"), re = X(d, "_sort"), Z = X(d, "calendar"), fe = X(d, "durationUnit"), V = X(d, "splitTasks"), [ue, D] = pe(null), f = $(() => !H || !v ? [] : k && r ? H : H.slice(v.start, v.end), [H, v, k, r]), G = N(
    (l, y) => {
      if (y === "add-task")
        d.exec(y, {
          target: l,
          task: { text: w("New Task") },
          mode: "child",
          show: !0
        });
      else if (y === "open-task") {
        const E = f.find((z) => z.id === l);
        (E?.data || E?.lazy) && d.exec(y, { id: l, mode: !E.open });
      }
    },
    [f]
  ), ne = N(
    (l) => {
      const y = Be(l), E = l.target.dataset.action;
      E && l.preventDefault(), y ? E === "add-task" || E === "open-task" ? G(y, E) : d.exec("select-task", {
        id: y,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : E === "add-task" && G(null, E);
    },
    [d, G]
  ), he = se(null), oe = se(null), [de, ve] = pe(0), [Ee, Le] = pe(!1);
  ce(() => {
    const l = oe.current;
    if (!l || typeof ResizeObserver > "u") return;
    const y = () => ve(l.clientWidth);
    y();
    const E = new ResizeObserver(y);
    return E.observe(l), () => E.disconnect();
  }, []);
  const De = se(null), He = N(
    (l) => {
      const y = l.id, { before: E, after: z } = l, xe = l.onMove;
      let ye = E || z, Ne = E ? "before" : "after";
      if (xe) {
        if (Ne === "after") {
          const ze = d.getTask(ye);
          ze.data?.length && ze.open && (Ne = "before", ye = ze.data[0].id);
        }
        De.current = { id: y, [Ne]: ye };
      } else De.current = null;
      d.exec("move-task", {
        id: y,
        mode: Ne,
        target: ye,
        inProgress: xe
      });
    },
    [d]
  ), be = $(() => k && r ? 0 : v?.from ?? 0, [v, k, r]), te = $(() => C?.height ?? 0, [C]), x = $(() => !s && o !== "grid" ? (b ?? 0) > (i ?? 0) : (b ?? 0) > (de ?? 0), [s, o, b, i, de]), A = $(() => {
    const l = {};
    return x && o === "all" || o === "grid" && x ? l.width = b : o === "grid" && (l.width = "100%"), l;
  }, [x, o, b]), j = $(() => ue && !f.find((l) => l.id === ue.id) ? [...f, ue] : f, [f, ue]), F = $(() => {
    if (!k || !r) return j;
    const l = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    return j.forEach((E) => {
      const z = r.taskRows.get(E.id) ?? E.id;
      y.has(z) || (l.set(z, {
        ...E,
        $rowTasks: r.rowMap.get(z) || [E.id]
      }), y.add(z));
    }), Array.from(l.values());
  }, [j, k, r]), O = $(() => {
    let l = (Q || []).map((z) => {
      z = { ...z };
      const xe = z.header;
      if (typeof xe == "object") {
        const ye = xe.text && w(xe.text);
        z.header = { ...xe, text: ye };
      } else z.header = w(xe);
      return z;
    });
    const y = l.findIndex((z) => z.id === "text"), E = l.findIndex((z) => z.id === "add-task");
    if (y !== -1 && (l[y].cell && (l[y]._cell = l[y].cell), l[y].cell = Sn), E !== -1) {
      l[E].cell = l[E].cell || Lt;
      const z = l[E].header;
      if (typeof z != "object" && (l[E].header = { text: z }), l[E].header.cell = z.cell || Lt, n)
        l.splice(E, 1);
      else if (s) {
        const [xe] = l.splice(E, 1);
        l.unshift(xe);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [Q, w, n, s]), ke = $(() => o === "all" ? `${i}px` : o === "grid" ? "calc(100% - 4px)" : O.find((l) => l.id === "add-task") ? "50px" : "0", [o, i, O]), ie = $(() => {
    if (F && re?.length) {
      const l = {};
      return re.forEach(({ key: y, order: E }, z) => {
        l[y] = {
          order: E,
          ...re.length > 1 && { index: z }
        };
      }), l;
    }
    return {};
  }, [F, re]), T = N(() => O.some((l) => l.flexgrow && !l.hidden), []), ee = $(() => T(), [T, Ee]), me = $(() => {
    let l = o === "chart" ? O.filter((E) => E.id === "add-task") : O;
    const y = o === "all" ? i : de;
    if (!ee) {
      let E = b, z = !1;
      if (O.some((xe) => xe.$width)) {
        let xe = 0;
        E = O.reduce((ye, Ne) => (Ne.hidden || (xe += Ne.width, ye += Ne.$width || Ne.width), ye), 0), xe > E && E > y && (z = !0);
      }
      if (z || E < y) {
        let xe = 1;
        return z || (xe = (y - 50) / (E - 50 || 1)), l.map((ye) => (ye.id !== "add-task" && !ye.hidden && (ye.$width || (ye.$width = ye.width), ye.width = ye.$width * xe), ye));
      }
    }
    return l;
  }, [o, O, ee, b, i, de]), ge = N(
    (l) => {
      if (!T()) {
        const y = me.reduce((E, z) => (l && z.$width && (z.$width = z.width), E + (z.hidden ? 0 : z.width)), 0);
        y !== b && p(y);
      }
      Le(!0), Le(!1);
    },
    [T, me, b, p]
  ), m = N(() => {
    O.filter((y) => y.flexgrow && !y.hidden).length === 1 && O.forEach((y) => {
      y.$width && !y.flexgrow && !y.hidden && (y.width = y.$width);
    });
  }, []), le = N(
    (l) => {
      if (!n) {
        const y = Be(l), E = dn(l, "data-col-id");
        !(E && O.find((xe) => xe.id == E))?.editor && y && d.exec("show-editor", { id: y });
      }
    },
    [d, n]
    // cols is defined later; relies on latest value at call time
  ), we = $(
    () => Array.isArray(U) ? U.map((l) => l.id) : [],
    [U]
  ), Y = se(be);
  Y.current = be, ce(() => {
    const l = (E) => {
      if (he.current) {
        const z = he.current.querySelector(".wx-body");
        z && (z.style.top = -((E ?? 0) - (Y.current ?? 0)) + "px");
      }
      oe.current && (oe.current.scrollTop = 0);
    };
    return l(K), d.on("scroll-chart", ({ top: E }) => {
      E !== void 0 && l(E);
    });
  }, [d, K]), ce(() => {
    if (he.current) {
      const l = he.current.querySelector(".wx-body");
      l && (l.style.top = -((K ?? 0) - (be ?? 0)) + "px");
    }
  }, [be]), ce(() => {
    const l = he.current;
    if (!l) return;
    const y = l.querySelector(".wx-table-box .wx-body");
    if (!y || typeof ResizeObserver > "u") return;
    const E = new ResizeObserver(() => {
      if (he.current) {
        const z = he.current.querySelector(".wx-body");
        z && (z.style.top = -((K ?? 0) - (Y.current ?? 0)) + "px");
      }
    });
    return E.observe(y), () => {
      E.disconnect();
    };
  }, [me, A, o, ke, F, K]), ce(() => {
    if (!_ || !B) return;
    const { id: l } = _, y = B.getState().focusCell;
    y && y.row !== l && he.current && he.current.contains(document.activeElement) && B.exec("focus-cell", {
      row: l,
      column: y.column
    });
  }, [_, B]);
  const $e = N(
    ({ id: l }) => {
      if (n) return !1;
      d.getTask(l).open && d.exec("open-task", { id: l, mode: !1 });
      const y = d.getState()._tasks.find((E) => E.id === l);
      if (D(y || null), !y) return !1;
    },
    [d, n]
  ), ae = N(
    ({ id: l, top: y }) => {
      De.current ? He({ ...De.current, onMove: !1 }) : d.exec("drag-task", {
        id: l,
        top: y + (be ?? 0),
        inProgress: !1
      }), D(null);
    },
    [d, He, be]
  ), Ce = N(
    ({ id: l, top: y, detail: E }) => {
      E && He({ ...E, onMove: !0 }), d.exec("drag-task", {
        id: l,
        top: y + (be ?? 0),
        inProgress: !0
      });
    },
    [d, He, be]
  );
  ce(() => {
    const l = he.current;
    return l ? En(l, {
      start: $e,
      end: ae,
      move: Ce,
      getTask: d.getTask
    }).destroy : void 0;
  }, [d, $e, ae, Ce]);
  const Te = N(
    (l) => {
      const { key: y, isInput: E } = l;
      if (!E && (y === "arrowup" || y === "arrowdown"))
        return l.eventSource = "grid", d.exec("hotkey", l), !1;
      if (y === "enter") {
        const z = B?.getState().focusCell;
        if (z) {
          const { row: xe, column: ye } = z;
          ye === "add-task" ? G(xe, "add-task") : ye === "text" && G(xe, "open-task");
        }
      }
    },
    [d, G, B]
  ), Re = se(null), Ae = () => {
    Re.current = {
      setTableAPI: q,
      handleHotkey: Te,
      sortVal: re,
      api: d,
      adjustColumns: m,
      setColumnWidth: ge,
      tasks: f,
      calendarVal: Z,
      durationUnitVal: fe,
      splitTasksVal: V,
      onTableAPIChange: h
    };
  };
  Ae(), ce(() => {
    Ae();
  }, [
    q,
    Te,
    re,
    d,
    m,
    ge,
    f,
    Z,
    fe,
    V,
    h
  ]);
  const _e = N((l) => {
    q(l), l.intercept("hotkey", (y) => Re.current.handleHotkey(y)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (y) => {
      const E = Re.current.sortVal, { key: z, add: xe } = y, ye = E ? E.find((ze) => ze.key === z) : null;
      let Ne = "asc";
      return ye && (Ne = !ye || ye.order === "asc" ? "desc" : "asc"), d.exec("sort-tasks", {
        key: z,
        order: Ne,
        add: xe
      }), !1;
    }), l.on("resize-column", () => {
      Re.current.setColumnWidth(!0);
    }), l.on("hide-column", (y) => {
      y.mode || Re.current.adjustColumns(), Re.current.setColumnWidth();
    }), l.intercept("update-cell", (y) => {
      const { id: E, column: z, value: xe } = y, ye = Re.current.tasks.find((Ne) => Ne.id === E);
      if (ye) {
        const Ne = { ...ye };
        let ze = xe;
        ze && !isNaN(ze) && !(ze instanceof Date) && (ze *= 1), Ne[z] = ze, Wt(
          Ne,
          {
            calendar: Re.current.calendarVal,
            durationUnit: Re.current.durationUnitVal,
            splitTasks: Re.current.splitTasksVal
          },
          z
        ), d.exec("update-task", {
          id: E,
          task: Ne
        });
      }
      return !1;
    }), h && h(l);
  }, []);
  return /* @__PURE__ */ u(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ke}` },
      ref: oe,
      children: /* @__PURE__ */ u(
        "div",
        {
          ref: he,
          style: A,
          className: "wx-rHj6070p wx-table",
          onClick: ne,
          onDoubleClick: le,
          children: /* @__PURE__ */ u(
            Tn,
            {
              init: _e,
              sizes: {
                rowHeight: W,
                headerHeight: (te ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: F,
              columns: me,
              selectedRows: [...we],
              sortMarks: ie
            }
          )
        }
      )
    }
  );
}
function Ln({ borders: t = "" }) {
  const n = Ge(qe), s = X(n, "cellWidth"), i = X(n, "cellHeight"), o = se(null), [L, h] = pe("#e4e4e4");
  ce(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const r = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      h(r ? r.substring(r.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const k = {
    width: "100%",
    height: "100%",
    background: s != null && i != null ? `url(${hn(s, i, L, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ u("div", { ref: o, style: k });
}
function In({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = Ge(qe), o = X(i, "_links"), L = X(i, "criticalPath"), h = se(null), k = N(
    (r) => {
      const b = r?.target?.classList;
      !b?.contains("wx-line") && !b?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return ce(() => {
    if (!s && n && h.current) {
      const r = (b) => {
        h.current && !h.current.contains(b.target) && k(b);
      };
      return document.addEventListener("click", r), () => {
        document.removeEventListener("click", r);
      };
    }
  }, [s, n, k]), /* @__PURE__ */ Pe("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((r) => {
      const b = "wx-dkx3NwEn wx-line" + (L && r.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ u(
        "polyline",
        {
          className: b,
          points: r.$p,
          onClick: () => !s && t(r.id),
          "data-link-id": r.id
        },
        r.id
      );
    }),
    !s && n && /* @__PURE__ */ u(
      "polyline",
      {
        ref: h,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function Pn(t) {
  const { task: n, type: s } = t;
  function i(L) {
    const h = n.segments[L];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function o(L) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, k = n.segments;
    let r = 0, b = 0, p = null;
    do {
      const B = k[b];
      b === L && (r > h ? p = 0 : p = Math.min((h - r) / B.duration, 1) * 100), r += B.duration, b++;
    } while (p === null && b < k.length);
    return p || 0;
  }
  return /* @__PURE__ */ u("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((L, h) => /* @__PURE__ */ Pe(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": h,
      style: i(h),
      children: [
        n.progress ? /* @__PURE__ */ u("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ u(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(h)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ u("div", { className: "wx-content", children: L.text || "" })
      ]
    },
    h
  )) });
}
let ct = [], at = null, It = null;
const Pt = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: i, lengthUnit: o } = n, L = 864e5, h = o === "week" ? 7 : o === "month" ? 30 : o === "quarter" ? 91 : o === "year" ? 365 : 1, k = Math.floor(t / i), r = new Date(s.getTime() + k * h * L);
  return r.setHours(0, 0, 0, 0), r;
}, Hn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: i } = s, h = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / h);
}, An = (t, n, s) => {
  if (!s || !t) return t;
  const { lengthUnit: i } = s, h = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5, k = new Date(t.getTime() + n * h);
  return k.setHours(0, 0, 0, 0), k;
}, Wn = (t, n, s, i) => t < i && n > s;
function _n(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: i = !1,
    rowMapping: o = null,
    marqueeSelect: L = !1,
    copyPaste: h = !1,
    allowTaskIntersection: k = !0
  } = t, r = Ge(qe), [b, p] = nt(r, "_tasks"), [B, q] = nt(r, "_links"), M = X(r, "area"), w = X(r, "_scales"), d = X(r, "taskTypes"), K = X(r, "baselines"), [W, _] = nt(r, "_selected"), U = X(r, "_scrollTask"), v = X(r, "criticalPath"), H = X(r, "tasks"), C = X(r, "schedule"), Q = X(r, "splitTasks"), re = $(() => {
    if (!M || !Array.isArray(b)) return [];
    const e = M.start ?? 0, c = M.end ?? 0;
    return i && o ? b.map((a) => ({ ...a })) : b.slice(e, c).map((a) => ({ ...a }));
  }, [p, M, i, o]), Z = X(r, "cellHeight"), fe = $(() => {
    if (!i || !o || !re.length) return re;
    const e = /* @__PURE__ */ new Map(), c = [];
    return b.forEach((a) => {
      const g = o.taskRows.get(a.id) ?? a.id;
      e.has(g) || (e.set(g, c.length), c.push(g));
    }), re.map((a) => {
      const g = o.taskRows.get(a.id) ?? a.id, S = e.get(g) ?? 0;
      return {
        ...a,
        $y: S * Z,
        $y_base: a.$y_base !== void 0 ? S * Z : void 0
      };
    });
  }, [re, i, o, b, Z]), V = $(
    () => w.lengthUnitWidth,
    [w]
  ), ue = $(
    () => w.lengthUnit || "day",
    [w]
  ), D = se(!1), [f, G] = pe(void 0), [ne, he] = pe(null), oe = se(null), [de, ve] = pe(null), [Ee, Le] = pe(void 0), De = se(null), [He, be] = pe(0), [te, x] = pe(null), A = se(null), [j, F] = pe(null), [O, ke] = pe(null), [ie, T] = pe(null), ee = se(null);
  ee.current = O;
  const me = se(200), ge = se(null), m = $(() => {
    const e = ge.current;
    return !!(W.length && e && e.contains(document.activeElement));
  }, [W, ge.current]), le = $(() => m && W[W.length - 1]?.id, [m, W]);
  ce(() => {
    if (U && m && U) {
      const { id: e } = U, c = ge.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [U]), ce(() => {
    const e = ge.current;
    if (e && (be(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((a) => {
        a[0] && be(a[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [ge.current]);
  const we = N(() => {
    document.body.style.userSelect = "none";
  }, []), Y = N(() => {
    document.body.style.userSelect = "";
  }, []), $e = N(
    (e, c, a) => {
      if (c.target.classList.contains("wx-line") || (a || (a = r.getTask(Ve(e))), a.type === "milestone" || a.type === "summary")) return "";
      const g = Ye(c, "data-segment");
      g && (e = g);
      const { left: S, width: R } = e.getBoundingClientRect(), I = (c.clientX - S) / R;
      let P = 0.2 / (R > 200 ? R / 200 : 1);
      return I < P ? "start" : I > 1 - P ? "end" : "";
    },
    [r]
  ), ae = $(() => {
    const e = /* @__PURE__ */ new Set();
    if (k || !i || !o)
      return console.log("[collision] skipping - allowTaskIntersection:", k, "multiTaskRows:", i, "rowMapping:", !!o), e;
    console.log("[collision] checking overlaps...");
    const c = /* @__PURE__ */ new Map();
    return b.forEach((a) => {
      if (a.type === "summary" || a.type === "milestone") return;
      const g = o.taskRows.get(a.id) ?? a.id;
      c.has(g) || c.set(g, []), c.get(g).push(a);
    }), c.forEach((a) => {
      if (!(a.length < 2))
        for (let g = 0; g < a.length; g++)
          for (let S = g + 1; S < a.length; S++) {
            const R = a[g], I = a[S], P = R.$x, J = R.$x + R.$w, Me = I.$x, Se = I.$x + I.$w;
            Wn(P, J, Me, Se) && (console.log("[collision] found overlap:", R.id, I.id, "bounds:", P, J, Me, Se), e.add(R.id), e.add(I.id));
          }
    }), console.log("[collision] total overlapping tasks:", e.size), e;
  }, [k, i, o, b, p]), Ce = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return b.forEach((g) => {
        e.set(g.id, g.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return b.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id;
      c.has(S) || (c.set(S, a.length), a.push(S));
    }), b.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id, R = c.get(S) ?? 0;
      e.set(g.id, R * Z);
    }), e;
  }, [b, i, o, Z]), Te = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return b.forEach((g) => {
        e.set(g.id, g.$y), g.row !== void 0 && e.set(g.row, g.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return b.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id;
      c.has(S) || (c.set(S, a.length), a.push(S));
    }), c.forEach((g, S) => {
      e.set(S, g * Z);
    }), e;
  }, [b, i, o, Z]), Re = N(
    (e) => {
      if (!ge.current) return [];
      const a = Math.min(e.startX, e.currentX), g = Math.max(e.startX, e.currentX), S = Math.min(e.startY, e.currentY), R = Math.max(e.startY, e.currentY);
      return b.filter((I) => {
        const P = I.$x, J = I.$x + I.$w, Se = Ce.get(I.id) ?? I.$y, We = Se + I.$h;
        return P < g && J > a && Se < R && We > S;
      });
    },
    [b, Ce]
  ), Ae = $(() => new Set(W.map((e) => e.id)), [W, _]), _e = N(
    (e) => Ae.has(e),
    [Ae]
  ), l = N(
    (e, c) => {
      const { clientX: a } = c, g = Ve(e), S = r.getTask(g), R = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (R.contains("wx-progress-marker")) {
          const { progress: I } = r.getTask(g);
          oe.current = {
            id: g,
            x: a,
            progress: I,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const I = $e(e, c, S) || "move", P = {
            id: g,
            mode: I,
            x: a,
            dx: 0,
            l: S.$x,
            w: S.$w
          };
          if (Q && S.segments?.length) {
            const J = Ye(c, "data-segment");
            J && (P.segmentIndex = J.dataset.segment * 1, mn(S, P));
          }
          he(P);
        }
        we();
      }
    },
    [r, n, $e, we, Q]
  ), y = N(
    (e) => {
      if (e.button !== 0 || ie) return;
      const c = Ye(e);
      if (!c && L && !n) {
        const a = ge.current;
        if (!a) return;
        const g = a.getBoundingClientRect(), S = e.clientX - g.left, R = e.clientY - g.top;
        if (h) {
          const P = Pt(S, w);
          P && (ee.current = P, ke(P));
        }
        const I = {
          startX: S,
          startY: R,
          currentX: S,
          currentY: R,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        x(I), A.current = I, we();
        return;
      }
      if (c) {
        if (L && !n && W.length > 1) {
          const a = Ve(c);
          if (_e(a)) {
            const g = e.target.classList;
            if (!g.contains("wx-link") && !g.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const S = r.getTask(a);
              if (!$e(c, e, S)) {
                const I = /* @__PURE__ */ new Map();
                W.forEach((P) => {
                  const J = r.getTask(P.id);
                  if (J) {
                    if (C?.auto && J.type === "summary") return;
                    I.set(P.id, {
                      $x: J.$x,
                      $w: J.$w,
                      start: J.start,
                      end: J.end
                    });
                  }
                }), F({
                  baseTaskId: a,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: I
                }), we();
                return;
              }
            }
          }
        }
        l(c, e);
      }
    },
    [l, L, h, n, W, _e, r, $e, C, we, w, ie]
  ), E = N(
    (e) => {
      const c = Ye(e);
      c && (De.current = setTimeout(() => {
        Le(!0), l(c, e.touches[0]);
      }, 300));
    },
    [l]
  ), z = N(
    (e) => {
      ve(e && { ...B.find((c) => c.id === e) });
    },
    [B]
  ), xe = N(() => {
    const e = A.current;
    if (e) {
      const c = Re(e);
      e.ctrlKey ? c.forEach((a) => {
        r.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (W.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), c.forEach((a, g) => {
        r.exec("select-task", {
          id: a.id,
          toggle: g > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), x(null), A.current = null, Y(), D.current = !0;
      return;
    }
    if (j) {
      const { dx: c, originalPositions: a } = j, g = Math.round(c / V);
      if (g !== 0) {
        let S = !0;
        a.forEach((R, I) => {
          const P = r.getTask(I);
          P && (r.exec("update-task", {
            id: I,
            diff: g,
            task: { start: P.start, end: P.end },
            skipUndo: !S
            // Only first task creates undo entry
          }), S = !1);
        }), D.current = !0;
      } else
        a.forEach((S, R) => {
          r.exec("drag-task", {
            id: R,
            left: S.$x,
            width: S.$w,
            inProgress: !1
          });
        });
      F(null), Y();
      return;
    }
    if (oe.current) {
      const { dx: c, id: a, marker: g, value: S } = oe.current;
      oe.current = null, typeof S < "u" && c && r.exec("update-task", {
        id: a,
        task: { progress: S },
        inProgress: !1
      }), g.classList.remove("wx-progress-in-drag"), D.current = !0, Y();
    } else if (ne) {
      const { id: c, mode: a, dx: g, l: S, w: R, start: I, segment: P, index: J } = ne;
      if (he(null), I) {
        const Me = Math.round(g / V);
        if (!Me)
          r.exec("drag-task", {
            id: c,
            width: R,
            left: S,
            inProgress: !1,
            ...P && { segmentIndex: J }
          });
        else {
          let Se = {}, We = r.getTask(c);
          P && (We = We.segments[J]);
          const Xe = 1440 * 60 * 1e3, Ie = Me * (ue === "week" ? 7 : ue === "month" ? 30 : ue === "quarter" ? 91 : ue === "year" ? 365 : 1) * Xe;
          a === "move" ? (Se.start = new Date(We.start.getTime() + Ie), Se.end = new Date(We.end.getTime() + Ie)) : a === "start" ? (Se.start = new Date(We.start.getTime() + Ie), Se.end = We.end) : a === "end" && (Se.start = We.start, Se.end = new Date(We.end.getTime() + Ie)), r.exec("update-task", {
            id: c,
            task: Se,
            ...P && { segmentIndex: J }
          });
        }
        D.current = !0;
      }
      Y();
    }
  }, [r, Y, ne, V, ue, te, j, Re, W]), ye = N(
    (e, c) => {
      const { clientX: a, clientY: g } = c, S = ge.current;
      if (S) {
        const R = S.getBoundingClientRect();
        me.current = a - R.left;
      }
      if (ie) {
        if (!S) return;
        const R = S.getBoundingClientRect(), I = a - R.left;
        T((P) => ({ ...P, currentX: I }));
        return;
      }
      if (!n) {
        if (te) {
          const R = ge.current;
          if (!R) return;
          const I = R.getBoundingClientRect(), P = a - I.left, J = g - I.top;
          x((Me) => ({
            ...Me,
            currentX: P,
            currentY: J
          })), A.current && (A.current.currentX = P, A.current.currentY = J);
          return;
        }
        if (j) {
          const R = a - j.startX;
          j.originalPositions.forEach((I, P) => {
            const J = I.$x + R;
            r.exec("drag-task", {
              id: P,
              left: J,
              width: I.$w,
              inProgress: !0
            });
          }), F((I) => ({ ...I, dx: R }));
          return;
        }
        if (oe.current) {
          const { node: R, x: I, id: P } = oe.current, J = oe.current.dx = a - I, Me = Math.round(J / R.offsetWidth * 100);
          let Se = oe.current.progress + Me;
          oe.current.value = Se = Math.min(
            Math.max(0, Se),
            100
          ), r.exec("update-task", {
            id: P,
            task: { progress: Se },
            inProgress: !0
          });
        } else if (ne) {
          z(null);
          const { mode: R, l: I, w: P, x: J, id: Me, start: Se, segment: We, index: Xe } = ne, Oe = r.getTask(Me), Ie = a - J;
          if (!Se && Math.abs(Ie) < 20 || R === "start" && P - Ie < V || R === "end" && P + Ie < V || R === "move" && (Ie < 0 && I + Ie < 0 || Ie > 0 && I + P + Ie > He) || ne.segment && !gn(Oe, ne))
            return;
          const tt = { ...ne, dx: Ie };
          let je, Qe;
          if (R === "start" ? (je = I + Ie, Qe = P - Ie) : R === "end" ? (je = I, Qe = P + Ie) : R === "move" && (je = I + Ie, Qe = P), r.exec("drag-task", {
            id: Me,
            width: Qe,
            left: je,
            inProgress: !0,
            ...We && { segmentIndex: Xe }
          }), !tt.start && (R === "move" && Oe.$x == I || R !== "move" && Oe.$w == P)) {
            D.current = !0, xe();
            return;
          }
          tt.start = !0, he(tt);
        } else {
          const R = Ye(e);
          if (R) {
            const I = r.getTask(Ve(R)), J = Ye(e, "data-segment") || R, Me = $e(J, c, I);
            J.style.cursor = Me && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      ne,
      V,
      He,
      $e,
      z,
      xe,
      te,
      j,
      ie
    ]
  ), Ne = N(
    (e) => {
      ye(e, e);
    },
    [ye]
  ), ze = N(
    (e) => {
      Ee ? (e.preventDefault(), ye(e, e.touches[0])) : De.current && (clearTimeout(De.current), De.current = null);
    },
    [Ee, ye]
  ), it = N(() => {
    xe();
  }, [xe]), Yt = N(() => {
    Le(null), De.current && (clearTimeout(De.current), De.current = null), xe();
  }, [xe]);
  ce(() => (window.addEventListener("mouseup", it), () => {
    window.removeEventListener("mouseup", it);
  }), [it]);
  const Kt = N(
    (e) => {
      if (!n) {
        const c = Be(e.target);
        if (c && !e.target.classList.contains("wx-link")) {
          const a = Be(e.target, "data-segment");
          r.exec("show-editor", {
            id: c,
            ...a !== null && { segmentIndex: a }
          });
        }
      }
    },
    [r, n]
  ), Ft = ["e2s", "s2s", "e2e", "s2e"], Je = N((e, c) => Ft[(e ? 1 : 0) + (c ? 0 : 2)], []), et = N(
    (e, c) => {
      const a = f.id, g = f.start;
      return e === a ? !0 : !!B.find((S) => S.target == e && S.source == a && S.type === Je(g, c));
    },
    [f, q, Je]
  ), ft = N(() => {
    f && G(null);
  }, [f]), ht = N((e, c, a) => {
    if (!c.length || !e || a == null) return;
    const g = 864e5, S = r.getHistory();
    S?.startBatch();
    const R = new Date(e), I = R.getDay(), P = I === 0 ? -6 : 1 - I;
    R.setDate(R.getDate() + P), R.setHours(0, 0, 0, 0), c.forEach((J, Me) => {
      const Se = `task-${Date.now()}-${Me}`, We = An(R, J._startCellOffset || 0, w), Xe = new Date(We.getTime() + (J._startDayOfWeek || 0) * g);
      Xe.setHours(0, 0, 0, 0);
      const Oe = new Date(Xe.getTime() + (J._durationDays || 7) * g);
      Oe.setHours(0, 0, 0, 0), console.log("[paste] task:", J.text, "newStart:", Xe, "newEnd:", Oe, "_durationDays:", J._durationDays, "_startDayOfWeek:", J._startDayOfWeek), r.exec("add-task", {
        task: {
          id: Se,
          text: J.text,
          start: Xe,
          end: Oe,
          type: J.type || "task",
          parent: a,
          row: J.row
        },
        target: a,
        mode: "child",
        skipUndo: Me > 0
      });
    }), S?.endBatch();
  }, [r, w]), qt = N(
    (e) => {
      if (D.current) {
        D.current = !1;
        return;
      }
      if (ie && ie.currentX != null) {
        const a = Pt(ie.currentX, w);
        a && ht(a, ie.tasks, ie.parent), T(null);
        return;
      }
      const c = Be(e.target);
      if (c) {
        const a = r.getTask(c), g = b.find((R) => R.id === c);
        console.log("[click] task:", a?.text, "id:", c), console.log("[click] api.getTask:", { start: a?.start, end: a?.end, duration: a?.duration }), console.log("[click] rendered:", { start: g?.start, end: g?.end, $w: g?.$w, $x: g?.$x });
        const S = e.target.classList;
        if (S.contains("wx-link")) {
          const R = S.contains("wx-left");
          if (!f) {
            G({ id: c, start: R });
            return;
          }
          f.id !== c && !et(c, R) && r.exec("add-link", {
            link: {
              source: f.id,
              target: c,
              type: Je(f.start, R)
            }
          });
        } else if (S.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: de.id }), ve(null);
        else {
          let R;
          const I = Ye(e, "data-segment");
          I && (R = I.dataset.segment * 1), r.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: R
          });
        }
      }
      ft();
    },
    [
      r,
      f,
      q,
      de,
      et,
      Je,
      ft,
      ie,
      w,
      ht
    ]
  ), Vt = N((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Bt = N((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Ut = N(
    (e) => {
      if (Ee || De.current)
        return e.preventDefault(), !1;
    },
    [Ee]
  ), mt = $(
    () => d.map((e) => e.id),
    [d]
  ), gt = N(
    (e) => {
      let c = mt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [mt]
  ), wt = N(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), lt = N(
    (e) => v && H.byId(e).$critical,
    [v, H]
  ), xt = N(
    (e) => {
      if (C?.auto) {
        const c = H.getSummaryId(e, !0), a = H.getSummaryId(f.id, !0);
        return f?.id && !(Array.isArray(c) ? c : [c]).includes(
          f.id
        ) && !(Array.isArray(a) ? a : [a]).includes(e);
      }
      return f;
    },
    [C, H, f]
  ), pt = N(() => {
    const e = r.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, a = e.map((P) => {
      const J = r.getTask(P.id);
      if (!J) return null;
      const Me = b.find((Qt) => Qt.id === P.id);
      if (!Me) return null;
      const { $x: Se, $y: We, $h: Xe, $w: Oe, $skip: Ie, $level: tt, $index: je, $y_base: Qe, $x_base: ts, $w_base: ns, $h_base: ss, $skip_baseline: rs, $critical: os, $reorder: is, ...jt } = Me, kt = Me.end && Me.start ? Math.round((Me.end.getTime() - Me.start.getTime()) / c) : 0, bt = Me.start ? (Me.start.getDay() + 6) % 7 : 0;
      return console.log("[copy] task:", J.text, "durationDays:", kt, "startDayOfWeek:", bt, "$w:", Oe), { ...jt, _durationDays: kt, _startDayOfWeek: bt, _originalWidth: Oe, _originalHeight: Xe };
    }).filter(Boolean);
    if (!a.length) return;
    const S = a[0].parent, R = a.filter((P) => P.parent === S);
    if (R.length === 0) return;
    const I = R.reduce((P, J) => J.start && (!P || J.start < P) ? J.start : P, null);
    ct = R.map((P) => ({
      ...P,
      _startCellOffset: Hn(P.start, I, w)
    })), It = S, at = I;
  }, [r, w]);
  ce(() => h ? r.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return pt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !ct.length || !at || T({
        tasks: ct,
        baseDate: at,
        parent: It,
        currentX: me.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [h, r, pt]), ce(() => {
    if (!ie) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), T(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [ie]);
  const yt = $(() => {
    if (!te) return null;
    const e = Math.min(te.startX, te.currentX), c = Math.min(te.startY, te.currentY), a = Math.abs(te.currentX - te.startX), g = Math.abs(te.currentY - te.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${a}px`,
      height: `${g}px`
    };
  }, [te]);
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${fe.length ? fe[0].$h : 0}px` },
      ref: ge,
      onContextMenu: Ut,
      onMouseDown: y,
      onMouseMove: Ne,
      onTouchStart: E,
      onTouchMove: ze,
      onTouchEnd: Yt,
      onClick: qt,
      onDoubleClick: Kt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ u(
          In,
          {
            onSelectLink: z,
            selectedLink: de,
            readonly: n
          }
        ),
        fe.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = ae.has(e.id), a = `wx-bar wx-${gt(e.type)}` + (Ee && ne && e.id === ne.id ? " wx-touch" : "") + (f && f.id === e.id ? " wx-selected" : "") + (Ae.has(e.id) ? " wx-selected" : "") + (lt(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (Q && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), g = "wx-link wx-left" + (f ? " wx-visible" : "") + (!f || !et(e.id, !0) && xt(e.id) ? " wx-target" : "") + (f && f.id === e.id && f.start ? " wx-selected" : "") + (lt(e.id) ? " wx-critical" : ""), S = "wx-link wx-right" + (f ? " wx-visible" : "") + (!f || !et(e.id, !1) && xt(e.id) ? " wx-target" : "") + (f && f.id === e.id && !f.start ? " wx-selected" : "") + (lt(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Pe(Jt, { children: [
            !e.$skip && /* @__PURE__ */ Pe(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: Vt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: le === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === de?.target && de?.type[2] === "s" ? /* @__PURE__ */ u(
                    vt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + g, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Pe(Ze, { children: [
                    e.progress && !(Q && e.segments) ? /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(Q && e.segments) ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : Q && e.segments ? /* @__PURE__ */ u(Pn, { task: e, type: gt(e.type) }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" }),
                    c && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Pe(Ze, { children: [
                    /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === de?.target && de?.type[2] === "e" ? /* @__PURE__ */ u(
                    vt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + S, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            K && !e.$skip_baseline ? /* @__PURE__ */ u(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Bt(e)
              }
            ) : null
          ] }, e.id);
        }),
        te && yt && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: yt }),
        ie && ie.currentX != null && ie.tasks.map((e, c) => {
          const g = (Math.floor(ie.currentX / V) + (e._startCellOffset || 0)) * V, S = e._originalWidth || V, R = e._originalHeight || Z, I = Te.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: g, top: I, width: S, height: R },
              children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function zn(t) {
  const { highlightTime: n } = t, s = Ge(qe), i = X(s, "_scales");
  return /* @__PURE__ */ u("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((o, L) => /* @__PURE__ */ u(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((h, k) => {
        const r = n ? n(h.date, h.unit) : "", b = "wx-cell " + (h.css || "") + " " + (r || ""), p = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ u(
          "div",
          {
            className: "wx-ZkvhDKir " + b,
            style: { width: `${h.width}px` },
            ...p ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          k
        );
      })
    },
    L
  )) });
}
const Gn = /* @__PURE__ */ new Map();
function On(t) {
  const n = se(null), s = se(0), i = se(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, ce(() => {
    if (o)
      return cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
        const L = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        Gn.set(t, L), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: L })
        );
      }), () => cancelAnimationFrame(i.current);
  });
}
function Xn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: i,
    taskTemplate: o,
    cellBorders: L,
    highlightTime: h,
    multiTaskRows: k = !1,
    rowMapping: r = null,
    marqueeSelect: b = !1,
    copyPaste: p = !1,
    scrollToCurrentWeek: B = !1,
    currentWeekColor: q = null,
    allowTaskIntersection: M = !0
  } = t, w = Ge(qe), [d, K] = nt(w, "_selected"), W = X(w, "scrollTop"), _ = X(w, "cellHeight"), U = X(w, "cellWidth"), v = X(w, "_scales"), H = X(w, "_markers"), C = X(w, "_scrollTask"), Q = X(w, "zoom"), re = X(w, "_tasks"), [Z, fe] = pe(), V = se(null), ue = se(0), D = se(!1), f = 1 + (v?.rows?.length || 0), G = $(() => {
    if (!k || !r || !re?.length) return null;
    const x = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), j = [];
    return re.forEach((F) => {
      const O = r.taskRows.get(F.id) ?? F.id;
      A.has(O) || (A.set(O, j.length), j.push(O));
    }), re.forEach((F) => {
      const O = r.taskRows.get(F.id) ?? F.id, ke = A.get(O) ?? 0;
      x.set(F.id, ke * _);
    }), x;
  }, [re, k, r, _]), ne = $(() => {
    const x = [];
    return d && d.length && _ && d.forEach((A) => {
      const j = G?.get(A.id) ?? A.$y;
      x.push({ height: `${_}px`, top: `${j - 3}px` });
    }), x;
  }, [K, _, G]), he = $(
    () => Math.max(Z || 0, i),
    [Z, i]
  );
  ce(() => {
    const x = V.current;
    x && typeof W == "number" && (x.scrollTop = W);
  }, [W]);
  const oe = () => {
    de();
  };
  function de(x) {
    const A = V.current;
    if (!A) return;
    const j = {};
    j.left = A.scrollLeft, w.exec("scroll-chart", j);
  }
  function ve() {
    const x = V.current, j = Math.ceil((Z || 0) / (_ || 1)) + 1, F = Math.floor((x && x.scrollTop || 0) / (_ || 1)), O = Math.max(0, F - f), ke = F + j + f, ie = O * (_ || 0);
    w.exec("render-data", {
      start: O,
      end: ke,
      from: ie
    });
  }
  ce(() => {
    ve();
  }, [Z, W]);
  const Ee = N(
    (x) => {
      if (!x) return;
      const { id: A, mode: j } = x;
      if (j.toString().indexOf("x") < 0) return;
      const F = V.current;
      if (!F) return;
      const { clientWidth: O } = F, ke = w.getTask(A);
      if (ke.$x + ke.$w < F.scrollLeft)
        w.exec("scroll-chart", { left: ke.$x - (U || 0) }), F.scrollLeft = ke.$x - (U || 0);
      else if (ke.$x >= O + F.scrollLeft) {
        const ie = O < ke.$w ? U || 0 : ke.$w;
        w.exec("scroll-chart", { left: ke.$x - O + ie }), F.scrollLeft = ke.$x - O + ie;
      }
    },
    [w, U]
  );
  ce(() => {
    Ee(C);
  }, [C]);
  function Le(x) {
    if (Q && (x.ctrlKey || x.metaKey)) {
      x.preventDefault();
      const A = V.current, j = x.clientX - (A ? A.getBoundingClientRect().left : 0);
      if (ue.current += x.deltaY, Math.abs(ue.current) >= 150) {
        const O = -Math.sign(ue.current);
        ue.current = 0, w.exec("zoom-scale", {
          dir: O,
          offset: j
        });
      }
    }
  }
  const De = N((x) => {
    const A = h(x.date, x.unit);
    return A ? {
      css: A,
      width: x.width
    } : null;
  }, [h]), He = $(() => {
    if (!v || !h || !["hour", "day", "week"].includes(v.minUnit)) return null;
    let A = 0;
    return v.rows[v.rows.length - 1].cells.map((j) => {
      const F = De(j), O = A;
      return A += j.width, F ? { ...F, left: O } : null;
    });
  }, [v, h, De]), be = N(
    (x) => {
      x.eventSource = "chart", w.exec("hotkey", x);
    },
    [w]
  );
  ce(() => {
    const x = V.current;
    if (!x) return;
    const A = () => fe(x.clientHeight);
    A();
    const j = new ResizeObserver(() => A());
    return j.observe(x), () => {
      j.disconnect();
    };
  }, [V.current]);
  const te = se(null);
  return ce(() => {
    const x = V.current;
    if (x && !te.current)
      return te.current = Gt(x, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (A) => be(A)
      }), () => {
        te.current?.destroy(), te.current = null;
      };
  }, []), ce(() => {
    const x = V.current;
    if (!x) return;
    const A = Le;
    return x.addEventListener("wheel", A), () => {
      x.removeEventListener("wheel", A);
    };
  }, [Le]), ce(() => {
    if (!B || D.current || !v || !V.current || !Z) return;
    const x = V.current, { clientWidth: A } = x, j = /* @__PURE__ */ new Date(), F = v.rows[v.rows.length - 1]?.cells;
    if (!F) return;
    let O = -1, ke = 0;
    const ie = [];
    for (let ee = 0; ee < F.length; ee++) {
      const me = F[ee];
      ie.push({ left: ke, width: me.width });
      const ge = me.date;
      if (me.unit === "week") {
        const m = new Date(ge);
        m.setDate(m.getDate() + 7), j >= ge && j < m && (O = ee);
      } else me.unit === "day" && j.getFullYear() === ge.getFullYear() && j.getMonth() === ge.getMonth() && j.getDate() === ge.getDate() && (O = ee);
      ke += me.width;
    }
    let T = O;
    if (O > 0 && (T = O - 1), T >= 0 && ie[T]) {
      const ee = ie[T], me = Math.max(0, ee.left);
      x.scrollLeft = me, w.exec("scroll-chart", { left: me }), D.current = !0;
    }
  }, [B, v, Z, w]), On("chart"), /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: V,
      onScroll: oe,
      children: [
        /* @__PURE__ */ u(zn, { highlightTime: h, scales: v }),
        H && H.length ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${he}px` },
            children: H.map((x, A) => /* @__PURE__ */ u(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${x.css || ""}`,
                style: { left: `${x.left}px` },
                children: /* @__PURE__ */ u("div", { className: "wx-mR7v2Xag wx-content", children: x.text })
              },
              A
            ))
          }
        ) : null,
        /* @__PURE__ */ Pe(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${he}px` },
            children: [
              He ? /* @__PURE__ */ u(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: He.map(
                    (x, A) => x ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + x.css,
                        style: {
                          width: `${x.width}px`,
                          left: `${x.left}px`
                        }
                      },
                      A
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ u(Ln, { borders: L }),
              d && d.length ? d.map(
                (x, A) => x.$y ? /* @__PURE__ */ u(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": x.id,
                    style: ne[A]
                  },
                  x.id
                ) : null
              ) : null,
              /* @__PURE__ */ u(
                _n,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: k,
                  rowMapping: r,
                  marqueeSelect: b,
                  copyPaste: p,
                  allowTaskIntersection: M
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Yn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: i = "x",
    onMove: o,
    onDisplayChange: L,
    compactMode: h,
    containerWidth: k = 0,
    leftThreshold: r = 50,
    rightThreshold: b = 50
  } = t, [p, B] = ut(t.value ?? 0), [q, M] = ut(t.display ?? "all");
  function w(oe) {
    let de = 0;
    n == "center" ? de = s / 2 : n == "before" && (de = s);
    const ve = {
      size: [s + "px", "auto"],
      p: [oe - de + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let Ee in ve) ve[Ee] = ve[Ee].reverse();
    return ve;
  }
  const [d, K] = pe(!1), [W, _] = pe(null), U = se(0), v = se(), H = se(), C = se(q);
  ce(() => {
    C.current = q;
  }, [q]), ce(() => {
    W === null && p > 0 && _(p);
  }, [W, p]);
  function Q(oe) {
    return i == "x" ? oe.clientX : oe.clientY;
  }
  const re = N(
    (oe) => {
      const de = v.current + Q(oe) - U.current;
      B(de);
      let ve;
      de <= r ? ve = "chart" : k - de <= b ? ve = "grid" : ve = "all", C.current !== ve && (M(ve), C.current = ve), H.current && clearTimeout(H.current), H.current = setTimeout(() => o && o(de), 100);
    },
    [k, r, b, o]
  ), Z = N(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", K(!1), window.removeEventListener("mousemove", re), window.removeEventListener("mouseup", Z);
  }, [re]), fe = $(
    () => q !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [q, i]
  ), V = N(
    (oe) => {
      !h && (q === "grid" || q === "chart") || (U.current = Q(oe), v.current = p, K(!0), document.body.style.cursor = fe, document.body.style.userSelect = "none", window.addEventListener("mousemove", re), window.addEventListener("mouseup", Z));
    },
    [fe, re, Z, p, h, q]
  );
  function ue() {
    M("all"), W !== null && (B(W), o && o(W));
  }
  function D(oe) {
    if (h) {
      const de = q === "chart" ? "grid" : "chart";
      M(de), L(de);
    } else if (q === "grid" || q === "chart")
      ue(), L("all");
    else {
      const de = oe === "left" ? "chart" : "grid";
      M(de), L(de);
    }
  }
  function f() {
    D("left");
  }
  function G() {
    D("right");
  }
  const ne = $(() => w(p), [p, n, s, i]), he = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${q}`,
    d ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: V,
      style: { width: ne.size[0], height: ne.size[1], cursor: fe },
      children: [
        /* @__PURE__ */ Pe("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ u(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: f
            }
          ) }),
          /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ u(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: G
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Kn = 650;
function Ot(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let L of o)
        if (L.target === document.body) {
          let h = L.contentRect.width <= Kn;
          t(h);
        }
    }), n.observe(document.body);
  }
  function i() {
    n && (n.disconnect(), n = null);
  }
  return {
    observe: s,
    disconnect: i
  };
}
function Fn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: i,
    highlightTime: o,
    onTableAPIChange: L,
    multiTaskRows: h = !1,
    rowMapping: k = null,
    marqueeSelect: r = !1,
    copyPaste: b = !1,
    scrollToCurrentWeek: p = !1,
    currentWeekColor: B = null,
    allowTaskIntersection: q = !0
  } = t, M = Ge(qe), w = X(M, "_tasks"), d = X(M, "_scales"), K = X(M, "cellHeight"), W = X(M, "columns"), _ = X(M, "_scrollTask"), U = X(M, "undo"), v = $(() => {
    if (!h) return k;
    const T = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map();
    return w.forEach((me) => {
      const ge = me.row ?? me.id;
      ee.set(me.id, ge), T.has(ge) || T.set(ge, []), T.get(ge).push(me.id);
    }), { rowMap: T, taskRows: ee };
  }, [w, h, k]), [H, C] = pe(!1);
  let [Q, re] = pe(0);
  const [Z, fe] = pe(0), [V, ue] = pe(0), [D, f] = pe(void 0), [G, ne] = pe("all"), he = se(null), oe = N(
    (T) => {
      C((ee) => (T !== ee && (T ? (he.current = G, G === "all" && ne("grid")) : (!he.current || he.current === "all") && ne("all")), T));
    },
    [G]
  );
  ce(() => {
    const T = Ot(oe);
    return T.observe(), () => {
      T.disconnect();
    };
  }, [oe]);
  const de = $(() => {
    let T;
    return W.every((ee) => ee.width && !ee.flexgrow) ? T = W.reduce((ee, me) => ee + parseInt(me.width), 0) : H && G === "chart" ? T = parseInt(W.find((ee) => ee.id === "action")?.width) || 50 : T = 440, Q = T, T;
  }, [W, H, G]);
  ce(() => {
    re(de);
  }, [de]);
  const ve = $(
    () => (Z ?? 0) - (D ?? 0),
    [Z, D]
  ), Ee = $(() => d.width, [d]), Le = $(() => {
    if (!h || !v)
      return w.length * K;
    const T = /* @__PURE__ */ new Set();
    return w.forEach((ee) => {
      const me = v.taskRows.get(ee.id) ?? ee.id;
      T.add(me);
    }), T.size * K;
  }, [w, K, h, v]), De = $(
    () => d.height + Le + ve,
    [d, Le, ve]
  ), He = $(
    () => Q + Ee,
    [Q, Ee]
  ), be = se(null), te = N(() => {
    Promise.resolve().then(() => {
      if ((Z ?? 0) > (He ?? 0)) {
        const T = (Z ?? 0) - Q;
        M.exec("expand-scale", { minWidth: T });
      }
    });
  }, [Z, He, Q, M]);
  ce(() => {
    let T;
    return be.current && (T = new ResizeObserver(te), T.observe(be.current)), () => {
      T && T.disconnect();
    };
  }, [be.current, te]), ce(() => {
    te();
  }, [Ee]);
  const x = se(null), A = se(null), j = N(() => {
    const T = x.current;
    T && M.exec("scroll-chart", {
      top: T.scrollTop
    });
  }, [M]), F = se({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  ce(() => {
    F.current = {
      rTasks: w,
      rScales: d,
      rCellHeight: K,
      scrollSize: ve,
      ganttDiv: x.current,
      ganttHeight: V ?? 0
    };
  }, [w, d, K, ve, V]);
  const O = N(
    (T) => {
      if (!T) return;
      const {
        rTasks: ee,
        rScales: me,
        rCellHeight: ge,
        scrollSize: m,
        ganttDiv: le,
        ganttHeight: we
      } = F.current;
      if (!le) return;
      const { id: Y } = T, $e = ee.findIndex((ae) => ae.id === Y);
      if ($e > -1) {
        const ae = we - me.height, Ce = $e * ge, Te = le.scrollTop;
        let Re = null;
        Ce < Te ? Re = Ce : Ce + ge > Te + ae && (Re = Ce - ae + ge + m), Re !== null && (M.exec("scroll-chart", { top: Math.max(Re, 0) }), x.current.scrollTop = Math.max(Re, 0));
      }
    },
    [M]
  );
  ce(() => {
    O(_);
  }, [_]), ce(() => {
    const T = x.current, ee = A.current;
    if (!T || !ee) return;
    const me = () => {
      Mn(() => {
        ue(T.offsetHeight), fe(T.offsetWidth), f(ee.offsetWidth);
      });
    }, ge = new ResizeObserver(me);
    return ge.observe(T), () => ge.disconnect();
  }, [x.current]);
  const ke = se(null), ie = se(null);
  return ce(() => {
    ie.current && (ie.current.destroy(), ie.current = null);
    const T = ke.current;
    if (T)
      return ie.current = Gt(T, {
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
          "ctrl+z": U,
          "ctrl+y": U,
          "meta+z": U,
          "meta+shift+z": U
        },
        exec: (ee) => {
          if (ee.isInput) return;
          const me = ee.key;
          if (me === "ctrl+z" || me === "meta+z") {
            M.exec("undo", {});
            return;
          }
          if (me === "ctrl+y" || me === "meta+shift+z") {
            M.exec("redo", {});
            return;
          }
          M.exec("hotkey", ee);
        }
      }), () => {
        ie.current?.destroy(), ie.current = null;
      };
  }, [U]), /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-gantt", ref: x, onScroll: j, children: /* @__PURE__ */ u(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: De, width: "100%" },
      ref: A,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: V,
            width: D
          },
          children: /* @__PURE__ */ Pe("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ke, children: [
            W.length ? /* @__PURE__ */ Pe(Ze, { children: [
              /* @__PURE__ */ u(
                Nn,
                {
                  display: G,
                  compactMode: H,
                  columnWidth: de,
                  width: Q,
                  readonly: s,
                  fullHeight: Le,
                  onTableAPIChange: L,
                  multiTaskRows: h,
                  rowMapping: v
                }
              ),
              /* @__PURE__ */ u(
                Yn,
                {
                  value: Q,
                  display: G,
                  compactMode: H,
                  containerWidth: Z,
                  onMove: (T) => re(T),
                  onDisplayChange: (T) => ne(T)
                }
              )
            ] }) : null,
            /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-content", ref: be, children: /* @__PURE__ */ u(
              Xn,
              {
                readonly: s,
                fullWidth: Ee,
                fullHeight: Le,
                taskTemplate: n,
                cellBorders: i,
                highlightTime: o,
                multiTaskRows: h,
                rowMapping: v,
                marqueeSelect: r,
                copyPaste: b,
                scrollToCurrentWeek: p,
                currentWeekColor: B,
                allowTaskIntersection: q
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function qn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function Vn(t, n) {
  return typeof t == "function" ? t : st(t, n);
}
function Xt(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: Vn(s, n)
  }));
}
function Bn(t, n) {
  const s = qn(n);
  for (let i in s)
    s[i] = st(s[i], t);
  return s;
}
function Un(t, n) {
  if (!t || !t.length) return t;
  const s = st("%d-%m-%Y", n);
  return t.map((i) => i.template ? i : i.id === "start" || i.id == "end" ? {
    ...i,
    //store locale template for unscheduled tasks
    _template: (o) => s(o),
    template: (o) => s(o)
  } : i.id === "duration" ? {
    ...i,
    _template: (o) => o,
    template: (o) => o
  } : i);
}
function jn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Xt(s.scales, n)
    }))
  } : t;
}
const Qn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Zn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], vs = Ht(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: i = kn,
  tasks: o = [],
  selected: L = [],
  activeTask: h = null,
  links: k = [],
  scales: r = Zn,
  columns: b = yn,
  start: p = null,
  end: B = null,
  lengthUnit: q = "day",
  durationUnit: M = "day",
  cellWidth: w = 100,
  cellHeight: d = 38,
  scaleHeight: K = 36,
  readonly: W = !1,
  cellBorders: _ = "full",
  zoom: U = !1,
  baselines: v = !1,
  highlightTime: H = null,
  init: C = null,
  autoScale: Q = !0,
  unscheduledTasks: re = !1,
  criticalPath: Z = null,
  schedule: fe = { type: "forward" },
  projectStart: V = null,
  projectEnd: ue = null,
  calendar: D = null,
  undo: f = !1,
  splitTasks: G = !1,
  multiTaskRows: ne = !1,
  marqueeSelect: he = !1,
  copyPaste: oe = !1,
  currentWeekHighlight: de = !1,
  currentWeekColor: ve = null,
  scrollToCurrentWeek: Ee = !1,
  allowTaskIntersection: Le = !0,
  ...De
}, He) {
  const be = se();
  be.current = De;
  const te = $(() => new wn(vn), []), x = $(() => ({ ...dt, ...ot }), []), A = Ge(Ke.i18n), j = $(() => A ? A.extend(x, !0) : rt(x), [A, x]), F = $(() => j.getRaw().calendar, [j]), O = $(() => {
    let ae = {
      zoom: jn(U, F),
      scales: Xt(r, F),
      columns: Un(b, F),
      links: xn(k),
      cellWidth: w
    };
    return ae.zoom && (ae = {
      ...ae,
      ...pn(
        ae.zoom,
        Bn(F, j.getGroup("gantt")),
        ae.scales,
        w
      )
    }), ae;
  }, [U, r, b, k, w, F, j]), ke = se(null);
  ke.current !== o && (Ct(o, { durationUnit: M, splitTasks: G, calendar: D }), ke.current = o), ce(() => {
    Ct(o, { durationUnit: M, splitTasks: G, calendar: D });
  }, [o, M, D, G]);
  const ie = $(() => {
    if (!ne) return null;
    const ae = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Map(), Te = (Re) => {
      Re.forEach((Ae) => {
        const _e = Ae.row ?? Ae.id;
        Ce.set(Ae.id, _e), ae.has(_e) || ae.set(_e, []), ae.get(_e).push(Ae.id), Ae.data && Ae.data.length > 0 && Te(Ae.data);
      });
    };
    return Te(o), { rowMap: ae, taskRows: Ce };
  }, [o, ne]), T = $(() => te.in, [te]), ee = se(null);
  ee.current === null && (ee.current = new fn((ae, Ce) => {
    const Te = "on" + Qn(ae);
    be.current && be.current[Te] && be.current[Te](Ce);
  }), T.setNext(ee.current));
  const [me, ge] = pe(null), m = se(null);
  m.current = me;
  const le = $(
    () => ({
      getState: te.getState.bind(te),
      getReactiveState: te.getReactive.bind(te),
      getStores: () => ({ data: te }),
      exec: T.exec,
      setNext: (ae) => (ee.current = ee.current.setNext(ae), ee.current),
      intercept: T.intercept.bind(T),
      on: T.on.bind(T),
      detach: T.detach.bind(T),
      getTask: te.getTask.bind(te),
      serialize: te.serialize.bind(te),
      getTable: (ae) => ae ? new Promise((Ce) => setTimeout(() => Ce(m.current), 1)) : m.current,
      getHistory: () => te.getHistory()
    }),
    [te, T]
  );
  At(
    He,
    () => ({
      ...le
    }),
    [le]
  );
  const we = se(0);
  ce(() => {
    we.current ? te.init({
      tasks: o,
      links: O.links,
      start: p,
      columns: O.columns,
      end: B,
      lengthUnit: q,
      cellWidth: O.cellWidth,
      cellHeight: d,
      scaleHeight: K,
      scales: O.scales,
      taskTypes: i,
      zoom: O.zoom,
      selected: L,
      activeTask: h,
      baselines: v,
      autoScale: Q,
      unscheduledTasks: re,
      markers: s,
      durationUnit: M,
      criticalPath: Z,
      schedule: fe,
      projectStart: V,
      projectEnd: ue,
      calendar: D,
      undo: f,
      _weekStart: F.weekStart,
      splitTasks: G
    }) : C && C(le), we.current++;
  }, [
    le,
    C,
    o,
    O,
    p,
    B,
    q,
    d,
    K,
    i,
    L,
    h,
    v,
    Q,
    re,
    s,
    M,
    Z,
    fe,
    V,
    ue,
    D,
    f,
    F,
    G,
    te
  ]), we.current === 0 && te.init({
    tasks: o,
    links: O.links,
    start: p,
    columns: O.columns,
    end: B,
    lengthUnit: q,
    cellWidth: O.cellWidth,
    cellHeight: d,
    scaleHeight: K,
    scales: O.scales,
    taskTypes: i,
    zoom: O.zoom,
    selected: L,
    activeTask: h,
    baselines: v,
    autoScale: Q,
    unscheduledTasks: re,
    markers: s,
    durationUnit: M,
    criticalPath: Z,
    schedule: fe,
    projectStart: V,
    projectEnd: ue,
    calendar: D,
    undo: f,
    _weekStart: F.weekStart,
    splitTasks: G
  });
  const Y = $(() => {
    const ae = /* @__PURE__ */ new Date(), Ce = F?.weekStart ?? 0, Te = new Date(ae), Ae = (Te.getDay() - Ce + 7) % 7;
    Te.setDate(Te.getDate() - Ae), Te.setHours(0, 0, 0, 0);
    const _e = new Date(Te);
    return _e.setDate(_e.getDate() + 7), (l) => l >= Te && l < _e;
  }, [F]), $e = $(() => (ae, Ce) => {
    let Te = [];
    if (D)
      Ce == "day" && !D.getDayHours(ae) && Te.push("wx-weekend"), Ce == "hour" && !D.getDayHours(ae) && Te.push("wx-weekend");
    else if (H) {
      const Re = H(ae, Ce);
      Re && Te.push(Re);
    }
    return de && (Ce === "week" || Ce === "day") && Y(ae) && Te.push("wx-current-week"), Te.join(" ");
  }, [D, H, de, Y]);
  return /* @__PURE__ */ u(Ke.i18n.Provider, { value: j, children: /* @__PURE__ */ u(qe.Provider, { value: le, children: /* @__PURE__ */ u(
    Fn,
    {
      taskTemplate: n,
      readonly: W,
      cellBorders: _,
      highlightTime: $e,
      onTableAPIChange: ge,
      multiTaskRows: ne,
      rowMapping: ie,
      marqueeSelect: he,
      copyPaste: oe,
      scrollToCurrentWeek: Ee,
      currentWeekColor: ve,
      allowTaskIntersection: Le
    }
  ) }) });
});
function Ts({ api: t = null, items: n = [] }) {
  const s = Ge(Ke.i18n), i = $(() => s || rt(ot), [s]), o = $(() => i.getGroup("gantt"), [i]), L = Fe(t, "_selected"), h = Fe(t, "undo"), k = Fe(t, "history"), r = Fe(t, "splitTasks"), b = ["undo", "redo"], p = $(() => {
    const q = Dt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : Dt({
      undo: h,
      splitTasks: r
    })).map((w) => {
      let d = { ...w, disabled: !1 };
      return d.handler = zt(q, d.id) ? (K) => _t(t, K.id, null, o) : d.handler, d.text && (d.text = o(d.text)), d.menuText && (d.menuText = o(d.menuText)), d;
    });
  }, [n, t, o, h, r]), B = $(() => {
    const q = [];
    return p.forEach((M) => {
      const w = M.id;
      if (w === "add-task")
        q.push(M);
      else if (b.includes(w))
        b.includes(w) && q.push({
          ...M,
          disabled: M.isDisabled(k)
        });
      else {
        if (!L?.length || !t) return;
        q.push({
          ...M,
          disabled: M.isDisabled && L.some((d) => M.isDisabled(d, t.getState()))
        });
      }
    }), q.filter((M, w) => {
      if (t && M.isHidden)
        return !L.some((d) => M.isHidden(d, t.getState()));
      if (M.comp === "separator") {
        const d = q[w + 1];
        if (!d || d.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, L, k, p]);
  return s ? /* @__PURE__ */ u(Et, { items: B }) : /* @__PURE__ */ u(Ke.i18n.Provider, { value: i, children: /* @__PURE__ */ u(Et, { items: B }) });
}
const $s = Ht(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: o = null,
  at: L = "point",
  children: h,
  onClick: k,
  css: r
}, b) {
  const p = se(null), B = se(null), q = Ge(Ke.i18n), M = $(() => q || rt({ ...ot, ...dt }), [q]), w = $(() => M.getGroup("gantt"), [M]), d = Fe(s, "taskTypes"), K = Fe(s, "selected"), W = Fe(s, "_selected"), _ = Fe(s, "splitTasks"), U = $(() => Rt({ splitTasks: !0 }), []);
  ce(() => {
    s && (s.on("scroll-chart", () => {
      p.current && p.current.show && p.current.show();
    }), s.on("drag-task", () => {
      p.current && p.current.show && p.current.show();
    }));
  }, [s]);
  function v(D) {
    return D.map((f) => (f = { ...f }, f.text && (f.text = w(f.text)), f.subtext && (f.subtext = w(f.subtext)), f.data && (f.data = v(f.data)), f));
  }
  function H() {
    const D = n.length ? n : Rt({ splitTasks: _ }), f = D.find((G) => G.id === "convert-task");
    return f && (f.data = [], (d || []).forEach((G) => {
      f.data.push(f.dataFactory(G));
    })), v(D);
  }
  const C = $(() => H(), [s, n, d, _, w]), Q = $(
    () => W && W.length ? W : [],
    [W]
  ), re = N(
    (D, f) => {
      let G = D ? s?.getTask(D) : null;
      if (i) {
        const ne = i(D, f);
        G = ne === !0 ? G : ne;
      }
      if (G) {
        const ne = Be(f.target, "data-segment");
        ne !== null ? B.current = { id: G.id, segmentIndex: ne } : B.current = G.id, (!Array.isArray(K) || !K.includes(G.id)) && s && s.exec && s.exec("select-task", { id: G.id });
      }
      return G;
    },
    [s, i, K]
  ), Z = N(
    (D) => {
      const f = D.action;
      f && (zt(U, f.id) && _t(s, f.id, B.current, w), k && k(D));
    },
    [s, w, k, U]
  ), fe = N(
    (D, f) => {
      const G = Q.length ? Q : f ? [f] : [];
      let ne = o ? G.every((he) => o(D, he)) : !0;
      if (ne && (D.isHidden && (ne = !G.some(
        (he) => D.isHidden(he, s.getState(), B.current)
      )), D.isDisabled)) {
        const he = G.some(
          (oe) => D.isDisabled(oe, s.getState(), B.current)
        );
        D.disabled = he;
      }
      return ne;
    },
    [o, Q, s]
  );
  At(b, () => ({
    show: (D, f) => {
      p.current && p.current.show && p.current.show(D, f);
    }
  }));
  const V = N((D) => {
    p.current && p.current.show && p.current.show(D);
  }, []), ue = /* @__PURE__ */ Pe(Ze, { children: [
    /* @__PURE__ */ u(
      Cn,
      {
        filter: fe,
        options: C,
        dataKey: "id",
        resolver: re,
        onClick: Z,
        at: L,
        ref: p,
        css: r
      }
    ),
    /* @__PURE__ */ u("span", { onContextMenu: V, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!q && Ke.i18n?.Provider) {
    const D = Ke.i18n.Provider;
    return /* @__PURE__ */ u(D, { value: M, children: ue });
  }
  return ue;
});
function Jn({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Ge(Ke.i18n).getGroup("gantt"), L = X(t, "activeTask"), h = X(t, "_activeTask"), k = X(t, "_links"), r = X(t, "schedule"), b = X(t, "unscheduledTasks"), [p, B] = pe();
  function q() {
    if (L) {
      const K = k.filter((_) => _.target == L).map((_) => ({ link: _, task: t.getTask(_.source) })), W = k.filter((_) => _.source == L).map((_) => ({ link: _, task: t.getTask(_.target) }));
      return [
        { title: o("Predecessors"), data: K },
        { title: o("Successors"), data: W }
      ];
    }
  }
  ce(() => {
    B(q());
  }, [L, k]);
  const M = $(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function w(K) {
    n ? t.exec("delete-link", { id: K }) : (B(
      (W) => (W || []).map((_) => ({
        ..._,
        data: _.data.filter((U) => U.link.id !== K)
      }))
    ), s && s({
      id: K,
      action: "delete-link",
      data: { id: K }
    }));
  }
  function d(K, W) {
    n ? t.exec("update-link", {
      id: K,
      link: W
    }) : (B(
      (_) => (_ || []).map((U) => ({
        ...U,
        data: U.data.map(
          (v) => v.link.id === K ? { ...v, link: { ...v.link, ...W } } : v
        )
      }))
    ), s && s({
      id: K,
      action: "update-link",
      data: {
        id: K,
        link: W
      }
    }));
  }
  return /* @__PURE__ */ u(Ze, { children: (p || []).map(
    (K, W) => K.data.length ? /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ u(en, { label: K.title, position: "top", children: /* @__PURE__ */ u("table", { children: /* @__PURE__ */ u("tbody", { children: K.data.map((_) => /* @__PURE__ */ Pe("tr", { children: [
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-task-name", children: _.task.text || "" }) }),
      r?.auto && _.link.type === "e2s" ? /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ u(
        tn,
        {
          type: "number",
          placeholder: o("Lag"),
          value: _.link.lag,
          disabled: b && h?.unscheduled,
          onChange: (U) => {
            U.input || d(_.link.id, { lag: U.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ u(
        nn,
        {
          value: _.link.type,
          placeholder: o("Select link type"),
          options: M,
          onChange: (U) => d(_.link.id, { type: U.value }),
          children: ({ option: U }) => U.label
        }
      ) }) }),
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => w(_.link.id),
          role: "button"
        }
      ) })
    ] }, _.link.id)) }) }) }) }, W) : null
  ) });
}
function es(t) {
  const { value: n, time: s, format: i, onchange: o, onChange: L, ...h } = t, k = L ?? o;
  function r(b) {
    const p = new Date(b.value);
    p.setHours(n.getHours()), p.setMinutes(n.getMinutes()), k && k({ value: p });
  }
  return /* @__PURE__ */ Pe("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ u(
      sn,
      {
        ...h,
        value: n,
        onChange: r,
        format: i,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ u(rn, { value: n, onChange: k, format: i }) : null
  ] });
}
Ue("select", ln);
Ue("date", es);
Ue("twostate", cn);
Ue("slider", an);
Ue("counter", un);
Ue("links", Jn);
function Ms({
  api: t,
  items: n = [],
  css: s = "",
  layout: i = "default",
  readonly: o = !1,
  placement: L = "sidebar",
  bottomBar: h = !0,
  topBar: k = !0,
  autoSave: r = !0,
  focus: b = !1,
  hotkeys: p = {}
}) {
  const B = Ge(Ke.i18n), q = $(() => B || rt({ ...ot, ...dt }), [B]), M = $(() => q.getGroup("gantt"), [q]), w = q.getRaw(), d = $(() => {
    const m = w.gantt?.dateFormat || w.formats?.dateFormat;
    return st(m, w.calendar);
  }, [w]), K = $(() => {
    if (k === !0 && !o) {
      const m = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: M("Delete"),
          id: "delete"
        }
      ];
      return r ? { items: m } : {
        items: [
          ...m,
          {
            comp: "button",
            type: "primary",
            text: M("Save"),
            id: "save"
          }
        ]
      };
    }
    return k;
  }, [k, o, r, M]), [W, _] = pe(!1), U = $(
    () => W ? "wx-full-screen" : "",
    [W]
  ), v = N((m) => {
    _(m);
  }, []);
  ce(() => {
    const m = Ot(v);
    return m.observe(), () => {
      m.disconnect();
    };
  }, [v]);
  const H = X(t, "_activeTask"), C = X(t, "activeTask"), Q = X(t, "unscheduledTasks"), re = X(t, "links"), Z = X(t, "splitTasks"), fe = $(
    () => Z && C?.segmentIndex,
    [Z, C]
  ), V = $(
    () => fe || fe === 0,
    [fe]
  ), ue = $(
    () => bn({ unscheduledTasks: Q }),
    [Q]
  ), D = X(t, "undo"), [f, G] = pe({}), [ne, he] = pe(null), [oe, de] = pe(), [ve, Ee] = pe(null), Le = X(t, "taskTypes"), De = $(() => {
    if (!H) return null;
    let m;
    if (V && H.segments ? m = { ...H.segments[fe] } : m = { ...H }, o) {
      let le = { parent: m.parent };
      return ue.forEach(({ key: we, comp: Y }) => {
        if (Y !== "links") {
          const $e = m[we];
          Y === "date" && $e instanceof Date ? le[we] = d($e) : Y === "slider" && we === "progress" ? le[we] = `${$e}%` : le[we] = $e;
        }
      }), le;
    }
    return m || null;
  }, [H, V, fe, o, ue, d]);
  ce(() => {
    de(De);
  }, [De]), ce(() => {
    G({}), Ee(null), he(null);
  }, [C]);
  function He(m, le) {
    return m.map((we) => {
      const Y = { ...we };
      if (we.config && (Y.config = { ...Y.config }), Y.comp === "links" && t && (Y.api = t, Y.autoSave = r, Y.onLinksChange = x), Y.comp === "select" && Y.key === "type") {
        const $e = Y.options ?? (Le || []);
        Y.options = $e.map((ae) => ({
          ...ae,
          label: M(ae.label)
        }));
      }
      return Y.comp === "slider" && Y.key === "progress" && (Y.labelTemplate = ($e) => `${M(Y.label)} ${$e}%`), Y.label && (Y.label = M(Y.label)), Y.config?.placeholder && (Y.config.placeholder = M(Y.config.placeholder)), le && (Y.isDisabled && Y.isDisabled(le, t.getState()) ? Y.disabled = !0 : delete Y.disabled), Y;
    });
  }
  const be = $(() => {
    let m = n.length ? n : ue;
    return m = He(m, oe), oe ? m.filter(
      (le) => !le.isHidden || !le.isHidden(oe, t.getState())
    ) : m;
  }, [n, ue, oe, Le, M, t, r]), te = $(
    () => be.map((m) => m.key),
    [be]
  );
  function x({ id: m, action: le, data: we }) {
    G((Y) => ({
      ...Y,
      [m]: { action: le, data: we }
    }));
  }
  const A = N(() => {
    for (let m in f)
      if (re.byId(m)) {
        const { action: le, data: we } = f[m];
        t.exec(le, we);
      }
  }, [t, f, re]), j = N(() => {
    const m = C?.id || C;
    if (V) {
      if (H?.segments) {
        const le = H.segments.filter(
          (we, Y) => Y !== fe
        );
        t.exec("update-task", {
          id: m,
          task: { segments: le }
        });
      }
    } else
      t.exec("delete-task", { id: m });
  }, [t, C, V, H, fe]), F = N(() => {
    t.exec("show-editor", { id: null });
  }, [t]), O = N(
    (m) => {
      const { item: le, changes: we } = m;
      le.id === "delete" && j(), le.id === "save" && (we.length ? F() : A()), le.comp && F();
    },
    [t, C, r, A, j, F]
  ), ke = N(
    (m, le, we) => (Q && m.type === "summary" && (m.unscheduled = !1), Wt(m, t.getState(), le), we || he(!1), m),
    [Q, t]
  ), ie = N(
    (m) => {
      m = {
        ...m,
        unscheduled: Q && m.unscheduled && m.type !== "summary"
      }, delete m.links, delete m.data, (te.indexOf("duration") === -1 || m.segments && !m.duration) && delete m.duration;
      const le = {
        id: C?.id || C,
        task: m,
        ...V && { segmentIndex: fe }
      };
      r && ne && (le.inProgress = ne), t.exec("update-task", le), r || A();
    },
    [
      t,
      C,
      Q,
      r,
      A,
      te,
      V,
      fe,
      ne
    ]
  ), T = N(
    (m) => {
      let { update: le, key: we, input: Y } = m;
      if (Y && he(!0), m.update = ke({ ...le }, we, Y), !r) de(m.update);
      else if (!ve && !Y) {
        const $e = be.find((Te) => Te.key === we), ae = le[we];
        (!$e.validation || $e.validation(ae)) && (!$e.required || ae) && ie(m.update);
      }
    },
    [r, ke, ve, be, ie]
  ), ee = N(
    (m) => {
      r || ie(m.values);
    },
    [r, ie]
  ), me = N((m) => {
    Ee(m.errors);
  }, []), ge = $(
    () => D ? {
      "ctrl+z": (m) => {
        m.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (m) => {
        m.preventDefault(), t.exec("redo");
      }
    } : {},
    [D, t]
  );
  return De ? /* @__PURE__ */ u(on, { children: /* @__PURE__ */ u(
    Dn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${U} ${s}`,
      items: be,
      values: De,
      topBar: K,
      bottomBar: h,
      placement: L,
      layout: i,
      readonly: o,
      autoSave: r,
      focus: b,
      onAction: O,
      onSave: ee,
      onValidation: me,
      onChange: T,
      hotkeys: p && { ...ge, ...p }
    }
  ) }) : null;
}
const Cs = ({ children: t, columns: n = null, api: s }) => {
  const [i, o] = pe(null);
  return ce(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ u($n, { api: i, columns: n, children: t });
};
function Ds(t) {
  const { api: n, content: s, children: i } = t, o = se(null), L = se(null), [h, k] = pe({}), [r, b] = pe(null), [p, B] = pe({});
  function q(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const H = v.getAttribute("data-tooltip-id"), C = v.getAttribute("data-tooltip-at"), Q = v.getAttribute("data-tooltip");
        if (H || Q) return { id: H, tooltip: Q, target: v, at: C };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ce(() => {
    const v = L.current;
    if (v && p && (p.text || s)) {
      const H = v.getBoundingClientRect();
      let C = !1, Q = p.left, re = p.top;
      H.right >= h.right && (Q = h.width - H.width - 5, C = !0), H.bottom >= h.bottom && (re = p.top - (H.bottom - h.bottom + 2), C = !0), C && B((Z) => Z && { ...Z, left: Q, top: re });
    }
  }, [p, h, s]);
  const M = se(null), w = 300, d = (v) => {
    clearTimeout(M.current), M.current = setTimeout(() => {
      v();
    }, w);
  };
  function K(v) {
    let { id: H, tooltip: C, target: Q, at: re } = q(v.target);
    if (B(null), b(null), !C)
      if (H)
        C = _(H);
      else {
        clearTimeout(M.current);
        return;
      }
    const Z = v.clientX;
    d(() => {
      H && b(W(U(H)));
      const fe = Q.getBoundingClientRect(), V = o.current, ue = V ? V.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let D, f;
      re === "left" ? (D = fe.top + 5 - ue.top, f = fe.right + 5 - ue.left) : (D = fe.top + fe.height - ue.top, f = Z - ue.left), k(ue), B({ top: D, left: f, text: C });
    });
  }
  function W(v) {
    return n?.getTask(U(v)) || null;
  }
  function _(v) {
    return W(v)?.text || "";
  }
  function U(v) {
    const H = parseInt(v);
    return isNaN(H) ? v : H;
  }
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: K,
      children: [
        p && (p.text || s) ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: L,
            style: { top: `${p.top}px`, left: `${p.left}px` },
            children: s ? /* @__PURE__ */ u(s, { data: r }) : p.text ? /* @__PURE__ */ u("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: p.text }) : null
          }
        ) : null,
        i
      ]
    }
  );
}
function Rs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(Tt, { fonts: t, children: n() }) : /* @__PURE__ */ u(Tt, { fonts: t });
}
function Es({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u($t, { fonts: t, children: n }) : /* @__PURE__ */ u($t, { fonts: t });
}
function Ss({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(Mt, { fonts: t, children: n }) : /* @__PURE__ */ u(Mt, { fonts: t });
}
export {
  $s as ContextMenu,
  Ms as Editor,
  vs as Gantt,
  Cs as HeaderMenu,
  Rs as Material,
  Ts as Toolbar,
  Ds as Tooltip,
  Es as Willow,
  Ss as WillowDark,
  Is as defaultColumns,
  Ps as defaultEditorItems,
  Hs as defaultMenuOptions,
  As as defaultTaskTypes,
  Ws as defaultToolbarButtons,
  _s as getEditorItems,
  zs as getMenuOptions,
  Gs as getToolbarButtons,
  Ys as registerEditorItem,
  Os as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
