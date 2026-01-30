import { jsx as p, jsxs as J, Fragment as Ae } from "react/jsx-runtime";
import Ko, { useState as B, useEffect as V, useRef as F, createContext as zt, useContext as _e, useMemo as $, useCallback as R, forwardRef as _t, useImperativeHandle as Tt, useId as jo, Fragment as Ms } from "react";
import { createPortal as qo, flushSync as Xo } from "react-dom";
function Be(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function tr(t, e = "data-id") {
  const n = Be(t, e);
  return n ? n.getAttribute(e) : null;
}
function bt(t, e = "data-id") {
  const n = Be(t, e);
  return n ? Ot(n.getAttribute(e)) : null;
}
function Ot(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Qo() {
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
var Ze = Qo();
function mr(t) {
  Object.assign(Ze, t);
}
function Pr(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const i = Ot(o.dataset.id);
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
  Ze.addEvent(t, n, r);
}
function Es(t, e) {
  Pr(t, e, "click"), e.dblclick && Pr(t, e.dblclick, "dblclick");
}
function Zo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Rs = /* @__PURE__ */ new Date(), Sn = !1, hn = [], St = [], Wr = (t) => {
  if (Sn) {
    Sn = !1;
    return;
  }
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = St[e];
    if (!(r > Rs) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Jo = (t) => {
  Rs = /* @__PURE__ */ new Date(), Sn = !0;
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n } = St[e];
    if (!n.contains(t.target) && n !== t.target) {
      Sn = !1;
      break;
    }
  }
};
function tn(t, e) {
  hn.length || (hn = [
    Ze.addGlobalEvent("click", Wr, t),
    Ze.addGlobalEvent("contextmenu", Wr, t),
    Ze.addGlobalEvent("mousedown", Jo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return St.push(n), {
    destroy() {
      Zo(St, n), St.length || (hn.forEach((r) => r()), hn = []);
    }
  };
}
var gn = (t) => t.indexOf("bottom") !== -1, pn = (t) => t.indexOf("left") !== -1, mn = (t) => t.indexOf("right") !== -1, Fn = (t) => t.indexOf("top") !== -1, zr = (t) => t.indexOf("fit") !== -1, wn = (t) => t.indexOf("overlap") !== -1, ei = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), ti = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function ni(t, e) {
  let n = 0;
  const r = Ze.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ve, Xe, Kt, Ge;
function ri(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ve = r, Xe = s, Kt = "auto";
  let o = 0, i = 0;
  const a = si(t), l = wn(n) ? Ze.getTopNode(t) : a;
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
    const b = ni(e, a);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (Ge = e.getBoundingClientRect(), zr(n) && (Kt = Ge.width + "px"), n !== "point")
      if (ei(n))
        zr(n) ? Ve = 0 : (Ve = u.width / 2, i = 1), Xe = (u.height - d.height) / 2;
      else {
        const b = wn(n) ? 0 : 1;
        Ve = mn(n) ? Ge.right + b : Ge.left - b, Xe = gn(n) ? Ge.bottom + 1 : Ge.top;
        const k = ti(n);
        k && (mn(n) || pn(n) ? k === "center" ? Xe -= (d.height - Ge.height) / 2 : k === "end" && (Xe -= d.height - Ge.height) : (gn(n) || Fn(n)) && (k === "center" ? Ve -= (d.width - Ge.width) / 2 : k === "end" && (Ve -= d.width - Ge.width), wn(n) || (Ve += 1)));
      }
  } else Ge = { left: r, right: r, top: s, bottom: s };
  const m = (pn(n) || mn(n)) && (gn(n) || Fn(n));
  pn(n) && (i = 2);
  const f = Ve - d.width - u.left;
  e && pn(n) && !m && f < 0 && (Ve = Ge.right, i = 0);
  const x = Ve + d.width * (1 - i / 2) - u.right;
  if (x > 0)
    if (!mn(n))
      Ve = u.right - g.right - d.width;
    else {
      const b = Ge.left - u.x - d.width;
      e && !wn(n) && !m && b >= 0 ? Ve = Ge.left - d.width : Ve -= x + g.right;
    }
  i && (Ve = Math.round(Ve - d.width * i / 2));
  const w = f < 0 || x > 0 || !m;
  Fn(n) && (Xe = Ge.top - d.height, e && Xe < u.y && w && (Xe = Ge.bottom));
  const y = Xe + d.height - u.bottom;
  return y > 0 && (e && gn(n) && w ? Xe -= d.height + Ge.height + 1 : Xe -= y + g.bottom), Ve -= c.left + g.left, Xe -= c.top + g.top, Ve = Math.max(Ve, 0) + l.scrollLeft, Xe = Math.max(Xe, 0) + l.scrollTop, Kt = Kt || "auto", { x: Ve, y: Xe, z: o, width: Kt };
}
function si(t) {
  const e = Ze.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Or = (/* @__PURE__ */ new Date()).valueOf();
function wr() {
  return Or += 1, Or;
}
var oi = class {
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
}, Lt = [], Fr = {
  subscribe: (t) => {
    ii();
    const e = new oi();
    return Lt.push(e), t(e), () => {
      const n = Lt.findIndex((r) => r === e);
      n >= 0 && Lt.splice(n, 1);
    };
  }
}, Ur = !1;
function ii() {
  Ur || (Ur = !0, document.addEventListener("keydown", (t) => {
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
function Qe(t) {
  return t < 10 ? "0" + t : t.toString();
}
function ai(t) {
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
function Yr(t, e = 1) {
  let n = t.getDay();
  n === 0 && (n = 7), n = (n - e + 7) % 7;
  const r = new Date(t.valueOf());
  r.setDate(t.getDate() + (3 - n));
  const s = r.getFullYear(), o = Math.floor(
    (r.getTime() - new Date(s, 0, 1).getTime()) / 864e5
  );
  return 1 + Math.floor(o / 7);
}
var Vr = ["", ""];
function li(t, e, n) {
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
      return ((e.getHours() > 11 ? n.pm : n.am) || Vr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Vr)[1];
    case "%s":
      return Qe(e.getSeconds());
    case "%S":
      return ai(e.getMilliseconds());
    case "%W":
      return Qe(Yr(e));
    case "%w":
      return Qe(Yr(e, n.weekStart ?? 1));
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
var ci = /%[a-zA-Z]/g;
function lt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      ci,
      (r) => li(r, n, e)
    )) : "";
  };
}
function Gr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function nr(t, e) {
  for (const n in e) {
    const r = e[n];
    Gr(t[n]) && Gr(r) ? t[n] = nr(
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
      return n ? r = nr({ ...e }, t) : r = nr({ ...t }, e), Nt(r);
    }
  };
}
function ze(t) {
  const [e, n] = B(t), r = F(t);
  return V(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function di(t, e, n) {
  const [r, s] = B(() => e);
  return t || console.warn(`Writable ${n} is not defined`), V(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function se(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return di(r[e], n[e], e);
}
function at(t, e) {
  const [n, r] = B(() => null);
  return V(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function ui(t, e) {
  const n = F(e);
  n.current = e;
  const [r, s] = B(1);
  return V(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function Xt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ui(r[e], n[e]);
}
function fi(t, e) {
  V(() => {
    const n = e.current;
    if (n)
      return Fr.subscribe((r) => {
        r.configure(t, n);
      });
  }, [Fr, e]);
}
function xr(t, e) {
  return typeof t == "function" ? typeof e == "object" ? t(e) : t() : t;
}
function As(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, a) => a.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Hs(t) {
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
function Br(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const i = Ot(o.dataset.id);
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
  return Ze.addEvent(t, n, r);
}
function hi(t, e) {
  const n = [Br(t, e, "click")];
  return e.dblclick && n.push(Br(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const gi = "en-US", pi = {
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
}, mi = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, wi = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, nn = {
  core: mi,
  calendar: pi,
  formats: wi,
  lang: gi
}, rn = zt("willow"), xi = zt({}), rt = zt(null), yr = zt(null), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: yr,
  helpers: xi,
  i18n: rt,
  theme: rn
}, Symbol.toStringTag, { value: "Module" }));
function Ft(t) {
  const e = _e(yr);
  return t || e;
}
function yi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a
}) {
  const l = Ft(e), [c, d] = ze(t), u = R(
    (m) => {
      const f = m.target.value;
      d(f), a && a({ value: f, input: !0 });
    },
    [a]
  ), h = R(
    (m) => {
      const f = m.target.value;
      d(f), a && a({ value: f });
    },
    [a]
  ), g = F(null);
  return V(() => {
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
  return /* @__PURE__ */ J(
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
function vi({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const i = jo(), a = Ft(t) || i, [l, c] = ze(r);
  return /* @__PURE__ */ J("div", { className: "wx-2IvefP wx-checkbox", children: [
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
    /* @__PURE__ */ J("label", { htmlFor: a, className: "wx-2IvefP wx-label", children: [
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
  const i = F(null), [a, l] = ze(t), [c, d] = ze(e);
  return V(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), g = Ze.getTopNode(u).getBoundingClientRect();
        h.right >= g.right && d("end"), h.bottom >= g.bottom && l("top");
      }
    }
  }, [n]), V(() => {
    if (i.current) {
      const u = (h) => {
        r && r(h);
      };
      return tn(i.current, u).destroy;
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
  return Nt(nn);
}
function ki() {
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
  const s = F(), o = F(ki()), [i, a] = B(null), l = F(i), c = (_e(rt) || sn()).getGroup("core"), d = (h) => {
    h && h.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  V(() => {
    o.current.init(
      s.current,
      t,
      (h) => {
        a(h), l.current = h;
      },
      d
    );
  }, [t, s.current]), V(() => {
    r && r(o.current);
  }, []);
  const u = R(() => {
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
          children: e ? xr(e, { option: h }) : h.label
        },
        h.id
      )) : /* @__PURE__ */ p("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function bi({
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
  const h = Ft(e), g = F(null), m = F(null), [f, x] = ze(t), [w, y] = B(!1), [b, k] = B(""), N = F(null), S = F(!1), C = $(() => {
    if (w) return b;
    if (f || f === 0) {
      const Q = (r || n).find((ce) => ce.id === f);
      if (Q) return Q[s];
    }
    return "";
  }, [w, b, f, r, n, s]), E = $(() => !C || !w ? n : n.filter(
    (Q) => Q[s].toLowerCase().includes(C.toLowerCase())
  ), [C, w, n, s]), O = R(
    () => E.findIndex((Q) => Q.id === f),
    [E, f]
  ), D = R((Q) => {
    g.current = Q.navigate, m.current = Q.keydown;
  }, []), M = R(
    (Q, ce) => {
      if (Q || Q === 0) {
        let Se = n.find((P) => P.id === Q);
        if (y(!1), ce && g.current(null), Se && f !== Se.id) {
          const P = Se.id;
          x(P), u && u({ value: P });
        }
      }
      !S.current && ce && N.current.focus();
    },
    [n, f, u]
  ), z = R(
    ({ id: Q }) => {
      M(Q, !0);
    },
    [M]
  ), H = R(
    (Q) => {
      Q && Q.stopPropagation(), x(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), T = R(
    (Q) => {
      if (!n.length) return;
      if (Q === "" && c) {
        H();
        return;
      }
      let ce = n.find((P) => P[s] === Q);
      ce || (ce = n.find(
        (P) => P[s].toLowerCase().includes(Q.toLowerCase())
      ));
      const Se = ce ? ce.id : f || n[0].id;
      M(Se, !1);
    },
    [n, s, c, f, M, H]
  ), G = R(() => {
    k(N.current.value), y(!0), E.length ? g.current(0) : g.current(null);
  }, [E.length, g]), oe = R(() => {
    S.current = !0;
  }, []), he = R(() => {
    S.current = !1, setTimeout(() => {
      S.current || T(C);
    }, 200);
  }, [T, C]);
  return /* @__PURE__ */ J(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => g.current(O()),
      onKeyDown: (Q) => m.current(Q, O()),
      title: i,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: h,
            ref: N,
            value: C,
            disabled: a,
            placeholder: o,
            onFocus: oe,
            onBlur: he,
            onInput: G
          }
        ),
        c && !a && f ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !a && /* @__PURE__ */ p(En, { items: E, onReady: D, onSelect: z, children: ({ option: Q }) => /* @__PURE__ */ p(Ae, { children: d ? d({ option: Q }) : Q[s] }) })
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
  const f = Ft(e), [x, w] = ze(t), y = F(null), b = $(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), k = $(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  V(() => {
    const O = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(O);
  }, [r, s]);
  const N = R(
    (O) => {
      const D = O.target.value;
      w(D), m && m({ value: D, input: !0 });
    },
    [m]
  ), S = R(
    (O) => m && m({ value: O.target.value }),
    [m]
  );
  function C(O) {
    O.stopPropagation(), w(""), m && m({ value: "" });
  }
  let E = o;
  return o !== "password" && o !== "number" && (E = "text"), V(() => {
    const O = S, D = y.current;
    return D.addEventListener("change", O), () => {
      D && D.removeEventListener("change", O);
    };
  }, [S]), /* @__PURE__ */ J(
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
            onInput: N
          }
        ),
        g && !a && x ? /* @__PURE__ */ J(Ae, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: C }),
          k && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function Si({ date: t, type: e, part: n, onShift: r }) {
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
  return /* @__PURE__ */ J("div", { className: "wx-8HQVQV wx-header", children: [
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
function vr({ onClick: t, children: e }) {
  return /* @__PURE__ */ p("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function $i({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (_e(rt) || sn()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (k, N, S) => new Date(
    k.getFullYear(),
    k.getMonth() + (N || 0),
    k.getDate() + (S || 0)
  );
  let d = n !== "normal";
  function u(k) {
    const N = k.getDay();
    return N === 0 || N === 6;
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
  function f(k, N) {
    N.timeStamp !== m.current && (m.current = N.timeStamp, N.stopPropagation(), o && o(new Date(new Date(k))), s && s());
  }
  const x = $(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), w = $(() => {
    const k = h(), N = g(), S = e.getMonth();
    let C = [];
    for (let E = k; E <= N; E.setDate(E.getDate() + 1)) {
      const O = {
        day: E.getDate(),
        in: E.getMonth() === S,
        date: E.valueOf()
      };
      let D = "";
      if (D += O.in ? "" : " wx-inactive", D += x.indexOf(O.date) > -1 ? " wx-selected" : "", d) {
        const M = O.date == x[0], z = O.date == x[1];
        M && !z ? D += " wx-left" : z && !M && (D += " wx-right"), O.date > x[0] && O.date < x[1] && (D += " wx-inrange");
      }
      if (D += u(E) ? " wx-weekend" : "", r) {
        const M = r(E);
        M && (D += " " + M);
      }
      C.push({ ...O, css: D });
    }
    return C;
  }, [e, x, d, r]), y = F(null);
  let b = F({});
  return b.current.click = f, V(() => {
    Es(y.current, b.current);
  }, []), /* @__PURE__ */ J("div", { children: [
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
function Ci({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [i, a] = ze(t || /* @__PURE__ */ new Date()), [l, c] = ze(e || /* @__PURE__ */ new Date()), d = _e(rt).getRaw().calendar, u = d.monthShort || [], h = $(() => l.getMonth(), [l]), g = R(
    (x, w) => {
      if (x != null) {
        w.stopPropagation();
        const y = new Date(l);
        y.setMonth(x), c(y), o && o({ current: y });
      }
      n === "normal" && a(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = R(() => {
    const x = new Date(Ls(i, n) || l);
    x.setMonth(l.getMonth()), x.setFullYear(l.getFullYear()), s && s(x);
  }, [i, l, n, s]), f = R(
    (x) => {
      const w = x.target.closest("[data-id]");
      if (w) {
        const y = parseInt(w.getAttribute("data-id"), 10);
        g(y, x);
      }
    },
    [g]
  );
  return /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-months", onClick: f, children: u.map((x, w) => /* @__PURE__ */ p(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === w ? " wx-current" : ""),
        "data-id": w,
        children: x
      },
      w
    )) }),
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ p(vr, { onClick: m, children: d.done }) })
  ] });
}
const Un = "wx-1XEF33", _i = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = _e(rt).getRaw().calendar, [a, l] = ze(e), [c, d] = ze(t), u = $(() => a.getFullYear(), [a]), h = $(() => {
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
  return V(() => {
    x.current && Es(x.current, g);
  }, []), /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ p("div", { className: Un + " wx-years", ref: x, children: h.map((w, y) => /* @__PURE__ */ p(
      "div",
      {
        className: Un + ` wx-year ${u == w ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": w,
        children: w
      },
      y
    )) }),
    /* @__PURE__ */ p("div", { className: Un + " wx-buttons", children: /* @__PURE__ */ p(vr, { onClick: f, children: i.done }) })
  ] });
}, Kr = {
  month: {
    component: $i,
    next: Ni,
    prev: Ti
  },
  year: {
    component: Ci,
    next: Mi,
    prev: Di
  },
  duodecade: {
    component: _i,
    next: Ri,
    prev: Ei
  }
};
function Ti(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Ni(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function Di(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Mi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Ei(t) {
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
const Ii = ["clear", "today"];
function Ai(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Hi({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a
}) {
  const l = _e(rt).getGroup("calendar"), [c, d] = B("month"), u = Array.isArray(o) ? o : o ? Ii : [], h = (w, y) => {
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
      const k = Kr[c];
      n(y > 0 ? k.next(e) : k.prev(e));
    } else b && n(b);
    i && i();
  }, f = (w) => {
    d("month"), a && a({ select: !0, value: w });
  }, x = $(() => Kr[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ J("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p(Si, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ J("div", { children: [
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
            vr,
            {
              onClick: (y) => h(y, Ai(w)),
              children: l(w)
            }
          ) }, w)) })
        ] })
      ] })
    }
  );
}
function Rn(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = _e(rt);
  const o = $(() => {
    let i = s;
    return (!i || !i.extend) && (i = Nt(nn)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ p(rt.Provider, { value: o, children: r });
}
function jr(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const Li = ["clear", "today"];
function Ps({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Li,
  onChange: s
}) {
  const [o, i] = ze(t), [a, l] = ze(e);
  V(() => {
    jr(a, o, l, !1);
  }, [o, a]);
  const c = R(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), jr(a, new Date(h), l, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, a]
  ), d = R(
    (u) => {
      l(u);
    },
    [l]
  );
  return a ? /* @__PURE__ */ p(Rn, { children: /* @__PURE__ */ p(
    Hi,
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
  const [y, b] = B(t), [k, N] = B(!1);
  V(() => {
    b(t);
  }, [t]);
  function S() {
    N(!1);
  }
  function C(D) {
    const M = D === y || D && y && D.valueOf() === y.valueOf() || !D && !y;
    b(D), M || g && g({ value: D }), setTimeout(S, 1);
  }
  const E = $(
    () => y ? w(y) : "",
    [y, w]
  );
  function O({ value: D, input: M }) {
    if (!u && !h || M) return;
    let z = typeof u == "function" ? u(D) : D ? new Date(D) : null;
    z = isNaN(z) ? y || null : z || null, C(z);
  }
  return V(() => {
    const D = S;
    return window.addEventListener("scroll", D), () => window.removeEventListener("scroll", D);
  }, []), /* @__PURE__ */ J("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => N(!0), children: [
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
    k && !n && /* @__PURE__ */ p(
      Ut,
      {
        onCancel: S,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ p(
          Ps,
          {
            buttons: l,
            value: y,
            onChange: (D) => C(D.value)
          }
        )
      }
    )
  ] });
}
function Ws({
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
  let [g, m] = ze(t);
  function f(k) {
    u.current = k.navigate, h.current = k.keydown;
  }
  const x = $(() => g || g === 0 ? (n || e).find((k) => k.id === g) : null, [g, n, e]), w = R(
    ({ id: k }) => {
      (k || k === 0) && (m(k), u.current(null), d && d({ value: k }));
    },
    [m, d]
  ), y = R(
    (k) => {
      k.stopPropagation(), m(""), d && d({ value: "" });
    },
    [m, d]
  ), b = R(() => e.findIndex((k) => k.id === g), [e, g]);
  return /* @__PURE__ */ J(
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
function rr({
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
  const d = Ft(t), [u, h] = ze(o), g = F({ value: u, input: u }), m = $(
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
  V(() => {
    h(o);
  }, [o]);
  const y = F(null);
  return V(() => {
    if (y.current)
      return y.current.addEventListener("change", w), () => {
        y.current && y.current.removeEventListener("change", w);
      };
  }, [y, w]), /* @__PURE__ */ J("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
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
  const c = Ft(t), [d, u] = ze(e), h = R(() => {
    if (a || d <= r) return;
    const x = d - n;
    u(x), l && l({ value: x });
  }, [d, a, r, n, l]), g = R(() => {
    if (a || d >= s) return;
    const x = d + n;
    u(x), l && l({ value: x });
  }, [d, a, s, n, l]), m = R(() => {
    if (!a) {
      const x = Math.round(Math.min(s, Math.max(d, r)) / n) * n, w = isNaN(x) ? Math.max(r, 0) : x;
      u(w), l && l({ value: w });
    }
  }, [a, d, s, r, n, l]), f = R(
    (x) => {
      const w = x.target.value * 1;
      u(w), l && l({ value: w, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ J(
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
function Oi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ J(
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
function Fi({ data: t = [] }) {
  return /* @__PURE__ */ p("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ p(Oi, { notice: e }, e.id)) });
}
function Ui({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const a = (_e(rt) || sn()).getGroup("core"), l = F(null);
  V(() => {
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
      children: /* @__PURE__ */ J("div", { className: "wx-1FxkZa wx-window", children: [
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
function Yi({ children: t }, e) {
  const [n, r] = B(null), [s, o] = B([]);
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
        i = { ...i }, i.id = i.id || wr(), i.remove = () => o((a) => a.filter((l) => l.id !== i.id)), i.expire != -1 && setTimeout(i.remove, i.expire || 5100), o((a) => [...a, i]);
      }
    }),
    []
  ), /* @__PURE__ */ J(Ae, { children: [
    t,
    n && /* @__PURE__ */ p(
      Ui,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ p(Fi, { data: s })
  ] });
}
_t(Yi);
function Zt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const a = $(() => wr(), []);
  return /* @__PURE__ */ p(yr.Provider, { value: a, children: /* @__PURE__ */ J(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ p("label", { className: "wx-2oVUvC wx-label", htmlFor: a, children: t }),
        /* @__PURE__ */ p("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: xr(i, { id: a }) })
      ]
    }
  ) });
}
const zs = ({
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
  const [g, m] = ze(t), f = $(() => (g ? "pressed" : "") + (e ? " " + e : ""), [g, e]), x = R(
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
      children: xr(u, { value: g })
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
}, qr = new Date(0, 0, 0, 0, 0);
function Vi({
  value: t = qr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = ze(t);
  const { calendar: d, formats: u } = (_e(rt) || sn()).getRaw(), h = d.clockFormat == 12, g = 23, m = 59, f = $(() => {
    const P = i || u?.timeFormat;
    return typeof P == "function" ? P : lt(P, d);
  }, [i, u, d]), x = $(() => f(new Date(0, 0, 0, 1)).indexOf("01") != -1, [f]), w = (P, ae) => (P < 10 && ae ? `0${P}` : `${P}`).slice(-2), y = (P) => w(P, !0), b = (P) => `${P}`.replace(/[^\d]/g, "") || 0, k = (P) => h && (P = P % 12, P === 0) ? "12" : w(P, x), N = R((P, ae) => (P = b(P), Math.min(P, ae)), []), [S, C] = B(null), E = l || qr, O = N(E.getHours(), g), D = N(E.getMinutes(), m), M = O > 12, z = k(O), H = y(D), T = $(
    () => f(new Date(0, 0, 0, O, D)),
    [O, D, f]
  ), G = R(() => {
    C(!0);
  }, []), oe = R(() => {
    const P = new Date(E);
    P.setHours(P.getHours() + (M ? -12 : 12)), c(P), a && a({ value: P });
  }, [E, M, a]), he = R(
    ({ value: P }) => {
      if (E.getHours() === P) return;
      const ae = new Date(E);
      ae.setHours(P), c(ae), a && a({ value: ae });
    },
    [E, a]
  ), Q = R(
    ({ value: P }) => {
      if (E.getMinutes() === P) return;
      const ae = new Date(E);
      ae.setMinutes(P), c(ae), a && a({ value: ae });
    },
    [E, a]
  ), ce = R(
    (P) => (P = N(P, g), h && (P = P * 1, P === 12 && (P = 0), M && (P += 12)), P),
    [N, h, M]
  ), Se = R(() => {
    C(null);
  }, []);
  return /* @__PURE__ */ J(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : G,
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
        S && !s && /* @__PURE__ */ p(Ut, { onCancel: Se, width: "unset", children: /* @__PURE__ */ J("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ J("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: z,
                onChange: (P) => {
                  const ae = ce(P.target.value);
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
                onChange: (P) => {
                  const ae = N(P.target.value, m);
                  Q({ value: ae });
                }
              }
            ),
            h && /* @__PURE__ */ p(
              zs,
              {
                value: M,
                onClick: oe,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(Zt, { width: "unset", children: /* @__PURE__ */ p(
            rr,
            {
              label: d.hours,
              value: O,
              onChange: he,
              max: g
            }
          ) }),
          /* @__PURE__ */ p(Zt, { width: "unset", children: /* @__PURE__ */ p(
            rr,
            {
              label: d.minutes,
              value: D,
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
  return V(() => tn(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Os({ theme: t = "", target: e, children: n }) {
  const r = F(null), s = F(null), [o, i] = B(null);
  r.current || (r.current = document.createElement("div"));
  const a = _e(rn);
  return V(() => {
    i(
      e || Ki(s.current) || Ze.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ p("span", { ref: s, style: { display: "none" } }),
    s.current && o ? qo(
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
function Ki(t) {
  const e = Ze.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function ji() {
  return /* @__PURE__ */ p(Ae, {});
}
function Xr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(rn.Provider, { value: "material", children: /* @__PURE__ */ J(Ae, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ J(Ae, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(ji, {}),
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
function Qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(rn.Provider, { value: "willow", children: /* @__PURE__ */ J(Ae, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ J(Ae, { children: [
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
function Zr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(rn.Provider, { value: "willow-dark", children: /* @__PURE__ */ J(Ae, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ J(Ae, { children: [
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
mr(Ze);
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
var qi = (/* @__PURE__ */ new Date()).valueOf(), Xi = () => qi++;
function Qi(t, e) {
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
      return Qi(t, e);
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
}, Ys = (/* @__PURE__ */ new Date()).valueOf(), Zi = () => Ys++;
function kr() {
  return "temp://" + Ys++;
}
var Jr = class {
  constructor(e) {
    this._data = e, this._pool = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      this._pool.set(r.id, r);
    }
  }
  add(e) {
    e = { id: Zi(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, Ji = class {
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
    t.$level = n.$level + 1, this._pool.set(t.id, t), n.data ? e === -1 ? n.data = [...n.data, t] : es(n, e, t) : n.data = [t];
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
    ea(a, c);
    const d = s ? l.data.length : xn(l, o.id) + (e === "after" ? 1 : 0);
    if (es(l, d, r), a.id === l.id && c === d) return null;
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
function ea(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function es(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function xn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Gs = 2, ta = class {
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
      a ? (a.__parse(c, d, s, o) && (n[i] = c), o & Gs ? s[d] = a.__trigger : a.__trigger()) : (c && c.__reactive ? e[i] = this._wrapNested(c, c, d, s) : e[i] = this._wrapWritable(c), n[i] = c), s[d] = s[d] || null;
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
}, na = class {
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
      s.length = Math.max(...s.in.map((o) => Bs(o, this._sources, 1)));
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
    const e = this._setter(t, Gs);
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
function Bs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Bs(o, e, n + 1));
  return Math.max(...s);
}
var ra = class {
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
function sa(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function oa(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function ia({ key: t, order: e }) {
  const n = e === "asc" ? sa : oa;
  return (r, s) => n(r[t], s[t]);
}
function aa(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => ia(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function la(t, e) {
  return t.sort(aa(e));
}
class ca extends Ji {
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
    r && (la(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && Ks(n, e), e;
  }
}
function Ks(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Ks(n.data, e);
  });
}
function Ne(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ut(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Hn(t, e) {
  const n = Ne(t);
  return isNaN(e) ? ut(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function br(t, e) {
  const n = Ne(t);
  if (isNaN(e)) return ut(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ut(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function js(t, e) {
  const n = +Ne(t);
  return ut(t, n + e);
}
const qs = 6048e5, da = 864e5, Xs = 6e4, Qs = 36e5;
function ua(t, e) {
  return js(t, e * Qs);
}
let fa = {};
function Zs() {
  return fa;
}
function Cn(t, e) {
  const n = Zs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Ne(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Jt(t) {
  return Cn(t, { weekStartsOn: 1 });
}
function ha(t) {
  const e = Ne(t), n = e.getFullYear(), r = ut(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Jt(r), o = ut(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Jt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function $t(t) {
  const e = Ne(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = Ne(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Js(t, e) {
  const n = $t(t), r = $t(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / da);
}
function ts(t) {
  const e = ha(t), n = ut(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Jt(n);
}
function ga(t, e) {
  return js(t, e * Xs);
}
function pa(t, e) {
  const n = e * 3;
  return br(t, n);
}
function eo(t, e) {
  const n = e * 7;
  return Hn(t, n);
}
function ma(t, e) {
  return br(t, e * 12);
}
function Qt(t, e) {
  const n = Ne(t), r = Ne(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function wa(t, e) {
  const n = $t(t), r = $t(e);
  return +n == +r;
}
function Sr(t, e) {
  const n = Jt(t), r = Jt(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / qs);
}
function xa(t, e) {
  const n = Ne(t), r = Ne(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function ya(t, e) {
  const n = Ne(t), r = Ne(e);
  return n.getFullYear() - r.getFullYear();
}
function $r(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function to(t, e) {
  return +Ne(t) - +Ne(e);
}
function va(t, e, n) {
  const r = to(t, e) / Qs;
  return $r(n?.roundingMethod)(r);
}
function ka(t, e, n) {
  const r = to(t, e) / Xs;
  return $r(n?.roundingMethod)(r);
}
function no(t) {
  const e = Ne(t);
  return e.setHours(23, 59, 59, 999), e;
}
function Cr(t) {
  const e = Ne(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function ba(t) {
  const e = Ne(t);
  return +no(e) == +Cr(e);
}
function ro(t, e) {
  const n = Ne(t), r = Ne(e), s = Qt(n, r), o = Math.abs(xa(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Qt(n, r) === -s;
    ba(Ne(t)) && o === 1 && Qt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function Sa(t, e, n) {
  const r = ro(t, e) / 3;
  return $r(n?.roundingMethod)(r);
}
function $a(t, e) {
  const n = Ne(t), r = Ne(e), s = Qt(n, r), o = Math.abs(ya(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Qt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function en(t) {
  const e = Ne(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function so(t) {
  const e = Ne(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Ca(t) {
  const e = Ne(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function _a(t) {
  const e = Ne(t), n = ut(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Ta(t) {
  const e = Ne(t);
  return e.setMinutes(59, 59, 999), e;
}
function Na(t, e) {
  const n = Zs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Ne(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function _r(t) {
  const e = Ne(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function oo(t) {
  const e = Ne(t), n = e.getFullYear(), r = e.getMonth(), s = ut(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Da(t) {
  const e = Ne(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function io(t) {
  const e = Ne(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : Da(e) ? 366 : 365;
}
function Ma(t) {
  const e = ts(t), n = +ts(eo(e, 60)) - +e;
  return Math.round(n / qs);
}
function At(t, e) {
  const n = Ne(t), r = Ne(e);
  return +n == +r;
}
function Ea(t) {
  const e = Ne(t);
  return e.setMinutes(0, 0, 0), e;
}
function Ra(t, e, n) {
  const r = Cn(t, n), s = Cn(e, n);
  return +r == +s;
}
function Ia(t, e) {
  const n = Ne(t), r = Ne(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Aa(t, e) {
  const n = en(t), r = en(e);
  return +n == +r;
}
function Ha(t, e) {
  const n = Ne(t), r = Ne(e);
  return n.getFullYear() === r.getFullYear();
}
const sr = { year: $a, quarter: Sa, month: ro, week: Sr, day: Js, hour: va, minute: ka }, pt = { year: { quarter: 4, month: 12, week: Ma, day: La, hour: Pa }, quarter: { month: 3, week: Wa, day: ao, hour: za }, month: { week: Oa, day: Fa, hour: Ua }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function La(t) {
  return t ? io(t) : 365;
}
function Pa(t) {
  return io(t) * 24;
}
function Wa(t) {
  const e = en(t), n = Hn($t(_r(t)), 1);
  return Sr(n, e);
}
function ao(t) {
  if (t) {
    const e = en(t), n = _r(t);
    return Js(n, e) + 1;
  }
  return 91;
}
function za(t) {
  return ao(t) * 24;
}
function Oa(t) {
  if (t) {
    const e = so(t), n = Hn($t(Cr(t)), 1);
    return Sr(n, e);
  }
  return 5;
}
function Fa(t) {
  return t ? oo(t) : 30;
}
function Ua(t) {
  return oo(t) * 24;
}
function Tn(t, e, n) {
  const r = pt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Ya(t, e) {
  return t === e || !!(pt[t] && pt[t][e]);
}
const Nn = { year: ma, quarter: pa, month: br, week: eo, day: Hn, hour: ua, minute: ga };
function Tr(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !pt[t][o] || typeof pt[t][o] == "number" || uo(t, r, s, n) ? qt(t, r, s, o, i, n) : Va(r, s, t, o, i, n);
}
function qt(t, e, n, r, s, o) {
  const i = r || t;
  let a = n, l = e;
  if (s && (a = dt(i, n, o), l = dt(i, e, o), l < e && (l = it(i)(l, 1))), t !== i) {
    const c = sr[i](l, a), d = Tn(t, i, n);
    return c / d;
  } else return sr[i](l, a);
}
function Va(t, e, n, r, s, o) {
  let i = 0;
  const a = dt(n, e, o);
  if (e > a) {
    const c = Nn[n](a, 1);
    i = qt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return uo(n, e, t, o) || (l = qt(n, dt(n, t, o), e, void 0, void 0, o), e = Nn[n](e, l)), l += i + qt(n, t, e, r, void 0, o), !l && s && (l = qt(n, t, e, r, s, o)), l;
}
function it(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Nn[t];
}
const lo = { year: _a, quarter: en, month: so, week: (t, e) => Cn(t, { weekStartsOn: e }), day: $t, hour: Ea };
function dt(t, e, n) {
  const r = lo[t];
  return r ? r(e, n) : new Date(e);
}
const Ga = { year: Ca, quarter: _r, month: Cr, week: (t, e) => Na(t, { weekStartsOn: e }), day: no, hour: Ta }, co = { year: Ha, quarter: Aa, month: Ia, week: (t, e, n) => Ra(t, e, { weekStartsOn: n }), day: wa };
function uo(t, e, n, r) {
  const s = co[t];
  return s ? s(e, n, r) : !1;
}
const Ba = { start: lo, end: Ga, add: Nn, isSame: co, diff: sr, smallerCount: pt }, ns = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ka(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((a, l) => ot.indexOf(a) - ot.indexOf(l)).shift();
      let s = ot.indexOf(r);
      const o = e[n][r], i = ns(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = ot[a], c = ns(pt[l][r]);
        if (i <= c) break;
        s = a;
      }
      ot.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) pt[r][t] = e[n][r];
    else Ba[n][t] = e[n];
  }
}
function Yn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function ja(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Wt(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: it(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const ot = ["year", "quarter", "month", "week", "day", "hour"], or = 50, ir = 300;
function qa(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, a = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, l = !0);
  });
  const c = it(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function Xa(t, e, n, r, s, o, i) {
  const a = Wt(i).unit, l = Tr(a, void 0, o), c = l(e, t, "", !0), d = dt(a, e, o);
  t = dt(a, t, o), e = d < e ? it(a)(d, 1) : d;
  const u = c * r, h = s * i.length, g = i.map((f) => {
    const x = [], w = it(f.unit);
    let y = dt(f.unit, t, o);
    for (; y < e; ) {
      const b = w(y, f.step), k = y < t ? t : y, N = b > e ? e : b, S = l(N, k, "", !0) * r, C = typeof f.format == "function" ? f.format(y, b) : f.format;
      let E = "";
      f.css && (E += typeof f.css == "function" ? f.css(y) : f.css), x.push({ width: S, value: C, date: k, css: E, unit: f.unit }), y = b;
    }
    return { cells: x, add: w, height: s };
  });
  let m = r;
  return a !== n && (m = Math.round(m / Tn(a, n)) || 1), { rows: g, width: u, height: h, diff: l, start: t, end: e, lengthUnit: n, minUnit: a, lengthUnitWidth: m };
}
function Qa(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = ot.indexOf(Wt(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = yn(s.minCellWidth, or)), l.maxCellWidth || (l.maxCellWidth = yn(s.maxCellWidth, ir));
  });
  else {
    const l = [], c = n.length || 1, d = yn(s.minCellWidth, or), u = yn(s.maxCellWidth, ir);
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
function Za(t, e, n, r, s, o, i) {
  t.level = n;
  let a;
  const l = r.scales || r, c = Wt(l).unit, d = Ja(c, s);
  if (e === -1) {
    const g = Tn(c, s);
    a = i * g;
  } else {
    const g = Tn(Wt(o).unit, c);
    a = Math.round(i / g);
  }
  const u = r.minCellWidth ?? or, h = r.maxCellWidth ?? ir;
  return { scales: l, cellWidth: Math.min(h, Math.max(u, a)), lengthUnit: d, zoom: t };
}
function Ja(t, e) {
  const n = ot.indexOf(t), r = ot.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : ot[r];
}
function yn(t, e) {
  return t ?? e;
}
const ar = 8, fo = 4, el = 3, rs = 7, tl = ar + fo;
function ho(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && po(s, n, r), s.$x += e, ho(s, e, n, r);
  });
}
function lr(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    go(o, i, n, r), o.$x = i.xMin, o.$w = i.xMax - i.xMin, lr(t, o, n, r);
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
  return ss(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    mo(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && ss(t, e, n, !0), t;
}
function ss(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = n, { start: l, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", g = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), f = "$y" + (r ? "_base" : ""), x = "$w" + (r ? "_base" : ""), w = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let b = t[h], k = t[g];
  if (r && !b) {
    t[y] = !0;
    return;
  }
  t[h] < l && (t[g] < l || At(t[g], l)) ? b = k = l : t[h] > c && (b = k = c), t[m] = Math.round(u(b, l, d) * s), t[f] = r ? t.$y + t.$h + fo : o * e + el, t[x] = Math.round(u(k, b, d, !0) * s), t[w] = r ? ar : a ? o - rs - tl : o - rs, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[x] = t.$h, r && (t[f] = t.$y + ar, t[x] = t[w] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = At(b, k);
}
const Vn = 20, nl = function(t, e, n, r, s) {
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
    const h = sl(l, c + o, d, u + o, i, a, r / 2, s), g = ol(d, u + o, a);
    t.$p = `${h},${g}`, t.$pl = rl(t.$p);
  }
  return t;
};
function rl(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s], [a, l] = n[s + 1];
    r += Math.hypot(a - o, l - i);
  }
  return r;
}
function sl(t, e, n, r, s, o, i, a) {
  const l = Vn * (s ? -1 : 1), c = Vn * (o ? -1 : 1), d = t + l, u = n + c, h = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], g = u - d;
  let m = r - e;
  const f = o === s;
  return f || (u <= t + Vn - 2 && o || u > t && !o) && (m = a ? m - i + 6 : m - i), f && o && d > u || f && !o && d < u ? (h[4] = h[2] + g, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + g, h[7] = h[5]), h.join(",");
}
function ol(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function wo(t) {
  return t.map((e) => {
    const n = e.id || kr();
    return { ...e, id: n };
  });
}
const xo = ["start", "end", "duration"];
function il(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !xo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function al(t, e) {
  return typeof e == "function" ? e : xo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => il(n, r.id) ? e : null) : e;
}
function ll(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && al(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const yo = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Ht(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, a = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, g = !i && d.includes(e), m = { parent: u.includes(e), level: h[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !g)) {
    if (e !== "paste-task" && (t._temp = null), a.includes(e) || g || s.length === 1) os(t, e, n, r);
    else if (i) {
      const f = l.includes(e) ? s : cl(s, o, m);
      c.includes(e) && f.reverse();
      const x = t.getHistory();
      x && x.startBatch(), f.forEach((w, y) => os(t, e, w, r, y)), x && x.endBatch();
    }
  }
}
function cl(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function os(t, e, n, r, s) {
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
function Dr(t, e) {
  return t.some((n) => n.data ? Dr(n.data, e) : n.id === e);
}
const is = (t, e) => it(t, e), dl = (t, e) => Tr(t, e);
function cr(t, e) {
  Array.isArray(t) && (t.forEach((n) => vt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Nr(n, t);
      n.start = r, n.end = s, vt(n, e);
    }
  }));
}
function vt(t, e) {
  t.unscheduled || as(t, e, !1), t.base_start && as(t, e, !0);
}
function as(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, a, l] = vo(n);
  t.type === "milestone" ? (t[l] = 0, t[a] = void 0) : t[i] && (t[l] ? t[a] = is(o, r)(t[i], t[l]) : t[a] ? t[l] = dl(o, r)(t[a], t[i]) : (t[a] = is(o, r)(t[i], 1), t[l] = 1));
}
function vo(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function ls(t, e, n) {
  const [r, s, o] = vo(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function ko(t, e, n) {
  ls(t, n, !1), t.base_start && ls(t, n, !0), vt(t, e);
}
class ul extends ta {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new na(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: a, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!a || !l || u) {
        const h = Wt(d).unit, g = qa(a, l, u, h, c);
        (g._end != o || g._start != i) && this.setState(g, s);
      } else this.setState({ _start: a, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: a, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: h } = o, g = Wt(u).unit;
      Ya(g, i) || (i = g);
      const m = Xa(a, l, i, c, d, h, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), h = a.toArray().map((g, m) => mo(g, m, { cellWidth: o, cellHeight: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: h }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: a, baselines: l, criticalPath: c } = this.getState(), d = i.map((u) => {
        const h = o.byId(u.source), g = o.byId(u.target);
        return nl(u, h, g, a, l);
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
    } }], { tasks: (s) => new ca(s), links: (s) => new Jr(s), columns: (s) => ll(s) });
    const n = this.in = new ra();
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
          const w = x[x.length - 1], y = d.findIndex((C) => C.id == w), b = d.findIndex((C) => C.id == s), k = Math.min(y, b), N = Math.max(y, b) + 1, S = d.slice(k, N).map((C) => C.id);
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
      if (typeof m < "u" && (u.$w = m, lr(i, u, c, d)), typeof h < "u") {
        if (u.type === "summary") {
          const w = h - u.$x;
          ho(u, w, c, d);
        }
        u.$x = h, lr(i, u, c, d);
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
      if (a && (c.start && (c.start = y(c.start, a)), !i && i !== 0 && (c.start && c.end ? c.duration = f.duration : (c.start ? c.end = f.end : (c.end = y(c.end, a), c.start = f.start, c.duration = b(c.end, c.start)), b(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? f.type, m && c.start && (c.start = Yn(c.start, a, m)), c.start && c.end && (!At(c.start, f.start) || !At(c.end, f.end)) && c.type === "summary" && f.data?.length) {
        let N = a || b(c.start, f.start);
        m && (N = c.start > f.start ? b(c.start, f.start) : -b(f.start, c.start), y = ja(m)), this.moveSummaryKids(f, (S) => (S = y(S, N), m ? Yn(S, a, m) : S), "update-task");
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
              const O = new Date(E.start.valueOf());
              i.start <= O && (C = O);
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
      const N = o.getSummaryId(b.id);
      N && this.resetSummaryDates(N, "add-task"), this.setStateAsync(k), s.id = b.id, s.task = b, f && n.exec("select-task", { id: b.id });
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
            const N = { ...k };
            delete N.target, x.push({ ...N, source: b });
          } else if (k.target === y) {
            const N = { ...k };
            delete N.source, x.push({ ...N, target: b });
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], cr(s.data.tasks, { durationUnit: a, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Jr(i.map((u) => u).concat(wo(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: a, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let h = a;
      s < 0 && (h = l || a);
      const g = h + s * 50, m = i.levels[i.level], f = s < 0 && a > m.maxCellWidth;
      if (g < m.minCellWidth || g > m.maxCellWidth || f) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: g, _cellWidth: g });
      const { _scales: x, _start: w, cellWidth: y, _weekStart: b } = this.getState(), k = dt(x.minUnit, w, b), N = x.diff(u, k, "hour");
      typeof o > "u" && (o = y);
      let S = Math.round(N * y) - o;
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
          Ht(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          Ht(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          Ht(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), Ht(this, "delete-task", null, null);
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
      const { cellWidth: o, scales: i, _scales: a } = this.getState(), l = Za(e, n, r, s, a.lengthUnit, i, o);
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
      if (!At(l.start, d.start) || !At(l.end, d.end)) {
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
function fl(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = hl(s, t, e, 1, n);
    gl(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function hl(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function gl(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function dr(t) {
  return [...bo];
}
function Mr(t) {
  return t.map((e) => {
    switch (e.data && Mr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => ml(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => wl(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => xl(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => pl(n);
        break;
    }
    return e;
  });
}
function pl(t) {
  return t.parent === 0;
}
function ml(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function wl(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function xl(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function cs(t) {
  return t && typeof t == "object";
}
function yl(t) {
  return !t.selected || t.selected.length < 2;
}
const vl = (t) => (e) => e.type === t, bo = Mr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: vl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => cs(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => yl(e) && cs(n) }]);
function ur(t) {
  return [...So];
}
const So = Mr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Gn(t) {
  return t.type === "summary";
}
function Bn(t) {
  return t.type === "milestone";
}
function Kn(t) {
  return typeof t.parent > "u";
}
function jn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function $o(t) {
  return [...Co];
}
const Co = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Kn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Gn(t), isDisabled: jn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Gn(t) || Bn(t), isDisabled: jn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Gn(t) || Bn(t), isDisabled: jn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Bn(t) || Kn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Kn(t) }], _o = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], wt = zt(null);
(/* @__PURE__ */ new Date()).valueOf();
function kl(t, e) {
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
  } else return kl(t, e);
  return t === e;
}
function fr(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(fr);
  const e = {};
  for (const n in t) e[n] = fr(t[n]);
  return e;
}
var To = 2, bl = class {
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
      l ? (l.__parse(d, u, o, i) && (r[a] = d), i & To ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[a] = this._wrapNested(d, d, u, o) : n[a] = this._wrapWritable(d), r[a] = d), o[u] = o[u] || null;
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
}, Sl = class {
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
    const n = this._setter(e, To);
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
var $l = class {
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
function Cl(t) {
  return (e) => e[t];
}
function _l(t) {
  return (e, n) => e[t] = n;
}
function Ct(t, e) {
  return (e.getter || Cl(e.id))(t);
}
function ds(t, e, n) {
  return (e.setter || _l(e.id))(t, n);
}
function us(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function mt(t, e) {
  let n = Ct(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function Tl(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, a = t.flatData;
  e.header !== !1 && i[0].header && (r = fs("header", i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = mt(a[l], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = fs("footer", i, r, o, s)), r;
}
function fs(t, e, n, r, s) {
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
function Nl(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const a = t._columns, l = t.flatData, c = t._sizes;
  for (const u of a) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && a[0].header && (hs("header", a, r, s, d, e, n), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += a[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const h = [];
    for (let g = 0; g < a.length; g++) {
      const m = l[u], f = a[g], x = Ct(m, f) ?? "";
      let w = mt(m, f), y;
      e.cellStyle && (y = e.cellStyle(x, m, f)), e.cellTemplate && (w = e.cellTemplate(x, m, f) ?? w);
      const b = Do(w, 2, y, n);
      h.push(b);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && a[0].footer && (hs("footer", a, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function hs(t, e, n, r, s, o, i) {
  for (let a = 0; a < e[0][t].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][a], u = d.colspan ? d.colspan - 1 : 0, h = d.rowspan ? d.rowspan - 1 : 0;
      (u || h) && r.push({ from: { row: a + s, column: c }, to: { row: a + s + h, column: c + u } });
      let g = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(g, d, e[c], t)), o.headerCellTemplate && (g = o.headerCellTemplate(g, d, e[c], t) ?? g);
      let f;
      t == "header" ? a == e[0][t].length - 1 ? f = 1 : f = 0 : a ? f = 4 : f = 3;
      const x = Do(g, f, m, i);
      l.push(x);
    }
    n.push(l);
  }
}
function Do(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Ml(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => an(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function Dl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], a = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...l, borderBottom: a, borderRight: a };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Ml(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const El = "portrait", Rl = 100, Il = "a4", Al = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Hl(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((a) => !a.hidden), i = Ll(e);
  return o.forEach((a, l) => {
    s + a.width <= i ? (s += a.width, r.push(a)) : (r.length && n.push(r), r = [a], s = a.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function gs(t, e, n) {
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
function Ll(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Al[r];
  return Pl(e === "portrait" ? s : o, n);
}
function Pl(t, e) {
  return t * e;
}
function Wl(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || El, ppi: n || Rl, paper: r || Il };
}
function Mo(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function zl(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const ps = ["resize-column", "hide-column", "update-cell"], Ol = ["delete-row", "update-row", "update-cell"], Fl = ["move-item"], Ul = ["resize-column", "move-item"];
let Yl = class {
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
        if (Ul.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Fl.includes(n) && this.setPrev("flatData"), ps.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Ol.includes(n) && this.setPrev("data"), ps.includes(n) && this.setPrev("columns");
      }
    }), this.in.on(n, (r) => {
      if (r.eventSource === "undo" || r.eventSource === "redo" || r.skipUndo || r.inProgress) return;
      const s = e[n].handler(r);
      s && this.addToHistory(s);
    });
  }
  setPrev(e) {
    this._previousValues[e] = fr(this.getState()[e]);
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
function Eo() {
  let t = !0;
  return t = !1, t;
}
function Ro(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Vl(t, e) {
  return -Ro(t, e);
}
function Gl(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? Ro : Vl;
  return function(r, s) {
    return n(Ct(r, e), Ct(s, e));
  };
}
function Bl(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Gl(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const vn = 28, Kl = 20;
function jl() {
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
function ms(t, e, n, r, s) {
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
        if (x += m ? ` ${m}` : "", f = Dn(d, x, s).width, (g > 1 || !a[c + 1]) && n > c + 1) {
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
function ql(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const a = e[i], l = mt(a, t);
    l && (r.push(l), t.treetoggle ? s.push(e[i].$level * vn + (e[i].$count ? vn : 0) + (t.draggable ? vn : 0)) : t.draggable && s.push(vn));
  }
  return Dn(r, o, n, s).width;
}
function Xl(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Kl : 0;
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
const Ql = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Zl(t) {
  return Ql[t];
}
class Jl extends bl {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new Sl(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: a } = this.getState(), l = this.copyColumns(o), c = l.reduce((h, g) => Math.max(g.header.length, h), 0), d = l.reduce((h, g) => Math.max(g.footer.length, h), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, i, c, d, a);
      for (let h = 0; h < l.length; h++) this.normalizeColumns(l, h, "header", c, u), this.normalizeColumns(l, h, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: a, _filterIds: l } = this.getState(), c = l && new Set(l), d = i ? this.flattenRows(o, [], l) : c ? o.filter((h) => c.has(h.id)) : o, u = !a && d.some((h) => h.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new $l();
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
        ds(h, u, d);
        const g = this.updateTreeRow(h);
        h.$parent === 0 && (i = g);
      } else {
        const h = i.findIndex((m) => m.id == l), g = { ...i[h] };
        ds(g, u, d), i[h] = g;
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
          c = ql(u, f, g);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(Xl(u, h), c);
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
      const w = Bl(x, c);
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
        const c = Tl(this.getState(), a);
        a.download !== !1 ? us(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (a.format == "xlsx") {
        let c = a.styles;
        !c && c !== !1 && (c = Dl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: g, rowSizes: m, colSizes: f, styles: x } = Nl(this.getState(), a, u), w = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(w).then((y) => {
          y.onmessage = (b) => {
            if (b.data.type == "ready") {
              const k = b.data.blob;
              a.download !== !1 ? us(k, l) : s.result = k, o(!0);
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
      const o = Wl(s);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = jl()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), an(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), Eo() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Yl(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
      r.push((l) => o?.handler ? o.handler(l[s], a) : Zl(i)(l[s], a));
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
    const i = ms(e, "header", r, n.headerHeight, o), a = ms(e, "footer", s, n.footerHeight, o), l = i.reduce((d, u) => d + u, 0), c = a.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: a, headerHeight: l, footerHeight: c };
  }
}
let ec = (/* @__PURE__ */ new Date()).valueOf();
function kn() {
  return "temp://" + ec++;
}
function tc(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var nc = class {
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
}, Pt = [], rc = { subscribe: (t) => {
  sc();
  const e = new nc();
  return Pt.push(e), t(e), () => {
    const n = Pt.findIndex((r) => r === e);
    n >= 0 && Pt.splice(n, 1);
  };
} }, ws = !1;
function sc() {
  ws || (ws = !0, document.addEventListener("keydown", (t) => {
    if (Pt.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Pt.length - 1; s >= 0; s--) {
        const o = Pt[s], i = o.store.get(r) || o.store.get(n);
        i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
      }
    }
  }));
}
const oc = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Er(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return a.tagName === "INPUT" || a.tagName === "TEXTAREA" || tc(a, "data-header-id")?.classList.contains("wx-filter") || !!a.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < "u" && (typeof a == "function" ? s[i] = a : a && (s[i] = (l) => {
      const c = r(l);
      n({ key: i, event: l, isInput: c });
    }));
  }
  const o = rc.subscribe((i) => {
    i.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function ic(t, e) {
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
function kt(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function ac(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function xs(t) {
  return t && t.getAttribute("data-context-id");
}
const ys = 5;
function lc(t, e) {
  let n, r, s, o, i, a, l, c, d;
  function u(S) {
    o = S.clientX, i = S.clientY, a = {
      ...ac(n, t, S),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(S) {
    n = Be(S), xs(n) && (s = kt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", g), window.addEventListener("touchend", b));
  }
  function g(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = Be(S), xs(n) && (s = kt(n), t.addEventListener("mousemove", w), window.addEventListener("mouseup", k), u(S)));
  }
  function f(S) {
    t.removeEventListener("mousemove", w), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", b), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", h));
  }
  function x(S) {
    const C = S.clientX - o, E = S.clientY - i;
    if (!r) {
      if (Math.abs(C) < ys && Math.abs(E) < ys || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const O = Math.round(Math.max(0, a.top + E));
      if (e && e.move && e.move({ id: s, top: O, detail: l }) === !1)
        return;
      const D = e.getTask(s), M = D.$y;
      if (!a.start && a.y == M) return N();
      a.start = !0, a.y = D.$y - 4, r.style.top = O + "px";
      const z = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), H = Be(z);
      if (H && H !== n) {
        const T = kt(H), G = H.getBoundingClientRect(), oe = G.top + G.height / 2, he = S.clientY + a.db > oe && H.nextElementSibling !== n, Q = S.clientY - a.dt < oe && H.previousElementSibling !== n;
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
    c = null, d && (clearTimeout(d), d = null), N();
  }
  function k() {
    N();
  }
  function N() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: a.top })), s = n = r = a = l = null, f();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", h), {
    destroy() {
      f(!0);
    }
  };
}
const cc = {
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
function Io(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = Io(n.data, e)), r;
  });
}
function Ao(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = Ao(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let dc = 1;
function uc(t) {
  return Io(t, (e) => {
    const n = { ...e, id: e.id || dc++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Ho = {};
function fc(t) {
  return Ho[t] || t;
}
function hc(t, e) {
  Ho[t] = e;
}
function gc({ onClick: t, onShow: e, option: n }) {
  const r = F(null), s = R(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = $(() => n && n.comp ? fc(n.comp) : null, [n]);
  return /* @__PURE__ */ J(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ p("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ p(o, { item: n, option: n }) : null : /* @__PURE__ */ J("span", { className: "wx-cDCz9rZQ wx-value", children: [
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
function Rr({
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
  const [c, d] = B(-1e4), [u, h] = B(-1e4), [g, m] = B(20), [f, x] = B(), w = F(null), [y, b] = B(!1), [k, N] = B(null), S = R(() => {
    const M = ri(w.current, s, r, e, n);
    M && (d(M.x), h(M.y), m(M.z), x(M.width));
  }, [s, r, e, n]);
  V(() => {
    o && o(S);
  }, []);
  const C = R(() => {
    b(!1);
  }, []), E = R(() => {
    l && l({ action: null, option: null });
  }, [l]), O = R((M, z) => {
    b(M), N(z);
  }, []), D = $(() => uc(t), [t]);
  return V(() => {
    S();
  }, [s, S]), V(() => {
    if (w.current)
      return tn(w.current, { callback: E, modal: !0 }).destroy;
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
      children: D.map((M) => /* @__PURE__ */ J(Ms, { children: [
        M.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          gc,
          {
            option: M,
            onShow: O,
            onClick: (z) => {
              if (!M.data && !z.defaultPrevented) {
                const H = { context: i, action: M, option: M, event: z };
                M.handler && M.handler(H), l && l(H), z.stopPropagation();
              }
            }
          }
        ),
        M.data && y === M.id ? /* @__PURE__ */ p(
          Rr,
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
const pc = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, [d, u] = B(null), [h, g] = B(null), [m, f] = B(0), [x, w] = B(0), y = $(() => d !== null && i ? Ao(n, (S) => i(S, d)) : n, [d, i, n]), b = R(
    (S) => {
      g(null), c && c(S);
    },
    [c]
  ), k = R((S, C) => {
    let E = null;
    for (; S && S.dataset && !E; )
      E = S.dataset[C], S = S.parentNode;
    return E ? Ot(E) : null;
  }, []), N = R(
    (S, C) => {
      if (!S) {
        g(null);
        return;
      }
      if (S.defaultPrevented) return;
      const E = S.target;
      if (E && E.dataset && E.dataset.menuIgnore) return;
      f(S.clientX + 1), w(S.clientY + 1);
      let O = typeof C < "u" ? C : k(E, o);
      s && (O = s(O, S), !O) || (u(O), g(E), S.preventDefault());
    },
    [o, k, s]
  );
  return Tt(e, () => ({ show: N }), [N]), /* @__PURE__ */ J(Ae, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: N, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    h ? /* @__PURE__ */ p(Os, { children: /* @__PURE__ */ p(
      Rr,
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
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = B(null);
  function c(m) {
    l(null), i && i(m);
  }
  const d = R((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Tt(e, () => ({ show: d }), [d]);
  function u(m) {
    let f = m.target;
    for (; !f.dataset.menuIgnore; )
      l(f), f = f.parentNode;
  }
  const h = F(0), g = F(a);
  return V(() => {
    g.current !== a && (h.current += 1, g.current = a);
  }, [a]), /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ p("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    a ? /* @__PURE__ */ p(Os, { children: /* @__PURE__ */ p(
      Rr,
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
const Lo = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, d = F(null), u = R((h, g) => {
    d.current.show(h, g);
  }, []);
  return Tt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ J(Ae, { children: [
    l ? /* @__PURE__ */ p("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ p(
      pc,
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
function mc(t) {
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
const wc = ({ key: t, text: e, ...n }) => n;
function Ir(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = $(
    () => mc(e.comp || "label"),
    [e]
  ), a = R(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = $(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = R(
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
            ...wc(e)
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
  const [o, i] = B(!0), a = () => i(!0), l = () => i(!1), c = (u) => {
    a(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ J("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
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
  ] }) : /* @__PURE__ */ J(Ae, { children: [
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
function xc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = B(void 0), l = F(null);
  function c() {
    a(null);
  }
  function d() {
    a(!0);
  }
  function u(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ J(
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
function yc(t) {
  return t.forEach((e) => {
    e.id || (e.id = wr());
  }), t;
}
function hr(t) {
  const {
    items: e,
    menuCss: n = "",
    css: r = "",
    values: s,
    overflow: o = "menu",
    onClick: i,
    onChange: a
  } = t, [l, c] = ze(e || []), [d, u] = ze(s || null), h = $(() => yc(l), [l]), g = F(null), m = F(-1), [f, x] = B([]), w = F(h);
  V(() => {
    w.current = h;
  }, [l]);
  const y = F(o);
  V(() => {
    y.current = o;
  }, [o]);
  const b = F(f);
  V(() => {
    b.current = f;
  }, [f]);
  const k = F(!1);
  function N(D) {
    d && (d[D.item.key] = D.value, u({ ...d })), a && a(D);
  }
  function S() {
    const D = g.current;
    if (!D) return 0;
    const M = D.children, z = w.current || [];
    let H = 0;
    for (let T = 0; T < z.length; T++)
      z[T].comp !== "spacer" && (H += M[T].clientWidth, z[T].comp === "separator" && (H += 8));
    return H;
  }
  function C() {
    const D = g.current, M = w.current || [];
    if (D) {
      for (let z = M.length - 1; z >= 0; z--)
        if (M[z].items && !M[z].collapsed) {
          M[z].collapsed = !0, M[z].$width = D.children[z].offsetWidth, k.current = !0, c([...M]);
          return;
        }
    }
  }
  function E(D) {
    const M = g.current, z = w.current || [];
    if (M) {
      for (let H = 0; H < z.length; H++)
        if (z[H].collapsed && z[H].$width) {
          z[H].$width - M.children[H].offsetWidth < D + 10 && (z[H].collapsed = !1, k.current = !0), c([...z]);
          return;
        }
    }
  }
  function O() {
    const D = g.current;
    if (!D) return;
    const M = w.current || [], z = y.current;
    if (z === "wrap") return;
    const H = D.clientWidth;
    if (D.scrollWidth > H) {
      if (z === "collapse") return C();
      const T = D.children;
      let G = 0;
      for (let oe = 0; oe < M.length; oe++) {
        if (G += T[oe].clientWidth, M[oe].comp === "separator" && (G += 8), G > H - 40) {
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
      if (z === "collapse") return E(T);
      if ((b.current || []).length) {
        m.current = null;
        const G = D.children;
        for (let oe = 0; oe < M.length; oe++)
          G[oe].style.visibility = "";
        x([]);
      }
    }
  }
  return V(() => {
    k.current && (k.current = !1, O());
  }, [l]), V(() => {
    const D = new ResizeObserver(() => O());
    return g.current && D.observe(g.current), () => {
      D.disconnect();
    };
  }, []), /* @__PURE__ */ J(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: g,
      children: [
        h.map(
          (D) => D.items ? /* @__PURE__ */ p(
            Mn,
            {
              item: D,
              values: d,
              onClick: i,
              onChange: N
            },
            D.id
          ) : /* @__PURE__ */ p(
            Ir,
            {
              item: D,
              values: d,
              onClick: i,
              onChange: N
            },
            D.id
          )
        ),
        !!f.length && /* @__PURE__ */ p(
          xc,
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
function vc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ J("div", { className: "wx-HXpG4gnx wx-item", onClick: a, children: [
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
function kc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function bc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ J("div", { className: "wx-3cuSqONJ wx-item", onClick: a, children: [
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
function Sc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ J("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ p("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Yt("button", vc);
Yt("separator", Wo);
Yt("spacer", zo);
Yt("label", kc);
Yt("item", Sc);
Yt("icon", bc);
const et = zt(null);
function $c(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const vs = 5, Cc = 700;
function _c(t) {
  return Ot(t.getAttribute("data-id"));
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
function gr(t, e) {
  const n = bn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function Tc(t, e) {
  const n = e.current;
  let r = null, s, o, i = !1, a = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(C) {
    const E = Be(C);
    E && (r = {
      container: l,
      sourceNode: C.target,
      from: _c(E),
      pos: gr(C, t)
    }, o = r.pos, u(C));
  }
  function u(C) {
    if (!r) return;
    const E = r.pos = gr(C, t);
    if (!i) {
      if (!a && !C?.target?.getAttribute("draggable-data") && Math.abs(o.x - E.x) < vs && Math.abs(o.y - E.y) < vs)
        return;
      if (N(C) === !1) return S();
    }
    if (a) {
      const O = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, D = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        C.pageX - O,
        C.pageY - D
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
    }, Cc), k(C);
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
  function N(C) {
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
const Nc = 4e-3;
function Dc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function Mc(t, e, n, r) {
  const { node: s, left: o, top: i, bottom: a, sense: l, xScroll: c, yScroll: d } = r, u = gr(t, s);
  n.scrollState || (n.scrollState = Dc());
  let h = 0, g = 0;
  u.x < o + l ? h = -1 : u.x > e.width - l && (h = 1), u.y < i + Math.round(l / 2) ? g = -1 : u.y > e.height - a - Math.round(l / 2) && (g = 1), (n.scrollState.dirX !== h || n.scrollState.dirY !== g) && (Oo(n), n.scrollState.dirX = h, n.scrollState.dirY = g), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && Ec(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Ec(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      Rc,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Oo(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function Rc(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += Nc, r !== 0 && Ac(t, e, r), s !== 0 && Ic(t, e, s);
}
function Ic(t, e, n) {
  const r = e.node.scrollTop;
  Fo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Ac(t, e, n) {
  const r = e.node.scrollLeft;
  Fo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Fo(t, e, n) {
  n.node[e] = t;
}
function Ln(t, e, n, r, s, o) {
  const i = {};
  return t && (i.width = `${t}px`, i.minWidth = `${t}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), n && (i.position = "sticky", n.left && (i.left = `${r}px`), n.right && (i.right = `${s}px`)), i;
}
function Uo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Hc(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [i, a] = ze(t.focusable), l = _e(et), c = se(l, "focusCell"), d = se(l, "search"), u = se(l, "reorder"), h = $(
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
  V(() => {
    w.current && i && c?.row === e.id && c?.column === n.id && w.current.focus();
  }, [c, i, e.id, n.id]);
  const y = R(() => {
    i && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, i, c, e.id, n.id]);
  V(() => () => {
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
  }, [f, n]), N = n.cell;
  return /* @__PURE__ */ J(
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
        n.treetoggle ? /* @__PURE__ */ J(Ae, { children: [
          /* @__PURE__ */ p("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ p(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        N ? /* @__PURE__ */ p(
          N,
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
function ks(t, e) {
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
function Lc({ filter: t, column: e, action: n, filterValue: r }) {
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
function Pc({ filter: t, column: e, action: n, filterValue: r }) {
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
    Ws,
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
const Wc = {
  text: Lc,
  richselect: Pc
};
function zc({ filter: t, column: e }) {
  const n = _e(et), r = se(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = $(() => Wc[t.type], [t.type]);
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
function Oc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: a,
    hasSplit: l
  } = t, c = _e(et), d = se(c, "sortMarks"), u = $(() => d ? d[n.id] : void 0, [d, n.id]), h = F(), g = R(
    (T) => {
      h.current = e.flexgrow ? T.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = R(
    (T, G) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + T),
        inProgress: G
      });
    },
    [c, e.id]
  ), f = R((T) => m(T, !0), [m]), x = R((T) => m(T, !1), [m]), w = R(
    (T) => {
      if (!n.sort || e.filter) return;
      let G = u?.order;
      G && (G = G === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: T.ctrlKey, order: G });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = R(
    (T) => {
      T && T.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), b = R(
    (T) => {
      T.key === "Enter" && y();
    },
    [y]
  ), k = R(
    (T) => {
      T.key === "Enter" && !e.filter && w(T);
    },
    [w, e.filter]
  ), N = $(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), S = $(
    () => N && !l && e.collapsible !== "header",
    [N, l, e.collapsible]
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
      e.height + (N && S ? a : 0)
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
      a
    ]
  ), O = $(
    () => Uo(n, e, i),
    [n, e, i]
  ), D = R(() => Object.fromEntries(
    Object.entries(e).filter(([T]) => T !== "cell")
  ), [e]), M = `wx-cell ${O} ${e.css || ""} wx-collapsed`, z = [
    "wx-cell",
    O,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = F(null);
  return V(() => {
    const T = H.current;
    if (!T) return;
    const G = ks(T, { down: g, move: f, up: x });
    return () => {
      typeof G == "function" && G();
    };
  }, [g, f, x, ks]), N ? /* @__PURE__ */ p(
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
  ) : /* @__PURE__ */ J(
    "div",
    {
      className: "wx-RsQD74qC " + z,
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
              cell: D(),
              column: n,
              row: r,
              onAction: ({ action: G, data: oe }) => c.exec(G, oe)
            }
          );
        })() : e.filter ? /* @__PURE__ */ p(zc, { filter: e.filter, column: n }) : /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
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
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ J(Ae, { children: [
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
function Fc({ cell: t, column: e, row: n, columnStyle: r }) {
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
    () => Uo(e, t, r),
    [e, t, r]
  ), a = R(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ p("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? Ko.createElement(t.cell, {
    api: s,
    cell: a(),
    column: e,
    row: n,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ p("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function bs({
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
          const N = { ...b[r][w] };
          if (y || f[w].push(N), N.colspan > 1) {
            if (y = N.colspan - 1, !Eo() && b.right) {
              let S = b.right;
              for (let C = 1; C < N.colspan; C++)
                S -= n[k + C].width;
              N.right = S;
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
              Oc,
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
              Fc,
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
function Uc({ overlay: t }) {
  const e = _e(et);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Yc(t) {
  const { actions: e, editor: n } = t, [r, s] = B(n?.value || ""), o = F(null);
  V(() => {
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
function Vc({ actions: t, editor: e, onAction: n }) {
  const [r, s] = B(e?.value), [o, i] = B(e?.renderedValue), [a, l] = B(e?.options || []), c = $(() => e?.config?.template, [e]), d = $(() => e?.config?.cell, [e]), u = $(() => (a || []).findIndex((y) => y.id === r), [a, r]), h = F(null), g = F(null), m = R(
    (y) => {
      h.current = y.navigate, g.current = y.keydown, h.current(u);
    },
    [u, h]
  ), f = R(
    (y) => {
      const b = y?.target?.value ?? "";
      i(b);
      const k = b ? (e?.options || []).filter(
        (N) => (N.label || "").toLowerCase().includes(b.toLowerCase())
      ) : e?.options || [];
      l(k), k.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), x = F(null);
  V(() => {
    x.current && x.current.focus();
  }, []), V(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const w = R(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ J(Ae, { children: [
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
function Gc({ actions: t, editor: e, onAction: n }) {
  const [r] = B(() => e.value || /* @__PURE__ */ new Date()), [s] = B(() => e.config?.template), [o] = B(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = F(null);
  return V(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ J(Ae, { children: [
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
      Ps,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Bc(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = B(
    n.options.find((f) => f.id === n.value)
  ), [i] = B(n.value), [a] = B(n.options), l = $(
    () => a.findIndex((f) => f.id === i),
    [a, i]
  );
  function c({ id: f }) {
    e.updateValue(f), e.save();
  }
  let d;
  const [u, h] = B();
  function g(f) {
    d = f.navigate, h(() => f.keydown), d(l);
  }
  const m = F(null);
  return V(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ J(Ae, { children: [
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
const Kc = {
  text: Yc,
  combo: Vc,
  datepicker: Gc,
  richselect: Bc
};
function jc({ column: t, row: e }) {
  const n = _e(et), r = se(n, "editor"), s = R(
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
    return Kc[f];
  }, [t, e]), u = F(null);
  V(() => {
    if (!u.current) return;
    const m = tn(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), V(() => {
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
function Ss(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = _e(et), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(Ae, { children: e.map((c, d) => /* @__PURE__ */ p("tr", { children: c.map((u) => {
    const h = i.find((f) => f.id == u.id), g = `wx-print-cell-${n}${l(h)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ p(
      "th",
      {
        style: As(Mo(u, a.columnWidth)),
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
        ) : u.filter ? /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-print-filter", children: zl(o, i, u) }) : /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function qc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = _e(et), { flatData: c, _sizes: d } = l.getState(), u = o && gs(e, "header", d.headerRowHeights), h = i && gs(e, "footer", d.footerRowHeights);
  function g(f, x) {
    let w = "";
    return w += r ? " " + r(x) : "", w += s ? " " + s(f, x) : "", w;
  }
  function m(f, x) {
    return typeof x.draggable == "function" ? x.draggable(f, x) !== !1 : x.draggable;
  }
  return /* @__PURE__ */ J(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((f) => f.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p(
          Ss,
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
              (w) => w.collapsed ? null : /* @__PURE__ */ J(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(f, w)}`,
                  style: As(
                    Mo(w, d.columnWidth)
                  ),
                  children: [
                    a && w.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(f, w) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    w.treetoggle ? /* @__PURE__ */ J(Ae, { children: [
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
          Ss,
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
function Xc(t) {
  const { config: e, ...n } = t, r = _e(et), { _skin: s, _columns: o } = r.getState(), i = $(() => Hl(o, e), []), a = F(null);
  return V(() => {
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
      children: i.map((l, c) => /* @__PURE__ */ p("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ p(qc, { columns: l, ...n }) }, c))
    }
  );
}
function Qc(t) {
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
  } = t, f = _e(et), x = se(f, "dynamic"), w = se(f, "_columns"), y = se(f, "flatData"), b = se(f, "split"), k = se(f, "_sizes"), [N, S] = Xt(f, "selectedRows"), C = se(f, "select"), E = se(f, "editor"), O = se(f, "tree"), D = se(f, "focusCell"), M = se(f, "_print"), z = se(f, "undo"), H = se(f, "reorder"), T = se(f, "_rowHeightFromData"), [G, oe] = B(0);
  V(() => {
    oe(cn());
  }, []);
  const [he, Q] = B(0), [ce, Se] = B(0), P = $(() => (w || []).some((I) => !I.hidden && I.flexgrow), [w]), ae = $(() => k?.rowHeight || 0, [k]), we = F(null), [ge, Ce] = B(null), [de, q] = B(null), K = $(() => {
    let I = [], v = 0;
    return b && b.left && (I = (w || []).slice(0, b.left).filter((_) => !_.hidden).map((_) => ({ ..._ })), I.forEach((_) => {
      _.fixed = { left: 1 }, _.left = v, v += _.width;
    }), I.length && (I[I.length - 1].fixed = { left: -1 })), { columns: I, width: v };
  }, [b, w]), le = $(() => {
    let I = [], v = 0;
    if (b && b.right) {
      I = (w || []).slice(b.right * -1).filter((_) => !_.hidden).map((_) => ({ ..._ }));
      for (let _ = I.length - 1; _ >= 0; _--) {
        const A = I[_];
        A.fixed = { right: 1 }, A.right = v, v += A.width;
      }
      I.length && (I[0].fixed = { right: -1 });
    }
    return { columns: I, width: v };
  }, [b, w]), ee = $(() => {
    const I = (w || []).slice(b?.left || 0, (w || []).length - (b?.right ?? 0)).filter((v) => !v.hidden);
    return I.forEach((v) => {
      v.fixed = 0;
    }), I;
  }, [w, b]), ie = $(() => (w || []).reduce((I, v) => (v.hidden || (I += v.width), I), 0), [w]), Re = 1;
  function ke(I, v, _) {
    let A = v, U = I;
    if (ee.length) {
      let Y = ee.length;
      for (let W = I; W >= 0; W--)
        ee[W][_].forEach((Z) => {
          Z.colspan > 1 && W > I - Z.colspan && W < Y && (Y = W);
        });
      if (Y !== ee.length && Y < I) {
        for (let W = Y; W < I; W++)
          A -= ee[W].width;
        U = Y;
      }
    }
    return { index: U, delta: A };
  }
  const X = $(() => {
    let I, v, _;
    const A = he, U = he + (u || 0);
    let Y = 0, W = 0, Z = 0, re = 0;
    ee.forEach((tt, nt) => {
      A > Z && (Y = nt, re = Z), Z = Z + tt.width, U > Z && (W = nt + Re);
    });
    const fe = { header: 0, footer: 0 };
    for (let tt = W; tt >= Y; tt--)
      ["header", "footer"].forEach((nt) => {
        ee[tt] && ee[tt][nt].forEach((yt) => {
          const fn = yt.colspan;
          if (fn && fn > 1) {
            const On = fn - (W - tt + 1);
            On > 0 && (fe[nt] = Math.max(fe[nt], On));
          }
        });
      });
    const xe = ke(Y, re, "header"), Ie = ke(Y, re, "footer"), Ye = xe.delta, je = xe.index, qe = Ie.delta, Fe = Ie.index;
    return P && ie > (u || 0) ? I = v = _ = [...K.columns, ...ee, ...le.columns] : (I = [
      ...K.columns,
      ...ee.slice(Y, W + 1),
      ...le.columns
    ], v = [
      ...K.columns,
      ...ee.slice(je, W + fe.header + 1),
      ...le.columns
    ], _ = [
      ...K.columns,
      ...ee.slice(Fe, W + fe.footer + 1),
      ...le.columns
    ]), {
      data: I || [],
      header: v || [],
      footer: _ || [],
      d: re,
      df: qe,
      dh: Ye
    };
  }, [
    ee,
    K,
    le,
    he,
    u,
    P,
    ie
  ]), me = $(
    () => e && k?.headerHeight || 0,
    [e, k]
  ), ye = $(
    () => n && k?.footerHeight || 0,
    [n, k]
  ), $e = $(() => u && h ? ie >= u : !1, [u, h, ie]), j = $(() => (h || 0) - me - ye - ($e ? G : 0), [h, me, ye, $e, G]), be = $(() => Math.ceil((j || 0) / (ae || 1)) + 1, [j, ae]), De = F([]), [pe, He] = B(0), [ve, Pe] = B(void 0), Te = $(() => {
    let I = 0, v = 0;
    const _ = 2;
    if (c) {
      let Y = ce;
      for (; Y > 0; )
        Y -= De.current[I] || ae, I++;
      v = ce - Y;
      for (let W = Math.max(0, I - _ - 1); W < I; W++)
        v -= De.current[I - W] || ae;
      I = Math.max(0, I - _);
    } else {
      if (T) {
        let Y = 0, W = 0;
        for (let xe = 0; xe < (y || []).length; xe++) {
          const Ie = y[xe].rowHeight || ae;
          if (W + Ie > ce) {
            Y = xe;
            break;
          }
          W += Ie;
        }
        I = Math.max(0, Y - _);
        for (let xe = 0; xe < I; xe++)
          v += y[xe].rowHeight || ae;
        let Z = 0, re = 0;
        for (let xe = Y + 1; xe < (y || []).length; xe++) {
          const Ie = y[xe].rowHeight || ae;
          if (Z++, re + Ie > j)
            break;
          re += Ie;
        }
        const fe = Math.min(
          x ? x.rowCount : (y || []).length,
          Y + Z + _
        );
        return { d: v, start: I, end: fe };
      }
      I = Math.floor(ce / (ae || 1)), I = Math.max(0, I - _), v = I * (ae || 0);
    }
    const A = x ? x.rowCount : (y || []).length, U = Math.min(A, I + (be || 0) + _);
    return { d: v, start: I, end: U };
  }, [c, T, ce, ae, x, y, be, j]), Le = $(() => {
    const I = x ? x.rowCount : (y || []).length;
    if (c)
      return pe + Te.d + (I - (ve || 0)) * (ae || 0);
    if (!T)
      return I * (ae || 0);
    let v = 0;
    for (let _ = 0; _ < I; _++)
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
  ]), We = $(() => u && h ? Le + me + ye >= h - (ie >= (u || 0) ? G : 0) : !1, [
    u,
    h,
    Le,
    me,
    ye,
    ie,
    G
  ]), Ue = $(() => P && ie <= (u || 0) ? (u || 0) - 0 - (We ? G : 0) : ie, [P, ie, u, We, G, $e]), L = $(() => P && ie <= (u || 0) ? u || 0 : Ue < (u || 0) ? ie + (We ? G : 0) : -1, [P, ie, u, Ue, We, G]), te = F({});
  V(() => {
    if (x && (te.current.start !== Te.start || te.current.end !== Te.end)) {
      const { start: I, end: v } = Te;
      te.current = { start: I, end: v }, f && f.exec && f.exec("request-data", { row: { start: I, end: v } });
    }
  }, [x, Te, f]);
  const ne = $(() => x ? y || [] : (y || []).slice(Te.start, Te.end), [x, y, Te]), ue = $(() => (N || []).filter(
    (I) => (ne || []).some((v) => v.id === I)
  ), [S, ne]), Me = $(() => Te.start, [Te.start]), Ee = R((I) => {
    Se(I.target.scrollTop), Q(I.target.scrollLeft);
  }, []), Oe = R((I) => {
    I.shiftKey && I.preventDefault(), we.current && we.current.focus && we.current.focus();
  }, []), Ke = R(() => !!(w || []).find((I) => !!I.draggable), [w]), xt = F(null), ft = F(null), Pn = F({
    dblclick: (I, v) => {
      const _ = { id: I, column: tr(v, "data-col-id") };
      f.exec("open-editor", _);
    },
    click: (I, v) => {
      if (xt.current) return;
      const _ = tr(v, "data-col-id");
      if (D?.id !== I && f.exec("focus-cell", {
        row: I,
        column: _,
        eventSource: "click"
      }), C === !1) return;
      const A = s && v.ctrlKey, U = s && v.shiftKey;
      (A || N.length > 1 || !N.includes(I)) && f.exec("select-row", { id: I, toggle: A, range: U });
    },
    "toggle-row": (I) => {
      const v = f.getRow(I);
      f.exec(v.open !== !1 ? "close-row" : "open-row", { id: I });
    },
    "ignore-click": () => !1
  }), Dt = $(() => ({
    top: me,
    bottom: ye,
    left: K.width,
    xScroll: $e,
    yScroll: We,
    sense: c && de ? de.offsetHeight : Math.max(k?.rowHeight || 0, 40),
    node: we.current && we.current.firstElementChild
  }), [
    me,
    ye,
    K.width,
    $e,
    We,
    c,
    de,
    k
  ]);
  function Mt(I, v) {
    const { container: _, sourceNode: A, from: U } = v;
    if (Ke() && !A.getAttribute("draggable-data"))
      return !1;
    Ce(U), f.getRow(U).open && f.exec("close-row", { id: U, nested: !0 });
    const Y = Be(A, "data-id"), W = Y.cloneNode(!0);
    W.classList.remove("wx-selected"), W.querySelectorAll("[tabindex]").forEach((xe) => xe.setAttribute("tabindex", "-1")), _.appendChild(W), q(W);
    const Z = he - X.d, re = We ? G : 0;
    _.style.width = Math.min(
      (u || 0) - re,
      P && ie <= (u || 0) ? Ue : Ue - re
    ) + Z + "px";
    const fe = bn(Y);
    v.offset = {
      x: Z,
      y: -Math.round(fe.height / 2)
    }, ft.current || (ft.current = I.clientY);
  }
  function Et(I, v) {
    const { from: _ } = v, A = v.pos, U = bn(we.current);
    A.x = U.x;
    const Y = Dt.top;
    if (A.y < Y) A.y = Y;
    else {
      const W = U.height - ($e && G > 0 ? G : Math.round(Dt.sense / 2)) - Dt.bottom;
      A.y > W && (A.y = W);
    }
    if (we.current.contains(v.targetNode)) {
      const W = Be(v.targetNode, "data-id"), Z = Ot(W?.getAttribute("data-id"));
      if (Z && Z !== _) {
        v.to = Z;
        const re = c ? de?.offsetHeight : k?.rowHeight;
        if (de && (ce === 0 || A.y > Y + re - 1)) {
          const fe = W.getBoundingClientRect(), xe = bn(de).y, Ie = fe.y, Ye = xe > Ie ? -1 : 1, je = Ye === 1 ? "after" : "before", qe = Math.abs(f.getRowIndex(_) - f.getRowIndex(Z)), Fe = qe !== 1 ? je === "before" ? "after" : "before" : je;
          if (qe === 1 && (Ye === -1 && I.clientY > ft.current || Ye === 1 && I.clientY < ft.current))
            return;
          ft.current = I.clientY, f.exec("move-item", {
            id: _,
            target: Z,
            mode: Fe,
            inProgress: !0
          });
        }
      }
      o && o({ event: I, context: v });
    }
    Mc(I, U, v, Dt);
  }
  function ln(I, v) {
    const { from: _, to: A } = v;
    f.exec("move-item", {
      id: _,
      target: A,
      inProgress: !1
    }), xt.current = setTimeout(() => {
      xt.current = 0;
    }, 1), Ce(null), q(null), ft.current = null, Oo(v);
  }
  function cn() {
    const I = document.createElement("div");
    I.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(I);
    const v = I.offsetWidth - I.clientWidth;
    return document.body.removeChild(I), v;
  }
  const Wn = $(() => L > 0 ? { width: `${L}px` } : void 0, [L]), dn = F(null);
  function zn() {
    Promise.resolve().then(() => {
      let I = 0, v = Me;
      const _ = dn.current;
      _ && (Array.from(_.children).forEach((A, U) => {
        De.current[Me + U] = A.offsetHeight, I += A.offsetHeight, v++;
      }), He(I), Pe(v));
    });
  }
  V(() => {
    ne && c && zn();
  }, [ne, c, Me]);
  let [ht, Rt] = B();
  V(() => {
    if (D && (!C || !ue.length || ue.includes(D.row)))
      Rt({ ...D });
    else if (ne.length && X.data.length) {
      if (!ht || ue.length && !ue.includes(ht.row) || ne.findIndex((I) => I.id == ht.row) === -1 || X.data.findIndex(
        (I) => I.id == ht.column && !I.collapsed
      ) === -1) {
        const I = ue[0] || ne[0].id, v = X.data.findIndex((_) => !_.collapsed);
        Rt(v !== -1 ? { row: I, column: X.data[v].id } : null);
      }
    } else Rt(null);
  }, [D]);
  const Vt = F(null);
  V(() => {
    const I = we.current;
    if (!I) return;
    const v = $c(I, d);
    return () => {
      typeof v == "function" && v();
    };
  }, [d]);
  const Gt = F({});
  Object.assign(Gt.current, {
    start: Mt,
    move: Et,
    end: ln,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: Ke() })
  }), V(() => {
    const I = we.current;
    return I ? Tc(I, Gt).destroy : void 0;
  }, [H, we.current]), V(() => {
    const I = we.current;
    return I ? Er(I, {
      keys: m !== !1 && {
        ...oc,
        "ctrl+z": z,
        "ctrl+y": z,
        ...m
      },
      exec: (v) => f.exec("hotkey", v)
    }).destroy : void 0;
  }, [f, z, m]);
  const gt = F({
    scroll: f.getReactiveState().scroll
  });
  gt.current.getWidth = () => (u || 0) - (We ? G : 0), gt.current.getHeight = () => j, gt.current.getScrollMargin = () => K.width + le.width, V(() => {
    ic(Vt.current, gt.current);
  }, []);
  const Bt = F(null);
  V(() => {
    const I = Bt.current;
    if (!I) return;
    const v = [];
    return v.push(
      tn(I, () => f.exec("focus-cell", { eventSource: "click" })).destroy
    ), v.push(hi(I, Pn.current)), () => v.forEach((_) => _());
  }, []);
  const un = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + un,
        style: {
          "--header-height": `${me}px`,
          "--footer-height": `${ye}px`,
          "--split-left-width": `${K.width}px`,
          "--split-right-width": `${le.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: we,
            className: "wx-4VuBwK2D wx-table-box",
            style: Wn,
            role: O ? "treegrid" : "grid",
            "aria-colcount": X.data.length,
            "aria-rowcount": ne.length,
            "aria-multiselectable": O && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ J(
              "div",
              {
                ref: Vt,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: $e ? "scroll" : "hidden",
                  overflowY: We ? "scroll" : "hidden"
                },
                onScroll: Ee,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    bs,
                    {
                      contentWidth: Ue,
                      deltaLeft: X.dh,
                      columns: X.header,
                      columnStyle: a,
                      bodyHeight: j - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ J(
                    "div",
                    {
                      ref: Bt,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${Ue}px`, height: `${Le}px` },
                      onMouseDown: (I) => Oe(I),
                      children: [
                        r ? /* @__PURE__ */ p(Uc, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: dn,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Te.d}px`,
                              paddingLeft: `${X.d}px`
                            },
                            children: ne.map((I, v) => {
                              const _ = N.indexOf(I.id) !== -1, A = ge === I.id, U = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(I) : "") + (_ ? " wx-selected" : "") + (A ? " wx-inactive" : ""), Y = c ? { minHeight: `${I.rowHeight || ae}px` } : { height: `${I.rowHeight || ae}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + U,
                                  "data-id": I.id,
                                  "data-context-id": I.id,
                                  style: Y,
                                  role: "row",
                                  "aria-rowindex": v,
                                  "aria-expanded": I.open,
                                  "aria-level": O ? I.$level + 1 : void 0,
                                  "aria-selected": O ? _ : void 0,
                                  tabIndex: -1,
                                  children: X.data.map((W) => W.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    W.id
                                  ) : E?.id === I.id && E.column == W.id ? /* @__PURE__ */ p(jc, { row: I, column: W }, W.id) : /* @__PURE__ */ p(
                                    Hc,
                                    {
                                      row: I,
                                      column: W,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: H,
                                      focusable: ht?.row === I.id && ht?.column == W.id
                                    },
                                    W.id
                                  ))
                                },
                                I.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ p(
                    bs,
                    {
                      type: "footer",
                      contentWidth: Ue,
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
      Xc,
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
const Zc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Jc = _t(function({
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
  sortMarks: N,
  undo: S = !1,
  hotkeys: C = null,
  ...E
}, O) {
  const D = F();
  D.current = E;
  const M = $(() => new Jl(Hs), []), z = $(() => M.in, [M]), H = F(null);
  H.current === null && (H.current = new Us((K, le) => {
    const ee = "on" + Zc(K);
    D.current && D.current[ee] && D.current[ee](le);
  }), z.setNext(H.current));
  const T = $(
    () => ({
      getState: M.getState.bind(M),
      getReactiveState: M.getReactive.bind(M),
      getStores: () => ({ data: M }),
      exec: z.exec,
      setNext: (K) => (H.current = H.current.setNext(K), H.current),
      intercept: z.intercept.bind(z),
      on: z.on.bind(z),
      detach: z.detach.bind(z),
      getRow: M.getRow.bind(M),
      getRowIndex: M.getRowIndex.bind(M),
      getColumn: M.getColumn.bind(M)
    }),
    [M, z]
  ), [G, oe] = B(0), [he, Q] = B(0), [ce, Se] = B(null), [P, ae] = B(null), we = $(() => {
    if (y && !e.length && t.length) {
      const K = t[0], le = [];
      for (let ee in K)
        if (ee !== "id" && ee[0] !== "$") {
          let ie = {
            id: ee,
            header: ee[0].toUpperCase() + ee.slice(1)
          };
          typeof y == "object" && (ie = { ...ie, ...y }), le.push(ie);
        }
      return le;
    }
    return (P && P.columns) ?? e;
  }, [y, e, t, P]), ge = $(
    () => (P && P.sizes) ?? f,
    [P, f]
  ), Ce = R(
    (K) => {
      if (oe(K.width), Q(K.height), k) {
        const le = Object.keys(k).map(Number).sort((ee, ie) => ee - ie).find((ee) => K.width <= ee) ?? null;
        le !== ce && (ae(k[le]), Se(le));
      }
    },
    [k, ce]
  ), de = _e(Je.theme), q = F(0);
  return V(() => {
    if (!q.current)
      b && b(T);
    else {
      const K = M.getState();
      M.init({
        data: t,
        columns: we,
        split: x || K.split,
        sizes: ge || K.sizes,
        selectedRows: o || K.selectedRows,
        dynamic: d,
        tree: w,
        sortMarks: N || K.sortMarks,
        undo: S,
        reorder: h,
        _skin: de,
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
    N,
    S,
    h,
    de,
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
    sortMarks: N || {},
    undo: S,
    reorder: h,
    _skin: de,
    select: i
  }), Tt(
    O,
    () => ({
      ...T
    }),
    [T]
  ), /* @__PURE__ */ p(et.Provider, { value: T, children: /* @__PURE__ */ p(Rn, { words: cc, optional: !0, children: /* @__PURE__ */ p(
    Qc,
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
      clientWidth: G,
      clientHeight: he,
      responsiveLevel: ce,
      resize: Ce,
      hotkeys: C
    }
  ) }) });
});
function ed({ item: t }) {
  return /* @__PURE__ */ J(
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
function td({ columns: t = null, api: e, children: n }) {
  V(() => {
    hc("table-header", ed);
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
    Lo,
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
mr(Ze);
function nd({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ J("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
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
function $s({ column: t, cell: e }) {
  const n = $(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ p("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ p(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function rd(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: i,
    multiTaskRows: a = !1,
    rowMapping: l = null
  } = t, [c, d] = ze(o), [u, h] = B(), g = _e(Je.i18n), m = $(() => g.getGroup("gantt"), [g]), f = _e(wt), x = se(f, "scrollTop"), w = se(f, "cellHeight"), y = se(f, "_scrollTask"), b = se(f, "_selected"), k = se(f, "area"), N = se(f, "_tasks"), S = se(f, "_scales"), C = se(f, "columns"), E = se(f, "_sort"), O = se(f, "calendar"), D = se(f, "durationUnit"), M = se(f, "splitTasks"), [z, H] = B(null), T = $(() => !N || !k ? [] : a && l ? N : N.slice(k.start, k.end), [N, k, a, l]), G = R(
    (L, te) => {
      if (te === "add-task")
        f.exec(te, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (te === "open-task") {
        const ne = T.find((ue) => ue.id === L);
        (ne?.data || ne?.lazy) && f.exec(te, { id: L, mode: !ne.open });
      }
    },
    [T]
  ), oe = R(
    (L) => {
      const te = bt(L), ne = L.target.dataset.action;
      ne && L.preventDefault(), te ? ne === "add-task" || ne === "open-task" ? G(te, ne) : f.exec("select-task", {
        id: te,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : ne === "add-task" && G(null, ne);
    },
    [f, G]
  ), he = F(null), Q = F(null), [ce, Se] = B(0), [P, ae] = B(!1);
  V(() => {
    const L = Q.current;
    if (!L || typeof ResizeObserver > "u") return;
    const te = () => Se(L.clientWidth);
    te();
    const ne = new ResizeObserver(te);
    return ne.observe(L), () => ne.disconnect();
  }, []);
  const we = F(null), ge = R(
    (L) => {
      const te = L.id, { before: ne, after: ue } = L, Me = L.onMove;
      let Ee = ne || ue, Oe = ne ? "before" : "after";
      if (Me) {
        if (Oe === "after") {
          const Ke = f.getTask(Ee);
          Ke.data?.length && Ke.open && (Oe = "before", Ee = Ke.data[0].id);
        }
        we.current = { id: te, [Oe]: Ee };
      } else we.current = null;
      f.exec("move-task", {
        id: te,
        mode: Oe,
        target: Ee,
        inProgress: Me
      });
    },
    [f]
  ), Ce = $(() => a && l ? 0 : k?.from ?? 0, [k, a, l]), de = $(() => S?.height ?? 0, [S]), q = $(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ce ?? 0), [n, s, c, r, ce]), K = $(() => {
    const L = {};
    return q && s === "all" || s === "grid" && q ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [q, s, c]), le = $(() => z && !T.find((L) => L.id === z.id) ? [...T, z] : T, [T, z]), ee = $(() => {
    if (!a || !l) return le;
    const L = /* @__PURE__ */ new Map(), te = /* @__PURE__ */ new Set();
    return le.forEach((ne) => {
      const ue = l.taskRows.get(ne.id) ?? ne.id;
      te.has(ue) || (L.set(ue, {
        ...ne,
        $rowTasks: l.rowMap.get(ue) || [ne.id]
      }), te.add(ue));
    }), Array.from(L.values());
  }, [le, a, l]), ie = $(() => {
    let L = (C || []).map((ue) => {
      ue = { ...ue };
      const Me = ue.header;
      if (typeof Me == "object") {
        const Ee = Me.text && m(Me.text);
        ue.header = { ...Me, text: Ee };
      } else ue.header = m(Me);
      return ue;
    });
    const te = L.findIndex((ue) => ue.id === "text"), ne = L.findIndex((ue) => ue.id === "add-task");
    if (te !== -1 && (L[te].cell && (L[te]._cell = L[te].cell), L[te].cell = nd), ne !== -1) {
      L[ne].cell = L[ne].cell || $s;
      const ue = L[ne].header;
      if (typeof ue != "object" && (L[ne].header = { text: ue }), L[ne].header.cell = ue.cell || $s, e)
        L.splice(ne, 1);
      else if (n) {
        const [Me] = L.splice(ne, 1);
        L.unshift(Me);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [C, m, e, n]), Re = $(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : ie.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, ie]), ke = $(() => {
    if (ee && E?.length) {
      const L = {};
      return E.forEach(({ key: te, order: ne }, ue) => {
        L[te] = {
          order: ne,
          ...E.length > 1 && { index: ue }
        };
      }), L;
    }
    return {};
  }, [ee, E]), X = R(() => ie.some((L) => L.flexgrow && !L.hidden), []), me = $(() => X(), [X, P]), ye = $(() => {
    let L = s === "chart" ? ie.filter((ne) => ne.id === "add-task") : ie;
    const te = s === "all" ? r : ce;
    if (!me) {
      let ne = c, ue = !1;
      if (ie.some((Me) => Me.$width)) {
        let Me = 0;
        ne = ie.reduce((Ee, Oe) => (Oe.hidden || (Me += Oe.width, Ee += Oe.$width || Oe.width), Ee), 0), Me > ne && ne > te && (ue = !0);
      }
      if (ue || ne < te) {
        let Me = 1;
        return ue || (Me = (te - 50) / (ne - 50 || 1)), L.map((Ee) => (Ee.id !== "add-task" && !Ee.hidden && (Ee.$width || (Ee.$width = Ee.width), Ee.width = Ee.$width * Me), Ee));
      }
    }
    return L;
  }, [s, ie, me, c, r, ce]), $e = R(
    (L) => {
      if (!X()) {
        const te = ye.reduce((ne, ue) => (L && ue.$width && (ue.$width = ue.width), ne + (ue.hidden ? 0 : ue.width)), 0);
        te !== c && d(te);
      }
      ae(!0), ae(!1);
    },
    [X, ye, c, d]
  ), j = R(() => {
    ie.filter((te) => te.flexgrow && !te.hidden).length === 1 && ie.forEach((te) => {
      te.$width && !te.flexgrow && !te.hidden && (te.width = te.$width);
    });
  }, []), be = R(
    (L) => {
      if (!e) {
        const te = bt(L), ne = tr(L, "data-col-id");
        !(ne && ie.find((Me) => Me.id == ne))?.editor && te && f.exec("show-editor", { id: te });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), De = $(
    () => Array.isArray(b) ? b.map((L) => L.id) : [],
    [b]
  ), pe = F(Ce);
  pe.current = Ce, V(() => {
    const L = (ne) => {
      if (he.current) {
        const ue = he.current.querySelector(".wx-body");
        ue && (ue.style.top = -((ne ?? 0) - (pe.current ?? 0)) + "px");
      }
      Q.current && (Q.current.scrollTop = 0);
    };
    return L(x), f.on("scroll-chart", ({ top: ne }) => {
      ne !== void 0 && L(ne);
    });
  }, [f, x]), V(() => {
    if (he.current) {
      const L = he.current.querySelector(".wx-body");
      L && (L.style.top = -((x ?? 0) - (Ce ?? 0)) + "px");
    }
  }, [Ce]), V(() => {
    const L = he.current;
    if (!L) return;
    const te = L.querySelector(".wx-table-box .wx-body");
    if (!te || typeof ResizeObserver > "u") return;
    const ne = new ResizeObserver(() => {
      if (he.current) {
        const ue = he.current.querySelector(".wx-body");
        ue && (ue.style.top = -((x ?? 0) - (pe.current ?? 0)) + "px");
      }
    });
    return ne.observe(te), () => {
      ne.disconnect();
    };
  }, [ye, K, s, Re, ee, x]), V(() => {
    if (!y || !u) return;
    const { id: L } = y, te = u.getState().focusCell;
    te && te.row !== L && he.current && he.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: te.column
    });
  }, [y, u]);
  const He = R(
    ({ id: L }) => {
      if (e) return !1;
      f.getTask(L).open && f.exec("open-task", { id: L, mode: !1 });
      const te = f.getState()._tasks.find((ne) => ne.id === L);
      if (H(te || null), !te) return !1;
    },
    [f, e]
  ), ve = R(
    ({ id: L, top: te }) => {
      we.current ? ge({ ...we.current, onMove: !1 }) : f.exec("drag-task", {
        id: L,
        top: te + (Ce ?? 0),
        inProgress: !1
      }), H(null);
    },
    [f, ge, Ce]
  ), Pe = R(
    ({ id: L, top: te, detail: ne }) => {
      ne && ge({ ...ne, onMove: !0 }), f.exec("drag-task", {
        id: L,
        top: te + (Ce ?? 0),
        inProgress: !0
      });
    },
    [f, ge, Ce]
  );
  V(() => {
    const L = he.current;
    return L ? lc(L, {
      start: He,
      end: ve,
      move: Pe,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, He, ve, Pe]);
  const Te = R(
    (L) => {
      const { key: te, isInput: ne } = L;
      if (!ne && (te === "arrowup" || te === "arrowdown"))
        return L.eventSource = "grid", f.exec("hotkey", L), !1;
      if (te === "enter") {
        const ue = u?.getState().focusCell;
        if (ue) {
          const { row: Me, column: Ee } = ue;
          Ee === "add-task" ? G(Me, "add-task") : Ee === "text" && G(Me, "open-task");
        }
      }
    },
    [f, G, u]
  ), Le = F(null), We = () => {
    Le.current = {
      setTableAPI: h,
      handleHotkey: Te,
      sortVal: E,
      api: f,
      adjustColumns: j,
      setColumnWidth: $e,
      tasks: T,
      calendarVal: O,
      durationUnitVal: D,
      splitTasksVal: M,
      onTableAPIChange: i
    };
  };
  We(), V(() => {
    We();
  }, [
    h,
    Te,
    E,
    f,
    j,
    $e,
    T,
    O,
    D,
    M,
    i
  ]);
  const Ue = R((L) => {
    h(L), L.intercept("hotkey", (te) => Le.current.handleHotkey(te)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (te) => {
      const ne = Le.current.sortVal, { key: ue, add: Me } = te, Ee = ne ? ne.find((Ke) => Ke.key === ue) : null;
      let Oe = "asc";
      return Ee && (Oe = !Ee || Ee.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: ue,
        order: Oe,
        add: Me
      }), !1;
    }), L.on("resize-column", () => {
      Le.current.setColumnWidth(!0);
    }), L.on("hide-column", (te) => {
      te.mode || Le.current.adjustColumns(), Le.current.setColumnWidth();
    }), L.intercept("update-cell", (te) => {
      const { id: ne, column: ue, value: Me } = te, Ee = Le.current.tasks.find((Oe) => Oe.id === ne);
      if (Ee) {
        const Oe = { ...Ee };
        let Ke = Me;
        Ke && !isNaN(Ke) && !(Ke instanceof Date) && (Ke *= 1), Oe[ue] = Ke, ko(
          Oe,
          {
            calendar: Le.current.calendarVal,
            durationUnit: Le.current.durationUnitVal,
            splitTasks: Le.current.splitTasksVal
          },
          ue
        ), f.exec("update-task", {
          id: ne,
          task: Oe
        });
      }
      return !1;
    }), i && i(L);
  }, []);
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Re}` },
      ref: Q,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: he,
          style: K,
          className: "wx-rHj6070p wx-table",
          onClick: oe,
          onDoubleClick: be,
          children: /* @__PURE__ */ p(
            Jc,
            {
              init: Ue,
              sizes: {
                rowHeight: w,
                headerHeight: (de ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: ee,
              columns: ye,
              selectedRows: [...De],
              sortMarks: ke
            }
          )
        }
      )
    }
  );
}
function sd({ borders: t = "" }) {
  const e = _e(wt), n = se(e, "cellWidth"), r = se(e, "cellHeight"), s = F(null), [o, i] = B("#e4e4e4");
  V(() => {
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
    background: n != null && r != null ? `url(${fl(n, r, o, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ p("div", { ref: s, style: a });
}
function od({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = _e(wt), s = se(r, "_links"), o = se(r, "criticalPath"), i = F(null), a = R(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return V(() => {
    if (!n && e && i.current) {
      const l = (c) => {
        i.current && !i.current.contains(c.target) && a(c);
      };
      return document.addEventListener("click", l), () => {
        document.removeEventListener("click", l);
      };
    }
  }, [n, e, a]), /* @__PURE__ */ J("svg", { className: "wx-dkx3NwEn wx-links", children: [
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
function id(t) {
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
  return /* @__PURE__ */ p("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ J(
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
let qn = [], Xn = null, Cs = null;
const It = (t) => new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())), _s = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, i = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, a = Math.floor(t / r), l = It(n);
  return new Date(l.getTime() + a * i * o);
}, ad = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / i);
}, ld = (t, e, n) => {
  if (!n || !t) return t;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5, a = new Date(t.getTime() + e * i);
  return a.setUTCHours(0, 0, 0, 0), a;
}, cd = (t, e, n, r) => t < r && e > n;
function dd(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: i = !1,
    allowTaskIntersection: a = !0
  } = t, l = _e(wt), [c, d] = Xt(l, "_tasks"), [u, h] = Xt(l, "_links"), g = se(l, "area"), m = se(l, "_scales"), f = se(l, "taskTypes"), x = se(l, "baselines"), [w, y] = Xt(l, "_selected"), b = se(l, "_scrollTask"), k = se(l, "criticalPath"), N = se(l, "tasks"), S = se(l, "schedule"), C = se(l, "splitTasks"), E = $(() => {
    if (!g || !Array.isArray(c)) return [];
    const v = g.start ?? 0, _ = g.end ?? 0;
    return r && s ? c.map((A) => ({ ...A })) : c.slice(v, _).map((A) => ({ ...A }));
  }, [d, g, r, s]), O = se(l, "cellHeight"), D = $(() => {
    if (!r || !s || !E.length) return E;
    const v = /* @__PURE__ */ new Map(), _ = [];
    return c.forEach((A) => {
      const U = s.taskRows.get(A.id) ?? A.id;
      v.has(U) || (v.set(U, _.length), _.push(U));
    }), E.map((A) => {
      const U = s.taskRows.get(A.id) ?? A.id, Y = v.get(U) ?? 0;
      return {
        ...A,
        $y: Y * O,
        $y_base: A.$y_base !== void 0 ? Y * O : void 0
      };
    });
  }, [E, r, s, c, O]), M = $(
    () => m.lengthUnitWidth,
    [m]
  ), z = $(
    () => m.lengthUnit || "day",
    [m]
  ), H = F(!1), [T, G] = B(void 0), [oe, he] = B(null), Q = F(null), [ce, Se] = B(null), [P, ae] = B(void 0), we = F(null), [ge, Ce] = B(0), [de, q] = B(null), K = F(null), [le, ee] = B(null), [ie, Re] = B(null), [ke, X] = B(null), me = F(null);
  me.current = ie;
  const ye = F(200), $e = F(null), j = $(() => {
    const v = $e.current;
    return !!(w.length && v && v.contains(document.activeElement));
  }, [w, $e.current]), be = $(() => j && w[w.length - 1]?.id, [j, w]);
  V(() => {
    if (b && j && b) {
      const { id: v } = b, _ = $e.current?.querySelector(
        `.wx-bar[data-id='${v}']`
      );
      _ && _.focus({ preventScroll: !0 });
    }
  }, [b]), V(() => {
    const v = $e.current;
    if (v && (Ce(v.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const _ = new ResizeObserver((A) => {
        A[0] && Ce(A[0].contentRect.width);
      });
      return _.observe(v), () => _.disconnect();
    }
  }, [$e.current]);
  const De = R(() => {
    document.body.style.userSelect = "none";
  }, []), pe = R(() => {
    document.body.style.userSelect = "";
  }, []), He = R(
    (v, _, A) => {
      if (_.target.classList.contains("wx-line") || (A || (A = l.getTask(kt(v))), A.type === "milestone" || A.type === "summary")) return "";
      const U = Be(_, "data-segment");
      U && (v = U);
      const { left: Y, width: W } = v.getBoundingClientRect(), Z = (_.clientX - Y) / W;
      let re = 0.2 / (W > 200 ? W / 200 : 1);
      return Z < re ? "start" : Z > 1 - re ? "end" : "";
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
            const W = A[U], Z = A[Y], re = W.$x, fe = W.$x + W.$w, xe = Z.$x, Ie = Z.$x + Z.$w;
            cd(re, fe, xe, Ie) && (v.add(W.id), v.add(Z.id));
          }
    }), v;
  }, [a, r, s, c, d]), Pe = $(() => {
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
      const Y = s.taskRows.get(U.id) ?? U.id, W = _.get(Y) ?? 0;
      v.set(U.id, W * O);
    }), v;
  }, [c, r, s, O]), Te = $(() => {
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
      v.set(Y, U * O);
    }), v;
  }, [c, r, s, O]), Le = R(
    (v) => {
      if (!$e.current) return [];
      const A = Math.min(v.startX, v.currentX), U = Math.max(v.startX, v.currentX), Y = Math.min(v.startY, v.currentY), W = Math.max(v.startY, v.currentY);
      return c.filter((Z) => {
        const re = Z.$x, fe = Z.$x + Z.$w, Ie = Pe.get(Z.id) ?? Z.$y, Ye = Ie + Z.$h;
        return re < U && fe > A && Ie < W && Ye > Y;
      });
    },
    [c, Pe]
  ), We = $(() => new Set(w.map((v) => v.id)), [w, y]), Ue = R(
    (v) => We.has(v),
    [We]
  ), L = R(
    (v, _) => {
      const { clientX: A } = _, U = kt(v), Y = l.getTask(U), W = _.target.classList;
      if (!_.target.closest(".wx-delete-button") && !e) {
        if (W.contains("wx-progress-marker")) {
          const { progress: Z } = l.getTask(U);
          Q.current = {
            id: U,
            x: A,
            progress: Z,
            dx: 0,
            node: v,
            marker: _.target
          }, _.target.classList.add("wx-progress-in-drag");
        } else {
          const Z = He(v, _, Y) || "move", re = {
            id: U,
            mode: Z,
            x: A,
            dx: 0,
            l: Y.$x,
            w: Y.$w
          };
          if (C && Y.segments?.length) {
            const fe = Be(_, "data-segment");
            fe && (re.segmentIndex = fe.dataset.segment * 1);
          }
          he(re);
        }
        De();
      }
    },
    [l, e, He, De, C]
  ), te = R(
    (v) => {
      if (v.button !== 0 || ke) return;
      const _ = Be(v);
      if (!_ && o && !e) {
        const A = $e.current;
        if (!A) return;
        const U = A.getBoundingClientRect(), Y = v.clientX - U.left, W = v.clientY - U.top;
        if (i) {
          const re = _s(Y, m);
          re && (me.current = re, Re(re));
        }
        const Z = {
          startX: Y,
          startY: W,
          currentX: Y,
          currentY: W,
          ctrlKey: v.ctrlKey || v.metaKey
        };
        q(Z), K.current = Z, De();
        return;
      }
      if (_) {
        if (o && !e && w.length > 1) {
          const A = kt(_);
          if (Ue(A)) {
            const U = v.target.classList;
            if (!U.contains("wx-link") && !U.contains("wx-progress-marker") && !v.target.closest(".wx-delete-button")) {
              const Y = l.getTask(A);
              if (!He(_, v, Y)) {
                const Z = /* @__PURE__ */ new Map();
                w.forEach((re) => {
                  const fe = l.getTask(re.id);
                  if (fe) {
                    if (S?.auto && fe.type === "summary") return;
                    Z.set(re.id, {
                      $x: fe.$x,
                      $w: fe.$w,
                      start: fe.start,
                      end: fe.end
                    });
                  }
                }), ee({
                  baseTaskId: A,
                  startX: v.clientX,
                  dx: 0,
                  originalPositions: Z
                }), De();
                return;
              }
            }
          }
        }
        L(_, v);
      }
    },
    [L, o, i, e, w, Ue, l, He, S, De, m, ke]
  ), ne = R(
    (v) => {
      const _ = Be(v);
      _ && (we.current = setTimeout(() => {
        ae(!0), L(_, v.touches[0]);
      }, 300));
    },
    [L]
  ), ue = R(
    (v) => {
      Se(v && { ...u.find((_) => _.id === v) });
    },
    [u]
  ), Me = R(() => {
    const v = K.current;
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
      })), q(null), K.current = null, pe(), H.current = !0;
      return;
    }
    if (le) {
      const { dx: _, originalPositions: A } = le, U = Math.round(_ / M);
      if (U !== 0) {
        let Y = !0;
        A.forEach((W, Z) => {
          const re = l.getTask(Z);
          re && (l.exec("update-task", {
            id: Z,
            diff: U,
            task: { start: re.start, end: re.end },
            skipUndo: !Y
            // Only first task creates undo entry
          }), Y = !1);
        }), H.current = !0;
      } else
        A.forEach((Y, W) => {
          l.exec("drag-task", {
            id: W,
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
      const { id: _, mode: A, dx: U, l: Y, w: W, start: Z, segment: re, index: fe } = oe;
      if (he(null), Z) {
        const xe = Math.round(U / M);
        if (!xe)
          l.exec("drag-task", {
            id: _,
            width: W,
            left: Y,
            inProgress: !1,
            ...re && { segmentIndex: fe }
          });
        else {
          let Ie = {}, Ye = l.getTask(_);
          re && (Ye = Ye.segments[fe]);
          const je = 1440 * 60 * 1e3, Fe = xe * (z === "week" ? 7 : z === "month" ? 30 : z === "quarter" ? 91 : z === "year" ? 365 : 1) * je;
          A === "move" ? (Ie.start = new Date(Ye.start.getTime() + Fe), Ie.end = new Date(Ye.end.getTime() + Fe)) : A === "start" ? (Ie.start = new Date(Ye.start.getTime() + Fe), Ie.end = Ye.end) : A === "end" && (Ie.start = Ye.start, Ie.end = new Date(Ye.end.getTime() + Fe)), l.exec("update-task", {
            id: _,
            task: Ie,
            ...re && { segmentIndex: fe }
          });
        }
        H.current = !0;
      }
      pe();
    }
  }, [l, pe, oe, M, z, de, le, Le, w]), Ee = R(
    (v, _) => {
      const { clientX: A, clientY: U } = _, Y = $e.current;
      if (Y) {
        const W = Y.getBoundingClientRect();
        ye.current = A - W.left;
      }
      if (ke) {
        if (!Y) return;
        const W = Y.getBoundingClientRect(), Z = A - W.left;
        X((re) => ({ ...re, currentX: Z }));
        return;
      }
      if (!e) {
        if (de) {
          const W = $e.current;
          if (!W) return;
          const Z = W.getBoundingClientRect(), re = A - Z.left, fe = U - Z.top;
          q((xe) => ({
            ...xe,
            currentX: re,
            currentY: fe
          })), K.current && (K.current.currentX = re, K.current.currentY = fe);
          return;
        }
        if (le) {
          const W = A - le.startX;
          le.originalPositions.forEach((Z, re) => {
            const fe = Z.$x + W;
            l.exec("drag-task", {
              id: re,
              left: fe,
              width: Z.$w,
              inProgress: !0
            });
          }), ee((Z) => ({ ...Z, dx: W }));
          return;
        }
        if (Q.current) {
          const { node: W, x: Z, id: re } = Q.current, fe = Q.current.dx = A - Z, xe = Math.round(fe / W.offsetWidth * 100);
          let Ie = Q.current.progress + xe;
          Q.current.value = Ie = Math.min(
            Math.max(0, Ie),
            100
          ), l.exec("update-task", {
            id: re,
            task: { progress: Ie },
            inProgress: !0
          });
        } else if (oe) {
          ue(null);
          const { mode: W, l: Z, w: re, x: fe, id: xe, start: Ie, segment: Ye, index: je } = oe, qe = l.getTask(xe), Fe = A - fe;
          if (!Ie && Math.abs(Fe) < 20 || W === "start" && re - Fe < M || W === "end" && re + Fe < M || W === "move" && (Fe < 0 && Z + Fe < 0 || Fe > 0 && Z + re + Fe > ge) || oe.segment)
            return;
          const tt = { ...oe, dx: Fe };
          let nt, yt;
          if (W === "start" ? (nt = Z + Fe, yt = re - Fe) : W === "end" ? (nt = Z, yt = re + Fe) : W === "move" && (nt = Z + Fe, yt = re), l.exec("drag-task", {
            id: xe,
            width: yt,
            left: nt,
            inProgress: !0,
            ...Ye && { segmentIndex: je }
          }), !tt.start && (W === "move" && qe.$x == Z || W !== "move" && qe.$w == re)) {
            H.current = !0, Me();
            return;
          }
          tt.start = !0, he(tt);
        } else {
          const W = Be(v);
          if (W) {
            const Z = l.getTask(kt(W)), fe = Be(v, "data-segment") || W, xe = He(fe, _, Z);
            fe.style.cursor = xe && !e ? "col-resize" : "pointer";
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
      ue,
      Me,
      de,
      le,
      ke
    ]
  ), Oe = R(
    (v) => {
      Ee(v, v);
    },
    [Ee]
  ), Ke = R(
    (v) => {
      P ? (v.preventDefault(), Ee(v, v.touches[0])) : we.current && (clearTimeout(we.current), we.current = null);
    },
    [P, Ee]
  ), xt = R(() => {
    Me();
  }, [Me]), ft = R(() => {
    ae(null), we.current && (clearTimeout(we.current), we.current = null), Me();
  }, [Me]);
  V(() => (window.addEventListener("mouseup", xt), () => {
    window.removeEventListener("mouseup", xt);
  }), [xt]);
  const Pn = R(
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
  ), Dt = ["e2s", "s2s", "e2e", "s2e"], Mt = R((v, _) => Dt[(v ? 1 : 0) + (_ ? 0 : 2)], []), Et = R(
    (v, _) => {
      const A = T.id, U = T.start;
      return v === A ? !0 : !!u.find((Y) => Y.target == v && Y.source == A && Y.type === Mt(U, _));
    },
    [T, h, Mt]
  ), ln = R(() => {
    T && G(null);
  }, [T]), cn = R((v, _, A) => {
    if (!_.length || !v || A == null) return;
    const U = 864e5, Y = l.getHistory();
    Y?.startBatch();
    const W = new Date(v), Z = W.getUTCDay(), re = Z === 0 ? -6 : 1 - Z;
    W.setUTCDate(W.getUTCDate() + re), W.setUTCHours(0, 0, 0, 0), _.forEach((fe, xe) => {
      const Ie = `task-${Date.now()}-${xe}`, Ye = ld(W, fe._startCellOffset || 0, m), je = new Date(Ye.getTime() + (fe._startDayOfWeek || 0) * U);
      je.setUTCHours(0, 0, 0, 0);
      const qe = new Date(je.getTime() + (fe._durationDays || 7) * U);
      qe.setUTCHours(0, 0, 0, 0), console.log("[paste] task:", fe.text, "newStart:", je, "newEnd:", qe, "_durationDays:", fe._durationDays, "_startDayOfWeek:", fe._startDayOfWeek), l.exec("add-task", {
        task: {
          id: Ie,
          text: fe.text,
          start: je,
          end: qe,
          type: fe.type || "task",
          parent: A,
          row: fe.row
        },
        target: A,
        mode: "child",
        skipUndo: xe > 0
      });
    }), Y?.endBatch();
  }, [l, m]), Wn = R(
    (v) => {
      if (H.current) {
        H.current = !1;
        return;
      }
      if (ke && ke.currentX != null) {
        const A = _s(ke.currentX, m);
        A && cn(A, ke.tasks, ke.parent), X(null);
        return;
      }
      const _ = bt(v.target);
      if (_) {
        const A = l.getTask(_), U = c.find((W) => W.id === _);
        console.log("[click] task:", A?.text, "id:", _), console.log("[click] api.getTask:", { start: A?.start, end: A?.end, duration: A?.duration }), console.log("[click] rendered:", { start: U?.start, end: U?.end, $w: U?.$w, $x: U?.$x });
        const Y = v.target.classList;
        if (Y.contains("wx-link")) {
          const W = Y.contains("wx-left");
          if (!T) {
            G({ id: _, start: W });
            return;
          }
          T.id !== _ && !Et(_, W) && l.exec("add-link", {
            link: {
              source: T.id,
              target: _,
              type: Mt(T.start, W)
            }
          });
        } else if (Y.contains("wx-delete-button-icon"))
          l.exec("delete-link", { id: ce.id }), Se(null);
        else {
          let W;
          const Z = Be(v, "data-segment");
          Z && (W = Z.dataset.segment * 1), l.exec("select-task", {
            id: _,
            toggle: v.ctrlKey || v.metaKey,
            range: v.shiftKey,
            segmentIndex: W
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
  ), dn = R((v) => ({
    left: `${v.$x}px`,
    top: `${v.$y}px`,
    width: `${v.$w}px`,
    height: `${v.$h}px`
  }), []), zn = R((v) => ({
    left: `${v.$x_base}px`,
    top: `${v.$y_base}px`,
    width: `${v.$w_base}px`,
    height: `${v.$h_base}px`
  }), []), ht = R(
    (v) => {
      if (P || we.current)
        return v.preventDefault(), !1;
    },
    [P]
  ), Rt = $(
    () => f.map((v) => v.id),
    [f]
  ), Vt = R(
    (v) => {
      let _ = Rt.includes(v) ? v : "task";
      return ["task", "milestone", "summary"].includes(v) || (_ = `task ${_}`), _;
    },
    [Rt]
  ), Gt = R(
    (v) => {
      l.exec(v.action, v.data);
    },
    [l]
  ), gt = R(
    (v) => k && N.byId(v).$critical,
    [k, N]
  ), Bt = R(
    (v) => {
      if (S?.auto) {
        const _ = N.getSummaryId(v, !0), A = N.getSummaryId(T.id, !0);
        return T?.id && !(Array.isArray(_) ? _ : [_]).includes(
          T.id
        ) && !(Array.isArray(A) ? A : [A]).includes(v);
      }
      return T;
    },
    [S, N, T]
  ), un = R(() => {
    const v = l.getState()._selected;
    if (!v || !v.length) return;
    const _ = 864e5, A = v.map((re) => {
      const fe = l.getTask(re.id);
      if (!fe) return null;
      const xe = c.find((Bo) => Bo.id === re.id);
      if (!xe) return null;
      const { $x: Ie, $y: Ye, $h: je, $w: qe, $skip: Fe, $level: tt, $index: nt, $y_base: yt, $x_base: fn, $w_base: On, $h_base: Bd, $skip_baseline: Kd, $critical: jd, $reorder: qd, ...Go } = xe, Ar = xe.end && xe.start ? Math.round((xe.end.getTime() - xe.start.getTime()) / _) : 0, Hr = xe.start ? It(xe.start) : null, Lr = Hr ? (Hr.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", fe.text, "durationDays:", Ar, "startDayOfWeek:", Lr, "$w:", qe), { ...Go, _durationDays: Ar, _startDayOfWeek: Lr, _originalWidth: qe, _originalHeight: je };
    }).filter(Boolean);
    if (!A.length) return;
    const Y = A[0].parent, W = A.filter((re) => re.parent === Y);
    if (W.length === 0) return;
    const Z = W.reduce((re, fe) => {
      if (!fe.start) return re;
      const xe = It(fe.start);
      return !re || xe < re ? xe : re;
    }, null);
    qn = W.map((re) => ({
      ...re,
      start: re.start ? It(re.start) : re.start,
      end: re.end ? It(re.end) : re.end,
      _startCellOffset: ad(re.start ? It(re.start) : null, Z, m)
    })), Cs = Y, Xn = Z;
  }, [l, m]);
  V(() => i ? l.intercept("hotkey", (_) => {
    if (_.key === "ctrl+c" || _.key === "meta+c")
      return un(), !1;
    if (_.key === "ctrl+v" || _.key === "meta+v")
      return !qn.length || !Xn || X({
        tasks: qn,
        baseDate: Xn,
        parent: Cs,
        currentX: ye.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [i, l, un]), V(() => {
    if (!ke) return;
    const v = (_) => {
      _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), X(null));
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [ke]);
  const I = $(() => {
    if (!de) return null;
    const v = Math.min(de.startX, de.currentX), _ = Math.min(de.startY, de.currentY), A = Math.abs(de.currentX - de.startX), U = Math.abs(de.currentY - de.startY);
    return {
      left: `${v}px`,
      top: `${_}px`,
      width: `${A}px`,
      height: `${U}px`
    };
  }, [de]);
  return /* @__PURE__ */ J(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${D.length ? D[0].$h : 0}px` },
      ref: $e,
      onContextMenu: ht,
      onMouseDown: te,
      onMouseMove: Oe,
      onTouchStart: ne,
      onTouchMove: Ke,
      onTouchEnd: ft,
      onClick: Wn,
      onDoubleClick: Pn,
      onDragStart: (v) => (v.preventDefault(), !1),
      children: [
        /* @__PURE__ */ p(
          od,
          {
            onSelectLink: ue,
            selectedLink: ce,
            readonly: e
          }
        ),
        D.map((v) => {
          if (v.$skip && v.$skip_baseline) return null;
          const _ = ve.has(v.id), A = `wx-bar wx-${Vt(v.type)}` + (P && oe && v.id === oe.id ? " wx-touch" : "") + (T && T.id === v.id ? " wx-selected" : "") + (We.has(v.id) ? " wx-selected" : "") + (gt(v.id) ? " wx-critical" : "") + (v.$reorder ? " wx-reorder-task" : "") + (C && v.segments ? " wx-split" : "") + (_ ? " wx-collision" : ""), U = "wx-link wx-left" + (T ? " wx-visible" : "") + (!T || !Et(v.id, !0) && Bt(v.id) ? " wx-target" : "") + (T && T.id === v.id && T.start ? " wx-selected" : "") + (gt(v.id) ? " wx-critical" : ""), Y = "wx-link wx-right" + (T ? " wx-visible" : "") + (!T || !Et(v.id, !1) && Bt(v.id) ? " wx-target" : "") + (T && T.id === v.id && !T.start ? " wx-selected" : "") + (gt(v.id) ? " wx-critical" : "");
          return /* @__PURE__ */ J(Ms, { children: [
            !v.$skip && /* @__PURE__ */ J(
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
                  v.type !== "milestone" ? /* @__PURE__ */ J(Ae, { children: [
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
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: Gt }) : C && v.segments ? /* @__PURE__ */ p(id, { task: v, type: Vt(v.type) }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.text || "" }),
                    _ && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ J(Ae, { children: [
                    /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: Gt }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: v.text })
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
                style: zn(v)
              }
            ) : null
          ] }, v.id);
        }),
        de && I && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: I }),
        ke && ke.currentX != null && ke.tasks.map((v, _) => {
          const U = (Math.floor(ke.currentX / M) + (v._startCellOffset || 0)) * M, Y = v._originalWidth || M, W = v._originalHeight || O, Z = Te.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: U, top: Z, width: Y, height: W },
              children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.text })
            },
            `preview-${_}`
          );
        })
      ]
    }
  );
}
function ud(t) {
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
const fd = /* @__PURE__ */ new Map();
function hd(t) {
  const e = F(null), n = F(0), r = F(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, V(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        fd.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function gd(t) {
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
  } = t, m = _e(wt), [f, x] = Xt(m, "_selected"), w = se(m, "scrollTop"), y = se(m, "cellHeight"), b = se(m, "cellWidth"), k = se(m, "_scales"), N = se(m, "_markers"), S = se(m, "_scrollTask"), C = se(m, "zoom"), E = se(m, "_tasks"), [O, D] = B(), M = F(null), z = F(0), H = F(!1), T = 1 + (k?.rows?.length || 0), G = $(() => {
    if (!a || !l || !E?.length) return null;
    const q = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Map(), le = [];
    return E.forEach((ee) => {
      const ie = l.taskRows.get(ee.id) ?? ee.id;
      K.has(ie) || (K.set(ie, le.length), le.push(ie));
    }), E.forEach((ee) => {
      const ie = l.taskRows.get(ee.id) ?? ee.id, Re = K.get(ie) ?? 0;
      q.set(ee.id, Re * y);
    }), q;
  }, [E, a, l, y]), oe = $(() => {
    const q = [];
    return f && f.length && y && f.forEach((K) => {
      const le = G?.get(K.id) ?? K.$y;
      q.push({ height: `${y}px`, top: `${le - 3}px` });
    }), q;
  }, [x, y, G]), he = $(
    () => Math.max(O || 0, r),
    [O, r]
  );
  V(() => {
    const q = M.current;
    q && typeof w == "number" && (q.scrollTop = w);
  }, [w]);
  const Q = () => {
    ce();
  };
  function ce(q) {
    const K = M.current;
    if (!K) return;
    const le = {};
    le.left = K.scrollLeft, m.exec("scroll-chart", le);
  }
  function Se() {
    const q = M.current, le = Math.ceil((O || 0) / (y || 1)) + 1, ee = Math.floor((q && q.scrollTop || 0) / (y || 1)), ie = Math.max(0, ee - T), Re = ee + le + T, ke = ie * (y || 0);
    m.exec("render-data", {
      start: ie,
      end: Re,
      from: ke
    });
  }
  V(() => {
    Se();
  }, [O, w]);
  const P = R(
    (q) => {
      if (!q) return;
      const { id: K, mode: le } = q;
      if (le.toString().indexOf("x") < 0) return;
      const ee = M.current;
      if (!ee) return;
      const { clientWidth: ie } = ee, Re = m.getTask(K);
      if (Re.$x + Re.$w < ee.scrollLeft)
        m.exec("scroll-chart", { left: Re.$x - (b || 0) }), ee.scrollLeft = Re.$x - (b || 0);
      else if (Re.$x >= ie + ee.scrollLeft) {
        const ke = ie < Re.$w ? b || 0 : Re.$w;
        m.exec("scroll-chart", { left: Re.$x - ie + ke }), ee.scrollLeft = Re.$x - ie + ke;
      }
    },
    [m, b]
  );
  V(() => {
    P(S);
  }, [S]);
  function ae(q) {
    if (C && (q.ctrlKey || q.metaKey)) {
      q.preventDefault();
      const K = M.current, le = q.clientX - (K ? K.getBoundingClientRect().left : 0);
      if (z.current += q.deltaY, Math.abs(z.current) >= 150) {
        const ie = -Math.sign(z.current);
        z.current = 0, m.exec("zoom-scale", {
          dir: ie,
          offset: le
        });
      }
    }
  }
  const we = R((q) => {
    const K = i(q.date, q.unit);
    return K ? {
      css: K,
      width: q.width
    } : null;
  }, [i]), ge = $(() => {
    if (!k || !i || !["hour", "day", "week"].includes(k.minUnit)) return null;
    let K = 0;
    return k.rows[k.rows.length - 1].cells.map((le) => {
      const ee = we(le), ie = K;
      return K += le.width, ee ? { ...ee, left: ie } : null;
    });
  }, [k, i, we]), Ce = R(
    (q) => {
      q.eventSource = "chart", m.exec("hotkey", q);
    },
    [m]
  );
  V(() => {
    const q = M.current;
    if (!q) return;
    const K = () => D(q.clientHeight);
    K();
    const le = new ResizeObserver(() => K());
    return le.observe(q), () => {
      le.disconnect();
    };
  }, [M.current]);
  const de = F(null);
  return V(() => {
    const q = M.current;
    if (q && !de.current)
      return de.current = Er(q, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (K) => Ce(K)
      }), () => {
        de.current?.destroy(), de.current = null;
      };
  }, []), V(() => {
    const q = M.current;
    if (!q) return;
    const K = ae;
    return q.addEventListener("wheel", K), () => {
      q.removeEventListener("wheel", K);
    };
  }, [ae]), V(() => {
    if (!u || H.current || !k || !M.current || !O) return;
    const q = M.current, { clientWidth: K } = q, le = /* @__PURE__ */ new Date(), ee = k.rows[k.rows.length - 1]?.cells;
    if (!ee) return;
    let ie = -1, Re = 0;
    const ke = [];
    for (let me = 0; me < ee.length; me++) {
      const ye = ee[me];
      ke.push({ left: Re, width: ye.width });
      const $e = ye.date;
      if (ye.unit === "week") {
        const j = new Date($e);
        j.setUTCDate(j.getUTCDate() + 7), le >= $e && le < j && (ie = me);
      } else ye.unit === "day" && le.getUTCFullYear() === $e.getUTCFullYear() && le.getUTCMonth() === $e.getUTCMonth() && le.getUTCDate() === $e.getUTCDate() && (ie = me);
      Re += ye.width;
    }
    let X = ie;
    if (ie > 0 && (X = ie - 1), X >= 0 && ke[X]) {
      const me = ke[X], ye = Math.max(0, me.left);
      q.scrollLeft = ye, m.exec("scroll-chart", { left: ye }), H.current = !0;
    }
  }, [u, k, O, m]), hd("chart"), /* @__PURE__ */ J(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: M,
      onScroll: Q,
      children: [
        /* @__PURE__ */ p(ud, { highlightTime: i, scales: k }),
        N && N.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${he}px` },
            children: N.map((q, K) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${q.css || ""}`,
                style: { left: `${q.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: q.text })
              },
              K
            ))
          }
        ) : null,
        /* @__PURE__ */ J(
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
                    (q, K) => q ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + q.css,
                        style: {
                          width: `${q.width}px`,
                          left: `${q.left}px`
                        }
                      },
                      K
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(sd, { borders: o }),
              f && f.length ? f.map(
                (q, K) => q.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": q.id,
                    style: oe[K]
                  },
                  q.id
                ) : null
              ) : null,
              /* @__PURE__ */ p(
                dd,
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
function pd(t) {
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
  } = t, [d, u] = ze(t.value ?? 0), [h, g] = ze(t.display ?? "all");
  function m(Q) {
    let ce = 0;
    e == "center" ? ce = n / 2 : e == "before" && (ce = n);
    const Se = {
      size: [n + "px", "auto"],
      p: [Q - ce + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let P in Se) Se[P] = Se[P].reverse();
    return Se;
  }
  const [f, x] = B(!1), [w, y] = B(null), b = F(0), k = F(), N = F(), S = F(h);
  V(() => {
    S.current = h;
  }, [h]), V(() => {
    w === null && d > 0 && y(d);
  }, [w, d]);
  function C(Q) {
    return r == "x" ? Q.clientX : Q.clientY;
  }
  const E = R(
    (Q) => {
      const ce = k.current + C(Q) - b.current;
      u(ce);
      let Se;
      ce <= l ? Se = "chart" : a - ce <= c ? Se = "grid" : Se = "all", S.current !== Se && (g(Se), S.current = Se), N.current && clearTimeout(N.current), N.current = setTimeout(() => s && s(ce), 100);
    },
    [a, l, c, s]
  ), O = R(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", x(!1), window.removeEventListener("mousemove", E), window.removeEventListener("mouseup", O);
  }, [E]), D = $(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), M = R(
    (Q) => {
      !i && (h === "grid" || h === "chart") || (b.current = C(Q), k.current = d, x(!0), document.body.style.cursor = D, document.body.style.userSelect = "none", window.addEventListener("mousemove", E), window.addEventListener("mouseup", O));
    },
    [D, E, O, d, i, h]
  );
  function z() {
    g("all"), w !== null && (u(w), s && s(w));
  }
  function H(Q) {
    if (i) {
      const ce = h === "chart" ? "grid" : "chart";
      g(ce), o(ce);
    } else if (h === "grid" || h === "chart")
      z(), o("all");
    else {
      const ce = Q === "left" ? "chart" : "grid";
      g(ce), o(ce);
    }
  }
  function T() {
    H("left");
  }
  function G() {
    H("right");
  }
  const oe = $(() => m(d), [d, e, n, r]), he = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ J(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: M,
      style: { width: oe.size[0], height: oe.size[1], cursor: D },
      children: [
        /* @__PURE__ */ J("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
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
              onClick: G
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const md = 650;
function Yo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= md;
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
function wd(t) {
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
  }, [m, i, a]), [N, S] = B(!1);
  let [C, E] = B(0);
  const [O, D] = B(0), [M, z] = B(0), [H, T] = B(void 0), [G, oe] = B("all"), he = F(null), Q = R(
    (X) => {
      S((me) => (X !== me && (X ? (he.current = G, G === "all" && oe("grid")) : (!he.current || he.current === "all") && oe("all")), X));
    },
    [G]
  );
  V(() => {
    const X = Yo(Q);
    return X.observe(), () => {
      X.disconnect();
    };
  }, [Q]);
  const ce = $(() => {
    let X;
    return w.every((me) => me.width && !me.flexgrow) ? X = w.reduce((me, ye) => me + parseInt(ye.width), 0) : N && G === "chart" ? X = parseInt(w.find((me) => me.id === "action")?.width) || 50 : X = 440, C = X, X;
  }, [w, N, G]);
  V(() => {
    E(ce);
  }, [ce]);
  const Se = $(
    () => (O ?? 0) - (H ?? 0),
    [O, H]
  ), P = $(() => f.width, [f]), ae = $(() => {
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
    () => C + P,
    [C, P]
  ), Ce = F(null), de = R(() => {
    Promise.resolve().then(() => {
      if ((O ?? 0) > (ge ?? 0)) {
        const X = (O ?? 0) - C;
        g.exec("expand-scale", { minWidth: X });
      }
    });
  }, [O, ge, C, g]);
  V(() => {
    let X;
    return Ce.current && (X = new ResizeObserver(de), X.observe(Ce.current)), () => {
      X && X.disconnect();
    };
  }, [Ce.current, de]), V(() => {
    de();
  }, [P]);
  const q = F(null), K = F(null), le = R(() => {
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
  V(() => {
    ee.current = {
      rTasks: m,
      rScales: f,
      rCellHeight: x,
      scrollSize: Se,
      ganttDiv: q.current,
      ganttHeight: M ?? 0
    };
  }, [m, f, x, Se, M]);
  const ie = R(
    (X) => {
      if (!X) return;
      const {
        rTasks: me,
        rScales: ye,
        rCellHeight: $e,
        scrollSize: j,
        ganttDiv: be,
        ganttHeight: De
      } = ee.current;
      if (!be) return;
      const { id: pe } = X, He = me.findIndex((ve) => ve.id === pe);
      if (He > -1) {
        const ve = De - ye.height, Pe = He * $e, Te = be.scrollTop;
        let Le = null;
        Pe < Te ? Le = Pe : Pe + $e > Te + ve && (Le = Pe - ve + $e + j), Le !== null && (g.exec("scroll-chart", { top: Math.max(Le, 0) }), q.current.scrollTop = Math.max(Le, 0));
      }
    },
    [g]
  );
  V(() => {
    ie(y);
  }, [y]), V(() => {
    const X = q.current, me = K.current;
    if (!X || !me) return;
    const ye = () => {
      Xo(() => {
        z(X.offsetHeight), D(X.offsetWidth), T(me.offsetWidth);
      });
    }, $e = new ResizeObserver(ye);
    return $e.observe(X), () => $e.disconnect();
  }, [q.current]);
  const Re = F(null), ke = F(null);
  return V(() => {
    ke.current && (ke.current.destroy(), ke.current = null);
    const X = Re.current;
    if (X)
      return ke.current = Er(X, {
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
      ref: K,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: M,
            width: H
          },
          children: /* @__PURE__ */ J("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Re, children: [
            w.length ? /* @__PURE__ */ J(Ae, { children: [
              /* @__PURE__ */ p(
                rd,
                {
                  display: G,
                  compactMode: N,
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
                pd,
                {
                  value: C,
                  display: G,
                  compactMode: N,
                  containerWidth: O,
                  onMove: (X) => E(X),
                  onDisplayChange: (X) => oe(X)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: Ce, children: /* @__PURE__ */ p(
              gd,
              {
                readonly: n,
                fullWidth: P,
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
function xd(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function yd(t, e) {
  return typeof t == "function" ? t : lt(t, e);
}
function Vo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: yd(n, e)
  }));
}
function vd(t, e) {
  const n = xd(e);
  for (let r in n)
    n[r] = lt(n[r], t);
  return n;
}
function kd(t, e) {
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
function bd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Vo(n.scales, e)
    }))
  } : t;
}
const Sd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), $d = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Cd = _t(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = _o,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: a = [],
  scales: l = $d,
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
  highlightTime: N = null,
  init: S = null,
  autoScale: C = !0,
  unscheduledTasks: E = !1,
  criticalPath: O = null,
  schedule: D = { type: "forward" },
  projectStart: M = null,
  projectEnd: z = null,
  calendar: H = null,
  undo: T = !1,
  splitTasks: G = !1,
  multiTaskRows: oe = !1,
  marqueeSelect: he = !1,
  copyPaste: Q = !1,
  currentWeekHighlight: ce = !1,
  currentWeekColor: Se = null,
  scrollToCurrentWeek: P = !1,
  allowTaskIntersection: ae = !0,
  ...we
}, ge) {
  const Ce = F();
  Ce.current = we;
  const de = $(() => new ul(Hs), []), q = $(() => ({ ...nn, ...In }), []), K = _e(Je.i18n), le = $(() => K ? K.extend(q, !0) : Nt(q), [K, q]), ee = $(() => le.getRaw().calendar, [le]), ie = $(() => {
    let ve = {
      zoom: bd(b, ee),
      scales: Vo(l, ee),
      columns: kd(c, ee),
      links: wo(a),
      cellWidth: m
    };
    return ve.zoom && (ve = {
      ...ve,
      ...Qa(
        ve.zoom,
        vd(ee, le.getGroup("gantt")),
        ve.scales,
        m
      )
    }), ve;
  }, [b, l, c, a, m, ee, le]), Re = F(null);
  Re.current !== s && (cr(s, { durationUnit: g, calendar: H }), Re.current = s), V(() => {
    cr(s, { durationUnit: g, calendar: H });
  }, [s, g, H, G]);
  const ke = $(() => {
    if (!oe) return null;
    const ve = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Map(), Te = (Le) => {
      Le.forEach((We) => {
        const Ue = We.row ?? We.id;
        Pe.set(We.id, Ue), ve.has(Ue) || ve.set(Ue, []), ve.get(Ue).push(We.id), We.data && We.data.length > 0 && Te(We.data);
      });
    };
    return Te(s), { rowMap: ve, taskRows: Pe };
  }, [s, oe]), X = $(() => de.in, [de]), me = F(null);
  me.current === null && (me.current = new Us((ve, Pe) => {
    const Te = "on" + Sd(ve);
    Ce.current && Ce.current[Te] && Ce.current[Te](Pe);
  }), X.setNext(me.current));
  const [ye, $e] = B(null), j = F(null);
  j.current = ye;
  const be = $(
    () => ({
      getState: de.getState.bind(de),
      getReactiveState: de.getReactive.bind(de),
      getStores: () => ({ data: de }),
      exec: X.exec,
      setNext: (ve) => (me.current = me.current.setNext(ve), me.current),
      intercept: X.intercept.bind(X),
      on: X.on.bind(X),
      detach: X.detach.bind(X),
      getTask: de.getTask.bind(de),
      serialize: de.serialize.bind(de),
      getTable: (ve) => ve ? new Promise((Pe) => setTimeout(() => Pe(j.current), 1)) : j.current,
      getHistory: () => de.getHistory()
    }),
    [de, X]
  );
  Tt(
    ge,
    () => ({
      ...be
    }),
    [be]
  );
  const De = F(0);
  V(() => {
    De.current ? de.init({
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
      criticalPath: O,
      schedule: D,
      projectStart: M,
      projectEnd: z,
      calendar: H,
      undo: T,
      _weekStart: ee.weekStart,
      splitTasks: G
    }) : S && S(be), De.current++;
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
    O,
    D,
    M,
    z,
    H,
    T,
    ee,
    G,
    de
  ]), De.current === 0 && de.init({
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
    criticalPath: O,
    schedule: D,
    projectStart: M,
    projectEnd: z,
    calendar: H,
    undo: T,
    _weekStart: ee.weekStart,
    splitTasks: G
  });
  const pe = $(() => {
    const ve = /* @__PURE__ */ new Date(), Pe = ee?.weekStart ?? 0, Te = new Date(Date.UTC(ve.getUTCFullYear(), ve.getUTCMonth(), ve.getUTCDate())), We = (Te.getUTCDay() - Pe + 7) % 7;
    Te.setUTCDate(Te.getUTCDate() - We), Te.setUTCHours(0, 0, 0, 0);
    const Ue = new Date(Te);
    return Ue.setUTCDate(Ue.getUTCDate() + 7), (L) => L >= Te && L < Ue;
  }, [ee]), He = $(() => (ve, Pe) => {
    let Te = [];
    if (H)
      Pe == "day" && !H.getDayHours(ve) && Te.push("wx-weekend"), Pe == "hour" && !H.getDayHours(ve) && Te.push("wx-weekend");
    else if (N) {
      const Le = N(ve, Pe);
      Le && Te.push(Le);
    }
    return ce && (Pe === "week" || Pe === "day") && pe(ve) && Te.push("wx-current-week"), Te.join(" ");
  }, [H, N, ce, pe]);
  return /* @__PURE__ */ p(Je.i18n.Provider, { value: le, children: /* @__PURE__ */ p(wt.Provider, { value: be, children: /* @__PURE__ */ p(
    wd,
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
      scrollToCurrentWeek: P,
      currentWeekColor: Se,
      allowTaskIntersection: ae
    }
  ) }) });
});
function _d({ api: t = null, items: e = [] }) {
  const n = _e(Je.i18n), r = $(() => n || Nt(In), [n]), s = $(() => r.getGroup("gantt"), [r]), o = at(t, "_selected"), i = at(t, "undo"), a = at(t, "history"), l = at(t, "splitTasks"), c = ["undo", "redo"], d = $(() => {
    const h = ur();
    return (e.length ? e : ur()).map((m) => {
      let f = { ...m, disabled: !1 };
      return f.handler = Dr(h, f.id) ? (x) => Ht(t, x.id, null, s) : f.handler, f.text && (f.text = s(f.text)), f.menuText && (f.menuText = s(f.menuText)), f;
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
  return n ? /* @__PURE__ */ p(hr, { items: u }) : /* @__PURE__ */ p(Je.i18n.Provider, { value: r, children: /* @__PURE__ */ p(hr, { items: u }) });
}
const Td = _t(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: a,
  css: l
}, c) {
  const d = F(null), u = F(null), h = _e(Je.i18n), g = $(() => h || Nt({ ...In, ...nn }), [h]), m = $(() => g.getGroup("gantt"), [g]), f = at(n, "taskTypes"), x = at(n, "selected"), w = at(n, "_selected"), y = at(n, "splitTasks"), b = $(() => dr(), []);
  V(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function k(H) {
    return H.map((T) => (T = { ...T }, T.text && (T.text = m(T.text)), T.subtext && (T.subtext = m(T.subtext)), T.data && (T.data = k(T.data)), T));
  }
  function N() {
    const H = e.length ? e : dr(), T = H.find((G) => G.id === "convert-task");
    return T && (T.data = [], (f || []).forEach((G) => {
      T.data.push(T.dataFactory(G));
    })), k(H);
  }
  const S = $(() => N(), [n, e, f, y, m]), C = $(
    () => w && w.length ? w : [],
    [w]
  ), E = R(
    (H, T) => {
      let G = H ? n?.getTask(H) : null;
      if (r) {
        const oe = r(H, T);
        G = oe === !0 ? G : oe;
      }
      if (G) {
        const oe = bt(T.target, "data-segment");
        oe !== null ? u.current = { id: G.id, segmentIndex: oe } : u.current = G.id, (!Array.isArray(x) || !x.includes(G.id)) && n && n.exec && n.exec("select-task", { id: G.id });
      }
      return G;
    },
    [n, r, x]
  ), O = R(
    (H) => {
      const T = H.action;
      T && (Dr(b, T.id) && Ht(n, T.id, u.current, m), a && a(H));
    },
    [n, m, a, b]
  ), D = R(
    (H, T) => {
      const G = C.length ? C : T ? [T] : [];
      let oe = s ? G.every((he) => s(H, he)) : !0;
      if (oe && (H.isHidden && (oe = !G.some(
        (he) => H.isHidden(he, n.getState(), u.current)
      )), H.isDisabled)) {
        const he = G.some(
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
  const M = R((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), z = /* @__PURE__ */ J(Ae, { children: [
    /* @__PURE__ */ p(
      Lo,
      {
        filter: D,
        options: S,
        dataKey: "id",
        resolver: E,
        onClick: O,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: M, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && Je.i18n?.Provider) {
    const H = Je.i18n.Provider;
    return /* @__PURE__ */ p(H, { value: g, children: z });
  }
  return z;
}), pr = {};
function Ts(t) {
  return typeof t < "u" ? pr[t] || t : pr.text;
}
function st(t, e) {
  pr[t] = e;
}
const Nd = {
  editor: {}
};
function Qn(t) {
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
  V(() => {
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
  const d = _e(Je.i18n), u = $(() => d.getGroup("editor"), [d]), h = $(
    () => e.config[0].comp === "readonly" && e.config.every((g) => !Object.keys(n).includes(g.key)),
    [e, n]
  );
  return /* @__PURE__ */ J("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    a,
    h ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((g) => {
      if (!g.hidden) {
        const { key: m, onChange: f, ...x } = g;
        if (g.comp === "readonly" || g.comp === "section") {
          const w = Ts(g.comp);
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
          const w = Ts(g.comp);
          return /* @__PURE__ */ J("div", { children: [
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
function Dd(t) {
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
function Md(t) {
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
function Ed(t) {
  const e = t.map((i) => {
    const a = { ...i };
    return i.config && Object.assign(a, i.config), a.key = i.key || Xi(), a.setter = i.setter || Md(i.key), a.getter = i.getter || Dd(i.key), a;
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
function Rd({
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
  const y = _e(Je.i18n).getGroup("editor"), [b, k] = ze(t), [N, S] = B(null), C = $(() => {
    const P = Ed(e);
    N && P.config.forEach((ge) => {
      ge.comp === "section" && ge.key === N && (ge.sectionMode === "accordion" ? ge.activeSection || (P.config.forEach((Ce) => {
        Ce.comp === "section" && Ce.key !== ge.key && (Ce.activeSection = !1);
      }), ge.activeSection = !0) : ge.activeSection = !ge.activeSection);
    });
    let ae = /* @__PURE__ */ new Set(), we = null;
    return P.config.forEach((ge) => {
      ge.sectionMode === "exclusive" && ge.activeSection && (we = ge.key), ge.activeSection && ae.add(ge.key);
    }), P.config.forEach((ge) => {
      ge.hidden = ge.hidden || r && r !== ge.batch || we && ge.key != we && ge.section !== we || ge.section && !ae.has(ge.section);
    }), i ? {
      ...P,
      config: P.config.map((ge) => ({ ...ge, comp: "readonly" })),
      diff: () => []
    } : P;
  }, [e, N, r, i]), [E, O] = B({}), [D, M] = B({}), z = b;
  V(() => {
    b !== void 0 && (O($n(b)), M($n(b)), z.errors && (z.errors = oe()));
  }, [b]);
  const [H, T] = B([]);
  V(() => {
    b && T([]);
  }, [b]);
  function G(P) {
    return [...new Set(P)];
  }
  function oe(P) {
    const ae = C.validateValues(E, P, y);
    return An(ae, z.errors) || x && x({ errors: ae, values: E }), ae;
  }
  function he(P, ae) {
    if (s && !z.errors) {
      const we = C.setValues(b, ae ?? D, P);
      k(we), m && m({ changes: P, values: we });
    } else
      T(P);
  }
  function Q({ value: P, key: ae, input: we }) {
    let ge = { ...D || {}, [ae]: P };
    const Ce = {
      key: ae,
      value: P,
      update: ge
    };
    if (we && (Ce.input = we), g && g(Ce), !b) return;
    ge = Ce.update, M(ge);
    const de = C.diff(b, ge), q = C.setValues(
      { ...E || {} },
      ge,
      G([...de, ae])
    );
    if (O(q), de.length) {
      const K = s ? [] : G([...de, ...Object.keys(z.errors ?? {}), ae]);
      z.errors = oe(K), he(de, ge);
    } else {
      const K = Object.keys(z.errors ?? {});
      K.length && (z.errors = oe(K)), T([]);
    }
  }
  function ce() {
    if (H.length && (s || (z.errors = oe()), !z.errors)) {
      m && m({
        changes: H,
        values: E
      });
      const P = C.setValues(b, D, H);
      k(P), T([]), k({ ...E });
    }
  }
  function Se({ item: P }) {
    P.id === "save" ? ce() : P.id === "toggle-section" && S(P.key), f && f({ item: P, values: E, changes: H });
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
      data: D,
      editors: C,
      focus: o,
      hotkeys: w,
      errors: z.errors,
      onClick: Se,
      onKeyDown: Se,
      onChange: Q,
      children: h
    }
  );
}
function Id(t) {
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
  return r === "columns" ? /* @__PURE__ */ J("div", { className: "wx-bNrSbszs wx-cols", children: [
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-left", children: /* @__PURE__ */ p(
      Qn,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: i,
        onChange: a
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ p(
      Qn,
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
    Qn,
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
function Ns({
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
  return t.length ? /* @__PURE__ */ p(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ p(
        hr,
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
const jt = () => ({ comp: "spacer" }), Zn = (t) => ({
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
function er(t) {
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
  } = t, w = _e(Je.i18n), y = $(() => w.getGroup("editor"), [w]), b = $(
    () => o === !0 && i === !0,
    [o, i]
  ), k = $(() => {
    let D = o && o.items ? o.items.map((M) => ({ ...M })) : [];
    return b && (d ? D = [jt(), Ds()] : (u ? D = [jt(), Ds()] : l !== "modal" && (D = [jt(), Zn(y), Jn(y)]), a === "columns" && !D.length && (D = [jt(), Jn(y), Zn(y)]))), D;
  }, [o, b, d, u, l, a, y]), N = $(() => {
    let D = i && i.items ? i.items.map((M) => ({ ...M })) : [];
    return b && (d || (l === "modal" && !u && (D = [jt(), Jn(y), Zn(y)]), a === "columns" && k.length && (D = []))), D;
  }, [i, b, d, l, u, a, k, y]), S = $(() => [...k, ...N], [k, N]), C = F(null), E = F(null);
  E.current = (D, ...M) => {
    const z = S.findIndex((G) => M.includes(G.id));
    if (z === -1) return !1;
    const H = D.target, T = S[z];
    D.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || D.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (D.preventDefault(), m && m({ item: T }));
  };
  const O = $(() => x === !1 ? {} : {
    "ctrl+s": (D) => E.current(D, "save"),
    escape: (D) => E.current(D, "cancel", "close"),
    "ctrl+d": (D) => E.current(D, "delete"),
    ...x || {}
  }, [x]);
  return fi(O, C), /* @__PURE__ */ J("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: C, children: [
    /* @__PURE__ */ p(
      Ns,
      {
        ...o && typeof o == "object" ? o : {},
        items: k,
        values: e,
        onClick: g,
        onChange: f
      }
    ),
    /* @__PURE__ */ J(
      "div",
      {
        className: `wx-85HDaNoA wx-content${a === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          h,
          /* @__PURE__ */ p(
            Id,
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
            Ns,
            {
              ...i && typeof i == "object" ? i : {},
              items: N,
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
function Ad(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ p(Gi, { children: /* @__PURE__ */ p(
    er,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ p(Bi, { onCancel: o, children: /* @__PURE__ */ p(
    er,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ p(
    er,
    {
      css: `wx-inline-form ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  );
}
function Hd(t) {
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
  return /* @__PURE__ */ p(Rn, { words: Nd, optional: !0, children: /* @__PURE__ */ p(
    Rd,
    {
      view: Ad,
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
function Ld({ value: t, options: e, label: n }) {
  const r = _e(Je.i18n).getGroup("editor"), s = $(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(Zt, { label: n, children: s }) : null;
}
function Pd({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ J(
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
st("textarea", yi);
st("checkbox", vi);
st("readonly", Ld);
st("section", Pd);
mr(Ze);
function Wd({ api: t, autoSave: e, onLinksChange: n }) {
  const s = _e(Je.i18n).getGroup("gantt"), o = se(t, "activeTask"), i = se(t, "_activeTask"), a = se(t, "_links"), l = se(t, "schedule"), c = se(t, "unscheduledTasks"), [d, u] = B();
  function h() {
    if (o) {
      const x = a.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), w = a.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: x },
        { title: s("Successors"), data: w }
      ];
    }
  }
  V(() => {
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
    (x, w) => x.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(Zt, { label: x.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: x.data.map((y) => /* @__PURE__ */ J("tr", { children: [
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
        bi,
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
function zd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, a = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setUTCHours(e.getUTCHours()), d.setUTCMinutes(e.getUTCMinutes()), a && a({ value: d });
  }
  return /* @__PURE__ */ J("div", { className: "wx-hFsbgDln date-time-controll", children: [
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
st("select", Ws);
st("date", zd);
st("twostate", zs);
st("slider", rr);
st("counter", zi);
st("links", Wd);
function Od({
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
  const u = _e(Je.i18n), h = $(() => u || Nt({ ...In, ...nn }), [u]), g = $(() => h.getGroup("gantt"), [h]), m = h.getRaw(), f = $(() => {
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
  }, [a, s, l, g]), [w, y] = B(!1), b = $(
    () => w ? "wx-full-screen" : "",
    [w]
  ), k = R((j) => {
    y(j);
  }, []);
  V(() => {
    const j = Yo(k);
    return j.observe(), () => {
      j.disconnect();
    };
  }, [k]);
  const N = se(t, "_activeTask"), S = se(t, "activeTask"), C = se(t, "unscheduledTasks"), E = se(t, "links"), O = se(t, "splitTasks"), D = $(
    () => O && S?.segmentIndex,
    [O, S]
  ), M = $(
    () => D || D === 0,
    [D]
  ), z = $(
    () => $o(),
    [C]
  ), H = se(t, "undo"), [T, G] = B({}), [oe, he] = B(null), [Q, ce] = B(), [Se, P] = B(null), ae = se(t, "taskTypes"), we = $(() => {
    if (!N) return null;
    let j;
    if (M && N.segments ? j = { ...N.segments[D] } : j = { ...N }, s) {
      let be = { parent: j.parent };
      return z.forEach(({ key: De, comp: pe }) => {
        if (pe !== "links") {
          const He = j[De];
          pe === "date" && He instanceof Date ? be[De] = f(He) : pe === "slider" && De === "progress" ? be[De] = `${He}%` : be[De] = He;
        }
      }), be;
    }
    return j || null;
  }, [N, M, D, s, z, f]);
  V(() => {
    ce(we);
  }, [we]), V(() => {
    G({}), P(null), he(null);
  }, [S]);
  function ge(j, be) {
    return j.map((De) => {
      const pe = { ...De };
      if (De.config && (pe.config = { ...pe.config }), pe.comp === "links" && t && (pe.api = t, pe.autoSave = l, pe.onLinksChange = q), pe.comp === "select" && pe.key === "type") {
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
    let j = e.length ? e : z;
    return j = ge(j, Q), Q ? j.filter(
      (be) => !be.isHidden || !be.isHidden(Q, t.getState())
    ) : j;
  }, [e, z, Q, ae, g, t, l]), de = $(
    () => Ce.map((j) => j.key),
    [Ce]
  );
  function q({ id: j, action: be, data: De }) {
    G((pe) => ({
      ...pe,
      [j]: { action: be, data: De }
    }));
  }
  const K = R(() => {
    for (let j in T)
      if (E.byId(j)) {
        const { action: be, data: De } = T[j];
        t.exec(be, De);
      }
  }, [t, T, E]), le = R(() => {
    const j = S?.id || S;
    if (M) {
      if (N?.segments) {
        const be = N.segments.filter(
          (De, pe) => pe !== D
        );
        t.exec("update-task", {
          id: j,
          task: { segments: be }
        });
      }
    } else
      t.exec("delete-task", { id: j });
  }, [t, S, M, N, D]), ee = R(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ie = R(
    (j) => {
      const { item: be, changes: De } = j;
      be.id === "delete" && le(), be.id === "save" && (De.length ? ee() : K()), be.comp && ee();
    },
    [t, S, l, K, le, ee]
  ), Re = R(
    (j, be, De) => (C && j.type === "summary" && (j.unscheduled = !1), ko(j, t.getState(), be), De || he(!1), j),
    [C, t]
  ), ke = R(
    (j) => {
      j = {
        ...j,
        unscheduled: C && j.unscheduled && j.type !== "summary"
      }, delete j.links, delete j.data, (de.indexOf("duration") === -1 || j.segments && !j.duration) && delete j.duration;
      const be = {
        id: S?.id || S,
        task: j,
        ...M && { segmentIndex: D }
      };
      l && oe && (be.inProgress = oe), t.exec("update-task", be), l || K();
    },
    [
      t,
      S,
      C,
      l,
      K,
      de,
      M,
      D,
      oe
    ]
  ), X = R(
    (j) => {
      let { update: be, key: De, input: pe } = j;
      if (pe && he(!0), j.update = Re({ ...be }, De, pe), !l) ce(j.update);
      else if (!Se && !pe) {
        const He = Ce.find((Te) => Te.key === De), ve = be[De];
        (!He.validation || He.validation(ve)) && (!He.required || ve) && ke(j.update);
      }
    },
    [l, Re, Se, Ce, ke]
  ), me = R(
    (j) => {
      l || ke(j.values);
    },
    [l, ke]
  ), ye = R((j) => {
    P(j.errors);
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
  return we ? /* @__PURE__ */ p(Rn, { children: /* @__PURE__ */ p(
    Hd,
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
const Fd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = B(null);
  return V(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(td, { api: r, columns: e, children: t });
};
function Ud(t) {
  const { api: e, content: n, children: r } = t, s = F(null), o = F(null), [i, a] = B({}), [l, c] = B(null), [d, u] = B({});
  function h(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const N = k.getAttribute("data-tooltip-id"), S = k.getAttribute("data-tooltip-at"), C = k.getAttribute("data-tooltip");
        if (N || C) return { id: N, tooltip: C, target: k, at: S };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  V(() => {
    const k = o.current;
    if (k && d && (d.text || n)) {
      const N = k.getBoundingClientRect();
      let S = !1, C = d.left, E = d.top;
      N.right >= i.right && (C = i.width - N.width - 5, S = !0), N.bottom >= i.bottom && (E = d.top - (N.bottom - i.bottom + 2), S = !0), S && u((O) => O && { ...O, left: C, top: E });
    }
  }, [d, i, n]);
  const g = F(null), m = 300, f = (k) => {
    clearTimeout(g.current), g.current = setTimeout(() => {
      k();
    }, m);
  };
  function x(k) {
    let { id: N, tooltip: S, target: C, at: E } = h(k.target);
    if (u(null), c(null), !S)
      if (N)
        S = y(N);
      else {
        clearTimeout(g.current);
        return;
      }
    const O = k.clientX;
    f(() => {
      N && c(w(b(N)));
      const D = C.getBoundingClientRect(), M = s.current, z = M ? M.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, T;
      E === "left" ? (H = D.top + 5 - z.top, T = D.right + 5 - z.left) : (H = D.top + D.height - z.top, T = O - z.left), a(z), u({ top: H, left: T, text: S });
    });
  }
  function w(k) {
    return e?.getTask(b(k)) || null;
  }
  function y(k) {
    return w(k)?.text || "";
  }
  function b(k) {
    const N = parseInt(k);
    return isNaN(N) ? k : N;
  }
  return /* @__PURE__ */ J(
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
function Yd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Xr, { fonts: t, children: e() }) : /* @__PURE__ */ p(Xr, { fonts: t });
}
function Vd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Qr, { fonts: t, children: e }) : /* @__PURE__ */ p(Qr, { fonts: t });
}
function Gd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Zr, { fonts: t, children: e }) : /* @__PURE__ */ p(Zr, { fonts: t });
}
const su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: Td,
  Editor: Od,
  Gantt: Cd,
  HeaderMenu: Fd,
  Material: Yd,
  Toolbar: _d,
  Tooltip: Ud,
  Willow: Vd,
  WillowDark: Gd,
  defaultColumns: yo,
  defaultEditorItems: Co,
  defaultMenuOptions: bo,
  defaultTaskTypes: _o,
  defaultToolbarButtons: So,
  getEditorItems: $o,
  getMenuOptions: dr,
  getToolbarButtons: ur,
  registerEditorItem: st,
  registerScaleUnit: Ka
}, Symbol.toStringTag, { value: "Module" }));
export {
  su as default
};
