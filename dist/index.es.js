import { jsxs as Le, jsx as c, Fragment as Ze } from "react/jsx-runtime";
import { createContext as _t, useMemo as v, useState as me, useContext as Pe, useCallback as R, useRef as ie, useEffect as le, Fragment as Yt, forwardRef as Et, useImperativeHandle as Dt } from "react";
import { context as _e, Button as xt, Field as Ft, Text as Ot, Combo as Xt, DatePicker as Kt, TimePicker as Vt, Locale as Bt, RichSelect as qt, TwoState as jt, Slider as Ut, Counter as Qt, Material as pt, Willow as yt, WillowDark as kt } from "@svar-ui/react-core";
import { locate as Ge, locateID as Ve, locateAttr as Zt, dateToString as nt, locale as st } from "@svar-ui/lib-dom";
import { en as rt } from "@svar-ui/gantt-locales";
import { en as ct } from "@svar-ui/core-locales";
import { EventBusRouter as Jt } from "@svar-ui/lib-state";
import { prepareEditTask as St, grid as en, extendDragOptions as tn, isSegmentMoveAllowed as nn, DataStore as sn, normalizeLinks as rn, normalizeZoom as on, defaultColumns as ln, parseTaskDates as bt, defaultTaskTypes as cn, getToolbarButtons as vt, handleAction as Nt, isHandledAction as Lt, getMenuOptions as Tt, getEditorItems as an } from "@svar-ui/gantt-store";
import { defaultColumns as xs, defaultEditorItems as ps, defaultMenuOptions as ys, defaultTaskTypes as ks, defaultToolbarButtons as bs, getEditorItems as vs, getMenuOptions as Ts, getToolbarButtons as $s, registerScaleUnit as Ms } from "@svar-ui/gantt-store";
import { useWritableProp as it, useStore as F, useStoreWithCounter as tt, writable as un, useStoreLater as Fe } from "@svar-ui/lib-react";
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
  let s, i, r, N, m, o, f, W, x;
  function q(g) {
    N = g.clientX, m = g.clientY, o = {
      ...wn(s, t, g),
      y: n.getTask(r).$y
    }, document.body.style.userSelect = "none";
  }
  function D(g) {
    s = Ge(g), Mt(s) && (r = Xe(s), x = setTimeout(() => {
      W = !0, n && n.touchStart && n.touchStart(), q(g.touches[0]);
    }, 500), t.addEventListener("touchmove", I), t.addEventListener("contextmenu", h), window.addEventListener("touchend", G));
  }
  function h(g) {
    if (W || x)
      return g.preventDefault(), !1;
  }
  function P(g) {
    g.which === 1 && (s = Ge(g), Mt(s) && (r = Xe(s), t.addEventListener("mousemove", j), window.addEventListener("mouseup", C), q(g)));
  }
  function d(g) {
    t.removeEventListener("mousemove", j), t.removeEventListener("touchmove", I), document.body.removeEventListener("mouseup", C), document.body.removeEventListener("touchend", G), document.body.style.userSelect = "", g && (t.removeEventListener("mousedown", P), t.removeEventListener("touchstart", D));
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
      if (n && n.move && n.move({ id: r, top: ge, detail: f }) === !1)
        return;
      const z = n.getTask(r), ae = z.$y;
      if (!o.start && o.y == ae) return _();
      o.start = !0, o.y = z.$y - 4, i.style.top = ge + "px";
      const se = document.elementFromPoint(
        g.clientX,
        g.clientY
      ), u = Ge(se);
      if (u && u !== s) {
        const b = Xe(u), A = u.getBoundingClientRect(), ce = A.top + A.height / 2, ne = g.clientY + o.db > ce && u.nextElementSibling !== s, re = g.clientY - o.dt < ce && u.previousElementSibling !== s;
        f?.after == b || f?.before == b ? f = null : ne ? f = { id: r, after: b } : re && (f = { id: r, before: b });
      }
    }
  }
  function j(g) {
    E(g);
  }
  function I(g) {
    W ? (g.preventDefault(), E(g.touches[0])) : x && (clearTimeout(x), x = null);
  }
  function G() {
    W = null, x && (clearTimeout(x), x = null), _();
  }
  function C() {
    _();
  }
  function _() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: r, top: o.top })), r = s = i = o = f = null, d();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", P), t.addEventListener("touchstart", D), {
    destroy() {
      d(!0);
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
function yn(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: r = "all",
    columnWidth: N = 0,
    onTableAPIChange: m,
    multiTaskRows: o = !1,
    rowMapping: f = null
  } = t, [W, x] = it(N), [q, D] = me(), h = Pe(_e.i18n), P = v(() => h.getGroup("gantt"), [h]), d = Pe(Oe), E = F(d, "scrollTop"), j = F(d, "cellHeight"), I = F(d, "_scrollTask"), G = F(d, "_selected"), C = F(d, "area"), _ = F(d, "_tasks"), g = F(d, "_scales"), te = F(d, "columns"), K = F(d, "_sort"), ge = F(d, "calendar"), z = F(d, "durationUnit"), ae = F(d, "splitTasks"), [se, u] = me(null), b = v(() => !_ || !C ? [] : o && f ? _ : _.slice(C.start, C.end), [_, C, o, f]), A = R(
    (l, y) => {
      if (y === "add-task")
        d.exec(y, {
          target: l,
          task: { text: P("New Task") },
          mode: "child",
          show: !0
        });
      else if (y === "open-task") {
        const $ = b.find((Y) => Y.id === l);
        ($?.data || $?.lazy) && d.exec(y, { id: l, mode: !$.open });
      }
    },
    [b]
  ), ce = R(
    (l) => {
      const y = Ve(l), $ = l.target.dataset.action;
      $ && l.preventDefault(), y ? $ === "add-task" || $ === "open-task" ? A(y, $) : d.exec("select-task", {
        id: y,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : $ === "add-task" && A(null, $);
    },
    [d, A]
  ), ne = ie(null), re = ie(null), [ue, pe] = me(0), [De, Ce] = me(!1);
  le(() => {
    const l = re.current;
    if (!l || typeof ResizeObserver > "u") return;
    const y = () => pe(l.clientWidth);
    y();
    const $ = new ResizeObserver(y);
    return $.observe(l), () => $.disconnect();
  }, []);
  const Se = ie(null), Re = R(
    (l) => {
      const y = l.id, { before: $, after: Y } = l, we = l.onMove;
      let he = $ || Y, Ee = $ ? "before" : "after";
      if (we) {
        if (Ee === "after") {
          const We = d.getTask(he);
          We.data?.length && We.open && (Ee = "before", he = We.data[0].id);
        }
        Se.current = { id: y, [Ee]: he };
      } else Se.current = null;
      d.exec("move-task", {
        id: y,
        mode: Ee,
        target: he,
        inProgress: we
      });
    },
    [d]
  ), L = v(() => C?.from ?? 0, [C]), p = v(() => g?.height ?? 0, [g]), H = v(() => !s && r !== "grid" ? (W ?? 0) > (i ?? 0) : (W ?? 0) > (ue ?? 0), [s, r, W, i, ue]), J = v(() => {
    const l = {};
    return H && r === "all" || r === "grid" && H ? l.width = W : r === "grid" && (l.width = "100%"), l;
  }, [H, r, W]), U = v(() => se && !b.find((l) => l.id === se.id) ? [...b, se] : b, [b, se]), V = v(() => {
    if (!o || !f) return U;
    const l = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    return U.forEach(($) => {
      const Y = f.taskRows.get($.id) ?? $.id;
      y.has(Y) || (l.set(Y, {
        ...$,
        $rowTasks: f.rowMap.get(Y) || [$.id]
      }), y.add(Y));
    }), Array.from(l.values());
  }, [U, o, f]), Z = v(() => {
    let l = (te || []).map((Y) => {
      Y = { ...Y };
      const we = Y.header;
      if (typeof we == "object") {
        const he = we.text && P(we.text);
        Y.header = { ...we, text: he };
      } else Y.header = P(we);
      return Y;
    });
    const y = l.findIndex((Y) => Y.id === "text"), $ = l.findIndex((Y) => Y.id === "add-task");
    if (y !== -1 && (l[y].cell && (l[y]._cell = l[y].cell), l[y].cell = pn), $ !== -1) {
      l[$].cell = l[$].cell || Rt;
      const Y = l[$].header;
      if (typeof Y != "object" && (l[$].header = { text: Y }), l[$].header.cell = Y.cell || Rt, n)
        l.splice($, 1);
      else if (s) {
        const [we] = l.splice($, 1);
        l.unshift(we);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [te, P, n, s]), Te = v(() => r === "all" ? `${i}px` : r === "grid" ? "calc(100% - 4px)" : Z.find((l) => l.id === "add-task") ? "50px" : "0", [r, i, Z]), T = v(() => {
    if (V && K?.length) {
      const l = {};
      return K.forEach(({ key: y, order: $ }, Y) => {
        l[y] = {
          order: $,
          ...K.length > 1 && { index: Y }
        };
      }), l;
    }
    return {};
  }, [V, K]), X = R(() => Z.some((l) => l.flexgrow && !l.hidden), []), de = v(() => X(), [X, De]), fe = v(() => {
    let l = r === "chart" ? Z.filter(($) => $.id === "add-task") : Z;
    const y = r === "all" ? i : ue;
    if (!de) {
      let $ = W, Y = !1;
      if (Z.some((we) => we.$width)) {
        let we = 0;
        $ = Z.reduce((he, Ee) => (Ee.hidden || (we += Ee.width, he += Ee.$width || Ee.width), he), 0), we > $ && $ > y && (Y = !0);
      }
      if (Y || $ < y) {
        let we = 1;
        return Y || (we = (y - 50) / ($ - 50 || 1)), l.map((he) => (he.id !== "add-task" && !he.hidden && (he.$width || (he.$width = he.width), he.width = he.$width * we), he));
      }
    }
    return l;
  }, [r, Z, de, W, i, ue]), Ie = R(
    (l) => {
      if (!X()) {
        const y = fe.reduce(($, Y) => (l && Y.$width && (Y.$width = Y.width), $ + (Y.hidden ? 0 : Y.width)), 0);
        y !== W && x(y);
      }
      Ce(!0), Ce(!1);
    },
    [X, fe, W, x]
  ), w = R(() => {
    Z.filter((y) => y.flexgrow && !y.hidden).length === 1 && Z.forEach((y) => {
      y.$width && !y.flexgrow && !y.hidden && (y.width = y.$width);
    });
  }, []), oe = R(
    (l) => {
      if (!n) {
        const y = Ve(l), $ = Zt(l, "data-col-id");
        !($ && Z.find((we) => we.id == $))?.editor && y && d.exec("show-editor", { id: y });
      }
    },
    [d, n]
    // cols is defined later; relies on latest value at call time
  ), ye = v(
    () => Array.isArray(G) ? G.map((l) => l.id) : [],
    [G]
  ), O = ie(L);
  O.current = L, le(() => {
    const l = ($) => {
      if (ne.current) {
        const Y = ne.current.querySelector(".wx-body");
        Y && (Y.style.top = -(($ ?? 0) - (O.current ?? 0)) + "px");
      }
      re.current && (re.current.scrollTop = 0);
    };
    return l(E), d.on("scroll-chart", ({ top: $ }) => {
      $ !== void 0 && l($);
    });
  }, [d, E]), le(() => {
    if (ne.current) {
      const l = ne.current.querySelector(".wx-body");
      l && (l.style.top = -((E ?? 0) - (L ?? 0)) + "px");
    }
  }, [L]), le(() => {
    const l = ne.current;
    if (!l) return;
    const y = l.querySelector(".wx-table-box .wx-body");
    if (!y || typeof ResizeObserver > "u") return;
    const $ = new ResizeObserver(() => {
      if (ne.current) {
        const Y = ne.current.querySelector(".wx-body");
        Y && (Y.style.top = -((E ?? 0) - (O.current ?? 0)) + "px");
      }
    });
    return $.observe(y), () => {
      $.disconnect();
    };
  }, [fe, J, r, Te, V, E]), le(() => {
    if (!I || !q) return;
    const { id: l } = I, y = q.getState().focusCell;
    y && y.row !== l && ne.current && ne.current.contains(document.activeElement) && q.exec("focus-cell", {
      row: l,
      column: y.column
    });
  }, [I, q]);
  const Q = R(
    ({ id: l }) => {
      if (n) return !1;
      d.getTask(l).open && d.exec("open-task", { id: l, mode: !1 });
      const y = d.getState()._tasks.find(($) => $.id === l);
      if (u(y || null), !y) return !1;
    },
    [d, n]
  ), be = R(
    ({ id: l, top: y }) => {
      Se.current ? Re({ ...Se.current, onMove: !1 }) : d.exec("drag-task", {
        id: l,
        top: y + (L ?? 0),
        inProgress: !1
      }), u(null);
    },
    [d, Re, L]
  ), ve = R(
    ({ id: l, top: y, detail: $ }) => {
      $ && Re({ ...$, onMove: !0 }), d.exec("drag-task", {
        id: l,
        top: y + (L ?? 0),
        inProgress: !0
      });
    },
    [d, Re, L]
  );
  le(() => {
    const l = ne.current;
    return l ? xn(l, {
      start: Q,
      end: be,
      move: ve,
      getTask: d.getTask
    }).destroy : void 0;
  }, [d, Q, be, ve]);
  const Me = R(
    (l) => {
      const { key: y, isInput: $ } = l;
      if (!$ && (y === "arrowup" || y === "arrowdown"))
        return l.eventSource = "grid", d.exec("hotkey", l), !1;
      if (y === "enter") {
        const Y = q?.getState().focusCell;
        if (Y) {
          const { row: we, column: he } = Y;
          he === "add-task" ? A(we, "add-task") : he === "text" && A(we, "open-task");
        }
      }
    },
    [d, A, q]
  ), $e = ie(null), He = () => {
    $e.current = {
      setTableAPI: D,
      handleHotkey: Me,
      sortVal: K,
      api: d,
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
    D,
    Me,
    K,
    d,
    w,
    Ie,
    b,
    ge,
    z,
    ae,
    m
  ]);
  const Ke = R((l) => {
    D(l), l.intercept("hotkey", (y) => $e.current.handleHotkey(y)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (y) => {
      const $ = $e.current.sortVal, { key: Y, add: we } = y, he = $ ? $.find((We) => We.key === Y) : null;
      let Ee = "asc";
      return he && (Ee = !he || he.order === "asc" ? "desc" : "asc"), d.exec("sort-tasks", {
        key: Y,
        order: Ee,
        add: we
      }), !1;
    }), l.on("resize-column", () => {
      $e.current.setColumnWidth(!0);
    }), l.on("hide-column", (y) => {
      y.mode || $e.current.adjustColumns(), $e.current.setColumnWidth();
    }), l.intercept("update-cell", (y) => {
      const { id: $, column: Y, value: we } = y, he = $e.current.tasks.find((Ee) => Ee.id === $);
      if (he) {
        const Ee = { ...he };
        let We = we;
        We && !isNaN(We) && !(We instanceof Date) && (We *= 1), Ee[Y] = We, St(
          Ee,
          {
            calendar: $e.current.calendarVal,
            durationUnit: $e.current.durationUnitVal,
            splitTasks: $e.current.splitTasksVal
          },
          Y
        ), d.exec("update-task", {
          id: $,
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
      ref: re,
      children: /* @__PURE__ */ c(
        "div",
        {
          ref: ne,
          style: J,
          className: "wx-rHj6070p wx-table",
          onClick: ce,
          onDoubleClick: oe,
          children: /* @__PURE__ */ c(
            dn,
            {
              init: Ke,
              sizes: {
                rowHeight: j,
                headerHeight: (p ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: V,
              columns: fe,
              selectedRows: [...ye],
              sortMarks: T
            }
          )
        }
      )
    }
  );
}
function kn({ borders: t = "" }) {
  const n = Pe(Oe), s = F(n, "cellWidth"), i = F(n, "cellHeight"), r = ie(null), [N, m] = me("#e4e4e4");
  le(() => {
    if (typeof getComputedStyle < "u" && r.current) {
      const f = getComputedStyle(r.current).getPropertyValue(
        "--wx-gantt-border"
      );
      m(f ? f.substring(f.indexOf("#")) : "#1d1e261a");
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
  const i = Pe(Oe), r = F(i, "_links"), N = F(i, "criticalPath"), m = ie(null), o = R(
    (f) => {
      const W = f?.target?.classList;
      !W?.contains("wx-line") && !W?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return le(() => {
    if (!s && n && m.current) {
      const f = (W) => {
        m.current && !m.current.contains(W.target) && o(W);
      };
      return document.addEventListener("click", f), () => {
        document.removeEventListener("click", f);
      };
    }
  }, [s, n, o]), /* @__PURE__ */ Le("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (r || []).map((f) => {
      const W = "wx-dkx3NwEn wx-line" + (N && f.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ c(
        "polyline",
        {
          className: W,
          points: f.$p,
          onClick: () => !s && t(f.id),
          "data-link-id": f.id
        },
        f.id
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
    let f = 0, W = 0, x = null;
    do {
      const q = o[W];
      W === N && (f > m ? x = 0 : x = Math.min((m - f) / q.duration, 1) * 100), f += q.duration, W++;
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
  } = t, o = Pe(Oe), [f, W] = tt(o, "_tasks"), [x, q] = tt(o, "_links"), D = F(o, "area"), h = F(o, "_scales"), P = F(o, "taskTypes"), d = F(o, "baselines"), [E, j] = tt(o, "_selected"), I = F(o, "_scrollTask"), G = F(o, "criticalPath"), C = F(o, "tasks"), _ = F(o, "schedule"), g = F(o, "splitTasks"), te = v(() => {
    if (!D || !Array.isArray(f)) return [];
    const e = D.start ?? 0, a = D.end ?? 0;
    return i && r ? f.map((k) => ({ ...k })) : f.slice(e, a).map((k) => ({ ...k }));
  }, [W, D, i, r]), K = F(o, "cellHeight"), ge = v(() => {
    if (!i || !r || !te.length) return te;
    const e = /* @__PURE__ */ new Map(), a = [];
    return f.forEach((k) => {
      const M = r.taskRows.get(k.id) ?? k.id;
      e.has(M) || (e.set(M, a.length), a.push(M));
    }), te.map((k) => {
      const M = r.taskRows.get(k.id) ?? k.id, S = e.get(M) ?? 0;
      return {
        ...k,
        $y: S * K,
        $y_base: k.$y_base !== void 0 ? S * K : void 0
      };
    });
  }, [te, i, r, f, K]), z = v(
    () => h.lengthUnitWidth,
    [h]
  ), ae = v(
    () => h.lengthUnit || "day",
    [h]
  ), se = ie(!1), [u, b] = me(void 0), [A, ce] = me(null), ne = ie(null), [re, ue] = me(null), [pe, De] = me(void 0), Ce = ie(null), [Se, Re] = me(0), [L, p] = me(null), [H, J] = me(null), [U, V] = me(null), Z = ie(null), Te = v(() => {
    const e = Z.current;
    return !!(E.length && e && e.contains(document.activeElement));
  }, [E, Z.current]), T = v(() => Te && E[E.length - 1]?.id, [Te, E]);
  le(() => {
    if (I && Te && I) {
      const { id: e } = I, a = Z.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      a && a.focus({ preventScroll: !0 });
    }
  }, [I]), le(() => {
    const e = Z.current;
    if (e && (Re(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const a = new ResizeObserver((k) => {
        k[0] && Re(k[0].contentRect.width);
      });
      return a.observe(e), () => a.disconnect();
    }
  }, [Z.current]);
  const X = R(() => {
    document.body.style.userSelect = "none";
  }, []), de = R(() => {
    document.body.style.userSelect = "";
  }, []), fe = R(
    (e, a, k) => {
      if (a.target.classList.contains("wx-line") || (k || (k = o.getTask(Xe(e))), k.type === "milestone" || k.type === "summary")) return "";
      const M = Ge(a, "data-segment");
      M && (e = M);
      const { left: S, width: B } = e.getBoundingClientRect(), ee = (a.clientX - S) / B;
      let ke = 0.2 / (B > 200 ? B / 200 : 1);
      return ee < ke ? "start" : ee > 1 - ke ? "end" : "";
    },
    [o]
  ), Ie = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !r)
      return f.forEach((M) => {
        e.set(M.id, M.$y);
      }), e;
    const a = /* @__PURE__ */ new Map(), k = [];
    return f.forEach((M) => {
      const S = r.taskRows.get(M.id) ?? M.id;
      a.has(S) || (a.set(S, k.length), k.push(S));
    }), f.forEach((M) => {
      const S = r.taskRows.get(M.id) ?? M.id, B = a.get(S) ?? 0;
      e.set(M.id, B * K);
    }), e;
  }, [f, i, r, K]), w = R(
    (e) => {
      const a = Z.current;
      if (!a) return [];
      const k = a.parentElement?.scrollLeft || 0, M = a.parentElement?.parentElement?.scrollTop || 0, S = Math.min(e.startX, e.currentX), B = Math.max(e.startX, e.currentX), ee = Math.min(e.startY, e.currentY), ke = Math.max(e.startY, e.currentY);
      return f.filter((xe) => {
        const Ae = xe.$x - k, ze = xe.$x + xe.$w - k, Ye = (Ie.get(xe.id) ?? xe.$y) - M, Ne = Ye + xe.$h;
        return Ae < B && ze > S && Ye < ke && Ne > ee;
      });
    },
    [f, Ie]
  ), oe = v(() => new Set(E.map((e) => e.id)), [E, j]), ye = R(
    (e) => oe.has(e),
    [oe]
  ), O = R(
    (e, a) => {
      const { clientX: k } = a, M = Xe(e), S = o.getTask(M), B = a.target.classList;
      if (!a.target.closest(".wx-delete-button") && !n) {
        if (B.contains("wx-progress-marker")) {
          const { progress: ee } = o.getTask(M);
          ne.current = {
            id: M,
            x: k,
            progress: ee,
            dx: 0,
            node: e,
            marker: a.target
          }, a.target.classList.add("wx-progress-in-drag");
        } else {
          const ee = fe(e, a, S) || "move", ke = {
            id: M,
            mode: ee,
            x: k,
            dx: 0,
            l: S.$x,
            w: S.$w
          };
          if (g && S.segments?.length) {
            const xe = Ge(a, "data-segment");
            xe && (ke.segmentIndex = xe.dataset.segment * 1, tn(S, ke));
          }
          ce(ke);
        }
        X();
      }
    },
    [o, n, fe, X, g]
  ), Q = R(
    (e) => {
      if (e.button !== 0) return;
      const a = Ge(e);
      if (!a && N && !n) {
        const k = Z.current;
        if (!k) return;
        const M = k.getBoundingClientRect(), S = e.clientX - M.left, B = e.clientY - M.top;
        if (m) {
          const ee = k.parentElement?.scrollLeft || 0, ke = S + ee, xe = Tn(ke, h);
          xe && V(xe);
        }
        p({
          startX: S,
          startY: B,
          currentX: S,
          currentY: B,
          ctrlKey: e.ctrlKey || e.metaKey
        }), X();
        return;
      }
      if (a) {
        if (N && !n && E.length > 1) {
          const k = Xe(a);
          if (ye(k)) {
            const M = e.target.classList;
            if (!M.contains("wx-link") && !M.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const S = o.getTask(k);
              if (!fe(a, e, S)) {
                const ee = /* @__PURE__ */ new Map();
                E.forEach((ke) => {
                  const xe = o.getTask(ke.id);
                  if (xe) {
                    if (_?.auto && xe.type === "summary") return;
                    ee.set(ke.id, {
                      $x: xe.$x,
                      $w: xe.$w,
                      start: xe.start,
                      end: xe.end
                    });
                  }
                }), J({
                  baseTaskId: k,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: ee
                }), X();
                return;
              }
            }
          }
        }
        O(a, e);
      }
    },
    [O, N, m, n, E, ye, o, fe, _, X, h]
  ), be = R(
    (e) => {
      const a = Ge(e);
      a && (Ce.current = setTimeout(() => {
        De(!0), O(a, e.touches[0]);
      }, 300));
    },
    [O]
  ), ve = R(
    (e) => {
      ue(e && { ...x.find((a) => a.id === e) });
    },
    [x]
  ), Me = R(() => {
    if (L) {
      const e = w(L);
      L.ctrlKey ? e.forEach((a) => {
        o.exec("select-task", { id: a.id, toggle: !0, marquee: !0 });
      }) : (E.length > 0 && o.exec("select-task", { id: null, marquee: !0 }), e.forEach((a, k) => {
        o.exec("select-task", {
          id: a.id,
          toggle: k > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), p(null), de(), se.current = !0;
      return;
    }
    if (H) {
      const { dx: e, originalPositions: a } = H, k = Math.round(e / z);
      if (k !== 0) {
        let M = !0;
        a.forEach((S, B) => {
          const ee = o.getTask(B);
          ee && (o.exec("update-task", {
            id: B,
            diff: k,
            task: { start: ee.start, end: ee.end },
            skipUndo: !M
            // Only first task creates undo entry
          }), M = !1);
        }), se.current = !0;
      } else
        a.forEach((M, S) => {
          o.exec("drag-task", {
            id: S,
            left: M.$x,
            width: M.$w,
            inProgress: !1
          });
        });
      J(null), de();
      return;
    }
    if (ne.current) {
      const { dx: e, id: a, marker: k, value: M } = ne.current;
      ne.current = null, typeof M < "u" && e && o.exec("update-task", {
        id: a,
        task: { progress: M },
        inProgress: !1
      }), k.classList.remove("wx-progress-in-drag"), se.current = !0, de();
    } else if (A) {
      const { id: e, mode: a, dx: k, l: M, w: S, start: B, segment: ee, index: ke } = A;
      if (ce(null), B) {
        const xe = Math.round(k / z);
        if (!xe)
          o.exec("drag-task", {
            id: e,
            width: S,
            left: M,
            inProgress: !1,
            ...ee && { segmentIndex: ke }
          });
        else {
          let Ae = {}, ze = o.getTask(e);
          ee && (ze = ze.segments[ke]);
          const qe = 1440 * 60 * 1e3, Ne = xe * (ae === "week" ? 7 : ae === "month" ? 30 : ae === "quarter" ? 91 : ae === "year" ? 365 : 1) * qe;
          a === "move" ? (Ae.start = new Date(ze.start.getTime() + Ne), Ae.end = new Date(ze.end.getTime() + Ne)) : a === "start" ? (Ae.start = new Date(ze.start.getTime() + Ne), Ae.end = ze.end) : a === "end" && (Ae.start = ze.start, Ae.end = new Date(ze.end.getTime() + Ne)), o.exec("update-task", {
            id: e,
            task: Ae,
            ...ee && { segmentIndex: ke }
          });
        }
        se.current = !0;
      }
      de();
    }
  }, [o, de, A, z, ae, L, H, w, E]), $e = R(
    (e, a) => {
      const { clientX: k, clientY: M } = a;
      if (!n) {
        if (L) {
          const S = Z.current;
          if (!S) return;
          const B = S.getBoundingClientRect(), ee = k - B.left, ke = M - B.top;
          p((xe) => ({
            ...xe,
            currentX: ee,
            currentY: ke
          }));
          return;
        }
        if (H) {
          const S = k - H.startX;
          H.originalPositions.forEach((B, ee) => {
            const ke = B.$x + S;
            o.exec("drag-task", {
              id: ee,
              left: ke,
              width: B.$w,
              inProgress: !0
            });
          }), J((B) => ({ ...B, dx: S }));
          return;
        }
        if (ne.current) {
          const { node: S, x: B, id: ee } = ne.current, ke = ne.current.dx = k - B, xe = Math.round(ke / S.offsetWidth * 100);
          let Ae = ne.current.progress + xe;
          ne.current.value = Ae = Math.min(
            Math.max(0, Ae),
            100
          ), o.exec("update-task", {
            id: ee,
            task: { progress: Ae },
            inProgress: !0
          });
        } else if (A) {
          ve(null);
          const { mode: S, l: B, w: ee, x: ke, id: xe, start: Ae, segment: ze, index: qe } = A, Ye = o.getTask(xe), Ne = k - ke;
          if (!Ae && Math.abs(Ne) < 20 || S === "start" && ee - Ne < z || S === "end" && ee + Ne < z || S === "move" && (Ne < 0 && B + Ne < 0 || Ne > 0 && B + ee + Ne > Se) || A.segment && !nn(Ye, A))
            return;
          const Je = { ...A, dx: Ne };
          let je, Ue;
          if (S === "start" ? (je = B + Ne, Ue = ee - Ne) : S === "end" ? (je = B, Ue = ee + Ne) : S === "move" && (je = B + Ne, Ue = ee), o.exec("drag-task", {
            id: xe,
            width: Ue,
            left: je,
            inProgress: !0,
            ...ze && { segmentIndex: qe }
          }), !Je.start && (S === "move" && Ye.$x == B || S !== "move" && Ye.$w == ee)) {
            se.current = !0, Me();
            return;
          }
          Je.start = !0, ce(Je);
        } else {
          const S = Ge(e);
          if (S) {
            const B = o.getTask(Xe(S)), ke = Ge(e, "data-segment") || S, xe = fe(ke, a, B);
            ke.style.cursor = xe && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      o,
      n,
      A,
      z,
      Se,
      fe,
      ve,
      Me,
      L,
      H
    ]
  ), He = R(
    (e) => {
      $e(e, e);
    },
    [$e]
  ), Ke = R(
    (e) => {
      pe ? (e.preventDefault(), $e(e, e.touches[0])) : Ce.current && (clearTimeout(Ce.current), Ce.current = null);
    },
    [pe, $e]
  ), l = R(() => {
    Me();
  }, [Me]), y = R(() => {
    De(null), Ce.current && (clearTimeout(Ce.current), Ce.current = null), Me();
  }, [Me]);
  le(() => (window.addEventListener("mouseup", l), () => {
    window.removeEventListener("mouseup", l);
  }), [l]);
  const $ = R(
    (e) => {
      if (!n) {
        const a = Ve(e.target);
        if (a && !e.target.classList.contains("wx-link")) {
          const k = Ve(e.target, "data-segment");
          o.exec("show-editor", {
            id: a,
            ...k !== null && { segmentIndex: k }
          });
        }
      }
    },
    [o, n]
  ), Y = ["e2s", "s2s", "e2e", "s2e"], we = R((e, a) => Y[(e ? 1 : 0) + (a ? 0 : 2)], []), he = R(
    (e, a) => {
      const k = u.id, M = u.start;
      return e === k ? !0 : !!x.find((S) => S.target == e && S.source == k && S.type === we(M, a));
    },
    [u, q, we]
  ), Ee = R(() => {
    u && b(null);
  }, [u]), We = R(
    (e) => {
      if (se.current) {
        se.current = !1;
        return;
      }
      const a = Ve(e.target);
      if (a) {
        const k = e.target.classList;
        if (k.contains("wx-link")) {
          const M = k.contains("wx-left");
          if (!u) {
            b({ id: a, start: M });
            return;
          }
          u.id !== a && !he(a, M) && o.exec("add-link", {
            link: {
              source: u.id,
              target: a,
              type: we(u.start, M)
            }
          });
        } else if (k.contains("wx-delete-button-icon"))
          o.exec("delete-link", { id: re.id }), ue(null);
        else {
          let M;
          const S = Ge(e, "data-segment");
          S && (M = S.dataset.segment * 1), o.exec("select-task", {
            id: a,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: M
          });
        }
      }
      Ee();
    },
    [
      o,
      u,
      q,
      re,
      he,
      we,
      Ee
    ]
  ), Wt = R((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), zt = R((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Pt = R(
    (e) => {
      if (pe || Ce.current)
        return e.preventDefault(), !1;
    },
    [pe]
  ), at = v(
    () => P.map((e) => e.id),
    [P]
  ), ut = R(
    (e) => {
      let a = at.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (a = `task ${a}`), a;
    },
    [at]
  ), dt = R(
    (e) => {
      o.exec(e.action, e.data);
    },
    [o]
  ), ot = R(
    (e) => G && C.byId(e).$critical,
    [G, C]
  ), ft = R(
    (e) => {
      if (_?.auto) {
        const a = C.getSummaryId(e, !0), k = C.getSummaryId(u.id, !0);
        return u?.id && !(Array.isArray(a) ? a : [a]).includes(
          u.id
        ) && !(Array.isArray(k) ? k : [k]).includes(e);
      }
      return u;
    },
    [_, C, u]
  ), ht = ie(null);
  ht.current = U;
  const mt = R(() => {
    const e = o.getState()._selected;
    if (!e || !e.length) return;
    const a = e.map((B) => {
      const ee = o.getTask(B.id);
      if (!ee) return null;
      const { $x: ke, $y: xe, $w: Ae, $h: ze, $skip: qe, $level: Ye, $index: Ne, $y_base: Je, $x_base: je, $w_base: Ue, $h_base: Yn, $skip_baseline: Fn, $critical: On, $reorder: Xn, ...Gt } = ee;
      return Gt;
    }).filter(Boolean);
    if (!a.length) return;
    const M = a[0].parent, S = a.filter((B) => B.parent === M);
    S.length !== 0 && (et = S, Qe = M, lt = et.reduce((B, ee) => ee.start && (!B || ee.start < B) ? ee.start : B, null));
  }, [o]), gt = R(() => {
    const e = ht.current;
    if (!et.length || !e || !lt || Qe == null) return;
    const a = e.getTime() - lt.getTime(), k = o.getHistory();
    k?.startBatch(), et.forEach((M, S) => {
      const B = `task-${Date.now()}-${S}`, ee = M.start ? new Date(M.start.getTime() + a) : null, ke = M.end ? new Date(M.end.getTime() + a) : null;
      o.exec("add-task", {
        task: {
          ...M,
          id: B,
          start: ee,
          end: ke,
          // Keep original parent and row from copied task
          parent: Qe,
          row: M.row
          // Each task keeps its own row
        },
        target: Qe,
        mode: "child",
        skipUndo: S > 0
      });
    }), k?.endBatch();
  }, [o]);
  le(() => m ? o.intercept("hotkey", (a) => {
    if (a.key === "ctrl+c" || a.key === "meta+c")
      return mt(), !1;
    if (a.key === "ctrl+v" || a.key === "meta+v")
      return gt(), !1;
  }) : void 0, [m, o, mt, gt]);
  const wt = v(() => {
    if (!L) return null;
    const e = Math.min(L.startX, L.currentX), a = Math.min(L.startY, L.currentY), k = Math.abs(L.currentX - L.startX), M = Math.abs(L.currentY - L.startY);
    return {
      left: `${e}px`,
      top: `${a}px`,
      width: `${k}px`,
      height: `${M}px`
    };
  }, [L]);
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${ge.length ? ge[0].$h : 0}px` },
      ref: Z,
      onContextMenu: Pt,
      onMouseDown: Q,
      onMouseMove: He,
      onTouchStart: be,
      onTouchMove: Ke,
      onTouchEnd: y,
      onClick: We,
      onDoubleClick: $,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ c(
          bn,
          {
            onSelectLink: ve,
            selectedLink: re,
            readonly: n
          }
        ),
        ge.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const a = `wx-bar wx-${ut(e.type)}` + (pe && A && e.id === A.id ? " wx-touch" : "") + (u && u.id === e.id ? " wx-selected" : "") + (oe.has(e.id) ? " wx-selected" : "") + (ot(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (g && e.segments ? " wx-split" : ""), k = "wx-link wx-left" + (u ? " wx-visible" : "") + (!u || !he(e.id, !0) && ft(e.id) ? " wx-target" : "") + (u && u.id === e.id && u.start ? " wx-selected" : "") + (ot(e.id) ? " wx-critical" : ""), M = "wx-link wx-right" + (u ? " wx-visible" : "") + (!u || !he(e.id, !1) && ft(e.id) ? " wx-target" : "") + (u && u.id === e.id && !u.start ? " wx-selected" : "") + (ot(e.id) ? " wx-critical" : "");
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
                  n ? null : e.id === re?.target && re?.type[2] === "s" ? /* @__PURE__ */ c(
                    xt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ c("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA " + k, children: /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-inner" }) }),
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
                  n ? null : e.id === re?.target && re?.type[2] === "e" ? /* @__PURE__ */ c(
                    xt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ c("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA " + M, children: /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            d && !e.$skip_baseline ? /* @__PURE__ */ c(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: zt(e)
              }
            ) : null
          ] }, e.id);
        }),
        L && wt && /* @__PURE__ */ c("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: wt })
      ]
    }
  );
}
function Mn(t) {
  const { highlightTime: n } = t, s = Pe(Oe), i = F(s, "_scales");
  return /* @__PURE__ */ c("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((r, N) => /* @__PURE__ */ c(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${r.height}px` },
      children: (r.cells || []).map((m, o) => {
        const f = n ? n(m.date, m.unit) : "", W = "wx-cell " + (m.css || "") + " " + (f || ""), x = typeof m.value == "string" && m.value.includes("<");
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
    rowMapping: f = null,
    marqueeSelect: W = !1,
    copyPaste: x = !1,
    scrollToCurrentWeek: q = !1,
    currentWeekColor: D = null
  } = t, h = Pe(Oe), [P, d] = tt(h, "_selected"), E = F(h, "scrollTop"), j = F(h, "cellHeight"), I = F(h, "cellWidth"), G = F(h, "_scales"), C = F(h, "_markers"), _ = F(h, "_scrollTask"), g = F(h, "zoom"), te = F(h, "_tasks"), [K, ge] = me(), z = ie(null), ae = ie(0), se = ie(!1), u = 1 + (G?.rows?.length || 0), b = v(() => {
    if (!o || !f || !te?.length) return null;
    const p = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), J = [];
    return te.forEach((U) => {
      const V = f.taskRows.get(U.id) ?? U.id;
      H.has(V) || (H.set(V, J.length), J.push(V));
    }), te.forEach((U) => {
      const V = f.taskRows.get(U.id) ?? U.id, Z = H.get(V) ?? 0;
      p.set(U.id, Z * j);
    }), p;
  }, [te, o, f, j]), A = v(() => {
    const p = [];
    return P && P.length && j && P.forEach((H) => {
      const J = b?.get(H.id) ?? H.$y;
      p.push({ height: `${j}px`, top: `${J - 3}px` });
    }), p;
  }, [d, j, b]), ce = v(
    () => Math.max(K || 0, i),
    [K, i]
  );
  le(() => {
    const p = z.current;
    p && typeof E == "number" && (p.scrollTop = E);
  }, [E]);
  const ne = () => {
    re();
  };
  function re(p) {
    const H = z.current;
    if (!H) return;
    const J = {};
    J.left = H.scrollLeft, h.exec("scroll-chart", J);
  }
  function ue() {
    const p = z.current, J = Math.ceil((K || 0) / (j || 1)) + 1, U = Math.floor((p && p.scrollTop || 0) / (j || 1)), V = Math.max(0, U - u), Z = U + J + u, Te = V * (j || 0);
    h.exec("render-data", {
      start: V,
      end: Z,
      from: Te
    });
  }
  le(() => {
    ue();
  }, [K, E]);
  const pe = R(
    (p) => {
      if (!p) return;
      const { id: H, mode: J } = p;
      if (J.toString().indexOf("x") < 0) return;
      const U = z.current;
      if (!U) return;
      const { clientWidth: V } = U, Z = h.getTask(H);
      if (Z.$x + Z.$w < U.scrollLeft)
        h.exec("scroll-chart", { left: Z.$x - (I || 0) }), U.scrollLeft = Z.$x - (I || 0);
      else if (Z.$x >= V + U.scrollLeft) {
        const Te = V < Z.$w ? I || 0 : Z.$w;
        h.exec("scroll-chart", { left: Z.$x - V + Te }), U.scrollLeft = Z.$x - V + Te;
      }
    },
    [h, I]
  );
  le(() => {
    pe(_);
  }, [_]);
  function De(p) {
    if (g && (p.ctrlKey || p.metaKey)) {
      p.preventDefault();
      const H = z.current, J = p.clientX - (H ? H.getBoundingClientRect().left : 0);
      if (ae.current += p.deltaY, Math.abs(ae.current) >= 150) {
        const V = -Math.sign(ae.current);
        ae.current = 0, h.exec("zoom-scale", {
          dir: V,
          offset: J
        });
      }
    }
  }
  const Ce = R((p) => {
    const H = m(p.date, p.unit);
    return H ? {
      css: H,
      width: p.width
    } : null;
  }, [m]), Se = v(() => {
    if (!G || !m || !["hour", "day", "week"].includes(G.minUnit)) return null;
    let H = 0;
    return G.rows[G.rows.length - 1].cells.map((J) => {
      const U = Ce(J), V = H;
      return H += J.width, U ? { ...U, left: V } : null;
    });
  }, [G, m, Ce]), Re = R(
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
  const L = ie(null);
  return le(() => {
    const p = z.current;
    if (p && !L.current)
      return L.current = It(p, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (H) => Re(H)
      }), () => {
        L.current?.destroy(), L.current = null;
      };
  }, []), le(() => {
    const p = z.current;
    if (!p) return;
    const H = De;
    return p.addEventListener("wheel", H), () => {
      p.removeEventListener("wheel", H);
    };
  }, [De]), le(() => {
    if (!q || se.current || !G || !z.current || !K) return;
    const p = z.current, { clientWidth: H } = p, J = /* @__PURE__ */ new Date(), U = G.rows[G.rows.length - 1]?.cells;
    if (!U) return;
    let V = -1, Z = 0;
    const Te = [];
    for (let X = 0; X < U.length; X++) {
      const de = U[X];
      Te.push({ left: Z, width: de.width });
      const fe = de.date;
      if (de.unit === "week") {
        const Ie = new Date(fe);
        Ie.setDate(Ie.getDate() + 7), J >= fe && J < Ie && (V = X);
      } else de.unit === "day" && J.getFullYear() === fe.getFullYear() && J.getMonth() === fe.getMonth() && J.getDate() === fe.getDate() && (V = X);
      Z += de.width;
    }
    let T = V;
    if (V > 0 && (T = V - 1), T >= 0 && Te[T]) {
      const X = Te[T], de = Math.max(0, X.left);
      p.scrollLeft = de, h.exec("scroll-chart", { left: de }), se.current = !0;
    }
  }, [q, G, K, h]), Rn("chart"), /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: z,
      onScroll: ne,
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
              /* @__PURE__ */ c(kn, { borders: N }),
              P && P.length ? P.map(
                (p, H) => p.$y ? /* @__PURE__ */ c(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": p.id,
                    style: A[H]
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
                  rowMapping: f,
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
    leftThreshold: f = 50,
    rightThreshold: W = 50
  } = t, [x, q] = it(t.value ?? 0), [D, h] = it(t.display ?? "all");
  function P(re) {
    let ue = 0;
    n == "center" ? ue = s / 2 : n == "before" && (ue = s);
    const pe = {
      size: [s + "px", "auto"],
      p: [re - ue + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let De in pe) pe[De] = pe[De].reverse();
    return pe;
  }
  const [d, E] = me(!1), [j, I] = me(null), G = ie(0), C = ie(), _ = ie(), g = ie(D);
  le(() => {
    g.current = D;
  }, [D]), le(() => {
    j === null && x > 0 && I(x);
  }, [j, x]);
  function te(re) {
    return i == "x" ? re.clientX : re.clientY;
  }
  const K = R(
    (re) => {
      const ue = C.current + te(re) - G.current;
      q(ue);
      let pe;
      ue <= f ? pe = "chart" : o - ue <= W ? pe = "grid" : pe = "all", g.current !== pe && (h(pe), g.current = pe), _.current && clearTimeout(_.current), _.current = setTimeout(() => r && r(ue), 100);
    },
    [o, f, W, r]
  ), ge = R(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", E(!1), window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", ge);
  }, [K]), z = v(
    () => D !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [D, i]
  ), ae = R(
    (re) => {
      !m && (D === "grid" || D === "chart") || (G.current = te(re), C.current = x, E(!0), document.body.style.cursor = z, document.body.style.userSelect = "none", window.addEventListener("mousemove", K), window.addEventListener("mouseup", ge));
    },
    [z, K, ge, x, m, D]
  );
  function se() {
    h("all"), j !== null && (q(j), r && r(j));
  }
  function u(re) {
    if (m) {
      const ue = D === "chart" ? "grid" : "chart";
      h(ue), N(ue);
    } else if (D === "grid" || D === "chart")
      se(), N("all");
    else {
      const ue = re === "left" ? "chart" : "grid";
      h(ue), N(ue);
    }
  }
  function b() {
    u("left");
  }
  function A() {
    u("right");
  }
  const ce = v(() => P(x), [x, n, s, i]), ne = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${D}`,
    d ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Le(
    "div",
    {
      className: "wx-pFykzMlT " + ne,
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
              onClick: A
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
    marqueeSelect: f = !1,
    copyPaste: W = !1,
    scrollToCurrentWeek: x = !1,
    currentWeekColor: q = null
  } = t, D = Pe(Oe), h = F(D, "_tasks"), P = F(D, "_scales"), d = F(D, "cellHeight"), E = F(D, "columns"), j = F(D, "_scrollTask"), I = F(D, "undo"), G = v(() => {
    if (!m) return o;
    const T = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map();
    return h.forEach((de) => {
      const fe = de.row ?? de.id;
      X.set(de.id, fe), T.has(fe) || T.set(fe, []), T.get(fe).push(de.id);
    }), { rowMap: T, taskRows: X };
  }, [h, m, o]), [C, _] = me(!1);
  let [g, te] = me(0);
  const [K, ge] = me(0), [z, ae] = me(0), [se, u] = me(void 0), [b, A] = me("all"), ce = ie(null), ne = R(
    (T) => {
      _((X) => (T !== X && (T ? (ce.current = b, b === "all" && A("grid")) : (!ce.current || ce.current === "all") && A("all")), T));
    },
    [b]
  );
  le(() => {
    const T = At(ne);
    return T.observe(), () => {
      T.disconnect();
    };
  }, [ne]);
  const re = v(() => {
    let T;
    return E.every((X) => X.width && !X.flexgrow) ? T = E.reduce((X, de) => X + parseInt(de.width), 0) : C && b === "chart" ? T = parseInt(E.find((X) => X.id === "action")?.width) || 50 : T = 440, g = T, T;
  }, [E, C, b]);
  le(() => {
    te(re);
  }, [re]);
  const ue = v(
    () => (K ?? 0) - (se ?? 0),
    [K, se]
  ), pe = v(() => P.width, [P]), De = v(() => {
    if (!m || !G)
      return h.length * d;
    const T = /* @__PURE__ */ new Set();
    return h.forEach((X) => {
      const de = G.taskRows.get(X.id) ?? X.id;
      T.add(de);
    }), T.size * d;
  }, [h, d, m, G]), Ce = v(
    () => P.height + De + ue,
    [P, De, ue]
  ), Se = v(
    () => g + pe,
    [g, pe]
  ), Re = ie(null), L = R(() => {
    Promise.resolve().then(() => {
      if ((K ?? 0) > (Se ?? 0)) {
        const T = (K ?? 0) - g;
        D.exec("expand-scale", { minWidth: T });
      }
    });
  }, [K, Se, g, D]);
  le(() => {
    let T;
    return Re.current && (T = new ResizeObserver(L), T.observe(Re.current)), () => {
      T && T.disconnect();
    };
  }, [Re.current, L]), le(() => {
    L();
  }, [pe]);
  const p = ie(null), H = ie(null), J = R(() => {
    const T = p.current;
    T && D.exec("scroll-chart", {
      top: T.scrollTop
    });
  }, [D]), U = ie({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  le(() => {
    U.current = {
      rTasks: h,
      rScales: P,
      rCellHeight: d,
      scrollSize: ue,
      ganttDiv: p.current,
      ganttHeight: z ?? 0
    };
  }, [h, P, d, ue, z]);
  const V = R(
    (T) => {
      if (!T) return;
      const {
        rTasks: X,
        rScales: de,
        rCellHeight: fe,
        scrollSize: Ie,
        ganttDiv: w,
        ganttHeight: oe
      } = U.current;
      if (!w) return;
      const { id: ye } = T, O = X.findIndex((Q) => Q.id === ye);
      if (O > -1) {
        const Q = oe - de.height, be = O * fe, ve = w.scrollTop;
        let Me = null;
        be < ve ? Me = be : be + fe > ve + Q && (Me = be - Q + fe + Ie), Me !== null && (D.exec("scroll-chart", { top: Math.max(Me, 0) }), p.current.scrollTop = Math.max(Me, 0));
      }
    },
    [D]
  );
  le(() => {
    V(j);
  }, [j]), le(() => {
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
          "ctrl+z": I,
          "ctrl+y": I,
          "meta+z": I,
          "meta+shift+z": I
        },
        exec: (X) => {
          X.isInput || D.exec("hotkey", X);
        }
      }), () => {
        Te.current?.destroy(), Te.current = null;
      };
  }, [I]), /* @__PURE__ */ c("div", { className: "wx-jlbQoHOz wx-gantt", ref: p, onScroll: J, children: /* @__PURE__ */ c(
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
            width: se
          },
          children: /* @__PURE__ */ Le("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Z, children: [
            E.length ? /* @__PURE__ */ Le(Ze, { children: [
              /* @__PURE__ */ c(
                yn,
                {
                  display: b,
                  compactMode: C,
                  columnWidth: re,
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
                  onDisplayChange: (T) => A(T)
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
                marqueeSelect: f,
                copyPaste: W,
                scrollToCurrentWeek: x,
                currentWeekColor: q
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
  scales: f = Pn,
  columns: W = ln,
  start: x = null,
  end: q = null,
  lengthUnit: D = "day",
  durationUnit: h = "day",
  cellWidth: P = 100,
  cellHeight: d = 38,
  scaleHeight: E = 36,
  readonly: j = !1,
  cellBorders: I = "full",
  zoom: G = !1,
  baselines: C = !1,
  highlightTime: _ = null,
  init: g = null,
  autoScale: te = !0,
  unscheduledTasks: K = !1,
  criticalPath: ge = null,
  schedule: z = { type: "forward" },
  projectStart: ae = null,
  projectEnd: se = null,
  calendar: u = null,
  undo: b = !1,
  splitTasks: A = !1,
  multiTaskRows: ce = !1,
  marqueeSelect: ne = !1,
  copyPaste: re = !1,
  currentWeekHighlight: ue = !1,
  currentWeekColor: pe = null,
  scrollToCurrentWeek: De = !1,
  ...Ce
}, Se) {
  const Re = ie();
  Re.current = Ce;
  const L = v(() => new sn(un), []), p = v(() => ({ ...ct, ...rt }), []), H = Pe(_e.i18n), J = v(() => H ? H.extend(p, !0) : st(p), [H, p]), U = v(() => J.getRaw().calendar, [J]), V = v(() => {
    let Q = {
      zoom: Wn(G, U),
      scales: Ht(f, U),
      columns: Hn(W, U),
      links: rn(o),
      cellWidth: P
    };
    return Q.zoom && (Q = {
      ...Q,
      ...on(
        Q.zoom,
        An(U, J.getGroup("gantt")),
        Q.scales,
        P
      )
    }), Q;
  }, [G, f, W, o, P, U, J]), Z = ie(null);
  Z.current !== r && (bt(r, { durationUnit: h, splitTasks: A, calendar: u }), Z.current = r), le(() => {
    bt(r, { durationUnit: h, splitTasks: A, calendar: u });
  }, [r, h, u, A]);
  const Te = v(() => {
    if (!ce) return null;
    const Q = /* @__PURE__ */ new Map(), be = /* @__PURE__ */ new Map(), ve = (Me) => {
      Me.forEach(($e) => {
        const He = $e.row ?? $e.id;
        be.set($e.id, He), Q.has(He) || Q.set(He, []), Q.get(He).push($e.id), $e.data && $e.data.length > 0 && ve($e.data);
      });
    };
    return ve(r), { rowMap: Q, taskRows: be };
  }, [r, ce]), T = v(() => L.in, [L]), X = ie(null);
  X.current === null && (X.current = new Jt((Q, be) => {
    const ve = "on" + zn(Q);
    Re.current && Re.current[ve] && Re.current[ve](be);
  }), T.setNext(X.current));
  const [de, fe] = me(null), Ie = ie(null);
  Ie.current = de;
  const w = v(
    () => ({
      getState: L.getState.bind(L),
      getReactiveState: L.getReactive.bind(L),
      getStores: () => ({ data: L }),
      exec: T.exec,
      setNext: (Q) => (X.current = X.current.setNext(Q), X.current),
      intercept: T.intercept.bind(T),
      on: T.on.bind(T),
      detach: T.detach.bind(T),
      getTask: L.getTask.bind(L),
      serialize: L.serialize.bind(L),
      getTable: (Q) => Q ? new Promise((be) => setTimeout(() => be(Ie.current), 1)) : Ie.current,
      getHistory: () => L.getHistory()
    }),
    [L, T]
  );
  Dt(
    Se,
    () => ({
      ...w
    }),
    [w]
  );
  const oe = ie(0);
  le(() => {
    oe.current ? L.init({
      tasks: r,
      links: V.links,
      start: x,
      columns: V.columns,
      end: q,
      lengthUnit: D,
      cellWidth: V.cellWidth,
      cellHeight: d,
      scaleHeight: E,
      scales: V.scales,
      taskTypes: i,
      zoom: V.zoom,
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
      projectEnd: se,
      calendar: u,
      undo: b,
      _weekStart: U.weekStart,
      splitTasks: A
    }) : g && g(w), oe.current++;
  }, [
    w,
    g,
    r,
    V,
    x,
    q,
    D,
    d,
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
    se,
    u,
    b,
    U,
    A,
    L
  ]), oe.current === 0 && L.init({
    tasks: r,
    links: V.links,
    start: x,
    columns: V.columns,
    end: q,
    lengthUnit: D,
    cellWidth: V.cellWidth,
    cellHeight: d,
    scaleHeight: E,
    scales: V.scales,
    taskTypes: i,
    zoom: V.zoom,
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
    projectEnd: se,
    calendar: u,
    undo: b,
    _weekStart: U.weekStart,
    splitTasks: A
  });
  const ye = v(() => {
    const Q = /* @__PURE__ */ new Date(), be = U?.weekStart ?? 0, ve = new Date(Q), $e = (ve.getDay() - be + 7) % 7;
    ve.setDate(ve.getDate() - $e), ve.setHours(0, 0, 0, 0);
    const He = new Date(ve);
    return He.setDate(He.getDate() + 7), (Ke) => Ke >= ve && Ke < He;
  }, [U]), O = v(() => (Q, be) => {
    let ve = [];
    if (u)
      be == "day" && !u.getDayHours(Q) && ve.push("wx-weekend"), be == "hour" && !u.getDayHours(Q) && ve.push("wx-weekend");
    else if (_) {
      const Me = _(Q, be);
      Me && ve.push(Me);
    }
    return ue && (be === "week" || be === "day") && ye(Q) && ve.push("wx-current-week"), ve.join(" ");
  }, [u, _, ue, ye]);
  return /* @__PURE__ */ c(_e.i18n.Provider, { value: J, children: /* @__PURE__ */ c(Oe.Provider, { value: w, children: /* @__PURE__ */ c(
    Nn,
    {
      taskTemplate: n,
      readonly: j,
      cellBorders: I,
      highlightTime: O,
      onTableAPIChange: fe,
      multiTaskRows: ce,
      rowMapping: Te,
      marqueeSelect: ne,
      copyPaste: re,
      scrollToCurrentWeek: De,
      currentWeekColor: pe
    }
  ) }) });
});
function is({ api: t = null, items: n = [] }) {
  const s = Pe(_e.i18n), i = v(() => s || st(rt), [s]), r = v(() => i.getGroup("gantt"), [i]), N = Fe(t, "_selected"), m = Fe(t, "undo"), o = Fe(t, "history"), f = Fe(t, "splitTasks"), W = ["undo", "redo"], x = v(() => {
    const D = vt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : vt({
      undo: m,
      splitTasks: f
    })).map((P) => {
      let d = { ...P, disabled: !1 };
      return d.handler = Lt(D, d.id) ? (E) => Nt(t, E.id, null, r) : d.handler, d.text && (d.text = r(d.text)), d.menuText && (d.menuText = r(d.menuText)), d;
    });
  }, [n, t, r, m, f]), q = v(() => {
    const D = [];
    return x.forEach((h) => {
      const P = h.id;
      if (P === "add-task")
        D.push(h);
      else if (W.includes(P))
        W.includes(P) && D.push({
          ...h,
          disabled: h.isDisabled(o)
        });
      else {
        if (!N?.length || !t) return;
        D.push({
          ...h,
          disabled: h.isDisabled && N.some((d) => h.isDisabled(d, t.getState()))
        });
      }
    }), D.filter((h, P) => {
      if (t && h.isHidden)
        return !N.some((d) => h.isHidden(d, t.getState()));
      if (h.comp === "separator") {
        const d = D[P + 1];
        if (!d || d.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, N, o, x]);
  return s ? /* @__PURE__ */ c($t, { items: q }) : /* @__PURE__ */ c(_e.i18n.Provider, { value: i, children: /* @__PURE__ */ c($t, { items: q }) });
}
const cs = Et(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: r = null,
  at: N = "point",
  children: m,
  onClick: o,
  css: f
}, W) {
  const x = ie(null), q = ie(null), D = Pe(_e.i18n), h = v(() => D || st({ ...rt, ...ct }), [D]), P = v(() => h.getGroup("gantt"), [h]), d = Fe(s, "taskTypes"), E = Fe(s, "selected"), j = Fe(s, "_selected"), I = Fe(s, "splitTasks"), G = v(() => Tt({ splitTasks: !0 }), []);
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
    const u = n.length ? n : Tt({ splitTasks: I }), b = u.find((A) => A.id === "convert-task");
    return b && (b.data = [], (d || []).forEach((A) => {
      b.data.push(b.dataFactory(A));
    })), C(u);
  }
  const g = v(() => _(), [s, n, d, I, P]), te = v(
    () => j && j.length ? j : [],
    [j]
  ), K = R(
    (u, b) => {
      let A = u ? s?.getTask(u) : null;
      if (i) {
        const ce = i(u, b);
        A = ce === !0 ? A : ce;
      }
      if (A) {
        const ce = Ve(b.target, "data-segment");
        ce !== null ? q.current = { id: A.id, segmentIndex: ce } : q.current = A.id, (!Array.isArray(E) || !E.includes(A.id)) && s && s.exec && s.exec("select-task", { id: A.id });
      }
      return A;
    },
    [s, i, E]
  ), ge = R(
    (u) => {
      const b = u.action;
      b && (Lt(G, b.id) && Nt(s, b.id, q.current, P), o && o(u));
    },
    [s, P, o, G]
  ), z = R(
    (u, b) => {
      const A = te.length ? te : b ? [b] : [];
      let ce = r ? A.every((ne) => r(u, ne)) : !0;
      if (ce && (u.isHidden && (ce = !A.some(
        (ne) => u.isHidden(ne, s.getState(), q.current)
      )), u.isDisabled)) {
        const ne = A.some(
          (re) => u.isDisabled(re, s.getState(), q.current)
        );
        u.disabled = ne;
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
  const ae = R((u) => {
    x.current && x.current.show && x.current.show(u);
  }, []), se = /* @__PURE__ */ Le(Ze, { children: [
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
        css: f
      }
    ),
    /* @__PURE__ */ c("span", { onContextMenu: ae, "data-menu-ignore": "true", children: typeof m == "function" ? m() : m })
  ] });
  if (!D && _e.i18n?.Provider) {
    const u = _e.i18n.Provider;
    return /* @__PURE__ */ c(u, { value: h, children: se });
  }
  return se;
});
function Gn({ api: t, autoSave: n, onLinksChange: s }) {
  const r = Pe(_e.i18n).getGroup("gantt"), N = F(t, "activeTask"), m = F(t, "_activeTask"), o = F(t, "_links"), f = F(t, "schedule"), W = F(t, "unscheduledTasks"), [x, q] = me();
  function D() {
    if (N) {
      const E = o.filter((I) => I.target == N).map((I) => ({ link: I, task: t.getTask(I.source) })), j = o.filter((I) => I.source == N).map((I) => ({ link: I, task: t.getTask(I.target) }));
      return [
        { title: r("Predecessors"), data: E },
        { title: r("Successors"), data: j }
      ];
    }
  }
  le(() => {
    q(D());
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
    n ? t.exec("delete-link", { id: E }) : (q(
      (j) => (j || []).map((I) => ({
        ...I,
        data: I.data.filter((G) => G.link.id !== E)
      }))
    ), s && s({
      id: E,
      action: "delete-link",
      data: { id: E }
    }));
  }
  function d(E, j) {
    n ? t.exec("update-link", {
      id: E,
      link: j
    }) : (q(
      (I) => (I || []).map((G) => ({
        ...G,
        data: G.data.map(
          (C) => C.link.id === E ? { ...C, link: { ...C.link, ...j } } : C
        )
      }))
    ), s && s({
      id: E,
      action: "update-link",
      data: {
        id: E,
        link: j
      }
    }));
  }
  return /* @__PURE__ */ c(Ze, { children: (x || []).map(
    (E, j) => E.data.length ? /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ c(Ft, { label: E.title, position: "top", children: /* @__PURE__ */ c("table", { children: /* @__PURE__ */ c("tbody", { children: E.data.map((I) => /* @__PURE__ */ Le("tr", { children: [
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-task-name", children: I.task.text || "" }) }),
      f?.auto && I.link.type === "e2s" ? /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ c(
        Ot,
        {
          type: "number",
          placeholder: r("Lag"),
          value: I.link.lag,
          disabled: W && m?.unscheduled,
          onChange: (G) => {
            G.input || d(I.link.id, { lag: G.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ c(
        Xt,
        {
          value: I.link.type,
          placeholder: r("Select link type"),
          options: h,
          onChange: (G) => d(I.link.id, { type: G.value }),
          children: ({ option: G }) => G.label
        }
      ) }) }),
      /* @__PURE__ */ c("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ c(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => P(I.link.id),
          role: "button"
        }
      ) })
    ] }, I.link.id)) }) }) }) }, j) : null
  ) });
}
function _n(t) {
  const { value: n, time: s, format: i, onchange: r, onChange: N, ...m } = t, o = N ?? r;
  function f(W) {
    const x = new Date(W.value);
    x.setHours(n.getHours()), x.setMinutes(n.getMinutes()), o && o({ value: x });
  }
  return /* @__PURE__ */ Le("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ c(
      Kt,
      {
        ...m,
        value: n,
        onChange: f,
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
  autoSave: f = !0,
  focus: W = !1,
  hotkeys: x = {}
}) {
  const q = Pe(_e.i18n), D = v(() => q || st({ ...rt, ...ct }), [q]), h = v(() => D.getGroup("gantt"), [D]), P = D.getRaw(), d = v(() => {
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
      return f ? { items: w } : {
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
  }, [o, r, f, h]), [j, I] = me(!1), G = v(
    () => j ? "wx-full-screen" : "",
    [j]
  ), C = R((w) => {
    I(w);
  }, []);
  le(() => {
    const w = At(C);
    return w.observe(), () => {
      w.disconnect();
    };
  }, [C]);
  const _ = F(t, "_activeTask"), g = F(t, "activeTask"), te = F(t, "unscheduledTasks"), K = F(t, "links"), ge = F(t, "splitTasks"), z = v(
    () => ge && g?.segmentIndex,
    [ge, g]
  ), ae = v(
    () => z || z === 0,
    [z]
  ), se = v(
    () => an({ unscheduledTasks: te }),
    [te]
  ), u = F(t, "undo"), [b, A] = me({}), [ce, ne] = me(null), [re, ue] = me(), [pe, De] = me(null), Ce = F(t, "taskTypes"), Se = v(() => {
    if (!_) return null;
    let w;
    if (ae && _.segments ? w = { ..._.segments[z] } : w = { ..._ }, r) {
      let oe = { parent: w.parent };
      return se.forEach(({ key: ye, comp: O }) => {
        if (O !== "links") {
          const Q = w[ye];
          O === "date" && Q instanceof Date ? oe[ye] = d(Q) : O === "slider" && ye === "progress" ? oe[ye] = `${Q}%` : oe[ye] = Q;
        }
      }), oe;
    }
    return w || null;
  }, [_, ae, z, r, se, d]);
  le(() => {
    ue(Se);
  }, [Se]), le(() => {
    A({}), De(null), ne(null);
  }, [g]);
  function Re(w, oe) {
    return w.map((ye) => {
      const O = { ...ye };
      if (ye.config && (O.config = { ...O.config }), O.comp === "links" && t && (O.api = t, O.autoSave = f, O.onLinksChange = H), O.comp === "select" && O.key === "type") {
        const Q = O.options ?? (Ce || []);
        O.options = Q.map((be) => ({
          ...be,
          label: h(be.label)
        }));
      }
      return O.comp === "slider" && O.key === "progress" && (O.labelTemplate = (Q) => `${h(O.label)} ${Q}%`), O.label && (O.label = h(O.label)), O.config?.placeholder && (O.config.placeholder = h(O.config.placeholder)), oe && (O.isDisabled && O.isDisabled(oe, t.getState()) ? O.disabled = !0 : delete O.disabled), O;
    });
  }
  const L = v(() => {
    let w = n.length ? n : se;
    return w = Re(w, re), re ? w.filter(
      (oe) => !oe.isHidden || !oe.isHidden(re, t.getState())
    ) : w;
  }, [n, se, re, Ce, h, t, f]), p = v(
    () => L.map((w) => w.key),
    [L]
  );
  function H({ id: w, action: oe, data: ye }) {
    A((O) => ({
      ...O,
      [w]: { action: oe, data: ye }
    }));
  }
  const J = R(() => {
    for (let w in b)
      if (K.byId(w)) {
        const { action: oe, data: ye } = b[w];
        t.exec(oe, ye);
      }
  }, [t, b, K]), U = R(() => {
    const w = g?.id || g;
    if (ae) {
      if (_?.segments) {
        const oe = _.segments.filter(
          (ye, O) => O !== z
        );
        t.exec("update-task", {
          id: w,
          task: { segments: oe }
        });
      }
    } else
      t.exec("delete-task", { id: w });
  }, [t, g, ae, _, z]), V = R(() => {
    t.exec("show-editor", { id: null });
  }, [t]), Z = R(
    (w) => {
      const { item: oe, changes: ye } = w;
      oe.id === "delete" && U(), oe.id === "save" && (ye.length ? V() : J()), oe.comp && V();
    },
    [t, g, f, J, U, V]
  ), Te = R(
    (w, oe, ye) => (te && w.type === "summary" && (w.unscheduled = !1), St(w, t.getState(), oe), ye || ne(!1), w),
    [te, t]
  ), T = R(
    (w) => {
      w = {
        ...w,
        unscheduled: te && w.unscheduled && w.type !== "summary"
      }, delete w.links, delete w.data, (p.indexOf("duration") === -1 || w.segments && !w.duration) && delete w.duration;
      const oe = {
        id: g?.id || g,
        task: w,
        ...ae && { segmentIndex: z }
      };
      f && ce && (oe.inProgress = ce), t.exec("update-task", oe), f || J();
    },
    [
      t,
      g,
      te,
      f,
      J,
      p,
      ae,
      z,
      ce
    ]
  ), X = R(
    (w) => {
      let { update: oe, key: ye, input: O } = w;
      if (O && ne(!0), w.update = Te({ ...oe }, ye, O), !f) ue(w.update);
      else if (!pe && !O) {
        const Q = L.find((Me) => Me.key === ye), be = oe[ye];
        (!Q.validation || Q.validation(be)) && (!Q.required || be) && T(w.update);
      }
    },
    [f, Te, pe, L, T]
  ), de = R(
    (w) => {
      f || T(w.values);
    },
    [f, T]
  ), fe = R((w) => {
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
      items: L,
      values: Se,
      topBar: E,
      bottomBar: m,
      placement: N,
      layout: i,
      readonly: r,
      autoSave: f,
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
  const { api: n, content: s, children: i } = t, r = ie(null), N = ie(null), [m, o] = me({}), [f, W] = me(null), [x, q] = me({});
  function D(C) {
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
      _.right >= m.right && (te = m.width - _.width - 5, g = !0), _.bottom >= m.bottom && (K = x.top - (_.bottom - m.bottom + 2), g = !0), g && q((ge) => ge && { ...ge, left: te, top: K });
    }
  }, [x, m, s]);
  const h = ie(null), P = 300, d = (C) => {
    clearTimeout(h.current), h.current = setTimeout(() => {
      C();
    }, P);
  };
  function E(C) {
    let { id: _, tooltip: g, target: te, at: K } = D(C.target);
    if (q(null), W(null), !g)
      if (_)
        g = I(_);
      else {
        clearTimeout(h.current);
        return;
      }
    const ge = C.clientX;
    d(() => {
      _ && W(j(G(_)));
      const z = te.getBoundingClientRect(), ae = r.current, se = ae ? ae.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let u, b;
      K === "left" ? (u = z.top + 5 - se.top, b = z.right + 5 - se.left) : (u = z.top + z.height - se.top, b = ge - se.left), o(se), q({ top: u, left: b, text: g });
    });
  }
  function j(C) {
    return n?.getTask(G(C)) || null;
  }
  function I(C) {
    return j(C)?.text || "";
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
            children: s ? /* @__PURE__ */ c(s, { data: f }) : x.text ? /* @__PURE__ */ c("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: x.text }) : null
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
  return n ? /* @__PURE__ */ c(yt, { fonts: t, children: n }) : /* @__PURE__ */ c(yt, { fonts: t });
}
function ms({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ c(kt, { fonts: t, children: n }) : /* @__PURE__ */ c(kt, { fonts: t });
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
  ys as defaultMenuOptions,
  ks as defaultTaskTypes,
  bs as defaultToolbarButtons,
  vs as getEditorItems,
  Ts as getMenuOptions,
  $s as getToolbarButtons,
  Rs as registerEditorItem,
  Ms as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
