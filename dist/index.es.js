import { jsxs as Le, jsx as c, Fragment as Ze } from "react/jsx-runtime";
import { createContext as _t, useMemo as v, useState as me, useContext as Pe, useCallback as M, useRef as ie, useEffect as le, Fragment as Yt, forwardRef as Et, useImperativeHandle as Dt } from "react";
import { context as _e, Button as xt, Field as Ft, Text as Ot, Combo as Xt, DatePicker as Kt, TimePicker as Vt, Locale as Bt, RichSelect as qt, TwoState as jt, Slider as Ut, Counter as Qt, Material as pt, Willow as kt, WillowDark as yt } from "@svar-ui/react-core";
import { locate as Ge, locateID as Ve, locateAttr as Zt, dateToString as nt, locale as st } from "@svar-ui/lib-dom";
import { en as rt } from "@svar-ui/gantt-locales";
import { en as ct } from "@svar-ui/core-locales";
import { EventBusRouter as Jt } from "@svar-ui/lib-state";
import { prepareEditTask as St, grid as en, extendDragOptions as tn, isSegmentMoveAllowed as nn, DataStore as sn, normalizeLinks as rn, normalizeZoom as on, defaultColumns as ln, parseTaskDates as bt, defaultTaskTypes as cn, getToolbarButtons as vt, handleAction as Nt, isHandledAction as Lt, getMenuOptions as Tt, getEditorItems as an } from "@svar-ui/gantt-store";
import { defaultColumns as xs, defaultEditorItems as ps, defaultMenuOptions as ks, defaultTaskTypes as ys, defaultToolbarButtons as bs, getEditorItems as vs, getMenuOptions as Ts, getToolbarButtons as $s, registerScaleUnit as Ms } from "@svar-ui/gantt-store";
import { useWritableProp as it, useStore as Y, useStoreWithCounter as tt, writable as un, useStoreLater as Fe } from "@svar-ui/lib-react";
import { hotkeys as It } from "@svar-ui/grid-store";
import { Grid as dn, HeaderMenu as fn } from "@svar-ui/react-grid";
import { flushSync as hn } from "react-dom";
import { Toolbar as $t } from "@svar-ui/react-toolbar";
import { ContextMenu as mn } from "@svar-ui/react-menu";
import { Editor as gn, registerEditorItem as Be } from "@svar-ui/react-editor";
import { registerEditorItem as Rs } from "@svar-ui/react-editor";
const Oe = _t(null);
function Xe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function wn(t, n, s) {
  const i = t.getBoundingClientRect(), r = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: i.top - r.top,
    left: i.left - r.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top
  };
}
function Mt(t) {
  return t && t.getAttribute("data-context-id");
}
const Ct = 5;
function xn(t, n) {
  let s, i, r, N, m, o, d, W, x;
  function B(g) {
    N = g.clientX, m = g.clientY, o = {
      ...wn(s, t, g),
      y: n.getTask(r).$y
    }, document.body.style.userSelect = "none";
  }
  function R(g) {
    s = Ge(g), Mt(s) && (r = Xe(s), x = setTimeout(() => {
      W = !0, n && n.touchStart && n.touchStart(), B(g.touches[0]);
    }, 500), t.addEventListener("touchmove", L), t.addEventListener("contextmenu", h), window.addEventListener("touchend", G));
  }
  function h(g) {
    if (W || x)
      return g.preventDefault(), !1;
  }
  function P(g) {
    g.which === 1 && (s = Ge(g), Mt(s) && (r = Xe(s), t.addEventListener("mousemove", q), window.addEventListener("mouseup", C), B(g)));
  }
  function f(g) {
    t.removeEventListener("mousemove", q), t.removeEventListener("touchmove", L), document.body.removeEventListener("mouseup", C), document.body.removeEventListener("touchend", G), document.body.style.userSelect = "", g && (t.removeEventListener("mousedown", P), t.removeEventListener("touchstart", R));
  }
  function E(g) {
    const te = g.clientX - N, K = g.clientY - m;
    if (!i) {
      if (Math.abs(te) < Ct && Math.abs(K) < Ct || n && n.start && n.start({ id: r, e: g }) === !1)
        return;
      i = s.cloneNode(!0), i.style.pointerEvents = "none", i.classList.add("wx-reorder-task"), i.style.position = "absolute", i.style.left = o.left + "px", i.style.top = o.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const ge = Math.round(Math.max(0, o.top + K));
      if (n && n.move && n.move({ id: r, top: ge, detail: d }) === !1)
        return;
      const z = n.getTask(r), ae = z.$y;
      if (!o.start && o.y == ae) return _();
      o.start = !0, o.y = z.$y - 4, i.style.top = ge + "px";
      const ne = document.elementFromPoint(
        g.clientX,
        g.clientY
      ), u = Ge(ne);
      if (u && u !== s) {
        const b = Xe(u), I = u.getBoundingClientRect(), ce = I.top + I.height / 2, oe = g.clientY + o.db > ce && u.nextElementSibling !== s, se = g.clientY - o.dt < ce && u.previousElementSibling !== s;
        d?.after == b || d?.before == b ? d = null : oe ? d = { id: r, after: b } : se && (d = { id: r, before: b });
      }
    }
  }
  function q(g) {
    E(g);
  }
  function L(g) {
    W ? (g.preventDefault(), E(g.touches[0])) : x && (clearTimeout(x), x = null);
  }
  function G() {
    W = null, x && (clearTimeout(x), x = null), _();
  }
  function C() {
    _();
  }
  function _() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: r, top: o.top })), r = s = i = o = d = null, f();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", P), t.addEventListener("touchstart", R), {
    destroy() {
      f(!0);
    }
  };
}
function pn({ row: t, column: n }) {
  function s(r, N) {
    return {
      justifyContent: N.align,
      paddingLeft: `${(r.$level - 1) * 20}px`
    };
  }
  const i = n && n._cell;
  return /* @__PURE__ */ Le("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
    t.data || t.lazy ? /* @__PURE__ */ c(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ c("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ c("div", { className: "wx-pqc08MHU wx-text", children: i ? /* @__PURE__ */ c(i, { row: t, column: n }) : t.text })
  ] });
}
function Rt({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ c("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ c(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function kn(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: r = "all",
    columnWidth: N = 0,
    onTableAPIChange: m,
    multiTaskRows: o = !1,
    rowMapping: d = null
  } = t, [W, x] = it(N), [B, R] = me(), h = Pe(_e.i18n), P = v(() => h.getGroup("gantt"), [h]), f = Pe(Oe), E = Y(f, "scrollTop"), q = Y(f, "cellHeight"), L = Y(f, "_scrollTask"), G = Y(f, "_selected"), C = Y(f, "area"), _ = Y(f, "_tasks"), g = Y(f, "_scales"), te = Y(f, "columns"), K = Y(f, "_sort"), ge = Y(f, "calendar"), z = Y(f, "durationUnit"), ae = Y(f, "splitTasks"), [ne, u] = me(null), b = v(() => !_ || !C ? [] : o && d ? _ : _.slice(C.start, C.end), [_, C, o, d]), I = M(
    (l, k) => {
      if (k === "add-task")
        f.exec(k, {
          target: l,
          task: { text: P("New Task") },
          mode: "child",
          show: !0
        });
      else if (k === "open-task") {
        const D = b.find((Q) => Q.id === l);
        (D?.data || D?.lazy) && f.exec(k, { id: l, mode: !D.open });
      }
    },
    [b]
  ), ce = M(
    (l) => {
      const k = Ve(l), D = l.target.dataset.action;
      D && l.preventDefault(), k ? D === "add-task" || D === "open-task" ? I(k, D) : f.exec("select-task", {
        id: k,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : D === "add-task" && I(null, D);
    },
    [f, I]
  ), oe = ie(null), se = ie(null), [ue, pe] = me(0), [De, Ce] = me(!1);
  le(() => {
    const l = se.current;
    if (!l || typeof ResizeObserver > "u") return;
    const k = () => pe(l.clientWidth);
    k();
    const D = new ResizeObserver(k);
    return D.observe(l), () => D.disconnect();
  }, []);
  const Se = ie(null), Re = M(
    (l) => {
      const k = l.id, { before: D, after: Q } = l, we = l.onMove;
      let he = D || Q, Ee = D ? "before" : "after";
      if (we) {
        if (Ee === "after") {
          const We = f.getTask(he);
          We.data?.length && We.open && (Ee = "before", he = We.data[0].id);
        }
        Se.current = { id: k, [Ee]: he };
      } else Se.current = null;
      f.exec("move-task", {
        id: k,
        mode: Ee,
        target: he,
        inProgress: we
      });
    },
    [f]
  ), A = v(() => C?.from ?? 0, [C]), p = v(() => g?.height ?? 0, [g]), H = v(() => !s && r !== "grid" ? (W ?? 0) > (i ?? 0) : (W ?? 0) > (ue ?? 0), [s, r, W, i, ue]), J = v(() => {
    const l = {};
    return H && r === "all" || r === "grid" && H ? l.width = W : r === "grid" && (l.width = "100%"), l;
  }, [H, r, W]), j = v(() => ne && !b.find((l) => l.id === ne.id) ? [...b, ne] : b, [b, ne]), O = v(() => {
    if (!o || !d) return j;
    const l = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set();
    return j.forEach((D) => {
      const Q = d.taskRows.get(D.id) ?? D.id;
      k.has(Q) || (l.set(Q, {
        ...D,
        $rowTasks: d.rowMap.get(Q) || [D.id]
      }), k.add(Q));
    }), Array.from(l.values());
  }, [j, o, d]), Z = v(() => {
    let l = (te || []).map((Q) => {
      Q = { ...Q };
      const we = Q.header;
      if (typeof we == "object") {
        const he = we.text && P(we.text);
        Q.header = { ...we, text: he };
      } else Q.header = P(we);
      return Q;
    });
    const k = l.findIndex((Q) => Q.id === "text"), D = l.findIndex((Q) => Q.id === "add-task");
    if (k !== -1 && (l[k].cell && (l[k]._cell = l[k].cell), l[k].cell = pn), D !== -1) {
      l[D].cell = l[D].cell || Rt;
      const Q = l[D].header;
      if (typeof Q != "object" && (l[D].header = { text: Q }), l[D].header.cell = Q.cell || Rt, n)
        l.splice(D, 1);
      else if (s) {
        const [we] = l.splice(D, 1);
        l.unshift(we);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [te, P, n, s]), Te = v(() => r === "all" ? `${i}px` : r === "grid" ? "calc(100% - 4px)" : Z.find((l) => l.id === "add-task") ? "50px" : "0", [r, i, Z]), T = v(() => {
    if (O && K?.length) {
      const l = {};
      return K.forEach(({ key: k, order: D }, Q) => {
        l[k] = {
          order: D,
          ...K.length > 1 && { index: Q }
        };
      }), l;
    }
    return {};
  }, [O, K]), X = M(() => Z.some((l) => l.flexgrow && !l.hidden), []), de = v(() => X(), [X, De]), fe = v(() => {
    let l = r === "chart" ? Z.filter((D) => D.id === "add-task") : Z;
    const k = r === "all" ? i : ue;
    if (!de) {
      let D = W, Q = !1;
      if (Z.some((we) => we.$width)) {
        let we = 0;
        D = Z.reduce((he, Ee) => (Ee.hidden || (we += Ee.width, he += Ee.$width || Ee.width), he), 0), we > D && D > k && (Q = !0);
      }
      if (Q || D < k) {
        let we = 1;
        return Q || (we = (k - 50) / (D - 50 || 1)), l.map((he) => (he.id !== "add-task" && !he.hidden && (he.$width || (he.$width = he.width), he.width = he.$width * we), he));
      }
    }
    return l;
  }, [r, Z, de, W, i, ue]), Ie = M(
    (l) => {
      if (!X()) {
        const k = fe.reduce((D, Q) => (l && Q.$width && (Q.$width = Q.width), D + (Q.hidden ? 0 : Q.width)), 0);
        k !== W && x(k);
      }
      Ce(!0), Ce(!1);
    },
    [X, fe, W, x]
  ), w = M(() => {
    Z.filter((k) => k.flexgrow && !k.hidden).length === 1 && Z.forEach((k) => {
      k.$width && !k.flexgrow && !k.hidden && (k.width = k.$width);
    });
  }, []), re = M(
    (l) => {
      if (!n) {
        const k = Ve(l), D = Zt(l, "data-col-id");
        !(D && Z.find((we) => we.id == D))?.editor && k && f.exec("show-editor", { id: k });
      }
    },
    [f, n]
    // cols is defined later; relies on latest value at call time
  ), ke = v(
    () => Array.isArray(G) ? G.map((l) => l.id) : [],
    [G]
  ), F = M(() => {
    if (oe.current && O !== null) {
      const l = oe.current.querySelector(".wx-body");
      l && (l.style.top = -((E ?? 0) - (A ?? 0)) + "px");
    }
    se.current && (se.current.scrollTop = 0);
  }, [O, E, A]);
  le(() => {
    oe.current && F();
  }, [E, A, F]), le(() => {
    const l = oe.current;
    if (!l) return;
    const k = l.querySelector(".wx-table-box .wx-body");
    if (!k || typeof ResizeObserver > "u") return;
    const D = new ResizeObserver(() => {
      F();
    });
    return D.observe(k), () => {
      D.disconnect();
    };
  }, [fe, J, r, Te, O, F]), le(() => {
    if (!L || !B) return;
    const { id: l } = L, k = B.getState().focusCell;
    k && k.row !== l && oe.current && oe.current.contains(document.activeElement) && B.exec("focus-cell", {
      row: l,
      column: k.column
    });
  }, [L, B]);
  const U = M(
    ({ id: l }) => {
      if (n) return !1;
      f.getTask(l).open && f.exec("open-task", { id: l, mode: !1 });
      const k = f.getState()._tasks.find((D) => D.id === l);
      if (u(k || null), !k) return !1;
    },
    [f, n]
  ), be = M(
    ({ id: l, top: k }) => {
      Se.current ? Re({ ...Se.current, onMove: !1 }) : f.exec("drag-task", {
        id: l,
        top: k + (A ?? 0),
        inProgress: !1
      }), u(null);
    },
    [f, Re, A]
  ), ve = M(
    ({ id: l, top: k, detail: D }) => {
      D && Re({ ...D, onMove: !0 }), f.exec("drag-task", {
        id: l,
        top: k + (A ?? 0),
        inProgress: !0
      });
    },
    [f, Re, A]
  );
  le(() => {
    const l = oe.current;
    return l ? xn(l, {
      start: U,
      end: be,
      move: ve,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, U, be, ve]);
  const Me = M(
    (l) => {
      const { key: k, isInput: D } = l;
      if (!D && (k === "arrowup" || k === "arrowdown"))
        return l.eventSource = "grid", f.exec("hotkey", l), !1;
      if (k === "enter") {
        const Q = B?.getState().focusCell;
        if (Q) {
          const { row: we, column: he } = Q;
          he === "add-task" ? I(we, "add-task") : he === "text" && I(we, "open-task");
        }
      }
    },
    [f, I, B]
  ), $e = ie(null), He = () => {
    $e.current = {
      setTableAPI: R,
      handleHotkey: Me,
      sortVal: K,
      api: f,
      adjustColumns: w,
      setColumnWidth: Ie,
      tasks: b,
      calendarVal: ge,
      durationUnitVal: z,
      splitTasksVal: ae,
      onTableAPIChange: m
    };
  };
  He(), le(() => {
    He();
  }, [
    R,
    Me,
    K,
    f,
    w,
    Ie,
    b,
    ge,
    z,
    ae,
    m
  ]);
  const Ke = M((l) => {
    R(l), l.intercept("hotkey", (k) => $e.current.handleHotkey(k)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (k) => {
      const D = $e.current.sortVal, { key: Q, add: we } = k, he = D ? D.find((We) => We.key === Q) : null;
      let Ee = "asc";
      return he && (Ee = !he || he.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: Q,
        order: Ee,
        add: we
      }), !1;
    }), l.on("resize-column", () => {
      $e.current.setColumnWidth(!0);
    }), l.on("hide-column", (k) => {
      k.mode || $e.current.adjustColumns(), $e.current.setColumnWidth();
    }), l.intercept("update-cell", (k) => {
      const { id: D, column: Q, value: we } = k, he = $e.current.tasks.find((Ee) => Ee.id === D);
      if (he) {
        const Ee = { ...he };
        let We = we;
        We && !isNaN(We) && !(We instanceof Date) && (We *= 1), Ee[Q] = We, St(
          Ee,
          {
            calendar: $e.current.calendarVal,
            durationUnit: $e.current.durationUnitVal,
            splitTasks: $e.current.splitTasksVal
          },
          Q
        ), f.exec("update-task", {
          id: D,
          task: Ee
        });
      }
      return !1;
    }), m && m(l);
  }, []);
  return /* @__PURE__ */ c(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Te}` },
      ref: se,
      children: /* @__PURE__ */ c(
        "div",
        {
          ref: oe,
          style: J,
          className: "wx-rHj6070p wx-table",
          onClick: ce,
          onDoubleClick: re,
          children: /* @__PURE__ */ c(
            dn,
            {
              init: Ke,
              sizes: {
                rowHeight: q,
                headerHeight: (p ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: O,
              columns: fe,
              selectedRows: [...ke],
              sortMarks: T
            }
          )
        }
      )
    }
  );
}
function yn({ borders: t = "" }) {
  const n = Pe(Oe), s = Y(n, "cellWidth"), i = Y(n, "cellHeight"), r = ie(null), [N, m] = me("#e4e4e4");
  le(() => {
    if (typeof getComputedStyle < "u" && r.current) {
      const d = getComputedStyle(r.current).getPropertyValue(
        "--wx-gantt-border"
      );
      m(d ? d.substring(d.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const o = {
    width: "100%",
    height: "100%",
    background: s != null && i != null ? `url(${en(s, i, N, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ c("div", { ref: r, style: o });
}
function bn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = Pe(Oe), r = Y(i, "_links"), N = Y(i, "criticalPath"), m = ie(null), o = M(
    (d) => {
      const W = d?.target?.classList;
      !W?.contains("wx-line") && !W?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return le(() => {
    if (!s && n && m.current) {
      const d = (W) => {
        m.current && !m.current.contains(W.target) && o(W);
      };
      return document.addEventListener("click", d), () => {
        document.removeEventListener("click", d);
      };
    }
  }, [s, n, o]), /* @__PURE__ */ Le("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (r || []).map((d) => {
      const W = "wx-dkx3NwEn wx-line" + (N && d.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ c(
        "polyline",
        {
          className: W,
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
        ref: m,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function vn(t) {
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
    let d = 0, W = 0, x = null;
    do {
      const B = o[W];
      W === N && (d > m ? x = 0 : x = Math.min((m - d) / B.duration, 1) * 100), d += B.duration, W++;
    } while (x === null && W < o.length);
    return x || 0;
  }
  return /* @__PURE__ */ c("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((N, m) => /* @__PURE__ */ Le(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": m,
      style: i(m),
      children: [
        n.progress ? /* @__PURE__ */ c("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ c(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${r(m)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ c("div", { className: "wx-content", children: N.text || "" })
      ]
    },
    m
  )) });
}
let et = [], lt = null, Qe = null;
const Tn = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: i, lengthUnit: r } = n, N = 864e5, m = r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1, o = Math.floor(t / i);
  return new Date(s.getTime() + o * m * N);
};
function $n(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: i = !1,
    rowMapping: r = null,
    marqueeSelect: N = !1,
    copyPaste: m = !1
  } = t, o = Pe(Oe), [d, W] = tt(o, "_tasks"), [x, B] = tt(o, "_links"), R = Y(o, "area"), h = Y(o, "_scales"), P = Y(o, "taskTypes"), f = Y(o, "baselines"), [E, q] = tt(o, "_selected"), L = Y(o, "_scrollTask"), G = Y(o, "criticalPath"), C = Y(o, "tasks"), _ = Y(o, "schedule"), g = Y(o, "splitTasks"), te = v(() => {
    if (!R || !Array.isArray(d)) return [];
    const e = R.start ?? 0, a = R.end ?? 0;
    return i && r ? d.map((y) => ({ ...y })) : d.slice(e, a).map((y) => ({ ...y }));
  }, [W, R, i, r]), K = Y(o, "cellHeight"), ge = v(() => {
    if (!i || !r || !te.length) return te;
    const e = /* @__PURE__ */ new Map(), a = [];
    return d.forEach((y) => {
      const $ = r.taskRows.get(y.id) ?? y.id;
      e.has($) || (e.set($, a.length), a.push($));
    }), te.map((y) => {
      const $ = r.taskRows.get(y.id) ?? y.id, S = e.get($) ?? 0;
      return {
        ...y,
        $y: S * K,
        $y_base: y.$y_base !== void 0 ? S * K : void 0
      };
    });
  }, [te, i, r, d, K]), z = v(
    () => h.lengthUnitWidth,
    [h]
  ), ae = v(
    () => h.lengthUnit || "day",
    [h]
  ), ne = ie(!1), [u, b] = me(void 0), [I, ce] = me(null), oe = ie(null), [se, ue] = me(null), [pe, De] = me(void 0), Ce = ie(null), [Se, Re] = me(0), [A, p] = me(null), [H, J] = me(null), [j, O] = me(null), Z = ie(null), Te = v(() => {
    const e = Z.current;
    return !!(E.length && e && e.contains(document.activeElement));
  }, [E, Z.current]), T = v(() => Te && E[E.length - 1]?.id, [Te, E]);
  le(() => {
    if (L && Te && L) {
      const { id: e } = L, a = Z.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      a && a.focus({ preventScroll: !0 });
    }
  }, [L]), le(() => {
    const e = Z.current;
    if (e && (Re(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const a = new ResizeObserver((y) => {
        y[0] && Re(y[0].contentRect.width);
      });
      return a.observe(e), () => a.disconnect();
    }
  }, [Z.current]);
  const X = M(() => {
    document.body.style.userSelect = "none";
  }, []), de = M(() => {
    document.body.style.userSelect = "";
  }, []), fe = M(
    (e, a, y) => {
      if (a.target.classList.contains("wx-line") || (y || (y = o.getTask(Xe(e))), y.type === "milestone" || y.type === "summary")) return "";
      const $ = Ge(a, "data-segment");
      $ && (e = $);
      const { left: S, width: V } = e.getBoundingClientRect(), ee = (a.clientX - S) / V;
      let ye = 0.2 / (V > 200 ? V / 200 : 1);
      return ee < ye ? "start" : ee > 1 - ye ? "end" : "";
    },
    [o]
  ), Ie = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !r)
      return d.forEach(($) => {
        e.set($.id, $.$y);
      }), e;
    const a = /* @__PURE__ */ new Map(), y = [];
    return d.forEach(($) => {
      const S = r.taskRows.get($.id) ?? $.id;
      a.has(S) || (a.set(S, y.length), y.push(S));
    }), d.forEach(($) => {
      const S = r.taskRows.get($.id) ?? $.id, V = a.get(S) ?? 0;
      e.set($.id, V * K);
    }), e;
  }, [d, i, r, K]), w = M(
    (e) => {
      const a = Z.current;
      if (!a) return [];
      const y = a.parentElement?.scrollLeft || 0, $ = a.parentElement?.parentElement?.scrollTop || 0, S = Math.min(e.startX, e.currentX), V = Math.max(e.startX, e.currentX), ee = Math.min(e.startY, e.currentY), ye = Math.max(e.startY, e.currentY);
      return d.filter((xe) => {
        const Ae = xe.$x - y, ze = xe.$x + xe.$w - y, Ye = (Ie.get(xe.id) ?? xe.$y) - $, Ne = Ye + xe.$h;
        return Ae < V && ze > S && Ye < ye && Ne > ee;
      });
    },
    [d, Ie]
  ), re = v(() => new Set(E.map((e) => e.id)), [E, q]), ke = M(
    (e) => re.has(e),
    [re]
  ), F = M(
    (e, a) => {
      const { clientX: y } = a, $ = Xe(e), S = o.getTask($), V = a.target.classList;
      if (!a.target.closest(".wx-delete-button") && !n) {
        if (V.contains("wx-progress-marker")) {
          const { progress: ee } = o.getTask($);
          oe.current = {
            id: $,
            x: y,
            progress: ee,
            dx: 0,
            node: e,
            marker: a.target
          }, a.target.classList.add("wx-progress-in-drag");
        } else {
          const ee = fe(e, a, S) || "move", ye = {
            id: $,
            mode: ee,
            x: y,
            dx: 0,
            l: S.$x,
            w: S.$w
          };
          if (g && S.segments?.length) {
            const xe = Ge(a, "data-segment");
            xe && (ye.segmentIndex = xe.dataset.segment * 1, tn(S, ye));
          }
          ce(ye);
        }
        X();
      }
    },
    [o, n, fe, X, g]
  ), U = M(
    (e) => {
      if (e.button !== 0) return;
      const a = Ge(e);
      if (!a && N && !n) {
        const y = Z.current;
        if (!y) return;
        const $ = y.getBoundingClientRect(), S = e.clientX - $.left, V = e.clientY - $.top;
        if (m) {
          const ee = y.parentElement?.scrollLeft || 0, ye = S + ee, xe = Tn(ye, h);
          xe && O(xe);
        }
        p({
          startX: S,
          startY: V,
          currentX: S,
          currentY: V,
          ctrlKey: e.ctrlKey || e.metaKey
        }), X();
        return;
      }
      if (a) {
        if (N && !n && E.length > 1) {
          const y = Xe(a);
          if (ke(y)) {
            const $ = e.target.classList;
            if (!$.contains("wx-link") && !$.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const S = o.getTask(y);
              if (!fe(a, e, S)) {
                const ee = /* @__PURE__ */ new Map();
                E.forEach((ye) => {
                  const xe = o.getTask(ye.id);
                  if (xe) {
                    if (_?.auto && xe.type === "summary") return;
                    ee.set(ye.id, {
                      $x: xe.$x,
                      $w: xe.$w,
                      start: xe.start,
                      end: xe.end
                    });
                  }
                }), J({
                  baseTaskId: y,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: ee
                }), X();
                return;
              }
            }
          }
        }
        F(a, e);
      }
    },
    [F, N, m, n, E, ke, o, fe, _, X, h]
  ), be = M(
    (e) => {
      const a = Ge(e);
      a && (Ce.current = setTimeout(() => {
        De(!0), F(a, e.touches[0]);
      }, 300));
    },
    [F]
  ), ve = M(
    (e) => {
      ue(e && { ...x.find((a) => a.id === e) });
    },
    [x]
  ), Me = M(() => {
    if (A) {
      const e = w(A);
      A.ctrlKey ? e.forEach((a) => {
        o.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (E.length > 0 && o.exec("select-task", { id: null, marquee: !0 }), e.forEach((a, y) => {
        o.exec("select-task", {
          id: a.id,
          toggle: y > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), p(null), de(), ne.current = !0;
      return;
    }
    if (H) {
      const { dx: e, originalPositions: a } = H, y = Math.round(e / z);
      if (y !== 0) {
        let $ = !0;
        a.forEach((S, V) => {
          const ee = o.getTask(V);
          ee && (o.exec("update-task", {
            id: V,
            diff: y,
            task: { start: ee.start, end: ee.end },
            skipUndo: !$
            // Only first task creates undo entry
          }), $ = !1);
        }), ne.current = !0;
      } else
        a.forEach(($, S) => {
          o.exec("drag-task", {
            id: S,
            left: $.$x,
            width: $.$w,
            inProgress: !1
          });
        });
      J(null), de();
      return;
    }
    if (oe.current) {
      const { dx: e, id: a, marker: y, value: $ } = oe.current;
      oe.current = null, typeof $ < "u" && e && o.exec("update-task", {
        id: a,
        task: { progress: $ },
        inProgress: !1
      }), y.classList.remove("wx-progress-in-drag"), ne.current = !0, de();
    } else if (I) {
      const { id: e, mode: a, dx: y, l: $, w: S, start: V, segment: ee, index: ye } = I;
      if (ce(null), V) {
        const xe = Math.round(y / z);
        if (!xe)
          o.exec("drag-task", {
            id: e,
            width: S,
            left: $,
            inProgress: !1,
            ...ee && { segmentIndex: ye }
          });
        else {
          let Ae = {}, ze = o.getTask(e);
          ee && (ze = ze.segments[ye]);
          const qe = 1440 * 60 * 1e3, Ne = xe * (ae === "week" ? 7 : ae === "month" ? 30 : ae === "quarter" ? 91 : ae === "year" ? 365 : 1) * qe;
          a === "move" ? (Ae.start = new Date(ze.start.getTime() + Ne), Ae.end = new Date(ze.end.getTime() + Ne)) : a === "start" ? (Ae.start = new Date(ze.start.getTime() + Ne), Ae.end = ze.end) : a === "end" && (Ae.start = ze.start, Ae.end = new Date(ze.end.getTime() + Ne)), o.exec("update-task", {
            id: e,
            task: Ae,
            ...ee && { segmentIndex: ye }
          });
        }
        ne.current = !0;
      }
      de();
    }
  }, [o, de, I, z, ae, A, H, w, E]), $e = M(
    (e, a) => {
      const { clientX: y, clientY: $ } = a;
      if (!n) {
        if (A) {
          const S = Z.current;
          if (!S) return;
          const V = S.getBoundingClientRect(), ee = y - V.left, ye = $ - V.top;
          p((xe) => ({
            ...xe,
            currentX: ee,
            currentY: ye
          }));
          return;
        }
        if (H) {
          const S = y - H.startX;
          H.originalPositions.forEach((V, ee) => {
            const ye = V.$x + S;
            o.exec("drag-task", {
              id: ee,
              left: ye,
              width: V.$w,
              inProgress: !0
            });
          }), J((V) => ({ ...V, dx: S }));
          return;
        }
        if (oe.current) {
          const { node: S, x: V, id: ee } = oe.current, ye = oe.current.dx = y - V, xe = Math.round(ye / S.offsetWidth * 100);
          let Ae = oe.current.progress + xe;
          oe.current.value = Ae = Math.min(
            Math.max(0, Ae),
            100
          ), o.exec("update-task", {
            id: ee,
            task: { progress: Ae },
            inProgress: !0
          });
        } else if (I) {
          ve(null);
          const { mode: S, l: V, w: ee, x: ye, id: xe, start: Ae, segment: ze, index: qe } = I, Ye = o.getTask(xe), Ne = y - ye;
          if (!Ae && Math.abs(Ne) < 20 || S === "start" && ee - Ne < z || S === "end" && ee + Ne < z || S === "move" && (Ne < 0 && V + Ne < 0 || Ne > 0 && V + ee + Ne > Se) || I.segment && !nn(Ye, I))
            return;
          const Je = { ...I, dx: Ne };
          let je, Ue;
          if (S === "start" ? (je = V + Ne, Ue = ee - Ne) : S === "end" ? (je = V, Ue = ee + Ne) : S === "move" && (je = V + Ne, Ue = ee), o.exec("drag-task", {
            id: xe,
            width: Ue,
            left: je,
            inProgress: !0,
            ...ze && { segmentIndex: qe }
          }), !Je.start && (S === "move" && Ye.$x == V || S !== "move" && Ye.$w == ee)) {
            ne.current = !0, Me();
            return;
          }
          Je.start = !0, ce(Je);
        } else {
          const S = Ge(e);
          if (S) {
            const V = o.getTask(Xe(S)), ye = Ge(e, "data-segment") || S, xe = fe(ye, a, V);
            ye.style.cursor = xe && !n ? "col-resize" : "pointer";
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
      fe,
      ve,
      Me,
      A,
      H
    ]
  ), He = M(
    (e) => {
      $e(e, e);
    },
    [$e]
  ), Ke = M(
    (e) => {
      pe ? (e.preventDefault(), $e(e, e.touches[0])) : Ce.current && (clearTimeout(Ce.current), Ce.current = null);
    },
    [pe, $e]
  ), l = M(() => {
    Me();
  }, [Me]), k = M(() => {
    De(null), Ce.current && (clearTimeout(Ce.current), Ce.current = null), Me();
  }, [Me]);
  le(() => (window.addEventListener("mouseup", l), () => {
    window.removeEventListener("mouseup", l);
  }), [l]);
  const D = M(
    (e) => {
      if (!n) {
        const a = Ve(e.target);
        if (a && !e.target.classList.contains("wx-link")) {
          const y = Ve(e.target, "data-segment");
          o.exec("show-editor", {
            id: a,
            ...y !== null && { segmentIndex: y }
          });
        }
      }
    },
    [o, n]
  ), Q = ["e2s", "s2s", "e2e", "s2e"], we = M((e, a) => Q[(e ? 1 : 0) + (a ? 0 : 2)], []), he = M(
    (e, a) => {
      const y = u.id, $ = u.start;
      return e === y ? !0 : !!x.find((S) => S.target == e && S.source == y && S.type === we($, a));
    },
    [u, B, we]
  ), Ee = M(() => {
    u && b(null);
  }, [u]), We = M(
    (e) => {
      if (ne.current) {
        ne.current = !1;
        return;
      }
      const a = Ve(e.target);
      if (a) {
        const y = e.target.classList;
        if (y.contains("wx-link")) {
          const $ = y.contains("wx-left");
          if (!u) {
            b({ id: a, start: $ });
            return;
          }
          u.id !== a && !he(a, $) && o.exec("add-link", {
            link: {
              source: u.id,
              target: a,
              type: we(u.start, $)
            }
          });
        } else if (y.contains("wx-delete-button-icon"))
          o.exec("delete-link", { id: se.id }), ue(null);
        else {
          let $;
          const S = Ge(e, "data-segment");
          S && ($ = S.dataset.segment * 1), o.exec("select-task", {
            id: a,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: $
          });
        }
      }
      Ee();
    },
    [
      o,
      u,
      B,
      se,
      he,
      we,
      Ee
    ]
  ), Wt = M((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), zt = M((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Pt = M(
    (e) => {
      if (pe || Ce.current)
        return e.preventDefault(), !1;
    },
    [pe]
  ), at = v(
    () => P.map((e) => e.id),
    [P]
  ), ut = M(
    (e) => {
      let a = at.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (a = `task ${a}`), a;
    },
    [at]
  ), dt = M(
    (e) => {
      o.exec(e.action, e.data);
    },
    [o]
  ), ot = M(
    (e) => G && C.byId(e).$critical,
    [G, C]
  ), ft = M(
    (e) => {
      if (_?.auto) {
        const a = C.getSummaryId(e, !0), y = C.getSummaryId(u.id, !0);
        return u?.id && !(Array.isArray(a) ? a : [a]).includes(
          u.id
        ) && !(Array.isArray(y) ? y : [y]).includes(e);
      }
      return u;
    },
    [_, C, u]
  ), ht = ie(null);
  ht.current = j;
  const mt = M(() => {
    const e = o.getState()._selected;
    if (!e || !e.length) return;
    const a = e.map((V) => {
      const ee = o.getTask(V.id);
      if (!ee) return null;
      const { $x: ye, $y: xe, $w: Ae, $h: ze, $skip: qe, $level: Ye, $index: Ne, $y_base: Je, $x_base: je, $w_base: Ue, $h_base: Yn, $skip_baseline: Fn, $critical: On, $reorder: Xn, ...Gt } = ee;
      return Gt;
    }).filter(Boolean);
    if (!a.length) return;
    const $ = a[0].parent, S = a.filter((V) => V.parent === $);
    S.length !== 0 && (et = S, Qe = $, lt = et.reduce((V, ee) => ee.start && (!V || ee.start < V) ? ee.start : V, null));
  }, [o]), gt = M(() => {
    const e = ht.current;
    if (!et.length || !e || !lt || Qe == null) return;
    const a = e.getTime() - lt.getTime(), y = o.getHistory();
    y?.startBatch(), et.forEach(($, S) => {
      const V = `task-${Date.now()}-${S}`, ee = $.start ? new Date($.start.getTime() + a) : null, ye = $.end ? new Date($.end.getTime() + a) : null;
      o.exec("add-task", {
        task: {
          ...$,
          id: V,
          start: ee,
          end: ye,
          // Keep original parent and row from copied task
          parent: Qe,
          row: $.row
          // Each task keeps its own row
        },
        target: Qe,
        mode: "child",
        skipUndo: S > 0
      });
    }), y?.endBatch();
  }, [o]);
  le(() => m ? o.intercept("hotkey", (a) => {
    if (a.key === "ctrl+c" || a.key === "meta+c")
      return mt(), !1;
    if (a.key === "ctrl+v" || a.key === "meta+v")
      return gt(), !1;
  }) : void 0, [m, o, mt, gt]);
  const wt = v(() => {
    if (!A) return null;
    const e = Math.min(A.startX, A.currentX), a = Math.min(A.startY, A.currentY), y = Math.abs(A.currentX - A.startX), $ = Math.abs(A.currentY - A.startY);
    return {
      left: `${e}px`,
      top: `${a}px`,
      width: `${y}px`,
      height: `${$}px`
    };
  }, [A]);
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${ge.length ? ge[0].$h : 0}px` },
      ref: Z,
      onContextMenu: Pt,
      onMouseDown: U,
      onMouseMove: He,
      onTouchStart: be,
      onTouchMove: Ke,
      onTouchEnd: k,
      onClick: We,
      onDoubleClick: D,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ c(
          bn,
          {
            onSelectLink: ve,
            selectedLink: se,
            readonly: n
          }
        ),
        ge.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const a = `wx-bar wx-${ut(e.type)}` + (pe && I && e.id === I.id ? " wx-touch" : "") + (u && u.id === e.id ? " wx-selected" : "") + (re.has(e.id) ? " wx-selected" : "") + (ot(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (g && e.segments ? " wx-split" : ""), y = "wx-link wx-left" + (u ? " wx-visible" : "") + (!u || !he(e.id, !0) && ft(e.id) ? " wx-target" : "") + (u && u.id === e.id && u.start ? " wx-selected" : "") + (ot(e.id) ? " wx-critical" : ""), $ = "wx-link wx-right" + (u ? " wx-visible" : "") + (!u || !he(e.id, !1) && ft(e.id) ? " wx-target" : "") + (u && u.id === e.id && !u.start ? " wx-selected" : "") + (ot(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Le(Yt, { children: [
            !e.$skip && /* @__PURE__ */ Le(
              "div",
              {
                className: "wx-GKbcLEGA " + a,
                style: Wt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: T === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === se?.target && se?.type[2] === "s" ? /* @__PURE__ */ c(
                    xt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ c("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA " + y, children: /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Le(Ze, { children: [
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
                    s ? /* @__PURE__ */ c(s, { data: e, api: o, onAction: dt }) : g && e.segments ? /* @__PURE__ */ c(vn, { task: e, type: ut(e.type) }) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ Le(Ze, { children: [
                    /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ c(s, { data: e, api: o, onAction: dt }) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === se?.target && se?.type[2] === "e" ? /* @__PURE__ */ c(
                    xt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ c("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA " + $, children: /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            f && !e.$skip_baseline ? /* @__PURE__ */ c(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: zt(e)
              }
            ) : null
          ] }, e.id);
        }),
        A && wt && /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: wt })
      ]
    }
  );
}
function Mn(t) {
  const { highlightTime: n } = t, s = Pe(Oe), i = Y(s, "_scales");
  return /* @__PURE__ */ c("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((r, N) => /* @__PURE__ */ c(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${r.height}px` },
      children: (r.cells || []).map((m, o) => {
        const d = n ? n(m.date, m.unit) : "", W = "wx-cell " + (m.css || "") + " " + (d || ""), x = typeof m.value == "string" && m.value.includes("<");
        return /* @__PURE__ */ c(
          "div",
          {
            className: "wx-ZkvhDKir " + W,
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
const Cn = /* @__PURE__ */ new Map();
function Rn(t) {
  const n = ie(null), s = ie(0), i = ie(null), r = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, le(() => {
    if (r)
      return cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
        const N = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        Cn.set(t, N), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: N })
        );
      }), () => cancelAnimationFrame(i.current);
  });
}
function En(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: i,
    taskTemplate: r,
    cellBorders: N,
    highlightTime: m,
    multiTaskRows: o = !1,
    rowMapping: d = null,
    marqueeSelect: W = !1,
    copyPaste: x = !1,
    scrollToCurrentWeek: B = !1,
    currentWeekColor: R = null
  } = t, h = Pe(Oe), [P, f] = tt(h, "_selected"), E = Y(h, "scrollTop"), q = Y(h, "cellHeight"), L = Y(h, "cellWidth"), G = Y(h, "_scales"), C = Y(h, "_markers"), _ = Y(h, "_scrollTask"), g = Y(h, "zoom"), te = Y(h, "_tasks"), [K, ge] = me(), z = ie(null), ae = ie(0), ne = ie(!1), u = 1 + (G?.rows?.length || 0), b = v(() => {
    if (!o || !d || !te?.length) return null;
    const p = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), J = [];
    return te.forEach((j) => {
      const O = d.taskRows.get(j.id) ?? j.id;
      H.has(O) || (H.set(O, J.length), J.push(O));
    }), te.forEach((j) => {
      const O = d.taskRows.get(j.id) ?? j.id, Z = H.get(O) ?? 0;
      p.set(j.id, Z * q);
    }), p;
  }, [te, o, d, q]), I = v(() => {
    const p = [];
    return P && P.length && q && P.forEach((H) => {
      const J = b?.get(H.id) ?? H.$y;
      p.push({ height: `${q}px`, top: `${J - 3}px` });
    }), p;
  }, [f, q, b]), ce = v(
    () => Math.max(K || 0, i),
    [K, i]
  );
  le(() => {
    const p = z.current;
    p && typeof E == "number" && (p.scrollTop = E);
  }, [E]);
  const oe = () => {
    se();
  };
  function se(p) {
    const H = z.current;
    if (!H) return;
    const J = {};
    J.left = H.scrollLeft, h.exec("scroll-chart", J);
  }
  function ue() {
    const p = z.current, J = Math.ceil((K || 0) / (q || 1)) + 1, j = Math.floor((p && p.scrollTop || 0) / (q || 1)), O = Math.max(0, j - u), Z = j + J + u, Te = O * (q || 0);
    h.exec("render-data", {
      start: O,
      end: Z,
      from: Te
    });
  }
  le(() => {
    ue();
  }, [K, E]);
  const pe = M(
    (p) => {
      if (!p) return;
      const { id: H, mode: J } = p;
      if (J.toString().indexOf("x") < 0) return;
      const j = z.current;
      if (!j) return;
      const { clientWidth: O } = j, Z = h.getTask(H);
      if (Z.$x + Z.$w < j.scrollLeft)
        h.exec("scroll-chart", { left: Z.$x - (L || 0) }), j.scrollLeft = Z.$x - (L || 0);
      else if (Z.$x >= O + j.scrollLeft) {
        const Te = O < Z.$w ? L || 0 : Z.$w;
        h.exec("scroll-chart", { left: Z.$x - O + Te }), j.scrollLeft = Z.$x - O + Te;
      }
    },
    [h, L]
  );
  le(() => {
    pe(_);
  }, [_]);
  function De(p) {
    if (g && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const H = z.current, J = p.clientX - (H ? H.getBoundingClientRect().left : 0);
      if (ae.current += p.deltaY, Math.abs(ae.current) >= 150) {
        const O = -Math.sign(ae.current);
        ae.current = 0, h.exec("zoom-scale", {
          dir: O,
          offset: J
        });
      }
    }
  }
  const Ce = M((p) => {
    const H = m(p.date, p.unit);
    return H ? {
      css: H,
      width: p.width
    } : null;
  }, [m]), Se = v(() => {
    if (!G || !m || !["hour", "day", "week"].includes(G.minUnit)) return null;
    let H = 0;
    return G.rows[G.rows.length - 1].cells.map((J) => {
      const j = Ce(J), O = H;
      return H += J.width, j ? { ...j, left: O } : null;
    });
  }, [G, m, Ce]), Re = M(
    (p) => {
      p.eventSource = "chart", h.exec("hotkey", p);
    },
    [h]
  );
  le(() => {
    const p = z.current;
    if (!p) return;
    const H = () => ge(p.clientHeight);
    H();
    const J = new ResizeObserver(() => H());
    return J.observe(p), () => {
      J.disconnect();
    };
  }, [z.current]);
  const A = ie(null);
  return le(() => {
    const p = z.current;
    if (p && !A.current)
      return A.current = It(p, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (H) => Re(H)
      }), () => {
        A.current?.destroy(), A.current = null;
      };
  }, []), le(() => {
    const p = z.current;
    if (!p) return;
    const H = De;
    return p.addEventListener("wheel", H), () => {
      p.removeEventListener("wheel", H);
    };
  }, [De]), le(() => {
    if (!B || ne.current || !G || !z.current || !K) return;
    const p = z.current, { clientWidth: H } = p, J = /* @__PURE__ */ new Date(), j = G.rows[G.rows.length - 1]?.cells;
    if (!j) return;
    let O = -1, Z = 0;
    const Te = [];
    for (let X = 0; X < j.length; X++) {
      const de = j[X];
      Te.push({ left: Z, width: de.width });
      const fe = de.date;
      if (de.unit === "week") {
        const Ie = new Date(fe);
        Ie.setDate(Ie.getDate() + 7), J >= fe && J < Ie && (O = X);
      } else de.unit === "day" && J.getFullYear() === fe.getFullYear() && J.getMonth() === fe.getMonth() && J.getDate() === fe.getDate() && (O = X);
      Z += de.width;
    }
    let T = O;
    if (O > 0 && (T = O - 1), T >= 0 && Te[T]) {
      const X = Te[T], de = Math.max(0, X.left);
      p.scrollLeft = de, h.exec("scroll-chart", { left: de }), ne.current = !0;
    }
  }, [B, G, K, h]), Rn("chart"), /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: z,
      onScroll: oe,
      children: [
        /* @__PURE__ */ c(Mn, { highlightTime: m, scales: G }),
        C && C.length ? /* @__PURE__ */ c(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${ce}px` },
            children: C.map((p, H) => /* @__PURE__ */ c(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${p.css || ""}`,
                style: { left: `${p.left}px` },
                children: /* @__PURE__ */ c("div", { className: "wx-mR7v2Xag wx-content", children: p.text })
              },
              H
            ))
          }
        ) : null,
        /* @__PURE__ */ Le(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${ce}px` },
            children: [
              Se ? /* @__PURE__ */ c(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Se.map(
                    (p, H) => p ? /* @__PURE__ */ c(
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
              /* @__PURE__ */ c(yn, { borders: N }),
              P && P.length ? P.map(
                (p, H) => p.$y ? /* @__PURE__ */ c(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": p.id,
                    style: I[H]
                  },
                  p.id
                ) : null
              ) : null,
              /* @__PURE__ */ c(
                $n,
                {
                  readonly: n,
                  taskTemplate: r,
                  multiTaskRows: o,
                  rowMapping: d,
                  marqueeSelect: W,
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
function Dn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: i = "x",
    onMove: r,
    onDisplayChange: N,
    compactMode: m,
    containerWidth: o = 0,
    leftThreshold: d = 50,
    rightThreshold: W = 50
  } = t, [x, B] = it(t.value ?? 0), [R, h] = it(t.display ?? "all");
  function P(se) {
    let ue = 0;
    n == "center" ? ue = s / 2 : n == "before" && (ue = s);
    const pe = {
      size: [s + "px", "auto"],
      p: [se - ue + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let De in pe) pe[De] = pe[De].reverse();
    return pe;
  }
  const [f, E] = me(!1), [q, L] = me(null), G = ie(0), C = ie(), _ = ie(), g = ie(R);
  le(() => {
    g.current = R;
  }, [R]), le(() => {
    q === null && x > 0 && L(x);
  }, [q, x]);
  function te(se) {
    return i == "x" ? se.clientX : se.clientY;
  }
  const K = M(
    (se) => {
      const ue = C.current + te(se) - G.current;
      B(ue);
      let pe;
      ue <= d ? pe = "chart" : o - ue <= W ? pe = "grid" : pe = "all", g.current !== pe && (h(pe), g.current = pe), _.current && clearTimeout(_.current), _.current = setTimeout(() => r && r(ue), 100);
    },
    [o, d, W, r]
  ), ge = M(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", E(!1), window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", ge);
  }, [K]), z = v(
    () => R !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [R, i]
  ), ae = M(
    (se) => {
      !m && (R === "grid" || R === "chart") || (G.current = te(se), C.current = x, E(!0), document.body.style.cursor = z, document.body.style.userSelect = "none", window.addEventListener("mousemove", K), window.addEventListener("mouseup", ge));
    },
    [z, K, ge, x, m, R]
  );
  function ne() {
    h("all"), q !== null && (B(q), r && r(q));
  }
  function u(se) {
    if (m) {
      const ue = R === "chart" ? "grid" : "chart";
      h(ue), N(ue);
    } else if (R === "grid" || R === "chart")
      ne(), N("all");
    else {
      const ue = se === "left" ? "chart" : "grid";
      h(ue), N(ue);
    }
  }
  function b() {
    u("left");
  }
  function I() {
    u("right");
  }
  const ce = v(() => P(x), [x, n, s, i]), oe = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${R}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-pFykzMlT " + oe,
      onMouseDown: ae,
      style: { width: ce.size[0], height: ce.size[1], cursor: z },
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
const Sn = 650;
function At(t) {
  let n;
  function s() {
    n = new ResizeObserver((r) => {
      for (let N of r)
        if (N.target === document.body) {
          let m = N.contentRect.width <= Sn;
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
function Nn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: i,
    highlightTime: r,
    onTableAPIChange: N,
    multiTaskRows: m = !1,
    rowMapping: o = null,
    marqueeSelect: d = !1,
    copyPaste: W = !1,
    scrollToCurrentWeek: x = !1,
    currentWeekColor: B = null
  } = t, R = Pe(Oe), h = Y(R, "_tasks"), P = Y(R, "_scales"), f = Y(R, "cellHeight"), E = Y(R, "columns"), q = Y(R, "_scrollTask"), L = Y(R, "undo"), G = v(() => {
    if (!m) return o;
    const T = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map();
    return h.forEach((de) => {
      const fe = de.row ?? de.id;
      X.set(de.id, fe), T.has(fe) || T.set(fe, []), T.get(fe).push(de.id);
    }), { rowMap: T, taskRows: X };
  }, [h, m, o]), [C, _] = me(!1);
  let [g, te] = me(0);
  const [K, ge] = me(0), [z, ae] = me(0), [ne, u] = me(void 0), [b, I] = me("all"), ce = ie(null), oe = M(
    (T) => {
      _((X) => (T !== X && (T ? (ce.current = b, b === "all" && I("grid")) : (!ce.current || ce.current === "all") && I("all")), T));
    },
    [b]
  );
  le(() => {
    const T = At(oe);
    return T.observe(), () => {
      T.disconnect();
    };
  }, [oe]);
  const se = v(() => {
    let T;
    return E.every((X) => X.width && !X.flexgrow) ? T = E.reduce((X, de) => X + parseInt(de.width), 0) : C && b === "chart" ? T = parseInt(E.find((X) => X.id === "action")?.width) || 50 : T = 440, g = T, T;
  }, [E, C, b]);
  le(() => {
    te(se);
  }, [se]);
  const ue = v(
    () => (K ?? 0) - (ne ?? 0),
    [K, ne]
  ), pe = v(() => P.width, [P]), De = v(() => {
    if (!m || !G)
      return h.length * f;
    const T = /* @__PURE__ */ new Set();
    return h.forEach((X) => {
      const de = G.taskRows.get(X.id) ?? X.id;
      T.add(de);
    }), T.size * f;
  }, [h, f, m, G]), Ce = v(
    () => P.height + De + ue,
    [P, De, ue]
  ), Se = v(
    () => g + pe,
    [g, pe]
  ), Re = ie(null), A = M(() => {
    Promise.resolve().then(() => {
      if ((K ?? 0) > (Se ?? 0)) {
        const T = (K ?? 0) - g;
        R.exec("expand-scale", { minWidth: T });
      }
    });
  }, [K, Se, g, R]);
  le(() => {
    let T;
    return Re.current && (T = new ResizeObserver(A), T.observe(Re.current)), () => {
      T && T.disconnect();
    };
  }, [Re.current, A]), le(() => {
    A();
  }, [pe]);
  const p = ie(null), H = ie(null), J = M(() => {
    const T = p.current;
    T && R.exec("scroll-chart", {
      top: T.scrollTop
    });
  }, [R]), j = ie({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  le(() => {
    j.current = {
      rTasks: h,
      rScales: P,
      rCellHeight: f,
      scrollSize: ue,
      ganttDiv: p.current,
      ganttHeight: z ?? 0
    };
  }, [h, P, f, ue, z]);
  const O = M(
    (T) => {
      if (!T) return;
      const {
        rTasks: X,
        rScales: de,
        rCellHeight: fe,
        scrollSize: Ie,
        ganttDiv: w,
        ganttHeight: re
      } = j.current;
      if (!w) return;
      const { id: ke } = T, F = X.findIndex((U) => U.id === ke);
      if (F > -1) {
        const U = re - de.height, be = F * fe, ve = w.scrollTop;
        let Me = null;
        be < ve ? Me = be : be + fe > ve + U && (Me = be - U + fe + Ie), Me !== null && (R.exec("scroll-chart", { top: Math.max(Me, 0) }), p.current.scrollTop = Math.max(Me, 0));
      }
    },
    [R]
  );
  le(() => {
    O(q);
  }, [q]), le(() => {
    const T = p.current, X = H.current;
    if (!T || !X) return;
    const de = () => {
      hn(() => {
        ae(T.offsetHeight), ge(T.offsetWidth), u(X.offsetWidth);
      });
    }, fe = new ResizeObserver(de);
    return fe.observe(T), () => fe.disconnect();
  }, [p.current]);
  const Z = ie(null), Te = ie(null);
  return le(() => {
    Te.current && (Te.current.destroy(), Te.current = null);
    const T = Z.current;
    if (T)
      return Te.current = It(T, {
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
        exec: (X) => {
          X.isInput || R.exec("hotkey", X);
        }
      }), () => {
        Te.current?.destroy(), Te.current = null;
      };
  }, [L]), /* @__PURE__ */ c("div", { className: "wx-jlbQoHOz wx-gantt", ref: p, onScroll: J, children: /* @__PURE__ */ c(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Ce, width: "100%" },
      ref: H,
      children: /* @__PURE__ */ c(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: z,
            width: ne
          },
          children: /* @__PURE__ */ Le("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Z, children: [
            E.length ? /* @__PURE__ */ Le(Ze, { children: [
              /* @__PURE__ */ c(
                kn,
                {
                  display: b,
                  compactMode: C,
                  columnWidth: se,
                  width: g,
                  readonly: s,
                  fullHeight: De,
                  onTableAPIChange: N,
                  multiTaskRows: m,
                  rowMapping: G
                }
              ),
              /* @__PURE__ */ c(
                Dn,
                {
                  value: g,
                  display: b,
                  compactMode: C,
                  containerWidth: K,
                  onMove: (T) => te(T),
                  onDisplayChange: (T) => I(T)
                }
              )
            ] }) : null,
            /* @__PURE__ */ c("div", { className: "wx-jlbQoHOz wx-content", ref: Re, children: /* @__PURE__ */ c(
              En,
              {
                readonly: s,
                fullWidth: pe,
                fullHeight: De,
                taskTemplate: n,
                cellBorders: i,
                highlightTime: r,
                multiTaskRows: m,
                rowMapping: G,
                marqueeSelect: d,
                copyPaste: W,
                scrollToCurrentWeek: x,
                currentWeekColor: B
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function Ln(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function In(t, n) {
  return typeof t == "function" ? t : nt(t, n);
}
function Ht(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: In(s, n)
  }));
}
function An(t, n) {
  const s = Ln(n);
  for (let i in s)
    s[i] = nt(s[i], t);
  return s;
}
function Hn(t, n) {
  if (!t || !t.length) return t;
  const s = nt("%d-%m-%Y", n);
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
function Wn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: Ht(s.scales, n)
    }))
  } : t;
}
const zn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Pn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], ls = Et(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: i = cn,
  tasks: r = [],
  selected: N = [],
  activeTask: m = null,
  links: o = [],
  scales: d = Pn,
  columns: W = ln,
  start: x = null,
  end: B = null,
  lengthUnit: R = "day",
  durationUnit: h = "day",
  cellWidth: P = 100,
  cellHeight: f = 38,
  scaleHeight: E = 36,
  readonly: q = !1,
  cellBorders: L = "full",
  zoom: G = !1,
  baselines: C = !1,
  highlightTime: _ = null,
  init: g = null,
  autoScale: te = !0,
  unscheduledTasks: K = !1,
  criticalPath: ge = null,
  schedule: z = { type: "forward" },
  projectStart: ae = null,
  projectEnd: ne = null,
  calendar: u = null,
  undo: b = !1,
  splitTasks: I = !1,
  multiTaskRows: ce = !1,
  marqueeSelect: oe = !1,
  copyPaste: se = !1,
  currentWeekHighlight: ue = !1,
  currentWeekColor: pe = null,
  scrollToCurrentWeek: De = !1,
  ...Ce
}, Se) {
  const Re = ie();
  Re.current = Ce;
  const A = v(() => new sn(un), []), p = v(() => ({ ...ct, ...rt }), []), H = Pe(_e.i18n), J = v(() => H ? H.extend(p, !0) : st(p), [H, p]), j = v(() => J.getRaw().calendar, [J]), O = v(() => {
    let U = {
      zoom: Wn(G, j),
      scales: Ht(d, j),
      columns: Hn(W, j),
      links: rn(o),
      cellWidth: P
    };
    return U.zoom && (U = {
      ...U,
      ...on(
        U.zoom,
        An(j, J.getGroup("gantt")),
        U.scales,
        P
      )
    }), U;
  }, [G, d, W, o, P, j, J]), Z = ie(null);
  Z.current !== r && (bt(r, { durationUnit: h, splitTasks: I, calendar: u }), Z.current = r), le(() => {
    bt(r, { durationUnit: h, splitTasks: I, calendar: u });
  }, [r, h, u, I]);
  const Te = v(() => {
    if (!ce) return null;
    const U = /* @__PURE__ */ new Map(), be = /* @__PURE__ */ new Map(), ve = (Me) => {
      Me.forEach(($e) => {
        const He = $e.row ?? $e.id;
        be.set($e.id, He), U.has(He) || U.set(He, []), U.get(He).push($e.id), $e.data && $e.data.length > 0 && ve($e.data);
      });
    };
    return ve(r), { rowMap: U, taskRows: be };
  }, [r, ce]), T = v(() => A.in, [A]), X = ie(null);
  X.current === null && (X.current = new Jt((U, be) => {
    const ve = "on" + zn(U);
    Re.current && Re.current[ve] && Re.current[ve](be);
  }), T.setNext(X.current));
  const [de, fe] = me(null), Ie = ie(null);
  Ie.current = de;
  const w = v(
    () => ({
      getState: A.getState.bind(A),
      getReactiveState: A.getReactive.bind(A),
      getStores: () => ({ data: A }),
      exec: T.exec,
      setNext: (U) => (X.current = X.current.setNext(U), X.current),
      intercept: T.intercept.bind(T),
      on: T.on.bind(T),
      detach: T.detach.bind(T),
      getTask: A.getTask.bind(A),
      serialize: A.serialize.bind(A),
      getTable: (U) => U ? new Promise((be) => setTimeout(() => be(Ie.current), 1)) : Ie.current,
      getHistory: () => A.getHistory()
    }),
    [A, T]
  );
  Dt(
    Se,
    () => ({
      ...w
    }),
    [w]
  );
  const re = ie(0);
  le(() => {
    re.current ? A.init({
      tasks: r,
      links: O.links,
      start: x,
      columns: O.columns,
      end: B,
      lengthUnit: R,
      cellWidth: O.cellWidth,
      cellHeight: f,
      scaleHeight: E,
      scales: O.scales,
      taskTypes: i,
      zoom: O.zoom,
      selected: N,
      activeTask: m,
      baselines: C,
      autoScale: te,
      unscheduledTasks: K,
      markers: s,
      durationUnit: h,
      criticalPath: ge,
      schedule: z,
      projectStart: ae,
      projectEnd: ne,
      calendar: u,
      undo: b,
      _weekStart: j.weekStart,
      splitTasks: I
    }) : g && g(w), re.current++;
  }, [
    w,
    g,
    r,
    O,
    x,
    B,
    R,
    f,
    E,
    i,
    N,
    m,
    C,
    te,
    K,
    s,
    h,
    ge,
    z,
    ae,
    ne,
    u,
    b,
    j,
    I,
    A
  ]), re.current === 0 && A.init({
    tasks: r,
    links: O.links,
    start: x,
    columns: O.columns,
    end: B,
    lengthUnit: R,
    cellWidth: O.cellWidth,
    cellHeight: f,
    scaleHeight: E,
    scales: O.scales,
    taskTypes: i,
    zoom: O.zoom,
    selected: N,
    activeTask: m,
    baselines: C,
    autoScale: te,
    unscheduledTasks: K,
    markers: s,
    durationUnit: h,
    criticalPath: ge,
    schedule: z,
    projectStart: ae,
    projectEnd: ne,
    calendar: u,
    undo: b,
    _weekStart: j.weekStart,
    splitTasks: I
  });
  const ke = v(() => {
    const U = /* @__PURE__ */ new Date(), be = j?.weekStart ?? 0, ve = new Date(U), $e = (ve.getDay() - be + 7) % 7;
    ve.setDate(ve.getDate() - $e), ve.setHours(0, 0, 0, 0);
    const He = new Date(ve);
    return He.setDate(He.getDate() + 7), (Ke) => Ke >= ve && Ke < He;
  }, [j]), F = v(() => (U, be) => {
    let ve = [];
    if (u)
      be == "day" && !u.getDayHours(U) && ve.push("wx-weekend"), be == "hour" && !u.getDayHours(U) && ve.push("wx-weekend");
    else if (_) {
      const Me = _(U, be);
      Me && ve.push(Me);
    }
    return ue && (be === "week" || be === "day") && ke(U) && ve.push("wx-current-week"), ve.join(" ");
  }, [u, _, ue, ke]);
  return /* @__PURE__ */ c(_e.i18n.Provider, { value: J, children: /* @__PURE__ */ c(Oe.Provider, { value: w, children: /* @__PURE__ */ c(
    Nn,
    {
      taskTemplate: n,
      readonly: q,
      cellBorders: L,
      highlightTime: F,
      onTableAPIChange: fe,
      multiTaskRows: ce,
      rowMapping: Te,
      marqueeSelect: oe,
      copyPaste: se,
      scrollToCurrentWeek: De,
      currentWeekColor: pe
    }
  ) }) });
});
function is({ api: t = null, items: n = [] }) {
  const s = Pe(_e.i18n), i = v(() => s || st(rt), [s]), r = v(() => i.getGroup("gantt"), [i]), N = Fe(t, "_selected"), m = Fe(t, "undo"), o = Fe(t, "history"), d = Fe(t, "splitTasks"), W = ["undo", "redo"], x = v(() => {
    const R = vt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : vt({
      undo: m,
      splitTasks: d
    })).map((P) => {
      let f = { ...P, disabled: !1 };
      return f.handler = Lt(R, f.id) ? (E) => Nt(t, E.id, null, r) : f.handler, f.text && (f.text = r(f.text)), f.menuText && (f.menuText = r(f.menuText)), f;
    });
  }, [n, t, r, m, d]), B = v(() => {
    const R = [];
    return x.forEach((h) => {
      const P = h.id;
      if (P === "add-task")
        R.push(h);
      else if (W.includes(P))
        W.includes(P) && R.push({
          ...h,
          disabled: h.isDisabled(o)
        });
      else {
        if (!N?.length || !t) return;
        R.push({
          ...h,
          disabled: h.isDisabled && N.some((f) => h.isDisabled(f, t.getState()))
        });
      }
    }), R.filter((h, P) => {
      if (t && h.isHidden)
        return !N.some((f) => h.isHidden(f, t.getState()));
      if (h.comp === "separator") {
        const f = R[P + 1];
        if (!f || f.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, N, o, x]);
  return s ? /* @__PURE__ */ c($t, { items: B }) : /* @__PURE__ */ c(_e.i18n.Provider, { value: i, children: /* @__PURE__ */ c($t, { items: B }) });
}
const cs = Et(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: r = null,
  at: N = "point",
  children: m,
  onClick: o,
  css: d
}, W) {
  const x = ie(null), B = ie(null), R = Pe(_e.i18n), h = v(() => R || st({ ...rt, ...ct }), [R]), P = v(() => h.getGroup("gantt"), [h]), f = Fe(s, "taskTypes"), E = Fe(s, "selected"), q = Fe(s, "_selected"), L = Fe(s, "splitTasks"), G = v(() => Tt({ splitTasks: !0 }), []);
  le(() => {
    s && (s.on("scroll-chart", () => {
      x.current && x.current.show && x.current.show();
    }), s.on("drag-task", () => {
      x.current && x.current.show && x.current.show();
    }));
  }, [s]);
  function C(u) {
    return u.map((b) => (b = { ...b }, b.text && (b.text = P(b.text)), b.subtext && (b.subtext = P(b.subtext)), b.data && (b.data = C(b.data)), b));
  }
  function _() {
    const u = n.length ? n : Tt({ splitTasks: L }), b = u.find((I) => I.id === "convert-task");
    return b && (b.data = [], (f || []).forEach((I) => {
      b.data.push(b.dataFactory(I));
    })), C(u);
  }
  const g = v(() => _(), [s, n, f, L, P]), te = v(
    () => q && q.length ? q : [],
    [q]
  ), K = M(
    (u, b) => {
      let I = u ? s?.getTask(u) : null;
      if (i) {
        const ce = i(u, b);
        I = ce === !0 ? I : ce;
      }
      if (I) {
        const ce = Ve(b.target, "data-segment");
        ce !== null ? B.current = { id: I.id, segmentIndex: ce } : B.current = I.id, (!Array.isArray(E) || !E.includes(I.id)) && s && s.exec && s.exec("select-task", { id: I.id });
      }
      return I;
    },
    [s, i, E]
  ), ge = M(
    (u) => {
      const b = u.action;
      b && (Lt(G, b.id) && Nt(s, b.id, B.current, P), o && o(u));
    },
    [s, P, o, G]
  ), z = M(
    (u, b) => {
      const I = te.length ? te : b ? [b] : [];
      let ce = r ? I.every((oe) => r(u, oe)) : !0;
      if (ce && (u.isHidden && (ce = !I.some(
        (oe) => u.isHidden(oe, s.getState(), B.current)
      )), u.isDisabled)) {
        const oe = I.some(
          (se) => u.isDisabled(se, s.getState(), B.current)
        );
        u.disabled = oe;
      }
      return ce;
    },
    [r, te, s]
  );
  Dt(W, () => ({
    show: (u, b) => {
      x.current && x.current.show && x.current.show(u, b);
    }
  }));
  const ae = M((u) => {
    x.current && x.current.show && x.current.show(u);
  }, []), ne = /* @__PURE__ */ Le(Ze, { children: [
    /* @__PURE__ */ c(
      mn,
      {
        filter: z,
        options: g,
        dataKey: "id",
        resolver: K,
        onClick: ge,
        at: N,
        ref: x,
        css: d
      }
    ),
    /* @__PURE__ */ c("span", { onContextMenu: ae, "data-menu-ignore": "true", children: typeof m == "function" ? m() : m })
  ] });
  if (!R && _e.i18n?.Provider) {
    const u = _e.i18n.Provider;
    return /* @__PURE__ */ c(u, { value: h, children: ne });
  }
  return ne;
});
function Gn({ api: t, autoSave: n, onLinksChange: s }) {
  const r = Pe(_e.i18n).getGroup("gantt"), N = Y(t, "activeTask"), m = Y(t, "_activeTask"), o = Y(t, "_links"), d = Y(t, "schedule"), W = Y(t, "unscheduledTasks"), [x, B] = me();
  function R() {
    if (N) {
      const E = o.filter((L) => L.target == N).map((L) => ({ link: L, task: t.getTask(L.source) })), q = o.filter((L) => L.source == N).map((L) => ({ link: L, task: t.getTask(L.target) }));
      return [
        { title: r("Predecessors"), data: E },
        { title: r("Successors"), data: q }
      ];
    }
  }
  le(() => {
    B(R());
  }, [N, o]);
  const h = v(
    () => [
      { id: "e2s", label: r("End-to-start") },
      { id: "s2s", label: r("Start-to-start") },
      { id: "e2e", label: r("End-to-end") },
      { id: "s2e", label: r("Start-to-end") }
    ],
    [r]
  );
  function P(E) {
    n ? t.exec("delete-link", { id: E }) : (B(
      (q) => (q || []).map((L) => ({
        ...L,
        data: L.data.filter((G) => G.link.id !== E)
      }))
    ), s && s({
      id: E,
      action: "delete-link",
      data: { id: E }
    }));
  }
  function f(E, q) {
    n ? t.exec("update-link", {
      id: E,
      link: q
    }) : (B(
      (L) => (L || []).map((G) => ({
        ...G,
        data: G.data.map(
          (C) => C.link.id === E ? { ...C, link: { ...C.link, ...q } } : C
        )
      }))
    ), s && s({
      id: E,
      action: "update-link",
      data: {
        id: E,
        link: q
      }
    }));
  }
  return /* @__PURE__ */ c(Ze, { children: (x || []).map(
    (E, q) => E.data.length ? /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ c(Ft, { label: E.title, position: "top", children: /* @__PURE__ */ c("table", { children: /* @__PURE__ */ c("tbody", { children: E.data.map((L) => /* @__PURE__ */ Le("tr", { children: [
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-task-name", children: L.task.text || "" }) }),
      d?.auto && L.link.type === "e2s" ? /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ c(
        Ot,
        {
          type: "number",
          placeholder: r("Lag"),
          value: L.link.lag,
          disabled: W && m?.unscheduled,
          onChange: (G) => {
            G.input || f(L.link.id, { lag: G.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ c(
        Xt,
        {
          value: L.link.type,
          placeholder: r("Select link type"),
          options: h,
          onChange: (G) => f(L.link.id, { type: G.value }),
          children: ({ option: G }) => G.label
        }
      ) }) }),
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => P(L.link.id),
          role: "button"
        }
      ) })
    ] }, L.link.id)) }) }) }) }, q) : null
  ) });
}
function _n(t) {
  const { value: n, time: s, format: i, onchange: r, onChange: N, ...m } = t, o = N ?? r;
  function d(W) {
    const x = new Date(W.value);
    x.setHours(n.getHours()), x.setMinutes(n.getMinutes()), o && o({ value: x });
  }
  return /* @__PURE__ */ Le("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ c(
      Kt,
      {
        ...m,
        value: n,
        onChange: d,
        format: i,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ c(Vt, { value: n, onChange: o, format: i }) : null
  ] });
}
Be("select", qt);
Be("date", _n);
Be("twostate", jt);
Be("slider", Ut);
Be("counter", Qt);
Be("links", Gn);
function as({
  api: t,
  items: n = [],
  css: s = "",
  layout: i = "default",
  readonly: r = !1,
  placement: N = "sidebar",
  bottomBar: m = !0,
  topBar: o = !0,
  autoSave: d = !0,
  focus: W = !1,
  hotkeys: x = {}
}) {
  const B = Pe(_e.i18n), R = v(() => B || st({ ...rt, ...ct }), [B]), h = v(() => R.getGroup("gantt"), [R]), P = R.getRaw(), f = v(() => {
    const w = P.gantt?.dateFormat || P.formats?.dateFormat;
    return nt(w, P.calendar);
  }, [P]), E = v(() => {
    if (o === !0 && !r) {
      const w = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: h("Delete"),
          id: "delete"
        }
      ];
      return d ? { items: w } : {
        items: [
          ...w,
          {
            comp: "button",
            type: "primary",
            text: h("Save"),
            id: "save"
          }
        ]
      };
    }
    return o;
  }, [o, r, d, h]), [q, L] = me(!1), G = v(
    () => q ? "wx-full-screen" : "",
    [q]
  ), C = M((w) => {
    L(w);
  }, []);
  le(() => {
    const w = At(C);
    return w.observe(), () => {
      w.disconnect();
    };
  }, [C]);
  const _ = Y(t, "_activeTask"), g = Y(t, "activeTask"), te = Y(t, "unscheduledTasks"), K = Y(t, "links"), ge = Y(t, "splitTasks"), z = v(
    () => ge && g?.segmentIndex,
    [ge, g]
  ), ae = v(
    () => z || z === 0,
    [z]
  ), ne = v(
    () => an({ unscheduledTasks: te }),
    [te]
  ), u = Y(t, "undo"), [b, I] = me({}), [ce, oe] = me(null), [se, ue] = me(), [pe, De] = me(null), Ce = Y(t, "taskTypes"), Se = v(() => {
    if (!_) return null;
    let w;
    if (ae && _.segments ? w = { ..._.segments[z] } : w = { ..._ }, r) {
      let re = { parent: w.parent };
      return ne.forEach(({ key: ke, comp: F }) => {
        if (F !== "links") {
          const U = w[ke];
          F === "date" && U instanceof Date ? re[ke] = f(U) : F === "slider" && ke === "progress" ? re[ke] = `${U}%` : re[ke] = U;
        }
      }), re;
    }
    return w || null;
  }, [_, ae, z, r, ne, f]);
  le(() => {
    ue(Se);
  }, [Se]), le(() => {
    I({}), De(null), oe(null);
  }, [g]);
  function Re(w, re) {
    return w.map((ke) => {
      const F = { ...ke };
      if (ke.config && (F.config = { ...F.config }), F.comp === "links" && t && (F.api = t, F.autoSave = d, F.onLinksChange = H), F.comp === "select" && F.key === "type") {
        const U = F.options ?? (Ce || []);
        F.options = U.map((be) => ({
          ...be,
          label: h(be.label)
        }));
      }
      return F.comp === "slider" && F.key === "progress" && (F.labelTemplate = (U) => `${h(F.label)} ${U}%`), F.label && (F.label = h(F.label)), F.config?.placeholder && (F.config.placeholder = h(F.config.placeholder)), re && (F.isDisabled && F.isDisabled(re, t.getState()) ? F.disabled = !0 : delete F.disabled), F;
    });
  }
  const A = v(() => {
    let w = n.length ? n : ne;
    return w = Re(w, se), se ? w.filter(
      (re) => !re.isHidden || !re.isHidden(se, t.getState())
    ) : w;
  }, [n, ne, se, Ce, h, t, d]), p = v(
    () => A.map((w) => w.key),
    [A]
  );
  function H({ id: w, action: re, data: ke }) {
    I((F) => ({
      ...F,
      [w]: { action: re, data: ke }
    }));
  }
  const J = M(() => {
    for (let w in b)
      if (K.byId(w)) {
        const { action: re, data: ke } = b[w];
        t.exec(re, ke);
      }
  }, [t, b, K]), j = M(() => {
    const w = g?.id || g;
    if (ae) {
      if (_?.segments) {
        const re = _.segments.filter(
          (ke, F) => F !== z
        );
        t.exec("update-task", {
          id: w,
          task: { segments: re }
        });
      }
    } else
      t.exec("delete-task", { id: w });
  }, [t, g, ae, _, z]), O = M(() => {
    t.exec("show-editor", { id: null });
  }, [t]), Z = M(
    (w) => {
      const { item: re, changes: ke } = w;
      re.id === "delete" && j(), re.id === "save" && (ke.length ? O() : J()), re.comp && O();
    },
    [t, g, d, J, j, O]
  ), Te = M(
    (w, re, ke) => (te && w.type === "summary" && (w.unscheduled = !1), St(w, t.getState(), re), ke || oe(!1), w),
    [te, t]
  ), T = M(
    (w) => {
      w = {
        ...w,
        unscheduled: te && w.unscheduled && w.type !== "summary"
      }, delete w.links, delete w.data, (p.indexOf("duration") === -1 || w.segments && !w.duration) && delete w.duration;
      const re = {
        id: g?.id || g,
        task: w,
        ...ae && { segmentIndex: z }
      };
      d && ce && (re.inProgress = ce), t.exec("update-task", re), d || J();
    },
    [
      t,
      g,
      te,
      d,
      J,
      p,
      ae,
      z,
      ce
    ]
  ), X = M(
    (w) => {
      let { update: re, key: ke, input: F } = w;
      if (F && oe(!0), w.update = Te({ ...re }, ke, F), !d) ue(w.update);
      else if (!pe && !F) {
        const U = A.find((Me) => Me.key === ke), be = re[ke];
        (!U.validation || U.validation(be)) && (!U.required || be) && T(w.update);
      }
    },
    [d, Te, pe, A, T]
  ), de = M(
    (w) => {
      d || T(w.values);
    },
    [d, T]
  ), fe = M((w) => {
    De(w.errors);
  }, []), Ie = v(
    () => u ? {
      "ctrl+z": (w) => {
        w.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (w) => {
        w.preventDefault(), t.exec("redo");
      }
    } : {},
    [u, t]
  );
  return Se ? /* @__PURE__ */ c(Bt, { children: /* @__PURE__ */ c(
    gn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${G} ${s}`,
      items: A,
      values: Se,
      topBar: E,
      bottomBar: m,
      placement: N,
      layout: i,
      readonly: r,
      autoSave: d,
      focus: W,
      onAction: Z,
      onSave: de,
      onValidation: fe,
      onChange: X,
      hotkeys: x && { ...Ie, ...x }
    }
  ) }) : null;
}
const us = ({ children: t, columns: n = null, api: s }) => {
  const [i, r] = me(null);
  return le(() => {
    s && s.getTable(!0).then(r);
  }, [s]), /* @__PURE__ */ c(fn, { api: i, columns: n, children: t });
};
function ds(t) {
  const { api: n, content: s, children: i } = t, r = ie(null), N = ie(null), [m, o] = me({}), [d, W] = me(null), [x, B] = me({});
  function R(C) {
    for (; C; ) {
      if (C.getAttribute) {
        const _ = C.getAttribute("data-tooltip-id"), g = C.getAttribute("data-tooltip-at"), te = C.getAttribute("data-tooltip");
        if (_ || te) return { id: _, tooltip: te, target: C, at: g };
      }
      C = C.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  le(() => {
    const C = N.current;
    if (C && x && (x.text || s)) {
      const _ = C.getBoundingClientRect();
      let g = !1, te = x.left, K = x.top;
      _.right >= m.right && (te = m.width - _.width - 5, g = !0), _.bottom >= m.bottom && (K = x.top - (_.bottom - m.bottom + 2), g = !0), g && B((ge) => ge && { ...ge, left: te, top: K });
    }
  }, [x, m, s]);
  const h = ie(null), P = 300, f = (C) => {
    clearTimeout(h.current), h.current = setTimeout(() => {
      C();
    }, P);
  };
  function E(C) {
    let { id: _, tooltip: g, target: te, at: K } = R(C.target);
    if (B(null), W(null), !g)
      if (_)
        g = L(_);
      else {
        clearTimeout(h.current);
        return;
      }
    const ge = C.clientX;
    f(() => {
      _ && W(q(G(_)));
      const z = te.getBoundingClientRect(), ae = r.current, ne = ae ? ae.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let u, b;
      K === "left" ? (u = z.top + 5 - ne.top, b = z.right + 5 - ne.left) : (u = z.top + z.height - ne.top, b = ge - ne.left), o(ne), B({ top: u, left: b, text: g });
    });
  }
  function q(C) {
    return n?.getTask(G(C)) || null;
  }
  function L(C) {
    return q(C)?.text || "";
  }
  function G(C) {
    const _ = parseInt(C);
    return isNaN(_) ? C : _;
  }
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: r,
      onMouseMove: E,
      children: [
        x && (x.text || s) ? /* @__PURE__ */ c(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: N,
            style: { top: `${x.top}px`, left: `${x.left}px` },
            children: s ? /* @__PURE__ */ c(s, { data: d }) : x.text ? /* @__PURE__ */ c("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: x.text }) : null
          }
        ) : null,
        i
      ]
    }
  );
}
function fs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(pt, { fonts: t, children: n() }) : /* @__PURE__ */ c(pt, { fonts: t });
}
function hs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(kt, { fonts: t, children: n }) : /* @__PURE__ */ c(kt, { fonts: t });
}
function ms({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(yt, { fonts: t, children: n }) : /* @__PURE__ */ c(yt, { fonts: t });
}
export {
  cs as ContextMenu,
  as as Editor,
  ls as Gantt,
  us as HeaderMenu,
  fs as Material,
  is as Toolbar,
  ds as Tooltip,
  hs as Willow,
  ms as WillowDark,
  xs as defaultColumns,
  ps as defaultEditorItems,
  ks as defaultMenuOptions,
  ys as defaultTaskTypes,
  bs as defaultToolbarButtons,
  vs as getEditorItems,
  Ts as getMenuOptions,
  $s as getToolbarButtons,
  Rs as registerEditorItem,
  Ms as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
