import { jsxs as Se, jsx as a, Fragment as qe } from "react/jsx-runtime";
import { createContext as Nt, useMemo as v, useState as ge, useContext as He, useCallback as S, useRef as ie, useEffect as le, Fragment as Lt, forwardRef as vt, useImperativeHandle as Tt } from "react";
import { context as Pe, Button as dt, Field as Dt, Text as It, Combo as At, DatePicker as Ht, TimePicker as Wt, Locale as zt, RichSelect as Gt, TwoState as Pt, Slider as _t, Counter as Yt, Material as ft, Willow as ht, WillowDark as mt } from "@svar-ui/react-core";
import { locate as Ge, locateID as Ke, locateAttr as Ft, dateToString as Ze, locale as Je } from "@svar-ui/lib-dom";
import { en as et } from "@svar-ui/gantt-locales";
import { en as ot } from "@svar-ui/core-locales";
import { EventBusRouter as Ot } from "@svar-ui/lib-state";
import { prepareEditTask as $t, grid as Xt, extendDragOptions as Kt, isSegmentMoveAllowed as Vt, DataStore as qt, normalizeLinks as Bt, normalizeZoom as jt, defaultColumns as Ut, parseTaskDates as gt, defaultTaskTypes as Qt, getToolbarButtons as wt, handleAction as Mt, isHandledAction as Ct, getMenuOptions as xt, getEditorItems as Zt } from "@svar-ui/gantt-store";
import { defaultColumns as ns, defaultEditorItems as ss, defaultMenuOptions as rs, defaultTaskTypes as os, defaultToolbarButtons as ls, getEditorItems as is, getMenuOptions as cs, getToolbarButtons as as, registerScaleUnit as us } from "@svar-ui/gantt-store";
import { useWritableProp as rt, useStore as Y, useStoreWithCounter as Qe, writable as Jt, useStoreLater as _e } from "@svar-ui/lib-react";
import { hotkeys as Rt } from "@svar-ui/grid-store";
import { Grid as en, HeaderMenu as tn } from "@svar-ui/react-grid";
import { flushSync as nn } from "react-dom";
import { Toolbar as pt } from "@svar-ui/react-toolbar";
import { ContextMenu as sn } from "@svar-ui/react-menu";
import { Editor as rn, registerEditorItem as Ve } from "@svar-ui/react-editor";
import { registerEditorItem as fs } from "@svar-ui/react-editor";
const Ye = Nt(null);
function Xe(t) {
  const n = t.getAttribute("data-id"), s = parseInt(n);
  return isNaN(s) || s.toString() != n ? n : s;
}
function on(t, n, s) {
  const i = t.getBoundingClientRect(), o = n.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: i.top - o.top,
    left: i.left - o.left,
    dt: i.bottom - s.clientY,
    db: s.clientY - i.top
  };
}
function kt(t) {
  return t && t.getAttribute("data-context-id");
}
const yt = 5;
function ln(t, n) {
  let s, i, o, L, r, y, k, I, h;
  function D(f) {
    L = f.clientX, r = f.clientY, y = {
      ...on(s, t, f),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function x(f) {
    s = Ge(f), kt(s) && (o = Xe(s), h = setTimeout(() => {
      I = !0, n && n.touchStart && n.touchStart(), D(f.touches[0]);
    }, 500), t.addEventListener("touchmove", N), t.addEventListener("contextmenu", M), window.addEventListener("touchend", Q));
  }
  function M(f) {
    if (I || h)
      return f.preventDefault(), !1;
  }
  function V(f) {
    f.which === 1 && (s = Ge(f), kt(s) && (o = Xe(s), t.addEventListener("mousemove", F), window.addEventListener("mouseup", T), D(f)));
  }
  function c(f) {
    t.removeEventListener("mousemove", F), t.removeEventListener("touchmove", N), document.body.removeEventListener("mouseup", T), document.body.removeEventListener("touchend", Q), document.body.style.userSelect = "", f && (t.removeEventListener("mousedown", V), t.removeEventListener("touchstart", x));
  }
  function P(f) {
    const j = f.clientX - L, se = f.clientY - r;
    if (!i) {
      if (Math.abs(j) < yt && Math.abs(se) < yt || n && n.start && n.start({ id: o, e: f }) === !1)
        return;
      i = s.cloneNode(!0), i.style.pointerEvents = "none", i.classList.add("wx-reorder-task"), i.style.position = "absolute", i.style.left = y.left + "px", i.style.top = y.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(i, s);
    }
    if (i) {
      const q = Math.round(Math.max(0, y.top + se));
      if (n && n.move && n.move({ id: o, top: q, detail: k }) === !1)
        return;
      const U = n.getTask(o), fe = U.$y;
      if (!y.start && y.y == fe) return G();
      y.start = !0, y.y = U.$y - 4, i.style.top = q + "px";
      const C = document.elementFromPoint(
        f.clientX,
        f.clientY
      ), R = Ge(C);
      if (R && R !== s) {
        const p = Xe(R), O = R.getBoundingClientRect(), J = O.top + O.height / 2, te = f.clientY + y.db > J && R.nextElementSibling !== s, ce = f.clientY - y.dt < J && R.previousElementSibling !== s;
        k?.after == p || k?.before == p ? k = null : te ? k = { id: o, after: p } : ce && (k = { id: o, before: p });
      }
    }
  }
  function F(f) {
    P(f);
  }
  function N(f) {
    I ? (f.preventDefault(), P(f.touches[0])) : h && (clearTimeout(h), h = null);
  }
  function Q() {
    I = null, h && (clearTimeout(h), h = null), G();
  }
  function T() {
    G();
  }
  function G() {
    s && (s.style.visibility = ""), i && (i.parentNode.removeChild(i), n && n.end && n.end({ id: o, top: y.top })), o = s = i = y = k = null, c();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", V), t.addEventListener("touchstart", x), {
    destroy() {
      c(!0);
    }
  };
}
function cn({ row: t, column: n }) {
  function s(o, L) {
    return {
      justifyContent: L.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const i = n && n._cell;
  return /* @__PURE__ */ Se("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
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
function bt({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ a("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ a(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": s
    }
  ) }) : null;
}
function an(t) {
  const {
    readonly: n,
    compactMode: s,
    width: i = 0,
    display: o = "all",
    columnWidth: L = 0,
    onTableAPIChange: r,
    multiTaskRows: y = !1,
    rowMapping: k = null
  } = t, [I, h] = rt(L), [D, x] = ge(), M = He(Pe.i18n), V = v(() => M.getGroup("gantt"), [M]), c = He(Ye), P = Y(c, "scrollTop"), F = Y(c, "cellHeight"), N = Y(c, "_scrollTask"), Q = Y(c, "_selected"), T = Y(c, "area"), G = Y(c, "_tasks"), f = Y(c, "_scales"), j = Y(c, "columns"), se = Y(c, "_sort"), q = Y(c, "calendar"), U = Y(c, "durationUnit"), fe = Y(c, "splitTasks"), [C, R] = ge(null), p = v(() => !G || !T ? [] : G.slice(T.start, T.end), [G, T]), O = S(
    (l, w) => {
      if (w === "add-task")
        c.exec(w, {
          target: l,
          task: { text: V("New Task") },
          mode: "child",
          show: !0
        });
      else if (w === "open-task") {
        const $ = p.find((K) => K.id === l);
        ($?.data || $?.lazy) && c.exec(w, { id: l, mode: !$.open });
      }
    },
    [p]
  ), J = S(
    (l) => {
      const w = Ke(l), $ = l.target.dataset.action;
      $ && l.preventDefault(), w ? $ === "add-task" || $ === "open-task" ? O(w, $) : c.exec("select-task", {
        id: w,
        toggle: l.ctrlKey || l.metaKey,
        range: l.shiftKey,
        show: !0
      }) : $ === "add-task" && O(null, $);
    },
    [c, O]
  ), te = ie(null), ce = ie(null), [ae, ye] = ge(0), [ve, Re] = ge(!1);
  le(() => {
    const l = ce.current;
    if (!l || typeof ResizeObserver > "u") return;
    const w = () => ye(l.clientWidth);
    w();
    const $ = new ResizeObserver(w);
    return $.observe(l), () => $.disconnect();
  }, []);
  const Te = ie(null), _ = S(
    (l) => {
      const w = l.id, { before: $, after: K } = l, xe = l.onMove;
      let we = $ || K, Ce = $ ? "before" : "after";
      if (xe) {
        if (Ce === "after") {
          const Ae = c.getTask(we);
          Ae.data?.length && Ae.open && (Ce = "before", we = Ae.data[0].id);
        }
        Te.current = { id: w, [Ce]: we };
      } else Te.current = null;
      c.exec("move-task", {
        id: w,
        mode: Ce,
        target: we,
        inProgress: xe
      });
    },
    [c]
  ), d = v(() => T?.from ?? 0, [T]), W = v(() => f?.height ?? 0, [f]), Z = v(() => !s && o !== "grid" ? (I ?? 0) > (i ?? 0) : (I ?? 0) > (ae ?? 0), [s, o, I, i, ae]), z = v(() => {
    const l = {};
    return Z && o === "all" || o === "grid" && Z ? l.width = I : o === "grid" && (l.width = "100%"), l;
  }, [Z, o, I]), X = v(() => C && !p.find((l) => l.id === C.id) ? [...p, C] : p, [p, C]), ne = v(() => {
    if (!y || !k) return X;
    const l = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Set();
    return X.forEach(($) => {
      const K = k.taskRows.get($.id) ?? $.id;
      w.has(K) || (l.set(K, {
        ...$,
        $rowTasks: k.rowMap.get(K) || [$.id]
      }), w.add(K));
    }), Array.from(l.values());
  }, [X, y, k]), b = v(() => {
    let l = (j || []).map((K) => {
      K = { ...K };
      const xe = K.header;
      if (typeof xe == "object") {
        const we = xe.text && V(xe.text);
        K.header = { ...xe, text: we };
      } else K.header = V(xe);
      return K;
    });
    const w = l.findIndex((K) => K.id === "text"), $ = l.findIndex((K) => K.id === "add-task");
    if (w !== -1 && (l[w].cell && (l[w]._cell = l[w].cell), l[w].cell = cn), $ !== -1) {
      l[$].cell = l[$].cell || bt;
      const K = l[$].header;
      if (typeof K != "object" && (l[$].header = { text: K }), l[$].header.cell = K.cell || bt, n)
        l.splice($, 1);
      else if (s) {
        const [xe] = l.splice($, 1);
        l.unshift(xe);
      }
    }
    return l.length > 0 && (l[l.length - 1].resize = !1), l;
  }, [j, V, n, s]), B = v(() => o === "all" ? `${i}px` : o === "grid" ? "calc(100% - 4px)" : b.find((l) => l.id === "add-task") ? "50px" : "0", [o, i, b]), de = v(() => {
    if (ne && se?.length) {
      const l = {};
      return se.forEach(({ key: w, order: $ }, K) => {
        l[w] = {
          order: $,
          ...se.length > 1 && { index: K }
        };
      }), l;
    }
    return {};
  }, [ne, se]), ke = S(() => b.some((l) => l.flexgrow && !l.hidden), []), Ne = v(() => ke(), [ke, ve]), Me = v(() => {
    let l = o === "chart" ? b.filter(($) => $.id === "add-task") : b;
    const w = o === "all" ? i : ae;
    if (!Ne) {
      let $ = I, K = !1;
      if (b.some((xe) => xe.$width)) {
        let xe = 0;
        $ = b.reduce((we, Ce) => (Ce.hidden || (xe += Ce.width, we += Ce.$width || Ce.width), we), 0), xe > $ && $ > w && (K = !0);
      }
      if (K || $ < w) {
        let xe = 1;
        return K || (xe = (w - 50) / ($ - 50 || 1)), l.map((we) => (we.id !== "add-task" && !we.hidden && (we.$width || (we.$width = we.width), we.width = we.$width * xe), we));
      }
    }
    return l;
  }, [o, b, Ne, I, i, ae]), De = S(
    (l) => {
      if (!ke()) {
        const w = Me.reduce(($, K) => (l && K.$width && (K.$width = K.width), $ + (K.hidden ? 0 : K.width)), 0);
        w !== I && h(w);
      }
      Re(!0), Re(!1);
    },
    [ke, Me, I, h]
  ), m = S(() => {
    b.filter((w) => w.flexgrow && !w.hidden).length === 1 && b.forEach((w) => {
      w.$width && !w.flexgrow && !w.hidden && (w.width = w.$width);
    });
  }, []), re = S(
    (l) => {
      if (!n) {
        const w = Ke(l), $ = Ft(l, "data-col-id");
        !($ && b.find((xe) => xe.id == $))?.editor && w && c.exec("show-editor", { id: w });
      }
    },
    [c, n]
    // cols is defined later; relies on latest value at call time
  ), me = v(
    () => Array.isArray(Q) ? Q.map((l) => l.id) : [],
    [Q]
  ), g = S(() => {
    if (te.current && ne !== null) {
      const l = te.current.querySelector(".wx-body");
      l && (l.style.top = -((P ?? 0) - (d ?? 0)) + "px");
    }
    ce.current && (ce.current.scrollTop = 0);
  }, [ne, P, d]);
  le(() => {
    te.current && g();
  }, [P, d, g]), le(() => {
    const l = te.current;
    if (!l) return;
    const w = l.querySelector(".wx-table-box .wx-body");
    if (!w || typeof ResizeObserver > "u") return;
    const $ = new ResizeObserver(() => {
      g();
    });
    return $.observe(w), () => {
      $.disconnect();
    };
  }, [Me, z, o, B, ne, g]), le(() => {
    if (!N || !D) return;
    const { id: l } = N, w = D.getState().focusCell;
    w && w.row !== l && te.current && te.current.contains(document.activeElement) && D.exec("focus-cell", {
      row: l,
      column: w.column
    });
  }, [N, D]);
  const ee = S(
    ({ id: l }) => {
      if (n) return !1;
      c.getTask(l).open && c.exec("open-task", { id: l, mode: !1 });
      const w = c.getState()._tasks.find(($) => $.id === l);
      if (R(w || null), !w) return !1;
    },
    [c, n]
  ), oe = S(
    ({ id: l, top: w }) => {
      Te.current ? _({ ...Te.current, onMove: !1 }) : c.exec("drag-task", {
        id: l,
        top: w + (d ?? 0),
        inProgress: !1
      }), R(null);
    },
    [c, _, d]
  ), ze = S(
    ({ id: l, top: w, detail: $ }) => {
      $ && _({ ...$, onMove: !0 }), c.exec("drag-task", {
        id: l,
        top: w + (d ?? 0),
        inProgress: !0
      });
    },
    [c, _, d]
  );
  le(() => {
    const l = te.current;
    return l ? ln(l, {
      start: ee,
      end: oe,
      move: ze,
      getTask: c.getTask
    }).destroy : void 0;
  }, [c, ee, oe, ze]);
  const Le = S(
    (l) => {
      const { key: w, isInput: $ } = l;
      if (!$ && (w === "arrowup" || w === "arrowdown"))
        return l.eventSource = "grid", c.exec("hotkey", l), !1;
      if (w === "enter") {
        const K = D?.getState().focusCell;
        if (K) {
          const { row: xe, column: we } = K;
          we === "add-task" ? O(xe, "add-task") : we === "text" && O(xe, "open-task");
        }
      }
    },
    [c, O, D]
  ), $e = ie(null), Fe = () => {
    $e.current = {
      setTableAPI: x,
      handleHotkey: Le,
      sortVal: se,
      api: c,
      adjustColumns: m,
      setColumnWidth: De,
      tasks: p,
      calendarVal: q,
      durationUnitVal: U,
      splitTasksVal: fe,
      onTableAPIChange: r
    };
  };
  Fe(), le(() => {
    Fe();
  }, [
    x,
    Le,
    se,
    c,
    m,
    De,
    p,
    q,
    U,
    fe,
    r
  ]);
  const tt = S((l) => {
    x(l), l.intercept("hotkey", (w) => $e.current.handleHotkey(w)), l.intercept("scroll", () => !1), l.intercept("select-row", () => !1), l.intercept("sort-rows", (w) => {
      const $ = $e.current.sortVal, { key: K, add: xe } = w, we = $ ? $.find((Ae) => Ae.key === K) : null;
      let Ce = "asc";
      return we && (Ce = !we || we.order === "asc" ? "desc" : "asc"), c.exec("sort-tasks", {
        key: K,
        order: Ce,
        add: xe
      }), !1;
    }), l.on("resize-column", () => {
      $e.current.setColumnWidth(!0);
    }), l.on("hide-column", (w) => {
      w.mode || $e.current.adjustColumns(), $e.current.setColumnWidth();
    }), l.intercept("update-cell", (w) => {
      const { id: $, column: K, value: xe } = w, we = $e.current.tasks.find((Ce) => Ce.id === $);
      if (we) {
        const Ce = { ...we };
        let Ae = xe;
        Ae && !isNaN(Ae) && !(Ae instanceof Date) && (Ae *= 1), Ce[K] = Ae, $t(
          Ce,
          {
            calendar: $e.current.calendarVal,
            durationUnit: $e.current.durationUnitVal,
            splitTasks: $e.current.splitTasksVal
          },
          K
        ), c.exec("update-task", {
          id: $,
          task: Ce
        });
      }
      return !1;
    }), r && r(l);
  }, []);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${B}` },
      ref: ce,
      children: /* @__PURE__ */ a(
        "div",
        {
          ref: te,
          style: z,
          className: "wx-rHj6070p wx-table",
          onClick: J,
          onDoubleClick: re,
          children: /* @__PURE__ */ a(
            en,
            {
              init: tt,
              sizes: {
                rowHeight: F,
                headerHeight: (W ?? 0) - 1
              },
              rowStyle: (l) => l.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (l) => `wx-rHj6070p wx-text-${l.align}${l.id === "add-task" ? " wx-action" : ""}`,
              data: ne,
              columns: Me,
              selectedRows: [...me],
              sortMarks: de
            }
          )
        }
      )
    }
  );
}
function un({ borders: t = "" }) {
  const n = He(Ye), s = Y(n, "cellWidth"), i = Y(n, "cellHeight"), o = ie(null), [L, r] = ge("#e4e4e4");
  le(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const k = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      r(k ? k.substring(k.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const y = {
    width: "100%",
    height: "100%",
    background: s != null && i != null ? `url(${Xt(s, i, L, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ a("div", { ref: o, style: y });
}
function dn({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const i = He(Ye), o = Y(i, "_links"), L = Y(i, "criticalPath"), r = ie(null), y = S(
    (k) => {
      const I = k?.target?.classList;
      !I?.contains("wx-line") && !I?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return le(() => {
    if (!s && n && r.current) {
      const k = (I) => {
        r.current && !r.current.contains(I.target) && y(I);
      };
      return document.addEventListener("click", k), () => {
        document.removeEventListener("click", k);
      };
    }
  }, [s, n, y]), /* @__PURE__ */ Se("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((k) => {
      const I = "wx-dkx3NwEn wx-line" + (L && k.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ a(
        "polyline",
        {
          className: I,
          points: k.$p,
          onClick: () => !s && t(k.id),
          "data-link-id": k.id
        },
        k.id
      );
    }),
    !s && n && /* @__PURE__ */ a(
      "polyline",
      {
        ref: r,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function fn(t) {
  const { task: n, type: s } = t;
  function i(L) {
    const r = n.segments[L];
    return {
      left: `${r.$x}px`,
      top: "0px",
      width: `${r.$w}px`,
      height: "100%"
    };
  }
  function o(L) {
    if (!n.progress) return 0;
    const r = n.duration * n.progress / 100, y = n.segments;
    let k = 0, I = 0, h = null;
    do {
      const D = y[I];
      I === L && (k > r ? h = 0 : h = Math.min((r - k) / D.duration, 1) * 100), k += D.duration, I++;
    } while (h === null && I < y.length);
    return h || 0;
  }
  return /* @__PURE__ */ a("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((L, r) => /* @__PURE__ */ Se(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": r,
      style: i(r),
      children: [
        n.progress ? /* @__PURE__ */ a("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ a(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(r)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ a("div", { className: "wx-content", children: L.text || "" })
      ]
    },
    r
  )) });
}
function hn(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: i = !1,
    rowMapping: o = null,
    marqueeSelect: L = !1
  } = t, r = He(Ye), [y, k] = Qe(r, "_tasks"), [I, h] = Qe(r, "_links"), D = Y(r, "area"), x = Y(r, "_scales"), M = Y(r, "taskTypes"), V = Y(r, "baselines"), [c, P] = Qe(r, "_selected"), F = Y(r, "_scrollTask"), N = Y(r, "criticalPath"), Q = Y(r, "tasks"), T = Y(r, "schedule"), G = Y(r, "splitTasks"), f = v(() => {
    if (!D || !Array.isArray(y)) return [];
    const e = D.start ?? 0, u = D.end ?? 0;
    return y.slice(e, u).map((E) => ({ ...E }));
  }, [k, D]), j = Y(r, "cellHeight"), se = v(() => {
    if (!i || !o || !f.length) return f;
    const e = /* @__PURE__ */ new Map(), u = [];
    return y.forEach((E) => {
      const A = o.taskRows.get(E.id) ?? E.id;
      e.has(A) || (e.set(A, u.length), u.push(A));
    }), f.map((E) => {
      const A = o.taskRows.get(E.id) ?? E.id, H = e.get(A) ?? 0;
      return {
        ...E,
        $y: H * j,
        $y_base: E.$y_base !== void 0 ? H * j : void 0
      };
    });
  }, [f, i, o, y, j]), q = v(
    () => x.lengthUnitWidth,
    [x]
  ), U = v(
    () => x.lengthUnit || "day",
    [x]
  ), fe = ie(!1), [C, R] = ge(void 0), [p, O] = ge(null), J = ie(null), [te, ce] = ge(null), [ae, ye] = ge(void 0), ve = ie(null), [Re, Te] = ge(0), [_, d] = ge(null), [W, Z] = ge(null), z = ie(null), X = v(() => {
    const e = z.current;
    return !!(c.length && e && e.contains(document.activeElement));
  }, [c, z.current]), ne = v(() => X && c[c.length - 1]?.id, [X, c]);
  le(() => {
    if (F && X && F) {
      const { id: e } = F, u = z.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      u && u.focus({ preventScroll: !0 });
    }
  }, [F]), le(() => {
    const e = z.current;
    if (e && (Te(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const u = new ResizeObserver((E) => {
        E[0] && Te(E[0].contentRect.width);
      });
      return u.observe(e), () => u.disconnect();
    }
  }, [z.current]);
  const b = S(() => {
    document.body.style.userSelect = "none";
  }, []), B = S(() => {
    document.body.style.userSelect = "";
  }, []), de = S(
    (e, u, E) => {
      if (u.target.classList.contains("wx-line") || (E || (E = r.getTask(Xe(e))), E.type === "milestone" || E.type === "summary")) return "";
      const A = Ge(u, "data-segment");
      A && (e = A);
      const { left: H, width: ue } = e.getBoundingClientRect(), he = (u.clientX - H) / ue;
      let be = 0.2 / (ue > 200 ? ue / 200 : 1);
      return he < be ? "start" : he > 1 - be ? "end" : "";
    },
    [r]
  ), ke = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!i || !o)
      return y.forEach((A) => {
        e.set(A.id, A.$y);
      }), e;
    const u = /* @__PURE__ */ new Map(), E = [];
    return y.forEach((A) => {
      const H = o.taskRows.get(A.id) ?? A.id;
      u.has(H) || (u.set(H, E.length), E.push(H));
    }), y.forEach((A) => {
      const H = o.taskRows.get(A.id) ?? A.id, ue = u.get(H) ?? 0;
      e.set(A.id, ue * j);
    }), e;
  }, [y, i, o, j]), Ne = S(
    (e) => {
      const u = z.current;
      if (!u) return [];
      const E = u.parentElement?.scrollLeft || 0, A = u.parentElement?.parentElement?.scrollTop || 0, H = Math.min(e.startX, e.currentX), ue = Math.max(e.startX, e.currentX), he = Math.min(e.startY, e.currentY), be = Math.max(e.startY, e.currentY);
      return y.filter((pe) => {
        const Ie = pe.$x - E, We = pe.$x + pe.$w - E, Oe = (ke.get(pe.id) ?? pe.$y) - A, Ee = Oe + pe.$h;
        return Ie < ue && We > H && Oe < be && Ee > he;
      });
    },
    [y, ke]
  ), Me = v(() => new Set(c.map((e) => e.id)), [c, P]), De = S(
    (e) => Me.has(e),
    [Me]
  ), m = S(
    (e, u) => {
      const { clientX: E } = u, A = Xe(e), H = r.getTask(A), ue = u.target.classList;
      if (!u.target.closest(".wx-delete-button") && !n) {
        if (ue.contains("wx-progress-marker")) {
          const { progress: he } = r.getTask(A);
          J.current = {
            id: A,
            x: E,
            progress: he,
            dx: 0,
            node: e,
            marker: u.target
          }, u.target.classList.add("wx-progress-in-drag");
        } else {
          const he = de(e, u, H) || "move", be = {
            id: A,
            mode: he,
            x: E,
            dx: 0,
            l: H.$x,
            w: H.$w
          };
          if (G && H.segments?.length) {
            const pe = Ge(u, "data-segment");
            pe && (be.segmentIndex = pe.dataset.segment * 1, Kt(H, be));
          }
          O(be);
        }
        b();
      }
    },
    [r, n, de, b, G]
  ), re = S(
    (e) => {
      if (e.button !== 0) return;
      const u = Ge(e);
      if (!u && L && !n) {
        const E = z.current;
        if (!E) return;
        const A = E.getBoundingClientRect(), H = e.clientX - A.left, ue = e.clientY - A.top;
        d({
          startX: H,
          startY: ue,
          currentX: H,
          currentY: ue,
          ctrlKey: e.ctrlKey || e.metaKey
        }), b();
        return;
      }
      if (u) {
        if (L && !n && c.length > 1) {
          const E = Xe(u);
          if (De(E)) {
            const A = e.target.classList;
            if (!A.contains("wx-link") && !A.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const H = r.getTask(E);
              if (!de(u, e, H)) {
                const he = /* @__PURE__ */ new Map();
                c.forEach((be) => {
                  const pe = r.getTask(be.id);
                  if (pe) {
                    if (T?.auto && pe.type === "summary") return;
                    he.set(be.id, {
                      $x: pe.$x,
                      $w: pe.$w,
                      start: pe.start,
                      end: pe.end
                    });
                  }
                }), Z({
                  baseTaskId: E,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: he
                }), b();
                return;
              }
            }
          }
        }
        m(u, e);
      }
    },
    [m, L, n, c, De, r, de, T, b]
  ), me = S(
    (e) => {
      const u = Ge(e);
      u && (ve.current = setTimeout(() => {
        ye(!0), m(u, e.touches[0]);
      }, 300));
    },
    [m]
  ), g = S(
    (e) => {
      ce(e && { ...I.find((u) => u.id === e) });
    },
    [I]
  ), ee = S(() => {
    if (_) {
      const e = Ne(_);
      _.ctrlKey ? e.forEach((u) => {
        r.exec("select-task", { id: u.id, toggle: !0, marquee: !0 });
      }) : (c.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), e.forEach((u, E) => {
        r.exec("select-task", {
          id: u.id,
          toggle: E > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), d(null), B(), fe.current = !0;
      return;
    }
    if (W) {
      const { dx: e, originalPositions: u } = W, E = Math.round(e / q);
      if (E !== 0) {
        let A = !0;
        u.forEach((H, ue) => {
          const he = r.getTask(ue);
          he && (r.exec("update-task", {
            id: ue,
            diff: E,
            task: { start: he.start, end: he.end },
            skipUndo: !A
            // Only first task creates undo entry
          }), A = !1);
        }), fe.current = !0;
      } else
        u.forEach((A, H) => {
          r.exec("drag-task", {
            id: H,
            left: A.$x,
            width: A.$w,
            inProgress: !1
          });
        });
      Z(null), B();
      return;
    }
    if (J.current) {
      const { dx: e, id: u, marker: E, value: A } = J.current;
      J.current = null, typeof A < "u" && e && r.exec("update-task", {
        id: u,
        task: { progress: A },
        inProgress: !1
      }), E.classList.remove("wx-progress-in-drag"), fe.current = !0, B();
    } else if (p) {
      const { id: e, mode: u, dx: E, l: A, w: H, start: ue, segment: he, index: be } = p;
      if (O(null), ue) {
        const pe = Math.round(E / q);
        if (!pe)
          r.exec("drag-task", {
            id: e,
            width: H,
            left: A,
            inProgress: !1,
            ...he && { segmentIndex: be }
          });
        else {
          let Ie = {}, We = r.getTask(e);
          he && (We = We.segments[be]);
          const Be = 1440 * 60 * 1e3, Ee = pe * (U === "week" ? 7 : U === "month" ? 30 : U === "quarter" ? 91 : U === "year" ? 365 : 1) * Be;
          u === "move" ? (Ie.start = new Date(We.start.getTime() + Ee), Ie.end = new Date(We.end.getTime() + Ee)) : u === "start" ? (Ie.start = new Date(We.start.getTime() + Ee), Ie.end = We.end) : u === "end" && (Ie.start = We.start, Ie.end = new Date(We.end.getTime() + Ee)), r.exec("update-task", {
            id: e,
            task: Ie,
            ...he && { segmentIndex: be }
          });
        }
        fe.current = !0;
      }
      B();
    }
  }, [r, B, p, q, U, _, W, Ne, c]), oe = S(
    (e, u) => {
      const { clientX: E, clientY: A } = u;
      if (!n) {
        if (_) {
          const H = z.current;
          if (!H) return;
          const ue = H.getBoundingClientRect(), he = E - ue.left, be = A - ue.top;
          d((pe) => ({
            ...pe,
            currentX: he,
            currentY: be
          }));
          return;
        }
        if (W) {
          const H = E - W.startX;
          W.originalPositions.forEach((ue, he) => {
            const be = ue.$x + H;
            r.exec("drag-task", {
              id: he,
              left: be,
              width: ue.$w,
              inProgress: !0
            });
          }), Z((ue) => ({ ...ue, dx: H }));
          return;
        }
        if (J.current) {
          const { node: H, x: ue, id: he } = J.current, be = J.current.dx = E - ue, pe = Math.round(be / H.offsetWidth * 100);
          let Ie = J.current.progress + pe;
          J.current.value = Ie = Math.min(
            Math.max(0, Ie),
            100
          ), r.exec("update-task", {
            id: he,
            task: { progress: Ie },
            inProgress: !0
          });
        } else if (p) {
          g(null);
          const { mode: H, l: ue, w: he, x: be, id: pe, start: Ie, segment: We, index: Be } = p, Oe = r.getTask(pe), Ee = E - be;
          if (!Ie && Math.abs(Ee) < 20 || H === "start" && he - Ee < q || H === "end" && he + Ee < q || H === "move" && (Ee < 0 && ue + Ee < 0 || Ee > 0 && ue + he + Ee > Re) || p.segment && !Vt(Oe, p))
            return;
          const st = { ...p, dx: Ee };
          let je, Ue;
          if (H === "start" ? (je = ue + Ee, Ue = he - Ee) : H === "end" ? (je = ue, Ue = he + Ee) : H === "move" && (je = ue + Ee, Ue = he), r.exec("drag-task", {
            id: pe,
            width: Ue,
            left: je,
            inProgress: !0,
            ...We && { segmentIndex: Be }
          }), !st.start && (H === "move" && Oe.$x == ue || H !== "move" && Oe.$w == he)) {
            fe.current = !0, ee();
            return;
          }
          st.start = !0, O(st);
        } else {
          const H = Ge(e);
          if (H) {
            const ue = r.getTask(Xe(H)), be = Ge(e, "data-segment") || H, pe = de(be, u, ue);
            be.style.cursor = pe && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      p,
      q,
      Re,
      de,
      g,
      ee,
      _,
      W
    ]
  ), ze = S(
    (e) => {
      oe(e, e);
    },
    [oe]
  ), Le = S(
    (e) => {
      ae ? (e.preventDefault(), oe(e, e.touches[0])) : ve.current && (clearTimeout(ve.current), ve.current = null);
    },
    [ae, oe]
  ), $e = S(() => {
    ee();
  }, [ee]), Fe = S(() => {
    ye(null), ve.current && (clearTimeout(ve.current), ve.current = null), ee();
  }, [ee]);
  le(() => (window.addEventListener("mouseup", $e), () => {
    window.removeEventListener("mouseup", $e);
  }), [$e]);
  const tt = S(
    (e) => {
      if (!n) {
        const u = Ke(e.target);
        if (u && !e.target.classList.contains("wx-link")) {
          const E = Ke(e.target, "data-segment");
          r.exec("show-editor", {
            id: u,
            ...E !== null && { segmentIndex: E }
          });
        }
      }
    },
    [r, n]
  ), l = ["e2s", "s2s", "e2e", "s2e"], w = S((e, u) => l[(e ? 1 : 0) + (u ? 0 : 2)], []), $ = S(
    (e, u) => {
      const E = C.id, A = C.start;
      return e === E ? !0 : !!I.find((H) => H.target == e && H.source == E && H.type === w(A, u));
    },
    [C, h, w]
  ), K = S(() => {
    C && R(null);
  }, [C]), xe = S(
    (e) => {
      if (fe.current) {
        fe.current = !1;
        return;
      }
      const u = Ke(e.target);
      if (u) {
        const E = e.target.classList;
        if (E.contains("wx-link")) {
          const A = E.contains("wx-left");
          if (!C) {
            R({ id: u, start: A });
            return;
          }
          C.id !== u && !$(u, A) && r.exec("add-link", {
            link: {
              source: C.id,
              target: u,
              type: w(C.start, A)
            }
          });
        } else if (E.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: te.id }), ce(null);
        else {
          let A;
          const H = Ge(e, "data-segment");
          H && (A = H.dataset.segment * 1), r.exec("select-task", {
            id: u,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: A
          });
        }
      }
      K();
    },
    [
      r,
      C,
      h,
      te,
      $,
      w,
      K
    ]
  ), we = S((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Ce = S((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), Ae = S(
    (e) => {
      if (ae || ve.current)
        return e.preventDefault(), !1;
    },
    [ae]
  ), lt = v(
    () => M.map((e) => e.id),
    [M]
  ), it = S(
    (e) => {
      let u = lt.includes(e) ? e : "task";
      return ["task", "milestone", "summary"].includes(e) || (u = `task ${u}`), u;
    },
    [lt]
  ), ct = S(
    (e) => {
      r.exec(e.action, e.data);
    },
    [r]
  ), nt = S(
    (e) => N && Q.byId(e).$critical,
    [N, Q]
  ), at = S(
    (e) => {
      if (T?.auto) {
        const u = Q.getSummaryId(e, !0), E = Q.getSummaryId(C.id, !0);
        return C?.id && !(Array.isArray(u) ? u : [u]).includes(
          C.id
        ) && !(Array.isArray(E) ? E : [E]).includes(e);
      }
      return C;
    },
    [T, Q, C]
  ), ut = v(() => {
    if (!_) return null;
    const e = Math.min(_.startX, _.currentX), u = Math.min(_.startY, _.currentY), E = Math.abs(_.currentX - _.startX), A = Math.abs(_.currentY - _.startY);
    return {
      left: `${e}px`,
      top: `${u}px`,
      width: `${E}px`,
      height: `${A}px`
    };
  }, [_]);
  return /* @__PURE__ */ Se(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${se.length ? se[0].$h : 0}px` },
      ref: z,
      onContextMenu: Ae,
      onMouseDown: re,
      onMouseMove: ze,
      onTouchStart: me,
      onTouchMove: Le,
      onTouchEnd: Fe,
      onClick: xe,
      onDoubleClick: tt,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ a(
          dn,
          {
            onSelectLink: g,
            selectedLink: te,
            readonly: n
          }
        ),
        se.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const u = `wx-bar wx-${it(e.type)}` + (ae && p && e.id === p.id ? " wx-touch" : "") + (C && C.id === e.id ? " wx-selected" : "") + (Me.has(e.id) ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (G && e.segments ? " wx-split" : ""), E = "wx-link wx-left" + (C ? " wx-visible" : "") + (!C || !$(e.id, !0) && at(e.id) ? " wx-target" : "") + (C && C.id === e.id && C.start ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : ""), A = "wx-link wx-right" + (C ? " wx-visible" : "") + (!C || !$(e.id, !1) && at(e.id) ? " wx-target" : "") + (C && C.id === e.id && !C.start ? " wx-selected" : "") + (nt(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Se(Lt, { children: [
            !e.$skip && /* @__PURE__ */ Se(
              "div",
              {
                className: "wx-GKbcLEGA " + u,
                style: we(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: ne === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === te?.target && te?.type[2] === "s" ? /* @__PURE__ */ a(
                    dt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + E, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Se(qe, { children: [
                    e.progress && !(G && e.segments) ? /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(G && e.segments) ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: ct }) : G && e.segments ? /* @__PURE__ */ a(fn, { task: e, type: it(e.type) }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content", children: e.text || "" })
                  ] }) : /* @__PURE__ */ Se(qe, { children: [
                    /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ a(s, { data: e, api: r, onAction: ct }) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-text-out", children: e.text })
                  ] }),
                  n ? null : e.id === te?.target && te?.type[2] === "e" ? /* @__PURE__ */ a(
                    dt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ a("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA " + A, children: /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            V && !e.$skip_baseline ? /* @__PURE__ */ a(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Ce(e)
              }
            ) : null
          ] }, e.id);
        }),
        _ && ut && /* @__PURE__ */ a("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: ut })
      ]
    }
  );
}
function mn(t) {
  const { highlightTime: n } = t, s = He(Ye), i = Y(s, "_scales");
  return /* @__PURE__ */ a("div", { className: "wx-ZkvhDKir wx-scale", style: { width: i.width }, children: (i?.rows || []).map((o, L) => /* @__PURE__ */ a(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((r, y) => {
        const k = n ? n(r.date, r.unit) : "", I = "wx-cell " + (r.css || "") + " " + (k || ""), h = typeof r.value == "string" && r.value.includes("<");
        return /* @__PURE__ */ a(
          "div",
          {
            className: "wx-ZkvhDKir " + I,
            style: { width: `${r.width}px` },
            ...h ? { dangerouslySetInnerHTML: { __html: r.value } } : { children: r.value }
          },
          y
        );
      })
    },
    L
  )) });
}
const gn = /* @__PURE__ */ new Map();
function wn(t) {
  const n = ie(null), s = ie(0), i = ie(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, le(() => {
    if (o)
      return cancelAnimationFrame(i.current), i.current = requestAnimationFrame(() => {
        const L = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        gn.set(t, L), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: L })
        );
      }), () => cancelAnimationFrame(i.current);
  });
}
function xn(t) {
  const {
    readonly: n,
    fullWidth: s,
    fullHeight: i,
    taskTemplate: o,
    cellBorders: L,
    highlightTime: r,
    multiTaskRows: y = !1,
    rowMapping: k = null,
    marqueeSelect: I = !1,
    scrollToCurrentWeek: h = !1,
    currentWeekColor: D = null
  } = t, x = He(Ye), [M, V] = Qe(x, "_selected"), c = Y(x, "scrollTop"), P = Y(x, "cellHeight"), F = Y(x, "cellWidth"), N = Y(x, "_scales"), Q = Y(x, "_markers"), T = Y(x, "_scrollTask"), G = Y(x, "zoom"), f = Y(x, "_tasks"), [j, se] = ge(), q = ie(null), U = ie(0), fe = ie(!1), C = 1 + (N?.rows?.length || 0), R = v(() => {
    if (!y || !k || !f?.length) return null;
    const d = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Map(), Z = [];
    return f.forEach((z) => {
      const X = k.taskRows.get(z.id) ?? z.id;
      W.has(X) || (W.set(X, Z.length), Z.push(X));
    }), f.forEach((z) => {
      const X = k.taskRows.get(z.id) ?? z.id, ne = W.get(X) ?? 0;
      d.set(z.id, ne * P);
    }), d;
  }, [f, y, k, P]), p = v(() => {
    const d = [];
    return M && M.length && P && M.forEach((W) => {
      const Z = R?.get(W.id) ?? W.$y;
      d.push({ height: `${P}px`, top: `${Z - 3}px` });
    }), d;
  }, [V, P, R]), O = v(
    () => Math.max(j || 0, i),
    [j, i]
  );
  le(() => {
    const d = q.current;
    d && typeof c == "number" && (d.scrollTop = c);
  }, [c]);
  const J = () => {
    te();
  };
  function te(d) {
    const W = q.current;
    if (!W) return;
    const Z = {};
    Z.left = W.scrollLeft, x.exec("scroll-chart", Z);
  }
  function ce() {
    const d = q.current, Z = Math.ceil((j || 0) / (P || 1)) + 1, z = Math.floor((d && d.scrollTop || 0) / (P || 1)), X = Math.max(0, z - C), ne = z + Z + C, b = X * (P || 0);
    x.exec("render-data", {
      start: X,
      end: ne,
      from: b
    });
  }
  le(() => {
    ce();
  }, [j, c]);
  const ae = S(
    (d) => {
      if (!d) return;
      const { id: W, mode: Z } = d;
      if (Z.toString().indexOf("x") < 0) return;
      const z = q.current;
      if (!z) return;
      const { clientWidth: X } = z, ne = x.getTask(W);
      if (ne.$x + ne.$w < z.scrollLeft)
        x.exec("scroll-chart", { left: ne.$x - (F || 0) }), z.scrollLeft = ne.$x - (F || 0);
      else if (ne.$x >= X + z.scrollLeft) {
        const b = X < ne.$w ? F || 0 : ne.$w;
        x.exec("scroll-chart", { left: ne.$x - X + b }), z.scrollLeft = ne.$x - X + b;
      }
    },
    [x, F]
  );
  le(() => {
    ae(T);
  }, [T]);
  function ye(d) {
    if (G && (d.ctrlKey || d.metaKey)) {
      d.preventDefault();
      const W = q.current, Z = d.clientX - (W ? W.getBoundingClientRect().left : 0);
      if (U.current += d.deltaY, Math.abs(U.current) >= 150) {
        const X = -Math.sign(U.current);
        U.current = 0, x.exec("zoom-scale", {
          dir: X,
          offset: Z
        });
      }
    }
  }
  const ve = S((d) => {
    const W = r(d.date, d.unit);
    return W ? {
      css: W,
      width: d.width
    } : null;
  }, [r]), Re = v(() => {
    if (!N || !r || !["hour", "day", "week"].includes(N.minUnit)) return null;
    let W = 0;
    return N.rows[N.rows.length - 1].cells.map((Z) => {
      const z = ve(Z), X = W;
      return W += Z.width, z ? { ...z, left: X } : null;
    });
  }, [N, r, ve]), Te = S(
    (d) => {
      d.eventSource = "chart", x.exec("hotkey", d);
    },
    [x]
  );
  le(() => {
    const d = q.current;
    if (!d) return;
    const W = () => se(d.clientHeight);
    W();
    const Z = new ResizeObserver(() => W());
    return Z.observe(d), () => {
      Z.disconnect();
    };
  }, [q.current]);
  const _ = ie(null);
  return le(() => {
    const d = q.current;
    if (d && !_.current)
      return _.current = Rt(d, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (W) => Te(W)
      }), () => {
        _.current?.destroy(), _.current = null;
      };
  }, []), le(() => {
    const d = q.current;
    if (!d) return;
    const W = ye;
    return d.addEventListener("wheel", W), () => {
      d.removeEventListener("wheel", W);
    };
  }, [ye]), le(() => {
    if (!h || fe.current || !N || !q.current || !j) return;
    const d = q.current, { clientWidth: W } = d, Z = /* @__PURE__ */ new Date(), z = N.rows[N.rows.length - 1]?.cells;
    if (!z) return;
    let X = -1, ne = 0;
    const b = [];
    for (let de = 0; de < z.length; de++) {
      const ke = z[de];
      b.push({ left: ne, width: ke.width });
      const Ne = ke.date;
      if (ke.unit === "week") {
        const Me = new Date(Ne);
        Me.setDate(Me.getDate() + 7), Z >= Ne && Z < Me && (X = de);
      } else ke.unit === "day" && Z.getFullYear() === Ne.getFullYear() && Z.getMonth() === Ne.getMonth() && Z.getDate() === Ne.getDate() && (X = de);
      ne += ke.width;
    }
    let B = X;
    if (X > 0 && (B = X - 1), B >= 0 && b[B]) {
      const de = b[B], ke = Math.max(0, de.left);
      d.scrollLeft = ke, x.exec("scroll-chart", { left: ke }), fe.current = !0;
    }
  }, [h, N, j, x]), wn("chart"), /* @__PURE__ */ Se(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: q,
      onScroll: J,
      children: [
        /* @__PURE__ */ a(mn, { highlightTime: r, scales: N }),
        Q && Q.length ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${O}px` },
            children: Q.map((d, W) => /* @__PURE__ */ a(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${d.css || ""}`,
                style: { left: `${d.left}px` },
                children: /* @__PURE__ */ a("div", { className: "wx-mR7v2Xag wx-content", children: d.text })
              },
              W
            ))
          }
        ) : null,
        /* @__PURE__ */ Se(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${O}px` },
            children: [
              Re ? /* @__PURE__ */ a(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: Re.map(
                    (d, W) => d ? /* @__PURE__ */ a(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + d.css,
                        style: {
                          width: `${d.width}px`,
                          left: `${d.left}px`
                        }
                      },
                      W
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ a(un, { borders: L }),
              M && M.length ? M.map(
                (d, W) => d.$y ? /* @__PURE__ */ a(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": d.id,
                    style: p[W]
                  },
                  d.id
                ) : null
              ) : null,
              /* @__PURE__ */ a(
                hn,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: y,
                  rowMapping: k,
                  marqueeSelect: I
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function pn(t) {
  const {
    position: n = "after",
    size: s = 4,
    dir: i = "x",
    onMove: o,
    onDisplayChange: L,
    compactMode: r,
    containerWidth: y = 0,
    leftThreshold: k = 50,
    rightThreshold: I = 50
  } = t, [h, D] = rt(t.value ?? 0), [x, M] = rt(t.display ?? "all");
  function V(ce) {
    let ae = 0;
    n == "center" ? ae = s / 2 : n == "before" && (ae = s);
    const ye = {
      size: [s + "px", "auto"],
      p: [ce - ae + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (i != "x")
      for (let ve in ye) ye[ve] = ye[ve].reverse();
    return ye;
  }
  const [c, P] = ge(!1), [F, N] = ge(null), Q = ie(0), T = ie(), G = ie(), f = ie(x);
  le(() => {
    f.current = x;
  }, [x]), le(() => {
    F === null && h > 0 && N(h);
  }, [F, h]);
  function j(ce) {
    return i == "x" ? ce.clientX : ce.clientY;
  }
  const se = S(
    (ce) => {
      const ae = T.current + j(ce) - Q.current;
      D(ae);
      let ye;
      ae <= k ? ye = "chart" : y - ae <= I ? ye = "grid" : ye = "all", f.current !== ye && (M(ye), f.current = ye), G.current && clearTimeout(G.current), G.current = setTimeout(() => o && o(ae), 100);
    },
    [y, k, I, o]
  ), q = S(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", P(!1), window.removeEventListener("mousemove", se), window.removeEventListener("mouseup", q);
  }, [se]), U = v(
    () => x !== "all" ? "auto" : i == "x" ? "ew-resize" : "ns-resize",
    [x, i]
  ), fe = S(
    (ce) => {
      !r && (x === "grid" || x === "chart") || (Q.current = j(ce), T.current = h, P(!0), document.body.style.cursor = U, document.body.style.userSelect = "none", window.addEventListener("mousemove", se), window.addEventListener("mouseup", q));
    },
    [U, se, q, h, r, x]
  );
  function C() {
    M("all"), F !== null && (D(F), o && o(F));
  }
  function R(ce) {
    if (r) {
      const ae = x === "chart" ? "grid" : "chart";
      M(ae), L(ae);
    } else if (x === "grid" || x === "chart")
      C(), L("all");
    else {
      const ae = ce === "left" ? "chart" : "grid";
      M(ae), L(ae);
    }
  }
  function p() {
    R("left");
  }
  function O() {
    R("right");
  }
  const J = v(() => V(h), [h, n, s, i]), te = [
    "wx-resizer",
    `wx-resizer-${i}`,
    `wx-resizer-display-${x}`,
    c ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Se(
    "div",
    {
      className: "wx-pFykzMlT " + te,
      onMouseDown: fe,
      style: { width: J.size[0], height: J.size[1], cursor: U },
      children: [
        /* @__PURE__ */ Se("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: p
            }
          ) }),
          /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ a(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: O
            }
          ) })
        ] }),
        /* @__PURE__ */ a("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const kn = 650;
function Et(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let L of o)
        if (L.target === document.body) {
          let r = L.contentRect.width <= kn;
          t(r);
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
function yn(t) {
  const {
    taskTemplate: n,
    readonly: s,
    cellBorders: i,
    highlightTime: o,
    onTableAPIChange: L,
    multiTaskRows: r = !1,
    rowMapping: y = null,
    marqueeSelect: k = !1,
    scrollToCurrentWeek: I = !1,
    currentWeekColor: h = null
  } = t, D = He(Ye), x = Y(D, "_tasks"), M = Y(D, "_scales"), V = Y(D, "cellHeight"), c = Y(D, "columns"), P = Y(D, "_scrollTask"), F = Y(D, "undo"), [N, Q] = ge(!1);
  let [T, G] = ge(0);
  const [f, j] = ge(0), [se, q] = ge(0), [U, fe] = ge(void 0), [C, R] = ge("all"), p = ie(null), O = S(
    (b) => {
      Q((B) => (b !== B && (b ? (p.current = C, C === "all" && R("grid")) : (!p.current || p.current === "all") && R("all")), b));
    },
    [C]
  );
  le(() => {
    const b = Et(O);
    return b.observe(), () => {
      b.disconnect();
    };
  }, [O]);
  const J = v(() => {
    let b;
    return c.every((B) => B.width && !B.flexgrow) ? b = c.reduce((B, de) => B + parseInt(de.width), 0) : N && C === "chart" ? b = parseInt(c.find((B) => B.id === "action")?.width) || 50 : b = 440, T = b, b;
  }, [c, N, C]);
  le(() => {
    G(J);
  }, [J]);
  const te = v(
    () => (f ?? 0) - (U ?? 0),
    [f, U]
  ), ce = v(() => M.width, [M]), ae = v(() => {
    if (!r || !y)
      return x.length * V;
    const b = /* @__PURE__ */ new Set();
    return x.forEach((B) => {
      const de = y.taskRows.get(B.id) ?? B.id;
      b.add(de);
    }), b.size * V;
  }, [x, V, r, y]), ye = v(
    () => M.height + ae + te,
    [M, ae, te]
  ), ve = v(
    () => T + ce,
    [T, ce]
  ), Re = ie(null), Te = S(() => {
    Promise.resolve().then(() => {
      if ((f ?? 0) > (ve ?? 0)) {
        const b = (f ?? 0) - T;
        D.exec("expand-scale", { minWidth: b });
      }
    });
  }, [f, ve, T, D]);
  le(() => {
    let b;
    return Re.current && (b = new ResizeObserver(Te), b.observe(Re.current)), () => {
      b && b.disconnect();
    };
  }, [Re.current, Te]), le(() => {
    Te();
  }, [ce]);
  const _ = ie(null), d = ie(null), W = S(() => {
    const b = _.current;
    b && D.exec("scroll-chart", {
      top: b.scrollTop
    });
  }, [D]), Z = ie({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  le(() => {
    Z.current = {
      rTasks: x,
      rScales: M,
      rCellHeight: V,
      scrollSize: te,
      ganttDiv: _.current,
      ganttHeight: se ?? 0
    };
  }, [x, M, V, te, se]);
  const z = S(
    (b) => {
      if (!b) return;
      const {
        rTasks: B,
        rScales: de,
        rCellHeight: ke,
        scrollSize: Ne,
        ganttDiv: Me,
        ganttHeight: De
      } = Z.current;
      if (!Me) return;
      const { id: m } = b, re = B.findIndex((me) => me.id === m);
      if (re > -1) {
        const me = De - de.height, g = re * ke, ee = Me.scrollTop;
        let oe = null;
        g < ee ? oe = g : g + ke > ee + me && (oe = g - me + ke + Ne), oe !== null && (D.exec("scroll-chart", { top: Math.max(oe, 0) }), _.current.scrollTop = Math.max(oe, 0));
      }
    },
    [D]
  );
  le(() => {
    z(P);
  }, [P]), le(() => {
    const b = _.current, B = d.current;
    if (!b || !B) return;
    const de = () => {
      nn(() => {
        q(b.offsetHeight), j(b.offsetWidth), fe(B.offsetWidth);
      });
    }, ke = new ResizeObserver(de);
    return ke.observe(b), () => ke.disconnect();
  }, [_.current]);
  const X = ie(null), ne = ie(null);
  return le(() => {
    ne.current && (ne.current.destroy(), ne.current = null);
    const b = X.current;
    if (b)
      return ne.current = Rt(b, {
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
          "ctrl+z": F,
          "ctrl+y": F,
          "meta+z": F,
          "meta+shift+z": F
        },
        exec: (B) => {
          B.isInput || D.exec("hotkey", B);
        }
      }), () => {
        ne.current?.destroy(), ne.current = null;
      };
  }, [F]), /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-gantt", ref: _, onScroll: W, children: /* @__PURE__ */ a(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ye, width: "100%" },
      ref: d,
      children: /* @__PURE__ */ a(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: se,
            width: U
          },
          children: /* @__PURE__ */ Se("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: X, children: [
            c.length ? /* @__PURE__ */ Se(qe, { children: [
              /* @__PURE__ */ a(
                an,
                {
                  display: C,
                  compactMode: N,
                  columnWidth: J,
                  width: T,
                  readonly: s,
                  fullHeight: ae,
                  onTableAPIChange: L,
                  multiTaskRows: r,
                  rowMapping: y
                }
              ),
              /* @__PURE__ */ a(
                pn,
                {
                  value: T,
                  display: C,
                  compactMode: N,
                  containerWidth: f,
                  onMove: (b) => G(b),
                  onDisplayChange: (b) => R(b)
                }
              )
            ] }) : null,
            /* @__PURE__ */ a("div", { className: "wx-jlbQoHOz wx-content", ref: Re, children: /* @__PURE__ */ a(
              xn,
              {
                readonly: s,
                fullWidth: ce,
                fullHeight: ae,
                taskTemplate: n,
                cellBorders: i,
                highlightTime: o,
                multiTaskRows: r,
                rowMapping: y,
                marqueeSelect: k,
                scrollToCurrentWeek: I,
                currentWeekColor: h
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function bn(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function vn(t, n) {
  return typeof t == "function" ? t : Ze(t, n);
}
function St(t, n) {
  return t.map(({ format: s, ...i }) => ({
    ...i,
    format: vn(s, n)
  }));
}
function Tn(t, n) {
  const s = bn(n);
  for (let i in s)
    s[i] = Ze(s[i], t);
  return s;
}
function $n(t, n) {
  if (!t || !t.length) return t;
  const s = Ze("%d-%m-%Y", n);
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
function Mn(t, n) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((s) => ({
      ...s,
      scales: St(s.scales, n)
    }))
  } : t;
}
const Cn = (t) => t.split("-").map((n) => n ? n.charAt(0).toUpperCase() + n.slice(1) : "").join(""), Rn = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Kn = vt(function({
  taskTemplate: n = null,
  markers: s = [],
  taskTypes: i = Qt,
  tasks: o = [],
  selected: L = [],
  activeTask: r = null,
  links: y = [],
  scales: k = Rn,
  columns: I = Ut,
  start: h = null,
  end: D = null,
  lengthUnit: x = "day",
  durationUnit: M = "day",
  cellWidth: V = 100,
  cellHeight: c = 38,
  scaleHeight: P = 36,
  readonly: F = !1,
  cellBorders: N = "full",
  zoom: Q = !1,
  baselines: T = !1,
  highlightTime: G = null,
  init: f = null,
  autoScale: j = !0,
  unscheduledTasks: se = !1,
  criticalPath: q = null,
  schedule: U = { type: "forward" },
  projectStart: fe = null,
  projectEnd: C = null,
  calendar: R = null,
  undo: p = !1,
  splitTasks: O = !1,
  multiTaskRows: J = !1,
  marqueeSelect: te = !1,
  currentWeekHighlight: ce = !1,
  currentWeekColor: ae = null,
  scrollToCurrentWeek: ye = !1,
  ...ve
}, Re) {
  const Te = ie();
  Te.current = ve;
  const _ = v(() => new qt(Jt), []), d = v(() => ({ ...ot, ...et }), []), W = He(Pe.i18n), Z = v(() => W ? W.extend(d, !0) : Je(d), [W, d]), z = v(() => Z.getRaw().calendar, [Z]), X = v(() => {
    let g = {
      zoom: Mn(Q, z),
      scales: St(k, z),
      columns: $n(I, z),
      links: Bt(y),
      cellWidth: V
    };
    return g.zoom && (g = {
      ...g,
      ...jt(
        g.zoom,
        Tn(z, Z.getGroup("gantt")),
        g.scales,
        V
      )
    }), g;
  }, [Q, k, I, y, V, z, Z]), ne = ie(null);
  ne.current !== o && (gt(o, { durationUnit: M, splitTasks: O, calendar: R }), ne.current = o), le(() => {
    gt(o, { durationUnit: M, splitTasks: O, calendar: R });
  }, [o, M, R, O]);
  const b = v(() => {
    if (!J) return null;
    const g = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map(), oe = (ze) => {
      ze.forEach((Le) => {
        const $e = Le.row ?? Le.id;
        ee.set(Le.id, $e), g.has($e) || g.set($e, []), g.get($e).push(Le.id), Le.data && Le.data.length > 0 && oe(Le.data);
      });
    };
    return oe(o), { rowMap: g, taskRows: ee };
  }, [o, J]), B = v(() => _.in, [_]), de = ie(null);
  de.current === null && (de.current = new Ot((g, ee) => {
    const oe = "on" + Cn(g);
    Te.current && Te.current[oe] && Te.current[oe](ee);
  }), B.setNext(de.current));
  const [ke, Ne] = ge(null), Me = ie(null);
  Me.current = ke;
  const De = v(
    () => ({
      getState: _.getState.bind(_),
      getReactiveState: _.getReactive.bind(_),
      getStores: () => ({ data: _ }),
      exec: B.exec,
      setNext: (g) => (de.current = de.current.setNext(g), de.current),
      intercept: B.intercept.bind(B),
      on: B.on.bind(B),
      detach: B.detach.bind(B),
      getTask: _.getTask.bind(_),
      serialize: _.serialize.bind(_),
      getTable: (g) => g ? new Promise((ee) => setTimeout(() => ee(Me.current), 1)) : Me.current,
      getHistory: () => _.getHistory()
    }),
    [_, B]
  );
  Tt(
    Re,
    () => ({
      ...De
    }),
    [De]
  );
  const m = ie(0);
  le(() => {
    m.current ? _.init({
      tasks: o,
      links: X.links,
      start: h,
      columns: X.columns,
      end: D,
      lengthUnit: x,
      cellWidth: X.cellWidth,
      cellHeight: c,
      scaleHeight: P,
      scales: X.scales,
      taskTypes: i,
      zoom: X.zoom,
      selected: L,
      activeTask: r,
      baselines: T,
      autoScale: j,
      unscheduledTasks: se,
      markers: s,
      durationUnit: M,
      criticalPath: q,
      schedule: U,
      projectStart: fe,
      projectEnd: C,
      calendar: R,
      undo: p,
      _weekStart: z.weekStart,
      splitTasks: O
    }) : f && f(De), m.current++;
  }, [
    De,
    f,
    o,
    X,
    h,
    D,
    x,
    c,
    P,
    i,
    L,
    r,
    T,
    j,
    se,
    s,
    M,
    q,
    U,
    fe,
    C,
    R,
    p,
    z,
    O,
    _
  ]), m.current === 0 && _.init({
    tasks: o,
    links: X.links,
    start: h,
    columns: X.columns,
    end: D,
    lengthUnit: x,
    cellWidth: X.cellWidth,
    cellHeight: c,
    scaleHeight: P,
    scales: X.scales,
    taskTypes: i,
    zoom: X.zoom,
    selected: L,
    activeTask: r,
    baselines: T,
    autoScale: j,
    unscheduledTasks: se,
    markers: s,
    durationUnit: M,
    criticalPath: q,
    schedule: U,
    projectStart: fe,
    projectEnd: C,
    calendar: R,
    undo: p,
    _weekStart: z.weekStart,
    splitTasks: O
  });
  const re = v(() => {
    const g = /* @__PURE__ */ new Date(), ee = z?.weekStart ?? 0, oe = new Date(g), Le = (oe.getDay() - ee + 7) % 7;
    oe.setDate(oe.getDate() - Le), oe.setHours(0, 0, 0, 0);
    const $e = new Date(oe);
    return $e.setDate($e.getDate() + 7), (Fe) => Fe >= oe && Fe < $e;
  }, [z]), me = v(() => (g, ee) => {
    let oe = [];
    if (R)
      ee == "day" && !R.getDayHours(g) && oe.push("wx-weekend"), ee == "hour" && !R.getDayHours(g) && oe.push("wx-weekend");
    else if (G) {
      const ze = G(g, ee);
      ze && oe.push(ze);
    }
    return ce && (ee === "week" || ee === "day") && re(g) && oe.push("wx-current-week"), oe.join(" ");
  }, [R, G, ce, re]);
  return /* @__PURE__ */ a(Pe.i18n.Provider, { value: Z, children: /* @__PURE__ */ a(Ye.Provider, { value: De, children: /* @__PURE__ */ a(
    yn,
    {
      taskTemplate: n,
      readonly: F,
      cellBorders: N,
      highlightTime: me,
      onTableAPIChange: Ne,
      multiTaskRows: J,
      rowMapping: b,
      marqueeSelect: te,
      scrollToCurrentWeek: ye,
      currentWeekColor: ae
    }
  ) }) });
});
function Vn({ api: t = null, items: n = [] }) {
  const s = He(Pe.i18n), i = v(() => s || Je(et), [s]), o = v(() => i.getGroup("gantt"), [i]), L = _e(t, "_selected"), r = _e(t, "undo"), y = _e(t, "history"), k = _e(t, "splitTasks"), I = ["undo", "redo"], h = v(() => {
    const x = wt({ undo: !0, splitTasks: !0 });
    return (n.length ? n : wt({
      undo: r,
      splitTasks: k
    })).map((V) => {
      let c = { ...V, disabled: !1 };
      return c.handler = Ct(x, c.id) ? (P) => Mt(t, P.id, null, o) : c.handler, c.text && (c.text = o(c.text)), c.menuText && (c.menuText = o(c.menuText)), c;
    });
  }, [n, t, o, r, k]), D = v(() => {
    const x = [];
    return h.forEach((M) => {
      const V = M.id;
      if (V === "add-task")
        x.push(M);
      else if (I.includes(V))
        I.includes(V) && x.push({
          ...M,
          disabled: M.isDisabled(y)
        });
      else {
        if (!L?.length || !t) return;
        x.push({
          ...M,
          disabled: M.isDisabled && L.some((c) => M.isDisabled(c, t.getState()))
        });
      }
    }), x.filter((M, V) => {
      if (t && M.isHidden)
        return !L.some((c) => M.isHidden(c, t.getState()));
      if (M.comp === "separator") {
        const c = x[V + 1];
        if (!c || c.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, L, y, h]);
  return s ? /* @__PURE__ */ a(pt, { items: D }) : /* @__PURE__ */ a(Pe.i18n.Provider, { value: i, children: /* @__PURE__ */ a(pt, { items: D }) });
}
const qn = vt(function({
  options: n = [],
  api: s = null,
  resolver: i = null,
  filter: o = null,
  at: L = "point",
  children: r,
  onClick: y,
  css: k
}, I) {
  const h = ie(null), D = ie(null), x = He(Pe.i18n), M = v(() => x || Je({ ...et, ...ot }), [x]), V = v(() => M.getGroup("gantt"), [M]), c = _e(s, "taskTypes"), P = _e(s, "selected"), F = _e(s, "_selected"), N = _e(s, "splitTasks"), Q = v(() => xt({ splitTasks: !0 }), []);
  le(() => {
    s && (s.on("scroll-chart", () => {
      h.current && h.current.show && h.current.show();
    }), s.on("drag-task", () => {
      h.current && h.current.show && h.current.show();
    }));
  }, [s]);
  function T(R) {
    return R.map((p) => (p = { ...p }, p.text && (p.text = V(p.text)), p.subtext && (p.subtext = V(p.subtext)), p.data && (p.data = T(p.data)), p));
  }
  function G() {
    const R = n.length ? n : xt({ splitTasks: N }), p = R.find((O) => O.id === "convert-task");
    return p && (p.data = [], (c || []).forEach((O) => {
      p.data.push(p.dataFactory(O));
    })), T(R);
  }
  const f = v(() => G(), [s, n, c, N, V]), j = v(
    () => F && F.length ? F : [],
    [F]
  ), se = S(
    (R, p) => {
      let O = R ? s?.getTask(R) : null;
      if (i) {
        const J = i(R, p);
        O = J === !0 ? O : J;
      }
      if (O) {
        const J = Ke(p.target, "data-segment");
        J !== null ? D.current = { id: O.id, segmentIndex: J } : D.current = O.id, (!Array.isArray(P) || !P.includes(O.id)) && s && s.exec && s.exec("select-task", { id: O.id });
      }
      return O;
    },
    [s, i, P]
  ), q = S(
    (R) => {
      const p = R.action;
      p && (Ct(Q, p.id) && Mt(s, p.id, D.current, V), y && y(R));
    },
    [s, V, y, Q]
  ), U = S(
    (R, p) => {
      const O = j.length ? j : p ? [p] : [];
      let J = o ? O.every((te) => o(R, te)) : !0;
      if (J && (R.isHidden && (J = !O.some(
        (te) => R.isHidden(te, s.getState(), D.current)
      )), R.isDisabled)) {
        const te = O.some(
          (ce) => R.isDisabled(ce, s.getState(), D.current)
        );
        R.disabled = te;
      }
      return J;
    },
    [o, j, s]
  );
  Tt(I, () => ({
    show: (R, p) => {
      h.current && h.current.show && h.current.show(R, p);
    }
  }));
  const fe = S((R) => {
    h.current && h.current.show && h.current.show(R);
  }, []), C = /* @__PURE__ */ Se(qe, { children: [
    /* @__PURE__ */ a(
      sn,
      {
        filter: U,
        options: f,
        dataKey: "id",
        resolver: se,
        onClick: q,
        at: L,
        ref: h,
        css: k
      }
    ),
    /* @__PURE__ */ a("span", { onContextMenu: fe, "data-menu-ignore": "true", children: typeof r == "function" ? r() : r })
  ] });
  if (!x && Pe.i18n?.Provider) {
    const R = Pe.i18n.Provider;
    return /* @__PURE__ */ a(R, { value: M, children: C });
  }
  return C;
});
function En({ api: t, autoSave: n, onLinksChange: s }) {
  const o = He(Pe.i18n).getGroup("gantt"), L = Y(t, "activeTask"), r = Y(t, "_activeTask"), y = Y(t, "_links"), k = Y(t, "schedule"), I = Y(t, "unscheduledTasks"), [h, D] = ge();
  function x() {
    if (L) {
      const P = y.filter((N) => N.target == L).map((N) => ({ link: N, task: t.getTask(N.source) })), F = y.filter((N) => N.source == L).map((N) => ({ link: N, task: t.getTask(N.target) }));
      return [
        { title: o("Predecessors"), data: P },
        { title: o("Successors"), data: F }
      ];
    }
  }
  le(() => {
    D(x());
  }, [L, y]);
  const M = v(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function V(P) {
    n ? t.exec("delete-link", { id: P }) : (D(
      (F) => (F || []).map((N) => ({
        ...N,
        data: N.data.filter((Q) => Q.link.id !== P)
      }))
    ), s && s({
      id: P,
      action: "delete-link",
      data: { id: P }
    }));
  }
  function c(P, F) {
    n ? t.exec("update-link", {
      id: P,
      link: F
    }) : (D(
      (N) => (N || []).map((Q) => ({
        ...Q,
        data: Q.data.map(
          (T) => T.link.id === P ? { ...T, link: { ...T.link, ...F } } : T
        )
      }))
    ), s && s({
      id: P,
      action: "update-link",
      data: {
        id: P,
        link: F
      }
    }));
  }
  return /* @__PURE__ */ a(qe, { children: (h || []).map(
    (P, F) => P.data.length ? /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ a(Dt, { label: P.title, position: "top", children: /* @__PURE__ */ a("table", { children: /* @__PURE__ */ a("tbody", { children: P.data.map((N) => /* @__PURE__ */ Se("tr", { children: [
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-task-name", children: N.task.text || "" }) }),
      k?.auto && N.link.type === "e2s" ? /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ a(
        It,
        {
          type: "number",
          placeholder: o("Lag"),
          value: N.link.lag,
          disabled: I && r?.unscheduled,
          onChange: (Q) => {
            Q.input || c(N.link.id, { lag: Q.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ a(
        At,
        {
          value: N.link.type,
          placeholder: o("Select link type"),
          options: M,
          onChange: (Q) => c(N.link.id, { type: Q.value }),
          children: ({ option: Q }) => Q.label
        }
      ) }) }),
      /* @__PURE__ */ a("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ a(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => V(N.link.id),
          role: "button"
        }
      ) })
    ] }, N.link.id)) }) }) }) }, F) : null
  ) });
}
function Sn(t) {
  const { value: n, time: s, format: i, onchange: o, onChange: L, ...r } = t, y = L ?? o;
  function k(I) {
    const h = new Date(I.value);
    h.setHours(n.getHours()), h.setMinutes(n.getMinutes()), y && y({ value: h });
  }
  return /* @__PURE__ */ Se("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ a(
      Ht,
      {
        ...r,
        value: n,
        onChange: k,
        format: i,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ a(Wt, { value: n, onChange: y, format: i }) : null
  ] });
}
Ve("select", Gt);
Ve("date", Sn);
Ve("twostate", Pt);
Ve("slider", _t);
Ve("counter", Yt);
Ve("links", En);
function Bn({
  api: t,
  items: n = [],
  css: s = "",
  layout: i = "default",
  readonly: o = !1,
  placement: L = "sidebar",
  bottomBar: r = !0,
  topBar: y = !0,
  autoSave: k = !0,
  focus: I = !1,
  hotkeys: h = {}
}) {
  const D = He(Pe.i18n), x = v(() => D || Je({ ...et, ...ot }), [D]), M = v(() => x.getGroup("gantt"), [x]), V = x.getRaw(), c = v(() => {
    const m = V.gantt?.dateFormat || V.formats?.dateFormat;
    return Ze(m, V.calendar);
  }, [V]), P = v(() => {
    if (y === !0 && !o) {
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
      return k ? { items: m } : {
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
    return y;
  }, [y, o, k, M]), [F, N] = ge(!1), Q = v(
    () => F ? "wx-full-screen" : "",
    [F]
  ), T = S((m) => {
    N(m);
  }, []);
  le(() => {
    const m = Et(T);
    return m.observe(), () => {
      m.disconnect();
    };
  }, [T]);
  const G = Y(t, "_activeTask"), f = Y(t, "activeTask"), j = Y(t, "unscheduledTasks"), se = Y(t, "links"), q = Y(t, "splitTasks"), U = v(
    () => q && f?.segmentIndex,
    [q, f]
  ), fe = v(
    () => U || U === 0,
    [U]
  ), C = v(
    () => Zt({ unscheduledTasks: j }),
    [j]
  ), R = Y(t, "undo"), [p, O] = ge({}), [J, te] = ge(null), [ce, ae] = ge(), [ye, ve] = ge(null), Re = Y(t, "taskTypes"), Te = v(() => {
    if (!G) return null;
    let m;
    if (fe && G.segments ? m = { ...G.segments[U] } : m = { ...G }, o) {
      let re = { parent: m.parent };
      return C.forEach(({ key: me, comp: g }) => {
        if (g !== "links") {
          const ee = m[me];
          g === "date" && ee instanceof Date ? re[me] = c(ee) : g === "slider" && me === "progress" ? re[me] = `${ee}%` : re[me] = ee;
        }
      }), re;
    }
    return m || null;
  }, [G, fe, U, o, C, c]);
  le(() => {
    ae(Te);
  }, [Te]), le(() => {
    O({}), ve(null), te(null);
  }, [f]);
  function _(m, re) {
    return m.map((me) => {
      const g = { ...me };
      if (me.config && (g.config = { ...g.config }), g.comp === "links" && t && (g.api = t, g.autoSave = k, g.onLinksChange = Z), g.comp === "select" && g.key === "type") {
        const ee = g.options ?? (Re || []);
        g.options = ee.map((oe) => ({
          ...oe,
          label: M(oe.label)
        }));
      }
      return g.comp === "slider" && g.key === "progress" && (g.labelTemplate = (ee) => `${M(g.label)} ${ee}%`), g.label && (g.label = M(g.label)), g.config?.placeholder && (g.config.placeholder = M(g.config.placeholder)), re && (g.isDisabled && g.isDisabled(re, t.getState()) ? g.disabled = !0 : delete g.disabled), g;
    });
  }
  const d = v(() => {
    let m = n.length ? n : C;
    return m = _(m, ce), ce ? m.filter(
      (re) => !re.isHidden || !re.isHidden(ce, t.getState())
    ) : m;
  }, [n, C, ce, Re, M, t, k]), W = v(
    () => d.map((m) => m.key),
    [d]
  );
  function Z({ id: m, action: re, data: me }) {
    O((g) => ({
      ...g,
      [m]: { action: re, data: me }
    }));
  }
  const z = S(() => {
    for (let m in p)
      if (se.byId(m)) {
        const { action: re, data: me } = p[m];
        t.exec(re, me);
      }
  }, [t, p, se]), X = S(() => {
    const m = f?.id || f;
    if (fe) {
      if (G?.segments) {
        const re = G.segments.filter(
          (me, g) => g !== U
        );
        t.exec("update-task", {
          id: m,
          task: { segments: re }
        });
      }
    } else
      t.exec("delete-task", { id: m });
  }, [t, f, fe, G, U]), ne = S(() => {
    t.exec("show-editor", { id: null });
  }, [t]), b = S(
    (m) => {
      const { item: re, changes: me } = m;
      re.id === "delete" && X(), re.id === "save" && (me.length ? ne() : z()), re.comp && ne();
    },
    [t, f, k, z, X, ne]
  ), B = S(
    (m, re, me) => (j && m.type === "summary" && (m.unscheduled = !1), $t(m, t.getState(), re), me || te(!1), m),
    [j, t]
  ), de = S(
    (m) => {
      m = {
        ...m,
        unscheduled: j && m.unscheduled && m.type !== "summary"
      }, delete m.links, delete m.data, (W.indexOf("duration") === -1 || m.segments && !m.duration) && delete m.duration;
      const re = {
        id: f?.id || f,
        task: m,
        ...fe && { segmentIndex: U }
      };
      k && J && (re.inProgress = J), t.exec("update-task", re), k || z();
    },
    [
      t,
      f,
      j,
      k,
      z,
      W,
      fe,
      U,
      J
    ]
  ), ke = S(
    (m) => {
      let { update: re, key: me, input: g } = m;
      if (g && te(!0), m.update = B({ ...re }, me, g), !k) ae(m.update);
      else if (!ye && !g) {
        const ee = d.find((Le) => Le.key === me), oe = re[me];
        (!ee.validation || ee.validation(oe)) && (!ee.required || oe) && de(m.update);
      }
    },
    [k, B, ye, d, de]
  ), Ne = S(
    (m) => {
      k || de(m.values);
    },
    [k, de]
  ), Me = S((m) => {
    ve(m.errors);
  }, []), De = v(
    () => R ? {
      "ctrl+z": (m) => {
        m.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (m) => {
        m.preventDefault(), t.exec("redo");
      }
    } : {},
    [R, t]
  );
  return Te ? /* @__PURE__ */ a(zt, { children: /* @__PURE__ */ a(
    rn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${Q} ${s}`,
      items: d,
      values: Te,
      topBar: P,
      bottomBar: r,
      placement: L,
      layout: i,
      readonly: o,
      autoSave: k,
      focus: I,
      onAction: b,
      onSave: Ne,
      onValidation: Me,
      onChange: ke,
      hotkeys: h && { ...De, ...h }
    }
  ) }) : null;
}
const jn = ({ children: t, columns: n = null, api: s }) => {
  const [i, o] = ge(null);
  return le(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ a(tn, { api: i, columns: n, children: t });
};
function Un(t) {
  const { api: n, content: s, children: i } = t, o = ie(null), L = ie(null), [r, y] = ge({}), [k, I] = ge(null), [h, D] = ge({});
  function x(T) {
    for (; T; ) {
      if (T.getAttribute) {
        const G = T.getAttribute("data-tooltip-id"), f = T.getAttribute("data-tooltip-at"), j = T.getAttribute("data-tooltip");
        if (G || j) return { id: G, tooltip: j, target: T, at: f };
      }
      T = T.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  le(() => {
    const T = L.current;
    if (T && h && (h.text || s)) {
      const G = T.getBoundingClientRect();
      let f = !1, j = h.left, se = h.top;
      G.right >= r.right && (j = r.width - G.width - 5, f = !0), G.bottom >= r.bottom && (se = h.top - (G.bottom - r.bottom + 2), f = !0), f && D((q) => q && { ...q, left: j, top: se });
    }
  }, [h, r, s]);
  const M = ie(null), V = 300, c = (T) => {
    clearTimeout(M.current), M.current = setTimeout(() => {
      T();
    }, V);
  };
  function P(T) {
    let { id: G, tooltip: f, target: j, at: se } = x(T.target);
    if (D(null), I(null), !f)
      if (G)
        f = N(G);
      else {
        clearTimeout(M.current);
        return;
      }
    const q = T.clientX;
    c(() => {
      G && I(F(Q(G)));
      const U = j.getBoundingClientRect(), fe = o.current, C = fe ? fe.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let R, p;
      se === "left" ? (R = U.top + 5 - C.top, p = U.right + 5 - C.left) : (R = U.top + U.height - C.top, p = q - C.left), y(C), D({ top: R, left: p, text: f });
    });
  }
  function F(T) {
    return n?.getTask(Q(T)) || null;
  }
  function N(T) {
    return F(T)?.text || "";
  }
  function Q(T) {
    const G = parseInt(T);
    return isNaN(G) ? T : G;
  }
  return /* @__PURE__ */ Se(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: P,
      children: [
        h && (h.text || s) ? /* @__PURE__ */ a(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: L,
            style: { top: `${h.top}px`, left: `${h.left}px` },
            children: s ? /* @__PURE__ */ a(s, { data: k }) : h.text ? /* @__PURE__ */ a("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: h.text }) : null
          }
        ) : null,
        i
      ]
    }
  );
}
function Qn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ft, { fonts: t, children: n() }) : /* @__PURE__ */ a(ft, { fonts: t });
}
function Zn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(ht, { fonts: t, children: n }) : /* @__PURE__ */ a(ht, { fonts: t });
}
function Jn({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ a(mt, { fonts: t, children: n }) : /* @__PURE__ */ a(mt, { fonts: t });
}
export {
  qn as ContextMenu,
  Bn as Editor,
  Kn as Gantt,
  jn as HeaderMenu,
  Qn as Material,
  Vn as Toolbar,
  Un as Tooltip,
  Zn as Willow,
  Jn as WillowDark,
  ns as defaultColumns,
  ss as defaultEditorItems,
  rs as defaultMenuOptions,
  os as defaultTaskTypes,
  ls as defaultToolbarButtons,
  is as getEditorItems,
  cs as getMenuOptions,
  as as getToolbarButtons,
  fs as registerEditorItem,
  us as registerScaleUnit
};
//# sourceMappingURL=index.es.js.map
