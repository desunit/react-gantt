import { jsx as g, jsxs as j, Fragment as Ce } from "react/jsx-runtime";
import zo, { useState as G, useEffect as Y, useRef as F, createContext as Pt, useContext as xe, useMemo as _, useCallback as R, forwardRef as Dt, useImperativeHandle as Mt, useId as Fo, Fragment as ks } from "react";
import { createPortal as Oo, flushSync as Wo } from "react-dom";
function qe(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function qn(t, e = "data-id") {
  const n = qe(t, e);
  return n ? n.getAttribute(e) : null;
}
function _t(t, e = "data-id") {
  const n = qe(t, e);
  return n ? Vt(n.getAttribute(e)) : null;
}
function Vt(t) {
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
var Je = Po();
function ur(t) {
  Object.assign(Je, t);
}
function Mr(t, e, n) {
  function r(s) {
    const o = qe(s);
    if (!o) return;
    const i = Vt(o.dataset.id);
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
  Je.addEvent(t, n, r);
}
function bs(t, e) {
  Mr(t, e, "click"), e.dblclick && Mr(t, e.dblclick, "dblclick");
}
function Vo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Ss = /* @__PURE__ */ new Date(), kn = !1, un = [], Ct = [], Er = (t) => {
  if (kn) {
    kn = !1;
    return;
  }
  for (let e = Ct.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = Ct[e];
    if (!(r > Ss) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Yo = (t) => {
  Ss = /* @__PURE__ */ new Date(), kn = !0;
  for (let e = Ct.length - 1; e >= 0; e--) {
    const { node: n } = Ct[e];
    if (!n.contains(t.target) && n !== t.target) {
      kn = !1;
      break;
    }
  }
};
function tn(t, e) {
  un.length || (un = [
    Je.addGlobalEvent("click", Er, t),
    Je.addGlobalEvent("contextmenu", Er, t),
    Je.addGlobalEvent("mousedown", Yo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return Ct.push(n), {
    destroy() {
      Vo(Ct, n), Ct.length || (un.forEach((r) => r()), un = []);
    }
  };
}
var fn = (t) => t.indexOf("bottom") !== -1, hn = (t) => t.indexOf("left") !== -1, pn = (t) => t.indexOf("right") !== -1, Fn = (t) => t.indexOf("top") !== -1, Rr = (t) => t.indexOf("fit") !== -1, gn = (t) => t.indexOf("overlap") !== -1, Go = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Ko = (t) => {
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
var Ge, Qe, Ut, Xe;
function Bo(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ge = r, Qe = s, Ut = "auto";
  let o = 0, i = 0;
  const l = Uo(t), a = gn(n) ? Je.getTopNode(t) : l;
  if (!l) return null;
  const c = l.getBoundingClientRect(), d = t.getBoundingClientRect(), u = a.getBoundingClientRect(), h = window.getComputedStyle(a), p = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
  for (const k in p) {
    const v = `border-${k}-width`;
    p[k] = parseFloat(h.getPropertyValue(v));
  }
  if (e) {
    const k = jo(e, l);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (Xe = e.getBoundingClientRect(), Rr(n) && (Ut = Xe.width + "px"), n !== "point")
      if (Go(n))
        Rr(n) ? Ge = 0 : (Ge = u.width / 2, i = 1), Qe = (u.height - d.height) / 2;
      else {
        const k = gn(n) ? 0 : 1;
        Ge = pn(n) ? Xe.right + k : Xe.left - k, Qe = fn(n) ? Xe.bottom + 1 : Xe.top;
        const v = Ko(n);
        v && (pn(n) || hn(n) ? v === "center" ? Qe -= (d.height - Xe.height) / 2 : v === "end" && (Qe -= d.height - Xe.height) : (fn(n) || Fn(n)) && (v === "center" ? Ge -= (d.width - Xe.width) / 2 : v === "end" && (Ge -= d.width - Xe.width), gn(n) || (Ge += 1)));
      }
  } else Xe = { left: r, right: r, top: s, bottom: s };
  const m = (hn(n) || pn(n)) && (fn(n) || Fn(n));
  hn(n) && (i = 2);
  const f = Ge - d.width - u.left;
  e && hn(n) && !m && f < 0 && (Ge = Xe.right, i = 0);
  const w = Ge + d.width * (1 - i / 2) - u.right;
  if (w > 0)
    if (!pn(n))
      Ge = u.right - p.right - d.width;
    else {
      const k = Xe.left - u.x - d.width;
      e && !gn(n) && !m && k >= 0 ? Ge = Xe.left - d.width : Ge -= w + p.right;
    }
  i && (Ge = Math.round(Ge - d.width * i / 2));
  const x = f < 0 || w > 0 || !m;
  Fn(n) && (Qe = Xe.top - d.height, e && Qe < u.y && x && (Qe = Xe.bottom));
  const y = Qe + d.height - u.bottom;
  return y > 0 && (e && fn(n) && x ? Qe -= d.height + Xe.height + 1 : Qe -= y + p.bottom), Ge -= c.left + p.left, Qe -= c.top + p.top, Ge = Math.max(Ge, 0) + a.scrollLeft, Qe = Math.max(Qe, 0) + a.scrollTop, Ut = Ut || "auto", { x: Ge, y: Qe, z: o, width: Ut };
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
var Xo = class {
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
}, Ft = [], Ar = {
  subscribe: (t) => {
    qo();
    const e = new Xo();
    return Ft.push(e), t(e), () => {
      const n = Ft.findIndex((r) => r === e);
      n >= 0 && Ft.splice(n, 1);
    };
  }
}, Hr = !1;
function qo() {
  Hr || (Hr = !0, document.addEventListener("keydown", (t) => {
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
function pt(t, e) {
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
function Ie(t) {
  const [e, n] = G(t), r = F(t);
  return Y(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ei(t, e, n) {
  const [r, s] = G(() => e);
  return t || console.warn(`Writable ${n} is not defined`), Y(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function Q(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ei(r[e], n[e], e);
}
function ht(t, e) {
  const [n, r] = G(() => null);
  return Y(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((l) => r(() => l)) : void 0;
  }, [t, e]), n;
}
function ti(t, e) {
  const n = F(e);
  n.current = e;
  const [r, s] = G(1);
  return Y(() => t.subscribe((i) => {
    n.current = i, s((l) => l + 1);
  }), [t]), [n.current, r];
}
function bn(t, e) {
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
function Or(t, e, n) {
  function r(s) {
    const o = qe(s);
    if (!o) return;
    const i = Vt(o.dataset.id);
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
}, li = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, nn = {
  core: ii,
  calendar: oi,
  formats: li,
  lang: si
}, rn = Pt("willow"), ai = Pt({}), ot = Pt(null), pr = Pt(null), et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: pr,
  helpers: ai,
  i18n: ot,
  theme: rn
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
  onChange: l
}) {
  const a = Yt(e), [c, d] = Ie(t), u = R(
    (m) => {
      const f = m.target.value;
      d(f), l && l({ value: f, input: !0 });
    },
    [l]
  ), h = R(
    (m) => {
      const f = m.target.value;
      d(f), l && l({ value: f });
    },
    [l]
  ), p = F(null);
  return Y(() => {
    const m = h, f = p.current;
    return f.addEventListener("change", m), () => {
      f && f.removeEventListener("change", m);
    };
  }, [h]), /* @__PURE__ */ g(
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
  return /* @__PURE__ */ j(
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
  const i = Fo(), l = Yt(t) || i, [a, c] = Ie(r);
  return /* @__PURE__ */ j("div", { className: "wx-2IvefP wx-checkbox", children: [
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
    /* @__PURE__ */ j("label", { htmlFor: l, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ g("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Gt({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const i = F(null), [l, a] = Ie(t), [c, d] = Ie(e);
  return Y(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), p = Je.getTopNode(u).getBoundingClientRect();
        h.right >= p.right && d("end"), h.bottom >= p.bottom && a("top");
      }
    }
  }, [n]), Y(() => {
    if (i.current) {
      const u = (h) => {
        r && r(h);
      };
      return tn(i.current, u).destroy;
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
function sn() {
  return Et(nn);
}
function ui() {
  let t = null, e = !1, n, r, s, o;
  const i = (d, u, h, p) => {
    n = d, r = u, s = h, o = p;
  }, l = (d) => {
    t = d, e = t !== null, s(t);
  }, a = (d, u) => {
    if (d !== null && n) {
      const h = n.querySelectorAll(".wx-list > .wx-item")[d];
      h && (h.scrollIntoView({ block: "nearest" }), u && u.preventDefault());
    }
  }, c = (d, u) => {
    const h = d === null ? null : Math.max(0, Math.min(t + d, r.length - 1));
    h !== t && (l(h), n ? a(h, u) : requestAnimationFrame(() => a(h, u)));
  };
  return { move: (d) => {
    const u = _t(d), h = r.findIndex((p) => p.id == u);
    h !== t && l(h);
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
  const s = F(), o = F(ui()), [i, l] = G(null), a = F(i), c = (xe(ot) || sn()).getGroup("core"), d = (h) => {
    h && h.stopPropagation(), n && n({ id: t[a.current]?.id });
  };
  Y(() => {
    o.current.init(
      s.current,
      t,
      (h) => {
        l(h), a.current = h;
      },
      d
    );
  }, [t, s.current]), Y(() => {
    r && r(o.current);
  }, []);
  const u = R(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null ? null : /* @__PURE__ */ g(Gt, { onCancel: u, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: d,
      onMouseMove: o.current.move,
      children: t.length ? t.map((h, p) => /* @__PURE__ */ g(
        "div",
        {
          className: `wx-233fr7 wx-item ${p === i ? "wx-focus" : ""}`,
          "data-id": h.id,
          children: e ? hr(e, { option: h }) : h.label
        },
        h.id
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
  const h = Yt(e), p = F(null), m = F(null), [f, w] = Ie(t), [x, y] = G(!1), [k, v] = G(""), N = F(null), S = F(!1), C = _(() => {
    if (x) return k;
    if (f || f === 0) {
      const U = (r || n).find((L) => L.id === f);
      if (U) return U[s];
    }
    return "";
  }, [x, k, f, r, n, s]), M = _(() => !C || !x ? n : n.filter(
    (U) => U[s].toLowerCase().includes(C.toLowerCase())
  ), [C, x, n, s]), O = R(
    () => M.findIndex((U) => U.id === f),
    [M, f]
  ), b = R((U) => {
    p.current = U.navigate, m.current = U.keydown;
  }, []), I = R(
    (U, L) => {
      if (U || U === 0) {
        let Z = n.find((D) => D.id === U);
        if (y(!1), L && p.current(null), Z && f !== Z.id) {
          const D = Z.id;
          w(D), u && u({ value: D });
        }
      }
      !S.current && L && N.current.focus();
    },
    [n, f, u]
  ), A = R(
    ({ id: U }) => {
      I(U, !0);
    },
    [I]
  ), H = R(
    (U) => {
      U && U.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), T = R(
    (U) => {
      if (!n.length) return;
      if (U === "" && c) {
        H();
        return;
      }
      let L = n.find((D) => D[s] === U);
      L || (L = n.find(
        (D) => D[s].toLowerCase().includes(U.toLowerCase())
      ));
      const Z = L ? L.id : f || n[0].id;
      I(Z, !1);
    },
    [n, s, c, f, I, H]
  ), V = R(() => {
    v(N.current.value), y(!0), M.length ? p.current(0) : p.current(null);
  }, [M.length, p]), ne = R(() => {
    S.current = !0;
  }, []), le = R(() => {
    S.current = !1, setTimeout(() => {
      S.current || T(C);
    }, 200);
  }, [T, C]);
  return /* @__PURE__ */ j(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => p.current(O()),
      onKeyDown: (U) => m.current(U, O()),
      title: i,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (a ? "wx-error" : ""),
            id: h,
            ref: N,
            value: C,
            disabled: l,
            placeholder: o,
            onFocus: ne,
            onBlur: le,
            onInput: V
          }
        ),
        c && !l && f ? /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ g("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !l && /* @__PURE__ */ g(Mn, { items: M, onReady: b, onSelect: A, children: ({ option: U }) => /* @__PURE__ */ g(Ce, { children: d ? d({ option: U }) : U[s] }) })
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
  disabled: l = !1,
  error: a = !1,
  inputStyle: c = {},
  title: d = "",
  css: u = "",
  icon: h = "",
  clear: p = !1,
  onChange: m
}) {
  const f = Yt(e), [w, x] = Ie(t), y = F(null), k = _(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), v = _(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  Y(() => {
    const O = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(O);
  }, [r, s]);
  const N = R(
    (O) => {
      const b = O.target.value;
      x(b), m && m({ value: b, input: !0 });
    },
    [m]
  ), S = R(
    (O) => m && m({ value: O.target.value }),
    [m]
  );
  function C(O) {
    O.stopPropagation(), x(""), m && m({ value: "" });
  }
  let M = o;
  return o !== "password" && o !== "number" && (M = "text"), Y(() => {
    const O = S, b = y.current;
    return b.addEventListener("change", O), () => {
      b && b.removeEventListener("change", O);
    };
  }, [S]), /* @__PURE__ */ j(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${k} ${a ? "wx-error" : ""} ${l ? "wx-disabled" : ""} ${p ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            className: "wx-hQ64J4 wx-input",
            ref: y,
            id: f,
            readOnly: n,
            disabled: l,
            placeholder: i,
            type: M,
            style: c,
            title: d,
            value: w,
            onInput: N
          }
        ),
        p && !l && w ? /* @__PURE__ */ j(Ce, { children: [
          /* @__PURE__ */ g("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: C }),
          v && /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ g("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function hi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = xe(ot).getRaw(), i = t.getFullYear(), l = _(() => {
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
  return /* @__PURE__ */ j("div", { className: "wx-8HQVQV wx-header", children: [
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
  const i = (xe(ot) || sn()).getRaw().calendar, l = (i.weekStart || 7) % 7, a = i.dayShort.slice(l).concat(i.dayShort.slice(0, l)), c = (v, N, S) => new Date(
    v.getFullYear(),
    v.getMonth() + (N || 0),
    v.getDate() + (S || 0)
  );
  let d = n !== "normal";
  function u(v) {
    const N = v.getDay();
    return N === 0 || N === 6;
  }
  function h() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - (v.getDay() - (l - 7)) % 7), v;
  }
  function p() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + (6 - v.getDay() + l) % 7), v;
  }
  const m = F(0);
  function f(v, N) {
    N.timeStamp !== m.current && (m.current = N.timeStamp, N.stopPropagation(), o && o(new Date(new Date(v))), s && s());
  }
  const w = _(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = _(() => {
    const v = h(), N = p(), S = e.getMonth();
    let C = [];
    for (let M = v; M <= N; M.setDate(M.getDate() + 1)) {
      const O = {
        day: M.getDate(),
        in: M.getMonth() === S,
        date: M.valueOf()
      };
      let b = "";
      if (b += O.in ? "" : " wx-inactive", b += w.indexOf(O.date) > -1 ? " wx-selected" : "", d) {
        const I = O.date == w[0], A = O.date == w[1];
        I && !A ? b += " wx-left" : A && !I && (b += " wx-right"), O.date > w[0] && O.date < w[1] && (b += " wx-inrange");
      }
      if (b += u(M) ? " wx-weekend" : "", r) {
        const I = r(M);
        I && (b += " " + I);
      }
      C.push({ ...O, css: b });
    }
    return C;
  }, [e, w, d, r]), y = F(null);
  let k = F({});
  return k.current.click = f, Y(() => {
    bs(y.current, k.current);
  }, []), /* @__PURE__ */ j("div", { children: [
    /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekdays", children: a.map((v) => /* @__PURE__ */ g("div", { className: "wx-398RBS wx-weekday", children: v }, v)) }),
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
  const [i, l] = Ie(t || /* @__PURE__ */ new Date()), [a, c] = Ie(e || /* @__PURE__ */ new Date()), d = xe(ot).getRaw().calendar, u = d.monthShort || [], h = _(() => a.getMonth(), [a]), p = R(
    (w, x) => {
      if (w != null) {
        x.stopPropagation();
        const y = new Date(a);
        y.setMonth(w), c(y), o && o({ current: y });
      }
      n === "normal" && l(new Date(a)), r && r();
    },
    [a, n, o, r]
  ), m = R(() => {
    const w = new Date(Ns(i, n) || a);
    w.setMonth(a.getMonth()), w.setFullYear(a.getFullYear()), s && s(w);
  }, [i, a, n, s]), f = R(
    (w) => {
      const x = w.target.closest("[data-id]");
      if (x) {
        const y = parseInt(x.getAttribute("data-id"), 10);
        p(y, w);
      }
    },
    [p]
  );
  return /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-months", onClick: f, children: u.map((w, x) => /* @__PURE__ */ g(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ g("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ g(gr, { onClick: m, children: d.done }) })
  ] });
}
const On = "wx-1XEF33", mi = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = xe(ot).getRaw().calendar, [l, a] = Ie(e), [c, d] = Ie(t), u = _(() => l.getFullYear(), [l]), h = _(() => {
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
      const k = new Date(l);
      k.setFullYear(x), a(k), s && s({ current: k });
    }
    o === "normal" && d(new Date(l)), n && n();
  }
  function f() {
    const x = new Date(Ns(c, o) || l);
    x.setFullYear(l.getFullYear()), r && r(x);
  }
  const w = F(null);
  return Y(() => {
    w.current && bs(w.current, p);
  }, []), /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g("div", { className: On + " wx-years", ref: w, children: h.map((x, y) => /* @__PURE__ */ g(
      "div",
      {
        className: On + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ g("div", { className: On + " wx-buttons", children: /* @__PURE__ */ g(gr, { onClick: f, children: i.done }) })
  ] });
}, Wr = {
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
  const a = xe(ot).getGroup("calendar"), [c, d] = G("month"), u = Array.isArray(o) ? o : o ? Si : [], h = (x, y) => {
    x.preventDefault(), l && l({ value: y });
  }, p = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (x) => {
    const { diff: y, current: k } = x;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const v = Wr[c];
      n(y > 0 ? v.next(e) : v.prev(e));
    } else k && n(k);
    i && i();
  }, f = (x) => {
    d("month"), l && l({ select: !0, value: x });
  }, w = _(() => Wr[c].component, [c]);
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ j("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ g(hi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ j("div", { children: [
          /* @__PURE__ */ g(
            w,
            {
              value: t,
              current: e,
              onCurrentChange: n,
              part: r,
              markers: s,
              onCancel: p,
              onChange: f,
              onShift: m
            }
          ),
          c === "month" && u.length > 0 && /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((x) => /* @__PURE__ */ g("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ g(
            gr,
            {
              onClick: (y) => h(y, $i(x)),
              children: a(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function En(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = xe(ot);
  const o = _(() => {
    let i = s;
    return (!i || !i.extend) && (i = Et(nn)), e !== null && (i = i.extend(e, n)), i;
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
  const [o, i] = Ie(t), [l, a] = Ie(e);
  Y(() => {
    Pr(l, o, a, !1);
  }, [o, l]);
  const c = R(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), Pr(l, new Date(h), a, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, l]
  ), d = R(
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
  clear: h = !1,
  onChange: p
}) {
  const { calendar: m, formats: f } = (xe(ot) || sn()).getRaw(), w = l || f?.dateFormat;
  let x = typeof w == "function" ? w : pt(w, m);
  const [y, k] = G(t), [v, N] = G(!1);
  Y(() => {
    k(t);
  }, [t]);
  function S() {
    N(!1);
  }
  function C(b) {
    const I = b === y || b && y && b.valueOf() === y.valueOf() || !b && !y;
    k(b), I || p && p({ value: b }), setTimeout(S, 1);
  }
  const M = _(
    () => y ? x(y) : "",
    [y, x]
  );
  function O({ value: b, input: I }) {
    if (!u && !h || I) return;
    let A = typeof u == "function" ? u(b) : b ? new Date(b) : null;
    A = isNaN(A) ? y || null : A || null, C(A);
  }
  return Y(() => {
    const b = S;
    return window.addEventListener("scroll", b), () => window.removeEventListener("scroll", b);
  }, []), /* @__PURE__ */ j("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => N(!0), children: [
    /* @__PURE__ */ g(
      on,
      {
        css: c,
        title: d,
        value: M,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: S,
        onChange: O,
        icon: "wxi-calendar",
        inputStyle: {
          cursor: "pointer",
          width: "100%",
          paddingRight: "calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)"
        },
        clear: h
      }
    ),
    v && !n && /* @__PURE__ */ g(
      Gt,
      {
        onCancel: S,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ g(
          Ts,
          {
            buttons: a,
            value: y,
            onChange: (b) => C(b.value)
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
  const u = F(null), h = F(null);
  let [p, m] = Ie(t);
  function f(v) {
    u.current = v.navigate, h.current = v.keydown;
  }
  const w = _(() => p || p === 0 ? (n || e).find((v) => v.id === p) : null, [p, n, e]), x = R(
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
  return /* @__PURE__ */ j(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: i,
      onClick: () => u.current(k()),
      onKeyDown: (v) => h.current(v, k()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ g("div", { className: "wx-2YgblL wx-label", children: w ? c ? c(w) : w[l] : r ? /* @__PURE__ */ g("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        a && !s && p ? /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ g("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ g(Mn, { items: e, onReady: f, onSelect: x, children: ({ option: v }) => c ? c(v) : v[l] })
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
  const d = Yt(t), [u, h] = Ie(o), p = F({ value: u, input: u }), m = _(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), f = _(() => a ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [a, m]);
  function w({ target: k }) {
    const v = k.value * 1;
    h(v), c && c({
      value: v,
      previous: p.current.input,
      input: !0
    }), p.current.input = v;
  }
  function x({ target: k }) {
    const v = k.value * 1;
    h(v), c && c({ value: v, previous: p.current.value }), p.current.value = v;
  }
  Y(() => {
    h(o);
  }, [o]);
  const y = F(null);
  return Y(() => {
    if (y.current)
      return y.current.addEventListener("change", x), () => {
        y.current && y.current.removeEventListener("change", x);
      };
  }, [y, x]), /* @__PURE__ */ j("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: l, children: [
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
        onInput: w,
        style: { background: f },
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
  const c = Yt(t), [d, u] = Ie(e), h = R(() => {
    if (l || d <= r) return;
    const w = d - n;
    u(w), a && a({ value: w });
  }, [d, l, r, n, a]), p = R(() => {
    if (l || d >= s) return;
    const w = d + n;
    u(w), a && a({ value: w });
  }, [d, l, s, n, a]), m = R(() => {
    if (!l) {
      const w = Math.round(Math.min(s, Math.max(d, r)) / n) * n, x = isNaN(w) ? Math.max(r, 0) : w;
      u(x), a && a({ value: x });
    }
  }, [l, d, s, r, n, a]), f = R(
    (w) => {
      const x = w.target.value * 1;
      u(x), a && a({ value: x, input: !0 });
    },
    [a]
  );
  return /* @__PURE__ */ j(
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
            onClick: h,
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
            onInput: f
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
  return /* @__PURE__ */ j(
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
  const l = (xe(ot) || sn()).getGroup("core"), a = F(null);
  Y(() => {
    a.current?.focus();
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
    const p = { event: u, button: h };
    h === "cancel" ? i && i(p) : o && o(p);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-1FxkZa wx-modal",
      ref: a,
      tabIndex: 0,
      onKeyDown: c,
      children: /* @__PURE__ */ j("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ g("div", { children: r }),
        s || e && /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ g("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ g(
          gt,
          {
            type: `block ${u === "ok" ? "primary" : "secondary"}`,
            onClick: (h) => d(h, u),
            children: l(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Ii({ children: t }, e) {
  const [n, r] = G(null), [s, o] = G([]);
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
  ), /* @__PURE__ */ j(Ce, { children: [
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
function Zt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const l = _(() => fr(), []);
  return /* @__PURE__ */ g(pr.Provider, { value: l, children: /* @__PURE__ */ j(
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
  onChange: h
}) => {
  const [p, m] = Ie(t), f = _(() => (p ? "pressed" : "") + (e ? " " + e : ""), [p, e]), w = R(
    (x) => {
      let y = !p;
      o && o(x), x.defaultPrevented || (m(y), h && h({ value: y }));
    },
    [p, o, h]
  );
  return p && u ? /* @__PURE__ */ g(
    gt,
    {
      title: i,
      text: p && c || a,
      css: l,
      type: f,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: hr(u, { value: p })
    }
  ) : d ? /* @__PURE__ */ g(
    gt,
    {
      title: i,
      text: p && c || a,
      css: l,
      type: f,
      icon: p && s || n,
      onClick: w,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ g(
    gt,
    {
      title: i,
      text: p && c || a,
      css: l,
      type: f,
      icon: p && s || n,
      onClick: w,
      disabled: r
    }
  );
}, Vr = new Date(0, 0, 0, 0, 0);
function Ai({
  value: t = Vr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: l
}) {
  let [a, c] = Ie(t);
  const { calendar: d, formats: u } = (xe(ot) || sn()).getRaw(), h = d.clockFormat == 12, p = 23, m = 59, f = _(() => {
    const D = i || u?.timeFormat;
    return typeof D == "function" ? D : pt(D, d);
  }, [i, u, d]), w = _(() => f(new Date(0, 0, 0, 1)).indexOf("01") != -1, [f]), x = (D, W) => (D < 10 && W ? `0${D}` : `${D}`).slice(-2), y = (D) => x(D, !0), k = (D) => `${D}`.replace(/[^\d]/g, "") || 0, v = (D) => h && (D = D % 12, D === 0) ? "12" : x(D, w), N = R((D, W) => (D = k(D), Math.min(D, W)), []), [S, C] = G(null), M = a || Vr, O = N(M.getHours(), p), b = N(M.getMinutes(), m), I = O > 12, A = v(O), H = y(b), T = _(
    () => f(new Date(0, 0, 0, O, b)),
    [O, b, f]
  ), V = R(() => {
    C(!0);
  }, []), ne = R(() => {
    const D = new Date(M);
    D.setHours(D.getHours() + (I ? -12 : 12)), c(D), l && l({ value: D });
  }, [M, I, l]), le = R(
    ({ value: D }) => {
      if (M.getHours() === D) return;
      const W = new Date(M);
      W.setHours(D), c(W), l && l({ value: W });
    },
    [M, l]
  ), U = R(
    ({ value: D }) => {
      if (M.getMinutes() === D) return;
      const W = new Date(M);
      W.setMinutes(D), c(W), l && l({ value: W });
    },
    [M, l]
  ), L = R(
    (D) => (D = N(D, p), h && (D = D * 1, D === 12 && (D = 0), I && (D += 12)), D),
    [N, h, I]
  ), Z = R(() => {
    C(null);
  }, []);
  return /* @__PURE__ */ j(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : V,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ g(
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
        S && !s && /* @__PURE__ */ g(Gt, { onCancel: Z, width: "unset", children: /* @__PURE__ */ j("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ j("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: A,
                onChange: (D) => {
                  const W = L(D.target.value);
                  le({ value: W });
                }
              }
            ),
            /* @__PURE__ */ g("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ g(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: H,
                onChange: (D) => {
                  const W = N(D.target.value, m);
                  U({ value: W });
                }
              }
            ),
            h && /* @__PURE__ */ g(
              Ms,
              {
                value: I,
                onClick: ne,
                active: () => /* @__PURE__ */ g("span", { children: "pm" }),
                children: /* @__PURE__ */ g("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ g(Zt, { width: "unset", children: /* @__PURE__ */ g(
            Zn,
            {
              label: d.hours,
              value: O,
              onChange: le,
              max: p
            }
          ) }),
          /* @__PURE__ */ g(Zt, { width: "unset", children: /* @__PURE__ */ g(
            Zn,
            {
              label: d.minutes,
              value: b,
              onChange: U,
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
  return Y(() => tn(r.current, n).destroy, []), /* @__PURE__ */ g("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Es({ theme: t = "", target: e, children: n }) {
  const r = F(null), s = F(null), [o, i] = G(null);
  r.current || (r.current = document.createElement("div"));
  const l = xe(rn);
  return Y(() => {
    i(
      e || zi(s.current) || Je.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Oo(
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
  const e = Je.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Fi() {
  return /* @__PURE__ */ g(Ce, {});
}
function Yr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(rn.Provider, { value: "material", children: /* @__PURE__ */ j(Ce, { children: [
    n && /* @__PURE__ */ g("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ j(Ce, { children: [
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
  return /* @__PURE__ */ g(rn.Provider, { value: "willow", children: /* @__PURE__ */ j(Ce, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ j(Ce, { children: [
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
  return /* @__PURE__ */ g(rn.Provider, { value: "willow-dark", children: /* @__PURE__ */ j(Ce, { children: [
    n && n && /* @__PURE__ */ g("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ j(Ce, { children: [
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
var Oi = (/* @__PURE__ */ new Date()).valueOf(), Wi = () => Oi++;
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
}, As = (/* @__PURE__ */ new Date()).valueOf(), Vi = () => As++;
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
    e = { id: Vi(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, Yi = class {
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
    const n = this.byId(e), r = this.byId(n.parent), s = mn(r, n.id) + 1;
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
    const r = this._pool.get(n.parent), s = mn(r, n.id);
    n = { ...n, ...e }, r && s >= 0 && (r.data[s] = n, r.data = [...r.data]), this._pool.set(n.id, n);
  }
  move(t, e, n) {
    const r = this._pool.get(t), s = e === "child", o = this._pool.get(n), i = o.$level + (s ? 1 : 0);
    if (!r || !o) return;
    const l = this._pool.get(r.parent), a = s ? o : this._pool.get(o.parent);
    a.data || (a.data = []);
    const c = mn(l, r.id);
    Gi(l, c);
    const d = s ? a.data.length : mn(a, o.id) + (e === "after" ? 1 : 0);
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
function mn(t, e) {
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
}, ji = class {
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
function Xi(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function qi({ key: t, order: e }) {
  const n = e === "asc" ? Ui : Xi;
  return (r, s) => n(r[t], s[t]);
}
function Qi(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => qi(n));
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
class Ji extends Yi {
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
    return n && Fs(n, e), e;
  }
}
function Fs(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Fs(n.data, e);
  });
}
function ve(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function wt(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function An(t, e) {
  const n = ve(t);
  return isNaN(e) ? wt(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function wr(t, e) {
  const n = ve(t);
  if (isNaN(e)) return wt(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = wt(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Os(t, e) {
  const n = +ve(t);
  return wt(t, n + e);
}
const Ws = 6048e5, el = 864e5, Ps = 6e4, Vs = 36e5;
function tl(t, e) {
  return Os(t, e * Vs);
}
let nl = {};
function Ys() {
  return nl;
}
function $n(t, e) {
  const n = Ys(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = ve(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Jt(t) {
  return $n(t, { weekStartsOn: 1 });
}
function rl(t) {
  const e = ve(t), n = e.getFullYear(), r = wt(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Jt(r), o = wt(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Jt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function Nt(t) {
  const e = ve(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = ve(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Gs(t, e) {
  const n = Nt(t), r = Nt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / el);
}
function Ur(t) {
  const e = rl(t), n = wt(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Jt(n);
}
function sl(t, e) {
  return Os(t, e * Ps);
}
function ol(t, e) {
  const n = e * 3;
  return wr(t, n);
}
function Ks(t, e) {
  const n = e * 7;
  return An(t, n);
}
function il(t, e) {
  return wr(t, e * 12);
}
function Qt(t, e) {
  const n = ve(t), r = ve(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ll(t, e) {
  const n = Nt(t), r = Nt(e);
  return +n == +r;
}
function xr(t, e) {
  const n = Jt(t), r = Jt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / Ws);
}
function al(t, e) {
  const n = ve(t), r = ve(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function cl(t, e) {
  const n = ve(t), r = ve(e);
  return n.getFullYear() - r.getFullYear();
}
function yr(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function js(t, e) {
  return +ve(t) - +ve(e);
}
function dl(t, e, n) {
  const r = js(t, e) / Vs;
  return yr(n?.roundingMethod)(r);
}
function ul(t, e, n) {
  const r = js(t, e) / Ps;
  return yr(n?.roundingMethod)(r);
}
function Bs(t) {
  const e = ve(t);
  return e.setHours(23, 59, 59, 999), e;
}
function vr(t) {
  const e = ve(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function fl(t) {
  const e = ve(t);
  return +Bs(e) == +vr(e);
}
function Us(t, e) {
  const n = ve(t), r = ve(e), s = Qt(n, r), o = Math.abs(al(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let l = Qt(n, r) === -s;
    fl(ve(t)) && o === 1 && Qt(t, r) === 1 && (l = !1), i = s * (o - Number(l));
  }
  return i === 0 ? 0 : i;
}
function hl(t, e, n) {
  const r = Us(t, e) / 3;
  return yr(n?.roundingMethod)(r);
}
function pl(t, e) {
  const n = ve(t), r = ve(e), s = Qt(n, r), o = Math.abs(cl(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Qt(n, r) === -s, l = s * (o - +i);
  return l === 0 ? 0 : l;
}
function en(t) {
  const e = ve(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function Xs(t) {
  const e = ve(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function gl(t) {
  const e = ve(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ml(t) {
  const e = ve(t), n = wt(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function wl(t) {
  const e = ve(t);
  return e.setMinutes(59, 59, 999), e;
}
function xl(t, e) {
  const n = Ys(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = ve(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function kr(t) {
  const e = ve(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function qs(t) {
  const e = ve(t), n = e.getFullYear(), r = e.getMonth(), s = wt(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function yl(t) {
  const e = ve(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Qs(t) {
  const e = ve(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : yl(e) ? 366 : 365;
}
function vl(t) {
  const e = Ur(t), n = +Ur(Ks(e, 60)) - +e;
  return Math.round(n / Ws);
}
function Lt(t, e) {
  const n = ve(t), r = ve(e);
  return +n == +r;
}
function kl(t) {
  const e = ve(t);
  return e.setMinutes(0, 0, 0), e;
}
function bl(t, e, n) {
  const r = $n(t, n), s = $n(e, n);
  return +r == +s;
}
function Sl(t, e) {
  const n = ve(t), r = ve(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function $l(t, e) {
  const n = en(t), r = en(e);
  return +n == +r;
}
function _l(t, e) {
  const n = ve(t), r = ve(e);
  return n.getFullYear() === r.getFullYear();
}
const Jn = { year: pl, quarter: hl, month: Us, week: xr, day: Gs, hour: dl, minute: ul }, xt = { year: { quarter: 4, month: 12, week: vl, day: Cl, hour: Nl }, quarter: { month: 3, week: Tl, day: Zs, hour: Dl }, month: { week: Ml, day: El, hour: Rl }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Cl(t) {
  return t ? Qs(t) : 365;
}
function Nl(t) {
  return Qs(t) * 24;
}
function Tl(t) {
  const e = en(t), n = An(Nt(kr(t)), 1);
  return xr(n, e);
}
function Zs(t) {
  if (t) {
    const e = en(t), n = kr(t);
    return Gs(n, e) + 1;
  }
  return 91;
}
function Dl(t) {
  return Zs(t) * 24;
}
function Ml(t) {
  if (t) {
    const e = Xs(t), n = An(Nt(vr(t)), 1);
    return xr(n, e);
  }
  return 5;
}
function El(t) {
  return t ? qs(t) : 30;
}
function Rl(t) {
  return qs(t) * 24;
}
function Cn(t, e, n) {
  const r = xt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Il(t, e) {
  return t === e || !!(xt[t] && xt[t][e]);
}
const Nn = { year: il, quarter: ol, month: wr, week: Ks, day: An, hour: tl, minute: sl };
function br(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !xt[t][o] || typeof xt[t][o] == "number" || to(t, r, s, n) ? qt(t, r, s, o, i, n) : Al(r, s, t, o, i, n);
}
function qt(t, e, n, r, s, o) {
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
    i = qt(n, c, e, r, void 0, o), e = c;
  }
  let a = 0;
  return to(n, e, t, o) || (a = qt(n, mt(n, t, o), e, void 0, void 0, o), e = Nn[n](e, a)), a += i + qt(n, t, e, r, void 0, o), !a && s && (a = qt(n, t, e, r, s, o)), a;
}
function ut(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Nn[t];
}
const Js = { year: ml, quarter: en, month: Xs, week: (t, e) => $n(t, { weekStartsOn: e }), day: Nt, hour: kl };
function mt(t, e, n) {
  const r = Js[t];
  return r ? r(e, n) : new Date(e);
}
const Hl = { year: gl, quarter: kr, month: vr, week: (t, e) => xl(t, { weekStartsOn: e }), day: Bs, hour: wl }, eo = { year: _l, quarter: $l, month: Sl, week: (t, e, n) => bl(t, e, { weekStartsOn: n }), day: ll };
function to(t, e, n, r) {
  const s = eo[t];
  return s ? s(e, n, r) : !1;
}
const Ll = { start: Js, end: Hl, add: Nn, isSame: eo, diff: Jn, smallerCount: xt }, Xr = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function zl(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((l, a) => at.indexOf(l) - at.indexOf(a)).shift();
      let s = at.indexOf(r);
      const o = e[n][r], i = Xr(o);
      for (let l = s - 1; l >= 0; l--) {
        const a = at[l], c = Xr(xt[a][r]);
        if (i <= c) break;
        s = l;
      }
      at.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) xt[r][t] = e[n][r];
    else Ll[n][t] = e[n];
  }
}
function Wn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Fl(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Wt(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: ut(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const at = ["year", "quarter", "month", "week", "day", "hour"], er = 50, tr = 300;
function Ol(t, e, n, r, s) {
  let o = t, i = e, l = !1, a = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, l = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, a = !0);
  });
  const c = ut(r || "day");
  return o ? l && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? a && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function Wl(t, e, n, r, s, o, i) {
  const l = Wt(i).unit, a = br(l, void 0, o), c = a(e, t, "", !0), d = mt(l, e, o);
  t = mt(l, t, o), e = d < e ? ut(l)(d, 1) : d;
  const u = c * r, h = s * i.length, p = i.map((f) => {
    const w = [], x = ut(f.unit);
    let y = mt(f.unit, t, o);
    for (; y < e; ) {
      const k = x(y, f.step), v = y < t ? t : y, N = k > e ? e : k, S = a(N, v, "", !0) * r, C = typeof f.format == "function" ? f.format(y, k) : f.format;
      let M = "";
      f.css && (M += typeof f.css == "function" ? f.css(y) : f.css), w.push({ width: S, value: C, date: v, css: M, unit: f.unit }), y = k;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return l !== n && (m = Math.round(m / Cn(l, n)) || 1), { rows: p, width: u, height: h, diff: a, start: t, end: e, lengthUnit: n, minUnit: l, lengthUnitWidth: m };
}
function Pl(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = at.indexOf(Wt(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((a) => {
    a.minCellWidth || (a.minCellWidth = wn(s.minCellWidth, er)), a.maxCellWidth || (a.maxCellWidth = wn(s.maxCellWidth, tr));
  });
  else {
    const a = [], c = n.length || 1, d = wn(s.minCellWidth, er), u = wn(s.maxCellWidth, tr);
    n.forEach((h) => {
      h.format && !e[h.unit] && (e[h.unit] = h.format);
    }), at.forEach((h, p) => {
      if (p === o) a.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (p) for (let f = c - 1; f > 0; f--) {
          const w = at[p - f];
          w && m.push({ unit: w, step: 1, format: e[w] });
        }
        m.push({ unit: h, step: 1, format: e[h] }), a.push({ minCellWidth: d, maxCellWidth: u, scales: m });
      }
    }), s.levels = a;
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level], l = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: l };
}
function Vl(t, e, n, r, s, o, i) {
  t.level = n;
  let l;
  const a = r.scales || r, c = Wt(a).unit, d = Yl(c, s);
  if (e === -1) {
    const p = Cn(c, s);
    l = i * p;
  } else {
    const p = Cn(Wt(o).unit, c);
    l = Math.round(i / p);
  }
  const u = r.minCellWidth ?? er, h = r.maxCellWidth ?? tr;
  return { scales: a, cellWidth: Math.min(h, Math.max(u, l)), lengthUnit: d, zoom: t };
}
function Yl(t, e) {
  const n = at.indexOf(t), r = at.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : at[r];
}
function wn(t, e) {
  return t ?? e;
}
const nr = 8, no = 4, Gl = 3, qr = 7, Kl = nr + no;
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
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: l } = n, { start: a, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", p = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), f = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let k = t[h], v = t[p];
  if (r && !k) {
    t[y] = !0;
    return;
  }
  t[h] < a && (t[p] < a || Lt(t[p], a)) ? k = v = a : t[h] > c && (k = v = c), t[m] = Math.round(u(k, a, d) * s), t[f] = r ? t.$y + t.$h + no : o * e + Gl, t[w] = Math.round(u(v, k, d, !0) * s), t[x] = r ? nr : l ? o - qr - Kl : o - qr, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[f] = t.$y + nr, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Lt(k, v);
}
const Pn = 20, jl = function(t, e, n, r, s) {
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
    const h = Ul(a, c + o, d, u + o, i, l, r / 2, s), p = Xl(d, u + o, l);
    t.$p = `${h},${p}`, t.$pl = Bl(t.$p);
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
  const a = Pn * (s ? -1 : 1), c = Pn * (o ? -1 : 1), d = t + a, u = n + c, h = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], p = u - d;
  let m = r - e;
  const f = o === s;
  return f || (u <= t + Pn - 2 && o || u > t && !o) && (m = l ? m - i + 6 : m - i), f && o && d > u || f && !o && d < u ? (h[4] = h[2] + p, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + p, h[7] = h[5]), h.join(",");
}
function Xl(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function lo(t) {
  return t.map((e) => {
    const n = e.id || mr();
    return { ...e, id: n };
  });
}
const ao = ["start", "end", "duration"];
function ql(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !ao.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function Ql(t, e) {
  return typeof e == "function" ? e : ao.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => ql(n, r.id) ? e : null) : e;
}
function Zl(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && Ql(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const co = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function zt(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, l = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], a = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, p = !i && d.includes(e), m = { parent: u.includes(e), level: h[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !p)) {
    if (e !== "paste-task" && (t._temp = null), l.includes(e) || p || s.length === 1) Zr(t, e, n, r);
    else if (i) {
      const f = a.includes(e) ? s : Jl(s, o, m);
      c.includes(e) && f.reverse();
      const w = t.getHistory();
      w && w.startBatch(), f.forEach((x, y) => Zr(t, e, x, r, y)), w && w.endBatch();
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
      const h = t.getHistory();
      h && h.startBatch();
      const p = /* @__PURE__ */ new Map();
      if (t._temp.forEach((m) => {
        const f = { id: m.id, target: a, mode: "after" };
        o(m.cut ? "move-task" : "copy-task", f), p.set(m.id, f.id);
      }), !t._temp[0].cut) {
        const { links: m } = t.getState(), f = t._temp.map((x) => x.id), w = [];
        m.forEach((x) => {
          f.includes(x.source) && f.includes(x.target) && w.push(x);
        }), w.forEach((x) => {
          o("add-link", { link: { source: p.get(x.source), target: p.get(x.target), type: x.type } });
        }), t._temp.forEach((x, y) => {
          o("select-task", { id: p.get(x.id), toggle: !!y });
        });
      }
      h && h.endBatch(), t._temp = null;
    }
    return;
  } else i === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: a, show: !0, select: !1 }, c = {}, u = !0) : i === "edit-task" ? (i = "show-editor", l === "segment" && typeof n == "object" && (d = n)) : i === "convert-task" ? (i = "update-task", d = { task: { type: l } }, l = void 0) : i === "indent-task" && (l = l === "add");
  if (i === "split-task" && typeof n == "object") d = n;
  else if (i === "delete-task" && l === "segment" && typeof n == "object") {
    const h = t.getTask(a), { segmentIndex: p } = n, m = h.segments.filter((f, w) => w !== p);
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
class ta extends Ki {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new ji(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: l, end: a, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!l || !a || u) {
        const h = Wt(d).unit, p = Ol(l, a, u, h, c);
        (p._end != o || p._start != i) && this.setState(p, s);
      } else this.setState({ _start: l, _end: a }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: l, _end: a, cellWidth: c, scaleHeight: d, scales: u, _weekStart: h } = o, p = Wt(u).unit;
      Il(p, i) || (i = p);
      const m = Wl(l, a, i, c, d, h, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: l, _scales: a, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), h = l.toArray().map((p, m) => io(p, m, { cellWidth: o, cellHeight: i, _scales: a, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: h }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: l, baselines: a, criticalPath: c } = this.getState(), d = i.map((u) => {
        const h = o.byId(u.source), p = o.byId(u.target);
        return jl(u, h, p, l, a);
      }).toSorted((u, h) => c ? !!u.$critical == !!h.$critical ? h.$pl - u.$pl : u.$critical ? 1 : -1 : h.$pl - u.$pl).filter((u) => u !== null);
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
    } }], { tasks: (s) => new Ji(s), links: (s) => new jr(s), columns: (s) => Zl(s) });
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
      const { selected: c, _tasks: d, activeTask: u, splitTasks: h } = this.getState();
      let p = !1, m;
      if (c.length && (o || i)) {
        const w = [...c];
        if (i) {
          const x = w[w.length - 1], y = d.findIndex((C) => C.id == x), k = d.findIndex((C) => C.id == s), v = Math.min(y, k), N = Math.max(y, k) + 1, S = d.slice(v, N).map((C) => C.id);
          y > k && S.reverse(), S.forEach((C) => {
            w.includes(C) || w.push(C);
          });
        } else if (o) {
          const x = w.findIndex((y) => y == s);
          x === -1 ? w.push(s) : (p = !0, w.splice(x, 1));
        }
        m = w;
      } else m = [s];
      const f = { selected: m };
      l && m.length && (f._scrollTask = { id: m[0], mode: l }), this.setStateAsync(f), !p && u && (u !== s || h) && n.exec("show-editor", { id: s, ...h && { segmentIndex: a } });
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
        let h = o.getIndexById(a);
        if (i === "up") {
          const p = d.parent === 0;
          if (h === 0 && p) {
            s.skipProvider = !0;
            return;
          }
          h -= 1, i = "before";
        } else if (i === "down") {
          const p = h === u.length - 1, m = d.parent === 0;
          if (p && m) {
            s.skipProvider = !0;
            return;
          }
          h += 1, i = "after";
        }
        if (l = u[h] && u[h].id || d.parent, l) {
          const p = o.getBranch(l);
          let m = o.getIndexById(l), f = p[m];
          if (f.data) {
            if (i === "before") {
              if (f.parent === d.parent) {
                for (; f.data; ) f.open || n.exec("open-task", { id: f.id, mode: !0 }), f = f.data[f.data.length - 1];
                l = f.id;
              }
            } else if (i === "after") {
              let y;
              f.parent === d.parent ? (y = f, f = f.data[0], l = f.id, i = "before") : p.length - 1 !== m && (y = f, m += 1, f = p[m], d.$level > f.$level && f.data ? (y = f, f = f.data[0], l = f.id, i = "before") : l = f.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const w = o.getSummaryId(d.id);
          o.move(a, i, l);
          const x = o.getSummaryId(a);
          w != x && (w && this.resetSummaryDates(w, "move-task"), x && this.resetSummaryDates(x, "move-task"));
        }
      } else {
        const u = o.byId(l);
        let h = u, p = !1;
        for (; h.$level > d.$level; ) h = o.byId(h.parent), h.id === a && (p = !0);
        if (p) return;
        const m = o.getSummaryId(d.id);
        if (o.move(a, i, l), i == "child") {
          let w = u;
          for (; w.id !== 0 && !w.open; ) n.exec("open-task", { id: w.id, mode: !0 }), w = o.byId(w.parent);
        }
        const f = o.getSummaryId(a);
        m != f && (m && this.resetSummaryDates(m, "move-task"), f && this.resetSummaryDates(f, "move-task"));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }), s.target = l, s.mode = i;
    }), n.on("drag-task", (s) => {
      const o = this.getState(), { tasks: i, _tasks: l, _selected: a, _scales: c, cellWidth: d } = o, u = i.byId(s.id), { left: h, top: p, width: m, inProgress: f } = s, w = { _tasks: l, _selected: a };
      if (typeof m < "u" && (u.$w = m, rr(i, u, c, d)), typeof h < "u") {
        if (u.type === "summary") {
          const x = h - u.$x;
          ro(u, x, c, d);
        }
        u.$x = h, rr(i, u, c, d);
      }
      typeof p < "u" && (u.$y = p + 4, u.$reorder = f), typeof m < "u" && (u.$w = m), typeof h < "u" && (u.$x = h), typeof p < "u" && (u.$y = p + 4, u.$reorder = f), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: l, eventSource: a } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: h, splitTasks: p, calendar: m } = this.getState(), f = d.byId(o), w = { durationUnit: h, calendar: m };
      if (a === "add-task" || a === "copy-task" || a === "move-task" || a === "update-task" || a === "delete-task" || a === "provide-data") {
        St(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = ut(x);
      const k = br(x, m);
      if (l && (c.start && (c.start = y(c.start, l)), !i && i !== 0 && (c.start && c.end ? c.duration = f.duration : (c.start ? c.end = f.end : (c.end = y(c.end, l), c.start = f.start, c.duration = k(c.end, c.start)), k(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? f.type, m && c.start && (c.start = Wn(c.start, l, m)), c.start && c.end && (!Lt(c.start, f.start) || !Lt(c.end, f.end)) && c.type === "summary" && f.data?.length) {
        let N = l || k(c.start, f.start);
        m && (N = c.start > f.start ? k(c.start, f.start) : -k(f.start, c.start), y = Fl(m)), this.moveSummaryKids(f, (S) => (S = y(S, N), m ? Wn(S, l, m) : S), "update-task");
      }
      c.start || (c.start = f.start), !c.end && !c.duration && (c.duration = f.duration), St(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && f.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const v = d.getSummaryId(o);
      v && this.resetSummaryDates(v, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: i, unscheduledTasks: l, durationUnit: a, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: h, task: p, show: m, select: f = !0 } = s;
      !s.eventSource && l && (p.unscheduled = !0);
      let w = -1, x, y;
      if (u ? (y = o.byId(u), h == "child" ? (x = y, p.parent = x.id) : (y.parent !== null && (x = o.byId(y.parent), p.parent = x.id), w = o.getIndexById(u), h == "after" && (w += 1))) : p.parent && (x = o.byId(p.parent)), !p.start) {
        if (x?.start) p.start = new Date(x.start.valueOf());
        else if (y) p.start = new Date(y.start.valueOf());
        else {
          const S = o.getBranch(0);
          let C;
          if (S?.length) {
            const M = S[S.length - 1];
            if (!M.$skip) {
              const O = new Date(M.start.valueOf());
              i.start <= O && (C = O);
            }
          }
          p.start = C || ut(a, d)(i.start, 1);
        }
        p.duration = 1;
      }
      d && (p.start = Wn(p.start, 1, d)), this.getState().baselines && (p.base_start = p.start, p.base_duration = p.duration), St(p, { durationUnit: a, calendar: d });
      const k = o.add(p, w), v = { tasks: o };
      if (x && m) {
        for (; x && x.id; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        v._scrollTask = { id: k.id, mode: m };
      }
      s.id = k.id;
      const N = o.getSummaryId(k.id);
      N && this.resetSummaryDates(N, "add-task"), this.setStateAsync(v), s.id = k.id, s.task = k, f && n.exec("select-task", { id: k.id });
    }), n.on("delete-task", (s) => {
      const { id: o } = s, { tasks: i, links: l, selected: a } = this.getState();
      s.source = i.byId(o).parent;
      const c = i.getSummaryId(o), d = [o];
      i.eachChild((h) => d.push(h.id), o), l.filter((h) => !(d.includes(h.source) || d.includes(h.target)));
      const u = { tasks: i, links: l };
      a.includes(o) && (u.selected = a.filter((h) => h !== o)), i.remove(o), c && this.resetSummaryDates(c, "delete-task"), this.setStateAsync(u);
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
      const u = c.getSummaryId(o), h = c.getSummaryId(i);
      let p = c.getIndexById(i);
      l == "before" && (p -= 1);
      const m = c.byId(o), f = c.copy(m, c.byId(i).parent, p + 1);
      s.source = s.id, s.id = f[0][1], m.lazy && (s.lazy = !0), u != h && h && this.resetSummaryDates(h, "copy-task");
      let w = [];
      for (let x = 1; x < f.length; x++) {
        const [y, k] = f[x];
        d.forEach((v) => {
          if (v.source === y) {
            const N = { ...v };
            delete N.target, w.push({ ...N, source: k });
          } else if (v.target === y) {
            const N = { ...v };
            delete N.source, w.push({ ...N, target: k });
          }
        });
      }
      w = w.reduce((x, y) => {
        const k = x.findIndex((v) => v.id === y.id);
        return k > -1 ? x[k] = { ...x[k], ...y } : x.push(y), x;
      }, []);
      for (let x = 1; x < f.length; x++) {
        const [y, k] = f[x], v = c.byId(k);
        n.exec("copy-task", { source: y, id: k, lazy: !!v.lazy, eventSource: "copy-task", target: v.parent, mode: "child", skipUndo: !0 });
      }
      w.forEach((x) => {
        n.exec("add-link", { link: { source: x.source, target: x.target, type: x.type }, eventSource: "copy-task", skipUndo: !0 });
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], sr(s.data.tasks, { durationUnit: l, calendar: a }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new jr(i.map((u) => u).concat(lo(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: l, _cellWidth: a, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let h = l;
      s < 0 && (h = a || l);
      const p = h + s * 50, m = i.levels[i.level], f = s < 0 && l > m.maxCellWidth;
      if (p < m.minCellWidth || p > m.maxCellWidth || f) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: p, _cellWidth: p });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: k } = this.getState(), v = mt(w.minUnit, x, k), N = w.diff(u, v, "hour");
      typeof o > "u" && (o = y);
      let S = Math.round(N * y) - o;
      S < 0 && (S = 0), this.setState({ scrollLeft: S, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: i, start: l, end: a, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: h } = this.getState(), p = ut(i.minUnit);
      let m = i.width;
      if (l && a) {
        if (m < s && m) {
          const k = s / m;
          this.setState({ cellWidth: d * k });
        }
        return !0;
      }
      let f = 0;
      for (; m < s; ) m += d, f++;
      const w = f ? a ? -f : -1 : 0, x = l || p(o, w);
      let y = 0;
      if (u) {
        const k = i.diff(u, x, "hour");
        y = Math.max(0, Math.round(k * d) - (h || 0));
      }
      this.setState({ _start: x, _end: a || p(c, f), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: i }) => {
      const l = this.getState(), { tasks: a } = l;
      let c = l._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && i ? (c.forEach((h, p) => {
        h.key === s && (u = p);
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
          zt(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          zt(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          zt(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), zt(this, "delete-task", null, null);
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
      const { cellWidth: o, scales: i, _scales: l } = this.getState(), a = Vl(e, n, r, s, l.lengthUnit, i, o);
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
      if (!Lt(a.start, d.start) || !Lt(a.end, d.end)) {
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
function Vn(t) {
  return t.type === "summary";
}
function Yn(t) {
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
const mo = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Gn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Vn(t), isDisabled: Kn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Vn(t) || Yn(t), isDisabled: Kn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Vn(t) || Yn(t), isDisabled: Kn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Yn(t) || Gn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Gn(t) }], wo = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], vt = Pt(null);
(/* @__PURE__ */ new Date()).valueOf();
function ua(t, e) {
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
function yt(t, e) {
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
      let u = yt(l[a], i[d]);
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
    const h = [];
    for (let p = 0; p < l.length; p++) {
      const m = a[u], f = l[p], w = Tt(m, f) ?? "";
      let x = yt(m, f), y;
      e.cellStyle && (y = e.cellStyle(w, m, f)), e.cellTemplate && (x = e.cellTemplate(w, m, f) ?? x);
      const k = vo(x, 2, y, n);
      h.push(k);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return d += a.length, e.footer !== !1 && l[0].footer && (is("footer", l, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function is(t, e, n, r, s, o, i) {
  for (let l = 0; l < e[0][t].length; l++) {
    const a = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][l], u = d.colspan ? d.colspan - 1 : 0, h = d.rowspan ? d.rowspan - 1 : 0;
      (u || h) && r.push({ from: { row: l + s, column: c }, to: { row: l + s + h, column: c + u } });
      let p = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(p, d, e[c], t)), o.headerCellTemplate && (p = o.headerCellTemplate(p, d, e[c], t) ?? p);
      let f;
      t == "header" ? l == e[0][t].length - 1 ? f = 1 : f = 0 : l ? f = 4 : f = 3;
      const w = vo(p, f, m, i);
      a.push(w);
    }
    n.push(a);
  }
}
function vo(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = va(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => ln(i, n));
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
            a.colspan = d, a.width = t.slice(o, o + c + 1).reduce((u, h) => u + h.width, 0), d > 1 && (c = d - 1);
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
const xn = 28, za = 20;
function Fa() {
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
    const u = o.getBoundingClientRect(), h = Math.ceil(u.width) + (r && r.length ? r[d] : 0), p = Math.ceil(u.height);
    a = Math.max(a || 0, h), c = Math.max(c || 0, p);
  }
  return o.remove(), { width: a, height: c };
}
function cs(t, e, n, r, s) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i][e], a = l.length;
    for (let c = 0; c < a; c++) {
      const { text: d, vertical: u, collapsed: h, rowspan: p, css: m } = l[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let f = 0;
      if (u && !h) {
        let w = `wx-measure-cell-${e}`;
        if (w += m ? ` ${m}` : "", f = Tn(d, w, s).width, (p > 1 || !l[c + 1]) && n > c + 1) {
          const x = p || n - c, y = o.slice(c, c + x).reduce((k, v) => k + v, 0);
          if (y < f) {
            const k = Math.ceil((f - y) / x);
            for (let v = c; v < c + x; v++) o[v] = (o[v] || r) + k;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, f);
    }
  }
  return o;
}
function Oa(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const l = e[i], a = yt(l, t);
    a && (r.push(a), t.treetoggle ? s.push(e[i].$level * xn + (e[i].$count ? xn : 0) + (t.draggable ? xn : 0)) : t.draggable && s.push(xn));
  }
  return Tn(r, o, n, s).width;
}
function Wa(t, e) {
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
function Va(t) {
  return Pa[t];
}
class Ya extends fa {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new ha(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: l } = this.getState(), a = this.copyColumns(o), c = a.reduce((h, p) => Math.max(p.header.length, h), 0), d = a.reduce((h, p) => Math.max(p.footer.length, h), 0);
      a.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(a, i, c, d, l);
      for (let h = 0; h < a.length; h++) this.normalizeColumns(a, h, "header", c, u), this.normalizeColumns(a, h, "footer", d, u);
      this.setState({ _columns: a, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: l, _filterIds: a } = this.getState(), c = a && new Set(a), d = i ? this.flattenRows(o, [], a) : c ? o.filter((h) => c.has(h.id)) : o, u = !l && d.some((h) => h.rowHeight);
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
        i = { column: a.id, id: s, value: Tt(l, a) ?? "", renderedValue: yt(l, a) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), a.options && !i.options && (i.options = a.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: l, _filterIds: a } = o, { row: c, before: d, after: u, select: h } = s;
      if (s.id = c.id = s.id || c.id || yn(), d || u) {
        const m = d || u, f = i.findIndex((w) => w.id === m);
        i = [...i], i.splice(f + (u ? 1 : 0), 0, s.row);
      } else i = [...i, s.row];
      const p = { data: i };
      a && (p._filterIds = [...a, s.id]), this.setState(p), !(typeof h == "boolean" && !h) && (h || l) && r.exec("select-row", { id: c.id, show: !0 });
    }), r.on("delete-row", (s) => {
      const { data: o, selectedRows: i, focusCell: l, editor: a } = this.getState(), { id: c } = s, d = { data: o.filter((u) => u.id !== c) };
      this.isSelected(c) && (d.selectedRows = i.filter((u) => u !== c)), a?.id == c && (d.editor = null), this.setState(d), l?.row === c && this.in.exec("focus-cell", { eventSource: "delete-row" });
    }), r.on("update-cell", (s) => {
      const o = this.getState();
      let { data: i } = o;
      i = [...i];
      const { tree: l } = o, { id: a, column: c, value: d } = s, u = this.getColumn(c);
      if (l) {
        const h = { ...this._branches[a] };
        rs(h, u, d);
        const p = this.updateTreeRow(h);
        h.$parent === 0 && (i = p);
      } else {
        const h = i.findIndex((m) => m.id == a), p = { ...i[h] };
        rs(p, u, d), i[h] = p;
      }
      this.setState({ data: i });
    }), r.on("update-row", (s) => {
      let { data: o } = this.getState();
      const { id: i, row: l } = s, a = o.findIndex((c) => c.id == i);
      o = [...o], o[a] = { ...o[a], ...l }, this.setState({ data: o });
    }), r.on("select-row", ({ id: s, toggle: o, range: i, mode: l, show: a, column: c }) => {
      const d = this.getState(), { focusCell: u } = d;
      let { selectedRows: h } = d;
      if (h.length || (i = o = !1), i) {
        const { data: p } = this.getState();
        let m = p.findIndex((w) => w.id == h[h.length - 1]), f = p.findIndex((w) => w.id == s);
        m > f && ([m, f] = [f, m]), p.slice(m, f + 1).forEach((w) => {
          h.indexOf(w.id) === -1 && h.push(w.id);
        });
      } else if (o && this.isSelected(s)) {
        if (l === !0) return;
        h = h.filter((p) => p !== s);
      } else if (o) {
        if (l === !1) return;
        h.push(s);
      } else h = [s];
      this.setState({ selectedRows: [...h] }), u?.row !== s && this.in.exec("focus-cell", { eventSource: "select-row" }), a && this.in.exec("scroll", { row: s, column: c });
    }), this.in.on("focus-cell", (s) => {
      const { row: o, column: i, eventSource: l } = s, { _columns: a, split: c } = this.getState();
      o && i ? (this.setState({ focusCell: { row: o, column: i } }), l !== "click" && ((!c.left || a.findIndex((d) => d.id == s.column) >= c.left) && (!c.right || a.findIndex((d) => d.id == s.column) < a.length - c.right) ? this.in.exec("scroll", { row: o, column: i }) : this.in.exec("scroll", { row: o }))) : this.setState({ focusCell: null });
    }), r.on("resize-column", (s) => {
      const { id: o, auto: i, maxRows: l, inProgress: a } = s;
      if (a === !1) return;
      let c = s.width || 0;
      const d = [...this.getState().columns], u = d.find((h) => h.id == o);
      if (i) {
        if (i == "data" || i === !0) {
          const { flatData: h, _skin: p } = this.getState();
          let m = h.length;
          l && (m = Math.min(l, m));
          const f = h.slice(0, m);
          c = Oa(u, f, p);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(Wa(u, h), c);
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
      const { order: h = "asc" } = s;
      let p = a.sortMarks;
      const m = Object.keys(p), f = m.length;
      !i || !f || f === 1 && p[o] ? p = { [o]: { order: h } } : (f === 1 && (p[m[0]] = { ...p[m[0]], index: 0 }), p = { ...p, [o]: { order: h, index: typeof i == "number" ? i : p[o]?.index ?? f } });
      const w = Object.keys(p).sort((y, k) => p[y].index - p[k].index).map((y) => ({ key: y, order: p[y].order }));
      this.setState({ sortMarks: p });
      const x = La(w, c);
      if (x) {
        const y = [...d];
        u ? this.sortTree(y, x) : y.sort(x), this.setState({ data: y });
      }
    }), r.on("filter-rows", (s) => {
      const { value: o, key: i, filter: l } = s;
      if (!Object.keys(s).length) {
        this.setState({ filterValues: {}, _filterIds: null });
        return;
      }
      const a = this.getState(), { data: c, tree: d } = a;
      let u = a.filterValues;
      const h = {};
      i && (u = { ...u, [i]: o }, h.filterValues = u);
      const p = l ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, p, m) : c.forEach((f) => {
        p(f) && m.push(f.id);
      }), h._filterIds = m, this.setState(h);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: i, mode: l } = s, a = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[i] : c;
      typeof d == "object" && (d.collapsed = l ?? !d.collapsed, this.setState({ columns: a }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: i } = s;
      let { target: l, mode: a = "after" } = s;
      const { data: c, flatData: d, tree: u } = this.getState(), h = d.findIndex((f) => f.id == o);
      let p;
      if (a === "up" || a === "down") {
        if (a === "up") {
          if (h === 0) return;
          p = h - 1, a = "before";
        } else if (a === "down") {
          if (h === d.length - 1) return;
          p = h + 1, a = "after";
        }
        l = d[p] && d[p].id;
      } else p = d.findIndex((f) => f.id == l);
      if (h === -1 || p === -1 || i === !1) return;
      let m;
      u ? m = this.moveItem(o, l, c, a) : m = this.moveItem(o, l, c, a), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: i, mode: l = "after" } = s, a = this.getState(), { flatData: c, _filterIds: d } = a;
      let { data: u } = a;
      const h = this.getRow(o);
      if (!h) return;
      const p = { ...h, id: yn() };
      s.id = p.id;
      const m = c.findIndex((w) => w.id == i);
      if (m === -1) return;
      u.splice(m + (l === "after" ? 1 : 0), 0, p), u = [...u];
      const f = { data: u };
      d && (f._filterIds = [...d, p.id]), this.setState(f);
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
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: p, rowSizes: m, colSizes: f, styles: w } = xa(this.getState(), l, u), x = l.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (k) => {
            if (k.data.type == "ready") {
              const v = k.data.blob;
              l.download !== !1 ? ss(v, a) : s.result = v, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: l.sheetName || "data", cells: h, cols: f, rows: m, merged: p }], styles: w } });
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
            let u = l.id, h = this.getNextEditor(this.getRow(u), this.getColumn(d));
            if (!h) {
              const p = this.getNextRow(u);
              p && (u = p.id, h = this.getNextEditor(p));
            }
            h && (this.in.exec("open-editor", { id: u, column: h.id }), this.in.exec("focus-cell", { row: u, column: h.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
          } else a && this.in.exec("focus-cell", { eventSource: "key" });
          break;
        }
        case "shift+tab": {
          const { editor: l, focusCell: a, select: c } = this.getState();
          if (l) {
            o.preventDefault();
            const d = l.column;
            let u = l.id, h = this.getPrevEditor(this.getRow(u), this.getColumn(d));
            if (!h) {
              const p = this.getPrevRow(u);
              p && (u = p.id, h = this.getPrevEditor(p));
            }
            h && (this.in.exec("open-editor", { id: u, column: h.id }), this.in.exec("focus-cell", { row: u, column: h.id, eventSource: "key" }), c && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
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
            const u = c[0]?.id, h = this._getFirstVisibleColumn()?.id;
            u && h && (this.in.exec("focus-cell", { row: u, column: h, eventSource: "key" }), d && !this.isSelected(u) && this.in.exec("select-row", { id: u }));
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
      const { _columns: o, split: i, _sizes: l, flatData: a, dynamic: c, _rowHeightFromData: d } = this.getState();
      let u = -1, h = -1, p = 0, m = 0;
      if (s.column) {
        u = 0;
        const f = o.findIndex((w) => w.id == s.column);
        p = o[f].width;
        for (let w = i.left ?? 0; w < f; w++) {
          const x = o[w];
          x.hidden || (u += x.width);
        }
      }
      if (s.row && !c) {
        const f = a.findIndex((w) => w.id == s.row);
        f >= 0 && (d ? (h = a.slice(0, f).reduce((w, x) => w + (x.rowHeight || l.rowHeight), 0), m = a[f].rowHeight) : h = l.rowHeight * f);
      }
      this.setState({ scroll: { top: h, left: u, width: p, height: m || l.rowHeight } });
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Fa()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), ln(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), bo() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Ia(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
        for (let h = 1; h < d.colspan; h++) e[n + h][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? a : a.slice(c, d.rowspan + c)).reduce((h, p) => h + p, 0);
        d.height = u, c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = i.width, h = i.flexgrow || 0;
        const p = d.colspan;
        for (let m = 1; m < p; m++) {
          const f = e[n + m];
          f && (f.hidden ? d.colspan -= 1 : f.flexgrow ? h += f.flexgrow : u += f.width || o.columnWidth), h ? d.flexgrow = h : d.width = u;
        }
      } else d.width = i.width, d.flexgrow = i.flexgrow;
      r === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    l.length > s && (l.length = s), i[r] = l;
  }
  normalizeRows(e) {
    for (let n = 0; n < e.length; n++) e[n].id || (e[n].id = yn());
    return e;
  }
  normalizeTreeRows(e, n, r) {
    return e.forEach((s) => {
      s.id || (s.id = yn()), s.$level = n || 0, s.$parent = r || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
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
      r.push((a) => o?.handler ? o.handler(a[s], l) : Va(i)(a[s], l));
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
        const d = yt(l, c);
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
function yn() {
  return "temp://" + Ga++;
}
function Ka(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var ja = class {
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
}, Ot = [], Ba = { subscribe: (t) => {
  Ua();
  const e = new ja();
  return Ot.push(e), t(e), () => {
    const n = Ot.findIndex((r) => r === e);
    n >= 0 && Ot.splice(n, 1);
  };
} }, ds = !1;
function Ua() {
  ds || (ds = !0, document.addEventListener("keydown", (t) => {
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
const Xa = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Cr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const l = i.target;
    return l.tagName === "INPUT" || l.tagName === "TEXTAREA" || Ka(l, "data-header-id")?.classList.contains("wx-filter") || !!l.closest(".wx-cell.wx-editor");
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
function qa(t, e) {
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
  function u(S) {
    o = S.clientX, i = S.clientY, l = {
      ...Qa(n, t, S),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(S) {
    n = qe(S), us(n) && (s = $t(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", p), window.addEventListener("touchend", k));
  }
  function p(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = qe(S), us(n) && (s = $t(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", v), u(S)));
  }
  function f(S) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", v), document.body.removeEventListener("touchend", k), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", h));
  }
  function w(S) {
    const C = S.clientX - o, M = S.clientY - i;
    if (!r) {
      if (Math.abs(C) < fs && Math.abs(M) < fs || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = l.left + "px", r.style.top = l.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const O = Math.round(Math.max(0, l.top + M));
      if (e && e.move && e.move({ id: s, top: O, detail: a }) === !1)
        return;
      const b = e.getTask(s), I = b.$y;
      if (!l.start && l.y == I) return N();
      l.start = !0, l.y = b.$y - 4, r.style.top = O + "px";
      const A = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), H = qe(A);
      if (H && H !== n) {
        const T = $t(H), V = H.getBoundingClientRect(), ne = V.top + V.height / 2, le = S.clientY + l.db > ne && H.nextElementSibling !== n, U = S.clientY - l.dt < ne && H.previousElementSibling !== n;
        a?.after == T || a?.before == T ? a = null : le ? a = { id: s, after: T } : U && (a = { id: s, before: T });
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
    c = null, d && (clearTimeout(d), d = null), N();
  }
  function v() {
    N();
  }
  function N() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: l.top })), s = n = r = l = a = null, f();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", h), {
    destroy() {
      f(!0);
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
  const r = F(null), s = R(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = _(() => n && n.comp ? nc(n.comp) : null, [n]);
  return /* @__PURE__ */ j(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ g("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ g(o, { item: n, option: n }) : null : /* @__PURE__ */ j("span", { className: "wx-cDCz9rZQ wx-value", children: [
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
  const [c, d] = G(-1e4), [u, h] = G(-1e4), [p, m] = G(20), [f, w] = G(), x = F(null), [y, k] = G(!1), [v, N] = G(null), S = R(() => {
    const I = Bo(x.current, s, r, e, n);
    I && (d(I.x), h(I.y), m(I.z), w(I.width));
  }, [s, r, e, n]);
  Y(() => {
    o && o(S);
  }, []);
  const C = R(() => {
    k(!1);
  }, []), M = R(() => {
    a && a({ action: null, option: null });
  }, [a]), O = R((I, A) => {
    k(I), N(A);
  }, []), b = _(() => tc(t), [t]);
  return Y(() => {
    S();
  }, [s, S]), Y(() => {
    if (x.current)
      return tn(x.current, { callback: M, modal: !0 }).destroy;
  }, [M]), /* @__PURE__ */ g(
    "div",
    {
      ref: x,
      "data-wx-menu": "true",
      className: `wx-XMmAGqVx wx-menu ${l}`,
      style: {
        position: "absolute",
        top: u + "px",
        left: c + "px",
        width: f,
        zIndex: p
      },
      onMouseLeave: C,
      children: b.map((I) => /* @__PURE__ */ j(ks, { children: [
        I.comp === "separator" ? /* @__PURE__ */ g("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ g(
          sc,
          {
            option: I,
            onShow: O,
            onClick: (A) => {
              if (!I.data && !A.defaultPrevented) {
                const H = { context: i, action: I, option: I, event: A };
                I.handler && I.handler(H), a && a(H), A.stopPropagation();
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
  } = t, [d, u] = G(null), [h, p] = G(null), [m, f] = G(0), [w, x] = G(0), y = _(() => d !== null && i ? _o(n, (S) => i(S, d)) : n, [d, i, n]), k = R(
    (S) => {
      p(null), c && c(S);
    },
    [c]
  ), v = R((S, C) => {
    let M = null;
    for (; S && S.dataset && !M; )
      M = S.dataset[C], S = S.parentNode;
    return M ? Vt(M) : null;
  }, []), N = R(
    (S, C) => {
      if (!S) {
        p(null);
        return;
      }
      if (S.defaultPrevented) return;
      const M = S.target;
      if (M && M.dataset && M.dataset.menuIgnore) return;
      f(S.clientX + 1), x(S.clientY + 1);
      let O = typeof C < "u" ? C : v(M, o);
      s && (O = s(O, S), !O) || (u(O), p(M), S.preventDefault());
    },
    [o, v, s]
  );
  return Mt(e, () => ({ show: N }), [N]), /* @__PURE__ */ j(Ce, { children: [
    a ? /* @__PURE__ */ g("span", { onClick: N, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a }) : null,
    h ? /* @__PURE__ */ g(Es, { children: /* @__PURE__ */ g(
      Nr,
      {
        css: l,
        at: r,
        top: w,
        left: m,
        parent: h,
        context: d,
        onClick: k,
        options: y
      },
      h
    ) }) : null
  ] });
});
Dt(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [l, a] = G(null);
  function c(m) {
    a(null), i && i(m);
  }
  const d = R((m) => {
    a(m.target), m.preventDefault();
  }, []);
  Mt(e, () => ({ show: d }), [d]);
  function u(m) {
    let f = m.target;
    for (; !f.dataset.menuIgnore; )
      a(f), f = f.parentNode;
  }
  const h = F(0), p = F(l);
  return Y(() => {
    p.current !== l && (h.current += 1, p.current = l);
  }, [l]), /* @__PURE__ */ j(Ce, { children: [
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
      h.current
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
  } = t, d = F(null), u = R((h, p) => {
    d.current.show(h, p);
  }, []);
  return Mt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ j(Ce, { children: [
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
function Kt(t, e) {
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
  ), l = R(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), a = _(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = R(
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
    const u = i, h = [
      "wx-tb-element",
      e && e.css ? e.css : "",
      e && e.spacer ? "wx-spacer" : "",
      n ? "wx-menu" : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ g(
      "div",
      {
        className: "wx-KVAsgMam " + h,
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
  const [o, i] = G(!0), l = () => i(!0), a = () => i(!1), c = (u) => {
    l(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ g("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ j("div", { className: "wx-wSVFAGym wx-collapsed", onClick: a, children: [
      t.icon ? /* @__PURE__ */ g("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ g("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ g(Gt, { width: "", oncancel: l, children: /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ g(
      Dn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, h) => u.items ? /* @__PURE__ */ g(
        Dn,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      ) : /* @__PURE__ */ g(
        Tr,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      )
    ) }),
    t.text ? /* @__PURE__ */ g("div", { className: "wx-wSVFAGym wx-label", children: t.text }) : null
  ] }) });
}
function ac({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, l] = G(void 0), a = F(null);
  function c() {
    l(null);
  }
  function d() {
    l(!0);
  }
  function u(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ j(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: a,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ g(gt, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ g(Gt, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ g("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (h, p) => h.items ? /* @__PURE__ */ g(
            Dn,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || p
          ) : /* @__PURE__ */ g(
            Tr,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || p
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
  } = t, [a, c] = Ie(e || []), [d, u] = Ie(s || null), h = _(() => cc(a), [a]), p = F(null), m = F(-1), [f, w] = G([]), x = F(h);
  Y(() => {
    x.current = h;
  }, [a]);
  const y = F(o);
  Y(() => {
    y.current = o;
  }, [o]);
  const k = F(f);
  Y(() => {
    k.current = f;
  }, [f]);
  const v = F(!1);
  function N(b) {
    d && (d[b.item.key] = b.value, u({ ...d })), l && l(b);
  }
  function S() {
    const b = p.current;
    if (!b) return 0;
    const I = b.children, A = x.current || [];
    let H = 0;
    for (let T = 0; T < A.length; T++)
      A[T].comp !== "spacer" && (H += I[T].clientWidth, A[T].comp === "separator" && (H += 8));
    return H;
  }
  function C() {
    const b = p.current, I = x.current || [];
    if (b) {
      for (let A = I.length - 1; A >= 0; A--)
        if (I[A].items && !I[A].collapsed) {
          I[A].collapsed = !0, I[A].$width = b.children[A].offsetWidth, v.current = !0, c([...I]);
          return;
        }
    }
  }
  function M(b) {
    const I = p.current, A = x.current || [];
    if (I) {
      for (let H = 0; H < A.length; H++)
        if (A[H].collapsed && A[H].$width) {
          A[H].$width - I.children[H].offsetWidth < b + 10 && (A[H].collapsed = !1, v.current = !0), c([...A]);
          return;
        }
    }
  }
  function O() {
    const b = p.current;
    if (!b) return;
    const I = x.current || [], A = y.current;
    if (A === "wrap") return;
    const H = b.clientWidth;
    if (b.scrollWidth > H) {
      if (A === "collapse") return C();
      const T = b.children;
      let V = 0;
      for (let ne = 0; ne < I.length; ne++) {
        if (V += T[ne].clientWidth, I[ne].comp === "separator" && (V += 8), V > H - 40) {
          if (m.current === ne) return;
          m.current = ne;
          const le = [];
          for (let U = ne; U < I.length; U++)
            le.push(I[U]), T[U].style.visibility = "hidden";
          ne > 0 && I[ne - 1].comp === "separator" && (T[ne - 1].style.visibility = "hidden"), w(le);
          break;
        }
        T[ne].style.visibility = "";
      }
    } else {
      const T = H - S();
      if (T <= 0) return;
      if (A === "collapse") return M(T);
      if ((k.current || []).length) {
        m.current = null;
        const V = b.children;
        for (let ne = 0; ne < I.length; ne++)
          V[ne].style.visibility = "";
        w([]);
      }
    }
  }
  return Y(() => {
    v.current && (v.current = !1, O());
  }, [a]), Y(() => {
    const b = new ResizeObserver(() => O());
    return p.current && b.observe(p.current), () => {
      b.disconnect();
    };
  }, []), /* @__PURE__ */ j(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: p,
      children: [
        h.map(
          (b) => b.items ? /* @__PURE__ */ g(
            Dn,
            {
              item: b,
              values: d,
              onClick: i,
              onChange: N
            },
            b.id
          ) : /* @__PURE__ */ g(
            Tr,
            {
              item: b,
              values: d,
              onClick: i,
              onChange: N
            },
            b.id
          )
        ),
        !!f.length && /* @__PURE__ */ g(
          ac,
          {
            items: f,
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
  return i ? /* @__PURE__ */ j("div", { className: "wx-HXpG4gnx wx-item", onClick: l, children: [
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
  return i ? /* @__PURE__ */ j("div", { className: "wx-3cuSqONJ wx-item", onClick: l, children: [
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
  return /* @__PURE__ */ j("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ g("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Kt("button", dc);
Kt("separator", Do);
Kt("spacer", Mo);
Kt("label", uc);
Kt("item", hc);
Kt("icon", fc);
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
  return Vt(t.getAttribute("data-id"));
}
function vn(t) {
  const e = t.getBoundingClientRect(), n = document.body, r = e.top + n.scrollTop - n.clientTop || 0, s = e.left + n.scrollLeft - n.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: t.offsetWidth,
    height: t.offsetHeight
  };
}
function cr(t, e) {
  const n = vn(e);
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
  function d(C) {
    const M = qe(C);
    M && (r = {
      container: a,
      sourceNode: C.target,
      from: mc(M),
      pos: cr(C, t)
    }, o = r.pos, u(C));
  }
  function u(C) {
    if (!r) return;
    const M = r.pos = cr(C, t);
    if (!i) {
      if (!l && !C?.target?.getAttribute("draggable-data") && Math.abs(o.x - M.x) < hs && Math.abs(o.y - M.y) < hs)
        return;
      if (N(C) === !1) return S();
    }
    if (l) {
      const O = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, b = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        C.pageX - O,
        C.pageY - b
      );
    } else r.targetNode = C.target;
    n.move && n.move(C, r), a.style.left = -(r.offset ? r.offset.x : 0) + "px", a.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function h(C) {
    a.parentNode && a.parentNode.removeChild(a), a.innerHTML = "", i && n.end && n.end(C, r), r = o = null, S();
  }
  function p(C) {
    n.getReorder && !n.getReorder() || C.button === 0 && (v(C), window.addEventListener("mousemove", m), window.addEventListener("mouseup", f), d(C));
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
      l = !0, d(C.touches[0]);
    }, gc), v(C);
    function M() {
      s && c(), C.target.removeEventListener("touchmove", x), C.target.removeEventListener("touchend", M), h(C);
    }
    C.target.addEventListener("touchmove", x), C.target.addEventListener("touchend", M), t.addEventListener("contextmenu", y);
  }
  function x(C) {
    i ? (C.preventDefault(), u(C.touches[0])) : s && c();
  }
  function y(C) {
    if (i || s)
      return C.preventDefault(), !1;
  }
  function k(C) {
    C.preventDefault();
  }
  function v(C) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: M } = n.getDraggableInfo();
    (!M || C.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function N(C) {
    if (i = !0, n.start) {
      if (n.start(C, r) === !1) return !1;
      t.appendChild(a), document.body.style.cursor = "move";
    }
  }
  function S(C) {
    i = l = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", f), C && (t.removeEventListener("mousedown", p), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", k));
  }
  return t.addEventListener("mousedown", p), t.addEventListener("touchstart", w), t.addEventListener("dragstart", k), {
    destroy() {
      S(!0);
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
  let h = 0, p = 0;
  u.x < o + a ? h = -1 : u.x > e.width - a && (h = 1), u.y < i + Math.round(a / 2) ? p = -1 : u.y > e.height - l - Math.round(a / 2) && (p = 1), (n.scrollState.dirX !== h || n.scrollState.dirY !== p) && (Eo(n), n.scrollState.dirX = h, n.scrollState.dirY = p), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && kc(n, r, {
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
  } = t, [i, l] = Ie(t.focusable), a = xe(nt), c = Q(a, "focusCell"), d = Q(a, "search"), u = Q(a, "reorder"), h = _(
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
  function m(S, C) {
    let M = "wx-cell";
    return M += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", M += S ? " " + S(n) : "", M += C ? " " + C(e, n) : "", M += n.treetoggle ? " wx-tree-cell" : "", M;
  }
  const f = _(
    () => m(s, r),
    [s, r, n, e]
  ), w = _(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = F(null);
  Y(() => {
    x.current && i && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, i, e.id, n.id]);
  const y = R(() => {
    i && !c && a.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [a, i, c, e.id, n.id]);
  Y(() => () => {
    i && c && (a.exec("focus-cell", { eventSource: "destroy" }), l(!1));
  }, [a, l]);
  function k(S) {
    const C = new RegExp(`(${d.value.trim()})`, "gi");
    return String(S).split(C).map((M) => ({ text: M, highlight: C.test(M) }));
  }
  const v = _(() => {
    const S = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, C = n.fixed && n.fixed.right;
    return [
      f,
      S ? "wx-shadow" : "",
      C ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [f, n]), N = n.cell;
  return /* @__PURE__ */ j(
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
        n.treetoggle ? /* @__PURE__ */ j(Ce, { children: [
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
            onAction: ({ action: S, data: C }) => a.exec(S, C)
          }
        ) : o ? o() : h ? /* @__PURE__ */ g("span", { children: k(yt(e, n)).map(
          ({ highlight: S, text: C }, M) => S ? /* @__PURE__ */ g("mark", { className: "wx-TSCaXsGV wx-search", children: C }, M) : /* @__PURE__ */ g("span", { children: C }, M)
        ) }) : yt(e, n)
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
    on,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Nc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = xe(nt), o = Q(s, "flatData"), i = _(
    () => t?.config?.options || e?.options || a(),
    [t, e, o]
  ), l = _(() => t?.config?.template, [t]);
  function a() {
    const u = [];
    return o.forEach((h) => {
      const p = Tt(h, e);
      u.includes(p) || u.push(p);
    }), u.map((h) => ({ id: h, label: h }));
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
  const n = xe(nt), r = Q(n, "filterValues");
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
  } = t, c = xe(nt), d = Q(c, "sortMarks"), u = _(() => d ? d[n.id] : void 0, [d, n.id]), h = F(), p = R(
    (T) => {
      h.current = e.flexgrow ? T.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = R(
    (T, V) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + T),
        inProgress: V
      });
    },
    [c, e.id]
  ), f = R((T) => m(T, !0), [m]), w = R((T) => m(T, !1), [m]), x = R(
    (T) => {
      if (!n.sort || e.filter) return;
      let V = u?.order;
      V && (V = V === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: T.ctrlKey, order: V });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = R(
    (T) => {
      T && T.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), k = R(
    (T) => {
      T.key === "Enter" && y();
    },
    [y]
  ), v = R(
    (T) => {
      T.key === "Enter" && !e.filter && x(T);
    },
    [x, e.filter]
  ), N = _(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), S = _(
    () => N && !a && e.collapsible !== "header",
    [N, a, e.collapsible]
  ), C = _(
    () => S ? { top: -l / 2, position: "absolute" } : {},
    [S, l]
  ), M = _(
    () => Hn(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (N && S ? l : 0)
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
      S,
      l
    ]
  ), O = _(
    () => Io(n, e, i),
    [n, e, i]
  ), b = R(() => Object.fromEntries(
    Object.entries(e).filter(([T]) => T !== "cell")
  ), [e]), I = `wx-cell ${O} ${e.css || ""} wx-collapsed`, A = [
    "wx-cell",
    O,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = F(null);
  return Y(() => {
    const T = H.current;
    if (!T) return;
    const V = ps(T, { down: p, move: f, up: w });
    return () => {
      typeof V == "function" && V();
    };
  }, [p, f, w, ps]), N ? /* @__PURE__ */ g(
    "div",
    {
      className: "wx-RsQD74qC " + I,
      style: M,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: k,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-text", style: C, children: e.text || "" })
    }
  ) : /* @__PURE__ */ j(
    "div",
    {
      className: "wx-RsQD74qC " + A,
      style: M,
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
          const T = e.cell;
          return /* @__PURE__ */ g(
            T,
            {
              api: c,
              cell: b(),
              column: n,
              row: r,
              onAction: ({ action: V, data: ne }) => c.exec(V, ne)
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
        o ? /* @__PURE__ */ g("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ j(Ce, { children: [
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
  const s = xe(nt), o = _(
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
  ), l = R(() => Object.fromEntries(
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
  const i = xe(nt), l = Q(i, "_sizes"), a = Q(i, "split"), c = _(() => l?.[`${r}RowHeights`], [l, r]), d = _(() => {
    let f = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        f.push([]), n.forEach((k, v) => {
          const N = { ...k[r][x] };
          if (y || f[x].push(N), N.colspan > 1) {
            if (y = N.colspan - 1, !bo() && k.right) {
              let S = k.right;
              for (let C = 1; C < N.colspan; C++)
                S -= n[v + C].width;
              N.right = S;
            }
          } else y && y--;
        });
      }
    }
    return f;
  }, [n, r]), u = _(() => a?.left || a?.right, [a]);
  function h(f) {
    return n.find((w) => w.id === f);
  }
  function p(f, w) {
    let x = w;
    return f.rowspan && (x += f.rowspan - 1), x === d.length - 1;
  }
  function m(f, w, x) {
    if (!x.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const k = x.header[y];
      if (!k.filter && !k._hidden) return w === y;
    }
    return p(f, w);
  }
  return /* @__PURE__ */ g(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((f, w) => /* @__PURE__ */ g(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[w]}px`, display: "flex" },
          role: "row",
          children: f.map((x) => {
            const y = h(x.id);
            return r === "header" ? /* @__PURE__ */ g(
              Mc,
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
function Rc({ overlay: t }) {
  const e = xe(nt);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ g("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ g(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Ic(t) {
  const { actions: e, editor: n } = t, [r, s] = G(n?.value || ""), o = F(null);
  Y(() => {
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
  const [r, s] = G(e?.value), [o, i] = G(e?.renderedValue), [l, a] = G(e?.options || []), c = _(() => e?.config?.template, [e]), d = _(() => e?.config?.cell, [e]), u = _(() => (l || []).findIndex((y) => y.id === r), [l, r]), h = F(null), p = F(null), m = R(
    (y) => {
      h.current = y.navigate, p.current = y.keydown, h.current(u);
    },
    [u, h]
  ), f = R(
    (y) => {
      const k = y?.target?.value ?? "";
      i(k);
      const v = k ? (e?.options || []).filter(
        (N) => (N.label || "").toLowerCase().includes(k.toLowerCase())
      ) : e?.options || [];
      a(v), v.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), w = F(null);
  Y(() => {
    w.current && w.current.focus();
  }, []), Y(() => {
    s(e?.value), i(e?.renderedValue), a(e?.options || []);
  }, [e]);
  const x = R(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: w,
        value: o ?? "",
        onChange: f,
        onKeyDown: (y) => p.current ? p.current(y, u) : void 0
      }
    ),
    /* @__PURE__ */ g(
      Mn,
      {
        items: l,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ g(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Hc({ actions: t, editor: e, onAction: n }) {
  const [r] = G(() => e.value || /* @__PURE__ */ new Date()), [s] = G(() => e.config?.template), [o] = G(() => e.config?.cell);
  function i({ value: a }) {
    t.updateValue(a), t.save();
  }
  const l = F(null);
  return Y(() => {
    l.current && l.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ j(Ce, { children: [
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
    /* @__PURE__ */ g(Gt, { width: "auto", children: /* @__PURE__ */ g(
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
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = G(
    n.options.find((f) => f.id === n.value)
  ), [i] = G(n.value), [l] = G(n.options), a = _(
    () => l.findIndex((f) => f.id === i),
    [l, i]
  );
  function c({ id: f }) {
    e.updateValue(f), e.save();
  }
  let d;
  const [u, h] = G();
  function p(f) {
    d = f.navigate, h(() => f.keydown), d(a);
  }
  const m = F(null);
  return Y(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        ref: m,
        className: "wx-ywGRk611 wx-value",
        tabIndex: 0,
        onClick: () => e.cancel(),
        onKeyDown: (f) => {
          u(f, a), f.preventDefault();
        },
        children: s.template ? s.template(o) : s.cell ? (() => {
          const f = s.cell;
          return /* @__PURE__ */ g(f, { data: o, onAction: r });
        })() : /* @__PURE__ */ g("span", { className: "wx-ywGRk611 wx-text", children: n.renderedValue })
      }
    ),
    /* @__PURE__ */ g(Mn, { items: l, onReady: p, onSelect: c, children: ({ option: f }) => s.template ? s.template(f) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ g(w, { data: f, onAction: r });
    })() : f.label })
  ] });
}
const zc = {
  text: Ic,
  combo: Ac,
  datepicker: Hc,
  richselect: Lc
};
function Fc({ column: t, row: e }) {
  const n = xe(nt), r = Q(n, "editor"), s = R(
    (m, f) => {
      n.exec("close-editor", { ignore: m }), f && n.exec("focus-cell", {
        ...f,
        eventSource: "click"
      });
    },
    [n]
  ), o = R(
    (m) => {
      const f = m ? null : { row: r?.id, column: r?.column };
      s(!1, f);
    },
    [r, s]
  ), i = R(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), l = R(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), a = R(
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
    let f = typeof m == "string" ? m : m.type;
    return zc[f];
  }, [t, e]), u = F(null);
  Y(() => {
    if (!u.current) return;
    const m = tn(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), Y(() => {
    u.current && typeof c == "string" && u.current.setAttribute("style", c);
  }, [c]);
  const h = typeof e.$parent < "u" ? "gridcell" : "cell", p = typeof e.$parent < "u" ? !t.editor : void 0;
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-8l724t2g wx-cell wx-editor",
      ref: u,
      style: typeof c == "object" && c !== null ? c : void 0,
      role: h,
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
          onAction: ({ action: m, data: f }) => n.exec(m, f)
        }
      ) : null
    }
  );
}
function ms(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = xe(nt), { filterValues: o, _columns: i, _sizes: l } = s.getState();
  function a(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ g(Ce, { children: e.map((c, d) => /* @__PURE__ */ g("tr", { children: c.map((u) => {
    const h = i.find((f) => f.id == u.id), p = `wx-print-cell-${n}${a(h)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
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
              Object.entries(u).filter(([f]) => f !== "cell")
            ),
            column: h,
            row: d
          }
        ) : u.filter ? /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-print-filter", children: Da(o, i, u) }) : /* @__PURE__ */ g("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Oc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: l } = t, a = xe(nt), { flatData: c, _sizes: d } = a.getState(), u = o && ls(e, "header", d.headerRowHeights), h = i && ls(e, "footer", d.footerRowHeights);
  function p(f, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(f, w) : "", x;
  }
  function m(f, w) {
    return typeof w.draggable == "function" ? w.draggable(f, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ j(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((f) => f.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ g("thead", { children: /* @__PURE__ */ g(
          ms,
          {
            columns: u,
            type: "header",
            columnStyle: r
          }
        ) }) : null,
        /* @__PURE__ */ g("tbody", { children: c.map((f, w) => /* @__PURE__ */ g(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(f) : ""),
            style: { height: `${f.rowHeight || d.rowHeight}px` },
            children: e.map(
              (x) => x.collapsed ? null : /* @__PURE__ */ j(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${p(f, x)}`,
                  style: _s(
                    ko(x, d.columnWidth)
                  ),
                  children: [
                    l && x.draggable ? /* @__PURE__ */ g("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(f, x) ? /* @__PURE__ */ g("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ j(Ce, { children: [
                      /* @__PURE__ */ g(
                        "span",
                        {
                          style: { marginLeft: f.$level * 28 + "px" }
                        }
                      ),
                      f.$count ? /* @__PURE__ */ g(
                        "i",
                        {
                          className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${f.open !== !1 ? "down" : "right"}`
                        }
                      ) : null
                    ] }) : null,
                    x.cell ? (() => {
                      const y = x.cell;
                      return /* @__PURE__ */ g(y, { api: a, row: f, column: x });
                    })() : /* @__PURE__ */ g("span", { children: yt(f, x) })
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
            columns: h,
            type: "footer",
            columnStyle: r
          }
        ) }) : null
      ]
    }
  );
}
function Wc(t) {
  const { config: e, ...n } = t, r = xe(nt), { _skin: s, _columns: o } = r.getState(), i = _(() => _a(o, e), []), l = F(null);
  return Y(() => {
    const a = document.body;
    a.classList.add("wx-print");
    const c = l.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    a.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, h = document.createElement("style");
    h.setAttribute("type", "text/css"), h.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(h), h.appendChild(document.createTextNode(u)), window.print(), h.remove(), a.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ g(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: l,
      children: i.map((a, c) => /* @__PURE__ */ g("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ g(Oc, { columns: a, ...n }) }, c))
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
    clientHeight: h,
    responsiveLevel: p,
    hotkeys: m
  } = t, f = xe(nt), w = Q(f, "dynamic"), x = Q(f, "_columns"), y = Q(f, "flatData"), k = Q(f, "split"), v = Q(f, "_sizes"), [N, S] = bn(f, "selectedRows"), C = Q(f, "select"), M = Q(f, "editor"), O = Q(f, "tree"), b = Q(f, "focusCell"), I = Q(f, "_print"), A = Q(f, "undo"), H = Q(f, "reorder"), T = Q(f, "_rowHeightFromData"), [V, ne] = G(0);
  Y(() => {
    ne(we());
  }, []);
  const [le, U] = G(0), [L, Z] = G(0), D = _(() => (x || []).some((E) => !E.hidden && E.flexgrow), [x]), W = _(() => v?.rowHeight || 0, [v]), oe = F(null), [ee, pe] = G(null), [me, Re] = G(null), he = _(() => {
    let E = [], q = 0;
    return k && k.left && (E = (x || []).slice(0, k.left).filter((ie) => !ie.hidden).map((ie) => ({ ...ie })), E.forEach((ie) => {
      ie.fixed = { left: 1 }, ie.left = q, q += ie.width;
    }), E.length && (E[E.length - 1].fixed = { left: -1 })), { columns: E, width: q };
  }, [k, x]), B = _(() => {
    let E = [], q = 0;
    if (k && k.right) {
      E = (x || []).slice(k.right * -1).filter((ie) => !ie.hidden).map((ie) => ({ ...ie }));
      for (let ie = E.length - 1; ie >= 0; ie--) {
        const Ne = E[ie];
        Ne.fixed = { right: 1 }, Ne.right = q, q += Ne.width;
      }
      E.length && (E[0].fixed = { right: -1 });
    }
    return { columns: E, width: q };
  }, [k, x]), te = _(() => {
    const E = (x || []).slice(k?.left || 0, (x || []).length - (k?.right ?? 0)).filter((q) => !q.hidden);
    return E.forEach((q) => {
      q.fixed = 0;
    }), E;
  }, [x, k]), de = _(() => (x || []).reduce((E, q) => (q.hidden || (E += q.width), E), 0), [x]), Oe = 1;
  function Ke(E, q, ie) {
    let Ne = q, ze = E;
    if (te.length) {
      let Te = te.length;
      for (let ge = E; ge >= 0; ge--)
        te[ge][ie].forEach((Fe) => {
          Fe.colspan > 1 && ge > E - Fe.colspan && ge < Te && (Te = ge);
        });
      if (Te !== te.length && Te < E) {
        for (let ge = Te; ge < E; ge++)
          Ne -= te[ge].width;
        ze = Te;
      }
    }
    return { index: ze, delta: Ne };
  }
  const $e = _(() => {
    let E, q, ie;
    const Ne = le, ze = le + (u || 0);
    let Te = 0, ge = 0, Fe = 0, st = 0;
    te.forEach((bt, Ht) => {
      Ne > Fe && (Te = Ht, st = Fe), Fe = Fe + bt.width, ze > Fe && (ge = Ht + Oe);
    });
    const ct = { header: 0, footer: 0 };
    for (let bt = ge; bt >= Te; bt--)
      ["header", "footer"].forEach((Ht) => {
        te[bt] && te[bt][Ht].forEach((Lo) => {
          const zn = Lo.colspan;
          if (zn && zn > 1) {
            const Dr = zn - (ge - bt + 1);
            Dr > 0 && (ct[Ht] = Math.max(ct[Ht], Dr));
          }
        });
      });
    const Ye = Ke(Te, st, "header"), dt = Ke(Te, st, "footer"), Bt = Ye.delta, cn = Ye.index, dn = dt.delta, Ln = dt.index;
    return D && de > (u || 0) ? E = q = ie = [...he.columns, ...te, ...B.columns] : (E = [
      ...he.columns,
      ...te.slice(Te, ge + 1),
      ...B.columns
    ], q = [
      ...he.columns,
      ...te.slice(cn, ge + ct.header + 1),
      ...B.columns
    ], ie = [
      ...he.columns,
      ...te.slice(Ln, ge + ct.footer + 1),
      ...B.columns
    ]), {
      data: E || [],
      header: q || [],
      footer: ie || [],
      d: st,
      df: dn,
      dh: Bt
    };
  }, [
    te,
    he,
    B,
    le,
    u,
    D,
    de
  ]), He = _(
    () => e && v?.headerHeight || 0,
    [e, v]
  ), Le = _(
    () => n && v?.footerHeight || 0,
    [n, v]
  ), ye = _(() => u && h ? de >= u : !1, [u, h, de]), P = _(() => (h || 0) - He - Le - (ye ? V : 0), [h, He, Le, ye, V]), ue = _(() => Math.ceil((P || 0) / (W || 1)) + 1, [P, W]), be = F([]), [se, Me] = G(0), [tt, kt] = G(void 0), We = _(() => {
    let E = 0, q = 0;
    const ie = 2;
    if (c) {
      let Te = L;
      for (; Te > 0; )
        Te -= be.current[E] || W, E++;
      q = L - Te;
      for (let ge = Math.max(0, E - ie - 1); ge < E; ge++)
        q -= be.current[E - ge] || W;
      E = Math.max(0, E - ie);
    } else {
      if (T) {
        let Te = 0, ge = 0;
        for (let Ye = 0; Ye < (y || []).length; Ye++) {
          const dt = y[Ye].rowHeight || W;
          if (ge + dt > L) {
            Te = Ye;
            break;
          }
          ge += dt;
        }
        E = Math.max(0, Te - ie);
        for (let Ye = 0; Ye < E; Ye++)
          q += y[Ye].rowHeight || W;
        let Fe = 0, st = 0;
        for (let Ye = Te + 1; Ye < (y || []).length; Ye++) {
          const dt = y[Ye].rowHeight || W;
          if (Fe++, st + dt > P)
            break;
          st += dt;
        }
        const ct = Math.min(
          w ? w.rowCount : (y || []).length,
          Te + Fe + ie
        );
        return { d: q, start: E, end: ct };
      }
      E = Math.floor(L / (W || 1)), E = Math.max(0, E - ie), q = E * (W || 0);
    }
    const Ne = w ? w.rowCount : (y || []).length, ze = Math.min(Ne, E + (ue || 0) + ie);
    return { d: q, start: E, end: ze };
  }, [c, T, L, W, w, y, ue, P]), Pe = _(() => {
    const E = w ? w.rowCount : (y || []).length;
    if (c)
      return se + We.d + (E - (tt || 0)) * (W || 0);
    if (!T)
      return E * (W || 0);
    let q = 0;
    for (let ie = 0; ie < E; ie++)
      q += y[ie]?.rowHeight || W;
    return q;
  }, [
    w,
    y,
    W,
    c,
    T,
    se,
    We.d,
    tt
  ]), Be = _(() => u && h ? Pe + He + Le >= h - (de >= (u || 0) ? V : 0) : !1, [
    u,
    h,
    Pe,
    He,
    Le,
    de,
    V
  ]), rt = _(() => D && de <= (u || 0) ? (u || 0) - 0 - (Be ? V : 0) : de, [D, de, u, Be, V, ye]), z = _(() => D && de <= (u || 0) ? u || 0 : rt < (u || 0) ? de + (Be ? V : 0) : -1, [D, de, u, rt, Be, V]), X = F({});
  Y(() => {
    if (w && (X.current.start !== We.start || X.current.end !== We.end)) {
      const { start: E, end: q } = We;
      X.current = { start: E, end: q }, f && f.exec && f.exec("request-data", { row: { start: E, end: q } });
    }
  }, [w, We, f]);
  const J = _(() => w ? y || [] : (y || []).slice(We.start, We.end), [w, y, We]), ae = _(() => (N || []).filter(
    (E) => (J || []).some((q) => q.id === E)
  ), [S, J]), Se = _(() => We.start, [We.start]), _e = R((E) => {
    Z(E.target.scrollTop), U(E.target.scrollLeft);
  }, []), Ae = R((E) => {
    E.shiftKey && E.preventDefault(), oe.current && oe.current.focus && oe.current.focus();
  }, []), je = R(() => !!(x || []).find((E) => !!E.draggable), [x]), Rt = F(null), ft = F(null), $ = F({
    dblclick: (E, q) => {
      const ie = { id: E, column: qn(q, "data-col-id") };
      f.exec("open-editor", ie);
    },
    click: (E, q) => {
      if (Rt.current) return;
      const ie = qn(q, "data-col-id");
      if (b?.id !== E && f.exec("focus-cell", {
        row: E,
        column: ie,
        eventSource: "click"
      }), C === !1) return;
      const Ne = s && q.ctrlKey, ze = s && q.shiftKey;
      (Ne || N.length > 1 || !N.includes(E)) && f.exec("select-row", { id: E, toggle: Ne, range: ze });
    },
    "toggle-row": (E) => {
      const q = f.getRow(E);
      f.exec(q.open !== !1 ? "close-row" : "open-row", { id: E });
    },
    "ignore-click": () => !1
  }), K = _(() => ({
    top: He,
    bottom: Le,
    left: he.width,
    xScroll: ye,
    yScroll: Be,
    sense: c && me ? me.offsetHeight : Math.max(v?.rowHeight || 0, 40),
    node: oe.current && oe.current.firstElementChild
  }), [
    He,
    Le,
    he.width,
    ye,
    Be,
    c,
    me,
    v
  ]);
  function re(E, q) {
    const { container: ie, sourceNode: Ne, from: ze } = q;
    if (je() && !Ne.getAttribute("draggable-data"))
      return !1;
    pe(ze), f.getRow(ze).open && f.exec("close-row", { id: ze, nested: !0 });
    const Te = qe(Ne, "data-id"), ge = Te.cloneNode(!0);
    ge.classList.remove("wx-selected"), ge.querySelectorAll("[tabindex]").forEach((Ye) => Ye.setAttribute("tabindex", "-1")), ie.appendChild(ge), Re(ge);
    const Fe = le - $e.d, st = Be ? V : 0;
    ie.style.width = Math.min(
      (u || 0) - st,
      D && de <= (u || 0) ? rt : rt - st
    ) + Fe + "px";
    const ct = vn(Te);
    q.offset = {
      x: Fe,
      y: -Math.round(ct.height / 2)
    }, ft.current || (ft.current = E.clientY);
  }
  function fe(E, q) {
    const { from: ie } = q, Ne = q.pos, ze = vn(oe.current);
    Ne.x = ze.x;
    const Te = K.top;
    if (Ne.y < Te) Ne.y = Te;
    else {
      const ge = ze.height - (ye && V > 0 ? V : Math.round(K.sense / 2)) - K.bottom;
      Ne.y > ge && (Ne.y = ge);
    }
    if (oe.current.contains(q.targetNode)) {
      const ge = qe(q.targetNode, "data-id"), Fe = Vt(ge?.getAttribute("data-id"));
      if (Fe && Fe !== ie) {
        q.to = Fe;
        const st = c ? me?.offsetHeight : v?.rowHeight;
        if (me && (L === 0 || Ne.y > Te + st - 1)) {
          const ct = ge.getBoundingClientRect(), Ye = vn(me).y, dt = ct.y, Bt = Ye > dt ? -1 : 1, cn = Bt === 1 ? "after" : "before", dn = Math.abs(f.getRowIndex(ie) - f.getRowIndex(Fe)), Ln = dn !== 1 ? cn === "before" ? "after" : "before" : cn;
          if (dn === 1 && (Bt === -1 && E.clientY > ft.current || Bt === 1 && E.clientY < ft.current))
            return;
          ft.current = E.clientY, f.exec("move-item", {
            id: ie,
            target: Fe,
            mode: Ln,
            inProgress: !0
          });
        }
      }
      o && o({ event: E, context: q });
    }
    vc(E, ze, q, K);
  }
  function ce(E, q) {
    const { from: ie, to: Ne } = q;
    f.exec("move-item", {
      id: ie,
      target: Ne,
      inProgress: !1
    }), Rt.current = setTimeout(() => {
      Rt.current = 0;
    }, 1), pe(null), Re(null), ft.current = null, Eo(q);
  }
  function we() {
    const E = document.createElement("div");
    E.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(E);
    const q = E.offsetWidth - E.clientWidth;
    return document.body.removeChild(E), q;
  }
  const ke = _(() => z > 0 ? { width: `${z}px` } : void 0, [z]), De = F(null);
  function Ee() {
    Promise.resolve().then(() => {
      let E = 0, q = Se;
      const ie = De.current;
      ie && (Array.from(ie.children).forEach((Ne, ze) => {
        be.current[Se + ze] = Ne.offsetHeight, E += Ne.offsetHeight, q++;
      }), Me(E), kt(q));
    });
  }
  Y(() => {
    J && c && Ee();
  }, [J, c, Se]);
  let [Ve, lt] = G();
  Y(() => {
    if (b && (!C || !ae.length || ae.includes(b.row)))
      lt({ ...b });
    else if (J.length && $e.data.length) {
      if (!Ve || ae.length && !ae.includes(Ve.row) || J.findIndex((E) => E.id == Ve.row) === -1 || $e.data.findIndex(
        (E) => E.id == Ve.column && !E.collapsed
      ) === -1) {
        const E = ae[0] || J[0].id, q = $e.data.findIndex((ie) => !ie.collapsed);
        lt(q !== -1 ? { row: E, column: $e.data[q].id } : null);
      }
    } else lt(null);
  }, [b]);
  const an = F(null);
  Y(() => {
    const E = oe.current;
    if (!E) return;
    const q = pc(E, d);
    return () => {
      typeof q == "function" && q();
    };
  }, [d]);
  const jt = F({});
  Object.assign(jt.current, {
    start: re,
    move: fe,
    end: ce,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: je() })
  }), Y(() => {
    const E = oe.current;
    return E ? wc(E, jt).destroy : void 0;
  }, [H, oe.current]), Y(() => {
    const E = oe.current;
    return E ? Cr(E, {
      keys: m !== !1 && {
        ...Xa,
        "ctrl+z": A,
        "ctrl+y": A,
        ...m
      },
      exec: (q) => f.exec("hotkey", q)
    }).destroy : void 0;
  }, [f, A, m]);
  const Ue = F({
    scroll: f.getReactiveState().scroll
  });
  Ue.current.getWidth = () => (u || 0) - (Be ? V : 0), Ue.current.getHeight = () => P, Ue.current.getScrollMargin = () => he.width + B.width, Y(() => {
    qa(an.current, Ue.current);
  }, []);
  const It = F(null);
  Y(() => {
    const E = It.current;
    if (!E) return;
    const q = [];
    return q.push(
      tn(E, () => f.exec("focus-cell", { eventSource: "click" })).destroy
    ), q.push(ri(E, $.current)), () => q.forEach((ie) => ie());
  }, []);
  const At = `wx-grid ${p ? `wx-responsive-${p}` : ""}`;
  return /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g(
      "div",
      {
        className: "wx-4VuBwK2D " + At,
        style: {
          "--header-height": `${He}px`,
          "--footer-height": `${Le}px`,
          "--split-left-width": `${he.width}px`,
          "--split-right-width": `${B.width}px`
        },
        children: /* @__PURE__ */ g(
          "div",
          {
            ref: oe,
            className: "wx-4VuBwK2D wx-table-box",
            style: ke,
            role: O ? "treegrid" : "grid",
            "aria-colcount": $e.data.length,
            "aria-rowcount": J.length,
            "aria-multiselectable": O && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ j(
              "div",
              {
                ref: an,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: ye ? "scroll" : "hidden",
                  overflowY: Be ? "scroll" : "hidden"
                },
                onScroll: _e,
                children: [
                  e ? /* @__PURE__ */ g("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ g(
                    gs,
                    {
                      contentWidth: rt,
                      deltaLeft: $e.dh,
                      columns: $e.header,
                      columnStyle: l,
                      bodyHeight: P - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ j(
                    "div",
                    {
                      ref: It,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${rt}px`, height: `${Pe}px` },
                      onMouseDown: (E) => Ae(E),
                      children: [
                        r ? /* @__PURE__ */ g(Rc, { overlay: r }) : null,
                        /* @__PURE__ */ g(
                          "div",
                          {
                            ref: De,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${We.d}px`,
                              paddingLeft: `${$e.d}px`
                            },
                            children: J.map((E, q) => {
                              const ie = N.indexOf(E.id) !== -1, Ne = ee === E.id, ze = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(E) : "") + (ie ? " wx-selected" : "") + (Ne ? " wx-inactive" : ""), Te = c ? { minHeight: `${E.rowHeight || W}px` } : { height: `${E.rowHeight || W}px` };
                              return /* @__PURE__ */ g(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + ze,
                                  "data-id": E.id,
                                  "data-context-id": E.id,
                                  style: Te,
                                  role: "row",
                                  "aria-rowindex": q,
                                  "aria-expanded": E.open,
                                  "aria-level": O ? E.$level + 1 : void 0,
                                  "aria-selected": O ? ie : void 0,
                                  tabIndex: -1,
                                  children: $e.data.map((ge) => ge.collapsed ? /* @__PURE__ */ g(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    ge.id
                                  ) : M?.id === E.id && M.column == ge.id ? /* @__PURE__ */ g(Fc, { row: E, column: ge }, ge.id) : /* @__PURE__ */ g(
                                    _c,
                                    {
                                      row: E,
                                      column: ge,
                                      columnStyle: l,
                                      cellStyle: a,
                                      reorder: H,
                                      focusable: Ve?.row === E.id && Ve?.column == ge.id
                                    },
                                    ge.id
                                  ))
                                },
                                E.id
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
                      contentWidth: rt,
                      deltaLeft: $e.df,
                      columns: $e.footer,
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
      Wc,
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
const Vc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Yc = Dt(function({
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
  reorder: h = !1,
  onReorder: p = null,
  autoRowHeight: m = !1,
  sizes: f,
  split: w,
  tree: x = !1,
  autoConfig: y = !1,
  init: k = null,
  responsive: v = null,
  sortMarks: N,
  undo: S = !1,
  hotkeys: C = null,
  ...M
}, O) {
  const b = F();
  b.current = M;
  const I = _(() => new Ya(Cs), []), A = _(() => I.in, [I]), H = F(null);
  H.current === null && (H.current = new Is((he, B) => {
    const te = "on" + Vc(he);
    b.current && b.current[te] && b.current[te](B);
  }), A.setNext(H.current));
  const T = _(
    () => ({
      getState: I.getState.bind(I),
      getReactiveState: I.getReactive.bind(I),
      getStores: () => ({ data: I }),
      exec: A.exec,
      setNext: (he) => (H.current = H.current.setNext(he), H.current),
      intercept: A.intercept.bind(A),
      on: A.on.bind(A),
      detach: A.detach.bind(A),
      getRow: I.getRow.bind(I),
      getRowIndex: I.getRowIndex.bind(I),
      getColumn: I.getColumn.bind(I)
    }),
    [I, A]
  ), [V, ne] = G(0), [le, U] = G(0), [L, Z] = G(null), [D, W] = G(null), oe = _(() => {
    if (y && !e.length && t.length) {
      const he = t[0], B = [];
      for (let te in he)
        if (te !== "id" && te[0] !== "$") {
          let de = {
            id: te,
            header: te[0].toUpperCase() + te.slice(1)
          };
          typeof y == "object" && (de = { ...de, ...y }), B.push(de);
        }
      return B;
    }
    return (D && D.columns) ?? e;
  }, [y, e, t, D]), ee = _(
    () => (D && D.sizes) ?? f,
    [D, f]
  ), pe = R(
    (he) => {
      if (ne(he.width), U(he.height), v) {
        const B = Object.keys(v).map(Number).sort((te, de) => te - de).find((te) => he.width <= te) ?? null;
        B !== L && (W(v[B]), Z(B));
      }
    },
    [v, L]
  ), me = xe(et.theme), Re = F(0);
  return Y(() => {
    if (!Re.current)
      k && k(T);
    else {
      const he = I.getState();
      I.init({
        data: t,
        columns: oe,
        split: w || he.split,
        sizes: ee || he.sizes,
        selectedRows: o || he.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: N || he.sortMarks,
        undo: S,
        reorder: h,
        _skin: me,
        _select: i
      });
    }
    Re.current++;
  }, [
    I,
    t,
    oe,
    w,
    ee,
    o,
    d,
    x,
    N,
    S,
    h,
    me,
    i,
    k,
    T
  ]), Re.current === 0 && I.init({
    data: t,
    columns: oe,
    split: w || { left: 0 },
    sizes: ee || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: N || {},
    undo: S,
    reorder: h,
    _skin: me,
    select: i
  }), Mt(
    O,
    () => ({
      ...T
    }),
    [T]
  ), /* @__PURE__ */ g(nt.Provider, { value: T, children: /* @__PURE__ */ g(En, { words: Ja, optional: !0, children: /* @__PURE__ */ g(
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
      clientWidth: V,
      clientHeight: le,
      responsiveLevel: L,
      resize: pe,
      hotkeys: C
    }
  ) }) });
});
function Gc({ item: t }) {
  return /* @__PURE__ */ j(
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
ur(Je);
function jc({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ j("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
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
  } = t, [c, d] = Ie(o), [u, h] = G(), p = xe(et.i18n), m = _(() => p.getGroup("gantt"), [p]), f = xe(vt), w = Q(f, "scrollTop"), x = Q(f, "cellHeight"), y = Q(f, "_scrollTask"), k = Q(f, "_selected"), v = Q(f, "area"), N = Q(f, "_tasks"), S = Q(f, "_scales"), C = Q(f, "columns"), M = Q(f, "_sort"), O = Q(f, "calendar"), b = Q(f, "durationUnit"), I = Q(f, "splitTasks"), [A, H] = G(null), T = _(() => !N || !v ? [] : N.slice(v.start, v.end), [N, v]), V = R(
    (z, X) => {
      if (X === "add-task")
        f.exec(X, {
          target: z,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (X === "open-task") {
        const J = T.find((ae) => ae.id === z);
        (J?.data || J?.lazy) && f.exec(X, { id: z, mode: !J.open });
      }
    },
    [T]
  ), ne = R(
    (z) => {
      const X = _t(z), J = z.target.dataset.action;
      J && z.preventDefault(), X ? J === "add-task" || J === "open-task" ? V(X, J) : f.exec("select-task", {
        id: X,
        toggle: z.ctrlKey || z.metaKey,
        range: z.shiftKey,
        show: !0
      }) : J === "add-task" && V(null, J);
    },
    [f, V]
  ), le = F(null), U = F(null), [L, Z] = G(0), [D, W] = G(!1);
  Y(() => {
    const z = U.current;
    if (!z || typeof ResizeObserver > "u") return;
    const X = () => Z(z.clientWidth);
    X();
    const J = new ResizeObserver(X);
    return J.observe(z), () => J.disconnect();
  }, []);
  const oe = F(null), ee = R(
    (z) => {
      const X = z.id, { before: J, after: ae } = z, Se = z.onMove;
      let _e = J || ae, Ae = J ? "before" : "after";
      if (Se) {
        if (Ae === "after") {
          const je = f.getTask(_e);
          je.data?.length && je.open && (Ae = "before", _e = je.data[0].id);
        }
        oe.current = { id: X, [Ae]: _e };
      } else oe.current = null;
      f.exec("move-task", {
        id: X,
        mode: Ae,
        target: _e,
        inProgress: Se
      });
    },
    [f]
  ), pe = _(() => v?.from ?? 0, [v]), me = _(() => S?.height ?? 0, [S]), Re = _(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (L ?? 0), [n, s, c, r, L]), he = _(() => {
    const z = {};
    return Re && s === "all" || s === "grid" && Re ? z.width = c : s === "grid" && (z.width = "100%"), z;
  }, [Re, s, c]), B = _(() => A && !T.find((z) => z.id === A.id) ? [...T, A] : T, [T, A]), te = _(() => {
    if (!l || !a) return B;
    const z = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set();
    return B.forEach((J) => {
      const ae = a.taskRows.get(J.id) ?? J.id;
      X.has(ae) || (z.set(ae, {
        ...J,
        $rowTasks: a.rowMap.get(ae) || [J.id]
      }), X.add(ae));
    }), Array.from(z.values());
  }, [B, l, a]), de = _(() => {
    let z = (C || []).map((ae) => {
      ae = { ...ae };
      const Se = ae.header;
      if (typeof Se == "object") {
        const _e = Se.text && m(Se.text);
        ae.header = { ...Se, text: _e };
      } else ae.header = m(Se);
      return ae;
    });
    const X = z.findIndex((ae) => ae.id === "text"), J = z.findIndex((ae) => ae.id === "add-task");
    if (X !== -1 && (z[X].cell && (z[X]._cell = z[X].cell), z[X].cell = jc), J !== -1) {
      z[J].cell = z[J].cell || ws;
      const ae = z[J].header;
      if (typeof ae != "object" && (z[J].header = { text: ae }), z[J].header.cell = ae.cell || ws, e)
        z.splice(J, 1);
      else if (n) {
        const [Se] = z.splice(J, 1);
        z.unshift(Se);
      }
    }
    return z.length > 0 && (z[z.length - 1].resize = !1), z;
  }, [C, m, e, n]), Oe = _(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : de.find((z) => z.id === "add-task") ? "50px" : "0", [s, r, de]), Ke = _(() => {
    if (te && M?.length) {
      const z = {};
      return M.forEach(({ key: X, order: J }, ae) => {
        z[X] = {
          order: J,
          ...M.length > 1 && { index: ae }
        };
      }), z;
    }
    return {};
  }, [te, M]), $e = R(() => de.some((z) => z.flexgrow && !z.hidden), []), He = _(() => $e(), [$e, D]), Le = _(() => {
    let z = s === "chart" ? de.filter((J) => J.id === "add-task") : de;
    const X = s === "all" ? r : L;
    if (!He) {
      let J = c, ae = !1;
      if (de.some((Se) => Se.$width)) {
        let Se = 0;
        J = de.reduce((_e, Ae) => (Ae.hidden || (Se += Ae.width, _e += Ae.$width || Ae.width), _e), 0), Se > J && J > X && (ae = !0);
      }
      if (ae || J < X) {
        let Se = 1;
        return ae || (Se = (X - 50) / (J - 50 || 1)), z.map((_e) => (_e.id !== "add-task" && !_e.hidden && (_e.$width || (_e.$width = _e.width), _e.width = _e.$width * Se), _e));
      }
    }
    return z;
  }, [s, de, He, c, r, L]), ye = R(
    (z) => {
      if (!$e()) {
        const X = Le.reduce((J, ae) => (z && ae.$width && (ae.$width = ae.width), J + (ae.hidden ? 0 : ae.width)), 0);
        X !== c && d(X);
      }
      W(!0), W(!1);
    },
    [$e, Le, c, d]
  ), P = R(() => {
    de.filter((X) => X.flexgrow && !X.hidden).length === 1 && de.forEach((X) => {
      X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
    });
  }, []), ue = R(
    (z) => {
      if (!e) {
        const X = _t(z), J = qn(z, "data-col-id");
        !(J && de.find((Se) => Se.id == J))?.editor && X && f.exec("show-editor", { id: X });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), be = _(
    () => Array.isArray(k) ? k.map((z) => z.id) : [],
    [k]
  ), se = R(() => {
    if (le.current && te !== null) {
      const z = le.current.querySelector(".wx-body");
      z && (z.style.top = -((w ?? 0) - (pe ?? 0)) + "px");
    }
    U.current && (U.current.scrollTop = 0);
  }, [te, w, pe]);
  Y(() => {
    le.current && se();
  }, [w, pe, se]), Y(() => {
    const z = le.current;
    if (!z) return;
    const X = z.querySelector(".wx-table-box .wx-body");
    if (!X || typeof ResizeObserver > "u") return;
    const J = new ResizeObserver(() => {
      se();
    });
    return J.observe(X), () => {
      J.disconnect();
    };
  }, [Le, he, s, Oe, te, se]), Y(() => {
    if (!y || !u) return;
    const { id: z } = y, X = u.getState().focusCell;
    X && X.row !== z && le.current && le.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: z,
      column: X.column
    });
  }, [y, u]);
  const Me = R(
    ({ id: z }) => {
      if (e) return !1;
      f.getTask(z).open && f.exec("open-task", { id: z, mode: !1 });
      const X = f.getState()._tasks.find((J) => J.id === z);
      if (H(X || null), !X) return !1;
    },
    [f, e]
  ), tt = R(
    ({ id: z, top: X }) => {
      oe.current ? ee({ ...oe.current, onMove: !1 }) : f.exec("drag-task", {
        id: z,
        top: X + (pe ?? 0),
        inProgress: !1
      }), H(null);
    },
    [f, ee, pe]
  ), kt = R(
    ({ id: z, top: X, detail: J }) => {
      J && ee({ ...J, onMove: !0 }), f.exec("drag-task", {
        id: z,
        top: X + (pe ?? 0),
        inProgress: !0
      });
    },
    [f, ee, pe]
  );
  Y(() => {
    const z = le.current;
    return z ? Za(z, {
      start: Me,
      end: tt,
      move: kt,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, Me, tt, kt]);
  const We = R(
    (z) => {
      const { key: X, isInput: J } = z;
      if (!J && (X === "arrowup" || X === "arrowdown"))
        return z.eventSource = "grid", f.exec("hotkey", z), !1;
      if (X === "enter") {
        const ae = u?.getState().focusCell;
        if (ae) {
          const { row: Se, column: _e } = ae;
          _e === "add-task" ? V(Se, "add-task") : _e === "text" && V(Se, "open-task");
        }
      }
    },
    [f, V, u]
  ), Pe = F(null), Be = () => {
    Pe.current = {
      setTableAPI: h,
      handleHotkey: We,
      sortVal: M,
      api: f,
      adjustColumns: P,
      setColumnWidth: ye,
      tasks: T,
      calendarVal: O,
      durationUnitVal: b,
      splitTasksVal: I,
      onTableAPIChange: i
    };
  };
  Be(), Y(() => {
    Be();
  }, [
    h,
    We,
    M,
    f,
    P,
    ye,
    T,
    O,
    b,
    I,
    i
  ]);
  const rt = R((z) => {
    h(z), z.intercept("hotkey", (X) => Pe.current.handleHotkey(X)), z.intercept("scroll", () => !1), z.intercept("select-row", () => !1), z.intercept("sort-rows", (X) => {
      const J = Pe.current.sortVal, { key: ae, add: Se } = X, _e = J ? J.find((je) => je.key === ae) : null;
      let Ae = "asc";
      return _e && (Ae = !_e || _e.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: ae,
        order: Ae,
        add: Se
      }), !1;
    }), z.on("resize-column", () => {
      Pe.current.setColumnWidth(!0);
    }), z.on("hide-column", (X) => {
      X.mode || Pe.current.adjustColumns(), Pe.current.setColumnWidth();
    }), z.intercept("update-cell", (X) => {
      const { id: J, column: ae, value: Se } = X, _e = Pe.current.tasks.find((Ae) => Ae.id === J);
      if (_e) {
        const Ae = { ..._e };
        let je = Se;
        je && !isNaN(je) && !(je instanceof Date) && (je *= 1), Ae[ae] = je, fo(
          Ae,
          {
            calendar: Pe.current.calendarVal,
            durationUnit: Pe.current.durationUnitVal,
            splitTasks: Pe.current.splitTasksVal
          },
          ae
        ), f.exec("update-task", {
          id: J,
          task: Ae
        });
      }
      return !1;
    }), i && i(z);
  }, []);
  return /* @__PURE__ */ g(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Oe}` },
      ref: U,
      children: /* @__PURE__ */ g(
        "div",
        {
          ref: le,
          style: he,
          className: "wx-rHj6070p wx-table",
          onClick: ne,
          onDoubleClick: ue,
          children: /* @__PURE__ */ g(
            Yc,
            {
              init: rt,
              sizes: {
                rowHeight: x,
                headerHeight: (me ?? 0) - 1
              },
              rowStyle: (z) => z.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (z) => `wx-rHj6070p wx-text-${z.align}${z.id === "add-task" ? " wx-action" : ""}`,
              data: te,
              columns: Le,
              selectedRows: [...be],
              sortMarks: Ke
            }
          )
        }
      )
    }
  );
}
function Uc({ borders: t = "" }) {
  const e = xe(vt), n = Q(e, "cellWidth"), r = Q(e, "cellHeight"), s = F(null), [o, i] = G("#e4e4e4");
  Y(() => {
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
function Xc({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = xe(vt), s = Q(r, "_links"), o = Q(r, "criticalPath"), i = F(null), l = R(
    (a) => {
      const c = a?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return Y(() => {
    if (!n && e && i.current) {
      const a = (c) => {
        i.current && !i.current.contains(c.target) && l(c);
      };
      return document.addEventListener("click", a), () => {
        document.removeEventListener("click", a);
      };
    }
  }, [n, e, l]), /* @__PURE__ */ j("svg", { className: "wx-dkx3NwEn wx-links", children: [
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
function qc(t) {
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
  return /* @__PURE__ */ g("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ j(
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
  } = t, i = xe(vt), [l, a] = bn(i, "_tasks"), [c, d] = bn(i, "_links"), u = Q(i, "area"), h = Q(i, "_scales"), p = Q(i, "taskTypes"), m = Q(i, "baselines"), f = Q(i, "_selected"), w = Q(i, "_scrollTask"), x = Q(i, "criticalPath"), y = Q(i, "tasks"), k = Q(i, "schedule"), v = Q(i, "splitTasks"), N = _(() => {
    if (!u || !Array.isArray(l)) return [];
    const $ = u.start ?? 0, K = u.end ?? 0;
    return l.slice($, K).map((re) => ({ ...re }));
  }, [a, u]), S = Q(i, "cellHeight"), C = _(() => {
    if (!r || !s || !N.length) return N;
    const $ = /* @__PURE__ */ new Map(), K = [];
    return l.forEach((re) => {
      const fe = s.taskRows.get(re.id) ?? re.id;
      $.has(fe) || ($.set(fe, K.length), K.push(fe));
    }), N.map((re) => {
      const fe = s.taskRows.get(re.id) ?? re.id, ce = $.get(fe) ?? 0;
      return {
        ...re,
        $y: ce * S,
        $y_base: re.$y_base !== void 0 ? ce * S : void 0
      };
    });
  }, [N, r, s, l, S]), M = _(
    () => h.lengthUnitWidth,
    [h]
  ), O = F(!1), [b, I] = G(void 0), [A, H] = G(null), T = F(null), [V, ne] = G(null), [le, U] = G(void 0), L = F(null), [Z, D] = G(0), [W, oe] = G(null), [ee, pe] = G(null), me = F(null), Re = _(() => {
    const $ = me.current;
    return !!(f.length && $ && $.contains(document.activeElement));
  }, [f, me.current]), he = _(() => Re && f[f.length - 1]?.id, [Re, f]);
  Y(() => {
    if (w && Re && w) {
      const { id: $ } = w, K = me.current?.querySelector(
        `.wx-bar[data-id='${$}']`
      );
      K && K.focus({ preventScroll: !0 });
    }
  }, [w]), Y(() => {
    const $ = me.current;
    if ($ && (D($.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const K = new ResizeObserver((re) => {
        re[0] && D(re[0].contentRect.width);
      });
      return K.observe($), () => K.disconnect();
    }
  }, [me.current]);
  const B = R(() => {
    document.body.style.userSelect = "none";
  }, []), te = R(() => {
    document.body.style.userSelect = "";
  }, []), de = R(
    ($, K, re) => {
      if (K.target.classList.contains("wx-line") || (re || (re = i.getTask($t($))), re.type === "milestone" || re.type === "summary")) return "";
      const fe = qe(K, "data-segment");
      fe && ($ = fe);
      const { left: ce, width: we } = $.getBoundingClientRect(), ke = (K.clientX - ce) / we;
      let De = 0.2 / (we > 200 ? we / 200 : 1);
      return ke < De ? "start" : ke > 1 - De ? "end" : "";
    },
    [i]
  ), Oe = R(
    ($) => {
      const K = Math.min($.startX, $.currentX), re = Math.max($.startX, $.currentX), fe = Math.min($.startY, $.currentY), ce = Math.max($.startY, $.currentY);
      return l.filter((we) => {
        const ke = we.$x, De = we.$x + we.$w, Ee = we.$y, Ve = we.$y + we.$h;
        return ke < re && De > K && Ee < ce && Ve > fe;
      });
    },
    [l]
  ), Ke = R(
    ($) => f.some((K) => K.id === $),
    [f]
  ), $e = R(
    ($, K) => {
      const { clientX: re } = K, fe = $t($), ce = i.getTask(fe), we = K.target.classList;
      if (!K.target.closest(".wx-delete-button") && !e) {
        if (we.contains("wx-progress-marker")) {
          const { progress: ke } = i.getTask(fe);
          T.current = {
            id: fe,
            x: re,
            progress: ke,
            dx: 0,
            node: $,
            marker: K.target
          }, K.target.classList.add("wx-progress-in-drag");
        } else {
          const ke = de($, K, ce) || "move", De = {
            id: fe,
            mode: ke,
            x: re,
            dx: 0,
            l: ce.$x,
            w: ce.$w
          };
          if (v && ce.segments?.length) {
            const Ee = qe(K, "data-segment");
            Ee && (De.segmentIndex = Ee.dataset.segment * 1);
          }
          H(De);
        }
        B();
      }
    },
    [i, e, de, B, v]
  ), He = R(
    ($) => {
      if ($.button !== 0) return;
      const K = qe($);
      if (!K && o && !e) {
        const re = me.current;
        if (!re) return;
        const fe = re.getBoundingClientRect(), ce = $.clientX - fe.left + re.parentElement.scrollLeft, we = $.clientY - fe.top + re.parentElement.parentElement.scrollTop;
        oe({
          startX: ce,
          startY: we,
          currentX: ce,
          currentY: we,
          ctrlKey: $.ctrlKey || $.metaKey
        }), B();
        return;
      }
      if (K) {
        if (o && !e && f.length > 1) {
          const re = $t(K);
          if (Ke(re)) {
            const fe = $.target.classList;
            if (!fe.contains("wx-link") && !fe.contains("wx-progress-marker") && !$.target.closest(".wx-delete-button")) {
              const ce = i.getTask(re);
              if (!de(K, $, ce)) {
                const ke = /* @__PURE__ */ new Map();
                f.forEach((De) => {
                  const Ee = i.getTask(De.id);
                  if (Ee) {
                    if (k?.auto && Ee.type === "summary") return;
                    ke.set(De.id, {
                      $x: Ee.$x,
                      $w: Ee.$w,
                      start: Ee.start,
                      end: Ee.end
                    });
                  }
                }), pe({
                  baseTaskId: re,
                  startX: $.clientX,
                  dx: 0,
                  originalPositions: ke
                }), B();
                return;
              }
            }
          }
        }
        $e(K, $);
      }
    },
    [$e, o, e, f, Ke, i, de, k, B]
  ), Le = R(
    ($) => {
      const K = qe($);
      K && (L.current = setTimeout(() => {
        U(!0), $e(K, $.touches[0]);
      }, 300));
    },
    [$e]
  ), ye = R(
    ($) => {
      ne($ && { ...c.find((K) => K.id === $) });
    },
    [c]
  ), P = R(() => {
    if (W) {
      const $ = Oe(W);
      W.ctrlKey ? $.forEach((K) => {
        i.exec("select-task", { id: K.id, toggle: !0 });
      }) : (f.length > 0 && i.exec("select-task", { id: null }), $.forEach((K, re) => {
        i.exec("select-task", {
          id: K.id,
          toggle: re > 0
          // First one replaces, rest toggle (add)
        });
      })), oe(null), te(), O.current = !0;
      return;
    }
    if (ee) {
      const { dx: $, originalPositions: K } = ee, re = Math.round($ / M);
      if (re !== 0) {
        let fe = !0;
        K.forEach((ce, we) => {
          const ke = i.getTask(we);
          ke && (i.exec("update-task", {
            id: we,
            diff: re,
            task: { start: ke.start, end: ke.end },
            skipUndo: !fe
            // Only first task creates undo entry
          }), fe = !1);
        }), O.current = !0;
      } else
        K.forEach((fe, ce) => {
          i.exec("drag-task", {
            id: ce,
            left: fe.$x,
            width: fe.$w,
            inProgress: !1
          });
        });
      pe(null), te();
      return;
    }
    if (T.current) {
      const { dx: $, id: K, marker: re, value: fe } = T.current;
      T.current = null, typeof fe < "u" && $ && i.exec("update-task", {
        id: K,
        task: { progress: fe },
        inProgress: !1
      }), re.classList.remove("wx-progress-in-drag"), O.current = !0, te();
    } else if (A) {
      const { id: $, mode: K, dx: re, l: fe, w: ce, start: we, segment: ke, index: De } = A;
      if (H(null), we) {
        const Ee = Math.round(re / M);
        if (!Ee)
          i.exec("drag-task", {
            id: $,
            width: ce,
            left: fe,
            inProgress: !1,
            ...ke && { segmentIndex: De }
          });
        else {
          let Ve = {}, lt = i.getTask($);
          ke && (lt = lt.segments[De]), K === "move" ? (Ve.start = lt.start, Ve.end = lt.end) : Ve[K] = lt[K], i.exec("update-task", {
            id: $,
            diff: Ee,
            task: Ve,
            ...ke && { segmentIndex: De }
          });
        }
        O.current = !0;
      }
      te();
    }
  }, [i, te, A, M, W, ee, Oe, f]), ue = R(
    ($, K) => {
      const { clientX: re, clientY: fe } = K;
      if (!e) {
        if (W) {
          const ce = me.current;
          if (!ce) return;
          const we = ce.getBoundingClientRect(), ke = re - we.left + ce.parentElement.scrollLeft, De = fe - we.top + ce.parentElement.parentElement.scrollTop;
          oe((Ee) => ({
            ...Ee,
            currentX: ke,
            currentY: De
          }));
          return;
        }
        if (ee) {
          const ce = re - ee.startX;
          ee.originalPositions.forEach((we, ke) => {
            const De = we.$x + ce;
            i.exec("drag-task", {
              id: ke,
              left: De,
              width: we.$w,
              inProgress: !0
            });
          }), pe((we) => ({ ...we, dx: ce }));
          return;
        }
        if (T.current) {
          const { node: ce, x: we, id: ke } = T.current, De = T.current.dx = re - we, Ee = Math.round(De / ce.offsetWidth * 100);
          let Ve = T.current.progress + Ee;
          T.current.value = Ve = Math.min(
            Math.max(0, Ve),
            100
          ), i.exec("update-task", {
            id: ke,
            task: { progress: Ve },
            inProgress: !0
          });
        } else if (A) {
          ye(null);
          const { mode: ce, l: we, w: ke, x: De, id: Ee, start: Ve, segment: lt, index: an } = A, jt = i.getTask(Ee), Ue = re - De;
          if (!Ve && Math.abs(Ue) < 20 || ce === "start" && ke - Ue < M || ce === "end" && ke + Ue < M || ce === "move" && (Ue < 0 && we + Ue < 0 || Ue > 0 && we + ke + Ue > Z) || A.segment)
            return;
          const It = { ...A, dx: Ue };
          let At, E;
          if (ce === "start" ? (At = we + Ue, E = ke - Ue) : ce === "end" ? (At = we, E = ke + Ue) : ce === "move" && (At = we + Ue, E = ke), i.exec("drag-task", {
            id: Ee,
            width: E,
            left: At,
            inProgress: !0,
            ...lt && { segmentIndex: an }
          }), !It.start && (ce === "move" && jt.$x == we || ce !== "move" && jt.$w == ke)) {
            O.current = !0, P();
            return;
          }
          It.start = !0, H(It);
        } else {
          const ce = qe($);
          if (ce) {
            const we = i.getTask($t(ce)), De = qe($, "data-segment") || ce, Ee = de(De, K, we);
            De.style.cursor = Ee && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      e,
      A,
      M,
      Z,
      de,
      ye,
      P,
      W,
      ee
    ]
  ), be = R(
    ($) => {
      ue($, $);
    },
    [ue]
  ), se = R(
    ($) => {
      le ? ($.preventDefault(), ue($, $.touches[0])) : L.current && (clearTimeout(L.current), L.current = null);
    },
    [le, ue]
  ), Me = R(() => {
    P();
  }, [P]), tt = R(() => {
    U(null), L.current && (clearTimeout(L.current), L.current = null), P();
  }, [P]);
  Y(() => (window.addEventListener("mouseup", Me), () => {
    window.removeEventListener("mouseup", Me);
  }), [Me]);
  const kt = R(
    ($) => {
      if (!e) {
        const K = _t($.target);
        if (K && !$.target.classList.contains("wx-link")) {
          const re = _t($.target, "data-segment");
          i.exec("show-editor", {
            id: K,
            ...re !== null && { segmentIndex: re }
          });
        }
      }
    },
    [i, e]
  ), We = ["e2s", "s2s", "e2e", "s2e"], Pe = R(($, K) => We[($ ? 1 : 0) + (K ? 0 : 2)], []), Be = R(
    ($, K) => {
      const re = b.id, fe = b.start;
      return $ === re ? !0 : !!c.find((ce) => ce.target == $ && ce.source == re && ce.type === Pe(fe, K));
    },
    [b, d, Pe]
  ), rt = R(() => {
    b && I(null);
  }, [b]), z = R(
    ($) => {
      if (O.current) {
        O.current = !1;
        return;
      }
      const K = _t($.target);
      if (K) {
        const re = $.target.classList;
        if (re.contains("wx-link")) {
          const fe = re.contains("wx-left");
          if (!b) {
            I({ id: K, start: fe });
            return;
          }
          b.id !== K && !Be(K, fe) && i.exec("add-link", {
            link: {
              source: b.id,
              target: K,
              type: Pe(b.start, fe)
            }
          });
        } else if (re.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: V.id }), ne(null);
        else {
          let fe;
          const ce = qe($, "data-segment");
          ce && (fe = ce.dataset.segment * 1), i.exec("select-task", {
            id: K,
            toggle: $.ctrlKey || $.metaKey,
            range: $.shiftKey,
            segmentIndex: fe
          });
        }
      }
      rt();
    },
    [
      i,
      b,
      d,
      V,
      Be,
      Pe,
      rt
    ]
  ), X = R(($) => ({
    left: `${$.$x}px`,
    top: `${$.$y}px`,
    width: `${$.$w}px`,
    height: `${$.$h}px`
  }), []), J = R(($) => ({
    left: `${$.$x_base}px`,
    top: `${$.$y_base}px`,
    width: `${$.$w_base}px`,
    height: `${$.$h_base}px`
  }), []), ae = R(
    ($) => {
      if (le || L.current)
        return $.preventDefault(), !1;
    },
    [le]
  ), Se = _(
    () => p.map(($) => $.id),
    [p]
  ), _e = R(
    ($) => {
      let K = Se.includes($) ? $ : "task";
      return ["task", "milestone", "summary"].includes($) || (K = `task ${K}`), K;
    },
    [Se]
  ), Ae = R(
    ($) => {
      i.exec($.action, $.data);
    },
    [i]
  ), je = R(
    ($) => x && y.byId($).$critical,
    [x, y]
  ), Rt = R(
    ($) => {
      if (k?.auto) {
        const K = y.getSummaryId($, !0), re = y.getSummaryId(b.id, !0);
        return b?.id && !(Array.isArray(K) ? K : [K]).includes(
          b.id
        ) && !(Array.isArray(re) ? re : [re]).includes($);
      }
      return b;
    },
    [k, y, b]
  ), ft = _(() => {
    if (!W) return null;
    const $ = Math.min(W.startX, W.currentX), K = Math.min(W.startY, W.currentY), re = Math.abs(W.currentX - W.startX), fe = Math.abs(W.currentY - W.startY);
    return {
      left: `${$}px`,
      top: `${K}px`,
      width: `${re}px`,
      height: `${fe}px`
    };
  }, [W]);
  return /* @__PURE__ */ j(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${C.length ? C[0].$h : 0}px` },
      ref: me,
      onContextMenu: ae,
      onMouseDown: He,
      onMouseMove: be,
      onTouchStart: Le,
      onTouchMove: se,
      onTouchEnd: tt,
      onClick: z,
      onDoubleClick: kt,
      onDragStart: ($) => ($.preventDefault(), !1),
      children: [
        /* @__PURE__ */ g(
          Xc,
          {
            onSelectLink: ye,
            selectedLink: V,
            readonly: e
          }
        ),
        C.map(($) => {
          if ($.$skip && $.$skip_baseline) return null;
          const K = `wx-bar wx-${_e($.type)}` + (le && A && $.id === A.id ? " wx-touch" : "") + (b && b.id === $.id ? " wx-selected" : "") + (je($.id) ? " wx-critical" : "") + ($.$reorder ? " wx-reorder-task" : "") + (v && $.segments ? " wx-split" : ""), re = "wx-link wx-left" + (b ? " wx-visible" : "") + (!b || !Be($.id, !0) && Rt($.id) ? " wx-target" : "") + (b && b.id === $.id && b.start ? " wx-selected" : "") + (je($.id) ? " wx-critical" : ""), fe = "wx-link wx-right" + (b ? " wx-visible" : "") + (!b || !Be($.id, !1) && Rt($.id) ? " wx-target" : "") + (b && b.id === $.id && !b.start ? " wx-selected" : "") + (je($.id) ? " wx-critical" : "");
          return /* @__PURE__ */ j(ks, { children: [
            !$.$skip && /* @__PURE__ */ j(
              "div",
              {
                className: "wx-GKbcLEGA " + K,
                style: X($),
                "data-tooltip-id": $.id,
                "data-id": $.id,
                tabIndex: he === $.id ? 0 : -1,
                children: [
                  e ? null : $.id === V?.target && V?.type[2] === "s" ? /* @__PURE__ */ g(
                    gt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + re, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  $.type !== "milestone" ? /* @__PURE__ */ j(Ce, { children: [
                    $.progress && !(v && $.segments) ? /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${$.progress}%` }
                      }
                    ) }) : null,
                    !e && !(v && $.segments) ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${$.progress}% - 10px)` },
                        children: $.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ g(n, { data: $, api: i, onAction: Ae }) : v && $.segments ? /* @__PURE__ */ g(qc, { task: $, type: _e($.type) }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content", children: $.text || "" })
                  ] }) : /* @__PURE__ */ j(Ce, { children: [
                    /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ g(n, { data: $, api: i, onAction: Ae }) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-text-out", children: $.text })
                  ] }),
                  e ? null : $.id === V?.target && V?.type[2] === "e" ? /* @__PURE__ */ g(
                    gt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ g("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA " + fe, children: /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            m && !$.$skip_baseline ? /* @__PURE__ */ g(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + ($.type === "milestone" ? " wx-milestone" : ""),
                style: J($)
              }
            ) : null
          ] }, $.id);
        }),
        W && ft && /* @__PURE__ */ g("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: ft })
      ]
    }
  );
}
function Zc(t) {
  const { highlightTime: e } = t, n = xe(vt), r = Q(n, "_scales");
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
    multiTaskRows: l = !1,
    rowMapping: a = null,
    marqueeSelect: c = !1
  } = t, d = xe(vt), [u, h] = bn(d, "_selected"), p = Q(d, "scrollTop"), m = Q(d, "cellHeight"), f = Q(d, "cellWidth"), w = Q(d, "_scales"), x = Q(d, "_markers"), y = Q(d, "_scrollTask"), k = Q(d, "zoom"), [v, N] = G(), S = F(null), C = 1 + (w?.rows?.length || 0), M = _(() => {
    const L = [];
    return u && u.length && m && u.forEach((Z) => {
      L.push({ height: `${m}px`, top: `${Z.$y - 3}px` });
    }), L;
  }, [h, m]), O = _(
    () => Math.max(v || 0, r),
    [v, r]
  );
  Y(() => {
    const L = S.current;
    L && typeof p == "number" && (L.scrollTop = p);
  }, [p]);
  const b = () => {
    I();
  };
  function I(L) {
    const Z = S.current;
    if (!Z) return;
    const D = {};
    D.left = Z.scrollLeft, d.exec("scroll-chart", D);
  }
  function A() {
    const L = S.current, D = Math.ceil((v || 0) / (m || 1)) + 1, W = Math.floor((L && L.scrollTop || 0) / (m || 1)), oe = Math.max(0, W - C), ee = W + D + C, pe = oe * (m || 0);
    d.exec("render-data", {
      start: oe,
      end: ee,
      from: pe
    });
  }
  Y(() => {
    A();
  }, [v, p]);
  const H = R(
    (L) => {
      if (!L) return;
      const { id: Z, mode: D } = L;
      if (D.toString().indexOf("x") < 0) return;
      const W = S.current;
      if (!W) return;
      const { clientWidth: oe } = W, ee = d.getTask(Z);
      if (ee.$x + ee.$w < W.scrollLeft)
        d.exec("scroll-chart", { left: ee.$x - (f || 0) }), W.scrollLeft = ee.$x - (f || 0);
      else if (ee.$x >= oe + W.scrollLeft) {
        const pe = oe < ee.$w ? f || 0 : ee.$w;
        d.exec("scroll-chart", { left: ee.$x - oe + pe }), W.scrollLeft = ee.$x - oe + pe;
      }
    },
    [d, f]
  );
  Y(() => {
    H(y);
  }, [y]);
  function T(L) {
    if (k && (L.ctrlKey || L.metaKey)) {
      L.preventDefault();
      const Z = S.current, D = -Math.sign(L.deltaY), W = L.clientX - (Z ? Z.getBoundingClientRect().left : 0);
      d.exec("zoom-scale", {
        dir: D,
        offset: W
      });
    }
  }
  function V(L) {
    const Z = i(L.date, L.unit);
    return Z ? {
      css: Z,
      width: L.width
    } : null;
  }
  const ne = _(() => w && (w.minUnit === "hour" || w.minUnit === "day") && i ? w.rows[w.rows.length - 1].cells.map(V) : null, [w, i]), le = R(
    (L) => {
      L.eventSource = "chart", d.exec("hotkey", L);
    },
    [d]
  );
  Y(() => {
    const L = S.current;
    if (!L) return;
    const Z = () => N(L.clientHeight);
    Z();
    const D = new ResizeObserver(() => Z());
    return D.observe(L), () => {
      D.disconnect();
    };
  }, [S.current]);
  const U = F(null);
  return Y(() => {
    const L = S.current;
    if (L && !U.current)
      return U.current = Cr(L, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (Z) => le(Z)
      }), () => {
        U.current?.destroy(), U.current = null;
      };
  }, []), Y(() => {
    const L = S.current;
    if (!L) return;
    const Z = T;
    return L.addEventListener("wheel", Z), () => {
      L.removeEventListener("wheel", Z);
    };
  }, [T]), ed("chart"), /* @__PURE__ */ j(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: S,
      onScroll: b,
      children: [
        /* @__PURE__ */ g(Zc, { highlightTime: i, scales: w }),
        x && x.length ? /* @__PURE__ */ g(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${O}px` },
            children: x.map((L, Z) => /* @__PURE__ */ g(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${L.css || ""}`,
                style: { left: `${L.left}px` },
                children: /* @__PURE__ */ g("div", { className: "wx-mR7v2Xag wx-content", children: L.text })
              },
              Z
            ))
          }
        ) : null,
        /* @__PURE__ */ j(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${O}px` },
            children: [
              ne ? /* @__PURE__ */ g(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: ne.map(
                    (L, Z) => L ? /* @__PURE__ */ g(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + L.css,
                        style: {
                          width: `${L.width}px`,
                          left: `${Z * L.width}px`
                        }
                      },
                      Z
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ g(Uc, { borders: o }),
              u && u.length ? u.map(
                (L, Z) => L.$y ? /* @__PURE__ */ g(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": L.id,
                    style: M[Z]
                  },
                  L.id
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
  } = t, [d, u] = Ie(t.value ?? 0), [h, p] = Ie(t.display ?? "all");
  function m(U) {
    let L = 0;
    e == "center" ? L = n / 2 : e == "before" && (L = n);
    const Z = {
      size: [n + "px", "auto"],
      p: [U - L + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let D in Z) Z[D] = Z[D].reverse();
    return Z;
  }
  const [f, w] = G(!1), [x, y] = G(null), k = F(0), v = F(), N = F(), S = F(h);
  Y(() => {
    S.current = h;
  }, [h]), Y(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function C(U) {
    return r == "x" ? U.clientX : U.clientY;
  }
  const M = R(
    (U) => {
      const L = v.current + C(U) - k.current;
      u(L);
      let Z;
      L <= a ? Z = "chart" : l - L <= c ? Z = "grid" : Z = "all", S.current !== Z && (p(Z), S.current = Z), N.current && clearTimeout(N.current), N.current = setTimeout(() => s && s(L), 100);
    },
    [l, a, c, s]
  ), O = R(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", O);
  }, [M]), b = _(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), I = R(
    (U) => {
      !i && (h === "grid" || h === "chart") || (k.current = C(U), v.current = d, w(!0), document.body.style.cursor = b, document.body.style.userSelect = "none", window.addEventListener("mousemove", M), window.addEventListener("mouseup", O));
    },
    [b, M, O, d, i, h]
  );
  function A() {
    p("all"), x !== null && (u(x), s && s(x));
  }
  function H(U) {
    if (i) {
      const L = h === "chart" ? "grid" : "chart";
      p(L), o(L);
    } else if (h === "grid" || h === "chart")
      A(), o("all");
    else {
      const L = U === "left" ? "chart" : "grid";
      p(L), o(L);
    }
  }
  function T() {
    H("left");
  }
  function V() {
    H("right");
  }
  const ne = _(() => m(d), [d, e, n, r]), le = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ j(
    "div",
    {
      className: "wx-pFykzMlT " + le,
      onMouseDown: I,
      style: { width: ne.size[0], height: ne.size[1], cursor: b },
      children: [
        /* @__PURE__ */ j("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
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
    rowMapping: l = null,
    marqueeSelect: a = !1
  } = t, c = xe(vt), d = Q(c, "_tasks"), u = Q(c, "_scales"), h = Q(c, "cellHeight"), p = Q(c, "columns"), m = Q(c, "_scrollTask"), f = Q(c, "undo"), [w, x] = G(!1);
  let [y, k] = G(0);
  const [v, N] = G(0), [S, C] = G(0), [M, O] = G(void 0), [b, I] = G("all"), A = F(null), H = R(
    (B) => {
      x((te) => (B !== te && (B ? (A.current = b, b === "all" && I("grid")) : (!A.current || A.current === "all") && I("all")), B));
    },
    [b]
  );
  Y(() => {
    const B = Ao(H);
    return B.observe(), () => {
      B.disconnect();
    };
  }, [H]);
  const T = _(() => {
    let B;
    return p.every((te) => te.width && !te.flexgrow) ? B = p.reduce((te, de) => te + parseInt(de.width), 0) : w && b === "chart" ? B = parseInt(p.find((te) => te.id === "action")?.width) || 50 : B = 440, y = B, B;
  }, [p, w, b]);
  Y(() => {
    k(T);
  }, [T]);
  const V = _(
    () => (v ?? 0) - (M ?? 0),
    [v, M]
  ), ne = _(() => u.width, [u]), le = _(() => {
    if (!i || !l)
      return d.length * h;
    const B = /* @__PURE__ */ new Set();
    return d.forEach((te) => {
      const de = l.taskRows.get(te.id) ?? te.id;
      B.add(de);
    }), B.size * h;
  }, [d, h, i, l]), U = _(
    () => u.height + le + V,
    [u, le, V]
  ), L = _(
    () => y + ne,
    [y, ne]
  ), Z = F(null), D = R(() => {
    Promise.resolve().then(() => {
      if ((v ?? 0) > (L ?? 0)) {
        const B = (v ?? 0) - y;
        c.exec("expand-scale", { minWidth: B });
      }
    });
  }, [v, L, y, c]);
  Y(() => {
    let B;
    return Z.current && (B = new ResizeObserver(D), B.observe(Z.current)), () => {
      B && B.disconnect();
    };
  }, [Z.current, D]), Y(() => {
    D();
  }, [ne]);
  const W = F(null), oe = F(null), ee = R(() => {
    const B = W.current;
    B && c.exec("scroll-chart", {
      top: B.scrollTop
    });
  }, [c]), pe = F({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  Y(() => {
    pe.current = {
      rTasks: d,
      rScales: u,
      rCellHeight: h,
      scrollSize: V,
      ganttDiv: W.current,
      ganttHeight: S ?? 0
    };
  }, [d, u, h, V, S]);
  const me = R(
    (B) => {
      if (!B) return;
      const {
        rTasks: te,
        rScales: de,
        rCellHeight: Oe,
        scrollSize: Ke,
        ganttDiv: $e,
        ganttHeight: He
      } = pe.current;
      if (!$e) return;
      const { id: Le } = B, ye = te.findIndex((P) => P.id === Le);
      if (ye > -1) {
        const P = He - de.height, ue = ye * Oe, be = $e.scrollTop;
        let se = null;
        ue < be ? se = ue : ue + Oe > be + P && (se = ue - P + Oe + Ke), se !== null && (c.exec("scroll-chart", { top: Math.max(se, 0) }), W.current.scrollTop = Math.max(se, 0));
      }
    },
    [c]
  );
  Y(() => {
    me(m);
  }, [m]), Y(() => {
    const B = W.current, te = oe.current;
    if (!B || !te) return;
    const de = () => {
      Wo(() => {
        C(B.offsetHeight), N(B.offsetWidth), O(te.offsetWidth);
      });
    }, Oe = new ResizeObserver(de);
    return Oe.observe(B), () => Oe.disconnect();
  }, [W.current]);
  const Re = F(null), he = F(null);
  return Y(() => {
    he.current && (he.current.destroy(), he.current = null);
    const B = Re.current;
    if (B)
      return he.current = Cr(B, {
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
          "ctrl+z": f,
          "ctrl+y": f,
          "meta+z": f,
          "meta+shift+z": f
        },
        exec: (te) => {
          te.isInput || c.exec("hotkey", te);
        }
      }), () => {
        he.current?.destroy(), he.current = null;
      };
  }, [f]), /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-gantt", ref: W, onScroll: ee, children: /* @__PURE__ */ g(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: U, width: "100%" },
      ref: oe,
      children: /* @__PURE__ */ g(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: S,
            width: M
          },
          children: /* @__PURE__ */ j("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Re, children: [
            p.length ? /* @__PURE__ */ j(Ce, { children: [
              /* @__PURE__ */ g(
                Bc,
                {
                  display: b,
                  compactMode: w,
                  columnWidth: T,
                  width: y,
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
                  value: y,
                  display: b,
                  compactMode: w,
                  containerWidth: v,
                  onMove: (B) => k(B),
                  onDisplayChange: (B) => I(B)
                }
              )
            ] }) : null,
            /* @__PURE__ */ g("div", { className: "wx-jlbQoHOz wx-content", ref: Z, children: /* @__PURE__ */ g(
              td,
              {
                readonly: n,
                fullWidth: ne,
                fullHeight: le,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                multiTaskRows: i,
                rowMapping: l,
                marqueeSelect: a
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
  lengthUnit: h = "day",
  durationUnit: p = "day",
  cellWidth: m = 100,
  cellHeight: f = 38,
  scaleHeight: w = 36,
  readonly: x = !1,
  cellBorders: y = "full",
  zoom: k = !1,
  baselines: v = !1,
  highlightTime: N = null,
  init: S = null,
  autoScale: C = !0,
  unscheduledTasks: M = !1,
  criticalPath: O = null,
  schedule: b = { type: "forward" },
  projectStart: I = null,
  projectEnd: A = null,
  calendar: H = null,
  undo: T = !1,
  splitTasks: V = !1,
  multiTaskRows: ne = !1,
  marqueeSelect: le = !1,
  ...U
}, L) {
  const Z = F();
  Z.current = U;
  const D = _(() => new ta(Cs), []), W = _(() => ({ ...nn, ...Rn }), []), oe = xe(et.i18n), ee = _(() => oe ? oe.extend(W, !0) : Et(W), [oe, W]), pe = _(() => ee.getRaw().calendar, [ee]), me = _(() => {
    let ye = {
      zoom: cd(k, pe),
      scales: Ho(a, pe),
      columns: ad(c, pe),
      links: lo(l),
      cellWidth: m
    };
    return ye.zoom && (ye = {
      ...ye,
      ...Pl(
        ye.zoom,
        ld(pe, ee.getGroup("gantt")),
        ye.scales,
        m
      )
    }), ye;
  }, [k, a, c, l, m, pe, ee]), Re = F(null);
  Re.current !== s && (sr(s, { durationUnit: p, calendar: H }), Re.current = s), Y(() => {
    sr(s, { durationUnit: p, calendar: H });
  }, [s, p, H, V]);
  const he = _(() => {
    if (!ne) return null;
    const ye = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), ue = (be) => {
      be.forEach((se) => {
        const Me = se.row ?? se.id;
        P.set(se.id, Me), ye.has(Me) || ye.set(Me, []), ye.get(Me).push(se.id), se.data && se.data.length > 0 && ue(se.data);
      });
    };
    return ue(s), { rowMap: ye, taskRows: P };
  }, [s, ne]), B = _(() => D.in, [D]), te = F(null);
  te.current === null && (te.current = new Is((ye, P) => {
    const ue = "on" + dd(ye);
    Z.current && Z.current[ue] && Z.current[ue](P);
  }), B.setNext(te.current));
  const [de, Oe] = G(null), Ke = F(null);
  Ke.current = de;
  const $e = _(
    () => ({
      getState: D.getState.bind(D),
      getReactiveState: D.getReactive.bind(D),
      getStores: () => ({ data: D }),
      exec: B.exec,
      setNext: (ye) => (te.current = te.current.setNext(ye), te.current),
      intercept: B.intercept.bind(B),
      on: B.on.bind(B),
      detach: B.detach.bind(B),
      getTask: D.getTask.bind(D),
      serialize: D.serialize.bind(D),
      getTable: (ye) => ye ? new Promise((P) => setTimeout(() => P(Ke.current), 1)) : Ke.current,
      getHistory: () => D.getHistory()
    }),
    [D, B]
  );
  Mt(
    L,
    () => ({
      ...$e
    }),
    [$e]
  );
  const He = F(0);
  Y(() => {
    He.current ? D.init({
      tasks: s,
      links: me.links,
      start: d,
      columns: me.columns,
      end: u,
      lengthUnit: h,
      cellWidth: me.cellWidth,
      cellHeight: f,
      scaleHeight: w,
      scales: me.scales,
      taskTypes: r,
      zoom: me.zoom,
      selected: o,
      activeTask: i,
      baselines: v,
      autoScale: C,
      unscheduledTasks: M,
      markers: n,
      durationUnit: p,
      criticalPath: O,
      schedule: b,
      projectStart: I,
      projectEnd: A,
      calendar: H,
      undo: T,
      _weekStart: pe.weekStart,
      splitTasks: V
    }) : S && S($e), He.current++;
  }, [
    $e,
    S,
    s,
    me,
    d,
    u,
    h,
    f,
    w,
    r,
    o,
    i,
    v,
    C,
    M,
    n,
    p,
    O,
    b,
    I,
    A,
    H,
    T,
    pe,
    V,
    D
  ]), He.current === 0 && D.init({
    tasks: s,
    links: me.links,
    start: d,
    columns: me.columns,
    end: u,
    lengthUnit: h,
    cellWidth: me.cellWidth,
    cellHeight: f,
    scaleHeight: w,
    scales: me.scales,
    taskTypes: r,
    zoom: me.zoom,
    selected: o,
    activeTask: i,
    baselines: v,
    autoScale: C,
    unscheduledTasks: M,
    markers: n,
    durationUnit: p,
    criticalPath: O,
    schedule: b,
    projectStart: I,
    projectEnd: A,
    calendar: H,
    undo: T,
    _weekStart: pe.weekStart,
    splitTasks: V
  });
  const Le = _(() => H ? (ye, P) => P == "day" && !H.getDayHours(ye) || P == "hour" && !H.getDayHours(ye) ? "wx-weekend" : "" : N, [H, N]);
  return /* @__PURE__ */ g(et.i18n.Provider, { value: ee, children: /* @__PURE__ */ g(vt.Provider, { value: $e, children: /* @__PURE__ */ g(
    sd,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: Le,
      onTableAPIChange: Oe,
      multiTaskRows: ne,
      rowMapping: he,
      marqueeSelect: le
    }
  ) }) });
});
function hd({ api: t = null, items: e = [] }) {
  const n = xe(et.i18n), r = _(() => n || Et(Rn), [n]), s = _(() => r.getGroup("gantt"), [r]), o = ht(t, "_selected"), i = ht(t, "undo"), l = ht(t, "history"), a = ht(t, "splitTasks"), c = ["undo", "redo"], d = _(() => {
    const h = ir();
    return (e.length ? e : ir()).map((m) => {
      let f = { ...m, disabled: !1 };
      return f.handler = $r(h, f.id) ? (w) => zt(t, w.id, null, s) : f.handler, f.text && (f.text = s(f.text)), f.menuText && (f.menuText = s(f.menuText)), f;
    });
  }, [e, t, s, i, a]), u = _(() => {
    const h = [];
    return d.forEach((p) => {
      const m = p.id;
      if (m === "add-task")
        h.push(p);
      else if (c.includes(m))
        c.includes(m) && h.push({
          ...p,
          disabled: p.isDisabled(l)
        });
      else {
        if (!o?.length || !t) return;
        h.push({
          ...p,
          disabled: p.isDisabled && o.some((f) => p.isDisabled(f, t.getState()))
        });
      }
    }), h.filter((p, m) => {
      if (t && p.isHidden)
        return !o.some((f) => p.isHidden(f, t.getState()));
      if (p.comp === "separator") {
        const f = h[m + 1];
        if (!f || f.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, o, l, d]);
  return n ? /* @__PURE__ */ g(ar, { items: u }) : /* @__PURE__ */ g(et.i18n.Provider, { value: r, children: /* @__PURE__ */ g(ar, { items: u }) });
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
  const d = F(null), u = F(null), h = xe(et.i18n), p = _(() => h || Et({ ...Rn, ...nn }), [h]), m = _(() => p.getGroup("gantt"), [p]), f = ht(n, "taskTypes"), w = ht(n, "selected"), x = ht(n, "_selected"), y = ht(n, "splitTasks"), k = _(() => or(), []);
  Y(() => {
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
    const H = e.length ? e : or(), T = H.find((V) => V.id === "convert-task");
    return T && (T.data = [], (f || []).forEach((V) => {
      T.data.push(T.dataFactory(V));
    })), v(H);
  }
  const S = _(() => N(), [n, e, f, y, m]), C = _(
    () => x && x.length ? x : [],
    [x]
  ), M = R(
    (H, T) => {
      let V = H ? n?.getTask(H) : null;
      if (r) {
        const ne = r(H, T);
        V = ne === !0 ? V : ne;
      }
      if (V) {
        const ne = _t(T.target, "data-segment");
        ne !== null ? u.current = { id: V.id, segmentIndex: ne } : u.current = V.id, (!Array.isArray(w) || !w.includes(V.id)) && n && n.exec && n.exec("select-task", { id: V.id });
      }
      return V;
    },
    [n, r, w]
  ), O = R(
    (H) => {
      const T = H.action;
      T && ($r(k, T.id) && zt(n, T.id, u.current, m), l && l(H));
    },
    [n, m, l, k]
  ), b = R(
    (H, T) => {
      const V = C.length ? C : T ? [T] : [];
      let ne = s ? V.every((le) => s(H, le)) : !0;
      if (ne && (H.isHidden && (ne = !V.some(
        (le) => H.isHidden(le, n.getState(), u.current)
      )), H.isDisabled)) {
        const le = V.some(
          (U) => H.isDisabled(U, n.getState(), u.current)
        );
        H.disabled = le;
      }
      return ne;
    },
    [s, C, n]
  );
  Mt(c, () => ({
    show: (H, T) => {
      d.current && d.current.show && d.current.show(H, T);
    }
  }));
  const I = R((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), A = /* @__PURE__ */ j(Ce, { children: [
    /* @__PURE__ */ g(
      No,
      {
        filter: b,
        options: S,
        dataKey: "id",
        resolver: M,
        onClick: O,
        at: o,
        ref: d,
        css: a
      }
    ),
    /* @__PURE__ */ g("span", { onContextMenu: I, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && et.i18n?.Provider) {
    const H = et.i18n.Provider;
    return /* @__PURE__ */ g(H, { value: p, children: A });
  }
  return A;
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
function jn(t) {
  const {
    editors: e,
    data: n,
    css: r = "",
    errors: s,
    focus: o = !1,
    onClick: i,
    children: l,
    onChange: a
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
  const d = xe(et.i18n), u = _(() => d.getGroup("editor"), [d]), h = _(
    () => e.config[0].comp === "readonly" && e.config.every((p) => !Object.keys(n).includes(p.key)),
    [e, n]
  );
  return /* @__PURE__ */ j("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    l,
    h ? /* @__PURE__ */ g("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((p) => {
      if (!p.hidden) {
        const { key: m, onChange: f, ...w } = p;
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
          return /* @__PURE__ */ j("div", { children: [
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
                    onChange: f || ((y) => {
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
    return i.config && Object.assign(l, i.config), l.key = i.key || Wi(), l.setter = i.setter || wd(i.key), l.getter = i.getter || md(i.key), l;
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
      const u = a[d.key], h = l[d.key];
      !In(u, h) && (u !== void 0 || h) && c.push(d.key);
    }), c;
  }, o = (i, l, a) => {
    let c = 0;
    const d = {};
    return (l?.length ? l.map((u) => e.find((h) => h.key === u)) : e).forEach((u) => {
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
  children: h,
  onChange: p,
  onSave: m,
  onAction: f,
  onValidation: w,
  hotkeys: x
}) {
  const y = xe(et.i18n).getGroup("editor"), [k, v] = Ie(t), [N, S] = G(null), C = _(() => {
    const D = xd(e);
    N && D.config.forEach((ee) => {
      ee.comp === "section" && ee.key === N && (ee.sectionMode === "accordion" ? ee.activeSection || (D.config.forEach((pe) => {
        pe.comp === "section" && pe.key !== ee.key && (pe.activeSection = !1);
      }), ee.activeSection = !0) : ee.activeSection = !ee.activeSection);
    });
    let W = /* @__PURE__ */ new Set(), oe = null;
    return D.config.forEach((ee) => {
      ee.sectionMode === "exclusive" && ee.activeSection && (oe = ee.key), ee.activeSection && W.add(ee.key);
    }), D.config.forEach((ee) => {
      ee.hidden = ee.hidden || r && r !== ee.batch || oe && ee.key != oe && ee.section !== oe || ee.section && !W.has(ee.section);
    }), i ? {
      ...D,
      config: D.config.map((ee) => ({ ...ee, comp: "readonly" })),
      diff: () => []
    } : D;
  }, [e, N, r, i]), [M, O] = G({}), [b, I] = G({}), A = k;
  Y(() => {
    k !== void 0 && (O(Sn(k)), I(Sn(k)), A.errors && (A.errors = ne()));
  }, [k]);
  const [H, T] = G([]);
  Y(() => {
    k && T([]);
  }, [k]);
  function V(D) {
    return [...new Set(D)];
  }
  function ne(D) {
    const W = C.validateValues(M, D, y);
    return In(W, A.errors) || w && w({ errors: W, values: M }), W;
  }
  function le(D, W) {
    if (s && !A.errors) {
      const oe = C.setValues(k, W ?? b, D);
      v(oe), m && m({ changes: D, values: oe });
    } else
      T(D);
  }
  function U({ value: D, key: W, input: oe }) {
    let ee = { ...b || {}, [W]: D };
    const pe = {
      key: W,
      value: D,
      update: ee
    };
    if (oe && (pe.input = oe), p && p(pe), !k) return;
    ee = pe.update, I(ee);
    const me = C.diff(k, ee), Re = C.setValues(
      { ...M || {} },
      ee,
      V([...me, W])
    );
    if (O(Re), me.length) {
      const he = s ? [] : V([...me, ...Object.keys(A.errors ?? {}), W]);
      A.errors = ne(he), le(me, ee);
    } else {
      const he = Object.keys(A.errors ?? {});
      he.length && (A.errors = ne(he)), T([]);
    }
  }
  function L() {
    if (H.length && (s || (A.errors = ne()), !A.errors)) {
      m && m({
        changes: H,
        values: M
      });
      const D = C.setValues(k, b, H);
      v(D), T([]), v({ ...M });
    }
  }
  function Z({ item: D }) {
    D.id === "save" ? L() : D.id === "toggle-section" && S(D.key), f && f({ item: D, values: M, changes: H });
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
      data: b,
      editors: C,
      focus: o,
      hotkeys: x,
      errors: A.errors,
      onClick: Z,
      onKeyDown: Z,
      onChange: U,
      children: h
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
  return r === "columns" ? /* @__PURE__ */ j("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ g(
      jn,
      {
        editors: a[0],
        data: n,
        errors: s,
        onClick: i,
        onChange: l
      }
    ) }),
    /* @__PURE__ */ g("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ g(
      jn,
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
    jn,
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
  const o = R(
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
const Xt = () => ({ comp: "spacer" }), Bn = (t) => ({
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
function Xn(t) {
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
    children: h,
    onClick: p,
    onKeyDown: m,
    onChange: f,
    hotkeys: w
  } = t, x = xe(et.i18n), y = _(() => x.getGroup("editor"), [x]), k = _(
    () => o === !0 && i === !0,
    [o, i]
  ), v = _(() => {
    let b = o && o.items ? o.items.map((I) => ({ ...I })) : [];
    return k && (d ? b = [Xt(), vs()] : (u ? b = [Xt(), vs()] : a !== "modal" && (b = [Xt(), Bn(y), Un(y)]), l === "columns" && !b.length && (b = [Xt(), Un(y), Bn(y)]))), b;
  }, [o, k, d, u, a, l, y]), N = _(() => {
    let b = i && i.items ? i.items.map((I) => ({ ...I })) : [];
    return k && (d || (a === "modal" && !u && (b = [Xt(), Un(y), Bn(y)]), l === "columns" && v.length && (b = []))), b;
  }, [i, k, d, a, u, l, v, y]), S = _(() => [...v, ...N], [v, N]), C = F(null), M = F(null);
  M.current = (b, ...I) => {
    const A = S.findIndex((V) => I.includes(V.id));
    if (A === -1) return !1;
    const H = b.target, T = S[A];
    b.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || b.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (b.preventDefault(), m && m({ item: T }));
  };
  const O = _(() => w === !1 ? {} : {
    "ctrl+s": (b) => M.current(b, "save"),
    escape: (b) => M.current(b, "cancel", "close"),
    "ctrl+d": (b) => M.current(b, "delete"),
    ...w || {}
  }, [w]);
  return ni(O, C), /* @__PURE__ */ j("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: C, children: [
    /* @__PURE__ */ g(
      ys,
      {
        ...o && typeof o == "object" ? o : {},
        items: v,
        values: e,
        onClick: p,
        onChange: f
      }
    ),
    /* @__PURE__ */ j(
      "div",
      {
        className: `wx-85HDaNoA wx-content${l === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          h,
          /* @__PURE__ */ g(
            vd,
            {
              editors: n,
              layout: l,
              data: e,
              focus: r,
              errors: c,
              onClick: p,
              onChange: f
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
              onChange: f
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
    Xn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ g(Li, { onCancel: o, children: /* @__PURE__ */ g(
    Xn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ g(
    Xn,
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
    children: h,
    ...p
  } = t, m = Object.keys(p).reduce((f, w) => {
    if (/^on[a-z]/.test(w)) {
      const x = "on" + w.charAt(2).toUpperCase() + w.slice(3);
      x in p ? f[w] = p[w] : f[x] = p[w];
    } else
      f[w] = p[w];
    return f;
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
      children: h
    }
  ) });
}
function Sd({ value: t, options: e, label: n }) {
  const r = xe(et.i18n).getGroup("editor"), s = _(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((l) => l.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(Zt, { label: n, children: s }) : null;
}
function $d({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ j(
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
it("text", on);
it("textarea", ci);
it("checkbox", di);
it("readonly", Sd);
it("section", $d);
ur(Je);
function _d({ api: t, autoSave: e, onLinksChange: n }) {
  const s = xe(et.i18n).getGroup("gantt"), o = Q(t, "activeTask"), i = Q(t, "_activeTask"), l = Q(t, "_links"), a = Q(t, "schedule"), c = Q(t, "unscheduledTasks"), [d, u] = G();
  function h() {
    if (o) {
      const w = l.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), x = l.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: w },
        { title: s("Successors"), data: x }
      ];
    }
  }
  Y(() => {
    u(h());
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
  function f(w, x) {
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
    (w, x) => w.data.length ? /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ g(Zt, { label: w.title, position: "top", children: /* @__PURE__ */ g("table", { children: /* @__PURE__ */ g("tbody", { children: w.data.map((y) => /* @__PURE__ */ j("tr", { children: [
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      a?.auto && y.link.type === "e2s" ? /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ g(
        on,
        {
          type: "number",
          placeholder: s("Lag"),
          value: y.link.lag,
          disabled: c && i?.unscheduled,
          onChange: (k) => {
            k.input || f(y.link.id, { lag: k.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ g("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ g("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ g(
        fi,
        {
          value: y.link.type,
          placeholder: s("Select link type"),
          options: p,
          onChange: (k) => f(y.link.id, { type: k.value }),
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
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, l = o ?? s;
  function a(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), l && l({ value: d });
  }
  return /* @__PURE__ */ j("div", { className: "wx-hFsbgDln date-time-controll", children: [
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
  const u = xe(et.i18n), h = _(() => u || Et({ ...Rn, ...nn }), [u]), p = _(() => h.getGroup("gantt"), [h]), m = h.getRaw(), f = _(() => {
    const P = m.gantt?.dateFormat || m.formats?.dateFormat;
    return pt(P, m.calendar);
  }, [m]), w = _(() => {
    if (l === !0 && !s) {
      const P = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: p("Delete"),
          id: "delete"
        }
      ];
      return a ? { items: P } : {
        items: [
          ...P,
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
  }, [l, s, a, p]), [x, y] = G(!1), k = _(
    () => x ? "wx-full-screen" : "",
    [x]
  ), v = R((P) => {
    y(P);
  }, []);
  Y(() => {
    const P = Ao(v);
    return P.observe(), () => {
      P.disconnect();
    };
  }, [v]);
  const N = Q(t, "_activeTask"), S = Q(t, "activeTask"), C = Q(t, "unscheduledTasks"), M = Q(t, "links"), O = Q(t, "splitTasks"), b = _(
    () => O && S?.segmentIndex,
    [O, S]
  ), I = _(
    () => b || b === 0,
    [b]
  ), A = _(
    () => go(),
    [C]
  ), H = Q(t, "undo"), [T, V] = G({}), [ne, le] = G(null), [U, L] = G(), [Z, D] = G(null), W = Q(t, "taskTypes"), oe = _(() => {
    if (!N) return null;
    let P;
    if (I && N.segments ? P = { ...N.segments[b] } : P = { ...N }, s) {
      let ue = { parent: P.parent };
      return A.forEach(({ key: be, comp: se }) => {
        if (se !== "links") {
          const Me = P[be];
          se === "date" && Me instanceof Date ? ue[be] = f(Me) : se === "slider" && be === "progress" ? ue[be] = `${Me}%` : ue[be] = Me;
        }
      }), ue;
    }
    return P || null;
  }, [N, I, b, s, A, f]);
  Y(() => {
    L(oe);
  }, [oe]), Y(() => {
    V({}), D(null), le(null);
  }, [S]);
  function ee(P, ue) {
    return P.map((be) => {
      const se = { ...be };
      if (be.config && (se.config = { ...se.config }), se.comp === "links" && t && (se.api = t, se.autoSave = a, se.onLinksChange = Re), se.comp === "select" && se.key === "type") {
        const Me = se.options ?? (W || []);
        se.options = Me.map((tt) => ({
          ...tt,
          label: p(tt.label)
        }));
      }
      return se.comp === "slider" && se.key === "progress" && (se.labelTemplate = (Me) => `${p(se.label)} ${Me}%`), se.label && (se.label = p(se.label)), se.config?.placeholder && (se.config.placeholder = p(se.config.placeholder)), ue && (se.isDisabled && se.isDisabled(ue, t.getState()) ? se.disabled = !0 : delete se.disabled), se;
    });
  }
  const pe = _(() => {
    let P = e.length ? e : A;
    return P = ee(P, U), U ? P.filter(
      (ue) => !ue.isHidden || !ue.isHidden(U, t.getState())
    ) : P;
  }, [e, A, U, W, p, t, a]), me = _(
    () => pe.map((P) => P.key),
    [pe]
  );
  function Re({ id: P, action: ue, data: be }) {
    V((se) => ({
      ...se,
      [P]: { action: ue, data: be }
    }));
  }
  const he = R(() => {
    for (let P in T)
      if (M.byId(P)) {
        const { action: ue, data: be } = T[P];
        t.exec(ue, be);
      }
  }, [t, T, M]), B = R(() => {
    const P = S?.id || S;
    if (I) {
      if (N?.segments) {
        const ue = N.segments.filter(
          (be, se) => se !== b
        );
        t.exec("update-task", {
          id: P,
          task: { segments: ue }
        });
      }
    } else
      t.exec("delete-task", { id: P });
  }, [t, S, I, N, b]), te = R(() => {
    t.exec("show-editor", { id: null });
  }, [t]), de = R(
    (P) => {
      const { item: ue, changes: be } = P;
      ue.id === "delete" && B(), ue.id === "save" && (be.length ? te() : he()), ue.comp && te();
    },
    [t, S, a, he, B, te]
  ), Oe = R(
    (P, ue, be) => (C && P.type === "summary" && (P.unscheduled = !1), fo(P, t.getState(), ue), be || le(!1), P),
    [C, t]
  ), Ke = R(
    (P) => {
      P = {
        ...P,
        unscheduled: C && P.unscheduled && P.type !== "summary"
      }, delete P.links, delete P.data, (me.indexOf("duration") === -1 || P.segments && !P.duration) && delete P.duration;
      const ue = {
        id: S?.id || S,
        task: P,
        ...I && { segmentIndex: b }
      };
      a && ne && (ue.inProgress = ne), t.exec("update-task", ue), a || he();
    },
    [
      t,
      S,
      C,
      a,
      he,
      me,
      I,
      b,
      ne
    ]
  ), $e = R(
    (P) => {
      let { update: ue, key: be, input: se } = P;
      if (se && le(!0), P.update = Oe({ ...ue }, be, se), !a) L(P.update);
      else if (!Z && !se) {
        const Me = pe.find((We) => We.key === be), tt = ue[be];
        (!Me.validation || Me.validation(tt)) && (!Me.required || tt) && Ke(P.update);
      }
    },
    [a, Oe, Z, pe, Ke]
  ), He = R(
    (P) => {
      a || Ke(P.values);
    },
    [a, Ke]
  ), Le = R((P) => {
    D(P.errors);
  }, []), ye = _(
    () => H ? {
      "ctrl+z": (P) => {
        P.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (P) => {
        P.preventDefault(), t.exec("redo");
      }
    } : {},
    [H, t]
  );
  return oe ? /* @__PURE__ */ g(En, { children: /* @__PURE__ */ g(
    bd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${k} ${n}`,
      items: pe,
      values: oe,
      topBar: w,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: a,
      focus: c,
      onAction: de,
      onSave: He,
      onValidation: Le,
      onChange: $e,
      hotkeys: d && { ...ye, ...d }
    }
  ) }) : null;
}
const Td = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = G(null);
  return Y(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ g(Kc, { api: r, columns: e, children: t });
};
function Dd(t) {
  const { api: e, content: n, children: r } = t, s = F(null), o = F(null), [i, l] = G({}), [a, c] = G(null), [d, u] = G({});
  function h(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const N = v.getAttribute("data-tooltip-id"), S = v.getAttribute("data-tooltip-at"), C = v.getAttribute("data-tooltip");
        if (N || C) return { id: N, tooltip: C, target: v, at: S };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  Y(() => {
    const v = o.current;
    if (v && d && (d.text || n)) {
      const N = v.getBoundingClientRect();
      let S = !1, C = d.left, M = d.top;
      N.right >= i.right && (C = i.width - N.width - 5, S = !0), N.bottom >= i.bottom && (M = d.top - (N.bottom - i.bottom + 2), S = !0), S && u((O) => O && { ...O, left: C, top: M });
    }
  }, [d, i, n]);
  const p = F(null), m = 300, f = (v) => {
    clearTimeout(p.current), p.current = setTimeout(() => {
      v();
    }, m);
  };
  function w(v) {
    let { id: N, tooltip: S, target: C, at: M } = h(v.target);
    if (u(null), c(null), !S)
      if (N)
        S = y(N);
      else {
        clearTimeout(p.current);
        return;
      }
    const O = v.clientX;
    f(() => {
      N && c(x(k(N)));
      const b = C.getBoundingClientRect(), I = s.current, A = I ? I.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, T;
      M === "left" ? (H = b.top + 5 - A.top, T = b.right + 5 - A.left) : (H = b.top + b.height - A.top, T = O - A.left), l(A), u({ top: H, left: T, text: S });
    });
  }
  function x(v) {
    return e?.getTask(k(v)) || null;
  }
  function y(v) {
    return x(v)?.text || "";
  }
  function k(v) {
    const N = parseInt(v);
    return isNaN(N) ? v : N;
  }
  return /* @__PURE__ */ j(
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
            children: n ? /* @__PURE__ */ g(n, { data: a }) : d.text ? /* @__PURE__ */ g("div", { className: "wx-KG0Lwsqo wx-gantt-tooltip-text", children: d.text }) : null
          }
        ) : null,
        r
      ]
    }
  );
}
function Md({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Yr, { fonts: t, children: e() }) : /* @__PURE__ */ g(Yr, { fonts: t });
}
function Ed({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Gr, { fonts: t, children: e }) : /* @__PURE__ */ g(Gr, { fonts: t });
}
function Rd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ g(Kr, { fonts: t, children: e }) : /* @__PURE__ */ g(Kr, { fonts: t });
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
