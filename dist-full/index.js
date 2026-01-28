import { jsx as g, jsxs as B, Fragment as Ce } from "react/jsx-runtime";
import zo, { useState as K, useEffect as Y, useRef as F, createContext as Pt, useContext as xe, useMemo as C, useCallback as R, forwardRef as Mt, useImperativeHandle as Dt, useId as Fo, Fragment as ks } from "react";
import { createPortal as Oo, flushSync as Po } from "react-dom";
function Be(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function Xn(t, e = "data-id") {
  const n = Be(t, e);
  return n ? n.getAttribute(e) : null;
}
function _t(t, e = "data-id") {
  const n = Be(t, e);
  return n ? Wt(n.getAttribute(e)) : null;
}
function Wt(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Wo() {
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
var Je = Wo();
function ur(t) {
  Object.assign(Je, t);
}
function Dr(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const i = Wt(o.dataset.id);
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
function bs(t, e) {
  Dr(t, e, "click"), e.dblclick && Dr(t, e.dblclick, "dblclick");
}
function Yo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Ss = /* @__PURE__ */ new Date(), bn = !1, fn = [], Ct = [], Er = (t) => {
  if (bn) {
    bn = !1;
    return;
  }
  for (let e = Ct.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = Ct[e];
    if (!(r > Ss) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Vo = (t) => {
  Ss = /* @__PURE__ */ new Date(), bn = !0;
  for (let e = Ct.length - 1; e >= 0; e--) {
    const { node: n } = Ct[e];
    if (!n.contains(t.target) && n !== t.target) {
      bn = !1;
      break;
    }
  }
};
function en(t, e) {
  fn.length || (fn = [
    Je.addGlobalEvent("click", Er, t),
    Je.addGlobalEvent("contextmenu", Er, t),
    Je.addGlobalEvent("mousedown", Vo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return Ct.push(n), {
    destroy() {
      Yo(Ct, n), Ct.length || (fn.forEach((r) => r()), fn = []);
    }
  };
}
var hn = (t) => t.indexOf("bottom") !== -1, pn = (t) => t.indexOf("left") !== -1, gn = (t) => t.indexOf("right") !== -1, Fn = (t) => t.indexOf("top") !== -1, Rr = (t) => t.indexOf("fit") !== -1, mn = (t) => t.indexOf("overlap") !== -1, Go = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Ko = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function jo(t, e) {
  let n = 0;
  const r = Je.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ge, Qe, jt, je;
function Bo(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ge = r, Qe = s, jt = "auto";
  let o = 0, i = 0;
  const a = Uo(t), l = mn(n) ? Je.getTopNode(t) : a;
  if (!a) return null;
  const c = a.getBoundingClientRect(), d = t.getBoundingClientRect(), u = l.getBoundingClientRect(), f = window.getComputedStyle(l), p = {
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
    const k = jo(e, a);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (je = e.getBoundingClientRect(), Rr(n) && (jt = je.width + "px"), n !== "point")
      if (Go(n))
        Rr(n) ? Ge = 0 : (Ge = u.width / 2, i = 1), Qe = (u.height - d.height) / 2;
      else {
        const k = mn(n) ? 0 : 1;
        Ge = gn(n) ? je.right + k : je.left - k, Qe = hn(n) ? je.bottom + 1 : je.top;
        const v = Ko(n);
        v && (gn(n) || pn(n) ? v === "center" ? Qe -= (d.height - je.height) / 2 : v === "end" && (Qe -= d.height - je.height) : (hn(n) || Fn(n)) && (v === "center" ? Ge -= (d.width - je.width) / 2 : v === "end" && (Ge -= d.width - je.width), mn(n) || (Ge += 1)));
      }
  } else je = { left: r, right: r, top: s, bottom: s };
  const m = (pn(n) || gn(n)) && (hn(n) || Fn(n));
  pn(n) && (i = 2);
  const h = Ge - d.width - u.left;
  e && pn(n) && !m && h < 0 && (Ge = je.right, i = 0);
  const w = Ge + d.width * (1 - i / 2) - u.right;
  if (w > 0)
    if (!gn(n))
      Ge = u.right - p.right - d.width;
    else {
      const k = je.left - u.x - d.width;
      e && !mn(n) && !m && k >= 0 ? Ge = je.left - d.width : Ge -= w + p.right;
    }
  i && (Ge = Math.round(Ge - d.width * i / 2));
  const x = h < 0 || w > 0 || !m;
  Fn(n) && (Qe = je.top - d.height, e && Qe < u.y && x && (Qe = je.bottom));
  const y = Qe + d.height - u.bottom;
  return y > 0 && (e && hn(n) && x ? Qe -= d.height + je.height + 1 : Qe -= y + p.bottom), Ge -= c.left + p.left, Qe -= c.top + p.top, Ge = Math.max(Ge, 0) + l.scrollLeft, Qe = Math.max(Qe, 0) + l.scrollTop, jt = jt || "auto", { x: Ge, y: Qe, z: o, width: jt };
}
function Uo(t) {
  const e = Je.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Ir = (/* @__PURE__ */ new Date()).valueOf();
function fr() {
  return Ir += 1, Ir;
}
var qo = class {
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
}, zt = [], Ar = {
  subscribe: (t) => {
    Xo();
    const e = new qo();
    return zt.push(e), t(e), () => {
      const n = zt.findIndex((r) => r === e);
      n >= 0 && zt.splice(n, 1);
    };
  }
}, Hr = !1;
function Xo() {
  Hr || (Hr = !0, document.addEventListener("keydown", (t) => {
    if (zt.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = zt.length - 1; s >= 0; s--) {
        const o = zt[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
function Ze(t) {
  return t < 10 ? "0" + t : t.toString();
}
function Qo(t) {
  const e = Ze(t);
  return e.length == 2 ? "0" + e : e;
}
function $s(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function Lr(t, e = 1) {
  let n = t.getDay();
  n === 0 && (n = 7), n = (n - e + 7) % 7;
  const r = new Date(t.valueOf());
  r.setDate(t.getDate() + (3 - n));
  const s = r.getFullYear(), o = Math.floor(
    (r.getTime() - new Date(s, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(o / 7);
}
var zr = ["", ""];
function Zo(t, e, n) {
  switch (t) {
    case "%d":
      return Ze(e.getDate());
    case "%m":
      return Ze(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Ze(e.getFullYear() % 100);
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
      return Ze((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Ze(e.getHours());
    case "%i":
      return Ze(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? n.pm : n.am) || zr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || zr)[1];
    case "%s":
      return Ze(e.getSeconds());
    case "%S":
      return Qo(e.getMilliseconds());
    case "%W":
      return Ze(Lr(e));
    case "%w":
      return Ze(Lr(e, n.weekStart ?? 1));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Ze(e.getMonth() + 1), r += "-" + Ze(e.getDate()), r += "T", r += Ze(e.getHours()), r += ":" + Ze(e.getMinutes()), r += ":" + Ze(e.getSeconds()), r;
    }
    case "%Q":
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return t;
  }
}
var Jo = /%[a-zA-Z]/g;
function ht(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      Jo,
      (r) => Zo(r, n, e)
    )) : "";
  };
}
function Fr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function Qn(t, e) {
  for (const n in e) {
    const r = e[n];
    Fr(t[n]) && Fr(r) ? t[n] = Qn(
      { ...t[n] },
      e[n]
    ) : t[n] = e[n];
  }
  return t;
}
function Et(t) {
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
      return n ? r = Qn({ ...e }, t) : r = Qn({ ...t }, e), Et(r);
    }
  };
}
function Ae(t) {
  const [e, n] = K(t), r = F(t);
  return Y(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ei(t, e, n) {
  const [r, s] = K(() => e);
  return t || console.warn(`Writable ${n} is not defined`), Y(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function Z(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ei(r[e], n[e], e);
}
function ft(t, e) {
  const [n, r] = K(() => null);
  return Y(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function ti(t, e) {
  const n = F(e);
  n.current = e;
  const [r, s] = K(1);
  return Y(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function qt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ti(r[e], n[e]);
}
function ni(t, e) {
  Y(() => {
    const n = e.current;
    if (n)
      return Ar.subscribe((r) => {
        r.configure(t, n);
      });
  }, [Ar, e]);
}
function hr(t, e) {
  return typeof t == "function" ? typeof e == "object" ? t(e) : t() : t;
}
function _s(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, a) => a.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Cs(t) {
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
function Or(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const i = Wt(o.dataset.id);
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
function ri(t, e) {
  const n = [Or(t, e, "click")];
  return e.dblclick && n.push(Or(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const si = "en-US", oi = {
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
}, ii = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, ai = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, tn = {
  core: ii,
  calendar: oi,
  formats: ai,
  lang: si
}, nn = Pt("willow"), li = Pt({}), st = Pt(null), pr = Pt(null), et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: pr,
  helpers: li,
  i18n: st,
  theme: nn
}, Symbol.toStringTag, { value: "Module" }));
function Yt(t) {
  const e = xe(pr);
  return t || e;
}
function ci({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a
}) {
  const l = Yt(e), [c, d] = Ae(t), u = R(
    (m) => {
      const h = m.target.value;
      d(h), a && a({ value: h, input: !0 });
    },
    [a]
  ), f = R(
    (m) => {
      const h = m.target.value;
      d(h), a && a({ value: h });
    },
    [a]
  ), p = F(null);
  return Y(() => {
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
      readOnly: i,
      title: r,
      value: c,
      onInput: u,
      ref: p
    }
  );
}
function pt({
  type: t = "",
  css: e = "",
  icon: n = "",
  disabled: r = !1,
  title: s = "",
  text: o = "",
  children: i,
  onClick: a
}) {
  const l = C(() => {
    let d = t ? t.split(" ").filter((u) => u !== "").map((u) => "wx-" + u).join(" ") : "";
    return e + (e ? " " : "") + d;
  }, [t, e]), c = (d) => {
    a && a(d);
  };
  return /* @__PURE__ */ B(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${l} ${n && !i ? "wx-icon" : ""}`,
      disabled: r,
      onClick: c,
      children: [
        n && /* @__PURE__ */ g("i", { className: "wx-2ZWgb4 " + n }),
        i || o || " "
      ]
    }
  );
}
function di({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const i = Fo(), a = Yt(t) || i, [l, c] = Ae(r);
  return /* @__PURE__ */ B("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ g(
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
    /* @__PURE__ */ B("label", { htmlFor: a, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Vt({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const i = F(null), [a, l] = Ae(t), [c, d] = Ae(e);
  return Y(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const f = u.getBoundingClientRect(), p = Je.getTopNode(u).getBoundingClientRect();
        f.right >= p.right && d("end"), f.bottom >= p.bottom && l("top");
      }
    }
  }, [n]), Y(() => {
    if (i.current) {
      const u = (f) => {
        r && r(f);
      };
      return en(i.current, u).destroy;
    }
  }, [r]), /* @__PURE__ */ g(
    "div",
    {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${a}-${c}`,
      style: { width: s },
      children: o
    }
  );
}
function rn() {
  return Et(tn);
}
function ui() {
  let t = null, e = !1, n, r, s, o;
  const i = (d, u, f, p) => {
    n = d, r = u, s = f, o = p;
  }, a = (d) => {
    t = d, e = t !== null, s(t);
  }, l = (d, u) => {
    if (d !== null && n) {
      const f = n.querySelectorAll(".wx-list > .wx-item")[d];
      f && (f.scrollIntoView({ block: "nearest" }), u && u.preventDefault());
    }
  }, c = (d, u) => {
    const f = d === null ? null : Math.max(0, Math.min(t + d, r.length - 1));
    f !== t && (a(f), n ? l(f, u) : requestAnimationFrame(() => l(f, u)));
  };
  return { move: (d) => {
    const u = _t(d), f = r.findIndex((p) => p.id == u);
    f !== t && a(f);
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
function Dn({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = F(), o = F(ui()), [i, a] = K(null), l = F(i), c = (xe(st) || rn()).getGroup("core"), d = (f) => {
    f && f.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  Y(() => {
    o.current.init(
      s.current,
      t,
      (f) => {
        a(f), l.current = f;
      },
      d
    );
  }, [t, s.current]), Y(() => {
    r && r(o.current);
  }, []);
  const u = R(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null ? null : /* @__PURE__ */ g(Vt, { onCancel: u, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: d,
      onMouseMove: o.current.move,
      children: t.length ? t.map((f, p) => /* @__PURE__ */ g(
        "div",
        {
          className: `wx-233fr7 wx-item ${p === i ? "wx-focus" : ""}`,
          "data-id": f.id,
          children: e ? hr(e, { option: f }) : f.label
        },
        f.id
      )) : /* @__PURE__ */ g("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function fi({
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
  const f = Yt(e), p = F(null), m = F(null), [h, w] = Ae(t), [x, y] = K(!1), [k, v] = K(""), T = F(null), $ = F(!1), _ = C(() => {
    if (x) return k;
    if (h || h === 0) {
      const X = (r || n).find((se) => se.id === h);
      if (X) return X[s];
    }
    return "";
  }, [x, k, h, r, n, s]), E = C(() => !_ || !x ? n : n.filter(
    (X) => X[s].toLowerCase().includes(_.toLowerCase())
  ), [_, x, n, s]), O = R(
    () => E.findIndex((X) => X.id === h),
    [E, h]
  ), N = R((X) => {
    p.current = X.navigate, m.current = X.keydown;
  }, []), A = R(
    (X, se) => {
      if (X || X === 0) {
        let he = n.find((b) => b.id === X);
        if (y(!1), se && p.current(null), he && h !== he.id) {
          const b = he.id;
          w(b), u && u({ value: b });
        }
      }
      !$.current && se && T.current.focus();
    },
    [n, h, u]
  ), I = R(
    ({ id: X }) => {
      A(X, !0);
    },
    [A]
  ), H = R(
    (X) => {
      X && X.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), M = R(
    (X) => {
      if (!n.length) return;
      if (X === "" && c) {
        H();
        return;
      }
      let se = n.find((b) => b[s] === X);
      se || (se = n.find(
        (b) => b[s].toLowerCase().includes(X.toLowerCase())
      ));
      const he = se ? se.id : h || n[0].id;
      A(he, !1);
    },
    [n, s, c, h, A, H]
  ), V = R(() => {
    v(T.current.value), y(!0), E.length ? p.current(0) : p.current(null);
  }, [E.length, p]), J = R(() => {
    $.current = !0;
  }, []), le = R(() => {
    $.current = !1, setTimeout(() => {
      $.current || M(_);
    }, 200);
  }, [M, _]);
  return /* @__PURE__ */ B(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => p.current(O()),
      onKeyDown: (X) => m.current(X, O()),
      title: i,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: f,
            ref: T,
            value: _,
            disabled: a,
            placeholder: o,
            onFocus: J,
            onBlur: le,
            onInput: V
          }
        ),
        c && !a && h ? /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !a && /* @__PURE__ */ g(Dn, { items: E, onReady: N, onSelect: I, children: ({ option: X }) => /* @__PURE__ */ g(Ce, { children: d ? d({ option: X }) : X[s] }) })
      ]
    }
  );
}
function sn({
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
  icon: f = "",
  clear: p = !1,
  onChange: m
}) {
  const h = Yt(e), [w, x] = Ae(t), y = F(null), k = C(
    () => f && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [f, u]
  ), v = C(
    () => f && u.indexOf("wx-icon-left") !== -1,
    [f, u]
  );
  Y(() => {
    const O = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(O);
  }, [r, s]);
  const T = R(
    (O) => {
      const N = O.target.value;
      x(N), m && m({ value: N, input: !0 });
    },
    [m]
  ), $ = R(
    (O) => m && m({ value: O.target.value }),
    [m]
  );
  function _(O) {
    O.stopPropagation(), x(""), m && m({ value: "" });
  }
  let E = o;
  return o !== "password" && o !== "number" && (E = "text"), Y(() => {
    const O = $, N = y.current;
    return N.addEventListener("change", O), () => {
      N && N.removeEventListener("change", O);
    };
  }, [$]), /* @__PURE__ */ B(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${k} ${l ? "wx-error" : ""} ${a ? "wx-disabled" : ""} ${p ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: y,
            id: h,
            readOnly: n,
            disabled: a,
            placeholder: i,
            type: E,
            style: c,
            title: d,
            value: w,
            onInput: T
          }
        ),
        p && !a && w ? /* @__PURE__ */ B(Ce, { children: [
          /* @__PURE__ */ g("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: _ }),
          v && /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` })
        ] }) : f ? /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` }) : null
      ]
    }
  );
}
function hi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = xe(st).getRaw(), i = t.getFullYear(), a = C(() => {
    switch (e) {
      case "month":
        return ht(o.monthYearFormat, s)(t);
      case "year":
        return ht(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = $s(i), u = ht(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, i, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ B("div", { className: "wx-8HQVQV wx-header", children: [
    n !== "right" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-left",
        onClick: () => r && r({ diff: -1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" }),
    /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-label", onClick: l, children: a }),
    n !== "left" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-right",
        onClick: () => r && r({ diff: 1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" })
  ] });
}
function gr({ onClick: t, children: e }) {
  return /* @__PURE__ */ g("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function pi({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (xe(st) || rn()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (v, T, $) => new Date(
    v.getFullYear(),
    v.getMonth() + (T || 0),
    v.getDate() + ($ || 0)
  );
  let d = n !== "normal";
  function u(v) {
    const T = v.getDay();
    return T === 0 || T === 6;
  }
  function f() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - (v.getDay() - (a - 7)) % 7), v;
  }
  function p() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + (6 - v.getDay() + a) % 7), v;
  }
  const m = F(0);
  function h(v, T) {
    T.timeStamp !== m.current && (m.current = T.timeStamp, T.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const w = C(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = C(() => {
    const v = f(), T = p(), $ = e.getMonth();
    let _ = [];
    for (let E = v; E <= T; E.setDate(E.getDate() + 1)) {
      const O = {
        day: E.getDate(),
        in: E.getMonth() === $,
        date: E.valueOf()
      };
      let N = "";
      if (N += O.in ? "" : " wx-inactive", N += w.indexOf(O.date) > -1 ? " wx-selected" : "", d) {
        const A = O.date == w[0], I = O.date == w[1];
        A && !I ? N += " wx-left" : I && !A && (N += " wx-right"), O.date > w[0] && O.date < w[1] && (N += " wx-inrange");
      }
      if (N += u(E) ? " wx-weekend" : "", r) {
        const A = r(E);
        A && (N += " " + A);
      }
      _.push({ ...O, css: N });
    }
    return _;
  }, [e, w, d, r]), y = F(null);
  let k = F({});
  return k.current.click = h, Y(() => {
    bs(y.current, k.current);
  }, []), /* @__PURE__ */ B("div", { children: [
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
function gi({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [i, a] = Ae(t || /* @__PURE__ */ new Date()), [l, c] = Ae(e || /* @__PURE__ */ new Date()), d = xe(st).getRaw().calendar, u = d.monthShort || [], f = C(() => l.getMonth(), [l]), p = R(
    (w, x) => {
      if (w != null) {
        x.stopPropagation();
        const y = new Date(l);
        y.setMonth(w), c(y), o && o({ current: y });
      }
      n === "normal" && a(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = R(() => {
    const w = new Date(Ns(i, n) || l);
    w.setMonth(l.getMonth()), w.setFullYear(l.getFullYear()), s && s(w);
  }, [i, l, n, s]), h = R(
    (w) => {
      const x = w.target.closest("[data-id]");
      if (x) {
        const y = parseInt(x.getAttribute("data-id"), 10);
        p(y, w);
      }
    },
    [p]
  );
  return /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-months", onClick: h, children: u.map((w, x) => /* @__PURE__ */ g(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (f === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ g(gr, { onClick: m, children: d.done }) })
  ] });
}
const On = "wx-1XEF33", mi = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = xe(st).getRaw().calendar, [a, l] = Ae(e), [c, d] = Ae(t), u = C(() => a.getFullYear(), [a]), f = C(() => {
    const { start: x, end: y } = $s(u), k = [];
    for (let v = x; v <= y; ++v)
      k.push(v);
    return k;
  }, [u]), p = {
    click: m
  };
  function m(x, y) {
    if (x) {
      y.stopPropagation();
      const k = new Date(a);
      k.setFullYear(x), l(k), s && s({ current: k });
    }
    o === "normal" && d(new Date(a)), n && n();
  }
  function h() {
    const x = new Date(Ns(c, o) || a);
    x.setFullYear(a.getFullYear()), r && r(x);
  }
  const w = F(null);
  return Y(() => {
    w.current && bs(w.current, p);
  }, []), /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g("div", { className: On + " wx-years", ref: w, children: f.map((x, y) => /* @__PURE__ */ g(
      "div",
      {
        className: On + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ g("div", { className: On + " wx-buttons", children: /* @__PURE__ */ g(gr, { onClick: h, children: i.done }) })
  ] });
}, Pr = {
  month: {
    component: pi,
    next: xi,
    prev: wi
  },
  year: {
    component: gi,
    next: vi,
    prev: yi
  },
  duodecade: {
    component: mi,
    next: bi,
    prev: ki
  }
};
function wi(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function xi(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function yi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function vi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function ki(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function bi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function Ns(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Si = ["clear", "today"];
function $i(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function _i({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a
}) {
  const l = xe(st).getGroup("calendar"), [c, d] = K("month"), u = Array.isArray(o) ? o : o ? Si : [], f = (x, y) => {
    x.preventDefault(), a && a({ value: y });
  }, p = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (x) => {
    const { diff: y, current: k } = x;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const v = Pr[c];
      n(y > 0 ? v.next(e) : v.prev(e));
    } else k && n(k);
    i && i();
  }, h = (x) => {
    d("month"), a && a({ select: !0, value: x });
  }, w = C(() => Pr[c].component, [c]);
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ B("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ g(hi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ B("div", { children: [
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
            gr,
            {
              onClick: (y) => f(y, $i(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function En(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = xe(st);
  const o = C(() => {
    let i = s;
    return (!i || !i.extend) && (i = Et(tn)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ g(st.Provider, { value: o, children: r });
}
function Wr(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const Ci = ["clear", "today"];
function Ts({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Ci,
  onChange: s
}) {
  const [o, i] = Ae(t), [a, l] = Ae(e);
  Y(() => {
    Wr(a, o, l, !1);
  }, [o, a]);
  const c = R(
    (u) => {
      const f = u.value;
      f ? (i(new Date(f)), Wr(a, new Date(f), l, !0)) : i(null), s && s({ value: f ? new Date(f) : null });
    },
    [s, a]
  ), d = R(
    (u) => {
      l(u);
    },
    [l]
  );
  return a ? /* @__PURE__ */ g(En, { children: /* @__PURE__ */ g(
    _i,
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
const Ni = ["clear", "today"];
function Ti({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: i = "",
  format: a = "",
  buttons: l = Ni,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: f = !1,
  onChange: p
}) {
  const { calendar: m, formats: h } = (xe(st) || rn()).getRaw(), w = a || h?.dateFormat;
  let x = typeof w == "function" ? w : ht(w, m);
  const [y, k] = K(t), [v, T] = K(!1);
  Y(() => {
    k(t);
  }, [t]);
  function $() {
    T(!1);
  }
  function _(N) {
    const A = N === y || N && y && N.valueOf() === y.valueOf() || !N && !y;
    k(N), A || p && p({ value: N }), setTimeout($, 1);
  }
  const E = C(
    () => y ? x(y) : "",
    [y, x]
  );
  function O({ value: N, input: A }) {
    if (!u && !f || A) return;
    let I = typeof u == "function" ? u(N) : N ? new Date(N) : null;
    I = isNaN(I) ? y || null : I || null, _(I);
  }
  return Y(() => {
    const N = $;
    return window.addEventListener("scroll", N), () => window.removeEventListener("scroll", N);
  }, []), /* @__PURE__ */ B("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => T(!0), children: [
    /* @__PURE__ */ g(
      sn,
      {
        css: c,
        title: d,
        value: E,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: $,
        onChange: O,
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
      Vt,
      {
        onCancel: $,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ g(
          Ts,
          {
            buttons: l,
            value: y,
            onChange: (N) => _(N.value)
          }
        )
      }
    )
  ] });
}
function Ms({
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
  const u = F(null), f = F(null);
  let [p, m] = Ae(t);
  function h(v) {
    u.current = v.navigate, f.current = v.keydown;
  }
  const w = C(() => p || p === 0 ? (n || e).find((v) => v.id === p) : null, [p, n, e]), x = R(
    ({ id: v }) => {
      (v || v === 0) && (m(v), u.current(null), d && d({ value: v }));
    },
    [m, d]
  ), y = R(
    (v) => {
      v.stopPropagation(), m(""), d && d({ value: "" });
    },
    [m, d]
  ), k = R(() => e.findIndex((v) => v.id === p), [e, p]);
  return /* @__PURE__ */ B(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => u.current(k()),
      onKeyDown: (v) => f.current(v, k()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ g("div", { className: "wx-2YgblL wx-label", children: w ? c ? c(w) : w[a] : r ? /* @__PURE__ */ g("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        l && !s && p ? /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ g(Dn, { items: e, onReady: h, onSelect: x, children: ({ option: v }) => c ? c(v) : v[a] })
      ]
    }
  );
}
function Zn({
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
  const d = Yt(t), [u, f] = Ae(o), p = F({ value: u, input: u }), m = C(
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
  Y(() => {
    f(o);
  }, [o]);
  const y = F(null);
  return Y(() => {
    if (y.current)
      return y.current.addEventListener("change", x), () => {
        y.current && y.current.removeEventListener("change", x);
      };
  }, [y, x]), /* @__PURE__ */ B("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
    e && /* @__PURE__ */ g("label", { className: "wx-2EDJ8G wx-label", htmlFor: d, children: e }),
    /* @__PURE__ */ g("div", { className: "wx-2EDJ8G wx-inner", children: /* @__PURE__ */ g(
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
        style: { background: h },
        ref: y
      }
    ) })
  ] });
}
const Mi = ({
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
  const c = Yt(t), [d, u] = Ae(e), f = R(() => {
    if (a || d <= r) return;
    const w = d - n;
    u(w), l && l({ value: w });
  }, [d, a, r, n, l]), p = R(() => {
    if (a || d >= s) return;
    const w = d + n;
    u(w), l && l({ value: w });
  }, [d, a, s, n, l]), m = R(() => {
    if (!a) {
      const w = Math.round(Math.min(s, Math.max(d, r)) / n) * n, x = isNaN(w) ? Math.max(r, 0) : w;
      u(x), l && l({ value: x });
    }
  }, [a, d, s, r, n, l]), h = R(
    (w) => {
      const x = w.target.value * 1;
      u(x), l && l({ value: x, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ B(
    "div",
    {
      className: `wx-22t21n wx-counter ${i ? "wx-disabled" : ""} ${a ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-dec",
            disabled: i,
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
            disabled: i,
            readOnly: a,
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
            disabled: i,
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
function Di({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ B(
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
function Ei({ data: t = [] }) {
  return /* @__PURE__ */ g("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ g(Di, { notice: e }, e.id)) });
}
function Ri({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const a = (xe(st) || rn()).getGroup("core"), l = F(null);
  Y(() => {
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
        i && i({ event: u });
        break;
    }
  }
  function d(u, f) {
    const p = { event: u, button: f };
    f === "cancel" ? i && i(p) : o && o(p);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-1FxkZa wx-modal",
      ref: l,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ B("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ g("div", { children: r }),
        s || e && /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ g(
          pt,
          {
            type: `block ${u === "ok" ? "primary" : "secondary"}`,
            onClick: (f) => d(f, u),
            children: a(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Ii({ children: t }, e) {
  const [n, r] = K(null), [s, o] = K([]);
  return Dt(
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
        i = { ...i }, i.id = i.id || fr(), i.remove = () => o((a) => a.filter((l) => l.id !== i.id)), i.expire != -1 && setTimeout(i.remove, i.expire || 5100), o((a) => [...a, i]);
      }
    }),
    []
  ), /* @__PURE__ */ B(Ce, { children: [
    t,
    n && /* @__PURE__ */ g(
      Ri,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ g(Ei, { data: s })
  ] });
}
Mt(Ii);
function Qt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const a = C(() => fr(), []);
  return /* @__PURE__ */ g(pr.Provider, { value: a, children: /* @__PURE__ */ B(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ g("label", { className: "wx-2oVUvC wx-label", htmlFor: a, children: t }),
        /* @__PURE__ */ g("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: hr(i, { id: a }) })
      ]
    }
  ) });
}
const Ds = ({
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
  onChange: f
}) => {
  const [p, m] = Ae(t), h = C(() => (p ? "pressed" : "") + (e ? " " + e : ""), [p, e]), w = R(
    (x) => {
      let y = !p;
      o && o(x), x.defaultPrevented || (m(y), f && f({ value: y }));
    },
    [p, o, f]
  );
  return p && u ? /* @__PURE__ */ g(
    pt,
    {
      title: i,
      text: p && c || l,
      css: a,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: hr(u, { value: p })
    }
  ) : d ? /* @__PURE__ */ g(
    pt,
    {
      title: i,
      text: p && c || l,
      css: a,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ g(
    pt,
    {
      title: i,
      text: p && c || l,
      css: a,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r
    }
  );
}, Yr = new Date(0, 0, 0, 0, 0);
function Ai({
  value: t = Yr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = Ae(t);
  const { calendar: d, formats: u } = (xe(st) || rn()).getRaw(), f = d.clockFormat == 12, p = 23, m = 59, h = C(() => {
    const b = i || u?.timeFormat;
    return typeof b == "function" ? b : ht(b, d);
  }, [i, u, d]), w = C(() => h(new Date(0, 0, 0, 1)).indexOf("01") != -1, [h]), x = (b, z) => (b < 10 && z ? `0${b}` : `${b}`).slice(-2), y = (b) => x(b, !0), k = (b) => `${b}`.replace(/[^\d]/g, "") || 0, v = (b) => f && (b = b % 12, b === 0) ? "12" : x(b, w), T = R((b, z) => (b = k(b), Math.min(b, z)), []), [$, _] = K(null), E = l || Yr, O = T(E.getHours(), p), N = T(E.getMinutes(), m), A = O > 12, I = v(O), H = y(N), M = C(
    () => h(new Date(0, 0, 0, O, N)),
    [O, N, h]
  ), V = R(() => {
    _(!0);
  }, []), J = R(() => {
    const b = new Date(E);
    b.setHours(b.getHours() + (A ? -12 : 12)), c(b), a && a({ value: b });
  }, [E, A, a]), le = R(
    ({ value: b }) => {
      if (E.getHours() === b) return;
      const z = new Date(E);
      z.setHours(b), c(z), a && a({ value: z });
    },
    [E, a]
  ), X = R(
    ({ value: b }) => {
      if (E.getMinutes() === b) return;
      const z = new Date(E);
      z.setMinutes(b), c(z), a && a({ value: z });
    },
    [E, a]
  ), se = R(
    (b) => (b = T(b, p), f && (b = b * 1, b === 12 && (b = 0), A && (b += 12)), b),
    [T, f, A]
  ), he = R(() => {
    _(null);
  }, []);
  return /* @__PURE__ */ B(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : V,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ g(
          sn,
          {
            id: e,
            css: r,
            title: n,
            value: M,
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
        $ && !s && /* @__PURE__ */ g(Vt, { onCancel: he, width: "unset", children: /* @__PURE__ */ B("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ B("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: I,
                onChange: (b) => {
                  const z = se(b.target.value);
                  le({ value: z });
                }
              }
            ),
            /* @__PURE__ */ g("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: H,
                onChange: (b) => {
                  const z = T(b.target.value, m);
                  X({ value: z });
                }
              }
            ),
            f && /* @__PURE__ */ g(
              Ds,
              {
                value: A,
                onClick: J,
                active: () => /* @__PURE__ */ g("span", { children: "pm" }),
                children: /* @__PURE__ */ g("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ g(Qt, { width: "unset", children: /* @__PURE__ */ g(
            Zn,
            {
              label: d.hours,
              value: O,
              onChange: le,
              max: p
            }
          ) }),
          /* @__PURE__ */ g(Qt, { width: "unset", children: /* @__PURE__ */ g(
            Zn,
            {
              label: d.minutes,
              value: N,
              onChange: X,
              max: m
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Hi({ children: t }) {
  return /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Li({ position: t = "right", children: e, onCancel: n }) {
  const r = F(null);
  return Y(() => en(r.current, n).destroy, []), /* @__PURE__ */ g("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Es({ theme: t = "", target: e, children: n }) {
  const r = F(null), s = F(null), [o, i] = K(null);
  r.current || (r.current = document.createElement("div"));
  const a = xe(nn);
  return Y(() => {
    i(
      e || zi(s.current) || Je.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Oo(
      /* @__PURE__ */ g(
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
function zi(t) {
  const e = Je.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Fi() {
  return /* @__PURE__ */ g(Ce, {});
}
function Vr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "material", children: /* @__PURE__ */ B(Ce, { children: [
    n && /* @__PURE__ */ g("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ B(Ce, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Fi, {}),
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
function Rs() {
  return /* @__PURE__ */ g(Ce, {});
}
function Gr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "willow", children: /* @__PURE__ */ B(Ce, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ B(Ce, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Rs, {}),
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
function Kr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "willow-dark", children: /* @__PURE__ */ B(Ce, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ B(Ce, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Rs, {}),
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
ur(Je);
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
};
var Oi = (/* @__PURE__ */ new Date()).valueOf(), Pi = () => Oi++;
function Wi(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!In(r, s)) return !1;
  }
  return !0;
}
function In(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
    return !1;
  if (typeof t == "object")
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let r = t.length - 1; r >= 0; r--)
        if (!In(t[r], e[r])) return !1;
      return !0;
    } else
      return Wi(t, e);
  return t === e;
}
function Sn(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(Sn);
  const e = {};
  for (const n in t)
    e[n] = Sn(t[n]);
  return e;
}
var Is = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, As = (/* @__PURE__ */ new Date()).valueOf(), Yi = () => As++;
function mr() {
  return "temp://" + As++;
}
var jr = class {
  constructor(e) {
    this._data = e, this._pool = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      this._pool.set(r.id, r);
    }
  }
  add(e) {
    e = { id: Yi(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, Vi = class {
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
    t.$level = n.$level + 1, this._pool.set(t.id, t), n.data ? e === -1 ? n.data = [...n.data, t] : Br(n, e, t) : n.data = [t];
  }
  addAfter(t, e) {
    if (!e) return this.add(t, -1);
    const n = this.byId(e), r = this.byId(n.parent), s = wn(r, n.id) + 1;
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
    const r = this._pool.get(n.parent), s = wn(r, n.id);
    n = { ...n, ...e }, r && s >= 0 && (r.data[s] = n, r.data = [...r.data]), this._pool.set(n.id, n);
  }
  move(t, e, n) {
    const r = this._pool.get(t), s = e === "child", o = this._pool.get(n), i = o.$level + (s ? 1 : 0);
    if (!r || !o) return;
    const a = this._pool.get(r.parent), l = s ? o : this._pool.get(o.parent);
    l.data || (l.data = []);
    const c = wn(a, r.id);
    Gi(a, c);
    const d = s ? l.data.length : wn(l, o.id) + (e === "after" ? 1 : 0);
    if (Br(l, d, r), a.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== i && (r.$level = i, this.setLevel(r, i + 1, !0)), this.update(r.id, r), this._clearBranch(a);
  }
  _clearBranch(t) {
    t.data && !t.data.length && (t.open && delete t.open, this.update(t.id, { data: null }));
  }
  toArray() {
    const t = [], e = this._pool.get(0).data;
    return e && Hs(e, t), t;
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
function Hs(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Hs(n.data, e);
  });
}
function Gi(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function Br(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function wn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Ls = 2, Ki = class {
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
      a ? (a.__parse(c, d, s, o) && (n[i] = c), o & Ls ? s[d] = a.__trigger : a.__trigger()) : (c && c.__reactive ? e[i] = this._wrapNested(c, c, d, s) : e[i] = this._wrapWritable(c), n[i] = c), s[d] = s[d] || null;
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
}, ji = class {
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
      s.length = Math.max(...s.in.map((o) => zs(o, this._sources, 1)));
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
    const e = this._setter(t, Ls);
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
function zs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => zs(o, e, n + 1));
  return Math.max(...s);
}
var Bi = class {
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
function Ui(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function qi(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function Xi({ key: t, order: e }) {
  const n = e === "asc" ? Ui : qi;
  return (r, s) => n(r[t], s[t]);
}
function Qi(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => Xi(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function Zi(t, e) {
  return t.sort(Qi(e));
}
class Ji extends Vi {
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
    const n = e.id || mr(), r = e.parent || 0, s = e.text || "", o = e.type || "task", i = e.progress || 0, a = e.details || "", l = { ...e, id: n, text: s, parent: r, progress: i, type: o, details: a };
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
    r && (Zi(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && Fs(n, e), e;
  }
}
function Fs(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Fs(n.data, e);
  });
}
function ye(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function mt(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function An(t, e) {
  const n = ye(t);
  return isNaN(e) ? mt(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function wr(t, e) {
  const n = ye(t);
  if (isNaN(e)) return mt(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = mt(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Os(t, e) {
  const n = +ye(t);
  return mt(t, n + e);
}
const Ps = 6048e5, ea = 864e5, Ws = 6e4, Ys = 36e5;
function ta(t, e) {
  return Os(t, e * Ys);
}
let na = {};
function Vs() {
  return na;
}
function $n(t, e) {
  const n = Vs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = ye(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Zt(t) {
  return $n(t, { weekStartsOn: 1 });
}
function ra(t) {
  const e = ye(t), n = e.getFullYear(), r = mt(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Zt(r), o = mt(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Zt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function Nt(t) {
  const e = ye(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = ye(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Gs(t, e) {
  const n = Nt(t), r = Nt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / ea);
}
function Ur(t) {
  const e = ra(t), n = mt(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Zt(n);
}
function sa(t, e) {
  return Os(t, e * Ws);
}
function oa(t, e) {
  const n = e * 3;
  return wr(t, n);
}
function Ks(t, e) {
  const n = e * 7;
  return An(t, n);
}
function ia(t, e) {
  return wr(t, e * 12);
}
function Xt(t, e) {
  const n = ye(t), r = ye(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function aa(t, e) {
  const n = Nt(t), r = Nt(e);
  return +n == +r;
}
function xr(t, e) {
  const n = Zt(t), r = Zt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / Ps);
}
function la(t, e) {
  const n = ye(t), r = ye(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function ca(t, e) {
  const n = ye(t), r = ye(e);
  return n.getFullYear() - r.getFullYear();
}
function yr(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function js(t, e) {
  return +ye(t) - +ye(e);
}
function da(t, e, n) {
  const r = js(t, e) / Ys;
  return yr(n?.roundingMethod)(r);
}
function ua(t, e, n) {
  const r = js(t, e) / Ws;
  return yr(n?.roundingMethod)(r);
}
function Bs(t) {
  const e = ye(t);
  return e.setHours(23, 59, 59, 999), e;
}
function vr(t) {
  const e = ye(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function fa(t) {
  const e = ye(t);
  return +Bs(e) == +vr(e);
}
function Us(t, e) {
  const n = ye(t), r = ye(e), s = Xt(n, r), o = Math.abs(la(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Xt(n, r) === -s;
    fa(ye(t)) && o === 1 && Xt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function ha(t, e, n) {
  const r = Us(t, e) / 3;
  return yr(n?.roundingMethod)(r);
}
function pa(t, e) {
  const n = ye(t), r = ye(e), s = Xt(n, r), o = Math.abs(ca(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Xt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function Jt(t) {
  const e = ye(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function qs(t) {
  const e = ye(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function ga(t) {
  const e = ye(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ma(t) {
  const e = ye(t), n = mt(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function wa(t) {
  const e = ye(t);
  return e.setMinutes(59, 59, 999), e;
}
function xa(t, e) {
  const n = Vs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = ye(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function kr(t) {
  const e = ye(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function Xs(t) {
  const e = ye(t), n = e.getFullYear(), r = e.getMonth(), s = mt(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function ya(t) {
  const e = ye(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Qs(t) {
  const e = ye(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : ya(e) ? 366 : 365;
}
function va(t) {
  const e = Ur(t), n = +Ur(Ks(e, 60)) - +e;
  return Math.round(n / Ps);
}
function Ht(t, e) {
  const n = ye(t), r = ye(e);
  return +n == +r;
}
function ka(t) {
  const e = ye(t);
  return e.setMinutes(0, 0, 0), e;
}
function ba(t, e, n) {
  const r = $n(t, n), s = $n(e, n);
  return +r == +s;
}
function Sa(t, e) {
  const n = ye(t), r = ye(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function $a(t, e) {
  const n = Jt(t), r = Jt(e);
  return +n == +r;
}
function _a(t, e) {
  const n = ye(t), r = ye(e);
  return n.getFullYear() === r.getFullYear();
}
const Jn = { year: pa, quarter: ha, month: Us, week: xr, day: Gs, hour: da, minute: ua }, xt = { year: { quarter: 4, month: 12, week: va, day: Ca, hour: Na }, quarter: { month: 3, week: Ta, day: Zs, hour: Ma }, month: { week: Da, day: Ea, hour: Ra }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Ca(t) {
  return t ? Qs(t) : 365;
}
function Na(t) {
  return Qs(t) * 24;
}
function Ta(t) {
  const e = Jt(t), n = An(Nt(kr(t)), 1);
  return xr(n, e);
}
function Zs(t) {
  if (t) {
    const e = Jt(t), n = kr(t);
    return Gs(n, e) + 1;
  }
  return 91;
}
function Ma(t) {
  return Zs(t) * 24;
}
function Da(t) {
  if (t) {
    const e = qs(t), n = An(Nt(vr(t)), 1);
    return xr(n, e);
  }
  return 5;
}
function Ea(t) {
  return t ? Xs(t) : 30;
}
function Ra(t) {
  return Xs(t) * 24;
}
function Cn(t, e, n) {
  const r = xt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Ia(t, e) {
  return t === e || !!(xt[t] && xt[t][e]);
}
const Nn = { year: ia, quarter: oa, month: wr, week: Ks, day: An, hour: ta, minute: sa };
function br(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !xt[t][o] || typeof xt[t][o] == "number" || to(t, r, s, n) ? Ut(t, r, s, o, i, n) : Aa(r, s, t, o, i, n);
}
function Ut(t, e, n, r, s, o) {
  const i = r || t;
  let a = n, l = e;
  if (s && (a = gt(i, n, o), l = gt(i, e, o), l < e && (l = dt(i)(l, 1))), t !== i) {
    const c = Jn[i](l, a), d = Cn(t, i, n);
    return c / d;
  } else return Jn[i](l, a);
}
function Aa(t, e, n, r, s, o) {
  let i = 0;
  const a = gt(n, e, o);
  if (e > a) {
    const c = Nn[n](a, 1);
    i = Ut(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return to(n, e, t, o) || (l = Ut(n, gt(n, t, o), e, void 0, void 0, o), e = Nn[n](e, l)), l += i + Ut(n, t, e, r, void 0, o), !l && s && (l = Ut(n, t, e, r, s, o)), l;
}
function dt(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Nn[t];
}
const Js = { year: ma, quarter: Jt, month: qs, week: (t, e) => $n(t, { weekStartsOn: e }), day: Nt, hour: ka };
function gt(t, e, n) {
  const r = Js[t];
  return r ? r(e, n) : new Date(e);
}
const Ha = { year: ga, quarter: kr, month: vr, week: (t, e) => xa(t, { weekStartsOn: e }), day: Bs, hour: wa }, eo = { year: _a, quarter: $a, month: Sa, week: (t, e, n) => ba(t, e, { weekStartsOn: n }), day: aa };
function to(t, e, n, r) {
  const s = eo[t];
  return s ? s(e, n, r) : !1;
}
const La = { start: Js, end: Ha, add: Nn, isSame: eo, diff: Jn, smallerCount: xt }, qr = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function za(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((a, l) => at.indexOf(a) - at.indexOf(l)).shift();
      let s = at.indexOf(r);
      const o = e[n][r], i = qr(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = at[a], c = qr(xt[l][r]);
        if (i <= c) break;
        s = a;
      }
      at.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) xt[r][t] = e[n][r];
    else La[n][t] = e[n];
  }
}
function Pn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Fa(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Ot(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: dt(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const at = ["year", "quarter", "month", "week", "day", "hour"], er = 50, tr = 300;
function Oa(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, a = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, l = !0);
  });
  const c = dt(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function Pa(t, e, n, r, s, o, i) {
  const a = Ot(i).unit, l = br(a, void 0, o), c = l(e, t, "", !0), d = gt(a, e, o);
  t = gt(a, t, o), e = d < e ? dt(a)(d, 1) : d;
  const u = c * r, f = s * i.length, p = i.map((h) => {
    const w = [], x = dt(h.unit);
    let y = gt(h.unit, t, o);
    for (; y < e; ) {
      const k = x(y, h.step), v = y < t ? t : y, T = k > e ? e : k, $ = l(T, v, "", !0) * r, _ = typeof h.format == "function" ? h.format(y, k) : h.format;
      let E = "";
      h.css && (E += typeof h.css == "function" ? h.css(y) : h.css), w.push({ width: $, value: _, date: v, css: E, unit: h.unit }), y = k;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return a !== n && (m = Math.round(m / Cn(a, n)) || 1), { rows: p, width: u, height: f, diff: l, start: t, end: e, lengthUnit: n, minUnit: a, lengthUnitWidth: m };
}
function Wa(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = at.indexOf(Ot(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = xn(s.minCellWidth, er)), l.maxCellWidth || (l.maxCellWidth = xn(s.maxCellWidth, tr));
  });
  else {
    const l = [], c = n.length || 1, d = xn(s.minCellWidth, er), u = xn(s.maxCellWidth, tr);
    n.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }), at.forEach((f, p) => {
      if (p === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (p) for (let h = c - 1; h > 0; h--) {
          const w = at[p - h];
          w && m.push({ unit: w, step: 1, format: e[w] });
        }
        m.push({ unit: f, step: 1, format: e[f] }), l.push({ minCellWidth: d, maxCellWidth: u, scales: m });
      }
    }), s.levels = l;
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level], a = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: a };
}
function Ya(t, e, n, r, s, o, i) {
  t.level = n;
  let a;
  const l = r.scales || r, c = Ot(l).unit, d = Va(c, s);
  if (e === -1) {
    const p = Cn(c, s);
    a = i * p;
  } else {
    const p = Cn(Ot(o).unit, c);
    a = Math.round(i / p);
  }
  const u = r.minCellWidth ?? er, f = r.maxCellWidth ?? tr;
  return { scales: l, cellWidth: Math.min(f, Math.max(u, a)), lengthUnit: d, zoom: t };
}
function Va(t, e) {
  const n = at.indexOf(t), r = at.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : at[r];
}
function xn(t, e) {
  return t ?? e;
}
const nr = 8, no = 4, Ga = 3, Xr = 7, Ka = nr + no;
function ro(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && oo(s, n, r), s.$x += e, ro(s, e, n, r);
  });
}
function rr(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    so(o, i, n, r), o.$x = i.xMin, o.$w = i.xMax - i.xMin, rr(t, o, n, r);
  }
}
function so(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && oo(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const i = s.$x + s.$w - o;
      e.xMax < i && (e.xMax = i);
    }
    s.type !== "summary" && so(s, e, n, r);
  });
}
function oo(t, e, n) {
  t.$x = Math.round(e.diff(t.start, e.start, e.lengthUnit) * n), t.$w = Math.round(e.diff(t.end, t.start, e.lengthUnit, !0) * n);
}
function Sr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = Sr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
    const o = s.end || s.start;
    o && (!r.end || r.end < o) && (r.end = new Date(o));
  });
  else if (t.type === "summary") throw Error("Summary tasks must have start and end dates if they have no subtasks");
  return r;
}
function io(t, e, n) {
  return Qr(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    io(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && Qr(t, e, n, !0), t;
}
function Qr(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = n, { start: l, end: c, lengthUnit: d, diff: u } = i, f = (r ? "base_" : "") + "start", p = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), h = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let k = t[f], v = t[p];
  if (r && !k) {
    t[y] = !0;
    return;
  }
  t[f] < l && (t[p] < l || Ht(t[p], l)) ? k = v = l : t[f] > c && (k = v = c), t[m] = Math.round(u(k, l, d) * s), t[h] = r ? t.$y + t.$h + no : o * e + Ga, t[w] = Math.round(u(v, k, d, !0) * s), t[x] = r ? nr : a ? o - Xr - Ka : o - Xr, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[h] = t.$y + nr, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Ht(k, v);
}
const Wn = 20, ja = function(t, e, n, r, s) {
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
    const f = Ua(l, c + o, d, u + o, i, a, r / 2, s), p = qa(d, u + o, a);
    t.$p = `${f},${p}`, t.$pl = Ba(t.$p);
  }
  return t;
};
function Ba(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s], [a, l] = n[s + 1];
    r += Math.hypot(a - o, l - i);
  }
  return r;
}
function Ua(t, e, n, r, s, o, i, a) {
  const l = Wn * (s ? -1 : 1), c = Wn * (o ? -1 : 1), d = t + l, u = n + c, f = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], p = u - d;
  let m = r - e;
  const h = o === s;
  return h || (u <= t + Wn - 2 && o || u > t && !o) && (m = a ? m - i + 6 : m - i), h && o && d > u || h && !o && d < u ? (f[4] = f[2] + p, f[5] = f[3], f[6] = f[4], f[7] = f[5] + m) : (f[4] = f[2], f[5] = f[3] + m, f[6] = f[4] + p, f[7] = f[5]), f.join(",");
}
function qa(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function ao(t) {
  return t.map((e) => {
    const n = e.id || mr();
    return { ...e, id: n };
  });
}
const lo = ["start", "end", "duration"];
function Xa(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !lo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function Qa(t, e) {
  return typeof e == "function" ? e : lo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => Xa(n, r.id) ? e : null) : e;
}
function Za(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && Qa(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const co = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Lt(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, a = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], f = { "indent-task:remove": 2 }, p = !i && d.includes(e), m = { parent: u.includes(e), level: f[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !p)) {
    if (e !== "paste-task" && (t._temp = null), a.includes(e) || p || s.length === 1) Zr(t, e, n, r);
    else if (i) {
      const h = l.includes(e) ? s : Ja(s, o, m);
      c.includes(e) && h.reverse();
      const w = t.getHistory();
      w && w.startBatch(), h.forEach((x, y) => Zr(t, e, x, r, y)), w && w.endBatch();
    }
  }
}
function Ja(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function Zr(t, e, n, r, s) {
  const o = t.exec ? t.exec : t.in.exec;
  let i = e.split(":")[0], a = e.split(":")[1];
  const l = n?.id || n;
  let c = { id: l }, d = {}, u = !1;
  if (i == "copy-task" || i == "cut-task") {
    t._temp || (t._temp = []), t._temp.push({ id: l, cut: i == "cut-task" });
    return;
  } else if (i == "paste-task") {
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
  } else i === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: l, show: !0, select: !1 }, c = {}, u = !0) : i === "edit-task" ? (i = "show-editor", a === "segment" && typeof n == "object" && (d = n)) : i === "convert-task" ? (i = "update-task", d = { task: { type: a } }, a = void 0) : i === "indent-task" && (a = a === "add");
  if (i === "split-task" && typeof n == "object") d = n;
  else if (i === "delete-task" && a === "segment" && typeof n == "object") {
    const f = t.getTask(l), { segmentIndex: p } = n, m = f.segments.filter((h, w) => w !== p);
    o("update-task", { id: l, task: { segments: m } });
    return;
  }
  typeof a < "u" && (d = { mode: a, ...d }), c = { ...c, ...d }, o(i, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function $r(t, e) {
  return t.some((n) => n.data ? $r(n.data, e) : n.id === e);
}
const Jr = (t, e) => dt(t, e), el = (t, e) => br(t, e);
function sr(t, e) {
  Array.isArray(t) && (t.forEach((n) => St(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Sr(n, t);
      n.start = r, n.end = s, St(n, e);
    }
  }));
}
function St(t, e) {
  t.unscheduled || es(t, e, !1), t.base_start && es(t, e, !0);
}
function es(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, a, l] = uo(n);
  t.type === "milestone" ? (t[l] = 0, t[a] = void 0) : t[i] && (t[l] ? t[a] = Jr(o, r)(t[i], t[l]) : t[a] ? t[l] = el(o, r)(t[a], t[i]) : (t[a] = Jr(o, r)(t[i], 1), t[l] = 1));
}
function uo(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function ts(t, e, n) {
  const [r, s, o] = uo(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function fo(t, e, n) {
  ts(t, n, !1), t.base_start && ts(t, n, !0), St(t, e);
}
class tl extends Ki {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new ji(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: a, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!a || !l || u) {
        const f = Ot(d).unit, p = Oa(a, l, u, f, c);
        (p._end != o || p._start != i) && this.setState(p, s);
      } else this.setState({ _start: a, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: a, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: f } = o, p = Ot(u).unit;
      Ia(p, i) || (i = p);
      const m = Pa(a, l, i, c, d, f, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), f = a.toArray().map((p, m) => io(p, m, { cellWidth: o, cellHeight: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: f }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: a, baselines: l, criticalPath: c } = this.getState(), d = i.map((u) => {
        const f = o.byId(u.source), p = o.byId(u.target);
        return ja(u, f, p, a, l);
      }).toSorted((u, f) => c ? !!u.$critical == !!f.$critical ? f.$pl - u.$pl : u.$critical ? 1 : -1 : f.$pl - u.$pl).filter((u) => u !== null);
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
    } }], { tasks: (s) => new Ji(s), links: (s) => new jr(s), columns: (s) => Za(s) });
    const n = this.in = new Bi();
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
      const { selected: c, _tasks: d, activeTask: u, splitTasks: f } = this.getState();
      let p = !1, m;
      if (c.length && (o || i)) {
        const w = [...c];
        if (i) {
          const x = w[w.length - 1], y = d.findIndex((_) => _.id == x), k = d.findIndex((_) => _.id == s), v = Math.min(y, k), T = Math.max(y, k) + 1, $ = d.slice(v, T).map((_) => _.id);
          y > k && $.reverse(), $.forEach((_) => {
            w.includes(_) || w.push(_);
          });
        } else if (o) {
          const x = w.findIndex((y) => y == s);
          x === -1 ? w.push(s) : (p = !0, w.splice(x, 1));
        }
        m = w;
      } else m = [s];
      const h = { selected: m };
      a && m.length && (h._scrollTask = { id: m[0], mode: a }), this.setStateAsync(h), !p && u && (u !== s || f) && n.exec("show-editor", { id: s, ...f && { segmentIndex: l } });
    }), n.on("delete-link", ({ id: s }) => {
      const { links: o } = this.getState();
      o.remove(s), this.setStateAsync({ links: o });
    }), n.on("update-link", (s) => {
      const { links: o } = this.getState(), i = s.id;
      let a = s.link;
      o.update(i, a), a = o.byId(i), !a.lag && a.lag !== 0 && delete a.lag, this.setStateAsync({ links: o }), s.link = a;
    }), n.on("add-link", (s) => {
      const { link: o } = s, { links: i } = this.getState();
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || mr(), i.add(o), this.setStateAsync({ links: i }), s.id = o.id, s.link = i.byId(o.id));
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
        let f = o.getIndexById(l);
        if (i === "up") {
          const p = d.parent === 0;
          if (f === 0 && p) {
            s.skipProvider = !0;
            return;
          }
          f -= 1, i = "before";
        } else if (i === "down") {
          const p = f === u.length - 1, m = d.parent === 0;
          if (p && m) {
            s.skipProvider = !0;
            return;
          }
          f += 1, i = "after";
        }
        if (a = u[f] && u[f].id || d.parent, a) {
          const p = o.getBranch(a);
          let m = o.getIndexById(a), h = p[m];
          if (h.data) {
            if (i === "before") {
              if (h.parent === d.parent) {
                for (; h.data; ) h.open || n.exec("open-task", { id: h.id, mode: !0 }), h = h.data[h.data.length - 1];
                a = h.id;
              }
            } else if (i === "after") {
              let y;
              h.parent === d.parent ? (y = h, h = h.data[0], a = h.id, i = "before") : p.length - 1 !== m && (y = h, m += 1, h = p[m], d.$level > h.$level && h.data ? (y = h, h = h.data[0], a = h.id, i = "before") : a = h.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const w = o.getSummaryId(d.id);
          o.move(l, i, a);
          const x = o.getSummaryId(l);
          w != x && (w && this.resetSummaryDates(w, "move-task"), x && this.resetSummaryDates(x, "move-task"));
        }
      } else {
        const u = o.byId(a);
        let f = u, p = !1;
        for (; f.$level > d.$level; ) f = o.byId(f.parent), f.id === l && (p = !0);
        if (p) return;
        const m = o.getSummaryId(d.id);
        if (o.move(l, i, a), i == "child") {
          let w = u;
          for (; w.id !== 0 && !w.open; ) n.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        }
        const h = o.getSummaryId(l);
        m != h && (m && this.resetSummaryDates(m, "move-task"), h && this.resetSummaryDates(h, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = a, s.mode = i;
    }), n.on("drag-task", (s) => {
      const o = this.getState(), { tasks: i, _tasks: a, _selected: l, _scales: c, cellWidth: d } = o, u = i.byId(s.id), { left: f, top: p, width: m, inProgress: h } = s, w = { _tasks: a, _selected: l };
      if (typeof m < "u" && (u.$w = m, rr(i, u, c, d)), typeof f < "u") {
        if (u.type === "summary") {
          const x = f - u.$x;
          ro(u, x, c, d);
        }
        u.$x = f, rr(i, u, c, d);
      }
      typeof p < "u" && (u.$y = p + 4, u.$reorder = h), typeof m < "u" && (u.$w = m), typeof f < "u" && (u.$x = f), typeof p < "u" && (u.$y = p + 4, u.$reorder = h), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: a, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: f, splitTasks: p, calendar: m } = this.getState(), h = d.byId(o), w = { durationUnit: f, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        St(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = dt(x);
      const k = br(x, m);
      if (a && (c.start && (c.start = y(c.start, a)), !i && i !== 0 && (c.start && c.end ? c.duration = h.duration : (c.start ? c.end = h.end : (c.end = y(c.end, a), c.start = h.start, c.duration = k(c.end, c.start)), k(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? h.type, m && c.start && (c.start = Pn(c.start, a, m)), c.start && c.end && (!Ht(c.start, h.start) || !Ht(c.end, h.end)) && c.type === "summary" && h.data?.length) {
        let T = a || k(c.start, h.start);
        m && (T = c.start > h.start ? k(c.start, h.start) : -k(h.start, c.start), y = Fa(m)), this.moveSummaryKids(h, ($) => ($ = y($, T), m ? Pn($, a, m) : $), "update-task");
      }
      c.start || (c.start = h.start), !c.end && !c.duration && (c.duration = h.duration), St(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && h.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const v = d.getSummaryId(o);
      v && this.resetSummaryDates(v, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: i, unscheduledTasks: a, durationUnit: l, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: f, task: p, show: m, select: h = !0 } = s;
      !s.eventSource && a && (p.unscheduled = !0);
      let w = -1, x, y;
      if (u ? (y = o.byId(u), f == "child" ? (x = y, p.parent = x.id) : (y.parent !== null && (x = o.byId(y.parent), p.parent = x.id), w = o.getIndexById(u), f == "after" && (w += 1))) : p.parent && (x = o.byId(p.parent)), !p.start) {
        if (x?.start) p.start = new Date(x.start.valueOf());
        else if (y) p.start = new Date(y.start.valueOf());
        else {
          const $ = o.getBranch(0);
          let _;
          if ($?.length) {
            const E = $[$.length - 1];
            if (!E.$skip) {
              const O = new Date(E.start.valueOf());
              i.start <= O && (_ = O);
            }
          }
          p.start = _ || dt(l, d)(i.start, 1);
        }
        p.duration = 1;
      }
      d && (p.start = Pn(p.start, 1, d)), this.getState().baselines && (p.base_start = p.start, p.base_duration = p.duration), St(p, { durationUnit: l, calendar: d });
      const k = o.add(p, w), v = { tasks: o };
      if (x && m) {
        for (; x && x.id; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        v._scrollTask = { id: k.id, mode: m };
      }
      s.id = k.id;
      const T = o.getSummaryId(k.id);
      T && this.resetSummaryDates(T, "add-task"), this.setStateAsync(v), s.id = k.id, s.task = k, h && n.exec("select-task", { id: k.id });
    }), n.on("delete-task", (s) => {
      const { id: o } = s, { tasks: i, links: a, selected: l } = this.getState();
      s.source = i.byId(o).parent;
      const c = i.getSummaryId(o), d = [o];
      i.eachChild((f) => d.push(f.id), o), a.filter((f) => !(d.includes(f.source) || d.includes(f.target)));
      const u = { tasks: i, links: a };
      l.includes(o) && (u.selected = l.filter((f) => f !== o)), i.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(u);
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
      const u = c.getSummaryId(o), f = c.getSummaryId(i);
      let p = c.getIndexById(i);
      a == "before" && (p -= 1);
      const m = c.byId(o), h = c.copy(m, c.byId(i).parent, p + 1);
      s.source = s.id, s.id = h[0][1], m.lazy && (s.lazy = !0), u != f && f && this.resetSummaryDates(f, "copy-task");
      let w = [];
      for (let x = 1; x < h.length; x++) {
        const [y, k] = h[x];
        d.forEach((v) => {
          if (v.source === y) {
            const T = { ...v };
            delete T.target, w.push({ ...T, source: k });
          } else if (v.target === y) {
            const T = { ...v };
            delete T.source, w.push({ ...T, target: k });
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], sr(s.data.tasks, { durationUnit: a, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new jr(i.map((u) => u).concat(ao(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: a, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let f = a;
      s < 0 && (f = l || a);
      const p = f + s * 50, m = i.levels[i.level], h = s < 0 && a > m.maxCellWidth;
      if (p < m.minCellWidth || p > m.maxCellWidth || h) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: p, _cellWidth: p });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: k } = this.getState(), v = gt(w.minUnit, x, k), T = w.diff(u, v, "hour");
      typeof o > "u" && (o = y);
      let $ = Math.round(T * y) - o;
      $ < 0 && ($ = 0), this.setState({ scrollLeft: $, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: a, end: l, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: f } = this.getState(), p = dt(i.minUnit);
      let m = i.width;
      if (a && l) {
        if (m < s && m) {
          const k = s / m;
          this.setState({ cellWidth: d * k });
        }
        return !0;
      }
      let h = 0;
      for (; m < s; ) m += d, h++;
      const w = h ? l ? -h : -1 : 0, x = a || p(o, w);
      let y = 0;
      if (u) {
        const k = i.diff(u, x, "hour");
        y = Math.max(0, Math.round(k * d) - (f || 0));
      }
      this.setState({ _start: x, _end: l || p(c, h), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: i }) => {
      const a = this.getState(), { tasks: l } = a;
      let c = a._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && i ? (c.forEach((f, p) => {
        f.key === s && (u = p);
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
          Lt(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          Lt(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          Lt(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), Lt(this, "delete-task", null, null);
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
      const { cellWidth: o, scales: i, _scales: a } = this.getState(), l = Ya(e, n, r, s, a.lengthUnit, i, o);
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
      const d = Sr({ ...l, start: void 0, end: void 0, duration: void 0 });
      if (!Ht(l.start, d.start) || !Ht(l.end, d.end)) {
        r ? (St(d, { durationUnit: o, calendar: a }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: n, skipUndo: !0 });
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
    return dt("hour")(gt(n.minUnit, r, s), Math.floor(e / o));
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
function nl(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = rl(s, t, e, 1, n);
    sl(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function rl(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function sl(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function or(t) {
  return [...ho];
}
function _r(t) {
  return t.map((e) => {
    switch (e.data && _r(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => il(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => al(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => ll(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => ol(n);
        break;
    }
    return e;
  });
}
function ol(t) {
  return t.parent === 0;
}
function il(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function al(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function ll(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function ns(t) {
  return t && typeof t == "object";
}
function cl(t) {
  return !t.selected || t.selected.length < 2;
}
const dl = (t) => (e) => e.type === t, ho = _r([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: dl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => ns(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => cl(e) && ns(n) }]);
function ir(t) {
  return [...po];
}
const po = _r([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Yn(t) {
  return t.type === "summary";
}
function Vn(t) {
  return t.type === "milestone";
}
function Gn(t) {
  return typeof t.parent > "u";
}
function Kn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function go(t) {
  return [...mo];
}
const mo = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Gn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Yn(t), isDisabled: Kn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Yn(t) || Vn(t), isDisabled: Kn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Yn(t) || Vn(t), isDisabled: Kn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Vn(t) || Gn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Gn(t) }], wo = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], vt = Pt(null);
(/* @__PURE__ */ new Date()).valueOf();
function ul(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!on(r, s)) return !1;
  }
  return !0;
}
function on(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime()) return !1;
  if (typeof t == "object") if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    for (let n = t.length - 1; n >= 0; n--) if (!on(t[n], e[n])) return !1;
    return !0;
  } else return ul(t, e);
  return t === e;
}
function ar(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(ar);
  const e = {};
  for (const n in t) e[n] = ar(t[n]);
  return e;
}
var xo = 2, fl = class {
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
      l ? (l.__parse(d, u, o, i) && (r[a] = d), i & xo ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[a] = this._wrapNested(d, d, u, o) : n[a] = this._wrapWritable(d), r[a] = d), o[u] = o[u] || null;
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
}, hl = class {
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
      o.length = Math.max(...o.in.map((i) => yo(i, this._sources, 1)));
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
    const n = this._setter(e, xo);
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
function yo(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => yo(o, e, n + 1));
  return Math.max(...s);
}
var pl = class {
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
function gl(t) {
  return (e) => e[t];
}
function ml(t) {
  return (e, n) => e[t] = n;
}
function Tt(t, e) {
  return (e.getter || gl(e.id))(t);
}
function rs(t, e, n) {
  return (e.setter || ml(e.id))(t, n);
}
function ss(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function yt(t, e) {
  let n = Tt(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function wl(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, a = t.flatData;
  e.header !== !1 && i[0].header && (r = os("header", i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = yt(a[l], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = os("footer", i, r, o, s)), r;
}
function os(t, e, n, r, s) {
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
function xl(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const a = t._columns, l = t.flatData, c = t._sizes;
  for (const u of a) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && a[0].header && (is("header", a, r, s, d, e, n), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += a[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const f = [];
    for (let p = 0; p < a.length; p++) {
      const m = l[u], h = a[p], w = Tt(m, h) ?? "";
      let x = yt(m, h), y;
      e.cellStyle && (y = e.cellStyle(w, m, h)), e.cellTemplate && (x = e.cellTemplate(w, m, h) ?? x);
      const k = vo(x, 2, y, n);
      f.push(k);
    }
    r.push(f), i.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && a[0].footer && (is("footer", a, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function is(t, e, n, r, s, o, i) {
  for (let a = 0; a < e[0][t].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][a], u = d.colspan ? d.colspan - 1 : 0, f = d.rowspan ? d.rowspan - 1 : 0;
      (u || f) && r.push({ from: { row: a + s, column: c }, to: { row: a + s + f, column: c + u } });
      let p = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(p, d, e[c], t)), o.headerCellTemplate && (p = o.headerCellTemplate(p, d, e[c], t) ?? p);
      let h;
      t == "header" ? a == e[0][t].length - 1 ? h = 1 : h = 0 : a ? h = 4 : h = 3;
      const w = vo(p, h, m, i);
      l.push(w);
    }
    n.push(l);
  }
}
function vo(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = vl(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => on(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function yl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], a = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...l, borderBottom: a, borderRight: a };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function vl(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const kl = "portrait", bl = 100, Sl = "a4", $l = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function _l(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((a) => !a.hidden), i = Cl(e);
  return o.forEach((a, l) => {
    s + a.width <= i ? (s += a.width, r.push(a)) : (r.length && n.push(r), r = [a], s = a.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function as(t, e, n) {
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
            l.colspan = d, l.width = t.slice(o, o + c + 1).reduce((u, f) => u + f.width, 0), d > 1 && (c = d - 1);
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
function Cl(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = $l[r];
  return Nl(e === "portrait" ? s : o, n);
}
function Nl(t, e) {
  return t * e;
}
function Tl(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || kl, ppi: n || bl, paper: r || Sl };
}
function ko(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Ml(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const ls = ["resize-column", "hide-column", "update-cell"], Dl = ["delete-row", "update-row", "update-cell"], El = ["move-item"], Rl = ["resize-column", "move-item"];
let Il = class {
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
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), i = Tt(s, o);
      return on(i, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: i }, source: { action: "update-cell", data: e } };
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
        if (Rl.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (El.includes(n) && this.setPrev("flatData"), ls.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Dl.includes(n) && this.setPrev("data"), ls.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = ar(this.getState()[e]);
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
function bo() {
  let t = !0;
  return t = !1, t;
}
function So(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Al(t, e) {
  return -So(t, e);
}
function Hl(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? So : Al;
  return function(r, s) {
    return n(Tt(r, e), Tt(s, e));
  };
}
function Ll(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Hl(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const yn = 28, zl = 20;
function Fl() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Tn(t, e, n, r, s) {
  const o = document.createElement("div"), i = document.createElement("div"), a = document.body;
  s = s ? `${s}px` : "auto";
  let l, c;
  i.className = e, o.classList.add(`wx-${n}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(i), a.appendChild(o), typeof t != "object" && (t = [t]);
  for (let d = 0; d < t.length; d++) {
    i.innerText = t[d] + "";
    const u = o.getBoundingClientRect(), f = Math.ceil(u.width) + (r && r.length ? r[d] : 0), p = Math.ceil(u.height);
    l = Math.max(l || 0, f), c = Math.max(c || 0, p);
  }
  return o.remove(), { width: l, height: c };
}
function cs(t, e, n, r, s) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const a = t[i][e], l = a.length;
    for (let c = 0; c < l; c++) {
      const { text: d, vertical: u, collapsed: f, rowspan: p, css: m } = a[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let h = 0;
      if (u && !f) {
        let w = `wx-measure-cell-${e}`;
        if (w += m ? ` ${m}` : "", h = Tn(d, w, s).width, (p > 1 || !a[c + 1]) && n > c + 1) {
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
function Ol(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const a = e[i], l = yt(a, t);
    l && (r.push(l), t.treetoggle ? s.push(e[i].$level * yn + (e[i].$count ? yn : 0) + (t.draggable ? yn : 0)) : t.draggable && s.push(yn));
  }
  return Tn(r, o, n, s).width;
}
function Pl(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? zl : 0;
  let s = t.header;
  if (typeof s == "string") return Tn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i], l = typeof a == "string" ? a : a.text, c = n + (typeof a == "string" ? "" : ` ${a.css}`);
    let d = Tn(l, c, e).width;
    i === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const Wl = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Yl(t) {
  return Wl[t];
}
class Vl extends fl {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new hl(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: a } = this.getState(), l = this.copyColumns(o), c = l.reduce((f, p) => Math.max(p.header.length, f), 0), d = l.reduce((f, p) => Math.max(p.footer.length, f), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, i, c, d, a);
      for (let f = 0; f < l.length; f++) this.normalizeColumns(l, f, "header", c, u), this.normalizeColumns(l, f, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: a, _filterIds: l } = this.getState(), c = l && new Set(l), d = i ? this.flattenRows(o, [], l) : c ? o.filter((f) => c.has(f.id)) : o, u = !a && d.some((f) => f.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new pl();
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
        i = { column: l.id, id: s, value: Tt(a, l) ?? "", renderedValue: yt(a, l) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), l.options && !i.options && (i.options = l.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: a, _filterIds: l } = o, { row: c, before: d, after: u, select: f } = s;
      if (s.id = c.id = s.id || c.id || vn(), d || u) {
        const m = d || u, h = i.findIndex((w) => w.id === m);
        i = [...i], i.splice(h + (u ? 1 : 0), 0, s.row);
      } else i = [...i, s.row];
      const p = { data: i };
      l && (p._filterIds = [...l, s.id]), this.setState(p), !(typeof f == "boolean" && !f) && (f || a) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: i, focusCell: a, editor: l } = this.getState(), { id: c } = s, d = { data: o.filter((u) => u.id !== c) };
      this.isSelected(c) && (d.selectedRows = i.filter((u) => u !== c)), l?.id == c && (d.editor = null), this.setState(d), a?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: i } = o;
      i = [...i];
      const { tree: a } = o, { id: l, column: c, value: d } = s, u = this.getColumn(c);
      if (a) {
        const f = { ...this._branches[l] };
        rs(f, u, d);
        const p = this.updateTreeRow(f);
        f.$parent === 0 && (i = p);
      } else {
        const f = i.findIndex((m) => m.id == l), p = { ...i[f] };
        rs(p, u, d), i[f] = p;
      }
      this.setState({ data: i });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: i, row: a } = s, l = o.findIndex((c) => c.id == i);
      o = [...o], o[l] = { ...o[l], ...a }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: i, mode: a, show: l, column: c }) => {
      const d = this.getState(), { focusCell: u } = d;
      let { selectedRows: f } = d;
      if (f.length || (i = o = !1), i) {
        const { data: p } = this.getState();
        let m = p.findIndex((w) => w.id == f[f.length - 1]), h = p.findIndex((w) => w.id == s);
        m > h && ([m, h] = [h, m]), p.slice(m, h + 1).forEach((w) => {
          f.indexOf(w.id) === -1 && f.push(w.id);
        });
      } else if (o && this.isSelected(s)) {
        if (a === !0) return;
        f = f.filter((p) => p !== s);
      } else if (o) {
        if (a === !1) return;
        f.push(s);
      } else f = [s];
      this.setState({ selectedRows: [...f] }), u?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), l && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: i, eventSource: a } = s, { _columns: l, split: c } = this.getState();
      o && i ? (this.setState({ focusCell: { row: o, column: i } }), a !== "click" && ((!c.left || l.findIndex((d) => d.id == s.column) >= c.left) && (!c.right || l.findIndex((d) => d.id == s.column) < l.length - c.right) ? this.in.exec("scroll", { row: o, column: i }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: i, maxRows: a, inProgress: l } = s;
      if (l === !1) return;
      let c = s.width || 0;
      const d = [...this.getState().columns], u = d.find((f) => f.id == o);
      if (i) {
        if (i == "data" || i === !0) {
          const { flatData: f, _skin: p } = this.getState();
          let m = f.length;
          a && (m = Math.min(a, m));
          const h = f.slice(0, m);
          c = Ol(u, h, p);
        }
        if (i == "header" || i === !0) {
          const { _skin: f } = this.getState();
          c = Math.max(Pl(u, f), c);
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
      const { order: f = "asc" } = s;
      let p = l.sortMarks;
      const m = Object.keys(p), h = m.length;
      !i || !h || h === 1 && p[o] ? p = { [o]: { order: f } } : (h === 1 && (p[m[0]] = { ...p[m[0]], index: 0 }), p = { ...p, [o]: { order: f, index: typeof i == "number" ? i : p[o]?.index ?? h } });
      const w = Object.keys(p).sort((y, k) => p[y].index - p[k].index).map((y) => ({ key: y, order: p[y].order }));
      this.setState({ sortMarks: p });
      const x = Ll(w, c);
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
      const f = {};
      i && (u = { ...u, [i]: o }, f.filterValues = u);
      const p = a ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, p, m) : c.forEach((h) => {
        p(h) && m.push(h.id);
      }), f._filterIds = m, this.setState(f);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: i, mode: a } = s, l = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[i] : c;
      typeof d == "object" && (d.collapsed = a ?? !d.collapsed, this.setState({ columns: l }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: i } = s;
      let { target: a, mode: l = "after" } = s;
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
        a = d[p] && d[p].id;
      } else p = d.findIndex((h) => h.id == a);
      if (f === -1 || p === -1 || i === !1) return;
      let m;
      u ? m = this.moveItem(o, a, c, l) : m = this.moveItem(o, a, c, l), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: i, mode: a = "after" } = s, l = this.getState(), { flatData: c, _filterIds: d } = l;
      let { data: u } = l;
      const f = this.getRow(o);
      if (!f) return;
      const p = { ...f, id: vn() };
      s.id = p.id;
      const m = c.findIndex((w) => w.id == i);
      if (m === -1) return;
      u.splice(m + (a === "after" ? 1 : 0), 0, p), u = [...u];
      const h = { data: u };
      d && (h._filterIds = [...d, p.id]), this.setState(h);
    }), r.on("open-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !0, i);
    }), r.on("close-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !1, i);
    }), r.on("export", (s) => new Promise((o, i) => {
      const a = s.options || {}, l = `${a.fileName || "data"}.${a.format}`;
      if (a.format == "csv") {
        const c = wl(this.getState(), a);
        a.download !== !1 ? ss(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (a.format == "xlsx") {
        let c = a.styles;
        !c && c !== !1 && (c = yl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: f, merged: p, rowSizes: m, colSizes: h, styles: w } = xl(this.getState(), a, u), x = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (k) => {
            if (k.data.type == "ready") {
              const v = k.data.blob;
              a.download !== !1 ? ss(v, l) : s.result = v, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: a.sheetName || "data", cells: f, cols: h, rows: m, merged: p }], styles: w } });
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
            let u = a.id, f = this.getNextEditor(this.getRow(u), this.getColumn(d));
            if (!f) {
              const p = this.getNextRow(u);
              p && (u = p.id, f = this.getNextEditor(p));
            }
            f && (this.in.exec("open-editor", { id: u, column: f.id }), this.in.exec("focus-cell", { row: u, column: f.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else l && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: a, focusCell: l, select: c } = this.getState();
          if (a) {
            o.preventDefault();
            const d = a.column;
            let u = a.id, f = this.getPrevEditor(this.getRow(u), this.getColumn(d));
            if (!f) {
              const p = this.getPrevRow(u);
              p && (u = p.id, f = this.getPrevEditor(p));
            }
            f && (this.in.exec("open-editor", { id: u, column: f.id }), this.in.exec("focus-cell", { row: u, column: f.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
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
            const u = c[0]?.id, f = this._getFirstVisibleColumn()?.id;
            u && f && (this.in.exec("focus-cell", { row: u, column: f, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
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
      const { _columns: o, split: i, _sizes: a, flatData: l, dynamic: c, _rowHeightFromData: d } = this.getState();
      let u = -1, f = -1, p = 0, m = 0;
      if (s.column) {
        u = 0;
        const h = o.findIndex((w) => w.id == s.column);
        p = o[h].width;
        for (let w = i.left ?? 0; w < h; w++) {
          const x = o[w];
          x.hidden || (u += x.width);
        }
      }
      if (s.row && !c) {
        const h = l.findIndex((w) => w.id == s.row);
        h >= 0 && (d ? (f = l.slice(0, h).reduce((w, x) => w + (x.rowHeight || a.rowHeight), 0), m = l[h].rowHeight) : f = a.rowHeight * h);
      }
      this.setState({ scroll: { top: f, left: u, width: p, height: m || a.rowHeight } });
    }), r.on("print", (s) => {
      const o = Tl(s);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Fl()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), on(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), bo() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Il(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
        for (let f = 1; f < d.colspan; f++) e[n + f][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? l : l.slice(c, d.rowspan + c)).reduce((f, p) => f + p, 0);
        d.height = u, c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = i.width, f = i.flexgrow || 0;
        const p = d.colspan;
        for (let m = 1; m < p; m++) {
          const h = e[n + m];
          h && (h.hidden ? d.colspan -= 1 : h.flexgrow ? f += h.flexgrow : u += h.width || o.columnWidth), f ? d.flexgrow = f : d.width = u;
        }
      } else d.width = i.width, d.flexgrow = i.flexgrow;
      r === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    a.length > s && (a.length = s), i[r] = a;
  }
  normalizeRows(e) {
    for (let n = 0; n < e.length; n++) e[n].id || (e[n].id = vn());
    return e;
  }
  normalizeTreeRows(e, n, r) {
    return e.forEach((s) => {
      s.id || (s.id = vn()), s.$level = n || 0, s.$parent = r || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
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
      r.push((l) => o?.handler ? o.handler(l[s], a) : Yl(i)(l[s], a));
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
        const d = yt(a, c);
        String(d).toLowerCase().includes(e) && (l[c.id] = !0);
      }), Object.keys(l).length && (r[a.id] = l);
    }), r;
  }
  normalizeSizes(e, n, r, s, o) {
    const i = cs(e, "header", r, n.headerHeight, o), a = cs(e, "footer", s, n.footerHeight, o), l = i.reduce((d, u) => d + u, 0), c = a.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: a, headerHeight: l, footerHeight: c };
  }
}
let Gl = (/* @__PURE__ */ new Date()).valueOf();
function vn() {
  return "temp://" + Gl++;
}
function Kl(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var jl = class {
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
}, Ft = [], Bl = { subscribe: (t) => {
  Ul();
  const e = new jl();
  return Ft.push(e), t(e), () => {
    const n = Ft.findIndex((r) => r === e);
    n >= 0 && Ft.splice(n, 1);
  };
} }, ds = !1;
function Ul() {
  ds || (ds = !0, document.addEventListener("keydown", (t) => {
    if (Ft.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Ft.length - 1; s >= 0; s--) {
        const o = Ft[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
const ql = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Cr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return a.tagName === "INPUT" || a.tagName === "TEXTAREA" || Kl(a, "data-header-id")?.classList.contains("wx-filter") || !!a.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < "u" && (typeof a == "function" ? s[i] = a : a && (s[i] = (l) => {
      const c = r(l);
      n({ key: i, event: l, isInput: c });
    }));
  }
  const o = Bl.subscribe((i) => {
    i.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function Xl(t, e) {
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
function $t(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function Ql(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function us(t) {
  return t && t.getAttribute("data-context-id");
}
const fs = 5;
function Zl(t, e) {
  let n, r, s, o, i, a, l, c, d;
  function u($) {
    o = $.clientX, i = $.clientY, a = {
      ...Ql(n, t, $),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function f($) {
    n = Be($), us(n) && (s = $t(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u($.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", p), window.addEventListener("touchend", k));
  }
  function p($) {
    if (c || d)
      return $.preventDefault(), !1;
  }
  function m($) {
    $.which === 1 && (n = Be($), us(n) && (s = $t(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", v), u($)));
  }
  function h($) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", k), document.body.style.userSelect = "", $ && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", f));
  }
  function w($) {
    const _ = $.clientX - o, E = $.clientY - i;
    if (!r) {
      if (Math.abs(_) < fs && Math.abs(E) < fs || e && e.start && e.start({ id: s, e: $ }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const O = Math.round(Math.max(0, a.top + E));
      if (e && e.move && e.move({ id: s, top: O, detail: l }) === !1)
        return;
      const N = e.getTask(s), A = N.$y;
      if (!a.start && a.y == A) return T();
      a.start = !0, a.y = N.$y - 4, r.style.top = O + "px";
      const I = document.elementFromPoint(
        $.clientX,
        $.clientY
      ), H = Be(I);
      if (H && H !== n) {
        const M = $t(H), V = H.getBoundingClientRect(), J = V.top + V.height / 2, le = $.clientY + a.db > J && H.nextElementSibling !== n, X = $.clientY - a.dt < J && H.previousElementSibling !== n;
        l?.after == M || l?.before == M ? l = null : le ? l = { id: s, after: M } : X && (l = { id: s, before: M });
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
    c = null, d && (clearTimeout(d), d = null), T();
  }
  function v() {
    T();
  }
  function T() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: a.top })), s = n = r = a = l = null, h();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", f), {
    destroy() {
      h(!0);
    }
  };
}
const Jl = {
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
function $o(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = $o(n.data, e)), r;
  });
}
function _o(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = _o(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let ec = 1;
function tc(t) {
  return $o(t, (e) => {
    const n = { ...e, id: e.id || ec++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Co = {};
function nc(t) {
  return Co[t] || t;
}
function rc(t, e) {
  Co[t] = e;
}
function sc({ onClick: t, onShow: e, option: n }) {
  const r = F(null), s = R(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = C(() => n && n.comp ? nc(n.comp) : null, [n]);
  return /* @__PURE__ */ B(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ g("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ g(o, { item: n, option: n }) : null : /* @__PURE__ */ B("span", { className: "wx-cDCz9rZQ wx-value", children: [
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
function Nr({
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
  const [c, d] = K(-1e4), [u, f] = K(-1e4), [p, m] = K(20), [h, w] = K(), x = F(null), [y, k] = K(!1), [v, T] = K(null), $ = R(() => {
    const A = Bo(x.current, s, r, e, n);
    A && (d(A.x), f(A.y), m(A.z), w(A.width));
  }, [s, r, e, n]);
  Y(() => {
    o && o($);
  }, []);
  const _ = R(() => {
    k(!1);
  }, []), E = R(() => {
    l && l({ action: null, option: null });
  }, [l]), O = R((A, I) => {
    k(A), T(I);
  }, []), N = C(() => tc(t), [t]);
  return Y(() => {
    $();
  }, [s, $]), Y(() => {
    if (x.current)
      return en(x.current, { callback: E, modal: !0 }).destroy;
  }, [E]), /* @__PURE__ */ g(
    "div",
    {
      ref: x,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${a}`,
      style: {
        position: "absolute",
        top: u + "px",
        left: c + "px",
        width: h,
        zIndex: p
      },
      onMouseLeave: _,
      children: N.map((A) => /* @__PURE__ */ B(ks, { children: [
        A.comp === "separator" ? /* @__PURE__ */ g("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ g(
          sc,
          {
            option: A,
            onShow: O,
            onClick: (I) => {
              if (!A.data && !I.defaultPrevented) {
                const H = { context: i, action: A, option: A, event: I };
                A.handler && A.handler(H), l && l(H), I.stopPropagation();
              }
            }
          }
        ),
        A.data && y === A.id ? /* @__PURE__ */ g(
          Nr,
          {
            css: a,
            options: A.data,
            at: "right-overlap",
            parent: v,
            context: i,
            onClick: l
          }
        ) : null
      ] }, A.id))
    }
  );
}
const oc = Mt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, [d, u] = K(null), [f, p] = K(null), [m, h] = K(0), [w, x] = K(0), y = C(() => d !== null && i ? _o(n, ($) => i($, d)) : n, [d, i, n]), k = R(
    ($) => {
      p(null), c && c($);
    },
    [c]
  ), v = R(($, _) => {
    let E = null;
    for (; $ && $.dataset && !E; )
      E = $.dataset[_], $ = $.parentNode;
    return E ? Wt(E) : null;
  }, []), T = R(
    ($, _) => {
      if (!$) {
        p(null);
        return;
      }
      if ($.defaultPrevented) return;
      const E = $.target;
      if (E && E.dataset && E.dataset.menuIgnore) return;
      h($.clientX + 1), x($.clientY + 1);
      let O = typeof _ < "u" ? _ : v(E, o);
      s && (O = s(O, $), !O) || (u(O), p(E), $.preventDefault());
    },
    [o, v, s]
  );
  return Dt(e, () => ({ show: T }), [T]), /* @__PURE__ */ B(Ce, { children: [
    l ? /* @__PURE__ */ g("span", { onClick: T, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    f ? /* @__PURE__ */ g(Es, { children: /* @__PURE__ */ g(
      Nr,
      {
        css: a,
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
Mt(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = K(null);
  function c(m) {
    l(null), i && i(m);
  }
  const d = R((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Dt(e, () => ({ show: d }), [d]);
  function u(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; )
      l(h), h = h.parentNode;
  }
  const f = F(0), p = F(a);
  return Y(() => {
    p.current !== a && (f.current += 1, p.current = a);
  }, [a]), /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    a ? /* @__PURE__ */ g(Es, { children: /* @__PURE__ */ g(
      Nr,
      {
        css: s,
        at: r,
        parent: a,
        options: n,
        onClick: c
      },
      f.current
    ) }) : null
  ] });
});
const No = Mt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, d = F(null), u = R((f, p) => {
    d.current.show(f, p);
  }, []);
  return Dt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ B(Ce, { children: [
    l ? /* @__PURE__ */ g("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ g(
      oc,
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
}), To = {};
function ic(t) {
  return To[t] || t;
}
function Gt(t, e) {
  To[t] = e;
}
function Mo({ menu: t = !1 }) {
  return /* @__PURE__ */ g("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Do() {
  return /* @__PURE__ */ g("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const ac = ({ key: t, text: e, ...n }) => n;
function Tr(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = C(
    () => ic(e.comp || "label"),
    [e]
  ), a = R(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = C(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = R(
    ({ value: u }) => {
      e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
    },
    [e, o]
  ), d = C(() => n ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [n, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ g(Do, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ g(Mo, { menu: n });
  {
    const u = i, f = [
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
            onClick: a,
            text: d,
            menu: n,
            ...ac(e)
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
  const [o, i] = K(!0), a = () => i(!0), l = () => i(!1), c = (u) => {
    a(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ B("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ g("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ g("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ g(Vt, { width: "", oncancel: a, children: /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ g(
      Mn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, f) => u.items ? /* @__PURE__ */ g(
        Mn,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || f
      ) : /* @__PURE__ */ g(
        Tr,
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
function lc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = K(void 0), l = F(null);
  function c() {
    a(null);
  }
  function d() {
    a(!0);
  }
  function u(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ B(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ g(pt, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ g(Vt, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ g("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (f, p) => f.items ? /* @__PURE__ */ g(
            Mn,
            {
              item: f,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            f.id || p
          ) : /* @__PURE__ */ g(
            Tr,
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
function cc(t) {
  return t.forEach((e) => {
    e.id || (e.id = fr());
  }), t;
}
function lr(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: i,
    onChange: a
  } = t, [l, c] = Ae(e || []), [d, u] = Ae(s || null), f = C(() => cc(l), [l]), p = F(null), m = F(-1), [h, w] = K([]), x = F(f);
  Y(() => {
    x.current = f;
  }, [l]);
  const y = F(o);
  Y(() => {
    y.current = o;
  }, [o]);
  const k = F(h);
  Y(() => {
    k.current = h;
  }, [h]);
  const v = F(!1);
  function T(N) {
    d && (d[N.item.key] = N.value, u({ ...d })), a && a(N);
  }
  function $() {
    const N = p.current;
    if (!N) return 0;
    const A = N.children, I = x.current || [];
    let H = 0;
    for (let M = 0; M < I.length; M++)
      I[M].comp !== "spacer" && (H += A[M].clientWidth, I[M].comp === "separator" && (H += 8));
    return H;
  }
  function _() {
    const N = p.current, A = x.current || [];
    if (N) {
      for (let I = A.length - 1; I >= 0; I--)
        if (A[I].items && !A[I].collapsed) {
          A[I].collapsed = !0, A[I].$width = N.children[I].offsetWidth, v.current = !0, c([...A]);
          return;
        }
    }
  }
  function E(N) {
    const A = p.current, I = x.current || [];
    if (A) {
      for (let H = 0; H < I.length; H++)
        if (I[H].collapsed && I[H].$width) {
          I[H].$width - A.children[H].offsetWidth < N + 10 && (I[H].collapsed = !1, v.current = !0), c([...I]);
          return;
        }
    }
  }
  function O() {
    const N = p.current;
    if (!N) return;
    const A = x.current || [], I = y.current;
    if (I === "wrap") return;
    const H = N.clientWidth;
    if (N.scrollWidth > H) {
      if (I === "collapse") return _();
      const M = N.children;
      let V = 0;
      for (let J = 0; J < A.length; J++) {
        if (V += M[J].clientWidth, A[J].comp === "separator" && (V += 8), V > H - 40) {
          if (m.current === J) return;
          m.current = J;
          const le = [];
          for (let X = J; X < A.length; X++)
            le.push(A[X]), M[X].style.visibility = "hidden";
          J > 0 && A[J - 1].comp === "separator" && (M[J - 1].style.visibility = "hidden"), w(le);
          break;
        }
        M[J].style.visibility = "";
      }
    } else {
      const M = H - $();
      if (M <= 0) return;
      if (I === "collapse") return E(M);
      if ((k.current || []).length) {
        m.current = null;
        const V = N.children;
        for (let J = 0; J < A.length; J++)
          V[J].style.visibility = "";
        w([]);
      }
    }
  }
  return Y(() => {
    v.current && (v.current = !1, O());
  }, [l]), Y(() => {
    const N = new ResizeObserver(() => O());
    return p.current && N.observe(p.current), () => {
      N.disconnect();
    };
  }, []), /* @__PURE__ */ B(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: p,
      children: [
        f.map(
          (N) => N.items ? /* @__PURE__ */ g(
            Mn,
            {
              item: N,
              values: d,
              onClick: i,
              onChange: T
            },
            N.id
          ) : /* @__PURE__ */ g(
            Tr,
            {
              item: N,
              values: d,
              onClick: i,
              onChange: T
            },
            N.id
          )
        ),
        !!h.length && /* @__PURE__ */ g(
          lc,
          {
            items: h,
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
function dc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ B("div", { className: "wx-HXpG4gnx wx-item", onClick: a, children: [
    /* @__PURE__ */ g("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ g(
    pt,
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
function uc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function fc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ B("div", { className: "wx-3cuSqONJ wx-item", onClick: a, children: [
    e ? /* @__PURE__ */ g("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ g(
    pt,
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
function hc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ B("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ g("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Gt("button", dc);
Gt("separator", Mo);
Gt("spacer", Do);
Gt("label", uc);
Gt("item", hc);
Gt("icon", fc);
const nt = Pt(null);
function pc(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const hs = 5, gc = 700;
function mc(t) {
  return Wt(t.getAttribute("data-id"));
}
function kn(t) {
  const e = t.getBoundingClientRect(), n = document.body, r = e.top + n.scrollTop - n.clientTop || 0, s = e.left + n.scrollLeft - n.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: t.offsetWidth,
    height: t.offsetHeight
  };
}
function cr(t, e) {
  const n = kn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function wc(t, e) {
  const n = e.current;
  let r = null, s, o, i = !1, a = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(_) {
    const E = Be(_);
    E && (r = {
      container: l,
      sourceNode: _.target,
      from: mc(E),
      pos: cr(_, t)
    }, o = r.pos, u(_));
  }
  function u(_) {
    if (!r) return;
    const E = r.pos = cr(_, t);
    if (!i) {
      if (!a && !_?.target?.getAttribute("draggable-data") && Math.abs(o.x - E.x) < hs && Math.abs(o.y - E.y) < hs)
        return;
      if (T(_) === !1) return $();
    }
    if (a) {
      const O = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, N = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        _.pageX - O,
        _.pageY - N
      );
    } else r.targetNode = _.target;
    n.move && n.move(_, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function f(_) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", i && n.end && n.end(_, r), r = o = null, $();
  }
  function p(_) {
    n.getReorder && !n.getReorder() || _.button === 0 && (v(_), window.addEventListener("mousemove", m), window.addEventListener("mouseup", h), d(_));
  }
  function m(_) {
    u(_);
  }
  function h(_) {
    f(_);
  }
  function w(_) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      a = !0, d(_.touches[0]);
    }, gc), v(_);
    function E() {
      s && c(), _.target.removeEventListener("touchmove", x), _.target.removeEventListener("touchend", E), f(_);
    }
    _.target.addEventListener("touchmove", x), _.target.addEventListener("touchend", E), t.addEventListener("contextmenu", y);
  }
  function x(_) {
    i ? (_.preventDefault(), u(_.touches[0])) : s && c();
  }
  function y(_) {
    if (i || s)
      return _.preventDefault(), !1;
  }
  function k(_) {
    _.preventDefault();
  }
  function v(_) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: E } = n.getDraggableInfo();
    (!E || _.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function T(_) {
    if (i = !0, n.start) {
      if (n.start(_, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function $(_) {
    i = a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", h), _ && (t.removeEventListener("mousedown", p), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", k));
  }
  return t.addEventListener("mousedown", p), t.addEventListener("touchstart", w), t.addEventListener("dragstart", k), {
    destroy() {
      $(!0);
    }
  };
}
const xc = 4e-3;
function yc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function vc(t, e, n, r) {
  const { node: s, left: o, top: i, bottom: a, sense: l, xScroll: c, yScroll: d } = r, u = cr(t, s);
  n.scrollState || (n.scrollState = yc());
  let f = 0, p = 0;
  u.x < o + l ? f = -1 : u.x > e.width - l && (f = 1), u.y < i + Math.round(l / 2) ? p = -1 : u.y > e.height - a - Math.round(l / 2) && (p = 1), (n.scrollState.dirX !== f || n.scrollState.dirY !== p) && (Eo(n), n.scrollState.dirX = f, n.scrollState.dirY = p), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && kc(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function kc(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      bc,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Eo(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function bc(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += xc, r !== 0 && $c(t, e, r), s !== 0 && Sc(t, e, s);
}
function Sc(t, e, n) {
  const r = e.node.scrollTop;
  Ro(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function $c(t, e, n) {
  const r = e.node.scrollLeft;
  Ro(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Ro(t, e, n) {
  n.node[e] = t;
}
function Hn(t, e, n, r, s, o) {
  const i = {};
  return t && (i.width = `${t}px`, i.minWidth = `${t}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), n && (i.position = "sticky", n.left && (i.left = `${r}px`), n.right && (i.right = `${s}px`)), i;
}
function Io(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function _c(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [i, a] = Ae(t.focusable), l = xe(nt), c = Z(l, "focusCell"), d = Z(l, "search"), u = Z(l, "reorder"), f = C(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), p = C(
    () => Hn(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m($, _) {
    let E = "wx-cell";
    return E += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", E += $ ? " " + $(n) : "", E += _ ? " " + _(e, n) : "", E += n.treetoggle ? " wx-tree-cell" : "", E;
  }
  const h = C(
    () => m(s, r),
    [s, r, n, e]
  ), w = C(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = F(null);
  Y(() => {
    x.current && i && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, i, e.id, n.id]);
  const y = R(() => {
    i && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, i, c, e.id, n.id]);
  Y(() => () => {
    i && c && (l.exec("focus-cell", { eventSource: "destroy" }), a(!1));
  }, [l, a]);
  function k($) {
    const _ = new RegExp(`(${d.value.trim()})`, "gi");
    return String($).split(_).map((E) => ({ text: E, highlight: _.test(E) }));
  }
  const v = C(() => {
    const $ = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, _ = n.fixed && n.fixed.right;
    return [
      h,
      $ ? "wx-shadow" : "",
      _ ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [h, n]), T = n.cell;
  return /* @__PURE__ */ B(
    "div",
    {
      className: "wx-TSCaXsGV " + v,
      ref: x,
      onFocus: y,
      style: p,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: i ? "0" : "-1",
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
        n.treetoggle ? /* @__PURE__ */ B(Ce, { children: [
          /* @__PURE__ */ g("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ g(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        T ? /* @__PURE__ */ g(
          T,
          {
            api: l,
            row: e,
            column: n,
            onAction: ({ action: $, data: _ }) => l.exec($, _)
          }
        ) : o ? o() : f ? /* @__PURE__ */ g("span", { children: k(yt(e, n)).map(
          ({ highlight: $, text: _ }, E) => $ ? /* @__PURE__ */ g("mark", { className: "wx-TSCaXsGV wx-search", children: _ }, E) : /* @__PURE__ */ g("span", { children: _ }, E)
        ) }) : yt(e, n)
      ]
    }
  );
}
function ps(t, e) {
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
function Cc({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ g(
    sn,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Nc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = xe(nt), o = Z(s, "flatData"), i = C(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), a = C(() => t?.config?.template, [t]);
  function l() {
    const u = [];
    return o.forEach((f) => {
      const p = Tt(f, e);
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
    Ms,
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
const Tc = {
  text: Cc,
  richselect: Nc
};
function Mc({ filter: t, column: e }) {
  const n = xe(nt), r = Z(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = C(() => Tc[t.type], [t.type]);
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
function Dc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: a,
    hasSplit: l
  } = t, c = xe(nt), d = Z(c, "sortMarks"), u = C(() => d ? d[n.id] : void 0, [d, n.id]), f = F(), p = R(
    (M) => {
      f.current = e.flexgrow ? M.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = R(
    (M, V) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (f.current || 0) + M),
        inProgress: V
      });
    },
    [c, e.id]
  ), h = R((M) => m(M, !0), [m]), w = R((M) => m(M, !1), [m]), x = R(
    (M) => {
      if (!n.sort || e.filter) return;
      let V = u?.order;
      V && (V = V === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: M.ctrlKey, order: V });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = R(
    (M) => {
      M && M.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), k = R(
    (M) => {
      M.key === "Enter" && y();
    },
    [y]
  ), v = R(
    (M) => {
      M.key === "Enter" && !e.filter && x(M);
    },
    [x, e.filter]
  ), T = C(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), $ = C(
    () => T && !l && e.collapsible !== "header",
    [T, l, e.collapsible]
  ), _ = C(
    () => $ ? { top: -a / 2, position: "absolute" } : {},
    [$, a]
  ), E = C(
    () => Hn(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (T && $ ? a : 0)
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
      $,
      a
    ]
  ), O = C(
    () => Io(n, e, i),
    [n, e, i]
  ), N = R(() => Object.fromEntries(
    Object.entries(e).filter(([M]) => M !== "cell")
  ), [e]), A = `wx-cell ${O} ${e.css || ""} wx-collapsed`, I = [
    "wx-cell",
    O,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = F(null);
  return Y(() => {
    const M = H.current;
    if (!M) return;
    const V = ps(M, { down: p, move: h, up: w });
    return () => {
      typeof V == "function" && V();
    };
  }, [p, h, w, ps]), T ? /* @__PURE__ */ g(
    "div",
    {
      className: "wx-RsQD74qC " + A,
      style: E,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: k,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", style: _, children: e.text || "" })
    }
  ) : /* @__PURE__ */ B(
    "div",
    {
      className: "wx-RsQD74qC " + I,
      style: E,
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
          const M = e.cell;
          return /* @__PURE__ */ g(
            M,
            {
              api: c,
              cell: N(),
              column: n,
              row: r,
              onAction: ({ action: V, data: J }) => c.exec(V, J)
            }
          );
        })() : e.filter ? /* @__PURE__ */ g(Mc, { filter: e.filter, column: n }) : /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: H,
            onClick: (M) => M.stopPropagation(),
            children: /* @__PURE__ */ g("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ B(Ce, { children: [
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
function Ec({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = xe(nt), o = C(
    () => Hn(
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
  ), i = C(
    () => Io(e, t, r),
    [e, t, r]
  ), a = R(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ g("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? zo.createElement(t.cell, {
    api: s,
    cell: a(),
    column: e,
    row: n,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ g("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function gs({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const i = xe(nt), a = Z(i, "_sizes"), l = Z(i, "split"), c = C(() => a?.[`${r}RowHeights`], [a, r]), d = C(() => {
    let h = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        h.push([]), n.forEach((k, v) => {
          const T = { ...k[r][x] };
          if (y || h[x].push(T), T.colspan > 1) {
            if (y = T.colspan - 1, !bo() && k.right) {
              let $ = k.right;
              for (let _ = 1; _ < T.colspan; _++)
                $ -= n[v + _].width;
              T.right = $;
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
              Dc,
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
              Ec,
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
function Rc({ overlay: t }) {
  const e = xe(nt);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ g("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ g(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Ic(t) {
  const { actions: e, editor: n } = t, [r, s] = K(n?.value || ""), o = F(null);
  Y(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function a({ key: l }) {
    l === "Enter" && e.save();
  }
  return /* @__PURE__ */ g(
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
function Ac({ actions: t, editor: e, onAction: n }) {
  const [r, s] = K(e?.value), [o, i] = K(e?.renderedValue), [a, l] = K(e?.options || []), c = C(() => e?.config?.template, [e]), d = C(() => e?.config?.cell, [e]), u = C(() => (a || []).findIndex((y) => y.id === r), [a, r]), f = F(null), p = F(null), m = R(
    (y) => {
      f.current = y.navigate, p.current = y.keydown, f.current(u);
    },
    [u, f]
  ), h = R(
    (y) => {
      const k = y?.target?.value ?? "";
      i(k);
      const v = k ? (e?.options || []).filter(
        (T) => (T.label || "").toLowerCase().includes(k.toLowerCase())
      ) : e?.options || [];
      l(v), v.length ? f.current(-1 / 0) : f.current(null);
    },
    [e]
  ), w = F(null);
  Y(() => {
    w.current && w.current.focus();
  }, []), Y(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = R(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ B(Ce, { children: [
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
      Dn,
      {
        items: a,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ g(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Hc({ actions: t, editor: e, onAction: n }) {
  const [r] = K(() => e.value || /* @__PURE__ */ new Date()), [s] = K(() => e.config?.template), [o] = K(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = F(null);
  return Y(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: a,
        tabIndex: 0,
        onClick: () => t.cancel(),
        onKeyDown: (l) => l.preventDefault(),
        children: s ? s(r) : o ? /* @__PURE__ */ g(o, { data: e.value, onAction: n }) : /* @__PURE__ */ g("span", { className: "wx-lNWNYUb6 wx-text", children: e.renderedValue })
      }
    ),
    /* @__PURE__ */ g(Vt, { width: "auto", children: /* @__PURE__ */ g(
      Ts,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Lc(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = K(
    n.options.find((h) => h.id === n.value)
  ), [i] = K(n.value), [a] = K(n.options), l = C(
    () => a.findIndex((h) => h.id === i),
    [a, i]
  );
  function c({ id: h }) {
    e.updateValue(h), e.save();
  }
  let d;
  const [u, f] = K();
  function p(h) {
    d = h.navigate, f(() => h.keydown), d(l);
  }
  const m = F(null);
  return Y(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ B(Ce, { children: [
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
    /* @__PURE__ */ g(Dn, { items: a, onReady: p, onSelect: c, children: ({ option: h }) => s.template ? s.template(h) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ g(w, { data: h, onAction: r });
    })() : h.label })
  ] });
}
const zc = {
  text: Ic,
  combo: Ac,
  datepicker: Hc,
  richselect: Lc
};
function Fc({ column: t, row: e }) {
  const n = xe(nt), r = Z(n, "editor"), s = R(
    (m, h) => {
      n.exec("close-editor", { ignore: m }), h && n.exec("focus-cell", {
        ...h,
        eventSource: "click"
      });
    },
    [n]
  ), o = R(
    (m) => {
      const h = m ? null : { row: r?.id, column: r?.column };
      s(!1, h);
    },
    [r, s]
  ), i = R(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), a = R(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), l = R(
    (m) => {
      m.key === "Enter" && r && i();
    },
    [r, i]
  ), c = C(
    () => Hn(
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
    return zc[h];
  }, [t, e]), u = F(null);
  Y(() => {
    if (!u.current) return;
    const m = en(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), Y(() => {
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
          actions: { save: o, cancel: i, updateValue: a },
          onAction: ({ action: m, data: h }) => n.exec(m, h)
        }
      ) : null
    }
  );
}
function ms(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = xe(nt), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ g(Ce, { children: e.map((c, d) => /* @__PURE__ */ g("tr", { children: c.map((u) => {
    const f = i.find((h) => h.id == u.id), p = `wx-print-cell-${n}${l(f)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ g(
      "th",
      {
        style: _s(ko(u, a.columnWidth)),
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
        ) : u.filter ? /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-print-filter", children: Ml(o, i, u) }) : /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Oc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = xe(nt), { flatData: c, _sizes: d } = l.getState(), u = o && as(e, "header", d.headerRowHeights), f = i && as(e, "footer", d.footerRowHeights);
  function p(h, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(h, w) : "", x;
  }
  function m(h, w) {
    return typeof w.draggable == "function" ? w.draggable(h, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ B(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ g("thead", { children: /* @__PURE__ */ g(
          ms,
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
              (x) => x.collapsed ? null : /* @__PURE__ */ B(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${p(h, x)}`,
                  style: _s(
                    ko(x, d.columnWidth)
                  ),
                  children: [
                    a && x.draggable ? /* @__PURE__ */ g("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(h, x) ? /* @__PURE__ */ g("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ B(Ce, { children: [
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
                    })() : /* @__PURE__ */ g("span", { children: yt(h, x) })
                  ]
                },
                x.id
              )
            )
          },
          w
        )) }),
        i ? /* @__PURE__ */ g("tfoot", { children: /* @__PURE__ */ g(
          ms,
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
function Pc(t) {
  const { config: e, ...n } = t, r = xe(nt), { _skin: s, _columns: o } = r.getState(), i = C(() => _l(o, e), []), a = F(null);
  return Y(() => {
    const l = document.body;
    l.classList.add("wx-print");
    const c = a.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    l.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, f = document.createElement("style");
    f.setAttribute("type", "text/css"), f.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(f), f.appendChild(document.createTextNode(u)), window.print(), f.remove(), l.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ g(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: a,
      children: i.map((l, c) => /* @__PURE__ */ g("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ g(Oc, { columns: l, ...n }) }, c))
    }
  );
}
function Wc(t) {
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
    clientHeight: f,
    responsiveLevel: p,
    hotkeys: m
  } = t, h = xe(nt), w = Z(h, "dynamic"), x = Z(h, "_columns"), y = Z(h, "flatData"), k = Z(h, "split"), v = Z(h, "_sizes"), [T, $] = qt(h, "selectedRows"), _ = Z(h, "select"), E = Z(h, "editor"), O = Z(h, "tree"), N = Z(h, "focusCell"), A = Z(h, "_print"), I = Z(h, "undo"), H = Z(h, "reorder"), M = Z(h, "_rowHeightFromData"), [V, J] = K(0);
  Y(() => {
    J(j());
  }, []);
  const [le, X] = K(0), [se, he] = K(0), b = C(() => (x || []).some((D) => !D.hidden && D.flexgrow), [x]), z = C(() => v?.rowHeight || 0, [v]), ne = F(null), [G, ce] = K(null), [de, De] = K(null), ue = C(() => {
    let D = [], P = 0;
    return k && k.left && (D = (x || []).slice(0, k.left).filter((ie) => !ie.hidden).map((ie) => ({ ...ie })), D.forEach((ie) => {
      ie.fixed = { left: 1 }, ie.left = P, P += ie.width;
    }), D.length && (D[D.length - 1].fixed = { left: -1 })), { columns: D, width: P };
  }, [k, x]), q = C(() => {
    let D = [], P = 0;
    if (k && k.right) {
      D = (x || []).slice(k.right * -1).filter((ie) => !ie.hidden).map((ie) => ({ ...ie }));
      for (let ie = D.length - 1; ie >= 0; ie--) {
        const be = D[ie];
        be.fixed = { right: 1 }, be.right = P, P += be.width;
      }
      D.length && (D[0].fixed = { right: -1 });
    }
    return { columns: D, width: P };
  }, [k, x]), te = C(() => {
    const D = (x || []).slice(k?.left || 0, (x || []).length - (k?.right ?? 0)).filter((P) => !P.hidden);
    return D.forEach((P) => {
      P.fixed = 0;
    }), D;
  }, [x, k]), pe = C(() => (x || []).reduce((D, P) => (P.hidden || (D += P.width), D), 0), [x]), He = 1;
  function Le(D, P, ie) {
    let be = P, Ie = D;
    if (te.length) {
      let Me = te.length;
      for (let we = D; we >= 0; we--)
        te[we][ie].forEach((We) => {
          We.colspan > 1 && we > D - We.colspan && we < Me && (Me = we);
        });
      if (Me !== te.length && Me < D) {
        for (let we = Me; we < D; we++)
          be -= te[we].width;
        Ie = Me;
      }
    }
    return { index: Ie, delta: be };
  }
  const Ne = C(() => {
    let D, P, ie;
    const be = le, Ie = le + (u || 0);
    let Me = 0, we = 0, We = 0, rt = 0;
    te.forEach((bt, At) => {
      be > We && (Me = At, rt = We), We = We + bt.width, Ie > We && (we = At + He);
    });
    const lt = { header: 0, footer: 0 };
    for (let bt = we; bt >= Me; bt--)
      ["header", "footer"].forEach((At) => {
        te[bt] && te[bt][At].forEach((Lo) => {
          const zn = Lo.colspan;
          if (zn && zn > 1) {
            const Mr = zn - (we - bt + 1);
            Mr > 0 && (lt[At] = Math.max(lt[At], Mr));
          }
        });
      });
    const Ve = Le(Me, rt, "header"), ct = Le(Me, rt, "footer"), Kt = Ve.delta, dn = Ve.index, un = ct.delta, Ln = ct.index;
    return b && pe > (u || 0) ? D = P = ie = [...ue.columns, ...te, ...q.columns] : (D = [
      ...ue.columns,
      ...te.slice(Me, we + 1),
      ...q.columns
    ], P = [
      ...ue.columns,
      ...te.slice(dn, we + lt.header + 1),
      ...q.columns
    ], ie = [
      ...ue.columns,
      ...te.slice(Ln, we + lt.footer + 1),
      ...q.columns
    ]), {
      data: D || [],
      header: P || [],
      footer: ie || [],
      d: rt,
      df: un,
      dh: Kt
    };
  }, [
    te,
    ue,
    q,
    le,
    u,
    b,
    pe
  ]), Oe = C(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), ze = C(
    () => n && v?.footerHeight || 0,
    [n, v]
  ), ve = C(() => u && f ? pe >= u : !1, [u, f, pe]), W = C(() => (f || 0) - Oe - ze - (ve ? V : 0), [f, Oe, ze, ve, V]), ge = C(() => Math.ceil((W || 0) / (z || 1)) + 1, [W, z]), Se = F([]), [re, Ee] = K(0), [Ue, kt] = K(void 0), Ye = C(() => {
    let D = 0, P = 0;
    const ie = 2;
    if (c) {
      let Me = se;
      for (; Me > 0; )
        Me -= Se.current[D] || z, D++;
      P = se - Me;
      for (let we = Math.max(0, D - ie - 1); we < D; we++)
        P -= Se.current[D - we] || z;
      D = Math.max(0, D - ie);
    } else {
      if (M) {
        let Me = 0, we = 0;
        for (let Ve = 0; Ve < (y || []).length; Ve++) {
          const ct = y[Ve].rowHeight || z;
          if (we + ct > se) {
            Me = Ve;
            break;
          }
          we += ct;
        }
        D = Math.max(0, Me - ie);
        for (let Ve = 0; Ve < D; Ve++)
          P += y[Ve].rowHeight || z;
        let We = 0, rt = 0;
        for (let Ve = Me + 1; Ve < (y || []).length; Ve++) {
          const ct = y[Ve].rowHeight || z;
          if (We++, rt + ct > W)
            break;
          rt += ct;
        }
        const lt = Math.min(
          w ? w.rowCount : (y || []).length,
          Me + We + ie
        );
        return { d: P, start: D, end: lt };
      }
      D = Math.floor(se / (z || 1)), D = Math.max(0, D - ie), P = D * (z || 0);
    }
    const be = w ? w.rowCount : (y || []).length, Ie = Math.min(be, D + (ge || 0) + ie);
    return { d: P, start: D, end: Ie };
  }, [c, M, se, z, w, y, ge, W]), Ke = C(() => {
    const D = w ? w.rowCount : (y || []).length;
    if (c)
      return re + Ye.d + (D - (Ue || 0)) * (z || 0);
    if (!M)
      return D * (z || 0);
    let P = 0;
    for (let ie = 0; ie < D; ie++)
      P += y[ie]?.rowHeight || z;
    return P;
  }, [
    w,
    y,
    z,
    c,
    M,
    re,
    Ye.d,
    Ue
  ]), tt = C(() => u && f ? Ke + Oe + ze >= f - (pe >= (u || 0) ? V : 0) : !1, [
    u,
    f,
    Ke,
    Oe,
    ze,
    pe,
    V
  ]), it = C(() => b && pe <= (u || 0) ? (u || 0) - 0 - (tt ? V : 0) : pe, [b, pe, u, tt, V, ve]), L = C(() => b && pe <= (u || 0) ? u || 0 : it < (u || 0) ? pe + (tt ? V : 0) : -1, [b, pe, u, it, tt, V]), U = F({});
  Y(() => {
    if (w && (U.current.start !== Ye.start || U.current.end !== Ye.end)) {
      const { start: D, end: P } = Ye;
      U.current = { start: D, end: P }, h && h.exec && h.exec("request-data", { row: { start: D, end: P } });
    }
  }, [w, Ye, h]);
  const Q = C(() => w ? y || [] : (y || []).slice(Ye.start, Ye.end), [w, y, Ye]), fe = C(() => (T || []).filter(
    (D) => (Q || []).some((P) => P.id === D)
  ), [$, Q]), $e = C(() => Ye.start, [Ye.start]), _e = R((D) => {
    he(D.target.scrollTop), X(D.target.scrollLeft);
  }, []), Fe = R((D) => {
    D.shiftKey && D.preventDefault(), ne.current && ne.current.focus && ne.current.focus();
  }, []), qe = R(() => !!(x || []).find((D) => !!D.draggable), [x]), Rt = F(null), ut = F(null), an = F({
    dblclick: (D, P) => {
      const ie = { id: D, column: Xn(P, "data-col-id") };
      h.exec("open-editor", ie);
    },
    click: (D, P) => {
      if (Rt.current) return;
      const ie = Xn(P, "data-col-id");
      if (N?.id !== D && h.exec("focus-cell", {
        row: D,
        column: ie,
        eventSource: "click"
      }), _ === !1) return;
      const be = s && P.ctrlKey, Ie = s && P.shiftKey;
      (be || T.length > 1 || !T.includes(D)) && h.exec("select-row", { id: D, toggle: be, range: Ie });
    },
    "toggle-row": (D) => {
      const P = h.getRow(D);
      h.exec(P.open !== !1 ? "close-row" : "open-row", { id: D });
    },
    "ignore-click": () => !1
  }), wt = C(() => ({
    top: Oe,
    bottom: ze,
    left: ue.width,
    xScroll: ve,
    yScroll: tt,
    sense: c && de ? de.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: ne.current && ne.current.firstElementChild
  }), [
    Oe,
    ze,
    ue.width,
    ve,
    tt,
    c,
    de,
    v
  ]);
  function ln(D, P) {
    const { container: ie, sourceNode: be, from: Ie } = P;
    if (qe() && !be.getAttribute("draggable-data"))
      return !1;
    ce(Ie), h.getRow(Ie).open && h.exec("close-row", { id: Ie, nested: !0 });
    const Me = Be(be, "data-id"), we = Me.cloneNode(!0);
    we.classList.remove("wx-selected"), we.querySelectorAll("[tabindex]").forEach((Ve) => Ve.setAttribute("tabindex", "-1")), ie.appendChild(we), De(we);
    const We = le - Ne.d, rt = tt ? V : 0;
    ie.style.width = Math.min(
      (u || 0) - rt,
      b && pe <= (u || 0) ? it : it - rt
    ) + We + "px";
    const lt = kn(Me);
    P.offset = {
      x: We,
      y: -Math.round(lt.height / 2)
    }, ut.current || (ut.current = D.clientY);
  }
  function cn(D, P) {
    const { from: ie } = P, be = P.pos, Ie = kn(ne.current);
    be.x = Ie.x;
    const Me = wt.top;
    if (be.y < Me) be.y = Me;
    else {
      const we = Ie.height - (ve && V > 0 ? V : Math.round(wt.sense / 2)) - wt.bottom;
      be.y > we && (be.y = we);
    }
    if (ne.current.contains(P.targetNode)) {
      const we = Be(P.targetNode, "data-id"), We = Wt(we?.getAttribute("data-id"));
      if (We && We !== ie) {
        P.to = We;
        const rt = c ? de?.offsetHeight : v?.rowHeight;
        if (de && (se === 0 || be.y > Me + rt - 1)) {
          const lt = we.getBoundingClientRect(), Ve = kn(de).y, ct = lt.y, Kt = Ve > ct ? -1 : 1, dn = Kt === 1 ? "after" : "before", un = Math.abs(h.getRowIndex(ie) - h.getRowIndex(We)), Ln = un !== 1 ? dn === "before" ? "after" : "before" : dn;
          if (un === 1 && (Kt === -1 && D.clientY > ut.current || Kt === 1 && D.clientY < ut.current))
            return;
          ut.current = D.clientY, h.exec("move-item", {
            id: ie,
            target: We,
            mode: Ln,
            inProgress: !0
          });
        }
      }
      o && o({ event: D, context: P });
    }
    vc(D, Ie, P, wt);
  }
  function S(D, P) {
    const { from: ie, to: be } = P;
    h.exec("move-item", {
      id: ie,
      target: be,
      inProgress: !1
    }), Rt.current = setTimeout(() => {
      Rt.current = 0;
    }, 1), ce(null), De(null), ut.current = null, Eo(P);
  }
  function j() {
    const D = document.createElement("div");
    D.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(D);
    const P = D.offsetWidth - D.clientWidth;
    return document.body.removeChild(D), P;
  }
  const ee = C(() => L > 0 ? { width: `${L}px` } : void 0, [L]), oe = F(null);
  function ae() {
    Promise.resolve().then(() => {
      let D = 0, P = $e;
      const ie = oe.current;
      ie && (Array.from(ie.children).forEach((be, Ie) => {
        Se.current[$e + Ie] = be.offsetHeight, D += be.offsetHeight, P++;
      }), Ee(D), kt(P));
    });
  }
  Y(() => {
    Q && c && ae();
  }, [Q, c, $e]);
  let [me, ke] = K();
  Y(() => {
    if (N && (!_ || !fe.length || fe.includes(N.row)))
      ke({ ...N });
    else if (Q.length && Ne.data.length) {
      if (!me || fe.length && !fe.includes(me.row) || Q.findIndex((D) => D.id == me.row) === -1 || Ne.data.findIndex(
        (D) => D.id == me.column && !D.collapsed
      ) === -1) {
        const D = fe[0] || Q[0].id, P = Ne.data.findIndex((ie) => !ie.collapsed);
        ke(P !== -1 ? { row: D, column: Ne.data[P].id } : null);
      }
    } else ke(null);
  }, [N]);
  const Re = F(null);
  Y(() => {
    const D = ne.current;
    if (!D) return;
    const P = pc(D, d);
    return () => {
      typeof P == "function" && P();
    };
  }, [d]);
  const Te = F({});
  Object.assign(Te.current, {
    start: ln,
    move: cn,
    end: S,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: qe() })
  }), Y(() => {
    const D = ne.current;
    return D ? wc(D, Te).destroy : void 0;
  }, [H, ne.current]), Y(() => {
    const D = ne.current;
    return D ? Cr(D, {
      keys: m !== !1 && {
        ...ql,
        "ctrl+z": I,
        "ctrl+y": I,
        ...m
      },
      exec: (P) => h.exec("hotkey", P)
    }).destroy : void 0;
  }, [h, I, m]);
  const Pe = F({
    scroll: h.getReactiveState().scroll
  });
  Pe.current.getWidth = () => (u || 0) - (tt ? V : 0), Pe.current.getHeight = () => W, Pe.current.getScrollMargin = () => ue.width + q.width, Y(() => {
    Xl(Re.current, Pe.current);
  }, []);
  const Xe = F(null);
  Y(() => {
    const D = Xe.current;
    if (!D) return;
    const P = [];
    return P.push(
      en(D, () => h.exec("focus-cell", { eventSource: "click" })).destroy
    ), P.push(ri(D, an.current)), () => P.forEach((ie) => ie());
  }, []);
  const It = `wx-grid ${p ? `wx-responsive-${p}` : ""}`;
  return /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-4VuBwK2D " + It,
        style: {
          "--header-height": `${Oe}px`,
          "--footer-height": `${ze}px`,
          "--split-left-width": `${ue.width}px`,
          "--split-right-width": `${q.width}px`
        },
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: ne,
            className: "wx-4VuBwK2D wx-table-box",
            style: ee,
            role: O ? "treegrid" : "grid",
            "aria-colcount": Ne.data.length,
            "aria-rowcount": Q.length,
            "aria-multiselectable": O && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ B(
              "div",
              {
                ref: Re,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: ve ? "scroll" : "hidden",
                  overflowY: tt ? "scroll" : "hidden"
                },
                onScroll: _e,
                children: [
                  e ? /* @__PURE__ */ g("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ g(
                    gs,
                    {
                      contentWidth: it,
                      deltaLeft: Ne.dh,
                      columns: Ne.header,
                      columnStyle: a,
                      bodyHeight: W - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ B(
                    "div",
                    {
                      ref: Xe,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${it}px`, height: `${Ke}px` },
                      onMouseDown: (D) => Fe(D),
                      children: [
                        r ? /* @__PURE__ */ g(Rc, { overlay: r }) : null,
                        /* @__PURE__ */ g(
                          "div",
                          {
                            ref: oe,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Ye.d}px`,
                              paddingLeft: `${Ne.d}px`
                            },
                            children: Q.map((D, P) => {
                              const ie = T.indexOf(D.id) !== -1, be = G === D.id, Ie = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(D) : "") + (ie ? " wx-selected" : "") + (be ? " wx-inactive" : ""), Me = c ? { minHeight: `${D.rowHeight || z}px` } : { height: `${D.rowHeight || z}px` };
                              return /* @__PURE__ */ g(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + Ie,
                                  "data-id": D.id,
                                  "data-context-id": D.id,
                                  style: Me,
                                  role: "row",
                                  "aria-rowindex": P,
                                  "aria-expanded": D.open,
                                  "aria-level": O ? D.$level + 1 : void 0,
                                  "aria-selected": O ? ie : void 0,
                                  tabIndex: -1,
                                  children: Ne.data.map((we) => we.collapsed ? /* @__PURE__ */ g(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    we.id
                                  ) : E?.id === D.id && E.column == we.id ? /* @__PURE__ */ g(Fc, { row: D, column: we }, we.id) : /* @__PURE__ */ g(
                                    _c,
                                    {
                                      row: D,
                                      column: we,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: H,
                                      focusable: me?.row === D.id && me?.column == we.id
                                    },
                                    we.id
                                  ))
                                },
                                D.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ g(
                    gs,
                    {
                      type: "footer",
                      contentWidth: it,
                      deltaLeft: Ne.df,
                      columns: Ne.footer,
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
    A ? /* @__PURE__ */ g(
      Pc,
      {
        config: A,
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
const Yc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Vc = Mt(function({
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
  reorder: f = !1,
  onReorder: p = null,
  autoRowHeight: m = !1,
  sizes: h,
  split: w,
  tree: x = !1,
  autoConfig: y = !1,
  init: k = null,
  responsive: v = null,
  sortMarks: T,
  undo: $ = !1,
  hotkeys: _ = null,
  ...E
}, O) {
  const N = F();
  N.current = E;
  const A = C(() => new Vl(Cs), []), I = C(() => A.in, [A]), H = F(null);
  H.current === null && (H.current = new Is((ue, q) => {
    const te = "on" + Yc(ue);
    N.current && N.current[te] && N.current[te](q);
  }), I.setNext(H.current));
  const M = C(
    () => ({
      getState: A.getState.bind(A),
      getReactiveState: A.getReactive.bind(A),
      getStores: () => ({ data: A }),
      exec: I.exec,
      setNext: (ue) => (H.current = H.current.setNext(ue), H.current),
      intercept: I.intercept.bind(I),
      on: I.on.bind(I),
      detach: I.detach.bind(I),
      getRow: A.getRow.bind(A),
      getRowIndex: A.getRowIndex.bind(A),
      getColumn: A.getColumn.bind(A)
    }),
    [A, I]
  ), [V, J] = K(0), [le, X] = K(0), [se, he] = K(null), [b, z] = K(null), ne = C(() => {
    if (y && !e.length && t.length) {
      const ue = t[0], q = [];
      for (let te in ue)
        if (te !== "id" && te[0] !== "$") {
          let pe = {
            id: te,
            header: te[0].toUpperCase() + te.slice(1)
          };
          typeof y == "object" && (pe = { ...pe, ...y }), q.push(pe);
        }
      return q;
    }
    return (b && b.columns) ?? e;
  }, [y, e, t, b]), G = C(
    () => (b && b.sizes) ?? h,
    [b, h]
  ), ce = R(
    (ue) => {
      if (J(ue.width), X(ue.height), v) {
        const q = Object.keys(v).map(Number).sort((te, pe) => te - pe).find((te) => ue.width <= te) ?? null;
        q !== se && (z(v[q]), he(q));
      }
    },
    [v, se]
  ), de = xe(et.theme), De = F(0);
  return Y(() => {
    if (!De.current)
      k && k(M);
    else {
      const ue = A.getState();
      A.init({
        data: t,
        columns: ne,
        split: w || ue.split,
        sizes: G || ue.sizes,
        selectedRows: o || ue.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: T || ue.sortMarks,
        undo: $,
        reorder: f,
        _skin: de,
        _select: i
      });
    }
    De.current++;
  }, [
    A,
    t,
    ne,
    w,
    G,
    o,
    d,
    x,
    T,
    $,
    f,
    de,
    i,
    k,
    M
  ]), De.current === 0 && A.init({
    data: t,
    columns: ne,
    split: w || { left: 0 },
    sizes: G || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: T || {},
    undo: $,
    reorder: f,
    _skin: de,
    select: i
  }), Dt(
    O,
    () => ({
      ...M
    }),
    [M]
  ), /* @__PURE__ */ g(nt.Provider, { value: M, children: /* @__PURE__ */ g(En, { words: Jl, optional: !0, children: /* @__PURE__ */ g(
    Wc,
    {
      header: l,
      footer: c,
      overlay: u,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      onReorder: p,
      multiselect: a,
      autoRowHeight: m,
      clientWidth: V,
      clientHeight: le,
      responsiveLevel: se,
      resize: ce,
      hotkeys: _
    }
  ) }) });
});
function Gc({ item: t }) {
  return /* @__PURE__ */ B(
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
function Kc({ columns: t = null, api: e, children: n }) {
  Y(() => {
    rc("table-header", Gc);
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
  const i = ft(e, "_columns"), a = C(() => {
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
  return /* @__PURE__ */ g(
    No,
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
ur(Je);
function jc({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ B("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
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
function ws({ column: t, cell: e }) {
  const n = C(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ g("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ g(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function Bc(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: i,
    multiTaskRows: a = !1,
    rowMapping: l = null
  } = t, [c, d] = Ae(o), [u, f] = K(), p = xe(et.i18n), m = C(() => p.getGroup("gantt"), [p]), h = xe(vt), w = Z(h, "scrollTop"), x = Z(h, "cellHeight"), y = Z(h, "_scrollTask"), k = Z(h, "_selected"), v = Z(h, "area"), T = Z(h, "_tasks"), $ = Z(h, "_scales"), _ = Z(h, "columns"), E = Z(h, "_sort"), O = Z(h, "calendar"), N = Z(h, "durationUnit"), A = Z(h, "splitTasks"), [I, H] = K(null), M = C(() => !T || !v ? [] : T.slice(v.start, v.end), [T, v]), V = R(
    (L, U) => {
      if (U === "add-task")
        h.exec(U, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (U === "open-task") {
        const Q = M.find((fe) => fe.id === L);
        (Q?.data || Q?.lazy) && h.exec(U, { id: L, mode: !Q.open });
      }
    },
    [M]
  ), J = R(
    (L) => {
      const U = _t(L), Q = L.target.dataset.action;
      Q && L.preventDefault(), U ? Q === "add-task" || Q === "open-task" ? V(U, Q) : h.exec("select-task", {
        id: U,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : Q === "add-task" && V(null, Q);
    },
    [h, V]
  ), le = F(null), X = F(null), [se, he] = K(0), [b, z] = K(!1);
  Y(() => {
    const L = X.current;
    if (!L || typeof ResizeObserver > "u") return;
    const U = () => he(L.clientWidth);
    U();
    const Q = new ResizeObserver(U);
    return Q.observe(L), () => Q.disconnect();
  }, []);
  const ne = F(null), G = R(
    (L) => {
      const U = L.id, { before: Q, after: fe } = L, $e = L.onMove;
      let _e = Q || fe, Fe = Q ? "before" : "after";
      if ($e) {
        if (Fe === "after") {
          const qe = h.getTask(_e);
          qe.data?.length && qe.open && (Fe = "before", _e = qe.data[0].id);
        }
        ne.current = { id: U, [Fe]: _e };
      } else ne.current = null;
      h.exec("move-task", {
        id: U,
        mode: Fe,
        target: _e,
        inProgress: $e
      });
    },
    [h]
  ), ce = C(() => v?.from ?? 0, [v]), de = C(() => $?.height ?? 0, [$]), De = C(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (se ?? 0), [n, s, c, r, se]), ue = C(() => {
    const L = {};
    return De && s === "all" || s === "grid" && De ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [De, s, c]), q = C(() => I && !M.find((L) => L.id === I.id) ? [...M, I] : M, [M, I]), te = C(() => {
    if (!a || !l) return q;
    const L = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Set();
    return q.forEach((Q) => {
      const fe = l.taskRows.get(Q.id) ?? Q.id;
      U.has(fe) || (L.set(fe, {
        ...Q,
        $rowTasks: l.rowMap.get(fe) || [Q.id]
      }), U.add(fe));
    }), Array.from(L.values());
  }, [q, a, l]), pe = C(() => {
    let L = (_ || []).map((fe) => {
      fe = { ...fe };
      const $e = fe.header;
      if (typeof $e == "object") {
        const _e = $e.text && m($e.text);
        fe.header = { ...$e, text: _e };
      } else fe.header = m($e);
      return fe;
    });
    const U = L.findIndex((fe) => fe.id === "text"), Q = L.findIndex((fe) => fe.id === "add-task");
    if (U !== -1 && (L[U].cell && (L[U]._cell = L[U].cell), L[U].cell = jc), Q !== -1) {
      L[Q].cell = L[Q].cell || ws;
      const fe = L[Q].header;
      if (typeof fe != "object" && (L[Q].header = { text: fe }), L[Q].header.cell = fe.cell || ws, e)
        L.splice(Q, 1);
      else if (n) {
        const [$e] = L.splice(Q, 1);
        L.unshift($e);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [_, m, e, n]), He = C(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : pe.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, pe]), Le = C(() => {
    if (te && E?.length) {
      const L = {};
      return E.forEach(({ key: U, order: Q }, fe) => {
        L[U] = {
          order: Q,
          ...E.length > 1 && { index: fe }
        };
      }), L;
    }
    return {};
  }, [te, E]), Ne = R(() => pe.some((L) => L.flexgrow && !L.hidden), []), Oe = C(() => Ne(), [Ne, b]), ze = C(() => {
    let L = s === "chart" ? pe.filter((Q) => Q.id === "add-task") : pe;
    const U = s === "all" ? r : se;
    if (!Oe) {
      let Q = c, fe = !1;
      if (pe.some(($e) => $e.$width)) {
        let $e = 0;
        Q = pe.reduce((_e, Fe) => (Fe.hidden || ($e += Fe.width, _e += Fe.$width || Fe.width), _e), 0), $e > Q && Q > U && (fe = !0);
      }
      if (fe || Q < U) {
        let $e = 1;
        return fe || ($e = (U - 50) / (Q - 50 || 1)), L.map((_e) => (_e.id !== "add-task" && !_e.hidden && (_e.$width || (_e.$width = _e.width), _e.width = _e.$width * $e), _e));
      }
    }
    return L;
  }, [s, pe, Oe, c, r, se]), ve = R(
    (L) => {
      if (!Ne()) {
        const U = ze.reduce((Q, fe) => (L && fe.$width && (fe.$width = fe.width), Q + (fe.hidden ? 0 : fe.width)), 0);
        U !== c && d(U);
      }
      z(!0), z(!1);
    },
    [Ne, ze, c, d]
  ), W = R(() => {
    pe.filter((U) => U.flexgrow && !U.hidden).length === 1 && pe.forEach((U) => {
      U.$width && !U.flexgrow && !U.hidden && (U.width = U.$width);
    });
  }, []), ge = R(
    (L) => {
      if (!e) {
        const U = _t(L), Q = Xn(L, "data-col-id");
        !(Q && pe.find(($e) => $e.id == Q))?.editor && U && h.exec("show-editor", { id: U });
      }
    },
    [h, e]
    // cols is defined later; relies on latest value at call time
  ), Se = C(
    () => Array.isArray(k) ? k.map((L) => L.id) : [],
    [k]
  ), re = R(() => {
    if (le.current && te !== null) {
      const L = le.current.querySelector(".wx-body");
      L && (L.style.top = -((w ?? 0) - (ce ?? 0)) + "px");
    }
    X.current && (X.current.scrollTop = 0);
  }, [te, w, ce]);
  Y(() => {
    le.current && re();
  }, [w, ce, re]), Y(() => {
    const L = le.current;
    if (!L) return;
    const U = L.querySelector(".wx-table-box .wx-body");
    if (!U || typeof ResizeObserver > "u") return;
    const Q = new ResizeObserver(() => {
      re();
    });
    return Q.observe(U), () => {
      Q.disconnect();
    };
  }, [ze, ue, s, He, te, re]), Y(() => {
    if (!y || !u) return;
    const { id: L } = y, U = u.getState().focusCell;
    U && U.row !== L && le.current && le.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: U.column
    });
  }, [y, u]);
  const Ee = R(
    ({ id: L }) => {
      if (e) return !1;
      h.getTask(L).open && h.exec("open-task", { id: L, mode: !1 });
      const U = h.getState()._tasks.find((Q) => Q.id === L);
      if (H(U || null), !U) return !1;
    },
    [h, e]
  ), Ue = R(
    ({ id: L, top: U }) => {
      ne.current ? G({ ...ne.current, onMove: !1 }) : h.exec("drag-task", {
        id: L,
        top: U + (ce ?? 0),
        inProgress: !1
      }), H(null);
    },
    [h, G, ce]
  ), kt = R(
    ({ id: L, top: U, detail: Q }) => {
      Q && G({ ...Q, onMove: !0 }), h.exec("drag-task", {
        id: L,
        top: U + (ce ?? 0),
        inProgress: !0
      });
    },
    [h, G, ce]
  );
  Y(() => {
    const L = le.current;
    return L ? Zl(L, {
      start: Ee,
      end: Ue,
      move: kt,
      getTask: h.getTask
    }).destroy : void 0;
  }, [h, Ee, Ue, kt]);
  const Ye = R(
    (L) => {
      const { key: U, isInput: Q } = L;
      if (!Q && (U === "arrowup" || U === "arrowdown"))
        return L.eventSource = "grid", h.exec("hotkey", L), !1;
      if (U === "enter") {
        const fe = u?.getState().focusCell;
        if (fe) {
          const { row: $e, column: _e } = fe;
          _e === "add-task" ? V($e, "add-task") : _e === "text" && V($e, "open-task");
        }
      }
    },
    [h, V, u]
  ), Ke = F(null), tt = () => {
    Ke.current = {
      setTableAPI: f,
      handleHotkey: Ye,
      sortVal: E,
      api: h,
      adjustColumns: W,
      setColumnWidth: ve,
      tasks: M,
      calendarVal: O,
      durationUnitVal: N,
      splitTasksVal: A,
      onTableAPIChange: i
    };
  };
  tt(), Y(() => {
    tt();
  }, [
    f,
    Ye,
    E,
    h,
    W,
    ve,
    M,
    O,
    N,
    A,
    i
  ]);
  const it = R((L) => {
    f(L), L.intercept("hotkey", (U) => Ke.current.handleHotkey(U)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (U) => {
      const Q = Ke.current.sortVal, { key: fe, add: $e } = U, _e = Q ? Q.find((qe) => qe.key === fe) : null;
      let Fe = "asc";
      return _e && (Fe = !_e || _e.order === "asc" ? "desc" : "asc"), h.exec("sort-tasks", {
        key: fe,
        order: Fe,
        add: $e
      }), !1;
    }), L.on("resize-column", () => {
      Ke.current.setColumnWidth(!0);
    }), L.on("hide-column", (U) => {
      U.mode || Ke.current.adjustColumns(), Ke.current.setColumnWidth();
    }), L.intercept("update-cell", (U) => {
      const { id: Q, column: fe, value: $e } = U, _e = Ke.current.tasks.find((Fe) => Fe.id === Q);
      if (_e) {
        const Fe = { ..._e };
        let qe = $e;
        qe && !isNaN(qe) && !(qe instanceof Date) && (qe *= 1), Fe[fe] = qe, fo(
          Fe,
          {
            calendar: Ke.current.calendarVal,
            durationUnit: Ke.current.durationUnitVal,
            splitTasks: Ke.current.splitTasksVal
          },
          fe
        ), h.exec("update-task", {
          id: Q,
          task: Fe
        });
      }
      return !1;
    }), i && i(L);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${He}` },
      ref: X,
      children: /* @__PURE__ */ g(
        "div",
        {
          ref: le,
          style: ue,
          className: "wx-rHj6070p wx-table",
          onClick: J,
          onDoubleClick: ge,
          children: /* @__PURE__ */ g(
            Vc,
            {
              init: it,
              sizes: {
                rowHeight: x,
                headerHeight: (de ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: te,
              columns: ze,
              selectedRows: [...Se],
              sortMarks: Le
            }
          )
        }
      )
    }
  );
}
function Uc({ borders: t = "" }) {
  const e = xe(vt), n = Z(e, "cellWidth"), r = Z(e, "cellHeight"), s = F(null), [o, i] = K("#e4e4e4");
  Y(() => {
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
    background: n != null && r != null ? `url(${nl(n, r, o, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ g("div", { ref: s, style: a });
}
function qc({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = xe(vt), s = Z(r, "_links"), o = Z(r, "criticalPath"), i = F(null), a = R(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return Y(() => {
    if (!n && e && i.current) {
      const l = (c) => {
        i.current && !i.current.contains(c.target) && a(c);
      };
      return document.addEventListener("click", l), () => {
        document.removeEventListener("click", l);
      };
    }
  }, [n, e, a]), /* @__PURE__ */ B("svg", { className: "wx-dkx3NwEn wx-links", children: [
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
        ref: i,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: e.$p
      }
    )
  ] });
}
function Xc(t) {
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
  return /* @__PURE__ */ g("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ B(
    "div",
    {
      className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
      "data-segment": i,
      style: r(i),
      children: [
        e.progress ? /* @__PURE__ */ g("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ g(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${s(i)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ g("div", { className: "wx-content", children: o.text || "" })
      ]
    },
    i
  )) });
}
function Qc(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1
  } = t, i = xe(vt), [a, l] = qt(i, "_tasks"), [c, d] = qt(i, "_links"), u = Z(i, "area"), f = Z(i, "_scales"), p = Z(i, "taskTypes"), m = Z(i, "baselines"), [h, w] = qt(i, "_selected"), x = Z(i, "_scrollTask"), y = Z(i, "criticalPath"), k = Z(i, "tasks"), v = Z(i, "schedule"), T = Z(i, "splitTasks"), $ = C(() => {
    if (!u || !Array.isArray(a)) return [];
    const S = u.start ?? 0, j = u.end ?? 0;
    return a.slice(S, j).map((ee) => ({ ...ee }));
  }, [l, u]), _ = Z(i, "cellHeight"), E = C(() => {
    if (!r || !s || !$.length) return $;
    const S = /* @__PURE__ */ new Map(), j = [];
    return a.forEach((ee) => {
      const oe = s.taskRows.get(ee.id) ?? ee.id;
      S.has(oe) || (S.set(oe, j.length), j.push(oe));
    }), $.map((ee) => {
      const oe = s.taskRows.get(ee.id) ?? ee.id, ae = S.get(oe) ?? 0;
      return {
        ...ee,
        $y: ae * _,
        $y_base: ee.$y_base !== void 0 ? ae * _ : void 0
      };
    });
  }, [$, r, s, a, _]), O = C(
    () => f.lengthUnitWidth,
    [f]
  ), N = C(
    () => f.lengthUnit || "day",
    [f]
  ), A = F(!1), [I, H] = K(void 0), [M, V] = K(null), J = F(null), [le, X] = K(null), [se, he] = K(void 0), b = F(null), [z, ne] = K(0), [G, ce] = K(null), [de, De] = K(null), ue = F(null), q = C(() => {
    const S = ue.current;
    return !!(h.length && S && S.contains(document.activeElement));
  }, [h, ue.current]), te = C(() => q && h[h.length - 1]?.id, [q, h]);
  Y(() => {
    if (x && q && x) {
      const { id: S } = x, j = ue.current?.querySelector(
        `.wx-bar[data-id='${S}']`
      );
      j && j.focus({ preventScroll: !0 });
    }
  }, [x]), Y(() => {
    const S = ue.current;
    if (S && (ne(S.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const j = new ResizeObserver((ee) => {
        ee[0] && ne(ee[0].contentRect.width);
      });
      return j.observe(S), () => j.disconnect();
    }
  }, [ue.current]);
  const pe = R(() => {
    document.body.style.userSelect = "none";
  }, []), He = R(() => {
    document.body.style.userSelect = "";
  }, []), Le = R(
    (S, j, ee) => {
      if (j.target.classList.contains("wx-line") || (ee || (ee = i.getTask($t(S))), ee.type === "milestone" || ee.type === "summary")) return "";
      const oe = Be(j, "data-segment");
      oe && (S = oe);
      const { left: ae, width: me } = S.getBoundingClientRect(), ke = (j.clientX - ae) / me;
      let Re = 0.2 / (me > 200 ? me / 200 : 1);
      return ke < Re ? "start" : ke > 1 - Re ? "end" : "";
    },
    [i]
  ), Ne = C(() => {
    const S = /* @__PURE__ */ new Map();
    if (!r || !s)
      return a.forEach((oe) => {
        S.set(oe.id, oe.$y);
      }), S;
    const j = /* @__PURE__ */ new Map(), ee = [];
    return a.forEach((oe) => {
      const ae = s.taskRows.get(oe.id) ?? oe.id;
      j.has(ae) || (j.set(ae, ee.length), ee.push(ae));
    }), a.forEach((oe) => {
      const ae = s.taskRows.get(oe.id) ?? oe.id, me = j.get(ae) ?? 0;
      S.set(oe.id, me * _);
    }), S;
  }, [a, r, s, _]), Oe = R(
    (S) => {
      const j = ue.current;
      if (!j) return [];
      const ee = j.parentElement?.scrollLeft || 0, oe = j.parentElement?.parentElement?.scrollTop || 0, ae = Math.min(S.startX, S.currentX), me = Math.max(S.startX, S.currentX), ke = Math.min(S.startY, S.currentY), Re = Math.max(S.startY, S.currentY);
      return a.filter((Te) => {
        const Pe = Te.$x - ee, Xe = Te.$x + Te.$w - ee, D = (Ne.get(Te.id) ?? Te.$y) - oe, P = D + Te.$h;
        return Pe < me && Xe > ae && D < Re && P > ke;
      });
    },
    [a, Ne]
  ), ze = C(() => new Set(h.map((S) => S.id)), [h, w]), ve = R(
    (S) => ze.has(S),
    [ze]
  ), W = R(
    (S, j) => {
      const { clientX: ee } = j, oe = $t(S), ae = i.getTask(oe), me = j.target.classList;
      if (!j.target.closest(".wx-delete-button") && !e) {
        if (me.contains("wx-progress-marker")) {
          const { progress: ke } = i.getTask(oe);
          J.current = {
            id: oe,
            x: ee,
            progress: ke,
            dx: 0,
            node: S,
            marker: j.target
          }, j.target.classList.add("wx-progress-in-drag");
        } else {
          const ke = Le(S, j, ae) || "move", Re = {
            id: oe,
            mode: ke,
            x: ee,
            dx: 0,
            l: ae.$x,
            w: ae.$w
          };
          if (T && ae.segments?.length) {
            const Te = Be(j, "data-segment");
            Te && (Re.segmentIndex = Te.dataset.segment * 1);
          }
          V(Re);
        }
        pe();
      }
    },
    [i, e, Le, pe, T]
  ), ge = R(
    (S) => {
      if (S.button !== 0) return;
      const j = Be(S);
      if (!j && o && !e) {
        const ee = ue.current;
        if (!ee) return;
        const oe = ee.getBoundingClientRect(), ae = S.clientX - oe.left, me = S.clientY - oe.top;
        ce({
          startX: ae,
          startY: me,
          currentX: ae,
          currentY: me,
          ctrlKey: S.ctrlKey || S.metaKey
        }), pe();
        return;
      }
      if (j) {
        if (o && !e && h.length > 1) {
          const ee = $t(j);
          if (ve(ee)) {
            const oe = S.target.classList;
            if (!oe.contains("wx-link") && !oe.contains("wx-progress-marker") && !S.target.closest(".wx-delete-button")) {
              const ae = i.getTask(ee);
              if (!Le(j, S, ae)) {
                const ke = /* @__PURE__ */ new Map();
                h.forEach((Re) => {
                  const Te = i.getTask(Re.id);
                  if (Te) {
                    if (v?.auto && Te.type === "summary") return;
                    ke.set(Re.id, {
                      $x: Te.$x,
                      $w: Te.$w,
                      start: Te.start,
                      end: Te.end
                    });
                  }
                }), De({
                  baseTaskId: ee,
                  startX: S.clientX,
                  dx: 0,
                  originalPositions: ke
                }), pe();
                return;
              }
            }
          }
        }
        W(j, S);
      }
    },
    [W, o, e, h, ve, i, Le, v, pe]
  ), Se = R(
    (S) => {
      const j = Be(S);
      j && (b.current = setTimeout(() => {
        he(!0), W(j, S.touches[0]);
      }, 300));
    },
    [W]
  ), re = R(
    (S) => {
      X(S && { ...c.find((j) => j.id === S) });
    },
    [c]
  ), Ee = R(() => {
    if (G) {
      const S = Oe(G);
      G.ctrlKey ? S.forEach((j) => {
        i.exec("select-task", { id: j.id, toggle: !0, marquee: !0 });
      }) : (h.length > 0 && i.exec("select-task", { id: null, marquee: !0 }), S.forEach((j, ee) => {
        i.exec("select-task", {
          id: j.id,
          toggle: ee > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), ce(null), He(), A.current = !0;
      return;
    }
    if (de) {
      const { dx: S, originalPositions: j } = de, ee = Math.round(S / O);
      if (ee !== 0) {
        let oe = !0;
        j.forEach((ae, me) => {
          const ke = i.getTask(me);
          ke && (i.exec("update-task", {
            id: me,
            diff: ee,
            task: { start: ke.start, end: ke.end },
            skipUndo: !oe
            // Only first task creates undo entry
          }), oe = !1);
        }), A.current = !0;
      } else
        j.forEach((oe, ae) => {
          i.exec("drag-task", {
            id: ae,
            left: oe.$x,
            width: oe.$w,
            inProgress: !1
          });
        });
      De(null), He();
      return;
    }
    if (J.current) {
      const { dx: S, id: j, marker: ee, value: oe } = J.current;
      J.current = null, typeof oe < "u" && S && i.exec("update-task", {
        id: j,
        task: { progress: oe },
        inProgress: !1
      }), ee.classList.remove("wx-progress-in-drag"), A.current = !0, He();
    } else if (M) {
      const { id: S, mode: j, dx: ee, l: oe, w: ae, start: me, segment: ke, index: Re } = M;
      if (V(null), me) {
        const Te = Math.round(ee / O);
        if (!Te)
          i.exec("drag-task", {
            id: S,
            width: ae,
            left: oe,
            inProgress: !1,
            ...ke && { segmentIndex: Re }
          });
        else {
          let Pe = {}, Xe = i.getTask(S);
          ke && (Xe = Xe.segments[Re]);
          const It = 1440 * 60 * 1e3, P = Te * (N === "week" ? 7 : N === "month" ? 30 : N === "quarter" ? 91 : N === "year" ? 365 : 1) * It;
          j === "move" ? (Pe.start = new Date(Xe.start.getTime() + P), Pe.end = new Date(Xe.end.getTime() + P)) : j === "start" ? (Pe.start = new Date(Xe.start.getTime() + P), Pe.end = Xe.end) : j === "end" && (Pe.start = Xe.start, Pe.end = new Date(Xe.end.getTime() + P)), i.exec("update-task", {
            id: S,
            task: Pe,
            ...ke && { segmentIndex: Re }
          });
        }
        A.current = !0;
      }
      He();
    }
  }, [i, He, M, O, N, G, de, Oe, h]), Ue = R(
    (S, j) => {
      const { clientX: ee, clientY: oe } = j;
      if (!e) {
        if (G) {
          const ae = ue.current;
          if (!ae) return;
          const me = ae.getBoundingClientRect(), ke = ee - me.left, Re = oe - me.top;
          ce((Te) => ({
            ...Te,
            currentX: ke,
            currentY: Re
          }));
          return;
        }
        if (de) {
          const ae = ee - de.startX;
          de.originalPositions.forEach((me, ke) => {
            const Re = me.$x + ae;
            i.exec("drag-task", {
              id: ke,
              left: Re,
              width: me.$w,
              inProgress: !0
            });
          }), De((me) => ({ ...me, dx: ae }));
          return;
        }
        if (J.current) {
          const { node: ae, x: me, id: ke } = J.current, Re = J.current.dx = ee - me, Te = Math.round(Re / ae.offsetWidth * 100);
          let Pe = J.current.progress + Te;
          J.current.value = Pe = Math.min(
            Math.max(0, Pe),
            100
          ), i.exec("update-task", {
            id: ke,
            task: { progress: Pe },
            inProgress: !0
          });
        } else if (M) {
          re(null);
          const { mode: ae, l: me, w: ke, x: Re, id: Te, start: Pe, segment: Xe, index: It } = M, D = i.getTask(Te), P = ee - Re;
          if (!Pe && Math.abs(P) < 20 || ae === "start" && ke - P < O || ae === "end" && ke + P < O || ae === "move" && (P < 0 && me + P < 0 || P > 0 && me + ke + P > z) || M.segment)
            return;
          const ie = { ...M, dx: P };
          let be, Ie;
          if (ae === "start" ? (be = me + P, Ie = ke - P) : ae === "end" ? (be = me, Ie = ke + P) : ae === "move" && (be = me + P, Ie = ke), i.exec("drag-task", {
            id: Te,
            width: Ie,
            left: be,
            inProgress: !0,
            ...Xe && { segmentIndex: It }
          }), !ie.start && (ae === "move" && D.$x == me || ae !== "move" && D.$w == ke)) {
            A.current = !0, Ee();
            return;
          }
          ie.start = !0, V(ie);
        } else {
          const ae = Be(S);
          if (ae) {
            const me = i.getTask($t(ae)), Re = Be(S, "data-segment") || ae, Te = Le(Re, j, me);
            Re.style.cursor = Te && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      e,
      M,
      O,
      z,
      Le,
      re,
      Ee,
      G,
      de
    ]
  ), kt = R(
    (S) => {
      Ue(S, S);
    },
    [Ue]
  ), Ye = R(
    (S) => {
      se ? (S.preventDefault(), Ue(S, S.touches[0])) : b.current && (clearTimeout(b.current), b.current = null);
    },
    [se, Ue]
  ), Ke = R(() => {
    Ee();
  }, [Ee]), tt = R(() => {
    he(null), b.current && (clearTimeout(b.current), b.current = null), Ee();
  }, [Ee]);
  Y(() => (window.addEventListener("mouseup", Ke), () => {
    window.removeEventListener("mouseup", Ke);
  }), [Ke]);
  const it = R(
    (S) => {
      if (!e) {
        const j = _t(S.target);
        if (j && !S.target.classList.contains("wx-link")) {
          const ee = _t(S.target, "data-segment");
          i.exec("show-editor", {
            id: j,
            ...ee !== null && { segmentIndex: ee }
          });
        }
      }
    },
    [i, e]
  ), L = ["e2s", "s2s", "e2e", "s2e"], U = R((S, j) => L[(S ? 1 : 0) + (j ? 0 : 2)], []), Q = R(
    (S, j) => {
      const ee = I.id, oe = I.start;
      return S === ee ? !0 : !!c.find((ae) => ae.target == S && ae.source == ee && ae.type === U(oe, j));
    },
    [I, d, U]
  ), fe = R(() => {
    I && H(null);
  }, [I]), $e = R(
    (S) => {
      if (A.current) {
        A.current = !1;
        return;
      }
      const j = _t(S.target);
      if (j) {
        const ee = S.target.classList;
        if (ee.contains("wx-link")) {
          const oe = ee.contains("wx-left");
          if (!I) {
            H({ id: j, start: oe });
            return;
          }
          I.id !== j && !Q(j, oe) && i.exec("add-link", {
            link: {
              source: I.id,
              target: j,
              type: U(I.start, oe)
            }
          });
        } else if (ee.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: le.id }), X(null);
        else {
          let oe;
          const ae = Be(S, "data-segment");
          ae && (oe = ae.dataset.segment * 1), i.exec("select-task", {
            id: j,
            toggle: S.ctrlKey || S.metaKey,
            range: S.shiftKey,
            segmentIndex: oe
          });
        }
      }
      fe();
    },
    [
      i,
      I,
      d,
      le,
      Q,
      U,
      fe
    ]
  ), _e = R((S) => ({
    left: `${S.$x}px`,
    top: `${S.$y}px`,
    width: `${S.$w}px`,
    height: `${S.$h}px`
  }), []), Fe = R((S) => ({
    left: `${S.$x_base}px`,
    top: `${S.$y_base}px`,
    width: `${S.$w_base}px`,
    height: `${S.$h_base}px`
  }), []), qe = R(
    (S) => {
      if (se || b.current)
        return S.preventDefault(), !1;
    },
    [se]
  ), Rt = C(
    () => p.map((S) => S.id),
    [p]
  ), ut = R(
    (S) => {
      let j = Rt.includes(S) ? S : "task";
      return ["task", "milestone", "summary"].includes(S) || (j = `task ${j}`), j;
    },
    [Rt]
  ), an = R(
    (S) => {
      i.exec(S.action, S.data);
    },
    [i]
  ), wt = R(
    (S) => y && k.byId(S).$critical,
    [y, k]
  ), ln = R(
    (S) => {
      if (v?.auto) {
        const j = k.getSummaryId(S, !0), ee = k.getSummaryId(I.id, !0);
        return I?.id && !(Array.isArray(j) ? j : [j]).includes(
          I.id
        ) && !(Array.isArray(ee) ? ee : [ee]).includes(S);
      }
      return I;
    },
    [v, k, I]
  ), cn = C(() => {
    if (!G) return null;
    const S = Math.min(G.startX, G.currentX), j = Math.min(G.startY, G.currentY), ee = Math.abs(G.currentX - G.startX), oe = Math.abs(G.currentY - G.startY);
    return {
      left: `${S}px`,
      top: `${j}px`,
      width: `${ee}px`,
      height: `${oe}px`
    };
  }, [G]);
  return /* @__PURE__ */ B(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${E.length ? E[0].$h : 0}px` },
      ref: ue,
      onContextMenu: qe,
      onMouseDown: ge,
      onMouseMove: kt,
      onTouchStart: Se,
      onTouchMove: Ye,
      onTouchEnd: tt,
      onClick: $e,
      onDoubleClick: it,
      onDragStart: (S) => (S.preventDefault(), !1),
      children: [
        /* @__PURE__ */ g(
          qc,
          {
            onSelectLink: re,
            selectedLink: le,
            readonly: e
          }
        ),
        E.map((S) => {
          if (S.$skip && S.$skip_baseline) return null;
          const j = `wx-bar wx-${ut(S.type)}` + (se && M && S.id === M.id ? " wx-touch" : "") + (I && I.id === S.id ? " wx-selected" : "") + (ze.has(S.id) ? " wx-selected" : "") + (wt(S.id) ? " wx-critical" : "") + (S.$reorder ? " wx-reorder-task" : "") + (T && S.segments ? " wx-split" : ""), ee = "wx-link wx-left" + (I ? " wx-visible" : "") + (!I || !Q(S.id, !0) && ln(S.id) ? " wx-target" : "") + (I && I.id === S.id && I.start ? " wx-selected" : "") + (wt(S.id) ? " wx-critical" : ""), oe = "wx-link wx-right" + (I ? " wx-visible" : "") + (!I || !Q(S.id, !1) && ln(S.id) ? " wx-target" : "") + (I && I.id === S.id && !I.start ? " wx-selected" : "") + (wt(S.id) ? " wx-critical" : "");
          return /* @__PURE__ */ B(ks, { children: [
            !S.$skip && /* @__PURE__ */ B(
              "div",
              {
                className: "wx-GKbcLEGA " + j,
                style: _e(S),
                "data-tooltip-id": S.id,
                "data-id": S.id,
                tabIndex: te === S.id ? 0 : -1,
                children: [
                  e ? null : S.id === le?.target && le?.type[2] === "s" ? /* @__PURE__ */ g(
                    pt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + ee, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  S.type !== "milestone" ? /* @__PURE__ */ B(Ce, { children: [
                    S.progress && !(T && S.segments) ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${S.progress}%` }
                      }
                    ) }) : null,
                    !e && !(T && S.segments) ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${S.progress}% - 10px)` },
                        children: S.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ g(n, { data: S, api: i, onAction: an }) : T && S.segments ? /* @__PURE__ */ g(Xc, { task: S, type: ut(S.type) }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: S.text || "" })
                  ] }) : /* @__PURE__ */ B(Ce, { children: [
                    /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ g(n, { data: S, api: i, onAction: an }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-text-out", children: S.text })
                  ] }),
                  e ? null : S.id === le?.target && le?.type[2] === "e" ? /* @__PURE__ */ g(
                    pt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + oe, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            m && !S.$skip_baseline ? /* @__PURE__ */ g(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (S.type === "milestone" ? " wx-milestone" : ""),
                style: Fe(S)
              }
            ) : null
          ] }, S.id);
        }),
        G && cn && /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: cn })
      ]
    }
  );
}
function Zc(t) {
  const { highlightTime: e } = t, n = xe(vt), r = Z(n, "_scales");
  return /* @__PURE__ */ g("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((s, o) => /* @__PURE__ */ g(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${s.height}px` },
      children: (s.cells || []).map((i, a) => {
        const l = e ? e(i.date, i.unit) : "", c = "wx-cell " + (i.css || "") + " " + (l || "");
        return /* @__PURE__ */ g(
          "div",
          {
            className: "wx-ZkvhDKir " + c,
            style: { width: `${i.width}px` },
            children: i.value
          },
          a
        );
      })
    },
    o
  )) });
}
const Jc = /* @__PURE__ */ new Map();
function ed(t) {
  const e = F(null), n = F(0), r = F(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, Y(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        Jc.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function td(t) {
  const {
    readonly: e,
    fullWidth: n,
    fullHeight: r,
    taskTemplate: s,
    cellBorders: o,
    highlightTime: i,
    multiTaskRows: a = !1,
    rowMapping: l = null,
    marqueeSelect: c = !1
  } = t, d = xe(vt), [u, f] = qt(d, "_selected"), p = Z(d, "scrollTop"), m = Z(d, "cellHeight"), h = Z(d, "cellWidth"), w = Z(d, "_scales"), x = Z(d, "_markers"), y = Z(d, "_scrollTask"), k = Z(d, "zoom"), v = Z(d, "_tasks"), [T, $] = K(), _ = F(null), E = 1 + (w?.rows?.length || 0), O = C(() => {
    if (!a || !l || !v?.length) return null;
    const b = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map(), ne = [];
    return v.forEach((G) => {
      const ce = l.taskRows.get(G.id) ?? G.id;
      z.has(ce) || (z.set(ce, ne.length), ne.push(ce));
    }), v.forEach((G) => {
      const ce = l.taskRows.get(G.id) ?? G.id, de = z.get(ce) ?? 0;
      b.set(G.id, de * m);
    }), b;
  }, [v, a, l, m]), N = C(() => {
    const b = [];
    return u && u.length && m && u.forEach((z) => {
      const ne = O?.get(z.id) ?? z.$y;
      b.push({ height: `${m}px`, top: `${ne - 3}px` });
    }), b;
  }, [f, m, O]), A = C(
    () => Math.max(T || 0, r),
    [T, r]
  );
  Y(() => {
    const b = _.current;
    b && typeof p == "number" && (b.scrollTop = p);
  }, [p]);
  const I = () => {
    H();
  };
  function H(b) {
    const z = _.current;
    if (!z) return;
    const ne = {};
    ne.left = z.scrollLeft, d.exec("scroll-chart", ne);
  }
  function M() {
    const b = _.current, ne = Math.ceil((T || 0) / (m || 1)) + 1, G = Math.floor((b && b.scrollTop || 0) / (m || 1)), ce = Math.max(0, G - E), de = G + ne + E, De = ce * (m || 0);
    d.exec("render-data", {
      start: ce,
      end: de,
      from: De
    });
  }
  Y(() => {
    M();
  }, [T, p]);
  const V = R(
    (b) => {
      if (!b) return;
      const { id: z, mode: ne } = b;
      if (ne.toString().indexOf("x") < 0) return;
      const G = _.current;
      if (!G) return;
      const { clientWidth: ce } = G, de = d.getTask(z);
      if (de.$x + de.$w < G.scrollLeft)
        d.exec("scroll-chart", { left: de.$x - (h || 0) }), G.scrollLeft = de.$x - (h || 0);
      else if (de.$x >= ce + G.scrollLeft) {
        const De = ce < de.$w ? h || 0 : de.$w;
        d.exec("scroll-chart", { left: de.$x - ce + De }), G.scrollLeft = de.$x - ce + De;
      }
    },
    [d, h]
  );
  Y(() => {
    V(y);
  }, [y]);
  function J(b) {
    if (k && (b.ctrlKey || b.metaKey)) {
      b.preventDefault();
      const z = _.current, ne = -Math.sign(b.deltaY), G = b.clientX - (z ? z.getBoundingClientRect().left : 0);
      d.exec("zoom-scale", {
        dir: ne,
        offset: G
      });
    }
  }
  function le(b) {
    const z = i(b.date, b.unit);
    return z ? {
      css: z,
      width: b.width
    } : null;
  }
  const X = C(() => w && (w.minUnit === "hour" || w.minUnit === "day") && i ? w.rows[w.rows.length - 1].cells.map(le) : null, [w, i]), se = R(
    (b) => {
      b.eventSource = "chart", d.exec("hotkey", b);
    },
    [d]
  );
  Y(() => {
    const b = _.current;
    if (!b) return;
    const z = () => $(b.clientHeight);
    z();
    const ne = new ResizeObserver(() => z());
    return ne.observe(b), () => {
      ne.disconnect();
    };
  }, [_.current]);
  const he = F(null);
  return Y(() => {
    const b = _.current;
    if (b && !he.current)
      return he.current = Cr(b, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (z) => se(z)
      }), () => {
        he.current?.destroy(), he.current = null;
      };
  }, []), Y(() => {
    const b = _.current;
    if (!b) return;
    const z = J;
    return b.addEventListener("wheel", z), () => {
      b.removeEventListener("wheel", z);
    };
  }, [J]), ed("chart"), /* @__PURE__ */ B(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: _,
      onScroll: I,
      children: [
        /* @__PURE__ */ g(Zc, { highlightTime: i, scales: w }),
        x && x.length ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${A}px` },
            children: x.map((b, z) => /* @__PURE__ */ g(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${b.css || ""}`,
                style: { left: `${b.left}px` },
                children: /* @__PURE__ */ g("div", { className: "wx-mR7v2Xag wx-content", children: b.text })
              },
              z
            ))
          }
        ) : null,
        /* @__PURE__ */ B(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${A}px` },
            children: [
              X ? /* @__PURE__ */ g(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: X.map(
                    (b, z) => b ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + b.css,
                        style: {
                          width: `${b.width}px`,
                          left: `${z * b.width}px`
                        }
                      },
                      z
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ g(Uc, { borders: o }),
              u && u.length ? u.map(
                (b, z) => b.$y ? /* @__PURE__ */ g(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": b.id,
                    style: N[z]
                  },
                  b.id
                ) : null
              ) : null,
              /* @__PURE__ */ g(
                Qc,
                {
                  readonly: e,
                  taskTemplate: s,
                  multiTaskRows: a,
                  rowMapping: l,
                  marqueeSelect: c
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function nd(t) {
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
  } = t, [d, u] = Ae(t.value ?? 0), [f, p] = Ae(t.display ?? "all");
  function m(X) {
    let se = 0;
    e == "center" ? se = n / 2 : e == "before" && (se = n);
    const he = {
      size: [n + "px", "auto"],
      p: [X - se + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let b in he) he[b] = he[b].reverse();
    return he;
  }
  const [h, w] = K(!1), [x, y] = K(null), k = F(0), v = F(), T = F(), $ = F(f);
  Y(() => {
    $.current = f;
  }, [f]), Y(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function _(X) {
    return r == "x" ? X.clientX : X.clientY;
  }
  const E = R(
    (X) => {
      const se = v.current + _(X) - k.current;
      u(se);
      let he;
      se <= l ? he = "chart" : a - se <= c ? he = "grid" : he = "all", $.current !== he && (p(he), $.current = he), T.current && clearTimeout(T.current), T.current = setTimeout(() => s && s(se), 100);
    },
    [a, l, c, s]
  ), O = R(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", O);
  }, [E]), N = C(
    () => f !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [f, r]
  ), A = R(
    (X) => {
      !i && (f === "grid" || f === "chart") || (k.current = _(X), v.current = d, w(!0), document.body.style.cursor = N, document.body.style.userSelect = "none", window.addEventListener("mousemove", E), window.addEventListener("mouseup", O));
    },
    [N, E, O, d, i, f]
  );
  function I() {
    p("all"), x !== null && (u(x), s && s(x));
  }
  function H(X) {
    if (i) {
      const se = f === "chart" ? "grid" : "chart";
      p(se), o(se);
    } else if (f === "grid" || f === "chart")
      I(), o("all");
    else {
      const se = X === "left" ? "chart" : "grid";
      p(se), o(se);
    }
  }
  function M() {
    H("left");
  }
  function V() {
    H("right");
  }
  const J = C(() => m(d), [d, e, n, r]), le = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${f}`,
    h ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ B(
    "div",
    {
      className: "wx-pFykzMlT " + le,
      onMouseDown: A,
      style: { width: J.size[0], height: J.size[1], cursor: N },
      children: [
        /* @__PURE__ */ B("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: M
            }
          ) }),
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: V
            }
          ) })
        ] }),
        /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const rd = 650;
function Ao(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= rd;
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
function sd(t) {
  const {
    taskTemplate: e,
    readonly: n,
    cellBorders: r,
    highlightTime: s,
    onTableAPIChange: o,
    multiTaskRows: i = !1,
    rowMapping: a = null,
    marqueeSelect: l = !1
  } = t, c = xe(vt), d = Z(c, "_tasks"), u = Z(c, "_scales"), f = Z(c, "cellHeight"), p = Z(c, "columns"), m = Z(c, "_scrollTask"), h = Z(c, "undo"), [w, x] = K(!1);
  let [y, k] = K(0);
  const [v, T] = K(0), [$, _] = K(0), [E, O] = K(void 0), [N, A] = K("all"), I = F(null), H = R(
    (q) => {
      x((te) => (q !== te && (q ? (I.current = N, N === "all" && A("grid")) : (!I.current || I.current === "all") && A("all")), q));
    },
    [N]
  );
  Y(() => {
    const q = Ao(H);
    return q.observe(), () => {
      q.disconnect();
    };
  }, [H]);
  const M = C(() => {
    let q;
    return p.every((te) => te.width && !te.flexgrow) ? q = p.reduce((te, pe) => te + parseInt(pe.width), 0) : w && N === "chart" ? q = parseInt(p.find((te) => te.id === "action")?.width) || 50 : q = 440, y = q, q;
  }, [p, w, N]);
  Y(() => {
    k(M);
  }, [M]);
  const V = C(
    () => (v ?? 0) - (E ?? 0),
    [v, E]
  ), J = C(() => u.width, [u]), le = C(() => {
    if (!i || !a)
      return d.length * f;
    const q = /* @__PURE__ */ new Set();
    return d.forEach((te) => {
      const pe = a.taskRows.get(te.id) ?? te.id;
      q.add(pe);
    }), q.size * f;
  }, [d, f, i, a]), X = C(
    () => u.height + le + V,
    [u, le, V]
  ), se = C(
    () => y + J,
    [y, J]
  ), he = F(null), b = R(() => {
    Promise.resolve().then(() => {
      if ((v ?? 0) > (se ?? 0)) {
        const q = (v ?? 0) - y;
        c.exec("expand-scale", { minWidth: q });
      }
    });
  }, [v, se, y, c]);
  Y(() => {
    let q;
    return he.current && (q = new ResizeObserver(b), q.observe(he.current)), () => {
      q && q.disconnect();
    };
  }, [he.current, b]), Y(() => {
    b();
  }, [J]);
  const z = F(null), ne = F(null), G = R(() => {
    const q = z.current;
    q && c.exec("scroll-chart", {
      top: q.scrollTop
    });
  }, [c]), ce = F({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  Y(() => {
    ce.current = {
      rTasks: d,
      rScales: u,
      rCellHeight: f,
      scrollSize: V,
      ganttDiv: z.current,
      ganttHeight: $ ?? 0
    };
  }, [d, u, f, V, $]);
  const de = R(
    (q) => {
      if (!q) return;
      const {
        rTasks: te,
        rScales: pe,
        rCellHeight: He,
        scrollSize: Le,
        ganttDiv: Ne,
        ganttHeight: Oe
      } = ce.current;
      if (!Ne) return;
      const { id: ze } = q, ve = te.findIndex((W) => W.id === ze);
      if (ve > -1) {
        const W = Oe - pe.height, ge = ve * He, Se = Ne.scrollTop;
        let re = null;
        ge < Se ? re = ge : ge + He > Se + W && (re = ge - W + He + Le), re !== null && (c.exec("scroll-chart", { top: Math.max(re, 0) }), z.current.scrollTop = Math.max(re, 0));
      }
    },
    [c]
  );
  Y(() => {
    de(m);
  }, [m]), Y(() => {
    const q = z.current, te = ne.current;
    if (!q || !te) return;
    const pe = () => {
      Po(() => {
        _(q.offsetHeight), T(q.offsetWidth), O(te.offsetWidth);
      });
    }, He = new ResizeObserver(pe);
    return He.observe(q), () => He.disconnect();
  }, [z.current]);
  const De = F(null), ue = F(null);
  return Y(() => {
    ue.current && (ue.current.destroy(), ue.current = null);
    const q = De.current;
    if (q)
      return ue.current = Cr(q, {
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
          "ctrl+z": h,
          "ctrl+y": h,
          "meta+z": h,
          "meta+shift+z": h
        },
        exec: (te) => {
          te.isInput || c.exec("hotkey", te);
        }
      }), () => {
        ue.current?.destroy(), ue.current = null;
      };
  }, [h]), /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-gantt", ref: z, onScroll: G, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: X, width: "100%" },
      ref: ne,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: $,
            width: E
          },
          children: /* @__PURE__ */ B("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: De, children: [
            p.length ? /* @__PURE__ */ B(Ce, { children: [
              /* @__PURE__ */ g(
                Bc,
                {
                  display: N,
                  compactMode: w,
                  columnWidth: M,
                  width: y,
                  readonly: n,
                  fullHeight: le,
                  onTableAPIChange: o,
                  multiTaskRows: i,
                  rowMapping: a
                }
              ),
              /* @__PURE__ */ g(
                nd,
                {
                  value: y,
                  display: N,
                  compactMode: w,
                  containerWidth: v,
                  onMove: (q) => k(q),
                  onDisplayChange: (q) => A(q)
                }
              )
            ] }) : null,
            /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-content", ref: he, children: /* @__PURE__ */ g(
              td,
              {
                readonly: n,
                fullWidth: J,
                fullHeight: le,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                multiTaskRows: i,
                rowMapping: a,
                marqueeSelect: l
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function od(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function id(t, e) {
  return typeof t == "function" ? t : ht(t, e);
}
function Ho(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: id(n, e)
  }));
}
function ad(t, e) {
  const n = od(e);
  for (let r in n)
    n[r] = ht(n[r], t);
  return n;
}
function ld(t, e) {
  if (!t || !t.length) return t;
  const n = ht("%d-%m-%Y", e);
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
function cd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Ho(n.scales, e)
    }))
  } : t;
}
const dd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), ud = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], fd = Mt(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = wo,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: a = [],
  scales: l = ud,
  columns: c = co,
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
  highlightTime: T = null,
  init: $ = null,
  autoScale: _ = !0,
  unscheduledTasks: E = !1,
  criticalPath: O = null,
  schedule: N = { type: "forward" },
  projectStart: A = null,
  projectEnd: I = null,
  calendar: H = null,
  undo: M = !1,
  splitTasks: V = !1,
  multiTaskRows: J = !1,
  marqueeSelect: le = !1,
  ...X
}, se) {
  const he = F();
  he.current = X;
  const b = C(() => new tl(Cs), []), z = C(() => ({ ...tn, ...Rn }), []), ne = xe(et.i18n), G = C(() => ne ? ne.extend(z, !0) : Et(z), [ne, z]), ce = C(() => G.getRaw().calendar, [G]), de = C(() => {
    let ve = {
      zoom: cd(k, ce),
      scales: Ho(l, ce),
      columns: ld(c, ce),
      links: ao(a),
      cellWidth: m
    };
    return ve.zoom && (ve = {
      ...ve,
      ...Wa(
        ve.zoom,
        ad(ce, G.getGroup("gantt")),
        ve.scales,
        m
      )
    }), ve;
  }, [k, l, c, a, m, ce, G]), De = F(null);
  De.current !== s && (sr(s, { durationUnit: p, calendar: H }), De.current = s), Y(() => {
    sr(s, { durationUnit: p, calendar: H });
  }, [s, p, H, V]);
  const ue = C(() => {
    if (!J) return null;
    const ve = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Map(), ge = (Se) => {
      Se.forEach((re) => {
        const Ee = re.row ?? re.id;
        W.set(re.id, Ee), ve.has(Ee) || ve.set(Ee, []), ve.get(Ee).push(re.id), re.data && re.data.length > 0 && ge(re.data);
      });
    };
    return ge(s), { rowMap: ve, taskRows: W };
  }, [s, J]), q = C(() => b.in, [b]), te = F(null);
  te.current === null && (te.current = new Is((ve, W) => {
    const ge = "on" + dd(ve);
    he.current && he.current[ge] && he.current[ge](W);
  }), q.setNext(te.current));
  const [pe, He] = K(null), Le = F(null);
  Le.current = pe;
  const Ne = C(
    () => ({
      getState: b.getState.bind(b),
      getReactiveState: b.getReactive.bind(b),
      getStores: () => ({ data: b }),
      exec: q.exec,
      setNext: (ve) => (te.current = te.current.setNext(ve), te.current),
      intercept: q.intercept.bind(q),
      on: q.on.bind(q),
      detach: q.detach.bind(q),
      getTask: b.getTask.bind(b),
      serialize: b.serialize.bind(b),
      getTable: (ve) => ve ? new Promise((W) => setTimeout(() => W(Le.current), 1)) : Le.current,
      getHistory: () => b.getHistory()
    }),
    [b, q]
  );
  Dt(
    se,
    () => ({
      ...Ne
    }),
    [Ne]
  );
  const Oe = F(0);
  Y(() => {
    Oe.current ? b.init({
      tasks: s,
      links: de.links,
      start: d,
      columns: de.columns,
      end: u,
      lengthUnit: f,
      cellWidth: de.cellWidth,
      cellHeight: h,
      scaleHeight: w,
      scales: de.scales,
      taskTypes: r,
      zoom: de.zoom,
      selected: o,
      activeTask: i,
      baselines: v,
      autoScale: _,
      unscheduledTasks: E,
      markers: n,
      durationUnit: p,
      criticalPath: O,
      schedule: N,
      projectStart: A,
      projectEnd: I,
      calendar: H,
      undo: M,
      _weekStart: ce.weekStart,
      splitTasks: V
    }) : $ && $(Ne), Oe.current++;
  }, [
    Ne,
    $,
    s,
    de,
    d,
    u,
    f,
    h,
    w,
    r,
    o,
    i,
    v,
    _,
    E,
    n,
    p,
    O,
    N,
    A,
    I,
    H,
    M,
    ce,
    V,
    b
  ]), Oe.current === 0 && b.init({
    tasks: s,
    links: de.links,
    start: d,
    columns: de.columns,
    end: u,
    lengthUnit: f,
    cellWidth: de.cellWidth,
    cellHeight: h,
    scaleHeight: w,
    scales: de.scales,
    taskTypes: r,
    zoom: de.zoom,
    selected: o,
    activeTask: i,
    baselines: v,
    autoScale: _,
    unscheduledTasks: E,
    markers: n,
    durationUnit: p,
    criticalPath: O,
    schedule: N,
    projectStart: A,
    projectEnd: I,
    calendar: H,
    undo: M,
    _weekStart: ce.weekStart,
    splitTasks: V
  });
  const ze = C(() => H ? (ve, W) => W == "day" && !H.getDayHours(ve) || W == "hour" && !H.getDayHours(ve) ? "wx-weekend" : "" : T, [H, T]);
  return /* @__PURE__ */ g(et.i18n.Provider, { value: G, children: /* @__PURE__ */ g(vt.Provider, { value: Ne, children: /* @__PURE__ */ g(
    sd,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: ze,
      onTableAPIChange: He,
      multiTaskRows: J,
      rowMapping: ue,
      marqueeSelect: le
    }
  ) }) });
});
function hd({ api: t = null, items: e = [] }) {
  const n = xe(et.i18n), r = C(() => n || Et(Rn), [n]), s = C(() => r.getGroup("gantt"), [r]), o = ft(t, "_selected"), i = ft(t, "undo"), a = ft(t, "history"), l = ft(t, "splitTasks"), c = ["undo", "redo"], d = C(() => {
    const f = ir();
    return (e.length ? e : ir()).map((m) => {
      let h = { ...m, disabled: !1 };
      return h.handler = $r(f, h.id) ? (w) => Lt(t, w.id, null, s) : h.handler, h.text && (h.text = s(h.text)), h.menuText && (h.menuText = s(h.menuText)), h;
    });
  }, [e, t, s, i, l]), u = C(() => {
    const f = [];
    return d.forEach((p) => {
      const m = p.id;
      if (m === "add-task")
        f.push(p);
      else if (c.includes(m))
        c.includes(m) && f.push({
          ...p,
          disabled: p.isDisabled(a)
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
  }, [t, o, a, d]);
  return n ? /* @__PURE__ */ g(lr, { items: u }) : /* @__PURE__ */ g(et.i18n.Provider, { value: r, children: /* @__PURE__ */ g(lr, { items: u }) });
}
const pd = Mt(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: a,
  css: l
}, c) {
  const d = F(null), u = F(null), f = xe(et.i18n), p = C(() => f || Et({ ...Rn, ...tn }), [f]), m = C(() => p.getGroup("gantt"), [p]), h = ft(n, "taskTypes"), w = ft(n, "selected"), x = ft(n, "_selected"), y = ft(n, "splitTasks"), k = C(() => or(), []);
  Y(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function v(H) {
    return H.map((M) => (M = { ...M }, M.text && (M.text = m(M.text)), M.subtext && (M.subtext = m(M.subtext)), M.data && (M.data = v(M.data)), M));
  }
  function T() {
    const H = e.length ? e : or(), M = H.find((V) => V.id === "convert-task");
    return M && (M.data = [], (h || []).forEach((V) => {
      M.data.push(M.dataFactory(V));
    })), v(H);
  }
  const $ = C(() => T(), [n, e, h, y, m]), _ = C(
    () => x && x.length ? x : [],
    [x]
  ), E = R(
    (H, M) => {
      let V = H ? n?.getTask(H) : null;
      if (r) {
        const J = r(H, M);
        V = J === !0 ? V : J;
      }
      if (V) {
        const J = _t(M.target, "data-segment");
        J !== null ? u.current = { id: V.id, segmentIndex: J } : u.current = V.id, (!Array.isArray(w) || !w.includes(V.id)) && n && n.exec && n.exec("select-task", { id: V.id });
      }
      return V;
    },
    [n, r, w]
  ), O = R(
    (H) => {
      const M = H.action;
      M && ($r(k, M.id) && Lt(n, M.id, u.current, m), a && a(H));
    },
    [n, m, a, k]
  ), N = R(
    (H, M) => {
      const V = _.length ? _ : M ? [M] : [];
      let J = s ? V.every((le) => s(H, le)) : !0;
      if (J && (H.isHidden && (J = !V.some(
        (le) => H.isHidden(le, n.getState(), u.current)
      )), H.isDisabled)) {
        const le = V.some(
          (X) => H.isDisabled(X, n.getState(), u.current)
        );
        H.disabled = le;
      }
      return J;
    },
    [s, _, n]
  );
  Dt(c, () => ({
    show: (H, M) => {
      d.current && d.current.show && d.current.show(H, M);
    }
  }));
  const A = R((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), I = /* @__PURE__ */ B(Ce, { children: [
    /* @__PURE__ */ g(
      No,
      {
        filter: N,
        options: $,
        dataKey: "id",
        resolver: E,
        onClick: O,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ g("span", { onContextMenu: A, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!f && et.i18n?.Provider) {
    const H = et.i18n.Provider;
    return /* @__PURE__ */ g(H, { value: p, children: I });
  }
  return I;
}), dr = {};
function xs(t) {
  return typeof t < "u" ? dr[t] || t : dr.text;
}
function ot(t, e) {
  dr[t] = e;
}
const gd = {
  editor: {}
};
function jn(t) {
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
  Y(() => {
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
  const d = xe(et.i18n), u = C(() => d.getGroup("editor"), [d]), f = C(
    () => e.config[0].comp === "readonly" && e.config.every((p) => !Object.keys(n).includes(p.key)),
    [e, n]
  );
  return /* @__PURE__ */ B("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    a,
    f ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((p) => {
      if (!p.hidden) {
        const { key: m, onChange: h, ...w } = p;
        if (p.comp === "readonly" || p.comp === "section") {
          const x = xs(p.comp);
          return /* @__PURE__ */ g(
            x,
            {
              fieldKey: m,
              label: p.label,
              value: n[m],
              ...w,
              onClick: i
            },
            m
          );
        } else {
          const x = xs(p.comp);
          return /* @__PURE__ */ B("div", { children: [
            /* @__PURE__ */ g(
              Qt,
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
function md(t) {
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
function wd(t) {
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
function xd(t) {
  const e = t.map((i) => {
    const a = { ...i };
    return i.config && Object.assign(a, i.config), a.key = i.key || Pi(), a.setter = i.setter || wd(i.key), a.getter = i.getter || md(i.key), a;
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
      const u = l[d.key], f = a[d.key];
      !In(u, f) && (u !== void 0 || f) && c.push(d.key);
    }), c;
  }, o = (i, a, l) => {
    let c = 0;
    const d = {};
    return (a?.length ? a.map((u) => e.find((f) => f.key === u)) : e).forEach((u) => {
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
function yd({
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
  children: f,
  onChange: p,
  onSave: m,
  onAction: h,
  onValidation: w,
  hotkeys: x
}) {
  const y = xe(et.i18n).getGroup("editor"), [k, v] = Ae(t), [T, $] = K(null), _ = C(() => {
    const b = xd(e);
    T && b.config.forEach((G) => {
      G.comp === "section" && G.key === T && (G.sectionMode === "accordion" ? G.activeSection || (b.config.forEach((ce) => {
        ce.comp === "section" && ce.key !== G.key && (ce.activeSection = !1);
      }), G.activeSection = !0) : G.activeSection = !G.activeSection);
    });
    let z = /* @__PURE__ */ new Set(), ne = null;
    return b.config.forEach((G) => {
      G.sectionMode === "exclusive" && G.activeSection && (ne = G.key), G.activeSection && z.add(G.key);
    }), b.config.forEach((G) => {
      G.hidden = G.hidden || r && r !== G.batch || ne && G.key != ne && G.section !== ne || G.section && !z.has(G.section);
    }), i ? {
      ...b,
      config: b.config.map((G) => ({ ...G, comp: "readonly" })),
      diff: () => []
    } : b;
  }, [e, T, r, i]), [E, O] = K({}), [N, A] = K({}), I = k;
  Y(() => {
    k !== void 0 && (O(Sn(k)), A(Sn(k)), I.errors && (I.errors = J()));
  }, [k]);
  const [H, M] = K([]);
  Y(() => {
    k && M([]);
  }, [k]);
  function V(b) {
    return [...new Set(b)];
  }
  function J(b) {
    const z = _.validateValues(E, b, y);
    return In(z, I.errors) || w && w({ errors: z, values: E }), z;
  }
  function le(b, z) {
    if (s && !I.errors) {
      const ne = _.setValues(k, z ?? N, b);
      v(ne), m && m({ changes: b, values: ne });
    } else
      M(b);
  }
  function X({ value: b, key: z, input: ne }) {
    let G = { ...N || {}, [z]: b };
    const ce = {
      key: z,
      value: b,
      update: G
    };
    if (ne && (ce.input = ne), p && p(ce), !k) return;
    G = ce.update, A(G);
    const de = _.diff(k, G), De = _.setValues(
      { ...E || {} },
      G,
      V([...de, z])
    );
    if (O(De), de.length) {
      const ue = s ? [] : V([...de, ...Object.keys(I.errors ?? {}), z]);
      I.errors = J(ue), le(de, G);
    } else {
      const ue = Object.keys(I.errors ?? {});
      ue.length && (I.errors = J(ue)), M([]);
    }
  }
  function se() {
    if (H.length && (s || (I.errors = J()), !I.errors)) {
      m && m({
        changes: H,
        values: E
      });
      const b = _.setValues(k, N, H);
      v(b), M([]), v({ ...E });
    }
  }
  function he({ item: b }) {
    b.id === "save" ? se() : b.id === "toggle-section" && $(b.key), h && h({ item: b, values: E, changes: H });
  }
  return /* @__PURE__ */ g(
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
      editors: _,
      focus: o,
      hotkeys: x,
      errors: I.errors,
      onClick: he,
      onKeyDown: he,
      onChange: X,
      children: f
    }
  );
}
function vd(t) {
  const { editors: e, data: n, layout: r, errors: s, focus: o, onClick: i, onChange: a } = t, l = C(() => {
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
  return r === "columns" ? /* @__PURE__ */ B("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ g(
      jn,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ g(
      jn,
      {
        editors: l[1],
        data: n,
        focus: o,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) })
  ] }) : /* @__PURE__ */ g(
    jn,
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
function ys({
  items: t,
  values: e = null,
  top: n = !0,
  onClick: r,
  onChange: s
}) {
  const o = R(
    ({ item: i, value: a }) => {
      s && s({ key: i.key, value: a });
    },
    [s]
  );
  return t.length ? /* @__PURE__ */ g(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ g(
        lr,
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
const Bt = () => ({ comp: "spacer" }), Bn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Un = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), vs = () => ({
  comp: "icon",
  icon: "wxi-close",
  id: "close"
});
function qn(t) {
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
    children: f,
    onClick: p,
    onKeyDown: m,
    onChange: h,
    hotkeys: w
  } = t, x = xe(et.i18n), y = C(() => x.getGroup("editor"), [x]), k = C(
    () => o === !0 && i === !0,
    [o, i]
  ), v = C(() => {
    let N = o && o.items ? o.items.map((A) => ({ ...A })) : [];
    return k && (d ? N = [Bt(), vs()] : (u ? N = [Bt(), vs()] : l !== "modal" && (N = [Bt(), Bn(y), Un(y)]), a === "columns" && !N.length && (N = [Bt(), Un(y), Bn(y)]))), N;
  }, [o, k, d, u, l, a, y]), T = C(() => {
    let N = i && i.items ? i.items.map((A) => ({ ...A })) : [];
    return k && (d || (l === "modal" && !u && (N = [Bt(), Un(y), Bn(y)]), a === "columns" && v.length && (N = []))), N;
  }, [i, k, d, l, u, a, v, y]), $ = C(() => [...v, ...T], [v, T]), _ = F(null), E = F(null);
  E.current = (N, ...A) => {
    const I = $.findIndex((V) => A.includes(V.id));
    if (I === -1) return !1;
    const H = N.target, M = $[I];
    N.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || N.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (N.preventDefault(), m && m({ item: M }));
  };
  const O = C(() => w === !1 ? {} : {
    "ctrl+s": (N) => E.current(N, "save"),
    escape: (N) => E.current(N, "cancel", "close"),
    "ctrl+d": (N) => E.current(N, "delete"),
    ...w || {}
  }, [w]);
  return ni(O, _), /* @__PURE__ */ B("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: _, children: [
    /* @__PURE__ */ g(
      ys,
      {
        ...o && typeof o == "object" ? o : {},
        items: v,
        values: e,
        onClick: p,
        onChange: h
      }
    ),
    /* @__PURE__ */ B(
      "div",
      {
        className: `wx-85HDaNoA wx-content${a === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          f,
          /* @__PURE__ */ g(
            vd,
            {
              editors: n,
              layout: a,
              data: e,
              focus: r,
              errors: c,
              onClick: p,
              onChange: h
            }
          ),
          /* @__PURE__ */ g(
            ys,
            {
              ...i && typeof i == "object" ? i : {},
              items: T,
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
function kd(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ g(Hi, { children: /* @__PURE__ */ g(
    qn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ g(Li, { onCancel: o, children: /* @__PURE__ */ g(
    qn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ g(
    qn,
    {
      css: `wx-inline-form ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  );
}
function bd(t) {
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
  return /* @__PURE__ */ g(En, { words: gd, optional: !0, children: /* @__PURE__ */ g(
    yd,
    {
      view: kd,
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
      children: f
    }
  ) });
}
function Sd({ value: t, options: e, label: n }) {
  const r = xe(et.i18n).getGroup("editor"), s = C(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(Qt, { label: n, children: s }) : null;
}
function $d({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ B(
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
ot("text", sn);
ot("textarea", ci);
ot("checkbox", di);
ot("readonly", Sd);
ot("section", $d);
ur(Je);
function _d({ api: t, autoSave: e, onLinksChange: n }) {
  const s = xe(et.i18n).getGroup("gantt"), o = Z(t, "activeTask"), i = Z(t, "_activeTask"), a = Z(t, "_links"), l = Z(t, "schedule"), c = Z(t, "unscheduledTasks"), [d, u] = K();
  function f() {
    if (o) {
      const w = a.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), x = a.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: w },
        { title: s("Successors"), data: x }
      ];
    }
  }
  Y(() => {
    u(f());
  }, [o, a]);
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
  return /* @__PURE__ */ g(Ce, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ g(Qt, { label: w.title, position: "top", children: /* @__PURE__ */ g("table", { children: /* @__PURE__ */ g("tbody", { children: w.data.map((y) => /* @__PURE__ */ B("tr", { children: [
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ g(
        sn,
        {
          type: "number",
          placeholder: s("Lag"),
          value: y.link.lag,
          disabled: c && i?.unscheduled,
          onChange: (k) => {
            k.input || h(y.link.id, { lag: k.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ g(
        fi,
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
function Cd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, a = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), a && a({ value: d });
  }
  return /* @__PURE__ */ B("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ g(
      Ti,
      {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ g(Ai, { value: e, onChange: a, format: r }) : null
  ] });
}
ot("select", Ms);
ot("date", Cd);
ot("twostate", Ds);
ot("slider", Zn);
ot("counter", Mi);
ot("links", _d);
function Nd({
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
  const u = xe(et.i18n), f = C(() => u || Et({ ...Rn, ...tn }), [u]), p = C(() => f.getGroup("gantt"), [f]), m = f.getRaw(), h = C(() => {
    const W = m.gantt?.dateFormat || m.formats?.dateFormat;
    return ht(W, m.calendar);
  }, [m]), w = C(() => {
    if (a === !0 && !s) {
      const W = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: p("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: W } : {
        items: [
          ...W,
          {
            comp: "button",
            type: "primary",
            text: p("Save"),
            id: "save"
          }
        ]
      };
    }
    return a;
  }, [a, s, l, p]), [x, y] = K(!1), k = C(
    () => x ? "wx-full-screen" : "",
    [x]
  ), v = R((W) => {
    y(W);
  }, []);
  Y(() => {
    const W = Ao(v);
    return W.observe(), () => {
      W.disconnect();
    };
  }, [v]);
  const T = Z(t, "_activeTask"), $ = Z(t, "activeTask"), _ = Z(t, "unscheduledTasks"), E = Z(t, "links"), O = Z(t, "splitTasks"), N = C(
    () => O && $?.segmentIndex,
    [O, $]
  ), A = C(
    () => N || N === 0,
    [N]
  ), I = C(
    () => go(),
    [_]
  ), H = Z(t, "undo"), [M, V] = K({}), [J, le] = K(null), [X, se] = K(), [he, b] = K(null), z = Z(t, "taskTypes"), ne = C(() => {
    if (!T) return null;
    let W;
    if (A && T.segments ? W = { ...T.segments[N] } : W = { ...T }, s) {
      let ge = { parent: W.parent };
      return I.forEach(({ key: Se, comp: re }) => {
        if (re !== "links") {
          const Ee = W[Se];
          re === "date" && Ee instanceof Date ? ge[Se] = h(Ee) : re === "slider" && Se === "progress" ? ge[Se] = `${Ee}%` : ge[Se] = Ee;
        }
      }), ge;
    }
    return W || null;
  }, [T, A, N, s, I, h]);
  Y(() => {
    se(ne);
  }, [ne]), Y(() => {
    V({}), b(null), le(null);
  }, [$]);
  function G(W, ge) {
    return W.map((Se) => {
      const re = { ...Se };
      if (Se.config && (re.config = { ...re.config }), re.comp === "links" && t && (re.api = t, re.autoSave = l, re.onLinksChange = De), re.comp === "select" && re.key === "type") {
        const Ee = re.options ?? (z || []);
        re.options = Ee.map((Ue) => ({
          ...Ue,
          label: p(Ue.label)
        }));
      }
      return re.comp === "slider" && re.key === "progress" && (re.labelTemplate = (Ee) => `${p(re.label)} ${Ee}%`), re.label && (re.label = p(re.label)), re.config?.placeholder && (re.config.placeholder = p(re.config.placeholder)), ge && (re.isDisabled && re.isDisabled(ge, t.getState()) ? re.disabled = !0 : delete re.disabled), re;
    });
  }
  const ce = C(() => {
    let W = e.length ? e : I;
    return W = G(W, X), X ? W.filter(
      (ge) => !ge.isHidden || !ge.isHidden(X, t.getState())
    ) : W;
  }, [e, I, X, z, p, t, l]), de = C(
    () => ce.map((W) => W.key),
    [ce]
  );
  function De({ id: W, action: ge, data: Se }) {
    V((re) => ({
      ...re,
      [W]: { action: ge, data: Se }
    }));
  }
  const ue = R(() => {
    for (let W in M)
      if (E.byId(W)) {
        const { action: ge, data: Se } = M[W];
        t.exec(ge, Se);
      }
  }, [t, M, E]), q = R(() => {
    const W = $?.id || $;
    if (A) {
      if (T?.segments) {
        const ge = T.segments.filter(
          (Se, re) => re !== N
        );
        t.exec("update-task", {
          id: W,
          task: { segments: ge }
        });
      }
    } else
      t.exec("delete-task", { id: W });
  }, [t, $, A, T, N]), te = R(() => {
    t.exec("show-editor", { id: null });
  }, [t]), pe = R(
    (W) => {
      const { item: ge, changes: Se } = W;
      ge.id === "delete" && q(), ge.id === "save" && (Se.length ? te() : ue()), ge.comp && te();
    },
    [t, $, l, ue, q, te]
  ), He = R(
    (W, ge, Se) => (_ && W.type === "summary" && (W.unscheduled = !1), fo(W, t.getState(), ge), Se || le(!1), W),
    [_, t]
  ), Le = R(
    (W) => {
      W = {
        ...W,
        unscheduled: _ && W.unscheduled && W.type !== "summary"
      }, delete W.links, delete W.data, (de.indexOf("duration") === -1 || W.segments && !W.duration) && delete W.duration;
      const ge = {
        id: $?.id || $,
        task: W,
        ...A && { segmentIndex: N }
      };
      l && J && (ge.inProgress = J), t.exec("update-task", ge), l || ue();
    },
    [
      t,
      $,
      _,
      l,
      ue,
      de,
      A,
      N,
      J
    ]
  ), Ne = R(
    (W) => {
      let { update: ge, key: Se, input: re } = W;
      if (re && le(!0), W.update = He({ ...ge }, Se, re), !l) se(W.update);
      else if (!he && !re) {
        const Ee = ce.find((Ye) => Ye.key === Se), Ue = ge[Se];
        (!Ee.validation || Ee.validation(Ue)) && (!Ee.required || Ue) && Le(W.update);
      }
    },
    [l, He, he, ce, Le]
  ), Oe = R(
    (W) => {
      l || Le(W.values);
    },
    [l, Le]
  ), ze = R((W) => {
    b(W.errors);
  }, []), ve = C(
    () => H ? {
      "ctrl+z": (W) => {
        W.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (W) => {
        W.preventDefault(), t.exec("redo");
      }
    } : {},
    [H, t]
  );
  return ne ? /* @__PURE__ */ g(En, { children: /* @__PURE__ */ g(
    bd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${k} ${n}`,
      items: ce,
      values: ne,
      topBar: w,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: pe,
      onSave: Oe,
      onValidation: ze,
      onChange: Ne,
      hotkeys: d && { ...ve, ...d }
    }
  ) }) : null;
}
const Td = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = K(null);
  return Y(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ g(Kc, { api: r, columns: e, children: t });
};
function Md(t) {
  const { api: e, content: n, children: r } = t, s = F(null), o = F(null), [i, a] = K({}), [l, c] = K(null), [d, u] = K({});
  function f(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const T = v.getAttribute("data-tooltip-id"), $ = v.getAttribute("data-tooltip-at"), _ = v.getAttribute("data-tooltip");
        if (T || _) return { id: T, tooltip: _, target: v, at: $ };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  Y(() => {
    const v = o.current;
    if (v && d && (d.text || n)) {
      const T = v.getBoundingClientRect();
      let $ = !1, _ = d.left, E = d.top;
      T.right >= i.right && (_ = i.width - T.width - 5, $ = !0), T.bottom >= i.bottom && (E = d.top - (T.bottom - i.bottom + 2), $ = !0), $ && u((O) => O && { ...O, left: _, top: E });
    }
  }, [d, i, n]);
  const p = F(null), m = 300, h = (v) => {
    clearTimeout(p.current), p.current = setTimeout(() => {
      v();
    }, m);
  };
  function w(v) {
    let { id: T, tooltip: $, target: _, at: E } = f(v.target);
    if (u(null), c(null), !$)
      if (T)
        $ = y(T);
      else {
        clearTimeout(p.current);
        return;
      }
    const O = v.clientX;
    h(() => {
      T && c(x(k(T)));
      const N = _.getBoundingClientRect(), A = s.current, I = A ? A.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, M;
      E === "left" ? (H = N.top + 5 - I.top, M = N.right + 5 - I.left) : (H = N.top + N.height - I.top, M = O - I.left), a(I), u({ top: H, left: M, text: $ });
    });
  }
  function x(v) {
    return e?.getTask(k(v)) || null;
  }
  function y(v) {
    return x(v)?.text || "";
  }
  function k(v) {
    const T = parseInt(v);
    return isNaN(T) ? v : T;
  }
  return /* @__PURE__ */ B(
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
function Dd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Vr, { fonts: t, children: e() }) : /* @__PURE__ */ g(Vr, { fonts: t });
}
function Ed({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Gr, { fonts: t, children: e }) : /* @__PURE__ */ g(Gr, { fonts: t });
}
function Rd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Kr, { fonts: t, children: e }) : /* @__PURE__ */ g(Kr, { fonts: t });
}
const Wd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: pd,
  Editor: Nd,
  Gantt: fd,
  HeaderMenu: Td,
  Material: Dd,
  Toolbar: hd,
  Tooltip: Md,
  Willow: Ed,
  WillowDark: Rd,
  defaultColumns: co,
  defaultEditorItems: mo,
  defaultMenuOptions: ho,
  defaultTaskTypes: wo,
  defaultToolbarButtons: po,
  getEditorItems: go,
  getMenuOptions: or,
  getToolbarButtons: ir,
  registerEditorItem: ot,
  registerScaleUnit: za
}, Symbol.toStringTag, { value: "Module" }));
export {
  Wd as default
};
