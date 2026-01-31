import { jsx as p, jsxs as Z, Fragment as Ae } from "react/jsx-runtime";
import jo, { useState as G, useEffect as K, useRef as F, useContext as _e, useMemo as $, createContext as Wt, useCallback as I, forwardRef as _t, useImperativeHandle as Tt, useId as qo, Fragment as Ns } from "react";
import { createPortal as Xo, flushSync as Qo } from "react-dom";
function Ge(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function er(t, e = "data-id") {
  const n = Ge(t, e);
  return n ? n.getAttribute(e) : null;
}
function bt(t, e = "data-id") {
  const n = Ge(t, e);
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
var Je = Jo();
function pr(t) {
  Object.assign(Je, t);
}
function Hr(t, e, n) {
  function r(s) {
    const o = Ge(s);
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
  Je.addEvent(t, n, r);
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
function nn(t, e) {
  hn.length || (hn = [
    Je.addGlobalEvent("click", Lr, t),
    Je.addGlobalEvent("contextmenu", Lr, t),
    Je.addGlobalEvent("mousedown", ei, t)
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
  const r = Je.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ke, Xe, Bt, Ve;
function si(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ke = r, Xe = s, Bt = "auto";
  let o = 0, i = 0;
  const a = oi(t), l = wn(n) ? Je.getTopNode(t) : a;
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
    if (Ve = e.getBoundingClientRect(), Or(n) && (Bt = Ve.width + "px"), n !== "point")
      if (ti(n))
        Or(n) ? Ke = 0 : (Ke = u.width / 2, i = 1), Xe = (u.height - d.height) / 2;
      else {
        const b = wn(n) ? 0 : 1;
        Ke = mn(n) ? Ve.right + b : Ve.left - b, Xe = gn(n) ? Ve.bottom + 1 : Ve.top;
        const k = ni(n);
        k && (mn(n) || pn(n) ? k === "center" ? Xe -= (d.height - Ve.height) / 2 : k === "end" && (Xe -= d.height - Ve.height) : (gn(n) || Fn(n)) && (k === "center" ? Ke -= (d.width - Ve.width) / 2 : k === "end" && (Ke -= d.width - Ve.width), wn(n) || (Ke += 1)));
      }
  } else Ve = { left: r, right: r, top: s, bottom: s };
  const m = (pn(n) || mn(n)) && (gn(n) || Fn(n));
  pn(n) && (i = 2);
  const f = Ke - d.width - u.left;
  e && pn(n) && !m && f < 0 && (Ke = Ve.right, i = 0);
  const x = Ke + d.width * (1 - i / 2) - u.right;
  if (x > 0)
    if (!mn(n))
      Ke = u.right - g.right - d.width;
    else {
      const b = Ve.left - u.x - d.width;
      e && !wn(n) && !m && b >= 0 ? Ke = Ve.left - d.width : Ke -= x + g.right;
    }
  i && (Ke = Math.round(Ke - d.width * i / 2));
  const w = f < 0 || x > 0 || !m;
  Fn(n) && (Xe = Ve.top - d.height, e && Xe < u.y && w && (Xe = Ve.bottom));
  const y = Xe + d.height - u.bottom;
  return y > 0 && (e && gn(n) && w ? Xe -= d.height + Ve.height + 1 : Xe -= y + g.bottom), Ke -= c.left + g.left, Xe -= c.top + g.top, Ke = Math.max(Ke, 0) + l.scrollLeft, Xe = Math.max(Xe, 0) + l.scrollTop, Bt = Bt || "auto", { x: Ke, y: Xe, z: o, width: Bt };
}
function oi(t) {
  const e = Je.getTopNode(t);
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
function Qe(t) {
  return t < 10 ? "0" + t : t.toString();
}
function li(t) {
  const e = Qe(t);
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
      return Qe(e.getDate());
    case "%m":
      return Qe(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Qe(e.getFullYear() % 100);
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
      return Qe((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Qe(e.getHours());
    case "%i":
      return Qe(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? n.pm : n.am) || Ur)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Ur)[1];
    case "%s":
      return Qe(e.getSeconds());
    case "%S":
      return li(e.getMilliseconds());
    case "%W":
      return Qe(Fr(e));
    case "%w":
      return Qe(Fr(e, n.weekStart ?? 1));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Qe(e.getMonth() + 1), r += "-" + Qe(e.getDate()), r += "T", r += Qe(e.getHours()), r += ":" + Qe(e.getMinutes()), r += ":" + Qe(e.getSeconds()), r;
    }
    case "%Q":
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return t;
  }
}
var di = /%[a-zA-Z]/g;
function lt(t, e) {
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
function Dt(t) {
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
      return n ? r = tr({ ...e }, t) : r = tr({ ...t }, e), Dt(r);
    }
  };
}
function We(t) {
  const [e, n] = G(t), r = F(t);
  return K(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ui(t, e, n) {
  const [r, s] = G(() => e);
  return t || console.warn(`Writable ${n} is not defined`), K(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function se(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ui(r[e], n[e], e);
}
function at(t, e) {
  const [n, r] = G(() => null);
  return K(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function fi(t, e) {
  const n = F(e);
  n.current = e;
  const [r, s] = G(1);
  return K(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function Qt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return fi(r[e], n[e]);
}
function hi(t, e) {
  K(() => {
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
function Kr(t, e, n) {
  function r(s) {
    const o = Ge(s);
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
  return Je.addEvent(t, n, r);
}
function gi(t, e) {
  const n = [Kr(t, e, "click")];
  return e.dblclick && n.push(Kr(t, e.dblclick, "dblclick")), () => {
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
}, rn = Wt("willow"), yi = Wt({}), rt = Wt(null), xr = Wt(null), Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: xr,
  helpers: yi,
  i18n: rt,
  theme: rn
}, Symbol.toStringTag, { value: "Module" }));
function Ft(t) {
  const e = _e(xr);
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
  const l = Ft(e), [c, d] = We(t), u = I(
    (m) => {
      const f = m.target.value;
      d(f), a && a({ value: f, input: !0 });
    },
    [a]
  ), h = I(
    (m) => {
      const f = m.target.value;
      d(f), a && a({ value: f });
    },
    [a]
  ), g = F(null);
  return K(() => {
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
function ct({
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
  const i = qo(), a = Ft(t) || i, [l, c] = We(r);
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
  const i = F(null), [a, l] = We(t), [c, d] = We(e);
  return K(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), g = Je.getTopNode(u).getBoundingClientRect();
        h.right >= g.right && d("end"), h.bottom >= g.bottom && l("top");
      }
    }
  }, [n]), K(() => {
    if (i.current) {
      const u = (h) => {
        r && r(h);
      };
      return nn(i.current, u).destroy;
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
function sn() {
  return Dt(Hs);
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
  const s = F(), o = F(bi()), [i, a] = G(null), l = F(i), c = (_e(rt) || sn()).getGroup("core"), d = (h) => {
    h && h.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  K(() => {
    o.current.init(
      s.current,
      t,
      (h) => {
        a(h), l.current = h;
      },
      d
    );
  }, [t, s.current]), K(() => {
    r && r(o.current);
  }, []);
  const u = I(() => {
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
  const h = Ft(e), g = F(null), m = F(null), [f, x] = We(t), [w, y] = G(!1), [b, k] = G(""), D = F(null), S = F(!1), C = $(() => {
    if (w) return b;
    if (f || f === 0) {
      const Q = (r || n).find((ce) => ce.id === f);
      if (Q) return Q[s];
    }
    return "";
  }, [w, b, f, r, n, s]), E = $(() => !C || !w ? n : n.filter(
    (Q) => Q[s].toLowerCase().includes(C.toLowerCase())
  ), [C, w, n, s]), z = I(
    () => E.findIndex((Q) => Q.id === f),
    [E, f]
  ), N = I((Q) => {
    g.current = Q.navigate, m.current = Q.keydown;
  }, []), M = I(
    (Q, ce) => {
      if (Q || Q === 0) {
        let Se = n.find((O) => O.id === Q);
        if (y(!1), ce && g.current(null), Se && f !== Se.id) {
          const O = Se.id;
          x(O), u && u({ value: O });
        }
      }
      !S.current && ce && D.current.focus();
    },
    [n, f, u]
  ), W = I(
    ({ id: Q }) => {
      M(Q, !0);
    },
    [M]
  ), H = I(
    (Q) => {
      Q && Q.stopPropagation(), x(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), T = I(
    (Q) => {
      if (!n.length) return;
      if (Q === "" && c) {
        H();
        return;
      }
      let ce = n.find((O) => O[s] === Q);
      ce || (ce = n.find(
        (O) => O[s].toLowerCase().includes(Q.toLowerCase())
      ));
      const Se = ce ? ce.id : f || n[0].id;
      M(Se, !1);
    },
    [n, s, c, f, M, H]
  ), V = I(() => {
    k(D.current.value), y(!0), E.length ? g.current(0) : g.current(null);
  }, [E.length, g]), oe = I(() => {
    S.current = !0;
  }, []), he = I(() => {
    S.current = !1, setTimeout(() => {
      S.current || T(C);
    }, 200);
  }, [T, C]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => g.current(z()),
      onKeyDown: (Q) => m.current(Q, z()),
      title: i,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: h,
            ref: D,
            value: C,
            disabled: a,
            placeholder: o,
            onFocus: oe,
            onBlur: he,
            onInput: V
          }
        ),
        c && !a && f ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !a && /* @__PURE__ */ p(En, { items: E, onReady: N, onSelect: W, children: ({ option: Q }) => /* @__PURE__ */ p(Ae, { children: d ? d({ option: Q }) : Q[s] }) })
      ]
    }
  );
}
function on({
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
  const f = Ft(e), [x, w] = We(t), y = F(null), b = $(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), k = $(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  K(() => {
    const z = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(z);
  }, [r, s]);
  const D = I(
    (z) => {
      const N = z.target.value;
      w(N), m && m({ value: N, input: !0 });
    },
    [m]
  ), S = I(
    (z) => m && m({ value: z.target.value }),
    [m]
  );
  function C(z) {
    z.stopPropagation(), w(""), m && m({ value: "" });
  }
  let E = o;
  return o !== "password" && o !== "number" && (E = "text"), K(() => {
    const z = S, N = y.current;
    return N.addEventListener("change", z), () => {
      N && N.removeEventListener("change", z);
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
            type: E,
            style: c,
            title: d,
            value: x,
            onInput: D
          }
        ),
        g && !a && x ? /* @__PURE__ */ Z(Ae, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: C }),
          k && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function $i({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = _e(rt).getRaw(), i = t.getFullYear(), a = $(() => {
    switch (e) {
      case "month":
        return lt(o.monthYearFormat, s)(t);
      case "year":
        return lt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Is(i), u = lt(o.yearFormat, s);
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
  const i = (_e(rt) || sn()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (k, D, S) => new Date(
    k.getFullYear(),
    k.getMonth() + (D || 0),
    k.getDate() + (S || 0)
  );
  let d = n !== "normal";
  function u(k) {
    const D = k.getDay();
    return D === 0 || D === 6;
  }
  function h() {
    const k = c(e, 0, 1 - e.getDate());
    return k.setDate(k.getDate() - (k.getDay() - (a - 7)) % 7), k;
  }
  function g() {
    const k = c(e, 1, -e.getDate());
    return k.setDate(k.getDate() + (6 - k.getDay() + a) % 7), k;
  }
  const m = F(0);
  function f(k, D) {
    D.timeStamp !== m.current && (m.current = D.timeStamp, D.stopPropagation(), o && o(new Date(new Date(k))), s && s());
  }
  const x = $(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), w = $(() => {
    const k = h(), D = g(), S = e.getMonth();
    let C = [];
    for (let E = k; E <= D; E.setDate(E.getDate() + 1)) {
      const z = {
        day: E.getDate(),
        in: E.getMonth() === S,
        date: E.valueOf()
      };
      let N = "";
      if (N += z.in ? "" : " wx-inactive", N += x.indexOf(z.date) > -1 ? " wx-selected" : "", d) {
        const M = z.date == x[0], W = z.date == x[1];
        M && !W ? N += " wx-left" : W && !M && (N += " wx-right"), z.date > x[0] && z.date < x[1] && (N += " wx-inrange");
      }
      if (N += u(E) ? " wx-weekend" : "", r) {
        const M = r(E);
        M && (N += " " + M);
      }
      C.push({ ...z, css: N });
    }
    return C;
  }, [e, x, d, r]), y = F(null);
  let b = F({});
  return b.current.click = f, K(() => {
    Ms(y.current, b.current);
  }, []), /* @__PURE__ */ Z("div", { children: [
    /* @__PURE__ */ p("div", { className: "wx-398RBS wx-weekdays", children: l.map((k) => /* @__PURE__ */ p("div", { className: "wx-398RBS wx-weekday", children: k }, k)) }),
    /* @__PURE__ */ p("div", { className: "wx-398RBS wx-days", ref: y, children: w.map((k) => /* @__PURE__ */ p(
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
  const [i, a] = We(t || /* @__PURE__ */ new Date()), [l, c] = We(e || /* @__PURE__ */ new Date()), d = _e(rt).getRaw().calendar, u = d.monthShort || [], h = $(() => l.getMonth(), [l]), g = I(
    (x, w) => {
      if (x != null) {
        w.stopPropagation();
        const y = new Date(l);
        y.setMonth(x), c(y), o && o({ current: y });
      }
      n === "normal" && a(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = I(() => {
    const x = new Date(Ls(i, n) || l);
    x.setMonth(l.getMonth()), x.setFullYear(l.getFullYear()), s && s(x);
  }, [i, l, n, s]), f = I(
    (x) => {
      const w = x.target.closest("[data-id]");
      if (w) {
        const y = parseInt(w.getAttribute("data-id"), 10);
        g(y, x);
      }
    },
    [g]
  );
  return /* @__PURE__ */ Z(Ae, { children: [
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-months", onClick: f, children: u.map((x, w) => /* @__PURE__ */ p(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === w ? " wx-current" : ""),
        "data-id": w,
        children: x
      },
      w
    )) }),
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ p(yr, { onClick: m, children: d.done }) })
  ] });
}
const Un = "wx-1XEF33", Ti = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = _e(rt).getRaw().calendar, [a, l] = We(e), [c, d] = We(t), u = $(() => a.getFullYear(), [a]), h = $(() => {
    const { start: w, end: y } = Is(u), b = [];
    for (let k = w; k <= y; ++k)
      b.push(k);
    return b;
  }, [u]), g = {
    click: m
  };
  function m(w, y) {
    if (w) {
      y.stopPropagation();
      const b = new Date(a);
      b.setFullYear(w), l(b), s && s({ current: b });
    }
    o === "normal" && d(new Date(a)), n && n();
  }
  function f() {
    const w = new Date(Ls(c, o) || a);
    w.setFullYear(a.getFullYear()), r && r(w);
  }
  const x = F(null);
  return K(() => {
    x.current && Ms(x.current, g);
  }, []), /* @__PURE__ */ Z(Ae, { children: [
    /* @__PURE__ */ p("div", { className: Un + " wx-years", ref: x, children: h.map((w, y) => /* @__PURE__ */ p(
      "div",
      {
        className: Un + ` wx-year ${u == w ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": w,
        children: w
      },
      y
    )) }),
    /* @__PURE__ */ p("div", { className: Un + " wx-buttons", children: /* @__PURE__ */ p(yr, { onClick: f, children: i.done }) })
  ] });
}, Vr = {
  month: {
    component: Ci,
    next: Ni,
    prev: Di
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
function Di(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Ni(t) {
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
  const l = _e(rt).getGroup("calendar"), [c, d] = G("month"), u = Array.isArray(o) ? o : o ? Ai : [], h = (w, y) => {
    w.preventDefault(), a && a({ value: y });
  }, g = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (w) => {
    const { diff: y, current: b } = w;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const k = Vr[c];
      n(y > 0 ? k.next(e) : k.prev(e));
    } else b && n(b);
    i && i();
  }, f = (w) => {
    d("month"), a && a({ select: !0, value: w });
  }, x = $(() => Vr[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ Z("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p($i, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ Z("div", { children: [
          /* @__PURE__ */ p(
            x,
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
          c === "month" && u.length > 0 && /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((w) => /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ p(
            yr,
            {
              onClick: (y) => h(y, Hi(w)),
              children: l(w)
            }
          ) }, w)) })
        ] })
      ] })
    }
  );
}
function In(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = _e(rt);
  const o = $(() => {
    let i = s;
    return (!i || !i.extend) && (i = Dt(Hs)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ p(rt.Provider, { value: o, children: r });
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
  const [o, i] = We(t), [a, l] = We(e);
  K(() => {
    Gr(a, o, l, !1);
  }, [o, a]);
  const c = I(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), Gr(a, new Date(h), l, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, a]
  ), d = I(
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
  const { calendar: m, formats: f } = (_e(rt) || sn()).getRaw(), x = a || f?.dateFormat;
  let w = typeof x == "function" ? x : lt(x, m);
  const [y, b] = G(t), [k, D] = G(!1);
  K(() => {
    b(t);
  }, [t]);
  function S() {
    D(!1);
  }
  function C(N) {
    const M = N === y || N && y && N.valueOf() === y.valueOf() || !N && !y;
    b(N), M || g && g({ value: N }), setTimeout(S, 1);
  }
  const E = $(
    () => y ? w(y) : "",
    [y, w]
  );
  function z({ value: N, input: M }) {
    if (!u && !h || M) return;
    let W = typeof u == "function" ? u(N) : N ? new Date(N) : null;
    W = isNaN(W) ? y || null : W || null, C(W);
  }
  return K(() => {
    const N = S;
    return window.addEventListener("scroll", N), () => window.removeEventListener("scroll", N);
  }, []), /* @__PURE__ */ Z("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => D(!0), children: [
    /* @__PURE__ */ p(
      on,
      {
        css: c,
        title: d,
        value: E,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: S,
        onChange: z,
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
            onChange: (N) => C(N.value)
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
  const u = F(null), h = F(null);
  let [g, m] = We(t);
  function f(k) {
    u.current = k.navigate, h.current = k.keydown;
  }
  const x = $(() => g || g === 0 ? (n || e).find((k) => k.id === g) : null, [g, n, e]), w = I(
    ({ id: k }) => {
      (k || k === 0) && (m(k), u.current(null), d && d({ value: k }));
    },
    [m, d]
  ), y = I(
    (k) => {
      k.stopPropagation(), m(""), d && d({ value: "" });
    },
    [m, d]
  ), b = I(() => e.findIndex((k) => k.id === g), [e, g]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => u.current(b()),
      onKeyDown: (k) => h.current(k, b()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ p("div", { className: "wx-2YgblL wx-label", children: x ? c ? c(x) : x[a] : r ? /* @__PURE__ */ p("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        l && !s && g ? /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ p(En, { items: e, onReady: f, onSelect: w, children: ({ option: k }) => c ? c(k) : k[a] })
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
  const d = Ft(t), [u, h] = We(o), g = F({ value: u, input: u }), m = $(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), f = $(() => l ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [l, m]);
  function x({ target: b }) {
    const k = b.value * 1;
    h(k), c && c({
      value: k,
      previous: g.current.input,
      input: !0
    }), g.current.input = k;
  }
  function w({ target: b }) {
    const k = b.value * 1;
    h(k), c && c({ value: k, previous: g.current.value }), g.current.value = k;
  }
  K(() => {
    h(o);
  }, [o]);
  const y = F(null);
  return K(() => {
    if (y.current)
      return y.current.addEventListener("change", w), () => {
        y.current && y.current.removeEventListener("change", w);
      };
  }, [y, w]), /* @__PURE__ */ Z("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
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
        onInput: x,
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
  const c = Ft(t), [d, u] = We(e), h = I(() => {
    if (a || d <= r) return;
    const x = d - n;
    u(x), l && l({ value: x });
  }, [d, a, r, n, l]), g = I(() => {
    if (a || d >= s) return;
    const x = d + n;
    u(x), l && l({ value: x });
  }, [d, a, s, n, l]), m = I(() => {
    if (!a) {
      const x = Math.round(Math.min(s, Math.max(d, r)) / n) * n, w = isNaN(x) ? Math.max(r, 0) : x;
      u(w), l && l({ value: w });
    }
  }, [a, d, s, r, n, l]), f = I(
    (x) => {
      const w = x.target.value * 1;
      u(w), l && l({ value: w, input: !0 });
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
  const a = (_e(rt) || sn()).getGroup("core"), l = F(null);
  K(() => {
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
          ct,
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
function Ki({ children: t }, e) {
  const [n, r] = G(null), [s, o] = G([]);
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
  ), /* @__PURE__ */ Z(Ae, { children: [
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
_t(Ki);
function Zt({
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
  const [g, m] = We(t), f = $(() => (g ? "pressed" : "") + (e ? " " + e : ""), [g, e]), x = I(
    (w) => {
      let y = !g;
      o && o(w), w.defaultPrevented || (m(y), h && h({ value: y }));
    },
    [g, o, h]
  );
  return g && u ? /* @__PURE__ */ p(
    ct,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: x,
      disabled: r,
      children: wr(u, { value: g })
    }
  ) : d ? /* @__PURE__ */ p(
    ct,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: x,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ p(
    ct,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: x,
      disabled: r
    }
  );
}, Br = new Date(0, 0, 0, 0, 0);
function Vi({
  value: t = Br,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = We(t);
  const { calendar: d, formats: u } = (_e(rt) || sn()).getRaw(), h = d.clockFormat == 12, g = 23, m = 59, f = $(() => {
    const O = i || u?.timeFormat;
    return typeof O == "function" ? O : lt(O, d);
  }, [i, u, d]), x = $(() => f(new Date(0, 0, 0, 1)).indexOf("01") != -1, [f]), w = (O, ae) => (O < 10 && ae ? `0${O}` : `${O}`).slice(-2), y = (O) => w(O, !0), b = (O) => `${O}`.replace(/[^\d]/g, "") || 0, k = (O) => h && (O = O % 12, O === 0) ? "12" : w(O, x), D = I((O, ae) => (O = b(O), Math.min(O, ae)), []), [S, C] = G(null), E = l || Br, z = D(E.getHours(), g), N = D(E.getMinutes(), m), M = z > 12, W = k(z), H = y(N), T = $(
    () => f(new Date(0, 0, 0, z, N)),
    [z, N, f]
  ), V = I(() => {
    C(!0);
  }, []), oe = I(() => {
    const O = new Date(E);
    O.setHours(O.getHours() + (M ? -12 : 12)), c(O), a && a({ value: O });
  }, [E, M, a]), he = I(
    ({ value: O }) => {
      if (E.getHours() === O) return;
      const ae = new Date(E);
      ae.setHours(O), c(ae), a && a({ value: ae });
    },
    [E, a]
  ), Q = I(
    ({ value: O }) => {
      if (E.getMinutes() === O) return;
      const ae = new Date(E);
      ae.setMinutes(O), c(ae), a && a({ value: ae });
    },
    [E, a]
  ), ce = I(
    (O) => (O = D(O, g), h && (O = O * 1, O === 12 && (O = 0), M && (O += 12)), O),
    [D, h, M]
  ), Se = I(() => {
    C(null);
  }, []);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : V,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ p(
          on,
          {
            id: e,
            css: r,
            title: n,
            value: T,
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
        S && !s && /* @__PURE__ */ p(Ut, { onCancel: Se, width: "unset", children: /* @__PURE__ */ Z("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ Z("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: W,
                onChange: (O) => {
                  const ae = ce(O.target.value);
                  he({ value: ae });
                }
              }
            ),
            /* @__PURE__ */ p("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: H,
                onChange: (O) => {
                  const ae = D(O.target.value, m);
                  Q({ value: ae });
                }
              }
            ),
            h && /* @__PURE__ */ p(
              Ws,
              {
                value: M,
                onClick: oe,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(Zt, { width: "unset", children: /* @__PURE__ */ p(
            nr,
            {
              label: d.hours,
              value: z,
              onChange: he,
              max: g
            }
          ) }),
          /* @__PURE__ */ p(Zt, { width: "unset", children: /* @__PURE__ */ p(
            nr,
            {
              label: d.minutes,
              value: N,
              onChange: Q,
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
  const r = F(null);
  return K(() => nn(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function zs({ theme: t = "", target: e, children: n }) {
  const r = F(null), s = F(null), [o, i] = G(null);
  r.current || (r.current = document.createElement("div"));
  const a = _e(rn);
  return K(() => {
    i(
      e || ji(s.current) || Je.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ Z(Ae, { children: [
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
  const e = Je.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function qi() {
  return /* @__PURE__ */ p(Ae, {});
}
function jr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(rn.Provider, { value: "material", children: /* @__PURE__ */ Z(Ae, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ Z(Ae, { children: [
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
  return /* @__PURE__ */ p(Ae, {});
}
function qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(rn.Provider, { value: "willow", children: /* @__PURE__ */ Z(Ae, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ Z(Ae, { children: [
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
  return /* @__PURE__ */ p(rn.Provider, { value: "willow-dark", children: /* @__PURE__ */ Z(Ae, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ Z(Ae, { children: [
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
pr(Je);
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
    return e && Ks(e, t), t;
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
function Ks(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Ks(n.data, e);
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
var Vs = 2, ia = class {
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
      a ? (a.__parse(c, d, s, o) && (n[i] = c), o & Vs ? s[d] = a.__trigger : a.__trigger()) : (c && c.__reactive ? e[i] = this._wrapNested(c, c, d, s) : e[i] = this._wrapWritable(c), n[i] = c), s[d] = s[d] || null;
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
    const e = this._setter(t, Vs);
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
function De(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ut(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Hn(t, e) {
  const n = De(t);
  return isNaN(e) ? ut(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function br(t, e) {
  const n = De(t);
  if (isNaN(e)) return ut(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ut(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function js(t, e) {
  const n = +De(t);
  return ut(t, n + e);
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
  const n = Js(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = De(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function en(t) {
  return Cn(t, { weekStartsOn: 1 });
}
function xa(t) {
  const e = De(t), n = e.getFullYear(), r = ut(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = en(r), o = ut(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = en(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function $t(t) {
  const e = De(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = De(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Zs(t, e) {
  const n = $t(t), r = $t(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / pa);
}
function Zr(t) {
  const e = xa(t), n = ut(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), en(n);
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
function Jt(t, e) {
  const n = De(t), r = De(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ba(t, e) {
  const n = $t(t), r = $t(e);
  return +n == +r;
}
function Sr(t, e) {
  const n = en(t), r = en(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / qs);
}
function Sa(t, e) {
  const n = De(t), r = De(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function $a(t, e) {
  const n = De(t), r = De(e);
  return n.getFullYear() - r.getFullYear();
}
function $r(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function to(t, e) {
  return +De(t) - +De(e);
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
  const e = De(t);
  return e.setHours(23, 59, 59, 999), e;
}
function Cr(t) {
  const e = De(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function Ta(t) {
  const e = De(t);
  return +no(e) == +Cr(e);
}
function ro(t, e) {
  const n = De(t), r = De(e), s = Jt(n, r), o = Math.abs(Sa(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Jt(n, r) === -s;
    Ta(De(t)) && o === 1 && Jt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function Da(t, e, n) {
  const r = ro(t, e) / 3;
  return $r(n?.roundingMethod)(r);
}
function Na(t, e) {
  const n = De(t), r = De(e), s = Jt(n, r), o = Math.abs($a(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Jt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function tn(t) {
  const e = De(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function so(t) {
  const e = De(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Ma(t) {
  const e = De(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function Ea(t) {
  const e = De(t), n = ut(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Ia(t) {
  const e = De(t);
  return e.setMinutes(59, 59, 999), e;
}
function Ra(t, e) {
  const n = Js(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = De(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function _r(t) {
  const e = De(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function oo(t) {
  const e = De(t), n = e.getFullYear(), r = e.getMonth(), s = ut(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Aa(t) {
  const e = De(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function io(t) {
  const e = De(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : Aa(e) ? 366 : 365;
}
function Ha(t) {
  const e = Zr(t), n = +Zr(eo(e, 60)) - +e;
  return Math.round(n / qs);
}
function Rt(t, e) {
  const n = De(t), r = De(e);
  return +n == +r;
}
function La(t) {
  const e = De(t);
  return e.setMinutes(0, 0, 0), e;
}
function Oa(t, e, n) {
  const r = Cn(t, n), s = Cn(e, n);
  return +r == +s;
}
function Pa(t, e) {
  const n = De(t), r = De(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Wa(t, e) {
  const n = tn(t), r = tn(e);
  return +n == +r;
}
function za(t, e) {
  const n = De(t), r = De(e);
  return n.getFullYear() === r.getFullYear();
}
const rr = { year: Na, quarter: Da, month: ro, week: Sr, day: Zs, hour: Ca, minute: _a }, pt = { year: { quarter: 4, month: 12, week: Ha, day: Fa, hour: Ua }, quarter: { month: 3, week: Ya, day: ao, hour: Ka }, month: { week: Va, day: Ga, hour: Ba }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Fa(t) {
  return t ? io(t) : 365;
}
function Ua(t) {
  return io(t) * 24;
}
function Ya(t) {
  const e = tn(t), n = Hn($t(_r(t)), 1);
  return Sr(n, e);
}
function ao(t) {
  if (t) {
    const e = tn(t), n = _r(t);
    return Zs(n, e) + 1;
  }
  return 91;
}
function Ka(t) {
  return ao(t) * 24;
}
function Va(t) {
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
const Dn = { year: ka, quarter: va, month: br, week: eo, day: Hn, hour: ma, minute: ya };
function Tr(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !pt[t][o] || typeof pt[t][o] == "number" || uo(t, r, s, n) ? Xt(t, r, s, o, i, n) : qa(r, s, t, o, i, n);
}
function Xt(t, e, n, r, s, o) {
  const i = r || t;
  let a = n, l = e;
  if (s && (a = dt(i, n, o), l = dt(i, e, o), l < e && (l = it(i)(l, 1))), t !== i) {
    const c = rr[i](l, a), d = Tn(t, i, n);
    return c / d;
  } else return rr[i](l, a);
}
function qa(t, e, n, r, s, o) {
  let i = 0;
  const a = dt(n, e, o);
  if (e > a) {
    const c = Dn[n](a, 1);
    i = Xt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return uo(n, e, t, o) || (l = Xt(n, dt(n, t, o), e, void 0, void 0, o), e = Dn[n](e, l)), l += i + Xt(n, t, e, r, void 0, o), !l && s && (l = Xt(n, t, e, r, s, o)), l;
}
function it(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Dn[t];
}
const lo = { year: Ea, quarter: tn, month: so, week: (t, e) => Cn(t, { weekStartsOn: e }), day: $t, hour: La };
function dt(t, e, n) {
  const r = lo[t];
  return r ? r(e, n) : new Date(e);
}
const Xa = { year: Ma, quarter: _r, month: Cr, week: (t, e) => Ra(t, { weekStartsOn: e }), day: no, hour: Ia }, co = { year: za, quarter: Wa, month: Pa, week: (t, e, n) => Oa(t, e, { weekStartsOn: n }), day: ba };
function uo(t, e, n, r) {
  const s = co[t];
  return s ? s(e, n, r) : !1;
}
const Qa = { start: lo, end: Xa, add: Dn, isSame: co, diff: rr, smallerCount: pt }, es = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ja(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((a, l) => ot.indexOf(a) - ot.indexOf(l)).shift();
      let s = ot.indexOf(r);
      const o = e[n][r], i = es(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = ot[a], c = es(pt[l][r]);
        if (i <= c) break;
        s = a;
      }
      ot.splice(s, 0, t);
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
  return t.map((n) => ({ item: n, len: it(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const ot = ["year", "quarter", "month", "week", "day", "hour"], sr = 50, or = 300;
function el(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, a = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, l = !0);
  });
  const c = it(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function tl(t, e, n, r, s, o, i) {
  const a = Pt(i).unit, l = Tr(a, void 0, o), c = l(e, t, "", !0), d = dt(a, e, o);
  t = dt(a, t, o), e = d < e ? it(a)(d, 1) : d;
  const u = c * r, h = s * i.length, g = i.map((f) => {
    const x = [], w = it(f.unit);
    let y = dt(f.unit, t, o);
    for (; y < e; ) {
      const b = w(y, f.step), k = y < t ? t : y, D = b > e ? e : b, S = l(D, k, "", !0) * r, C = typeof f.format == "function" ? f.format(y, b) : f.format;
      let E = "";
      f.css && (E += typeof f.css == "function" ? f.css(y) : f.css), x.push({ width: S, value: C, date: k, css: E, unit: f.unit }), y = b;
    }
    return { cells: x, add: w, height: s };
  });
  let m = r;
  return a !== n && (m = Math.round(m / Tn(a, n)) || 1), { rows: g, width: u, height: h, diff: l, start: t, end: e, lengthUnit: n, minUnit: a, lengthUnitWidth: m };
}
function nl(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = ot.indexOf(Pt(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = yn(s.minCellWidth, sr)), l.maxCellWidth || (l.maxCellWidth = yn(s.maxCellWidth, or));
  });
  else {
    const l = [], c = n.length || 1, d = yn(s.minCellWidth, sr), u = yn(s.maxCellWidth, or);
    n.forEach((h) => {
      h.format && !e[h.unit] && (e[h.unit] = h.format);
    }), ot.forEach((h, g) => {
      if (g === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (g) for (let f = c - 1; f > 0; f--) {
          const x = ot[g - f];
          x && m.push({ unit: x, step: 1, format: e[x] });
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
  const n = ot.indexOf(t), r = ot.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : ot[r];
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
function Dr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = Dr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
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
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = n, { start: l, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", g = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), f = "$y" + (r ? "_base" : ""), x = "$w" + (r ? "_base" : ""), w = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let b = t[h], k = t[g];
  if (r && !b) {
    t[y] = !0;
    return;
  }
  t[h] < l && (t[g] < l || Rt(t[g], l)) ? b = k = l : t[h] > c && (b = k = c), t[m] = Math.round(u(b, l, d) * s), t[f] = r ? t.$y + t.$h + fo : o * e + ol, t[x] = Math.round(u(k, b, d, !0) * s), t[w] = r ? ir : a ? o - ts - il : o - ts, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[x] = t.$h, r && (t[f] = t.$y + ir, t[x] = t[w] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Rt(b, k);
}
const Kn = 20, al = function(t, e, n, r, s) {
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
  const l = Kn * (s ? -1 : 1), c = Kn * (o ? -1 : 1), d = t + l, u = n + c, h = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], g = u - d;
  let m = r - e;
  const f = o === s;
  return f || (u <= t + Kn - 2 && o || u > t && !o) && (m = a ? m - i + 6 : m - i), f && o && d > u || f && !o && d < u ? (h[4] = h[2] + g, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + g, h[7] = h[5]), h.join(",");
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
      const x = t.getHistory();
      x && x.startBatch(), f.forEach((w, y) => rs(t, e, w, r, y)), x && x.endBatch();
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
        const { links: m } = t.getState(), f = t._temp.map((w) => w.id), x = [];
        m.forEach((w) => {
          f.includes(w.source) && f.includes(w.target) && x.push(w);
        }), x.forEach((w) => {
          o("add-link", { link: { source: g.get(w.source), target: g.get(w.target), type: w.type } });
        }), t._temp.forEach((w, y) => {
          o("select-task", { id: g.get(w.id), toggle: !!y });
        });
      }
      h && h.endBatch(), t._temp = null;
    }
    return;
  } else i === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: l, show: !0, select: !1 }, c = {}, u = !0) : i === "edit-task" ? (i = "show-editor", a === "segment" && typeof n == "object" && (d = n)) : i === "convert-task" ? (i = "update-task", d = { task: { type: a } }, a = void 0) : i === "indent-task" && (a = a === "add");
  if (i === "split-task" && typeof n == "object") d = n;
  else if (i === "delete-task" && a === "segment" && typeof n == "object") {
    const h = t.getTask(l), { segmentIndex: g } = n, m = h.segments.filter((f, x) => x !== g);
    o("update-task", { id: l, task: { segments: m } });
    return;
  }
  typeof a < "u" && (d = { mode: a, ...d }), c = { ...c, ...d }, o(i, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function Nr(t, e) {
  return t.some((n) => n.data ? Nr(n.data, e) : n.id === e);
}
const ss = (t, e) => it(t, e), pl = (t, e) => Tr(t, e);
function lr(t, e) {
  Array.isArray(t) && (t.forEach((n) => vt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Dr(n, t);
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
        const x = [...c];
        if (i) {
          const w = x[x.length - 1], y = d.findIndex((C) => C.id == w), b = d.findIndex((C) => C.id == s), k = Math.min(y, b), D = Math.max(y, b) + 1, S = d.slice(k, D).map((C) => C.id);
          y > b && S.reverse(), S.forEach((C) => {
            x.includes(C) || x.push(C);
          });
        } else if (o) {
          const w = x.findIndex((y) => y == s);
          w === -1 ? x.push(s) : (g = !0, x.splice(w, 1));
        }
        m = x;
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
          const x = o.getSummaryId(d.id);
          o.move(l, i, a);
          const w = o.getSummaryId(l);
          x != w && (x && this.resetSummaryDates(x, "move-task"), w && this.resetSummaryDates(w, "move-task"));
        }
      } else {
        const u = o.byId(a);
        let h = u, g = !1;
        for (; h.$level > d.$level; ) h = o.byId(h.parent), h.id === l && (g = !0);
        if (g) return;
        const m = o.getSummaryId(d.id);
        if (o.move(l, i, a), i == "child") {
          let x = u;
          for (; x.id !== 0 && !x.open; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        }
        const f = o.getSummaryId(l);
        m != f && (m && this.resetSummaryDates(m, "move-task"), f && this.resetSummaryDates(f, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = a, s.mode = i;
    }), n.on("drag-task", (s) => {
      const o = this.getState(), { tasks: i, _tasks: a, _selected: l, _scales: c, cellWidth: d } = o, u = i.byId(s.id), { left: h, top: g, width: m, inProgress: f } = s, x = { _tasks: a, _selected: l };
      if (typeof m < "u" && (u.$w = m, ar(i, u, c, d)), typeof h < "u") {
        if (u.type === "summary") {
          const w = h - u.$x;
          ho(u, w, c, d);
        }
        u.$x = h, ar(i, u, c, d);
      }
      typeof g < "u" && (u.$y = g + 4, u.$reorder = f), typeof m < "u" && (u.$w = m), typeof h < "u" && (u.$x = h), typeof g < "u" && (u.$y = g + 4, u.$reorder = f), this.setState(x);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: a, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: h, splitTasks: g, calendar: m } = this.getState(), f = d.byId(o), x = { durationUnit: h, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        vt(c, x), d.update(o, c);
        return;
      }
      const w = u.lengthUnit;
      let y = it(w);
      const b = Tr(w, m);
      if (a && (c.start && (c.start = y(c.start, a)), !i && i !== 0 && (c.start && c.end ? c.duration = f.duration : (c.start ? c.end = f.end : (c.end = y(c.end, a), c.start = f.start, c.duration = b(c.end, c.start)), b(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? f.type, m && c.start && (c.start = Yn(c.start, a, m)), c.start && c.end && (!Rt(c.start, f.start) || !Rt(c.end, f.end)) && c.type === "summary" && f.data?.length) {
        let D = a || b(c.start, f.start);
        m && (D = c.start > f.start ? b(c.start, f.start) : -b(f.start, c.start), y = Za(m)), this.moveSummaryKids(f, (S) => (S = y(S, D), m ? Yn(S, a, m) : S), "update-task");
      }
      c.start || (c.start = f.start), !c.end && !c.duration && (c.duration = f.duration), vt(c, x), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && f.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const k = d.getSummaryId(o);
      k && this.resetSummaryDates(k, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: i, unscheduledTasks: a, durationUnit: l, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: h, task: g, show: m, select: f = !0 } = s;
      !s.eventSource && a && (g.unscheduled = !0);
      let x = -1, w, y;
      if (u ? (y = o.byId(u), h == "child" ? (w = y, g.parent = w.id) : (y.parent !== null && (w = o.byId(y.parent), g.parent = w.id), x = o.getIndexById(u), h == "after" && (x += 1))) : g.parent && (w = o.byId(g.parent)), !g.start) {
        if (w?.start) g.start = new Date(w.start.valueOf());
        else if (y) g.start = new Date(y.start.valueOf());
        else {
          const S = o.getBranch(0);
          let C;
          if (S?.length) {
            const E = S[S.length - 1];
            if (!E.$skip) {
              const z = new Date(E.start.valueOf());
              i.start <= z && (C = z);
            }
          }
          g.start = C || it(l, d)(i.start, 1);
        }
        g.duration = 1;
      }
      d && (g.start = Yn(g.start, 1, d)), this.getState().baselines && (g.base_start = g.start, g.base_duration = g.duration), vt(g, { durationUnit: l, calendar: d });
      const b = o.add(g, x), k = { tasks: o };
      if (w && m) {
        for (; w && w.id; ) n.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        k._scrollTask = { id: b.id, mode: m };
      }
      s.id = b.id;
      const D = o.getSummaryId(b.id);
      D && this.resetSummaryDates(D, "add-task"), this.setStateAsync(k), s.id = b.id, s.task = b, f && n.exec("select-task", { id: b.id });
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
      let x = [];
      for (let w = 1; w < f.length; w++) {
        const [y, b] = f[w];
        d.forEach((k) => {
          if (k.source === y) {
            const D = { ...k };
            delete D.target, x.push({ ...D, source: b });
          } else if (k.target === y) {
            const D = { ...k };
            delete D.source, x.push({ ...D, target: b });
          }
        });
      }
      x = x.reduce((w, y) => {
        const b = w.findIndex((k) => k.id === y.id);
        return b > -1 ? w[b] = { ...w[b], ...y } : w.push(y), w;
      }, []);
      for (let w = 1; w < f.length; w++) {
        const [y, b] = f[w], k = c.byId(b);
        n.exec("copy-task", { source: y, id: b, lazy: !!k.lazy, eventSource: "copy-task", target: k.parent, mode: "child", skipUndo: !0 });
      }
      x.forEach((w) => {
        n.exec("add-link", { link: { source: w.source, target: w.target, type: w.type }, eventSource: "copy-task", skipUndo: !0 });
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
      const { _scales: x, _start: w, cellWidth: y, _weekStart: b } = this.getState(), k = dt(x.minUnit, w, b), D = x.diff(u, k, "hour");
      typeof o > "u" && (o = y);
      let S = Math.round(D * y) - o;
      S < 0 && (S = 0), this.setState({ scrollLeft: S, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: a, end: l, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: h } = this.getState(), g = it(i.minUnit);
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
      const x = f ? l ? -f : -1 : 0, w = a || g(o, x);
      let y = 0;
      if (u) {
        const b = i.diff(u, w, "hour");
        y = Math.max(0, Math.round(b * d) - (h || 0));
      }
      this.setState({ _start: w, _end: l || g(c, f), scrollLeft: y });
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
      const d = Dr({ ...l, start: void 0, end: void 0, duration: void 0 });
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
    return it("hour")(dt(n.minUnit, r, s), Math.floor(e / o));
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
function Vn(t) {
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
const Co = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Bn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Vn(t), isDisabled: jn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Vn(t) || Gn(t), isDisabled: jn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Vn(t) || Gn(t), isDisabled: jn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Gn(t) || Bn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Bn(t) }], _o = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], wt = Wt(null);
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
}, Lt = [], Dl = { subscribe: (t) => {
  Nl();
  const e = new Tl();
  return Lt.push(e), t(e), () => {
    const n = Lt.findIndex((r) => r === e);
    n >= 0 && Lt.splice(n, 1);
  };
} }, ls = !1;
function Nl() {
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
  const o = Dl.subscribe((i) => {
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
    n = Ge(S), cs(n) && (s = kt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", g), window.addEventListener("touchend", b));
  }
  function g(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = Ge(S), cs(n) && (s = kt(n), t.addEventListener("mousemove", w), window.addEventListener("mouseup", k), u(S)));
  }
  function f(S) {
    t.removeEventListener("mousemove", w), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", b), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", h));
  }
  function x(S) {
    const C = S.clientX - o, E = S.clientY - i;
    if (!r) {
      if (Math.abs(C) < ds && Math.abs(E) < ds || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const z = Math.round(Math.max(0, a.top + E));
      if (e && e.move && e.move({ id: s, top: z, detail: l }) === !1)
        return;
      const N = e.getTask(s), M = N.$y;
      if (!a.start && a.y == M) return D();
      a.start = !0, a.y = N.$y - 4, r.style.top = z + "px";
      const W = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), H = Ge(W);
      if (H && H !== n) {
        const T = kt(H), V = H.getBoundingClientRect(), oe = V.top + V.height / 2, he = S.clientY + a.db > oe && H.nextElementSibling !== n, Q = S.clientY - a.dt < oe && H.previousElementSibling !== n;
        l?.after == T || l?.before == T ? l = null : he ? l = { id: s, after: T } : Q && (l = { id: s, before: T });
      }
    }
  }
  function w(S) {
    x(S);
  }
  function y(S) {
    c ? (S.preventDefault(), x(S.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function b() {
    c = null, d && (clearTimeout(d), d = null), D();
  }
  function k() {
    D();
  }
  function D() {
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
    if (!an(r, s)) return !1;
  }
  return !0;
}
function an(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime()) return !1;
  if (typeof t == "object") if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    for (let n = t.length - 1; n >= 0; n--) if (!an(t[n], e[n])) return !1;
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
var Do = 2, Al = class {
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
      l ? (l.__parse(d, u, o, i) && (r[a] = d), i & Do ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[a] = this._wrapNested(d, d, u, o) : n[a] = this._wrapWritable(d), r[a] = d), o[u] = o[u] || null;
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
      o.length = Math.max(...o.in.map((i) => No(i, this._sources, 1)));
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
    const n = this._setter(e, Do);
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
function No(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => No(o, e, n + 1));
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
      const m = l[u], f = a[g], x = Ct(m, f) ?? "";
      let w = mt(m, f), y;
      e.cellStyle && (y = e.cellStyle(x, m, f)), e.cellTemplate && (w = e.cellTemplate(x, m, f) ?? w);
      const b = Mo(w, 2, y, n);
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
      const x = Mo(g, f, m, i);
      l.push(x);
    }
    n.push(l);
  }
}
function Mo(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Ul(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => an(i, n));
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
const Yl = "portrait", Kl = 100, Vl = "a4", Gl = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
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
  return { mode: e || Yl, ppi: n || Kl, paper: r || Vl };
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
      return an(i, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: i }, source: { action: "update-cell", data: e } };
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
function Nn(t, e, n, r, s) {
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
        let x = `wx-measure-cell-${e}`;
        if (x += m ? ` ${m}` : "", f = Nn(d, x, s).width, (g > 1 || !a[c + 1]) && n > c + 1) {
          const w = g || n - c, y = o.slice(c, c + w).reduce((b, k) => b + k, 0);
          if (y < f) {
            const b = Math.ceil((f - y) / w);
            for (let k = c; k < c + w; k++) o[k] = (o[k] || r) + b;
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
  return Nn(r, o, n, s).width;
}
function lc(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? oc : 0;
  let s = t.header;
  if (typeof s == "string") return Nn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i], l = typeof a == "string" ? a : a.text, c = n + (typeof a == "string" ? "" : ` ${a.css}`);
    let d = Nn(l, c, e).width;
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
        const m = d || u, f = i.findIndex((x) => x.id === m);
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
        let m = g.findIndex((x) => x.id == h[h.length - 1]), f = g.findIndex((x) => x.id == s);
        m > f && ([m, f] = [f, m]), g.slice(m, f + 1).forEach((x) => {
          h.indexOf(x.id) === -1 && h.push(x.id);
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
      const x = Object.keys(g).sort((y, b) => g[y].index - g[b].index).map((y) => ({ key: y, order: g[y].order }));
      this.setState({ sortMarks: g });
      const w = sc(x, c);
      if (w) {
        const y = [...d];
        u ? this.sortTree(y, w) : y.sort(w), this.setState({ data: y });
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
      const m = c.findIndex((x) => x.id == i);
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
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: g, rowSizes: m, colSizes: f, styles: x } = zl(this.getState(), a, u), w = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(w).then((y) => {
          y.onmessage = (b) => {
            if (b.data.type == "ready") {
              const k = b.data.blob;
              a.download !== !1 ? fs(k, l) : s.result = k, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: a.sheetName || "data", cells: h, cols: f, rows: m, merged: g }], styles: x } });
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
        const f = o.findIndex((x) => x.id == s.column);
        g = o[f].width;
        for (let x = i.left ?? 0; x < f; x++) {
          const w = o[x];
          w.hidden || (u += w.width);
        }
      }
      if (s.row && !c) {
        const f = l.findIndex((x) => x.id == s.row);
        f >= 0 && (d ? (h = l.slice(0, f).reduce((x, w) => x + (w.rowHeight || a.rowHeight), 0), m = l[f].rowHeight) : h = a.rowHeight * f);
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
    }), an(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), Io() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new tc(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
  const r = F(null), s = I(() => {
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
  const [c, d] = G(-1e4), [u, h] = G(-1e4), [g, m] = G(20), [f, x] = G(), w = F(null), [y, b] = G(!1), [k, D] = G(null), S = I(() => {
    const M = si(w.current, s, r, e, n);
    M && (d(M.x), h(M.y), m(M.z), x(M.width));
  }, [s, r, e, n]);
  K(() => {
    o && o(S);
  }, []);
  const C = I(() => {
    b(!1);
  }, []), E = I(() => {
    l && l({ action: null, option: null });
  }, [l]), z = I((M, W) => {
    b(M), D(W);
  }, []), N = $(() => kc(t), [t]);
  return K(() => {
    S();
  }, [s, S]), K(() => {
    if (w.current)
      return nn(w.current, { callback: E, modal: !0 }).destroy;
  }, [E]), /* @__PURE__ */ p(
    "div",
    {
      ref: w,
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
      children: N.map((M) => /* @__PURE__ */ Z(Ns, { children: [
        M.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          $c,
          {
            option: M,
            onShow: z,
            onClick: (W) => {
              if (!M.data && !W.defaultPrevented) {
                const H = { context: i, action: M, option: M, event: W };
                M.handler && M.handler(H), l && l(H), W.stopPropagation();
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
  } = t, [d, u] = G(null), [h, g] = G(null), [m, f] = G(0), [x, w] = G(0), y = $(() => d !== null && i ? Ho(n, (S) => i(S, d)) : n, [d, i, n]), b = I(
    (S) => {
      g(null), c && c(S);
    },
    [c]
  ), k = I((S, C) => {
    let E = null;
    for (; S && S.dataset && !E; )
      E = S.dataset[C], S = S.parentNode;
    return E ? zt(E) : null;
  }, []), D = I(
    (S, C) => {
      if (!S) {
        g(null);
        return;
      }
      if (S.defaultPrevented) return;
      const E = S.target;
      if (E && E.dataset && E.dataset.menuIgnore) return;
      f(S.clientX + 1), w(S.clientY + 1);
      let z = typeof C < "u" ? C : k(E, o);
      s && (z = s(z, S), !z) || (u(z), g(E), S.preventDefault());
    },
    [o, k, s]
  );
  return Tt(e, () => ({ show: D }), [D]), /* @__PURE__ */ Z(Ae, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: D, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    h ? /* @__PURE__ */ p(zs, { children: /* @__PURE__ */ p(
      Er,
      {
        css: a,
        at: r,
        top: x,
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
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = G(null);
  function c(m) {
    l(null), i && i(m);
  }
  const d = I((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Tt(e, () => ({ show: d }), [d]);
  function u(m) {
    let f = m.target;
    for (; !f.dataset.menuIgnore; )
      l(f), f = f.parentNode;
  }
  const h = F(0), g = F(a);
  return K(() => {
    g.current !== a && (h.current += 1, g.current = a);
  }, [a]), /* @__PURE__ */ Z(Ae, { children: [
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
  } = t, d = F(null), u = I((h, g) => {
    d.current.show(h, g);
  }, []);
  return Tt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ Z(Ae, { children: [
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
  ), a = I(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = $(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = I(
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
  const [o, i] = G(!0), a = () => i(!0), l = () => i(!1), c = (u) => {
    a(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ Z(Ae, { children: [
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
  ] }) : /* @__PURE__ */ Z(Ae, { children: [
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
function Dc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = G(void 0), l = F(null);
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
        /* @__PURE__ */ p(ct, { icon: "wxi-dots-h", onClick: d }),
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
function Nc(t) {
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
  } = t, [l, c] = We(e || []), [d, u] = We(s || null), h = $(() => Nc(l), [l]), g = F(null), m = F(-1), [f, x] = G([]), w = F(h);
  K(() => {
    w.current = h;
  }, [l]);
  const y = F(o);
  K(() => {
    y.current = o;
  }, [o]);
  const b = F(f);
  K(() => {
    b.current = f;
  }, [f]);
  const k = F(!1);
  function D(N) {
    d && (d[N.item.key] = N.value, u({ ...d })), a && a(N);
  }
  function S() {
    const N = g.current;
    if (!N) return 0;
    const M = N.children, W = w.current || [];
    let H = 0;
    for (let T = 0; T < W.length; T++)
      W[T].comp !== "spacer" && (H += M[T].clientWidth, W[T].comp === "separator" && (H += 8));
    return H;
  }
  function C() {
    const N = g.current, M = w.current || [];
    if (N) {
      for (let W = M.length - 1; W >= 0; W--)
        if (M[W].items && !M[W].collapsed) {
          M[W].collapsed = !0, M[W].$width = N.children[W].offsetWidth, k.current = !0, c([...M]);
          return;
        }
    }
  }
  function E(N) {
    const M = g.current, W = w.current || [];
    if (M) {
      for (let H = 0; H < W.length; H++)
        if (W[H].collapsed && W[H].$width) {
          W[H].$width - M.children[H].offsetWidth < N + 10 && (W[H].collapsed = !1, k.current = !0), c([...W]);
          return;
        }
    }
  }
  function z() {
    const N = g.current;
    if (!N) return;
    const M = w.current || [], W = y.current;
    if (W === "wrap") return;
    const H = N.clientWidth;
    if (N.scrollWidth > H) {
      if (W === "collapse") return C();
      const T = N.children;
      let V = 0;
      for (let oe = 0; oe < M.length; oe++) {
        if (V += T[oe].clientWidth, M[oe].comp === "separator" && (V += 8), V > H - 40) {
          if (m.current === oe) return;
          m.current = oe;
          const he = [];
          for (let Q = oe; Q < M.length; Q++)
            he.push(M[Q]), T[Q].style.visibility = "hidden";
          oe > 0 && M[oe - 1].comp === "separator" && (T[oe - 1].style.visibility = "hidden"), x(he);
          break;
        }
        T[oe].style.visibility = "";
      }
    } else {
      const T = H - S();
      if (T <= 0) return;
      if (W === "collapse") return E(T);
      if ((b.current || []).length) {
        m.current = null;
        const V = N.children;
        for (let oe = 0; oe < M.length; oe++)
          V[oe].style.visibility = "";
        x([]);
      }
    }
  }
  return K(() => {
    k.current && (k.current = !1, z());
  }, [l]), K(() => {
    const N = new ResizeObserver(() => z());
    return g.current && N.observe(g.current), () => {
      N.disconnect();
    };
  }, []), /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: g,
      children: [
        h.map(
          (N) => N.items ? /* @__PURE__ */ p(
            Mn,
            {
              item: N,
              values: d,
              onClick: i,
              onChange: D
            },
            N.id
          ) : /* @__PURE__ */ p(
            Ir,
            {
              item: N,
              values: d,
              onClick: i,
              onChange: D
            },
            N.id
          )
        ),
        !!f.length && /* @__PURE__ */ p(
          Dc,
          {
            items: f,
            css: n,
            values: d,
            onClick: i,
            onChange: D
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
    ct,
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
    ct,
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
const et = Wt(null);
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
    const E = Ge(C);
    E && (r = {
      container: l,
      sourceNode: C.target,
      from: Lc(E),
      pos: hr(C, t)
    }, o = r.pos, u(C));
  }
  function u(C) {
    if (!r) return;
    const E = r.pos = hr(C, t);
    if (!i) {
      if (!a && !C?.target?.getAttribute("draggable-data") && Math.abs(o.x - E.x) < ys && Math.abs(o.y - E.y) < ys)
        return;
      if (D(C) === !1) return S();
    }
    if (a) {
      const z = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, N = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        C.pageX - z,
        C.pageY - N
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
  function x(C) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      a = !0, d(C.touches[0]);
    }, Hc), k(C);
    function E() {
      s && c(), C.target.removeEventListener("touchmove", w), C.target.removeEventListener("touchend", E), h(C);
    }
    C.target.addEventListener("touchmove", w), C.target.addEventListener("touchend", E), t.addEventListener("contextmenu", y);
  }
  function w(C) {
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
    const { hasDraggable: E } = n.getDraggableInfo();
    (!E || C.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function D(C) {
    if (i = !0, n.start) {
      if (n.start(C, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function S(C) {
    i = a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", f), C && (t.removeEventListener("mousedown", g), t.removeEventListener("touchstart", x), t.removeEventListener("dragstart", b));
  }
  return t.addEventListener("mousedown", g), t.addEventListener("touchstart", x), t.addEventListener("dragstart", b), {
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
  t.scrollSpeedFactor += Pc, r !== 0 && Kc(t, e, r), s !== 0 && Yc(t, e, s);
}
function Yc(t, e, n) {
  const r = e.node.scrollTop;
  Uo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Kc(t, e, n) {
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
function Vc(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [i, a] = We(t.focusable), l = _e(et), c = se(l, "focusCell"), d = se(l, "search"), u = se(l, "reorder"), h = $(
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
    let E = "wx-cell";
    return E += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", E += S ? " " + S(n) : "", E += C ? " " + C(e, n) : "", E += n.treetoggle ? " wx-tree-cell" : "", E;
  }
  const f = $(
    () => m(s, r),
    [s, r, n, e]
  ), x = $(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), w = F(null);
  K(() => {
    w.current && i && c?.row === e.id && c?.column === n.id && w.current.focus();
  }, [c, i, e.id, n.id]);
  const y = I(() => {
    i && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, i, c, e.id, n.id]);
  K(() => () => {
    i && c && (l.exec("focus-cell", { eventSource: "destroy" }), a(!1));
  }, [l, a]);
  function b(S) {
    const C = new RegExp(`(${d.value.trim()})`, "gi");
    return String(S).split(C).map((E) => ({ text: E, highlight: C.test(E) }));
  }
  const k = $(() => {
    const S = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, C = n.fixed && n.fixed.right;
    return [
      f,
      S ? "wx-shadow" : "",
      C ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [f, n]), D = n.cell;
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-TSCaXsGV " + k,
      ref: w,
      onFocus: y,
      style: g,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: i ? "0" : "-1",
      role: "gridcell",
      "aria-colindex": n._colindex,
      "aria-readonly": n.editor ? void 0 : !0,
      children: [
        u && n.draggable ? x ? /* @__PURE__ */ p(
          "i",
          {
            "draggable-data": "true",
            className: "wx-TSCaXsGV wx-draggable wxi-drag"
          }
        ) : /* @__PURE__ */ p("i", { className: "wx-TSCaXsGV wx-draggable-stub" }) : null,
        n.treetoggle ? /* @__PURE__ */ Z(Ae, { children: [
          /* @__PURE__ */ p("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ p(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        D ? /* @__PURE__ */ p(
          D,
          {
            api: l,
            row: e,
            column: n,
            onAction: ({ action: S, data: C }) => l.exec(S, C)
          }
        ) : o ? o() : h ? /* @__PURE__ */ p("span", { children: b(mt(e, n)).map(
          ({ highlight: S, text: C }, E) => S ? /* @__PURE__ */ p("mark", { className: "wx-TSCaXsGV wx-search", children: C }, E) : /* @__PURE__ */ p("span", { children: C }, E)
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
    on,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Bc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = _e(et), o = se(s, "flatData"), i = $(
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
  const n = _e(et), r = se(n, "filterValues");
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
  } = t, c = _e(et), d = se(c, "sortMarks"), u = $(() => d ? d[n.id] : void 0, [d, n.id]), h = F(), g = I(
    (T) => {
      h.current = e.flexgrow ? T.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = I(
    (T, V) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + T),
        inProgress: V
      });
    },
    [c, e.id]
  ), f = I((T) => m(T, !0), [m]), x = I((T) => m(T, !1), [m]), w = I(
    (T) => {
      if (!n.sort || e.filter) return;
      let V = u?.order;
      V && (V = V === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: T.ctrlKey, order: V });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = I(
    (T) => {
      T && T.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), b = I(
    (T) => {
      T.key === "Enter" && y();
    },
    [y]
  ), k = I(
    (T) => {
      T.key === "Enter" && !e.filter && w(T);
    },
    [w, e.filter]
  ), D = $(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), S = $(
    () => D && !l && e.collapsible !== "header",
    [D, l, e.collapsible]
  ), C = $(
    () => S ? { top: -a / 2, position: "absolute" } : {},
    [S, a]
  ), E = $(
    () => Ln(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (D && S ? a : 0)
    ),
    [
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right,
      n.right,
      e.height,
      D,
      S,
      a
    ]
  ), z = $(
    () => Yo(n, e, i),
    [n, e, i]
  ), N = I(() => Object.fromEntries(
    Object.entries(e).filter(([T]) => T !== "cell")
  ), [e]), M = `wx-cell ${z} ${e.css || ""} wx-collapsed`, W = [
    "wx-cell",
    z,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = F(null);
  return K(() => {
    const T = H.current;
    if (!T) return;
    const V = vs(T, { down: g, move: f, up: x });
    return () => {
      typeof V == "function" && V();
    };
  }, [g, f, x, vs]), D ? /* @__PURE__ */ p(
    "div",
    {
      className: "wx-RsQD74qC " + M,
      style: E,
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
      className: "wx-RsQD74qC " + W,
      style: E,
      onClick: w,
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
          const T = e.cell;
          return /* @__PURE__ */ p(
            T,
            {
              api: c,
              cell: N(),
              column: n,
              row: r,
              onAction: ({ action: V, data: oe }) => c.exec(V, oe)
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
            onClick: (T) => T.stopPropagation(),
            children: /* @__PURE__ */ p("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ Z(Ae, { children: [
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
  const s = _e(et), o = $(
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
  ), a = I(() => Object.fromEntries(
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
  const i = _e(et), a = se(i, "_sizes"), l = se(i, "split"), c = $(() => a?.[`${r}RowHeights`], [a, r]), d = $(() => {
    let f = [];
    if (n && n.length) {
      const x = n[0][r].length;
      for (let w = 0; w < x; w++) {
        let y = 0;
        f.push([]), n.forEach((b, k) => {
          const D = { ...b[r][w] };
          if (y || f[w].push(D), D.colspan > 1) {
            if (y = D.colspan - 1, !Io() && b.right) {
              let S = b.right;
              for (let C = 1; C < D.colspan; C++)
                S -= n[k + C].width;
              D.right = S;
            }
          } else y && y--;
        });
      }
    }
    return f;
  }, [n, r]), u = $(() => l?.left || l?.right, [l]);
  function h(f) {
    return n.find((x) => x.id === f);
  }
  function g(f, x) {
    let w = x;
    return f.rowspan && (w += f.rowspan - 1), w === d.length - 1;
  }
  function m(f, x, w) {
    if (!w.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const b = w.header[y];
      if (!b.filter && !b._hidden) return x === y;
    }
    return g(f, x);
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((f, x) => /* @__PURE__ */ p(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[x]}px`, display: "flex" },
          role: "row",
          children: f.map((w) => {
            const y = h(w.id);
            return r === "header" ? /* @__PURE__ */ p(
              Xc,
              {
                cell: w,
                columnStyle: s,
                column: y,
                row: x,
                lastRow: g(w, x),
                bodyHeight: o,
                sortRow: m(w, x, y),
                hasSplit: u
              },
              w.id
            ) : /* @__PURE__ */ p(
              Qc,
              {
                cell: w,
                columnStyle: s,
                column: h(w.id),
                row: x
              },
              w.id
            );
          })
        },
        x
      ))
    }
  );
}
function Jc({ overlay: t }) {
  const e = _e(et);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Zc(t) {
  const { actions: e, editor: n } = t, [r, s] = G(n?.value || ""), o = F(null);
  K(() => {
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
  const [r, s] = G(e?.value), [o, i] = G(e?.renderedValue), [a, l] = G(e?.options || []), c = $(() => e?.config?.template, [e]), d = $(() => e?.config?.cell, [e]), u = $(() => (a || []).findIndex((y) => y.id === r), [a, r]), h = F(null), g = F(null), m = I(
    (y) => {
      h.current = y.navigate, g.current = y.keydown, h.current(u);
    },
    [u, h]
  ), f = I(
    (y) => {
      const b = y?.target?.value ?? "";
      i(b);
      const k = b ? (e?.options || []).filter(
        (D) => (D.label || "").toLowerCase().includes(b.toLowerCase())
      ) : e?.options || [];
      l(k), k.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), x = F(null);
  K(() => {
    x.current && x.current.focus();
  }, []), K(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const w = I(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ Z(Ae, { children: [
    /* @__PURE__ */ p(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: x,
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
        onSelect: w,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ p(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function td({ actions: t, editor: e, onAction: n }) {
  const [r] = G(() => e.value || /* @__PURE__ */ new Date()), [s] = G(() => e.config?.template), [o] = G(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = F(null);
  return K(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Z(Ae, { children: [
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
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = G(
    n.options.find((f) => f.id === n.value)
  ), [i] = G(n.value), [a] = G(n.options), l = $(
    () => a.findIndex((f) => f.id === i),
    [a, i]
  );
  function c({ id: f }) {
    e.updateValue(f), e.save();
  }
  let d;
  const [u, h] = G();
  function g(f) {
    d = f.navigate, h(() => f.keydown), d(l);
  }
  const m = F(null);
  return K(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Z(Ae, { children: [
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
      const x = s.cell;
      return /* @__PURE__ */ p(x, { data: f, onAction: r });
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
  const n = _e(et), r = se(n, "editor"), s = I(
    (m, f) => {
      n.exec("close-editor", { ignore: m }), f && n.exec("focus-cell", {
        ...f,
        eventSource: "click"
      });
    },
    [n]
  ), o = I(
    (m) => {
      const f = m ? null : { row: r?.id, column: r?.column };
      s(!1, f);
    },
    [r, s]
  ), i = I(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), a = I(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), l = I(
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
  }, [t, e]), u = F(null);
  K(() => {
    if (!u.current) return;
    const m = nn(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), K(() => {
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
  const { columns: e, type: n, columnStyle: r } = t, s = _e(et), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(Ae, { children: e.map((c, d) => /* @__PURE__ */ p("tr", { children: c.map((u) => {
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
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = _e(et), { flatData: c, _sizes: d } = l.getState(), u = o && ps(e, "header", d.headerRowHeights), h = i && ps(e, "footer", d.footerRowHeights);
  function g(f, x) {
    let w = "";
    return w += r ? " " + r(x) : "", w += s ? " " + s(f, x) : "", w;
  }
  function m(f, x) {
    return typeof x.draggable == "function" ? x.draggable(f, x) !== !1 : x.draggable;
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
        /* @__PURE__ */ p("tbody", { children: c.map((f, x) => /* @__PURE__ */ p(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(f) : ""),
            style: { height: `${f.rowHeight || d.rowHeight}px` },
            children: e.map(
              (w) => w.collapsed ? null : /* @__PURE__ */ Z(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(f, w)}`,
                  style: Rs(
                    Eo(w, d.columnWidth)
                  ),
                  children: [
                    a && w.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(f, w) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    w.treetoggle ? /* @__PURE__ */ Z(Ae, { children: [
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
                    w.cell ? (() => {
                      const y = w.cell;
                      return /* @__PURE__ */ p(y, { api: l, row: f, column: w });
                    })() : /* @__PURE__ */ p("span", { children: mt(f, w) })
                  ]
                },
                w.id
              )
            )
          },
          x
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
  const { config: e, ...n } = t, r = _e(et), { _skin: s, _columns: o } = r.getState(), i = $(() => Bl(o, e), []), a = F(null);
  return K(() => {
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
  } = t, f = _e(et), x = se(f, "dynamic"), w = se(f, "_columns"), y = se(f, "flatData"), b = se(f, "split"), k = se(f, "_sizes"), [D, S] = Qt(f, "selectedRows"), C = se(f, "select"), E = se(f, "editor"), z = se(f, "tree"), N = se(f, "focusCell"), M = se(f, "_print"), W = se(f, "undo"), H = se(f, "reorder"), T = se(f, "_rowHeightFromData"), [V, oe] = G(0);
  K(() => {
    oe(cn());
  }, []);
  const [he, Q] = G(0), [ce, Se] = G(0), O = $(() => (w || []).some((R) => !R.hidden && R.flexgrow), [w]), ae = $(() => k?.rowHeight || 0, [k]), we = F(null), [ge, Ce] = G(null), [ue, q] = G(null), B = $(() => {
    let R = [], v = 0;
    return b && b.left && (R = (w || []).slice(0, b.left).filter((_) => !_.hidden).map((_) => ({ ..._ })), R.forEach((_) => {
      _.fixed = { left: 1 }, _.left = v, v += _.width;
    }), R.length && (R[R.length - 1].fixed = { left: -1 })), { columns: R, width: v };
  }, [b, w]), le = $(() => {
    let R = [], v = 0;
    if (b && b.right) {
      R = (w || []).slice(b.right * -1).filter((_) => !_.hidden).map((_) => ({ ..._ }));
      for (let _ = R.length - 1; _ >= 0; _--) {
        const A = R[_];
        A.fixed = { right: 1 }, A.right = v, v += A.width;
      }
      R.length && (R[0].fixed = { right: -1 });
    }
    return { columns: R, width: v };
  }, [b, w]), ee = $(() => {
    const R = (w || []).slice(b?.left || 0, (w || []).length - (b?.right ?? 0)).filter((v) => !v.hidden);
    return R.forEach((v) => {
      v.fixed = 0;
    }), R;
  }, [w, b]), ie = $(() => (w || []).reduce((R, v) => (v.hidden || (R += v.width), R), 0), [w]), Ie = 1;
  function ke(R, v, _) {
    let A = v, U = R;
    if (ee.length) {
      let Y = ee.length;
      for (let P = R; P >= 0; P--)
        ee[P][_].forEach((J) => {
          J.colspan > 1 && P > R - J.colspan && P < Y && (Y = P);
        });
      if (Y !== ee.length && Y < R) {
        for (let P = Y; P < R; P++)
          A -= ee[P].width;
        U = Y;
      }
    }
    return { index: U, delta: A };
  }
  const X = $(() => {
    let R, v, _;
    const A = he, U = he + (u || 0);
    let Y = 0, P = 0, J = 0, re = 0;
    ee.forEach((tt, nt) => {
      A > J && (Y = nt, re = J), J = J + tt.width, U > J && (P = nt + Ie);
    });
    const de = { header: 0, footer: 0 };
    for (let tt = P; tt >= Y; tt--)
      ["header", "footer"].forEach((nt) => {
        ee[tt] && ee[tt][nt].forEach((yt) => {
          const fn = yt.colspan;
          if (fn && fn > 1) {
            const zn = fn - (P - tt + 1);
            zn > 0 && (de[nt] = Math.max(de[nt], zn));
          }
        });
      });
    const xe = ke(Y, re, "header"), Re = ke(Y, re, "footer"), Fe = xe.delta, je = xe.index, qe = Re.delta, Ue = Re.index;
    return O && ie > (u || 0) ? R = v = _ = [...B.columns, ...ee, ...le.columns] : (R = [
      ...B.columns,
      ...ee.slice(Y, P + 1),
      ...le.columns
    ], v = [
      ...B.columns,
      ...ee.slice(je, P + de.header + 1),
      ...le.columns
    ], _ = [
      ...B.columns,
      ...ee.slice(Ue, P + de.footer + 1),
      ...le.columns
    ]), {
      data: R || [],
      header: v || [],
      footer: _ || [],
      d: re,
      df: qe,
      dh: Fe
    };
  }, [
    ee,
    B,
    le,
    he,
    u,
    O,
    ie
  ]), me = $(
    () => e && k?.headerHeight || 0,
    [e, k]
  ), ye = $(
    () => n && k?.footerHeight || 0,
    [n, k]
  ), $e = $(() => u && h ? ie >= u : !1, [u, h, ie]), j = $(() => (h || 0) - me - ye - ($e ? V : 0), [h, me, ye, $e, V]), be = $(() => Math.ceil((j || 0) / (ae || 1)) + 1, [j, ae]), Ne = F([]), [pe, He] = G(0), [ve, Oe] = G(void 0), Te = $(() => {
    let R = 0, v = 0;
    const _ = 2;
    if (c) {
      let Y = ce;
      for (; Y > 0; )
        Y -= Ne.current[R] || ae, R++;
      v = ce - Y;
      for (let P = Math.max(0, R - _ - 1); P < R; P++)
        v -= Ne.current[R - P] || ae;
      R = Math.max(0, R - _);
    } else {
      if (T) {
        let Y = 0, P = 0;
        for (let xe = 0; xe < (y || []).length; xe++) {
          const Re = y[xe].rowHeight || ae;
          if (P + Re > ce) {
            Y = xe;
            break;
          }
          P += Re;
        }
        R = Math.max(0, Y - _);
        for (let xe = 0; xe < R; xe++)
          v += y[xe].rowHeight || ae;
        let J = 0, re = 0;
        for (let xe = Y + 1; xe < (y || []).length; xe++) {
          const Re = y[xe].rowHeight || ae;
          if (J++, re + Re > j)
            break;
          re += Re;
        }
        const de = Math.min(
          x ? x.rowCount : (y || []).length,
          Y + J + _
        );
        return { d: v, start: R, end: de };
      }
      R = Math.floor(ce / (ae || 1)), R = Math.max(0, R - _), v = R * (ae || 0);
    }
    const A = x ? x.rowCount : (y || []).length, U = Math.min(A, R + (be || 0) + _);
    return { d: v, start: R, end: U };
  }, [c, T, ce, ae, x, y, be, j]), Le = $(() => {
    const R = x ? x.rowCount : (y || []).length;
    if (c)
      return pe + Te.d + (R - (ve || 0)) * (ae || 0);
    if (!T)
      return R * (ae || 0);
    let v = 0;
    for (let _ = 0; _ < R; _++)
      v += y[_]?.rowHeight || ae;
    return v;
  }, [
    x,
    y,
    ae,
    c,
    T,
    pe,
    Te.d,
    ve
  ]), Pe = $(() => u && h ? Le + me + ye >= h - (ie >= (u || 0) ? V : 0) : !1, [
    u,
    h,
    Le,
    me,
    ye,
    ie,
    V
  ]), Ye = $(() => O && ie <= (u || 0) ? (u || 0) - 0 - (Pe ? V : 0) : ie, [O, ie, u, Pe, V, $e]), L = $(() => O && ie <= (u || 0) ? u || 0 : Ye < (u || 0) ? ie + (Pe ? V : 0) : -1, [O, ie, u, Ye, Pe, V]), te = F({});
  K(() => {
    if (x && (te.current.start !== Te.start || te.current.end !== Te.end)) {
      const { start: R, end: v } = Te;
      te.current = { start: R, end: v }, f && f.exec && f.exec("request-data", { row: { start: R, end: v } });
    }
  }, [x, Te, f]);
  const ne = $(() => x ? y || [] : (y || []).slice(Te.start, Te.end), [x, y, Te]), fe = $(() => (D || []).filter(
    (R) => (ne || []).some((v) => v.id === R)
  ), [S, ne]), Me = $(() => Te.start, [Te.start]), Ee = I((R) => {
    Se(R.target.scrollTop), Q(R.target.scrollLeft);
  }, []), ze = I((R) => {
    R.shiftKey && R.preventDefault(), we.current && we.current.focus && we.current.focus();
  }, []), Be = I(() => !!(w || []).find((R) => !!R.draggable), [w]), xt = F(null), ft = F(null), On = F({
    dblclick: (R, v) => {
      const _ = { id: R, column: er(v, "data-col-id") };
      f.exec("open-editor", _);
    },
    click: (R, v) => {
      if (xt.current) return;
      const _ = er(v, "data-col-id");
      if (N?.id !== R && f.exec("focus-cell", {
        row: R,
        column: _,
        eventSource: "click"
      }), C === !1) return;
      const A = s && v.ctrlKey, U = s && v.shiftKey;
      (A || D.length > 1 || !D.includes(R)) && f.exec("select-row", { id: R, toggle: A, range: U });
    },
    "toggle-row": (R) => {
      const v = f.getRow(R);
      f.exec(v.open !== !1 ? "close-row" : "open-row", { id: R });
    },
    "ignore-click": () => !1
  }), Nt = $(() => ({
    top: me,
    bottom: ye,
    left: B.width,
    xScroll: $e,
    yScroll: Pe,
    sense: c && ue ? ue.offsetHeight : Math.max(k?.rowHeight || 0, 40),
    node: we.current && we.current.firstElementChild
  }), [
    me,
    ye,
    B.width,
    $e,
    Pe,
    c,
    ue,
    k
  ]);
  function Mt(R, v) {
    const { container: _, sourceNode: A, from: U } = v;
    if (Be() && !A.getAttribute("draggable-data"))
      return !1;
    Ce(U), f.getRow(U).open && f.exec("close-row", { id: U, nested: !0 });
    const Y = Ge(A, "data-id"), P = Y.cloneNode(!0);
    P.classList.remove("wx-selected"), P.querySelectorAll("[tabindex]").forEach((xe) => xe.setAttribute("tabindex", "-1")), _.appendChild(P), q(P);
    const J = he - X.d, re = Pe ? V : 0;
    _.style.width = Math.min(
      (u || 0) - re,
      O && ie <= (u || 0) ? Ye : Ye - re
    ) + J + "px";
    const de = bn(Y);
    v.offset = {
      x: J,
      y: -Math.round(de.height / 2)
    }, ft.current || (ft.current = R.clientY);
  }
  function Et(R, v) {
    const { from: _ } = v, A = v.pos, U = bn(we.current);
    A.x = U.x;
    const Y = Nt.top;
    if (A.y < Y) A.y = Y;
    else {
      const P = U.height - ($e && V > 0 ? V : Math.round(Nt.sense / 2)) - Nt.bottom;
      A.y > P && (A.y = P);
    }
    if (we.current.contains(v.targetNode)) {
      const P = Ge(v.targetNode, "data-id"), J = zt(P?.getAttribute("data-id"));
      if (J && J !== _) {
        v.to = J;
        const re = c ? ue?.offsetHeight : k?.rowHeight;
        if (ue && (ce === 0 || A.y > Y + re - 1)) {
          const de = P.getBoundingClientRect(), xe = bn(ue).y, Re = de.y, Fe = xe > Re ? -1 : 1, je = Fe === 1 ? "after" : "before", qe = Math.abs(f.getRowIndex(_) - f.getRowIndex(J)), Ue = qe !== 1 ? je === "before" ? "after" : "before" : je;
          if (qe === 1 && (Fe === -1 && R.clientY > ft.current || Fe === 1 && R.clientY < ft.current))
            return;
          ft.current = R.clientY, f.exec("move-item", {
            id: _,
            target: J,
            mode: Ue,
            inProgress: !0
          });
        }
      }
      o && o({ event: R, context: v });
    }
    zc(R, U, v, Nt);
  }
  function ln(R, v) {
    const { from: _, to: A } = v;
    f.exec("move-item", {
      id: _,
      target: A,
      inProgress: !1
    }), xt.current = setTimeout(() => {
      xt.current = 0;
    }, 1), Ce(null), q(null), ft.current = null, Fo(v);
  }
  function cn() {
    const R = document.createElement("div");
    R.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(R);
    const v = R.offsetWidth - R.clientWidth;
    return document.body.removeChild(R), v;
  }
  const Pn = $(() => L > 0 ? { width: `${L}px` } : void 0, [L]), dn = F(null);
  function Wn() {
    Promise.resolve().then(() => {
      let R = 0, v = Me;
      const _ = dn.current;
      _ && (Array.from(_.children).forEach((A, U) => {
        Ne.current[Me + U] = A.offsetHeight, R += A.offsetHeight, v++;
      }), He(R), Oe(v));
    });
  }
  K(() => {
    ne && c && Wn();
  }, [ne, c, Me]);
  let [ht, It] = G();
  K(() => {
    if (N && (!C || !fe.length || fe.includes(N.row)))
      It({ ...N });
    else if (ne.length && X.data.length) {
      if (!ht || fe.length && !fe.includes(ht.row) || ne.findIndex((R) => R.id == ht.row) === -1 || X.data.findIndex(
        (R) => R.id == ht.column && !R.collapsed
      ) === -1) {
        const R = fe[0] || ne[0].id, v = X.data.findIndex((_) => !_.collapsed);
        It(v !== -1 ? { row: R, column: X.data[v].id } : null);
      }
    } else It(null);
  }, [N]);
  const Kt = F(null);
  K(() => {
    const R = we.current;
    if (!R) return;
    const v = Ac(R, d);
    return () => {
      typeof v == "function" && v();
    };
  }, [d]);
  const Vt = F({});
  Object.assign(Vt.current, {
    start: Mt,
    move: Et,
    end: ln,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: Be() })
  }), K(() => {
    const R = we.current;
    return R ? Oc(R, Vt).destroy : void 0;
  }, [H, we.current]), K(() => {
    const R = we.current;
    return R ? xc(R, {
      keys: m !== !1 && {
        ...wc,
        "ctrl+z": W,
        "ctrl+y": W,
        ...m
      },
      exec: (v) => f.exec("hotkey", v)
    }).destroy : void 0;
  }, [f, W, m]);
  const gt = F({
    scroll: f.getReactiveState().scroll
  });
  gt.current.getWidth = () => (u || 0) - (Pe ? V : 0), gt.current.getHeight = () => j, gt.current.getScrollMargin = () => B.width + le.width, K(() => {
    yc(Kt.current, gt.current);
  }, []);
  const Gt = F(null);
  K(() => {
    const R = Gt.current;
    if (!R) return;
    const v = [];
    return v.push(
      nn(R, () => f.exec("focus-cell", { eventSource: "click" })).destroy
    ), v.push(gi(R, On.current)), () => v.forEach((_) => _());
  }, []);
  const un = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ Z(Ae, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + un,
        style: {
          "--header-height": `${me}px`,
          "--footer-height": `${ye}px`,
          "--split-left-width": `${B.width}px`,
          "--split-right-width": `${le.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: we,
            className: "wx-4VuBwK2D wx-table-box",
            style: Pn,
            role: z ? "treegrid" : "grid",
            "aria-colcount": X.data.length,
            "aria-rowcount": ne.length,
            "aria-multiselectable": z && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ Z(
              "div",
              {
                ref: Kt,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: $e ? "scroll" : "hidden",
                  overflowY: Pe ? "scroll" : "hidden"
                },
                onScroll: Ee,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    ks,
                    {
                      contentWidth: Ye,
                      deltaLeft: X.dh,
                      columns: X.header,
                      columnStyle: a,
                      bodyHeight: j - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ Z(
                    "div",
                    {
                      ref: Gt,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${Ye}px`, height: `${Le}px` },
                      onMouseDown: (R) => ze(R),
                      children: [
                        r ? /* @__PURE__ */ p(Jc, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: dn,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Te.d}px`,
                              paddingLeft: `${X.d}px`
                            },
                            children: ne.map((R, v) => {
                              const _ = D.indexOf(R.id) !== -1, A = ge === R.id, U = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(R) : "") + (_ ? " wx-selected" : "") + (A ? " wx-inactive" : ""), Y = c ? { minHeight: `${R.rowHeight || ae}px` } : { height: `${R.rowHeight || ae}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + U,
                                  "data-id": R.id,
                                  "data-context-id": R.id,
                                  style: Y,
                                  role: "row",
                                  "aria-rowindex": v,
                                  "aria-expanded": R.open,
                                  "aria-level": z ? R.$level + 1 : void 0,
                                  "aria-selected": z ? _ : void 0,
                                  tabIndex: -1,
                                  children: X.data.map((P) => P.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    P.id
                                  ) : E?.id === R.id && E.column == P.id ? /* @__PURE__ */ p(sd, { row: R, column: P }, P.id) : /* @__PURE__ */ p(
                                    Vc,
                                    {
                                      row: R,
                                      column: P,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: H,
                                      focusable: ht?.row === R.id && ht?.column == P.id
                                    },
                                    P.id
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
                      deltaLeft: X.df,
                      columns: X.footer,
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
  split: x,
  tree: w = !1,
  autoConfig: y = !1,
  init: b = null,
  responsive: k = null,
  sortMarks: D,
  undo: S = !1,
  hotkeys: C = null,
  ...E
}, z) {
  const N = F();
  N.current = E;
  const M = $(() => new uc(As), []), W = $(() => M.in, [M]), H = F(null);
  H.current === null && (H.current = new Us((B, le) => {
    const ee = "on" + ld(B);
    N.current && N.current[ee] && N.current[ee](le);
  }), W.setNext(H.current));
  const T = $(
    () => ({
      getState: M.getState.bind(M),
      getReactiveState: M.getReactive.bind(M),
      getStores: () => ({ data: M }),
      exec: W.exec,
      setNext: (B) => (H.current = H.current.setNext(B), H.current),
      intercept: W.intercept.bind(W),
      on: W.on.bind(W),
      detach: W.detach.bind(W),
      getRow: M.getRow.bind(M),
      getRowIndex: M.getRowIndex.bind(M),
      getColumn: M.getColumn.bind(M)
    }),
    [M, W]
  ), [V, oe] = G(0), [he, Q] = G(0), [ce, Se] = G(null), [O, ae] = G(null), we = $(() => {
    if (y && !e.length && t.length) {
      const B = t[0], le = [];
      for (let ee in B)
        if (ee !== "id" && ee[0] !== "$") {
          let ie = {
            id: ee,
            header: ee[0].toUpperCase() + ee.slice(1)
          };
          typeof y == "object" && (ie = { ...ie, ...y }), le.push(ie);
        }
      return le;
    }
    return (O && O.columns) ?? e;
  }, [y, e, t, O]), ge = $(
    () => (O && O.sizes) ?? f,
    [O, f]
  ), Ce = I(
    (B) => {
      if (oe(B.width), Q(B.height), k) {
        const le = Object.keys(k).map(Number).sort((ee, ie) => ee - ie).find((ee) => B.width <= ee) ?? null;
        le !== ce && (ae(k[le]), Se(le));
      }
    },
    [k, ce]
  ), ue = _e(Ze.theme), q = F(0);
  return K(() => {
    if (!q.current)
      b && b(T);
    else {
      const B = M.getState();
      M.init({
        data: t,
        columns: we,
        split: x || B.split,
        sizes: ge || B.sizes,
        selectedRows: o || B.selectedRows,
        dynamic: d,
        tree: w,
        sortMarks: D || B.sortMarks,
        undo: S,
        reorder: h,
        _skin: ue,
        _select: i
      });
    }
    q.current++;
  }, [
    M,
    t,
    we,
    x,
    ge,
    o,
    d,
    w,
    D,
    S,
    h,
    ue,
    i,
    b,
    T
  ]), q.current === 0 && M.init({
    data: t,
    columns: we,
    split: x || { left: 0 },
    sizes: ge || {},
    selectedRows: o || [],
    dynamic: d,
    tree: w,
    sortMarks: D || {},
    undo: S,
    reorder: h,
    _skin: ue,
    select: i
  }), Tt(
    z,
    () => ({
      ...T
    }),
    [T]
  ), /* @__PURE__ */ p(et.Provider, { value: T, children: /* @__PURE__ */ p(In, { words: Il, optional: !0, children: /* @__PURE__ */ p(
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
      clientWidth: V,
      clientHeight: he,
      responsiveLevel: ce,
      resize: Ce,
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
  K(() => {
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
  const i = at(e, "_columns"), a = $(() => {
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
pr(Je);
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
  } = t, [c, d] = We(o), [u, h] = G(), g = _e(Ze.i18n), m = $(() => g.getGroup("gantt"), [g]), f = _e(wt), x = se(f, "scrollTop"), w = se(f, "cellHeight"), y = se(f, "_scrollTask"), b = se(f, "_selected"), k = se(f, "area"), D = se(f, "_tasks"), S = se(f, "_scales"), C = se(f, "columns"), E = se(f, "_sort"), z = se(f, "calendar"), N = se(f, "durationUnit"), M = se(f, "splitTasks"), [W, H] = G(null), T = $(() => !D || !k ? [] : a && l ? D : D.slice(k.start, k.end), [D, k, a, l]), V = I(
    (L, te) => {
      if (te === "add-task")
        f.exec(te, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (te === "open-task") {
        const ne = T.find((fe) => fe.id === L);
        (ne?.data || ne?.lazy) && f.exec(te, { id: L, mode: !ne.open });
      }
    },
    [T]
  ), oe = I(
    (L) => {
      const te = bt(L), ne = L.target.dataset.action;
      ne && L.preventDefault(), te ? ne === "add-task" || ne === "open-task" ? V(te, ne) : f.exec("select-task", {
        id: te,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : ne === "add-task" && V(null, ne);
    },
    [f, V]
  ), he = F(null), Q = F(null), [ce, Se] = G(0), [O, ae] = G(!1);
  K(() => {
    const L = Q.current;
    if (!L || typeof ResizeObserver > "u") return;
    const te = () => Se(L.clientWidth);
    te();
    const ne = new ResizeObserver(te);
    return ne.observe(L), () => ne.disconnect();
  }, []);
  const we = F(null), ge = I(
    (L) => {
      const te = L.id, { before: ne, after: fe } = L, Me = L.onMove;
      let Ee = ne || fe, ze = ne ? "before" : "after";
      if (Me) {
        if (ze === "after") {
          const Be = f.getTask(Ee);
          Be.data?.length && Be.open && (ze = "before", Ee = Be.data[0].id);
        }
        we.current = { id: te, [ze]: Ee };
      } else we.current = null;
      f.exec("move-task", {
        id: te,
        mode: ze,
        target: Ee,
        inProgress: Me
      });
    },
    [f]
  ), Ce = $(() => a && l ? 0 : k?.from ?? 0, [k, a, l]), ue = $(() => S?.height ?? 0, [S]), q = $(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ce ?? 0), [n, s, c, r, ce]), B = $(() => {
    const L = {};
    return q && s === "all" || s === "grid" && q ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [q, s, c]), le = $(() => W && !T.find((L) => L.id === W.id) ? [...T, W] : T, [T, W]), ee = $(() => {
    if (!a || !l) return le;
    const L = /* @__PURE__ */ new Map(), te = /* @__PURE__ */ new Set();
    return le.forEach((ne) => {
      const fe = l.taskRows.get(ne.id) ?? ne.id;
      te.has(fe) || (L.set(fe, {
        ...ne,
        $rowTasks: l.rowMap.get(fe) || [ne.id]
      }), te.add(fe));
    }), Array.from(L.values());
  }, [le, a, l]), ie = $(() => {
    let L = (C || []).map((fe) => {
      fe = { ...fe };
      const Me = fe.header;
      if (typeof Me == "object") {
        const Ee = Me.text && m(Me.text);
        fe.header = { ...Me, text: Ee };
      } else fe.header = m(Me);
      return fe;
    });
    const te = L.findIndex((fe) => fe.id === "text"), ne = L.findIndex((fe) => fe.id === "add-task");
    if (te !== -1 && (L[te].cell && (L[te]._cell = L[te].cell), L[te].cell = fd), ne !== -1) {
      L[ne].cell = L[ne].cell || Ss;
      const fe = L[ne].header;
      if (typeof fe != "object" && (L[ne].header = { text: fe }), L[ne].header.cell = fe.cell || Ss, e)
        L.splice(ne, 1);
      else if (n) {
        const [Me] = L.splice(ne, 1);
        L.unshift(Me);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [C, m, e, n]), Ie = $(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : ie.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, ie]), ke = $(() => {
    if (ee && E?.length) {
      const L = {};
      return E.forEach(({ key: te, order: ne }, fe) => {
        L[te] = {
          order: ne,
          ...E.length > 1 && { index: fe }
        };
      }), L;
    }
    return {};
  }, [ee, E]), X = I(() => ie.some((L) => L.flexgrow && !L.hidden), []), me = $(() => X(), [X, O]), ye = $(() => {
    let L = s === "chart" ? ie.filter((ne) => ne.id === "add-task") : ie;
    const te = s === "all" ? r : ce;
    if (!me) {
      let ne = c, fe = !1;
      if (ie.some((Me) => Me.$width)) {
        let Me = 0;
        ne = ie.reduce((Ee, ze) => (ze.hidden || (Me += ze.width, Ee += ze.$width || ze.width), Ee), 0), Me > ne && ne > te && (fe = !0);
      }
      if (fe || ne < te) {
        let Me = 1;
        return fe || (Me = (te - 50) / (ne - 50 || 1)), L.map((Ee) => (Ee.id !== "add-task" && !Ee.hidden && (Ee.$width || (Ee.$width = Ee.width), Ee.width = Ee.$width * Me), Ee));
      }
    }
    return L;
  }, [s, ie, me, c, r, ce]), $e = I(
    (L) => {
      if (!X()) {
        const te = ye.reduce((ne, fe) => (L && fe.$width && (fe.$width = fe.width), ne + (fe.hidden ? 0 : fe.width)), 0);
        te !== c && d(te);
      }
      ae(!0), ae(!1);
    },
    [X, ye, c, d]
  ), j = I(() => {
    ie.filter((te) => te.flexgrow && !te.hidden).length === 1 && ie.forEach((te) => {
      te.$width && !te.flexgrow && !te.hidden && (te.width = te.$width);
    });
  }, []), be = I(
    (L) => {
      if (!e) {
        const te = bt(L), ne = er(L, "data-col-id");
        !(ne && ie.find((Me) => Me.id == ne))?.editor && te && f.exec("show-editor", { id: te });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), Ne = $(
    () => Array.isArray(b) ? b.map((L) => L.id) : [],
    [b]
  ), pe = F(Ce);
  pe.current = Ce, K(() => {
    const L = (ne) => {
      if (he.current) {
        const fe = he.current.querySelector(".wx-body");
        fe && (fe.style.top = -((ne ?? 0) - (pe.current ?? 0)) + "px");
      }
      Q.current && (Q.current.scrollTop = 0);
    };
    return L(x), f.on("scroll-chart", ({ top: ne }) => {
      ne !== void 0 && L(ne);
    });
  }, [f, x]), K(() => {
    if (he.current) {
      const L = he.current.querySelector(".wx-body");
      L && (L.style.top = -((x ?? 0) - (Ce ?? 0)) + "px");
    }
  }, [Ce]), K(() => {
    const L = he.current;
    if (!L) return;
    const te = L.querySelector(".wx-table-box .wx-body");
    if (!te || typeof ResizeObserver > "u") return;
    const ne = new ResizeObserver(() => {
      if (he.current) {
        const fe = he.current.querySelector(".wx-body");
        fe && (fe.style.top = -((x ?? 0) - (pe.current ?? 0)) + "px");
      }
    });
    return ne.observe(te), () => {
      ne.disconnect();
    };
  }, [ye, B, s, Ie, ee, x]), K(() => {
    if (!y || !u) return;
    const { id: L } = y, te = u.getState().focusCell;
    te && te.row !== L && he.current && he.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: te.column
    });
  }, [y, u]);
  const He = I(
    ({ id: L }) => {
      if (e) return !1;
      f.getTask(L).open && f.exec("open-task", { id: L, mode: !1 });
      const te = f.getState()._tasks.find((ne) => ne.id === L);
      if (H(te || null), !te) return !1;
    },
    [f, e]
  ), ve = I(
    ({ id: L, top: te }) => {
      we.current ? ge({ ...we.current, onMove: !1 }) : f.exec("drag-task", {
        id: L,
        top: te + (Ce ?? 0),
        inProgress: !1
      }), H(null);
    },
    [f, ge, Ce]
  ), Oe = I(
    ({ id: L, top: te, detail: ne }) => {
      ne && ge({ ...ne, onMove: !0 }), f.exec("drag-task", {
        id: L,
        top: te + (Ce ?? 0),
        inProgress: !0
      });
    },
    [f, ge, Ce]
  );
  K(() => {
    const L = he.current;
    return L ? El(L, {
      start: He,
      end: ve,
      move: Oe,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, He, ve, Oe]);
  const Te = I(
    (L) => {
      const { key: te, isInput: ne } = L;
      if (!ne && (te === "arrowup" || te === "arrowdown"))
        return L.eventSource = "grid", f.exec("hotkey", L), !1;
      if (te === "enter") {
        const fe = u?.getState().focusCell;
        if (fe) {
          const { row: Me, column: Ee } = fe;
          Ee === "add-task" ? V(Me, "add-task") : Ee === "text" && V(Me, "open-task");
        }
      }
    },
    [f, V, u]
  ), Le = F(null), Pe = () => {
    Le.current = {
      setTableAPI: h,
      handleHotkey: Te,
      sortVal: E,
      api: f,
      adjustColumns: j,
      setColumnWidth: $e,
      tasks: T,
      calendarVal: z,
      durationUnitVal: N,
      splitTasksVal: M,
      onTableAPIChange: i
    };
  };
  Pe(), K(() => {
    Pe();
  }, [
    h,
    Te,
    E,
    f,
    j,
    $e,
    T,
    z,
    N,
    M,
    i
  ]);
  const Ye = I((L) => {
    h(L), L.intercept("hotkey", (te) => Le.current.handleHotkey(te)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (te) => {
      const ne = Le.current.sortVal, { key: fe, add: Me } = te, Ee = ne ? ne.find((Be) => Be.key === fe) : null;
      let ze = "asc";
      return Ee && (ze = !Ee || Ee.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: fe,
        order: ze,
        add: Me
      }), !1;
    }), L.on("resize-column", () => {
      Le.current.setColumnWidth(!0);
    }), L.on("hide-column", (te) => {
      te.mode || Le.current.adjustColumns(), Le.current.setColumnWidth();
    }), L.intercept("update-cell", (te) => {
      const { id: ne, column: fe, value: Me } = te, Ee = Le.current.tasks.find((ze) => ze.id === ne);
      if (Ee) {
        const ze = { ...Ee };
        let Be = Me;
        Be && !isNaN(Be) && !(Be instanceof Date) && (Be *= 1), ze[fe] = Be, ko(
          ze,
          {
            calendar: Le.current.calendarVal,
            durationUnit: Le.current.durationUnitVal,
            splitTasks: Le.current.splitTasksVal
          },
          fe
        ), f.exec("update-task", {
          id: ne,
          task: ze
        });
      }
      return !1;
    }), i && i(L);
  }, []);
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Ie}` },
      ref: Q,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: he,
          style: B,
          className: "wx-rHj6070p wx-table",
          onClick: oe,
          onDoubleClick: be,
          children: /* @__PURE__ */ p(
            cd,
            {
              init: Ye,
              sizes: {
                rowHeight: w,
                headerHeight: (ue ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: ee,
              columns: ye,
              selectedRows: [...Ne],
              sortMarks: ke
            }
          )
        }
      )
    }
  );
}
function gd({ borders: t = "" }) {
  const e = _e(wt), n = se(e, "cellWidth"), r = se(e, "cellHeight"), s = F(null), [o, i] = G("#e4e4e4");
  K(() => {
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
  const r = _e(wt), s = se(r, "_links"), o = se(r, "criticalPath"), i = F(null), a = I(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return K(() => {
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
let jt = [], qn = null, $s = null;
const Cs = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, i = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, a = Math.floor(t / r);
  let l = n;
  if (s === "week") {
    const d = n.getUTCDay(), u = d === 0 ? -6 : 1 - d;
    l = new Date(n.getTime() + u * o), l.setUTCHours(0, 0, 0, 0);
  }
  const c = new Date(l.getTime() + a * i * o);
  return c.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: a,
    scalesStart: n.toISOString(),
    scalesStartDayOfWeek: n.getUTCDay(),
    alignedStart: l.toISOString(),
    result: c.toISOString()
  }), c;
}, wd = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / i);
}, xd = (t, e, n) => {
  if (!n || !t) return t;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5, a = new Date(t.getTime() + e * i);
  return a.setUTCHours(0, 0, 0, 0), a;
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
  } = t, l = _e(wt), [c, d] = Qt(l, "_tasks"), [u, h] = Qt(l, "_links"), g = se(l, "area"), m = se(l, "_scales"), f = se(l, "taskTypes"), x = se(l, "baselines"), [w, y] = Qt(l, "_selected"), b = se(l, "_scrollTask"), k = se(l, "criticalPath"), D = se(l, "tasks"), S = se(l, "schedule"), C = se(l, "splitTasks"), E = $(() => {
    if (!g || !Array.isArray(c)) return [];
    const v = g.start ?? 0, _ = g.end ?? 0;
    return r && s ? c.map((A) => ({ ...A })) : c.slice(v, _).map((A) => ({ ...A }));
  }, [d, g, r, s]), z = se(l, "cellHeight"), N = $(() => {
    if (!r || !s || !E.length) return E;
    const v = /* @__PURE__ */ new Map(), _ = [];
    return c.forEach((A) => {
      const U = s.taskRows.get(A.id) ?? A.id;
      v.has(U) || (v.set(U, _.length), _.push(U));
    }), E.map((A) => {
      const U = s.taskRows.get(A.id) ?? A.id, Y = v.get(U) ?? 0;
      return {
        ...A,
        $y: Y * z,
        $y_base: A.$y_base !== void 0 ? Y * z : void 0
      };
    });
  }, [E, r, s, c, z]), M = $(
    () => m.lengthUnitWidth,
    [m]
  ), W = $(
    () => m.lengthUnit || "day",
    [m]
  ), H = F(!1), [T, V] = G(void 0), [oe, he] = G(null), Q = F(null), [ce, Se] = G(null), [O, ae] = G(void 0), we = F(null), [ge, Ce] = G(0), [ue, q] = G(null), B = F(null), [le, ee] = G(null), [ie, Ie] = G(null), [ke, X] = G(null), me = F(null);
  me.current = ie;
  const ye = F(200), $e = F(null), j = $(() => {
    const v = $e.current;
    return !!(w.length && v && v.contains(document.activeElement));
  }, [w, $e.current]), be = $(() => j && w[w.length - 1]?.id, [j, w]);
  K(() => {
    if (b && j && b) {
      const { id: v } = b, _ = $e.current?.querySelector(
        `.wx-bar[data-id='${v}']`
      );
      _ && _.focus({ preventScroll: !0 });
    }
  }, [b]), K(() => {
    const v = $e.current;
    if (v && (Ce(v.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const _ = new ResizeObserver((A) => {
        A[0] && Ce(A[0].contentRect.width);
      });
      return _.observe(v), () => _.disconnect();
    }
  }, [$e.current]);
  const Ne = I(() => {
    document.body.style.userSelect = "none";
  }, []), pe = I(() => {
    document.body.style.userSelect = "";
  }, []), He = I(
    (v, _, A) => {
      if (_.target.classList.contains("wx-line") || (A || (A = l.getTask(kt(v))), A.type === "milestone" || A.type === "summary")) return "";
      const U = Ge(_, "data-segment");
      U && (v = U);
      const { left: Y, width: P } = v.getBoundingClientRect(), J = (_.clientX - Y) / P;
      let re = 0.2 / (P > 200 ? P / 200 : 1);
      return J < re ? "start" : J > 1 - re ? "end" : "";
    },
    [l]
  ), ve = $(() => {
    const v = /* @__PURE__ */ new Set();
    if (a || !r || !s)
      return v;
    const _ = /* @__PURE__ */ new Map();
    return c.forEach((A) => {
      if (A.type === "summary" || A.type === "milestone") return;
      const U = s.taskRows.get(A.id) ?? A.id;
      _.has(U) || _.set(U, []), _.get(U).push(A);
    }), _.forEach((A) => {
      if (!(A.length < 2))
        for (let U = 0; U < A.length; U++)
          for (let Y = U + 1; Y < A.length; Y++) {
            const P = A[U], J = A[Y], re = P.$x, de = P.$x + P.$w, xe = J.$x, Re = J.$x + J.$w;
            yd(re, de, xe, Re) && (v.add(P.id), v.add(J.id));
          }
    }), v;
  }, [a, r, s, c, d]), Oe = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return c.forEach((U) => {
        v.set(U.id, U.$y);
      }), v;
    const _ = /* @__PURE__ */ new Map(), A = [];
    return c.forEach((U) => {
      const Y = s.taskRows.get(U.id) ?? U.id;
      _.has(Y) || (_.set(Y, A.length), A.push(Y));
    }), c.forEach((U) => {
      const Y = s.taskRows.get(U.id) ?? U.id, P = _.get(Y) ?? 0;
      v.set(U.id, P * z);
    }), v;
  }, [c, r, s, z]), Te = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return c.forEach((U) => {
        v.set(U.id, U.$y), U.row !== void 0 && v.set(U.row, U.$y);
      }), v;
    const _ = /* @__PURE__ */ new Map(), A = [];
    return c.forEach((U) => {
      const Y = s.taskRows.get(U.id) ?? U.id;
      _.has(Y) || (_.set(Y, A.length), A.push(Y));
    }), _.forEach((U, Y) => {
      v.set(Y, U * z);
    }), v;
  }, [c, r, s, z]), Le = I(
    (v) => {
      if (!$e.current) return [];
      const A = Math.min(v.startX, v.currentX), U = Math.max(v.startX, v.currentX), Y = Math.min(v.startY, v.currentY), P = Math.max(v.startY, v.currentY);
      return c.filter((J) => {
        const re = J.$x, de = J.$x + J.$w, Re = Oe.get(J.id) ?? J.$y, Fe = Re + J.$h;
        return re < U && de > A && Re < P && Fe > Y;
      });
    },
    [c, Oe]
  ), Pe = $(() => new Set(w.map((v) => v.id)), [w, y]), Ye = I(
    (v) => Pe.has(v),
    [Pe]
  ), L = I(
    (v, _) => {
      const { clientX: A } = _, U = kt(v), Y = l.getTask(U), P = _.target.classList;
      if (!_.target.closest(".wx-delete-button") && !e) {
        if (P.contains("wx-progress-marker")) {
          const { progress: J } = l.getTask(U);
          Q.current = {
            id: U,
            x: A,
            progress: J,
            dx: 0,
            node: v,
            marker: _.target
          }, _.target.classList.add("wx-progress-in-drag");
        } else {
          const J = He(v, _, Y) || "move", re = {
            id: U,
            mode: J,
            x: A,
            dx: 0,
            l: Y.$x,
            w: Y.$w
          };
          if (C && Y.segments?.length) {
            const de = Ge(_, "data-segment");
            de && (re.segmentIndex = de.dataset.segment * 1);
          }
          he(re);
        }
        Ne();
      }
    },
    [l, e, He, Ne, C]
  ), te = I(
    (v) => {
      if (v.button !== 0 || ke) return;
      const _ = Ge(v);
      if (!_ && o && !e) {
        const A = $e.current;
        if (!A) return;
        const U = A.getBoundingClientRect(), Y = v.clientX - U.left, P = v.clientY - U.top;
        if (i) {
          const re = Cs(Y, m);
          re && (me.current = re, Ie(re));
        }
        const J = {
          startX: Y,
          startY: P,
          currentX: Y,
          currentY: P,
          ctrlKey: v.ctrlKey || v.metaKey
        };
        q(J), B.current = J, Ne();
        return;
      }
      if (_) {
        if (o && !e && w.length > 1) {
          const A = kt(_);
          if (Ye(A)) {
            const U = v.target.classList;
            if (!U.contains("wx-link") && !U.contains("wx-progress-marker") && !v.target.closest(".wx-delete-button")) {
              const Y = l.getTask(A);
              if (!He(_, v, Y)) {
                const J = /* @__PURE__ */ new Map();
                w.forEach((re) => {
                  const de = l.getTask(re.id);
                  if (de) {
                    if (S?.auto && de.type === "summary") return;
                    J.set(re.id, {
                      $x: de.$x,
                      $w: de.$w,
                      start: de.start,
                      end: de.end
                    });
                  }
                }), ee({
                  baseTaskId: A,
                  startX: v.clientX,
                  dx: 0,
                  originalPositions: J
                }), Ne();
                return;
              }
            }
          }
        }
        L(_, v);
      }
    },
    [L, o, i, e, w, Ye, l, He, S, Ne, m, ke]
  ), ne = I(
    (v) => {
      const _ = Ge(v);
      _ && (we.current = setTimeout(() => {
        ae(!0), L(_, v.touches[0]);
      }, 300));
    },
    [L]
  ), fe = I(
    (v) => {
      Se(v && { ...u.find((_) => _.id === v) });
    },
    [u]
  ), Me = I(() => {
    const v = B.current;
    if (v) {
      const _ = Le(v);
      v.ctrlKey ? _.forEach((A) => {
        l.exec("select-task", { id: A.id, toggle: !0, marquee: !0 });
      }) : (w.length > 0 && l.exec("select-task", { id: null, marquee: !0 }), _.forEach((A, U) => {
        l.exec("select-task", {
          id: A.id,
          toggle: U > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), q(null), B.current = null, pe(), H.current = !0;
      return;
    }
    if (le) {
      const { dx: _, originalPositions: A } = le, U = Math.round(_ / M);
      if (U !== 0) {
        let Y = !0;
        A.forEach((P, J) => {
          const re = l.getTask(J);
          re && (l.exec("update-task", {
            id: J,
            diff: U,
            task: { start: re.start, end: re.end },
            skipUndo: !Y
            // Only first task creates undo entry
          }), Y = !1);
        }), H.current = !0;
      } else
        A.forEach((Y, P) => {
          l.exec("drag-task", {
            id: P,
            left: Y.$x,
            width: Y.$w,
            inProgress: !1
          });
        });
      ee(null), pe();
      return;
    }
    if (Q.current) {
      const { dx: _, id: A, marker: U, value: Y } = Q.current;
      Q.current = null, typeof Y < "u" && _ && l.exec("update-task", {
        id: A,
        task: { progress: Y },
        inProgress: !1
      }), U.classList.remove("wx-progress-in-drag"), H.current = !0, pe();
    } else if (oe) {
      const { id: _, mode: A, dx: U, l: Y, w: P, start: J, segment: re, index: de } = oe;
      if (he(null), J) {
        const xe = Math.round(U / M);
        if (!xe)
          l.exec("drag-task", {
            id: _,
            width: P,
            left: Y,
            inProgress: !1,
            ...re && { segmentIndex: de }
          });
        else {
          let Re = {}, Fe = l.getTask(_);
          re && (Fe = Fe.segments[de]);
          const je = 1440 * 60 * 1e3, Ue = xe * (W === "week" ? 7 : W === "month" ? 30 : W === "quarter" ? 91 : W === "year" ? 365 : 1) * je;
          A === "move" ? (Re.start = new Date(Fe.start.getTime() + Ue), Re.end = new Date(Fe.end.getTime() + Ue)) : A === "start" ? (Re.start = new Date(Fe.start.getTime() + Ue), Re.end = Fe.end) : A === "end" && (Re.start = Fe.start, Re.end = new Date(Fe.end.getTime() + Ue)), l.exec("update-task", {
            id: _,
            task: Re,
            ...re && { segmentIndex: de }
          });
        }
        H.current = !0;
      }
      pe();
    }
  }, [l, pe, oe, M, W, ue, le, Le, w]), Ee = I(
    (v, _) => {
      const { clientX: A, clientY: U } = _, Y = $e.current;
      if (Y) {
        const P = Y.getBoundingClientRect();
        ye.current = A - P.left;
      }
      if (ke) {
        if (!Y) return;
        const P = Y.getBoundingClientRect(), J = A - P.left;
        X((re) => ({ ...re, currentX: J }));
        return;
      }
      if (!e) {
        if (ue) {
          const P = $e.current;
          if (!P) return;
          const J = P.getBoundingClientRect(), re = A - J.left, de = U - J.top;
          q((xe) => ({
            ...xe,
            currentX: re,
            currentY: de
          })), B.current && (B.current.currentX = re, B.current.currentY = de);
          return;
        }
        if (le) {
          const P = A - le.startX;
          le.originalPositions.forEach((J, re) => {
            const de = J.$x + P;
            l.exec("drag-task", {
              id: re,
              left: de,
              width: J.$w,
              inProgress: !0
            });
          }), ee((J) => ({ ...J, dx: P }));
          return;
        }
        if (Q.current) {
          const { node: P, x: J, id: re } = Q.current, de = Q.current.dx = A - J, xe = Math.round(de / P.offsetWidth * 100);
          let Re = Q.current.progress + xe;
          Q.current.value = Re = Math.min(
            Math.max(0, Re),
            100
          ), l.exec("update-task", {
            id: re,
            task: { progress: Re },
            inProgress: !0
          });
        } else if (oe) {
          fe(null);
          const { mode: P, l: J, w: re, x: de, id: xe, start: Re, segment: Fe, index: je } = oe, qe = l.getTask(xe), Ue = A - de;
          if (!Re && Math.abs(Ue) < 20 || P === "start" && re - Ue < M || P === "end" && re + Ue < M || P === "move" && (Ue < 0 && J + Ue < 0 || Ue > 0 && J + re + Ue > ge) || oe.segment)
            return;
          const tt = { ...oe, dx: Ue };
          let nt, yt;
          if (P === "start" ? (nt = J + Ue, yt = re - Ue) : P === "end" ? (nt = J, yt = re + Ue) : P === "move" && (nt = J + Ue, yt = re), l.exec("drag-task", {
            id: xe,
            width: yt,
            left: nt,
            inProgress: !0,
            ...Fe && { segmentIndex: je }
          }), !tt.start && (P === "move" && qe.$x == J || P !== "move" && qe.$w == re)) {
            H.current = !0, Me();
            return;
          }
          tt.start = !0, he(tt);
        } else {
          const P = Ge(v);
          if (P) {
            const J = l.getTask(kt(P)), de = Ge(v, "data-segment") || P, xe = He(de, _, J);
            de.style.cursor = xe && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      l,
      e,
      oe,
      M,
      ge,
      He,
      fe,
      Me,
      ue,
      le,
      ke
    ]
  ), ze = I(
    (v) => {
      Ee(v, v);
    },
    [Ee]
  ), Be = I(
    (v) => {
      O ? (v.preventDefault(), Ee(v, v.touches[0])) : we.current && (clearTimeout(we.current), we.current = null);
    },
    [O, Ee]
  ), xt = I(() => {
    Me();
  }, [Me]), ft = I(() => {
    ae(null), we.current && (clearTimeout(we.current), we.current = null), Me();
  }, [Me]);
  K(() => (window.addEventListener("mouseup", xt), () => {
    window.removeEventListener("mouseup", xt);
  }), [xt]);
  const On = I(
    (v) => {
      if (!e) {
        const _ = bt(v.target);
        if (_ && !v.target.classList.contains("wx-link")) {
          const A = bt(v.target, "data-segment");
          l.exec("show-editor", {
            id: _,
            ...A !== null && { segmentIndex: A }
          });
        }
      }
    },
    [l, e]
  ), Nt = ["e2s", "s2s", "e2e", "s2e"], Mt = I((v, _) => Nt[(v ? 1 : 0) + (_ ? 0 : 2)], []), Et = I(
    (v, _) => {
      const A = T.id, U = T.start;
      return v === A ? !0 : !!u.find((Y) => Y.target == v && Y.source == A && Y.type === Mt(U, _));
    },
    [T, h, Mt]
  ), ln = I(() => {
    T && V(null);
  }, [T]), cn = I((v, _, A) => {
    if (!_.length || !v || A == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: v.toISOString(),
      taskCount: _.length,
      parent: A
    });
    const U = 864e5, Y = l.getHistory();
    Y?.startBatch();
    const P = new Date(v), J = P.getUTCDay(), re = J === 0 ? -6 : 1 - J;
    P.setUTCDate(P.getUTCDate() + re), P.setUTCHours(0, 0, 0, 0), _.forEach((de, xe) => {
      const Re = `task-${Date.now()}-${xe}`, Fe = xd(P, de._startCellOffset || 0, m), je = new Date(Fe.getTime() + (de._startDayOfWeek || 0) * U);
      je.setUTCHours(0, 0, 0, 0);
      const qe = new Date(je.getTime() + (de._durationDays || 7) * U);
      qe.setUTCHours(0, 0, 0, 0), console.log("[paste] task:", {
        text: de.text,
        original: { start: de.start?.toISOString?.(), end: de.end?.toISOString?.() },
        calculated: {
          targetWeekStart: P.toISOString(),
          weekOffset: Fe.toISOString(),
          newStart: je.toISOString(),
          newEnd: qe.toISOString()
        },
        clipboard: {
          _startCellOffset: de._startCellOffset,
          _startDayOfWeek: de._startDayOfWeek,
          _durationDays: de._durationDays
        },
        row: de.row
      }), l.exec("add-task", {
        task: {
          id: Re,
          text: de.text,
          start: je,
          end: qe,
          type: de.type || "task",
          parent: A,
          row: de.row
        },
        target: A,
        mode: "child",
        skipUndo: xe > 0
      });
    }), Y?.endBatch();
  }, [l, m]), Pn = I(
    (v) => {
      if (H.current) {
        H.current = !1;
        return;
      }
      if (ke && ke.currentX != null) {
        const A = Cs(ke.currentX, m);
        A && cn(A, ke.tasks, ke.parent), X(null);
        return;
      }
      const _ = bt(v.target);
      if (_) {
        const A = l.getTask(_), U = c.find((P) => P.id === _);
        console.log("[click] task:", A?.text, "id:", _), console.log("[click] api.getTask:", { start: A?.start, end: A?.end, duration: A?.duration }), console.log("[click] rendered:", { start: U?.start, end: U?.end, $w: U?.$w, $x: U?.$x });
        const Y = v.target.classList;
        if (Y.contains("wx-link")) {
          const P = Y.contains("wx-left");
          if (!T) {
            V({ id: _, start: P });
            return;
          }
          T.id !== _ && !Et(_, P) && l.exec("add-link", {
            link: {
              source: T.id,
              target: _,
              type: Mt(T.start, P)
            }
          });
        } else if (Y.contains("wx-delete-button-icon"))
          l.exec("delete-link", { id: ce.id }), Se(null);
        else {
          let P;
          const J = Ge(v, "data-segment");
          J && (P = J.dataset.segment * 1), l.exec("select-task", {
            id: _,
            toggle: v.ctrlKey || v.metaKey,
            range: v.shiftKey,
            segmentIndex: P
          });
        }
      }
      ln();
    },
    [
      l,
      T,
      h,
      ce,
      Et,
      Mt,
      ln,
      ke,
      m,
      cn
    ]
  ), dn = I((v) => ({
    left: `${v.$x}px`,
    top: `${v.$y}px`,
    width: `${v.$w}px`,
    height: `${v.$h}px`
  }), []), Wn = I((v) => ({
    left: `${v.$x_base}px`,
    top: `${v.$y_base}px`,
    width: `${v.$w_base}px`,
    height: `${v.$h_base}px`
  }), []), ht = I(
    (v) => {
      if (O || we.current)
        return v.preventDefault(), !1;
    },
    [O]
  ), It = $(
    () => f.map((v) => v.id),
    [f]
  ), Kt = I(
    (v) => {
      let _ = It.includes(v) ? v : "task";
      return ["task", "milestone", "summary"].includes(v) || (_ = `task ${_}`), _;
    },
    [It]
  ), Vt = I(
    (v) => {
      l.exec(v.action, v.data);
    },
    [l]
  ), gt = I(
    (v) => k && D.byId(v).$critical,
    [k, D]
  ), Gt = I(
    (v) => {
      if (S?.auto) {
        const _ = D.getSummaryId(v, !0), A = D.getSummaryId(T.id, !0);
        return T?.id && !(Array.isArray(_) ? _ : [_]).includes(
          T.id
        ) && !(Array.isArray(A) ? A : [A]).includes(v);
      }
      return T;
    },
    [S, D, T]
  ), un = I(() => {
    const v = l.getState()._selected;
    if (!v || !v.length) return;
    const _ = 864e5, A = v.map((re) => {
      const de = l.getTask(re.id);
      if (!de) return null;
      const xe = c.find((Bo) => Bo.id === re.id);
      if (!xe) return null;
      const { $x: Re, $y: Fe, $h: je, $w: qe, $skip: Ue, $level: tt, $index: nt, $y_base: yt, $x_base: fn, $w_base: zn, $h_base: nu, $skip_baseline: ru, $critical: su, $reorder: ou, ...Go } = xe, Rr = xe.end && xe.start ? Math.round((xe.end.getTime() - xe.start.getTime()) / _) : 0, Ar = xe.start ? (xe.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: de.id,
        text: de.text,
        start: xe.start?.toISOString?.(),
        end: xe.end?.toISOString?.(),
        durationDays: Rr,
        startDayOfWeek: Ar,
        $w: qe,
        $h: je,
        row: xe.row,
        parent: xe.parent
      }), { ...Go, _durationDays: Rr, _startDayOfWeek: Ar, _originalWidth: qe, _originalHeight: je };
    }).filter(Boolean);
    if (!A.length) return;
    const Y = A[0].parent, P = A.filter((re) => re.parent === Y);
    if (P.length === 0) return;
    const J = P.reduce((re, de) => de.start && (!re || de.start < re) ? de.start : re, null);
    jt = P.map((re) => ({
      ...re,
      _startCellOffset: wd(re.start, J, m)
    })), $s = Y, qn = J, console.log("[copy] clipboard stored:", {
      taskCount: jt.length,
      baseDate: J?.toISOString?.(),
      parent: Y,
      tasks: jt.map((re) => ({
        id: re.id,
        text: re.text,
        _startCellOffset: re._startCellOffset,
        _startDayOfWeek: re._startDayOfWeek,
        _durationDays: re._durationDays
      }))
    });
  }, [l, m]);
  K(() => i ? l.intercept("hotkey", (_) => {
    if (_.key === "ctrl+c" || _.key === "meta+c")
      return un(), !1;
    if (_.key === "ctrl+v" || _.key === "meta+v")
      return !jt.length || !qn || X({
        tasks: jt,
        baseDate: qn,
        parent: $s,
        currentX: ye.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [i, l, un]), K(() => {
    if (!ke) return;
    const v = (_) => {
      _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), X(null));
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [ke]);
  const R = $(() => {
    if (!ue) return null;
    const v = Math.min(ue.startX, ue.currentX), _ = Math.min(ue.startY, ue.currentY), A = Math.abs(ue.currentX - ue.startX), U = Math.abs(ue.currentY - ue.startY);
    return {
      left: `${v}px`,
      top: `${_}px`,
      width: `${A}px`,
      height: `${U}px`
    };
  }, [ue]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${N.length ? N[0].$h : 0}px` },
      ref: $e,
      onContextMenu: ht,
      onMouseDown: te,
      onMouseMove: ze,
      onTouchStart: ne,
      onTouchMove: Be,
      onTouchEnd: ft,
      onClick: Pn,
      onDoubleClick: On,
      onDragStart: (v) => (v.preventDefault(), !1),
      children: [
        /* @__PURE__ */ p(
          pd,
          {
            onSelectLink: fe,
            selectedLink: ce,
            readonly: e
          }
        ),
        N.map((v) => {
          if (v.$skip && v.$skip_baseline) return null;
          const _ = ve.has(v.id), A = `wx-bar wx-${Kt(v.type)}` + (O && oe && v.id === oe.id ? " wx-touch" : "") + (T && T.id === v.id ? " wx-selected" : "") + (Pe.has(v.id) ? " wx-selected" : "") + (gt(v.id) ? " wx-critical" : "") + (v.$reorder ? " wx-reorder-task" : "") + (C && v.segments ? " wx-split" : "") + (_ ? " wx-collision" : ""), U = "wx-link wx-left" + (T ? " wx-visible" : "") + (!T || !Et(v.id, !0) && Gt(v.id) ? " wx-target" : "") + (T && T.id === v.id && T.start ? " wx-selected" : "") + (gt(v.id) ? " wx-critical" : ""), Y = "wx-link wx-right" + (T ? " wx-visible" : "") + (!T || !Et(v.id, !1) && Gt(v.id) ? " wx-target" : "") + (T && T.id === v.id && !T.start ? " wx-selected" : "") + (gt(v.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Z(Ns, { children: [
            !v.$skip && /* @__PURE__ */ Z(
              "div",
              {
                className: "wx-GKbcLEGA " + A,
                style: dn(v),
                "data-tooltip-id": v.id,
                "data-id": v.id,
                tabIndex: be === v.id ? 0 : -1,
                children: [
                  e ? null : v.id === ce?.target && ce?.type[2] === "s" ? /* @__PURE__ */ p(
                    ct,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + U, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  v.type !== "milestone" ? /* @__PURE__ */ Z(Ae, { children: [
                    v.progress && !(C && v.segments) ? /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${v.progress}%` }
                      }
                    ) }) : null,
                    !e && !(C && v.segments) ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${v.progress}% - 10px)` },
                        children: v.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: Vt }) : C && v.segments ? /* @__PURE__ */ p(md, { task: v, type: Kt(v.type) }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.text || "" }),
                    _ && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Z(Ae, { children: [
                    /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: Vt }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: v.text })
                  ] }),
                  e ? null : v.id === ce?.target && ce?.type[2] === "e" ? /* @__PURE__ */ p(
                    ct,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + Y, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            x && !v.$skip_baseline ? /* @__PURE__ */ p(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (v.type === "milestone" ? " wx-milestone" : ""),
                style: Wn(v)
              }
            ) : null
          ] }, v.id);
        }),
        ue && R && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: R }),
        ke && ke.currentX != null && ke.tasks.map((v, _) => {
          const U = (Math.floor(ke.currentX / M) + (v._startCellOffset || 0)) * M, Y = v._originalWidth || M, P = v._originalHeight || z, J = Te.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: U, top: J, width: Y, height: P },
              children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.text })
            },
            `preview-${_}`
          );
        })
      ]
    }
  );
}
function kd(t) {
  const { highlightTime: e } = t, n = _e(wt), r = se(n, "_scales");
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
  const e = F(null), n = F(0), r = F(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, K(() => {
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
  } = t, m = _e(wt), [f, x] = Qt(m, "_selected"), w = se(m, "scrollTop"), y = se(m, "cellHeight"), b = se(m, "cellWidth"), k = se(m, "_scales"), D = se(m, "_markers"), S = se(m, "_scrollTask"), C = se(m, "zoom"), E = se(m, "_tasks"), [z, N] = G(), M = F(null), W = F(0), H = F(!1), T = 1 + (k?.rows?.length || 0), V = $(() => {
    if (!a || !l || !E?.length) return null;
    const q = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), le = [];
    return E.forEach((ee) => {
      const ie = l.taskRows.get(ee.id) ?? ee.id;
      B.has(ie) || (B.set(ie, le.length), le.push(ie));
    }), E.forEach((ee) => {
      const ie = l.taskRows.get(ee.id) ?? ee.id, Ie = B.get(ie) ?? 0;
      q.set(ee.id, Ie * y);
    }), q;
  }, [E, a, l, y]), oe = $(() => {
    const q = [];
    return f && f.length && y && f.forEach((B) => {
      const le = V?.get(B.id) ?? B.$y;
      q.push({ height: `${y}px`, top: `${le - 3}px` });
    }), q;
  }, [x, y, V]), he = $(
    () => Math.max(z || 0, r),
    [z, r]
  );
  K(() => {
    const q = M.current;
    q && typeof w == "number" && (q.scrollTop = w);
  }, [w]);
  const Q = () => {
    ce();
  };
  function ce(q) {
    const B = M.current;
    if (!B) return;
    const le = {};
    le.left = B.scrollLeft, m.exec("scroll-chart", le);
  }
  function Se() {
    const q = M.current, le = Math.ceil((z || 0) / (y || 1)) + 1, ee = Math.floor((q && q.scrollTop || 0) / (y || 1)), ie = Math.max(0, ee - T), Ie = ee + le + T, ke = ie * (y || 0);
    m.exec("render-data", {
      start: ie,
      end: Ie,
      from: ke
    });
  }
  K(() => {
    Se();
  }, [z, w]);
  const O = I(
    (q) => {
      if (!q) return;
      const { id: B, mode: le } = q;
      if (le.toString().indexOf("x") < 0) return;
      const ee = M.current;
      if (!ee) return;
      const { clientWidth: ie } = ee, Ie = m.getTask(B);
      if (Ie.$x + Ie.$w < ee.scrollLeft)
        m.exec("scroll-chart", { left: Ie.$x - (b || 0) }), ee.scrollLeft = Ie.$x - (b || 0);
      else if (Ie.$x >= ie + ee.scrollLeft) {
        const ke = ie < Ie.$w ? b || 0 : Ie.$w;
        m.exec("scroll-chart", { left: Ie.$x - ie + ke }), ee.scrollLeft = Ie.$x - ie + ke;
      }
    },
    [m, b]
  );
  K(() => {
    O(S);
  }, [S]);
  function ae(q) {
    if (C && (q.ctrlKey || q.metaKey)) {
      q.preventDefault();
      const B = M.current, le = q.clientX - (B ? B.getBoundingClientRect().left : 0);
      if (W.current += q.deltaY, Math.abs(W.current) >= 150) {
        const ie = -Math.sign(W.current);
        W.current = 0, m.exec("zoom-scale", {
          dir: ie,
          offset: le
        });
      }
    }
  }
  const we = I((q) => {
    const B = i(q.date, q.unit);
    return B ? {
      css: B,
      width: q.width
    } : null;
  }, [i]), ge = $(() => {
    if (!k || !i || !["hour", "day", "week"].includes(k.minUnit)) return null;
    let B = 0;
    return k.rows[k.rows.length - 1].cells.map((le) => {
      const ee = we(le), ie = B;
      return B += le.width, ee ? { ...ee, left: ie } : null;
    });
  }, [k, i, we]), Ce = I(
    (q) => {
      q.eventSource = "chart", m.exec("hotkey", q);
    },
    [m]
  );
  K(() => {
    const q = M.current;
    if (!q) return;
    const B = () => N(q.clientHeight);
    B();
    const le = new ResizeObserver(() => B());
    return le.observe(q), () => {
      le.disconnect();
    };
  }, [M.current]);
  const ue = F(null);
  return K(() => {
    const q = M.current;
    if (q && !ue.current)
      return ue.current = To(q, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (B) => Ce(B)
      }), () => {
        ue.current?.destroy(), ue.current = null;
      };
  }, []), K(() => {
    const q = M.current;
    if (!q) return;
    const B = ae;
    return q.addEventListener("wheel", B), () => {
      q.removeEventListener("wheel", B);
    };
  }, [ae]), K(() => {
    if (!u || H.current || !k || !M.current || !z) return;
    const q = M.current, { clientWidth: B } = q, le = /* @__PURE__ */ new Date(), ee = k.rows[k.rows.length - 1]?.cells;
    if (!ee) return;
    let ie = -1, Ie = 0;
    const ke = [];
    for (let me = 0; me < ee.length; me++) {
      const ye = ee[me];
      ke.push({ left: Ie, width: ye.width });
      const $e = ye.date;
      if (ye.unit === "week") {
        const j = new Date($e);
        j.setUTCDate(j.getUTCDate() + 7), le >= $e && le < j && (ie = me);
      } else ye.unit === "day" && le.getUTCFullYear() === $e.getUTCFullYear() && le.getUTCMonth() === $e.getUTCMonth() && le.getUTCDate() === $e.getUTCDate() && (ie = me);
      Ie += ye.width;
    }
    let X = ie;
    if (ie > 0 && (X = ie - 1), X >= 0 && ke[X]) {
      const me = ke[X], ye = Math.max(0, me.left);
      q.scrollLeft = ye, m.exec("scroll-chart", { left: ye }), H.current = !0;
    }
  }, [u, k, z, m]), Sd("chart"), /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: M,
      onScroll: Q,
      children: [
        /* @__PURE__ */ p(kd, { highlightTime: i, scales: k }),
        D && D.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${he}px` },
            children: D.map((q, B) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${q.css || ""}`,
                style: { left: `${q.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: q.text })
              },
              B
            ))
          }
        ) : null,
        /* @__PURE__ */ Z(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${he}px` },
            children: [
              ge ? /* @__PURE__ */ p(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: ge.map(
                    (q, B) => q ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + q.css,
                        style: {
                          width: `${q.width}px`,
                          left: `${q.left}px`
                        }
                      },
                      B
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(gd, { borders: o }),
              f && f.length ? f.map(
                (q, B) => q.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": q.id,
                    style: oe[B]
                  },
                  q.id
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
  } = t, [d, u] = We(t.value ?? 0), [h, g] = We(t.display ?? "all");
  function m(Q) {
    let ce = 0;
    e == "center" ? ce = n / 2 : e == "before" && (ce = n);
    const Se = {
      size: [n + "px", "auto"],
      p: [Q - ce + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let O in Se) Se[O] = Se[O].reverse();
    return Se;
  }
  const [f, x] = G(!1), [w, y] = G(null), b = F(0), k = F(), D = F(), S = F(h);
  K(() => {
    S.current = h;
  }, [h]), K(() => {
    w === null && d > 0 && y(d);
  }, [w, d]);
  function C(Q) {
    return r == "x" ? Q.clientX : Q.clientY;
  }
  const E = I(
    (Q) => {
      const ce = k.current + C(Q) - b.current;
      u(ce);
      let Se;
      ce <= l ? Se = "chart" : a - ce <= c ? Se = "grid" : Se = "all", S.current !== Se && (g(Se), S.current = Se), D.current && clearTimeout(D.current), D.current = setTimeout(() => s && s(ce), 100);
    },
    [a, l, c, s]
  ), z = I(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", x(!1), window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", z);
  }, [E]), N = $(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), M = I(
    (Q) => {
      !i && (h === "grid" || h === "chart") || (b.current = C(Q), k.current = d, x(!0), document.body.style.cursor = N, document.body.style.userSelect = "none", window.addEventListener("mousemove", E), window.addEventListener("mouseup", z));
    },
    [N, E, z, d, i, h]
  );
  function W() {
    g("all"), w !== null && (u(w), s && s(w));
  }
  function H(Q) {
    if (i) {
      const ce = h === "chart" ? "grid" : "chart";
      g(ce), o(ce);
    } else if (h === "grid" || h === "chart")
      W(), o("all");
    else {
      const ce = Q === "left" ? "chart" : "grid";
      g(ce), o(ce);
    }
  }
  function T() {
    H("left");
  }
  function V() {
    H("right");
  }
  const oe = $(() => m(d), [d, e, n, r]), he = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: M,
      style: { width: oe.size[0], height: oe.size[1], cursor: N },
      children: [
        /* @__PURE__ */ Z("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: T
            }
          ) }),
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: V
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const _d = 650;
function Ko(t) {
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
  } = t, g = _e(wt), m = se(g, "_tasks"), f = se(g, "_scales"), x = se(g, "cellHeight"), w = se(g, "columns"), y = se(g, "_scrollTask"), b = se(g, "undo"), k = $(() => {
    if (!i) return a;
    const X = /* @__PURE__ */ new Map(), me = /* @__PURE__ */ new Map();
    return m.forEach((ye) => {
      const $e = ye.row ?? ye.id;
      me.set(ye.id, $e), X.has($e) || X.set($e, []), X.get($e).push(ye.id);
    }), { rowMap: X, taskRows: me };
  }, [m, i, a]), [D, S] = G(!1);
  let [C, E] = G(0);
  const [z, N] = G(0), [M, W] = G(0), [H, T] = G(void 0), [V, oe] = G("all"), he = F(null), Q = I(
    (X) => {
      S((me) => (X !== me && (X ? (he.current = V, V === "all" && oe("grid")) : (!he.current || he.current === "all") && oe("all")), X));
    },
    [V]
  );
  K(() => {
    const X = Ko(Q);
    return X.observe(), () => {
      X.disconnect();
    };
  }, [Q]);
  const ce = $(() => {
    let X;
    return w.every((me) => me.width && !me.flexgrow) ? X = w.reduce((me, ye) => me + parseInt(ye.width), 0) : D && V === "chart" ? X = parseInt(w.find((me) => me.id === "action")?.width) || 50 : X = 440, C = X, X;
  }, [w, D, V]);
  K(() => {
    E(ce);
  }, [ce]);
  const Se = $(
    () => (z ?? 0) - (H ?? 0),
    [z, H]
  ), O = $(() => f.width, [f]), ae = $(() => {
    if (!i || !k)
      return m.length * x;
    const X = /* @__PURE__ */ new Set();
    return m.forEach((me) => {
      const ye = k.taskRows.get(me.id) ?? me.id;
      X.add(ye);
    }), X.size * x;
  }, [m, x, i, k]), we = $(
    () => f.height + ae + Se,
    [f, ae, Se]
  ), ge = $(
    () => C + O,
    [C, O]
  ), Ce = F(null), ue = I(() => {
    Promise.resolve().then(() => {
      if ((z ?? 0) > (ge ?? 0)) {
        const X = (z ?? 0) - C;
        g.exec("expand-scale", { minWidth: X });
      }
    });
  }, [z, ge, C, g]);
  K(() => {
    let X;
    return Ce.current && (X = new ResizeObserver(ue), X.observe(Ce.current)), () => {
      X && X.disconnect();
    };
  }, [Ce.current, ue]), K(() => {
    ue();
  }, [O]);
  const q = F(null), B = F(null), le = I(() => {
    const X = q.current;
    X && g.exec("scroll-chart", {
      top: X.scrollTop
    });
  }, [g]), ee = F({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  K(() => {
    ee.current = {
      rTasks: m,
      rScales: f,
      rCellHeight: x,
      scrollSize: Se,
      ganttDiv: q.current,
      ganttHeight: M ?? 0
    };
  }, [m, f, x, Se, M]);
  const ie = I(
    (X) => {
      if (!X) return;
      const {
        rTasks: me,
        rScales: ye,
        rCellHeight: $e,
        scrollSize: j,
        ganttDiv: be,
        ganttHeight: Ne
      } = ee.current;
      if (!be) return;
      const { id: pe } = X, He = me.findIndex((ve) => ve.id === pe);
      if (He > -1) {
        const ve = Ne - ye.height, Oe = He * $e, Te = be.scrollTop;
        let Le = null;
        Oe < Te ? Le = Oe : Oe + $e > Te + ve && (Le = Oe - ve + $e + j), Le !== null && (g.exec("scroll-chart", { top: Math.max(Le, 0) }), q.current.scrollTop = Math.max(Le, 0));
      }
    },
    [g]
  );
  K(() => {
    ie(y);
  }, [y]), K(() => {
    const X = q.current, me = B.current;
    if (!X || !me) return;
    const ye = () => {
      Qo(() => {
        W(X.offsetHeight), N(X.offsetWidth), T(me.offsetWidth);
      });
    }, $e = new ResizeObserver(ye);
    return $e.observe(X), () => $e.disconnect();
  }, [q.current]);
  const Ie = F(null), ke = F(null);
  return K(() => {
    ke.current && (ke.current.destroy(), ke.current = null);
    const X = Ie.current;
    if (X)
      return ke.current = To(X, {
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
        exec: (me) => {
          if (me.isInput) return;
          const ye = me.key;
          if (ye === "ctrl+z" || ye === "meta+z") {
            g.exec("undo", {});
            return;
          }
          if (ye === "ctrl+y" || ye === "meta+shift+z") {
            g.exec("redo", {});
            return;
          }
          g.exec("hotkey", me);
        }
      }), () => {
        ke.current?.destroy(), ke.current = null;
      };
  }, [b]), /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-gantt", ref: q, onScroll: le, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: we, width: "100%" },
      ref: B,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: M,
            width: H
          },
          children: /* @__PURE__ */ Z("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Ie, children: [
            w.length ? /* @__PURE__ */ Z(Ae, { children: [
              /* @__PURE__ */ p(
                hd,
                {
                  display: V,
                  compactMode: D,
                  columnWidth: ce,
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
                  display: V,
                  compactMode: D,
                  containerWidth: z,
                  onMove: (X) => E(X),
                  onDisplayChange: (X) => oe(X)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: Ce, children: /* @__PURE__ */ p(
              $d,
              {
                readonly: n,
                fullWidth: O,
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
function Dd(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function Nd(t, e) {
  return typeof t == "function" ? t : lt(t, e);
}
function Vo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: Nd(n, e)
  }));
}
function Md(t, e) {
  const n = Dd(e);
  for (let r in n)
    n[r] = lt(n[r], t);
  return n;
}
function Ed(t, e) {
  if (!t || !t.length) return t;
  const n = lt("%d-%m-%Y", e);
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
      scales: Vo(n.scales, e)
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
  scaleHeight: x = 36,
  readonly: w = !1,
  cellBorders: y = "full",
  zoom: b = !1,
  baselines: k = !1,
  highlightTime: D = null,
  init: S = null,
  autoScale: C = !0,
  unscheduledTasks: E = !1,
  criticalPath: z = null,
  schedule: N = { type: "forward" },
  projectStart: M = null,
  projectEnd: W = null,
  calendar: H = null,
  undo: T = !1,
  splitTasks: V = !1,
  multiTaskRows: oe = !1,
  marqueeSelect: he = !1,
  copyPaste: Q = !1,
  currentWeekHighlight: ce = !1,
  currentWeekColor: Se = null,
  scrollToCurrentWeek: O = !1,
  allowTaskIntersection: ae = !0,
  ...we
}, ge) {
  const Ce = F();
  Ce.current = we;
  const ue = $(() => new ml(As), []), q = $(() => ({ ...vr, ...Rn }), []), B = _e(Ze.i18n), le = $(() => B ? B.extend(q, !0) : Dt(q), [B, q]), ee = $(() => le.getRaw().calendar, [le]), ie = $(() => {
    let ve = {
      zoom: Id(b, ee),
      scales: Vo(l, ee),
      columns: Ed(c, ee),
      links: wo(a),
      cellWidth: m
    };
    return ve.zoom && (ve = {
      ...ve,
      ...nl(
        ve.zoom,
        Md(ee, le.getGroup("gantt")),
        ve.scales,
        m
      )
    }), ve;
  }, [b, l, c, a, m, ee, le]), Ie = F(null);
  Ie.current !== s && (lr(s, { durationUnit: g, calendar: H }), Ie.current = s), K(() => {
    lr(s, { durationUnit: g, calendar: H });
  }, [s, g, H, V]);
  const ke = $(() => {
    if (!oe) return null;
    const ve = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Map(), Te = (Le) => {
      Le.forEach((Pe) => {
        const Ye = Pe.row ?? Pe.id;
        Oe.set(Pe.id, Ye), ve.has(Ye) || ve.set(Ye, []), ve.get(Ye).push(Pe.id), Pe.data && Pe.data.length > 0 && Te(Pe.data);
      });
    };
    return Te(s), { rowMap: ve, taskRows: Oe };
  }, [s, oe]), X = $(() => ue.in, [ue]), me = F(null);
  me.current === null && (me.current = new Us((ve, Oe) => {
    const Te = "on" + Rd(ve);
    Ce.current && Ce.current[Te] && Ce.current[Te](Oe);
  }), X.setNext(me.current));
  const [ye, $e] = G(null), j = F(null);
  j.current = ye;
  const be = $(
    () => ({
      getState: ue.getState.bind(ue),
      getReactiveState: ue.getReactive.bind(ue),
      getStores: () => ({ data: ue }),
      exec: X.exec,
      setNext: (ve) => (me.current = me.current.setNext(ve), me.current),
      intercept: X.intercept.bind(X),
      on: X.on.bind(X),
      detach: X.detach.bind(X),
      getTask: ue.getTask.bind(ue),
      serialize: ue.serialize.bind(ue),
      getTable: (ve) => ve ? new Promise((Oe) => setTimeout(() => Oe(j.current), 1)) : j.current,
      getHistory: () => ue.getHistory()
    }),
    [ue, X]
  );
  Tt(
    ge,
    () => ({
      ...be
    }),
    [be]
  );
  const Ne = F(0);
  K(() => {
    Ne.current ? ue.init({
      tasks: s,
      links: ie.links,
      start: d,
      columns: ie.columns,
      end: u,
      lengthUnit: h,
      cellWidth: ie.cellWidth,
      cellHeight: f,
      scaleHeight: x,
      scales: ie.scales,
      taskTypes: r,
      zoom: ie.zoom,
      selected: o,
      activeTask: i,
      baselines: k,
      autoScale: C,
      unscheduledTasks: E,
      markers: n,
      durationUnit: g,
      criticalPath: z,
      schedule: N,
      projectStart: M,
      projectEnd: W,
      calendar: H,
      undo: T,
      _weekStart: ee.weekStart,
      splitTasks: V
    }) : S && S(be), Ne.current++;
  }, [
    be,
    S,
    s,
    ie,
    d,
    u,
    h,
    f,
    x,
    r,
    o,
    i,
    k,
    C,
    E,
    n,
    g,
    z,
    N,
    M,
    W,
    H,
    T,
    ee,
    V,
    ue
  ]), Ne.current === 0 && ue.init({
    tasks: s,
    links: ie.links,
    start: d,
    columns: ie.columns,
    end: u,
    lengthUnit: h,
    cellWidth: ie.cellWidth,
    cellHeight: f,
    scaleHeight: x,
    scales: ie.scales,
    taskTypes: r,
    zoom: ie.zoom,
    selected: o,
    activeTask: i,
    baselines: k,
    autoScale: C,
    unscheduledTasks: E,
    markers: n,
    durationUnit: g,
    criticalPath: z,
    schedule: N,
    projectStart: M,
    projectEnd: W,
    calendar: H,
    undo: T,
    _weekStart: ee.weekStart,
    splitTasks: V
  });
  const pe = $(() => {
    const ve = /* @__PURE__ */ new Date(), Oe = ee?.weekStart ?? 0, Te = new Date(Date.UTC(ve.getUTCFullYear(), ve.getUTCMonth(), ve.getUTCDate())), Pe = (Te.getUTCDay() - Oe + 7) % 7;
    Te.setUTCDate(Te.getUTCDate() - Pe), Te.setUTCHours(0, 0, 0, 0);
    const Ye = new Date(Te);
    return Ye.setUTCDate(Ye.getUTCDate() + 7), (L) => L >= Te && L < Ye;
  }, [ee]), He = $(() => (ve, Oe) => {
    let Te = [];
    if (H)
      Oe == "day" && !H.getDayHours(ve) && Te.push("wx-weekend"), Oe == "hour" && !H.getDayHours(ve) && Te.push("wx-weekend");
    else if (D) {
      const Le = D(ve, Oe);
      Le && Te.push(Le);
    }
    return ce && (Oe === "week" || Oe === "day") && pe(ve) && Te.push("wx-current-week"), Te.join(" ");
  }, [H, D, ce, pe]);
  return /* @__PURE__ */ p(Ze.i18n.Provider, { value: le, children: /* @__PURE__ */ p(wt.Provider, { value: be, children: /* @__PURE__ */ p(
    Td,
    {
      taskTemplate: e,
      readonly: w,
      cellBorders: y,
      highlightTime: He,
      onTableAPIChange: $e,
      multiTaskRows: oe,
      rowMapping: ke,
      marqueeSelect: he,
      copyPaste: Q,
      scrollToCurrentWeek: O,
      currentWeekColor: Se,
      allowTaskIntersection: ae
    }
  ) }) });
});
function Ld({ api: t = null, items: e = [] }) {
  const n = _e(Ze.i18n), r = $(() => n || Dt(Rn), [n]), s = $(() => r.getGroup("gantt"), [r]), o = at(t, "_selected"), i = at(t, "undo"), a = at(t, "history"), l = at(t, "splitTasks"), c = ["undo", "redo"], d = $(() => {
    const h = dr();
    return (e.length ? e : dr()).map((m) => {
      let f = { ...m, disabled: !1 };
      return f.handler = Nr(h, f.id) ? (x) => At(t, x.id, null, s) : f.handler, f.text && (f.text = s(f.text)), f.menuText && (f.menuText = s(f.menuText)), f;
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
  return n ? /* @__PURE__ */ p(fr, { items: u }) : /* @__PURE__ */ p(Ze.i18n.Provider, { value: r, children: /* @__PURE__ */ p(fr, { items: u }) });
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
  const d = F(null), u = F(null), h = _e(Ze.i18n), g = $(() => h || Dt({ ...Rn, ...vr }), [h]), m = $(() => g.getGroup("gantt"), [g]), f = at(n, "taskTypes"), x = at(n, "selected"), w = at(n, "_selected"), y = at(n, "splitTasks"), b = $(() => cr(), []);
  K(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function k(H) {
    return H.map((T) => (T = { ...T }, T.text && (T.text = m(T.text)), T.subtext && (T.subtext = m(T.subtext)), T.data && (T.data = k(T.data)), T));
  }
  function D() {
    const H = e.length ? e : cr(), T = H.find((V) => V.id === "convert-task");
    return T && (T.data = [], (f || []).forEach((V) => {
      T.data.push(T.dataFactory(V));
    })), k(H);
  }
  const S = $(() => D(), [n, e, f, y, m]), C = $(
    () => w && w.length ? w : [],
    [w]
  ), E = I(
    (H, T) => {
      let V = H ? n?.getTask(H) : null;
      if (r) {
        const oe = r(H, T);
        V = oe === !0 ? V : oe;
      }
      if (V) {
        const oe = bt(T.target, "data-segment");
        oe !== null ? u.current = { id: V.id, segmentIndex: oe } : u.current = V.id, (!Array.isArray(x) || !x.includes(V.id)) && n && n.exec && n.exec("select-task", { id: V.id });
      }
      return V;
    },
    [n, r, x]
  ), z = I(
    (H) => {
      const T = H.action;
      T && (Nr(b, T.id) && At(n, T.id, u.current, m), a && a(H));
    },
    [n, m, a, b]
  ), N = I(
    (H, T) => {
      const V = C.length ? C : T ? [T] : [];
      let oe = s ? V.every((he) => s(H, he)) : !0;
      if (oe && (H.isHidden && (oe = !V.some(
        (he) => H.isHidden(he, n.getState(), u.current)
      )), H.isDisabled)) {
        const he = V.some(
          (Q) => H.isDisabled(Q, n.getState(), u.current)
        );
        H.disabled = he;
      }
      return oe;
    },
    [s, C, n]
  );
  Tt(c, () => ({
    show: (H, T) => {
      d.current && d.current.show && d.current.show(H, T);
    }
  }));
  const M = I((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), W = /* @__PURE__ */ Z(Ae, { children: [
    /* @__PURE__ */ p(
      Oo,
      {
        filter: N,
        options: S,
        dataKey: "id",
        resolver: E,
        onClick: z,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: M, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && Ze.i18n?.Provider) {
    const H = Ze.i18n.Provider;
    return /* @__PURE__ */ p(H, { value: g, children: W });
  }
  return W;
}), gr = {};
function _s(t) {
  return typeof t < "u" ? gr[t] || t : gr.text;
}
function st(t, e) {
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
  } = t, c = F(null);
  K(() => {
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
  const d = _e(Ze.i18n), u = $(() => d.getGroup("editor"), [d]), h = $(
    () => e.config[0].comp === "readonly" && e.config.every((g) => !Object.keys(n).includes(g.key)),
    [e, n]
  );
  return /* @__PURE__ */ Z("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    a,
    h ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((g) => {
      if (!g.hidden) {
        const { key: m, onChange: f, ...x } = g;
        if (g.comp === "readonly" || g.comp === "section") {
          const w = _s(g.comp);
          return /* @__PURE__ */ p(
            w,
            {
              fieldKey: m,
              label: g.label,
              value: n[m],
              ...x,
              onClick: i
            },
            m
          );
        } else {
          const w = _s(g.comp);
          return /* @__PURE__ */ Z("div", { children: [
            /* @__PURE__ */ p(
              Zt,
              {
                label: g.labelTemplate ? g.labelTemplate(n[m]) : g.label ?? "",
                required: g.required,
                children: /* @__PURE__ */ p(
                  w,
                  {
                    fieldKey: m,
                    ...x,
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
  onValidation: x,
  hotkeys: w
}) {
  const y = _e(Ze.i18n).getGroup("editor"), [b, k] = We(t), [D, S] = G(null), C = $(() => {
    const O = Fd(e);
    D && O.config.forEach((ge) => {
      ge.comp === "section" && ge.key === D && (ge.sectionMode === "accordion" ? ge.activeSection || (O.config.forEach((Ce) => {
        Ce.comp === "section" && Ce.key !== ge.key && (Ce.activeSection = !1);
      }), ge.activeSection = !0) : ge.activeSection = !ge.activeSection);
    });
    let ae = /* @__PURE__ */ new Set(), we = null;
    return O.config.forEach((ge) => {
      ge.sectionMode === "exclusive" && ge.activeSection && (we = ge.key), ge.activeSection && ae.add(ge.key);
    }), O.config.forEach((ge) => {
      ge.hidden = ge.hidden || r && r !== ge.batch || we && ge.key != we && ge.section !== we || ge.section && !ae.has(ge.section);
    }), i ? {
      ...O,
      config: O.config.map((ge) => ({ ...ge, comp: "readonly" })),
      diff: () => []
    } : O;
  }, [e, D, r, i]), [E, z] = G({}), [N, M] = G({}), W = b;
  K(() => {
    b !== void 0 && (z($n(b)), M($n(b)), W.errors && (W.errors = oe()));
  }, [b]);
  const [H, T] = G([]);
  K(() => {
    b && T([]);
  }, [b]);
  function V(O) {
    return [...new Set(O)];
  }
  function oe(O) {
    const ae = C.validateValues(E, O, y);
    return An(ae, W.errors) || x && x({ errors: ae, values: E }), ae;
  }
  function he(O, ae) {
    if (s && !W.errors) {
      const we = C.setValues(b, ae ?? N, O);
      k(we), m && m({ changes: O, values: we });
    } else
      T(O);
  }
  function Q({ value: O, key: ae, input: we }) {
    let ge = { ...N || {}, [ae]: O };
    const Ce = {
      key: ae,
      value: O,
      update: ge
    };
    if (we && (Ce.input = we), g && g(Ce), !b) return;
    ge = Ce.update, M(ge);
    const ue = C.diff(b, ge), q = C.setValues(
      { ...E || {} },
      ge,
      V([...ue, ae])
    );
    if (z(q), ue.length) {
      const B = s ? [] : V([...ue, ...Object.keys(W.errors ?? {}), ae]);
      W.errors = oe(B), he(ue, ge);
    } else {
      const B = Object.keys(W.errors ?? {});
      B.length && (W.errors = oe(B)), T([]);
    }
  }
  function ce() {
    if (H.length && (s || (W.errors = oe()), !W.errors)) {
      m && m({
        changes: H,
        values: E
      });
      const O = C.setValues(b, N, H);
      k(O), T([]), k({ ...E });
    }
  }
  function Se({ item: O }) {
    O.id === "save" ? ce() : O.id === "toggle-section" && S(O.key), f && f({ item: O, values: E, changes: H });
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
      data: N,
      editors: C,
      focus: o,
      hotkeys: w,
      errors: W.errors,
      onClick: Se,
      onKeyDown: Se,
      onChange: Q,
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
  const o = I(
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
const qt = () => ({ comp: "spacer" }), Qn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Jn = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), Ds = () => ({
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
    hotkeys: x
  } = t, w = _e(Ze.i18n), y = $(() => w.getGroup("editor"), [w]), b = $(
    () => o === !0 && i === !0,
    [o, i]
  ), k = $(() => {
    let N = o && o.items ? o.items.map((M) => ({ ...M })) : [];
    return b && (d ? N = [qt(), Ds()] : (u ? N = [qt(), Ds()] : l !== "modal" && (N = [qt(), Qn(y), Jn(y)]), a === "columns" && !N.length && (N = [qt(), Jn(y), Qn(y)]))), N;
  }, [o, b, d, u, l, a, y]), D = $(() => {
    let N = i && i.items ? i.items.map((M) => ({ ...M })) : [];
    return b && (d || (l === "modal" && !u && (N = [qt(), Jn(y), Qn(y)]), a === "columns" && k.length && (N = []))), N;
  }, [i, b, d, l, u, a, k, y]), S = $(() => [...k, ...D], [k, D]), C = F(null), E = F(null);
  E.current = (N, ...M) => {
    const W = S.findIndex((V) => M.includes(V.id));
    if (W === -1) return !1;
    const H = N.target, T = S[W];
    N.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || N.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (N.preventDefault(), m && m({ item: T }));
  };
  const z = $(() => x === !1 ? {} : {
    "ctrl+s": (N) => E.current(N, "save"),
    escape: (N) => E.current(N, "cancel", "close"),
    "ctrl+d": (N) => E.current(N, "delete"),
    ...x || {}
  }, [x]);
  return hi(z, C), /* @__PURE__ */ Z("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: C, children: [
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
              items: D,
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
function Kd(t) {
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
function Vd(t) {
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
  } = t, m = Object.keys(g).reduce((f, x) => {
    if (/^on[a-z]/.test(x)) {
      const w = "on" + x.charAt(2).toUpperCase() + x.slice(3);
      w in g ? f[x] = g[x] : f[w] = g[x];
    } else
      f[x] = g[x];
    return f;
  }, {});
  return /* @__PURE__ */ p(In, { words: Pd, optional: !0, children: /* @__PURE__ */ p(
    Ud,
    {
      view: Kd,
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
  const r = _e(Ze.i18n).getGroup("editor"), s = $(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(Zt, { label: n, children: s }) : null;
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
st("text", on);
st("textarea", vi);
st("checkbox", ki);
st("readonly", Gd);
st("section", Bd);
pr(Je);
function jd({ api: t, autoSave: e, onLinksChange: n }) {
  const s = _e(Ze.i18n).getGroup("gantt"), o = se(t, "activeTask"), i = se(t, "_activeTask"), a = se(t, "_links"), l = se(t, "schedule"), c = se(t, "unscheduledTasks"), [d, u] = G();
  function h() {
    if (o) {
      const x = a.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), w = a.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: x },
        { title: s("Successors"), data: w }
      ];
    }
  }
  K(() => {
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
  function m(x) {
    e ? t.exec("delete-link", { id: x }) : (u(
      (w) => (w || []).map((y) => ({
        ...y,
        data: y.data.filter((b) => b.link.id !== x)
      }))
    ), n && n({
      id: x,
      action: "delete-link",
      data: { id: x }
    }));
  }
  function f(x, w) {
    e ? t.exec("update-link", {
      id: x,
      link: w
    }) : (u(
      (y) => (y || []).map((b) => ({
        ...b,
        data: b.data.map(
          (k) => k.link.id === x ? { ...k, link: { ...k.link, ...w } } : k
        )
      }))
    ), n && n({
      id: x,
      action: "update-link",
      data: {
        id: x,
        link: w
      }
    }));
  }
  return /* @__PURE__ */ p(Ae, { children: (d || []).map(
    (x, w) => x.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(Zt, { label: x.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: x.data.map((y) => /* @__PURE__ */ Z("tr", { children: [
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ p(
        on,
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
    ] }, y.link.id)) }) }) }) }, w) : null
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
    n ? /* @__PURE__ */ p(Vi, { value: e, onChange: a, format: r }) : null
  ] });
}
st("select", Ps);
st("date", qd);
st("twostate", Ws);
st("slider", nr);
st("counter", zi);
st("links", jd);
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
  const u = _e(Ze.i18n), h = $(() => u || Dt({ ...Rn, ...vr }), [u]), g = $(() => h.getGroup("gantt"), [h]), m = h.getRaw(), f = $(() => {
    const j = m.gantt?.dateFormat || m.formats?.dateFormat;
    return lt(j, m.calendar);
  }, [m]), x = $(() => {
    if (a === !0 && !s) {
      const j = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: g("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: j } : {
        items: [
          ...j,
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
  }, [a, s, l, g]), [w, y] = G(!1), b = $(
    () => w ? "wx-full-screen" : "",
    [w]
  ), k = I((j) => {
    y(j);
  }, []);
  K(() => {
    const j = Ko(k);
    return j.observe(), () => {
      j.disconnect();
    };
  }, [k]);
  const D = se(t, "_activeTask"), S = se(t, "activeTask"), C = se(t, "unscheduledTasks"), E = se(t, "links"), z = se(t, "splitTasks"), N = $(
    () => z && S?.segmentIndex,
    [z, S]
  ), M = $(
    () => N || N === 0,
    [N]
  ), W = $(
    () => $o(),
    [C]
  ), H = se(t, "undo"), [T, V] = G({}), [oe, he] = G(null), [Q, ce] = G(), [Se, O] = G(null), ae = se(t, "taskTypes"), we = $(() => {
    if (!D) return null;
    let j;
    if (M && D.segments ? j = { ...D.segments[N] } : j = { ...D }, s) {
      let be = { parent: j.parent };
      return W.forEach(({ key: Ne, comp: pe }) => {
        if (pe !== "links") {
          const He = j[Ne];
          pe === "date" && He instanceof Date ? be[Ne] = f(He) : pe === "slider" && Ne === "progress" ? be[Ne] = `${He}%` : be[Ne] = He;
        }
      }), be;
    }
    return j || null;
  }, [D, M, N, s, W, f]);
  K(() => {
    ce(we);
  }, [we]), K(() => {
    V({}), O(null), he(null);
  }, [S]);
  function ge(j, be) {
    return j.map((Ne) => {
      const pe = { ...Ne };
      if (Ne.config && (pe.config = { ...pe.config }), pe.comp === "links" && t && (pe.api = t, pe.autoSave = l, pe.onLinksChange = q), pe.comp === "select" && pe.key === "type") {
        const He = pe.options ?? (ae || []);
        pe.options = He.map((ve) => ({
          ...ve,
          label: g(ve.label)
        }));
      }
      return pe.comp === "slider" && pe.key === "progress" && (pe.labelTemplate = (He) => `${g(pe.label)} ${He}%`), pe.label && (pe.label = g(pe.label)), pe.config?.placeholder && (pe.config.placeholder = g(pe.config.placeholder)), be && (pe.isDisabled && pe.isDisabled(be, t.getState()) ? pe.disabled = !0 : delete pe.disabled), pe;
    });
  }
  const Ce = $(() => {
    let j = e.length ? e : W;
    return j = ge(j, Q), Q ? j.filter(
      (be) => !be.isHidden || !be.isHidden(Q, t.getState())
    ) : j;
  }, [e, W, Q, ae, g, t, l]), ue = $(
    () => Ce.map((j) => j.key),
    [Ce]
  );
  function q({ id: j, action: be, data: Ne }) {
    V((pe) => ({
      ...pe,
      [j]: { action: be, data: Ne }
    }));
  }
  const B = I(() => {
    for (let j in T)
      if (E.byId(j)) {
        const { action: be, data: Ne } = T[j];
        t.exec(be, Ne);
      }
  }, [t, T, E]), le = I(() => {
    const j = S?.id || S;
    if (M) {
      if (D?.segments) {
        const be = D.segments.filter(
          (Ne, pe) => pe !== N
        );
        t.exec("update-task", {
          id: j,
          task: { segments: be }
        });
      }
    } else
      t.exec("delete-task", { id: j });
  }, [t, S, M, D, N]), ee = I(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ie = I(
    (j) => {
      const { item: be, changes: Ne } = j;
      be.id === "delete" && le(), be.id === "save" && (Ne.length ? ee() : B()), be.comp && ee();
    },
    [t, S, l, B, le, ee]
  ), Ie = I(
    (j, be, Ne) => (C && j.type === "summary" && (j.unscheduled = !1), ko(j, t.getState(), be), Ne || he(!1), j),
    [C, t]
  ), ke = I(
    (j) => {
      j = {
        ...j,
        unscheduled: C && j.unscheduled && j.type !== "summary"
      }, delete j.links, delete j.data, (ue.indexOf("duration") === -1 || j.segments && !j.duration) && delete j.duration;
      const be = {
        id: S?.id || S,
        task: j,
        ...M && { segmentIndex: N }
      };
      l && oe && (be.inProgress = oe), t.exec("update-task", be), l || B();
    },
    [
      t,
      S,
      C,
      l,
      B,
      ue,
      M,
      N,
      oe
    ]
  ), X = I(
    (j) => {
      let { update: be, key: Ne, input: pe } = j;
      if (pe && he(!0), j.update = Ie({ ...be }, Ne, pe), !l) ce(j.update);
      else if (!Se && !pe) {
        const He = Ce.find((Te) => Te.key === Ne), ve = be[Ne];
        (!He.validation || He.validation(ve)) && (!He.required || ve) && ke(j.update);
      }
    },
    [l, Ie, Se, Ce, ke]
  ), me = I(
    (j) => {
      l || ke(j.values);
    },
    [l, ke]
  ), ye = I((j) => {
    O(j.errors);
  }, []), $e = $(
    () => H ? {
      "ctrl+z": (j) => {
        j.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (j) => {
        j.preventDefault(), t.exec("redo");
      }
    } : {},
    [H, t]
  );
  return we ? /* @__PURE__ */ p(In, { children: /* @__PURE__ */ p(
    Vd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${b} ${n}`,
      items: Ce,
      values: we,
      topBar: x,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: ie,
      onSave: me,
      onValidation: ye,
      onChange: X,
      hotkeys: d && { ...$e, ...d }
    }
  ) }) : null;
}
const Qd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = G(null);
  return K(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(ud, { api: r, columns: e, children: t });
};
function Jd(t) {
  const { api: e, content: n, children: r } = t, s = F(null), o = F(null), [i, a] = G({}), [l, c] = G(null), [d, u] = G({});
  function h(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const D = k.getAttribute("data-tooltip-id"), S = k.getAttribute("data-tooltip-at"), C = k.getAttribute("data-tooltip");
        if (D || C) return { id: D, tooltip: C, target: k, at: S };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  K(() => {
    const k = o.current;
    if (k && d && (d.text || n)) {
      const D = k.getBoundingClientRect();
      let S = !1, C = d.left, E = d.top;
      D.right >= i.right && (C = i.width - D.width - 5, S = !0), D.bottom >= i.bottom && (E = d.top - (D.bottom - i.bottom + 2), S = !0), S && u((z) => z && { ...z, left: C, top: E });
    }
  }, [d, i, n]);
  const g = F(null), m = 300, f = (k) => {
    clearTimeout(g.current), g.current = setTimeout(() => {
      k();
    }, m);
  };
  function x(k) {
    let { id: D, tooltip: S, target: C, at: E } = h(k.target);
    if (u(null), c(null), !S)
      if (D)
        S = y(D);
      else {
        clearTimeout(g.current);
        return;
      }
    const z = k.clientX;
    f(() => {
      D && c(w(b(D)));
      const N = C.getBoundingClientRect(), M = s.current, W = M ? M.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, T;
      E === "left" ? (H = N.top + 5 - W.top, T = N.right + 5 - W.left) : (H = N.top + N.height - W.top, T = z - W.left), a(W), u({ top: H, left: T, text: S });
    });
  }
  function w(k) {
    return e?.getTask(b(k)) || null;
  }
  function y(k) {
    return w(k)?.text || "";
  }
  function b(k) {
    const D = parseInt(k);
    return isNaN(D) ? k : D;
  }
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: s,
      onMouseMove: x,
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
const pu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  registerEditorItem: st,
  registerScaleUnit: Ja
}, Symbol.toStringTag, { value: "Module" }));
export {
  pu as default
};
