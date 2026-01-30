import { jsxs as He, jsx as a, Fragment as Ze } from "react/jsx-runtime";
import { createContext as jt, useMemo as $, useState as xe, useContext as ze, useCallback as D, useRef as oe, useEffect as le, Fragment as Qt, forwardRef as Pt, useImperativeHandle as Ht } from "react";
import { context as Ye, Button as bt, Field as Zt, Text as Jt, Combo as en, DatePicker as tn, TimePicker as nn, Locale as sn, RichSelect as rn, TwoState as on, Slider as ln, Counter as cn, Material as vt, Willow as Tt, WillowDark as $t } from "@svar-ui/react-core";
import { locate as Xe, locateID as Be, locateAttr as an, dateToString as st, locale as rt } from "@svar-ui/lib-dom";
import { en as ot } from "@svar-ui/gantt-locales";
import { en as ut } from "@svar-ui/core-locales";
import { EventBusRouter as un } from "@svar-ui/lib-state";
import { prepareEditTask as At, grid as dn, extendDragOptions as fn, isSegmentMoveAllowed as hn, DataStore as mn, normalizeLinks as wn, normalizeZoom as gn, defaultColumns as xn, parseTaskDates as Mt, defaultTaskTypes as pn, getToolbarButtons as Ct, handleAction as Wt, isHandledAction as _t, getMenuOptions as Dt, getEditorItems as yn } from "@svar-ui/gantt-store";
import { defaultColumns as Ss, defaultEditorItems as Ns, defaultMenuOptions as Ls, defaultTaskTypes as Is, defaultToolbarButtons as Ps, getEditorItems as Hs, getMenuOptions as As, getToolbarButtons as Ws, registerScaleUnit as _s } from "@svar-ui/gantt-store";
import { useWritableProp as at, useStore as q, useStoreWithCounter as nt, writable as kn, useStoreLater as Ke } from "@svar-ui/lib-react";
import { hotkeys as zt } from "@svar-ui/grid-store";
import { Grid as bn, HeaderMenu as vn } from "@svar-ui/react-grid";
import { flushSync as Tn } from "react-dom";
import { Toolbar as Rt } from "@svar-ui/react-toolbar";
import { ContextMenu as $n } from "@svar-ui/react-menu";
import { Editor as Mn, registerEditorItem as Ue } from "@svar-ui/react-editor";
import { registerEditorItem as Gs } from "@svar-ui/react-editor";
const Fe = jt(null);
function qe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Cn(t, n, s) {
  const i = t.getBoundingClientRect(), r = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: i.top - r.top,
    left: i.left - r.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top
  };
}
function Et(t) {
  return t && t.getAttribute("data-context-id");
}
const St = 5;
function Dn(t, n) {
  let s, i, r, N, m, o, u, G, x;
  function J(g) {
    N = g.clientX, m = g.clientY, o = {
      ...Cn(s, t, g),
      y: n.getTask(r).$y
    }, document.body.style.userSelect = "none";
  }
  function R(g) {
    s = Xe(g), Et(s) && (r = qe(s), x = setTimeout(() => {
      G = !0, n && n.touchStart && n.touchStart(), J(g.touches[0]);
    }, 500), t.addEventListener("touchmove", I), t.addEventListener("contextmenu", d), window.addEventListener("touchend", Y));
  }
  function d(g) {
    if (G || x)
      return g.preventDefault(), !1;
  }
  function X(g) {
    g.which === 1 && (s = Xe(g), Et(s) && (r = qe(s), t.addEventListener("mousemove", ee), window.addEventListener("mouseup", C), J(g)));
  }
  function w(g) {
    t.removeEventListener("mousemove", ee), t.removeEventListener("touchmove", I), document.body.removeEventListener("mouseup", C), document.body.removeEventListener("touchend", Y), document.body.style.userSelect = "", g && (t.removeEventListener("mousedown", X), t.removeEventListener("touchstart", R));
  }
  function E(g) {
    const ne = g.clientX - N, V = g.clientY - m;
    if (!i) {
      if (Math.abs(ne) < St && Math.abs(V) < St || n && n.start && n.start({ id: r, e: g }) === !1)
        return;
      i = s.cloneNode(!0), i.style.pointerEvents = "none", i.classList.add("wx-reorder-task"), i.style.position = "absolute", i.style.left = o.left + "px", i.style.top = o.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const pe = Math.round(Math.max(0, o.top + V));
      if (n && n.move && n.move({ id: r, top: pe, detail: u }) === !1)
        return;
      const P = n.getTask(r), me = P.$y;
      if (!o.start && o.y == me) return K();
      o.start = !0, o.y = P.$y - 4, i.style.top = pe + "px";
      const ie = document.elementFromPoint(
        g.clientX,
        g.clientY
      ), h = Xe(ie);
      if (h && h !== s) {
        const T = qe(h), H = h.getBoundingClientRect(), fe = H.top + H.height / 2, se = g.clientY + o.db > fe && h.nextElementSibling !== s, ce = g.clientY - o.dt < fe && h.previousElementSibling !== s;
        u?.after == T || u?.before == T ? u = null : se ? u = { id: r, after: T } : ce && (u = { id: r, before: T });
      }
    }
  }
  function ee(g) {
    E(g);
  }
  function I(g) {
    G ? (g.preventDefault(), E(g.touches[0])) : x && (clearTimeout(x), x = null);
  }
  function Y() {
    G = null, x && (clearTimeout(x), x = null), K();
  }
  function C() {
    K();
  }
  function K() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: r, top: o.top })), r = s = i = o = u = null, w();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", X), t.addEventListener("touchstart", R), {
    destroy() {
      w(!0);
    }
  };
}
function Rn({ row: t, column: n }) {
  function s(r, N) {
    return {
      justifyContent: N.align,
      paddingLeft: `${(r.$level - 1) * 20}px`
    };
  }
  const i = n && n._cell;
  return /* @__PURE__ */ He("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ a(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ a("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ a("div", { className: "wx-pqc08MHU wx-text", children: i ? /* @__PURE__ */ a(i, { row: t, column: n }) : t.text })
  ] });
}
function Nt({ column: t, cell: n }) {
  const s = $(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ a("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ a(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function En(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: r = "all",
    columnWidth: N = 0,
    onTableAPIChange: m,
    multiTaskRows: o = !1,
    rowMapping: u = null
  } = t, [G, x] = at(N), [J, R] = xe(), d = ze(Ye.i18n), X = $(() => d.getGroup("gantt"), [d]), w = ze(Fe), E = q(w, "scrollTop"), ee = q(w, "cellHeight"), I = q(w, "_scrollTask"), Y = q(w, "_selected"), C = q(w, "area"), K = q(w, "_tasks"), g = q(w, "_scales"), ne = q(w, "columns"), V = q(w, "_sort"), pe = q(w, "calendar"), P = q(w, "durationUnit"), me = q(w, "splitTasks"), [ie, h] = xe(null), T = $(() => !K || !C ? [] : o && u ? K : K.slice(C.start, C.end), [K, C, o, u]), H = D(
    (l, k) => {
      if (k === "add-task")
        w.exec(k, {
          target: l,
          task: { text: X("New Task") },
          mode: "child",
          show: !0
        });
      else if (k === "open-task") {
        const b = T.find((W) => W.id === l);
        (b?.data || b?.lazy) && w.exec(k, { id: l, mode: !b.open });
      }
    },
    [T]
  ), fe = D(
    (l) => {
      const k = Be(l), b = l.target.dataset.action;
      b && l.preventDefault(), k ? b === "add-task" || b === "open-task" ? H(k, b) : w.exec("select-task", {
        id: k,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : b === "add-task" && H(null, b);
    },
    [w, H]
  ), se = oe(null), ce = oe(null), [we, ye] = xe(0), [Ee, Ce] = xe(!1);
  le(() => {
    const l = ce.current;
    if (!l || typeof ResizeObserver > "u") return;
    const k = () => ye(l.clientWidth);
    k();
    const b = new ResizeObserver(k);
    return b.observe(l), () => b.disconnect();
  }, []);
  const Se = oe(null), Re = D(
    (l) => {
      const k = l.id, { before: b, after: W } = l, ve = l.onMove;
      let be = b || W, De = b ? "before" : "after";
      if (ve) {
        if (De === "after") {
          const _e = w.getTask(be);
          _e.data?.length && _e.open && (De = "before", be = _e.data[0].id);
        }
        Se.current = { id: k, [De]: be };
      } else Se.current = null;
      w.exec("move-task", {
        id: k,
        mode: De,
        target: be,
        inProgress: ve
      });
    },
    [w]
  ), O = $(() => o && u ? 0 : C?.from ?? 0, [C, o, u]), y = $(() => g?.height ?? 0, [g]), A = $(() => !s && r !== "grid" ? (G ?? 0) > (i ?? 0) : (G ?? 0) > (we ?? 0), [s, r, G, i, we]), B = $(() => {
    const l = {};
    return A && r === "all" || r === "grid" && A ? l.width = G : r === "grid" && (l.width = "100%"), l;
  }, [A, r, G]), U = $(() => ie && !T.find((l) => l.id === ie.id) ? [...T, ie] : T, [T, ie]), j = $(() => {
    if (!o || !u) return U;
    const l = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set();
    return U.forEach((b) => {
      const W = u.taskRows.get(b.id) ?? b.id;
      k.has(W) || (l.set(W, {
        ...b,
        $rowTasks: u.rowMap.get(W) || [b.id]
      }), k.add(W));
    }), Array.from(l.values());
  }, [U, o, u]), ue = $(() => {
    let l = (ne || []).map((W) => {
      W = { ...W };
      const ve = W.header;
      if (typeof ve == "object") {
        const be = ve.text && X(ve.text);
        W.header = { ...ve, text: be };
      } else W.header = X(ve);
      return W;
    });
    const k = l.findIndex((W) => W.id === "text"), b = l.findIndex((W) => W.id === "add-task");
    if (k !== -1 && (l[k].cell && (l[k]._cell = l[k].cell), l[k].cell = Rn), b !== -1) {
      l[b].cell = l[b].cell || Nt;
      const W = l[b].header;
      if (typeof W != "object" && (l[b].header = { text: W }), l[b].header.cell = W.cell || Nt, n)
        l.splice(b, 1);
      else if (s) {
        const [ve] = l.splice(b, 1);
        l.unshift(ve);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [ne, X, n, s]), ae = $(() => r === "all" ? `${i}px` : r === "grid" ? "calc(100% - 4px)" : ue.find((l) => l.id === "add-task") ? "50px" : "0", [r, i, ue]), v = $(() => {
    if (j && V?.length) {
      const l = {};
      return V.forEach(({ key: k, order: b }, W) => {
        l[k] = {
          order: b,
          ...V.length > 1 && { index: W }
        };
      }), l;
    }
    return {};
  }, [j, V]), Q = D(() => ue.some((l) => l.flexgrow && !l.hidden), []), he = $(() => Q(), [Q, Ee]), de = $(() => {
    let l = r === "chart" ? ue.filter((b) => b.id === "add-task") : ue;
    const k = r === "all" ? i : we;
    if (!he) {
      let b = G, W = !1;
      if (ue.some((ve) => ve.$width)) {
        let ve = 0;
        b = ue.reduce((be, De) => (De.hidden || (ve += De.width, be += De.$width || De.width), be), 0), ve > b && b > k && (W = !0);
      }
      if (W || b < k) {
        let ve = 1;
        return W || (ve = (k - 50) / (b - 50 || 1)), l.map((be) => (be.id !== "add-task" && !be.hidden && (be.$width || (be.$width = be.width), be.width = be.$width * ve), be));
      }
    }
    return l;
  }, [r, ue, he, G, i, we]), Ie = D(
    (l) => {
      if (!Q()) {
        const k = de.reduce((b, W) => (l && W.$width && (W.$width = W.width), b + (W.hidden ? 0 : W.width)), 0);
        k !== G && x(k);
      }
      Ce(!0), Ce(!1);
    },
    [Q, de, G, x]
  ), p = D(() => {
    ue.filter((k) => k.flexgrow && !k.hidden).length === 1 && ue.forEach((k) => {
      k.$width && !k.flexgrow && !k.hidden && (k.width = k.$width);
    });
  }, []), re = D(
    (l) => {
      if (!n) {
        const k = Be(l), b = an(l, "data-col-id");
        !(b && ue.find((ve) => ve.id == b))?.editor && k && w.exec("show-editor", { id: k });
      }
    },
    [w, n]
    // cols is defined later; relies on latest value at call time
  ), ge = $(
    () => Array.isArray(Y) ? Y.map((l) => l.id) : [],
    [Y]
  ), F = oe(O);
  F.current = O, le(() => {
    const l = (b) => {
      if (se.current) {
        const W = se.current.querySelector(".wx-body");
        W && (W.style.top = -((b ?? 0) - (F.current ?? 0)) + "px");
      }
      ce.current && (ce.current.scrollTop = 0);
    };
    return l(E), w.on("scroll-chart", ({ top: b }) => {
      b !== void 0 && l(b);
    });
  }, [w, E]), le(() => {
    if (se.current) {
      const l = se.current.querySelector(".wx-body");
      l && (l.style.top = -((E ?? 0) - (O ?? 0)) + "px");
    }
  }, [O]), le(() => {
    const l = se.current;
    if (!l) return;
    const k = l.querySelector(".wx-table-box .wx-body");
    if (!k || typeof ResizeObserver > "u") return;
    const b = new ResizeObserver(() => {
      if (se.current) {
        const W = se.current.querySelector(".wx-body");
        W && (W.style.top = -((E ?? 0) - (F.current ?? 0)) + "px");
      }
    });
    return b.observe(k), () => {
      b.disconnect();
    };
  }, [de, B, r, ae, j, E]), le(() => {
    if (!I || !J) return;
    const { id: l } = I, k = J.getState().focusCell;
    k && k.row !== l && se.current && se.current.contains(document.activeElement) && J.exec("focus-cell", {
      row: l,
      column: k.column
    });
  }, [I, J]);
  const Z = D(
    ({ id: l }) => {
      if (n) return !1;
      w.getTask(l).open && w.exec("open-task", { id: l, mode: !1 });
      const k = w.getState()._tasks.find((b) => b.id === l);
      if (h(k || null), !k) return !1;
    },
    [w, n]
  ), ke = D(
    ({ id: l, top: k }) => {
      Se.current ? Re({ ...Se.current, onMove: !1 }) : w.exec("drag-task", {
        id: l,
        top: k + (O ?? 0),
        inProgress: !1
      }), h(null);
    },
    [w, Re, O]
  ), Te = D(
    ({ id: l, top: k, detail: b }) => {
      b && Re({ ...b, onMove: !0 }), w.exec("drag-task", {
        id: l,
        top: k + (O ?? 0),
        inProgress: !0
      });
    },
    [w, Re, O]
  );
  le(() => {
    const l = se.current;
    return l ? Dn(l, {
      start: Z,
      end: ke,
      move: Te,
      getTask: w.getTask
    }).destroy : void 0;
  }, [w, Z, ke, Te]);
  const Ne = D(
    (l) => {
      const { key: k, isInput: b } = l;
      if (!b && (k === "arrowup" || k === "arrowdown"))
        return l.eventSource = "grid", w.exec("hotkey", l), !1;
      if (k === "enter") {
        const W = J?.getState().focusCell;
        if (W) {
          const { row: ve, column: be } = W;
          be === "add-task" ? H(ve, "add-task") : be === "text" && H(ve, "open-task");
        }
      }
    },
    [w, H, J]
  ), Me = oe(null), Ae = () => {
    Me.current = {
      setTableAPI: R,
      handleHotkey: Ne,
      sortVal: V,
      api: w,
      adjustColumns: p,
      setColumnWidth: Ie,
      tasks: T,
      calendarVal: pe,
      durationUnitVal: P,
      splitTasksVal: me,
      onTableAPIChange: m
    };
  };
  Ae(), le(() => {
    Ae();
  }, [
    R,
    Ne,
    V,
    w,
    p,
    Ie,
    T,
    pe,
    P,
    me,
    m
  ]);
  const Ve = D((l) => {
    R(l), l.intercept("hotkey", (k) => Me.current.handleHotkey(k)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (k) => {
      const b = Me.current.sortVal, { key: W, add: ve } = k, be = b ? b.find((_e) => _e.key === W) : null;
      let De = "asc";
      return be && (De = !be || be.order === "asc" ? "desc" : "asc"), w.exec("sort-tasks", {
        key: W,
        order: De,
        add: ve
      }), !1;
    }), l.on("resize-column", () => {
      Me.current.setColumnWidth(!0);
    }), l.on("hide-column", (k) => {
      k.mode || Me.current.adjustColumns(), Me.current.setColumnWidth();
    }), l.intercept("update-cell", (k) => {
      const { id: b, column: W, value: ve } = k, be = Me.current.tasks.find((De) => De.id === b);
      if (be) {
        const De = { ...be };
        let _e = ve;
        _e && !isNaN(_e) && !(_e instanceof Date) && (_e *= 1), De[W] = _e, At(
          De,
          {
            calendar: Me.current.calendarVal,
            durationUnit: Me.current.durationUnitVal,
            splitTasks: Me.current.splitTasksVal
          },
          W
        ), w.exec("update-task", {
          id: b,
          task: De
        });
      }
      return !1;
    }), m && m(l);
  }, []);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ae}` },
      ref: ce,
      children: /* @__PURE__ */ a(
        "div",
        {
          ref: se,
          style: B,
          className: "wx-rHj6070p wx-table",
          onClick: fe,
          onDoubleClick: re,
          children: /* @__PURE__ */ a(
            bn,
            {
              init: Ve,
              sizes: {
                rowHeight: ee,
                headerHeight: (y ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: j,
              columns: de,
              selectedRows: [...ge],
              sortMarks: v
            }
          )
        }
      )
    }
  );
}
function Sn({ borders: t = "" }) {
  const n = ze(Fe), s = q(n, "cellWidth"), i = q(n, "cellHeight"), r = oe(null), [N, m] = xe("#e4e4e4");
  le(() => {
    if (typeof getComputedStyle < "u" && r.current) {
      const u = getComputedStyle(r.current).getPropertyValue(
        "--wx-gantt-border"
      );
      m(u ? u.substring(u.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const o = {
    width: "100%",
    height: "100%",
    background: s != null && i != null ? `url(${dn(s, i, N, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ a("div", { ref: r, style: o });
}
function Nn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = ze(Fe), r = q(i, "_links"), N = q(i, "criticalPath"), m = oe(null), o = D(
    (u) => {
      const G = u?.target?.classList;
      !G?.contains("wx-line") && !G?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return le(() => {
    if (!s && n && m.current) {
      const u = (G) => {
        m.current && !m.current.contains(G.target) && o(G);
      };
      return document.addEventListener("click", u), () => {
        document.removeEventListener("click", u);
      };
    }
  }, [s, n, o]), /* @__PURE__ */ He("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (r || []).map((u) => {
      const G = "wx-dkx3NwEn wx-line" + (N && u.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ a(
        "polyline",
        {
          className: G,
          points: u.$p,
          onClick: () => !s && t(u.id),
          "data-link-id": u.id
        },
        u.id
      );
    }),
    !s && n && /* @__PURE__ */ a(
      "polyline",
      {
        ref: m,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function Ln(t) {
  const { task: n, type: s } = t;
  function i(N) {
    const m = n.segments[N];
    return {
      left: `${m.$x}px`,
      top: "0px",
      width: `${m.$w}px`,
      height: "100%"
    };
  }
  function r(N) {
    if (!n.progress) return 0;
    const m = n.duration * n.progress / 100, o = n.segments;
    let u = 0, G = 0, x = null;
    do {
      const J = o[G];
      G === N && (u > m ? x = 0 : x = Math.min((m - u) / J.duration, 1) * 100), u += J.duration, G++;
    } while (x === null && G < o.length);
    return x || 0;
  }
  return /* @__PURE__ */ a("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((N, m) => /* @__PURE__ */ He(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": m,
      style: i(m),
      children: [
        n.progress ? /* @__PURE__ */ a("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ a(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${r(m)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ a("div", { className: "wx-content", children: N.text || "" })
      ]
    },
    m
  )) });
}
let lt = [], ct = null, Lt = null;
const It = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: i, lengthUnit: r } = n, N = 864e5, m = r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1, o = Math.floor(t / i), u = new Date(s.getTime() + o * m * N);
  return u.setHours(0, 0, 0, 0), u;
}, In = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: i } = s, m = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / m);
}, Pn = (t, n, s) => {
  if (!s || !t) return t;
  const { lengthUnit: i } = s, m = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5, o = new Date(t.getTime() + n * m);
  return o.setHours(0, 0, 0, 0), o;
};
function Hn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: i = !1,
    rowMapping: r = null,
    marqueeSelect: N = !1,
    copyPaste: m = !1
  } = t, o = ze(Fe), [u, G] = nt(o, "_tasks"), [x, J] = nt(o, "_links"), R = q(o, "area"), d = q(o, "_scales"), X = q(o, "taskTypes"), w = q(o, "baselines"), [E, ee] = nt(o, "_selected"), I = q(o, "_scrollTask"), Y = q(o, "criticalPath"), C = q(o, "tasks"), K = q(o, "schedule"), g = q(o, "splitTasks"), ne = $(() => {
    if (!R || !Array.isArray(u)) return [];
    const e = R.start ?? 0, c = R.end ?? 0;
    return i && r ? u.map((f) => ({ ...f })) : u.slice(e, c).map((f) => ({ ...f }));
  }, [G, R, i, r]), V = q(o, "cellHeight"), pe = $(() => {
    if (!i || !r || !ne.length) return ne;
    const e = /* @__PURE__ */ new Map(), c = [];
    return u.forEach((f) => {
      const M = r.taskRows.get(f.id) ?? f.id;
      e.has(M) || (e.set(M, c.length), c.push(M));
    }), ne.map((f) => {
      const M = r.taskRows.get(f.id) ?? f.id, L = e.get(M) ?? 0;
      return {
        ...f,
        $y: L * V,
        $y_base: f.$y_base !== void 0 ? L * V : void 0
      };
    });
  }, [ne, i, r, u, V]), P = $(
    () => d.lengthUnitWidth,
    [d]
  ), me = $(
    () => d.lengthUnit || "day",
    [d]
  ), ie = oe(!1), [h, T] = xe(void 0), [H, fe] = xe(null), se = oe(null), [ce, we] = xe(null), [ye, Ee] = xe(void 0), Ce = oe(null), [Se, Re] = xe(0), [O, y] = xe(null), A = oe(null), [B, U] = xe(null), [j, ue] = xe(null), [ae, v] = xe(null), Q = oe(null);
  Q.current = j;
  const he = oe(200), de = oe(null), Ie = $(() => {
    const e = de.current;
    return !!(E.length && e && e.contains(document.activeElement));
  }, [E, de.current]), p = $(() => Ie && E[E.length - 1]?.id, [Ie, E]);
  le(() => {
    if (I && Ie && I) {
      const { id: e } = I, c = de.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [I]), le(() => {
    const e = de.current;
    if (e && (Re(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((f) => {
        f[0] && Re(f[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [de.current]);
  const re = D(() => {
    document.body.style.userSelect = "none";
  }, []), ge = D(() => {
    document.body.style.userSelect = "";
  }, []), F = D(
    (e, c, f) => {
      if (c.target.classList.contains("wx-line") || (f || (f = o.getTask(qe(e))), f.type === "milestone" || f.type === "summary")) return "";
      const M = Xe(c, "data-segment");
      M && (e = M);
      const { left: L, width: S } = e.getBoundingClientRect(), _ = (c.clientX - L) / S;
      let z = 0.2 / (S > 200 ? S / 200 : 1);
      return _ < z ? "start" : _ > 1 - z ? "end" : "";
    },
    [o]
  ), Z = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !r)
      return u.forEach((M) => {
        e.set(M.id, M.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), f = [];
    return u.forEach((M) => {
      const L = r.taskRows.get(M.id) ?? M.id;
      c.has(L) || (c.set(L, f.length), f.push(L));
    }), u.forEach((M) => {
      const L = r.taskRows.get(M.id) ?? M.id, S = c.get(L) ?? 0;
      e.set(M.id, S * V);
    }), e;
  }, [u, i, r, V]), ke = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !r)
      return u.forEach((M) => {
        e.set(M.id, M.$y), M.row !== void 0 && e.set(M.row, M.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), f = [];
    return u.forEach((M) => {
      const L = r.taskRows.get(M.id) ?? M.id;
      c.has(L) || (c.set(L, f.length), f.push(L));
    }), c.forEach((M, L) => {
      e.set(L, M * V);
    }), e;
  }, [u, i, r, V]), Te = D(
    (e) => {
      if (!de.current) return [];
      const f = Math.min(e.startX, e.currentX), M = Math.max(e.startX, e.currentX), L = Math.min(e.startY, e.currentY), S = Math.max(e.startY, e.currentY);
      return u.filter((_) => {
        const z = _.$x, te = _.$x + _.$w, Le = Z.get(_.id) ?? _.$y, We = Le + _.$h;
        return z < M && te > f && Le < S && We > L;
      });
    },
    [u, Z]
  ), Ne = $(() => new Set(E.map((e) => e.id)), [E, ee]), Me = D(
    (e) => Ne.has(e),
    [Ne]
  ), Ae = D(
    (e, c) => {
      const { clientX: f } = c, M = qe(e), L = o.getTask(M), S = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (S.contains("wx-progress-marker")) {
          const { progress: _ } = o.getTask(M);
          se.current = {
            id: M,
            x: f,
            progress: _,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const _ = F(e, c, L) || "move", z = {
            id: M,
            mode: _,
            x: f,
            dx: 0,
            l: L.$x,
            w: L.$w
          };
          if (g && L.segments?.length) {
            const te = Xe(c, "data-segment");
            te && (z.segmentIndex = te.dataset.segment * 1, fn(L, z));
          }
          fe(z);
        }
        re();
      }
    },
    [o, n, F, re, g]
  ), Ve = D(
    (e) => {
      if (e.button !== 0 || ae) return;
      const c = Xe(e);
      if (!c && N && !n) {
        const f = de.current;
        if (!f) return;
        const M = f.getBoundingClientRect(), L = e.clientX - M.left, S = e.clientY - M.top;
        if (m) {
          const z = It(L, d);
          z && (Q.current = z, ue(z));
        }
        const _ = {
          startX: L,
          startY: S,
          currentX: L,
          currentY: S,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        y(_), A.current = _, re();
        return;
      }
      if (c) {
        if (N && !n && E.length > 1) {
          const f = qe(c);
          if (Me(f)) {
            const M = e.target.classList;
            if (!M.contains("wx-link") && !M.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const L = o.getTask(f);
              if (!F(c, e, L)) {
                const _ = /* @__PURE__ */ new Map();
                E.forEach((z) => {
                  const te = o.getTask(z.id);
                  if (te) {
                    if (K?.auto && te.type === "summary") return;
                    _.set(z.id, {
                      $x: te.$x,
                      $w: te.$w,
                      start: te.start,
                      end: te.end
                    });
                  }
                }), U({
                  baseTaskId: f,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: _
                }), re();
                return;
              }
            }
          }
        }
        Ae(c, e);
      }
    },
    [Ae, N, m, n, E, Me, o, F, K, re, d, ae]
  ), l = D(
    (e) => {
      const c = Xe(e);
      c && (Ce.current = setTimeout(() => {
        Ee(!0), Ae(c, e.touches[0]);
      }, 300));
    },
    [Ae]
  ), k = D(
    (e) => {
      we(e && { ...x.find((c) => c.id === e) });
    },
    [x]
  ), b = D(() => {
    const e = A.current;
    if (e) {
      const c = Te(e);
      e.ctrlKey ? c.forEach((f) => {
        o.exec("select-task", { id: f.id, toggle: !0, marquee: !0 });
      }) : (E.length > 0 && o.exec("select-task", { id: null, marquee: !0 }), c.forEach((f, M) => {
        o.exec("select-task", {
          id: f.id,
          toggle: M > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), y(null), A.current = null, ge(), ie.current = !0;
      return;
    }
    if (B) {
      const { dx: c, originalPositions: f } = B, M = Math.round(c / P);
      if (M !== 0) {
        let L = !0;
        f.forEach((S, _) => {
          const z = o.getTask(_);
          z && (o.exec("update-task", {
            id: _,
            diff: M,
            task: { start: z.start, end: z.end },
            skipUndo: !L
            // Only first task creates undo entry
          }), L = !1);
        }), ie.current = !0;
      } else
        f.forEach((L, S) => {
          o.exec("drag-task", {
            id: S,
            left: L.$x,
            width: L.$w,
            inProgress: !1
          });
        });
      U(null), ge();
      return;
    }
    if (se.current) {
      const { dx: c, id: f, marker: M, value: L } = se.current;
      se.current = null, typeof L < "u" && c && o.exec("update-task", {
        id: f,
        task: { progress: L },
        inProgress: !1
      }), M.classList.remove("wx-progress-in-drag"), ie.current = !0, ge();
    } else if (H) {
      const { id: c, mode: f, dx: M, l: L, w: S, start: _, segment: z, index: te } = H;
      if (fe(null), _) {
        const $e = Math.round(M / P);
        if (!$e)
          o.exec("drag-task", {
            id: c,
            width: S,
            left: L,
            inProgress: !1,
            ...z && { segmentIndex: te }
          });
        else {
          let Le = {}, We = o.getTask(c);
          z && (We = We.segments[te]);
          const Oe = 1440 * 60 * 1e3, Pe = $e * (me === "week" ? 7 : me === "month" ? 30 : me === "quarter" ? 91 : me === "year" ? 365 : 1) * Oe;
          f === "move" ? (Le.start = new Date(We.start.getTime() + Pe), Le.end = new Date(We.end.getTime() + Pe)) : f === "start" ? (Le.start = new Date(We.start.getTime() + Pe), Le.end = We.end) : f === "end" && (Le.start = We.start, Le.end = new Date(We.end.getTime() + Pe)), o.exec("update-task", {
            id: c,
            task: Le,
            ...z && { segmentIndex: te }
          });
        }
        ie.current = !0;
      }
      ge();
    }
  }, [o, ge, H, P, me, O, B, Te, E]), W = D(
    (e, c) => {
      const { clientX: f, clientY: M } = c, L = de.current;
      if (L) {
        const S = L.getBoundingClientRect();
        he.current = f - S.left;
      }
      if (ae) {
        if (!L) return;
        const S = L.getBoundingClientRect(), _ = f - S.left;
        v((z) => ({ ...z, currentX: _ }));
        return;
      }
      if (!n) {
        if (O) {
          const S = de.current;
          if (!S) return;
          const _ = S.getBoundingClientRect(), z = f - _.left, te = M - _.top;
          y(($e) => ({
            ...$e,
            currentX: z,
            currentY: te
          })), A.current && (A.current.currentX = z, A.current.currentY = te);
          return;
        }
        if (B) {
          const S = f - B.startX;
          B.originalPositions.forEach((_, z) => {
            const te = _.$x + S;
            o.exec("drag-task", {
              id: z,
              left: te,
              width: _.$w,
              inProgress: !0
            });
          }), U((_) => ({ ..._, dx: S }));
          return;
        }
        if (se.current) {
          const { node: S, x: _, id: z } = se.current, te = se.current.dx = f - _, $e = Math.round(te / S.offsetWidth * 100);
          let Le = se.current.progress + $e;
          se.current.value = Le = Math.min(
            Math.max(0, Le),
            100
          ), o.exec("update-task", {
            id: z,
            task: { progress: Le },
            inProgress: !0
          });
        } else if (H) {
          k(null);
          const { mode: S, l: _, w: z, x: te, id: $e, start: Le, segment: We, index: Oe } = H, Ge = o.getTask($e), Pe = f - te;
          if (!Le && Math.abs(Pe) < 20 || S === "start" && z - Pe < P || S === "end" && z + Pe < P || S === "move" && (Pe < 0 && _ + Pe < 0 || Pe > 0 && _ + z + Pe > Se) || H.segment && !hn(Ge, H))
            return;
          const tt = { ...H, dx: Pe };
          let je, Qe;
          if (S === "start" ? (je = _ + Pe, Qe = z - Pe) : S === "end" ? (je = _, Qe = z + Pe) : S === "move" && (je = _ + Pe, Qe = z), o.exec("drag-task", {
            id: $e,
            width: Qe,
            left: je,
            inProgress: !0,
            ...We && { segmentIndex: Oe }
          }), !tt.start && (S === "move" && Ge.$x == _ || S !== "move" && Ge.$w == z)) {
            ie.current = !0, b();
            return;
          }
          tt.start = !0, fe(tt);
        } else {
          const S = Xe(e);
          if (S) {
            const _ = o.getTask(qe(S)), te = Xe(e, "data-segment") || S, $e = F(te, c, _);
            te.style.cursor = $e && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      o,
      n,
      H,
      P,
      Se,
      F,
      k,
      b,
      O,
      B,
      ae
    ]
  ), ve = D(
    (e) => {
      W(e, e);
    },
    [W]
  ), be = D(
    (e) => {
      ye ? (e.preventDefault(), W(e, e.touches[0])) : Ce.current && (clearTimeout(Ce.current), Ce.current = null);
    },
    [ye, W]
  ), De = D(() => {
    b();
  }, [b]), _e = D(() => {
    Ee(null), Ce.current && (clearTimeout(Ce.current), Ce.current = null), b();
  }, [b]);
  le(() => (window.addEventListener("mouseup", De), () => {
    window.removeEventListener("mouseup", De);
  }), [De]);
  const Xt = D(
    (e) => {
      if (!n) {
        const c = Be(e.target);
        if (c && !e.target.classList.contains("wx-link")) {
          const f = Be(e.target, "data-segment");
          o.exec("show-editor", {
            id: c,
            ...f !== null && { segmentIndex: f }
          });
        }
      }
    },
    [o, n]
  ), Yt = ["e2s", "s2s", "e2e", "s2e"], Je = D((e, c) => Yt[(e ? 1 : 0) + (c ? 0 : 2)], []), et = D(
    (e, c) => {
      const f = h.id, M = h.start;
      return e === f ? !0 : !!x.find((L) => L.target == e && L.source == f && L.type === Je(M, c));
    },
    [h, J, Je]
  ), dt = D(() => {
    h && T(null);
  }, [h]), ft = D((e, c, f) => {
    if (!c.length || !e || f == null) return;
    const M = 864e5, L = o.getHistory();
    L?.startBatch();
    const S = new Date(e), _ = S.getDay(), z = _ === 0 ? -6 : 1 - _;
    S.setDate(S.getDate() + z), S.setHours(0, 0, 0, 0), c.forEach((te, $e) => {
      const Le = `task-${Date.now()}-${$e}`, We = Pn(S, te._startCellOffset || 0, d), Oe = new Date(We.getTime() + (te._startDayOfWeek || 0) * M);
      Oe.setHours(0, 0, 0, 0);
      const Ge = new Date(Oe.getTime() + (te._durationDays || 7) * M);
      Ge.setHours(0, 0, 0, 0), console.log("[paste] task:", te.text, "newStart:", Oe, "newEnd:", Ge, "_durationDays:", te._durationDays, "_startDayOfWeek:", te._startDayOfWeek), o.exec("add-task", {
        task: {
          id: Le,
          text: te.text,
          start: Oe,
          end: Ge,
          type: te.type || "task",
          parent: f,
          row: te.row
        },
        target: f,
        mode: "child",
        skipUndo: $e > 0
      });
    }), L?.endBatch();
  }, [o, d]), Kt = D(
    (e) => {
      if (ie.current) {
        ie.current = !1;
        return;
      }
      if (ae && ae.currentX != null) {
        const f = It(ae.currentX, d);
        f && ft(f, ae.tasks, ae.parent), v(null);
        return;
      }
      const c = Be(e.target);
      if (c) {
        const f = o.getTask(c), M = u.find((S) => S.id === c);
        console.log("[click] task:", f?.text, "id:", c), console.log("[click] api.getTask:", { start: f?.start, end: f?.end, duration: f?.duration }), console.log("[click] rendered:", { start: M?.start, end: M?.end, $w: M?.$w, $x: M?.$x });
        const L = e.target.classList;
        if (L.contains("wx-link")) {
          const S = L.contains("wx-left");
          if (!h) {
            T({ id: c, start: S });
            return;
          }
          h.id !== c && !et(c, S) && o.exec("add-link", {
            link: {
              source: h.id,
              target: c,
              type: Je(h.start, S)
            }
          });
        } else if (L.contains("wx-delete-button-icon"))
          o.exec("delete-link", { id: ce.id }), we(null);
        else {
          let S;
          const _ = Xe(e, "data-segment");
          _ && (S = _.dataset.segment * 1), o.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: S
          });
        }
      }
      dt();
    },
    [
      o,
      h,
      J,
      ce,
      et,
      Je,
      dt,
      ae,
      d,
      ft
    ]
  ), Ft = D((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), qt = D((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Vt = D(
    (e) => {
      if (ye || Ce.current)
        return e.preventDefault(), !1;
    },
    [ye]
  ), ht = $(
    () => X.map((e) => e.id),
    [X]
  ), mt = D(
    (e) => {
      let c = ht.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [ht]
  ), wt = D(
    (e) => {
      o.exec(e.action, e.data);
    },
    [o]
  ), it = D(
    (e) => Y && C.byId(e).$critical,
    [Y, C]
  ), gt = D(
    (e) => {
      if (K?.auto) {
        const c = C.getSummaryId(e, !0), f = C.getSummaryId(h.id, !0);
        return h?.id && !(Array.isArray(c) ? c : [c]).includes(
          h.id
        ) && !(Array.isArray(f) ? f : [f]).includes(e);
      }
      return h;
    },
    [K, C, h]
  ), xt = D(() => {
    const e = o.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, f = e.map((z) => {
      const te = o.getTask(z.id);
      if (!te) return null;
      const $e = u.find((Ut) => Ut.id === z.id);
      if (!$e) return null;
      const { $x: Le, $y: We, $h: Oe, $w: Ge, $skip: Pe, $level: tt, $index: je, $y_base: Qe, $x_base: Zn, $w_base: Jn, $h_base: es, $skip_baseline: ts, $critical: ns, $reorder: ss, ...Bt } = $e, yt = $e.end && $e.start ? Math.round(($e.end.getTime() - $e.start.getTime()) / c) : 0, kt = $e.start ? ($e.start.getDay() + 6) % 7 : 0;
      return console.log("[copy] task:", te.text, "durationDays:", yt, "startDayOfWeek:", kt, "$w:", Ge), { ...Bt, _durationDays: yt, _startDayOfWeek: kt, _originalWidth: Ge, _originalHeight: Oe };
    }).filter(Boolean);
    if (!f.length) return;
    const L = f[0].parent, S = f.filter((z) => z.parent === L);
    if (S.length === 0) return;
    const _ = S.reduce((z, te) => te.start && (!z || te.start < z) ? te.start : z, null);
    lt = S.map((z) => ({
      ...z,
      _startCellOffset: In(z.start, _, d)
    })), Lt = L, ct = _;
  }, [o, d]);
  le(() => m ? o.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return xt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !lt.length || !ct || v({
        tasks: lt,
        baseDate: ct,
        parent: Lt,
        currentX: he.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [m, o, xt]), le(() => {
    if (!ae) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), v(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [ae]);
  const pt = $(() => {
    if (!O) return null;
    const e = Math.min(O.startX, O.currentX), c = Math.min(O.startY, O.currentY), f = Math.abs(O.currentX - O.startX), M = Math.abs(O.currentY - O.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${f}px`,
      height: `${M}px`
    };
  }, [O]);
  return /* @__PURE__ */ He(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${pe.length ? pe[0].$h : 0}px` },
      ref: de,
      onContextMenu: Vt,
      onMouseDown: Ve,
      onMouseMove: ve,
      onTouchStart: l,
      onTouchMove: be,
      onTouchEnd: _e,
      onClick: Kt,
      onDoubleClick: Xt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ a(
          Nn,
          {
            onSelectLink: k,
            selectedLink: ce,
            readonly: n
          }
        ),
        pe.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = `wx-bar wx-${mt(e.type)}` + (ye && H && e.id === H.id ? " wx-touch" : "") + (h && h.id === e.id ? " wx-selected" : "") + (Ne.has(e.id) ? " wx-selected" : "") + (it(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (g && e.segments ? " wx-split" : ""), f = "wx-link wx-left" + (h ? " wx-visible" : "") + (!h || !et(e.id, !0) && gt(e.id) ? " wx-target" : "") + (h && h.id === e.id && h.start ? " wx-selected" : "") + (it(e.id) ? " wx-critical" : ""), M = "wx-link wx-right" + (h ? " wx-visible" : "") + (!h || !et(e.id, !1) && gt(e.id) ? " wx-target" : "") + (h && h.id === e.id && !h.start ? " wx-selected" : "") + (it(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ He(Qt, { children: [
            !e.$skip && /* @__PURE__ */ He(
              "div",
              {
                className: "wx-GKbcLEGA " + c,
                style: Ft(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: p === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === ce?.target && ce?.type[2] === "s" ? /* @__PURE__ */ a(
                    bt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + f, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ He(Ze, { children: [
                    e.progress && !(g && e.segments) ? /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(g && e.segments) ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ a(s, { data: e, api: o, onAction: wt }) : g && e.segments ? /* @__PURE__ */ a(Ln, { task: e, type: mt(e.type) }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ He(Ze, { children: [
                    /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ a(s, { data: e, api: o, onAction: wt }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === ce?.target && ce?.type[2] === "e" ? /* @__PURE__ */ a(
                    bt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + M, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            w && !e.$skip_baseline ? /* @__PURE__ */ a(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: qt(e)
              }
            ) : null
          ] }, e.id);
        }),
        O && pt && /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: pt }),
        ae && ae.currentX != null && ae.tasks.map((e, c) => {
          const M = (Math.floor(ae.currentX / P) + (e._startCellOffset || 0)) * P, L = e._originalWidth || P, S = e._originalHeight || V, _ = ke.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ a(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: M, top: _, width: L, height: S },
              children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content", children: e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function An(t) {
  const { highlightTime: n } = t, s = ze(Fe), i = q(s, "_scales");
  return /* @__PURE__ */ a("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((r, N) => /* @__PURE__ */ a(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${r.height}px` },
      children: (r.cells || []).map((m, o) => {
        const u = n ? n(m.date, m.unit) : "", G = "wx-cell " + (m.css || "") + " " + (u || ""), x = typeof m.value == "string" && m.value.includes("<");
        return /* @__PURE__ */ a(
          "div",
          {
            className: "wx-ZkvhDKir " + G,
            style: { width: `${m.width}px` },
            ...x ? { dangerouslySetInnerHTML: { __html: m.value } } : { children: m.value }
          },
          o
        );
      })
    },
    N
  )) });
}
const Wn = /* @__PURE__ */ new Map();
function _n(t) {
  const n = oe(null), s = oe(0), i = oe(null), r = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, le(() => {
    if (r)
      return cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
        const N = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        Wn.set(t, N), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: N })
        );
      }), () => cancelAnimationFrame(i.current);
  });
}
function zn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: i,
    taskTemplate: r,
    cellBorders: N,
    highlightTime: m,
    multiTaskRows: o = !1,
    rowMapping: u = null,
    marqueeSelect: G = !1,
    copyPaste: x = !1,
    scrollToCurrentWeek: J = !1,
    currentWeekColor: R = null
  } = t, d = ze(Fe), [X, w] = nt(d, "_selected"), E = q(d, "scrollTop"), ee = q(d, "cellHeight"), I = q(d, "cellWidth"), Y = q(d, "_scales"), C = q(d, "_markers"), K = q(d, "_scrollTask"), g = q(d, "zoom"), ne = q(d, "_tasks"), [V, pe] = xe(), P = oe(null), me = oe(0), ie = oe(!1), h = 1 + (Y?.rows?.length || 0), T = $(() => {
    if (!o || !u || !ne?.length) return null;
    const y = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), B = [];
    return ne.forEach((U) => {
      const j = u.taskRows.get(U.id) ?? U.id;
      A.has(j) || (A.set(j, B.length), B.push(j));
    }), ne.forEach((U) => {
      const j = u.taskRows.get(U.id) ?? U.id, ue = A.get(j) ?? 0;
      y.set(U.id, ue * ee);
    }), y;
  }, [ne, o, u, ee]), H = $(() => {
    const y = [];
    return X && X.length && ee && X.forEach((A) => {
      const B = T?.get(A.id) ?? A.$y;
      y.push({ height: `${ee}px`, top: `${B - 3}px` });
    }), y;
  }, [w, ee, T]), fe = $(
    () => Math.max(V || 0, i),
    [V, i]
  );
  le(() => {
    const y = P.current;
    y && typeof E == "number" && (y.scrollTop = E);
  }, [E]);
  const se = () => {
    ce();
  };
  function ce(y) {
    const A = P.current;
    if (!A) return;
    const B = {};
    B.left = A.scrollLeft, d.exec("scroll-chart", B);
  }
  function we() {
    const y = P.current, B = Math.ceil((V || 0) / (ee || 1)) + 1, U = Math.floor((y && y.scrollTop || 0) / (ee || 1)), j = Math.max(0, U - h), ue = U + B + h, ae = j * (ee || 0);
    d.exec("render-data", {
      start: j,
      end: ue,
      from: ae
    });
  }
  le(() => {
    we();
  }, [V, E]);
  const ye = D(
    (y) => {
      if (!y) return;
      const { id: A, mode: B } = y;
      if (B.toString().indexOf("x") < 0) return;
      const U = P.current;
      if (!U) return;
      const { clientWidth: j } = U, ue = d.getTask(A);
      if (ue.$x + ue.$w < U.scrollLeft)
        d.exec("scroll-chart", { left: ue.$x - (I || 0) }), U.scrollLeft = ue.$x - (I || 0);
      else if (ue.$x >= j + U.scrollLeft) {
        const ae = j < ue.$w ? I || 0 : ue.$w;
        d.exec("scroll-chart", { left: ue.$x - j + ae }), U.scrollLeft = ue.$x - j + ae;
      }
    },
    [d, I]
  );
  le(() => {
    ye(K);
  }, [K]);
  function Ee(y) {
    if (g && (y.ctrlKey || y.metaKey)) {
      y.preventDefault();
      const A = P.current, B = y.clientX - (A ? A.getBoundingClientRect().left : 0);
      if (me.current += y.deltaY, Math.abs(me.current) >= 150) {
        const j = -Math.sign(me.current);
        me.current = 0, d.exec("zoom-scale", {
          dir: j,
          offset: B
        });
      }
    }
  }
  const Ce = D((y) => {
    const A = m(y.date, y.unit);
    return A ? {
      css: A,
      width: y.width
    } : null;
  }, [m]), Se = $(() => {
    if (!Y || !m || !["hour", "day", "week"].includes(Y.minUnit)) return null;
    let A = 0;
    return Y.rows[Y.rows.length - 1].cells.map((B) => {
      const U = Ce(B), j = A;
      return A += B.width, U ? { ...U, left: j } : null;
    });
  }, [Y, m, Ce]), Re = D(
    (y) => {
      y.eventSource = "chart", d.exec("hotkey", y);
    },
    [d]
  );
  le(() => {
    const y = P.current;
    if (!y) return;
    const A = () => pe(y.clientHeight);
    A();
    const B = new ResizeObserver(() => A());
    return B.observe(y), () => {
      B.disconnect();
    };
  }, [P.current]);
  const O = oe(null);
  return le(() => {
    const y = P.current;
    if (y && !O.current)
      return O.current = zt(y, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (A) => Re(A)
      }), () => {
        O.current?.destroy(), O.current = null;
      };
  }, []), le(() => {
    const y = P.current;
    if (!y) return;
    const A = Ee;
    return y.addEventListener("wheel", A), () => {
      y.removeEventListener("wheel", A);
    };
  }, [Ee]), le(() => {
    if (!J || ie.current || !Y || !P.current || !V) return;
    const y = P.current, { clientWidth: A } = y, B = /* @__PURE__ */ new Date(), U = Y.rows[Y.rows.length - 1]?.cells;
    if (!U) return;
    let j = -1, ue = 0;
    const ae = [];
    for (let Q = 0; Q < U.length; Q++) {
      const he = U[Q];
      ae.push({ left: ue, width: he.width });
      const de = he.date;
      if (he.unit === "week") {
        const Ie = new Date(de);
        Ie.setDate(Ie.getDate() + 7), B >= de && B < Ie && (j = Q);
      } else he.unit === "day" && B.getFullYear() === de.getFullYear() && B.getMonth() === de.getMonth() && B.getDate() === de.getDate() && (j = Q);
      ue += he.width;
    }
    let v = j;
    if (j > 0 && (v = j - 1), v >= 0 && ae[v]) {
      const Q = ae[v], he = Math.max(0, Q.left);
      y.scrollLeft = he, d.exec("scroll-chart", { left: he }), ie.current = !0;
    }
  }, [J, Y, V, d]), _n("chart"), /* @__PURE__ */ He(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: P,
      onScroll: se,
      children: [
        /* @__PURE__ */ a(An, { highlightTime: m, scales: Y }),
        C && C.length ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${fe}px` },
            children: C.map((y, A) => /* @__PURE__ */ a(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${y.css || ""}`,
                style: { left: `${y.left}px` },
                children: /* @__PURE__ */ a("div", { className: "wx-mR7v2Xag wx-content", children: y.text })
              },
              A
            ))
          }
        ) : null,
        /* @__PURE__ */ He(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${fe}px` },
            children: [
              Se ? /* @__PURE__ */ a(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Se.map(
                    (y, A) => y ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + y.css,
                        style: {
                          width: `${y.width}px`,
                          left: `${y.left}px`
                        }
                      },
                      A
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ a(Sn, { borders: N }),
              X && X.length ? X.map(
                (y, A) => y.$y ? /* @__PURE__ */ a(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": y.id,
                    style: H[A]
                  },
                  y.id
                ) : null
              ) : null,
              /* @__PURE__ */ a(
                Hn,
                {
                  readonly: n,
                  taskTemplate: r,
                  multiTaskRows: o,
                  rowMapping: u,
                  marqueeSelect: G,
                  copyPaste: x
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Gn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: i = "x",
    onMove: r,
    onDisplayChange: N,
    compactMode: m,
    containerWidth: o = 0,
    leftThreshold: u = 50,
    rightThreshold: G = 50
  } = t, [x, J] = at(t.value ?? 0), [R, d] = at(t.display ?? "all");
  function X(ce) {
    let we = 0;
    n == "center" ? we = s / 2 : n == "before" && (we = s);
    const ye = {
      size: [s + "px", "auto"],
      p: [ce - we + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let Ee in ye) ye[Ee] = ye[Ee].reverse();
    return ye;
  }
  const [w, E] = xe(!1), [ee, I] = xe(null), Y = oe(0), C = oe(), K = oe(), g = oe(R);
  le(() => {
    g.current = R;
  }, [R]), le(() => {
    ee === null && x > 0 && I(x);
  }, [ee, x]);
  function ne(ce) {
    return i == "x" ? ce.clientX : ce.clientY;
  }
  const V = D(
    (ce) => {
      const we = C.current + ne(ce) - Y.current;
      J(we);
      let ye;
      we <= u ? ye = "chart" : o - we <= G ? ye = "grid" : ye = "all", g.current !== ye && (d(ye), g.current = ye), K.current && clearTimeout(K.current), K.current = setTimeout(() => r && r(we), 100);
    },
    [o, u, G, r]
  ), pe = D(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", E(!1), window.removeEventListener("mousemove", V), window.removeEventListener("mouseup", pe);
  }, [V]), P = $(
    () => R !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [R, i]
  ), me = D(
    (ce) => {
      !m && (R === "grid" || R === "chart") || (Y.current = ne(ce), C.current = x, E(!0), document.body.style.cursor = P, document.body.style.userSelect = "none", window.addEventListener("mousemove", V), window.addEventListener("mouseup", pe));
    },
    [P, V, pe, x, m, R]
  );
  function ie() {
    d("all"), ee !== null && (J(ee), r && r(ee));
  }
  function h(ce) {
    if (m) {
      const we = R === "chart" ? "grid" : "chart";
      d(we), N(we);
    } else if (R === "grid" || R === "chart")
      ie(), N("all");
    else {
      const we = ce === "left" ? "chart" : "grid";
      d(we), N(we);
    }
  }
  function T() {
    h("left");
  }
  function H() {
    h("right");
  }
  const fe = $(() => X(x), [x, n, s, i]), se = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${R}`,
    w ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ He(
    "div",
    {
      className: "wx-pFykzMlT " + se,
      onMouseDown: me,
      style: { width: fe.size[0], height: fe.size[1], cursor: P },
      children: [
        /* @__PURE__ */ He("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: T
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: H
            }
          ) })
        ] }),
        /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const On = 650;
function Gt(t) {
  let n;
  function s() {
    n = new ResizeObserver((r) => {
      for (let N of r)
        if (N.target === document.body) {
          let m = N.contentRect.width <= On;
          t(m);
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
function Xn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: i,
    highlightTime: r,
    onTableAPIChange: N,
    multiTaskRows: m = !1,
    rowMapping: o = null,
    marqueeSelect: u = !1,
    copyPaste: G = !1,
    scrollToCurrentWeek: x = !1,
    currentWeekColor: J = null
  } = t, R = ze(Fe), d = q(R, "_tasks"), X = q(R, "_scales"), w = q(R, "cellHeight"), E = q(R, "columns"), ee = q(R, "_scrollTask"), I = q(R, "undo"), Y = $(() => {
    if (!m) return o;
    const v = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Map();
    return d.forEach((he) => {
      const de = he.row ?? he.id;
      Q.set(he.id, de), v.has(de) || v.set(de, []), v.get(de).push(he.id);
    }), { rowMap: v, taskRows: Q };
  }, [d, m, o]), [C, K] = xe(!1);
  let [g, ne] = xe(0);
  const [V, pe] = xe(0), [P, me] = xe(0), [ie, h] = xe(void 0), [T, H] = xe("all"), fe = oe(null), se = D(
    (v) => {
      K((Q) => (v !== Q && (v ? (fe.current = T, T === "all" && H("grid")) : (!fe.current || fe.current === "all") && H("all")), v));
    },
    [T]
  );
  le(() => {
    const v = Gt(se);
    return v.observe(), () => {
      v.disconnect();
    };
  }, [se]);
  const ce = $(() => {
    let v;
    return E.every((Q) => Q.width && !Q.flexgrow) ? v = E.reduce((Q, he) => Q + parseInt(he.width), 0) : C && T === "chart" ? v = parseInt(E.find((Q) => Q.id === "action")?.width) || 50 : v = 440, g = v, v;
  }, [E, C, T]);
  le(() => {
    ne(ce);
  }, [ce]);
  const we = $(
    () => (V ?? 0) - (ie ?? 0),
    [V, ie]
  ), ye = $(() => X.width, [X]), Ee = $(() => {
    if (!m || !Y)
      return d.length * w;
    const v = /* @__PURE__ */ new Set();
    return d.forEach((Q) => {
      const he = Y.taskRows.get(Q.id) ?? Q.id;
      v.add(he);
    }), v.size * w;
  }, [d, w, m, Y]), Ce = $(
    () => X.height + Ee + we,
    [X, Ee, we]
  ), Se = $(
    () => g + ye,
    [g, ye]
  ), Re = oe(null), O = D(() => {
    Promise.resolve().then(() => {
      if ((V ?? 0) > (Se ?? 0)) {
        const v = (V ?? 0) - g;
        R.exec("expand-scale", { minWidth: v });
      }
    });
  }, [V, Se, g, R]);
  le(() => {
    let v;
    return Re.current && (v = new ResizeObserver(O), v.observe(Re.current)), () => {
      v && v.disconnect();
    };
  }, [Re.current, O]), le(() => {
    O();
  }, [ye]);
  const y = oe(null), A = oe(null), B = D(() => {
    const v = y.current;
    v && R.exec("scroll-chart", {
      top: v.scrollTop
    });
  }, [R]), U = oe({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  le(() => {
    U.current = {
      rTasks: d,
      rScales: X,
      rCellHeight: w,
      scrollSize: we,
      ganttDiv: y.current,
      ganttHeight: P ?? 0
    };
  }, [d, X, w, we, P]);
  const j = D(
    (v) => {
      if (!v) return;
      const {
        rTasks: Q,
        rScales: he,
        rCellHeight: de,
        scrollSize: Ie,
        ganttDiv: p,
        ganttHeight: re
      } = U.current;
      if (!p) return;
      const { id: ge } = v, F = Q.findIndex((Z) => Z.id === ge);
      if (F > -1) {
        const Z = re - he.height, ke = F * de, Te = p.scrollTop;
        let Ne = null;
        ke < Te ? Ne = ke : ke + de > Te + Z && (Ne = ke - Z + de + Ie), Ne !== null && (R.exec("scroll-chart", { top: Math.max(Ne, 0) }), y.current.scrollTop = Math.max(Ne, 0));
      }
    },
    [R]
  );
  le(() => {
    j(ee);
  }, [ee]), le(() => {
    const v = y.current, Q = A.current;
    if (!v || !Q) return;
    const he = () => {
      Tn(() => {
        me(v.offsetHeight), pe(v.offsetWidth), h(Q.offsetWidth);
      });
    }, de = new ResizeObserver(he);
    return de.observe(v), () => de.disconnect();
  }, [y.current]);
  const ue = oe(null), ae = oe(null);
  return le(() => {
    ae.current && (ae.current.destroy(), ae.current = null);
    const v = ue.current;
    if (v)
      return ae.current = zt(v, {
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
          "ctrl+z": I,
          "ctrl+y": I,
          "meta+z": I,
          "meta+shift+z": I
        },
        exec: (Q) => {
          if (Q.isInput) return;
          const he = Q.key;
          if (he === "ctrl+z" || he === "meta+z") {
            R.exec("undo", {});
            return;
          }
          if (he === "ctrl+y" || he === "meta+shift+z") {
            R.exec("redo", {});
            return;
          }
          R.exec("hotkey", Q);
        }
      }), () => {
        ae.current?.destroy(), ae.current = null;
      };
  }, [I]), /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-gantt", ref: y, onScroll: B, children: /* @__PURE__ */ a(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Ce, width: "100%" },
      ref: A,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: P,
            width: ie
          },
          children: /* @__PURE__ */ He("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ue, children: [
            E.length ? /* @__PURE__ */ He(Ze, { children: [
              /* @__PURE__ */ a(
                En,
                {
                  display: T,
                  compactMode: C,
                  columnWidth: ce,
                  width: g,
                  readonly: s,
                  fullHeight: Ee,
                  onTableAPIChange: N,
                  multiTaskRows: m,
                  rowMapping: Y
                }
              ),
              /* @__PURE__ */ a(
                Gn,
                {
                  value: g,
                  display: T,
                  compactMode: C,
                  containerWidth: V,
                  onMove: (v) => ne(v),
                  onDisplayChange: (v) => H(v)
                }
              )
            ] }) : null,
            /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-content", ref: Re, children: /* @__PURE__ */ a(
              zn,
              {
                readonly: s,
                fullWidth: ye,
                fullHeight: Ee,
                taskTemplate: n,
                cellBorders: i,
                highlightTime: r,
                multiTaskRows: m,
                rowMapping: Y,
                marqueeSelect: u,
                copyPaste: G,
                scrollToCurrentWeek: x,
                currentWeekColor: J
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function Yn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function Kn(t, n) {
  return typeof t == "function" ? t : st(t, n);
}
function Ot(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: Kn(s, n)
  }));
}
function Fn(t, n) {
  const s = Yn(n);
  for (let i in s)
    s[i] = st(s[i], t);
  return s;
}
function qn(t, n) {
  if (!t || !t.length) return t;
  const s = st("%d-%m-%Y", n);
  return t.map((i) => i.template ? i : i.id === "start" || i.id == "end" ? {
    ...i,
    //store locale template for unscheduled tasks
    _template: (r) => s(r),
    template: (r) => s(r)
  } : i.id === "duration" ? {
    ...i,
    _template: (r) => r,
    template: (r) => r
  } : i);
}
function Vn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Ot(s.scales, n)
    }))
  } : t;
}
const Bn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Un = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], ys = Pt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: i = pn,
  tasks: r = [],
  selected: N = [],
  activeTask: m = null,
  links: o = [],
  scales: u = Un,
  columns: G = xn,
  start: x = null,
  end: J = null,
  lengthUnit: R = "day",
  durationUnit: d = "day",
  cellWidth: X = 100,
  cellHeight: w = 38,
  scaleHeight: E = 36,
  readonly: ee = !1,
  cellBorders: I = "full",
  zoom: Y = !1,
  baselines: C = !1,
  highlightTime: K = null,
  init: g = null,
  autoScale: ne = !0,
  unscheduledTasks: V = !1,
  criticalPath: pe = null,
  schedule: P = { type: "forward" },
  projectStart: me = null,
  projectEnd: ie = null,
  calendar: h = null,
  undo: T = !1,
  splitTasks: H = !1,
  multiTaskRows: fe = !1,
  marqueeSelect: se = !1,
  copyPaste: ce = !1,
  currentWeekHighlight: we = !1,
  currentWeekColor: ye = null,
  scrollToCurrentWeek: Ee = !1,
  ...Ce
}, Se) {
  const Re = oe();
  Re.current = Ce;
  const O = $(() => new mn(kn), []), y = $(() => ({ ...ut, ...ot }), []), A = ze(Ye.i18n), B = $(() => A ? A.extend(y, !0) : rt(y), [A, y]), U = $(() => B.getRaw().calendar, [B]), j = $(() => {
    let Z = {
      zoom: Vn(Y, U),
      scales: Ot(u, U),
      columns: qn(G, U),
      links: wn(o),
      cellWidth: X
    };
    return Z.zoom && (Z = {
      ...Z,
      ...gn(
        Z.zoom,
        Fn(U, B.getGroup("gantt")),
        Z.scales,
        X
      )
    }), Z;
  }, [Y, u, G, o, X, U, B]), ue = oe(null);
  ue.current !== r && (Mt(r, { durationUnit: d, splitTasks: H, calendar: h }), ue.current = r), le(() => {
    Mt(r, { durationUnit: d, splitTasks: H, calendar: h });
  }, [r, d, h, H]);
  const ae = $(() => {
    if (!fe) return null;
    const Z = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map(), Te = (Ne) => {
      Ne.forEach((Me) => {
        const Ae = Me.row ?? Me.id;
        ke.set(Me.id, Ae), Z.has(Ae) || Z.set(Ae, []), Z.get(Ae).push(Me.id), Me.data && Me.data.length > 0 && Te(Me.data);
      });
    };
    return Te(r), { rowMap: Z, taskRows: ke };
  }, [r, fe]), v = $(() => O.in, [O]), Q = oe(null);
  Q.current === null && (Q.current = new un((Z, ke) => {
    const Te = "on" + Bn(Z);
    Re.current && Re.current[Te] && Re.current[Te](ke);
  }), v.setNext(Q.current));
  const [he, de] = xe(null), Ie = oe(null);
  Ie.current = he;
  const p = $(
    () => ({
      getState: O.getState.bind(O),
      getReactiveState: O.getReactive.bind(O),
      getStores: () => ({ data: O }),
      exec: v.exec,
      setNext: (Z) => (Q.current = Q.current.setNext(Z), Q.current),
      intercept: v.intercept.bind(v),
      on: v.on.bind(v),
      detach: v.detach.bind(v),
      getTask: O.getTask.bind(O),
      serialize: O.serialize.bind(O),
      getTable: (Z) => Z ? new Promise((ke) => setTimeout(() => ke(Ie.current), 1)) : Ie.current,
      getHistory: () => O.getHistory()
    }),
    [O, v]
  );
  Ht(
    Se,
    () => ({
      ...p
    }),
    [p]
  );
  const re = oe(0);
  le(() => {
    re.current ? O.init({
      tasks: r,
      links: j.links,
      start: x,
      columns: j.columns,
      end: J,
      lengthUnit: R,
      cellWidth: j.cellWidth,
      cellHeight: w,
      scaleHeight: E,
      scales: j.scales,
      taskTypes: i,
      zoom: j.zoom,
      selected: N,
      activeTask: m,
      baselines: C,
      autoScale: ne,
      unscheduledTasks: V,
      markers: s,
      durationUnit: d,
      criticalPath: pe,
      schedule: P,
      projectStart: me,
      projectEnd: ie,
      calendar: h,
      undo: T,
      _weekStart: U.weekStart,
      splitTasks: H
    }) : g && g(p), re.current++;
  }, [
    p,
    g,
    r,
    j,
    x,
    J,
    R,
    w,
    E,
    i,
    N,
    m,
    C,
    ne,
    V,
    s,
    d,
    pe,
    P,
    me,
    ie,
    h,
    T,
    U,
    H,
    O
  ]), re.current === 0 && O.init({
    tasks: r,
    links: j.links,
    start: x,
    columns: j.columns,
    end: J,
    lengthUnit: R,
    cellWidth: j.cellWidth,
    cellHeight: w,
    scaleHeight: E,
    scales: j.scales,
    taskTypes: i,
    zoom: j.zoom,
    selected: N,
    activeTask: m,
    baselines: C,
    autoScale: ne,
    unscheduledTasks: V,
    markers: s,
    durationUnit: d,
    criticalPath: pe,
    schedule: P,
    projectStart: me,
    projectEnd: ie,
    calendar: h,
    undo: T,
    _weekStart: U.weekStart,
    splitTasks: H
  });
  const ge = $(() => {
    const Z = /* @__PURE__ */ new Date(), ke = U?.weekStart ?? 0, Te = new Date(Z), Me = (Te.getDay() - ke + 7) % 7;
    Te.setDate(Te.getDate() - Me), Te.setHours(0, 0, 0, 0);
    const Ae = new Date(Te);
    return Ae.setDate(Ae.getDate() + 7), (Ve) => Ve >= Te && Ve < Ae;
  }, [U]), F = $(() => (Z, ke) => {
    let Te = [];
    if (h)
      ke == "day" && !h.getDayHours(Z) && Te.push("wx-weekend"), ke == "hour" && !h.getDayHours(Z) && Te.push("wx-weekend");
    else if (K) {
      const Ne = K(Z, ke);
      Ne && Te.push(Ne);
    }
    return we && (ke === "week" || ke === "day") && ge(Z) && Te.push("wx-current-week"), Te.join(" ");
  }, [h, K, we, ge]);
  return /* @__PURE__ */ a(Ye.i18n.Provider, { value: B, children: /* @__PURE__ */ a(Fe.Provider, { value: p, children: /* @__PURE__ */ a(
    Xn,
    {
      taskTemplate: n,
      readonly: ee,
      cellBorders: I,
      highlightTime: F,
      onTableAPIChange: de,
      multiTaskRows: fe,
      rowMapping: ae,
      marqueeSelect: se,
      copyPaste: ce,
      scrollToCurrentWeek: Ee,
      currentWeekColor: ye
    }
  ) }) });
});
function ks({ api: t = null, items: n = [] }) {
  const s = ze(Ye.i18n), i = $(() => s || rt(ot), [s]), r = $(() => i.getGroup("gantt"), [i]), N = Ke(t, "_selected"), m = Ke(t, "undo"), o = Ke(t, "history"), u = Ke(t, "splitTasks"), G = ["undo", "redo"], x = $(() => {
    const R = Ct({ undo: !0, splitTasks: !0 });
    return (n.length ? n : Ct({
      undo: m,
      splitTasks: u
    })).map((X) => {
      let w = { ...X, disabled: !1 };
      return w.handler = _t(R, w.id) ? (E) => Wt(t, E.id, null, r) : w.handler, w.text && (w.text = r(w.text)), w.menuText && (w.menuText = r(w.menuText)), w;
    });
  }, [n, t, r, m, u]), J = $(() => {
    const R = [];
    return x.forEach((d) => {
      const X = d.id;
      if (X === "add-task")
        R.push(d);
      else if (G.includes(X))
        G.includes(X) && R.push({
          ...d,
          disabled: d.isDisabled(o)
        });
      else {
        if (!N?.length || !t) return;
        R.push({
          ...d,
          disabled: d.isDisabled && N.some((w) => d.isDisabled(w, t.getState()))
        });
      }
    }), R.filter((d, X) => {
      if (t && d.isHidden)
        return !N.some((w) => d.isHidden(w, t.getState()));
      if (d.comp === "separator") {
        const w = R[X + 1];
        if (!w || w.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, N, o, x]);
  return s ? /* @__PURE__ */ a(Rt, { items: J }) : /* @__PURE__ */ a(Ye.i18n.Provider, { value: i, children: /* @__PURE__ */ a(Rt, { items: J }) });
}
const bs = Pt(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: r = null,
  at: N = "point",
  children: m,
  onClick: o,
  css: u
}, G) {
  const x = oe(null), J = oe(null), R = ze(Ye.i18n), d = $(() => R || rt({ ...ot, ...ut }), [R]), X = $(() => d.getGroup("gantt"), [d]), w = Ke(s, "taskTypes"), E = Ke(s, "selected"), ee = Ke(s, "_selected"), I = Ke(s, "splitTasks"), Y = $(() => Dt({ splitTasks: !0 }), []);
  le(() => {
    s && (s.on("scroll-chart", () => {
      x.current && x.current.show && x.current.show();
    }), s.on("drag-task", () => {
      x.current && x.current.show && x.current.show();
    }));
  }, [s]);
  function C(h) {
    return h.map((T) => (T = { ...T }, T.text && (T.text = X(T.text)), T.subtext && (T.subtext = X(T.subtext)), T.data && (T.data = C(T.data)), T));
  }
  function K() {
    const h = n.length ? n : Dt({ splitTasks: I }), T = h.find((H) => H.id === "convert-task");
    return T && (T.data = [], (w || []).forEach((H) => {
      T.data.push(T.dataFactory(H));
    })), C(h);
  }
  const g = $(() => K(), [s, n, w, I, X]), ne = $(
    () => ee && ee.length ? ee : [],
    [ee]
  ), V = D(
    (h, T) => {
      let H = h ? s?.getTask(h) : null;
      if (i) {
        const fe = i(h, T);
        H = fe === !0 ? H : fe;
      }
      if (H) {
        const fe = Be(T.target, "data-segment");
        fe !== null ? J.current = { id: H.id, segmentIndex: fe } : J.current = H.id, (!Array.isArray(E) || !E.includes(H.id)) && s && s.exec && s.exec("select-task", { id: H.id });
      }
      return H;
    },
    [s, i, E]
  ), pe = D(
    (h) => {
      const T = h.action;
      T && (_t(Y, T.id) && Wt(s, T.id, J.current, X), o && o(h));
    },
    [s, X, o, Y]
  ), P = D(
    (h, T) => {
      const H = ne.length ? ne : T ? [T] : [];
      let fe = r ? H.every((se) => r(h, se)) : !0;
      if (fe && (h.isHidden && (fe = !H.some(
        (se) => h.isHidden(se, s.getState(), J.current)
      )), h.isDisabled)) {
        const se = H.some(
          (ce) => h.isDisabled(ce, s.getState(), J.current)
        );
        h.disabled = se;
      }
      return fe;
    },
    [r, ne, s]
  );
  Ht(G, () => ({
    show: (h, T) => {
      x.current && x.current.show && x.current.show(h, T);
    }
  }));
  const me = D((h) => {
    x.current && x.current.show && x.current.show(h);
  }, []), ie = /* @__PURE__ */ He(Ze, { children: [
    /* @__PURE__ */ a(
      $n,
      {
        filter: P,
        options: g,
        dataKey: "id",
        resolver: V,
        onClick: pe,
        at: N,
        ref: x,
        css: u
      }
    ),
    /* @__PURE__ */ a("span", { onContextMenu: me, "data-menu-ignore": "true", children: typeof m == "function" ? m() : m })
  ] });
  if (!R && Ye.i18n?.Provider) {
    const h = Ye.i18n.Provider;
    return /* @__PURE__ */ a(h, { value: d, children: ie });
  }
  return ie;
});
function jn({ api: t, autoSave: n, onLinksChange: s }) {
  const r = ze(Ye.i18n).getGroup("gantt"), N = q(t, "activeTask"), m = q(t, "_activeTask"), o = q(t, "_links"), u = q(t, "schedule"), G = q(t, "unscheduledTasks"), [x, J] = xe();
  function R() {
    if (N) {
      const E = o.filter((I) => I.target == N).map((I) => ({ link: I, task: t.getTask(I.source) })), ee = o.filter((I) => I.source == N).map((I) => ({ link: I, task: t.getTask(I.target) }));
      return [
        { title: r("Predecessors"), data: E },
        { title: r("Successors"), data: ee }
      ];
    }
  }
  le(() => {
    J(R());
  }, [N, o]);
  const d = $(
    () => [
      { id: "e2s", label: r("End-to-start") },
      { id: "s2s", label: r("Start-to-start") },
      { id: "e2e", label: r("End-to-end") },
      { id: "s2e", label: r("Start-to-end") }
    ],
    [r]
  );
  function X(E) {
    n ? t.exec("delete-link", { id: E }) : (J(
      (ee) => (ee || []).map((I) => ({
        ...I,
        data: I.data.filter((Y) => Y.link.id !== E)
      }))
    ), s && s({
      id: E,
      action: "delete-link",
      data: { id: E }
    }));
  }
  function w(E, ee) {
    n ? t.exec("update-link", {
      id: E,
      link: ee
    }) : (J(
      (I) => (I || []).map((Y) => ({
        ...Y,
        data: Y.data.map(
          (C) => C.link.id === E ? { ...C, link: { ...C.link, ...ee } } : C
        )
      }))
    ), s && s({
      id: E,
      action: "update-link",
      data: {
        id: E,
        link: ee
      }
    }));
  }
  return /* @__PURE__ */ a(Ze, { children: (x || []).map(
    (E, ee) => E.data.length ? /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ a(Zt, { label: E.title, position: "top", children: /* @__PURE__ */ a("table", { children: /* @__PURE__ */ a("tbody", { children: E.data.map((I) => /* @__PURE__ */ He("tr", { children: [
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-task-name", children: I.task.text || "" }) }),
      u?.auto && I.link.type === "e2s" ? /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ a(
        Jt,
        {
          type: "number",
          placeholder: r("Lag"),
          value: I.link.lag,
          disabled: G && m?.unscheduled,
          onChange: (Y) => {
            Y.input || w(I.link.id, { lag: Y.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ a(
        en,
        {
          value: I.link.type,
          placeholder: r("Select link type"),
          options: d,
          onChange: (Y) => w(I.link.id, { type: Y.value }),
          children: ({ option: Y }) => Y.label
        }
      ) }) }),
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => X(I.link.id),
          role: "button"
        }
      ) })
    ] }, I.link.id)) }) }) }) }, ee) : null
  ) });
}
function Qn(t) {
  const { value: n, time: s, format: i, onchange: r, onChange: N, ...m } = t, o = N ?? r;
  function u(G) {
    const x = new Date(G.value);
    x.setHours(n.getHours()), x.setMinutes(n.getMinutes()), o && o({ value: x });
  }
  return /* @__PURE__ */ He("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ a(
      tn,
      {
        ...m,
        value: n,
        onChange: u,
        format: i,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ a(nn, { value: n, onChange: o, format: i }) : null
  ] });
}
Ue("select", rn);
Ue("date", Qn);
Ue("twostate", on);
Ue("slider", ln);
Ue("counter", cn);
Ue("links", jn);
function vs({
  api: t,
  items: n = [],
  css: s = "",
  layout: i = "default",
  readonly: r = !1,
  placement: N = "sidebar",
  bottomBar: m = !0,
  topBar: o = !0,
  autoSave: u = !0,
  focus: G = !1,
  hotkeys: x = {}
}) {
  const J = ze(Ye.i18n), R = $(() => J || rt({ ...ot, ...ut }), [J]), d = $(() => R.getGroup("gantt"), [R]), X = R.getRaw(), w = $(() => {
    const p = X.gantt?.dateFormat || X.formats?.dateFormat;
    return st(p, X.calendar);
  }, [X]), E = $(() => {
    if (o === !0 && !r) {
      const p = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: d("Delete"),
          id: "delete"
        }
      ];
      return u ? { items: p } : {
        items: [
          ...p,
          {
            comp: "button",
            type: "primary",
            text: d("Save"),
            id: "save"
          }
        ]
      };
    }
    return o;
  }, [o, r, u, d]), [ee, I] = xe(!1), Y = $(
    () => ee ? "wx-full-screen" : "",
    [ee]
  ), C = D((p) => {
    I(p);
  }, []);
  le(() => {
    const p = Gt(C);
    return p.observe(), () => {
      p.disconnect();
    };
  }, [C]);
  const K = q(t, "_activeTask"), g = q(t, "activeTask"), ne = q(t, "unscheduledTasks"), V = q(t, "links"), pe = q(t, "splitTasks"), P = $(
    () => pe && g?.segmentIndex,
    [pe, g]
  ), me = $(
    () => P || P === 0,
    [P]
  ), ie = $(
    () => yn({ unscheduledTasks: ne }),
    [ne]
  ), h = q(t, "undo"), [T, H] = xe({}), [fe, se] = xe(null), [ce, we] = xe(), [ye, Ee] = xe(null), Ce = q(t, "taskTypes"), Se = $(() => {
    if (!K) return null;
    let p;
    if (me && K.segments ? p = { ...K.segments[P] } : p = { ...K }, r) {
      let re = { parent: p.parent };
      return ie.forEach(({ key: ge, comp: F }) => {
        if (F !== "links") {
          const Z = p[ge];
          F === "date" && Z instanceof Date ? re[ge] = w(Z) : F === "slider" && ge === "progress" ? re[ge] = `${Z}%` : re[ge] = Z;
        }
      }), re;
    }
    return p || null;
  }, [K, me, P, r, ie, w]);
  le(() => {
    we(Se);
  }, [Se]), le(() => {
    H({}), Ee(null), se(null);
  }, [g]);
  function Re(p, re) {
    return p.map((ge) => {
      const F = { ...ge };
      if (ge.config && (F.config = { ...F.config }), F.comp === "links" && t && (F.api = t, F.autoSave = u, F.onLinksChange = A), F.comp === "select" && F.key === "type") {
        const Z = F.options ?? (Ce || []);
        F.options = Z.map((ke) => ({
          ...ke,
          label: d(ke.label)
        }));
      }
      return F.comp === "slider" && F.key === "progress" && (F.labelTemplate = (Z) => `${d(F.label)} ${Z}%`), F.label && (F.label = d(F.label)), F.config?.placeholder && (F.config.placeholder = d(F.config.placeholder)), re && (F.isDisabled && F.isDisabled(re, t.getState()) ? F.disabled = !0 : delete F.disabled), F;
    });
  }
  const O = $(() => {
    let p = n.length ? n : ie;
    return p = Re(p, ce), ce ? p.filter(
      (re) => !re.isHidden || !re.isHidden(ce, t.getState())
    ) : p;
  }, [n, ie, ce, Ce, d, t, u]), y = $(
    () => O.map((p) => p.key),
    [O]
  );
  function A({ id: p, action: re, data: ge }) {
    H((F) => ({
      ...F,
      [p]: { action: re, data: ge }
    }));
  }
  const B = D(() => {
    for (let p in T)
      if (V.byId(p)) {
        const { action: re, data: ge } = T[p];
        t.exec(re, ge);
      }
  }, [t, T, V]), U = D(() => {
    const p = g?.id || g;
    if (me) {
      if (K?.segments) {
        const re = K.segments.filter(
          (ge, F) => F !== P
        );
        t.exec("update-task", {
          id: p,
          task: { segments: re }
        });
      }
    } else
      t.exec("delete-task", { id: p });
  }, [t, g, me, K, P]), j = D(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ue = D(
    (p) => {
      const { item: re, changes: ge } = p;
      re.id === "delete" && U(), re.id === "save" && (ge.length ? j() : B()), re.comp && j();
    },
    [t, g, u, B, U, j]
  ), ae = D(
    (p, re, ge) => (ne && p.type === "summary" && (p.unscheduled = !1), At(p, t.getState(), re), ge || se(!1), p),
    [ne, t]
  ), v = D(
    (p) => {
      p = {
        ...p,
        unscheduled: ne && p.unscheduled && p.type !== "summary"
      }, delete p.links, delete p.data, (y.indexOf("duration") === -1 || p.segments && !p.duration) && delete p.duration;
      const re = {
        id: g?.id || g,
        task: p,
        ...me && { segmentIndex: P }
      };
      u && fe && (re.inProgress = fe), t.exec("update-task", re), u || B();
    },
    [
      t,
      g,
      ne,
      u,
      B,
      y,
      me,
      P,
      fe
    ]
  ), Q = D(
    (p) => {
      let { update: re, key: ge, input: F } = p;
      if (F && se(!0), p.update = ae({ ...re }, ge, F), !u) we(p.update);
      else if (!ye && !F) {
        const Z = O.find((Ne) => Ne.key === ge), ke = re[ge];
        (!Z.validation || Z.validation(ke)) && (!Z.required || ke) && v(p.update);
      }
    },
    [u, ae, ye, O, v]
  ), he = D(
    (p) => {
      u || v(p.values);
    },
    [u, v]
  ), de = D((p) => {
    Ee(p.errors);
  }, []), Ie = $(
    () => h ? {
      "ctrl+z": (p) => {
        p.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (p) => {
        p.preventDefault(), t.exec("redo");
      }
    } : {},
    [h, t]
  );
  return Se ? /* @__PURE__ */ a(sn, { children: /* @__PURE__ */ a(
    Mn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${Y} ${s}`,
      items: O,
      values: Se,
      topBar: E,
      bottomBar: m,
      placement: N,
      layout: i,
      readonly: r,
      autoSave: u,
      focus: G,
      onAction: ue,
      onSave: he,
      onValidation: de,
      onChange: Q,
      hotkeys: x && { ...Ie, ...x }
    }
  ) }) : null;
}
const Ts = ({ children: t, columns: n = null, api: s }) => {
  const [i, r] = xe(null);
  return le(() => {
    s && s.getTable(!0).then(r);
  }, [s]), /* @__PURE__ */ a(vn, { api: i, columns: n, children: t });
};
function $s(t) {
  const { api: n, content: s, children: i } = t, r = oe(null), N = oe(null), [m, o] = xe({}), [u, G] = xe(null), [x, J] = xe({});
  function R(C) {
    for (; C; ) {
      if (C.getAttribute) {
        const K = C.getAttribute("data-tooltip-id"), g = C.getAttribute("data-tooltip-at"), ne = C.getAttribute("data-tooltip");
        if (K || ne) return { id: K, tooltip: ne, target: C, at: g };
      }
      C = C.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  le(() => {
    const C = N.current;
    if (C && x && (x.text || s)) {
      const K = C.getBoundingClientRect();
      let g = !1, ne = x.left, V = x.top;
      K.right >= m.right && (ne = m.width - K.width - 5, g = !0), K.bottom >= m.bottom && (V = x.top - (K.bottom - m.bottom + 2), g = !0), g && J((pe) => pe && { ...pe, left: ne, top: V });
    }
  }, [x, m, s]);
  const d = oe(null), X = 300, w = (C) => {
    clearTimeout(d.current), d.current = setTimeout(() => {
      C();
    }, X);
  };
  function E(C) {
    let { id: K, tooltip: g, target: ne, at: V } = R(C.target);
    if (J(null), G(null), !g)
      if (K)
        g = I(K);
      else {
        clearTimeout(d.current);
        return;
      }
    const pe = C.clientX;
    w(() => {
      K && G(ee(Y(K)));
      const P = ne.getBoundingClientRect(), me = r.current, ie = me ? me.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let h, T;
      V === "left" ? (h = P.top + 5 - ie.top, T = P.right + 5 - ie.left) : (h = P.top + P.height - ie.top, T = pe - ie.left), o(ie), J({ top: h, left: T, text: g });
    });
  }
  function ee(C) {
    return n?.getTask(Y(C)) || null;
  }
  function I(C) {
    return ee(C)?.text || "";
  }
  function Y(C) {
    const K = parseInt(C);
    return isNaN(K) ? C : K;
  }
  return /* @__PURE__ */ He(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: r,
      onMouseMove: E,
      children: [
        x && (x.text || s) ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: N,
            style: { top: `${x.top}px`, left: `${x.left}px` },
            children: s ? /* @__PURE__ */ a(s, { data: u }) : x.text ? /* @__PURE__ */ a("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: x.text }) : null
          }
        ) : null,
        i
      ]
    }
  );
}
function Ms({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(vt, { fonts: t, children: n() }) : /* @__PURE__ */ a(vt, { fonts: t });
}
function Cs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(Tt, { fonts: t, children: n }) : /* @__PURE__ */ a(Tt, { fonts: t });
}
function Ds({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a($t, { fonts: t, children: n }) : /* @__PURE__ */ a($t, { fonts: t });
}
export {
  bs as ContextMenu,
  vs as Editor,
  ys as Gantt,
  Ts as HeaderMenu,
  Ms as Material,
  ks as Toolbar,
  $s as Tooltip,
  Cs as Willow,
  Ds as WillowDark,
  Ss as defaultColumns,
  Ns as defaultEditorItems,
  Ls as defaultMenuOptions,
  Is as defaultTaskTypes,
  Ps as defaultToolbarButtons,
  Hs as getEditorItems,
  As as getMenuOptions,
  Ws as getToolbarButtons,
  Gs as registerEditorItem,
  _s as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
