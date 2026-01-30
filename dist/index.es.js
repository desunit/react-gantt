import { jsxs as Pe, jsx as u, Fragment as Je } from "react/jsx-runtime";
import { createContext as en, useMemo as v, useState as pe, useContext as Ge, useCallback as N, useRef as re, useEffect as ae, Fragment as tn, forwardRef as Wt, useImperativeHandle as _t } from "react";
import { context as Xe, Button as Ct, Field as nn, Text as sn, Combo as rn, DatePicker as on, TimePicker as ln, Locale as cn, RichSelect as an, TwoState as un, Slider as dn, Counter as fn, Material as $t, Willow as Mt, WillowDark as Dt } from "@svar-ui/react-core";
import { locate as Ye, locateID as Be, locateAttr as hn, dateToString as rt, locale as ot } from "@svar-ui/lib-dom";
import { en as it } from "@svar-ui/gantt-locales";
import { en as ft } from "@svar-ui/core-locales";
import { EventBusRouter as mn } from "@svar-ui/lib-state";
import { prepareEditTask as zt, grid as gn, extendDragOptions as wn, isSegmentMoveAllowed as xn, DataStore as pn, normalizeLinks as yn, normalizeZoom as kn, defaultColumns as bn, parseTaskDates as Rt, defaultTaskTypes as Tn, getToolbarButtons as Et, handleAction as Gt, isHandledAction as Ut, getMenuOptions as St, getEditorItems as vn } from "@svar-ui/gantt-store";
import { defaultColumns as As, defaultEditorItems as Hs, defaultMenuOptions as Ws, defaultTaskTypes as _s, defaultToolbarButtons as zs, getEditorItems as Gs, getMenuOptions as Us, getToolbarButtons as Os, registerScaleUnit as Ys } from "@svar-ui/gantt-store";
import { useWritableProp as dt, useStore as O, useStoreWithCounter as st, writable as Cn, useStoreLater as Fe } from "@svar-ui/lib-react";
import { hotkeys as Ot } from "@svar-ui/grid-store";
import { Grid as $n, HeaderMenu as Mn } from "@svar-ui/react-grid";
import { flushSync as Dn } from "react-dom";
import { Toolbar as Nt } from "@svar-ui/react-toolbar";
import { ContextMenu as Rn } from "@svar-ui/react-menu";
import { Editor as En, registerEditorItem as je } from "@svar-ui/react-editor";
import { registerEditorItem as Fs } from "@svar-ui/react-editor";
const Ke = en(null);
function qe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Sn(t, n, s) {
  const i = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: i.top - o.top,
    left: i.left - o.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top
  };
}
function Lt(t) {
  return t && t.getAttribute("data-context-id");
}
const It = 5;
function Nn(t, n) {
  let s, i, o, I, h, C, r, k, p;
  function V(M) {
    I = M.clientX, h = M.clientY, C = {
      ...Sn(s, t, M),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function K(M) {
    s = Ye(M), Lt(s) && (o = qe(s), p = setTimeout(() => {
      k = !0, n && n.touchStart && n.touchStart(), V(M.touches[0]);
    }, 500), t.addEventListener("touchmove", _), t.addEventListener("contextmenu", $), window.addEventListener("touchend", B));
  }
  function $(M) {
    if (k || p)
      return M.preventDefault(), !1;
  }
  function w(M) {
    M.which === 1 && (s = Ye(M), Lt(s) && (o = qe(s), t.addEventListener("mousemove", W), window.addEventListener("mouseup", b), V(M)));
  }
  function d(M) {
    t.removeEventListener("mousemove", W), t.removeEventListener("touchmove", _), document.body.removeEventListener("mouseup", b), document.body.removeEventListener("touchend", B), document.body.style.userSelect = "", M && (t.removeEventListener("mousedown", w), t.removeEventListener("touchstart", K));
  }
  function X(M) {
    const Q = M.clientX - I, oe = M.clientY - h;
    if (!i) {
      if (Math.abs(Q) < It && Math.abs(oe) < It || n && n.start && n.start({ id: o, e: M }) === !1)
        return;
      i = s.cloneNode(!0), i.style.pointerEvents = "none", i.classList.add("wx-reorder-task"), i.style.position = "absolute", i.style.left = C.left + "px", i.style.top = C.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const Z = Math.round(Math.max(0, C.top + oe));
      if (n && n.move && n.move({ id: o, top: Z, detail: r }) === !1)
        return;
      const fe = n.getTask(o), q = fe.$y;
      if (!C.start && C.y == q) return A();
      C.start = !0, C.y = fe.$y - 4, i.style.top = Z + "px";
      const ue = document.elementFromPoint(
        M.clientX,
        M.clientY
      ), D = Ye(ue);
      if (D && D !== s) {
        const f = qe(D), G = D.getBoundingClientRect(), ne = G.top + G.height / 2, he = M.clientY + C.db > ne && D.nextElementSibling !== s, ie = M.clientY - C.dt < ne && D.previousElementSibling !== s;
        r?.after == f || r?.before == f ? r = null : he ? r = { id: o, after: f } : ie && (r = { id: o, before: f });
      }
    }
  }
  function W(M) {
    X(M);
  }
  function _(M) {
    k ? (M.preventDefault(), X(M.touches[0])) : p && (clearTimeout(p), p = null);
  }
  function B() {
    k = null, p && (clearTimeout(p), p = null), A();
  }
  function b() {
    A();
  }
  function A() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: o, top: C.top })), o = s = i = C = r = null, d();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", w), t.addEventListener("touchstart", K), {
    destroy() {
      d(!0);
    }
  };
}
function Ln({ row: t, column: n }) {
  function s(o, I) {
    return {
      justifyContent: I.align,
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
function Pt({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ u("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ u(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function In(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: o = "all",
    columnWidth: I = 0,
    onTableAPIChange: h,
    multiTaskRows: C = !1,
    rowMapping: r = null
  } = t, [k, p] = dt(I), [V, K] = pe(), $ = Ge(Xe.i18n), w = v(() => $.getGroup("gantt"), [$]), d = Ge(Ke), X = O(d, "scrollTop"), W = O(d, "cellHeight"), _ = O(d, "_scrollTask"), B = O(d, "_selected"), b = O(d, "area"), A = O(d, "_tasks"), M = O(d, "_scales"), Q = O(d, "columns"), oe = O(d, "_sort"), Z = O(d, "calendar"), fe = O(d, "durationUnit"), q = O(d, "splitTasks"), [ue, D] = pe(null), f = v(() => !A || !b ? [] : C && r ? A : A.slice(b.start, b.end), [A, b, C, r]), G = N(
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
  ), he = re(null), ie = re(null), [de, ve] = pe(0), [Ee, Le] = pe(!1);
  ae(() => {
    const l = ie.current;
    if (!l || typeof ResizeObserver > "u") return;
    const y = () => ve(l.clientWidth);
    y();
    const E = new ResizeObserver(y);
    return E.observe(l), () => E.disconnect();
  }, []);
  const De = re(null), Ae = N(
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
  ), be = v(() => C && r ? 0 : b?.from ?? 0, [b, C, r]), ee = v(() => M?.height ?? 0, [M]), x = v(() => !s && o !== "grid" ? (k ?? 0) > (i ?? 0) : (k ?? 0) > (de ?? 0), [s, o, k, i, de]), H = v(() => {
    const l = {};
    return x && o === "all" || o === "grid" && x ? l.width = k : o === "grid" && (l.width = "100%"), l;
  }, [x, o, k]), j = v(() => ue && !f.find((l) => l.id === ue.id) ? [...f, ue] : f, [f, ue]), F = v(() => {
    if (!C || !r) return j;
    const l = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    return j.forEach((E) => {
      const z = r.taskRows.get(E.id) ?? E.id;
      y.has(z) || (l.set(z, {
        ...E,
        $rowTasks: r.rowMap.get(z) || [E.id]
      }), y.add(z));
    }), Array.from(l.values());
  }, [j, C, r]), U = v(() => {
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
    if (y !== -1 && (l[y].cell && (l[y]._cell = l[y].cell), l[y].cell = Ln), E !== -1) {
      l[E].cell = l[E].cell || Pt;
      const z = l[E].header;
      if (typeof z != "object" && (l[E].header = { text: z }), l[E].header.cell = z.cell || Pt, n)
        l.splice(E, 1);
      else if (s) {
        const [xe] = l.splice(E, 1);
        l.unshift(xe);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [Q, w, n, s]), ke = v(() => o === "all" ? `${i}px` : o === "grid" ? "calc(100% - 4px)" : U.find((l) => l.id === "add-task") ? "50px" : "0", [o, i, U]), le = v(() => {
    if (F && oe?.length) {
      const l = {};
      return oe.forEach(({ key: y, order: E }, z) => {
        l[y] = {
          order: E,
          ...oe.length > 1 && { index: z }
        };
      }), l;
    }
    return {};
  }, [F, oe]), T = N(() => U.some((l) => l.flexgrow && !l.hidden), []), J = v(() => T(), [T, Ee]), me = v(() => {
    let l = o === "chart" ? U.filter((E) => E.id === "add-task") : U;
    const y = o === "all" ? i : de;
    if (!J) {
      let E = k, z = !1;
      if (U.some((xe) => xe.$width)) {
        let xe = 0;
        E = U.reduce((ye, Ne) => (Ne.hidden || (xe += Ne.width, ye += Ne.$width || Ne.width), ye), 0), xe > E && E > y && (z = !0);
      }
      if (z || E < y) {
        let xe = 1;
        return z || (xe = (y - 50) / (E - 50 || 1)), l.map((ye) => (ye.id !== "add-task" && !ye.hidden && (ye.$width || (ye.$width = ye.width), ye.width = ye.$width * xe), ye));
      }
    }
    return l;
  }, [o, U, J, k, i, de]), ge = N(
    (l) => {
      if (!T()) {
        const y = me.reduce((E, z) => (l && z.$width && (z.$width = z.width), E + (z.hidden ? 0 : z.width)), 0);
        y !== k && p(y);
      }
      Le(!0), Le(!1);
    },
    [T, me, k, p]
  ), m = N(() => {
    U.filter((y) => y.flexgrow && !y.hidden).length === 1 && U.forEach((y) => {
      y.$width && !y.flexgrow && !y.hidden && (y.width = y.$width);
    });
  }, []), ce = N(
    (l) => {
      if (!n) {
        const y = Be(l), E = hn(l, "data-col-id");
        !(E && U.find((xe) => xe.id == E))?.editor && y && d.exec("show-editor", { id: y });
      }
    },
    [d, n]
    // cols is defined later; relies on latest value at call time
  ), we = v(
    () => Array.isArray(B) ? B.map((l) => l.id) : [],
    [B]
  ), Y = re(be);
  Y.current = be, ae(() => {
    const l = (E) => {
      if (he.current) {
        const z = he.current.querySelector(".wx-body");
        z && (z.style.top = -((E ?? 0) - (Y.current ?? 0)) + "px");
      }
      ie.current && (ie.current.scrollTop = 0);
    };
    return l(X), d.on("scroll-chart", ({ top: E }) => {
      E !== void 0 && l(E);
    });
  }, [d, X]), ae(() => {
    if (he.current) {
      const l = he.current.querySelector(".wx-body");
      l && (l.style.top = -((X ?? 0) - (be ?? 0)) + "px");
    }
  }, [be]), ae(() => {
    const l = he.current;
    if (!l) return;
    const y = l.querySelector(".wx-table-box .wx-body");
    if (!y || typeof ResizeObserver > "u") return;
    const E = new ResizeObserver(() => {
      if (he.current) {
        const z = he.current.querySelector(".wx-body");
        z && (z.style.top = -((X ?? 0) - (Y.current ?? 0)) + "px");
      }
    });
    return E.observe(y), () => {
      E.disconnect();
    };
  }, [me, H, o, ke, F, X]), ae(() => {
    if (!_ || !V) return;
    const { id: l } = _, y = V.getState().focusCell;
    y && y.row !== l && he.current && he.current.contains(document.activeElement) && V.exec("focus-cell", {
      row: l,
      column: y.column
    });
  }, [_, V]);
  const $e = N(
    ({ id: l }) => {
      if (n) return !1;
      d.getTask(l).open && d.exec("open-task", { id: l, mode: !1 });
      const y = d.getState()._tasks.find((E) => E.id === l);
      if (D(y || null), !y) return !1;
    },
    [d, n]
  ), se = N(
    ({ id: l, top: y }) => {
      De.current ? Ae({ ...De.current, onMove: !1 }) : d.exec("drag-task", {
        id: l,
        top: y + (be ?? 0),
        inProgress: !1
      }), D(null);
    },
    [d, Ae, be]
  ), Me = N(
    ({ id: l, top: y, detail: E }) => {
      E && Ae({ ...E, onMove: !0 }), d.exec("drag-task", {
        id: l,
        top: y + (be ?? 0),
        inProgress: !0
      });
    },
    [d, Ae, be]
  );
  ae(() => {
    const l = he.current;
    return l ? Nn(l, {
      start: $e,
      end: se,
      move: Me,
      getTask: d.getTask
    }).destroy : void 0;
  }, [d, $e, se, Me]);
  const Ce = N(
    (l) => {
      const { key: y, isInput: E } = l;
      if (!E && (y === "arrowup" || y === "arrowdown"))
        return l.eventSource = "grid", d.exec("hotkey", l), !1;
      if (y === "enter") {
        const z = V?.getState().focusCell;
        if (z) {
          const { row: xe, column: ye } = z;
          ye === "add-task" ? G(xe, "add-task") : ye === "text" && G(xe, "open-task");
        }
      }
    },
    [d, G, V]
  ), Re = re(null), He = () => {
    Re.current = {
      setTableAPI: K,
      handleHotkey: Ce,
      sortVal: oe,
      api: d,
      adjustColumns: m,
      setColumnWidth: ge,
      tasks: f,
      calendarVal: Z,
      durationUnitVal: fe,
      splitTasksVal: q,
      onTableAPIChange: h
    };
  };
  He(), ae(() => {
    He();
  }, [
    K,
    Ce,
    oe,
    d,
    m,
    ge,
    f,
    Z,
    fe,
    q,
    h
  ]);
  const _e = N((l) => {
    K(l), l.intercept("hotkey", (y) => Re.current.handleHotkey(y)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (y) => {
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
        ze && !isNaN(ze) && !(ze instanceof Date) && (ze *= 1), Ne[z] = ze, zt(
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
      ref: ie,
      children: /* @__PURE__ */ u(
        "div",
        {
          ref: he,
          style: H,
          className: "wx-rHj6070p wx-table",
          onClick: ne,
          onDoubleClick: ce,
          children: /* @__PURE__ */ u(
            $n,
            {
              init: _e,
              sizes: {
                rowHeight: W,
                headerHeight: (ee ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: F,
              columns: me,
              selectedRows: [...we],
              sortMarks: le
            }
          )
        }
      )
    }
  );
}
function Pn({ borders: t = "" }) {
  const n = Ge(Ke), s = O(n, "cellWidth"), i = O(n, "cellHeight"), o = re(null), [I, h] = pe("#e4e4e4");
  ae(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const r = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      h(r ? r.substring(r.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const C = {
    width: "100%",
    height: "100%",
    background: s != null && i != null ? `url(${gn(s, i, I, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ u("div", { ref: o, style: C });
}
function An({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = Ge(Ke), o = O(i, "_links"), I = O(i, "criticalPath"), h = re(null), C = N(
    (r) => {
      const k = r?.target?.classList;
      !k?.contains("wx-line") && !k?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return ae(() => {
    if (!s && n && h.current) {
      const r = (k) => {
        h.current && !h.current.contains(k.target) && C(k);
      };
      return document.addEventListener("click", r), () => {
        document.removeEventListener("click", r);
      };
    }
  }, [s, n, C]), /* @__PURE__ */ Pe("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((r) => {
      const k = "wx-dkx3NwEn wx-line" + (I && r.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ u(
        "polyline",
        {
          className: k,
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
function Hn(t) {
  const { task: n, type: s } = t;
  function i(I) {
    const h = n.segments[I];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function o(I) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, C = n.segments;
    let r = 0, k = 0, p = null;
    do {
      const V = C[k];
      k === I && (r > h ? p = 0 : p = Math.min((h - r) / V.duration, 1) * 100), r += V.duration, k++;
    } while (p === null && k < C.length);
    return p || 0;
  }
  return /* @__PURE__ */ u("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((I, h) => /* @__PURE__ */ Pe(
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
        /* @__PURE__ */ u("div", { className: "wx-content", children: I.text || "" })
      ]
    },
    h
  )) });
}
let at = [], ut = null, At = null;
const Ve = (t) => new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())), Ht = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: i, lengthUnit: o } = n, I = 864e5, h = o === "week" ? 7 : o === "month" ? 30 : o === "quarter" ? 91 : o === "year" ? 365 : 1, C = Math.floor(t / i), r = Ve(s);
  return new Date(r.getTime() + C * h * I);
}, Wn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: i } = s, h = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / h);
}, _n = (t, n, s) => {
  if (!s || !t) return t;
  const { lengthUnit: i } = s, h = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5, C = new Date(t.getTime() + n * h);
  return C.setUTCHours(0, 0, 0, 0), C;
}, zn = (t, n, s, i) => t < i && n > s;
function Gn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: i = !1,
    rowMapping: o = null,
    marqueeSelect: I = !1,
    copyPaste: h = !1,
    allowTaskIntersection: C = !0
  } = t, r = Ge(Ke), [k, p] = st(r, "_tasks"), [V, K] = st(r, "_links"), $ = O(r, "area"), w = O(r, "_scales"), d = O(r, "taskTypes"), X = O(r, "baselines"), [W, _] = st(r, "_selected"), B = O(r, "_scrollTask"), b = O(r, "criticalPath"), A = O(r, "tasks"), M = O(r, "schedule"), Q = O(r, "splitTasks"), oe = v(() => {
    if (!$ || !Array.isArray(k)) return [];
    const e = $.start ?? 0, c = $.end ?? 0;
    return i && o ? k.map((a) => ({ ...a })) : k.slice(e, c).map((a) => ({ ...a }));
  }, [p, $, i, o]), Z = O(r, "cellHeight"), fe = v(() => {
    if (!i || !o || !oe.length) return oe;
    const e = /* @__PURE__ */ new Map(), c = [];
    return k.forEach((a) => {
      const g = o.taskRows.get(a.id) ?? a.id;
      e.has(g) || (e.set(g, c.length), c.push(g));
    }), oe.map((a) => {
      const g = o.taskRows.get(a.id) ?? a.id, S = e.get(g) ?? 0;
      return {
        ...a,
        $y: S * Z,
        $y_base: a.$y_base !== void 0 ? S * Z : void 0
      };
    });
  }, [oe, i, o, k, Z]), q = v(
    () => w.lengthUnitWidth,
    [w]
  ), ue = v(
    () => w.lengthUnit || "day",
    [w]
  ), D = re(!1), [f, G] = pe(void 0), [ne, he] = pe(null), ie = re(null), [de, ve] = pe(null), [Ee, Le] = pe(void 0), De = re(null), [Ae, be] = pe(0), [ee, x] = pe(null), H = re(null), [j, F] = pe(null), [U, ke] = pe(null), [le, T] = pe(null), J = re(null);
  J.current = U;
  const me = re(200), ge = re(null), m = v(() => {
    const e = ge.current;
    return !!(W.length && e && e.contains(document.activeElement));
  }, [W, ge.current]), ce = v(() => m && W[W.length - 1]?.id, [m, W]);
  ae(() => {
    if (B && m && B) {
      const { id: e } = B, c = ge.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [B]), ae(() => {
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
      if (c.target.classList.contains("wx-line") || (a || (a = r.getTask(qe(e))), a.type === "milestone" || a.type === "summary")) return "";
      const g = Ye(c, "data-segment");
      g && (e = g);
      const { left: S, width: R } = e.getBoundingClientRect(), P = (c.clientX - S) / R;
      let L = 0.2 / (R > 200 ? R / 200 : 1);
      return P < L ? "start" : P > 1 - L ? "end" : "";
    },
    [r]
  ), se = v(() => {
    const e = /* @__PURE__ */ new Set();
    if (C || !i || !o)
      return e;
    const c = /* @__PURE__ */ new Map();
    return k.forEach((a) => {
      if (a.type === "summary" || a.type === "milestone") return;
      const g = o.taskRows.get(a.id) ?? a.id;
      c.has(g) || c.set(g, []), c.get(g).push(a);
    }), c.forEach((a) => {
      if (!(a.length < 2))
        for (let g = 0; g < a.length; g++)
          for (let S = g + 1; S < a.length; S++) {
            const R = a[g], P = a[S], L = R.$x, te = R.$x + R.$w, Te = P.$x, Se = P.$x + P.$w;
            zn(L, te, Te, Se) && (e.add(R.id), e.add(P.id));
          }
    }), e;
  }, [C, i, o, k, p]), Me = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return k.forEach((g) => {
        e.set(g.id, g.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return k.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id;
      c.has(S) || (c.set(S, a.length), a.push(S));
    }), k.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id, R = c.get(S) ?? 0;
      e.set(g.id, R * Z);
    }), e;
  }, [k, i, o, Z]), Ce = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return k.forEach((g) => {
        e.set(g.id, g.$y), g.row !== void 0 && e.set(g.row, g.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return k.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id;
      c.has(S) || (c.set(S, a.length), a.push(S));
    }), c.forEach((g, S) => {
      e.set(S, g * Z);
    }), e;
  }, [k, i, o, Z]), Re = N(
    (e) => {
      if (!ge.current) return [];
      const a = Math.min(e.startX, e.currentX), g = Math.max(e.startX, e.currentX), S = Math.min(e.startY, e.currentY), R = Math.max(e.startY, e.currentY);
      return k.filter((P) => {
        const L = P.$x, te = P.$x + P.$w, Se = Me.get(P.id) ?? P.$y, We = Se + P.$h;
        return L < g && te > a && Se < R && We > S;
      });
    },
    [k, Me]
  ), He = v(() => new Set(W.map((e) => e.id)), [W, _]), _e = N(
    (e) => He.has(e),
    [He]
  ), l = N(
    (e, c) => {
      const { clientX: a } = c, g = qe(e), S = r.getTask(g), R = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (R.contains("wx-progress-marker")) {
          const { progress: P } = r.getTask(g);
          ie.current = {
            id: g,
            x: a,
            progress: P,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const P = $e(e, c, S) || "move", L = {
            id: g,
            mode: P,
            x: a,
            dx: 0,
            l: S.$x,
            w: S.$w
          };
          if (Q && S.segments?.length) {
            const te = Ye(c, "data-segment");
            te && (L.segmentIndex = te.dataset.segment * 1, wn(S, L));
          }
          he(L);
        }
        we();
      }
    },
    [r, n, $e, we, Q]
  ), y = N(
    (e) => {
      if (e.button !== 0 || le) return;
      const c = Ye(e);
      if (!c && I && !n) {
        const a = ge.current;
        if (!a) return;
        const g = a.getBoundingClientRect(), S = e.clientX - g.left, R = e.clientY - g.top;
        if (h) {
          const L = Ht(S, w);
          L && (J.current = L, ke(L));
        }
        const P = {
          startX: S,
          startY: R,
          currentX: S,
          currentY: R,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        x(P), H.current = P, we();
        return;
      }
      if (c) {
        if (I && !n && W.length > 1) {
          const a = qe(c);
          if (_e(a)) {
            const g = e.target.classList;
            if (!g.contains("wx-link") && !g.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const S = r.getTask(a);
              if (!$e(c, e, S)) {
                const P = /* @__PURE__ */ new Map();
                W.forEach((L) => {
                  const te = r.getTask(L.id);
                  if (te) {
                    if (M?.auto && te.type === "summary") return;
                    P.set(L.id, {
                      $x: te.$x,
                      $w: te.$w,
                      start: te.start,
                      end: te.end
                    });
                  }
                }), F({
                  baseTaskId: a,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: P
                }), we();
                return;
              }
            }
          }
        }
        l(c, e);
      }
    },
    [l, I, h, n, W, _e, r, $e, M, we, w, le]
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
      ve(e && { ...V.find((c) => c.id === e) });
    },
    [V]
  ), xe = N(() => {
    const e = H.current;
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
      })), x(null), H.current = null, Y(), D.current = !0;
      return;
    }
    if (j) {
      const { dx: c, originalPositions: a } = j, g = Math.round(c / q);
      if (g !== 0) {
        let S = !0;
        a.forEach((R, P) => {
          const L = r.getTask(P);
          L && (r.exec("update-task", {
            id: P,
            diff: g,
            task: { start: L.start, end: L.end },
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
    if (ie.current) {
      const { dx: c, id: a, marker: g, value: S } = ie.current;
      ie.current = null, typeof S < "u" && c && r.exec("update-task", {
        id: a,
        task: { progress: S },
        inProgress: !1
      }), g.classList.remove("wx-progress-in-drag"), D.current = !0, Y();
    } else if (ne) {
      const { id: c, mode: a, dx: g, l: S, w: R, start: P, segment: L, index: te } = ne;
      if (he(null), P) {
        const Te = Math.round(g / q);
        if (!Te)
          r.exec("drag-task", {
            id: c,
            width: R,
            left: S,
            inProgress: !1,
            ...L && { segmentIndex: te }
          });
        else {
          let Se = {}, We = r.getTask(c);
          L && (We = We.segments[te]);
          const Oe = 1440 * 60 * 1e3, Ie = Te * (ue === "week" ? 7 : ue === "month" ? 30 : ue === "quarter" ? 91 : ue === "year" ? 365 : 1) * Oe;
          a === "move" ? (Se.start = new Date(We.start.getTime() + Ie), Se.end = new Date(We.end.getTime() + Ie)) : a === "start" ? (Se.start = new Date(We.start.getTime() + Ie), Se.end = We.end) : a === "end" && (Se.start = We.start, Se.end = new Date(We.end.getTime() + Ie)), r.exec("update-task", {
            id: c,
            task: Se,
            ...L && { segmentIndex: te }
          });
        }
        D.current = !0;
      }
      Y();
    }
  }, [r, Y, ne, q, ue, ee, j, Re, W]), ye = N(
    (e, c) => {
      const { clientX: a, clientY: g } = c, S = ge.current;
      if (S) {
        const R = S.getBoundingClientRect();
        me.current = a - R.left;
      }
      if (le) {
        if (!S) return;
        const R = S.getBoundingClientRect(), P = a - R.left;
        T((L) => ({ ...L, currentX: P }));
        return;
      }
      if (!n) {
        if (ee) {
          const R = ge.current;
          if (!R) return;
          const P = R.getBoundingClientRect(), L = a - P.left, te = g - P.top;
          x((Te) => ({
            ...Te,
            currentX: L,
            currentY: te
          })), H.current && (H.current.currentX = L, H.current.currentY = te);
          return;
        }
        if (j) {
          const R = a - j.startX;
          j.originalPositions.forEach((P, L) => {
            const te = P.$x + R;
            r.exec("drag-task", {
              id: L,
              left: te,
              width: P.$w,
              inProgress: !0
            });
          }), F((P) => ({ ...P, dx: R }));
          return;
        }
        if (ie.current) {
          const { node: R, x: P, id: L } = ie.current, te = ie.current.dx = a - P, Te = Math.round(te / R.offsetWidth * 100);
          let Se = ie.current.progress + Te;
          ie.current.value = Se = Math.min(
            Math.max(0, Se),
            100
          ), r.exec("update-task", {
            id: L,
            task: { progress: Se },
            inProgress: !0
          });
        } else if (ne) {
          z(null);
          const { mode: R, l: P, w: L, x: te, id: Te, start: Se, segment: We, index: Oe } = ne, Ue = r.getTask(Te), Ie = a - te;
          if (!Se && Math.abs(Ie) < 20 || R === "start" && L - Ie < q || R === "end" && L + Ie < q || R === "move" && (Ie < 0 && P + Ie < 0 || Ie > 0 && P + L + Ie > Ae) || ne.segment && !xn(Ue, ne))
            return;
          const nt = { ...ne, dx: Ie };
          let Qe, Ze;
          if (R === "start" ? (Qe = P + Ie, Ze = L - Ie) : R === "end" ? (Qe = P, Ze = L + Ie) : R === "move" && (Qe = P + Ie, Ze = L), r.exec("drag-task", {
            id: Te,
            width: Ze,
            left: Qe,
            inProgress: !0,
            ...We && { segmentIndex: Oe }
          }), !nt.start && (R === "move" && Ue.$x == P || R !== "move" && Ue.$w == L)) {
            D.current = !0, xe();
            return;
          }
          nt.start = !0, he(nt);
        } else {
          const R = Ye(e);
          if (R) {
            const P = r.getTask(qe(R)), te = Ye(e, "data-segment") || R, Te = $e(te, c, P);
            te.style.cursor = Te && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      ne,
      q,
      Ae,
      $e,
      z,
      xe,
      ee,
      j,
      le
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
  ), lt = N(() => {
    xe();
  }, [xe]), Ft = N(() => {
    Le(null), De.current && (clearTimeout(De.current), De.current = null), xe();
  }, [xe]);
  ae(() => (window.addEventListener("mouseup", lt), () => {
    window.removeEventListener("mouseup", lt);
  }), [lt]);
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
  ), qt = ["e2s", "s2s", "e2e", "s2e"], et = N((e, c) => qt[(e ? 1 : 0) + (c ? 0 : 2)], []), tt = N(
    (e, c) => {
      const a = f.id, g = f.start;
      return e === a ? !0 : !!V.find((S) => S.target == e && S.source == a && S.type === et(g, c));
    },
    [f, K, et]
  ), ht = N(() => {
    f && G(null);
  }, [f]), mt = N((e, c, a) => {
    if (!c.length || !e || a == null) return;
    const g = 864e5, S = r.getHistory();
    S?.startBatch();
    const R = new Date(e), P = R.getUTCDay(), L = P === 0 ? -6 : 1 - P;
    R.setUTCDate(R.getUTCDate() + L), R.setUTCHours(0, 0, 0, 0), c.forEach((te, Te) => {
      const Se = `task-${Date.now()}-${Te}`, We = _n(R, te._startCellOffset || 0, w), Oe = new Date(We.getTime() + (te._startDayOfWeek || 0) * g);
      Oe.setUTCHours(0, 0, 0, 0);
      const Ue = new Date(Oe.getTime() + (te._durationDays || 7) * g);
      Ue.setUTCHours(0, 0, 0, 0), console.log("[paste] task:", te.text, "newStart:", Oe, "newEnd:", Ue, "_durationDays:", te._durationDays, "_startDayOfWeek:", te._startDayOfWeek), r.exec("add-task", {
        task: {
          id: Se,
          text: te.text,
          start: Oe,
          end: Ue,
          type: te.type || "task",
          parent: a,
          row: te.row
        },
        target: a,
        mode: "child",
        skipUndo: Te > 0
      });
    }), S?.endBatch();
  }, [r, w]), Vt = N(
    (e) => {
      if (D.current) {
        D.current = !1;
        return;
      }
      if (le && le.currentX != null) {
        const a = Ht(le.currentX, w);
        a && mt(a, le.tasks, le.parent), T(null);
        return;
      }
      const c = Be(e.target);
      if (c) {
        const a = r.getTask(c), g = k.find((R) => R.id === c);
        console.log("[click] task:", a?.text, "id:", c), console.log("[click] api.getTask:", { start: a?.start, end: a?.end, duration: a?.duration }), console.log("[click] rendered:", { start: g?.start, end: g?.end, $w: g?.$w, $x: g?.$x });
        const S = e.target.classList;
        if (S.contains("wx-link")) {
          const R = S.contains("wx-left");
          if (!f) {
            G({ id: c, start: R });
            return;
          }
          f.id !== c && !tt(c, R) && r.exec("add-link", {
            link: {
              source: f.id,
              target: c,
              type: et(f.start, R)
            }
          });
        } else if (S.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: de.id }), ve(null);
        else {
          let R;
          const P = Ye(e, "data-segment");
          P && (R = P.dataset.segment * 1), r.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: R
          });
        }
      }
      ht();
    },
    [
      r,
      f,
      K,
      de,
      tt,
      et,
      ht,
      le,
      w,
      mt
    ]
  ), Bt = N((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), jt = N((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Qt = N(
    (e) => {
      if (Ee || De.current)
        return e.preventDefault(), !1;
    },
    [Ee]
  ), gt = v(
    () => d.map((e) => e.id),
    [d]
  ), wt = N(
    (e) => {
      let c = gt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [gt]
  ), xt = N(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), ct = N(
    (e) => b && A.byId(e).$critical,
    [b, A]
  ), pt = N(
    (e) => {
      if (M?.auto) {
        const c = A.getSummaryId(e, !0), a = A.getSummaryId(f.id, !0);
        return f?.id && !(Array.isArray(c) ? c : [c]).includes(
          f.id
        ) && !(Array.isArray(a) ? a : [a]).includes(e);
      }
      return f;
    },
    [M, A, f]
  ), yt = N(() => {
    const e = r.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, a = e.map((L) => {
      const te = r.getTask(L.id);
      if (!te) return null;
      const Te = k.find((Jt) => Jt.id === L.id);
      if (!Te) return null;
      const { $x: Se, $y: We, $h: Oe, $w: Ue, $skip: Ie, $level: nt, $index: Qe, $y_base: Ze, $x_base: ss, $w_base: rs, $h_base: os, $skip_baseline: is, $critical: ls, $reorder: cs, ...Zt } = Te, bt = Te.end && Te.start ? Math.round((Te.end.getTime() - Te.start.getTime()) / c) : 0, Tt = Te.start ? Ve(Te.start) : null, vt = Tt ? (Tt.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", te.text, "durationDays:", bt, "startDayOfWeek:", vt, "$w:", Ue), { ...Zt, _durationDays: bt, _startDayOfWeek: vt, _originalWidth: Ue, _originalHeight: Oe };
    }).filter(Boolean);
    if (!a.length) return;
    const S = a[0].parent, R = a.filter((L) => L.parent === S);
    if (R.length === 0) return;
    const P = R.reduce((L, te) => {
      if (!te.start) return L;
      const Te = Ve(te.start);
      return !L || Te < L ? Te : L;
    }, null);
    at = R.map((L) => ({
      ...L,
      start: L.start ? Ve(L.start) : L.start,
      end: L.end ? Ve(L.end) : L.end,
      _startCellOffset: Wn(L.start ? Ve(L.start) : null, P, w)
    })), At = S, ut = P;
  }, [r, w]);
  ae(() => h ? r.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return yt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !at.length || !ut || T({
        tasks: at,
        baseDate: ut,
        parent: At,
        currentX: me.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [h, r, yt]), ae(() => {
    if (!le) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), T(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [le]);
  const kt = v(() => {
    if (!ee) return null;
    const e = Math.min(ee.startX, ee.currentX), c = Math.min(ee.startY, ee.currentY), a = Math.abs(ee.currentX - ee.startX), g = Math.abs(ee.currentY - ee.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${a}px`,
      height: `${g}px`
    };
  }, [ee]);
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${fe.length ? fe[0].$h : 0}px` },
      ref: ge,
      onContextMenu: Qt,
      onMouseDown: y,
      onMouseMove: Ne,
      onTouchStart: E,
      onTouchMove: ze,
      onTouchEnd: Ft,
      onClick: Vt,
      onDoubleClick: Kt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ u(
          An,
          {
            onSelectLink: z,
            selectedLink: de,
            readonly: n
          }
        ),
        fe.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = se.has(e.id), a = `wx-bar wx-${wt(e.type)}` + (Ee && ne && e.id === ne.id ? " wx-touch" : "") + (f && f.id === e.id ? " wx-selected" : "") + (He.has(e.id) ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (Q && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), g = "wx-link wx-left" + (f ? " wx-visible" : "") + (!f || !tt(e.id, !0) && pt(e.id) ? " wx-target" : "") + (f && f.id === e.id && f.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : ""), S = "wx-link wx-right" + (f ? " wx-visible" : "") + (!f || !tt(e.id, !1) && pt(e.id) ? " wx-target" : "") + (f && f.id === e.id && !f.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Pe(tn, { children: [
            !e.$skip && /* @__PURE__ */ Pe(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: Bt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: ce === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === de?.target && de?.type[2] === "s" ? /* @__PURE__ */ u(
                    Ct,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + g, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Pe(Je, { children: [
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
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: xt }) : Q && e.segments ? /* @__PURE__ */ u(Hn, { task: e, type: wt(e.type) }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" }),
                    c && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Pe(Je, { children: [
                    /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: xt }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === de?.target && de?.type[2] === "e" ? /* @__PURE__ */ u(
                    Ct,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + S, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            X && !e.$skip_baseline ? /* @__PURE__ */ u(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: jt(e)
              }
            ) : null
          ] }, e.id);
        }),
        ee && kt && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: kt }),
        le && le.currentX != null && le.tasks.map((e, c) => {
          const g = (Math.floor(le.currentX / q) + (e._startCellOffset || 0)) * q, S = e._originalWidth || q, R = e._originalHeight || Z, P = Ce.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: g, top: P, width: S, height: R },
              children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function Un(t) {
  const { highlightTime: n } = t, s = Ge(Ke), i = O(s, "_scales");
  return /* @__PURE__ */ u("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((o, I) => /* @__PURE__ */ u(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((h, C) => {
        const r = n ? n(h.date, h.unit) : "", k = "wx-cell " + (h.css || "") + " " + (r || ""), p = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ u(
          "div",
          {
            className: "wx-ZkvhDKir " + k,
            style: { width: `${h.width}px` },
            ...p ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          C
        );
      })
    },
    I
  )) });
}
const On = /* @__PURE__ */ new Map();
function Yn(t) {
  const n = re(null), s = re(0), i = re(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, ae(() => {
    if (o)
      return cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
        const I = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        On.set(t, I), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: I })
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
    cellBorders: I,
    highlightTime: h,
    multiTaskRows: C = !1,
    rowMapping: r = null,
    marqueeSelect: k = !1,
    copyPaste: p = !1,
    scrollToCurrentWeek: V = !1,
    currentWeekColor: K = null,
    allowTaskIntersection: $ = !0
  } = t, w = Ge(Ke), [d, X] = st(w, "_selected"), W = O(w, "scrollTop"), _ = O(w, "cellHeight"), B = O(w, "cellWidth"), b = O(w, "_scales"), A = O(w, "_markers"), M = O(w, "_scrollTask"), Q = O(w, "zoom"), oe = O(w, "_tasks"), [Z, fe] = pe(), q = re(null), ue = re(0), D = re(!1), f = 1 + (b?.rows?.length || 0), G = v(() => {
    if (!C || !r || !oe?.length) return null;
    const x = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), j = [];
    return oe.forEach((F) => {
      const U = r.taskRows.get(F.id) ?? F.id;
      H.has(U) || (H.set(U, j.length), j.push(U));
    }), oe.forEach((F) => {
      const U = r.taskRows.get(F.id) ?? F.id, ke = H.get(U) ?? 0;
      x.set(F.id, ke * _);
    }), x;
  }, [oe, C, r, _]), ne = v(() => {
    const x = [];
    return d && d.length && _ && d.forEach((H) => {
      const j = G?.get(H.id) ?? H.$y;
      x.push({ height: `${_}px`, top: `${j - 3}px` });
    }), x;
  }, [X, _, G]), he = v(
    () => Math.max(Z || 0, i),
    [Z, i]
  );
  ae(() => {
    const x = q.current;
    x && typeof W == "number" && (x.scrollTop = W);
  }, [W]);
  const ie = () => {
    de();
  };
  function de(x) {
    const H = q.current;
    if (!H) return;
    const j = {};
    j.left = H.scrollLeft, w.exec("scroll-chart", j);
  }
  function ve() {
    const x = q.current, j = Math.ceil((Z || 0) / (_ || 1)) + 1, F = Math.floor((x && x.scrollTop || 0) / (_ || 1)), U = Math.max(0, F - f), ke = F + j + f, le = U * (_ || 0);
    w.exec("render-data", {
      start: U,
      end: ke,
      from: le
    });
  }
  ae(() => {
    ve();
  }, [Z, W]);
  const Ee = N(
    (x) => {
      if (!x) return;
      const { id: H, mode: j } = x;
      if (j.toString().indexOf("x") < 0) return;
      const F = q.current;
      if (!F) return;
      const { clientWidth: U } = F, ke = w.getTask(H);
      if (ke.$x + ke.$w < F.scrollLeft)
        w.exec("scroll-chart", { left: ke.$x - (B || 0) }), F.scrollLeft = ke.$x - (B || 0);
      else if (ke.$x >= U + F.scrollLeft) {
        const le = U < ke.$w ? B || 0 : ke.$w;
        w.exec("scroll-chart", { left: ke.$x - U + le }), F.scrollLeft = ke.$x - U + le;
      }
    },
    [w, B]
  );
  ae(() => {
    Ee(M);
  }, [M]);
  function Le(x) {
    if (Q && (x.ctrlKey || x.metaKey)) {
      x.preventDefault();
      const H = q.current, j = x.clientX - (H ? H.getBoundingClientRect().left : 0);
      if (ue.current += x.deltaY, Math.abs(ue.current) >= 150) {
        const U = -Math.sign(ue.current);
        ue.current = 0, w.exec("zoom-scale", {
          dir: U,
          offset: j
        });
      }
    }
  }
  const De = N((x) => {
    const H = h(x.date, x.unit);
    return H ? {
      css: H,
      width: x.width
    } : null;
  }, [h]), Ae = v(() => {
    if (!b || !h || !["hour", "day", "week"].includes(b.minUnit)) return null;
    let H = 0;
    return b.rows[b.rows.length - 1].cells.map((j) => {
      const F = De(j), U = H;
      return H += j.width, F ? { ...F, left: U } : null;
    });
  }, [b, h, De]), be = N(
    (x) => {
      x.eventSource = "chart", w.exec("hotkey", x);
    },
    [w]
  );
  ae(() => {
    const x = q.current;
    if (!x) return;
    const H = () => fe(x.clientHeight);
    H();
    const j = new ResizeObserver(() => H());
    return j.observe(x), () => {
      j.disconnect();
    };
  }, [q.current]);
  const ee = re(null);
  return ae(() => {
    const x = q.current;
    if (x && !ee.current)
      return ee.current = Ot(x, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (H) => be(H)
      }), () => {
        ee.current?.destroy(), ee.current = null;
      };
  }, []), ae(() => {
    const x = q.current;
    if (!x) return;
    const H = Le;
    return x.addEventListener("wheel", H), () => {
      x.removeEventListener("wheel", H);
    };
  }, [Le]), ae(() => {
    if (!V || D.current || !b || !q.current || !Z) return;
    const x = q.current, { clientWidth: H } = x, j = /* @__PURE__ */ new Date(), F = b.rows[b.rows.length - 1]?.cells;
    if (!F) return;
    let U = -1, ke = 0;
    const le = [];
    for (let J = 0; J < F.length; J++) {
      const me = F[J];
      le.push({ left: ke, width: me.width });
      const ge = me.date;
      if (me.unit === "week") {
        const m = new Date(ge);
        m.setUTCDate(m.getUTCDate() + 7), j >= ge && j < m && (U = J);
      } else me.unit === "day" && j.getUTCFullYear() === ge.getUTCFullYear() && j.getUTCMonth() === ge.getUTCMonth() && j.getUTCDate() === ge.getUTCDate() && (U = J);
      ke += me.width;
    }
    let T = U;
    if (U > 0 && (T = U - 1), T >= 0 && le[T]) {
      const J = le[T], me = Math.max(0, J.left);
      x.scrollLeft = me, w.exec("scroll-chart", { left: me }), D.current = !0;
    }
  }, [V, b, Z, w]), Yn("chart"), /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: q,
      onScroll: ie,
      children: [
        /* @__PURE__ */ u(Un, { highlightTime: h, scales: b }),
        A && A.length ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${he}px` },
            children: A.map((x, H) => /* @__PURE__ */ u(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${x.css || ""}`,
                style: { left: `${x.left}px` },
                children: /* @__PURE__ */ u("div", { className: "wx-mR7v2Xag wx-content", children: x.text })
              },
              H
            ))
          }
        ) : null,
        /* @__PURE__ */ Pe(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${he}px` },
            children: [
              Ae ? /* @__PURE__ */ u(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Ae.map(
                    (x, H) => x ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + x.css,
                        style: {
                          width: `${x.width}px`,
                          left: `${x.left}px`
                        }
                      },
                      H
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ u(Pn, { borders: I }),
              d && d.length ? d.map(
                (x, H) => x.$y ? /* @__PURE__ */ u(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": x.id,
                    style: ne[H]
                  },
                  x.id
                ) : null
              ) : null,
              /* @__PURE__ */ u(
                Gn,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: C,
                  rowMapping: r,
                  marqueeSelect: k,
                  copyPaste: p,
                  allowTaskIntersection: $
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Fn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: i = "x",
    onMove: o,
    onDisplayChange: I,
    compactMode: h,
    containerWidth: C = 0,
    leftThreshold: r = 50,
    rightThreshold: k = 50
  } = t, [p, V] = dt(t.value ?? 0), [K, $] = dt(t.display ?? "all");
  function w(ie) {
    let de = 0;
    n == "center" ? de = s / 2 : n == "before" && (de = s);
    const ve = {
      size: [s + "px", "auto"],
      p: [ie - de + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let Ee in ve) ve[Ee] = ve[Ee].reverse();
    return ve;
  }
  const [d, X] = pe(!1), [W, _] = pe(null), B = re(0), b = re(), A = re(), M = re(K);
  ae(() => {
    M.current = K;
  }, [K]), ae(() => {
    W === null && p > 0 && _(p);
  }, [W, p]);
  function Q(ie) {
    return i == "x" ? ie.clientX : ie.clientY;
  }
  const oe = N(
    (ie) => {
      const de = b.current + Q(ie) - B.current;
      V(de);
      let ve;
      de <= r ? ve = "chart" : C - de <= k ? ve = "grid" : ve = "all", M.current !== ve && ($(ve), M.current = ve), A.current && clearTimeout(A.current), A.current = setTimeout(() => o && o(de), 100);
    },
    [C, r, k, o]
  ), Z = N(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", X(!1), window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", Z);
  }, [oe]), fe = v(
    () => K !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [K, i]
  ), q = N(
    (ie) => {
      !h && (K === "grid" || K === "chart") || (B.current = Q(ie), b.current = p, X(!0), document.body.style.cursor = fe, document.body.style.userSelect = "none", window.addEventListener("mousemove", oe), window.addEventListener("mouseup", Z));
    },
    [fe, oe, Z, p, h, K]
  );
  function ue() {
    $("all"), W !== null && (V(W), o && o(W));
  }
  function D(ie) {
    if (h) {
      const de = K === "chart" ? "grid" : "chart";
      $(de), I(de);
    } else if (K === "grid" || K === "chart")
      ue(), I("all");
    else {
      const de = ie === "left" ? "chart" : "grid";
      $(de), I(de);
    }
  }
  function f() {
    D("left");
  }
  function G() {
    D("right");
  }
  const ne = v(() => w(p), [p, n, s, i]), he = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${K}`,
    d ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: q,
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
function Yt(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let I of o)
        if (I.target === document.body) {
          let h = I.contentRect.width <= Kn;
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
function qn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: i,
    highlightTime: o,
    onTableAPIChange: I,
    multiTaskRows: h = !1,
    rowMapping: C = null,
    marqueeSelect: r = !1,
    copyPaste: k = !1,
    scrollToCurrentWeek: p = !1,
    currentWeekColor: V = null,
    allowTaskIntersection: K = !0
  } = t, $ = Ge(Ke), w = O($, "_tasks"), d = O($, "_scales"), X = O($, "cellHeight"), W = O($, "columns"), _ = O($, "_scrollTask"), B = O($, "undo"), b = v(() => {
    if (!h) return C;
    const T = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Map();
    return w.forEach((me) => {
      const ge = me.row ?? me.id;
      J.set(me.id, ge), T.has(ge) || T.set(ge, []), T.get(ge).push(me.id);
    }), { rowMap: T, taskRows: J };
  }, [w, h, C]), [A, M] = pe(!1);
  let [Q, oe] = pe(0);
  const [Z, fe] = pe(0), [q, ue] = pe(0), [D, f] = pe(void 0), [G, ne] = pe("all"), he = re(null), ie = N(
    (T) => {
      M((J) => (T !== J && (T ? (he.current = G, G === "all" && ne("grid")) : (!he.current || he.current === "all") && ne("all")), T));
    },
    [G]
  );
  ae(() => {
    const T = Yt(ie);
    return T.observe(), () => {
      T.disconnect();
    };
  }, [ie]);
  const de = v(() => {
    let T;
    return W.every((J) => J.width && !J.flexgrow) ? T = W.reduce((J, me) => J + parseInt(me.width), 0) : A && G === "chart" ? T = parseInt(W.find((J) => J.id === "action")?.width) || 50 : T = 440, Q = T, T;
  }, [W, A, G]);
  ae(() => {
    oe(de);
  }, [de]);
  const ve = v(
    () => (Z ?? 0) - (D ?? 0),
    [Z, D]
  ), Ee = v(() => d.width, [d]), Le = v(() => {
    if (!h || !b)
      return w.length * X;
    const T = /* @__PURE__ */ new Set();
    return w.forEach((J) => {
      const me = b.taskRows.get(J.id) ?? J.id;
      T.add(me);
    }), T.size * X;
  }, [w, X, h, b]), De = v(
    () => d.height + Le + ve,
    [d, Le, ve]
  ), Ae = v(
    () => Q + Ee,
    [Q, Ee]
  ), be = re(null), ee = N(() => {
    Promise.resolve().then(() => {
      if ((Z ?? 0) > (Ae ?? 0)) {
        const T = (Z ?? 0) - Q;
        $.exec("expand-scale", { minWidth: T });
      }
    });
  }, [Z, Ae, Q, $]);
  ae(() => {
    let T;
    return be.current && (T = new ResizeObserver(ee), T.observe(be.current)), () => {
      T && T.disconnect();
    };
  }, [be.current, ee]), ae(() => {
    ee();
  }, [Ee]);
  const x = re(null), H = re(null), j = N(() => {
    const T = x.current;
    T && $.exec("scroll-chart", {
      top: T.scrollTop
    });
  }, [$]), F = re({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  ae(() => {
    F.current = {
      rTasks: w,
      rScales: d,
      rCellHeight: X,
      scrollSize: ve,
      ganttDiv: x.current,
      ganttHeight: q ?? 0
    };
  }, [w, d, X, ve, q]);
  const U = N(
    (T) => {
      if (!T) return;
      const {
        rTasks: J,
        rScales: me,
        rCellHeight: ge,
        scrollSize: m,
        ganttDiv: ce,
        ganttHeight: we
      } = F.current;
      if (!ce) return;
      const { id: Y } = T, $e = J.findIndex((se) => se.id === Y);
      if ($e > -1) {
        const se = we - me.height, Me = $e * ge, Ce = ce.scrollTop;
        let Re = null;
        Me < Ce ? Re = Me : Me + ge > Ce + se && (Re = Me - se + ge + m), Re !== null && ($.exec("scroll-chart", { top: Math.max(Re, 0) }), x.current.scrollTop = Math.max(Re, 0));
      }
    },
    [$]
  );
  ae(() => {
    U(_);
  }, [_]), ae(() => {
    const T = x.current, J = H.current;
    if (!T || !J) return;
    const me = () => {
      Dn(() => {
        ue(T.offsetHeight), fe(T.offsetWidth), f(J.offsetWidth);
      });
    }, ge = new ResizeObserver(me);
    return ge.observe(T), () => ge.disconnect();
  }, [x.current]);
  const ke = re(null), le = re(null);
  return ae(() => {
    le.current && (le.current.destroy(), le.current = null);
    const T = ke.current;
    if (T)
      return le.current = Ot(T, {
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
          "ctrl+z": B,
          "ctrl+y": B,
          "meta+z": B,
          "meta+shift+z": B
        },
        exec: (J) => {
          if (J.isInput) return;
          const me = J.key;
          if (me === "ctrl+z" || me === "meta+z") {
            $.exec("undo", {});
            return;
          }
          if (me === "ctrl+y" || me === "meta+shift+z") {
            $.exec("redo", {});
            return;
          }
          $.exec("hotkey", J);
        }
      }), () => {
        le.current?.destroy(), le.current = null;
      };
  }, [B]), /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-gantt", ref: x, onScroll: j, children: /* @__PURE__ */ u(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: De, width: "100%" },
      ref: H,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: q,
            width: D
          },
          children: /* @__PURE__ */ Pe("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ke, children: [
            W.length ? /* @__PURE__ */ Pe(Je, { children: [
              /* @__PURE__ */ u(
                In,
                {
                  display: G,
                  compactMode: A,
                  columnWidth: de,
                  width: Q,
                  readonly: s,
                  fullHeight: Le,
                  onTableAPIChange: I,
                  multiTaskRows: h,
                  rowMapping: b
                }
              ),
              /* @__PURE__ */ u(
                Fn,
                {
                  value: Q,
                  display: G,
                  compactMode: A,
                  containerWidth: Z,
                  onMove: (T) => oe(T),
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
                rowMapping: b,
                marqueeSelect: r,
                copyPaste: k,
                scrollToCurrentWeek: p,
                currentWeekColor: V,
                allowTaskIntersection: K
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function Vn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function Bn(t, n) {
  return typeof t == "function" ? t : rt(t, n);
}
function Xt(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: Bn(s, n)
  }));
}
function jn(t, n) {
  const s = Vn(n);
  for (let i in s)
    s[i] = rt(s[i], t);
  return s;
}
function Qn(t, n) {
  if (!t || !t.length) return t;
  const s = rt("%d-%m-%Y", n);
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
function Zn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Xt(s.scales, n)
    }))
  } : t;
}
const Jn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), es = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Cs = Wt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: i = Tn,
  tasks: o = [],
  selected: I = [],
  activeTask: h = null,
  links: C = [],
  scales: r = es,
  columns: k = bn,
  start: p = null,
  end: V = null,
  lengthUnit: K = "day",
  durationUnit: $ = "day",
  cellWidth: w = 100,
  cellHeight: d = 38,
  scaleHeight: X = 36,
  readonly: W = !1,
  cellBorders: _ = "full",
  zoom: B = !1,
  baselines: b = !1,
  highlightTime: A = null,
  init: M = null,
  autoScale: Q = !0,
  unscheduledTasks: oe = !1,
  criticalPath: Z = null,
  schedule: fe = { type: "forward" },
  projectStart: q = null,
  projectEnd: ue = null,
  calendar: D = null,
  undo: f = !1,
  splitTasks: G = !1,
  multiTaskRows: ne = !1,
  marqueeSelect: he = !1,
  copyPaste: ie = !1,
  currentWeekHighlight: de = !1,
  currentWeekColor: ve = null,
  scrollToCurrentWeek: Ee = !1,
  allowTaskIntersection: Le = !0,
  ...De
}, Ae) {
  const be = re();
  be.current = De;
  const ee = v(() => new pn(Cn), []), x = v(() => ({ ...ft, ...it }), []), H = Ge(Xe.i18n), j = v(() => H ? H.extend(x, !0) : ot(x), [H, x]), F = v(() => j.getRaw().calendar, [j]), U = v(() => {
    let se = {
      zoom: Zn(B, F),
      scales: Xt(r, F),
      columns: Qn(k, F),
      links: yn(C),
      cellWidth: w
    };
    return se.zoom && (se = {
      ...se,
      ...kn(
        se.zoom,
        jn(F, j.getGroup("gantt")),
        se.scales,
        w
      )
    }), se;
  }, [B, r, k, C, w, F, j]), ke = re(null);
  ke.current !== o && (Rt(o, { durationUnit: $, splitTasks: G, calendar: D }), ke.current = o), ae(() => {
    Rt(o, { durationUnit: $, splitTasks: G, calendar: D });
  }, [o, $, D, G]);
  const le = v(() => {
    if (!ne) return null;
    const se = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Ce = (Re) => {
      Re.forEach((He) => {
        const _e = He.row ?? He.id;
        Me.set(He.id, _e), se.has(_e) || se.set(_e, []), se.get(_e).push(He.id), He.data && He.data.length > 0 && Ce(He.data);
      });
    };
    return Ce(o), { rowMap: se, taskRows: Me };
  }, [o, ne]), T = v(() => ee.in, [ee]), J = re(null);
  J.current === null && (J.current = new mn((se, Me) => {
    const Ce = "on" + Jn(se);
    be.current && be.current[Ce] && be.current[Ce](Me);
  }), T.setNext(J.current));
  const [me, ge] = pe(null), m = re(null);
  m.current = me;
  const ce = v(
    () => ({
      getState: ee.getState.bind(ee),
      getReactiveState: ee.getReactive.bind(ee),
      getStores: () => ({ data: ee }),
      exec: T.exec,
      setNext: (se) => (J.current = J.current.setNext(se), J.current),
      intercept: T.intercept.bind(T),
      on: T.on.bind(T),
      detach: T.detach.bind(T),
      getTask: ee.getTask.bind(ee),
      serialize: ee.serialize.bind(ee),
      getTable: (se) => se ? new Promise((Me) => setTimeout(() => Me(m.current), 1)) : m.current,
      getHistory: () => ee.getHistory()
    }),
    [ee, T]
  );
  _t(
    Ae,
    () => ({
      ...ce
    }),
    [ce]
  );
  const we = re(0);
  ae(() => {
    we.current ? ee.init({
      tasks: o,
      links: U.links,
      start: p,
      columns: U.columns,
      end: V,
      lengthUnit: K,
      cellWidth: U.cellWidth,
      cellHeight: d,
      scaleHeight: X,
      scales: U.scales,
      taskTypes: i,
      zoom: U.zoom,
      selected: I,
      activeTask: h,
      baselines: b,
      autoScale: Q,
      unscheduledTasks: oe,
      markers: s,
      durationUnit: $,
      criticalPath: Z,
      schedule: fe,
      projectStart: q,
      projectEnd: ue,
      calendar: D,
      undo: f,
      _weekStart: F.weekStart,
      splitTasks: G
    }) : M && M(ce), we.current++;
  }, [
    ce,
    M,
    o,
    U,
    p,
    V,
    K,
    d,
    X,
    i,
    I,
    h,
    b,
    Q,
    oe,
    s,
    $,
    Z,
    fe,
    q,
    ue,
    D,
    f,
    F,
    G,
    ee
  ]), we.current === 0 && ee.init({
    tasks: o,
    links: U.links,
    start: p,
    columns: U.columns,
    end: V,
    lengthUnit: K,
    cellWidth: U.cellWidth,
    cellHeight: d,
    scaleHeight: X,
    scales: U.scales,
    taskTypes: i,
    zoom: U.zoom,
    selected: I,
    activeTask: h,
    baselines: b,
    autoScale: Q,
    unscheduledTasks: oe,
    markers: s,
    durationUnit: $,
    criticalPath: Z,
    schedule: fe,
    projectStart: q,
    projectEnd: ue,
    calendar: D,
    undo: f,
    _weekStart: F.weekStart,
    splitTasks: G
  });
  const Y = v(() => {
    const se = /* @__PURE__ */ new Date(), Me = F?.weekStart ?? 0, Ce = new Date(Date.UTC(se.getUTCFullYear(), se.getUTCMonth(), se.getUTCDate())), He = (Ce.getUTCDay() - Me + 7) % 7;
    Ce.setUTCDate(Ce.getUTCDate() - He), Ce.setUTCHours(0, 0, 0, 0);
    const _e = new Date(Ce);
    return _e.setUTCDate(_e.getUTCDate() + 7), (l) => l >= Ce && l < _e;
  }, [F]), $e = v(() => (se, Me) => {
    let Ce = [];
    if (D)
      Me == "day" && !D.getDayHours(se) && Ce.push("wx-weekend"), Me == "hour" && !D.getDayHours(se) && Ce.push("wx-weekend");
    else if (A) {
      const Re = A(se, Me);
      Re && Ce.push(Re);
    }
    return de && (Me === "week" || Me === "day") && Y(se) && Ce.push("wx-current-week"), Ce.join(" ");
  }, [D, A, de, Y]);
  return /* @__PURE__ */ u(Xe.i18n.Provider, { value: j, children: /* @__PURE__ */ u(Ke.Provider, { value: ce, children: /* @__PURE__ */ u(
    qn,
    {
      taskTemplate: n,
      readonly: W,
      cellBorders: _,
      highlightTime: $e,
      onTableAPIChange: ge,
      multiTaskRows: ne,
      rowMapping: le,
      marqueeSelect: he,
      copyPaste: ie,
      scrollToCurrentWeek: Ee,
      currentWeekColor: ve,
      allowTaskIntersection: Le
    }
  ) }) });
});
function $s({ api: t = null, items: n = [] }) {
  const s = Ge(Xe.i18n), i = v(() => s || ot(it), [s]), o = v(() => i.getGroup("gantt"), [i]), I = Fe(t, "_selected"), h = Fe(t, "undo"), C = Fe(t, "history"), r = Fe(t, "splitTasks"), k = ["undo", "redo"], p = v(() => {
    const K = Et({ undo: !0, splitTasks: !0 });
    return (n.length ? n : Et({
      undo: h,
      splitTasks: r
    })).map((w) => {
      let d = { ...w, disabled: !1 };
      return d.handler = Ut(K, d.id) ? (X) => Gt(t, X.id, null, o) : d.handler, d.text && (d.text = o(d.text)), d.menuText && (d.menuText = o(d.menuText)), d;
    });
  }, [n, t, o, h, r]), V = v(() => {
    const K = [];
    return p.forEach(($) => {
      const w = $.id;
      if (w === "add-task")
        K.push($);
      else if (k.includes(w))
        k.includes(w) && K.push({
          ...$,
          disabled: $.isDisabled(C)
        });
      else {
        if (!I?.length || !t) return;
        K.push({
          ...$,
          disabled: $.isDisabled && I.some((d) => $.isDisabled(d, t.getState()))
        });
      }
    }), K.filter(($, w) => {
      if (t && $.isHidden)
        return !I.some((d) => $.isHidden(d, t.getState()));
      if ($.comp === "separator") {
        const d = K[w + 1];
        if (!d || d.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, I, C, p]);
  return s ? /* @__PURE__ */ u(Nt, { items: V }) : /* @__PURE__ */ u(Xe.i18n.Provider, { value: i, children: /* @__PURE__ */ u(Nt, { items: V }) });
}
const Ms = Wt(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: o = null,
  at: I = "point",
  children: h,
  onClick: C,
  css: r
}, k) {
  const p = re(null), V = re(null), K = Ge(Xe.i18n), $ = v(() => K || ot({ ...it, ...ft }), [K]), w = v(() => $.getGroup("gantt"), [$]), d = Fe(s, "taskTypes"), X = Fe(s, "selected"), W = Fe(s, "_selected"), _ = Fe(s, "splitTasks"), B = v(() => St({ splitTasks: !0 }), []);
  ae(() => {
    s && (s.on("scroll-chart", () => {
      p.current && p.current.show && p.current.show();
    }), s.on("drag-task", () => {
      p.current && p.current.show && p.current.show();
    }));
  }, [s]);
  function b(D) {
    return D.map((f) => (f = { ...f }, f.text && (f.text = w(f.text)), f.subtext && (f.subtext = w(f.subtext)), f.data && (f.data = b(f.data)), f));
  }
  function A() {
    const D = n.length ? n : St({ splitTasks: _ }), f = D.find((G) => G.id === "convert-task");
    return f && (f.data = [], (d || []).forEach((G) => {
      f.data.push(f.dataFactory(G));
    })), b(D);
  }
  const M = v(() => A(), [s, n, d, _, w]), Q = v(
    () => W && W.length ? W : [],
    [W]
  ), oe = N(
    (D, f) => {
      let G = D ? s?.getTask(D) : null;
      if (i) {
        const ne = i(D, f);
        G = ne === !0 ? G : ne;
      }
      if (G) {
        const ne = Be(f.target, "data-segment");
        ne !== null ? V.current = { id: G.id, segmentIndex: ne } : V.current = G.id, (!Array.isArray(X) || !X.includes(G.id)) && s && s.exec && s.exec("select-task", { id: G.id });
      }
      return G;
    },
    [s, i, X]
  ), Z = N(
    (D) => {
      const f = D.action;
      f && (Ut(B, f.id) && Gt(s, f.id, V.current, w), C && C(D));
    },
    [s, w, C, B]
  ), fe = N(
    (D, f) => {
      const G = Q.length ? Q : f ? [f] : [];
      let ne = o ? G.every((he) => o(D, he)) : !0;
      if (ne && (D.isHidden && (ne = !G.some(
        (he) => D.isHidden(he, s.getState(), V.current)
      )), D.isDisabled)) {
        const he = G.some(
          (ie) => D.isDisabled(ie, s.getState(), V.current)
        );
        D.disabled = he;
      }
      return ne;
    },
    [o, Q, s]
  );
  _t(k, () => ({
    show: (D, f) => {
      p.current && p.current.show && p.current.show(D, f);
    }
  }));
  const q = N((D) => {
    p.current && p.current.show && p.current.show(D);
  }, []), ue = /* @__PURE__ */ Pe(Je, { children: [
    /* @__PURE__ */ u(
      Rn,
      {
        filter: fe,
        options: M,
        dataKey: "id",
        resolver: oe,
        onClick: Z,
        at: I,
        ref: p,
        css: r
      }
    ),
    /* @__PURE__ */ u("span", { onContextMenu: q, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!K && Xe.i18n?.Provider) {
    const D = Xe.i18n.Provider;
    return /* @__PURE__ */ u(D, { value: $, children: ue });
  }
  return ue;
});
function ts({ api: t, autoSave: n, onLinksChange: s }) {
  const o = Ge(Xe.i18n).getGroup("gantt"), I = O(t, "activeTask"), h = O(t, "_activeTask"), C = O(t, "_links"), r = O(t, "schedule"), k = O(t, "unscheduledTasks"), [p, V] = pe();
  function K() {
    if (I) {
      const X = C.filter((_) => _.target == I).map((_) => ({ link: _, task: t.getTask(_.source) })), W = C.filter((_) => _.source == I).map((_) => ({ link: _, task: t.getTask(_.target) }));
      return [
        { title: o("Predecessors"), data: X },
        { title: o("Successors"), data: W }
      ];
    }
  }
  ae(() => {
    V(K());
  }, [I, C]);
  const $ = v(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function w(X) {
    n ? t.exec("delete-link", { id: X }) : (V(
      (W) => (W || []).map((_) => ({
        ..._,
        data: _.data.filter((B) => B.link.id !== X)
      }))
    ), s && s({
      id: X,
      action: "delete-link",
      data: { id: X }
    }));
  }
  function d(X, W) {
    n ? t.exec("update-link", {
      id: X,
      link: W
    }) : (V(
      (_) => (_ || []).map((B) => ({
        ...B,
        data: B.data.map(
          (b) => b.link.id === X ? { ...b, link: { ...b.link, ...W } } : b
        )
      }))
    ), s && s({
      id: X,
      action: "update-link",
      data: {
        id: X,
        link: W
      }
    }));
  }
  return /* @__PURE__ */ u(Je, { children: (p || []).map(
    (X, W) => X.data.length ? /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ u(nn, { label: X.title, position: "top", children: /* @__PURE__ */ u("table", { children: /* @__PURE__ */ u("tbody", { children: X.data.map((_) => /* @__PURE__ */ Pe("tr", { children: [
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-task-name", children: _.task.text || "" }) }),
      r?.auto && _.link.type === "e2s" ? /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ u(
        sn,
        {
          type: "number",
          placeholder: o("Lag"),
          value: _.link.lag,
          disabled: k && h?.unscheduled,
          onChange: (B) => {
            B.input || d(_.link.id, { lag: B.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ u(
        rn,
        {
          value: _.link.type,
          placeholder: o("Select link type"),
          options: $,
          onChange: (B) => d(_.link.id, { type: B.value }),
          children: ({ option: B }) => B.label
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
function ns(t) {
  const { value: n, time: s, format: i, onchange: o, onChange: I, ...h } = t, C = I ?? o;
  function r(k) {
    const p = new Date(k.value);
    p.setUTCHours(n.getUTCHours()), p.setUTCMinutes(n.getUTCMinutes()), C && C({ value: p });
  }
  return /* @__PURE__ */ Pe("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ u(
      on,
      {
        ...h,
        value: n,
        onChange: r,
        format: i,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ u(ln, { value: n, onChange: C, format: i }) : null
  ] });
}
je("select", an);
je("date", ns);
je("twostate", un);
je("slider", dn);
je("counter", fn);
je("links", ts);
function Ds({
  api: t,
  items: n = [],
  css: s = "",
  layout: i = "default",
  readonly: o = !1,
  placement: I = "sidebar",
  bottomBar: h = !0,
  topBar: C = !0,
  autoSave: r = !0,
  focus: k = !1,
  hotkeys: p = {}
}) {
  const V = Ge(Xe.i18n), K = v(() => V || ot({ ...it, ...ft }), [V]), $ = v(() => K.getGroup("gantt"), [K]), w = K.getRaw(), d = v(() => {
    const m = w.gantt?.dateFormat || w.formats?.dateFormat;
    return rt(m, w.calendar);
  }, [w]), X = v(() => {
    if (C === !0 && !o) {
      const m = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: $("Delete"),
          id: "delete"
        }
      ];
      return r ? { items: m } : {
        items: [
          ...m,
          {
            comp: "button",
            type: "primary",
            text: $("Save"),
            id: "save"
          }
        ]
      };
    }
    return C;
  }, [C, o, r, $]), [W, _] = pe(!1), B = v(
    () => W ? "wx-full-screen" : "",
    [W]
  ), b = N((m) => {
    _(m);
  }, []);
  ae(() => {
    const m = Yt(b);
    return m.observe(), () => {
      m.disconnect();
    };
  }, [b]);
  const A = O(t, "_activeTask"), M = O(t, "activeTask"), Q = O(t, "unscheduledTasks"), oe = O(t, "links"), Z = O(t, "splitTasks"), fe = v(
    () => Z && M?.segmentIndex,
    [Z, M]
  ), q = v(
    () => fe || fe === 0,
    [fe]
  ), ue = v(
    () => vn({ unscheduledTasks: Q }),
    [Q]
  ), D = O(t, "undo"), [f, G] = pe({}), [ne, he] = pe(null), [ie, de] = pe(), [ve, Ee] = pe(null), Le = O(t, "taskTypes"), De = v(() => {
    if (!A) return null;
    let m;
    if (q && A.segments ? m = { ...A.segments[fe] } : m = { ...A }, o) {
      let ce = { parent: m.parent };
      return ue.forEach(({ key: we, comp: Y }) => {
        if (Y !== "links") {
          const $e = m[we];
          Y === "date" && $e instanceof Date ? ce[we] = d($e) : Y === "slider" && we === "progress" ? ce[we] = `${$e}%` : ce[we] = $e;
        }
      }), ce;
    }
    return m || null;
  }, [A, q, fe, o, ue, d]);
  ae(() => {
    de(De);
  }, [De]), ae(() => {
    G({}), Ee(null), he(null);
  }, [M]);
  function Ae(m, ce) {
    return m.map((we) => {
      const Y = { ...we };
      if (we.config && (Y.config = { ...Y.config }), Y.comp === "links" && t && (Y.api = t, Y.autoSave = r, Y.onLinksChange = x), Y.comp === "select" && Y.key === "type") {
        const $e = Y.options ?? (Le || []);
        Y.options = $e.map((se) => ({
          ...se,
          label: $(se.label)
        }));
      }
      return Y.comp === "slider" && Y.key === "progress" && (Y.labelTemplate = ($e) => `${$(Y.label)} ${$e}%`), Y.label && (Y.label = $(Y.label)), Y.config?.placeholder && (Y.config.placeholder = $(Y.config.placeholder)), ce && (Y.isDisabled && Y.isDisabled(ce, t.getState()) ? Y.disabled = !0 : delete Y.disabled), Y;
    });
  }
  const be = v(() => {
    let m = n.length ? n : ue;
    return m = Ae(m, ie), ie ? m.filter(
      (ce) => !ce.isHidden || !ce.isHidden(ie, t.getState())
    ) : m;
  }, [n, ue, ie, Le, $, t, r]), ee = v(
    () => be.map((m) => m.key),
    [be]
  );
  function x({ id: m, action: ce, data: we }) {
    G((Y) => ({
      ...Y,
      [m]: { action: ce, data: we }
    }));
  }
  const H = N(() => {
    for (let m in f)
      if (oe.byId(m)) {
        const { action: ce, data: we } = f[m];
        t.exec(ce, we);
      }
  }, [t, f, oe]), j = N(() => {
    const m = M?.id || M;
    if (q) {
      if (A?.segments) {
        const ce = A.segments.filter(
          (we, Y) => Y !== fe
        );
        t.exec("update-task", {
          id: m,
          task: { segments: ce }
        });
      }
    } else
      t.exec("delete-task", { id: m });
  }, [t, M, q, A, fe]), F = N(() => {
    t.exec("show-editor", { id: null });
  }, [t]), U = N(
    (m) => {
      const { item: ce, changes: we } = m;
      ce.id === "delete" && j(), ce.id === "save" && (we.length ? F() : H()), ce.comp && F();
    },
    [t, M, r, H, j, F]
  ), ke = N(
    (m, ce, we) => (Q && m.type === "summary" && (m.unscheduled = !1), zt(m, t.getState(), ce), we || he(!1), m),
    [Q, t]
  ), le = N(
    (m) => {
      m = {
        ...m,
        unscheduled: Q && m.unscheduled && m.type !== "summary"
      }, delete m.links, delete m.data, (ee.indexOf("duration") === -1 || m.segments && !m.duration) && delete m.duration;
      const ce = {
        id: M?.id || M,
        task: m,
        ...q && { segmentIndex: fe }
      };
      r && ne && (ce.inProgress = ne), t.exec("update-task", ce), r || H();
    },
    [
      t,
      M,
      Q,
      r,
      H,
      ee,
      q,
      fe,
      ne
    ]
  ), T = N(
    (m) => {
      let { update: ce, key: we, input: Y } = m;
      if (Y && he(!0), m.update = ke({ ...ce }, we, Y), !r) de(m.update);
      else if (!ve && !Y) {
        const $e = be.find((Ce) => Ce.key === we), se = ce[we];
        (!$e.validation || $e.validation(se)) && (!$e.required || se) && le(m.update);
      }
    },
    [r, ke, ve, be, le]
  ), J = N(
    (m) => {
      r || le(m.values);
    },
    [r, le]
  ), me = N((m) => {
    Ee(m.errors);
  }, []), ge = v(
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
  return De ? /* @__PURE__ */ u(cn, { children: /* @__PURE__ */ u(
    En,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${B} ${s}`,
      items: be,
      values: De,
      topBar: X,
      bottomBar: h,
      placement: I,
      layout: i,
      readonly: o,
      autoSave: r,
      focus: k,
      onAction: U,
      onSave: J,
      onValidation: me,
      onChange: T,
      hotkeys: p && { ...ge, ...p }
    }
  ) }) : null;
}
const Rs = ({ children: t, columns: n = null, api: s }) => {
  const [i, o] = pe(null);
  return ae(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ u(Mn, { api: i, columns: n, children: t });
};
function Es(t) {
  const { api: n, content: s, children: i } = t, o = re(null), I = re(null), [h, C] = pe({}), [r, k] = pe(null), [p, V] = pe({});
  function K(b) {
    for (; b; ) {
      if (b.getAttribute) {
        const A = b.getAttribute("data-tooltip-id"), M = b.getAttribute("data-tooltip-at"), Q = b.getAttribute("data-tooltip");
        if (A || Q) return { id: A, tooltip: Q, target: b, at: M };
      }
      b = b.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ae(() => {
    const b = I.current;
    if (b && p && (p.text || s)) {
      const A = b.getBoundingClientRect();
      let M = !1, Q = p.left, oe = p.top;
      A.right >= h.right && (Q = h.width - A.width - 5, M = !0), A.bottom >= h.bottom && (oe = p.top - (A.bottom - h.bottom + 2), M = !0), M && V((Z) => Z && { ...Z, left: Q, top: oe });
    }
  }, [p, h, s]);
  const $ = re(null), w = 300, d = (b) => {
    clearTimeout($.current), $.current = setTimeout(() => {
      b();
    }, w);
  };
  function X(b) {
    let { id: A, tooltip: M, target: Q, at: oe } = K(b.target);
    if (V(null), k(null), !M)
      if (A)
        M = _(A);
      else {
        clearTimeout($.current);
        return;
      }
    const Z = b.clientX;
    d(() => {
      A && k(W(B(A)));
      const fe = Q.getBoundingClientRect(), q = o.current, ue = q ? q.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let D, f;
      oe === "left" ? (D = fe.top + 5 - ue.top, f = fe.right + 5 - ue.left) : (D = fe.top + fe.height - ue.top, f = Z - ue.left), C(ue), V({ top: D, left: f, text: M });
    });
  }
  function W(b) {
    return n?.getTask(B(b)) || null;
  }
  function _(b) {
    return W(b)?.text || "";
  }
  function B(b) {
    const A = parseInt(b);
    return isNaN(A) ? b : A;
  }
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: X,
      children: [
        p && (p.text || s) ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: I,
            style: { top: `${p.top}px`, left: `${p.left}px` },
            children: s ? /* @__PURE__ */ u(s, { data: r }) : p.text ? /* @__PURE__ */ u("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: p.text }) : null
          }
        ) : null,
        i
      ]
    }
  );
}
function Ss({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u($t, { fonts: t, children: n() }) : /* @__PURE__ */ u($t, { fonts: t });
}
function Ns({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(Mt, { fonts: t, children: n }) : /* @__PURE__ */ u(Mt, { fonts: t });
}
function Ls({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(Dt, { fonts: t, children: n }) : /* @__PURE__ */ u(Dt, { fonts: t });
}
export {
  Ms as ContextMenu,
  Ds as Editor,
  Cs as Gantt,
  Rs as HeaderMenu,
  Ss as Material,
  $s as Toolbar,
  Es as Tooltip,
  Ns as Willow,
  Ls as WillowDark,
  As as defaultColumns,
  Hs as defaultEditorItems,
  Ws as defaultMenuOptions,
  _s as defaultTaskTypes,
  zs as defaultToolbarButtons,
  Gs as getEditorItems,
  Us as getMenuOptions,
  Os as getToolbarButtons,
  Fs as registerEditorItem,
  Ys as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
