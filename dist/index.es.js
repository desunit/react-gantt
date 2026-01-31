import { jsxs as _e, jsx as u, Fragment as Je } from "react/jsx-runtime";
import { createContext as Zt, useMemo as $, useState as pe, useContext as ze, useCallback as N, useRef as se, useEffect as ce, Fragment as Jt, forwardRef as Pt, useImperativeHandle as Ht } from "react";
import { context as Ue, Button as Tt, Field as en, Text as tn, Combo as nn, DatePicker as sn, TimePicker as rn, Locale as on, RichSelect as ln, TwoState as cn, Slider as an, Counter as un, Material as vt, Willow as Ct, WillowDark as $t } from "@svar-ui/react-core";
import { locate as Ge, locateID as Ve, locateAttr as dn, dateToString as rt, locale as ot } from "@svar-ui/lib-dom";
import { en as lt } from "@svar-ui/gantt-locales";
import { en as dt } from "@svar-ui/core-locales";
import { EventBusRouter as fn } from "@svar-ui/lib-state";
import { prepareEditTask as At, grid as hn, extendDragOptions as gn, isSegmentMoveAllowed as mn, DataStore as wn, normalizeLinks as xn, normalizeZoom as pn, defaultColumns as yn, parseTaskDates as Mt, defaultTaskTypes as kn, getToolbarButtons as Dt, isHandledAction as Wt, handleAction as Ot, getMenuOptions as St, getEditorItems as bn } from "@svar-ui/gantt-store";
import { defaultColumns as Ls, defaultEditorItems as _s, defaultMenuOptions as Ps, defaultTaskTypes as Hs, defaultToolbarButtons as As, getEditorItems as Ws, getMenuOptions as Os, getToolbarButtons as zs, registerScaleUnit as Gs } from "@svar-ui/gantt-store";
import { useWritableProp as ut, useStore as U, useStoreWithCounter as st, writable as Tn, useStoreLater as Ye } from "@svar-ui/lib-react";
import { hotkeys as zt } from "@svar-ui/grid-store";
import { Grid as vn, HeaderMenu as Cn } from "@svar-ui/react-grid";
import { flushSync as $n } from "react-dom";
import { Toolbar as Rt } from "@svar-ui/react-toolbar";
import { ContextMenu as Mn } from "@svar-ui/react-menu";
import { Editor as Dn, registerEditorItem as Be } from "@svar-ui/react-editor";
import { registerEditorItem as Ys } from "@svar-ui/react-editor";
const Xe = Zt(null);
function Fe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function Sn(t, n, s) {
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
function Rn(t, n) {
  let s, l, o, _, h, b, r, T, p;
  function V(D) {
    _ = D.clientX, h = D.clientY, b = {
      ...Sn(s, t, D),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function F(D) {
    s = Ge(D), Et(s) && (o = Fe(s), p = setTimeout(() => {
      T = !0, n && n.touchStart && n.touchStart(), V(D.touches[0]);
    }, 500), t.addEventListener("touchmove", W), t.addEventListener("contextmenu", M), window.addEventListener("touchend", B));
  }
  function M(D) {
    if (T || p)
      return D.preventDefault(), !1;
  }
  function w(D) {
    D.which === 1 && (s = Ge(D), Et(s) && (o = Fe(s), t.addEventListener("mousemove", A), window.addEventListener("mouseup", v), V(D)));
  }
  function d(D) {
    t.removeEventListener("mousemove", A), t.removeEventListener("touchmove", W), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", B), document.body.style.userSelect = "", D && (t.removeEventListener("mousedown", w), t.removeEventListener("touchstart", F));
  }
  function X(D) {
    const Q = D.clientX - _, re = D.clientY - h;
    if (!l) {
      if (Math.abs(Q) < It && Math.abs(re) < It || n && n.start && n.start({ id: o, e: D }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = b.left + "px", l.style.top = b.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const Z = Math.round(Math.max(0, b.top + re));
      if (n && n.move && n.move({ id: o, top: Z, detail: r }) === !1)
        return;
      const fe = n.getTask(o), q = fe.$y;
      if (!b.start && b.y == q) return P();
      b.start = !0, b.y = fe.$y - 4, l.style.top = Z + "px";
      const ae = document.elementFromPoint(
        D.clientX,
        D.clientY
      ), S = Ge(ae);
      if (S && S !== s) {
        const f = Fe(S), z = S.getBoundingClientRect(), te = z.top + z.height / 2, he = D.clientY + b.db > te && S.nextElementSibling !== s, oe = D.clientY - b.dt < te && S.previousElementSibling !== s;
        r?.after == f || r?.before == f ? r = null : he ? r = { id: o, after: f } : oe && (r = { id: o, before: f });
      }
    }
  }
  function A(D) {
    X(D);
  }
  function W(D) {
    T ? (D.preventDefault(), X(D.touches[0])) : p && (clearTimeout(p), p = null);
  }
  function B() {
    T = null, p && (clearTimeout(p), p = null), P();
  }
  function v() {
    P();
  }
  function P() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: o, top: b.top })), o = s = l = b = r = null, d();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", w), t.addEventListener("touchstart", F), {
    destroy() {
      d(!0);
    }
  };
}
function En({ row: t, column: n }) {
  function s(o, _) {
    return {
      justifyContent: _.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ _e("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
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
  const s = $(() => t.id, [t?.id]);
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
    width: l = 0,
    display: o = "all",
    columnWidth: _ = 0,
    onTableAPIChange: h,
    multiTaskRows: b = !1,
    rowMapping: r = null
  } = t, [T, p] = ut(_), [V, F] = pe(), M = ze(Ue.i18n), w = $(() => M.getGroup("gantt"), [M]), d = ze(Xe), X = U(d, "scrollTop"), A = U(d, "cellHeight"), W = U(d, "_scrollTask"), B = U(d, "_selected"), v = U(d, "area"), P = U(d, "_tasks"), D = U(d, "_scales"), Q = U(d, "columns"), re = U(d, "_sort"), Z = U(d, "calendar"), fe = U(d, "durationUnit"), q = U(d, "splitTasks"), [ae, S] = pe(null), f = $(() => !P || !v ? [] : b && r ? P : P.slice(v.start, v.end), [P, v, b, r]), z = N(
    (i, y) => {
      if (y === "add-task")
        d.exec(y, {
          target: i,
          task: { text: w("New Task") },
          mode: "child",
          show: !0
        });
      else if (y === "open-task") {
        const E = f.find((O) => O.id === i);
        (E?.data || E?.lazy) && d.exec(y, { id: i, mode: !E.open });
      }
    },
    [f]
  ), te = N(
    (i) => {
      const y = Ve(i), E = i.target.dataset.action;
      E && i.preventDefault(), y ? E === "add-task" || E === "open-task" ? z(y, E) : d.exec("select-task", {
        id: y,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : E === "add-task" && z(null, E);
    },
    [d, z]
  ), he = se(null), oe = se(null), [ue, ve] = pe(0), [Ee, Ne] = pe(!1);
  ce(() => {
    const i = oe.current;
    if (!i || typeof ResizeObserver > "u") return;
    const y = () => ve(i.clientWidth);
    y();
    const E = new ResizeObserver(y);
    return E.observe(i), () => E.disconnect();
  }, []);
  const De = se(null), Pe = N(
    (i) => {
      const y = i.id, { before: E, after: O } = i, xe = i.onMove;
      let ye = E || O, Ie = E ? "before" : "after";
      if (xe) {
        if (Ie === "after") {
          const Oe = d.getTask(ye);
          Oe.data?.length && Oe.open && (Ie = "before", ye = Oe.data[0].id);
        }
        De.current = { id: y, [Ie]: ye };
      } else De.current = null;
      d.exec("move-task", {
        id: y,
        mode: Ie,
        target: ye,
        inProgress: xe
      });
    },
    [d]
  ), Te = $(() => b && r ? 0 : v?.from ?? 0, [v, b, r]), ee = $(() => D?.height ?? 0, [D]), x = $(() => !s && o !== "grid" ? (T ?? 0) > (l ?? 0) : (T ?? 0) > (ue ?? 0), [s, o, T, l, ue]), H = $(() => {
    const i = {};
    return x && o === "all" || o === "grid" && x ? i.width = T : o === "grid" && (i.width = "100%"), i;
  }, [x, o, T]), j = $(() => ae && !f.find((i) => i.id === ae.id) ? [...f, ae] : f, [f, ae]), K = $(() => {
    if (!b || !r) return j;
    const i = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    return j.forEach((E) => {
      const O = r.taskRows.get(E.id) ?? E.id;
      y.has(O) || (i.set(O, {
        ...E,
        $rowTasks: r.rowMap.get(O) || [E.id]
      }), y.add(O));
    }), Array.from(i.values());
  }, [j, b, r]), G = $(() => {
    let i = (Q || []).map((O) => {
      O = { ...O };
      const xe = O.header;
      if (typeof xe == "object") {
        const ye = xe.text && w(xe.text);
        O.header = { ...xe, text: ye };
      } else O.header = w(xe);
      return O;
    });
    const y = i.findIndex((O) => O.id === "text"), E = i.findIndex((O) => O.id === "add-task");
    if (y !== -1 && (i[y].cell && (i[y]._cell = i[y].cell), i[y].cell = En), E !== -1) {
      i[E].cell = i[E].cell || Nt;
      const O = i[E].header;
      if (typeof O != "object" && (i[E].header = { text: O }), i[E].header.cell = O.cell || Nt, n)
        i.splice(E, 1);
      else if (s) {
        const [xe] = i.splice(E, 1);
        i.unshift(xe);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [Q, w, n, s]), ke = $(() => o === "all" ? `${l}px` : o === "grid" ? "calc(100% - 4px)" : G.find((i) => i.id === "add-task") ? "50px" : "0", [o, l, G]), le = $(() => {
    if (K && re?.length) {
      const i = {};
      return re.forEach(({ key: y, order: E }, O) => {
        i[y] = {
          order: E,
          ...re.length > 1 && { index: O }
        };
      }), i;
    }
    return {};
  }, [K, re]), C = N(() => G.some((i) => i.flexgrow && !i.hidden), []), J = $(() => C(), [C, Ee]), ge = $(() => {
    let i = o === "chart" ? G.filter((E) => E.id === "add-task") : G;
    const y = o === "all" ? l : ue;
    if (!J) {
      let E = T, O = !1;
      if (G.some((xe) => xe.$width)) {
        let xe = 0;
        E = G.reduce((ye, Ie) => (Ie.hidden || (xe += Ie.width, ye += Ie.$width || Ie.width), ye), 0), xe > E && E > y && (O = !0);
      }
      if (O || E < y) {
        let xe = 1;
        return O || (xe = (y - 50) / (E - 50 || 1)), i.map((ye) => (ye.id !== "add-task" && !ye.hidden && (ye.$width || (ye.$width = ye.width), ye.width = ye.$width * xe), ye));
      }
    }
    return i;
  }, [o, G, J, T, l, ue]), me = N(
    (i) => {
      if (!C()) {
        const y = ge.reduce((E, O) => (i && O.$width && (O.$width = O.width), E + (O.hidden ? 0 : O.width)), 0);
        y !== T && p(y);
      }
      Ne(!0), Ne(!1);
    },
    [C, ge, T, p]
  ), g = N(() => {
    G.filter((y) => y.flexgrow && !y.hidden).length === 1 && G.forEach((y) => {
      y.$width && !y.flexgrow && !y.hidden && (y.width = y.$width);
    });
  }, []), ie = N(
    (i) => {
      if (!n) {
        const y = Ve(i), E = dn(i, "data-col-id");
        !(E && G.find((xe) => xe.id == E))?.editor && y && d.exec("show-editor", { id: y });
      }
    },
    [d, n]
    // cols is defined later; relies on latest value at call time
  ), we = $(
    () => Array.isArray(B) ? B.map((i) => i.id) : [],
    [B]
  ), Y = se(Te);
  Y.current = Te, ce(() => {
    const i = (E) => {
      if (he.current) {
        const O = he.current.querySelector(".wx-body");
        O && (O.style.top = -((E ?? 0) - (Y.current ?? 0)) + "px");
      }
      oe.current && (oe.current.scrollTop = 0);
    };
    return i(X), d.on("scroll-chart", ({ top: E }) => {
      E !== void 0 && i(E);
    });
  }, [d, X]), ce(() => {
    if (he.current) {
      const i = he.current.querySelector(".wx-body");
      i && (i.style.top = -((X ?? 0) - (Te ?? 0)) + "px");
    }
  }, [Te]), ce(() => {
    const i = he.current;
    if (!i) return;
    const y = i.querySelector(".wx-table-box .wx-body");
    if (!y || typeof ResizeObserver > "u") return;
    const E = new ResizeObserver(() => {
      if (he.current) {
        const O = he.current.querySelector(".wx-body");
        O && (O.style.top = -((X ?? 0) - (Y.current ?? 0)) + "px");
      }
    });
    return E.observe(y), () => {
      E.disconnect();
    };
  }, [ge, H, o, ke, K, X]), ce(() => {
    if (!W || !V) return;
    const { id: i } = W, y = V.getState().focusCell;
    y && y.row !== i && he.current && he.current.contains(document.activeElement) && V.exec("focus-cell", {
      row: i,
      column: y.column
    });
  }, [W, V]);
  const $e = N(
    ({ id: i }) => {
      if (n) return !1;
      d.getTask(i).open && d.exec("open-task", { id: i, mode: !1 });
      const y = d.getState()._tasks.find((E) => E.id === i);
      if (S(y || null), !y) return !1;
    },
    [d, n]
  ), ne = N(
    ({ id: i, top: y }) => {
      De.current ? Pe({ ...De.current, onMove: !1 }) : d.exec("drag-task", {
        id: i,
        top: y + (Te ?? 0),
        inProgress: !1
      }), S(null);
    },
    [d, Pe, Te]
  ), Me = N(
    ({ id: i, top: y, detail: E }) => {
      E && Pe({ ...E, onMove: !0 }), d.exec("drag-task", {
        id: i,
        top: y + (Te ?? 0),
        inProgress: !0
      });
    },
    [d, Pe, Te]
  );
  ce(() => {
    const i = he.current;
    return i ? Rn(i, {
      start: $e,
      end: ne,
      move: Me,
      getTask: d.getTask
    }).destroy : void 0;
  }, [d, $e, ne, Me]);
  const Ce = N(
    (i) => {
      const { key: y, isInput: E } = i;
      if (!E && (y === "arrowup" || y === "arrowdown"))
        return i.eventSource = "grid", d.exec("hotkey", i), !1;
      if (y === "enter") {
        const O = V?.getState().focusCell;
        if (O) {
          const { row: xe, column: ye } = O;
          ye === "add-task" ? z(xe, "add-task") : ye === "text" && z(xe, "open-task");
        }
      }
    },
    [d, z, V]
  ), Se = se(null), Ae = () => {
    Se.current = {
      setTableAPI: F,
      handleHotkey: Ce,
      sortVal: re,
      api: d,
      adjustColumns: g,
      setColumnWidth: me,
      tasks: f,
      calendarVal: Z,
      durationUnitVal: fe,
      splitTasksVal: q,
      onTableAPIChange: h
    };
  };
  Ae(), ce(() => {
    Ae();
  }, [
    F,
    Ce,
    re,
    d,
    g,
    me,
    f,
    Z,
    fe,
    q,
    h
  ]);
  const We = N((i) => {
    F(i), i.intercept("hotkey", (y) => Se.current.handleHotkey(y)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (y) => {
      const E = Se.current.sortVal, { key: O, add: xe } = y, ye = E ? E.find((Oe) => Oe.key === O) : null;
      let Ie = "asc";
      return ye && (Ie = !ye || ye.order === "asc" ? "desc" : "asc"), d.exec("sort-tasks", {
        key: O,
        order: Ie,
        add: xe
      }), !1;
    }), i.on("resize-column", () => {
      Se.current.setColumnWidth(!0);
    }), i.on("hide-column", (y) => {
      y.mode || Se.current.adjustColumns(), Se.current.setColumnWidth();
    }), i.intercept("update-cell", (y) => {
      const { id: E, column: O, value: xe } = y, ye = Se.current.tasks.find((Ie) => Ie.id === E);
      if (ye) {
        const Ie = { ...ye };
        let Oe = xe;
        Oe && !isNaN(Oe) && !(Oe instanceof Date) && (Oe *= 1), Ie[O] = Oe, At(
          Ie,
          {
            calendar: Se.current.calendarVal,
            durationUnit: Se.current.durationUnitVal,
            splitTasks: Se.current.splitTasksVal
          },
          O
        ), d.exec("update-task", {
          id: E,
          task: Ie
        });
      }
      return !1;
    }), h && h(i);
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
          style: H,
          className: "wx-rHj6070p wx-table",
          onClick: te,
          onDoubleClick: ie,
          children: /* @__PURE__ */ u(
            vn,
            {
              init: We,
              sizes: {
                rowHeight: A,
                headerHeight: (ee ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: K,
              columns: ge,
              selectedRows: [...we],
              sortMarks: le
            }
          )
        }
      )
    }
  );
}
function Nn({ borders: t = "" }) {
  const n = ze(Xe), s = U(n, "cellWidth"), l = U(n, "cellHeight"), o = se(null), [_, h] = pe("#e4e4e4");
  ce(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const r = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      h(r ? r.substring(r.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const b = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${hn(s, l, _, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ u("div", { ref: o, style: b });
}
function Ln({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = ze(Xe), o = U(l, "_links"), _ = U(l, "criticalPath"), h = se(null), b = N(
    (r) => {
      const T = r?.target?.classList;
      !T?.contains("wx-line") && !T?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return ce(() => {
    if (!s && n && h.current) {
      const r = (T) => {
        h.current && !h.current.contains(T.target) && b(T);
      };
      return document.addEventListener("click", r), () => {
        document.removeEventListener("click", r);
      };
    }
  }, [s, n, b]), /* @__PURE__ */ _e("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((r) => {
      const T = "wx-dkx3NwEn wx-line" + (_ && r.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ u(
        "polyline",
        {
          className: T,
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
function _n(t) {
  const { task: n, type: s } = t;
  function l(_) {
    const h = n.segments[_];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function o(_) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, b = n.segments;
    let r = 0, T = 0, p = null;
    do {
      const V = b[T];
      T === _ && (r > h ? p = 0 : p = Math.min((h - r) / V.duration, 1) * 100), r += V.duration, T++;
    } while (p === null && T < b.length);
    return p || 0;
  }
  return /* @__PURE__ */ u("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((_, h) => /* @__PURE__ */ _e(
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
        /* @__PURE__ */ u("div", { className: "wx-content", children: _.text || "" })
      ]
    },
    h
  )) });
}
let Ze = [], at = null, Lt = null;
const _t = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: l, lengthUnit: o } = n, _ = 864e5, h = o === "week" ? 7 : o === "month" ? 30 : o === "quarter" ? 91 : o === "year" ? 365 : 1, b = Math.floor(t / l), r = new Date(s.getTime() + b * h * _);
  return r.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: b,
    scalesStart: s.toISOString(),
    scalesStartDayOfWeek: s.getUTCDay(),
    result: r.toISOString()
  }), r;
}, Pn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: l } = s, h = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / h);
}, Hn = (t, n, s) => {
  if (!s || !t) return t;
  const { lengthUnit: l } = s, h = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5, b = new Date(t.getTime() + n * h);
  return b.setUTCHours(0, 0, 0, 0), b;
}, An = (t, n, s, l) => t < l && n > s;
function Wn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: o = null,
    marqueeSelect: _ = !1,
    copyPaste: h = !1,
    allowTaskIntersection: b = !0
  } = t, r = ze(Xe), [T, p] = st(r, "_tasks"), [V, F] = st(r, "_links"), M = U(r, "area"), w = U(r, "_scales"), d = U(r, "taskTypes"), X = U(r, "baselines"), [A, W] = st(r, "_selected"), B = U(r, "_scrollTask"), v = U(r, "criticalPath"), P = U(r, "tasks"), D = U(r, "schedule"), Q = U(r, "splitTasks"), re = $(() => {
    if (!M || !Array.isArray(T)) return [];
    const e = M.start ?? 0, c = M.end ?? 0;
    return l && o ? T.map((a) => ({ ...a })) : T.slice(e, c).map((a) => ({ ...a }));
  }, [p, M, l, o]), Z = U(r, "cellHeight"), fe = $(() => {
    if (!l || !o || !re.length) return re;
    const e = /* @__PURE__ */ new Map(), c = [];
    return T.forEach((a) => {
      const m = o.taskRows.get(a.id) ?? a.id;
      e.has(m) || (e.set(m, c.length), c.push(m));
    }), re.map((a) => {
      const m = o.taskRows.get(a.id) ?? a.id, R = e.get(m) ?? 0;
      return {
        ...a,
        $y: R * Z,
        $y_base: a.$y_base !== void 0 ? R * Z : void 0
      };
    });
  }, [re, l, o, T, Z]), q = $(
    () => w.lengthUnitWidth,
    [w]
  ), ae = $(
    () => w.lengthUnit || "day",
    [w]
  ), S = se(!1), [f, z] = pe(void 0), [te, he] = pe(null), oe = se(null), [ue, ve] = pe(null), [Ee, Ne] = pe(void 0), De = se(null), [Pe, Te] = pe(0), [ee, x] = pe(null), H = se(null), [j, K] = pe(null), [G, ke] = pe(null), [le, C] = pe(null), J = se(null);
  J.current = G;
  const ge = se(200), me = se(null), g = $(() => {
    const e = me.current;
    return !!(A.length && e && e.contains(document.activeElement));
  }, [A, me.current]), ie = $(() => g && A[A.length - 1]?.id, [g, A]);
  ce(() => {
    if (B && g && B) {
      const { id: e } = B, c = me.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [B]), ce(() => {
    const e = me.current;
    if (e && (Te(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((a) => {
        a[0] && Te(a[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [me.current]);
  const we = N(() => {
    document.body.style.userSelect = "none";
  }, []), Y = N(() => {
    document.body.style.userSelect = "";
  }, []), $e = N(
    (e, c, a) => {
      if (c.target.classList.contains("wx-line") || (a || (a = r.getTask(Fe(e))), a.type === "milestone" || a.type === "summary")) return "";
      const m = Ge(c, "data-segment");
      m && (e = m);
      const { left: R, width: I } = e.getBoundingClientRect(), k = (c.clientX - R) / I;
      let L = 0.2 / (I > 200 ? I / 200 : 1);
      return k < L ? "start" : k > 1 - L ? "end" : "";
    },
    [r]
  ), ne = $(() => {
    const e = /* @__PURE__ */ new Set();
    if (b || !l || !o)
      return e;
    const c = /* @__PURE__ */ new Map();
    return T.forEach((a) => {
      if (a.type === "summary" || a.type === "milestone") return;
      const m = o.taskRows.get(a.id) ?? a.id;
      c.has(m) || c.set(m, []), c.get(m).push(a);
    }), c.forEach((a) => {
      if (!(a.length < 2))
        for (let m = 0; m < a.length; m++)
          for (let R = m + 1; R < a.length; R++) {
            const I = a[m], k = a[R], L = I.$x, de = I.$x + I.$w, be = k.$x, Re = k.$x + k.$w;
            An(L, de, be, Re) && (e.add(I.id), e.add(k.id));
          }
    }), e;
  }, [b, l, o, T, p]), Me = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return T.forEach((m) => {
        e.set(m.id, m.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return T.forEach((m) => {
      const R = o.taskRows.get(m.id) ?? m.id;
      c.has(R) || (c.set(R, a.length), a.push(R));
    }), T.forEach((m) => {
      const R = o.taskRows.get(m.id) ?? m.id, I = c.get(R) ?? 0;
      e.set(m.id, I * Z);
    }), e;
  }, [T, l, o, Z]), Ce = $(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return T.forEach((m) => {
        e.set(m.id, m.$y), m.row !== void 0 && e.set(m.row, m.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return T.forEach((m) => {
      const R = o.taskRows.get(m.id) ?? m.id;
      c.has(R) || (c.set(R, a.length), a.push(R));
    }), c.forEach((m, R) => {
      e.set(R, m * Z);
    }), e;
  }, [T, l, o, Z]), Se = N(
    (e) => {
      if (!me.current) return [];
      const a = Math.min(e.startX, e.currentX), m = Math.max(e.startX, e.currentX), R = Math.min(e.startY, e.currentY), I = Math.max(e.startY, e.currentY);
      return T.filter((k) => {
        const L = k.$x, de = k.$x + k.$w, Re = Me.get(k.id) ?? k.$y, He = Re + k.$h;
        return L < m && de > a && Re < I && He > R;
      });
    },
    [T, Me]
  ), Ae = $(() => new Set(A.map((e) => e.id)), [A, W]), We = N(
    (e) => Ae.has(e),
    [Ae]
  ), i = N(
    (e, c) => {
      const { clientX: a } = c, m = Fe(e), R = r.getTask(m), I = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (I.contains("wx-progress-marker")) {
          const { progress: k } = r.getTask(m);
          oe.current = {
            id: m,
            x: a,
            progress: k,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const k = $e(e, c, R) || "move", L = {
            id: m,
            mode: k,
            x: a,
            dx: 0,
            l: R.$x,
            w: R.$w
          };
          if (Q && R.segments?.length) {
            const de = Ge(c, "data-segment");
            de && (L.segmentIndex = de.dataset.segment * 1, gn(R, L));
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
      const c = Ge(e);
      if (!c && _ && !n) {
        const a = me.current;
        if (!a) return;
        const m = a.getBoundingClientRect(), R = e.clientX - m.left, I = e.clientY - m.top;
        if (h) {
          const L = _t(R, w);
          L && (J.current = L, ke(L));
        }
        const k = {
          startX: R,
          startY: I,
          currentX: R,
          currentY: I,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        x(k), H.current = k, we();
        return;
      }
      if (c) {
        if (_ && !n && A.length > 1) {
          const a = Fe(c);
          if (We(a)) {
            const m = e.target.classList;
            if (!m.contains("wx-link") && !m.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const R = r.getTask(a);
              if (!$e(c, e, R)) {
                const k = /* @__PURE__ */ new Map();
                A.forEach((L) => {
                  const de = r.getTask(L.id);
                  if (de) {
                    if (D?.auto && de.type === "summary") return;
                    k.set(L.id, {
                      $x: de.$x,
                      $w: de.$w,
                      start: de.start,
                      end: de.end
                    });
                  }
                }), K({
                  baseTaskId: a,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: k
                }), we();
                return;
              }
            }
          }
        }
        i(c, e);
      }
    },
    [i, _, h, n, A, We, r, $e, D, we, w, le]
  ), E = N(
    (e) => {
      const c = Ge(e);
      c && (De.current = setTimeout(() => {
        Ne(!0), i(c, e.touches[0]);
      }, 300));
    },
    [i]
  ), O = N(
    (e) => {
      ve(e && { ...V.find((c) => c.id === e) });
    },
    [V]
  ), xe = N(() => {
    const e = H.current;
    if (e) {
      const c = Se(e);
      e.ctrlKey ? c.forEach((a) => {
        r.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (A.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), c.forEach((a, m) => {
        r.exec("select-task", {
          id: a.id,
          toggle: m > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), x(null), H.current = null, Y(), S.current = !0;
      return;
    }
    if (j) {
      const { dx: c, originalPositions: a } = j, m = Math.round(c / q);
      if (m !== 0) {
        let R = !0;
        a.forEach((I, k) => {
          const L = r.getTask(k);
          L && (r.exec("update-task", {
            id: k,
            diff: m,
            task: { start: L.start, end: L.end },
            skipUndo: !R
            // Only first task creates undo entry
          }), R = !1);
        }), S.current = !0;
      } else
        a.forEach((R, I) => {
          r.exec("drag-task", {
            id: I,
            left: R.$x,
            width: R.$w,
            inProgress: !1
          });
        });
      K(null), Y();
      return;
    }
    if (oe.current) {
      const { dx: c, id: a, marker: m, value: R } = oe.current;
      oe.current = null, typeof R < "u" && c && r.exec("update-task", {
        id: a,
        task: { progress: R },
        inProgress: !1
      }), m.classList.remove("wx-progress-in-drag"), S.current = !0, Y();
    } else if (te) {
      const { id: c, mode: a, dx: m, l: R, w: I, start: k, segment: L, index: de } = te;
      if (he(null), k) {
        const be = Math.round(m / q);
        if (!be)
          r.exec("drag-task", {
            id: c,
            width: I,
            left: R,
            inProgress: !1,
            ...L && { segmentIndex: de }
          });
        else {
          let Re = {}, He = r.getTask(c);
          L && (He = He.segments[de]);
          const qe = 1440 * 60 * 1e3, Le = be * (ae === "week" ? 7 : ae === "month" ? 30 : ae === "quarter" ? 91 : ae === "year" ? 365 : 1) * qe;
          a === "move" ? (Re.start = new Date(He.start.getTime() + Le), Re.end = new Date(He.end.getTime() + Le)) : a === "start" ? (Re.start = new Date(He.start.getTime() + Le), Re.end = He.end) : a === "end" && (Re.start = He.start, Re.end = new Date(He.end.getTime() + Le)), r.exec("update-task", {
            id: c,
            task: Re,
            ...L && { segmentIndex: de }
          });
        }
        S.current = !0;
      }
      Y();
    }
  }, [r, Y, te, q, ae, ee, j, Se, A]), ye = N(
    (e, c) => {
      const { clientX: a, clientY: m } = c, R = me.current;
      if (R) {
        const I = R.getBoundingClientRect();
        ge.current = a - I.left;
      }
      if (le) {
        if (!R) return;
        const I = R.getBoundingClientRect(), k = a - I.left;
        C((L) => ({ ...L, currentX: k }));
        return;
      }
      if (!n) {
        if (ee) {
          const I = me.current;
          if (!I) return;
          const k = I.getBoundingClientRect(), L = a - k.left, de = m - k.top;
          x((be) => ({
            ...be,
            currentX: L,
            currentY: de
          })), H.current && (H.current.currentX = L, H.current.currentY = de);
          return;
        }
        if (j) {
          const I = a - j.startX;
          j.originalPositions.forEach((k, L) => {
            const de = k.$x + I;
            r.exec("drag-task", {
              id: L,
              left: de,
              width: k.$w,
              inProgress: !0
            });
          }), K((k) => ({ ...k, dx: I }));
          return;
        }
        if (oe.current) {
          const { node: I, x: k, id: L } = oe.current, de = oe.current.dx = a - k, be = Math.round(de / I.offsetWidth * 100);
          let Re = oe.current.progress + be;
          oe.current.value = Re = Math.min(
            Math.max(0, Re),
            100
          ), r.exec("update-task", {
            id: L,
            task: { progress: Re },
            inProgress: !0
          });
        } else if (te) {
          O(null);
          const { mode: I, l: k, w: L, x: de, id: be, start: Re, segment: He, index: qe } = te, Ke = r.getTask(be), Le = a - de;
          if (!Re && Math.abs(Le) < 20 || I === "start" && L - Le < q || I === "end" && L + Le < q || I === "move" && (Le < 0 && k + Le < 0 || Le > 0 && k + L + Le > Pe) || te.segment && !mn(Ke, te))
            return;
          const nt = { ...te, dx: Le };
          let je, Qe;
          if (I === "start" ? (je = k + Le, Qe = L - Le) : I === "end" ? (je = k, Qe = L + Le) : I === "move" && (je = k + Le, Qe = L), r.exec("drag-task", {
            id: be,
            width: Qe,
            left: je,
            inProgress: !0,
            ...He && { segmentIndex: qe }
          }), !nt.start && (I === "move" && Ke.$x == k || I !== "move" && Ke.$w == L)) {
            S.current = !0, xe();
            return;
          }
          nt.start = !0, he(nt);
        } else {
          const I = Ge(e);
          if (I) {
            const k = r.getTask(Fe(I)), de = Ge(e, "data-segment") || I, be = $e(de, c, k);
            de.style.cursor = be && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      te,
      q,
      Pe,
      $e,
      O,
      xe,
      ee,
      j,
      le
    ]
  ), Ie = N(
    (e) => {
      ye(e, e);
    },
    [ye]
  ), Oe = N(
    (e) => {
      Ee ? (e.preventDefault(), ye(e, e.touches[0])) : De.current && (clearTimeout(De.current), De.current = null);
    },
    [Ee, ye]
  ), it = N(() => {
    xe();
  }, [xe]), Yt = N(() => {
    Ne(null), De.current && (clearTimeout(De.current), De.current = null), xe();
  }, [xe]);
  ce(() => (window.addEventListener("mouseup", it), () => {
    window.removeEventListener("mouseup", it);
  }), [it]);
  const Xt = N(
    (e) => {
      if (!n) {
        const c = Ve(e.target);
        if (c && !e.target.classList.contains("wx-link")) {
          const a = Ve(e.target, "data-segment");
          r.exec("show-editor", {
            id: c,
            ...a !== null && { segmentIndex: a }
          });
        }
      }
    },
    [r, n]
  ), Kt = ["e2s", "s2s", "e2e", "s2e"], et = N((e, c) => Kt[(e ? 1 : 0) + (c ? 0 : 2)], []), tt = N(
    (e, c) => {
      const a = f.id, m = f.start;
      return e === a ? !0 : !!V.find((R) => R.target == e && R.source == a && R.type === et(m, c));
    },
    [f, F, et]
  ), ft = N(() => {
    f && z(null);
  }, [f]), ht = N((e, c, a) => {
    if (!c.length || !e || a == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: e.toISOString(),
      taskCount: c.length,
      parent: a
    });
    const m = 864e5, R = r.getHistory();
    R?.startBatch();
    const I = new Date(e);
    I.setUTCHours(0, 0, 0, 0), c.forEach((k, L) => {
      const de = `task-${Date.now()}-${L}`, be = Hn(I, k._startCellOffset || 0, w), Re = new Date(be.getTime() + (k._startDayOfWeek || 0) * m);
      Re.setUTCHours(0, 0, 0, 0);
      const He = new Date(Re.getTime() + (k._durationDays || 7) * m);
      He.setUTCHours(0, 0, 0, 0), console.log("[paste] task:", {
        text: k.text,
        original: { start: k.start?.toISOString?.(), end: k.end?.toISOString?.() },
        calculated: {
          targetColumnStart: I.toISOString(),
          cellOffset: be.toISOString(),
          newStart: Re.toISOString(),
          newEnd: He.toISOString()
        },
        clipboard: {
          _startCellOffset: k._startCellOffset,
          _startDayOfWeek: k._startDayOfWeek,
          _durationDays: k._durationDays
        },
        row: k.row
      }), r.exec("add-task", {
        task: {
          id: de,
          text: k.text,
          start: Re,
          end: He,
          type: k.type || "task",
          parent: a,
          row: k.row
        },
        target: a,
        mode: "child",
        skipUndo: L > 0
      });
    }), R?.endBatch();
  }, [r, w]), Ft = N(
    (e) => {
      if (S.current) {
        S.current = !1;
        return;
      }
      if (le && le.currentX != null) {
        const a = _t(le.currentX, w);
        a && ht(a, le.tasks, le.parent), C(null);
        return;
      }
      const c = Ve(e.target);
      if (c) {
        const a = r.getTask(c), m = T.find((I) => I.id === c);
        console.log("[click] task:", a?.text, "id:", c), console.log("[click] api.getTask:", { start: a?.start, end: a?.end, duration: a?.duration }), console.log("[click] rendered:", { start: m?.start, end: m?.end, $w: m?.$w, $x: m?.$x });
        const R = e.target.classList;
        if (R.contains("wx-link")) {
          const I = R.contains("wx-left");
          if (!f) {
            z({ id: c, start: I });
            return;
          }
          f.id !== c && !tt(c, I) && r.exec("add-link", {
            link: {
              source: f.id,
              target: c,
              type: et(f.start, I)
            }
          });
        } else if (R.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: ue.id }), ve(null);
        else {
          let I;
          const k = Ge(e, "data-segment");
          k && (I = k.dataset.segment * 1), r.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: I
          });
        }
      }
      ft();
    },
    [
      r,
      f,
      F,
      ue,
      tt,
      et,
      ft,
      le,
      w,
      ht
    ]
  ), qt = N((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Vt = N((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Bt = N(
    (e) => {
      if (Ee || De.current)
        return e.preventDefault(), !1;
    },
    [Ee]
  ), gt = $(
    () => d.map((e) => e.id),
    [d]
  ), mt = N(
    (e) => {
      let c = gt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [gt]
  ), wt = N(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), ct = N(
    (e) => v && P.byId(e).$critical,
    [v, P]
  ), xt = N(
    (e) => {
      if (D?.auto) {
        const c = P.getSummaryId(e, !0), a = P.getSummaryId(f.id, !0);
        return f?.id && !(Array.isArray(c) ? c : [c]).includes(
          f.id
        ) && !(Array.isArray(a) ? a : [a]).includes(e);
      }
      return f;
    },
    [D, P, f]
  ), pt = N(() => {
    const e = r.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, a = e.map((L) => {
      const de = r.getTask(L.id);
      if (!de) return null;
      const be = T.find((Qt) => Qt.id === L.id);
      if (!be) return null;
      const { $x: Re, $y: He, $h: qe, $w: Ke, $skip: Le, $level: nt, $index: je, $y_base: Qe, $x_base: ts, $w_base: ns, $h_base: ss, $skip_baseline: rs, $critical: os, $reorder: ls, ...jt } = be, kt = be.end && be.start ? Math.round((be.end.getTime() - be.start.getTime()) / c) : 0, bt = be.start ? (be.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: de.id,
        text: de.text,
        start: be.start?.toISOString?.(),
        end: be.end?.toISOString?.(),
        durationDays: kt,
        startDayOfWeek: bt,
        $w: Ke,
        $h: qe,
        row: be.row,
        parent: be.parent
      }), { ...jt, _durationDays: kt, _startDayOfWeek: bt, _originalWidth: Ke, _originalHeight: qe };
    }).filter(Boolean);
    if (!a.length) return;
    const R = a[0].parent, I = a.filter((L) => L.parent === R);
    if (I.length === 0) return;
    const k = I.reduce((L, de) => de.start && (!L || de.start < L) ? de.start : L, null);
    Ze = I.map((L) => ({
      ...L,
      _startCellOffset: Pn(L.start, k, w)
    })), Lt = R, at = k, console.log("[copy] clipboard stored:", {
      taskCount: Ze.length,
      baseDate: k?.toISOString?.(),
      parent: R,
      tasks: Ze.map((L) => ({
        id: L.id,
        text: L.text,
        _startCellOffset: L._startCellOffset,
        _startDayOfWeek: L._startDayOfWeek,
        _durationDays: L._durationDays
      }))
    });
  }, [r, w]);
  ce(() => h ? r.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return pt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !Ze.length || !at || C({
        tasks: Ze,
        baseDate: at,
        parent: Lt,
        currentX: ge.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [h, r, pt]), ce(() => {
    if (!le) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), C(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [le]);
  const yt = $(() => {
    if (!ee) return null;
    const e = Math.min(ee.startX, ee.currentX), c = Math.min(ee.startY, ee.currentY), a = Math.abs(ee.currentX - ee.startX), m = Math.abs(ee.currentY - ee.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${a}px`,
      height: `${m}px`
    };
  }, [ee]);
  return /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${fe.length ? fe[0].$h : 0}px` },
      ref: me,
      onContextMenu: Bt,
      onMouseDown: y,
      onMouseMove: Ie,
      onTouchStart: E,
      onTouchMove: Oe,
      onTouchEnd: Yt,
      onClick: Ft,
      onDoubleClick: Xt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ u(
          Ln,
          {
            onSelectLink: O,
            selectedLink: ue,
            readonly: n
          }
        ),
        fe.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = ne.has(e.id), a = `wx-bar wx-${mt(e.type)}` + (Ee && te && e.id === te.id ? " wx-touch" : "") + (f && f.id === e.id ? " wx-selected" : "") + (Ae.has(e.id) ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (Q && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), m = "wx-link wx-left" + (f ? " wx-visible" : "") + (!f || !tt(e.id, !0) && xt(e.id) ? " wx-target" : "") + (f && f.id === e.id && f.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : ""), R = "wx-link wx-right" + (f ? " wx-visible" : "") + (!f || !tt(e.id, !1) && xt(e.id) ? " wx-target" : "") + (f && f.id === e.id && !f.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ _e(Jt, { children: [
            !e.$skip && /* @__PURE__ */ _e(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: qt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: ie === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === ue?.target && ue?.type[2] === "s" ? /* @__PURE__ */ u(
                    Tt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + m, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ _e(Je, { children: [
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
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : Q && e.segments ? /* @__PURE__ */ u(_n, { task: e, type: mt(e.type) }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" }),
                    c && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ _e(Je, { children: [
                    /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === ue?.target && ue?.type[2] === "e" ? /* @__PURE__ */ u(
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
            X && !e.$skip_baseline ? /* @__PURE__ */ u(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Vt(e)
              }
            ) : null
          ] }, e.id);
        }),
        ee && yt && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: yt }),
        le && le.currentX != null && le.tasks.map((e, c) => {
          const m = (Math.floor(le.currentX / q) + (e._startCellOffset || 0)) * q, R = e._originalWidth || q, I = e._originalHeight || Z, k = Ce.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: m, top: k, width: R, height: I },
              children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function On(t) {
  const { highlightTime: n } = t, s = ze(Xe), l = U(s, "_scales");
  return /* @__PURE__ */ u("div", { className: "wx-ZkvhDKir wx-scale", style: { width: l.width }, children: (l?.rows || []).map((o, _) => /* @__PURE__ */ u(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((h, b) => {
        const r = n ? n(h.date, h.unit) : "", T = "wx-cell " + (h.css || "") + " " + (r || ""), p = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ u(
          "div",
          {
            className: "wx-ZkvhDKir " + T,
            style: { width: `${h.width}px` },
            ...p ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          b
        );
      })
    },
    _
  )) });
}
const zn = /* @__PURE__ */ new Map();
function Gn(t) {
  const n = se(null), s = se(0), l = se(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, ce(() => {
    if (o)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const _ = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        zn.set(t, _), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: _ })
        );
      }), () => cancelAnimationFrame(l.current);
  });
}
function Un(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: l,
    taskTemplate: o,
    cellBorders: _,
    highlightTime: h,
    multiTaskRows: b = !1,
    rowMapping: r = null,
    marqueeSelect: T = !1,
    copyPaste: p = !1,
    scrollToCurrentWeek: V = !1,
    currentWeekColor: F = null,
    allowTaskIntersection: M = !0
  } = t, w = ze(Xe), [d, X] = st(w, "_selected"), A = U(w, "scrollTop"), W = U(w, "cellHeight"), B = U(w, "cellWidth"), v = U(w, "_scales"), P = U(w, "_markers"), D = U(w, "_scrollTask"), Q = U(w, "zoom"), re = U(w, "_tasks"), [Z, fe] = pe(), q = se(null), ae = se(0), S = se(!1), f = 1 + (v?.rows?.length || 0), z = $(() => {
    if (!b || !r || !re?.length) return null;
    const x = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), j = [];
    return re.forEach((K) => {
      const G = r.taskRows.get(K.id) ?? K.id;
      H.has(G) || (H.set(G, j.length), j.push(G));
    }), re.forEach((K) => {
      const G = r.taskRows.get(K.id) ?? K.id, ke = H.get(G) ?? 0;
      x.set(K.id, ke * W);
    }), x;
  }, [re, b, r, W]), te = $(() => {
    const x = [];
    return d && d.length && W && d.forEach((H) => {
      const j = z?.get(H.id) ?? H.$y;
      x.push({ height: `${W}px`, top: `${j - 3}px` });
    }), x;
  }, [X, W, z]), he = $(
    () => Math.max(Z || 0, l),
    [Z, l]
  );
  ce(() => {
    const x = q.current;
    x && typeof A == "number" && (x.scrollTop = A);
  }, [A]);
  const oe = () => {
    ue();
  };
  function ue(x) {
    const H = q.current;
    if (!H) return;
    const j = {};
    j.left = H.scrollLeft, w.exec("scroll-chart", j);
  }
  function ve() {
    const x = q.current, j = Math.ceil((Z || 0) / (W || 1)) + 1, K = Math.floor((x && x.scrollTop || 0) / (W || 1)), G = Math.max(0, K - f), ke = K + j + f, le = G * (W || 0);
    w.exec("render-data", {
      start: G,
      end: ke,
      from: le
    });
  }
  ce(() => {
    ve();
  }, [Z, A]);
  const Ee = N(
    (x) => {
      if (!x) return;
      const { id: H, mode: j } = x;
      if (j.toString().indexOf("x") < 0) return;
      const K = q.current;
      if (!K) return;
      const { clientWidth: G } = K, ke = w.getTask(H);
      if (ke.$x + ke.$w < K.scrollLeft)
        w.exec("scroll-chart", { left: ke.$x - (B || 0) }), K.scrollLeft = ke.$x - (B || 0);
      else if (ke.$x >= G + K.scrollLeft) {
        const le = G < ke.$w ? B || 0 : ke.$w;
        w.exec("scroll-chart", { left: ke.$x - G + le }), K.scrollLeft = ke.$x - G + le;
      }
    },
    [w, B]
  );
  ce(() => {
    Ee(D);
  }, [D]);
  function Ne(x) {
    if (Q && (x.ctrlKey || x.metaKey)) {
      x.preventDefault();
      const H = q.current, j = x.clientX - (H ? H.getBoundingClientRect().left : 0);
      if (ae.current += x.deltaY, Math.abs(ae.current) >= 150) {
        const G = -Math.sign(ae.current);
        ae.current = 0, w.exec("zoom-scale", {
          dir: G,
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
  }, [h]), Pe = $(() => {
    if (!v || !h || !["hour", "day", "week"].includes(v.minUnit)) return null;
    let H = 0;
    return v.rows[v.rows.length - 1].cells.map((j) => {
      const K = De(j), G = H;
      return H += j.width, K ? { ...K, left: G } : null;
    });
  }, [v, h, De]), Te = N(
    (x) => {
      x.eventSource = "chart", w.exec("hotkey", x);
    },
    [w]
  );
  ce(() => {
    const x = q.current;
    if (!x) return;
    const H = () => fe(x.clientHeight);
    H();
    const j = new ResizeObserver(() => H());
    return j.observe(x), () => {
      j.disconnect();
    };
  }, [q.current]);
  const ee = se(null);
  return ce(() => {
    const x = q.current;
    if (x && !ee.current)
      return ee.current = zt(x, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (H) => Te(H)
      }), () => {
        ee.current?.destroy(), ee.current = null;
      };
  }, []), ce(() => {
    const x = q.current;
    if (!x) return;
    const H = Ne;
    return x.addEventListener("wheel", H), () => {
      x.removeEventListener("wheel", H);
    };
  }, [Ne]), ce(() => {
    if (!V || S.current || !v || !q.current || !Z) return;
    const x = q.current, { clientWidth: H } = x, j = /* @__PURE__ */ new Date(), K = v.rows[v.rows.length - 1]?.cells;
    if (!K) return;
    let G = -1, ke = 0;
    const le = [];
    for (let J = 0; J < K.length; J++) {
      const ge = K[J];
      le.push({ left: ke, width: ge.width });
      const me = ge.date;
      if (ge.unit === "week") {
        const g = new Date(me);
        g.setUTCDate(g.getUTCDate() + 7), j >= me && j < g && (G = J);
      } else ge.unit === "day" && j.getUTCFullYear() === me.getUTCFullYear() && j.getUTCMonth() === me.getUTCMonth() && j.getUTCDate() === me.getUTCDate() && (G = J);
      ke += ge.width;
    }
    let C = G;
    if (G > 0 && (C = G - 1), C >= 0 && le[C]) {
      const J = le[C], ge = Math.max(0, J.left);
      x.scrollLeft = ge, w.exec("scroll-chart", { left: ge }), S.current = !0;
    }
  }, [V, v, Z, w]), Gn("chart"), /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: q,
      onScroll: oe,
      children: [
        /* @__PURE__ */ u(On, { highlightTime: h, scales: v }),
        P && P.length ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${he}px` },
            children: P.map((x, H) => /* @__PURE__ */ u(
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
        /* @__PURE__ */ _e(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${he}px` },
            children: [
              Pe ? /* @__PURE__ */ u(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Pe.map(
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
              /* @__PURE__ */ u(Nn, { borders: _ }),
              d && d.length ? d.map(
                (x, H) => x.$y ? /* @__PURE__ */ u(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": x.id,
                    style: te[H]
                  },
                  x.id
                ) : null
              ) : null,
              /* @__PURE__ */ u(
                Wn,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: b,
                  rowMapping: r,
                  marqueeSelect: T,
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
    dir: l = "x",
    onMove: o,
    onDisplayChange: _,
    compactMode: h,
    containerWidth: b = 0,
    leftThreshold: r = 50,
    rightThreshold: T = 50
  } = t, [p, V] = ut(t.value ?? 0), [F, M] = ut(t.display ?? "all");
  function w(oe) {
    let ue = 0;
    n == "center" ? ue = s / 2 : n == "before" && (ue = s);
    const ve = {
      size: [s + "px", "auto"],
      p: [oe - ue + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let Ee in ve) ve[Ee] = ve[Ee].reverse();
    return ve;
  }
  const [d, X] = pe(!1), [A, W] = pe(null), B = se(0), v = se(), P = se(), D = se(F);
  ce(() => {
    D.current = F;
  }, [F]), ce(() => {
    A === null && p > 0 && W(p);
  }, [A, p]);
  function Q(oe) {
    return l == "x" ? oe.clientX : oe.clientY;
  }
  const re = N(
    (oe) => {
      const ue = v.current + Q(oe) - B.current;
      V(ue);
      let ve;
      ue <= r ? ve = "chart" : b - ue <= T ? ve = "grid" : ve = "all", D.current !== ve && (M(ve), D.current = ve), P.current && clearTimeout(P.current), P.current = setTimeout(() => o && o(ue), 100);
    },
    [b, r, T, o]
  ), Z = N(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", X(!1), window.removeEventListener("mousemove", re), window.removeEventListener("mouseup", Z);
  }, [re]), fe = $(
    () => F !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [F, l]
  ), q = N(
    (oe) => {
      !h && (F === "grid" || F === "chart") || (B.current = Q(oe), v.current = p, X(!0), document.body.style.cursor = fe, document.body.style.userSelect = "none", window.addEventListener("mousemove", re), window.addEventListener("mouseup", Z));
    },
    [fe, re, Z, p, h, F]
  );
  function ae() {
    M("all"), A !== null && (V(A), o && o(A));
  }
  function S(oe) {
    if (h) {
      const ue = F === "chart" ? "grid" : "chart";
      M(ue), _(ue);
    } else if (F === "grid" || F === "chart")
      ae(), _("all");
    else {
      const ue = oe === "left" ? "chart" : "grid";
      M(ue), _(ue);
    }
  }
  function f() {
    S("left");
  }
  function z() {
    S("right");
  }
  const te = $(() => w(p), [p, n, s, l]), he = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${F}`,
    d ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: q,
      style: { width: te.size[0], height: te.size[1], cursor: fe },
      children: [
        /* @__PURE__ */ _e("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
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
              onClick: z
            }
          ) })
        ] }),
        /* @__PURE__ */ u("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Xn = 650;
function Gt(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let _ of o)
        if (_.target === document.body) {
          let h = _.contentRect.width <= Xn;
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
    onTableAPIChange: _,
    multiTaskRows: h = !1,
    rowMapping: b = null,
    marqueeSelect: r = !1,
    copyPaste: T = !1,
    scrollToCurrentWeek: p = !1,
    currentWeekColor: V = null,
    allowTaskIntersection: F = !0
  } = t, M = ze(Xe), w = U(M, "_tasks"), d = U(M, "_scales"), X = U(M, "cellHeight"), A = U(M, "columns"), W = U(M, "_scrollTask"), B = U(M, "undo"), v = $(() => {
    if (!h) return b;
    const C = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Map();
    return w.forEach((ge) => {
      const me = ge.row ?? ge.id;
      J.set(ge.id, me), C.has(me) || C.set(me, []), C.get(me).push(ge.id);
    }), { rowMap: C, taskRows: J };
  }, [w, h, b]), [P, D] = pe(!1);
  let [Q, re] = pe(0);
  const [Z, fe] = pe(0), [q, ae] = pe(0), [S, f] = pe(void 0), [z, te] = pe("all"), he = se(null), oe = N(
    (C) => {
      D((J) => (C !== J && (C ? (he.current = z, z === "all" && te("grid")) : (!he.current || he.current === "all") && te("all")), C));
    },
    [z]
  );
  ce(() => {
    const C = Gt(oe);
    return C.observe(), () => {
      C.disconnect();
    };
  }, [oe]);
  const ue = $(() => {
    let C;
    return A.every((J) => J.width && !J.flexgrow) ? C = A.reduce((J, ge) => J + parseInt(ge.width), 0) : P && z === "chart" ? C = parseInt(A.find((J) => J.id === "action")?.width) || 50 : C = 440, Q = C, C;
  }, [A, P, z]);
  ce(() => {
    re(ue);
  }, [ue]);
  const ve = $(
    () => (Z ?? 0) - (S ?? 0),
    [Z, S]
  ), Ee = $(() => d.width, [d]), Ne = $(() => {
    if (!h || !v)
      return w.length * X;
    const C = /* @__PURE__ */ new Set();
    return w.forEach((J) => {
      const ge = v.taskRows.get(J.id) ?? J.id;
      C.add(ge);
    }), C.size * X;
  }, [w, X, h, v]), De = $(
    () => d.height + Ne + ve,
    [d, Ne, ve]
  ), Pe = $(
    () => Q + Ee,
    [Q, Ee]
  ), Te = se(null), ee = N(() => {
    Promise.resolve().then(() => {
      if ((Z ?? 0) > (Pe ?? 0)) {
        const C = (Z ?? 0) - Q;
        M.exec("expand-scale", { minWidth: C });
      }
    });
  }, [Z, Pe, Q, M]);
  ce(() => {
    let C;
    return Te.current && (C = new ResizeObserver(ee), C.observe(Te.current)), () => {
      C && C.disconnect();
    };
  }, [Te.current, ee]), ce(() => {
    ee();
  }, [Ee]);
  const x = se(null), H = se(null), j = N(() => {
    const C = x.current;
    C && M.exec("scroll-chart", {
      top: C.scrollTop
    });
  }, [M]), K = se({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  ce(() => {
    K.current = {
      rTasks: w,
      rScales: d,
      rCellHeight: X,
      scrollSize: ve,
      ganttDiv: x.current,
      ganttHeight: q ?? 0
    };
  }, [w, d, X, ve, q]);
  const G = N(
    (C) => {
      if (!C) return;
      const {
        rTasks: J,
        rScales: ge,
        rCellHeight: me,
        scrollSize: g,
        ganttDiv: ie,
        ganttHeight: we
      } = K.current;
      if (!ie) return;
      const { id: Y } = C, $e = J.findIndex((ne) => ne.id === Y);
      if ($e > -1) {
        const ne = we - ge.height, Me = $e * me, Ce = ie.scrollTop;
        let Se = null;
        Me < Ce ? Se = Me : Me + me > Ce + ne && (Se = Me - ne + me + g), Se !== null && (M.exec("scroll-chart", { top: Math.max(Se, 0) }), x.current.scrollTop = Math.max(Se, 0));
      }
    },
    [M]
  );
  ce(() => {
    G(W);
  }, [W]), ce(() => {
    const C = x.current, J = H.current;
    if (!C || !J) return;
    const ge = () => {
      $n(() => {
        ae(C.offsetHeight), fe(C.offsetWidth), f(J.offsetWidth);
      });
    }, me = new ResizeObserver(ge);
    return me.observe(C), () => me.disconnect();
  }, [x.current]);
  const ke = se(null), le = se(null);
  return ce(() => {
    le.current && (le.current.destroy(), le.current = null);
    const C = ke.current;
    if (C)
      return le.current = zt(C, {
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
          const ge = J.key;
          if (ge === "ctrl+z" || ge === "meta+z") {
            M.exec("undo", {});
            return;
          }
          if (ge === "ctrl+y" || ge === "meta+shift+z") {
            M.exec("redo", {});
            return;
          }
          M.exec("hotkey", J);
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
            width: S
          },
          children: /* @__PURE__ */ _e("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ke, children: [
            A.length ? /* @__PURE__ */ _e(Je, { children: [
              /* @__PURE__ */ u(
                In,
                {
                  display: z,
                  compactMode: P,
                  columnWidth: ue,
                  width: Q,
                  readonly: s,
                  fullHeight: Ne,
                  onTableAPIChange: _,
                  multiTaskRows: h,
                  rowMapping: v
                }
              ),
              /* @__PURE__ */ u(
                Yn,
                {
                  value: Q,
                  display: z,
                  compactMode: P,
                  containerWidth: Z,
                  onMove: (C) => re(C),
                  onDisplayChange: (C) => te(C)
                }
              )
            ] }) : null,
            /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-content", ref: Te, children: /* @__PURE__ */ u(
              Un,
              {
                readonly: s,
                fullWidth: Ee,
                fullHeight: Ne,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: o,
                multiTaskRows: h,
                rowMapping: v,
                marqueeSelect: r,
                copyPaste: T,
                scrollToCurrentWeek: p,
                currentWeekColor: V,
                allowTaskIntersection: F
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function Fn(t) {
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
function Vn(t, n) {
  const s = Fn(n);
  for (let l in s)
    s[l] = rt(s[l], t);
  return s;
}
function Bn(t, n) {
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
function jn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Ut(s.scales, n)
    }))
  } : t;
}
const Qn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Zn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Ts = Pt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: l = kn,
  tasks: o = [],
  selected: _ = [],
  activeTask: h = null,
  links: b = [],
  scales: r = Zn,
  columns: T = yn,
  start: p = null,
  end: V = null,
  lengthUnit: F = "day",
  durationUnit: M = "day",
  cellWidth: w = 100,
  cellHeight: d = 38,
  scaleHeight: X = 36,
  readonly: A = !1,
  cellBorders: W = "full",
  zoom: B = !1,
  baselines: v = !1,
  highlightTime: P = null,
  init: D = null,
  autoScale: Q = !0,
  unscheduledTasks: re = !1,
  criticalPath: Z = null,
  schedule: fe = { type: "forward" },
  projectStart: q = null,
  projectEnd: ae = null,
  calendar: S = null,
  undo: f = !1,
  splitTasks: z = !1,
  multiTaskRows: te = !1,
  marqueeSelect: he = !1,
  copyPaste: oe = !1,
  currentWeekHighlight: ue = !1,
  currentWeekColor: ve = null,
  scrollToCurrentWeek: Ee = !1,
  allowTaskIntersection: Ne = !0,
  ...De
}, Pe) {
  const Te = se();
  Te.current = De;
  const ee = $(() => new wn(Tn), []), x = $(() => ({ ...dt, ...lt }), []), H = ze(Ue.i18n), j = $(() => H ? H.extend(x, !0) : ot(x), [H, x]), K = $(() => j.getRaw().calendar, [j]), G = $(() => {
    let ne = {
      zoom: jn(B, K),
      scales: Ut(r, K),
      columns: Bn(T, K),
      links: xn(b),
      cellWidth: w
    };
    return ne.zoom && (ne = {
      ...ne,
      ...pn(
        ne.zoom,
        Vn(K, j.getGroup("gantt")),
        ne.scales,
        w
      )
    }), ne;
  }, [B, r, T, b, w, K, j]), ke = se(null);
  ke.current !== o && (Mt(o, { durationUnit: M, splitTasks: z, calendar: S }), ke.current = o), ce(() => {
    Mt(o, { durationUnit: M, splitTasks: z, calendar: S });
  }, [o, M, S, z]);
  const le = $(() => {
    if (!te) return null;
    const ne = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Ce = (Se) => {
      Se.forEach((Ae) => {
        const We = Ae.row ?? Ae.id;
        Me.set(Ae.id, We), ne.has(We) || ne.set(We, []), ne.get(We).push(Ae.id), Ae.data && Ae.data.length > 0 && Ce(Ae.data);
      });
    };
    return Ce(o), { rowMap: ne, taskRows: Me };
  }, [o, te]), C = $(() => ee.in, [ee]), J = se(null);
  J.current === null && (J.current = new fn((ne, Me) => {
    const Ce = "on" + Qn(ne);
    Te.current && Te.current[Ce] && Te.current[Ce](Me);
  }), C.setNext(J.current));
  const [ge, me] = pe(null), g = se(null);
  g.current = ge;
  const ie = $(
    () => ({
      getState: ee.getState.bind(ee),
      getReactiveState: ee.getReactive.bind(ee),
      getStores: () => ({ data: ee }),
      exec: C.exec,
      setNext: (ne) => (J.current = J.current.setNext(ne), J.current),
      intercept: C.intercept.bind(C),
      on: C.on.bind(C),
      detach: C.detach.bind(C),
      getTask: ee.getTask.bind(ee),
      serialize: ee.serialize.bind(ee),
      getTable: (ne) => ne ? new Promise((Me) => setTimeout(() => Me(g.current), 1)) : g.current,
      getHistory: () => ee.getHistory()
    }),
    [ee, C]
  );
  Ht(
    Pe,
    () => ({
      ...ie
    }),
    [ie]
  );
  const we = se(0);
  ce(() => {
    we.current ? ee.init({
      tasks: o,
      links: G.links,
      start: p,
      columns: G.columns,
      end: V,
      lengthUnit: F,
      cellWidth: G.cellWidth,
      cellHeight: d,
      scaleHeight: X,
      scales: G.scales,
      taskTypes: l,
      zoom: G.zoom,
      selected: _,
      activeTask: h,
      baselines: v,
      autoScale: Q,
      unscheduledTasks: re,
      markers: s,
      durationUnit: M,
      criticalPath: Z,
      schedule: fe,
      projectStart: q,
      projectEnd: ae,
      calendar: S,
      undo: f,
      _weekStart: K.weekStart,
      splitTasks: z
    }) : D && D(ie), we.current++;
  }, [
    ie,
    D,
    o,
    G,
    p,
    V,
    F,
    d,
    X,
    l,
    _,
    h,
    v,
    Q,
    re,
    s,
    M,
    Z,
    fe,
    q,
    ae,
    S,
    f,
    K,
    z,
    ee
  ]), we.current === 0 && ee.init({
    tasks: o,
    links: G.links,
    start: p,
    columns: G.columns,
    end: V,
    lengthUnit: F,
    cellWidth: G.cellWidth,
    cellHeight: d,
    scaleHeight: X,
    scales: G.scales,
    taskTypes: l,
    zoom: G.zoom,
    selected: _,
    activeTask: h,
    baselines: v,
    autoScale: Q,
    unscheduledTasks: re,
    markers: s,
    durationUnit: M,
    criticalPath: Z,
    schedule: fe,
    projectStart: q,
    projectEnd: ae,
    calendar: S,
    undo: f,
    _weekStart: K.weekStart,
    splitTasks: z
  });
  const Y = $(() => {
    const ne = /* @__PURE__ */ new Date(), Me = K?.weekStart ?? 0, Ce = new Date(Date.UTC(ne.getUTCFullYear(), ne.getUTCMonth(), ne.getUTCDate())), Ae = (Ce.getUTCDay() - Me + 7) % 7;
    Ce.setUTCDate(Ce.getUTCDate() - Ae), Ce.setUTCHours(0, 0, 0, 0);
    const We = new Date(Ce);
    return We.setUTCDate(We.getUTCDate() + 7), (i) => i >= Ce && i < We;
  }, [K]), $e = $(() => (ne, Me) => {
    let Ce = [];
    if (S)
      Me == "day" && !S.getDayHours(ne) && Ce.push("wx-weekend"), Me == "hour" && !S.getDayHours(ne) && Ce.push("wx-weekend");
    else if (P) {
      const Se = P(ne, Me);
      Se && Ce.push(Se);
    }
    return ue && (Me === "week" || Me === "day") && Y(ne) && Ce.push("wx-current-week"), Ce.join(" ");
  }, [S, P, ue, Y]);
  return /* @__PURE__ */ u(Ue.i18n.Provider, { value: j, children: /* @__PURE__ */ u(Xe.Provider, { value: ie, children: /* @__PURE__ */ u(
    Kn,
    {
      taskTemplate: n,
      readonly: A,
      cellBorders: W,
      highlightTime: $e,
      onTableAPIChange: me,
      multiTaskRows: te,
      rowMapping: le,
      marqueeSelect: he,
      copyPaste: oe,
      scrollToCurrentWeek: Ee,
      currentWeekColor: ve,
      allowTaskIntersection: Ne
    }
  ) }) });
});
function vs({ api: t = null, items: n = [] }) {
  const s = ze(Ue.i18n), l = $(() => s || ot(lt), [s]), o = $(() => l.getGroup("gantt"), [l]), _ = Ye(t, "_selected"), h = Ye(t, "undo"), b = Ye(t, "history"), r = Ye(t, "splitTasks"), T = ["undo", "redo"], p = $(() => {
    const F = Dt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : Dt({
      undo: h,
      splitTasks: r
    })).map((w) => {
      let d = { ...w, disabled: !1 };
      return d.handler = Wt(F, d.id) ? (X) => Ot(t, X.id, null, o) : d.handler, d.text && (d.text = o(d.text)), d.menuText && (d.menuText = o(d.menuText)), d;
    });
  }, [n, t, o, h, r]), V = $(() => {
    const F = [];
    return p.forEach((M) => {
      const w = M.id;
      if (w === "add-task")
        F.push(M);
      else if (T.includes(w))
        T.includes(w) && F.push({
          ...M,
          disabled: M.isDisabled(b)
        });
      else {
        if (!_?.length || !t) return;
        F.push({
          ...M,
          disabled: M.isDisabled && _.some((d) => M.isDisabled(d, t.getState()))
        });
      }
    }), F.filter((M, w) => {
      if (t && M.isHidden)
        return !_.some((d) => M.isHidden(d, t.getState()));
      if (M.comp === "separator") {
        const d = F[w + 1];
        if (!d || d.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, _, b, p]);
  return s ? /* @__PURE__ */ u(Rt, { items: V }) : /* @__PURE__ */ u(Ue.i18n.Provider, { value: l, children: /* @__PURE__ */ u(Rt, { items: V }) });
}
const Cs = Pt(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: o = null,
  at: _ = "point",
  children: h,
  onClick: b,
  css: r
}, T) {
  const p = se(null), V = se(null), F = ze(Ue.i18n), M = $(() => F || ot({ ...lt, ...dt }), [F]), w = $(() => M.getGroup("gantt"), [M]), d = Ye(s, "taskTypes"), X = Ye(s, "selected"), A = Ye(s, "_selected"), W = Ye(s, "splitTasks"), B = $(() => St({ splitTasks: !0 }), []);
  ce(() => {
    s && (s.on("scroll-chart", () => {
      p.current && p.current.show && p.current.show();
    }), s.on("drag-task", () => {
      p.current && p.current.show && p.current.show();
    }));
  }, [s]);
  function v(S) {
    return S.map((f) => (f = { ...f }, f.text && (f.text = w(f.text)), f.subtext && (f.subtext = w(f.subtext)), f.data && (f.data = v(f.data)), f));
  }
  function P() {
    const S = n.length ? n : St({ splitTasks: W }), f = S.find((z) => z.id === "convert-task");
    return f && (f.data = [], (d || []).forEach((z) => {
      f.data.push(f.dataFactory(z));
    })), v(S);
  }
  const D = $(() => P(), [s, n, d, W, w]), Q = $(
    () => A && A.length ? A : [],
    [A]
  ), re = N(
    (S, f) => {
      let z = S ? s?.getTask(S) : null;
      if (l) {
        const te = l(S, f);
        z = te === !0 ? z : te;
      }
      if (z) {
        const te = Ve(f.target, "data-segment");
        te !== null ? V.current = { id: z.id, segmentIndex: te } : V.current = z.id, (!Array.isArray(X) || !X.includes(z.id)) && s && s.exec && s.exec("select-task", { id: z.id });
      }
      return z;
    },
    [s, l, X]
  ), Z = N(
    (S) => {
      const f = S.action;
      f && (Wt(B, f.id) && Ot(s, f.id, V.current, w), b && b(S));
    },
    [s, w, b, B]
  ), fe = N(
    (S, f) => {
      const z = Q.length ? Q : f ? [f] : [];
      let te = o ? z.every((he) => o(S, he)) : !0;
      if (te && (S.isHidden && (te = !z.some(
        (he) => S.isHidden(he, s.getState(), V.current)
      )), S.isDisabled)) {
        const he = z.some(
          (oe) => S.isDisabled(oe, s.getState(), V.current)
        );
        S.disabled = he;
      }
      return te;
    },
    [o, Q, s]
  );
  Ht(T, () => ({
    show: (S, f) => {
      p.current && p.current.show && p.current.show(S, f);
    }
  }));
  const q = N((S) => {
    p.current && p.current.show && p.current.show(S);
  }, []), ae = /* @__PURE__ */ _e(Je, { children: [
    /* @__PURE__ */ u(
      Mn,
      {
        filter: fe,
        options: D,
        dataKey: "id",
        resolver: re,
        onClick: Z,
        at: _,
        ref: p,
        css: r
      }
    ),
    /* @__PURE__ */ u("span", { onContextMenu: q, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!F && Ue.i18n?.Provider) {
    const S = Ue.i18n.Provider;
    return /* @__PURE__ */ u(S, { value: M, children: ae });
  }
  return ae;
});
function Jn({ api: t, autoSave: n, onLinksChange: s }) {
  const o = ze(Ue.i18n).getGroup("gantt"), _ = U(t, "activeTask"), h = U(t, "_activeTask"), b = U(t, "_links"), r = U(t, "schedule"), T = U(t, "unscheduledTasks"), [p, V] = pe();
  function F() {
    if (_) {
      const X = b.filter((W) => W.target == _).map((W) => ({ link: W, task: t.getTask(W.source) })), A = b.filter((W) => W.source == _).map((W) => ({ link: W, task: t.getTask(W.target) }));
      return [
        { title: o("Predecessors"), data: X },
        { title: o("Successors"), data: A }
      ];
    }
  }
  ce(() => {
    V(F());
  }, [_, b]);
  const M = $(
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
      (A) => (A || []).map((W) => ({
        ...W,
        data: W.data.filter((B) => B.link.id !== X)
      }))
    ), s && s({
      id: X,
      action: "delete-link",
      data: { id: X }
    }));
  }
  function d(X, A) {
    n ? t.exec("update-link", {
      id: X,
      link: A
    }) : (V(
      (W) => (W || []).map((B) => ({
        ...B,
        data: B.data.map(
          (v) => v.link.id === X ? { ...v, link: { ...v.link, ...A } } : v
        )
      }))
    ), s && s({
      id: X,
      action: "update-link",
      data: {
        id: X,
        link: A
      }
    }));
  }
  return /* @__PURE__ */ u(Je, { children: (p || []).map(
    (X, A) => X.data.length ? /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ u(en, { label: X.title, position: "top", children: /* @__PURE__ */ u("table", { children: /* @__PURE__ */ u("tbody", { children: X.data.map((W) => /* @__PURE__ */ _e("tr", { children: [
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-task-name", children: W.task.text || "" }) }),
      r?.auto && W.link.type === "e2s" ? /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ u(
        tn,
        {
          type: "number",
          placeholder: o("Lag"),
          value: W.link.lag,
          disabled: T && h?.unscheduled,
          onChange: (B) => {
            B.input || d(W.link.id, { lag: B.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ u(
        nn,
        {
          value: W.link.type,
          placeholder: o("Select link type"),
          options: M,
          onChange: (B) => d(W.link.id, { type: B.value }),
          children: ({ option: B }) => B.label
        }
      ) }) }),
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => w(W.link.id),
          role: "button"
        }
      ) })
    ] }, W.link.id)) }) }) }) }, A) : null
  ) });
}
function es(t) {
  const { value: n, time: s, format: l, onchange: o, onChange: _, ...h } = t, b = _ ?? o;
  function r(T) {
    const p = new Date(T.value);
    p.setUTCHours(n.getUTCHours()), p.setUTCMinutes(n.getUTCMinutes()), b && b({ value: p });
  }
  return /* @__PURE__ */ _e("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ u(
      sn,
      {
        ...h,
        value: n,
        onChange: r,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ u(rn, { value: n, onChange: b, format: l }) : null
  ] });
}
Be("select", ln);
Be("date", es);
Be("twostate", cn);
Be("slider", an);
Be("counter", un);
Be("links", Jn);
function $s({
  api: t,
  items: n = [],
  css: s = "",
  layout: l = "default",
  readonly: o = !1,
  placement: _ = "sidebar",
  bottomBar: h = !0,
  topBar: b = !0,
  autoSave: r = !0,
  focus: T = !1,
  hotkeys: p = {}
}) {
  const V = ze(Ue.i18n), F = $(() => V || ot({ ...lt, ...dt }), [V]), M = $(() => F.getGroup("gantt"), [F]), w = F.getRaw(), d = $(() => {
    const g = w.gantt?.dateFormat || w.formats?.dateFormat;
    return rt(g, w.calendar);
  }, [w]), X = $(() => {
    if (b === !0 && !o) {
      const g = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: M("Delete"),
          id: "delete"
        }
      ];
      return r ? { items: g } : {
        items: [
          ...g,
          {
            comp: "button",
            type: "primary",
            text: M("Save"),
            id: "save"
          }
        ]
      };
    }
    return b;
  }, [b, o, r, M]), [A, W] = pe(!1), B = $(
    () => A ? "wx-full-screen" : "",
    [A]
  ), v = N((g) => {
    W(g);
  }, []);
  ce(() => {
    const g = Gt(v);
    return g.observe(), () => {
      g.disconnect();
    };
  }, [v]);
  const P = U(t, "_activeTask"), D = U(t, "activeTask"), Q = U(t, "unscheduledTasks"), re = U(t, "links"), Z = U(t, "splitTasks"), fe = $(
    () => Z && D?.segmentIndex,
    [Z, D]
  ), q = $(
    () => fe || fe === 0,
    [fe]
  ), ae = $(
    () => bn({ unscheduledTasks: Q }),
    [Q]
  ), S = U(t, "undo"), [f, z] = pe({}), [te, he] = pe(null), [oe, ue] = pe(), [ve, Ee] = pe(null), Ne = U(t, "taskTypes"), De = $(() => {
    if (!P) return null;
    let g;
    if (q && P.segments ? g = { ...P.segments[fe] } : g = { ...P }, o) {
      let ie = { parent: g.parent };
      return ae.forEach(({ key: we, comp: Y }) => {
        if (Y !== "links") {
          const $e = g[we];
          Y === "date" && $e instanceof Date ? ie[we] = d($e) : Y === "slider" && we === "progress" ? ie[we] = `${$e}%` : ie[we] = $e;
        }
      }), ie;
    }
    return g || null;
  }, [P, q, fe, o, ae, d]);
  ce(() => {
    ue(De);
  }, [De]), ce(() => {
    z({}), Ee(null), he(null);
  }, [D]);
  function Pe(g, ie) {
    return g.map((we) => {
      const Y = { ...we };
      if (we.config && (Y.config = { ...Y.config }), Y.comp === "links" && t && (Y.api = t, Y.autoSave = r, Y.onLinksChange = x), Y.comp === "select" && Y.key === "type") {
        const $e = Y.options ?? (Ne || []);
        Y.options = $e.map((ne) => ({
          ...ne,
          label: M(ne.label)
        }));
      }
      return Y.comp === "slider" && Y.key === "progress" && (Y.labelTemplate = ($e) => `${M(Y.label)} ${$e}%`), Y.label && (Y.label = M(Y.label)), Y.config?.placeholder && (Y.config.placeholder = M(Y.config.placeholder)), ie && (Y.isDisabled && Y.isDisabled(ie, t.getState()) ? Y.disabled = !0 : delete Y.disabled), Y;
    });
  }
  const Te = $(() => {
    let g = n.length ? n : ae;
    return g = Pe(g, oe), oe ? g.filter(
      (ie) => !ie.isHidden || !ie.isHidden(oe, t.getState())
    ) : g;
  }, [n, ae, oe, Ne, M, t, r]), ee = $(
    () => Te.map((g) => g.key),
    [Te]
  );
  function x({ id: g, action: ie, data: we }) {
    z((Y) => ({
      ...Y,
      [g]: { action: ie, data: we }
    }));
  }
  const H = N(() => {
    for (let g in f)
      if (re.byId(g)) {
        const { action: ie, data: we } = f[g];
        t.exec(ie, we);
      }
  }, [t, f, re]), j = N(() => {
    const g = D?.id || D;
    if (q) {
      if (P?.segments) {
        const ie = P.segments.filter(
          (we, Y) => Y !== fe
        );
        t.exec("update-task", {
          id: g,
          task: { segments: ie }
        });
      }
    } else
      t.exec("delete-task", { id: g });
  }, [t, D, q, P, fe]), K = N(() => {
    t.exec("show-editor", { id: null });
  }, [t]), G = N(
    (g) => {
      const { item: ie, changes: we } = g;
      ie.id === "delete" && j(), ie.id === "save" && (we.length ? K() : H()), ie.comp && K();
    },
    [t, D, r, H, j, K]
  ), ke = N(
    (g, ie, we) => (Q && g.type === "summary" && (g.unscheduled = !1), At(g, t.getState(), ie), we || he(!1), g),
    [Q, t]
  ), le = N(
    (g) => {
      g = {
        ...g,
        unscheduled: Q && g.unscheduled && g.type !== "summary"
      }, delete g.links, delete g.data, (ee.indexOf("duration") === -1 || g.segments && !g.duration) && delete g.duration;
      const ie = {
        id: D?.id || D,
        task: g,
        ...q && { segmentIndex: fe }
      };
      r && te && (ie.inProgress = te), t.exec("update-task", ie), r || H();
    },
    [
      t,
      D,
      Q,
      r,
      H,
      ee,
      q,
      fe,
      te
    ]
  ), C = N(
    (g) => {
      let { update: ie, key: we, input: Y } = g;
      if (Y && he(!0), g.update = ke({ ...ie }, we, Y), !r) ue(g.update);
      else if (!ve && !Y) {
        const $e = Te.find((Ce) => Ce.key === we), ne = ie[we];
        (!$e.validation || $e.validation(ne)) && (!$e.required || ne) && le(g.update);
      }
    },
    [r, ke, ve, Te, le]
  ), J = N(
    (g) => {
      r || le(g.values);
    },
    [r, le]
  ), ge = N((g) => {
    Ee(g.errors);
  }, []), me = $(
    () => S ? {
      "ctrl+z": (g) => {
        g.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (g) => {
        g.preventDefault(), t.exec("redo");
      }
    } : {},
    [S, t]
  );
  return De ? /* @__PURE__ */ u(on, { children: /* @__PURE__ */ u(
    Dn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${B} ${s}`,
      items: Te,
      values: De,
      topBar: X,
      bottomBar: h,
      placement: _,
      layout: l,
      readonly: o,
      autoSave: r,
      focus: T,
      onAction: G,
      onSave: J,
      onValidation: ge,
      onChange: C,
      hotkeys: p && { ...me, ...p }
    }
  ) }) : null;
}
const Ms = ({ children: t, columns: n = null, api: s }) => {
  const [l, o] = pe(null);
  return ce(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ u(Cn, { api: l, columns: n, children: t });
};
function Ds(t) {
  const { api: n, content: s, children: l } = t, o = se(null), _ = se(null), [h, b] = pe({}), [r, T] = pe(null), [p, V] = pe({});
  function F(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const P = v.getAttribute("data-tooltip-id"), D = v.getAttribute("data-tooltip-at"), Q = v.getAttribute("data-tooltip");
        if (P || Q) return { id: P, tooltip: Q, target: v, at: D };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ce(() => {
    const v = _.current;
    if (v && p && (p.text || s)) {
      const P = v.getBoundingClientRect();
      let D = !1, Q = p.left, re = p.top;
      P.right >= h.right && (Q = h.width - P.width - 5, D = !0), P.bottom >= h.bottom && (re = p.top - (P.bottom - h.bottom + 2), D = !0), D && V((Z) => Z && { ...Z, left: Q, top: re });
    }
  }, [p, h, s]);
  const M = se(null), w = 300, d = (v) => {
    clearTimeout(M.current), M.current = setTimeout(() => {
      v();
    }, w);
  };
  function X(v) {
    let { id: P, tooltip: D, target: Q, at: re } = F(v.target);
    if (V(null), T(null), !D)
      if (P)
        D = W(P);
      else {
        clearTimeout(M.current);
        return;
      }
    const Z = v.clientX;
    d(() => {
      P && T(A(B(P)));
      const fe = Q.getBoundingClientRect(), q = o.current, ae = q ? q.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let S, f;
      re === "left" ? (S = fe.top + 5 - ae.top, f = fe.right + 5 - ae.left) : (S = fe.top + fe.height - ae.top, f = Z - ae.left), b(ae), V({ top: S, left: f, text: D });
    });
  }
  function A(v) {
    return n?.getTask(B(v)) || null;
  }
  function W(v) {
    return A(v)?.text || "";
  }
  function B(v) {
    const P = parseInt(v);
    return isNaN(P) ? v : P;
  }
  return /* @__PURE__ */ _e(
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
            ref: _,
            style: { top: `${p.top}px`, left: `${p.left}px` },
            children: s ? /* @__PURE__ */ u(s, { data: r }) : p.text ? /* @__PURE__ */ u("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: p.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function Ss({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(vt, { fonts: t, children: n() }) : /* @__PURE__ */ u(vt, { fonts: t });
}
function Rs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u(Ct, { fonts: t, children: n }) : /* @__PURE__ */ u(Ct, { fonts: t });
}
function Es({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ u($t, { fonts: t, children: n }) : /* @__PURE__ */ u($t, { fonts: t });
}
export {
  Cs as ContextMenu,
  $s as Editor,
  Ts as Gantt,
  Ms as HeaderMenu,
  Ss as Material,
  vs as Toolbar,
  Ds as Tooltip,
  Rs as Willow,
  Es as WillowDark,
  Ls as defaultColumns,
  _s as defaultEditorItems,
  Ps as defaultMenuOptions,
  Hs as defaultTaskTypes,
  As as defaultToolbarButtons,
  Ws as getEditorItems,
  Os as getMenuOptions,
  zs as getToolbarButtons,
  Ys as registerEditorItem,
  Gs as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
