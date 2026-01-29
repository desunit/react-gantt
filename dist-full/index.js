import { jsx as g, jsxs as U, Fragment as Ie } from "react/jsx-runtime";
import Yo, { useState as B, useEffect as F, useRef as z, createContext as Ht, useContext as $e, useMemo as C, useCallback as E, forwardRef as $t, useImperativeHandle as _t, useId as Vo, Fragment as Cs } from "react";
import { createPortal as Go, flushSync as Bo } from "react-dom";
function Ue(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function Zn(t, e = "data-id") {
  const n = Ue(t, e);
  return n ? n.getAttribute(e) : null;
}
function vt(t, e = "data-id") {
  const n = Ue(t, e);
  return n ? Lt(n.getAttribute(e)) : null;
}
function Lt(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function jo() {
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
var Ze = jo();
function hr(t) {
  Object.assign(Ze, t);
}
function Rr(t, e, n) {
  function r(s) {
    const o = Ue(s);
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
function Ns(t, e) {
  Rr(t, e, "click"), e.dblclick && Rr(t, e.dblclick, "dblclick");
}
function Ko(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Ts = /* @__PURE__ */ new Date(), Sn = !1, hn = [], kt = [], Ir = (t) => {
  if (Sn) {
    Sn = !1;
    return;
  }
  for (let e = kt.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = kt[e];
    if (!(r > Ts) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Uo = (t) => {
  Ts = /* @__PURE__ */ new Date(), Sn = !0;
  for (let e = kt.length - 1; e >= 0; e--) {
    const { node: n } = kt[e];
    if (!n.contains(t.target) && n !== t.target) {
      Sn = !1;
      break;
    }
  }
};
function en(t, e) {
  hn.length || (hn = [
    Ze.addGlobalEvent("click", Ir, t),
    Ze.addGlobalEvent("contextmenu", Ir, t),
    Ze.addGlobalEvent("mousedown", Uo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return kt.push(n), {
    destroy() {
      Ko(kt, n), kt.length || (hn.forEach((r) => r()), hn = []);
    }
  };
}
var pn = (t) => t.indexOf("bottom") !== -1, gn = (t) => t.indexOf("left") !== -1, mn = (t) => t.indexOf("right") !== -1, Wn = (t) => t.indexOf("top") !== -1, Ar = (t) => t.indexOf("fit") !== -1, wn = (t) => t.indexOf("overlap") !== -1, qo = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Xo = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function Qo(t, e) {
  let n = 0;
  const r = Ze.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Be, Xe, Bt, Ke;
function Zo(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Be = r, Xe = s, Bt = "auto";
  let o = 0, a = 0;
  const i = Jo(t), l = wn(n) ? Ze.getTopNode(t) : i;
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
    const k = Qo(e, i);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (Ke = e.getBoundingClientRect(), Ar(n) && (Bt = Ke.width + "px"), n !== "point")
      if (qo(n))
        Ar(n) ? Be = 0 : (Be = u.width / 2, a = 1), Xe = (u.height - d.height) / 2;
      else {
        const k = wn(n) ? 0 : 1;
        Be = mn(n) ? Ke.right + k : Ke.left - k, Xe = pn(n) ? Ke.bottom + 1 : Ke.top;
        const v = Xo(n);
        v && (mn(n) || gn(n) ? v === "center" ? Xe -= (d.height - Ke.height) / 2 : v === "end" && (Xe -= d.height - Ke.height) : (pn(n) || Wn(n)) && (v === "center" ? Be -= (d.width - Ke.width) / 2 : v === "end" && (Be -= d.width - Ke.width), wn(n) || (Be += 1)));
      }
  } else Ke = { left: r, right: r, top: s, bottom: s };
  const m = (gn(n) || mn(n)) && (pn(n) || Wn(n));
  gn(n) && (a = 2);
  const h = Be - d.width - u.left;
  e && gn(n) && !m && h < 0 && (Be = Ke.right, a = 0);
  const w = Be + d.width * (1 - a / 2) - u.right;
  if (w > 0)
    if (!mn(n))
      Be = u.right - p.right - d.width;
    else {
      const k = Ke.left - u.x - d.width;
      e && !wn(n) && !m && k >= 0 ? Be = Ke.left - d.width : Be -= w + p.right;
    }
  a && (Be = Math.round(Be - d.width * a / 2));
  const x = h < 0 || w > 0 || !m;
  Wn(n) && (Xe = Ke.top - d.height, e && Xe < u.y && x && (Xe = Ke.bottom));
  const y = Xe + d.height - u.bottom;
  return y > 0 && (e && pn(n) && x ? Xe -= d.height + Ke.height + 1 : Xe -= y + p.bottom), Be -= c.left + p.left, Xe -= c.top + p.top, Be = Math.max(Be, 0) + l.scrollLeft, Xe = Math.max(Xe, 0) + l.scrollTop, Bt = Bt || "auto", { x: Be, y: Xe, z: o, width: Bt };
}
function Jo(t) {
  const e = Ze.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Hr = (/* @__PURE__ */ new Date()).valueOf();
function pr() {
  return Hr += 1, Hr;
}
var ei = class {
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
}, Rt = [], Lr = {
  subscribe: (t) => {
    ti();
    const e = new ei();
    return Rt.push(e), t(e), () => {
      const n = Rt.findIndex((r) => r === e);
      n >= 0 && Rt.splice(n, 1);
    };
  }
}, Pr = !1;
function ti() {
  Pr || (Pr = !0, document.addEventListener("keydown", (t) => {
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
function ni(t) {
  const e = Qe(t);
  return e.length == 2 ? "0" + e : e;
}
function Ds(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function zr(t, e = 1) {
  let n = t.getDay();
  n === 0 && (n = 7), n = (n - e + 7) % 7;
  const r = new Date(t.valueOf());
  r.setDate(t.getDate() + (3 - n));
  const s = r.getFullYear(), o = Math.floor(
    (r.getTime() - new Date(s, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(o / 7);
}
var Wr = ["", ""];
function ri(t, e, n) {
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
      return ((e.getHours() > 11 ? n.pm : n.am) || Wr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Wr)[1];
    case "%s":
      return Qe(e.getSeconds());
    case "%S":
      return ni(e.getMilliseconds());
    case "%W":
      return Qe(zr(e));
    case "%w":
      return Qe(zr(e, n.weekStart ?? 1));
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
var si = /%[a-zA-Z]/g;
function lt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      si,
      (r) => ri(r, n, e)
    )) : "";
  };
}
function Or(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function Jn(t, e) {
  for (const n in e) {
    const r = e[n];
    Or(t[n]) && Or(r) ? t[n] = Jn(
      { ...t[n] },
      e[n]
    ) : t[n] = e[n];
  }
  return t;
}
function Ct(t) {
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
      return n ? r = Jn({ ...e }, t) : r = Jn({ ...t }, e), Ct(r);
    }
  };
}
function Ve(t) {
  const [e, n] = B(t), r = z(t);
  return F(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function oi(t, e, n) {
  const [r, s] = B(() => e);
  return t || console.warn(`Writable ${n} is not defined`), F(() => t ? t.subscribe((a) => {
    s(() => a);
  }) : void 0, [t]), r;
}
function ee(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return oi(r[e], n[e], e);
}
function at(t, e) {
  const [n, r] = B(() => null);
  return F(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((i) => r(() => i)) : void 0;
  }, [t, e]), n;
}
function ii(t, e) {
  const n = z(e);
  n.current = e;
  const [r, s] = B(1);
  return F(() => t.subscribe((a) => {
    n.current = a, s((i) => i + 1);
  }), [t]), [n.current, r];
}
function qt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ii(r[e], n[e]);
}
function ai(t, e) {
  F(() => {
    const n = e.current;
    if (n)
      return Lr.subscribe((r) => {
        r.configure(t, n);
      });
  }, [Lr, e]);
}
function gr(t, e) {
  return typeof t == "function" ? typeof e == "object" ? t(e) : t() : t;
}
function Ms(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (a, i) => i.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Es(t) {
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
function Fr(t, e, n) {
  function r(s) {
    const o = Ue(s);
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
function li(t, e) {
  const n = [Fr(t, e, "click")];
  return e.dblclick && n.push(Fr(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const ci = "en-US", di = {
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
}, ui = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, fi = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, tn = {
  core: ui,
  calendar: di,
  formats: fi,
  lang: ci
}, nn = Ht("willow"), hi = Ht({}), nt = Ht(null), mr = Ht(null), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: mr,
  helpers: hi,
  i18n: nt,
  theme: nn
}, Symbol.toStringTag, { value: "Module" }));
function Pt(t) {
  const e = $e(mr);
  return t || e;
}
function pi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: a = !1,
  onChange: i
}) {
  const l = Pt(e), [c, d] = Ve(t), u = E(
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
  ), p = z(null);
  return F(() => {
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
function ct({
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
function gi({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const a = Vo(), i = Pt(t) || a, [l, c] = Ve(r);
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
function zt({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const a = z(null), [i, l] = Ve(t), [c, d] = Ve(e);
  return F(() => {
    if (n) {
      const u = a.current;
      if (u) {
        const f = u.getBoundingClientRect(), p = Ze.getTopNode(u).getBoundingClientRect();
        f.right >= p.right && d("end"), f.bottom >= p.bottom && l("top");
      }
    }
  }, [n]), F(() => {
    if (a.current) {
      const u = (f) => {
        r && r(f);
      };
      return en(a.current, u).destroy;
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
function rn() {
  return Ct(tn);
}
function mi() {
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
    const u = vt(d), f = r.findIndex((p) => p.id == u);
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
function En({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = z(), o = z(mi()), [a, i] = B(null), l = z(a), c = ($e(nt) || rn()).getGroup("core"), d = (f) => {
    f && f.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  F(() => {
    o.current.init(
      s.current,
      t,
      (f) => {
        i(f), l.current = f;
      },
      d
    );
  }, [t, s.current]), F(() => {
    r && r(o.current);
  }, []);
  const u = E(() => {
    o.current.navigate(null);
  }, [o]);
  return a === null ? null : /* @__PURE__ */ g(zt, { onCancel: u, children: /* @__PURE__ */ g(
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
          children: e ? gr(e, { option: f }) : f.label
        },
        f.id
      )) : /* @__PURE__ */ g("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function wi({
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
  const f = Pt(e), p = z(null), m = z(null), [h, w] = Ve(t), [x, y] = B(!1), [k, v] = B(""), D = z(null), S = z(!1), N = C(() => {
    if (x) return k;
    if (h || h === 0) {
      const K = (r || n).find((ce) => ce.id === h);
      if (K) return K[s];
    }
    return "";
  }, [x, k, h, r, n, s]), T = C(() => !N || !x ? n : n.filter(
    (K) => K[s].toLowerCase().includes(N.toLowerCase())
  ), [N, x, n, s]), V = E(
    () => T.findIndex((K) => K.id === h),
    [T, h]
  ), _ = E((K) => {
    p.current = K.navigate, m.current = K.keydown;
  }, []), A = E(
    (K, ce) => {
      if (K || K === 0) {
        let ve = n.find((H) => H.id === K);
        if (y(!1), ce && p.current(null), ve && h !== ve.id) {
          const H = ve.id;
          w(H), u && u({ value: H });
        }
      }
      !S.current && ce && D.current.focus();
    },
    [n, h, u]
  ), L = E(
    ({ id: K }) => {
      A(K, !0);
    },
    [A]
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
      let ce = n.find((H) => H[s] === K);
      ce || (ce = n.find(
        (H) => H[s].toLowerCase().includes(K.toLowerCase())
      ));
      const ve = ce ? ce.id : h || n[0].id;
      A(ve, !1);
    },
    [n, s, c, h, A, M]
  ), W = E(() => {
    v(D.current.value), y(!0), T.length ? p.current(0) : p.current(null);
  }, [T.length, p]), oe = E(() => {
    S.current = !0;
  }, []), de = E(() => {
    S.current = !1, setTimeout(() => {
      S.current || R(N);
    }, 200);
  }, [R, N]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => p.current(V()),
      onKeyDown: (K) => m.current(K, V()),
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
            onBlur: de,
            onInput: W
          }
        ),
        c && !i && h ? /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: M }) : /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !i && /* @__PURE__ */ g(En, { items: T, onReady: _, onSelect: L, children: ({ option: K }) => /* @__PURE__ */ g(Ie, { children: d ? d({ option: K }) : K[s] }) })
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
  const h = Pt(e), [w, x] = Ve(t), y = z(null), k = C(
    () => f && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [f, u]
  ), v = C(
    () => f && u.indexOf("wx-icon-left") !== -1,
    [f, u]
  );
  F(() => {
    const V = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(V);
  }, [r, s]);
  const D = E(
    (V) => {
      const _ = V.target.value;
      x(_), m && m({ value: _, input: !0 });
    },
    [m]
  ), S = E(
    (V) => m && m({ value: V.target.value }),
    [m]
  );
  function N(V) {
    V.stopPropagation(), x(""), m && m({ value: "" });
  }
  let T = o;
  return o !== "password" && o !== "number" && (T = "text"), F(() => {
    const V = S, _ = y.current;
    return _.addEventListener("change", V), () => {
      _ && _.removeEventListener("change", V);
    };
  }, [S]), /* @__PURE__ */ U(
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
        p && !i && w ? /* @__PURE__ */ U(Ie, { children: [
          /* @__PURE__ */ g("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: N }),
          v && /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` })
        ] }) : f ? /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` }) : null
      ]
    }
  );
}
function xi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = $e(nt).getRaw(), a = t.getFullYear(), i = C(() => {
    switch (e) {
      case "month":
        return lt(o.monthYearFormat, s)(t);
      case "year":
        return lt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Ds(a), u = lt(o.yearFormat, s);
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
function wr({ onClick: t, children: e }) {
  return /* @__PURE__ */ g("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function yi({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const a = ($e(nt) || rn()).getRaw().calendar, i = (a.weekStart || 7) % 7, l = a.dayShort.slice(i).concat(a.dayShort.slice(0, i)), c = (v, D, S) => new Date(
    v.getFullYear(),
    v.getMonth() + (D || 0),
    v.getDate() + (S || 0)
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
  const m = z(0);
  function h(v, D) {
    D.timeStamp !== m.current && (m.current = D.timeStamp, D.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const w = C(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = C(() => {
    const v = f(), D = p(), S = e.getMonth();
    let N = [];
    for (let T = v; T <= D; T.setDate(T.getDate() + 1)) {
      const V = {
        day: T.getDate(),
        in: T.getMonth() === S,
        date: T.valueOf()
      };
      let _ = "";
      if (_ += V.in ? "" : " wx-inactive", _ += w.indexOf(V.date) > -1 ? " wx-selected" : "", d) {
        const A = V.date == w[0], L = V.date == w[1];
        A && !L ? _ += " wx-left" : L && !A && (_ += " wx-right"), V.date > w[0] && V.date < w[1] && (_ += " wx-inrange");
      }
      if (_ += u(T) ? " wx-weekend" : "", r) {
        const A = r(T);
        A && (_ += " " + A);
      }
      N.push({ ...V, css: _ });
    }
    return N;
  }, [e, w, d, r]), y = z(null);
  let k = z({});
  return k.current.click = h, F(() => {
    Ns(y.current, k.current);
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
function vi({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [a, i] = Ve(t || /* @__PURE__ */ new Date()), [l, c] = Ve(e || /* @__PURE__ */ new Date()), d = $e(nt).getRaw().calendar, u = d.monthShort || [], f = C(() => l.getMonth(), [l]), p = E(
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
    const w = new Date(Rs(a, n) || l);
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
  return /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-months", onClick: h, children: u.map((w, x) => /* @__PURE__ */ g(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (f === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ g(wr, { onClick: m, children: d.done }) })
  ] });
}
const On = "wx-1XEF33", ki = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const a = $e(nt).getRaw().calendar, [i, l] = Ve(e), [c, d] = Ve(t), u = C(() => i.getFullYear(), [i]), f = C(() => {
    const { start: x, end: y } = Ds(u), k = [];
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
    const x = new Date(Rs(c, o) || i);
    x.setFullYear(i.getFullYear()), r && r(x);
  }
  const w = z(null);
  return F(() => {
    w.current && Ns(w.current, p);
  }, []), /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ g("div", { className: On + " wx-years", ref: w, children: f.map((x, y) => /* @__PURE__ */ g(
      "div",
      {
        className: On + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ g("div", { className: On + " wx-buttons", children: /* @__PURE__ */ g(wr, { onClick: h, children: a.done }) })
  ] });
}, Yr = {
  month: {
    component: yi,
    next: Si,
    prev: bi
  },
  year: {
    component: vi,
    next: _i,
    prev: $i
  },
  duodecade: {
    component: ki,
    next: Ni,
    prev: Ci
  }
};
function bi(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Si(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function $i(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function _i(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Ci(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function Ni(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function Rs(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Ti = ["clear", "today"];
function Di(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Mi({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: a,
  onChange: i
}) {
  const l = $e(nt).getGroup("calendar"), [c, d] = B("month"), u = Array.isArray(o) ? o : o ? Ti : [], f = (x, y) => {
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
      const v = Yr[c];
      n(y > 0 ? v.next(e) : v.prev(e));
    } else k && n(k);
    a && a();
  }, h = (x) => {
    d("month"), i && i({ select: !0, value: x });
  }, w = C(() => Yr[c].component, [c]);
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ U("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ g(xi, { date: e, part: r, type: c, onShift: m }),
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
            wr,
            {
              onClick: (y) => f(y, Di(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function Rn(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = $e(nt);
  const o = C(() => {
    let a = s;
    return (!a || !a.extend) && (a = Ct(tn)), e !== null && (a = a.extend(e, n)), a;
  }, [e, n, s]);
  return /* @__PURE__ */ g(nt.Provider, { value: o, children: r });
}
function Vr(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const Ei = ["clear", "today"];
function Is({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Ei,
  onChange: s
}) {
  const [o, a] = Ve(t), [i, l] = Ve(e);
  F(() => {
    Vr(i, o, l, !1);
  }, [o, i]);
  const c = E(
    (u) => {
      const f = u.value;
      f ? (a(new Date(f)), Vr(i, new Date(f), l, !0)) : a(null), s && s({ value: f ? new Date(f) : null });
    },
    [s, i]
  ), d = E(
    (u) => {
      l(u);
    },
    [l]
  );
  return i ? /* @__PURE__ */ g(Rn, { children: /* @__PURE__ */ g(
    Mi,
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
const Ri = ["clear", "today"];
function Ii({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: a = "",
  format: i = "",
  buttons: l = Ri,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: f = !1,
  onChange: p
}) {
  const { calendar: m, formats: h } = ($e(nt) || rn()).getRaw(), w = i || h?.dateFormat;
  let x = typeof w == "function" ? w : lt(w, m);
  const [y, k] = B(t), [v, D] = B(!1);
  F(() => {
    k(t);
  }, [t]);
  function S() {
    D(!1);
  }
  function N(_) {
    const A = _ === y || _ && y && _.valueOf() === y.valueOf() || !_ && !y;
    k(_), A || p && p({ value: _ }), setTimeout(S, 1);
  }
  const T = C(
    () => y ? x(y) : "",
    [y, x]
  );
  function V({ value: _, input: A }) {
    if (!u && !f || A) return;
    let L = typeof u == "function" ? u(_) : _ ? new Date(_) : null;
    L = isNaN(L) ? y || null : L || null, N(L);
  }
  return F(() => {
    const _ = S;
    return window.addEventListener("scroll", _), () => window.removeEventListener("scroll", _);
  }, []), /* @__PURE__ */ U("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => D(!0), children: [
    /* @__PURE__ */ g(
      sn,
      {
        css: c,
        title: d,
        value: T,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: a,
        onInput: S,
        onChange: V,
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
      zt,
      {
        onCancel: S,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ g(
          Is,
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
function As({
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
  const u = z(null), f = z(null);
  let [p, m] = Ve(t);
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
        !s && /* @__PURE__ */ g(En, { items: e, onReady: h, onSelect: x, children: ({ option: v }) => c ? c(v) : v[i] })
      ]
    }
  );
}
function er({
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
  const d = Pt(t), [u, f] = Ve(o), p = z({ value: u, input: u }), m = C(
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
  F(() => {
    f(o);
  }, [o]);
  const y = z(null);
  return F(() => {
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
const Ai = ({
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
  const c = Pt(t), [d, u] = Ve(e), f = E(() => {
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
function Hi({ notice: t = {} }) {
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
function Li({ data: t = [] }) {
  return /* @__PURE__ */ g("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ g(Hi, { notice: e }, e.id)) });
}
function Pi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: a
}) {
  const i = ($e(nt) || rn()).getGroup("core"), l = z(null);
  F(() => {
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
          ct,
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
function zi({ children: t }, e) {
  const [n, r] = B(null), [s, o] = B([]);
  return _t(
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
        a = { ...a }, a.id = a.id || pr(), a.remove = () => o((i) => i.filter((l) => l.id !== a.id)), a.expire != -1 && setTimeout(a.remove, a.expire || 5100), o((i) => [...i, a]);
      }
    }),
    []
  ), /* @__PURE__ */ U(Ie, { children: [
    t,
    n && /* @__PURE__ */ g(
      Pi,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ g(Li, { data: s })
  ] });
}
$t(zi);
function Qt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: a
}) {
  const i = C(() => pr(), []);
  return /* @__PURE__ */ g(mr.Provider, { value: i, children: /* @__PURE__ */ U(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ g("label", { className: "wx-2oVUvC wx-label", htmlFor: i, children: t }),
        /* @__PURE__ */ g("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: gr(a, { id: i }) })
      ]
    }
  ) });
}
const Hs = ({
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
  const [p, m] = Ve(t), h = C(() => (p ? "pressed" : "") + (e ? " " + e : ""), [p, e]), w = E(
    (x) => {
      let y = !p;
      o && o(x), x.defaultPrevented || (m(y), f && f({ value: y }));
    },
    [p, o, f]
  );
  return p && u ? /* @__PURE__ */ g(
    ct,
    {
      title: a,
      text: p && c || l,
      css: i,
      type: h,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: gr(u, { value: p })
    }
  ) : d ? /* @__PURE__ */ g(
    ct,
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
    ct,
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
}, Gr = new Date(0, 0, 0, 0, 0);
function Wi({
  value: t = Gr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: a = "",
  onChange: i
}) {
  let [l, c] = Ve(t);
  const { calendar: d, formats: u } = ($e(nt) || rn()).getRaw(), f = d.clockFormat == 12, p = 23, m = 59, h = C(() => {
    const H = a || u?.timeFormat;
    return typeof H == "function" ? H : lt(H, d);
  }, [a, u, d]), w = C(() => h(new Date(0, 0, 0, 1)).indexOf("01") != -1, [h]), x = (H, ne) => (H < 10 && ne ? `0${H}` : `${H}`).slice(-2), y = (H) => x(H, !0), k = (H) => `${H}`.replace(/[^\d]/g, "") || 0, v = (H) => f && (H = H % 12, H === 0) ? "12" : x(H, w), D = E((H, ne) => (H = k(H), Math.min(H, ne)), []), [S, N] = B(null), T = l || Gr, V = D(T.getHours(), p), _ = D(T.getMinutes(), m), A = V > 12, L = v(V), M = y(_), R = C(
    () => h(new Date(0, 0, 0, V, _)),
    [V, _, h]
  ), W = E(() => {
    N(!0);
  }, []), oe = E(() => {
    const H = new Date(T);
    H.setHours(H.getHours() + (A ? -12 : 12)), c(H), i && i({ value: H });
  }, [T, A, i]), de = E(
    ({ value: H }) => {
      if (T.getHours() === H) return;
      const ne = new Date(T);
      ne.setHours(H), c(ne), i && i({ value: ne });
    },
    [T, i]
  ), K = E(
    ({ value: H }) => {
      if (T.getMinutes() === H) return;
      const ne = new Date(T);
      ne.setMinutes(H), c(ne), i && i({ value: ne });
    },
    [T, i]
  ), ce = E(
    (H) => (H = D(H, p), f && (H = H * 1, H === 12 && (H = 0), A && (H += 12)), H),
    [D, f, A]
  ), ve = E(() => {
    N(null);
  }, []);
  return /* @__PURE__ */ U(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : W,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ g(
          sn,
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
        S && !s && /* @__PURE__ */ g(zt, { onCancel: ve, width: "unset", children: /* @__PURE__ */ U("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ U("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: L,
                onChange: (H) => {
                  const ne = ce(H.target.value);
                  de({ value: ne });
                }
              }
            ),
            /* @__PURE__ */ g("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: M,
                onChange: (H) => {
                  const ne = D(H.target.value, m);
                  K({ value: ne });
                }
              }
            ),
            f && /* @__PURE__ */ g(
              Hs,
              {
                value: A,
                onClick: oe,
                active: () => /* @__PURE__ */ g("span", { children: "pm" }),
                children: /* @__PURE__ */ g("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ g(Qt, { width: "unset", children: /* @__PURE__ */ g(
            er,
            {
              label: d.hours,
              value: V,
              onChange: de,
              max: p
            }
          ) }),
          /* @__PURE__ */ g(Qt, { width: "unset", children: /* @__PURE__ */ g(
            er,
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
function Oi({ children: t }) {
  return /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ g("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Fi({ position: t = "right", children: e, onCancel: n }) {
  const r = z(null);
  return F(() => en(r.current, n).destroy, []), /* @__PURE__ */ g("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Ls({ theme: t = "", target: e, children: n }) {
  const r = z(null), s = z(null), [o, a] = B(null);
  r.current || (r.current = document.createElement("div"));
  const i = $e(nn);
  return F(() => {
    a(
      e || Yi(s.current) || Ze.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ g("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Go(
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
function Yi(t) {
  const e = Ze.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Vi() {
  return /* @__PURE__ */ g(Ie, {});
}
function Br(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "material", children: /* @__PURE__ */ U(Ie, { children: [
    n && /* @__PURE__ */ g("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ U(Ie, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Vi, {}),
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
function Ps() {
  return /* @__PURE__ */ g(Ie, {});
}
function jr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "willow", children: /* @__PURE__ */ U(Ie, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ U(Ie, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Ps, {}),
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
  return /* @__PURE__ */ g(nn.Provider, { value: "willow-dark", children: /* @__PURE__ */ U(Ie, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ U(Ie, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Ps, {}),
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
hr(Ze);
const In = {
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
var Gi = (/* @__PURE__ */ new Date()).valueOf(), Bi = () => Gi++;
function ji(t, e) {
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
      return ji(t, e);
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
var zs = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, Ws = (/* @__PURE__ */ new Date()).valueOf(), Ki = () => Ws++;
function xr() {
  return "temp://" + Ws++;
}
var Ur = class {
  constructor(e) {
    this._data = e, this._pool = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      this._pool.set(r.id, r);
    }
  }
  add(e) {
    e = { id: Ki(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, Ui = class {
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
    t.$level = n.$level + 1, this._pool.set(t.id, t), n.data ? e === -1 ? n.data = [...n.data, t] : qr(n, e, t) : n.data = [t];
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
    qi(i, c);
    const d = s ? l.data.length : xn(l, o.id) + (e === "after" ? 1 : 0);
    if (qr(l, d, r), i.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== a && (r.$level = a, this.setLevel(r, a + 1, !0)), this.update(r.id, r), this._clearBranch(i);
  }
  _clearBranch(t) {
    t.data && !t.data.length && (t.open && delete t.open, this.update(t.id, { data: null }));
  }
  toArray() {
    const t = [], e = this._pool.get(0).data;
    return e && Os(e, t), t;
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
function Os(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Os(n.data, e);
  });
}
function qi(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function qr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function xn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Fs = 2, Xi = class {
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
      i ? (i.__parse(c, d, s, o) && (n[a] = c), o & Fs ? s[d] = i.__trigger : i.__trigger()) : (c && c.__reactive ? e[a] = this._wrapNested(c, c, d, s) : e[a] = this._wrapWritable(c), n[a] = c), s[d] = s[d] || null;
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
}, Qi = class {
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
      s.length = Math.max(...s.in.map((o) => Ys(o, this._sources, 1)));
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
    const e = this._setter(t, Fs);
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
function Ys(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Ys(o, e, n + 1));
  return Math.max(...s);
}
var Zi = class {
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
function Ji(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function ea(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function ta({ key: t, order: e }) {
  const n = e === "asc" ? Ji : ea;
  return (r, s) => n(r[t], s[t]);
}
function na(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => ta(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function ra(t, e) {
  return t.sort(na(e));
}
class sa extends Ui {
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
    const n = e.id || xr(), r = e.parent || 0, s = e.text || "", o = e.type || "task", a = e.progress || 0, i = e.details || "", l = { ...e, id: n, text: s, parent: r, progress: a, type: o, details: i };
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
    r && (ra(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && Vs(n, e), e;
  }
}
function Vs(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Vs(n.data, e);
  });
}
function Ce(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ut(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Hn(t, e) {
  const n = Ce(t);
  return isNaN(e) ? ut(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function yr(t, e) {
  const n = Ce(t);
  if (isNaN(e)) return ut(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ut(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Gs(t, e) {
  const n = +Ce(t);
  return ut(t, n + e);
}
const Bs = 6048e5, oa = 864e5, js = 6e4, Ks = 36e5;
function ia(t, e) {
  return Gs(t, e * Ks);
}
let aa = {};
function Us() {
  return aa;
}
function _n(t, e) {
  const n = Us(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Ce(t), o = s.getDay(), a = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function Zt(t) {
  return _n(t, { weekStartsOn: 1 });
}
function la(t) {
  const e = Ce(t), n = e.getFullYear(), r = ut(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Zt(r), o = ut(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const a = Zt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= a.getTime() ? n : n - 1;
}
function bt(t) {
  const e = Ce(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Cn(t) {
  const e = Ce(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function qs(t, e) {
  const n = bt(t), r = bt(e), s = +n - Cn(n), o = +r - Cn(r);
  return Math.round((s - o) / oa);
}
function Xr(t) {
  const e = la(t), n = ut(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Zt(n);
}
function ca(t, e) {
  return Gs(t, e * js);
}
function da(t, e) {
  const n = e * 3;
  return yr(t, n);
}
function Xs(t, e) {
  const n = e * 7;
  return Hn(t, n);
}
function ua(t, e) {
  return yr(t, e * 12);
}
function Xt(t, e) {
  const n = Ce(t), r = Ce(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function fa(t, e) {
  const n = bt(t), r = bt(e);
  return +n == +r;
}
function vr(t, e) {
  const n = Zt(t), r = Zt(e), s = +n - Cn(n), o = +r - Cn(r);
  return Math.round((s - o) / Bs);
}
function ha(t, e) {
  const n = Ce(t), r = Ce(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function pa(t, e) {
  const n = Ce(t), r = Ce(e);
  return n.getFullYear() - r.getFullYear();
}
function kr(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function Qs(t, e) {
  return +Ce(t) - +Ce(e);
}
function ga(t, e, n) {
  const r = Qs(t, e) / Ks;
  return kr(n?.roundingMethod)(r);
}
function ma(t, e, n) {
  const r = Qs(t, e) / js;
  return kr(n?.roundingMethod)(r);
}
function Zs(t) {
  const e = Ce(t);
  return e.setHours(23, 59, 59, 999), e;
}
function br(t) {
  const e = Ce(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function wa(t) {
  const e = Ce(t);
  return +Zs(e) == +br(e);
}
function Js(t, e) {
  const n = Ce(t), r = Ce(e), s = Xt(n, r), o = Math.abs(ha(n, r));
  let a;
  if (o < 1) a = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let i = Xt(n, r) === -s;
    wa(Ce(t)) && o === 1 && Xt(t, r) === 1 && (i = !1), a = s * (o - Number(i));
  }
  return a === 0 ? 0 : a;
}
function xa(t, e, n) {
  const r = Js(t, e) / 3;
  return kr(n?.roundingMethod)(r);
}
function ya(t, e) {
  const n = Ce(t), r = Ce(e), s = Xt(n, r), o = Math.abs(pa(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const a = Xt(n, r) === -s, i = s * (o - +a);
  return i === 0 ? 0 : i;
}
function Jt(t) {
  const e = Ce(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function eo(t) {
  const e = Ce(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function va(t) {
  const e = Ce(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ka(t) {
  const e = Ce(t), n = ut(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function ba(t) {
  const e = Ce(t);
  return e.setMinutes(59, 59, 999), e;
}
function Sa(t, e) {
  const n = Us(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Ce(t), o = s.getDay(), a = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + a), s.setHours(23, 59, 59, 999), s;
}
function Sr(t) {
  const e = Ce(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function to(t) {
  const e = Ce(t), n = e.getFullYear(), r = e.getMonth(), s = ut(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function $a(t) {
  const e = Ce(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function no(t) {
  const e = Ce(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : $a(e) ? 366 : 365;
}
function _a(t) {
  const e = Xr(t), n = +Xr(Xs(e, 60)) - +e;
  return Math.round(n / Bs);
}
function Mt(t, e) {
  const n = Ce(t), r = Ce(e);
  return +n == +r;
}
function Ca(t) {
  const e = Ce(t);
  return e.setMinutes(0, 0, 0), e;
}
function Na(t, e, n) {
  const r = _n(t, n), s = _n(e, n);
  return +r == +s;
}
function Ta(t, e) {
  const n = Ce(t), r = Ce(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Da(t, e) {
  const n = Jt(t), r = Jt(e);
  return +n == +r;
}
function Ma(t, e) {
  const n = Ce(t), r = Ce(e);
  return n.getFullYear() === r.getFullYear();
}
const tr = { year: ya, quarter: xa, month: Js, week: vr, day: qs, hour: ga, minute: ma }, gt = { year: { quarter: 4, month: 12, week: _a, day: Ea, hour: Ra }, quarter: { month: 3, week: Ia, day: ro, hour: Aa }, month: { week: Ha, day: La, hour: Pa }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Ea(t) {
  return t ? no(t) : 365;
}
function Ra(t) {
  return no(t) * 24;
}
function Ia(t) {
  const e = Jt(t), n = Hn(bt(Sr(t)), 1);
  return vr(n, e);
}
function ro(t) {
  if (t) {
    const e = Jt(t), n = Sr(t);
    return qs(n, e) + 1;
  }
  return 91;
}
function Aa(t) {
  return ro(t) * 24;
}
function Ha(t) {
  if (t) {
    const e = eo(t), n = Hn(bt(br(t)), 1);
    return vr(n, e);
  }
  return 5;
}
function La(t) {
  return t ? to(t) : 30;
}
function Pa(t) {
  return to(t) * 24;
}
function Nn(t, e, n) {
  const r = gt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function za(t, e) {
  return t === e || !!(gt[t] && gt[t][e]);
}
const Tn = { year: ua, quarter: da, month: yr, week: Xs, day: Hn, hour: ia, minute: ca };
function $r(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, a) => !gt[t][o] || typeof gt[t][o] == "number" || io(t, r, s, n) ? Ut(t, r, s, o, a, n) : Wa(r, s, t, o, a, n);
}
function Ut(t, e, n, r, s, o) {
  const a = r || t;
  let i = n, l = e;
  if (s && (i = dt(a, n, o), l = dt(a, e, o), l < e && (l = ot(a)(l, 1))), t !== a) {
    const c = tr[a](l, i), d = Nn(t, a, n);
    return c / d;
  } else return tr[a](l, i);
}
function Wa(t, e, n, r, s, o) {
  let a = 0;
  const i = dt(n, e, o);
  if (e > i) {
    const c = Tn[n](i, 1);
    a = Ut(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return io(n, e, t, o) || (l = Ut(n, dt(n, t, o), e, void 0, void 0, o), e = Tn[n](e, l)), l += a + Ut(n, t, e, r, void 0, o), !l && s && (l = Ut(n, t, e, r, s, o)), l;
}
function ot(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Tn[t];
}
const so = { year: ka, quarter: Jt, month: eo, week: (t, e) => _n(t, { weekStartsOn: e }), day: bt, hour: Ca };
function dt(t, e, n) {
  const r = so[t];
  return r ? r(e, n) : new Date(e);
}
const Oa = { year: va, quarter: Sr, month: br, week: (t, e) => Sa(t, { weekStartsOn: e }), day: Zs, hour: ba }, oo = { year: Ma, quarter: Da, month: Ta, week: (t, e, n) => Na(t, e, { weekStartsOn: n }), day: fa };
function io(t, e, n, r) {
  const s = oo[t];
  return s ? s(e, n, r) : !1;
}
const Fa = { start: so, end: Oa, add: Tn, isSame: oo, diff: tr, smallerCount: gt }, Qr = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ya(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((i, l) => st.indexOf(i) - st.indexOf(l)).shift();
      let s = st.indexOf(r);
      const o = e[n][r], a = Qr(o);
      for (let i = s - 1; i >= 0; i--) {
        const l = st[i], c = Qr(gt[l][r]);
        if (a <= c) break;
        s = i;
      }
      st.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) gt[r][t] = e[n][r];
    else Fa[n][t] = e[n];
  }
}
function Fn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Va(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function At(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: ot(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const st = ["year", "quarter", "month", "week", "day", "hour"], nr = 50, rr = 300;
function Ga(t, e, n, r, s) {
  let o = t, a = e, i = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, i = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!a || u >= a) && (a = u, l = !0);
  });
  const c = ot(r || "day");
  return o ? i && (o = c(o, -1)) : a ? o = c(a, -30) : o = /* @__PURE__ */ new Date(), a ? l && (a = c(a, 1)) : a = c(o, 30), { _start: o, _end: a };
}
function Ba(t, e, n, r, s, o, a) {
  const i = At(a).unit, l = $r(i, void 0, o), c = l(e, t, "", !0), d = dt(i, e, o);
  t = dt(i, t, o), e = d < e ? ot(i)(d, 1) : d;
  const u = c * r, f = s * a.length, p = a.map((h) => {
    const w = [], x = ot(h.unit);
    let y = dt(h.unit, t, o);
    for (; y < e; ) {
      const k = x(y, h.step), v = y < t ? t : y, D = k > e ? e : k, S = l(D, v, "", !0) * r, N = typeof h.format == "function" ? h.format(y, k) : h.format;
      let T = "";
      h.css && (T += typeof h.css == "function" ? h.css(y) : h.css), w.push({ width: S, value: N, date: v, css: T, unit: h.unit }), y = k;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return i !== n && (m = Math.round(m / Nn(i, n)) || 1), { rows: p, width: u, height: f, diff: l, start: t, end: e, lengthUnit: n, minUnit: i, lengthUnitWidth: m };
}
function ja(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = st.indexOf(At(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = yn(s.minCellWidth, nr)), l.maxCellWidth || (l.maxCellWidth = yn(s.maxCellWidth, rr));
  });
  else {
    const l = [], c = n.length || 1, d = yn(s.minCellWidth, nr), u = yn(s.maxCellWidth, rr);
    n.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }), st.forEach((f, p) => {
      if (p === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (p) for (let h = c - 1; h > 0; h--) {
          const w = st[p - h];
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
function Ka(t, e, n, r, s, o, a) {
  t.level = n;
  let i;
  const l = r.scales || r, c = At(l).unit, d = Ua(c, s);
  if (e === -1) {
    const p = Nn(c, s);
    i = a * p;
  } else {
    const p = Nn(At(o).unit, c);
    i = Math.round(a / p);
  }
  const u = r.minCellWidth ?? nr, f = r.maxCellWidth ?? rr;
  return { scales: l, cellWidth: Math.min(f, Math.max(u, i)), lengthUnit: d, zoom: t };
}
function Ua(t, e) {
  const n = st.indexOf(t), r = st.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : st[r];
}
function yn(t, e) {
  return t ?? e;
}
const sr = 8, ao = 4, qa = 3, Zr = 7, Xa = sr + ao;
function lo(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && uo(s, n, r), s.$x += e, lo(s, e, n, r);
  });
}
function or(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), a = { xMin: 1 / 0, xMax: 0 };
    co(o, a, n, r), o.$x = a.xMin, o.$w = a.xMax - a.xMin, or(t, o, n, r);
  }
}
function co(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && uo(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const a = s.$x + s.$w - o;
      e.xMax < a && (e.xMax = a);
    }
    s.type !== "summary" && co(s, e, n, r);
  });
}
function uo(t, e, n) {
  t.$x = Math.round(e.diff(t.start, e.start, e.lengthUnit) * n), t.$w = Math.round(e.diff(t.end, t.start, e.lengthUnit, !0) * n);
}
function _r(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = _r(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
    const o = s.end || s.start;
    o && (!r.end || r.end < o) && (r.end = new Date(o));
  });
  else if (t.type === "summary") throw Error("Summary tasks must have start and end dates if they have no subtasks");
  return r;
}
function fo(t, e, n) {
  return Jr(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    fo(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && Jr(t, e, n, !0), t;
}
function Jr(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: a, baselines: i } = n, { start: l, end: c, lengthUnit: d, diff: u } = a, f = (r ? "base_" : "") + "start", p = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), h = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let k = t[f], v = t[p];
  if (r && !k) {
    t[y] = !0;
    return;
  }
  t[f] < l && (t[p] < l || Mt(t[p], l)) ? k = v = l : t[f] > c && (k = v = c), t[m] = Math.round(u(k, l, d) * s), t[h] = r ? t.$y + t.$h + ao : o * e + qa, t[w] = Math.round(u(v, k, d, !0) * s), t[x] = r ? sr : i ? o - Zr - Xa : o - Zr, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[h] = t.$y + sr, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Mt(k, v);
}
const Yn = 20, Qa = function(t, e, n, r, s) {
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
    const f = Ja(l, c + o, d, u + o, a, i, r / 2, s), p = el(d, u + o, i);
    t.$p = `${f},${p}`, t.$pl = Za(t.$p);
  }
  return t;
};
function Za(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, a] = n[s], [i, l] = n[s + 1];
    r += Math.hypot(i - o, l - a);
  }
  return r;
}
function Ja(t, e, n, r, s, o, a, i) {
  const l = Yn * (s ? -1 : 1), c = Yn * (o ? -1 : 1), d = t + l, u = n + c, f = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], p = u - d;
  let m = r - e;
  const h = o === s;
  return h || (u <= t + Yn - 2 && o || u > t && !o) && (m = i ? m - a + 6 : m - a), h && o && d > u || h && !o && d < u ? (f[4] = f[2] + p, f[5] = f[3], f[6] = f[4], f[7] = f[5] + m) : (f[4] = f[2], f[5] = f[3] + m, f[6] = f[4] + p, f[7] = f[5]), f.join(",");
}
function el(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function ho(t) {
  return t.map((e) => {
    const n = e.id || xr();
    return { ...e, id: n };
  });
}
const po = ["start", "end", "duration"];
function tl(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !po.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function nl(t, e) {
  return typeof e == "function" ? e : po.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => tl(n, r.id) ? e : null) : e;
}
function rl(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), a = e.editor && nl(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...a && { editor: a }, ...e.options && { options: e.options } };
  });
}
const go = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Et(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), a = s.length, i = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], f = { "indent-task:remove": 2 }, p = !a && d.includes(e), m = { parent: u.includes(e), level: f[e] };
  if (n = n || (a ? s[s.length - 1] : null), !(!n && !p)) {
    if (e !== "paste-task" && (t._temp = null), i.includes(e) || p || s.length === 1) es(t, e, n, r);
    else if (a) {
      const h = l.includes(e) ? s : sl(s, o, m);
      c.includes(e) && h.reverse();
      const w = t.getHistory();
      w && w.startBatch(), h.forEach((x, y) => es(t, e, x, r, y)), w && w.endBatch();
    }
  }
}
function sl(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function es(t, e, n, r, s) {
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
function Cr(t, e) {
  return t.some((n) => n.data ? Cr(n.data, e) : n.id === e);
}
const ts = (t, e) => ot(t, e), ol = (t, e) => $r(t, e);
function ir(t, e) {
  Array.isArray(t) && (t.forEach((n) => xt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = _r(n, t);
      n.start = r, n.end = s, xt(n, e);
    }
  }));
}
function xt(t, e) {
  t.unscheduled || ns(t, e, !1), t.base_start && ns(t, e, !0);
}
function ns(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [a, i, l] = mo(n);
  t.type === "milestone" ? (t[l] = 0, t[i] = void 0) : t[a] && (t[l] ? t[i] = ts(o, r)(t[a], t[l]) : t[i] ? t[l] = ol(o, r)(t[i], t[a]) : (t[i] = ts(o, r)(t[a], 1), t[l] = 1));
}
function mo(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function rs(t, e, n) {
  const [r, s, o] = mo(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function wo(t, e, n) {
  rs(t, n, !1), t.base_start && rs(t, n, !0), xt(t, e);
}
class il extends Xi {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new Qi(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: a, start: i, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!i || !l || u) {
        const f = At(d).unit, p = Ga(i, l, u, f, c);
        (p._end != o || p._start != a) && this.setState(p, s);
      } else this.setState({ _start: i, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: a } = o;
      const { _start: i, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: f } = o, p = At(u).unit;
      za(p, a) || (a = p);
      const m = Ba(i, l, a, c, d, f, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: a, tasks: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), f = i.toArray().map((p, m) => fo(p, m, { cellWidth: o, cellHeight: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: f }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: a, cellHeight: i, baselines: l, criticalPath: c } = this.getState(), d = a.map((u) => {
        const f = o.byId(u.source), p = o.byId(u.target);
        return Qa(u, f, p, i, l);
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
    } }], { tasks: (s) => new sa(s), links: (s) => new Ur(s), columns: (s) => rl(s) });
    const n = this.in = new Zi();
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
          const x = w[w.length - 1], y = d.findIndex((N) => N.id == x), k = d.findIndex((N) => N.id == s), v = Math.min(y, k), D = Math.max(y, k) + 1, S = d.slice(v, D).map((N) => N.id);
          y > k && S.reverse(), S.forEach((N) => {
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
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || xr(), a.add(o), this.setStateAsync({ links: a }), s.id = o.id, s.link = a.byId(o.id));
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
      if (typeof m < "u" && (u.$w = m, or(a, u, c, d)), typeof f < "u") {
        if (u.type === "summary") {
          const x = f - u.$x;
          lo(u, x, c, d);
        }
        u.$x = f, or(a, u, c, d);
      }
      typeof p < "u" && (u.$y = p + 4, u.$reorder = h), typeof m < "u" && (u.$w = m), typeof f < "u" && (u.$x = f), typeof p < "u" && (u.$y = p + 4, u.$reorder = h), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: a, diff: i, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: f, splitTasks: p, calendar: m } = this.getState(), h = d.byId(o), w = { durationUnit: f, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        xt(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = ot(x);
      const k = $r(x, m);
      if (i && (c.start && (c.start = y(c.start, i)), !a && a !== 0 && (c.start && c.end ? c.duration = h.duration : (c.start ? c.end = h.end : (c.end = y(c.end, i), c.start = h.start, c.duration = k(c.end, c.start)), k(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? h.type, m && c.start && (c.start = Fn(c.start, i, m)), c.start && c.end && (!Mt(c.start, h.start) || !Mt(c.end, h.end)) && c.type === "summary" && h.data?.length) {
        let D = i || k(c.start, h.start);
        m && (D = c.start > h.start ? k(c.start, h.start) : -k(h.start, c.start), y = Va(m)), this.moveSummaryKids(h, (S) => (S = y(S, D), m ? Fn(S, i, m) : S), "update-task");
      }
      c.start || (c.start = h.start), !c.end && !c.duration && (c.duration = h.duration), xt(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && h.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
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
          const S = o.getBranch(0);
          let N;
          if (S?.length) {
            const T = S[S.length - 1];
            if (!T.$skip) {
              const V = new Date(T.start.valueOf());
              a.start <= V && (N = V);
            }
          }
          p.start = N || ot(l, d)(a.start, 1);
        }
        p.duration = 1;
      }
      d && (p.start = Fn(p.start, 1, d)), this.getState().baselines && (p.base_start = p.start, p.base_duration = p.duration), xt(p, { durationUnit: l, calendar: d });
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], ir(s.data.tasks, { durationUnit: i, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Ur(a.map((u) => u).concat(ho(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: a, cellWidth: i, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let f = i;
      s < 0 && (f = l || i);
      const p = f + s * 50, m = a.levels[a.level], h = s < 0 && i > m.maxCellWidth;
      if (p < m.minCellWidth || p > m.maxCellWidth || h) {
        if (!this.changeScale(a, s)) return;
      } else this.setState({ cellWidth: p, _cellWidth: p });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: k } = this.getState(), v = dt(w.minUnit, x, k), D = w.diff(u, v, "hour");
      typeof o > "u" && (o = y);
      let S = Math.round(D * y) - o;
      S < 0 && (S = 0), this.setState({ scrollLeft: S, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: a, start: i, end: l, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: f } = this.getState(), p = ot(a.minUnit);
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
      const { cellWidth: o, scales: a, _scales: i } = this.getState(), l = Ka(e, n, r, s, i.lengthUnit, a, o);
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
      const d = _r({ ...l, start: void 0, end: void 0, duration: void 0 });
      if (!Mt(l.start, d.start) || !Mt(l.end, d.end)) {
        r ? (xt(d, { durationUnit: o, calendar: i }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: n, skipUndo: !0 });
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
    return ot("hour")(dt(n.minUnit, r, s), Math.floor(e / o));
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
function al(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = ll(s, t, e, 1, n);
    cl(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function ll(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function cl(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function ar(t) {
  return [...xo];
}
function Nr(t) {
  return t.map((e) => {
    switch (e.data && Nr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => ul(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => fl(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => hl(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => dl(n);
        break;
    }
    return e;
  });
}
function dl(t) {
  return t.parent === 0;
}
function ul(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function fl(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function hl(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function ss(t) {
  return t && typeof t == "object";
}
function pl(t) {
  return !t.selected || t.selected.length < 2;
}
const gl = (t) => (e) => e.type === t, xo = Nr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: gl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => ss(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => pl(e) && ss(n) }]);
function lr(t) {
  return [...yo];
}
const yo = Nr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
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
function vo(t) {
  return [...ko];
}
const ko = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Bn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Vn(t), isDisabled: jn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Vn(t) || Gn(t), isDisabled: jn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Vn(t) || Gn(t), isDisabled: jn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Gn(t) || Bn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Bn(t) }], bo = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], wt = Ht(null);
(/* @__PURE__ */ new Date()).valueOf();
function ml(t, e) {
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
  } else return ml(t, e);
  return t === e;
}
function cr(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(cr);
  const e = {};
  for (const n in t) e[n] = cr(t[n]);
  return e;
}
var So = 2, wl = class {
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
      l ? (l.__parse(d, u, o, a) && (r[i] = d), a & So ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[i] = this._wrapNested(d, d, u, o) : n[i] = this._wrapWritable(d), r[i] = d), o[u] = o[u] || null;
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
}, xl = class {
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
      o.length = Math.max(...o.in.map((a) => $o(a, this._sources, 1)));
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
    const n = this._setter(e, So);
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
function $o(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => $o(o, e, n + 1));
  return Math.max(...s);
}
var yl = class {
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
function vl(t) {
  return (e) => e[t];
}
function kl(t) {
  return (e, n) => e[t] = n;
}
function St(t, e) {
  return (e.getter || vl(e.id))(t);
}
function os(t, e, n) {
  return (e.setter || kl(e.id))(t, n);
}
function is(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function mt(t, e) {
  let n = St(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function bl(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", a = t._columns, i = t.flatData;
  e.header !== !1 && a[0].header && (r = as("header", a, r, o, s));
  for (let l = 0; l < i.length; l++) {
    const c = [];
    for (let d = 0; d < a.length; d++) {
      let u = mt(i[l], a[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && a[0].footer && (r = as("footer", a, r, o, s)), r;
}
function as(t, e, n, r, s) {
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
function Sl(t, e, n) {
  const r = [], s = [], o = [];
  let a = [];
  const i = t._columns, l = t.flatData, c = t._sizes;
  for (const u of i) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && i[0].header && (ls("header", i, r, s, d, e, n), a = a.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += i[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const f = [];
    for (let p = 0; p < i.length; p++) {
      const m = l[u], h = i[p], w = St(m, h) ?? "";
      let x = mt(m, h), y;
      e.cellStyle && (y = e.cellStyle(w, m, h)), e.cellTemplate && (x = e.cellTemplate(w, m, h) ?? x);
      const k = _o(x, 2, y, n);
      f.push(k);
    }
    r.push(f), a.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && i[0].footer && (ls("footer", i, r, s, d, e, n), a = a.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: a, colSizes: o, styles: n };
}
function ls(t, e, n, r, s, o, a) {
  for (let i = 0; i < e[0][t].length; i++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][i], u = d.colspan ? d.colspan - 1 : 0, f = d.rowspan ? d.rowspan - 1 : 0;
      (u || f) && r.push({ from: { row: i + s, column: c }, to: { row: i + s + f, column: c + u } });
      let p = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(p, d, e[c], t)), o.headerCellTemplate && (p = o.headerCellTemplate(p, d, e[c], t) ?? p);
      let h;
      t == "header" ? i == e[0][t].length - 1 ? h = 1 : h = 0 : i ? h = 4 : h = 3;
      const w = _o(p, h, m, a);
      l.push(w);
    }
    n.push(l);
  }
}
function _o(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = _l(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((a) => on(a, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function $l(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, a = e[t], i = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: a, background: r[t], ...l, borderBottom: i, borderRight: i };
  return { cell: { color: a, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function _l(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Cl = "portrait", Nl = 100, Tl = "a4", Dl = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Ml(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((i) => !i.hidden), a = El(e);
  return o.forEach((i, l) => {
    s + i.width <= a ? (s += i.width, r.push(i)) : (r.length && n.push(r), r = [i], s = i.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function cs(t, e, n) {
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
function El(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Dl[r];
  return Rl(e === "portrait" ? s : o, n);
}
function Rl(t, e) {
  return t * e;
}
function Il(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || Cl, ppi: n || Nl, paper: r || Tl };
}
function Co(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Al(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const ds = ["resize-column", "hide-column", "update-cell"], Hl = ["delete-row", "update-row", "update-cell"], Ll = ["move-item"], Pl = ["resize-column", "move-item"];
let zl = class {
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
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), a = St(s, o);
      return on(a, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: a }, source: { action: "update-cell", data: e } };
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
        if (Pl.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Ll.includes(n) && this.setPrev("flatData"), ds.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Hl.includes(n) && this.setPrev("data"), ds.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = cr(this.getState()[e]);
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
function No() {
  let t = !0;
  return t = !1, t;
}
function To(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Wl(t, e) {
  return -To(t, e);
}
function Ol(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? To : Wl;
  return function(r, s) {
    return n(St(r, e), St(s, e));
  };
}
function Fl(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Ol(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const a = n[o](r, s);
      if (a !== 0) return a;
    }
    return 0;
  };
}
const vn = 28, Yl = 20;
function Vl() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Dn(t, e, n, r, s) {
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
function us(t, e, n, r, s) {
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
        if (w += m ? ` ${m}` : "", h = Dn(d, w, s).width, (p > 1 || !i[c + 1]) && n > c + 1) {
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
function Gl(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let a = 0; a < e.length; a++) {
    const i = e[a], l = mt(i, t);
    l && (r.push(l), t.treetoggle ? s.push(e[a].$level * vn + (e[a].$count ? vn : 0) + (t.draggable ? vn : 0)) : t.draggable && s.push(vn));
  }
  return Dn(r, o, n, s).width;
}
function Bl(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Yl : 0;
  let s = t.header;
  if (typeof s == "string") return Dn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let a = 0; a < s.length; a++) {
    const i = s[a], l = typeof i == "string" ? i : i.text, c = n + (typeof i == "string" ? "" : ` ${i.css}`);
    let d = Dn(l, c, e).width;
    a === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const jl = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Kl(t) {
  return jl[t];
}
class Ul extends wl {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new xl(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: a, _skin: i } = this.getState(), l = this.copyColumns(o), c = l.reduce((f, p) => Math.max(p.header.length, f), 0), d = l.reduce((f, p) => Math.max(p.footer.length, f), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, a, c, d, i);
      for (let f = 0; f < l.length; f++) this.normalizeColumns(l, f, "header", c, u), this.normalizeColumns(l, f, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: a, dynamic: i, _filterIds: l } = this.getState(), c = l && new Set(l), d = a ? this.flattenRows(o, [], l) : c ? o.filter((f) => c.has(f.id)) : o, u = !i && d.some((f) => f.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new yl();
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
        a = { column: l.id, id: s, value: St(i, l) ?? "", renderedValue: mt(i, l) }, typeof c == "object" && c.config && (a.config = c.config, c.config.options && (a.options = c.config.options)), l.options && !a.options && (a.options = l.options), this.setState({ editor: a });
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
        os(f, u, d);
        const p = this.updateTreeRow(f);
        f.$parent === 0 && (a = p);
      } else {
        const f = a.findIndex((m) => m.id == l), p = { ...a[f] };
        os(p, u, d), a[f] = p;
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
          c = Gl(u, h, p);
        }
        if (a == "header" || a === !0) {
          const { _skin: f } = this.getState();
          c = Math.max(Bl(u, f), c);
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
      const x = Fl(w, c);
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
        const c = bl(this.getState(), i);
        i.download !== !1 ? is(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (i.format == "xlsx") {
        let c = i.styles;
        !c && c !== !1 && (c = $l(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: f, merged: p, rowSizes: m, colSizes: h, styles: w } = Sl(this.getState(), i, u), x = i.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (k) => {
            if (k.data.type == "ready") {
              const v = k.data.blob;
              i.download !== !1 ? is(v, l) : s.result = v, o(!0);
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
      const o = Il(s);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Vl()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), on(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), No() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new zl(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
      r.push((l) => o?.handler ? o.handler(l[s], i) : Kl(a)(l[s], i));
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
        const d = mt(i, c);
        String(d).toLowerCase().includes(e) && (l[c.id] = !0);
      }), Object.keys(l).length && (r[i.id] = l);
    }), r;
  }
  normalizeSizes(e, n, r, s, o) {
    const a = us(e, "header", r, n.headerHeight, o), i = us(e, "footer", s, n.footerHeight, o), l = a.reduce((d, u) => d + u, 0), c = i.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: a, footerRowHeights: i, headerHeight: l, footerHeight: c };
  }
}
let ql = (/* @__PURE__ */ new Date()).valueOf();
function kn() {
  return "temp://" + ql++;
}
function Xl(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var Ql = class {
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
}, It = [], Zl = { subscribe: (t) => {
  Jl();
  const e = new Ql();
  return It.push(e), t(e), () => {
    const n = It.findIndex((r) => r === e);
    n >= 0 && It.splice(n, 1);
  };
} }, fs = !1;
function Jl() {
  fs || (fs = !0, document.addEventListener("keydown", (t) => {
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
const ec = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Tr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(a) {
    const i = a.target;
    return i.tagName === "INPUT" || i.tagName === "TEXTAREA" || Xl(i, "data-header-id")?.classList.contains("wx-filter") || !!i.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const a in e) {
    const i = e[a];
    typeof i < "u" && (typeof i == "function" ? s[a] = i : i && (s[a] = (l) => {
      const c = r(l);
      n({ key: a, event: l, isInput: c });
    }));
  }
  const o = Zl.subscribe((a) => {
    a.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function tc(t, e) {
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
function yt(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function nc(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function hs(t) {
  return t && t.getAttribute("data-context-id");
}
const ps = 5;
function rc(t, e) {
  let n, r, s, o, a, i, l, c, d;
  function u(S) {
    o = S.clientX, a = S.clientY, i = {
      ...nc(n, t, S),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function f(S) {
    n = Ue(S), hs(n) && (s = yt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", p), window.addEventListener("touchend", k));
  }
  function p(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = Ue(S), hs(n) && (s = yt(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", v), u(S)));
  }
  function h(S) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", k), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", f));
  }
  function w(S) {
    const N = S.clientX - o, T = S.clientY - a;
    if (!r) {
      if (Math.abs(N) < ps && Math.abs(T) < ps || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = i.left + "px", r.style.top = i.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const V = Math.round(Math.max(0, i.top + T));
      if (e && e.move && e.move({ id: s, top: V, detail: l }) === !1)
        return;
      const _ = e.getTask(s), A = _.$y;
      if (!i.start && i.y == A) return D();
      i.start = !0, i.y = _.$y - 4, r.style.top = V + "px";
      const L = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), M = Ue(L);
      if (M && M !== n) {
        const R = yt(M), W = M.getBoundingClientRect(), oe = W.top + W.height / 2, de = S.clientY + i.db > oe && M.nextElementSibling !== n, K = S.clientY - i.dt < oe && M.previousElementSibling !== n;
        l?.after == R || l?.before == R ? l = null : de ? l = { id: s, after: R } : K && (l = { id: s, before: R });
      }
    }
  }
  function x(S) {
    w(S);
  }
  function y(S) {
    c ? (S.preventDefault(), w(S.touches[0])) : d && (clearTimeout(d), d = null);
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
const sc = {
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
function Do(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = Do(n.data, e)), r;
  });
}
function Mo(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = Mo(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let oc = 1;
function ic(t) {
  return Do(t, (e) => {
    const n = { ...e, id: e.id || oc++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Eo = {};
function ac(t) {
  return Eo[t] || t;
}
function lc(t, e) {
  Eo[t] = e;
}
function cc({ onClick: t, onShow: e, option: n }) {
  const r = z(null), s = E(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = C(() => n && n.comp ? ac(n.comp) : null, [n]);
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
function Dr({
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
  const [c, d] = B(-1e4), [u, f] = B(-1e4), [p, m] = B(20), [h, w] = B(), x = z(null), [y, k] = B(!1), [v, D] = B(null), S = E(() => {
    const A = Zo(x.current, s, r, e, n);
    A && (d(A.x), f(A.y), m(A.z), w(A.width));
  }, [s, r, e, n]);
  F(() => {
    o && o(S);
  }, []);
  const N = E(() => {
    k(!1);
  }, []), T = E(() => {
    l && l({ action: null, option: null });
  }, [l]), V = E((A, L) => {
    k(A), D(L);
  }, []), _ = C(() => ic(t), [t]);
  return F(() => {
    S();
  }, [s, S]), F(() => {
    if (x.current)
      return en(x.current, { callback: T, modal: !0 }).destroy;
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
      children: _.map((A) => /* @__PURE__ */ U(Cs, { children: [
        A.comp === "separator" ? /* @__PURE__ */ g("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ g(
          cc,
          {
            option: A,
            onShow: V,
            onClick: (L) => {
              if (!A.data && !L.defaultPrevented) {
                const M = { context: a, action: A, option: A, event: L };
                A.handler && A.handler(M), l && l(M), L.stopPropagation();
              }
            }
          }
        ),
        A.data && y === A.id ? /* @__PURE__ */ g(
          Dr,
          {
            css: i,
            options: A.data,
            at: "right-overlap",
            parent: v,
            context: a,
            onClick: l
          }
        ) : null
      ] }, A.id))
    }
  );
}
const dc = $t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: a = null,
    css: i = "",
    children: l,
    onClick: c
  } = t, [d, u] = B(null), [f, p] = B(null), [m, h] = B(0), [w, x] = B(0), y = C(() => d !== null && a ? Mo(n, (S) => a(S, d)) : n, [d, a, n]), k = E(
    (S) => {
      p(null), c && c(S);
    },
    [c]
  ), v = E((S, N) => {
    let T = null;
    for (; S && S.dataset && !T; )
      T = S.dataset[N], S = S.parentNode;
    return T ? Lt(T) : null;
  }, []), D = E(
    (S, N) => {
      if (!S) {
        p(null);
        return;
      }
      if (S.defaultPrevented) return;
      const T = S.target;
      if (T && T.dataset && T.dataset.menuIgnore) return;
      h(S.clientX + 1), x(S.clientY + 1);
      let V = typeof N < "u" ? N : v(T, o);
      s && (V = s(V, S), !V) || (u(V), p(T), S.preventDefault());
    },
    [o, v, s]
  );
  return _t(e, () => ({ show: D }), [D]), /* @__PURE__ */ U(Ie, { children: [
    l ? /* @__PURE__ */ g("span", { onClick: D, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    f ? /* @__PURE__ */ g(Ls, { children: /* @__PURE__ */ g(
      Dr,
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
$t(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: a } = t, [i, l] = B(null);
  function c(m) {
    l(null), a && a(m);
  }
  const d = E((m) => {
    l(m.target), m.preventDefault();
  }, []);
  _t(e, () => ({ show: d }), [d]);
  function u(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; )
      l(h), h = h.parentNode;
  }
  const f = z(0), p = z(i);
  return F(() => {
    p.current !== i && (f.current += 1, p.current = i);
  }, [i]), /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ g("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    i ? /* @__PURE__ */ g(Ls, { children: /* @__PURE__ */ g(
      Dr,
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
const Ro = $t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: a = null,
    css: i = "",
    children: l,
    onClick: c
  } = t, d = z(null), u = E((f, p) => {
    d.current.show(f, p);
  }, []);
  return _t(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ U(Ie, { children: [
    l ? /* @__PURE__ */ g("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ g(
      dc,
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
}), Io = {};
function uc(t) {
  return Io[t] || t;
}
function Wt(t, e) {
  Io[t] = e;
}
function Ao({ menu: t = !1 }) {
  return /* @__PURE__ */ g("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Ho() {
  return /* @__PURE__ */ g("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const fc = ({ key: t, text: e, ...n }) => n;
function Mr(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, a = C(
    () => uc(e.comp || "label"),
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
    return /* @__PURE__ */ g(Ho, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ g(Ao, { menu: n });
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
            ...fc(e)
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
  const [o, a] = B(!0), i = () => a(!0), l = () => a(!1), c = (u) => {
    i(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ U("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ g("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ g("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ g(zt, { width: "", oncancel: i, children: /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ g(
      Mn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ U(Ie, { children: [
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
        Mr,
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
function hc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [a, i] = B(void 0), l = z(null);
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
        /* @__PURE__ */ g(ct, { icon: "wxi-dots-h", onClick: d }),
        a ? /* @__PURE__ */ g(zt, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ g("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
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
            Mr,
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
function pc(t) {
  return t.forEach((e) => {
    e.id || (e.id = pr());
  }), t;
}
function dr(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: a,
    onChange: i
  } = t, [l, c] = Ve(e || []), [d, u] = Ve(s || null), f = C(() => pc(l), [l]), p = z(null), m = z(-1), [h, w] = B([]), x = z(f);
  F(() => {
    x.current = f;
  }, [l]);
  const y = z(o);
  F(() => {
    y.current = o;
  }, [o]);
  const k = z(h);
  F(() => {
    k.current = h;
  }, [h]);
  const v = z(!1);
  function D(_) {
    d && (d[_.item.key] = _.value, u({ ...d })), i && i(_);
  }
  function S() {
    const _ = p.current;
    if (!_) return 0;
    const A = _.children, L = x.current || [];
    let M = 0;
    for (let R = 0; R < L.length; R++)
      L[R].comp !== "spacer" && (M += A[R].clientWidth, L[R].comp === "separator" && (M += 8));
    return M;
  }
  function N() {
    const _ = p.current, A = x.current || [];
    if (_) {
      for (let L = A.length - 1; L >= 0; L--)
        if (A[L].items && !A[L].collapsed) {
          A[L].collapsed = !0, A[L].$width = _.children[L].offsetWidth, v.current = !0, c([...A]);
          return;
        }
    }
  }
  function T(_) {
    const A = p.current, L = x.current || [];
    if (A) {
      for (let M = 0; M < L.length; M++)
        if (L[M].collapsed && L[M].$width) {
          L[M].$width - A.children[M].offsetWidth < _ + 10 && (L[M].collapsed = !1, v.current = !0), c([...L]);
          return;
        }
    }
  }
  function V() {
    const _ = p.current;
    if (!_) return;
    const A = x.current || [], L = y.current;
    if (L === "wrap") return;
    const M = _.clientWidth;
    if (_.scrollWidth > M) {
      if (L === "collapse") return N();
      const R = _.children;
      let W = 0;
      for (let oe = 0; oe < A.length; oe++) {
        if (W += R[oe].clientWidth, A[oe].comp === "separator" && (W += 8), W > M - 40) {
          if (m.current === oe) return;
          m.current = oe;
          const de = [];
          for (let K = oe; K < A.length; K++)
            de.push(A[K]), R[K].style.visibility = "hidden";
          oe > 0 && A[oe - 1].comp === "separator" && (R[oe - 1].style.visibility = "hidden"), w(de);
          break;
        }
        R[oe].style.visibility = "";
      }
    } else {
      const R = M - S();
      if (R <= 0) return;
      if (L === "collapse") return T(R);
      if ((k.current || []).length) {
        m.current = null;
        const W = _.children;
        for (let oe = 0; oe < A.length; oe++)
          W[oe].style.visibility = "";
        w([]);
      }
    }
  }
  return F(() => {
    v.current && (v.current = !1, V());
  }, [l]), F(() => {
    const _ = new ResizeObserver(() => V());
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
            Mn,
            {
              item: _,
              values: d,
              onClick: a,
              onChange: D
            },
            _.id
          ) : /* @__PURE__ */ g(
            Mr,
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
          hc,
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
function gc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: a, onClick: i } = t;
  return a ? /* @__PURE__ */ U("div", { className: "wx-HXpG4gnx wx-item", onClick: i, children: [
    /* @__PURE__ */ g("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ g(
    ct,
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
function mc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function wc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: a, onClick: i } = t;
  return a ? /* @__PURE__ */ U("div", { className: "wx-3cuSqONJ wx-item", onClick: i, children: [
    e ? /* @__PURE__ */ g("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ g(
    ct,
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
function xc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ U("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ g("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Wt("button", gc);
Wt("separator", Ao);
Wt("spacer", Ho);
Wt("label", mc);
Wt("item", xc);
Wt("icon", wc);
const tt = Ht(null);
function yc(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const gs = 5, vc = 700;
function kc(t) {
  return Lt(t.getAttribute("data-id"));
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
function ur(t, e) {
  const n = bn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function bc(t, e) {
  const n = e.current;
  let r = null, s, o, a = !1, i = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(N) {
    const T = Ue(N);
    T && (r = {
      container: l,
      sourceNode: N.target,
      from: kc(T),
      pos: ur(N, t)
    }, o = r.pos, u(N));
  }
  function u(N) {
    if (!r) return;
    const T = r.pos = ur(N, t);
    if (!a) {
      if (!i && !N?.target?.getAttribute("draggable-data") && Math.abs(o.x - T.x) < gs && Math.abs(o.y - T.y) < gs)
        return;
      if (D(N) === !1) return S();
    }
    if (i) {
      const V = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, _ = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        N.pageX - V,
        N.pageY - _
      );
    } else r.targetNode = N.target;
    n.move && n.move(N, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function f(N) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", a && n.end && n.end(N, r), r = o = null, S();
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
    }, vc), v(N);
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
  function S(N) {
    a = i = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", h), N && (t.removeEventListener("mousedown", p), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", k));
  }
  return t.addEventListener("mousedown", p), t.addEventListener("touchstart", w), t.addEventListener("dragstart", k), {
    destroy() {
      S(!0);
    }
  };
}
const Sc = 4e-3;
function $c() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function _c(t, e, n, r) {
  const { node: s, left: o, top: a, bottom: i, sense: l, xScroll: c, yScroll: d } = r, u = ur(t, s);
  n.scrollState || (n.scrollState = $c());
  let f = 0, p = 0;
  u.x < o + l ? f = -1 : u.x > e.width - l && (f = 1), u.y < a + Math.round(l / 2) ? p = -1 : u.y > e.height - i - Math.round(l / 2) && (p = 1), (n.scrollState.dirX !== f || n.scrollState.dirY !== p) && (Lo(n), n.scrollState.dirX = f, n.scrollState.dirY = p), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && Cc(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Cc(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      Nc,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Lo(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function Nc(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += Sc, r !== 0 && Dc(t, e, r), s !== 0 && Tc(t, e, s);
}
function Tc(t, e, n) {
  const r = e.node.scrollTop;
  Po(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Dc(t, e, n) {
  const r = e.node.scrollLeft;
  Po(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Po(t, e, n) {
  n.node[e] = t;
}
function Ln(t, e, n, r, s, o) {
  const a = {};
  return t && (a.width = `${t}px`, a.minWidth = `${t}px`), e && (a.flexGrow = e), o && (a.height = `${o}px`), n && (a.position = "sticky", n.left && (a.left = `${r}px`), n.right && (a.right = `${s}px`)), a;
}
function zo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Mc(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [a, i] = Ve(t.focusable), l = $e(tt), c = ee(l, "focusCell"), d = ee(l, "search"), u = ee(l, "reorder"), f = C(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), p = C(
    () => Ln(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m(S, N) {
    let T = "wx-cell";
    return T += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", T += S ? " " + S(n) : "", T += N ? " " + N(e, n) : "", T += n.treetoggle ? " wx-tree-cell" : "", T;
  }
  const h = C(
    () => m(s, r),
    [s, r, n, e]
  ), w = C(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = z(null);
  F(() => {
    x.current && a && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, a, e.id, n.id]);
  const y = E(() => {
    a && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, a, c, e.id, n.id]);
  F(() => () => {
    a && c && (l.exec("focus-cell", { eventSource: "destroy" }), i(!1));
  }, [l, i]);
  function k(S) {
    const N = new RegExp(`(${d.value.trim()})`, "gi");
    return String(S).split(N).map((T) => ({ text: T, highlight: N.test(T) }));
  }
  const v = C(() => {
    const S = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, N = n.fixed && n.fixed.right;
    return [
      h,
      S ? "wx-shadow" : "",
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
        n.treetoggle ? /* @__PURE__ */ U(Ie, { children: [
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
            onAction: ({ action: S, data: N }) => l.exec(S, N)
          }
        ) : o ? o() : f ? /* @__PURE__ */ g("span", { children: k(mt(e, n)).map(
          ({ highlight: S, text: N }, T) => S ? /* @__PURE__ */ g("mark", { className: "wx-TSCaXsGV wx-search", children: N }, T) : /* @__PURE__ */ g("span", { children: N }, T)
        ) }) : mt(e, n)
      ]
    }
  );
}
function ms(t, e) {
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
function Ec({ filter: t, column: e, action: n, filterValue: r }) {
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
function Rc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = $e(tt), o = ee(s, "flatData"), a = C(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), i = C(() => t?.config?.template, [t]);
  function l() {
    const u = [];
    return o.forEach((f) => {
      const p = St(f, e);
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
    As,
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
const Ic = {
  text: Ec,
  richselect: Rc
};
function Ac({ filter: t, column: e }) {
  const n = $e(tt), r = ee(n, "filterValues");
  function s(a) {
    n.exec("filter-rows", a);
  }
  const o = C(() => Ic[t.type], [t.type]);
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
function Hc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: a,
    bodyHeight: i,
    hasSplit: l
  } = t, c = $e(tt), d = ee(c, "sortMarks"), u = C(() => d ? d[n.id] : void 0, [d, n.id]), f = z(), p = E(
    (R) => {
      f.current = e.flexgrow ? R.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = E(
    (R, W) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (f.current || 0) + R),
        inProgress: W
      });
    },
    [c, e.id]
  ), h = E((R) => m(R, !0), [m]), w = E((R) => m(R, !1), [m]), x = E(
    (R) => {
      if (!n.sort || e.filter) return;
      let W = u?.order;
      W && (W = W === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: R.ctrlKey, order: W });
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
  ), S = C(
    () => D && !l && e.collapsible !== "header",
    [D, l, e.collapsible]
  ), N = C(
    () => S ? { top: -i / 2, position: "absolute" } : {},
    [S, i]
  ), T = C(
    () => Ln(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (D && S ? i : 0)
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
      i
    ]
  ), V = C(
    () => zo(n, e, a),
    [n, e, a]
  ), _ = E(() => Object.fromEntries(
    Object.entries(e).filter(([R]) => R !== "cell")
  ), [e]), A = `wx-cell ${V} ${e.css || ""} wx-collapsed`, L = [
    "wx-cell",
    V,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), M = z(null);
  return F(() => {
    const R = M.current;
    if (!R) return;
    const W = ms(R, { down: p, move: h, up: w });
    return () => {
      typeof W == "function" && W();
    };
  }, [p, h, w, ms]), D ? /* @__PURE__ */ g(
    "div",
    {
      className: "wx-RsQD74qC " + A,
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
      className: "wx-RsQD74qC " + L,
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
              onAction: ({ action: W, data: oe }) => c.exec(W, oe)
            }
          );
        })() : e.filter ? /* @__PURE__ */ g(Ac, { filter: e.filter, column: n }) : /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
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
        o ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ U(Ie, { children: [
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
function Lc({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = $e(tt), o = C(
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
  ), a = C(
    () => zo(e, t, r),
    [e, t, r]
  ), i = E(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${a || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ g("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? Yo.createElement(t.cell, {
    api: s,
    cell: i(),
    column: e,
    row: n,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ g("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function ws({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const a = $e(tt), i = ee(a, "_sizes"), l = ee(a, "split"), c = C(() => i?.[`${r}RowHeights`], [i, r]), d = C(() => {
    let h = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        h.push([]), n.forEach((k, v) => {
          const D = { ...k[r][x] };
          if (y || h[x].push(D), D.colspan > 1) {
            if (y = D.colspan - 1, !No() && k.right) {
              let S = k.right;
              for (let N = 1; N < D.colspan; N++)
                S -= n[v + N].width;
              D.right = S;
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
              Hc,
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
              Lc,
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
function Pc({ overlay: t }) {
  const e = $e(tt);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ g("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ g(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function zc(t) {
  const { actions: e, editor: n } = t, [r, s] = B(n?.value || ""), o = z(null);
  F(() => {
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
function Wc({ actions: t, editor: e, onAction: n }) {
  const [r, s] = B(e?.value), [o, a] = B(e?.renderedValue), [i, l] = B(e?.options || []), c = C(() => e?.config?.template, [e]), d = C(() => e?.config?.cell, [e]), u = C(() => (i || []).findIndex((y) => y.id === r), [i, r]), f = z(null), p = z(null), m = E(
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
  ), w = z(null);
  F(() => {
    w.current && w.current.focus();
  }, []), F(() => {
    s(e?.value), a(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = E(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ U(Ie, { children: [
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
      En,
      {
        items: i,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ g(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Oc({ actions: t, editor: e, onAction: n }) {
  const [r] = B(() => e.value || /* @__PURE__ */ new Date()), [s] = B(() => e.config?.template), [o] = B(() => e.config?.cell);
  function a({ value: l }) {
    t.updateValue(l), t.save();
  }
  const i = z(null);
  return F(() => {
    i.current && i.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ U(Ie, { children: [
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
    /* @__PURE__ */ g(zt, { width: "auto", children: /* @__PURE__ */ g(
      Is,
      {
        value: r,
        onChange: a,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Fc(t) {
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
  const m = z(null);
  return F(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ U(Ie, { children: [
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
    /* @__PURE__ */ g(En, { items: i, onReady: p, onSelect: c, children: ({ option: h }) => s.template ? s.template(h) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ g(w, { data: h, onAction: r });
    })() : h.label })
  ] });
}
const Yc = {
  text: zc,
  combo: Wc,
  datepicker: Oc,
  richselect: Fc
};
function Vc({ column: t, row: e }) {
  const n = $e(tt), r = ee(n, "editor"), s = E(
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
    () => Ln(
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
    return Yc[h];
  }, [t, e]), u = z(null);
  F(() => {
    if (!u.current) return;
    const m = en(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), F(() => {
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
function xs(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = $e(tt), { filterValues: o, _columns: a, _sizes: i } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ g(Ie, { children: e.map((c, d) => /* @__PURE__ */ g("tr", { children: c.map((u) => {
    const f = a.find((h) => h.id == u.id), p = `wx-print-cell-${n}${l(f)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ g(
      "th",
      {
        style: Ms(Co(u, i.columnWidth)),
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
        ) : u.filter ? /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-print-filter", children: Al(o, a, u) }) : /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Gc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: a, reorder: i } = t, l = $e(tt), { flatData: c, _sizes: d } = l.getState(), u = o && cs(e, "header", d.headerRowHeights), f = a && cs(e, "footer", d.footerRowHeights);
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
          xs,
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
                  style: Ms(
                    Co(x, d.columnWidth)
                  ),
                  children: [
                    i && x.draggable ? /* @__PURE__ */ g("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(h, x) ? /* @__PURE__ */ g("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ U(Ie, { children: [
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
                    })() : /* @__PURE__ */ g("span", { children: mt(h, x) })
                  ]
                },
                x.id
              )
            )
          },
          w
        )) }),
        a ? /* @__PURE__ */ g("tfoot", { children: /* @__PURE__ */ g(
          xs,
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
function Bc(t) {
  const { config: e, ...n } = t, r = $e(tt), { _skin: s, _columns: o } = r.getState(), a = C(() => Ml(o, e), []), i = z(null);
  return F(() => {
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
      children: a.map((l, c) => /* @__PURE__ */ g("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ g(Gc, { columns: l, ...n }) }, c))
    }
  );
}
function jc(t) {
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
  } = t, h = $e(tt), w = ee(h, "dynamic"), x = ee(h, "_columns"), y = ee(h, "flatData"), k = ee(h, "split"), v = ee(h, "_sizes"), [D, S] = qt(h, "selectedRows"), N = ee(h, "select"), T = ee(h, "editor"), V = ee(h, "tree"), _ = ee(h, "focusCell"), A = ee(h, "_print"), L = ee(h, "undo"), M = ee(h, "reorder"), R = ee(h, "_rowHeightFromData"), [W, oe] = B(0);
  F(() => {
    oe(Ft());
  }, []);
  const [de, K] = B(0), [ce, ve] = B(0), H = C(() => (x || []).some((b) => !b.hidden && b.flexgrow), [x]), ne = C(() => v?.rowHeight || 0, [v]), ye = z(null), [ue, se] = B(null), [G, ae] = B(null), Q = C(() => {
    let b = [], I = 0;
    return k && k.left && (b = (x || []).slice(0, k.left).filter((O) => !O.hidden).map((O) => ({ ...O })), b.forEach((O) => {
      O.fixed = { left: 1 }, O.left = I, I += O.width;
    }), b.length && (b[b.length - 1].fixed = { left: -1 })), { columns: b, width: I };
  }, [k, x]), ie = C(() => {
    let b = [], I = 0;
    if (k && k.right) {
      b = (x || []).slice(k.right * -1).filter((O) => !O.hidden).map((O) => ({ ...O }));
      for (let O = b.length - 1; O >= 0; O--) {
        const me = b[O];
        me.fixed = { right: 1 }, me.right = I, I += me.width;
      }
      b.length && (b[0].fixed = { right: -1 });
    }
    return { columns: b, width: I };
  }, [k, x]), J = C(() => {
    const b = (x || []).slice(k?.left || 0, (x || []).length - (k?.right ?? 0)).filter((I) => !I.hidden);
    return b.forEach((I) => {
      I.fixed = 0;
    }), b;
  }, [x, k]), pe = C(() => (x || []).reduce((b, I) => (I.hidden || (b += I.width), b), 0), [x]), Te = 1;
  function te(b, I, O) {
    let me = I, He = b;
    if (J.length) {
      let ke = J.length;
      for (let ge = b; ge >= 0; ge--)
        J[ge][O].forEach((Oe) => {
          Oe.colspan > 1 && ge > b - Oe.colspan && ge < ke && (ke = ge);
        });
      if (ke !== J.length && ke < b) {
        for (let ge = ke; ge < b; ge++)
          me -= J[ge].width;
        He = ke;
      }
    }
    return { index: He, delta: me };
  }
  const fe = C(() => {
    let b, I, O;
    const me = de, He = de + (u || 0);
    let ke = 0, ge = 0, Oe = 0, ze = 0;
    J.forEach((ht, pt) => {
      me > Oe && (ke = pt, ze = Oe), Oe = Oe + ht.width, He > Oe && (ge = pt + Te);
    });
    const Ge = { header: 0, footer: 0 };
    for (let ht = ge; ht >= ke; ht--)
      ["header", "footer"].forEach((pt) => {
        J[ht] && J[ht][pt].forEach((Fo) => {
          const zn = Fo.colspan;
          if (zn && zn > 1) {
            const Er = zn - (ge - ht + 1);
            Er > 0 && (Ge[pt] = Math.max(Ge[pt], Er));
          }
        });
      });
    const Ye = te(ke, ze, "header"), qe = te(ke, ze, "footer"), Dt = Ye.delta, Vt = Ye.index, Gt = qe.delta, fn = qe.index;
    return H && pe > (u || 0) ? b = I = O = [...Q.columns, ...J, ...ie.columns] : (b = [
      ...Q.columns,
      ...J.slice(ke, ge + 1),
      ...ie.columns
    ], I = [
      ...Q.columns,
      ...J.slice(Vt, ge + Ge.header + 1),
      ...ie.columns
    ], O = [
      ...Q.columns,
      ...J.slice(fn, ge + Ge.footer + 1),
      ...ie.columns
    ]), {
      data: b || [],
      header: I || [],
      footer: O || [],
      d: ze,
      df: Gt,
      dh: Dt
    };
  }, [
    J,
    Q,
    ie,
    de,
    u,
    H,
    pe
  ]), be = C(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), _e = C(
    () => n && v?.footerHeight || 0,
    [n, v]
  ), Le = C(() => u && f ? pe >= u : !1, [u, f, pe]), j = C(() => (f || 0) - be - _e - (Le ? W : 0), [f, be, _e, Le, W]), Se = C(() => Math.ceil((j || 0) / (ne || 1)) + 1, [j, ne]), Ne = z([]), [we, xe] = B(0), [Me, Pe] = B(void 0), Ee = C(() => {
    let b = 0, I = 0;
    const O = 2;
    if (c) {
      let ke = ce;
      for (; ke > 0; )
        ke -= Ne.current[b] || ne, b++;
      I = ce - ke;
      for (let ge = Math.max(0, b - O - 1); ge < b; ge++)
        I -= Ne.current[b - ge] || ne;
      b = Math.max(0, b - O);
    } else {
      if (R) {
        let ke = 0, ge = 0;
        for (let Ye = 0; Ye < (y || []).length; Ye++) {
          const qe = y[Ye].rowHeight || ne;
          if (ge + qe > ce) {
            ke = Ye;
            break;
          }
          ge += qe;
        }
        b = Math.max(0, ke - O);
        for (let Ye = 0; Ye < b; Ye++)
          I += y[Ye].rowHeight || ne;
        let Oe = 0, ze = 0;
        for (let Ye = ke + 1; Ye < (y || []).length; Ye++) {
          const qe = y[Ye].rowHeight || ne;
          if (Oe++, ze + qe > j)
            break;
          ze += qe;
        }
        const Ge = Math.min(
          w ? w.rowCount : (y || []).length,
          ke + Oe + O
        );
        return { d: I, start: b, end: Ge };
      }
      b = Math.floor(ce / (ne || 1)), b = Math.max(0, b - O), I = b * (ne || 0);
    }
    const me = w ? w.rowCount : (y || []).length, He = Math.min(me, b + (Se || 0) + O);
    return { d: I, start: b, end: He };
  }, [c, R, ce, ne, w, y, Se, j]), Ae = C(() => {
    const b = w ? w.rowCount : (y || []).length;
    if (c)
      return we + Ee.d + (b - (Me || 0)) * (ne || 0);
    if (!R)
      return b * (ne || 0);
    let I = 0;
    for (let O = 0; O < b; O++)
      I += y[O]?.rowHeight || ne;
    return I;
  }, [
    w,
    y,
    ne,
    c,
    R,
    we,
    Ee.d,
    Me
  ]), We = C(() => u && f ? Ae + be + _e >= f - (pe >= (u || 0) ? W : 0) : !1, [
    u,
    f,
    Ae,
    be,
    _e,
    pe,
    W
  ]), et = C(() => H && pe <= (u || 0) ? (u || 0) - 0 - (We ? W : 0) : pe, [H, pe, u, We, W, Le]), P = C(() => H && pe <= (u || 0) ? u || 0 : et < (u || 0) ? pe + (We ? W : 0) : -1, [H, pe, u, et, We, W]), X = z({});
  F(() => {
    if (w && (X.current.start !== Ee.start || X.current.end !== Ee.end)) {
      const { start: b, end: I } = Ee;
      X.current = { start: b, end: I }, h && h.exec && h.exec("request-data", { row: { start: b, end: I } });
    }
  }, [w, Ee, h]);
  const Z = C(() => w ? y || [] : (y || []).slice(Ee.start, Ee.end), [w, y, Ee]), he = C(() => (D || []).filter(
    (b) => (Z || []).some((I) => I.id === b)
  ), [S, Z]), Re = C(() => Ee.start, [Ee.start]), De = E((b) => {
    ve(b.target.scrollTop), K(b.target.scrollLeft);
  }, []), Fe = E((b) => {
    b.shiftKey && b.preventDefault(), ye.current && ye.current.focus && ye.current.focus();
  }, []), je = E(() => !!(x || []).find((b) => !!b.draggable), [x]), Ot = z(null), ft = z(null), Pn = z({
    dblclick: (b, I) => {
      const O = { id: b, column: Zn(I, "data-col-id") };
      h.exec("open-editor", O);
    },
    click: (b, I) => {
      if (Ot.current) return;
      const O = Zn(I, "data-col-id");
      if (_?.id !== b && h.exec("focus-cell", {
        row: b,
        column: O,
        eventSource: "click"
      }), N === !1) return;
      const me = s && I.ctrlKey, He = s && I.shiftKey;
      (me || D.length > 1 || !D.includes(b)) && h.exec("select-row", { id: b, toggle: me, range: He });
    },
    "toggle-row": (b) => {
      const I = h.getRow(b);
      h.exec(I.open !== !1 ? "close-row" : "open-row", { id: b });
    },
    "ignore-click": () => !1
  }), Nt = C(() => ({
    top: be,
    bottom: _e,
    left: Q.width,
    xScroll: Le,
    yScroll: We,
    sense: c && G ? G.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: ye.current && ye.current.firstElementChild
  }), [
    be,
    _e,
    Q.width,
    Le,
    We,
    c,
    G,
    v
  ]);
  function an(b, I) {
    const { container: O, sourceNode: me, from: He } = I;
    if (je() && !me.getAttribute("draggable-data"))
      return !1;
    se(He), h.getRow(He).open && h.exec("close-row", { id: He, nested: !0 });
    const ke = Ue(me, "data-id"), ge = ke.cloneNode(!0);
    ge.classList.remove("wx-selected"), ge.querySelectorAll("[tabindex]").forEach((Ye) => Ye.setAttribute("tabindex", "-1")), O.appendChild(ge), ae(ge);
    const Oe = de - fe.d, ze = We ? W : 0;
    O.style.width = Math.min(
      (u || 0) - ze,
      H && pe <= (u || 0) ? et : et - ze
    ) + Oe + "px";
    const Ge = bn(ke);
    I.offset = {
      x: Oe,
      y: -Math.round(Ge.height / 2)
    }, ft.current || (ft.current = b.clientY);
  }
  function ln(b, I) {
    const { from: O } = I, me = I.pos, He = bn(ye.current);
    me.x = He.x;
    const ke = Nt.top;
    if (me.y < ke) me.y = ke;
    else {
      const ge = He.height - (Le && W > 0 ? W : Math.round(Nt.sense / 2)) - Nt.bottom;
      me.y > ge && (me.y = ge);
    }
    if (ye.current.contains(I.targetNode)) {
      const ge = Ue(I.targetNode, "data-id"), Oe = Lt(ge?.getAttribute("data-id"));
      if (Oe && Oe !== O) {
        I.to = Oe;
        const ze = c ? G?.offsetHeight : v?.rowHeight;
        if (G && (ce === 0 || me.y > ke + ze - 1)) {
          const Ge = ge.getBoundingClientRect(), Ye = bn(G).y, qe = Ge.y, Dt = Ye > qe ? -1 : 1, Vt = Dt === 1 ? "after" : "before", Gt = Math.abs(h.getRowIndex(O) - h.getRowIndex(Oe)), fn = Gt !== 1 ? Vt === "before" ? "after" : "before" : Vt;
          if (Gt === 1 && (Dt === -1 && b.clientY > ft.current || Dt === 1 && b.clientY < ft.current))
            return;
          ft.current = b.clientY, h.exec("move-item", {
            id: O,
            target: Oe,
            mode: fn,
            inProgress: !0
          });
        }
      }
      o && o({ event: b, context: I });
    }
    _c(b, He, I, Nt);
  }
  function cn(b, I) {
    const { from: O, to: me } = I;
    h.exec("move-item", {
      id: O,
      target: me,
      inProgress: !1
    }), Ot.current = setTimeout(() => {
      Ot.current = 0;
    }, 1), se(null), ae(null), ft.current = null, Lo(I);
  }
  function Ft() {
    const b = document.createElement("div");
    b.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(b);
    const I = b.offsetWidth - b.clientWidth;
    return document.body.removeChild(b), I;
  }
  const dn = C(() => P > 0 ? { width: `${P}px` } : void 0, [P]), Yt = z(null);
  function un() {
    Promise.resolve().then(() => {
      let b = 0, I = Re;
      const O = Yt.current;
      O && (Array.from(O.children).forEach((me, He) => {
        Ne.current[Re + He] = me.offsetHeight, b += me.offsetHeight, I++;
      }), xe(b), Pe(I));
    });
  }
  F(() => {
    Z && c && un();
  }, [Z, c, Re]);
  let [it, Tt] = B();
  F(() => {
    if (_ && (!N || !he.length || he.includes(_.row)))
      Tt({ ..._ });
    else if (Z.length && fe.data.length) {
      if (!it || he.length && !he.includes(it.row) || Z.findIndex((b) => b.id == it.row) === -1 || fe.data.findIndex(
        (b) => b.id == it.column && !b.collapsed
      ) === -1) {
        const b = he[0] || Z[0].id, I = fe.data.findIndex((O) => !O.collapsed);
        Tt(I !== -1 ? { row: b, column: fe.data[I].id } : null);
      }
    } else Tt(null);
  }, [_]);
  const $ = z(null);
  F(() => {
    const b = ye.current;
    if (!b) return;
    const I = yc(b, d);
    return () => {
      typeof I == "function" && I();
    };
  }, [d]);
  const Y = z({});
  Object.assign(Y.current, {
    start: an,
    move: ln,
    end: cn,
    getReorder: () => M,
    getDraggableInfo: () => ({ hasDraggable: je() })
  }), F(() => {
    const b = ye.current;
    return b ? bc(b, Y).destroy : void 0;
  }, [M, ye.current]), F(() => {
    const b = ye.current;
    return b ? Tr(b, {
      keys: m !== !1 && {
        ...ec,
        "ctrl+z": L,
        "ctrl+y": L,
        ...m
      },
      exec: (I) => h.exec("hotkey", I)
    }).destroy : void 0;
  }, [h, L, m]);
  const q = z({
    scroll: h.getReactiveState().scroll
  });
  q.current.getWidth = () => (u || 0) - (We ? W : 0), q.current.getHeight = () => j, q.current.getScrollMargin = () => Q.width + ie.width, F(() => {
    tc($.current, q.current);
  }, []);
  const le = z(null);
  F(() => {
    const b = le.current;
    if (!b) return;
    const I = [];
    return I.push(
      en(b, () => h.exec("focus-cell", { eventSource: "click" })).destroy
    ), I.push(li(b, Pn.current)), () => I.forEach((O) => O());
  }, []);
  const re = `wx-grid ${p ? `wx-responsive-${p}` : ""}`;
  return /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-4VuBwK2D " + re,
        style: {
          "--header-height": `${be}px`,
          "--footer-height": `${_e}px`,
          "--split-left-width": `${Q.width}px`,
          "--split-right-width": `${ie.width}px`
        },
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: ye,
            className: "wx-4VuBwK2D wx-table-box",
            style: dn,
            role: V ? "treegrid" : "grid",
            "aria-colcount": fe.data.length,
            "aria-rowcount": Z.length,
            "aria-multiselectable": V && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ U(
              "div",
              {
                ref: $,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: Le ? "scroll" : "hidden",
                  overflowY: We ? "scroll" : "hidden"
                },
                onScroll: De,
                children: [
                  e ? /* @__PURE__ */ g("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ g(
                    ws,
                    {
                      contentWidth: et,
                      deltaLeft: fe.dh,
                      columns: fe.header,
                      columnStyle: i,
                      bodyHeight: j - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ U(
                    "div",
                    {
                      ref: le,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${et}px`, height: `${Ae}px` },
                      onMouseDown: (b) => Fe(b),
                      children: [
                        r ? /* @__PURE__ */ g(Pc, { overlay: r }) : null,
                        /* @__PURE__ */ g(
                          "div",
                          {
                            ref: Yt,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Ee.d}px`,
                              paddingLeft: `${fe.d}px`
                            },
                            children: Z.map((b, I) => {
                              const O = D.indexOf(b.id) !== -1, me = ue === b.id, He = "wx-row" + (c ? " wx-autoheight" : "") + (a ? " " + a(b) : "") + (O ? " wx-selected" : "") + (me ? " wx-inactive" : ""), ke = c ? { minHeight: `${b.rowHeight || ne}px` } : { height: `${b.rowHeight || ne}px` };
                              return /* @__PURE__ */ g(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + He,
                                  "data-id": b.id,
                                  "data-context-id": b.id,
                                  style: ke,
                                  role: "row",
                                  "aria-rowindex": I,
                                  "aria-expanded": b.open,
                                  "aria-level": V ? b.$level + 1 : void 0,
                                  "aria-selected": V ? O : void 0,
                                  tabIndex: -1,
                                  children: fe.data.map((ge) => ge.collapsed ? /* @__PURE__ */ g(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    ge.id
                                  ) : T?.id === b.id && T.column == ge.id ? /* @__PURE__ */ g(Vc, { row: b, column: ge }, ge.id) : /* @__PURE__ */ g(
                                    Mc,
                                    {
                                      row: b,
                                      column: ge,
                                      columnStyle: i,
                                      cellStyle: l,
                                      reorder: M,
                                      focusable: it?.row === b.id && it?.column == ge.id
                                    },
                                    ge.id
                                  ))
                                },
                                b.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ g(
                    ws,
                    {
                      type: "footer",
                      contentWidth: et,
                      deltaLeft: fe.df,
                      columns: fe.footer,
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
    A ? /* @__PURE__ */ g(
      Bc,
      {
        config: A,
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
const Kc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Uc = $t(function({
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
  undo: S = !1,
  hotkeys: N = null,
  ...T
}, V) {
  const _ = z();
  _.current = T;
  const A = C(() => new Ul(Es), []), L = C(() => A.in, [A]), M = z(null);
  M.current === null && (M.current = new zs((Q, ie) => {
    const J = "on" + Kc(Q);
    _.current && _.current[J] && _.current[J](ie);
  }), L.setNext(M.current));
  const R = C(
    () => ({
      getState: A.getState.bind(A),
      getReactiveState: A.getReactive.bind(A),
      getStores: () => ({ data: A }),
      exec: L.exec,
      setNext: (Q) => (M.current = M.current.setNext(Q), M.current),
      intercept: L.intercept.bind(L),
      on: L.on.bind(L),
      detach: L.detach.bind(L),
      getRow: A.getRow.bind(A),
      getRowIndex: A.getRowIndex.bind(A),
      getColumn: A.getColumn.bind(A)
    }),
    [A, L]
  ), [W, oe] = B(0), [de, K] = B(0), [ce, ve] = B(null), [H, ne] = B(null), ye = C(() => {
    if (y && !e.length && t.length) {
      const Q = t[0], ie = [];
      for (let J in Q)
        if (J !== "id" && J[0] !== "$") {
          let pe = {
            id: J,
            header: J[0].toUpperCase() + J.slice(1)
          };
          typeof y == "object" && (pe = { ...pe, ...y }), ie.push(pe);
        }
      return ie;
    }
    return (H && H.columns) ?? e;
  }, [y, e, t, H]), ue = C(
    () => (H && H.sizes) ?? h,
    [H, h]
  ), se = E(
    (Q) => {
      if (oe(Q.width), K(Q.height), v) {
        const ie = Object.keys(v).map(Number).sort((J, pe) => J - pe).find((J) => Q.width <= J) ?? null;
        ie !== ce && (ne(v[ie]), ve(ie));
      }
    },
    [v, ce]
  ), G = $e(Je.theme), ae = z(0);
  return F(() => {
    if (!ae.current)
      k && k(R);
    else {
      const Q = A.getState();
      A.init({
        data: t,
        columns: ye,
        split: w || Q.split,
        sizes: ue || Q.sizes,
        selectedRows: o || Q.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: D || Q.sortMarks,
        undo: S,
        reorder: f,
        _skin: G,
        _select: a
      });
    }
    ae.current++;
  }, [
    A,
    t,
    ye,
    w,
    ue,
    o,
    d,
    x,
    D,
    S,
    f,
    G,
    a,
    k,
    R
  ]), ae.current === 0 && A.init({
    data: t,
    columns: ye,
    split: w || { left: 0 },
    sizes: ue || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: D || {},
    undo: S,
    reorder: f,
    _skin: G,
    select: a
  }), _t(
    V,
    () => ({
      ...R
    }),
    [R]
  ), /* @__PURE__ */ g(tt.Provider, { value: R, children: /* @__PURE__ */ g(Rn, { words: sc, optional: !0, children: /* @__PURE__ */ g(
    jc,
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
      clientWidth: W,
      clientHeight: de,
      responsiveLevel: ce,
      resize: se,
      hotkeys: N
    }
  ) }) });
});
function qc({ item: t }) {
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
function Xc({ columns: t = null, api: e, children: n }) {
  F(() => {
    lc("table-header", qc);
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
  const a = at(e, "_columns"), i = C(() => {
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
    Ro,
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
hr(Ze);
function Qc({ row: t, column: e }) {
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
function ys({ column: t, cell: e }) {
  const n = C(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ g("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ g(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function Zc(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: a,
    multiTaskRows: i = !1,
    rowMapping: l = null
  } = t, [c, d] = Ve(o), [u, f] = B(), p = $e(Je.i18n), m = C(() => p.getGroup("gantt"), [p]), h = $e(wt), w = ee(h, "scrollTop"), x = ee(h, "cellHeight"), y = ee(h, "_scrollTask"), k = ee(h, "_selected"), v = ee(h, "area"), D = ee(h, "_tasks"), S = ee(h, "_scales"), N = ee(h, "columns"), T = ee(h, "_sort"), V = ee(h, "calendar"), _ = ee(h, "durationUnit"), A = ee(h, "splitTasks"), [L, M] = B(null), R = C(() => !D || !v ? [] : i && l ? D : D.slice(v.start, v.end), [D, v, i, l]), W = E(
    (P, X) => {
      if (X === "add-task")
        h.exec(X, {
          target: P,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (X === "open-task") {
        const Z = R.find((he) => he.id === P);
        (Z?.data || Z?.lazy) && h.exec(X, { id: P, mode: !Z.open });
      }
    },
    [R]
  ), oe = E(
    (P) => {
      const X = vt(P), Z = P.target.dataset.action;
      Z && P.preventDefault(), X ? Z === "add-task" || Z === "open-task" ? W(X, Z) : h.exec("select-task", {
        id: X,
        toggle: P.ctrlKey || P.metaKey,
        range: P.shiftKey,
        show: !0
      }) : Z === "add-task" && W(null, Z);
    },
    [h, W]
  ), de = z(null), K = z(null), [ce, ve] = B(0), [H, ne] = B(!1);
  F(() => {
    const P = K.current;
    if (!P || typeof ResizeObserver > "u") return;
    const X = () => ve(P.clientWidth);
    X();
    const Z = new ResizeObserver(X);
    return Z.observe(P), () => Z.disconnect();
  }, []);
  const ye = z(null), ue = E(
    (P) => {
      const X = P.id, { before: Z, after: he } = P, Re = P.onMove;
      let De = Z || he, Fe = Z ? "before" : "after";
      if (Re) {
        if (Fe === "after") {
          const je = h.getTask(De);
          je.data?.length && je.open && (Fe = "before", De = je.data[0].id);
        }
        ye.current = { id: X, [Fe]: De };
      } else ye.current = null;
      h.exec("move-task", {
        id: X,
        mode: Fe,
        target: De,
        inProgress: Re
      });
    },
    [h]
  ), se = C(() => i && l ? 0 : v?.from ?? 0, [v, i, l]), G = C(() => S?.height ?? 0, [S]), ae = C(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ce ?? 0), [n, s, c, r, ce]), Q = C(() => {
    const P = {};
    return ae && s === "all" || s === "grid" && ae ? P.width = c : s === "grid" && (P.width = "100%"), P;
  }, [ae, s, c]), ie = C(() => L && !R.find((P) => P.id === L.id) ? [...R, L] : R, [R, L]), J = C(() => {
    if (!i || !l) return ie;
    const P = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set();
    return ie.forEach((Z) => {
      const he = l.taskRows.get(Z.id) ?? Z.id;
      X.has(he) || (P.set(he, {
        ...Z,
        $rowTasks: l.rowMap.get(he) || [Z.id]
      }), X.add(he));
    }), Array.from(P.values());
  }, [ie, i, l]), pe = C(() => {
    let P = (N || []).map((he) => {
      he = { ...he };
      const Re = he.header;
      if (typeof Re == "object") {
        const De = Re.text && m(Re.text);
        he.header = { ...Re, text: De };
      } else he.header = m(Re);
      return he;
    });
    const X = P.findIndex((he) => he.id === "text"), Z = P.findIndex((he) => he.id === "add-task");
    if (X !== -1 && (P[X].cell && (P[X]._cell = P[X].cell), P[X].cell = Qc), Z !== -1) {
      P[Z].cell = P[Z].cell || ys;
      const he = P[Z].header;
      if (typeof he != "object" && (P[Z].header = { text: he }), P[Z].header.cell = he.cell || ys, e)
        P.splice(Z, 1);
      else if (n) {
        const [Re] = P.splice(Z, 1);
        P.unshift(Re);
      }
    }
    return P.length > 0 && (P[P.length - 1].resize = !1), P;
  }, [N, m, e, n]), Te = C(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : pe.find((P) => P.id === "add-task") ? "50px" : "0", [s, r, pe]), te = C(() => {
    if (J && T?.length) {
      const P = {};
      return T.forEach(({ key: X, order: Z }, he) => {
        P[X] = {
          order: Z,
          ...T.length > 1 && { index: he }
        };
      }), P;
    }
    return {};
  }, [J, T]), fe = E(() => pe.some((P) => P.flexgrow && !P.hidden), []), be = C(() => fe(), [fe, H]), _e = C(() => {
    let P = s === "chart" ? pe.filter((Z) => Z.id === "add-task") : pe;
    const X = s === "all" ? r : ce;
    if (!be) {
      let Z = c, he = !1;
      if (pe.some((Re) => Re.$width)) {
        let Re = 0;
        Z = pe.reduce((De, Fe) => (Fe.hidden || (Re += Fe.width, De += Fe.$width || Fe.width), De), 0), Re > Z && Z > X && (he = !0);
      }
      if (he || Z < X) {
        let Re = 1;
        return he || (Re = (X - 50) / (Z - 50 || 1)), P.map((De) => (De.id !== "add-task" && !De.hidden && (De.$width || (De.$width = De.width), De.width = De.$width * Re), De));
      }
    }
    return P;
  }, [s, pe, be, c, r, ce]), Le = E(
    (P) => {
      if (!fe()) {
        const X = _e.reduce((Z, he) => (P && he.$width && (he.$width = he.width), Z + (he.hidden ? 0 : he.width)), 0);
        X !== c && d(X);
      }
      ne(!0), ne(!1);
    },
    [fe, _e, c, d]
  ), j = E(() => {
    pe.filter((X) => X.flexgrow && !X.hidden).length === 1 && pe.forEach((X) => {
      X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
    });
  }, []), Se = E(
    (P) => {
      if (!e) {
        const X = vt(P), Z = Zn(P, "data-col-id");
        !(Z && pe.find((Re) => Re.id == Z))?.editor && X && h.exec("show-editor", { id: X });
      }
    },
    [h, e]
    // cols is defined later; relies on latest value at call time
  ), Ne = C(
    () => Array.isArray(k) ? k.map((P) => P.id) : [],
    [k]
  ), we = z(se);
  we.current = se, F(() => {
    const P = (Z) => {
      if (de.current) {
        const he = de.current.querySelector(".wx-body");
        he && (he.style.top = -((Z ?? 0) - (we.current ?? 0)) + "px");
      }
      K.current && (K.current.scrollTop = 0);
    };
    return P(w), h.on("scroll-chart", ({ top: Z }) => {
      Z !== void 0 && P(Z);
    });
  }, [h, w]), F(() => {
    if (de.current) {
      const P = de.current.querySelector(".wx-body");
      P && (P.style.top = -((w ?? 0) - (se ?? 0)) + "px");
    }
  }, [se]), F(() => {
    const P = de.current;
    if (!P) return;
    const X = P.querySelector(".wx-table-box .wx-body");
    if (!X || typeof ResizeObserver > "u") return;
    const Z = new ResizeObserver(() => {
      if (de.current) {
        const he = de.current.querySelector(".wx-body");
        he && (he.style.top = -((w ?? 0) - (we.current ?? 0)) + "px");
      }
    });
    return Z.observe(X), () => {
      Z.disconnect();
    };
  }, [_e, Q, s, Te, J, w]), F(() => {
    if (!y || !u) return;
    const { id: P } = y, X = u.getState().focusCell;
    X && X.row !== P && de.current && de.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: P,
      column: X.column
    });
  }, [y, u]);
  const xe = E(
    ({ id: P }) => {
      if (e) return !1;
      h.getTask(P).open && h.exec("open-task", { id: P, mode: !1 });
      const X = h.getState()._tasks.find((Z) => Z.id === P);
      if (M(X || null), !X) return !1;
    },
    [h, e]
  ), Me = E(
    ({ id: P, top: X }) => {
      ye.current ? ue({ ...ye.current, onMove: !1 }) : h.exec("drag-task", {
        id: P,
        top: X + (se ?? 0),
        inProgress: !1
      }), M(null);
    },
    [h, ue, se]
  ), Pe = E(
    ({ id: P, top: X, detail: Z }) => {
      Z && ue({ ...Z, onMove: !0 }), h.exec("drag-task", {
        id: P,
        top: X + (se ?? 0),
        inProgress: !0
      });
    },
    [h, ue, se]
  );
  F(() => {
    const P = de.current;
    return P ? rc(P, {
      start: xe,
      end: Me,
      move: Pe,
      getTask: h.getTask
    }).destroy : void 0;
  }, [h, xe, Me, Pe]);
  const Ee = E(
    (P) => {
      const { key: X, isInput: Z } = P;
      if (!Z && (X === "arrowup" || X === "arrowdown"))
        return P.eventSource = "grid", h.exec("hotkey", P), !1;
      if (X === "enter") {
        const he = u?.getState().focusCell;
        if (he) {
          const { row: Re, column: De } = he;
          De === "add-task" ? W(Re, "add-task") : De === "text" && W(Re, "open-task");
        }
      }
    },
    [h, W, u]
  ), Ae = z(null), We = () => {
    Ae.current = {
      setTableAPI: f,
      handleHotkey: Ee,
      sortVal: T,
      api: h,
      adjustColumns: j,
      setColumnWidth: Le,
      tasks: R,
      calendarVal: V,
      durationUnitVal: _,
      splitTasksVal: A,
      onTableAPIChange: a
    };
  };
  We(), F(() => {
    We();
  }, [
    f,
    Ee,
    T,
    h,
    j,
    Le,
    R,
    V,
    _,
    A,
    a
  ]);
  const et = E((P) => {
    f(P), P.intercept("hotkey", (X) => Ae.current.handleHotkey(X)), P.intercept("scroll", () => !1), P.intercept("select-row", () => !1), P.intercept("sort-rows", (X) => {
      const Z = Ae.current.sortVal, { key: he, add: Re } = X, De = Z ? Z.find((je) => je.key === he) : null;
      let Fe = "asc";
      return De && (Fe = !De || De.order === "asc" ? "desc" : "asc"), h.exec("sort-tasks", {
        key: he,
        order: Fe,
        add: Re
      }), !1;
    }), P.on("resize-column", () => {
      Ae.current.setColumnWidth(!0);
    }), P.on("hide-column", (X) => {
      X.mode || Ae.current.adjustColumns(), Ae.current.setColumnWidth();
    }), P.intercept("update-cell", (X) => {
      const { id: Z, column: he, value: Re } = X, De = Ae.current.tasks.find((Fe) => Fe.id === Z);
      if (De) {
        const Fe = { ...De };
        let je = Re;
        je && !isNaN(je) && !(je instanceof Date) && (je *= 1), Fe[he] = je, wo(
          Fe,
          {
            calendar: Ae.current.calendarVal,
            durationUnit: Ae.current.durationUnitVal,
            splitTasks: Ae.current.splitTasksVal
          },
          he
        ), h.exec("update-task", {
          id: Z,
          task: Fe
        });
      }
      return !1;
    }), a && a(P);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Te}` },
      ref: K,
      children: /* @__PURE__ */ g(
        "div",
        {
          ref: de,
          style: Q,
          className: "wx-rHj6070p wx-table",
          onClick: oe,
          onDoubleClick: Se,
          children: /* @__PURE__ */ g(
            Uc,
            {
              init: et,
              sizes: {
                rowHeight: x,
                headerHeight: (G ?? 0) - 1
              },
              rowStyle: (P) => P.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (P) => `wx-rHj6070p wx-text-${P.align}${P.id === "add-task" ? " wx-action" : ""}`,
              data: J,
              columns: _e,
              selectedRows: [...Ne],
              sortMarks: te
            }
          )
        }
      )
    }
  );
}
function Jc({ borders: t = "" }) {
  const e = $e(wt), n = ee(e, "cellWidth"), r = ee(e, "cellHeight"), s = z(null), [o, a] = B("#e4e4e4");
  F(() => {
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
    background: n != null && r != null ? `url(${al(n, r, o, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ g("div", { ref: s, style: i });
}
function ed({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = $e(wt), s = ee(r, "_links"), o = ee(r, "criticalPath"), a = z(null), i = E(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return F(() => {
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
function td(t) {
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
let Kn = [], vs = null, jt = null;
const nd = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, a = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, i = Math.floor(t / r);
  return new Date(n.getTime() + i * a * o);
}, ks = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, a = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / a);
}, bs = (t, e, n) => {
  if (!n || !t) return t;
  const { lengthUnit: r } = n, a = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return new Date(t.getTime() + e * a);
};
function rd(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: a = !1
  } = t, i = $e(wt), [l, c] = qt(i, "_tasks"), [d, u] = qt(i, "_links"), f = ee(i, "area"), p = ee(i, "_scales"), m = ee(i, "taskTypes"), h = ee(i, "baselines"), [w, x] = qt(i, "_selected"), y = ee(i, "_scrollTask"), k = ee(i, "criticalPath"), v = ee(i, "tasks"), D = ee(i, "schedule"), S = ee(i, "splitTasks"), N = C(() => {
    if (!f || !Array.isArray(l)) return [];
    const $ = f.start ?? 0, Y = f.end ?? 0;
    return r && s ? l.map((q) => ({ ...q })) : l.slice($, Y).map((q) => ({ ...q }));
  }, [c, f, r, s]), T = ee(i, "cellHeight"), V = C(() => {
    if (!r || !s || !N.length) return N;
    const $ = /* @__PURE__ */ new Map(), Y = [];
    return l.forEach((q) => {
      const le = s.taskRows.get(q.id) ?? q.id;
      $.has(le) || ($.set(le, Y.length), Y.push(le));
    }), N.map((q) => {
      const le = s.taskRows.get(q.id) ?? q.id, re = $.get(le) ?? 0;
      return {
        ...q,
        $y: re * T,
        $y_base: q.$y_base !== void 0 ? re * T : void 0
      };
    });
  }, [N, r, s, l, T]), _ = C(
    () => p.lengthUnitWidth,
    [p]
  ), A = C(
    () => p.lengthUnit || "day",
    [p]
  ), L = z(!1), [M, R] = B(void 0), [W, oe] = B(null), de = z(null), [K, ce] = B(null), [ve, H] = B(void 0), ne = z(null), [ye, ue] = B(0), [se, G] = B(null), ae = z(null), [Q, ie] = B(null), [J, pe] = B(null), Te = z(null), te = C(() => {
    const $ = Te.current;
    return !!(w.length && $ && $.contains(document.activeElement));
  }, [w, Te.current]), fe = C(() => te && w[w.length - 1]?.id, [te, w]);
  F(() => {
    if (y && te && y) {
      const { id: $ } = y, Y = Te.current?.querySelector(
        `.wx-bar[data-id='${$}']`
      );
      Y && Y.focus({ preventScroll: !0 });
    }
  }, [y]), F(() => {
    const $ = Te.current;
    if ($ && (ue($.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const Y = new ResizeObserver((q) => {
        q[0] && ue(q[0].contentRect.width);
      });
      return Y.observe($), () => Y.disconnect();
    }
  }, [Te.current]);
  const be = E(() => {
    document.body.style.userSelect = "none";
  }, []), _e = E(() => {
    document.body.style.userSelect = "";
  }, []), Le = E(
    ($, Y, q) => {
      if (Y.target.classList.contains("wx-line") || (q || (q = i.getTask(yt($))), q.type === "milestone" || q.type === "summary")) return "";
      const le = Ue(Y, "data-segment");
      le && ($ = le);
      const { left: re, width: b } = $.getBoundingClientRect(), I = (Y.clientX - re) / b;
      let O = 0.2 / (b > 200 ? b / 200 : 1);
      return I < O ? "start" : I > 1 - O ? "end" : "";
    },
    [i]
  ), j = C(() => {
    const $ = /* @__PURE__ */ new Map();
    if (!r || !s)
      return l.forEach((le) => {
        $.set(le.id, le.$y);
      }), $;
    const Y = /* @__PURE__ */ new Map(), q = [];
    return l.forEach((le) => {
      const re = s.taskRows.get(le.id) ?? le.id;
      Y.has(re) || (Y.set(re, q.length), q.push(re));
    }), l.forEach((le) => {
      const re = s.taskRows.get(le.id) ?? le.id, b = Y.get(re) ?? 0;
      $.set(le.id, b * T);
    }), $;
  }, [l, r, s, T]), Se = E(
    ($) => {
      if (!Te.current) return [];
      const q = Math.min($.startX, $.currentX), le = Math.max($.startX, $.currentX), re = Math.min($.startY, $.currentY), b = Math.max($.startY, $.currentY);
      return l.filter((I) => {
        const O = I.$x, me = I.$x + I.$w, ke = j.get(I.id) ?? I.$y, ge = ke + I.$h;
        return O < le && me > q && ke < b && ge > re;
      });
    },
    [l, j]
  ), Ne = C(() => new Set(w.map(($) => $.id)), [w, x]), we = E(
    ($) => Ne.has($),
    [Ne]
  ), xe = E(
    ($, Y) => {
      const { clientX: q } = Y, le = yt($), re = i.getTask(le), b = Y.target.classList;
      if (!Y.target.closest(".wx-delete-button") && !e) {
        if (b.contains("wx-progress-marker")) {
          const { progress: I } = i.getTask(le);
          de.current = {
            id: le,
            x: q,
            progress: I,
            dx: 0,
            node: $,
            marker: Y.target
          }, Y.target.classList.add("wx-progress-in-drag");
        } else {
          const I = Le($, Y, re) || "move", O = {
            id: le,
            mode: I,
            x: q,
            dx: 0,
            l: re.$x,
            w: re.$w
          };
          if (S && re.segments?.length) {
            const me = Ue(Y, "data-segment");
            me && (O.segmentIndex = me.dataset.segment * 1);
          }
          oe(O);
        }
        be();
      }
    },
    [i, e, Le, be, S]
  ), Me = E(
    ($) => {
      if ($.button !== 0) return;
      const Y = Ue($);
      if (!Y && o && !e) {
        const q = Te.current;
        if (!q) return;
        const le = q.getBoundingClientRect(), re = $.clientX - le.left, b = $.clientY - le.top;
        if (a) {
          const O = nd(re, p);
          O && pe(O);
        }
        const I = {
          startX: re,
          startY: b,
          currentX: re,
          currentY: b,
          ctrlKey: $.ctrlKey || $.metaKey
        };
        G(I), ae.current = I, be();
        return;
      }
      if (Y) {
        if (o && !e && w.length > 1) {
          const q = yt(Y);
          if (we(q)) {
            const le = $.target.classList;
            if (!le.contains("wx-link") && !le.contains("wx-progress-marker") && !$.target.closest(".wx-delete-button")) {
              const re = i.getTask(q);
              if (!Le(Y, $, re)) {
                const I = /* @__PURE__ */ new Map();
                w.forEach((O) => {
                  const me = i.getTask(O.id);
                  if (me) {
                    if (D?.auto && me.type === "summary") return;
                    I.set(O.id, {
                      $x: me.$x,
                      $w: me.$w,
                      start: me.start,
                      end: me.end
                    });
                  }
                }), ie({
                  baseTaskId: q,
                  startX: $.clientX,
                  dx: 0,
                  originalPositions: I
                }), be();
                return;
              }
            }
          }
        }
        xe(Y, $);
      }
    },
    [xe, o, a, e, w, we, i, Le, D, be, p]
  ), Pe = E(
    ($) => {
      const Y = Ue($);
      Y && (ne.current = setTimeout(() => {
        H(!0), xe(Y, $.touches[0]);
      }, 300));
    },
    [xe]
  ), Ee = E(
    ($) => {
      ce($ && { ...d.find((Y) => Y.id === $) });
    },
    [d]
  ), Ae = E(() => {
    const $ = ae.current;
    if ($) {
      const Y = Se($);
      $.ctrlKey ? Y.forEach((q) => {
        i.exec("select-task", { id: q.id, toggle: !0, marquee: !0 });
      }) : Y.length > 0 && (w.length > 0 && i.exec("select-task", { id: null, marquee: !0 }), Y.forEach((q, le) => {
        i.exec("select-task", {
          id: q.id,
          toggle: le > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), G(null), ae.current = null, _e(), L.current = !0;
      return;
    }
    if (Q) {
      const { dx: Y, originalPositions: q } = Q, le = Math.round(Y / _);
      if (le !== 0) {
        let re = !0;
        q.forEach((b, I) => {
          const O = i.getTask(I);
          O && (i.exec("update-task", {
            id: I,
            diff: le,
            task: { start: O.start, end: O.end },
            skipUndo: !re
            // Only first task creates undo entry
          }), re = !1);
        }), L.current = !0;
      } else
        q.forEach((re, b) => {
          i.exec("drag-task", {
            id: b,
            left: re.$x,
            width: re.$w,
            inProgress: !1
          });
        });
      ie(null), _e();
      return;
    }
    if (de.current) {
      const { dx: Y, id: q, marker: le, value: re } = de.current;
      de.current = null, typeof re < "u" && Y && i.exec("update-task", {
        id: q,
        task: { progress: re },
        inProgress: !1
      }), le.classList.remove("wx-progress-in-drag"), L.current = !0, _e();
    } else if (W) {
      const { id: Y, mode: q, dx: le, l: re, w: b, start: I, segment: O, index: me } = W;
      if (oe(null), I) {
        const He = Math.round(le / _);
        if (!He)
          i.exec("drag-task", {
            id: Y,
            width: b,
            left: re,
            inProgress: !1,
            ...O && { segmentIndex: me }
          });
        else {
          let ke = {}, ge = i.getTask(Y);
          O && (ge = ge.segments[me]);
          const Oe = 1440 * 60 * 1e3, Ge = He * (A === "week" ? 7 : A === "month" ? 30 : A === "quarter" ? 91 : A === "year" ? 365 : 1) * Oe;
          q === "move" ? (ke.start = new Date(ge.start.getTime() + Ge), ke.end = new Date(ge.end.getTime() + Ge)) : q === "start" ? (ke.start = new Date(ge.start.getTime() + Ge), ke.end = ge.end) : q === "end" && (ke.start = ge.start, ke.end = new Date(ge.end.getTime() + Ge)), i.exec("update-task", {
            id: Y,
            task: ke,
            ...O && { segmentIndex: me }
          });
        }
        L.current = !0;
      }
      _e();
    }
  }, [i, _e, W, _, A, se, Q, Se, w]), We = E(
    ($, Y) => {
      const { clientX: q, clientY: le } = Y;
      if (!e) {
        if (se) {
          const re = Te.current;
          if (!re) return;
          const b = re.getBoundingClientRect(), I = q - b.left, O = le - b.top;
          G((me) => ({
            ...me,
            currentX: I,
            currentY: O
          })), ae.current && (ae.current.currentX = I, ae.current.currentY = O);
          return;
        }
        if (Q) {
          const re = q - Q.startX;
          Q.originalPositions.forEach((b, I) => {
            const O = b.$x + re;
            i.exec("drag-task", {
              id: I,
              left: O,
              width: b.$w,
              inProgress: !0
            });
          }), ie((b) => ({ ...b, dx: re }));
          return;
        }
        if (de.current) {
          const { node: re, x: b, id: I } = de.current, O = de.current.dx = q - b, me = Math.round(O / re.offsetWidth * 100);
          let He = de.current.progress + me;
          de.current.value = He = Math.min(
            Math.max(0, He),
            100
          ), i.exec("update-task", {
            id: I,
            task: { progress: He },
            inProgress: !0
          });
        } else if (W) {
          Ee(null);
          const { mode: re, l: b, w: I, x: O, id: me, start: He, segment: ke, index: ge } = W, Oe = i.getTask(me), ze = q - O;
          if (!He && Math.abs(ze) < 20 || re === "start" && I - ze < _ || re === "end" && I + ze < _ || re === "move" && (ze < 0 && b + ze < 0 || ze > 0 && b + I + ze > ye) || W.segment)
            return;
          const Ge = { ...W, dx: ze };
          let Ye, qe;
          if (re === "start" ? (Ye = b + ze, qe = I - ze) : re === "end" ? (Ye = b, qe = I + ze) : re === "move" && (Ye = b + ze, qe = I), i.exec("drag-task", {
            id: me,
            width: qe,
            left: Ye,
            inProgress: !0,
            ...ke && { segmentIndex: ge }
          }), !Ge.start && (re === "move" && Oe.$x == b || re !== "move" && Oe.$w == I)) {
            L.current = !0, Ae();
            return;
          }
          Ge.start = !0, oe(Ge);
        } else {
          const re = Ue($);
          if (re) {
            const b = i.getTask(yt(re)), O = Ue($, "data-segment") || re, me = Le(O, Y, b);
            O.style.cursor = me && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      e,
      W,
      _,
      ye,
      Le,
      Ee,
      Ae,
      se,
      Q
    ]
  ), et = E(
    ($) => {
      We($, $);
    },
    [We]
  ), P = E(
    ($) => {
      ve ? ($.preventDefault(), We($, $.touches[0])) : ne.current && (clearTimeout(ne.current), ne.current = null);
    },
    [ve, We]
  ), X = E(() => {
    Ae();
  }, [Ae]), Z = E(() => {
    H(null), ne.current && (clearTimeout(ne.current), ne.current = null), Ae();
  }, [Ae]);
  F(() => (window.addEventListener("mouseup", X), () => {
    window.removeEventListener("mouseup", X);
  }), [X]);
  const he = E(
    ($) => {
      if (!e) {
        const Y = vt($.target);
        if (Y && !$.target.classList.contains("wx-link")) {
          const q = vt($.target, "data-segment");
          i.exec("show-editor", {
            id: Y,
            ...q !== null && { segmentIndex: q }
          });
        }
      }
    },
    [i, e]
  ), Re = ["e2s", "s2s", "e2e", "s2e"], De = E(($, Y) => Re[($ ? 1 : 0) + (Y ? 0 : 2)], []), Fe = E(
    ($, Y) => {
      const q = M.id, le = M.start;
      return $ === q ? !0 : !!d.find((re) => re.target == $ && re.source == q && re.type === De(le, Y));
    },
    [M, u, De]
  ), je = E(() => {
    M && R(null);
  }, [M]), Ot = E(
    ($) => {
      if (L.current) {
        L.current = !1;
        return;
      }
      const Y = vt($.target);
      if (Y) {
        const q = $.target.classList;
        if (q.contains("wx-link")) {
          const le = q.contains("wx-left");
          if (!M) {
            R({ id: Y, start: le });
            return;
          }
          M.id !== Y && !Fe(Y, le) && i.exec("add-link", {
            link: {
              source: M.id,
              target: Y,
              type: De(M.start, le)
            }
          });
        } else if (q.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: K.id }), ce(null);
        else {
          let le;
          const re = Ue($, "data-segment");
          re && (le = re.dataset.segment * 1), i.exec("select-task", {
            id: Y,
            toggle: $.ctrlKey || $.metaKey,
            range: $.shiftKey,
            segmentIndex: le
          });
        }
      }
      je();
    },
    [
      i,
      M,
      u,
      K,
      Fe,
      De,
      je
    ]
  ), ft = E(($) => ({
    left: `${$.$x}px`,
    top: `${$.$y}px`,
    width: `${$.$w}px`,
    height: `${$.$h}px`
  }), []), Pn = E(($) => ({
    left: `${$.$x_base}px`,
    top: `${$.$y_base}px`,
    width: `${$.$w_base}px`,
    height: `${$.$h_base}px`
  }), []), Nt = E(
    ($) => {
      if (ve || ne.current)
        return $.preventDefault(), !1;
    },
    [ve]
  ), an = C(
    () => m.map(($) => $.id),
    [m]
  ), ln = E(
    ($) => {
      let Y = an.includes($) ? $ : "task";
      return ["task", "milestone", "summary"].includes($) || (Y = `task ${Y}`), Y;
    },
    [an]
  ), cn = E(
    ($) => {
      i.exec($.action, $.data);
    },
    [i]
  ), Ft = E(
    ($) => k && v.byId($).$critical,
    [k, v]
  ), dn = E(
    ($) => {
      if (D?.auto) {
        const Y = v.getSummaryId($, !0), q = v.getSummaryId(M.id, !0);
        return M?.id && !(Array.isArray(Y) ? Y : [Y]).includes(
          M.id
        ) && !(Array.isArray(q) ? q : [q]).includes($);
      }
      return M;
    },
    [D, v, M]
  ), Yt = z(null);
  Yt.current = J;
  const un = E(() => {
    const $ = i.getState()._selected;
    if (!$ || !$.length) return;
    const Y = $.map((I) => {
      const O = i.getTask(I.id);
      if (!O) return null;
      const { $x: me, $y: He, $w: ke, $h: ge, $skip: Oe, $level: ze, $index: Ge, $y_base: Ye, $x_base: qe, $w_base: Dt, $h_base: Vt, $skip_baseline: Gt, $critical: fn, $reorder: ht, ...pt } = O;
      return pt;
    }).filter(Boolean);
    if (!Y.length) return;
    const le = Y[0].parent, re = Y.filter((I) => I.parent === le);
    if (re.length === 0) return;
    const b = re.reduce((I, O) => O.start && (!I || O.start < I) ? O.start : I, null);
    Kn = re.map((I) => ({
      ...I,
      _startCellOffset: ks(I.start, b, p),
      _durationCells: ks(I.end, I.start, p)
    })), jt = le, vs = b;
  }, [i, p]), it = E(() => {
    const $ = Yt.current;
    if (!Kn.length || !$ || !vs || jt == null) return;
    const Y = i.getHistory();
    Y?.startBatch(), Kn.forEach((q, le) => {
      const re = `task-${Date.now()}-${le}`, b = bs($, q._startCellOffset || 0, p), I = bs(b, q._durationCells || 0, p);
      i.exec("add-task", {
        task: {
          ...q,
          id: re,
          start: b,
          end: I,
          // Keep original parent and row from copied task
          parent: jt,
          row: q.row
          // Each task keeps its own row
        },
        target: jt,
        mode: "child",
        skipUndo: le > 0
      });
    }), Y?.endBatch();
  }, [i]);
  F(() => a ? i.intercept("hotkey", (Y) => {
    if (Y.key === "ctrl+c" || Y.key === "meta+c")
      return un(), !1;
    if (Y.key === "ctrl+v" || Y.key === "meta+v")
      return it(), !1;
  }) : void 0, [a, i, un, it]);
  const Tt = C(() => {
    if (!se) return null;
    const $ = Math.min(se.startX, se.currentX), Y = Math.min(se.startY, se.currentY), q = Math.abs(se.currentX - se.startX), le = Math.abs(se.currentY - se.startY);
    return {
      left: `${$}px`,
      top: `${Y}px`,
      width: `${q}px`,
      height: `${le}px`
    };
  }, [se]);
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${V.length ? V[0].$h : 0}px` },
      ref: Te,
      onContextMenu: Nt,
      onMouseDown: Me,
      onMouseMove: et,
      onTouchStart: Pe,
      onTouchMove: P,
      onTouchEnd: Z,
      onClick: Ot,
      onDoubleClick: he,
      onDragStart: ($) => ($.preventDefault(), !1),
      children: [
        /* @__PURE__ */ g(
          ed,
          {
            onSelectLink: Ee,
            selectedLink: K,
            readonly: e
          }
        ),
        V.map(($) => {
          if ($.$skip && $.$skip_baseline) return null;
          const Y = `wx-bar wx-${ln($.type)}` + (ve && W && $.id === W.id ? " wx-touch" : "") + (M && M.id === $.id ? " wx-selected" : "") + (Ne.has($.id) ? " wx-selected" : "") + (Ft($.id) ? " wx-critical" : "") + ($.$reorder ? " wx-reorder-task" : "") + (S && $.segments ? " wx-split" : ""), q = "wx-link wx-left" + (M ? " wx-visible" : "") + (!M || !Fe($.id, !0) && dn($.id) ? " wx-target" : "") + (M && M.id === $.id && M.start ? " wx-selected" : "") + (Ft($.id) ? " wx-critical" : ""), le = "wx-link wx-right" + (M ? " wx-visible" : "") + (!M || !Fe($.id, !1) && dn($.id) ? " wx-target" : "") + (M && M.id === $.id && !M.start ? " wx-selected" : "") + (Ft($.id) ? " wx-critical" : "");
          return /* @__PURE__ */ U(Cs, { children: [
            !$.$skip && /* @__PURE__ */ U(
              "div",
              {
                className: "wx-GKbcLEGA " + Y,
                style: ft($),
                "data-tooltip-id": $.id,
                "data-id": $.id,
                tabIndex: fe === $.id ? 0 : -1,
                children: [
                  e ? null : $.id === K?.target && K?.type[2] === "s" ? /* @__PURE__ */ g(
                    ct,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + q, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  $.type !== "milestone" ? /* @__PURE__ */ U(Ie, { children: [
                    $.progress && !(S && $.segments) ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${$.progress}%` }
                      }
                    ) }) : null,
                    !e && !(S && $.segments) ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${$.progress}% - 10px)` },
                        children: $.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ g(n, { data: $, api: i, onAction: cn }) : S && $.segments ? /* @__PURE__ */ g(td, { task: $, type: ln($.type) }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: $.text || "" })
                  ] }) : /* @__PURE__ */ U(Ie, { children: [
                    /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ g(n, { data: $, api: i, onAction: cn }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-text-out", children: $.text })
                  ] }),
                  e ? null : $.id === K?.target && K?.type[2] === "e" ? /* @__PURE__ */ g(
                    ct,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + le, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            h && !$.$skip_baseline ? /* @__PURE__ */ g(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + ($.type === "milestone" ? " wx-milestone" : ""),
                style: Pn($)
              }
            ) : null
          ] }, $.id);
        }),
        se && Tt && /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: Tt })
      ]
    }
  );
}
function sd(t) {
  const { highlightTime: e } = t, n = $e(wt), r = ee(n, "_scales");
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
const od = /* @__PURE__ */ new Map();
function id(t) {
  const e = z(null), n = z(0), r = z(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, F(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        od.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function ad(t) {
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
  } = t, p = $e(wt), [m, h] = qt(p, "_selected"), w = ee(p, "scrollTop"), x = ee(p, "cellHeight"), y = ee(p, "cellWidth"), k = ee(p, "_scales"), v = ee(p, "_markers"), D = ee(p, "_scrollTask"), S = ee(p, "zoom"), N = ee(p, "_tasks"), [T, V] = B(), _ = z(null), A = z(0), L = z(!1), M = 1 + (k?.rows?.length || 0), R = C(() => {
    if (!i || !l || !N?.length) return null;
    const G = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Map(), Q = [];
    return N.forEach((ie) => {
      const J = l.taskRows.get(ie.id) ?? ie.id;
      ae.has(J) || (ae.set(J, Q.length), Q.push(J));
    }), N.forEach((ie) => {
      const J = l.taskRows.get(ie.id) ?? ie.id, pe = ae.get(J) ?? 0;
      G.set(ie.id, pe * x);
    }), G;
  }, [N, i, l, x]), W = C(() => {
    const G = [];
    return m && m.length && x && m.forEach((ae) => {
      const Q = R?.get(ae.id) ?? ae.$y;
      G.push({ height: `${x}px`, top: `${Q - 3}px` });
    }), G;
  }, [h, x, R]), oe = C(
    () => Math.max(T || 0, r),
    [T, r]
  );
  F(() => {
    const G = _.current;
    G && typeof w == "number" && (G.scrollTop = w);
  }, [w]);
  const de = () => {
    K();
  };
  function K(G) {
    const ae = _.current;
    if (!ae) return;
    const Q = {};
    Q.left = ae.scrollLeft, p.exec("scroll-chart", Q);
  }
  function ce() {
    const G = _.current, Q = Math.ceil((T || 0) / (x || 1)) + 1, ie = Math.floor((G && G.scrollTop || 0) / (x || 1)), J = Math.max(0, ie - M), pe = ie + Q + M, Te = J * (x || 0);
    p.exec("render-data", {
      start: J,
      end: pe,
      from: Te
    });
  }
  F(() => {
    ce();
  }, [T, w]);
  const ve = E(
    (G) => {
      if (!G) return;
      const { id: ae, mode: Q } = G;
      if (Q.toString().indexOf("x") < 0) return;
      const ie = _.current;
      if (!ie) return;
      const { clientWidth: J } = ie, pe = p.getTask(ae);
      if (pe.$x + pe.$w < ie.scrollLeft)
        p.exec("scroll-chart", { left: pe.$x - (y || 0) }), ie.scrollLeft = pe.$x - (y || 0);
      else if (pe.$x >= J + ie.scrollLeft) {
        const Te = J < pe.$w ? y || 0 : pe.$w;
        p.exec("scroll-chart", { left: pe.$x - J + Te }), ie.scrollLeft = pe.$x - J + Te;
      }
    },
    [p, y]
  );
  F(() => {
    ve(D);
  }, [D]);
  function H(G) {
    if (S && (G.ctrlKey || G.metaKey)) {
      G.preventDefault();
      const ae = _.current, Q = G.clientX - (ae ? ae.getBoundingClientRect().left : 0);
      if (A.current += G.deltaY, Math.abs(A.current) >= 150) {
        const J = -Math.sign(A.current);
        A.current = 0, p.exec("zoom-scale", {
          dir: J,
          offset: Q
        });
      }
    }
  }
  const ne = E((G) => {
    const ae = a(G.date, G.unit);
    return ae ? {
      css: ae,
      width: G.width
    } : null;
  }, [a]), ye = C(() => {
    if (!k || !a || !["hour", "day", "week"].includes(k.minUnit)) return null;
    let ae = 0;
    return k.rows[k.rows.length - 1].cells.map((Q) => {
      const ie = ne(Q), J = ae;
      return ae += Q.width, ie ? { ...ie, left: J } : null;
    });
  }, [k, a, ne]), ue = E(
    (G) => {
      G.eventSource = "chart", p.exec("hotkey", G);
    },
    [p]
  );
  F(() => {
    const G = _.current;
    if (!G) return;
    const ae = () => V(G.clientHeight);
    ae();
    const Q = new ResizeObserver(() => ae());
    return Q.observe(G), () => {
      Q.disconnect();
    };
  }, [_.current]);
  const se = z(null);
  return F(() => {
    const G = _.current;
    if (G && !se.current)
      return se.current = Tr(G, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (ae) => ue(ae)
      }), () => {
        se.current?.destroy(), se.current = null;
      };
  }, []), F(() => {
    const G = _.current;
    if (!G) return;
    const ae = H;
    return G.addEventListener("wheel", ae), () => {
      G.removeEventListener("wheel", ae);
    };
  }, [H]), F(() => {
    if (!u || L.current || !k || !_.current || !T) return;
    const G = _.current, { clientWidth: ae } = G, Q = /* @__PURE__ */ new Date(), ie = k.rows[k.rows.length - 1]?.cells;
    if (!ie) return;
    let J = -1, pe = 0;
    const Te = [];
    for (let fe = 0; fe < ie.length; fe++) {
      const be = ie[fe];
      Te.push({ left: pe, width: be.width });
      const _e = be.date;
      if (be.unit === "week") {
        const Le = new Date(_e);
        Le.setDate(Le.getDate() + 7), Q >= _e && Q < Le && (J = fe);
      } else be.unit === "day" && Q.getFullYear() === _e.getFullYear() && Q.getMonth() === _e.getMonth() && Q.getDate() === _e.getDate() && (J = fe);
      pe += be.width;
    }
    let te = J;
    if (J > 0 && (te = J - 1), te >= 0 && Te[te]) {
      const fe = Te[te], be = Math.max(0, fe.left);
      G.scrollLeft = be, p.exec("scroll-chart", { left: be }), L.current = !0;
    }
  }, [u, k, T, p]), id("chart"), /* @__PURE__ */ U(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: _,
      onScroll: de,
      children: [
        /* @__PURE__ */ g(sd, { highlightTime: a, scales: k }),
        v && v.length ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${oe}px` },
            children: v.map((G, ae) => /* @__PURE__ */ g(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${G.css || ""}`,
                style: { left: `${G.left}px` },
                children: /* @__PURE__ */ g("div", { className: "wx-mR7v2Xag wx-content", children: G.text })
              },
              ae
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
                    (G, ae) => G ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + G.css,
                        style: {
                          width: `${G.width}px`,
                          left: `${G.left}px`
                        }
                      },
                      ae
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ g(Jc, { borders: o }),
              m && m.length ? m.map(
                (G, ae) => G.$y ? /* @__PURE__ */ g(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": G.id,
                    style: W[ae]
                  },
                  G.id
                ) : null
              ) : null,
              /* @__PURE__ */ g(
                rd,
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
function ld(t) {
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
  } = t, [d, u] = Ve(t.value ?? 0), [f, p] = Ve(t.display ?? "all");
  function m(K) {
    let ce = 0;
    e == "center" ? ce = n / 2 : e == "before" && (ce = n);
    const ve = {
      size: [n + "px", "auto"],
      p: [K - ce + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let H in ve) ve[H] = ve[H].reverse();
    return ve;
  }
  const [h, w] = B(!1), [x, y] = B(null), k = z(0), v = z(), D = z(), S = z(f);
  F(() => {
    S.current = f;
  }, [f]), F(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function N(K) {
    return r == "x" ? K.clientX : K.clientY;
  }
  const T = E(
    (K) => {
      const ce = v.current + N(K) - k.current;
      u(ce);
      let ve;
      ce <= l ? ve = "chart" : i - ce <= c ? ve = "grid" : ve = "all", S.current !== ve && (p(ve), S.current = ve), D.current && clearTimeout(D.current), D.current = setTimeout(() => s && s(ce), 100);
    },
    [i, l, c, s]
  ), V = E(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", V);
  }, [T]), _ = C(
    () => f !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [f, r]
  ), A = E(
    (K) => {
      !a && (f === "grid" || f === "chart") || (k.current = N(K), v.current = d, w(!0), document.body.style.cursor = _, document.body.style.userSelect = "none", window.addEventListener("mousemove", T), window.addEventListener("mouseup", V));
    },
    [_, T, V, d, a, f]
  );
  function L() {
    p("all"), x !== null && (u(x), s && s(x));
  }
  function M(K) {
    if (a) {
      const ce = f === "chart" ? "grid" : "chart";
      p(ce), o(ce);
    } else if (f === "grid" || f === "chart")
      L(), o("all");
    else {
      const ce = K === "left" ? "chart" : "grid";
      p(ce), o(ce);
    }
  }
  function R() {
    M("left");
  }
  function W() {
    M("right");
  }
  const oe = C(() => m(d), [d, e, n, r]), de = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${f}`,
    h ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ U(
    "div",
    {
      className: "wx-pFykzMlT " + de,
      onMouseDown: A,
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
              onClick: W
            }
          ) })
        ] }),
        /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const cd = 650;
function Wo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let a = o.contentRect.width <= cd;
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
function dd(t) {
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
  } = t, f = $e(wt), p = ee(f, "_tasks"), m = ee(f, "_scales"), h = ee(f, "cellHeight"), w = ee(f, "columns"), x = ee(f, "_scrollTask"), y = ee(f, "undo"), k = C(() => {
    if (!a) return i;
    const te = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map();
    return p.forEach((be) => {
      const _e = be.row ?? be.id;
      fe.set(be.id, _e), te.has(_e) || te.set(_e, []), te.get(_e).push(be.id);
    }), { rowMap: te, taskRows: fe };
  }, [p, a, i]), [v, D] = B(!1);
  let [S, N] = B(0);
  const [T, V] = B(0), [_, A] = B(0), [L, M] = B(void 0), [R, W] = B("all"), oe = z(null), de = E(
    (te) => {
      D((fe) => (te !== fe && (te ? (oe.current = R, R === "all" && W("grid")) : (!oe.current || oe.current === "all") && W("all")), te));
    },
    [R]
  );
  F(() => {
    const te = Wo(de);
    return te.observe(), () => {
      te.disconnect();
    };
  }, [de]);
  const K = C(() => {
    let te;
    return w.every((fe) => fe.width && !fe.flexgrow) ? te = w.reduce((fe, be) => fe + parseInt(be.width), 0) : v && R === "chart" ? te = parseInt(w.find((fe) => fe.id === "action")?.width) || 50 : te = 440, S = te, te;
  }, [w, v, R]);
  F(() => {
    N(K);
  }, [K]);
  const ce = C(
    () => (T ?? 0) - (L ?? 0),
    [T, L]
  ), ve = C(() => m.width, [m]), H = C(() => {
    if (!a || !k)
      return p.length * h;
    const te = /* @__PURE__ */ new Set();
    return p.forEach((fe) => {
      const be = k.taskRows.get(fe.id) ?? fe.id;
      te.add(be);
    }), te.size * h;
  }, [p, h, a, k]), ne = C(
    () => m.height + H + ce,
    [m, H, ce]
  ), ye = C(
    () => S + ve,
    [S, ve]
  ), ue = z(null), se = E(() => {
    Promise.resolve().then(() => {
      if ((T ?? 0) > (ye ?? 0)) {
        const te = (T ?? 0) - S;
        f.exec("expand-scale", { minWidth: te });
      }
    });
  }, [T, ye, S, f]);
  F(() => {
    let te;
    return ue.current && (te = new ResizeObserver(se), te.observe(ue.current)), () => {
      te && te.disconnect();
    };
  }, [ue.current, se]), F(() => {
    se();
  }, [ve]);
  const G = z(null), ae = z(null), Q = E(() => {
    const te = G.current;
    te && f.exec("scroll-chart", {
      top: te.scrollTop
    });
  }, [f]), ie = z({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  F(() => {
    ie.current = {
      rTasks: p,
      rScales: m,
      rCellHeight: h,
      scrollSize: ce,
      ganttDiv: G.current,
      ganttHeight: _ ?? 0
    };
  }, [p, m, h, ce, _]);
  const J = E(
    (te) => {
      if (!te) return;
      const {
        rTasks: fe,
        rScales: be,
        rCellHeight: _e,
        scrollSize: Le,
        ganttDiv: j,
        ganttHeight: Se
      } = ie.current;
      if (!j) return;
      const { id: Ne } = te, we = fe.findIndex((xe) => xe.id === Ne);
      if (we > -1) {
        const xe = Se - be.height, Me = we * _e, Pe = j.scrollTop;
        let Ee = null;
        Me < Pe ? Ee = Me : Me + _e > Pe + xe && (Ee = Me - xe + _e + Le), Ee !== null && (f.exec("scroll-chart", { top: Math.max(Ee, 0) }), G.current.scrollTop = Math.max(Ee, 0));
      }
    },
    [f]
  );
  F(() => {
    J(x);
  }, [x]), F(() => {
    const te = G.current, fe = ae.current;
    if (!te || !fe) return;
    const be = () => {
      Bo(() => {
        A(te.offsetHeight), V(te.offsetWidth), M(fe.offsetWidth);
      });
    }, _e = new ResizeObserver(be);
    return _e.observe(te), () => _e.disconnect();
  }, [G.current]);
  const pe = z(null), Te = z(null);
  return F(() => {
    Te.current && (Te.current.destroy(), Te.current = null);
    const te = pe.current;
    if (te)
      return Te.current = Tr(te, {
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
        exec: (fe) => {
          fe.isInput || f.exec("hotkey", fe);
        }
      }), () => {
        Te.current?.destroy(), Te.current = null;
      };
  }, [y]), /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-gantt", ref: G, onScroll: Q, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ne, width: "100%" },
      ref: ae,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: _,
            width: L
          },
          children: /* @__PURE__ */ U("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: pe, children: [
            w.length ? /* @__PURE__ */ U(Ie, { children: [
              /* @__PURE__ */ g(
                Zc,
                {
                  display: R,
                  compactMode: v,
                  columnWidth: K,
                  width: S,
                  readonly: n,
                  fullHeight: H,
                  onTableAPIChange: o,
                  multiTaskRows: a,
                  rowMapping: k
                }
              ),
              /* @__PURE__ */ g(
                ld,
                {
                  value: S,
                  display: R,
                  compactMode: v,
                  containerWidth: T,
                  onMove: (te) => N(te),
                  onDisplayChange: (te) => W(te)
                }
              )
            ] }) : null,
            /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-content", ref: ue, children: /* @__PURE__ */ g(
              ad,
              {
                readonly: n,
                fullWidth: ve,
                fullHeight: H,
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
function ud(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function fd(t, e) {
  return typeof t == "function" ? t : lt(t, e);
}
function Oo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: fd(n, e)
  }));
}
function hd(t, e) {
  const n = ud(e);
  for (let r in n)
    n[r] = lt(n[r], t);
  return n;
}
function pd(t, e) {
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
function gd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Oo(n.scales, e)
    }))
  } : t;
}
const md = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), wd = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], xd = $t(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = bo,
  tasks: s = [],
  selected: o = [],
  activeTask: a = null,
  links: i = [],
  scales: l = wd,
  columns: c = go,
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
  init: S = null,
  autoScale: N = !0,
  unscheduledTasks: T = !1,
  criticalPath: V = null,
  schedule: _ = { type: "forward" },
  projectStart: A = null,
  projectEnd: L = null,
  calendar: M = null,
  undo: R = !1,
  splitTasks: W = !1,
  multiTaskRows: oe = !1,
  marqueeSelect: de = !1,
  copyPaste: K = !1,
  currentWeekHighlight: ce = !1,
  currentWeekColor: ve = null,
  scrollToCurrentWeek: H = !1,
  ...ne
}, ye) {
  const ue = z();
  ue.current = ne;
  const se = C(() => new il(Es), []), G = C(() => ({ ...tn, ...In }), []), ae = $e(Je.i18n), Q = C(() => ae ? ae.extend(G, !0) : Ct(G), [ae, G]), ie = C(() => Q.getRaw().calendar, [Q]), J = C(() => {
    let xe = {
      zoom: gd(k, ie),
      scales: Oo(l, ie),
      columns: pd(c, ie),
      links: ho(i),
      cellWidth: m
    };
    return xe.zoom && (xe = {
      ...xe,
      ...ja(
        xe.zoom,
        hd(ie, Q.getGroup("gantt")),
        xe.scales,
        m
      )
    }), xe;
  }, [k, l, c, i, m, ie, Q]), pe = z(null);
  pe.current !== s && (ir(s, { durationUnit: p, calendar: M }), pe.current = s), F(() => {
    ir(s, { durationUnit: p, calendar: M });
  }, [s, p, M, W]);
  const Te = C(() => {
    if (!oe) return null;
    const xe = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Pe = (Ee) => {
      Ee.forEach((Ae) => {
        const We = Ae.row ?? Ae.id;
        Me.set(Ae.id, We), xe.has(We) || xe.set(We, []), xe.get(We).push(Ae.id), Ae.data && Ae.data.length > 0 && Pe(Ae.data);
      });
    };
    return Pe(s), { rowMap: xe, taskRows: Me };
  }, [s, oe]), te = C(() => se.in, [se]), fe = z(null);
  fe.current === null && (fe.current = new zs((xe, Me) => {
    const Pe = "on" + md(xe);
    ue.current && ue.current[Pe] && ue.current[Pe](Me);
  }), te.setNext(fe.current));
  const [be, _e] = B(null), Le = z(null);
  Le.current = be;
  const j = C(
    () => ({
      getState: se.getState.bind(se),
      getReactiveState: se.getReactive.bind(se),
      getStores: () => ({ data: se }),
      exec: te.exec,
      setNext: (xe) => (fe.current = fe.current.setNext(xe), fe.current),
      intercept: te.intercept.bind(te),
      on: te.on.bind(te),
      detach: te.detach.bind(te),
      getTask: se.getTask.bind(se),
      serialize: se.serialize.bind(se),
      getTable: (xe) => xe ? new Promise((Me) => setTimeout(() => Me(Le.current), 1)) : Le.current,
      getHistory: () => se.getHistory()
    }),
    [se, te]
  );
  _t(
    ye,
    () => ({
      ...j
    }),
    [j]
  );
  const Se = z(0);
  F(() => {
    Se.current ? se.init({
      tasks: s,
      links: J.links,
      start: d,
      columns: J.columns,
      end: u,
      lengthUnit: f,
      cellWidth: J.cellWidth,
      cellHeight: h,
      scaleHeight: w,
      scales: J.scales,
      taskTypes: r,
      zoom: J.zoom,
      selected: o,
      activeTask: a,
      baselines: v,
      autoScale: N,
      unscheduledTasks: T,
      markers: n,
      durationUnit: p,
      criticalPath: V,
      schedule: _,
      projectStart: A,
      projectEnd: L,
      calendar: M,
      undo: R,
      _weekStart: ie.weekStart,
      splitTasks: W
    }) : S && S(j), Se.current++;
  }, [
    j,
    S,
    s,
    J,
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
    V,
    _,
    A,
    L,
    M,
    R,
    ie,
    W,
    se
  ]), Se.current === 0 && se.init({
    tasks: s,
    links: J.links,
    start: d,
    columns: J.columns,
    end: u,
    lengthUnit: f,
    cellWidth: J.cellWidth,
    cellHeight: h,
    scaleHeight: w,
    scales: J.scales,
    taskTypes: r,
    zoom: J.zoom,
    selected: o,
    activeTask: a,
    baselines: v,
    autoScale: N,
    unscheduledTasks: T,
    markers: n,
    durationUnit: p,
    criticalPath: V,
    schedule: _,
    projectStart: A,
    projectEnd: L,
    calendar: M,
    undo: R,
    _weekStart: ie.weekStart,
    splitTasks: W
  });
  const Ne = C(() => {
    const xe = /* @__PURE__ */ new Date(), Me = ie?.weekStart ?? 0, Pe = new Date(xe), Ae = (Pe.getDay() - Me + 7) % 7;
    Pe.setDate(Pe.getDate() - Ae), Pe.setHours(0, 0, 0, 0);
    const We = new Date(Pe);
    return We.setDate(We.getDate() + 7), (et) => et >= Pe && et < We;
  }, [ie]), we = C(() => (xe, Me) => {
    let Pe = [];
    if (M)
      Me == "day" && !M.getDayHours(xe) && Pe.push("wx-weekend"), Me == "hour" && !M.getDayHours(xe) && Pe.push("wx-weekend");
    else if (D) {
      const Ee = D(xe, Me);
      Ee && Pe.push(Ee);
    }
    return ce && (Me === "week" || Me === "day") && Ne(xe) && Pe.push("wx-current-week"), Pe.join(" ");
  }, [M, D, ce, Ne]);
  return /* @__PURE__ */ g(Je.i18n.Provider, { value: Q, children: /* @__PURE__ */ g(wt.Provider, { value: j, children: /* @__PURE__ */ g(
    dd,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: we,
      onTableAPIChange: _e,
      multiTaskRows: oe,
      rowMapping: Te,
      marqueeSelect: de,
      copyPaste: K,
      scrollToCurrentWeek: H,
      currentWeekColor: ve
    }
  ) }) });
});
function yd({ api: t = null, items: e = [] }) {
  const n = $e(Je.i18n), r = C(() => n || Ct(In), [n]), s = C(() => r.getGroup("gantt"), [r]), o = at(t, "_selected"), a = at(t, "undo"), i = at(t, "history"), l = at(t, "splitTasks"), c = ["undo", "redo"], d = C(() => {
    const f = lr();
    return (e.length ? e : lr()).map((m) => {
      let h = { ...m, disabled: !1 };
      return h.handler = Cr(f, h.id) ? (w) => Et(t, w.id, null, s) : h.handler, h.text && (h.text = s(h.text)), h.menuText && (h.menuText = s(h.menuText)), h;
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
  return n ? /* @__PURE__ */ g(dr, { items: u }) : /* @__PURE__ */ g(Je.i18n.Provider, { value: r, children: /* @__PURE__ */ g(dr, { items: u }) });
}
const vd = $t(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: a,
  onClick: i,
  css: l
}, c) {
  const d = z(null), u = z(null), f = $e(Je.i18n), p = C(() => f || Ct({ ...In, ...tn }), [f]), m = C(() => p.getGroup("gantt"), [p]), h = at(n, "taskTypes"), w = at(n, "selected"), x = at(n, "_selected"), y = at(n, "splitTasks"), k = C(() => ar(), []);
  F(() => {
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
    const M = e.length ? e : ar(), R = M.find((W) => W.id === "convert-task");
    return R && (R.data = [], (h || []).forEach((W) => {
      R.data.push(R.dataFactory(W));
    })), v(M);
  }
  const S = C(() => D(), [n, e, h, y, m]), N = C(
    () => x && x.length ? x : [],
    [x]
  ), T = E(
    (M, R) => {
      let W = M ? n?.getTask(M) : null;
      if (r) {
        const oe = r(M, R);
        W = oe === !0 ? W : oe;
      }
      if (W) {
        const oe = vt(R.target, "data-segment");
        oe !== null ? u.current = { id: W.id, segmentIndex: oe } : u.current = W.id, (!Array.isArray(w) || !w.includes(W.id)) && n && n.exec && n.exec("select-task", { id: W.id });
      }
      return W;
    },
    [n, r, w]
  ), V = E(
    (M) => {
      const R = M.action;
      R && (Cr(k, R.id) && Et(n, R.id, u.current, m), i && i(M));
    },
    [n, m, i, k]
  ), _ = E(
    (M, R) => {
      const W = N.length ? N : R ? [R] : [];
      let oe = s ? W.every((de) => s(M, de)) : !0;
      if (oe && (M.isHidden && (oe = !W.some(
        (de) => M.isHidden(de, n.getState(), u.current)
      )), M.isDisabled)) {
        const de = W.some(
          (K) => M.isDisabled(K, n.getState(), u.current)
        );
        M.disabled = de;
      }
      return oe;
    },
    [s, N, n]
  );
  _t(c, () => ({
    show: (M, R) => {
      d.current && d.current.show && d.current.show(M, R);
    }
  }));
  const A = E((M) => {
    d.current && d.current.show && d.current.show(M);
  }, []), L = /* @__PURE__ */ U(Ie, { children: [
    /* @__PURE__ */ g(
      Ro,
      {
        filter: _,
        options: S,
        dataKey: "id",
        resolver: T,
        onClick: V,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ g("span", { onContextMenu: A, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a })
  ] });
  if (!f && Je.i18n?.Provider) {
    const M = Je.i18n.Provider;
    return /* @__PURE__ */ g(M, { value: p, children: L });
  }
  return L;
}), fr = {};
function Ss(t) {
  return typeof t < "u" ? fr[t] || t : fr.text;
}
function rt(t, e) {
  fr[t] = e;
}
const kd = {
  editor: {}
};
function Un(t) {
  const {
    editors: e,
    data: n,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: a,
    children: i,
    onChange: l
  } = t, c = z(null);
  F(() => {
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
          const x = Ss(p.comp);
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
          const x = Ss(p.comp);
          return /* @__PURE__ */ U("div", { children: [
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
function bd(t) {
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
function Sd(t) {
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
function $d(t) {
  const e = t.map((a) => {
    const i = { ...a };
    return a.config && Object.assign(i, a.config), i.key = a.key || Bi(), i.setter = a.setter || Sd(a.key), i.getter = a.getter || bd(a.key), i;
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
      !An(u, f) && (u !== void 0 || f) && c.push(d.key);
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
function _d({
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
  const y = $e(Je.i18n).getGroup("editor"), [k, v] = Ve(t), [D, S] = B(null), N = C(() => {
    const H = $d(e);
    D && H.config.forEach((ue) => {
      ue.comp === "section" && ue.key === D && (ue.sectionMode === "accordion" ? ue.activeSection || (H.config.forEach((se) => {
        se.comp === "section" && se.key !== ue.key && (se.activeSection = !1);
      }), ue.activeSection = !0) : ue.activeSection = !ue.activeSection);
    });
    let ne = /* @__PURE__ */ new Set(), ye = null;
    return H.config.forEach((ue) => {
      ue.sectionMode === "exclusive" && ue.activeSection && (ye = ue.key), ue.activeSection && ne.add(ue.key);
    }), H.config.forEach((ue) => {
      ue.hidden = ue.hidden || r && r !== ue.batch || ye && ue.key != ye && ue.section !== ye || ue.section && !ne.has(ue.section);
    }), a ? {
      ...H,
      config: H.config.map((ue) => ({ ...ue, comp: "readonly" })),
      diff: () => []
    } : H;
  }, [e, D, r, a]), [T, V] = B({}), [_, A] = B({}), L = k;
  F(() => {
    k !== void 0 && (V($n(k)), A($n(k)), L.errors && (L.errors = oe()));
  }, [k]);
  const [M, R] = B([]);
  F(() => {
    k && R([]);
  }, [k]);
  function W(H) {
    return [...new Set(H)];
  }
  function oe(H) {
    const ne = N.validateValues(T, H, y);
    return An(ne, L.errors) || w && w({ errors: ne, values: T }), ne;
  }
  function de(H, ne) {
    if (s && !L.errors) {
      const ye = N.setValues(k, ne ?? _, H);
      v(ye), m && m({ changes: H, values: ye });
    } else
      R(H);
  }
  function K({ value: H, key: ne, input: ye }) {
    let ue = { ..._ || {}, [ne]: H };
    const se = {
      key: ne,
      value: H,
      update: ue
    };
    if (ye && (se.input = ye), p && p(se), !k) return;
    ue = se.update, A(ue);
    const G = N.diff(k, ue), ae = N.setValues(
      { ...T || {} },
      ue,
      W([...G, ne])
    );
    if (V(ae), G.length) {
      const Q = s ? [] : W([...G, ...Object.keys(L.errors ?? {}), ne]);
      L.errors = oe(Q), de(G, ue);
    } else {
      const Q = Object.keys(L.errors ?? {});
      Q.length && (L.errors = oe(Q)), R([]);
    }
  }
  function ce() {
    if (M.length && (s || (L.errors = oe()), !L.errors)) {
      m && m({
        changes: M,
        values: T
      });
      const H = N.setValues(k, _, M);
      v(H), R([]), v({ ...T });
    }
  }
  function ve({ item: H }) {
    H.id === "save" ? ce() : H.id === "toggle-section" && S(H.key), h && h({ item: H, values: T, changes: M });
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
      errors: L.errors,
      onClick: ve,
      onKeyDown: ve,
      onChange: K,
      children: f
    }
  );
}
function Cd(t) {
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
      Un,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: a,
        onChange: i
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ g(
      Un,
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
    Un,
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
function $s({
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
        dr,
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
const Kt = () => ({ comp: "spacer" }), qn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Xn = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), _s = () => ({
  comp: "icon",
  icon: "wxi-close",
  id: "close"
});
function Qn(t) {
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
    let _ = o && o.items ? o.items.map((A) => ({ ...A })) : [];
    return k && (d ? _ = [Kt(), _s()] : (u ? _ = [Kt(), _s()] : l !== "modal" && (_ = [Kt(), qn(y), Xn(y)]), i === "columns" && !_.length && (_ = [Kt(), Xn(y), qn(y)]))), _;
  }, [o, k, d, u, l, i, y]), D = C(() => {
    let _ = a && a.items ? a.items.map((A) => ({ ...A })) : [];
    return k && (d || (l === "modal" && !u && (_ = [Kt(), Xn(y), qn(y)]), i === "columns" && v.length && (_ = []))), _;
  }, [a, k, d, l, u, i, v, y]), S = C(() => [...v, ...D], [v, D]), N = z(null), T = z(null);
  T.current = (_, ...A) => {
    const L = S.findIndex((W) => A.includes(W.id));
    if (L === -1) return !1;
    const M = _.target, R = S[L];
    _.key == "Escape" && (M.closest(".wx-combo") || M.closest(".wx-multicombo") || M.closest(".wx-richselect")) || _.key == "Delete" && (M.tagName === "INPUT" || M.tagName === "TEXTAREA") || (_.preventDefault(), m && m({ item: R }));
  };
  const V = C(() => w === !1 ? {} : {
    "ctrl+s": (_) => T.current(_, "save"),
    escape: (_) => T.current(_, "cancel", "close"),
    "ctrl+d": (_) => T.current(_, "delete"),
    ...w || {}
  }, [w]);
  return ai(V, N), /* @__PURE__ */ U("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: N, children: [
    /* @__PURE__ */ g(
      $s,
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
            Cd,
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
            $s,
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
function Nd(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ g(Oi, { children: /* @__PURE__ */ g(
    Qn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ g(Fi, { onCancel: o, children: /* @__PURE__ */ g(
    Qn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ g(
    Qn,
    {
      css: `wx-inline-form ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  );
}
function Td(t) {
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
  return /* @__PURE__ */ g(Rn, { words: kd, optional: !0, children: /* @__PURE__ */ g(
    _d,
    {
      view: Nd,
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
function Dd({ value: t, options: e, label: n }) {
  const r = $e(Je.i18n).getGroup("editor"), s = C(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const a = e.find((i) => i.id === t);
      a && (o = a.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(Qt, { label: n, children: s }) : null;
}
function Md({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
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
rt("text", sn);
rt("textarea", pi);
rt("checkbox", gi);
rt("readonly", Dd);
rt("section", Md);
hr(Ze);
function Ed({ api: t, autoSave: e, onLinksChange: n }) {
  const s = $e(Je.i18n).getGroup("gantt"), o = ee(t, "activeTask"), a = ee(t, "_activeTask"), i = ee(t, "_links"), l = ee(t, "schedule"), c = ee(t, "unscheduledTasks"), [d, u] = B();
  function f() {
    if (o) {
      const w = i.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), x = i.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: w },
        { title: s("Successors"), data: x }
      ];
    }
  }
  F(() => {
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
  return /* @__PURE__ */ g(Ie, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ g(Qt, { label: w.title, position: "top", children: /* @__PURE__ */ g("table", { children: /* @__PURE__ */ g("tbody", { children: w.data.map((y) => /* @__PURE__ */ U("tr", { children: [
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ g(
        sn,
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
        wi,
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
function Rd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...a } = t, i = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), i && i({ value: d });
  }
  return /* @__PURE__ */ U("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ g(
      Ii,
      {
        ...a,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ g(Wi, { value: e, onChange: i, format: r }) : null
  ] });
}
rt("select", As);
rt("date", Rd);
rt("twostate", Hs);
rt("slider", er);
rt("counter", Ai);
rt("links", Ed);
function Id({
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
  const u = $e(Je.i18n), f = C(() => u || Ct({ ...In, ...tn }), [u]), p = C(() => f.getGroup("gantt"), [f]), m = f.getRaw(), h = C(() => {
    const j = m.gantt?.dateFormat || m.formats?.dateFormat;
    return lt(j, m.calendar);
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
  F(() => {
    const j = Wo(v);
    return j.observe(), () => {
      j.disconnect();
    };
  }, [v]);
  const D = ee(t, "_activeTask"), S = ee(t, "activeTask"), N = ee(t, "unscheduledTasks"), T = ee(t, "links"), V = ee(t, "splitTasks"), _ = C(
    () => V && S?.segmentIndex,
    [V, S]
  ), A = C(
    () => _ || _ === 0,
    [_]
  ), L = C(
    () => vo(),
    [N]
  ), M = ee(t, "undo"), [R, W] = B({}), [oe, de] = B(null), [K, ce] = B(), [ve, H] = B(null), ne = ee(t, "taskTypes"), ye = C(() => {
    if (!D) return null;
    let j;
    if (A && D.segments ? j = { ...D.segments[_] } : j = { ...D }, s) {
      let Se = { parent: j.parent };
      return L.forEach(({ key: Ne, comp: we }) => {
        if (we !== "links") {
          const xe = j[Ne];
          we === "date" && xe instanceof Date ? Se[Ne] = h(xe) : we === "slider" && Ne === "progress" ? Se[Ne] = `${xe}%` : Se[Ne] = xe;
        }
      }), Se;
    }
    return j || null;
  }, [D, A, _, s, L, h]);
  F(() => {
    ce(ye);
  }, [ye]), F(() => {
    W({}), H(null), de(null);
  }, [S]);
  function ue(j, Se) {
    return j.map((Ne) => {
      const we = { ...Ne };
      if (Ne.config && (we.config = { ...we.config }), we.comp === "links" && t && (we.api = t, we.autoSave = l, we.onLinksChange = ae), we.comp === "select" && we.key === "type") {
        const xe = we.options ?? (ne || []);
        we.options = xe.map((Me) => ({
          ...Me,
          label: p(Me.label)
        }));
      }
      return we.comp === "slider" && we.key === "progress" && (we.labelTemplate = (xe) => `${p(we.label)} ${xe}%`), we.label && (we.label = p(we.label)), we.config?.placeholder && (we.config.placeholder = p(we.config.placeholder)), Se && (we.isDisabled && we.isDisabled(Se, t.getState()) ? we.disabled = !0 : delete we.disabled), we;
    });
  }
  const se = C(() => {
    let j = e.length ? e : L;
    return j = ue(j, K), K ? j.filter(
      (Se) => !Se.isHidden || !Se.isHidden(K, t.getState())
    ) : j;
  }, [e, L, K, ne, p, t, l]), G = C(
    () => se.map((j) => j.key),
    [se]
  );
  function ae({ id: j, action: Se, data: Ne }) {
    W((we) => ({
      ...we,
      [j]: { action: Se, data: Ne }
    }));
  }
  const Q = E(() => {
    for (let j in R)
      if (T.byId(j)) {
        const { action: Se, data: Ne } = R[j];
        t.exec(Se, Ne);
      }
  }, [t, R, T]), ie = E(() => {
    const j = S?.id || S;
    if (A) {
      if (D?.segments) {
        const Se = D.segments.filter(
          (Ne, we) => we !== _
        );
        t.exec("update-task", {
          id: j,
          task: { segments: Se }
        });
      }
    } else
      t.exec("delete-task", { id: j });
  }, [t, S, A, D, _]), J = E(() => {
    t.exec("show-editor", { id: null });
  }, [t]), pe = E(
    (j) => {
      const { item: Se, changes: Ne } = j;
      Se.id === "delete" && ie(), Se.id === "save" && (Ne.length ? J() : Q()), Se.comp && J();
    },
    [t, S, l, Q, ie, J]
  ), Te = E(
    (j, Se, Ne) => (N && j.type === "summary" && (j.unscheduled = !1), wo(j, t.getState(), Se), Ne || de(!1), j),
    [N, t]
  ), te = E(
    (j) => {
      j = {
        ...j,
        unscheduled: N && j.unscheduled && j.type !== "summary"
      }, delete j.links, delete j.data, (G.indexOf("duration") === -1 || j.segments && !j.duration) && delete j.duration;
      const Se = {
        id: S?.id || S,
        task: j,
        ...A && { segmentIndex: _ }
      };
      l && oe && (Se.inProgress = oe), t.exec("update-task", Se), l || Q();
    },
    [
      t,
      S,
      N,
      l,
      Q,
      G,
      A,
      _,
      oe
    ]
  ), fe = E(
    (j) => {
      let { update: Se, key: Ne, input: we } = j;
      if (we && de(!0), j.update = Te({ ...Se }, Ne, we), !l) ce(j.update);
      else if (!ve && !we) {
        const xe = se.find((Ee) => Ee.key === Ne), Me = Se[Ne];
        (!xe.validation || xe.validation(Me)) && (!xe.required || Me) && te(j.update);
      }
    },
    [l, Te, ve, se, te]
  ), be = E(
    (j) => {
      l || te(j.values);
    },
    [l, te]
  ), _e = E((j) => {
    H(j.errors);
  }, []), Le = C(
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
  return ye ? /* @__PURE__ */ g(Rn, { children: /* @__PURE__ */ g(
    Td,
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
      onAction: pe,
      onSave: be,
      onValidation: _e,
      onChange: fe,
      hotkeys: d && { ...Le, ...d }
    }
  ) }) : null;
}
const Ad = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = B(null);
  return F(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ g(Xc, { api: r, columns: e, children: t });
};
function Hd(t) {
  const { api: e, content: n, children: r } = t, s = z(null), o = z(null), [a, i] = B({}), [l, c] = B(null), [d, u] = B({});
  function f(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const D = v.getAttribute("data-tooltip-id"), S = v.getAttribute("data-tooltip-at"), N = v.getAttribute("data-tooltip");
        if (D || N) return { id: D, tooltip: N, target: v, at: S };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  F(() => {
    const v = o.current;
    if (v && d && (d.text || n)) {
      const D = v.getBoundingClientRect();
      let S = !1, N = d.left, T = d.top;
      D.right >= a.right && (N = a.width - D.width - 5, S = !0), D.bottom >= a.bottom && (T = d.top - (D.bottom - a.bottom + 2), S = !0), S && u((V) => V && { ...V, left: N, top: T });
    }
  }, [d, a, n]);
  const p = z(null), m = 300, h = (v) => {
    clearTimeout(p.current), p.current = setTimeout(() => {
      v();
    }, m);
  };
  function w(v) {
    let { id: D, tooltip: S, target: N, at: T } = f(v.target);
    if (u(null), c(null), !S)
      if (D)
        S = y(D);
      else {
        clearTimeout(p.current);
        return;
      }
    const V = v.clientX;
    h(() => {
      D && c(x(k(D)));
      const _ = N.getBoundingClientRect(), A = s.current, L = A ? A.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let M, R;
      T === "left" ? (M = _.top + 5 - L.top, R = _.right + 5 - L.left) : (M = _.top + _.height - L.top, R = V - L.left), i(L), u({ top: M, left: R, text: S });
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
function Ld({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Br, { fonts: t, children: e() }) : /* @__PURE__ */ g(Br, { fonts: t });
}
function Pd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(jr, { fonts: t, children: e }) : /* @__PURE__ */ g(jr, { fonts: t });
}
function zd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Kr, { fonts: t, children: e }) : /* @__PURE__ */ g(Kr, { fonts: t });
}
const Kd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: vd,
  Editor: Id,
  Gantt: xd,
  HeaderMenu: Ad,
  Material: Ld,
  Toolbar: yd,
  Tooltip: Hd,
  Willow: Pd,
  WillowDark: zd,
  defaultColumns: go,
  defaultEditorItems: ko,
  defaultMenuOptions: xo,
  defaultTaskTypes: bo,
  defaultToolbarButtons: yo,
  getEditorItems: vo,
  getMenuOptions: ar,
  getToolbarButtons: lr,
  registerEditorItem: rt,
  registerScaleUnit: Ya
}, Symbol.toStringTag, { value: "Module" }));
export {
  Kd as default
};
