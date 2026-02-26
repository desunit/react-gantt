import { jsxs as He, jsx as d, Fragment as Je } from "react/jsx-runtime";
import { createContext as tn, useMemo as $, useState as me, useContext as ze, useCallback as N, useRef as le, useEffect as ae, Fragment as nn, forwardRef as At, useImperativeHandle as Ht } from "react";
import { context as Ue, Button as vt, Field as sn, Text as rn, Combo as on, DatePicker as ln, TimePicker as cn, Locale as an, RichSelect as un, TwoState as dn, Slider as fn, Counter as hn, Material as Ct, Willow as $t, WillowDark as Mt } from "@svar-ui/react-core";
import { locate as Ge, locateID as Ve, locateAttr as gn, dateToString as ot, locale as lt } from "@svar-ui/lib-dom";
import { en as it } from "@svar-ui/gantt-locales";
import { en as ft } from "@svar-ui/core-locales";
import { EventBusRouter as mn } from "@svar-ui/lib-state";
import { prepareEditTask as Wt, grid as wn, extendDragOptions as xn, isSegmentMoveAllowed as pn, DataStore as yn, normalizeLinks as kn, normalizeZoom as bn, defaultColumns as Tn, parseTaskDates as St, defaultTaskTypes as vn, getToolbarButtons as Dt, handleAction as Ot, isHandledAction as zt, getMenuOptions as Et, getEditorItems as Cn } from "@svar-ui/gantt-store";
import { defaultColumns as As, defaultEditorItems as Hs, defaultMenuOptions as Ws, defaultTaskTypes as Os, defaultToolbarButtons as zs, getEditorItems as Gs, getMenuOptions as Us, getToolbarButtons as Ys, registerScaleUnit as Xs } from "@svar-ui/gantt-store";
import { useWritableProp as dt, useStore as K, useStoreWithCounter as rt, writable as $n, useStoreLater as Ye } from "@svar-ui/lib-react";
import { hotkeys as Gt } from "@svar-ui/grid-store";
import { Grid as Mn, HeaderMenu as Sn } from "@svar-ui/react-grid";
import { flushSync as Dn } from "react-dom";
import { Toolbar as Rt } from "@svar-ui/react-toolbar";
import { ContextMenu as En } from "@svar-ui/react-menu";
import { Editor as Rn, registerEditorItem as qe } from "@svar-ui/react-editor";
import { registerEditorItem as Fs } from "@svar-ui/react-editor";
const Xe = tn(null);
function Fe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function In(t, n, s) {
  const l = t.getBoundingClientRect(), r = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: l.top - r.top,
    left: l.left - r.left,
    dt: l.bottom - s.clientY,
    db: s.clientY - l.top
  };
}
function It(t) {
  return t && t.getAttribute("data-context-id");
}
const Nt = 5;
function Nn(t, n) {
  let s, l, r, _, C, x, y, i, g;
  function V(T) {
    _ = T.clientX, C = T.clientY, x = {
      ...In(s, t, T),
      y: n.getTask(r).$y
    }, document.body.style.userSelect = "none";
  }
  function z(T) {
    s = Ge(T), It(s) && (r = Fe(s), g = setTimeout(() => {
      i = !0, n && n.touchStart && n.touchStart(), V(T.touches[0]);
    }, 500), t.addEventListener("touchmove", B), t.addEventListener("contextmenu", G), window.addEventListener("touchend", H));
  }
  function G(T) {
    if (i || g)
      return T.preventDefault(), !1;
  }
  function Z(T) {
    T.which === 1 && (s = Ge(T), It(s) && (r = Fe(s), t.addEventListener("mousemove", P), window.addEventListener("mouseup", L), V(T)));
  }
  function u(T) {
    t.removeEventListener("mousemove", P), t.removeEventListener("touchmove", B), document.body.removeEventListener("mouseup", L), document.body.removeEventListener("touchend", H), document.body.style.userSelect = "", T && (t.removeEventListener("mousedown", Z), t.removeEventListener("touchstart", z));
  }
  function M(T) {
    const J = T.clientX - _, ue = T.clientY - C;
    if (!l) {
      if (Math.abs(J) < Nt && Math.abs(ue) < Nt || n && n.start && n.start({ id: r, e: T }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = x.left + "px", l.style.top = x.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const ie = Math.round(Math.max(0, x.top + ue));
      if (n && n.move && n.move({ id: r, top: ie, detail: y }) === !1)
        return;
      const ne = n.getTask(r), ee = ne.$y;
      if (!x.start && x.y == ee) return A();
      x.start = !0, x.y = ne.$y - 4, l.style.top = ie + "px";
      const ge = document.elementFromPoint(
        T.clientX,
        T.clientY
      ), k = Ge(ge);
      if (k && k !== s) {
        const v = Fe(k), Q = k.getBoundingClientRect(), ce = Q.top + Q.height / 2, I = T.clientY + x.db > ce && k.nextElementSibling !== s, he = T.clientY - x.dt < ce && k.previousElementSibling !== s;
        y?.after == v || y?.before == v ? y = null : I ? y = { id: r, after: v } : he && (y = { id: r, before: v });
      }
    }
  }
  function P(T) {
    M(T);
  }
  function B(T) {
    i ? (T.preventDefault(), M(T.touches[0])) : g && (clearTimeout(g), g = null);
  }
  function H() {
    i = null, g && (clearTimeout(g), g = null), A();
  }
  function L() {
    A();
  }
  function A() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: r, top: x.top })), r = s = l = x = y = null, u();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", Z), t.addEventListener("touchstart", z), {
    destroy() {
      u(!0);
    }
  };
}
function Ln({ row: t, column: n }) {
  function s(r, _) {
    return {
      justifyContent: _.align,
      paddingLeft: `${(r.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ He("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ d(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ d("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ d("div", { className: "wx-pqc08MHU wx-text", children: l ? /* @__PURE__ */ d(l, { row: t, column: n }) : t.text })
  ] });
}
function Lt({ column: t, cell: n }) {
  const s = $(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ d("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ d(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function _n(t) {
  const {
    readonly: n,
    compactMode: s,
    width: l = 0,
    display: r = "all",
    columnWidth: _ = 0,
    onTableAPIChange: C,
    multiTaskRows: x = !1,
    rowMapping: y = null
  } = t, [i, g] = dt(_), [V, z] = me(), G = ze(Ue.i18n), Z = $(() => G.getGroup("gantt"), [G]), u = ze(Xe), M = K(u, "scrollTop"), P = K(u, "cellHeight"), B = K(u, "_scrollTask"), H = K(u, "_selected"), L = K(u, "area"), A = K(u, "_tasks"), T = K(u, "_scales"), J = K(u, "columns"), ue = K(u, "_sort"), ie = K(u, "calendar"), ne = K(u, "durationUnit"), ee = K(u, "splitTasks"), [ge, k] = me(null), v = $(() => !A || !L ? [] : x && y ? A : A.slice(L.start, L.end), [A, L, x, y]), Q = N(
    (o, w) => {
      if (w === "add-task")
        u.exec(w, {
          target: o,
          task: { text: Z("New Task") },
          mode: "child",
          show: !0
        });
      else if (w === "open-task") {
        const D = v.find((O) => O.id === o);
        (D?.data || D?.lazy) && u.exec(w, { id: o, mode: !D.open });
      }
    },
    [v]
  ), ce = N(
    (o) => {
      const w = Ve(o), D = o.target.dataset.action;
      D && o.preventDefault(), w ? D === "add-task" || D === "open-task" ? Q(w, D) : u.exec("select-task", {
        id: w,
        toggle: o.ctrlKey || o.metaKey,
        range: o.shiftKey,
        show: !0
      }) : D === "add-task" && Q(null, D);
    },
    [u, Q]
  ), I = le(null), he = le(null), [se, ke] = me(0), [ve, Me] = me(!1);
  ae(() => {
    const o = he.current;
    if (!o || typeof ResizeObserver > "u") return;
    const w = () => ke(o.clientWidth);
    w();
    const D = new ResizeObserver(w);
    return D.observe(o), () => D.disconnect();
  }, []);
  const Re = le(null), De = N(
    (o) => {
      const w = o.id, { before: D, after: O } = o, ye = o.onMove;
      let pe = D || O, Ee = D ? "before" : "after";
      if (ye) {
        if (Ee === "after") {
          const Pe = u.getTask(pe);
          Pe.data?.length && Pe.open && (Ee = "before", pe = Pe.data[0].id);
        }
        Re.current = { id: w, [Ee]: pe };
      } else Re.current = null;
      u.exec("move-task", {
        id: w,
        mode: Ee,
        target: pe,
        inProgress: ye
      });
    },
    [u]
  ), Ce = $(() => x && y ? 0 : L?.from ?? 0, [L, x, y]), Ie = $(() => T?.height ?? 0, [T]), Ne = $(() => !s && r !== "grid" ? (i ?? 0) > (l ?? 0) : (i ?? 0) > (se ?? 0), [s, r, i, l, se]), fe = $(() => {
    const o = {};
    return Ne && r === "all" || r === "grid" && Ne ? o.width = i : r === "grid" && (o.width = "100%"), o;
  }, [Ne, r, i]), m = $(() => ge && !v.find((o) => o.id === ge.id) ? [...v, ge] : v, [v, ge]), W = $(() => {
    if (!x || !y) return m;
    const o = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Set();
    return m.forEach((D) => {
      const O = y.taskRows.get(D.id) ?? D.id;
      w.has(O) || (o.set(O, {
        ...D,
        $rowTasks: y.rowMap.get(O) || [D.id]
      }), w.add(O));
    }), Array.from(o.values());
  }, [m, x, y]), U = $(() => {
    let o = (J || []).map((O) => {
      O = { ...O };
      const ye = O.header;
      if (typeof ye == "object") {
        const pe = ye.text && Z(ye.text);
        O.header = { ...ye, text: pe };
      } else O.header = Z(ye);
      return O;
    });
    const w = o.findIndex((O) => O.id === "text"), D = o.findIndex((O) => O.id === "add-task");
    if (w !== -1 && (o[w].cell && (o[w]._cell = o[w].cell), o[w].cell = Ln), D !== -1) {
      o[D].cell = o[D].cell || Lt;
      const O = o[D].header;
      if (typeof O != "object" && (o[D].header = { text: O }), o[D].header.cell = O.cell || Lt, n)
        o.splice(D, 1);
      else if (s) {
        const [ye] = o.splice(D, 1);
        o.unshift(ye);
      }
    }
    return o.length > 0 && (o[o.length - 1].resize = !1), o;
  }, [J, Z, n, s]), F = $(() => r === "all" ? `${l}px` : r === "grid" ? "calc(100% - 4px)" : U.find((o) => o.id === "add-task") ? "50px" : "0", [r, l, U]), q = $(() => {
    if (W && ue?.length) {
      const o = {};
      return ue.forEach(({ key: w, order: D }, O) => {
        o[w] = {
          order: D,
          ...ue.length > 1 && { index: O }
        };
      }), o;
    }
    return {};
  }, [W, ue]), xe = N(() => U.some((o) => o.flexgrow && !o.hidden), []), $e = $(() => xe(), [xe, ve]), p = $(() => {
    let o = r === "chart" ? U.filter((D) => D.id === "add-task") : U;
    const w = r === "all" ? l : se;
    if (!$e) {
      let D = i, O = !1;
      if (U.some((ye) => ye.$width)) {
        let ye = 0;
        D = U.reduce((pe, Ee) => (Ee.hidden || (ye += Ee.width, pe += Ee.$width || Ee.width), pe), 0), ye > D && D > w && (O = !0);
      }
      if (O || D < w) {
        let ye = 1;
        return O || (ye = (w - 50) / (D - 50 || 1)), o.map((pe) => (pe.id !== "add-task" && !pe.hidden && (pe.$width || (pe.$width = pe.width), pe.width = pe.$width * ye), pe));
      }
    }
    return o;
  }, [r, U, $e, i, l, se]), j = N(
    (o) => {
      if (!xe()) {
        const w = p.reduce((D, O) => (o && O.$width && (O.$width = O.width), D + (O.hidden ? 0 : O.width)), 0);
        w !== i && g(w);
      }
      Me(!0), Me(!1);
    },
    [xe, p, i, g]
  ), f = N(() => {
    U.filter((w) => w.flexgrow && !w.hidden).length === 1 && U.forEach((w) => {
      w.$width && !w.flexgrow && !w.hidden && (w.width = w.$width);
    });
  }, []), X = N(
    (o) => {
      if (!n) {
        const w = Ve(o), D = gn(o, "data-col-id");
        !(D && U.find((ye) => ye.id == D))?.editor && w && u.exec("show-editor", { id: w });
      }
    },
    [u, n]
    // cols is defined later; relies on latest value at call time
  ), te = $(
    () => Array.isArray(H) ? H.map((o) => o.id) : [],
    [H]
  ), Y = le(Ce);
  Y.current = Ce, ae(() => {
    const o = (D) => {
      if (I.current) {
        const O = I.current.querySelector(".wx-body");
        O && (O.style.top = -((D ?? 0) - (Y.current ?? 0)) + "px");
      }
      he.current && (he.current.scrollTop = 0);
    };
    return o(M), u.on("scroll-chart", ({ top: D }) => {
      D !== void 0 && o(D);
    });
  }, [u, M]), ae(() => {
    if (I.current) {
      const o = I.current.querySelector(".wx-body");
      o && (o.style.top = -((M ?? 0) - (Ce ?? 0)) + "px");
    }
  }, [Ce]), ae(() => {
    const o = I.current;
    if (!o) return;
    const w = o.querySelector(".wx-table-box .wx-body");
    if (!w || typeof ResizeObserver > "u") return;
    const D = new ResizeObserver(() => {
      if (I.current) {
        const O = I.current.querySelector(".wx-body");
        O && (O.style.top = -((M ?? 0) - (Y.current ?? 0)) + "px");
      }
    });
    return D.observe(w), () => {
      D.disconnect();
    };
  }, [p, fe, r, F, W, M]), ae(() => {
    if (!B || !V) return;
    const { id: o } = B, w = V.getState().focusCell;
    w && w.row !== o && I.current && I.current.contains(document.activeElement) && V.exec("focus-cell", {
      row: o,
      column: w.column
    });
  }, [B, V]);
  const Se = N(
    ({ id: o }) => {
      if (n) return !1;
      u.getTask(o).open && u.exec("open-task", { id: o, mode: !1 });
      const w = u.getState()._tasks.find((D) => D.id === o);
      if (k(w || null), !w) return !1;
    },
    [u, n]
  ), _e = N(
    ({ id: o, top: w }) => {
      Re.current ? De({ ...Re.current, onMove: !1 }) : u.exec("drag-task", {
        id: o,
        top: w + (Ce ?? 0),
        inProgress: !1
      }), k(null);
    },
    [u, De, Ce]
  ), Oe = N(
    ({ id: o, top: w, detail: D }) => {
      D && De({ ...D, onMove: !0 }), u.exec("drag-task", {
        id: o,
        top: w + (Ce ?? 0),
        inProgress: !0
      });
    },
    [u, De, Ce]
  );
  ae(() => {
    const o = I.current;
    return o ? Nn(o, {
      start: Se,
      end: _e,
      move: Oe,
      getTask: u.getTask
    }).destroy : void 0;
  }, [u, Se, _e, Oe]);
  const re = N(
    (o) => {
      const { key: w, isInput: D } = o;
      if (!D && (w === "arrowup" || w === "arrowdown"))
        return o.eventSource = "grid", u.exec("hotkey", o), !1;
      if (w === "enter") {
        const O = V?.getState().focusCell;
        if (O) {
          const { row: ye, column: pe } = O;
          pe === "add-task" ? Q(ye, "add-task") : pe === "text" && Q(ye, "open-task");
        }
      }
    },
    [u, Q, V]
  ), we = le(null), Te = () => {
    we.current = {
      setTableAPI: z,
      handleHotkey: re,
      sortVal: ue,
      api: u,
      adjustColumns: f,
      setColumnWidth: j,
      tasks: v,
      calendarVal: ie,
      durationUnitVal: ne,
      splitTasksVal: ee,
      onTableAPIChange: C
    };
  };
  Te(), ae(() => {
    Te();
  }, [
    z,
    re,
    ue,
    u,
    f,
    j,
    v,
    ie,
    ne,
    ee,
    C
  ]);
  const We = N((o) => {
    z(o), o.intercept("hotkey", (w) => we.current.handleHotkey(w)), o.intercept("scroll", () => !1), o.intercept("select-row", () => !1), o.intercept("sort-rows", (w) => {
      const D = we.current.sortVal, { key: O, add: ye } = w, pe = D ? D.find((Pe) => Pe.key === O) : null;
      let Ee = "asc";
      return pe && (Ee = !pe || pe.order === "asc" ? "desc" : "asc"), u.exec("sort-tasks", {
        key: O,
        order: Ee,
        add: ye
      }), !1;
    }), o.on("resize-column", () => {
      we.current.setColumnWidth(!0);
    }), o.on("hide-column", (w) => {
      w.mode || we.current.adjustColumns(), we.current.setColumnWidth();
    }), o.intercept("update-cell", (w) => {
      const { id: D, column: O, value: ye } = w, pe = we.current.tasks.find((Ee) => Ee.id === D);
      if (pe) {
        const Ee = { ...pe };
        let Pe = ye;
        Pe && !isNaN(Pe) && !(Pe instanceof Date) && (Pe *= 1), Ee[O] = Pe, Wt(
          Ee,
          {
            calendar: we.current.calendarVal,
            durationUnit: we.current.durationUnitVal,
            splitTasks: we.current.splitTasksVal
          },
          O
        ), u.exec("update-task", {
          id: D,
          task: Ee
        });
      }
      return !1;
    }), C && C(o);
  }, []);
  return /* @__PURE__ */ d(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${F}` },
      ref: he,
      children: /* @__PURE__ */ d(
        "div",
        {
          ref: I,
          style: fe,
          className: "wx-rHj6070p wx-table",
          onClick: ce,
          onDoubleClick: X,
          children: /* @__PURE__ */ d(
            Mn,
            {
              init: We,
              sizes: {
                rowHeight: P,
                headerHeight: (Ie ?? 0) - 1
              },
              rowStyle: (o) => o.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (o) => `wx-rHj6070p wx-text-${o.align}${o.id === "add-task" ? " wx-action" : ""}`,
              data: W,
              columns: p,
              selectedRows: [...te],
              sortMarks: q
            }
          )
        }
      )
    }
  );
}
function Pn({ borders: t = "" }) {
  const n = ze(Xe), s = K(n, "cellWidth"), l = K(n, "cellHeight"), r = le(null), [_, C] = me("#e4e4e4");
  ae(() => {
    if (typeof getComputedStyle < "u" && r.current) {
      const y = getComputedStyle(r.current).getPropertyValue(
        "--wx-gantt-border"
      );
      C(y ? y.substring(y.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const x = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${wn(s, l, _, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ d("div", { ref: r, style: x });
}
function An({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = ze(Xe), r = K(l, "_links"), _ = K(l, "criticalPath"), C = le(null), x = N(
    (y) => {
      const i = y?.target?.classList;
      !i?.contains("wx-line") && !i?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return ae(() => {
    if (!s && n && C.current) {
      const y = (i) => {
        C.current && !C.current.contains(i.target) && x(i);
      };
      return document.addEventListener("click", y), () => {
        document.removeEventListener("click", y);
      };
    }
  }, [s, n, x]), /* @__PURE__ */ He("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (r || []).map((y) => {
      const i = "wx-dkx3NwEn wx-line" + (_ && y.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ d(
        "polyline",
        {
          className: i,
          points: y.$p,
          onClick: () => !s && t(y.id),
          "data-link-id": y.id
        },
        y.id
      );
    }),
    !s && n && /* @__PURE__ */ d(
      "polyline",
      {
        ref: C,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function Hn(t) {
  const { task: n, type: s } = t;
  function l(_) {
    const C = n.segments[_];
    return {
      left: `${C.$x}px`,
      top: "0px",
      width: `${C.$w}px`,
      height: "100%"
    };
  }
  function r(_) {
    if (!n.progress) return 0;
    const C = n.duration * n.progress / 100, x = n.segments;
    let y = 0, i = 0, g = null;
    do {
      const V = x[i];
      i === _ && (y > C ? g = 0 : g = Math.min((C - y) / V.duration, 1) * 100), y += V.duration, i++;
    } while (g === null && i < x.length);
    return g || 0;
  }
  return /* @__PURE__ */ d("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((_, C) => /* @__PURE__ */ He(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": C,
      style: l(C),
      children: [
        n.progress ? /* @__PURE__ */ d("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ d(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${r(C)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ d("div", { className: "wx-content", children: _.text || "" })
      ]
    },
    C
  )) });
}
let Ze = [], ut = null, _t = null;
const Pt = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: l, lengthUnit: r } = n, _ = 864e5, C = r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1, x = Math.floor(t / l), y = new Date(s.getTime() + x * C * _);
  return y.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: x,
    scalesStart: s.toISOString(),
    result: y.toISOString()
  }), y;
}, Wn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: l } = s, C = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / C);
}, On = (t, n, s) => {
  if (!s || !t)
    return console.log("[addCells] early return:", { scales: !!s, date: t?.toISOString?.() }), t;
  const { lengthUnit: l } = s, C = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5, x = new Date(t.getTime() + n * C);
  return x.setUTCHours(0, 0, 0, 0), console.log("[addCells]", { date: t.toISOString(), cells: n, lengthUnit: l, result: x.toISOString() }), x;
}, zn = (t, n, s, l) => t < l && n > s;
function Gn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: r = null,
    marqueeSelect: _ = !1,
    copyPaste: C = !1,
    allowTaskIntersection: x = !0,
    summaryBarCounts: y = !1
  } = t, i = ze(Xe), [g, V] = rt(i, "_tasks"), [z, G] = rt(i, "_links"), Z = K(i, "area"), u = K(i, "_scales"), M = K(i, "taskTypes"), P = $(() => {
    if (!u || !u.start) return u;
    const e = new Date(Date.UTC(
      u.start.getFullYear(),
      u.start.getMonth(),
      u.start.getDate()
    )), c = e.getUTCDay(), a = c === 0 ? -6 : 1 - c, h = new Date(e.getTime() + a * 864e5);
    return h.setUTCHours(0, 0, 0, 0), console.log("[scales-normalize]", {
      raw: u.start.toISOString(),
      utc: e.toISOString(),
      dayOfWeek: c,
      daysToMonday: a,
      monday: h.toISOString()
    }), { ...u, start: h };
  }, [u]), B = K(i, "baselines"), [H, L] = rt(i, "_selected"), A = K(i, "_scrollTask"), T = K(i, "criticalPath"), J = K(i, "tasks"), ue = K(i, "schedule"), ie = K(i, "splitTasks"), ne = $(() => {
    if (!Z || !Array.isArray(g)) return [];
    const e = Z.start ?? 0, c = Z.end ?? 0;
    return l && r ? g.map((a) => ({ ...a })) : g.slice(e, c).map((a) => ({ ...a }));
  }, [V, Z, l, r]), ee = K(i, "cellHeight"), ge = $(() => {
    if (!l || !r || !ne.length) return ne;
    const e = /* @__PURE__ */ new Map(), c = [];
    return g.forEach((a) => {
      const h = r.taskRows.get(a.id) ?? a.id;
      e.has(h) || (e.set(h, c.length), c.push(h));
    }), ne.map((a) => {
      const h = r.taskRows.get(a.id) ?? a.id, E = e.get(h) ?? 0;
      return {
        ...a,
        $y: E * ee,
        $y_base: a.$y_base !== void 0 ? E * ee : void 0
      };
    });
  }, [ne, l, r, g, ee]), k = $(
    () => P.lengthUnitWidth,
    [P]
  ), v = $(
    () => P.lengthUnit || "day",
    [P]
  ), Q = $(() => {
    if (!y || !g?.length || !k) return null;
    const e = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
    g.forEach((h) => {
      h.type === "summary" && c.add(h.id), h.parent && h.parent !== 0 && h.type !== "summary" && (e.has(h.parent) || e.set(h.parent, []), e.get(h.parent).push(h));
    });
    const a = /* @__PURE__ */ new Map();
    return c.forEach((h) => {
      const E = e.get(h);
      if (!E?.length) return;
      const S = /* @__PURE__ */ new Map();
      E.forEach((b) => {
        if (b.$x == null || b.$w == null) return;
        const R = Math.floor(b.$x / k), oe = Math.ceil((b.$x + b.$w) / k);
        for (let de = R; de < oe; de++)
          S.set(de, (S.get(de) || 0) + 1);
      }), S.size > 0 && a.set(h, S);
    }), a;
  }, [y, g, k]), ce = le(!1), [I, he] = me(void 0), [se, ke] = me(null), ve = le(null), [Me, Re] = me(null), [De, Ce] = me(void 0), Ie = le(null), [Ne, fe] = me(0), [m, W] = me(null), U = le(null), [F, q] = me(null), [xe, $e] = me(null), [p, j] = me(null), f = le(null);
  f.current = xe;
  const X = le(200), te = le(null), Y = $(() => {
    const e = te.current;
    return !!(H.length && e && e.contains(document.activeElement));
  }, [H, te.current]), Se = $(() => Y && H[H.length - 1]?.id, [Y, H]);
  ae(() => {
    if (A && Y && A) {
      const { id: e } = A, c = te.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [A]), ae(() => {
    const e = te.current;
    if (e && (fe(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((a) => {
        a[0] && fe(a[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [te.current]);
  const _e = N(() => {
    document.body.style.userSelect = "none";
  }, []), Oe = N(() => {
    document.body.style.userSelect = "";
  }, []), re = N(
    (e, c, a) => {
      if (c.target.classList.contains("wx-line") || (a || (a = i.getTask(Fe(e))), a.type === "milestone" || a.type === "summary")) return "";
      const h = Ge(c, "data-segment");
      h && (e = h);
      const { left: E, width: S } = e.getBoundingClientRect(), b = (c.clientX - E) / S;
      let R = 0.2 / (S > 200 ? S / 200 : 1);
      return b < R ? "start" : b > 1 - R ? "end" : "";
    },
    [i]
  ), we = $(() => {
    const e = /* @__PURE__ */ new Set();
    if (x || !l || !r)
      return e;
    const c = /* @__PURE__ */ new Map();
    return g.forEach((a) => {
      if (a.type === "summary" || a.type === "milestone") return;
      const h = r.taskRows.get(a.id) ?? a.id;
      c.has(h) || c.set(h, []), c.get(h).push(a);
    }), c.forEach((a) => {
      if (!(a.length < 2))
        for (let h = 0; h < a.length; h++)
          for (let E = h + 1; E < a.length; E++) {
            const S = a[h], b = a[E], R = S.$x, oe = S.$x + S.$w, de = b.$x, be = b.$x + b.$w;
            zn(R, oe, de, be) && (e.add(S.id), e.add(b.id));
          }
    }), e;
  }, [x, l, r, g, V]), Te = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !r)
      return g.forEach((h) => {
        e.set(h.id, h.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return g.forEach((h) => {
      const E = r.taskRows.get(h.id) ?? h.id;
      c.has(E) || (c.set(E, a.length), a.push(E));
    }), g.forEach((h) => {
      const E = r.taskRows.get(h.id) ?? h.id, S = c.get(E) ?? 0;
      e.set(h.id, S * ee);
    }), e;
  }, [g, l, r, ee]), We = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !r)
      return g.forEach((h) => {
        e.set(h.id, h.$y), h.row !== void 0 && e.set(h.row, h.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return g.forEach((h) => {
      const E = r.taskRows.get(h.id) ?? h.id;
      c.has(E) || (c.set(E, a.length), a.push(E));
    }), c.forEach((h, E) => {
      e.set(E, h * ee);
    }), e;
  }, [g, l, r, ee]), o = N(
    (e) => {
      if (!te.current) return [];
      const a = Math.min(e.startX, e.currentX), h = Math.max(e.startX, e.currentX), E = Math.min(e.startY, e.currentY), S = Math.max(e.startY, e.currentY);
      return g.filter((b) => {
        const R = b.$x, oe = b.$x + b.$w, be = Te.get(b.id) ?? b.$y, Le = be + b.$h;
        return R < h && oe > a && be < S && Le > E;
      });
    },
    [g, Te]
  ), w = $(() => new Set(H.map((e) => e.id)), [H, L]), D = N(
    (e) => w.has(e),
    [w]
  ), O = N(
    (e, c) => {
      const { clientX: a } = c, h = Fe(e), E = i.getTask(h), S = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (S.contains("wx-progress-marker")) {
          const { progress: b } = i.getTask(h);
          ve.current = {
            id: h,
            x: a,
            progress: b,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const b = re(e, c, E) || "move", R = {
            id: h,
            mode: b,
            x: a,
            dx: 0,
            l: E.$x,
            w: E.$w
          };
          if (ie && E.segments?.length) {
            const oe = Ge(c, "data-segment");
            oe && (R.segmentIndex = oe.dataset.segment * 1, xn(E, R));
          }
          ke(R);
        }
        _e();
      }
    },
    [i, n, re, _e, ie]
  ), ye = N(
    (e) => {
      if (e.button !== 0 || p) return;
      const c = Ge(e);
      if (!c && _ && !n) {
        const a = te.current;
        if (!a) return;
        const h = a.getBoundingClientRect(), E = e.clientX - h.left, S = e.clientY - h.top;
        if (C) {
          const R = Pt(E, P);
          R && (f.current = R, $e(R));
        }
        const b = {
          startX: E,
          startY: S,
          currentX: E,
          currentY: S,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        W(b), U.current = b, _e();
        return;
      }
      if (c) {
        if (_ && !n && H.length > 1) {
          const a = Fe(c);
          if (D(a)) {
            const h = e.target.classList;
            if (!h.contains("wx-link") && !h.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const E = i.getTask(a);
              if (!re(c, e, E)) {
                const b = /* @__PURE__ */ new Map();
                H.forEach((R) => {
                  const oe = i.getTask(R.id);
                  if (oe) {
                    if (ue?.auto && oe.type === "summary") return;
                    b.set(R.id, {
                      $x: oe.$x,
                      $w: oe.$w,
                      start: oe.start,
                      end: oe.end
                    });
                  }
                }), q({
                  baseTaskId: a,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: b
                }), _e();
                return;
              }
            }
          }
        }
        O(c, e);
      }
    },
    [O, _, C, n, H, D, i, re, ue, _e, P, p]
  ), pe = N(
    (e) => {
      const c = Ge(e);
      c && (Ie.current = setTimeout(() => {
        Ce(!0), O(c, e.touches[0]);
      }, 300));
    },
    [O]
  ), Ee = N(
    (e) => {
      Re(e && { ...z.find((c) => c.id === e) });
    },
    [z]
  ), Pe = N(() => {
    const e = U.current;
    if (e) {
      const c = o(e);
      e.ctrlKey ? c.forEach((a) => {
        i.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (H.length > 0 && i.exec("select-task", { id: null, marquee: !0 }), c.forEach((a, h) => {
        i.exec("select-task", {
          id: a.id,
          toggle: h > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), W(null), U.current = null, Oe(), ce.current = !0;
      return;
    }
    if (F) {
      const { dx: c, originalPositions: a } = F, h = Math.round(c / k);
      if (h !== 0) {
        let E = !0;
        a.forEach((S, b) => {
          const R = i.getTask(b);
          R && (i.exec("update-task", {
            id: b,
            diff: h,
            task: { start: R.start, end: R.end },
            skipUndo: !E
            // Only first task creates undo entry
          }), E = !1);
        }), ce.current = !0;
      } else
        a.forEach((E, S) => {
          i.exec("drag-task", {
            id: S,
            left: E.$x,
            width: E.$w,
            inProgress: !1
          });
        });
      q(null), Oe();
      return;
    }
    if (ve.current) {
      const { dx: c, id: a, marker: h, value: E } = ve.current;
      ve.current = null, typeof E < "u" && c && i.exec("update-task", {
        id: a,
        task: { progress: E },
        inProgress: !1
      }), h.classList.remove("wx-progress-in-drag"), ce.current = !0, Oe();
    } else if (se) {
      const { id: c, mode: a, dx: h, l: E, w: S, start: b, segment: R, index: oe } = se;
      if (ke(null), b) {
        const de = Math.round(h / k);
        if (!de)
          i.exec("drag-task", {
            id: c,
            width: S,
            left: E,
            inProgress: !1,
            ...R && { segmentIndex: oe }
          });
        else {
          let be = {}, Le = i.getTask(c);
          R && (Le = Le.segments[oe]);
          const Be = 1440 * 60 * 1e3, Ae = de * (v === "week" ? 7 : v === "month" ? 30 : v === "quarter" ? 91 : v === "year" ? 365 : 1) * Be;
          a === "move" ? (be.start = new Date(Le.start.getTime() + Ae), be.end = new Date(Le.end.getTime() + Ae)) : a === "start" ? (be.start = new Date(Le.start.getTime() + Ae), be.end = Le.end) : a === "end" && (be.start = Le.start, be.end = new Date(Le.end.getTime() + Ae)), i.exec("update-task", {
            id: c,
            task: be,
            ...R && { segmentIndex: oe }
          });
        }
        ce.current = !0;
      }
      Oe();
    }
  }, [i, Oe, se, k, v, m, F, o, H]), et = N(
    (e, c) => {
      const { clientX: a, clientY: h } = c, E = te.current;
      if (E) {
        const S = E.getBoundingClientRect();
        X.current = a - S.left;
      }
      if (p) {
        if (!E) return;
        const S = E.getBoundingClientRect(), b = a - S.left;
        j((R) => ({ ...R, currentX: b }));
        return;
      }
      if (!n) {
        if (m) {
          const S = te.current;
          if (!S) return;
          const b = S.getBoundingClientRect(), R = a - b.left, oe = h - b.top;
          W((de) => ({
            ...de,
            currentX: R,
            currentY: oe
          })), U.current && (U.current.currentX = R, U.current.currentY = oe);
          return;
        }
        if (F) {
          const S = a - F.startX;
          F.originalPositions.forEach((b, R) => {
            const oe = b.$x + S;
            i.exec("drag-task", {
              id: R,
              left: oe,
              width: b.$w,
              inProgress: !0
            });
          }), q((b) => ({ ...b, dx: S }));
          return;
        }
        if (ve.current) {
          const { node: S, x: b, id: R } = ve.current, oe = ve.current.dx = a - b, de = Math.round(oe / S.offsetWidth * 100);
          let be = ve.current.progress + de;
          ve.current.value = be = Math.min(
            Math.max(0, be),
            100
          ), i.exec("update-task", {
            id: R,
            task: { progress: be },
            inProgress: !0
          });
        } else if (se) {
          Ee(null);
          const { mode: S, l: b, w: R, x: oe, id: de, start: be, segment: Le, index: Be } = se, Ke = i.getTask(de), Ae = a - oe;
          if (!be && Math.abs(Ae) < 20 || S === "start" && R - Ae < k || S === "end" && R + Ae < k || S === "move" && (Ae < 0 && b + Ae < 0 || Ae > 0 && b + R + Ae > Ne) || se.segment && !pn(Ke, se))
            return;
          const st = { ...se, dx: Ae };
          let je, Qe;
          if (S === "start" ? (je = b + Ae, Qe = R - Ae) : S === "end" ? (je = b, Qe = R + Ae) : S === "move" && (je = b + Ae, Qe = R), i.exec("drag-task", {
            id: de,
            width: Qe,
            left: je,
            inProgress: !0,
            ...Le && { segmentIndex: Be }
          }), !st.start && (S === "move" && Ke.$x == b || S !== "move" && Ke.$w == R)) {
            ce.current = !0, Pe();
            return;
          }
          st.start = !0, ke(st);
        } else {
          const S = Ge(e);
          if (S) {
            const b = i.getTask(Fe(S)), oe = Ge(e, "data-segment") || S, de = re(oe, c, b);
            oe.style.cursor = de && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      n,
      se,
      k,
      Ne,
      re,
      Ee,
      Pe,
      m,
      F,
      p
    ]
  ), Xt = N(
    (e) => {
      et(e, e);
    },
    [et]
  ), Kt = N(
    (e) => {
      De ? (e.preventDefault(), et(e, e.touches[0])) : Ie.current && (clearTimeout(Ie.current), Ie.current = null);
    },
    [De, et]
  ), ct = N(() => {
    Pe();
  }, [Pe]), Ft = N(() => {
    Ce(null), Ie.current && (clearTimeout(Ie.current), Ie.current = null), Pe();
  }, [Pe]);
  ae(() => (window.addEventListener("mouseup", ct), () => {
    window.removeEventListener("mouseup", ct);
  }), [ct]);
  const Bt = N(
    (e) => {
      if (!n) {
        const c = Ve(e.target);
        if (c && !e.target.classList.contains("wx-link")) {
          const a = Ve(e.target, "data-segment");
          i.exec("show-editor", {
            id: c,
            ...a !== null && { segmentIndex: a }
          });
        }
      }
    },
    [i, n]
  ), Vt = ["e2s", "s2s", "e2e", "s2e"], tt = N((e, c) => Vt[(e ? 1 : 0) + (c ? 0 : 2)], []), nt = N(
    (e, c) => {
      const a = I.id, h = I.start;
      return e === a ? !0 : !!z.find((E) => E.target == e && E.source == a && E.type === tt(h, c));
    },
    [I, G, tt]
  ), ht = N(() => {
    I && he(null);
  }, [I]), gt = N((e, c, a) => {
    if (!c.length || !e || a == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: e.toISOString(),
      taskCount: c.length,
      parent: a
    });
    const h = 864e5, E = i.getHistory();
    E?.startBatch();
    const S = new Date(e);
    S.setUTCHours(0, 0, 0, 0), console.log("[paste] scalesValue:", {
      start: P?.start?.toISOString?.(),
      lengthUnit: P?.lengthUnit,
      lengthUnitWidth: P?.lengthUnitWidth
    }), c.forEach((b, R) => {
      const oe = `task-${Date.now()}-${R}`;
      console.log("[paste] task input:", {
        text: b.text,
        _startCellOffset: b._startCellOffset,
        _startDayOfWeek: b._startDayOfWeek,
        _durationDays: b._durationDays,
        start: b.start?.toISOString?.(),
        end: b.end?.toISOString?.()
      });
      const de = On(S, b._startCellOffset || 0, P);
      console.log("[paste] cellOffset:", de?.toISOString?.());
      const be = new Date(de.getTime() + (b._startDayOfWeek || 0) * h);
      be.setUTCHours(0, 0, 0, 0);
      const Le = new Date(be.getTime() + (b._durationDays || 7) * h);
      Le.setUTCHours(0, 0, 0, 0), console.log("[paste] task calculated:", {
        text: b.text,
        newStart: be.toISOString(),
        newEnd: Le.toISOString(),
        row: b.row
      }), i.exec("add-task", {
        task: {
          id: oe,
          text: b.text,
          start: be,
          end: Le,
          type: b.type || "task",
          parent: a,
          row: b.row
        },
        target: a,
        mode: "child",
        skipUndo: R > 0
      });
    }), E?.endBatch();
  }, [i, P]), qt = N(
    (e) => {
      if (ce.current) {
        ce.current = !1;
        return;
      }
      if (p && p.currentX != null) {
        const a = Pt(p.currentX, P);
        a && gt(a, p.tasks, p.parent), j(null);
        return;
      }
      const c = Ve(e.target);
      if (c) {
        const a = i.getTask(c), h = g.find((S) => S.id === c);
        console.log("[click] task:", a?.text, "id:", c), console.log("[click] api.getTask:", { start: a?.start, end: a?.end, duration: a?.duration }), console.log("[click] rendered:", { start: h?.start, end: h?.end, $w: h?.$w, $x: h?.$x });
        const E = e.target.classList;
        if (E.contains("wx-link")) {
          const S = E.contains("wx-left");
          if (!I) {
            he({ id: c, start: S });
            return;
          }
          I.id !== c && !nt(c, S) && i.exec("add-link", {
            link: {
              source: I.id,
              target: c,
              type: tt(I.start, S)
            }
          });
        } else if (E.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: Me.id }), Re(null);
        else {
          let S;
          const b = Ge(e, "data-segment");
          b && (S = b.dataset.segment * 1), i.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: S
          });
        }
      }
      ht();
    },
    [
      i,
      I,
      G,
      Me,
      nt,
      tt,
      ht,
      p,
      P,
      gt
    ]
  ), jt = N((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Qt = N((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Zt = N(
    (e) => {
      if (De || Ie.current)
        return e.preventDefault(), !1;
    },
    [De]
  ), mt = $(
    () => M.map((e) => e.id),
    [M]
  ), wt = N(
    (e) => {
      let c = mt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [mt]
  ), xt = N(
    (e) => {
      i.exec(e.action, e.data);
    },
    [i]
  ), at = N(
    (e) => T && J.byId(e).$critical,
    [T, J]
  ), pt = N(
    (e) => {
      if (ue?.auto) {
        const c = J.getSummaryId(e, !0), a = J.getSummaryId(I.id, !0);
        return I?.id && !(Array.isArray(c) ? c : [c]).includes(
          I.id
        ) && !(Array.isArray(a) ? a : [a]).includes(e);
      }
      return I;
    },
    [ue, J, I]
  ), yt = N(() => {
    const e = i.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, a = e.map((R) => {
      const oe = i.getTask(R.id);
      if (!oe) return null;
      const de = g.find((en) => en.id === R.id);
      if (!de) return null;
      const { $x: be, $y: Le, $h: Be, $w: Ke, $skip: Ae, $level: st, $index: je, $y_base: Qe, $x_base: rs, $w_base: os, $h_base: ls, $skip_baseline: is, $critical: cs, $reorder: as, ...Jt } = de, bt = de.end && de.start ? Math.round((de.end.getTime() - de.start.getTime()) / c) : 0, Tt = de.start ? (de.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: oe.id,
        text: oe.text,
        start: de.start?.toISOString?.(),
        end: de.end?.toISOString?.(),
        durationDays: bt,
        startDayOfWeek: Tt,
        $w: Ke,
        $h: Be,
        row: de.row,
        parent: de.parent
      }), { ...Jt, _durationDays: bt, _startDayOfWeek: Tt, _originalWidth: Ke, _originalHeight: Be };
    }).filter(Boolean);
    if (!a.length) return;
    const E = a[0].parent, S = a.filter((R) => R.parent === E);
    if (S.length === 0) return;
    const b = S.reduce((R, oe) => oe.start && (!R || oe.start < R) ? oe.start : R, null);
    Ze = S.map((R) => ({
      ...R,
      _startCellOffset: Wn(R.start, b, P)
    })), _t = E, ut = b, console.log("[copy] clipboard stored:", {
      taskCount: Ze.length,
      baseDate: b?.toISOString?.(),
      parent: E,
      tasks: Ze.map((R) => ({
        id: R.id,
        text: R.text,
        _startCellOffset: R._startCellOffset,
        _startDayOfWeek: R._startDayOfWeek,
        _durationDays: R._durationDays
      }))
    });
  }, [i, P]);
  ae(() => C ? i.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return yt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !Ze.length || !ut || j({
        tasks: Ze,
        baseDate: ut,
        parent: _t,
        currentX: X.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [C, i, yt]), ae(() => {
    if (!p) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), j(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [p]);
  const kt = $(() => {
    if (!m) return null;
    const e = Math.min(m.startX, m.currentX), c = Math.min(m.startY, m.currentY), a = Math.abs(m.currentX - m.startX), h = Math.abs(m.currentY - m.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${a}px`,
      height: `${h}px`
    };
  }, [m]);
  return /* @__PURE__ */ He(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${ge.length ? ge[0].$h : 0}px` },
      ref: te,
      onContextMenu: Zt,
      onMouseDown: ye,
      onMouseMove: Xt,
      onTouchStart: pe,
      onTouchMove: Kt,
      onTouchEnd: Ft,
      onClick: qt,
      onDoubleClick: Bt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ d(
          An,
          {
            onSelectLink: Ee,
            selectedLink: Me,
            readonly: n
          }
        ),
        ge.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = we.has(e.id), a = `wx-bar wx-${wt(e.type)}` + (e.$css ? ` ${e.$css}` : "") + (De && se && e.id === se.id ? " wx-touch" : "") + (I && I.id === e.id ? " wx-selected" : "") + (w.has(e.id) ? " wx-selected" : "") + (at(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (ie && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), h = "wx-link wx-left" + (I ? " wx-visible" : "") + (!I || !nt(e.id, !0) && pt(e.id) ? " wx-target" : "") + (I && I.id === e.id && I.start ? " wx-selected" : "") + (at(e.id) ? " wx-critical" : ""), E = "wx-link wx-right" + (I ? " wx-visible" : "") + (!I || !nt(e.id, !1) && pt(e.id) ? " wx-target" : "") + (I && I.id === e.id && !I.start ? " wx-selected" : "") + (at(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ He(nn, { children: [
            !e.$skip && /* @__PURE__ */ He(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: jt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: Se === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === Me?.target && Me?.type[2] === "s" ? /* @__PURE__ */ d(
                    vt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ d("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA " + h, children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ He(Je, { children: [
                    e.progress && !(ie && e.segments) ? /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(ie && e.segments) ? /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ d(s, { data: e, api: i, onAction: xt }) : ie && e.segments ? /* @__PURE__ */ d(Hn, { task: e, type: wt(e.type) }) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content", children: y && e.type === "summary" ? "" : e.$barText || e.text || "" }),
                    c && /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" }),
                    Q && e.type === "summary" && (() => {
                      const S = Q.get(e.id), b = Math.floor(e.$x / k), R = Math.ceil((e.$x + e.$w) / k);
                      return /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-summary-week-counts", children: Array.from({ length: R - b }, (oe, de) => {
                        const be = b + de, Le = S?.get(be) || 0;
                        return /* @__PURE__ */ d(
                          "span",
                          {
                            className: `wx-GKbcLEGA wx-week-count${Le === 0 ? " wx-week-count-zero" : ""}`,
                            style: {
                              position: "absolute",
                              left: `${be * k - e.$x}px`,
                              width: `${k}px`,
                              top: 0,
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            },
                            children: Le
                          },
                          be
                        );
                      }) });
                    })()
                  ] }) : /* @__PURE__ */ He(Je, { children: [
                    /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ d(s, { data: e, api: i, onAction: xt }) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-text-out", children: e.$barText || e.text })
                  ] }),
                  n ? null : e.id === Me?.target && Me?.type[2] === "e" ? /* @__PURE__ */ d(
                    vt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ d("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA " + E, children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            B && !e.$skip_baseline ? /* @__PURE__ */ d(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Qt(e)
              }
            ) : null
          ] }, e.id);
        }),
        m && kt && /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: kt }),
        p && p.currentX != null && p.tasks.map((e, c) => {
          const h = (Math.floor(p.currentX / k) + (e._startCellOffset || 0)) * k, E = e._originalWidth || k, S = e._originalHeight || ee, b = We.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ d(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: h, top: b, width: E, height: S },
              children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content", children: e.$barText || e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function Un(t) {
  const { highlightTime: n, onScaleClick: s } = t, l = ze(Xe), r = K(l, "_scales");
  return /* @__PURE__ */ d("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((_, C) => /* @__PURE__ */ d(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${_.height}px` },
      children: (_.cells || []).map((x, y) => {
        const i = n ? n(x.date, x.unit) : "", g = "wx-cell " + (x.css || "") + " " + (i || ""), V = typeof x.value == "string" && x.value.includes("<");
        return /* @__PURE__ */ d(
          "div",
          {
            className: "wx-ZkvhDKir " + g,
            style: { width: `${x.width}px`, cursor: s ? "pointer" : void 0 },
            onClick: s ? (z) => s(x.date, x.unit, z.nativeEvent) : void 0,
            ...V ? { dangerouslySetInnerHTML: { __html: x.value } } : { children: x.value }
          },
          y
        );
      })
    },
    C
  )) });
}
const Yn = /* @__PURE__ */ new Map();
function Xn(t) {
  const n = le(null), s = le(0), l = le(null), r = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, ae(() => {
    if (r)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const _ = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        Yn.set(t, _), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: _ })
        );
      }), () => cancelAnimationFrame(l.current);
  });
}
function Kn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: l,
    taskTemplate: r,
    cellBorders: _,
    highlightTime: C,
    onScaleClick: x,
    multiTaskRows: y = !1,
    rowMapping: i = null,
    marqueeSelect: g = !1,
    copyPaste: V = !1,
    scrollToCurrentWeek: z = !1,
    currentWeekColor: G = null,
    allowTaskIntersection: Z = !0,
    summaryBarCounts: u = !1
  } = t, M = ze(Xe), [P, B] = rt(M, "_selected"), H = K(M, "scrollTop"), L = K(M, "cellHeight"), A = K(M, "cellWidth"), T = K(M, "_scales"), J = K(M, "_markers"), ue = K(M, "_scrollTask"), ie = K(M, "zoom"), ne = K(M, "_tasks"), [ee, ge] = me(), k = le(null), v = le(0), Q = le(!1), ce = 1 + (T?.rows?.length || 0), I = $(() => {
    if (!y || !i || !ne?.length) return null;
    const m = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Map(), U = [];
    return ne.forEach((F) => {
      const q = i.taskRows.get(F.id) ?? F.id;
      W.has(q) || (W.set(q, U.length), U.push(q));
    }), ne.forEach((F) => {
      const q = i.taskRows.get(F.id) ?? F.id, xe = W.get(q) ?? 0;
      m.set(F.id, xe * L);
    }), m;
  }, [ne, y, i, L]), he = $(() => {
    const m = [];
    return P && P.length && L && P.forEach((W) => {
      const U = I?.get(W.id) ?? W.$y;
      m.push({ height: `${L}px`, top: `${U - 3}px` });
    }), m;
  }, [B, L, I]), se = $(
    () => Math.max(ee || 0, l),
    [ee, l]
  );
  ae(() => {
    const m = k.current;
    m && typeof H == "number" && (m.scrollTop = H);
  }, [H]);
  const ke = () => {
    ve();
  };
  function ve(m) {
    const W = k.current;
    if (!W) return;
    const U = {};
    U.left = W.scrollLeft, M.exec("scroll-chart", U);
  }
  function Me() {
    const m = k.current, U = Math.ceil((ee || 0) / (L || 1)) + 1, F = Math.floor((m && m.scrollTop || 0) / (L || 1)), q = Math.max(0, F - ce), xe = F + U + ce, $e = q * (L || 0);
    M.exec("render-data", {
      start: q,
      end: xe,
      from: $e
    });
  }
  ae(() => {
    Me();
  }, [ee, H]);
  const Re = N(
    (m) => {
      if (!m) return;
      const { id: W, mode: U } = m;
      if (U.toString().indexOf("x") < 0) return;
      const F = k.current;
      if (!F) return;
      const { clientWidth: q } = F, xe = M.getTask(W);
      if (xe.$x + xe.$w < F.scrollLeft)
        M.exec("scroll-chart", { left: xe.$x - (A || 0) }), F.scrollLeft = xe.$x - (A || 0);
      else if (xe.$x >= q + F.scrollLeft) {
        const $e = q < xe.$w ? A || 0 : xe.$w;
        M.exec("scroll-chart", { left: xe.$x - q + $e }), F.scrollLeft = xe.$x - q + $e;
      }
    },
    [M, A]
  );
  ae(() => {
    Re(ue);
  }, [ue]);
  function De(m) {
    if (ie && (m.ctrlKey || m.metaKey)) {
      m.preventDefault();
      const W = k.current, U = m.clientX - (W ? W.getBoundingClientRect().left : 0);
      if (v.current += m.deltaY, Math.abs(v.current) >= 150) {
        const q = -Math.sign(v.current);
        v.current = 0, M.exec("zoom-scale", {
          dir: q,
          offset: U
        });
      }
    }
  }
  const Ce = N((m) => {
    const W = C(m.date, m.unit);
    return W ? {
      css: W,
      width: m.width
    } : null;
  }, [C]), Ie = $(() => {
    if (!T || !C || !["hour", "day", "week"].includes(T.minUnit)) return null;
    let W = 0;
    return T.rows[T.rows.length - 1].cells.map((U) => {
      const F = Ce(U), q = W;
      return W += U.width, F ? { ...F, left: q } : null;
    });
  }, [T, C, Ce]), Ne = N(
    (m) => {
      m.eventSource = "chart", M.exec("hotkey", m);
    },
    [M]
  );
  ae(() => {
    const m = k.current;
    if (!m) return;
    const W = () => ge(m.clientHeight);
    W();
    const U = new ResizeObserver(() => W());
    return U.observe(m), () => {
      U.disconnect();
    };
  }, [k.current]);
  const fe = le(null);
  return ae(() => {
    const m = k.current;
    if (m && !fe.current)
      return fe.current = Gt(m, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (W) => Ne(W)
      }), () => {
        fe.current?.destroy(), fe.current = null;
      };
  }, []), ae(() => {
    const m = k.current;
    if (!m) return;
    const W = De;
    return m.addEventListener("wheel", W), () => {
      m.removeEventListener("wheel", W);
    };
  }, [De]), ae(() => {
    if (!z || Q.current || !T || !k.current || !ee) return;
    const m = k.current, { clientWidth: W } = m, U = /* @__PURE__ */ new Date(), F = T.rows[T.rows.length - 1]?.cells;
    if (!F) return;
    let q = -1, xe = 0;
    const $e = [];
    for (let j = 0; j < F.length; j++) {
      const f = F[j];
      $e.push({ left: xe, width: f.width });
      const X = f.date;
      if (f.unit === "week") {
        const te = new Date(X);
        te.setUTCDate(te.getUTCDate() + 7), U >= X && U < te && (q = j);
      } else f.unit === "day" && U.getUTCFullYear() === X.getUTCFullYear() && U.getUTCMonth() === X.getUTCMonth() && U.getUTCDate() === X.getUTCDate() && (q = j);
      xe += f.width;
    }
    let p = q;
    if (q > 0 && (p = q - 1), p >= 0 && $e[p]) {
      const j = $e[p], f = Math.max(0, j.left);
      m.scrollLeft = f, M.exec("scroll-chart", { left: f }), Q.current = !0;
    }
  }, [z, T, ee, M]), Xn("chart"), /* @__PURE__ */ He(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: k,
      onScroll: ke,
      children: [
        /* @__PURE__ */ d(Un, { highlightTime: C, onScaleClick: x, scales: T }),
        J && J.length ? /* @__PURE__ */ d(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${se}px` },
            children: J.map((m, W) => /* @__PURE__ */ d(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${m.css || ""}`,
                style: { left: `${m.left}px` },
                children: /* @__PURE__ */ d("div", { className: "wx-mR7v2Xag wx-content", children: m.text })
              },
              W
            ))
          }
        ) : null,
        /* @__PURE__ */ He(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${se}px` },
            children: [
              Ie ? /* @__PURE__ */ d(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Ie.map(
                    (m, W) => m ? /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + m.css,
                        style: {
                          width: `${m.width}px`,
                          left: `${m.left}px`
                        }
                      },
                      W
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ d(Pn, { borders: _ }),
              P && P.length ? P.map(
                (m, W) => m.$y ? /* @__PURE__ */ d(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": m.id,
                    style: he[W]
                  },
                  m.id
                ) : null
              ) : null,
              /* @__PURE__ */ d(
                Gn,
                {
                  readonly: n,
                  taskTemplate: r,
                  multiTaskRows: y,
                  rowMapping: i,
                  marqueeSelect: g,
                  copyPaste: V,
                  allowTaskIntersection: Z,
                  summaryBarCounts: u
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
    dir: l = "x",
    onMove: r,
    onDisplayChange: _,
    compactMode: C,
    containerWidth: x = 0,
    leftThreshold: y = 50,
    rightThreshold: i = 50
  } = t, [g, V] = dt(t.value ?? 0), [z, G] = dt(t.display ?? "all");
  function Z(he) {
    let se = 0;
    n == "center" ? se = s / 2 : n == "before" && (se = s);
    const ke = {
      size: [s + "px", "auto"],
      p: [he - se + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let ve in ke) ke[ve] = ke[ve].reverse();
    return ke;
  }
  const [u, M] = me(!1), [P, B] = me(null), H = le(0), L = le(), A = le(), T = le(z);
  ae(() => {
    T.current = z;
  }, [z]), ae(() => {
    P === null && g > 0 && B(g);
  }, [P, g]);
  function J(he) {
    return l == "x" ? he.clientX : he.clientY;
  }
  const ue = N(
    (he) => {
      const se = L.current + J(he) - H.current;
      V(se);
      let ke;
      se <= y ? ke = "chart" : x - se <= i ? ke = "grid" : ke = "all", T.current !== ke && (G(ke), T.current = ke), A.current && clearTimeout(A.current), A.current = setTimeout(() => r && r(se), 100);
    },
    [x, y, i, r]
  ), ie = N(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", M(!1), window.removeEventListener("mousemove", ue), window.removeEventListener("mouseup", ie);
  }, [ue]), ne = $(
    () => z !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [z, l]
  ), ee = N(
    (he) => {
      !C && (z === "grid" || z === "chart") || (H.current = J(he), L.current = g, M(!0), document.body.style.cursor = ne, document.body.style.userSelect = "none", window.addEventListener("mousemove", ue), window.addEventListener("mouseup", ie));
    },
    [ne, ue, ie, g, C, z]
  );
  function ge() {
    G("all"), P !== null && (V(P), r && r(P));
  }
  function k(he) {
    if (C) {
      const se = z === "chart" ? "grid" : "chart";
      G(se), _(se);
    } else if (z === "grid" || z === "chart")
      ge(), _("all");
    else {
      const se = he === "left" ? "chart" : "grid";
      G(se), _(se);
    }
  }
  function v() {
    k("left");
  }
  function Q() {
    k("right");
  }
  const ce = $(() => Z(g), [g, n, s, l]), I = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${z}`,
    u ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ He(
    "div",
    {
      className: "wx-pFykzMlT " + I,
      onMouseDown: ee,
      style: { width: ce.size[0], height: ce.size[1], cursor: ne },
      children: [
        /* @__PURE__ */ He("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ d(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: v
            }
          ) }),
          /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ d(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: Q
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Bn = 650;
function Ut(t) {
  let n;
  function s() {
    n = new ResizeObserver((r) => {
      for (let _ of r)
        if (_.target === document.body) {
          let C = _.contentRect.width <= Bn;
          t(C);
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
function Vn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: l,
    highlightTime: r,
    onScaleClick: _,
    onTableAPIChange: C,
    multiTaskRows: x = !1,
    rowMapping: y = null,
    marqueeSelect: i = !1,
    copyPaste: g = !1,
    scrollToCurrentWeek: V = !1,
    currentWeekColor: z = null,
    allowTaskIntersection: G = !0,
    summaryBarCounts: Z = !1
  } = t, u = ze(Xe), M = K(u, "_tasks"), P = K(u, "_scales"), B = K(u, "cellHeight"), H = K(u, "columns"), L = K(u, "_scrollTask"), A = K(u, "undo"), T = $(() => {
    if (!x) return y;
    const p = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map();
    return M.forEach((f) => {
      const X = f.row ?? f.id;
      j.set(f.id, X), p.has(X) || p.set(X, []), p.get(X).push(f.id);
    }), { rowMap: p, taskRows: j };
  }, [M, x, y]), [J, ue] = me(!1);
  let [ie, ne] = me(0);
  const [ee, ge] = me(0), [k, v] = me(0), [Q, ce] = me(void 0), [I, he] = me("all"), se = le(null), ke = N(
    (p) => {
      ue((j) => (p !== j && (p ? (se.current = I, I === "all" && he("grid")) : (!se.current || se.current === "all") && he("all")), p));
    },
    [I]
  );
  ae(() => {
    const p = Ut(ke);
    return p.observe(), () => {
      p.disconnect();
    };
  }, [ke]);
  const ve = $(() => {
    let p;
    return H.every((j) => j.width && !j.flexgrow) ? p = H.reduce((j, f) => j + parseInt(f.width), 0) : J && I === "chart" ? p = parseInt(H.find((j) => j.id === "action")?.width) || 50 : p = 440, ie = p, p;
  }, [H, J, I]);
  ae(() => {
    ne(ve);
  }, [ve]);
  const Me = $(
    () => (ee ?? 0) - (Q ?? 0),
    [ee, Q]
  ), Re = $(() => P.width, [P]), De = $(() => {
    if (!x || !T)
      return M.length * B;
    const p = /* @__PURE__ */ new Set();
    return M.forEach((j) => {
      const f = T.taskRows.get(j.id) ?? j.id;
      p.add(f);
    }), p.size * B;
  }, [M, B, x, T]), Ce = $(
    () => P.height + De + Me,
    [P, De, Me]
  ), Ie = $(
    () => ie + Re,
    [ie, Re]
  ), Ne = le(null), fe = N(() => {
    Promise.resolve().then(() => {
      if ((ee ?? 0) > (Ie ?? 0)) {
        const p = (ee ?? 0) - ie;
        u.exec("expand-scale", { minWidth: p });
      }
    });
  }, [ee, Ie, ie, u]);
  ae(() => {
    let p;
    return Ne.current && (p = new ResizeObserver(fe), p.observe(Ne.current)), () => {
      p && p.disconnect();
    };
  }, [Ne.current, fe]), ae(() => {
    fe();
  }, [Re]);
  const m = le(null), W = le(null), U = N(() => {
    const p = m.current;
    p && u.exec("scroll-chart", {
      top: p.scrollTop
    });
  }, [u]), F = le({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  ae(() => {
    F.current = {
      rTasks: M,
      rScales: P,
      rCellHeight: B,
      scrollSize: Me,
      ganttDiv: m.current,
      ganttHeight: k ?? 0
    };
  }, [M, P, B, Me, k]);
  const q = N(
    (p) => {
      if (!p) return;
      const {
        rTasks: j,
        rScales: f,
        rCellHeight: X,
        scrollSize: te,
        ganttDiv: Y,
        ganttHeight: Se
      } = F.current;
      if (!Y) return;
      const { id: _e } = p, Oe = j.findIndex((re) => re.id === _e);
      if (Oe > -1) {
        const re = Se - f.height, we = Oe * X, Te = Y.scrollTop;
        let We = null;
        we < Te ? We = we : we + X > Te + re && (We = we - re + X + te), We !== null && (u.exec("scroll-chart", { top: Math.max(We, 0) }), m.current.scrollTop = Math.max(We, 0));
      }
    },
    [u]
  );
  ae(() => {
    q(L);
  }, [L]), ae(() => {
    const p = m.current, j = W.current;
    if (!p || !j) return;
    const f = () => {
      Dn(() => {
        v(p.offsetHeight), ge(p.offsetWidth), ce(j.offsetWidth);
      });
    }, X = new ResizeObserver(f);
    return X.observe(p), () => X.disconnect();
  }, [m.current]);
  const xe = le(null), $e = le(null);
  return ae(() => {
    $e.current && ($e.current.destroy(), $e.current = null);
    const p = xe.current;
    if (p)
      return $e.current = Gt(p, {
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
          "ctrl+z": A,
          "ctrl+y": A,
          "meta+z": A,
          "meta+shift+z": A
        },
        exec: (j) => {
          if (j.isInput) return;
          const f = j.key;
          if (f === "ctrl+z" || f === "meta+z") {
            u.exec("undo", {});
            return;
          }
          if (f === "ctrl+y" || f === "meta+shift+z") {
            u.exec("redo", {});
            return;
          }
          u.exec("hotkey", j);
        }
      }), () => {
        $e.current?.destroy(), $e.current = null;
      };
  }, [A]), /* @__PURE__ */ d("div", { className: "wx-jlbQoHOz wx-gantt", ref: m, onScroll: U, children: /* @__PURE__ */ d(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Ce, width: "100%" },
      ref: W,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: k,
            width: Q
          },
          children: /* @__PURE__ */ He("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: xe, children: [
            H.length ? /* @__PURE__ */ He(Je, { children: [
              /* @__PURE__ */ d(
                _n,
                {
                  display: I,
                  compactMode: J,
                  columnWidth: ve,
                  width: ie,
                  readonly: s,
                  fullHeight: De,
                  onTableAPIChange: C,
                  multiTaskRows: x,
                  rowMapping: T
                }
              ),
              /* @__PURE__ */ d(
                Fn,
                {
                  value: ie,
                  display: I,
                  compactMode: J,
                  containerWidth: ee,
                  onMove: (p) => ne(p),
                  onDisplayChange: (p) => he(p)
                }
              )
            ] }) : null,
            /* @__PURE__ */ d("div", { className: "wx-jlbQoHOz wx-content", ref: Ne, children: /* @__PURE__ */ d(
              Kn,
              {
                readonly: s,
                fullWidth: Re,
                fullHeight: De,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: r,
                onScaleClick: _,
                multiTaskRows: x,
                rowMapping: T,
                marqueeSelect: i,
                copyPaste: g,
                scrollToCurrentWeek: V,
                currentWeekColor: z,
                allowTaskIntersection: G,
                summaryBarCounts: Z
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
function jn(t, n) {
  return typeof t == "function" ? t : ot(t, n);
}
function Yt(t, n) {
  return t.map(({ format: s, ...l }) => ({
    ...l,
    format: jn(s, n)
  }));
}
function Qn(t, n) {
  const s = qn(n);
  for (let l in s)
    s[l] = ot(s[l], t);
  return s;
}
function Zn(t, n) {
  if (!t || !t.length) return t;
  const s = ot("%d-%m-%Y", n);
  return t.map((l) => l.template ? l : l.id === "start" || l.id == "end" ? {
    ...l,
    //store locale template for unscheduled tasks
    _template: (r) => s(r),
    template: (r) => s(r)
  } : l.id === "duration" ? {
    ...l,
    _template: (r) => r,
    template: (r) => r
  } : l);
}
function Jn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Yt(s.scales, n)
    }))
  } : t;
}
const es = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), ts = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], $s = At(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: l = vn,
  tasks: r = [],
  selected: _ = [],
  activeTask: C = null,
  links: x = [],
  scales: y = ts,
  columns: i = Tn,
  start: g = null,
  end: V = null,
  lengthUnit: z = "day",
  durationUnit: G = "day",
  cellWidth: Z = 100,
  cellHeight: u = 38,
  scaleHeight: M = 36,
  readonly: P = !1,
  cellBorders: B = "full",
  zoom: H = !1,
  baselines: L = !1,
  highlightTime: A = null,
  onScaleClick: T = null,
  init: J = null,
  autoScale: ue = !0,
  unscheduledTasks: ie = !1,
  criticalPath: ne = null,
  schedule: ee = { type: "forward" },
  projectStart: ge = null,
  projectEnd: k = null,
  calendar: v = null,
  undo: Q = !1,
  splitTasks: ce = !1,
  multiTaskRows: I = !1,
  marqueeSelect: he = !1,
  copyPaste: se = !1,
  currentWeekHighlight: ke = !1,
  currentWeekColor: ve = null,
  scrollToCurrentWeek: Me = !1,
  allowTaskIntersection: Re = !0,
  summaryBarCounts: De = !1,
  ...Ce
}, Ie) {
  const Ne = le();
  Ne.current = Ce;
  const fe = $(() => new yn($n), []), m = $(() => ({ ...ft, ...it }), []), W = ze(Ue.i18n), U = $(() => W ? W.extend(m, !0) : lt(m), [W, m]), F = $(() => U.getRaw().calendar, [U]), q = $(() => {
    let re = {
      zoom: Jn(H, F),
      scales: Yt(y, F),
      columns: Zn(i, F),
      links: kn(x),
      cellWidth: Z
    };
    return re.zoom && (re = {
      ...re,
      ...bn(
        re.zoom,
        Qn(F, U.getGroup("gantt")),
        re.scales,
        Z
      )
    }), re;
  }, [H, y, i, x, Z, F, U]), xe = le(null);
  xe.current !== r && (St(r, { durationUnit: G, splitTasks: ce, calendar: v }), xe.current = r), ae(() => {
    St(r, { durationUnit: G, splitTasks: ce, calendar: v });
  }, [r, G, v, ce]);
  const $e = $(() => {
    if (!I) return null;
    const re = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map(), Te = (We) => {
      We.forEach((o) => {
        const w = o.row ?? o.id;
        we.set(o.id, w), re.has(w) || re.set(w, []), re.get(w).push(o.id), o.data && o.data.length > 0 && Te(o.data);
      });
    };
    return Te(r), { rowMap: re, taskRows: we };
  }, [r, I]), p = $(() => fe.in, [fe]), j = le(null);
  j.current === null && (j.current = new mn((re, we) => {
    const Te = "on" + es(re);
    Ne.current && Ne.current[Te] && Ne.current[Te](we);
  }), p.setNext(j.current));
  const [f, X] = me(null), te = le(null);
  te.current = f;
  const Y = $(
    () => ({
      getState: fe.getState.bind(fe),
      getReactiveState: fe.getReactive.bind(fe),
      getStores: () => ({ data: fe }),
      exec: p.exec,
      setNext: (re) => (j.current = j.current.setNext(re), j.current),
      intercept: p.intercept.bind(p),
      on: p.on.bind(p),
      detach: p.detach.bind(p),
      getTask: fe.getTask.bind(fe),
      serialize: fe.serialize.bind(fe),
      getTable: (re) => re ? new Promise((we) => setTimeout(() => we(te.current), 1)) : te.current,
      getHistory: () => fe.getHistory()
    }),
    [fe, p]
  );
  Ht(
    Ie,
    () => ({
      ...Y
    }),
    [Y]
  );
  const Se = le(0);
  ae(() => {
    Se.current ? fe.init({
      tasks: r,
      links: q.links,
      start: g,
      columns: q.columns,
      end: V,
      lengthUnit: z,
      cellWidth: q.cellWidth,
      cellHeight: u,
      scaleHeight: M,
      scales: q.scales,
      taskTypes: l,
      zoom: q.zoom,
      selected: _,
      activeTask: C,
      baselines: L,
      autoScale: ue,
      unscheduledTasks: ie,
      markers: s,
      durationUnit: G,
      criticalPath: ne,
      schedule: ee,
      projectStart: ge,
      projectEnd: k,
      calendar: v,
      undo: Q,
      _weekStart: F.weekStart,
      splitTasks: ce
    }) : J && J(Y), Se.current++;
  }, [
    Y,
    J,
    r,
    q,
    g,
    V,
    z,
    u,
    M,
    l,
    _,
    C,
    L,
    ue,
    ie,
    s,
    G,
    ne,
    ee,
    ge,
    k,
    v,
    Q,
    F,
    ce,
    fe
  ]), Se.current === 0 && fe.init({
    tasks: r,
    links: q.links,
    start: g,
    columns: q.columns,
    end: V,
    lengthUnit: z,
    cellWidth: q.cellWidth,
    cellHeight: u,
    scaleHeight: M,
    scales: q.scales,
    taskTypes: l,
    zoom: q.zoom,
    selected: _,
    activeTask: C,
    baselines: L,
    autoScale: ue,
    unscheduledTasks: ie,
    markers: s,
    durationUnit: G,
    criticalPath: ne,
    schedule: ee,
    projectStart: ge,
    projectEnd: k,
    calendar: v,
    undo: Q,
    _weekStart: F.weekStart,
    splitTasks: ce
  });
  const _e = $(() => {
    const re = /* @__PURE__ */ new Date(), we = F?.weekStart ?? 0, Te = new Date(Date.UTC(re.getUTCFullYear(), re.getUTCMonth(), re.getUTCDate())), o = (Te.getUTCDay() - we + 7) % 7;
    Te.setUTCDate(Te.getUTCDate() - o), Te.setUTCHours(0, 0, 0, 0);
    const w = new Date(Te);
    return w.setUTCDate(w.getUTCDate() + 7), (D) => D >= Te && D < w;
  }, [F]), Oe = $(() => (re, we) => {
    let Te = [];
    if (v)
      we == "day" && !v.getDayHours(re) && Te.push("wx-weekend"), we == "hour" && !v.getDayHours(re) && Te.push("wx-weekend");
    else if (A) {
      const We = A(re, we);
      We && Te.push(We);
    }
    return ke && (we === "week" || we === "day") && _e(re) && Te.push("wx-current-week"), Te.join(" ");
  }, [v, A, ke, _e]);
  return /* @__PURE__ */ d(Ue.i18n.Provider, { value: U, children: /* @__PURE__ */ d(Xe.Provider, { value: Y, children: /* @__PURE__ */ d(
    Vn,
    {
      taskTemplate: n,
      readonly: P,
      cellBorders: B,
      highlightTime: Oe,
      onScaleClick: T,
      onTableAPIChange: X,
      multiTaskRows: I,
      rowMapping: $e,
      marqueeSelect: he,
      copyPaste: se,
      scrollToCurrentWeek: Me,
      currentWeekColor: ve,
      allowTaskIntersection: Re,
      summaryBarCounts: De
    }
  ) }) });
});
function Ms({ api: t = null, items: n = [] }) {
  const s = ze(Ue.i18n), l = $(() => s || lt(it), [s]), r = $(() => l.getGroup("gantt"), [l]), _ = Ye(t, "_selected"), C = Ye(t, "undo"), x = Ye(t, "history"), y = Ye(t, "splitTasks"), i = ["undo", "redo"], g = $(() => {
    const z = Dt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : Dt({
      undo: C,
      splitTasks: y
    })).map((Z) => {
      let u = { ...Z, disabled: !1 };
      return u.handler = zt(z, u.id) ? (M) => Ot(t, M.id, null, r) : u.handler, u.text && (u.text = r(u.text)), u.menuText && (u.menuText = r(u.menuText)), u;
    });
  }, [n, t, r, C, y]), V = $(() => {
    const z = [];
    return g.forEach((G) => {
      const Z = G.id;
      if (Z === "add-task")
        z.push(G);
      else if (i.includes(Z))
        i.includes(Z) && z.push({
          ...G,
          disabled: G.isDisabled(x)
        });
      else {
        if (!_?.length || !t) return;
        z.push({
          ...G,
          disabled: G.isDisabled && _.some((u) => G.isDisabled(u, t.getState()))
        });
      }
    }), z.filter((G, Z) => {
      if (t && G.isHidden)
        return !_.some((u) => G.isHidden(u, t.getState()));
      if (G.comp === "separator") {
        const u = z[Z + 1];
        if (!u || u.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, _, x, g]);
  return s ? /* @__PURE__ */ d(Rt, { items: V }) : /* @__PURE__ */ d(Ue.i18n.Provider, { value: l, children: /* @__PURE__ */ d(Rt, { items: V }) });
}
const Ss = At(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: r = null,
  at: _ = "point",
  children: C,
  onClick: x,
  css: y
}, i) {
  const g = le(null), V = le(null), z = ze(Ue.i18n), G = $(() => z || lt({ ...it, ...ft }), [z]), Z = $(() => G.getGroup("gantt"), [G]), u = Ye(s, "taskTypes"), M = Ye(s, "selected"), P = Ye(s, "_selected"), B = Ye(s, "splitTasks"), H = $(() => Et({ splitTasks: !0 }), []);
  ae(() => {
    s && (s.on("scroll-chart", () => {
      g.current && g.current.show && g.current.show();
    }), s.on("drag-task", () => {
      g.current && g.current.show && g.current.show();
    }));
  }, [s]);
  function L(k) {
    return k.map((v) => (v = { ...v }, v.text && (v.text = Z(v.text)), v.subtext && (v.subtext = Z(v.subtext)), v.data && (v.data = L(v.data)), v));
  }
  function A() {
    const k = n.length ? n : Et({ splitTasks: B }), v = k.find((Q) => Q.id === "convert-task");
    return v && (v.data = [], (u || []).forEach((Q) => {
      v.data.push(v.dataFactory(Q));
    })), L(k);
  }
  const T = $(() => A(), [s, n, u, B, Z]), J = $(
    () => P && P.length ? P : [],
    [P]
  ), ue = N(
    (k, v) => {
      let Q = k ? s?.getTask(k) : null;
      if (l) {
        const ce = l(k, v);
        Q = ce === !0 ? Q : ce;
      }
      if (Q) {
        const ce = Ve(v.target, "data-segment");
        ce !== null ? V.current = { id: Q.id, segmentIndex: ce } : V.current = Q.id, (!Array.isArray(M) || !M.includes(Q.id)) && s && s.exec && s.exec("select-task", { id: Q.id });
      }
      return Q;
    },
    [s, l, M]
  ), ie = N(
    (k) => {
      const v = k.action;
      v && (zt(H, v.id) && Ot(s, v.id, V.current, Z), x && x(k));
    },
    [s, Z, x, H]
  ), ne = N(
    (k, v) => {
      const Q = J.length ? J : v ? [v] : [];
      let ce = r ? Q.every((I) => r(k, I)) : !0;
      if (ce && (k.isHidden && (ce = !Q.some(
        (I) => k.isHidden(I, s.getState(), V.current)
      )), k.isDisabled)) {
        const I = Q.some(
          (he) => k.isDisabled(he, s.getState(), V.current)
        );
        k.disabled = I;
      }
      return ce;
    },
    [r, J, s]
  );
  Ht(i, () => ({
    show: (k, v) => {
      g.current && g.current.show && g.current.show(k, v);
    }
  }));
  const ee = N((k) => {
    g.current && g.current.show && g.current.show(k);
  }, []), ge = /* @__PURE__ */ He(Je, { children: [
    /* @__PURE__ */ d(
      En,
      {
        filter: ne,
        options: T,
        dataKey: "id",
        resolver: ue,
        onClick: ie,
        at: _,
        ref: g,
        css: y
      }
    ),
    /* @__PURE__ */ d("span", { onContextMenu: ee, "data-menu-ignore": "true", children: typeof C == "function" ? C() : C })
  ] });
  if (!z && Ue.i18n?.Provider) {
    const k = Ue.i18n.Provider;
    return /* @__PURE__ */ d(k, { value: G, children: ge });
  }
  return ge;
});
function ns({ api: t, autoSave: n, onLinksChange: s }) {
  const r = ze(Ue.i18n).getGroup("gantt"), _ = K(t, "activeTask"), C = K(t, "_activeTask"), x = K(t, "_links"), y = K(t, "schedule"), i = K(t, "unscheduledTasks"), [g, V] = me();
  function z() {
    if (_) {
      const M = x.filter((B) => B.target == _).map((B) => ({ link: B, task: t.getTask(B.source) })), P = x.filter((B) => B.source == _).map((B) => ({ link: B, task: t.getTask(B.target) }));
      return [
        { title: r("Predecessors"), data: M },
        { title: r("Successors"), data: P }
      ];
    }
  }
  ae(() => {
    V(z());
  }, [_, x]);
  const G = $(
    () => [
      { id: "e2s", label: r("End-to-start") },
      { id: "s2s", label: r("Start-to-start") },
      { id: "e2e", label: r("End-to-end") },
      { id: "s2e", label: r("Start-to-end") }
    ],
    [r]
  );
  function Z(M) {
    n ? t.exec("delete-link", { id: M }) : (V(
      (P) => (P || []).map((B) => ({
        ...B,
        data: B.data.filter((H) => H.link.id !== M)
      }))
    ), s && s({
      id: M,
      action: "delete-link",
      data: { id: M }
    }));
  }
  function u(M, P) {
    n ? t.exec("update-link", {
      id: M,
      link: P
    }) : (V(
      (B) => (B || []).map((H) => ({
        ...H,
        data: H.data.map(
          (L) => L.link.id === M ? { ...L, link: { ...L.link, ...P } } : L
        )
      }))
    ), s && s({
      id: M,
      action: "update-link",
      data: {
        id: M,
        link: P
      }
    }));
  }
  return /* @__PURE__ */ d(Je, { children: (g || []).map(
    (M, P) => M.data.length ? /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ d(sn, { label: M.title, position: "top", children: /* @__PURE__ */ d("table", { children: /* @__PURE__ */ d("tbody", { children: M.data.map((B) => /* @__PURE__ */ He("tr", { children: [
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-task-name", children: B.task.text || "" }) }),
      y?.auto && B.link.type === "e2s" ? /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ d(
        rn,
        {
          type: "number",
          placeholder: r("Lag"),
          value: B.link.lag,
          disabled: i && C?.unscheduled,
          onChange: (H) => {
            H.input || u(B.link.id, { lag: H.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ d(
        on,
        {
          value: B.link.type,
          placeholder: r("Select link type"),
          options: G,
          onChange: (H) => u(B.link.id, { type: H.value }),
          children: ({ option: H }) => H.label
        }
      ) }) }),
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => Z(B.link.id),
          role: "button"
        }
      ) })
    ] }, B.link.id)) }) }) }) }, P) : null
  ) });
}
function ss(t) {
  const { value: n, time: s, format: l, onchange: r, onChange: _, ...C } = t, x = _ ?? r;
  function y(i) {
    const g = new Date(i.value);
    g.setUTCHours(n.getUTCHours()), g.setUTCMinutes(n.getUTCMinutes()), x && x({ value: g });
  }
  return /* @__PURE__ */ He("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ d(
      ln,
      {
        ...C,
        value: n,
        onChange: y,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ d(cn, { value: n, onChange: x, format: l }) : null
  ] });
}
qe("select", un);
qe("date", ss);
qe("twostate", dn);
qe("slider", fn);
qe("counter", hn);
qe("links", ns);
function Ds({
  api: t,
  items: n = [],
  css: s = "",
  layout: l = "default",
  readonly: r = !1,
  placement: _ = "sidebar",
  bottomBar: C = !0,
  topBar: x = !0,
  autoSave: y = !0,
  focus: i = !1,
  hotkeys: g = {}
}) {
  const V = ze(Ue.i18n), z = $(() => V || lt({ ...it, ...ft }), [V]), G = $(() => z.getGroup("gantt"), [z]), Z = z.getRaw(), u = $(() => {
    const f = Z.gantt?.dateFormat || Z.formats?.dateFormat;
    return ot(f, Z.calendar);
  }, [Z]), M = $(() => {
    if (x === !0 && !r) {
      const f = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: G("Delete"),
          id: "delete"
        }
      ];
      return y ? { items: f } : {
        items: [
          ...f,
          {
            comp: "button",
            type: "primary",
            text: G("Save"),
            id: "save"
          }
        ]
      };
    }
    return x;
  }, [x, r, y, G]), [P, B] = me(!1), H = $(
    () => P ? "wx-full-screen" : "",
    [P]
  ), L = N((f) => {
    B(f);
  }, []);
  ae(() => {
    const f = Ut(L);
    return f.observe(), () => {
      f.disconnect();
    };
  }, [L]);
  const A = K(t, "_activeTask"), T = K(t, "activeTask"), J = K(t, "unscheduledTasks"), ue = K(t, "links"), ie = K(t, "splitTasks"), ne = $(
    () => ie && T?.segmentIndex,
    [ie, T]
  ), ee = $(
    () => ne || ne === 0,
    [ne]
  ), ge = $(
    () => Cn({ unscheduledTasks: J }),
    [J]
  ), k = K(t, "undo"), [v, Q] = me({}), [ce, I] = me(null), [he, se] = me(), [ke, ve] = me(null), Me = K(t, "taskTypes"), Re = $(() => {
    if (!A) return null;
    let f;
    if (ee && A.segments ? f = { ...A.segments[ne] } : f = { ...A }, r) {
      let X = { parent: f.parent };
      return ge.forEach(({ key: te, comp: Y }) => {
        if (Y !== "links") {
          const Se = f[te];
          Y === "date" && Se instanceof Date ? X[te] = u(Se) : Y === "slider" && te === "progress" ? X[te] = `${Se}%` : X[te] = Se;
        }
      }), X;
    }
    return f || null;
  }, [A, ee, ne, r, ge, u]);
  ae(() => {
    se(Re);
  }, [Re]), ae(() => {
    Q({}), ve(null), I(null);
  }, [T]);
  function De(f, X) {
    return f.map((te) => {
      const Y = { ...te };
      if (te.config && (Y.config = { ...Y.config }), Y.comp === "links" && t && (Y.api = t, Y.autoSave = y, Y.onLinksChange = Ne), Y.comp === "select" && Y.key === "type") {
        const Se = Y.options ?? (Me || []);
        Y.options = Se.map((_e) => ({
          ..._e,
          label: G(_e.label)
        }));
      }
      return Y.comp === "slider" && Y.key === "progress" && (Y.labelTemplate = (Se) => `${G(Y.label)} ${Se}%`), Y.label && (Y.label = G(Y.label)), Y.config?.placeholder && (Y.config.placeholder = G(Y.config.placeholder)), X && (Y.isDisabled && Y.isDisabled(X, t.getState()) ? Y.disabled = !0 : delete Y.disabled), Y;
    });
  }
  const Ce = $(() => {
    let f = n.length ? n : ge;
    return f = De(f, he), he ? f.filter(
      (X) => !X.isHidden || !X.isHidden(he, t.getState())
    ) : f;
  }, [n, ge, he, Me, G, t, y]), Ie = $(
    () => Ce.map((f) => f.key),
    [Ce]
  );
  function Ne({ id: f, action: X, data: te }) {
    Q((Y) => ({
      ...Y,
      [f]: { action: X, data: te }
    }));
  }
  const fe = N(() => {
    for (let f in v)
      if (ue.byId(f)) {
        const { action: X, data: te } = v[f];
        t.exec(X, te);
      }
  }, [t, v, ue]), m = N(() => {
    const f = T?.id || T;
    if (ee) {
      if (A?.segments) {
        const X = A.segments.filter(
          (te, Y) => Y !== ne
        );
        t.exec("update-task", {
          id: f,
          task: { segments: X }
        });
      }
    } else
      t.exec("delete-task", { id: f });
  }, [t, T, ee, A, ne]), W = N(() => {
    t.exec("show-editor", { id: null });
  }, [t]), U = N(
    (f) => {
      const { item: X, changes: te } = f;
      X.id === "delete" && m(), X.id === "save" && (te.length ? W() : fe()), X.comp && W();
    },
    [t, T, y, fe, m, W]
  ), F = N(
    (f, X, te) => (J && f.type === "summary" && (f.unscheduled = !1), Wt(f, t.getState(), X), te || I(!1), f),
    [J, t]
  ), q = N(
    (f) => {
      f = {
        ...f,
        unscheduled: J && f.unscheduled && f.type !== "summary"
      }, delete f.links, delete f.data, (Ie.indexOf("duration") === -1 || f.segments && !f.duration) && delete f.duration;
      const X = {
        id: T?.id || T,
        task: f,
        ...ee && { segmentIndex: ne }
      };
      y && ce && (X.inProgress = ce), t.exec("update-task", X), y || fe();
    },
    [
      t,
      T,
      J,
      y,
      fe,
      Ie,
      ee,
      ne,
      ce
    ]
  ), xe = N(
    (f) => {
      let { update: X, key: te, input: Y } = f;
      if (Y && I(!0), f.update = F({ ...X }, te, Y), !y) se(f.update);
      else if (!ke && !Y) {
        const Se = Ce.find((re) => re.key === te), _e = X[te];
        (!Se.validation || Se.validation(_e)) && (!Se.required || _e) && q(f.update);
      }
    },
    [y, F, ke, Ce, q]
  ), $e = N(
    (f) => {
      y || q(f.values);
    },
    [y, q]
  ), p = N((f) => {
    ve(f.errors);
  }, []), j = $(
    () => k ? {
      "ctrl+z": (f) => {
        f.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (f) => {
        f.preventDefault(), t.exec("redo");
      }
    } : {},
    [k, t]
  );
  return Re ? /* @__PURE__ */ d(an, { children: /* @__PURE__ */ d(
    Rn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${H} ${s}`,
      items: Ce,
      values: Re,
      topBar: M,
      bottomBar: C,
      placement: _,
      layout: l,
      readonly: r,
      autoSave: y,
      focus: i,
      onAction: U,
      onSave: $e,
      onValidation: p,
      onChange: xe,
      hotkeys: g && { ...j, ...g }
    }
  ) }) : null;
}
const Es = ({ children: t, columns: n = null, api: s }) => {
  const [l, r] = me(null);
  return ae(() => {
    s && s.getTable(!0).then(r);
  }, [s]), /* @__PURE__ */ d(Sn, { api: l, columns: n, children: t });
};
function Rs(t) {
  const { api: n, content: s, children: l } = t, r = le(null), _ = le(null), [C, x] = me({}), [y, i] = me(null), [g, V] = me({});
  function z(L) {
    for (; L; ) {
      if (L.getAttribute) {
        const A = L.getAttribute("data-tooltip-id"), T = L.getAttribute("data-tooltip-at"), J = L.getAttribute("data-tooltip");
        if (A || J) return { id: A, tooltip: J, target: L, at: T };
      }
      L = L.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ae(() => {
    const L = _.current;
    if (L && g && (g.text || s)) {
      const A = L.getBoundingClientRect();
      let T = !1, J = g.left, ue = g.top;
      A.right >= C.right && (J = C.width - A.width - 5, T = !0), A.bottom >= C.bottom && (ue = g.top - (A.bottom - C.bottom + 2), T = !0), T && V((ie) => ie && { ...ie, left: J, top: ue });
    }
  }, [g, C, s]);
  const G = le(null), Z = 300, u = (L) => {
    clearTimeout(G.current), G.current = setTimeout(() => {
      L();
    }, Z);
  };
  function M(L) {
    let { id: A, tooltip: T, target: J, at: ue } = z(L.target);
    if (V(null), i(null), !T)
      if (A)
        T = B(A);
      else {
        clearTimeout(G.current);
        return;
      }
    const ie = L.clientX;
    u(() => {
      A && i(P(H(A)));
      const ne = J.getBoundingClientRect(), ee = r.current, ge = ee ? ee.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let k, v;
      ue === "left" ? (k = ne.top + 5 - ge.top, v = ne.right + 5 - ge.left) : (k = ne.top + ne.height - ge.top, v = ie - ge.left), x(ge), V({ top: k, left: v, text: T });
    });
  }
  function P(L) {
    return n?.getTask(H(L)) || null;
  }
  function B(L) {
    return P(L)?.text || "";
  }
  function H(L) {
    const A = parseInt(L);
    return isNaN(A) ? L : A;
  }
  return /* @__PURE__ */ He(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: r,
      onMouseMove: M,
      children: [
        g && (g.text || s) ? /* @__PURE__ */ d(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: _,
            style: { top: `${g.top}px`, left: `${g.left}px` },
            children: s ? /* @__PURE__ */ d(s, { data: y }) : g.text ? /* @__PURE__ */ d("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: g.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function Is({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(Ct, { fonts: t, children: n() }) : /* @__PURE__ */ d(Ct, { fonts: t });
}
function Ns({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d($t, { fonts: t, children: n }) : /* @__PURE__ */ d($t, { fonts: t });
}
function Ls({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(Mt, { fonts: t, children: n }) : /* @__PURE__ */ d(Mt, { fonts: t });
}
export {
  Ss as ContextMenu,
  Ds as Editor,
  $s as Gantt,
  Es as HeaderMenu,
  Is as Material,
  Ms as Toolbar,
  Rs as Tooltip,
  Ns as Willow,
  Ls as WillowDark,
  As as defaultColumns,
  Hs as defaultEditorItems,
  Ws as defaultMenuOptions,
  Os as defaultTaskTypes,
  zs as defaultToolbarButtons,
  Gs as getEditorItems,
  Us as getMenuOptions,
  Ys as getToolbarButtons,
  Fs as registerEditorItem,
  Xs as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
