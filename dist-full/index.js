import { jsx as g, jsxs as q, Fragment as Ee } from "react/jsx-runtime";
import zo, { useState as j, useEffect as P, useRef as W, createContext as Ot, useContext as ye, useMemo as _, useCallback as E, forwardRef as Dt, useImperativeHandle as Mt, useId as Wo, Fragment as ks } from "react";
import { createPortal as Fo, flushSync as Oo } from "react-dom";
function qe(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function Xn(t, e = "data-id") {
  const n = qe(t, e);
  return n ? n.getAttribute(e) : null;
}
function _t(t, e = "data-id") {
  const n = qe(t, e);
  return n ? Pt(n.getAttribute(e)) : null;
}
function Pt(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Po() {
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
var et = Po();
function ur(t) {
  Object.assign(et, t);
}
function Mr(t, e, n) {
  function r(s) {
    const o = qe(s);
    if (!o) return;
    const i = Pt(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let l, a = s.target;
    for (; a != o; ) {
      if (l = a.dataset ? a.dataset.action : null, l && e[l]) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[n] && e[n](i, s);
  }
  et.addEvent(t, n, r);
}
function bs(t, e) {
  Mr(t, e, "click"), e.dblclick && Mr(t, e.dblclick, "dblclick");
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
    et.addGlobalEvent("click", Er, t),
    et.addGlobalEvent("contextmenu", Er, t),
    et.addGlobalEvent("mousedown", Vo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return Ct.push(n), {
    destroy() {
      Yo(Ct, n), Ct.length || (fn.forEach((r) => r()), fn = []);
    }
  };
}
var hn = (t) => t.indexOf("bottom") !== -1, pn = (t) => t.indexOf("left") !== -1, gn = (t) => t.indexOf("right") !== -1, Wn = (t) => t.indexOf("top") !== -1, Rr = (t) => t.indexOf("fit") !== -1, mn = (t) => t.indexOf("overlap") !== -1, Go = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), jo = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function Ko(t, e) {
  let n = 0;
  const r = et.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ke, Ze, Kt, Ue;
function Bo(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ke = r, Ze = s, Kt = "auto";
  let o = 0, i = 0;
  const l = Uo(t), a = mn(n) ? et.getTopNode(t) : l;
  if (!l) return null;
  const c = l.getBoundingClientRect(), d = t.getBoundingClientRect(), u = a.getBoundingClientRect(), f = window.getComputedStyle(a), p = {
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
    const k = Ko(e, l);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (Ue = e.getBoundingClientRect(), Rr(n) && (Kt = Ue.width + "px"), n !== "point")
      if (Go(n))
        Rr(n) ? Ke = 0 : (Ke = u.width / 2, i = 1), Ze = (u.height - d.height) / 2;
      else {
        const k = mn(n) ? 0 : 1;
        Ke = gn(n) ? Ue.right + k : Ue.left - k, Ze = hn(n) ? Ue.bottom + 1 : Ue.top;
        const v = jo(n);
        v && (gn(n) || pn(n) ? v === "center" ? Ze -= (d.height - Ue.height) / 2 : v === "end" && (Ze -= d.height - Ue.height) : (hn(n) || Wn(n)) && (v === "center" ? Ke -= (d.width - Ue.width) / 2 : v === "end" && (Ke -= d.width - Ue.width), mn(n) || (Ke += 1)));
      }
  } else Ue = { left: r, right: r, top: s, bottom: s };
  const m = (pn(n) || gn(n)) && (hn(n) || Wn(n));
  pn(n) && (i = 2);
  const h = Ke - d.width - u.left;
  e && pn(n) && !m && h < 0 && (Ke = Ue.right, i = 0);
  const x = Ke + d.width * (1 - i / 2) - u.right;
  if (x > 0)
    if (!gn(n))
      Ke = u.right - p.right - d.width;
    else {
      const k = Ue.left - u.x - d.width;
      e && !mn(n) && !m && k >= 0 ? Ke = Ue.left - d.width : Ke -= x + p.right;
    }
  i && (Ke = Math.round(Ke - d.width * i / 2));
  const w = h < 0 || x > 0 || !m;
  Wn(n) && (Ze = Ue.top - d.height, e && Ze < u.y && w && (Ze = Ue.bottom));
  const y = Ze + d.height - u.bottom;
  return y > 0 && (e && hn(n) && w ? Ze -= d.height + Ue.height + 1 : Ze -= y + p.bottom), Ke -= c.left + p.left, Ze -= c.top + p.top, Ke = Math.max(Ke, 0) + a.scrollLeft, Ze = Math.max(Ze, 0) + a.scrollTop, Kt = Kt || "auto", { x: Ke, y: Ze, z: o, width: Kt };
}
function Uo(t) {
  const e = et.getTopNode(t);
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
function Je(t) {
  return t < 10 ? "0" + t : t.toString();
}
function Qo(t) {
  const e = Je(t);
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
      return Je(e.getDate());
    case "%m":
      return Je(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return Je(e.getFullYear() % 100);
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
      return Je((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return Je(e.getHours());
    case "%i":
      return Je(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? n.pm : n.am) || zr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || zr)[1];
    case "%s":
      return Je(e.getSeconds());
    case "%S":
      return Qo(e.getMilliseconds());
    case "%W":
      return Je(Lr(e));
    case "%w":
      return Je(Lr(e, n.weekStart ?? 1));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + Je(e.getMonth() + 1), r += "-" + Je(e.getDate()), r += "T", r += Je(e.getHours()), r += ":" + Je(e.getMinutes()), r += ":" + Je(e.getSeconds()), r;
    }
    case "%Q":
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return t;
  }
}
var Jo = /%[a-zA-Z]/g;
function pt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      Jo,
      (r) => Zo(r, n, e)
    )) : "";
  };
}
function Wr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function Qn(t, e) {
  for (const n in e) {
    const r = e[n];
    Wr(t[n]) && Wr(r) ? t[n] = Qn(
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
function Oe(t) {
  const [e, n] = j(t), r = W(t);
  return P(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ei(t, e, n) {
  const [r, s] = j(() => e);
  return t || console.warn(`Writable ${n} is not defined`), P(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function ee(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ei(r[e], n[e], e);
}
function ht(t, e) {
  const [n, r] = j(() => null);
  return P(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((l) => r(() => l)) : void 0;
  }, [t, e]), n;
}
function ti(t, e) {
  const n = W(e);
  n.current = e;
  const [r, s] = j(1);
  return P(() => t.subscribe((i) => {
    n.current = i, s((l) => l + 1);
  }), [t]), [n.current, r];
}
function qt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ti(r[e], n[e]);
}
function ni(t, e) {
  P(() => {
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
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, l) => l.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Cs(t) {
  let e = t, n = [];
  return {
    subscribe: (l) => {
      n.push(l), l(e);
    },
    unsubscribe: (l) => {
      n = n.filter((a) => a !== l);
    },
    set: (l) => {
      e = l, n.forEach((a) => a(e));
    },
    update: (l) => {
      e = l(e), n.forEach((a) => a(e));
    }
  };
}
function Fr(t, e, n) {
  function r(s) {
    const o = qe(s);
    if (!o) return;
    const i = Pt(o.dataset.id);
    if (typeof e == "function") return e(i, s);
    let l, a = s.target;
    for (; a != o; ) {
      if (l = a.dataset ? a.dataset.action : null, l && e[l]) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[n] && e[n](i, s);
  }
  return et.addEvent(t, n, r);
}
function ri(t, e) {
  const n = [Fr(t, e, "click")];
  return e.dblclick && n.push(Fr(t, e.dblclick, "dblclick")), () => {
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
}, li = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, tn = {
  core: ii,
  calendar: oi,
  formats: li,
  lang: si
}, nn = Ot("willow"), ai = Ot({}), ot = Ot(null), pr = Ot(null), tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: pr,
  helpers: ai,
  i18n: ot,
  theme: nn
}, Symbol.toStringTag, { value: "Module" }));
function Yt(t) {
  const e = ye(pr);
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
  onChange: l
}) {
  const a = Yt(e), [c, d] = Oe(t), u = E(
    (m) => {
      const h = m.target.value;
      d(h), l && l({ value: h, input: !0 });
    },
    [l]
  ), f = E(
    (m) => {
      const h = m.target.value;
      d(h), l && l({ value: h });
    },
    [l]
  ), p = W(null);
  return P(() => {
    const m = f, h = p.current;
    return h.addEventListener("change", m), () => {
      h && h.removeEventListener("change", m);
    };
  }, [f]), /* @__PURE__ */ g(
    "textarea",
    {
      className: `wx-3yFVAC wx-textarea ${o ? "wx-error" : ""}`,
      id: a,
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
function gt({
  type: t = "",
  css: e = "",
  icon: n = "",
  disabled: r = !1,
  title: s = "",
  text: o = "",
  children: i,
  onClick: l
}) {
  const a = _(() => {
    let d = t ? t.split(" ").filter((u) => u !== "").map((u) => "wx-" + u).join(" ") : "";
    return e + (e ? " " : "") + d;
  }, [t, e]), c = (d) => {
    l && l(d);
  };
  return /* @__PURE__ */ q(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${a} ${n && !i ? "wx-icon" : ""}`,
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
  const i = Wo(), l = Yt(t) || i, [a, c] = Oe(r);
  return /* @__PURE__ */ q("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ g(
      "input",
      {
        type: "checkbox",
        id: l,
        disabled: o,
        className: "wx-2IvefP wx-check",
        checked: a,
        value: n,
        onChange: ({ target: d }) => {
          const u = d.checked;
          c(u), s && s({ value: u, inputValue: n });
        }
      }
    ),
    /* @__PURE__ */ q("label", { htmlFor: l, className: "wx-2IvefP wx-label", children: [
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
  const i = W(null), [l, a] = Oe(t), [c, d] = Oe(e);
  return P(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const f = u.getBoundingClientRect(), p = et.getTopNode(u).getBoundingClientRect();
        f.right >= p.right && d("end"), f.bottom >= p.bottom && a("top");
      }
    }
  }, [n]), P(() => {
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
      className: `wx-32GZ52 wx-dropdown wx-${l}-${c}`,
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
  }, l = (d) => {
    t = d, e = t !== null, s(t);
  }, a = (d, u) => {
    if (d !== null && n) {
      const f = n.querySelectorAll(".wx-list > .wx-item")[d];
      f && (f.scrollIntoView({ block: "nearest" }), u && u.preventDefault());
    }
  }, c = (d, u) => {
    const f = d === null ? null : Math.max(0, Math.min(t + d, r.length - 1));
    f !== t && (l(f), n ? a(f, u) : requestAnimationFrame(() => a(f, u)));
  };
  return { move: (d) => {
    const u = _t(d), f = r.findIndex((p) => p.id == u);
    f !== t && l(f);
  }, keydown: (d, u) => {
    switch (d.code) {
      case "Enter":
        e ? o() : l(0);
        break;
      case "Space":
        e || l(0);
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
function Mn({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = W(), o = W(ui()), [i, l] = j(null), a = W(i), c = (ye(ot) || rn()).getGroup("core"), d = (f) => {
    f && f.stopPropagation(), n && n({ id: t[a.current]?.id });
  };
  P(() => {
    o.current.init(
      s.current,
      t,
      (f) => {
        l(f), a.current = f;
      },
      d
    );
  }, [t, s.current]), P(() => {
    r && r(o.current);
  }, []);
  const u = E(() => {
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
  disabled: l = !1,
  error: a = !1,
  clear: c = !1,
  children: d,
  onChange: u
}) {
  const f = Yt(e), p = W(null), m = W(null), [h, x] = Oe(t), [w, y] = j(!1), [k, v] = j(""), N = W(null), b = W(!1), $ = _(() => {
    if (w) return k;
    if (h || h === 0) {
      const Q = (r || n).find((le) => le.id === h);
      if (Q) return Q[s];
    }
    return "";
  }, [w, k, h, r, n, s]), R = _(() => !$ || !w ? n : n.filter(
    (Q) => Q[s].toLowerCase().includes($.toLowerCase())
  ), [$, w, n, s]), z = E(
    () => R.findIndex((Q) => Q.id === h),
    [R, h]
  ), C = E((Q) => {
    p.current = Q.navigate, m.current = Q.keydown;
  }, []), I = E(
    (Q, le) => {
      if (Q || Q === 0) {
        let ve = n.find((A) => A.id === Q);
        if (y(!1), le && p.current(null), ve && h !== ve.id) {
          const A = ve.id;
          x(A), u && u({ value: A });
        }
      }
      !b.current && le && N.current.focus();
    },
    [n, h, u]
  ), M = E(
    ({ id: Q }) => {
      I(Q, !0);
    },
    [I]
  ), H = E(
    (Q) => {
      Q && Q.stopPropagation(), x(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), T = E(
    (Q) => {
      if (!n.length) return;
      if (Q === "" && c) {
        H();
        return;
      }
      let le = n.find((A) => A[s] === Q);
      le || (le = n.find(
        (A) => A[s].toLowerCase().includes(Q.toLowerCase())
      ));
      const ve = le ? le.id : h || n[0].id;
      I(ve, !1);
    },
    [n, s, c, h, I, H]
  ), G = E(() => {
    v(N.current.value), y(!0), R.length ? p.current(0) : p.current(null);
  }, [R.length, p]), te = E(() => {
    b.current = !0;
  }, []), ue = E(() => {
    b.current = !1, setTimeout(() => {
      b.current || T($);
    }, 200);
  }, [T, $]);
  return /* @__PURE__ */ q(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => p.current(z()),
      onKeyDown: (Q) => m.current(Q, z()),
      title: i,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (a ? "wx-error" : ""),
            id: f,
            ref: N,
            value: $,
            disabled: l,
            placeholder: o,
            onFocus: te,
            onBlur: ue,
            onInput: G
          }
        ),
        c && !l && h ? /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !l && /* @__PURE__ */ g(Mn, { items: R, onReady: C, onSelect: M, children: ({ option: Q }) => /* @__PURE__ */ g(Ee, { children: d ? d({ option: Q }) : Q[s] }) })
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
  disabled: l = !1,
  error: a = !1,
  inputStyle: c = {},
  title: d = "",
  css: u = "",
  icon: f = "",
  clear: p = !1,
  onChange: m
}) {
  const h = Yt(e), [x, w] = Oe(t), y = W(null), k = _(
    () => f && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [f, u]
  ), v = _(
    () => f && u.indexOf("wx-icon-left") !== -1,
    [f, u]
  );
  P(() => {
    const z = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(z);
  }, [r, s]);
  const N = E(
    (z) => {
      const C = z.target.value;
      w(C), m && m({ value: C, input: !0 });
    },
    [m]
  ), b = E(
    (z) => m && m({ value: z.target.value }),
    [m]
  );
  function $(z) {
    z.stopPropagation(), w(""), m && m({ value: "" });
  }
  let R = o;
  return o !== "password" && o !== "number" && (R = "text"), P(() => {
    const z = b, C = y.current;
    return C.addEventListener("change", z), () => {
      C && C.removeEventListener("change", z);
    };
  }, [b]), /* @__PURE__ */ q(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${k} ${a ? "wx-error" : ""} ${l ? "wx-disabled" : ""} ${p ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: y,
            id: h,
            readOnly: n,
            disabled: l,
            placeholder: i,
            type: R,
            style: c,
            title: d,
            value: x,
            onInput: N
          }
        ),
        p && !l && x ? /* @__PURE__ */ q(Ee, { children: [
          /* @__PURE__ */ g("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: $ }),
          v && /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` })
        ] }) : f ? /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${f}` }) : null
      ]
    }
  );
}
function hi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = ye(ot).getRaw(), i = t.getFullYear(), l = _(() => {
    switch (e) {
      case "month":
        return pt(o.monthYearFormat, s)(t);
      case "year":
        return pt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = $s(i), u = pt(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, i, s, o]);
  function a() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ q("div", { className: "wx-8HQVQV wx-header", children: [
    n !== "right" ? /* @__PURE__ */ g(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-left",
        onClick: () => r && r({ diff: -1, type: e })
      }
    ) : /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-spacer" }),
    /* @__PURE__ */ g("span", { className: "wx-8HQVQV wx-label", onClick: a, children: l }),
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
  const i = (ye(ot) || rn()).getRaw().calendar, l = (i.weekStart || 7) % 7, a = i.dayShort.slice(l).concat(i.dayShort.slice(0, l)), c = (v, N, b) => new Date(
    v.getFullYear(),
    v.getMonth() + (N || 0),
    v.getDate() + (b || 0)
  );
  let d = n !== "normal";
  function u(v) {
    const N = v.getDay();
    return N === 0 || N === 6;
  }
  function f() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - (v.getDay() - (l - 7)) % 7), v;
  }
  function p() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + (6 - v.getDay() + l) % 7), v;
  }
  const m = W(0);
  function h(v, N) {
    N.timeStamp !== m.current && (m.current = N.timeStamp, N.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const x = _(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), w = _(() => {
    const v = f(), N = p(), b = e.getMonth();
    let $ = [];
    for (let R = v; R <= N; R.setDate(R.getDate() + 1)) {
      const z = {
        day: R.getDate(),
        in: R.getMonth() === b,
        date: R.valueOf()
      };
      let C = "";
      if (C += z.in ? "" : " wx-inactive", C += x.indexOf(z.date) > -1 ? " wx-selected" : "", d) {
        const I = z.date == x[0], M = z.date == x[1];
        I && !M ? C += " wx-left" : M && !I && (C += " wx-right"), z.date > x[0] && z.date < x[1] && (C += " wx-inrange");
      }
      if (C += u(R) ? " wx-weekend" : "", r) {
        const I = r(R);
        I && (C += " " + I);
      }
      $.push({ ...z, css: C });
    }
    return $;
  }, [e, x, d, r]), y = W(null);
  let k = W({});
  return k.current.click = h, P(() => {
    bs(y.current, k.current);
  }, []), /* @__PURE__ */ q("div", { children: [
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekdays", children: a.map((v) => /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekday", children: v }, v)) }),
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-days", ref: y, children: w.map((v) => /* @__PURE__ */ g(
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
  const [i, l] = Oe(t || /* @__PURE__ */ new Date()), [a, c] = Oe(e || /* @__PURE__ */ new Date()), d = ye(ot).getRaw().calendar, u = d.monthShort || [], f = _(() => a.getMonth(), [a]), p = E(
    (x, w) => {
      if (x != null) {
        w.stopPropagation();
        const y = new Date(a);
        y.setMonth(x), c(y), o && o({ current: y });
      }
      n === "normal" && l(new Date(a)), r && r();
    },
    [a, n, o, r]
  ), m = E(() => {
    const x = new Date(Ns(i, n) || a);
    x.setMonth(a.getMonth()), x.setFullYear(a.getFullYear()), s && s(x);
  }, [i, a, n, s]), h = E(
    (x) => {
      const w = x.target.closest("[data-id]");
      if (w) {
        const y = parseInt(w.getAttribute("data-id"), 10);
        p(y, x);
      }
    },
    [p]
  );
  return /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-months", onClick: h, children: u.map((x, w) => /* @__PURE__ */ g(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (f === w ? " wx-current" : ""),
        "data-id": w,
        children: x
      },
      w
    )) }),
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ g(gr, { onClick: m, children: d.done }) })
  ] });
}
const Fn = "wx-1XEF33", mi = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = ye(ot).getRaw().calendar, [l, a] = Oe(e), [c, d] = Oe(t), u = _(() => l.getFullYear(), [l]), f = _(() => {
    const { start: w, end: y } = $s(u), k = [];
    for (let v = w; v <= y; ++v)
      k.push(v);
    return k;
  }, [u]), p = {
    click: m
  };
  function m(w, y) {
    if (w) {
      y.stopPropagation();
      const k = new Date(l);
      k.setFullYear(w), a(k), s && s({ current: k });
    }
    o === "normal" && d(new Date(l)), n && n();
  }
  function h() {
    const w = new Date(Ns(c, o) || l);
    w.setFullYear(l.getFullYear()), r && r(w);
  }
  const x = W(null);
  return P(() => {
    x.current && bs(x.current, p);
  }, []), /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g("div", { className: Fn + " wx-years", ref: x, children: f.map((w, y) => /* @__PURE__ */ g(
      "div",
      {
        className: Fn + ` wx-year ${u == w ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": w,
        children: w
      },
      y
    )) }),
    /* @__PURE__ */ g("div", { className: Fn + " wx-buttons", children: /* @__PURE__ */ g(gr, { onClick: h, children: i.done }) })
  ] });
}, Or = {
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
  onChange: l
}) {
  const a = ye(ot).getGroup("calendar"), [c, d] = j("month"), u = Array.isArray(o) ? o : o ? Si : [], f = (w, y) => {
    w.preventDefault(), l && l({ value: y });
  }, p = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (w) => {
    const { diff: y, current: k } = w;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const v = Or[c];
      n(y > 0 ? v.next(e) : v.prev(e));
    } else k && n(k);
    i && i();
  }, h = (w) => {
    d("month"), l && l({ select: !0, value: w });
  }, x = _(() => Or[c].component, [c]);
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ q("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ g(hi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ q("div", { children: [
          /* @__PURE__ */ g(
            x,
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
          c === "month" && u.length > 0 && /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((w) => /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ g(
            gr,
            {
              onClick: (y) => f(y, $i(w)),
              children: a(w)
            }
          ) }, w)) })
        ] })
      ] })
    }
  );
}
function En(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = ye(ot);
  const o = _(() => {
    let i = s;
    return (!i || !i.extend) && (i = Et(tn)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ g(ot.Provider, { value: o, children: r });
}
function Pr(t, e, n, r) {
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
  const [o, i] = Oe(t), [l, a] = Oe(e);
  P(() => {
    Pr(l, o, a, !1);
  }, [o, l]);
  const c = E(
    (u) => {
      const f = u.value;
      f ? (i(new Date(f)), Pr(l, new Date(f), a, !0)) : i(null), s && s({ value: f ? new Date(f) : null });
    },
    [s, l]
  ), d = E(
    (u) => {
      a(u);
    },
    [a]
  );
  return l ? /* @__PURE__ */ g(En, { children: /* @__PURE__ */ g(
    _i,
    {
      value: o,
      current: l,
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
  format: l = "",
  buttons: a = Ni,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: f = !1,
  onChange: p
}) {
  const { calendar: m, formats: h } = (ye(ot) || rn()).getRaw(), x = l || h?.dateFormat;
  let w = typeof x == "function" ? x : pt(x, m);
  const [y, k] = j(t), [v, N] = j(!1);
  P(() => {
    k(t);
  }, [t]);
  function b() {
    N(!1);
  }
  function $(C) {
    const I = C === y || C && y && C.valueOf() === y.valueOf() || !C && !y;
    k(C), I || p && p({ value: C }), setTimeout(b, 1);
  }
  const R = _(
    () => y ? w(y) : "",
    [y, w]
  );
  function z({ value: C, input: I }) {
    if (!u && !f || I) return;
    let M = typeof u == "function" ? u(C) : C ? new Date(C) : null;
    M = isNaN(M) ? y || null : M || null, $(M);
  }
  return P(() => {
    const C = b;
    return window.addEventListener("scroll", C), () => window.removeEventListener("scroll", C);
  }, []), /* @__PURE__ */ q("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => N(!0), children: [
    /* @__PURE__ */ g(
      sn,
      {
        css: c,
        title: d,
        value: R,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: b,
        onChange: z,
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
        onCancel: b,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ g(
          Ts,
          {
            buttons: a,
            value: y,
            onChange: (C) => $(C.value)
          }
        )
      }
    )
  ] });
}
function Ds({
  value: t = "",
  options: e = [],
  textOptions: n = null,
  placeholder: r = "",
  disabled: s = !1,
  error: o = !1,
  title: i = "",
  textField: l = "label",
  clear: a = !1,
  children: c,
  onChange: d
}) {
  const u = W(null), f = W(null);
  let [p, m] = Oe(t);
  function h(v) {
    u.current = v.navigate, f.current = v.keydown;
  }
  const x = _(() => p || p === 0 ? (n || e).find((v) => v.id === p) : null, [p, n, e]), w = E(
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
  return /* @__PURE__ */ q(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => u.current(k()),
      onKeyDown: (v) => f.current(v, k()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ g("div", { className: "wx-2YgblL wx-label", children: x ? c ? c(x) : x[l] : r ? /* @__PURE__ */ g("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        a && !s && p ? /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ g(Mn, { items: e, onReady: h, onSelect: w, children: ({ option: v }) => c ? c(v) : v[l] })
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
  title: l = "",
  disabled: a = !1,
  onChange: c
}) {
  const d = Yt(t), [u, f] = Oe(o), p = W({ value: u, input: u }), m = _(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), h = _(() => a ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [a, m]);
  function x({ target: k }) {
    const v = k.value * 1;
    f(v), c && c({
      value: v,
      previous: p.current.input,
      input: !0
    }), p.current.input = v;
  }
  function w({ target: k }) {
    const v = k.value * 1;
    f(v), c && c({ value: v, previous: p.current.value }), p.current.value = v;
  }
  P(() => {
    f(o);
  }, [o]);
  const y = W(null);
  return P(() => {
    if (y.current)
      return y.current.addEventListener("change", w), () => {
        y.current && y.current.removeEventListener("change", w);
      };
  }, [y, w]), /* @__PURE__ */ q("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: l, children: [
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
        disabled: a,
        value: u,
        onInput: x,
        style: { background: h },
        ref: y
      }
    ) })
  ] });
}
const Di = ({
  id: t,
  value: e = 0,
  step: n = 1,
  min: r = 0,
  max: s = 1 / 0,
  error: o = !1,
  disabled: i = !1,
  readonly: l = !1,
  onChange: a
}) => {
  const c = Yt(t), [d, u] = Oe(e), f = E(() => {
    if (l || d <= r) return;
    const x = d - n;
    u(x), a && a({ value: x });
  }, [d, l, r, n, a]), p = E(() => {
    if (l || d >= s) return;
    const x = d + n;
    u(x), a && a({ value: x });
  }, [d, l, s, n, a]), m = E(() => {
    if (!l) {
      const x = Math.round(Math.min(s, Math.max(d, r)) / n) * n, w = isNaN(x) ? Math.max(r, 0) : x;
      u(w), a && a({ value: w });
    }
  }, [l, d, s, r, n, a]), h = E(
    (x) => {
      const w = x.target.value * 1;
      u(w), a && a({ value: w, input: !0 });
    },
    [a]
  );
  return /* @__PURE__ */ q(
    "div",
    {
      className: `wx-22t21n wx-counter ${i ? "wx-disabled" : ""} ${l ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
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
            readOnly: l,
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
function Mi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ q(
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
  return /* @__PURE__ */ g("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ g(Mi, { notice: e }, e.id)) });
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
  const l = (ye(ot) || rn()).getGroup("core"), a = W(null);
  P(() => {
    a.current?.focus();
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
      ref: a,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ q("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ g("div", { children: r }),
        s || e && /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ g(
          gt,
          {
            type: `block ${u === "ok" ? "primary" : "secondary"}`,
            onClick: (f) => d(f, u),
            children: l(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Ii({ children: t }, e) {
  const [n, r] = j(null), [s, o] = j([]);
  return Mt(
    e,
    () => ({
      showModal: (i) => {
        const l = { ...i };
        return r(l), new Promise((a, c) => {
          l.resolve = (d) => {
            r(null), a(d);
          }, l.reject = (d) => {
            r(null), c(d);
          };
        });
      },
      showNotice: (i) => {
        i = { ...i }, i.id = i.id || fr(), i.remove = () => o((l) => l.filter((a) => a.id !== i.id)), i.expire != -1 && setTimeout(i.remove, i.expire || 5100), o((l) => [...l, i]);
      }
    }),
    []
  ), /* @__PURE__ */ q(Ee, { children: [
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
Dt(Ii);
function Qt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const l = _(() => fr(), []);
  return /* @__PURE__ */ g(pr.Provider, { value: l, children: /* @__PURE__ */ q(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ g("label", { className: "wx-2oVUvC wx-label", htmlFor: l, children: t }),
        /* @__PURE__ */ g("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: hr(i, { id: l }) })
      ]
    }
  ) });
}
const Ms = ({
  value: t = !1,
  type: e = "",
  icon: n = "",
  disabled: r = !1,
  iconActive: s = "",
  onClick: o,
  title: i = "",
  css: l = "",
  text: a = "",
  textActive: c = "",
  children: d,
  active: u,
  onChange: f
}) => {
  const [p, m] = Oe(t), h = _(() => (p ? "pressed" : "") + (e ? " " + e : ""), [p, e]), x = E(
    (w) => {
      let y = !p;
      o && o(w), w.defaultPrevented || (m(y), f && f({ value: y }));
    },
    [p, o, f]
  );
  return p && u ? /* @__PURE__ */ g(
    gt,
    {
      title: i,
      text: p && c || a,
      css: l,
      type: h,
      icon: p && s || n,
      onClick: x,
      disabled: r,
      children: hr(u, { value: p })
    }
  ) : d ? /* @__PURE__ */ g(
    gt,
    {
      title: i,
      text: p && c || a,
      css: l,
      type: h,
      icon: p && s || n,
      onClick: x,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ g(
    gt,
    {
      title: i,
      text: p && c || a,
      css: l,
      type: h,
      icon: p && s || n,
      onClick: x,
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
  onChange: l
}) {
  let [a, c] = Oe(t);
  const { calendar: d, formats: u } = (ye(ot) || rn()).getRaw(), f = d.clockFormat == 12, p = 23, m = 59, h = _(() => {
    const A = i || u?.timeFormat;
    return typeof A == "function" ? A : pt(A, d);
  }, [i, u, d]), x = _(() => h(new Date(0, 0, 0, 1)).indexOf("01") != -1, [h]), w = (A, re) => (A < 10 && re ? `0${A}` : `${A}`).slice(-2), y = (A) => w(A, !0), k = (A) => `${A}`.replace(/[^\d]/g, "") || 0, v = (A) => f && (A = A % 12, A === 0) ? "12" : w(A, x), N = E((A, re) => (A = k(A), Math.min(A, re)), []), [b, $] = j(null), R = a || Yr, z = N(R.getHours(), p), C = N(R.getMinutes(), m), I = z > 12, M = v(z), H = y(C), T = _(
    () => h(new Date(0, 0, 0, z, C)),
    [z, C, h]
  ), G = E(() => {
    $(!0);
  }, []), te = E(() => {
    const A = new Date(R);
    A.setHours(A.getHours() + (I ? -12 : 12)), c(A), l && l({ value: A });
  }, [R, I, l]), ue = E(
    ({ value: A }) => {
      if (R.getHours() === A) return;
      const re = new Date(R);
      re.setHours(A), c(re), l && l({ value: re });
    },
    [R, l]
  ), Q = E(
    ({ value: A }) => {
      if (R.getMinutes() === A) return;
      const re = new Date(R);
      re.setMinutes(A), c(re), l && l({ value: re });
    },
    [R, l]
  ), le = E(
    (A) => (A = N(A, p), f && (A = A * 1, A === 12 && (A = 0), I && (A += 12)), A),
    [N, f, I]
  ), ve = E(() => {
    $(null);
  }, []);
  return /* @__PURE__ */ q(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : G,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ g(
          sn,
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
        b && !s && /* @__PURE__ */ g(Vt, { onCancel: ve, width: "unset", children: /* @__PURE__ */ q("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ q("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: M,
                onChange: (A) => {
                  const re = le(A.target.value);
                  ue({ value: re });
                }
              }
            ),
            /* @__PURE__ */ g("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: H,
                onChange: (A) => {
                  const re = N(A.target.value, m);
                  Q({ value: re });
                }
              }
            ),
            f && /* @__PURE__ */ g(
              Ms,
              {
                value: I,
                onClick: te,
                active: () => /* @__PURE__ */ g("span", { children: "pm" }),
                children: /* @__PURE__ */ g("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ g(Qt, { width: "unset", children: /* @__PURE__ */ g(
            Zn,
            {
              label: d.hours,
              value: z,
              onChange: ue,
              max: p
            }
          ) }),
          /* @__PURE__ */ g(Qt, { width: "unset", children: /* @__PURE__ */ g(
            Zn,
            {
              label: d.minutes,
              value: C,
              onChange: Q,
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
  const r = W(null);
  return P(() => en(r.current, n).destroy, []), /* @__PURE__ */ g("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Es({ theme: t = "", target: e, children: n }) {
  const r = W(null), s = W(null), [o, i] = j(null);
  r.current || (r.current = document.createElement("div"));
  const l = ye(nn);
  return P(() => {
    i(
      e || zi(s.current) || et.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Fo(
      /* @__PURE__ */ g(
        "div",
        {
          className: `wx-3ZWsT0 wx-${t || l}-theme`,
          children: n
        }
      ),
      o
    ) : null
  ] });
}
function zi(t) {
  const e = et.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Wi() {
  return /* @__PURE__ */ g(Ee, {});
}
function Vr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "material", children: /* @__PURE__ */ q(Ee, { children: [
    n && /* @__PURE__ */ g("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ q(Ee, { children: [
      /* @__PURE__ */ g(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ g(Wi, {}),
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
  return /* @__PURE__ */ g(Ee, {});
}
function Gr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "willow", children: /* @__PURE__ */ q(Ee, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ q(Ee, { children: [
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
function jr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(nn.Provider, { value: "willow-dark", children: /* @__PURE__ */ q(Ee, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ q(Ee, { children: [
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
ur(et);
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
var Fi = (/* @__PURE__ */ new Date()).valueOf(), Oi = () => Fi++;
function Pi(t, e) {
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
      return Pi(t, e);
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
var Kr = class {
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
    const l = this._pool.get(r.parent), a = s ? o : this._pool.get(o.parent);
    a.data || (a.data = []);
    const c = wn(l, r.id);
    Gi(l, c);
    const d = s ? a.data.length : wn(a, o.id) + (e === "after" ? 1 : 0);
    if (Br(a, d, r), l.id === a.id && c === d) return null;
    r.parent = a.id, r.$level !== i && (r.$level = i, this.setLevel(r, i + 1, !0)), this.update(r.id, r), this._clearBranch(l);
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
var Ls = 2, ji = class {
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
      const l = e[i], a = n[i], c = t[i];
      if (l && (a === c && typeof c != "object" || c instanceof Date && a instanceof Date && a.getTime() === c.getTime())) continue;
      const d = r + (r ? "." : "") + i;
      l ? (l.__parse(c, d, s, o) && (n[i] = c), o & Ls ? s[d] = l.__trigger : l.__trigger()) : (c && c.__reactive ? e[i] = this._wrapNested(c, c, d, s) : e[i] = this._wrapWritable(c), n[i] = c), s[d] = s[d] || null;
    }
  }
  _wrapNested(t, e, n, r) {
    const s = this._wrapWritable(t);
    return this._wrapProperties(t, s, e, n, r, 0), s.__parse = (o, i, l, a) => (this._wrapProperties(o, s, e, i, l, a), !1), s;
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
}, Ki = class {
  constructor(t, e, n, r) {
    typeof t == "function" ? this._setter = t : this._setter = t.setState.bind(t), this._routes = e, this._parsers = n, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((s) => {
      s.in.forEach((o) => {
        const i = this._triggers.get(o) || [];
        i.push(s), this._triggers.set(o, i);
      }), s.out.forEach((o) => {
        const i = this._sources.get(o) || {};
        s.in.forEach((l) => i[l] = !0), this._sources.set(o, i);
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
      i && i.forEach((l) => {
        e.indexOf(l) == -1 && e.push(l);
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
    return e.data?.forEach((i, l) => {
      const a = this.copy(i, s.id, l);
      o = o.concat(a);
    }), o;
  }
  normalizeTask(e) {
    const n = e.id || mr(), r = e.parent || 0, s = e.text || "", o = e.type || "task", i = e.progress || 0, l = e.details || "", a = { ...e, id: n, text: s, parent: r, progress: i, type: o, details: l };
    return e.segments && (a.segments = e.segments.map((c) => ({ ...c }))), e.segments && (a.segments = e.segments.map((c) => ({ ...c }))), a;
  }
  getSummaryId(e, n = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (n) {
      let o = e, i = this.getSummaryId(o);
      const l = [];
      for (; i; ) o = i, l.push(i), i = this.getSummaryId(o);
      return l;
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
    return n && Ws(n, e), e;
  }
}
function Ws(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Ws(n.data, e);
  });
}
function $e(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function wt(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function An(t, e) {
  const n = $e(t);
  return isNaN(e) ? wt(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function wr(t, e) {
  const n = $e(t);
  if (isNaN(e)) return wt(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = wt(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Fs(t, e) {
  const n = +$e(t);
  return wt(t, n + e);
}
const Os = 6048e5, el = 864e5, Ps = 6e4, Ys = 36e5;
function tl(t, e) {
  return Fs(t, e * Ys);
}
let nl = {};
function Vs() {
  return nl;
}
function $n(t, e) {
  const n = Vs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = $e(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Zt(t) {
  return $n(t, { weekStartsOn: 1 });
}
function rl(t) {
  const e = $e(t), n = e.getFullYear(), r = wt(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Zt(r), o = wt(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Zt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function Nt(t) {
  const e = $e(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = $e(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Gs(t, e) {
  const n = Nt(t), r = Nt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / el);
}
function Ur(t) {
  const e = rl(t), n = wt(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Zt(n);
}
function sl(t, e) {
  return Fs(t, e * Ps);
}
function ol(t, e) {
  const n = e * 3;
  return wr(t, n);
}
function js(t, e) {
  const n = e * 7;
  return An(t, n);
}
function il(t, e) {
  return wr(t, e * 12);
}
function Xt(t, e) {
  const n = $e(t), r = $e(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ll(t, e) {
  const n = Nt(t), r = Nt(e);
  return +n == +r;
}
function xr(t, e) {
  const n = Zt(t), r = Zt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / Os);
}
function al(t, e) {
  const n = $e(t), r = $e(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function cl(t, e) {
  const n = $e(t), r = $e(e);
  return n.getFullYear() - r.getFullYear();
}
function yr(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function Ks(t, e) {
  return +$e(t) - +$e(e);
}
function dl(t, e, n) {
  const r = Ks(t, e) / Ys;
  return yr(n?.roundingMethod)(r);
}
function ul(t, e, n) {
  const r = Ks(t, e) / Ps;
  return yr(n?.roundingMethod)(r);
}
function Bs(t) {
  const e = $e(t);
  return e.setHours(23, 59, 59, 999), e;
}
function vr(t) {
  const e = $e(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function fl(t) {
  const e = $e(t);
  return +Bs(e) == +vr(e);
}
function Us(t, e) {
  const n = $e(t), r = $e(e), s = Xt(n, r), o = Math.abs(al(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let l = Xt(n, r) === -s;
    fl($e(t)) && o === 1 && Xt(t, r) === 1 && (l = !1), i = s * (o - Number(l));
  }
  return i === 0 ? 0 : i;
}
function hl(t, e, n) {
  const r = Us(t, e) / 3;
  return yr(n?.roundingMethod)(r);
}
function pl(t, e) {
  const n = $e(t), r = $e(e), s = Xt(n, r), o = Math.abs(cl(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Xt(n, r) === -s, l = s * (o - +i);
  return l === 0 ? 0 : l;
}
function Jt(t) {
  const e = $e(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function qs(t) {
  const e = $e(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function gl(t) {
  const e = $e(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ml(t) {
  const e = $e(t), n = wt(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function wl(t) {
  const e = $e(t);
  return e.setMinutes(59, 59, 999), e;
}
function xl(t, e) {
  const n = Vs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = $e(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function kr(t) {
  const e = $e(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function Xs(t) {
  const e = $e(t), n = e.getFullYear(), r = e.getMonth(), s = wt(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function yl(t) {
  const e = $e(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Qs(t) {
  const e = $e(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : yl(e) ? 366 : 365;
}
function vl(t) {
  const e = Ur(t), n = +Ur(js(e, 60)) - +e;
  return Math.round(n / Os);
}
function Ht(t, e) {
  const n = $e(t), r = $e(e);
  return +n == +r;
}
function kl(t) {
  const e = $e(t);
  return e.setMinutes(0, 0, 0), e;
}
function bl(t, e, n) {
  const r = $n(t, n), s = $n(e, n);
  return +r == +s;
}
function Sl(t, e) {
  const n = $e(t), r = $e(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function $l(t, e) {
  const n = Jt(t), r = Jt(e);
  return +n == +r;
}
function _l(t, e) {
  const n = $e(t), r = $e(e);
  return n.getFullYear() === r.getFullYear();
}
const Jn = { year: pl, quarter: hl, month: Us, week: xr, day: Gs, hour: dl, minute: ul }, yt = { year: { quarter: 4, month: 12, week: vl, day: Cl, hour: Nl }, quarter: { month: 3, week: Tl, day: Zs, hour: Dl }, month: { week: Ml, day: El, hour: Rl }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Cl(t) {
  return t ? Qs(t) : 365;
}
function Nl(t) {
  return Qs(t) * 24;
}
function Tl(t) {
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
function Dl(t) {
  return Zs(t) * 24;
}
function Ml(t) {
  if (t) {
    const e = qs(t), n = An(Nt(vr(t)), 1);
    return xr(n, e);
  }
  return 5;
}
function El(t) {
  return t ? Xs(t) : 30;
}
function Rl(t) {
  return Xs(t) * 24;
}
function Cn(t, e, n) {
  const r = yt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Il(t, e) {
  return t === e || !!(yt[t] && yt[t][e]);
}
const Nn = { year: il, quarter: ol, month: wr, week: js, day: An, hour: tl, minute: sl };
function br(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !yt[t][o] || typeof yt[t][o] == "number" || to(t, r, s, n) ? Ut(t, r, s, o, i, n) : Al(r, s, t, o, i, n);
}
function Ut(t, e, n, r, s, o) {
  const i = r || t;
  let l = n, a = e;
  if (s && (l = mt(i, n, o), a = mt(i, e, o), a < e && (a = ut(i)(a, 1))), t !== i) {
    const c = Jn[i](a, l), d = Cn(t, i, n);
    return c / d;
  } else return Jn[i](a, l);
}
function Al(t, e, n, r, s, o) {
  let i = 0;
  const l = mt(n, e, o);
  if (e > l) {
    const c = Nn[n](l, 1);
    i = Ut(n, c, e, r, void 0, o), e = c;
  }
  let a = 0;
  return to(n, e, t, o) || (a = Ut(n, mt(n, t, o), e, void 0, void 0, o), e = Nn[n](e, a)), a += i + Ut(n, t, e, r, void 0, o), !a && s && (a = Ut(n, t, e, r, s, o)), a;
}
function ut(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Nn[t];
}
const Js = { year: ml, quarter: Jt, month: qs, week: (t, e) => $n(t, { weekStartsOn: e }), day: Nt, hour: kl };
function mt(t, e, n) {
  const r = Js[t];
  return r ? r(e, n) : new Date(e);
}
const Hl = { year: gl, quarter: kr, month: vr, week: (t, e) => xl(t, { weekStartsOn: e }), day: Bs, hour: wl }, eo = { year: _l, quarter: $l, month: Sl, week: (t, e, n) => bl(t, e, { weekStartsOn: n }), day: ll };
function to(t, e, n, r) {
  const s = eo[t];
  return s ? s(e, n, r) : !1;
}
const Ll = { start: Js, end: Hl, add: Nn, isSame: eo, diff: Jn, smallerCount: yt }, qr = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function zl(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((l, a) => at.indexOf(l) - at.indexOf(a)).shift();
      let s = at.indexOf(r);
      const o = e[n][r], i = qr(o);
      for (let l = s - 1; l >= 0; l--) {
        const a = at[l], c = qr(yt[a][r]);
        if (i <= c) break;
        s = l;
      }
      at.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) yt[r][t] = e[n][r];
    else Ll[n][t] = e[n];
  }
}
function On(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Wl(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Ft(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: ut(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const at = ["year", "quarter", "month", "week", "day", "hour"], er = 50, tr = 300;
function Fl(t, e, n, r, s) {
  let o = t, i = e, l = !1, a = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, l = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, a = !0);
  });
  const c = ut(r || "day");
  return o ? l && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? a && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function Ol(t, e, n, r, s, o, i) {
  const l = Ft(i).unit, a = br(l, void 0, o), c = a(e, t, "", !0), d = mt(l, e, o);
  t = mt(l, t, o), e = d < e ? ut(l)(d, 1) : d;
  const u = c * r, f = s * i.length, p = i.map((h) => {
    const x = [], w = ut(h.unit);
    let y = mt(h.unit, t, o);
    for (; y < e; ) {
      const k = w(y, h.step), v = y < t ? t : y, N = k > e ? e : k, b = a(N, v, "", !0) * r, $ = typeof h.format == "function" ? h.format(y, k) : h.format;
      let R = "";
      h.css && (R += typeof h.css == "function" ? h.css(y) : h.css), x.push({ width: b, value: $, date: v, css: R, unit: h.unit }), y = k;
    }
    return { cells: x, add: w, height: s };
  });
  let m = r;
  return l !== n && (m = Math.round(m / Cn(l, n)) || 1), { rows: p, width: u, height: f, diff: a, start: t, end: e, lengthUnit: n, minUnit: l, lengthUnitWidth: m };
}
function Pl(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = at.indexOf(Ft(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((a) => {
    a.minCellWidth || (a.minCellWidth = xn(s.minCellWidth, er)), a.maxCellWidth || (a.maxCellWidth = xn(s.maxCellWidth, tr));
  });
  else {
    const a = [], c = n.length || 1, d = xn(s.minCellWidth, er), u = xn(s.maxCellWidth, tr);
    n.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }), at.forEach((f, p) => {
      if (p === o) a.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (p) for (let h = c - 1; h > 0; h--) {
          const x = at[p - h];
          x && m.push({ unit: x, step: 1, format: e[x] });
        }
        m.push({ unit: f, step: 1, format: e[f] }), a.push({ minCellWidth: d, maxCellWidth: u, scales: m });
      }
    }), s.levels = a;
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level], l = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: l };
}
function Yl(t, e, n, r, s, o, i) {
  t.level = n;
  let l;
  const a = r.scales || r, c = Ft(a).unit, d = Vl(c, s);
  if (e === -1) {
    const p = Cn(c, s);
    l = i * p;
  } else {
    const p = Cn(Ft(o).unit, c);
    l = Math.round(i / p);
  }
  const u = r.minCellWidth ?? er, f = r.maxCellWidth ?? tr;
  return { scales: a, cellWidth: Math.min(f, Math.max(u, l)), lengthUnit: d, zoom: t };
}
function Vl(t, e) {
  const n = at.indexOf(t), r = at.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : at[r];
}
function xn(t, e) {
  return t ?? e;
}
const nr = 8, no = 4, Gl = 3, Xr = 7, jl = nr + no;
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
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: l } = n, { start: a, end: c, lengthUnit: d, diff: u } = i, f = (r ? "base_" : "") + "start", p = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), h = "$y" + (r ? "_base" : ""), x = "$w" + (r ? "_base" : ""), w = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let k = t[f], v = t[p];
  if (r && !k) {
    t[y] = !0;
    return;
  }
  t[f] < a && (t[p] < a || Ht(t[p], a)) ? k = v = a : t[f] > c && (k = v = c), t[m] = Math.round(u(k, a, d) * s), t[h] = r ? t.$y + t.$h + no : o * e + Gl, t[x] = Math.round(u(v, k, d, !0) * s), t[w] = r ? nr : l ? o - Xr - jl : o - Xr, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[x] = t.$h, r && (t[h] = t.$y + nr, t[x] = t[w] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Ht(k, v);
}
const Pn = 20, Kl = function(t, e, n, r, s) {
  const o = Math.round(r / 2) - 3;
  if (!e || !n || !e.$y || !n.$y || e.$skip || n.$skip) return t.$p = "", t.$pl = 0, t;
  let i = !1, l = !1;
  switch (t.type) {
    case "e2s":
      l = !0;
      break;
    case "s2s":
      i = !0, l = !0;
      break;
    case "s2e":
      i = !0;
      break;
  }
  const a = i ? e.$x : e.$x + e.$w, c = s ? e.$y - 7 : e.$y, d = l ? n.$x : n.$x + n.$w, u = s ? n.$y - 7 : n.$y;
  if (a !== d || c !== u) {
    const f = Ul(a, c + o, d, u + o, i, l, r / 2, s), p = ql(d, u + o, l);
    t.$p = `${f},${p}`, t.$pl = Bl(t.$p);
  }
  return t;
};
function Bl(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s], [l, a] = n[s + 1];
    r += Math.hypot(l - o, a - i);
  }
  return r;
}
function Ul(t, e, n, r, s, o, i, l) {
  const a = Pn * (s ? -1 : 1), c = Pn * (o ? -1 : 1), d = t + a, u = n + c, f = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], p = u - d;
  let m = r - e;
  const h = o === s;
  return h || (u <= t + Pn - 2 && o || u > t && !o) && (m = l ? m - i + 6 : m - i), h && o && d > u || h && !o && d < u ? (f[4] = f[2] + p, f[5] = f[3], f[6] = f[4], f[7] = f[5] + m) : (f[4] = f[2], f[5] = f[3] + m, f[6] = f[4] + p, f[7] = f[5]), f.join(",");
}
function ql(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function lo(t) {
  return t.map((e) => {
    const n = e.id || mr();
    return { ...e, id: n };
  });
}
const ao = ["start", "end", "duration"];
function Xl(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !ao.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function Ql(t, e) {
  return typeof e == "function" ? e : ao.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => Xl(n, r.id) ? e : null) : e;
}
function Zl(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && Ql(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const co = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Lt(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, l = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], a = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], f = { "indent-task:remove": 2 }, p = !i && d.includes(e), m = { parent: u.includes(e), level: f[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !p)) {
    if (e !== "paste-task" && (t._temp = null), l.includes(e) || p || s.length === 1) Zr(t, e, n, r);
    else if (i) {
      const h = a.includes(e) ? s : Jl(s, o, m);
      c.includes(e) && h.reverse();
      const x = t.getHistory();
      x && x.startBatch(), h.forEach((w, y) => Zr(t, e, w, r, y)), x && x.endBatch();
    }
  }
}
function Jl(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function Zr(t, e, n, r, s) {
  const o = t.exec ? t.exec : t.in.exec;
  let i = e.split(":")[0], l = e.split(":")[1];
  const a = n?.id || n;
  let c = { id: a }, d = {}, u = !1;
  if (i == "copy-task" || i == "cut-task") {
    t._temp || (t._temp = []), t._temp.push({ id: a, cut: i == "cut-task" });
    return;
  } else if (i == "paste-task") {
    if (t._temp && t._temp.length) {
      const f = t.getHistory();
      f && f.startBatch();
      const p = /* @__PURE__ */ new Map();
      if (t._temp.forEach((m) => {
        const h = { id: m.id, target: a, mode: "after" };
        o(m.cut ? "move-task" : "copy-task", h), p.set(m.id, h.id);
      }), !t._temp[0].cut) {
        const { links: m } = t.getState(), h = t._temp.map((w) => w.id), x = [];
        m.forEach((w) => {
          h.includes(w.source) && h.includes(w.target) && x.push(w);
        }), x.forEach((w) => {
          o("add-link", { link: { source: p.get(w.source), target: p.get(w.target), type: w.type } });
        }), t._temp.forEach((w, y) => {
          o("select-task", { id: p.get(w.id), toggle: !!y });
        });
      }
      f && f.endBatch(), t._temp = null;
    }
    return;
  } else i === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: a, show: !0, select: !1 }, c = {}, u = !0) : i === "edit-task" ? (i = "show-editor", l === "segment" && typeof n == "object" && (d = n)) : i === "convert-task" ? (i = "update-task", d = { task: { type: l } }, l = void 0) : i === "indent-task" && (l = l === "add");
  if (i === "split-task" && typeof n == "object") d = n;
  else if (i === "delete-task" && l === "segment" && typeof n == "object") {
    const f = t.getTask(a), { segmentIndex: p } = n, m = f.segments.filter((h, x) => x !== p);
    o("update-task", { id: a, task: { segments: m } });
    return;
  }
  typeof l < "u" && (d = { mode: l, ...d }), c = { ...c, ...d }, o(i, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function $r(t, e) {
  return t.some((n) => n.data ? $r(n.data, e) : n.id === e);
}
const Jr = (t, e) => ut(t, e), ea = (t, e) => br(t, e);
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
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, l, a] = uo(n);
  t.type === "milestone" ? (t[a] = 0, t[l] = void 0) : t[i] && (t[a] ? t[l] = Jr(o, r)(t[i], t[a]) : t[l] ? t[a] = ea(o, r)(t[l], t[i]) : (t[l] = Jr(o, r)(t[i], 1), t[a] = 1));
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
class ta extends ji {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new Ki(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: l, end: a, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!l || !a || u) {
        const f = Ft(d).unit, p = Fl(l, a, u, f, c);
        (p._end != o || p._start != i) && this.setState(p, s);
      } else this.setState({ _start: l, _end: a }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: l, _end: a, cellWidth: c, scaleHeight: d, scales: u, _weekStart: f } = o, p = Ft(u).unit;
      Il(p, i) || (i = p);
      const m = Ol(l, a, i, c, d, f, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: l, _scales: a, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), f = l.toArray().map((p, m) => io(p, m, { cellWidth: o, cellHeight: i, _scales: a, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: f }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: l, baselines: a, criticalPath: c } = this.getState(), d = i.map((u) => {
        const f = o.byId(u.source), p = o.byId(u.target);
        return Kl(u, f, p, l, a);
      }).toSorted((u, f) => c ? !!u.$critical == !!f.$critical ? f.$pl - u.$pl : u.$critical ? 1 : -1 : f.$pl - u.$pl).filter((u) => u !== null);
      this.setState({ _links: d }, s);
    } }, { in: ["tasks", "activeTask"], out: ["_activeTask"], exec: (s) => {
      const o = this.getState();
      let { activeTask: i } = o;
      i && typeof i == "object" && (i = i.id);
      const l = o.tasks.byId(i);
      this.setState({ _activeTask: l || null }, s);
    } }, { in: ["tasks", "selected"], out: ["_selected"], exec: (s) => {
      const { tasks: o, selected: i } = this.getState(), l = i.map((a) => o.byId(a)).filter((a) => !!a);
      this.setState({ _selected: l }, s);
    } }, { in: ["start", "end"], out: ["cellWidth"], exec: (s) => {
      const { _cellWidth: o, cellWidth: i } = this.getState();
      o != i && this.setState({ cellWidth: o }, s);
    } }], { tasks: (s) => new Ji(s), links: (s) => new Kr(s), columns: (s) => Zl(s) });
    const n = this.in = new Bi();
    n.on("show-editor", (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: i, segmentIndex: l } = s;
        if (i && (l || l === 0)) {
          this.setStateAsync({ activeTask: { id: i, segmentIndex: l } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }), n.on("select-task", ({ id: s, toggle: o, range: i, show: l, segmentIndex: a }) => {
      const { selected: c, _tasks: d, activeTask: u, splitTasks: f } = this.getState();
      let p = !1, m;
      if (c.length && (o || i)) {
        const x = [...c];
        if (i) {
          const w = x[x.length - 1], y = d.findIndex(($) => $.id == w), k = d.findIndex(($) => $.id == s), v = Math.min(y, k), N = Math.max(y, k) + 1, b = d.slice(v, N).map(($) => $.id);
          y > k && b.reverse(), b.forEach(($) => {
            x.includes($) || x.push($);
          });
        } else if (o) {
          const w = x.findIndex((y) => y == s);
          w === -1 ? x.push(s) : (p = !0, x.splice(w, 1));
        }
        m = x;
      } else m = [s];
      const h = { selected: m };
      l && m.length && (h._scrollTask = { id: m[0], mode: l }), this.setStateAsync(h), !p && u && (u !== s || f) && n.exec("show-editor", { id: s, ...f && { segmentIndex: a } });
    }), n.on("delete-link", ({ id: s }) => {
      const { links: o } = this.getState();
      o.remove(s), this.setStateAsync({ links: o });
    }), n.on("update-link", (s) => {
      const { links: o } = this.getState(), i = s.id;
      let l = s.link;
      o.update(i, l), l = o.byId(i), !l.lag && l.lag !== 0 && delete l.lag, this.setStateAsync({ links: o }), s.link = l;
    }), n.on("add-link", (s) => {
      const { link: o } = s, { links: i } = this.getState();
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || mr(), i.add(o), this.setStateAsync({ links: i }), s.id = o.id, s.link = i.byId(o.id));
    });
    let r = null;
    n.on("move-task", (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: l } = s;
      const { id: a, inProgress: c } = s, d = o.byId(a);
      if (typeof c > "u" ? s.source = d.parent : s.source = r = r ?? d.parent, c === !1) {
        o.update(d.id, { $reorder: !1 }), this.setState({ tasks: o }), r = null;
        return;
      }
      if (l === a || o.contains(a, l)) {
        s.skipProvider = !0;
        return;
      }
      if (i === "up" || i === "down") {
        const u = o.getBranch(a);
        let f = o.getIndexById(a);
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
        if (l = u[f] && u[f].id || d.parent, l) {
          const p = o.getBranch(l);
          let m = o.getIndexById(l), h = p[m];
          if (h.data) {
            if (i === "before") {
              if (h.parent === d.parent) {
                for (; h.data; ) h.open || n.exec("open-task", { id: h.id, mode: !0 }), h = h.data[h.data.length - 1];
                l = h.id;
              }
            } else if (i === "after") {
              let y;
              h.parent === d.parent ? (y = h, h = h.data[0], l = h.id, i = "before") : p.length - 1 !== m && (y = h, m += 1, h = p[m], d.$level > h.$level && h.data ? (y = h, h = h.data[0], l = h.id, i = "before") : l = h.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const x = o.getSummaryId(d.id);
          o.move(a, i, l);
          const w = o.getSummaryId(a);
          x != w && (x && this.resetSummaryDates(x, "move-task"), w && this.resetSummaryDates(w, "move-task"));
        }
      } else {
        const u = o.byId(l);
        let f = u, p = !1;
        for (; f.$level > d.$level; ) f = o.byId(f.parent), f.id === a && (p = !0);
        if (p) return;
        const m = o.getSummaryId(d.id);
        if (o.move(a, i, l), i == "child") {
          let x = u;
          for (; x.id !== 0 && !x.open; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        }
        const h = o.getSummaryId(a);
        m != h && (m && this.resetSummaryDates(m, "move-task"), h && this.resetSummaryDates(h, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = l, s.mode = i;
    }), n.on("drag-task", (s) => {
      const o = this.getState(), { tasks: i, _tasks: l, _selected: a, _scales: c, cellWidth: d } = o, u = i.byId(s.id), { left: f, top: p, width: m, inProgress: h } = s, x = { _tasks: l, _selected: a };
      if (typeof m < "u" && (u.$w = m, rr(i, u, c, d)), typeof f < "u") {
        if (u.type === "summary") {
          const w = f - u.$x;
          ro(u, w, c, d);
        }
        u.$x = f, rr(i, u, c, d);
      }
      typeof p < "u" && (u.$y = p + 4, u.$reorder = h), typeof m < "u" && (u.$w = m), typeof f < "u" && (u.$x = f), typeof p < "u" && (u.$y = p + 4, u.$reorder = h), this.setState(x);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: l, eventSource: a } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: f, splitTasks: p, calendar: m } = this.getState(), h = d.byId(o), x = { durationUnit: f, calendar: m };
      if (a === "add-task" || a === "copy-task" || a === "move-task" || a === "update-task" || a === "delete-task" || a === "provide-data") {
        St(c, x), d.update(o, c);
        return;
      }
      const w = u.lengthUnit;
      let y = ut(w);
      const k = br(w, m);
      if (l && (c.start && (c.start = y(c.start, l)), !i && i !== 0 && (c.start && c.end ? c.duration = h.duration : (c.start ? c.end = h.end : (c.end = y(c.end, l), c.start = h.start, c.duration = k(c.end, c.start)), k(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? h.type, m && c.start && (c.start = On(c.start, l, m)), c.start && c.end && (!Ht(c.start, h.start) || !Ht(c.end, h.end)) && c.type === "summary" && h.data?.length) {
        let N = l || k(c.start, h.start);
        m && (N = c.start > h.start ? k(c.start, h.start) : -k(h.start, c.start), y = Wl(m)), this.moveSummaryKids(h, (b) => (b = y(b, N), m ? On(b, l, m) : b), "update-task");
      }
      c.start || (c.start = h.start), !c.end && !c.duration && (c.duration = h.duration), St(c, x), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && h.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const v = d.getSummaryId(o);
      v && this.resetSummaryDates(v, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: i, unscheduledTasks: l, durationUnit: a, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: f, task: p, show: m, select: h = !0 } = s;
      !s.eventSource && l && (p.unscheduled = !0);
      let x = -1, w, y;
      if (u ? (y = o.byId(u), f == "child" ? (w = y, p.parent = w.id) : (y.parent !== null && (w = o.byId(y.parent), p.parent = w.id), x = o.getIndexById(u), f == "after" && (x += 1))) : p.parent && (w = o.byId(p.parent)), !p.start) {
        if (w?.start) p.start = new Date(w.start.valueOf());
        else if (y) p.start = new Date(y.start.valueOf());
        else {
          const b = o.getBranch(0);
          let $;
          if (b?.length) {
            const R = b[b.length - 1];
            if (!R.$skip) {
              const z = new Date(R.start.valueOf());
              i.start <= z && ($ = z);
            }
          }
          p.start = $ || ut(a, d)(i.start, 1);
        }
        p.duration = 1;
      }
      d && (p.start = On(p.start, 1, d)), this.getState().baselines && (p.base_start = p.start, p.base_duration = p.duration), St(p, { durationUnit: a, calendar: d });
      const k = o.add(p, x), v = { tasks: o };
      if (w && m) {
        for (; w && w.id; ) n.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        v._scrollTask = { id: k.id, mode: m };
      }
      s.id = k.id;
      const N = o.getSummaryId(k.id);
      N && this.resetSummaryDates(N, "add-task"), this.setStateAsync(v), s.id = k.id, s.task = k, h && n.exec("select-task", { id: k.id });
    }), n.on("delete-task", (s) => {
      const { id: o } = s, { tasks: i, links: l, selected: a } = this.getState();
      s.source = i.byId(o).parent;
      const c = i.getSummaryId(o), d = [o];
      i.eachChild((f) => d.push(f.id), o), l.filter((f) => !(d.includes(f.source) || d.includes(f.target)));
      const u = { tasks: i, links: l };
      a.includes(o) && (u.selected = a.filter((f) => f !== o)), i.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(u);
    }), n.on("indent-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState();
      if (o) {
        const l = i.getBranch(s)[i.getIndexById(s) - 1];
        l && n.exec("move-task", { id: s, mode: "child", target: l.id });
      } else {
        const l = i.byId(s), a = i.byId(l.parent);
        a && a.parent !== null && n.exec("move-task", { id: s, mode: "after", target: l.parent });
      }
    }), n.on("copy-task", (s) => {
      const { id: o, target: i, mode: l, eventSource: a } = s;
      if (a === "copy-task") return;
      const { tasks: c, links: d } = this.getState();
      if (c.contains(o, i)) {
        s.skipProvider = !0;
        return;
      }
      const u = c.getSummaryId(o), f = c.getSummaryId(i);
      let p = c.getIndexById(i);
      l == "before" && (p -= 1);
      const m = c.byId(o), h = c.copy(m, c.byId(i).parent, p + 1);
      s.source = s.id, s.id = h[0][1], m.lazy && (s.lazy = !0), u != f && f && this.resetSummaryDates(f, "copy-task");
      let x = [];
      for (let w = 1; w < h.length; w++) {
        const [y, k] = h[w];
        d.forEach((v) => {
          if (v.source === y) {
            const N = { ...v };
            delete N.target, x.push({ ...N, source: k });
          } else if (v.target === y) {
            const N = { ...v };
            delete N.source, x.push({ ...N, target: k });
          }
        });
      }
      x = x.reduce((w, y) => {
        const k = w.findIndex((v) => v.id === y.id);
        return k > -1 ? w[k] = { ...w[k], ...y } : w.push(y), w;
      }, []);
      for (let w = 1; w < h.length; w++) {
        const [y, k] = h[w], v = c.byId(k);
        n.exec("copy-task", { source: y, id: k, lazy: !!v.lazy, eventSource: "copy-task", target: v.parent, mode: "child", skipUndo: !0 });
      }
      x.forEach((w) => {
        n.exec("add-link", { link: { source: w.source, target: w.target, type: w.type }, eventSource: "copy-task", skipUndo: !0 });
      }), this.setStateAsync({ tasks: c });
    }), n.on("open-task", ({ id: s, mode: o }) => {
      const { tasks: i } = this.getState(), l = i.byId(s);
      l.lazy ? n.exec("request-data", { id: l.id }) : (i.toArray().forEach((a) => a.$y = 0), i.update(s, { open: o }), this.setState({ tasks: i }));
    }), n.on("scroll-chart", ({ left: s, top: o }) => {
      if (!isNaN(s)) {
        const i = this.calcScaleDate(s);
        this.setState({ scrollLeft: s, _scaleDate: i });
      }
      isNaN(o) || this.setState({ scrollTop: o });
    }), n.on("render-data", (s) => {
      this.setState({ area: s });
    }), n.on("provide-data", (s) => {
      const { tasks: o, links: i, durationUnit: l, calendar: a, splitTasks: c } = this.getState(), d = o.byId(s.id);
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], sr(s.data.tasks, { durationUnit: l, calendar: a }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Kr(i.map((u) => u).concat(lo(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: l, _cellWidth: a, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let f = l;
      s < 0 && (f = a || l);
      const p = f + s * 50, m = i.levels[i.level], h = s < 0 && l > m.maxCellWidth;
      if (p < m.minCellWidth || p > m.maxCellWidth || h) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: p, _cellWidth: p });
      const { _scales: x, _start: w, cellWidth: y, _weekStart: k } = this.getState(), v = mt(x.minUnit, w, k), N = x.diff(u, v, "hour");
      typeof o > "u" && (o = y);
      let b = Math.round(N * y) - o;
      b < 0 && (b = 0), this.setState({ scrollLeft: b, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: l, end: a, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: f } = this.getState(), p = ut(i.minUnit);
      let m = i.width;
      if (l && a) {
        if (m < s && m) {
          const k = s / m;
          this.setState({ cellWidth: d * k });
        }
        return !0;
      }
      let h = 0;
      for (; m < s; ) m += d, h++;
      const x = h ? a ? -h : -1 : 0, w = l || p(o, x);
      let y = 0;
      if (u) {
        const k = i.diff(u, w, "hour");
        y = Math.max(0, Math.round(k * d) - (f || 0));
      }
      this.setState({ _start: w, _end: a || p(c, h), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: i }) => {
      const l = this.getState(), { tasks: a } = l;
      let c = l._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && i ? (c.forEach((f, p) => {
        f.key === s && (u = p);
      }), c[u] = d) : c = [d], a.sort(c), this.setState({ _sort: c, tasks: a });
    }), n.on("hotkey", ({ key: s, event: o, eventSource: i }) => {
      switch (s) {
        case "arrowup":
        case "arrowdown": {
          const { selected: l, _tasks: a } = this.getState();
          o.preventDefault();
          const c = l.length;
          let d;
          if (s === "arrowup" ? d = c ? this.getPrevRow(l[c - 1])?.id : a[a.length - 1]?.id : d = c ? this.getNextRow(l[c - 1])?.id : a[0]?.id, d) {
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
      const { cellWidth: o, scales: i, _scales: l } = this.getState(), a = Yl(e, n, r, s, l.lengthUnit, i, o);
      return a._cellWidth = a.cellWidth, this.setState(a), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks ? e.some((n) => !n.unscheduled || n.data && this.isScheduled(n.data)) : !0;
  }
  resetSummaryDates(e, n, r) {
    const { tasks: s, durationUnit: o, splitTasks: i, calendar: l } = this.getState(), a = s.byId(e), c = a.data;
    if (c?.length && this.isScheduled(c)) {
      const d = Sr({ ...a, start: void 0, end: void 0, duration: void 0 });
      if (!Ht(a.start, d.start) || !Ht(a.end, d.end)) {
        r ? (St(d, { durationUnit: o, calendar: l }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: n, skipUndo: !0 });
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
    return ut("hour")(mt(n.minUnit, r, s), Math.floor(e / o));
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
function na(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = ra(s, t, e, 1, n);
    sa(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function ra(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function sa(t, e, n, r, s, o) {
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
        e.isDisabled = (n, r) => ia(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => la(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => aa(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => oa(n);
        break;
    }
    return e;
  });
}
function oa(t) {
  return t.parent === 0;
}
function ia(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function la(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function aa(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function ns(t) {
  return t && typeof t == "object";
}
function ca(t) {
  return !t.selected || t.selected.length < 2;
}
const da = (t) => (e) => e.type === t, ho = _r([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: da(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => ns(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => ca(e) && ns(n) }]);
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
function jn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function go(t) {
  return [...mo];
}
const mo = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Gn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Yn(t), isDisabled: jn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Yn(t) || Vn(t), isDisabled: jn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Yn(t) || Vn(t), isDisabled: jn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Vn(t) || Gn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Gn(t) }], wo = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], kt = Ot(null);
(/* @__PURE__ */ new Date()).valueOf();
function ua(t, e) {
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
  } else return ua(t, e);
  return t === e;
}
function lr(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(lr);
  const e = {};
  for (const n in t) e[n] = lr(t[n]);
  return e;
}
var xo = 2, fa = class {
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
    for (const l in e) {
      const a = n[l], c = r[l], d = e[l];
      if (a && (c === d && typeof d != "object" || d instanceof Date && c instanceof Date && c.getTime() === d.getTime())) continue;
      const u = s + (s ? "." : "") + l;
      a ? (a.__parse(d, u, o, i) && (r[l] = d), i & xo ? o[u] = a.__trigger : a.__trigger()) : (d && d.__reactive ? n[l] = this._wrapNested(d, d, u, o) : n[l] = this._wrapWritable(d), r[l] = d), o[u] = o[u] || null;
    }
  }
  _wrapNested(e, n, r, s) {
    const o = this._wrapWritable(e);
    return this._wrapProperties(e, o, n, r, s, 0), o.__parse = (i, l, a, c) => (this._wrapProperties(i, o, n, l, a, c), !1), o;
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
}, ha = class {
  constructor(e, n, r, s) {
    typeof e == "function" ? this._setter = e : this._setter = e.setState.bind(e), this._routes = n, this._parsers = r, this._prev = {}, this._triggers = /* @__PURE__ */ new Map(), this._sources = /* @__PURE__ */ new Map(), this._routes.forEach((o) => {
      o.in.forEach((i) => {
        const l = this._triggers.get(i) || [];
        l.push(o), this._triggers.set(i, l);
      }), o.out.forEach((i) => {
        const l = this._sources.get(i) || {};
        o.in.forEach((a) => l[a] = !0), this._sources.set(i, l);
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
      const i = r[o], l = this._triggers.get(i);
      l && l.forEach((a) => {
        n.indexOf(a) == -1 && n.push(a);
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
var pa = class {
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
function ga(t) {
  return (e) => e[t];
}
function ma(t) {
  return (e, n) => e[t] = n;
}
function Tt(t, e) {
  return (e.getter || ga(e.id))(t);
}
function rs(t, e, n) {
  return (e.setter || ma(e.id))(t, n);
}
function ss(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function vt(t, e) {
  let n = Tt(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function wa(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, l = t.flatData;
  e.header !== !1 && i[0].header && (r = os("header", i, r, o, s));
  for (let a = 0; a < l.length; a++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = vt(l[a], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = os("footer", i, r, o, s)), r;
}
function os(t, e, n, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][t].length; i++) {
    const l = [];
    for (let a = 0; a < e.length; a++) {
      let c = (e[a][t][i].text || "") + "";
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), l.push(c);
    }
    n += (n ? s : "") + l.join(r);
  }
  return n;
}
function xa(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const l = t._columns, a = t.flatData, c = t._sizes;
  for (const u of l) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && l[0].header && (is("header", l, r, s, d, e, n), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += l[0].header.length);
  for (let u = 0; u < a.length; u++) {
    const f = [];
    for (let p = 0; p < l.length; p++) {
      const m = a[u], h = l[p], x = Tt(m, h) ?? "";
      let w = vt(m, h), y;
      e.cellStyle && (y = e.cellStyle(x, m, h)), e.cellTemplate && (w = e.cellTemplate(x, m, h) ?? w);
      const k = vo(w, 2, y, n);
      f.push(k);
    }
    r.push(f), i.push({ height: c.rowHeight });
  }
  return d += a.length, e.footer !== !1 && l[0].footer && (is("footer", l, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function is(t, e, n, r, s, o, i) {
  for (let l = 0; l < e[0][t].length; l++) {
    const a = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][l], u = d.colspan ? d.colspan - 1 : 0, f = d.rowspan ? d.rowspan - 1 : 0;
      (u || f) && r.push({ from: { row: l + s, column: c }, to: { row: l + s + f, column: c + u } });
      let p = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(p, d, e[c], t)), o.headerCellTemplate && (p = o.headerCellTemplate(p, d, e[c], t) ?? p);
      let h;
      t == "header" ? l == e[0][t].length - 1 ? h = 1 : h = 0 : l ? h = 4 : h = 3;
      const x = vo(p, h, m, i);
      a.push(x);
    }
    n.push(a);
  }
}
function vo(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = va(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => on(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function ya(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], l = "0.5px solid " + o[t], a = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...a, borderBottom: l, borderRight: l };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...a }, header: { ...c }, footer: { ...c } };
}
function va(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const ka = "portrait", ba = 100, Sa = "a4", $a = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function _a(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((l) => !l.hidden), i = Ca(e);
  return o.forEach((l, a) => {
    s + l.width <= i ? (s += l.width, r.push(l)) : (r.length && n.push(r), r = [l], s = l.width), a === o.length - 1 && r.length && n.push(r);
  }), n;
}
function ls(t, e, n) {
  const r = [];
  return t.forEach((s, o) => {
    const i = s[e];
    for (let l = 0; l < n.length; l++) {
      r[l] || (r[l] = []);
      const a = { ...i[l] };
      if (r[l][o] !== null) {
        if (!o && !a.rowspan && !a.colspan) {
          let c = 1, d = t[o + c][e][l], u = a.width;
          for (; !d.rowspan && !d.colspan; ) c++, d = t[o + c][e][l], u += d.width;
          a.colspan = c, a.width = u, a.height = n[l];
        }
        if (r[l].push(a), !a.collapsed && a.colspan > 1) {
          let c = a.colspan - 1;
          if (a.colspan + o > t.length) {
            const d = a.colspan - (a.colspan + o - t.length);
            a.colspan = d, a.width = t.slice(o, o + c + 1).reduce((u, f) => u + f.width, 0), d > 1 && (c = d - 1);
          }
          for (let d = 0; d < c; d++) r[l].push(null);
        }
        if (a.rowspan > 1) {
          const c = a.rowspan;
          for (let d = 1; d < c; d++) r[l + d] || (r[l + d] = []), r[l + d].push(null);
        }
      }
    }
    if (s.collapsed) for (let l = 0; l < r.length; l++) {
      const a = r[l], c = a[o];
      if (c && c.collapsed) {
        if (a[o] = null, !l) break;
      } else {
        const d = c || a.findLast((u) => u?.colspan >= 1);
        d && (d.colspan = d.colspan - 1, d.width = d.width - s.width);
      }
    }
  }), r.map((s) => s.filter((o) => o && o.colspan !== 0));
}
function Ca(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = $a[r];
  return Na(e === "portrait" ? s : o, n);
}
function Na(t, e) {
  return t * e;
}
function Ta(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || ka, ppi: n || ba, paper: r || Sa };
}
function ko(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Da(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const as = ["resize-column", "hide-column", "update-cell"], Ma = ["delete-row", "update-row", "update-cell"], Ea = ["move-item"], Ra = ["resize-column", "move-item"];
let Ia = class {
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
      const { id: n, target: r, mode: s } = e, { flatData: o } = this.getPrev(), i = o.findIndex((l) => l.id == n);
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
        if (Ra.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Ea.includes(n) && this.setPrev("flatData"), as.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Ma.includes(n) && this.setPrev("data"), as.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = lr(this.getState()[e]);
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
function Aa(t, e) {
  return -So(t, e);
}
function Ha(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? So : Aa;
  return function(r, s) {
    return n(Tt(r, e), Tt(s, e));
  };
}
function La(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Ha(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const yn = 28, za = 20;
function Wa() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Tn(t, e, n, r, s) {
  const o = document.createElement("div"), i = document.createElement("div"), l = document.body;
  s = s ? `${s}px` : "auto";
  let a, c;
  i.className = e, o.classList.add(`wx-${n}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(i), l.appendChild(o), typeof t != "object" && (t = [t]);
  for (let d = 0; d < t.length; d++) {
    i.innerText = t[d] + "";
    const u = o.getBoundingClientRect(), f = Math.ceil(u.width) + (r && r.length ? r[d] : 0), p = Math.ceil(u.height);
    a = Math.max(a || 0, f), c = Math.max(c || 0, p);
  }
  return o.remove(), { width: a, height: c };
}
function cs(t, e, n, r, s) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i][e], a = l.length;
    for (let c = 0; c < a; c++) {
      const { text: d, vertical: u, collapsed: f, rowspan: p, css: m } = l[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let h = 0;
      if (u && !f) {
        let x = `wx-measure-cell-${e}`;
        if (x += m ? ` ${m}` : "", h = Tn(d, x, s).width, (p > 1 || !l[c + 1]) && n > c + 1) {
          const w = p || n - c, y = o.slice(c, c + w).reduce((k, v) => k + v, 0);
          if (y < h) {
            const k = Math.ceil((h - y) / w);
            for (let v = c; v < c + w; v++) o[v] = (o[v] || r) + k;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, h);
    }
  }
  return o;
}
function Fa(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const l = e[i], a = vt(l, t);
    a && (r.push(a), t.treetoggle ? s.push(e[i].$level * yn + (e[i].$count ? yn : 0) + (t.draggable ? yn : 0)) : t.draggable && s.push(yn));
  }
  return Tn(r, o, n, s).width;
}
function Oa(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? za : 0;
  let s = t.header;
  if (typeof s == "string") return Tn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const l = s[i], a = typeof l == "string" ? l : l.text, c = n + (typeof l == "string" ? "" : ` ${l.css}`);
    let d = Tn(a, c, e).width;
    i === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const Pa = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Ya(t) {
  return Pa[t];
}
class Va extends fa {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new ha(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: l } = this.getState(), a = this.copyColumns(o), c = a.reduce((f, p) => Math.max(p.header.length, f), 0), d = a.reduce((f, p) => Math.max(p.footer.length, f), 0);
      a.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(a, i, c, d, l);
      for (let f = 0; f < a.length; f++) this.normalizeColumns(a, f, "header", c, u), this.normalizeColumns(a, f, "footer", d, u);
      this.setState({ _columns: a, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: l, _filterIds: a } = this.getState(), c = a && new Set(a), d = i ? this.flattenRows(o, [], a) : c ? o.filter((f) => c.has(f.id)) : o, u = !l && d.some((f) => f.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new pa();
    r.on("close-editor", ({ ignore: s }) => {
      const { editor: o } = this.getState();
      o && (s || r.exec("update-cell", o), this.setState({ editor: null }));
    }), r.on("open-editor", ({ id: s, column: o }) => {
      let i = this.getState().editor;
      i && r.exec("close-editor", {});
      const l = this.getRow(s), a = o ? this.getColumn(o) : this.getNextEditor(l);
      if (a?.editor) {
        let c = a.editor;
        if (typeof c == "function" && (c = c(l, a)), !c) return;
        i = { column: a.id, id: s, value: Tt(l, a) ?? "", renderedValue: vt(l, a) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), a.options && !i.options && (i.options = a.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: l, _filterIds: a } = o, { row: c, before: d, after: u, select: f } = s;
      if (s.id = c.id = s.id || c.id || vn(), d || u) {
        const m = d || u, h = i.findIndex((x) => x.id === m);
        i = [...i], i.splice(h + (u ? 1 : 0), 0, s.row);
      } else i = [...i, s.row];
      const p = { data: i };
      a && (p._filterIds = [...a, s.id]), this.setState(p), !(typeof f == "boolean" && !f) && (f || l) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: i, focusCell: l, editor: a } = this.getState(), { id: c } = s, d = { data: o.filter((u) => u.id !== c) };
      this.isSelected(c) && (d.selectedRows = i.filter((u) => u !== c)), a?.id == c && (d.editor = null), this.setState(d), l?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: i } = o;
      i = [...i];
      const { tree: l } = o, { id: a, column: c, value: d } = s, u = this.getColumn(c);
      if (l) {
        const f = { ...this._branches[a] };
        rs(f, u, d);
        const p = this.updateTreeRow(f);
        f.$parent === 0 && (i = p);
      } else {
        const f = i.findIndex((m) => m.id == a), p = { ...i[f] };
        rs(p, u, d), i[f] = p;
      }
      this.setState({ data: i });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: i, row: l } = s, a = o.findIndex((c) => c.id == i);
      o = [...o], o[a] = { ...o[a], ...l }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: i, mode: l, show: a, column: c }) => {
      const d = this.getState(), { focusCell: u } = d;
      let { selectedRows: f } = d;
      if (f.length || (i = o = !1), i) {
        const { data: p } = this.getState();
        let m = p.findIndex((x) => x.id == f[f.length - 1]), h = p.findIndex((x) => x.id == s);
        m > h && ([m, h] = [h, m]), p.slice(m, h + 1).forEach((x) => {
          f.indexOf(x.id) === -1 && f.push(x.id);
        });
      } else if (o && this.isSelected(s)) {
        if (l === !0) return;
        f = f.filter((p) => p !== s);
      } else if (o) {
        if (l === !1) return;
        f.push(s);
      } else f = [s];
      this.setState({ selectedRows: [...f] }), u?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), a && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: i, eventSource: l } = s, { _columns: a, split: c } = this.getState();
      o && i ? (this.setState({ focusCell: { row: o, column: i } }), l !== "click" && ((!c.left || a.findIndex((d) => d.id == s.column) >= c.left) && (!c.right || a.findIndex((d) => d.id == s.column) < a.length - c.right) ? this.in.exec("scroll", { row: o, column: i }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: i, maxRows: l, inProgress: a } = s;
      if (a === !1) return;
      let c = s.width || 0;
      const d = [...this.getState().columns], u = d.find((f) => f.id == o);
      if (i) {
        if (i == "data" || i === !0) {
          const { flatData: f, _skin: p } = this.getState();
          let m = f.length;
          l && (m = Math.min(l, m));
          const h = f.slice(0, m);
          c = Fa(u, h, p);
        }
        if (i == "header" || i === !0) {
          const { _skin: f } = this.getState();
          c = Math.max(Oa(u, f), c);
        }
      }
      u.width = Math.max(17, c), delete u.flexgrow, this.setState({ columns: d });
    }), r.on("hide-column", (s) => {
      const { id: o, mode: i } = s, l = [...this.getState().columns], a = l.find((d) => d.id == o), c = l.reduce((d, u) => d + (u.hidden ? 0 : 1), 0);
      !i || c > 1 ? (a.hidden = !a.hidden, this.setState({ columns: l })) : s.skipUndo = !0;
    }), r.on("sort-rows", (s) => {
      const { key: o, add: i, sort: l } = s, a = this.getState(), { columns: c, data: d, tree: u } = a;
      if (l) {
        const y = [...d];
        y.sort(l), this.setState({ data: y });
        return;
      }
      const { order: f = "asc" } = s;
      let p = a.sortMarks;
      const m = Object.keys(p), h = m.length;
      !i || !h || h === 1 && p[o] ? p = { [o]: { order: f } } : (h === 1 && (p[m[0]] = { ...p[m[0]], index: 0 }), p = { ...p, [o]: { order: f, index: typeof i == "number" ? i : p[o]?.index ?? h } });
      const x = Object.keys(p).sort((y, k) => p[y].index - p[k].index).map((y) => ({ key: y, order: p[y].order }));
      this.setState({ sortMarks: p });
      const w = La(x, c);
      if (w) {
        const y = [...d];
        u ? this.sortTree(y, w) : y.sort(w), this.setState({ data: y });
      }
    }), r.on("filter-rows", (s) => {
      const { value: o, key: i, filter: l } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const a = this.getState(), { data: c, tree: d } = a;
      let u = a.filterValues;
      const f = {};
      i && (u = { ...u, [i]: o }, f.filterValues = u);
      const p = l ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, p, m) : c.forEach((h) => {
        p(h) && m.push(h.id);
      }), f._filterIds = m, this.setState(f);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: i, mode: l } = s, a = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[i] : c;
      typeof d == "object" && (d.collapsed = l ?? !d.collapsed, this.setState({ columns: a }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: i } = s;
      let { target: l, mode: a = "after" } = s;
      const { data: c, flatData: d, tree: u } = this.getState(), f = d.findIndex((h) => h.id == o);
      let p;
      if (a === "up" || a === "down") {
        if (a === "up") {
          if (f === 0) return;
          p = f - 1, a = "before";
        } else if (a === "down") {
          if (f === d.length - 1) return;
          p = f + 1, a = "after";
        }
        l = d[p] && d[p].id;
      } else p = d.findIndex((h) => h.id == l);
      if (f === -1 || p === -1 || i === !1) return;
      let m;
      u ? m = this.moveItem(o, l, c, a) : m = this.moveItem(o, l, c, a), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: i, mode: l = "after" } = s, a = this.getState(), { flatData: c, _filterIds: d } = a;
      let { data: u } = a;
      const f = this.getRow(o);
      if (!f) return;
      const p = { ...f, id: vn() };
      s.id = p.id;
      const m = c.findIndex((x) => x.id == i);
      if (m === -1) return;
      u.splice(m + (l === "after" ? 1 : 0), 0, p), u = [...u];
      const h = { data: u };
      d && (h._filterIds = [...d, p.id]), this.setState(h);
    }), r.on("open-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !0, i);
    }), r.on("close-row", (s) => {
      const { id: o, nested: i } = s;
      this.toggleBranch(o, !1, i);
    }), r.on("export", (s) => new Promise((o, i) => {
      const l = s.options || {}, a = `${l.fileName || "data"}.${l.format}`;
      if (l.format == "csv") {
        const c = wa(this.getState(), l);
        l.download !== !1 ? ss(new Blob(["\uFEFF" + c], { type: "text/csv" }), a) : s.result = c, o(!0);
      } else if (l.format == "xlsx") {
        let c = l.styles;
        !c && c !== !1 && (c = ya(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: f, merged: p, rowSizes: m, colSizes: h, styles: x } = xa(this.getState(), l, u), w = l.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(w).then((y) => {
          y.onmessage = (k) => {
            if (k.data.type == "ready") {
              const v = k.data.blob;
              l.download !== !1 ? ss(v, a) : s.result = v, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: l.sheetName || "data", cells: f, cols: h, rows: m, merged: p }], styles: x } });
        });
      } else i();
    })), r.on("search-rows", (s) => {
      const { search: o, columns: i } = s, l = this.searchRows(o, i);
      this.setState({ search: { value: o, rows: l } });
    }), r.on("hotkey", ({ key: s, event: o, isInput: i }) => {
      switch (s) {
        case "arrowup": {
          const { flatData: l, focusCell: a, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const d = a ? a.column : this._getFirstVisibleColumn()?.id, u = a ? this.getPrevRow(a.row)?.id : l[l.length - 1]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowdown": {
          const { flatData: l, focusCell: a, select: c } = this.getState();
          if (o.preventDefault(), i) return;
          const d = a ? a.column : this._getFirstVisibleColumn()?.id, u = a ? this.getNextRow(a.row)?.id : l[0]?.id;
          d && u && (this.in.exec("focus-cell", { row: u, column: d, eventSource: "key" }), c && this.in.exec("select-row", { id: u }));
          break;
        }
        case "arrowright": {
          const { focusCell: l } = this.getState();
          if (i) return;
          if (o.preventDefault(), l) {
            const a = this.getNextColumn(l.column, !0)?.id;
            a && this.in.exec("focus-cell", { row: l.row, column: a, eventSource: "key" });
          }
          break;
        }
        case "arrowleft": {
          const { focusCell: l } = this.getState();
          if (i) return;
          if (o.preventDefault(), l) {
            const a = this.getPrevColumn(l.column, !0)?.id;
            a && this.in.exec("focus-cell", { row: l.row, column: a, eventSource: "key" });
          }
          break;
        }
        case "tab": {
          const { editor: l, focusCell: a, select: c } = this.getState();
          if (l) {
            o.preventDefault();
            const d = l.column;
            let u = l.id, f = this.getNextEditor(this.getRow(u), this.getColumn(d));
            if (!f) {
              const p = this.getNextRow(u);
              p && (u = p.id, f = this.getNextEditor(p));
            }
            f && (this.in.exec("open-editor", { id: u, column: f.id }), this.in.exec("focus-cell", { row: u, column: f.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else a && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: l, focusCell: a, select: c } = this.getState();
          if (l) {
            o.preventDefault();
            const d = l.column;
            let u = l.id, f = this.getPrevEditor(this.getRow(u), this.getColumn(d));
            if (!f) {
              const p = this.getPrevRow(u);
              p && (u = p.id, f = this.getPrevEditor(p));
            }
            f && (this.in.exec("open-editor", { id: u, column: f.id }), this.in.exec("focus-cell", { row: u, column: f.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else a && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "escape": {
          const { editor: l } = this.getState();
          l && (this.in.exec("close-editor", { ignore: !0 }), this.in.exec("focus-cell", { row: l.id, column: l.column, eventSource: "key" }));
          break;
        }
        case "f2": {
          const { editor: l, focusCell: a } = this.getState();
          !l && a && this.in.exec("open-editor", { id: a.row, column: a.column });
          break;
        }
        case "enter": {
          const { focusCell: l, tree: a } = this.getState();
          if (!i && a && l && this.getColumn(l.column).treetoggle) {
            const c = this.getRow(l.row);
            if (!c.data) return;
            this.in.exec(c.open ? "close-row" : "open-row", { id: l.row, nested: !0 });
          }
          break;
        }
        case "home": {
          const { editor: l, focusCell: a } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const c = this._getFirstVisibleColumn()?.id;
            this.in.exec("focus-cell", { row: a.row, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+home": {
          const { editor: l, focusCell: a, flatData: c, select: d } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const u = c[0]?.id, f = this._getFirstVisibleColumn()?.id;
            u && f && (this.in.exec("focus-cell", { row: u, column: f, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          }
          break;
        }
        case "end": {
          const { editor: l, focusCell: a } = this.getState();
          if (!l && a) {
            o.preventDefault();
            const c = this._getLastVisibleColumn()?.id, d = a.row;
            this.in.exec("focus-cell", { row: d, column: c, eventSource: "key" });
          }
          break;
        }
        case "ctrl+end": {
          const { editor: l, focusCell: a, flatData: c, select: d } = this.getState();
          if (!l && a) {
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
      const { _columns: o, split: i, _sizes: l, flatData: a, dynamic: c, _rowHeightFromData: d } = this.getState();
      let u = -1, f = -1, p = 0, m = 0;
      if (s.column) {
        u = 0;
        const h = o.findIndex((x) => x.id == s.column);
        p = o[h].width;
        for (let x = i.left ?? 0; x < h; x++) {
          const w = o[x];
          w.hidden || (u += w.width);
        }
      }
      if (s.row && !c) {
        const h = a.findIndex((x) => x.id == s.row);
        h >= 0 && (d ? (f = a.slice(0, h).reduce((x, w) => x + (w.rowHeight || l.rowHeight), 0), m = a[h].rowHeight) : f = l.rowHeight * h);
      }
      this.setState({ scroll: { top: f, left: u, width: p, height: m || l.rowHeight } });
    }), r.on("print", (s) => {
      const o = Ta(s);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Wa()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), on(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), bo() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Ia(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
      const l = this.toggleKids(i, n, r);
      e === 0 && (o = l);
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
        const i = e[o], l = s === "before" ? o : o + 1;
        if (i.data) {
          if (s === "before") {
            const a = o > 0 ? e[o - 1] : null;
            return a?.data && a.open ? e[o - 1] = { ...a, data: [...a.data, r] } : e.splice(l, 0, r), !0;
          } else if (i.open) return e[o] = { ...i, data: [r, ...i.data] }, !0;
        }
        return e.splice(l, 0, r), !0;
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
          const a = s.length - o;
          s = s.slice(0, o + 1), s[o].rowspan = a;
        }
        const l = i.colspan;
        if (l) {
          const a = s[o + 1];
          let c = 1;
          a && a.colspan && !a.collapsed && (c = a.colspan);
          for (let d = c; d < l; d++) {
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
    const l = i[r], a = o[`${r}RowHeights`];
    for (let c = 0; c < s; c++) {
      const d = l[c];
      d.id = i.id, c === l.length - 1 && (d.rowspan = d.rowspan ? Math.min(d.rowspan, s - c) : s - c);
      for (let u = 1; u < d.rowspan; u++) {
        l.splice(c + u, 0, { _hidden: !0 });
        for (let f = 1; f < d.colspan; f++) e[n + f][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? a : a.slice(c, d.rowspan + c)).reduce((f, p) => f + p, 0);
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
    l.length > s && (l.length = s), i[r] = l;
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
      const { config: o, type: i } = n.find((a) => a.id == s).header.find((a) => a.filter).filter, l = e[s];
      r.push((a) => o?.handler ? o.handler(a[s], l) : Ya(i)(a[s], l));
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
    const { flatData: s, columns: o } = this.getState(), i = n ? o.filter((l) => n[l.id]) : o;
    return s.forEach((l) => {
      const a = {};
      i.forEach((c) => {
        const d = vt(l, c);
        String(d).toLowerCase().includes(e) && (a[c.id] = !0);
      }), Object.keys(a).length && (r[l.id] = a);
    }), r;
  }
  normalizeSizes(e, n, r, s, o) {
    const i = cs(e, "header", r, n.headerHeight, o), l = cs(e, "footer", s, n.footerHeight, o), a = i.reduce((d, u) => d + u, 0), c = l.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: l, headerHeight: a, footerHeight: c };
  }
}
let Ga = (/* @__PURE__ */ new Date()).valueOf();
function vn() {
  return "temp://" + Ga++;
}
function ja(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var Ka = class {
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
}, Wt = [], Ba = { subscribe: (t) => {
  Ua();
  const e = new Ka();
  return Wt.push(e), t(e), () => {
    const n = Wt.findIndex((r) => r === e);
    n >= 0 && Wt.splice(n, 1);
  };
} }, ds = !1;
function Ua() {
  ds || (ds = !0, document.addEventListener("keydown", (t) => {
    if (Wt.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Wt.length - 1; s >= 0; s--) {
        const o = Wt[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
const qa = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Cr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const l = i.target;
    return l.tagName === "INPUT" || l.tagName === "TEXTAREA" || ja(l, "data-header-id")?.classList.contains("wx-filter") || !!l.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const l = e[i];
    typeof l < "u" && (typeof l == "function" ? s[i] = l : l && (s[i] = (a) => {
      const c = r(a);
      n({ key: i, event: a, isInput: c });
    }));
  }
  const o = Ba.subscribe((i) => {
    i.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function Xa(t, e) {
  let n = null;
  e.scroll.subscribe((r) => {
    if (!r || r === n) return;
    n = r;
    const { left: s, top: o, height: i, width: l } = r, a = e.getHeight(), c = e.getWidth(), d = e.getScrollMargin();
    if (o >= 0) {
      const u = t.scrollTop;
      o < u ? t.scrollTop = o : o + i > u + a && (t.scrollTop = o - a + i);
    }
    if (s >= 0) {
      const u = t.scrollLeft;
      s < u ? t.scrollLeft = s : s + l > u + c - d && (t.scrollLeft = s - c + l + d);
    }
  });
}
function $t(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function Qa(t, e, n) {
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
function Za(t, e) {
  let n, r, s, o, i, l, a, c, d;
  function u(b) {
    o = b.clientX, i = b.clientY, l = {
      ...Qa(n, t, b),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function f(b) {
    n = qe(b), us(n) && (s = $t(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(b.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", p), window.addEventListener("touchend", k));
  }
  function p(b) {
    if (c || d)
      return b.preventDefault(), !1;
  }
  function m(b) {
    b.which === 1 && (n = qe(b), us(n) && (s = $t(n), t.addEventListener("mousemove", w), window.addEventListener("mouseup", v), u(b)));
  }
  function h(b) {
    t.removeEventListener("mousemove", w), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", k), document.body.style.userSelect = "", b && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", f));
  }
  function x(b) {
    const $ = b.clientX - o, R = b.clientY - i;
    if (!r) {
      if (Math.abs($) < fs && Math.abs(R) < fs || e && e.start && e.start({ id: s, e: b }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = l.left + "px", r.style.top = l.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const z = Math.round(Math.max(0, l.top + R));
      if (e && e.move && e.move({ id: s, top: z, detail: a }) === !1)
        return;
      const C = e.getTask(s), I = C.$y;
      if (!l.start && l.y == I) return N();
      l.start = !0, l.y = C.$y - 4, r.style.top = z + "px";
      const M = document.elementFromPoint(
        b.clientX,
        b.clientY
      ), H = qe(M);
      if (H && H !== n) {
        const T = $t(H), G = H.getBoundingClientRect(), te = G.top + G.height / 2, ue = b.clientY + l.db > te && H.nextElementSibling !== n, Q = b.clientY - l.dt < te && H.previousElementSibling !== n;
        a?.after == T || a?.before == T ? a = null : ue ? a = { id: s, after: T } : Q && (a = { id: s, before: T });
      }
    }
  }
  function w(b) {
    x(b);
  }
  function y(b) {
    c ? (b.preventDefault(), x(b.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function k() {
    c = null, d && (clearTimeout(d), d = null), N();
  }
  function v() {
    N();
  }
  function N() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: l.top })), s = n = r = l = a = null, h();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", f), {
    destroy() {
      h(!0);
    }
  };
}
const Ja = {
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
  const r = W(null), s = E(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = _(() => n && n.comp ? nc(n.comp) : null, [n]);
  return /* @__PURE__ */ q(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ g("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ g(o, { item: n, option: n }) : null : /* @__PURE__ */ q("span", { className: "wx-cDCz9rZQ wx-value", children: [
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
  css: l = "",
  onClick: a
}) {
  const [c, d] = j(-1e4), [u, f] = j(-1e4), [p, m] = j(20), [h, x] = j(), w = W(null), [y, k] = j(!1), [v, N] = j(null), b = E(() => {
    const I = Bo(w.current, s, r, e, n);
    I && (d(I.x), f(I.y), m(I.z), x(I.width));
  }, [s, r, e, n]);
  P(() => {
    o && o(b);
  }, []);
  const $ = E(() => {
    k(!1);
  }, []), R = E(() => {
    a && a({ action: null, option: null });
  }, [a]), z = E((I, M) => {
    k(I), N(M);
  }, []), C = _(() => tc(t), [t]);
  return P(() => {
    b();
  }, [s, b]), P(() => {
    if (w.current)
      return en(w.current, { callback: R, modal: !0 }).destroy;
  }, [R]), /* @__PURE__ */ g(
    "div",
    {
      ref: w,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${l}`,
      style: {
        position: "absolute",
        top: u + "px",
        left: c + "px",
        width: h,
        zIndex: p
      },
      onMouseLeave: $,
      children: C.map((I) => /* @__PURE__ */ q(ks, { children: [
        I.comp === "separator" ? /* @__PURE__ */ g("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ g(
          sc,
          {
            option: I,
            onShow: z,
            onClick: (M) => {
              if (!I.data && !M.defaultPrevented) {
                const H = { context: i, action: I, option: I, event: M };
                I.handler && I.handler(H), a && a(H), M.stopPropagation();
              }
            }
          }
        ),
        I.data && y === I.id ? /* @__PURE__ */ g(
          Nr,
          {
            css: l,
            options: I.data,
            at: "right-overlap",
            parent: v,
            context: i,
            onClick: a
          }
        ) : null
      ] }, I.id))
    }
  );
}
const oc = Dt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: l = "",
    children: a,
    onClick: c
  } = t, [d, u] = j(null), [f, p] = j(null), [m, h] = j(0), [x, w] = j(0), y = _(() => d !== null && i ? _o(n, (b) => i(b, d)) : n, [d, i, n]), k = E(
    (b) => {
      p(null), c && c(b);
    },
    [c]
  ), v = E((b, $) => {
    let R = null;
    for (; b && b.dataset && !R; )
      R = b.dataset[$], b = b.parentNode;
    return R ? Pt(R) : null;
  }, []), N = E(
    (b, $) => {
      if (!b) {
        p(null);
        return;
      }
      if (b.defaultPrevented) return;
      const R = b.target;
      if (R && R.dataset && R.dataset.menuIgnore) return;
      h(b.clientX + 1), w(b.clientY + 1);
      let z = typeof $ < "u" ? $ : v(R, o);
      s && (z = s(z, b), !z) || (u(z), p(R), b.preventDefault());
    },
    [o, v, s]
  );
  return Mt(e, () => ({ show: N }), [N]), /* @__PURE__ */ q(Ee, { children: [
    a ? /* @__PURE__ */ g("span", { onClick: N, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a }) : null,
    f ? /* @__PURE__ */ g(Es, { children: /* @__PURE__ */ g(
      Nr,
      {
        css: l,
        at: r,
        top: x,
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
Dt(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [l, a] = j(null);
  function c(m) {
    a(null), i && i(m);
  }
  const d = E((m) => {
    a(m.target), m.preventDefault();
  }, []);
  Mt(e, () => ({ show: d }), [d]);
  function u(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; )
      a(h), h = h.parentNode;
  }
  const f = W(0), p = W(l);
  return P(() => {
    p.current !== l && (f.current += 1, p.current = l);
  }, [l]), /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    l ? /* @__PURE__ */ g(Es, { children: /* @__PURE__ */ g(
      Nr,
      {
        css: s,
        at: r,
        parent: l,
        options: n,
        onClick: c
      },
      f.current
    ) }) : null
  ] });
});
const No = Dt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: l = "",
    children: a,
    onClick: c
  } = t, d = W(null), u = E((f, p) => {
    d.current.show(f, p);
  }, []);
  return Mt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ q(Ee, { children: [
    a ? /* @__PURE__ */ g("span", { onContextMenu: u, "data-menu-ignore": "true", children: a }) : null,
    /* @__PURE__ */ g(
      oc,
      {
        css: l,
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
function Do({ menu: t = !1 }) {
  return /* @__PURE__ */ g("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Mo() {
  return /* @__PURE__ */ g("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const lc = ({ key: t, text: e, ...n }) => n;
function Tr(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = _(
    () => ic(e.comp || "label"),
    [e]
  ), l = E(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), a = _(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = E(
    ({ value: u }) => {
      e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
    },
    [e, o]
  ), d = _(() => n ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [n, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ g(Mo, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ g(Do, { menu: n });
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
            value: a,
            onChange: c,
            onClick: l,
            text: d,
            menu: n,
            ...lc(e)
          }
        )
      }
    );
  }
}
function Dn({
  item: t,
  values: e = null,
  menu: n = !1,
  onChange: r,
  onClick: s
}) {
  const [o, i] = j(!0), l = () => i(!0), a = () => i(!1), c = (u) => {
    l(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ q("div", { className: "wx-wSVFAGym wx-collapsed", onClick: a, children: [
      t.icon ? /* @__PURE__ */ g("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ g("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ g(Vt, { width: "", oncancel: l, children: /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ g(
      Dn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, f) => u.items ? /* @__PURE__ */ g(
        Dn,
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
function ac({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, l] = j(void 0), a = W(null);
  function c() {
    l(null);
  }
  function d() {
    l(!0);
  }
  function u(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ q(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: a,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ g(gt, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ g(Vt, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ g("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (f, p) => f.items ? /* @__PURE__ */ g(
            Dn,
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
function ar(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: i,
    onChange: l
  } = t, [a, c] = Oe(e || []), [d, u] = Oe(s || null), f = _(() => cc(a), [a]), p = W(null), m = W(-1), [h, x] = j([]), w = W(f);
  P(() => {
    w.current = f;
  }, [a]);
  const y = W(o);
  P(() => {
    y.current = o;
  }, [o]);
  const k = W(h);
  P(() => {
    k.current = h;
  }, [h]);
  const v = W(!1);
  function N(C) {
    d && (d[C.item.key] = C.value, u({ ...d })), l && l(C);
  }
  function b() {
    const C = p.current;
    if (!C) return 0;
    const I = C.children, M = w.current || [];
    let H = 0;
    for (let T = 0; T < M.length; T++)
      M[T].comp !== "spacer" && (H += I[T].clientWidth, M[T].comp === "separator" && (H += 8));
    return H;
  }
  function $() {
    const C = p.current, I = w.current || [];
    if (C) {
      for (let M = I.length - 1; M >= 0; M--)
        if (I[M].items && !I[M].collapsed) {
          I[M].collapsed = !0, I[M].$width = C.children[M].offsetWidth, v.current = !0, c([...I]);
          return;
        }
    }
  }
  function R(C) {
    const I = p.current, M = w.current || [];
    if (I) {
      for (let H = 0; H < M.length; H++)
        if (M[H].collapsed && M[H].$width) {
          M[H].$width - I.children[H].offsetWidth < C + 10 && (M[H].collapsed = !1, v.current = !0), c([...M]);
          return;
        }
    }
  }
  function z() {
    const C = p.current;
    if (!C) return;
    const I = w.current || [], M = y.current;
    if (M === "wrap") return;
    const H = C.clientWidth;
    if (C.scrollWidth > H) {
      if (M === "collapse") return $();
      const T = C.children;
      let G = 0;
      for (let te = 0; te < I.length; te++) {
        if (G += T[te].clientWidth, I[te].comp === "separator" && (G += 8), G > H - 40) {
          if (m.current === te) return;
          m.current = te;
          const ue = [];
          for (let Q = te; Q < I.length; Q++)
            ue.push(I[Q]), T[Q].style.visibility = "hidden";
          te > 0 && I[te - 1].comp === "separator" && (T[te - 1].style.visibility = "hidden"), x(ue);
          break;
        }
        T[te].style.visibility = "";
      }
    } else {
      const T = H - b();
      if (T <= 0) return;
      if (M === "collapse") return R(T);
      if ((k.current || []).length) {
        m.current = null;
        const G = C.children;
        for (let te = 0; te < I.length; te++)
          G[te].style.visibility = "";
        x([]);
      }
    }
  }
  return P(() => {
    v.current && (v.current = !1, z());
  }, [a]), P(() => {
    const C = new ResizeObserver(() => z());
    return p.current && C.observe(p.current), () => {
      C.disconnect();
    };
  }, []), /* @__PURE__ */ q(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: p,
      children: [
        f.map(
          (C) => C.items ? /* @__PURE__ */ g(
            Dn,
            {
              item: C,
              values: d,
              onClick: i,
              onChange: N
            },
            C.id
          ) : /* @__PURE__ */ g(
            Tr,
            {
              item: C,
              values: d,
              onClick: i,
              onChange: N
            },
            C.id
          )
        ),
        !!h.length && /* @__PURE__ */ g(
          ac,
          {
            items: h,
            css: n,
            values: d,
            onClick: i,
            onChange: N
          }
        )
      ]
    }
  );
}
function dc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: l } = t;
  return i ? /* @__PURE__ */ q("div", { className: "wx-HXpG4gnx wx-item", onClick: l, children: [
    /* @__PURE__ */ g("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ g(
    gt,
    {
      icon: e,
      type: s,
      css: r,
      text: n,
      disabled: o,
      onClick: l
    }
  );
}
function uc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ g("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function fc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: l } = t;
  return i ? /* @__PURE__ */ q("div", { className: "wx-3cuSqONJ wx-item", onClick: l, children: [
    e ? /* @__PURE__ */ g("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ g(
    gt,
    {
      icon: e,
      type: s,
      css: r,
      title: n,
      disabled: o,
      onClick: l
    }
  );
}
function hc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ q("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ g("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Gt("button", dc);
Gt("separator", Do);
Gt("spacer", Mo);
Gt("label", uc);
Gt("item", hc);
Gt("icon", fc);
const rt = Ot(null);
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
  return Pt(t.getAttribute("data-id"));
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
  let r = null, s, o, i = !1, l = !1;
  const a = document.createElement("DIV");
  a.className = "wx-drag-zone", a.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d($) {
    const R = qe($);
    R && (r = {
      container: a,
      sourceNode: $.target,
      from: mc(R),
      pos: cr($, t)
    }, o = r.pos, u($));
  }
  function u($) {
    if (!r) return;
    const R = r.pos = cr($, t);
    if (!i) {
      if (!l && !$?.target?.getAttribute("draggable-data") && Math.abs(o.x - R.x) < hs && Math.abs(o.y - R.y) < hs)
        return;
      if (N($) === !1) return b();
    }
    if (l) {
      const z = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, C = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        $.pageX - z,
        $.pageY - C
      );
    } else r.targetNode = $.target;
    n.move && n.move($, r), a.style.left = -(r.offset ? r.offset.x : 0) + "px", a.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function f($) {
    a.parentNode && a.parentNode.removeChild(a), a.innerHTML = "", i && n.end && n.end($, r), r = o = null, b();
  }
  function p($) {
    n.getReorder && !n.getReorder() || $.button === 0 && (v($), window.addEventListener("mousemove", m), window.addEventListener("mouseup", h), d($));
  }
  function m($) {
    u($);
  }
  function h($) {
    f($);
  }
  function x($) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      l = !0, d($.touches[0]);
    }, gc), v($);
    function R() {
      s && c(), $.target.removeEventListener("touchmove", w), $.target.removeEventListener("touchend", R), f($);
    }
    $.target.addEventListener("touchmove", w), $.target.addEventListener("touchend", R), t.addEventListener("contextmenu", y);
  }
  function w($) {
    i ? ($.preventDefault(), u($.touches[0])) : s && c();
  }
  function y($) {
    if (i || s)
      return $.preventDefault(), !1;
  }
  function k($) {
    $.preventDefault();
  }
  function v($) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: R } = n.getDraggableInfo();
    (!R || $.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function N($) {
    if (i = !0, n.start) {
      if (n.start($, r) === !1) return !1;
      t.appendChild(a), document.body.style.cursor = "move";
    }
  }
  function b($) {
    i = l = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", h), $ && (t.removeEventListener("mousedown", p), t.removeEventListener("touchstart", x), t.removeEventListener("dragstart", k));
  }
  return t.addEventListener("mousedown", p), t.addEventListener("touchstart", x), t.addEventListener("dragstart", k), {
    destroy() {
      b(!0);
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
  const { node: s, left: o, top: i, bottom: l, sense: a, xScroll: c, yScroll: d } = r, u = cr(t, s);
  n.scrollState || (n.scrollState = yc());
  let f = 0, p = 0;
  u.x < o + a ? f = -1 : u.x > e.width - a && (f = 1), u.y < i + Math.round(a / 2) ? p = -1 : u.y > e.height - l - Math.round(a / 2) && (p = 1), (n.scrollState.dirX !== f || n.scrollState.dirY !== p) && (Eo(n), n.scrollState.dirX = f, n.scrollState.dirY = p), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && kc(n, r, {
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
  } = t, [i, l] = Oe(t.focusable), a = ye(rt), c = ee(a, "focusCell"), d = ee(a, "search"), u = ee(a, "reorder"), f = _(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), p = _(
    () => Hn(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m(b, $) {
    let R = "wx-cell";
    return R += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", R += b ? " " + b(n) : "", R += $ ? " " + $(e, n) : "", R += n.treetoggle ? " wx-tree-cell" : "", R;
  }
  const h = _(
    () => m(s, r),
    [s, r, n, e]
  ), x = _(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), w = W(null);
  P(() => {
    w.current && i && c?.row === e.id && c?.column === n.id && w.current.focus();
  }, [c, i, e.id, n.id]);
  const y = E(() => {
    i && !c && a.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [a, i, c, e.id, n.id]);
  P(() => () => {
    i && c && (a.exec("focus-cell", { eventSource: "destroy" }), l(!1));
  }, [a, l]);
  function k(b) {
    const $ = new RegExp(`(${d.value.trim()})`, "gi");
    return String(b).split($).map((R) => ({ text: R, highlight: $.test(R) }));
  }
  const v = _(() => {
    const b = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, $ = n.fixed && n.fixed.right;
    return [
      h,
      b ? "wx-shadow" : "",
      $ ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [h, n]), N = n.cell;
  return /* @__PURE__ */ q(
    "div",
    {
      className: "wx-TSCaXsGV " + v,
      ref: w,
      onFocus: y,
      style: p,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: i ? "0" : "-1",
      role: "gridcell",
      "aria-colindex": n._colindex,
      "aria-readonly": n.editor ? void 0 : !0,
      children: [
        u && n.draggable ? x ? /* @__PURE__ */ g(
          "i",
          {
            "draggable-data": "true",
            className: "wx-TSCaXsGV wx-draggable wxi-drag"
          }
        ) : /* @__PURE__ */ g("i", { className: "wx-TSCaXsGV wx-draggable-stub" }) : null,
        n.treetoggle ? /* @__PURE__ */ q(Ee, { children: [
          /* @__PURE__ */ g("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ g(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        N ? /* @__PURE__ */ g(
          N,
          {
            api: a,
            row: e,
            column: n,
            onAction: ({ action: b, data: $ }) => a.exec(b, $)
          }
        ) : o ? o() : f ? /* @__PURE__ */ g("span", { children: k(vt(e, n)).map(
          ({ highlight: b, text: $ }, R) => b ? /* @__PURE__ */ g("mark", { className: "wx-TSCaXsGV wx-search", children: $ }, R) : /* @__PURE__ */ g("span", { children: $ }, R)
        ) }) : vt(e, n)
      ]
    }
  );
}
function ps(t, e) {
  let n, r;
  function s(l) {
    n = l.clientX, t.style.opacity = 1, document.body.style.cursor = "ew-resize", document.body.style.userSelect = "none", window.addEventListener("mousemove", o), window.addEventListener("mouseup", i), e && e.down && e.down(t);
  }
  function o(l) {
    r = l.clientX - n, e && e.move && e.move(r);
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
  const s = ye(rt), o = ee(s, "flatData"), i = _(
    () => t?.config?.options || e?.options || a(),
    [t, e, o]
  ), l = _(() => t?.config?.template, [t]);
  function a() {
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
    Ds,
    {
      placeholder: "",
      clear: !0,
      ...t?.config ?? {},
      options: i,
      value: r,
      onChange: c,
      children: (u) => l ? l(u) : u.label
    }
  ) });
}
const Tc = {
  text: Cc,
  richselect: Nc
};
function Dc({ filter: t, column: e }) {
  const n = ye(rt), r = ee(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = _(() => Tc[t.type], [t.type]);
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
function Mc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: l,
    hasSplit: a
  } = t, c = ye(rt), d = ee(c, "sortMarks"), u = _(() => d ? d[n.id] : void 0, [d, n.id]), f = W(), p = E(
    (T) => {
      f.current = e.flexgrow ? T.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = E(
    (T, G) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (f.current || 0) + T),
        inProgress: G
      });
    },
    [c, e.id]
  ), h = E((T) => m(T, !0), [m]), x = E((T) => m(T, !1), [m]), w = E(
    (T) => {
      if (!n.sort || e.filter) return;
      let G = u?.order;
      G && (G = G === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: T.ctrlKey, order: G });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = E(
    (T) => {
      T && T.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), k = E(
    (T) => {
      T.key === "Enter" && y();
    },
    [y]
  ), v = E(
    (T) => {
      T.key === "Enter" && !e.filter && w(T);
    },
    [w, e.filter]
  ), N = _(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), b = _(
    () => N && !a && e.collapsible !== "header",
    [N, a, e.collapsible]
  ), $ = _(
    () => b ? { top: -l / 2, position: "absolute" } : {},
    [b, l]
  ), R = _(
    () => Hn(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (N && b ? l : 0)
    ),
    [
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right,
      n.right,
      e.height,
      N,
      b,
      l
    ]
  ), z = _(
    () => Io(n, e, i),
    [n, e, i]
  ), C = E(() => Object.fromEntries(
    Object.entries(e).filter(([T]) => T !== "cell")
  ), [e]), I = `wx-cell ${z} ${e.css || ""} wx-collapsed`, M = [
    "wx-cell",
    z,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = W(null);
  return P(() => {
    const T = H.current;
    if (!T) return;
    const G = ps(T, { down: p, move: h, up: x });
    return () => {
      typeof G == "function" && G();
    };
  }, [p, h, x, ps]), N ? /* @__PURE__ */ g(
    "div",
    {
      className: "wx-RsQD74qC " + I,
      style: R,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: k,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", style: $, children: e.text || "" })
    }
  ) : /* @__PURE__ */ q(
    "div",
    {
      className: "wx-RsQD74qC " + M,
      style: R,
      onClick: w,
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
          const T = e.cell;
          return /* @__PURE__ */ g(
            T,
            {
              api: c,
              cell: C(),
              column: n,
              row: r,
              onAction: ({ action: G, data: te }) => c.exec(G, te)
            }
          );
        })() : e.filter ? /* @__PURE__ */ g(Dc, { filter: e.filter, column: n }) : /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: H,
            onClick: (T) => T.stopPropagation(),
            children: /* @__PURE__ */ g("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ q(Ee, { children: [
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
  const s = ye(rt), o = _(
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
  ), i = _(
    () => Io(e, t, r),
    [e, t, r]
  ), l = E(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), a = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ g("div", { className: a, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? zo.createElement(t.cell, {
    api: s,
    cell: l(),
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
  const i = ye(rt), l = ee(i, "_sizes"), a = ee(i, "split"), c = _(() => l?.[`${r}RowHeights`], [l, r]), d = _(() => {
    let h = [];
    if (n && n.length) {
      const x = n[0][r].length;
      for (let w = 0; w < x; w++) {
        let y = 0;
        h.push([]), n.forEach((k, v) => {
          const N = { ...k[r][w] };
          if (y || h[w].push(N), N.colspan > 1) {
            if (y = N.colspan - 1, !bo() && k.right) {
              let b = k.right;
              for (let $ = 1; $ < N.colspan; $++)
                b -= n[v + $].width;
              N.right = b;
            }
          } else y && y--;
        });
      }
    }
    return h;
  }, [n, r]), u = _(() => a?.left || a?.right, [a]);
  function f(h) {
    return n.find((x) => x.id === h);
  }
  function p(h, x) {
    let w = x;
    return h.rowspan && (w += h.rowspan - 1), w === d.length - 1;
  }
  function m(h, x, w) {
    if (!w.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const k = w.header[y];
      if (!k.filter && !k._hidden) return x === y;
    }
    return p(h, x);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((h, x) => /* @__PURE__ */ g(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[x]}px`, display: "flex" },
          role: "row",
          children: h.map((w) => {
            const y = f(w.id);
            return r === "header" ? /* @__PURE__ */ g(
              Mc,
              {
                cell: w,
                columnStyle: s,
                column: y,
                row: x,
                lastRow: p(w, x),
                bodyHeight: o,
                sortRow: m(w, x, y),
                hasSplit: u
              },
              w.id
            ) : /* @__PURE__ */ g(
              Ec,
              {
                cell: w,
                columnStyle: s,
                column: f(w.id),
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
function Rc({ overlay: t }) {
  const e = ye(rt);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ g("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ g(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Ic(t) {
  const { actions: e, editor: n } = t, [r, s] = j(n?.value || ""), o = W(null);
  P(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function l({ key: a }) {
    a === "Enter" && e.save();
  }
  return /* @__PURE__ */ g(
    "input",
    {
      className: "wx-e7Ao5ejY wx-text",
      onInput: i,
      onKeyDown: l,
      ref: o,
      type: "text",
      value: r
    }
  );
}
function Ac({ actions: t, editor: e, onAction: n }) {
  const [r, s] = j(e?.value), [o, i] = j(e?.renderedValue), [l, a] = j(e?.options || []), c = _(() => e?.config?.template, [e]), d = _(() => e?.config?.cell, [e]), u = _(() => (l || []).findIndex((y) => y.id === r), [l, r]), f = W(null), p = W(null), m = E(
    (y) => {
      f.current = y.navigate, p.current = y.keydown, f.current(u);
    },
    [u, f]
  ), h = E(
    (y) => {
      const k = y?.target?.value ?? "";
      i(k);
      const v = k ? (e?.options || []).filter(
        (N) => (N.label || "").toLowerCase().includes(k.toLowerCase())
      ) : e?.options || [];
      a(v), v.length ? f.current(-1 / 0) : f.current(null);
    },
    [e]
  ), x = W(null);
  P(() => {
    x.current && x.current.focus();
  }, []), P(() => {
    s(e?.value), i(e?.renderedValue), a(e?.options || []);
  }, [e]);
  const w = E(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: x,
        value: o ?? "",
        onChange: h,
        onKeyDown: (y) => p.current ? p.current(y, u) : void 0
      }
    ),
    /* @__PURE__ */ g(
      Mn,
      {
        items: l,
        onReady: m,
        onSelect: w,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ g(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Hc({ actions: t, editor: e, onAction: n }) {
  const [r] = j(() => e.value || /* @__PURE__ */ new Date()), [s] = j(() => e.config?.template), [o] = j(() => e.config?.cell);
  function i({ value: a }) {
    t.updateValue(a), t.save();
  }
  const l = W(null);
  return P(() => {
    l.current && l.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: l,
        tabIndex: 0,
        onClick: () => t.cancel(),
        onKeyDown: (a) => a.preventDefault(),
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
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = j(
    n.options.find((h) => h.id === n.value)
  ), [i] = j(n.value), [l] = j(n.options), a = _(
    () => l.findIndex((h) => h.id === i),
    [l, i]
  );
  function c({ id: h }) {
    e.updateValue(h), e.save();
  }
  let d;
  const [u, f] = j();
  function p(h) {
    d = h.navigate, f(() => h.keydown), d(a);
  }
  const m = W(null);
  return P(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        ref: m,
        className: "wx-ywGRk611 wx-value",
        tabIndex: 0,
        onClick: () => e.cancel(),
        onKeyDown: (h) => {
          u(h, a), h.preventDefault();
        },
        children: s.template ? s.template(o) : s.cell ? (() => {
          const h = s.cell;
          return /* @__PURE__ */ g(h, { data: o, onAction: r });
        })() : /* @__PURE__ */ g("span", { className: "wx-ywGRk611 wx-text", children: n.renderedValue })
      }
    ),
    /* @__PURE__ */ g(Mn, { items: l, onReady: p, onSelect: c, children: ({ option: h }) => s.template ? s.template(h) : s.cell ? (() => {
      const x = s.cell;
      return /* @__PURE__ */ g(x, { data: h, onAction: r });
    })() : h.label })
  ] });
}
const zc = {
  text: Ic,
  combo: Ac,
  datepicker: Hc,
  richselect: Lc
};
function Wc({ column: t, row: e }) {
  const n = ye(rt), r = ee(n, "editor"), s = E(
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
  ), i = E(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), l = E(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), a = E(
    (m) => {
      m.key === "Enter" && r && i();
    },
    [r, i]
  ), c = _(
    () => Hn(
      t.width,
      t.flexgrow,
      t.fixed,
      t.left,
      t.right
    ),
    [t.width, t.flexgrow, t.fixed, t.left, t.right]
  ), d = _(() => {
    let m = t.editor;
    typeof m == "function" && (m = m(e, t));
    let h = typeof m == "string" ? m : m.type;
    return zc[h];
  }, [t, e]), u = W(null);
  P(() => {
    if (!u.current) return;
    const m = en(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), P(() => {
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
      onKeyDown: a,
      children: d ? /* @__PURE__ */ g(
        d,
        {
          editor: r,
          actions: { save: o, cancel: i, updateValue: l },
          onAction: ({ action: m, data: h }) => n.exec(m, h)
        }
      ) : null
    }
  );
}
function ms(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = ye(rt), { filterValues: o, _columns: i, _sizes: l } = s.getState();
  function a(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ g(Ee, { children: e.map((c, d) => /* @__PURE__ */ g("tr", { children: c.map((u) => {
    const f = i.find((h) => h.id == u.id), p = `wx-print-cell-${n}${a(f)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ g(
      "th",
      {
        style: _s(ko(u, l.columnWidth)),
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
        ) : u.filter ? /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-print-filter", children: Da(o, i, u) }) : /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Fc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: l } = t, a = ye(rt), { flatData: c, _sizes: d } = a.getState(), u = o && ls(e, "header", d.headerRowHeights), f = i && ls(e, "footer", d.footerRowHeights);
  function p(h, x) {
    let w = "";
    return w += r ? " " + r(x) : "", w += s ? " " + s(h, x) : "", w;
  }
  function m(h, x) {
    return typeof x.draggable == "function" ? x.draggable(h, x) !== !1 : x.draggable;
  }
  return /* @__PURE__ */ q(
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
        /* @__PURE__ */ g("tbody", { children: c.map((h, x) => /* @__PURE__ */ g(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(h) : ""),
            style: { height: `${h.rowHeight || d.rowHeight}px` },
            children: e.map(
              (w) => w.collapsed ? null : /* @__PURE__ */ q(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${p(h, w)}`,
                  style: _s(
                    ko(w, d.columnWidth)
                  ),
                  children: [
                    l && w.draggable ? /* @__PURE__ */ g("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(h, w) ? /* @__PURE__ */ g("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    w.treetoggle ? /* @__PURE__ */ q(Ee, { children: [
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
                    w.cell ? (() => {
                      const y = w.cell;
                      return /* @__PURE__ */ g(y, { api: a, row: h, column: w });
                    })() : /* @__PURE__ */ g("span", { children: vt(h, w) })
                  ]
                },
                w.id
              )
            )
          },
          x
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
function Oc(t) {
  const { config: e, ...n } = t, r = ye(rt), { _skin: s, _columns: o } = r.getState(), i = _(() => _a(o, e), []), l = W(null);
  return P(() => {
    const a = document.body;
    a.classList.add("wx-print");
    const c = l.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    a.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, f = document.createElement("style");
    f.setAttribute("type", "text/css"), f.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(f), f.appendChild(document.createTextNode(u)), window.print(), f.remove(), a.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ g(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: l,
      children: i.map((a, c) => /* @__PURE__ */ g("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ g(Fc, { columns: a, ...n }) }, c))
    }
  );
}
function Pc(t) {
  const {
    header: e,
    footer: n,
    overlay: r,
    multiselect: s,
    onreorder: o,
    rowStyle: i,
    columnStyle: l,
    cellStyle: a,
    autoRowHeight: c,
    resize: d,
    clientWidth: u,
    clientHeight: f,
    responsiveLevel: p,
    hotkeys: m
  } = t, h = ye(rt), x = ee(h, "dynamic"), w = ee(h, "_columns"), y = ee(h, "flatData"), k = ee(h, "split"), v = ee(h, "_sizes"), [N, b] = qt(h, "selectedRows"), $ = ee(h, "select"), R = ee(h, "editor"), z = ee(h, "tree"), C = ee(h, "focusCell"), I = ee(h, "_print"), M = ee(h, "undo"), H = ee(h, "reorder"), T = ee(h, "_rowHeightFromData"), [G, te] = j(0);
  P(() => {
    te(B());
  }, []);
  const [ue, Q] = j(0), [le, ve] = j(0), A = _(() => (w || []).some((D) => !D.hidden && D.flexgrow), [w]), re = _(() => v?.rowHeight || 0, [v]), pe = W(null), [Y, O] = j(null), [ne, he] = j(null), K = _(() => {
    let D = [], F = 0;
    return k && k.left && (D = (w || []).slice(0, k.left).filter((ce) => !ce.hidden).map((ce) => ({ ...ce })), D.forEach((ce) => {
      ce.fixed = { left: 1 }, ce.left = F, F += ce.width;
    }), D.length && (D[D.length - 1].fixed = { left: -1 })), { columns: D, width: F };
  }, [k, w]), oe = _(() => {
    let D = [], F = 0;
    if (k && k.right) {
      D = (w || []).slice(k.right * -1).filter((ce) => !ce.hidden).map((ce) => ({ ...ce }));
      for (let ce = D.length - 1; ce >= 0; ce--) {
        const Te = D[ce];
        Te.fixed = { right: 1 }, Te.right = F, F += Te.width;
      }
      D.length && (D[0].fixed = { right: -1 });
    }
    return { columns: D, width: F };
  }, [k, w]), ie = _(() => {
    const D = (w || []).slice(k?.left || 0, (w || []).length - (k?.right ?? 0)).filter((F) => !F.hidden);
    return D.forEach((F) => {
      F.fixed = 0;
    }), D;
  }, [w, k]), V = _(() => (w || []).reduce((D, F) => (F.hidden || (D += F.width), D), 0), [w]), ge = 1;
  function _e(D, F, ce) {
    let Te = F, Fe = D;
    if (ie.length) {
      let Ie = ie.length;
      for (let we = D; we >= 0; we--)
        ie[we][ce].forEach((Ge) => {
          Ge.colspan > 1 && we > D - Ge.colspan && we < Ie && (Ie = we);
        });
      if (Ie !== ie.length && Ie < D) {
        for (let we = Ie; we < D; we++)
          Te -= ie[we].width;
        Fe = Ie;
      }
    }
    return { index: Fe, delta: Te };
  }
  const Se = _(() => {
    let D, F, ce;
    const Te = ue, Fe = ue + (u || 0);
    let Ie = 0, we = 0, Ge = 0, st = 0;
    ie.forEach((bt, At) => {
      Te > Ge && (Ie = At, st = Ge), Ge = Ge + bt.width, Fe > Ge && (we = At + ge);
    });
    const ct = { header: 0, footer: 0 };
    for (let bt = we; bt >= Ie; bt--)
      ["header", "footer"].forEach((At) => {
        ie[bt] && ie[bt][At].forEach((Lo) => {
          const zn = Lo.colspan;
          if (zn && zn > 1) {
            const Dr = zn - (we - bt + 1);
            Dr > 0 && (ct[At] = Math.max(ct[At], Dr));
          }
        });
      });
    const je = _e(Ie, st, "header"), dt = _e(Ie, st, "footer"), jt = je.delta, dn = je.index, un = dt.delta, Ln = dt.index;
    return A && V > (u || 0) ? D = F = ce = [...K.columns, ...ie, ...oe.columns] : (D = [
      ...K.columns,
      ...ie.slice(Ie, we + 1),
      ...oe.columns
    ], F = [
      ...K.columns,
      ...ie.slice(dn, we + ct.header + 1),
      ...oe.columns
    ], ce = [
      ...K.columns,
      ...ie.slice(Ln, we + ct.footer + 1),
      ...oe.columns
    ]), {
      data: D || [],
      header: F || [],
      footer: ce || [],
      d: st,
      df: un,
      dh: jt
    };
  }, [
    ie,
    K,
    oe,
    ue,
    u,
    A,
    V
  ]), We = _(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), Ae = _(
    () => n && v?.footerHeight || 0,
    [n, v]
  ), Pe = _(() => u && f ? V >= u : !1, [u, f, V]), U = _(() => (f || 0) - We - Ae - (Pe ? G : 0), [f, We, Ae, Pe, G]), ke = _(() => Math.ceil((U || 0) / (re || 1)) + 1, [U, re]), Ne = W([]), [Z, xe] = j(0), [be, nt] = j(void 0), He = _(() => {
    let D = 0, F = 0;
    const ce = 2;
    if (c) {
      let Ie = le;
      for (; Ie > 0; )
        Ie -= Ne.current[D] || re, D++;
      F = le - Ie;
      for (let we = Math.max(0, D - ce - 1); we < D; we++)
        F -= Ne.current[D - we] || re;
      D = Math.max(0, D - ce);
    } else {
      if (T) {
        let Ie = 0, we = 0;
        for (let je = 0; je < (y || []).length; je++) {
          const dt = y[je].rowHeight || re;
          if (we + dt > le) {
            Ie = je;
            break;
          }
          we += dt;
        }
        D = Math.max(0, Ie - ce);
        for (let je = 0; je < D; je++)
          F += y[je].rowHeight || re;
        let Ge = 0, st = 0;
        for (let je = Ie + 1; je < (y || []).length; je++) {
          const dt = y[je].rowHeight || re;
          if (Ge++, st + dt > U)
            break;
          st += dt;
        }
        const ct = Math.min(
          x ? x.rowCount : (y || []).length,
          Ie + Ge + ce
        );
        return { d: F, start: D, end: ct };
      }
      D = Math.floor(le / (re || 1)), D = Math.max(0, D - ce), F = D * (re || 0);
    }
    const Te = x ? x.rowCount : (y || []).length, Fe = Math.min(Te, D + (ke || 0) + ce);
    return { d: F, start: D, end: Fe };
  }, [c, T, le, re, x, y, ke, U]), ze = _(() => {
    const D = x ? x.rowCount : (y || []).length;
    if (c)
      return Z + He.d + (D - (be || 0)) * (re || 0);
    if (!T)
      return D * (re || 0);
    let F = 0;
    for (let ce = 0; ce < D; ce++)
      F += y[ce]?.rowHeight || re;
    return F;
  }, [
    x,
    y,
    re,
    c,
    T,
    Z,
    He.d,
    be
  ]), Be = _(() => u && f ? ze + We + Ae >= f - (V >= (u || 0) ? G : 0) : !1, [
    u,
    f,
    ze,
    We,
    Ae,
    V,
    G
  ]), lt = _(() => A && V <= (u || 0) ? (u || 0) - 0 - (Be ? G : 0) : V, [A, V, u, Be, G, Pe]), L = _(() => A && V <= (u || 0) ? u || 0 : lt < (u || 0) ? V + (Be ? G : 0) : -1, [A, V, u, lt, Be, G]), X = W({});
  P(() => {
    if (x && (X.current.start !== He.start || X.current.end !== He.end)) {
      const { start: D, end: F } = He;
      X.current = { start: D, end: F }, h && h.exec && h.exec("request-data", { row: { start: D, end: F } });
    }
  }, [x, He, h]);
  const J = _(() => x ? y || [] : (y || []).slice(He.start, He.end), [x, y, He]), fe = _(() => (N || []).filter(
    (D) => (J || []).some((F) => F.id === D)
  ), [b, J]), De = _(() => He.start, [He.start]), Me = E((D) => {
    ve(D.target.scrollTop), Q(D.target.scrollLeft);
  }, []), Ye = E((D) => {
    D.shiftKey && D.preventDefault(), pe.current && pe.current.focus && pe.current.focus();
  }, []), Xe = E(() => !!(w || []).find((D) => !!D.draggable), [w]), Rt = W(null), ft = W(null), ln = W({
    dblclick: (D, F) => {
      const ce = { id: D, column: Xn(F, "data-col-id") };
      h.exec("open-editor", ce);
    },
    click: (D, F) => {
      if (Rt.current) return;
      const ce = Xn(F, "data-col-id");
      if (C?.id !== D && h.exec("focus-cell", {
        row: D,
        column: ce,
        eventSource: "click"
      }), $ === !1) return;
      const Te = s && F.ctrlKey, Fe = s && F.shiftKey;
      (Te || N.length > 1 || !N.includes(D)) && h.exec("select-row", { id: D, toggle: Te, range: Fe });
    },
    "toggle-row": (D) => {
      const F = h.getRow(D);
      h.exec(F.open !== !1 ? "close-row" : "open-row", { id: D });
    },
    "ignore-click": () => !1
  }), xt = _(() => ({
    top: We,
    bottom: Ae,
    left: K.width,
    xScroll: Pe,
    yScroll: Be,
    sense: c && ne ? ne.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: pe.current && pe.current.firstElementChild
  }), [
    We,
    Ae,
    K.width,
    Pe,
    Be,
    c,
    ne,
    v
  ]);
  function an(D, F) {
    const { container: ce, sourceNode: Te, from: Fe } = F;
    if (Xe() && !Te.getAttribute("draggable-data"))
      return !1;
    O(Fe), h.getRow(Fe).open && h.exec("close-row", { id: Fe, nested: !0 });
    const Ie = qe(Te, "data-id"), we = Ie.cloneNode(!0);
    we.classList.remove("wx-selected"), we.querySelectorAll("[tabindex]").forEach((je) => je.setAttribute("tabindex", "-1")), ce.appendChild(we), he(we);
    const Ge = ue - Se.d, st = Be ? G : 0;
    ce.style.width = Math.min(
      (u || 0) - st,
      A && V <= (u || 0) ? lt : lt - st
    ) + Ge + "px";
    const ct = kn(Ie);
    F.offset = {
      x: Ge,
      y: -Math.round(ct.height / 2)
    }, ft.current || (ft.current = D.clientY);
  }
  function cn(D, F) {
    const { from: ce } = F, Te = F.pos, Fe = kn(pe.current);
    Te.x = Fe.x;
    const Ie = xt.top;
    if (Te.y < Ie) Te.y = Ie;
    else {
      const we = Fe.height - (Pe && G > 0 ? G : Math.round(xt.sense / 2)) - xt.bottom;
      Te.y > we && (Te.y = we);
    }
    if (pe.current.contains(F.targetNode)) {
      const we = qe(F.targetNode, "data-id"), Ge = Pt(we?.getAttribute("data-id"));
      if (Ge && Ge !== ce) {
        F.to = Ge;
        const st = c ? ne?.offsetHeight : v?.rowHeight;
        if (ne && (le === 0 || Te.y > Ie + st - 1)) {
          const ct = we.getBoundingClientRect(), je = kn(ne).y, dt = ct.y, jt = je > dt ? -1 : 1, dn = jt === 1 ? "after" : "before", un = Math.abs(h.getRowIndex(ce) - h.getRowIndex(Ge)), Ln = un !== 1 ? dn === "before" ? "after" : "before" : dn;
          if (un === 1 && (jt === -1 && D.clientY > ft.current || jt === 1 && D.clientY < ft.current))
            return;
          ft.current = D.clientY, h.exec("move-item", {
            id: ce,
            target: Ge,
            mode: Ln,
            inProgress: !0
          });
        }
      }
      o && o({ event: D, context: F });
    }
    vc(D, Fe, F, xt);
  }
  function S(D, F) {
    const { from: ce, to: Te } = F;
    h.exec("move-item", {
      id: ce,
      target: Te,
      inProgress: !1
    }), Rt.current = setTimeout(() => {
      Rt.current = 0;
    }, 1), O(null), he(null), ft.current = null, Eo(F);
  }
  function B() {
    const D = document.createElement("div");
    D.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(D);
    const F = D.offsetWidth - D.clientWidth;
    return document.body.removeChild(D), F;
  }
  const se = _(() => L > 0 ? { width: `${L}px` } : void 0, [L]), ae = W(null);
  function de() {
    Promise.resolve().then(() => {
      let D = 0, F = De;
      const ce = ae.current;
      ce && (Array.from(ce.children).forEach((Te, Fe) => {
        Ne.current[De + Fe] = Te.offsetHeight, D += Te.offsetHeight, F++;
      }), xe(D), nt(F));
    });
  }
  P(() => {
    J && c && de();
  }, [J, c, De]);
  let [me, Ce] = j();
  P(() => {
    if (C && (!$ || !fe.length || fe.includes(C.row)))
      Ce({ ...C });
    else if (J.length && Se.data.length) {
      if (!me || fe.length && !fe.includes(me.row) || J.findIndex((D) => D.id == me.row) === -1 || Se.data.findIndex(
        (D) => D.id == me.column && !D.collapsed
      ) === -1) {
        const D = fe[0] || J[0].id, F = Se.data.findIndex((ce) => !ce.collapsed);
        Ce(F !== -1 ? { row: D, column: Se.data[F].id } : null);
      }
    } else Ce(null);
  }, [C]);
  const Le = W(null);
  P(() => {
    const D = pe.current;
    if (!D) return;
    const F = pc(D, d);
    return () => {
      typeof F == "function" && F();
    };
  }, [d]);
  const Re = W({});
  Object.assign(Re.current, {
    start: an,
    move: cn,
    end: S,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: Xe() })
  }), P(() => {
    const D = pe.current;
    return D ? wc(D, Re).destroy : void 0;
  }, [H, pe.current]), P(() => {
    const D = pe.current;
    return D ? Cr(D, {
      keys: m !== !1 && {
        ...qa,
        "ctrl+z": M,
        "ctrl+y": M,
        ...m
      },
      exec: (F) => h.exec("hotkey", F)
    }).destroy : void 0;
  }, [h, M, m]);
  const Ve = W({
    scroll: h.getReactiveState().scroll
  });
  Ve.current.getWidth = () => (u || 0) - (Be ? G : 0), Ve.current.getHeight = () => U, Ve.current.getScrollMargin = () => K.width + oe.width, P(() => {
    Xa(Le.current, Ve.current);
  }, []);
  const Qe = W(null);
  P(() => {
    const D = Qe.current;
    if (!D) return;
    const F = [];
    return F.push(
      en(D, () => h.exec("focus-cell", { eventSource: "click" })).destroy
    ), F.push(ri(D, ln.current)), () => F.forEach((ce) => ce());
  }, []);
  const It = `wx-grid ${p ? `wx-responsive-${p}` : ""}`;
  return /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-4VuBwK2D " + It,
        style: {
          "--header-height": `${We}px`,
          "--footer-height": `${Ae}px`,
          "--split-left-width": `${K.width}px`,
          "--split-right-width": `${oe.width}px`
        },
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: pe,
            className: "wx-4VuBwK2D wx-table-box",
            style: se,
            role: z ? "treegrid" : "grid",
            "aria-colcount": Se.data.length,
            "aria-rowcount": J.length,
            "aria-multiselectable": z && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ q(
              "div",
              {
                ref: Le,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: Pe ? "scroll" : "hidden",
                  overflowY: Be ? "scroll" : "hidden"
                },
                onScroll: Me,
                children: [
                  e ? /* @__PURE__ */ g("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ g(
                    gs,
                    {
                      contentWidth: lt,
                      deltaLeft: Se.dh,
                      columns: Se.header,
                      columnStyle: l,
                      bodyHeight: U - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ q(
                    "div",
                    {
                      ref: Qe,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${lt}px`, height: `${ze}px` },
                      onMouseDown: (D) => Ye(D),
                      children: [
                        r ? /* @__PURE__ */ g(Rc, { overlay: r }) : null,
                        /* @__PURE__ */ g(
                          "div",
                          {
                            ref: ae,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${He.d}px`,
                              paddingLeft: `${Se.d}px`
                            },
                            children: J.map((D, F) => {
                              const ce = N.indexOf(D.id) !== -1, Te = Y === D.id, Fe = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(D) : "") + (ce ? " wx-selected" : "") + (Te ? " wx-inactive" : ""), Ie = c ? { minHeight: `${D.rowHeight || re}px` } : { height: `${D.rowHeight || re}px` };
                              return /* @__PURE__ */ g(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + Fe,
                                  "data-id": D.id,
                                  "data-context-id": D.id,
                                  style: Ie,
                                  role: "row",
                                  "aria-rowindex": F,
                                  "aria-expanded": D.open,
                                  "aria-level": z ? D.$level + 1 : void 0,
                                  "aria-selected": z ? ce : void 0,
                                  tabIndex: -1,
                                  children: Se.data.map((we) => we.collapsed ? /* @__PURE__ */ g(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    we.id
                                  ) : R?.id === D.id && R.column == we.id ? /* @__PURE__ */ g(Wc, { row: D, column: we }, we.id) : /* @__PURE__ */ g(
                                    _c,
                                    {
                                      row: D,
                                      column: we,
                                      columnStyle: l,
                                      cellStyle: a,
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
                      contentWidth: lt,
                      deltaLeft: Se.df,
                      columns: Se.footer,
                      columnStyle: l
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
      Oc,
      {
        config: I,
        rowStyle: i,
        columnStyle: l,
        cellStyle: a,
        header: e,
        footer: n,
        reorder: H
      }
    ) : null
  ] });
}
const Yc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Vc = Dt(function({
  data: t = [],
  columns: e = [],
  rowStyle: n = null,
  columnStyle: r = null,
  cellStyle: s = null,
  selectedRows: o,
  select: i = !0,
  multiselect: l = !1,
  header: a = !0,
  footer: c = !1,
  dynamic: d = null,
  overlay: u = null,
  reorder: f = !1,
  onReorder: p = null,
  autoRowHeight: m = !1,
  sizes: h,
  split: x,
  tree: w = !1,
  autoConfig: y = !1,
  init: k = null,
  responsive: v = null,
  sortMarks: N,
  undo: b = !1,
  hotkeys: $ = null,
  ...R
}, z) {
  const C = W();
  C.current = R;
  const I = _(() => new Va(Cs), []), M = _(() => I.in, [I]), H = W(null);
  H.current === null && (H.current = new Is((K, oe) => {
    const ie = "on" + Yc(K);
    C.current && C.current[ie] && C.current[ie](oe);
  }), M.setNext(H.current));
  const T = _(
    () => ({
      getState: I.getState.bind(I),
      getReactiveState: I.getReactive.bind(I),
      getStores: () => ({ data: I }),
      exec: M.exec,
      setNext: (K) => (H.current = H.current.setNext(K), H.current),
      intercept: M.intercept.bind(M),
      on: M.on.bind(M),
      detach: M.detach.bind(M),
      getRow: I.getRow.bind(I),
      getRowIndex: I.getRowIndex.bind(I),
      getColumn: I.getColumn.bind(I)
    }),
    [I, M]
  ), [G, te] = j(0), [ue, Q] = j(0), [le, ve] = j(null), [A, re] = j(null), pe = _(() => {
    if (y && !e.length && t.length) {
      const K = t[0], oe = [];
      for (let ie in K)
        if (ie !== "id" && ie[0] !== "$") {
          let V = {
            id: ie,
            header: ie[0].toUpperCase() + ie.slice(1)
          };
          typeof y == "object" && (V = { ...V, ...y }), oe.push(V);
        }
      return oe;
    }
    return (A && A.columns) ?? e;
  }, [y, e, t, A]), Y = _(
    () => (A && A.sizes) ?? h,
    [A, h]
  ), O = E(
    (K) => {
      if (te(K.width), Q(K.height), v) {
        const oe = Object.keys(v).map(Number).sort((ie, V) => ie - V).find((ie) => K.width <= ie) ?? null;
        oe !== le && (re(v[oe]), ve(oe));
      }
    },
    [v, le]
  ), ne = ye(tt.theme), he = W(0);
  return P(() => {
    if (!he.current)
      k && k(T);
    else {
      const K = I.getState();
      I.init({
        data: t,
        columns: pe,
        split: x || K.split,
        sizes: Y || K.sizes,
        selectedRows: o || K.selectedRows,
        dynamic: d,
        tree: w,
        sortMarks: N || K.sortMarks,
        undo: b,
        reorder: f,
        _skin: ne,
        _select: i
      });
    }
    he.current++;
  }, [
    I,
    t,
    pe,
    x,
    Y,
    o,
    d,
    w,
    N,
    b,
    f,
    ne,
    i,
    k,
    T
  ]), he.current === 0 && I.init({
    data: t,
    columns: pe,
    split: x || { left: 0 },
    sizes: Y || {},
    selectedRows: o || [],
    dynamic: d,
    tree: w,
    sortMarks: N || {},
    undo: b,
    reorder: f,
    _skin: ne,
    select: i
  }), Mt(
    z,
    () => ({
      ...T
    }),
    [T]
  ), /* @__PURE__ */ g(rt.Provider, { value: T, children: /* @__PURE__ */ g(En, { words: Ja, optional: !0, children: /* @__PURE__ */ g(
    Pc,
    {
      header: a,
      footer: c,
      overlay: u,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      onReorder: p,
      multiselect: l,
      autoRowHeight: m,
      clientWidth: G,
      clientHeight: ue,
      responsiveLevel: le,
      resize: O,
      hotkeys: $
    }
  ) }) });
});
function Gc({ item: t }) {
  return /* @__PURE__ */ q(
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
function jc({ columns: t = null, api: e, children: n }) {
  P(() => {
    rc("table-header", Gc);
  }, []);
  function r(a) {
    for (let c = a.header.length - 1; c >= 0; c--) {
      const d = a.header[c].text;
      if (d) return d;
    }
    return a.id;
  }
  function s(a) {
    const c = a.action;
    c && e.exec("hide-column", { id: c.id, mode: !c.hidden });
  }
  function o(a) {
    return a;
  }
  const i = ht(e, "_columns"), l = _(() => {
    if (e) {
      const a = Array.isArray(i) ? i : [];
      return (t ? a.filter((c) => t[c.id]) : a).map((c) => {
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
      options: l,
      onClick: s,
      at: "point",
      resolver: o,
      children: typeof n == "function" ? n() : n
    }
  );
}
ur(et);
function Kc({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ q("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
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
  const n = _(() => t.id, [t?.id]);
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
    multiTaskRows: l = !1,
    rowMapping: a = null
  } = t, [c, d] = Oe(o), [u, f] = j(), p = ye(tt.i18n), m = _(() => p.getGroup("gantt"), [p]), h = ye(kt), x = ee(h, "scrollTop"), w = ee(h, "cellHeight"), y = ee(h, "_scrollTask"), k = ee(h, "_selected"), v = ee(h, "area"), N = ee(h, "_tasks"), b = ee(h, "_scales"), $ = ee(h, "columns"), R = ee(h, "_sort"), z = ee(h, "calendar"), C = ee(h, "durationUnit"), I = ee(h, "splitTasks"), [M, H] = j(null), T = _(() => !N || !v ? [] : N.slice(v.start, v.end), [N, v]), G = E(
    (L, X) => {
      if (X === "add-task")
        h.exec(X, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (X === "open-task") {
        const J = T.find((fe) => fe.id === L);
        (J?.data || J?.lazy) && h.exec(X, { id: L, mode: !J.open });
      }
    },
    [T]
  ), te = E(
    (L) => {
      const X = _t(L), J = L.target.dataset.action;
      J && L.preventDefault(), X ? J === "add-task" || J === "open-task" ? G(X, J) : h.exec("select-task", {
        id: X,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : J === "add-task" && G(null, J);
    },
    [h, G]
  ), ue = W(null), Q = W(null), [le, ve] = j(0), [A, re] = j(!1);
  P(() => {
    const L = Q.current;
    if (!L || typeof ResizeObserver > "u") return;
    const X = () => ve(L.clientWidth);
    X();
    const J = new ResizeObserver(X);
    return J.observe(L), () => J.disconnect();
  }, []);
  const pe = W(null), Y = E(
    (L) => {
      const X = L.id, { before: J, after: fe } = L, De = L.onMove;
      let Me = J || fe, Ye = J ? "before" : "after";
      if (De) {
        if (Ye === "after") {
          const Xe = h.getTask(Me);
          Xe.data?.length && Xe.open && (Ye = "before", Me = Xe.data[0].id);
        }
        pe.current = { id: X, [Ye]: Me };
      } else pe.current = null;
      h.exec("move-task", {
        id: X,
        mode: Ye,
        target: Me,
        inProgress: De
      });
    },
    [h]
  ), O = _(() => v?.from ?? 0, [v]), ne = _(() => b?.height ?? 0, [b]), he = _(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (le ?? 0), [n, s, c, r, le]), K = _(() => {
    const L = {};
    return he && s === "all" || s === "grid" && he ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [he, s, c]), oe = _(() => M && !T.find((L) => L.id === M.id) ? [...T, M] : T, [T, M]), ie = _(() => {
    if (!l || !a) return oe;
    const L = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set();
    return oe.forEach((J) => {
      const fe = a.taskRows.get(J.id) ?? J.id;
      X.has(fe) || (L.set(fe, {
        ...J,
        $rowTasks: a.rowMap.get(fe) || [J.id]
      }), X.add(fe));
    }), Array.from(L.values());
  }, [oe, l, a]), V = _(() => {
    let L = ($ || []).map((fe) => {
      fe = { ...fe };
      const De = fe.header;
      if (typeof De == "object") {
        const Me = De.text && m(De.text);
        fe.header = { ...De, text: Me };
      } else fe.header = m(De);
      return fe;
    });
    const X = L.findIndex((fe) => fe.id === "text"), J = L.findIndex((fe) => fe.id === "add-task");
    if (X !== -1 && (L[X].cell && (L[X]._cell = L[X].cell), L[X].cell = Kc), J !== -1) {
      L[J].cell = L[J].cell || ws;
      const fe = L[J].header;
      if (typeof fe != "object" && (L[J].header = { text: fe }), L[J].header.cell = fe.cell || ws, e)
        L.splice(J, 1);
      else if (n) {
        const [De] = L.splice(J, 1);
        L.unshift(De);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [$, m, e, n]), ge = _(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : V.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, V]), _e = _(() => {
    if (ie && R?.length) {
      const L = {};
      return R.forEach(({ key: X, order: J }, fe) => {
        L[X] = {
          order: J,
          ...R.length > 1 && { index: fe }
        };
      }), L;
    }
    return {};
  }, [ie, R]), Se = E(() => V.some((L) => L.flexgrow && !L.hidden), []), We = _(() => Se(), [Se, A]), Ae = _(() => {
    let L = s === "chart" ? V.filter((J) => J.id === "add-task") : V;
    const X = s === "all" ? r : le;
    if (!We) {
      let J = c, fe = !1;
      if (V.some((De) => De.$width)) {
        let De = 0;
        J = V.reduce((Me, Ye) => (Ye.hidden || (De += Ye.width, Me += Ye.$width || Ye.width), Me), 0), De > J && J > X && (fe = !0);
      }
      if (fe || J < X) {
        let De = 1;
        return fe || (De = (X - 50) / (J - 50 || 1)), L.map((Me) => (Me.id !== "add-task" && !Me.hidden && (Me.$width || (Me.$width = Me.width), Me.width = Me.$width * De), Me));
      }
    }
    return L;
  }, [s, V, We, c, r, le]), Pe = E(
    (L) => {
      if (!Se()) {
        const X = Ae.reduce((J, fe) => (L && fe.$width && (fe.$width = fe.width), J + (fe.hidden ? 0 : fe.width)), 0);
        X !== c && d(X);
      }
      re(!0), re(!1);
    },
    [Se, Ae, c, d]
  ), U = E(() => {
    V.filter((X) => X.flexgrow && !X.hidden).length === 1 && V.forEach((X) => {
      X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
    });
  }, []), ke = E(
    (L) => {
      if (!e) {
        const X = _t(L), J = Xn(L, "data-col-id");
        !(J && V.find((De) => De.id == J))?.editor && X && h.exec("show-editor", { id: X });
      }
    },
    [h, e]
    // cols is defined later; relies on latest value at call time
  ), Ne = _(
    () => Array.isArray(k) ? k.map((L) => L.id) : [],
    [k]
  ), Z = E(() => {
    if (ue.current && ie !== null) {
      const L = ue.current.querySelector(".wx-body");
      L && (L.style.top = -((x ?? 0) - (O ?? 0)) + "px");
    }
    Q.current && (Q.current.scrollTop = 0);
  }, [ie, x, O]);
  P(() => {
    ue.current && Z();
  }, [x, O, Z]), P(() => {
    const L = ue.current;
    if (!L) return;
    const X = L.querySelector(".wx-table-box .wx-body");
    if (!X || typeof ResizeObserver > "u") return;
    const J = new ResizeObserver(() => {
      Z();
    });
    return J.observe(X), () => {
      J.disconnect();
    };
  }, [Ae, K, s, ge, ie, Z]), P(() => {
    if (!y || !u) return;
    const { id: L } = y, X = u.getState().focusCell;
    X && X.row !== L && ue.current && ue.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: X.column
    });
  }, [y, u]);
  const xe = E(
    ({ id: L }) => {
      if (e) return !1;
      h.getTask(L).open && h.exec("open-task", { id: L, mode: !1 });
      const X = h.getState()._tasks.find((J) => J.id === L);
      if (H(X || null), !X) return !1;
    },
    [h, e]
  ), be = E(
    ({ id: L, top: X }) => {
      pe.current ? Y({ ...pe.current, onMove: !1 }) : h.exec("drag-task", {
        id: L,
        top: X + (O ?? 0),
        inProgress: !1
      }), H(null);
    },
    [h, Y, O]
  ), nt = E(
    ({ id: L, top: X, detail: J }) => {
      J && Y({ ...J, onMove: !0 }), h.exec("drag-task", {
        id: L,
        top: X + (O ?? 0),
        inProgress: !0
      });
    },
    [h, Y, O]
  );
  P(() => {
    const L = ue.current;
    return L ? Za(L, {
      start: xe,
      end: be,
      move: nt,
      getTask: h.getTask
    }).destroy : void 0;
  }, [h, xe, be, nt]);
  const He = E(
    (L) => {
      const { key: X, isInput: J } = L;
      if (!J && (X === "arrowup" || X === "arrowdown"))
        return L.eventSource = "grid", h.exec("hotkey", L), !1;
      if (X === "enter") {
        const fe = u?.getState().focusCell;
        if (fe) {
          const { row: De, column: Me } = fe;
          Me === "add-task" ? G(De, "add-task") : Me === "text" && G(De, "open-task");
        }
      }
    },
    [h, G, u]
  ), ze = W(null), Be = () => {
    ze.current = {
      setTableAPI: f,
      handleHotkey: He,
      sortVal: R,
      api: h,
      adjustColumns: U,
      setColumnWidth: Pe,
      tasks: T,
      calendarVal: z,
      durationUnitVal: C,
      splitTasksVal: I,
      onTableAPIChange: i
    };
  };
  Be(), P(() => {
    Be();
  }, [
    f,
    He,
    R,
    h,
    U,
    Pe,
    T,
    z,
    C,
    I,
    i
  ]);
  const lt = E((L) => {
    f(L), L.intercept("hotkey", (X) => ze.current.handleHotkey(X)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (X) => {
      const J = ze.current.sortVal, { key: fe, add: De } = X, Me = J ? J.find((Xe) => Xe.key === fe) : null;
      let Ye = "asc";
      return Me && (Ye = !Me || Me.order === "asc" ? "desc" : "asc"), h.exec("sort-tasks", {
        key: fe,
        order: Ye,
        add: De
      }), !1;
    }), L.on("resize-column", () => {
      ze.current.setColumnWidth(!0);
    }), L.on("hide-column", (X) => {
      X.mode || ze.current.adjustColumns(), ze.current.setColumnWidth();
    }), L.intercept("update-cell", (X) => {
      const { id: J, column: fe, value: De } = X, Me = ze.current.tasks.find((Ye) => Ye.id === J);
      if (Me) {
        const Ye = { ...Me };
        let Xe = De;
        Xe && !isNaN(Xe) && !(Xe instanceof Date) && (Xe *= 1), Ye[fe] = Xe, fo(
          Ye,
          {
            calendar: ze.current.calendarVal,
            durationUnit: ze.current.durationUnitVal,
            splitTasks: ze.current.splitTasksVal
          },
          fe
        ), h.exec("update-task", {
          id: J,
          task: Ye
        });
      }
      return !1;
    }), i && i(L);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${ge}` },
      ref: Q,
      children: /* @__PURE__ */ g(
        "div",
        {
          ref: ue,
          style: K,
          className: "wx-rHj6070p wx-table",
          onClick: te,
          onDoubleClick: ke,
          children: /* @__PURE__ */ g(
            Vc,
            {
              init: lt,
              sizes: {
                rowHeight: w,
                headerHeight: (ne ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: ie,
              columns: Ae,
              selectedRows: [...Ne],
              sortMarks: _e
            }
          )
        }
      )
    }
  );
}
function Uc({ borders: t = "" }) {
  const e = ye(kt), n = ee(e, "cellWidth"), r = ee(e, "cellHeight"), s = W(null), [o, i] = j("#e4e4e4");
  P(() => {
    if (typeof getComputedStyle < "u" && s.current) {
      const a = getComputedStyle(s.current).getPropertyValue(
        "--wx-gantt-border"
      );
      i(a ? a.substring(a.indexOf("#")) : "#1d1e261a");
    }
  }, []);
  const l = {
    width: "100%",
    height: "100%",
    background: n != null && r != null ? `url(${na(n, r, o, t)})` : void 0,
    position: "absolute"
  };
  return /* @__PURE__ */ g("div", { ref: s, style: l });
}
function qc({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = ye(kt), s = ee(r, "_links"), o = ee(r, "criticalPath"), i = W(null), l = E(
    (a) => {
      const c = a?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return P(() => {
    if (!n && e && i.current) {
      const a = (c) => {
        i.current && !i.current.contains(c.target) && l(c);
      };
      return document.addEventListener("click", a), () => {
        document.removeEventListener("click", a);
      };
    }
  }, [n, e, l]), /* @__PURE__ */ q("svg", { className: "wx-dkx3NwEn wx-links", children: [
    (s || []).map((a) => {
      const c = "wx-dkx3NwEn wx-line" + (o && a.$critical ? " wx-critical" : "") + (n ? "" : " wx-line-selectable");
      return /* @__PURE__ */ g(
        "polyline",
        {
          className: c,
          points: a.$p,
          onClick: () => !n && t(a.id),
          "data-link-id": a.id
        },
        a.id
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
    const i = e.duration * e.progress / 100, l = e.segments;
    let a = 0, c = 0, d = null;
    do {
      const u = l[c];
      c === o && (a > i ? d = 0 : d = Math.min((i - a) / u.duration, 1) * 100), a += u.duration, c++;
    } while (d === null && c < l.length);
    return d || 0;
  }
  return /* @__PURE__ */ g("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ q(
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
  } = t, i = ye(kt), [l, a] = qt(i, "_tasks"), [c, d] = qt(i, "_links"), u = ee(i, "area"), f = ee(i, "_scales"), p = ee(i, "taskTypes"), m = ee(i, "baselines"), [h, x] = qt(i, "_selected"), w = ee(i, "_scrollTask"), y = ee(i, "criticalPath"), k = ee(i, "tasks"), v = ee(i, "schedule"), N = ee(i, "splitTasks"), b = _(() => {
    if (!u || !Array.isArray(l)) return [];
    const S = u.start ?? 0, B = u.end ?? 0;
    return l.slice(S, B).map((se) => ({ ...se }));
  }, [a, u]), $ = ee(i, "cellHeight"), R = _(() => {
    if (!r || !s || !b.length) return b;
    const S = /* @__PURE__ */ new Map(), B = [];
    return l.forEach((se) => {
      const ae = s.taskRows.get(se.id) ?? se.id;
      S.has(ae) || (S.set(ae, B.length), B.push(ae));
    }), b.map((se) => {
      const ae = s.taskRows.get(se.id) ?? se.id, de = S.get(ae) ?? 0;
      return {
        ...se,
        $y: de * $,
        $y_base: se.$y_base !== void 0 ? de * $ : void 0
      };
    });
  }, [b, r, s, l, $]), z = _(
    () => f.lengthUnitWidth,
    [f]
  ), C = _(
    () => f.lengthUnit || "day",
    [f]
  ), I = W(!1), [M, H] = j(void 0), [T, G] = j(null), te = W(null), [ue, Q] = j(null), [le, ve] = j(void 0), A = W(null), [re, pe] = j(0), [Y, O] = j(null), [ne, he] = j(null), K = W(null), oe = _(() => {
    const S = K.current;
    return !!(h.length && S && S.contains(document.activeElement));
  }, [h, K.current]), ie = _(() => oe && h[h.length - 1]?.id, [oe, h]);
  P(() => {
    if (w && oe && w) {
      const { id: S } = w, B = K.current?.querySelector(
        `.wx-bar[data-id='${S}']`
      );
      B && B.focus({ preventScroll: !0 });
    }
  }, [w]), P(() => {
    const S = K.current;
    if (S && (pe(S.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const B = new ResizeObserver((se) => {
        se[0] && pe(se[0].contentRect.width);
      });
      return B.observe(S), () => B.disconnect();
    }
  }, [K.current]);
  const V = E(() => {
    document.body.style.userSelect = "none";
  }, []), ge = E(() => {
    document.body.style.userSelect = "";
  }, []), _e = E(
    (S, B, se) => {
      if (B.target.classList.contains("wx-line") || (se || (se = i.getTask($t(S))), se.type === "milestone" || se.type === "summary")) return "";
      const ae = qe(B, "data-segment");
      ae && (S = ae);
      const { left: de, width: me } = S.getBoundingClientRect(), Ce = (B.clientX - de) / me;
      let Le = 0.2 / (me > 200 ? me / 200 : 1);
      return Ce < Le ? "start" : Ce > 1 - Le ? "end" : "";
    },
    [i]
  ), Se = _(() => {
    const S = /* @__PURE__ */ new Map();
    if (!r || !s)
      return l.forEach((ae) => {
        S.set(ae.id, ae.$y);
      }), S;
    const B = /* @__PURE__ */ new Map(), se = [];
    return l.forEach((ae) => {
      const de = s.taskRows.get(ae.id) ?? ae.id;
      B.has(de) || (B.set(de, se.length), se.push(de));
    }), l.forEach((ae) => {
      const de = s.taskRows.get(ae.id) ?? ae.id, me = B.get(de) ?? 0;
      S.set(ae.id, me * $);
    }), S;
  }, [l, r, s, $]), We = E(
    (S) => {
      const B = K.current;
      if (!B) return [];
      const se = B.parentElement?.scrollLeft || 0, ae = B.parentElement?.parentElement?.scrollTop || 0, de = Math.min(S.startX, S.currentX), me = Math.max(S.startX, S.currentX), Ce = Math.min(S.startY, S.currentY), Le = Math.max(S.startY, S.currentY);
      return l.filter((Re) => {
        const Ve = Re.$x - se, Qe = Re.$x + Re.$w - se, D = (Se.get(Re.id) ?? Re.$y) - ae, F = D + Re.$h;
        return Ve < me && Qe > de && D < Le && F > Ce;
      });
    },
    [l, Se]
  ), Ae = _(() => new Set(h.map((S) => S.id)), [h, x]), Pe = E(
    (S) => Ae.has(S),
    [Ae]
  ), U = E(
    (S, B) => {
      const { clientX: se } = B, ae = $t(S), de = i.getTask(ae), me = B.target.classList;
      if (!B.target.closest(".wx-delete-button") && !e) {
        if (me.contains("wx-progress-marker")) {
          const { progress: Ce } = i.getTask(ae);
          te.current = {
            id: ae,
            x: se,
            progress: Ce,
            dx: 0,
            node: S,
            marker: B.target
          }, B.target.classList.add("wx-progress-in-drag");
        } else {
          const Ce = _e(S, B, de) || "move", Le = {
            id: ae,
            mode: Ce,
            x: se,
            dx: 0,
            l: de.$x,
            w: de.$w
          };
          if (N && de.segments?.length) {
            const Re = qe(B, "data-segment");
            Re && (Le.segmentIndex = Re.dataset.segment * 1);
          }
          G(Le);
        }
        V();
      }
    },
    [i, e, _e, V, N]
  ), ke = E(
    (S) => {
      if (S.button !== 0) return;
      const B = qe(S);
      if (!B && o && !e) {
        const se = K.current;
        if (!se) return;
        const ae = se.getBoundingClientRect(), de = S.clientX - ae.left, me = S.clientY - ae.top;
        O({
          startX: de,
          startY: me,
          currentX: de,
          currentY: me,
          ctrlKey: S.ctrlKey || S.metaKey
        }), V();
        return;
      }
      if (B) {
        if (o && !e && h.length > 1) {
          const se = $t(B);
          if (Pe(se)) {
            const ae = S.target.classList;
            if (!ae.contains("wx-link") && !ae.contains("wx-progress-marker") && !S.target.closest(".wx-delete-button")) {
              const de = i.getTask(se);
              if (!_e(B, S, de)) {
                const Ce = /* @__PURE__ */ new Map();
                h.forEach((Le) => {
                  const Re = i.getTask(Le.id);
                  if (Re) {
                    if (v?.auto && Re.type === "summary") return;
                    Ce.set(Le.id, {
                      $x: Re.$x,
                      $w: Re.$w,
                      start: Re.start,
                      end: Re.end
                    });
                  }
                }), he({
                  baseTaskId: se,
                  startX: S.clientX,
                  dx: 0,
                  originalPositions: Ce
                }), V();
                return;
              }
            }
          }
        }
        U(B, S);
      }
    },
    [U, o, e, h, Pe, i, _e, v, V]
  ), Ne = E(
    (S) => {
      const B = qe(S);
      B && (A.current = setTimeout(() => {
        ve(!0), U(B, S.touches[0]);
      }, 300));
    },
    [U]
  ), Z = E(
    (S) => {
      Q(S && { ...c.find((B) => B.id === S) });
    },
    [c]
  ), xe = E(() => {
    if (Y) {
      const S = We(Y);
      Y.ctrlKey ? S.forEach((B) => {
        i.exec("select-task", { id: B.id, toggle: !0, marquee: !0 });
      }) : (h.length > 0 && i.exec("select-task", { id: null, marquee: !0 }), S.forEach((B, se) => {
        i.exec("select-task", {
          id: B.id,
          toggle: se > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), O(null), ge(), I.current = !0;
      return;
    }
    if (ne) {
      const { dx: S, originalPositions: B } = ne, se = Math.round(S / z);
      if (se !== 0) {
        let ae = !0;
        B.forEach((de, me) => {
          const Ce = i.getTask(me);
          Ce && (i.exec("update-task", {
            id: me,
            diff: se,
            task: { start: Ce.start, end: Ce.end },
            skipUndo: !ae
            // Only first task creates undo entry
          }), ae = !1);
        }), I.current = !0;
      } else
        B.forEach((ae, de) => {
          i.exec("drag-task", {
            id: de,
            left: ae.$x,
            width: ae.$w,
            inProgress: !1
          });
        });
      he(null), ge();
      return;
    }
    if (te.current) {
      const { dx: S, id: B, marker: se, value: ae } = te.current;
      te.current = null, typeof ae < "u" && S && i.exec("update-task", {
        id: B,
        task: { progress: ae },
        inProgress: !1
      }), se.classList.remove("wx-progress-in-drag"), I.current = !0, ge();
    } else if (T) {
      const { id: S, mode: B, dx: se, l: ae, w: de, start: me, segment: Ce, index: Le } = T;
      if (G(null), me) {
        const Re = Math.round(se / z);
        if (!Re)
          i.exec("drag-task", {
            id: S,
            width: de,
            left: ae,
            inProgress: !1,
            ...Ce && { segmentIndex: Le }
          });
        else {
          let Ve = {}, Qe = i.getTask(S);
          Ce && (Qe = Qe.segments[Le]);
          const It = 1440 * 60 * 1e3, F = Re * (C === "week" ? 7 : C === "month" ? 30 : C === "quarter" ? 91 : C === "year" ? 365 : 1) * It;
          B === "move" ? (Ve.start = new Date(Qe.start.getTime() + F), Ve.end = new Date(Qe.end.getTime() + F)) : B === "start" ? (Ve.start = new Date(Qe.start.getTime() + F), Ve.end = Qe.end) : B === "end" && (Ve.start = Qe.start, Ve.end = new Date(Qe.end.getTime() + F)), i.exec("update-task", {
            id: S,
            task: Ve,
            ...Ce && { segmentIndex: Le }
          });
        }
        I.current = !0;
      }
      ge();
    }
  }, [i, ge, T, z, C, Y, ne, We, h]), be = E(
    (S, B) => {
      const { clientX: se, clientY: ae } = B;
      if (!e) {
        if (Y) {
          const de = K.current;
          if (!de) return;
          const me = de.getBoundingClientRect(), Ce = se - me.left, Le = ae - me.top;
          O((Re) => ({
            ...Re,
            currentX: Ce,
            currentY: Le
          }));
          return;
        }
        if (ne) {
          const de = se - ne.startX;
          ne.originalPositions.forEach((me, Ce) => {
            const Le = me.$x + de;
            i.exec("drag-task", {
              id: Ce,
              left: Le,
              width: me.$w,
              inProgress: !0
            });
          }), he((me) => ({ ...me, dx: de }));
          return;
        }
        if (te.current) {
          const { node: de, x: me, id: Ce } = te.current, Le = te.current.dx = se - me, Re = Math.round(Le / de.offsetWidth * 100);
          let Ve = te.current.progress + Re;
          te.current.value = Ve = Math.min(
            Math.max(0, Ve),
            100
          ), i.exec("update-task", {
            id: Ce,
            task: { progress: Ve },
            inProgress: !0
          });
        } else if (T) {
          Z(null);
          const { mode: de, l: me, w: Ce, x: Le, id: Re, start: Ve, segment: Qe, index: It } = T, D = i.getTask(Re), F = se - Le;
          if (!Ve && Math.abs(F) < 20 || de === "start" && Ce - F < z || de === "end" && Ce + F < z || de === "move" && (F < 0 && me + F < 0 || F > 0 && me + Ce + F > re) || T.segment)
            return;
          const ce = { ...T, dx: F };
          let Te, Fe;
          if (de === "start" ? (Te = me + F, Fe = Ce - F) : de === "end" ? (Te = me, Fe = Ce + F) : de === "move" && (Te = me + F, Fe = Ce), i.exec("drag-task", {
            id: Re,
            width: Fe,
            left: Te,
            inProgress: !0,
            ...Qe && { segmentIndex: It }
          }), !ce.start && (de === "move" && D.$x == me || de !== "move" && D.$w == Ce)) {
            I.current = !0, xe();
            return;
          }
          ce.start = !0, G(ce);
        } else {
          const de = qe(S);
          if (de) {
            const me = i.getTask($t(de)), Le = qe(S, "data-segment") || de, Re = _e(Le, B, me);
            Le.style.cursor = Re && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      e,
      T,
      z,
      re,
      _e,
      Z,
      xe,
      Y,
      ne
    ]
  ), nt = E(
    (S) => {
      be(S, S);
    },
    [be]
  ), He = E(
    (S) => {
      le ? (S.preventDefault(), be(S, S.touches[0])) : A.current && (clearTimeout(A.current), A.current = null);
    },
    [le, be]
  ), ze = E(() => {
    xe();
  }, [xe]), Be = E(() => {
    ve(null), A.current && (clearTimeout(A.current), A.current = null), xe();
  }, [xe]);
  P(() => (window.addEventListener("mouseup", ze), () => {
    window.removeEventListener("mouseup", ze);
  }), [ze]);
  const lt = E(
    (S) => {
      if (!e) {
        const B = _t(S.target);
        if (B && !S.target.classList.contains("wx-link")) {
          const se = _t(S.target, "data-segment");
          i.exec("show-editor", {
            id: B,
            ...se !== null && { segmentIndex: se }
          });
        }
      }
    },
    [i, e]
  ), L = ["e2s", "s2s", "e2e", "s2e"], X = E((S, B) => L[(S ? 1 : 0) + (B ? 0 : 2)], []), J = E(
    (S, B) => {
      const se = M.id, ae = M.start;
      return S === se ? !0 : !!c.find((de) => de.target == S && de.source == se && de.type === X(ae, B));
    },
    [M, d, X]
  ), fe = E(() => {
    M && H(null);
  }, [M]), De = E(
    (S) => {
      if (I.current) {
        I.current = !1;
        return;
      }
      const B = _t(S.target);
      if (B) {
        const se = S.target.classList;
        if (se.contains("wx-link")) {
          const ae = se.contains("wx-left");
          if (!M) {
            H({ id: B, start: ae });
            return;
          }
          M.id !== B && !J(B, ae) && i.exec("add-link", {
            link: {
              source: M.id,
              target: B,
              type: X(M.start, ae)
            }
          });
        } else if (se.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: ue.id }), Q(null);
        else {
          let ae;
          const de = qe(S, "data-segment");
          de && (ae = de.dataset.segment * 1), i.exec("select-task", {
            id: B,
            toggle: S.ctrlKey || S.metaKey,
            range: S.shiftKey,
            segmentIndex: ae
          });
        }
      }
      fe();
    },
    [
      i,
      M,
      d,
      ue,
      J,
      X,
      fe
    ]
  ), Me = E((S) => ({
    left: `${S.$x}px`,
    top: `${S.$y}px`,
    width: `${S.$w}px`,
    height: `${S.$h}px`
  }), []), Ye = E((S) => ({
    left: `${S.$x_base}px`,
    top: `${S.$y_base}px`,
    width: `${S.$w_base}px`,
    height: `${S.$h_base}px`
  }), []), Xe = E(
    (S) => {
      if (le || A.current)
        return S.preventDefault(), !1;
    },
    [le]
  ), Rt = _(
    () => p.map((S) => S.id),
    [p]
  ), ft = E(
    (S) => {
      let B = Rt.includes(S) ? S : "task";
      return ["task", "milestone", "summary"].includes(S) || (B = `task ${B}`), B;
    },
    [Rt]
  ), ln = E(
    (S) => {
      i.exec(S.action, S.data);
    },
    [i]
  ), xt = E(
    (S) => y && k.byId(S).$critical,
    [y, k]
  ), an = E(
    (S) => {
      if (v?.auto) {
        const B = k.getSummaryId(S, !0), se = k.getSummaryId(M.id, !0);
        return M?.id && !(Array.isArray(B) ? B : [B]).includes(
          M.id
        ) && !(Array.isArray(se) ? se : [se]).includes(S);
      }
      return M;
    },
    [v, k, M]
  ), cn = _(() => {
    if (!Y) return null;
    const S = Math.min(Y.startX, Y.currentX), B = Math.min(Y.startY, Y.currentY), se = Math.abs(Y.currentX - Y.startX), ae = Math.abs(Y.currentY - Y.startY);
    return {
      left: `${S}px`,
      top: `${B}px`,
      width: `${se}px`,
      height: `${ae}px`
    };
  }, [Y]);
  return /* @__PURE__ */ q(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${R.length ? R[0].$h : 0}px` },
      ref: K,
      onContextMenu: Xe,
      onMouseDown: ke,
      onMouseMove: nt,
      onTouchStart: Ne,
      onTouchMove: He,
      onTouchEnd: Be,
      onClick: De,
      onDoubleClick: lt,
      onDragStart: (S) => (S.preventDefault(), !1),
      children: [
        /* @__PURE__ */ g(
          qc,
          {
            onSelectLink: Z,
            selectedLink: ue,
            readonly: e
          }
        ),
        R.map((S) => {
          if (S.$skip && S.$skip_baseline) return null;
          const B = `wx-bar wx-${ft(S.type)}` + (le && T && S.id === T.id ? " wx-touch" : "") + (M && M.id === S.id ? " wx-selected" : "") + (Ae.has(S.id) ? " wx-selected" : "") + (xt(S.id) ? " wx-critical" : "") + (S.$reorder ? " wx-reorder-task" : "") + (N && S.segments ? " wx-split" : ""), se = "wx-link wx-left" + (M ? " wx-visible" : "") + (!M || !J(S.id, !0) && an(S.id) ? " wx-target" : "") + (M && M.id === S.id && M.start ? " wx-selected" : "") + (xt(S.id) ? " wx-critical" : ""), ae = "wx-link wx-right" + (M ? " wx-visible" : "") + (!M || !J(S.id, !1) && an(S.id) ? " wx-target" : "") + (M && M.id === S.id && !M.start ? " wx-selected" : "") + (xt(S.id) ? " wx-critical" : "");
          return /* @__PURE__ */ q(ks, { children: [
            !S.$skip && /* @__PURE__ */ q(
              "div",
              {
                className: "wx-GKbcLEGA " + B,
                style: Me(S),
                "data-tooltip-id": S.id,
                "data-id": S.id,
                tabIndex: ie === S.id ? 0 : -1,
                children: [
                  e ? null : S.id === ue?.target && ue?.type[2] === "s" ? /* @__PURE__ */ g(
                    gt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + se, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  S.type !== "milestone" ? /* @__PURE__ */ q(Ee, { children: [
                    S.progress && !(N && S.segments) ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${S.progress}%` }
                      }
                    ) }) : null,
                    !e && !(N && S.segments) ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${S.progress}% - 10px)` },
                        children: S.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ g(n, { data: S, api: i, onAction: ln }) : N && S.segments ? /* @__PURE__ */ g(Xc, { task: S, type: ft(S.type) }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: S.text || "" })
                  ] }) : /* @__PURE__ */ q(Ee, { children: [
                    /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ g(n, { data: S, api: i, onAction: ln }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-text-out", children: S.text })
                  ] }),
                  e ? null : S.id === ue?.target && ue?.type[2] === "e" ? /* @__PURE__ */ g(
                    gt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + ae, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            m && !S.$skip_baseline ? /* @__PURE__ */ g(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (S.type === "milestone" ? " wx-milestone" : ""),
                style: Ye(S)
              }
            ) : null
          ] }, S.id);
        }),
        Y && cn && /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: cn })
      ]
    }
  );
}
function Zc(t) {
  const { highlightTime: e } = t, n = ye(kt), r = ee(n, "_scales");
  return /* @__PURE__ */ g("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((s, o) => /* @__PURE__ */ g(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${s.height}px` },
      children: (s.cells || []).map((i, l) => {
        const a = e ? e(i.date, i.unit) : "", c = "wx-cell " + (i.css || "") + " " + (a || "");
        return /* @__PURE__ */ g(
          "div",
          {
            className: "wx-ZkvhDKir " + c,
            style: { width: `${i.width}px` },
            children: i.value
          },
          l
        );
      })
    },
    o
  )) });
}
const Jc = /* @__PURE__ */ new Map();
function ed(t) {
  const e = W(null), n = W(0), r = W(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, P(() => {
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
    multiTaskRows: l = !1,
    rowMapping: a = null,
    marqueeSelect: c = !1,
    scrollToCurrentWeek: d = !1,
    currentWeekColor: u = null
  } = t, f = ye(kt), [p, m] = qt(f, "_selected"), h = ee(f, "scrollTop"), x = ee(f, "cellHeight"), w = ee(f, "cellWidth"), y = ee(f, "_scales"), k = ee(f, "_markers"), v = ee(f, "_scrollTask"), N = ee(f, "zoom"), b = ee(f, "_tasks"), [$, R] = j(), z = W(null), C = W(0), I = W(!1), M = 1 + (y?.rows?.length || 0), H = _(() => {
    if (!l || !a || !b?.length) return null;
    const O = /* @__PURE__ */ new Map(), ne = /* @__PURE__ */ new Map(), he = [];
    return b.forEach((K) => {
      const oe = a.taskRows.get(K.id) ?? K.id;
      ne.has(oe) || (ne.set(oe, he.length), he.push(oe));
    }), b.forEach((K) => {
      const oe = a.taskRows.get(K.id) ?? K.id, ie = ne.get(oe) ?? 0;
      O.set(K.id, ie * x);
    }), O;
  }, [b, l, a, x]), T = _(() => {
    const O = [];
    return p && p.length && x && p.forEach((ne) => {
      const he = H?.get(ne.id) ?? ne.$y;
      O.push({ height: `${x}px`, top: `${he - 3}px` });
    }), O;
  }, [m, x, H]), G = _(
    () => Math.max($ || 0, r),
    [$, r]
  );
  P(() => {
    const O = z.current;
    O && typeof h == "number" && (O.scrollTop = h);
  }, [h]);
  const te = () => {
    ue();
  };
  function ue(O) {
    const ne = z.current;
    if (!ne) return;
    const he = {};
    he.left = ne.scrollLeft, f.exec("scroll-chart", he);
  }
  function Q() {
    const O = z.current, he = Math.ceil(($ || 0) / (x || 1)) + 1, K = Math.floor((O && O.scrollTop || 0) / (x || 1)), oe = Math.max(0, K - M), ie = K + he + M, V = oe * (x || 0);
    f.exec("render-data", {
      start: oe,
      end: ie,
      from: V
    });
  }
  P(() => {
    Q();
  }, [$, h]);
  const le = E(
    (O) => {
      if (!O) return;
      const { id: ne, mode: he } = O;
      if (he.toString().indexOf("x") < 0) return;
      const K = z.current;
      if (!K) return;
      const { clientWidth: oe } = K, ie = f.getTask(ne);
      if (ie.$x + ie.$w < K.scrollLeft)
        f.exec("scroll-chart", { left: ie.$x - (w || 0) }), K.scrollLeft = ie.$x - (w || 0);
      else if (ie.$x >= oe + K.scrollLeft) {
        const V = oe < ie.$w ? w || 0 : ie.$w;
        f.exec("scroll-chart", { left: ie.$x - oe + V }), K.scrollLeft = ie.$x - oe + V;
      }
    },
    [f, w]
  );
  P(() => {
    le(v);
  }, [v]);
  function ve(O) {
    if (N && (O.ctrlKey || O.metaKey)) {
      O.preventDefault();
      const ne = z.current, he = O.clientX - (ne ? ne.getBoundingClientRect().left : 0);
      if (C.current += O.deltaY, Math.abs(C.current) >= 150) {
        const oe = -Math.sign(C.current);
        C.current = 0, f.exec("zoom-scale", {
          dir: oe,
          offset: he
        });
      }
    }
  }
  const A = E((O) => {
    const ne = i(O.date, O.unit);
    return ne ? {
      css: ne,
      width: O.width
    } : null;
  }, [i]), re = _(() => {
    if (!y || !i || !["hour", "day", "week"].includes(y.minUnit)) return null;
    let ne = 0;
    return y.rows[y.rows.length - 1].cells.map((he) => {
      const K = A(he), oe = ne;
      return ne += he.width, K ? { ...K, left: oe } : null;
    });
  }, [y, i, A]), pe = E(
    (O) => {
      O.eventSource = "chart", f.exec("hotkey", O);
    },
    [f]
  );
  P(() => {
    const O = z.current;
    if (!O) return;
    const ne = () => R(O.clientHeight);
    ne();
    const he = new ResizeObserver(() => ne());
    return he.observe(O), () => {
      he.disconnect();
    };
  }, [z.current]);
  const Y = W(null);
  return P(() => {
    const O = z.current;
    if (O && !Y.current)
      return Y.current = Cr(O, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (ne) => pe(ne)
      }), () => {
        Y.current?.destroy(), Y.current = null;
      };
  }, []), P(() => {
    const O = z.current;
    if (!O) return;
    const ne = ve;
    return O.addEventListener("wheel", ne), () => {
      O.removeEventListener("wheel", ne);
    };
  }, [ve]), P(() => {
    if (!d || I.current || !y || !z.current || !$) return;
    const O = z.current, { clientWidth: ne } = O, he = /* @__PURE__ */ new Date(), K = y.rows[y.rows.length - 1]?.cells;
    if (!K) return;
    let oe = -1, ie = 0;
    const V = [];
    for (let _e = 0; _e < K.length; _e++) {
      const Se = K[_e];
      V.push({ left: ie, width: Se.width });
      const We = Se.date;
      if (Se.unit === "week") {
        const Ae = new Date(We);
        Ae.setDate(Ae.getDate() + 7), he >= We && he < Ae && (oe = _e);
      } else Se.unit === "day" && he.getFullYear() === We.getFullYear() && he.getMonth() === We.getMonth() && he.getDate() === We.getDate() && (oe = _e);
      ie += Se.width;
    }
    let ge = oe;
    if (oe > 0 && (ge = oe - 1), ge >= 0 && V[ge]) {
      const _e = V[ge], Se = Math.max(0, _e.left);
      O.scrollLeft = Se, f.exec("scroll-chart", { left: Se }), I.current = !0;
    }
  }, [d, y, $, f]), ed("chart"), /* @__PURE__ */ q(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: z,
      onScroll: te,
      children: [
        /* @__PURE__ */ g(Zc, { highlightTime: i, scales: y }),
        k && k.length ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${G}px` },
            children: k.map((O, ne) => /* @__PURE__ */ g(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${O.css || ""}`,
                style: { left: `${O.left}px` },
                children: /* @__PURE__ */ g("div", { className: "wx-mR7v2Xag wx-content", children: O.text })
              },
              ne
            ))
          }
        ) : null,
        /* @__PURE__ */ q(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${G}px` },
            children: [
              re ? /* @__PURE__ */ g(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: re.map(
                    (O, ne) => O ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + O.css,
                        style: {
                          width: `${O.width}px`,
                          left: `${O.left}px`
                        }
                      },
                      ne
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ g(Uc, { borders: o }),
              p && p.length ? p.map(
                (O, ne) => O.$y ? /* @__PURE__ */ g(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": O.id,
                    style: T[ne]
                  },
                  O.id
                ) : null
              ) : null,
              /* @__PURE__ */ g(
                Qc,
                {
                  readonly: e,
                  taskTemplate: s,
                  multiTaskRows: l,
                  rowMapping: a,
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
    containerWidth: l = 0,
    leftThreshold: a = 50,
    rightThreshold: c = 50
  } = t, [d, u] = Oe(t.value ?? 0), [f, p] = Oe(t.display ?? "all");
  function m(Q) {
    let le = 0;
    e == "center" ? le = n / 2 : e == "before" && (le = n);
    const ve = {
      size: [n + "px", "auto"],
      p: [Q - le + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let A in ve) ve[A] = ve[A].reverse();
    return ve;
  }
  const [h, x] = j(!1), [w, y] = j(null), k = W(0), v = W(), N = W(), b = W(f);
  P(() => {
    b.current = f;
  }, [f]), P(() => {
    w === null && d > 0 && y(d);
  }, [w, d]);
  function $(Q) {
    return r == "x" ? Q.clientX : Q.clientY;
  }
  const R = E(
    (Q) => {
      const le = v.current + $(Q) - k.current;
      u(le);
      let ve;
      le <= a ? ve = "chart" : l - le <= c ? ve = "grid" : ve = "all", b.current !== ve && (p(ve), b.current = ve), N.current && clearTimeout(N.current), N.current = setTimeout(() => s && s(le), 100);
    },
    [l, a, c, s]
  ), z = E(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", x(!1), window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", z);
  }, [R]), C = _(
    () => f !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [f, r]
  ), I = E(
    (Q) => {
      !i && (f === "grid" || f === "chart") || (k.current = $(Q), v.current = d, x(!0), document.body.style.cursor = C, document.body.style.userSelect = "none", window.addEventListener("mousemove", R), window.addEventListener("mouseup", z));
    },
    [C, R, z, d, i, f]
  );
  function M() {
    p("all"), w !== null && (u(w), s && s(w));
  }
  function H(Q) {
    if (i) {
      const le = f === "chart" ? "grid" : "chart";
      p(le), o(le);
    } else if (f === "grid" || f === "chart")
      M(), o("all");
    else {
      const le = Q === "left" ? "chart" : "grid";
      p(le), o(le);
    }
  }
  function T() {
    H("left");
  }
  function G() {
    H("right");
  }
  const te = _(() => m(d), [d, e, n, r]), ue = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${f}`,
    h ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ q(
    "div",
    {
      className: "wx-pFykzMlT " + ue,
      onMouseDown: I,
      style: { width: te.size[0], height: te.size[1], cursor: C },
      children: [
        /* @__PURE__ */ q("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: T
            }
          ) }),
          /* @__PURE__ */ g("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ g(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: G
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
    rowMapping: l = null,
    marqueeSelect: a = !1,
    scrollToCurrentWeek: c = !1,
    currentWeekColor: d = null
  } = t, u = ye(kt), f = ee(u, "_tasks"), p = ee(u, "_scales"), m = ee(u, "cellHeight"), h = ee(u, "columns"), x = ee(u, "_scrollTask"), w = ee(u, "undo"), [y, k] = j(!1);
  let [v, N] = j(0);
  const [b, $] = j(0), [R, z] = j(0), [C, I] = j(void 0), [M, H] = j("all"), T = W(null), G = E(
    (V) => {
      k((ge) => (V !== ge && (V ? (T.current = M, M === "all" && H("grid")) : (!T.current || T.current === "all") && H("all")), V));
    },
    [M]
  );
  P(() => {
    const V = Ao(G);
    return V.observe(), () => {
      V.disconnect();
    };
  }, [G]);
  const te = _(() => {
    let V;
    return h.every((ge) => ge.width && !ge.flexgrow) ? V = h.reduce((ge, _e) => ge + parseInt(_e.width), 0) : y && M === "chart" ? V = parseInt(h.find((ge) => ge.id === "action")?.width) || 50 : V = 440, v = V, V;
  }, [h, y, M]);
  P(() => {
    N(te);
  }, [te]);
  const ue = _(
    () => (b ?? 0) - (C ?? 0),
    [b, C]
  ), Q = _(() => p.width, [p]), le = _(() => {
    if (!i || !l)
      return f.length * m;
    const V = /* @__PURE__ */ new Set();
    return f.forEach((ge) => {
      const _e = l.taskRows.get(ge.id) ?? ge.id;
      V.add(_e);
    }), V.size * m;
  }, [f, m, i, l]), ve = _(
    () => p.height + le + ue,
    [p, le, ue]
  ), A = _(
    () => v + Q,
    [v, Q]
  ), re = W(null), pe = E(() => {
    Promise.resolve().then(() => {
      if ((b ?? 0) > (A ?? 0)) {
        const V = (b ?? 0) - v;
        u.exec("expand-scale", { minWidth: V });
      }
    });
  }, [b, A, v, u]);
  P(() => {
    let V;
    return re.current && (V = new ResizeObserver(pe), V.observe(re.current)), () => {
      V && V.disconnect();
    };
  }, [re.current, pe]), P(() => {
    pe();
  }, [Q]);
  const Y = W(null), O = W(null), ne = E(() => {
    const V = Y.current;
    V && u.exec("scroll-chart", {
      top: V.scrollTop
    });
  }, [u]), he = W({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  P(() => {
    he.current = {
      rTasks: f,
      rScales: p,
      rCellHeight: m,
      scrollSize: ue,
      ganttDiv: Y.current,
      ganttHeight: R ?? 0
    };
  }, [f, p, m, ue, R]);
  const K = E(
    (V) => {
      if (!V) return;
      const {
        rTasks: ge,
        rScales: _e,
        rCellHeight: Se,
        scrollSize: We,
        ganttDiv: Ae,
        ganttHeight: Pe
      } = he.current;
      if (!Ae) return;
      const { id: U } = V, ke = ge.findIndex((Ne) => Ne.id === U);
      if (ke > -1) {
        const Ne = Pe - _e.height, Z = ke * Se, xe = Ae.scrollTop;
        let be = null;
        Z < xe ? be = Z : Z + Se > xe + Ne && (be = Z - Ne + Se + We), be !== null && (u.exec("scroll-chart", { top: Math.max(be, 0) }), Y.current.scrollTop = Math.max(be, 0));
      }
    },
    [u]
  );
  P(() => {
    K(x);
  }, [x]), P(() => {
    const V = Y.current, ge = O.current;
    if (!V || !ge) return;
    const _e = () => {
      Oo(() => {
        z(V.offsetHeight), $(V.offsetWidth), I(ge.offsetWidth);
      });
    }, Se = new ResizeObserver(_e);
    return Se.observe(V), () => Se.disconnect();
  }, [Y.current]);
  const oe = W(null), ie = W(null);
  return P(() => {
    ie.current && (ie.current.destroy(), ie.current = null);
    const V = oe.current;
    if (V)
      return ie.current = Cr(V, {
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
          "ctrl+z": w,
          "ctrl+y": w,
          "meta+z": w,
          "meta+shift+z": w
        },
        exec: (ge) => {
          ge.isInput || u.exec("hotkey", ge);
        }
      }), () => {
        ie.current?.destroy(), ie.current = null;
      };
  }, [w]), /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-gantt", ref: Y, onScroll: ne, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ve, width: "100%" },
      ref: O,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: R,
            width: C
          },
          children: /* @__PURE__ */ q("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: oe, children: [
            h.length ? /* @__PURE__ */ q(Ee, { children: [
              /* @__PURE__ */ g(
                Bc,
                {
                  display: M,
                  compactMode: y,
                  columnWidth: te,
                  width: v,
                  readonly: n,
                  fullHeight: le,
                  onTableAPIChange: o,
                  multiTaskRows: i,
                  rowMapping: l
                }
              ),
              /* @__PURE__ */ g(
                nd,
                {
                  value: v,
                  display: M,
                  compactMode: y,
                  containerWidth: b,
                  onMove: (V) => N(V),
                  onDisplayChange: (V) => H(V)
                }
              )
            ] }) : null,
            /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-content", ref: re, children: /* @__PURE__ */ g(
              td,
              {
                readonly: n,
                fullWidth: Q,
                fullHeight: le,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                multiTaskRows: i,
                rowMapping: l,
                marqueeSelect: a,
                scrollToCurrentWeek: c,
                currentWeekColor: d
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
  return typeof t == "function" ? t : pt(t, e);
}
function Ho(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: id(n, e)
  }));
}
function ld(t, e) {
  const n = od(e);
  for (let r in n)
    n[r] = pt(n[r], t);
  return n;
}
function ad(t, e) {
  if (!t || !t.length) return t;
  const n = pt("%d-%m-%Y", e);
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
], fd = Dt(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = wo,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: l = [],
  scales: a = ud,
  columns: c = co,
  start: d = null,
  end: u = null,
  lengthUnit: f = "day",
  durationUnit: p = "day",
  cellWidth: m = 100,
  cellHeight: h = 38,
  scaleHeight: x = 36,
  readonly: w = !1,
  cellBorders: y = "full",
  zoom: k = !1,
  baselines: v = !1,
  highlightTime: N = null,
  init: b = null,
  autoScale: $ = !0,
  unscheduledTasks: R = !1,
  criticalPath: z = null,
  schedule: C = { type: "forward" },
  projectStart: I = null,
  projectEnd: M = null,
  calendar: H = null,
  undo: T = !1,
  splitTasks: G = !1,
  multiTaskRows: te = !1,
  marqueeSelect: ue = !1,
  currentWeekHighlight: Q = !1,
  currentWeekColor: le = null,
  scrollToCurrentWeek: ve = !1,
  ...A
}, re) {
  const pe = W();
  pe.current = A;
  const Y = _(() => new ta(Cs), []), O = _(() => ({ ...tn, ...Rn }), []), ne = ye(tt.i18n), he = _(() => ne ? ne.extend(O, !0) : Et(O), [ne, O]), K = _(() => he.getRaw().calendar, [he]), oe = _(() => {
    let Z = {
      zoom: cd(k, K),
      scales: Ho(a, K),
      columns: ad(c, K),
      links: lo(l),
      cellWidth: m
    };
    return Z.zoom && (Z = {
      ...Z,
      ...Pl(
        Z.zoom,
        ld(K, he.getGroup("gantt")),
        Z.scales,
        m
      )
    }), Z;
  }, [k, a, c, l, m, K, he]), ie = W(null);
  ie.current !== s && (sr(s, { durationUnit: p, calendar: H }), ie.current = s), P(() => {
    sr(s, { durationUnit: p, calendar: H });
  }, [s, p, H, G]);
  const V = _(() => {
    if (!te) return null;
    const Z = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map(), be = (nt) => {
      nt.forEach((He) => {
        const ze = He.row ?? He.id;
        xe.set(He.id, ze), Z.has(ze) || Z.set(ze, []), Z.get(ze).push(He.id), He.data && He.data.length > 0 && be(He.data);
      });
    };
    return be(s), { rowMap: Z, taskRows: xe };
  }, [s, te]), ge = _(() => Y.in, [Y]), _e = W(null);
  _e.current === null && (_e.current = new Is((Z, xe) => {
    const be = "on" + dd(Z);
    pe.current && pe.current[be] && pe.current[be](xe);
  }), ge.setNext(_e.current));
  const [Se, We] = j(null), Ae = W(null);
  Ae.current = Se;
  const Pe = _(
    () => ({
      getState: Y.getState.bind(Y),
      getReactiveState: Y.getReactive.bind(Y),
      getStores: () => ({ data: Y }),
      exec: ge.exec,
      setNext: (Z) => (_e.current = _e.current.setNext(Z), _e.current),
      intercept: ge.intercept.bind(ge),
      on: ge.on.bind(ge),
      detach: ge.detach.bind(ge),
      getTask: Y.getTask.bind(Y),
      serialize: Y.serialize.bind(Y),
      getTable: (Z) => Z ? new Promise((xe) => setTimeout(() => xe(Ae.current), 1)) : Ae.current,
      getHistory: () => Y.getHistory()
    }),
    [Y, ge]
  );
  Mt(
    re,
    () => ({
      ...Pe
    }),
    [Pe]
  );
  const U = W(0);
  P(() => {
    U.current ? Y.init({
      tasks: s,
      links: oe.links,
      start: d,
      columns: oe.columns,
      end: u,
      lengthUnit: f,
      cellWidth: oe.cellWidth,
      cellHeight: h,
      scaleHeight: x,
      scales: oe.scales,
      taskTypes: r,
      zoom: oe.zoom,
      selected: o,
      activeTask: i,
      baselines: v,
      autoScale: $,
      unscheduledTasks: R,
      markers: n,
      durationUnit: p,
      criticalPath: z,
      schedule: C,
      projectStart: I,
      projectEnd: M,
      calendar: H,
      undo: T,
      _weekStart: K.weekStart,
      splitTasks: G
    }) : b && b(Pe), U.current++;
  }, [
    Pe,
    b,
    s,
    oe,
    d,
    u,
    f,
    h,
    x,
    r,
    o,
    i,
    v,
    $,
    R,
    n,
    p,
    z,
    C,
    I,
    M,
    H,
    T,
    K,
    G,
    Y
  ]), U.current === 0 && Y.init({
    tasks: s,
    links: oe.links,
    start: d,
    columns: oe.columns,
    end: u,
    lengthUnit: f,
    cellWidth: oe.cellWidth,
    cellHeight: h,
    scaleHeight: x,
    scales: oe.scales,
    taskTypes: r,
    zoom: oe.zoom,
    selected: o,
    activeTask: i,
    baselines: v,
    autoScale: $,
    unscheduledTasks: R,
    markers: n,
    durationUnit: p,
    criticalPath: z,
    schedule: C,
    projectStart: I,
    projectEnd: M,
    calendar: H,
    undo: T,
    _weekStart: K.weekStart,
    splitTasks: G
  });
  const ke = _(() => {
    const Z = /* @__PURE__ */ new Date(), xe = K?.weekStart ?? 0, be = new Date(Z), He = (be.getDay() - xe + 7) % 7;
    be.setDate(be.getDate() - He), be.setHours(0, 0, 0, 0);
    const ze = new Date(be);
    return ze.setDate(ze.getDate() + 7), (Be) => Be >= be && Be < ze;
  }, [K]), Ne = _(() => (Z, xe) => {
    let be = [];
    if (H)
      xe == "day" && !H.getDayHours(Z) && be.push("wx-weekend"), xe == "hour" && !H.getDayHours(Z) && be.push("wx-weekend");
    else if (N) {
      const nt = N(Z, xe);
      nt && be.push(nt);
    }
    return Q && (xe === "week" || xe === "day") && ke(Z) && be.push("wx-current-week"), be.join(" ");
  }, [H, N, Q, ke]);
  return /* @__PURE__ */ g(tt.i18n.Provider, { value: he, children: /* @__PURE__ */ g(kt.Provider, { value: Pe, children: /* @__PURE__ */ g(
    sd,
    {
      taskTemplate: e,
      readonly: w,
      cellBorders: y,
      highlightTime: Ne,
      onTableAPIChange: We,
      multiTaskRows: te,
      rowMapping: V,
      marqueeSelect: ue,
      scrollToCurrentWeek: ve,
      currentWeekColor: le
    }
  ) }) });
});
function hd({ api: t = null, items: e = [] }) {
  const n = ye(tt.i18n), r = _(() => n || Et(Rn), [n]), s = _(() => r.getGroup("gantt"), [r]), o = ht(t, "_selected"), i = ht(t, "undo"), l = ht(t, "history"), a = ht(t, "splitTasks"), c = ["undo", "redo"], d = _(() => {
    const f = ir();
    return (e.length ? e : ir()).map((m) => {
      let h = { ...m, disabled: !1 };
      return h.handler = $r(f, h.id) ? (x) => Lt(t, x.id, null, s) : h.handler, h.text && (h.text = s(h.text)), h.menuText && (h.menuText = s(h.menuText)), h;
    });
  }, [e, t, s, i, a]), u = _(() => {
    const f = [];
    return d.forEach((p) => {
      const m = p.id;
      if (m === "add-task")
        f.push(p);
      else if (c.includes(m))
        c.includes(m) && f.push({
          ...p,
          disabled: p.isDisabled(l)
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
  }, [t, o, l, d]);
  return n ? /* @__PURE__ */ g(ar, { items: u }) : /* @__PURE__ */ g(tt.i18n.Provider, { value: r, children: /* @__PURE__ */ g(ar, { items: u }) });
}
const pd = Dt(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: l,
  css: a
}, c) {
  const d = W(null), u = W(null), f = ye(tt.i18n), p = _(() => f || Et({ ...Rn, ...tn }), [f]), m = _(() => p.getGroup("gantt"), [p]), h = ht(n, "taskTypes"), x = ht(n, "selected"), w = ht(n, "_selected"), y = ht(n, "splitTasks"), k = _(() => or(), []);
  P(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function v(H) {
    return H.map((T) => (T = { ...T }, T.text && (T.text = m(T.text)), T.subtext && (T.subtext = m(T.subtext)), T.data && (T.data = v(T.data)), T));
  }
  function N() {
    const H = e.length ? e : or(), T = H.find((G) => G.id === "convert-task");
    return T && (T.data = [], (h || []).forEach((G) => {
      T.data.push(T.dataFactory(G));
    })), v(H);
  }
  const b = _(() => N(), [n, e, h, y, m]), $ = _(
    () => w && w.length ? w : [],
    [w]
  ), R = E(
    (H, T) => {
      let G = H ? n?.getTask(H) : null;
      if (r) {
        const te = r(H, T);
        G = te === !0 ? G : te;
      }
      if (G) {
        const te = _t(T.target, "data-segment");
        te !== null ? u.current = { id: G.id, segmentIndex: te } : u.current = G.id, (!Array.isArray(x) || !x.includes(G.id)) && n && n.exec && n.exec("select-task", { id: G.id });
      }
      return G;
    },
    [n, r, x]
  ), z = E(
    (H) => {
      const T = H.action;
      T && ($r(k, T.id) && Lt(n, T.id, u.current, m), l && l(H));
    },
    [n, m, l, k]
  ), C = E(
    (H, T) => {
      const G = $.length ? $ : T ? [T] : [];
      let te = s ? G.every((ue) => s(H, ue)) : !0;
      if (te && (H.isHidden && (te = !G.some(
        (ue) => H.isHidden(ue, n.getState(), u.current)
      )), H.isDisabled)) {
        const ue = G.some(
          (Q) => H.isDisabled(Q, n.getState(), u.current)
        );
        H.disabled = ue;
      }
      return te;
    },
    [s, $, n]
  );
  Mt(c, () => ({
    show: (H, T) => {
      d.current && d.current.show && d.current.show(H, T);
    }
  }));
  const I = E((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), M = /* @__PURE__ */ q(Ee, { children: [
    /* @__PURE__ */ g(
      No,
      {
        filter: C,
        options: b,
        dataKey: "id",
        resolver: R,
        onClick: z,
        at: o,
        ref: d,
        css: a
      }
    ),
    /* @__PURE__ */ g("span", { onContextMenu: I, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!f && tt.i18n?.Provider) {
    const H = tt.i18n.Provider;
    return /* @__PURE__ */ g(H, { value: p, children: M });
  }
  return M;
}), dr = {};
function xs(t) {
  return typeof t < "u" ? dr[t] || t : dr.text;
}
function it(t, e) {
  dr[t] = e;
}
const gd = {
  editor: {}
};
function Kn(t) {
  const {
    editors: e,
    data: n,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: i,
    children: l,
    onChange: a
  } = t, c = W(null);
  P(() => {
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
  const d = ye(tt.i18n), u = _(() => d.getGroup("editor"), [d]), f = _(
    () => e.config[0].comp === "readonly" && e.config.every((p) => !Object.keys(n).includes(p.key)),
    [e, n]
  );
  return /* @__PURE__ */ q("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    l,
    f ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((p) => {
      if (!p.hidden) {
        const { key: m, onChange: h, ...x } = p;
        if (p.comp === "readonly" || p.comp === "section") {
          const w = xs(p.comp);
          return /* @__PURE__ */ g(
            w,
            {
              fieldKey: m,
              label: p.label,
              value: n[m],
              ...x,
              onClick: i
            },
            m
          );
        } else {
          const w = xs(p.comp);
          return /* @__PURE__ */ q("div", { children: [
            /* @__PURE__ */ g(
              Qt,
              {
                label: p.labelTemplate ? p.labelTemplate(n[m]) : p.label ?? "",
                required: p.required,
                children: /* @__PURE__ */ g(
                  w,
                  {
                    fieldKey: m,
                    ...x,
                    onChange: h || ((y) => {
                      a && a({
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
    const l = { ...i };
    return i.config && Object.assign(l, i.config), l.key = i.key || Oi(), l.setter = i.setter || wd(i.key), l.getter = i.getter || md(i.key), l;
  }), n = (i) => {
    const l = {};
    return e.forEach((a) => {
      a.comp !== "section" && (a.getter ? l[a.key] = a.getter(i) : l[a.key] = i[a.key]);
    }), l;
  }, r = (i, l, a) => ((a.length ? a.map((c) => e.find((d) => d.key === c)) : e).forEach((c) => {
    c.setter ? c.setter(i, l[c.key]) : i[c.key] = l[c.key];
  }), i), s = (i, l) => {
    const a = n(i), c = [];
    return e.forEach((d) => {
      const u = a[d.key], f = l[d.key];
      !In(u, f) && (u !== void 0 || f) && c.push(d.key);
    }), c;
  }, o = (i, l, a) => {
    let c = 0;
    const d = {};
    return (l?.length ? l.map((u) => e.find((f) => f.key === u)) : e).forEach((u) => {
      u.required && !i[u.key] ? (d[u.key] = {
        errorType: "required"
      }, u.validationMessage = u.validationMessage ?? a("This field is required"), c++) : u.validation && !u.validation(i[u.key]) && (d[u.key] = {
        errorType: "validation"
      }, u.validationMessage = u.validationMessage ?? a("Invalid value"), c++);
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
  topBar: l = !0,
  bottomBar: a = !0,
  layout: c = "default",
  placement: d = "inline",
  view: u,
  children: f,
  onChange: p,
  onSave: m,
  onAction: h,
  onValidation: x,
  hotkeys: w
}) {
  const y = ye(tt.i18n).getGroup("editor"), [k, v] = Oe(t), [N, b] = j(null), $ = _(() => {
    const A = xd(e);
    N && A.config.forEach((Y) => {
      Y.comp === "section" && Y.key === N && (Y.sectionMode === "accordion" ? Y.activeSection || (A.config.forEach((O) => {
        O.comp === "section" && O.key !== Y.key && (O.activeSection = !1);
      }), Y.activeSection = !0) : Y.activeSection = !Y.activeSection);
    });
    let re = /* @__PURE__ */ new Set(), pe = null;
    return A.config.forEach((Y) => {
      Y.sectionMode === "exclusive" && Y.activeSection && (pe = Y.key), Y.activeSection && re.add(Y.key);
    }), A.config.forEach((Y) => {
      Y.hidden = Y.hidden || r && r !== Y.batch || pe && Y.key != pe && Y.section !== pe || Y.section && !re.has(Y.section);
    }), i ? {
      ...A,
      config: A.config.map((Y) => ({ ...Y, comp: "readonly" })),
      diff: () => []
    } : A;
  }, [e, N, r, i]), [R, z] = j({}), [C, I] = j({}), M = k;
  P(() => {
    k !== void 0 && (z(Sn(k)), I(Sn(k)), M.errors && (M.errors = te()));
  }, [k]);
  const [H, T] = j([]);
  P(() => {
    k && T([]);
  }, [k]);
  function G(A) {
    return [...new Set(A)];
  }
  function te(A) {
    const re = $.validateValues(R, A, y);
    return In(re, M.errors) || x && x({ errors: re, values: R }), re;
  }
  function ue(A, re) {
    if (s && !M.errors) {
      const pe = $.setValues(k, re ?? C, A);
      v(pe), m && m({ changes: A, values: pe });
    } else
      T(A);
  }
  function Q({ value: A, key: re, input: pe }) {
    let Y = { ...C || {}, [re]: A };
    const O = {
      key: re,
      value: A,
      update: Y
    };
    if (pe && (O.input = pe), p && p(O), !k) return;
    Y = O.update, I(Y);
    const ne = $.diff(k, Y), he = $.setValues(
      { ...R || {} },
      Y,
      G([...ne, re])
    );
    if (z(he), ne.length) {
      const K = s ? [] : G([...ne, ...Object.keys(M.errors ?? {}), re]);
      M.errors = te(K), ue(ne, Y);
    } else {
      const K = Object.keys(M.errors ?? {});
      K.length && (M.errors = te(K)), T([]);
    }
  }
  function le() {
    if (H.length && (s || (M.errors = te()), !M.errors)) {
      m && m({
        changes: H,
        values: R
      });
      const A = $.setValues(k, C, H);
      v(A), T([]), v({ ...R });
    }
  }
  function ve({ item: A }) {
    A.id === "save" ? le() : A.id === "toggle-section" && b(A.key), h && h({ item: A, values: R, changes: H });
  }
  return /* @__PURE__ */ g(
    u,
    {
      topBar: l,
      bottomBar: a,
      placement: d,
      layout: c,
      readonly: i,
      autoSave: s,
      css: n,
      data: C,
      editors: $,
      focus: o,
      hotkeys: w,
      errors: M.errors,
      onClick: ve,
      onKeyDown: ve,
      onChange: Q,
      children: f
    }
  );
}
function vd(t) {
  const { editors: e, data: n, layout: r, errors: s, focus: o, onClick: i, onChange: l } = t, a = _(() => {
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
  return r === "columns" ? /* @__PURE__ */ q("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ g(
      Kn,
      {
        editors: a[0],
        data: n,
        errors: s,
        onClick: i,
        onChange: l
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ g(
      Kn,
      {
        editors: a[1],
        data: n,
        focus: o,
        errors: s,
        onClick: i,
        onChange: l
      }
    ) })
  ] }) : /* @__PURE__ */ g(
    Kn,
    {
      editors: e,
      data: n,
      focus: o,
      errors: s,
      onClick: i,
      onChange: l
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
  const o = E(
    ({ item: i, value: l }) => {
      s && s({ key: i.key, value: l });
    },
    [s]
  );
  return t.length ? /* @__PURE__ */ g(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ g(
        ar,
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
    layout: l,
    placement: a,
    errors: c,
    readonly: d,
    autoSave: u,
    children: f,
    onClick: p,
    onKeyDown: m,
    onChange: h,
    hotkeys: x
  } = t, w = ye(tt.i18n), y = _(() => w.getGroup("editor"), [w]), k = _(
    () => o === !0 && i === !0,
    [o, i]
  ), v = _(() => {
    let C = o && o.items ? o.items.map((I) => ({ ...I })) : [];
    return k && (d ? C = [Bt(), vs()] : (u ? C = [Bt(), vs()] : a !== "modal" && (C = [Bt(), Bn(y), Un(y)]), l === "columns" && !C.length && (C = [Bt(), Un(y), Bn(y)]))), C;
  }, [o, k, d, u, a, l, y]), N = _(() => {
    let C = i && i.items ? i.items.map((I) => ({ ...I })) : [];
    return k && (d || (a === "modal" && !u && (C = [Bt(), Un(y), Bn(y)]), l === "columns" && v.length && (C = []))), C;
  }, [i, k, d, a, u, l, v, y]), b = _(() => [...v, ...N], [v, N]), $ = W(null), R = W(null);
  R.current = (C, ...I) => {
    const M = b.findIndex((G) => I.includes(G.id));
    if (M === -1) return !1;
    const H = C.target, T = b[M];
    C.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || C.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (C.preventDefault(), m && m({ item: T }));
  };
  const z = _(() => x === !1 ? {} : {
    "ctrl+s": (C) => R.current(C, "save"),
    escape: (C) => R.current(C, "cancel", "close"),
    "ctrl+d": (C) => R.current(C, "delete"),
    ...x || {}
  }, [x]);
  return ni(z, $), /* @__PURE__ */ q("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: $, children: [
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
    /* @__PURE__ */ q(
      "div",
      {
        className: `wx-85HDaNoA wx-content${l === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          f,
          /* @__PURE__ */ g(
            vd,
            {
              editors: n,
              layout: l,
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
              items: N,
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
    focus: l = !1,
    autoSave: a = !1,
    layout: c = "default",
    readonly: d = !1,
    placement: u = "inline",
    children: f,
    ...p
  } = t, m = Object.keys(p).reduce((h, x) => {
    if (/^on[a-z]/.test(x)) {
      const w = "on" + x.charAt(2).toUpperCase() + x.slice(3);
      w in p ? h[x] = p[x] : h[w] = p[x];
    } else
      h[x] = p[x];
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
      focus: l,
      autoSave: a,
      layout: c,
      readonly: d,
      placement: u,
      ...m,
      children: f
    }
  ) });
}
function Sd({ value: t, options: e, label: n }) {
  const r = ye(tt.i18n).getGroup("editor"), s = _(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((l) => l.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(Qt, { label: n, children: s }) : null;
}
function $d({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ q(
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
it("text", sn);
it("textarea", ci);
it("checkbox", di);
it("readonly", Sd);
it("section", $d);
ur(et);
function _d({ api: t, autoSave: e, onLinksChange: n }) {
  const s = ye(tt.i18n).getGroup("gantt"), o = ee(t, "activeTask"), i = ee(t, "_activeTask"), l = ee(t, "_links"), a = ee(t, "schedule"), c = ee(t, "unscheduledTasks"), [d, u] = j();
  function f() {
    if (o) {
      const x = l.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), w = l.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: x },
        { title: s("Successors"), data: w }
      ];
    }
  }
  P(() => {
    u(f());
  }, [o, l]);
  const p = _(
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
        data: y.data.filter((k) => k.link.id !== x)
      }))
    ), n && n({
      id: x,
      action: "delete-link",
      data: { id: x }
    }));
  }
  function h(x, w) {
    e ? t.exec("update-link", {
      id: x,
      link: w
    }) : (u(
      (y) => (y || []).map((k) => ({
        ...k,
        data: k.data.map(
          (v) => v.link.id === x ? { ...v, link: { ...v.link, ...w } } : v
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
  return /* @__PURE__ */ g(Ee, { children: (d || []).map(
    (x, w) => x.data.length ? /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ g(Qt, { label: x.title, position: "top", children: /* @__PURE__ */ g("table", { children: /* @__PURE__ */ g("tbody", { children: x.data.map((y) => /* @__PURE__ */ q("tr", { children: [
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      a?.auto && y.link.type === "e2s" ? /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ g(
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
    ] }, y.link.id)) }) }) }) }, w) : null
  ) });
}
function Cd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, l = o ?? s;
  function a(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), l && l({ value: d });
  }
  return /* @__PURE__ */ q("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ g(
      Ti,
      {
        ...i,
        value: e,
        onChange: a,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ g(Ai, { value: e, onChange: l, format: r }) : null
  ] });
}
it("select", Ds);
it("date", Cd);
it("twostate", Ms);
it("slider", Zn);
it("counter", Di);
it("links", _d);
function Nd({
  api: t,
  items: e = [],
  css: n = "",
  layout: r = "default",
  readonly: s = !1,
  placement: o = "sidebar",
  bottomBar: i = !0,
  topBar: l = !0,
  autoSave: a = !0,
  focus: c = !1,
  hotkeys: d = {}
}) {
  const u = ye(tt.i18n), f = _(() => u || Et({ ...Rn, ...tn }), [u]), p = _(() => f.getGroup("gantt"), [f]), m = f.getRaw(), h = _(() => {
    const U = m.gantt?.dateFormat || m.formats?.dateFormat;
    return pt(U, m.calendar);
  }, [m]), x = _(() => {
    if (l === !0 && !s) {
      const U = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: p("Delete"),
          id: "delete"
        }
      ];
      return a ? { items: U } : {
        items: [
          ...U,
          {
            comp: "button",
            type: "primary",
            text: p("Save"),
            id: "save"
          }
        ]
      };
    }
    return l;
  }, [l, s, a, p]), [w, y] = j(!1), k = _(
    () => w ? "wx-full-screen" : "",
    [w]
  ), v = E((U) => {
    y(U);
  }, []);
  P(() => {
    const U = Ao(v);
    return U.observe(), () => {
      U.disconnect();
    };
  }, [v]);
  const N = ee(t, "_activeTask"), b = ee(t, "activeTask"), $ = ee(t, "unscheduledTasks"), R = ee(t, "links"), z = ee(t, "splitTasks"), C = _(
    () => z && b?.segmentIndex,
    [z, b]
  ), I = _(
    () => C || C === 0,
    [C]
  ), M = _(
    () => go(),
    [$]
  ), H = ee(t, "undo"), [T, G] = j({}), [te, ue] = j(null), [Q, le] = j(), [ve, A] = j(null), re = ee(t, "taskTypes"), pe = _(() => {
    if (!N) return null;
    let U;
    if (I && N.segments ? U = { ...N.segments[C] } : U = { ...N }, s) {
      let ke = { parent: U.parent };
      return M.forEach(({ key: Ne, comp: Z }) => {
        if (Z !== "links") {
          const xe = U[Ne];
          Z === "date" && xe instanceof Date ? ke[Ne] = h(xe) : Z === "slider" && Ne === "progress" ? ke[Ne] = `${xe}%` : ke[Ne] = xe;
        }
      }), ke;
    }
    return U || null;
  }, [N, I, C, s, M, h]);
  P(() => {
    le(pe);
  }, [pe]), P(() => {
    G({}), A(null), ue(null);
  }, [b]);
  function Y(U, ke) {
    return U.map((Ne) => {
      const Z = { ...Ne };
      if (Ne.config && (Z.config = { ...Z.config }), Z.comp === "links" && t && (Z.api = t, Z.autoSave = a, Z.onLinksChange = he), Z.comp === "select" && Z.key === "type") {
        const xe = Z.options ?? (re || []);
        Z.options = xe.map((be) => ({
          ...be,
          label: p(be.label)
        }));
      }
      return Z.comp === "slider" && Z.key === "progress" && (Z.labelTemplate = (xe) => `${p(Z.label)} ${xe}%`), Z.label && (Z.label = p(Z.label)), Z.config?.placeholder && (Z.config.placeholder = p(Z.config.placeholder)), ke && (Z.isDisabled && Z.isDisabled(ke, t.getState()) ? Z.disabled = !0 : delete Z.disabled), Z;
    });
  }
  const O = _(() => {
    let U = e.length ? e : M;
    return U = Y(U, Q), Q ? U.filter(
      (ke) => !ke.isHidden || !ke.isHidden(Q, t.getState())
    ) : U;
  }, [e, M, Q, re, p, t, a]), ne = _(
    () => O.map((U) => U.key),
    [O]
  );
  function he({ id: U, action: ke, data: Ne }) {
    G((Z) => ({
      ...Z,
      [U]: { action: ke, data: Ne }
    }));
  }
  const K = E(() => {
    for (let U in T)
      if (R.byId(U)) {
        const { action: ke, data: Ne } = T[U];
        t.exec(ke, Ne);
      }
  }, [t, T, R]), oe = E(() => {
    const U = b?.id || b;
    if (I) {
      if (N?.segments) {
        const ke = N.segments.filter(
          (Ne, Z) => Z !== C
        );
        t.exec("update-task", {
          id: U,
          task: { segments: ke }
        });
      }
    } else
      t.exec("delete-task", { id: U });
  }, [t, b, I, N, C]), ie = E(() => {
    t.exec("show-editor", { id: null });
  }, [t]), V = E(
    (U) => {
      const { item: ke, changes: Ne } = U;
      ke.id === "delete" && oe(), ke.id === "save" && (Ne.length ? ie() : K()), ke.comp && ie();
    },
    [t, b, a, K, oe, ie]
  ), ge = E(
    (U, ke, Ne) => ($ && U.type === "summary" && (U.unscheduled = !1), fo(U, t.getState(), ke), Ne || ue(!1), U),
    [$, t]
  ), _e = E(
    (U) => {
      U = {
        ...U,
        unscheduled: $ && U.unscheduled && U.type !== "summary"
      }, delete U.links, delete U.data, (ne.indexOf("duration") === -1 || U.segments && !U.duration) && delete U.duration;
      const ke = {
        id: b?.id || b,
        task: U,
        ...I && { segmentIndex: C }
      };
      a && te && (ke.inProgress = te), t.exec("update-task", ke), a || K();
    },
    [
      t,
      b,
      $,
      a,
      K,
      ne,
      I,
      C,
      te
    ]
  ), Se = E(
    (U) => {
      let { update: ke, key: Ne, input: Z } = U;
      if (Z && ue(!0), U.update = ge({ ...ke }, Ne, Z), !a) le(U.update);
      else if (!ve && !Z) {
        const xe = O.find((He) => He.key === Ne), be = ke[Ne];
        (!xe.validation || xe.validation(be)) && (!xe.required || be) && _e(U.update);
      }
    },
    [a, ge, ve, O, _e]
  ), We = E(
    (U) => {
      a || _e(U.values);
    },
    [a, _e]
  ), Ae = E((U) => {
    A(U.errors);
  }, []), Pe = _(
    () => H ? {
      "ctrl+z": (U) => {
        U.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (U) => {
        U.preventDefault(), t.exec("redo");
      }
    } : {},
    [H, t]
  );
  return pe ? /* @__PURE__ */ g(En, { children: /* @__PURE__ */ g(
    bd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${k} ${n}`,
      items: O,
      values: pe,
      topBar: x,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: a,
      focus: c,
      onAction: V,
      onSave: We,
      onValidation: Ae,
      onChange: Se,
      hotkeys: d && { ...Pe, ...d }
    }
  ) }) : null;
}
const Td = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = j(null);
  return P(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ g(jc, { api: r, columns: e, children: t });
};
function Dd(t) {
  const { api: e, content: n, children: r } = t, s = W(null), o = W(null), [i, l] = j({}), [a, c] = j(null), [d, u] = j({});
  function f(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const N = v.getAttribute("data-tooltip-id"), b = v.getAttribute("data-tooltip-at"), $ = v.getAttribute("data-tooltip");
        if (N || $) return { id: N, tooltip: $, target: v, at: b };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  P(() => {
    const v = o.current;
    if (v && d && (d.text || n)) {
      const N = v.getBoundingClientRect();
      let b = !1, $ = d.left, R = d.top;
      N.right >= i.right && ($ = i.width - N.width - 5, b = !0), N.bottom >= i.bottom && (R = d.top - (N.bottom - i.bottom + 2), b = !0), b && u((z) => z && { ...z, left: $, top: R });
    }
  }, [d, i, n]);
  const p = W(null), m = 300, h = (v) => {
    clearTimeout(p.current), p.current = setTimeout(() => {
      v();
    }, m);
  };
  function x(v) {
    let { id: N, tooltip: b, target: $, at: R } = f(v.target);
    if (u(null), c(null), !b)
      if (N)
        b = y(N);
      else {
        clearTimeout(p.current);
        return;
      }
    const z = v.clientX;
    h(() => {
      N && c(w(k(N)));
      const C = $.getBoundingClientRect(), I = s.current, M = I ? I.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, T;
      R === "left" ? (H = C.top + 5 - M.top, T = C.right + 5 - M.left) : (H = C.top + C.height - M.top, T = z - M.left), l(M), u({ top: H, left: T, text: b });
    });
  }
  function w(v) {
    return e?.getTask(k(v)) || null;
  }
  function y(v) {
    return w(v)?.text || "";
  }
  function k(v) {
    const N = parseInt(v);
    return isNaN(N) ? v : N;
  }
  return /* @__PURE__ */ q(
    "div",
    {
      className: "wx-KG0Lwsqo wx-tooltip-area",
      ref: s,
      onMouseMove: x,
      children: [
        d && (d.text || n) ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-KG0Lwsqo wx-gantt-tooltip",
            ref: o,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: n ? /* @__PURE__ */ g(n, { data: a }) : d.text ? /* @__PURE__ */ g("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        r
      ]
    }
  );
}
function Md({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Vr, { fonts: t, children: e() }) : /* @__PURE__ */ g(Vr, { fonts: t });
}
function Ed({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Gr, { fonts: t, children: e }) : /* @__PURE__ */ g(Gr, { fonts: t });
}
function Rd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(jr, { fonts: t, children: e }) : /* @__PURE__ */ g(jr, { fonts: t });
}
const Pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: pd,
  Editor: Nd,
  Gantt: fd,
  HeaderMenu: Td,
  Material: Md,
  Toolbar: hd,
  Tooltip: Dd,
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
  registerEditorItem: it,
  registerScaleUnit: zl
}, Symbol.toStringTag, { value: "Module" }));
export {
  Pd as default
};
