import { jsxs as Pe, jsx as u, Fragment as Je } from "react/jsx-runtime";
import { createContext as Jt, useMemo as C, useState as ge, useContext as ze, useCallback as _, useRef as le, useEffect as ce, Fragment as en, forwardRef as Pt, useImperativeHandle as Ht } from "react";
import { context as Ue, Button as Tt, Field as tn, Text as nn, Combo as sn, DatePicker as rn, TimePicker as on, Locale as ln, RichSelect as cn, TwoState as an, Slider as un, Counter as dn, Material as vt, Willow as Ct, WillowDark as $t } from "@svar-ui/react-core";
import { locate as Ge, locateID as qe, locateAttr as fn, dateToString as rt, locale as ot } from "@svar-ui/lib-dom";
import { en as lt } from "@svar-ui/gantt-locales";
import { en as dt } from "@svar-ui/core-locales";
import { EventBusRouter as hn } from "@svar-ui/lib-state";
import { prepareEditTask as Wt, grid as gn, extendDragOptions as mn, isSegmentMoveAllowed as wn, DataStore as xn, normalizeLinks as pn, normalizeZoom as yn, defaultColumns as kn, parseTaskDates as Mt, defaultTaskTypes as bn, getToolbarButtons as St, handleAction as At, isHandledAction as Ot, getMenuOptions as Dt, getEditorItems as Tn } from "@svar-ui/gantt-store";
import { defaultColumns as _s, defaultEditorItems as Ps, defaultMenuOptions as Hs, defaultTaskTypes as Ws, defaultToolbarButtons as As, getEditorItems as Os, getMenuOptions as zs, getToolbarButtons as Gs, registerScaleUnit as Us } from "@svar-ui/gantt-store";
import { useWritableProp as ut, useStore as Y, useStoreWithCounter as st, writable as vn, useStoreLater as Ye } from "@svar-ui/lib-react";
import { hotkeys as zt } from "@svar-ui/grid-store";
import { Grid as Cn, HeaderMenu as $n } from "@svar-ui/react-grid";
import { flushSync as Mn } from "react-dom";
import { Toolbar as Rt } from "@svar-ui/react-toolbar";
import { ContextMenu as Sn } from "@svar-ui/react-menu";
import { Editor as Dn, registerEditorItem as Be } from "@svar-ui/react-editor";
import { registerEditorItem as Xs } from "@svar-ui/react-editor";
const Xe = Jt(null);
function Ke(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Rn(t, n, s) {
  const l = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: l.top - o.top,
    left: l.left - o.left,
    dt: l.bottom - s.clientY,
    db: s.clientY - l.top
  };
}
function Et(t) {
  return t && t.getAttribute("data-context-id");
}
const It = 5;
function En(t, n) {
  let s, l, o, W, h, v, r, $, y;
  function K(M) {
    W = M.clientX, h = M.clientY, v = {
      ...Rn(s, t, M),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function F(M) {
    s = Ge(M), Et(s) && (o = Ke(s), y = setTimeout(() => {
      $ = !0, n && n.touchStart && n.touchStart(), K(M.touches[0]);
    }, 500), t.addEventListener("touchmove", N), t.addEventListener("contextmenu", S), window.addEventListener("touchend", Z));
  }
  function S(M) {
    if ($ || y)
      return M.preventDefault(), !1;
  }
  function k(M) {
    M.which === 1 && (s = Ge(M), Et(s) && (o = Ke(s), t.addEventListener("mousemove", j), window.addEventListener("mouseup", b), K(M)));
  }
  function d(M) {
    t.removeEventListener("mousemove", j), t.removeEventListener("touchmove", N), document.body.removeEventListener("mouseup", b), document.body.removeEventListener("touchend", Z), document.body.style.userSelect = "", M && (t.removeEventListener("mousedown", k), t.removeEventListener("touchstart", F));
  }
  function P(M) {
    const J = M.clientX - W, ee = M.clientY - h;
    if (!l) {
      if (Math.abs(J) < It && Math.abs(ee) < It || n && n.start && n.start({ id: o, e: M }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = v.left + "px", l.style.top = v.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const te = Math.round(Math.max(0, v.top + ee));
      if (n && n.move && n.move({ id: o, top: te, detail: r }) === !1)
        return;
      const ne = n.getTask(o), se = ne.$y;
      if (!v.start && v.y == se) return A();
      v.start = !0, v.y = ne.$y - 4, l.style.top = te + "px";
      const re = document.elementFromPoint(
        M.clientX,
        M.clientY
      ), E = Ge(re);
      if (E && E !== s) {
        const D = Ke(E), x = E.getBoundingClientRect(), he = x.top + x.height / 2, Q = M.clientY + v.db > he && E.nextElementSibling !== s, de = M.clientY - v.dt < he && E.previousElementSibling !== s;
        r?.after == D || r?.before == D ? r = null : Q ? r = { id: o, after: D } : de && (r = { id: o, before: D });
      }
    }
  }
  function j(M) {
    P(M);
  }
  function N(M) {
    $ ? (M.preventDefault(), P(M.touches[0])) : y && (clearTimeout(y), y = null);
  }
  function Z() {
    $ = null, y && (clearTimeout(y), y = null), A();
  }
  function b() {
    A();
  }
  function A() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: o, top: v.top })), o = s = l = v = r = null, d();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", k), t.addEventListener("touchstart", F), {
    destroy() {
      d(!0);
    }
  };
}
function In({ row: t, column: n }) {
  function s(o, W) {
    return {
      justifyContent: W.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ Pe("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ u(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ u("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ u("div", { className: "wx-pqc08MHU wx-text", children: l ? /* @__PURE__ */ u(l, { row: t, column: n }) : t.text })
  ] });
}
function Nt({ column: t, cell: n }) {
  const s = C(() => t.id, [t?.id]);
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
    width: l = 0,
    display: o = "all",
    columnWidth: W = 0,
    onTableAPIChange: h,
    multiTaskRows: v = !1,
    rowMapping: r = null
  } = t, [$, y] = ut(W), [K, F] = ge(), S = ze(Ue.i18n), k = C(() => S.getGroup("gantt"), [S]), d = ze(Xe), P = Y(d, "scrollTop"), j = Y(d, "cellHeight"), N = Y(d, "_scrollTask"), Z = Y(d, "_selected"), b = Y(d, "area"), A = Y(d, "_tasks"), M = Y(d, "_scales"), J = Y(d, "columns"), ee = Y(d, "_sort"), te = Y(d, "calendar"), ne = Y(d, "durationUnit"), se = Y(d, "splitTasks"), [re, E] = ge(null), D = C(() => !A || !b ? [] : v && r ? A : A.slice(b.start, b.end), [A, b, v, r]), x = _(
    (i, p) => {
      if (p === "add-task")
        d.exec(p, {
          target: i,
          task: { text: k("New Task") },
          mode: "child",
          show: !0
        });
      else if (p === "open-task") {
        const I = D.find((U) => U.id === i);
        (I?.data || I?.lazy) && d.exec(p, { id: i, mode: !I.open });
      }
    },
    [D]
  ), he = _(
    (i) => {
      const p = qe(i), I = i.target.dataset.action;
      I && i.preventDefault(), p ? I === "add-task" || I === "open-task" ? x(p, I) : d.exec("select-task", {
        id: p,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : I === "add-task" && x(null, I);
    },
    [d, x]
  ), Q = le(null), de = le(null), [ie, me] = ge(0), [Ne, Ie] = ge(!1);
  ce(() => {
    const i = de.current;
    if (!i || typeof ResizeObserver > "u") return;
    const p = () => me(i.clientWidth);
    p();
    const I = new ResizeObserver(p);
    return I.observe(i), () => I.disconnect();
  }, []);
  const Le = le(null), Re = _(
    (i) => {
      const p = i.id, { before: I, after: U } = i, pe = i.onMove;
      let fe = I || U, Ee = I ? "before" : "after";
      if (pe) {
        if (Ee === "after") {
          const Oe = d.getTask(fe);
          Oe.data?.length && Oe.open && (Ee = "before", fe = Oe.data[0].id);
        }
        Le.current = { id: p, [Ee]: fe };
      } else Le.current = null;
      d.exec("move-task", {
        id: p,
        mode: Ee,
        target: fe,
        inProgress: pe
      });
    },
    [d]
  ), be = C(() => v && r ? 0 : b?.from ?? 0, [b, v, r]), we = C(() => M?.height ?? 0, [M]), f = C(() => !s && o !== "grid" ? ($ ?? 0) > (l ?? 0) : ($ ?? 0) > (ie ?? 0), [s, o, $, l, ie]), O = C(() => {
    const i = {};
    return f && o === "all" || o === "grid" && f ? i.width = $ : o === "grid" && (i.width = "100%"), i;
  }, [f, o, $]), q = C(() => re && !D.find((i) => i.id === re.id) ? [...D, re] : D, [D, re]), z = C(() => {
    if (!v || !r) return q;
    const i = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set();
    return q.forEach((I) => {
      const U = r.taskRows.get(I.id) ?? I.id;
      p.has(U) || (i.set(U, {
        ...I,
        $rowTasks: r.rowMap.get(U) || [I.id]
      }), p.add(U));
    }), Array.from(i.values());
  }, [q, v, r]), G = C(() => {
    let i = (J || []).map((U) => {
      U = { ...U };
      const pe = U.header;
      if (typeof pe == "object") {
        const fe = pe.text && k(pe.text);
        U.header = { ...pe, text: fe };
      } else U.header = k(pe);
      return U;
    });
    const p = i.findIndex((U) => U.id === "text"), I = i.findIndex((U) => U.id === "add-task");
    if (p !== -1 && (i[p].cell && (i[p]._cell = i[p].cell), i[p].cell = In), I !== -1) {
      i[I].cell = i[I].cell || Nt;
      const U = i[I].header;
      if (typeof U != "object" && (i[I].header = { text: U }), i[I].header.cell = U.cell || Nt, n)
        i.splice(I, 1);
      else if (s) {
        const [pe] = i.splice(I, 1);
        i.unshift(pe);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [J, k, n, s]), ye = C(() => o === "all" ? `${l}px` : o === "grid" ? "calc(100% - 4px)" : G.find((i) => i.id === "add-task") ? "50px" : "0", [o, l, G]), Ce = C(() => {
    if (z && ee?.length) {
      const i = {};
      return ee.forEach(({ key: p, order: I }, U) => {
        i[p] = {
          order: I,
          ...ee.length > 1 && { index: U }
        };
      }), i;
    }
    return {};
  }, [z, ee]), m = _(() => G.some((i) => i.flexgrow && !i.hidden), []), V = C(() => m(), [m, Ne]), ue = C(() => {
    let i = o === "chart" ? G.filter((I) => I.id === "add-task") : G;
    const p = o === "all" ? l : ie;
    if (!V) {
      let I = $, U = !1;
      if (G.some((pe) => pe.$width)) {
        let pe = 0;
        I = G.reduce((fe, Ee) => (Ee.hidden || (pe += Ee.width, fe += Ee.$width || Ee.width), fe), 0), pe > I && I > p && (U = !0);
      }
      if (U || I < p) {
        let pe = 1;
        return U || (pe = (p - 50) / (I - 50 || 1)), i.map((fe) => (fe.id !== "add-task" && !fe.hidden && (fe.$width || (fe.$width = fe.width), fe.width = fe.$width * pe), fe));
      }
    }
    return i;
  }, [o, G, V, $, l, ie]), ve = _(
    (i) => {
      if (!m()) {
        const p = ue.reduce((I, U) => (i && U.$width && (U.$width = U.width), I + (U.hidden ? 0 : U.width)), 0);
        p !== $ && y(p);
      }
      Ie(!0), Ie(!1);
    },
    [m, ue, $, y]
  ), g = _(() => {
    G.filter((p) => p.flexgrow && !p.hidden).length === 1 && G.forEach((p) => {
      p.$width && !p.flexgrow && !p.hidden && (p.width = p.$width);
    });
  }, []), oe = _(
    (i) => {
      if (!n) {
        const p = qe(i), I = fn(i, "data-col-id");
        !(I && G.find((pe) => pe.id == I))?.editor && p && d.exec("show-editor", { id: p });
      }
    },
    [d, n]
    // cols is defined later; relies on latest value at call time
  ), xe = C(
    () => Array.isArray(Z) ? Z.map((i) => i.id) : [],
    [Z]
  ), X = le(be);
  X.current = be, ce(() => {
    const i = (I) => {
      if (Q.current) {
        const U = Q.current.querySelector(".wx-body");
        U && (U.style.top = -((I ?? 0) - (X.current ?? 0)) + "px");
      }
      de.current && (de.current.scrollTop = 0);
    };
    return i(P), d.on("scroll-chart", ({ top: I }) => {
      I !== void 0 && i(I);
    });
  }, [d, P]), ce(() => {
    if (Q.current) {
      const i = Q.current.querySelector(".wx-body");
      i && (i.style.top = -((P ?? 0) - (be ?? 0)) + "px");
    }
  }, [be]), ce(() => {
    const i = Q.current;
    if (!i) return;
    const p = i.querySelector(".wx-table-box .wx-body");
    if (!p || typeof ResizeObserver > "u") return;
    const I = new ResizeObserver(() => {
      if (Q.current) {
        const U = Q.current.querySelector(".wx-body");
        U && (U.style.top = -((P ?? 0) - (X.current ?? 0)) + "px");
      }
    });
    return I.observe(p), () => {
      I.disconnect();
    };
  }, [ue, O, o, ye, z, P]), ce(() => {
    if (!N || !K) return;
    const { id: i } = N, p = K.getState().focusCell;
    p && p.row !== i && Q.current && Q.current.contains(document.activeElement) && K.exec("focus-cell", {
      row: i,
      column: p.column
    });
  }, [N, K]);
  const $e = _(
    ({ id: i }) => {
      if (n) return !1;
      d.getTask(i).open && d.exec("open-task", { id: i, mode: !1 });
      const p = d.getState()._tasks.find((I) => I.id === i);
      if (E(p || null), !p) return !1;
    },
    [d, n]
  ), B = _(
    ({ id: i, top: p }) => {
      Le.current ? Re({ ...Le.current, onMove: !1 }) : d.exec("drag-task", {
        id: i,
        top: p + (be ?? 0),
        inProgress: !1
      }), E(null);
    },
    [d, Re, be]
  ), Me = _(
    ({ id: i, top: p, detail: I }) => {
      I && Re({ ...I, onMove: !0 }), d.exec("drag-task", {
        id: i,
        top: p + (be ?? 0),
        inProgress: !0
      });
    },
    [d, Re, be]
  );
  ce(() => {
    const i = Q.current;
    return i ? En(i, {
      start: $e,
      end: B,
      move: Me,
      getTask: d.getTask
    }).destroy : void 0;
  }, [d, $e, B, Me]);
  const Te = _(
    (i) => {
      const { key: p, isInput: I } = i;
      if (!I && (p === "arrowup" || p === "arrowdown"))
        return i.eventSource = "grid", d.exec("hotkey", i), !1;
      if (p === "enter") {
        const U = K?.getState().focusCell;
        if (U) {
          const { row: pe, column: fe } = U;
          fe === "add-task" ? x(pe, "add-task") : fe === "text" && x(pe, "open-task");
        }
      }
    },
    [d, x, K]
  ), Se = le(null), We = () => {
    Se.current = {
      setTableAPI: F,
      handleHotkey: Te,
      sortVal: ee,
      api: d,
      adjustColumns: g,
      setColumnWidth: ve,
      tasks: D,
      calendarVal: te,
      durationUnitVal: ne,
      splitTasksVal: se,
      onTableAPIChange: h
    };
  };
  We(), ce(() => {
    We();
  }, [
    F,
    Te,
    ee,
    d,
    g,
    ve,
    D,
    te,
    ne,
    se,
    h
  ]);
  const Ae = _((i) => {
    F(i), i.intercept("hotkey", (p) => Se.current.handleHotkey(p)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (p) => {
      const I = Se.current.sortVal, { key: U, add: pe } = p, fe = I ? I.find((Oe) => Oe.key === U) : null;
      let Ee = "asc";
      return fe && (Ee = !fe || fe.order === "asc" ? "desc" : "asc"), d.exec("sort-tasks", {
        key: U,
        order: Ee,
        add: pe
      }), !1;
    }), i.on("resize-column", () => {
      Se.current.setColumnWidth(!0);
    }), i.on("hide-column", (p) => {
      p.mode || Se.current.adjustColumns(), Se.current.setColumnWidth();
    }), i.intercept("update-cell", (p) => {
      const { id: I, column: U, value: pe } = p, fe = Se.current.tasks.find((Ee) => Ee.id === I);
      if (fe) {
        const Ee = { ...fe };
        let Oe = pe;
        Oe && !isNaN(Oe) && !(Oe instanceof Date) && (Oe *= 1), Ee[U] = Oe, Wt(
          Ee,
          {
            calendar: Se.current.calendarVal,
            durationUnit: Se.current.durationUnitVal,
            splitTasks: Se.current.splitTasksVal
          },
          U
        ), d.exec("update-task", {
          id: I,
          task: Ee
        });
      }
      return !1;
    }), h && h(i);
  }, []);
  return /* @__PURE__ */ u(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ye}` },
      ref: de,
      children: /* @__PURE__ */ u(
        "div",
        {
          ref: Q,
          style: O,
          className: "wx-rHj6070p wx-table",
          onClick: he,
          onDoubleClick: oe,
          children: /* @__PURE__ */ u(
            Cn,
            {
              init: Ae,
              sizes: {
                rowHeight: j,
                headerHeight: (we ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: z,
              columns: ue,
              selectedRows: [...xe],
              sortMarks: Ce
            }
          )
        }
      )
    }
  );
}
function Ln({ borders: t = "" }) {
  const n = ze(Xe), s = Y(n, "cellWidth"), l = Y(n, "cellHeight"), o = le(null), [W, h] = ge("#e4e4e4");
  ce(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const r = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      h(r ? r.substring(r.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const v = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${gn(s, l, W, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ u("div", { ref: o, style: v });
}
function _n({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = ze(Xe), o = Y(l, "_links"), W = Y(l, "criticalPath"), h = le(null), v = _(
    (r) => {
      const $ = r?.target?.classList;
      !$?.contains("wx-line") && !$?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return ce(() => {
    if (!s && n && h.current) {
      const r = ($) => {
        h.current && !h.current.contains($.target) && v($);
      };
      return document.addEventListener("click", r), () => {
        document.removeEventListener("click", r);
      };
    }
  }, [s, n, v]), /* @__PURE__ */ Pe("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((r) => {
      const $ = "wx-dkx3NwEn wx-line" + (W && r.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ u(
        "polyline",
        {
          className: $,
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
  function l(W) {
    const h = n.segments[W];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function o(W) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, v = n.segments;
    let r = 0, $ = 0, y = null;
    do {
      const K = v[$];
      $ === W && (r > h ? y = 0 : y = Math.min((h - r) / K.duration, 1) * 100), r += K.duration, $++;
    } while (y === null && $ < v.length);
    return y || 0;
  }
  return /* @__PURE__ */ u("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((W, h) => /* @__PURE__ */ Pe(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": h,
      style: l(h),
      children: [
        n.progress ? /* @__PURE__ */ u("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ u(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(h)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ u("div", { className: "wx-content", children: W.text || "" })
      ]
    },
    h
  )) });
}
let Ze = [], at = null, Lt = null;
const _t = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: l, lengthUnit: o } = n, W = 864e5, h = o === "week" ? 7 : o === "month" ? 30 : o === "quarter" ? 91 : o === "year" ? 365 : 1, v = Math.floor(t / l), r = new Date(s.getTime() + v * h * W);
  return r.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: v,
    scalesStart: s.toISOString(),
    result: r.toISOString()
  }), r;
}, Hn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: l } = s, h = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / h);
}, Wn = (t, n, s) => {
  if (!s || !t)
    return console.log("[addCells] early return:", { scales: !!s, date: t?.toISOString?.() }), t;
  const { lengthUnit: l } = s, h = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5, v = new Date(t.getTime() + n * h);
  return v.setUTCHours(0, 0, 0, 0), console.log("[addCells]", { date: t.toISOString(), cells: n, lengthUnit: l, result: v.toISOString() }), v;
}, An = (t, n, s, l) => t < l && n > s;
function On(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: o = null,
    marqueeSelect: W = !1,
    copyPaste: h = !1,
    allowTaskIntersection: v = !0
  } = t, r = ze(Xe), [$, y] = st(r, "_tasks"), [K, F] = st(r, "_links"), S = Y(r, "area"), k = Y(r, "_scales"), d = Y(r, "taskTypes"), P = C(() => {
    if (!k || !k.start) return k;
    const e = new Date(Date.UTC(
      k.start.getFullYear(),
      k.start.getMonth(),
      k.start.getDate()
    )), c = e.getUTCDay(), a = c === 0 ? -6 : 1 - c, w = new Date(e.getTime() + a * 864e5);
    return w.setUTCHours(0, 0, 0, 0), console.log("[scales-normalize]", {
      raw: k.start.toISOString(),
      utc: e.toISOString(),
      dayOfWeek: c,
      daysToMonday: a,
      monday: w.toISOString()
    }), { ...k, start: w };
  }, [k]), j = Y(r, "baselines"), [N, Z] = st(r, "_selected"), b = Y(r, "_scrollTask"), A = Y(r, "criticalPath"), M = Y(r, "tasks"), J = Y(r, "schedule"), ee = Y(r, "splitTasks"), te = C(() => {
    if (!S || !Array.isArray($)) return [];
    const e = S.start ?? 0, c = S.end ?? 0;
    return l && o ? $.map((a) => ({ ...a })) : $.slice(e, c).map((a) => ({ ...a }));
  }, [y, S, l, o]), ne = Y(r, "cellHeight"), se = C(() => {
    if (!l || !o || !te.length) return te;
    const e = /* @__PURE__ */ new Map(), c = [];
    return $.forEach((a) => {
      const w = o.taskRows.get(a.id) ?? a.id;
      e.has(w) || (e.set(w, c.length), c.push(w));
    }), te.map((a) => {
      const w = o.taskRows.get(a.id) ?? a.id, R = e.get(w) ?? 0;
      return {
        ...a,
        $y: R * ne,
        $y_base: a.$y_base !== void 0 ? R * ne : void 0
      };
    });
  }, [te, l, o, $, ne]), re = C(
    () => P.lengthUnitWidth,
    [P]
  ), E = C(
    () => P.lengthUnit || "day",
    [P]
  ), D = le(!1), [x, he] = ge(void 0), [Q, de] = ge(null), ie = le(null), [me, Ne] = ge(null), [Ie, Le] = ge(void 0), Re = le(null), [be, we] = ge(0), [f, O] = ge(null), q = le(null), [z, G] = ge(null), [ye, Ce] = ge(null), [m, V] = ge(null), ue = le(null);
  ue.current = ye;
  const ve = le(200), g = le(null), oe = C(() => {
    const e = g.current;
    return !!(N.length && e && e.contains(document.activeElement));
  }, [N, g.current]), xe = C(() => oe && N[N.length - 1]?.id, [oe, N]);
  ce(() => {
    if (b && oe && b) {
      const { id: e } = b, c = g.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [b]), ce(() => {
    const e = g.current;
    if (e && (we(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((a) => {
        a[0] && we(a[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [g.current]);
  const X = _(() => {
    document.body.style.userSelect = "none";
  }, []), $e = _(() => {
    document.body.style.userSelect = "";
  }, []), B = _(
    (e, c, a) => {
      if (c.target.classList.contains("wx-line") || (a || (a = r.getTask(Ke(e))), a.type === "milestone" || a.type === "summary")) return "";
      const w = Ge(c, "data-segment");
      w && (e = w);
      const { left: R, width: L } = e.getBoundingClientRect(), T = (c.clientX - R) / L;
      let H = 0.2 / (L > 200 ? L / 200 : 1);
      return T < H ? "start" : T > 1 - H ? "end" : "";
    },
    [r]
  ), Me = C(() => {
    const e = /* @__PURE__ */ new Set();
    if (v || !l || !o)
      return e;
    const c = /* @__PURE__ */ new Map();
    return $.forEach((a) => {
      if (a.type === "summary" || a.type === "milestone") return;
      const w = o.taskRows.get(a.id) ?? a.id;
      c.has(w) || c.set(w, []), c.get(w).push(a);
    }), c.forEach((a) => {
      if (!(a.length < 2))
        for (let w = 0; w < a.length; w++)
          for (let R = w + 1; R < a.length; R++) {
            const L = a[w], T = a[R], H = L.$x, ae = L.$x + L.$w, ke = T.$x, De = T.$x + T.$w;
            An(H, ae, ke, De) && (e.add(L.id), e.add(T.id));
          }
    }), e;
  }, [v, l, o, $, y]), Te = C(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return $.forEach((w) => {
        e.set(w.id, w.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return $.forEach((w) => {
      const R = o.taskRows.get(w.id) ?? w.id;
      c.has(R) || (c.set(R, a.length), a.push(R));
    }), $.forEach((w) => {
      const R = o.taskRows.get(w.id) ?? w.id, L = c.get(R) ?? 0;
      e.set(w.id, L * ne);
    }), e;
  }, [$, l, o, ne]), Se = C(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return $.forEach((w) => {
        e.set(w.id, w.$y), w.row !== void 0 && e.set(w.row, w.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return $.forEach((w) => {
      const R = o.taskRows.get(w.id) ?? w.id;
      c.has(R) || (c.set(R, a.length), a.push(R));
    }), c.forEach((w, R) => {
      e.set(R, w * ne);
    }), e;
  }, [$, l, o, ne]), We = _(
    (e) => {
      if (!g.current) return [];
      const a = Math.min(e.startX, e.currentX), w = Math.max(e.startX, e.currentX), R = Math.min(e.startY, e.currentY), L = Math.max(e.startY, e.currentY);
      return $.filter((T) => {
        const H = T.$x, ae = T.$x + T.$w, De = Te.get(T.id) ?? T.$y, He = De + T.$h;
        return H < w && ae > a && De < L && He > R;
      });
    },
    [$, Te]
  ), Ae = C(() => new Set(N.map((e) => e.id)), [N, Z]), i = _(
    (e) => Ae.has(e),
    [Ae]
  ), p = _(
    (e, c) => {
      const { clientX: a } = c, w = Ke(e), R = r.getTask(w), L = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (L.contains("wx-progress-marker")) {
          const { progress: T } = r.getTask(w);
          ie.current = {
            id: w,
            x: a,
            progress: T,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const T = B(e, c, R) || "move", H = {
            id: w,
            mode: T,
            x: a,
            dx: 0,
            l: R.$x,
            w: R.$w
          };
          if (ee && R.segments?.length) {
            const ae = Ge(c, "data-segment");
            ae && (H.segmentIndex = ae.dataset.segment * 1, mn(R, H));
          }
          de(H);
        }
        X();
      }
    },
    [r, n, B, X, ee]
  ), I = _(
    (e) => {
      if (e.button !== 0 || m) return;
      const c = Ge(e);
      if (!c && W && !n) {
        const a = g.current;
        if (!a) return;
        const w = a.getBoundingClientRect(), R = e.clientX - w.left, L = e.clientY - w.top;
        if (h) {
          const H = _t(R, P);
          H && (ue.current = H, Ce(H));
        }
        const T = {
          startX: R,
          startY: L,
          currentX: R,
          currentY: L,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        O(T), q.current = T, X();
        return;
      }
      if (c) {
        if (W && !n && N.length > 1) {
          const a = Ke(c);
          if (i(a)) {
            const w = e.target.classList;
            if (!w.contains("wx-link") && !w.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const R = r.getTask(a);
              if (!B(c, e, R)) {
                const T = /* @__PURE__ */ new Map();
                N.forEach((H) => {
                  const ae = r.getTask(H.id);
                  if (ae) {
                    if (J?.auto && ae.type === "summary") return;
                    T.set(H.id, {
                      $x: ae.$x,
                      $w: ae.$w,
                      start: ae.start,
                      end: ae.end
                    });
                  }
                }), G({
                  baseTaskId: a,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: T
                }), X();
                return;
              }
            }
          }
        }
        p(c, e);
      }
    },
    [p, W, h, n, N, i, r, B, J, X, P, m]
  ), U = _(
    (e) => {
      const c = Ge(e);
      c && (Re.current = setTimeout(() => {
        Le(!0), p(c, e.touches[0]);
      }, 300));
    },
    [p]
  ), pe = _(
    (e) => {
      Ne(e && { ...K.find((c) => c.id === e) });
    },
    [K]
  ), fe = _(() => {
    const e = q.current;
    if (e) {
      const c = We(e);
      e.ctrlKey ? c.forEach((a) => {
        r.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (N.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), c.forEach((a, w) => {
        r.exec("select-task", {
          id: a.id,
          toggle: w > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), O(null), q.current = null, $e(), D.current = !0;
      return;
    }
    if (z) {
      const { dx: c, originalPositions: a } = z, w = Math.round(c / re);
      if (w !== 0) {
        let R = !0;
        a.forEach((L, T) => {
          const H = r.getTask(T);
          H && (r.exec("update-task", {
            id: T,
            diff: w,
            task: { start: H.start, end: H.end },
            skipUndo: !R
            // Only first task creates undo entry
          }), R = !1);
        }), D.current = !0;
      } else
        a.forEach((R, L) => {
          r.exec("drag-task", {
            id: L,
            left: R.$x,
            width: R.$w,
            inProgress: !1
          });
        });
      G(null), $e();
      return;
    }
    if (ie.current) {
      const { dx: c, id: a, marker: w, value: R } = ie.current;
      ie.current = null, typeof R < "u" && c && r.exec("update-task", {
        id: a,
        task: { progress: R },
        inProgress: !1
      }), w.classList.remove("wx-progress-in-drag"), D.current = !0, $e();
    } else if (Q) {
      const { id: c, mode: a, dx: w, l: R, w: L, start: T, segment: H, index: ae } = Q;
      if (de(null), T) {
        const ke = Math.round(w / re);
        if (!ke)
          r.exec("drag-task", {
            id: c,
            width: L,
            left: R,
            inProgress: !1,
            ...H && { segmentIndex: ae }
          });
        else {
          let De = {}, He = r.getTask(c);
          H && (He = He.segments[ae]);
          const Ve = 1440 * 60 * 1e3, _e = ke * (E === "week" ? 7 : E === "month" ? 30 : E === "quarter" ? 91 : E === "year" ? 365 : 1) * Ve;
          a === "move" ? (De.start = new Date(He.start.getTime() + _e), De.end = new Date(He.end.getTime() + _e)) : a === "start" ? (De.start = new Date(He.start.getTime() + _e), De.end = He.end) : a === "end" && (De.start = He.start, De.end = new Date(He.end.getTime() + _e)), r.exec("update-task", {
            id: c,
            task: De,
            ...H && { segmentIndex: ae }
          });
        }
        D.current = !0;
      }
      $e();
    }
  }, [r, $e, Q, re, E, f, z, We, N]), Ee = _(
    (e, c) => {
      const { clientX: a, clientY: w } = c, R = g.current;
      if (R) {
        const L = R.getBoundingClientRect();
        ve.current = a - L.left;
      }
      if (m) {
        if (!R) return;
        const L = R.getBoundingClientRect(), T = a - L.left;
        V((H) => ({ ...H, currentX: T }));
        return;
      }
      if (!n) {
        if (f) {
          const L = g.current;
          if (!L) return;
          const T = L.getBoundingClientRect(), H = a - T.left, ae = w - T.top;
          O((ke) => ({
            ...ke,
            currentX: H,
            currentY: ae
          })), q.current && (q.current.currentX = H, q.current.currentY = ae);
          return;
        }
        if (z) {
          const L = a - z.startX;
          z.originalPositions.forEach((T, H) => {
            const ae = T.$x + L;
            r.exec("drag-task", {
              id: H,
              left: ae,
              width: T.$w,
              inProgress: !0
            });
          }), G((T) => ({ ...T, dx: L }));
          return;
        }
        if (ie.current) {
          const { node: L, x: T, id: H } = ie.current, ae = ie.current.dx = a - T, ke = Math.round(ae / L.offsetWidth * 100);
          let De = ie.current.progress + ke;
          ie.current.value = De = Math.min(
            Math.max(0, De),
            100
          ), r.exec("update-task", {
            id: H,
            task: { progress: De },
            inProgress: !0
          });
        } else if (Q) {
          pe(null);
          const { mode: L, l: T, w: H, x: ae, id: ke, start: De, segment: He, index: Ve } = Q, Fe = r.getTask(ke), _e = a - ae;
          if (!De && Math.abs(_e) < 20 || L === "start" && H - _e < re || L === "end" && H + _e < re || L === "move" && (_e < 0 && T + _e < 0 || _e > 0 && T + H + _e > be) || Q.segment && !wn(Fe, Q))
            return;
          const nt = { ...Q, dx: _e };
          let je, Qe;
          if (L === "start" ? (je = T + _e, Qe = H - _e) : L === "end" ? (je = T, Qe = H + _e) : L === "move" && (je = T + _e, Qe = H), r.exec("drag-task", {
            id: ke,
            width: Qe,
            left: je,
            inProgress: !0,
            ...He && { segmentIndex: Ve }
          }), !nt.start && (L === "move" && Fe.$x == T || L !== "move" && Fe.$w == H)) {
            D.current = !0, fe();
            return;
          }
          nt.start = !0, de(nt);
        } else {
          const L = Ge(e);
          if (L) {
            const T = r.getTask(Ke(L)), ae = Ge(e, "data-segment") || L, ke = B(ae, c, T);
            ae.style.cursor = ke && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      Q,
      re,
      be,
      B,
      pe,
      fe,
      f,
      z,
      m
    ]
  ), Oe = _(
    (e) => {
      Ee(e, e);
    },
    [Ee]
  ), Yt = _(
    (e) => {
      Ie ? (e.preventDefault(), Ee(e, e.touches[0])) : Re.current && (clearTimeout(Re.current), Re.current = null);
    },
    [Ie, Ee]
  ), it = _(() => {
    fe();
  }, [fe]), Xt = _(() => {
    Le(null), Re.current && (clearTimeout(Re.current), Re.current = null), fe();
  }, [fe]);
  ce(() => (window.addEventListener("mouseup", it), () => {
    window.removeEventListener("mouseup", it);
  }), [it]);
  const Ft = _(
    (e) => {
      if (!n) {
        const c = qe(e.target);
        if (c && !e.target.classList.contains("wx-link")) {
          const a = qe(e.target, "data-segment");
          r.exec("show-editor", {
            id: c,
            ...a !== null && { segmentIndex: a }
          });
        }
      }
    },
    [r, n]
  ), Kt = ["e2s", "s2s", "e2e", "s2e"], et = _((e, c) => Kt[(e ? 1 : 0) + (c ? 0 : 2)], []), tt = _(
    (e, c) => {
      const a = x.id, w = x.start;
      return e === a ? !0 : !!K.find((R) => R.target == e && R.source == a && R.type === et(w, c));
    },
    [x, F, et]
  ), ft = _(() => {
    x && he(null);
  }, [x]), ht = _((e, c, a) => {
    if (!c.length || !e || a == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: e.toISOString(),
      taskCount: c.length,
      parent: a
    });
    const w = 864e5, R = r.getHistory();
    R?.startBatch();
    const L = new Date(e);
    L.setUTCHours(0, 0, 0, 0), console.log("[paste] scalesValue:", {
      start: P?.start?.toISOString?.(),
      lengthUnit: P?.lengthUnit,
      lengthUnitWidth: P?.lengthUnitWidth
    }), c.forEach((T, H) => {
      const ae = `task-${Date.now()}-${H}`;
      console.log("[paste] task input:", {
        text: T.text,
        _startCellOffset: T._startCellOffset,
        _startDayOfWeek: T._startDayOfWeek,
        _durationDays: T._durationDays,
        start: T.start?.toISOString?.(),
        end: T.end?.toISOString?.()
      });
      const ke = Wn(L, T._startCellOffset || 0, P);
      console.log("[paste] cellOffset:", ke?.toISOString?.());
      const De = new Date(ke.getTime() + (T._startDayOfWeek || 0) * w);
      De.setUTCHours(0, 0, 0, 0);
      const He = new Date(De.getTime() + (T._durationDays || 7) * w);
      He.setUTCHours(0, 0, 0, 0), console.log("[paste] task calculated:", {
        text: T.text,
        newStart: De.toISOString(),
        newEnd: He.toISOString(),
        row: T.row
      }), r.exec("add-task", {
        task: {
          id: ae,
          text: T.text,
          start: De,
          end: He,
          type: T.type || "task",
          parent: a,
          row: T.row
        },
        target: a,
        mode: "child",
        skipUndo: H > 0
      });
    }), R?.endBatch();
  }, [r, P]), Vt = _(
    (e) => {
      if (D.current) {
        D.current = !1;
        return;
      }
      if (m && m.currentX != null) {
        const a = _t(m.currentX, P);
        a && ht(a, m.tasks, m.parent), V(null);
        return;
      }
      const c = qe(e.target);
      if (c) {
        const a = r.getTask(c), w = $.find((L) => L.id === c);
        console.log("[click] task:", a?.text, "id:", c), console.log("[click] api.getTask:", { start: a?.start, end: a?.end, duration: a?.duration }), console.log("[click] rendered:", { start: w?.start, end: w?.end, $w: w?.$w, $x: w?.$x });
        const R = e.target.classList;
        if (R.contains("wx-link")) {
          const L = R.contains("wx-left");
          if (!x) {
            he({ id: c, start: L });
            return;
          }
          x.id !== c && !tt(c, L) && r.exec("add-link", {
            link: {
              source: x.id,
              target: c,
              type: et(x.start, L)
            }
          });
        } else if (R.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: me.id }), Ne(null);
        else {
          let L;
          const T = Ge(e, "data-segment");
          T && (L = T.dataset.segment * 1), r.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: L
          });
        }
      }
      ft();
    },
    [
      r,
      x,
      F,
      me,
      tt,
      et,
      ft,
      m,
      P,
      ht
    ]
  ), qt = _((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Bt = _((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), jt = _(
    (e) => {
      if (Ie || Re.current)
        return e.preventDefault(), !1;
    },
    [Ie]
  ), gt = C(
    () => d.map((e) => e.id),
    [d]
  ), mt = _(
    (e) => {
      let c = gt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [gt]
  ), wt = _(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), ct = _(
    (e) => A && M.byId(e).$critical,
    [A, M]
  ), xt = _(
    (e) => {
      if (J?.auto) {
        const c = M.getSummaryId(e, !0), a = M.getSummaryId(x.id, !0);
        return x?.id && !(Array.isArray(c) ? c : [c]).includes(
          x.id
        ) && !(Array.isArray(a) ? a : [a]).includes(e);
      }
      return x;
    },
    [J, M, x]
  ), pt = _(() => {
    const e = r.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, a = e.map((H) => {
      const ae = r.getTask(H.id);
      if (!ae) return null;
      const ke = $.find((Zt) => Zt.id === H.id);
      if (!ke) return null;
      const { $x: De, $y: He, $h: Ve, $w: Fe, $skip: _e, $level: nt, $index: je, $y_base: Qe, $x_base: ns, $w_base: ss, $h_base: rs, $skip_baseline: os, $critical: ls, $reorder: is, ...Qt } = ke, kt = ke.end && ke.start ? Math.round((ke.end.getTime() - ke.start.getTime()) / c) : 0, bt = ke.start ? (ke.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: ae.id,
        text: ae.text,
        start: ke.start?.toISOString?.(),
        end: ke.end?.toISOString?.(),
        durationDays: kt,
        startDayOfWeek: bt,
        $w: Fe,
        $h: Ve,
        row: ke.row,
        parent: ke.parent
      }), { ...Qt, _durationDays: kt, _startDayOfWeek: bt, _originalWidth: Fe, _originalHeight: Ve };
    }).filter(Boolean);
    if (!a.length) return;
    const R = a[0].parent, L = a.filter((H) => H.parent === R);
    if (L.length === 0) return;
    const T = L.reduce((H, ae) => ae.start && (!H || ae.start < H) ? ae.start : H, null);
    Ze = L.map((H) => ({
      ...H,
      _startCellOffset: Hn(H.start, T, P)
    })), Lt = R, at = T, console.log("[copy] clipboard stored:", {
      taskCount: Ze.length,
      baseDate: T?.toISOString?.(),
      parent: R,
      tasks: Ze.map((H) => ({
        id: H.id,
        text: H.text,
        _startCellOffset: H._startCellOffset,
        _startDayOfWeek: H._startDayOfWeek,
        _durationDays: H._durationDays
      }))
    });
  }, [r, P]);
  ce(() => h ? r.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return pt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !Ze.length || !at || V({
        tasks: Ze,
        baseDate: at,
        parent: Lt,
        currentX: ve.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [h, r, pt]), ce(() => {
    if (!m) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), V(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [m]);
  const yt = C(() => {
    if (!f) return null;
    const e = Math.min(f.startX, f.currentX), c = Math.min(f.startY, f.currentY), a = Math.abs(f.currentX - f.startX), w = Math.abs(f.currentY - f.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${a}px`,
      height: `${w}px`
    };
  }, [f]);
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${se.length ? se[0].$h : 0}px` },
      ref: g,
      onContextMenu: jt,
      onMouseDown: I,
      onMouseMove: Oe,
      onTouchStart: U,
      onTouchMove: Yt,
      onTouchEnd: Xt,
      onClick: Vt,
      onDoubleClick: Ft,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ u(
          _n,
          {
            onSelectLink: pe,
            selectedLink: me,
            readonly: n
          }
        ),
        se.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = Me.has(e.id), a = `wx-bar wx-${mt(e.type)}` + (Ie && Q && e.id === Q.id ? " wx-touch" : "") + (x && x.id === e.id ? " wx-selected" : "") + (Ae.has(e.id) ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (ee && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), w = "wx-link wx-left" + (x ? " wx-visible" : "") + (!x || !tt(e.id, !0) && xt(e.id) ? " wx-target" : "") + (x && x.id === e.id && x.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : ""), R = "wx-link wx-right" + (x ? " wx-visible" : "") + (!x || !tt(e.id, !1) && xt(e.id) ? " wx-target" : "") + (x && x.id === e.id && !x.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Pe(en, { children: [
            !e.$skip && /* @__PURE__ */ Pe(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: qt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: xe === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === me?.target && me?.type[2] === "s" ? /* @__PURE__ */ u(
                    Tt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + w, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Pe(Je, { children: [
                    e.progress && !(ee && e.segments) ? /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(ee && e.segments) ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : ee && e.segments ? /* @__PURE__ */ u(Pn, { task: e, type: mt(e.type) }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.$barText || e.text || "" }),
                    c && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Pe(Je, { children: [
                    /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-text-out", children: e.$barText || e.text })
                  ] }),
                  n ? null : e.id === me?.target && me?.type[2] === "e" ? /* @__PURE__ */ u(
                    Tt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + R, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            j && !e.$skip_baseline ? /* @__PURE__ */ u(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Bt(e)
              }
            ) : null
          ] }, e.id);
        }),
        f && yt && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: yt }),
        m && m.currentX != null && m.tasks.map((e, c) => {
          const w = (Math.floor(m.currentX / re) + (e._startCellOffset || 0)) * re, R = e._originalWidth || re, L = e._originalHeight || ne, T = Se.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: w, top: T, width: R, height: L },
              children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.$barText || e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function zn(t) {
  const { highlightTime: n } = t, s = ze(Xe), l = Y(s, "_scales");
  return /* @__PURE__ */ u("div", { className: "wx-ZkvhDKir wx-scale", style: { width: l.width }, children: (l?.rows || []).map((o, W) => /* @__PURE__ */ u(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((h, v) => {
        const r = n ? n(h.date, h.unit) : "", $ = "wx-cell " + (h.css || "") + " " + (r || ""), y = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ u(
          "div",
          {
            className: "wx-ZkvhDKir " + $,
            style: { width: `${h.width}px` },
            ...y ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          v
        );
      })
    },
    W
  )) });
}
const Gn = /* @__PURE__ */ new Map();
function Un(t) {
  const n = le(null), s = le(0), l = le(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, ce(() => {
    if (o)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const W = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        Gn.set(t, W), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: W })
        );
      }), () => cancelAnimationFrame(l.current);
  });
}
function Yn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: l,
    taskTemplate: o,
    cellBorders: W,
    highlightTime: h,
    multiTaskRows: v = !1,
    rowMapping: r = null,
    marqueeSelect: $ = !1,
    copyPaste: y = !1,
    scrollToCurrentWeek: K = !1,
    currentWeekColor: F = null,
    allowTaskIntersection: S = !0
  } = t, k = ze(Xe), [d, P] = st(k, "_selected"), j = Y(k, "scrollTop"), N = Y(k, "cellHeight"), Z = Y(k, "cellWidth"), b = Y(k, "_scales"), A = Y(k, "_markers"), M = Y(k, "_scrollTask"), J = Y(k, "zoom"), ee = Y(k, "_tasks"), [te, ne] = ge(), se = le(null), re = le(0), E = le(!1), D = 1 + (b?.rows?.length || 0), x = C(() => {
    if (!v || !r || !ee?.length) return null;
    const f = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map(), q = [];
    return ee.forEach((z) => {
      const G = r.taskRows.get(z.id) ?? z.id;
      O.has(G) || (O.set(G, q.length), q.push(G));
    }), ee.forEach((z) => {
      const G = r.taskRows.get(z.id) ?? z.id, ye = O.get(G) ?? 0;
      f.set(z.id, ye * N);
    }), f;
  }, [ee, v, r, N]), he = C(() => {
    const f = [];
    return d && d.length && N && d.forEach((O) => {
      const q = x?.get(O.id) ?? O.$y;
      f.push({ height: `${N}px`, top: `${q - 3}px` });
    }), f;
  }, [P, N, x]), Q = C(
    () => Math.max(te || 0, l),
    [te, l]
  );
  ce(() => {
    const f = se.current;
    f && typeof j == "number" && (f.scrollTop = j);
  }, [j]);
  const de = () => {
    ie();
  };
  function ie(f) {
    const O = se.current;
    if (!O) return;
    const q = {};
    q.left = O.scrollLeft, k.exec("scroll-chart", q);
  }
  function me() {
    const f = se.current, q = Math.ceil((te || 0) / (N || 1)) + 1, z = Math.floor((f && f.scrollTop || 0) / (N || 1)), G = Math.max(0, z - D), ye = z + q + D, Ce = G * (N || 0);
    k.exec("render-data", {
      start: G,
      end: ye,
      from: Ce
    });
  }
  ce(() => {
    me();
  }, [te, j]);
  const Ne = _(
    (f) => {
      if (!f) return;
      const { id: O, mode: q } = f;
      if (q.toString().indexOf("x") < 0) return;
      const z = se.current;
      if (!z) return;
      const { clientWidth: G } = z, ye = k.getTask(O);
      if (ye.$x + ye.$w < z.scrollLeft)
        k.exec("scroll-chart", { left: ye.$x - (Z || 0) }), z.scrollLeft = ye.$x - (Z || 0);
      else if (ye.$x >= G + z.scrollLeft) {
        const Ce = G < ye.$w ? Z || 0 : ye.$w;
        k.exec("scroll-chart", { left: ye.$x - G + Ce }), z.scrollLeft = ye.$x - G + Ce;
      }
    },
    [k, Z]
  );
  ce(() => {
    Ne(M);
  }, [M]);
  function Ie(f) {
    if (J && (f.ctrlKey || f.metaKey)) {
      f.preventDefault();
      const O = se.current, q = f.clientX - (O ? O.getBoundingClientRect().left : 0);
      if (re.current += f.deltaY, Math.abs(re.current) >= 150) {
        const G = -Math.sign(re.current);
        re.current = 0, k.exec("zoom-scale", {
          dir: G,
          offset: q
        });
      }
    }
  }
  const Le = _((f) => {
    const O = h(f.date, f.unit);
    return O ? {
      css: O,
      width: f.width
    } : null;
  }, [h]), Re = C(() => {
    if (!b || !h || !["hour", "day", "week"].includes(b.minUnit)) return null;
    let O = 0;
    return b.rows[b.rows.length - 1].cells.map((q) => {
      const z = Le(q), G = O;
      return O += q.width, z ? { ...z, left: G } : null;
    });
  }, [b, h, Le]), be = _(
    (f) => {
      f.eventSource = "chart", k.exec("hotkey", f);
    },
    [k]
  );
  ce(() => {
    const f = se.current;
    if (!f) return;
    const O = () => ne(f.clientHeight);
    O();
    const q = new ResizeObserver(() => O());
    return q.observe(f), () => {
      q.disconnect();
    };
  }, [se.current]);
  const we = le(null);
  return ce(() => {
    const f = se.current;
    if (f && !we.current)
      return we.current = zt(f, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (O) => be(O)
      }), () => {
        we.current?.destroy(), we.current = null;
      };
  }, []), ce(() => {
    const f = se.current;
    if (!f) return;
    const O = Ie;
    return f.addEventListener("wheel", O), () => {
      f.removeEventListener("wheel", O);
    };
  }, [Ie]), ce(() => {
    if (!K || E.current || !b || !se.current || !te) return;
    const f = se.current, { clientWidth: O } = f, q = /* @__PURE__ */ new Date(), z = b.rows[b.rows.length - 1]?.cells;
    if (!z) return;
    let G = -1, ye = 0;
    const Ce = [];
    for (let V = 0; V < z.length; V++) {
      const ue = z[V];
      Ce.push({ left: ye, width: ue.width });
      const ve = ue.date;
      if (ue.unit === "week") {
        const g = new Date(ve);
        g.setUTCDate(g.getUTCDate() + 7), q >= ve && q < g && (G = V);
      } else ue.unit === "day" && q.getUTCFullYear() === ve.getUTCFullYear() && q.getUTCMonth() === ve.getUTCMonth() && q.getUTCDate() === ve.getUTCDate() && (G = V);
      ye += ue.width;
    }
    let m = G;
    if (G > 0 && (m = G - 1), m >= 0 && Ce[m]) {
      const V = Ce[m], ue = Math.max(0, V.left);
      f.scrollLeft = ue, k.exec("scroll-chart", { left: ue }), E.current = !0;
    }
  }, [K, b, te, k]), Un("chart"), /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: se,
      onScroll: de,
      children: [
        /* @__PURE__ */ u(zn, { highlightTime: h, scales: b }),
        A && A.length ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${Q}px` },
            children: A.map((f, O) => /* @__PURE__ */ u(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${f.css || ""}`,
                style: { left: `${f.left}px` },
                children: /* @__PURE__ */ u("div", { className: "wx-mR7v2Xag wx-content", children: f.text })
              },
              O
            ))
          }
        ) : null,
        /* @__PURE__ */ Pe(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${Q}px` },
            children: [
              Re ? /* @__PURE__ */ u(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Re.map(
                    (f, O) => f ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + f.css,
                        style: {
                          width: `${f.width}px`,
                          left: `${f.left}px`
                        }
                      },
                      O
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ u(Ln, { borders: W }),
              d && d.length ? d.map(
                (f, O) => f.$y ? /* @__PURE__ */ u(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": f.id,
                    style: he[O]
                  },
                  f.id
                ) : null
              ) : null,
              /* @__PURE__ */ u(
                On,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: v,
                  rowMapping: r,
                  marqueeSelect: $,
                  copyPaste: y,
                  allowTaskIntersection: S
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Xn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: l = "x",
    onMove: o,
    onDisplayChange: W,
    compactMode: h,
    containerWidth: v = 0,
    leftThreshold: r = 50,
    rightThreshold: $ = 50
  } = t, [y, K] = ut(t.value ?? 0), [F, S] = ut(t.display ?? "all");
  function k(de) {
    let ie = 0;
    n == "center" ? ie = s / 2 : n == "before" && (ie = s);
    const me = {
      size: [s + "px", "auto"],
      p: [de - ie + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let Ne in me) me[Ne] = me[Ne].reverse();
    return me;
  }
  const [d, P] = ge(!1), [j, N] = ge(null), Z = le(0), b = le(), A = le(), M = le(F);
  ce(() => {
    M.current = F;
  }, [F]), ce(() => {
    j === null && y > 0 && N(y);
  }, [j, y]);
  function J(de) {
    return l == "x" ? de.clientX : de.clientY;
  }
  const ee = _(
    (de) => {
      const ie = b.current + J(de) - Z.current;
      K(ie);
      let me;
      ie <= r ? me = "chart" : v - ie <= $ ? me = "grid" : me = "all", M.current !== me && (S(me), M.current = me), A.current && clearTimeout(A.current), A.current = setTimeout(() => o && o(ie), 100);
    },
    [v, r, $, o]
  ), te = _(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", P(!1), window.removeEventListener("mousemove", ee), window.removeEventListener("mouseup", te);
  }, [ee]), ne = C(
    () => F !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [F, l]
  ), se = _(
    (de) => {
      !h && (F === "grid" || F === "chart") || (Z.current = J(de), b.current = y, P(!0), document.body.style.cursor = ne, document.body.style.userSelect = "none", window.addEventListener("mousemove", ee), window.addEventListener("mouseup", te));
    },
    [ne, ee, te, y, h, F]
  );
  function re() {
    S("all"), j !== null && (K(j), o && o(j));
  }
  function E(de) {
    if (h) {
      const ie = F === "chart" ? "grid" : "chart";
      S(ie), W(ie);
    } else if (F === "grid" || F === "chart")
      re(), W("all");
    else {
      const ie = de === "left" ? "chart" : "grid";
      S(ie), W(ie);
    }
  }
  function D() {
    E("left");
  }
  function x() {
    E("right");
  }
  const he = C(() => k(y), [y, n, s, l]), Q = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${F}`,
    d ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-pFykzMlT " + Q,
      onMouseDown: se,
      style: { width: he.size[0], height: he.size[1], cursor: ne },
      children: [
        /* @__PURE__ */ Pe("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ u(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: D
            }
          ) }),
          /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ u(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: x
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Fn = 650;
function Gt(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let W of o)
        if (W.target === document.body) {
          let h = W.contentRect.width <= Fn;
          t(h);
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
function Kn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: l,
    highlightTime: o,
    onTableAPIChange: W,
    multiTaskRows: h = !1,
    rowMapping: v = null,
    marqueeSelect: r = !1,
    copyPaste: $ = !1,
    scrollToCurrentWeek: y = !1,
    currentWeekColor: K = null,
    allowTaskIntersection: F = !0
  } = t, S = ze(Xe), k = Y(S, "_tasks"), d = Y(S, "_scales"), P = Y(S, "cellHeight"), j = Y(S, "columns"), N = Y(S, "_scrollTask"), Z = Y(S, "undo"), b = C(() => {
    if (!h) return v;
    const m = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map();
    return k.forEach((ue) => {
      const ve = ue.row ?? ue.id;
      V.set(ue.id, ve), m.has(ve) || m.set(ve, []), m.get(ve).push(ue.id);
    }), { rowMap: m, taskRows: V };
  }, [k, h, v]), [A, M] = ge(!1);
  let [J, ee] = ge(0);
  const [te, ne] = ge(0), [se, re] = ge(0), [E, D] = ge(void 0), [x, he] = ge("all"), Q = le(null), de = _(
    (m) => {
      M((V) => (m !== V && (m ? (Q.current = x, x === "all" && he("grid")) : (!Q.current || Q.current === "all") && he("all")), m));
    },
    [x]
  );
  ce(() => {
    const m = Gt(de);
    return m.observe(), () => {
      m.disconnect();
    };
  }, [de]);
  const ie = C(() => {
    let m;
    return j.every((V) => V.width && !V.flexgrow) ? m = j.reduce((V, ue) => V + parseInt(ue.width), 0) : A && x === "chart" ? m = parseInt(j.find((V) => V.id === "action")?.width) || 50 : m = 440, J = m, m;
  }, [j, A, x]);
  ce(() => {
    ee(ie);
  }, [ie]);
  const me = C(
    () => (te ?? 0) - (E ?? 0),
    [te, E]
  ), Ne = C(() => d.width, [d]), Ie = C(() => {
    if (!h || !b)
      return k.length * P;
    const m = /* @__PURE__ */ new Set();
    return k.forEach((V) => {
      const ue = b.taskRows.get(V.id) ?? V.id;
      m.add(ue);
    }), m.size * P;
  }, [k, P, h, b]), Le = C(
    () => d.height + Ie + me,
    [d, Ie, me]
  ), Re = C(
    () => J + Ne,
    [J, Ne]
  ), be = le(null), we = _(() => {
    Promise.resolve().then(() => {
      if ((te ?? 0) > (Re ?? 0)) {
        const m = (te ?? 0) - J;
        S.exec("expand-scale", { minWidth: m });
      }
    });
  }, [te, Re, J, S]);
  ce(() => {
    let m;
    return be.current && (m = new ResizeObserver(we), m.observe(be.current)), () => {
      m && m.disconnect();
    };
  }, [be.current, we]), ce(() => {
    we();
  }, [Ne]);
  const f = le(null), O = le(null), q = _(() => {
    const m = f.current;
    m && S.exec("scroll-chart", {
      top: m.scrollTop
    });
  }, [S]), z = le({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  ce(() => {
    z.current = {
      rTasks: k,
      rScales: d,
      rCellHeight: P,
      scrollSize: me,
      ganttDiv: f.current,
      ganttHeight: se ?? 0
    };
  }, [k, d, P, me, se]);
  const G = _(
    (m) => {
      if (!m) return;
      const {
        rTasks: V,
        rScales: ue,
        rCellHeight: ve,
        scrollSize: g,
        ganttDiv: oe,
        ganttHeight: xe
      } = z.current;
      if (!oe) return;
      const { id: X } = m, $e = V.findIndex((B) => B.id === X);
      if ($e > -1) {
        const B = xe - ue.height, Me = $e * ve, Te = oe.scrollTop;
        let Se = null;
        Me < Te ? Se = Me : Me + ve > Te + B && (Se = Me - B + ve + g), Se !== null && (S.exec("scroll-chart", { top: Math.max(Se, 0) }), f.current.scrollTop = Math.max(Se, 0));
      }
    },
    [S]
  );
  ce(() => {
    G(N);
  }, [N]), ce(() => {
    const m = f.current, V = O.current;
    if (!m || !V) return;
    const ue = () => {
      Mn(() => {
        re(m.offsetHeight), ne(m.offsetWidth), D(V.offsetWidth);
      });
    }, ve = new ResizeObserver(ue);
    return ve.observe(m), () => ve.disconnect();
  }, [f.current]);
  const ye = le(null), Ce = le(null);
  return ce(() => {
    Ce.current && (Ce.current.destroy(), Ce.current = null);
    const m = ye.current;
    if (m)
      return Ce.current = zt(m, {
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
          "ctrl+z": Z,
          "ctrl+y": Z,
          "meta+z": Z,
          "meta+shift+z": Z
        },
        exec: (V) => {
          if (V.isInput) return;
          const ue = V.key;
          if (ue === "ctrl+z" || ue === "meta+z") {
            S.exec("undo", {});
            return;
          }
          if (ue === "ctrl+y" || ue === "meta+shift+z") {
            S.exec("redo", {});
            return;
          }
          S.exec("hotkey", V);
        }
      }), () => {
        Ce.current?.destroy(), Ce.current = null;
      };
  }, [Z]), /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-gantt", ref: f, onScroll: q, children: /* @__PURE__ */ u(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Le, width: "100%" },
      ref: O,
      children: /* @__PURE__ */ u(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: se,
            width: E
          },
          children: /* @__PURE__ */ Pe("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ye, children: [
            j.length ? /* @__PURE__ */ Pe(Je, { children: [
              /* @__PURE__ */ u(
                Nn,
                {
                  display: x,
                  compactMode: A,
                  columnWidth: ie,
                  width: J,
                  readonly: s,
                  fullHeight: Ie,
                  onTableAPIChange: W,
                  multiTaskRows: h,
                  rowMapping: b
                }
              ),
              /* @__PURE__ */ u(
                Xn,
                {
                  value: J,
                  display: x,
                  compactMode: A,
                  containerWidth: te,
                  onMove: (m) => ee(m),
                  onDisplayChange: (m) => he(m)
                }
              )
            ] }) : null,
            /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-content", ref: be, children: /* @__PURE__ */ u(
              Yn,
              {
                readonly: s,
                fullWidth: Ne,
                fullHeight: Ie,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: o,
                multiTaskRows: h,
                rowMapping: b,
                marqueeSelect: r,
                copyPaste: $,
                scrollToCurrentWeek: y,
                currentWeekColor: K,
                allowTaskIntersection: F
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
function qn(t, n) {
  return typeof t == "function" ? t : rt(t, n);
}
function Ut(t, n) {
  return t.map(({ format: s, ...l }) => ({
    ...l,
    format: qn(s, n)
  }));
}
function Bn(t, n) {
  const s = Vn(n);
  for (let l in s)
    s[l] = rt(s[l], t);
  return s;
}
function jn(t, n) {
  if (!t || !t.length) return t;
  const s = rt("%d-%m-%Y", n);
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
function Qn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Ut(s.scales, n)
    }))
  } : t;
}
const Zn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Jn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], vs = Pt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: l = bn,
  tasks: o = [],
  selected: W = [],
  activeTask: h = null,
  links: v = [],
  scales: r = Jn,
  columns: $ = kn,
  start: y = null,
  end: K = null,
  lengthUnit: F = "day",
  durationUnit: S = "day",
  cellWidth: k = 100,
  cellHeight: d = 38,
  scaleHeight: P = 36,
  readonly: j = !1,
  cellBorders: N = "full",
  zoom: Z = !1,
  baselines: b = !1,
  highlightTime: A = null,
  init: M = null,
  autoScale: J = !0,
  unscheduledTasks: ee = !1,
  criticalPath: te = null,
  schedule: ne = { type: "forward" },
  projectStart: se = null,
  projectEnd: re = null,
  calendar: E = null,
  undo: D = !1,
  splitTasks: x = !1,
  multiTaskRows: he = !1,
  marqueeSelect: Q = !1,
  copyPaste: de = !1,
  currentWeekHighlight: ie = !1,
  currentWeekColor: me = null,
  scrollToCurrentWeek: Ne = !1,
  allowTaskIntersection: Ie = !0,
  ...Le
}, Re) {
  const be = le();
  be.current = Le;
  const we = C(() => new xn(vn), []), f = C(() => ({ ...dt, ...lt }), []), O = ze(Ue.i18n), q = C(() => O ? O.extend(f, !0) : ot(f), [O, f]), z = C(() => q.getRaw().calendar, [q]), G = C(() => {
    let B = {
      zoom: Qn(Z, z),
      scales: Ut(r, z),
      columns: jn($, z),
      links: pn(v),
      cellWidth: k
    };
    return B.zoom && (B = {
      ...B,
      ...yn(
        B.zoom,
        Bn(z, q.getGroup("gantt")),
        B.scales,
        k
      )
    }), B;
  }, [Z, r, $, v, k, z, q]), ye = le(null);
  ye.current !== o && (Mt(o, { durationUnit: S, splitTasks: x, calendar: E }), ye.current = o), ce(() => {
    Mt(o, { durationUnit: S, splitTasks: x, calendar: E });
  }, [o, S, E, x]);
  const Ce = C(() => {
    if (!he) return null;
    const B = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Te = (Se) => {
      Se.forEach((We) => {
        const Ae = We.row ?? We.id;
        Me.set(We.id, Ae), B.has(Ae) || B.set(Ae, []), B.get(Ae).push(We.id), We.data && We.data.length > 0 && Te(We.data);
      });
    };
    return Te(o), { rowMap: B, taskRows: Me };
  }, [o, he]), m = C(() => we.in, [we]), V = le(null);
  V.current === null && (V.current = new hn((B, Me) => {
    const Te = "on" + Zn(B);
    be.current && be.current[Te] && be.current[Te](Me);
  }), m.setNext(V.current));
  const [ue, ve] = ge(null), g = le(null);
  g.current = ue;
  const oe = C(
    () => ({
      getState: we.getState.bind(we),
      getReactiveState: we.getReactive.bind(we),
      getStores: () => ({ data: we }),
      exec: m.exec,
      setNext: (B) => (V.current = V.current.setNext(B), V.current),
      intercept: m.intercept.bind(m),
      on: m.on.bind(m),
      detach: m.detach.bind(m),
      getTask: we.getTask.bind(we),
      serialize: we.serialize.bind(we),
      getTable: (B) => B ? new Promise((Me) => setTimeout(() => Me(g.current), 1)) : g.current,
      getHistory: () => we.getHistory()
    }),
    [we, m]
  );
  Ht(
    Re,
    () => ({
      ...oe
    }),
    [oe]
  );
  const xe = le(0);
  ce(() => {
    xe.current ? we.init({
      tasks: o,
      links: G.links,
      start: y,
      columns: G.columns,
      end: K,
      lengthUnit: F,
      cellWidth: G.cellWidth,
      cellHeight: d,
      scaleHeight: P,
      scales: G.scales,
      taskTypes: l,
      zoom: G.zoom,
      selected: W,
      activeTask: h,
      baselines: b,
      autoScale: J,
      unscheduledTasks: ee,
      markers: s,
      durationUnit: S,
      criticalPath: te,
      schedule: ne,
      projectStart: se,
      projectEnd: re,
      calendar: E,
      undo: D,
      _weekStart: z.weekStart,
      splitTasks: x
    }) : M && M(oe), xe.current++;
  }, [
    oe,
    M,
    o,
    G,
    y,
    K,
    F,
    d,
    P,
    l,
    W,
    h,
    b,
    J,
    ee,
    s,
    S,
    te,
    ne,
    se,
    re,
    E,
    D,
    z,
    x,
    we
  ]), xe.current === 0 && we.init({
    tasks: o,
    links: G.links,
    start: y,
    columns: G.columns,
    end: K,
    lengthUnit: F,
    cellWidth: G.cellWidth,
    cellHeight: d,
    scaleHeight: P,
    scales: G.scales,
    taskTypes: l,
    zoom: G.zoom,
    selected: W,
    activeTask: h,
    baselines: b,
    autoScale: J,
    unscheduledTasks: ee,
    markers: s,
    durationUnit: S,
    criticalPath: te,
    schedule: ne,
    projectStart: se,
    projectEnd: re,
    calendar: E,
    undo: D,
    _weekStart: z.weekStart,
    splitTasks: x
  });
  const X = C(() => {
    const B = /* @__PURE__ */ new Date(), Me = z?.weekStart ?? 0, Te = new Date(Date.UTC(B.getUTCFullYear(), B.getUTCMonth(), B.getUTCDate())), We = (Te.getUTCDay() - Me + 7) % 7;
    Te.setUTCDate(Te.getUTCDate() - We), Te.setUTCHours(0, 0, 0, 0);
    const Ae = new Date(Te);
    return Ae.setUTCDate(Ae.getUTCDate() + 7), (i) => i >= Te && i < Ae;
  }, [z]), $e = C(() => (B, Me) => {
    let Te = [];
    if (E)
      Me == "day" && !E.getDayHours(B) && Te.push("wx-weekend"), Me == "hour" && !E.getDayHours(B) && Te.push("wx-weekend");
    else if (A) {
      const Se = A(B, Me);
      Se && Te.push(Se);
    }
    return ie && (Me === "week" || Me === "day") && X(B) && Te.push("wx-current-week"), Te.join(" ");
  }, [E, A, ie, X]);
  return /* @__PURE__ */ u(Ue.i18n.Provider, { value: q, children: /* @__PURE__ */ u(Xe.Provider, { value: oe, children: /* @__PURE__ */ u(
    Kn,
    {
      taskTemplate: n,
      readonly: j,
      cellBorders: N,
      highlightTime: $e,
      onTableAPIChange: ve,
      multiTaskRows: he,
      rowMapping: Ce,
      marqueeSelect: Q,
      copyPaste: de,
      scrollToCurrentWeek: Ne,
      currentWeekColor: me,
      allowTaskIntersection: Ie
    }
  ) }) });
});
function Cs({ api: t = null, items: n = [] }) {
  const s = ze(Ue.i18n), l = C(() => s || ot(lt), [s]), o = C(() => l.getGroup("gantt"), [l]), W = Ye(t, "_selected"), h = Ye(t, "undo"), v = Ye(t, "history"), r = Ye(t, "splitTasks"), $ = ["undo", "redo"], y = C(() => {
    const F = St({ undo: !0, splitTasks: !0 });
    return (n.length ? n : St({
      undo: h,
      splitTasks: r
    })).map((k) => {
      let d = { ...k, disabled: !1 };
      return d.handler = Ot(F, d.id) ? (P) => At(t, P.id, null, o) : d.handler, d.text && (d.text = o(d.text)), d.menuText && (d.menuText = o(d.menuText)), d;
    });
  }, [n, t, o, h, r]), K = C(() => {
    const F = [];
    return y.forEach((S) => {
      const k = S.id;
      if (k === "add-task")
        F.push(S);
      else if ($.includes(k))
        $.includes(k) && F.push({
          ...S,
          disabled: S.isDisabled(v)
        });
      else {
        if (!W?.length || !t) return;
        F.push({
          ...S,
          disabled: S.isDisabled && W.some((d) => S.isDisabled(d, t.getState()))
        });
      }
    }), F.filter((S, k) => {
      if (t && S.isHidden)
        return !W.some((d) => S.isHidden(d, t.getState()));
      if (S.comp === "separator") {
        const d = F[k + 1];
        if (!d || d.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, W, v, y]);
  return s ? /* @__PURE__ */ u(Rt, { items: K }) : /* @__PURE__ */ u(Ue.i18n.Provider, { value: l, children: /* @__PURE__ */ u(Rt, { items: K }) });
}
const $s = Pt(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: o = null,
  at: W = "point",
  children: h,
  onClick: v,
  css: r
}, $) {
  const y = le(null), K = le(null), F = ze(Ue.i18n), S = C(() => F || ot({ ...lt, ...dt }), [F]), k = C(() => S.getGroup("gantt"), [S]), d = Ye(s, "taskTypes"), P = Ye(s, "selected"), j = Ye(s, "_selected"), N = Ye(s, "splitTasks"), Z = C(() => Dt({ splitTasks: !0 }), []);
  ce(() => {
    s && (s.on("scroll-chart", () => {
      y.current && y.current.show && y.current.show();
    }), s.on("drag-task", () => {
      y.current && y.current.show && y.current.show();
    }));
  }, [s]);
  function b(E) {
    return E.map((D) => (D = { ...D }, D.text && (D.text = k(D.text)), D.subtext && (D.subtext = k(D.subtext)), D.data && (D.data = b(D.data)), D));
  }
  function A() {
    const E = n.length ? n : Dt({ splitTasks: N }), D = E.find((x) => x.id === "convert-task");
    return D && (D.data = [], (d || []).forEach((x) => {
      D.data.push(D.dataFactory(x));
    })), b(E);
  }
  const M = C(() => A(), [s, n, d, N, k]), J = C(
    () => j && j.length ? j : [],
    [j]
  ), ee = _(
    (E, D) => {
      let x = E ? s?.getTask(E) : null;
      if (l) {
        const he = l(E, D);
        x = he === !0 ? x : he;
      }
      if (x) {
        const he = qe(D.target, "data-segment");
        he !== null ? K.current = { id: x.id, segmentIndex: he } : K.current = x.id, (!Array.isArray(P) || !P.includes(x.id)) && s && s.exec && s.exec("select-task", { id: x.id });
      }
      return x;
    },
    [s, l, P]
  ), te = _(
    (E) => {
      const D = E.action;
      D && (Ot(Z, D.id) && At(s, D.id, K.current, k), v && v(E));
    },
    [s, k, v, Z]
  ), ne = _(
    (E, D) => {
      const x = J.length ? J : D ? [D] : [];
      let he = o ? x.every((Q) => o(E, Q)) : !0;
      if (he && (E.isHidden && (he = !x.some(
        (Q) => E.isHidden(Q, s.getState(), K.current)
      )), E.isDisabled)) {
        const Q = x.some(
          (de) => E.isDisabled(de, s.getState(), K.current)
        );
        E.disabled = Q;
      }
      return he;
    },
    [o, J, s]
  );
  Ht($, () => ({
    show: (E, D) => {
      y.current && y.current.show && y.current.show(E, D);
    }
  }));
  const se = _((E) => {
    y.current && y.current.show && y.current.show(E);
  }, []), re = /* @__PURE__ */ Pe(Je, { children: [
    /* @__PURE__ */ u(
      Sn,
      {
        filter: ne,
        options: M,
        dataKey: "id",
        resolver: ee,
        onClick: te,
        at: W,
        ref: y,
        css: r
      }
    ),
    /* @__PURE__ */ u("span", { onContextMenu: se, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!F && Ue.i18n?.Provider) {
    const E = Ue.i18n.Provider;
    return /* @__PURE__ */ u(E, { value: S, children: re });
  }
  return re;
});
function es({ api: t, autoSave: n, onLinksChange: s }) {
  const o = ze(Ue.i18n).getGroup("gantt"), W = Y(t, "activeTask"), h = Y(t, "_activeTask"), v = Y(t, "_links"), r = Y(t, "schedule"), $ = Y(t, "unscheduledTasks"), [y, K] = ge();
  function F() {
    if (W) {
      const P = v.filter((N) => N.target == W).map((N) => ({ link: N, task: t.getTask(N.source) })), j = v.filter((N) => N.source == W).map((N) => ({ link: N, task: t.getTask(N.target) }));
      return [
        { title: o("Predecessors"), data: P },
        { title: o("Successors"), data: j }
      ];
    }
  }
  ce(() => {
    K(F());
  }, [W, v]);
  const S = C(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function k(P) {
    n ? t.exec("delete-link", { id: P }) : (K(
      (j) => (j || []).map((N) => ({
        ...N,
        data: N.data.filter((Z) => Z.link.id !== P)
      }))
    ), s && s({
      id: P,
      action: "delete-link",
      data: { id: P }
    }));
  }
  function d(P, j) {
    n ? t.exec("update-link", {
      id: P,
      link: j
    }) : (K(
      (N) => (N || []).map((Z) => ({
        ...Z,
        data: Z.data.map(
          (b) => b.link.id === P ? { ...b, link: { ...b.link, ...j } } : b
        )
      }))
    ), s && s({
      id: P,
      action: "update-link",
      data: {
        id: P,
        link: j
      }
    }));
  }
  return /* @__PURE__ */ u(Je, { children: (y || []).map(
    (P, j) => P.data.length ? /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ u(tn, { label: P.title, position: "top", children: /* @__PURE__ */ u("table", { children: /* @__PURE__ */ u("tbody", { children: P.data.map((N) => /* @__PURE__ */ Pe("tr", { children: [
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-task-name", children: N.task.text || "" }) }),
      r?.auto && N.link.type === "e2s" ? /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ u(
        nn,
        {
          type: "number",
          placeholder: o("Lag"),
          value: N.link.lag,
          disabled: $ && h?.unscheduled,
          onChange: (Z) => {
            Z.input || d(N.link.id, { lag: Z.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ u(
        sn,
        {
          value: N.link.type,
          placeholder: o("Select link type"),
          options: S,
          onChange: (Z) => d(N.link.id, { type: Z.value }),
          children: ({ option: Z }) => Z.label
        }
      ) }) }),
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => k(N.link.id),
          role: "button"
        }
      ) })
    ] }, N.link.id)) }) }) }) }, j) : null
  ) });
}
function ts(t) {
  const { value: n, time: s, format: l, onchange: o, onChange: W, ...h } = t, v = W ?? o;
  function r($) {
    const y = new Date($.value);
    y.setUTCHours(n.getUTCHours()), y.setUTCMinutes(n.getUTCMinutes()), v && v({ value: y });
  }
  return /* @__PURE__ */ Pe("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ u(
      rn,
      {
        ...h,
        value: n,
        onChange: r,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ u(on, { value: n, onChange: v, format: l }) : null
  ] });
}
Be("select", cn);
Be("date", ts);
Be("twostate", an);
Be("slider", un);
Be("counter", dn);
Be("links", es);
function Ms({
  api: t,
  items: n = [],
  css: s = "",
  layout: l = "default",
  readonly: o = !1,
  placement: W = "sidebar",
  bottomBar: h = !0,
  topBar: v = !0,
  autoSave: r = !0,
  focus: $ = !1,
  hotkeys: y = {}
}) {
  const K = ze(Ue.i18n), F = C(() => K || ot({ ...lt, ...dt }), [K]), S = C(() => F.getGroup("gantt"), [F]), k = F.getRaw(), d = C(() => {
    const g = k.gantt?.dateFormat || k.formats?.dateFormat;
    return rt(g, k.calendar);
  }, [k]), P = C(() => {
    if (v === !0 && !o) {
      const g = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: S("Delete"),
          id: "delete"
        }
      ];
      return r ? { items: g } : {
        items: [
          ...g,
          {
            comp: "button",
            type: "primary",
            text: S("Save"),
            id: "save"
          }
        ]
      };
    }
    return v;
  }, [v, o, r, S]), [j, N] = ge(!1), Z = C(
    () => j ? "wx-full-screen" : "",
    [j]
  ), b = _((g) => {
    N(g);
  }, []);
  ce(() => {
    const g = Gt(b);
    return g.observe(), () => {
      g.disconnect();
    };
  }, [b]);
  const A = Y(t, "_activeTask"), M = Y(t, "activeTask"), J = Y(t, "unscheduledTasks"), ee = Y(t, "links"), te = Y(t, "splitTasks"), ne = C(
    () => te && M?.segmentIndex,
    [te, M]
  ), se = C(
    () => ne || ne === 0,
    [ne]
  ), re = C(
    () => Tn({ unscheduledTasks: J }),
    [J]
  ), E = Y(t, "undo"), [D, x] = ge({}), [he, Q] = ge(null), [de, ie] = ge(), [me, Ne] = ge(null), Ie = Y(t, "taskTypes"), Le = C(() => {
    if (!A) return null;
    let g;
    if (se && A.segments ? g = { ...A.segments[ne] } : g = { ...A }, o) {
      let oe = { parent: g.parent };
      return re.forEach(({ key: xe, comp: X }) => {
        if (X !== "links") {
          const $e = g[xe];
          X === "date" && $e instanceof Date ? oe[xe] = d($e) : X === "slider" && xe === "progress" ? oe[xe] = `${$e}%` : oe[xe] = $e;
        }
      }), oe;
    }
    return g || null;
  }, [A, se, ne, o, re, d]);
  ce(() => {
    ie(Le);
  }, [Le]), ce(() => {
    x({}), Ne(null), Q(null);
  }, [M]);
  function Re(g, oe) {
    return g.map((xe) => {
      const X = { ...xe };
      if (xe.config && (X.config = { ...X.config }), X.comp === "links" && t && (X.api = t, X.autoSave = r, X.onLinksChange = f), X.comp === "select" && X.key === "type") {
        const $e = X.options ?? (Ie || []);
        X.options = $e.map((B) => ({
          ...B,
          label: S(B.label)
        }));
      }
      return X.comp === "slider" && X.key === "progress" && (X.labelTemplate = ($e) => `${S(X.label)} ${$e}%`), X.label && (X.label = S(X.label)), X.config?.placeholder && (X.config.placeholder = S(X.config.placeholder)), oe && (X.isDisabled && X.isDisabled(oe, t.getState()) ? X.disabled = !0 : delete X.disabled), X;
    });
  }
  const be = C(() => {
    let g = n.length ? n : re;
    return g = Re(g, de), de ? g.filter(
      (oe) => !oe.isHidden || !oe.isHidden(de, t.getState())
    ) : g;
  }, [n, re, de, Ie, S, t, r]), we = C(
    () => be.map((g) => g.key),
    [be]
  );
  function f({ id: g, action: oe, data: xe }) {
    x((X) => ({
      ...X,
      [g]: { action: oe, data: xe }
    }));
  }
  const O = _(() => {
    for (let g in D)
      if (ee.byId(g)) {
        const { action: oe, data: xe } = D[g];
        t.exec(oe, xe);
      }
  }, [t, D, ee]), q = _(() => {
    const g = M?.id || M;
    if (se) {
      if (A?.segments) {
        const oe = A.segments.filter(
          (xe, X) => X !== ne
        );
        t.exec("update-task", {
          id: g,
          task: { segments: oe }
        });
      }
    } else
      t.exec("delete-task", { id: g });
  }, [t, M, se, A, ne]), z = _(() => {
    t.exec("show-editor", { id: null });
  }, [t]), G = _(
    (g) => {
      const { item: oe, changes: xe } = g;
      oe.id === "delete" && q(), oe.id === "save" && (xe.length ? z() : O()), oe.comp && z();
    },
    [t, M, r, O, q, z]
  ), ye = _(
    (g, oe, xe) => (J && g.type === "summary" && (g.unscheduled = !1), Wt(g, t.getState(), oe), xe || Q(!1), g),
    [J, t]
  ), Ce = _(
    (g) => {
      g = {
        ...g,
        unscheduled: J && g.unscheduled && g.type !== "summary"
      }, delete g.links, delete g.data, (we.indexOf("duration") === -1 || g.segments && !g.duration) && delete g.duration;
      const oe = {
        id: M?.id || M,
        task: g,
        ...se && { segmentIndex: ne }
      };
      r && he && (oe.inProgress = he), t.exec("update-task", oe), r || O();
    },
    [
      t,
      M,
      J,
      r,
      O,
      we,
      se,
      ne,
      he
    ]
  ), m = _(
    (g) => {
      let { update: oe, key: xe, input: X } = g;
      if (X && Q(!0), g.update = ye({ ...oe }, xe, X), !r) ie(g.update);
      else if (!me && !X) {
        const $e = be.find((Te) => Te.key === xe), B = oe[xe];
        (!$e.validation || $e.validation(B)) && (!$e.required || B) && Ce(g.update);
      }
    },
    [r, ye, me, be, Ce]
  ), V = _(
    (g) => {
      r || Ce(g.values);
    },
    [r, Ce]
  ), ue = _((g) => {
    Ne(g.errors);
  }, []), ve = C(
    () => E ? {
      "ctrl+z": (g) => {
        g.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (g) => {
        g.preventDefault(), t.exec("redo");
      }
    } : {},
    [E, t]
  );
  return Le ? /* @__PURE__ */ u(ln, { children: /* @__PURE__ */ u(
    Dn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${Z} ${s}`,
      items: be,
      values: Le,
      topBar: P,
      bottomBar: h,
      placement: W,
      layout: l,
      readonly: o,
      autoSave: r,
      focus: $,
      onAction: G,
      onSave: V,
      onValidation: ue,
      onChange: m,
      hotkeys: y && { ...ve, ...y }
    }
  ) }) : null;
}
const Ss = ({ children: t, columns: n = null, api: s }) => {
  const [l, o] = ge(null);
  return ce(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ u($n, { api: l, columns: n, children: t });
};
function Ds(t) {
  const { api: n, content: s, children: l } = t, o = le(null), W = le(null), [h, v] = ge({}), [r, $] = ge(null), [y, K] = ge({});
  function F(b) {
    for (; b; ) {
      if (b.getAttribute) {
        const A = b.getAttribute("data-tooltip-id"), M = b.getAttribute("data-tooltip-at"), J = b.getAttribute("data-tooltip");
        if (A || J) return { id: A, tooltip: J, target: b, at: M };
      }
      b = b.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ce(() => {
    const b = W.current;
    if (b && y && (y.text || s)) {
      const A = b.getBoundingClientRect();
      let M = !1, J = y.left, ee = y.top;
      A.right >= h.right && (J = h.width - A.width - 5, M = !0), A.bottom >= h.bottom && (ee = y.top - (A.bottom - h.bottom + 2), M = !0), M && K((te) => te && { ...te, left: J, top: ee });
    }
  }, [y, h, s]);
  const S = le(null), k = 300, d = (b) => {
    clearTimeout(S.current), S.current = setTimeout(() => {
      b();
    }, k);
  };
  function P(b) {
    let { id: A, tooltip: M, target: J, at: ee } = F(b.target);
    if (K(null), $(null), !M)
      if (A)
        M = N(A);
      else {
        clearTimeout(S.current);
        return;
      }
    const te = b.clientX;
    d(() => {
      A && $(j(Z(A)));
      const ne = J.getBoundingClientRect(), se = o.current, re = se ? se.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let E, D;
      ee === "left" ? (E = ne.top + 5 - re.top, D = ne.right + 5 - re.left) : (E = ne.top + ne.height - re.top, D = te - re.left), v(re), K({ top: E, left: D, text: M });
    });
  }
  function j(b) {
    return n?.getTask(Z(b)) || null;
  }
  function N(b) {
    return j(b)?.text || "";
  }
  function Z(b) {
    const A = parseInt(b);
    return isNaN(A) ? b : A;
  }
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: P,
      children: [
        y && (y.text || s) ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: W,
            style: { top: `${y.top}px`, left: `${y.left}px` },
            children: s ? /* @__PURE__ */ u(s, { data: r }) : y.text ? /* @__PURE__ */ u("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: y.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function Rs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(vt, { fonts: t, children: n() }) : /* @__PURE__ */ u(vt, { fonts: t });
}
function Es({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(Ct, { fonts: t, children: n }) : /* @__PURE__ */ u(Ct, { fonts: t });
}
function Is({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u($t, { fonts: t, children: n }) : /* @__PURE__ */ u($t, { fonts: t });
}
export {
  $s as ContextMenu,
  Ms as Editor,
  vs as Gantt,
  Ss as HeaderMenu,
  Rs as Material,
  Cs as Toolbar,
  Ds as Tooltip,
  Es as Willow,
  Is as WillowDark,
  _s as defaultColumns,
  Ps as defaultEditorItems,
  Hs as defaultMenuOptions,
  Ws as defaultTaskTypes,
  As as defaultToolbarButtons,
  Os as getEditorItems,
  zs as getMenuOptions,
  Gs as getToolbarButtons,
  Xs as registerEditorItem,
  Us as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
