import { jsxs as Le, jsx as c, Fragment as Je } from "react/jsx-runtime";
import { createContext as Xt, useMemo as T, useState as ge, useContext as ze, useCallback as R, useRef as re, useEffect as le, Fragment as Ft, forwardRef as St, useImperativeHandle as Nt } from "react";
import { context as Ye, Button as wt, Field as Kt, Text as qt, Combo as Vt, DatePicker as Bt, TimePicker as Ut, Locale as jt, RichSelect as Qt, TwoState as Zt, Slider as Jt, Counter as en, Material as xt, Willow as pt, WillowDark as yt } from "@svar-ui/react-core";
import { locate as Ge, locateID as Be, locateAttr as tn, dateToString as tt, locale as nt } from "@svar-ui/lib-dom";
import { en as st } from "@svar-ui/gantt-locales";
import { en as it } from "@svar-ui/core-locales";
import { EventBusRouter as nn } from "@svar-ui/lib-state";
import { prepareEditTask as Lt, grid as sn, extendDragOptions as rn, isSegmentMoveAllowed as on, DataStore as ln, normalizeLinks as cn, normalizeZoom as an, defaultColumns as un, parseTaskDates as kt, defaultTaskTypes as dn, getToolbarButtons as bt, handleAction as It, isHandledAction as At, getMenuOptions as vt, getEditorItems as fn } from "@svar-ui/gantt-store";
import { defaultColumns as bs, defaultEditorItems as vs, defaultMenuOptions as Ts, defaultTaskTypes as $s, defaultToolbarButtons as Ms, getEditorItems as Cs, getMenuOptions as Rs, getToolbarButtons as Ds, registerScaleUnit as Es } from "@svar-ui/gantt-store";
import { useWritableProp as lt, useStore as X, useStoreWithCounter as et, writable as hn, useStoreLater as Xe } from "@svar-ui/lib-react";
import { hotkeys as Pt } from "@svar-ui/grid-store";
import { Grid as mn, HeaderMenu as gn } from "@svar-ui/react-grid";
import { flushSync as wn } from "react-dom";
import { Toolbar as Tt } from "@svar-ui/react-toolbar";
import { ContextMenu as xn } from "@svar-ui/react-menu";
import { Editor as pn, registerEditorItem as Ue } from "@svar-ui/react-editor";
import { registerEditorItem as Ns } from "@svar-ui/react-editor";
const Fe = Xt(null);
function Ke(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function yn(t, n, s) {
  const l = t.getBoundingClientRect(), r = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: l.top - r.top,
    left: l.left - r.left,
    dt: l.bottom - s.clientY,
    db: s.clientY - l.top
  };
}
function $t(t) {
  return t && t.getAttribute("data-context-id");
}
const Mt = 5;
function kn(t, n) {
  let s, l, r, E, h, o, d, H, p;
  function j(g) {
    E = g.clientX, h = g.clientY, o = {
      ...yn(s, t, g),
      y: n.getTask(r).$y
    }, document.body.style.userSelect = "none";
  }
  function S(g) {
    s = Ge(g), $t(s) && (r = Ke(s), p = setTimeout(() => {
      H = !0, n && n.touchStart && n.touchStart(), j(g.touches[0]);
    }, 500), t.addEventListener("touchmove", L), t.addEventListener("contextmenu", u), window.addEventListener("touchend", G));
  }
  function u(g) {
    if (H || p)
      return g.preventDefault(), !1;
  }
  function _(g) {
    g.which === 1 && (s = Ge(g), $t(s) && (r = Ke(s), t.addEventListener("mousemove", Q), window.addEventListener("mouseup", C), j(g)));
  }
  function m(g) {
    t.removeEventListener("mousemove", Q), t.removeEventListener("touchmove", L), document.body.removeEventListener("mouseup", C), document.body.removeEventListener("touchend", G), document.body.style.userSelect = "", g && (t.removeEventListener("mousedown", _), t.removeEventListener("touchstart", S));
  }
  function D(g) {
    const J = g.clientX - E, B = g.clientY - h;
    if (!l) {
      if (Math.abs(J) < Mt && Math.abs(B) < Mt || n && n.start && n.start({ id: r, e: g }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = o.left + "px", l.style.top = o.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const we = Math.round(Math.max(0, o.top + B));
      if (n && n.move && n.move({ id: r, top: we, detail: d }) === !1)
        return;
      const z = n.getTask(r), ue = z.$y;
      if (!o.start && o.y == ue) return Y();
      o.start = !0, o.y = z.$y - 4, l.style.top = we + "px";
      const ne = document.elementFromPoint(
        g.clientX,
        g.clientY
      ), f = Ge(ne);
      if (f && f !== s) {
        const b = Ke(f), I = f.getBoundingClientRect(), ae = I.top + I.height / 2, te = g.clientY + o.db > ae && f.nextElementSibling !== s, oe = g.clientY - o.dt < ae && f.previousElementSibling !== s;
        d?.after == b || d?.before == b ? d = null : te ? d = { id: r, after: b } : oe && (d = { id: r, before: b });
      }
    }
  }
  function Q(g) {
    D(g);
  }
  function L(g) {
    H ? (g.preventDefault(), D(g.touches[0])) : p && (clearTimeout(p), p = null);
  }
  function G() {
    H = null, p && (clearTimeout(p), p = null), Y();
  }
  function C() {
    Y();
  }
  function Y() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: r, top: o.top })), r = s = l = o = d = null, m();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", _), t.addEventListener("touchstart", S), {
    destroy() {
      m(!0);
    }
  };
}
function bn({ row: t, column: n }) {
  function s(r, E) {
    return {
      justifyContent: E.align,
      paddingLeft: `${(r.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ Le("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ c(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ c("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ c("div", { className: "wx-pqc08MHU wx-text", children: l ? /* @__PURE__ */ c(l, { row: t, column: n }) : t.text })
  ] });
}
function Ct({ column: t, cell: n }) {
  const s = T(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ c("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ c(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function vn(t) {
  const {
    readonly: n,
    compactMode: s,
    width: l = 0,
    display: r = "all",
    columnWidth: E = 0,
    onTableAPIChange: h,
    multiTaskRows: o = !1,
    rowMapping: d = null
  } = t, [H, p] = lt(E), [j, S] = ge(), u = ze(Ye.i18n), _ = T(() => u.getGroup("gantt"), [u]), m = ze(Fe), D = X(m, "scrollTop"), Q = X(m, "cellHeight"), L = X(m, "_scrollTask"), G = X(m, "_selected"), C = X(m, "area"), Y = X(m, "_tasks"), g = X(m, "_scales"), J = X(m, "columns"), B = X(m, "_sort"), we = X(m, "calendar"), z = X(m, "durationUnit"), ue = X(m, "splitTasks"), [ne, f] = ge(null), b = T(() => !Y || !C ? [] : o && d ? Y : Y.slice(C.start, C.end), [Y, C, o, d]), I = R(
    (i, k) => {
      if (k === "add-task")
        m.exec(k, {
          target: i,
          task: { text: _("New Task") },
          mode: "child",
          show: !0
        });
      else if (k === "open-task") {
        const M = b.find((O) => O.id === i);
        (M?.data || M?.lazy) && m.exec(k, { id: i, mode: !M.open });
      }
    },
    [b]
  ), ae = R(
    (i) => {
      const k = Be(i), M = i.target.dataset.action;
      M && i.preventDefault(), k ? M === "add-task" || M === "open-task" ? I(k, M) : m.exec("select-task", {
        id: k,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : M === "add-task" && I(null, M);
    },
    [m, I]
  ), te = re(null), oe = re(null), [de, ye] = ge(0), [Ee, Ce] = ge(!1);
  le(() => {
    const i = oe.current;
    if (!i || typeof ResizeObserver > "u") return;
    const k = () => ye(i.clientWidth);
    k();
    const M = new ResizeObserver(k);
    return M.observe(i), () => M.disconnect();
  }, []);
  const Se = re(null), Re = R(
    (i) => {
      const k = i.id, { before: M, after: O } = i, be = i.onMove;
      let me = M || O, Me = M ? "before" : "after";
      if (be) {
        if (Me === "after") {
          const Pe = m.getTask(me);
          Pe.data?.length && Pe.open && (Me = "before", me = Pe.data[0].id);
        }
        Se.current = { id: k, [Me]: me };
      } else Se.current = null;
      m.exec("move-task", {
        id: k,
        mode: Me,
        target: me,
        inProgress: be
      });
    },
    [m]
  ), W = T(() => o && d ? 0 : C?.from ?? 0, [C, o, d]), y = T(() => g?.height ?? 0, [g]), A = T(() => !s && r !== "grid" ? (H ?? 0) > (l ?? 0) : (H ?? 0) > (de ?? 0), [s, r, H, l, de]), K = T(() => {
    const i = {};
    return A && r === "all" || r === "grid" && A ? i.width = H : r === "grid" && (i.width = "100%"), i;
  }, [A, r, H]), q = T(() => ne && !b.find((i) => i.id === ne.id) ? [...b, ne] : b, [b, ne]), U = T(() => {
    if (!o || !d) return q;
    const i = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set();
    return q.forEach((M) => {
      const O = d.taskRows.get(M.id) ?? M.id;
      k.has(O) || (i.set(O, {
        ...M,
        $rowTasks: d.rowMap.get(O) || [M.id]
      }), k.add(O));
    }), Array.from(i.values());
  }, [q, o, d]), ce = T(() => {
    let i = (J || []).map((O) => {
      O = { ...O };
      const be = O.header;
      if (typeof be == "object") {
        const me = be.text && _(be.text);
        O.header = { ...be, text: me };
      } else O.header = _(be);
      return O;
    });
    const k = i.findIndex((O) => O.id === "text"), M = i.findIndex((O) => O.id === "add-task");
    if (k !== -1 && (i[k].cell && (i[k]._cell = i[k].cell), i[k].cell = bn), M !== -1) {
      i[M].cell = i[M].cell || Ct;
      const O = i[M].header;
      if (typeof O != "object" && (i[M].header = { text: O }), i[M].header.cell = O.cell || Ct, n)
        i.splice(M, 1);
      else if (s) {
        const [be] = i.splice(M, 1);
        i.unshift(be);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [J, _, n, s]), he = T(() => r === "all" ? `${l}px` : r === "grid" ? "calc(100% - 4px)" : ce.find((i) => i.id === "add-task") ? "50px" : "0", [r, l, ce]), v = T(() => {
    if (U && B?.length) {
      const i = {};
      return B.forEach(({ key: k, order: M }, O) => {
        i[k] = {
          order: M,
          ...B.length > 1 && { index: O }
        };
      }), i;
    }
    return {};
  }, [U, B]), Z = R(() => ce.some((i) => i.flexgrow && !i.hidden), []), fe = T(() => Z(), [Z, Ee]), xe = T(() => {
    let i = r === "chart" ? ce.filter((M) => M.id === "add-task") : ce;
    const k = r === "all" ? l : de;
    if (!fe) {
      let M = H, O = !1;
      if (ce.some((be) => be.$width)) {
        let be = 0;
        M = ce.reduce((me, Me) => (Me.hidden || (be += Me.width, me += Me.$width || Me.width), me), 0), be > M && M > k && (O = !0);
      }
      if (O || M < k) {
        let be = 1;
        return O || (be = (k - 50) / (M - 50 || 1)), i.map((me) => (me.id !== "add-task" && !me.hidden && (me.$width || (me.$width = me.width), me.width = me.$width * be), me));
      }
    }
    return i;
  }, [r, ce, fe, H, l, de]), De = R(
    (i) => {
      if (!Z()) {
        const k = xe.reduce((M, O) => (i && O.$width && (O.$width = O.width), M + (O.hidden ? 0 : O.width)), 0);
        k !== H && p(k);
      }
      Ce(!0), Ce(!1);
    },
    [Z, xe, H, p]
  ), w = R(() => {
    ce.filter((k) => k.flexgrow && !k.hidden).length === 1 && ce.forEach((k) => {
      k.$width && !k.flexgrow && !k.hidden && (k.width = k.$width);
    });
  }, []), ie = R(
    (i) => {
      if (!n) {
        const k = Be(i), M = tn(i, "data-col-id");
        !(M && ce.find((be) => be.id == M))?.editor && k && m.exec("show-editor", { id: k });
      }
    },
    [m, n]
    // cols is defined later; relies on latest value at call time
  ), pe = T(
    () => Array.isArray(G) ? G.map((i) => i.id) : [],
    [G]
  ), V = re(W);
  V.current = W, le(() => {
    const i = (M) => {
      if (te.current) {
        const O = te.current.querySelector(".wx-body");
        O && (O.style.top = -((M ?? 0) - (V.current ?? 0)) + "px");
      }
      oe.current && (oe.current.scrollTop = 0);
    };
    return i(D), m.on("scroll-chart", ({ top: M }) => {
      M !== void 0 && i(M);
    });
  }, [m, D]), le(() => {
    if (te.current) {
      const i = te.current.querySelector(".wx-body");
      i && (i.style.top = -((D ?? 0) - (W ?? 0)) + "px");
    }
  }, [W]), le(() => {
    const i = te.current;
    if (!i) return;
    const k = i.querySelector(".wx-table-box .wx-body");
    if (!k || typeof ResizeObserver > "u") return;
    const M = new ResizeObserver(() => {
      if (te.current) {
        const O = te.current.querySelector(".wx-body");
        O && (O.style.top = -((D ?? 0) - (V.current ?? 0)) + "px");
      }
    });
    return M.observe(k), () => {
      M.disconnect();
    };
  }, [xe, K, r, he, U, D]), le(() => {
    if (!L || !j) return;
    const { id: i } = L, k = j.getState().focusCell;
    k && k.row !== i && te.current && te.current.contains(document.activeElement) && j.exec("focus-cell", {
      row: i,
      column: k.column
    });
  }, [L, j]);
  const F = R(
    ({ id: i }) => {
      if (n) return !1;
      m.getTask(i).open && m.exec("open-task", { id: i, mode: !1 });
      const k = m.getState()._tasks.find((M) => M.id === i);
      if (f(k || null), !k) return !1;
    },
    [m, n]
  ), ke = R(
    ({ id: i, top: k }) => {
      Se.current ? Re({ ...Se.current, onMove: !1 }) : m.exec("drag-task", {
        id: i,
        top: k + (W ?? 0),
        inProgress: !1
      }), f(null);
    },
    [m, Re, W]
  ), ve = R(
    ({ id: i, top: k, detail: M }) => {
      M && Re({ ...M, onMove: !0 }), m.exec("drag-task", {
        id: i,
        top: k + (W ?? 0),
        inProgress: !0
      });
    },
    [m, Re, W]
  );
  le(() => {
    const i = te.current;
    return i ? kn(i, {
      start: F,
      end: ke,
      move: ve,
      getTask: m.getTask
    }).destroy : void 0;
  }, [m, F, ke, ve]);
  const Ne = R(
    (i) => {
      const { key: k, isInput: M } = i;
      if (!M && (k === "arrowup" || k === "arrowdown"))
        return i.eventSource = "grid", m.exec("hotkey", i), !1;
      if (k === "enter") {
        const O = j?.getState().focusCell;
        if (O) {
          const { row: be, column: me } = O;
          me === "add-task" ? I(be, "add-task") : me === "text" && I(be, "open-task");
        }
      }
    },
    [m, I, j]
  ), Te = re(null), Ie = () => {
    Te.current = {
      setTableAPI: S,
      handleHotkey: Ne,
      sortVal: B,
      api: m,
      adjustColumns: w,
      setColumnWidth: De,
      tasks: b,
      calendarVal: we,
      durationUnitVal: z,
      splitTasksVal: ue,
      onTableAPIChange: h
    };
  };
  Ie(), le(() => {
    Ie();
  }, [
    S,
    Ne,
    B,
    m,
    w,
    De,
    b,
    we,
    z,
    ue,
    h
  ]);
  const qe = R((i) => {
    S(i), i.intercept("hotkey", (k) => Te.current.handleHotkey(k)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (k) => {
      const M = Te.current.sortVal, { key: O, add: be } = k, me = M ? M.find((Pe) => Pe.key === O) : null;
      let Me = "asc";
      return me && (Me = !me || me.order === "asc" ? "desc" : "asc"), m.exec("sort-tasks", {
        key: O,
        order: Me,
        add: be
      }), !1;
    }), i.on("resize-column", () => {
      Te.current.setColumnWidth(!0);
    }), i.on("hide-column", (k) => {
      k.mode || Te.current.adjustColumns(), Te.current.setColumnWidth();
    }), i.intercept("update-cell", (k) => {
      const { id: M, column: O, value: be } = k, me = Te.current.tasks.find((Me) => Me.id === M);
      if (me) {
        const Me = { ...me };
        let Pe = be;
        Pe && !isNaN(Pe) && !(Pe instanceof Date) && (Pe *= 1), Me[O] = Pe, Lt(
          Me,
          {
            calendar: Te.current.calendarVal,
            durationUnit: Te.current.durationUnitVal,
            splitTasks: Te.current.splitTasksVal
          },
          O
        ), m.exec("update-task", {
          id: M,
          task: Me
        });
      }
      return !1;
    }), h && h(i);
  }, []);
  return /* @__PURE__ */ c(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${he}` },
      ref: oe,
      children: /* @__PURE__ */ c(
        "div",
        {
          ref: te,
          style: K,
          className: "wx-rHj6070p wx-table",
          onClick: ae,
          onDoubleClick: ie,
          children: /* @__PURE__ */ c(
            mn,
            {
              init: qe,
              sizes: {
                rowHeight: Q,
                headerHeight: (y ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: U,
              columns: xe,
              selectedRows: [...pe],
              sortMarks: v
            }
          )
        }
      )
    }
  );
}
function Tn({ borders: t = "" }) {
  const n = ze(Fe), s = X(n, "cellWidth"), l = X(n, "cellHeight"), r = re(null), [E, h] = ge("#e4e4e4");
  le(() => {
    if (typeof getComputedStyle < "u" && r.current) {
      const d = getComputedStyle(r.current).getPropertyValue(
        "--wx-gantt-border"
      );
      h(d ? d.substring(d.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const o = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${sn(s, l, E, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ c("div", { ref: r, style: o });
}
function $n({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = ze(Fe), r = X(l, "_links"), E = X(l, "criticalPath"), h = re(null), o = R(
    (d) => {
      const H = d?.target?.classList;
      !H?.contains("wx-line") && !H?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return le(() => {
    if (!s && n && h.current) {
      const d = (H) => {
        h.current && !h.current.contains(H.target) && o(H);
      };
      return document.addEventListener("click", d), () => {
        document.removeEventListener("click", d);
      };
    }
  }, [s, n, o]), /* @__PURE__ */ Le("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (r || []).map((d) => {
      const H = "wx-dkx3NwEn wx-line" + (E && d.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ c(
        "polyline",
        {
          className: H,
          points: d.$p,
          onClick: () => !s && t(d.id),
          "data-link-id": d.id
        },
        d.id
      );
    }),
    !s && n && /* @__PURE__ */ c(
      "polyline",
      {
        ref: h,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function Mn(t) {
  const { task: n, type: s } = t;
  function l(E) {
    const h = n.segments[E];
    return {
      left: `${h.$x}px`,
      top: "0px",
      width: `${h.$w}px`,
      height: "100%"
    };
  }
  function r(E) {
    if (!n.progress) return 0;
    const h = n.duration * n.progress / 100, o = n.segments;
    let d = 0, H = 0, p = null;
    do {
      const j = o[H];
      H === E && (d > h ? p = 0 : p = Math.min((h - d) / j.duration, 1) * 100), d += j.duration, H++;
    } while (p === null && H < o.length);
    return p || 0;
  }
  return /* @__PURE__ */ c("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((E, h) => /* @__PURE__ */ Le(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": h,
      style: l(h),
      children: [
        n.progress ? /* @__PURE__ */ c("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ c(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${r(h)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ c("div", { className: "wx-content", children: E.text || "" })
      ]
    },
    h
  )) });
}
let ot = [], Rt = null, Ze = null;
const Cn = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: l, lengthUnit: r } = n, E = 864e5, h = r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1, o = Math.floor(t / l);
  return new Date(s.getTime() + o * h * E);
}, Dt = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: l } = s, h = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / h);
}, Et = (t, n, s) => {
  if (!s || !t) return t;
  const { lengthUnit: l } = s, h = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5;
  return new Date(t.getTime() + n * h);
};
function Rn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: r = null,
    marqueeSelect: E = !1,
    copyPaste: h = !1
  } = t, o = ze(Fe), [d, H] = et(o, "_tasks"), [p, j] = et(o, "_links"), S = X(o, "area"), u = X(o, "_scales"), _ = X(o, "taskTypes"), m = X(o, "baselines"), [D, Q] = et(o, "_selected"), L = X(o, "_scrollTask"), G = X(o, "criticalPath"), C = X(o, "tasks"), Y = X(o, "schedule"), g = X(o, "splitTasks"), J = T(() => {
    if (!S || !Array.isArray(d)) return [];
    const e = S.start ?? 0, a = S.end ?? 0;
    return l && r ? d.map((x) => ({ ...x })) : d.slice(e, a).map((x) => ({ ...x }));
  }, [H, S, l, r]), B = X(o, "cellHeight"), we = T(() => {
    if (!l || !r || !J.length) return J;
    const e = /* @__PURE__ */ new Map(), a = [];
    return d.forEach((x) => {
      const N = r.taskRows.get(x.id) ?? x.id;
      e.has(N) || (e.set(N, a.length), a.push(N));
    }), J.map((x) => {
      const N = r.taskRows.get(x.id) ?? x.id, $ = e.get(N) ?? 0;
      return {
        ...x,
        $y: $ * B,
        $y_base: x.$y_base !== void 0 ? $ * B : void 0
      };
    });
  }, [J, l, r, d, B]), z = T(
    () => u.lengthUnitWidth,
    [u]
  ), ue = T(
    () => u.lengthUnit || "day",
    [u]
  ), ne = re(!1), [f, b] = ge(void 0), [I, ae] = ge(null), te = re(null), [oe, de] = ge(null), [ye, Ee] = ge(void 0), Ce = re(null), [Se, Re] = ge(0), [W, y] = ge(null), A = re(null), [K, q] = ge(null), [U, ce] = ge(null), he = re(null), v = T(() => {
    const e = he.current;
    return !!(D.length && e && e.contains(document.activeElement));
  }, [D, he.current]), Z = T(() => v && D[D.length - 1]?.id, [v, D]);
  le(() => {
    if (L && v && L) {
      const { id: e } = L, a = he.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      a && a.focus({ preventScroll: !0 });
    }
  }, [L]), le(() => {
    const e = he.current;
    if (e && (Re(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const a = new ResizeObserver((x) => {
        x[0] && Re(x[0].contentRect.width);
      });
      return a.observe(e), () => a.disconnect();
    }
  }, [he.current]);
  const fe = R(() => {
    document.body.style.userSelect = "none";
  }, []), xe = R(() => {
    document.body.style.userSelect = "";
  }, []), De = R(
    (e, a, x) => {
      if (a.target.classList.contains("wx-line") || (x || (x = o.getTask(Ke(e))), x.type === "milestone" || x.type === "summary")) return "";
      const N = Ge(a, "data-segment");
      N && (e = N);
      const { left: $, width: ee } = e.getBoundingClientRect(), P = (a.clientX - $) / ee;
      let se = 0.2 / (ee > 200 ? ee / 200 : 1);
      return P < se ? "start" : P > 1 - se ? "end" : "";
    },
    [o]
  ), w = T(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !r)
      return d.forEach((N) => {
        e.set(N.id, N.$y);
      }), e;
    const a = /* @__PURE__ */ new Map(), x = [];
    return d.forEach((N) => {
      const $ = r.taskRows.get(N.id) ?? N.id;
      a.has($) || (a.set($, x.length), x.push($));
    }), d.forEach((N) => {
      const $ = r.taskRows.get(N.id) ?? N.id, ee = a.get($) ?? 0;
      e.set(N.id, ee * B);
    }), e;
  }, [d, l, r, B]), ie = R(
    (e) => {
      if (!he.current) return [];
      const x = Math.min(e.startX, e.currentX), N = Math.max(e.startX, e.currentX), $ = Math.min(e.startY, e.currentY), ee = Math.max(e.startY, e.currentY);
      return d.filter((P) => {
        const se = P.$x, $e = P.$x + P.$w, Ae = w.get(P.id) ?? P.$y, We = Ae + P.$h;
        return se < N && $e > x && Ae < ee && We > $;
      });
    },
    [d, w]
  ), pe = T(() => new Set(D.map((e) => e.id)), [D, Q]), V = R(
    (e) => pe.has(e),
    [pe]
  ), F = R(
    (e, a) => {
      const { clientX: x } = a, N = Ke(e), $ = o.getTask(N), ee = a.target.classList;
      if (!a.target.closest(".wx-delete-button") && !n) {
        if (ee.contains("wx-progress-marker")) {
          const { progress: P } = o.getTask(N);
          te.current = {
            id: N,
            x,
            progress: P,
            dx: 0,
            node: e,
            marker: a.target
          }, a.target.classList.add("wx-progress-in-drag");
        } else {
          const P = De(e, a, $) || "move", se = {
            id: N,
            mode: P,
            x,
            dx: 0,
            l: $.$x,
            w: $.$w
          };
          if (g && $.segments?.length) {
            const $e = Ge(a, "data-segment");
            $e && (se.segmentIndex = $e.dataset.segment * 1, rn($, se));
          }
          ae(se);
        }
        fe();
      }
    },
    [o, n, De, fe, g]
  ), ke = R(
    (e) => {
      if (e.button !== 0) return;
      const a = Ge(e);
      if (!a && E && !n) {
        const x = he.current;
        if (!x) return;
        const N = x.getBoundingClientRect(), $ = e.clientX - N.left, ee = e.clientY - N.top;
        if (h) {
          const se = x.closest(".wx-chart") || x.parentElement, $e = se ? se.scrollLeft : 0, _e = $ + $e, Ae = Cn(_e, u);
          Ae && ce(Ae);
        }
        const P = {
          startX: $,
          startY: ee,
          currentX: $,
          currentY: ee,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        y(P), A.current = P, fe();
        return;
      }
      if (a) {
        if (E && !n && D.length > 1) {
          const x = Ke(a);
          if (V(x)) {
            const N = e.target.classList;
            if (!N.contains("wx-link") && !N.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const $ = o.getTask(x);
              if (!De(a, e, $)) {
                const P = /* @__PURE__ */ new Map();
                D.forEach((se) => {
                  const $e = o.getTask(se.id);
                  if ($e) {
                    if (Y?.auto && $e.type === "summary") return;
                    P.set(se.id, {
                      $x: $e.$x,
                      $w: $e.$w,
                      start: $e.start,
                      end: $e.end
                    });
                  }
                }), q({
                  baseTaskId: x,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: P
                }), fe();
                return;
              }
            }
          }
        }
        F(a, e);
      }
    },
    [F, E, h, n, D, V, o, De, Y, fe, u]
  ), ve = R(
    (e) => {
      const a = Ge(e);
      a && (Ce.current = setTimeout(() => {
        Ee(!0), F(a, e.touches[0]);
      }, 300));
    },
    [F]
  ), Ne = R(
    (e) => {
      de(e && { ...p.find((a) => a.id === e) });
    },
    [p]
  ), Te = R(() => {
    const e = A.current;
    if (e) {
      const a = ie(e);
      e.ctrlKey ? a.forEach((x) => {
        o.exec("select-task", { id: x.id, toggle: !0, marquee: !0 });
      }) : a.length > 0 && (D.length > 0 && o.exec("select-task", { id: null, marquee: !0 }), a.forEach((x, N) => {
        o.exec("select-task", {
          id: x.id,
          toggle: N > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), y(null), A.current = null, xe(), ne.current = !0;
      return;
    }
    if (K) {
      const { dx: a, originalPositions: x } = K, N = Math.round(a / z);
      if (N !== 0) {
        let $ = !0;
        x.forEach((ee, P) => {
          const se = o.getTask(P);
          se && (o.exec("update-task", {
            id: P,
            diff: N,
            task: { start: se.start, end: se.end },
            skipUndo: !$
            // Only first task creates undo entry
          }), $ = !1);
        }), ne.current = !0;
      } else
        x.forEach(($, ee) => {
          o.exec("drag-task", {
            id: ee,
            left: $.$x,
            width: $.$w,
            inProgress: !1
          });
        });
      q(null), xe();
      return;
    }
    if (te.current) {
      const { dx: a, id: x, marker: N, value: $ } = te.current;
      te.current = null, typeof $ < "u" && a && o.exec("update-task", {
        id: x,
        task: { progress: $ },
        inProgress: !1
      }), N.classList.remove("wx-progress-in-drag"), ne.current = !0, xe();
    } else if (I) {
      const { id: a, mode: x, dx: N, l: $, w: ee, start: P, segment: se, index: $e } = I;
      if (ae(null), P) {
        const _e = Math.round(N / z);
        if (!_e)
          o.exec("drag-task", {
            id: a,
            width: ee,
            left: $,
            inProgress: !1,
            ...se && { segmentIndex: $e }
          });
        else {
          let Ae = {}, We = o.getTask(a);
          se && (We = We.segments[$e]);
          const Ve = 1440 * 60 * 1e3, Oe = _e * (ue === "week" ? 7 : ue === "month" ? 30 : ue === "quarter" ? 91 : ue === "year" ? 365 : 1) * Ve;
          x === "move" ? (Ae.start = new Date(We.start.getTime() + Oe), Ae.end = new Date(We.end.getTime() + Oe)) : x === "start" ? (Ae.start = new Date(We.start.getTime() + Oe), Ae.end = We.end) : x === "end" && (Ae.start = We.start, Ae.end = new Date(We.end.getTime() + Oe)), o.exec("update-task", {
            id: a,
            task: Ae,
            ...se && { segmentIndex: $e }
          });
        }
        ne.current = !0;
      }
      xe();
    }
  }, [o, xe, I, z, ue, W, K, ie, D]), Ie = R(
    (e, a) => {
      const { clientX: x, clientY: N } = a;
      if (!n) {
        if (W) {
          const $ = he.current;
          if (!$) return;
          const ee = $.getBoundingClientRect(), P = x - ee.left, se = N - ee.top;
          y(($e) => ({
            ...$e,
            currentX: P,
            currentY: se
          })), A.current && (A.current.currentX = P, A.current.currentY = se);
          return;
        }
        if (K) {
          const $ = x - K.startX;
          K.originalPositions.forEach((ee, P) => {
            const se = ee.$x + $;
            o.exec("drag-task", {
              id: P,
              left: se,
              width: ee.$w,
              inProgress: !0
            });
          }), q((ee) => ({ ...ee, dx: $ }));
          return;
        }
        if (te.current) {
          const { node: $, x: ee, id: P } = te.current, se = te.current.dx = x - ee, $e = Math.round(se / $.offsetWidth * 100);
          let _e = te.current.progress + $e;
          te.current.value = _e = Math.min(
            Math.max(0, _e),
            100
          ), o.exec("update-task", {
            id: P,
            task: { progress: _e },
            inProgress: !0
          });
        } else if (I) {
          Ne(null);
          const { mode: $, l: ee, w: P, x: se, id: $e, start: _e, segment: Ae, index: We } = I, Ve = o.getTask($e), He = x - se;
          if (!_e && Math.abs(He) < 20 || $ === "start" && P - He < z || $ === "end" && P + He < z || $ === "move" && (He < 0 && ee + He < 0 || He > 0 && ee + P + He > Se) || I.segment && !on(Ve, I))
            return;
          const Oe = { ...I, dx: He };
          let je, Qe;
          if ($ === "start" ? (je = ee + He, Qe = P - He) : $ === "end" ? (je = ee, Qe = P + He) : $ === "move" && (je = ee + He, Qe = P), o.exec("drag-task", {
            id: $e,
            width: Qe,
            left: je,
            inProgress: !0,
            ...Ae && { segmentIndex: We }
          }), !Oe.start && ($ === "move" && Ve.$x == ee || $ !== "move" && Ve.$w == P)) {
            ne.current = !0, Te();
            return;
          }
          Oe.start = !0, ae(Oe);
        } else {
          const $ = Ge(e);
          if ($) {
            const ee = o.getTask(Ke($)), se = Ge(e, "data-segment") || $, $e = De(se, a, ee);
            se.style.cursor = $e && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      o,
      n,
      I,
      z,
      Se,
      De,
      Ne,
      Te,
      W,
      K
    ]
  ), qe = R(
    (e) => {
      Ie(e, e);
    },
    [Ie]
  ), i = R(
    (e) => {
      ye ? (e.preventDefault(), Ie(e, e.touches[0])) : Ce.current && (clearTimeout(Ce.current), Ce.current = null);
    },
    [ye, Ie]
  ), k = R(() => {
    Te();
  }, [Te]), M = R(() => {
    Ee(null), Ce.current && (clearTimeout(Ce.current), Ce.current = null), Te();
  }, [Te]);
  le(() => (window.addEventListener("mouseup", k), () => {
    window.removeEventListener("mouseup", k);
  }), [k]);
  const O = R(
    (e) => {
      if (!n) {
        const a = Be(e.target);
        if (a && !e.target.classList.contains("wx-link")) {
          const x = Be(e.target, "data-segment");
          o.exec("show-editor", {
            id: a,
            ...x !== null && { segmentIndex: x }
          });
        }
      }
    },
    [o, n]
  ), be = ["e2s", "s2s", "e2e", "s2e"], me = R((e, a) => be[(e ? 1 : 0) + (a ? 0 : 2)], []), Me = R(
    (e, a) => {
      const x = f.id, N = f.start;
      return e === x ? !0 : !!p.find(($) => $.target == e && $.source == x && $.type === me(N, a));
    },
    [f, j, me]
  ), Pe = R(() => {
    f && b(null);
  }, [f]), zt = R(
    (e) => {
      if (ne.current) {
        ne.current = !1;
        return;
      }
      const a = Be(e.target);
      if (a) {
        const x = e.target.classList;
        if (x.contains("wx-link")) {
          const N = x.contains("wx-left");
          if (!f) {
            b({ id: a, start: N });
            return;
          }
          f.id !== a && !Me(a, N) && o.exec("add-link", {
            link: {
              source: f.id,
              target: a,
              type: me(f.start, N)
            }
          });
        } else if (x.contains("wx-delete-button-icon"))
          o.exec("delete-link", { id: oe.id }), de(null);
        else {
          let N;
          const $ = Ge(e, "data-segment");
          $ && (N = $.dataset.segment * 1), o.exec("select-task", {
            id: a,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: N
          });
        }
      }
      Pe();
    },
    [
      o,
      f,
      j,
      oe,
      Me,
      me,
      Pe
    ]
  ), _t = R((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Gt = R((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Yt = R(
    (e) => {
      if (ye || Ce.current)
        return e.preventDefault(), !1;
    },
    [ye]
  ), ct = T(
    () => _.map((e) => e.id),
    [_]
  ), at = R(
    (e) => {
      let a = ct.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (a = `task ${a}`), a;
    },
    [ct]
  ), ut = R(
    (e) => {
      o.exec(e.action, e.data);
    },
    [o]
  ), rt = R(
    (e) => G && C.byId(e).$critical,
    [G, C]
  ), dt = R(
    (e) => {
      if (Y?.auto) {
        const a = C.getSummaryId(e, !0), x = C.getSummaryId(f.id, !0);
        return f?.id && !(Array.isArray(a) ? a : [a]).includes(
          f.id
        ) && !(Array.isArray(x) ? x : [x]).includes(e);
      }
      return f;
    },
    [Y, C, f]
  ), ft = re(null);
  ft.current = U;
  const ht = R(() => {
    const e = o.getState()._selected;
    if (!e || !e.length) return;
    const a = e.map((P) => {
      const se = o.getTask(P.id);
      if (!se) return null;
      const { $x: $e, $y: _e, $w: Ae, $h: We, $skip: Ve, $level: He, $index: Oe, $y_base: je, $x_base: Qe, $w_base: Fn, $h_base: Kn, $skip_baseline: qn, $critical: Vn, $reorder: Bn, ...Ot } = se;
      return Ot;
    }).filter(Boolean);
    if (!a.length) return;
    const N = a[0].parent, $ = a.filter((P) => P.parent === N);
    if ($.length === 0) return;
    const ee = $.reduce((P, se) => se.start && (!P || se.start < P) ? se.start : P, null);
    ot = $.map((P) => ({
      ...P,
      _startCellOffset: Dt(P.start, ee, u),
      _durationCells: Dt(P.end, P.start, u)
    })), Ze = N, Rt = ee;
  }, [o, u]), mt = R(() => {
    const e = ft.current;
    if (!ot.length || !e || !Rt || Ze == null) return;
    const a = o.getHistory();
    a?.startBatch(), ot.forEach((x, N) => {
      const $ = `task-${Date.now()}-${N}`, ee = Et(e, x._startCellOffset || 0, u), P = Et(ee, x._durationCells || 0, u);
      o.exec("add-task", {
        task: {
          ...x,
          id: $,
          start: ee,
          end: P,
          // Keep original parent and row from copied task
          parent: Ze,
          row: x.row
          // Each task keeps its own row
        },
        target: Ze,
        mode: "child",
        skipUndo: N > 0
      });
    }), a?.endBatch();
  }, [o]);
  le(() => h ? o.intercept("hotkey", (a) => {
    if (a.key === "ctrl+c" || a.key === "meta+c")
      return ht(), !1;
    if (a.key === "ctrl+v" || a.key === "meta+v")
      return mt(), !1;
  }) : void 0, [h, o, ht, mt]);
  const gt = T(() => {
    if (!W) return null;
    const e = Math.min(W.startX, W.currentX), a = Math.min(W.startY, W.currentY), x = Math.abs(W.currentX - W.startX), N = Math.abs(W.currentY - W.startY);
    return {
      left: `${e}px`,
      top: `${a}px`,
      width: `${x}px`,
      height: `${N}px`
    };
  }, [W]);
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${we.length ? we[0].$h : 0}px` },
      ref: he,
      onContextMenu: Yt,
      onMouseDown: ke,
      onMouseMove: qe,
      onTouchStart: ve,
      onTouchMove: i,
      onTouchEnd: M,
      onClick: zt,
      onDoubleClick: O,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ c(
          $n,
          {
            onSelectLink: Ne,
            selectedLink: oe,
            readonly: n
          }
        ),
        we.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const a = `wx-bar wx-${at(e.type)}` + (ye && I && e.id === I.id ? " wx-touch" : "") + (f && f.id === e.id ? " wx-selected" : "") + (pe.has(e.id) ? " wx-selected" : "") + (rt(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (g && e.segments ? " wx-split" : ""), x = "wx-link wx-left" + (f ? " wx-visible" : "") + (!f || !Me(e.id, !0) && dt(e.id) ? " wx-target" : "") + (f && f.id === e.id && f.start ? " wx-selected" : "") + (rt(e.id) ? " wx-critical" : ""), N = "wx-link wx-right" + (f ? " wx-visible" : "") + (!f || !Me(e.id, !1) && dt(e.id) ? " wx-target" : "") + (f && f.id === e.id && !f.start ? " wx-selected" : "") + (rt(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Le(Ft, { children: [
            !e.$skip && /* @__PURE__ */ Le(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: _t(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: Z === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === oe?.target && oe?.type[2] === "s" ? /* @__PURE__ */ c(
                    wt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ c("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA " + x, children: /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Le(Je, { children: [
                    e.progress && !(g && e.segments) ? /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ c(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(g && e.segments) ? /* @__PURE__ */ c(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ c(s, { data: e, api: o, onAction: ut }) : g && e.segments ? /* @__PURE__ */ c(Mn, { task: e, type: at(e.type) }) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ Le(Je, { children: [
                    /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ c(s, { data: e, api: o, onAction: ut }) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === oe?.target && oe?.type[2] === "e" ? /* @__PURE__ */ c(
                    wt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ c("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA " + N, children: /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            m && !e.$skip_baseline ? /* @__PURE__ */ c(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Gt(e)
              }
            ) : null
          ] }, e.id);
        }),
        W && gt && /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: gt })
      ]
    }
  );
}
function Dn(t) {
  const { highlightTime: n } = t, s = ze(Fe), l = X(s, "_scales");
  return /* @__PURE__ */ c("div", { className: "wx-ZkvhDKir wx-scale", style: { width: l.width }, children: (l?.rows || []).map((r, E) => /* @__PURE__ */ c(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${r.height}px` },
      children: (r.cells || []).map((h, o) => {
        const d = n ? n(h.date, h.unit) : "", H = "wx-cell " + (h.css || "") + " " + (d || ""), p = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ c(
          "div",
          {
            className: "wx-ZkvhDKir " + H,
            style: { width: `${h.width}px` },
            ...p ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          o
        );
      })
    },
    E
  )) });
}
const En = /* @__PURE__ */ new Map();
function Sn(t) {
  const n = re(null), s = re(0), l = re(null), r = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, le(() => {
    if (r)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const E = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        En.set(t, E), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: E })
        );
      }), () => cancelAnimationFrame(l.current);
  });
}
function Nn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: l,
    taskTemplate: r,
    cellBorders: E,
    highlightTime: h,
    multiTaskRows: o = !1,
    rowMapping: d = null,
    marqueeSelect: H = !1,
    copyPaste: p = !1,
    scrollToCurrentWeek: j = !1,
    currentWeekColor: S = null
  } = t, u = ze(Fe), [_, m] = et(u, "_selected"), D = X(u, "scrollTop"), Q = X(u, "cellHeight"), L = X(u, "cellWidth"), G = X(u, "_scales"), C = X(u, "_markers"), Y = X(u, "_scrollTask"), g = X(u, "zoom"), J = X(u, "_tasks"), [B, we] = ge(), z = re(null), ue = re(0), ne = re(!1), f = 1 + (G?.rows?.length || 0), b = T(() => {
    if (!o || !d || !J?.length) return null;
    const y = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), K = [];
    return J.forEach((q) => {
      const U = d.taskRows.get(q.id) ?? q.id;
      A.has(U) || (A.set(U, K.length), K.push(U));
    }), J.forEach((q) => {
      const U = d.taskRows.get(q.id) ?? q.id, ce = A.get(U) ?? 0;
      y.set(q.id, ce * Q);
    }), y;
  }, [J, o, d, Q]), I = T(() => {
    const y = [];
    return _ && _.length && Q && _.forEach((A) => {
      const K = b?.get(A.id) ?? A.$y;
      y.push({ height: `${Q}px`, top: `${K - 3}px` });
    }), y;
  }, [m, Q, b]), ae = T(
    () => Math.max(B || 0, l),
    [B, l]
  );
  le(() => {
    const y = z.current;
    y && typeof D == "number" && (y.scrollTop = D);
  }, [D]);
  const te = () => {
    oe();
  };
  function oe(y) {
    const A = z.current;
    if (!A) return;
    const K = {};
    K.left = A.scrollLeft, u.exec("scroll-chart", K);
  }
  function de() {
    const y = z.current, K = Math.ceil((B || 0) / (Q || 1)) + 1, q = Math.floor((y && y.scrollTop || 0) / (Q || 1)), U = Math.max(0, q - f), ce = q + K + f, he = U * (Q || 0);
    u.exec("render-data", {
      start: U,
      end: ce,
      from: he
    });
  }
  le(() => {
    de();
  }, [B, D]);
  const ye = R(
    (y) => {
      if (!y) return;
      const { id: A, mode: K } = y;
      if (K.toString().indexOf("x") < 0) return;
      const q = z.current;
      if (!q) return;
      const { clientWidth: U } = q, ce = u.getTask(A);
      if (ce.$x + ce.$w < q.scrollLeft)
        u.exec("scroll-chart", { left: ce.$x - (L || 0) }), q.scrollLeft = ce.$x - (L || 0);
      else if (ce.$x >= U + q.scrollLeft) {
        const he = U < ce.$w ? L || 0 : ce.$w;
        u.exec("scroll-chart", { left: ce.$x - U + he }), q.scrollLeft = ce.$x - U + he;
      }
    },
    [u, L]
  );
  le(() => {
    ye(Y);
  }, [Y]);
  function Ee(y) {
    if (g && (y.ctrlKey || y.metaKey)) {
      y.preventDefault();
      const A = z.current, K = y.clientX - (A ? A.getBoundingClientRect().left : 0);
      if (ue.current += y.deltaY, Math.abs(ue.current) >= 150) {
        const U = -Math.sign(ue.current);
        ue.current = 0, u.exec("zoom-scale", {
          dir: U,
          offset: K
        });
      }
    }
  }
  const Ce = R((y) => {
    const A = h(y.date, y.unit);
    return A ? {
      css: A,
      width: y.width
    } : null;
  }, [h]), Se = T(() => {
    if (!G || !h || !["hour", "day", "week"].includes(G.minUnit)) return null;
    let A = 0;
    return G.rows[G.rows.length - 1].cells.map((K) => {
      const q = Ce(K), U = A;
      return A += K.width, q ? { ...q, left: U } : null;
    });
  }, [G, h, Ce]), Re = R(
    (y) => {
      y.eventSource = "chart", u.exec("hotkey", y);
    },
    [u]
  );
  le(() => {
    const y = z.current;
    if (!y) return;
    const A = () => we(y.clientHeight);
    A();
    const K = new ResizeObserver(() => A());
    return K.observe(y), () => {
      K.disconnect();
    };
  }, [z.current]);
  const W = re(null);
  return le(() => {
    const y = z.current;
    if (y && !W.current)
      return W.current = Pt(y, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (A) => Re(A)
      }), () => {
        W.current?.destroy(), W.current = null;
      };
  }, []), le(() => {
    const y = z.current;
    if (!y) return;
    const A = Ee;
    return y.addEventListener("wheel", A), () => {
      y.removeEventListener("wheel", A);
    };
  }, [Ee]), le(() => {
    if (!j || ne.current || !G || !z.current || !B) return;
    const y = z.current, { clientWidth: A } = y, K = /* @__PURE__ */ new Date(), q = G.rows[G.rows.length - 1]?.cells;
    if (!q) return;
    let U = -1, ce = 0;
    const he = [];
    for (let Z = 0; Z < q.length; Z++) {
      const fe = q[Z];
      he.push({ left: ce, width: fe.width });
      const xe = fe.date;
      if (fe.unit === "week") {
        const De = new Date(xe);
        De.setDate(De.getDate() + 7), K >= xe && K < De && (U = Z);
      } else fe.unit === "day" && K.getFullYear() === xe.getFullYear() && K.getMonth() === xe.getMonth() && K.getDate() === xe.getDate() && (U = Z);
      ce += fe.width;
    }
    let v = U;
    if (U > 0 && (v = U - 1), v >= 0 && he[v]) {
      const Z = he[v], fe = Math.max(0, Z.left);
      y.scrollLeft = fe, u.exec("scroll-chart", { left: fe }), ne.current = !0;
    }
  }, [j, G, B, u]), Sn("chart"), /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: z,
      onScroll: te,
      children: [
        /* @__PURE__ */ c(Dn, { highlightTime: h, scales: G }),
        C && C.length ? /* @__PURE__ */ c(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${ae}px` },
            children: C.map((y, A) => /* @__PURE__ */ c(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${y.css || ""}`,
                style: { left: `${y.left}px` },
                children: /* @__PURE__ */ c("div", { className: "wx-mR7v2Xag wx-content", children: y.text })
              },
              A
            ))
          }
        ) : null,
        /* @__PURE__ */ Le(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${ae}px` },
            children: [
              Se ? /* @__PURE__ */ c(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Se.map(
                    (y, A) => y ? /* @__PURE__ */ c(
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
              /* @__PURE__ */ c(Tn, { borders: E }),
              _ && _.length ? _.map(
                (y, A) => y.$y ? /* @__PURE__ */ c(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": y.id,
                    style: I[A]
                  },
                  y.id
                ) : null
              ) : null,
              /* @__PURE__ */ c(
                Rn,
                {
                  readonly: n,
                  taskTemplate: r,
                  multiTaskRows: o,
                  rowMapping: d,
                  marqueeSelect: H,
                  copyPaste: p
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Ln(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: l = "x",
    onMove: r,
    onDisplayChange: E,
    compactMode: h,
    containerWidth: o = 0,
    leftThreshold: d = 50,
    rightThreshold: H = 50
  } = t, [p, j] = lt(t.value ?? 0), [S, u] = lt(t.display ?? "all");
  function _(oe) {
    let de = 0;
    n == "center" ? de = s / 2 : n == "before" && (de = s);
    const ye = {
      size: [s + "px", "auto"],
      p: [oe - de + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let Ee in ye) ye[Ee] = ye[Ee].reverse();
    return ye;
  }
  const [m, D] = ge(!1), [Q, L] = ge(null), G = re(0), C = re(), Y = re(), g = re(S);
  le(() => {
    g.current = S;
  }, [S]), le(() => {
    Q === null && p > 0 && L(p);
  }, [Q, p]);
  function J(oe) {
    return l == "x" ? oe.clientX : oe.clientY;
  }
  const B = R(
    (oe) => {
      const de = C.current + J(oe) - G.current;
      j(de);
      let ye;
      de <= d ? ye = "chart" : o - de <= H ? ye = "grid" : ye = "all", g.current !== ye && (u(ye), g.current = ye), Y.current && clearTimeout(Y.current), Y.current = setTimeout(() => r && r(de), 100);
    },
    [o, d, H, r]
  ), we = R(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", D(!1), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", we);
  }, [B]), z = T(
    () => S !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [S, l]
  ), ue = R(
    (oe) => {
      !h && (S === "grid" || S === "chart") || (G.current = J(oe), C.current = p, D(!0), document.body.style.cursor = z, document.body.style.userSelect = "none", window.addEventListener("mousemove", B), window.addEventListener("mouseup", we));
    },
    [z, B, we, p, h, S]
  );
  function ne() {
    u("all"), Q !== null && (j(Q), r && r(Q));
  }
  function f(oe) {
    if (h) {
      const de = S === "chart" ? "grid" : "chart";
      u(de), E(de);
    } else if (S === "grid" || S === "chart")
      ne(), E("all");
    else {
      const de = oe === "left" ? "chart" : "grid";
      u(de), E(de);
    }
  }
  function b() {
    f("left");
  }
  function I() {
    f("right");
  }
  const ae = T(() => _(p), [p, n, s, l]), te = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${S}`,
    m ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-pFykzMlT " + te,
      onMouseDown: ue,
      style: { width: ae.size[0], height: ae.size[1], cursor: z },
      children: [
        /* @__PURE__ */ Le("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ c("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ c(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: b
            }
          ) }),
          /* @__PURE__ */ c("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ c(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: I
            }
          ) })
        ] }),
        /* @__PURE__ */ c("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const In = 650;
function Ht(t) {
  let n;
  function s() {
    n = new ResizeObserver((r) => {
      for (let E of r)
        if (E.target === document.body) {
          let h = E.contentRect.width <= In;
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
function An(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: l,
    highlightTime: r,
    onTableAPIChange: E,
    multiTaskRows: h = !1,
    rowMapping: o = null,
    marqueeSelect: d = !1,
    copyPaste: H = !1,
    scrollToCurrentWeek: p = !1,
    currentWeekColor: j = null
  } = t, S = ze(Fe), u = X(S, "_tasks"), _ = X(S, "_scales"), m = X(S, "cellHeight"), D = X(S, "columns"), Q = X(S, "_scrollTask"), L = X(S, "undo"), G = T(() => {
    if (!h) return o;
    const v = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Map();
    return u.forEach((fe) => {
      const xe = fe.row ?? fe.id;
      Z.set(fe.id, xe), v.has(xe) || v.set(xe, []), v.get(xe).push(fe.id);
    }), { rowMap: v, taskRows: Z };
  }, [u, h, o]), [C, Y] = ge(!1);
  let [g, J] = ge(0);
  const [B, we] = ge(0), [z, ue] = ge(0), [ne, f] = ge(void 0), [b, I] = ge("all"), ae = re(null), te = R(
    (v) => {
      Y((Z) => (v !== Z && (v ? (ae.current = b, b === "all" && I("grid")) : (!ae.current || ae.current === "all") && I("all")), v));
    },
    [b]
  );
  le(() => {
    const v = Ht(te);
    return v.observe(), () => {
      v.disconnect();
    };
  }, [te]);
  const oe = T(() => {
    let v;
    return D.every((Z) => Z.width && !Z.flexgrow) ? v = D.reduce((Z, fe) => Z + parseInt(fe.width), 0) : C && b === "chart" ? v = parseInt(D.find((Z) => Z.id === "action")?.width) || 50 : v = 440, g = v, v;
  }, [D, C, b]);
  le(() => {
    J(oe);
  }, [oe]);
  const de = T(
    () => (B ?? 0) - (ne ?? 0),
    [B, ne]
  ), ye = T(() => _.width, [_]), Ee = T(() => {
    if (!h || !G)
      return u.length * m;
    const v = /* @__PURE__ */ new Set();
    return u.forEach((Z) => {
      const fe = G.taskRows.get(Z.id) ?? Z.id;
      v.add(fe);
    }), v.size * m;
  }, [u, m, h, G]), Ce = T(
    () => _.height + Ee + de,
    [_, Ee, de]
  ), Se = T(
    () => g + ye,
    [g, ye]
  ), Re = re(null), W = R(() => {
    Promise.resolve().then(() => {
      if ((B ?? 0) > (Se ?? 0)) {
        const v = (B ?? 0) - g;
        S.exec("expand-scale", { minWidth: v });
      }
    });
  }, [B, Se, g, S]);
  le(() => {
    let v;
    return Re.current && (v = new ResizeObserver(W), v.observe(Re.current)), () => {
      v && v.disconnect();
    };
  }, [Re.current, W]), le(() => {
    W();
  }, [ye]);
  const y = re(null), A = re(null), K = R(() => {
    const v = y.current;
    v && S.exec("scroll-chart", {
      top: v.scrollTop
    });
  }, [S]), q = re({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  le(() => {
    q.current = {
      rTasks: u,
      rScales: _,
      rCellHeight: m,
      scrollSize: de,
      ganttDiv: y.current,
      ganttHeight: z ?? 0
    };
  }, [u, _, m, de, z]);
  const U = R(
    (v) => {
      if (!v) return;
      const {
        rTasks: Z,
        rScales: fe,
        rCellHeight: xe,
        scrollSize: De,
        ganttDiv: w,
        ganttHeight: ie
      } = q.current;
      if (!w) return;
      const { id: pe } = v, V = Z.findIndex((F) => F.id === pe);
      if (V > -1) {
        const F = ie - fe.height, ke = V * xe, ve = w.scrollTop;
        let Ne = null;
        ke < ve ? Ne = ke : ke + xe > ve + F && (Ne = ke - F + xe + De), Ne !== null && (S.exec("scroll-chart", { top: Math.max(Ne, 0) }), y.current.scrollTop = Math.max(Ne, 0));
      }
    },
    [S]
  );
  le(() => {
    U(Q);
  }, [Q]), le(() => {
    const v = y.current, Z = A.current;
    if (!v || !Z) return;
    const fe = () => {
      wn(() => {
        ue(v.offsetHeight), we(v.offsetWidth), f(Z.offsetWidth);
      });
    }, xe = new ResizeObserver(fe);
    return xe.observe(v), () => xe.disconnect();
  }, [y.current]);
  const ce = re(null), he = re(null);
  return le(() => {
    he.current && (he.current.destroy(), he.current = null);
    const v = ce.current;
    if (v)
      return he.current = Pt(v, {
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
          "ctrl+z": L,
          "ctrl+y": L,
          "meta+z": L,
          "meta+shift+z": L
        },
        exec: (Z) => {
          Z.isInput || S.exec("hotkey", Z);
        }
      }), () => {
        he.current?.destroy(), he.current = null;
      };
  }, [L]), /* @__PURE__ */ c("div", { className: "wx-jlbQoHOz wx-gantt", ref: y, onScroll: K, children: /* @__PURE__ */ c(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Ce, width: "100%" },
      ref: A,
      children: /* @__PURE__ */ c(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: z,
            width: ne
          },
          children: /* @__PURE__ */ Le("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ce, children: [
            D.length ? /* @__PURE__ */ Le(Je, { children: [
              /* @__PURE__ */ c(
                vn,
                {
                  display: b,
                  compactMode: C,
                  columnWidth: oe,
                  width: g,
                  readonly: s,
                  fullHeight: Ee,
                  onTableAPIChange: E,
                  multiTaskRows: h,
                  rowMapping: G
                }
              ),
              /* @__PURE__ */ c(
                Ln,
                {
                  value: g,
                  display: b,
                  compactMode: C,
                  containerWidth: B,
                  onMove: (v) => J(v),
                  onDisplayChange: (v) => I(v)
                }
              )
            ] }) : null,
            /* @__PURE__ */ c("div", { className: "wx-jlbQoHOz wx-content", ref: Re, children: /* @__PURE__ */ c(
              Nn,
              {
                readonly: s,
                fullWidth: ye,
                fullHeight: Ee,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: r,
                multiTaskRows: h,
                rowMapping: G,
                marqueeSelect: d,
                copyPaste: H,
                scrollToCurrentWeek: p,
                currentWeekColor: j
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function Pn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function Hn(t, n) {
  return typeof t == "function" ? t : tt(t, n);
}
function Wt(t, n) {
  return t.map(({ format: s, ...l }) => ({
    ...l,
    format: Hn(s, n)
  }));
}
function Wn(t, n) {
  const s = Pn(n);
  for (let l in s)
    s[l] = tt(s[l], t);
  return s;
}
function zn(t, n) {
  if (!t || !t.length) return t;
  const s = tt("%d-%m-%Y", n);
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
function _n(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Wt(s.scales, n)
    }))
  } : t;
}
const Gn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Yn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], us = St(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: l = dn,
  tasks: r = [],
  selected: E = [],
  activeTask: h = null,
  links: o = [],
  scales: d = Yn,
  columns: H = un,
  start: p = null,
  end: j = null,
  lengthUnit: S = "day",
  durationUnit: u = "day",
  cellWidth: _ = 100,
  cellHeight: m = 38,
  scaleHeight: D = 36,
  readonly: Q = !1,
  cellBorders: L = "full",
  zoom: G = !1,
  baselines: C = !1,
  highlightTime: Y = null,
  init: g = null,
  autoScale: J = !0,
  unscheduledTasks: B = !1,
  criticalPath: we = null,
  schedule: z = { type: "forward" },
  projectStart: ue = null,
  projectEnd: ne = null,
  calendar: f = null,
  undo: b = !1,
  splitTasks: I = !1,
  multiTaskRows: ae = !1,
  marqueeSelect: te = !1,
  copyPaste: oe = !1,
  currentWeekHighlight: de = !1,
  currentWeekColor: ye = null,
  scrollToCurrentWeek: Ee = !1,
  ...Ce
}, Se) {
  const Re = re();
  Re.current = Ce;
  const W = T(() => new ln(hn), []), y = T(() => ({ ...it, ...st }), []), A = ze(Ye.i18n), K = T(() => A ? A.extend(y, !0) : nt(y), [A, y]), q = T(() => K.getRaw().calendar, [K]), U = T(() => {
    let F = {
      zoom: _n(G, q),
      scales: Wt(d, q),
      columns: zn(H, q),
      links: cn(o),
      cellWidth: _
    };
    return F.zoom && (F = {
      ...F,
      ...an(
        F.zoom,
        Wn(q, K.getGroup("gantt")),
        F.scales,
        _
      )
    }), F;
  }, [G, d, H, o, _, q, K]), ce = re(null);
  ce.current !== r && (kt(r, { durationUnit: u, splitTasks: I, calendar: f }), ce.current = r), le(() => {
    kt(r, { durationUnit: u, splitTasks: I, calendar: f });
  }, [r, u, f, I]);
  const he = T(() => {
    if (!ae) return null;
    const F = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map(), ve = (Ne) => {
      Ne.forEach((Te) => {
        const Ie = Te.row ?? Te.id;
        ke.set(Te.id, Ie), F.has(Ie) || F.set(Ie, []), F.get(Ie).push(Te.id), Te.data && Te.data.length > 0 && ve(Te.data);
      });
    };
    return ve(r), { rowMap: F, taskRows: ke };
  }, [r, ae]), v = T(() => W.in, [W]), Z = re(null);
  Z.current === null && (Z.current = new nn((F, ke) => {
    const ve = "on" + Gn(F);
    Re.current && Re.current[ve] && Re.current[ve](ke);
  }), v.setNext(Z.current));
  const [fe, xe] = ge(null), De = re(null);
  De.current = fe;
  const w = T(
    () => ({
      getState: W.getState.bind(W),
      getReactiveState: W.getReactive.bind(W),
      getStores: () => ({ data: W }),
      exec: v.exec,
      setNext: (F) => (Z.current = Z.current.setNext(F), Z.current),
      intercept: v.intercept.bind(v),
      on: v.on.bind(v),
      detach: v.detach.bind(v),
      getTask: W.getTask.bind(W),
      serialize: W.serialize.bind(W),
      getTable: (F) => F ? new Promise((ke) => setTimeout(() => ke(De.current), 1)) : De.current,
      getHistory: () => W.getHistory()
    }),
    [W, v]
  );
  Nt(
    Se,
    () => ({
      ...w
    }),
    [w]
  );
  const ie = re(0);
  le(() => {
    ie.current ? W.init({
      tasks: r,
      links: U.links,
      start: p,
      columns: U.columns,
      end: j,
      lengthUnit: S,
      cellWidth: U.cellWidth,
      cellHeight: m,
      scaleHeight: D,
      scales: U.scales,
      taskTypes: l,
      zoom: U.zoom,
      selected: E,
      activeTask: h,
      baselines: C,
      autoScale: J,
      unscheduledTasks: B,
      markers: s,
      durationUnit: u,
      criticalPath: we,
      schedule: z,
      projectStart: ue,
      projectEnd: ne,
      calendar: f,
      undo: b,
      _weekStart: q.weekStart,
      splitTasks: I
    }) : g && g(w), ie.current++;
  }, [
    w,
    g,
    r,
    U,
    p,
    j,
    S,
    m,
    D,
    l,
    E,
    h,
    C,
    J,
    B,
    s,
    u,
    we,
    z,
    ue,
    ne,
    f,
    b,
    q,
    I,
    W
  ]), ie.current === 0 && W.init({
    tasks: r,
    links: U.links,
    start: p,
    columns: U.columns,
    end: j,
    lengthUnit: S,
    cellWidth: U.cellWidth,
    cellHeight: m,
    scaleHeight: D,
    scales: U.scales,
    taskTypes: l,
    zoom: U.zoom,
    selected: E,
    activeTask: h,
    baselines: C,
    autoScale: J,
    unscheduledTasks: B,
    markers: s,
    durationUnit: u,
    criticalPath: we,
    schedule: z,
    projectStart: ue,
    projectEnd: ne,
    calendar: f,
    undo: b,
    _weekStart: q.weekStart,
    splitTasks: I
  });
  const pe = T(() => {
    const F = /* @__PURE__ */ new Date(), ke = q?.weekStart ?? 0, ve = new Date(F), Te = (ve.getDay() - ke + 7) % 7;
    ve.setDate(ve.getDate() - Te), ve.setHours(0, 0, 0, 0);
    const Ie = new Date(ve);
    return Ie.setDate(Ie.getDate() + 7), (qe) => qe >= ve && qe < Ie;
  }, [q]), V = T(() => (F, ke) => {
    let ve = [];
    if (f)
      ke == "day" && !f.getDayHours(F) && ve.push("wx-weekend"), ke == "hour" && !f.getDayHours(F) && ve.push("wx-weekend");
    else if (Y) {
      const Ne = Y(F, ke);
      Ne && ve.push(Ne);
    }
    return de && (ke === "week" || ke === "day") && pe(F) && ve.push("wx-current-week"), ve.join(" ");
  }, [f, Y, de, pe]);
  return /* @__PURE__ */ c(Ye.i18n.Provider, { value: K, children: /* @__PURE__ */ c(Fe.Provider, { value: w, children: /* @__PURE__ */ c(
    An,
    {
      taskTemplate: n,
      readonly: Q,
      cellBorders: L,
      highlightTime: V,
      onTableAPIChange: xe,
      multiTaskRows: ae,
      rowMapping: he,
      marqueeSelect: te,
      copyPaste: oe,
      scrollToCurrentWeek: Ee,
      currentWeekColor: ye
    }
  ) }) });
});
function ds({ api: t = null, items: n = [] }) {
  const s = ze(Ye.i18n), l = T(() => s || nt(st), [s]), r = T(() => l.getGroup("gantt"), [l]), E = Xe(t, "_selected"), h = Xe(t, "undo"), o = Xe(t, "history"), d = Xe(t, "splitTasks"), H = ["undo", "redo"], p = T(() => {
    const S = bt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : bt({
      undo: h,
      splitTasks: d
    })).map((_) => {
      let m = { ..._, disabled: !1 };
      return m.handler = At(S, m.id) ? (D) => It(t, D.id, null, r) : m.handler, m.text && (m.text = r(m.text)), m.menuText && (m.menuText = r(m.menuText)), m;
    });
  }, [n, t, r, h, d]), j = T(() => {
    const S = [];
    return p.forEach((u) => {
      const _ = u.id;
      if (_ === "add-task")
        S.push(u);
      else if (H.includes(_))
        H.includes(_) && S.push({
          ...u,
          disabled: u.isDisabled(o)
        });
      else {
        if (!E?.length || !t) return;
        S.push({
          ...u,
          disabled: u.isDisabled && E.some((m) => u.isDisabled(m, t.getState()))
        });
      }
    }), S.filter((u, _) => {
      if (t && u.isHidden)
        return !E.some((m) => u.isHidden(m, t.getState()));
      if (u.comp === "separator") {
        const m = S[_ + 1];
        if (!m || m.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, E, o, p]);
  return s ? /* @__PURE__ */ c(Tt, { items: j }) : /* @__PURE__ */ c(Ye.i18n.Provider, { value: l, children: /* @__PURE__ */ c(Tt, { items: j }) });
}
const fs = St(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: r = null,
  at: E = "point",
  children: h,
  onClick: o,
  css: d
}, H) {
  const p = re(null), j = re(null), S = ze(Ye.i18n), u = T(() => S || nt({ ...st, ...it }), [S]), _ = T(() => u.getGroup("gantt"), [u]), m = Xe(s, "taskTypes"), D = Xe(s, "selected"), Q = Xe(s, "_selected"), L = Xe(s, "splitTasks"), G = T(() => vt({ splitTasks: !0 }), []);
  le(() => {
    s && (s.on("scroll-chart", () => {
      p.current && p.current.show && p.current.show();
    }), s.on("drag-task", () => {
      p.current && p.current.show && p.current.show();
    }));
  }, [s]);
  function C(f) {
    return f.map((b) => (b = { ...b }, b.text && (b.text = _(b.text)), b.subtext && (b.subtext = _(b.subtext)), b.data && (b.data = C(b.data)), b));
  }
  function Y() {
    const f = n.length ? n : vt({ splitTasks: L }), b = f.find((I) => I.id === "convert-task");
    return b && (b.data = [], (m || []).forEach((I) => {
      b.data.push(b.dataFactory(I));
    })), C(f);
  }
  const g = T(() => Y(), [s, n, m, L, _]), J = T(
    () => Q && Q.length ? Q : [],
    [Q]
  ), B = R(
    (f, b) => {
      let I = f ? s?.getTask(f) : null;
      if (l) {
        const ae = l(f, b);
        I = ae === !0 ? I : ae;
      }
      if (I) {
        const ae = Be(b.target, "data-segment");
        ae !== null ? j.current = { id: I.id, segmentIndex: ae } : j.current = I.id, (!Array.isArray(D) || !D.includes(I.id)) && s && s.exec && s.exec("select-task", { id: I.id });
      }
      return I;
    },
    [s, l, D]
  ), we = R(
    (f) => {
      const b = f.action;
      b && (At(G, b.id) && It(s, b.id, j.current, _), o && o(f));
    },
    [s, _, o, G]
  ), z = R(
    (f, b) => {
      const I = J.length ? J : b ? [b] : [];
      let ae = r ? I.every((te) => r(f, te)) : !0;
      if (ae && (f.isHidden && (ae = !I.some(
        (te) => f.isHidden(te, s.getState(), j.current)
      )), f.isDisabled)) {
        const te = I.some(
          (oe) => f.isDisabled(oe, s.getState(), j.current)
        );
        f.disabled = te;
      }
      return ae;
    },
    [r, J, s]
  );
  Nt(H, () => ({
    show: (f, b) => {
      p.current && p.current.show && p.current.show(f, b);
    }
  }));
  const ue = R((f) => {
    p.current && p.current.show && p.current.show(f);
  }, []), ne = /* @__PURE__ */ Le(Je, { children: [
    /* @__PURE__ */ c(
      xn,
      {
        filter: z,
        options: g,
        dataKey: "id",
        resolver: B,
        onClick: we,
        at: E,
        ref: p,
        css: d
      }
    ),
    /* @__PURE__ */ c("span", { onContextMenu: ue, "data-menu-ignore": "true", children: typeof h == "function" ? h() : h })
  ] });
  if (!S && Ye.i18n?.Provider) {
    const f = Ye.i18n.Provider;
    return /* @__PURE__ */ c(f, { value: u, children: ne });
  }
  return ne;
});
function On({ api: t, autoSave: n, onLinksChange: s }) {
  const r = ze(Ye.i18n).getGroup("gantt"), E = X(t, "activeTask"), h = X(t, "_activeTask"), o = X(t, "_links"), d = X(t, "schedule"), H = X(t, "unscheduledTasks"), [p, j] = ge();
  function S() {
    if (E) {
      const D = o.filter((L) => L.target == E).map((L) => ({ link: L, task: t.getTask(L.source) })), Q = o.filter((L) => L.source == E).map((L) => ({ link: L, task: t.getTask(L.target) }));
      return [
        { title: r("Predecessors"), data: D },
        { title: r("Successors"), data: Q }
      ];
    }
  }
  le(() => {
    j(S());
  }, [E, o]);
  const u = T(
    () => [
      { id: "e2s", label: r("End-to-start") },
      { id: "s2s", label: r("Start-to-start") },
      { id: "e2e", label: r("End-to-end") },
      { id: "s2e", label: r("Start-to-end") }
    ],
    [r]
  );
  function _(D) {
    n ? t.exec("delete-link", { id: D }) : (j(
      (Q) => (Q || []).map((L) => ({
        ...L,
        data: L.data.filter((G) => G.link.id !== D)
      }))
    ), s && s({
      id: D,
      action: "delete-link",
      data: { id: D }
    }));
  }
  function m(D, Q) {
    n ? t.exec("update-link", {
      id: D,
      link: Q
    }) : (j(
      (L) => (L || []).map((G) => ({
        ...G,
        data: G.data.map(
          (C) => C.link.id === D ? { ...C, link: { ...C.link, ...Q } } : C
        )
      }))
    ), s && s({
      id: D,
      action: "update-link",
      data: {
        id: D,
        link: Q
      }
    }));
  }
  return /* @__PURE__ */ c(Je, { children: (p || []).map(
    (D, Q) => D.data.length ? /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ c(Kt, { label: D.title, position: "top", children: /* @__PURE__ */ c("table", { children: /* @__PURE__ */ c("tbody", { children: D.data.map((L) => /* @__PURE__ */ Le("tr", { children: [
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-task-name", children: L.task.text || "" }) }),
      d?.auto && L.link.type === "e2s" ? /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ c(
        qt,
        {
          type: "number",
          placeholder: r("Lag"),
          value: L.link.lag,
          disabled: H && h?.unscheduled,
          onChange: (G) => {
            G.input || m(L.link.id, { lag: G.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ c(
        Vt,
        {
          value: L.link.type,
          placeholder: r("Select link type"),
          options: u,
          onChange: (G) => m(L.link.id, { type: G.value }),
          children: ({ option: G }) => G.label
        }
      ) }) }),
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => _(L.link.id),
          role: "button"
        }
      ) })
    ] }, L.link.id)) }) }) }) }, Q) : null
  ) });
}
function Xn(t) {
  const { value: n, time: s, format: l, onchange: r, onChange: E, ...h } = t, o = E ?? r;
  function d(H) {
    const p = new Date(H.value);
    p.setHours(n.getHours()), p.setMinutes(n.getMinutes()), o && o({ value: p });
  }
  return /* @__PURE__ */ Le("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ c(
      Bt,
      {
        ...h,
        value: n,
        onChange: d,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ c(Ut, { value: n, onChange: o, format: l }) : null
  ] });
}
Ue("select", Qt);
Ue("date", Xn);
Ue("twostate", Zt);
Ue("slider", Jt);
Ue("counter", en);
Ue("links", On);
function hs({
  api: t,
  items: n = [],
  css: s = "",
  layout: l = "default",
  readonly: r = !1,
  placement: E = "sidebar",
  bottomBar: h = !0,
  topBar: o = !0,
  autoSave: d = !0,
  focus: H = !1,
  hotkeys: p = {}
}) {
  const j = ze(Ye.i18n), S = T(() => j || nt({ ...st, ...it }), [j]), u = T(() => S.getGroup("gantt"), [S]), _ = S.getRaw(), m = T(() => {
    const w = _.gantt?.dateFormat || _.formats?.dateFormat;
    return tt(w, _.calendar);
  }, [_]), D = T(() => {
    if (o === !0 && !r) {
      const w = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: u("Delete"),
          id: "delete"
        }
      ];
      return d ? { items: w } : {
        items: [
          ...w,
          {
            comp: "button",
            type: "primary",
            text: u("Save"),
            id: "save"
          }
        ]
      };
    }
    return o;
  }, [o, r, d, u]), [Q, L] = ge(!1), G = T(
    () => Q ? "wx-full-screen" : "",
    [Q]
  ), C = R((w) => {
    L(w);
  }, []);
  le(() => {
    const w = Ht(C);
    return w.observe(), () => {
      w.disconnect();
    };
  }, [C]);
  const Y = X(t, "_activeTask"), g = X(t, "activeTask"), J = X(t, "unscheduledTasks"), B = X(t, "links"), we = X(t, "splitTasks"), z = T(
    () => we && g?.segmentIndex,
    [we, g]
  ), ue = T(
    () => z || z === 0,
    [z]
  ), ne = T(
    () => fn({ unscheduledTasks: J }),
    [J]
  ), f = X(t, "undo"), [b, I] = ge({}), [ae, te] = ge(null), [oe, de] = ge(), [ye, Ee] = ge(null), Ce = X(t, "taskTypes"), Se = T(() => {
    if (!Y) return null;
    let w;
    if (ue && Y.segments ? w = { ...Y.segments[z] } : w = { ...Y }, r) {
      let ie = { parent: w.parent };
      return ne.forEach(({ key: pe, comp: V }) => {
        if (V !== "links") {
          const F = w[pe];
          V === "date" && F instanceof Date ? ie[pe] = m(F) : V === "slider" && pe === "progress" ? ie[pe] = `${F}%` : ie[pe] = F;
        }
      }), ie;
    }
    return w || null;
  }, [Y, ue, z, r, ne, m]);
  le(() => {
    de(Se);
  }, [Se]), le(() => {
    I({}), Ee(null), te(null);
  }, [g]);
  function Re(w, ie) {
    return w.map((pe) => {
      const V = { ...pe };
      if (pe.config && (V.config = { ...V.config }), V.comp === "links" && t && (V.api = t, V.autoSave = d, V.onLinksChange = A), V.comp === "select" && V.key === "type") {
        const F = V.options ?? (Ce || []);
        V.options = F.map((ke) => ({
          ...ke,
          label: u(ke.label)
        }));
      }
      return V.comp === "slider" && V.key === "progress" && (V.labelTemplate = (F) => `${u(V.label)} ${F}%`), V.label && (V.label = u(V.label)), V.config?.placeholder && (V.config.placeholder = u(V.config.placeholder)), ie && (V.isDisabled && V.isDisabled(ie, t.getState()) ? V.disabled = !0 : delete V.disabled), V;
    });
  }
  const W = T(() => {
    let w = n.length ? n : ne;
    return w = Re(w, oe), oe ? w.filter(
      (ie) => !ie.isHidden || !ie.isHidden(oe, t.getState())
    ) : w;
  }, [n, ne, oe, Ce, u, t, d]), y = T(
    () => W.map((w) => w.key),
    [W]
  );
  function A({ id: w, action: ie, data: pe }) {
    I((V) => ({
      ...V,
      [w]: { action: ie, data: pe }
    }));
  }
  const K = R(() => {
    for (let w in b)
      if (B.byId(w)) {
        const { action: ie, data: pe } = b[w];
        t.exec(ie, pe);
      }
  }, [t, b, B]), q = R(() => {
    const w = g?.id || g;
    if (ue) {
      if (Y?.segments) {
        const ie = Y.segments.filter(
          (pe, V) => V !== z
        );
        t.exec("update-task", {
          id: w,
          task: { segments: ie }
        });
      }
    } else
      t.exec("delete-task", { id: w });
  }, [t, g, ue, Y, z]), U = R(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ce = R(
    (w) => {
      const { item: ie, changes: pe } = w;
      ie.id === "delete" && q(), ie.id === "save" && (pe.length ? U() : K()), ie.comp && U();
    },
    [t, g, d, K, q, U]
  ), he = R(
    (w, ie, pe) => (J && w.type === "summary" && (w.unscheduled = !1), Lt(w, t.getState(), ie), pe || te(!1), w),
    [J, t]
  ), v = R(
    (w) => {
      w = {
        ...w,
        unscheduled: J && w.unscheduled && w.type !== "summary"
      }, delete w.links, delete w.data, (y.indexOf("duration") === -1 || w.segments && !w.duration) && delete w.duration;
      const ie = {
        id: g?.id || g,
        task: w,
        ...ue && { segmentIndex: z }
      };
      d && ae && (ie.inProgress = ae), t.exec("update-task", ie), d || K();
    },
    [
      t,
      g,
      J,
      d,
      K,
      y,
      ue,
      z,
      ae
    ]
  ), Z = R(
    (w) => {
      let { update: ie, key: pe, input: V } = w;
      if (V && te(!0), w.update = he({ ...ie }, pe, V), !d) de(w.update);
      else if (!ye && !V) {
        const F = W.find((Ne) => Ne.key === pe), ke = ie[pe];
        (!F.validation || F.validation(ke)) && (!F.required || ke) && v(w.update);
      }
    },
    [d, he, ye, W, v]
  ), fe = R(
    (w) => {
      d || v(w.values);
    },
    [d, v]
  ), xe = R((w) => {
    Ee(w.errors);
  }, []), De = T(
    () => f ? {
      "ctrl+z": (w) => {
        w.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (w) => {
        w.preventDefault(), t.exec("redo");
      }
    } : {},
    [f, t]
  );
  return Se ? /* @__PURE__ */ c(jt, { children: /* @__PURE__ */ c(
    pn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${G} ${s}`,
      items: W,
      values: Se,
      topBar: D,
      bottomBar: h,
      placement: E,
      layout: l,
      readonly: r,
      autoSave: d,
      focus: H,
      onAction: ce,
      onSave: fe,
      onValidation: xe,
      onChange: Z,
      hotkeys: p && { ...De, ...p }
    }
  ) }) : null;
}
const ms = ({ children: t, columns: n = null, api: s }) => {
  const [l, r] = ge(null);
  return le(() => {
    s && s.getTable(!0).then(r);
  }, [s]), /* @__PURE__ */ c(gn, { api: l, columns: n, children: t });
};
function gs(t) {
  const { api: n, content: s, children: l } = t, r = re(null), E = re(null), [h, o] = ge({}), [d, H] = ge(null), [p, j] = ge({});
  function S(C) {
    for (; C; ) {
      if (C.getAttribute) {
        const Y = C.getAttribute("data-tooltip-id"), g = C.getAttribute("data-tooltip-at"), J = C.getAttribute("data-tooltip");
        if (Y || J) return { id: Y, tooltip: J, target: C, at: g };
      }
      C = C.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  le(() => {
    const C = E.current;
    if (C && p && (p.text || s)) {
      const Y = C.getBoundingClientRect();
      let g = !1, J = p.left, B = p.top;
      Y.right >= h.right && (J = h.width - Y.width - 5, g = !0), Y.bottom >= h.bottom && (B = p.top - (Y.bottom - h.bottom + 2), g = !0), g && j((we) => we && { ...we, left: J, top: B });
    }
  }, [p, h, s]);
  const u = re(null), _ = 300, m = (C) => {
    clearTimeout(u.current), u.current = setTimeout(() => {
      C();
    }, _);
  };
  function D(C) {
    let { id: Y, tooltip: g, target: J, at: B } = S(C.target);
    if (j(null), H(null), !g)
      if (Y)
        g = L(Y);
      else {
        clearTimeout(u.current);
        return;
      }
    const we = C.clientX;
    m(() => {
      Y && H(Q(G(Y)));
      const z = J.getBoundingClientRect(), ue = r.current, ne = ue ? ue.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let f, b;
      B === "left" ? (f = z.top + 5 - ne.top, b = z.right + 5 - ne.left) : (f = z.top + z.height - ne.top, b = we - ne.left), o(ne), j({ top: f, left: b, text: g });
    });
  }
  function Q(C) {
    return n?.getTask(G(C)) || null;
  }
  function L(C) {
    return Q(C)?.text || "";
  }
  function G(C) {
    const Y = parseInt(C);
    return isNaN(Y) ? C : Y;
  }
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: r,
      onMouseMove: D,
      children: [
        p && (p.text || s) ? /* @__PURE__ */ c(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: E,
            style: { top: `${p.top}px`, left: `${p.left}px` },
            children: s ? /* @__PURE__ */ c(s, { data: d }) : p.text ? /* @__PURE__ */ c("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: p.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function ws({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(xt, { fonts: t, children: n() }) : /* @__PURE__ */ c(xt, { fonts: t });
}
function xs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(pt, { fonts: t, children: n }) : /* @__PURE__ */ c(pt, { fonts: t });
}
function ps({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(yt, { fonts: t, children: n }) : /* @__PURE__ */ c(yt, { fonts: t });
}
export {
  fs as ContextMenu,
  hs as Editor,
  us as Gantt,
  ms as HeaderMenu,
  ws as Material,
  ds as Toolbar,
  gs as Tooltip,
  xs as Willow,
  ps as WillowDark,
  bs as defaultColumns,
  vs as defaultEditorItems,
  Ts as defaultMenuOptions,
  $s as defaultTaskTypes,
  Ms as defaultToolbarButtons,
  Cs as getEditorItems,
  Rs as getMenuOptions,
  Ds as getToolbarButtons,
  Ns as registerEditorItem,
  Es as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
