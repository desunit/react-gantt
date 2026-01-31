import { jsx as p, jsxs as Z, Fragment as Re } from "react/jsx-runtime";
import jo, { useState as j, useEffect as G, useRef as U, useContext as Ce, useMemo as $, createContext as Wt, useCallback as E, forwardRef as _t, useImperativeHandle as Tt, useId as qo, Fragment as Ds } from "react";
import { createPortal as Xo, flushSync as Qo } from "react-dom";
function Be(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function er(t, e = "data-id") {
  const n = Be(t, e);
  return n ? n.getAttribute(e) : null;
}
function bt(t, e = "data-id") {
  const n = Be(t, e);
  return n ? zt(n.getAttribute(e)) : null;
}
function zt(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Jo() {
  return {
    detect: () => !0,
    addEvent: function(t, e, n) {
      return t.addEventListener(e, n), () => t.removeEventListener(e, n);
    },
    addGlobalEvent: function(t, e) {
      return document.addEventListener(t, e), () => document.removeEventListener(t, e);
    },
    getTopNode: function() {
      return window.document.body;
    }
  };
}
var Qe = Jo();
function pr(t) {
  Object.assign(Qe, t);
}
function Hr(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const i = zt(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let a, l = s.target;
    for (; l != o; ) {
      if (a = l.dataset ? l.dataset.action : null, a && e[a]) {
        e[a](i, s);
        return;
      }
      l = l.parentNode;
    }
    e[n] && e[n](i, s);
  }
  Qe.addEvent(t, n, r);
}
function Ms(t, e) {
  Hr(t, e, "click"), e.dblclick && Hr(t, e.dblclick, "dblclick");
}
function Zo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Es = /* @__PURE__ */ new Date(), Sn = !1, hn = [], St = [], Lr = (t) => {
  if (Sn) {
    Sn = !1;
    return;
  }
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = St[e];
    if (!(r > Es) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, ei = (t) => {
  Es = /* @__PURE__ */ new Date(), Sn = !0;
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n } = St[e];
    if (!n.contains(t.target) && n !== t.target) {
      Sn = !1;
      break;
    }
  }
};
function rn(t, e) {
  hn.length || (hn = [
    Qe.addGlobalEvent("click", Lr, t),
    Qe.addGlobalEvent("contextmenu", Lr, t),
    Qe.addGlobalEvent("mousedown", ei, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return St.push(n), {
    destroy() {
      Zo(St, n), St.length || (hn.forEach((r) => r()), hn = []);
    }
  };
}
var gn = (t) => t.indexOf("bottom") !== -1, pn = (t) => t.indexOf("left") !== -1, mn = (t) => t.indexOf("right") !== -1, Fn = (t) => t.indexOf("top") !== -1, Or = (t) => t.indexOf("fit") !== -1, wn = (t) => t.indexOf("overlap") !== -1, ti = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), ni = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function ri(t, e) {
  let n = 0;
  const r = Qe.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ke, qe, jt, Ge;
function si(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ke = r, qe = s, jt = "auto";
  let o = 0, i = 0;
  const a = oi(t), l = wn(n) ? Qe.getTopNode(t) : a;
  if (!a) return null;
  const c = a.getBoundingClientRect(), d = t.getBoundingClientRect(), u = l.getBoundingClientRect(), h = window.getComputedStyle(l), g = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
  for (const b in g) {
    const k = `border-${b}-width`;
    g[b] = parseFloat(h.getPropertyValue(k));
  }
  if (e) {
    const b = ri(e, a);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (Ge = e.getBoundingClientRect(), Or(n) && (jt = Ge.width + "px"), n !== "point")
      if (ti(n))
        Or(n) ? Ke = 0 : (Ke = u.width / 2, i = 1), qe = (u.height - d.height) / 2;
      else {
        const b = wn(n) ? 0 : 1;
        Ke = mn(n) ? Ge.right + b : Ge.left - b, qe = gn(n) ? Ge.bottom + 1 : Ge.top;
        const k = ni(n);
        k && (mn(n) || pn(n) ? k === "center" ? qe -= (d.height - Ge.height) / 2 : k === "end" && (qe -= d.height - Ge.height) : (gn(n) || Fn(n)) && (k === "center" ? Ke -= (d.width - Ge.width) / 2 : k === "end" && (Ke -= d.width - Ge.width), wn(n) || (Ke += 1)));
      }
  } else Ge = { left: r, right: r, top: s, bottom: s };
  const m = (pn(n) || mn(n)) && (gn(n) || Fn(n));
  pn(n) && (i = 2);
  const f = Ke - d.width - u.left;
  e && pn(n) && !m && f < 0 && (Ke = Ge.right, i = 0);
  const w = Ke + d.width * (1 - i / 2) - u.right;
  if (w > 0)
    if (!mn(n))
      Ke = u.right - g.right - d.width;
    else {
      const b = Ge.left - u.x - d.width;
      e && !wn(n) && !m && b >= 0 ? Ke = Ge.left - d.width : Ke -= w + g.right;
    }
  i && (Ke = Math.round(Ke - d.width * i / 2));
  const x = f < 0 || w > 0 || !m;
  Fn(n) && (qe = Ge.top - d.height, e && qe < u.y && x && (qe = Ge.bottom));
  const y = qe + d.height - u.bottom;
  return y > 0 && (e && gn(n) && x ? qe -= d.height + Ge.height + 1 : qe -= y + g.bottom), Ke -= c.left + g.left, qe -= c.top + g.top, Ke = Math.max(Ke, 0) + l.scrollLeft, qe = Math.max(qe, 0) + l.scrollTop, jt = jt || "auto", { x: Ke, y: qe, z: o, width: jt };
}
function oi(t) {
  const e = Qe.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Pr = (/* @__PURE__ */ new Date()).valueOf();
function mr() {
  return Pr += 1, Pr;
}
var ii = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  configure(t, e) {
    this.node = e;
    for (const n in t)
      if (t[n]) {
        const r = n.toLowerCase().replace(/[ ]/g, ""), s = t[n];
        this.store.set(r, s);
      }
  }
}, Ht = [], Wr = {
  subscribe: (t) => {
    ai();
    const e = new ii();
    return Ht.push(e), t(e), () => {
      const n = Ht.findIndex((r) => r === e);
      n >= 0 && Ht.splice(n, 1);
    };
  }
}, zr = !1;
function ai() {
  zr || (zr = !0, document.addEventListener("keydown", (t) => {
    if (Ht.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Ht.length - 1; s >= 0; s--) {
        const o = Ht[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
function Xe(t) {
  return t < 10 ? "0" + t : t.toString();
}
function li(t) {
  const e = Xe(t);
  return e.length == 2 ? "0" + e : e;
}
function Is(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function Fr(t, e = 1) {
  let n = t.getDay();
  n === 0 && (n = 7), n = (n - e + 7) % 7;
  const r = new Date(t.valueOf());
  r.setDate(t.getDate() + (3 - n));
  const s = r.getFullYear(), o = Math.floor(
    (r.getTime() - new Date(s, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(o / 7);
}
var Ur = ["", ""];
function ci(t, e, n) {
  switch (t) {
    case "%d":
      return Xe(e.getDate());
    case "%m":
      return Xe(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Xe(e.getFullYear() % 100);
    case "%Y":
      return e.getFullYear();
    case "%D":
      return n.dayShort[e.getDay()];
    case "%l":
      return n.dayFull[e.getDay()];
    case "%M":
      return n.monthShort[e.getMonth()];
    case "%F":
      return n.monthFull[e.getMonth()];
    case "%h":
      return Xe((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Xe(e.getHours());
    case "%i":
      return Xe(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? n.pm : n.am) || Ur)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Ur)[1];
    case "%s":
      return Xe(e.getSeconds());
    case "%S":
      return li(e.getMilliseconds());
    case "%W":
      return Xe(Fr(e));
    case "%w":
      return Xe(Fr(e, n.weekStart ?? 1));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Xe(e.getMonth() + 1), r += "-" + Xe(e.getDate()), r += "T", r += Xe(e.getHours()), r += ":" + Xe(e.getMinutes()), r += ":" + Xe(e.getSeconds()), r;
    }
    case "%Q":
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return t;
  }
}
var di = /%[a-zA-Z]/g;
function dt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      di,
      (r) => ci(r, n, e)
    )) : "";
  };
}
function Yr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function tr(t, e) {
  for (const n in e) {
    const r = e[n];
    Yr(t[n]) && Yr(r) ? t[n] = tr(
      { ...t[n] },
      e[n]
    ) : t[n] = e[n];
  }
  return t;
}
function Nt(t) {
  return {
    getGroup(e) {
      const n = t[e];
      return (r) => n && n[r] || r;
    },
    getRaw() {
      return t;
    },
    extend(e, n) {
      if (!e) return this;
      let r;
      return n ? r = tr({ ...e }, t) : r = tr({ ...t }, e), Nt(r);
    }
  };
}
function Ue(t) {
  const [e, n] = j(t), r = U(t);
  return G(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ui(t, e, n) {
  const [r, s] = j(() => e);
  return t || console.warn(`Writable ${n} is not defined`), G(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function ie(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ui(r[e], n[e], e);
}
function ct(t, e) {
  const [n, r] = j(() => null);
  return G(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function fi(t, e) {
  const n = U(e);
  n.current = e;
  const [r, s] = j(1);
  return G(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function Jt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return fi(r[e], n[e]);
}
function hi(t, e) {
  G(() => {
    const n = e.current;
    if (n)
      return Wr.subscribe((r) => {
        r.configure(t, n);
      });
  }, [Wr, e]);
}
function wr(t, e) {
  return typeof t == "function" ? typeof e == "object" ? t(e) : t() : t;
}
function Rs(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, a) => a.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function As(t) {
  let e = t, n = [];
  return {
    subscribe: (a) => {
      n.push(a), a(e);
    },
    unsubscribe: (a) => {
      n = n.filter((l) => l !== a);
    },
    set: (a) => {
      e = a, n.forEach((l) => l(e));
    },
    update: (a) => {
      e = a(e), n.forEach((l) => l(e));
    }
  };
}
function Vr(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const i = zt(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let a, l = s.target;
    for (; l != o; ) {
      if (a = l.dataset ? l.dataset.action : null, a && e[a]) {
        e[a](i, s);
        return;
      }
      l = l.parentNode;
    }
    e[n] && e[n](i, s);
  }
  return Qe.addEvent(t, n, r);
}
function gi(t, e) {
  const n = [Vr(t, e, "click")];
  return e.dblclick && n.push(Vr(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const pi = "en-US", mi = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 0,
  clockFormat: 24
}, wi = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, xi = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, Hs = {
  core: wi,
  calendar: mi,
  formats: xi,
  lang: pi
}, sn = Wt("willow"), yi = Wt({}), et = Wt(null), xr = Wt(null), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: xr,
  helpers: yi,
  i18n: et,
  theme: sn
}, Symbol.toStringTag, { value: "Module" }));
function Ft(t) {
  const e = Ce(xr);
  return t || e;
}
function vi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a
}) {
  const l = Ft(e), [c, d] = Ue(t), u = E(
    (m) => {
      const f = m.target.value;
      d(f), a && a({ value: f, input: !0 });
    },
    [a]
  ), h = E(
    (m) => {
      const f = m.target.value;
      d(f), a && a({ value: f });
    },
    [a]
  ), g = U(null);
  return G(() => {
    const m = h, f = g.current;
    return f.addEventListener("change", m), () => {
      f && f.removeEventListener("change", m);
    };
  }, [h]), /* @__PURE__ */ p(
    "textarea",
    {
      className: `wx-3yFVAC wx-textarea ${o ? "wx-error" : ""}`,
      id: l,
      disabled: s,
      placeholder: n,
      readOnly: i,
      title: r,
      value: c,
      onInput: u,
      ref: g
    }
  );
}
function ut({
  type: t = "",
  css: e = "",
  icon: n = "",
  disabled: r = !1,
  title: s = "",
  text: o = "",
  children: i,
  onClick: a
}) {
  const l = $(() => {
    let d = t ? t.split(" ").filter((u) => u !== "").map((u) => "wx-" + u).join(" ") : "";
    return e + (e ? " " : "") + d;
  }, [t, e]), c = (d) => {
    a && a(d);
  };
  return /* @__PURE__ */ Z(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${l} ${n && !i ? "wx-icon" : ""}`,
      disabled: r,
      onClick: c,
      children: [
        n && /* @__PURE__ */ p("i", { className: "wx-2ZWgb4 " + n }),
        i || o || " "
      ]
    }
  );
}
function ki({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const i = qo(), a = Ft(t) || i, [l, c] = Ue(r);
  return /* @__PURE__ */ Z("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ p(
      "input",
      {
        type: "checkbox",
        id: a,
        disabled: o,
        className: "wx-2IvefP wx-check",
        checked: l,
        value: n,
        onChange: ({ target: d }) => {
          const u = d.checked;
          c(u), s && s({ value: u, inputValue: n });
        }
      }
    ),
    /* @__PURE__ */ Z("label", { htmlFor: a, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Ut({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const i = U(null), [a, l] = Ue(t), [c, d] = Ue(e);
  return G(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), g = Qe.getTopNode(u).getBoundingClientRect();
        h.right >= g.right && d("end"), h.bottom >= g.bottom && l("top");
      }
    }
  }, [n]), G(() => {
    if (i.current) {
      const u = (h) => {
        r && r(h);
      };
      return rn(i.current, u).destroy;
    }
  }, [r]), /* @__PURE__ */ p(
    "div",
    {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${a}-${c}`,
      style: { width: s },
      children: o
    }
  );
}
function on() {
  return Nt(Hs);
}
function bi() {
  let t = null, e = !1, n, r, s, o;
  const i = (d, u, h, g) => {
    n = d, r = u, s = h, o = g;
  }, a = (d) => {
    t = d, e = t !== null, s(t);
  }, l = (d, u) => {
    if (d !== null && n) {
      const h = n.querySelectorAll(".wx-list > .wx-item")[d];
      h && (h.scrollIntoView({ block: "nearest" }), u && u.preventDefault());
    }
  }, c = (d, u) => {
    const h = d === null ? null : Math.max(0, Math.min(t + d, r.length - 1));
    h !== t && (a(h), n ? l(h, u) : requestAnimationFrame(() => l(h, u)));
  };
  return { move: (d) => {
    const u = bt(d), h = r.findIndex((g) => g.id == u);
    h !== t && a(h);
  }, keydown: (d, u) => {
    switch (d.code) {
      case "Enter":
        e ? o() : a(0);
        break;
      case "Space":
        e || a(0);
        break;
      case "Escape":
        s(t = null);
        break;
      case "Tab":
        s(t = null);
        break;
      case "ArrowDown":
        c(e ? 1 : u || 0, d);
        break;
      case "ArrowUp":
        c(e ? -1 : u || 0, d);
        break;
    }
  }, init: i, navigate: c };
}
function En({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = U(), o = U(bi()), [i, a] = j(null), l = U(i), c = (Ce(et) || on()).getGroup("core"), d = (h) => {
    h && h.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  G(() => {
    o.current.init(
      s.current,
      t,
      (h) => {
        a(h), l.current = h;
      },
      d
    );
  }, [t, s.current]), G(() => {
    r && r(o.current);
  }, []);
  const u = E(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null ? null : /* @__PURE__ */ p(Ut, { onCancel: u, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: d,
      onMouseMove: o.current.move,
      children: t.length ? t.map((h, g) => /* @__PURE__ */ p(
        "div",
        {
          className: `wx-233fr7 wx-item ${g === i ? "wx-focus" : ""}`,
          "data-id": h.id,
          children: e ? wr(e, { option: h }) : h.label
        },
        h.id
      )) : /* @__PURE__ */ p("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function Si({
  value: t = "",
  id: e,
  options: n = [],
  textOptions: r = null,
  textField: s = "label",
  placeholder: o = "",
  title: i = "",
  disabled: a = !1,
  error: l = !1,
  clear: c = !1,
  children: d,
  onChange: u
}) {
  const h = Ft(e), g = U(null), m = U(null), [f, w] = Ue(t), [x, y] = j(!1), [b, k] = j(""), T = U(null), S = U(!1), C = $(() => {
    if (x) return b;
    if (f || f === 0) {
      const re = (r || n).find((le) => le.id === f);
      if (re) return re[s];
    }
    return "";
  }, [x, b, f, r, n, s]), D = $(() => !C || !x ? n : n.filter(
    (re) => re[s].toLowerCase().includes(C.toLowerCase())
  ), [C, x, n, s]), Y = E(
    () => D.findIndex((re) => re.id === f),
    [D, f]
  ), _ = E((re) => {
    g.current = re.navigate, m.current = re.keydown;
  }, []), M = E(
    (re, le) => {
      if (re || re === 0) {
        let ye = n.find((W) => W.id === re);
        if (y(!1), le && g.current(null), ye && f !== ye.id) {
          const W = ye.id;
          w(W), u && u({ value: W });
        }
      }
      !S.current && le && T.current.focus();
    },
    [n, f, u]
  ), P = E(
    ({ id: re }) => {
      M(re, !0);
    },
    [M]
  ), H = E(
    (re) => {
      re && re.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), I = E(
    (re) => {
      if (!n.length) return;
      if (re === "" && c) {
        H();
        return;
      }
      let le = n.find((W) => W[s] === re);
      le || (le = n.find(
        (W) => W[s].toLowerCase().includes(re.toLowerCase())
      ));
      const ye = le ? le.id : f || n[0].id;
      M(ye, !1);
    },
    [n, s, c, f, M, H]
  ), L = E(() => {
    k(T.current.value), y(!0), D.length ? g.current(0) : g.current(null);
  }, [D.length, g]), ce = E(() => {
    S.current = !0;
  }, []), ue = E(() => {
    S.current = !1, setTimeout(() => {
      S.current || I(C);
    }, 200);
  }, [I, C]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => g.current(Y()),
      onKeyDown: (re) => m.current(re, Y()),
      title: i,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: h,
            ref: T,
            value: C,
            disabled: a,
            placeholder: o,
            onFocus: ce,
            onBlur: ue,
            onInput: L
          }
        ),
        c && !a && f ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !a && /* @__PURE__ */ p(En, { items: D, onReady: _, onSelect: P, children: ({ option: re }) => /* @__PURE__ */ p(Re, { children: d ? d({ option: re }) : re[s] }) })
      ]
    }
  );
}
function an({
  value: t = "",
  id: e,
  readonly: n = !1,
  focus: r = !1,
  select: s = !1,
  type: o = "text",
  placeholder: i = "",
  disabled: a = !1,
  error: l = !1,
  inputStyle: c = {},
  title: d = "",
  css: u = "",
  icon: h = "",
  clear: g = !1,
  onChange: m
}) {
  const f = Ft(e), [w, x] = Ue(t), y = U(null), b = $(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), k = $(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  G(() => {
    const Y = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(Y);
  }, [r, s]);
  const T = E(
    (Y) => {
      const _ = Y.target.value;
      x(_), m && m({ value: _, input: !0 });
    },
    [m]
  ), S = E(
    (Y) => m && m({ value: Y.target.value }),
    [m]
  );
  function C(Y) {
    Y.stopPropagation(), x(""), m && m({ value: "" });
  }
  let D = o;
  return o !== "password" && o !== "number" && (D = "text"), G(() => {
    const Y = S, _ = y.current;
    return _.addEventListener("change", Y), () => {
      _ && _.removeEventListener("change", Y);
    };
  }, [S]), /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${b} ${l ? "wx-error" : ""} ${a ? "wx-disabled" : ""} ${g ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: y,
            id: f,
            readOnly: n,
            disabled: a,
            placeholder: i,
            type: D,
            style: c,
            title: d,
            value: w,
            onInput: T
          }
        ),
        g && !a && w ? /* @__PURE__ */ Z(Re, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: C }),
          k && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function $i({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = Ce(et).getRaw(), i = t.getFullYear(), a = $(() => {
    switch (e) {
      case "month":
        return dt(o.monthYearFormat, s)(t);
      case "year":
        return dt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Is(i), u = dt(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, i, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ Z("div", { className: "wx-8HQVQV wx-header", children: [
    n !== "right" ? /* @__PURE__ */ p(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-left",
        onClick: () => r && r({ diff: -1, type: e })
      }
    ) : /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-spacer" }),
    /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-label", onClick: l, children: a }),
    n !== "left" ? /* @__PURE__ */ p(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-right",
        onClick: () => r && r({ diff: 1, type: e })
      }
    ) : /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-spacer" })
  ] });
}
function yr({ onClick: t, children: e }) {
  return /* @__PURE__ */ p("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function Ci({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (Ce(et) || on()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (k, T, S) => new Date(
    k.getFullYear(),
    k.getMonth() + (T || 0),
    k.getDate() + (S || 0)
  );
  let d = n !== "normal";
  function u(k) {
    const T = k.getDay();
    return T === 0 || T === 6;
  }
  function h() {
    const k = c(e, 0, 1 - e.getDate());
    return k.setDate(k.getDate() - (k.getDay() - (a - 7)) % 7), k;
  }
  function g() {
    const k = c(e, 1, -e.getDate());
    return k.setDate(k.getDate() + (6 - k.getDay() + a) % 7), k;
  }
  const m = U(0);
  function f(k, T) {
    T.timeStamp !== m.current && (m.current = T.timeStamp, T.stopPropagation(), o && o(new Date(new Date(k))), s && s());
  }
  const w = $(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = $(() => {
    const k = h(), T = g(), S = e.getMonth();
    let C = [];
    for (let D = k; D <= T; D.setDate(D.getDate() + 1)) {
      const Y = {
        day: D.getDate(),
        in: D.getMonth() === S,
        date: D.valueOf()
      };
      let _ = "";
      if (_ += Y.in ? "" : " wx-inactive", _ += w.indexOf(Y.date) > -1 ? " wx-selected" : "", d) {
        const M = Y.date == w[0], P = Y.date == w[1];
        M && !P ? _ += " wx-left" : P && !M && (_ += " wx-right"), Y.date > w[0] && Y.date < w[1] && (_ += " wx-inrange");
      }
      if (_ += u(D) ? " wx-weekend" : "", r) {
        const M = r(D);
        M && (_ += " " + M);
      }
      C.push({ ...Y, css: _ });
    }
    return C;
  }, [e, w, d, r]), y = U(null);
  let b = U({});
  return b.current.click = f, G(() => {
    Ms(y.current, b.current);
  }, []), /* @__PURE__ */ Z("div", { children: [
    /* @__PURE__ */ p("div", { className: "wx-398RBS wx-weekdays", children: l.map((k) => /* @__PURE__ */ p("div", { className: "wx-398RBS wx-weekday", children: k }, k)) }),
    /* @__PURE__ */ p("div", { className: "wx-398RBS wx-days", ref: y, children: x.map((k) => /* @__PURE__ */ p(
      "div",
      {
        className: `wx-398RBS wx-day ${k.css} ${k.in ? "" : "wx-out"}`,
        "data-id": k.date,
        children: k.day
      },
      k.date
    )) })
  ] });
}
function _i({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [i, a] = Ue(t || /* @__PURE__ */ new Date()), [l, c] = Ue(e || /* @__PURE__ */ new Date()), d = Ce(et).getRaw().calendar, u = d.monthShort || [], h = $(() => l.getMonth(), [l]), g = E(
    (w, x) => {
      if (w != null) {
        x.stopPropagation();
        const y = new Date(l);
        y.setMonth(w), c(y), o && o({ current: y });
      }
      n === "normal" && a(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = E(() => {
    const w = new Date(Ls(i, n) || l);
    w.setMonth(l.getMonth()), w.setFullYear(l.getFullYear()), s && s(w);
  }, [i, l, n, s]), f = E(
    (w) => {
      const x = w.target.closest("[data-id]");
      if (x) {
        const y = parseInt(x.getAttribute("data-id"), 10);
        g(y, w);
      }
    },
    [g]
  );
  return /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-months", onClick: f, children: u.map((w, x) => /* @__PURE__ */ p(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ p(yr, { onClick: m, children: d.done }) })
  ] });
}
const Un = "wx-1XEF33", Ti = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = Ce(et).getRaw().calendar, [a, l] = Ue(e), [c, d] = Ue(t), u = $(() => a.getFullYear(), [a]), h = $(() => {
    const { start: x, end: y } = Is(u), b = [];
    for (let k = x; k <= y; ++k)
      b.push(k);
    return b;
  }, [u]), g = {
    click: m
  };
  function m(x, y) {
    if (x) {
      y.stopPropagation();
      const b = new Date(a);
      b.setFullYear(x), l(b), s && s({ current: b });
    }
    o === "normal" && d(new Date(a)), n && n();
  }
  function f() {
    const x = new Date(Ls(c, o) || a);
    x.setFullYear(a.getFullYear()), r && r(x);
  }
  const w = U(null);
  return G(() => {
    w.current && Ms(w.current, g);
  }, []), /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p("div", { className: Un + " wx-years", ref: w, children: h.map((x, y) => /* @__PURE__ */ p(
      "div",
      {
        className: Un + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ p("div", { className: Un + " wx-buttons", children: /* @__PURE__ */ p(yr, { onClick: f, children: i.done }) })
  ] });
}, Kr = {
  month: {
    component: Ci,
    next: Di,
    prev: Ni
  },
  year: {
    component: _i,
    next: Ei,
    prev: Mi
  },
  duodecade: {
    component: Ti,
    next: Ri,
    prev: Ii
  }
};
function Ni(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Di(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function Mi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Ei(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Ii(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function Ri(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function Ls(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Ai = ["clear", "today"];
function Hi(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Li({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a
}) {
  const l = Ce(et).getGroup("calendar"), [c, d] = j("month"), u = Array.isArray(o) ? o : o ? Ai : [], h = (x, y) => {
    x.preventDefault(), a && a({ value: y });
  }, g = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (x) => {
    const { diff: y, current: b } = x;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const k = Kr[c];
      n(y > 0 ? k.next(e) : k.prev(e));
    } else b && n(b);
    i && i();
  }, f = (x) => {
    d("month"), a && a({ select: !0, value: x });
  }, w = $(() => Kr[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ Z("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p($i, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ Z("div", { children: [
          /* @__PURE__ */ p(
            w,
            {
              value: t,
              current: e,
              onCurrentChange: n,
              part: r,
              markers: s,
              onCancel: g,
              onChange: f,
              onShift: m
            }
          ),
          c === "month" && u.length > 0 && /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((x) => /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ p(
            yr,
            {
              onClick: (y) => h(y, Hi(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function In(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = Ce(et);
  const o = $(() => {
    let i = s;
    return (!i || !i.extend) && (i = Nt(Hs)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ p(et.Provider, { value: o, children: r });
}
function Gr(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const Oi = ["clear", "today"];
function Os({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Oi,
  onChange: s
}) {
  const [o, i] = Ue(t), [a, l] = Ue(e);
  G(() => {
    Gr(a, o, l, !1);
  }, [o, a]);
  const c = E(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), Gr(a, new Date(h), l, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, a]
  ), d = E(
    (u) => {
      l(u);
    },
    [l]
  );
  return a ? /* @__PURE__ */ p(In, { children: /* @__PURE__ */ p(
    Li,
    {
      value: o,
      current: a,
      markers: n,
      buttons: r,
      onChange: c,
      onCurrentChange: d
    }
  ) }) : null;
}
const Pi = ["clear", "today"];
function Wi({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: i = "",
  format: a = "",
  buttons: l = Pi,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: h = !1,
  onChange: g
}) {
  const { calendar: m, formats: f } = (Ce(et) || on()).getRaw(), w = a || f?.dateFormat;
  let x = typeof w == "function" ? w : dt(w, m);
  const [y, b] = j(t), [k, T] = j(!1);
  G(() => {
    b(t);
  }, [t]);
  function S() {
    T(!1);
  }
  function C(_) {
    const M = _ === y || _ && y && _.valueOf() === y.valueOf() || !_ && !y;
    b(_), M || g && g({ value: _ }), setTimeout(S, 1);
  }
  const D = $(
    () => y ? x(y) : "",
    [y, x]
  );
  function Y({ value: _, input: M }) {
    if (!u && !h || M) return;
    let P = typeof u == "function" ? u(_) : _ ? new Date(_) : null;
    P = isNaN(P) ? y || null : P || null, C(P);
  }
  return G(() => {
    const _ = S;
    return window.addEventListener("scroll", _), () => window.removeEventListener("scroll", _);
  }, []), /* @__PURE__ */ Z("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => T(!0), children: [
    /* @__PURE__ */ p(
      an,
      {
        css: c,
        title: d,
        value: D,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: S,
        onChange: Y,
        icon: "wxi-calendar",
        inputStyle: {
          cursor: "pointer",
          width: "100%",
          paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
        },
        clear: h
      }
    ),
    k && !n && /* @__PURE__ */ p(
      Ut,
      {
        onCancel: S,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ p(
          Os,
          {
            buttons: l,
            value: y,
            onChange: (_) => C(_.value)
          }
        )
      }
    )
  ] });
}
function Ps({
  value: t = "",
  options: e = [],
  textOptions: n = null,
  placeholder: r = "",
  disabled: s = !1,
  error: o = !1,
  title: i = "",
  textField: a = "label",
  clear: l = !1,
  children: c,
  onChange: d
}) {
  const u = U(null), h = U(null);
  let [g, m] = Ue(t);
  function f(k) {
    u.current = k.navigate, h.current = k.keydown;
  }
  const w = $(() => g || g === 0 ? (n || e).find((k) => k.id === g) : null, [g, n, e]), x = E(
    ({ id: k }) => {
      (k || k === 0) && (m(k), u.current(null), d && d({ value: k }));
    },
    [m, d]
  ), y = E(
    (k) => {
      k.stopPropagation(), m(""), d && d({ value: "" });
    },
    [m, d]
  ), b = E(() => e.findIndex((k) => k.id === g), [e, g]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => u.current(b()),
      onKeyDown: (k) => h.current(k, b()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ p("div", { className: "wx-2YgblL wx-label", children: w ? c ? c(w) : w[a] : r ? /* @__PURE__ */ p("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        l && !s && g ? /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ p(En, { items: e, onReady: f, onSelect: x, children: ({ option: k }) => c ? c(k) : k[a] })
      ]
    }
  );
}
function nr({
  id: t,
  label: e = "",
  css: n = "",
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: a = "",
  disabled: l = !1,
  onChange: c
}) {
  const d = Ft(t), [u, h] = Ue(o), g = U({ value: u, input: u }), m = $(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), f = $(() => l ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [l, m]);
  function w({ target: b }) {
    const k = b.value * 1;
    h(k), c && c({
      value: k,
      previous: g.current.input,
      input: !0
    }), g.current.input = k;
  }
  function x({ target: b }) {
    const k = b.value * 1;
    h(k), c && c({ value: k, previous: g.current.value }), g.current.value = k;
  }
  G(() => {
    h(o);
  }, [o]);
  const y = U(null);
  return G(() => {
    if (y.current)
      return y.current.addEventListener("change", x), () => {
        y.current && y.current.removeEventListener("change", x);
      };
  }, [y, x]), /* @__PURE__ */ Z("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
    e && /* @__PURE__ */ p("label", { className: "wx-2EDJ8G wx-label", htmlFor: d, children: e }),
    /* @__PURE__ */ p("div", { className: "wx-2EDJ8G wx-inner", children: /* @__PURE__ */ p(
      "input",
      {
        id: d,
        className: "wx-2EDJ8G wx-input",
        type: "range",
        min: r,
        max: s,
        step: i,
        disabled: l,
        value: u,
        onInput: w,
        style: { background: f },
        ref: y
      }
    ) })
  ] });
}
const zi = ({
  id: t,
  value: e = 0,
  step: n = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: i = !1,
  readonly: a = !1,
  onChange: l
}) => {
  const c = Ft(t), [d, u] = Ue(e), h = E(() => {
    if (a || d <= r) return;
    const w = d - n;
    u(w), l && l({ value: w });
  }, [d, a, r, n, l]), g = E(() => {
    if (a || d >= s) return;
    const w = d + n;
    u(w), l && l({ value: w });
  }, [d, a, s, n, l]), m = E(() => {
    if (!a) {
      const w = Math.round(Math.min(s, Math.max(d, r)) / n) * n, x = isNaN(w) ? Math.max(r, 0) : w;
      u(x), l && l({ value: x });
    }
  }, [a, d, s, r, n, l]), f = E(
    (w) => {
      const x = w.target.value * 1;
      u(x), l && l({ value: x, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-22t21n wx-counter ${i ? "wx-disabled" : ""} ${a ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
      children: [
        /* @__PURE__ */ p(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-dec",
            disabled: i,
            onClick: h,
            children: /* @__PURE__ */ p(
              "svg",
              {
                className: "wx-22t21n wx-dec",
                width: "12",
                height: "2",
                viewBox: "0 0 12 2",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ p("path", { d: "M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" })
              }
            )
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            id: c,
            type: "text",
            className: "wx-22t21n wx-input",
            disabled: i,
            readOnly: a,
            required: !0,
            value: d,
            onBlur: m,
            onInput: f
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-inc",
            disabled: i,
            onClick: g,
            children: /* @__PURE__ */ p(
              "svg",
              {
                className: "wx-22t21n wx-inc",
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ p(
                  "path",
                  {
                    d: `M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z`
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
};
function Fi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-11sNg5 wx-notice wx-${t.type ? t.type : ""}`,
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ p("div", { className: "wx-11sNg5 wx-text", children: t.text }),
        /* @__PURE__ */ p("div", { className: "wx-11sNg5 wx-button", children: /* @__PURE__ */ p("i", { className: "wx-11sNg5 wxi-close", onClick: e }) })
      ]
    }
  );
}
function Ui({ data: t = [] }) {
  return /* @__PURE__ */ p("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ p(Fi, { notice: e }, e.id)) });
}
function Yi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const a = (Ce(et) || on()).getGroup("core"), l = U(null);
  G(() => {
    l.current?.focus();
  }, []);
  function c(u) {
    switch (u.code) {
      case "Enter": {
        const h = u.target.tagName;
        if (h === "TEXTAREA" || h === "BUTTON") return;
        o && o({ event: u });
        break;
      }
      case "Escape":
        i && i({ event: u });
        break;
    }
  }
  function d(u, h) {
    const g = { event: u, button: h };
    h === "cancel" ? i && i(g) : o && o(g);
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-1FxkZa wx-modal",
      ref: l,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ Z("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ p("div", { children: r }),
        s || e && /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ p(
          ut,
          {
            type: `block ${u === "ok" ? "primary" : "secondary"}`,
            onClick: (h) => d(h, u),
            children: a(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Vi({ children: t }, e) {
  const [n, r] = j(null), [s, o] = j([]);
  return Tt(
    e,
    () => ({
      showModal: (i) => {
        const a = { ...i };
        return r(a), new Promise((l, c) => {
          a.resolve = (d) => {
            r(null), l(d);
          }, a.reject = (d) => {
            r(null), c(d);
          };
        });
      },
      showNotice: (i) => {
        i = { ...i }, i.id = i.id || mr(), i.remove = () => o((a) => a.filter((l) => l.id !== i.id)), i.expire != -1 && setTimeout(i.remove, i.expire || 5100), o((a) => [...a, i]);
      }
    }),
    []
  ), /* @__PURE__ */ Z(Re, { children: [
    t,
    n && /* @__PURE__ */ p(
      Yi,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ p(Ui, { data: s })
  ] });
}
_t(Vi);
function en({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const a = $(() => mr(), []);
  return /* @__PURE__ */ p(xr.Provider, { value: a, children: /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ p("label", { className: "wx-2oVUvC wx-label", htmlFor: a, children: t }),
        /* @__PURE__ */ p("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: wr(i, { id: a }) })
      ]
    }
  ) });
}
const Ws = ({
  value: t = !1,
  type: e = "",
  icon: n = "",
  disabled: r = !1,
  iconActive: s = "",
  onClick: o,
  title: i = "",
  css: a = "",
  text: l = "",
  textActive: c = "",
  children: d,
  active: u,
  onChange: h
}) => {
  const [g, m] = Ue(t), f = $(() => (g ? "pressed" : "") + (e ? " " + e : ""), [g, e]), w = E(
    (x) => {
      let y = !g;
      o && o(x), x.defaultPrevented || (m(y), h && h({ value: y }));
    },
    [g, o, h]
  );
  return g && u ? /* @__PURE__ */ p(
    ut,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: w,
      disabled: r,
      children: wr(u, { value: g })
    }
  ) : d ? /* @__PURE__ */ p(
    ut,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: w,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ p(
    ut,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: w,
      disabled: r
    }
  );
}, Br = new Date(0, 0, 0, 0, 0);
function Ki({
  value: t = Br,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = Ue(t);
  const { calendar: d, formats: u } = (Ce(et) || on()).getRaw(), h = d.clockFormat == 12, g = 23, m = 59, f = $(() => {
    const W = i || u?.timeFormat;
    return typeof W == "function" ? W : dt(W, d);
  }, [i, u, d]), w = $(() => f(new Date(0, 0, 0, 1)).indexOf("01") != -1, [f]), x = (W, ae) => (W < 10 && ae ? `0${W}` : `${W}`).slice(-2), y = (W) => x(W, !0), b = (W) => `${W}`.replace(/[^\d]/g, "") || 0, k = (W) => h && (W = W % 12, W === 0) ? "12" : x(W, w), T = E((W, ae) => (W = b(W), Math.min(W, ae)), []), [S, C] = j(null), D = l || Br, Y = T(D.getHours(), g), _ = T(D.getMinutes(), m), M = Y > 12, P = k(Y), H = y(_), I = $(
    () => f(new Date(0, 0, 0, Y, _)),
    [Y, _, f]
  ), L = E(() => {
    C(!0);
  }, []), ce = E(() => {
    const W = new Date(D);
    W.setHours(W.getHours() + (M ? -12 : 12)), c(W), a && a({ value: W });
  }, [D, M, a]), ue = E(
    ({ value: W }) => {
      if (D.getHours() === W) return;
      const ae = new Date(D);
      ae.setHours(W), c(ae), a && a({ value: ae });
    },
    [D, a]
  ), re = E(
    ({ value: W }) => {
      if (D.getMinutes() === W) return;
      const ae = new Date(D);
      ae.setMinutes(W), c(ae), a && a({ value: ae });
    },
    [D, a]
  ), le = E(
    (W) => (W = T(W, g), h && (W = W * 1, W === 12 && (W = 0), M && (W += 12)), W),
    [T, h, M]
  ), ye = E(() => {
    C(null);
  }, []);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : L,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ p(
          an,
          {
            id: e,
            css: r,
            title: n,
            value: I,
            readonly: !0,
            disabled: s,
            error: o,
            icon: "wxi-clock",
            inputStyle: {
              cursor: "pointer",
              width: "100%",
              paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
            }
          }
        ),
        S && !s && /* @__PURE__ */ p(Ut, { onCancel: ye, width: "unset", children: /* @__PURE__ */ Z("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ Z("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: P,
                onChange: (W) => {
                  const ae = le(W.target.value);
                  ue({ value: ae });
                }
              }
            ),
            /* @__PURE__ */ p("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: H,
                onChange: (W) => {
                  const ae = T(W.target.value, m);
                  re({ value: ae });
                }
              }
            ),
            h && /* @__PURE__ */ p(
              Ws,
              {
                value: M,
                onClick: ce,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(en, { width: "unset", children: /* @__PURE__ */ p(
            nr,
            {
              label: d.hours,
              value: Y,
              onChange: ue,
              max: g
            }
          ) }),
          /* @__PURE__ */ p(en, { width: "unset", children: /* @__PURE__ */ p(
            nr,
            {
              label: d.minutes,
              value: _,
              onChange: re,
              max: m
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Gi({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Bi({ position: t = "right", children: e, onCancel: n }) {
  const r = U(null);
  return G(() => rn(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function zs({ theme: t = "", target: e, children: n }) {
  const r = U(null), s = U(null), [o, i] = j(null);
  r.current || (r.current = document.createElement("div"));
  const a = Ce(sn);
  return G(() => {
    i(
      e || ji(s.current) || Qe.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Xo(
      /* @__PURE__ */ p(
        "div",
        {
          className: `wx-3ZWsT0 wx-${t || a}-theme`,
          children: n
        }
      ),
      o
    ) : null
  ] });
}
function ji(t) {
  const e = Qe.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function qi() {
  return /* @__PURE__ */ p(Re, {});
}
function jr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(sn.Provider, { value: "material", children: /* @__PURE__ */ Z(Re, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ Z(Re, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(qi, {}),
      /* @__PURE__ */ p(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Fs() {
  return /* @__PURE__ */ p(Re, {});
}
function qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(sn.Provider, { value: "willow", children: /* @__PURE__ */ Z(Re, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ Z(Re, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Fs, {}),
      /* @__PURE__ */ p(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Xr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(sn.Provider, { value: "willow-dark", children: /* @__PURE__ */ Z(Re, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ Z(Re, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Fs, {}),
      /* @__PURE__ */ p(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
pr(Qe);
const Rn = {
  gantt: {
    // Header / sidebar
    "Task name": "Task name",
    "Start date": "Start date",
    "Add task": "Add task",
    Duration: "Duration",
    Task: "Task",
    Milestone: "Milestone",
    "Summary task": "Summary task",
    // Sidebar
    Save: "Save",
    Delete: "Delete",
    Name: "Name",
    Description: "Description",
    "Select type": "Select type",
    Type: "Type",
    "End date": "End date",
    Progress: "Progress",
    Predecessors: "Predecessors",
    Successors: "Successors",
    "Add task name": "Add task name",
    "Add description": "Add description",
    "Select link type": "Select link type",
    "End-to-start": "End-to-start",
    "Start-to-start": "Start-to-start",
    "End-to-end": "End-to-end",
    "Start-to-end": "Start-to-end",
    // Context menu / toolbar
    Add: "Add",
    "Child task": "Child task",
    "Task above": "Task above",
    "Task below": "Task below",
    "Convert to": "Convert to",
    Edit: "Edit",
    Cut: "Cut",
    Copy: "Copy",
    Paste: "Paste",
    Move: "Move",
    Up: "Up",
    Down: "Down",
    Indent: "Indent",
    Outdent: "Outdent",
    "Split task": "Split task",
    Segment: "Segment",
    // Toolbar
    "New task": "New task",
    "Move up": "Move up",
    "Move down": "Move down",
    Undo: "Undo",
    Redo: "Redo",
    // Formats
    Week: "Week",
    Q: "Quarter"
  }
}, Xi = "en-US", Qi = {
  monthFull: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  dayFull: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  hours: "Hours",
  minutes: "Minutes",
  done: "Done",
  clear: "Clear",
  today: "Today",
  am: ["am", "AM"],
  pm: ["pm", "PM"],
  weekStart: 0,
  clockFormat: 24
}, Ji = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, Zi = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, vr = {
  core: Ji,
  calendar: Qi,
  formats: Zi,
  lang: Xi
};
var ea = (/* @__PURE__ */ new Date()).valueOf(), ta = () => ea++;
function na(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!An(r, s)) return !1;
  }
  return !0;
}
function An(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
    return !1;
  if (typeof t == "object")
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let r = t.length - 1; r >= 0; r--)
        if (!An(t[r], e[r])) return !1;
      return !0;
    } else
      return na(t, e);
  return t === e;
}
function $n(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map($n);
  const e = {};
  for (const n in t)
    e[n] = $n(t[n]);
  return e;
}
var Us = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, Ys = (/* @__PURE__ */ new Date()).valueOf(), ra = () => Ys++;
function kr() {
  return "temp://" + Ys++;
}
var Qr = class {
  constructor(e) {
    this._data = e, this._pool = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      this._pool.set(r.id, r);
    }
  }
  add(e) {
    e = { id: ra(), ...e }, this._data.push(e), this._pool.set(e.id, e);
  }
  update(e, n) {
    const r = this._data.findIndex((o) => o.id == e), s = { ...this._data[r], ...n };
    this._data[r] = s, this._pool.set(s.id, s);
  }
  remove(e) {
    this._data = this._data.filter((n) => n.id != e), this._pool.delete(e);
  }
  filter(e) {
    this._data = this._data.filter((n) => {
      const r = e(n);
      return r || this._pool.delete(n.id), r;
    });
  }
  byId(e) {
    return this._pool.get(e);
  }
  map(e) {
    return this._data.map(e);
  }
  forEach(e) {
    this._data.forEach(e);
  }
}, sa = class {
  constructor(t) {
    const e = { id: 0, $level: 0, data: [], parent: null }, n = /* @__PURE__ */ new Map();
    n.set(0, e), this._pool = n, t && t.length && this.parse(t, 0);
  }
  parse(t, e) {
    const n = this._pool;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      o.parent = o.parent || e, o.data = null, n.set(o.id, o);
    }
    for (let s = 0; s < t.length; s++) {
      const o = t[s], i = n.get(o.parent);
      i && (i.data || (i.data = []), i.data.push(o));
    }
    const r = n.get(e);
    this.setLevel(r, r.$level + 1, !1);
  }
  add(t, e) {
    const n = this._pool.get(t.parent || 0);
    t.$level = n.$level + 1, this._pool.set(t.id, t), n.data ? e === -1 ? n.data = [...n.data, t] : Jr(n, e, t) : n.data = [t];
  }
  addAfter(t, e) {
    if (!e) return this.add(t, -1);
    const n = this.byId(e), r = this.byId(n.parent), s = xn(r, n.id) + 1;
    t.parent = r.id, t.$level = r.$level + 1, this.add(t, s);
  }
  remove(t) {
    const e = this._pool.get(t);
    this._remove(e);
    const n = this._pool.get(e.parent);
    n.data = n.data.filter((r) => r.id != t), this._clearBranch(n);
  }
  _remove(t) {
    t.data && t.data.forEach((e) => this._remove(e)), this._pool.delete(t.id);
  }
  update(t, e) {
    let n = this._pool.get(t);
    const r = this._pool.get(n.parent), s = xn(r, n.id);
    n = { ...n, ...e }, r && s >= 0 && (r.data[s] = n, r.data = [...r.data]), this._pool.set(n.id, n);
  }
  move(t, e, n) {
    const r = this._pool.get(t), s = e === "child", o = this._pool.get(n), i = o.$level + (s ? 1 : 0);
    if (!r || !o) return;
    const a = this._pool.get(r.parent), l = s ? o : this._pool.get(o.parent);
    l.data || (l.data = []);
    const c = xn(a, r.id);
    oa(a, c);
    const d = s ? l.data.length : xn(l, o.id) + (e === "after" ? 1 : 0);
    if (Jr(l, d, r), a.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== i && (r.$level = i, this.setLevel(r, i + 1, !0)), this.update(r.id, r), this._clearBranch(a);
  }
  _clearBranch(t) {
    t.data && !t.data.length && (t.open && delete t.open, this.update(t.id, { data: null }));
  }
  toArray() {
    const t = [], e = this._pool.get(0).data;
    return e && Vs(e, t), t;
  }
  byId(t) {
    return this._pool.get(t);
  }
  getBranch(t) {
    return this._pool.get(t).data;
  }
  forEach(t) {
    this._pool.forEach((e, n) => {
      n !== 0 && t(e);
    });
  }
  eachChild(t, e) {
    const n = this.byId(e);
    !n || !n.data || n.data.forEach((r, s) => {
      t(this.byId(r.id), s), this.eachChild(t, r.id);
    });
  }
  setLevel(t, e, n) {
    t.data && (t.data = t.data.map((r) => (n && (r = { ...r }, this._pool.set(r.id, r)), r.$level = e, r.data && this.setLevel(r, e + 1, n), r)));
  }
};
function Vs(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Vs(n.data, e);
  });
}
function oa(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function Jr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function xn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Ks = 2, ia = class {
  constructor(t) {
    t && (this._writable = t.writable, this._async = t.async), this._values = {}, this._state = {};
  }
  setState(t, e = 0) {
    const n = {};
    return this._wrapProperties(t, this._state, this._values, "", n, e), n;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(t, e, n, r, s, o) {
    for (const i in t) {
      const a = e[i], l = n[i], c = t[i];
      if (a && (l === c && typeof c != "object" || c instanceof Date && l instanceof Date && l.getTime() === c.getTime())) continue;
      const d = r + (r ? "." : "") + i;
      a ? (a.__parse(c, d, s, o) && (n[i] = c), o & Ks ? s[d] = a.__trigger : a.__trigger()) : (c && c.__reactive ? e[i] = this._wrapNested(c, c, d, s) : e[i] = this._wrapWritable(c), n[i] = c), s[d] = s[d] || null;
    }
  }
  _wrapNested(t, e, n, r) {
    const s = this._wrapWritable(t);
    return this._wrapProperties(t, s, e, n, r, 0), s.__parse = (o, i, a, l) => (this._wrapProperties(o, s, e, i, a, l), !1), s;
  }
  _wrapWritable(t) {
    const e = [], n = function() {
      for (let r = 0; r < e.length; r++) e[r](t);
    };
    return { subscribe: (r) => (e.push(r), this._async ? setTimeout(r, 1, t) : r(t), () => {
      const s = e.indexOf(r);
      s >= 0 && e.splice(s, 1);
    }), __trigger: () => {
      e.length && (this._async ? setTimeout(n, 1) : n());
    }, __parse: function(r) {
      return t = r, !0;
    } };
  }
}, aa = class {
  constructor(t, e, n, r) {
    typeof t == "function" ? this._setter = t : this._setter = t.setState.bind(t), this._routes = e, this._parsers = n, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((s) => {
      s.in.forEach((o) => {
        const i = this._triggers.get(o) || [];
        i.push(s), this._triggers.set(o, i);
      }), s.out.forEach((o) => {
        const i = this._sources.get(o) || {};
        s.in.forEach((a) => i[a] = !0), this._sources.set(o, i);
      });
    }), this._routes.forEach((s) => {
      s.length = Math.max(...s.in.map((o) => Gs(o, this._sources, 1)));
    }), this._bus = r;
  }
  init(t) {
    const e = {};
    for (const n in t) if (this._prev[n] !== t[n]) {
      const r = this._parsers[n];
      e[n] = r ? r(t[n]) : t[n];
    }
    this._prev = this._prev ? { ...this._prev, ...t } : { ...t }, this.setState(e), this._bus && this._bus.exec("init-state", e);
  }
  setStateAsync(t) {
    const e = this._setter(t, Ks);
    return this._async ? Object.assign(this._async.signals, e) : this._async = { signals: e, timer: setTimeout(this._applyState.bind(this), 1) }, e;
  }
  _applyState() {
    const t = this._async;
    if (t) {
      this._async = null, this._triggerUpdates(t.signals, []);
      for (const e in t.signals) {
        const n = t.signals[e];
        n && n();
      }
    }
  }
  setState(t, e = []) {
    const n = this._setter(t);
    return this._triggerUpdates(n, e), n;
  }
  _triggerUpdates(t, e) {
    const n = Object.keys(t), r = !e.length;
    e = e || [];
    for (let s = 0; s < n.length; s++) {
      const o = n[s], i = this._triggers.get(o);
      i && i.forEach((a) => {
        e.indexOf(a) == -1 && e.push(a);
      });
    }
    r && this._execNext(e);
  }
  _execNext(t) {
    for (; t.length; ) {
      t.sort((n, r) => n.length < r.length ? 1 : -1);
      const e = t[t.length - 1];
      t.splice(t.length - 1), e.exec(t);
    }
  }
};
function Gs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Gs(o, e, n + 1));
  return Math.max(...s);
}
var la = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(e, n, r) {
    let s = this._handlers[e];
    s ? r && r.intercept ? s.unshift(n) : s.push(n) : s = this._handlers[e] = [n], r && r.tag && this._tag.set(n, r.tag);
  }
  intercept(e, n, r) {
    this.on(e, n, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const n in this._handlers) {
      const r = this._handlers[n];
      for (let s = r.length - 1; s >= 0; s--) this._tag.get(r[s]) === e && r.splice(s, 1);
    }
  }
  async exec(e, n) {
    const r = this._handlers[e];
    if (r) for (let s = 0; s < r.length; s++) {
      const o = r[s](n);
      if (o === !1 || o && o.then && await o === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(e, n), n;
  }
  setNext(e) {
    return this._nextHandler = e;
  }
};
function ca(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function da(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function ua({ key: t, order: e }) {
  const n = e === "asc" ? ca : da;
  return (r, s) => n(r[t], s[t]);
}
function fa(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => ua(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function ha(t, e) {
  return t.sort(fa(e));
}
class ga extends sa {
  _sort;
  constructor(e) {
    super(), this.parse(e, 0);
  }
  parse(e, n) {
    if (!e || !e.length) return;
    const r = e.map((s) => this.normalizeTask(s));
    super.parse(r, n), this._sort && this.sortBranch(this._sort, n);
  }
  getBranch(e) {
    const n = this._pool.get(e);
    return this._pool.get(n.parent || 0).data;
  }
  contains(e, n) {
    const r = this._pool.get(e).data;
    let s = !1;
    if (r) for (let o = 0; o < r.length; o++) {
      if (r[o].id === n) {
        s = !0;
        break;
      }
      if (r[o].data && (s = this.contains(r[o].id, n), s)) break;
    }
    return s;
  }
  getIndexById(e) {
    return this.getBranch(e).findIndex((n) => n.id === e);
  }
  add(e, n) {
    const r = this.normalizeTask(e);
    return super.add(r, n), r;
  }
  copy(e, n, r) {
    const s = this.add({ ...e, id: null, data: null, parent: n }, r);
    let o = [[e.id, s.id]];
    return e.data?.forEach((i, a) => {
      const l = this.copy(i, s.id, a);
      o = o.concat(l);
    }), o;
  }
  normalizeTask(e) {
    const n = e.id || kr(), r = e.parent || 0, s = e.text || "", o = e.type || "task", i = e.progress || 0, a = e.details || "", l = { ...e, id: n, text: s, parent: r, progress: i, type: o, details: a };
    return e.segments && (l.segments = e.segments.map((c) => ({ ...c }))), e.segments && (l.segments = e.segments.map((c) => ({ ...c }))), l;
  }
  getSummaryId(e, n = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (n) {
      let o = e, i = this.getSummaryId(o);
      const a = [];
      for (; i; ) o = i, a.push(i), i = this.getSummaryId(o);
      return a;
    }
    return s.type === "summary" ? s.id : this.getSummaryId(s.id);
  }
  sort(e) {
    this._sort = e, e && this.sortBranch(e, 0);
  }
  sortBranch(e, n) {
    const r = this._pool.get(n || 0).data;
    r && (ha(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && Bs(n, e), e;
  }
}
function Bs(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Bs(n.data, e);
  });
}
function Te(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ht(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Hn(t, e) {
  const n = Te(t);
  return isNaN(e) ? ht(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function br(t, e) {
  const n = Te(t);
  if (isNaN(e)) return ht(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ht(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function js(t, e) {
  const n = +Te(t);
  return ht(t, n + e);
}
const qs = 6048e5, pa = 864e5, Xs = 6e4, Qs = 36e5;
function ma(t, e) {
  return js(t, e * Qs);
}
let wa = {};
function Js() {
  return wa;
}
function Cn(t, e) {
  const n = Js(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Te(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function tn(t) {
  return Cn(t, { weekStartsOn: 1 });
}
function xa(t) {
  const e = Te(t), n = e.getFullYear(), r = ht(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = tn(r), o = ht(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = tn(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function $t(t) {
  const e = Te(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = Te(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Zs(t, e) {
  const n = $t(t), r = $t(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / pa);
}
function Zr(t) {
  const e = xa(t), n = ht(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), tn(n);
}
function ya(t, e) {
  return js(t, e * Xs);
}
function va(t, e) {
  const n = e * 3;
  return br(t, n);
}
function eo(t, e) {
  const n = e * 7;
  return Hn(t, n);
}
function ka(t, e) {
  return br(t, e * 12);
}
function Zt(t, e) {
  const n = Te(t), r = Te(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ba(t, e) {
  const n = $t(t), r = $t(e);
  return +n == +r;
}
function Sr(t, e) {
  const n = tn(t), r = tn(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / qs);
}
function Sa(t, e) {
  const n = Te(t), r = Te(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function $a(t, e) {
  const n = Te(t), r = Te(e);
  return n.getFullYear() - r.getFullYear();
}
function $r(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function to(t, e) {
  return +Te(t) - +Te(e);
}
function Ca(t, e, n) {
  const r = to(t, e) / Qs;
  return $r(n?.roundingMethod)(r);
}
function _a(t, e, n) {
  const r = to(t, e) / Xs;
  return $r(n?.roundingMethod)(r);
}
function no(t) {
  const e = Te(t);
  return e.setHours(23, 59, 59, 999), e;
}
function Cr(t) {
  const e = Te(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Ta(t) {
  const e = Te(t);
  return +no(e) == +Cr(e);
}
function ro(t, e) {
  const n = Te(t), r = Te(e), s = Zt(n, r), o = Math.abs(Sa(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Zt(n, r) === -s;
    Ta(Te(t)) && o === 1 && Zt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function Na(t, e, n) {
  const r = ro(t, e) / 3;
  return $r(n?.roundingMethod)(r);
}
function Da(t, e) {
  const n = Te(t), r = Te(e), s = Zt(n, r), o = Math.abs($a(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Zt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function nn(t) {
  const e = Te(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function so(t) {
  const e = Te(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Ma(t) {
  const e = Te(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function Ea(t) {
  const e = Te(t), n = ht(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Ia(t) {
  const e = Te(t);
  return e.setMinutes(59, 59, 999), e;
}
function Ra(t, e) {
  const n = Js(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Te(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function _r(t) {
  const e = Te(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function oo(t) {
  const e = Te(t), n = e.getFullYear(), r = e.getMonth(), s = ht(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Aa(t) {
  const e = Te(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function io(t) {
  const e = Te(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : Aa(e) ? 366 : 365;
}
function Ha(t) {
  const e = Zr(t), n = +Zr(eo(e, 60)) - +e;
  return Math.round(n / qs);
}
function Rt(t, e) {
  const n = Te(t), r = Te(e);
  return +n == +r;
}
function La(t) {
  const e = Te(t);
  return e.setMinutes(0, 0, 0), e;
}
function Oa(t, e, n) {
  const r = Cn(t, n), s = Cn(e, n);
  return +r == +s;
}
function Pa(t, e) {
  const n = Te(t), r = Te(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Wa(t, e) {
  const n = nn(t), r = nn(e);
  return +n == +r;
}
function za(t, e) {
  const n = Te(t), r = Te(e);
  return n.getFullYear() === r.getFullYear();
}
const rr = { year: Da, quarter: Na, month: ro, week: Sr, day: Zs, hour: Ca, minute: _a }, pt = { year: { quarter: 4, month: 12, week: Ha, day: Fa, hour: Ua }, quarter: { month: 3, week: Ya, day: ao, hour: Va }, month: { week: Ka, day: Ga, hour: Ba }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Fa(t) {
  return t ? io(t) : 365;
}
function Ua(t) {
  return io(t) * 24;
}
function Ya(t) {
  const e = nn(t), n = Hn($t(_r(t)), 1);
  return Sr(n, e);
}
function ao(t) {
  if (t) {
    const e = nn(t), n = _r(t);
    return Zs(n, e) + 1;
  }
  return 91;
}
function Va(t) {
  return ao(t) * 24;
}
function Ka(t) {
  if (t) {
    const e = so(t), n = Hn($t(Cr(t)), 1);
    return Sr(n, e);
  }
  return 5;
}
function Ga(t) {
  return t ? oo(t) : 30;
}
function Ba(t) {
  return oo(t) * 24;
}
function Tn(t, e, n) {
  const r = pt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function ja(t, e) {
  return t === e || !!(pt[t] && pt[t][e]);
}
const Nn = { year: ka, quarter: va, month: br, week: eo, day: Hn, hour: ma, minute: ya };
function Tr(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !pt[t][o] || typeof pt[t][o] == "number" || uo(t, r, s, n) ? Qt(t, r, s, o, i, n) : qa(r, s, t, o, i, n);
}
function Qt(t, e, n, r, s, o) {
  const i = r || t;
  let a = n, l = e;
  if (s && (a = ft(i, n, o), l = ft(i, e, o), l < e && (l = at(i)(l, 1))), t !== i) {
    const c = rr[i](l, a), d = Tn(t, i, n);
    return c / d;
  } else return rr[i](l, a);
}
function qa(t, e, n, r, s, o) {
  let i = 0;
  const a = ft(n, e, o);
  if (e > a) {
    const c = Nn[n](a, 1);
    i = Qt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return uo(n, e, t, o) || (l = Qt(n, ft(n, t, o), e, void 0, void 0, o), e = Nn[n](e, l)), l += i + Qt(n, t, e, r, void 0, o), !l && s && (l = Qt(n, t, e, r, s, o)), l;
}
function at(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Nn[t];
}
const lo = { year: Ea, quarter: nn, month: so, week: (t, e) => Cn(t, { weekStartsOn: e }), day: $t, hour: La };
function ft(t, e, n) {
  const r = lo[t];
  return r ? r(e, n) : new Date(e);
}
const Xa = { year: Ma, quarter: _r, month: Cr, week: (t, e) => Ra(t, { weekStartsOn: e }), day: no, hour: Ia }, co = { year: za, quarter: Wa, month: Pa, week: (t, e, n) => Oa(t, e, { weekStartsOn: n }), day: ba };
function uo(t, e, n, r) {
  const s = co[t];
  return s ? s(e, n, r) : !1;
}
const Qa = { start: lo, end: Xa, add: Nn, isSame: co, diff: rr, smallerCount: pt }, es = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ja(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((a, l) => st.indexOf(a) - st.indexOf(l)).shift();
      let s = st.indexOf(r);
      const o = e[n][r], i = es(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = st[a], c = es(pt[l][r]);
        if (i <= c) break;
        s = a;
      }
      st.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) pt[r][t] = e[n][r];
    else Qa[n][t] = e[n];
  }
}
function Yn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Za(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Pt(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: at(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const st = ["year", "quarter", "month", "week", "day", "hour"], sr = 50, or = 300;
function el(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, a = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, l = !0);
  });
  const c = at(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function tl(t, e, n, r, s, o, i) {
  const a = Pt(i).unit, l = Tr(a, void 0, o), c = l(e, t, "", !0), d = ft(a, e, o);
  t = ft(a, t, o), e = d < e ? at(a)(d, 1) : d;
  const u = c * r, h = s * i.length, g = i.map((f) => {
    const w = [], x = at(f.unit);
    let y = ft(f.unit, t, o);
    for (; y < e; ) {
      const b = x(y, f.step), k = y < t ? t : y, T = b > e ? e : b, S = l(T, k, "", !0) * r, C = typeof f.format == "function" ? f.format(y, b) : f.format;
      let D = "";
      f.css && (D += typeof f.css == "function" ? f.css(y) : f.css), w.push({ width: S, value: C, date: k, css: D, unit: f.unit }), y = b;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return a !== n && (m = Math.round(m / Tn(a, n)) || 1), { rows: g, width: u, height: h, diff: l, start: t, end: e, lengthUnit: n, minUnit: a, lengthUnitWidth: m };
}
function nl(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = st.indexOf(Pt(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = yn(s.minCellWidth, sr)), l.maxCellWidth || (l.maxCellWidth = yn(s.maxCellWidth, or));
  });
  else {
    const l = [], c = n.length || 1, d = yn(s.minCellWidth, sr), u = yn(s.maxCellWidth, or);
    n.forEach((h) => {
      h.format && !e[h.unit] && (e[h.unit] = h.format);
    }), st.forEach((h, g) => {
      if (g === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (g) for (let f = c - 1; f > 0; f--) {
          const w = st[g - f];
          w && m.push({ unit: w, step: 1, format: e[w] });
        }
        m.push({ unit: h, step: 1, format: e[h] }), l.push({ minCellWidth: d, maxCellWidth: u, scales: m });
      }
    }), s.levels = l;
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level], a = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: a };
}
function rl(t, e, n, r, s, o, i) {
  t.level = n;
  let a;
  const l = r.scales || r, c = Pt(l).unit, d = sl(c, s);
  if (e === -1) {
    const g = Tn(c, s);
    a = i * g;
  } else {
    const g = Tn(Pt(o).unit, c);
    a = Math.round(i / g);
  }
  const u = r.minCellWidth ?? sr, h = r.maxCellWidth ?? or;
  return { scales: l, cellWidth: Math.min(h, Math.max(u, a)), lengthUnit: d, zoom: t };
}
function sl(t, e) {
  const n = st.indexOf(t), r = st.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : st[r];
}
function yn(t, e) {
  return t ?? e;
}
const ir = 8, fo = 4, ol = 3, ts = 7, il = ir + fo;
function ho(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && po(s, n, r), s.$x += e, ho(s, e, n, r);
  });
}
function ar(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    go(o, i, n, r), o.$x = i.xMin, o.$w = i.xMax - i.xMin, ar(t, o, n, r);
  }
}
function go(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && po(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const i = s.$x + s.$w - o;
      e.xMax < i && (e.xMax = i);
    }
    s.type !== "summary" && go(s, e, n, r);
  });
}
function po(t, e, n) {
  t.$x = Math.round(e.diff(t.start, e.start, e.lengthUnit) * n), t.$w = Math.round(e.diff(t.end, t.start, e.lengthUnit, !0) * n);
}
function Nr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = Nr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
    const o = s.end || s.start;
    o && (!r.end || r.end < o) && (r.end = new Date(o));
  });
  else if (t.type === "summary") throw Error("Summary tasks must have start and end dates if they have no subtasks");
  return r;
}
function mo(t, e, n) {
  return ns(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    mo(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && ns(t, e, n, !0), t;
}
function ns(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = n, { start: l, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", g = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), f = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let b = t[h], k = t[g];
  if (r && !b) {
    t[y] = !0;
    return;
  }
  t[h] < l && (t[g] < l || Rt(t[g], l)) ? b = k = l : t[h] > c && (b = k = c), t[m] = Math.round(u(b, l, d) * s), t[f] = r ? t.$y + t.$h + fo : o * e + ol, t[w] = Math.round(u(k, b, d, !0) * s), t[x] = r ? ir : a ? o - ts - il : o - ts, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[f] = t.$y + ir, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Rt(b, k);
}
const Vn = 20, al = function(t, e, n, r, s) {
  const o = Math.round(r / 2) - 3;
  if (!e || !n || !e.$y || !n.$y || e.$skip || n.$skip) return t.$p = "", t.$pl = 0, t;
  let i = !1, a = !1;
  switch (t.type) {
    case "e2s":
      a = !0;
      break;
    case "s2s":
      i = !0, a = !0;
      break;
    case "s2e":
      i = !0;
      break;
  }
  const l = i ? e.$x : e.$x + e.$w, c = s ? e.$y - 7 : e.$y, d = a ? n.$x : n.$x + n.$w, u = s ? n.$y - 7 : n.$y;
  if (l !== d || c !== u) {
    const h = cl(l, c + o, d, u + o, i, a, r / 2, s), g = dl(d, u + o, a);
    t.$p = `${h},${g}`, t.$pl = ll(t.$p);
  }
  return t;
};
function ll(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s], [a, l] = n[s + 1];
    r += Math.hypot(a - o, l - i);
  }
  return r;
}
function cl(t, e, n, r, s, o, i, a) {
  const l = Vn * (s ? -1 : 1), c = Vn * (o ? -1 : 1), d = t + l, u = n + c, h = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], g = u - d;
  let m = r - e;
  const f = o === s;
  return f || (u <= t + Vn - 2 && o || u > t && !o) && (m = a ? m - i + 6 : m - i), f && o && d > u || f && !o && d < u ? (h[4] = h[2] + g, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + g, h[7] = h[5]), h.join(",");
}
function dl(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function wo(t) {
  return t.map((e) => {
    const n = e.id || kr();
    return { ...e, id: n };
  });
}
const xo = ["start", "end", "duration"];
function ul(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !xo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function fl(t, e) {
  return typeof e == "function" ? e : xo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => ul(n, r.id) ? e : null) : e;
}
function hl(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && fl(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const yo = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function At(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, a = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, g = !i && d.includes(e), m = { parent: u.includes(e), level: h[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !g)) {
    if (e !== "paste-task" && (t._temp = null), a.includes(e) || g || s.length === 1) rs(t, e, n, r);
    else if (i) {
      const f = l.includes(e) ? s : gl(s, o, m);
      c.includes(e) && f.reverse();
      const w = t.getHistory();
      w && w.startBatch(), f.forEach((x, y) => rs(t, e, x, r, y)), w && w.endBatch();
    }
  }
}
function gl(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function rs(t, e, n, r, s) {
  const o = t.exec ? t.exec : t.in.exec;
  let i = e.split(":")[0], a = e.split(":")[1];
  const l = n?.id || n;
  let c = { id: l }, d = {}, u = !1;
  if (i == "copy-task" || i == "cut-task") {
    t._temp || (t._temp = []), t._temp.push({ id: l, cut: i == "cut-task" });
    return;
  } else if (i == "paste-task") {
    if (t._temp && t._temp.length) {
      const h = t.getHistory();
      h && h.startBatch();
      const g = /* @__PURE__ */ new Map();
      if (t._temp.forEach((m) => {
        const f = { id: m.id, target: l, mode: "after" };
        o(m.cut ? "move-task" : "copy-task", f), g.set(m.id, f.id);
      }), !t._temp[0].cut) {
        const { links: m } = t.getState(), f = t._temp.map((x) => x.id), w = [];
        m.forEach((x) => {
          f.includes(x.source) && f.includes(x.target) && w.push(x);
        }), w.forEach((x) => {
          o("add-link", { link: { source: g.get(x.source), target: g.get(x.target), type: x.type } });
        }), t._temp.forEach((x, y) => {
          o("select-task", { id: g.get(x.id), toggle: !!y });
        });
      }
      h && h.endBatch(), t._temp = null;
    }
    return;
  } else i === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: l, show: !0, select: !1 }, c = {}, u = !0) : i === "edit-task" ? (i = "show-editor", a === "segment" && typeof n == "object" && (d = n)) : i === "convert-task" ? (i = "update-task", d = { task: { type: a } }, a = void 0) : i === "indent-task" && (a = a === "add");
  if (i === "split-task" && typeof n == "object") d = n;
  else if (i === "delete-task" && a === "segment" && typeof n == "object") {
    const h = t.getTask(l), { segmentIndex: g } = n, m = h.segments.filter((f, w) => w !== g);
    o("update-task", { id: l, task: { segments: m } });
    return;
  }
  typeof a < "u" && (d = { mode: a, ...d }), c = { ...c, ...d }, o(i, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function Dr(t, e) {
  return t.some((n) => n.data ? Dr(n.data, e) : n.id === e);
}
const ss = (t, e) => at(t, e), pl = (t, e) => Tr(t, e);
function lr(t, e) {
  Array.isArray(t) && (t.forEach((n) => vt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Nr(n, t);
      n.start = r, n.end = s, vt(n, e);
    }
  }));
}
function vt(t, e) {
  t.unscheduled || os(t, e, !1), t.base_start && os(t, e, !0);
}
function os(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, a, l] = vo(n);
  t.type === "milestone" ? (t[l] = 0, t[a] = void 0) : t[i] && (t[l] ? t[a] = ss(o, r)(t[i], t[l]) : t[a] ? t[l] = pl(o, r)(t[a], t[i]) : (t[a] = ss(o, r)(t[i], 1), t[l] = 1));
}
function vo(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function is(t, e, n) {
  const [r, s, o] = vo(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function ko(t, e, n) {
  is(t, n, !1), t.base_start && is(t, n, !0), vt(t, e);
}
class ml extends ia {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new aa(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: a, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!a || !l || u) {
        const h = Pt(d).unit, g = el(a, l, u, h, c);
        (g._end != o || g._start != i) && this.setState(g, s);
      } else this.setState({ _start: a, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: a, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: h } = o, g = Pt(u).unit;
      ja(g, i) || (i = g);
      const m = tl(a, l, i, c, d, h, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), h = a.toArray().map((g, m) => mo(g, m, { cellWidth: o, cellHeight: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: h }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: a, baselines: l, criticalPath: c } = this.getState(), d = i.map((u) => {
        const h = o.byId(u.source), g = o.byId(u.target);
        return al(u, h, g, a, l);
      }).toSorted((u, h) => c ? !!u.$critical == !!h.$critical ? h.$pl - u.$pl : u.$critical ? 1 : -1 : h.$pl - u.$pl).filter((u) => u !== null);
      this.setState({ _links: d }, s);
    } }, { in: ["tasks", "activeTask"], out: ["_activeTask"], exec: (s) => {
      const o = this.getState();
      let { activeTask: i } = o;
      i && typeof i == "object" && (i = i.id);
      const a = o.tasks.byId(i);
      this.setState({ _activeTask: a || null }, s);
    } }, { in: ["tasks", "selected"], out: ["_selected"], exec: (s) => {
      const { tasks: o, selected: i } = this.getState(), a = i.map((l) => o.byId(l)).filter((l) => !!l);
      this.setState({ _selected: a }, s);
    } }, { in: ["start", "end"], out: ["cellWidth"], exec: (s) => {
      const { _cellWidth: o, cellWidth: i } = this.getState();
      o != i && this.setState({ cellWidth: o }, s);
    } }], { tasks: (s) => new ga(s), links: (s) => new Qr(s), columns: (s) => hl(s) });
    const n = this.in = new la();
    n.on("show-editor", (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: i, segmentIndex: a } = s;
        if (i && (a || a === 0)) {
          this.setStateAsync({ activeTask: { id: i, segmentIndex: a } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }), n.on("select-task", ({ id: s, toggle: o, range: i, show: a, segmentIndex: l }) => {
      const { selected: c, _tasks: d, activeTask: u, splitTasks: h } = this.getState();
      let g = !1, m;
      if (c.length && (o || i)) {
        const w = [...c];
        if (i) {
          const x = w[w.length - 1], y = d.findIndex((C) => C.id == x), b = d.findIndex((C) => C.id == s), k = Math.min(y, b), T = Math.max(y, b) + 1, S = d.slice(k, T).map((C) => C.id);
          y > b && S.reverse(), S.forEach((C) => {
            w.includes(C) || w.push(C);
          });
        } else if (o) {
          const x = w.findIndex((y) => y == s);
          x === -1 ? w.push(s) : (g = !0, w.splice(x, 1));
        }
        m = w;
      } else m = [s];
      const f = { selected: m };
      a && m.length && (f._scrollTask = { id: m[0], mode: a }), this.setStateAsync(f), !g && u && (u !== s || h) && n.exec("show-editor", { id: s, ...h && { segmentIndex: l } });
    }), n.on("delete-link", ({ id: s }) => {
      const { links: o } = this.getState();
      o.remove(s), this.setStateAsync({ links: o });
    }), n.on("update-link", (s) => {
      const { links: o } = this.getState(), i = s.id;
      let a = s.link;
      o.update(i, a), a = o.byId(i), !a.lag && a.lag !== 0 && delete a.lag, this.setStateAsync({ links: o }), s.link = a;
    }), n.on("add-link", (s) => {
      const { link: o } = s, { links: i } = this.getState();
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || kr(), i.add(o), this.setStateAsync({ links: i }), s.id = o.id, s.link = i.byId(o.id));
    });
    let r = null;
    n.on("move-task", (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: a } = s;
      const { id: l, inProgress: c } = s, d = o.byId(l);
      if (typeof c > "u" ? s.source = d.parent : s.source = r = r ?? d.parent, c === !1) {
        o.update(d.id, { $reorder: !1 }), this.setState({ tasks: o }), r = null;
        return;
      }
      if (a === l || o.contains(l, a)) {
        s.skipProvider = !0;
        return;
      }
      if (i === "up" || i === "down") {
        const u = o.getBranch(l);
        let h = o.getIndexById(l);
        if (i === "up") {
          const g = d.parent === 0;
          if (h === 0 && g) {
            s.skipProvider = !0;
            return;
          }
          h -= 1, i = "before";
        } else if (i === "down") {
          const g = h === u.length - 1, m = d.parent === 0;
          if (g && m) {
            s.skipProvider = !0;
            return;
          }
          h += 1, i = "after";
        }
        if (a = u[h] && u[h].id || d.parent, a) {
          const g = o.getBranch(a);
          let m = o.getIndexById(a), f = g[m];
          if (f.data) {
            if (i === "before") {
              if (f.parent === d.parent) {
                for (; f.data; ) f.open || n.exec("open-task", { id: f.id, mode: !0 }), f = f.data[f.data.length - 1];
                a = f.id;
              }
            } else if (i === "after") {
              let y;
              f.parent === d.parent ? (y = f, f = f.data[0], a = f.id, i = "before") : g.length - 1 !== m && (y = f, m += 1, f = g[m], d.$level > f.$level && f.data ? (y = f, f = f.data[0], a = f.id, i = "before") : a = f.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const w = o.getSummaryId(d.id);
          o.move(l, i, a);
          const x = o.getSummaryId(l);
          w != x && (w && this.resetSummaryDates(w, "move-task"), x && this.resetSummaryDates(x, "move-task"));
        }
      } else {
        const u = o.byId(a);
        let h = u, g = !1;
        for (; h.$level > d.$level; ) h = o.byId(h.parent), h.id === l && (g = !0);
        if (g) return;
        const m = o.getSummaryId(d.id);
        if (o.move(l, i, a), i == "child") {
          let w = u;
          for (; w.id !== 0 && !w.open; ) n.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        }
        const f = o.getSummaryId(l);
        m != f && (m && this.resetSummaryDates(m, "move-task"), f && this.resetSummaryDates(f, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = a, s.mode = i;
    }), n.on("drag-task", (s) => {
      const o = this.getState(), { tasks: i, _tasks: a, _selected: l, _scales: c, cellWidth: d } = o, u = i.byId(s.id), { left: h, top: g, width: m, inProgress: f } = s, w = { _tasks: a, _selected: l };
      if (typeof m < "u" && (u.$w = m, ar(i, u, c, d)), typeof h < "u") {
        if (u.type === "summary") {
          const x = h - u.$x;
          ho(u, x, c, d);
        }
        u.$x = h, ar(i, u, c, d);
      }
      typeof g < "u" && (u.$y = g + 4, u.$reorder = f), typeof m < "u" && (u.$w = m), typeof h < "u" && (u.$x = h), typeof g < "u" && (u.$y = g + 4, u.$reorder = f), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: a, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: h, splitTasks: g, calendar: m } = this.getState(), f = d.byId(o), w = { durationUnit: h, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        vt(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = at(x);
      const b = Tr(x, m);
      if (a && (c.start && (c.start = y(c.start, a)), !i && i !== 0 && (c.start && c.end ? c.duration = f.duration : (c.start ? c.end = f.end : (c.end = y(c.end, a), c.start = f.start, c.duration = b(c.end, c.start)), b(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? f.type, m && c.start && (c.start = Yn(c.start, a, m)), c.start && c.end && (!Rt(c.start, f.start) || !Rt(c.end, f.end)) && c.type === "summary" && f.data?.length) {
        let T = a || b(c.start, f.start);
        m && (T = c.start > f.start ? b(c.start, f.start) : -b(f.start, c.start), y = Za(m)), this.moveSummaryKids(f, (S) => (S = y(S, T), m ? Yn(S, a, m) : S), "update-task");
      }
      c.start || (c.start = f.start), !c.end && !c.duration && (c.duration = f.duration), vt(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && f.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const k = d.getSummaryId(o);
      k && this.resetSummaryDates(k, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: i, unscheduledTasks: a, durationUnit: l, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: h, task: g, show: m, select: f = !0 } = s;
      !s.eventSource && a && (g.unscheduled = !0);
      let w = -1, x, y;
      if (u ? (y = o.byId(u), h == "child" ? (x = y, g.parent = x.id) : (y.parent !== null && (x = o.byId(y.parent), g.parent = x.id), w = o.getIndexById(u), h == "after" && (w += 1))) : g.parent && (x = o.byId(g.parent)), !g.start) {
        if (x?.start) g.start = new Date(x.start.valueOf());
        else if (y) g.start = new Date(y.start.valueOf());
        else {
          const S = o.getBranch(0);
          let C;
          if (S?.length) {
            const D = S[S.length - 1];
            if (!D.$skip) {
              const Y = new Date(D.start.valueOf());
              i.start <= Y && (C = Y);
            }
          }
          g.start = C || at(l, d)(i.start, 1);
        }
        g.duration = 1;
      }
      d && (g.start = Yn(g.start, 1, d)), this.getState().baselines && (g.base_start = g.start, g.base_duration = g.duration), vt(g, { durationUnit: l, calendar: d });
      const b = o.add(g, w), k = { tasks: o };
      if (x && m) {
        for (; x && x.id; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        k._scrollTask = { id: b.id, mode: m };
      }
      s.id = b.id;
      const T = o.getSummaryId(b.id);
      T && this.resetSummaryDates(T, "add-task"), this.setStateAsync(k), s.id = b.id, s.task = b, f && n.exec("select-task", { id: b.id });
    }), n.on("delete-task", (s) => {
      const { id: o } = s, { tasks: i, links: a, selected: l } = this.getState();
      s.source = i.byId(o).parent;
      const c = i.getSummaryId(o), d = [o];
      i.eachChild((h) => d.push(h.id), o), a.filter((h) => !(d.includes(h.source) || d.includes(h.target)));
      const u = { tasks: i, links: a };
      l.includes(o) && (u.selected = l.filter((h) => h !== o)), i.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(u);
    }), n.on("indent-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState();
      if (o) {
        const a = i.getBranch(s)[i.getIndexById(s) - 1];
        a && n.exec("move-task", { id: s, mode: "child", target: a.id });
      } else {
        const a = i.byId(s), l = i.byId(a.parent);
        l && l.parent !== null && n.exec("move-task", { id: s, mode: "after", target: a.parent });
      }
    }), n.on("copy-task", (s) => {
      const { id: o, target: i, mode: a, eventSource: l } = s;
      if (l === "copy-task") return;
      const { tasks: c, links: d } = this.getState();
      if (c.contains(o, i)) {
        s.skipProvider = !0;
        return;
      }
      const u = c.getSummaryId(o), h = c.getSummaryId(i);
      let g = c.getIndexById(i);
      a == "before" && (g -= 1);
      const m = c.byId(o), f = c.copy(m, c.byId(i).parent, g + 1);
      s.source = s.id, s.id = f[0][1], m.lazy && (s.lazy = !0), u != h && h && this.resetSummaryDates(h, "copy-task");
      let w = [];
      for (let x = 1; x < f.length; x++) {
        const [y, b] = f[x];
        d.forEach((k) => {
          if (k.source === y) {
            const T = { ...k };
            delete T.target, w.push({ ...T, source: b });
          } else if (k.target === y) {
            const T = { ...k };
            delete T.source, w.push({ ...T, target: b });
          }
        });
      }
      w = w.reduce((x, y) => {
        const b = x.findIndex((k) => k.id === y.id);
        return b > -1 ? x[b] = { ...x[b], ...y } : x.push(y), x;
      }, []);
      for (let x = 1; x < f.length; x++) {
        const [y, b] = f[x], k = c.byId(b);
        n.exec("copy-task", { source: y, id: b, lazy: !!k.lazy, eventSource: "copy-task", target: k.parent, mode: "child", skipUndo: !0 });
      }
      w.forEach((x) => {
        n.exec("add-link", { link: { source: x.source, target: x.target, type: x.type }, eventSource: "copy-task", skipUndo: !0 });
      }), this.setStateAsync({ tasks: c });
    }), n.on("open-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState(), a = i.byId(s);
      a.lazy ? n.exec("request-data", { id: a.id }) : (i.toArray().forEach((l) => l.$y = 0), i.update(s, { open: o }), this.setState({ tasks: i }));
    }), n.on("scroll-chart", ({ left: s, top: o }) => {
      if (!isNaN(s)) {
        const i = this.calcScaleDate(s);
        this.setState({ scrollLeft: s, _scaleDate: i });
      }
      isNaN(o) || this.setState({ scrollTop: o });
    }), n.on("render-data", (s) => {
      this.setState({ area: s });
    }), n.on("provide-data", (s) => {
      const { tasks: o, links: i, durationUnit: a, calendar: l, splitTasks: c } = this.getState(), d = o.byId(s.id);
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], lr(s.data.tasks, { durationUnit: a, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Qr(i.map((u) => u).concat(wo(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: a, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let h = a;
      s < 0 && (h = l || a);
      const g = h + s * 50, m = i.levels[i.level], f = s < 0 && a > m.maxCellWidth;
      if (g < m.minCellWidth || g > m.maxCellWidth || f) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: g, _cellWidth: g });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: b } = this.getState(), k = ft(w.minUnit, x, b), T = w.diff(u, k, "hour");
      typeof o > "u" && (o = y);
      let S = Math.round(T * y) - o;
      S < 0 && (S = 0), this.setState({ scrollLeft: S, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: a, end: l, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: h } = this.getState(), g = at(i.minUnit);
      let m = i.width;
      if (a && l) {
        if (m < s && m) {
          const b = s / m;
          this.setState({ cellWidth: d * b });
        }
        return !0;
      }
      let f = 0;
      for (; m < s; ) m += d, f++;
      const w = f ? l ? -f : -1 : 0, x = a || g(o, w);
      let y = 0;
      if (u) {
        const b = i.diff(u, x, "hour");
        y = Math.max(0, Math.round(b * d) - (h || 0));
      }
      this.setState({ _start: x, _end: l || g(c, f), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: i }) => {
      const a = this.getState(), { tasks: l } = a;
      let c = a._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && i ? (c.forEach((h, g) => {
        h.key === s && (u = g);
      }), c[u] = d) : c = [d], l.sort(c), this.setState({ _sort: c, tasks: l });
    }), n.on("hotkey", ({ key: s, event: o, eventSource: i }) => {
      switch (s) {
        case "arrowup":
        case "arrowdown": {
          const { selected: a, _tasks: l } = this.getState();
          o.preventDefault();
          const c = a.length;
          let d;
          if (s === "arrowup" ? d = c ? this.getPrevRow(a[c - 1])?.id : l[l.length - 1]?.id : d = c ? this.getNextRow(a[c - 1])?.id : l[0]?.id, d) {
            const u = i === "chart" ? "xy" : !0;
            this.in.exec("select-task", { id: d, show: u });
          }
          break;
        }
        case "ctrl+c": {
          At(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          At(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          At(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), At(this, "delete-task", null, null);
          break;
        }
        case "ctrl+z": {
          this.in.exec("undo", {});
          break;
        }
        case "ctrl+y": {
          this.in.exec("redo", {});
          break;
        }
      }
    });
  }
  init(e) {
    const n = this.getState().area ? {} : { scrollLeft: 0, scrollTop: 0, area: { from: 0, start: 0, end: 0 } };
    e.cellWidth && (e._cellWidth = e.cellWidth), e._sort = null, e.unscheduledTasks = !1, e.baselines = !1, e.markers = [], e._markers = [], e.undo = !1, e.schedule = {}, e.criticalPath = null, e.splitTasks = !1, Array.isArray(e.tasks) && this.getHistory()?.resetHistory(), this._router.init({ _scrollTask: null, selected: [], markers: [], autoScale: !0, durationUnit: "day", ...n, ...e });
  }
  setState(e, n) {
    return this._router.setState(e, n);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getTask(e) {
    const { tasks: n } = this.getState();
    return n.byId(e);
  }
  getHistory() {
    return this.getState().undo ? this._modules.get("historyManager") : null;
  }
  serialize() {
    const { tasks: e } = this.getState();
    return e.serialize();
  }
  changeScale(e, n) {
    const r = e.level + n, s = e.levels[r];
    if (s) {
      const { cellWidth: o, scales: i, _scales: a } = this.getState(), l = rl(e, n, r, s, a.lengthUnit, i, o);
      return l._cellWidth = l.cellWidth, this.setState(l), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks ? e.some((n) => !n.unscheduled || n.data && this.isScheduled(n.data)) : !0;
  }
  resetSummaryDates(e, n, r) {
    const { tasks: s, durationUnit: o, splitTasks: i, calendar: a } = this.getState(), l = s.byId(e), c = l.data;
    if (c?.length && this.isScheduled(c)) {
      const d = Nr({ ...l, start: void 0, end: void 0, duration: void 0 });
      if (!Rt(l.start, d.start) || !Rt(l.end, d.end)) {
        r ? (vt(d, { durationUnit: o, calendar: a }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: n, skipUndo: !0 });
        const u = s.getSummaryId(e);
        u && this.resetSummaryDates(u, n);
      }
    }
  }
  moveSummaryKids(e, n, r) {
    const { tasks: s } = this.getState();
    e.data.forEach((o) => {
      const i = { ...s.byId(o.id), start: n(o.start) };
      delete i.end, delete i.id, this.in.exec("update-task", { id: o.id, task: i, eventSource: r, skipUndo: !0 }), o.data?.length && this.moveSummaryKids(o, n, r);
    });
  }
  calcScaleDate(e) {
    const { _scales: n, _start: r, _weekStart: s } = this.getState(), o = n.lengthUnit === "day" ? n.lengthUnitWidth / 24 : n.lengthUnitWidth;
    return at("hour")(ft(n.minUnit, r, s), Math.floor(e / o));
  }
  getNextRow(e) {
    const n = this.getState()._tasks, r = n.findIndex((s) => s.id == e);
    return n[r + 1];
  }
  getPrevRow(e) {
    const n = this.getState()._tasks, r = n.findIndex((s) => s.id == e);
    return n[r - 1];
  }
}
function wl(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = xl(s, t, e, 1, n);
    yl(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function xl(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function yl(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function cr(t) {
  return [...bo];
}
function Mr(t) {
  return t.map((e) => {
    switch (e.data && Mr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => kl(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => bl(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => Sl(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => vl(n);
        break;
    }
    return e;
  });
}
function vl(t) {
  return t.parent === 0;
}
function kl(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function bl(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function Sl(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function as(t) {
  return t && typeof t == "object";
}
function $l(t) {
  return !t.selected || t.selected.length < 2;
}
const Cl = (t) => (e) => e.type === t, bo = Mr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: Cl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => as(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => $l(e) && as(n) }]);
function dr(t) {
  return [...So];
}
const So = Mr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Kn(t) {
  return t.type === "summary";
}
function Gn(t) {
  return t.type === "milestone";
}
function Bn(t) {
  return typeof t.parent > "u";
}
function jn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function $o(t) {
  return [...Co];
}
const Co = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Bn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Kn(t), isDisabled: jn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Kn(t) || Gn(t), isDisabled: jn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Kn(t) || Gn(t), isDisabled: jn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Gn(t) || Bn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Bn(t) }], _o = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], wt = Wt(null);
(/* @__PURE__ */ new Date()).valueOf();
(/* @__PURE__ */ new Date()).valueOf();
function _l(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var Tl = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  configure(e, n) {
    this.node = n;
    for (const r in e) if (e[r]) {
      const s = r.toLowerCase().replace(/[ ]/g, ""), o = e[r];
      this.store.set(s, o);
    }
  }
}, Lt = [], Nl = { subscribe: (t) => {
  Dl();
  const e = new Tl();
  return Lt.push(e), t(e), () => {
    const n = Lt.findIndex((r) => r === e);
    n >= 0 && Lt.splice(n, 1);
  };
} }, ls = !1;
function Dl() {
  ls || (ls = !0, document.addEventListener("keydown", (t) => {
    if (Lt.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Lt.length - 1; s >= 0; s--) {
        const o = Lt[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
function To(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return a.tagName === "INPUT" || a.tagName === "TEXTAREA" || _l(a, "data-header-id")?.classList.contains("wx-filter") || !!a.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < "u" && (typeof a == "function" ? s[i] = a : a && (s[i] = (l) => {
      const c = r(l);
      n({ key: i, event: l, isInput: c });
    }));
  }
  const o = Nl.subscribe((i) => {
    i.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function kt(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function Ml(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function cs(t) {
  return t && t.getAttribute("data-context-id");
}
const ds = 5;
function El(t, e) {
  let n, r, s, o, i, a, l, c, d;
  function u(S) {
    o = S.clientX, i = S.clientY, a = {
      ...Ml(n, t, S),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(S) {
    n = Be(S), cs(n) && (s = kt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", g), window.addEventListener("touchend", b));
  }
  function g(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = Be(S), cs(n) && (s = kt(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", k), u(S)));
  }
  function f(S) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", b), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", h));
  }
  function w(S) {
    const C = S.clientX - o, D = S.clientY - i;
    if (!r) {
      if (Math.abs(C) < ds && Math.abs(D) < ds || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const Y = Math.round(Math.max(0, a.top + D));
      if (e && e.move && e.move({ id: s, top: Y, detail: l }) === !1)
        return;
      const _ = e.getTask(s), M = _.$y;
      if (!a.start && a.y == M) return T();
      a.start = !0, a.y = _.$y - 4, r.style.top = Y + "px";
      const P = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), H = Be(P);
      if (H && H !== n) {
        const I = kt(H), L = H.getBoundingClientRect(), ce = L.top + L.height / 2, ue = S.clientY + a.db > ce && H.nextElementSibling !== n, re = S.clientY - a.dt < ce && H.previousElementSibling !== n;
        l?.after == I || l?.before == I ? l = null : ue ? l = { id: s, after: I } : re && (l = { id: s, before: I });
      }
    }
  }
  function x(S) {
    w(S);
  }
  function y(S) {
    c ? (S.preventDefault(), w(S.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function b() {
    c = null, d && (clearTimeout(d), d = null), T();
  }
  function k() {
    T();
  }
  function T() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: a.top })), s = n = r = a = l = null, f();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", h), {
    destroy() {
      f(!0);
    }
  };
}
const Il = {
  grid: {
    "Add before": "Add before",
    "Add after": "Add after",
    Copy: "Copy",
    Cut: "Cut",
    Paste: "Paste",
    Delete: "Delete",
    "New row": "New row",
    "Move up": "Move up",
    "Move down": "Move down",
    Undo: "Undo",
    Redo: "Redo"
  }
};
(/* @__PURE__ */ new Date()).valueOf();
function Rl(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!ln(r, s)) return !1;
  }
  return !0;
}
function ln(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime()) return !1;
  if (typeof t == "object") if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    for (let n = t.length - 1; n >= 0; n--) if (!ln(t[n], e[n])) return !1;
    return !0;
  } else return Rl(t, e);
  return t === e;
}
function ur(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(ur);
  const e = {};
  for (const n in t) e[n] = ur(t[n]);
  return e;
}
var No = 2, Al = class {
  constructor(e) {
    e && (this._writable = e.writable, this._async = e.async), this._values = {}, this._state = {};
  }
  setState(e, n = 0) {
    const r = {};
    return this._wrapProperties(e, this._state, this._values, "", r, n), r;
  }
  getState() {
    return this._values;
  }
  getReactive() {
    return this._state;
  }
  _wrapProperties(e, n, r, s, o, i) {
    for (const a in e) {
      const l = n[a], c = r[a], d = e[a];
      if (l && (c === d && typeof d != "object" || d instanceof Date && c instanceof Date && c.getTime() === d.getTime())) continue;
      const u = s + (s ? "." : "") + a;
      l ? (l.__parse(d, u, o, i) && (r[a] = d), i & No ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[a] = this._wrapNested(d, d, u, o) : n[a] = this._wrapWritable(d), r[a] = d), o[u] = o[u] || null;
    }
  }
  _wrapNested(e, n, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, n, r, s, 0), o.__parse = (i, a, l, c) => (this._wrapProperties(i, o, n, a, l, c), !1), o;
  }
  _wrapWritable(e) {
    const n = [], r = function() {
      for (let s = 0; s < n.length; s++) n[s](e);
    };
    return { subscribe: (s) => (n.push(s), this._async ? setTimeout(s, 1, e) : s(e), () => {
      const o = n.indexOf(s);
      o >= 0 && n.splice(o, 1);
    }), __trigger: () => {
      n.length && (this._async ? setTimeout(r, 1) : r());
    }, __parse: function(s) {
      return e = s, !0;
    } };
  }
}, Hl = class {
  constructor(e, n, r, s) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = n, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((o) => {
      o.in.forEach((i) => {
        const a = this._triggers.get(i) || [];
        a.push(o), this._triggers.set(i, a);
      }), o.out.forEach((i) => {
        const a = this._sources.get(i) || {};
        o.in.forEach((l) => a[l] = !0), this._sources.set(i, a);
      });
    }), this._routes.forEach((o) => {
      o.length = Math.max(...o.in.map((i) => Do(i, this._sources, 1)));
    }), this._bus = s;
  }
  init(e) {
    const n = {};
    for (const r in e) if (this._prev[r] !== e[r]) {
      const s = this._parsers[r];
      n[r] = s ? s(e[r]) : e[r];
    }
    this._prev = this._prev ? { ...this._prev, ...e } : { ...e }, this.setState(n), this._bus && this._bus.exec("init-state", n);
  }
  setStateAsync(e) {
    const n = this._setter(e, No);
    return this._async ? Object.assign(this._async.signals, n) : this._async = { signals: n, timer: setTimeout(this._applyState.bind(this), 1) }, n;
  }
  _applyState() {
    const e = this._async;
    if (e) {
      this._async = null, this._triggerUpdates(e.signals, []);
      for (const n in e.signals) {
        const r = e.signals[n];
        r && r();
      }
    }
  }
  setState(e, n = []) {
    const r = this._setter(e);
    return this._triggerUpdates(r, n), r;
  }
  _triggerUpdates(e, n) {
    const r = Object.keys(e), s = !n.length;
    n = n || [];
    for (let o = 0; o < r.length; o++) {
      const i = r[o], a = this._triggers.get(i);
      a && a.forEach((l) => {
        n.indexOf(l) == -1 && n.push(l);
      });
    }
    s && this._execNext(n);
  }
  _execNext(e) {
    for (; e.length; ) {
      e.sort((r, s) => r.length < s.length ? 1 : -1);
      const n = e[e.length - 1];
      e.splice(e.length - 1), n.exec(e);
    }
  }
};
function Do(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Do(o, e, n + 1));
  return Math.max(...s);
}
var Ll = class {
  constructor() {
    this._nextHandler = null, this._handlers = {}, this._tag = /* @__PURE__ */ new WeakMap(), this.exec = this.exec.bind(this);
  }
  on(t, e, n) {
    let r = this._handlers[t];
    r ? n && n.intercept ? r.unshift(e) : r.push(e) : r = this._handlers[t] = [e], n && n.tag && this._tag.set(e, n.tag);
  }
  intercept(t, e, n) {
    this.on(t, e, { ...n, intercept: !0 });
  }
  detach(t) {
    for (const e in this._handlers) {
      const n = this._handlers[e];
      for (let r = n.length - 1; r >= 0; r--) this._tag.get(n[r]) === t && n.splice(r, 1);
    }
  }
  async exec(t, e) {
    const n = this._handlers[t];
    if (n) for (let r = 0; r < n.length; r++) {
      const s = n[r](e);
      if (s === !1 || s && s.then && await s === !1) return;
    }
    return this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
};
function Ol(t) {
  return (e) => e[t];
}
function Pl(t) {
  return (e, n) => e[t] = n;
}
function Ct(t, e) {
  return (e.getter || Ol(e.id))(t);
}
function us(t, e, n) {
  return (e.setter || Pl(e.id))(t, n);
}
function fs(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function mt(t, e) {
  let n = Ct(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function Wl(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, a = t.flatData;
  e.header !== !1 && i[0].header && (r = hs("header", i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = mt(a[l], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = hs("footer", i, r, o, s)), r;
}
function hs(t, e, n, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][t].length; i++) {
    const a = [];
    for (let l = 0; l < e.length; l++) {
      let c = (e[l][t][i].text || "") + "";
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), a.push(c);
    }
    n += (n ? s : "") + a.join(r);
  }
  return n;
}
function zl(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const a = t._columns, l = t.flatData, c = t._sizes;
  for (const u of a) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && a[0].header && (gs("header", a, r, s, d, e, n), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += a[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const h = [];
    for (let g = 0; g < a.length; g++) {
      const m = l[u], f = a[g], w = Ct(m, f) ?? "";
      let x = mt(m, f), y;
      e.cellStyle && (y = e.cellStyle(w, m, f)), e.cellTemplate && (x = e.cellTemplate(w, m, f) ?? x);
      const b = Mo(x, 2, y, n);
      h.push(b);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && a[0].footer && (gs("footer", a, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function gs(t, e, n, r, s, o, i) {
  for (let a = 0; a < e[0][t].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][a], u = d.colspan ? d.colspan - 1 : 0, h = d.rowspan ? d.rowspan - 1 : 0;
      (u || h) && r.push({ from: { row: a + s, column: c }, to: { row: a + s + h, column: c + u } });
      let g = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(g, d, e[c], t)), o.headerCellTemplate && (g = o.headerCellTemplate(g, d, e[c], t) ?? g);
      let f;
      t == "header" ? a == e[0][t].length - 1 ? f = 1 : f = 0 : a ? f = 4 : f = 3;
      const w = Mo(g, f, m, i);
      l.push(w);
    }
    n.push(l);
  }
}
function Mo(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Ul(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => ln(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function Fl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], a = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...l, borderBottom: a, borderRight: a };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Ul(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Yl = "portrait", Vl = 100, Kl = "a4", Gl = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Bl(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((a) => !a.hidden), i = jl(e);
  return o.forEach((a, l) => {
    s + a.width <= i ? (s += a.width, r.push(a)) : (r.length && n.push(r), r = [a], s = a.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function ps(t, e, n) {
  const r = [];
  return t.forEach((s, o) => {
    const i = s[e];
    for (let a = 0; a < n.length; a++) {
      r[a] || (r[a] = []);
      const l = { ...i[a] };
      if (r[a][o] !== null) {
        if (!o && !l.rowspan && !l.colspan) {
          let c = 1, d = t[o + c][e][a], u = l.width;
          for (; !d.rowspan && !d.colspan; ) c++, d = t[o + c][e][a], u += d.width;
          l.colspan = c, l.width = u, l.height = n[a];
        }
        if (r[a].push(l), !l.collapsed && l.colspan > 1) {
          let c = l.colspan - 1;
          if (l.colspan + o > t.length) {
            const d = l.colspan - (l.colspan + o - t.length);
            l.colspan = d, l.width = t.slice(o, o + c + 1).reduce((u, h) => u + h.width, 0), d > 1 && (c = d - 1);
          }
          for (let d = 0; d < c; d++) r[a].push(null);
        }
        if (l.rowspan > 1) {
          const c = l.rowspan;
          for (let d = 1; d < c; d++) r[a + d] || (r[a + d] = []), r[a + d].push(null);
        }
      }
    }
    if (s.collapsed) for (let a = 0; a < r.length; a++) {
      const l = r[a], c = l[o];
      if (c && c.collapsed) {
        if (l[o] = null, !a) break;
      } else {
        const d = c || l.findLast((u) => u?.colspan >= 1);
        d && (d.colspan = d.colspan - 1, d.width = d.width - s.width);
      }
    }
  }), r.map((s) => s.filter((o) => o && o.colspan !== 0));
}
function jl(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Gl[r];
  return ql(e === "portrait" ? s : o, n);
}
function ql(t, e) {
  return t * e;
}
function Xl(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || Yl, ppi: n || Vl, paper: r || Kl };
}
function Eo(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Ql(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const ms = ["resize-column", "hide-column", "update-cell"], Jl = ["delete-row", "update-row", "update-cell"], Zl = ["move-item"], ec = ["resize-column", "move-item"];
let tc = class {
  undo = [];
  redo = [];
  progress = {};
  in;
  getState;
  setState;
  _previousValues = {};
  constructor(e, n, r) {
    this.in = e, this.getState = n, this.setState = r, this.setHandlers(), this.resetStateHistory();
  }
  getHandlers() {
    return { "add-row": { handler: (e) => ({ action: "delete-row", data: { id: e.id }, source: { action: "add-row", data: e } }) }, "delete-row": { handler: (e) => {
      const { id: n } = e, { data: r } = this.getPrev(), s = r.findIndex((o) => o.id == n);
      return { action: "add-row", data: { id: n, row: r[s], before: s < r.length - 1 ? r[s + 1].id : void 0 }, source: { action: "delete-row", data: e } };
    } }, "update-cell": { handler: (e) => {
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), i = Ct(s, o);
      return ln(i, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: i }, source: { action: "update-cell", data: e } };
    } }, "update-row": { handler: (e) => {
      const { id: n, row: r } = e, s = this.getRow(n);
      for (const o in r) Object.keys(s).includes(o) || (s[o] = void 0);
      return { action: "update-row", data: { id: n, row: s }, source: { action: "update-row", data: e } };
    } }, "copy-row": { handler: (e) => {
      const { id: n } = e, { data: r } = this.getState(), s = r.findIndex((i) => i.id == n), o = r[s];
      return { action: "delete-row", data: { id: n }, source: { action: "add-row", data: { id: n, row: o, before: s < r.length - 1 ? r[s + 1].id : void 0 } } };
    } }, "resize-column": { handler: (e) => {
      const { id: n, width: r } = e, s = this.getColumn(n), { _sizes: o } = this.getState();
      return { action: "resize-column", data: { id: n, width: s.width ?? o.columnWidth }, source: { action: "resize-column", data: { id: n, width: r } } };
    } }, "hide-column": { handler: (e) => {
      const { id: n } = e, r = this.getColumn(n);
      return { action: "hide-column", data: { id: n, mode: r.hidden }, source: { action: "hide-column", data: e } };
    } }, "collapse-column": { handler: (e) => {
      const { id: n, row: r, mode: s } = e;
      return { action: "collapse-column", data: { id: n, row: r, mode: typeof s == "boolean" ? !s : s }, source: { action: "collapse-column", data: e } };
    } }, "move-item": { handler: (e) => {
      const { id: n, target: r, mode: s } = e, { flatData: o } = this.getPrev(), i = o.findIndex((a) => a.id == n);
      return { action: "move-item", data: { id: n, target: o[i + (i ? -1 : 1)].id, mode: i ? "after" : "before" }, source: { action: "move-item", data: { id: n, target: r, mode: s } } };
    } }, "open-row": { handler: (e) => {
      const { id: n, nested: r } = e;
      return { action: "close-row", data: { id: n, nested: r }, source: { action: "open-row", data: e } };
    } }, "close-row": { handler: (e) => {
      const { id: n, nested: r } = e;
      return { action: "open-row", data: { id: n, nested: r }, source: { action: "close-row", data: e } };
    } } };
  }
  resetHistory() {
    this.undo = [], this.redo = [], this.progress = {}, this.resetStateHistory();
  }
  getPrev() {
    return this._previousValues;
  }
  setHandlers() {
    const e = this.getHandlers();
    for (const n in e) this.in.intercept(n, (r) => {
      if (!(r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo)) {
        if (ec.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Zl.includes(n) && this.setPrev("flatData"), ms.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Jl.includes(n) && this.setPrev("data"), ms.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = ur(this.getState()[e]);
  }
  addToHistory(e) {
    this.undo.push(e), this.redo = [], this.setStateHistory();
  }
  handleUndo() {
    if (!this.undo.length) return;
    const e = this.undo.pop();
    this.redo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "undo" }), this.setStateHistory();
  }
  handleRedo() {
    if (!this.redo.length) return;
    const e = this.redo.pop();
    this.undo.push({ ...e.source, source: e }), this.in.exec(e.action, { ...e.data, eventSource: "redo" }), this.setStateHistory();
  }
  resetStateHistory() {
    this.setState({ history: { undo: 0, redo: 0 } });
  }
  setStateHistory() {
    this.setState({ history: { undo: this.undo.length, redo: this.redo.length } });
  }
  getRow(e) {
    const { data: n } = this.getPrev();
    return this.getState().tree ? this.getTreeRow(n, e) : n.find((r) => r.id == e);
  }
  getTreeRow(e, n) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == n) return e[r];
      if (e[r].data) {
        const s = this.getTreeRow(e[r].data, n);
        if (s) return s;
      }
    }
    return null;
  }
  getColumn(e) {
    const { columns: n } = this.getPrev();
    return n.find((r) => r.id == e);
  }
};
function Io() {
  let t = !0;
  return t = !1, t;
}
function Ro(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function nc(t, e) {
  return -Ro(t, e);
}
function rc(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? Ro : nc;
  return function(r, s) {
    return n(Ct(r, e), Ct(s, e));
  };
}
function sc(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return rc(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const vn = 28, oc = 20;
function ic() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Dn(t, e, n, r, s) {
  const o = document.createElement("div"), i = document.createElement("div"), a = document.body;
  s = s ? `${s}px` : "auto";
  let l, c;
  i.className = e, o.classList.add(`wx-${n}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(i), a.appendChild(o), typeof t != "object" && (t = [t]);
  for (let d = 0; d < t.length; d++) {
    i.innerText = t[d] + "";
    const u = o.getBoundingClientRect(), h = Math.ceil(u.width) + (r && r.length ? r[d] : 0), g = Math.ceil(u.height);
    l = Math.max(l || 0, h), c = Math.max(c || 0, g);
  }
  return o.remove(), { width: l, height: c };
}
function ws(t, e, n, r, s) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const a = t[i][e], l = a.length;
    for (let c = 0; c < l; c++) {
      const { text: d, vertical: u, collapsed: h, rowspan: g, css: m } = a[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let f = 0;
      if (u && !h) {
        let w = `wx-measure-cell-${e}`;
        if (w += m ? ` ${m}` : "", f = Dn(d, w, s).width, (g > 1 || !a[c + 1]) && n > c + 1) {
          const x = g || n - c, y = o.slice(c, c + x).reduce((b, k) => b + k, 0);
          if (y < f) {
            const b = Math.ceil((f - y) / x);
            for (let k = c; k < c + x; k++) o[k] = (o[k] || r) + b;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, f);
    }
  }
  return o;
}
function ac(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const a = e[i], l = mt(a, t);
    l && (r.push(l), t.treetoggle ? s.push(e[i].$level * vn + (e[i].$count ? vn : 0) + (t.draggable ? vn : 0)) : t.draggable && s.push(vn));
  }
  return Dn(r, o, n, s).width;
}
function lc(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? oc : 0;
  let s = t.header;
  if (typeof s == "string") return Dn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i], l = typeof a == "string" ? a : a.text, c = n + (typeof a == "string" ? "" : ` ${a.css}`);
    let d = Dn(l, c, e).width;
    i === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const cc = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function dc(t) {
  return cc[t];
}
class uc extends Al {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new Hl(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: a } = this.getState(), l = this.copyColumns(o), c = l.reduce((h, g) => Math.max(g.header.length, h), 0), d = l.reduce((h, g) => Math.max(g.footer.length, h), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, i, c, d, a);
      for (let h = 0; h < l.length; h++) this.normalizeColumns(l, h, "header", c, u), this.normalizeColumns(l, h, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: a, _filterIds: l } = this.getState(), c = l && new Set(l), d = i ? this.flattenRows(o, [], l) : c ? o.filter((h) => c.has(h.id)) : o, u = !a && d.some((h) => h.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new Ll();
    r.on("close-editor", ({ ignore: s }) => {
      const { editor: o } = this.getState();
      o && (s || r.exec("update-cell", o), this.setState({ editor: null }));
    }), r.on("open-editor", ({ id: s, column: o }) => {
      let i = this.getState().editor;
      i && r.exec("close-editor", {});
      const a = this.getRow(s), l = o ? this.getColumn(o) : this.getNextEditor(a);
      if (l?.editor) {
        let c = l.editor;
        if (typeof c == "function" && (c = c(a, l)), !c) return;
        i = { column: l.id, id: s, value: Ct(a, l) ?? "", renderedValue: mt(a, l) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), l.options && !i.options && (i.options = l.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: a, _filterIds: l } = o, { row: c, before: d, after: u, select: h } = s;
      if (s.id = c.id = s.id || c.id || kn(), d || u) {
        const m = d || u, f = i.findIndex((w) => w.id === m);
        i = [...i], i.splice(f + (u ? 1 : 0), 0, s.row);
      } else i = [...i, s.row];
      const g = { data: i };
      l && (g._filterIds = [...l, s.id]), this.setState(g), !(typeof h == "boolean" && !h) && (h || a) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: i, focusCell: a, editor: l } = this.getState(), { id: c } = s, d = { data: o.filter((u) => u.id !== c) };
      this.isSelected(c) && (d.selectedRows = i.filter((u) => u !== c)), l?.id == c && (d.editor = null), this.setState(d), a?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: i } = o;
      i = [...i];
      const { tree: a } = o, { id: l, column: c, value: d } = s, u = this.getColumn(c);
      if (a) {
        const h = { ...this._branches[l] };
        us(h, u, d);
        const g = this.updateTreeRow(h);
        h.$parent === 0 && (i = g);
      } else {
        const h = i.findIndex((m) => m.id == l), g = { ...i[h] };
        us(g, u, d), i[h] = g;
      }
      this.setState({ data: i });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: i, row: a } = s, l = o.findIndex((c) => c.id == i);
      o = [...o], o[l] = { ...o[l], ...a }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: i, mode: a, show: l, column: c }) => {
      const d = this.getState(), { focusCell: u } = d;
      let { selectedRows: h } = d;
      if (h.length || (i = o = !1), i) {
        const { data: g } = this.getState();
        let m = g.findIndex((w) => w.id == h[h.length - 1]), f = g.findIndex((w) => w.id == s);
        m > f && ([m, f] = [f, m]), g.slice(m, f + 1).forEach((w) => {
          h.indexOf(w.id) === -1 && h.push(w.id);
        });
      } else if (o && this.isSelected(s)) {
        if (a === !0) return;
        h = h.filter((g) => g !== s);
      } else if (o) {
        if (a === !1) return;
        h.push(s);
      } else h = [s];
      this.setState({ selectedRows: [...h] }), u?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), l && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: i, eventSource: a } = s, { _columns: l, split: c } = this.getState();
      o && i ? (this.setState({ focusCell: { row: o, column: i } }), a !== "click" && ((!c.left || l.findIndex((d) => d.id == s.column) >= c.left) && (!c.right || l.findIndex((d) => d.id == s.column) < l.length - c.right) ? this.in.exec("scroll", { row: o, column: i }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: i, maxRows: a, inProgress: l } = s;
      if (l === !1) return;
      let c = s.width || 0;
      const d = [...this.getState().columns], u = d.find((h) => h.id == o);
      if (i) {
        if (i == "data" || i === !0) {
          const { flatData: h, _skin: g } = this.getState();
          let m = h.length;
          a && (m = Math.min(a, m));
          const f = h.slice(0, m);
          c = ac(u, f, g);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(lc(u, h), c);
        }
      }
      u.width = Math.max(17, c), delete u.flexgrow, this.setState({ columns: d });
    }), r.on("hide-column", (s) => {
      const { id: o, mode: i } = s, a = [...this.getState().columns], l = a.find((d) => d.id == o), c = a.reduce((d, u) => d + (u.hidden ? 0 : 1), 0);
      !i || c > 1 ? (l.hidden = !l.hidden, this.setState({ columns: a })) : s.skipUndo = !0;
    }), r.on("sort-rows", (s) => {
      const { key: o, add: i, sort: a } = s, l = this.getState(), { columns: c, data: d, tree: u } = l;
      if (a) {
        const y = [...d];
        y.sort(a), this.setState({ data: y });
        return;
      }
      const { order: h = "asc" } = s;
      let g = l.sortMarks;
      const m = Object.keys(g), f = m.length;
      !i || !f || f === 1 && g[o] ? g = { [o]: { order: h } } : (f === 1 && (g[m[0]] = { ...g[m[0]], index: 0 }), g = { ...g, [o]: { order: h, index: typeof i == "number" ? i : g[o]?.index ?? f } });
      const w = Object.keys(g).sort((y, b) => g[y].index - g[b].index).map((y) => ({ key: y, order: g[y].order }));
      this.setState({ sortMarks: g });
      const x = sc(w, c);
      if (x) {
        const y = [...d];
        u ? this.sortTree(y, x) : y.sort(x), this.setState({ data: y });
      }
    }), r.on("filter-rows", (s) => {
      const { value: o, key: i, filter: a } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const l = this.getState(), { data: c, tree: d } = l;
      let u = l.filterValues;
      const h = {};
      i && (u = { ...u, [i]: o }, h.filterValues = u);
      const g = a ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, g, m) : c.forEach((f) => {
        g(f) && m.push(f.id);
      }), h._filterIds = m, this.setState(h);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: i, mode: a } = s, l = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[i] : c;
      typeof d == "object" && (d.collapsed = a ?? !d.collapsed, this.setState({ columns: l }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: i } = s;
      let { target: a, mode: l = "after" } = s;
      const { data: c, flatData: d, tree: u } = this.getState(), h = d.findIndex((f) => f.id == o);
      let g;
      if (l === "up" || l === "down") {
        if (l === "up") {
          if (h === 0) return;
          g = h - 1, l = "before";
        } else if (l === "down") {
          if (h === d.length - 1) return;
          g = h + 1, l = "after";
        }
        a = d[g] && d[g].id;
      } else g = d.findIndex((f) => f.id == a);
      if (h === -1 || g === -1 || i === !1) return;
      let m;
      u ? m = this.moveItem(o, a, c, l) : m = this.moveItem(o, a, c, l), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: i, mode: a = "after" } = s, l = this.getState(), { flatData: c, _filterIds: d } = l;
      let { data: u } = l;
      const h = this.getRow(o);
      if (!h) return;
      const g = { ...h, id: kn() };
      s.id = g.id;
      const m = c.findIndex((w) => w.id == i);
      if (m === -1) return;
      u.splice(m + (a === "after" ? 1 : 0), 0, g), u = [...u];
      const f = { data: u };
      d && (f._filterIds = [...d, g.id]), this.setState(f);
    }), r.on("open-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !0, i);
    }), r.on("close-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !1, i);
    }), r.on("export", (s) => new Promise((o, i) => {
      const a = s.options || {}, l = `${a.fileName || "data"}.${a.format}`;
      if (a.format == "csv") {
        const c = Wl(this.getState(), a);
        a.download !== !1 ? fs(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (a.format == "xlsx") {
        let c = a.styles;
        !c && c !== !1 && (c = Fl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: g, rowSizes: m, colSizes: f, styles: w } = zl(this.getState(), a, u), x = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (b) => {
            if (b.data.type == "ready") {
              const k = b.data.blob;
              a.download !== !1 ? fs(k, l) : s.result = k, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: a.sheetName || "data", cells: h, cols: f, rows: m, merged: g }], styles: w } });
        });
      } else i();
    })), r.on("search-rows", (s) => {
      const { search: o, columns: i } = s, a = this.searchRows(o, i);
      this.setState({ search: { value: o, rows: a } });
    }), r.on("hotkey", ({ key: s, event: o, isInput: i }) => {
      switch (s) {
        case "arrowup": {
          const { flatData: a, focusCell: l, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const d = l ? l.column : this._getFirstVisibleColumn()?.id, u = l ? this.getPrevRow(l.row)?.id : a[a.length - 1]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowdown": {
          const { flatData: a, focusCell: l, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const d = l ? l.column : this._getFirstVisibleColumn()?.id, u = l ? this.getNextRow(l.row)?.id : a[0]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowright": {
          const { focusCell: a } = this.getState();
          if (i) return;
          if (o.preventDefault(), a) {
            const l = this.getNextColumn(a.column, !0)?.id;
            l && this.in.exec("focus-cell", { row: a.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "arrowleft": {
          const { focusCell: a } = this.getState();
          if (i) return;
          if (o.preventDefault(), a) {
            const l = this.getPrevColumn(a.column, !0)?.id;
            l && this.in.exec("focus-cell", { row: a.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "tab": {
          const { editor: a, focusCell: l, select: c } = this.getState();
          if (a) {
            o.preventDefault();
            const d = a.column;
            let u = a.id, h = this.getNextEditor(this.getRow(u), this.getColumn(d));
            if (!h) {
              const g = this.getNextRow(u);
              g && (u = g.id, h = this.getNextEditor(g));
            }
            h && (this.in.exec("open-editor", { id: u, column: h.id }), this.in.exec("focus-cell", { row: u, column: h.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: a, focusCell: l, select: c } = this.getState();
          if (a) {
            o.preventDefault();
            const d = a.column;
            let u = a.id, h = this.getPrevEditor(this.getRow(u), this.getColumn(d));
            if (!h) {
              const g = this.getPrevRow(u);
              g && (u = g.id, h = this.getPrevEditor(g));
            }
            h && (this.in.exec("open-editor", { id: u, column: h.id }), this.in.exec("focus-cell", { row: u, column: h.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "escape": {
          const { editor: a } = this.getState();
          a && (this.in.exec("close-editor", { ignore: !0 }), this.in.exec("focus-cell", { row: a.id, column: a.column, eventSource: "key" }));
          break;
        }
        case "f2": {
          const { editor: a, focusCell: l } = this.getState();
          !a && l && this.in.exec("open-editor", { id: l.row, column: l.column });
          break;
        }
        case "enter": {
          const { focusCell: a, tree: l } = this.getState();
          if (!i && l && a && this.getColumn(a.column).treetoggle) {
            const c = this.getRow(a.row);
            if (!c.data) return;
            this.in.exec(c.open ? "close-row" : "open-row", { id: a.row, nested: !0 });
          }
          break;
        }
        case "home": {
          const { editor: a, focusCell: l } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const c = this._getFirstVisibleColumn()?.id;
            this.in.exec("focus-cell", { row: l.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+home": {
          const { editor: a, focusCell: l, flatData: c, select: d } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const u = c[0]?.id, h = this._getFirstVisibleColumn()?.id;
            u && h && (this.in.exec("focus-cell", { row: u, column: h, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          }
          break;
        }
        case "end": {
          const { editor: a, focusCell: l } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const c = this._getLastVisibleColumn()?.id, d = l.row;
            this.in.exec("focus-cell", { row: d, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+end": {
          const { editor: a, focusCell: l, flatData: c, select: d } = this.getState();
          if (!a && l) {
            o.preventDefault();
            const u = c.at(-1).id, h = this._getLastVisibleColumn()?.id;
            u && h && (this.in.exec("focus-cell", { row: u, column: h, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          }
          break;
        }
        case "ctrl+z": {
          this.in.exec("undo", {});
          break;
        }
        case "ctrl+y": {
          this.in.exec("redo", {});
          break;
        }
      }
    }), r.on("scroll", (s) => {
      const { _columns: o, split: i, _sizes: a, flatData: l, dynamic: c, _rowHeightFromData: d } = this.getState();
      let u = -1, h = -1, g = 0, m = 0;
      if (s.column) {
        u = 0;
        const f = o.findIndex((w) => w.id == s.column);
        g = o[f].width;
        for (let w = i.left ?? 0; w < f; w++) {
          const x = o[w];
          x.hidden || (u += x.width);
        }
      }
      if (s.row && !c) {
        const f = l.findIndex((w) => w.id == s.row);
        f >= 0 && (d ? (h = l.slice(0, f).reduce((w, x) => w + (x.rowHeight || a.rowHeight), 0), m = l[f].rowHeight) : h = a.rowHeight * f);
      }
      this.setState({ scroll: { top: h, left: u, width: g, height: m || a.rowHeight } });
    }), r.on("print", (s) => {
      const o = Xl(s);
      this.setState({ _print: o }), this.setStateAsync({ _print: null });
    }), r.on("undo", () => {
      this._historyManager?.handleUndo();
    }), r.on("redo", () => {
      this._historyManager?.handleRedo();
    }), this.initOnce();
  }
  getXlsxWorker(e) {
    if (!this._xlsxWorker) {
      const n = window.URL.createObjectURL(new Blob([`importScripts('${e}');`], { type: "text/javascript" }));
      this._xlsxWorker = new Promise((r) => {
        const s = new Worker(n);
        s.addEventListener("message", (o) => {
          o.data.type === "init" && r(s);
        });
      });
    }
    return this._xlsxWorker;
  }
  initOnce() {
    const e = { sortMarks: {}, _filterIds: null, data: [], filterValues: {}, scroll: null, editor: null, focusCell: null, _print: null, history: { undo: 0, redo: 0 }, search: null };
    this._router.init(e);
  }
  init(e) {
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = ic()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), ln(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), Io() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new tc(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
  }
  setState(e, n) {
    return this._router.setState(e, n);
  }
  setStateAsync(e) {
    this._router.setStateAsync(e);
  }
  getRow(e) {
    const { tree: n } = this.getState();
    return n ? this._branches[e] : this.getState().data.find((r) => r.id == e);
  }
  getRowIndex(e, n) {
    return n || (n = this.getState().flatData), n.findIndex((r) => r.id == e);
  }
  getNextRow(e) {
    const n = this.getState().flatData, r = this.getRowIndex(e, n);
    return n[r + 1];
  }
  getPrevRow(e) {
    const n = this.getState().flatData, r = this.getRowIndex(e, n);
    return n[r - 1];
  }
  getColumn(e) {
    return this.getState().columns.find((n) => n.id == e);
  }
  getNextColumn(e, n) {
    const r = this.getState()._columns, s = r.findIndex((o) => o.id == e);
    return n ? this._getFirstVisibleColumn(s + 1) : r[s + 1];
  }
  getPrevColumn(e, n) {
    const r = this.getState()._columns, s = r.findIndex((o) => o.id == e);
    return n ? this._getLastVisibleColumn(s - 1) : r[s - 1];
  }
  _getFirstVisibleColumn(e) {
    const n = this.getState()._columns;
    let r = e ?? 0;
    for (; r < n.length && (n[r]?.hidden || n[r]?.collapsed); ) r++;
    return n[r];
  }
  _getLastVisibleColumn(e) {
    const n = this.getState()._columns;
    let r = e ?? n.length - 1;
    for (; r < n.length && (n[r]?.hidden || n[r]?.collapsed); ) r--;
    return n[r];
  }
  isCellEditable(e, n) {
    const { editor: r, hidden: s } = n;
    return !r || s ? !1 : typeof r == "function" ? r(e, n) : !0;
  }
  getNextEditor(e, n) {
    let r = this.getState().columns;
    if (n) {
      const s = r.findIndex((o) => o.id == n.id);
      r = r.slice(s + 1);
    }
    return r.find((s) => this.isCellEditable(e, s));
  }
  getPrevEditor(e, n) {
    let r = this.getState().columns;
    if (n) {
      const s = r.findLastIndex((o) => o.id == n.id);
      r = r.slice(0, s);
    }
    return r.findLast((s) => this.isCellEditable(e, s));
  }
  toggleBranch(e, n, r) {
    let s = this._branches[e], { data: o } = this.getState();
    if (o = [...o], e !== 0) {
      s = { ...s, open: n };
      const i = this.updateTreeRow(s);
      s.$parent === 0 && (o = i);
    }
    r && s.data?.length && s.data.forEach((i) => {
      const a = this.toggleKids(i, n, r);
      e === 0 && (o = a);
    }), this.setState({ data: o });
  }
  toggleKids(e, n, r) {
    e = { ...e, open: n };
    const s = this.updateTreeRow(e);
    return r && e.data?.length && e.data.forEach((o) => {
      this.toggleKids(o, n, r);
    }), s;
  }
  updateTreeRow(e) {
    const n = e.id;
    this._branches[n] = e;
    const r = this._branches[e.$parent], s = r.data.findIndex((o) => o.id == n);
    return r.data = [...r.data], r.data[s] = e, r.data;
  }
  isSelected(e) {
    return this.getState().selectedRows.indexOf(e) !== -1;
  }
  findAndRemove(e, n) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == n) return e.splice(r, 1)[0];
      if (e[r].data) {
        const s = [...e[r].data], o = this.findAndRemove(s, n);
        if (o) return e[r] = { ...e[r], data: s }, o;
      }
    }
    return null;
  }
  insertItem(e, n, r, s) {
    for (let o = 0; o < e.length; o++) {
      if (e[o].id == n) {
        const i = e[o], a = s === "before" ? o : o + 1;
        if (i.data) {
          if (s === "before") {
            const l = o > 0 ? e[o - 1] : null;
            return l?.data && l.open ? e[o - 1] = { ...l, data: [...l.data, r] } : e.splice(a, 0, r), !0;
          } else if (i.open) return e[o] = { ...i, data: [r, ...i.data] }, !0;
        }
        return e.splice(a, 0, r), !0;
      }
      if (e[o].data && (e[o] = { ...e[o], data: [...e[o].data] }, this.insertItem(e[o].data, n, r, s))) return !0;
    }
    return !1;
  }
  moveItem(e, n, r, s) {
    const o = [...r], i = this.findAndRemove(o, e);
    return this.insertItem(o, n, i, s), o;
  }
  copyColumns(e) {
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const s = { ...e[r] };
      this.copyHeaderFooter(s, "header"), this.copyHeaderFooter(s, "footer"), n[r] = s;
    }
    return n;
  }
  copyHeaderFooter(e, n) {
    let r = e[n];
    r = Array.isArray(r) ? [...r] : [r], r.forEach((s, o) => {
      r[o] = typeof s == "string" ? { text: s } : { ...s };
    }), e[n] = r;
  }
  setCollapsibleColumns(e, n, r) {
    let s = e.header;
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      if (i.collapsible && i.collapsed) {
        if (i.collapsible !== "first") {
          e.collapsed = !0, e.width = 36, i.vertical = !0;
          const l = s.length - o;
          s = s.slice(0, o + 1), s[o].rowspan = l;
        }
        const a = i.colspan;
        if (a) {
          const l = s[o + 1];
          let c = 1;
          l && l.colspan && !l.collapsed && (c = l.colspan);
          for (let d = c; d < a; d++) {
            const u = r[n + d];
            u && (u.hidden = !0);
          }
        }
      }
    }
  }
  normalizeColumns(e, n, r, s, o) {
    const i = e[n];
    i.width || (i.width = i.flexgrow ? 17 : o.columnWidth), i._colindex = n + 1;
    const a = i[r], l = o[`${r}RowHeights`];
    for (let c = 0; c < s; c++) {
      const d = a[c];
      d.id = i.id, c === a.length - 1 && (d.rowspan = d.rowspan ? Math.min(d.rowspan, s - c) : s - c);
      for (let u = 1; u < d.rowspan; u++) {
        a.splice(c + u, 0, { _hidden: !0 });
        for (let h = 1; h < d.colspan; h++) e[n + h][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? l : l.slice(c, d.rowspan + c)).reduce((h, g) => h + g, 0);
        d.height = u, c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = i.width, h = i.flexgrow || 0;
        const g = d.colspan;
        for (let m = 1; m < g; m++) {
          const f = e[n + m];
          f && (f.hidden ? d.colspan -= 1 : f.flexgrow ? h += f.flexgrow : u += f.width || o.columnWidth), h ? d.flexgrow = h : d.width = u;
        }
      } else d.width = i.width, d.flexgrow = i.flexgrow;
      r === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    a.length > s && (a.length = s), i[r] = a;
  }
  normalizeRows(e) {
    for (let n = 0; n < e.length; n++) e[n].id || (e[n].id = kn());
    return e;
  }
  normalizeTreeRows(e, n, r) {
    return e.forEach((s) => {
      s.id || (s.id = kn()), s.$level = n || 0, s.$parent = r || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
    }), e;
  }
  sortTree(e, n) {
    e.sort(n), e.forEach((r) => {
      r.data && this.sortTree(r.data, n);
    });
  }
  filterTree(e, n, r) {
    return e.forEach((s) => {
      n(s) && r.push(s.id), s.data && this.filterTree(s.data, n, r);
    }), r;
  }
  flattenRows(e, n, r) {
    const s = n;
    return e.forEach((o) => {
      (!r || r.includes(o.id)) && s.push(o), o.data?.length && o.open !== !1 && this.flattenRows(o.data, s, r);
    }), s;
  }
  createFilter(e) {
    const { _columns: n } = this.getState(), r = [];
    for (const s in e) {
      const { config: o, type: i } = n.find((l) => l.id == s).header.find((l) => l.filter).filter, a = e[s];
      r.push((l) => o?.handler ? o.handler(l[s], a) : dc(i)(l[s], a));
    }
    return (s) => {
      for (let o = 0; o < r.length; o++) if (!r[o](s)) return !1;
      return !0;
    };
  }
  searchRows(e, n) {
    e = e.trim().toLowerCase();
    const r = {};
    if (!e) return r;
    const { flatData: s, columns: o } = this.getState(), i = n ? o.filter((a) => n[a.id]) : o;
    return s.forEach((a) => {
      const l = {};
      i.forEach((c) => {
        const d = mt(a, c);
        String(d).toLowerCase().includes(e) && (l[c.id] = !0);
      }), Object.keys(l).length && (r[a.id] = l);
    }), r;
  }
  normalizeSizes(e, n, r, s, o) {
    const i = ws(e, "header", r, n.headerHeight, o), a = ws(e, "footer", s, n.footerHeight, o), l = i.reduce((d, u) => d + u, 0), c = a.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: a, headerHeight: l, footerHeight: c };
  }
}
let fc = (/* @__PURE__ */ new Date()).valueOf();
function kn() {
  return "temp://" + fc++;
}
function hc(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var gc = class {
  constructor() {
    this.store = /* @__PURE__ */ new Map();
  }
  configure(t, e) {
    this.node = e;
    for (const n in t) if (t[n]) {
      const r = n.toLowerCase().replace(/[ ]/g, ""), s = t[n];
      this.store.set(r, s);
    }
  }
}, Ot = [], pc = { subscribe: (t) => {
  mc();
  const e = new gc();
  return Ot.push(e), t(e), () => {
    const n = Ot.findIndex((r) => r === e);
    n >= 0 && Ot.splice(n, 1);
  };
} }, xs = !1;
function mc() {
  xs || (xs = !0, document.addEventListener("keydown", (t) => {
    if (Ot.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Ot.length - 1; s >= 0; s--) {
        const o = Ot[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
const wc = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function xc(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return a.tagName === "INPUT" || a.tagName === "TEXTAREA" || hc(a, "data-header-id")?.classList.contains("wx-filter") || !!a.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < "u" && (typeof a == "function" ? s[i] = a : a && (s[i] = (l) => {
      const c = r(l);
      n({ key: i, event: l, isInput: c });
    }));
  }
  const o = pc.subscribe((i) => {
    i.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function yc(t, e) {
  let n = null;
  e.scroll.subscribe((r) => {
    if (!r || r === n) return;
    n = r;
    const { left: s, top: o, height: i, width: a } = r, l = e.getHeight(), c = e.getWidth(), d = e.getScrollMargin();
    if (o >= 0) {
      const u = t.scrollTop;
      o < u ? t.scrollTop = o : o + i > u + l && (t.scrollTop = o - l + i);
    }
    if (s >= 0) {
      const u = t.scrollLeft;
      s < u ? t.scrollLeft = s : s + a > u + c - d && (t.scrollLeft = s - c + a + d);
    }
  });
}
function Ao(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = Ao(n.data, e)), r;
  });
}
function Ho(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = Ho(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let vc = 1;
function kc(t) {
  return Ao(t, (e) => {
    const n = { ...e, id: e.id || vc++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Lo = {};
function bc(t) {
  return Lo[t] || t;
}
function Sc(t, e) {
  Lo[t] = e;
}
function $c({ onClick: t, onShow: e, option: n }) {
  const r = U(null), s = E(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = $(() => n && n.comp ? bc(n.comp) : null, [n]);
  return /* @__PURE__ */ Z(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ p("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ p(o, { item: n, option: n }) : null : /* @__PURE__ */ Z("span", { className: "wx-cDCz9rZQ wx-value", children: [
          " ",
          n.text,
          " "
        ] }),
        n.subtext ? /* @__PURE__ */ p("span", { className: "wx-cDCz9rZQ wx-subtext", children: n.subtext }) : null,
        n.data ? /* @__PURE__ */ p("i", { className: "wx-cDCz9rZQ wx-sub-icon wxi-angle-right" }) : null
      ]
    }
  );
}
function Er({
  options: t,
  left: e = 0,
  top: n = 0,
  at: r = "bottom",
  parent: s = null,
  mount: o = null,
  context: i = null,
  css: a = "",
  onClick: l
}) {
  const [c, d] = j(-1e4), [u, h] = j(-1e4), [g, m] = j(20), [f, w] = j(), x = U(null), [y, b] = j(!1), [k, T] = j(null), S = E(() => {
    const M = si(x.current, s, r, e, n);
    M && (d(M.x), h(M.y), m(M.z), w(M.width));
  }, [s, r, e, n]);
  G(() => {
    o && o(S);
  }, []);
  const C = E(() => {
    b(!1);
  }, []), D = E(() => {
    l && l({ action: null, option: null });
  }, [l]), Y = E((M, P) => {
    b(M), T(P);
  }, []), _ = $(() => kc(t), [t]);
  return G(() => {
    S();
  }, [s, S]), G(() => {
    if (x.current)
      return rn(x.current, { callback: D, modal: !0 }).destroy;
  }, [D]), /* @__PURE__ */ p(
    "div",
    {
      ref: x,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${a}`,
      style: {
        position: "absolute",
        top: u + "px",
        left: c + "px",
        width: f,
        zIndex: g
      },
      onMouseLeave: C,
      children: _.map((M) => /* @__PURE__ */ Z(Ds, { children: [
        M.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          $c,
          {
            option: M,
            onShow: Y,
            onClick: (P) => {
              if (!M.data && !P.defaultPrevented) {
                const H = { context: i, action: M, option: M, event: P };
                M.handler && M.handler(H), l && l(H), P.stopPropagation();
              }
            }
          }
        ),
        M.data && y === M.id ? /* @__PURE__ */ p(
          Er,
          {
            css: a,
            options: M.data,
            at: "right-overlap",
            parent: k,
            context: i,
            onClick: l
          }
        ) : null
      ] }, M.id))
    }
  );
}
const Cc = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, [d, u] = j(null), [h, g] = j(null), [m, f] = j(0), [w, x] = j(0), y = $(() => d !== null && i ? Ho(n, (S) => i(S, d)) : n, [d, i, n]), b = E(
    (S) => {
      g(null), c && c(S);
    },
    [c]
  ), k = E((S, C) => {
    let D = null;
    for (; S && S.dataset && !D; )
      D = S.dataset[C], S = S.parentNode;
    return D ? zt(D) : null;
  }, []), T = E(
    (S, C) => {
      if (!S) {
        g(null);
        return;
      }
      if (S.defaultPrevented) return;
      const D = S.target;
      if (D && D.dataset && D.dataset.menuIgnore) return;
      f(S.clientX + 1), x(S.clientY + 1);
      let Y = typeof C < "u" ? C : k(D, o);
      s && (Y = s(Y, S), !Y) || (u(Y), g(D), S.preventDefault());
    },
    [o, k, s]
  );
  return Tt(e, () => ({ show: T }), [T]), /* @__PURE__ */ Z(Re, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: T, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    h ? /* @__PURE__ */ p(zs, { children: /* @__PURE__ */ p(
      Er,
      {
        css: a,
        at: r,
        top: w,
        left: m,
        parent: h,
        context: d,
        onClick: b,
        options: y
      },
      h
    ) }) : null
  ] });
});
_t(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = j(null);
  function c(m) {
    l(null), i && i(m);
  }
  const d = E((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Tt(e, () => ({ show: d }), [d]);
  function u(m) {
    let f = m.target;
    for (; !f.dataset.menuIgnore; )
      l(f), f = f.parentNode;
  }
  const h = U(0), g = U(a);
  return G(() => {
    g.current !== a && (h.current += 1, g.current = a);
  }, [a]), /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    a ? /* @__PURE__ */ p(zs, { children: /* @__PURE__ */ p(
      Er,
      {
        css: s,
        at: r,
        parent: a,
        options: n,
        onClick: c
      },
      h.current
    ) }) : null
  ] });
});
const Oo = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, d = U(null), u = E((h, g) => {
    d.current.show(h, g);
  }, []);
  return Tt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ Z(Re, { children: [
    l ? /* @__PURE__ */ p("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ p(
      Cc,
      {
        css: a,
        at: r,
        options: n,
        resolver: s,
        dataKey: o,
        filter: i,
        ref: d,
        onClick: c
      }
    )
  ] });
}), Po = {};
function _c(t) {
  return Po[t] || t;
}
function Yt(t, e) {
  Po[t] = e;
}
function Wo({ menu: t = !1 }) {
  return /* @__PURE__ */ p("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function zo() {
  return /* @__PURE__ */ p("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const Tc = ({ key: t, text: e, ...n }) => n;
function Ir(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = $(
    () => _c(e.comp || "label"),
    [e]
  ), a = E(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = $(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = E(
    ({ value: u }) => {
      e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
    },
    [e, o]
  ), d = $(() => n ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [n, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ p(zo, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ p(Wo, { menu: n });
  {
    const u = i, h = [
      "wx-tb-element",
      e && e.css ? e.css : "",
      e && e.spacer ? "wx-spacer" : "",
      n ? "wx-menu" : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ p(
      "div",
      {
        className: "wx-KVAsgMam " + h,
        "data-id": e ? e.id : void 0,
        children: /* @__PURE__ */ p(
          u,
          {
            value: l,
            onChange: c,
            onClick: a,
            text: d,
            menu: n,
            ...Tc(e)
          }
        )
      }
    );
  }
}
function Mn({
  item: t,
  values: e = null,
  menu: n = !1,
  onChange: r,
  onClick: s
}) {
  const [o, i] = j(!0), a = () => i(!0), l = () => i(!1), c = (u) => {
    a(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ Z("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ p("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ p("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ p(Ut, { width: "", oncancel: a, children: /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ p(
      Mn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, h) => u.items ? /* @__PURE__ */ p(
        Mn,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      ) : /* @__PURE__ */ p(
        Ir,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      )
    ) }),
    t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label", children: t.text }) : null
  ] }) });
}
function Nc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = j(void 0), l = U(null);
  function c() {
    a(null);
  }
  function d() {
    a(!0);
  }
  function u(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ p(ut, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ p(Ut, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ p("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (h, g) => h.items ? /* @__PURE__ */ p(
            Mn,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || g
          ) : /* @__PURE__ */ p(
            Ir,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || g
          )
        ) }) }) : null
      ]
    }
  );
}
function Dc(t) {
  return t.forEach((e) => {
    e.id || (e.id = mr());
  }), t;
}
function fr(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: i,
    onChange: a
  } = t, [l, c] = Ue(e || []), [d, u] = Ue(s || null), h = $(() => Dc(l), [l]), g = U(null), m = U(-1), [f, w] = j([]), x = U(h);
  G(() => {
    x.current = h;
  }, [l]);
  const y = U(o);
  G(() => {
    y.current = o;
  }, [o]);
  const b = U(f);
  G(() => {
    b.current = f;
  }, [f]);
  const k = U(!1);
  function T(_) {
    d && (d[_.item.key] = _.value, u({ ...d })), a && a(_);
  }
  function S() {
    const _ = g.current;
    if (!_) return 0;
    const M = _.children, P = x.current || [];
    let H = 0;
    for (let I = 0; I < P.length; I++)
      P[I].comp !== "spacer" && (H += M[I].clientWidth, P[I].comp === "separator" && (H += 8));
    return H;
  }
  function C() {
    const _ = g.current, M = x.current || [];
    if (_) {
      for (let P = M.length - 1; P >= 0; P--)
        if (M[P].items && !M[P].collapsed) {
          M[P].collapsed = !0, M[P].$width = _.children[P].offsetWidth, k.current = !0, c([...M]);
          return;
        }
    }
  }
  function D(_) {
    const M = g.current, P = x.current || [];
    if (M) {
      for (let H = 0; H < P.length; H++)
        if (P[H].collapsed && P[H].$width) {
          P[H].$width - M.children[H].offsetWidth < _ + 10 && (P[H].collapsed = !1, k.current = !0), c([...P]);
          return;
        }
    }
  }
  function Y() {
    const _ = g.current;
    if (!_) return;
    const M = x.current || [], P = y.current;
    if (P === "wrap") return;
    const H = _.clientWidth;
    if (_.scrollWidth > H) {
      if (P === "collapse") return C();
      const I = _.children;
      let L = 0;
      for (let ce = 0; ce < M.length; ce++) {
        if (L += I[ce].clientWidth, M[ce].comp === "separator" && (L += 8), L > H - 40) {
          if (m.current === ce) return;
          m.current = ce;
          const ue = [];
          for (let re = ce; re < M.length; re++)
            ue.push(M[re]), I[re].style.visibility = "hidden";
          ce > 0 && M[ce - 1].comp === "separator" && (I[ce - 1].style.visibility = "hidden"), w(ue);
          break;
        }
        I[ce].style.visibility = "";
      }
    } else {
      const I = H - S();
      if (I <= 0) return;
      if (P === "collapse") return D(I);
      if ((b.current || []).length) {
        m.current = null;
        const L = _.children;
        for (let ce = 0; ce < M.length; ce++)
          L[ce].style.visibility = "";
        w([]);
      }
    }
  }
  return G(() => {
    k.current && (k.current = !1, Y());
  }, [l]), G(() => {
    const _ = new ResizeObserver(() => Y());
    return g.current && _.observe(g.current), () => {
      _.disconnect();
    };
  }, []), /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: g,
      children: [
        h.map(
          (_) => _.items ? /* @__PURE__ */ p(
            Mn,
            {
              item: _,
              values: d,
              onClick: i,
              onChange: T
            },
            _.id
          ) : /* @__PURE__ */ p(
            Ir,
            {
              item: _,
              values: d,
              onClick: i,
              onChange: T
            },
            _.id
          )
        ),
        !!f.length && /* @__PURE__ */ p(
          Nc,
          {
            items: f,
            css: n,
            values: d,
            onClick: i,
            onChange: T
          }
        )
      ]
    }
  );
}
function Mc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ Z("div", { className: "wx-HXpG4gnx wx-item", onClick: a, children: [
    /* @__PURE__ */ p("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ p(
    ut,
    {
      icon: e,
      type: s,
      css: r,
      text: n,
      disabled: o,
      onClick: a
    }
  );
}
function Ec(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function Ic(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ Z("div", { className: "wx-3cuSqONJ wx-item", onClick: a, children: [
    e ? /* @__PURE__ */ p("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ p(
    ut,
    {
      icon: e,
      type: s,
      css: r,
      title: n,
      disabled: o,
      onClick: a
    }
  );
}
function Rc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ Z("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ p("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Yt("button", Mc);
Yt("separator", Wo);
Yt("spacer", zo);
Yt("label", Ec);
Yt("item", Rc);
Yt("icon", Ic);
const Ze = Wt(null);
function Ac(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const ys = 5, Hc = 700;
function Lc(t) {
  return zt(t.getAttribute("data-id"));
}
function bn(t) {
  const e = t.getBoundingClientRect(), n = document.body, r = e.top + n.scrollTop - n.clientTop || 0, s = e.left + n.scrollLeft - n.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: t.offsetWidth,
    height: t.offsetHeight
  };
}
function hr(t, e) {
  const n = bn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function Oc(t, e) {
  const n = e.current;
  let r = null, s, o, i = !1, a = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(C) {
    const D = Be(C);
    D && (r = {
      container: l,
      sourceNode: C.target,
      from: Lc(D),
      pos: hr(C, t)
    }, o = r.pos, u(C));
  }
  function u(C) {
    if (!r) return;
    const D = r.pos = hr(C, t);
    if (!i) {
      if (!a && !C?.target?.getAttribute("draggable-data") && Math.abs(o.x - D.x) < ys && Math.abs(o.y - D.y) < ys)
        return;
      if (T(C) === !1) return S();
    }
    if (a) {
      const Y = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, _ = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        C.pageX - Y,
        C.pageY - _
      );
    } else r.targetNode = C.target;
    n.move && n.move(C, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function h(C) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", i && n.end && n.end(C, r), r = o = null, S();
  }
  function g(C) {
    n.getReorder && !n.getReorder() || C.button === 0 && (k(C), window.addEventListener("mousemove", m), window.addEventListener("mouseup", f), d(C));
  }
  function m(C) {
    u(C);
  }
  function f(C) {
    h(C);
  }
  function w(C) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      a = !0, d(C.touches[0]);
    }, Hc), k(C);
    function D() {
      s && c(), C.target.removeEventListener("touchmove", x), C.target.removeEventListener("touchend", D), h(C);
    }
    C.target.addEventListener("touchmove", x), C.target.addEventListener("touchend", D), t.addEventListener("contextmenu", y);
  }
  function x(C) {
    i ? (C.preventDefault(), u(C.touches[0])) : s && c();
  }
  function y(C) {
    if (i || s)
      return C.preventDefault(), !1;
  }
  function b(C) {
    C.preventDefault();
  }
  function k(C) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: D } = n.getDraggableInfo();
    (!D || C.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function T(C) {
    if (i = !0, n.start) {
      if (n.start(C, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function S(C) {
    i = a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", f), C && (t.removeEventListener("mousedown", g), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", b));
  }
  return t.addEventListener("mousedown", g), t.addEventListener("touchstart", w), t.addEventListener("dragstart", b), {
    destroy() {
      S(!0);
    }
  };
}
const Pc = 4e-3;
function Wc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function zc(t, e, n, r) {
  const { node: s, left: o, top: i, bottom: a, sense: l, xScroll: c, yScroll: d } = r, u = hr(t, s);
  n.scrollState || (n.scrollState = Wc());
  let h = 0, g = 0;
  u.x < o + l ? h = -1 : u.x > e.width - l && (h = 1), u.y < i + Math.round(l / 2) ? g = -1 : u.y > e.height - a - Math.round(l / 2) && (g = 1), (n.scrollState.dirX !== h || n.scrollState.dirY !== g) && (Fo(n), n.scrollState.dirX = h, n.scrollState.dirY = g), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && Fc(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Fc(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      Uc,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Fo(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function Uc(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += Pc, r !== 0 && Vc(t, e, r), s !== 0 && Yc(t, e, s);
}
function Yc(t, e, n) {
  const r = e.node.scrollTop;
  Uo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Vc(t, e, n) {
  const r = e.node.scrollLeft;
  Uo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Uo(t, e, n) {
  n.node[e] = t;
}
function Ln(t, e, n, r, s, o) {
  const i = {};
  return t && (i.width = `${t}px`, i.minWidth = `${t}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), n && (i.position = "sticky", n.left && (i.left = `${r}px`), n.right && (i.right = `${s}px`)), i;
}
function Yo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Kc(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [i, a] = Ue(t.focusable), l = Ce(Ze), c = ie(l, "focusCell"), d = ie(l, "search"), u = ie(l, "reorder"), h = $(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), g = $(
    () => Ln(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m(S, C) {
    let D = "wx-cell";
    return D += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", D += S ? " " + S(n) : "", D += C ? " " + C(e, n) : "", D += n.treetoggle ? " wx-tree-cell" : "", D;
  }
  const f = $(
    () => m(s, r),
    [s, r, n, e]
  ), w = $(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = U(null);
  G(() => {
    x.current && i && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, i, e.id, n.id]);
  const y = E(() => {
    i && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, i, c, e.id, n.id]);
  G(() => () => {
    i && c && (l.exec("focus-cell", { eventSource: "destroy" }), a(!1));
  }, [l, a]);
  function b(S) {
    const C = new RegExp(`(${d.value.trim()})`, "gi");
    return String(S).split(C).map((D) => ({ text: D, highlight: C.test(D) }));
  }
  const k = $(() => {
    const S = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, C = n.fixed && n.fixed.right;
    return [
      f,
      S ? "wx-shadow" : "",
      C ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [f, n]), T = n.cell;
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-TSCaXsGV " + k,
      ref: x,
      onFocus: y,
      style: g,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: i ? "0" : "-1",
      role: "gridcell",
      "aria-colindex": n._colindex,
      "aria-readonly": n.editor ? void 0 : !0,
      children: [
        u && n.draggable ? w ? /* @__PURE__ */ p(
          "i",
          {
            "draggable-data": "true",
            className: "wx-TSCaXsGV wx-draggable wxi-drag"
          }
        ) : /* @__PURE__ */ p("i", { className: "wx-TSCaXsGV wx-draggable-stub" }) : null,
        n.treetoggle ? /* @__PURE__ */ Z(Re, { children: [
          /* @__PURE__ */ p("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ p(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        T ? /* @__PURE__ */ p(
          T,
          {
            api: l,
            row: e,
            column: n,
            onAction: ({ action: S, data: C }) => l.exec(S, C)
          }
        ) : o ? o() : h ? /* @__PURE__ */ p("span", { children: b(mt(e, n)).map(
          ({ highlight: S, text: C }, D) => S ? /* @__PURE__ */ p("mark", { className: "wx-TSCaXsGV wx-search", children: C }, D) : /* @__PURE__ */ p("span", { children: C }, D)
        ) }) : mt(e, n)
      ]
    }
  );
}
function vs(t, e) {
  let n, r;
  function s(a) {
    n = a.clientX, t.style.opacity = 1, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", window.addEventListener("mousemove", o), window.addEventListener("mouseup", i), e && e.down && e.down(t);
  }
  function o(a) {
    r = a.clientX - n, e && e.move && e.move(r);
  }
  function i() {
    t.style.opacity = "", document.body.style.cursor = "", document.body.style.userSelect = "", e && e.up && e.up(r), window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", i);
  }
  return t.addEventListener("mousedown", s), {
    destroy() {
      t.removeEventListener("mousedown", s);
    }
  };
}
function Gc({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(
    an,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Bc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = Ce(Ze), o = ie(s, "flatData"), i = $(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), a = $(() => t?.config?.template, [t]);
  function l() {
    const u = [];
    return o.forEach((h) => {
      const g = Ct(h, e);
      u.includes(g) || u.push(g);
    }), u.map((h) => ({ id: h, label: h }));
  }
  function c({ value: u }) {
    n({ value: u, key: e.id });
  }
  function d(u) {
    u.key !== "Tab" && u.preventDefault();
  }
  return /* @__PURE__ */ p("div", { style: { width: "100%" }, onKeyDown: d, children: /* @__PURE__ */ p(
    Ps,
    {
      placeholder: "",
      clear: !0,
      ...t?.config ?? {},
      options: i,
      value: r,
      onChange: c,
      children: (u) => a ? a(u) : u.label
    }
  ) });
}
const jc = {
  text: Gc,
  richselect: Bc
};
function qc({ filter: t, column: e }) {
  const n = Ce(Ze), r = ie(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = $(() => jc[t.type], [t.type]);
  return /* @__PURE__ */ p(
    o,
    {
      filter: t,
      column: e,
      action: s,
      filterValue: r[e.id]
    }
  );
}
function Xc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: a,
    hasSplit: l
  } = t, c = Ce(Ze), d = ie(c, "sortMarks"), u = $(() => d ? d[n.id] : void 0, [d, n.id]), h = U(), g = E(
    (I) => {
      h.current = e.flexgrow ? I.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = E(
    (I, L) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + I),
        inProgress: L
      });
    },
    [c, e.id]
  ), f = E((I) => m(I, !0), [m]), w = E((I) => m(I, !1), [m]), x = E(
    (I) => {
      if (!n.sort || e.filter) return;
      let L = u?.order;
      L && (L = L === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: I.ctrlKey, order: L });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = E(
    (I) => {
      I && I.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), b = E(
    (I) => {
      I.key === "Enter" && y();
    },
    [y]
  ), k = E(
    (I) => {
      I.key === "Enter" && !e.filter && x(I);
    },
    [x, e.filter]
  ), T = $(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), S = $(
    () => T && !l && e.collapsible !== "header",
    [T, l, e.collapsible]
  ), C = $(
    () => S ? { top: -a / 2, position: "absolute" } : {},
    [S, a]
  ), D = $(
    () => Ln(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (T && S ? a : 0)
    ),
    [
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right,
      n.right,
      e.height,
      T,
      S,
      a
    ]
  ), Y = $(
    () => Yo(n, e, i),
    [n, e, i]
  ), _ = E(() => Object.fromEntries(
    Object.entries(e).filter(([I]) => I !== "cell")
  ), [e]), M = `wx-cell ${Y} ${e.css || ""} wx-collapsed`, P = [
    "wx-cell",
    Y,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = U(null);
  return G(() => {
    const I = H.current;
    if (!I) return;
    const L = vs(I, { down: g, move: f, up: w });
    return () => {
      typeof L == "function" && L();
    };
  }, [g, f, w, vs]), T ? /* @__PURE__ */ p(
    "div",
    {
      className: "wx-RsQD74qC " + M,
      style: D,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: b,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", style: C, children: e.text || "" })
    }
  ) : /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-RsQD74qC " + P,
      style: D,
      onClick: x,
      "data-header-id": n.id,
      tabIndex: !e._hidden && n.sort && !e.filter ? 0 : void 0,
      role: "columnheader",
      "aria-colindex": e._colindex,
      "aria-colspan": e.colspan > 1 ? e.colspan : void 0,
      "aria-rowspan": e.rowspan > 1 ? e.rowspan : void 0,
      "aria-sort": !u?.order || e.filter ? "none" : u?.order === "asc" ? "ascending" : "descending",
      onKeyDown: k,
      children: [
        e.collapsible ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-collapse",
            role: "button",
            "aria-label": e.collapsed ? "Expand column" : "Collapse column",
            "aria-expanded": !e.collapsed,
            tabIndex: 0,
            onKeyDown: b,
            onClick: y,
            children: /* @__PURE__ */ p(
              "i",
              {
                className: `wx-RsQD74qC wxi-angle-${e.collapsed ? "down" : "right"}`
              }
            )
          }
        ) : null,
        e.cell ? (() => {
          const I = e.cell;
          return /* @__PURE__ */ p(
            I,
            {
              api: c,
              cell: _(),
              column: n,
              row: r,
              onAction: ({ action: L, data: ce }) => c.exec(L, ce)
            }
          );
        })() : e.filter ? /* @__PURE__ */ p(qc, { filter: e.filter, column: n }) : /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: H,
            onClick: (I) => I.stopPropagation(),
            children: /* @__PURE__ */ p("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ Z(Re, { children: [
          typeof u.index < "u" ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-order", children: u.index + 1 }) : null,
          /* @__PURE__ */ p(
            "i",
            {
              className: `wx-RsQD74qC wxi-arrow-${u.order === "asc" ? "up" : "down"}`
            }
          )
        ] }) : null }) : null
      ]
    }
  );
}
function Qc({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = Ce(Ze), o = $(
    () => Ln(
      t?.width,
      t?.flexgrow,
      e?.fixed,
      e?.left,
      t?.right ?? e?.right,
      t?.height
    ),
    [
      t?.width,
      t?.flexgrow,
      e?.fixed,
      e?.left,
      t?.right,
      e?.right,
      t?.height
    ]
  ), i = $(
    () => Yo(e, t, r),
    [e, t, r]
  ), a = E(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ p("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? jo.createElement(t.cell, {
    api: s,
    cell: a(),
    column: e,
    row: n,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ p("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function ks({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const i = Ce(Ze), a = ie(i, "_sizes"), l = ie(i, "split"), c = $(() => a?.[`${r}RowHeights`], [a, r]), d = $(() => {
    let f = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        f.push([]), n.forEach((b, k) => {
          const T = { ...b[r][x] };
          if (y || f[x].push(T), T.colspan > 1) {
            if (y = T.colspan - 1, !Io() && b.right) {
              let S = b.right;
              for (let C = 1; C < T.colspan; C++)
                S -= n[k + C].width;
              T.right = S;
            }
          } else y && y--;
        });
      }
    }
    return f;
  }, [n, r]), u = $(() => l?.left || l?.right, [l]);
  function h(f) {
    return n.find((w) => w.id === f);
  }
  function g(f, w) {
    let x = w;
    return f.rowspan && (x += f.rowspan - 1), x === d.length - 1;
  }
  function m(f, w, x) {
    if (!x.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const b = x.header[y];
      if (!b.filter && !b._hidden) return w === y;
    }
    return g(f, w);
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((f, w) => /* @__PURE__ */ p(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[w]}px`, display: "flex" },
          role: "row",
          children: f.map((x) => {
            const y = h(x.id);
            return r === "header" ? /* @__PURE__ */ p(
              Xc,
              {
                cell: x,
                columnStyle: s,
                column: y,
                row: w,
                lastRow: g(x, w),
                bodyHeight: o,
                sortRow: m(x, w, y),
                hasSplit: u
              },
              x.id
            ) : /* @__PURE__ */ p(
              Qc,
              {
                cell: x,
                columnStyle: s,
                column: h(x.id),
                row: w
              },
              x.id
            );
          })
        },
        w
      ))
    }
  );
}
function Jc({ overlay: t }) {
  const e = Ce(Ze);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Zc(t) {
  const { actions: e, editor: n } = t, [r, s] = j(n?.value || ""), o = U(null);
  G(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function a({ key: l }) {
    l === "Enter" && e.save();
  }
  return /* @__PURE__ */ p(
    "input",
    {
      className: "wx-e7Ao5ejY wx-text",
      onInput: i,
      onKeyDown: a,
      ref: o,
      type: "text",
      value: r
    }
  );
}
function ed({ actions: t, editor: e, onAction: n }) {
  const [r, s] = j(e?.value), [o, i] = j(e?.renderedValue), [a, l] = j(e?.options || []), c = $(() => e?.config?.template, [e]), d = $(() => e?.config?.cell, [e]), u = $(() => (a || []).findIndex((y) => y.id === r), [a, r]), h = U(null), g = U(null), m = E(
    (y) => {
      h.current = y.navigate, g.current = y.keydown, h.current(u);
    },
    [u, h]
  ), f = E(
    (y) => {
      const b = y?.target?.value ?? "";
      i(b);
      const k = b ? (e?.options || []).filter(
        (T) => (T.label || "").toLowerCase().includes(b.toLowerCase())
      ) : e?.options || [];
      l(k), k.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), w = U(null);
  G(() => {
    w.current && w.current.focus();
  }, []), G(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = E(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: w,
        value: o ?? "",
        onChange: f,
        onKeyDown: (y) => g.current ? g.current(y, u) : void 0
      }
    ),
    /* @__PURE__ */ p(
      En,
      {
        items: a,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ p(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function td({ actions: t, editor: e, onAction: n }) {
  const [r] = j(() => e.value || /* @__PURE__ */ new Date()), [s] = j(() => e.config?.template), [o] = j(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = U(null);
  return G(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: a,
        tabIndex: 0,
        onClick: () => t.cancel(),
        onKeyDown: (l) => l.preventDefault(),
        children: s ? s(r) : o ? /* @__PURE__ */ p(o, { data: e.value, onAction: n }) : /* @__PURE__ */ p("span", { className: "wx-lNWNYUb6 wx-text", children: e.renderedValue })
      }
    ),
    /* @__PURE__ */ p(Ut, { width: "auto", children: /* @__PURE__ */ p(
      Os,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function nd(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = j(
    n.options.find((f) => f.id === n.value)
  ), [i] = j(n.value), [a] = j(n.options), l = $(
    () => a.findIndex((f) => f.id === i),
    [a, i]
  );
  function c({ id: f }) {
    e.updateValue(f), e.save();
  }
  let d;
  const [u, h] = j();
  function g(f) {
    d = f.navigate, h(() => f.keydown), d(l);
  }
  const m = U(null);
  return G(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: m,
        className: "wx-ywGRk611 wx-value",
        tabIndex: 0,
        onClick: () => e.cancel(),
        onKeyDown: (f) => {
          u(f, l), f.preventDefault();
        },
        children: s.template ? s.template(o) : s.cell ? (() => {
          const f = s.cell;
          return /* @__PURE__ */ p(f, { data: o, onAction: r });
        })() : /* @__PURE__ */ p("span", { className: "wx-ywGRk611 wx-text", children: n.renderedValue })
      }
    ),
    /* @__PURE__ */ p(En, { items: a, onReady: g, onSelect: c, children: ({ option: f }) => s.template ? s.template(f) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ p(w, { data: f, onAction: r });
    })() : f.label })
  ] });
}
const rd = {
  text: Zc,
  combo: ed,
  datepicker: td,
  richselect: nd
};
function sd({ column: t, row: e }) {
  const n = Ce(Ze), r = ie(n, "editor"), s = E(
    (m, f) => {
      n.exec("close-editor", { ignore: m }), f && n.exec("focus-cell", {
        ...f,
        eventSource: "click"
      });
    },
    [n]
  ), o = E(
    (m) => {
      const f = m ? null : { row: r?.id, column: r?.column };
      s(!1, f);
    },
    [r, s]
  ), i = E(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), a = E(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), l = E(
    (m) => {
      m.key === "Enter" && r && i();
    },
    [r, i]
  ), c = $(
    () => Ln(
      t.width,
      t.flexgrow,
      t.fixed,
      t.left,
      t.right
    ),
    [t.width, t.flexgrow, t.fixed, t.left, t.right]
  ), d = $(() => {
    let m = t.editor;
    typeof m == "function" && (m = m(e, t));
    let f = typeof m == "string" ? m : m.type;
    return rd[f];
  }, [t, e]), u = U(null);
  G(() => {
    if (!u.current) return;
    const m = rn(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), G(() => {
    u.current && typeof c == "string" && u.current.setAttribute("style", c);
  }, [c]);
  const h = typeof e.$parent < "u" ? "gridcell" : "cell", g = typeof e.$parent < "u" ? !t.editor : void 0;
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-8l724t2g wx-cell wx-editor",
      ref: u,
      style: typeof c == "object" && c !== null ? c : void 0,
      role: h,
      "aria-readonly": g,
      tabIndex: -1,
      onClick: (m) => m.stopPropagation(),
      onDoubleClick: (m) => m.stopPropagation(),
      onKeyDown: l,
      children: d ? /* @__PURE__ */ p(
        d,
        {
          editor: r,
          actions: { save: o, cancel: i, updateValue: a },
          onAction: ({ action: m, data: f }) => n.exec(m, f)
        }
      ) : null
    }
  );
}
function bs(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = Ce(Ze), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(Re, { children: e.map((c, d) => /* @__PURE__ */ p("tr", { children: c.map((u) => {
    const h = i.find((f) => f.id == u.id), g = `wx-print-cell-${n}${l(h)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ p(
      "th",
      {
        style: Rs(Eo(u, a.columnWidth)),
        className: "wx-Gy81xq2u " + g,
        rowSpan: u.rowspan,
        colSpan: u.colspan,
        children: m ? /* @__PURE__ */ p(
          m,
          {
            api: s,
            cell: Object.fromEntries(
              Object.entries(u).filter(([f]) => f !== "cell")
            ),
            column: h,
            row: d
          }
        ) : u.filter ? /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-print-filter", children: Ql(o, i, u) }) : /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function od(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = Ce(Ze), { flatData: c, _sizes: d } = l.getState(), u = o && ps(e, "header", d.headerRowHeights), h = i && ps(e, "footer", d.footerRowHeights);
  function g(f, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(f, w) : "", x;
  }
  function m(f, w) {
    return typeof w.draggable == "function" ? w.draggable(f, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ Z(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((f) => f.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p(
          bs,
          {
            columns: u,
            type: "header",
            columnStyle: r
          }
        ) }) : null,
        /* @__PURE__ */ p("tbody", { children: c.map((f, w) => /* @__PURE__ */ p(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(f) : ""),
            style: { height: `${f.rowHeight || d.rowHeight}px` },
            children: e.map(
              (x) => x.collapsed ? null : /* @__PURE__ */ Z(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(f, x)}`,
                  style: Rs(
                    Eo(x, d.columnWidth)
                  ),
                  children: [
                    a && x.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(f, x) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ Z(Re, { children: [
                      /* @__PURE__ */ p(
                        "span",
                        {
                          style: { marginLeft: f.$level * 28 + "px" }
                        }
                      ),
                      f.$count ? /* @__PURE__ */ p(
                        "i",
                        {
                          className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${f.open !== !1 ? "down" : "right"}`
                        }
                      ) : null
                    ] }) : null,
                    x.cell ? (() => {
                      const y = x.cell;
                      return /* @__PURE__ */ p(y, { api: l, row: f, column: x });
                    })() : /* @__PURE__ */ p("span", { children: mt(f, x) })
                  ]
                },
                x.id
              )
            )
          },
          w
        )) }),
        i ? /* @__PURE__ */ p("tfoot", { children: /* @__PURE__ */ p(
          bs,
          {
            columns: h,
            type: "footer",
            columnStyle: r
          }
        ) }) : null
      ]
    }
  );
}
function id(t) {
  const { config: e, ...n } = t, r = Ce(Ze), { _skin: s, _columns: o } = r.getState(), i = $(() => Bl(o, e), []), a = U(null);
  return G(() => {
    const l = document.body;
    l.classList.add("wx-print");
    const c = a.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    l.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, h = document.createElement("style");
    h.setAttribute("type", "text/css"), h.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(h), h.appendChild(document.createTextNode(u)), window.print(), h.remove(), l.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ p(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: a,
      children: i.map((l, c) => /* @__PURE__ */ p("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ p(od, { columns: l, ...n }) }, c))
    }
  );
}
function ad(t) {
  const {
    header: e,
    footer: n,
    overlay: r,
    multiselect: s,
    onreorder: o,
    rowStyle: i,
    columnStyle: a,
    cellStyle: l,
    autoRowHeight: c,
    resize: d,
    clientWidth: u,
    clientHeight: h,
    responsiveLevel: g,
    hotkeys: m
  } = t, f = Ce(Ze), w = ie(f, "dynamic"), x = ie(f, "_columns"), y = ie(f, "flatData"), b = ie(f, "split"), k = ie(f, "_sizes"), [T, S] = Jt(f, "selectedRows"), C = ie(f, "select"), D = ie(f, "editor"), Y = ie(f, "tree"), _ = ie(f, "focusCell"), M = ie(f, "_print"), P = ie(f, "undo"), H = ie(f, "reorder"), I = ie(f, "_rowHeightFromData"), [L, ce] = j(0);
  G(() => {
    ce(cn());
  }, []);
  const [ue, re] = j(0), [le, ye] = j(0), W = $(() => (x || []).some((R) => !R.hidden && R.flexgrow), [x]), ae = $(() => k?.rowHeight || 0, [k]), ve = U(null), [fe, Se] = j(null), [xe, V] = j(null), Q = $(() => {
    let R = [], te = 0;
    return b && b.left && (R = (x || []).slice(0, b.left).filter((v) => !v.hidden).map((v) => ({ ...v })), R.forEach((v) => {
      v.fixed = { left: 1 }, v.left = te, te += v.width;
    }), R.length && (R[R.length - 1].fixed = { left: -1 })), { columns: R, width: te };
  }, [b, x]), de = $(() => {
    let R = [], te = 0;
    if (b && b.right) {
      R = (x || []).slice(b.right * -1).filter((v) => !v.hidden).map((v) => ({ ...v }));
      for (let v = R.length - 1; v >= 0; v--) {
        const N = R[v];
        N.fixed = { right: 1 }, N.right = te, te += N.width;
      }
      R.length && (R[0].fixed = { right: -1 });
    }
    return { columns: R, width: te };
  }, [b, x]), J = $(() => {
    const R = (x || []).slice(b?.left || 0, (x || []).length - (b?.right ?? 0)).filter((te) => !te.hidden);
    return R.forEach((te) => {
      te.fixed = 0;
    }), R;
  }, [x, b]), se = $(() => (x || []).reduce((R, te) => (te.hidden || (R += te.width), R), 0), [x]), Ie = 1;
  function He(R, te, v) {
    let N = te, A = R;
    if (J.length) {
      let z = J.length;
      for (let F = R; F >= 0; F--)
        J[F][v].forEach((q) => {
          q.colspan > 1 && F > R - q.colspan && F < z && (z = F);
        });
      if (z !== J.length && z < R) {
        for (let F = z; F < R; F++)
          N -= J[F].width;
        A = z;
      }
    }
    return { index: A, delta: N };
  }
  const K = $(() => {
    let R, te, v;
    const N = ue, A = ue + (u || 0);
    let z = 0, F = 0, q = 0, X = 0;
    J.forEach((We, rt) => {
      N > q && (z = rt, X = q), q = q + We.width, A > q && (F = rt + Ie);
    });
    const oe = { header: 0, footer: 0 };
    for (let We = F; We >= z; We--)
      ["header", "footer"].forEach((rt) => {
        J[We] && J[We][rt].forEach((yt) => {
          const lt = yt.colspan;
          if (lt && lt > 1) {
            const zn = lt - (F - We + 1);
            zn > 0 && (oe[rt] = Math.max(oe[rt], zn));
          }
        });
      });
    const ge = He(z, X, "header"), _e = He(z, X, "footer"), Ae = ge.delta, Ve = ge.index, nt = _e.delta, it = _e.index;
    return W && se > (u || 0) ? R = te = v = [...Q.columns, ...J, ...de.columns] : (R = [
      ...Q.columns,
      ...J.slice(z, F + 1),
      ...de.columns
    ], te = [
      ...Q.columns,
      ...J.slice(Ve, F + oe.header + 1),
      ...de.columns
    ], v = [
      ...Q.columns,
      ...J.slice(it, F + oe.footer + 1),
      ...de.columns
    ]), {
      data: R || [],
      header: te || [],
      footer: v || [],
      d: X,
      df: nt,
      dh: Ae
    };
  }, [
    J,
    Q,
    de,
    ue,
    u,
    W,
    se
  ]), pe = $(
    () => e && k?.headerHeight || 0,
    [e, k]
  ), ke = $(
    () => n && k?.footerHeight || 0,
    [n, k]
  ), De = $(() => u && h ? se >= u : !1, [u, h, se]), B = $(() => (h || 0) - pe - ke - (De ? L : 0), [h, pe, ke, De, L]), be = $(() => Math.ceil((B || 0) / (ae || 1)) + 1, [B, ae]), Me = U([]), [me, Le] = j(0), [we, Pe] = j(void 0), $e = $(() => {
    let R = 0, te = 0;
    const v = 2;
    if (c) {
      let z = le;
      for (; z > 0; )
        z -= Me.current[R] || ae, R++;
      te = le - z;
      for (let F = Math.max(0, R - v - 1); F < R; F++)
        te -= Me.current[R - F] || ae;
      R = Math.max(0, R - v);
    } else {
      if (I) {
        let z = 0, F = 0;
        for (let ge = 0; ge < (y || []).length; ge++) {
          const _e = y[ge].rowHeight || ae;
          if (F + _e > le) {
            z = ge;
            break;
          }
          F += _e;
        }
        R = Math.max(0, z - v);
        for (let ge = 0; ge < R; ge++)
          te += y[ge].rowHeight || ae;
        let q = 0, X = 0;
        for (let ge = z + 1; ge < (y || []).length; ge++) {
          const _e = y[ge].rowHeight || ae;
          if (q++, X + _e > B)
            break;
          X += _e;
        }
        const oe = Math.min(
          w ? w.rowCount : (y || []).length,
          z + q + v
        );
        return { d: te, start: R, end: oe };
      }
      R = Math.floor(le / (ae || 1)), R = Math.max(0, R - v), te = R * (ae || 0);
    }
    const N = w ? w.rowCount : (y || []).length, A = Math.min(N, R + (be || 0) + v);
    return { d: te, start: R, end: A };
  }, [c, I, le, ae, w, y, be, B]), Oe = $(() => {
    const R = w ? w.rowCount : (y || []).length;
    if (c)
      return me + $e.d + (R - (we || 0)) * (ae || 0);
    if (!I)
      return R * (ae || 0);
    let te = 0;
    for (let v = 0; v < R; v++)
      te += y[v]?.rowHeight || ae;
    return te;
  }, [
    w,
    y,
    ae,
    c,
    I,
    me,
    $e.d,
    we
  ]), ze = $(() => u && h ? Oe + pe + ke >= h - (se >= (u || 0) ? L : 0) : !1, [
    u,
    h,
    Oe,
    pe,
    ke,
    se,
    L
  ]), Ye = $(() => W && se <= (u || 0) ? (u || 0) - 0 - (ze ? L : 0) : se, [W, se, u, ze, L, De]), O = $(() => W && se <= (u || 0) ? u || 0 : Ye < (u || 0) ? se + (ze ? L : 0) : -1, [W, se, u, Ye, ze, L]), ee = U({});
  G(() => {
    if (w && (ee.current.start !== $e.start || ee.current.end !== $e.end)) {
      const { start: R, end: te } = $e;
      ee.current = { start: R, end: te }, f && f.exec && f.exec("request-data", { row: { start: R, end: te } });
    }
  }, [w, $e, f]);
  const ne = $(() => w ? y || [] : (y || []).slice($e.start, $e.end), [w, y, $e]), he = $(() => (T || []).filter(
    (R) => (ne || []).some((te) => te.id === R)
  ), [S, ne]), Ee = $(() => $e.start, [$e.start]), Ne = E((R) => {
    ye(R.target.scrollTop), re(R.target.scrollLeft);
  }, []), Fe = E((R) => {
    R.shiftKey && R.preventDefault(), ve.current && ve.current.focus && ve.current.focus();
  }, []), je = E(() => !!(x || []).find((R) => !!R.draggable), [x]), Vt = U(null), ot = U(null), On = U({
    dblclick: (R, te) => {
      const v = { id: R, column: er(te, "data-col-id") };
      f.exec("open-editor", v);
    },
    click: (R, te) => {
      if (Vt.current) return;
      const v = er(te, "data-col-id");
      if (_?.id !== R && f.exec("focus-cell", {
        row: R,
        column: v,
        eventSource: "click"
      }), C === !1) return;
      const N = s && te.ctrlKey, A = s && te.shiftKey;
      (N || T.length > 1 || !T.includes(R)) && f.exec("select-row", { id: R, toggle: N, range: A });
    },
    "toggle-row": (R) => {
      const te = f.getRow(R);
      f.exec(te.open !== !1 ? "close-row" : "open-row", { id: R });
    },
    "ignore-click": () => !1
  }), Dt = $(() => ({
    top: pe,
    bottom: ke,
    left: Q.width,
    xScroll: De,
    yScroll: ze,
    sense: c && xe ? xe.offsetHeight : Math.max(k?.rowHeight || 0, 40),
    node: ve.current && ve.current.firstElementChild
  }), [
    pe,
    ke,
    Q.width,
    De,
    ze,
    c,
    xe,
    k
  ]);
  function Pn(R, te) {
    const { container: v, sourceNode: N, from: A } = te;
    if (je() && !N.getAttribute("draggable-data"))
      return !1;
    Se(A), f.getRow(A).open && f.exec("close-row", { id: A, nested: !0 });
    const z = Be(N, "data-id"), F = z.cloneNode(!0);
    F.classList.remove("wx-selected"), F.querySelectorAll("[tabindex]").forEach((ge) => ge.setAttribute("tabindex", "-1")), v.appendChild(F), V(F);
    const q = ue - K.d, X = ze ? L : 0;
    v.style.width = Math.min(
      (u || 0) - X,
      W && se <= (u || 0) ? Ye : Ye - X
    ) + q + "px";
    const oe = bn(z);
    te.offset = {
      x: q,
      y: -Math.round(oe.height / 2)
    }, ot.current || (ot.current = R.clientY);
  }
  function Mt(R, te) {
    const { from: v } = te, N = te.pos, A = bn(ve.current);
    N.x = A.x;
    const z = Dt.top;
    if (N.y < z) N.y = z;
    else {
      const F = A.height - (De && L > 0 ? L : Math.round(Dt.sense / 2)) - Dt.bottom;
      N.y > F && (N.y = F);
    }
    if (ve.current.contains(te.targetNode)) {
      const F = Be(te.targetNode, "data-id"), q = zt(F?.getAttribute("data-id"));
      if (q && q !== v) {
        te.to = q;
        const X = c ? xe?.offsetHeight : k?.rowHeight;
        if (xe && (le === 0 || N.y > z + X - 1)) {
          const oe = F.getBoundingClientRect(), ge = bn(xe).y, _e = oe.y, Ae = ge > _e ? -1 : 1, Ve = Ae === 1 ? "after" : "before", nt = Math.abs(f.getRowIndex(v) - f.getRowIndex(q)), it = nt !== 1 ? Ve === "before" ? "after" : "before" : Ve;
          if (nt === 1 && (Ae === -1 && R.clientY > ot.current || Ae === 1 && R.clientY < ot.current))
            return;
          ot.current = R.clientY, f.exec("move-item", {
            id: v,
            target: q,
            mode: it,
            inProgress: !0
          });
        }
      }
      o && o({ event: R, context: te });
    }
    zc(R, A, te, Dt);
  }
  function Et(R, te) {
    const { from: v, to: N } = te;
    f.exec("move-item", {
      id: v,
      target: N,
      inProgress: !1
    }), Vt.current = setTimeout(() => {
      Vt.current = 0;
    }, 1), Se(null), V(null), ot.current = null, Fo(te);
  }
  function cn() {
    const R = document.createElement("div");
    R.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(R);
    const te = R.offsetWidth - R.clientWidth;
    return document.body.removeChild(R), te;
  }
  const dn = $(() => O > 0 ? { width: `${O}px` } : void 0, [O]), un = U(null);
  function Wn() {
    Promise.resolve().then(() => {
      let R = 0, te = Ee;
      const v = un.current;
      v && (Array.from(v.children).forEach((N, A) => {
        Me.current[Ee + A] = N.offsetHeight, R += N.offsetHeight, te++;
      }), Le(R), Pe(te));
    });
  }
  G(() => {
    ne && c && Wn();
  }, [ne, c, Ee]);
  let [gt, Kt] = j();
  G(() => {
    if (_ && (!C || !he.length || he.includes(_.row)))
      Kt({ ..._ });
    else if (ne.length && K.data.length) {
      if (!gt || he.length && !he.includes(gt.row) || ne.findIndex((R) => R.id == gt.row) === -1 || K.data.findIndex(
        (R) => R.id == gt.column && !R.collapsed
      ) === -1) {
        const R = he[0] || ne[0].id, te = K.data.findIndex((v) => !v.collapsed);
        Kt(te !== -1 ? { row: R, column: K.data[te].id } : null);
      }
    } else Kt(null);
  }, [_]);
  const Gt = U(null);
  G(() => {
    const R = ve.current;
    if (!R) return;
    const te = Ac(R, d);
    return () => {
      typeof te == "function" && te();
    };
  }, [d]);
  const Bt = U({});
  Object.assign(Bt.current, {
    start: Pn,
    move: Mt,
    end: Et,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: je() })
  }), G(() => {
    const R = ve.current;
    return R ? Oc(R, Bt).destroy : void 0;
  }, [H, ve.current]), G(() => {
    const R = ve.current;
    return R ? xc(R, {
      keys: m !== !1 && {
        ...wc,
        "ctrl+z": P,
        "ctrl+y": P,
        ...m
      },
      exec: (te) => f.exec("hotkey", te)
    }).destroy : void 0;
  }, [f, P, m]);
  const xt = U({
    scroll: f.getReactiveState().scroll
  });
  xt.current.getWidth = () => (u || 0) - (ze ? L : 0), xt.current.getHeight = () => B, xt.current.getScrollMargin = () => Q.width + de.width, G(() => {
    yc(Gt.current, xt.current);
  }, []);
  const It = U(null);
  G(() => {
    const R = It.current;
    if (!R) return;
    const te = [];
    return te.push(
      rn(R, () => f.exec("focus-cell", { eventSource: "click" })).destroy
    ), te.push(gi(R, On.current)), () => te.forEach((v) => v());
  }, []);
  const fn = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + fn,
        style: {
          "--header-height": `${pe}px`,
          "--footer-height": `${ke}px`,
          "--split-left-width": `${Q.width}px`,
          "--split-right-width": `${de.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: ve,
            className: "wx-4VuBwK2D wx-table-box",
            style: dn,
            role: Y ? "treegrid" : "grid",
            "aria-colcount": K.data.length,
            "aria-rowcount": ne.length,
            "aria-multiselectable": Y && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ Z(
              "div",
              {
                ref: Gt,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: De ? "scroll" : "hidden",
                  overflowY: ze ? "scroll" : "hidden"
                },
                onScroll: Ne,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    ks,
                    {
                      contentWidth: Ye,
                      deltaLeft: K.dh,
                      columns: K.header,
                      columnStyle: a,
                      bodyHeight: B - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ Z(
                    "div",
                    {
                      ref: It,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${Ye}px`, height: `${Oe}px` },
                      onMouseDown: (R) => Fe(R),
                      children: [
                        r ? /* @__PURE__ */ p(Jc, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: un,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${$e.d}px`,
                              paddingLeft: `${K.d}px`
                            },
                            children: ne.map((R, te) => {
                              const v = T.indexOf(R.id) !== -1, N = fe === R.id, A = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(R) : "") + (v ? " wx-selected" : "") + (N ? " wx-inactive" : ""), z = c ? { minHeight: `${R.rowHeight || ae}px` } : { height: `${R.rowHeight || ae}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + A,
                                  "data-id": R.id,
                                  "data-context-id": R.id,
                                  style: z,
                                  role: "row",
                                  "aria-rowindex": te,
                                  "aria-expanded": R.open,
                                  "aria-level": Y ? R.$level + 1 : void 0,
                                  "aria-selected": Y ? v : void 0,
                                  tabIndex: -1,
                                  children: K.data.map((F) => F.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    F.id
                                  ) : D?.id === R.id && D.column == F.id ? /* @__PURE__ */ p(sd, { row: R, column: F }, F.id) : /* @__PURE__ */ p(
                                    Kc,
                                    {
                                      row: R,
                                      column: F,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: H,
                                      focusable: gt?.row === R.id && gt?.column == F.id
                                    },
                                    F.id
                                  ))
                                },
                                R.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ p(
                    ks,
                    {
                      type: "footer",
                      contentWidth: Ye,
                      deltaLeft: K.df,
                      columns: K.footer,
                      columnStyle: a
                    }
                  ) : null
                ]
              }
            )
          }
        )
      }
    ),
    M ? /* @__PURE__ */ p(
      id,
      {
        config: M,
        rowStyle: i,
        columnStyle: a,
        cellStyle: l,
        header: e,
        footer: n,
        reorder: H
      }
    ) : null
  ] });
}
const ld = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), cd = _t(function({
  data: t = [],
  columns: e = [],
  rowStyle: n = null,
  columnStyle: r = null,
  cellStyle: s = null,
  selectedRows: o,
  select: i = !0,
  multiselect: a = !1,
  header: l = !0,
  footer: c = !1,
  dynamic: d = null,
  overlay: u = null,
  reorder: h = !1,
  onReorder: g = null,
  autoRowHeight: m = !1,
  sizes: f,
  split: w,
  tree: x = !1,
  autoConfig: y = !1,
  init: b = null,
  responsive: k = null,
  sortMarks: T,
  undo: S = !1,
  hotkeys: C = null,
  ...D
}, Y) {
  const _ = U();
  _.current = D;
  const M = $(() => new uc(As), []), P = $(() => M.in, [M]), H = U(null);
  H.current === null && (H.current = new Us((Q, de) => {
    const J = "on" + ld(Q);
    _.current && _.current[J] && _.current[J](de);
  }), P.setNext(H.current));
  const I = $(
    () => ({
      getState: M.getState.bind(M),
      getReactiveState: M.getReactive.bind(M),
      getStores: () => ({ data: M }),
      exec: P.exec,
      setNext: (Q) => (H.current = H.current.setNext(Q), H.current),
      intercept: P.intercept.bind(P),
      on: P.on.bind(P),
      detach: P.detach.bind(P),
      getRow: M.getRow.bind(M),
      getRowIndex: M.getRowIndex.bind(M),
      getColumn: M.getColumn.bind(M)
    }),
    [M, P]
  ), [L, ce] = j(0), [ue, re] = j(0), [le, ye] = j(null), [W, ae] = j(null), ve = $(() => {
    if (y && !e.length && t.length) {
      const Q = t[0], de = [];
      for (let J in Q)
        if (J !== "id" && J[0] !== "$") {
          let se = {
            id: J,
            header: J[0].toUpperCase() + J.slice(1)
          };
          typeof y == "object" && (se = { ...se, ...y }), de.push(se);
        }
      return de;
    }
    return (W && W.columns) ?? e;
  }, [y, e, t, W]), fe = $(
    () => (W && W.sizes) ?? f,
    [W, f]
  ), Se = E(
    (Q) => {
      if (ce(Q.width), re(Q.height), k) {
        const de = Object.keys(k).map(Number).sort((J, se) => J - se).find((J) => Q.width <= J) ?? null;
        de !== le && (ae(k[de]), ye(de));
      }
    },
    [k, le]
  ), xe = Ce(Je.theme), V = U(0);
  return G(() => {
    if (!V.current)
      b && b(I);
    else {
      const Q = M.getState();
      M.init({
        data: t,
        columns: ve,
        split: w || Q.split,
        sizes: fe || Q.sizes,
        selectedRows: o || Q.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: T || Q.sortMarks,
        undo: S,
        reorder: h,
        _skin: xe,
        _select: i
      });
    }
    V.current++;
  }, [
    M,
    t,
    ve,
    w,
    fe,
    o,
    d,
    x,
    T,
    S,
    h,
    xe,
    i,
    b,
    I
  ]), V.current === 0 && M.init({
    data: t,
    columns: ve,
    split: w || { left: 0 },
    sizes: fe || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: T || {},
    undo: S,
    reorder: h,
    _skin: xe,
    select: i
  }), Tt(
    Y,
    () => ({
      ...I
    }),
    [I]
  ), /* @__PURE__ */ p(Ze.Provider, { value: I, children: /* @__PURE__ */ p(In, { words: Il, optional: !0, children: /* @__PURE__ */ p(
    ad,
    {
      header: l,
      footer: c,
      overlay: u,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      onReorder: g,
      multiselect: a,
      autoRowHeight: m,
      clientWidth: L,
      clientHeight: ue,
      responsiveLevel: le,
      resize: Se,
      hotkeys: C
    }
  ) }) });
});
function dd({ item: t }) {
  return /* @__PURE__ */ Z(
    "div",
    {
      tabIndex: -1,
      role: "menuitem",
      "aria-label": t.hidden ? `Show ${t.text} column` : `Hide ${t.text} column`,
      children: [
        /* @__PURE__ */ p(
          "div",
          {
            className: "wx-v13lZxja wx-icon" + (t.hidden ? " wx-hidden" : ""),
            children: /* @__PURE__ */ p("i", { className: "wx-v13lZxja wxi-eye" })
          }
        ),
        /* @__PURE__ */ p("span", { children: t.text })
      ]
    }
  );
}
function ud({ columns: t = null, api: e, children: n }) {
  G(() => {
    Sc("table-header", dd);
  }, []);
  function r(l) {
    for (let c = l.header.length - 1; c >= 0; c--) {
      const d = l.header[c].text;
      if (d) return d;
    }
    return l.id;
  }
  function s(l) {
    const c = l.action;
    c && e.exec("hide-column", { id: c.id, mode: !c.hidden });
  }
  function o(l) {
    return l;
  }
  const i = ct(e, "_columns"), a = $(() => {
    if (e) {
      const l = Array.isArray(i) ? i : [];
      return (t ? l.filter((c) => t[c.id]) : l).map((c) => {
        const d = r(c);
        return {
          id: c.id,
          text: d,
          type: "table-header",
          hidden: c.hidden
        };
      });
    } else
      return [];
  }, [e, t, i]);
  return /* @__PURE__ */ p(
    Oo,
    {
      dataKey: "headerId",
      options: a,
      onClick: s,
      at: "point",
      resolver: o,
      children: typeof n == "function" ? n() : n
    }
  );
}
pr(Qe);
function fd({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ Z("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
    t.data || t.lazy ? /* @__PURE__ */ p(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ p("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ p("div", { className: "wx-pqc08MHU wx-text", children: r ? /* @__PURE__ */ p(r, { row: t, column: e }) : t.text })
  ] });
}
function Ss({ column: t, cell: e }) {
  const n = $(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ p("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ p(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function hd(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: i,
    multiTaskRows: a = !1,
    rowMapping: l = null
  } = t, [c, d] = Ue(o), [u, h] = j(), g = Ce(Je.i18n), m = $(() => g.getGroup("gantt"), [g]), f = Ce(wt), w = ie(f, "scrollTop"), x = ie(f, "cellHeight"), y = ie(f, "_scrollTask"), b = ie(f, "_selected"), k = ie(f, "area"), T = ie(f, "_tasks"), S = ie(f, "_scales"), C = ie(f, "columns"), D = ie(f, "_sort"), Y = ie(f, "calendar"), _ = ie(f, "durationUnit"), M = ie(f, "splitTasks"), [P, H] = j(null), I = $(() => !T || !k ? [] : a && l ? T : T.slice(k.start, k.end), [T, k, a, l]), L = E(
    (O, ee) => {
      if (ee === "add-task")
        f.exec(ee, {
          target: O,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (ee === "open-task") {
        const ne = I.find((he) => he.id === O);
        (ne?.data || ne?.lazy) && f.exec(ee, { id: O, mode: !ne.open });
      }
    },
    [I]
  ), ce = E(
    (O) => {
      const ee = bt(O), ne = O.target.dataset.action;
      ne && O.preventDefault(), ee ? ne === "add-task" || ne === "open-task" ? L(ee, ne) : f.exec("select-task", {
        id: ee,
        toggle: O.ctrlKey || O.metaKey,
        range: O.shiftKey,
        show: !0
      }) : ne === "add-task" && L(null, ne);
    },
    [f, L]
  ), ue = U(null), re = U(null), [le, ye] = j(0), [W, ae] = j(!1);
  G(() => {
    const O = re.current;
    if (!O || typeof ResizeObserver > "u") return;
    const ee = () => ye(O.clientWidth);
    ee();
    const ne = new ResizeObserver(ee);
    return ne.observe(O), () => ne.disconnect();
  }, []);
  const ve = U(null), fe = E(
    (O) => {
      const ee = O.id, { before: ne, after: he } = O, Ee = O.onMove;
      let Ne = ne || he, Fe = ne ? "before" : "after";
      if (Ee) {
        if (Fe === "after") {
          const je = f.getTask(Ne);
          je.data?.length && je.open && (Fe = "before", Ne = je.data[0].id);
        }
        ve.current = { id: ee, [Fe]: Ne };
      } else ve.current = null;
      f.exec("move-task", {
        id: ee,
        mode: Fe,
        target: Ne,
        inProgress: Ee
      });
    },
    [f]
  ), Se = $(() => a && l ? 0 : k?.from ?? 0, [k, a, l]), xe = $(() => S?.height ?? 0, [S]), V = $(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (le ?? 0), [n, s, c, r, le]), Q = $(() => {
    const O = {};
    return V && s === "all" || s === "grid" && V ? O.width = c : s === "grid" && (O.width = "100%"), O;
  }, [V, s, c]), de = $(() => P && !I.find((O) => O.id === P.id) ? [...I, P] : I, [I, P]), J = $(() => {
    if (!a || !l) return de;
    const O = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Set();
    return de.forEach((ne) => {
      const he = l.taskRows.get(ne.id) ?? ne.id;
      ee.has(he) || (O.set(he, {
        ...ne,
        $rowTasks: l.rowMap.get(he) || [ne.id]
      }), ee.add(he));
    }), Array.from(O.values());
  }, [de, a, l]), se = $(() => {
    let O = (C || []).map((he) => {
      he = { ...he };
      const Ee = he.header;
      if (typeof Ee == "object") {
        const Ne = Ee.text && m(Ee.text);
        he.header = { ...Ee, text: Ne };
      } else he.header = m(Ee);
      return he;
    });
    const ee = O.findIndex((he) => he.id === "text"), ne = O.findIndex((he) => he.id === "add-task");
    if (ee !== -1 && (O[ee].cell && (O[ee]._cell = O[ee].cell), O[ee].cell = fd), ne !== -1) {
      O[ne].cell = O[ne].cell || Ss;
      const he = O[ne].header;
      if (typeof he != "object" && (O[ne].header = { text: he }), O[ne].header.cell = he.cell || Ss, e)
        O.splice(ne, 1);
      else if (n) {
        const [Ee] = O.splice(ne, 1);
        O.unshift(Ee);
      }
    }
    return O.length > 0 && (O[O.length - 1].resize = !1), O;
  }, [C, m, e, n]), Ie = $(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : se.find((O) => O.id === "add-task") ? "50px" : "0", [s, r, se]), He = $(() => {
    if (J && D?.length) {
      const O = {};
      return D.forEach(({ key: ee, order: ne }, he) => {
        O[ee] = {
          order: ne,
          ...D.length > 1 && { index: he }
        };
      }), O;
    }
    return {};
  }, [J, D]), K = E(() => se.some((O) => O.flexgrow && !O.hidden), []), pe = $(() => K(), [K, W]), ke = $(() => {
    let O = s === "chart" ? se.filter((ne) => ne.id === "add-task") : se;
    const ee = s === "all" ? r : le;
    if (!pe) {
      let ne = c, he = !1;
      if (se.some((Ee) => Ee.$width)) {
        let Ee = 0;
        ne = se.reduce((Ne, Fe) => (Fe.hidden || (Ee += Fe.width, Ne += Fe.$width || Fe.width), Ne), 0), Ee > ne && ne > ee && (he = !0);
      }
      if (he || ne < ee) {
        let Ee = 1;
        return he || (Ee = (ee - 50) / (ne - 50 || 1)), O.map((Ne) => (Ne.id !== "add-task" && !Ne.hidden && (Ne.$width || (Ne.$width = Ne.width), Ne.width = Ne.$width * Ee), Ne));
      }
    }
    return O;
  }, [s, se, pe, c, r, le]), De = E(
    (O) => {
      if (!K()) {
        const ee = ke.reduce((ne, he) => (O && he.$width && (he.$width = he.width), ne + (he.hidden ? 0 : he.width)), 0);
        ee !== c && d(ee);
      }
      ae(!0), ae(!1);
    },
    [K, ke, c, d]
  ), B = E(() => {
    se.filter((ee) => ee.flexgrow && !ee.hidden).length === 1 && se.forEach((ee) => {
      ee.$width && !ee.flexgrow && !ee.hidden && (ee.width = ee.$width);
    });
  }, []), be = E(
    (O) => {
      if (!e) {
        const ee = bt(O), ne = er(O, "data-col-id");
        !(ne && se.find((Ee) => Ee.id == ne))?.editor && ee && f.exec("show-editor", { id: ee });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), Me = $(
    () => Array.isArray(b) ? b.map((O) => O.id) : [],
    [b]
  ), me = U(Se);
  me.current = Se, G(() => {
    const O = (ne) => {
      if (ue.current) {
        const he = ue.current.querySelector(".wx-body");
        he && (he.style.top = -((ne ?? 0) - (me.current ?? 0)) + "px");
      }
      re.current && (re.current.scrollTop = 0);
    };
    return O(w), f.on("scroll-chart", ({ top: ne }) => {
      ne !== void 0 && O(ne);
    });
  }, [f, w]), G(() => {
    if (ue.current) {
      const O = ue.current.querySelector(".wx-body");
      O && (O.style.top = -((w ?? 0) - (Se ?? 0)) + "px");
    }
  }, [Se]), G(() => {
    const O = ue.current;
    if (!O) return;
    const ee = O.querySelector(".wx-table-box .wx-body");
    if (!ee || typeof ResizeObserver > "u") return;
    const ne = new ResizeObserver(() => {
      if (ue.current) {
        const he = ue.current.querySelector(".wx-body");
        he && (he.style.top = -((w ?? 0) - (me.current ?? 0)) + "px");
      }
    });
    return ne.observe(ee), () => {
      ne.disconnect();
    };
  }, [ke, Q, s, Ie, J, w]), G(() => {
    if (!y || !u) return;
    const { id: O } = y, ee = u.getState().focusCell;
    ee && ee.row !== O && ue.current && ue.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: O,
      column: ee.column
    });
  }, [y, u]);
  const Le = E(
    ({ id: O }) => {
      if (e) return !1;
      f.getTask(O).open && f.exec("open-task", { id: O, mode: !1 });
      const ee = f.getState()._tasks.find((ne) => ne.id === O);
      if (H(ee || null), !ee) return !1;
    },
    [f, e]
  ), we = E(
    ({ id: O, top: ee }) => {
      ve.current ? fe({ ...ve.current, onMove: !1 }) : f.exec("drag-task", {
        id: O,
        top: ee + (Se ?? 0),
        inProgress: !1
      }), H(null);
    },
    [f, fe, Se]
  ), Pe = E(
    ({ id: O, top: ee, detail: ne }) => {
      ne && fe({ ...ne, onMove: !0 }), f.exec("drag-task", {
        id: O,
        top: ee + (Se ?? 0),
        inProgress: !0
      });
    },
    [f, fe, Se]
  );
  G(() => {
    const O = ue.current;
    return O ? El(O, {
      start: Le,
      end: we,
      move: Pe,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, Le, we, Pe]);
  const $e = E(
    (O) => {
      const { key: ee, isInput: ne } = O;
      if (!ne && (ee === "arrowup" || ee === "arrowdown"))
        return O.eventSource = "grid", f.exec("hotkey", O), !1;
      if (ee === "enter") {
        const he = u?.getState().focusCell;
        if (he) {
          const { row: Ee, column: Ne } = he;
          Ne === "add-task" ? L(Ee, "add-task") : Ne === "text" && L(Ee, "open-task");
        }
      }
    },
    [f, L, u]
  ), Oe = U(null), ze = () => {
    Oe.current = {
      setTableAPI: h,
      handleHotkey: $e,
      sortVal: D,
      api: f,
      adjustColumns: B,
      setColumnWidth: De,
      tasks: I,
      calendarVal: Y,
      durationUnitVal: _,
      splitTasksVal: M,
      onTableAPIChange: i
    };
  };
  ze(), G(() => {
    ze();
  }, [
    h,
    $e,
    D,
    f,
    B,
    De,
    I,
    Y,
    _,
    M,
    i
  ]);
  const Ye = E((O) => {
    h(O), O.intercept("hotkey", (ee) => Oe.current.handleHotkey(ee)), O.intercept("scroll", () => !1), O.intercept("select-row", () => !1), O.intercept("sort-rows", (ee) => {
      const ne = Oe.current.sortVal, { key: he, add: Ee } = ee, Ne = ne ? ne.find((je) => je.key === he) : null;
      let Fe = "asc";
      return Ne && (Fe = !Ne || Ne.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: he,
        order: Fe,
        add: Ee
      }), !1;
    }), O.on("resize-column", () => {
      Oe.current.setColumnWidth(!0);
    }), O.on("hide-column", (ee) => {
      ee.mode || Oe.current.adjustColumns(), Oe.current.setColumnWidth();
    }), O.intercept("update-cell", (ee) => {
      const { id: ne, column: he, value: Ee } = ee, Ne = Oe.current.tasks.find((Fe) => Fe.id === ne);
      if (Ne) {
        const Fe = { ...Ne };
        let je = Ee;
        je && !isNaN(je) && !(je instanceof Date) && (je *= 1), Fe[he] = je, ko(
          Fe,
          {
            calendar: Oe.current.calendarVal,
            durationUnit: Oe.current.durationUnitVal,
            splitTasks: Oe.current.splitTasksVal
          },
          he
        ), f.exec("update-task", {
          id: ne,
          task: Fe
        });
      }
      return !1;
    }), i && i(O);
  }, []);
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Ie}` },
      ref: re,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: ue,
          style: Q,
          className: "wx-rHj6070p wx-table",
          onClick: ce,
          onDoubleClick: be,
          children: /* @__PURE__ */ p(
            cd,
            {
              init: Ye,
              sizes: {
                rowHeight: x,
                headerHeight: (xe ?? 0) - 1
              },
              rowStyle: (O) => O.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (O) => `wx-rHj6070p wx-text-${O.align}${O.id === "add-task" ? " wx-action" : ""}`,
              data: J,
              columns: ke,
              selectedRows: [...Me],
              sortMarks: He
            }
          )
        }
      )
    }
  );
}
function gd({ borders: t = "" }) {
  const e = Ce(wt), n = ie(e, "cellWidth"), r = ie(e, "cellHeight"), s = U(null), [o, i] = j("#e4e4e4");
  G(() => {
    if (typeof getComputedStyle < "u" && s.current) {
      const l = getComputedStyle(s.current).getPropertyValue(
        "--wx-gantt-border"
      );
      i(l ? l.substring(l.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const a = {
    width: "100%",
    height: "100%",
    background: n != null && r != null ? `url(${wl(n, r, o, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ p("div", { ref: s, style: a });
}
function pd({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = Ce(wt), s = ie(r, "_links"), o = ie(r, "criticalPath"), i = U(null), a = E(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return G(() => {
    if (!n && e && i.current) {
      const l = (c) => {
        i.current && !i.current.contains(c.target) && a(c);
      };
      return document.addEventListener("click", l), () => {
        document.removeEventListener("click", l);
      };
    }
  }, [n, e, a]), /* @__PURE__ */ Z("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (s || []).map((l) => {
      const c = "wx-dkx3NwEn wx-line" + (o && l.$critical ? " wx-critical" : "") + (n ? "" : " wx-line-selectable");
      return /* @__PURE__ */ p(
        "polyline",
        {
          className: c,
          points: l.$p,
          onClick: () => !n && t(l.id),
          "data-link-id": l.id
        },
        l.id
      );
    }),
    !n && e && /* @__PURE__ */ p(
      "polyline",
      {
        ref: i,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: e.$p
      }
    )
  ] });
}
function md(t) {
  const { task: e, type: n } = t;
  function r(o) {
    const i = e.segments[o];
    return {
      left: `${i.$x}px`,
      top: "0px",
      width: `${i.$w}px`,
      height: "100%"
    };
  }
  function s(o) {
    if (!e.progress) return 0;
    const i = e.duration * e.progress / 100, a = e.segments;
    let l = 0, c = 0, d = null;
    do {
      const u = a[c];
      c === o && (l > i ? d = 0 : d = Math.min((i - l) / u.duration, 1) * 100), l += u.duration, c++;
    } while (d === null && c < a.length);
    return d || 0;
  }
  return /* @__PURE__ */ p("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
      "data-segment": i,
      style: r(i),
      children: [
        e.progress ? /* @__PURE__ */ p("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ p(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${s(i)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ p("div", { className: "wx-content", children: o.text || "" })
      ]
    },
    i
  )) });
}
let qt = [], qn = null, $s = null;
const Cs = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, i = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, a = Math.floor(t / r), l = new Date(n.getTime() + a * i * o);
  return l.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: a,
    scalesStart: n.toISOString(),
    result: l.toISOString()
  }), l;
}, wd = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / i);
}, xd = (t, e, n) => {
  if (!n || !t)
    return console.log("[addCells] early return:", { scales: !!n, date: t?.toISOString?.() }), t;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5, a = new Date(t.getTime() + e * i);
  return a.setUTCHours(0, 0, 0, 0), console.log("[addCells]", { date: t.toISOString(), cells: e, lengthUnit: r, result: a.toISOString() }), a;
}, yd = (t, e, n, r) => t < r && e > n;
function vd(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: i = !1,
    allowTaskIntersection: a = !0
  } = t, l = Ce(wt), [c, d] = Jt(l, "_tasks"), [u, h] = Jt(l, "_links"), g = ie(l, "area"), m = ie(l, "_scales"), f = ie(l, "taskTypes"), w = $(() => {
    if (!m || !m.start) return m;
    const v = new Date(Date.UTC(
      m.start.getFullYear(),
      m.start.getMonth(),
      m.start.getDate()
    )), N = v.getUTCDay(), A = N === 0 ? -6 : 1 - N, z = new Date(v.getTime() + A * 864e5);
    return z.setUTCHours(0, 0, 0, 0), console.log("[scales-normalize]", {
      raw: m.start.toISOString(),
      utc: v.toISOString(),
      dayOfWeek: N,
      daysToMonday: A,
      monday: z.toISOString()
    }), { ...m, start: z };
  }, [m]), x = ie(l, "baselines"), [y, b] = Jt(l, "_selected"), k = ie(l, "_scrollTask"), T = ie(l, "criticalPath"), S = ie(l, "tasks"), C = ie(l, "schedule"), D = ie(l, "splitTasks"), Y = $(() => {
    if (!g || !Array.isArray(c)) return [];
    const v = g.start ?? 0, N = g.end ?? 0;
    return r && s ? c.map((A) => ({ ...A })) : c.slice(v, N).map((A) => ({ ...A }));
  }, [d, g, r, s]), _ = ie(l, "cellHeight"), M = $(() => {
    if (!r || !s || !Y.length) return Y;
    const v = /* @__PURE__ */ new Map(), N = [];
    return c.forEach((A) => {
      const z = s.taskRows.get(A.id) ?? A.id;
      v.has(z) || (v.set(z, N.length), N.push(z));
    }), Y.map((A) => {
      const z = s.taskRows.get(A.id) ?? A.id, F = v.get(z) ?? 0;
      return {
        ...A,
        $y: F * _,
        $y_base: A.$y_base !== void 0 ? F * _ : void 0
      };
    });
  }, [Y, r, s, c, _]), P = $(
    () => w.lengthUnitWidth,
    [w]
  ), H = $(
    () => w.lengthUnit || "day",
    [w]
  ), I = U(!1), [L, ce] = j(void 0), [ue, re] = j(null), le = U(null), [ye, W] = j(null), [ae, ve] = j(void 0), fe = U(null), [Se, xe] = j(0), [V, Q] = j(null), de = U(null), [J, se] = j(null), [Ie, He] = j(null), [K, pe] = j(null), ke = U(null);
  ke.current = Ie;
  const De = U(200), B = U(null), be = $(() => {
    const v = B.current;
    return !!(y.length && v && v.contains(document.activeElement));
  }, [y, B.current]), Me = $(() => be && y[y.length - 1]?.id, [be, y]);
  G(() => {
    if (k && be && k) {
      const { id: v } = k, N = B.current?.querySelector(
        `.wx-bar[data-id='${v}']`
      );
      N && N.focus({ preventScroll: !0 });
    }
  }, [k]), G(() => {
    const v = B.current;
    if (v && (xe(v.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const N = new ResizeObserver((A) => {
        A[0] && xe(A[0].contentRect.width);
      });
      return N.observe(v), () => N.disconnect();
    }
  }, [B.current]);
  const me = E(() => {
    document.body.style.userSelect = "none";
  }, []), Le = E(() => {
    document.body.style.userSelect = "";
  }, []), we = E(
    (v, N, A) => {
      if (N.target.classList.contains("wx-line") || (A || (A = l.getTask(kt(v))), A.type === "milestone" || A.type === "summary")) return "";
      const z = Be(N, "data-segment");
      z && (v = z);
      const { left: F, width: q } = v.getBoundingClientRect(), X = (N.clientX - F) / q;
      let oe = 0.2 / (q > 200 ? q / 200 : 1);
      return X < oe ? "start" : X > 1 - oe ? "end" : "";
    },
    [l]
  ), Pe = $(() => {
    const v = /* @__PURE__ */ new Set();
    if (a || !r || !s)
      return v;
    const N = /* @__PURE__ */ new Map();
    return c.forEach((A) => {
      if (A.type === "summary" || A.type === "milestone") return;
      const z = s.taskRows.get(A.id) ?? A.id;
      N.has(z) || N.set(z, []), N.get(z).push(A);
    }), N.forEach((A) => {
      if (!(A.length < 2))
        for (let z = 0; z < A.length; z++)
          for (let F = z + 1; F < A.length; F++) {
            const q = A[z], X = A[F], oe = q.$x, ge = q.$x + q.$w, _e = X.$x, Ae = X.$x + X.$w;
            yd(oe, ge, _e, Ae) && (v.add(q.id), v.add(X.id));
          }
    }), v;
  }, [a, r, s, c, d]), $e = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return c.forEach((z) => {
        v.set(z.id, z.$y);
      }), v;
    const N = /* @__PURE__ */ new Map(), A = [];
    return c.forEach((z) => {
      const F = s.taskRows.get(z.id) ?? z.id;
      N.has(F) || (N.set(F, A.length), A.push(F));
    }), c.forEach((z) => {
      const F = s.taskRows.get(z.id) ?? z.id, q = N.get(F) ?? 0;
      v.set(z.id, q * _);
    }), v;
  }, [c, r, s, _]), Oe = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return c.forEach((z) => {
        v.set(z.id, z.$y), z.row !== void 0 && v.set(z.row, z.$y);
      }), v;
    const N = /* @__PURE__ */ new Map(), A = [];
    return c.forEach((z) => {
      const F = s.taskRows.get(z.id) ?? z.id;
      N.has(F) || (N.set(F, A.length), A.push(F));
    }), N.forEach((z, F) => {
      v.set(F, z * _);
    }), v;
  }, [c, r, s, _]), ze = E(
    (v) => {
      if (!B.current) return [];
      const A = Math.min(v.startX, v.currentX), z = Math.max(v.startX, v.currentX), F = Math.min(v.startY, v.currentY), q = Math.max(v.startY, v.currentY);
      return c.filter((X) => {
        const oe = X.$x, ge = X.$x + X.$w, Ae = $e.get(X.id) ?? X.$y, Ve = Ae + X.$h;
        return oe < z && ge > A && Ae < q && Ve > F;
      });
    },
    [c, $e]
  ), Ye = $(() => new Set(y.map((v) => v.id)), [y, b]), O = E(
    (v) => Ye.has(v),
    [Ye]
  ), ee = E(
    (v, N) => {
      const { clientX: A } = N, z = kt(v), F = l.getTask(z), q = N.target.classList;
      if (!N.target.closest(".wx-delete-button") && !e) {
        if (q.contains("wx-progress-marker")) {
          const { progress: X } = l.getTask(z);
          le.current = {
            id: z,
            x: A,
            progress: X,
            dx: 0,
            node: v,
            marker: N.target
          }, N.target.classList.add("wx-progress-in-drag");
        } else {
          const X = we(v, N, F) || "move", oe = {
            id: z,
            mode: X,
            x: A,
            dx: 0,
            l: F.$x,
            w: F.$w
          };
          if (D && F.segments?.length) {
            const ge = Be(N, "data-segment");
            ge && (oe.segmentIndex = ge.dataset.segment * 1);
          }
          re(oe);
        }
        me();
      }
    },
    [l, e, we, me, D]
  ), ne = E(
    (v) => {
      if (v.button !== 0 || K) return;
      const N = Be(v);
      if (!N && o && !e) {
        const A = B.current;
        if (!A) return;
        const z = A.getBoundingClientRect(), F = v.clientX - z.left, q = v.clientY - z.top;
        if (i) {
          const oe = Cs(F, w);
          oe && (ke.current = oe, He(oe));
        }
        const X = {
          startX: F,
          startY: q,
          currentX: F,
          currentY: q,
          ctrlKey: v.ctrlKey || v.metaKey
        };
        Q(X), de.current = X, me();
        return;
      }
      if (N) {
        if (o && !e && y.length > 1) {
          const A = kt(N);
          if (O(A)) {
            const z = v.target.classList;
            if (!z.contains("wx-link") && !z.contains("wx-progress-marker") && !v.target.closest(".wx-delete-button")) {
              const F = l.getTask(A);
              if (!we(N, v, F)) {
                const X = /* @__PURE__ */ new Map();
                y.forEach((oe) => {
                  const ge = l.getTask(oe.id);
                  if (ge) {
                    if (C?.auto && ge.type === "summary") return;
                    X.set(oe.id, {
                      $x: ge.$x,
                      $w: ge.$w,
                      start: ge.start,
                      end: ge.end
                    });
                  }
                }), se({
                  baseTaskId: A,
                  startX: v.clientX,
                  dx: 0,
                  originalPositions: X
                }), me();
                return;
              }
            }
          }
        }
        ee(N, v);
      }
    },
    [ee, o, i, e, y, O, l, we, C, me, w, K]
  ), he = E(
    (v) => {
      const N = Be(v);
      N && (fe.current = setTimeout(() => {
        ve(!0), ee(N, v.touches[0]);
      }, 300));
    },
    [ee]
  ), Ee = E(
    (v) => {
      W(v && { ...u.find((N) => N.id === v) });
    },
    [u]
  ), Ne = E(() => {
    const v = de.current;
    if (v) {
      const N = ze(v);
      v.ctrlKey ? N.forEach((A) => {
        l.exec("select-task", { id: A.id, toggle: !0, marquee: !0 });
      }) : (y.length > 0 && l.exec("select-task", { id: null, marquee: !0 }), N.forEach((A, z) => {
        l.exec("select-task", {
          id: A.id,
          toggle: z > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), Q(null), de.current = null, Le(), I.current = !0;
      return;
    }
    if (J) {
      const { dx: N, originalPositions: A } = J, z = Math.round(N / P);
      if (z !== 0) {
        let F = !0;
        A.forEach((q, X) => {
          const oe = l.getTask(X);
          oe && (l.exec("update-task", {
            id: X,
            diff: z,
            task: { start: oe.start, end: oe.end },
            skipUndo: !F
            // Only first task creates undo entry
          }), F = !1);
        }), I.current = !0;
      } else
        A.forEach((F, q) => {
          l.exec("drag-task", {
            id: q,
            left: F.$x,
            width: F.$w,
            inProgress: !1
          });
        });
      se(null), Le();
      return;
    }
    if (le.current) {
      const { dx: N, id: A, marker: z, value: F } = le.current;
      le.current = null, typeof F < "u" && N && l.exec("update-task", {
        id: A,
        task: { progress: F },
        inProgress: !1
      }), z.classList.remove("wx-progress-in-drag"), I.current = !0, Le();
    } else if (ue) {
      const { id: N, mode: A, dx: z, l: F, w: q, start: X, segment: oe, index: ge } = ue;
      if (re(null), X) {
        const _e = Math.round(z / P);
        if (!_e)
          l.exec("drag-task", {
            id: N,
            width: q,
            left: F,
            inProgress: !1,
            ...oe && { segmentIndex: ge }
          });
        else {
          let Ae = {}, Ve = l.getTask(N);
          oe && (Ve = Ve.segments[ge]);
          const nt = 1440 * 60 * 1e3, We = _e * (H === "week" ? 7 : H === "month" ? 30 : H === "quarter" ? 91 : H === "year" ? 365 : 1) * nt;
          A === "move" ? (Ae.start = new Date(Ve.start.getTime() + We), Ae.end = new Date(Ve.end.getTime() + We)) : A === "start" ? (Ae.start = new Date(Ve.start.getTime() + We), Ae.end = Ve.end) : A === "end" && (Ae.start = Ve.start, Ae.end = new Date(Ve.end.getTime() + We)), l.exec("update-task", {
            id: N,
            task: Ae,
            ...oe && { segmentIndex: ge }
          });
        }
        I.current = !0;
      }
      Le();
    }
  }, [l, Le, ue, P, H, V, J, ze, y]), Fe = E(
    (v, N) => {
      const { clientX: A, clientY: z } = N, F = B.current;
      if (F) {
        const q = F.getBoundingClientRect();
        De.current = A - q.left;
      }
      if (K) {
        if (!F) return;
        const q = F.getBoundingClientRect(), X = A - q.left;
        pe((oe) => ({ ...oe, currentX: X }));
        return;
      }
      if (!e) {
        if (V) {
          const q = B.current;
          if (!q) return;
          const X = q.getBoundingClientRect(), oe = A - X.left, ge = z - X.top;
          Q((_e) => ({
            ..._e,
            currentX: oe,
            currentY: ge
          })), de.current && (de.current.currentX = oe, de.current.currentY = ge);
          return;
        }
        if (J) {
          const q = A - J.startX;
          J.originalPositions.forEach((X, oe) => {
            const ge = X.$x + q;
            l.exec("drag-task", {
              id: oe,
              left: ge,
              width: X.$w,
              inProgress: !0
            });
          }), se((X) => ({ ...X, dx: q }));
          return;
        }
        if (le.current) {
          const { node: q, x: X, id: oe } = le.current, ge = le.current.dx = A - X, _e = Math.round(ge / q.offsetWidth * 100);
          let Ae = le.current.progress + _e;
          le.current.value = Ae = Math.min(
            Math.max(0, Ae),
            100
          ), l.exec("update-task", {
            id: oe,
            task: { progress: Ae },
            inProgress: !0
          });
        } else if (ue) {
          Ee(null);
          const { mode: q, l: X, w: oe, x: ge, id: _e, start: Ae, segment: Ve, index: nt } = ue, it = l.getTask(_e), We = A - ge;
          if (!Ae && Math.abs(We) < 20 || q === "start" && oe - We < P || q === "end" && oe + We < P || q === "move" && (We < 0 && X + We < 0 || We > 0 && X + oe + We > Se) || ue.segment)
            return;
          const rt = { ...ue, dx: We };
          let yt, lt;
          if (q === "start" ? (yt = X + We, lt = oe - We) : q === "end" ? (yt = X, lt = oe + We) : q === "move" && (yt = X + We, lt = oe), l.exec("drag-task", {
            id: _e,
            width: lt,
            left: yt,
            inProgress: !0,
            ...Ve && { segmentIndex: nt }
          }), !rt.start && (q === "move" && it.$x == X || q !== "move" && it.$w == oe)) {
            I.current = !0, Ne();
            return;
          }
          rt.start = !0, re(rt);
        } else {
          const q = Be(v);
          if (q) {
            const X = l.getTask(kt(q)), ge = Be(v, "data-segment") || q, _e = we(ge, N, X);
            ge.style.cursor = _e && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      l,
      e,
      ue,
      P,
      Se,
      we,
      Ee,
      Ne,
      V,
      J,
      K
    ]
  ), je = E(
    (v) => {
      Fe(v, v);
    },
    [Fe]
  ), Vt = E(
    (v) => {
      ae ? (v.preventDefault(), Fe(v, v.touches[0])) : fe.current && (clearTimeout(fe.current), fe.current = null);
    },
    [ae, Fe]
  ), ot = E(() => {
    Ne();
  }, [Ne]), On = E(() => {
    ve(null), fe.current && (clearTimeout(fe.current), fe.current = null), Ne();
  }, [Ne]);
  G(() => (window.addEventListener("mouseup", ot), () => {
    window.removeEventListener("mouseup", ot);
  }), [ot]);
  const Dt = E(
    (v) => {
      if (!e) {
        const N = bt(v.target);
        if (N && !v.target.classList.contains("wx-link")) {
          const A = bt(v.target, "data-segment");
          l.exec("show-editor", {
            id: N,
            ...A !== null && { segmentIndex: A }
          });
        }
      }
    },
    [l, e]
  ), Pn = ["e2s", "s2s", "e2e", "s2e"], Mt = E((v, N) => Pn[(v ? 1 : 0) + (N ? 0 : 2)], []), Et = E(
    (v, N) => {
      const A = L.id, z = L.start;
      return v === A ? !0 : !!u.find((F) => F.target == v && F.source == A && F.type === Mt(z, N));
    },
    [L, h, Mt]
  ), cn = E(() => {
    L && ce(null);
  }, [L]), dn = E((v, N, A) => {
    if (!N.length || !v || A == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: v.toISOString(),
      taskCount: N.length,
      parent: A
    });
    const z = 864e5, F = l.getHistory();
    F?.startBatch();
    const q = new Date(v);
    q.setUTCHours(0, 0, 0, 0), console.log("[paste] scalesValue:", {
      start: w?.start?.toISOString?.(),
      lengthUnit: w?.lengthUnit,
      lengthUnitWidth: w?.lengthUnitWidth
    }), N.forEach((X, oe) => {
      const ge = `task-${Date.now()}-${oe}`;
      console.log("[paste] task input:", {
        text: X.text,
        _startCellOffset: X._startCellOffset,
        _startDayOfWeek: X._startDayOfWeek,
        _durationDays: X._durationDays,
        start: X.start?.toISOString?.(),
        end: X.end?.toISOString?.()
      });
      const _e = xd(q, X._startCellOffset || 0, w);
      console.log("[paste] cellOffset:", _e?.toISOString?.());
      const Ae = new Date(_e.getTime() + (X._startDayOfWeek || 0) * z);
      Ae.setUTCHours(0, 0, 0, 0);
      const Ve = new Date(Ae.getTime() + (X._durationDays || 7) * z);
      Ve.setUTCHours(0, 0, 0, 0), console.log("[paste] task calculated:", {
        text: X.text,
        newStart: Ae.toISOString(),
        newEnd: Ve.toISOString(),
        row: X.row
      }), l.exec("add-task", {
        task: {
          id: ge,
          text: X.text,
          start: Ae,
          end: Ve,
          type: X.type || "task",
          parent: A,
          row: X.row
        },
        target: A,
        mode: "child",
        skipUndo: oe > 0
      });
    }), F?.endBatch();
  }, [l, w]), un = E(
    (v) => {
      if (I.current) {
        I.current = !1;
        return;
      }
      if (K && K.currentX != null) {
        const A = Cs(K.currentX, w);
        A && dn(A, K.tasks, K.parent), pe(null);
        return;
      }
      const N = bt(v.target);
      if (N) {
        const A = l.getTask(N), z = c.find((q) => q.id === N);
        console.log("[click] task:", A?.text, "id:", N), console.log("[click] api.getTask:", { start: A?.start, end: A?.end, duration: A?.duration }), console.log("[click] rendered:", { start: z?.start, end: z?.end, $w: z?.$w, $x: z?.$x });
        const F = v.target.classList;
        if (F.contains("wx-link")) {
          const q = F.contains("wx-left");
          if (!L) {
            ce({ id: N, start: q });
            return;
          }
          L.id !== N && !Et(N, q) && l.exec("add-link", {
            link: {
              source: L.id,
              target: N,
              type: Mt(L.start, q)
            }
          });
        } else if (F.contains("wx-delete-button-icon"))
          l.exec("delete-link", { id: ye.id }), W(null);
        else {
          let q;
          const X = Be(v, "data-segment");
          X && (q = X.dataset.segment * 1), l.exec("select-task", {
            id: N,
            toggle: v.ctrlKey || v.metaKey,
            range: v.shiftKey,
            segmentIndex: q
          });
        }
      }
      cn();
    },
    [
      l,
      L,
      h,
      ye,
      Et,
      Mt,
      cn,
      K,
      w,
      dn
    ]
  ), Wn = E((v) => ({
    left: `${v.$x}px`,
    top: `${v.$y}px`,
    width: `${v.$w}px`,
    height: `${v.$h}px`
  }), []), gt = E((v) => ({
    left: `${v.$x_base}px`,
    top: `${v.$y_base}px`,
    width: `${v.$w_base}px`,
    height: `${v.$h_base}px`
  }), []), Kt = E(
    (v) => {
      if (ae || fe.current)
        return v.preventDefault(), !1;
    },
    [ae]
  ), Gt = $(
    () => f.map((v) => v.id),
    [f]
  ), Bt = E(
    (v) => {
      let N = Gt.includes(v) ? v : "task";
      return ["task", "milestone", "summary"].includes(v) || (N = `task ${N}`), N;
    },
    [Gt]
  ), xt = E(
    (v) => {
      l.exec(v.action, v.data);
    },
    [l]
  ), It = E(
    (v) => T && S.byId(v).$critical,
    [T, S]
  ), fn = E(
    (v) => {
      if (C?.auto) {
        const N = S.getSummaryId(v, !0), A = S.getSummaryId(L.id, !0);
        return L?.id && !(Array.isArray(N) ? N : [N]).includes(
          L.id
        ) && !(Array.isArray(A) ? A : [A]).includes(v);
      }
      return L;
    },
    [C, S, L]
  ), R = E(() => {
    const v = l.getState()._selected;
    if (!v || !v.length) return;
    const N = 864e5, A = v.map((oe) => {
      const ge = l.getTask(oe.id);
      if (!ge) return null;
      const _e = c.find((Bo) => Bo.id === oe.id);
      if (!_e) return null;
      const { $x: Ae, $y: Ve, $h: nt, $w: it, $skip: We, $level: rt, $index: yt, $y_base: lt, $x_base: zn, $w_base: nu, $h_base: ru, $skip_baseline: su, $critical: ou, $reorder: iu, ...Go } = _e, Rr = _e.end && _e.start ? Math.round((_e.end.getTime() - _e.start.getTime()) / N) : 0, Ar = _e.start ? (_e.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: ge.id,
        text: ge.text,
        start: _e.start?.toISOString?.(),
        end: _e.end?.toISOString?.(),
        durationDays: Rr,
        startDayOfWeek: Ar,
        $w: it,
        $h: nt,
        row: _e.row,
        parent: _e.parent
      }), { ...Go, _durationDays: Rr, _startDayOfWeek: Ar, _originalWidth: it, _originalHeight: nt };
    }).filter(Boolean);
    if (!A.length) return;
    const F = A[0].parent, q = A.filter((oe) => oe.parent === F);
    if (q.length === 0) return;
    const X = q.reduce((oe, ge) => ge.start && (!oe || ge.start < oe) ? ge.start : oe, null);
    qt = q.map((oe) => ({
      ...oe,
      _startCellOffset: wd(oe.start, X, w)
    })), $s = F, qn = X, console.log("[copy] clipboard stored:", {
      taskCount: qt.length,
      baseDate: X?.toISOString?.(),
      parent: F,
      tasks: qt.map((oe) => ({
        id: oe.id,
        text: oe.text,
        _startCellOffset: oe._startCellOffset,
        _startDayOfWeek: oe._startDayOfWeek,
        _durationDays: oe._durationDays
      }))
    });
  }, [l, w]);
  G(() => i ? l.intercept("hotkey", (N) => {
    if (N.key === "ctrl+c" || N.key === "meta+c")
      return R(), !1;
    if (N.key === "ctrl+v" || N.key === "meta+v")
      return !qt.length || !qn || pe({
        tasks: qt,
        baseDate: qn,
        parent: $s,
        currentX: De.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [i, l, R]), G(() => {
    if (!K) return;
    const v = (N) => {
      N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), pe(null));
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [K]);
  const te = $(() => {
    if (!V) return null;
    const v = Math.min(V.startX, V.currentX), N = Math.min(V.startY, V.currentY), A = Math.abs(V.currentX - V.startX), z = Math.abs(V.currentY - V.startY);
    return {
      left: `${v}px`,
      top: `${N}px`,
      width: `${A}px`,
      height: `${z}px`
    };
  }, [V]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${M.length ? M[0].$h : 0}px` },
      ref: B,
      onContextMenu: Kt,
      onMouseDown: ne,
      onMouseMove: je,
      onTouchStart: he,
      onTouchMove: Vt,
      onTouchEnd: On,
      onClick: un,
      onDoubleClick: Dt,
      onDragStart: (v) => (v.preventDefault(), !1),
      children: [
        /* @__PURE__ */ p(
          pd,
          {
            onSelectLink: Ee,
            selectedLink: ye,
            readonly: e
          }
        ),
        M.map((v) => {
          if (v.$skip && v.$skip_baseline) return null;
          const N = Pe.has(v.id), A = `wx-bar wx-${Bt(v.type)}` + (ae && ue && v.id === ue.id ? " wx-touch" : "") + (L && L.id === v.id ? " wx-selected" : "") + (Ye.has(v.id) ? " wx-selected" : "") + (It(v.id) ? " wx-critical" : "") + (v.$reorder ? " wx-reorder-task" : "") + (D && v.segments ? " wx-split" : "") + (N ? " wx-collision" : ""), z = "wx-link wx-left" + (L ? " wx-visible" : "") + (!L || !Et(v.id, !0) && fn(v.id) ? " wx-target" : "") + (L && L.id === v.id && L.start ? " wx-selected" : "") + (It(v.id) ? " wx-critical" : ""), F = "wx-link wx-right" + (L ? " wx-visible" : "") + (!L || !Et(v.id, !1) && fn(v.id) ? " wx-target" : "") + (L && L.id === v.id && !L.start ? " wx-selected" : "") + (It(v.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Z(Ds, { children: [
            !v.$skip && /* @__PURE__ */ Z(
              "div",
              {
                className: "wx-GKbcLEGA " + A,
                style: Wn(v),
                "data-tooltip-id": v.id,
                "data-id": v.id,
                tabIndex: Me === v.id ? 0 : -1,
                children: [
                  e ? null : v.id === ye?.target && ye?.type[2] === "s" ? /* @__PURE__ */ p(
                    ut,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + z, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  v.type !== "milestone" ? /* @__PURE__ */ Z(Re, { children: [
                    v.progress && !(D && v.segments) ? /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${v.progress}%` }
                      }
                    ) }) : null,
                    !e && !(D && v.segments) ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${v.progress}% - 10px)` },
                        children: v.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: xt }) : D && v.segments ? /* @__PURE__ */ p(md, { task: v, type: Bt(v.type) }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.text || "" }),
                    N && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Z(Re, { children: [
                    /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: xt }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: v.text })
                  ] }),
                  e ? null : v.id === ye?.target && ye?.type[2] === "e" ? /* @__PURE__ */ p(
                    ut,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + F, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            x && !v.$skip_baseline ? /* @__PURE__ */ p(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (v.type === "milestone" ? " wx-milestone" : ""),
                style: gt(v)
              }
            ) : null
          ] }, v.id);
        }),
        V && te && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: te }),
        K && K.currentX != null && K.tasks.map((v, N) => {
          const z = (Math.floor(K.currentX / P) + (v._startCellOffset || 0)) * P, F = v._originalWidth || P, q = v._originalHeight || _, X = Oe.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: z, top: X, width: F, height: q },
              children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.text })
            },
            `preview-${N}`
          );
        })
      ]
    }
  );
}
function kd(t) {
  const { highlightTime: e } = t, n = Ce(wt), r = ie(n, "_scales");
  return /* @__PURE__ */ p("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((s, o) => /* @__PURE__ */ p(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${s.height}px` },
      children: (s.cells || []).map((i, a) => {
        const l = e ? e(i.date, i.unit) : "", c = "wx-cell " + (i.css || "") + " " + (l || ""), d = typeof i.value == "string" && i.value.includes("<");
        return /* @__PURE__ */ p(
          "div",
          {
            className: "wx-ZkvhDKir " + c,
            style: { width: `${i.width}px` },
            ...d ? { dangerouslySetInnerHTML: { __html: i.value } } : { children: i.value }
          },
          a
        );
      })
    },
    o
  )) });
}
const bd = /* @__PURE__ */ new Map();
function Sd(t) {
  const e = U(null), n = U(0), r = U(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, G(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        bd.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function $d(t) {
  const {
    readonly: e,
    fullWidth: n,
    fullHeight: r,
    taskTemplate: s,
    cellBorders: o,
    highlightTime: i,
    multiTaskRows: a = !1,
    rowMapping: l = null,
    marqueeSelect: c = !1,
    copyPaste: d = !1,
    scrollToCurrentWeek: u = !1,
    currentWeekColor: h = null,
    allowTaskIntersection: g = !0
  } = t, m = Ce(wt), [f, w] = Jt(m, "_selected"), x = ie(m, "scrollTop"), y = ie(m, "cellHeight"), b = ie(m, "cellWidth"), k = ie(m, "_scales"), T = ie(m, "_markers"), S = ie(m, "_scrollTask"), C = ie(m, "zoom"), D = ie(m, "_tasks"), [Y, _] = j(), M = U(null), P = U(0), H = U(!1), I = 1 + (k?.rows?.length || 0), L = $(() => {
    if (!a || !l || !D?.length) return null;
    const V = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Map(), de = [];
    return D.forEach((J) => {
      const se = l.taskRows.get(J.id) ?? J.id;
      Q.has(se) || (Q.set(se, de.length), de.push(se));
    }), D.forEach((J) => {
      const se = l.taskRows.get(J.id) ?? J.id, Ie = Q.get(se) ?? 0;
      V.set(J.id, Ie * y);
    }), V;
  }, [D, a, l, y]), ce = $(() => {
    const V = [];
    return f && f.length && y && f.forEach((Q) => {
      const de = L?.get(Q.id) ?? Q.$y;
      V.push({ height: `${y}px`, top: `${de - 3}px` });
    }), V;
  }, [w, y, L]), ue = $(
    () => Math.max(Y || 0, r),
    [Y, r]
  );
  G(() => {
    const V = M.current;
    V && typeof x == "number" && (V.scrollTop = x);
  }, [x]);
  const re = () => {
    le();
  };
  function le(V) {
    const Q = M.current;
    if (!Q) return;
    const de = {};
    de.left = Q.scrollLeft, m.exec("scroll-chart", de);
  }
  function ye() {
    const V = M.current, de = Math.ceil((Y || 0) / (y || 1)) + 1, J = Math.floor((V && V.scrollTop || 0) / (y || 1)), se = Math.max(0, J - I), Ie = J + de + I, He = se * (y || 0);
    m.exec("render-data", {
      start: se,
      end: Ie,
      from: He
    });
  }
  G(() => {
    ye();
  }, [Y, x]);
  const W = E(
    (V) => {
      if (!V) return;
      const { id: Q, mode: de } = V;
      if (de.toString().indexOf("x") < 0) return;
      const J = M.current;
      if (!J) return;
      const { clientWidth: se } = J, Ie = m.getTask(Q);
      if (Ie.$x + Ie.$w < J.scrollLeft)
        m.exec("scroll-chart", { left: Ie.$x - (b || 0) }), J.scrollLeft = Ie.$x - (b || 0);
      else if (Ie.$x >= se + J.scrollLeft) {
        const He = se < Ie.$w ? b || 0 : Ie.$w;
        m.exec("scroll-chart", { left: Ie.$x - se + He }), J.scrollLeft = Ie.$x - se + He;
      }
    },
    [m, b]
  );
  G(() => {
    W(S);
  }, [S]);
  function ae(V) {
    if (C && (V.ctrlKey || V.metaKey)) {
      V.preventDefault();
      const Q = M.current, de = V.clientX - (Q ? Q.getBoundingClientRect().left : 0);
      if (P.current += V.deltaY, Math.abs(P.current) >= 150) {
        const se = -Math.sign(P.current);
        P.current = 0, m.exec("zoom-scale", {
          dir: se,
          offset: de
        });
      }
    }
  }
  const ve = E((V) => {
    const Q = i(V.date, V.unit);
    return Q ? {
      css: Q,
      width: V.width
    } : null;
  }, [i]), fe = $(() => {
    if (!k || !i || !["hour", "day", "week"].includes(k.minUnit)) return null;
    let Q = 0;
    return k.rows[k.rows.length - 1].cells.map((de) => {
      const J = ve(de), se = Q;
      return Q += de.width, J ? { ...J, left: se } : null;
    });
  }, [k, i, ve]), Se = E(
    (V) => {
      V.eventSource = "chart", m.exec("hotkey", V);
    },
    [m]
  );
  G(() => {
    const V = M.current;
    if (!V) return;
    const Q = () => _(V.clientHeight);
    Q();
    const de = new ResizeObserver(() => Q());
    return de.observe(V), () => {
      de.disconnect();
    };
  }, [M.current]);
  const xe = U(null);
  return G(() => {
    const V = M.current;
    if (V && !xe.current)
      return xe.current = To(V, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (Q) => Se(Q)
      }), () => {
        xe.current?.destroy(), xe.current = null;
      };
  }, []), G(() => {
    const V = M.current;
    if (!V) return;
    const Q = ae;
    return V.addEventListener("wheel", Q), () => {
      V.removeEventListener("wheel", Q);
    };
  }, [ae]), G(() => {
    if (!u || H.current || !k || !M.current || !Y) return;
    const V = M.current, { clientWidth: Q } = V, de = /* @__PURE__ */ new Date(), J = k.rows[k.rows.length - 1]?.cells;
    if (!J) return;
    let se = -1, Ie = 0;
    const He = [];
    for (let pe = 0; pe < J.length; pe++) {
      const ke = J[pe];
      He.push({ left: Ie, width: ke.width });
      const De = ke.date;
      if (ke.unit === "week") {
        const B = new Date(De);
        B.setUTCDate(B.getUTCDate() + 7), de >= De && de < B && (se = pe);
      } else ke.unit === "day" && de.getUTCFullYear() === De.getUTCFullYear() && de.getUTCMonth() === De.getUTCMonth() && de.getUTCDate() === De.getUTCDate() && (se = pe);
      Ie += ke.width;
    }
    let K = se;
    if (se > 0 && (K = se - 1), K >= 0 && He[K]) {
      const pe = He[K], ke = Math.max(0, pe.left);
      V.scrollLeft = ke, m.exec("scroll-chart", { left: ke }), H.current = !0;
    }
  }, [u, k, Y, m]), Sd("chart"), /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: M,
      onScroll: re,
      children: [
        /* @__PURE__ */ p(kd, { highlightTime: i, scales: k }),
        T && T.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${ue}px` },
            children: T.map((V, Q) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${V.css || ""}`,
                style: { left: `${V.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: V.text })
              },
              Q
            ))
          }
        ) : null,
        /* @__PURE__ */ Z(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${ue}px` },
            children: [
              fe ? /* @__PURE__ */ p(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: fe.map(
                    (V, Q) => V ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + V.css,
                        style: {
                          width: `${V.width}px`,
                          left: `${V.left}px`
                        }
                      },
                      Q
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(gd, { borders: o }),
              f && f.length ? f.map(
                (V, Q) => V.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": V.id,
                    style: ce[Q]
                  },
                  V.id
                ) : null
              ) : null,
              /* @__PURE__ */ p(
                vd,
                {
                  readonly: e,
                  taskTemplate: s,
                  multiTaskRows: a,
                  rowMapping: l,
                  marqueeSelect: c,
                  copyPaste: d,
                  allowTaskIntersection: g
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Cd(t) {
  const {
    position: e = "after",
    size: n = 4,
    dir: r = "x",
    onMove: s,
    onDisplayChange: o,
    compactMode: i,
    containerWidth: a = 0,
    leftThreshold: l = 50,
    rightThreshold: c = 50
  } = t, [d, u] = Ue(t.value ?? 0), [h, g] = Ue(t.display ?? "all");
  function m(re) {
    let le = 0;
    e == "center" ? le = n / 2 : e == "before" && (le = n);
    const ye = {
      size: [n + "px", "auto"],
      p: [re - le + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let W in ye) ye[W] = ye[W].reverse();
    return ye;
  }
  const [f, w] = j(!1), [x, y] = j(null), b = U(0), k = U(), T = U(), S = U(h);
  G(() => {
    S.current = h;
  }, [h]), G(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function C(re) {
    return r == "x" ? re.clientX : re.clientY;
  }
  const D = E(
    (re) => {
      const le = k.current + C(re) - b.current;
      u(le);
      let ye;
      le <= l ? ye = "chart" : a - le <= c ? ye = "grid" : ye = "all", S.current !== ye && (g(ye), S.current = ye), T.current && clearTimeout(T.current), T.current = setTimeout(() => s && s(le), 100);
    },
    [a, l, c, s]
  ), Y = E(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", D), window.removeEventListener("mouseup", Y);
  }, [D]), _ = $(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), M = E(
    (re) => {
      !i && (h === "grid" || h === "chart") || (b.current = C(re), k.current = d, w(!0), document.body.style.cursor = _, document.body.style.userSelect = "none", window.addEventListener("mousemove", D), window.addEventListener("mouseup", Y));
    },
    [_, D, Y, d, i, h]
  );
  function P() {
    g("all"), x !== null && (u(x), s && s(x));
  }
  function H(re) {
    if (i) {
      const le = h === "chart" ? "grid" : "chart";
      g(le), o(le);
    } else if (h === "grid" || h === "chart")
      P(), o("all");
    else {
      const le = re === "left" ? "chart" : "grid";
      g(le), o(le);
    }
  }
  function I() {
    H("left");
  }
  function L() {
    H("right");
  }
  const ce = $(() => m(d), [d, e, n, r]), ue = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-pFykzMlT " + ue,
      onMouseDown: M,
      style: { width: ce.size[0], height: ce.size[1], cursor: _ },
      children: [
        /* @__PURE__ */ Z("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: I
            }
          ) }),
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: L
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const _d = 650;
function Vo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= _d;
          t(i);
        }
    }), e.observe(document.body);
  }
  function r() {
    e && (e.disconnect(), e = null);
  }
  return {
    observe: n,
    disconnect: r
  };
}
function Td(t) {
  const {
    taskTemplate: e,
    readonly: n,
    cellBorders: r,
    highlightTime: s,
    onTableAPIChange: o,
    multiTaskRows: i = !1,
    rowMapping: a = null,
    marqueeSelect: l = !1,
    copyPaste: c = !1,
    scrollToCurrentWeek: d = !1,
    currentWeekColor: u = null,
    allowTaskIntersection: h = !0
  } = t, g = Ce(wt), m = ie(g, "_tasks"), f = ie(g, "_scales"), w = ie(g, "cellHeight"), x = ie(g, "columns"), y = ie(g, "_scrollTask"), b = ie(g, "undo"), k = $(() => {
    if (!i) return a;
    const K = /* @__PURE__ */ new Map(), pe = /* @__PURE__ */ new Map();
    return m.forEach((ke) => {
      const De = ke.row ?? ke.id;
      pe.set(ke.id, De), K.has(De) || K.set(De, []), K.get(De).push(ke.id);
    }), { rowMap: K, taskRows: pe };
  }, [m, i, a]), [T, S] = j(!1);
  let [C, D] = j(0);
  const [Y, _] = j(0), [M, P] = j(0), [H, I] = j(void 0), [L, ce] = j("all"), ue = U(null), re = E(
    (K) => {
      S((pe) => (K !== pe && (K ? (ue.current = L, L === "all" && ce("grid")) : (!ue.current || ue.current === "all") && ce("all")), K));
    },
    [L]
  );
  G(() => {
    const K = Vo(re);
    return K.observe(), () => {
      K.disconnect();
    };
  }, [re]);
  const le = $(() => {
    let K;
    return x.every((pe) => pe.width && !pe.flexgrow) ? K = x.reduce((pe, ke) => pe + parseInt(ke.width), 0) : T && L === "chart" ? K = parseInt(x.find((pe) => pe.id === "action")?.width) || 50 : K = 440, C = K, K;
  }, [x, T, L]);
  G(() => {
    D(le);
  }, [le]);
  const ye = $(
    () => (Y ?? 0) - (H ?? 0),
    [Y, H]
  ), W = $(() => f.width, [f]), ae = $(() => {
    if (!i || !k)
      return m.length * w;
    const K = /* @__PURE__ */ new Set();
    return m.forEach((pe) => {
      const ke = k.taskRows.get(pe.id) ?? pe.id;
      K.add(ke);
    }), K.size * w;
  }, [m, w, i, k]), ve = $(
    () => f.height + ae + ye,
    [f, ae, ye]
  ), fe = $(
    () => C + W,
    [C, W]
  ), Se = U(null), xe = E(() => {
    Promise.resolve().then(() => {
      if ((Y ?? 0) > (fe ?? 0)) {
        const K = (Y ?? 0) - C;
        g.exec("expand-scale", { minWidth: K });
      }
    });
  }, [Y, fe, C, g]);
  G(() => {
    let K;
    return Se.current && (K = new ResizeObserver(xe), K.observe(Se.current)), () => {
      K && K.disconnect();
    };
  }, [Se.current, xe]), G(() => {
    xe();
  }, [W]);
  const V = U(null), Q = U(null), de = E(() => {
    const K = V.current;
    K && g.exec("scroll-chart", {
      top: K.scrollTop
    });
  }, [g]), J = U({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  G(() => {
    J.current = {
      rTasks: m,
      rScales: f,
      rCellHeight: w,
      scrollSize: ye,
      ganttDiv: V.current,
      ganttHeight: M ?? 0
    };
  }, [m, f, w, ye, M]);
  const se = E(
    (K) => {
      if (!K) return;
      const {
        rTasks: pe,
        rScales: ke,
        rCellHeight: De,
        scrollSize: B,
        ganttDiv: be,
        ganttHeight: Me
      } = J.current;
      if (!be) return;
      const { id: me } = K, Le = pe.findIndex((we) => we.id === me);
      if (Le > -1) {
        const we = Me - ke.height, Pe = Le * De, $e = be.scrollTop;
        let Oe = null;
        Pe < $e ? Oe = Pe : Pe + De > $e + we && (Oe = Pe - we + De + B), Oe !== null && (g.exec("scroll-chart", { top: Math.max(Oe, 0) }), V.current.scrollTop = Math.max(Oe, 0));
      }
    },
    [g]
  );
  G(() => {
    se(y);
  }, [y]), G(() => {
    const K = V.current, pe = Q.current;
    if (!K || !pe) return;
    const ke = () => {
      Qo(() => {
        P(K.offsetHeight), _(K.offsetWidth), I(pe.offsetWidth);
      });
    }, De = new ResizeObserver(ke);
    return De.observe(K), () => De.disconnect();
  }, [V.current]);
  const Ie = U(null), He = U(null);
  return G(() => {
    He.current && (He.current.destroy(), He.current = null);
    const K = Ie.current;
    if (K)
      return He.current = To(K, {
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
          "ctrl+z": b,
          "ctrl+y": b,
          "meta+z": b,
          "meta+shift+z": b
        },
        exec: (pe) => {
          if (pe.isInput) return;
          const ke = pe.key;
          if (ke === "ctrl+z" || ke === "meta+z") {
            g.exec("undo", {});
            return;
          }
          if (ke === "ctrl+y" || ke === "meta+shift+z") {
            g.exec("redo", {});
            return;
          }
          g.exec("hotkey", pe);
        }
      }), () => {
        He.current?.destroy(), He.current = null;
      };
  }, [b]), /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-gantt", ref: V, onScroll: de, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ve, width: "100%" },
      ref: Q,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: M,
            width: H
          },
          children: /* @__PURE__ */ Z("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Ie, children: [
            x.length ? /* @__PURE__ */ Z(Re, { children: [
              /* @__PURE__ */ p(
                hd,
                {
                  display: L,
                  compactMode: T,
                  columnWidth: le,
                  width: C,
                  readonly: n,
                  fullHeight: ae,
                  onTableAPIChange: o,
                  multiTaskRows: i,
                  rowMapping: k
                }
              ),
              /* @__PURE__ */ p(
                Cd,
                {
                  value: C,
                  display: L,
                  compactMode: T,
                  containerWidth: Y,
                  onMove: (K) => D(K),
                  onDisplayChange: (K) => ce(K)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: Se, children: /* @__PURE__ */ p(
              $d,
              {
                readonly: n,
                fullWidth: W,
                fullHeight: ae,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                multiTaskRows: i,
                rowMapping: k,
                marqueeSelect: l,
                copyPaste: c,
                scrollToCurrentWeek: d,
                currentWeekColor: u,
                allowTaskIntersection: h
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function Nd(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function Dd(t, e) {
  return typeof t == "function" ? t : dt(t, e);
}
function Ko(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: Dd(n, e)
  }));
}
function Md(t, e) {
  const n = Nd(e);
  for (let r in n)
    n[r] = dt(n[r], t);
  return n;
}
function Ed(t, e) {
  if (!t || !t.length) return t;
  const n = dt("%d-%m-%Y", e);
  return t.map((r) => r.template ? r : r.id === "start" || r.id == "end" ? {
    ...r,
    //store locale template for unscheduled tasks
    _template: (s) => n(s),
    template: (s) => n(s)
  } : r.id === "duration" ? {
    ...r,
    _template: (s) => s,
    template: (s) => s
  } : r);
}
function Id(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Ko(n.scales, e)
    }))
  } : t;
}
const Rd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Ad = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Hd = _t(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = _o,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: a = [],
  scales: l = Ad,
  columns: c = yo,
  start: d = null,
  end: u = null,
  lengthUnit: h = "day",
  durationUnit: g = "day",
  cellWidth: m = 100,
  cellHeight: f = 38,
  scaleHeight: w = 36,
  readonly: x = !1,
  cellBorders: y = "full",
  zoom: b = !1,
  baselines: k = !1,
  highlightTime: T = null,
  init: S = null,
  autoScale: C = !0,
  unscheduledTasks: D = !1,
  criticalPath: Y = null,
  schedule: _ = { type: "forward" },
  projectStart: M = null,
  projectEnd: P = null,
  calendar: H = null,
  undo: I = !1,
  splitTasks: L = !1,
  multiTaskRows: ce = !1,
  marqueeSelect: ue = !1,
  copyPaste: re = !1,
  currentWeekHighlight: le = !1,
  currentWeekColor: ye = null,
  scrollToCurrentWeek: W = !1,
  allowTaskIntersection: ae = !0,
  ...ve
}, fe) {
  const Se = U();
  Se.current = ve;
  const xe = $(() => new ml(As), []), V = $(() => ({ ...vr, ...Rn }), []), Q = Ce(Je.i18n), de = $(() => Q ? Q.extend(V, !0) : Nt(V), [Q, V]), J = $(() => de.getRaw().calendar, [de]), se = $(() => {
    let we = {
      zoom: Id(b, J),
      scales: Ko(l, J),
      columns: Ed(c, J),
      links: wo(a),
      cellWidth: m
    };
    return we.zoom && (we = {
      ...we,
      ...nl(
        we.zoom,
        Md(J, de.getGroup("gantt")),
        we.scales,
        m
      )
    }), we;
  }, [b, l, c, a, m, J, de]), Ie = U(null);
  Ie.current !== s && (lr(s, { durationUnit: g, calendar: H }), Ie.current = s), G(() => {
    lr(s, { durationUnit: g, calendar: H });
  }, [s, g, H, L]);
  const He = $(() => {
    if (!ce) return null;
    const we = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Map(), $e = (Oe) => {
      Oe.forEach((ze) => {
        const Ye = ze.row ?? ze.id;
        Pe.set(ze.id, Ye), we.has(Ye) || we.set(Ye, []), we.get(Ye).push(ze.id), ze.data && ze.data.length > 0 && $e(ze.data);
      });
    };
    return $e(s), { rowMap: we, taskRows: Pe };
  }, [s, ce]), K = $(() => xe.in, [xe]), pe = U(null);
  pe.current === null && (pe.current = new Us((we, Pe) => {
    const $e = "on" + Rd(we);
    Se.current && Se.current[$e] && Se.current[$e](Pe);
  }), K.setNext(pe.current));
  const [ke, De] = j(null), B = U(null);
  B.current = ke;
  const be = $(
    () => ({
      getState: xe.getState.bind(xe),
      getReactiveState: xe.getReactive.bind(xe),
      getStores: () => ({ data: xe }),
      exec: K.exec,
      setNext: (we) => (pe.current = pe.current.setNext(we), pe.current),
      intercept: K.intercept.bind(K),
      on: K.on.bind(K),
      detach: K.detach.bind(K),
      getTask: xe.getTask.bind(xe),
      serialize: xe.serialize.bind(xe),
      getTable: (we) => we ? new Promise((Pe) => setTimeout(() => Pe(B.current), 1)) : B.current,
      getHistory: () => xe.getHistory()
    }),
    [xe, K]
  );
  Tt(
    fe,
    () => ({
      ...be
    }),
    [be]
  );
  const Me = U(0);
  G(() => {
    Me.current ? xe.init({
      tasks: s,
      links: se.links,
      start: d,
      columns: se.columns,
      end: u,
      lengthUnit: h,
      cellWidth: se.cellWidth,
      cellHeight: f,
      scaleHeight: w,
      scales: se.scales,
      taskTypes: r,
      zoom: se.zoom,
      selected: o,
      activeTask: i,
      baselines: k,
      autoScale: C,
      unscheduledTasks: D,
      markers: n,
      durationUnit: g,
      criticalPath: Y,
      schedule: _,
      projectStart: M,
      projectEnd: P,
      calendar: H,
      undo: I,
      _weekStart: J.weekStart,
      splitTasks: L
    }) : S && S(be), Me.current++;
  }, [
    be,
    S,
    s,
    se,
    d,
    u,
    h,
    f,
    w,
    r,
    o,
    i,
    k,
    C,
    D,
    n,
    g,
    Y,
    _,
    M,
    P,
    H,
    I,
    J,
    L,
    xe
  ]), Me.current === 0 && xe.init({
    tasks: s,
    links: se.links,
    start: d,
    columns: se.columns,
    end: u,
    lengthUnit: h,
    cellWidth: se.cellWidth,
    cellHeight: f,
    scaleHeight: w,
    scales: se.scales,
    taskTypes: r,
    zoom: se.zoom,
    selected: o,
    activeTask: i,
    baselines: k,
    autoScale: C,
    unscheduledTasks: D,
    markers: n,
    durationUnit: g,
    criticalPath: Y,
    schedule: _,
    projectStart: M,
    projectEnd: P,
    calendar: H,
    undo: I,
    _weekStart: J.weekStart,
    splitTasks: L
  });
  const me = $(() => {
    const we = /* @__PURE__ */ new Date(), Pe = J?.weekStart ?? 0, $e = new Date(Date.UTC(we.getUTCFullYear(), we.getUTCMonth(), we.getUTCDate())), ze = ($e.getUTCDay() - Pe + 7) % 7;
    $e.setUTCDate($e.getUTCDate() - ze), $e.setUTCHours(0, 0, 0, 0);
    const Ye = new Date($e);
    return Ye.setUTCDate(Ye.getUTCDate() + 7), (O) => O >= $e && O < Ye;
  }, [J]), Le = $(() => (we, Pe) => {
    let $e = [];
    if (H)
      Pe == "day" && !H.getDayHours(we) && $e.push("wx-weekend"), Pe == "hour" && !H.getDayHours(we) && $e.push("wx-weekend");
    else if (T) {
      const Oe = T(we, Pe);
      Oe && $e.push(Oe);
    }
    return le && (Pe === "week" || Pe === "day") && me(we) && $e.push("wx-current-week"), $e.join(" ");
  }, [H, T, le, me]);
  return /* @__PURE__ */ p(Je.i18n.Provider, { value: de, children: /* @__PURE__ */ p(wt.Provider, { value: be, children: /* @__PURE__ */ p(
    Td,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: Le,
      onTableAPIChange: De,
      multiTaskRows: ce,
      rowMapping: He,
      marqueeSelect: ue,
      copyPaste: re,
      scrollToCurrentWeek: W,
      currentWeekColor: ye,
      allowTaskIntersection: ae
    }
  ) }) });
});
function Ld({ api: t = null, items: e = [] }) {
  const n = Ce(Je.i18n), r = $(() => n || Nt(Rn), [n]), s = $(() => r.getGroup("gantt"), [r]), o = ct(t, "_selected"), i = ct(t, "undo"), a = ct(t, "history"), l = ct(t, "splitTasks"), c = ["undo", "redo"], d = $(() => {
    const h = dr();
    return (e.length ? e : dr()).map((m) => {
      let f = { ...m, disabled: !1 };
      return f.handler = Dr(h, f.id) ? (w) => At(t, w.id, null, s) : f.handler, f.text && (f.text = s(f.text)), f.menuText && (f.menuText = s(f.menuText)), f;
    });
  }, [e, t, s, i, l]), u = $(() => {
    const h = [];
    return d.forEach((g) => {
      const m = g.id;
      if (m === "add-task")
        h.push(g);
      else if (c.includes(m))
        c.includes(m) && h.push({
          ...g,
          disabled: g.isDisabled(a)
        });
      else {
        if (!o?.length || !t) return;
        h.push({
          ...g,
          disabled: g.isDisabled && o.some((f) => g.isDisabled(f, t.getState()))
        });
      }
    }), h.filter((g, m) => {
      if (t && g.isHidden)
        return !o.some((f) => g.isHidden(f, t.getState()));
      if (g.comp === "separator") {
        const f = h[m + 1];
        if (!f || f.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, o, a, d]);
  return n ? /* @__PURE__ */ p(fr, { items: u }) : /* @__PURE__ */ p(Je.i18n.Provider, { value: r, children: /* @__PURE__ */ p(fr, { items: u }) });
}
const Od = _t(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: a,
  css: l
}, c) {
  const d = U(null), u = U(null), h = Ce(Je.i18n), g = $(() => h || Nt({ ...Rn, ...vr }), [h]), m = $(() => g.getGroup("gantt"), [g]), f = ct(n, "taskTypes"), w = ct(n, "selected"), x = ct(n, "_selected"), y = ct(n, "splitTasks"), b = $(() => cr(), []);
  G(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function k(H) {
    return H.map((I) => (I = { ...I }, I.text && (I.text = m(I.text)), I.subtext && (I.subtext = m(I.subtext)), I.data && (I.data = k(I.data)), I));
  }
  function T() {
    const H = e.length ? e : cr(), I = H.find((L) => L.id === "convert-task");
    return I && (I.data = [], (f || []).forEach((L) => {
      I.data.push(I.dataFactory(L));
    })), k(H);
  }
  const S = $(() => T(), [n, e, f, y, m]), C = $(
    () => x && x.length ? x : [],
    [x]
  ), D = E(
    (H, I) => {
      let L = H ? n?.getTask(H) : null;
      if (r) {
        const ce = r(H, I);
        L = ce === !0 ? L : ce;
      }
      if (L) {
        const ce = bt(I.target, "data-segment");
        ce !== null ? u.current = { id: L.id, segmentIndex: ce } : u.current = L.id, (!Array.isArray(w) || !w.includes(L.id)) && n && n.exec && n.exec("select-task", { id: L.id });
      }
      return L;
    },
    [n, r, w]
  ), Y = E(
    (H) => {
      const I = H.action;
      I && (Dr(b, I.id) && At(n, I.id, u.current, m), a && a(H));
    },
    [n, m, a, b]
  ), _ = E(
    (H, I) => {
      const L = C.length ? C : I ? [I] : [];
      let ce = s ? L.every((ue) => s(H, ue)) : !0;
      if (ce && (H.isHidden && (ce = !L.some(
        (ue) => H.isHidden(ue, n.getState(), u.current)
      )), H.isDisabled)) {
        const ue = L.some(
          (re) => H.isDisabled(re, n.getState(), u.current)
        );
        H.disabled = ue;
      }
      return ce;
    },
    [s, C, n]
  );
  Tt(c, () => ({
    show: (H, I) => {
      d.current && d.current.show && d.current.show(H, I);
    }
  }));
  const M = E((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), P = /* @__PURE__ */ Z(Re, { children: [
    /* @__PURE__ */ p(
      Oo,
      {
        filter: _,
        options: S,
        dataKey: "id",
        resolver: D,
        onClick: Y,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: M, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && Je.i18n?.Provider) {
    const H = Je.i18n.Provider;
    return /* @__PURE__ */ p(H, { value: g, children: P });
  }
  return P;
}), gr = {};
function _s(t) {
  return typeof t < "u" ? gr[t] || t : gr.text;
}
function tt(t, e) {
  gr[t] = e;
}
const Pd = {
  editor: {}
};
function Xn(t) {
  const {
    editors: e,
    data: n,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: i,
    children: a,
    onChange: l
  } = t, c = U(null);
  G(() => {
    if (o) {
      const g = document.activeElement;
      if (g && c.current && c.current.contains(g)) return;
      const m = c.current ? c.current.querySelector(
        "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
      ) : null;
      m && setTimeout(() => {
        typeof m.select == "function" && m.select(), typeof m.focus == "function" && m.focus();
      }, 300);
    }
  }, []);
  const d = Ce(Je.i18n), u = $(() => d.getGroup("editor"), [d]), h = $(
    () => e.config[0].comp === "readonly" && e.config.every((g) => !Object.keys(n).includes(g.key)),
    [e, n]
  );
  return /* @__PURE__ */ Z("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    a,
    h ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((g) => {
      if (!g.hidden) {
        const { key: m, onChange: f, ...w } = g;
        if (g.comp === "readonly" || g.comp === "section") {
          const x = _s(g.comp);
          return /* @__PURE__ */ p(
            x,
            {
              fieldKey: m,
              label: g.label,
              value: n[m],
              ...w,
              onClick: i
            },
            m
          );
        } else {
          const x = _s(g.comp);
          return /* @__PURE__ */ Z("div", { children: [
            /* @__PURE__ */ p(
              en,
              {
                label: g.labelTemplate ? g.labelTemplate(n[m]) : g.label ?? "",
                required: g.required,
                children: /* @__PURE__ */ p(
                  x,
                  {
                    fieldKey: m,
                    ...w,
                    onChange: f || ((y) => {
                      l && l({
                        value: y.value,
                        key: m,
                        input: y.input
                      });
                    }),
                    label: void 0,
                    error: s && s[m],
                    value: n[m]
                  },
                  m
                )
              }
            ),
            s && s[m] && g.validationMessage ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-message", children: g.validationMessage }) : null
          ] }, m);
        }
      }
      return null;
    })
  ] });
}
function Wd(t) {
  if (typeof t == "string" && t.includes(".")) {
    const e = t.split(".");
    return (n) => {
      let r = n;
      return e.forEach((s) => {
        r = r[s];
      }), r;
    };
  }
  return (e) => e[t];
}
function zd(t) {
  if (typeof t == "string" && t.includes(".")) {
    const e = t.split(".");
    return (n, r) => {
      let s = n;
      e.forEach((o, i) => {
        i === e.length - 1 ? s[o] = r : s = s[o];
      });
    };
  }
  return (e, n) => e[t] = n;
}
function Fd(t) {
  const e = t.map((i) => {
    const a = { ...i };
    return i.config && Object.assign(a, i.config), a.key = i.key || ta(), a.setter = i.setter || zd(i.key), a.getter = i.getter || Wd(i.key), a;
  }), n = (i) => {
    const a = {};
    return e.forEach((l) => {
      l.comp !== "section" && (l.getter ? a[l.key] = l.getter(i) : a[l.key] = i[l.key]);
    }), a;
  }, r = (i, a, l) => ((l.length ? l.map((c) => e.find((d) => d.key === c)) : e).forEach((c) => {
    c.setter ? c.setter(i, a[c.key]) : i[c.key] = a[c.key];
  }), i), s = (i, a) => {
    const l = n(i), c = [];
    return e.forEach((d) => {
      const u = l[d.key], h = a[d.key];
      !An(u, h) && (u !== void 0 || h) && c.push(d.key);
    }), c;
  }, o = (i, a, l) => {
    let c = 0;
    const d = {};
    return (a?.length ? a.map((u) => e.find((h) => h.key === u)) : e).forEach((u) => {
      u.required && !i[u.key] ? (d[u.key] = {
        errorType: "required"
      }, u.validationMessage = u.validationMessage ?? l("This field is required"), c++) : u.validation && !u.validation(i[u.key]) && (d[u.key] = {
        errorType: "validation"
      }, u.validationMessage = u.validationMessage ?? l("Invalid value"), c++);
    }), c > 0 ? d : null;
  };
  return {
    config: e.filter((i) => i.comp !== "hidden"),
    getValues: n,
    setValues: r,
    diff: s,
    validateValues: o
  };
}
function Ud({
  values: t,
  items: e,
  css: n,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: i,
  topBar: a = !0,
  bottomBar: l = !0,
  layout: c = "default",
  placement: d = "inline",
  view: u,
  children: h,
  onChange: g,
  onSave: m,
  onAction: f,
  onValidation: w,
  hotkeys: x
}) {
  const y = Ce(Je.i18n).getGroup("editor"), [b, k] = Ue(t), [T, S] = j(null), C = $(() => {
    const W = Fd(e);
    T && W.config.forEach((fe) => {
      fe.comp === "section" && fe.key === T && (fe.sectionMode === "accordion" ? fe.activeSection || (W.config.forEach((Se) => {
        Se.comp === "section" && Se.key !== fe.key && (Se.activeSection = !1);
      }), fe.activeSection = !0) : fe.activeSection = !fe.activeSection);
    });
    let ae = /* @__PURE__ */ new Set(), ve = null;
    return W.config.forEach((fe) => {
      fe.sectionMode === "exclusive" && fe.activeSection && (ve = fe.key), fe.activeSection && ae.add(fe.key);
    }), W.config.forEach((fe) => {
      fe.hidden = fe.hidden || r && r !== fe.batch || ve && fe.key != ve && fe.section !== ve || fe.section && !ae.has(fe.section);
    }), i ? {
      ...W,
      config: W.config.map((fe) => ({ ...fe, comp: "readonly" })),
      diff: () => []
    } : W;
  }, [e, T, r, i]), [D, Y] = j({}), [_, M] = j({}), P = b;
  G(() => {
    b !== void 0 && (Y($n(b)), M($n(b)), P.errors && (P.errors = ce()));
  }, [b]);
  const [H, I] = j([]);
  G(() => {
    b && I([]);
  }, [b]);
  function L(W) {
    return [...new Set(W)];
  }
  function ce(W) {
    const ae = C.validateValues(D, W, y);
    return An(ae, P.errors) || w && w({ errors: ae, values: D }), ae;
  }
  function ue(W, ae) {
    if (s && !P.errors) {
      const ve = C.setValues(b, ae ?? _, W);
      k(ve), m && m({ changes: W, values: ve });
    } else
      I(W);
  }
  function re({ value: W, key: ae, input: ve }) {
    let fe = { ..._ || {}, [ae]: W };
    const Se = {
      key: ae,
      value: W,
      update: fe
    };
    if (ve && (Se.input = ve), g && g(Se), !b) return;
    fe = Se.update, M(fe);
    const xe = C.diff(b, fe), V = C.setValues(
      { ...D || {} },
      fe,
      L([...xe, ae])
    );
    if (Y(V), xe.length) {
      const Q = s ? [] : L([...xe, ...Object.keys(P.errors ?? {}), ae]);
      P.errors = ce(Q), ue(xe, fe);
    } else {
      const Q = Object.keys(P.errors ?? {});
      Q.length && (P.errors = ce(Q)), I([]);
    }
  }
  function le() {
    if (H.length && (s || (P.errors = ce()), !P.errors)) {
      m && m({
        changes: H,
        values: D
      });
      const W = C.setValues(b, _, H);
      k(W), I([]), k({ ...D });
    }
  }
  function ye({ item: W }) {
    W.id === "save" ? le() : W.id === "toggle-section" && S(W.key), f && f({ item: W, values: D, changes: H });
  }
  return /* @__PURE__ */ p(
    u,
    {
      topBar: a,
      bottomBar: l,
      placement: d,
      layout: c,
      readonly: i,
      autoSave: s,
      css: n,
      data: _,
      editors: C,
      focus: o,
      hotkeys: x,
      errors: P.errors,
      onClick: ye,
      onKeyDown: ye,
      onChange: re,
      children: h
    }
  );
}
function Yd(t) {
  const { editors: e, data: n, layout: r, errors: s, focus: o, onClick: i, onChange: a } = t, l = $(() => {
    let c = [];
    if (r === "columns" && (c = [
      { ...e, config: [] },
      { ...e, config: [] }
    ], e.config.forEach((d) => {
      const u = d.column === "left" ? 0 : 1;
      c[u].config.push(d);
    }), c[0].config.length)) {
      const d = c[0].config[0];
      d.comp === "text" && (c[0][0] = {
        ...d,
        css: "title",
        label: ""
      });
    }
    return c;
  }, [r, e]);
  return r === "columns" ? /* @__PURE__ */ Z("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ p(
      Xn,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ p(
      Xn,
      {
        editors: l[1],
        data: n,
        focus: o,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) })
  ] }) : /* @__PURE__ */ p(
    Xn,
    {
      editors: e,
      data: n,
      focus: o,
      errors: s,
      onClick: i,
      onChange: a
    }
  );
}
function Ts({
  items: t,
  values: e = null,
  top: n = !0,
  onClick: r,
  onChange: s
}) {
  const o = E(
    ({ item: i, value: a }) => {
      s && s({ key: i.key, value: a });
    },
    [s]
  );
  return t.length ? /* @__PURE__ */ p(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ p(
        fr,
        {
          items: t,
          values: e,
          onClick: r,
          onChange: o
        }
      )
    }
  ) : null;
}
const Xt = () => ({ comp: "spacer" }), Qn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Jn = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), Ns = () => ({
  comp: "icon",
  icon: "wxi-close",
  id: "close"
});
function Zn(t) {
  const {
    data: e,
    editors: n,
    focus: r,
    css: s,
    topBar: o,
    bottomBar: i,
    layout: a,
    placement: l,
    errors: c,
    readonly: d,
    autoSave: u,
    children: h,
    onClick: g,
    onKeyDown: m,
    onChange: f,
    hotkeys: w
  } = t, x = Ce(Je.i18n), y = $(() => x.getGroup("editor"), [x]), b = $(
    () => o === !0 && i === !0,
    [o, i]
  ), k = $(() => {
    let _ = o && o.items ? o.items.map((M) => ({ ...M })) : [];
    return b && (d ? _ = [Xt(), Ns()] : (u ? _ = [Xt(), Ns()] : l !== "modal" && (_ = [Xt(), Qn(y), Jn(y)]), a === "columns" && !_.length && (_ = [Xt(), Jn(y), Qn(y)]))), _;
  }, [o, b, d, u, l, a, y]), T = $(() => {
    let _ = i && i.items ? i.items.map((M) => ({ ...M })) : [];
    return b && (d || (l === "modal" && !u && (_ = [Xt(), Jn(y), Qn(y)]), a === "columns" && k.length && (_ = []))), _;
  }, [i, b, d, l, u, a, k, y]), S = $(() => [...k, ...T], [k, T]), C = U(null), D = U(null);
  D.current = (_, ...M) => {
    const P = S.findIndex((L) => M.includes(L.id));
    if (P === -1) return !1;
    const H = _.target, I = S[P];
    _.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || _.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (_.preventDefault(), m && m({ item: I }));
  };
  const Y = $(() => w === !1 ? {} : {
    "ctrl+s": (_) => D.current(_, "save"),
    escape: (_) => D.current(_, "cancel", "close"),
    "ctrl+d": (_) => D.current(_, "delete"),
    ...w || {}
  }, [w]);
  return hi(Y, C), /* @__PURE__ */ Z("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: C, children: [
    /* @__PURE__ */ p(
      Ts,
      {
        ...o && typeof o == "object" ? o : {},
        items: k,
        values: e,
        onClick: g,
        onChange: f
      }
    ),
    /* @__PURE__ */ Z(
      "div",
      {
        className: `wx-85HDaNoA wx-content${a === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          h,
          /* @__PURE__ */ p(
            Yd,
            {
              editors: n,
              layout: a,
              data: e,
              focus: r,
              errors: c,
              onClick: g,
              onChange: f
            }
          ),
          /* @__PURE__ */ p(
            Ts,
            {
              ...i && typeof i == "object" ? i : {},
              items: T,
              values: e,
              top: !1,
              onClick: g,
              onChange: f
            }
          )
        ]
      }
    )
  ] });
}
function Vd(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ p(Gi, { children: /* @__PURE__ */ p(
    Zn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ p(Bi, { onCancel: o, children: /* @__PURE__ */ p(
    Zn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ p(
    Zn,
    {
      css: `wx-inline-form ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  );
}
function Kd(t) {
  const {
    values: e = {},
    items: n = [],
    css: r = "",
    activeBatch: s = null,
    topBar: o = !0,
    bottomBar: i = !0,
    focus: a = !1,
    autoSave: l = !1,
    layout: c = "default",
    readonly: d = !1,
    placement: u = "inline",
    children: h,
    ...g
  } = t, m = Object.keys(g).reduce((f, w) => {
    if (/^on[a-z]/.test(w)) {
      const x = "on" + w.charAt(2).toUpperCase() + w.slice(3);
      x in g ? f[w] = g[w] : f[x] = g[w];
    } else
      f[w] = g[w];
    return f;
  }, {});
  return /* @__PURE__ */ p(In, { words: Pd, optional: !0, children: /* @__PURE__ */ p(
    Ud,
    {
      view: Vd,
      values: e,
      items: n,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: i,
      focus: a,
      autoSave: l,
      layout: c,
      readonly: d,
      placement: u,
      ...m,
      children: h
    }
  ) });
}
function Gd({ value: t, options: e, label: n }) {
  const r = Ce(Je.i18n).getGroup("editor"), s = $(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(en, { label: n, children: s }) : null;
}
function Bd({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-OmgQq65I wx-section${n ? " wx-section-active" : ""}`,
      onClick: () => r && r({
        item: { id: "toggle-section", key: n ? null : t }
      }),
      children: [
        /* @__PURE__ */ p("h3", { children: e }),
        /* @__PURE__ */ p(
          "i",
          {
            className: `wx-OmgQq65I wxi-angle-${n ? "down" : "right"} wx-icon`
          }
        )
      ]
    }
  );
}
tt("text", an);
tt("textarea", vi);
tt("checkbox", ki);
tt("readonly", Gd);
tt("section", Bd);
pr(Qe);
function jd({ api: t, autoSave: e, onLinksChange: n }) {
  const s = Ce(Je.i18n).getGroup("gantt"), o = ie(t, "activeTask"), i = ie(t, "_activeTask"), a = ie(t, "_links"), l = ie(t, "schedule"), c = ie(t, "unscheduledTasks"), [d, u] = j();
  function h() {
    if (o) {
      const w = a.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), x = a.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: w },
        { title: s("Successors"), data: x }
      ];
    }
  }
  G(() => {
    u(h());
  }, [o, a]);
  const g = $(
    () => [
      { id: "e2s", label: s("End-to-start") },
      { id: "s2s", label: s("Start-to-start") },
      { id: "e2e", label: s("End-to-end") },
      { id: "s2e", label: s("Start-to-end") }
    ],
    [s]
  );
  function m(w) {
    e ? t.exec("delete-link", { id: w }) : (u(
      (x) => (x || []).map((y) => ({
        ...y,
        data: y.data.filter((b) => b.link.id !== w)
      }))
    ), n && n({
      id: w,
      action: "delete-link",
      data: { id: w }
    }));
  }
  function f(w, x) {
    e ? t.exec("update-link", {
      id: w,
      link: x
    }) : (u(
      (y) => (y || []).map((b) => ({
        ...b,
        data: b.data.map(
          (k) => k.link.id === w ? { ...k, link: { ...k.link, ...x } } : k
        )
      }))
    ), n && n({
      id: w,
      action: "update-link",
      data: {
        id: w,
        link: x
      }
    }));
  }
  return /* @__PURE__ */ p(Re, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(en, { label: w.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: w.data.map((y) => /* @__PURE__ */ Z("tr", { children: [
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ p(
        an,
        {
          type: "number",
          placeholder: s("Lag"),
          value: y.link.lag,
          disabled: c && i?.unscheduled,
          onChange: (b) => {
            b.input || f(y.link.id, { lag: b.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ p(
        Si,
        {
          value: y.link.type,
          placeholder: s("Select link type"),
          options: g,
          onChange: (b) => f(y.link.id, { type: b.value }),
          children: ({ option: b }) => b.label
        }
      ) }) }),
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p(
        "i",
        {
          className: "wx-j93aYGQf wxi-delete wx-delete-icon",
          onClick: () => m(y.link.id),
          role: "button"
        }
      ) })
    ] }, y.link.id)) }) }) }) }, x) : null
  ) });
}
function qd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, a = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setUTCHours(e.getUTCHours()), d.setUTCMinutes(e.getUTCMinutes()), a && a({ value: d });
  }
  return /* @__PURE__ */ Z("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ p(
      Wi,
      {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ p(Ki, { value: e, onChange: a, format: r }) : null
  ] });
}
tt("select", Ps);
tt("date", qd);
tt("twostate", Ws);
tt("slider", nr);
tt("counter", zi);
tt("links", jd);
function Xd({
  api: t,
  items: e = [],
  css: n = "",
  layout: r = "default",
  readonly: s = !1,
  placement: o = "sidebar",
  bottomBar: i = !0,
  topBar: a = !0,
  autoSave: l = !0,
  focus: c = !1,
  hotkeys: d = {}
}) {
  const u = Ce(Je.i18n), h = $(() => u || Nt({ ...Rn, ...vr }), [u]), g = $(() => h.getGroup("gantt"), [h]), m = h.getRaw(), f = $(() => {
    const B = m.gantt?.dateFormat || m.formats?.dateFormat;
    return dt(B, m.calendar);
  }, [m]), w = $(() => {
    if (a === !0 && !s) {
      const B = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: g("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: B } : {
        items: [
          ...B,
          {
            comp: "button",
            type: "primary",
            text: g("Save"),
            id: "save"
          }
        ]
      };
    }
    return a;
  }, [a, s, l, g]), [x, y] = j(!1), b = $(
    () => x ? "wx-full-screen" : "",
    [x]
  ), k = E((B) => {
    y(B);
  }, []);
  G(() => {
    const B = Vo(k);
    return B.observe(), () => {
      B.disconnect();
    };
  }, [k]);
  const T = ie(t, "_activeTask"), S = ie(t, "activeTask"), C = ie(t, "unscheduledTasks"), D = ie(t, "links"), Y = ie(t, "splitTasks"), _ = $(
    () => Y && S?.segmentIndex,
    [Y, S]
  ), M = $(
    () => _ || _ === 0,
    [_]
  ), P = $(
    () => $o(),
    [C]
  ), H = ie(t, "undo"), [I, L] = j({}), [ce, ue] = j(null), [re, le] = j(), [ye, W] = j(null), ae = ie(t, "taskTypes"), ve = $(() => {
    if (!T) return null;
    let B;
    if (M && T.segments ? B = { ...T.segments[_] } : B = { ...T }, s) {
      let be = { parent: B.parent };
      return P.forEach(({ key: Me, comp: me }) => {
        if (me !== "links") {
          const Le = B[Me];
          me === "date" && Le instanceof Date ? be[Me] = f(Le) : me === "slider" && Me === "progress" ? be[Me] = `${Le}%` : be[Me] = Le;
        }
      }), be;
    }
    return B || null;
  }, [T, M, _, s, P, f]);
  G(() => {
    le(ve);
  }, [ve]), G(() => {
    L({}), W(null), ue(null);
  }, [S]);
  function fe(B, be) {
    return B.map((Me) => {
      const me = { ...Me };
      if (Me.config && (me.config = { ...me.config }), me.comp === "links" && t && (me.api = t, me.autoSave = l, me.onLinksChange = V), me.comp === "select" && me.key === "type") {
        const Le = me.options ?? (ae || []);
        me.options = Le.map((we) => ({
          ...we,
          label: g(we.label)
        }));
      }
      return me.comp === "slider" && me.key === "progress" && (me.labelTemplate = (Le) => `${g(me.label)} ${Le}%`), me.label && (me.label = g(me.label)), me.config?.placeholder && (me.config.placeholder = g(me.config.placeholder)), be && (me.isDisabled && me.isDisabled(be, t.getState()) ? me.disabled = !0 : delete me.disabled), me;
    });
  }
  const Se = $(() => {
    let B = e.length ? e : P;
    return B = fe(B, re), re ? B.filter(
      (be) => !be.isHidden || !be.isHidden(re, t.getState())
    ) : B;
  }, [e, P, re, ae, g, t, l]), xe = $(
    () => Se.map((B) => B.key),
    [Se]
  );
  function V({ id: B, action: be, data: Me }) {
    L((me) => ({
      ...me,
      [B]: { action: be, data: Me }
    }));
  }
  const Q = E(() => {
    for (let B in I)
      if (D.byId(B)) {
        const { action: be, data: Me } = I[B];
        t.exec(be, Me);
      }
  }, [t, I, D]), de = E(() => {
    const B = S?.id || S;
    if (M) {
      if (T?.segments) {
        const be = T.segments.filter(
          (Me, me) => me !== _
        );
        t.exec("update-task", {
          id: B,
          task: { segments: be }
        });
      }
    } else
      t.exec("delete-task", { id: B });
  }, [t, S, M, T, _]), J = E(() => {
    t.exec("show-editor", { id: null });
  }, [t]), se = E(
    (B) => {
      const { item: be, changes: Me } = B;
      be.id === "delete" && de(), be.id === "save" && (Me.length ? J() : Q()), be.comp && J();
    },
    [t, S, l, Q, de, J]
  ), Ie = E(
    (B, be, Me) => (C && B.type === "summary" && (B.unscheduled = !1), ko(B, t.getState(), be), Me || ue(!1), B),
    [C, t]
  ), He = E(
    (B) => {
      B = {
        ...B,
        unscheduled: C && B.unscheduled && B.type !== "summary"
      }, delete B.links, delete B.data, (xe.indexOf("duration") === -1 || B.segments && !B.duration) && delete B.duration;
      const be = {
        id: S?.id || S,
        task: B,
        ...M && { segmentIndex: _ }
      };
      l && ce && (be.inProgress = ce), t.exec("update-task", be), l || Q();
    },
    [
      t,
      S,
      C,
      l,
      Q,
      xe,
      M,
      _,
      ce
    ]
  ), K = E(
    (B) => {
      let { update: be, key: Me, input: me } = B;
      if (me && ue(!0), B.update = Ie({ ...be }, Me, me), !l) le(B.update);
      else if (!ye && !me) {
        const Le = Se.find(($e) => $e.key === Me), we = be[Me];
        (!Le.validation || Le.validation(we)) && (!Le.required || we) && He(B.update);
      }
    },
    [l, Ie, ye, Se, He]
  ), pe = E(
    (B) => {
      l || He(B.values);
    },
    [l, He]
  ), ke = E((B) => {
    W(B.errors);
  }, []), De = $(
    () => H ? {
      "ctrl+z": (B) => {
        B.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (B) => {
        B.preventDefault(), t.exec("redo");
      }
    } : {},
    [H, t]
  );
  return ve ? /* @__PURE__ */ p(In, { children: /* @__PURE__ */ p(
    Kd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${b} ${n}`,
      items: Se,
      values: ve,
      topBar: w,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: se,
      onSave: pe,
      onValidation: ke,
      onChange: K,
      hotkeys: d && { ...De, ...d }
    }
  ) }) : null;
}
const Qd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = j(null);
  return G(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(ud, { api: r, columns: e, children: t });
};
function Jd(t) {
  const { api: e, content: n, children: r } = t, s = U(null), o = U(null), [i, a] = j({}), [l, c] = j(null), [d, u] = j({});
  function h(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const T = k.getAttribute("data-tooltip-id"), S = k.getAttribute("data-tooltip-at"), C = k.getAttribute("data-tooltip");
        if (T || C) return { id: T, tooltip: C, target: k, at: S };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  G(() => {
    const k = o.current;
    if (k && d && (d.text || n)) {
      const T = k.getBoundingClientRect();
      let S = !1, C = d.left, D = d.top;
      T.right >= i.right && (C = i.width - T.width - 5, S = !0), T.bottom >= i.bottom && (D = d.top - (T.bottom - i.bottom + 2), S = !0), S && u((Y) => Y && { ...Y, left: C, top: D });
    }
  }, [d, i, n]);
  const g = U(null), m = 300, f = (k) => {
    clearTimeout(g.current), g.current = setTimeout(() => {
      k();
    }, m);
  };
  function w(k) {
    let { id: T, tooltip: S, target: C, at: D } = h(k.target);
    if (u(null), c(null), !S)
      if (T)
        S = y(T);
      else {
        clearTimeout(g.current);
        return;
      }
    const Y = k.clientX;
    f(() => {
      T && c(x(b(T)));
      const _ = C.getBoundingClientRect(), M = s.current, P = M ? M.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, I;
      D === "left" ? (H = _.top + 5 - P.top, I = _.right + 5 - P.left) : (H = _.top + _.height - P.top, I = Y - P.left), a(P), u({ top: H, left: I, text: S });
    });
  }
  function x(k) {
    return e?.getTask(b(k)) || null;
  }
  function y(k) {
    return x(k)?.text || "";
  }
  function b(k) {
    const T = parseInt(k);
    return isNaN(T) ? k : T;
  }
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: s,
      onMouseMove: w,
      children: [
        d && (d.text || n) ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: o,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: n ? /* @__PURE__ */ p(n, { data: l }) : d.text ? /* @__PURE__ */ p("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        r
      ]
    }
  );
}
function Zd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(jr, { fonts: t, children: e() }) : /* @__PURE__ */ p(jr, { fonts: t });
}
function eu({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(qr, { fonts: t, children: e }) : /* @__PURE__ */ p(qr, { fonts: t });
}
function tu({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Xr, { fonts: t, children: e }) : /* @__PURE__ */ p(Xr, { fonts: t });
}
const mu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: Od,
  Editor: Xd,
  Gantt: Hd,
  HeaderMenu: Qd,
  Material: Zd,
  Toolbar: Ld,
  Tooltip: Jd,
  Willow: eu,
  WillowDark: tu,
  defaultColumns: yo,
  defaultEditorItems: Co,
  defaultMenuOptions: bo,
  defaultTaskTypes: _o,
  defaultToolbarButtons: So,
  getEditorItems: $o,
  getMenuOptions: cr,
  getToolbarButtons: dr,
  registerEditorItem: tt,
  registerScaleUnit: Ja
}, Symbol.toStringTag, { value: "Module" }));
export {
  mu as default
};
