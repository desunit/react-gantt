import { jsx as g, jsxs as U, Fragment as He } from "react/jsx-runtime";
import Fo, { useState as B, useEffect as O, useRef as W, createContext as Ht, useContext as $e, useMemo as C, useCallback as E, forwardRef as _t, useImperativeHandle as Ct, useId as Oo, Fragment as $s } from "react";
import { createPortal as Yo, flushSync as Vo } from "react-dom";
function Ke(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function Jn(t, e = "data-id") {
  const n = Ke(t, e);
  return n ? n.getAttribute(e) : null;
}
function kt(t, e = "data-id") {
  const n = Ke(t, e);
  return n ? Lt(n.getAttribute(e)) : null;
}
function Lt(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Go() {
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
var Ze = Go();
function pr(t) {
  Object.assign(Ze, t);
}
function Ir(t, e, n) {
  function r(s) {
    const o = Ke(s);
    if (!o) return;
    const a = Lt(o.dataset.id);
    if (typeof e == "function") return e(a, s);
    let i, l = s.target;
    for (; l != o; ) {
      if (i = l.dataset ? l.dataset.action : null, i && e[i]) {
        e[i](a, s);
        return;
      }
      l = l.parentNode;
    }
    e[n] && e[n](a, s);
  }
  Ze.addEvent(t, n, r);
}
function _s(t, e) {
  Ir(t, e, "click"), e.dblclick && Ir(t, e.dblclick, "dblclick");
}
function Bo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Cs = /* @__PURE__ */ new Date(), $n = !1, hn = [], bt = [], Ar = (t) => {
  if ($n) {
    $n = !1;
    return;
  }
  for (let e = bt.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = bt[e];
    if (!(r > Cs) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, jo = (t) => {
  Cs = /* @__PURE__ */ new Date(), $n = !0;
  for (let e = bt.length - 1; e >= 0; e--) {
    const { node: n } = bt[e];
    if (!n.contains(t.target) && n !== t.target) {
      $n = !1;
      break;
    }
  }
};
function tn(t, e) {
  hn.length || (hn = [
    Ze.addGlobalEvent("click", Ar, t),
    Ze.addGlobalEvent("contextmenu", Ar, t),
    Ze.addGlobalEvent("mousedown", jo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return bt.push(n), {
    destroy() {
      Bo(bt, n), bt.length || (hn.forEach((r) => r()), hn = []);
    }
  };
}
var pn = (t) => t.indexOf("bottom") !== -1, gn = (t) => t.indexOf("left") !== -1, mn = (t) => t.indexOf("right") !== -1, Fn = (t) => t.indexOf("top") !== -1, Hr = (t) => t.indexOf("fit") !== -1, wn = (t) => t.indexOf("overlap") !== -1, Ko = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Uo = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function qo(t, e) {
  let n = 0;
  const r = Ze.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ge, Xe, jt, je;
function Xo(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ge = r, Xe = s, jt = "auto";
  let o = 0, a = 0;
  const i = Qo(t), l = wn(n) ? Ze.getTopNode(t) : i;
  if (!i) return null;
  const c = i.getBoundingClientRect(), d = t.getBoundingClientRect(), u = l.getBoundingClientRect(), f = window.getComputedStyle(l), p = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
  for (const k in p) {
    const v = `border-${k}-width`;
    p[k] = parseFloat(f.getPropertyValue(v));
  }
  if (e) {
    const k = qo(e, i);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (je = e.getBoundingClientRect(), Hr(n) && (jt = je.width + "px"), n !== "point")
      if (Ko(n))
        Hr(n) ? Ge = 0 : (Ge = u.width / 2, a = 1), Xe = (u.height - d.height) / 2;
      else {
        const k = wn(n) ? 0 : 1;
        Ge = mn(n) ? je.right + k : je.left - k, Xe = pn(n) ? je.bottom + 1 : je.top;
        const v = Uo(n);
        v && (mn(n) || gn(n) ? v === "center" ? Xe -= (d.height - je.height) / 2 : v === "end" && (Xe -= d.height - je.height) : (pn(n) || Fn(n)) && (v === "center" ? Ge -= (d.width - je.width) / 2 : v === "end" && (Ge -= d.width - je.width), wn(n) || (Ge += 1)));
      }
  } else je = { left: r, right: r, top: s, bottom: s };
  const m = (gn(n) || mn(n)) && (pn(n) || Fn(n));
  gn(n) && (a = 2);
  const h = Ge - d.width - u.left;
  e && gn(n) && !m && h < 0 && (Ge = je.right, a = 0);
  const w = Ge + d.width * (1 - a / 2) - u.right;
  if (w > 0)
    if (!mn(n))
      Ge = u.right - p.right - d.width;
    else {
      const k = je.left - u.x - d.width;
      e && !wn(n) && !m && k >= 0 ? Ge = je.left - d.width : Ge -= w + p.right;
    }
  a && (Ge = Math.round(Ge - d.width * a / 2));
  const x = h < 0 || w > 0 || !m;
  Fn(n) && (Xe = je.top - d.height, e && Xe < u.y && x && (Xe = je.bottom));
  const y = Xe + d.height - u.bottom;
  return y > 0 && (e && pn(n) && x ? Xe -= d.height + je.height + 1 : Xe -= y + p.bottom), Ge -= c.left + p.left, Xe -= c.top + p.top, Ge = Math.max(Ge, 0) + l.scrollLeft, Xe = Math.max(Xe, 0) + l.scrollTop, jt = jt || "auto", { x: Ge, y: Xe, z: o, width: jt };
}
function Qo(t) {
  const e = Ze.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Lr = (/* @__PURE__ */ new Date()).valueOf();
function gr() {
  return Lr += 1, Lr;
}
var Zo = class {
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
}, Rt = [], zr = {
  subscribe: (t) => {
    Jo();
    const e = new Zo();
    return Rt.push(e), t(e), () => {
      const n = Rt.findIndex((r) => r === e);
      n >= 0 && Rt.splice(n, 1);
    };
  }
}, Wr = !1;
function Jo() {
  Wr || (Wr = !0, document.addEventListener("keydown", (t) => {
    if (Rt.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Rt.length - 1; s >= 0; s--) {
        const o = Rt[s], a = o.store.get(r) || o.store.get(n);
        a && o.node.contains(t.target) && a(t, { key: r, evKey: n });
      }
    }
  }));
}
function Qe(t) {
  return t < 10 ? "0" + t : t.toString();
}
function ei(t) {
  const e = Qe(t);
  return e.length == 2 ? "0" + e : e;
}
function Ns(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function Pr(t, e = 1) {
  let n = t.getDay();
  n === 0 && (n = 7), n = (n - e + 7) % 7;
  const r = new Date(t.valueOf());
  r.setDate(t.getDate() + (3 - n));
  const s = r.getFullYear(), o = Math.floor(
    (r.getTime() - new Date(s, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(o / 7);
}
var Fr = ["", ""];
function ti(t, e, n) {
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
      return ((e.getHours() > 11 ? n.pm : n.am) || Fr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Fr)[1];
    case "%s":
      return Qe(e.getSeconds());
    case "%S":
      return ei(e.getMilliseconds());
    case "%W":
      return Qe(Pr(e));
    case "%w":
      return Qe(Pr(e, n.weekStart ?? 1));
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
var ni = /%[a-zA-Z]/g;
function ct(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      ni,
      (r) => ti(r, n, e)
    )) : "";
  };
}
function Or(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function er(t, e) {
  for (const n in e) {
    const r = e[n];
    Or(t[n]) && Or(r) ? t[n] = er(
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
      return n ? r = er({ ...e }, t) : r = er({ ...t }, e), Nt(r);
    }
  };
}
function Oe(t) {
  const [e, n] = B(t), r = W(t);
  return O(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ri(t, e, n) {
  const [r, s] = B(() => e);
  return t || console.warn(`Writable ${n} is not defined`), O(() => t ? t.subscribe((a) => {
    s(() => a);
  }) : void 0, [t]), r;
}
function J(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ri(r[e], n[e], e);
}
function lt(t, e) {
  const [n, r] = B(() => null);
  return O(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((i) => r(() => i)) : void 0;
  }, [t, e]), n;
}
function si(t, e) {
  const n = W(e);
  n.current = e;
  const [r, s] = B(1);
  return O(() => t.subscribe((a) => {
    n.current = a, s((i) => i + 1);
  }), [t]), [n.current, r];
}
function Xt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return si(r[e], n[e]);
}
function oi(t, e) {
  O(() => {
    const n = e.current;
    if (n)
      return zr.subscribe((r) => {
        r.configure(t, n);
      });
  }, [zr, e]);
}
function mr(t, e) {
  return typeof t == "function" ? typeof e == "object" ? t(e) : t() : t;
}
function Ts(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (a, i) => i.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Ds(t) {
  let e = t, n = [];
  return {
    subscribe: (i) => {
      n.push(i), i(e);
    },
    unsubscribe: (i) => {
      n = n.filter((l) => l !== i);
    },
    set: (i) => {
      e = i, n.forEach((l) => l(e));
    },
    update: (i) => {
      e = i(e), n.forEach((l) => l(e));
    }
  };
}
function Yr(t, e, n) {
  function r(s) {
    const o = Ke(s);
    if (!o) return;
    const a = Lt(o.dataset.id);
    if (typeof e == "function") return e(a, s);
    let i, l = s.target;
    for (; l != o; ) {
      if (i = l.dataset ? l.dataset.action : null, i && e[i]) {
        e[i](a, s);
        return;
      }
      l = l.parentNode;
    }
    e[n] && e[n](a, s);
  }
  return Ze.addEvent(t, n, r);
}
function ii(t, e) {
  const n = [Yr(t, e, "click")];
  return e.dblclick && n.push(Yr(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const ai = "en-US", li = {
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
}, ci = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, di = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, nn = {
  core: ci,
  calendar: li,
  formats: di,
  lang: ai
}, rn = Ht("willow"), ui = Ht({}), nt = Ht(null), wr = Ht(null), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: wr,
  helpers: ui,
  i18n: nt,
  theme: rn
}, Symbol.toStringTag, { value: "Module" }));
function zt(t) {
  const e = $e(wr);
  return t || e;
}
function fi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: a = !1,
  onChange: i
}) {
  const l = zt(e), [c, d] = Oe(t), u = E(
    (m) => {
      const h = m.target.value;
      d(h), i && i({ value: h, input: !0 });
    },
    [i]
  ), f = E(
    (m) => {
      const h = m.target.value;
      d(h), i && i({ value: h });
    },
    [i]
  ), p = W(null);
  return O(() => {
    const m = f, h = p.current;
    return h.addEventListener("change", m), () => {
      h && h.removeEventListener("change", m);
    };
  }, [f]), /* @__PURE__ */ g(
    "textarea",
    {
      className: `wx-3yFVAC wx-textarea ${o ? "wx-error" : ""}`,
      id: l,
      disabled: s,
      placeholder: n,
      readOnly: a,
      title: r,
      value: c,
      onInput: u,
      ref: p
    }
  );
}
function dt({
  type: t = "",
  css: e = "",
  icon: n = "",
  disabled: r = !1,
  title: s = "",
  text: o = "",
  children: a,
  onClick: i
}) {
  const l = C(() => {
    let d = t ? t.split(" ").filter((u) => u !== "").map((u) => "wx-" + u).join(" ") : "";
    return e + (e ? " " : "") + d;
  }, [t, e]), c = (d) => {
    i && i(d);
  };
  return /* @__PURE__ */ U(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${l} ${n && !a ? "wx-icon" : ""}`,
      disabled: r,
      onClick: c,
      children: [
        n && /* @__PURE__ */ g("i", { className: "wx-2ZWgb4 " + n }),
        a || o || " "
      ]
    }
  );
}
function hi({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const a = Oo(), i = zt(t) || a, [l, c] = Oe(r);
  return /* @__PURE__ */ U("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ g(
      "input",
      {
        type: "checkbox",
        id: i,
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
    /* @__PURE__ */ U("label", { htmlFor: i, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Wt({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const a = W(null), [i, l] = Oe(t), [c, d] = Oe(e);
  return O(() => {
    if (n) {
      const u = a.current;
      if (u) {
        const f = u.getBoundingClientRect(), p = Ze.getTopNode(u).getBoundingClientRect();
        f.right >= p.right && d("end"), f.bottom >= p.bottom && l("top");
      }
    }
  }, [n]), O(() => {
    if (a.current) {
      const u = (f) => {
        r && r(f);
      };
      return tn(a.current, u).destroy;
    }
  }, [r]), /* @__PURE__ */ g(
    "div",
    {
      ref: a,
      className: `wx-32GZ52 wx-dropdown wx-${i}-${c}`,
      style: { width: s },
      children: o
    }
  );
}
function sn() {
  return Nt(nn);
}
function pi() {
  let t = null, e = !1, n, r, s, o;
  const a = (d, u, f, p) => {
    n = d, r = u, s = f, o = p;
  }, i = (d) => {
    t = d, e = t !== null, s(t);
  }, l = (d, u) => {
    if (d !== null && n) {
      const f = n.querySelectorAll(".wx-list > .wx-item")[d];
      f && (f.scrollIntoView({ block: "nearest" }), u && u.preventDefault());
    }
  }, c = (d, u) => {
    const f = d === null ? null : Math.max(0, Math.min(t + d, r.length - 1));
    f !== t && (i(f), n ? l(f, u) : requestAnimationFrame(() => l(f, u)));
  };
  return { move: (d) => {
    const u = kt(d), f = r.findIndex((p) => p.id == u);
    f !== t && i(f);
  }, keydown: (d, u) => {
    switch (d.code) {
      case "Enter":
        e ? o() : i(0);
        break;
      case "Space":
        e || i(0);
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
  }, init: a, navigate: c };
}
function Rn({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = W(), o = W(pi()), [a, i] = B(null), l = W(a), c = ($e(nt) || sn()).getGroup("core"), d = (f) => {
    f && f.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  O(() => {
    o.current.init(
      s.current,
      t,
      (f) => {
        i(f), l.current = f;
      },
      d
    );
  }, [t, s.current]), O(() => {
    r && r(o.current);
  }, []);
  const u = E(() => {
    o.current.navigate(null);
  }, [o]);
  return a === null ? null : /* @__PURE__ */ g(Wt, { onCancel: u, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: d,
      onMouseMove: o.current.move,
      children: t.length ? t.map((f, p) => /* @__PURE__ */ g(
        "div",
        {
          className: `wx-233fr7 wx-item ${p === a ? "wx-focus" : ""}`,
          "data-id": f.id,
          children: e ? mr(e, { option: f }) : f.label
        },
        f.id
      )) : /* @__PURE__ */ g("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function gi({
  value: t = "",
  id: e,
  options: n = [],
  textOptions: r = null,
  textField: s = "label",
  placeholder: o = "",
  title: a = "",
  disabled: i = !1,
  error: l = !1,
  clear: c = !1,
  children: d,
  onChange: u
}) {
  const f = zt(e), p = W(null), m = W(null), [h, w] = Oe(t), [x, y] = B(!1), [k, v] = B(""), D = W(null), $ = W(!1), N = C(() => {
    if (x) return k;
    if (h || h === 0) {
      const K = (r || n).find((ue) => ue.id === h);
      if (K) return K[s];
    }
    return "";
  }, [x, k, h, r, n, s]), T = C(() => !N || !x ? n : n.filter(
    (K) => K[s].toLowerCase().includes(N.toLowerCase())
  ), [N, x, n, s]), Y = E(
    () => T.findIndex((K) => K.id === h),
    [T, h]
  ), _ = E((K) => {
    p.current = K.navigate, m.current = K.keydown;
  }, []), I = E(
    (K, ue) => {
      if (K || K === 0) {
        let ke = n.find((A) => A.id === K);
        if (y(!1), ue && p.current(null), ke && h !== ke.id) {
          const A = ke.id;
          w(A), u && u({ value: A });
        }
      }
      !$.current && ue && D.current.focus();
    },
    [n, h, u]
  ), H = E(
    ({ id: K }) => {
      I(K, !0);
    },
    [I]
  ), M = E(
    (K) => {
      K && K.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), R = E(
    (K) => {
      if (!n.length) return;
      if (K === "" && c) {
        M();
        return;
      }
      let ue = n.find((A) => A[s] === K);
      ue || (ue = n.find(
        (A) => A[s].toLowerCase().includes(K.toLowerCase())
      ));
      const ke = ue ? ue.id : h || n[0].id;
      I(ke, !1);
    },
    [n, s, c, h, I, M]
  ), F = E(() => {
    v(D.current.value), y(!0), T.length ? p.current(0) : p.current(null);
  }, [T.length, p]), oe = E(() => {
    $.current = !0;
  }, []), he = E(() => {
    $.current = !1, setTimeout(() => {
      $.current || R(N);
    }, 200);
  }, [R, N]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => p.current(Y()),
      onKeyDown: (K) => m.current(K, Y()),
      title: a,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: f,
            ref: D,
            value: N,
            disabled: i,
            placeholder: o,
            onFocus: oe,
            onBlur: he,
            onInput: F
          }
        ),
        c && !i && h ? /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: M }) : /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !i && /* @__PURE__ */ g(Rn, { items: T, onReady: _, onSelect: H, children: ({ option: K }) => /* @__PURE__ */ g(He, { children: d ? d({ option: K }) : K[s] }) })
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
  placeholder: a = "",
  disabled: i = !1,
  error: l = !1,
  inputStyle: c = {},
  title: d = "",
  css: u = "",
  icon: f = "",
  clear: p = !1,
  onChange: m
}) {
  const h = zt(e), [w, x] = Oe(t), y = W(null), k = C(
    () => f && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [f, u]
  ), v = C(
    () => f && u.indexOf("wx-icon-left") !== -1,
    [f, u]
  );
  O(() => {
    const Y = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(Y);
  }, [r, s]);
  const D = E(
    (Y) => {
      const _ = Y.target.value;
      x(_), m && m({ value: _, input: !0 });
    },
    [m]
  ), $ = E(
    (Y) => m && m({ value: Y.target.value }),
    [m]
  );
  function N(Y) {
    Y.stopPropagation(), x(""), m && m({ value: "" });
  }
  let T = o;
  return o !== "password" && o !== "number" && (T = "text"), O(() => {
    const Y = $, _ = y.current;
    return _.addEventListener("change", Y), () => {
      _ && _.removeEventListener("change", Y);
    };
  }, [$]), /* @__PURE__ */ U(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${k} ${l ? "wx-error" : ""} ${i ? "wx-disabled" : ""} ${p ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: y,
            id: h,
            readOnly: n,
            disabled: i,
            placeholder: a,
            type: T,
            style: c,
            title: d,
            value: w,
            onInput: D
          }
        ),
        p && !i && w ? /* @__PURE__ */ U(He, { children: [
          /* @__PURE__ */ g("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: N }),
          v && /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` })
        ] }) : f ? /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` }) : null
      ]
    }
  );
}
function mi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = $e(nt).getRaw(), a = t.getFullYear(), i = C(() => {
    switch (e) {
      case "month":
        return ct(o.monthYearFormat, s)(t);
      case "year":
        return ct(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Ns(a), u = ct(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, a, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ U("div", { className: "wx-8HQVQV wx-header", children: [
    n !== "right" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-left",
        onClick: () => r && r({ diff: -1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" }),
    /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-label", onClick: l, children: i }),
    n !== "left" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-right",
        onClick: () => r && r({ diff: 1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" })
  ] });
}
function xr({ onClick: t, children: e }) {
  return /* @__PURE__ */ g("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function wi({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const a = ($e(nt) || sn()).getRaw().calendar, i = (a.weekStart || 7) % 7, l = a.dayShort.slice(i).concat(a.dayShort.slice(0, i)), c = (v, D, $) => new Date(
    v.getFullYear(),
    v.getMonth() + (D || 0),
    v.getDate() + ($ || 0)
  );
  let d = n !== "normal";
  function u(v) {
    const D = v.getDay();
    return D === 0 || D === 6;
  }
  function f() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - (v.getDay() - (i - 7)) % 7), v;
  }
  function p() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + (6 - v.getDay() + i) % 7), v;
  }
  const m = W(0);
  function h(v, D) {
    D.timeStamp !== m.current && (m.current = D.timeStamp, D.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const w = C(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = C(() => {
    const v = f(), D = p(), $ = e.getMonth();
    let N = [];
    for (let T = v; T <= D; T.setDate(T.getDate() + 1)) {
      const Y = {
        day: T.getDate(),
        in: T.getMonth() === $,
        date: T.valueOf()
      };
      let _ = "";
      if (_ += Y.in ? "" : " wx-inactive", _ += w.indexOf(Y.date) > -1 ? " wx-selected" : "", d) {
        const I = Y.date == w[0], H = Y.date == w[1];
        I && !H ? _ += " wx-left" : H && !I && (_ += " wx-right"), Y.date > w[0] && Y.date < w[1] && (_ += " wx-inrange");
      }
      if (_ += u(T) ? " wx-weekend" : "", r) {
        const I = r(T);
        I && (_ += " " + I);
      }
      N.push({ ...Y, css: _ });
    }
    return N;
  }, [e, w, d, r]), y = W(null);
  let k = W({});
  return k.current.click = h, O(() => {
    _s(y.current, k.current);
  }, []), /* @__PURE__ */ U("div", { children: [
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekdays", children: l.map((v) => /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekday", children: v }, v)) }),
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-days", ref: y, children: x.map((v) => /* @__PURE__ */ g(
      "div",
      {
        className: `wx-398RBS wx-day ${v.css} ${v.in ? "" : "wx-out"}`,
        "data-id": v.date,
        children: v.day
      },
      v.date
    )) })
  ] });
}
function xi({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [a, i] = Oe(t || /* @__PURE__ */ new Date()), [l, c] = Oe(e || /* @__PURE__ */ new Date()), d = $e(nt).getRaw().calendar, u = d.monthShort || [], f = C(() => l.getMonth(), [l]), p = E(
    (w, x) => {
      if (w != null) {
        x.stopPropagation();
        const y = new Date(l);
        y.setMonth(w), c(y), o && o({ current: y });
      }
      n === "normal" && i(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = E(() => {
    const w = new Date(Ms(a, n) || l);
    w.setMonth(l.getMonth()), w.setFullYear(l.getFullYear()), s && s(w);
  }, [a, l, n, s]), h = E(
    (w) => {
      const x = w.target.closest("[data-id]");
      if (x) {
        const y = parseInt(x.getAttribute("data-id"), 10);
        p(y, w);
      }
    },
    [p]
  );
  return /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-months", onClick: h, children: u.map((w, x) => /* @__PURE__ */ g(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (f === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ g(xr, { onClick: m, children: d.done }) })
  ] });
}
const On = "wx-1XEF33", yi = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const a = $e(nt).getRaw().calendar, [i, l] = Oe(e), [c, d] = Oe(t), u = C(() => i.getFullYear(), [i]), f = C(() => {
    const { start: x, end: y } = Ns(u), k = [];
    for (let v = x; v <= y; ++v)
      k.push(v);
    return k;
  }, [u]), p = {
    click: m
  };
  function m(x, y) {
    if (x) {
      y.stopPropagation();
      const k = new Date(i);
      k.setFullYear(x), l(k), s && s({ current: k });
    }
    o === "normal" && d(new Date(i)), n && n();
  }
  function h() {
    const x = new Date(Ms(c, o) || i);
    x.setFullYear(i.getFullYear()), r && r(x);
  }
  const w = W(null);
  return O(() => {
    w.current && _s(w.current, p);
  }, []), /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g("div", { className: On + " wx-years", ref: w, children: f.map((x, y) => /* @__PURE__ */ g(
      "div",
      {
        className: On + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ g("div", { className: On + " wx-buttons", children: /* @__PURE__ */ g(xr, { onClick: h, children: a.done }) })
  ] });
}, Vr = {
  month: {
    component: wi,
    next: ki,
    prev: vi
  },
  year: {
    component: xi,
    next: Si,
    prev: bi
  },
  duodecade: {
    component: yi,
    next: _i,
    prev: $i
  }
};
function vi(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function ki(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function bi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Si(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function $i(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function _i(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function Ms(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Ci = ["clear", "today"];
function Ni(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Ti({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: a,
  onChange: i
}) {
  const l = $e(nt).getGroup("calendar"), [c, d] = B("month"), u = Array.isArray(o) ? o : o ? Ci : [], f = (x, y) => {
    x.preventDefault(), i && i({ value: y });
  }, p = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (x) => {
    const { diff: y, current: k } = x;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const v = Vr[c];
      n(y > 0 ? v.next(e) : v.prev(e));
    } else k && n(k);
    a && a();
  }, h = (x) => {
    d("month"), i && i({ select: !0, value: x });
  }, w = C(() => Vr[c].component, [c]);
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ U("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ g(mi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ U("div", { children: [
          /* @__PURE__ */ g(
            w,
            {
              value: t,
              current: e,
              onCurrentChange: n,
              part: r,
              markers: s,
              onCancel: p,
              onChange: h,
              onShift: m
            }
          ),
          c === "month" && u.length > 0 && /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((x) => /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ g(
            xr,
            {
              onClick: (y) => f(y, Ni(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function In(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = $e(nt);
  const o = C(() => {
    let a = s;
    return (!a || !a.extend) && (a = Nt(nn)), e !== null && (a = a.extend(e, n)), a;
  }, [e, n, s]);
  return /* @__PURE__ */ g(nt.Provider, { value: o, children: r });
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
const Di = ["clear", "today"];
function Es({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Di,
  onChange: s
}) {
  const [o, a] = Oe(t), [i, l] = Oe(e);
  O(() => {
    Gr(i, o, l, !1);
  }, [o, i]);
  const c = E(
    (u) => {
      const f = u.value;
      f ? (a(new Date(f)), Gr(i, new Date(f), l, !0)) : a(null), s && s({ value: f ? new Date(f) : null });
    },
    [s, i]
  ), d = E(
    (u) => {
      l(u);
    },
    [l]
  );
  return i ? /* @__PURE__ */ g(In, { children: /* @__PURE__ */ g(
    Ti,
    {
      value: o,
      current: i,
      markers: n,
      buttons: r,
      onChange: c,
      onCurrentChange: d
    }
  ) }) : null;
}
const Mi = ["clear", "today"];
function Ei({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: a = "",
  format: i = "",
  buttons: l = Mi,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: f = !1,
  onChange: p
}) {
  const { calendar: m, formats: h } = ($e(nt) || sn()).getRaw(), w = i || h?.dateFormat;
  let x = typeof w == "function" ? w : ct(w, m);
  const [y, k] = B(t), [v, D] = B(!1);
  O(() => {
    k(t);
  }, [t]);
  function $() {
    D(!1);
  }
  function N(_) {
    const I = _ === y || _ && y && _.valueOf() === y.valueOf() || !_ && !y;
    k(_), I || p && p({ value: _ }), setTimeout($, 1);
  }
  const T = C(
    () => y ? x(y) : "",
    [y, x]
  );
  function Y({ value: _, input: I }) {
    if (!u && !f || I) return;
    let H = typeof u == "function" ? u(_) : _ ? new Date(_) : null;
    H = isNaN(H) ? y || null : H || null, N(H);
  }
  return O(() => {
    const _ = $;
    return window.addEventListener("scroll", _), () => window.removeEventListener("scroll", _);
  }, []), /* @__PURE__ */ U("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => D(!0), children: [
    /* @__PURE__ */ g(
      on,
      {
        css: c,
        title: d,
        value: T,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: a,
        onInput: $,
        onChange: Y,
        icon: "wxi-calendar",
        inputStyle: {
          cursor: "pointer",
          width: "100%",
          paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
        },
        clear: f
      }
    ),
    v && !n && /* @__PURE__ */ g(
      Wt,
      {
        onCancel: $,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ g(
          Es,
          {
            buttons: l,
            value: y,
            onChange: (_) => N(_.value)
          }
        )
      }
    )
  ] });
}
function Rs({
  value: t = "",
  options: e = [],
  textOptions: n = null,
  placeholder: r = "",
  disabled: s = !1,
  error: o = !1,
  title: a = "",
  textField: i = "label",
  clear: l = !1,
  children: c,
  onChange: d
}) {
  const u = W(null), f = W(null);
  let [p, m] = Oe(t);
  function h(v) {
    u.current = v.navigate, f.current = v.keydown;
  }
  const w = C(() => p || p === 0 ? (n || e).find((v) => v.id === p) : null, [p, n, e]), x = E(
    ({ id: v }) => {
      (v || v === 0) && (m(v), u.current(null), d && d({ value: v }));
    },
    [m, d]
  ), y = E(
    (v) => {
      v.stopPropagation(), m(""), d && d({ value: "" });
    },
    [m, d]
  ), k = E(() => e.findIndex((v) => v.id === p), [e, p]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: a,
      onClick: () => u.current(k()),
      onKeyDown: (v) => f.current(v, k()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ g("div", { className: "wx-2YgblL wx-label", children: w ? c ? c(w) : w[i] : r ? /* @__PURE__ */ g("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        l && !s && p ? /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ g(Rn, { items: e, onReady: h, onSelect: x, children: ({ option: v }) => c ? c(v) : v[i] })
      ]
    }
  );
}
function tr({
  id: t,
  label: e = "",
  css: n = "",
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: a = 1,
  title: i = "",
  disabled: l = !1,
  onChange: c
}) {
  const d = zt(t), [u, f] = Oe(o), p = W({ value: u, input: u }), m = C(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), h = C(() => l ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [l, m]);
  function w({ target: k }) {
    const v = k.value * 1;
    f(v), c && c({
      value: v,
      previous: p.current.input,
      input: !0
    }), p.current.input = v;
  }
  function x({ target: k }) {
    const v = k.value * 1;
    f(v), c && c({ value: v, previous: p.current.value }), p.current.value = v;
  }
  O(() => {
    f(o);
  }, [o]);
  const y = W(null);
  return O(() => {
    if (y.current)
      return y.current.addEventListener("change", x), () => {
        y.current && y.current.removeEventListener("change", x);
      };
  }, [y, x]), /* @__PURE__ */ U("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: i, children: [
    e && /* @__PURE__ */ g("label", { className: "wx-2EDJ8G wx-label", htmlFor: d, children: e }),
    /* @__PURE__ */ g("div", { className: "wx-2EDJ8G wx-inner", children: /* @__PURE__ */ g(
      "input",
      {
        id: d,
        className: "wx-2EDJ8G wx-input",
        type: "range",
        min: r,
        max: s,
        step: a,
        disabled: l,
        value: u,
        onInput: w,
        style: { background: h },
        ref: y
      }
    ) })
  ] });
}
const Ri = ({
  id: t,
  value: e = 0,
  step: n = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: a = !1,
  readonly: i = !1,
  onChange: l
}) => {
  const c = zt(t), [d, u] = Oe(e), f = E(() => {
    if (i || d <= r) return;
    const w = d - n;
    u(w), l && l({ value: w });
  }, [d, i, r, n, l]), p = E(() => {
    if (i || d >= s) return;
    const w = d + n;
    u(w), l && l({ value: w });
  }, [d, i, s, n, l]), m = E(() => {
    if (!i) {
      const w = Math.round(Math.min(s, Math.max(d, r)) / n) * n, x = isNaN(w) ? Math.max(r, 0) : w;
      u(x), l && l({ value: x });
    }
  }, [i, d, s, r, n, l]), h = E(
    (w) => {
      const x = w.target.value * 1;
      u(x), l && l({ value: x, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-22t21n wx-counter ${a ? "wx-disabled" : ""} ${i ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-dec",
            disabled: a,
            onClick: f,
            children: /* @__PURE__ */ g(
              "svg",
              {
                className: "wx-22t21n wx-dec",
                width: "12",
                height: "2",
                viewBox: "0 0 12 2",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ g("path", { d: "M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" })
              }
            )
          }
        ),
        /* @__PURE__ */ g(
          "input",
          {
            id: c,
            type: "text",
            className: "wx-22t21n wx-input",
            disabled: a,
            readOnly: i,
            required: !0,
            value: d,
            onBlur: m,
            onInput: h
          }
        ),
        /* @__PURE__ */ g(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-inc",
            disabled: a,
            onClick: p,
            children: /* @__PURE__ */ g(
              "svg",
              {
                className: "wx-22t21n wx-inc",
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ g(
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
function Ii({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-11sNg5 wx-notice wx-${t.type ? t.type : ""}`,
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ g("div", { className: "wx-11sNg5 wx-text", children: t.text }),
        /* @__PURE__ */ g("div", { className: "wx-11sNg5 wx-button", children: /* @__PURE__ */ g("i", { className: "wx-11sNg5 wxi-close", onClick: e }) })
      ]
    }
  );
}
function Ai({ data: t = [] }) {
  return /* @__PURE__ */ g("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ g(Ii, { notice: e }, e.id)) });
}
function Hi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: a
}) {
  const i = ($e(nt) || sn()).getGroup("core"), l = W(null);
  O(() => {
    l.current?.focus();
  }, []);
  function c(u) {
    switch (u.code) {
      case "Enter": {
        const f = u.target.tagName;
        if (f === "TEXTAREA" || f === "BUTTON") return;
        o && o({ event: u });
        break;
      }
      case "Escape":
        a && a({ event: u });
        break;
    }
  }
  function d(u, f) {
    const p = { event: u, button: f };
    f === "cancel" ? a && a(p) : o && o(p);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-1FxkZa wx-modal",
      ref: l,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ U("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ g("div", { children: r }),
        s || e && /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ g(
          dt,
          {
            type: `block ${u === "ok" ? "primary" : "secondary"}`,
            onClick: (f) => d(f, u),
            children: i(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Li({ children: t }, e) {
  const [n, r] = B(null), [s, o] = B([]);
  return Ct(
    e,
    () => ({
      showModal: (a) => {
        const i = { ...a };
        return r(i), new Promise((l, c) => {
          i.resolve = (d) => {
            r(null), l(d);
          }, i.reject = (d) => {
            r(null), c(d);
          };
        });
      },
      showNotice: (a) => {
        a = { ...a }, a.id = a.id || gr(), a.remove = () => o((i) => i.filter((l) => l.id !== a.id)), a.expire != -1 && setTimeout(a.remove, a.expire || 5100), o((i) => [...i, a]);
      }
    }),
    []
  ), /* @__PURE__ */ U(He, { children: [
    t,
    n && /* @__PURE__ */ g(
      Hi,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ g(Ai, { data: s })
  ] });
}
_t(Li);
function Zt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: a
}) {
  const i = C(() => gr(), []);
  return /* @__PURE__ */ g(wr.Provider, { value: i, children: /* @__PURE__ */ U(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ g("label", { className: "wx-2oVUvC wx-label", htmlFor: i, children: t }),
        /* @__PURE__ */ g("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: mr(a, { id: i }) })
      ]
    }
  ) });
}
const Is = ({
  value: t = !1,
  type: e = "",
  icon: n = "",
  disabled: r = !1,
  iconActive: s = "",
  onClick: o,
  title: a = "",
  css: i = "",
  text: l = "",
  textActive: c = "",
  children: d,
  active: u,
  onChange: f
}) => {
  const [p, m] = Oe(t), h = C(() => (p ? "pressed" : "") + (e ? " " + e : ""), [p, e]), w = E(
    (x) => {
      let y = !p;
      o && o(x), x.defaultPrevented || (m(y), f && f({ value: y }));
    },
    [p, o, f]
  );
  return p && u ? /* @__PURE__ */ g(
    dt,
    {
      title: a,
      text: p && c || l,
      css: i,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: mr(u, { value: p })
    }
  ) : d ? /* @__PURE__ */ g(
    dt,
    {
      title: a,
      text: p && c || l,
      css: i,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ g(
    dt,
    {
      title: a,
      text: p && c || l,
      css: i,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r
    }
  );
}, Br = new Date(0, 0, 0, 0, 0);
function zi({
  value: t = Br,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: a = "",
  onChange: i
}) {
  let [l, c] = Oe(t);
  const { calendar: d, formats: u } = ($e(nt) || sn()).getRaw(), f = d.clockFormat == 12, p = 23, m = 59, h = C(() => {
    const A = a || u?.timeFormat;
    return typeof A == "function" ? A : ct(A, d);
  }, [a, u, d]), w = C(() => h(new Date(0, 0, 0, 1)).indexOf("01") != -1, [h]), x = (A, re) => (A < 10 && re ? `0${A}` : `${A}`).slice(-2), y = (A) => x(A, !0), k = (A) => `${A}`.replace(/[^\d]/g, "") || 0, v = (A) => f && (A = A % 12, A === 0) ? "12" : x(A, w), D = E((A, re) => (A = k(A), Math.min(A, re)), []), [$, N] = B(null), T = l || Br, Y = D(T.getHours(), p), _ = D(T.getMinutes(), m), I = Y > 12, H = v(Y), M = y(_), R = C(
    () => h(new Date(0, 0, 0, Y, _)),
    [Y, _, h]
  ), F = E(() => {
    N(!0);
  }, []), oe = E(() => {
    const A = new Date(T);
    A.setHours(A.getHours() + (I ? -12 : 12)), c(A), i && i({ value: A });
  }, [T, I, i]), he = E(
    ({ value: A }) => {
      if (T.getHours() === A) return;
      const re = new Date(T);
      re.setHours(A), c(re), i && i({ value: re });
    },
    [T, i]
  ), K = E(
    ({ value: A }) => {
      if (T.getMinutes() === A) return;
      const re = new Date(T);
      re.setMinutes(A), c(re), i && i({ value: re });
    },
    [T, i]
  ), ue = E(
    (A) => (A = D(A, p), f && (A = A * 1, A === 12 && (A = 0), I && (A += 12)), A),
    [D, f, I]
  ), ke = E(() => {
    N(null);
  }, []);
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : F,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ g(
          on,
          {
            id: e,
            css: r,
            title: n,
            value: R,
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
        $ && !s && /* @__PURE__ */ g(Wt, { onCancel: ke, width: "unset", children: /* @__PURE__ */ U("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ U("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: H,
                onChange: (A) => {
                  const re = ue(A.target.value);
                  he({ value: re });
                }
              }
            ),
            /* @__PURE__ */ g("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: M,
                onChange: (A) => {
                  const re = D(A.target.value, m);
                  K({ value: re });
                }
              }
            ),
            f && /* @__PURE__ */ g(
              Is,
              {
                value: I,
                onClick: oe,
                active: () => /* @__PURE__ */ g("span", { children: "pm" }),
                children: /* @__PURE__ */ g("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ g(Zt, { width: "unset", children: /* @__PURE__ */ g(
            tr,
            {
              label: d.hours,
              value: Y,
              onChange: he,
              max: p
            }
          ) }),
          /* @__PURE__ */ g(Zt, { width: "unset", children: /* @__PURE__ */ g(
            tr,
            {
              label: d.minutes,
              value: _,
              onChange: K,
              max: m
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Wi({ children: t }) {
  return /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Pi({ position: t = "right", children: e, onCancel: n }) {
  const r = W(null);
  return O(() => tn(r.current, n).destroy, []), /* @__PURE__ */ g("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function As({ theme: t = "", target: e, children: n }) {
  const r = W(null), s = W(null), [o, a] = B(null);
  r.current || (r.current = document.createElement("div"));
  const i = $e(rn);
  return O(() => {
    a(
      e || Fi(s.current) || Ze.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Yo(
      /* @__PURE__ */ g(
        "div",
        {
          className: `wx-3ZWsT0 wx-${t || i}-theme`,
          children: n
        }
      ),
      o
    ) : null
  ] });
}
function Fi(t) {
  const e = Ze.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Oi() {
  return /* @__PURE__ */ g(He, {});
}
function jr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(rn.Provider, { value: "material", children: /* @__PURE__ */ U(He, { children: [
    n && /* @__PURE__ */ g("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ U(He, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Oi, {}),
      /* @__PURE__ */ g(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Hs() {
  return /* @__PURE__ */ g(He, {});
}
function Kr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(rn.Provider, { value: "willow", children: /* @__PURE__ */ U(He, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ U(He, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Hs, {}),
      /* @__PURE__ */ g(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
function Ur(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(rn.Provider, { value: "willow-dark", children: /* @__PURE__ */ U(He, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ U(He, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Hs, {}),
      /* @__PURE__ */ g(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.svar.dev/fonts/wxi/wx-icons.css"
        }
      )
    ] })
  ] }) });
}
pr(Ze);
const An = {
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
};
var Yi = (/* @__PURE__ */ new Date()).valueOf(), Vi = () => Yi++;
function Gi(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!Hn(r, s)) return !1;
  }
  return !0;
}
function Hn(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
    return !1;
  if (typeof t == "object")
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let r = t.length - 1; r >= 0; r--)
        if (!Hn(t[r], e[r])) return !1;
      return !0;
    } else
      return Gi(t, e);
  return t === e;
}
function _n(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(_n);
  const e = {};
  for (const n in t)
    e[n] = _n(t[n]);
  return e;
}
var Ls = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, zs = (/* @__PURE__ */ new Date()).valueOf(), Bi = () => zs++;
function yr() {
  return "temp://" + zs++;
}
var qr = class {
  constructor(e) {
    this._data = e, this._pool = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      this._pool.set(r.id, r);
    }
  }
  add(e) {
    e = { id: Bi(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, ji = class {
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
      const o = t[s], a = n.get(o.parent);
      a && (a.data || (a.data = []), a.data.push(o));
    }
    const r = n.get(e);
    this.setLevel(r, r.$level + 1, !1);
  }
  add(t, e) {
    const n = this._pool.get(t.parent || 0);
    t.$level = n.$level + 1, this._pool.set(t.id, t), n.data ? e === -1 ? n.data = [...n.data, t] : Xr(n, e, t) : n.data = [t];
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
    const r = this._pool.get(t), s = e === "child", o = this._pool.get(n), a = o.$level + (s ? 1 : 0);
    if (!r || !o) return;
    const i = this._pool.get(r.parent), l = s ? o : this._pool.get(o.parent);
    l.data || (l.data = []);
    const c = xn(i, r.id);
    Ki(i, c);
    const d = s ? l.data.length : xn(l, o.id) + (e === "after" ? 1 : 0);
    if (Xr(l, d, r), i.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== a && (r.$level = a, this.setLevel(r, a + 1, !0)), this.update(r.id, r), this._clearBranch(i);
  }
  _clearBranch(t) {
    t.data && !t.data.length && (t.open && delete t.open, this.update(t.id, { data: null }));
  }
  toArray() {
    const t = [], e = this._pool.get(0).data;
    return e && Ws(e, t), t;
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
function Ws(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Ws(n.data, e);
  });
}
function Ki(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function Xr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function xn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Ps = 2, Ui = class {
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
    for (const a in t) {
      const i = e[a], l = n[a], c = t[a];
      if (i && (l === c && typeof c != "object" || c instanceof Date && l instanceof Date && l.getTime() === c.getTime())) continue;
      const d = r + (r ? "." : "") + a;
      i ? (i.__parse(c, d, s, o) && (n[a] = c), o & Ps ? s[d] = i.__trigger : i.__trigger()) : (c && c.__reactive ? e[a] = this._wrapNested(c, c, d, s) : e[a] = this._wrapWritable(c), n[a] = c), s[d] = s[d] || null;
    }
  }
  _wrapNested(t, e, n, r) {
    const s = this._wrapWritable(t);
    return this._wrapProperties(t, s, e, n, r, 0), s.__parse = (o, a, i, l) => (this._wrapProperties(o, s, e, a, i, l), !1), s;
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
}, qi = class {
  constructor(t, e, n, r) {
    typeof t == "function" ? this._setter = t : this._setter = t.setState.bind(t), this._routes = e, this._parsers = n, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((s) => {
      s.in.forEach((o) => {
        const a = this._triggers.get(o) || [];
        a.push(s), this._triggers.set(o, a);
      }), s.out.forEach((o) => {
        const a = this._sources.get(o) || {};
        s.in.forEach((i) => a[i] = !0), this._sources.set(o, a);
      });
    }), this._routes.forEach((s) => {
      s.length = Math.max(...s.in.map((o) => Fs(o, this._sources, 1)));
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
    const e = this._setter(t, Ps);
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
      const o = n[s], a = this._triggers.get(o);
      a && a.forEach((i) => {
        e.indexOf(i) == -1 && e.push(i);
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
function Fs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Fs(o, e, n + 1));
  return Math.max(...s);
}
var Xi = class {
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
function Qi(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function Zi(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function Ji({ key: t, order: e }) {
  const n = e === "asc" ? Qi : Zi;
  return (r, s) => n(r[t], s[t]);
}
function ea(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => Ji(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function ta(t, e) {
  return t.sort(ea(e));
}
class na extends ji {
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
    return e.data?.forEach((a, i) => {
      const l = this.copy(a, s.id, i);
      o = o.concat(l);
    }), o;
  }
  normalizeTask(e) {
    const n = e.id || yr(), r = e.parent || 0, s = e.text || "", o = e.type || "task", a = e.progress || 0, i = e.details || "", l = { ...e, id: n, text: s, parent: r, progress: a, type: o, details: i };
    return e.segments && (l.segments = e.segments.map((c) => ({ ...c }))), e.segments && (l.segments = e.segments.map((c) => ({ ...c }))), l;
  }
  getSummaryId(e, n = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (n) {
      let o = e, a = this.getSummaryId(o);
      const i = [];
      for (; a; ) o = a, i.push(a), a = this.getSummaryId(o);
      return i;
    }
    return s.type === "summary" ? s.id : this.getSummaryId(s.id);
  }
  sort(e) {
    this._sort = e, e && this.sortBranch(e, 0);
  }
  sortBranch(e, n) {
    const r = this._pool.get(n || 0).data;
    r && (ta(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && Os(n, e), e;
  }
}
function Os(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Os(n.data, e);
  });
}
function Ne(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ft(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Ln(t, e) {
  const n = Ne(t);
  return isNaN(e) ? ft(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function vr(t, e) {
  const n = Ne(t);
  if (isNaN(e)) return ft(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ft(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Ys(t, e) {
  const n = +Ne(t);
  return ft(t, n + e);
}
const Vs = 6048e5, ra = 864e5, Gs = 6e4, Bs = 36e5;
function sa(t, e) {
  return Ys(t, e * Bs);
}
let oa = {};
function js() {
  return oa;
}
function Cn(t, e) {
  const n = js(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Ne(t), o = s.getDay(), a = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function Jt(t) {
  return Cn(t, { weekStartsOn: 1 });
}
function ia(t) {
  const e = Ne(t), n = e.getFullYear(), r = ft(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Jt(r), o = ft(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const a = Jt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= a.getTime() ? n : n - 1;
}
function St(t) {
  const e = Ne(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Nn(t) {
  const e = Ne(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Ks(t, e) {
  const n = St(t), r = St(e), s = +n - Nn(n), o = +r - Nn(r);
  return Math.round((s - o) / ra);
}
function Qr(t) {
  const e = ia(t), n = ft(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Jt(n);
}
function aa(t, e) {
  return Ys(t, e * Gs);
}
function la(t, e) {
  const n = e * 3;
  return vr(t, n);
}
function Us(t, e) {
  const n = e * 7;
  return Ln(t, n);
}
function ca(t, e) {
  return vr(t, e * 12);
}
function Qt(t, e) {
  const n = Ne(t), r = Ne(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function da(t, e) {
  const n = St(t), r = St(e);
  return +n == +r;
}
function kr(t, e) {
  const n = Jt(t), r = Jt(e), s = +n - Nn(n), o = +r - Nn(r);
  return Math.round((s - o) / Vs);
}
function ua(t, e) {
  const n = Ne(t), r = Ne(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function fa(t, e) {
  const n = Ne(t), r = Ne(e);
  return n.getFullYear() - r.getFullYear();
}
function br(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function qs(t, e) {
  return +Ne(t) - +Ne(e);
}
function ha(t, e, n) {
  const r = qs(t, e) / Bs;
  return br(n?.roundingMethod)(r);
}
function pa(t, e, n) {
  const r = qs(t, e) / Gs;
  return br(n?.roundingMethod)(r);
}
function Xs(t) {
  const e = Ne(t);
  return e.setHours(23, 59, 59, 999), e;
}
function Sr(t) {
  const e = Ne(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function ga(t) {
  const e = Ne(t);
  return +Xs(e) == +Sr(e);
}
function Qs(t, e) {
  const n = Ne(t), r = Ne(e), s = Qt(n, r), o = Math.abs(ua(n, r));
  let a;
  if (o < 1) a = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let i = Qt(n, r) === -s;
    ga(Ne(t)) && o === 1 && Qt(t, r) === 1 && (i = !1), a = s * (o - Number(i));
  }
  return a === 0 ? 0 : a;
}
function ma(t, e, n) {
  const r = Qs(t, e) / 3;
  return br(n?.roundingMethod)(r);
}
function wa(t, e) {
  const n = Ne(t), r = Ne(e), s = Qt(n, r), o = Math.abs(fa(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const a = Qt(n, r) === -s, i = s * (o - +a);
  return i === 0 ? 0 : i;
}
function en(t) {
  const e = Ne(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function Zs(t) {
  const e = Ne(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function xa(t) {
  const e = Ne(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ya(t) {
  const e = Ne(t), n = ft(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function va(t) {
  const e = Ne(t);
  return e.setMinutes(59, 59, 999), e;
}
function ka(t, e) {
  const n = js(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Ne(t), o = s.getDay(), a = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + a), s.setHours(23, 59, 59, 999), s;
}
function $r(t) {
  const e = Ne(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function Js(t) {
  const e = Ne(t), n = e.getFullYear(), r = e.getMonth(), s = ft(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function ba(t) {
  const e = Ne(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function eo(t) {
  const e = Ne(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : ba(e) ? 366 : 365;
}
function Sa(t) {
  const e = Qr(t), n = +Qr(Us(e, 60)) - +e;
  return Math.round(n / Vs);
}
function Mt(t, e) {
  const n = Ne(t), r = Ne(e);
  return +n == +r;
}
function $a(t) {
  const e = Ne(t);
  return e.setMinutes(0, 0, 0), e;
}
function _a(t, e, n) {
  const r = Cn(t, n), s = Cn(e, n);
  return +r == +s;
}
function Ca(t, e) {
  const n = Ne(t), r = Ne(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Na(t, e) {
  const n = en(t), r = en(e);
  return +n == +r;
}
function Ta(t, e) {
  const n = Ne(t), r = Ne(e);
  return n.getFullYear() === r.getFullYear();
}
const nr = { year: wa, quarter: ma, month: Qs, week: kr, day: Ks, hour: ha, minute: pa }, pt = { year: { quarter: 4, month: 12, week: Sa, day: Da, hour: Ma }, quarter: { month: 3, week: Ea, day: to, hour: Ra }, month: { week: Ia, day: Aa, hour: Ha }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Da(t) {
  return t ? eo(t) : 365;
}
function Ma(t) {
  return eo(t) * 24;
}
function Ea(t) {
  const e = en(t), n = Ln(St($r(t)), 1);
  return kr(n, e);
}
function to(t) {
  if (t) {
    const e = en(t), n = $r(t);
    return Ks(n, e) + 1;
  }
  return 91;
}
function Ra(t) {
  return to(t) * 24;
}
function Ia(t) {
  if (t) {
    const e = Zs(t), n = Ln(St(Sr(t)), 1);
    return kr(n, e);
  }
  return 5;
}
function Aa(t) {
  return t ? Js(t) : 30;
}
function Ha(t) {
  return Js(t) * 24;
}
function Tn(t, e, n) {
  const r = pt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function La(t, e) {
  return t === e || !!(pt[t] && pt[t][e]);
}
const Dn = { year: ca, quarter: la, month: vr, week: Us, day: Ln, hour: sa, minute: aa };
function _r(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, a) => !pt[t][o] || typeof pt[t][o] == "number" || so(t, r, s, n) ? qt(t, r, s, o, a, n) : za(r, s, t, o, a, n);
}
function qt(t, e, n, r, s, o) {
  const a = r || t;
  let i = n, l = e;
  if (s && (i = ut(a, n, o), l = ut(a, e, o), l < e && (l = it(a)(l, 1))), t !== a) {
    const c = nr[a](l, i), d = Tn(t, a, n);
    return c / d;
  } else return nr[a](l, i);
}
function za(t, e, n, r, s, o) {
  let a = 0;
  const i = ut(n, e, o);
  if (e > i) {
    const c = Dn[n](i, 1);
    a = qt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return so(n, e, t, o) || (l = qt(n, ut(n, t, o), e, void 0, void 0, o), e = Dn[n](e, l)), l += a + qt(n, t, e, r, void 0, o), !l && s && (l = qt(n, t, e, r, s, o)), l;
}
function it(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Dn[t];
}
const no = { year: ya, quarter: en, month: Zs, week: (t, e) => Cn(t, { weekStartsOn: e }), day: St, hour: $a };
function ut(t, e, n) {
  const r = no[t];
  return r ? r(e, n) : new Date(e);
}
const Wa = { year: xa, quarter: $r, month: Sr, week: (t, e) => ka(t, { weekStartsOn: e }), day: Xs, hour: va }, ro = { year: Ta, quarter: Na, month: Ca, week: (t, e, n) => _a(t, e, { weekStartsOn: n }), day: da };
function so(t, e, n, r) {
  const s = ro[t];
  return s ? s(e, n, r) : !1;
}
const Pa = { start: no, end: Wa, add: Dn, isSame: ro, diff: nr, smallerCount: pt }, Zr = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Fa(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((i, l) => ot.indexOf(i) - ot.indexOf(l)).shift();
      let s = ot.indexOf(r);
      const o = e[n][r], a = Zr(o);
      for (let i = s - 1; i >= 0; i--) {
        const l = ot[i], c = Zr(pt[l][r]);
        if (a <= c) break;
        s = i;
      }
      ot.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) pt[r][t] = e[n][r];
    else Pa[n][t] = e[n];
  }
}
function Yn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Oa(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function At(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: it(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const ot = ["year", "quarter", "month", "week", "day", "hour"], rr = 50, sr = 300;
function Ya(t, e, n, r, s) {
  let o = t, a = e, i = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, i = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!a || u >= a) && (a = u, l = !0);
  });
  const c = it(r || "day");
  return o ? i && (o = c(o, -1)) : a ? o = c(a, -30) : o = /* @__PURE__ */ new Date(), a ? l && (a = c(a, 1)) : a = c(o, 30), { _start: o, _end: a };
}
function Va(t, e, n, r, s, o, a) {
  const i = At(a).unit, l = _r(i, void 0, o), c = l(e, t, "", !0), d = ut(i, e, o);
  t = ut(i, t, o), e = d < e ? it(i)(d, 1) : d;
  const u = c * r, f = s * a.length, p = a.map((h) => {
    const w = [], x = it(h.unit);
    let y = ut(h.unit, t, o);
    for (; y < e; ) {
      const k = x(y, h.step), v = y < t ? t : y, D = k > e ? e : k, $ = l(D, v, "", !0) * r, N = typeof h.format == "function" ? h.format(y, k) : h.format;
      let T = "";
      h.css && (T += typeof h.css == "function" ? h.css(y) : h.css), w.push({ width: $, value: N, date: v, css: T, unit: h.unit }), y = k;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return i !== n && (m = Math.round(m / Tn(i, n)) || 1), { rows: p, width: u, height: f, diff: l, start: t, end: e, lengthUnit: n, minUnit: i, lengthUnitWidth: m };
}
function Ga(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = ot.indexOf(At(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = yn(s.minCellWidth, rr)), l.maxCellWidth || (l.maxCellWidth = yn(s.maxCellWidth, sr));
  });
  else {
    const l = [], c = n.length || 1, d = yn(s.minCellWidth, rr), u = yn(s.maxCellWidth, sr);
    n.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }), ot.forEach((f, p) => {
      if (p === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (p) for (let h = c - 1; h > 0; h--) {
          const w = ot[p - h];
          w && m.push({ unit: w, step: 1, format: e[w] });
        }
        m.push({ unit: f, step: 1, format: e[f] }), l.push({ minCellWidth: d, maxCellWidth: u, scales: m });
      }
    }), s.levels = l;
  }
  s.levels[s.level] || (s.level = 0);
  const a = s.levels[s.level], i = Math.min(Math.max(r, a.minCellWidth), a.maxCellWidth);
  return { zoom: s, scales: a.scales, cellWidth: i };
}
function Ba(t, e, n, r, s, o, a) {
  t.level = n;
  let i;
  const l = r.scales || r, c = At(l).unit, d = ja(c, s);
  if (e === -1) {
    const p = Tn(c, s);
    i = a * p;
  } else {
    const p = Tn(At(o).unit, c);
    i = Math.round(a / p);
  }
  const u = r.minCellWidth ?? rr, f = r.maxCellWidth ?? sr;
  return { scales: l, cellWidth: Math.min(f, Math.max(u, i)), lengthUnit: d, zoom: t };
}
function ja(t, e) {
  const n = ot.indexOf(t), r = ot.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : ot[r];
}
function yn(t, e) {
  return t ?? e;
}
const or = 8, oo = 4, Ka = 3, Jr = 7, Ua = or + oo;
function io(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && lo(s, n, r), s.$x += e, io(s, e, n, r);
  });
}
function ir(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), a = { xMin: 1 / 0, xMax: 0 };
    ao(o, a, n, r), o.$x = a.xMin, o.$w = a.xMax - a.xMin, ir(t, o, n, r);
  }
}
function ao(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && lo(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const a = s.$x + s.$w - o;
      e.xMax < a && (e.xMax = a);
    }
    s.type !== "summary" && ao(s, e, n, r);
  });
}
function lo(t, e, n) {
  t.$x = Math.round(e.diff(t.start, e.start, e.lengthUnit) * n), t.$w = Math.round(e.diff(t.end, t.start, e.lengthUnit, !0) * n);
}
function Cr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = Cr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
    const o = s.end || s.start;
    o && (!r.end || r.end < o) && (r.end = new Date(o));
  });
  else if (t.type === "summary") throw Error("Summary tasks must have start and end dates if they have no subtasks");
  return r;
}
function co(t, e, n) {
  return es(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    co(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && es(t, e, n, !0), t;
}
function es(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: a, baselines: i } = n, { start: l, end: c, lengthUnit: d, diff: u } = a, f = (r ? "base_" : "") + "start", p = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), h = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let k = t[f], v = t[p];
  if (r && !k) {
    t[y] = !0;
    return;
  }
  t[f] < l && (t[p] < l || Mt(t[p], l)) ? k = v = l : t[f] > c && (k = v = c), t[m] = Math.round(u(k, l, d) * s), t[h] = r ? t.$y + t.$h + oo : o * e + Ka, t[w] = Math.round(u(v, k, d, !0) * s), t[x] = r ? or : i ? o - Jr - Ua : o - Jr, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[h] = t.$y + or, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Mt(k, v);
}
const Vn = 20, qa = function(t, e, n, r, s) {
  const o = Math.round(r / 2) - 3;
  if (!e || !n || !e.$y || !n.$y || e.$skip || n.$skip) return t.$p = "", t.$pl = 0, t;
  let a = !1, i = !1;
  switch (t.type) {
    case "e2s":
      i = !0;
      break;
    case "s2s":
      a = !0, i = !0;
      break;
    case "s2e":
      a = !0;
      break;
  }
  const l = a ? e.$x : e.$x + e.$w, c = s ? e.$y - 7 : e.$y, d = i ? n.$x : n.$x + n.$w, u = s ? n.$y - 7 : n.$y;
  if (l !== d || c !== u) {
    const f = Qa(l, c + o, d, u + o, a, i, r / 2, s), p = Za(d, u + o, i);
    t.$p = `${f},${p}`, t.$pl = Xa(t.$p);
  }
  return t;
};
function Xa(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, a] = n[s], [i, l] = n[s + 1];
    r += Math.hypot(i - o, l - a);
  }
  return r;
}
function Qa(t, e, n, r, s, o, a, i) {
  const l = Vn * (s ? -1 : 1), c = Vn * (o ? -1 : 1), d = t + l, u = n + c, f = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], p = u - d;
  let m = r - e;
  const h = o === s;
  return h || (u <= t + Vn - 2 && o || u > t && !o) && (m = i ? m - a + 6 : m - a), h && o && d > u || h && !o && d < u ? (f[4] = f[2] + p, f[5] = f[3], f[6] = f[4], f[7] = f[5] + m) : (f[4] = f[2], f[5] = f[3] + m, f[6] = f[4] + p, f[7] = f[5]), f.join(",");
}
function Za(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function uo(t) {
  return t.map((e) => {
    const n = e.id || yr();
    return { ...e, id: n };
  });
}
const fo = ["start", "end", "duration"];
function Ja(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !fo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function el(t, e) {
  return typeof e == "function" ? e : fo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => Ja(n, r.id) ? e : null) : e;
}
function tl(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), a = e.editor && el(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...a && { editor: a }, ...e.options && { options: e.options } };
  });
}
const ho = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Et(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), a = s.length, i = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], f = { "indent-task:remove": 2 }, p = !a && d.includes(e), m = { parent: u.includes(e), level: f[e] };
  if (n = n || (a ? s[s.length - 1] : null), !(!n && !p)) {
    if (e !== "paste-task" && (t._temp = null), i.includes(e) || p || s.length === 1) ts(t, e, n, r);
    else if (a) {
      const h = l.includes(e) ? s : nl(s, o, m);
      c.includes(e) && h.reverse();
      const w = t.getHistory();
      w && w.startBatch(), h.forEach((x, y) => ts(t, e, x, r, y)), w && w.endBatch();
    }
  }
}
function nl(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function ts(t, e, n, r, s) {
  const o = t.exec ? t.exec : t.in.exec;
  let a = e.split(":")[0], i = e.split(":")[1];
  const l = n?.id || n;
  let c = { id: l }, d = {}, u = !1;
  if (a == "copy-task" || a == "cut-task") {
    t._temp || (t._temp = []), t._temp.push({ id: l, cut: a == "cut-task" });
    return;
  } else if (a == "paste-task") {
    if (t._temp && t._temp.length) {
      const f = t.getHistory();
      f && f.startBatch();
      const p = /* @__PURE__ */ new Map();
      if (t._temp.forEach((m) => {
        const h = { id: m.id, target: l, mode: "after" };
        o(m.cut ? "move-task" : "copy-task", h), p.set(m.id, h.id);
      }), !t._temp[0].cut) {
        const { links: m } = t.getState(), h = t._temp.map((x) => x.id), w = [];
        m.forEach((x) => {
          h.includes(x.source) && h.includes(x.target) && w.push(x);
        }), w.forEach((x) => {
          o("add-link", { link: { source: p.get(x.source), target: p.get(x.target), type: x.type } });
        }), t._temp.forEach((x, y) => {
          o("select-task", { id: p.get(x.id), toggle: !!y });
        });
      }
      f && f.endBatch(), t._temp = null;
    }
    return;
  } else a === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: l, show: !0, select: !1 }, c = {}, u = !0) : a === "edit-task" ? (a = "show-editor", i === "segment" && typeof n == "object" && (d = n)) : a === "convert-task" ? (a = "update-task", d = { task: { type: i } }, i = void 0) : a === "indent-task" && (i = i === "add");
  if (a === "split-task" && typeof n == "object") d = n;
  else if (a === "delete-task" && i === "segment" && typeof n == "object") {
    const f = t.getTask(l), { segmentIndex: p } = n, m = f.segments.filter((h, w) => w !== p);
    o("update-task", { id: l, task: { segments: m } });
    return;
  }
  typeof i < "u" && (d = { mode: i, ...d }), c = { ...c, ...d }, o(a, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function Nr(t, e) {
  return t.some((n) => n.data ? Nr(n.data, e) : n.id === e);
}
const ns = (t, e) => it(t, e), rl = (t, e) => _r(t, e);
function ar(t, e) {
  Array.isArray(t) && (t.forEach((n) => yt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Cr(n, t);
      n.start = r, n.end = s, yt(n, e);
    }
  }));
}
function yt(t, e) {
  t.unscheduled || rs(t, e, !1), t.base_start && rs(t, e, !0);
}
function rs(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [a, i, l] = po(n);
  t.type === "milestone" ? (t[l] = 0, t[i] = void 0) : t[a] && (t[l] ? t[i] = ns(o, r)(t[a], t[l]) : t[i] ? t[l] = rl(o, r)(t[i], t[a]) : (t[i] = ns(o, r)(t[a], 1), t[l] = 1));
}
function po(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function ss(t, e, n) {
  const [r, s, o] = po(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function go(t, e, n) {
  ss(t, n, !1), t.base_start && ss(t, n, !0), yt(t, e);
}
class sl extends Ui {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new qi(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: a, start: i, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!i || !l || u) {
        const f = At(d).unit, p = Ya(i, l, u, f, c);
        (p._end != o || p._start != a) && this.setState(p, s);
      } else this.setState({ _start: i, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: a } = o;
      const { _start: i, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: f } = o, p = At(u).unit;
      La(p, a) || (a = p);
      const m = Va(i, l, a, c, d, f, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: a, tasks: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), f = i.toArray().map((p, m) => co(p, m, { cellWidth: o, cellHeight: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: f }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: a, cellHeight: i, baselines: l, criticalPath: c } = this.getState(), d = a.map((u) => {
        const f = o.byId(u.source), p = o.byId(u.target);
        return qa(u, f, p, i, l);
      }).toSorted((u, f) => c ? !!u.$critical == !!f.$critical ? f.$pl - u.$pl : u.$critical ? 1 : -1 : f.$pl - u.$pl).filter((u) => u !== null);
      this.setState({ _links: d }, s);
    } }, { in: ["tasks", "activeTask"], out: ["_activeTask"], exec: (s) => {
      const o = this.getState();
      let { activeTask: a } = o;
      a && typeof a == "object" && (a = a.id);
      const i = o.tasks.byId(a);
      this.setState({ _activeTask: i || null }, s);
    } }, { in: ["tasks", "selected"], out: ["_selected"], exec: (s) => {
      const { tasks: o, selected: a } = this.getState(), i = a.map((l) => o.byId(l)).filter((l) => !!l);
      this.setState({ _selected: i }, s);
    } }, { in: ["start", "end"], out: ["cellWidth"], exec: (s) => {
      const { _cellWidth: o, cellWidth: a } = this.getState();
      o != a && this.setState({ cellWidth: o }, s);
    } }], { tasks: (s) => new na(s), links: (s) => new qr(s), columns: (s) => tl(s) });
    const n = this.in = new Xi();
    n.on("show-editor", (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: a, segmentIndex: i } = s;
        if (a && (i || i === 0)) {
          this.setStateAsync({ activeTask: { id: a, segmentIndex: i } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }), n.on("select-task", ({ id: s, toggle: o, range: a, show: i, segmentIndex: l }) => {
      const { selected: c, _tasks: d, activeTask: u, splitTasks: f } = this.getState();
      let p = !1, m;
      if (c.length && (o || a)) {
        const w = [...c];
        if (a) {
          const x = w[w.length - 1], y = d.findIndex((N) => N.id == x), k = d.findIndex((N) => N.id == s), v = Math.min(y, k), D = Math.max(y, k) + 1, $ = d.slice(v, D).map((N) => N.id);
          y > k && $.reverse(), $.forEach((N) => {
            w.includes(N) || w.push(N);
          });
        } else if (o) {
          const x = w.findIndex((y) => y == s);
          x === -1 ? w.push(s) : (p = !0, w.splice(x, 1));
        }
        m = w;
      } else m = [s];
      const h = { selected: m };
      i && m.length && (h._scrollTask = { id: m[0], mode: i }), this.setStateAsync(h), !p && u && (u !== s || f) && n.exec("show-editor", { id: s, ...f && { segmentIndex: l } });
    }), n.on("delete-link", ({ id: s }) => {
      const { links: o } = this.getState();
      o.remove(s), this.setStateAsync({ links: o });
    }), n.on("update-link", (s) => {
      const { links: o } = this.getState(), a = s.id;
      let i = s.link;
      o.update(a, i), i = o.byId(a), !i.lag && i.lag !== 0 && delete i.lag, this.setStateAsync({ links: o }), s.link = i;
    }), n.on("add-link", (s) => {
      const { link: o } = s, { links: a } = this.getState();
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || yr(), a.add(o), this.setStateAsync({ links: a }), s.id = o.id, s.link = a.byId(o.id));
    });
    let r = null;
    n.on("move-task", (s) => {
      const { tasks: o } = this.getState();
      let { mode: a, target: i } = s;
      const { id: l, inProgress: c } = s, d = o.byId(l);
      if (typeof c > "u" ? s.source = d.parent : s.source = r = r ?? d.parent, c === !1) {
        o.update(d.id, { $reorder: !1 }), this.setState({ tasks: o }), r = null;
        return;
      }
      if (i === l || o.contains(l, i)) {
        s.skipProvider = !0;
        return;
      }
      if (a === "up" || a === "down") {
        const u = o.getBranch(l);
        let f = o.getIndexById(l);
        if (a === "up") {
          const p = d.parent === 0;
          if (f === 0 && p) {
            s.skipProvider = !0;
            return;
          }
          f -= 1, a = "before";
        } else if (a === "down") {
          const p = f === u.length - 1, m = d.parent === 0;
          if (p && m) {
            s.skipProvider = !0;
            return;
          }
          f += 1, a = "after";
        }
        if (i = u[f] && u[f].id || d.parent, i) {
          const p = o.getBranch(i);
          let m = o.getIndexById(i), h = p[m];
          if (h.data) {
            if (a === "before") {
              if (h.parent === d.parent) {
                for (; h.data; ) h.open || n.exec("open-task", { id: h.id, mode: !0 }), h = h.data[h.data.length - 1];
                i = h.id;
              }
            } else if (a === "after") {
              let y;
              h.parent === d.parent ? (y = h, h = h.data[0], i = h.id, a = "before") : p.length - 1 !== m && (y = h, m += 1, h = p[m], d.$level > h.$level && h.data ? (y = h, h = h.data[0], i = h.id, a = "before") : i = h.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const w = o.getSummaryId(d.id);
          o.move(l, a, i);
          const x = o.getSummaryId(l);
          w != x && (w && this.resetSummaryDates(w, "move-task"), x && this.resetSummaryDates(x, "move-task"));
        }
      } else {
        const u = o.byId(i);
        let f = u, p = !1;
        for (; f.$level > d.$level; ) f = o.byId(f.parent), f.id === l && (p = !0);
        if (p) return;
        const m = o.getSummaryId(d.id);
        if (o.move(l, a, i), a == "child") {
          let w = u;
          for (; w.id !== 0 && !w.open; ) n.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        }
        const h = o.getSummaryId(l);
        m != h && (m && this.resetSummaryDates(m, "move-task"), h && this.resetSummaryDates(h, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = i, s.mode = a;
    }), n.on("drag-task", (s) => {
      const o = this.getState(), { tasks: a, _tasks: i, _selected: l, _scales: c, cellWidth: d } = o, u = a.byId(s.id), { left: f, top: p, width: m, inProgress: h } = s, w = { _tasks: i, _selected: l };
      if (typeof m < "u" && (u.$w = m, ir(a, u, c, d)), typeof f < "u") {
        if (u.type === "summary") {
          const x = f - u.$x;
          io(u, x, c, d);
        }
        u.$x = f, ir(a, u, c, d);
      }
      typeof p < "u" && (u.$y = p + 4, u.$reorder = h), typeof m < "u" && (u.$w = m), typeof f < "u" && (u.$x = f), typeof p < "u" && (u.$y = p + 4, u.$reorder = h), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: a, diff: i, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: f, splitTasks: p, calendar: m } = this.getState(), h = d.byId(o), w = { durationUnit: f, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        yt(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = it(x);
      const k = _r(x, m);
      if (i && (c.start && (c.start = y(c.start, i)), !a && a !== 0 && (c.start && c.end ? c.duration = h.duration : (c.start ? c.end = h.end : (c.end = y(c.end, i), c.start = h.start, c.duration = k(c.end, c.start)), k(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? h.type, m && c.start && (c.start = Yn(c.start, i, m)), c.start && c.end && (!Mt(c.start, h.start) || !Mt(c.end, h.end)) && c.type === "summary" && h.data?.length) {
        let D = i || k(c.start, h.start);
        m && (D = c.start > h.start ? k(c.start, h.start) : -k(h.start, c.start), y = Oa(m)), this.moveSummaryKids(h, ($) => ($ = y($, D), m ? Yn($, i, m) : $), "update-task");
      }
      c.start || (c.start = h.start), !c.end && !c.duration && (c.duration = h.duration), yt(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && h.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const v = d.getSummaryId(o);
      v && this.resetSummaryDates(v, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: a, unscheduledTasks: i, durationUnit: l, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: f, task: p, show: m, select: h = !0 } = s;
      !s.eventSource && i && (p.unscheduled = !0);
      let w = -1, x, y;
      if (u ? (y = o.byId(u), f == "child" ? (x = y, p.parent = x.id) : (y.parent !== null && (x = o.byId(y.parent), p.parent = x.id), w = o.getIndexById(u), f == "after" && (w += 1))) : p.parent && (x = o.byId(p.parent)), !p.start) {
        if (x?.start) p.start = new Date(x.start.valueOf());
        else if (y) p.start = new Date(y.start.valueOf());
        else {
          const $ = o.getBranch(0);
          let N;
          if ($?.length) {
            const T = $[$.length - 1];
            if (!T.$skip) {
              const Y = new Date(T.start.valueOf());
              a.start <= Y && (N = Y);
            }
          }
          p.start = N || it(l, d)(a.start, 1);
        }
        p.duration = 1;
      }
      d && (p.start = Yn(p.start, 1, d)), this.getState().baselines && (p.base_start = p.start, p.base_duration = p.duration), yt(p, { durationUnit: l, calendar: d });
      const k = o.add(p, w), v = { tasks: o };
      if (x && m) {
        for (; x && x.id; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        v._scrollTask = { id: k.id, mode: m };
      }
      s.id = k.id;
      const D = o.getSummaryId(k.id);
      D && this.resetSummaryDates(D, "add-task"), this.setStateAsync(v), s.id = k.id, s.task = k, h && n.exec("select-task", { id: k.id });
    }), n.on("delete-task", (s) => {
      const { id: o } = s, { tasks: a, links: i, selected: l } = this.getState();
      s.source = a.byId(o).parent;
      const c = a.getSummaryId(o), d = [o];
      a.eachChild((f) => d.push(f.id), o), i.filter((f) => !(d.includes(f.source) || d.includes(f.target)));
      const u = { tasks: a, links: i };
      l.includes(o) && (u.selected = l.filter((f) => f !== o)), a.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(u);
    }), n.on("indent-task", ({ id: s, mode: o }) => {
      const { tasks: a } = this.getState();
      if (o) {
        const i = a.getBranch(s)[a.getIndexById(s) - 1];
        i && n.exec("move-task", { id: s, mode: "child", target: i.id });
      } else {
        const i = a.byId(s), l = a.byId(i.parent);
        l && l.parent !== null && n.exec("move-task", { id: s, mode: "after", target: i.parent });
      }
    }), n.on("copy-task", (s) => {
      const { id: o, target: a, mode: i, eventSource: l } = s;
      if (l === "copy-task") return;
      const { tasks: c, links: d } = this.getState();
      if (c.contains(o, a)) {
        s.skipProvider = !0;
        return;
      }
      const u = c.getSummaryId(o), f = c.getSummaryId(a);
      let p = c.getIndexById(a);
      i == "before" && (p -= 1);
      const m = c.byId(o), h = c.copy(m, c.byId(a).parent, p + 1);
      s.source = s.id, s.id = h[0][1], m.lazy && (s.lazy = !0), u != f && f && this.resetSummaryDates(f, "copy-task");
      let w = [];
      for (let x = 1; x < h.length; x++) {
        const [y, k] = h[x];
        d.forEach((v) => {
          if (v.source === y) {
            const D = { ...v };
            delete D.target, w.push({ ...D, source: k });
          } else if (v.target === y) {
            const D = { ...v };
            delete D.source, w.push({ ...D, target: k });
          }
        });
      }
      w = w.reduce((x, y) => {
        const k = x.findIndex((v) => v.id === y.id);
        return k > -1 ? x[k] = { ...x[k], ...y } : x.push(y), x;
      }, []);
      for (let x = 1; x < h.length; x++) {
        const [y, k] = h[x], v = c.byId(k);
        n.exec("copy-task", { source: y, id: k, lazy: !!v.lazy, eventSource: "copy-task", target: v.parent, mode: "child", skipUndo: !0 });
      }
      w.forEach((x) => {
        n.exec("add-link", { link: { source: x.source, target: x.target, type: x.type }, eventSource: "copy-task", skipUndo: !0 });
      }), this.setStateAsync({ tasks: c });
    }), n.on("open-task", ({ id: s, mode: o }) => {
      const { tasks: a } = this.getState(), i = a.byId(s);
      i.lazy ? n.exec("request-data", { id: i.id }) : (a.toArray().forEach((l) => l.$y = 0), a.update(s, { open: o }), this.setState({ tasks: a }));
    }), n.on("scroll-chart", ({ left: s, top: o }) => {
      if (!isNaN(s)) {
        const a = this.calcScaleDate(s);
        this.setState({ scrollLeft: s, _scaleDate: a });
      }
      isNaN(o) || this.setState({ scrollTop: o });
    }), n.on("render-data", (s) => {
      this.setState({ area: s });
    }), n.on("provide-data", (s) => {
      const { tasks: o, links: a, durationUnit: i, calendar: l, splitTasks: c } = this.getState(), d = o.byId(s.id);
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], ar(s.data.tasks, { durationUnit: i, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new qr(a.map((u) => u).concat(uo(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: a, cellWidth: i, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let f = i;
      s < 0 && (f = l || i);
      const p = f + s * 50, m = a.levels[a.level], h = s < 0 && i > m.maxCellWidth;
      if (p < m.minCellWidth || p > m.maxCellWidth || h) {
        if (!this.changeScale(a, s)) return;
      } else this.setState({ cellWidth: p, _cellWidth: p });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: k } = this.getState(), v = ut(w.minUnit, x, k), D = w.diff(u, v, "hour");
      typeof o > "u" && (o = y);
      let $ = Math.round(D * y) - o;
      $ < 0 && ($ = 0), this.setState({ scrollLeft: $, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: a, start: i, end: l, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: f } = this.getState(), p = it(a.minUnit);
      let m = a.width;
      if (i && l) {
        if (m < s && m) {
          const k = s / m;
          this.setState({ cellWidth: d * k });
        }
        return !0;
      }
      let h = 0;
      for (; m < s; ) m += d, h++;
      const w = h ? l ? -h : -1 : 0, x = i || p(o, w);
      let y = 0;
      if (u) {
        const k = a.diff(u, x, "hour");
        y = Math.max(0, Math.round(k * d) - (f || 0));
      }
      this.setState({ _start: x, _end: l || p(c, h), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: a }) => {
      const i = this.getState(), { tasks: l } = i;
      let c = i._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && a ? (c.forEach((f, p) => {
        f.key === s && (u = p);
      }), c[u] = d) : c = [d], l.sort(c), this.setState({ _sort: c, tasks: l });
    }), n.on("hotkey", ({ key: s, event: o, eventSource: a }) => {
      switch (s) {
        case "arrowup":
        case "arrowdown": {
          const { selected: i, _tasks: l } = this.getState();
          o.preventDefault();
          const c = i.length;
          let d;
          if (s === "arrowup" ? d = c ? this.getPrevRow(i[c - 1])?.id : l[l.length - 1]?.id : d = c ? this.getNextRow(i[c - 1])?.id : l[0]?.id, d) {
            const u = a === "chart" ? "xy" : !0;
            this.in.exec("select-task", { id: d, show: u });
          }
          break;
        }
        case "ctrl+c": {
          Et(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          Et(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          Et(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), Et(this, "delete-task", null, null);
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
      const { cellWidth: o, scales: a, _scales: i } = this.getState(), l = Ba(e, n, r, s, i.lengthUnit, a, o);
      return l._cellWidth = l.cellWidth, this.setState(l), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks ? e.some((n) => !n.unscheduled || n.data && this.isScheduled(n.data)) : !0;
  }
  resetSummaryDates(e, n, r) {
    const { tasks: s, durationUnit: o, splitTasks: a, calendar: i } = this.getState(), l = s.byId(e), c = l.data;
    if (c?.length && this.isScheduled(c)) {
      const d = Cr({ ...l, start: void 0, end: void 0, duration: void 0 });
      if (!Mt(l.start, d.start) || !Mt(l.end, d.end)) {
        r ? (yt(d, { durationUnit: o, calendar: i }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: n, skipUndo: !0 });
        const u = s.getSummaryId(e);
        u && this.resetSummaryDates(u, n);
      }
    }
  }
  moveSummaryKids(e, n, r) {
    const { tasks: s } = this.getState();
    e.data.forEach((o) => {
      const a = { ...s.byId(o.id), start: n(o.start) };
      delete a.end, delete a.id, this.in.exec("update-task", { id: o.id, task: a, eventSource: r, skipUndo: !0 }), o.data?.length && this.moveSummaryKids(o, n, r);
    });
  }
  calcScaleDate(e) {
    const { _scales: n, _start: r, _weekStart: s } = this.getState(), o = n.lengthUnit === "day" ? n.lengthUnitWidth / 24 : n.lengthUnitWidth;
    return it("hour")(ut(n.minUnit, r, s), Math.floor(e / o));
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
function ol(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = il(s, t, e, 1, n);
    al(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function il(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function al(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function lr(t) {
  return [...mo];
}
function Tr(t) {
  return t.map((e) => {
    switch (e.data && Tr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => cl(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => dl(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => ul(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => ll(n);
        break;
    }
    return e;
  });
}
function ll(t) {
  return t.parent === 0;
}
function cl(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function dl(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function ul(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function os(t) {
  return t && typeof t == "object";
}
function fl(t) {
  return !t.selected || t.selected.length < 2;
}
const hl = (t) => (e) => e.type === t, mo = Tr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: hl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => os(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => fl(e) && os(n) }]);
function cr(t) {
  return [...wo];
}
const wo = Tr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Gn(t) {
  return t.type === "summary";
}
function Bn(t) {
  return t.type === "milestone";
}
function jn(t) {
  return typeof t.parent > "u";
}
function Kn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function xo(t) {
  return [...yo];
}
const yo = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => jn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Gn(t), isDisabled: Kn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Gn(t) || Bn(t), isDisabled: Kn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Gn(t) || Bn(t), isDisabled: Kn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Bn(t) || jn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => jn(t) }], vo = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], mt = Ht(null);
(/* @__PURE__ */ new Date()).valueOf();
function pl(t, e) {
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
  } else return pl(t, e);
  return t === e;
}
function dr(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(dr);
  const e = {};
  for (const n in t) e[n] = dr(t[n]);
  return e;
}
var ko = 2, gl = class {
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
  _wrapProperties(e, n, r, s, o, a) {
    for (const i in e) {
      const l = n[i], c = r[i], d = e[i];
      if (l && (c === d && typeof d != "object" || d instanceof Date && c instanceof Date && c.getTime() === d.getTime())) continue;
      const u = s + (s ? "." : "") + i;
      l ? (l.__parse(d, u, o, a) && (r[i] = d), a & ko ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[i] = this._wrapNested(d, d, u, o) : n[i] = this._wrapWritable(d), r[i] = d), o[u] = o[u] || null;
    }
  }
  _wrapNested(e, n, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, n, r, s, 0), o.__parse = (a, i, l, c) => (this._wrapProperties(a, o, n, i, l, c), !1), o;
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
}, ml = class {
  constructor(e, n, r, s) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = n, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((o) => {
      o.in.forEach((a) => {
        const i = this._triggers.get(a) || [];
        i.push(o), this._triggers.set(a, i);
      }), o.out.forEach((a) => {
        const i = this._sources.get(a) || {};
        o.in.forEach((l) => i[l] = !0), this._sources.set(a, i);
      });
    }), this._routes.forEach((o) => {
      o.length = Math.max(...o.in.map((a) => bo(a, this._sources, 1)));
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
    const n = this._setter(e, ko);
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
      const a = r[o], i = this._triggers.get(a);
      i && i.forEach((l) => {
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
function bo(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => bo(o, e, n + 1));
  return Math.max(...s);
}
var wl = class {
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
function xl(t) {
  return (e) => e[t];
}
function yl(t) {
  return (e, n) => e[t] = n;
}
function $t(t, e) {
  return (e.getter || xl(e.id))(t);
}
function is(t, e, n) {
  return (e.setter || yl(e.id))(t, n);
}
function as(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function gt(t, e) {
  let n = $t(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function vl(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", a = t._columns, i = t.flatData;
  e.header !== !1 && a[0].header && (r = ls("header", a, r, o, s));
  for (let l = 0; l < i.length; l++) {
    const c = [];
    for (let d = 0; d < a.length; d++) {
      let u = gt(i[l], a[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && a[0].footer && (r = ls("footer", a, r, o, s)), r;
}
function ls(t, e, n, r, s) {
  const o = /\n|"|;|,/;
  for (let a = 0; a < e[0][t].length; a++) {
    const i = [];
    for (let l = 0; l < e.length; l++) {
      let c = (e[l][t][a].text || "") + "";
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), i.push(c);
    }
    n += (n ? s : "") + i.join(r);
  }
  return n;
}
function kl(t, e, n) {
  const r = [], s = [], o = [];
  let a = [];
  const i = t._columns, l = t.flatData, c = t._sizes;
  for (const u of i) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && i[0].header && (cs("header", i, r, s, d, e, n), a = a.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += i[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const f = [];
    for (let p = 0; p < i.length; p++) {
      const m = l[u], h = i[p], w = $t(m, h) ?? "";
      let x = gt(m, h), y;
      e.cellStyle && (y = e.cellStyle(w, m, h)), e.cellTemplate && (x = e.cellTemplate(w, m, h) ?? x);
      const k = So(x, 2, y, n);
      f.push(k);
    }
    r.push(f), a.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && i[0].footer && (cs("footer", i, r, s, d, e, n), a = a.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: a, colSizes: o, styles: n };
}
function cs(t, e, n, r, s, o, a) {
  for (let i = 0; i < e[0][t].length; i++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][i], u = d.colspan ? d.colspan - 1 : 0, f = d.rowspan ? d.rowspan - 1 : 0;
      (u || f) && r.push({ from: { row: i + s, column: c }, to: { row: i + s + f, column: c + u } });
      let p = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(p, d, e[c], t)), o.headerCellTemplate && (p = o.headerCellTemplate(p, d, e[c], t) ?? p);
      let h;
      t == "header" ? i == e[0][t].length - 1 ? h = 1 : h = 0 : i ? h = 4 : h = 3;
      const w = So(p, h, m, a);
      l.push(w);
    }
    n.push(l);
  }
}
function So(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Sl(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((a) => an(a, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function bl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, a = e[t], i = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: a, background: r[t], ...l, borderBottom: i, borderRight: i };
  return { cell: { color: a, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Sl(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const $l = "portrait", _l = 100, Cl = "a4", Nl = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Tl(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((i) => !i.hidden), a = Dl(e);
  return o.forEach((i, l) => {
    s + i.width <= a ? (s += i.width, r.push(i)) : (r.length && n.push(r), r = [i], s = i.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function ds(t, e, n) {
  const r = [];
  return t.forEach((s, o) => {
    const a = s[e];
    for (let i = 0; i < n.length; i++) {
      r[i] || (r[i] = []);
      const l = { ...a[i] };
      if (r[i][o] !== null) {
        if (!o && !l.rowspan && !l.colspan) {
          let c = 1, d = t[o + c][e][i], u = l.width;
          for (; !d.rowspan && !d.colspan; ) c++, d = t[o + c][e][i], u += d.width;
          l.colspan = c, l.width = u, l.height = n[i];
        }
        if (r[i].push(l), !l.collapsed && l.colspan > 1) {
          let c = l.colspan - 1;
          if (l.colspan + o > t.length) {
            const d = l.colspan - (l.colspan + o - t.length);
            l.colspan = d, l.width = t.slice(o, o + c + 1).reduce((u, f) => u + f.width, 0), d > 1 && (c = d - 1);
          }
          for (let d = 0; d < c; d++) r[i].push(null);
        }
        if (l.rowspan > 1) {
          const c = l.rowspan;
          for (let d = 1; d < c; d++) r[i + d] || (r[i + d] = []), r[i + d].push(null);
        }
      }
    }
    if (s.collapsed) for (let i = 0; i < r.length; i++) {
      const l = r[i], c = l[o];
      if (c && c.collapsed) {
        if (l[o] = null, !i) break;
      } else {
        const d = c || l.findLast((u) => u?.colspan >= 1);
        d && (d.colspan = d.colspan - 1, d.width = d.width - s.width);
      }
    }
  }), r.map((s) => s.filter((o) => o && o.colspan !== 0));
}
function Dl(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Nl[r];
  return Ml(e === "portrait" ? s : o, n);
}
function Ml(t, e) {
  return t * e;
}
function El(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || $l, ppi: n || _l, paper: r || Cl };
}
function $o(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Rl(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const us = ["resize-column", "hide-column", "update-cell"], Il = ["delete-row", "update-row", "update-cell"], Al = ["move-item"], Hl = ["resize-column", "move-item"];
let Ll = class {
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
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), a = $t(s, o);
      return an(a, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: a }, source: { action: "update-cell", data: e } };
    } }, "update-row": { handler: (e) => {
      const { id: n, row: r } = e, s = this.getRow(n);
      for (const o in r) Object.keys(s).includes(o) || (s[o] = void 0);
      return { action: "update-row", data: { id: n, row: s }, source: { action: "update-row", data: e } };
    } }, "copy-row": { handler: (e) => {
      const { id: n } = e, { data: r } = this.getState(), s = r.findIndex((a) => a.id == n), o = r[s];
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
      const { id: n, target: r, mode: s } = e, { flatData: o } = this.getPrev(), a = o.findIndex((i) => i.id == n);
      return { action: "move-item", data: { id: n, target: o[a + (a ? -1 : 1)].id, mode: a ? "after" : "before" }, source: { action: "move-item", data: { id: n, target: r, mode: s } } };
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
        if (Hl.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Al.includes(n) && this.setPrev("flatData"), us.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Il.includes(n) && this.setPrev("data"), us.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = dr(this.getState()[e]);
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
function _o() {
  let t = !0;
  return t = !1, t;
}
function Co(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function zl(t, e) {
  return -Co(t, e);
}
function Wl(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? Co : zl;
  return function(r, s) {
    return n($t(r, e), $t(s, e));
  };
}
function Pl(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Wl(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const a = n[o](r, s);
      if (a !== 0) return a;
    }
    return 0;
  };
}
const vn = 28, Fl = 20;
function Ol() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Mn(t, e, n, r, s) {
  const o = document.createElement("div"), a = document.createElement("div"), i = document.body;
  s = s ? `${s}px` : "auto";
  let l, c;
  a.className = e, o.classList.add(`wx-${n}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(a), i.appendChild(o), typeof t != "object" && (t = [t]);
  for (let d = 0; d < t.length; d++) {
    a.innerText = t[d] + "";
    const u = o.getBoundingClientRect(), f = Math.ceil(u.width) + (r && r.length ? r[d] : 0), p = Math.ceil(u.height);
    l = Math.max(l || 0, f), c = Math.max(c || 0, p);
  }
  return o.remove(), { width: l, height: c };
}
function fs(t, e, n, r, s) {
  const o = [];
  for (let a = 0; a < t.length; a++) {
    const i = t[a][e], l = i.length;
    for (let c = 0; c < l; c++) {
      const { text: d, vertical: u, collapsed: f, rowspan: p, css: m } = i[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let h = 0;
      if (u && !f) {
        let w = `wx-measure-cell-${e}`;
        if (w += m ? ` ${m}` : "", h = Mn(d, w, s).width, (p > 1 || !i[c + 1]) && n > c + 1) {
          const x = p || n - c, y = o.slice(c, c + x).reduce((k, v) => k + v, 0);
          if (y < h) {
            const k = Math.ceil((h - y) / x);
            for (let v = c; v < c + x; v++) o[v] = (o[v] || r) + k;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, h);
    }
  }
  return o;
}
function Yl(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let a = 0; a < e.length; a++) {
    const i = e[a], l = gt(i, t);
    l && (r.push(l), t.treetoggle ? s.push(e[a].$level * vn + (e[a].$count ? vn : 0) + (t.draggable ? vn : 0)) : t.draggable && s.push(vn));
  }
  return Mn(r, o, n, s).width;
}
function Vl(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Fl : 0;
  let s = t.header;
  if (typeof s == "string") return Mn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let a = 0; a < s.length; a++) {
    const i = s[a], l = typeof i == "string" ? i : i.text, c = n + (typeof i == "string" ? "" : ` ${i.css}`);
    let d = Mn(l, c, e).width;
    a === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const Gl = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Bl(t) {
  return Gl[t];
}
class jl extends gl {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new ml(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: a, _skin: i } = this.getState(), l = this.copyColumns(o), c = l.reduce((f, p) => Math.max(p.header.length, f), 0), d = l.reduce((f, p) => Math.max(p.footer.length, f), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, a, c, d, i);
      for (let f = 0; f < l.length; f++) this.normalizeColumns(l, f, "header", c, u), this.normalizeColumns(l, f, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: a, dynamic: i, _filterIds: l } = this.getState(), c = l && new Set(l), d = a ? this.flattenRows(o, [], l) : c ? o.filter((f) => c.has(f.id)) : o, u = !i && d.some((f) => f.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new wl();
    r.on("close-editor", ({ ignore: s }) => {
      const { editor: o } = this.getState();
      o && (s || r.exec("update-cell", o), this.setState({ editor: null }));
    }), r.on("open-editor", ({ id: s, column: o }) => {
      let a = this.getState().editor;
      a && r.exec("close-editor", {});
      const i = this.getRow(s), l = o ? this.getColumn(o) : this.getNextEditor(i);
      if (l?.editor) {
        let c = l.editor;
        if (typeof c == "function" && (c = c(i, l)), !c) return;
        a = { column: l.id, id: s, value: $t(i, l) ?? "", renderedValue: gt(i, l) }, typeof c == "object" && c.config && (a.config = c.config, c.config.options && (a.options = c.config.options)), l.options && !a.options && (a.options = l.options), this.setState({ editor: a });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: a } = o;
      const { select: i, _filterIds: l } = o, { row: c, before: d, after: u, select: f } = s;
      if (s.id = c.id = s.id || c.id || kn(), d || u) {
        const m = d || u, h = a.findIndex((w) => w.id === m);
        a = [...a], a.splice(h + (u ? 1 : 0), 0, s.row);
      } else a = [...a, s.row];
      const p = { data: a };
      l && (p._filterIds = [...l, s.id]), this.setState(p), !(typeof f == "boolean" && !f) && (f || i) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: a, focusCell: i, editor: l } = this.getState(), { id: c } = s, d = { data: o.filter((u) => u.id !== c) };
      this.isSelected(c) && (d.selectedRows = a.filter((u) => u !== c)), l?.id == c && (d.editor = null), this.setState(d), i?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: a } = o;
      a = [...a];
      const { tree: i } = o, { id: l, column: c, value: d } = s, u = this.getColumn(c);
      if (i) {
        const f = { ...this._branches[l] };
        is(f, u, d);
        const p = this.updateTreeRow(f);
        f.$parent === 0 && (a = p);
      } else {
        const f = a.findIndex((m) => m.id == l), p = { ...a[f] };
        is(p, u, d), a[f] = p;
      }
      this.setState({ data: a });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: a, row: i } = s, l = o.findIndex((c) => c.id == a);
      o = [...o], o[l] = { ...o[l], ...i }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: a, mode: i, show: l, column: c }) => {
      const d = this.getState(), { focusCell: u } = d;
      let { selectedRows: f } = d;
      if (f.length || (a = o = !1), a) {
        const { data: p } = this.getState();
        let m = p.findIndex((w) => w.id == f[f.length - 1]), h = p.findIndex((w) => w.id == s);
        m > h && ([m, h] = [h, m]), p.slice(m, h + 1).forEach((w) => {
          f.indexOf(w.id) === -1 && f.push(w.id);
        });
      } else if (o && this.isSelected(s)) {
        if (i === !0) return;
        f = f.filter((p) => p !== s);
      } else if (o) {
        if (i === !1) return;
        f.push(s);
      } else f = [s];
      this.setState({ selectedRows: [...f] }), u?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), l && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: a, eventSource: i } = s, { _columns: l, split: c } = this.getState();
      o && a ? (this.setState({ focusCell: { row: o, column: a } }), i !== "click" && ((!c.left || l.findIndex((d) => d.id == s.column) >= c.left) && (!c.right || l.findIndex((d) => d.id == s.column) < l.length - c.right) ? this.in.exec("scroll", { row: o, column: a }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: a, maxRows: i, inProgress: l } = s;
      if (l === !1) return;
      let c = s.width || 0;
      const d = [...this.getState().columns], u = d.find((f) => f.id == o);
      if (a) {
        if (a == "data" || a === !0) {
          const { flatData: f, _skin: p } = this.getState();
          let m = f.length;
          i && (m = Math.min(i, m));
          const h = f.slice(0, m);
          c = Yl(u, h, p);
        }
        if (a == "header" || a === !0) {
          const { _skin: f } = this.getState();
          c = Math.max(Vl(u, f), c);
        }
      }
      u.width = Math.max(17, c), delete u.flexgrow, this.setState({ columns: d });
    }), r.on("hide-column", (s) => {
      const { id: o, mode: a } = s, i = [...this.getState().columns], l = i.find((d) => d.id == o), c = i.reduce((d, u) => d + (u.hidden ? 0 : 1), 0);
      !a || c > 1 ? (l.hidden = !l.hidden, this.setState({ columns: i })) : s.skipUndo = !0;
    }), r.on("sort-rows", (s) => {
      const { key: o, add: a, sort: i } = s, l = this.getState(), { columns: c, data: d, tree: u } = l;
      if (i) {
        const y = [...d];
        y.sort(i), this.setState({ data: y });
        return;
      }
      const { order: f = "asc" } = s;
      let p = l.sortMarks;
      const m = Object.keys(p), h = m.length;
      !a || !h || h === 1 && p[o] ? p = { [o]: { order: f } } : (h === 1 && (p[m[0]] = { ...p[m[0]], index: 0 }), p = { ...p, [o]: { order: f, index: typeof a == "number" ? a : p[o]?.index ?? h } });
      const w = Object.keys(p).sort((y, k) => p[y].index - p[k].index).map((y) => ({ key: y, order: p[y].order }));
      this.setState({ sortMarks: p });
      const x = Pl(w, c);
      if (x) {
        const y = [...d];
        u ? this.sortTree(y, x) : y.sort(x), this.setState({ data: y });
      }
    }), r.on("filter-rows", (s) => {
      const { value: o, key: a, filter: i } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const l = this.getState(), { data: c, tree: d } = l;
      let u = l.filterValues;
      const f = {};
      a && (u = { ...u, [a]: o }, f.filterValues = u);
      const p = i ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, p, m) : c.forEach((h) => {
        p(h) && m.push(h.id);
      }), f._filterIds = m, this.setState(f);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: a, mode: i } = s, l = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[a] : c;
      typeof d == "object" && (d.collapsed = i ?? !d.collapsed, this.setState({ columns: l }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: a } = s;
      let { target: i, mode: l = "after" } = s;
      const { data: c, flatData: d, tree: u } = this.getState(), f = d.findIndex((h) => h.id == o);
      let p;
      if (l === "up" || l === "down") {
        if (l === "up") {
          if (f === 0) return;
          p = f - 1, l = "before";
        } else if (l === "down") {
          if (f === d.length - 1) return;
          p = f + 1, l = "after";
        }
        i = d[p] && d[p].id;
      } else p = d.findIndex((h) => h.id == i);
      if (f === -1 || p === -1 || a === !1) return;
      let m;
      u ? m = this.moveItem(o, i, c, l) : m = this.moveItem(o, i, c, l), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: a, mode: i = "after" } = s, l = this.getState(), { flatData: c, _filterIds: d } = l;
      let { data: u } = l;
      const f = this.getRow(o);
      if (!f) return;
      const p = { ...f, id: kn() };
      s.id = p.id;
      const m = c.findIndex((w) => w.id == a);
      if (m === -1) return;
      u.splice(m + (i === "after" ? 1 : 0), 0, p), u = [...u];
      const h = { data: u };
      d && (h._filterIds = [...d, p.id]), this.setState(h);
    }), r.on("open-row", (s) => {
      const { id: o, nested: a } = s;
      this.toggleBranch(o, !0, a);
    }), r.on("close-row", (s) => {
      const { id: o, nested: a } = s;
      this.toggleBranch(o, !1, a);
    }), r.on("export", (s) => new Promise((o, a) => {
      const i = s.options || {}, l = `${i.fileName || "data"}.${i.format}`;
      if (i.format == "csv") {
        const c = vl(this.getState(), i);
        i.download !== !1 ? as(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (i.format == "xlsx") {
        let c = i.styles;
        !c && c !== !1 && (c = bl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: f, merged: p, rowSizes: m, colSizes: h, styles: w } = kl(this.getState(), i, u), x = i.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (k) => {
            if (k.data.type == "ready") {
              const v = k.data.blob;
              i.download !== !1 ? as(v, l) : s.result = v, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: i.sheetName || "data", cells: f, cols: h, rows: m, merged: p }], styles: w } });
        });
      } else a();
    })), r.on("search-rows", (s) => {
      const { search: o, columns: a } = s, i = this.searchRows(o, a);
      this.setState({ search: { value: o, rows: i } });
    }), r.on("hotkey", ({ key: s, event: o, isInput: a }) => {
      switch (s) {
        case "arrowup": {
          const { flatData: i, focusCell: l, select: c } = this.getState();
          if (o.preventDefault(), a) return;
          const d = l ? l.column : this._getFirstVisibleColumn()?.id, u = l ? this.getPrevRow(l.row)?.id : i[i.length - 1]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowdown": {
          const { flatData: i, focusCell: l, select: c } = this.getState();
          if (o.preventDefault(), a) return;
          const d = l ? l.column : this._getFirstVisibleColumn()?.id, u = l ? this.getNextRow(l.row)?.id : i[0]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowright": {
          const { focusCell: i } = this.getState();
          if (a) return;
          if (o.preventDefault(), i) {
            const l = this.getNextColumn(i.column, !0)?.id;
            l && this.in.exec("focus-cell", { row: i.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "arrowleft": {
          const { focusCell: i } = this.getState();
          if (a) return;
          if (o.preventDefault(), i) {
            const l = this.getPrevColumn(i.column, !0)?.id;
            l && this.in.exec("focus-cell", { row: i.row, column: l, eventSource: "key" });
          }
          break;
        }
        case "tab": {
          const { editor: i, focusCell: l, select: c } = this.getState();
          if (i) {
            o.preventDefault();
            const d = i.column;
            let u = i.id, f = this.getNextEditor(this.getRow(u), this.getColumn(d));
            if (!f) {
              const p = this.getNextRow(u);
              p && (u = p.id, f = this.getNextEditor(p));
            }
            f && (this.in.exec("open-editor", { id: u, column: f.id }), this.in.exec("focus-cell", { row: u, column: f.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: i, focusCell: l, select: c } = this.getState();
          if (i) {
            o.preventDefault();
            const d = i.column;
            let u = i.id, f = this.getPrevEditor(this.getRow(u), this.getColumn(d));
            if (!f) {
              const p = this.getPrevRow(u);
              p && (u = p.id, f = this.getPrevEditor(p));
            }
            f && (this.in.exec("open-editor", { id: u, column: f.id }), this.in.exec("focus-cell", { row: u, column: f.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "escape": {
          const { editor: i } = this.getState();
          i && (this.in.exec("close-editor", { ignore: !0 }), this.in.exec("focus-cell", { row: i.id, column: i.column, eventSource: "key" }));
          break;
        }
        case "f2": {
          const { editor: i, focusCell: l } = this.getState();
          !i && l && this.in.exec("open-editor", { id: l.row, column: l.column });
          break;
        }
        case "enter": {
          const { focusCell: i, tree: l } = this.getState();
          if (!a && l && i && this.getColumn(i.column).treetoggle) {
            const c = this.getRow(i.row);
            if (!c.data) return;
            this.in.exec(c.open ? "close-row" : "open-row", { id: i.row, nested: !0 });
          }
          break;
        }
        case "home": {
          const { editor: i, focusCell: l } = this.getState();
          if (!i && l) {
            o.preventDefault();
            const c = this._getFirstVisibleColumn()?.id;
            this.in.exec("focus-cell", { row: l.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+home": {
          const { editor: i, focusCell: l, flatData: c, select: d } = this.getState();
          if (!i && l) {
            o.preventDefault();
            const u = c[0]?.id, f = this._getFirstVisibleColumn()?.id;
            u && f && (this.in.exec("focus-cell", { row: u, column: f, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          }
          break;
        }
        case "end": {
          const { editor: i, focusCell: l } = this.getState();
          if (!i && l) {
            o.preventDefault();
            const c = this._getLastVisibleColumn()?.id, d = l.row;
            this.in.exec("focus-cell", { row: d, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+end": {
          const { editor: i, focusCell: l, flatData: c, select: d } = this.getState();
          if (!i && l) {
            o.preventDefault();
            const u = c.at(-1).id, f = this._getLastVisibleColumn()?.id;
            u && f && (this.in.exec("focus-cell", { row: u, column: f, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
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
      const { _columns: o, split: a, _sizes: i, flatData: l, dynamic: c, _rowHeightFromData: d } = this.getState();
      let u = -1, f = -1, p = 0, m = 0;
      if (s.column) {
        u = 0;
        const h = o.findIndex((w) => w.id == s.column);
        p = o[h].width;
        for (let w = a.left ?? 0; w < h; w++) {
          const x = o[w];
          x.hidden || (u += x.width);
        }
      }
      if (s.row && !c) {
        const h = l.findIndex((w) => w.id == s.row);
        h >= 0 && (d ? (f = l.slice(0, h).reduce((w, x) => w + (x.rowHeight || i.rowHeight), 0), m = l[h].rowHeight) : f = i.rowHeight * h);
      }
      this.setState({ scroll: { top: f, left: u, width: p, height: m || i.rowHeight } });
    }), r.on("print", (s) => {
      const o = El(s);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Ol()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), an(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), _o() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Ll(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
      const a = this.updateTreeRow(s);
      s.$parent === 0 && (o = a);
    }
    r && s.data?.length && s.data.forEach((a) => {
      const i = this.toggleKids(a, n, r);
      e === 0 && (o = i);
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
        const a = e[o], i = s === "before" ? o : o + 1;
        if (a.data) {
          if (s === "before") {
            const l = o > 0 ? e[o - 1] : null;
            return l?.data && l.open ? e[o - 1] = { ...l, data: [...l.data, r] } : e.splice(i, 0, r), !0;
          } else if (a.open) return e[o] = { ...a, data: [r, ...a.data] }, !0;
        }
        return e.splice(i, 0, r), !0;
      }
      if (e[o].data && (e[o] = { ...e[o], data: [...e[o].data] }, this.insertItem(e[o].data, n, r, s))) return !0;
    }
    return !1;
  }
  moveItem(e, n, r, s) {
    const o = [...r], a = this.findAndRemove(o, e);
    return this.insertItem(o, n, a, s), o;
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
      const a = s[o];
      if (a.collapsible && a.collapsed) {
        if (a.collapsible !== "first") {
          e.collapsed = !0, e.width = 36, a.vertical = !0;
          const l = s.length - o;
          s = s.slice(0, o + 1), s[o].rowspan = l;
        }
        const i = a.colspan;
        if (i) {
          const l = s[o + 1];
          let c = 1;
          l && l.colspan && !l.collapsed && (c = l.colspan);
          for (let d = c; d < i; d++) {
            const u = r[n + d];
            u && (u.hidden = !0);
          }
        }
      }
    }
  }
  normalizeColumns(e, n, r, s, o) {
    const a = e[n];
    a.width || (a.width = a.flexgrow ? 17 : o.columnWidth), a._colindex = n + 1;
    const i = a[r], l = o[`${r}RowHeights`];
    for (let c = 0; c < s; c++) {
      const d = i[c];
      d.id = a.id, c === i.length - 1 && (d.rowspan = d.rowspan ? Math.min(d.rowspan, s - c) : s - c);
      for (let u = 1; u < d.rowspan; u++) {
        i.splice(c + u, 0, { _hidden: !0 });
        for (let f = 1; f < d.colspan; f++) e[n + f][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? l : l.slice(c, d.rowspan + c)).reduce((f, p) => f + p, 0);
        d.height = u, c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = a.width, f = a.flexgrow || 0;
        const p = d.colspan;
        for (let m = 1; m < p; m++) {
          const h = e[n + m];
          h && (h.hidden ? d.colspan -= 1 : h.flexgrow ? f += h.flexgrow : u += h.width || o.columnWidth), f ? d.flexgrow = f : d.width = u;
        }
      } else d.width = a.width, d.flexgrow = a.flexgrow;
      r === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    i.length > s && (i.length = s), a[r] = i;
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
      const { config: o, type: a } = n.find((l) => l.id == s).header.find((l) => l.filter).filter, i = e[s];
      r.push((l) => o?.handler ? o.handler(l[s], i) : Bl(a)(l[s], i));
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
    const { flatData: s, columns: o } = this.getState(), a = n ? o.filter((i) => n[i.id]) : o;
    return s.forEach((i) => {
      const l = {};
      a.forEach((c) => {
        const d = gt(i, c);
        String(d).toLowerCase().includes(e) && (l[c.id] = !0);
      }), Object.keys(l).length && (r[i.id] = l);
    }), r;
  }
  normalizeSizes(e, n, r, s, o) {
    const a = fs(e, "header", r, n.headerHeight, o), i = fs(e, "footer", s, n.footerHeight, o), l = a.reduce((d, u) => d + u, 0), c = i.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: a, footerRowHeights: i, headerHeight: l, footerHeight: c };
  }
}
let Kl = (/* @__PURE__ */ new Date()).valueOf();
function kn() {
  return "temp://" + Kl++;
}
function Ul(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var ql = class {
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
}, It = [], Xl = { subscribe: (t) => {
  Ql();
  const e = new ql();
  return It.push(e), t(e), () => {
    const n = It.findIndex((r) => r === e);
    n >= 0 && It.splice(n, 1);
  };
} }, hs = !1;
function Ql() {
  hs || (hs = !0, document.addEventListener("keydown", (t) => {
    if (It.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = It.length - 1; s >= 0; s--) {
        const o = It[s], a = o.store.get(r) || o.store.get(n);
        a && o.node.contains(t.target) && a(t, { key: r, evKey: n });
      }
    }
  }));
}
const Zl = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Dr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(a) {
    const i = a.target;
    return i.tagName === "INPUT" || i.tagName === "TEXTAREA" || Ul(i, "data-header-id")?.classList.contains("wx-filter") || !!i.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const a in e) {
    const i = e[a];
    typeof i < "u" && (typeof i == "function" ? s[a] = i : i && (s[a] = (l) => {
      const c = r(l);
      n({ key: a, event: l, isInput: c });
    }));
  }
  const o = Xl.subscribe((a) => {
    a.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function Jl(t, e) {
  let n = null;
  e.scroll.subscribe((r) => {
    if (!r || r === n) return;
    n = r;
    const { left: s, top: o, height: a, width: i } = r, l = e.getHeight(), c = e.getWidth(), d = e.getScrollMargin();
    if (o >= 0) {
      const u = t.scrollTop;
      o < u ? t.scrollTop = o : o + a > u + l && (t.scrollTop = o - l + a);
    }
    if (s >= 0) {
      const u = t.scrollLeft;
      s < u ? t.scrollLeft = s : s + i > u + c - d && (t.scrollLeft = s - c + i + d);
    }
  });
}
function vt(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function ec(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function ps(t) {
  return t && t.getAttribute("data-context-id");
}
const gs = 5;
function tc(t, e) {
  let n, r, s, o, a, i, l, c, d;
  function u($) {
    o = $.clientX, a = $.clientY, i = {
      ...ec(n, t, $),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function f($) {
    n = Ke($), ps(n) && (s = vt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u($.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", p), window.addEventListener("touchend", k));
  }
  function p($) {
    if (c || d)
      return $.preventDefault(), !1;
  }
  function m($) {
    $.which === 1 && (n = Ke($), ps(n) && (s = vt(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", v), u($)));
  }
  function h($) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", k), document.body.style.userSelect = "", $ && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", f));
  }
  function w($) {
    const N = $.clientX - o, T = $.clientY - a;
    if (!r) {
      if (Math.abs(N) < gs && Math.abs(T) < gs || e && e.start && e.start({ id: s, e: $ }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = i.left + "px", r.style.top = i.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const Y = Math.round(Math.max(0, i.top + T));
      if (e && e.move && e.move({ id: s, top: Y, detail: l }) === !1)
        return;
      const _ = e.getTask(s), I = _.$y;
      if (!i.start && i.y == I) return D();
      i.start = !0, i.y = _.$y - 4, r.style.top = Y + "px";
      const H = document.elementFromPoint(
        $.clientX,
        $.clientY
      ), M = Ke(H);
      if (M && M !== n) {
        const R = vt(M), F = M.getBoundingClientRect(), oe = F.top + F.height / 2, he = $.clientY + i.db > oe && M.nextElementSibling !== n, K = $.clientY - i.dt < oe && M.previousElementSibling !== n;
        l?.after == R || l?.before == R ? l = null : he ? l = { id: s, after: R } : K && (l = { id: s, before: R });
      }
    }
  }
  function x($) {
    w($);
  }
  function y($) {
    c ? ($.preventDefault(), w($.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function k() {
    c = null, d && (clearTimeout(d), d = null), D();
  }
  function v() {
    D();
  }
  function D() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: i.top })), s = n = r = i = l = null, h();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", f), {
    destroy() {
      h(!0);
    }
  };
}
const nc = {
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
function No(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = No(n.data, e)), r;
  });
}
function To(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = To(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let rc = 1;
function sc(t) {
  return No(t, (e) => {
    const n = { ...e, id: e.id || rc++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Do = {};
function oc(t) {
  return Do[t] || t;
}
function ic(t, e) {
  Do[t] = e;
}
function ac({ onClick: t, onShow: e, option: n }) {
  const r = W(null), s = E(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = C(() => n && n.comp ? oc(n.comp) : null, [n]);
  return /* @__PURE__ */ U(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ g("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ g(o, { item: n, option: n }) : null : /* @__PURE__ */ U("span", { className: "wx-cDCz9rZQ wx-value", children: [
          " ",
          n.text,
          " "
        ] }),
        n.subtext ? /* @__PURE__ */ g("span", { className: "wx-cDCz9rZQ wx-subtext", children: n.subtext }) : null,
        n.data ? /* @__PURE__ */ g("i", { className: "wx-cDCz9rZQ wx-sub-icon wxi-angle-right" }) : null
      ]
    }
  );
}
function Mr({
  options: t,
  left: e = 0,
  top: n = 0,
  at: r = "bottom",
  parent: s = null,
  mount: o = null,
  context: a = null,
  css: i = "",
  onClick: l
}) {
  const [c, d] = B(-1e4), [u, f] = B(-1e4), [p, m] = B(20), [h, w] = B(), x = W(null), [y, k] = B(!1), [v, D] = B(null), $ = E(() => {
    const I = Xo(x.current, s, r, e, n);
    I && (d(I.x), f(I.y), m(I.z), w(I.width));
  }, [s, r, e, n]);
  O(() => {
    o && o($);
  }, []);
  const N = E(() => {
    k(!1);
  }, []), T = E(() => {
    l && l({ action: null, option: null });
  }, [l]), Y = E((I, H) => {
    k(I), D(H);
  }, []), _ = C(() => sc(t), [t]);
  return O(() => {
    $();
  }, [s, $]), O(() => {
    if (x.current)
      return tn(x.current, { callback: T, modal: !0 }).destroy;
  }, [T]), /* @__PURE__ */ g(
    "div",
    {
      ref: x,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${i}`,
      style: {
        position: "absolute",
        top: u + "px",
        left: c + "px",
        width: h,
        zIndex: p
      },
      onMouseLeave: N,
      children: _.map((I) => /* @__PURE__ */ U($s, { children: [
        I.comp === "separator" ? /* @__PURE__ */ g("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ g(
          ac,
          {
            option: I,
            onShow: Y,
            onClick: (H) => {
              if (!I.data && !H.defaultPrevented) {
                const M = { context: a, action: I, option: I, event: H };
                I.handler && I.handler(M), l && l(M), H.stopPropagation();
              }
            }
          }
        ),
        I.data && y === I.id ? /* @__PURE__ */ g(
          Mr,
          {
            css: i,
            options: I.data,
            at: "right-overlap",
            parent: v,
            context: a,
            onClick: l
          }
        ) : null
      ] }, I.id))
    }
  );
}
const lc = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: a = null,
    css: i = "",
    children: l,
    onClick: c
  } = t, [d, u] = B(null), [f, p] = B(null), [m, h] = B(0), [w, x] = B(0), y = C(() => d !== null && a ? To(n, ($) => a($, d)) : n, [d, a, n]), k = E(
    ($) => {
      p(null), c && c($);
    },
    [c]
  ), v = E(($, N) => {
    let T = null;
    for (; $ && $.dataset && !T; )
      T = $.dataset[N], $ = $.parentNode;
    return T ? Lt(T) : null;
  }, []), D = E(
    ($, N) => {
      if (!$) {
        p(null);
        return;
      }
      if ($.defaultPrevented) return;
      const T = $.target;
      if (T && T.dataset && T.dataset.menuIgnore) return;
      h($.clientX + 1), x($.clientY + 1);
      let Y = typeof N < "u" ? N : v(T, o);
      s && (Y = s(Y, $), !Y) || (u(Y), p(T), $.preventDefault());
    },
    [o, v, s]
  );
  return Ct(e, () => ({ show: D }), [D]), /* @__PURE__ */ U(He, { children: [
    l ? /* @__PURE__ */ g("span", { onClick: D, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    f ? /* @__PURE__ */ g(As, { children: /* @__PURE__ */ g(
      Mr,
      {
        css: i,
        at: r,
        top: w,
        left: m,
        parent: f,
        context: d,
        onClick: k,
        options: y
      },
      f
    ) }) : null
  ] });
});
_t(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: a } = t, [i, l] = B(null);
  function c(m) {
    l(null), a && a(m);
  }
  const d = E((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Ct(e, () => ({ show: d }), [d]);
  function u(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; )
      l(h), h = h.parentNode;
  }
  const f = W(0), p = W(i);
  return O(() => {
    p.current !== i && (f.current += 1, p.current = i);
  }, [i]), /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    i ? /* @__PURE__ */ g(As, { children: /* @__PURE__ */ g(
      Mr,
      {
        css: s,
        at: r,
        parent: i,
        options: n,
        onClick: c
      },
      f.current
    ) }) : null
  ] });
});
const Mo = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: a = null,
    css: i = "",
    children: l,
    onClick: c
  } = t, d = W(null), u = E((f, p) => {
    d.current.show(f, p);
  }, []);
  return Ct(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ U(He, { children: [
    l ? /* @__PURE__ */ g("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ g(
      lc,
      {
        css: i,
        at: r,
        options: n,
        resolver: s,
        dataKey: o,
        filter: a,
        ref: d,
        onClick: c
      }
    )
  ] });
}), Eo = {};
function cc(t) {
  return Eo[t] || t;
}
function Pt(t, e) {
  Eo[t] = e;
}
function Ro({ menu: t = !1 }) {
  return /* @__PURE__ */ g("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Io() {
  return /* @__PURE__ */ g("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const dc = ({ key: t, text: e, ...n }) => n;
function Er(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, a = C(
    () => cc(e.comp || "label"),
    [e]
  ), i = E(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = C(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = E(
    ({ value: u }) => {
      e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
    },
    [e, o]
  ), d = C(() => n ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [n, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ g(Io, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ g(Ro, { menu: n });
  {
    const u = a, f = [
      "wx-tb-element",
      e && e.css ? e.css : "",
      e && e.spacer ? "wx-spacer" : "",
      n ? "wx-menu" : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ g(
      "div",
      {
        className: "wx-KVAsgMam " + f,
        "data-id": e ? e.id : void 0,
        children: /* @__PURE__ */ g(
          u,
          {
            value: l,
            onChange: c,
            onClick: i,
            text: d,
            menu: n,
            ...dc(e)
          }
        )
      }
    );
  }
}
function En({
  item: t,
  values: e = null,
  menu: n = !1,
  onChange: r,
  onClick: s
}) {
  const [o, a] = B(!0), i = () => a(!0), l = () => a(!1), c = (u) => {
    i(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ U("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ g("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ g("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ g(Wt, { width: "", oncancel: i, children: /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ g(
      En,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, f) => u.items ? /* @__PURE__ */ g(
        En,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || f
      ) : /* @__PURE__ */ g(
        Er,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || f
      )
    ) }),
    t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label", children: t.text }) : null
  ] }) });
}
function uc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [a, i] = B(void 0), l = W(null);
  function c() {
    i(null);
  }
  function d() {
    i(!0);
  }
  function u(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ g(dt, { icon: "wxi-dots-h", onClick: d }),
        a ? /* @__PURE__ */ g(Wt, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ g("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (f, p) => f.items ? /* @__PURE__ */ g(
            En,
            {
              item: f,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            f.id || p
          ) : /* @__PURE__ */ g(
            Er,
            {
              item: f,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            f.id || p
          )
        ) }) }) : null
      ]
    }
  );
}
function fc(t) {
  return t.forEach((e) => {
    e.id || (e.id = gr());
  }), t;
}
function ur(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: a,
    onChange: i
  } = t, [l, c] = Oe(e || []), [d, u] = Oe(s || null), f = C(() => fc(l), [l]), p = W(null), m = W(-1), [h, w] = B([]), x = W(f);
  O(() => {
    x.current = f;
  }, [l]);
  const y = W(o);
  O(() => {
    y.current = o;
  }, [o]);
  const k = W(h);
  O(() => {
    k.current = h;
  }, [h]);
  const v = W(!1);
  function D(_) {
    d && (d[_.item.key] = _.value, u({ ...d })), i && i(_);
  }
  function $() {
    const _ = p.current;
    if (!_) return 0;
    const I = _.children, H = x.current || [];
    let M = 0;
    for (let R = 0; R < H.length; R++)
      H[R].comp !== "spacer" && (M += I[R].clientWidth, H[R].comp === "separator" && (M += 8));
    return M;
  }
  function N() {
    const _ = p.current, I = x.current || [];
    if (_) {
      for (let H = I.length - 1; H >= 0; H--)
        if (I[H].items && !I[H].collapsed) {
          I[H].collapsed = !0, I[H].$width = _.children[H].offsetWidth, v.current = !0, c([...I]);
          return;
        }
    }
  }
  function T(_) {
    const I = p.current, H = x.current || [];
    if (I) {
      for (let M = 0; M < H.length; M++)
        if (H[M].collapsed && H[M].$width) {
          H[M].$width - I.children[M].offsetWidth < _ + 10 && (H[M].collapsed = !1, v.current = !0), c([...H]);
          return;
        }
    }
  }
  function Y() {
    const _ = p.current;
    if (!_) return;
    const I = x.current || [], H = y.current;
    if (H === "wrap") return;
    const M = _.clientWidth;
    if (_.scrollWidth > M) {
      if (H === "collapse") return N();
      const R = _.children;
      let F = 0;
      for (let oe = 0; oe < I.length; oe++) {
        if (F += R[oe].clientWidth, I[oe].comp === "separator" && (F += 8), F > M - 40) {
          if (m.current === oe) return;
          m.current = oe;
          const he = [];
          for (let K = oe; K < I.length; K++)
            he.push(I[K]), R[K].style.visibility = "hidden";
          oe > 0 && I[oe - 1].comp === "separator" && (R[oe - 1].style.visibility = "hidden"), w(he);
          break;
        }
        R[oe].style.visibility = "";
      }
    } else {
      const R = M - $();
      if (R <= 0) return;
      if (H === "collapse") return T(R);
      if ((k.current || []).length) {
        m.current = null;
        const F = _.children;
        for (let oe = 0; oe < I.length; oe++)
          F[oe].style.visibility = "";
        w([]);
      }
    }
  }
  return O(() => {
    v.current && (v.current = !1, Y());
  }, [l]), O(() => {
    const _ = new ResizeObserver(() => Y());
    return p.current && _.observe(p.current), () => {
      _.disconnect();
    };
  }, []), /* @__PURE__ */ U(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: p,
      children: [
        f.map(
          (_) => _.items ? /* @__PURE__ */ g(
            En,
            {
              item: _,
              values: d,
              onClick: a,
              onChange: D
            },
            _.id
          ) : /* @__PURE__ */ g(
            Er,
            {
              item: _,
              values: d,
              onClick: a,
              onChange: D
            },
            _.id
          )
        ),
        !!h.length && /* @__PURE__ */ g(
          uc,
          {
            items: h,
            css: n,
            values: d,
            onClick: a,
            onChange: D
          }
        )
      ]
    }
  );
}
function hc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: a, onClick: i } = t;
  return a ? /* @__PURE__ */ U("div", { className: "wx-HXpG4gnx wx-item", onClick: i, children: [
    /* @__PURE__ */ g("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ g(
    dt,
    {
      icon: e,
      type: s,
      css: r,
      text: n,
      disabled: o,
      onClick: i
    }
  );
}
function pc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function gc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: a, onClick: i } = t;
  return a ? /* @__PURE__ */ U("div", { className: "wx-3cuSqONJ wx-item", onClick: i, children: [
    e ? /* @__PURE__ */ g("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ g(
    dt,
    {
      icon: e,
      type: s,
      css: r,
      title: n,
      disabled: o,
      onClick: i
    }
  );
}
function mc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ U("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ g("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Pt("button", hc);
Pt("separator", Ro);
Pt("spacer", Io);
Pt("label", pc);
Pt("item", mc);
Pt("icon", gc);
const tt = Ht(null);
function wc(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const ms = 5, xc = 700;
function yc(t) {
  return Lt(t.getAttribute("data-id"));
}
function Sn(t) {
  const e = t.getBoundingClientRect(), n = document.body, r = e.top + n.scrollTop - n.clientTop || 0, s = e.left + n.scrollLeft - n.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: t.offsetWidth,
    height: t.offsetHeight
  };
}
function fr(t, e) {
  const n = Sn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function vc(t, e) {
  const n = e.current;
  let r = null, s, o, a = !1, i = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(N) {
    const T = Ke(N);
    T && (r = {
      container: l,
      sourceNode: N.target,
      from: yc(T),
      pos: fr(N, t)
    }, o = r.pos, u(N));
  }
  function u(N) {
    if (!r) return;
    const T = r.pos = fr(N, t);
    if (!a) {
      if (!i && !N?.target?.getAttribute("draggable-data") && Math.abs(o.x - T.x) < ms && Math.abs(o.y - T.y) < ms)
        return;
      if (D(N) === !1) return $();
    }
    if (i) {
      const Y = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, _ = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        N.pageX - Y,
        N.pageY - _
      );
    } else r.targetNode = N.target;
    n.move && n.move(N, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function f(N) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", a && n.end && n.end(N, r), r = o = null, $();
  }
  function p(N) {
    n.getReorder && !n.getReorder() || N.button === 0 && (v(N), window.addEventListener("mousemove", m), window.addEventListener("mouseup", h), d(N));
  }
  function m(N) {
    u(N);
  }
  function h(N) {
    f(N);
  }
  function w(N) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      i = !0, d(N.touches[0]);
    }, xc), v(N);
    function T() {
      s && c(), N.target.removeEventListener("touchmove", x), N.target.removeEventListener("touchend", T), f(N);
    }
    N.target.addEventListener("touchmove", x), N.target.addEventListener("touchend", T), t.addEventListener("contextmenu", y);
  }
  function x(N) {
    a ? (N.preventDefault(), u(N.touches[0])) : s && c();
  }
  function y(N) {
    if (a || s)
      return N.preventDefault(), !1;
  }
  function k(N) {
    N.preventDefault();
  }
  function v(N) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: T } = n.getDraggableInfo();
    (!T || N.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function D(N) {
    if (a = !0, n.start) {
      if (n.start(N, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function $(N) {
    a = i = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", h), N && (t.removeEventListener("mousedown", p), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", k));
  }
  return t.addEventListener("mousedown", p), t.addEventListener("touchstart", w), t.addEventListener("dragstart", k), {
    destroy() {
      $(!0);
    }
  };
}
const kc = 4e-3;
function bc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function Sc(t, e, n, r) {
  const { node: s, left: o, top: a, bottom: i, sense: l, xScroll: c, yScroll: d } = r, u = fr(t, s);
  n.scrollState || (n.scrollState = bc());
  let f = 0, p = 0;
  u.x < o + l ? f = -1 : u.x > e.width - l && (f = 1), u.y < a + Math.round(l / 2) ? p = -1 : u.y > e.height - i - Math.round(l / 2) && (p = 1), (n.scrollState.dirX !== f || n.scrollState.dirY !== p) && (Ao(n), n.scrollState.dirX = f, n.scrollState.dirY = p), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && $c(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function $c(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      _c,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Ao(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function _c(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += kc, r !== 0 && Nc(t, e, r), s !== 0 && Cc(t, e, s);
}
function Cc(t, e, n) {
  const r = e.node.scrollTop;
  Ho(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Nc(t, e, n) {
  const r = e.node.scrollLeft;
  Ho(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Ho(t, e, n) {
  n.node[e] = t;
}
function zn(t, e, n, r, s, o) {
  const a = {};
  return t && (a.width = `${t}px`, a.minWidth = `${t}px`), e && (a.flexGrow = e), o && (a.height = `${o}px`), n && (a.position = "sticky", n.left && (a.left = `${r}px`), n.right && (a.right = `${s}px`)), a;
}
function Lo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Tc(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [a, i] = Oe(t.focusable), l = $e(tt), c = J(l, "focusCell"), d = J(l, "search"), u = J(l, "reorder"), f = C(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), p = C(
    () => zn(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m($, N) {
    let T = "wx-cell";
    return T += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", T += $ ? " " + $(n) : "", T += N ? " " + N(e, n) : "", T += n.treetoggle ? " wx-tree-cell" : "", T;
  }
  const h = C(
    () => m(s, r),
    [s, r, n, e]
  ), w = C(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = W(null);
  O(() => {
    x.current && a && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, a, e.id, n.id]);
  const y = E(() => {
    a && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, a, c, e.id, n.id]);
  O(() => () => {
    a && c && (l.exec("focus-cell", { eventSource: "destroy" }), i(!1));
  }, [l, i]);
  function k($) {
    const N = new RegExp(`(${d.value.trim()})`, "gi");
    return String($).split(N).map((T) => ({ text: T, highlight: N.test(T) }));
  }
  const v = C(() => {
    const $ = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, N = n.fixed && n.fixed.right;
    return [
      h,
      $ ? "wx-shadow" : "",
      N ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [h, n]), D = n.cell;
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-TSCaXsGV " + v,
      ref: x,
      onFocus: y,
      style: p,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: a ? "0" : "-1",
      role: "gridcell",
      "aria-colindex": n._colindex,
      "aria-readonly": n.editor ? void 0 : !0,
      children: [
        u && n.draggable ? w ? /* @__PURE__ */ g(
          "i",
          {
            "draggable-data": "true",
            className: "wx-TSCaXsGV wx-draggable wxi-drag"
          }
        ) : /* @__PURE__ */ g("i", { className: "wx-TSCaXsGV wx-draggable-stub" }) : null,
        n.treetoggle ? /* @__PURE__ */ U(He, { children: [
          /* @__PURE__ */ g("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ g(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        D ? /* @__PURE__ */ g(
          D,
          {
            api: l,
            row: e,
            column: n,
            onAction: ({ action: $, data: N }) => l.exec($, N)
          }
        ) : o ? o() : f ? /* @__PURE__ */ g("span", { children: k(gt(e, n)).map(
          ({ highlight: $, text: N }, T) => $ ? /* @__PURE__ */ g("mark", { className: "wx-TSCaXsGV wx-search", children: N }, T) : /* @__PURE__ */ g("span", { children: N }, T)
        ) }) : gt(e, n)
      ]
    }
  );
}
function ws(t, e) {
  let n, r;
  function s(i) {
    n = i.clientX, t.style.opacity = 1, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", window.addEventListener("mousemove", o), window.addEventListener("mouseup", a), e && e.down && e.down(t);
  }
  function o(i) {
    r = i.clientX - n, e && e.move && e.move(r);
  }
  function a() {
    t.style.opacity = "", document.body.style.cursor = "", document.body.style.userSelect = "", e && e.up && e.up(r), window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", a);
  }
  return t.addEventListener("mousedown", s), {
    destroy() {
      t.removeEventListener("mousedown", s);
    }
  };
}
function Dc({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ g(
    on,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Mc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = $e(tt), o = J(s, "flatData"), a = C(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), i = C(() => t?.config?.template, [t]);
  function l() {
    const u = [];
    return o.forEach((f) => {
      const p = $t(f, e);
      u.includes(p) || u.push(p);
    }), u.map((f) => ({ id: f, label: f }));
  }
  function c({ value: u }) {
    n({ value: u, key: e.id });
  }
  function d(u) {
    u.key !== "Tab" && u.preventDefault();
  }
  return /* @__PURE__ */ g("div", { style: { width: "100%" }, onKeyDown: d, children: /* @__PURE__ */ g(
    Rs,
    {
      placeholder: "",
      clear: !0,
      ...t?.config ?? {},
      options: a,
      value: r,
      onChange: c,
      children: (u) => i ? i(u) : u.label
    }
  ) });
}
const Ec = {
  text: Dc,
  richselect: Mc
};
function Rc({ filter: t, column: e }) {
  const n = $e(tt), r = J(n, "filterValues");
  function s(a) {
    n.exec("filter-rows", a);
  }
  const o = C(() => Ec[t.type], [t.type]);
  return /* @__PURE__ */ g(
    o,
    {
      filter: t,
      column: e,
      action: s,
      filterValue: r[e.id]
    }
  );
}
function Ic(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: a,
    bodyHeight: i,
    hasSplit: l
  } = t, c = $e(tt), d = J(c, "sortMarks"), u = C(() => d ? d[n.id] : void 0, [d, n.id]), f = W(), p = E(
    (R) => {
      f.current = e.flexgrow ? R.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = E(
    (R, F) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (f.current || 0) + R),
        inProgress: F
      });
    },
    [c, e.id]
  ), h = E((R) => m(R, !0), [m]), w = E((R) => m(R, !1), [m]), x = E(
    (R) => {
      if (!n.sort || e.filter) return;
      let F = u?.order;
      F && (F = F === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: R.ctrlKey, order: F });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = E(
    (R) => {
      R && R.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), k = E(
    (R) => {
      R.key === "Enter" && y();
    },
    [y]
  ), v = E(
    (R) => {
      R.key === "Enter" && !e.filter && x(R);
    },
    [x, e.filter]
  ), D = C(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), $ = C(
    () => D && !l && e.collapsible !== "header",
    [D, l, e.collapsible]
  ), N = C(
    () => $ ? { top: -i / 2, position: "absolute" } : {},
    [$, i]
  ), T = C(
    () => zn(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (D && $ ? i : 0)
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
      $,
      i
    ]
  ), Y = C(
    () => Lo(n, e, a),
    [n, e, a]
  ), _ = E(() => Object.fromEntries(
    Object.entries(e).filter(([R]) => R !== "cell")
  ), [e]), I = `wx-cell ${Y} ${e.css || ""} wx-collapsed`, H = [
    "wx-cell",
    Y,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), M = W(null);
  return O(() => {
    const R = M.current;
    if (!R) return;
    const F = ws(R, { down: p, move: h, up: w });
    return () => {
      typeof F == "function" && F();
    };
  }, [p, h, w, ws]), D ? /* @__PURE__ */ g(
    "div",
    {
      className: "wx-RsQD74qC " + I,
      style: T,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: k,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", style: N, children: e.text || "" })
    }
  ) : /* @__PURE__ */ U(
    "div",
    {
      className: "wx-RsQD74qC " + H,
      style: T,
      onClick: x,
      "data-header-id": n.id,
      tabIndex: !e._hidden && n.sort && !e.filter ? 0 : void 0,
      role: "columnheader",
      "aria-colindex": e._colindex,
      "aria-colspan": e.colspan > 1 ? e.colspan : void 0,
      "aria-rowspan": e.rowspan > 1 ? e.rowspan : void 0,
      "aria-sort": !u?.order || e.filter ? "none" : u?.order === "asc" ? "ascending" : "descending",
      onKeyDown: v,
      children: [
        e.collapsible ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-RsQD74qC wx-collapse",
            role: "button",
            "aria-label": e.collapsed ? "Expand column" : "Collapse column",
            "aria-expanded": !e.collapsed,
            tabIndex: 0,
            onKeyDown: k,
            onClick: y,
            children: /* @__PURE__ */ g(
              "i",
              {
                className: `wx-RsQD74qC wxi-angle-${e.collapsed ? "down" : "right"}`
              }
            )
          }
        ) : null,
        e.cell ? (() => {
          const R = e.cell;
          return /* @__PURE__ */ g(
            R,
            {
              api: c,
              cell: _(),
              column: n,
              row: r,
              onAction: ({ action: F, data: oe }) => c.exec(F, oe)
            }
          );
        })() : e.filter ? /* @__PURE__ */ g(Rc, { filter: e.filter, column: n }) : /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: M,
            onClick: (R) => R.stopPropagation(),
            children: /* @__PURE__ */ g("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ U(He, { children: [
          typeof u.index < "u" ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-order", children: u.index + 1 }) : null,
          /* @__PURE__ */ g(
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
function Ac({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = $e(tt), o = C(
    () => zn(
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
  ), a = C(
    () => Lo(e, t, r),
    [e, t, r]
  ), i = E(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${a || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ g("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? Fo.createElement(t.cell, {
    api: s,
    cell: i(),
    column: e,
    row: n,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ g("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function xs({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const a = $e(tt), i = J(a, "_sizes"), l = J(a, "split"), c = C(() => i?.[`${r}RowHeights`], [i, r]), d = C(() => {
    let h = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        h.push([]), n.forEach((k, v) => {
          const D = { ...k[r][x] };
          if (y || h[x].push(D), D.colspan > 1) {
            if (y = D.colspan - 1, !_o() && k.right) {
              let $ = k.right;
              for (let N = 1; N < D.colspan; N++)
                $ -= n[v + N].width;
              D.right = $;
            }
          } else y && y--;
        });
      }
    }
    return h;
  }, [n, r]), u = C(() => l?.left || l?.right, [l]);
  function f(h) {
    return n.find((w) => w.id === h);
  }
  function p(h, w) {
    let x = w;
    return h.rowspan && (x += h.rowspan - 1), x === d.length - 1;
  }
  function m(h, w, x) {
    if (!x.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const k = x.header[y];
      if (!k.filter && !k._hidden) return w === y;
    }
    return p(h, w);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((h, w) => /* @__PURE__ */ g(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[w]}px`, display: "flex" },
          role: "row",
          children: h.map((x) => {
            const y = f(x.id);
            return r === "header" ? /* @__PURE__ */ g(
              Ic,
              {
                cell: x,
                columnStyle: s,
                column: y,
                row: w,
                lastRow: p(x, w),
                bodyHeight: o,
                sortRow: m(x, w, y),
                hasSplit: u
              },
              x.id
            ) : /* @__PURE__ */ g(
              Ac,
              {
                cell: x,
                columnStyle: s,
                column: f(x.id),
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
function Hc({ overlay: t }) {
  const e = $e(tt);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ g("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ g(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Lc(t) {
  const { actions: e, editor: n } = t, [r, s] = B(n?.value || ""), o = W(null);
  O(() => {
    o.current && o.current.focus();
  }, []);
  function a() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function i({ key: l }) {
    l === "Enter" && e.save();
  }
  return /* @__PURE__ */ g(
    "input",
    {
      className: "wx-e7Ao5ejY wx-text",
      onInput: a,
      onKeyDown: i,
      ref: o,
      type: "text",
      value: r
    }
  );
}
function zc({ actions: t, editor: e, onAction: n }) {
  const [r, s] = B(e?.value), [o, a] = B(e?.renderedValue), [i, l] = B(e?.options || []), c = C(() => e?.config?.template, [e]), d = C(() => e?.config?.cell, [e]), u = C(() => (i || []).findIndex((y) => y.id === r), [i, r]), f = W(null), p = W(null), m = E(
    (y) => {
      f.current = y.navigate, p.current = y.keydown, f.current(u);
    },
    [u, f]
  ), h = E(
    (y) => {
      const k = y?.target?.value ?? "";
      a(k);
      const v = k ? (e?.options || []).filter(
        (D) => (D.label || "").toLowerCase().includes(k.toLowerCase())
      ) : e?.options || [];
      l(v), v.length ? f.current(-1 / 0) : f.current(null);
    },
    [e]
  ), w = W(null);
  O(() => {
    w.current && w.current.focus();
  }, []), O(() => {
    s(e?.value), a(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = E(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: w,
        value: o ?? "",
        onChange: h,
        onKeyDown: (y) => p.current ? p.current(y, u) : void 0
      }
    ),
    /* @__PURE__ */ g(
      Rn,
      {
        items: i,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ g(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Wc({ actions: t, editor: e, onAction: n }) {
  const [r] = B(() => e.value || /* @__PURE__ */ new Date()), [s] = B(() => e.config?.template), [o] = B(() => e.config?.cell);
  function a({ value: l }) {
    t.updateValue(l), t.save();
  }
  const i = W(null);
  return O(() => {
    i.current && i.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: i,
        tabIndex: 0,
        onClick: () => t.cancel(),
        onKeyDown: (l) => l.preventDefault(),
        children: s ? s(r) : o ? /* @__PURE__ */ g(o, { data: e.value, onAction: n }) : /* @__PURE__ */ g("span", { className: "wx-lNWNYUb6 wx-text", children: e.renderedValue })
      }
    ),
    /* @__PURE__ */ g(Wt, { width: "auto", children: /* @__PURE__ */ g(
      Es,
      {
        value: r,
        onChange: a,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Pc(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = B(
    n.options.find((h) => h.id === n.value)
  ), [a] = B(n.value), [i] = B(n.options), l = C(
    () => i.findIndex((h) => h.id === a),
    [i, a]
  );
  function c({ id: h }) {
    e.updateValue(h), e.save();
  }
  let d;
  const [u, f] = B();
  function p(h) {
    d = h.navigate, f(() => h.keydown), d(l);
  }
  const m = W(null);
  return O(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        ref: m,
        className: "wx-ywGRk611 wx-value",
        tabIndex: 0,
        onClick: () => e.cancel(),
        onKeyDown: (h) => {
          u(h, l), h.preventDefault();
        },
        children: s.template ? s.template(o) : s.cell ? (() => {
          const h = s.cell;
          return /* @__PURE__ */ g(h, { data: o, onAction: r });
        })() : /* @__PURE__ */ g("span", { className: "wx-ywGRk611 wx-text", children: n.renderedValue })
      }
    ),
    /* @__PURE__ */ g(Rn, { items: i, onReady: p, onSelect: c, children: ({ option: h }) => s.template ? s.template(h) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ g(w, { data: h, onAction: r });
    })() : h.label })
  ] });
}
const Fc = {
  text: Lc,
  combo: zc,
  datepicker: Wc,
  richselect: Pc
};
function Oc({ column: t, row: e }) {
  const n = $e(tt), r = J(n, "editor"), s = E(
    (m, h) => {
      n.exec("close-editor", { ignore: m }), h && n.exec("focus-cell", {
        ...h,
        eventSource: "click"
      });
    },
    [n]
  ), o = E(
    (m) => {
      const h = m ? null : { row: r?.id, column: r?.column };
      s(!1, h);
    },
    [r, s]
  ), a = E(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), i = E(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), l = E(
    (m) => {
      m.key === "Enter" && r && a();
    },
    [r, a]
  ), c = C(
    () => zn(
      t.width,
      t.flexgrow,
      t.fixed,
      t.left,
      t.right
    ),
    [t.width, t.flexgrow, t.fixed, t.left, t.right]
  ), d = C(() => {
    let m = t.editor;
    typeof m == "function" && (m = m(e, t));
    let h = typeof m == "string" ? m : m.type;
    return Fc[h];
  }, [t, e]), u = W(null);
  O(() => {
    if (!u.current) return;
    const m = tn(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), O(() => {
    u.current && typeof c == "string" && u.current.setAttribute("style", c);
  }, [c]);
  const f = typeof e.$parent < "u" ? "gridcell" : "cell", p = typeof e.$parent < "u" ? !t.editor : void 0;
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-8l724t2g wx-cell wx-editor",
      ref: u,
      style: typeof c == "object" && c !== null ? c : void 0,
      role: f,
      "aria-readonly": p,
      tabIndex: -1,
      onClick: (m) => m.stopPropagation(),
      onDoubleClick: (m) => m.stopPropagation(),
      onKeyDown: l,
      children: d ? /* @__PURE__ */ g(
        d,
        {
          editor: r,
          actions: { save: o, cancel: a, updateValue: i },
          onAction: ({ action: m, data: h }) => n.exec(m, h)
        }
      ) : null
    }
  );
}
function ys(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = $e(tt), { filterValues: o, _columns: a, _sizes: i } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ g(He, { children: e.map((c, d) => /* @__PURE__ */ g("tr", { children: c.map((u) => {
    const f = a.find((h) => h.id == u.id), p = `wx-print-cell-${n}${l(f)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ g(
      "th",
      {
        style: Ts($o(u, i.columnWidth)),
        className: "wx-Gy81xq2u " + p,
        rowSpan: u.rowspan,
        colSpan: u.colspan,
        children: m ? /* @__PURE__ */ g(
          m,
          {
            api: s,
            cell: Object.fromEntries(
              Object.entries(u).filter(([h]) => h !== "cell")
            ),
            column: f,
            row: d
          }
        ) : u.filter ? /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-print-filter", children: Rl(o, a, u) }) : /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Yc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: a, reorder: i } = t, l = $e(tt), { flatData: c, _sizes: d } = l.getState(), u = o && ds(e, "header", d.headerRowHeights), f = a && ds(e, "footer", d.footerRowHeights);
  function p(h, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(h, w) : "", x;
  }
  function m(h, w) {
    return typeof w.draggable == "function" ? w.draggable(h, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ U(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ g("thead", { children: /* @__PURE__ */ g(
          ys,
          {
            columns: u,
            type: "header",
            columnStyle: r
          }
        ) }) : null,
        /* @__PURE__ */ g("tbody", { children: c.map((h, w) => /* @__PURE__ */ g(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(h) : ""),
            style: { height: `${h.rowHeight || d.rowHeight}px` },
            children: e.map(
              (x) => x.collapsed ? null : /* @__PURE__ */ U(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${p(h, x)}`,
                  style: Ts(
                    $o(x, d.columnWidth)
                  ),
                  children: [
                    i && x.draggable ? /* @__PURE__ */ g("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(h, x) ? /* @__PURE__ */ g("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ U(He, { children: [
                      /* @__PURE__ */ g(
                        "span",
                        {
                          style: { marginLeft: h.$level * 28 + "px" }
                        }
                      ),
                      h.$count ? /* @__PURE__ */ g(
                        "i",
                        {
                          className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${h.open !== !1 ? "down" : "right"}`
                        }
                      ) : null
                    ] }) : null,
                    x.cell ? (() => {
                      const y = x.cell;
                      return /* @__PURE__ */ g(y, { api: l, row: h, column: x });
                    })() : /* @__PURE__ */ g("span", { children: gt(h, x) })
                  ]
                },
                x.id
              )
            )
          },
          w
        )) }),
        a ? /* @__PURE__ */ g("tfoot", { children: /* @__PURE__ */ g(
          ys,
          {
            columns: f,
            type: "footer",
            columnStyle: r
          }
        ) }) : null
      ]
    }
  );
}
function Vc(t) {
  const { config: e, ...n } = t, r = $e(tt), { _skin: s, _columns: o } = r.getState(), a = C(() => Tl(o, e), []), i = W(null);
  return O(() => {
    const l = document.body;
    l.classList.add("wx-print");
    const c = i.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    l.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, f = document.createElement("style");
    f.setAttribute("type", "text/css"), f.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(f), f.appendChild(document.createTextNode(u)), window.print(), f.remove(), l.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ g(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: i,
      children: a.map((l, c) => /* @__PURE__ */ g("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ g(Yc, { columns: l, ...n }) }, c))
    }
  );
}
function Gc(t) {
  const {
    header: e,
    footer: n,
    overlay: r,
    multiselect: s,
    onreorder: o,
    rowStyle: a,
    columnStyle: i,
    cellStyle: l,
    autoRowHeight: c,
    resize: d,
    clientWidth: u,
    clientHeight: f,
    responsiveLevel: p,
    hotkeys: m
  } = t, h = $e(tt), w = J(h, "dynamic"), x = J(h, "_columns"), y = J(h, "flatData"), k = J(h, "split"), v = J(h, "_sizes"), [D, $] = Xt(h, "selectedRows"), N = J(h, "select"), T = J(h, "editor"), Y = J(h, "tree"), _ = J(h, "focusCell"), I = J(h, "_print"), H = J(h, "undo"), M = J(h, "reorder"), R = J(h, "_rowHeightFromData"), [F, oe] = B(0);
  O(() => {
    oe(dn());
  }, []);
  const [he, K] = B(0), [ue, ke] = B(0), A = C(() => (x || []).some((S) => !S.hidden && S.flexgrow), [x]), re = C(() => v?.rowHeight || 0, [v]), ye = W(null), [fe, se] = B(null), [V, ie] = B(null), Q = C(() => {
    let S = [], z = 0;
    return k && k.left && (S = (x || []).slice(0, k.left).filter((G) => !G.hidden).map((G) => ({ ...G })), S.forEach((G) => {
      G.fixed = { left: 1 }, G.left = z, z += G.width;
    }), S.length && (S[S.length - 1].fixed = { left: -1 })), { columns: S, width: z };
  }, [k, x]), ce = C(() => {
    let S = [], z = 0;
    if (k && k.right) {
      S = (x || []).slice(k.right * -1).filter((G) => !G.hidden).map((G) => ({ ...G }));
      for (let G = S.length - 1; G >= 0; G--) {
        const ve = S[G];
        ve.fixed = { right: 1 }, ve.right = z, z += ve.width;
      }
      S.length && (S[0].fixed = { right: -1 });
    }
    return { columns: S, width: z };
  }, [k, x]), q = C(() => {
    const S = (x || []).slice(k?.left || 0, (x || []).length - (k?.right ?? 0)).filter((z) => !z.hidden);
    return S.forEach((z) => {
      z.fixed = 0;
    }), S;
  }, [x, k]), ae = C(() => (x || []).reduce((S, z) => (z.hidden || (S += z.width), S), 0), [x]), ze = 1;
  function te(S, z, G) {
    let ve = z, Ie = S;
    if (q.length) {
      let Me = q.length;
      for (let me = S; me >= 0; me--)
        q[me][G].forEach((Ce) => {
          Ce.colspan > 1 && me > S - Ce.colspan && me < Me && (Me = me);
        });
      if (Me !== q.length && Me < S) {
        for (let me = Me; me < S; me++)
          ve -= q[me].width;
        Ie = Me;
      }
    }
    return { index: Ie, delta: ve };
  }
  const de = C(() => {
    let S, z, G;
    const ve = he, Ie = he + (u || 0);
    let Me = 0, me = 0, Ce = 0, Be = 0;
    q.forEach((xt, Dt) => {
      ve > Ce && (Me = Dt, Be = Ce), Ce = Ce + xt.width, Ie > Ce && (me = Dt + ze);
    });
    const qe = { header: 0, footer: 0 };
    for (let xt = me; xt >= Me; xt--)
      ["header", "footer"].forEach((Dt) => {
        q[xt] && q[xt][Dt].forEach((Po) => {
          const Pn = Po.colspan;
          if (Pn && Pn > 1) {
            const Rr = Pn - (me - xt + 1);
            Rr > 0 && (qe[Dt] = Math.max(qe[Dt], Rr));
          }
        });
      });
    const Fe = te(Me, Be, "header"), st = te(Me, Be, "footer"), Tt = Fe.delta, Vt = Fe.index, Gt = st.delta, Bt = st.index;
    return A && ae > (u || 0) ? S = z = G = [...Q.columns, ...q, ...ce.columns] : (S = [
      ...Q.columns,
      ...q.slice(Me, me + 1),
      ...ce.columns
    ], z = [
      ...Q.columns,
      ...q.slice(Vt, me + qe.header + 1),
      ...ce.columns
    ], G = [
      ...Q.columns,
      ...q.slice(Bt, me + qe.footer + 1),
      ...ce.columns
    ]), {
      data: S || [],
      header: z || [],
      footer: G || [],
      d: Be,
      df: Gt,
      dh: Tt
    };
  }, [
    q,
    Q,
    ce,
    he,
    u,
    A,
    ae
  ]), Se = C(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), _e = C(
    () => n && v?.footerHeight || 0,
    [n, v]
  ), Pe = C(() => u && f ? ae >= u : !1, [u, f, ae]), j = C(() => (f || 0) - Se - _e - (Pe ? F : 0), [f, Se, _e, Pe, F]), be = C(() => Math.ceil((j || 0) / (re || 1)) + 1, [j, re]), Ee = W([]), [pe, xe] = B(0), [Ae, Le] = B(void 0), Te = C(() => {
    let S = 0, z = 0;
    const G = 2;
    if (c) {
      let Me = ue;
      for (; Me > 0; )
        Me -= Ee.current[S] || re, S++;
      z = ue - Me;
      for (let me = Math.max(0, S - G - 1); me < S; me++)
        z -= Ee.current[S - me] || re;
      S = Math.max(0, S - G);
    } else {
      if (R) {
        let Me = 0, me = 0;
        for (let Fe = 0; Fe < (y || []).length; Fe++) {
          const st = y[Fe].rowHeight || re;
          if (me + st > ue) {
            Me = Fe;
            break;
          }
          me += st;
        }
        S = Math.max(0, Me - G);
        for (let Fe = 0; Fe < S; Fe++)
          z += y[Fe].rowHeight || re;
        let Ce = 0, Be = 0;
        for (let Fe = Me + 1; Fe < (y || []).length; Fe++) {
          const st = y[Fe].rowHeight || re;
          if (Ce++, Be + st > j)
            break;
          Be += st;
        }
        const qe = Math.min(
          w ? w.rowCount : (y || []).length,
          Me + Ce + G
        );
        return { d: z, start: S, end: qe };
      }
      S = Math.floor(ue / (re || 1)), S = Math.max(0, S - G), z = S * (re || 0);
    }
    const ve = w ? w.rowCount : (y || []).length, Ie = Math.min(ve, S + (be || 0) + G);
    return { d: z, start: S, end: Ie };
  }, [c, R, ue, re, w, y, be, j]), We = C(() => {
    const S = w ? w.rowCount : (y || []).length;
    if (c)
      return pe + Te.d + (S - (Ae || 0)) * (re || 0);
    if (!R)
      return S * (re || 0);
    let z = 0;
    for (let G = 0; G < S; G++)
      z += y[G]?.rowHeight || re;
    return z;
  }, [
    w,
    y,
    re,
    c,
    R,
    pe,
    Te.d,
    Ae
  ]), Ye = C(() => u && f ? We + Se + _e >= f - (ae >= (u || 0) ? F : 0) : !1, [
    u,
    f,
    We,
    Se,
    _e,
    ae,
    F
  ]), et = C(() => A && ae <= (u || 0) ? (u || 0) - 0 - (Ye ? F : 0) : ae, [A, ae, u, Ye, F, Pe]), L = C(() => A && ae <= (u || 0) ? u || 0 : et < (u || 0) ? ae + (Ye ? F : 0) : -1, [A, ae, u, et, Ye, F]), X = W({});
  O(() => {
    if (w && (X.current.start !== Te.start || X.current.end !== Te.end)) {
      const { start: S, end: z } = Te;
      X.current = { start: S, end: z }, h && h.exec && h.exec("request-data", { row: { start: S, end: z } });
    }
  }, [w, Te, h]);
  const ee = C(() => w ? y || [] : (y || []).slice(Te.start, Te.end), [w, y, Te]), ge = C(() => (D || []).filter(
    (S) => (ee || []).some((z) => z.id === S)
  ), [$, ee]), De = C(() => Te.start, [Te.start]), Re = E((S) => {
    ke(S.target.scrollTop), K(S.target.scrollLeft);
  }, []), Ve = E((S) => {
    S.shiftKey && S.preventDefault(), ye.current && ye.current.focus && ye.current.focus();
  }, []), Ue = E(() => !!(x || []).find((S) => !!S.draggable), [x]), Ft = W(null), ht = W(null), Wn = W({
    dblclick: (S, z) => {
      const G = { id: S, column: Jn(z, "data-col-id") };
      h.exec("open-editor", G);
    },
    click: (S, z) => {
      if (Ft.current) return;
      const G = Jn(z, "data-col-id");
      if (_?.id !== S && h.exec("focus-cell", {
        row: S,
        column: G,
        eventSource: "click"
      }), N === !1) return;
      const ve = s && z.ctrlKey, Ie = s && z.shiftKey;
      (ve || D.length > 1 || !D.includes(S)) && h.exec("select-row", { id: S, toggle: ve, range: Ie });
    },
    "toggle-row": (S) => {
      const z = h.getRow(S);
      h.exec(z.open !== !1 ? "close-row" : "open-row", { id: S });
    },
    "ignore-click": () => !1
  }), wt = C(() => ({
    top: Se,
    bottom: _e,
    left: Q.width,
    xScroll: Pe,
    yScroll: Ye,
    sense: c && V ? V.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: ye.current && ye.current.firstElementChild
  }), [
    Se,
    _e,
    Q.width,
    Pe,
    Ye,
    c,
    V,
    v
  ]);
  function ln(S, z) {
    const { container: G, sourceNode: ve, from: Ie } = z;
    if (Ue() && !ve.getAttribute("draggable-data"))
      return !1;
    se(Ie), h.getRow(Ie).open && h.exec("close-row", { id: Ie, nested: !0 });
    const Me = Ke(ve, "data-id"), me = Me.cloneNode(!0);
    me.classList.remove("wx-selected"), me.querySelectorAll("[tabindex]").forEach((Fe) => Fe.setAttribute("tabindex", "-1")), G.appendChild(me), ie(me);
    const Ce = he - de.d, Be = Ye ? F : 0;
    G.style.width = Math.min(
      (u || 0) - Be,
      A && ae <= (u || 0) ? et : et - Be
    ) + Ce + "px";
    const qe = Sn(Me);
    z.offset = {
      x: Ce,
      y: -Math.round(qe.height / 2)
    }, ht.current || (ht.current = S.clientY);
  }
  function cn(S, z) {
    const { from: G } = z, ve = z.pos, Ie = Sn(ye.current);
    ve.x = Ie.x;
    const Me = wt.top;
    if (ve.y < Me) ve.y = Me;
    else {
      const me = Ie.height - (Pe && F > 0 ? F : Math.round(wt.sense / 2)) - wt.bottom;
      ve.y > me && (ve.y = me);
    }
    if (ye.current.contains(z.targetNode)) {
      const me = Ke(z.targetNode, "data-id"), Ce = Lt(me?.getAttribute("data-id"));
      if (Ce && Ce !== G) {
        z.to = Ce;
        const Be = c ? V?.offsetHeight : v?.rowHeight;
        if (V && (ue === 0 || ve.y > Me + Be - 1)) {
          const qe = me.getBoundingClientRect(), Fe = Sn(V).y, st = qe.y, Tt = Fe > st ? -1 : 1, Vt = Tt === 1 ? "after" : "before", Gt = Math.abs(h.getRowIndex(G) - h.getRowIndex(Ce)), Bt = Gt !== 1 ? Vt === "before" ? "after" : "before" : Vt;
          if (Gt === 1 && (Tt === -1 && S.clientY > ht.current || Tt === 1 && S.clientY < ht.current))
            return;
          ht.current = S.clientY, h.exec("move-item", {
            id: G,
            target: Ce,
            mode: Bt,
            inProgress: !0
          });
        }
      }
      o && o({ event: S, context: z });
    }
    Sc(S, Ie, z, wt);
  }
  function Ot(S, z) {
    const { from: G, to: ve } = z;
    h.exec("move-item", {
      id: G,
      target: ve,
      inProgress: !1
    }), Ft.current = setTimeout(() => {
      Ft.current = 0;
    }, 1), se(null), ie(null), ht.current = null, Ao(z);
  }
  function dn() {
    const S = document.createElement("div");
    S.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(S);
    const z = S.offsetWidth - S.clientWidth;
    return document.body.removeChild(S), z;
  }
  const un = C(() => L > 0 ? { width: `${L}px` } : void 0, [L]), Yt = W(null);
  function fn() {
    Promise.resolve().then(() => {
      let S = 0, z = De;
      const G = Yt.current;
      G && (Array.from(G.children).forEach((ve, Ie) => {
        Ee.current[De + Ie] = ve.offsetHeight, S += ve.offsetHeight, z++;
      }), xe(S), Le(z));
    });
  }
  O(() => {
    ee && c && fn();
  }, [ee, c, De]);
  let [at, b] = B();
  O(() => {
    if (_ && (!N || !ge.length || ge.includes(_.row)))
      b({ ..._ });
    else if (ee.length && de.data.length) {
      if (!at || ge.length && !ge.includes(at.row) || ee.findIndex((S) => S.id == at.row) === -1 || de.data.findIndex(
        (S) => S.id == at.column && !S.collapsed
      ) === -1) {
        const S = ge[0] || ee[0].id, z = de.data.findIndex((G) => !G.collapsed);
        b(z !== -1 ? { row: S, column: de.data[z].id } : null);
      }
    } else b(null);
  }, [_]);
  const P = W(null);
  O(() => {
    const S = ye.current;
    if (!S) return;
    const z = wc(S, d);
    return () => {
      typeof z == "function" && z();
    };
  }, [d]);
  const Z = W({});
  Object.assign(Z.current, {
    start: ln,
    move: cn,
    end: Ot,
    getReorder: () => M,
    getDraggableInfo: () => ({ hasDraggable: Ue() })
  }), O(() => {
    const S = ye.current;
    return S ? vc(S, Z).destroy : void 0;
  }, [M, ye.current]), O(() => {
    const S = ye.current;
    return S ? Dr(S, {
      keys: m !== !1 && {
        ...Zl,
        "ctrl+z": H,
        "ctrl+y": H,
        ...m
      },
      exec: (z) => h.exec("hotkey", z)
    }).destroy : void 0;
  }, [h, H, m]);
  const ne = W({
    scroll: h.getReactiveState().scroll
  });
  ne.current.getWidth = () => (u || 0) - (Ye ? F : 0), ne.current.getHeight = () => j, ne.current.getScrollMargin = () => Q.width + ce.width, O(() => {
    Jl(P.current, ne.current);
  }, []);
  const le = W(null);
  O(() => {
    const S = le.current;
    if (!S) return;
    const z = [];
    return z.push(
      tn(S, () => h.exec("focus-cell", { eventSource: "click" })).destroy
    ), z.push(ii(S, Wn.current)), () => z.forEach((G) => G());
  }, []);
  const we = `wx-grid ${p ? `wx-responsive-${p}` : ""}`;
  return /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-4VuBwK2D " + we,
        style: {
          "--header-height": `${Se}px`,
          "--footer-height": `${_e}px`,
          "--split-left-width": `${Q.width}px`,
          "--split-right-width": `${ce.width}px`
        },
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: ye,
            className: "wx-4VuBwK2D wx-table-box",
            style: un,
            role: Y ? "treegrid" : "grid",
            "aria-colcount": de.data.length,
            "aria-rowcount": ee.length,
            "aria-multiselectable": Y && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ U(
              "div",
              {
                ref: P,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: Pe ? "scroll" : "hidden",
                  overflowY: Ye ? "scroll" : "hidden"
                },
                onScroll: Re,
                children: [
                  e ? /* @__PURE__ */ g("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ g(
                    xs,
                    {
                      contentWidth: et,
                      deltaLeft: de.dh,
                      columns: de.header,
                      columnStyle: i,
                      bodyHeight: j - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ U(
                    "div",
                    {
                      ref: le,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${et}px`, height: `${We}px` },
                      onMouseDown: (S) => Ve(S),
                      children: [
                        r ? /* @__PURE__ */ g(Hc, { overlay: r }) : null,
                        /* @__PURE__ */ g(
                          "div",
                          {
                            ref: Yt,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Te.d}px`,
                              paddingLeft: `${de.d}px`
                            },
                            children: ee.map((S, z) => {
                              const G = D.indexOf(S.id) !== -1, ve = fe === S.id, Ie = "wx-row" + (c ? " wx-autoheight" : "") + (a ? " " + a(S) : "") + (G ? " wx-selected" : "") + (ve ? " wx-inactive" : ""), Me = c ? { minHeight: `${S.rowHeight || re}px` } : { height: `${S.rowHeight || re}px` };
                              return /* @__PURE__ */ g(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + Ie,
                                  "data-id": S.id,
                                  "data-context-id": S.id,
                                  style: Me,
                                  role: "row",
                                  "aria-rowindex": z,
                                  "aria-expanded": S.open,
                                  "aria-level": Y ? S.$level + 1 : void 0,
                                  "aria-selected": Y ? G : void 0,
                                  tabIndex: -1,
                                  children: de.data.map((me) => me.collapsed ? /* @__PURE__ */ g(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    me.id
                                  ) : T?.id === S.id && T.column == me.id ? /* @__PURE__ */ g(Oc, { row: S, column: me }, me.id) : /* @__PURE__ */ g(
                                    Tc,
                                    {
                                      row: S,
                                      column: me,
                                      columnStyle: i,
                                      cellStyle: l,
                                      reorder: M,
                                      focusable: at?.row === S.id && at?.column == me.id
                                    },
                                    me.id
                                  ))
                                },
                                S.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ g(
                    xs,
                    {
                      type: "footer",
                      contentWidth: et,
                      deltaLeft: de.df,
                      columns: de.footer,
                      columnStyle: i
                    }
                  ) : null
                ]
              }
            )
          }
        )
      }
    ),
    I ? /* @__PURE__ */ g(
      Vc,
      {
        config: I,
        rowStyle: a,
        columnStyle: i,
        cellStyle: l,
        header: e,
        footer: n,
        reorder: M
      }
    ) : null
  ] });
}
const Bc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), jc = _t(function({
  data: t = [],
  columns: e = [],
  rowStyle: n = null,
  columnStyle: r = null,
  cellStyle: s = null,
  selectedRows: o,
  select: a = !0,
  multiselect: i = !1,
  header: l = !0,
  footer: c = !1,
  dynamic: d = null,
  overlay: u = null,
  reorder: f = !1,
  onReorder: p = null,
  autoRowHeight: m = !1,
  sizes: h,
  split: w,
  tree: x = !1,
  autoConfig: y = !1,
  init: k = null,
  responsive: v = null,
  sortMarks: D,
  undo: $ = !1,
  hotkeys: N = null,
  ...T
}, Y) {
  const _ = W();
  _.current = T;
  const I = C(() => new jl(Ds), []), H = C(() => I.in, [I]), M = W(null);
  M.current === null && (M.current = new Ls((Q, ce) => {
    const q = "on" + Bc(Q);
    _.current && _.current[q] && _.current[q](ce);
  }), H.setNext(M.current));
  const R = C(
    () => ({
      getState: I.getState.bind(I),
      getReactiveState: I.getReactive.bind(I),
      getStores: () => ({ data: I }),
      exec: H.exec,
      setNext: (Q) => (M.current = M.current.setNext(Q), M.current),
      intercept: H.intercept.bind(H),
      on: H.on.bind(H),
      detach: H.detach.bind(H),
      getRow: I.getRow.bind(I),
      getRowIndex: I.getRowIndex.bind(I),
      getColumn: I.getColumn.bind(I)
    }),
    [I, H]
  ), [F, oe] = B(0), [he, K] = B(0), [ue, ke] = B(null), [A, re] = B(null), ye = C(() => {
    if (y && !e.length && t.length) {
      const Q = t[0], ce = [];
      for (let q in Q)
        if (q !== "id" && q[0] !== "$") {
          let ae = {
            id: q,
            header: q[0].toUpperCase() + q.slice(1)
          };
          typeof y == "object" && (ae = { ...ae, ...y }), ce.push(ae);
        }
      return ce;
    }
    return (A && A.columns) ?? e;
  }, [y, e, t, A]), fe = C(
    () => (A && A.sizes) ?? h,
    [A, h]
  ), se = E(
    (Q) => {
      if (oe(Q.width), K(Q.height), v) {
        const ce = Object.keys(v).map(Number).sort((q, ae) => q - ae).find((q) => Q.width <= q) ?? null;
        ce !== ue && (re(v[ce]), ke(ce));
      }
    },
    [v, ue]
  ), V = $e(Je.theme), ie = W(0);
  return O(() => {
    if (!ie.current)
      k && k(R);
    else {
      const Q = I.getState();
      I.init({
        data: t,
        columns: ye,
        split: w || Q.split,
        sizes: fe || Q.sizes,
        selectedRows: o || Q.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: D || Q.sortMarks,
        undo: $,
        reorder: f,
        _skin: V,
        _select: a
      });
    }
    ie.current++;
  }, [
    I,
    t,
    ye,
    w,
    fe,
    o,
    d,
    x,
    D,
    $,
    f,
    V,
    a,
    k,
    R
  ]), ie.current === 0 && I.init({
    data: t,
    columns: ye,
    split: w || { left: 0 },
    sizes: fe || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: D || {},
    undo: $,
    reorder: f,
    _skin: V,
    select: a
  }), Ct(
    Y,
    () => ({
      ...R
    }),
    [R]
  ), /* @__PURE__ */ g(tt.Provider, { value: R, children: /* @__PURE__ */ g(In, { words: nc, optional: !0, children: /* @__PURE__ */ g(
    Gc,
    {
      header: l,
      footer: c,
      overlay: u,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      onReorder: p,
      multiselect: i,
      autoRowHeight: m,
      clientWidth: F,
      clientHeight: he,
      responsiveLevel: ue,
      resize: se,
      hotkeys: N
    }
  ) }) });
});
function Kc({ item: t }) {
  return /* @__PURE__ */ U(
    "div",
    {
      tabIndex: -1,
      role: "menuitem",
      "aria-label": t.hidden ? `Show ${t.text} column` : `Hide ${t.text} column`,
      children: [
        /* @__PURE__ */ g(
          "div",
          {
            className: "wx-v13lZxja wx-icon" + (t.hidden ? " wx-hidden" : ""),
            children: /* @__PURE__ */ g("i", { className: "wx-v13lZxja wxi-eye" })
          }
        ),
        /* @__PURE__ */ g("span", { children: t.text })
      ]
    }
  );
}
function Uc({ columns: t = null, api: e, children: n }) {
  O(() => {
    ic("table-header", Kc);
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
  const a = lt(e, "_columns"), i = C(() => {
    if (e) {
      const l = Array.isArray(a) ? a : [];
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
  }, [e, t, a]);
  return /* @__PURE__ */ g(
    Mo,
    {
      dataKey: "headerId",
      options: i,
      onClick: s,
      at: "point",
      resolver: o,
      children: typeof n == "function" ? n() : n
    }
  );
}
pr(Ze);
function qc({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ U("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
    t.data || t.lazy ? /* @__PURE__ */ g(
      "i",
      {
        className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? "down" : "right"}`,
        "data-action": "open-task"
      }
    ) : /* @__PURE__ */ g("i", { className: "wx-pqc08MHU wx-toggle-placeholder" }),
    /* @__PURE__ */ g("div", { className: "wx-pqc08MHU wx-text", children: r ? /* @__PURE__ */ g(r, { row: t, column: e }) : t.text })
  ] });
}
function vs({ column: t, cell: e }) {
  const n = C(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ g("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ g(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function Xc(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: a,
    multiTaskRows: i = !1,
    rowMapping: l = null
  } = t, [c, d] = Oe(o), [u, f] = B(), p = $e(Je.i18n), m = C(() => p.getGroup("gantt"), [p]), h = $e(mt), w = J(h, "scrollTop"), x = J(h, "cellHeight"), y = J(h, "_scrollTask"), k = J(h, "_selected"), v = J(h, "area"), D = J(h, "_tasks"), $ = J(h, "_scales"), N = J(h, "columns"), T = J(h, "_sort"), Y = J(h, "calendar"), _ = J(h, "durationUnit"), I = J(h, "splitTasks"), [H, M] = B(null), R = C(() => !D || !v ? [] : i && l ? D : D.slice(v.start, v.end), [D, v, i, l]), F = E(
    (L, X) => {
      if (X === "add-task")
        h.exec(X, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (X === "open-task") {
        const ee = R.find((ge) => ge.id === L);
        (ee?.data || ee?.lazy) && h.exec(X, { id: L, mode: !ee.open });
      }
    },
    [R]
  ), oe = E(
    (L) => {
      const X = kt(L), ee = L.target.dataset.action;
      ee && L.preventDefault(), X ? ee === "add-task" || ee === "open-task" ? F(X, ee) : h.exec("select-task", {
        id: X,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : ee === "add-task" && F(null, ee);
    },
    [h, F]
  ), he = W(null), K = W(null), [ue, ke] = B(0), [A, re] = B(!1);
  O(() => {
    const L = K.current;
    if (!L || typeof ResizeObserver > "u") return;
    const X = () => ke(L.clientWidth);
    X();
    const ee = new ResizeObserver(X);
    return ee.observe(L), () => ee.disconnect();
  }, []);
  const ye = W(null), fe = E(
    (L) => {
      const X = L.id, { before: ee, after: ge } = L, De = L.onMove;
      let Re = ee || ge, Ve = ee ? "before" : "after";
      if (De) {
        if (Ve === "after") {
          const Ue = h.getTask(Re);
          Ue.data?.length && Ue.open && (Ve = "before", Re = Ue.data[0].id);
        }
        ye.current = { id: X, [Ve]: Re };
      } else ye.current = null;
      h.exec("move-task", {
        id: X,
        mode: Ve,
        target: Re,
        inProgress: De
      });
    },
    [h]
  ), se = C(() => v?.from ?? 0, [v]), V = C(() => $?.height ?? 0, [$]), ie = C(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ue ?? 0), [n, s, c, r, ue]), Q = C(() => {
    const L = {};
    return ie && s === "all" || s === "grid" && ie ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [ie, s, c]), ce = C(() => H && !R.find((L) => L.id === H.id) ? [...R, H] : R, [R, H]), q = C(() => {
    if (!i || !l) return ce;
    const L = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set();
    return ce.forEach((ee) => {
      const ge = l.taskRows.get(ee.id) ?? ee.id;
      X.has(ge) || (L.set(ge, {
        ...ee,
        $rowTasks: l.rowMap.get(ge) || [ee.id]
      }), X.add(ge));
    }), Array.from(L.values());
  }, [ce, i, l]), ae = C(() => {
    let L = (N || []).map((ge) => {
      ge = { ...ge };
      const De = ge.header;
      if (typeof De == "object") {
        const Re = De.text && m(De.text);
        ge.header = { ...De, text: Re };
      } else ge.header = m(De);
      return ge;
    });
    const X = L.findIndex((ge) => ge.id === "text"), ee = L.findIndex((ge) => ge.id === "add-task");
    if (X !== -1 && (L[X].cell && (L[X]._cell = L[X].cell), L[X].cell = qc), ee !== -1) {
      L[ee].cell = L[ee].cell || vs;
      const ge = L[ee].header;
      if (typeof ge != "object" && (L[ee].header = { text: ge }), L[ee].header.cell = ge.cell || vs, e)
        L.splice(ee, 1);
      else if (n) {
        const [De] = L.splice(ee, 1);
        L.unshift(De);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [N, m, e, n]), ze = C(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : ae.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, ae]), te = C(() => {
    if (q && T?.length) {
      const L = {};
      return T.forEach(({ key: X, order: ee }, ge) => {
        L[X] = {
          order: ee,
          ...T.length > 1 && { index: ge }
        };
      }), L;
    }
    return {};
  }, [q, T]), de = E(() => ae.some((L) => L.flexgrow && !L.hidden), []), Se = C(() => de(), [de, A]), _e = C(() => {
    let L = s === "chart" ? ae.filter((ee) => ee.id === "add-task") : ae;
    const X = s === "all" ? r : ue;
    if (!Se) {
      let ee = c, ge = !1;
      if (ae.some((De) => De.$width)) {
        let De = 0;
        ee = ae.reduce((Re, Ve) => (Ve.hidden || (De += Ve.width, Re += Ve.$width || Ve.width), Re), 0), De > ee && ee > X && (ge = !0);
      }
      if (ge || ee < X) {
        let De = 1;
        return ge || (De = (X - 50) / (ee - 50 || 1)), L.map((Re) => (Re.id !== "add-task" && !Re.hidden && (Re.$width || (Re.$width = Re.width), Re.width = Re.$width * De), Re));
      }
    }
    return L;
  }, [s, ae, Se, c, r, ue]), Pe = E(
    (L) => {
      if (!de()) {
        const X = _e.reduce((ee, ge) => (L && ge.$width && (ge.$width = ge.width), ee + (ge.hidden ? 0 : ge.width)), 0);
        X !== c && d(X);
      }
      re(!0), re(!1);
    },
    [de, _e, c, d]
  ), j = E(() => {
    ae.filter((X) => X.flexgrow && !X.hidden).length === 1 && ae.forEach((X) => {
      X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
    });
  }, []), be = E(
    (L) => {
      if (!e) {
        const X = kt(L), ee = Jn(L, "data-col-id");
        !(ee && ae.find((De) => De.id == ee))?.editor && X && h.exec("show-editor", { id: X });
      }
    },
    [h, e]
    // cols is defined later; relies on latest value at call time
  ), Ee = C(
    () => Array.isArray(k) ? k.map((L) => L.id) : [],
    [k]
  ), pe = E(() => {
    if (he.current && q !== null) {
      const L = he.current.querySelector(".wx-body");
      L && (L.style.top = -((w ?? 0) - (se ?? 0)) + "px");
    }
    K.current && (K.current.scrollTop = 0);
  }, [q, w, se]);
  O(() => {
    he.current && pe();
  }, [w, se, pe]), O(() => {
    const L = he.current;
    if (!L) return;
    const X = L.querySelector(".wx-table-box .wx-body");
    if (!X || typeof ResizeObserver > "u") return;
    const ee = new ResizeObserver(() => {
      pe();
    });
    return ee.observe(X), () => {
      ee.disconnect();
    };
  }, [_e, Q, s, ze, q, pe]), O(() => {
    if (!y || !u) return;
    const { id: L } = y, X = u.getState().focusCell;
    X && X.row !== L && he.current && he.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: X.column
    });
  }, [y, u]);
  const xe = E(
    ({ id: L }) => {
      if (e) return !1;
      h.getTask(L).open && h.exec("open-task", { id: L, mode: !1 });
      const X = h.getState()._tasks.find((ee) => ee.id === L);
      if (M(X || null), !X) return !1;
    },
    [h, e]
  ), Ae = E(
    ({ id: L, top: X }) => {
      ye.current ? fe({ ...ye.current, onMove: !1 }) : h.exec("drag-task", {
        id: L,
        top: X + (se ?? 0),
        inProgress: !1
      }), M(null);
    },
    [h, fe, se]
  ), Le = E(
    ({ id: L, top: X, detail: ee }) => {
      ee && fe({ ...ee, onMove: !0 }), h.exec("drag-task", {
        id: L,
        top: X + (se ?? 0),
        inProgress: !0
      });
    },
    [h, fe, se]
  );
  O(() => {
    const L = he.current;
    return L ? tc(L, {
      start: xe,
      end: Ae,
      move: Le,
      getTask: h.getTask
    }).destroy : void 0;
  }, [h, xe, Ae, Le]);
  const Te = E(
    (L) => {
      const { key: X, isInput: ee } = L;
      if (!ee && (X === "arrowup" || X === "arrowdown"))
        return L.eventSource = "grid", h.exec("hotkey", L), !1;
      if (X === "enter") {
        const ge = u?.getState().focusCell;
        if (ge) {
          const { row: De, column: Re } = ge;
          Re === "add-task" ? F(De, "add-task") : Re === "text" && F(De, "open-task");
        }
      }
    },
    [h, F, u]
  ), We = W(null), Ye = () => {
    We.current = {
      setTableAPI: f,
      handleHotkey: Te,
      sortVal: T,
      api: h,
      adjustColumns: j,
      setColumnWidth: Pe,
      tasks: R,
      calendarVal: Y,
      durationUnitVal: _,
      splitTasksVal: I,
      onTableAPIChange: a
    };
  };
  Ye(), O(() => {
    Ye();
  }, [
    f,
    Te,
    T,
    h,
    j,
    Pe,
    R,
    Y,
    _,
    I,
    a
  ]);
  const et = E((L) => {
    f(L), L.intercept("hotkey", (X) => We.current.handleHotkey(X)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (X) => {
      const ee = We.current.sortVal, { key: ge, add: De } = X, Re = ee ? ee.find((Ue) => Ue.key === ge) : null;
      let Ve = "asc";
      return Re && (Ve = !Re || Re.order === "asc" ? "desc" : "asc"), h.exec("sort-tasks", {
        key: ge,
        order: Ve,
        add: De
      }), !1;
    }), L.on("resize-column", () => {
      We.current.setColumnWidth(!0);
    }), L.on("hide-column", (X) => {
      X.mode || We.current.adjustColumns(), We.current.setColumnWidth();
    }), L.intercept("update-cell", (X) => {
      const { id: ee, column: ge, value: De } = X, Re = We.current.tasks.find((Ve) => Ve.id === ee);
      if (Re) {
        const Ve = { ...Re };
        let Ue = De;
        Ue && !isNaN(Ue) && !(Ue instanceof Date) && (Ue *= 1), Ve[ge] = Ue, go(
          Ve,
          {
            calendar: We.current.calendarVal,
            durationUnit: We.current.durationUnitVal,
            splitTasks: We.current.splitTasksVal
          },
          ge
        ), h.exec("update-task", {
          id: ee,
          task: Ve
        });
      }
      return !1;
    }), a && a(L);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ze}` },
      ref: K,
      children: /* @__PURE__ */ g(
        "div",
        {
          ref: he,
          style: Q,
          className: "wx-rHj6070p wx-table",
          onClick: oe,
          onDoubleClick: be,
          children: /* @__PURE__ */ g(
            jc,
            {
              init: et,
              sizes: {
                rowHeight: x,
                headerHeight: (V ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: q,
              columns: _e,
              selectedRows: [...Ee],
              sortMarks: te
            }
          )
        }
      )
    }
  );
}
function Qc({ borders: t = "" }) {
  const e = $e(mt), n = J(e, "cellWidth"), r = J(e, "cellHeight"), s = W(null), [o, a] = B("#e4e4e4");
  O(() => {
    if (typeof getComputedStyle < "u" && s.current) {
      const l = getComputedStyle(s.current).getPropertyValue(
        "--wx-gantt-border"
      );
      a(l ? l.substring(l.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const i = {
    width: "100%",
    height: "100%",
    background: n != null && r != null ? `url(${ol(n, r, o, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ g("div", { ref: s, style: i });
}
function Zc({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = $e(mt), s = J(r, "_links"), o = J(r, "criticalPath"), a = W(null), i = E(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return O(() => {
    if (!n && e && a.current) {
      const l = (c) => {
        a.current && !a.current.contains(c.target) && i(c);
      };
      return document.addEventListener("click", l), () => {
        document.removeEventListener("click", l);
      };
    }
  }, [n, e, i]), /* @__PURE__ */ U("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (s || []).map((l) => {
      const c = "wx-dkx3NwEn wx-line" + (o && l.$critical ? " wx-critical" : "") + (n ? "" : " wx-line-selectable");
      return /* @__PURE__ */ g(
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
    !n && e && /* @__PURE__ */ g(
      "polyline",
      {
        ref: a,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: e.$p
      }
    )
  ] });
}
function Jc(t) {
  const { task: e, type: n } = t;
  function r(o) {
    const a = e.segments[o];
    return {
      left: `${a.$x}px`,
      top: "0px",
      width: `${a.$w}px`,
      height: "100%"
    };
  }
  function s(o) {
    if (!e.progress) return 0;
    const a = e.duration * e.progress / 100, i = e.segments;
    let l = 0, c = 0, d = null;
    do {
      const u = i[c];
      c === o && (l > a ? d = 0 : d = Math.min((a - l) / u.duration, 1) * 100), l += u.duration, c++;
    } while (d === null && c < i.length);
    return d || 0;
  }
  return /* @__PURE__ */ g("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, a) => /* @__PURE__ */ U(
    "div",
    {
      className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
      "data-segment": a,
      style: r(a),
      children: [
        e.progress ? /* @__PURE__ */ g("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ g(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${s(a)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ g("div", { className: "wx-content", children: o.text || "" })
      ]
    },
    a
  )) });
}
let bn = [], Un = null, Kt = null;
const ed = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, a = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, i = Math.floor(t / r);
  return new Date(n.getTime() + i * a * o);
};
function td(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: a = !1
  } = t, i = $e(mt), [l, c] = Xt(i, "_tasks"), [d, u] = Xt(i, "_links"), f = J(i, "area"), p = J(i, "_scales"), m = J(i, "taskTypes"), h = J(i, "baselines"), [w, x] = Xt(i, "_selected"), y = J(i, "_scrollTask"), k = J(i, "criticalPath"), v = J(i, "tasks"), D = J(i, "schedule"), $ = J(i, "splitTasks"), N = C(() => {
    if (!f || !Array.isArray(l)) return [];
    const b = f.start ?? 0, P = f.end ?? 0;
    return r && s ? l.map((Z) => ({ ...Z })) : l.slice(b, P).map((Z) => ({ ...Z }));
  }, [c, f, r, s]), T = J(i, "cellHeight"), Y = C(() => {
    if (!r || !s || !N.length) return N;
    const b = /* @__PURE__ */ new Map(), P = [];
    return l.forEach((Z) => {
      const ne = s.taskRows.get(Z.id) ?? Z.id;
      b.has(ne) || (b.set(ne, P.length), P.push(ne));
    }), N.map((Z) => {
      const ne = s.taskRows.get(Z.id) ?? Z.id, le = b.get(ne) ?? 0;
      return {
        ...Z,
        $y: le * T,
        $y_base: Z.$y_base !== void 0 ? le * T : void 0
      };
    });
  }, [N, r, s, l, T]), _ = C(
    () => p.lengthUnitWidth,
    [p]
  ), I = C(
    () => p.lengthUnit || "day",
    [p]
  ), H = W(!1), [M, R] = B(void 0), [F, oe] = B(null), he = W(null), [K, ue] = B(null), [ke, A] = B(void 0), re = W(null), [ye, fe] = B(0), [se, V] = B(null), [ie, Q] = B(null), [ce, q] = B(null), ae = W(null), ze = C(() => {
    const b = ae.current;
    return !!(w.length && b && b.contains(document.activeElement));
  }, [w, ae.current]), te = C(() => ze && w[w.length - 1]?.id, [ze, w]);
  O(() => {
    if (y && ze && y) {
      const { id: b } = y, P = ae.current?.querySelector(
        `.wx-bar[data-id='${b}']`
      );
      P && P.focus({ preventScroll: !0 });
    }
  }, [y]), O(() => {
    const b = ae.current;
    if (b && (fe(b.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const P = new ResizeObserver((Z) => {
        Z[0] && fe(Z[0].contentRect.width);
      });
      return P.observe(b), () => P.disconnect();
    }
  }, [ae.current]);
  const de = E(() => {
    document.body.style.userSelect = "none";
  }, []), Se = E(() => {
    document.body.style.userSelect = "";
  }, []), _e = E(
    (b, P, Z) => {
      if (P.target.classList.contains("wx-line") || (Z || (Z = i.getTask(vt(b))), Z.type === "milestone" || Z.type === "summary")) return "";
      const ne = Ke(P, "data-segment");
      ne && (b = ne);
      const { left: le, width: we } = b.getBoundingClientRect(), S = (P.clientX - le) / we;
      let z = 0.2 / (we > 200 ? we / 200 : 1);
      return S < z ? "start" : S > 1 - z ? "end" : "";
    },
    [i]
  ), Pe = C(() => {
    const b = /* @__PURE__ */ new Map();
    if (!r || !s)
      return l.forEach((ne) => {
        b.set(ne.id, ne.$y);
      }), b;
    const P = /* @__PURE__ */ new Map(), Z = [];
    return l.forEach((ne) => {
      const le = s.taskRows.get(ne.id) ?? ne.id;
      P.has(le) || (P.set(le, Z.length), Z.push(le));
    }), l.forEach((ne) => {
      const le = s.taskRows.get(ne.id) ?? ne.id, we = P.get(le) ?? 0;
      b.set(ne.id, we * T);
    }), b;
  }, [l, r, s, T]), j = E(
    (b) => {
      const P = ae.current;
      if (!P) return [];
      const Z = P.parentElement?.scrollLeft || 0, ne = P.parentElement?.parentElement?.scrollTop || 0, le = Math.min(b.startX, b.currentX), we = Math.max(b.startX, b.currentX), S = Math.min(b.startY, b.currentY), z = Math.max(b.startY, b.currentY);
      return l.filter((G) => {
        const ve = G.$x - Z, Ie = G.$x + G.$w - Z, me = (Pe.get(G.id) ?? G.$y) - ne, Ce = me + G.$h;
        return ve < we && Ie > le && me < z && Ce > S;
      });
    },
    [l, Pe]
  ), be = C(() => new Set(w.map((b) => b.id)), [w, x]), Ee = E(
    (b) => be.has(b),
    [be]
  ), pe = E(
    (b, P) => {
      const { clientX: Z } = P, ne = vt(b), le = i.getTask(ne), we = P.target.classList;
      if (!P.target.closest(".wx-delete-button") && !e) {
        if (we.contains("wx-progress-marker")) {
          const { progress: S } = i.getTask(ne);
          he.current = {
            id: ne,
            x: Z,
            progress: S,
            dx: 0,
            node: b,
            marker: P.target
          }, P.target.classList.add("wx-progress-in-drag");
        } else {
          const S = _e(b, P, le) || "move", z = {
            id: ne,
            mode: S,
            x: Z,
            dx: 0,
            l: le.$x,
            w: le.$w
          };
          if ($ && le.segments?.length) {
            const G = Ke(P, "data-segment");
            G && (z.segmentIndex = G.dataset.segment * 1);
          }
          oe(z);
        }
        de();
      }
    },
    [i, e, _e, de, $]
  ), xe = E(
    (b) => {
      if (b.button !== 0) return;
      const P = Ke(b);
      if (!P && o && !e) {
        const Z = ae.current;
        if (!Z) return;
        const ne = Z.getBoundingClientRect(), le = b.clientX - ne.left, we = b.clientY - ne.top;
        if (a) {
          const S = Z.parentElement?.scrollLeft || 0, z = le + S, G = ed(z, p);
          G && q(G);
        }
        V({
          startX: le,
          startY: we,
          currentX: le,
          currentY: we,
          ctrlKey: b.ctrlKey || b.metaKey
        }), de();
        return;
      }
      if (P) {
        if (o && !e && w.length > 1) {
          const Z = vt(P);
          if (Ee(Z)) {
            const ne = b.target.classList;
            if (!ne.contains("wx-link") && !ne.contains("wx-progress-marker") && !b.target.closest(".wx-delete-button")) {
              const le = i.getTask(Z);
              if (!_e(P, b, le)) {
                const S = /* @__PURE__ */ new Map();
                w.forEach((z) => {
                  const G = i.getTask(z.id);
                  if (G) {
                    if (D?.auto && G.type === "summary") return;
                    S.set(z.id, {
                      $x: G.$x,
                      $w: G.$w,
                      start: G.start,
                      end: G.end
                    });
                  }
                }), Q({
                  baseTaskId: Z,
                  startX: b.clientX,
                  dx: 0,
                  originalPositions: S
                }), de();
                return;
              }
            }
          }
        }
        pe(P, b);
      }
    },
    [pe, o, a, e, w, Ee, i, _e, D, de, p]
  ), Ae = E(
    (b) => {
      const P = Ke(b);
      P && (re.current = setTimeout(() => {
        A(!0), pe(P, b.touches[0]);
      }, 300));
    },
    [pe]
  ), Le = E(
    (b) => {
      ue(b && { ...d.find((P) => P.id === b) });
    },
    [d]
  ), Te = E(() => {
    if (se) {
      const b = j(se);
      se.ctrlKey ? b.forEach((P) => {
        i.exec("select-task", { id: P.id, toggle: !0, marquee: !0 });
      }) : (w.length > 0 && i.exec("select-task", { id: null, marquee: !0 }), b.forEach((P, Z) => {
        i.exec("select-task", {
          id: P.id,
          toggle: Z > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), V(null), Se(), H.current = !0;
      return;
    }
    if (ie) {
      const { dx: b, originalPositions: P } = ie, Z = Math.round(b / _);
      if (Z !== 0) {
        let ne = !0;
        P.forEach((le, we) => {
          const S = i.getTask(we);
          S && (i.exec("update-task", {
            id: we,
            diff: Z,
            task: { start: S.start, end: S.end },
            skipUndo: !ne
            // Only first task creates undo entry
          }), ne = !1);
        }), H.current = !0;
      } else
        P.forEach((ne, le) => {
          i.exec("drag-task", {
            id: le,
            left: ne.$x,
            width: ne.$w,
            inProgress: !1
          });
        });
      Q(null), Se();
      return;
    }
    if (he.current) {
      const { dx: b, id: P, marker: Z, value: ne } = he.current;
      he.current = null, typeof ne < "u" && b && i.exec("update-task", {
        id: P,
        task: { progress: ne },
        inProgress: !1
      }), Z.classList.remove("wx-progress-in-drag"), H.current = !0, Se();
    } else if (F) {
      const { id: b, mode: P, dx: Z, l: ne, w: le, start: we, segment: S, index: z } = F;
      if (oe(null), we) {
        const G = Math.round(Z / _);
        if (!G)
          i.exec("drag-task", {
            id: b,
            width: le,
            left: ne,
            inProgress: !1,
            ...S && { segmentIndex: z }
          });
        else {
          let ve = {}, Ie = i.getTask(b);
          S && (Ie = Ie.segments[z]);
          const Me = 1440 * 60 * 1e3, Ce = G * (I === "week" ? 7 : I === "month" ? 30 : I === "quarter" ? 91 : I === "year" ? 365 : 1) * Me;
          P === "move" ? (ve.start = new Date(Ie.start.getTime() + Ce), ve.end = new Date(Ie.end.getTime() + Ce)) : P === "start" ? (ve.start = new Date(Ie.start.getTime() + Ce), ve.end = Ie.end) : P === "end" && (ve.start = Ie.start, ve.end = new Date(Ie.end.getTime() + Ce)), i.exec("update-task", {
            id: b,
            task: ve,
            ...S && { segmentIndex: z }
          });
        }
        H.current = !0;
      }
      Se();
    }
  }, [i, Se, F, _, I, se, ie, j, w]), We = E(
    (b, P) => {
      const { clientX: Z, clientY: ne } = P;
      if (!e) {
        if (se) {
          const le = ae.current;
          if (!le) return;
          const we = le.getBoundingClientRect(), S = Z - we.left, z = ne - we.top;
          V((G) => ({
            ...G,
            currentX: S,
            currentY: z
          }));
          return;
        }
        if (ie) {
          const le = Z - ie.startX;
          ie.originalPositions.forEach((we, S) => {
            const z = we.$x + le;
            i.exec("drag-task", {
              id: S,
              left: z,
              width: we.$w,
              inProgress: !0
            });
          }), Q((we) => ({ ...we, dx: le }));
          return;
        }
        if (he.current) {
          const { node: le, x: we, id: S } = he.current, z = he.current.dx = Z - we, G = Math.round(z / le.offsetWidth * 100);
          let ve = he.current.progress + G;
          he.current.value = ve = Math.min(
            Math.max(0, ve),
            100
          ), i.exec("update-task", {
            id: S,
            task: { progress: ve },
            inProgress: !0
          });
        } else if (F) {
          Le(null);
          const { mode: le, l: we, w: S, x: z, id: G, start: ve, segment: Ie, index: Me } = F, me = i.getTask(G), Ce = Z - z;
          if (!ve && Math.abs(Ce) < 20 || le === "start" && S - Ce < _ || le === "end" && S + Ce < _ || le === "move" && (Ce < 0 && we + Ce < 0 || Ce > 0 && we + S + Ce > ye) || F.segment)
            return;
          const Be = { ...F, dx: Ce };
          let qe, Fe;
          if (le === "start" ? (qe = we + Ce, Fe = S - Ce) : le === "end" ? (qe = we, Fe = S + Ce) : le === "move" && (qe = we + Ce, Fe = S), i.exec("drag-task", {
            id: G,
            width: Fe,
            left: qe,
            inProgress: !0,
            ...Ie && { segmentIndex: Me }
          }), !Be.start && (le === "move" && me.$x == we || le !== "move" && me.$w == S)) {
            H.current = !0, Te();
            return;
          }
          Be.start = !0, oe(Be);
        } else {
          const le = Ke(b);
          if (le) {
            const we = i.getTask(vt(le)), z = Ke(b, "data-segment") || le, G = _e(z, P, we);
            z.style.cursor = G && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      e,
      F,
      _,
      ye,
      _e,
      Le,
      Te,
      se,
      ie
    ]
  ), Ye = E(
    (b) => {
      We(b, b);
    },
    [We]
  ), et = E(
    (b) => {
      ke ? (b.preventDefault(), We(b, b.touches[0])) : re.current && (clearTimeout(re.current), re.current = null);
    },
    [ke, We]
  ), L = E(() => {
    Te();
  }, [Te]), X = E(() => {
    A(null), re.current && (clearTimeout(re.current), re.current = null), Te();
  }, [Te]);
  O(() => (window.addEventListener("mouseup", L), () => {
    window.removeEventListener("mouseup", L);
  }), [L]);
  const ee = E(
    (b) => {
      if (!e) {
        const P = kt(b.target);
        if (P && !b.target.classList.contains("wx-link")) {
          const Z = kt(b.target, "data-segment");
          i.exec("show-editor", {
            id: P,
            ...Z !== null && { segmentIndex: Z }
          });
        }
      }
    },
    [i, e]
  ), ge = ["e2s", "s2s", "e2e", "s2e"], De = E((b, P) => ge[(b ? 1 : 0) + (P ? 0 : 2)], []), Re = E(
    (b, P) => {
      const Z = M.id, ne = M.start;
      return b === Z ? !0 : !!d.find((le) => le.target == b && le.source == Z && le.type === De(ne, P));
    },
    [M, u, De]
  ), Ve = E(() => {
    M && R(null);
  }, [M]), Ue = E(
    (b) => {
      if (H.current) {
        H.current = !1;
        return;
      }
      const P = kt(b.target);
      if (P) {
        const Z = b.target.classList;
        if (Z.contains("wx-link")) {
          const ne = Z.contains("wx-left");
          if (!M) {
            R({ id: P, start: ne });
            return;
          }
          M.id !== P && !Re(P, ne) && i.exec("add-link", {
            link: {
              source: M.id,
              target: P,
              type: De(M.start, ne)
            }
          });
        } else if (Z.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: K.id }), ue(null);
        else {
          let ne;
          const le = Ke(b, "data-segment");
          le && (ne = le.dataset.segment * 1), i.exec("select-task", {
            id: P,
            toggle: b.ctrlKey || b.metaKey,
            range: b.shiftKey,
            segmentIndex: ne
          });
        }
      }
      Ve();
    },
    [
      i,
      M,
      u,
      K,
      Re,
      De,
      Ve
    ]
  ), Ft = E((b) => ({
    left: `${b.$x}px`,
    top: `${b.$y}px`,
    width: `${b.$w}px`,
    height: `${b.$h}px`
  }), []), ht = E((b) => ({
    left: `${b.$x_base}px`,
    top: `${b.$y_base}px`,
    width: `${b.$w_base}px`,
    height: `${b.$h_base}px`
  }), []), Wn = E(
    (b) => {
      if (ke || re.current)
        return b.preventDefault(), !1;
    },
    [ke]
  ), wt = C(
    () => m.map((b) => b.id),
    [m]
  ), ln = E(
    (b) => {
      let P = wt.includes(b) ? b : "task";
      return ["task", "milestone", "summary"].includes(b) || (P = `task ${P}`), P;
    },
    [wt]
  ), cn = E(
    (b) => {
      i.exec(b.action, b.data);
    },
    [i]
  ), Ot = E(
    (b) => k && v.byId(b).$critical,
    [k, v]
  ), dn = E(
    (b) => {
      if (D?.auto) {
        const P = v.getSummaryId(b, !0), Z = v.getSummaryId(M.id, !0);
        return M?.id && !(Array.isArray(P) ? P : [P]).includes(
          M.id
        ) && !(Array.isArray(Z) ? Z : [Z]).includes(b);
      }
      return M;
    },
    [D, v, M]
  ), un = W(null);
  un.current = ce;
  const Yt = E(() => {
    const b = i.getState()._selected;
    if (!b || !b.length) return;
    const P = b.map((we) => {
      const S = i.getTask(we.id);
      if (!S) return null;
      const { $x: z, $y: G, $w: ve, $h: Ie, $skip: Me, $level: me, $index: Ce, $y_base: Be, $x_base: qe, $w_base: Fe, $h_base: st, $skip_baseline: Tt, $critical: Vt, $reorder: Gt, ...Bt } = S;
      return Bt;
    }).filter(Boolean);
    if (!P.length) return;
    const ne = P[0].parent, le = P.filter((we) => we.parent === ne);
    le.length !== 0 && (bn = le, Kt = ne, Un = bn.reduce((we, S) => S.start && (!we || S.start < we) ? S.start : we, null));
  }, [i]), fn = E(() => {
    const b = un.current;
    if (!bn.length || !b || !Un || Kt == null) return;
    const P = b.getTime() - Un.getTime(), Z = i.getHistory();
    Z?.startBatch(), bn.forEach((ne, le) => {
      const we = `task-${Date.now()}-${le}`, S = ne.start ? new Date(ne.start.getTime() + P) : null, z = ne.end ? new Date(ne.end.getTime() + P) : null;
      i.exec("add-task", {
        task: {
          ...ne,
          id: we,
          start: S,
          end: z,
          // Keep original parent and row from copied task
          parent: Kt,
          row: ne.row
          // Each task keeps its own row
        },
        target: Kt,
        mode: "child",
        skipUndo: le > 0
      });
    }), Z?.endBatch();
  }, [i]);
  O(() => a ? i.intercept("hotkey", (P) => {
    if (P.key === "ctrl+c" || P.key === "meta+c")
      return Yt(), !1;
    if (P.key === "ctrl+v" || P.key === "meta+v")
      return fn(), !1;
  }) : void 0, [a, i, Yt, fn]);
  const at = C(() => {
    if (!se) return null;
    const b = Math.min(se.startX, se.currentX), P = Math.min(se.startY, se.currentY), Z = Math.abs(se.currentX - se.startX), ne = Math.abs(se.currentY - se.startY);
    return {
      left: `${b}px`,
      top: `${P}px`,
      width: `${Z}px`,
      height: `${ne}px`
    };
  }, [se]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${Y.length ? Y[0].$h : 0}px` },
      ref: ae,
      onContextMenu: Wn,
      onMouseDown: xe,
      onMouseMove: Ye,
      onTouchStart: Ae,
      onTouchMove: et,
      onTouchEnd: X,
      onClick: Ue,
      onDoubleClick: ee,
      onDragStart: (b) => (b.preventDefault(), !1),
      children: [
        /* @__PURE__ */ g(
          Zc,
          {
            onSelectLink: Le,
            selectedLink: K,
            readonly: e
          }
        ),
        Y.map((b) => {
          if (b.$skip && b.$skip_baseline) return null;
          const P = `wx-bar wx-${ln(b.type)}` + (ke && F && b.id === F.id ? " wx-touch" : "") + (M && M.id === b.id ? " wx-selected" : "") + (be.has(b.id) ? " wx-selected" : "") + (Ot(b.id) ? " wx-critical" : "") + (b.$reorder ? " wx-reorder-task" : "") + ($ && b.segments ? " wx-split" : ""), Z = "wx-link wx-left" + (M ? " wx-visible" : "") + (!M || !Re(b.id, !0) && dn(b.id) ? " wx-target" : "") + (M && M.id === b.id && M.start ? " wx-selected" : "") + (Ot(b.id) ? " wx-critical" : ""), ne = "wx-link wx-right" + (M ? " wx-visible" : "") + (!M || !Re(b.id, !1) && dn(b.id) ? " wx-target" : "") + (M && M.id === b.id && !M.start ? " wx-selected" : "") + (Ot(b.id) ? " wx-critical" : "");
          return /* @__PURE__ */ U($s, { children: [
            !b.$skip && /* @__PURE__ */ U(
              "div",
              {
                className: "wx-GKbcLEGA " + P,
                style: Ft(b),
                "data-tooltip-id": b.id,
                "data-id": b.id,
                tabIndex: te === b.id ? 0 : -1,
                children: [
                  e ? null : b.id === K?.target && K?.type[2] === "s" ? /* @__PURE__ */ g(
                    dt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + Z, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  b.type !== "milestone" ? /* @__PURE__ */ U(He, { children: [
                    b.progress && !($ && b.segments) ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${b.progress}%` }
                      }
                    ) }) : null,
                    !e && !($ && b.segments) ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${b.progress}% - 10px)` },
                        children: b.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ g(n, { data: b, api: i, onAction: cn }) : $ && b.segments ? /* @__PURE__ */ g(Jc, { task: b, type: ln(b.type) }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: b.text || "" })
                  ] }) : /* @__PURE__ */ U(He, { children: [
                    /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ g(n, { data: b, api: i, onAction: cn }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-text-out", children: b.text })
                  ] }),
                  e ? null : b.id === K?.target && K?.type[2] === "e" ? /* @__PURE__ */ g(
                    dt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + ne, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            h && !b.$skip_baseline ? /* @__PURE__ */ g(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (b.type === "milestone" ? " wx-milestone" : ""),
                style: ht(b)
              }
            ) : null
          ] }, b.id);
        }),
        se && at && /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: at })
      ]
    }
  );
}
function nd(t) {
  const { highlightTime: e } = t, n = $e(mt), r = J(n, "_scales");
  return /* @__PURE__ */ g("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((s, o) => /* @__PURE__ */ g(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${s.height}px` },
      children: (s.cells || []).map((a, i) => {
        const l = e ? e(a.date, a.unit) : "", c = "wx-cell " + (a.css || "") + " " + (l || ""), d = typeof a.value == "string" && a.value.includes("<");
        return /* @__PURE__ */ g(
          "div",
          {
            className: "wx-ZkvhDKir " + c,
            style: { width: `${a.width}px` },
            ...d ? { dangerouslySetInnerHTML: { __html: a.value } } : { children: a.value }
          },
          i
        );
      })
    },
    o
  )) });
}
const rd = /* @__PURE__ */ new Map();
function sd(t) {
  const e = W(null), n = W(0), r = W(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, O(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        rd.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function od(t) {
  const {
    readonly: e,
    fullWidth: n,
    fullHeight: r,
    taskTemplate: s,
    cellBorders: o,
    highlightTime: a,
    multiTaskRows: i = !1,
    rowMapping: l = null,
    marqueeSelect: c = !1,
    copyPaste: d = !1,
    scrollToCurrentWeek: u = !1,
    currentWeekColor: f = null
  } = t, p = $e(mt), [m, h] = Xt(p, "_selected"), w = J(p, "scrollTop"), x = J(p, "cellHeight"), y = J(p, "cellWidth"), k = J(p, "_scales"), v = J(p, "_markers"), D = J(p, "_scrollTask"), $ = J(p, "zoom"), N = J(p, "_tasks"), [T, Y] = B(), _ = W(null), I = W(0), H = W(!1), M = 1 + (k?.rows?.length || 0), R = C(() => {
    if (!i || !l || !N?.length) return null;
    const V = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), Q = [];
    return N.forEach((ce) => {
      const q = l.taskRows.get(ce.id) ?? ce.id;
      ie.has(q) || (ie.set(q, Q.length), Q.push(q));
    }), N.forEach((ce) => {
      const q = l.taskRows.get(ce.id) ?? ce.id, ae = ie.get(q) ?? 0;
      V.set(ce.id, ae * x);
    }), V;
  }, [N, i, l, x]), F = C(() => {
    const V = [];
    return m && m.length && x && m.forEach((ie) => {
      const Q = R?.get(ie.id) ?? ie.$y;
      V.push({ height: `${x}px`, top: `${Q - 3}px` });
    }), V;
  }, [h, x, R]), oe = C(
    () => Math.max(T || 0, r),
    [T, r]
  );
  O(() => {
    const V = _.current;
    V && typeof w == "number" && (V.scrollTop = w);
  }, [w]);
  const he = () => {
    K();
  };
  function K(V) {
    const ie = _.current;
    if (!ie) return;
    const Q = {};
    Q.left = ie.scrollLeft, p.exec("scroll-chart", Q);
  }
  function ue() {
    const V = _.current, Q = Math.ceil((T || 0) / (x || 1)) + 1, ce = Math.floor((V && V.scrollTop || 0) / (x || 1)), q = Math.max(0, ce - M), ae = ce + Q + M, ze = q * (x || 0);
    p.exec("render-data", {
      start: q,
      end: ae,
      from: ze
    });
  }
  O(() => {
    ue();
  }, [T, w]);
  const ke = E(
    (V) => {
      if (!V) return;
      const { id: ie, mode: Q } = V;
      if (Q.toString().indexOf("x") < 0) return;
      const ce = _.current;
      if (!ce) return;
      const { clientWidth: q } = ce, ae = p.getTask(ie);
      if (ae.$x + ae.$w < ce.scrollLeft)
        p.exec("scroll-chart", { left: ae.$x - (y || 0) }), ce.scrollLeft = ae.$x - (y || 0);
      else if (ae.$x >= q + ce.scrollLeft) {
        const ze = q < ae.$w ? y || 0 : ae.$w;
        p.exec("scroll-chart", { left: ae.$x - q + ze }), ce.scrollLeft = ae.$x - q + ze;
      }
    },
    [p, y]
  );
  O(() => {
    ke(D);
  }, [D]);
  function A(V) {
    if ($ && (V.ctrlKey || V.metaKey)) {
      V.preventDefault();
      const ie = _.current, Q = V.clientX - (ie ? ie.getBoundingClientRect().left : 0);
      if (I.current += V.deltaY, Math.abs(I.current) >= 150) {
        const q = -Math.sign(I.current);
        I.current = 0, p.exec("zoom-scale", {
          dir: q,
          offset: Q
        });
      }
    }
  }
  const re = E((V) => {
    const ie = a(V.date, V.unit);
    return ie ? {
      css: ie,
      width: V.width
    } : null;
  }, [a]), ye = C(() => {
    if (!k || !a || !["hour", "day", "week"].includes(k.minUnit)) return null;
    let ie = 0;
    return k.rows[k.rows.length - 1].cells.map((Q) => {
      const ce = re(Q), q = ie;
      return ie += Q.width, ce ? { ...ce, left: q } : null;
    });
  }, [k, a, re]), fe = E(
    (V) => {
      V.eventSource = "chart", p.exec("hotkey", V);
    },
    [p]
  );
  O(() => {
    const V = _.current;
    if (!V) return;
    const ie = () => Y(V.clientHeight);
    ie();
    const Q = new ResizeObserver(() => ie());
    return Q.observe(V), () => {
      Q.disconnect();
    };
  }, [_.current]);
  const se = W(null);
  return O(() => {
    const V = _.current;
    if (V && !se.current)
      return se.current = Dr(V, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (ie) => fe(ie)
      }), () => {
        se.current?.destroy(), se.current = null;
      };
  }, []), O(() => {
    const V = _.current;
    if (!V) return;
    const ie = A;
    return V.addEventListener("wheel", ie), () => {
      V.removeEventListener("wheel", ie);
    };
  }, [A]), O(() => {
    if (!u || H.current || !k || !_.current || !T) return;
    const V = _.current, { clientWidth: ie } = V, Q = /* @__PURE__ */ new Date(), ce = k.rows[k.rows.length - 1]?.cells;
    if (!ce) return;
    let q = -1, ae = 0;
    const ze = [];
    for (let de = 0; de < ce.length; de++) {
      const Se = ce[de];
      ze.push({ left: ae, width: Se.width });
      const _e = Se.date;
      if (Se.unit === "week") {
        const Pe = new Date(_e);
        Pe.setDate(Pe.getDate() + 7), Q >= _e && Q < Pe && (q = de);
      } else Se.unit === "day" && Q.getFullYear() === _e.getFullYear() && Q.getMonth() === _e.getMonth() && Q.getDate() === _e.getDate() && (q = de);
      ae += Se.width;
    }
    let te = q;
    if (q > 0 && (te = q - 1), te >= 0 && ze[te]) {
      const de = ze[te], Se = Math.max(0, de.left);
      V.scrollLeft = Se, p.exec("scroll-chart", { left: Se }), H.current = !0;
    }
  }, [u, k, T, p]), sd("chart"), /* @__PURE__ */ U(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: _,
      onScroll: he,
      children: [
        /* @__PURE__ */ g(nd, { highlightTime: a, scales: k }),
        v && v.length ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${oe}px` },
            children: v.map((V, ie) => /* @__PURE__ */ g(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${V.css || ""}`,
                style: { left: `${V.left}px` },
                children: /* @__PURE__ */ g("div", { className: "wx-mR7v2Xag wx-content", children: V.text })
              },
              ie
            ))
          }
        ) : null,
        /* @__PURE__ */ U(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${oe}px` },
            children: [
              ye ? /* @__PURE__ */ g(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: ye.map(
                    (V, ie) => V ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + V.css,
                        style: {
                          width: `${V.width}px`,
                          left: `${V.left}px`
                        }
                      },
                      ie
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ g(Qc, { borders: o }),
              m && m.length ? m.map(
                (V, ie) => V.$y ? /* @__PURE__ */ g(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": V.id,
                    style: F[ie]
                  },
                  V.id
                ) : null
              ) : null,
              /* @__PURE__ */ g(
                td,
                {
                  readonly: e,
                  taskTemplate: s,
                  multiTaskRows: i,
                  rowMapping: l,
                  marqueeSelect: c,
                  copyPaste: d
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function id(t) {
  const {
    position: e = "after",
    size: n = 4,
    dir: r = "x",
    onMove: s,
    onDisplayChange: o,
    compactMode: a,
    containerWidth: i = 0,
    leftThreshold: l = 50,
    rightThreshold: c = 50
  } = t, [d, u] = Oe(t.value ?? 0), [f, p] = Oe(t.display ?? "all");
  function m(K) {
    let ue = 0;
    e == "center" ? ue = n / 2 : e == "before" && (ue = n);
    const ke = {
      size: [n + "px", "auto"],
      p: [K - ue + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let A in ke) ke[A] = ke[A].reverse();
    return ke;
  }
  const [h, w] = B(!1), [x, y] = B(null), k = W(0), v = W(), D = W(), $ = W(f);
  O(() => {
    $.current = f;
  }, [f]), O(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function N(K) {
    return r == "x" ? K.clientX : K.clientY;
  }
  const T = E(
    (K) => {
      const ue = v.current + N(K) - k.current;
      u(ue);
      let ke;
      ue <= l ? ke = "chart" : i - ue <= c ? ke = "grid" : ke = "all", $.current !== ke && (p(ke), $.current = ke), D.current && clearTimeout(D.current), D.current = setTimeout(() => s && s(ue), 100);
    },
    [i, l, c, s]
  ), Y = E(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", Y);
  }, [T]), _ = C(
    () => f !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [f, r]
  ), I = E(
    (K) => {
      !a && (f === "grid" || f === "chart") || (k.current = N(K), v.current = d, w(!0), document.body.style.cursor = _, document.body.style.userSelect = "none", window.addEventListener("mousemove", T), window.addEventListener("mouseup", Y));
    },
    [_, T, Y, d, a, f]
  );
  function H() {
    p("all"), x !== null && (u(x), s && s(x));
  }
  function M(K) {
    if (a) {
      const ue = f === "chart" ? "grid" : "chart";
      p(ue), o(ue);
    } else if (f === "grid" || f === "chart")
      H(), o("all");
    else {
      const ue = K === "left" ? "chart" : "grid";
      p(ue), o(ue);
    }
  }
  function R() {
    M("left");
  }
  function F() {
    M("right");
  }
  const oe = C(() => m(d), [d, e, n, r]), he = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${f}`,
    h ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: I,
      style: { width: oe.size[0], height: oe.size[1], cursor: _ },
      children: [
        /* @__PURE__ */ U("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: R
            }
          ) }),
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: F
            }
          ) })
        ] }),
        /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const ad = 650;
function zo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let a = o.contentRect.width <= ad;
          t(a);
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
function ld(t) {
  const {
    taskTemplate: e,
    readonly: n,
    cellBorders: r,
    highlightTime: s,
    onTableAPIChange: o,
    multiTaskRows: a = !1,
    rowMapping: i = null,
    marqueeSelect: l = !1,
    copyPaste: c = !1,
    scrollToCurrentWeek: d = !1,
    currentWeekColor: u = null
  } = t, f = $e(mt), p = J(f, "_tasks"), m = J(f, "_scales"), h = J(f, "cellHeight"), w = J(f, "columns"), x = J(f, "_scrollTask"), y = J(f, "undo"), k = C(() => {
    if (!a) return i;
    const te = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Map();
    return p.forEach((Se) => {
      const _e = Se.row ?? Se.id;
      de.set(Se.id, _e), te.has(_e) || te.set(_e, []), te.get(_e).push(Se.id);
    }), { rowMap: te, taskRows: de };
  }, [p, a, i]), [v, D] = B(!1);
  let [$, N] = B(0);
  const [T, Y] = B(0), [_, I] = B(0), [H, M] = B(void 0), [R, F] = B("all"), oe = W(null), he = E(
    (te) => {
      D((de) => (te !== de && (te ? (oe.current = R, R === "all" && F("grid")) : (!oe.current || oe.current === "all") && F("all")), te));
    },
    [R]
  );
  O(() => {
    const te = zo(he);
    return te.observe(), () => {
      te.disconnect();
    };
  }, [he]);
  const K = C(() => {
    let te;
    return w.every((de) => de.width && !de.flexgrow) ? te = w.reduce((de, Se) => de + parseInt(Se.width), 0) : v && R === "chart" ? te = parseInt(w.find((de) => de.id === "action")?.width) || 50 : te = 440, $ = te, te;
  }, [w, v, R]);
  O(() => {
    N(K);
  }, [K]);
  const ue = C(
    () => (T ?? 0) - (H ?? 0),
    [T, H]
  ), ke = C(() => m.width, [m]), A = C(() => {
    if (!a || !k)
      return p.length * h;
    const te = /* @__PURE__ */ new Set();
    return p.forEach((de) => {
      const Se = k.taskRows.get(de.id) ?? de.id;
      te.add(Se);
    }), te.size * h;
  }, [p, h, a, k]), re = C(
    () => m.height + A + ue,
    [m, A, ue]
  ), ye = C(
    () => $ + ke,
    [$, ke]
  ), fe = W(null), se = E(() => {
    Promise.resolve().then(() => {
      if ((T ?? 0) > (ye ?? 0)) {
        const te = (T ?? 0) - $;
        f.exec("expand-scale", { minWidth: te });
      }
    });
  }, [T, ye, $, f]);
  O(() => {
    let te;
    return fe.current && (te = new ResizeObserver(se), te.observe(fe.current)), () => {
      te && te.disconnect();
    };
  }, [fe.current, se]), O(() => {
    se();
  }, [ke]);
  const V = W(null), ie = W(null), Q = E(() => {
    const te = V.current;
    te && f.exec("scroll-chart", {
      top: te.scrollTop
    });
  }, [f]), ce = W({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  O(() => {
    ce.current = {
      rTasks: p,
      rScales: m,
      rCellHeight: h,
      scrollSize: ue,
      ganttDiv: V.current,
      ganttHeight: _ ?? 0
    };
  }, [p, m, h, ue, _]);
  const q = E(
    (te) => {
      if (!te) return;
      const {
        rTasks: de,
        rScales: Se,
        rCellHeight: _e,
        scrollSize: Pe,
        ganttDiv: j,
        ganttHeight: be
      } = ce.current;
      if (!j) return;
      const { id: Ee } = te, pe = de.findIndex((xe) => xe.id === Ee);
      if (pe > -1) {
        const xe = be - Se.height, Ae = pe * _e, Le = j.scrollTop;
        let Te = null;
        Ae < Le ? Te = Ae : Ae + _e > Le + xe && (Te = Ae - xe + _e + Pe), Te !== null && (f.exec("scroll-chart", { top: Math.max(Te, 0) }), V.current.scrollTop = Math.max(Te, 0));
      }
    },
    [f]
  );
  O(() => {
    q(x);
  }, [x]), O(() => {
    const te = V.current, de = ie.current;
    if (!te || !de) return;
    const Se = () => {
      Vo(() => {
        I(te.offsetHeight), Y(te.offsetWidth), M(de.offsetWidth);
      });
    }, _e = new ResizeObserver(Se);
    return _e.observe(te), () => _e.disconnect();
  }, [V.current]);
  const ae = W(null), ze = W(null);
  return O(() => {
    ze.current && (ze.current.destroy(), ze.current = null);
    const te = ae.current;
    if (te)
      return ze.current = Dr(te, {
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
          "ctrl+z": y,
          "ctrl+y": y,
          "meta+z": y,
          "meta+shift+z": y
        },
        exec: (de) => {
          de.isInput || f.exec("hotkey", de);
        }
      }), () => {
        ze.current?.destroy(), ze.current = null;
      };
  }, [y]), /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-gantt", ref: V, onScroll: Q, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: re, width: "100%" },
      ref: ie,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: _,
            width: H
          },
          children: /* @__PURE__ */ U("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: ae, children: [
            w.length ? /* @__PURE__ */ U(He, { children: [
              /* @__PURE__ */ g(
                Xc,
                {
                  display: R,
                  compactMode: v,
                  columnWidth: K,
                  width: $,
                  readonly: n,
                  fullHeight: A,
                  onTableAPIChange: o,
                  multiTaskRows: a,
                  rowMapping: k
                }
              ),
              /* @__PURE__ */ g(
                id,
                {
                  value: $,
                  display: R,
                  compactMode: v,
                  containerWidth: T,
                  onMove: (te) => N(te),
                  onDisplayChange: (te) => F(te)
                }
              )
            ] }) : null,
            /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-content", ref: fe, children: /* @__PURE__ */ g(
              od,
              {
                readonly: n,
                fullWidth: ke,
                fullHeight: A,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                multiTaskRows: a,
                rowMapping: k,
                marqueeSelect: l,
                copyPaste: c,
                scrollToCurrentWeek: d,
                currentWeekColor: u
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function cd(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function dd(t, e) {
  return typeof t == "function" ? t : ct(t, e);
}
function Wo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: dd(n, e)
  }));
}
function ud(t, e) {
  const n = cd(e);
  for (let r in n)
    n[r] = ct(n[r], t);
  return n;
}
function fd(t, e) {
  if (!t || !t.length) return t;
  const n = ct("%d-%m-%Y", e);
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
function hd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Wo(n.scales, e)
    }))
  } : t;
}
const pd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), gd = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], md = _t(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = vo,
  tasks: s = [],
  selected: o = [],
  activeTask: a = null,
  links: i = [],
  scales: l = gd,
  columns: c = ho,
  start: d = null,
  end: u = null,
  lengthUnit: f = "day",
  durationUnit: p = "day",
  cellWidth: m = 100,
  cellHeight: h = 38,
  scaleHeight: w = 36,
  readonly: x = !1,
  cellBorders: y = "full",
  zoom: k = !1,
  baselines: v = !1,
  highlightTime: D = null,
  init: $ = null,
  autoScale: N = !0,
  unscheduledTasks: T = !1,
  criticalPath: Y = null,
  schedule: _ = { type: "forward" },
  projectStart: I = null,
  projectEnd: H = null,
  calendar: M = null,
  undo: R = !1,
  splitTasks: F = !1,
  multiTaskRows: oe = !1,
  marqueeSelect: he = !1,
  copyPaste: K = !1,
  currentWeekHighlight: ue = !1,
  currentWeekColor: ke = null,
  scrollToCurrentWeek: A = !1,
  ...re
}, ye) {
  const fe = W();
  fe.current = re;
  const se = C(() => new sl(Ds), []), V = C(() => ({ ...nn, ...An }), []), ie = $e(Je.i18n), Q = C(() => ie ? ie.extend(V, !0) : Nt(V), [ie, V]), ce = C(() => Q.getRaw().calendar, [Q]), q = C(() => {
    let xe = {
      zoom: hd(k, ce),
      scales: Wo(l, ce),
      columns: fd(c, ce),
      links: uo(i),
      cellWidth: m
    };
    return xe.zoom && (xe = {
      ...xe,
      ...Ga(
        xe.zoom,
        ud(ce, Q.getGroup("gantt")),
        xe.scales,
        m
      )
    }), xe;
  }, [k, l, c, i, m, ce, Q]), ae = W(null);
  ae.current !== s && (ar(s, { durationUnit: p, calendar: M }), ae.current = s), O(() => {
    ar(s, { durationUnit: p, calendar: M });
  }, [s, p, M, F]);
  const ze = C(() => {
    if (!oe) return null;
    const xe = /* @__PURE__ */ new Map(), Ae = /* @__PURE__ */ new Map(), Le = (Te) => {
      Te.forEach((We) => {
        const Ye = We.row ?? We.id;
        Ae.set(We.id, Ye), xe.has(Ye) || xe.set(Ye, []), xe.get(Ye).push(We.id), We.data && We.data.length > 0 && Le(We.data);
      });
    };
    return Le(s), { rowMap: xe, taskRows: Ae };
  }, [s, oe]), te = C(() => se.in, [se]), de = W(null);
  de.current === null && (de.current = new Ls((xe, Ae) => {
    const Le = "on" + pd(xe);
    fe.current && fe.current[Le] && fe.current[Le](Ae);
  }), te.setNext(de.current));
  const [Se, _e] = B(null), Pe = W(null);
  Pe.current = Se;
  const j = C(
    () => ({
      getState: se.getState.bind(se),
      getReactiveState: se.getReactive.bind(se),
      getStores: () => ({ data: se }),
      exec: te.exec,
      setNext: (xe) => (de.current = de.current.setNext(xe), de.current),
      intercept: te.intercept.bind(te),
      on: te.on.bind(te),
      detach: te.detach.bind(te),
      getTask: se.getTask.bind(se),
      serialize: se.serialize.bind(se),
      getTable: (xe) => xe ? new Promise((Ae) => setTimeout(() => Ae(Pe.current), 1)) : Pe.current,
      getHistory: () => se.getHistory()
    }),
    [se, te]
  );
  Ct(
    ye,
    () => ({
      ...j
    }),
    [j]
  );
  const be = W(0);
  O(() => {
    be.current ? se.init({
      tasks: s,
      links: q.links,
      start: d,
      columns: q.columns,
      end: u,
      lengthUnit: f,
      cellWidth: q.cellWidth,
      cellHeight: h,
      scaleHeight: w,
      scales: q.scales,
      taskTypes: r,
      zoom: q.zoom,
      selected: o,
      activeTask: a,
      baselines: v,
      autoScale: N,
      unscheduledTasks: T,
      markers: n,
      durationUnit: p,
      criticalPath: Y,
      schedule: _,
      projectStart: I,
      projectEnd: H,
      calendar: M,
      undo: R,
      _weekStart: ce.weekStart,
      splitTasks: F
    }) : $ && $(j), be.current++;
  }, [
    j,
    $,
    s,
    q,
    d,
    u,
    f,
    h,
    w,
    r,
    o,
    a,
    v,
    N,
    T,
    n,
    p,
    Y,
    _,
    I,
    H,
    M,
    R,
    ce,
    F,
    se
  ]), be.current === 0 && se.init({
    tasks: s,
    links: q.links,
    start: d,
    columns: q.columns,
    end: u,
    lengthUnit: f,
    cellWidth: q.cellWidth,
    cellHeight: h,
    scaleHeight: w,
    scales: q.scales,
    taskTypes: r,
    zoom: q.zoom,
    selected: o,
    activeTask: a,
    baselines: v,
    autoScale: N,
    unscheduledTasks: T,
    markers: n,
    durationUnit: p,
    criticalPath: Y,
    schedule: _,
    projectStart: I,
    projectEnd: H,
    calendar: M,
    undo: R,
    _weekStart: ce.weekStart,
    splitTasks: F
  });
  const Ee = C(() => {
    const xe = /* @__PURE__ */ new Date(), Ae = ce?.weekStart ?? 0, Le = new Date(xe), We = (Le.getDay() - Ae + 7) % 7;
    Le.setDate(Le.getDate() - We), Le.setHours(0, 0, 0, 0);
    const Ye = new Date(Le);
    return Ye.setDate(Ye.getDate() + 7), (et) => et >= Le && et < Ye;
  }, [ce]), pe = C(() => (xe, Ae) => {
    let Le = [];
    if (M)
      Ae == "day" && !M.getDayHours(xe) && Le.push("wx-weekend"), Ae == "hour" && !M.getDayHours(xe) && Le.push("wx-weekend");
    else if (D) {
      const Te = D(xe, Ae);
      Te && Le.push(Te);
    }
    return ue && (Ae === "week" || Ae === "day") && Ee(xe) && Le.push("wx-current-week"), Le.join(" ");
  }, [M, D, ue, Ee]);
  return /* @__PURE__ */ g(Je.i18n.Provider, { value: Q, children: /* @__PURE__ */ g(mt.Provider, { value: j, children: /* @__PURE__ */ g(
    ld,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: pe,
      onTableAPIChange: _e,
      multiTaskRows: oe,
      rowMapping: ze,
      marqueeSelect: he,
      copyPaste: K,
      scrollToCurrentWeek: A,
      currentWeekColor: ke
    }
  ) }) });
});
function wd({ api: t = null, items: e = [] }) {
  const n = $e(Je.i18n), r = C(() => n || Nt(An), [n]), s = C(() => r.getGroup("gantt"), [r]), o = lt(t, "_selected"), a = lt(t, "undo"), i = lt(t, "history"), l = lt(t, "splitTasks"), c = ["undo", "redo"], d = C(() => {
    const f = cr();
    return (e.length ? e : cr()).map((m) => {
      let h = { ...m, disabled: !1 };
      return h.handler = Nr(f, h.id) ? (w) => Et(t, w.id, null, s) : h.handler, h.text && (h.text = s(h.text)), h.menuText && (h.menuText = s(h.menuText)), h;
    });
  }, [e, t, s, a, l]), u = C(() => {
    const f = [];
    return d.forEach((p) => {
      const m = p.id;
      if (m === "add-task")
        f.push(p);
      else if (c.includes(m))
        c.includes(m) && f.push({
          ...p,
          disabled: p.isDisabled(i)
        });
      else {
        if (!o?.length || !t) return;
        f.push({
          ...p,
          disabled: p.isDisabled && o.some((h) => p.isDisabled(h, t.getState()))
        });
      }
    }), f.filter((p, m) => {
      if (t && p.isHidden)
        return !o.some((h) => p.isHidden(h, t.getState()));
      if (p.comp === "separator") {
        const h = f[m + 1];
        if (!h || h.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, o, i, d]);
  return n ? /* @__PURE__ */ g(ur, { items: u }) : /* @__PURE__ */ g(Je.i18n.Provider, { value: r, children: /* @__PURE__ */ g(ur, { items: u }) });
}
const xd = _t(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: a,
  onClick: i,
  css: l
}, c) {
  const d = W(null), u = W(null), f = $e(Je.i18n), p = C(() => f || Nt({ ...An, ...nn }), [f]), m = C(() => p.getGroup("gantt"), [p]), h = lt(n, "taskTypes"), w = lt(n, "selected"), x = lt(n, "_selected"), y = lt(n, "splitTasks"), k = C(() => lr(), []);
  O(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function v(M) {
    return M.map((R) => (R = { ...R }, R.text && (R.text = m(R.text)), R.subtext && (R.subtext = m(R.subtext)), R.data && (R.data = v(R.data)), R));
  }
  function D() {
    const M = e.length ? e : lr(), R = M.find((F) => F.id === "convert-task");
    return R && (R.data = [], (h || []).forEach((F) => {
      R.data.push(R.dataFactory(F));
    })), v(M);
  }
  const $ = C(() => D(), [n, e, h, y, m]), N = C(
    () => x && x.length ? x : [],
    [x]
  ), T = E(
    (M, R) => {
      let F = M ? n?.getTask(M) : null;
      if (r) {
        const oe = r(M, R);
        F = oe === !0 ? F : oe;
      }
      if (F) {
        const oe = kt(R.target, "data-segment");
        oe !== null ? u.current = { id: F.id, segmentIndex: oe } : u.current = F.id, (!Array.isArray(w) || !w.includes(F.id)) && n && n.exec && n.exec("select-task", { id: F.id });
      }
      return F;
    },
    [n, r, w]
  ), Y = E(
    (M) => {
      const R = M.action;
      R && (Nr(k, R.id) && Et(n, R.id, u.current, m), i && i(M));
    },
    [n, m, i, k]
  ), _ = E(
    (M, R) => {
      const F = N.length ? N : R ? [R] : [];
      let oe = s ? F.every((he) => s(M, he)) : !0;
      if (oe && (M.isHidden && (oe = !F.some(
        (he) => M.isHidden(he, n.getState(), u.current)
      )), M.isDisabled)) {
        const he = F.some(
          (K) => M.isDisabled(K, n.getState(), u.current)
        );
        M.disabled = he;
      }
      return oe;
    },
    [s, N, n]
  );
  Ct(c, () => ({
    show: (M, R) => {
      d.current && d.current.show && d.current.show(M, R);
    }
  }));
  const I = E((M) => {
    d.current && d.current.show && d.current.show(M);
  }, []), H = /* @__PURE__ */ U(He, { children: [
    /* @__PURE__ */ g(
      Mo,
      {
        filter: _,
        options: $,
        dataKey: "id",
        resolver: T,
        onClick: Y,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ g("span", { onContextMenu: I, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a })
  ] });
  if (!f && Je.i18n?.Provider) {
    const M = Je.i18n.Provider;
    return /* @__PURE__ */ g(M, { value: p, children: H });
  }
  return H;
}), hr = {};
function ks(t) {
  return typeof t < "u" ? hr[t] || t : hr.text;
}
function rt(t, e) {
  hr[t] = e;
}
const yd = {
  editor: {}
};
function qn(t) {
  const {
    editors: e,
    data: n,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: a,
    children: i,
    onChange: l
  } = t, c = W(null);
  O(() => {
    if (o) {
      const p = document.activeElement;
      if (p && c.current && c.current.contains(p)) return;
      const m = c.current ? c.current.querySelector(
        "input:not([disabled]), textarea:not([disabled]), select:not([disabled])"
      ) : null;
      m && setTimeout(() => {
        typeof m.select == "function" && m.select(), typeof m.focus == "function" && m.focus();
      }, 300);
    }
  }, []);
  const d = $e(Je.i18n), u = C(() => d.getGroup("editor"), [d]), f = C(
    () => e.config[0].comp === "readonly" && e.config.every((p) => !Object.keys(n).includes(p.key)),
    [e, n]
  );
  return /* @__PURE__ */ U("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    i,
    f ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((p) => {
      if (!p.hidden) {
        const { key: m, onChange: h, ...w } = p;
        if (p.comp === "readonly" || p.comp === "section") {
          const x = ks(p.comp);
          return /* @__PURE__ */ g(
            x,
            {
              fieldKey: m,
              label: p.label,
              value: n[m],
              ...w,
              onClick: a
            },
            m
          );
        } else {
          const x = ks(p.comp);
          return /* @__PURE__ */ U("div", { children: [
            /* @__PURE__ */ g(
              Zt,
              {
                label: p.labelTemplate ? p.labelTemplate(n[m]) : p.label ?? "",
                required: p.required,
                children: /* @__PURE__ */ g(
                  x,
                  {
                    fieldKey: m,
                    ...w,
                    onChange: h || ((y) => {
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
            s && s[m] && p.validationMessage ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-message", children: p.validationMessage }) : null
          ] }, m);
        }
      }
      return null;
    })
  ] });
}
function vd(t) {
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
function kd(t) {
  if (typeof t == "string" && t.includes(".")) {
    const e = t.split(".");
    return (n, r) => {
      let s = n;
      e.forEach((o, a) => {
        a === e.length - 1 ? s[o] = r : s = s[o];
      });
    };
  }
  return (e, n) => e[t] = n;
}
function bd(t) {
  const e = t.map((a) => {
    const i = { ...a };
    return a.config && Object.assign(i, a.config), i.key = a.key || Vi(), i.setter = a.setter || kd(a.key), i.getter = a.getter || vd(a.key), i;
  }), n = (a) => {
    const i = {};
    return e.forEach((l) => {
      l.comp !== "section" && (l.getter ? i[l.key] = l.getter(a) : i[l.key] = a[l.key]);
    }), i;
  }, r = (a, i, l) => ((l.length ? l.map((c) => e.find((d) => d.key === c)) : e).forEach((c) => {
    c.setter ? c.setter(a, i[c.key]) : a[c.key] = i[c.key];
  }), a), s = (a, i) => {
    const l = n(a), c = [];
    return e.forEach((d) => {
      const u = l[d.key], f = i[d.key];
      !Hn(u, f) && (u !== void 0 || f) && c.push(d.key);
    }), c;
  }, o = (a, i, l) => {
    let c = 0;
    const d = {};
    return (i?.length ? i.map((u) => e.find((f) => f.key === u)) : e).forEach((u) => {
      u.required && !a[u.key] ? (d[u.key] = {
        errorType: "required"
      }, u.validationMessage = u.validationMessage ?? l("This field is required"), c++) : u.validation && !u.validation(a[u.key]) && (d[u.key] = {
        errorType: "validation"
      }, u.validationMessage = u.validationMessage ?? l("Invalid value"), c++);
    }), c > 0 ? d : null;
  };
  return {
    config: e.filter((a) => a.comp !== "hidden"),
    getValues: n,
    setValues: r,
    diff: s,
    validateValues: o
  };
}
function Sd({
  values: t,
  items: e,
  css: n,
  activeBatch: r,
  autoSave: s,
  focus: o,
  readonly: a,
  topBar: i = !0,
  bottomBar: l = !0,
  layout: c = "default",
  placement: d = "inline",
  view: u,
  children: f,
  onChange: p,
  onSave: m,
  onAction: h,
  onValidation: w,
  hotkeys: x
}) {
  const y = $e(Je.i18n).getGroup("editor"), [k, v] = Oe(t), [D, $] = B(null), N = C(() => {
    const A = bd(e);
    D && A.config.forEach((fe) => {
      fe.comp === "section" && fe.key === D && (fe.sectionMode === "accordion" ? fe.activeSection || (A.config.forEach((se) => {
        se.comp === "section" && se.key !== fe.key && (se.activeSection = !1);
      }), fe.activeSection = !0) : fe.activeSection = !fe.activeSection);
    });
    let re = /* @__PURE__ */ new Set(), ye = null;
    return A.config.forEach((fe) => {
      fe.sectionMode === "exclusive" && fe.activeSection && (ye = fe.key), fe.activeSection && re.add(fe.key);
    }), A.config.forEach((fe) => {
      fe.hidden = fe.hidden || r && r !== fe.batch || ye && fe.key != ye && fe.section !== ye || fe.section && !re.has(fe.section);
    }), a ? {
      ...A,
      config: A.config.map((fe) => ({ ...fe, comp: "readonly" })),
      diff: () => []
    } : A;
  }, [e, D, r, a]), [T, Y] = B({}), [_, I] = B({}), H = k;
  O(() => {
    k !== void 0 && (Y(_n(k)), I(_n(k)), H.errors && (H.errors = oe()));
  }, [k]);
  const [M, R] = B([]);
  O(() => {
    k && R([]);
  }, [k]);
  function F(A) {
    return [...new Set(A)];
  }
  function oe(A) {
    const re = N.validateValues(T, A, y);
    return Hn(re, H.errors) || w && w({ errors: re, values: T }), re;
  }
  function he(A, re) {
    if (s && !H.errors) {
      const ye = N.setValues(k, re ?? _, A);
      v(ye), m && m({ changes: A, values: ye });
    } else
      R(A);
  }
  function K({ value: A, key: re, input: ye }) {
    let fe = { ..._ || {}, [re]: A };
    const se = {
      key: re,
      value: A,
      update: fe
    };
    if (ye && (se.input = ye), p && p(se), !k) return;
    fe = se.update, I(fe);
    const V = N.diff(k, fe), ie = N.setValues(
      { ...T || {} },
      fe,
      F([...V, re])
    );
    if (Y(ie), V.length) {
      const Q = s ? [] : F([...V, ...Object.keys(H.errors ?? {}), re]);
      H.errors = oe(Q), he(V, fe);
    } else {
      const Q = Object.keys(H.errors ?? {});
      Q.length && (H.errors = oe(Q)), R([]);
    }
  }
  function ue() {
    if (M.length && (s || (H.errors = oe()), !H.errors)) {
      m && m({
        changes: M,
        values: T
      });
      const A = N.setValues(k, _, M);
      v(A), R([]), v({ ...T });
    }
  }
  function ke({ item: A }) {
    A.id === "save" ? ue() : A.id === "toggle-section" && $(A.key), h && h({ item: A, values: T, changes: M });
  }
  return /* @__PURE__ */ g(
    u,
    {
      topBar: i,
      bottomBar: l,
      placement: d,
      layout: c,
      readonly: a,
      autoSave: s,
      css: n,
      data: _,
      editors: N,
      focus: o,
      hotkeys: x,
      errors: H.errors,
      onClick: ke,
      onKeyDown: ke,
      onChange: K,
      children: f
    }
  );
}
function $d(t) {
  const { editors: e, data: n, layout: r, errors: s, focus: o, onClick: a, onChange: i } = t, l = C(() => {
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
  return r === "columns" ? /* @__PURE__ */ U("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ g(
      qn,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: a,
        onChange: i
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ g(
      qn,
      {
        editors: l[1],
        data: n,
        focus: o,
        errors: s,
        onClick: a,
        onChange: i
      }
    ) })
  ] }) : /* @__PURE__ */ g(
    qn,
    {
      editors: e,
      data: n,
      focus: o,
      errors: s,
      onClick: a,
      onChange: i
    }
  );
}
function bs({
  items: t,
  values: e = null,
  top: n = !0,
  onClick: r,
  onChange: s
}) {
  const o = E(
    ({ item: a, value: i }) => {
      s && s({ key: a.key, value: i });
    },
    [s]
  );
  return t.length ? /* @__PURE__ */ g(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ g(
        ur,
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
const Ut = () => ({ comp: "spacer" }), Xn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Qn = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), Ss = () => ({
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
    bottomBar: a,
    layout: i,
    placement: l,
    errors: c,
    readonly: d,
    autoSave: u,
    children: f,
    onClick: p,
    onKeyDown: m,
    onChange: h,
    hotkeys: w
  } = t, x = $e(Je.i18n), y = C(() => x.getGroup("editor"), [x]), k = C(
    () => o === !0 && a === !0,
    [o, a]
  ), v = C(() => {
    let _ = o && o.items ? o.items.map((I) => ({ ...I })) : [];
    return k && (d ? _ = [Ut(), Ss()] : (u ? _ = [Ut(), Ss()] : l !== "modal" && (_ = [Ut(), Xn(y), Qn(y)]), i === "columns" && !_.length && (_ = [Ut(), Qn(y), Xn(y)]))), _;
  }, [o, k, d, u, l, i, y]), D = C(() => {
    let _ = a && a.items ? a.items.map((I) => ({ ...I })) : [];
    return k && (d || (l === "modal" && !u && (_ = [Ut(), Qn(y), Xn(y)]), i === "columns" && v.length && (_ = []))), _;
  }, [a, k, d, l, u, i, v, y]), $ = C(() => [...v, ...D], [v, D]), N = W(null), T = W(null);
  T.current = (_, ...I) => {
    const H = $.findIndex((F) => I.includes(F.id));
    if (H === -1) return !1;
    const M = _.target, R = $[H];
    _.key == "Escape" && (M.closest(".wx-combo") || M.closest(".wx-multicombo") || M.closest(".wx-richselect")) || _.key == "Delete" && (M.tagName === "INPUT" || M.tagName === "TEXTAREA") || (_.preventDefault(), m && m({ item: R }));
  };
  const Y = C(() => w === !1 ? {} : {
    "ctrl+s": (_) => T.current(_, "save"),
    escape: (_) => T.current(_, "cancel", "close"),
    "ctrl+d": (_) => T.current(_, "delete"),
    ...w || {}
  }, [w]);
  return oi(Y, N), /* @__PURE__ */ U("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: N, children: [
    /* @__PURE__ */ g(
      bs,
      {
        ...o && typeof o == "object" ? o : {},
        items: v,
        values: e,
        onClick: p,
        onChange: h
      }
    ),
    /* @__PURE__ */ U(
      "div",
      {
        className: `wx-85HDaNoA wx-content${i === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          f,
          /* @__PURE__ */ g(
            $d,
            {
              editors: n,
              layout: i,
              data: e,
              focus: r,
              errors: c,
              onClick: p,
              onChange: h
            }
          ),
          /* @__PURE__ */ g(
            bs,
            {
              ...a && typeof a == "object" ? a : {},
              items: D,
              values: e,
              top: !1,
              onClick: p,
              onChange: h
            }
          )
        ]
      }
    )
  ] });
}
function _d(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ g(Wi, { children: /* @__PURE__ */ g(
    Zn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ g(Pi, { onCancel: o, children: /* @__PURE__ */ g(
    Zn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ g(
    Zn,
    {
      css: `wx-inline-form ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  );
}
function Cd(t) {
  const {
    values: e = {},
    items: n = [],
    css: r = "",
    activeBatch: s = null,
    topBar: o = !0,
    bottomBar: a = !0,
    focus: i = !1,
    autoSave: l = !1,
    layout: c = "default",
    readonly: d = !1,
    placement: u = "inline",
    children: f,
    ...p
  } = t, m = Object.keys(p).reduce((h, w) => {
    if (/^on[a-z]/.test(w)) {
      const x = "on" + w.charAt(2).toUpperCase() + w.slice(3);
      x in p ? h[w] = p[w] : h[x] = p[w];
    } else
      h[w] = p[w];
    return h;
  }, {});
  return /* @__PURE__ */ g(In, { words: yd, optional: !0, children: /* @__PURE__ */ g(
    Sd,
    {
      view: _d,
      values: e,
      items: n,
      css: r,
      activeBatch: s,
      topBar: o,
      bottomBar: a,
      focus: i,
      autoSave: l,
      layout: c,
      readonly: d,
      placement: u,
      ...m,
      children: f
    }
  ) });
}
function Nd({ value: t, options: e, label: n }) {
  const r = $e(Je.i18n).getGroup("editor"), s = C(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const a = e.find((i) => i.id === t);
      a && (o = a.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(Zt, { label: n, children: s }) : null;
}
function Td({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-OmgQq65I wx-section${n ? " wx-section-active" : ""}`,
      onClick: () => r && r({
        item: { id: "toggle-section", key: n ? null : t }
      }),
      children: [
        /* @__PURE__ */ g("h3", { children: e }),
        /* @__PURE__ */ g(
          "i",
          {
            className: `wx-OmgQq65I wxi-angle-${n ? "down" : "right"} wx-icon`
          }
        )
      ]
    }
  );
}
rt("text", on);
rt("textarea", fi);
rt("checkbox", hi);
rt("readonly", Nd);
rt("section", Td);
pr(Ze);
function Dd({ api: t, autoSave: e, onLinksChange: n }) {
  const s = $e(Je.i18n).getGroup("gantt"), o = J(t, "activeTask"), a = J(t, "_activeTask"), i = J(t, "_links"), l = J(t, "schedule"), c = J(t, "unscheduledTasks"), [d, u] = B();
  function f() {
    if (o) {
      const w = i.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), x = i.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: w },
        { title: s("Successors"), data: x }
      ];
    }
  }
  O(() => {
    u(f());
  }, [o, i]);
  const p = C(
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
        data: y.data.filter((k) => k.link.id !== w)
      }))
    ), n && n({
      id: w,
      action: "delete-link",
      data: { id: w }
    }));
  }
  function h(w, x) {
    e ? t.exec("update-link", {
      id: w,
      link: x
    }) : (u(
      (y) => (y || []).map((k) => ({
        ...k,
        data: k.data.map(
          (v) => v.link.id === w ? { ...v, link: { ...v.link, ...x } } : v
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
  return /* @__PURE__ */ g(He, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ g(Zt, { label: w.title, position: "top", children: /* @__PURE__ */ g("table", { children: /* @__PURE__ */ g("tbody", { children: w.data.map((y) => /* @__PURE__ */ U("tr", { children: [
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ g(
        on,
        {
          type: "number",
          placeholder: s("Lag"),
          value: y.link.lag,
          disabled: c && a?.unscheduled,
          onChange: (k) => {
            k.input || h(y.link.id, { lag: k.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ g(
        gi,
        {
          value: y.link.type,
          placeholder: s("Select link type"),
          options: p,
          onChange: (k) => h(y.link.id, { type: k.value }),
          children: ({ option: k }) => k.label
        }
      ) }) }),
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g(
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
function Md(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...a } = t, i = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), i && i({ value: d });
  }
  return /* @__PURE__ */ U("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ g(
      Ei,
      {
        ...a,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ g(zi, { value: e, onChange: i, format: r }) : null
  ] });
}
rt("select", Rs);
rt("date", Md);
rt("twostate", Is);
rt("slider", tr);
rt("counter", Ri);
rt("links", Dd);
function Ed({
  api: t,
  items: e = [],
  css: n = "",
  layout: r = "default",
  readonly: s = !1,
  placement: o = "sidebar",
  bottomBar: a = !0,
  topBar: i = !0,
  autoSave: l = !0,
  focus: c = !1,
  hotkeys: d = {}
}) {
  const u = $e(Je.i18n), f = C(() => u || Nt({ ...An, ...nn }), [u]), p = C(() => f.getGroup("gantt"), [f]), m = f.getRaw(), h = C(() => {
    const j = m.gantt?.dateFormat || m.formats?.dateFormat;
    return ct(j, m.calendar);
  }, [m]), w = C(() => {
    if (i === !0 && !s) {
      const j = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: p("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: j } : {
        items: [
          ...j,
          {
            comp: "button",
            type: "primary",
            text: p("Save"),
            id: "save"
          }
        ]
      };
    }
    return i;
  }, [i, s, l, p]), [x, y] = B(!1), k = C(
    () => x ? "wx-full-screen" : "",
    [x]
  ), v = E((j) => {
    y(j);
  }, []);
  O(() => {
    const j = zo(v);
    return j.observe(), () => {
      j.disconnect();
    };
  }, [v]);
  const D = J(t, "_activeTask"), $ = J(t, "activeTask"), N = J(t, "unscheduledTasks"), T = J(t, "links"), Y = J(t, "splitTasks"), _ = C(
    () => Y && $?.segmentIndex,
    [Y, $]
  ), I = C(
    () => _ || _ === 0,
    [_]
  ), H = C(
    () => xo(),
    [N]
  ), M = J(t, "undo"), [R, F] = B({}), [oe, he] = B(null), [K, ue] = B(), [ke, A] = B(null), re = J(t, "taskTypes"), ye = C(() => {
    if (!D) return null;
    let j;
    if (I && D.segments ? j = { ...D.segments[_] } : j = { ...D }, s) {
      let be = { parent: j.parent };
      return H.forEach(({ key: Ee, comp: pe }) => {
        if (pe !== "links") {
          const xe = j[Ee];
          pe === "date" && xe instanceof Date ? be[Ee] = h(xe) : pe === "slider" && Ee === "progress" ? be[Ee] = `${xe}%` : be[Ee] = xe;
        }
      }), be;
    }
    return j || null;
  }, [D, I, _, s, H, h]);
  O(() => {
    ue(ye);
  }, [ye]), O(() => {
    F({}), A(null), he(null);
  }, [$]);
  function fe(j, be) {
    return j.map((Ee) => {
      const pe = { ...Ee };
      if (Ee.config && (pe.config = { ...pe.config }), pe.comp === "links" && t && (pe.api = t, pe.autoSave = l, pe.onLinksChange = ie), pe.comp === "select" && pe.key === "type") {
        const xe = pe.options ?? (re || []);
        pe.options = xe.map((Ae) => ({
          ...Ae,
          label: p(Ae.label)
        }));
      }
      return pe.comp === "slider" && pe.key === "progress" && (pe.labelTemplate = (xe) => `${p(pe.label)} ${xe}%`), pe.label && (pe.label = p(pe.label)), pe.config?.placeholder && (pe.config.placeholder = p(pe.config.placeholder)), be && (pe.isDisabled && pe.isDisabled(be, t.getState()) ? pe.disabled = !0 : delete pe.disabled), pe;
    });
  }
  const se = C(() => {
    let j = e.length ? e : H;
    return j = fe(j, K), K ? j.filter(
      (be) => !be.isHidden || !be.isHidden(K, t.getState())
    ) : j;
  }, [e, H, K, re, p, t, l]), V = C(
    () => se.map((j) => j.key),
    [se]
  );
  function ie({ id: j, action: be, data: Ee }) {
    F((pe) => ({
      ...pe,
      [j]: { action: be, data: Ee }
    }));
  }
  const Q = E(() => {
    for (let j in R)
      if (T.byId(j)) {
        const { action: be, data: Ee } = R[j];
        t.exec(be, Ee);
      }
  }, [t, R, T]), ce = E(() => {
    const j = $?.id || $;
    if (I) {
      if (D?.segments) {
        const be = D.segments.filter(
          (Ee, pe) => pe !== _
        );
        t.exec("update-task", {
          id: j,
          task: { segments: be }
        });
      }
    } else
      t.exec("delete-task", { id: j });
  }, [t, $, I, D, _]), q = E(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ae = E(
    (j) => {
      const { item: be, changes: Ee } = j;
      be.id === "delete" && ce(), be.id === "save" && (Ee.length ? q() : Q()), be.comp && q();
    },
    [t, $, l, Q, ce, q]
  ), ze = E(
    (j, be, Ee) => (N && j.type === "summary" && (j.unscheduled = !1), go(j, t.getState(), be), Ee || he(!1), j),
    [N, t]
  ), te = E(
    (j) => {
      j = {
        ...j,
        unscheduled: N && j.unscheduled && j.type !== "summary"
      }, delete j.links, delete j.data, (V.indexOf("duration") === -1 || j.segments && !j.duration) && delete j.duration;
      const be = {
        id: $?.id || $,
        task: j,
        ...I && { segmentIndex: _ }
      };
      l && oe && (be.inProgress = oe), t.exec("update-task", be), l || Q();
    },
    [
      t,
      $,
      N,
      l,
      Q,
      V,
      I,
      _,
      oe
    ]
  ), de = E(
    (j) => {
      let { update: be, key: Ee, input: pe } = j;
      if (pe && he(!0), j.update = ze({ ...be }, Ee, pe), !l) ue(j.update);
      else if (!ke && !pe) {
        const xe = se.find((Te) => Te.key === Ee), Ae = be[Ee];
        (!xe.validation || xe.validation(Ae)) && (!xe.required || Ae) && te(j.update);
      }
    },
    [l, ze, ke, se, te]
  ), Se = E(
    (j) => {
      l || te(j.values);
    },
    [l, te]
  ), _e = E((j) => {
    A(j.errors);
  }, []), Pe = C(
    () => M ? {
      "ctrl+z": (j) => {
        j.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (j) => {
        j.preventDefault(), t.exec("redo");
      }
    } : {},
    [M, t]
  );
  return ye ? /* @__PURE__ */ g(In, { children: /* @__PURE__ */ g(
    Cd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${k} ${n}`,
      items: se,
      values: ye,
      topBar: w,
      bottomBar: a,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: ae,
      onSave: Se,
      onValidation: _e,
      onChange: de,
      hotkeys: d && { ...Pe, ...d }
    }
  ) }) : null;
}
const Rd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = B(null);
  return O(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ g(Uc, { api: r, columns: e, children: t });
};
function Id(t) {
  const { api: e, content: n, children: r } = t, s = W(null), o = W(null), [a, i] = B({}), [l, c] = B(null), [d, u] = B({});
  function f(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const D = v.getAttribute("data-tooltip-id"), $ = v.getAttribute("data-tooltip-at"), N = v.getAttribute("data-tooltip");
        if (D || N) return { id: D, tooltip: N, target: v, at: $ };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  O(() => {
    const v = o.current;
    if (v && d && (d.text || n)) {
      const D = v.getBoundingClientRect();
      let $ = !1, N = d.left, T = d.top;
      D.right >= a.right && (N = a.width - D.width - 5, $ = !0), D.bottom >= a.bottom && (T = d.top - (D.bottom - a.bottom + 2), $ = !0), $ && u((Y) => Y && { ...Y, left: N, top: T });
    }
  }, [d, a, n]);
  const p = W(null), m = 300, h = (v) => {
    clearTimeout(p.current), p.current = setTimeout(() => {
      v();
    }, m);
  };
  function w(v) {
    let { id: D, tooltip: $, target: N, at: T } = f(v.target);
    if (u(null), c(null), !$)
      if (D)
        $ = y(D);
      else {
        clearTimeout(p.current);
        return;
      }
    const Y = v.clientX;
    h(() => {
      D && c(x(k(D)));
      const _ = N.getBoundingClientRect(), I = s.current, H = I ? I.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let M, R;
      T === "left" ? (M = _.top + 5 - H.top, R = _.right + 5 - H.left) : (M = _.top + _.height - H.top, R = Y - H.left), i(H), u({ top: M, left: R, text: $ });
    });
  }
  function x(v) {
    return e?.getTask(k(v)) || null;
  }
  function y(v) {
    return x(v)?.text || "";
  }
  function k(v) {
    const D = parseInt(v);
    return isNaN(D) ? v : D;
  }
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: s,
      onMouseMove: w,
      children: [
        d && (d.text || n) ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: o,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: n ? /* @__PURE__ */ g(n, { data: l }) : d.text ? /* @__PURE__ */ g("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        r
      ]
    }
  );
}
function Ad({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(jr, { fonts: t, children: e() }) : /* @__PURE__ */ g(jr, { fonts: t });
}
function Hd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Kr, { fonts: t, children: e }) : /* @__PURE__ */ g(Kr, { fonts: t });
}
function Ld({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Ur, { fonts: t, children: e }) : /* @__PURE__ */ g(Ur, { fonts: t });
}
const Bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: xd,
  Editor: Ed,
  Gantt: md,
  HeaderMenu: Rd,
  Material: Ad,
  Toolbar: wd,
  Tooltip: Id,
  Willow: Hd,
  WillowDark: Ld,
  defaultColumns: ho,
  defaultEditorItems: yo,
  defaultMenuOptions: mo,
  defaultTaskTypes: vo,
  defaultToolbarButtons: wo,
  getEditorItems: xo,
  getMenuOptions: lr,
  getToolbarButtons: cr,
  registerEditorItem: rt,
  registerScaleUnit: Fa
}, Symbol.toStringTag, { value: "Module" }));
export {
  Bd as default
};
