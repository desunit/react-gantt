import { jsxs as Pe, jsx as d, Fragment as Je } from "react/jsx-runtime";
import { createContext as Jt, useMemo as v, useState as xe, useContext as ze, useCallback as I, useRef as re, useEffect as le, Fragment as en, forwardRef as Pt, useImperativeHandle as Ht } from "react";
import { context as Ue, Button as Tt, Field as tn, Text as nn, Combo as sn, DatePicker as rn, TimePicker as on, Locale as ln, RichSelect as cn, TwoState as an, Slider as un, Counter as dn, Material as vt, Willow as Ct, WillowDark as $t } from "@svar-ui/react-core";
import { locate as Ge, locateID as qe, locateAttr as fn, dateToString as rt, locale as ot } from "@svar-ui/lib-dom";
import { en as lt } from "@svar-ui/gantt-locales";
import { en as dt } from "@svar-ui/core-locales";
import { EventBusRouter as hn } from "@svar-ui/lib-state";
import { prepareEditTask as Wt, grid as gn, extendDragOptions as mn, isSegmentMoveAllowed as wn, DataStore as xn, normalizeLinks as pn, normalizeZoom as yn, defaultColumns as kn, parseTaskDates as Mt, defaultTaskTypes as bn, getToolbarButtons as St, handleAction as At, isHandledAction as Ot, getMenuOptions as Dt, getEditorItems as Tn } from "@svar-ui/gantt-store";
import { defaultColumns as _s, defaultEditorItems as Ps, defaultMenuOptions as Hs, defaultTaskTypes as Ws, defaultToolbarButtons as As, getEditorItems as Os, getMenuOptions as zs, getToolbarButtons as Gs, registerScaleUnit as Us } from "@svar-ui/gantt-store";
import { useWritableProp as ut, useStore as F, useStoreWithCounter as st, writable as vn, useStoreLater as Ye } from "@svar-ui/lib-react";
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
  let s, l, o, _, k, h, r, p, y;
  function q(b) {
    _ = b.clientX, k = b.clientY, h = {
      ...Rn(s, t, b),
      y: n.getTask(o).$y
    }, document.body.style.userSelect = "none";
  }
  function K(b) {
    s = Ge(b), Et(s) && (o = Ke(s), y = setTimeout(() => {
      p = !0, n && n.touchStart && n.touchStart(), q(b.touches[0]);
    }, 500), t.addEventListener("touchmove", N), t.addEventListener("contextmenu", O), window.addEventListener("touchend", Q));
  }
  function O(b) {
    if (p || y)
      return b.preventDefault(), !1;
  }
  function P(b) {
    b.which === 1 && (s = Ge(b), Et(s) && (o = Ke(s), t.addEventListener("mousemove", ne), window.addEventListener("mouseup", R), q(b)));
  }
  function a(b) {
    t.removeEventListener("mousemove", ne), t.removeEventListener("touchmove", N), document.body.removeEventListener("mouseup", R), document.body.removeEventListener("touchend", Q), document.body.style.userSelect = "", b && (t.removeEventListener("mousedown", P), t.removeEventListener("touchstart", K));
  }
  function C(b) {
    const ie = b.clientX - _, J = b.clientY - k;
    if (!l) {
      if (Math.abs(ie) < It && Math.abs(J) < It || n && n.start && n.start({ id: o, e: b }) === !1)
        return;
      l = s.cloneNode(!0), l.style.pointerEvents = "none", l.classList.add("wx-reorder-task"), l.style.position = "absolute", l.style.left = h.left + "px", l.style.top = h.top + "px", s.style.visibility = "hidden", s.parentNode.insertBefore(l, s);
    }
    if (l) {
      const ue = Math.round(Math.max(0, h.top + J));
      if (n && n.move && n.move({ id: o, top: ue, detail: r }) === !1)
        return;
      const G = n.getTask(o), be = G.$y;
      if (!h.start && h.y == be) return H();
      h.start = !0, h.y = G.$y - 4, l.style.top = ue + "px";
      const U = document.elementFromPoint(
        b.clientX,
        b.clientY
      ), W = Ge(U);
      if (W && W !== s) {
        const w = Ke(W), M = W.getBoundingClientRect(), se = M.top + M.height / 2, j = b.clientY + h.db > se && W.nextElementSibling !== s, de = b.clientY - h.dt < se && W.previousElementSibling !== s;
        r?.after == w || r?.before == w ? r = null : j ? r = { id: o, after: w } : de && (r = { id: o, before: w });
      }
    }
  }
  function ne(b) {
    C(b);
  }
  function N(b) {
    p ? (b.preventDefault(), C(b.touches[0])) : y && (clearTimeout(y), y = null);
  }
  function Q() {
    p = null, y && (clearTimeout(y), y = null), H();
  }
  function R() {
    H();
  }
  function H() {
    s && (s.style.visibility = ""), l && (l.parentNode.removeChild(l), n && n.end && n.end({ id: o, top: h.top })), o = s = l = h = r = null, a();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", P), t.addEventListener("touchstart", K), {
    destroy() {
      a(!0);
    }
  };
}
function In({ row: t, column: n }) {
  function s(o, _) {
    return {
      justifyContent: _.align,
      paddingLeft: `${(o.$level - 1) * 20}px`
    };
  }
  const l = n && n._cell;
  return /* @__PURE__ */ Pe("div", { className: "wx-pqc08MHU wx-content", style: s(t, n), children: [
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
function Nt({ column: t, cell: n }) {
  const s = v(() => t.id, [t?.id]);
  return n || t.id == "add-task" ? /* @__PURE__ */ d("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ d(
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
    columnWidth: _ = 0,
    onTableAPIChange: k,
    multiTaskRows: h = !1,
    rowMapping: r = null
  } = t, [p, y] = ut(_), [q, K] = xe(), O = ze(Ue.i18n), P = v(() => O.getGroup("gantt"), [O]), a = ze(Xe), C = F(a, "scrollTop"), ne = F(a, "cellHeight"), N = F(a, "_scrollTask"), Q = F(a, "_selected"), R = F(a, "area"), H = F(a, "_tasks"), b = F(a, "_scales"), ie = F(a, "columns"), J = F(a, "_sort"), ue = F(a, "calendar"), G = F(a, "durationUnit"), be = F(a, "splitTasks"), [U, W] = xe(null), w = v(() => !H || !R ? [] : h && r ? H : H.slice(R.start, R.end), [H, R, h, r]), M = I(
    (i, m) => {
      if (m === "add-task")
        a.exec(m, {
          target: i,
          task: { text: P("New Task") },
          mode: "child",
          show: !0
        });
      else if (m === "open-task") {
        const D = w.find((X) => X.id === i);
        (D?.data || D?.lazy) && a.exec(m, { id: i, mode: !D.open });
      }
    },
    [w]
  ), se = I(
    (i) => {
      const m = qe(i), D = i.target.dataset.action;
      D && i.preventDefault(), m ? D === "add-task" || D === "open-task" ? M(m, D) : a.exec("select-task", {
        id: m,
        toggle: i.ctrlKey || i.metaKey,
        range: i.shiftKey,
        show: !0
      }) : D === "add-task" && M(null, D);
    },
    [a, M]
  ), j = re(null), de = re(null), [ce, pe] = xe(0), [Ne, Ee] = xe(!1);
  le(() => {
    const i = de.current;
    if (!i || typeof ResizeObserver > "u") return;
    const m = () => pe(i.clientWidth);
    m();
    const D = new ResizeObserver(m);
    return D.observe(i), () => D.disconnect();
  }, []);
  const De = re(null), Re = I(
    (i) => {
      const m = i.id, { before: D, after: X } = i, ke = i.onMove;
      let ge = D || X, Se = D ? "before" : "after";
      if (ke) {
        if (Se === "after") {
          const Oe = a.getTask(ge);
          Oe.data?.length && Oe.open && (Se = "before", ge = Oe.data[0].id);
        }
        De.current = { id: m, [Se]: ge };
      } else De.current = null;
      a.exec("move-task", {
        id: m,
        mode: Se,
        target: ge,
        inProgress: ke
      });
    },
    [a]
  ), $e = v(() => h && r ? 0 : R?.from ?? 0, [R, h, r]), Le = v(() => b?.height ?? 0, [b]), Z = v(() => !s && o !== "grid" ? (p ?? 0) > (l ?? 0) : (p ?? 0) > (ce ?? 0), [s, o, p, l, ce]), x = v(() => {
    const i = {};
    return Z && o === "all" || o === "grid" && Z ? i.width = p : o === "grid" && (i.width = "100%"), i;
  }, [Z, o, p]), A = v(() => U && !w.find((i) => i.id === U.id) ? [...w, U] : w, [w, U]), V = v(() => {
    if (!h || !r) return A;
    const i = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
    return A.forEach((D) => {
      const X = r.taskRows.get(D.id) ?? D.id;
      m.has(X) || (i.set(X, {
        ...D,
        $rowTasks: r.rowMap.get(X) || [D.id]
      }), m.add(X));
    }), Array.from(i.values());
  }, [A, h, r]), z = v(() => {
    let i = (ie || []).map((X) => {
      X = { ...X };
      const ke = X.header;
      if (typeof ke == "object") {
        const ge = ke.text && P(ke.text);
        X.header = { ...ke, text: ge };
      } else X.header = P(ke);
      return X;
    });
    const m = i.findIndex((X) => X.id === "text"), D = i.findIndex((X) => X.id === "add-task");
    if (m !== -1 && (i[m].cell && (i[m]._cell = i[m].cell), i[m].cell = In), D !== -1) {
      i[D].cell = i[D].cell || Nt;
      const X = i[D].header;
      if (typeof X != "object" && (i[D].header = { text: X }), i[D].header.cell = X.cell || Nt, n)
        i.splice(D, 1);
      else if (s) {
        const [ke] = i.splice(D, 1);
        i.unshift(ke);
      }
    }
    return i.length > 0 && (i[i.length - 1].resize = !1), i;
  }, [ie, P, n, s]), ee = v(() => o === "all" ? `${l}px` : o === "grid" ? "calc(100% - 4px)" : z.find((i) => i.id === "add-task") ? "50px" : "0", [o, l, z]), ye = v(() => {
    if (V && J?.length) {
      const i = {};
      return J.forEach(({ key: m, order: D }, X) => {
        i[m] = {
          order: D,
          ...J.length > 1 && { index: X }
        };
      }), i;
    }
    return {};
  }, [V, J]), oe = I(() => z.some((i) => i.flexgrow && !i.hidden), []), $ = v(() => oe(), [oe, Ne]), B = v(() => {
    let i = o === "chart" ? z.filter((D) => D.id === "add-task") : z;
    const m = o === "all" ? l : ce;
    if (!$) {
      let D = p, X = !1;
      if (z.some((ke) => ke.$width)) {
        let ke = 0;
        D = z.reduce((ge, Se) => (Se.hidden || (ke += Se.width, ge += Se.$width || Se.width), ge), 0), ke > D && D > m && (X = !0);
      }
      if (X || D < m) {
        let ke = 1;
        return X || (ke = (m - 50) / (D - 50 || 1)), i.map((ge) => (ge.id !== "add-task" && !ge.hidden && (ge.$width || (ge.$width = ge.width), ge.width = ge.$width * ke), ge));
      }
    }
    return i;
  }, [o, z, $, p, l, ce]), he = I(
    (i) => {
      if (!oe()) {
        const m = B.reduce((D, X) => (i && X.$width && (X.$width = X.width), D + (X.hidden ? 0 : X.width)), 0);
        m !== p && y(m);
      }
      Ee(!0), Ee(!1);
    },
    [oe, B, p, y]
  ), f = I(() => {
    z.filter((m) => m.flexgrow && !m.hidden).length === 1 && z.forEach((m) => {
      m.$width && !m.flexgrow && !m.hidden && (m.width = m.$width);
    });
  }, []), te = I(
    (i) => {
      if (!n) {
        const m = qe(i), D = fn(i, "data-col-id");
        !(D && z.find((ke) => ke.id == D))?.editor && m && a.exec("show-editor", { id: m });
      }
    },
    [a, n]
    // cols is defined later; relies on latest value at call time
  ), me = v(
    () => Array.isArray(Q) ? Q.map((i) => i.id) : [],
    [Q]
  ), Y = re($e);
  Y.current = $e, le(() => {
    const i = (D) => {
      if (j.current) {
        const X = j.current.querySelector(".wx-body");
        X && (X.style.top = -((D ?? 0) - (Y.current ?? 0)) + "px");
      }
      de.current && (de.current.scrollTop = 0);
    };
    return i(C), a.on("scroll-chart", ({ top: D }) => {
      D !== void 0 && i(D);
    });
  }, [a, C]), le(() => {
    if (j.current) {
      const i = j.current.querySelector(".wx-body");
      i && (i.style.top = -((C ?? 0) - ($e ?? 0)) + "px");
    }
  }, [$e]), le(() => {
    const i = j.current;
    if (!i) return;
    const m = i.querySelector(".wx-table-box .wx-body");
    if (!m || typeof ResizeObserver > "u") return;
    const D = new ResizeObserver(() => {
      if (j.current) {
        const X = j.current.querySelector(".wx-body");
        X && (X.style.top = -((C ?? 0) - (Y.current ?? 0)) + "px");
      }
    });
    return D.observe(m), () => {
      D.disconnect();
    };
  }, [B, x, o, ee, V, C]), le(() => {
    if (!N || !q) return;
    const { id: i } = N, m = q.getState().focusCell;
    m && m.row !== i && j.current && j.current.contains(document.activeElement) && q.exec("focus-cell", {
      row: i,
      column: m.column
    });
  }, [N, q]);
  const Ce = I(
    ({ id: i }) => {
      if (n) return !1;
      a.getTask(i).open && a.exec("open-task", { id: i, mode: !1 });
      const m = a.getState()._tasks.find((D) => D.id === i);
      if (W(m || null), !m) return !1;
    },
    [a, n]
  ), Ie = I(
    ({ id: i, top: m }) => {
      De.current ? Re({ ...De.current, onMove: !1 }) : a.exec("drag-task", {
        id: i,
        top: m + ($e ?? 0),
        inProgress: !1
      }), W(null);
    },
    [a, Re, $e]
  ), fe = I(
    ({ id: i, top: m, detail: D }) => {
      D && Re({ ...D, onMove: !0 }), a.exec("drag-task", {
        id: i,
        top: m + ($e ?? 0),
        inProgress: !0
      });
    },
    [a, Re, $e]
  );
  le(() => {
    const i = j.current;
    return i ? En(i, {
      start: Ce,
      end: Ie,
      move: fe,
      getTask: a.getTask
    }).destroy : void 0;
  }, [a, Ce, Ie, fe]);
  const ve = I(
    (i) => {
      const { key: m, isInput: D } = i;
      if (!D && (m === "arrowup" || m === "arrowdown"))
        return i.eventSource = "grid", a.exec("hotkey", i), !1;
      if (m === "enter") {
        const X = q?.getState().focusCell;
        if (X) {
          const { row: ke, column: ge } = X;
          ge === "add-task" ? M(ke, "add-task") : ge === "text" && M(ke, "open-task");
        }
      }
    },
    [a, M, q]
  ), we = re(null), He = () => {
    we.current = {
      setTableAPI: K,
      handleHotkey: ve,
      sortVal: J,
      api: a,
      adjustColumns: f,
      setColumnWidth: he,
      tasks: w,
      calendarVal: ue,
      durationUnitVal: G,
      splitTasksVal: be,
      onTableAPIChange: k
    };
  };
  He(), le(() => {
    He();
  }, [
    K,
    ve,
    J,
    a,
    f,
    he,
    w,
    ue,
    G,
    be,
    k
  ]);
  const Ae = I((i) => {
    K(i), i.intercept("hotkey", (m) => we.current.handleHotkey(m)), i.intercept("scroll", () => !1), i.intercept("select-row", () => !1), i.intercept("sort-rows", (m) => {
      const D = we.current.sortVal, { key: X, add: ke } = m, ge = D ? D.find((Oe) => Oe.key === X) : null;
      let Se = "asc";
      return ge && (Se = !ge || ge.order === "asc" ? "desc" : "asc"), a.exec("sort-tasks", {
        key: X,
        order: Se,
        add: ke
      }), !1;
    }), i.on("resize-column", () => {
      we.current.setColumnWidth(!0);
    }), i.on("hide-column", (m) => {
      m.mode || we.current.adjustColumns(), we.current.setColumnWidth();
    }), i.intercept("update-cell", (m) => {
      const { id: D, column: X, value: ke } = m, ge = we.current.tasks.find((Se) => Se.id === D);
      if (ge) {
        const Se = { ...ge };
        let Oe = ke;
        Oe && !isNaN(Oe) && !(Oe instanceof Date) && (Oe *= 1), Se[X] = Oe, Wt(
          Se,
          {
            calendar: we.current.calendarVal,
            durationUnit: we.current.durationUnitVal,
            splitTasks: we.current.splitTasksVal
          },
          X
        ), a.exec("update-task", {
          id: D,
          task: Se
        });
      }
      return !1;
    }), k && k(i);
  }, []);
  return /* @__PURE__ */ d(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ee}` },
      ref: de,
      children: /* @__PURE__ */ d(
        "div",
        {
          ref: j,
          style: x,
          className: "wx-rHj6070p wx-table",
          onClick: se,
          onDoubleClick: te,
          children: /* @__PURE__ */ d(
            Cn,
            {
              init: Ae,
              sizes: {
                rowHeight: ne,
                headerHeight: (Le ?? 0) - 1
              },
              rowStyle: (i) => i.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (i) => `wx-rHj6070p wx-text-${i.align}${i.id === "add-task" ? " wx-action" : ""}`,
              data: V,
              columns: B,
              selectedRows: [...me],
              sortMarks: ye
            }
          )
        }
      )
    }
  );
}
function Ln({ borders: t = "" }) {
  const n = ze(Xe), s = F(n, "cellWidth"), l = F(n, "cellHeight"), o = re(null), [_, k] = xe("#e4e4e4");
  le(() => {
    if (typeof getComputedStyle < "u" && o.current) {
      const r = getComputedStyle(o.current).getPropertyValue(
        "--wx-gantt-border"
      );
      k(r ? r.substring(r.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const h = {
    width: "100%",
    height: "100%",
    background: s != null && l != null ? `url(${gn(s, l, _, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ d("div", { ref: o, style: h });
}
function _n({ onSelectLink: t, selectedLink: n, readonly: s }) {
  const l = ze(Xe), o = F(l, "_links"), _ = F(l, "criticalPath"), k = re(null), h = I(
    (r) => {
      const p = r?.target?.classList;
      !p?.contains("wx-line") && !p?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return le(() => {
    if (!s && n && k.current) {
      const r = (p) => {
        k.current && !k.current.contains(p.target) && h(p);
      };
      return document.addEventListener("click", r), () => {
        document.removeEventListener("click", r);
      };
    }
  }, [s, n, h]), /* @__PURE__ */ Pe("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (o || []).map((r) => {
      const p = "wx-dkx3NwEn wx-line" + (_ && r.$critical ? " wx-critical" : "") + (s ? "" : " wx-line-selectable");
      return /* @__PURE__ */ d(
        "polyline",
        {
          className: p,
          points: r.$p,
          onClick: () => !s && t(r.id),
          "data-link-id": r.id
        },
        r.id
      );
    }),
    !s && n && /* @__PURE__ */ d(
      "polyline",
      {
        ref: k,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: n.$p
      }
    )
  ] });
}
function Pn(t) {
  const { task: n, type: s } = t;
  function l(_) {
    const k = n.segments[_];
    return {
      left: `${k.$x}px`,
      top: "0px",
      width: `${k.$w}px`,
      height: "100%"
    };
  }
  function o(_) {
    if (!n.progress) return 0;
    const k = n.duration * n.progress / 100, h = n.segments;
    let r = 0, p = 0, y = null;
    do {
      const q = h[p];
      p === _ && (r > k ? y = 0 : y = Math.min((k - r) / q.duration, 1) * 100), r += q.duration, p++;
    } while (y === null && p < h.length);
    return y || 0;
  }
  return /* @__PURE__ */ d("div", { className: "wx-segments wx-GKbcLEGA", children: n.segments.map((_, k) => /* @__PURE__ */ Pe(
    "div",
    {
      className: `wx-segment wx-bar wx-${s} wx-GKbcLEGA`,
      "data-segment": k,
      style: l(k),
      children: [
        n.progress ? /* @__PURE__ */ d("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ d(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${o(k)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ d("div", { className: "wx-content", children: _.text || "" })
      ]
    },
    k
  )) });
}
let Ze = [], at = null, Lt = null;
const _t = (t, n) => {
  if (!n || !n.start) return null;
  const { start: s, lengthUnitWidth: l, lengthUnit: o } = n, _ = 864e5, k = o === "week" ? 7 : o === "month" ? 30 : o === "quarter" ? 91 : o === "year" ? 365 : 1, h = Math.floor(t / l), r = new Date(s.getTime() + h * k * _);
  return r.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: h,
    scalesStart: s.toISOString(),
    result: r.toISOString()
  }), r;
}, Hn = (t, n, s) => {
  if (!s || !t || !n) return 0;
  const { lengthUnit: l } = s, k = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - n.getTime()) / k);
}, Wn = (t, n, s) => {
  if (!s || !t)
    return console.log("[addCells] early return:", { scales: !!s, date: t?.toISOString?.() }), t;
  const { lengthUnit: l } = s, k = (l === "week" ? 7 : l === "month" ? 30 : l === "quarter" ? 91 : l === "year" ? 365 : 1) * 864e5, h = new Date(t.getTime() + n * k);
  return h.setUTCHours(0, 0, 0, 0), console.log("[addCells]", { date: t.toISOString(), cells: n, lengthUnit: l, result: h.toISOString() }), h;
}, An = (t, n, s, l) => t < l && n > s;
function On(t) {
  const {
    readonly: n,
    taskTemplate: s,
    multiTaskRows: l = !1,
    rowMapping: o = null,
    marqueeSelect: _ = !1,
    copyPaste: k = !1,
    allowTaskIntersection: h = !0
  } = t, r = ze(Xe), [p, y] = st(r, "_tasks"), [q, K] = st(r, "_links"), O = F(r, "area"), P = F(r, "_scales"), a = F(r, "taskTypes"), C = v(() => {
    if (!P || !P.start) return P;
    const e = new Date(Date.UTC(
      P.start.getFullYear(),
      P.start.getMonth(),
      P.start.getDate()
    )), c = e.getUTCDay(), u = c === 0 ? -6 : 1 - c, g = new Date(e.getTime() + u * 864e5);
    return g.setUTCHours(0, 0, 0, 0), console.log("[scales-normalize]", {
      raw: P.start.toISOString(),
      utc: e.toISOString(),
      dayOfWeek: c,
      daysToMonday: u,
      monday: g.toISOString()
    }), { ...P, start: g };
  }, [P]), ne = F(r, "baselines"), [N, Q] = st(r, "_selected"), R = F(r, "_scrollTask"), H = F(r, "criticalPath"), b = F(r, "tasks"), ie = F(r, "schedule"), J = F(r, "splitTasks"), ue = v(() => {
    if (!O || !Array.isArray(p)) return [];
    const e = O.start ?? 0, c = O.end ?? 0;
    return l && o ? p.map((u) => ({ ...u })) : p.slice(e, c).map((u) => ({ ...u }));
  }, [y, O, l, o]), G = F(r, "cellHeight"), be = v(() => {
    if (!l || !o || !ue.length) return ue;
    const e = /* @__PURE__ */ new Map(), c = [];
    return p.forEach((u) => {
      const g = o.taskRows.get(u.id) ?? u.id;
      e.has(g) || (e.set(g, c.length), c.push(g));
    }), ue.map((u) => {
      const g = o.taskRows.get(u.id) ?? u.id, S = e.get(g) ?? 0;
      return {
        ...u,
        $y: S * G,
        $y_base: u.$y_base !== void 0 ? S * G : void 0
      };
    });
  }, [ue, l, o, p, G]), U = v(
    () => C.lengthUnitWidth,
    [C]
  ), W = v(
    () => C.lengthUnit || "day",
    [C]
  ), w = re(!1), [M, se] = xe(void 0), [j, de] = xe(null), ce = re(null), [pe, Ne] = xe(null), [Ee, De] = xe(void 0), Re = re(null), [$e, Le] = xe(0), [Z, x] = xe(null), A = re(null), [V, z] = xe(null), [ee, ye] = xe(null), [oe, $] = xe(null), B = re(null);
  B.current = ee;
  const he = re(200), f = re(null), te = v(() => {
    const e = f.current;
    return !!(N.length && e && e.contains(document.activeElement));
  }, [N, f.current]), me = v(() => te && N[N.length - 1]?.id, [te, N]);
  le(() => {
    if (R && te && R) {
      const { id: e } = R, c = f.current?.querySelector(
        `.wx-bar[data-id='${e}']`
      );
      c && c.focus({ preventScroll: !0 });
    }
  }, [R]), le(() => {
    const e = f.current;
    if (e && (Le(e.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const c = new ResizeObserver((u) => {
        u[0] && Le(u[0].contentRect.width);
      });
      return c.observe(e), () => c.disconnect();
    }
  }, [f.current]);
  const Y = I(() => {
    document.body.style.userSelect = "none";
  }, []), Ce = I(() => {
    document.body.style.userSelect = "";
  }, []), Ie = I(
    (e, c, u) => {
      if (c.target.classList.contains("wx-line") || (u || (u = r.getTask(Ke(e))), u.type === "milestone" || u.type === "summary")) return "";
      const g = Ge(c, "data-segment");
      g && (e = g);
      const { left: S, width: E } = e.getBoundingClientRect(), T = (c.clientX - S) / E;
      let L = 0.2 / (E > 200 ? E / 200 : 1);
      return T < L ? "start" : T > 1 - L ? "end" : "";
    },
    [r]
  ), fe = v(() => {
    const e = /* @__PURE__ */ new Set();
    if (h || !l || !o)
      return e;
    const c = /* @__PURE__ */ new Map();
    return p.forEach((u) => {
      if (u.type === "summary" || u.type === "milestone") return;
      const g = o.taskRows.get(u.id) ?? u.id;
      c.has(g) || c.set(g, []), c.get(g).push(u);
    }), c.forEach((u) => {
      if (!(u.length < 2))
        for (let g = 0; g < u.length; g++)
          for (let S = g + 1; S < u.length; S++) {
            const E = u[g], T = u[S], L = E.$x, ae = E.$x + E.$w, Te = T.$x, Me = T.$x + T.$w;
            An(L, ae, Te, Me) && (e.add(E.id), e.add(T.id));
          }
    }), e;
  }, [h, l, o, p, y]), ve = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return p.forEach((g) => {
        e.set(g.id, g.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), u = [];
    return p.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id;
      c.has(S) || (c.set(S, u.length), u.push(S));
    }), p.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id, E = c.get(S) ?? 0;
      e.set(g.id, E * G);
    }), e;
  }, [p, l, o, G]), we = v(() => {
    const e = /* @__PURE__ */ new Map();
    if (!l || !o)
      return p.forEach((g) => {
        e.set(g.id, g.$y), g.row !== void 0 && e.set(g.row, g.$y);
      }), e;
    const c = /* @__PURE__ */ new Map(), u = [];
    return p.forEach((g) => {
      const S = o.taskRows.get(g.id) ?? g.id;
      c.has(S) || (c.set(S, u.length), u.push(S));
    }), c.forEach((g, S) => {
      e.set(S, g * G);
    }), e;
  }, [p, l, o, G]), He = I(
    (e) => {
      if (!f.current) return [];
      const u = Math.min(e.startX, e.currentX), g = Math.max(e.startX, e.currentX), S = Math.min(e.startY, e.currentY), E = Math.max(e.startY, e.currentY);
      return p.filter((T) => {
        const L = T.$x, ae = T.$x + T.$w, Me = ve.get(T.id) ?? T.$y, We = Me + T.$h;
        return L < g && ae > u && Me < E && We > S;
      });
    },
    [p, ve]
  ), Ae = v(() => new Set(N.map((e) => e.id)), [N, Q]), i = I(
    (e) => Ae.has(e),
    [Ae]
  ), m = I(
    (e, c) => {
      const { clientX: u } = c, g = Ke(e), S = r.getTask(g), E = c.target.classList;
      if (!c.target.closest(".wx-delete-button") && !n) {
        if (E.contains("wx-progress-marker")) {
          const { progress: T } = r.getTask(g);
          ce.current = {
            id: g,
            x: u,
            progress: T,
            dx: 0,
            node: e,
            marker: c.target
          }, c.target.classList.add("wx-progress-in-drag");
        } else {
          const T = Ie(e, c, S) || "move", L = {
            id: g,
            mode: T,
            x: u,
            dx: 0,
            l: S.$x,
            w: S.$w
          };
          if (J && S.segments?.length) {
            const ae = Ge(c, "data-segment");
            ae && (L.segmentIndex = ae.dataset.segment * 1, mn(S, L));
          }
          de(L);
        }
        Y();
      }
    },
    [r, n, Ie, Y, J]
  ), D = I(
    (e) => {
      if (e.button !== 0 || oe) return;
      const c = Ge(e);
      if (!c && _ && !n) {
        const u = f.current;
        if (!u) return;
        const g = u.getBoundingClientRect(), S = e.clientX - g.left, E = e.clientY - g.top;
        if (k) {
          const L = _t(S, C);
          L && (B.current = L, ye(L));
        }
        const T = {
          startX: S,
          startY: E,
          currentX: S,
          currentY: E,
          ctrlKey: e.ctrlKey || e.metaKey
        };
        x(T), A.current = T, Y();
        return;
      }
      if (c) {
        if (_ && !n && N.length > 1) {
          const u = Ke(c);
          if (i(u)) {
            const g = e.target.classList;
            if (!g.contains("wx-link") && !g.contains("wx-progress-marker") && !e.target.closest(".wx-delete-button")) {
              const S = r.getTask(u);
              if (!Ie(c, e, S)) {
                const T = /* @__PURE__ */ new Map();
                N.forEach((L) => {
                  const ae = r.getTask(L.id);
                  if (ae) {
                    if (ie?.auto && ae.type === "summary") return;
                    T.set(L.id, {
                      $x: ae.$x,
                      $w: ae.$w,
                      start: ae.start,
                      end: ae.end
                    });
                  }
                }), z({
                  baseTaskId: u,
                  startX: e.clientX,
                  dx: 0,
                  originalPositions: T
                }), Y();
                return;
              }
            }
          }
        }
        m(c, e);
      }
    },
    [m, _, k, n, N, i, r, Ie, ie, Y, C, oe]
  ), X = I(
    (e) => {
      const c = Ge(e);
      c && (Re.current = setTimeout(() => {
        De(!0), m(c, e.touches[0]);
      }, 300));
    },
    [m]
  ), ke = I(
    (e) => {
      Ne(e && { ...q.find((c) => c.id === e) });
    },
    [q]
  ), ge = I(() => {
    const e = A.current;
    if (e) {
      const c = He(e);
      e.ctrlKey ? c.forEach((u) => {
        r.exec("select-task", { id: u.id, toggle: !0, marquee: !0 });
      }) : (N.length > 0 && r.exec("select-task", { id: null, marquee: !0 }), c.forEach((u, g) => {
        r.exec("select-task", {
          id: u.id,
          toggle: g > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), x(null), A.current = null, Ce(), w.current = !0;
      return;
    }
    if (V) {
      const { dx: c, originalPositions: u } = V, g = Math.round(c / U);
      if (g !== 0) {
        let S = !0;
        u.forEach((E, T) => {
          const L = r.getTask(T);
          L && (r.exec("update-task", {
            id: T,
            diff: g,
            task: { start: L.start, end: L.end },
            skipUndo: !S
            // Only first task creates undo entry
          }), S = !1);
        }), w.current = !0;
      } else
        u.forEach((S, E) => {
          r.exec("drag-task", {
            id: E,
            left: S.$x,
            width: S.$w,
            inProgress: !1
          });
        });
      z(null), Ce();
      return;
    }
    if (ce.current) {
      const { dx: c, id: u, marker: g, value: S } = ce.current;
      ce.current = null, typeof S < "u" && c && r.exec("update-task", {
        id: u,
        task: { progress: S },
        inProgress: !1
      }), g.classList.remove("wx-progress-in-drag"), w.current = !0, Ce();
    } else if (j) {
      const { id: c, mode: u, dx: g, l: S, w: E, start: T, segment: L, index: ae } = j;
      if (de(null), T) {
        const Te = Math.round(g / U);
        if (!Te)
          r.exec("drag-task", {
            id: c,
            width: E,
            left: S,
            inProgress: !1,
            ...L && { segmentIndex: ae }
          });
        else {
          let Me = {}, We = r.getTask(c);
          L && (We = We.segments[ae]);
          const Ve = 1440 * 60 * 1e3, _e = Te * (W === "week" ? 7 : W === "month" ? 30 : W === "quarter" ? 91 : W === "year" ? 365 : 1) * Ve;
          u === "move" ? (Me.start = new Date(We.start.getTime() + _e), Me.end = new Date(We.end.getTime() + _e)) : u === "start" ? (Me.start = new Date(We.start.getTime() + _e), Me.end = We.end) : u === "end" && (Me.start = We.start, Me.end = new Date(We.end.getTime() + _e)), r.exec("update-task", {
            id: c,
            task: Me,
            ...L && { segmentIndex: ae }
          });
        }
        w.current = !0;
      }
      Ce();
    }
  }, [r, Ce, j, U, W, Z, V, He, N]), Se = I(
    (e, c) => {
      const { clientX: u, clientY: g } = c, S = f.current;
      if (S) {
        const E = S.getBoundingClientRect();
        he.current = u - E.left;
      }
      if (oe) {
        if (!S) return;
        const E = S.getBoundingClientRect(), T = u - E.left;
        $((L) => ({ ...L, currentX: T }));
        return;
      }
      if (!n) {
        if (Z) {
          const E = f.current;
          if (!E) return;
          const T = E.getBoundingClientRect(), L = u - T.left, ae = g - T.top;
          x((Te) => ({
            ...Te,
            currentX: L,
            currentY: ae
          })), A.current && (A.current.currentX = L, A.current.currentY = ae);
          return;
        }
        if (V) {
          const E = u - V.startX;
          V.originalPositions.forEach((T, L) => {
            const ae = T.$x + E;
            r.exec("drag-task", {
              id: L,
              left: ae,
              width: T.$w,
              inProgress: !0
            });
          }), z((T) => ({ ...T, dx: E }));
          return;
        }
        if (ce.current) {
          const { node: E, x: T, id: L } = ce.current, ae = ce.current.dx = u - T, Te = Math.round(ae / E.offsetWidth * 100);
          let Me = ce.current.progress + Te;
          ce.current.value = Me = Math.min(
            Math.max(0, Me),
            100
          ), r.exec("update-task", {
            id: L,
            task: { progress: Me },
            inProgress: !0
          });
        } else if (j) {
          ke(null);
          const { mode: E, l: T, w: L, x: ae, id: Te, start: Me, segment: We, index: Ve } = j, Fe = r.getTask(Te), _e = u - ae;
          if (!Me && Math.abs(_e) < 20 || E === "start" && L - _e < U || E === "end" && L + _e < U || E === "move" && (_e < 0 && T + _e < 0 || _e > 0 && T + L + _e > $e) || j.segment && !wn(Fe, j))
            return;
          const nt = { ...j, dx: _e };
          let je, Qe;
          if (E === "start" ? (je = T + _e, Qe = L - _e) : E === "end" ? (je = T, Qe = L + _e) : E === "move" && (je = T + _e, Qe = L), r.exec("drag-task", {
            id: Te,
            width: Qe,
            left: je,
            inProgress: !0,
            ...We && { segmentIndex: Ve }
          }), !nt.start && (E === "move" && Fe.$x == T || E !== "move" && Fe.$w == L)) {
            w.current = !0, ge();
            return;
          }
          nt.start = !0, de(nt);
        } else {
          const E = Ge(e);
          if (E) {
            const T = r.getTask(Ke(E)), ae = Ge(e, "data-segment") || E, Te = Ie(ae, c, T);
            ae.style.cursor = Te && !n ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      r,
      n,
      j,
      U,
      $e,
      Ie,
      ke,
      ge,
      Z,
      V,
      oe
    ]
  ), Oe = I(
    (e) => {
      Se(e, e);
    },
    [Se]
  ), Yt = I(
    (e) => {
      Ee ? (e.preventDefault(), Se(e, e.touches[0])) : Re.current && (clearTimeout(Re.current), Re.current = null);
    },
    [Ee, Se]
  ), it = I(() => {
    ge();
  }, [ge]), Xt = I(() => {
    De(null), Re.current && (clearTimeout(Re.current), Re.current = null), ge();
  }, [ge]);
  le(() => (window.addEventListener("mouseup", it), () => {
    window.removeEventListener("mouseup", it);
  }), [it]);
  const Ft = I(
    (e) => {
      if (!n) {
        const c = qe(e.target);
        if (c && !e.target.classList.contains("wx-link")) {
          const u = qe(e.target, "data-segment");
          r.exec("show-editor", {
            id: c,
            ...u !== null && { segmentIndex: u }
          });
        }
      }
    },
    [r, n]
  ), Kt = ["e2s", "s2s", "e2e", "s2e"], et = I((e, c) => Kt[(e ? 1 : 0) + (c ? 0 : 2)], []), tt = I(
    (e, c) => {
      const u = M.id, g = M.start;
      return e === u ? !0 : !!q.find((S) => S.target == e && S.source == u && S.type === et(g, c));
    },
    [M, K, et]
  ), ft = I(() => {
    M && se(null);
  }, [M]), ht = I((e, c, u) => {
    if (!c.length || !e || u == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: e.toISOString(),
      taskCount: c.length,
      parent: u
    });
    const g = 864e5, S = r.getHistory();
    S?.startBatch();
    const E = new Date(e);
    E.setUTCHours(0, 0, 0, 0), console.log("[paste] scalesValue:", {
      start: C?.start?.toISOString?.(),
      lengthUnit: C?.lengthUnit,
      lengthUnitWidth: C?.lengthUnitWidth
    }), c.forEach((T, L) => {
      const ae = `task-${Date.now()}-${L}`;
      console.log("[paste] task input:", {
        text: T.text,
        _startCellOffset: T._startCellOffset,
        _startDayOfWeek: T._startDayOfWeek,
        _durationDays: T._durationDays,
        start: T.start?.toISOString?.(),
        end: T.end?.toISOString?.()
      });
      const Te = Wn(E, T._startCellOffset || 0, C);
      console.log("[paste] cellOffset:", Te?.toISOString?.());
      const Me = new Date(Te.getTime() + (T._startDayOfWeek || 0) * g);
      Me.setUTCHours(0, 0, 0, 0);
      const We = new Date(Me.getTime() + (T._durationDays || 7) * g);
      We.setUTCHours(0, 0, 0, 0), console.log("[paste] task calculated:", {
        text: T.text,
        newStart: Me.toISOString(),
        newEnd: We.toISOString(),
        row: T.row
      }), r.exec("add-task", {
        task: {
          id: ae,
          text: T.text,
          start: Me,
          end: We,
          type: T.type || "task",
          parent: u,
          row: T.row
        },
        target: u,
        mode: "child",
        skipUndo: L > 0
      });
    }), S?.endBatch();
  }, [r, C]), Vt = I(
    (e) => {
      if (w.current) {
        w.current = !1;
        return;
      }
      if (oe && oe.currentX != null) {
        const u = _t(oe.currentX, C);
        u && ht(u, oe.tasks, oe.parent), $(null);
        return;
      }
      const c = qe(e.target);
      if (c) {
        const u = r.getTask(c), g = p.find((E) => E.id === c);
        console.log("[click] task:", u?.text, "id:", c), console.log("[click] api.getTask:", { start: u?.start, end: u?.end, duration: u?.duration }), console.log("[click] rendered:", { start: g?.start, end: g?.end, $w: g?.$w, $x: g?.$x });
        const S = e.target.classList;
        if (S.contains("wx-link")) {
          const E = S.contains("wx-left");
          if (!M) {
            se({ id: c, start: E });
            return;
          }
          M.id !== c && !tt(c, E) && r.exec("add-link", {
            link: {
              source: M.id,
              target: c,
              type: et(M.start, E)
            }
          });
        } else if (S.contains("wx-delete-button-icon"))
          r.exec("delete-link", { id: pe.id }), Ne(null);
        else {
          let E;
          const T = Ge(e, "data-segment");
          T && (E = T.dataset.segment * 1), r.exec("select-task", {
            id: c,
            toggle: e.ctrlKey || e.metaKey,
            range: e.shiftKey,
            segmentIndex: E
          });
        }
      }
      ft();
    },
    [
      r,
      M,
      K,
      pe,
      tt,
      et,
      ft,
      oe,
      C,
      ht
    ]
  ), qt = I((e) => ({
    left: `${e.$x}px`,
    top: `${e.$y}px`,
    width: `${e.$w}px`,
    height: `${e.$h}px`
  }), []), Bt = I((e) => ({
    left: `${e.$x_base}px`,
    top: `${e.$y_base}px`,
    width: `${e.$w_base}px`,
    height: `${e.$h_base}px`
  }), []), jt = I(
    (e) => {
      if (Ee || Re.current)
        return e.preventDefault(), !1;
    },
    [Ee]
  ), gt = v(
    () => a.map((e) => e.id),
    [a]
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
    (e) => H && b.byId(e).$critical,
    [H, b]
  ), xt = I(
    (e) => {
      if (ie?.auto) {
        const c = b.getSummaryId(e, !0), u = b.getSummaryId(M.id, !0);
        return M?.id && !(Array.isArray(c) ? c : [c]).includes(
          M.id
        ) && !(Array.isArray(u) ? u : [u]).includes(e);
      }
      return M;
    },
    [ie, b, M]
  ), pt = I(() => {
    const e = r.getState()._selected;
    if (!e || !e.length) return;
    const c = 864e5, u = e.map((L) => {
      const ae = r.getTask(L.id);
      if (!ae) return null;
      const Te = p.find((Zt) => Zt.id === L.id);
      if (!Te) return null;
      const { $x: Me, $y: We, $h: Ve, $w: Fe, $skip: _e, $level: nt, $index: je, $y_base: Qe, $x_base: ns, $w_base: ss, $h_base: rs, $skip_baseline: os, $critical: ls, $reorder: is, ...Qt } = Te, kt = Te.end && Te.start ? Math.round((Te.end.getTime() - Te.start.getTime()) / c) : 0, bt = Te.start ? (Te.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: ae.id,
        text: ae.text,
        start: Te.start?.toISOString?.(),
        end: Te.end?.toISOString?.(),
        durationDays: kt,
        startDayOfWeek: bt,
        $w: Fe,
        $h: Ve,
        row: Te.row,
        parent: Te.parent
      }), { ...Qt, _durationDays: kt, _startDayOfWeek: bt, _originalWidth: Fe, _originalHeight: Ve };
    }).filter(Boolean);
    if (!u.length) return;
    const S = u[0].parent, E = u.filter((L) => L.parent === S);
    if (E.length === 0) return;
    const T = E.reduce((L, ae) => ae.start && (!L || ae.start < L) ? ae.start : L, null);
    Ze = E.map((L) => ({
      ...L,
      _startCellOffset: Hn(L.start, T, C)
    })), Lt = S, at = T, console.log("[copy] clipboard stored:", {
      taskCount: Ze.length,
      baseDate: T?.toISOString?.(),
      parent: S,
      tasks: Ze.map((L) => ({
        id: L.id,
        text: L.text,
        _startCellOffset: L._startCellOffset,
        _startDayOfWeek: L._startDayOfWeek,
        _durationDays: L._durationDays
      }))
    });
  }, [r, C]);
  le(() => k ? r.intercept("hotkey", (c) => {
    if (c.key === "ctrl+c" || c.key === "meta+c")
      return pt(), !1;
    if (c.key === "ctrl+v" || c.key === "meta+v")
      return !Ze.length || !at || $({
        tasks: Ze,
        baseDate: at,
        parent: Lt,
        currentX: he.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [k, r, pt]), le(() => {
    if (!oe) return;
    const e = (c) => {
      c.key === "Escape" && (c.preventDefault(), c.stopPropagation(), $(null));
    };
    return document.addEventListener("keydown", e, !0), () => document.removeEventListener("keydown", e, !0);
  }, [oe]);
  const yt = v(() => {
    if (!Z) return null;
    const e = Math.min(Z.startX, Z.currentX), c = Math.min(Z.startY, Z.currentY), u = Math.abs(Z.currentX - Z.startX), g = Math.abs(Z.currentY - Z.startY);
    return {
      left: `${e}px`,
      top: `${c}px`,
      width: `${u}px`,
      height: `${g}px`
    };
  }, [Z]);
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${be.length ? be[0].$h : 0}px` },
      ref: f,
      onContextMenu: jt,
      onMouseDown: D,
      onMouseMove: Oe,
      onTouchStart: X,
      onTouchMove: Yt,
      onTouchEnd: Xt,
      onClick: Vt,
      onDoubleClick: Ft,
      onDragStart: (e) => (e.preventDefault(), !1),
      children: [
        /* @__PURE__ */ d(
          _n,
          {
            onSelectLink: ke,
            selectedLink: pe,
            readonly: n
          }
        ),
        be.map((e) => {
          if (e.$skip && e.$skip_baseline) return null;
          const c = fe.has(e.id), u = `wx-bar wx-${mt(e.type)}` + (e.$css ? ` ${e.$css}` : "") + (Ee && j && e.id === j.id ? " wx-touch" : "") + (M && M.id === e.id ? " wx-selected" : "") + (Ae.has(e.id) ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "") + (e.$reorder ? " wx-reorder-task" : "") + (J && e.segments ? " wx-split" : "") + (c ? " wx-collision" : ""), g = "wx-link wx-left" + (M ? " wx-visible" : "") + (!M || !tt(e.id, !0) && xt(e.id) ? " wx-target" : "") + (M && M.id === e.id && M.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : ""), S = "wx-link wx-right" + (M ? " wx-visible" : "") + (!M || !tt(e.id, !1) && xt(e.id) ? " wx-target" : "") + (M && M.id === e.id && !M.start ? " wx-selected" : "") + (ct(e.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Pe(en, { children: [
            !e.$skip && /* @__PURE__ */ Pe(
              "div",
              {
                className: "wx-GKbcLEGA " + u,
                style: qt(e),
                "data-tooltip-id": e.id,
                "data-id": e.id,
                tabIndex: me === e.id ? 0 : -1,
                children: [
                  n ? null : e.id === pe?.target && pe?.type[2] === "s" ? /* @__PURE__ */ d(
                    Tt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ d("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA " + g, children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  e.type !== "milestone" ? /* @__PURE__ */ Pe(Je, { children: [
                    e.progress && !(J && e.segments) ? /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${e.progress}%` }
                      }
                    ) }) : null,
                    !n && !(J && e.segments) ? /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${e.progress}% - 10px)` },
                        children: e.progress
                      }
                    ) : null,
                    s ? /* @__PURE__ */ d(s, { data: e, api: r, onAction: wt }) : J && e.segments ? /* @__PURE__ */ d(Pn, { task: e, type: mt(e.type) }) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content", children: e.$barText || e.text || "" }),
                    c && /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Pe(Je, { children: [
                    /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content" }),
                    s ? /* @__PURE__ */ d(s, { data: e, api: r, onAction: wt }) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-text-out", children: e.$barText || e.text })
                  ] }),
                  n ? null : e.id === pe?.target && pe?.type[2] === "e" ? /* @__PURE__ */ d(
                    Tt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ d("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA " + S, children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            ne && !e.$skip_baseline ? /* @__PURE__ */ d(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (e.type === "milestone" ? " wx-milestone" : ""),
                style: Bt(e)
              }
            ) : null
          ] }, e.id);
        }),
        Z && yt && /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: yt }),
        oe && oe.currentX != null && oe.tasks.map((e, c) => {
          const g = (Math.floor(oe.currentX / U) + (e._startCellOffset || 0)) * U, S = e._originalWidth || U, E = e._originalHeight || G, T = we.get(e.row) ?? (e.$y || 0);
          return /* @__PURE__ */ d(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: g, top: T, width: S, height: E },
              children: /* @__PURE__ */ d("div", { className: "wx-GKbcLEGA wx-content", children: e.$barText || e.text })
            },
            `preview-${c}`
          );
        })
      ]
    }
  );
}
function zn(t) {
  const { highlightTime: n, onScaleClick: s } = t, l = ze(Xe), o = F(l, "_scales");
  return /* @__PURE__ */ d("div", { className: "wx-ZkvhDKir wx-scale", style: { width: o.width }, children: (o?.rows || []).map((_, k) => /* @__PURE__ */ d(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${_.height}px` },
      children: (_.cells || []).map((h, r) => {
        const p = n ? n(h.date, h.unit) : "", y = "wx-cell " + (h.css || "") + " " + (p || ""), q = typeof h.value == "string" && h.value.includes("<");
        return /* @__PURE__ */ d(
          "div",
          {
            className: "wx-ZkvhDKir " + y,
            style: { width: `${h.width}px`, cursor: s ? "pointer" : void 0 },
            onClick: s ? () => s(h.date, h.unit) : void 0,
            ...q ? { dangerouslySetInnerHTML: { __html: h.value } } : { children: h.value }
          },
          r
        );
      })
    },
    k
  )) });
}
const Gn = /* @__PURE__ */ new Map();
function Un(t) {
  const n = re(null), s = re(0), l = re(null), o = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  n.current === null && (n.current = performance.now()), s.current++, le(() => {
    if (o)
      return cancelAnimationFrame(l.current), l.current = requestAnimationFrame(() => {
        const _ = {
          label: t,
          time: performance.now() - n.current,
          renders: s.current,
          timestamp: Date.now()
        };
        Gn.set(t, _), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: _ })
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
    cellBorders: _,
    highlightTime: k,
    onScaleClick: h,
    multiTaskRows: r = !1,
    rowMapping: p = null,
    marqueeSelect: y = !1,
    copyPaste: q = !1,
    scrollToCurrentWeek: K = !1,
    currentWeekColor: O = null,
    allowTaskIntersection: P = !0
  } = t, a = ze(Xe), [C, ne] = st(a, "_selected"), N = F(a, "scrollTop"), Q = F(a, "cellHeight"), R = F(a, "cellWidth"), H = F(a, "_scales"), b = F(a, "_markers"), ie = F(a, "_scrollTask"), J = F(a, "zoom"), ue = F(a, "_tasks"), [G, be] = xe(), U = re(null), W = re(0), w = re(!1), M = 1 + (H?.rows?.length || 0), se = v(() => {
    if (!r || !p || !ue?.length) return null;
    const x = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), V = [];
    return ue.forEach((z) => {
      const ee = p.taskRows.get(z.id) ?? z.id;
      A.has(ee) || (A.set(ee, V.length), V.push(ee));
    }), ue.forEach((z) => {
      const ee = p.taskRows.get(z.id) ?? z.id, ye = A.get(ee) ?? 0;
      x.set(z.id, ye * Q);
    }), x;
  }, [ue, r, p, Q]), j = v(() => {
    const x = [];
    return C && C.length && Q && C.forEach((A) => {
      const V = se?.get(A.id) ?? A.$y;
      x.push({ height: `${Q}px`, top: `${V - 3}px` });
    }), x;
  }, [ne, Q, se]), de = v(
    () => Math.max(G || 0, l),
    [G, l]
  );
  le(() => {
    const x = U.current;
    x && typeof N == "number" && (x.scrollTop = N);
  }, [N]);
  const ce = () => {
    pe();
  };
  function pe(x) {
    const A = U.current;
    if (!A) return;
    const V = {};
    V.left = A.scrollLeft, a.exec("scroll-chart", V);
  }
  function Ne() {
    const x = U.current, V = Math.ceil((G || 0) / (Q || 1)) + 1, z = Math.floor((x && x.scrollTop || 0) / (Q || 1)), ee = Math.max(0, z - M), ye = z + V + M, oe = ee * (Q || 0);
    a.exec("render-data", {
      start: ee,
      end: ye,
      from: oe
    });
  }
  le(() => {
    Ne();
  }, [G, N]);
  const Ee = I(
    (x) => {
      if (!x) return;
      const { id: A, mode: V } = x;
      if (V.toString().indexOf("x") < 0) return;
      const z = U.current;
      if (!z) return;
      const { clientWidth: ee } = z, ye = a.getTask(A);
      if (ye.$x + ye.$w < z.scrollLeft)
        a.exec("scroll-chart", { left: ye.$x - (R || 0) }), z.scrollLeft = ye.$x - (R || 0);
      else if (ye.$x >= ee + z.scrollLeft) {
        const oe = ee < ye.$w ? R || 0 : ye.$w;
        a.exec("scroll-chart", { left: ye.$x - ee + oe }), z.scrollLeft = ye.$x - ee + oe;
      }
    },
    [a, R]
  );
  le(() => {
    Ee(ie);
  }, [ie]);
  function De(x) {
    if (J && (x.ctrlKey || x.metaKey)) {
      x.preventDefault();
      const A = U.current, V = x.clientX - (A ? A.getBoundingClientRect().left : 0);
      if (W.current += x.deltaY, Math.abs(W.current) >= 150) {
        const ee = -Math.sign(W.current);
        W.current = 0, a.exec("zoom-scale", {
          dir: ee,
          offset: V
        });
      }
    }
  }
  const Re = I((x) => {
    const A = k(x.date, x.unit);
    return A ? {
      css: A,
      width: x.width
    } : null;
  }, [k]), $e = v(() => {
    if (!H || !k || !["hour", "day", "week"].includes(H.minUnit)) return null;
    let A = 0;
    return H.rows[H.rows.length - 1].cells.map((V) => {
      const z = Re(V), ee = A;
      return A += V.width, z ? { ...z, left: ee } : null;
    });
  }, [H, k, Re]), Le = I(
    (x) => {
      x.eventSource = "chart", a.exec("hotkey", x);
    },
    [a]
  );
  le(() => {
    const x = U.current;
    if (!x) return;
    const A = () => be(x.clientHeight);
    A();
    const V = new ResizeObserver(() => A());
    return V.observe(x), () => {
      V.disconnect();
    };
  }, [U.current]);
  const Z = re(null);
  return le(() => {
    const x = U.current;
    if (x && !Z.current)
      return Z.current = zt(x, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (A) => Le(A)
      }), () => {
        Z.current?.destroy(), Z.current = null;
      };
  }, []), le(() => {
    const x = U.current;
    if (!x) return;
    const A = De;
    return x.addEventListener("wheel", A), () => {
      x.removeEventListener("wheel", A);
    };
  }, [De]), le(() => {
    if (!K || w.current || !H || !U.current || !G) return;
    const x = U.current, { clientWidth: A } = x, V = /* @__PURE__ */ new Date(), z = H.rows[H.rows.length - 1]?.cells;
    if (!z) return;
    let ee = -1, ye = 0;
    const oe = [];
    for (let B = 0; B < z.length; B++) {
      const he = z[B];
      oe.push({ left: ye, width: he.width });
      const f = he.date;
      if (he.unit === "week") {
        const te = new Date(f);
        te.setUTCDate(te.getUTCDate() + 7), V >= f && V < te && (ee = B);
      } else he.unit === "day" && V.getUTCFullYear() === f.getUTCFullYear() && V.getUTCMonth() === f.getUTCMonth() && V.getUTCDate() === f.getUTCDate() && (ee = B);
      ye += he.width;
    }
    let $ = ee;
    if (ee > 0 && ($ = ee - 1), $ >= 0 && oe[$]) {
      const B = oe[$], he = Math.max(0, B.left);
      x.scrollLeft = he, a.exec("scroll-chart", { left: he }), w.current = !0;
    }
  }, [K, H, G, a]), Un("chart"), /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: U,
      onScroll: ce,
      children: [
        /* @__PURE__ */ d(zn, { highlightTime: k, onScaleClick: h, scales: H }),
        b && b.length ? /* @__PURE__ */ d(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${de}px` },
            children: b.map((x, A) => /* @__PURE__ */ d(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${x.css || ""}`,
                style: { left: `${x.left}px` },
                children: /* @__PURE__ */ d("div", { className: "wx-mR7v2Xag wx-content", children: x.text })
              },
              A
            ))
          }
        ) : null,
        /* @__PURE__ */ Pe(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${s}px`, height: `${de}px` },
            children: [
              $e ? /* @__PURE__ */ d(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: $e.map(
                    (x, A) => x ? /* @__PURE__ */ d(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + x.css,
                        style: {
                          width: `${x.width}px`,
                          left: `${x.left}px`
                        }
                      },
                      A
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ d(Ln, { borders: _ }),
              C && C.length ? C.map(
                (x, A) => x.$y ? /* @__PURE__ */ d(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": x.id,
                    style: j[A]
                  },
                  x.id
                ) : null
              ) : null,
              /* @__PURE__ */ d(
                On,
                {
                  readonly: n,
                  taskTemplate: o,
                  multiTaskRows: r,
                  rowMapping: p,
                  marqueeSelect: y,
                  copyPaste: q,
                  allowTaskIntersection: P
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
    onDisplayChange: _,
    compactMode: k,
    containerWidth: h = 0,
    leftThreshold: r = 50,
    rightThreshold: p = 50
  } = t, [y, q] = ut(t.value ?? 0), [K, O] = ut(t.display ?? "all");
  function P(de) {
    let ce = 0;
    n == "center" ? ce = s / 2 : n == "before" && (ce = s);
    const pe = {
      size: [s + "px", "auto"],
      p: [de - ce + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (l != "x")
      for (let Ne in pe) pe[Ne] = pe[Ne].reverse();
    return pe;
  }
  const [a, C] = xe(!1), [ne, N] = xe(null), Q = re(0), R = re(), H = re(), b = re(K);
  le(() => {
    b.current = K;
  }, [K]), le(() => {
    ne === null && y > 0 && N(y);
  }, [ne, y]);
  function ie(de) {
    return l == "x" ? de.clientX : de.clientY;
  }
  const J = I(
    (de) => {
      const ce = R.current + ie(de) - Q.current;
      q(ce);
      let pe;
      ce <= r ? pe = "chart" : h - ce <= p ? pe = "grid" : pe = "all", b.current !== pe && (O(pe), b.current = pe), H.current && clearTimeout(H.current), H.current = setTimeout(() => o && o(ce), 100);
    },
    [h, r, p, o]
  ), ue = I(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", C(!1), window.removeEventListener("mousemove", J), window.removeEventListener("mouseup", ue);
  }, [J]), G = v(
    () => K !== "all" ? "auto" : l == "x" ? "ew-resize" : "ns-resize",
    [K, l]
  ), be = I(
    (de) => {
      !k && (K === "grid" || K === "chart") || (Q.current = ie(de), R.current = y, C(!0), document.body.style.cursor = G, document.body.style.userSelect = "none", window.addEventListener("mousemove", J), window.addEventListener("mouseup", ue));
    },
    [G, J, ue, y, k, K]
  );
  function U() {
    O("all"), ne !== null && (q(ne), o && o(ne));
  }
  function W(de) {
    if (k) {
      const ce = K === "chart" ? "grid" : "chart";
      O(ce), _(ce);
    } else if (K === "grid" || K === "chart")
      U(), _("all");
    else {
      const ce = de === "left" ? "chart" : "grid";
      O(ce), _(ce);
    }
  }
  function w() {
    W("left");
  }
  function M() {
    W("right");
  }
  const se = v(() => P(y), [y, n, s, l]), j = [
    "wx-resizer",
    `wx-resizer-${l}`,
    `wx-resizer-display-${K}`,
    a ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-pFykzMlT " + j,
      onMouseDown: be,
      style: { width: se.size[0], height: se.size[1], cursor: G },
      children: [
        /* @__PURE__ */ Pe("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ d(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: w
            }
          ) }),
          /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ d(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: M
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const Fn = 650;
function Gt(t) {
  let n;
  function s() {
    n = new ResizeObserver((o) => {
      for (let _ of o)
        if (_.target === document.body) {
          let k = _.contentRect.width <= Fn;
          t(k);
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
    onScaleClick: _,
    onTableAPIChange: k,
    multiTaskRows: h = !1,
    rowMapping: r = null,
    marqueeSelect: p = !1,
    copyPaste: y = !1,
    scrollToCurrentWeek: q = !1,
    currentWeekColor: K = null,
    allowTaskIntersection: O = !0
  } = t, P = ze(Xe), a = F(P, "_tasks"), C = F(P, "_scales"), ne = F(P, "cellHeight"), N = F(P, "columns"), Q = F(P, "_scrollTask"), R = F(P, "undo"), H = v(() => {
    if (!h) return r;
    const $ = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map();
    return a.forEach((he) => {
      const f = he.row ?? he.id;
      B.set(he.id, f), $.has(f) || $.set(f, []), $.get(f).push(he.id);
    }), { rowMap: $, taskRows: B };
  }, [a, h, r]), [b, ie] = xe(!1);
  let [J, ue] = xe(0);
  const [G, be] = xe(0), [U, W] = xe(0), [w, M] = xe(void 0), [se, j] = xe("all"), de = re(null), ce = I(
    ($) => {
      ie((B) => ($ !== B && ($ ? (de.current = se, se === "all" && j("grid")) : (!de.current || de.current === "all") && j("all")), $));
    },
    [se]
  );
  le(() => {
    const $ = Gt(ce);
    return $.observe(), () => {
      $.disconnect();
    };
  }, [ce]);
  const pe = v(() => {
    let $;
    return N.every((B) => B.width && !B.flexgrow) ? $ = N.reduce((B, he) => B + parseInt(he.width), 0) : b && se === "chart" ? $ = parseInt(N.find((B) => B.id === "action")?.width) || 50 : $ = 440, J = $, $;
  }, [N, b, se]);
  le(() => {
    ue(pe);
  }, [pe]);
  const Ne = v(
    () => (G ?? 0) - (w ?? 0),
    [G, w]
  ), Ee = v(() => C.width, [C]), De = v(() => {
    if (!h || !H)
      return a.length * ne;
    const $ = /* @__PURE__ */ new Set();
    return a.forEach((B) => {
      const he = H.taskRows.get(B.id) ?? B.id;
      $.add(he);
    }), $.size * ne;
  }, [a, ne, h, H]), Re = v(
    () => C.height + De + Ne,
    [C, De, Ne]
  ), $e = v(
    () => J + Ee,
    [J, Ee]
  ), Le = re(null), Z = I(() => {
    Promise.resolve().then(() => {
      if ((G ?? 0) > ($e ?? 0)) {
        const $ = (G ?? 0) - J;
        P.exec("expand-scale", { minWidth: $ });
      }
    });
  }, [G, $e, J, P]);
  le(() => {
    let $;
    return Le.current && ($ = new ResizeObserver(Z), $.observe(Le.current)), () => {
      $ && $.disconnect();
    };
  }, [Le.current, Z]), le(() => {
    Z();
  }, [Ee]);
  const x = re(null), A = re(null), V = I(() => {
    const $ = x.current;
    $ && P.exec("scroll-chart", {
      top: $.scrollTop
    });
  }, [P]), z = re({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  le(() => {
    z.current = {
      rTasks: a,
      rScales: C,
      rCellHeight: ne,
      scrollSize: Ne,
      ganttDiv: x.current,
      ganttHeight: U ?? 0
    };
  }, [a, C, ne, Ne, U]);
  const ee = I(
    ($) => {
      if (!$) return;
      const {
        rTasks: B,
        rScales: he,
        rCellHeight: f,
        scrollSize: te,
        ganttDiv: me,
        ganttHeight: Y
      } = z.current;
      if (!me) return;
      const { id: Ce } = $, Ie = B.findIndex((fe) => fe.id === Ce);
      if (Ie > -1) {
        const fe = Y - he.height, ve = Ie * f, we = me.scrollTop;
        let He = null;
        ve < we ? He = ve : ve + f > we + fe && (He = ve - fe + f + te), He !== null && (P.exec("scroll-chart", { top: Math.max(He, 0) }), x.current.scrollTop = Math.max(He, 0));
      }
    },
    [P]
  );
  le(() => {
    ee(Q);
  }, [Q]), le(() => {
    const $ = x.current, B = A.current;
    if (!$ || !B) return;
    const he = () => {
      Mn(() => {
        W($.offsetHeight), be($.offsetWidth), M(B.offsetWidth);
      });
    }, f = new ResizeObserver(he);
    return f.observe($), () => f.disconnect();
  }, [x.current]);
  const ye = re(null), oe = re(null);
  return le(() => {
    oe.current && (oe.current.destroy(), oe.current = null);
    const $ = ye.current;
    if ($)
      return oe.current = zt($, {
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
          "ctrl+z": R,
          "ctrl+y": R,
          "meta+z": R,
          "meta+shift+z": R
        },
        exec: (B) => {
          if (B.isInput) return;
          const he = B.key;
          if (he === "ctrl+z" || he === "meta+z") {
            P.exec("undo", {});
            return;
          }
          if (he === "ctrl+y" || he === "meta+shift+z") {
            P.exec("redo", {});
            return;
          }
          P.exec("hotkey", B);
        }
      }), () => {
        oe.current?.destroy(), oe.current = null;
      };
  }, [R]), /* @__PURE__ */ d("div", { className: "wx-jlbQoHOz wx-gantt", ref: x, onScroll: V, children: /* @__PURE__ */ d(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Re, width: "100%" },
      ref: A,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: U,
            width: w
          },
          children: /* @__PURE__ */ Pe("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ye, children: [
            N.length ? /* @__PURE__ */ Pe(Je, { children: [
              /* @__PURE__ */ d(
                Nn,
                {
                  display: se,
                  compactMode: b,
                  columnWidth: pe,
                  width: J,
                  readonly: s,
                  fullHeight: De,
                  onTableAPIChange: k,
                  multiTaskRows: h,
                  rowMapping: H
                }
              ),
              /* @__PURE__ */ d(
                Xn,
                {
                  value: J,
                  display: se,
                  compactMode: b,
                  containerWidth: G,
                  onMove: ($) => ue($),
                  onDisplayChange: ($) => j($)
                }
              )
            ] }) : null,
            /* @__PURE__ */ d("div", { className: "wx-jlbQoHOz wx-content", ref: Le, children: /* @__PURE__ */ d(
              Yn,
              {
                readonly: s,
                fullWidth: Ee,
                fullHeight: De,
                taskTemplate: n,
                cellBorders: l,
                highlightTime: o,
                onScaleClick: _,
                multiTaskRows: h,
                rowMapping: H,
                marqueeSelect: p,
                copyPaste: y,
                scrollToCurrentWeek: q,
                currentWeekColor: K,
                allowTaskIntersection: O
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
  selected: _ = [],
  activeTask: k = null,
  links: h = [],
  scales: r = Jn,
  columns: p = kn,
  start: y = null,
  end: q = null,
  lengthUnit: K = "day",
  durationUnit: O = "day",
  cellWidth: P = 100,
  cellHeight: a = 38,
  scaleHeight: C = 36,
  readonly: ne = !1,
  cellBorders: N = "full",
  zoom: Q = !1,
  baselines: R = !1,
  highlightTime: H = null,
  onScaleClick: b = null,
  init: ie = null,
  autoScale: J = !0,
  unscheduledTasks: ue = !1,
  criticalPath: G = null,
  schedule: be = { type: "forward" },
  projectStart: U = null,
  projectEnd: W = null,
  calendar: w = null,
  undo: M = !1,
  splitTasks: se = !1,
  multiTaskRows: j = !1,
  marqueeSelect: de = !1,
  copyPaste: ce = !1,
  currentWeekHighlight: pe = !1,
  currentWeekColor: Ne = null,
  scrollToCurrentWeek: Ee = !1,
  allowTaskIntersection: De = !0,
  ...Re
}, $e) {
  const Le = re();
  Le.current = Re;
  const Z = v(() => new xn(vn), []), x = v(() => ({ ...dt, ...lt }), []), A = ze(Ue.i18n), V = v(() => A ? A.extend(x, !0) : ot(x), [A, x]), z = v(() => V.getRaw().calendar, [V]), ee = v(() => {
    let fe = {
      zoom: Qn(Q, z),
      scales: Ut(r, z),
      columns: jn(p, z),
      links: pn(h),
      cellWidth: P
    };
    return fe.zoom && (fe = {
      ...fe,
      ...yn(
        fe.zoom,
        Bn(z, V.getGroup("gantt")),
        fe.scales,
        P
      )
    }), fe;
  }, [Q, r, p, h, P, z, V]), ye = re(null);
  ye.current !== o && (Mt(o, { durationUnit: O, splitTasks: se, calendar: w }), ye.current = o), le(() => {
    Mt(o, { durationUnit: O, splitTasks: se, calendar: w });
  }, [o, O, w, se]);
  const oe = v(() => {
    if (!j) return null;
    const fe = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Map(), we = (He) => {
      He.forEach((Ae) => {
        const i = Ae.row ?? Ae.id;
        ve.set(Ae.id, i), fe.has(i) || fe.set(i, []), fe.get(i).push(Ae.id), Ae.data && Ae.data.length > 0 && we(Ae.data);
      });
    };
    return we(o), { rowMap: fe, taskRows: ve };
  }, [o, j]), $ = v(() => Z.in, [Z]), B = re(null);
  B.current === null && (B.current = new hn((fe, ve) => {
    const we = "on" + Zn(fe);
    Le.current && Le.current[we] && Le.current[we](ve);
  }), $.setNext(B.current));
  const [he, f] = xe(null), te = re(null);
  te.current = he;
  const me = v(
    () => ({
      getState: Z.getState.bind(Z),
      getReactiveState: Z.getReactive.bind(Z),
      getStores: () => ({ data: Z }),
      exec: $.exec,
      setNext: (fe) => (B.current = B.current.setNext(fe), B.current),
      intercept: $.intercept.bind($),
      on: $.on.bind($),
      detach: $.detach.bind($),
      getTask: Z.getTask.bind(Z),
      serialize: Z.serialize.bind(Z),
      getTable: (fe) => fe ? new Promise((ve) => setTimeout(() => ve(te.current), 1)) : te.current,
      getHistory: () => Z.getHistory()
    }),
    [Z, $]
  );
  Ht(
    $e,
    () => ({
      ...me
    }),
    [me]
  );
  const Y = re(0);
  le(() => {
    Y.current ? Z.init({
      tasks: o,
      links: ee.links,
      start: y,
      columns: ee.columns,
      end: q,
      lengthUnit: K,
      cellWidth: ee.cellWidth,
      cellHeight: a,
      scaleHeight: C,
      scales: ee.scales,
      taskTypes: l,
      zoom: ee.zoom,
      selected: _,
      activeTask: k,
      baselines: R,
      autoScale: J,
      unscheduledTasks: ue,
      markers: s,
      durationUnit: O,
      criticalPath: G,
      schedule: be,
      projectStart: U,
      projectEnd: W,
      calendar: w,
      undo: M,
      _weekStart: z.weekStart,
      splitTasks: se
    }) : ie && ie(me), Y.current++;
  }, [
    me,
    ie,
    o,
    ee,
    y,
    q,
    K,
    a,
    C,
    l,
    _,
    k,
    R,
    J,
    ue,
    s,
    O,
    G,
    be,
    U,
    W,
    w,
    M,
    z,
    se,
    Z
  ]), Y.current === 0 && Z.init({
    tasks: o,
    links: ee.links,
    start: y,
    columns: ee.columns,
    end: q,
    lengthUnit: K,
    cellWidth: ee.cellWidth,
    cellHeight: a,
    scaleHeight: C,
    scales: ee.scales,
    taskTypes: l,
    zoom: ee.zoom,
    selected: _,
    activeTask: k,
    baselines: R,
    autoScale: J,
    unscheduledTasks: ue,
    markers: s,
    durationUnit: O,
    criticalPath: G,
    schedule: be,
    projectStart: U,
    projectEnd: W,
    calendar: w,
    undo: M,
    _weekStart: z.weekStart,
    splitTasks: se
  });
  const Ce = v(() => {
    const fe = /* @__PURE__ */ new Date(), ve = z?.weekStart ?? 0, we = new Date(Date.UTC(fe.getUTCFullYear(), fe.getUTCMonth(), fe.getUTCDate())), Ae = (we.getUTCDay() - ve + 7) % 7;
    we.setUTCDate(we.getUTCDate() - Ae), we.setUTCHours(0, 0, 0, 0);
    const i = new Date(we);
    return i.setUTCDate(i.getUTCDate() + 7), (m) => m >= we && m < i;
  }, [z]), Ie = v(() => (fe, ve) => {
    let we = [];
    if (w)
      ve == "day" && !w.getDayHours(fe) && we.push("wx-weekend"), ve == "hour" && !w.getDayHours(fe) && we.push("wx-weekend");
    else if (H) {
      const He = H(fe, ve);
      He && we.push(He);
    }
    return pe && (ve === "week" || ve === "day") && Ce(fe) && we.push("wx-current-week"), we.join(" ");
  }, [w, H, pe, Ce]);
  return /* @__PURE__ */ d(Ue.i18n.Provider, { value: V, children: /* @__PURE__ */ d(Xe.Provider, { value: me, children: /* @__PURE__ */ d(
    Kn,
    {
      taskTemplate: n,
      readonly: ne,
      cellBorders: N,
      highlightTime: Ie,
      onScaleClick: b,
      onTableAPIChange: f,
      multiTaskRows: j,
      rowMapping: oe,
      marqueeSelect: de,
      copyPaste: ce,
      scrollToCurrentWeek: Ee,
      currentWeekColor: Ne,
      allowTaskIntersection: De
    }
  ) }) });
});
function Cs({ api: t = null, items: n = [] }) {
  const s = ze(Ue.i18n), l = v(() => s || ot(lt), [s]), o = v(() => l.getGroup("gantt"), [l]), _ = Ye(t, "_selected"), k = Ye(t, "undo"), h = Ye(t, "history"), r = Ye(t, "splitTasks"), p = ["undo", "redo"], y = v(() => {
    const K = St({ undo: !0, splitTasks: !0 });
    return (n.length ? n : St({
      undo: k,
      splitTasks: r
    })).map((P) => {
      let a = { ...P, disabled: !1 };
      return a.handler = Ot(K, a.id) ? (C) => At(t, C.id, null, o) : a.handler, a.text && (a.text = o(a.text)), a.menuText && (a.menuText = o(a.menuText)), a;
    });
  }, [n, t, o, k, r]), q = v(() => {
    const K = [];
    return y.forEach((O) => {
      const P = O.id;
      if (P === "add-task")
        K.push(O);
      else if (p.includes(P))
        p.includes(P) && K.push({
          ...O,
          disabled: O.isDisabled(h)
        });
      else {
        if (!_?.length || !t) return;
        K.push({
          ...O,
          disabled: O.isDisabled && _.some((a) => O.isDisabled(a, t.getState()))
        });
      }
    }), K.filter((O, P) => {
      if (t && O.isHidden)
        return !_.some((a) => O.isHidden(a, t.getState()));
      if (O.comp === "separator") {
        const a = K[P + 1];
        if (!a || a.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, _, h, y]);
  return s ? /* @__PURE__ */ d(Rt, { items: q }) : /* @__PURE__ */ d(Ue.i18n.Provider, { value: l, children: /* @__PURE__ */ d(Rt, { items: q }) });
}
const $s = Pt(function({
  options: n = [],
  api: s = null,
  resolver: l = null,
  filter: o = null,
  at: _ = "point",
  children: k,
  onClick: h,
  css: r
}, p) {
  const y = re(null), q = re(null), K = ze(Ue.i18n), O = v(() => K || ot({ ...lt, ...dt }), [K]), P = v(() => O.getGroup("gantt"), [O]), a = Ye(s, "taskTypes"), C = Ye(s, "selected"), ne = Ye(s, "_selected"), N = Ye(s, "splitTasks"), Q = v(() => Dt({ splitTasks: !0 }), []);
  le(() => {
    s && (s.on("scroll-chart", () => {
      y.current && y.current.show && y.current.show();
    }), s.on("drag-task", () => {
      y.current && y.current.show && y.current.show();
    }));
  }, [s]);
  function R(W) {
    return W.map((w) => (w = { ...w }, w.text && (w.text = P(w.text)), w.subtext && (w.subtext = P(w.subtext)), w.data && (w.data = R(w.data)), w));
  }
  function H() {
    const W = n.length ? n : Dt({ splitTasks: N }), w = W.find((M) => M.id === "convert-task");
    return w && (w.data = [], (a || []).forEach((M) => {
      w.data.push(w.dataFactory(M));
    })), R(W);
  }
  const b = v(() => H(), [s, n, a, N, P]), ie = v(
    () => ne && ne.length ? ne : [],
    [ne]
  ), J = I(
    (W, w) => {
      let M = W ? s?.getTask(W) : null;
      if (l) {
        const se = l(W, w);
        M = se === !0 ? M : se;
      }
      if (M) {
        const se = qe(w.target, "data-segment");
        se !== null ? q.current = { id: M.id, segmentIndex: se } : q.current = M.id, (!Array.isArray(C) || !C.includes(M.id)) && s && s.exec && s.exec("select-task", { id: M.id });
      }
      return M;
    },
    [s, l, C]
  ), ue = I(
    (W) => {
      const w = W.action;
      w && (Ot(Q, w.id) && At(s, w.id, q.current, P), h && h(W));
    },
    [s, P, h, Q]
  ), G = I(
    (W, w) => {
      const M = ie.length ? ie : w ? [w] : [];
      let se = o ? M.every((j) => o(W, j)) : !0;
      if (se && (W.isHidden && (se = !M.some(
        (j) => W.isHidden(j, s.getState(), q.current)
      )), W.isDisabled)) {
        const j = M.some(
          (de) => W.isDisabled(de, s.getState(), q.current)
        );
        W.disabled = j;
      }
      return se;
    },
    [o, ie, s]
  );
  Ht(p, () => ({
    show: (W, w) => {
      y.current && y.current.show && y.current.show(W, w);
    }
  }));
  const be = I((W) => {
    y.current && y.current.show && y.current.show(W);
  }, []), U = /* @__PURE__ */ Pe(Je, { children: [
    /* @__PURE__ */ d(
      Sn,
      {
        filter: G,
        options: b,
        dataKey: "id",
        resolver: J,
        onClick: ue,
        at: _,
        ref: y,
        css: r
      }
    ),
    /* @__PURE__ */ d("span", { onContextMenu: be, "data-menu-ignore": "true", children: typeof k == "function" ? k() : k })
  ] });
  if (!K && Ue.i18n?.Provider) {
    const W = Ue.i18n.Provider;
    return /* @__PURE__ */ d(W, { value: O, children: U });
  }
  return U;
});
function es({ api: t, autoSave: n, onLinksChange: s }) {
  const o = ze(Ue.i18n).getGroup("gantt"), _ = F(t, "activeTask"), k = F(t, "_activeTask"), h = F(t, "_links"), r = F(t, "schedule"), p = F(t, "unscheduledTasks"), [y, q] = xe();
  function K() {
    if (_) {
      const C = h.filter((N) => N.target == _).map((N) => ({ link: N, task: t.getTask(N.source) })), ne = h.filter((N) => N.source == _).map((N) => ({ link: N, task: t.getTask(N.target) }));
      return [
        { title: o("Predecessors"), data: C },
        { title: o("Successors"), data: ne }
      ];
    }
  }
  le(() => {
    q(K());
  }, [_, h]);
  const O = v(
    () => [
      { id: "e2s", label: o("End-to-start") },
      { id: "s2s", label: o("Start-to-start") },
      { id: "e2e", label: o("End-to-end") },
      { id: "s2e", label: o("Start-to-end") }
    ],
    [o]
  );
  function P(C) {
    n ? t.exec("delete-link", { id: C }) : (q(
      (ne) => (ne || []).map((N) => ({
        ...N,
        data: N.data.filter((Q) => Q.link.id !== C)
      }))
    ), s && s({
      id: C,
      action: "delete-link",
      data: { id: C }
    }));
  }
  function a(C, ne) {
    n ? t.exec("update-link", {
      id: C,
      link: ne
    }) : (q(
      (N) => (N || []).map((Q) => ({
        ...Q,
        data: Q.data.map(
          (R) => R.link.id === C ? { ...R, link: { ...R.link, ...ne } } : R
        )
      }))
    ), s && s({
      id: C,
      action: "update-link",
      data: {
        id: C,
        link: ne
      }
    }));
  }
  return /* @__PURE__ */ d(Je, { children: (y || []).map(
    (C, ne) => C.data.length ? /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ d(tn, { label: C.title, position: "top", children: /* @__PURE__ */ d("table", { children: /* @__PURE__ */ d("tbody", { children: C.data.map((N) => /* @__PURE__ */ Pe("tr", { children: [
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-task-name", children: N.task.text || "" }) }),
      r?.auto && N.link.type === "e2s" ? /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ d(
        nn,
        {
          type: "number",
          placeholder: o("Lag"),
          value: N.link.lag,
          disabled: p && k?.unscheduled,
          onChange: (Q) => {
            Q.input || a(N.link.id, { lag: Q.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ d(
        sn,
        {
          value: N.link.type,
          placeholder: o("Select link type"),
          options: O,
          onChange: (Q) => a(N.link.id, { type: Q.value }),
          children: ({ option: Q }) => Q.label
        }
      ) }) }),
      /* @__PURE__ */ d("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ d(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => P(N.link.id),
          role: "button"
        }
      ) })
    ] }, N.link.id)) }) }) }) }, ne) : null
  ) });
}
function ts(t) {
  const { value: n, time: s, format: l, onchange: o, onChange: _, ...k } = t, h = _ ?? o;
  function r(p) {
    const y = new Date(p.value);
    y.setUTCHours(n.getUTCHours()), y.setUTCMinutes(n.getUTCMinutes()), h && h({ value: y });
  }
  return /* @__PURE__ */ Pe("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ d(
      rn,
      {
        ...k,
        value: n,
        onChange: r,
        format: l,
        buttons: ["today"],
        clear: !1
      }
    ),
    s ? /* @__PURE__ */ d(on, { value: n, onChange: h, format: l }) : null
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
  placement: _ = "sidebar",
  bottomBar: k = !0,
  topBar: h = !0,
  autoSave: r = !0,
  focus: p = !1,
  hotkeys: y = {}
}) {
  const q = ze(Ue.i18n), K = v(() => q || ot({ ...lt, ...dt }), [q]), O = v(() => K.getGroup("gantt"), [K]), P = K.getRaw(), a = v(() => {
    const f = P.gantt?.dateFormat || P.formats?.dateFormat;
    return rt(f, P.calendar);
  }, [P]), C = v(() => {
    if (h === !0 && !o) {
      const f = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: O("Delete"),
          id: "delete"
        }
      ];
      return r ? { items: f } : {
        items: [
          ...f,
          {
            comp: "button",
            type: "primary",
            text: O("Save"),
            id: "save"
          }
        ]
      };
    }
    return h;
  }, [h, o, r, O]), [ne, N] = xe(!1), Q = v(
    () => ne ? "wx-full-screen" : "",
    [ne]
  ), R = I((f) => {
    N(f);
  }, []);
  le(() => {
    const f = Gt(R);
    return f.observe(), () => {
      f.disconnect();
    };
  }, [R]);
  const H = F(t, "_activeTask"), b = F(t, "activeTask"), ie = F(t, "unscheduledTasks"), J = F(t, "links"), ue = F(t, "splitTasks"), G = v(
    () => ue && b?.segmentIndex,
    [ue, b]
  ), be = v(
    () => G || G === 0,
    [G]
  ), U = v(
    () => Tn({ unscheduledTasks: ie }),
    [ie]
  ), W = F(t, "undo"), [w, M] = xe({}), [se, j] = xe(null), [de, ce] = xe(), [pe, Ne] = xe(null), Ee = F(t, "taskTypes"), De = v(() => {
    if (!H) return null;
    let f;
    if (be && H.segments ? f = { ...H.segments[G] } : f = { ...H }, o) {
      let te = { parent: f.parent };
      return U.forEach(({ key: me, comp: Y }) => {
        if (Y !== "links") {
          const Ce = f[me];
          Y === "date" && Ce instanceof Date ? te[me] = a(Ce) : Y === "slider" && me === "progress" ? te[me] = `${Ce}%` : te[me] = Ce;
        }
      }), te;
    }
    return f || null;
  }, [H, be, G, o, U, a]);
  le(() => {
    ce(De);
  }, [De]), le(() => {
    M({}), Ne(null), j(null);
  }, [b]);
  function Re(f, te) {
    return f.map((me) => {
      const Y = { ...me };
      if (me.config && (Y.config = { ...Y.config }), Y.comp === "links" && t && (Y.api = t, Y.autoSave = r, Y.onLinksChange = Z), Y.comp === "select" && Y.key === "type") {
        const Ce = Y.options ?? (Ee || []);
        Y.options = Ce.map((Ie) => ({
          ...Ie,
          label: O(Ie.label)
        }));
      }
      return Y.comp === "slider" && Y.key === "progress" && (Y.labelTemplate = (Ce) => `${O(Y.label)} ${Ce}%`), Y.label && (Y.label = O(Y.label)), Y.config?.placeholder && (Y.config.placeholder = O(Y.config.placeholder)), te && (Y.isDisabled && Y.isDisabled(te, t.getState()) ? Y.disabled = !0 : delete Y.disabled), Y;
    });
  }
  const $e = v(() => {
    let f = n.length ? n : U;
    return f = Re(f, de), de ? f.filter(
      (te) => !te.isHidden || !te.isHidden(de, t.getState())
    ) : f;
  }, [n, U, de, Ee, O, t, r]), Le = v(
    () => $e.map((f) => f.key),
    [$e]
  );
  function Z({ id: f, action: te, data: me }) {
    M((Y) => ({
      ...Y,
      [f]: { action: te, data: me }
    }));
  }
  const x = I(() => {
    for (let f in w)
      if (J.byId(f)) {
        const { action: te, data: me } = w[f];
        t.exec(te, me);
      }
  }, [t, w, J]), A = I(() => {
    const f = b?.id || b;
    if (be) {
      if (H?.segments) {
        const te = H.segments.filter(
          (me, Y) => Y !== G
        );
        t.exec("update-task", {
          id: f,
          task: { segments: te }
        });
      }
    } else
      t.exec("delete-task", { id: f });
  }, [t, b, be, H, G]), V = I(() => {
    t.exec("show-editor", { id: null });
  }, [t]), z = I(
    (f) => {
      const { item: te, changes: me } = f;
      te.id === "delete" && A(), te.id === "save" && (me.length ? V() : x()), te.comp && V();
    },
    [t, b, r, x, A, V]
  ), ee = I(
    (f, te, me) => (ie && f.type === "summary" && (f.unscheduled = !1), Wt(f, t.getState(), te), me || j(!1), f),
    [ie, t]
  ), ye = I(
    (f) => {
      f = {
        ...f,
        unscheduled: ie && f.unscheduled && f.type !== "summary"
      }, delete f.links, delete f.data, (Le.indexOf("duration") === -1 || f.segments && !f.duration) && delete f.duration;
      const te = {
        id: b?.id || b,
        task: f,
        ...be && { segmentIndex: G }
      };
      r && se && (te.inProgress = se), t.exec("update-task", te), r || x();
    },
    [
      t,
      b,
      ie,
      r,
      x,
      Le,
      be,
      G,
      se
    ]
  ), oe = I(
    (f) => {
      let { update: te, key: me, input: Y } = f;
      if (Y && j(!0), f.update = ee({ ...te }, me, Y), !r) ce(f.update);
      else if (!pe && !Y) {
        const Ce = $e.find((ve) => ve.key === me), Ie = te[me];
        (!Ce.validation || Ce.validation(Ie)) && (!Ce.required || Ie) && ye(f.update);
      }
    },
    [r, ee, pe, $e, ye]
  ), $ = I(
    (f) => {
      r || ye(f.values);
    },
    [r, ye]
  ), B = I((f) => {
    Ne(f.errors);
  }, []), he = v(
    () => W ? {
      "ctrl+z": (f) => {
        f.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (f) => {
        f.preventDefault(), t.exec("redo");
      }
    } : {},
    [W, t]
  );
  return De ? /* @__PURE__ */ d(ln, { children: /* @__PURE__ */ d(
    Dn,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${Q} ${s}`,
      items: $e,
      values: De,
      topBar: C,
      bottomBar: k,
      placement: _,
      layout: l,
      readonly: o,
      autoSave: r,
      focus: p,
      onAction: z,
      onSave: $,
      onValidation: B,
      onChange: oe,
      hotkeys: y && { ...he, ...y }
    }
  ) }) : null;
}
const Ss = ({ children: t, columns: n = null, api: s }) => {
  const [l, o] = xe(null);
  return le(() => {
    s && s.getTable(!0).then(o);
  }, [s]), /* @__PURE__ */ d($n, { api: l, columns: n, children: t });
};
function Ds(t) {
  const { api: n, content: s, children: l } = t, o = re(null), _ = re(null), [k, h] = xe({}), [r, p] = xe(null), [y, q] = xe({});
  function K(R) {
    for (; R; ) {
      if (R.getAttribute) {
        const H = R.getAttribute("data-tooltip-id"), b = R.getAttribute("data-tooltip-at"), ie = R.getAttribute("data-tooltip");
        if (H || ie) return { id: H, tooltip: ie, target: R, at: b };
      }
      R = R.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  le(() => {
    const R = _.current;
    if (R && y && (y.text || s)) {
      const H = R.getBoundingClientRect();
      let b = !1, ie = y.left, J = y.top;
      H.right >= k.right && (ie = k.width - H.width - 5, b = !0), H.bottom >= k.bottom && (J = y.top - (H.bottom - k.bottom + 2), b = !0), b && q((ue) => ue && { ...ue, left: ie, top: J });
    }
  }, [y, k, s]);
  const O = re(null), P = 300, a = (R) => {
    clearTimeout(O.current), O.current = setTimeout(() => {
      R();
    }, P);
  };
  function C(R) {
    let { id: H, tooltip: b, target: ie, at: J } = K(R.target);
    if (q(null), p(null), !b)
      if (H)
        b = N(H);
      else {
        clearTimeout(O.current);
        return;
      }
    const ue = R.clientX;
    a(() => {
      H && p(ne(Q(H)));
      const G = ie.getBoundingClientRect(), be = o.current, U = be ? be.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let W, w;
      J === "left" ? (W = G.top + 5 - U.top, w = G.right + 5 - U.left) : (W = G.top + G.height - U.top, w = ue - U.left), h(U), q({ top: W, left: w, text: b });
    });
  }
  function ne(R) {
    return n?.getTask(Q(R)) || null;
  }
  function N(R) {
    return ne(R)?.text || "";
  }
  function Q(R) {
    const H = parseInt(R);
    return isNaN(H) ? R : H;
  }
  return /* @__PURE__ */ Pe(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: o,
      onMouseMove: C,
      children: [
        y && (y.text || s) ? /* @__PURE__ */ d(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: _,
            style: { top: `${y.top}px`, left: `${y.left}px` },
            children: s ? /* @__PURE__ */ d(s, { data: r }) : y.text ? /* @__PURE__ */ d("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: y.text }) : null
          }
        ) : null,
        l
      ]
    }
  );
}
function Rs({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(vt, { fonts: t, children: n() }) : /* @__PURE__ */ d(vt, { fonts: t });
}
function Es({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d(Ct, { fonts: t, children: n }) : /* @__PURE__ */ d(Ct, { fonts: t });
}
function Is({ fonts: t = !0, children: n }) {
  return n ? /* @__PURE__ */ d($t, { fonts: t, children: n }) : /* @__PURE__ */ d($t, { fonts: t });
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
