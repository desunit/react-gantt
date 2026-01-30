import { jsx as p, jsxs as Z, Fragment as Ie } from "react/jsx-runtime";
import Bo, { useState as K, useEffect as F, useRef as z, createContext as Pt, useContext as $e, useMemo as N, useCallback as R, forwardRef as Ct, useImperativeHandle as Nt, useId as Ko, Fragment as Ds } from "react";
import { createPortal as jo, flushSync as Uo } from "react-dom";
function Be(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function Jn(t, e = "data-id") {
  const n = Be(t, e);
  return n ? n.getAttribute(e) : null;
}
function bt(t, e = "data-id") {
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
function qo() {
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
var Xe = qo();
function gr(t) {
  Object.assign(Xe, t);
}
function Hr(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const a = Wt(o.dataset.id);
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
  Xe.addEvent(t, n, r);
}
function Ts(t, e) {
  Hr(t, e, "click"), e.dblclick && Hr(t, e.dblclick, "dblclick");
}
function Xo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Ms = /* @__PURE__ */ new Date(), kn = !1, un = [], St = [], Lr = (t) => {
  if (kn) {
    kn = !1;
    return;
  }
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = St[e];
    if (!(r > Ms) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Qo = (t) => {
  Ms = /* @__PURE__ */ new Date(), kn = !0;
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n } = St[e];
    if (!n.contains(t.target) && n !== t.target) {
      kn = !1;
      break;
    }
  }
};
function Jt(t, e) {
  un.length || (un = [
    Xe.addGlobalEvent("click", Lr, t),
    Xe.addGlobalEvent("contextmenu", Lr, t),
    Xe.addGlobalEvent("mousedown", Qo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return St.push(n), {
    destroy() {
      Xo(St, n), St.length || (un.forEach((r) => r()), un = []);
    }
  };
}
var fn = (t) => t.indexOf("bottom") !== -1, hn = (t) => t.indexOf("left") !== -1, gn = (t) => t.indexOf("right") !== -1, zn = (t) => t.indexOf("top") !== -1, Pr = (t) => t.indexOf("fit") !== -1, pn = (t) => t.indexOf("overlap") !== -1, Zo = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Jo = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function ei(t, e) {
  let n = 0;
  const r = Xe.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ve, Ue, Bt, Ge;
function ti(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ve = r, Ue = s, Bt = "auto";
  let o = 0, a = 0;
  const i = ni(t), l = pn(n) ? Xe.getTopNode(t) : i;
  if (!i) return null;
  const c = i.getBoundingClientRect(), d = t.getBoundingClientRect(), u = l.getBoundingClientRect(), f = window.getComputedStyle(l), g = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };
  for (const b in g) {
    const k = `border-${b}-width`;
    g[b] = parseFloat(f.getPropertyValue(k));
  }
  if (e) {
    const b = ei(e, i);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (Ge = e.getBoundingClientRect(), Pr(n) && (Bt = Ge.width + "px"), n !== "point")
      if (Zo(n))
        Pr(n) ? Ve = 0 : (Ve = u.width / 2, a = 1), Ue = (u.height - d.height) / 2;
      else {
        const b = pn(n) ? 0 : 1;
        Ve = gn(n) ? Ge.right + b : Ge.left - b, Ue = fn(n) ? Ge.bottom + 1 : Ge.top;
        const k = Jo(n);
        k && (gn(n) || hn(n) ? k === "center" ? Ue -= (d.height - Ge.height) / 2 : k === "end" && (Ue -= d.height - Ge.height) : (fn(n) || zn(n)) && (k === "center" ? Ve -= (d.width - Ge.width) / 2 : k === "end" && (Ve -= d.width - Ge.width), pn(n) || (Ve += 1)));
      }
  } else Ge = { left: r, right: r, top: s, bottom: s };
  const m = (hn(n) || gn(n)) && (fn(n) || zn(n));
  hn(n) && (a = 2);
  const h = Ve - d.width - u.left;
  e && hn(n) && !m && h < 0 && (Ve = Ge.right, a = 0);
  const w = Ve + d.width * (1 - a / 2) - u.right;
  if (w > 0)
    if (!gn(n))
      Ve = u.right - g.right - d.width;
    else {
      const b = Ge.left - u.x - d.width;
      e && !pn(n) && !m && b >= 0 ? Ve = Ge.left - d.width : Ve -= w + g.right;
    }
  a && (Ve = Math.round(Ve - d.width * a / 2));
  const x = h < 0 || w > 0 || !m;
  zn(n) && (Ue = Ge.top - d.height, e && Ue < u.y && x && (Ue = Ge.bottom));
  const y = Ue + d.height - u.bottom;
  return y > 0 && (e && fn(n) && x ? Ue -= d.height + Ge.height + 1 : Ue -= y + g.bottom), Ve -= c.left + g.left, Ue -= c.top + g.top, Ve = Math.max(Ve, 0) + l.scrollLeft, Ue = Math.max(Ue, 0) + l.scrollTop, Bt = Bt || "auto", { x: Ve, y: Ue, z: o, width: Bt };
}
function ni(t) {
  const e = Xe.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Wr = (/* @__PURE__ */ new Date()).valueOf();
function pr() {
  return Wr += 1, Wr;
}
var ri = class {
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
}, At = [], zr = {
  subscribe: (t) => {
    si();
    const e = new ri();
    return At.push(e), t(e), () => {
      const n = At.findIndex((r) => r === e);
      n >= 0 && At.splice(n, 1);
    };
  }
}, Or = !1;
function si() {
  Or || (Or = !0, document.addEventListener("keydown", (t) => {
    if (At.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = At.length - 1; s >= 0; s--) {
        const o = At[s], a = o.store.get(r) || o.store.get(n);
        a && o.node.contains(t.target) && a(t, { key: r, evKey: n });
      }
    }
  }));
}
function qe(t) {
  return t < 10 ? "0" + t : t.toString();
}
function oi(t) {
  const e = qe(t);
  return e.length == 2 ? "0" + e : e;
}
function Es(t) {
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
var Yr = ["", ""];
function ii(t, e, n) {
  switch (t) {
    case "%d":
      return qe(e.getDate());
    case "%m":
      return qe(e.getMonth() + 1);
    case "%j":
      return e.getDate();
    case "%n":
      return e.getMonth() + 1;
    case "%y":
      return qe(e.getFullYear() % 100);
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
      return qe((e.getHours() + 11) % 12 + 1);
    case "%g":
      return (e.getHours() + 11) % 12 + 1;
    case "%G":
      return e.getHours();
    case "%H":
      return qe(e.getHours());
    case "%i":
      return qe(e.getMinutes());
    case "%a":
      return ((e.getHours() > 11 ? n.pm : n.am) || Yr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Yr)[1];
    case "%s":
      return qe(e.getSeconds());
    case "%S":
      return oi(e.getMilliseconds());
    case "%W":
      return qe(Fr(e));
    case "%w":
      return qe(Fr(e, n.weekStart ?? 1));
    case "%c": {
      let r = e.getFullYear() + "";
      return r += "-" + qe(e.getMonth() + 1), r += "-" + qe(e.getDate()), r += "T", r += qe(e.getHours()), r += ":" + qe(e.getMinutes()), r += ":" + qe(e.getSeconds()), r;
    }
    case "%Q":
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return t;
  }
}
var ai = /%[a-zA-Z]/g;
function dt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      ai,
      (r) => ii(r, n, e)
    )) : "";
  };
}
function Vr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function er(t, e) {
  for (const n in e) {
    const r = e[n];
    Vr(t[n]) && Vr(r) ? t[n] = er(
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
      return n ? r = er({ ...e }, t) : r = er({ ...t }, e), Dt(r);
    }
  };
}
function Oe(t) {
  const [e, n] = K(t), r = z(t);
  return F(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function li(t, e, n) {
  const [r, s] = K(() => e);
  return t || console.warn(`Writable ${n} is not defined`), F(() => t ? t.subscribe((a) => {
    s(() => a);
  }) : void 0, [t]), r;
}
function re(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return li(r[e], n[e], e);
}
function ct(t, e) {
  const [n, r] = K(() => null);
  return F(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((i) => r(() => i)) : void 0;
  }, [t, e]), n;
}
function ci(t, e) {
  const n = z(e);
  n.current = e;
  const [r, s] = K(1);
  return F(() => t.subscribe((a) => {
    n.current = a, s((i) => i + 1);
  }), [t]), [n.current, r];
}
function Ut(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ci(r[e], n[e]);
}
function di(t, e) {
  F(() => {
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
function Rs(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (a, i) => i.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Is(t) {
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
function Gr(t, e, n) {
  function r(s) {
    const o = Be(s);
    if (!o) return;
    const a = Wt(o.dataset.id);
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
  return Xe.addEvent(t, n, r);
}
function ui(t, e) {
  const n = [Gr(t, e, "click")];
  return e.dblclick && n.push(Gr(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const fi = "en-US", hi = {
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
}, gi = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, pi = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, en = {
  core: gi,
  calendar: hi,
  formats: pi,
  lang: fi
}, tn = Pt("willow"), mi = Pt({}), tt = Pt(null), wr = Pt(null), Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: wr,
  helpers: mi,
  i18n: tt,
  theme: tn
}, Symbol.toStringTag, { value: "Module" }));
function zt(t) {
  const e = $e(wr);
  return t || e;
}
function wi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: a = !1,
  onChange: i
}) {
  const l = zt(e), [c, d] = Oe(t), u = R(
    (m) => {
      const h = m.target.value;
      d(h), i && i({ value: h, input: !0 });
    },
    [i]
  ), f = R(
    (m) => {
      const h = m.target.value;
      d(h), i && i({ value: h });
    },
    [i]
  ), g = z(null);
  return F(() => {
    const m = f, h = g.current;
    return h.addEventListener("change", m), () => {
      h && h.removeEventListener("change", m);
    };
  }, [f]), /* @__PURE__ */ p(
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
  children: a,
  onClick: i
}) {
  const l = N(() => {
    let d = t ? t.split(" ").filter((u) => u !== "").map((u) => "wx-" + u).join(" ") : "";
    return e + (e ? " " : "") + d;
  }, [t, e]), c = (d) => {
    i && i(d);
  };
  return /* @__PURE__ */ Z(
    "button",
    {
      title: s,
      className: `wx-2ZWgb4 wx-button ${l} ${n && !a ? "wx-icon" : ""}`,
      disabled: r,
      onClick: c,
      children: [
        n && /* @__PURE__ */ p("i", { className: "wx-2ZWgb4 " + n }),
        a || o || " "
      ]
    }
  );
}
function xi({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const a = Ko(), i = zt(t) || a, [l, c] = Oe(r);
  return /* @__PURE__ */ Z("div", { className: "wx-2IvefP wx-checkbox", children: [
    /* @__PURE__ */ p(
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
    /* @__PURE__ */ Z("label", { htmlFor: i, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Ot({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const a = z(null), [i, l] = Oe(t), [c, d] = Oe(e);
  return F(() => {
    if (n) {
      const u = a.current;
      if (u) {
        const f = u.getBoundingClientRect(), g = Xe.getTopNode(u).getBoundingClientRect();
        f.right >= g.right && d("end"), f.bottom >= g.bottom && l("top");
      }
    }
  }, [n]), F(() => {
    if (a.current) {
      const u = (f) => {
        r && r(f);
      };
      return Jt(a.current, u).destroy;
    }
  }, [r]), /* @__PURE__ */ p(
    "div",
    {
      ref: a,
      className: `wx-32GZ52 wx-dropdown wx-${i}-${c}`,
      style: { width: s },
      children: o
    }
  );
}
function nn() {
  return Dt(en);
}
function yi() {
  let t = null, e = !1, n, r, s, o;
  const a = (d, u, f, g) => {
    n = d, r = u, s = f, o = g;
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
    const u = bt(d), f = r.findIndex((g) => g.id == u);
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
function Tn({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = z(), o = z(yi()), [a, i] = K(null), l = z(a), c = ($e(tt) || nn()).getGroup("core"), d = (f) => {
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
  const u = R(() => {
    o.current.navigate(null);
  }, [o]);
  return a === null ? null : /* @__PURE__ */ p(Ot, { onCancel: u, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-233fr7 wx-list",
      ref: s,
      onClick: d,
      onMouseMove: o.current.move,
      children: t.length ? t.map((f, g) => /* @__PURE__ */ p(
        "div",
        {
          className: `wx-233fr7 wx-item ${g === a ? "wx-focus" : ""}`,
          "data-id": f.id,
          children: e ? mr(e, { option: f }) : f.label
        },
        f.id
      )) : /* @__PURE__ */ p("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function vi({
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
  const f = zt(e), g = z(null), m = z(null), [h, w] = Oe(t), [x, y] = K(!1), [b, k] = K(""), M = z(null), $ = z(!1), D = N(() => {
    if (x) return b;
    if (h || h === 0) {
      const Q = (r || n).find((fe) => fe.id === h);
      if (Q) return Q[s];
    }
    return "";
  }, [x, b, h, r, n, s]), T = N(() => !D || !x ? n : n.filter(
    (Q) => Q[s].toLowerCase().includes(D.toLowerCase())
  ), [D, x, n, s]), V = R(
    () => T.findIndex((Q) => Q.id === h),
    [T, h]
  ), _ = R((Q) => {
    g.current = Q.navigate, m.current = Q.keydown;
  }, []), A = R(
    (Q, fe) => {
      if (Q || Q === 0) {
        let ye = n.find((L) => L.id === Q);
        if (y(!1), fe && g.current(null), ye && h !== ye.id) {
          const L = ye.id;
          w(L), u && u({ value: L });
        }
      }
      !$.current && fe && M.current.focus();
    },
    [n, h, u]
  ), P = R(
    ({ id: Q }) => {
      A(Q, !0);
    },
    [A]
  ), E = R(
    (Q) => {
      Q && Q.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), I = R(
    (Q) => {
      if (!n.length) return;
      if (Q === "" && c) {
        E();
        return;
      }
      let fe = n.find((L) => L[s] === Q);
      fe || (fe = n.find(
        (L) => L[s].toLowerCase().includes(Q.toLowerCase())
      ));
      const ye = fe ? fe.id : h || n[0].id;
      A(ye, !1);
    },
    [n, s, c, h, A, E]
  ), Y = R(() => {
    k(M.current.value), y(!0), T.length ? g.current(0) : g.current(null);
  }, [T.length, g]), ie = R(() => {
    $.current = !0;
  }, []), he = R(() => {
    $.current = !1, setTimeout(() => {
      $.current || I(D);
    }, 200);
  }, [I, D]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => g.current(V()),
      onKeyDown: (Q) => m.current(Q, V()),
      title: a,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: f,
            ref: M,
            value: D,
            disabled: i,
            placeholder: o,
            onFocus: ie,
            onBlur: he,
            onInput: Y
          }
        ),
        c && !i && h ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: E }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !i && /* @__PURE__ */ p(Tn, { items: T, onReady: _, onSelect: P, children: ({ option: Q }) => /* @__PURE__ */ p(Ie, { children: d ? d({ option: Q }) : Q[s] }) })
      ]
    }
  );
}
function rn({
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
  clear: g = !1,
  onChange: m
}) {
  const h = zt(e), [w, x] = Oe(t), y = z(null), b = N(
    () => f && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [f, u]
  ), k = N(
    () => f && u.indexOf("wx-icon-left") !== -1,
    [f, u]
  );
  F(() => {
    const V = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(V);
  }, [r, s]);
  const M = R(
    (V) => {
      const _ = V.target.value;
      x(_), m && m({ value: _, input: !0 });
    },
    [m]
  ), $ = R(
    (V) => m && m({ value: V.target.value }),
    [m]
  );
  function D(V) {
    V.stopPropagation(), x(""), m && m({ value: "" });
  }
  let T = o;
  return o !== "password" && o !== "number" && (T = "text"), F(() => {
    const V = $, _ = y.current;
    return _.addEventListener("change", V), () => {
      _ && _.removeEventListener("change", V);
    };
  }, [$]), /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-hQ64J4 wx-text ${b} ${l ? "wx-error" : ""} ${i ? "wx-disabled" : ""} ${g ? "wx-clear" : ""}`,
      children: [
        /* @__PURE__ */ p(
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
            onInput: M
          }
        ),
        g && !i && w ? /* @__PURE__ */ Z(Ie, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: D }),
          k && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${f}` })
        ] }) : f ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${f}` }) : null
      ]
    }
  );
}
function ki({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = $e(tt).getRaw(), a = t.getFullYear(), i = N(() => {
    switch (e) {
      case "month":
        return dt(o.monthYearFormat, s)(t);
      case "year":
        return dt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Es(a), u = dt(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, a, s, o]);
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
    /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-label", onClick: l, children: i }),
    n !== "left" ? /* @__PURE__ */ p(
      "i",
      {
        className: "wx-8HQVQV wx-pager wxi-angle-right",
        onClick: () => r && r({ diff: 1, type: e })
      }
    ) : /* @__PURE__ */ p("span", { className: "wx-8HQVQV wx-spacer" })
  ] });
}
function xr({ onClick: t, children: e }) {
  return /* @__PURE__ */ p("button", { className: "wx-3s8W4d wx-button", onClick: t, children: e });
}
function bi({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const a = ($e(tt) || nn()).getRaw().calendar, i = (a.weekStart || 7) % 7, l = a.dayShort.slice(i).concat(a.dayShort.slice(0, i)), c = (k, M, $) => new Date(
    k.getFullYear(),
    k.getMonth() + (M || 0),
    k.getDate() + ($ || 0)
  );
  let d = n !== "normal";
  function u(k) {
    const M = k.getDay();
    return M === 0 || M === 6;
  }
  function f() {
    const k = c(e, 0, 1 - e.getDate());
    return k.setDate(k.getDate() - (k.getDay() - (i - 7)) % 7), k;
  }
  function g() {
    const k = c(e, 1, -e.getDate());
    return k.setDate(k.getDate() + (6 - k.getDay() + i) % 7), k;
  }
  const m = z(0);
  function h(k, M) {
    M.timeStamp !== m.current && (m.current = M.timeStamp, M.stopPropagation(), o && o(new Date(new Date(k))), s && s());
  }
  const w = N(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = N(() => {
    const k = f(), M = g(), $ = e.getMonth();
    let D = [];
    for (let T = k; T <= M; T.setDate(T.getDate() + 1)) {
      const V = {
        day: T.getDate(),
        in: T.getMonth() === $,
        date: T.valueOf()
      };
      let _ = "";
      if (_ += V.in ? "" : " wx-inactive", _ += w.indexOf(V.date) > -1 ? " wx-selected" : "", d) {
        const A = V.date == w[0], P = V.date == w[1];
        A && !P ? _ += " wx-left" : P && !A && (_ += " wx-right"), V.date > w[0] && V.date < w[1] && (_ += " wx-inrange");
      }
      if (_ += u(T) ? " wx-weekend" : "", r) {
        const A = r(T);
        A && (_ += " " + A);
      }
      D.push({ ...V, css: _ });
    }
    return D;
  }, [e, w, d, r]), y = z(null);
  let b = z({});
  return b.current.click = h, F(() => {
    Ts(y.current, b.current);
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
function Si({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [a, i] = Oe(t || /* @__PURE__ */ new Date()), [l, c] = Oe(e || /* @__PURE__ */ new Date()), d = $e(tt).getRaw().calendar, u = d.monthShort || [], f = N(() => l.getMonth(), [l]), g = R(
    (w, x) => {
      if (w != null) {
        x.stopPropagation();
        const y = new Date(l);
        y.setMonth(w), c(y), o && o({ current: y });
      }
      n === "normal" && i(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = R(() => {
    const w = new Date(As(a, n) || l);
    w.setMonth(l.getMonth()), w.setFullYear(l.getFullYear()), s && s(w);
  }, [a, l, n, s]), h = R(
    (w) => {
      const x = w.target.closest("[data-id]");
      if (x) {
        const y = parseInt(x.getAttribute("data-id"), 10);
        g(y, w);
      }
    },
    [g]
  );
  return /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-months", onClick: h, children: u.map((w, x) => /* @__PURE__ */ p(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (f === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ p(xr, { onClick: m, children: d.done }) })
  ] });
}
const On = "wx-1XEF33", $i = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const a = $e(tt).getRaw().calendar, [i, l] = Oe(e), [c, d] = Oe(t), u = N(() => i.getFullYear(), [i]), f = N(() => {
    const { start: x, end: y } = Es(u), b = [];
    for (let k = x; k <= y; ++k)
      b.push(k);
    return b;
  }, [u]), g = {
    click: m
  };
  function m(x, y) {
    if (x) {
      y.stopPropagation();
      const b = new Date(i);
      b.setFullYear(x), l(b), s && s({ current: b });
    }
    o === "normal" && d(new Date(i)), n && n();
  }
  function h() {
    const x = new Date(As(c, o) || i);
    x.setFullYear(i.getFullYear()), r && r(x);
  }
  const w = z(null);
  return F(() => {
    w.current && Ts(w.current, g);
  }, []), /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p("div", { className: On + " wx-years", ref: w, children: f.map((x, y) => /* @__PURE__ */ p(
      "div",
      {
        className: On + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ p("div", { className: On + " wx-buttons", children: /* @__PURE__ */ p(xr, { onClick: h, children: a.done }) })
  ] });
}, Br = {
  month: {
    component: bi,
    next: Ci,
    prev: _i
  },
  year: {
    component: Si,
    next: Di,
    prev: Ni
  },
  duodecade: {
    component: $i,
    next: Mi,
    prev: Ti
  }
};
function _i(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Ci(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function Ni(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Di(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Ti(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function Mi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function As(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Ei = ["clear", "today"];
function Ri(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Ii({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: a,
  onChange: i
}) {
  const l = $e(tt).getGroup("calendar"), [c, d] = K("month"), u = Array.isArray(o) ? o : o ? Ei : [], f = (x, y) => {
    x.preventDefault(), i && i({ value: y });
  }, g = () => {
    c === "duodecade" ? d("year") : c === "year" && d("month");
  }, m = (x) => {
    const { diff: y, current: b } = x;
    if (y === 0) {
      c === "month" ? d("year") : c === "year" && d("duodecade");
      return;
    }
    if (y) {
      const k = Br[c];
      n(y > 0 ? k.next(e) : k.prev(e));
    } else b && n(b);
    a && a();
  }, h = (x) => {
    d("month"), i && i({ select: !0, value: x });
  }, w = N(() => Br[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ Z("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p(ki, { date: e, part: r, type: c, onShift: m }),
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
              onChange: h,
              onShift: m
            }
          ),
          c === "month" && u.length > 0 && /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-buttons", children: u.map((x) => /* @__PURE__ */ p("div", { className: "wx-2Gr4AS wx-button-item", children: /* @__PURE__ */ p(
            xr,
            {
              onClick: (y) => f(y, Ri(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function Mn(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = $e(tt);
  const o = N(() => {
    let a = s;
    return (!a || !a.extend) && (a = Dt(en)), e !== null && (a = a.extend(e, n)), a;
  }, [e, n, s]);
  return /* @__PURE__ */ p(tt.Provider, { value: o, children: r });
}
function Kr(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const Ai = ["clear", "today"];
function Hs({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Ai,
  onChange: s
}) {
  const [o, a] = Oe(t), [i, l] = Oe(e);
  F(() => {
    Kr(i, o, l, !1);
  }, [o, i]);
  const c = R(
    (u) => {
      const f = u.value;
      f ? (a(new Date(f)), Kr(i, new Date(f), l, !0)) : a(null), s && s({ value: f ? new Date(f) : null });
    },
    [s, i]
  ), d = R(
    (u) => {
      l(u);
    },
    [l]
  );
  return i ? /* @__PURE__ */ p(Mn, { children: /* @__PURE__ */ p(
    Ii,
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
const Hi = ["clear", "today"];
function Li({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: a = "",
  format: i = "",
  buttons: l = Hi,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: f = !1,
  onChange: g
}) {
  const { calendar: m, formats: h } = ($e(tt) || nn()).getRaw(), w = i || h?.dateFormat;
  let x = typeof w == "function" ? w : dt(w, m);
  const [y, b] = K(t), [k, M] = K(!1);
  F(() => {
    b(t);
  }, [t]);
  function $() {
    M(!1);
  }
  function D(_) {
    const A = _ === y || _ && y && _.valueOf() === y.valueOf() || !_ && !y;
    b(_), A || g && g({ value: _ }), setTimeout($, 1);
  }
  const T = N(
    () => y ? x(y) : "",
    [y, x]
  );
  function V({ value: _, input: A }) {
    if (!u && !f || A) return;
    let P = typeof u == "function" ? u(_) : _ ? new Date(_) : null;
    P = isNaN(P) ? y || null : P || null, D(P);
  }
  return F(() => {
    const _ = $;
    return window.addEventListener("scroll", _), () => window.removeEventListener("scroll", _);
  }, []), /* @__PURE__ */ Z("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => M(!0), children: [
    /* @__PURE__ */ p(
      rn,
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
    k && !n && /* @__PURE__ */ p(
      Ot,
      {
        onCancel: $,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ p(
          Hs,
          {
            buttons: l,
            value: y,
            onChange: (_) => D(_.value)
          }
        )
      }
    )
  ] });
}
function Ls({
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
  let [g, m] = Oe(t);
  function h(k) {
    u.current = k.navigate, f.current = k.keydown;
  }
  const w = N(() => g || g === 0 ? (n || e).find((k) => k.id === g) : null, [g, n, e]), x = R(
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
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-2YgblL wx-richselect ${o ? "wx-2YgblL wx-error" : ""} ${s ? "wx-2YgblL wx-disabled" : ""} ${c ? "" : "wx-2YgblL wx-nowrap"}`,
      title: a,
      onClick: () => u.current(b()),
      onKeyDown: (k) => f.current(k, b()),
      tabIndex: 0,
      children: [
        /* @__PURE__ */ p("div", { className: "wx-2YgblL wx-label", children: w ? c ? c(w) : w[i] : r ? /* @__PURE__ */ p("span", { className: "wx-2YgblL wx-placeholder", children: r }) : " " }),
        l && !s && g ? /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-close", onClick: y }) : /* @__PURE__ */ p("i", { className: "wx-2YgblL wx-icon wxi-angle-down" }),
        !s && /* @__PURE__ */ p(Tn, { items: e, onReady: h, onSelect: x, children: ({ option: k }) => c ? c(k) : k[i] })
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
  const d = zt(t), [u, f] = Oe(o), g = z({ value: u, input: u }), m = N(
    () => (u - r) / (s - r) * 100 + "%",
    [u, r, s]
  ), h = N(() => l ? "" : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`, [l, m]);
  function w({ target: b }) {
    const k = b.value * 1;
    f(k), c && c({
      value: k,
      previous: g.current.input,
      input: !0
    }), g.current.input = k;
  }
  function x({ target: b }) {
    const k = b.value * 1;
    f(k), c && c({ value: k, previous: g.current.value }), g.current.value = k;
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
  }, [y, x]), /* @__PURE__ */ Z("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: i, children: [
    e && /* @__PURE__ */ p("label", { className: "wx-2EDJ8G wx-label", htmlFor: d, children: e }),
    /* @__PURE__ */ p("div", { className: "wx-2EDJ8G wx-inner", children: /* @__PURE__ */ p(
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
const Pi = ({
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
  const c = zt(t), [d, u] = Oe(e), f = R(() => {
    if (i || d <= r) return;
    const w = d - n;
    u(w), l && l({ value: w });
  }, [d, i, r, n, l]), g = R(() => {
    if (i || d >= s) return;
    const w = d + n;
    u(w), l && l({ value: w });
  }, [d, i, s, n, l]), m = R(() => {
    if (!i) {
      const w = Math.round(Math.min(s, Math.max(d, r)) / n) * n, x = isNaN(w) ? Math.max(r, 0) : w;
      u(x), l && l({ value: x });
    }
  }, [i, d, s, r, n, l]), h = R(
    (w) => {
      const x = w.target.value * 1;
      u(x), l && l({ value: x, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-22t21n wx-counter ${a ? "wx-disabled" : ""} ${i ? "wx-readonly" : ""} ${o ? "wx-error" : ""}`,
      children: [
        /* @__PURE__ */ p(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-dec",
            disabled: a,
            onClick: f,
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
            disabled: a,
            readOnly: i,
            required: !0,
            value: d,
            onBlur: m,
            onInput: h
          }
        ),
        /* @__PURE__ */ p(
          "button",
          {
            "aria-label": "-",
            className: "wx-22t21n wx-btn wx-btn-inc",
            disabled: a,
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
function Wi({ notice: t = {} }) {
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
function zi({ data: t = [] }) {
  return /* @__PURE__ */ p("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ p(Wi, { notice: e }, e.id)) });
}
function Oi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: a
}) {
  const i = ($e(tt) || nn()).getGroup("core"), l = z(null);
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
    const g = { event: u, button: f };
    f === "cancel" ? a && a(g) : o && o(g);
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
            onClick: (f) => d(f, u),
            children: i(u)
          }
        ) }, u)) })
      ] })
    }
  );
}
function Fi({ children: t }, e) {
  const [n, r] = K(null), [s, o] = K([]);
  return Nt(
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
  ), /* @__PURE__ */ Z(Ie, { children: [
    t,
    n && /* @__PURE__ */ p(
      Oi,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ p(zi, { data: s })
  ] });
}
Ct(Fi);
function Xt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: a
}) {
  const i = N(() => pr(), []);
  return /* @__PURE__ */ p(wr.Provider, { value: i, children: /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-2oVUvC wx-field wx-${e} ${n} ${r ? "wx-error" : ""} ${o ? "wx-required" : ""}`.trim(),
      children: [
        t && /* @__PURE__ */ p("label", { className: "wx-2oVUvC wx-label", htmlFor: i, children: t }),
        /* @__PURE__ */ p("div", { className: `wx-2oVUvC wx-field-control wx-${s}`, children: mr(a, { id: i }) })
      ]
    }
  ) });
}
const Ps = ({
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
  const [g, m] = Oe(t), h = N(() => (g ? "pressed" : "") + (e ? " " + e : ""), [g, e]), w = R(
    (x) => {
      let y = !g;
      o && o(x), x.defaultPrevented || (m(y), f && f({ value: y }));
    },
    [g, o, f]
  );
  return g && u ? /* @__PURE__ */ p(
    ut,
    {
      title: a,
      text: g && c || l,
      css: i,
      type: h,
      icon: g && s || n,
      onClick: w,
      disabled: r,
      children: mr(u, { value: g })
    }
  ) : d ? /* @__PURE__ */ p(
    ut,
    {
      title: a,
      text: g && c || l,
      css: i,
      type: h,
      icon: g && s || n,
      onClick: w,
      disabled: r,
      children: d
    }
  ) : /* @__PURE__ */ p(
    ut,
    {
      title: a,
      text: g && c || l,
      css: i,
      type: h,
      icon: g && s || n,
      onClick: w,
      disabled: r
    }
  );
}, jr = new Date(0, 0, 0, 0, 0);
function Yi({
  value: t = jr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: a = "",
  onChange: i
}) {
  let [l, c] = Oe(t);
  const { calendar: d, formats: u } = ($e(tt) || nn()).getRaw(), f = d.clockFormat == 12, g = 23, m = 59, h = N(() => {
    const L = a || u?.timeFormat;
    return typeof L == "function" ? L : dt(L, d);
  }, [a, u, d]), w = N(() => h(new Date(0, 0, 0, 1)).indexOf("01") != -1, [h]), x = (L, se) => (L < 10 && se ? `0${L}` : `${L}`).slice(-2), y = (L) => x(L, !0), b = (L) => `${L}`.replace(/[^\d]/g, "") || 0, k = (L) => f && (L = L % 12, L === 0) ? "12" : x(L, w), M = R((L, se) => (L = b(L), Math.min(L, se)), []), [$, D] = K(null), T = l || jr, V = M(T.getHours(), g), _ = M(T.getMinutes(), m), A = V > 12, P = k(V), E = y(_), I = N(
    () => h(new Date(0, 0, 0, V, _)),
    [V, _, h]
  ), Y = R(() => {
    D(!0);
  }, []), ie = R(() => {
    const L = new Date(T);
    L.setHours(L.getHours() + (A ? -12 : 12)), c(L), i && i({ value: L });
  }, [T, A, i]), he = R(
    ({ value: L }) => {
      if (T.getHours() === L) return;
      const se = new Date(T);
      se.setHours(L), c(se), i && i({ value: se });
    },
    [T, i]
  ), Q = R(
    ({ value: L }) => {
      if (T.getMinutes() === L) return;
      const se = new Date(T);
      se.setMinutes(L), c(se), i && i({ value: se });
    },
    [T, i]
  ), fe = R(
    (L) => (L = M(L, g), f && (L = L * 1, L === 12 && (L = 0), A && (L += 12)), L),
    [M, f, A]
  ), ye = R(() => {
    D(null);
  }, []);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : Y,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ p(
          rn,
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
        $ && !s && /* @__PURE__ */ p(Ot, { onCancel: ye, width: "unset", children: /* @__PURE__ */ Z("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ Z("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: P,
                onChange: (L) => {
                  const se = fe(L.target.value);
                  he({ value: se });
                }
              }
            ),
            /* @__PURE__ */ p("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: E,
                onChange: (L) => {
                  const se = M(L.target.value, m);
                  Q({ value: se });
                }
              }
            ),
            f && /* @__PURE__ */ p(
              Ps,
              {
                value: A,
                onClick: ie,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(Xt, { width: "unset", children: /* @__PURE__ */ p(
            tr,
            {
              label: d.hours,
              value: V,
              onChange: he,
              max: g
            }
          ) }),
          /* @__PURE__ */ p(Xt, { width: "unset", children: /* @__PURE__ */ p(
            tr,
            {
              label: d.minutes,
              value: _,
              onChange: Q,
              max: m
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Vi({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Gi({ position: t = "right", children: e, onCancel: n }) {
  const r = z(null);
  return F(() => Jt(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Ws({ theme: t = "", target: e, children: n }) {
  const r = z(null), s = z(null), [o, a] = K(null);
  r.current || (r.current = document.createElement("div"));
  const i = $e(tn);
  return F(() => {
    a(
      e || Bi(s.current) || Xe.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p("span", { ref: s, style: { display: "none" } }),
    s.current && o ? jo(
      /* @__PURE__ */ p(
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
function Bi(t) {
  const e = Xe.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Ki() {
  return /* @__PURE__ */ p(Ie, {});
}
function Ur(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(tn.Provider, { value: "material", children: /* @__PURE__ */ Z(Ie, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ Z(Ie, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Ki, {}),
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
function zs() {
  return /* @__PURE__ */ p(Ie, {});
}
function qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(tn.Provider, { value: "willow", children: /* @__PURE__ */ Z(Ie, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ Z(Ie, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(zs, {}),
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
  return /* @__PURE__ */ p(tn.Provider, { value: "willow-dark", children: /* @__PURE__ */ Z(Ie, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ Z(Ie, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(zs, {}),
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
gr(Xe);
const En = {
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
var ji = (/* @__PURE__ */ new Date()).valueOf(), Ui = () => ji++;
function qi(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!Rn(r, s)) return !1;
  }
  return !0;
}
function Rn(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
    return !1;
  if (typeof t == "object")
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let r = t.length - 1; r >= 0; r--)
        if (!Rn(t[r], e[r])) return !1;
      return !0;
    } else
      return qi(t, e);
  return t === e;
}
function bn(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(bn);
  const e = {};
  for (const n in t)
    e[n] = bn(t[n]);
  return e;
}
var Os = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, Fs = (/* @__PURE__ */ new Date()).valueOf(), Xi = () => Fs++;
function yr() {
  return "temp://" + Fs++;
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
    e = { id: Xi(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, Qi = class {
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
    t.$level = n.$level + 1, this._pool.set(t.id, t), n.data ? e === -1 ? n.data = [...n.data, t] : Zr(n, e, t) : n.data = [t];
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
    const r = this._pool.get(t), s = e === "child", o = this._pool.get(n), a = o.$level + (s ? 1 : 0);
    if (!r || !o) return;
    const i = this._pool.get(r.parent), l = s ? o : this._pool.get(o.parent);
    l.data || (l.data = []);
    const c = mn(i, r.id);
    Zi(i, c);
    const d = s ? l.data.length : mn(l, o.id) + (e === "after" ? 1 : 0);
    if (Zr(l, d, r), i.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== a && (r.$level = a, this.setLevel(r, a + 1, !0)), this.update(r.id, r), this._clearBranch(i);
  }
  _clearBranch(t) {
    t.data && !t.data.length && (t.open && delete t.open, this.update(t.id, { data: null }));
  }
  toArray() {
    const t = [], e = this._pool.get(0).data;
    return e && Ys(e, t), t;
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
function Ys(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Ys(n.data, e);
  });
}
function Zi(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function Zr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function mn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Vs = 2, Ji = class {
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
      i ? (i.__parse(c, d, s, o) && (n[a] = c), o & Vs ? s[d] = i.__trigger : i.__trigger()) : (c && c.__reactive ? e[a] = this._wrapNested(c, c, d, s) : e[a] = this._wrapWritable(c), n[a] = c), s[d] = s[d] || null;
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
}, ea = class {
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
function Gs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Gs(o, e, n + 1));
  return Math.max(...s);
}
var ta = class {
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
function na(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function ra(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function sa({ key: t, order: e }) {
  const n = e === "asc" ? na : ra;
  return (r, s) => n(r[t], s[t]);
}
function oa(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => sa(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function ia(t, e) {
  return t.sort(oa(e));
}
class aa extends Qi {
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
    r && (ia(r, e), r.forEach((s) => {
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
function _e(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ht(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function In(t, e) {
  const n = _e(t);
  return isNaN(e) ? ht(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function vr(t, e) {
  const n = _e(t);
  if (isNaN(e)) return ht(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ht(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Ks(t, e) {
  const n = +_e(t);
  return ht(t, n + e);
}
const js = 6048e5, la = 864e5, Us = 6e4, qs = 36e5;
function ca(t, e) {
  return Ks(t, e * qs);
}
let da = {};
function Xs() {
  return da;
}
function Sn(t, e) {
  const n = Xs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = _e(t), o = s.getDay(), a = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function Qt(t) {
  return Sn(t, { weekStartsOn: 1 });
}
function ua(t) {
  const e = _e(t), n = e.getFullYear(), r = ht(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Qt(r), o = ht(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const a = Qt(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= a.getTime() ? n : n - 1;
}
function $t(t) {
  const e = _e(t);
  return e.setHours(0, 0, 0, 0), e;
}
function $n(t) {
  const e = _e(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Qs(t, e) {
  const n = $t(t), r = $t(e), s = +n - $n(n), o = +r - $n(r);
  return Math.round((s - o) / la);
}
function Jr(t) {
  const e = ua(t), n = ht(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Qt(n);
}
function fa(t, e) {
  return Ks(t, e * Us);
}
function ha(t, e) {
  const n = e * 3;
  return vr(t, n);
}
function Zs(t, e) {
  const n = e * 7;
  return In(t, n);
}
function ga(t, e) {
  return vr(t, e * 12);
}
function qt(t, e) {
  const n = _e(t), r = _e(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function pa(t, e) {
  const n = $t(t), r = $t(e);
  return +n == +r;
}
function kr(t, e) {
  const n = Qt(t), r = Qt(e), s = +n - $n(n), o = +r - $n(r);
  return Math.round((s - o) / js);
}
function ma(t, e) {
  const n = _e(t), r = _e(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function wa(t, e) {
  const n = _e(t), r = _e(e);
  return n.getFullYear() - r.getFullYear();
}
function br(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function Js(t, e) {
  return +_e(t) - +_e(e);
}
function xa(t, e, n) {
  const r = Js(t, e) / qs;
  return br(n?.roundingMethod)(r);
}
function ya(t, e, n) {
  const r = Js(t, e) / Us;
  return br(n?.roundingMethod)(r);
}
function eo(t) {
  const e = _e(t);
  return e.setHours(23, 59, 59, 999), e;
}
function Sr(t) {
  const e = _e(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function va(t) {
  const e = _e(t);
  return +eo(e) == +Sr(e);
}
function to(t, e) {
  const n = _e(t), r = _e(e), s = qt(n, r), o = Math.abs(ma(n, r));
  let a;
  if (o < 1) a = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let i = qt(n, r) === -s;
    va(_e(t)) && o === 1 && qt(t, r) === 1 && (i = !1), a = s * (o - Number(i));
  }
  return a === 0 ? 0 : a;
}
function ka(t, e, n) {
  const r = to(t, e) / 3;
  return br(n?.roundingMethod)(r);
}
function ba(t, e) {
  const n = _e(t), r = _e(e), s = qt(n, r), o = Math.abs(wa(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const a = qt(n, r) === -s, i = s * (o - +a);
  return i === 0 ? 0 : i;
}
function Zt(t) {
  const e = _e(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function no(t) {
  const e = _e(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function Sa(t) {
  const e = _e(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function $a(t) {
  const e = _e(t), n = ht(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function _a(t) {
  const e = _e(t);
  return e.setMinutes(59, 59, 999), e;
}
function Ca(t, e) {
  const n = Xs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = _e(t), o = s.getDay(), a = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + a), s.setHours(23, 59, 59, 999), s;
}
function $r(t) {
  const e = _e(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function ro(t) {
  const e = _e(t), n = e.getFullYear(), r = e.getMonth(), s = ht(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Na(t) {
  const e = _e(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function so(t) {
  const e = _e(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : Na(e) ? 366 : 365;
}
function Da(t) {
  const e = Jr(t), n = +Jr(Zs(e, 60)) - +e;
  return Math.round(n / js);
}
function Rt(t, e) {
  const n = _e(t), r = _e(e);
  return +n == +r;
}
function Ta(t) {
  const e = _e(t);
  return e.setMinutes(0, 0, 0), e;
}
function Ma(t, e, n) {
  const r = Sn(t, n), s = Sn(e, n);
  return +r == +s;
}
function Ea(t, e) {
  const n = _e(t), r = _e(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Ra(t, e) {
  const n = Zt(t), r = Zt(e);
  return +n == +r;
}
function Ia(t, e) {
  const n = _e(t), r = _e(e);
  return n.getFullYear() === r.getFullYear();
}
const nr = { year: ba, quarter: ka, month: to, week: kr, day: Qs, hour: xa, minute: ya }, pt = { year: { quarter: 4, month: 12, week: Da, day: Aa, hour: Ha }, quarter: { month: 3, week: La, day: oo, hour: Pa }, month: { week: Wa, day: za, hour: Oa }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Aa(t) {
  return t ? so(t) : 365;
}
function Ha(t) {
  return so(t) * 24;
}
function La(t) {
  const e = Zt(t), n = In($t($r(t)), 1);
  return kr(n, e);
}
function oo(t) {
  if (t) {
    const e = Zt(t), n = $r(t);
    return Qs(n, e) + 1;
  }
  return 91;
}
function Pa(t) {
  return oo(t) * 24;
}
function Wa(t) {
  if (t) {
    const e = no(t), n = In($t(Sr(t)), 1);
    return kr(n, e);
  }
  return 5;
}
function za(t) {
  return t ? ro(t) : 30;
}
function Oa(t) {
  return ro(t) * 24;
}
function _n(t, e, n) {
  const r = pt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Fa(t, e) {
  return t === e || !!(pt[t] && pt[t][e]);
}
const Cn = { year: ga, quarter: ha, month: vr, week: Zs, day: In, hour: ca, minute: fa };
function _r(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, a) => !pt[t][o] || typeof pt[t][o] == "number" || lo(t, r, s, n) ? jt(t, r, s, o, a, n) : Ya(r, s, t, o, a, n);
}
function jt(t, e, n, r, s, o) {
  const a = r || t;
  let i = n, l = e;
  if (s && (i = ft(a, n, o), l = ft(a, e, o), l < e && (l = st(a)(l, 1))), t !== a) {
    const c = nr[a](l, i), d = _n(t, a, n);
    return c / d;
  } else return nr[a](l, i);
}
function Ya(t, e, n, r, s, o) {
  let a = 0;
  const i = ft(n, e, o);
  if (e > i) {
    const c = Cn[n](i, 1);
    a = jt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return lo(n, e, t, o) || (l = jt(n, ft(n, t, o), e, void 0, void 0, o), e = Cn[n](e, l)), l += a + jt(n, t, e, r, void 0, o), !l && s && (l = jt(n, t, e, r, s, o)), l;
}
function st(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Cn[t];
}
const io = { year: $a, quarter: Zt, month: no, week: (t, e) => Sn(t, { weekStartsOn: e }), day: $t, hour: Ta };
function ft(t, e, n) {
  const r = io[t];
  return r ? r(e, n) : new Date(e);
}
const Va = { year: Sa, quarter: $r, month: Sr, week: (t, e) => Ca(t, { weekStartsOn: e }), day: eo, hour: _a }, ao = { year: Ia, quarter: Ra, month: Ea, week: (t, e, n) => Ma(t, e, { weekStartsOn: n }), day: pa };
function lo(t, e, n, r) {
  const s = ao[t];
  return s ? s(e, n, r) : !1;
}
const Ga = { start: io, end: Va, add: Cn, isSame: ao, diff: nr, smallerCount: pt }, es = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ba(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((i, l) => rt.indexOf(i) - rt.indexOf(l)).shift();
      let s = rt.indexOf(r);
      const o = e[n][r], a = es(o);
      for (let i = s - 1; i >= 0; i--) {
        const l = rt[i], c = es(pt[l][r]);
        if (a <= c) break;
        s = i;
      }
      rt.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) pt[r][t] = e[n][r];
    else Ga[n][t] = e[n];
  }
}
function Fn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Ka(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Lt(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: st(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const rt = ["year", "quarter", "month", "week", "day", "hour"], rr = 50, sr = 300;
function ja(t, e, n, r, s) {
  let o = t, a = e, i = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, i = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!a || u >= a) && (a = u, l = !0);
  });
  const c = st(r || "day");
  return o ? i && (o = c(o, -1)) : a ? o = c(a, -30) : o = /* @__PURE__ */ new Date(), a ? l && (a = c(a, 1)) : a = c(o, 30), { _start: o, _end: a };
}
function Ua(t, e, n, r, s, o, a) {
  const i = Lt(a).unit, l = _r(i, void 0, o), c = l(e, t, "", !0), d = ft(i, e, o);
  t = ft(i, t, o), e = d < e ? st(i)(d, 1) : d;
  const u = c * r, f = s * a.length, g = a.map((h) => {
    const w = [], x = st(h.unit);
    let y = ft(h.unit, t, o);
    for (; y < e; ) {
      const b = x(y, h.step), k = y < t ? t : y, M = b > e ? e : b, $ = l(M, k, "", !0) * r, D = typeof h.format == "function" ? h.format(y, b) : h.format;
      let T = "";
      h.css && (T += typeof h.css == "function" ? h.css(y) : h.css), w.push({ width: $, value: D, date: k, css: T, unit: h.unit }), y = b;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return i !== n && (m = Math.round(m / _n(i, n)) || 1), { rows: g, width: u, height: f, diff: l, start: t, end: e, lengthUnit: n, minUnit: i, lengthUnitWidth: m };
}
function qa(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = rt.indexOf(Lt(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = wn(s.minCellWidth, rr)), l.maxCellWidth || (l.maxCellWidth = wn(s.maxCellWidth, sr));
  });
  else {
    const l = [], c = n.length || 1, d = wn(s.minCellWidth, rr), u = wn(s.maxCellWidth, sr);
    n.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }), rt.forEach((f, g) => {
      if (g === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (g) for (let h = c - 1; h > 0; h--) {
          const w = rt[g - h];
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
function Xa(t, e, n, r, s, o, a) {
  t.level = n;
  let i;
  const l = r.scales || r, c = Lt(l).unit, d = Qa(c, s);
  if (e === -1) {
    const g = _n(c, s);
    i = a * g;
  } else {
    const g = _n(Lt(o).unit, c);
    i = Math.round(a / g);
  }
  const u = r.minCellWidth ?? rr, f = r.maxCellWidth ?? sr;
  return { scales: l, cellWidth: Math.min(f, Math.max(u, i)), lengthUnit: d, zoom: t };
}
function Qa(t, e) {
  const n = rt.indexOf(t), r = rt.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : rt[r];
}
function wn(t, e) {
  return t ?? e;
}
const or = 8, co = 4, Za = 3, ts = 7, Ja = or + co;
function uo(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && ho(s, n, r), s.$x += e, uo(s, e, n, r);
  });
}
function ir(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), a = { xMin: 1 / 0, xMax: 0 };
    fo(o, a, n, r), o.$x = a.xMin, o.$w = a.xMax - a.xMin, ir(t, o, n, r);
  }
}
function fo(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && ho(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const a = s.$x + s.$w - o;
      e.xMax < a && (e.xMax = a);
    }
    s.type !== "summary" && fo(s, e, n, r);
  });
}
function ho(t, e, n) {
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
function go(t, e, n) {
  return ns(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    go(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && ns(t, e, n, !0), t;
}
function ns(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: a, baselines: i } = n, { start: l, end: c, lengthUnit: d, diff: u } = a, f = (r ? "base_" : "") + "start", g = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), h = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let b = t[f], k = t[g];
  if (r && !b) {
    t[y] = !0;
    return;
  }
  t[f] < l && (t[g] < l || Rt(t[g], l)) ? b = k = l : t[f] > c && (b = k = c), t[m] = Math.round(u(b, l, d) * s), t[h] = r ? t.$y + t.$h + co : o * e + Za, t[w] = Math.round(u(k, b, d, !0) * s), t[x] = r ? or : i ? o - ts - Ja : o - ts, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[h] = t.$y + or, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Rt(b, k);
}
const Yn = 20, el = function(t, e, n, r, s) {
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
    const f = nl(l, c + o, d, u + o, a, i, r / 2, s), g = rl(d, u + o, i);
    t.$p = `${f},${g}`, t.$pl = tl(t.$p);
  }
  return t;
};
function tl(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, a] = n[s], [i, l] = n[s + 1];
    r += Math.hypot(i - o, l - a);
  }
  return r;
}
function nl(t, e, n, r, s, o, a, i) {
  const l = Yn * (s ? -1 : 1), c = Yn * (o ? -1 : 1), d = t + l, u = n + c, f = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], g = u - d;
  let m = r - e;
  const h = o === s;
  return h || (u <= t + Yn - 2 && o || u > t && !o) && (m = i ? m - a + 6 : m - a), h && o && d > u || h && !o && d < u ? (f[4] = f[2] + g, f[5] = f[3], f[6] = f[4], f[7] = f[5] + m) : (f[4] = f[2], f[5] = f[3] + m, f[6] = f[4] + g, f[7] = f[5]), f.join(",");
}
function rl(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function po(t) {
  return t.map((e) => {
    const n = e.id || yr();
    return { ...e, id: n };
  });
}
const mo = ["start", "end", "duration"];
function sl(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !mo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function ol(t, e) {
  return typeof e == "function" ? e : mo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => sl(n, r.id) ? e : null) : e;
}
function il(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), a = e.editor && ol(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...a && { editor: a }, ...e.options && { options: e.options } };
  });
}
const wo = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function It(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), a = s.length, i = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], f = { "indent-task:remove": 2 }, g = !a && d.includes(e), m = { parent: u.includes(e), level: f[e] };
  if (n = n || (a ? s[s.length - 1] : null), !(!n && !g)) {
    if (e !== "paste-task" && (t._temp = null), i.includes(e) || g || s.length === 1) rs(t, e, n, r);
    else if (a) {
      const h = l.includes(e) ? s : al(s, o, m);
      c.includes(e) && h.reverse();
      const w = t.getHistory();
      w && w.startBatch(), h.forEach((x, y) => rs(t, e, x, r, y)), w && w.endBatch();
    }
  }
}
function al(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function rs(t, e, n, r, s) {
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
      const g = /* @__PURE__ */ new Map();
      if (t._temp.forEach((m) => {
        const h = { id: m.id, target: l, mode: "after" };
        o(m.cut ? "move-task" : "copy-task", h), g.set(m.id, h.id);
      }), !t._temp[0].cut) {
        const { links: m } = t.getState(), h = t._temp.map((x) => x.id), w = [];
        m.forEach((x) => {
          h.includes(x.source) && h.includes(x.target) && w.push(x);
        }), w.forEach((x) => {
          o("add-link", { link: { source: g.get(x.source), target: g.get(x.target), type: x.type } });
        }), t._temp.forEach((x, y) => {
          o("select-task", { id: g.get(x.id), toggle: !!y });
        });
      }
      f && f.endBatch(), t._temp = null;
    }
    return;
  } else a === "add-task" ? (d = { task: { type: "task", text: r("New Task") }, target: l, show: !0, select: !1 }, c = {}, u = !0) : a === "edit-task" ? (a = "show-editor", i === "segment" && typeof n == "object" && (d = n)) : a === "convert-task" ? (a = "update-task", d = { task: { type: i } }, i = void 0) : a === "indent-task" && (i = i === "add");
  if (a === "split-task" && typeof n == "object") d = n;
  else if (a === "delete-task" && i === "segment" && typeof n == "object") {
    const f = t.getTask(l), { segmentIndex: g } = n, m = f.segments.filter((h, w) => w !== g);
    o("update-task", { id: l, task: { segments: m } });
    return;
  }
  typeof i < "u" && (d = { mode: i, ...d }), c = { ...c, ...d }, o(a, c), u && o("select-task", { id: c.id, toggle: !!s });
}
function Nr(t, e) {
  return t.some((n) => n.data ? Nr(n.data, e) : n.id === e);
}
const ss = (t, e) => st(t, e), ll = (t, e) => _r(t, e);
function ar(t, e) {
  Array.isArray(t) && (t.forEach((n) => vt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Cr(n, t);
      n.start = r, n.end = s, vt(n, e);
    }
  }));
}
function vt(t, e) {
  t.unscheduled || os(t, e, !1), t.base_start && os(t, e, !0);
}
function os(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [a, i, l] = xo(n);
  t.type === "milestone" ? (t[l] = 0, t[i] = void 0) : t[a] && (t[l] ? t[i] = ss(o, r)(t[a], t[l]) : t[i] ? t[l] = ll(o, r)(t[i], t[a]) : (t[i] = ss(o, r)(t[a], 1), t[l] = 1));
}
function xo(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function is(t, e, n) {
  const [r, s, o] = xo(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function yo(t, e, n) {
  is(t, n, !1), t.base_start && is(t, n, !0), vt(t, e);
}
class cl extends Ji {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new ea(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: a, start: i, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!i || !l || u) {
        const f = Lt(d).unit, g = ja(i, l, u, f, c);
        (g._end != o || g._start != a) && this.setState(g, s);
      } else this.setState({ _start: i, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: a } = o;
      const { _start: i, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: f } = o, g = Lt(u).unit;
      Fa(g, a) || (a = g);
      const m = Ua(i, l, a, c, d, f, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: a, tasks: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), f = i.toArray().map((g, m) => go(g, m, { cellWidth: o, cellHeight: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: f }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: a, cellHeight: i, baselines: l, criticalPath: c } = this.getState(), d = a.map((u) => {
        const f = o.byId(u.source), g = o.byId(u.target);
        return el(u, f, g, i, l);
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
    } }], { tasks: (s) => new aa(s), links: (s) => new Qr(s), columns: (s) => il(s) });
    const n = this.in = new ta();
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
      let g = !1, m;
      if (c.length && (o || a)) {
        const w = [...c];
        if (a) {
          const x = w[w.length - 1], y = d.findIndex((D) => D.id == x), b = d.findIndex((D) => D.id == s), k = Math.min(y, b), M = Math.max(y, b) + 1, $ = d.slice(k, M).map((D) => D.id);
          y > b && $.reverse(), $.forEach((D) => {
            w.includes(D) || w.push(D);
          });
        } else if (o) {
          const x = w.findIndex((y) => y == s);
          x === -1 ? w.push(s) : (g = !0, w.splice(x, 1));
        }
        m = w;
      } else m = [s];
      const h = { selected: m };
      i && m.length && (h._scrollTask = { id: m[0], mode: i }), this.setStateAsync(h), !g && u && (u !== s || f) && n.exec("show-editor", { id: s, ...f && { segmentIndex: l } });
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
          const g = d.parent === 0;
          if (f === 0 && g) {
            s.skipProvider = !0;
            return;
          }
          f -= 1, a = "before";
        } else if (a === "down") {
          const g = f === u.length - 1, m = d.parent === 0;
          if (g && m) {
            s.skipProvider = !0;
            return;
          }
          f += 1, a = "after";
        }
        if (i = u[f] && u[f].id || d.parent, i) {
          const g = o.getBranch(i);
          let m = o.getIndexById(i), h = g[m];
          if (h.data) {
            if (a === "before") {
              if (h.parent === d.parent) {
                for (; h.data; ) h.open || n.exec("open-task", { id: h.id, mode: !0 }), h = h.data[h.data.length - 1];
                i = h.id;
              }
            } else if (a === "after") {
              let y;
              h.parent === d.parent ? (y = h, h = h.data[0], i = h.id, a = "before") : g.length - 1 !== m && (y = h, m += 1, h = g[m], d.$level > h.$level && h.data ? (y = h, h = h.data[0], i = h.id, a = "before") : i = h.id), y && !y.open && n.exec("open-task", { id: y.id, mode: !0 });
            }
          }
          const w = o.getSummaryId(d.id);
          o.move(l, a, i);
          const x = o.getSummaryId(l);
          w != x && (w && this.resetSummaryDates(w, "move-task"), x && this.resetSummaryDates(x, "move-task"));
        }
      } else {
        const u = o.byId(i);
        let f = u, g = !1;
        for (; f.$level > d.$level; ) f = o.byId(f.parent), f.id === l && (g = !0);
        if (g) return;
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
      const o = this.getState(), { tasks: a, _tasks: i, _selected: l, _scales: c, cellWidth: d } = o, u = a.byId(s.id), { left: f, top: g, width: m, inProgress: h } = s, w = { _tasks: i, _selected: l };
      if (typeof m < "u" && (u.$w = m, ir(a, u, c, d)), typeof f < "u") {
        if (u.type === "summary") {
          const x = f - u.$x;
          uo(u, x, c, d);
        }
        u.$x = f, ir(a, u, c, d);
      }
      typeof g < "u" && (u.$y = g + 4, u.$reorder = h), typeof m < "u" && (u.$w = m), typeof f < "u" && (u.$x = f), typeof g < "u" && (u.$y = g + 4, u.$reorder = h), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: a, diff: i, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: f, splitTasks: g, calendar: m } = this.getState(), h = d.byId(o), w = { durationUnit: f, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        vt(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = st(x);
      const b = _r(x, m);
      if (i && (c.start && (c.start = y(c.start, i)), !a && a !== 0 && (c.start && c.end ? c.duration = h.duration : (c.start ? c.end = h.end : (c.end = y(c.end, i), c.start = h.start, c.duration = b(c.end, c.start)), b(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? h.type, m && c.start && (c.start = Fn(c.start, i, m)), c.start && c.end && (!Rt(c.start, h.start) || !Rt(c.end, h.end)) && c.type === "summary" && h.data?.length) {
        let M = i || b(c.start, h.start);
        m && (M = c.start > h.start ? b(c.start, h.start) : -b(h.start, c.start), y = Ka(m)), this.moveSummaryKids(h, ($) => ($ = y($, M), m ? Fn($, i, m) : $), "update-task");
      }
      c.start || (c.start = h.start), !c.end && !c.duration && (c.duration = h.duration), vt(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && h.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
      const k = d.getSummaryId(o);
      k && this.resetSummaryDates(k, "update-task"), this.setStateAsync({ tasks: d }), s.task = d.byId(o);
    }), n.on("add-task", (s) => {
      const { tasks: o, _scales: a, unscheduledTasks: i, durationUnit: l, splitTasks: c, calendar: d } = this.getState(), { target: u, mode: f, task: g, show: m, select: h = !0 } = s;
      !s.eventSource && i && (g.unscheduled = !0);
      let w = -1, x, y;
      if (u ? (y = o.byId(u), f == "child" ? (x = y, g.parent = x.id) : (y.parent !== null && (x = o.byId(y.parent), g.parent = x.id), w = o.getIndexById(u), f == "after" && (w += 1))) : g.parent && (x = o.byId(g.parent)), !g.start) {
        if (x?.start) g.start = new Date(x.start.valueOf());
        else if (y) g.start = new Date(y.start.valueOf());
        else {
          const $ = o.getBranch(0);
          let D;
          if ($?.length) {
            const T = $[$.length - 1];
            if (!T.$skip) {
              const V = new Date(T.start.valueOf());
              a.start <= V && (D = V);
            }
          }
          g.start = D || st(l, d)(a.start, 1);
        }
        g.duration = 1;
      }
      d && (g.start = Fn(g.start, 1, d)), this.getState().baselines && (g.base_start = g.start, g.base_duration = g.duration), vt(g, { durationUnit: l, calendar: d });
      const b = o.add(g, w), k = { tasks: o };
      if (x && m) {
        for (; x && x.id; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
        k._scrollTask = { id: b.id, mode: m };
      }
      s.id = b.id;
      const M = o.getSummaryId(b.id);
      M && this.resetSummaryDates(M, "add-task"), this.setStateAsync(k), s.id = b.id, s.task = b, h && n.exec("select-task", { id: b.id });
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
      let g = c.getIndexById(a);
      i == "before" && (g -= 1);
      const m = c.byId(o), h = c.copy(m, c.byId(a).parent, g + 1);
      s.source = s.id, s.id = h[0][1], m.lazy && (s.lazy = !0), u != f && f && this.resetSummaryDates(f, "copy-task");
      let w = [];
      for (let x = 1; x < h.length; x++) {
        const [y, b] = h[x];
        d.forEach((k) => {
          if (k.source === y) {
            const M = { ...k };
            delete M.target, w.push({ ...M, source: b });
          } else if (k.target === y) {
            const M = { ...k };
            delete M.source, w.push({ ...M, target: b });
          }
        });
      }
      w = w.reduce((x, y) => {
        const b = x.findIndex((k) => k.id === y.id);
        return b > -1 ? x[b] = { ...x[b], ...y } : x.push(y), x;
      }, []);
      for (let x = 1; x < h.length; x++) {
        const [y, b] = h[x], k = c.byId(b);
        n.exec("copy-task", { source: y, id: b, lazy: !!k.lazy, eventSource: "copy-task", target: k.parent, mode: "child", skipUndo: !0 });
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], ar(s.data.tasks, { durationUnit: i, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Qr(a.map((u) => u).concat(po(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: a, cellWidth: i, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let f = i;
      s < 0 && (f = l || i);
      const g = f + s * 50, m = a.levels[a.level], h = s < 0 && i > m.maxCellWidth;
      if (g < m.minCellWidth || g > m.maxCellWidth || h) {
        if (!this.changeScale(a, s)) return;
      } else this.setState({ cellWidth: g, _cellWidth: g });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: b } = this.getState(), k = ft(w.minUnit, x, b), M = w.diff(u, k, "hour");
      typeof o > "u" && (o = y);
      let $ = Math.round(M * y) - o;
      $ < 0 && ($ = 0), this.setState({ scrollLeft: $, _scaleDate: u, _zoomOffset: o });
    }), n.on("expand-scale", ({ minWidth: s }) => {
      const { _start: o, _scales: a, start: i, end: l, _end: c, cellWidth: d, _scaleDate: u, _zoomOffset: f } = this.getState(), g = st(a.minUnit);
      let m = a.width;
      if (i && l) {
        if (m < s && m) {
          const b = s / m;
          this.setState({ cellWidth: d * b });
        }
        return !0;
      }
      let h = 0;
      for (; m < s; ) m += d, h++;
      const w = h ? l ? -h : -1 : 0, x = i || g(o, w);
      let y = 0;
      if (u) {
        const b = a.diff(u, x, "hour");
        y = Math.max(0, Math.round(b * d) - (f || 0));
      }
      this.setState({ _start: x, _end: l || g(c, h), scrollLeft: y });
    }), n.on("sort-tasks", ({ key: s, order: o, add: a }) => {
      const i = this.getState(), { tasks: l } = i;
      let c = i._sort;
      const d = { key: s, order: o };
      let u = c?.length || 0;
      u && a ? (c.forEach((f, g) => {
        f.key === s && (u = g);
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
          It(this, "copy-task", null, null);
          break;
        }
        case "ctrl+x": {
          It(this, "cut-task", null, null);
          break;
        }
        case "ctrl+v": {
          It(this, "paste-task", null, null);
          break;
        }
        case "ctrl+d":
        case "backspace": {
          o.preventDefault(), It(this, "delete-task", null, null);
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
      const { cellWidth: o, scales: a, _scales: i } = this.getState(), l = Xa(e, n, r, s, i.lengthUnit, a, o);
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
      if (!Rt(l.start, d.start) || !Rt(l.end, d.end)) {
        r ? (vt(d, { durationUnit: o, calendar: i }), s.update(e, d)) : this.in.exec("update-task", { id: e, task: d, eventSource: n, skipUndo: !0 });
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
    return st("hour")(ft(n.minUnit, r, s), Math.floor(e / o));
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
function dl(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = ul(s, t, e, 1, n);
    fl(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function ul(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function fl(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function lr(t) {
  return [...vo];
}
function Dr(t) {
  return t.map((e) => {
    switch (e.data && Dr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => gl(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => pl(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => ml(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => hl(n);
        break;
    }
    return e;
  });
}
function hl(t) {
  return t.parent === 0;
}
function gl(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function pl(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function ml(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function as(t) {
  return t && typeof t == "object";
}
function wl(t) {
  return !t.selected || t.selected.length < 2;
}
const xl = (t) => (e) => e.type === t, vo = Dr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: xl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => as(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => wl(e) && as(n) }]);
function cr(t) {
  return [...ko];
}
const ko = Dr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Vn(t) {
  return t.type === "summary";
}
function Gn(t) {
  return t.type === "milestone";
}
function Bn(t) {
  return typeof t.parent > "u";
}
function Kn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function bo(t) {
  return [...So];
}
const So = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Bn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Vn(t), isDisabled: Kn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Vn(t) || Gn(t), isDisabled: Kn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Vn(t) || Gn(t), isDisabled: Kn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Gn(t) || Bn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Bn(t) }], $o = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], wt = Pt(null);
(/* @__PURE__ */ new Date()).valueOf();
function yl(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!sn(r, s)) return !1;
  }
  return !0;
}
function sn(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime()) return !1;
  if (typeof t == "object") if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    for (let n = t.length - 1; n >= 0; n--) if (!sn(t[n], e[n])) return !1;
    return !0;
  } else return yl(t, e);
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
var _o = 2, vl = class {
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
      l ? (l.__parse(d, u, o, a) && (r[i] = d), a & _o ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[i] = this._wrapNested(d, d, u, o) : n[i] = this._wrapWritable(d), r[i] = d), o[u] = o[u] || null;
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
}, kl = class {
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
      o.length = Math.max(...o.in.map((a) => Co(a, this._sources, 1)));
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
    const n = this._setter(e, _o);
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
function Co(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Co(o, e, n + 1));
  return Math.max(...s);
}
var bl = class {
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
function Sl(t) {
  return (e) => e[t];
}
function $l(t) {
  return (e, n) => e[t] = n;
}
function _t(t, e) {
  return (e.getter || Sl(e.id))(t);
}
function ls(t, e, n) {
  return (e.setter || $l(e.id))(t, n);
}
function cs(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function mt(t, e) {
  let n = _t(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function _l(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", a = t._columns, i = t.flatData;
  e.header !== !1 && a[0].header && (r = ds("header", a, r, o, s));
  for (let l = 0; l < i.length; l++) {
    const c = [];
    for (let d = 0; d < a.length; d++) {
      let u = mt(i[l], a[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && a[0].footer && (r = ds("footer", a, r, o, s)), r;
}
function ds(t, e, n, r, s) {
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
function Cl(t, e, n) {
  const r = [], s = [], o = [];
  let a = [];
  const i = t._columns, l = t.flatData, c = t._sizes;
  for (const u of i) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && i[0].header && (us("header", i, r, s, d, e, n), a = a.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += i[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const f = [];
    for (let g = 0; g < i.length; g++) {
      const m = l[u], h = i[g], w = _t(m, h) ?? "";
      let x = mt(m, h), y;
      e.cellStyle && (y = e.cellStyle(w, m, h)), e.cellTemplate && (x = e.cellTemplate(w, m, h) ?? x);
      const b = No(x, 2, y, n);
      f.push(b);
    }
    r.push(f), a.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && i[0].footer && (us("footer", i, r, s, d, e, n), a = a.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: a, colSizes: o, styles: n };
}
function us(t, e, n, r, s, o, a) {
  for (let i = 0; i < e[0][t].length; i++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][i], u = d.colspan ? d.colspan - 1 : 0, f = d.rowspan ? d.rowspan - 1 : 0;
      (u || f) && r.push({ from: { row: i + s, column: c }, to: { row: i + s + f, column: c + u } });
      let g = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(g, d, e[c], t)), o.headerCellTemplate && (g = o.headerCellTemplate(g, d, e[c], t) ?? g);
      let h;
      t == "header" ? i == e[0][t].length - 1 ? h = 1 : h = 0 : i ? h = 4 : h = 3;
      const w = No(g, h, m, a);
      l.push(w);
    }
    n.push(l);
  }
}
function No(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Dl(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((a) => sn(a, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function Nl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, a = e[t], i = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: a, background: r[t], ...l, borderBottom: i, borderRight: i };
  return { cell: { color: a, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Dl(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Tl = "portrait", Ml = 100, El = "a4", Rl = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Il(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((i) => !i.hidden), a = Al(e);
  return o.forEach((i, l) => {
    s + i.width <= a ? (s += i.width, r.push(i)) : (r.length && n.push(r), r = [i], s = i.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function fs(t, e, n) {
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
function Al(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Rl[r];
  return Hl(e === "portrait" ? s : o, n);
}
function Hl(t, e) {
  return t * e;
}
function Ll(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || Tl, ppi: n || Ml, paper: r || El };
}
function Do(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Pl(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const hs = ["resize-column", "hide-column", "update-cell"], Wl = ["delete-row", "update-row", "update-cell"], zl = ["move-item"], Ol = ["resize-column", "move-item"];
let Fl = class {
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
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), a = _t(s, o);
      return sn(a, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: a }, source: { action: "update-cell", data: e } };
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
        if (Ol.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (zl.includes(n) && this.setPrev("flatData"), hs.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Wl.includes(n) && this.setPrev("data"), hs.includes(n) && this.setPrev("columns");
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
function To() {
  let t = !0;
  return t = !1, t;
}
function Mo(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Yl(t, e) {
  return -Mo(t, e);
}
function Vl(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? Mo : Yl;
  return function(r, s) {
    return n(_t(r, e), _t(s, e));
  };
}
function Gl(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Vl(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const a = n[o](r, s);
      if (a !== 0) return a;
    }
    return 0;
  };
}
const xn = 28, Bl = 20;
function Kl() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Nn(t, e, n, r, s) {
  const o = document.createElement("div"), a = document.createElement("div"), i = document.body;
  s = s ? `${s}px` : "auto";
  let l, c;
  a.className = e, o.classList.add(`wx-${n}-theme`), o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`, o.appendChild(a), i.appendChild(o), typeof t != "object" && (t = [t]);
  for (let d = 0; d < t.length; d++) {
    a.innerText = t[d] + "";
    const u = o.getBoundingClientRect(), f = Math.ceil(u.width) + (r && r.length ? r[d] : 0), g = Math.ceil(u.height);
    l = Math.max(l || 0, f), c = Math.max(c || 0, g);
  }
  return o.remove(), { width: l, height: c };
}
function gs(t, e, n, r, s) {
  const o = [];
  for (let a = 0; a < t.length; a++) {
    const i = t[a][e], l = i.length;
    for (let c = 0; c < l; c++) {
      const { text: d, vertical: u, collapsed: f, rowspan: g, css: m } = i[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let h = 0;
      if (u && !f) {
        let w = `wx-measure-cell-${e}`;
        if (w += m ? ` ${m}` : "", h = Nn(d, w, s).width, (g > 1 || !i[c + 1]) && n > c + 1) {
          const x = g || n - c, y = o.slice(c, c + x).reduce((b, k) => b + k, 0);
          if (y < h) {
            const b = Math.ceil((h - y) / x);
            for (let k = c; k < c + x; k++) o[k] = (o[k] || r) + b;
          }
          continue;
        }
      }
      o[c] = Math.max(o[c] || r, h);
    }
  }
  return o;
}
function jl(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let a = 0; a < e.length; a++) {
    const i = e[a], l = mt(i, t);
    l && (r.push(l), t.treetoggle ? s.push(e[a].$level * xn + (e[a].$count ? xn : 0) + (t.draggable ? xn : 0)) : t.draggable && s.push(xn));
  }
  return Nn(r, o, n, s).width;
}
function Ul(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Bl : 0;
  let s = t.header;
  if (typeof s == "string") return Nn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let a = 0; a < s.length; a++) {
    const i = s[a], l = typeof i == "string" ? i : i.text, c = n + (typeof i == "string" ? "" : ` ${i.css}`);
    let d = Nn(l, c, e).width;
    a === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const ql = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Xl(t) {
  return ql[t];
}
class Ql extends vl {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new kl(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: a, _skin: i } = this.getState(), l = this.copyColumns(o), c = l.reduce((f, g) => Math.max(g.header.length, f), 0), d = l.reduce((f, g) => Math.max(g.footer.length, f), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, a, c, d, i);
      for (let f = 0; f < l.length; f++) this.normalizeColumns(l, f, "header", c, u), this.normalizeColumns(l, f, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: a, dynamic: i, _filterIds: l } = this.getState(), c = l && new Set(l), d = a ? this.flattenRows(o, [], l) : c ? o.filter((f) => c.has(f.id)) : o, u = !i && d.some((f) => f.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new bl();
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
        a = { column: l.id, id: s, value: _t(i, l) ?? "", renderedValue: mt(i, l) }, typeof c == "object" && c.config && (a.config = c.config, c.config.options && (a.options = c.config.options)), l.options && !a.options && (a.options = l.options), this.setState({ editor: a });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: a } = o;
      const { select: i, _filterIds: l } = o, { row: c, before: d, after: u, select: f } = s;
      if (s.id = c.id = s.id || c.id || yn(), d || u) {
        const m = d || u, h = a.findIndex((w) => w.id === m);
        a = [...a], a.splice(h + (u ? 1 : 0), 0, s.row);
      } else a = [...a, s.row];
      const g = { data: a };
      l && (g._filterIds = [...l, s.id]), this.setState(g), !(typeof f == "boolean" && !f) && (f || i) && r.exec("select-row", { id: c.id, show: !0 });
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
        ls(f, u, d);
        const g = this.updateTreeRow(f);
        f.$parent === 0 && (a = g);
      } else {
        const f = a.findIndex((m) => m.id == l), g = { ...a[f] };
        ls(g, u, d), a[f] = g;
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
        const { data: g } = this.getState();
        let m = g.findIndex((w) => w.id == f[f.length - 1]), h = g.findIndex((w) => w.id == s);
        m > h && ([m, h] = [h, m]), g.slice(m, h + 1).forEach((w) => {
          f.indexOf(w.id) === -1 && f.push(w.id);
        });
      } else if (o && this.isSelected(s)) {
        if (i === !0) return;
        f = f.filter((g) => g !== s);
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
          const { flatData: f, _skin: g } = this.getState();
          let m = f.length;
          i && (m = Math.min(i, m));
          const h = f.slice(0, m);
          c = jl(u, h, g);
        }
        if (a == "header" || a === !0) {
          const { _skin: f } = this.getState();
          c = Math.max(Ul(u, f), c);
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
      let g = l.sortMarks;
      const m = Object.keys(g), h = m.length;
      !a || !h || h === 1 && g[o] ? g = { [o]: { order: f } } : (h === 1 && (g[m[0]] = { ...g[m[0]], index: 0 }), g = { ...g, [o]: { order: f, index: typeof a == "number" ? a : g[o]?.index ?? h } });
      const w = Object.keys(g).sort((y, b) => g[y].index - g[b].index).map((y) => ({ key: y, order: g[y].order }));
      this.setState({ sortMarks: g });
      const x = Gl(w, c);
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
      const g = i ?? this.createFilter(u);
      let m = [];
      d ? m = this.filterTree(c, g, m) : c.forEach((h) => {
        g(h) && m.push(h.id);
      }), f._filterIds = m, this.setState(f);
    }), r.on("collapse-column", (s) => {
      const { id: o, row: a, mode: i } = s, l = [...this.getState().columns], c = this.getColumn(o).header, d = Array.isArray(c) ? c[a] : c;
      typeof d == "object" && (d.collapsed = i ?? !d.collapsed, this.setState({ columns: l }));
    }), r.on("move-item", (s) => {
      const { id: o, inProgress: a } = s;
      let { target: i, mode: l = "after" } = s;
      const { data: c, flatData: d, tree: u } = this.getState(), f = d.findIndex((h) => h.id == o);
      let g;
      if (l === "up" || l === "down") {
        if (l === "up") {
          if (f === 0) return;
          g = f - 1, l = "before";
        } else if (l === "down") {
          if (f === d.length - 1) return;
          g = f + 1, l = "after";
        }
        i = d[g] && d[g].id;
      } else g = d.findIndex((h) => h.id == i);
      if (f === -1 || g === -1 || a === !1) return;
      let m;
      u ? m = this.moveItem(o, i, c, l) : m = this.moveItem(o, i, c, l), this.setState({ data: u ? this.normalizeTreeRows(m) : m });
    }), r.on("copy-row", (s) => {
      const { id: o, target: a, mode: i = "after" } = s, l = this.getState(), { flatData: c, _filterIds: d } = l;
      let { data: u } = l;
      const f = this.getRow(o);
      if (!f) return;
      const g = { ...f, id: yn() };
      s.id = g.id;
      const m = c.findIndex((w) => w.id == a);
      if (m === -1) return;
      u.splice(m + (i === "after" ? 1 : 0), 0, g), u = [...u];
      const h = { data: u };
      d && (h._filterIds = [...d, g.id]), this.setState(h);
    }), r.on("open-row", (s) => {
      const { id: o, nested: a } = s;
      this.toggleBranch(o, !0, a);
    }), r.on("close-row", (s) => {
      const { id: o, nested: a } = s;
      this.toggleBranch(o, !1, a);
    }), r.on("export", (s) => new Promise((o, a) => {
      const i = s.options || {}, l = `${i.fileName || "data"}.${i.format}`;
      if (i.format == "csv") {
        const c = _l(this.getState(), i);
        i.download !== !1 ? cs(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (i.format == "xlsx") {
        let c = i.styles;
        !c && c !== !1 && (c = Nl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: f, merged: g, rowSizes: m, colSizes: h, styles: w } = Cl(this.getState(), i, u), x = i.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (b) => {
            if (b.data.type == "ready") {
              const k = b.data.blob;
              i.download !== !1 ? cs(k, l) : s.result = k, o(!0);
            }
          }, y.postMessage({ type: "convert", data: { data: [{ name: i.sheetName || "data", cells: f, cols: h, rows: m, merged: g }], styles: w } });
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
              const g = this.getNextRow(u);
              g && (u = g.id, f = this.getNextEditor(g));
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
              const g = this.getPrevRow(u);
              g && (u = g.id, f = this.getPrevEditor(g));
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
      let u = -1, f = -1, g = 0, m = 0;
      if (s.column) {
        u = 0;
        const h = o.findIndex((w) => w.id == s.column);
        g = o[h].width;
        for (let w = a.left ?? 0; w < h; w++) {
          const x = o[w];
          x.hidden || (u += x.width);
        }
      }
      if (s.row && !c) {
        const h = l.findIndex((w) => w.id == s.row);
        h >= 0 && (d ? (f = l.slice(0, h).reduce((w, x) => w + (x.rowHeight || i.rowHeight), 0), m = l[h].rowHeight) : f = i.rowHeight * h);
      }
      this.setState({ scroll: { top: f, left: u, width: g, height: m || i.rowHeight } });
    }), r.on("print", (s) => {
      const o = Ll(s);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Kl()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), sn(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), To() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Fl(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
        const u = (d.rowspan === s ? l : l.slice(c, d.rowspan + c)).reduce((f, g) => f + g, 0);
        d.height = u, c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = a.width, f = a.flexgrow || 0;
        const g = d.colspan;
        for (let m = 1; m < g; m++) {
          const h = e[n + m];
          h && (h.hidden ? d.colspan -= 1 : h.flexgrow ? f += h.flexgrow : u += h.width || o.columnWidth), f ? d.flexgrow = f : d.width = u;
        }
      } else d.width = a.width, d.flexgrow = a.flexgrow;
      r === "header" && d.filter && typeof d.filter == "string" && (d.filter = { type: d.filter });
    }
    i.length > s && (i.length = s), a[r] = i;
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
      const { config: o, type: a } = n.find((l) => l.id == s).header.find((l) => l.filter).filter, i = e[s];
      r.push((l) => o?.handler ? o.handler(l[s], i) : Xl(a)(l[s], i));
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
    const a = gs(e, "header", r, n.headerHeight, o), i = gs(e, "footer", s, n.footerHeight, o), l = a.reduce((d, u) => d + u, 0), c = i.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: a, footerRowHeights: i, headerHeight: l, footerHeight: c };
  }
}
let Zl = (/* @__PURE__ */ new Date()).valueOf();
function yn() {
  return "temp://" + Zl++;
}
function Jl(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var ec = class {
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
}, Ht = [], tc = { subscribe: (t) => {
  nc();
  const e = new ec();
  return Ht.push(e), t(e), () => {
    const n = Ht.findIndex((r) => r === e);
    n >= 0 && Ht.splice(n, 1);
  };
} }, ps = !1;
function nc() {
  ps || (ps = !0, document.addEventListener("keydown", (t) => {
    if (Ht.length && (t.ctrlKey || t.altKey || t.metaKey || t.shiftKey || t.key.length > 1 || t.key === " ")) {
      const e = [];
      t.ctrlKey && e.push("ctrl"), t.altKey && e.push("alt"), t.metaKey && e.push("meta"), t.shiftKey && e.push("shift");
      let n = t.code.replace("Key", "").toLocaleLowerCase();
      t.key === " " && (n = "space"), e.push(n);
      const r = e.join("+");
      for (let s = Ht.length - 1; s >= 0; s--) {
        const o = Ht[s], a = o.store.get(r) || o.store.get(n);
        a && o.node.contains(t.target) && a(t, { key: r, evKey: n });
      }
    }
  }));
}
const rc = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Tr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(a) {
    const i = a.target;
    return i.tagName === "INPUT" || i.tagName === "TEXTAREA" || Jl(i, "data-header-id")?.classList.contains("wx-filter") || !!i.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const a in e) {
    const i = e[a];
    typeof i < "u" && (typeof i == "function" ? s[a] = i : i && (s[a] = (l) => {
      const c = r(l);
      n({ key: a, event: l, isInput: c });
    }));
  }
  const o = tc.subscribe((a) => {
    a.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function sc(t, e) {
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
function kt(t) {
  const e = t.getAttribute("data-id"), n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function oc(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function ms(t) {
  return t && t.getAttribute("data-context-id");
}
const ws = 5;
function ic(t, e) {
  let n, r, s, o, a, i, l, c, d;
  function u($) {
    o = $.clientX, a = $.clientY, i = {
      ...oc(n, t, $),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function f($) {
    n = Be($), ms(n) && (s = kt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u($.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", g), window.addEventListener("touchend", b));
  }
  function g($) {
    if (c || d)
      return $.preventDefault(), !1;
  }
  function m($) {
    $.which === 1 && (n = Be($), ms(n) && (s = kt(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", k), u($)));
  }
  function h($) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", b), document.body.style.userSelect = "", $ && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", f));
  }
  function w($) {
    const D = $.clientX - o, T = $.clientY - a;
    if (!r) {
      if (Math.abs(D) < ws && Math.abs(T) < ws || e && e.start && e.start({ id: s, e: $ }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = i.left + "px", r.style.top = i.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const V = Math.round(Math.max(0, i.top + T));
      if (e && e.move && e.move({ id: s, top: V, detail: l }) === !1)
        return;
      const _ = e.getTask(s), A = _.$y;
      if (!i.start && i.y == A) return M();
      i.start = !0, i.y = _.$y - 4, r.style.top = V + "px";
      const P = document.elementFromPoint(
        $.clientX,
        $.clientY
      ), E = Be(P);
      if (E && E !== n) {
        const I = kt(E), Y = E.getBoundingClientRect(), ie = Y.top + Y.height / 2, he = $.clientY + i.db > ie && E.nextElementSibling !== n, Q = $.clientY - i.dt < ie && E.previousElementSibling !== n;
        l?.after == I || l?.before == I ? l = null : he ? l = { id: s, after: I } : Q && (l = { id: s, before: I });
      }
    }
  }
  function x($) {
    w($);
  }
  function y($) {
    c ? ($.preventDefault(), w($.touches[0])) : d && (clearTimeout(d), d = null);
  }
  function b() {
    c = null, d && (clearTimeout(d), d = null), M();
  }
  function k() {
    M();
  }
  function M() {
    n && (n.style.visibility = ""), r && (r.parentNode.removeChild(r), e && e.end && e.end({ id: s, top: i.top })), s = n = r = i = l = null, h();
  }
  return t.style.position !== "absolute" && (t.style.position = "relative"), t.addEventListener("mousedown", m), t.addEventListener("touchstart", f), {
    destroy() {
      h(!0);
    }
  };
}
const ac = {
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
function Eo(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = Eo(n.data, e)), r;
  });
}
function Ro(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = Ro(r.data, e);
      s.length && n.push({ ...r, data: s });
    } else
      e(r) && n.push(r);
  }), n;
}
let lc = 1;
function cc(t) {
  return Eo(t, (e) => {
    const n = { ...e, id: e.id || lc++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Io = {};
function dc(t) {
  return Io[t] || t;
}
function uc(t, e) {
  Io[t] = e;
}
function fc({ onClick: t, onShow: e, option: n }) {
  const r = z(null), s = R(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = N(() => n && n.comp ? dc(n.comp) : null, [n]);
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
  const [c, d] = K(-1e4), [u, f] = K(-1e4), [g, m] = K(20), [h, w] = K(), x = z(null), [y, b] = K(!1), [k, M] = K(null), $ = R(() => {
    const A = ti(x.current, s, r, e, n);
    A && (d(A.x), f(A.y), m(A.z), w(A.width));
  }, [s, r, e, n]);
  F(() => {
    o && o($);
  }, []);
  const D = R(() => {
    b(!1);
  }, []), T = R(() => {
    l && l({ action: null, option: null });
  }, [l]), V = R((A, P) => {
    b(A), M(P);
  }, []), _ = N(() => cc(t), [t]);
  return F(() => {
    $();
  }, [s, $]), F(() => {
    if (x.current)
      return Jt(x.current, { callback: T, modal: !0 }).destroy;
  }, [T]), /* @__PURE__ */ p(
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
        zIndex: g
      },
      onMouseLeave: D,
      children: _.map((A) => /* @__PURE__ */ Z(Ds, { children: [
        A.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          fc,
          {
            option: A,
            onShow: V,
            onClick: (P) => {
              if (!A.data && !P.defaultPrevented) {
                const E = { context: a, action: A, option: A, event: P };
                A.handler && A.handler(E), l && l(E), P.stopPropagation();
              }
            }
          }
        ),
        A.data && y === A.id ? /* @__PURE__ */ p(
          Mr,
          {
            css: i,
            options: A.data,
            at: "right-overlap",
            parent: k,
            context: a,
            onClick: l
          }
        ) : null
      ] }, A.id))
    }
  );
}
const hc = Ct(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: a = null,
    css: i = "",
    children: l,
    onClick: c
  } = t, [d, u] = K(null), [f, g] = K(null), [m, h] = K(0), [w, x] = K(0), y = N(() => d !== null && a ? Ro(n, ($) => a($, d)) : n, [d, a, n]), b = R(
    ($) => {
      g(null), c && c($);
    },
    [c]
  ), k = R(($, D) => {
    let T = null;
    for (; $ && $.dataset && !T; )
      T = $.dataset[D], $ = $.parentNode;
    return T ? Wt(T) : null;
  }, []), M = R(
    ($, D) => {
      if (!$) {
        g(null);
        return;
      }
      if ($.defaultPrevented) return;
      const T = $.target;
      if (T && T.dataset && T.dataset.menuIgnore) return;
      h($.clientX + 1), x($.clientY + 1);
      let V = typeof D < "u" ? D : k(T, o);
      s && (V = s(V, $), !V) || (u(V), g(T), $.preventDefault());
    },
    [o, k, s]
  );
  return Nt(e, () => ({ show: M }), [M]), /* @__PURE__ */ Z(Ie, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: M, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    f ? /* @__PURE__ */ p(Ws, { children: /* @__PURE__ */ p(
      Mr,
      {
        css: i,
        at: r,
        top: w,
        left: m,
        parent: f,
        context: d,
        onClick: b,
        options: y
      },
      f
    ) }) : null
  ] });
});
Ct(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: a } = t, [i, l] = K(null);
  function c(m) {
    l(null), a && a(m);
  }
  const d = R((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Nt(e, () => ({ show: d }), [d]);
  function u(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; )
      l(h), h = h.parentNode;
  }
  const f = z(0), g = z(i);
  return F(() => {
    g.current !== i && (f.current += 1, g.current = i);
  }, [i]), /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    i ? /* @__PURE__ */ p(Ws, { children: /* @__PURE__ */ p(
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
const Ao = Ct(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: a = null,
    css: i = "",
    children: l,
    onClick: c
  } = t, d = z(null), u = R((f, g) => {
    d.current.show(f, g);
  }, []);
  return Nt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ Z(Ie, { children: [
    l ? /* @__PURE__ */ p("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ p(
      hc,
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
}), Ho = {};
function gc(t) {
  return Ho[t] || t;
}
function Ft(t, e) {
  Ho[t] = e;
}
function Lo({ menu: t = !1 }) {
  return /* @__PURE__ */ p("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Po() {
  return /* @__PURE__ */ p("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const pc = ({ key: t, text: e, ...n }) => n;
function Er(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, a = N(
    () => gc(e.comp || "label"),
    [e]
  ), i = R(() => {
    e && e.handler && e.handler(e), s && s({ item: e });
  }, [e, s]), l = N(() => e && e.key && r ? r[e.key] : void 0, [e, r]), c = R(
    ({ value: u }) => {
      e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
    },
    [e, o]
  ), d = N(() => n ? e ? e.menuText || e.text : void 0 : e ? e.text : void 0, [n, e]);
  if (e && e.comp == "spacer")
    return /* @__PURE__ */ p(Po, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ p(Lo, { menu: n });
  {
    const u = a, f = [
      "wx-tb-element",
      e && e.css ? e.css : "",
      e && e.spacer ? "wx-spacer" : "",
      n ? "wx-menu" : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ p(
      "div",
      {
        className: "wx-KVAsgMam " + f,
        "data-id": e ? e.id : void 0,
        children: /* @__PURE__ */ p(
          u,
          {
            value: l,
            onChange: c,
            onClick: i,
            text: d,
            menu: n,
            ...pc(e)
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
  const [o, a] = K(!0), i = () => a(!0), l = () => a(!1), c = (u) => {
    i(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ Z("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ p("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ p("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ p(Ot, { width: "", oncancel: i, children: /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ p(
      Dn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, f) => u.items ? /* @__PURE__ */ p(
        Dn,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || f
      ) : /* @__PURE__ */ p(
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
    t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label", children: t.text }) : null
  ] }) });
}
function mc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [a, i] = K(void 0), l = z(null);
  function c() {
    i(null);
  }
  function d() {
    i(!0);
  }
  function u(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ p(ut, { icon: "wxi-dots-h", onClick: d }),
        a ? /* @__PURE__ */ p(Ot, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ p("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (f, g) => f.items ? /* @__PURE__ */ p(
            Dn,
            {
              item: f,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            f.id || g
          ) : /* @__PURE__ */ p(
            Er,
            {
              item: f,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            f.id || g
          )
        ) }) }) : null
      ]
    }
  );
}
function wc(t) {
  return t.forEach((e) => {
    e.id || (e.id = pr());
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
  } = t, [l, c] = Oe(e || []), [d, u] = Oe(s || null), f = N(() => wc(l), [l]), g = z(null), m = z(-1), [h, w] = K([]), x = z(f);
  F(() => {
    x.current = f;
  }, [l]);
  const y = z(o);
  F(() => {
    y.current = o;
  }, [o]);
  const b = z(h);
  F(() => {
    b.current = h;
  }, [h]);
  const k = z(!1);
  function M(_) {
    d && (d[_.item.key] = _.value, u({ ...d })), i && i(_);
  }
  function $() {
    const _ = g.current;
    if (!_) return 0;
    const A = _.children, P = x.current || [];
    let E = 0;
    for (let I = 0; I < P.length; I++)
      P[I].comp !== "spacer" && (E += A[I].clientWidth, P[I].comp === "separator" && (E += 8));
    return E;
  }
  function D() {
    const _ = g.current, A = x.current || [];
    if (_) {
      for (let P = A.length - 1; P >= 0; P--)
        if (A[P].items && !A[P].collapsed) {
          A[P].collapsed = !0, A[P].$width = _.children[P].offsetWidth, k.current = !0, c([...A]);
          return;
        }
    }
  }
  function T(_) {
    const A = g.current, P = x.current || [];
    if (A) {
      for (let E = 0; E < P.length; E++)
        if (P[E].collapsed && P[E].$width) {
          P[E].$width - A.children[E].offsetWidth < _ + 10 && (P[E].collapsed = !1, k.current = !0), c([...P]);
          return;
        }
    }
  }
  function V() {
    const _ = g.current;
    if (!_) return;
    const A = x.current || [], P = y.current;
    if (P === "wrap") return;
    const E = _.clientWidth;
    if (_.scrollWidth > E) {
      if (P === "collapse") return D();
      const I = _.children;
      let Y = 0;
      for (let ie = 0; ie < A.length; ie++) {
        if (Y += I[ie].clientWidth, A[ie].comp === "separator" && (Y += 8), Y > E - 40) {
          if (m.current === ie) return;
          m.current = ie;
          const he = [];
          for (let Q = ie; Q < A.length; Q++)
            he.push(A[Q]), I[Q].style.visibility = "hidden";
          ie > 0 && A[ie - 1].comp === "separator" && (I[ie - 1].style.visibility = "hidden"), w(he);
          break;
        }
        I[ie].style.visibility = "";
      }
    } else {
      const I = E - $();
      if (I <= 0) return;
      if (P === "collapse") return T(I);
      if ((b.current || []).length) {
        m.current = null;
        const Y = _.children;
        for (let ie = 0; ie < A.length; ie++)
          Y[ie].style.visibility = "";
        w([]);
      }
    }
  }
  return F(() => {
    k.current && (k.current = !1, V());
  }, [l]), F(() => {
    const _ = new ResizeObserver(() => V());
    return g.current && _.observe(g.current), () => {
      _.disconnect();
    };
  }, []), /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: g,
      children: [
        f.map(
          (_) => _.items ? /* @__PURE__ */ p(
            Dn,
            {
              item: _,
              values: d,
              onClick: a,
              onChange: M
            },
            _.id
          ) : /* @__PURE__ */ p(
            Er,
            {
              item: _,
              values: d,
              onClick: a,
              onChange: M
            },
            _.id
          )
        ),
        !!h.length && /* @__PURE__ */ p(
          mc,
          {
            items: h,
            css: n,
            values: d,
            onClick: a,
            onChange: M
          }
        )
      ]
    }
  );
}
function xc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: a, onClick: i } = t;
  return a ? /* @__PURE__ */ Z("div", { className: "wx-HXpG4gnx wx-item", onClick: i, children: [
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
      onClick: i
    }
  );
}
function yc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function vc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: a, onClick: i } = t;
  return a ? /* @__PURE__ */ Z("div", { className: "wx-3cuSqONJ wx-item", onClick: i, children: [
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
      onClick: i
    }
  );
}
function kc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ Z("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ p("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Ft("button", xc);
Ft("separator", Lo);
Ft("spacer", Po);
Ft("label", yc);
Ft("item", kc);
Ft("icon", vc);
const et = Pt(null);
function bc(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const xs = 5, Sc = 700;
function $c(t) {
  return Wt(t.getAttribute("data-id"));
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
function fr(t, e) {
  const n = vn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function _c(t, e) {
  const n = e.current;
  let r = null, s, o, a = !1, i = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(D) {
    const T = Be(D);
    T && (r = {
      container: l,
      sourceNode: D.target,
      from: $c(T),
      pos: fr(D, t)
    }, o = r.pos, u(D));
  }
  function u(D) {
    if (!r) return;
    const T = r.pos = fr(D, t);
    if (!a) {
      if (!i && !D?.target?.getAttribute("draggable-data") && Math.abs(o.x - T.x) < xs && Math.abs(o.y - T.y) < xs)
        return;
      if (M(D) === !1) return $();
    }
    if (i) {
      const V = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, _ = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        D.pageX - V,
        D.pageY - _
      );
    } else r.targetNode = D.target;
    n.move && n.move(D, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function f(D) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", a && n.end && n.end(D, r), r = o = null, $();
  }
  function g(D) {
    n.getReorder && !n.getReorder() || D.button === 0 && (k(D), window.addEventListener("mousemove", m), window.addEventListener("mouseup", h), d(D));
  }
  function m(D) {
    u(D);
  }
  function h(D) {
    f(D);
  }
  function w(D) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      i = !0, d(D.touches[0]);
    }, Sc), k(D);
    function T() {
      s && c(), D.target.removeEventListener("touchmove", x), D.target.removeEventListener("touchend", T), f(D);
    }
    D.target.addEventListener("touchmove", x), D.target.addEventListener("touchend", T), t.addEventListener("contextmenu", y);
  }
  function x(D) {
    a ? (D.preventDefault(), u(D.touches[0])) : s && c();
  }
  function y(D) {
    if (a || s)
      return D.preventDefault(), !1;
  }
  function b(D) {
    D.preventDefault();
  }
  function k(D) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: T } = n.getDraggableInfo();
    (!T || D.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function M(D) {
    if (a = !0, n.start) {
      if (n.start(D, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function $(D) {
    a = i = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", h), D && (t.removeEventListener("mousedown", g), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", b));
  }
  return t.addEventListener("mousedown", g), t.addEventListener("touchstart", w), t.addEventListener("dragstart", b), {
    destroy() {
      $(!0);
    }
  };
}
const Cc = 4e-3;
function Nc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function Dc(t, e, n, r) {
  const { node: s, left: o, top: a, bottom: i, sense: l, xScroll: c, yScroll: d } = r, u = fr(t, s);
  n.scrollState || (n.scrollState = Nc());
  let f = 0, g = 0;
  u.x < o + l ? f = -1 : u.x > e.width - l && (f = 1), u.y < a + Math.round(l / 2) ? g = -1 : u.y > e.height - i - Math.round(l / 2) && (g = 1), (n.scrollState.dirX !== f || n.scrollState.dirY !== g) && (Wo(n), n.scrollState.dirX = f, n.scrollState.dirY = g), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && Tc(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Tc(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      Mc,
      15,
      t,
      e,
      n
    );
  }, 250));
}
function Wo(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function Mc(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += Cc, r !== 0 && Rc(t, e, r), s !== 0 && Ec(t, e, s);
}
function Ec(t, e, n) {
  const r = e.node.scrollTop;
  zo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Rc(t, e, n) {
  const r = e.node.scrollLeft;
  zo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function zo(t, e, n) {
  n.node[e] = t;
}
function An(t, e, n, r, s, o) {
  const a = {};
  return t && (a.width = `${t}px`, a.minWidth = `${t}px`), e && (a.flexGrow = e), o && (a.height = `${o}px`), n && (a.position = "sticky", n.left && (a.left = `${r}px`), n.right && (a.right = `${s}px`)), a;
}
function Oo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Ic(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [a, i] = Oe(t.focusable), l = $e(et), c = re(l, "focusCell"), d = re(l, "search"), u = re(l, "reorder"), f = N(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), g = N(
    () => An(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m($, D) {
    let T = "wx-cell";
    return T += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", T += $ ? " " + $(n) : "", T += D ? " " + D(e, n) : "", T += n.treetoggle ? " wx-tree-cell" : "", T;
  }
  const h = N(
    () => m(s, r),
    [s, r, n, e]
  ), w = N(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = z(null);
  F(() => {
    x.current && a && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, a, e.id, n.id]);
  const y = R(() => {
    a && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, a, c, e.id, n.id]);
  F(() => () => {
    a && c && (l.exec("focus-cell", { eventSource: "destroy" }), i(!1));
  }, [l, i]);
  function b($) {
    const D = new RegExp(`(${d.value.trim()})`, "gi");
    return String($).split(D).map((T) => ({ text: T, highlight: D.test(T) }));
  }
  const k = N(() => {
    const $ = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, D = n.fixed && n.fixed.right;
    return [
      h,
      $ ? "wx-shadow" : "",
      D ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [h, n]), M = n.cell;
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-TSCaXsGV " + k,
      ref: x,
      onFocus: y,
      style: g,
      "data-row-id": e.id,
      "data-col-id": n.id,
      tabIndex: a ? "0" : "-1",
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
        n.treetoggle ? /* @__PURE__ */ Z(Ie, { children: [
          /* @__PURE__ */ p("span", { style: { marginLeft: `${e.$level * 28}px` } }),
          e.$count ? /* @__PURE__ */ p(
            "i",
            {
              "data-action": "toggle-row",
              className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? "down" : "right"}`
            }
          ) : null
        ] }) : null,
        M ? /* @__PURE__ */ p(
          M,
          {
            api: l,
            row: e,
            column: n,
            onAction: ({ action: $, data: D }) => l.exec($, D)
          }
        ) : o ? o() : f ? /* @__PURE__ */ p("span", { children: b(mt(e, n)).map(
          ({ highlight: $, text: D }, T) => $ ? /* @__PURE__ */ p("mark", { className: "wx-TSCaXsGV wx-search", children: D }, T) : /* @__PURE__ */ p("span", { children: D }, T)
        ) }) : mt(e, n)
      ]
    }
  );
}
function ys(t, e) {
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
function Ac({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(
    rn,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Hc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = $e(et), o = re(s, "flatData"), a = N(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), i = N(() => t?.config?.template, [t]);
  function l() {
    const u = [];
    return o.forEach((f) => {
      const g = _t(f, e);
      u.includes(g) || u.push(g);
    }), u.map((f) => ({ id: f, label: f }));
  }
  function c({ value: u }) {
    n({ value: u, key: e.id });
  }
  function d(u) {
    u.key !== "Tab" && u.preventDefault();
  }
  return /* @__PURE__ */ p("div", { style: { width: "100%" }, onKeyDown: d, children: /* @__PURE__ */ p(
    Ls,
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
const Lc = {
  text: Ac,
  richselect: Hc
};
function Pc({ filter: t, column: e }) {
  const n = $e(et), r = re(n, "filterValues");
  function s(a) {
    n.exec("filter-rows", a);
  }
  const o = N(() => Lc[t.type], [t.type]);
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
function Wc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: a,
    bodyHeight: i,
    hasSplit: l
  } = t, c = $e(et), d = re(c, "sortMarks"), u = N(() => d ? d[n.id] : void 0, [d, n.id]), f = z(), g = R(
    (I) => {
      f.current = e.flexgrow ? I.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = R(
    (I, Y) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (f.current || 0) + I),
        inProgress: Y
      });
    },
    [c, e.id]
  ), h = R((I) => m(I, !0), [m]), w = R((I) => m(I, !1), [m]), x = R(
    (I) => {
      if (!n.sort || e.filter) return;
      let Y = u?.order;
      Y && (Y = Y === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: I.ctrlKey, order: Y });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = R(
    (I) => {
      I && I.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), b = R(
    (I) => {
      I.key === "Enter" && y();
    },
    [y]
  ), k = R(
    (I) => {
      I.key === "Enter" && !e.filter && x(I);
    },
    [x, e.filter]
  ), M = N(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), $ = N(
    () => M && !l && e.collapsible !== "header",
    [M, l, e.collapsible]
  ), D = N(
    () => $ ? { top: -i / 2, position: "absolute" } : {},
    [$, i]
  ), T = N(
    () => An(
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right ?? n.right,
      e.height + (M && $ ? i : 0)
    ),
    [
      e.width,
      e.flexgrow,
      n.fixed,
      n.left,
      e.right,
      n.right,
      e.height,
      M,
      $,
      i
    ]
  ), V = N(
    () => Oo(n, e, a),
    [n, e, a]
  ), _ = R(() => Object.fromEntries(
    Object.entries(e).filter(([I]) => I !== "cell")
  ), [e]), A = `wx-cell ${V} ${e.css || ""} wx-collapsed`, P = [
    "wx-cell",
    V,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), E = z(null);
  return F(() => {
    const I = E.current;
    if (!I) return;
    const Y = ys(I, { down: g, move: h, up: w });
    return () => {
      typeof Y == "function" && Y();
    };
  }, [g, h, w, ys]), M ? /* @__PURE__ */ p(
    "div",
    {
      className: "wx-RsQD74qC " + A,
      style: T,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: b,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", style: D, children: e.text || "" })
    }
  ) : /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-RsQD74qC " + P,
      style: T,
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
              onAction: ({ action: Y, data: ie }) => c.exec(Y, ie)
            }
          );
        })() : e.filter ? /* @__PURE__ */ p(Pc, { filter: e.filter, column: n }) : /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: E,
            onClick: (I) => I.stopPropagation(),
            children: /* @__PURE__ */ p("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ Z(Ie, { children: [
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
function zc({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = $e(et), o = N(
    () => An(
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
  ), a = N(
    () => Oo(e, t, r),
    [e, t, r]
  ), i = R(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${a || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ p("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? Bo.createElement(t.cell, {
    api: s,
    cell: i(),
    column: e,
    row: n,
    onAction: ({ action: c, data: d }) => s.exec(c, d)
  }) : /* @__PURE__ */ p("div", { className: "wx-6Sdi3Dfd wx-text", children: t?.text || "" }) : null });
}
function vs({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = "header",
  columnStyle: s,
  bodyHeight: o
}) {
  const a = $e(et), i = re(a, "_sizes"), l = re(a, "split"), c = N(() => i?.[`${r}RowHeights`], [i, r]), d = N(() => {
    let h = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        h.push([]), n.forEach((b, k) => {
          const M = { ...b[r][x] };
          if (y || h[x].push(M), M.colspan > 1) {
            if (y = M.colspan - 1, !To() && b.right) {
              let $ = b.right;
              for (let D = 1; D < M.colspan; D++)
                $ -= n[k + D].width;
              M.right = $;
            }
          } else y && y--;
        });
      }
    }
    return h;
  }, [n, r]), u = N(() => l?.left || l?.right, [l]);
  function f(h) {
    return n.find((w) => w.id === h);
  }
  function g(h, w) {
    let x = w;
    return h.rowspan && (x += h.rowspan - 1), x === d.length - 1;
  }
  function m(h, w, x) {
    if (!x.sort) return !1;
    for (let y = d.length - 1; y >= 0; y--) {
      const b = x.header[y];
      if (!b.filter && !b._hidden) return w === y;
    }
    return g(h, w);
  }
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-sAsPVaUK wx-${r}`,
      style: { paddingLeft: `${t}px`, width: `${e}px` },
      role: "rowgroup",
      children: d.map((h, w) => /* @__PURE__ */ p(
        "div",
        {
          className: r === "header" ? "wx-sAsPVaUK wx-h-row" : "wx-sAsPVaUK wx-f-row",
          style: { height: `${c?.[w]}px`, display: "flex" },
          role: "row",
          children: h.map((x) => {
            const y = f(x.id);
            return r === "header" ? /* @__PURE__ */ p(
              Wc,
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
              zc,
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
function Oc({ overlay: t }) {
  const e = $e(et);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Fc(t) {
  const { actions: e, editor: n } = t, [r, s] = K(n?.value || ""), o = z(null);
  F(() => {
    o.current && o.current.focus();
  }, []);
  function a() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function i({ key: l }) {
    l === "Enter" && e.save();
  }
  return /* @__PURE__ */ p(
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
function Yc({ actions: t, editor: e, onAction: n }) {
  const [r, s] = K(e?.value), [o, a] = K(e?.renderedValue), [i, l] = K(e?.options || []), c = N(() => e?.config?.template, [e]), d = N(() => e?.config?.cell, [e]), u = N(() => (i || []).findIndex((y) => y.id === r), [i, r]), f = z(null), g = z(null), m = R(
    (y) => {
      f.current = y.navigate, g.current = y.keydown, f.current(u);
    },
    [u, f]
  ), h = R(
    (y) => {
      const b = y?.target?.value ?? "";
      a(b);
      const k = b ? (e?.options || []).filter(
        (M) => (M.label || "").toLowerCase().includes(b.toLowerCase())
      ) : e?.options || [];
      l(k), k.length ? f.current(-1 / 0) : f.current(null);
    },
    [e]
  ), w = z(null);
  F(() => {
    w.current && w.current.focus();
  }, []), F(() => {
    s(e?.value), a(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = R(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p(
      "input",
      {
        className: "wx-0UYfSd1x wx-input",
        ref: w,
        value: o ?? "",
        onChange: h,
        onKeyDown: (y) => g.current ? g.current(y, u) : void 0
      }
    ),
    /* @__PURE__ */ p(
      Tn,
      {
        items: i,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ p(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Vc({ actions: t, editor: e, onAction: n }) {
  const [r] = K(() => e.value || /* @__PURE__ */ new Date()), [s] = K(() => e.config?.template), [o] = K(() => e.config?.cell);
  function a({ value: l }) {
    t.updateValue(l), t.save();
  }
  const i = z(null);
  return F(() => {
    i.current && i.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-lNWNYUb6 wx-value",
        ref: i,
        tabIndex: 0,
        onClick: () => t.cancel(),
        onKeyDown: (l) => l.preventDefault(),
        children: s ? s(r) : o ? /* @__PURE__ */ p(o, { data: e.value, onAction: n }) : /* @__PURE__ */ p("span", { className: "wx-lNWNYUb6 wx-text", children: e.renderedValue })
      }
    ),
    /* @__PURE__ */ p(Ot, { width: "auto", children: /* @__PURE__ */ p(
      Hs,
      {
        value: r,
        onChange: a,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Gc(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = K(
    n.options.find((h) => h.id === n.value)
  ), [a] = K(n.value), [i] = K(n.options), l = N(
    () => i.findIndex((h) => h.id === a),
    [i, a]
  );
  function c({ id: h }) {
    e.updateValue(h), e.save();
  }
  let d;
  const [u, f] = K();
  function g(h) {
    d = h.navigate, f(() => h.keydown), d(l);
  }
  const m = z(null);
  return F(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p(
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
          return /* @__PURE__ */ p(h, { data: o, onAction: r });
        })() : /* @__PURE__ */ p("span", { className: "wx-ywGRk611 wx-text", children: n.renderedValue })
      }
    ),
    /* @__PURE__ */ p(Tn, { items: i, onReady: g, onSelect: c, children: ({ option: h }) => s.template ? s.template(h) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ p(w, { data: h, onAction: r });
    })() : h.label })
  ] });
}
const Bc = {
  text: Fc,
  combo: Yc,
  datepicker: Vc,
  richselect: Gc
};
function Kc({ column: t, row: e }) {
  const n = $e(et), r = re(n, "editor"), s = R(
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
  ), a = R(() => {
    s(!0, { row: r?.id, column: r?.column });
  }, [r, s]), i = R(
    (m) => {
      n.exec("editor", { value: m });
    },
    [n]
  ), l = R(
    (m) => {
      m.key === "Enter" && r && a();
    },
    [r, a]
  ), c = N(
    () => An(
      t.width,
      t.flexgrow,
      t.fixed,
      t.left,
      t.right
    ),
    [t.width, t.flexgrow, t.fixed, t.left, t.right]
  ), d = N(() => {
    let m = t.editor;
    typeof m == "function" && (m = m(e, t));
    let h = typeof m == "string" ? m : m.type;
    return Bc[h];
  }, [t, e]), u = z(null);
  F(() => {
    if (!u.current) return;
    const m = Jt(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), F(() => {
    u.current && typeof c == "string" && u.current.setAttribute("style", c);
  }, [c]);
  const f = typeof e.$parent < "u" ? "gridcell" : "cell", g = typeof e.$parent < "u" ? !t.editor : void 0;
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-8l724t2g wx-cell wx-editor",
      ref: u,
      style: typeof c == "object" && c !== null ? c : void 0,
      role: f,
      "aria-readonly": g,
      tabIndex: -1,
      onClick: (m) => m.stopPropagation(),
      onDoubleClick: (m) => m.stopPropagation(),
      onKeyDown: l,
      children: d ? /* @__PURE__ */ p(
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
function ks(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = $e(et), { filterValues: o, _columns: a, _sizes: i } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(Ie, { children: e.map((c, d) => /* @__PURE__ */ p("tr", { children: c.map((u) => {
    const f = a.find((h) => h.id == u.id), g = `wx-print-cell-${n}${l(f)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ p(
      "th",
      {
        style: Rs(Do(u, i.columnWidth)),
        className: "wx-Gy81xq2u " + g,
        rowSpan: u.rowspan,
        colSpan: u.colspan,
        children: m ? /* @__PURE__ */ p(
          m,
          {
            api: s,
            cell: Object.fromEntries(
              Object.entries(u).filter(([h]) => h !== "cell")
            ),
            column: f,
            row: d
          }
        ) : u.filter ? /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-print-filter", children: Pl(o, a, u) }) : /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function jc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: a, reorder: i } = t, l = $e(et), { flatData: c, _sizes: d } = l.getState(), u = o && fs(e, "header", d.headerRowHeights), f = a && fs(e, "footer", d.footerRowHeights);
  function g(h, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(h, w) : "", x;
  }
  function m(h, w) {
    return typeof w.draggable == "function" ? w.draggable(h, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ Z(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p(
          ks,
          {
            columns: u,
            type: "header",
            columnStyle: r
          }
        ) }) : null,
        /* @__PURE__ */ p("tbody", { children: c.map((h, w) => /* @__PURE__ */ p(
          "tr",
          {
            className: "wx-8NTMLH0z wx-row" + (n ? " " + n(h) : ""),
            style: { height: `${h.rowHeight || d.rowHeight}px` },
            children: e.map(
              (x) => x.collapsed ? null : /* @__PURE__ */ Z(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(h, x)}`,
                  style: Rs(
                    Do(x, d.columnWidth)
                  ),
                  children: [
                    i && x.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(h, x) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ Z(Ie, { children: [
                      /* @__PURE__ */ p(
                        "span",
                        {
                          style: { marginLeft: h.$level * 28 + "px" }
                        }
                      ),
                      h.$count ? /* @__PURE__ */ p(
                        "i",
                        {
                          className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${h.open !== !1 ? "down" : "right"}`
                        }
                      ) : null
                    ] }) : null,
                    x.cell ? (() => {
                      const y = x.cell;
                      return /* @__PURE__ */ p(y, { api: l, row: h, column: x });
                    })() : /* @__PURE__ */ p("span", { children: mt(h, x) })
                  ]
                },
                x.id
              )
            )
          },
          w
        )) }),
        a ? /* @__PURE__ */ p("tfoot", { children: /* @__PURE__ */ p(
          ks,
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
function Uc(t) {
  const { config: e, ...n } = t, r = $e(et), { _skin: s, _columns: o } = r.getState(), a = N(() => Il(o, e), []), i = z(null);
  return F(() => {
    const l = document.body;
    l.classList.add("wx-print");
    const c = i.current;
    if (!c) return;
    const d = c.cloneNode(!0);
    l.appendChild(d);
    const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`, f = document.createElement("style");
    f.setAttribute("type", "text/css"), f.setAttribute("media", "print"), document.getElementsByTagName("head")[0].appendChild(f), f.appendChild(document.createTextNode(u)), window.print(), f.remove(), l.classList.remove("wx-print"), d.remove();
  }, []), /* @__PURE__ */ p(
    "div",
    {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: i,
      children: a.map((l, c) => /* @__PURE__ */ p("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ p(jc, { columns: l, ...n }) }, c))
    }
  );
}
function qc(t) {
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
    responsiveLevel: g,
    hotkeys: m
  } = t, h = $e(et), w = re(h, "dynamic"), x = re(h, "_columns"), y = re(h, "flatData"), b = re(h, "split"), k = re(h, "_sizes"), [M, $] = Ut(h, "selectedRows"), D = re(h, "select"), T = re(h, "editor"), V = re(h, "tree"), _ = re(h, "focusCell"), A = re(h, "_print"), P = re(h, "undo"), E = re(h, "reorder"), I = re(h, "_rowHeightFromData"), [Y, ie] = K(0);
  F(() => {
    ie(Ln());
  }, []);
  const [he, Q] = K(0), [fe, ye] = K(0), L = N(() => (x || []).some((v) => !v.hidden && v.flexgrow), [x]), se = N(() => k?.rowHeight || 0, [k]), xe = z(null), [ge, oe] = K(null), [G, le] = K(null), ee = N(() => {
    let v = [], C = 0;
    return b && b.left && (v = (x || []).slice(0, b.left).filter((H) => !H.hidden).map((H) => ({ ...H })), v.forEach((H) => {
      H.fixed = { left: 1 }, H.left = C, C += H.width;
    }), v.length && (v[v.length - 1].fixed = { left: -1 })), { columns: v, width: C };
  }, [b, x]), ae = N(() => {
    let v = [], C = 0;
    if (b && b.right) {
      v = (x || []).slice(b.right * -1).filter((H) => !H.hidden).map((H) => ({ ...H }));
      for (let H = v.length - 1; H >= 0; H--) {
        const B = v[H];
        B.fixed = { right: 1 }, B.right = C, C += B.width;
      }
      v.length && (v[0].fixed = { right: -1 });
    }
    return { columns: v, width: C };
  }, [b, x]), te = N(() => {
    const v = (x || []).slice(b?.left || 0, (x || []).length - (b?.right ?? 0)).filter((C) => !C.hidden);
    return v.forEach((C) => {
      C.fixed = 0;
    }), v;
  }, [x, b]), pe = N(() => (x || []).reduce((v, C) => (C.hidden || (v += C.width), v), 0), [x]), Se = 1;
  function ne(v, C, H) {
    let B = C, U = v;
    if (te.length) {
      let j = te.length;
      for (let O = v; O >= 0; O--)
        te[O][H].forEach((ce) => {
          ce.colspan > 1 && O > v - ce.colspan && O < j && (j = O);
        });
      if (j !== te.length && j < v) {
        for (let O = j; O < v; O++)
          B -= te[O].width;
        U = j;
      }
    }
    return { index: U, delta: B };
  }
  const ue = N(() => {
    let v, C, H;
    const B = he, U = he + (u || 0);
    let j = 0, O = 0, ce = 0, Ne = 0;
    te.forEach((Je, yt) => {
      B > ce && (j = yt, Ne = ce), ce = ce + Je.width, U > ce && (O = yt + Se);
    });
    const He = { header: 0, footer: 0 };
    for (let Je = O; Je >= j; Je--)
      ["header", "footer"].forEach((yt) => {
        te[Je] && te[Je][yt].forEach((Rr) => {
          const dn = Rr.colspan;
          if (dn && dn > 1) {
            const Wn = dn - (O - Je + 1);
            Wn > 0 && (He[yt] = Math.max(He[yt], Wn));
          }
        });
      });
    const De = ne(j, Ne, "header"), Ye = ne(j, Ne, "footer"), je = De.delta, Fe = De.index, at = Ye.delta, lt = Ye.index;
    return L && pe > (u || 0) ? v = C = H = [...ee.columns, ...te, ...ae.columns] : (v = [
      ...ee.columns,
      ...te.slice(j, O + 1),
      ...ae.columns
    ], C = [
      ...ee.columns,
      ...te.slice(Fe, O + He.header + 1),
      ...ae.columns
    ], H = [
      ...ee.columns,
      ...te.slice(lt, O + He.footer + 1),
      ...ae.columns
    ]), {
      data: v || [],
      header: C || [],
      footer: H || [],
      d: Ne,
      df: at,
      dh: je
    };
  }, [
    te,
    ee,
    ae,
    he,
    u,
    L,
    pe
  ]), be = N(
    () => e && k?.headerHeight || 0,
    [e, k]
  ), ve = N(
    () => n && k?.footerHeight || 0,
    [n, k]
  ), Pe = N(() => u && f ? pe >= u : !1, [u, f, pe]), q = N(() => (f || 0) - be - ve - (Pe ? Y : 0), [f, be, ve, Pe, Y]), ke = N(() => Math.ceil((q || 0) / (se || 1)) + 1, [q, se]), Ce = z([]), [me, we] = K(0), [Te, Ae] = K(void 0), Me = N(() => {
    let v = 0, C = 0;
    const H = 2;
    if (c) {
      let j = fe;
      for (; j > 0; )
        j -= Ce.current[v] || se, v++;
      C = fe - j;
      for (let O = Math.max(0, v - H - 1); O < v; O++)
        C -= Ce.current[v - O] || se;
      v = Math.max(0, v - H);
    } else {
      if (I) {
        let j = 0, O = 0;
        for (let De = 0; De < (y || []).length; De++) {
          const Ye = y[De].rowHeight || se;
          if (O + Ye > fe) {
            j = De;
            break;
          }
          O += Ye;
        }
        v = Math.max(0, j - H);
        for (let De = 0; De < v; De++)
          C += y[De].rowHeight || se;
        let ce = 0, Ne = 0;
        for (let De = j + 1; De < (y || []).length; De++) {
          const Ye = y[De].rowHeight || se;
          if (ce++, Ne + Ye > q)
            break;
          Ne += Ye;
        }
        const He = Math.min(
          w ? w.rowCount : (y || []).length,
          j + ce + H
        );
        return { d: C, start: v, end: He };
      }
      v = Math.floor(fe / (se || 1)), v = Math.max(0, v - H), C = v * (se || 0);
    }
    const B = w ? w.rowCount : (y || []).length, U = Math.min(B, v + (ke || 0) + H);
    return { d: C, start: v, end: U };
  }, [c, I, fe, se, w, y, ke, q]), Le = N(() => {
    const v = w ? w.rowCount : (y || []).length;
    if (c)
      return me + Me.d + (v - (Te || 0)) * (se || 0);
    if (!I)
      return v * (se || 0);
    let C = 0;
    for (let H = 0; H < v; H++)
      C += y[H]?.rowHeight || se;
    return C;
  }, [
    w,
    y,
    se,
    c,
    I,
    me,
    Me.d,
    Te
  ]), We = N(() => u && f ? Le + be + ve >= f - (pe >= (u || 0) ? Y : 0) : !1, [
    u,
    f,
    Le,
    be,
    ve,
    pe,
    Y
  ]), Ze = N(() => L && pe <= (u || 0) ? (u || 0) - 0 - (We ? Y : 0) : pe, [L, pe, u, We, Y, Pe]), W = N(() => L && pe <= (u || 0) ? u || 0 : Ze < (u || 0) ? pe + (We ? Y : 0) : -1, [L, pe, u, Ze, We, Y]), J = z({});
  F(() => {
    if (w && (J.current.start !== Me.start || J.current.end !== Me.end)) {
      const { start: v, end: C } = Me;
      J.current = { start: v, end: C }, h && h.exec && h.exec("request-data", { row: { start: v, end: C } });
    }
  }, [w, Me, h]);
  const X = N(() => w ? y || [] : (y || []).slice(Me.start, Me.end), [w, y, Me]), de = N(() => (M || []).filter(
    (v) => (X || []).some((C) => C.id === v)
  ), [$, X]), Ee = N(() => Me.start, [Me.start]), Re = R((v) => {
    ye(v.target.scrollTop), Q(v.target.scrollLeft);
  }, []), ze = R((v) => {
    v.shiftKey && v.preventDefault(), xe.current && xe.current.focus && xe.current.focus();
  }, []), Ke = R(() => !!(x || []).find((v) => !!v.draggable), [x]), Yt = z(null), gt = z(null), Tt = z({
    dblclick: (v, C) => {
      const H = { id: v, column: Jn(C, "data-col-id") };
      h.exec("open-editor", H);
    },
    click: (v, C) => {
      if (Yt.current) return;
      const H = Jn(C, "data-col-id");
      if (_?.id !== v && h.exec("focus-cell", {
        row: v,
        column: H,
        eventSource: "click"
      }), D === !1) return;
      const B = s && C.ctrlKey, U = s && C.shiftKey;
      (B || M.length > 1 || !M.includes(v)) && h.exec("select-row", { id: v, toggle: B, range: U });
    },
    "toggle-row": (v) => {
      const C = h.getRow(v);
      h.exec(C.open !== !1 ? "close-row" : "open-row", { id: v });
    },
    "ignore-click": () => !1
  }), ot = N(() => ({
    top: be,
    bottom: ve,
    left: ee.width,
    xScroll: Pe,
    yScroll: We,
    sense: c && G ? G.offsetHeight : Math.max(k?.rowHeight || 0, 40),
    node: xe.current && xe.current.firstElementChild
  }), [
    be,
    ve,
    ee.width,
    Pe,
    We,
    c,
    G,
    k
  ]);
  function on(v, C) {
    const { container: H, sourceNode: B, from: U } = C;
    if (Ke() && !B.getAttribute("draggable-data"))
      return !1;
    oe(U), h.getRow(U).open && h.exec("close-row", { id: U, nested: !0 });
    const j = Be(B, "data-id"), O = j.cloneNode(!0);
    O.classList.remove("wx-selected"), O.querySelectorAll("[tabindex]").forEach((De) => De.setAttribute("tabindex", "-1")), H.appendChild(O), le(O);
    const ce = he - ue.d, Ne = We ? Y : 0;
    H.style.width = Math.min(
      (u || 0) - Ne,
      L && pe <= (u || 0) ? Ze : Ze - Ne
    ) + ce + "px";
    const He = vn(j);
    C.offset = {
      x: ce,
      y: -Math.round(He.height / 2)
    }, gt.current || (gt.current = v.clientY);
  }
  function an(v, C) {
    const { from: H } = C, B = C.pos, U = vn(xe.current);
    B.x = U.x;
    const j = ot.top;
    if (B.y < j) B.y = j;
    else {
      const O = U.height - (Pe && Y > 0 ? Y : Math.round(ot.sense / 2)) - ot.bottom;
      B.y > O && (B.y = O);
    }
    if (xe.current.contains(C.targetNode)) {
      const O = Be(C.targetNode, "data-id"), ce = Wt(O?.getAttribute("data-id"));
      if (ce && ce !== H) {
        C.to = ce;
        const Ne = c ? G?.offsetHeight : k?.rowHeight;
        if (G && (fe === 0 || B.y > j + Ne - 1)) {
          const He = O.getBoundingClientRect(), De = vn(G).y, Ye = He.y, je = De > Ye ? -1 : 1, Fe = je === 1 ? "after" : "before", at = Math.abs(h.getRowIndex(H) - h.getRowIndex(ce)), lt = at !== 1 ? Fe === "before" ? "after" : "before" : Fe;
          if (at === 1 && (je === -1 && v.clientY > gt.current || je === 1 && v.clientY < gt.current))
            return;
          gt.current = v.clientY, h.exec("move-item", {
            id: H,
            target: ce,
            mode: lt,
            inProgress: !0
          });
        }
      }
      o && o({ event: v, context: C });
    }
    Dc(v, U, C, ot);
  }
  function Hn(v, C) {
    const { from: H, to: B } = C;
    h.exec("move-item", {
      id: H,
      target: B,
      inProgress: !1
    }), Yt.current = setTimeout(() => {
      Yt.current = 0;
    }, 1), oe(null), le(null), gt.current = null, Wo(C);
  }
  function Ln() {
    const v = document.createElement("div");
    v.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(v);
    const C = v.offsetWidth - v.clientWidth;
    return document.body.removeChild(v), C;
  }
  const Pn = N(() => W > 0 ? { width: `${W}px` } : void 0, [W]), ln = z(null);
  function cn() {
    Promise.resolve().then(() => {
      let v = 0, C = Ee;
      const H = ln.current;
      H && (Array.from(H.children).forEach((B, U) => {
        Ce.current[Ee + U] = B.offsetHeight, v += B.offsetHeight, C++;
      }), we(v), Ae(C));
    });
  }
  F(() => {
    X && c && cn();
  }, [X, c, Ee]);
  let [it, Mt] = K();
  F(() => {
    if (_ && (!D || !de.length || de.includes(_.row)))
      Mt({ ..._ });
    else if (X.length && ue.data.length) {
      if (!it || de.length && !de.includes(it.row) || X.findIndex((v) => v.id == it.row) === -1 || ue.data.findIndex(
        (v) => v.id == it.column && !v.collapsed
      ) === -1) {
        const v = de[0] || X[0].id, C = ue.data.findIndex((H) => !H.collapsed);
        Mt(C !== -1 ? { row: v, column: ue.data[C].id } : null);
      }
    } else Mt(null);
  }, [_]);
  const Et = z(null);
  F(() => {
    const v = xe.current;
    if (!v) return;
    const C = bc(v, d);
    return () => {
      typeof C == "function" && C();
    };
  }, [d]);
  const Vt = z({});
  Object.assign(Vt.current, {
    start: on,
    move: an,
    end: Hn,
    getReorder: () => E,
    getDraggableInfo: () => ({ hasDraggable: Ke() })
  }), F(() => {
    const v = xe.current;
    return v ? _c(v, Vt).destroy : void 0;
  }, [E, xe.current]), F(() => {
    const v = xe.current;
    return v ? Tr(v, {
      keys: m !== !1 && {
        ...rc,
        "ctrl+z": P,
        "ctrl+y": P,
        ...m
      },
      exec: (C) => h.exec("hotkey", C)
    }).destroy : void 0;
  }, [h, P, m]);
  const xt = z({
    scroll: h.getReactiveState().scroll
  });
  xt.current.getWidth = () => (u || 0) - (We ? Y : 0), xt.current.getHeight = () => q, xt.current.getScrollMargin = () => ee.width + ae.width, F(() => {
    sc(Et.current, xt.current);
  }, []);
  const Gt = z(null);
  F(() => {
    const v = Gt.current;
    if (!v) return;
    const C = [];
    return C.push(
      Jt(v, () => h.exec("focus-cell", { eventSource: "click" })).destroy
    ), C.push(ui(v, Tt.current)), () => C.forEach((H) => H());
  }, []);
  const S = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + S,
        style: {
          "--header-height": `${be}px`,
          "--footer-height": `${ve}px`,
          "--split-left-width": `${ee.width}px`,
          "--split-right-width": `${ae.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: xe,
            className: "wx-4VuBwK2D wx-table-box",
            style: Pn,
            role: V ? "treegrid" : "grid",
            "aria-colcount": ue.data.length,
            "aria-rowcount": X.length,
            "aria-multiselectable": V && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ Z(
              "div",
              {
                ref: Et,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: Pe ? "scroll" : "hidden",
                  overflowY: We ? "scroll" : "hidden"
                },
                onScroll: Re,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    vs,
                    {
                      contentWidth: Ze,
                      deltaLeft: ue.dh,
                      columns: ue.header,
                      columnStyle: i,
                      bodyHeight: q - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ Z(
                    "div",
                    {
                      ref: Gt,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${Ze}px`, height: `${Le}px` },
                      onMouseDown: (v) => ze(v),
                      children: [
                        r ? /* @__PURE__ */ p(Oc, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: ln,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Me.d}px`,
                              paddingLeft: `${ue.d}px`
                            },
                            children: X.map((v, C) => {
                              const H = M.indexOf(v.id) !== -1, B = ge === v.id, U = "wx-row" + (c ? " wx-autoheight" : "") + (a ? " " + a(v) : "") + (H ? " wx-selected" : "") + (B ? " wx-inactive" : ""), j = c ? { minHeight: `${v.rowHeight || se}px` } : { height: `${v.rowHeight || se}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + U,
                                  "data-id": v.id,
                                  "data-context-id": v.id,
                                  style: j,
                                  role: "row",
                                  "aria-rowindex": C,
                                  "aria-expanded": v.open,
                                  "aria-level": V ? v.$level + 1 : void 0,
                                  "aria-selected": V ? H : void 0,
                                  tabIndex: -1,
                                  children: ue.data.map((O) => O.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    O.id
                                  ) : T?.id === v.id && T.column == O.id ? /* @__PURE__ */ p(Kc, { row: v, column: O }, O.id) : /* @__PURE__ */ p(
                                    Ic,
                                    {
                                      row: v,
                                      column: O,
                                      columnStyle: i,
                                      cellStyle: l,
                                      reorder: E,
                                      focusable: it?.row === v.id && it?.column == O.id
                                    },
                                    O.id
                                  ))
                                },
                                v.id
                              );
                            })
                          }
                        )
                      ]
                    }
                  ),
                  n && (y || []).length ? /* @__PURE__ */ p(
                    vs,
                    {
                      type: "footer",
                      contentWidth: Ze,
                      deltaLeft: ue.df,
                      columns: ue.footer,
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
    A ? /* @__PURE__ */ p(
      Uc,
      {
        config: A,
        rowStyle: a,
        columnStyle: i,
        cellStyle: l,
        header: e,
        footer: n,
        reorder: E
      }
    ) : null
  ] });
}
const Xc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Qc = Ct(function({
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
  onReorder: g = null,
  autoRowHeight: m = !1,
  sizes: h,
  split: w,
  tree: x = !1,
  autoConfig: y = !1,
  init: b = null,
  responsive: k = null,
  sortMarks: M,
  undo: $ = !1,
  hotkeys: D = null,
  ...T
}, V) {
  const _ = z();
  _.current = T;
  const A = N(() => new Ql(Is), []), P = N(() => A.in, [A]), E = z(null);
  E.current === null && (E.current = new Os((ee, ae) => {
    const te = "on" + Xc(ee);
    _.current && _.current[te] && _.current[te](ae);
  }), P.setNext(E.current));
  const I = N(
    () => ({
      getState: A.getState.bind(A),
      getReactiveState: A.getReactive.bind(A),
      getStores: () => ({ data: A }),
      exec: P.exec,
      setNext: (ee) => (E.current = E.current.setNext(ee), E.current),
      intercept: P.intercept.bind(P),
      on: P.on.bind(P),
      detach: P.detach.bind(P),
      getRow: A.getRow.bind(A),
      getRowIndex: A.getRowIndex.bind(A),
      getColumn: A.getColumn.bind(A)
    }),
    [A, P]
  ), [Y, ie] = K(0), [he, Q] = K(0), [fe, ye] = K(null), [L, se] = K(null), xe = N(() => {
    if (y && !e.length && t.length) {
      const ee = t[0], ae = [];
      for (let te in ee)
        if (te !== "id" && te[0] !== "$") {
          let pe = {
            id: te,
            header: te[0].toUpperCase() + te.slice(1)
          };
          typeof y == "object" && (pe = { ...pe, ...y }), ae.push(pe);
        }
      return ae;
    }
    return (L && L.columns) ?? e;
  }, [y, e, t, L]), ge = N(
    () => (L && L.sizes) ?? h,
    [L, h]
  ), oe = R(
    (ee) => {
      if (ie(ee.width), Q(ee.height), k) {
        const ae = Object.keys(k).map(Number).sort((te, pe) => te - pe).find((te) => ee.width <= te) ?? null;
        ae !== fe && (se(k[ae]), ye(ae));
      }
    },
    [k, fe]
  ), G = $e(Qe.theme), le = z(0);
  return F(() => {
    if (!le.current)
      b && b(I);
    else {
      const ee = A.getState();
      A.init({
        data: t,
        columns: xe,
        split: w || ee.split,
        sizes: ge || ee.sizes,
        selectedRows: o || ee.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: M || ee.sortMarks,
        undo: $,
        reorder: f,
        _skin: G,
        _select: a
      });
    }
    le.current++;
  }, [
    A,
    t,
    xe,
    w,
    ge,
    o,
    d,
    x,
    M,
    $,
    f,
    G,
    a,
    b,
    I
  ]), le.current === 0 && A.init({
    data: t,
    columns: xe,
    split: w || { left: 0 },
    sizes: ge || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: M || {},
    undo: $,
    reorder: f,
    _skin: G,
    select: a
  }), Nt(
    V,
    () => ({
      ...I
    }),
    [I]
  ), /* @__PURE__ */ p(et.Provider, { value: I, children: /* @__PURE__ */ p(Mn, { words: ac, optional: !0, children: /* @__PURE__ */ p(
    qc,
    {
      header: l,
      footer: c,
      overlay: u,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      onReorder: g,
      multiselect: i,
      autoRowHeight: m,
      clientWidth: Y,
      clientHeight: he,
      responsiveLevel: fe,
      resize: oe,
      hotkeys: D
    }
  ) }) });
});
function Zc({ item: t }) {
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
function Jc({ columns: t = null, api: e, children: n }) {
  F(() => {
    uc("table-header", Zc);
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
  const a = ct(e, "_columns"), i = N(() => {
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
  return /* @__PURE__ */ p(
    Ao,
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
gr(Xe);
function ed({ row: t, column: e }) {
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
function bs({ column: t, cell: e }) {
  const n = N(() => t.id, [t?.id]);
  return e || t.id == "add-task" ? /* @__PURE__ */ p("div", { style: { textAlign: t.align }, children: /* @__PURE__ */ p(
    "i",
    {
      className: "wx-9DAESAHW wx-action-icon wxi-plus",
      "data-action": n
    }
  ) }) : null;
}
function td(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: a,
    multiTaskRows: i = !1,
    rowMapping: l = null
  } = t, [c, d] = Oe(o), [u, f] = K(), g = $e(Qe.i18n), m = N(() => g.getGroup("gantt"), [g]), h = $e(wt), w = re(h, "scrollTop"), x = re(h, "cellHeight"), y = re(h, "_scrollTask"), b = re(h, "_selected"), k = re(h, "area"), M = re(h, "_tasks"), $ = re(h, "_scales"), D = re(h, "columns"), T = re(h, "_sort"), V = re(h, "calendar"), _ = re(h, "durationUnit"), A = re(h, "splitTasks"), [P, E] = K(null), I = N(() => !M || !k ? [] : i && l ? M : M.slice(k.start, k.end), [M, k, i, l]), Y = R(
    (W, J) => {
      if (J === "add-task")
        h.exec(J, {
          target: W,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (J === "open-task") {
        const X = I.find((de) => de.id === W);
        (X?.data || X?.lazy) && h.exec(J, { id: W, mode: !X.open });
      }
    },
    [I]
  ), ie = R(
    (W) => {
      const J = bt(W), X = W.target.dataset.action;
      X && W.preventDefault(), J ? X === "add-task" || X === "open-task" ? Y(J, X) : h.exec("select-task", {
        id: J,
        toggle: W.ctrlKey || W.metaKey,
        range: W.shiftKey,
        show: !0
      }) : X === "add-task" && Y(null, X);
    },
    [h, Y]
  ), he = z(null), Q = z(null), [fe, ye] = K(0), [L, se] = K(!1);
  F(() => {
    const W = Q.current;
    if (!W || typeof ResizeObserver > "u") return;
    const J = () => ye(W.clientWidth);
    J();
    const X = new ResizeObserver(J);
    return X.observe(W), () => X.disconnect();
  }, []);
  const xe = z(null), ge = R(
    (W) => {
      const J = W.id, { before: X, after: de } = W, Ee = W.onMove;
      let Re = X || de, ze = X ? "before" : "after";
      if (Ee) {
        if (ze === "after") {
          const Ke = h.getTask(Re);
          Ke.data?.length && Ke.open && (ze = "before", Re = Ke.data[0].id);
        }
        xe.current = { id: J, [ze]: Re };
      } else xe.current = null;
      h.exec("move-task", {
        id: J,
        mode: ze,
        target: Re,
        inProgress: Ee
      });
    },
    [h]
  ), oe = N(() => i && l ? 0 : k?.from ?? 0, [k, i, l]), G = N(() => $?.height ?? 0, [$]), le = N(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (fe ?? 0), [n, s, c, r, fe]), ee = N(() => {
    const W = {};
    return le && s === "all" || s === "grid" && le ? W.width = c : s === "grid" && (W.width = "100%"), W;
  }, [le, s, c]), ae = N(() => P && !I.find((W) => W.id === P.id) ? [...I, P] : I, [I, P]), te = N(() => {
    if (!i || !l) return ae;
    const W = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Set();
    return ae.forEach((X) => {
      const de = l.taskRows.get(X.id) ?? X.id;
      J.has(de) || (W.set(de, {
        ...X,
        $rowTasks: l.rowMap.get(de) || [X.id]
      }), J.add(de));
    }), Array.from(W.values());
  }, [ae, i, l]), pe = N(() => {
    let W = (D || []).map((de) => {
      de = { ...de };
      const Ee = de.header;
      if (typeof Ee == "object") {
        const Re = Ee.text && m(Ee.text);
        de.header = { ...Ee, text: Re };
      } else de.header = m(Ee);
      return de;
    });
    const J = W.findIndex((de) => de.id === "text"), X = W.findIndex((de) => de.id === "add-task");
    if (J !== -1 && (W[J].cell && (W[J]._cell = W[J].cell), W[J].cell = ed), X !== -1) {
      W[X].cell = W[X].cell || bs;
      const de = W[X].header;
      if (typeof de != "object" && (W[X].header = { text: de }), W[X].header.cell = de.cell || bs, e)
        W.splice(X, 1);
      else if (n) {
        const [Ee] = W.splice(X, 1);
        W.unshift(Ee);
      }
    }
    return W.length > 0 && (W[W.length - 1].resize = !1), W;
  }, [D, m, e, n]), Se = N(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : pe.find((W) => W.id === "add-task") ? "50px" : "0", [s, r, pe]), ne = N(() => {
    if (te && T?.length) {
      const W = {};
      return T.forEach(({ key: J, order: X }, de) => {
        W[J] = {
          order: X,
          ...T.length > 1 && { index: de }
        };
      }), W;
    }
    return {};
  }, [te, T]), ue = R(() => pe.some((W) => W.flexgrow && !W.hidden), []), be = N(() => ue(), [ue, L]), ve = N(() => {
    let W = s === "chart" ? pe.filter((X) => X.id === "add-task") : pe;
    const J = s === "all" ? r : fe;
    if (!be) {
      let X = c, de = !1;
      if (pe.some((Ee) => Ee.$width)) {
        let Ee = 0;
        X = pe.reduce((Re, ze) => (ze.hidden || (Ee += ze.width, Re += ze.$width || ze.width), Re), 0), Ee > X && X > J && (de = !0);
      }
      if (de || X < J) {
        let Ee = 1;
        return de || (Ee = (J - 50) / (X - 50 || 1)), W.map((Re) => (Re.id !== "add-task" && !Re.hidden && (Re.$width || (Re.$width = Re.width), Re.width = Re.$width * Ee), Re));
      }
    }
    return W;
  }, [s, pe, be, c, r, fe]), Pe = R(
    (W) => {
      if (!ue()) {
        const J = ve.reduce((X, de) => (W && de.$width && (de.$width = de.width), X + (de.hidden ? 0 : de.width)), 0);
        J !== c && d(J);
      }
      se(!0), se(!1);
    },
    [ue, ve, c, d]
  ), q = R(() => {
    pe.filter((J) => J.flexgrow && !J.hidden).length === 1 && pe.forEach((J) => {
      J.$width && !J.flexgrow && !J.hidden && (J.width = J.$width);
    });
  }, []), ke = R(
    (W) => {
      if (!e) {
        const J = bt(W), X = Jn(W, "data-col-id");
        !(X && pe.find((Ee) => Ee.id == X))?.editor && J && h.exec("show-editor", { id: J });
      }
    },
    [h, e]
    // cols is defined later; relies on latest value at call time
  ), Ce = N(
    () => Array.isArray(b) ? b.map((W) => W.id) : [],
    [b]
  ), me = z(oe);
  me.current = oe, F(() => {
    const W = (X) => {
      if (he.current) {
        const de = he.current.querySelector(".wx-body");
        de && (de.style.top = -((X ?? 0) - (me.current ?? 0)) + "px");
      }
      Q.current && (Q.current.scrollTop = 0);
    };
    return W(w), h.on("scroll-chart", ({ top: X }) => {
      X !== void 0 && W(X);
    });
  }, [h, w]), F(() => {
    if (he.current) {
      const W = he.current.querySelector(".wx-body");
      W && (W.style.top = -((w ?? 0) - (oe ?? 0)) + "px");
    }
  }, [oe]), F(() => {
    const W = he.current;
    if (!W) return;
    const J = W.querySelector(".wx-table-box .wx-body");
    if (!J || typeof ResizeObserver > "u") return;
    const X = new ResizeObserver(() => {
      if (he.current) {
        const de = he.current.querySelector(".wx-body");
        de && (de.style.top = -((w ?? 0) - (me.current ?? 0)) + "px");
      }
    });
    return X.observe(J), () => {
      X.disconnect();
    };
  }, [ve, ee, s, Se, te, w]), F(() => {
    if (!y || !u) return;
    const { id: W } = y, J = u.getState().focusCell;
    J && J.row !== W && he.current && he.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: W,
      column: J.column
    });
  }, [y, u]);
  const we = R(
    ({ id: W }) => {
      if (e) return !1;
      h.getTask(W).open && h.exec("open-task", { id: W, mode: !1 });
      const J = h.getState()._tasks.find((X) => X.id === W);
      if (E(J || null), !J) return !1;
    },
    [h, e]
  ), Te = R(
    ({ id: W, top: J }) => {
      xe.current ? ge({ ...xe.current, onMove: !1 }) : h.exec("drag-task", {
        id: W,
        top: J + (oe ?? 0),
        inProgress: !1
      }), E(null);
    },
    [h, ge, oe]
  ), Ae = R(
    ({ id: W, top: J, detail: X }) => {
      X && ge({ ...X, onMove: !0 }), h.exec("drag-task", {
        id: W,
        top: J + (oe ?? 0),
        inProgress: !0
      });
    },
    [h, ge, oe]
  );
  F(() => {
    const W = he.current;
    return W ? ic(W, {
      start: we,
      end: Te,
      move: Ae,
      getTask: h.getTask
    }).destroy : void 0;
  }, [h, we, Te, Ae]);
  const Me = R(
    (W) => {
      const { key: J, isInput: X } = W;
      if (!X && (J === "arrowup" || J === "arrowdown"))
        return W.eventSource = "grid", h.exec("hotkey", W), !1;
      if (J === "enter") {
        const de = u?.getState().focusCell;
        if (de) {
          const { row: Ee, column: Re } = de;
          Re === "add-task" ? Y(Ee, "add-task") : Re === "text" && Y(Ee, "open-task");
        }
      }
    },
    [h, Y, u]
  ), Le = z(null), We = () => {
    Le.current = {
      setTableAPI: f,
      handleHotkey: Me,
      sortVal: T,
      api: h,
      adjustColumns: q,
      setColumnWidth: Pe,
      tasks: I,
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
    Me,
    T,
    h,
    q,
    Pe,
    I,
    V,
    _,
    A,
    a
  ]);
  const Ze = R((W) => {
    f(W), W.intercept("hotkey", (J) => Le.current.handleHotkey(J)), W.intercept("scroll", () => !1), W.intercept("select-row", () => !1), W.intercept("sort-rows", (J) => {
      const X = Le.current.sortVal, { key: de, add: Ee } = J, Re = X ? X.find((Ke) => Ke.key === de) : null;
      let ze = "asc";
      return Re && (ze = !Re || Re.order === "asc" ? "desc" : "asc"), h.exec("sort-tasks", {
        key: de,
        order: ze,
        add: Ee
      }), !1;
    }), W.on("resize-column", () => {
      Le.current.setColumnWidth(!0);
    }), W.on("hide-column", (J) => {
      J.mode || Le.current.adjustColumns(), Le.current.setColumnWidth();
    }), W.intercept("update-cell", (J) => {
      const { id: X, column: de, value: Ee } = J, Re = Le.current.tasks.find((ze) => ze.id === X);
      if (Re) {
        const ze = { ...Re };
        let Ke = Ee;
        Ke && !isNaN(Ke) && !(Ke instanceof Date) && (Ke *= 1), ze[de] = Ke, yo(
          ze,
          {
            calendar: Le.current.calendarVal,
            durationUnit: Le.current.durationUnitVal,
            splitTasks: Le.current.splitTasksVal
          },
          de
        ), h.exec("update-task", {
          id: X,
          task: ze
        });
      }
      return !1;
    }), a && a(W);
  }, []);
  return /* @__PURE__ */ p(
    "div",
    {
      className: "wx-rHj6070p wx-table-container",
      style: { flex: `0 0 ${Se}` },
      ref: Q,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: he,
          style: ee,
          className: "wx-rHj6070p wx-table",
          onClick: ie,
          onDoubleClick: ke,
          children: /* @__PURE__ */ p(
            Qc,
            {
              init: Ze,
              sizes: {
                rowHeight: x,
                headerHeight: (G ?? 0) - 1
              },
              rowStyle: (W) => W.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (W) => `wx-rHj6070p wx-text-${W.align}${W.id === "add-task" ? " wx-action" : ""}`,
              data: te,
              columns: ve,
              selectedRows: [...Ce],
              sortMarks: ne
            }
          )
        }
      )
    }
  );
}
function nd({ borders: t = "" }) {
  const e = $e(wt), n = re(e, "cellWidth"), r = re(e, "cellHeight"), s = z(null), [o, a] = K("#e4e4e4");
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
    background: n != null && r != null ? `url(${dl(n, r, o, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ p("div", { ref: s, style: i });
}
function rd({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = $e(wt), s = re(r, "_links"), o = re(r, "criticalPath"), a = z(null), i = R(
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
  }, [n, e, i]), /* @__PURE__ */ Z("svg", { className: "wx-dkx3NwEn wx-links", children: [
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
        ref: a,
        className: "wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link",
        points: e.$p
      }
    )
  ] });
}
function sd(t) {
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
  return /* @__PURE__ */ p("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, a) => /* @__PURE__ */ Z(
    "div",
    {
      className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
      "data-segment": a,
      style: r(a),
      children: [
        e.progress ? /* @__PURE__ */ p("div", { className: "wx-progress-wrapper", children: /* @__PURE__ */ p(
          "div",
          {
            className: "wx-progress-percent wx-GKbcLEGA",
            style: { width: `${s(a)}%` }
          }
        ) }) : null,
        /* @__PURE__ */ p("div", { className: "wx-content", children: o.text || "" })
      ]
    },
    a
  )) });
}
let jn = [], Un = null, Ss = null;
const $s = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, a = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, i = Math.floor(t / r), l = new Date(n.getTime() + i * a * o);
  return l.setHours(0, 0, 0, 0), l;
}, od = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, a = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / a);
}, id = (t, e, n) => {
  if (!n || !t) return t;
  const { lengthUnit: r } = n, a = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5, i = new Date(t.getTime() + e * a);
  return i.setHours(0, 0, 0, 0), i;
};
function ad(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: a = !1
  } = t, i = $e(wt), [l, c] = Ut(i, "_tasks"), [d, u] = Ut(i, "_links"), f = re(i, "area"), g = re(i, "_scales"), m = re(i, "taskTypes"), h = re(i, "baselines"), [w, x] = Ut(i, "_selected"), y = re(i, "_scrollTask"), b = re(i, "criticalPath"), k = re(i, "tasks"), M = re(i, "schedule"), $ = re(i, "splitTasks"), D = N(() => {
    if (!f || !Array.isArray(l)) return [];
    const S = f.start ?? 0, v = f.end ?? 0;
    return r && s ? l.map((C) => ({ ...C })) : l.slice(S, v).map((C) => ({ ...C }));
  }, [c, f, r, s]), T = re(i, "cellHeight"), V = N(() => {
    if (!r || !s || !D.length) return D;
    const S = /* @__PURE__ */ new Map(), v = [];
    return l.forEach((C) => {
      const H = s.taskRows.get(C.id) ?? C.id;
      S.has(H) || (S.set(H, v.length), v.push(H));
    }), D.map((C) => {
      const H = s.taskRows.get(C.id) ?? C.id, B = S.get(H) ?? 0;
      return {
        ...C,
        $y: B * T,
        $y_base: C.$y_base !== void 0 ? B * T : void 0
      };
    });
  }, [D, r, s, l, T]), _ = N(
    () => g.lengthUnitWidth,
    [g]
  ), A = N(
    () => g.lengthUnit || "day",
    [g]
  ), P = z(!1), [E, I] = K(void 0), [Y, ie] = K(null), he = z(null), [Q, fe] = K(null), [ye, L] = K(void 0), se = z(null), [xe, ge] = K(0), [oe, G] = K(null), le = z(null), [ee, ae] = K(null), [te, pe] = K(null), [Se, ne] = K(null), ue = z(null);
  ue.current = te;
  const be = z(200), ve = z(null), Pe = N(() => {
    const S = ve.current;
    return !!(w.length && S && S.contains(document.activeElement));
  }, [w, ve.current]), q = N(() => Pe && w[w.length - 1]?.id, [Pe, w]);
  F(() => {
    if (y && Pe && y) {
      const { id: S } = y, v = ve.current?.querySelector(
        `.wx-bar[data-id='${S}']`
      );
      v && v.focus({ preventScroll: !0 });
    }
  }, [y]), F(() => {
    const S = ve.current;
    if (S && (ge(S.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const v = new ResizeObserver((C) => {
        C[0] && ge(C[0].contentRect.width);
      });
      return v.observe(S), () => v.disconnect();
    }
  }, [ve.current]);
  const ke = R(() => {
    document.body.style.userSelect = "none";
  }, []), Ce = R(() => {
    document.body.style.userSelect = "";
  }, []), me = R(
    (S, v, C) => {
      if (v.target.classList.contains("wx-line") || (C || (C = i.getTask(kt(S))), C.type === "milestone" || C.type === "summary")) return "";
      const H = Be(v, "data-segment");
      H && (S = H);
      const { left: B, width: U } = S.getBoundingClientRect(), j = (v.clientX - B) / U;
      let O = 0.2 / (U > 200 ? U / 200 : 1);
      return j < O ? "start" : j > 1 - O ? "end" : "";
    },
    [i]
  ), we = N(() => {
    const S = /* @__PURE__ */ new Map();
    if (!r || !s)
      return l.forEach((H) => {
        S.set(H.id, H.$y);
      }), S;
    const v = /* @__PURE__ */ new Map(), C = [];
    return l.forEach((H) => {
      const B = s.taskRows.get(H.id) ?? H.id;
      v.has(B) || (v.set(B, C.length), C.push(B));
    }), l.forEach((H) => {
      const B = s.taskRows.get(H.id) ?? H.id, U = v.get(B) ?? 0;
      S.set(H.id, U * T);
    }), S;
  }, [l, r, s, T]), Te = N(() => {
    const S = /* @__PURE__ */ new Map();
    if (!r || !s)
      return l.forEach((H) => {
        S.set(H.id, H.$y), H.row !== void 0 && S.set(H.row, H.$y);
      }), S;
    const v = /* @__PURE__ */ new Map(), C = [];
    return l.forEach((H) => {
      const B = s.taskRows.get(H.id) ?? H.id;
      v.has(B) || (v.set(B, C.length), C.push(B));
    }), v.forEach((H, B) => {
      S.set(B, H * T);
    }), S;
  }, [l, r, s, T]), Ae = R(
    (S) => {
      if (!ve.current) return [];
      const C = Math.min(S.startX, S.currentX), H = Math.max(S.startX, S.currentX), B = Math.min(S.startY, S.currentY), U = Math.max(S.startY, S.currentY);
      return l.filter((j) => {
        const O = j.$x, ce = j.$x + j.$w, He = we.get(j.id) ?? j.$y, De = He + j.$h;
        return O < H && ce > C && He < U && De > B;
      });
    },
    [l, we]
  ), Me = N(() => new Set(w.map((S) => S.id)), [w, x]), Le = R(
    (S) => Me.has(S),
    [Me]
  ), We = R(
    (S, v) => {
      const { clientX: C } = v, H = kt(S), B = i.getTask(H), U = v.target.classList;
      if (!v.target.closest(".wx-delete-button") && !e) {
        if (U.contains("wx-progress-marker")) {
          const { progress: j } = i.getTask(H);
          he.current = {
            id: H,
            x: C,
            progress: j,
            dx: 0,
            node: S,
            marker: v.target
          }, v.target.classList.add("wx-progress-in-drag");
        } else {
          const j = me(S, v, B) || "move", O = {
            id: H,
            mode: j,
            x: C,
            dx: 0,
            l: B.$x,
            w: B.$w
          };
          if ($ && B.segments?.length) {
            const ce = Be(v, "data-segment");
            ce && (O.segmentIndex = ce.dataset.segment * 1);
          }
          ie(O);
        }
        ke();
      }
    },
    [i, e, me, ke, $]
  ), Ze = R(
    (S) => {
      if (S.button !== 0 || Se) return;
      const v = Be(S);
      if (!v && o && !e) {
        const C = ve.current;
        if (!C) return;
        const H = C.getBoundingClientRect(), B = S.clientX - H.left, U = S.clientY - H.top;
        if (a) {
          const O = $s(B, g);
          O && (ue.current = O, pe(O));
        }
        const j = {
          startX: B,
          startY: U,
          currentX: B,
          currentY: U,
          ctrlKey: S.ctrlKey || S.metaKey
        };
        G(j), le.current = j, ke();
        return;
      }
      if (v) {
        if (o && !e && w.length > 1) {
          const C = kt(v);
          if (Le(C)) {
            const H = S.target.classList;
            if (!H.contains("wx-link") && !H.contains("wx-progress-marker") && !S.target.closest(".wx-delete-button")) {
              const B = i.getTask(C);
              if (!me(v, S, B)) {
                const j = /* @__PURE__ */ new Map();
                w.forEach((O) => {
                  const ce = i.getTask(O.id);
                  if (ce) {
                    if (M?.auto && ce.type === "summary") return;
                    j.set(O.id, {
                      $x: ce.$x,
                      $w: ce.$w,
                      start: ce.start,
                      end: ce.end
                    });
                  }
                }), ae({
                  baseTaskId: C,
                  startX: S.clientX,
                  dx: 0,
                  originalPositions: j
                }), ke();
                return;
              }
            }
          }
        }
        We(v, S);
      }
    },
    [We, o, a, e, w, Le, i, me, M, ke, g, Se]
  ), W = R(
    (S) => {
      const v = Be(S);
      v && (se.current = setTimeout(() => {
        L(!0), We(v, S.touches[0]);
      }, 300));
    },
    [We]
  ), J = R(
    (S) => {
      fe(S && { ...d.find((v) => v.id === S) });
    },
    [d]
  ), X = R(() => {
    const S = le.current;
    if (S) {
      const v = Ae(S);
      S.ctrlKey ? v.forEach((C) => {
        i.exec("select-task", { id: C.id, toggle: !0, marquee: !0 });
      }) : (w.length > 0 && i.exec("select-task", { id: null, marquee: !0 }), v.forEach((C, H) => {
        i.exec("select-task", {
          id: C.id,
          toggle: H > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), G(null), le.current = null, Ce(), P.current = !0;
      return;
    }
    if (ee) {
      const { dx: v, originalPositions: C } = ee, H = Math.round(v / _);
      if (H !== 0) {
        let B = !0;
        C.forEach((U, j) => {
          const O = i.getTask(j);
          O && (i.exec("update-task", {
            id: j,
            diff: H,
            task: { start: O.start, end: O.end },
            skipUndo: !B
            // Only first task creates undo entry
          }), B = !1);
        }), P.current = !0;
      } else
        C.forEach((B, U) => {
          i.exec("drag-task", {
            id: U,
            left: B.$x,
            width: B.$w,
            inProgress: !1
          });
        });
      ae(null), Ce();
      return;
    }
    if (he.current) {
      const { dx: v, id: C, marker: H, value: B } = he.current;
      he.current = null, typeof B < "u" && v && i.exec("update-task", {
        id: C,
        task: { progress: B },
        inProgress: !1
      }), H.classList.remove("wx-progress-in-drag"), P.current = !0, Ce();
    } else if (Y) {
      const { id: v, mode: C, dx: H, l: B, w: U, start: j, segment: O, index: ce } = Y;
      if (ie(null), j) {
        const Ne = Math.round(H / _);
        if (!Ne)
          i.exec("drag-task", {
            id: v,
            width: U,
            left: B,
            inProgress: !1,
            ...O && { segmentIndex: ce }
          });
        else {
          let He = {}, De = i.getTask(v);
          O && (De = De.segments[ce]);
          const Ye = 1440 * 60 * 1e3, Fe = Ne * (A === "week" ? 7 : A === "month" ? 30 : A === "quarter" ? 91 : A === "year" ? 365 : 1) * Ye;
          C === "move" ? (He.start = new Date(De.start.getTime() + Fe), He.end = new Date(De.end.getTime() + Fe)) : C === "start" ? (He.start = new Date(De.start.getTime() + Fe), He.end = De.end) : C === "end" && (He.start = De.start, He.end = new Date(De.end.getTime() + Fe)), i.exec("update-task", {
            id: v,
            task: He,
            ...O && { segmentIndex: ce }
          });
        }
        P.current = !0;
      }
      Ce();
    }
  }, [i, Ce, Y, _, A, oe, ee, Ae, w]), de = R(
    (S, v) => {
      const { clientX: C, clientY: H } = v, B = ve.current;
      if (B) {
        const U = B.getBoundingClientRect();
        be.current = C - U.left;
      }
      if (Se) {
        if (!B) return;
        const U = B.getBoundingClientRect(), j = C - U.left;
        ne((O) => ({ ...O, currentX: j }));
        return;
      }
      if (!e) {
        if (oe) {
          const U = ve.current;
          if (!U) return;
          const j = U.getBoundingClientRect(), O = C - j.left, ce = H - j.top;
          G((Ne) => ({
            ...Ne,
            currentX: O,
            currentY: ce
          })), le.current && (le.current.currentX = O, le.current.currentY = ce);
          return;
        }
        if (ee) {
          const U = C - ee.startX;
          ee.originalPositions.forEach((j, O) => {
            const ce = j.$x + U;
            i.exec("drag-task", {
              id: O,
              left: ce,
              width: j.$w,
              inProgress: !0
            });
          }), ae((j) => ({ ...j, dx: U }));
          return;
        }
        if (he.current) {
          const { node: U, x: j, id: O } = he.current, ce = he.current.dx = C - j, Ne = Math.round(ce / U.offsetWidth * 100);
          let He = he.current.progress + Ne;
          he.current.value = He = Math.min(
            Math.max(0, He),
            100
          ), i.exec("update-task", {
            id: O,
            task: { progress: He },
            inProgress: !0
          });
        } else if (Y) {
          J(null);
          const { mode: U, l: j, w: O, x: ce, id: Ne, start: He, segment: De, index: Ye } = Y, je = i.getTask(Ne), Fe = C - ce;
          if (!He && Math.abs(Fe) < 20 || U === "start" && O - Fe < _ || U === "end" && O + Fe < _ || U === "move" && (Fe < 0 && j + Fe < 0 || Fe > 0 && j + O + Fe > xe) || Y.segment)
            return;
          const at = { ...Y, dx: Fe };
          let lt, Je;
          if (U === "start" ? (lt = j + Fe, Je = O - Fe) : U === "end" ? (lt = j, Je = O + Fe) : U === "move" && (lt = j + Fe, Je = O), i.exec("drag-task", {
            id: Ne,
            width: Je,
            left: lt,
            inProgress: !0,
            ...De && { segmentIndex: Ye }
          }), !at.start && (U === "move" && je.$x == j || U !== "move" && je.$w == O)) {
            P.current = !0, X();
            return;
          }
          at.start = !0, ie(at);
        } else {
          const U = Be(S);
          if (U) {
            const j = i.getTask(kt(U)), ce = Be(S, "data-segment") || U, Ne = me(ce, v, j);
            ce.style.cursor = Ne && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      i,
      e,
      Y,
      _,
      xe,
      me,
      J,
      X,
      oe,
      ee,
      Se
    ]
  ), Ee = R(
    (S) => {
      de(S, S);
    },
    [de]
  ), Re = R(
    (S) => {
      ye ? (S.preventDefault(), de(S, S.touches[0])) : se.current && (clearTimeout(se.current), se.current = null);
    },
    [ye, de]
  ), ze = R(() => {
    X();
  }, [X]), Ke = R(() => {
    L(null), se.current && (clearTimeout(se.current), se.current = null), X();
  }, [X]);
  F(() => (window.addEventListener("mouseup", ze), () => {
    window.removeEventListener("mouseup", ze);
  }), [ze]);
  const Yt = R(
    (S) => {
      if (!e) {
        const v = bt(S.target);
        if (v && !S.target.classList.contains("wx-link")) {
          const C = bt(S.target, "data-segment");
          i.exec("show-editor", {
            id: v,
            ...C !== null && { segmentIndex: C }
          });
        }
      }
    },
    [i, e]
  ), gt = ["e2s", "s2s", "e2e", "s2e"], Tt = R((S, v) => gt[(S ? 1 : 0) + (v ? 0 : 2)], []), ot = R(
    (S, v) => {
      const C = E.id, H = E.start;
      return S === C ? !0 : !!d.find((B) => B.target == S && B.source == C && B.type === Tt(H, v));
    },
    [E, u, Tt]
  ), on = R(() => {
    E && I(null);
  }, [E]), an = R((S, v, C) => {
    if (!v.length || !S || C == null) return;
    const H = 864e5, B = i.getHistory();
    B?.startBatch();
    const U = new Date(S), j = U.getDay(), O = j === 0 ? -6 : 1 - j;
    U.setDate(U.getDate() + O), U.setHours(0, 0, 0, 0), v.forEach((ce, Ne) => {
      const He = `task-${Date.now()}-${Ne}`, De = id(U, ce._startCellOffset || 0, g), Ye = new Date(De.getTime() + (ce._startDayOfWeek || 0) * H);
      Ye.setHours(0, 0, 0, 0);
      const je = new Date(Ye.getTime() + (ce._durationDays || 7) * H);
      je.setHours(0, 0, 0, 0), console.log("[paste] task:", ce.text, "newStart:", Ye, "newEnd:", je, "_durationDays:", ce._durationDays, "_startDayOfWeek:", ce._startDayOfWeek), i.exec("add-task", {
        task: {
          id: He,
          text: ce.text,
          start: Ye,
          end: je,
          type: ce.type || "task",
          parent: C,
          row: ce.row
        },
        target: C,
        mode: "child",
        skipUndo: Ne > 0
      });
    }), B?.endBatch();
  }, [i, g]), Hn = R(
    (S) => {
      if (P.current) {
        P.current = !1;
        return;
      }
      if (Se && Se.currentX != null) {
        const C = $s(Se.currentX, g);
        C && an(C, Se.tasks, Se.parent), ne(null);
        return;
      }
      const v = bt(S.target);
      if (v) {
        const C = i.getTask(v), H = l.find((U) => U.id === v);
        console.log("[click] task:", C?.text, "id:", v), console.log("[click] api.getTask:", { start: C?.start, end: C?.end, duration: C?.duration }), console.log("[click] rendered:", { start: H?.start, end: H?.end, $w: H?.$w, $x: H?.$x });
        const B = S.target.classList;
        if (B.contains("wx-link")) {
          const U = B.contains("wx-left");
          if (!E) {
            I({ id: v, start: U });
            return;
          }
          E.id !== v && !ot(v, U) && i.exec("add-link", {
            link: {
              source: E.id,
              target: v,
              type: Tt(E.start, U)
            }
          });
        } else if (B.contains("wx-delete-button-icon"))
          i.exec("delete-link", { id: Q.id }), fe(null);
        else {
          let U;
          const j = Be(S, "data-segment");
          j && (U = j.dataset.segment * 1), i.exec("select-task", {
            id: v,
            toggle: S.ctrlKey || S.metaKey,
            range: S.shiftKey,
            segmentIndex: U
          });
        }
      }
      on();
    },
    [
      i,
      E,
      u,
      Q,
      ot,
      Tt,
      on,
      Se,
      g,
      an
    ]
  ), Ln = R((S) => ({
    left: `${S.$x}px`,
    top: `${S.$y}px`,
    width: `${S.$w}px`,
    height: `${S.$h}px`
  }), []), Pn = R((S) => ({
    left: `${S.$x_base}px`,
    top: `${S.$y_base}px`,
    width: `${S.$w_base}px`,
    height: `${S.$h_base}px`
  }), []), ln = R(
    (S) => {
      if (ye || se.current)
        return S.preventDefault(), !1;
    },
    [ye]
  ), cn = N(
    () => m.map((S) => S.id),
    [m]
  ), it = R(
    (S) => {
      let v = cn.includes(S) ? S : "task";
      return ["task", "milestone", "summary"].includes(S) || (v = `task ${v}`), v;
    },
    [cn]
  ), Mt = R(
    (S) => {
      i.exec(S.action, S.data);
    },
    [i]
  ), Et = R(
    (S) => b && k.byId(S).$critical,
    [b, k]
  ), Vt = R(
    (S) => {
      if (M?.auto) {
        const v = k.getSummaryId(S, !0), C = k.getSummaryId(E.id, !0);
        return E?.id && !(Array.isArray(v) ? v : [v]).includes(
          E.id
        ) && !(Array.isArray(C) ? C : [C]).includes(S);
      }
      return E;
    },
    [M, k, E]
  ), xt = R(() => {
    const S = i.getState()._selected;
    if (!S || !S.length) return;
    const v = 864e5, C = S.map((O) => {
      const ce = i.getTask(O.id);
      if (!ce) return null;
      const Ne = l.find((Go) => Go.id === O.id);
      if (!Ne) return null;
      const { $x: He, $y: De, $h: Ye, $w: je, $skip: Fe, $level: at, $index: lt, $y_base: Je, $x_base: yt, $w_base: Rr, $h_base: dn, $skip_baseline: Wn, $critical: Vd, $reorder: Gd, ...Vo } = Ne, Ir = Ne.end && Ne.start ? Math.round((Ne.end.getTime() - Ne.start.getTime()) / v) : 0, Ar = Ne.start ? (Ne.start.getDay() + 6) % 7 : 0;
      return console.log("[copy] task:", ce.text, "durationDays:", Ir, "startDayOfWeek:", Ar, "$w:", je), { ...Vo, _durationDays: Ir, _startDayOfWeek: Ar, _originalWidth: je, _originalHeight: Ye };
    }).filter(Boolean);
    if (!C.length) return;
    const B = C[0].parent, U = C.filter((O) => O.parent === B);
    if (U.length === 0) return;
    const j = U.reduce((O, ce) => ce.start && (!O || ce.start < O) ? ce.start : O, null);
    jn = U.map((O) => ({
      ...O,
      _startCellOffset: od(O.start, j, g)
    })), Ss = B, Un = j;
  }, [i, g]);
  F(() => a ? i.intercept("hotkey", (v) => {
    if (v.key === "ctrl+c" || v.key === "meta+c")
      return xt(), !1;
    if (v.key === "ctrl+v" || v.key === "meta+v")
      return !jn.length || !Un || ne({
        tasks: jn,
        baseDate: Un,
        parent: Ss,
        currentX: be.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [a, i, xt]), F(() => {
    if (!Se) return;
    const S = (v) => {
      v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), ne(null));
    };
    return document.addEventListener("keydown", S, !0), () => document.removeEventListener("keydown", S, !0);
  }, [Se]);
  const Gt = N(() => {
    if (!oe) return null;
    const S = Math.min(oe.startX, oe.currentX), v = Math.min(oe.startY, oe.currentY), C = Math.abs(oe.currentX - oe.startX), H = Math.abs(oe.currentY - oe.startY);
    return {
      left: `${S}px`,
      top: `${v}px`,
      width: `${C}px`,
      height: `${H}px`
    };
  }, [oe]);
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${V.length ? V[0].$h : 0}px` },
      ref: ve,
      onContextMenu: ln,
      onMouseDown: Ze,
      onMouseMove: Ee,
      onTouchStart: W,
      onTouchMove: Re,
      onTouchEnd: Ke,
      onClick: Hn,
      onDoubleClick: Yt,
      onDragStart: (S) => (S.preventDefault(), !1),
      children: [
        /* @__PURE__ */ p(
          rd,
          {
            onSelectLink: J,
            selectedLink: Q,
            readonly: e
          }
        ),
        V.map((S) => {
          if (S.$skip && S.$skip_baseline) return null;
          const v = `wx-bar wx-${it(S.type)}` + (ye && Y && S.id === Y.id ? " wx-touch" : "") + (E && E.id === S.id ? " wx-selected" : "") + (Me.has(S.id) ? " wx-selected" : "") + (Et(S.id) ? " wx-critical" : "") + (S.$reorder ? " wx-reorder-task" : "") + ($ && S.segments ? " wx-split" : ""), C = "wx-link wx-left" + (E ? " wx-visible" : "") + (!E || !ot(S.id, !0) && Vt(S.id) ? " wx-target" : "") + (E && E.id === S.id && E.start ? " wx-selected" : "") + (Et(S.id) ? " wx-critical" : ""), H = "wx-link wx-right" + (E ? " wx-visible" : "") + (!E || !ot(S.id, !1) && Vt(S.id) ? " wx-target" : "") + (E && E.id === S.id && !E.start ? " wx-selected" : "") + (Et(S.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Z(Ds, { children: [
            !S.$skip && /* @__PURE__ */ Z(
              "div",
              {
                className: "wx-GKbcLEGA " + v,
                style: Ln(S),
                "data-tooltip-id": S.id,
                "data-id": S.id,
                tabIndex: q === S.id ? 0 : -1,
                children: [
                  e ? null : S.id === Q?.target && Q?.type[2] === "s" ? /* @__PURE__ */ p(
                    ut,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + C, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  S.type !== "milestone" ? /* @__PURE__ */ Z(Ie, { children: [
                    S.progress && !($ && S.segments) ? /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${S.progress}%` }
                      }
                    ) }) : null,
                    !e && !($ && S.segments) ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${S.progress}% - 10px)` },
                        children: S.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ p(n, { data: S, api: i, onAction: Mt }) : $ && S.segments ? /* @__PURE__ */ p(sd, { task: S, type: it(S.type) }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: S.text || "" })
                  ] }) : /* @__PURE__ */ Z(Ie, { children: [
                    /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ p(n, { data: S, api: i, onAction: Mt }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: S.text })
                  ] }),
                  e ? null : S.id === Q?.target && Q?.type[2] === "e" ? /* @__PURE__ */ p(
                    ut,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + H, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            h && !S.$skip_baseline ? /* @__PURE__ */ p(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (S.type === "milestone" ? " wx-milestone" : ""),
                style: Pn(S)
              }
            ) : null
          ] }, S.id);
        }),
        oe && Gt && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: Gt }),
        Se && Se.currentX != null && Se.tasks.map((S, v) => {
          const H = (Math.floor(Se.currentX / _) + (S._startCellOffset || 0)) * _, B = S._originalWidth || _, U = S._originalHeight || T, j = Te.get(S.row) ?? (S.$y || 0);
          return /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: H, top: j, width: B, height: U },
              children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: S.text })
            },
            `preview-${v}`
          );
        })
      ]
    }
  );
}
function ld(t) {
  const { highlightTime: e } = t, n = $e(wt), r = re(n, "_scales");
  return /* @__PURE__ */ p("div", { className: "wx-ZkvhDKir wx-scale", style: { width: r.width }, children: (r?.rows || []).map((s, o) => /* @__PURE__ */ p(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${s.height}px` },
      children: (s.cells || []).map((a, i) => {
        const l = e ? e(a.date, a.unit) : "", c = "wx-cell " + (a.css || "") + " " + (l || ""), d = typeof a.value == "string" && a.value.includes("<");
        return /* @__PURE__ */ p(
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
const cd = /* @__PURE__ */ new Map();
function dd(t) {
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
        cd.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function ud(t) {
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
  } = t, g = $e(wt), [m, h] = Ut(g, "_selected"), w = re(g, "scrollTop"), x = re(g, "cellHeight"), y = re(g, "cellWidth"), b = re(g, "_scales"), k = re(g, "_markers"), M = re(g, "_scrollTask"), $ = re(g, "zoom"), D = re(g, "_tasks"), [T, V] = K(), _ = z(null), A = z(0), P = z(!1), E = 1 + (b?.rows?.length || 0), I = N(() => {
    if (!i || !l || !D?.length) return null;
    const G = /* @__PURE__ */ new Map(), le = /* @__PURE__ */ new Map(), ee = [];
    return D.forEach((ae) => {
      const te = l.taskRows.get(ae.id) ?? ae.id;
      le.has(te) || (le.set(te, ee.length), ee.push(te));
    }), D.forEach((ae) => {
      const te = l.taskRows.get(ae.id) ?? ae.id, pe = le.get(te) ?? 0;
      G.set(ae.id, pe * x);
    }), G;
  }, [D, i, l, x]), Y = N(() => {
    const G = [];
    return m && m.length && x && m.forEach((le) => {
      const ee = I?.get(le.id) ?? le.$y;
      G.push({ height: `${x}px`, top: `${ee - 3}px` });
    }), G;
  }, [h, x, I]), ie = N(
    () => Math.max(T || 0, r),
    [T, r]
  );
  F(() => {
    const G = _.current;
    G && typeof w == "number" && (G.scrollTop = w);
  }, [w]);
  const he = () => {
    Q();
  };
  function Q(G) {
    const le = _.current;
    if (!le) return;
    const ee = {};
    ee.left = le.scrollLeft, g.exec("scroll-chart", ee);
  }
  function fe() {
    const G = _.current, ee = Math.ceil((T || 0) / (x || 1)) + 1, ae = Math.floor((G && G.scrollTop || 0) / (x || 1)), te = Math.max(0, ae - E), pe = ae + ee + E, Se = te * (x || 0);
    g.exec("render-data", {
      start: te,
      end: pe,
      from: Se
    });
  }
  F(() => {
    fe();
  }, [T, w]);
  const ye = R(
    (G) => {
      if (!G) return;
      const { id: le, mode: ee } = G;
      if (ee.toString().indexOf("x") < 0) return;
      const ae = _.current;
      if (!ae) return;
      const { clientWidth: te } = ae, pe = g.getTask(le);
      if (pe.$x + pe.$w < ae.scrollLeft)
        g.exec("scroll-chart", { left: pe.$x - (y || 0) }), ae.scrollLeft = pe.$x - (y || 0);
      else if (pe.$x >= te + ae.scrollLeft) {
        const Se = te < pe.$w ? y || 0 : pe.$w;
        g.exec("scroll-chart", { left: pe.$x - te + Se }), ae.scrollLeft = pe.$x - te + Se;
      }
    },
    [g, y]
  );
  F(() => {
    ye(M);
  }, [M]);
  function L(G) {
    if ($ && (G.ctrlKey || G.metaKey)) {
      G.preventDefault();
      const le = _.current, ee = G.clientX - (le ? le.getBoundingClientRect().left : 0);
      if (A.current += G.deltaY, Math.abs(A.current) >= 150) {
        const te = -Math.sign(A.current);
        A.current = 0, g.exec("zoom-scale", {
          dir: te,
          offset: ee
        });
      }
    }
  }
  const se = R((G) => {
    const le = a(G.date, G.unit);
    return le ? {
      css: le,
      width: G.width
    } : null;
  }, [a]), xe = N(() => {
    if (!b || !a || !["hour", "day", "week"].includes(b.minUnit)) return null;
    let le = 0;
    return b.rows[b.rows.length - 1].cells.map((ee) => {
      const ae = se(ee), te = le;
      return le += ee.width, ae ? { ...ae, left: te } : null;
    });
  }, [b, a, se]), ge = R(
    (G) => {
      G.eventSource = "chart", g.exec("hotkey", G);
    },
    [g]
  );
  F(() => {
    const G = _.current;
    if (!G) return;
    const le = () => V(G.clientHeight);
    le();
    const ee = new ResizeObserver(() => le());
    return ee.observe(G), () => {
      ee.disconnect();
    };
  }, [_.current]);
  const oe = z(null);
  return F(() => {
    const G = _.current;
    if (G && !oe.current)
      return oe.current = Tr(G, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (le) => ge(le)
      }), () => {
        oe.current?.destroy(), oe.current = null;
      };
  }, []), F(() => {
    const G = _.current;
    if (!G) return;
    const le = L;
    return G.addEventListener("wheel", le), () => {
      G.removeEventListener("wheel", le);
    };
  }, [L]), F(() => {
    if (!u || P.current || !b || !_.current || !T) return;
    const G = _.current, { clientWidth: le } = G, ee = /* @__PURE__ */ new Date(), ae = b.rows[b.rows.length - 1]?.cells;
    if (!ae) return;
    let te = -1, pe = 0;
    const Se = [];
    for (let ue = 0; ue < ae.length; ue++) {
      const be = ae[ue];
      Se.push({ left: pe, width: be.width });
      const ve = be.date;
      if (be.unit === "week") {
        const Pe = new Date(ve);
        Pe.setDate(Pe.getDate() + 7), ee >= ve && ee < Pe && (te = ue);
      } else be.unit === "day" && ee.getFullYear() === ve.getFullYear() && ee.getMonth() === ve.getMonth() && ee.getDate() === ve.getDate() && (te = ue);
      pe += be.width;
    }
    let ne = te;
    if (te > 0 && (ne = te - 1), ne >= 0 && Se[ne]) {
      const ue = Se[ne], be = Math.max(0, ue.left);
      G.scrollLeft = be, g.exec("scroll-chart", { left: be }), P.current = !0;
    }
  }, [u, b, T, g]), dd("chart"), /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: _,
      onScroll: he,
      children: [
        /* @__PURE__ */ p(ld, { highlightTime: a, scales: b }),
        k && k.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${ie}px` },
            children: k.map((G, le) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${G.css || ""}`,
                style: { left: `${G.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: G.text })
              },
              le
            ))
          }
        ) : null,
        /* @__PURE__ */ Z(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${ie}px` },
            children: [
              xe ? /* @__PURE__ */ p(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: xe.map(
                    (G, le) => G ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + G.css,
                        style: {
                          width: `${G.width}px`,
                          left: `${G.left}px`
                        }
                      },
                      le
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(nd, { borders: o }),
              m && m.length ? m.map(
                (G, le) => G.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": G.id,
                    style: Y[le]
                  },
                  G.id
                ) : null
              ) : null,
              /* @__PURE__ */ p(
                ad,
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
function fd(t) {
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
  } = t, [d, u] = Oe(t.value ?? 0), [f, g] = Oe(t.display ?? "all");
  function m(Q) {
    let fe = 0;
    e == "center" ? fe = n / 2 : e == "before" && (fe = n);
    const ye = {
      size: [n + "px", "auto"],
      p: [Q - fe + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let L in ye) ye[L] = ye[L].reverse();
    return ye;
  }
  const [h, w] = K(!1), [x, y] = K(null), b = z(0), k = z(), M = z(), $ = z(f);
  F(() => {
    $.current = f;
  }, [f]), F(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function D(Q) {
    return r == "x" ? Q.clientX : Q.clientY;
  }
  const T = R(
    (Q) => {
      const fe = k.current + D(Q) - b.current;
      u(fe);
      let ye;
      fe <= l ? ye = "chart" : i - fe <= c ? ye = "grid" : ye = "all", $.current !== ye && (g(ye), $.current = ye), M.current && clearTimeout(M.current), M.current = setTimeout(() => s && s(fe), 100);
    },
    [i, l, c, s]
  ), V = R(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", V);
  }, [T]), _ = N(
    () => f !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [f, r]
  ), A = R(
    (Q) => {
      !a && (f === "grid" || f === "chart") || (b.current = D(Q), k.current = d, w(!0), document.body.style.cursor = _, document.body.style.userSelect = "none", window.addEventListener("mousemove", T), window.addEventListener("mouseup", V));
    },
    [_, T, V, d, a, f]
  );
  function P() {
    g("all"), x !== null && (u(x), s && s(x));
  }
  function E(Q) {
    if (a) {
      const fe = f === "chart" ? "grid" : "chart";
      g(fe), o(fe);
    } else if (f === "grid" || f === "chart")
      P(), o("all");
    else {
      const fe = Q === "left" ? "chart" : "grid";
      g(fe), o(fe);
    }
  }
  function I() {
    E("left");
  }
  function Y() {
    E("right");
  }
  const ie = N(() => m(d), [d, e, n, r]), he = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${f}`,
    h ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Z(
    "div",
    {
      className: "wx-pFykzMlT " + he,
      onMouseDown: A,
      style: { width: ie.size[0], height: ie.size[1], cursor: _ },
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
              onClick: Y
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const hd = 650;
function Fo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let a = o.contentRect.width <= hd;
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
function gd(t) {
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
  } = t, f = $e(wt), g = re(f, "_tasks"), m = re(f, "_scales"), h = re(f, "cellHeight"), w = re(f, "columns"), x = re(f, "_scrollTask"), y = re(f, "undo"), b = N(() => {
    if (!a) return i;
    const ne = /* @__PURE__ */ new Map(), ue = /* @__PURE__ */ new Map();
    return g.forEach((be) => {
      const ve = be.row ?? be.id;
      ue.set(be.id, ve), ne.has(ve) || ne.set(ve, []), ne.get(ve).push(be.id);
    }), { rowMap: ne, taskRows: ue };
  }, [g, a, i]), [k, M] = K(!1);
  let [$, D] = K(0);
  const [T, V] = K(0), [_, A] = K(0), [P, E] = K(void 0), [I, Y] = K("all"), ie = z(null), he = R(
    (ne) => {
      M((ue) => (ne !== ue && (ne ? (ie.current = I, I === "all" && Y("grid")) : (!ie.current || ie.current === "all") && Y("all")), ne));
    },
    [I]
  );
  F(() => {
    const ne = Fo(he);
    return ne.observe(), () => {
      ne.disconnect();
    };
  }, [he]);
  const Q = N(() => {
    let ne;
    return w.every((ue) => ue.width && !ue.flexgrow) ? ne = w.reduce((ue, be) => ue + parseInt(be.width), 0) : k && I === "chart" ? ne = parseInt(w.find((ue) => ue.id === "action")?.width) || 50 : ne = 440, $ = ne, ne;
  }, [w, k, I]);
  F(() => {
    D(Q);
  }, [Q]);
  const fe = N(
    () => (T ?? 0) - (P ?? 0),
    [T, P]
  ), ye = N(() => m.width, [m]), L = N(() => {
    if (!a || !b)
      return g.length * h;
    const ne = /* @__PURE__ */ new Set();
    return g.forEach((ue) => {
      const be = b.taskRows.get(ue.id) ?? ue.id;
      ne.add(be);
    }), ne.size * h;
  }, [g, h, a, b]), se = N(
    () => m.height + L + fe,
    [m, L, fe]
  ), xe = N(
    () => $ + ye,
    [$, ye]
  ), ge = z(null), oe = R(() => {
    Promise.resolve().then(() => {
      if ((T ?? 0) > (xe ?? 0)) {
        const ne = (T ?? 0) - $;
        f.exec("expand-scale", { minWidth: ne });
      }
    });
  }, [T, xe, $, f]);
  F(() => {
    let ne;
    return ge.current && (ne = new ResizeObserver(oe), ne.observe(ge.current)), () => {
      ne && ne.disconnect();
    };
  }, [ge.current, oe]), F(() => {
    oe();
  }, [ye]);
  const G = z(null), le = z(null), ee = R(() => {
    const ne = G.current;
    ne && f.exec("scroll-chart", {
      top: ne.scrollTop
    });
  }, [f]), ae = z({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  F(() => {
    ae.current = {
      rTasks: g,
      rScales: m,
      rCellHeight: h,
      scrollSize: fe,
      ganttDiv: G.current,
      ganttHeight: _ ?? 0
    };
  }, [g, m, h, fe, _]);
  const te = R(
    (ne) => {
      if (!ne) return;
      const {
        rTasks: ue,
        rScales: be,
        rCellHeight: ve,
        scrollSize: Pe,
        ganttDiv: q,
        ganttHeight: ke
      } = ae.current;
      if (!q) return;
      const { id: Ce } = ne, me = ue.findIndex((we) => we.id === Ce);
      if (me > -1) {
        const we = ke - be.height, Te = me * ve, Ae = q.scrollTop;
        let Me = null;
        Te < Ae ? Me = Te : Te + ve > Ae + we && (Me = Te - we + ve + Pe), Me !== null && (f.exec("scroll-chart", { top: Math.max(Me, 0) }), G.current.scrollTop = Math.max(Me, 0));
      }
    },
    [f]
  );
  F(() => {
    te(x);
  }, [x]), F(() => {
    const ne = G.current, ue = le.current;
    if (!ne || !ue) return;
    const be = () => {
      Uo(() => {
        A(ne.offsetHeight), V(ne.offsetWidth), E(ue.offsetWidth);
      });
    }, ve = new ResizeObserver(be);
    return ve.observe(ne), () => ve.disconnect();
  }, [G.current]);
  const pe = z(null), Se = z(null);
  return F(() => {
    Se.current && (Se.current.destroy(), Se.current = null);
    const ne = pe.current;
    if (ne)
      return Se.current = Tr(ne, {
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
        exec: (ue) => {
          if (ue.isInput) return;
          const be = ue.key;
          if (be === "ctrl+z" || be === "meta+z") {
            f.exec("undo", {});
            return;
          }
          if (be === "ctrl+y" || be === "meta+shift+z") {
            f.exec("redo", {});
            return;
          }
          f.exec("hotkey", ue);
        }
      }), () => {
        Se.current?.destroy(), Se.current = null;
      };
  }, [y]), /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-gantt", ref: G, onScroll: ee, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: se, width: "100%" },
      ref: le,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: _,
            width: P
          },
          children: /* @__PURE__ */ Z("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: pe, children: [
            w.length ? /* @__PURE__ */ Z(Ie, { children: [
              /* @__PURE__ */ p(
                td,
                {
                  display: I,
                  compactMode: k,
                  columnWidth: Q,
                  width: $,
                  readonly: n,
                  fullHeight: L,
                  onTableAPIChange: o,
                  multiTaskRows: a,
                  rowMapping: b
                }
              ),
              /* @__PURE__ */ p(
                fd,
                {
                  value: $,
                  display: I,
                  compactMode: k,
                  containerWidth: T,
                  onMove: (ne) => D(ne),
                  onDisplayChange: (ne) => Y(ne)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: ge, children: /* @__PURE__ */ p(
              ud,
              {
                readonly: n,
                fullWidth: ye,
                fullHeight: L,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                multiTaskRows: a,
                rowMapping: b,
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
function pd(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function md(t, e) {
  return typeof t == "function" ? t : dt(t, e);
}
function Yo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: md(n, e)
  }));
}
function wd(t, e) {
  const n = pd(e);
  for (let r in n)
    n[r] = dt(n[r], t);
  return n;
}
function xd(t, e) {
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
function yd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Yo(n.scales, e)
    }))
  } : t;
}
const vd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), kd = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], bd = Ct(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = $o,
  tasks: s = [],
  selected: o = [],
  activeTask: a = null,
  links: i = [],
  scales: l = kd,
  columns: c = wo,
  start: d = null,
  end: u = null,
  lengthUnit: f = "day",
  durationUnit: g = "day",
  cellWidth: m = 100,
  cellHeight: h = 38,
  scaleHeight: w = 36,
  readonly: x = !1,
  cellBorders: y = "full",
  zoom: b = !1,
  baselines: k = !1,
  highlightTime: M = null,
  init: $ = null,
  autoScale: D = !0,
  unscheduledTasks: T = !1,
  criticalPath: V = null,
  schedule: _ = { type: "forward" },
  projectStart: A = null,
  projectEnd: P = null,
  calendar: E = null,
  undo: I = !1,
  splitTasks: Y = !1,
  multiTaskRows: ie = !1,
  marqueeSelect: he = !1,
  copyPaste: Q = !1,
  currentWeekHighlight: fe = !1,
  currentWeekColor: ye = null,
  scrollToCurrentWeek: L = !1,
  ...se
}, xe) {
  const ge = z();
  ge.current = se;
  const oe = N(() => new cl(Is), []), G = N(() => ({ ...en, ...En }), []), le = $e(Qe.i18n), ee = N(() => le ? le.extend(G, !0) : Dt(G), [le, G]), ae = N(() => ee.getRaw().calendar, [ee]), te = N(() => {
    let we = {
      zoom: yd(b, ae),
      scales: Yo(l, ae),
      columns: xd(c, ae),
      links: po(i),
      cellWidth: m
    };
    return we.zoom && (we = {
      ...we,
      ...qa(
        we.zoom,
        wd(ae, ee.getGroup("gantt")),
        we.scales,
        m
      )
    }), we;
  }, [b, l, c, i, m, ae, ee]), pe = z(null);
  pe.current !== s && (ar(s, { durationUnit: g, calendar: E }), pe.current = s), F(() => {
    ar(s, { durationUnit: g, calendar: E });
  }, [s, g, E, Y]);
  const Se = N(() => {
    if (!ie) return null;
    const we = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), Ae = (Me) => {
      Me.forEach((Le) => {
        const We = Le.row ?? Le.id;
        Te.set(Le.id, We), we.has(We) || we.set(We, []), we.get(We).push(Le.id), Le.data && Le.data.length > 0 && Ae(Le.data);
      });
    };
    return Ae(s), { rowMap: we, taskRows: Te };
  }, [s, ie]), ne = N(() => oe.in, [oe]), ue = z(null);
  ue.current === null && (ue.current = new Os((we, Te) => {
    const Ae = "on" + vd(we);
    ge.current && ge.current[Ae] && ge.current[Ae](Te);
  }), ne.setNext(ue.current));
  const [be, ve] = K(null), Pe = z(null);
  Pe.current = be;
  const q = N(
    () => ({
      getState: oe.getState.bind(oe),
      getReactiveState: oe.getReactive.bind(oe),
      getStores: () => ({ data: oe }),
      exec: ne.exec,
      setNext: (we) => (ue.current = ue.current.setNext(we), ue.current),
      intercept: ne.intercept.bind(ne),
      on: ne.on.bind(ne),
      detach: ne.detach.bind(ne),
      getTask: oe.getTask.bind(oe),
      serialize: oe.serialize.bind(oe),
      getTable: (we) => we ? new Promise((Te) => setTimeout(() => Te(Pe.current), 1)) : Pe.current,
      getHistory: () => oe.getHistory()
    }),
    [oe, ne]
  );
  Nt(
    xe,
    () => ({
      ...q
    }),
    [q]
  );
  const ke = z(0);
  F(() => {
    ke.current ? oe.init({
      tasks: s,
      links: te.links,
      start: d,
      columns: te.columns,
      end: u,
      lengthUnit: f,
      cellWidth: te.cellWidth,
      cellHeight: h,
      scaleHeight: w,
      scales: te.scales,
      taskTypes: r,
      zoom: te.zoom,
      selected: o,
      activeTask: a,
      baselines: k,
      autoScale: D,
      unscheduledTasks: T,
      markers: n,
      durationUnit: g,
      criticalPath: V,
      schedule: _,
      projectStart: A,
      projectEnd: P,
      calendar: E,
      undo: I,
      _weekStart: ae.weekStart,
      splitTasks: Y
    }) : $ && $(q), ke.current++;
  }, [
    q,
    $,
    s,
    te,
    d,
    u,
    f,
    h,
    w,
    r,
    o,
    a,
    k,
    D,
    T,
    n,
    g,
    V,
    _,
    A,
    P,
    E,
    I,
    ae,
    Y,
    oe
  ]), ke.current === 0 && oe.init({
    tasks: s,
    links: te.links,
    start: d,
    columns: te.columns,
    end: u,
    lengthUnit: f,
    cellWidth: te.cellWidth,
    cellHeight: h,
    scaleHeight: w,
    scales: te.scales,
    taskTypes: r,
    zoom: te.zoom,
    selected: o,
    activeTask: a,
    baselines: k,
    autoScale: D,
    unscheduledTasks: T,
    markers: n,
    durationUnit: g,
    criticalPath: V,
    schedule: _,
    projectStart: A,
    projectEnd: P,
    calendar: E,
    undo: I,
    _weekStart: ae.weekStart,
    splitTasks: Y
  });
  const Ce = N(() => {
    const we = /* @__PURE__ */ new Date(), Te = ae?.weekStart ?? 0, Ae = new Date(we), Le = (Ae.getDay() - Te + 7) % 7;
    Ae.setDate(Ae.getDate() - Le), Ae.setHours(0, 0, 0, 0);
    const We = new Date(Ae);
    return We.setDate(We.getDate() + 7), (Ze) => Ze >= Ae && Ze < We;
  }, [ae]), me = N(() => (we, Te) => {
    let Ae = [];
    if (E)
      Te == "day" && !E.getDayHours(we) && Ae.push("wx-weekend"), Te == "hour" && !E.getDayHours(we) && Ae.push("wx-weekend");
    else if (M) {
      const Me = M(we, Te);
      Me && Ae.push(Me);
    }
    return fe && (Te === "week" || Te === "day") && Ce(we) && Ae.push("wx-current-week"), Ae.join(" ");
  }, [E, M, fe, Ce]);
  return /* @__PURE__ */ p(Qe.i18n.Provider, { value: ee, children: /* @__PURE__ */ p(wt.Provider, { value: q, children: /* @__PURE__ */ p(
    gd,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: me,
      onTableAPIChange: ve,
      multiTaskRows: ie,
      rowMapping: Se,
      marqueeSelect: he,
      copyPaste: Q,
      scrollToCurrentWeek: L,
      currentWeekColor: ye
    }
  ) }) });
});
function Sd({ api: t = null, items: e = [] }) {
  const n = $e(Qe.i18n), r = N(() => n || Dt(En), [n]), s = N(() => r.getGroup("gantt"), [r]), o = ct(t, "_selected"), a = ct(t, "undo"), i = ct(t, "history"), l = ct(t, "splitTasks"), c = ["undo", "redo"], d = N(() => {
    const f = cr();
    return (e.length ? e : cr()).map((m) => {
      let h = { ...m, disabled: !1 };
      return h.handler = Nr(f, h.id) ? (w) => It(t, w.id, null, s) : h.handler, h.text && (h.text = s(h.text)), h.menuText && (h.menuText = s(h.menuText)), h;
    });
  }, [e, t, s, a, l]), u = N(() => {
    const f = [];
    return d.forEach((g) => {
      const m = g.id;
      if (m === "add-task")
        f.push(g);
      else if (c.includes(m))
        c.includes(m) && f.push({
          ...g,
          disabled: g.isDisabled(i)
        });
      else {
        if (!o?.length || !t) return;
        f.push({
          ...g,
          disabled: g.isDisabled && o.some((h) => g.isDisabled(h, t.getState()))
        });
      }
    }), f.filter((g, m) => {
      if (t && g.isHidden)
        return !o.some((h) => g.isHidden(h, t.getState()));
      if (g.comp === "separator") {
        const h = f[m + 1];
        if (!h || h.comp === "separator") return !1;
      }
      return !0;
    });
  }, [t, o, i, d]);
  return n ? /* @__PURE__ */ p(ur, { items: u }) : /* @__PURE__ */ p(Qe.i18n.Provider, { value: r, children: /* @__PURE__ */ p(ur, { items: u }) });
}
const $d = Ct(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: a,
  onClick: i,
  css: l
}, c) {
  const d = z(null), u = z(null), f = $e(Qe.i18n), g = N(() => f || Dt({ ...En, ...en }), [f]), m = N(() => g.getGroup("gantt"), [g]), h = ct(n, "taskTypes"), w = ct(n, "selected"), x = ct(n, "_selected"), y = ct(n, "splitTasks"), b = N(() => lr(), []);
  F(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function k(E) {
    return E.map((I) => (I = { ...I }, I.text && (I.text = m(I.text)), I.subtext && (I.subtext = m(I.subtext)), I.data && (I.data = k(I.data)), I));
  }
  function M() {
    const E = e.length ? e : lr(), I = E.find((Y) => Y.id === "convert-task");
    return I && (I.data = [], (h || []).forEach((Y) => {
      I.data.push(I.dataFactory(Y));
    })), k(E);
  }
  const $ = N(() => M(), [n, e, h, y, m]), D = N(
    () => x && x.length ? x : [],
    [x]
  ), T = R(
    (E, I) => {
      let Y = E ? n?.getTask(E) : null;
      if (r) {
        const ie = r(E, I);
        Y = ie === !0 ? Y : ie;
      }
      if (Y) {
        const ie = bt(I.target, "data-segment");
        ie !== null ? u.current = { id: Y.id, segmentIndex: ie } : u.current = Y.id, (!Array.isArray(w) || !w.includes(Y.id)) && n && n.exec && n.exec("select-task", { id: Y.id });
      }
      return Y;
    },
    [n, r, w]
  ), V = R(
    (E) => {
      const I = E.action;
      I && (Nr(b, I.id) && It(n, I.id, u.current, m), i && i(E));
    },
    [n, m, i, b]
  ), _ = R(
    (E, I) => {
      const Y = D.length ? D : I ? [I] : [];
      let ie = s ? Y.every((he) => s(E, he)) : !0;
      if (ie && (E.isHidden && (ie = !Y.some(
        (he) => E.isHidden(he, n.getState(), u.current)
      )), E.isDisabled)) {
        const he = Y.some(
          (Q) => E.isDisabled(Q, n.getState(), u.current)
        );
        E.disabled = he;
      }
      return ie;
    },
    [s, D, n]
  );
  Nt(c, () => ({
    show: (E, I) => {
      d.current && d.current.show && d.current.show(E, I);
    }
  }));
  const A = R((E) => {
    d.current && d.current.show && d.current.show(E);
  }, []), P = /* @__PURE__ */ Z(Ie, { children: [
    /* @__PURE__ */ p(
      Ao,
      {
        filter: _,
        options: $,
        dataKey: "id",
        resolver: T,
        onClick: V,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: A, "data-menu-ignore": "true", children: typeof a == "function" ? a() : a })
  ] });
  if (!f && Qe.i18n?.Provider) {
    const E = Qe.i18n.Provider;
    return /* @__PURE__ */ p(E, { value: g, children: P });
  }
  return P;
}), hr = {};
function _s(t) {
  return typeof t < "u" ? hr[t] || t : hr.text;
}
function nt(t, e) {
  hr[t] = e;
}
const _d = {
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
  } = t, c = z(null);
  F(() => {
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
  const d = $e(Qe.i18n), u = N(() => d.getGroup("editor"), [d]), f = N(
    () => e.config[0].comp === "readonly" && e.config.every((g) => !Object.keys(n).includes(g.key)),
    [e, n]
  );
  return /* @__PURE__ */ Z("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    i,
    f ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((g) => {
      if (!g.hidden) {
        const { key: m, onChange: h, ...w } = g;
        if (g.comp === "readonly" || g.comp === "section") {
          const x = _s(g.comp);
          return /* @__PURE__ */ p(
            x,
            {
              fieldKey: m,
              label: g.label,
              value: n[m],
              ...w,
              onClick: a
            },
            m
          );
        } else {
          const x = _s(g.comp);
          return /* @__PURE__ */ Z("div", { children: [
            /* @__PURE__ */ p(
              Xt,
              {
                label: g.labelTemplate ? g.labelTemplate(n[m]) : g.label ?? "",
                required: g.required,
                children: /* @__PURE__ */ p(
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
            s && s[m] && g.validationMessage ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-message", children: g.validationMessage }) : null
          ] }, m);
        }
      }
      return null;
    })
  ] });
}
function Cd(t) {
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
function Nd(t) {
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
function Dd(t) {
  const e = t.map((a) => {
    const i = { ...a };
    return a.config && Object.assign(i, a.config), i.key = a.key || Ui(), i.setter = a.setter || Nd(a.key), i.getter = a.getter || Cd(a.key), i;
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
      !Rn(u, f) && (u !== void 0 || f) && c.push(d.key);
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
function Td({
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
  onChange: g,
  onSave: m,
  onAction: h,
  onValidation: w,
  hotkeys: x
}) {
  const y = $e(Qe.i18n).getGroup("editor"), [b, k] = Oe(t), [M, $] = K(null), D = N(() => {
    const L = Dd(e);
    M && L.config.forEach((ge) => {
      ge.comp === "section" && ge.key === M && (ge.sectionMode === "accordion" ? ge.activeSection || (L.config.forEach((oe) => {
        oe.comp === "section" && oe.key !== ge.key && (oe.activeSection = !1);
      }), ge.activeSection = !0) : ge.activeSection = !ge.activeSection);
    });
    let se = /* @__PURE__ */ new Set(), xe = null;
    return L.config.forEach((ge) => {
      ge.sectionMode === "exclusive" && ge.activeSection && (xe = ge.key), ge.activeSection && se.add(ge.key);
    }), L.config.forEach((ge) => {
      ge.hidden = ge.hidden || r && r !== ge.batch || xe && ge.key != xe && ge.section !== xe || ge.section && !se.has(ge.section);
    }), a ? {
      ...L,
      config: L.config.map((ge) => ({ ...ge, comp: "readonly" })),
      diff: () => []
    } : L;
  }, [e, M, r, a]), [T, V] = K({}), [_, A] = K({}), P = b;
  F(() => {
    b !== void 0 && (V(bn(b)), A(bn(b)), P.errors && (P.errors = ie()));
  }, [b]);
  const [E, I] = K([]);
  F(() => {
    b && I([]);
  }, [b]);
  function Y(L) {
    return [...new Set(L)];
  }
  function ie(L) {
    const se = D.validateValues(T, L, y);
    return Rn(se, P.errors) || w && w({ errors: se, values: T }), se;
  }
  function he(L, se) {
    if (s && !P.errors) {
      const xe = D.setValues(b, se ?? _, L);
      k(xe), m && m({ changes: L, values: xe });
    } else
      I(L);
  }
  function Q({ value: L, key: se, input: xe }) {
    let ge = { ..._ || {}, [se]: L };
    const oe = {
      key: se,
      value: L,
      update: ge
    };
    if (xe && (oe.input = xe), g && g(oe), !b) return;
    ge = oe.update, A(ge);
    const G = D.diff(b, ge), le = D.setValues(
      { ...T || {} },
      ge,
      Y([...G, se])
    );
    if (V(le), G.length) {
      const ee = s ? [] : Y([...G, ...Object.keys(P.errors ?? {}), se]);
      P.errors = ie(ee), he(G, ge);
    } else {
      const ee = Object.keys(P.errors ?? {});
      ee.length && (P.errors = ie(ee)), I([]);
    }
  }
  function fe() {
    if (E.length && (s || (P.errors = ie()), !P.errors)) {
      m && m({
        changes: E,
        values: T
      });
      const L = D.setValues(b, _, E);
      k(L), I([]), k({ ...T });
    }
  }
  function ye({ item: L }) {
    L.id === "save" ? fe() : L.id === "toggle-section" && $(L.key), h && h({ item: L, values: T, changes: E });
  }
  return /* @__PURE__ */ p(
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
      editors: D,
      focus: o,
      hotkeys: x,
      errors: P.errors,
      onClick: ye,
      onKeyDown: ye,
      onChange: Q,
      children: f
    }
  );
}
function Md(t) {
  const { editors: e, data: n, layout: r, errors: s, focus: o, onClick: a, onChange: i } = t, l = N(() => {
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
      qn,
      {
        editors: l[0],
        data: n,
        errors: s,
        onClick: a,
        onChange: i
      }
    ) }),
    /* @__PURE__ */ p("div", { className: "wx-bNrSbszs wx-right", children: /* @__PURE__ */ p(
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
  ] }) : /* @__PURE__ */ p(
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
function Cs({
  items: t,
  values: e = null,
  top: n = !0,
  onClick: r,
  onChange: s
}) {
  const o = R(
    ({ item: a, value: i }) => {
      s && s({ key: a.key, value: i });
    },
    [s]
  );
  return t.length ? /* @__PURE__ */ p(
    "div",
    {
      className: `wx-66OW1j0R wx-editor-toolbar ${n ? "wx-topbar" : "wx-bottom"}`,
      children: /* @__PURE__ */ p(
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
const Kt = () => ({ comp: "spacer" }), Xn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Qn = (t) => ({
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
    bottomBar: a,
    layout: i,
    placement: l,
    errors: c,
    readonly: d,
    autoSave: u,
    children: f,
    onClick: g,
    onKeyDown: m,
    onChange: h,
    hotkeys: w
  } = t, x = $e(Qe.i18n), y = N(() => x.getGroup("editor"), [x]), b = N(
    () => o === !0 && a === !0,
    [o, a]
  ), k = N(() => {
    let _ = o && o.items ? o.items.map((A) => ({ ...A })) : [];
    return b && (d ? _ = [Kt(), Ns()] : (u ? _ = [Kt(), Ns()] : l !== "modal" && (_ = [Kt(), Xn(y), Qn(y)]), i === "columns" && !_.length && (_ = [Kt(), Qn(y), Xn(y)]))), _;
  }, [o, b, d, u, l, i, y]), M = N(() => {
    let _ = a && a.items ? a.items.map((A) => ({ ...A })) : [];
    return b && (d || (l === "modal" && !u && (_ = [Kt(), Qn(y), Xn(y)]), i === "columns" && k.length && (_ = []))), _;
  }, [a, b, d, l, u, i, k, y]), $ = N(() => [...k, ...M], [k, M]), D = z(null), T = z(null);
  T.current = (_, ...A) => {
    const P = $.findIndex((Y) => A.includes(Y.id));
    if (P === -1) return !1;
    const E = _.target, I = $[P];
    _.key == "Escape" && (E.closest(".wx-combo") || E.closest(".wx-multicombo") || E.closest(".wx-richselect")) || _.key == "Delete" && (E.tagName === "INPUT" || E.tagName === "TEXTAREA") || (_.preventDefault(), m && m({ item: I }));
  };
  const V = N(() => w === !1 ? {} : {
    "ctrl+s": (_) => T.current(_, "save"),
    escape: (_) => T.current(_, "cancel", "close"),
    "ctrl+d": (_) => T.current(_, "delete"),
    ...w || {}
  }, [w]);
  return di(V, D), /* @__PURE__ */ Z("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: D, children: [
    /* @__PURE__ */ p(
      Cs,
      {
        ...o && typeof o == "object" ? o : {},
        items: k,
        values: e,
        onClick: g,
        onChange: h
      }
    ),
    /* @__PURE__ */ Z(
      "div",
      {
        className: `wx-85HDaNoA wx-content${i === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          f,
          /* @__PURE__ */ p(
            Md,
            {
              editors: n,
              layout: i,
              data: e,
              focus: r,
              errors: c,
              onClick: g,
              onChange: h
            }
          ),
          /* @__PURE__ */ p(
            Cs,
            {
              ...a && typeof a == "object" ? a : {},
              items: M,
              values: e,
              top: !1,
              onClick: g,
              onChange: h
            }
          )
        ]
      }
    )
  ] });
}
function Ed(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ p(Vi, { children: /* @__PURE__ */ p(
    Zn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ p(Gi, { onCancel: o, children: /* @__PURE__ */ p(
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
function Rd(t) {
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
    ...g
  } = t, m = Object.keys(g).reduce((h, w) => {
    if (/^on[a-z]/.test(w)) {
      const x = "on" + w.charAt(2).toUpperCase() + w.slice(3);
      x in g ? h[w] = g[w] : h[x] = g[w];
    } else
      h[w] = g[w];
    return h;
  }, {});
  return /* @__PURE__ */ p(Mn, { words: _d, optional: !0, children: /* @__PURE__ */ p(
    Td,
    {
      view: Ed,
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
function Id({ value: t, options: e, label: n }) {
  const r = $e(Qe.i18n).getGroup("editor"), s = N(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const a = e.find((i) => i.id === t);
      a && (o = a.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(Xt, { label: n, children: s }) : null;
}
function Ad({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
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
nt("text", rn);
nt("textarea", wi);
nt("checkbox", xi);
nt("readonly", Id);
nt("section", Ad);
gr(Xe);
function Hd({ api: t, autoSave: e, onLinksChange: n }) {
  const s = $e(Qe.i18n).getGroup("gantt"), o = re(t, "activeTask"), a = re(t, "_activeTask"), i = re(t, "_links"), l = re(t, "schedule"), c = re(t, "unscheduledTasks"), [d, u] = K();
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
  const g = N(
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
  function h(w, x) {
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
  return /* @__PURE__ */ p(Ie, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(Xt, { label: w.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: w.data.map((y) => /* @__PURE__ */ Z("tr", { children: [
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ p(
        rn,
        {
          type: "number",
          placeholder: s("Lag"),
          value: y.link.lag,
          disabled: c && a?.unscheduled,
          onChange: (b) => {
            b.input || h(y.link.id, { lag: b.value });
          }
        }
      ) }) : null,
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-wrapper", children: /* @__PURE__ */ p(
        vi,
        {
          value: y.link.type,
          placeholder: s("Select link type"),
          options: g,
          onChange: (b) => h(y.link.id, { type: b.value }),
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
function Ld(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...a } = t, i = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()), d.setMinutes(e.getMinutes()), i && i({ value: d });
  }
  return /* @__PURE__ */ Z("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ p(
      Li,
      {
        ...a,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ p(Yi, { value: e, onChange: i, format: r }) : null
  ] });
}
nt("select", Ls);
nt("date", Ld);
nt("twostate", Ps);
nt("slider", tr);
nt("counter", Pi);
nt("links", Hd);
function Pd({
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
  const u = $e(Qe.i18n), f = N(() => u || Dt({ ...En, ...en }), [u]), g = N(() => f.getGroup("gantt"), [f]), m = f.getRaw(), h = N(() => {
    const q = m.gantt?.dateFormat || m.formats?.dateFormat;
    return dt(q, m.calendar);
  }, [m]), w = N(() => {
    if (i === !0 && !s) {
      const q = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: g("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: q } : {
        items: [
          ...q,
          {
            comp: "button",
            type: "primary",
            text: g("Save"),
            id: "save"
          }
        ]
      };
    }
    return i;
  }, [i, s, l, g]), [x, y] = K(!1), b = N(
    () => x ? "wx-full-screen" : "",
    [x]
  ), k = R((q) => {
    y(q);
  }, []);
  F(() => {
    const q = Fo(k);
    return q.observe(), () => {
      q.disconnect();
    };
  }, [k]);
  const M = re(t, "_activeTask"), $ = re(t, "activeTask"), D = re(t, "unscheduledTasks"), T = re(t, "links"), V = re(t, "splitTasks"), _ = N(
    () => V && $?.segmentIndex,
    [V, $]
  ), A = N(
    () => _ || _ === 0,
    [_]
  ), P = N(
    () => bo(),
    [D]
  ), E = re(t, "undo"), [I, Y] = K({}), [ie, he] = K(null), [Q, fe] = K(), [ye, L] = K(null), se = re(t, "taskTypes"), xe = N(() => {
    if (!M) return null;
    let q;
    if (A && M.segments ? q = { ...M.segments[_] } : q = { ...M }, s) {
      let ke = { parent: q.parent };
      return P.forEach(({ key: Ce, comp: me }) => {
        if (me !== "links") {
          const we = q[Ce];
          me === "date" && we instanceof Date ? ke[Ce] = h(we) : me === "slider" && Ce === "progress" ? ke[Ce] = `${we}%` : ke[Ce] = we;
        }
      }), ke;
    }
    return q || null;
  }, [M, A, _, s, P, h]);
  F(() => {
    fe(xe);
  }, [xe]), F(() => {
    Y({}), L(null), he(null);
  }, [$]);
  function ge(q, ke) {
    return q.map((Ce) => {
      const me = { ...Ce };
      if (Ce.config && (me.config = { ...me.config }), me.comp === "links" && t && (me.api = t, me.autoSave = l, me.onLinksChange = le), me.comp === "select" && me.key === "type") {
        const we = me.options ?? (se || []);
        me.options = we.map((Te) => ({
          ...Te,
          label: g(Te.label)
        }));
      }
      return me.comp === "slider" && me.key === "progress" && (me.labelTemplate = (we) => `${g(me.label)} ${we}%`), me.label && (me.label = g(me.label)), me.config?.placeholder && (me.config.placeholder = g(me.config.placeholder)), ke && (me.isDisabled && me.isDisabled(ke, t.getState()) ? me.disabled = !0 : delete me.disabled), me;
    });
  }
  const oe = N(() => {
    let q = e.length ? e : P;
    return q = ge(q, Q), Q ? q.filter(
      (ke) => !ke.isHidden || !ke.isHidden(Q, t.getState())
    ) : q;
  }, [e, P, Q, se, g, t, l]), G = N(
    () => oe.map((q) => q.key),
    [oe]
  );
  function le({ id: q, action: ke, data: Ce }) {
    Y((me) => ({
      ...me,
      [q]: { action: ke, data: Ce }
    }));
  }
  const ee = R(() => {
    for (let q in I)
      if (T.byId(q)) {
        const { action: ke, data: Ce } = I[q];
        t.exec(ke, Ce);
      }
  }, [t, I, T]), ae = R(() => {
    const q = $?.id || $;
    if (A) {
      if (M?.segments) {
        const ke = M.segments.filter(
          (Ce, me) => me !== _
        );
        t.exec("update-task", {
          id: q,
          task: { segments: ke }
        });
      }
    } else
      t.exec("delete-task", { id: q });
  }, [t, $, A, M, _]), te = R(() => {
    t.exec("show-editor", { id: null });
  }, [t]), pe = R(
    (q) => {
      const { item: ke, changes: Ce } = q;
      ke.id === "delete" && ae(), ke.id === "save" && (Ce.length ? te() : ee()), ke.comp && te();
    },
    [t, $, l, ee, ae, te]
  ), Se = R(
    (q, ke, Ce) => (D && q.type === "summary" && (q.unscheduled = !1), yo(q, t.getState(), ke), Ce || he(!1), q),
    [D, t]
  ), ne = R(
    (q) => {
      q = {
        ...q,
        unscheduled: D && q.unscheduled && q.type !== "summary"
      }, delete q.links, delete q.data, (G.indexOf("duration") === -1 || q.segments && !q.duration) && delete q.duration;
      const ke = {
        id: $?.id || $,
        task: q,
        ...A && { segmentIndex: _ }
      };
      l && ie && (ke.inProgress = ie), t.exec("update-task", ke), l || ee();
    },
    [
      t,
      $,
      D,
      l,
      ee,
      G,
      A,
      _,
      ie
    ]
  ), ue = R(
    (q) => {
      let { update: ke, key: Ce, input: me } = q;
      if (me && he(!0), q.update = Se({ ...ke }, Ce, me), !l) fe(q.update);
      else if (!ye && !me) {
        const we = oe.find((Me) => Me.key === Ce), Te = ke[Ce];
        (!we.validation || we.validation(Te)) && (!we.required || Te) && ne(q.update);
      }
    },
    [l, Se, ye, oe, ne]
  ), be = R(
    (q) => {
      l || ne(q.values);
    },
    [l, ne]
  ), ve = R((q) => {
    L(q.errors);
  }, []), Pe = N(
    () => E ? {
      "ctrl+z": (q) => {
        q.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (q) => {
        q.preventDefault(), t.exec("redo");
      }
    } : {},
    [E, t]
  );
  return xe ? /* @__PURE__ */ p(Mn, { children: /* @__PURE__ */ p(
    Rd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${b} ${n}`,
      items: oe,
      values: xe,
      topBar: w,
      bottomBar: a,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: pe,
      onSave: be,
      onValidation: ve,
      onChange: ue,
      hotkeys: d && { ...Pe, ...d }
    }
  ) }) : null;
}
const Wd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = K(null);
  return F(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(Jc, { api: r, columns: e, children: t });
};
function zd(t) {
  const { api: e, content: n, children: r } = t, s = z(null), o = z(null), [a, i] = K({}), [l, c] = K(null), [d, u] = K({});
  function f(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const M = k.getAttribute("data-tooltip-id"), $ = k.getAttribute("data-tooltip-at"), D = k.getAttribute("data-tooltip");
        if (M || D) return { id: M, tooltip: D, target: k, at: $ };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  F(() => {
    const k = o.current;
    if (k && d && (d.text || n)) {
      const M = k.getBoundingClientRect();
      let $ = !1, D = d.left, T = d.top;
      M.right >= a.right && (D = a.width - M.width - 5, $ = !0), M.bottom >= a.bottom && (T = d.top - (M.bottom - a.bottom + 2), $ = !0), $ && u((V) => V && { ...V, left: D, top: T });
    }
  }, [d, a, n]);
  const g = z(null), m = 300, h = (k) => {
    clearTimeout(g.current), g.current = setTimeout(() => {
      k();
    }, m);
  };
  function w(k) {
    let { id: M, tooltip: $, target: D, at: T } = f(k.target);
    if (u(null), c(null), !$)
      if (M)
        $ = y(M);
      else {
        clearTimeout(g.current);
        return;
      }
    const V = k.clientX;
    h(() => {
      M && c(x(b(M)));
      const _ = D.getBoundingClientRect(), A = s.current, P = A ? A.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let E, I;
      T === "left" ? (E = _.top + 5 - P.top, I = _.right + 5 - P.left) : (E = _.top + _.height - P.top, I = V - P.left), i(P), u({ top: E, left: I, text: $ });
    });
  }
  function x(k) {
    return e?.getTask(b(k)) || null;
  }
  function y(k) {
    return x(k)?.text || "";
  }
  function b(k) {
    const M = parseInt(k);
    return isNaN(M) ? k : M;
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
function Od({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Ur, { fonts: t, children: e() }) : /* @__PURE__ */ p(Ur, { fonts: t });
}
function Fd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(qr, { fonts: t, children: e }) : /* @__PURE__ */ p(qr, { fonts: t });
}
function Yd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Xr, { fonts: t, children: e }) : /* @__PURE__ */ p(Xr, { fonts: t });
}
const Jd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: $d,
  Editor: Pd,
  Gantt: bd,
  HeaderMenu: Wd,
  Material: Od,
  Toolbar: Sd,
  Tooltip: zd,
  Willow: Fd,
  WillowDark: Yd,
  defaultColumns: wo,
  defaultEditorItems: So,
  defaultMenuOptions: vo,
  defaultTaskTypes: $o,
  defaultToolbarButtons: ko,
  getEditorItems: bo,
  getMenuOptions: lr,
  getToolbarButtons: cr,
  registerEditorItem: nt,
  registerScaleUnit: Ba
}, Symbol.toStringTag, { value: "Module" }));
export {
  Jd as default
};
