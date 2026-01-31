import { jsxs as _e, jsx as u, Fragment as Je } from "react/jsx-runtime";
import { createContext as Zt, useMemo as C, useState as pe, useContext as ze, useCallback as I, useRef as re, useEffect as ae, Fragment as Jt, forwardRef as Pt, useImperativeHandle as Ht } from "react";
import { context as Xe, Button as Tt, Field as en, Text as tn, Combo as nn, DatePicker as sn, TimePicker as rn, Locale as on, RichSelect as ln, TwoState as cn, Slider as an, Counter as un, Material as vt, Willow as Ct, WillowDark as $t } from "@svar-ui/react-core";
import { locate as Ye, locateID as Ve, locateAttr as dn, dateToString as rt, locale as ot } from "@svar-ui/lib-dom";
import { en as it } from "@svar-ui/gantt-locales";
import { en as dt } from "@svar-ui/core-locales";
import { EventBusRouter as fn } from "@svar-ui/lib-state";
import { prepareEditTask as Wt, grid as hn, extendDragOptions as gn, isSegmentMoveAllowed as mn, DataStore as wn, normalizeLinks as xn, normalizeZoom as pn, defaultColumns as yn, parseTaskDates as Mt, defaultTaskTypes as kn, getToolbarButtons as Dt, isHandledAction as At, handleAction as Ot, getMenuOptions as St, getEditorItems as bn } from "@svar-ui/gantt-store";
import { defaultColumns as Ls, defaultEditorItems as _s, defaultMenuOptions as Ps, defaultTaskTypes as Hs, defaultToolbarButtons as Ws, getEditorItems as As, getMenuOptions as Os, getToolbarButtons as zs, registerScaleUnit as Gs } from "@svar-ui/gantt-store";
import { useWritableProp as ut, useStore as U, useStoreWithCounter as st, writable as Tn, useStoreLater as Ke } from "@svar-ui/lib-react";
import { hotkeys as zt } from "@svar-ui/grid-store";
import { Grid as vn, HeaderMenu as Cn } from "@svar-ui/react-grid";
import { flushSync as $n } from "react-dom";
import { Toolbar as Rt } from "@svar-ui/react-toolbar";
import { ContextMenu as Mn } from "@svar-ui/react-menu";
import { Editor as Dn, registerEditorItem as Be } from "@svar-ui/react-editor";
import { registerEditorItem as Ys } from "@svar-ui/react-editor";
const Fe = Zt(null);
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
function Et(t) {
  return t && t.getAttribute("data-context-id");
}
const It = 5;
function Rn(t, n) {
  let s, i, o, N, h, b, r, y, m;
  function q(M) {
    N = M.clientX, h = M.clientY, b = {
      ...Sn(s, t, M),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function V(M) {
    s = Ye(M), Et(s) && (o = qe(s), m = setTimeout(() => {
      y = !0, n && n.touchStart && n.touchStart(), q(M.touches[0]);
    }, 500), t.addEventListener("touchmove", A), t.addEventListener("contextmenu", $), window.addEventListener("touchend", j));
  }
  function $(M) {
    if (y || m)
      return M.preventDefault(), !1;
  }
  function x(M) {
    M.which === 1 && (s = Ye(M), Et(s) && (o = qe(s), t.addEventListener("mousemove", W), window.addEventListener("mouseup", T), q(M)));
  }
  function d(M) {
    t.removeEventListener("mousemove", W), t.removeEventListener("touchmove", A), document.body.removeEventListener("mouseup", T), document.body.removeEventListener("touchend", j), document.body.style.userSelect = "", M && (t.removeEventListener("mousedown", x), t.removeEventListener("touchstart", V));
  }
  function X(M) {
    const Z = M.clientX - N, oe = M.clientY - h;
    if (!i) {
      if (Math.abs(Z) < It && Math.abs(oe) < It || n && n.start && n.start({ id: o, e: M }) === !1)
        return;
      i = s.cloneNode(!0), i.style.pointerEvents = "none", i.classList.add("wx-reorder-task"), i.style.position = "absolute", i.style.left = b.left + "px", i.style.top = b.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const J = Math.round(Math.max(0, b.top + oe));
      if (n && n.move && n.move({ id: o, top: J, detail: r }) === !1)
        return;
      const fe = n.getTask(o), B = fe.$y;
      if (!b.start && b.y == B) return P();
      b.start = !0, b.y = fe.$y - 4, i.style.top = J + "px";
      const ue = document.elementFromPoint(
        M.clientX,
        M.clientY
      ), D = Ye(ue);
      if (D && D !== s) {
        const f = qe(D), z = D.getBoundingClientRect(), ne = z.top + z.height / 2, he = M.clientY + b.db > ne && D.nextElementSibling !== s, ie = M.clientY - b.dt < ne && D.previousElementSibling !== s;
        r?.after == f || r?.before == f ? r = null : he ? r = { id: o, after: f } : ie && (r = { id: o, before: f });
      }
    }
  }
  function W(M) {
    X(M);
  }
  function A(M) {
    y ? (M.preventDefault(), X(M.touches[0])) : m && (clearTimeout(m), m = null);
  }
  function j() {
    y = null, m && (clearTimeout(m), m = null), P();
  }
  function T() {
    P();
  }
  function P() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: o, top: b.top })), o = s = i = b = r = null, d();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", x), t.addEventListener("touchstart", V), {
    destroy() {
      d(!0);
    }
  };
}
function En({ row: t, column: n }) {
  function s(o, N) {
    return {
      justifyContent: N.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const i = n && n._cell;
  return /* @__PURE__ */ _e("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
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
function In(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: o = "all",
    columnWidth: N = 0,
    onTableAPIChange: h,
    multiTaskRows: b = !1,
    rowMapping: r = null
  } = t, [y, m] = ut(N), [q, V] = pe(), $ = ze(Xe.i18n), x = C(() => $.getGroup("gantt"), [$]), d = ze(Fe), X = U(d, "scrollTop"), W = U(d, "cellHeight"), A = U(d, "_scrollTask"), j = U(d, "_selected"), T = U(d, "area"), P = U(d, "_tasks"), M = U(d, "_scales"), Z = U(d, "columns"), oe = U(d, "_sort"), J = U(d, "calendar"), fe = U(d, "durationUnit"), B = U(d, "splitTasks"), [ue, D] = pe(null), f = C(() => !P || !T ? [] : b && r ? P : P.slice(T.start, T.end), [P, T, b, r]), z = I(
    (l, k) => {
      if (k === "add-task")
        d.exec(k, {
          target: l,
          task: { text: x("New Task") },
          mode: "child",
          show: !0
        });
      else if (k === "open-task") {
        const E = f.find((O) => O.id === l);
        (E?.data || E?.lazy) && d.exec(k, { id: l, mode: !E.open });
      }
    },
    [f]
  ), ne = I(
    (l) => {
      const k = Ve(l), E = l.target.dataset.action;
      E && l.preventDefault(), k ? E === "add-task" || E === "open-task" ? z(k, E) : d.exec("select-task", {
        id: k,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : E === "add-task" && z(null, E);
    },
    [d, z]
  ), he = re(null), ie = re(null), [de, ve] = pe(0), [Re, Ne] = pe(!1);
  ae(() => {
    const l = ie.current;
    if (!l || typeof ResizeObserver > "u") return;
    const k = () => ve(l.clientWidth);
    k();
    const E = new ResizeObserver(k);
    return E.observe(l), () => E.disconnect();
  }, []);
  const De = re(null), Pe = I(
    (l) => {
      const k = l.id, { before: E, after: O } = l, xe = l.onMove;
      let ye = E || O, Ie = E ? "before" : "after";
      if (xe) {
        if (Ie === "after") {
          const Oe = d.getTask(ye);
          Oe.data?.length && Oe.open && (Ie = "before", ye = Oe.data[0].id);
        }
        De.current = { id: k, [Ie]: ye };
      } else De.current = null;
      d.exec("move-task", {
        id: k,
        mode: Ie,
        target: ye,
        inProgress: xe
      });
    },
    [d]
  ), Te = C(() => b && r ? 0 : T?.from ?? 0, [T, b, r]), te = C(() => M?.height ?? 0, [M]), p = C(() => !s && o !== "grid" ? (y ?? 0) > (i ?? 0) : (y ?? 0) > (de ?? 0), [s, o, y, i, de]), H = C(() => {
    const l = {};
    return p && o === "all" || o === "grid" && p ? l.width = y : o === "grid" && (l.width = "100%"), l;
  }, [p, o, y]), Q = C(() => ue && !f.find((l) => l.id === ue.id) ? [...f, ue] : f, [f, ue]), K = C(() => {
    if (!b || !r) return Q;
    const l = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set();
    return Q.forEach((E) => {
      const O = r.taskRows.get(E.id) ?? E.id;
      k.has(O) || (l.set(O, {
        ...E,
        $rowTasks: r.rowMap.get(O) || [E.id]
      }), k.add(O));
    }), Array.from(l.values());
  }, [Q, b, r]), G = C(() => {
    let l = (Z || []).map((O) => {
      O = { ...O };
      const xe = O.header;
      if (typeof xe == "object") {
        const ye = xe.text && x(xe.text);
        O.header = { ...xe, text: ye };
      } else O.header = x(xe);
      return O;
    });
    const k = l.findIndex((O) => O.id === "text"), E = l.findIndex((O) => O.id === "add-task");
    if (k !== -1 && (l[k].cell && (l[k]._cell = l[k].cell), l[k].cell = En), E !== -1) {
      l[E].cell = l[E].cell || Nt;
      const O = l[E].header;
      if (typeof O != "object" && (l[E].header = { text: O }), l[E].header.cell = O.cell || Nt, n)
        l.splice(E, 1);
      else if (s) {
        const [xe] = l.splice(E, 1);
        l.unshift(xe);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [Z, x, n, s]), ke = C(() => o === "all" ? `${i}px` : o === "grid" ? "calc(100% - 4px)" : G.find((l) => l.id === "add-task") ? "50px" : "0", [o, i, G]), le = C(() => {
    if (K && oe?.length) {
      const l = {};
      return oe.forEach(({ key: k, order: E }, O) => {
        l[k] = {
          order: E,
          ...oe.length > 1 && { index: O }
        };
      }), l;
    }
    return {};
  }, [K, oe]), v = I(() => G.some((l) => l.flexgrow && !l.hidden), []), ee = C(() => v(), [v, Re]), ge = C(() => {
    let l = o === "chart" ? G.filter((E) => E.id === "add-task") : G;
    const k = o === "all" ? i : de;
    if (!ee) {
      let E = y, O = !1;
      if (G.some((xe) => xe.$width)) {
        let xe = 0;
        E = G.reduce((ye, Ie) => (Ie.hidden || (xe += Ie.width, ye += Ie.$width || Ie.width), ye), 0), xe > E && E > k && (O = !0);
      }
      if (O || E < k) {
        let xe = 1;
        return O || (xe = (k - 50) / (E - 50 || 1)), l.map((ye) => (ye.id !== "add-task" && !ye.hidden && (ye.$width || (ye.$width = ye.width), ye.width = ye.$width * xe), ye));
      }
    }
    return l;
  }, [o, G, ee, y, i, de]), me = I(
    (l) => {
      if (!v()) {
        const k = ge.reduce((E, O) => (l && O.$width && (O.$width = O.width), E + (O.hidden ? 0 : O.width)), 0);
        k !== y && m(k);
      }
      Ne(!0), Ne(!1);
    },
    [v, ge, y, m]
  ), g = I(() => {
    G.filter((k) => k.flexgrow && !k.hidden).length === 1 && G.forEach((k) => {
      k.$width && !k.flexgrow && !k.hidden && (k.width = k.$width);
    });
  }, []), ce = I(
    (l) => {
      if (!n) {
        const k = Ve(l), E = dn(l, "data-col-id");
        !(E && G.find((xe) => xe.id == E))?.editor && k && d.exec("show-editor", { id: k });
      }
    },
    [d, n]
    // cols is defined later; relies on latest value at call time
  ), we = C(
    () => Array.isArray(j) ? j.map((l) => l.id) : [],
    [j]
  ), Y = re(Te);
  Y.current = Te, ae(() => {
    const l = (E) => {
      if (he.current) {
        const O = he.current.querySelector(".wx-body");
        O && (O.style.top = -((E ?? 0) - (Y.current ?? 0)) + "px");
      }
      ie.current && (ie.current.scrollTop = 0);
    };
    return l(X), d.on("scroll-chart", ({ top: E }) => {
      E !== void 0 && l(E);
    });
  }, [d, X]), ae(() => {
    if (he.current) {
      const l = he.current.querySelector(".wx-body");
      l && (l.style.top = -((X ?? 0) - (Te ?? 0)) + "px");
    }
  }, [Te]), ae(() => {
    const l = he.current;
    if (!l) return;
    const k = l.querySelector(".wx-table-box .wx-body");
    if (!k || typeof ResizeObserver > "u") return;
    const E = new ResizeObserver(() => {
      if (he.current) {
        const O = he.current.querySelector(".wx-body");
        O && (O.style.top = -((X ?? 0) - (Y.current ?? 0)) + "px");
      }
    });
    return E.observe(k), () => {
      E.disconnect();
    };
  }, [ge, H, o, ke, K, X]), ae(() => {
    if (!A || !q) return;
    const { id: l } = A, k = q.getState().focusCell;
    k && k.row !== l && he.current && he.current.contains(document.activeElement) && q.exec("focus-cell", {
      row: l,
      column: k.column
    });
  }, [A, q]);
  const $e = I(
    ({ id: l }) => {
      if (n) return !1;
      d.getTask(l).open && d.exec("open-task", { id: l, mode: !1 });
      const k = d.getState()._tasks.find((E) => E.id === l);
      if (D(k || null), !k) return !1;
    },
    [d, n]
  ), se = I(
    ({ id: l, top: k }) => {
      De.current ? Pe({ ...De.current, onMove: !1 }) : d.exec("drag-task", {
        id: l,
        top: k + (Te ?? 0),
        inProgress: !1
      }), D(null);
    },
    [d, Pe, Te]
  ), Me = I(
    ({ id: l, top: k, detail: E }) => {
      E && Pe({ ...E, onMove: !0 }), d.exec("drag-task", {
        id: l,
        top: k + (Te ?? 0),
        inProgress: !0
      });
    },
    [d, Pe, Te]
  );
  ae(() => {
    const l = he.current;
    return l ? Rn(l, {
      start: $e,
      end: se,
      move: Me,
      getTask: d.getTask
    }).destroy : void 0;
  }, [d, $e, se, Me]);
  const Ce = I(
    (l) => {
      const { key: k, isInput: E } = l;
      if (!E && (k === "arrowup" || k === "arrowdown"))
        return l.eventSource = "grid", d.exec("hotkey", l), !1;
      if (k === "enter") {
        const O = q?.getState().focusCell;
        if (O) {
          const { row: xe, column: ye } = O;
          ye === "add-task" ? z(xe, "add-task") : ye === "text" && z(xe, "open-task");
        }
      }
    },
    [d, z, q]
  ), Se = re(null), He = () => {
    Se.current = {
      setTableAPI: V,
      handleHotkey: Ce,
      sortVal: oe,
      api: d,
      adjustColumns: g,
      setColumnWidth: me,
      tasks: f,
      calendarVal: J,
      durationUnitVal: fe,
      splitTasksVal: B,
      onTableAPIChange: h
    };
  };
  He(), ae(() => {
    He();
  }, [
    V,
    Ce,
    oe,
    d,
    g,
    me,
    f,
    J,
    fe,
    B,
    h
  ]);
  const Ae = I((l) => {
    V(l), l.intercept("hotkey", (k) => Se.current.handleHotkey(k)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (k) => {
      const E = Se.current.sortVal, { key: O, add: xe } = k, ye = E ? E.find((Oe) => Oe.key === O) : null;
      let Ie = "asc";
      return ye && (Ie = !ye || ye.order === "asc" ? "desc" : "asc"), d.exec("sort-tasks", {
        key: O,
        order: Ie,
        add: xe
      }), !1;
    }), l.on("resize-column", () => {
      Se.current.setColumnWidth(!0);
    }), l.on("hide-column", (k) => {
      k.mode || Se.current.adjustColumns(), Se.current.setColumnWidth();
    }), l.intercept("update-cell", (k) => {
      const { id: E, column: O, value: xe } = k, ye = Se.current.tasks.find((Ie) => Ie.id === E);
      if (ye) {
        const Ie = { ...ye };
        let Oe = xe;
        Oe && !isNaN(Oe) && !(Oe instanceof Date) && (Oe *= 1), Ie[O] = Oe, Wt(
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
            vn,
            {
              init: Ae,
              sizes: {
                rowHeight: W,
                headerHeight: (te ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
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
  const n = ze(Fe), s = U(n, "cellWidth"), i = U(n, "cellHeight"), o = re(null), [N, h] = pe("#e4e4e4");
  ae(() => {
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
    background: s != null && i != null ? `url(${hn(s, i, N, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ u("div", { ref: o, style: b });
}
function Ln({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = ze(Fe), o = U(i, "_links"), N = U(i, "criticalPath"), h = re(null), b = I(
    (r) => {
      const y = r?.target?.classList;
      !y?.contains("wx-line") && !y?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return ae(() => {
    if (!s && n && h.current) {
      const r = (y) => {
        h.current && !h.current.contains(y.target) && b(y);
      };
      return document.addEventListener("click", r), () => {
        document.removeEventListener("click", r);
      };
    }
  }, [s, n, b]), /* @__PURE__ */ _e("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((r) => {
      const y = "wx-dkx3NwEn wx-line" + (N && r.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ u(
        "polyline",
        {
          className: y,
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
  function i(N) {
    const h = n.segments[N];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function o(N) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, b = n.segments;
    let r = 0, y = 0, m = null;
    do {
      const q = b[y];
      y === N && (r > h ? m = 0 : m = Math.min((h - r) / q.duration, 1) * 100), r += q.duration, y++;
    } while (m === null && y < b.length);
    return m || 0;
  }
  return /* @__PURE__ */ u("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((N, h) => /* @__PURE__ */ _e(
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
        /* @__PURE__ */ u("div", { className: "wx-content", children: N.text || "" })
      ]
    },
    h
  )) });
}
let Ze = [], at = null, Lt = null;
const _t = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: i, lengthUnit: o } = n, N = 864e5, h = o === "week" ? 7 : o === "month" ? 30 : o === "quarter" ? 91 : o === "year" ? 365 : 1, b = Math.floor(t / i);
  let r = s;
  if (o === "week") {
    const m = s.getUTCDay(), q = m === 0 ? -6 : 1 - m;
    r = new Date(s.getTime() + q * N), r.setUTCHours(0, 0, 0, 0);
  }
  const y = new Date(r.getTime() + b * h * N);
  return y.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: b,
    scalesStart: s.toISOString(),
    scalesStartDayOfWeek: s.getUTCDay(),
    alignedStart: r.toISOString(),
    result: y.toISOString()
  }), y;
}, Pn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: i } = s, h = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / h);
}, Hn = (t, n, s) => {
  if (!s || !t) return t;
  const { lengthUnit: i } = s, h = (i === "week" ? 7 : i === "month" ? 30 : i === "quarter" ? 91 : i === "year" ? 365 : 1) * 864e5, b = new Date(t.getTime() + n * h);
  return b.setUTCHours(0, 0, 0, 0), b;
}, Wn = (t, n, s, i) => t < i && n > s;
function An(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: i = !1,
    rowMapping: o = null,
    marqueeSelect: N = !1,
    copyPaste: h = !1,
    allowTaskIntersection: b = !0
  } = t, r = ze(Fe), [y, m] = st(r, "_tasks"), [q, V] = st(r, "_links"), $ = U(r, "area"), x = U(r, "_scales"), d = U(r, "taskTypes"), X = U(r, "baselines"), [W, A] = st(r, "_selected"), j = U(r, "_scrollTask"), T = U(r, "criticalPath"), P = U(r, "tasks"), M = U(r, "schedule"), Z = U(r, "splitTasks"), oe = C(() => {
    if (!$ || !Array.isArray(y)) return [];
    const e = $.start ?? 0, c = $.end ?? 0;
    return i && o ? y.map((a) => ({ ...a })) : y.slice(e, c).map((a) => ({ ...a }));
  }, [m, $, i, o]), J = U(r, "cellHeight"), fe = C(() => {
    if (!i || !o || !oe.length) return oe;
    const e = /* @__PURE__ */ new Map(), c = [];
    return y.forEach((a) => {
      const w = o.taskRows.get(a.id) ?? a.id;
      e.has(w) || (e.set(w, c.length), c.push(w));
    }), oe.map((a) => {
      const w = o.taskRows.get(a.id) ?? a.id, R = e.get(w) ?? 0;
      return {
        ...a,
        $y: R * J,
        $y_base: a.$y_base !== void 0 ? R * J : void 0
      };
    });
  }, [oe, i, o, y, J]), B = C(
    () => x.lengthUnitWidth,
    [x]
  ), ue = C(
    () => x.lengthUnit || "day",
    [x]
  ), D = re(!1), [f, z] = pe(void 0), [ne, he] = pe(null), ie = re(null), [de, ve] = pe(null), [Re, Ne] = pe(void 0), De = re(null), [Pe, Te] = pe(0), [te, p] = pe(null), H = re(null), [Q, K] = pe(null), [G, ke] = pe(null), [le, v] = pe(null), ee = re(null);
  ee.current = G;
  const ge = re(200), me = re(null), g = C(() => {
    const e = me.current;
    return !!(W.length && e && e.contains(document.activeElement));
  }, [W, me.current]), ce = C(() => g && W[W.length - 1]?.id, [g, W]);
  ae(() => {
    if (j && g && j) {
      const { id: e } = j, c = me.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [j]), ae(() => {
    const e = me.current;
    if (e && (Te(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((a) => {
        a[0] && Te(a[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [me.current]);
  const we = I(() => {
    document.body.style.userSelect = "none";
  }, []), Y = I(() => {
    document.body.style.userSelect = "";
  }, []), $e = I(
    (e, c, a) => {
      if (c.target.classList.contains("wx-line") || (a || (a = r.getTask(qe(e))), a.type === "milestone" || a.type === "summary")) return "";
      const w = Ye(c, "data-segment");
      w && (e = w);
      const { left: R, width: S } = e.getBoundingClientRect(), _ = (c.clientX - R) / S;
      let L = 0.2 / (S > 200 ? S / 200 : 1);
      return _ < L ? "start" : _ > 1 - L ? "end" : "";
    },
    [r]
  ), se = C(() => {
    const e = /* @__PURE__ */ new Set();
    if (b || !i || !o)
      return e;
    const c = /* @__PURE__ */ new Map();
    return y.forEach((a) => {
      if (a.type === "summary" || a.type === "milestone") return;
      const w = o.taskRows.get(a.id) ?? a.id;
      c.has(w) || c.set(w, []), c.get(w).push(a);
    }), c.forEach((a) => {
      if (!(a.length < 2))
        for (let w = 0; w < a.length; w++)
          for (let R = w + 1; R < a.length; R++) {
            const S = a[w], _ = a[R], L = S.$x, F = S.$x + S.$w, be = _.$x, Ee = _.$x + _.$w;
            Wn(L, F, be, Ee) && (e.add(S.id), e.add(_.id));
          }
    }), e;
  }, [b, i, o, y, m]), Me = C(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return y.forEach((w) => {
        e.set(w.id, w.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return y.forEach((w) => {
      const R = o.taskRows.get(w.id) ?? w.id;
      c.has(R) || (c.set(R, a.length), a.push(R));
    }), y.forEach((w) => {
      const R = o.taskRows.get(w.id) ?? w.id, S = c.get(R) ?? 0;
      e.set(w.id, S * J);
    }), e;
  }, [y, i, o, J]), Ce = C(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return y.forEach((w) => {
        e.set(w.id, w.$y), w.row !== void 0 && e.set(w.row, w.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), a = [];
    return y.forEach((w) => {
      const R = o.taskRows.get(w.id) ?? w.id;
      c.has(R) || (c.set(R, a.length), a.push(R));
    }), c.forEach((w, R) => {
      e.set(R, w * J);
    }), e;
  }, [y, i, o, J]), Se = I(
    (e) => {
      if (!me.current) return [];
      const a = Math.min(e.startX, e.currentX), w = Math.max(e.startX, e.currentX), R = Math.min(e.startY, e.currentY), S = Math.max(e.startY, e.currentY);
      return y.filter((_) => {
        const L = _.$x, F = _.$x + _.$w, Ee = Me.get(_.id) ?? _.$y, We = Ee + _.$h;
        return L < w && F > a && Ee < S && We > R;
      });
    },
    [y, Me]
  ), He = C(() => new Set(W.map((e) => e.id)), [W, A]), Ae = I(
    (e) => He.has(e),
    [He]
  ), l = I(
    (e, c) => {
      const { clientX: a } = c, w = qe(e), R = r.getTask(w), S = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (S.contains("wx-progress-marker")) {
          const { progress: _ } = r.getTask(w);
          ie.current = {
            id: w,
            x: a,
            progress: _,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const _ = $e(e, c, R) || "move", L = {
            id: w,
            mode: _,
            x: a,
            dx: 0,
            l: R.$x,
            w: R.$w
          };
          if (Z && R.segments?.length) {
            const F = Ye(c, "data-segment");
            F && (L.segmentIndex = F.dataset.segment * 1, gn(R, L));
          }
          he(L);
        }
        we();
      }
    },
    [r, n, $e, we, Z]
  ), k = I(
    (e) => {
      if (e.button !== 0 || le) return;
      const c = Ye(e);
      if (!c && N && !n) {
        const a = me.current;
        if (!a) return;
        const w = a.getBoundingClientRect(), R = e.clientX - w.left, S = e.clientY - w.top;
        if (h) {
          const L = _t(R, x);
          L && (ee.current = L, ke(L));
        }
        const _ = {
          startX: R,
          startY: S,
          currentX: R,
          currentY: S,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        p(_), H.current = _, we();
        return;
      }
      if (c) {
        if (N && !n && W.length > 1) {
          const a = qe(c);
          if (Ae(a)) {
            const w = e.target.classList;
            if (!w.contains("wx-link") && !w.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const R = r.getTask(a);
              if (!$e(c, e, R)) {
                const _ = /* @__PURE__ */ new Map();
                W.forEach((L) => {
                  const F = r.getTask(L.id);
                  if (F) {
                    if (M?.auto && F.type === "summary") return;
                    _.set(L.id, {
                      $x: F.$x,
                      $w: F.$w,
                      start: F.start,
                      end: F.end
                    });
                  }
                }), K({
                  baseTaskId: a,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: _
                }), we();
                return;
              }
            }
          }
        }
        l(c, e);
      }
    },
    [l, N, h, n, W, Ae, r, $e, M, we, x, le]
  ), E = I(
    (e) => {
      const c = Ye(e);
      c && (De.current = setTimeout(() => {
        Ne(!0), l(c, e.touches[0]);
      }, 300));
    },
    [l]
  ), O = I(
    (e) => {
      ve(e && { ...q.find((c) => c.id === e) });
    },
    [q]
  ), xe = I(() => {
    const e = H.current;
    if (e) {
      const c = Se(e);
      e.ctrlKey ? c.forEach((a) => {
        r.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (W.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), c.forEach((a, w) => {
        r.exec("select-task", {
          id: a.id,
          toggle: w > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), p(null), H.current = null, Y(), D.current = !0;
      return;
    }
    if (Q) {
      const { dx: c, originalPositions: a } = Q, w = Math.round(c / B);
      if (w !== 0) {
        let R = !0;
        a.forEach((S, _) => {
          const L = r.getTask(_);
          L && (r.exec("update-task", {
            id: _,
            diff: w,
            task: { start: L.start, end: L.end },
            skipUndo: !R
            // Only first task creates undo entry
          }), R = !1);
        }), D.current = !0;
      } else
        a.forEach((R, S) => {
          r.exec("drag-task", {
            id: S,
            left: R.$x,
            width: R.$w,
            inProgress: !1
          });
        });
      K(null), Y();
      return;
    }
    if (ie.current) {
      const { dx: c, id: a, marker: w, value: R } = ie.current;
      ie.current = null, typeof R < "u" && c && r.exec("update-task", {
        id: a,
        task: { progress: R },
        inProgress: !1
      }), w.classList.remove("wx-progress-in-drag"), D.current = !0, Y();
    } else if (ne) {
      const { id: c, mode: a, dx: w, l: R, w: S, start: _, segment: L, index: F } = ne;
      if (he(null), _) {
        const be = Math.round(w / B);
        if (!be)
          r.exec("drag-task", {
            id: c,
            width: S,
            left: R,
            inProgress: !1,
            ...L && { segmentIndex: F }
          });
        else {
          let Ee = {}, We = r.getTask(c);
          L && (We = We.segments[F]);
          const Ge = 1440 * 60 * 1e3, Le = be * (ue === "week" ? 7 : ue === "month" ? 30 : ue === "quarter" ? 91 : ue === "year" ? 365 : 1) * Ge;
          a === "move" ? (Ee.start = new Date(We.start.getTime() + Le), Ee.end = new Date(We.end.getTime() + Le)) : a === "start" ? (Ee.start = new Date(We.start.getTime() + Le), Ee.end = We.end) : a === "end" && (Ee.start = We.start, Ee.end = new Date(We.end.getTime() + Le)), r.exec("update-task", {
            id: c,
            task: Ee,
            ...L && { segmentIndex: F }
          });
        }
        D.current = !0;
      }
      Y();
    }
  }, [r, Y, ne, B, ue, te, Q, Se, W]), ye = I(
    (e, c) => {
      const { clientX: a, clientY: w } = c, R = me.current;
      if (R) {
        const S = R.getBoundingClientRect();
        ge.current = a - S.left;
      }
      if (le) {
        if (!R) return;
        const S = R.getBoundingClientRect(), _ = a - S.left;
        v((L) => ({ ...L, currentX: _ }));
        return;
      }
      if (!n) {
        if (te) {
          const S = me.current;
          if (!S) return;
          const _ = S.getBoundingClientRect(), L = a - _.left, F = w - _.top;
          p((be) => ({
            ...be,
            currentX: L,
            currentY: F
          })), H.current && (H.current.currentX = L, H.current.currentY = F);
          return;
        }
        if (Q) {
          const S = a - Q.startX;
          Q.originalPositions.forEach((_, L) => {
            const F = _.$x + S;
            r.exec("drag-task", {
              id: L,
              left: F,
              width: _.$w,
              inProgress: !0
            });
          }), K((_) => ({ ..._, dx: S }));
          return;
        }
        if (ie.current) {
          const { node: S, x: _, id: L } = ie.current, F = ie.current.dx = a - _, be = Math.round(F / S.offsetWidth * 100);
          let Ee = ie.current.progress + be;
          ie.current.value = Ee = Math.min(
            Math.max(0, Ee),
            100
          ), r.exec("update-task", {
            id: L,
            task: { progress: Ee },
            inProgress: !0
          });
        } else if (ne) {
          O(null);
          const { mode: S, l: _, w: L, x: F, id: be, start: Ee, segment: We, index: Ge } = ne, Ue = r.getTask(be), Le = a - F;
          if (!Ee && Math.abs(Le) < 20 || S === "start" && L - Le < B || S === "end" && L + Le < B || S === "move" && (Le < 0 && _ + Le < 0 || Le > 0 && _ + L + Le > Pe) || ne.segment && !mn(Ue, ne))
            return;
          const nt = { ...ne, dx: Le };
          let je, Qe;
          if (S === "start" ? (je = _ + Le, Qe = L - Le) : S === "end" ? (je = _, Qe = L + Le) : S === "move" && (je = _ + Le, Qe = L), r.exec("drag-task", {
            id: be,
            width: Qe,
            left: je,
            inProgress: !0,
            ...We && { segmentIndex: Ge }
          }), !nt.start && (S === "move" && Ue.$x == _ || S !== "move" && Ue.$w == L)) {
            D.current = !0, xe();
            return;
          }
          nt.start = !0, he(nt);
        } else {
          const S = Ye(e);
          if (S) {
            const _ = r.getTask(qe(S)), F = Ye(e, "data-segment") || S, be = $e(F, c, _);
            F.style.cursor = be && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      ne,
      B,
      Pe,
      $e,
      O,
      xe,
      te,
      Q,
      le
    ]
  ), Ie = I(
    (e) => {
      ye(e, e);
    },
    [ye]
  ), Oe = I(
    (e) => {
      Re ? (e.preventDefault(), ye(e, e.touches[0])) : De.current && (clearTimeout(De.current), De.current = null);
    },
    [Re, ye]
  ), lt = I(() => {
    xe();
  }, [xe]), Yt = I(() => {
    Ne(null), De.current && (clearTimeout(De.current), De.current = null), xe();
  }, [xe]);
  ae(() => (window.addEventListener("mouseup", lt), () => {
    window.removeEventListener("mouseup", lt);
  }), [lt]);
  const Xt = I(
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
  ), Kt = ["e2s", "s2s", "e2e", "s2e"], et = I((e, c) => Kt[(e ? 1 : 0) + (c ? 0 : 2)], []), tt = I(
    (e, c) => {
      const a = f.id, w = f.start;
      return e === a ? !0 : !!q.find((R) => R.target == e && R.source == a && R.type === et(w, c));
    },
    [f, V, et]
  ), ft = I(() => {
    f && z(null);
  }, [f]), ht = I((e, c, a) => {
    if (!c.length || !e || a == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: e.toISOString(),
      taskCount: c.length,
      parent: a
    });
    const w = 864e5, R = r.getHistory();
    R?.startBatch();
    const S = new Date(e), _ = S.getUTCDay(), L = _ === 0 ? -6 : 1 - _;
    S.setUTCDate(S.getUTCDate() + L), S.setUTCHours(0, 0, 0, 0), c.forEach((F, be) => {
      const Ee = `task-${Date.now()}-${be}`, We = Hn(S, F._startCellOffset || 0, x), Ge = new Date(We.getTime() + (F._startDayOfWeek || 0) * w);
      Ge.setUTCHours(0, 0, 0, 0);
      const Ue = new Date(Ge.getTime() + (F._durationDays || 7) * w);
      Ue.setUTCHours(0, 0, 0, 0), console.log("[paste] task:", {
        text: F.text,
        original: { start: F.start?.toISOString?.(), end: F.end?.toISOString?.() },
        calculated: {
          targetWeekStart: S.toISOString(),
          weekOffset: We.toISOString(),
          newStart: Ge.toISOString(),
          newEnd: Ue.toISOString()
        },
        clipboard: {
          _startCellOffset: F._startCellOffset,
          _startDayOfWeek: F._startDayOfWeek,
          _durationDays: F._durationDays
        },
        row: F.row
      }), r.exec("add-task", {
        task: {
          id: Ee,
          text: F.text,
          start: Ge,
          end: Ue,
          type: F.type || "task",
          parent: a,
          row: F.row
        },
        target: a,
        mode: "child",
        skipUndo: be > 0
      });
    }), R?.endBatch();
  }, [r, x]), Ft = I(
    (e) => {
      if (D.current) {
        D.current = !1;
        return;
      }
      if (le && le.currentX != null) {
        const a = _t(le.currentX, x);
        a && ht(a, le.tasks, le.parent), v(null);
        return;
      }
      const c = Ve(e.target);
      if (c) {
        const a = r.getTask(c), w = y.find((S) => S.id === c);
        console.log("[click] task:", a?.text, "id:", c), console.log("[click] api.getTask:", { start: a?.start, end: a?.end, duration: a?.duration }), console.log("[click] rendered:", { start: w?.start, end: w?.end, $w: w?.$w, $x: w?.$x });
        const R = e.target.classList;
        if (R.contains("wx-link")) {
          const S = R.contains("wx-left");
          if (!f) {
            z({ id: c, start: S });
            return;
          }
          f.id !== c && !tt(c, S) && r.exec("add-link", {
            link: {
              source: f.id,
              target: c,
              type: et(f.start, S)
            }
          });
        } else if (R.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: de.id }), ve(null);
        else {
          let S;
          const _ = Ye(e, "data-segment");
          _ && (S = _.dataset.segment * 1), r.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: S
          });
        }
      }
      ft();
    },
    [
      r,
      f,
      V,
      de,
      tt,
      et,
      ft,
      le,
      x,
      ht
    ]
  ), qt = I((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Vt = I((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Bt = I(
    (e) => {
      if (Re || De.current)
        return e.preventDefault(), !1;
    },
    [Re]
  ), gt = C(
    () => d.map((e) => e.id),
    [d]
  ), mt = I(
    (e) => {
      let c = gt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (c = `task ${c}`), c;
    },
    [gt]
  ), wt = I(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), ct = I(
    (e) => T && P.byId(e).$critical,
    [T, P]
  ), xt = I(
    (e) => {
      if (M?.auto) {
        const c = P.getSummaryId(e, !0), a = P.getSummaryId(f.id, !0);
        return f?.id && !(Array.isArray(c) ? c : [c]).includes(
          f.id
        ) && !(Array.isArray(a) ? a : [a]).includes(e);
      }
      return f;
    },
    [M, P, f]
  ), pt = I(() => {
    const e = r.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, a = e.map((L) => {
      const F = r.getTask(L.id);
      if (!F) return null;
      const be = y.find((Qt) => Qt.id === L.id);
      if (!be) return null;
      const { $x: Ee, $y: We, $h: Ge, $w: Ue, $skip: Le, $level: nt, $index: je, $y_base: Qe, $x_base: ts, $w_base: ns, $h_base: ss, $skip_baseline: rs, $critical: os, $reorder: is, ...jt } = be, kt = be.end && be.start ? Math.round((be.end.getTime() - be.start.getTime()) / c) : 0, bt = be.start ? (be.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: F.id,
        text: F.text,
        start: be.start?.toISOString?.(),
        end: be.end?.toISOString?.(),
        durationDays: kt,
        startDayOfWeek: bt,
        $w: Ue,
        $h: Ge,
        row: be.row,
        parent: be.parent
      }), { ...jt, _durationDays: kt, _startDayOfWeek: bt, _originalWidth: Ue, _originalHeight: Ge };
    }).filter(Boolean);
    if (!a.length) return;
    const R = a[0].parent, S = a.filter((L) => L.parent === R);
    if (S.length === 0) return;
    const _ = S.reduce((L, F) => F.start && (!L || F.start < L) ? F.start : L, null);
    Ze = S.map((L) => ({
      ...L,
      _startCellOffset: Pn(L.start, _, x)
    })), Lt = R, at = _, console.log("[copy] clipboard stored:", {
      taskCount: Ze.length,
      baseDate: _?.toISOString?.(),
      parent: R,
      tasks: Ze.map((L) => ({
        id: L.id,
        text: L.text,
        _startCellOffset: L._startCellOffset,
        _startDayOfWeek: L._startDayOfWeek,
        _durationDays: L._durationDays
      }))
    });
  }, [r, x]);
  ae(() => h ? r.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return pt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !Ze.length || !at || v({
        tasks: Ze,
        baseDate: at,
        parent: Lt,
        currentX: ge.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [h, r, pt]), ae(() => {
    if (!le) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), v(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [le]);
  const yt = C(() => {
    if (!te) return null;
    const e = Math.min(te.startX, te.currentX), c = Math.min(te.startY, te.currentY), a = Math.abs(te.currentX - te.startX), w = Math.abs(te.currentY - te.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${a}px`,
      height: `${w}px`
    };
  }, [te]);
  return /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${fe.length ? fe[0].$h : 0}px` },
      ref: me,
      onContextMenu: Bt,
      onMouseDown: k,
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
            selectedLink: de,
            readonly: n
          }
        ),
        fe.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = se.has(e.id), a = `wx-bar wx-${mt(e.type)}` + (Re && ne && e.id === ne.id ? " wx-touch" : "") + (f && f.id === e.id ? " wx-selected" : "") + (He.has(e.id) ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (Z && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), w = "wx-link wx-left" + (f ? " wx-visible" : "") + (!f || !tt(e.id, !0) && xt(e.id) ? " wx-target" : "") + (f && f.id === e.id && f.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : ""), R = "wx-link wx-right" + (f ? " wx-visible" : "") + (!f || !tt(e.id, !1) && xt(e.id) ? " wx-target" : "") + (f && f.id === e.id && !f.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ _e(Jt, { children: [
            !e.$skip && /* @__PURE__ */ _e(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: qt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: ce === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === de?.target && de?.type[2] === "s" ? /* @__PURE__ */ u(
                    Tt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ u("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA " + w, children: /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ _e(Je, { children: [
                    e.progress && !(Z && e.segments) ? /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(Z && e.segments) ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : Z && e.segments ? /* @__PURE__ */ u(_n, { task: e, type: mt(e.type) }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" }),
                    c && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ _e(Je, { children: [
                    /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ u(s, { data: e, api: r, onAction: wt }) : /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === de?.target && de?.type[2] === "e" ? /* @__PURE__ */ u(
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
        te && yt && /* @__PURE__ */ u("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: yt }),
        le && le.currentX != null && le.tasks.map((e, c) => {
          const w = (Math.floor(le.currentX / B) + (e._startCellOffset || 0)) * B, R = e._originalWidth || B, S = e._originalHeight || J, _ = Ce.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ u(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: w, top: _, width: R, height: S },
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
  const { highlightTime: n } = t, s = ze(Fe), i = U(s, "_scales");
  return /* @__PURE__ */ u("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((o, N) => /* @__PURE__ */ u(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((h, b) => {
        const r = n ? n(h.date, h.unit) : "", y = "wx-cell " + (h.css || "") + " " + (r || ""), m = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ u(
          "div",
          {
            className: "wx-ZkvhDKir " + y,
            style: { width: `${h.width}px` },
            ...m ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          b
        );
      })
    },
    N
  )) });
}
const zn = /* @__PURE__ */ new Map();
function Gn(t) {
  const n = re(null), s = re(0), i = re(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, ae(() => {
    if (o)
      return cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
        const N = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        zn.set(t, N), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: N })
        );
      }), () => cancelAnimationFrame(i.current);
  });
}
function Un(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: i,
    taskTemplate: o,
    cellBorders: N,
    highlightTime: h,
    multiTaskRows: b = !1,
    rowMapping: r = null,
    marqueeSelect: y = !1,
    copyPaste: m = !1,
    scrollToCurrentWeek: q = !1,
    currentWeekColor: V = null,
    allowTaskIntersection: $ = !0
  } = t, x = ze(Fe), [d, X] = st(x, "_selected"), W = U(x, "scrollTop"), A = U(x, "cellHeight"), j = U(x, "cellWidth"), T = U(x, "_scales"), P = U(x, "_markers"), M = U(x, "_scrollTask"), Z = U(x, "zoom"), oe = U(x, "_tasks"), [J, fe] = pe(), B = re(null), ue = re(0), D = re(!1), f = 1 + (T?.rows?.length || 0), z = C(() => {
    if (!b || !r || !oe?.length) return null;
    const p = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), Q = [];
    return oe.forEach((K) => {
      const G = r.taskRows.get(K.id) ?? K.id;
      H.has(G) || (H.set(G, Q.length), Q.push(G));
    }), oe.forEach((K) => {
      const G = r.taskRows.get(K.id) ?? K.id, ke = H.get(G) ?? 0;
      p.set(K.id, ke * A);
    }), p;
  }, [oe, b, r, A]), ne = C(() => {
    const p = [];
    return d && d.length && A && d.forEach((H) => {
      const Q = z?.get(H.id) ?? H.$y;
      p.push({ height: `${A}px`, top: `${Q - 3}px` });
    }), p;
  }, [X, A, z]), he = C(
    () => Math.max(J || 0, i),
    [J, i]
  );
  ae(() => {
    const p = B.current;
    p && typeof W == "number" && (p.scrollTop = W);
  }, [W]);
  const ie = () => {
    de();
  };
  function de(p) {
    const H = B.current;
    if (!H) return;
    const Q = {};
    Q.left = H.scrollLeft, x.exec("scroll-chart", Q);
  }
  function ve() {
    const p = B.current, Q = Math.ceil((J || 0) / (A || 1)) + 1, K = Math.floor((p && p.scrollTop || 0) / (A || 1)), G = Math.max(0, K - f), ke = K + Q + f, le = G * (A || 0);
    x.exec("render-data", {
      start: G,
      end: ke,
      from: le
    });
  }
  ae(() => {
    ve();
  }, [J, W]);
  const Re = I(
    (p) => {
      if (!p) return;
      const { id: H, mode: Q } = p;
      if (Q.toString().indexOf("x") < 0) return;
      const K = B.current;
      if (!K) return;
      const { clientWidth: G } = K, ke = x.getTask(H);
      if (ke.$x + ke.$w < K.scrollLeft)
        x.exec("scroll-chart", { left: ke.$x - (j || 0) }), K.scrollLeft = ke.$x - (j || 0);
      else if (ke.$x >= G + K.scrollLeft) {
        const le = G < ke.$w ? j || 0 : ke.$w;
        x.exec("scroll-chart", { left: ke.$x - G + le }), K.scrollLeft = ke.$x - G + le;
      }
    },
    [x, j]
  );
  ae(() => {
    Re(M);
  }, [M]);
  function Ne(p) {
    if (Z && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const H = B.current, Q = p.clientX - (H ? H.getBoundingClientRect().left : 0);
      if (ue.current += p.deltaY, Math.abs(ue.current) >= 150) {
        const G = -Math.sign(ue.current);
        ue.current = 0, x.exec("zoom-scale", {
          dir: G,
          offset: Q
        });
      }
    }
  }
  const De = I((p) => {
    const H = h(p.date, p.unit);
    return H ? {
      css: H,
      width: p.width
    } : null;
  }, [h]), Pe = C(() => {
    if (!T || !h || !["hour", "day", "week"].includes(T.minUnit)) return null;
    let H = 0;
    return T.rows[T.rows.length - 1].cells.map((Q) => {
      const K = De(Q), G = H;
      return H += Q.width, K ? { ...K, left: G } : null;
    });
  }, [T, h, De]), Te = I(
    (p) => {
      p.eventSource = "chart", x.exec("hotkey", p);
    },
    [x]
  );
  ae(() => {
    const p = B.current;
    if (!p) return;
    const H = () => fe(p.clientHeight);
    H();
    const Q = new ResizeObserver(() => H());
    return Q.observe(p), () => {
      Q.disconnect();
    };
  }, [B.current]);
  const te = re(null);
  return ae(() => {
    const p = B.current;
    if (p && !te.current)
      return te.current = zt(p, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (H) => Te(H)
      }), () => {
        te.current?.destroy(), te.current = null;
      };
  }, []), ae(() => {
    const p = B.current;
    if (!p) return;
    const H = Ne;
    return p.addEventListener("wheel", H), () => {
      p.removeEventListener("wheel", H);
    };
  }, [Ne]), ae(() => {
    if (!q || D.current || !T || !B.current || !J) return;
    const p = B.current, { clientWidth: H } = p, Q = /* @__PURE__ */ new Date(), K = T.rows[T.rows.length - 1]?.cells;
    if (!K) return;
    let G = -1, ke = 0;
    const le = [];
    for (let ee = 0; ee < K.length; ee++) {
      const ge = K[ee];
      le.push({ left: ke, width: ge.width });
      const me = ge.date;
      if (ge.unit === "week") {
        const g = new Date(me);
        g.setUTCDate(g.getUTCDate() + 7), Q >= me && Q < g && (G = ee);
      } else ge.unit === "day" && Q.getUTCFullYear() === me.getUTCFullYear() && Q.getUTCMonth() === me.getUTCMonth() && Q.getUTCDate() === me.getUTCDate() && (G = ee);
      ke += ge.width;
    }
    let v = G;
    if (G > 0 && (v = G - 1), v >= 0 && le[v]) {
      const ee = le[v], ge = Math.max(0, ee.left);
      p.scrollLeft = ge, x.exec("scroll-chart", { left: ge }), D.current = !0;
    }
  }, [q, T, J, x]), Gn("chart"), /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: B,
      onScroll: ie,
      children: [
        /* @__PURE__ */ u(On, { highlightTime: h, scales: T }),
        P && P.length ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${he}px` },
            children: P.map((p, H) => /* @__PURE__ */ u(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${p.css || ""}`,
                style: { left: `${p.left}px` },
                children: /* @__PURE__ */ u("div", { className: "wx-mR7v2Xag wx-content", children: p.text })
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
                    (p, H) => p ? /* @__PURE__ */ u(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + p.css,
                        style: {
                          width: `${p.width}px`,
                          left: `${p.left}px`
                        }
                      },
                      H
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ u(Nn, { borders: N }),
              d && d.length ? d.map(
                (p, H) => p.$y ? /* @__PURE__ */ u(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": p.id,
                    style: ne[H]
                  },
                  p.id
                ) : null
              ) : null,
              /* @__PURE__ */ u(
                An,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: b,
                  rowMapping: r,
                  marqueeSelect: y,
                  copyPaste: m,
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
function Yn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: i = "x",
    onMove: o,
    onDisplayChange: N,
    compactMode: h,
    containerWidth: b = 0,
    leftThreshold: r = 50,
    rightThreshold: y = 50
  } = t, [m, q] = ut(t.value ?? 0), [V, $] = ut(t.display ?? "all");
  function x(ie) {
    let de = 0;
    n == "center" ? de = s / 2 : n == "before" && (de = s);
    const ve = {
      size: [s + "px", "auto"],
      p: [ie - de + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let Re in ve) ve[Re] = ve[Re].reverse();
    return ve;
  }
  const [d, X] = pe(!1), [W, A] = pe(null), j = re(0), T = re(), P = re(), M = re(V);
  ae(() => {
    M.current = V;
  }, [V]), ae(() => {
    W === null && m > 0 && A(m);
  }, [W, m]);
  function Z(ie) {
    return i == "x" ? ie.clientX : ie.clientY;
  }
  const oe = I(
    (ie) => {
      const de = T.current + Z(ie) - j.current;
      q(de);
      let ve;
      de <= r ? ve = "chart" : b - de <= y ? ve = "grid" : ve = "all", M.current !== ve && ($(ve), M.current = ve), P.current && clearTimeout(P.current), P.current = setTimeout(() => o && o(de), 100);
    },
    [b, r, y, o]
  ), J = I(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", X(!1), window.removeEventListener("mousemove", oe), window.removeEventListener("mouseup", J);
  }, [oe]), fe = C(
    () => V !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [V, i]
  ), B = I(
    (ie) => {
      !h && (V === "grid" || V === "chart") || (j.current = Z(ie), T.current = m, X(!0), document.body.style.cursor = fe, document.body.style.userSelect = "none", window.addEventListener("mousemove", oe), window.addEventListener("mouseup", J));
    },
    [fe, oe, J, m, h, V]
  );
  function ue() {
    $("all"), W !== null && (q(W), o && o(W));
  }
  function D(ie) {
    if (h) {
      const de = V === "chart" ? "grid" : "chart";
      $(de), N(de);
    } else if (V === "grid" || V === "chart")
      ue(), N("all");
    else {
      const de = ie === "left" ? "chart" : "grid";
      $(de), N(de);
    }
  }
  function f() {
    D("left");
  }
  function z() {
    D("right");
  }
  const ne = C(() => x(m), [m, n, s, i]), he = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${V}`,
    d ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: B,
      style: { width: ne.size[0], height: ne.size[1], cursor: fe },
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
      for (let N of o)
        if (N.target === document.body) {
          let h = N.contentRect.width <= Xn;
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
function Kn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: i,
    highlightTime: o,
    onTableAPIChange: N,
    multiTaskRows: h = !1,
    rowMapping: b = null,
    marqueeSelect: r = !1,
    copyPaste: y = !1,
    scrollToCurrentWeek: m = !1,
    currentWeekColor: q = null,
    allowTaskIntersection: V = !0
  } = t, $ = ze(Fe), x = U($, "_tasks"), d = U($, "_scales"), X = U($, "cellHeight"), W = U($, "columns"), A = U($, "_scrollTask"), j = U($, "undo"), T = C(() => {
    if (!h) return b;
    const v = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map();
    return x.forEach((ge) => {
      const me = ge.row ?? ge.id;
      ee.set(ge.id, me), v.has(me) || v.set(me, []), v.get(me).push(ge.id);
    }), { rowMap: v, taskRows: ee };
  }, [x, h, b]), [P, M] = pe(!1);
  let [Z, oe] = pe(0);
  const [J, fe] = pe(0), [B, ue] = pe(0), [D, f] = pe(void 0), [z, ne] = pe("all"), he = re(null), ie = I(
    (v) => {
      M((ee) => (v !== ee && (v ? (he.current = z, z === "all" && ne("grid")) : (!he.current || he.current === "all") && ne("all")), v));
    },
    [z]
  );
  ae(() => {
    const v = Gt(ie);
    return v.observe(), () => {
      v.disconnect();
    };
  }, [ie]);
  const de = C(() => {
    let v;
    return W.every((ee) => ee.width && !ee.flexgrow) ? v = W.reduce((ee, ge) => ee + parseInt(ge.width), 0) : P && z === "chart" ? v = parseInt(W.find((ee) => ee.id === "action")?.width) || 50 : v = 440, Z = v, v;
  }, [W, P, z]);
  ae(() => {
    oe(de);
  }, [de]);
  const ve = C(
    () => (J ?? 0) - (D ?? 0),
    [J, D]
  ), Re = C(() => d.width, [d]), Ne = C(() => {
    if (!h || !T)
      return x.length * X;
    const v = /* @__PURE__ */ new Set();
    return x.forEach((ee) => {
      const ge = T.taskRows.get(ee.id) ?? ee.id;
      v.add(ge);
    }), v.size * X;
  }, [x, X, h, T]), De = C(
    () => d.height + Ne + ve,
    [d, Ne, ve]
  ), Pe = C(
    () => Z + Re,
    [Z, Re]
  ), Te = re(null), te = I(() => {
    Promise.resolve().then(() => {
      if ((J ?? 0) > (Pe ?? 0)) {
        const v = (J ?? 0) - Z;
        $.exec("expand-scale", { minWidth: v });
      }
    });
  }, [J, Pe, Z, $]);
  ae(() => {
    let v;
    return Te.current && (v = new ResizeObserver(te), v.observe(Te.current)), () => {
      v && v.disconnect();
    };
  }, [Te.current, te]), ae(() => {
    te();
  }, [Re]);
  const p = re(null), H = re(null), Q = I(() => {
    const v = p.current;
    v && $.exec("scroll-chart", {
      top: v.scrollTop
    });
  }, [$]), K = re({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  ae(() => {
    K.current = {
      rTasks: x,
      rScales: d,
      rCellHeight: X,
      scrollSize: ve,
      ganttDiv: p.current,
      ganttHeight: B ?? 0
    };
  }, [x, d, X, ve, B]);
  const G = I(
    (v) => {
      if (!v) return;
      const {
        rTasks: ee,
        rScales: ge,
        rCellHeight: me,
        scrollSize: g,
        ganttDiv: ce,
        ganttHeight: we
      } = K.current;
      if (!ce) return;
      const { id: Y } = v, $e = ee.findIndex((se) => se.id === Y);
      if ($e > -1) {
        const se = we - ge.height, Me = $e * me, Ce = ce.scrollTop;
        let Se = null;
        Me < Ce ? Se = Me : Me + me > Ce + se && (Se = Me - se + me + g), Se !== null && ($.exec("scroll-chart", { top: Math.max(Se, 0) }), p.current.scrollTop = Math.max(Se, 0));
      }
    },
    [$]
  );
  ae(() => {
    G(A);
  }, [A]), ae(() => {
    const v = p.current, ee = H.current;
    if (!v || !ee) return;
    const ge = () => {
      $n(() => {
        ue(v.offsetHeight), fe(v.offsetWidth), f(ee.offsetWidth);
      });
    }, me = new ResizeObserver(ge);
    return me.observe(v), () => me.disconnect();
  }, [p.current]);
  const ke = re(null), le = re(null);
  return ae(() => {
    le.current && (le.current.destroy(), le.current = null);
    const v = ke.current;
    if (v)
      return le.current = zt(v, {
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
          "ctrl+z": j,
          "ctrl+y": j,
          "meta+z": j,
          "meta+shift+z": j
        },
        exec: (ee) => {
          if (ee.isInput) return;
          const ge = ee.key;
          if (ge === "ctrl+z" || ge === "meta+z") {
            $.exec("undo", {});
            return;
          }
          if (ge === "ctrl+y" || ge === "meta+shift+z") {
            $.exec("redo", {});
            return;
          }
          $.exec("hotkey", ee);
        }
      }), () => {
        le.current?.destroy(), le.current = null;
      };
  }, [j]), /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-gantt", ref: p, onScroll: Q, children: /* @__PURE__ */ u(
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
            height: B,
            width: D
          },
          children: /* @__PURE__ */ _e("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ke, children: [
            W.length ? /* @__PURE__ */ _e(Je, { children: [
              /* @__PURE__ */ u(
                In,
                {
                  display: z,
                  compactMode: P,
                  columnWidth: de,
                  width: Z,
                  readonly: s,
                  fullHeight: Ne,
                  onTableAPIChange: N,
                  multiTaskRows: h,
                  rowMapping: T
                }
              ),
              /* @__PURE__ */ u(
                Yn,
                {
                  value: Z,
                  display: z,
                  compactMode: P,
                  containerWidth: J,
                  onMove: (v) => oe(v),
                  onDisplayChange: (v) => ne(v)
                }
              )
            ] }) : null,
            /* @__PURE__ */ u("div", { className: "wx-jlbQoHOz wx-content", ref: Te, children: /* @__PURE__ */ u(
              Un,
              {
                readonly: s,
                fullWidth: Re,
                fullHeight: Ne,
                taskTemplate: n,
                cellBorders: i,
                highlightTime: o,
                multiTaskRows: h,
                rowMapping: T,
                marqueeSelect: r,
                copyPaste: y,
                scrollToCurrentWeek: m,
                currentWeekColor: q,
                allowTaskIntersection: V
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
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: qn(s, n)
  }));
}
function Vn(t, n) {
  const s = Fn(n);
  for (let i in s)
    s[i] = rt(s[i], t);
  return s;
}
function Bn(t, n) {
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
  taskTypes: i = kn,
  tasks: o = [],
  selected: N = [],
  activeTask: h = null,
  links: b = [],
  scales: r = Zn,
  columns: y = yn,
  start: m = null,
  end: q = null,
  lengthUnit: V = "day",
  durationUnit: $ = "day",
  cellWidth: x = 100,
  cellHeight: d = 38,
  scaleHeight: X = 36,
  readonly: W = !1,
  cellBorders: A = "full",
  zoom: j = !1,
  baselines: T = !1,
  highlightTime: P = null,
  init: M = null,
  autoScale: Z = !0,
  unscheduledTasks: oe = !1,
  criticalPath: J = null,
  schedule: fe = { type: "forward" },
  projectStart: B = null,
  projectEnd: ue = null,
  calendar: D = null,
  undo: f = !1,
  splitTasks: z = !1,
  multiTaskRows: ne = !1,
  marqueeSelect: he = !1,
  copyPaste: ie = !1,
  currentWeekHighlight: de = !1,
  currentWeekColor: ve = null,
  scrollToCurrentWeek: Re = !1,
  allowTaskIntersection: Ne = !0,
  ...De
}, Pe) {
  const Te = re();
  Te.current = De;
  const te = C(() => new wn(Tn), []), p = C(() => ({ ...dt, ...it }), []), H = ze(Xe.i18n), Q = C(() => H ? H.extend(p, !0) : ot(p), [H, p]), K = C(() => Q.getRaw().calendar, [Q]), G = C(() => {
    let se = {
      zoom: jn(j, K),
      scales: Ut(r, K),
      columns: Bn(y, K),
      links: xn(b),
      cellWidth: x
    };
    return se.zoom && (se = {
      ...se,
      ...pn(
        se.zoom,
        Vn(K, Q.getGroup("gantt")),
        se.scales,
        x
      )
    }), se;
  }, [j, r, y, b, x, K, Q]), ke = re(null);
  ke.current !== o && (Mt(o, { durationUnit: $, splitTasks: z, calendar: D }), ke.current = o), ae(() => {
    Mt(o, { durationUnit: $, splitTasks: z, calendar: D });
  }, [o, $, D, z]);
  const le = C(() => {
    if (!ne) return null;
    const se = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Ce = (Se) => {
      Se.forEach((He) => {
        const Ae = He.row ?? He.id;
        Me.set(He.id, Ae), se.has(Ae) || se.set(Ae, []), se.get(Ae).push(He.id), He.data && He.data.length > 0 && Ce(He.data);
      });
    };
    return Ce(o), { rowMap: se, taskRows: Me };
  }, [o, ne]), v = C(() => te.in, [te]), ee = re(null);
  ee.current === null && (ee.current = new fn((se, Me) => {
    const Ce = "on" + Qn(se);
    Te.current && Te.current[Ce] && Te.current[Ce](Me);
  }), v.setNext(ee.current));
  const [ge, me] = pe(null), g = re(null);
  g.current = ge;
  const ce = C(
    () => ({
      getState: te.getState.bind(te),
      getReactiveState: te.getReactive.bind(te),
      getStores: () => ({ data: te }),
      exec: v.exec,
      setNext: (se) => (ee.current = ee.current.setNext(se), ee.current),
      intercept: v.intercept.bind(v),
      on: v.on.bind(v),
      detach: v.detach.bind(v),
      getTask: te.getTask.bind(te),
      serialize: te.serialize.bind(te),
      getTable: (se) => se ? new Promise((Me) => setTimeout(() => Me(g.current), 1)) : g.current,
      getHistory: () => te.getHistory()
    }),
    [te, v]
  );
  Ht(
    Pe,
    () => ({
      ...ce
    }),
    [ce]
  );
  const we = re(0);
  ae(() => {
    we.current ? te.init({
      tasks: o,
      links: G.links,
      start: m,
      columns: G.columns,
      end: q,
      lengthUnit: V,
      cellWidth: G.cellWidth,
      cellHeight: d,
      scaleHeight: X,
      scales: G.scales,
      taskTypes: i,
      zoom: G.zoom,
      selected: N,
      activeTask: h,
      baselines: T,
      autoScale: Z,
      unscheduledTasks: oe,
      markers: s,
      durationUnit: $,
      criticalPath: J,
      schedule: fe,
      projectStart: B,
      projectEnd: ue,
      calendar: D,
      undo: f,
      _weekStart: K.weekStart,
      splitTasks: z
    }) : M && M(ce), we.current++;
  }, [
    ce,
    M,
    o,
    G,
    m,
    q,
    V,
    d,
    X,
    i,
    N,
    h,
    T,
    Z,
    oe,
    s,
    $,
    J,
    fe,
    B,
    ue,
    D,
    f,
    K,
    z,
    te
  ]), we.current === 0 && te.init({
    tasks: o,
    links: G.links,
    start: m,
    columns: G.columns,
    end: q,
    lengthUnit: V,
    cellWidth: G.cellWidth,
    cellHeight: d,
    scaleHeight: X,
    scales: G.scales,
    taskTypes: i,
    zoom: G.zoom,
    selected: N,
    activeTask: h,
    baselines: T,
    autoScale: Z,
    unscheduledTasks: oe,
    markers: s,
    durationUnit: $,
    criticalPath: J,
    schedule: fe,
    projectStart: B,
    projectEnd: ue,
    calendar: D,
    undo: f,
    _weekStart: K.weekStart,
    splitTasks: z
  });
  const Y = C(() => {
    const se = /* @__PURE__ */ new Date(), Me = K?.weekStart ?? 0, Ce = new Date(Date.UTC(se.getUTCFullYear(), se.getUTCMonth(), se.getUTCDate())), He = (Ce.getUTCDay() - Me + 7) % 7;
    Ce.setUTCDate(Ce.getUTCDate() - He), Ce.setUTCHours(0, 0, 0, 0);
    const Ae = new Date(Ce);
    return Ae.setUTCDate(Ae.getUTCDate() + 7), (l) => l >= Ce && l < Ae;
  }, [K]), $e = C(() => (se, Me) => {
    let Ce = [];
    if (D)
      Me == "day" && !D.getDayHours(se) && Ce.push("wx-weekend"), Me == "hour" && !D.getDayHours(se) && Ce.push("wx-weekend");
    else if (P) {
      const Se = P(se, Me);
      Se && Ce.push(Se);
    }
    return de && (Me === "week" || Me === "day") && Y(se) && Ce.push("wx-current-week"), Ce.join(" ");
  }, [D, P, de, Y]);
  return /* @__PURE__ */ u(Xe.i18n.Provider, { value: Q, children: /* @__PURE__ */ u(Fe.Provider, { value: ce, children: /* @__PURE__ */ u(
    Kn,
    {
      taskTemplate: n,
      readonly: W,
      cellBorders: A,
      highlightTime: $e,
      onTableAPIChange: me,
      multiTaskRows: ne,
      rowMapping: le,
      marqueeSelect: he,
      copyPaste: ie,
      scrollToCurrentWeek: Re,
      currentWeekColor: ve,
      allowTaskIntersection: Ne
    }
  ) }) });
});
function vs({ api: t = null, items: n = [] }) {
  const s = ze(Xe.i18n), i = C(() => s || ot(it), [s]), o = C(() => i.getGroup("gantt"), [i]), N = Ke(t, "_selected"), h = Ke(t, "undo"), b = Ke(t, "history"), r = Ke(t, "splitTasks"), y = ["undo", "redo"], m = C(() => {
    const V = Dt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : Dt({
      undo: h,
      splitTasks: r
    })).map((x) => {
      let d = { ...x, disabled: !1 };
      return d.handler = At(V, d.id) ? (X) => Ot(t, X.id, null, o) : d.handler, d.text && (d.text = o(d.text)), d.menuText && (d.menuText = o(d.menuText)), d;
    });
  }, [n, t, o, h, r]), q = C(() => {
    const V = [];
    return m.forEach(($) => {
      const x = $.id;
      if (x === "add-task")
        V.push($);
      else if (y.includes(x))
        y.includes(x) && V.push({
          ...$,
          disabled: $.isDisabled(b)
        });
      else {
        if (!N?.length || !t) return;
        V.push({
          ...$,
          disabled: $.isDisabled && N.some((d) => $.isDisabled(d, t.getState()))
        });
      }
    }), V.filter(($, x) => {
      if (t && $.isHidden)
        return !N.some((d) => $.isHidden(d, t.getState()));
      if ($.comp === "separator") {
        const d = V[x + 1];
        if (!d || d.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, N, b, m]);
  return s ? /* @__PURE__ */ u(Rt, { items: q }) : /* @__PURE__ */ u(Xe.i18n.Provider, { value: i, children: /* @__PURE__ */ u(Rt, { items: q }) });
}
const Cs = Pt(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: o = null,
  at: N = "point",
  children: h,
  onClick: b,
  css: r
}, y) {
  const m = re(null), q = re(null), V = ze(Xe.i18n), $ = C(() => V || ot({ ...it, ...dt }), [V]), x = C(() => $.getGroup("gantt"), [$]), d = Ke(s, "taskTypes"), X = Ke(s, "selected"), W = Ke(s, "_selected"), A = Ke(s, "splitTasks"), j = C(() => St({ splitTasks: !0 }), []);
  ae(() => {
    s && (s.on("scroll-chart", () => {
      m.current && m.current.show && m.current.show();
    }), s.on("drag-task", () => {
      m.current && m.current.show && m.current.show();
    }));
  }, [s]);
  function T(D) {
    return D.map((f) => (f = { ...f }, f.text && (f.text = x(f.text)), f.subtext && (f.subtext = x(f.subtext)), f.data && (f.data = T(f.data)), f));
  }
  function P() {
    const D = n.length ? n : St({ splitTasks: A }), f = D.find((z) => z.id === "convert-task");
    return f && (f.data = [], (d || []).forEach((z) => {
      f.data.push(f.dataFactory(z));
    })), T(D);
  }
  const M = C(() => P(), [s, n, d, A, x]), Z = C(
    () => W && W.length ? W : [],
    [W]
  ), oe = I(
    (D, f) => {
      let z = D ? s?.getTask(D) : null;
      if (i) {
        const ne = i(D, f);
        z = ne === !0 ? z : ne;
      }
      if (z) {
        const ne = Ve(f.target, "data-segment");
        ne !== null ? q.current = { id: z.id, segmentIndex: ne } : q.current = z.id, (!Array.isArray(X) || !X.includes(z.id)) && s && s.exec && s.exec("select-task", { id: z.id });
      }
      return z;
    },
    [s, i, X]
  ), J = I(
    (D) => {
      const f = D.action;
      f && (At(j, f.id) && Ot(s, f.id, q.current, x), b && b(D));
    },
    [s, x, b, j]
  ), fe = I(
    (D, f) => {
      const z = Z.length ? Z : f ? [f] : [];
      let ne = o ? z.every((he) => o(D, he)) : !0;
      if (ne && (D.isHidden && (ne = !z.some(
        (he) => D.isHidden(he, s.getState(), q.current)
      )), D.isDisabled)) {
        const he = z.some(
          (ie) => D.isDisabled(ie, s.getState(), q.current)
        );
        D.disabled = he;
      }
      return ne;
    },
    [o, Z, s]
  );
  Ht(y, () => ({
    show: (D, f) => {
      m.current && m.current.show && m.current.show(D, f);
    }
  }));
  const B = I((D) => {
    m.current && m.current.show && m.current.show(D);
  }, []), ue = /* @__PURE__ */ _e(Je, { children: [
    /* @__PURE__ */ u(
      Mn,
      {
        filter: fe,
        options: M,
        dataKey: "id",
        resolver: oe,
        onClick: J,
        at: N,
        ref: m,
        css: r
      }
    ),
    /* @__PURE__ */ u("span", { onContextMenu: B, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!V && Xe.i18n?.Provider) {
    const D = Xe.i18n.Provider;
    return /* @__PURE__ */ u(D, { value: $, children: ue });
  }
  return ue;
});
function Jn({ api: t, autoSave: n, onLinksChange: s }) {
  const o = ze(Xe.i18n).getGroup("gantt"), N = U(t, "activeTask"), h = U(t, "_activeTask"), b = U(t, "_links"), r = U(t, "schedule"), y = U(t, "unscheduledTasks"), [m, q] = pe();
  function V() {
    if (N) {
      const X = b.filter((A) => A.target == N).map((A) => ({ link: A, task: t.getTask(A.source) })), W = b.filter((A) => A.source == N).map((A) => ({ link: A, task: t.getTask(A.target) }));
      return [
        { title: o("Predecessors"), data: X },
        { title: o("Successors"), data: W }
      ];
    }
  }
  ae(() => {
    q(V());
  }, [N, b]);
  const $ = C(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function x(X) {
    n ? t.exec("delete-link", { id: X }) : (q(
      (W) => (W || []).map((A) => ({
        ...A,
        data: A.data.filter((j) => j.link.id !== X)
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
    }) : (q(
      (A) => (A || []).map((j) => ({
        ...j,
        data: j.data.map(
          (T) => T.link.id === X ? { ...T, link: { ...T.link, ...W } } : T
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
  return /* @__PURE__ */ u(Je, { children: (m || []).map(
    (X, W) => X.data.length ? /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ u(en, { label: X.title, position: "top", children: /* @__PURE__ */ u("table", { children: /* @__PURE__ */ u("tbody", { children: X.data.map((A) => /* @__PURE__ */ _e("tr", { children: [
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-task-name", children: A.task.text || "" }) }),
      r?.auto && A.link.type === "e2s" ? /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ u(
        tn,
        {
          type: "number",
          placeholder: o("Lag"),
          value: A.link.lag,
          disabled: y && h?.unscheduled,
          onChange: (j) => {
            j.input || d(A.link.id, { lag: j.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ u(
        nn,
        {
          value: A.link.type,
          placeholder: o("Select link type"),
          options: $,
          onChange: (j) => d(A.link.id, { type: j.value }),
          children: ({ option: j }) => j.label
        }
      ) }) }),
      /* @__PURE__ */ u("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ u(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => x(A.link.id),
          role: "button"
        }
      ) })
    ] }, A.link.id)) }) }) }) }, W) : null
  ) });
}
function es(t) {
  const { value: n, time: s, format: i, onchange: o, onChange: N, ...h } = t, b = N ?? o;
  function r(y) {
    const m = new Date(y.value);
    m.setUTCHours(n.getUTCHours()), m.setUTCMinutes(n.getUTCMinutes()), b && b({ value: m });
  }
  return /* @__PURE__ */ _e("div", { className: "wx-hFsbgDln date-time-controll", children: [
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
    s ? /* @__PURE__ */ u(rn, { value: n, onChange: b, format: i }) : null
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
  layout: i = "default",
  readonly: o = !1,
  placement: N = "sidebar",
  bottomBar: h = !0,
  topBar: b = !0,
  autoSave: r = !0,
  focus: y = !1,
  hotkeys: m = {}
}) {
  const q = ze(Xe.i18n), V = C(() => q || ot({ ...it, ...dt }), [q]), $ = C(() => V.getGroup("gantt"), [V]), x = V.getRaw(), d = C(() => {
    const g = x.gantt?.dateFormat || x.formats?.dateFormat;
    return rt(g, x.calendar);
  }, [x]), X = C(() => {
    if (b === !0 && !o) {
      const g = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: $("Delete"),
          id: "delete"
        }
      ];
      return r ? { items: g } : {
        items: [
          ...g,
          {
            comp: "button",
            type: "primary",
            text: $("Save"),
            id: "save"
          }
        ]
      };
    }
    return b;
  }, [b, o, r, $]), [W, A] = pe(!1), j = C(
    () => W ? "wx-full-screen" : "",
    [W]
  ), T = I((g) => {
    A(g);
  }, []);
  ae(() => {
    const g = Gt(T);
    return g.observe(), () => {
      g.disconnect();
    };
  }, [T]);
  const P = U(t, "_activeTask"), M = U(t, "activeTask"), Z = U(t, "unscheduledTasks"), oe = U(t, "links"), J = U(t, "splitTasks"), fe = C(
    () => J && M?.segmentIndex,
    [J, M]
  ), B = C(
    () => fe || fe === 0,
    [fe]
  ), ue = C(
    () => bn({ unscheduledTasks: Z }),
    [Z]
  ), D = U(t, "undo"), [f, z] = pe({}), [ne, he] = pe(null), [ie, de] = pe(), [ve, Re] = pe(null), Ne = U(t, "taskTypes"), De = C(() => {
    if (!P) return null;
    let g;
    if (B && P.segments ? g = { ...P.segments[fe] } : g = { ...P }, o) {
      let ce = { parent: g.parent };
      return ue.forEach(({ key: we, comp: Y }) => {
        if (Y !== "links") {
          const $e = g[we];
          Y === "date" && $e instanceof Date ? ce[we] = d($e) : Y === "slider" && we === "progress" ? ce[we] = `${$e}%` : ce[we] = $e;
        }
      }), ce;
    }
    return g || null;
  }, [P, B, fe, o, ue, d]);
  ae(() => {
    de(De);
  }, [De]), ae(() => {
    z({}), Re(null), he(null);
  }, [M]);
  function Pe(g, ce) {
    return g.map((we) => {
      const Y = { ...we };
      if (we.config && (Y.config = { ...Y.config }), Y.comp === "links" && t && (Y.api = t, Y.autoSave = r, Y.onLinksChange = p), Y.comp === "select" && Y.key === "type") {
        const $e = Y.options ?? (Ne || []);
        Y.options = $e.map((se) => ({
          ...se,
          label: $(se.label)
        }));
      }
      return Y.comp === "slider" && Y.key === "progress" && (Y.labelTemplate = ($e) => `${$(Y.label)} ${$e}%`), Y.label && (Y.label = $(Y.label)), Y.config?.placeholder && (Y.config.placeholder = $(Y.config.placeholder)), ce && (Y.isDisabled && Y.isDisabled(ce, t.getState()) ? Y.disabled = !0 : delete Y.disabled), Y;
    });
  }
  const Te = C(() => {
    let g = n.length ? n : ue;
    return g = Pe(g, ie), ie ? g.filter(
      (ce) => !ce.isHidden || !ce.isHidden(ie, t.getState())
    ) : g;
  }, [n, ue, ie, Ne, $, t, r]), te = C(
    () => Te.map((g) => g.key),
    [Te]
  );
  function p({ id: g, action: ce, data: we }) {
    z((Y) => ({
      ...Y,
      [g]: { action: ce, data: we }
    }));
  }
  const H = I(() => {
    for (let g in f)
      if (oe.byId(g)) {
        const { action: ce, data: we } = f[g];
        t.exec(ce, we);
      }
  }, [t, f, oe]), Q = I(() => {
    const g = M?.id || M;
    if (B) {
      if (P?.segments) {
        const ce = P.segments.filter(
          (we, Y) => Y !== fe
        );
        t.exec("update-task", {
          id: g,
          task: { segments: ce }
        });
      }
    } else
      t.exec("delete-task", { id: g });
  }, [t, M, B, P, fe]), K = I(() => {
    t.exec("show-editor", { id: null });
  }, [t]), G = I(
    (g) => {
      const { item: ce, changes: we } = g;
      ce.id === "delete" && Q(), ce.id === "save" && (we.length ? K() : H()), ce.comp && K();
    },
    [t, M, r, H, Q, K]
  ), ke = I(
    (g, ce, we) => (Z && g.type === "summary" && (g.unscheduled = !1), Wt(g, t.getState(), ce), we || he(!1), g),
    [Z, t]
  ), le = I(
    (g) => {
      g = {
        ...g,
        unscheduled: Z && g.unscheduled && g.type !== "summary"
      }, delete g.links, delete g.data, (te.indexOf("duration") === -1 || g.segments && !g.duration) && delete g.duration;
      const ce = {
        id: M?.id || M,
        task: g,
        ...B && { segmentIndex: fe }
      };
      r && ne && (ce.inProgress = ne), t.exec("update-task", ce), r || H();
    },
    [
      t,
      M,
      Z,
      r,
      H,
      te,
      B,
      fe,
      ne
    ]
  ), v = I(
    (g) => {
      let { update: ce, key: we, input: Y } = g;
      if (Y && he(!0), g.update = ke({ ...ce }, we, Y), !r) de(g.update);
      else if (!ve && !Y) {
        const $e = Te.find((Ce) => Ce.key === we), se = ce[we];
        (!$e.validation || $e.validation(se)) && (!$e.required || se) && le(g.update);
      }
    },
    [r, ke, ve, Te, le]
  ), ee = I(
    (g) => {
      r || le(g.values);
    },
    [r, le]
  ), ge = I((g) => {
    Re(g.errors);
  }, []), me = C(
    () => D ? {
      "ctrl+z": (g) => {
        g.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (g) => {
        g.preventDefault(), t.exec("redo");
      }
    } : {},
    [D, t]
  );
  return De ? /* @__PURE__ */ u(on, { children: /* @__PURE__ */ u(
    Dn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${j} ${s}`,
      items: Te,
      values: De,
      topBar: X,
      bottomBar: h,
      placement: N,
      layout: i,
      readonly: o,
      autoSave: r,
      focus: y,
      onAction: G,
      onSave: ee,
      onValidation: ge,
      onChange: v,
      hotkeys: m && { ...me, ...m }
    }
  ) }) : null;
}
const Ms = ({ children: t, columns: n = null, api: s }) => {
  const [i, o] = pe(null);
  return ae(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ u(Cn, { api: i, columns: n, children: t });
};
function Ds(t) {
  const { api: n, content: s, children: i } = t, o = re(null), N = re(null), [h, b] = pe({}), [r, y] = pe(null), [m, q] = pe({});
  function V(T) {
    for (; T; ) {
      if (T.getAttribute) {
        const P = T.getAttribute("data-tooltip-id"), M = T.getAttribute("data-tooltip-at"), Z = T.getAttribute("data-tooltip");
        if (P || Z) return { id: P, tooltip: Z, target: T, at: M };
      }
      T = T.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  ae(() => {
    const T = N.current;
    if (T && m && (m.text || s)) {
      const P = T.getBoundingClientRect();
      let M = !1, Z = m.left, oe = m.top;
      P.right >= h.right && (Z = h.width - P.width - 5, M = !0), P.bottom >= h.bottom && (oe = m.top - (P.bottom - h.bottom + 2), M = !0), M && q((J) => J && { ...J, left: Z, top: oe });
    }
  }, [m, h, s]);
  const $ = re(null), x = 300, d = (T) => {
    clearTimeout($.current), $.current = setTimeout(() => {
      T();
    }, x);
  };
  function X(T) {
    let { id: P, tooltip: M, target: Z, at: oe } = V(T.target);
    if (q(null), y(null), !M)
      if (P)
        M = A(P);
      else {
        clearTimeout($.current);
        return;
      }
    const J = T.clientX;
    d(() => {
      P && y(W(j(P)));
      const fe = Z.getBoundingClientRect(), B = o.current, ue = B ? B.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let D, f;
      oe === "left" ? (D = fe.top + 5 - ue.top, f = fe.right + 5 - ue.left) : (D = fe.top + fe.height - ue.top, f = J - ue.left), b(ue), q({ top: D, left: f, text: M });
    });
  }
  function W(T) {
    return n?.getTask(j(T)) || null;
  }
  function A(T) {
    return W(T)?.text || "";
  }
  function j(T) {
    const P = parseInt(T);
    return isNaN(P) ? T : P;
  }
  return /* @__PURE__ */ _e(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: X,
      children: [
        m && (m.text || s) ? /* @__PURE__ */ u(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: N,
            style: { top: `${m.top}px`, left: `${m.left}px` },
            children: s ? /* @__PURE__ */ u(s, { data: r }) : m.text ? /* @__PURE__ */ u("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: m.text }) : null
          }
        ) : null,
        i
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
  Ws as defaultToolbarButtons,
  As as getEditorItems,
  Os as getMenuOptions,
  zs as getToolbarButtons,
  Ys as registerEditorItem,
  Gs as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
