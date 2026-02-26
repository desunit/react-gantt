import { jsx as p, jsxs as Q, Fragment as He } from "react/jsx-runtime";
import Go, { useState as K, useEffect as B, useRef as Y, createContext as Pt, useContext as Se, useMemo as $, useCallback as E, forwardRef as _t, useImperativeHandle as Tt, useId as Bo, Fragment as Ds } from "react";
import { createPortal as Ko, flushSync as jo } from "react-dom";
function Ke(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function er(t, e = "data-id") {
  const n = Ke(t, e);
  return n ? n.getAttribute(e) : null;
}
function bt(t, e = "data-id") {
  const n = Ke(t, e);
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
var Qe = qo();
function pr(t) {
  Object.assign(Qe, t);
}
function Hr(t, e, n) {
  function r(s) {
    const o = Ke(s);
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
  Qe.addEvent(t, n, r);
}
function Ns(t, e) {
  Hr(t, e, "click"), e.dblclick && Hr(t, e.dblclick, "dblclick");
}
function Xo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Ms = /* @__PURE__ */ new Date(), Sn = !1, hn = [], St = [], Lr = (t) => {
  if (Sn) {
    Sn = !1;
    return;
  }
  for (let e = St.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = St[e];
    if (!(r > Ms) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Qo = (t) => {
  Ms = /* @__PURE__ */ new Date(), Sn = !0;
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
    Qe.addGlobalEvent("click", Lr, t),
    Qe.addGlobalEvent("contextmenu", Lr, t),
    Qe.addGlobalEvent("mousedown", Qo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return St.push(n), {
    destroy() {
      Xo(St, n), St.length || (hn.forEach((r) => r()), hn = []);
    }
  };
}
var gn = (t) => t.indexOf("bottom") !== -1, pn = (t) => t.indexOf("left") !== -1, mn = (t) => t.indexOf("right") !== -1, Fn = (t) => t.indexOf("top") !== -1, Or = (t) => t.indexOf("fit") !== -1, wn = (t) => t.indexOf("overlap") !== -1, Zo = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), Jo = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function ei(t, e) {
  let n = 0;
  const r = Qe.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ge, qe, Kt, Be;
function ti(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ge = r, qe = s, Kt = "auto";
  let o = 0, i = 0;
  const a = ni(t), l = wn(n) ? Qe.getTopNode(t) : a;
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
    const b = ei(e, a);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (Be = e.getBoundingClientRect(), Or(n) && (Kt = Be.width + "px"), n !== "point")
      if (Zo(n))
        Or(n) ? Ge = 0 : (Ge = u.width / 2, i = 1), qe = (u.height - d.height) / 2;
      else {
        const b = wn(n) ? 0 : 1;
        Ge = mn(n) ? Be.right + b : Be.left - b, qe = gn(n) ? Be.bottom + 1 : Be.top;
        const k = Jo(n);
        k && (mn(n) || pn(n) ? k === "center" ? qe -= (d.height - Be.height) / 2 : k === "end" && (qe -= d.height - Be.height) : (gn(n) || Fn(n)) && (k === "center" ? Ge -= (d.width - Be.width) / 2 : k === "end" && (Ge -= d.width - Be.width), wn(n) || (Ge += 1)));
      }
  } else Be = { left: r, right: r, top: s, bottom: s };
  const m = (pn(n) || mn(n)) && (gn(n) || Fn(n));
  pn(n) && (i = 2);
  const f = Ge - d.width - u.left;
  e && pn(n) && !m && f < 0 && (Ge = Be.right, i = 0);
  const w = Ge + d.width * (1 - i / 2) - u.right;
  if (w > 0)
    if (!mn(n))
      Ge = u.right - g.right - d.width;
    else {
      const b = Be.left - u.x - d.width;
      e && !wn(n) && !m && b >= 0 ? Ge = Be.left - d.width : Ge -= w + g.right;
    }
  i && (Ge = Math.round(Ge - d.width * i / 2));
  const x = f < 0 || w > 0 || !m;
  Fn(n) && (qe = Be.top - d.height, e && qe < u.y && x && (qe = Be.bottom));
  const y = qe + d.height - u.bottom;
  return y > 0 && (e && gn(n) && x ? qe -= d.height + Be.height + 1 : qe -= y + g.bottom), Ge -= c.left + g.left, qe -= c.top + g.top, Ge = Math.max(Ge, 0) + l.scrollLeft, qe = Math.max(qe, 0) + l.scrollTop, Kt = Kt || "auto", { x: Ge, y: qe, z: o, width: Kt };
}
function ni(t) {
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
}, Ht = [], Wr = {
  subscribe: (t) => {
    si();
    const e = new ri();
    return Ht.push(e), t(e), () => {
      const n = Ht.findIndex((r) => r === e);
      n >= 0 && Ht.splice(n, 1);
    };
  }
}, zr = !1;
function si() {
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
function oi(t) {
  const e = Xe(t);
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
var Ur = ["", ""];
function ii(t, e, n) {
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
      return oi(e.getMilliseconds());
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
var ai = /%[a-zA-Z]/g;
function dt(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      ai,
      (r) => ii(r, n, e)
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
function Fe(t) {
  const [e, n] = K(t), r = Y(t);
  return B(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function li(t, e, n) {
  const [r, s] = K(() => e);
  return t || console.warn(`Writable ${n} is not defined`), B(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function oe(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return li(r[e], n[e], e);
}
function ct(t, e) {
  const [n, r] = K(() => null);
  return B(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function ci(t, e) {
  const n = Y(e);
  n.current = e;
  const [r, s] = K(1);
  return B(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function Qt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ci(r[e], n[e]);
}
function di(t, e) {
  B(() => {
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
function Is(t) {
  const e = {};
  return t.split(";").forEach((n) => {
    const [r, s] = n.split(":");
    if (s) {
      let o = r.trim();
      o.indexOf("-") && (o = o.replace(/-([a-z])/g, (i, a) => a.toUpperCase())), e[o] = s.trim();
    }
  }), e;
}
function Rs(t) {
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
    const o = Ke(s);
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
  return Qe.addEvent(t, n, r);
}
function ui(t, e) {
  const n = [Vr(t, e, "click")];
  return e.dblclick && n.push(Vr(t, e.dblclick, "dblclick")), () => {
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
}, rn = {
  core: gi,
  calendar: hi,
  formats: pi,
  lang: fi
}, sn = Pt("willow"), mi = Pt({}), et = Pt(null), xr = Pt(null), Ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: xr,
  helpers: mi,
  i18n: et,
  theme: sn
}, Symbol.toStringTag, { value: "Module" }));
function zt(t) {
  const e = Se(xr);
  return t || e;
}
function wi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a
}) {
  const l = zt(e), [c, d] = Fe(t), u = E(
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
  ), g = Y(null);
  return B(() => {
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
  return /* @__PURE__ */ Q(
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
function xi({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const i = Bo(), a = zt(t) || i, [l, c] = Fe(r);
  return /* @__PURE__ */ Q("div", { className: "wx-2IvefP wx-checkbox", children: [
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
    /* @__PURE__ */ Q("label", { htmlFor: a, className: "wx-2IvefP wx-label", children: [
      /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-before" }),
      e && /* @__PURE__ */ p("span", { className: "wx-2IvefP wx-after", children: e })
    ] })
  ] });
}
function Ft({
  position: t = "bottom",
  align: e = "start",
  autoFit: n = !0,
  onCancel: r,
  width: s = "100%",
  children: o
}) {
  const i = Y(null), [a, l] = Fe(t), [c, d] = Fe(e);
  return B(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), g = Qe.getTopNode(u).getBoundingClientRect();
        h.right >= g.right && d("end"), h.bottom >= g.bottom && l("top");
      }
    }
  }, [n]), B(() => {
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
function on() {
  return Dt(rn);
}
function yi() {
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
  const s = Y(), o = Y(yi()), [i, a] = K(null), l = Y(i), c = (Se(et) || on()).getGroup("core"), d = (h) => {
    h && h.stopPropagation(), n && n({ id: t[l.current]?.id });
  };
  B(() => {
    o.current.init(
      s.current,
      t,
      (h) => {
        a(h), l.current = h;
      },
      d
    );
  }, [t, s.current]), B(() => {
    r && r(o.current);
  }, []);
  const u = E(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null ? null : /* @__PURE__ */ p(Ft, { onCancel: u, children: /* @__PURE__ */ p(
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
function vi({
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
  const h = zt(e), g = Y(null), m = Y(null), [f, w] = Fe(t), [x, y] = K(!1), [b, k] = K(""), T = Y(null), S = Y(!1), _ = $(() => {
    if (x) return b;
    if (f || f === 0) {
      const Z = (r || n).find((ce) => ce.id === f);
      if (Z) return Z[s];
    }
    return "";
  }, [x, b, f, r, n, s]), M = $(() => !_ || !x ? n : n.filter(
    (Z) => Z[s].toLowerCase().includes(_.toLowerCase())
  ), [_, x, n, s]), G = E(
    () => M.findIndex((Z) => Z.id === f),
    [M, f]
  ), C = E((Z) => {
    g.current = Z.navigate, m.current = Z.keydown;
  }, []), H = E(
    (Z, ce) => {
      if (Z || Z === 0) {
        let ye = n.find((O) => O.id === Z);
        if (y(!1), ce && g.current(null), ye && f !== ye.id) {
          const O = ye.id;
          w(O), u && u({ value: O });
        }
      }
      !S.current && ce && T.current.focus();
    },
    [n, f, u]
  ), A = E(
    ({ id: Z }) => {
      H(Z, !0);
    },
    [H]
  ), z = E(
    (Z) => {
      Z && Z.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), D = E(
    (Z) => {
      if (!n.length) return;
      if (Z === "" && c) {
        z();
        return;
      }
      let ce = n.find((O) => O[s] === Z);
      ce || (ce = n.find(
        (O) => O[s].toLowerCase().includes(Z.toLowerCase())
      ));
      const ye = ce ? ce.id : f || n[0].id;
      H(ye, !1);
    },
    [n, s, c, f, H, z]
  ), F = E(() => {
    k(T.current.value), y(!0), M.length ? g.current(0) : g.current(null);
  }, [M.length, g]), ae = E(() => {
    S.current = !0;
  }, []), de = E(() => {
    S.current = !1, setTimeout(() => {
      S.current || D(_);
    }, 200);
  }, [D, _]);
  return /* @__PURE__ */ Q(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => g.current(G()),
      onKeyDown: (Z) => m.current(Z, G()),
      title: i,
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            className: "wx-1j11Jk wx-input " + (l ? "wx-error" : ""),
            id: h,
            ref: T,
            value: _,
            disabled: a,
            placeholder: o,
            onFocus: ae,
            onBlur: de,
            onInput: F
          }
        ),
        c && !a && f ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: z }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !a && /* @__PURE__ */ p(En, { items: M, onReady: C, onSelect: A, children: ({ option: Z }) => /* @__PURE__ */ p(He, { children: d ? d({ option: Z }) : Z[s] }) })
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
  const f = zt(e), [w, x] = Fe(t), y = Y(null), b = $(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), k = $(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  B(() => {
    const G = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(G);
  }, [r, s]);
  const T = E(
    (G) => {
      const C = G.target.value;
      x(C), m && m({ value: C, input: !0 });
    },
    [m]
  ), S = E(
    (G) => m && m({ value: G.target.value }),
    [m]
  );
  function _(G) {
    G.stopPropagation(), x(""), m && m({ value: "" });
  }
  let M = o;
  return o !== "password" && o !== "number" && (M = "text"), B(() => {
    const G = S, C = y.current;
    return C.addEventListener("change", G), () => {
      C && C.removeEventListener("change", G);
    };
  }, [S]), /* @__PURE__ */ Q(
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
            type: M,
            style: c,
            title: d,
            value: w,
            onInput: T
          }
        ),
        g && !a && w ? /* @__PURE__ */ Q(He, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: _ }),
          k && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function ki({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = Se(et).getRaw(), i = t.getFullYear(), a = $(() => {
    switch (e) {
      case "month":
        return dt(o.monthYearFormat, s)(t);
      case "year":
        return dt(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Es(i), u = dt(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, i, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ Q("div", { className: "wx-8HQVQV wx-header", children: [
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
function bi({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (Se(et) || on()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (k, T, S) => new Date(
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
  const m = Y(0);
  function f(k, T) {
    T.timeStamp !== m.current && (m.current = T.timeStamp, T.stopPropagation(), o && o(new Date(new Date(k))), s && s());
  }
  const w = $(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = $(() => {
    const k = h(), T = g(), S = e.getMonth();
    let _ = [];
    for (let M = k; M <= T; M.setDate(M.getDate() + 1)) {
      const G = {
        day: M.getDate(),
        in: M.getMonth() === S,
        date: M.valueOf()
      };
      let C = "";
      if (C += G.in ? "" : " wx-inactive", C += w.indexOf(G.date) > -1 ? " wx-selected" : "", d) {
        const H = G.date == w[0], A = G.date == w[1];
        H && !A ? C += " wx-left" : A && !H && (C += " wx-right"), G.date > w[0] && G.date < w[1] && (C += " wx-inrange");
      }
      if (C += u(M) ? " wx-weekend" : "", r) {
        const H = r(M);
        H && (C += " " + H);
      }
      _.push({ ...G, css: C });
    }
    return _;
  }, [e, w, d, r]), y = Y(null);
  let b = Y({});
  return b.current.click = f, B(() => {
    Ns(y.current, b.current);
  }, []), /* @__PURE__ */ Q("div", { children: [
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
  const [i, a] = Fe(t || /* @__PURE__ */ new Date()), [l, c] = Fe(e || /* @__PURE__ */ new Date()), d = Se(et).getRaw().calendar, u = d.monthShort || [], h = $(() => l.getMonth(), [l]), g = E(
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
    const w = new Date(As(i, n) || l);
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
  return /* @__PURE__ */ Q(He, { children: [
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
const Un = "wx-1XEF33", $i = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = Se(et).getRaw().calendar, [a, l] = Fe(e), [c, d] = Fe(t), u = $(() => a.getFullYear(), [a]), h = $(() => {
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
      const b = new Date(a);
      b.setFullYear(x), l(b), s && s({ current: b });
    }
    o === "normal" && d(new Date(a)), n && n();
  }
  function f() {
    const x = new Date(As(c, o) || a);
    x.setFullYear(a.getFullYear()), r && r(x);
  }
  const w = Y(null);
  return B(() => {
    w.current && Ns(w.current, g);
  }, []), /* @__PURE__ */ Q(He, { children: [
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
}, Gr = {
  month: {
    component: bi,
    next: _i,
    prev: Ci
  },
  year: {
    component: Si,
    next: Di,
    prev: Ti
  },
  duodecade: {
    component: $i,
    next: Mi,
    prev: Ni
  }
};
function Ci(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function _i(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function Ti(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Di(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Ni(t) {
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
function Ii(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Ri({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a
}) {
  const l = Se(et).getGroup("calendar"), [c, d] = K("month"), u = Array.isArray(o) ? o : o ? Ei : [], h = (x, y) => {
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
      const k = Gr[c];
      n(y > 0 ? k.next(e) : k.prev(e));
    } else b && n(b);
    i && i();
  }, f = (x) => {
    d("month"), a && a({ select: !0, value: x });
  }, w = $(() => Gr[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ Q("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p(ki, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ Q("div", { children: [
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
              onClick: (y) => h(y, Ii(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function In(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = Se(et);
  const o = $(() => {
    let i = s;
    return (!i || !i.extend) && (i = Dt(rn)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ p(et.Provider, { value: o, children: r });
}
function Br(t, e, n, r) {
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
  const [o, i] = Fe(t), [a, l] = Fe(e);
  B(() => {
    Br(a, o, l, !1);
  }, [o, a]);
  const c = E(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), Br(a, new Date(h), l, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, a]
  ), d = E(
    (u) => {
      l(u);
    },
    [l]
  );
  return a ? /* @__PURE__ */ p(In, { children: /* @__PURE__ */ p(
    Ri,
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
const Hi = ["clear", "today"];
function Li({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: i = "",
  format: a = "",
  buttons: l = Hi,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: h = !1,
  onChange: g
}) {
  const { calendar: m, formats: f } = (Se(et) || on()).getRaw(), w = a || f?.dateFormat;
  let x = typeof w == "function" ? w : dt(w, m);
  const [y, b] = K(t), [k, T] = K(!1);
  B(() => {
    b(t);
  }, [t]);
  function S() {
    T(!1);
  }
  function _(C) {
    const H = C === y || C && y && C.valueOf() === y.valueOf() || !C && !y;
    b(C), H || g && g({ value: C }), setTimeout(S, 1);
  }
  const M = $(
    () => y ? x(y) : "",
    [y, x]
  );
  function G({ value: C, input: H }) {
    if (!u && !h || H) return;
    let A = typeof u == "function" ? u(C) : C ? new Date(C) : null;
    A = isNaN(A) ? y || null : A || null, _(A);
  }
  return B(() => {
    const C = S;
    return window.addEventListener("scroll", C), () => window.removeEventListener("scroll", C);
  }, []), /* @__PURE__ */ Q("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => T(!0), children: [
    /* @__PURE__ */ p(
      an,
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
        onChange: G,
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
      Ft,
      {
        onCancel: S,
        width: s,
        align: o,
        autoFit: !!o,
        children: /* @__PURE__ */ p(
          Hs,
          {
            buttons: l,
            value: y,
            onChange: (C) => _(C.value)
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
  title: i = "",
  textField: a = "label",
  clear: l = !1,
  children: c,
  onChange: d
}) {
  const u = Y(null), h = Y(null);
  let [g, m] = Fe(t);
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
  return /* @__PURE__ */ Q(
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
  const d = zt(t), [u, h] = Fe(o), g = Y({ value: u, input: u }), m = $(
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
  B(() => {
    h(o);
  }, [o]);
  const y = Y(null);
  return B(() => {
    if (y.current)
      return y.current.addEventListener("change", x), () => {
        y.current && y.current.removeEventListener("change", x);
      };
  }, [y, x]), /* @__PURE__ */ Q("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
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
const Oi = ({
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
  const c = zt(t), [d, u] = Fe(e), h = E(() => {
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
  return /* @__PURE__ */ Q(
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
function Pi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ Q(
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
function Wi({ data: t = [] }) {
  return /* @__PURE__ */ p("div", { className: "wx-3nwoO9 wx-notices", children: t.map((e) => /* @__PURE__ */ p(Pi, { notice: e }, e.id)) });
}
function zi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const a = (Se(et) || on()).getGroup("core"), l = Y(null);
  B(() => {
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
      children: /* @__PURE__ */ Q("div", { className: "wx-1FxkZa wx-window", children: [
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
function Fi({ children: t }, e) {
  const [n, r] = K(null), [s, o] = K([]);
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
  ), /* @__PURE__ */ Q(He, { children: [
    t,
    n && /* @__PURE__ */ p(
      zi,
      {
        title: n.title,
        buttons: n.buttons,
        onConfirm: n.resolve,
        onCancel: n.reject,
        children: n.message
      }
    ),
    /* @__PURE__ */ p(Wi, { data: s })
  ] });
}
_t(Fi);
function Jt({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const a = $(() => mr(), []);
  return /* @__PURE__ */ p(xr.Provider, { value: a, children: /* @__PURE__ */ Q(
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
const Os = ({
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
  const [g, m] = Fe(t), f = $(() => (g ? "pressed" : "") + (e ? " " + e : ""), [g, e]), w = E(
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
}, Kr = new Date(0, 0, 0, 0, 0);
function Ui({
  value: t = Kr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = Fe(t);
  const { calendar: d, formats: u } = (Se(et) || on()).getRaw(), h = d.clockFormat == 12, g = 23, m = 59, f = $(() => {
    const O = i || u?.timeFormat;
    return typeof O == "function" ? O : dt(O, d);
  }, [i, u, d]), w = $(() => f(new Date(0, 0, 0, 1)).indexOf("01") != -1, [f]), x = (O, le) => (O < 10 && le ? `0${O}` : `${O}`).slice(-2), y = (O) => x(O, !0), b = (O) => `${O}`.replace(/[^\d]/g, "") || 0, k = (O) => h && (O = O % 12, O === 0) ? "12" : x(O, w), T = E((O, le) => (O = b(O), Math.min(O, le)), []), [S, _] = K(null), M = l || Kr, G = T(M.getHours(), g), C = T(M.getMinutes(), m), H = G > 12, A = k(G), z = y(C), D = $(
    () => f(new Date(0, 0, 0, G, C)),
    [G, C, f]
  ), F = E(() => {
    _(!0);
  }, []), ae = E(() => {
    const O = new Date(M);
    O.setHours(O.getHours() + (H ? -12 : 12)), c(O), a && a({ value: O });
  }, [M, H, a]), de = E(
    ({ value: O }) => {
      if (M.getHours() === O) return;
      const le = new Date(M);
      le.setHours(O), c(le), a && a({ value: le });
    },
    [M, a]
  ), Z = E(
    ({ value: O }) => {
      if (M.getMinutes() === O) return;
      const le = new Date(M);
      le.setMinutes(O), c(le), a && a({ value: le });
    },
    [M, a]
  ), ce = E(
    (O) => (O = T(O, g), h && (O = O * 1, O === 12 && (O = 0), H && (O += 12)), O),
    [T, h, H]
  ), ye = E(() => {
    _(null);
  }, []);
  return /* @__PURE__ */ Q(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : F,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ p(
          an,
          {
            id: e,
            css: r,
            title: n,
            value: D,
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
        S && !s && /* @__PURE__ */ p(Ft, { onCancel: ye, width: "unset", children: /* @__PURE__ */ Q("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ Q("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: A,
                onChange: (O) => {
                  const le = ce(O.target.value);
                  de({ value: le });
                }
              }
            ),
            /* @__PURE__ */ p("div", { className: "wx-7f497i wx-separator", children: ":" }),
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: z,
                onChange: (O) => {
                  const le = T(O.target.value, m);
                  Z({ value: le });
                }
              }
            ),
            h && /* @__PURE__ */ p(
              Os,
              {
                value: H,
                onClick: ae,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(Jt, { width: "unset", children: /* @__PURE__ */ p(
            nr,
            {
              label: d.hours,
              value: G,
              onChange: de,
              max: g
            }
          ) }),
          /* @__PURE__ */ p(Jt, { width: "unset", children: /* @__PURE__ */ p(
            nr,
            {
              label: d.minutes,
              value: C,
              onChange: Z,
              max: m
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Yi({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-modal", children: /* @__PURE__ */ p("div", { className: "wx-KgpO9N wx-window", children: t }) });
}
function Vi({ position: t = "right", children: e, onCancel: n }) {
  const r = Y(null);
  return B(() => nn(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Ps({ theme: t = "", target: e, children: n }) {
  const r = Y(null), s = Y(null), [o, i] = K(null);
  r.current || (r.current = document.createElement("div"));
  const a = Se(sn);
  return B(() => {
    i(
      e || Gi(s.current) || Qe.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ Q(He, { children: [
    /* @__PURE__ */ p("span", { ref: s, style: { display: "none" } }),
    s.current && o ? Ko(
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
function Gi(t) {
  const e = Qe.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Bi() {
  return /* @__PURE__ */ p(He, {});
}
function jr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(sn.Provider, { value: "material", children: /* @__PURE__ */ Q(He, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ Q(He, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Bi, {}),
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
function Ws() {
  return /* @__PURE__ */ p(He, {});
}
function qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(sn.Provider, { value: "willow", children: /* @__PURE__ */ Q(He, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ Q(He, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Ws, {}),
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
  return /* @__PURE__ */ p(sn.Provider, { value: "willow-dark", children: /* @__PURE__ */ Q(He, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ Q(He, { children: [
      /* @__PURE__ */ p(
        "link",
        {
          rel: "preconnect",
          href: "https://cdn.svar.dev",
          crossOrigin: "true"
        }
      ),
      /* @__PURE__ */ p(Ws, {}),
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
};
var Ki = (/* @__PURE__ */ new Date()).valueOf(), ji = () => Ki++;
function qi(t, e) {
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
      return qi(t, e);
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
}, Fs = (/* @__PURE__ */ new Date()).valueOf(), Xi = () => Fs++;
function vr() {
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
      const o = t[s], i = n.get(o.parent);
      i && (i.data || (i.data = []), i.data.push(o));
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
    Zi(a, c);
    const d = s ? l.data.length : xn(l, o.id) + (e === "after" ? 1 : 0);
    if (Zr(l, d, r), a.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== i && (r.$level = i, this.setLevel(r, i + 1, !0)), this.update(r.id, r), this._clearBranch(a);
  }
  _clearBranch(t) {
    t.data && !t.data.length && (t.open && delete t.open, this.update(t.id, { data: null }));
  }
  toArray() {
    const t = [], e = this._pool.get(0).data;
    return e && Us(e, t), t;
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
function Us(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Us(n.data, e);
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
function xn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Ys = 2, Ji = class {
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
      a ? (a.__parse(c, d, s, o) && (n[i] = c), o & Ys ? s[d] = a.__trigger : a.__trigger()) : (c && c.__reactive ? e[i] = this._wrapNested(c, c, d, s) : e[i] = this._wrapWritable(c), n[i] = c), s[d] = s[d] || null;
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
}, ea = class {
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
      s.length = Math.max(...s.in.map((o) => Vs(o, this._sources, 1)));
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
    const e = this._setter(t, Ys);
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
function Vs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Vs(o, e, n + 1));
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
    return e.data?.forEach((i, a) => {
      const l = this.copy(i, s.id, a);
      o = o.concat(l);
    }), o;
  }
  normalizeTask(e) {
    const n = e.id || vr(), r = e.parent || 0, s = e.text || "", o = e.type || "task", i = e.progress || 0, a = e.details || "", l = { ...e, id: n, text: s, parent: r, progress: i, type: o, details: a };
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
    r && (ia(r, e), r.forEach((s) => {
      this.sortBranch(e, s.id);
    }));
  }
  serialize() {
    const e = [], n = this._pool.get(0).data;
    return n && Gs(n, e), e;
  }
}
function Gs(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Gs(n.data, e);
  });
}
function _e(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function ht(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Hn(t, e) {
  const n = _e(t);
  return isNaN(e) ? ht(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function kr(t, e) {
  const n = _e(t);
  if (isNaN(e)) return ht(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ht(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Bs(t, e) {
  const n = +_e(t);
  return ht(t, n + e);
}
const Ks = 6048e5, la = 864e5, js = 6e4, qs = 36e5;
function ca(t, e) {
  return Bs(t, e * qs);
}
let da = {};
function Xs() {
  return da;
}
function Cn(t, e) {
  const n = Xs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = _e(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function en(t) {
  return Cn(t, { weekStartsOn: 1 });
}
function ua(t) {
  const e = _e(t), n = e.getFullYear(), r = ht(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = en(r), o = ht(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = en(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function $t(t) {
  const e = _e(t);
  return e.setHours(0, 0, 0, 0), e;
}
function _n(t) {
  const e = _e(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Qs(t, e) {
  const n = $t(t), r = $t(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / la);
}
function Jr(t) {
  const e = ua(t), n = ht(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), en(n);
}
function fa(t, e) {
  return Bs(t, e * js);
}
function ha(t, e) {
  const n = e * 3;
  return kr(t, n);
}
function Zs(t, e) {
  const n = e * 7;
  return Hn(t, n);
}
function ga(t, e) {
  return kr(t, e * 12);
}
function Zt(t, e) {
  const n = _e(t), r = _e(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function pa(t, e) {
  const n = $t(t), r = $t(e);
  return +n == +r;
}
function br(t, e) {
  const n = en(t), r = en(e), s = +n - _n(n), o = +r - _n(r);
  return Math.round((s - o) / Ks);
}
function ma(t, e) {
  const n = _e(t), r = _e(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function wa(t, e) {
  const n = _e(t), r = _e(e);
  return n.getFullYear() - r.getFullYear();
}
function Sr(t) {
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
  return Sr(n?.roundingMethod)(r);
}
function ya(t, e, n) {
  const r = Js(t, e) / js;
  return Sr(n?.roundingMethod)(r);
}
function eo(t) {
  const e = _e(t);
  return e.setHours(23, 59, 59, 999), e;
}
function $r(t) {
  const e = _e(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function va(t) {
  const e = _e(t);
  return +eo(e) == +$r(e);
}
function to(t, e) {
  const n = _e(t), r = _e(e), s = Zt(n, r), o = Math.abs(ma(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Zt(n, r) === -s;
    va(_e(t)) && o === 1 && Zt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function ka(t, e, n) {
  const r = to(t, e) / 3;
  return Sr(n?.roundingMethod)(r);
}
function ba(t, e) {
  const n = _e(t), r = _e(e), s = Zt(n, r), o = Math.abs(wa(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Zt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function tn(t) {
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
function Ca(t) {
  const e = _e(t);
  return e.setMinutes(59, 59, 999), e;
}
function _a(t, e) {
  const n = Xs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = _e(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Cr(t) {
  const e = _e(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function ro(t) {
  const e = _e(t), n = e.getFullYear(), r = e.getMonth(), s = ht(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Ta(t) {
  const e = _e(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function so(t) {
  const e = _e(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : Ta(e) ? 366 : 365;
}
function Da(t) {
  const e = Jr(t), n = +Jr(Zs(e, 60)) - +e;
  return Math.round(n / Ks);
}
function Rt(t, e) {
  const n = _e(t), r = _e(e);
  return +n == +r;
}
function Na(t) {
  const e = _e(t);
  return e.setMinutes(0, 0, 0), e;
}
function Ma(t, e, n) {
  const r = Cn(t, n), s = Cn(e, n);
  return +r == +s;
}
function Ea(t, e) {
  const n = _e(t), r = _e(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Ia(t, e) {
  const n = tn(t), r = tn(e);
  return +n == +r;
}
function Ra(t, e) {
  const n = _e(t), r = _e(e);
  return n.getFullYear() === r.getFullYear();
}
const rr = { year: ba, quarter: ka, month: to, week: br, day: Qs, hour: xa, minute: ya }, pt = { year: { quarter: 4, month: 12, week: Da, day: Aa, hour: Ha }, quarter: { month: 3, week: La, day: oo, hour: Oa }, month: { week: Pa, day: Wa, hour: za }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Aa(t) {
  return t ? so(t) : 365;
}
function Ha(t) {
  return so(t) * 24;
}
function La(t) {
  const e = tn(t), n = Hn($t(Cr(t)), 1);
  return br(n, e);
}
function oo(t) {
  if (t) {
    const e = tn(t), n = Cr(t);
    return Qs(n, e) + 1;
  }
  return 91;
}
function Oa(t) {
  return oo(t) * 24;
}
function Pa(t) {
  if (t) {
    const e = no(t), n = Hn($t($r(t)), 1);
    return br(n, e);
  }
  return 5;
}
function Wa(t) {
  return t ? ro(t) : 30;
}
function za(t) {
  return ro(t) * 24;
}
function Tn(t, e, n) {
  const r = pt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Fa(t, e) {
  return t === e || !!(pt[t] && pt[t][e]);
}
const Dn = { year: ga, quarter: ha, month: kr, week: Zs, day: Hn, hour: ca, minute: fa };
function _r(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !pt[t][o] || typeof pt[t][o] == "number" || lo(t, r, s, n) ? Xt(t, r, s, o, i, n) : Ua(r, s, t, o, i, n);
}
function Xt(t, e, n, r, s, o) {
  const i = r || t;
  let a = n, l = e;
  if (s && (a = ft(i, n, o), l = ft(i, e, o), l < e && (l = at(i)(l, 1))), t !== i) {
    const c = rr[i](l, a), d = Tn(t, i, n);
    return c / d;
  } else return rr[i](l, a);
}
function Ua(t, e, n, r, s, o) {
  let i = 0;
  const a = ft(n, e, o);
  if (e > a) {
    const c = Dn[n](a, 1);
    i = Xt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return lo(n, e, t, o) || (l = Xt(n, ft(n, t, o), e, void 0, void 0, o), e = Dn[n](e, l)), l += i + Xt(n, t, e, r, void 0, o), !l && s && (l = Xt(n, t, e, r, s, o)), l;
}
function at(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Dn[t];
}
const io = { year: $a, quarter: tn, month: no, week: (t, e) => Cn(t, { weekStartsOn: e }), day: $t, hour: Na };
function ft(t, e, n) {
  const r = io[t];
  return r ? r(e, n) : new Date(e);
}
const Ya = { year: Sa, quarter: Cr, month: $r, week: (t, e) => _a(t, { weekStartsOn: e }), day: eo, hour: Ca }, ao = { year: Ra, quarter: Ia, month: Ea, week: (t, e, n) => Ma(t, e, { weekStartsOn: n }), day: pa };
function lo(t, e, n, r) {
  const s = ao[t];
  return s ? s(e, n, r) : !1;
}
const Va = { start: io, end: Ya, add: Dn, isSame: ao, diff: rr, smallerCount: pt }, es = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ga(t, e) {
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
    else Va[n][t] = e[n];
  }
}
function Yn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Ba(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function Ot(t) {
  const e = /* @__PURE__ */ new Date();
  return t.map((n) => ({ item: n, len: at(n.unit)(e, 1) })).sort((n, r) => n.len < r.len ? -1 : 1)[0].item;
}
const st = ["year", "quarter", "month", "week", "day", "hour"], sr = 50, or = 300;
function Ka(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, a = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, l = !0);
  });
  const c = at(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function ja(t, e, n, r, s, o, i) {
  const a = Ot(i).unit, l = _r(a, void 0, o), c = l(e, t, "", !0), d = ft(a, e, o);
  t = ft(a, t, o), e = d < e ? at(a)(d, 1) : d;
  const u = c * r, h = s * i.length, g = i.map((f) => {
    const w = [], x = at(f.unit);
    let y = ft(f.unit, t, o);
    for (; y < e; ) {
      const b = x(y, f.step), k = y < t ? t : y, T = b > e ? e : b, S = l(T, k, "", !0) * r, _ = typeof f.format == "function" ? f.format(y, b) : f.format;
      let M = "";
      f.css && (M += typeof f.css == "function" ? f.css(y) : f.css), w.push({ width: S, value: _, date: k, css: M, unit: f.unit }), y = b;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return a !== n && (m = Math.round(m / Tn(a, n)) || 1), { rows: g, width: u, height: h, diff: l, start: t, end: e, lengthUnit: n, minUnit: a, lengthUnitWidth: m };
}
function qa(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = st.indexOf(Ot(n).unit);
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
function Xa(t, e, n, r, s, o, i) {
  t.level = n;
  let a;
  const l = r.scales || r, c = Ot(l).unit, d = Qa(c, s);
  if (e === -1) {
    const g = Tn(c, s);
    a = i * g;
  } else {
    const g = Tn(Ot(o).unit, c);
    a = Math.round(i / g);
  }
  const u = r.minCellWidth ?? sr, h = r.maxCellWidth ?? or;
  return { scales: l, cellWidth: Math.min(h, Math.max(u, a)), lengthUnit: d, zoom: t };
}
function Qa(t, e) {
  const n = st.indexOf(t), r = st.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : st[r];
}
function yn(t, e) {
  return t ?? e;
}
const ir = 8, co = 4, Za = 3, ts = 7, Ja = ir + co;
function uo(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && ho(s, n, r), s.$x += e, uo(s, e, n, r);
  });
}
function ar(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    fo(o, i, n, r), o.$x = i.xMin, o.$w = i.xMax - i.xMin, ar(t, o, n, r);
  }
}
function fo(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && ho(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const i = s.$x + s.$w - o;
      e.xMax < i && (e.xMax = i);
    }
    s.type !== "summary" && fo(s, e, n, r);
  });
}
function ho(t, e, n) {
  t.$x = Math.round(e.diff(t.start, e.start, e.lengthUnit) * n), t.$w = Math.round(e.diff(t.end, t.start, e.lengthUnit, !0) * n);
}
function Tr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length) r.data.forEach((s) => {
    if (s.unscheduled && !s.data) return;
    (e || s.type != "summary" && s.data) && (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }), s = Tr(s, e)), s.start && (!r.start || r.start > s.start) && (r.start = new Date(s.start));
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
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = n, { start: l, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", g = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), f = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let b = t[h], k = t[g];
  if (r && !b) {
    t[y] = !0;
    return;
  }
  t[h] < l && (t[g] < l || Rt(t[g], l)) ? b = k = l : t[h] > c && (b = k = c), t[m] = Math.round(u(b, l, d) * s), t[f] = r ? t.$y + t.$h + co : o * e + Za, t[w] = Math.round(u(k, b, d, !0) * s), t[x] = r ? ir : a ? o - ts - Ja : o - ts, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[f] = t.$y + ir, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = Rt(b, k);
}
const Vn = 20, el = function(t, e, n, r, s) {
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
    const h = nl(l, c + o, d, u + o, i, a, r / 2, s), g = rl(d, u + o, a);
    t.$p = `${h},${g}`, t.$pl = tl(t.$p);
  }
  return t;
};
function tl(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s], [a, l] = n[s + 1];
    r += Math.hypot(a - o, l - i);
  }
  return r;
}
function nl(t, e, n, r, s, o, i, a) {
  const l = Vn * (s ? -1 : 1), c = Vn * (o ? -1 : 1), d = t + l, u = n + c, h = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], g = u - d;
  let m = r - e;
  const f = o === s;
  return f || (u <= t + Vn - 2 && o || u > t && !o) && (m = a ? m - i + 6 : m - i), f && o && d > u || f && !o && d < u ? (h[4] = h[2] + g, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + g, h[7] = h[5]), h.join(",");
}
function rl(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function po(t) {
  return t.map((e) => {
    const n = e.id || vr();
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
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && ol(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const wo = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function At(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, a = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, g = !i && d.includes(e), m = { parent: u.includes(e), level: h[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !g)) {
    if (e !== "paste-task" && (t._temp = null), a.includes(e) || g || s.length === 1) rs(t, e, n, r);
    else if (i) {
      const f = l.includes(e) ? s : al(s, o, m);
      c.includes(e) && f.reverse();
      const w = t.getHistory();
      w && w.startBatch(), f.forEach((x, y) => rs(t, e, x, r, y)), w && w.endBatch();
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
const ss = (t, e) => at(t, e), ll = (t, e) => _r(t, e);
function lr(t, e) {
  Array.isArray(t) && (t.forEach((n) => vt(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Tr(n, t);
      n.start = r, n.end = s, vt(n, e);
    }
  }));
}
function vt(t, e) {
  t.unscheduled || os(t, e, !1), t.base_start && os(t, e, !0);
}
function os(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, a, l] = xo(n);
  t.type === "milestone" ? (t[l] = 0, t[a] = void 0) : t[i] && (t[l] ? t[a] = ss(o, r)(t[i], t[l]) : t[a] ? t[l] = ll(o, r)(t[a], t[i]) : (t[a] = ss(o, r)(t[i], 1), t[l] = 1));
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
      const { _end: o, _start: i, start: a, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!a || !l || u) {
        const h = Ot(d).unit, g = Ka(a, l, u, h, c);
        (g._end != o || g._start != i) && this.setState(g, s);
      } else this.setState({ _start: a, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: a, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: h } = o, g = Ot(u).unit;
      Fa(g, i) || (i = g);
      const m = ja(a, l, i, c, d, h, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), h = a.toArray().map((g, m) => go(g, m, { cellWidth: o, cellHeight: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: h }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: a, baselines: l, criticalPath: c } = this.getState(), d = i.map((u) => {
        const h = o.byId(u.source), g = o.byId(u.target);
        return el(u, h, g, a, l);
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
    } }], { tasks: (s) => new aa(s), links: (s) => new Qr(s), columns: (s) => il(s) });
    const n = this.in = new ta();
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
          const x = w[w.length - 1], y = d.findIndex((_) => _.id == x), b = d.findIndex((_) => _.id == s), k = Math.min(y, b), T = Math.max(y, b) + 1, S = d.slice(k, T).map((_) => _.id);
          y > b && S.reverse(), S.forEach((_) => {
            w.includes(_) || w.push(_);
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
      !o.source || !o.target || (o.type || (o.type = "e2s"), o.id = o.id || vr(), i.add(o), this.setStateAsync({ links: i }), s.id = o.id, s.link = i.byId(o.id));
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
          uo(u, x, c, d);
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
      const b = _r(x, m);
      if (a && (c.start && (c.start = y(c.start, a)), !i && i !== 0 && (c.start && c.end ? c.duration = f.duration : (c.start ? c.end = f.end : (c.end = y(c.end, a), c.start = f.start, c.duration = b(c.end, c.start)), b(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? f.type, m && c.start && (c.start = Yn(c.start, a, m)), c.start && c.end && (!Rt(c.start, f.start) || !Rt(c.end, f.end)) && c.type === "summary" && f.data?.length) {
        let T = a || b(c.start, f.start);
        m && (T = c.start > f.start ? b(c.start, f.start) : -b(f.start, c.start), y = Ba(m)), this.moveSummaryKids(f, (S) => (S = y(S, T), m ? Yn(S, a, m) : S), "update-task");
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
          let _;
          if (S?.length) {
            const M = S[S.length - 1];
            if (!M.$skip) {
              const G = new Date(M.start.valueOf());
              i.start <= G && (_ = G);
            }
          }
          g.start = _ || at(l, d)(i.start, 1);
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], lr(s.data.tasks, { durationUnit: a, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Qr(i.map((u) => u).concat(po(s.data.links))) });
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
      const { cellWidth: o, scales: i, _scales: a } = this.getState(), l = Xa(e, n, r, s, a.lengthUnit, i, o);
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
      const d = Tr({ ...l, start: void 0, end: void 0, duration: void 0 });
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
function cr(t) {
  return [...vo];
}
function Nr(t) {
  return t.map((e) => {
    switch (e.data && Nr(e.data), e.id) {
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
const xl = (t) => (e) => e.type === t, vo = Nr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: xl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => as(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => wl(e) && as(n) }]);
function dr(t) {
  return [...ko];
}
const ko = Nr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
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
function bo(t) {
  return [...So];
}
const So = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => Kn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Gn(t), isDisabled: jn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Gn(t) || Bn(t), isDisabled: jn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Gn(t) || Bn(t), isDisabled: jn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Bn(t) || Kn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => Kn(t) }], $o = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], wt = Pt(null);
(/* @__PURE__ */ new Date()).valueOf();
function yl(t, e) {
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
  } else return yl(t, e);
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
var Co = 2, vl = class {
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
      l ? (l.__parse(d, u, o, i) && (r[a] = d), i & Co ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[a] = this._wrapNested(d, d, u, o) : n[a] = this._wrapWritable(d), r[a] = d), o[u] = o[u] || null;
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
}, kl = class {
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
      o.length = Math.max(...o.in.map((i) => _o(i, this._sources, 1)));
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
    const n = this._setter(e, Co);
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
function _o(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => _o(o, e, n + 1));
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
function Ct(t, e) {
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
  let n = Ct(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function Cl(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, a = t.flatData;
  e.header !== !1 && i[0].header && (r = ds("header", i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = mt(a[l], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = ds("footer", i, r, o, s)), r;
}
function ds(t, e, n, r, s) {
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
function _l(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const a = t._columns, l = t.flatData, c = t._sizes;
  for (const u of a) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && a[0].header && (us("header", a, r, s, d, e, n), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += a[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const h = [];
    for (let g = 0; g < a.length; g++) {
      const m = l[u], f = a[g], w = Ct(m, f) ?? "";
      let x = mt(m, f), y;
      e.cellStyle && (y = e.cellStyle(w, m, f)), e.cellTemplate && (x = e.cellTemplate(w, m, f) ?? x);
      const b = To(x, 2, y, n);
      h.push(b);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && a[0].footer && (us("footer", a, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function us(t, e, n, r, s, o, i) {
  for (let a = 0; a < e[0][t].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][a], u = d.colspan ? d.colspan - 1 : 0, h = d.rowspan ? d.rowspan - 1 : 0;
      (u || h) && r.push({ from: { row: a + s, column: c }, to: { row: a + s + h, column: c + u } });
      let g = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(g, d, e[c], t)), o.headerCellTemplate && (g = o.headerCellTemplate(g, d, e[c], t) ?? g);
      let f;
      t == "header" ? a == e[0][t].length - 1 ? f = 1 : f = 0 : a ? f = 4 : f = 3;
      const w = To(g, f, m, i);
      l.push(w);
    }
    n.push(l);
  }
}
function To(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Dl(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => ln(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function Tl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], a = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...l, borderBottom: a, borderRight: a };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Dl(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Nl = "portrait", Ml = 100, El = "a4", Il = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Rl(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((a) => !a.hidden), i = Al(e);
  return o.forEach((a, l) => {
    s + a.width <= i ? (s += a.width, r.push(a)) : (r.length && n.push(r), r = [a], s = a.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function fs(t, e, n) {
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
function Al(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Il[r];
  return Hl(e === "portrait" ? s : o, n);
}
function Hl(t, e) {
  return t * e;
}
function Ll(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || Nl, ppi: n || Ml, paper: r || El };
}
function Do(t, e) {
  return t.flexgrow ? `min-width:${e}px;width:auto` : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Ol(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === "richselect" && r) {
    const s = n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? "";
}
const hs = ["resize-column", "hide-column", "update-cell"], Pl = ["delete-row", "update-row", "update-cell"], Wl = ["move-item"], zl = ["resize-column", "move-item"];
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
        if (zl.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (Wl.includes(n) && this.setPrev("flatData"), hs.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Pl.includes(n) && this.setPrev("data"), hs.includes(n) && this.setPrev("columns");
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
function No() {
  let t = !0;
  return t = !1, t;
}
function Mo(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Ul(t, e) {
  return -Mo(t, e);
}
function Yl(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? Mo : Ul;
  return function(r, s) {
    return n(Ct(r, e), Ct(s, e));
  };
}
function Vl(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Yl(r.order, s);
  });
  return t.length === 1 ? n[0] : function(r, s) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const vn = 28, Gl = 20;
function Bl() {
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
function gs(t, e, n, r, s) {
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
        if (w += m ? ` ${m}` : "", f = Nn(d, w, s).width, (g > 1 || !a[c + 1]) && n > c + 1) {
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
function Kl(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const a = e[i], l = mt(a, t);
    l && (r.push(l), t.treetoggle ? s.push(e[i].$level * vn + (e[i].$count ? vn : 0) + (t.draggable ? vn : 0)) : t.draggable && s.push(vn));
  }
  return Nn(r, o, n, s).width;
}
function jl(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Gl : 0;
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
      const { columns: o, sizes: i, _skin: a } = this.getState(), l = this.copyColumns(o), c = l.reduce((h, g) => Math.max(g.header.length, h), 0), d = l.reduce((h, g) => Math.max(g.footer.length, h), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, i, c, d, a);
      for (let h = 0; h < l.length; h++) this.normalizeColumns(l, h, "header", c, u), this.normalizeColumns(l, h, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: a, _filterIds: l } = this.getState(), c = l && new Set(l), d = i ? this.flattenRows(o, [], l) : c ? o.filter((h) => c.has(h.id)) : o, u = !a && d.some((h) => h.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new bl();
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
        ls(h, u, d);
        const g = this.updateTreeRow(h);
        h.$parent === 0 && (i = g);
      } else {
        const h = i.findIndex((m) => m.id == l), g = { ...i[h] };
        ls(g, u, d), i[h] = g;
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
          c = Kl(u, f, g);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(jl(u, h), c);
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
      const x = Vl(w, c);
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
        const c = Cl(this.getState(), a);
        a.download !== !1 ? cs(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (a.format == "xlsx") {
        let c = a.styles;
        !c && c !== !1 && (c = Tl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: g, rowSizes: m, colSizes: f, styles: w } = _l(this.getState(), a, u), x = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (b) => {
            if (b.data.type == "ready") {
              const k = b.data.blob;
              a.download !== !1 ? cs(k, l) : s.result = k, o(!0);
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
    e.hasOwnProperty("_skin") && !e._skin && (e._skin = Bl()), e.columns && e.columns.forEach((n) => {
      n.options && (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
    }), ln(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), No() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Fl(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
      r.push((l) => o?.handler ? o.handler(l[s], a) : Xl(i)(l[s], a));
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
    const i = gs(e, "header", r, n.headerHeight, o), a = gs(e, "footer", s, n.footerHeight, o), l = i.reduce((d, u) => d + u, 0), c = a.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: a, headerHeight: l, footerHeight: c };
  }
}
let Zl = (/* @__PURE__ */ new Date()).valueOf();
function kn() {
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
}, Lt = [], tc = { subscribe: (t) => {
  nc();
  const e = new ec();
  return Lt.push(e), t(e), () => {
    const n = Lt.findIndex((r) => r === e);
    n >= 0 && Lt.splice(n, 1);
  };
} }, ps = !1;
function nc() {
  ps || (ps = !0, document.addEventListener("keydown", (t) => {
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
const rc = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Mr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return a.tagName === "INPUT" || a.tagName === "TEXTAREA" || Jl(a, "data-header-id")?.classList.contains("wx-filter") || !!a.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < "u" && (typeof a == "function" ? s[i] = a : a && (s[i] = (l) => {
      const c = r(l);
      n({ key: i, event: l, isInput: c });
    }));
  }
  const o = tc.subscribe((i) => {
    i.configure(s, t);
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
  let n, r, s, o, i, a, l, c, d;
  function u(S) {
    o = S.clientX, i = S.clientY, a = {
      ...oc(n, t, S),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(S) {
    n = Ke(S), ms(n) && (s = kt(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", g), window.addEventListener("touchend", b));
  }
  function g(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = Ke(S), ms(n) && (s = kt(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", k), u(S)));
  }
  function f(S) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", b), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", h));
  }
  function w(S) {
    const _ = S.clientX - o, M = S.clientY - i;
    if (!r) {
      if (Math.abs(_) < ws && Math.abs(M) < ws || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const G = Math.round(Math.max(0, a.top + M));
      if (e && e.move && e.move({ id: s, top: G, detail: l }) === !1)
        return;
      const C = e.getTask(s), H = C.$y;
      if (!a.start && a.y == H) return T();
      a.start = !0, a.y = C.$y - 4, r.style.top = G + "px";
      const A = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), z = Ke(A);
      if (z && z !== n) {
        const D = kt(z), F = z.getBoundingClientRect(), ae = F.top + F.height / 2, de = S.clientY + a.db > ae && z.nextElementSibling !== n, Z = S.clientY - a.dt < ae && z.previousElementSibling !== n;
        l?.after == D || l?.before == D ? l = null : de ? l = { id: s, after: D } : Z && (l = { id: s, before: D });
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
function Io(t, e) {
  const n = [];
  return t.forEach((r) => {
    if (r.data) {
      const s = Io(r.data, e);
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
const Ro = {};
function dc(t) {
  return Ro[t] || t;
}
function uc(t, e) {
  Ro[t] = e;
}
function fc({ onClick: t, onShow: e, option: n }) {
  const r = Y(null), s = E(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = $(() => n && n.comp ? dc(n.comp) : null, [n]);
  return /* @__PURE__ */ Q(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ p("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ p(o, { item: n, option: n }) : null : /* @__PURE__ */ Q("span", { className: "wx-cDCz9rZQ wx-value", children: [
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
  const [c, d] = K(-1e4), [u, h] = K(-1e4), [g, m] = K(20), [f, w] = K(), x = Y(null), [y, b] = K(!1), [k, T] = K(null), S = E(() => {
    const H = ti(x.current, s, r, e, n);
    H && (d(H.x), h(H.y), m(H.z), w(H.width));
  }, [s, r, e, n]);
  B(() => {
    o && o(S);
  }, []);
  const _ = E(() => {
    b(!1);
  }, []), M = E(() => {
    l && l({ action: null, option: null });
  }, [l]), G = E((H, A) => {
    b(H), T(A);
  }, []), C = $(() => cc(t), [t]);
  return B(() => {
    S();
  }, [s, S]), B(() => {
    if (x.current)
      return nn(x.current, { callback: M, modal: !0 }).destroy;
  }, [M]), /* @__PURE__ */ p(
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
      onMouseLeave: _,
      children: C.map((H) => /* @__PURE__ */ Q(Ds, { children: [
        H.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          fc,
          {
            option: H,
            onShow: G,
            onClick: (A) => {
              if (!H.data && !A.defaultPrevented) {
                const z = { context: i, action: H, option: H, event: A };
                H.handler && H.handler(z), l && l(z), A.stopPropagation();
              }
            }
          }
        ),
        H.data && y === H.id ? /* @__PURE__ */ p(
          Er,
          {
            css: a,
            options: H.data,
            at: "right-overlap",
            parent: k,
            context: i,
            onClick: l
          }
        ) : null
      ] }, H.id))
    }
  );
}
const hc = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, [d, u] = K(null), [h, g] = K(null), [m, f] = K(0), [w, x] = K(0), y = $(() => d !== null && i ? Io(n, (S) => i(S, d)) : n, [d, i, n]), b = E(
    (S) => {
      g(null), c && c(S);
    },
    [c]
  ), k = E((S, _) => {
    let M = null;
    for (; S && S.dataset && !M; )
      M = S.dataset[_], S = S.parentNode;
    return M ? Wt(M) : null;
  }, []), T = E(
    (S, _) => {
      if (!S) {
        g(null);
        return;
      }
      if (S.defaultPrevented) return;
      const M = S.target;
      if (M && M.dataset && M.dataset.menuIgnore) return;
      f(S.clientX + 1), x(S.clientY + 1);
      let G = typeof _ < "u" ? _ : k(M, o);
      s && (G = s(G, S), !G) || (u(G), g(M), S.preventDefault());
    },
    [o, k, s]
  );
  return Tt(e, () => ({ show: T }), [T]), /* @__PURE__ */ Q(He, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: T, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    h ? /* @__PURE__ */ p(Ps, { children: /* @__PURE__ */ p(
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
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = K(null);
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
  const h = Y(0), g = Y(a);
  return B(() => {
    g.current !== a && (h.current += 1, g.current = a);
  }, [a]), /* @__PURE__ */ Q(He, { children: [
    /* @__PURE__ */ p("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    a ? /* @__PURE__ */ p(Ps, { children: /* @__PURE__ */ p(
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
const Ao = _t(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, d = Y(null), u = E((h, g) => {
    d.current.show(h, g);
  }, []);
  return Tt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ Q(He, { children: [
    l ? /* @__PURE__ */ p("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ p(
      hc,
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
}), Ho = {};
function gc(t) {
  return Ho[t] || t;
}
function Ut(t, e) {
  Ho[t] = e;
}
function Lo({ menu: t = !1 }) {
  return /* @__PURE__ */ p("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Oo() {
  return /* @__PURE__ */ p("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const pc = ({ key: t, text: e, ...n }) => n;
function Ir(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = $(
    () => gc(e.comp || "label"),
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
    return /* @__PURE__ */ p(Oo, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ p(Lo, { menu: n });
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
            ...pc(e)
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
  return /* @__PURE__ */ p("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ Q(He, { children: [
    /* @__PURE__ */ Q("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ p("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ p("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ p(Ft, { width: "", oncancel: a, children: /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ p(
      Mn,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ Q(He, { children: [
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
function mc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = K(void 0), l = Y(null);
  function c() {
    a(null);
  }
  function d() {
    a(!0);
  }
  function u(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ Q(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ p(ut, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ p(Ft, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ p("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
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
function wc(t) {
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
  } = t, [l, c] = Fe(e || []), [d, u] = Fe(s || null), h = $(() => wc(l), [l]), g = Y(null), m = Y(-1), [f, w] = K([]), x = Y(h);
  B(() => {
    x.current = h;
  }, [l]);
  const y = Y(o);
  B(() => {
    y.current = o;
  }, [o]);
  const b = Y(f);
  B(() => {
    b.current = f;
  }, [f]);
  const k = Y(!1);
  function T(C) {
    d && (d[C.item.key] = C.value, u({ ...d })), a && a(C);
  }
  function S() {
    const C = g.current;
    if (!C) return 0;
    const H = C.children, A = x.current || [];
    let z = 0;
    for (let D = 0; D < A.length; D++)
      A[D].comp !== "spacer" && (z += H[D].clientWidth, A[D].comp === "separator" && (z += 8));
    return z;
  }
  function _() {
    const C = g.current, H = x.current || [];
    if (C) {
      for (let A = H.length - 1; A >= 0; A--)
        if (H[A].items && !H[A].collapsed) {
          H[A].collapsed = !0, H[A].$width = C.children[A].offsetWidth, k.current = !0, c([...H]);
          return;
        }
    }
  }
  function M(C) {
    const H = g.current, A = x.current || [];
    if (H) {
      for (let z = 0; z < A.length; z++)
        if (A[z].collapsed && A[z].$width) {
          A[z].$width - H.children[z].offsetWidth < C + 10 && (A[z].collapsed = !1, k.current = !0), c([...A]);
          return;
        }
    }
  }
  function G() {
    const C = g.current;
    if (!C) return;
    const H = x.current || [], A = y.current;
    if (A === "wrap") return;
    const z = C.clientWidth;
    if (C.scrollWidth > z) {
      if (A === "collapse") return _();
      const D = C.children;
      let F = 0;
      for (let ae = 0; ae < H.length; ae++) {
        if (F += D[ae].clientWidth, H[ae].comp === "separator" && (F += 8), F > z - 40) {
          if (m.current === ae) return;
          m.current = ae;
          const de = [];
          for (let Z = ae; Z < H.length; Z++)
            de.push(H[Z]), D[Z].style.visibility = "hidden";
          ae > 0 && H[ae - 1].comp === "separator" && (D[ae - 1].style.visibility = "hidden"), w(de);
          break;
        }
        D[ae].style.visibility = "";
      }
    } else {
      const D = z - S();
      if (D <= 0) return;
      if (A === "collapse") return M(D);
      if ((b.current || []).length) {
        m.current = null;
        const F = C.children;
        for (let ae = 0; ae < H.length; ae++)
          F[ae].style.visibility = "";
        w([]);
      }
    }
  }
  return B(() => {
    k.current && (k.current = !1, G());
  }, [l]), B(() => {
    const C = new ResizeObserver(() => G());
    return g.current && C.observe(g.current), () => {
      C.disconnect();
    };
  }, []), /* @__PURE__ */ Q(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: g,
      children: [
        h.map(
          (C) => C.items ? /* @__PURE__ */ p(
            Mn,
            {
              item: C,
              values: d,
              onClick: i,
              onChange: T
            },
            C.id
          ) : /* @__PURE__ */ p(
            Ir,
            {
              item: C,
              values: d,
              onClick: i,
              onChange: T
            },
            C.id
          )
        ),
        !!f.length && /* @__PURE__ */ p(
          mc,
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
function xc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ Q("div", { className: "wx-HXpG4gnx wx-item", onClick: a, children: [
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
function yc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function vc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ Q("div", { className: "wx-3cuSqONJ wx-item", onClick: a, children: [
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
function kc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ Q("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ p("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Ut("button", xc);
Ut("separator", Lo);
Ut("spacer", Oo);
Ut("label", yc);
Ut("item", kc);
Ut("icon", vc);
const Je = Pt(null);
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
function Cc(t, e) {
  const n = e.current;
  let r = null, s, o, i = !1, a = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(_) {
    const M = Ke(_);
    M && (r = {
      container: l,
      sourceNode: _.target,
      from: $c(M),
      pos: hr(_, t)
    }, o = r.pos, u(_));
  }
  function u(_) {
    if (!r) return;
    const M = r.pos = hr(_, t);
    if (!i) {
      if (!a && !_?.target?.getAttribute("draggable-data") && Math.abs(o.x - M.x) < xs && Math.abs(o.y - M.y) < xs)
        return;
      if (T(_) === !1) return S();
    }
    if (a) {
      const G = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, C = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        _.pageX - G,
        _.pageY - C
      );
    } else r.targetNode = _.target;
    n.move && n.move(_, r), l.style.left = -(r.offset ? r.offset.x : 0) + "px", l.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + "px";
  }
  function h(_) {
    l.parentNode && l.parentNode.removeChild(l), l.innerHTML = "", i && n.end && n.end(_, r), r = o = null, S();
  }
  function g(_) {
    n.getReorder && !n.getReorder() || _.button === 0 && (k(_), window.addEventListener("mousemove", m), window.addEventListener("mouseup", f), d(_));
  }
  function m(_) {
    u(_);
  }
  function f(_) {
    h(_);
  }
  function w(_) {
    if (n.getReorder && !n.getReorder()) return;
    s = setTimeout(() => {
      a = !0, d(_.touches[0]);
    }, Sc), k(_);
    function M() {
      s && c(), _.target.removeEventListener("touchmove", x), _.target.removeEventListener("touchend", M), h(_);
    }
    _.target.addEventListener("touchmove", x), _.target.addEventListener("touchend", M), t.addEventListener("contextmenu", y);
  }
  function x(_) {
    i ? (_.preventDefault(), u(_.touches[0])) : s && c();
  }
  function y(_) {
    if (i || s)
      return _.preventDefault(), !1;
  }
  function b(_) {
    _.preventDefault();
  }
  function k(_) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: M } = n.getDraggableInfo();
    (!M || _.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function T(_) {
    if (i = !0, n.start) {
      if (n.start(_, r) === !1) return !1;
      t.appendChild(l), document.body.style.cursor = "move";
    }
  }
  function S(_) {
    i = a = !1, document.body.style.cursor = "", document.body.style.userSelect = "", document.body.style.webkitUserSelect = "", window.removeEventListener("mousemove", m), window.removeEventListener("mouseup", f), _ && (t.removeEventListener("mousedown", g), t.removeEventListener("touchstart", w), t.removeEventListener("dragstart", b));
  }
  return t.addEventListener("mousedown", g), t.addEventListener("touchstart", w), t.addEventListener("dragstart", b), {
    destroy() {
      S(!0);
    }
  };
}
const _c = 4e-3;
function Tc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function Dc(t, e, n, r) {
  const { node: s, left: o, top: i, bottom: a, sense: l, xScroll: c, yScroll: d } = r, u = hr(t, s);
  n.scrollState || (n.scrollState = Tc());
  let h = 0, g = 0;
  u.x < o + l ? h = -1 : u.x > e.width - l && (h = 1), u.y < i + Math.round(l / 2) ? g = -1 : u.y > e.height - a - Math.round(l / 2) && (g = 1), (n.scrollState.dirX !== h || n.scrollState.dirY !== g) && (Po(n), n.scrollState.dirX = h, n.scrollState.dirY = g), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && Nc(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Nc(t, e, n) {
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
function Po(t) {
  t.scrollSpeedFactor = 1, t.autoScrollTimer && (t.autoScrollTimer = clearTimeout(t.autoScrollTimer), t.activeAutoScroll = clearInterval(t.activeAutoScroll));
}
function Mc(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += _c, r !== 0 && Ic(t, e, r), s !== 0 && Ec(t, e, s);
}
function Ec(t, e, n) {
  const r = e.node.scrollTop;
  Wo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollTop",
    e
  );
}
function Ic(t, e, n) {
  const r = e.node.scrollLeft;
  Wo(
    r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n,
    "scrollLeft",
    e
  );
}
function Wo(t, e, n) {
  n.node[e] = t;
}
function Ln(t, e, n, r, s, o) {
  const i = {};
  return t && (i.width = `${t}px`, i.minWidth = `${t}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), n && (i.position = "sticky", n.left && (i.left = `${r}px`), n.right && (i.right = `${s}px`)), i;
}
function zo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Rc(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [i, a] = Fe(t.focusable), l = Se(Je), c = oe(l, "focusCell"), d = oe(l, "search"), u = oe(l, "reorder"), h = $(
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
  function m(S, _) {
    let M = "wx-cell";
    return M += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", M += S ? " " + S(n) : "", M += _ ? " " + _(e, n) : "", M += n.treetoggle ? " wx-tree-cell" : "", M;
  }
  const f = $(
    () => m(s, r),
    [s, r, n, e]
  ), w = $(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = Y(null);
  B(() => {
    x.current && i && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, i, e.id, n.id]);
  const y = E(() => {
    i && !c && l.exec("focus-cell", {
      row: e.id,
      column: n.id,
      eventSource: "focus"
    });
  }, [l, i, c, e.id, n.id]);
  B(() => () => {
    i && c && (l.exec("focus-cell", { eventSource: "destroy" }), a(!1));
  }, [l, a]);
  function b(S) {
    const _ = new RegExp(`(${d.value.trim()})`, "gi");
    return String(S).split(_).map((M) => ({ text: M, highlight: _.test(M) }));
  }
  const k = $(() => {
    const S = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, _ = n.fixed && n.fixed.right;
    return [
      f,
      S ? "wx-shadow" : "",
      _ ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [f, n]), T = n.cell;
  return /* @__PURE__ */ Q(
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
        n.treetoggle ? /* @__PURE__ */ Q(He, { children: [
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
            onAction: ({ action: S, data: _ }) => l.exec(S, _)
          }
        ) : o ? o() : h ? /* @__PURE__ */ p("span", { children: b(mt(e, n)).map(
          ({ highlight: S, text: _ }, M) => S ? /* @__PURE__ */ p("mark", { className: "wx-TSCaXsGV wx-search", children: _ }, M) : /* @__PURE__ */ p("span", { children: _ }, M)
        ) }) : mt(e, n)
      ]
    }
  );
}
function ys(t, e) {
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
function Ac({ filter: t, column: e, action: n, filterValue: r }) {
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
function Hc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = Se(Je), o = oe(s, "flatData"), i = $(
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
    Ls,
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
const Lc = {
  text: Ac,
  richselect: Hc
};
function Oc({ filter: t, column: e }) {
  const n = Se(Je), r = oe(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = $(() => Lc[t.type], [t.type]);
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
function Pc(t) {
  const {
    cell: e,
    column: n,
    row: r,
    lastRow: s,
    sortRow: o,
    columnStyle: i,
    bodyHeight: a,
    hasSplit: l
  } = t, c = Se(Je), d = oe(c, "sortMarks"), u = $(() => d ? d[n.id] : void 0, [d, n.id]), h = Y(), g = E(
    (D) => {
      h.current = e.flexgrow ? D.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = E(
    (D, F) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + D),
        inProgress: F
      });
    },
    [c, e.id]
  ), f = E((D) => m(D, !0), [m]), w = E((D) => m(D, !1), [m]), x = E(
    (D) => {
      if (!n.sort || e.filter) return;
      let F = u?.order;
      F && (F = F === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: D.ctrlKey, order: F });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = E(
    (D) => {
      D && D.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), b = E(
    (D) => {
      D.key === "Enter" && y();
    },
    [y]
  ), k = E(
    (D) => {
      D.key === "Enter" && !e.filter && x(D);
    },
    [x, e.filter]
  ), T = $(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), S = $(
    () => T && !l && e.collapsible !== "header",
    [T, l, e.collapsible]
  ), _ = $(
    () => S ? { top: -a / 2, position: "absolute" } : {},
    [S, a]
  ), M = $(
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
  ), G = $(
    () => zo(n, e, i),
    [n, e, i]
  ), C = E(() => Object.fromEntries(
    Object.entries(e).filter(([D]) => D !== "cell")
  ), [e]), H = `wx-cell ${G} ${e.css || ""} wx-collapsed`, A = [
    "wx-cell",
    G,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), z = Y(null);
  return B(() => {
    const D = z.current;
    if (!D) return;
    const F = ys(D, { down: g, move: f, up: w });
    return () => {
      typeof F == "function" && F();
    };
  }, [g, f, w, ys]), T ? /* @__PURE__ */ p(
    "div",
    {
      className: "wx-RsQD74qC " + H,
      style: M,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: b,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", style: _, children: e.text || "" })
    }
  ) : /* @__PURE__ */ Q(
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
          const D = e.cell;
          return /* @__PURE__ */ p(
            D,
            {
              api: c,
              cell: C(),
              column: n,
              row: r,
              onAction: ({ action: F, data: ae }) => c.exec(F, ae)
            }
          );
        })() : e.filter ? /* @__PURE__ */ p(Oc, { filter: e.filter, column: n }) : /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: z,
            onClick: (D) => D.stopPropagation(),
            children: /* @__PURE__ */ p("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ Q(He, { children: [
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
function Wc({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = Se(Je), o = $(
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
    () => zo(e, t, r),
    [e, t, r]
  ), a = E(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ p("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? Go.createElement(t.cell, {
    api: s,
    cell: a(),
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
  const i = Se(Je), a = oe(i, "_sizes"), l = oe(i, "split"), c = $(() => a?.[`${r}RowHeights`], [a, r]), d = $(() => {
    let f = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        f.push([]), n.forEach((b, k) => {
          const T = { ...b[r][x] };
          if (y || f[x].push(T), T.colspan > 1) {
            if (y = T.colspan - 1, !No() && b.right) {
              let S = b.right;
              for (let _ = 1; _ < T.colspan; _++)
                S -= n[k + _].width;
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
              Pc,
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
              Wc,
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
function zc({ overlay: t }) {
  const e = Se(Je);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Fc(t) {
  const { actions: e, editor: n } = t, [r, s] = K(n?.value || ""), o = Y(null);
  B(() => {
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
function Uc({ actions: t, editor: e, onAction: n }) {
  const [r, s] = K(e?.value), [o, i] = K(e?.renderedValue), [a, l] = K(e?.options || []), c = $(() => e?.config?.template, [e]), d = $(() => e?.config?.cell, [e]), u = $(() => (a || []).findIndex((y) => y.id === r), [a, r]), h = Y(null), g = Y(null), m = E(
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
  ), w = Y(null);
  B(() => {
    w.current && w.current.focus();
  }, []), B(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = E(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ Q(He, { children: [
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
function Yc({ actions: t, editor: e, onAction: n }) {
  const [r] = K(() => e.value || /* @__PURE__ */ new Date()), [s] = K(() => e.config?.template), [o] = K(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = Y(null);
  return B(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Q(He, { children: [
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
    /* @__PURE__ */ p(Ft, { width: "auto", children: /* @__PURE__ */ p(
      Hs,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Vc(t) {
  const { actions: e, editor: n } = t, r = t.onAction ?? t.onaction, s = n.config || {}, [o] = K(
    n.options.find((f) => f.id === n.value)
  ), [i] = K(n.value), [a] = K(n.options), l = $(
    () => a.findIndex((f) => f.id === i),
    [a, i]
  );
  function c({ id: f }) {
    e.updateValue(f), e.save();
  }
  let d;
  const [u, h] = K();
  function g(f) {
    d = f.navigate, h(() => f.keydown), d(l);
  }
  const m = Y(null);
  return B(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ Q(He, { children: [
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
const Gc = {
  text: Fc,
  combo: Uc,
  datepicker: Yc,
  richselect: Vc
};
function Bc({ column: t, row: e }) {
  const n = Se(Je), r = oe(n, "editor"), s = E(
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
    return Gc[f];
  }, [t, e]), u = Y(null);
  B(() => {
    if (!u.current) return;
    const m = nn(u.current, () => o(!0));
    return () => {
      typeof m == "function" && m();
    };
  }, [o]), B(() => {
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
function ks(t) {
  const { columns: e, type: n, columnStyle: r } = t, s = Se(Je), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(He, { children: e.map((c, d) => /* @__PURE__ */ p("tr", { children: c.map((u) => {
    const h = i.find((f) => f.id == u.id), g = `wx-print-cell-${n}${l(h)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ p(
      "th",
      {
        style: Is(Do(u, a.columnWidth)),
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
        ) : u.filter ? /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-print-filter", children: Ol(o, i, u) }) : /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function Kc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = Se(Je), { flatData: c, _sizes: d } = l.getState(), u = o && fs(e, "header", d.headerRowHeights), h = i && fs(e, "footer", d.footerRowHeights);
  function g(f, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(f, w) : "", x;
  }
  function m(f, w) {
    return typeof w.draggable == "function" ? w.draggable(f, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ Q(
    "table",
    {
      className: `wx-8NTMLH0z wx-print-grid ${e.some((f) => f.flexgrow) ? "wx-flex-columns" : ""}`,
      children: [
        o ? /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p(
          ks,
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
              (x) => x.collapsed ? null : /* @__PURE__ */ Q(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(f, x)}`,
                  style: Is(
                    Do(x, d.columnWidth)
                  ),
                  children: [
                    a && x.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(f, x) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ Q(He, { children: [
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
          ks,
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
function jc(t) {
  const { config: e, ...n } = t, r = Se(Je), { _skin: s, _columns: o } = r.getState(), i = $(() => Rl(o, e), []), a = Y(null);
  return B(() => {
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
      children: i.map((l, c) => /* @__PURE__ */ p("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ p(Kc, { columns: l, ...n }) }, c))
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
    rowStyle: i,
    columnStyle: a,
    cellStyle: l,
    autoRowHeight: c,
    resize: d,
    clientWidth: u,
    clientHeight: h,
    responsiveLevel: g,
    hotkeys: m
  } = t, f = Se(Je), w = oe(f, "dynamic"), x = oe(f, "_columns"), y = oe(f, "flatData"), b = oe(f, "split"), k = oe(f, "_sizes"), [T, S] = Qt(f, "selectedRows"), _ = oe(f, "select"), M = oe(f, "editor"), G = oe(f, "tree"), C = oe(f, "focusCell"), H = oe(f, "_print"), A = oe(f, "undo"), z = oe(f, "reorder"), D = oe(f, "_rowHeightFromData"), [F, ae] = K(0);
  B(() => {
    ae(cn());
  }, []);
  const [de, Z] = K(0), [ce, ye] = K(0), O = $(() => (x || []).some((I) => !I.hidden && I.flexgrow), [x]), le = $(() => k?.rowHeight || 0, [k]), xe = Y(null), [ue, De] = K(null), [Ie, me] = K(null), U = $(() => {
    let I = [], J = 0;
    return b && b.left && (I = (x || []).slice(0, b.left).filter((v) => !v.hidden).map((v) => ({ ...v })), I.forEach((v) => {
      v.fixed = { left: 1 }, v.left = J, J += v.width;
    }), I.length && (I[I.length - 1].fixed = { left: -1 })), { columns: I, width: J };
  }, [b, x]), ie = $(() => {
    let I = [], J = 0;
    if (b && b.right) {
      I = (x || []).slice(b.right * -1).filter((v) => !v.hidden).map((v) => ({ ...v }));
      for (let v = I.length - 1; v >= 0; v--) {
        const N = I[v];
        N.fixed = { right: 1 }, N.right = J, J += N.width;
      }
      I.length && (I[0].fixed = { right: -1 });
    }
    return { columns: I, width: J };
  }, [b, x]), ne = $(() => {
    const I = (x || []).slice(b?.left || 0, (x || []).length - (b?.right ?? 0)).filter((J) => !J.hidden);
    return I.forEach((J) => {
      J.fixed = 0;
    }), I;
  }, [x, b]), re = $(() => (x || []).reduce((I, J) => (J.hidden || (I += J.width), I), 0), [x]), ve = 1;
  function Ae(I, J, v) {
    let N = J, R = I;
    if (ne.length) {
      let P = ne.length;
      for (let W = I; W >= 0; W--)
        ne[W][v].forEach((j) => {
          j.colspan > 1 && W > I - j.colspan && W < P && (P = W);
        });
      if (P !== ne.length && P < I) {
        for (let W = P; W < I; W++)
          N -= ne[W].width;
        R = P;
      }
    }
    return { index: R, delta: N };
  }
  const we = $(() => {
    let I, J, v;
    const N = de, R = de + (u || 0);
    let P = 0, W = 0, j = 0, q = 0;
    ne.forEach((We, rt) => {
      N > j && (P = rt, q = j), j = j + We.width, R > j && (W = rt + ve);
    });
    const se = { header: 0, footer: 0 };
    for (let We = W; We >= P; We--)
      ["header", "footer"].forEach((rt) => {
        ne[We] && ne[We][rt].forEach((yt) => {
          const lt = yt.colspan;
          if (lt && lt > 1) {
            const zn = lt - (W - We + 1);
            zn > 0 && (se[rt] = Math.max(se[rt], zn));
          }
        });
      });
    const he = Ae(P, q, "header"), $e = Ae(P, q, "footer"), Le = he.delta, Ve = he.index, nt = $e.delta, it = $e.index;
    return O && re > (u || 0) ? I = J = v = [...U.columns, ...ne, ...ie.columns] : (I = [
      ...U.columns,
      ...ne.slice(P, W + 1),
      ...ie.columns
    ], J = [
      ...U.columns,
      ...ne.slice(Ve, W + se.header + 1),
      ...ie.columns
    ], v = [
      ...U.columns,
      ...ne.slice(it, W + se.footer + 1),
      ...ie.columns
    ]), {
      data: I || [],
      header: J || [],
      footer: v || [],
      d: q,
      df: nt,
      dh: Le
    };
  }, [
    ne,
    U,
    ie,
    de,
    u,
    O,
    re
  ]), ee = $(
    () => e && k?.headerHeight || 0,
    [e, k]
  ), ge = $(
    () => n && k?.footerHeight || 0,
    [n, k]
  ), be = $(() => u && h ? re >= u : !1, [u, h, re]), V = $(() => (h || 0) - ee - ge - (be ? F : 0), [h, ee, ge, be, F]), ke = $(() => Math.ceil((V || 0) / (le || 1)) + 1, [V, le]), Ne = Y([]), [pe, Oe] = K(0), [Ue, Te] = K(void 0), Ce = $(() => {
    let I = 0, J = 0;
    const v = 2;
    if (c) {
      let P = ce;
      for (; P > 0; )
        P -= Ne.current[I] || le, I++;
      J = ce - P;
      for (let W = Math.max(0, I - v - 1); W < I; W++)
        J -= Ne.current[I - W] || le;
      I = Math.max(0, I - v);
    } else {
      if (D) {
        let P = 0, W = 0;
        for (let he = 0; he < (y || []).length; he++) {
          const $e = y[he].rowHeight || le;
          if (W + $e > ce) {
            P = he;
            break;
          }
          W += $e;
        }
        I = Math.max(0, P - v);
        for (let he = 0; he < I; he++)
          J += y[he].rowHeight || le;
        let j = 0, q = 0;
        for (let he = P + 1; he < (y || []).length; he++) {
          const $e = y[he].rowHeight || le;
          if (j++, q + $e > V)
            break;
          q += $e;
        }
        const se = Math.min(
          w ? w.rowCount : (y || []).length,
          P + j + v
        );
        return { d: J, start: I, end: se };
      }
      I = Math.floor(ce / (le || 1)), I = Math.max(0, I - v), J = I * (le || 0);
    }
    const N = w ? w.rowCount : (y || []).length, R = Math.min(N, I + (ke || 0) + v);
    return { d: J, start: I, end: R };
  }, [c, D, ce, le, w, y, ke, V]), Me = $(() => {
    const I = w ? w.rowCount : (y || []).length;
    if (c)
      return pe + Ce.d + (I - (Ue || 0)) * (le || 0);
    if (!D)
      return I * (le || 0);
    let J = 0;
    for (let v = 0; v < I; v++)
      J += y[v]?.rowHeight || le;
    return J;
  }, [
    w,
    y,
    le,
    c,
    D,
    pe,
    Ce.d,
    Ue
  ]), Pe = $(() => u && h ? Me + ee + ge >= h - (re >= (u || 0) ? F : 0) : !1, [
    u,
    h,
    Me,
    ee,
    ge,
    re,
    F
  ]), Ye = $(() => O && re <= (u || 0) ? (u || 0) - 0 - (Pe ? F : 0) : re, [O, re, u, Pe, F, be]), L = $(() => O && re <= (u || 0) ? u || 0 : Ye < (u || 0) ? re + (Pe ? F : 0) : -1, [O, re, u, Ye, Pe, F]), X = Y({});
  B(() => {
    if (w && (X.current.start !== Ce.start || X.current.end !== Ce.end)) {
      const { start: I, end: J } = Ce;
      X.current = { start: I, end: J }, f && f.exec && f.exec("request-data", { row: { start: I, end: J } });
    }
  }, [w, Ce, f]);
  const te = $(() => w ? y || [] : (y || []).slice(Ce.start, Ce.end), [w, y, Ce]), fe = $(() => (T || []).filter(
    (I) => (te || []).some((J) => J.id === I)
  ), [S, te]), Re = $(() => Ce.start, [Ce.start]), Ee = E((I) => {
    ye(I.target.scrollTop), Z(I.target.scrollLeft);
  }, []), ze = E((I) => {
    I.shiftKey && I.preventDefault(), xe.current && xe.current.focus && xe.current.focus();
  }, []), je = E(() => !!(x || []).find((I) => !!I.draggable), [x]), Yt = Y(null), ot = Y(null), On = Y({
    dblclick: (I, J) => {
      const v = { id: I, column: er(J, "data-col-id") };
      f.exec("open-editor", v);
    },
    click: (I, J) => {
      if (Yt.current) return;
      const v = er(J, "data-col-id");
      if (C?.id !== I && f.exec("focus-cell", {
        row: I,
        column: v,
        eventSource: "click"
      }), _ === !1) return;
      const N = s && J.ctrlKey, R = s && J.shiftKey;
      (N || T.length > 1 || !T.includes(I)) && f.exec("select-row", { id: I, toggle: N, range: R });
    },
    "toggle-row": (I) => {
      const J = f.getRow(I);
      f.exec(J.open !== !1 ? "close-row" : "open-row", { id: I });
    },
    "ignore-click": () => !1
  }), Nt = $(() => ({
    top: ee,
    bottom: ge,
    left: U.width,
    xScroll: be,
    yScroll: Pe,
    sense: c && Ie ? Ie.offsetHeight : Math.max(k?.rowHeight || 0, 40),
    node: xe.current && xe.current.firstElementChild
  }), [
    ee,
    ge,
    U.width,
    be,
    Pe,
    c,
    Ie,
    k
  ]);
  function Pn(I, J) {
    const { container: v, sourceNode: N, from: R } = J;
    if (je() && !N.getAttribute("draggable-data"))
      return !1;
    De(R), f.getRow(R).open && f.exec("close-row", { id: R, nested: !0 });
    const P = Ke(N, "data-id"), W = P.cloneNode(!0);
    W.classList.remove("wx-selected"), W.querySelectorAll("[tabindex]").forEach((he) => he.setAttribute("tabindex", "-1")), v.appendChild(W), me(W);
    const j = de - we.d, q = Pe ? F : 0;
    v.style.width = Math.min(
      (u || 0) - q,
      O && re <= (u || 0) ? Ye : Ye - q
    ) + j + "px";
    const se = bn(P);
    J.offset = {
      x: j,
      y: -Math.round(se.height / 2)
    }, ot.current || (ot.current = I.clientY);
  }
  function Mt(I, J) {
    const { from: v } = J, N = J.pos, R = bn(xe.current);
    N.x = R.x;
    const P = Nt.top;
    if (N.y < P) N.y = P;
    else {
      const W = R.height - (be && F > 0 ? F : Math.round(Nt.sense / 2)) - Nt.bottom;
      N.y > W && (N.y = W);
    }
    if (xe.current.contains(J.targetNode)) {
      const W = Ke(J.targetNode, "data-id"), j = Wt(W?.getAttribute("data-id"));
      if (j && j !== v) {
        J.to = j;
        const q = c ? Ie?.offsetHeight : k?.rowHeight;
        if (Ie && (ce === 0 || N.y > P + q - 1)) {
          const se = W.getBoundingClientRect(), he = bn(Ie).y, $e = se.y, Le = he > $e ? -1 : 1, Ve = Le === 1 ? "after" : "before", nt = Math.abs(f.getRowIndex(v) - f.getRowIndex(j)), it = nt !== 1 ? Ve === "before" ? "after" : "before" : Ve;
          if (nt === 1 && (Le === -1 && I.clientY > ot.current || Le === 1 && I.clientY < ot.current))
            return;
          ot.current = I.clientY, f.exec("move-item", {
            id: v,
            target: j,
            mode: it,
            inProgress: !0
          });
        }
      }
      o && o({ event: I, context: J });
    }
    Dc(I, R, J, Nt);
  }
  function Et(I, J) {
    const { from: v, to: N } = J;
    f.exec("move-item", {
      id: v,
      target: N,
      inProgress: !1
    }), Yt.current = setTimeout(() => {
      Yt.current = 0;
    }, 1), De(null), me(null), ot.current = null, Po(J);
  }
  function cn() {
    const I = document.createElement("div");
    I.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(I);
    const J = I.offsetWidth - I.clientWidth;
    return document.body.removeChild(I), J;
  }
  const dn = $(() => L > 0 ? { width: `${L}px` } : void 0, [L]), un = Y(null);
  function Wn() {
    Promise.resolve().then(() => {
      let I = 0, J = Re;
      const v = un.current;
      v && (Array.from(v.children).forEach((N, R) => {
        Ne.current[Re + R] = N.offsetHeight, I += N.offsetHeight, J++;
      }), Oe(I), Te(J));
    });
  }
  B(() => {
    te && c && Wn();
  }, [te, c, Re]);
  let [gt, Vt] = K();
  B(() => {
    if (C && (!_ || !fe.length || fe.includes(C.row)))
      Vt({ ...C });
    else if (te.length && we.data.length) {
      if (!gt || fe.length && !fe.includes(gt.row) || te.findIndex((I) => I.id == gt.row) === -1 || we.data.findIndex(
        (I) => I.id == gt.column && !I.collapsed
      ) === -1) {
        const I = fe[0] || te[0].id, J = we.data.findIndex((v) => !v.collapsed);
        Vt(J !== -1 ? { row: I, column: we.data[J].id } : null);
      }
    } else Vt(null);
  }, [C]);
  const Gt = Y(null);
  B(() => {
    const I = xe.current;
    if (!I) return;
    const J = bc(I, d);
    return () => {
      typeof J == "function" && J();
    };
  }, [d]);
  const Bt = Y({});
  Object.assign(Bt.current, {
    start: Pn,
    move: Mt,
    end: Et,
    getReorder: () => z,
    getDraggableInfo: () => ({ hasDraggable: je() })
  }), B(() => {
    const I = xe.current;
    return I ? Cc(I, Bt).destroy : void 0;
  }, [z, xe.current]), B(() => {
    const I = xe.current;
    return I ? Mr(I, {
      keys: m !== !1 && {
        ...rc,
        "ctrl+z": A,
        "ctrl+y": A,
        ...m
      },
      exec: (J) => f.exec("hotkey", J)
    }).destroy : void 0;
  }, [f, A, m]);
  const xt = Y({
    scroll: f.getReactiveState().scroll
  });
  xt.current.getWidth = () => (u || 0) - (Pe ? F : 0), xt.current.getHeight = () => V, xt.current.getScrollMargin = () => U.width + ie.width, B(() => {
    sc(Gt.current, xt.current);
  }, []);
  const It = Y(null);
  B(() => {
    const I = It.current;
    if (!I) return;
    const J = [];
    return J.push(
      nn(I, () => f.exec("focus-cell", { eventSource: "click" })).destroy
    ), J.push(ui(I, On.current)), () => J.forEach((v) => v());
  }, []);
  const fn = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ Q(He, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + fn,
        style: {
          "--header-height": `${ee}px`,
          "--footer-height": `${ge}px`,
          "--split-left-width": `${U.width}px`,
          "--split-right-width": `${ie.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: xe,
            className: "wx-4VuBwK2D wx-table-box",
            style: dn,
            role: G ? "treegrid" : "grid",
            "aria-colcount": we.data.length,
            "aria-rowcount": te.length,
            "aria-multiselectable": G && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ Q(
              "div",
              {
                ref: Gt,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: be ? "scroll" : "hidden",
                  overflowY: Pe ? "scroll" : "hidden"
                },
                onScroll: Ee,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    vs,
                    {
                      contentWidth: Ye,
                      deltaLeft: we.dh,
                      columns: we.header,
                      columnStyle: a,
                      bodyHeight: V - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ Q(
                    "div",
                    {
                      ref: It,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${Ye}px`, height: `${Me}px` },
                      onMouseDown: (I) => ze(I),
                      children: [
                        r ? /* @__PURE__ */ p(zc, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: un,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${Ce.d}px`,
                              paddingLeft: `${we.d}px`
                            },
                            children: te.map((I, J) => {
                              const v = T.indexOf(I.id) !== -1, N = ue === I.id, R = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(I) : "") + (v ? " wx-selected" : "") + (N ? " wx-inactive" : ""), P = c ? { minHeight: `${I.rowHeight || le}px` } : { height: `${I.rowHeight || le}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + R,
                                  "data-id": I.id,
                                  "data-context-id": I.id,
                                  style: P,
                                  role: "row",
                                  "aria-rowindex": J,
                                  "aria-expanded": I.open,
                                  "aria-level": G ? I.$level + 1 : void 0,
                                  "aria-selected": G ? v : void 0,
                                  tabIndex: -1,
                                  children: we.data.map((W) => W.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    W.id
                                  ) : M?.id === I.id && M.column == W.id ? /* @__PURE__ */ p(Bc, { row: I, column: W }, W.id) : /* @__PURE__ */ p(
                                    Rc,
                                    {
                                      row: I,
                                      column: W,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: z,
                                      focusable: gt?.row === I.id && gt?.column == W.id
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
                    vs,
                    {
                      type: "footer",
                      contentWidth: Ye,
                      deltaLeft: we.df,
                      columns: we.footer,
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
    H ? /* @__PURE__ */ p(
      jc,
      {
        config: H,
        rowStyle: i,
        columnStyle: a,
        cellStyle: l,
        header: e,
        footer: n,
        reorder: z
      }
    ) : null
  ] });
}
const Xc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Qc = _t(function({
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
  hotkeys: _ = null,
  ...M
}, G) {
  const C = Y();
  C.current = M;
  const H = $(() => new Ql(Rs), []), A = $(() => H.in, [H]), z = Y(null);
  z.current === null && (z.current = new zs((U, ie) => {
    const ne = "on" + Xc(U);
    C.current && C.current[ne] && C.current[ne](ie);
  }), A.setNext(z.current));
  const D = $(
    () => ({
      getState: H.getState.bind(H),
      getReactiveState: H.getReactive.bind(H),
      getStores: () => ({ data: H }),
      exec: A.exec,
      setNext: (U) => (z.current = z.current.setNext(U), z.current),
      intercept: A.intercept.bind(A),
      on: A.on.bind(A),
      detach: A.detach.bind(A),
      getRow: H.getRow.bind(H),
      getRowIndex: H.getRowIndex.bind(H),
      getColumn: H.getColumn.bind(H)
    }),
    [H, A]
  ), [F, ae] = K(0), [de, Z] = K(0), [ce, ye] = K(null), [O, le] = K(null), xe = $(() => {
    if (y && !e.length && t.length) {
      const U = t[0], ie = [];
      for (let ne in U)
        if (ne !== "id" && ne[0] !== "$") {
          let re = {
            id: ne,
            header: ne[0].toUpperCase() + ne.slice(1)
          };
          typeof y == "object" && (re = { ...re, ...y }), ie.push(re);
        }
      return ie;
    }
    return (O && O.columns) ?? e;
  }, [y, e, t, O]), ue = $(
    () => (O && O.sizes) ?? f,
    [O, f]
  ), De = E(
    (U) => {
      if (ae(U.width), Z(U.height), k) {
        const ie = Object.keys(k).map(Number).sort((ne, re) => ne - re).find((ne) => U.width <= ne) ?? null;
        ie !== ce && (le(k[ie]), ye(ie));
      }
    },
    [k, ce]
  ), Ie = Se(Ze.theme), me = Y(0);
  return B(() => {
    if (!me.current)
      b && b(D);
    else {
      const U = H.getState();
      H.init({
        data: t,
        columns: xe,
        split: w || U.split,
        sizes: ue || U.sizes,
        selectedRows: o || U.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: T || U.sortMarks,
        undo: S,
        reorder: h,
        _skin: Ie,
        _select: i
      });
    }
    me.current++;
  }, [
    H,
    t,
    xe,
    w,
    ue,
    o,
    d,
    x,
    T,
    S,
    h,
    Ie,
    i,
    b,
    D
  ]), me.current === 0 && H.init({
    data: t,
    columns: xe,
    split: w || { left: 0 },
    sizes: ue || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: T || {},
    undo: S,
    reorder: h,
    _skin: Ie,
    select: i
  }), Tt(
    G,
    () => ({
      ...D
    }),
    [D]
  ), /* @__PURE__ */ p(Je.Provider, { value: D, children: /* @__PURE__ */ p(In, { words: ac, optional: !0, children: /* @__PURE__ */ p(
    qc,
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
      clientWidth: F,
      clientHeight: de,
      responsiveLevel: ce,
      resize: De,
      hotkeys: _
    }
  ) }) });
});
function Zc({ item: t }) {
  return /* @__PURE__ */ Q(
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
  B(() => {
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
    Ao,
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
function ed({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ Q("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
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
  const n = $(() => t.id, [t?.id]);
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
    onTableAPIChange: i,
    multiTaskRows: a = !1,
    rowMapping: l = null
  } = t, [c, d] = Fe(o), [u, h] = K(), g = Se(Ze.i18n), m = $(() => g.getGroup("gantt"), [g]), f = Se(wt), w = oe(f, "scrollTop"), x = oe(f, "cellHeight"), y = oe(f, "_scrollTask"), b = oe(f, "_selected"), k = oe(f, "area"), T = oe(f, "_tasks"), S = oe(f, "_scales"), _ = oe(f, "columns"), M = oe(f, "_sort"), G = oe(f, "calendar"), C = oe(f, "durationUnit"), H = oe(f, "splitTasks"), [A, z] = K(null), D = $(() => !T || !k ? [] : a && l ? T : T.slice(k.start, k.end), [T, k, a, l]), F = E(
    (L, X) => {
      if (X === "add-task")
        f.exec(X, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (X === "open-task") {
        const te = D.find((fe) => fe.id === L);
        (te?.data || te?.lazy) && f.exec(X, { id: L, mode: !te.open });
      }
    },
    [D]
  ), ae = E(
    (L) => {
      const X = bt(L), te = L.target.dataset.action;
      te && L.preventDefault(), X ? te === "add-task" || te === "open-task" ? F(X, te) : f.exec("select-task", {
        id: X,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : te === "add-task" && F(null, te);
    },
    [f, F]
  ), de = Y(null), Z = Y(null), [ce, ye] = K(0), [O, le] = K(!1);
  B(() => {
    const L = Z.current;
    if (!L || typeof ResizeObserver > "u") return;
    const X = () => ye(L.clientWidth);
    X();
    const te = new ResizeObserver(X);
    return te.observe(L), () => te.disconnect();
  }, []);
  const xe = Y(null), ue = E(
    (L) => {
      const X = L.id, { before: te, after: fe } = L, Re = L.onMove;
      let Ee = te || fe, ze = te ? "before" : "after";
      if (Re) {
        if (ze === "after") {
          const je = f.getTask(Ee);
          je.data?.length && je.open && (ze = "before", Ee = je.data[0].id);
        }
        xe.current = { id: X, [ze]: Ee };
      } else xe.current = null;
      f.exec("move-task", {
        id: X,
        mode: ze,
        target: Ee,
        inProgress: Re
      });
    },
    [f]
  ), De = $(() => a && l ? 0 : k?.from ?? 0, [k, a, l]), Ie = $(() => S?.height ?? 0, [S]), me = $(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ce ?? 0), [n, s, c, r, ce]), U = $(() => {
    const L = {};
    return me && s === "all" || s === "grid" && me ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [me, s, c]), ie = $(() => A && !D.find((L) => L.id === A.id) ? [...D, A] : D, [D, A]), ne = $(() => {
    if (!a || !l) return ie;
    const L = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Set();
    return ie.forEach((te) => {
      const fe = l.taskRows.get(te.id) ?? te.id;
      X.has(fe) || (L.set(fe, {
        ...te,
        $rowTasks: l.rowMap.get(fe) || [te.id]
      }), X.add(fe));
    }), Array.from(L.values());
  }, [ie, a, l]), re = $(() => {
    let L = (_ || []).map((fe) => {
      fe = { ...fe };
      const Re = fe.header;
      if (typeof Re == "object") {
        const Ee = Re.text && m(Re.text);
        fe.header = { ...Re, text: Ee };
      } else fe.header = m(Re);
      return fe;
    });
    const X = L.findIndex((fe) => fe.id === "text"), te = L.findIndex((fe) => fe.id === "add-task");
    if (X !== -1 && (L[X].cell && (L[X]._cell = L[X].cell), L[X].cell = ed), te !== -1) {
      L[te].cell = L[te].cell || bs;
      const fe = L[te].header;
      if (typeof fe != "object" && (L[te].header = { text: fe }), L[te].header.cell = fe.cell || bs, e)
        L.splice(te, 1);
      else if (n) {
        const [Re] = L.splice(te, 1);
        L.unshift(Re);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [_, m, e, n]), ve = $(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : re.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, re]), Ae = $(() => {
    if (ne && M?.length) {
      const L = {};
      return M.forEach(({ key: X, order: te }, fe) => {
        L[X] = {
          order: te,
          ...M.length > 1 && { index: fe }
        };
      }), L;
    }
    return {};
  }, [ne, M]), we = E(() => re.some((L) => L.flexgrow && !L.hidden), []), ee = $(() => we(), [we, O]), ge = $(() => {
    let L = s === "chart" ? re.filter((te) => te.id === "add-task") : re;
    const X = s === "all" ? r : ce;
    if (!ee) {
      let te = c, fe = !1;
      if (re.some((Re) => Re.$width)) {
        let Re = 0;
        te = re.reduce((Ee, ze) => (ze.hidden || (Re += ze.width, Ee += ze.$width || ze.width), Ee), 0), Re > te && te > X && (fe = !0);
      }
      if (fe || te < X) {
        let Re = 1;
        return fe || (Re = (X - 50) / (te - 50 || 1)), L.map((Ee) => (Ee.id !== "add-task" && !Ee.hidden && (Ee.$width || (Ee.$width = Ee.width), Ee.width = Ee.$width * Re), Ee));
      }
    }
    return L;
  }, [s, re, ee, c, r, ce]), be = E(
    (L) => {
      if (!we()) {
        const X = ge.reduce((te, fe) => (L && fe.$width && (fe.$width = fe.width), te + (fe.hidden ? 0 : fe.width)), 0);
        X !== c && d(X);
      }
      le(!0), le(!1);
    },
    [we, ge, c, d]
  ), V = E(() => {
    re.filter((X) => X.flexgrow && !X.hidden).length === 1 && re.forEach((X) => {
      X.$width && !X.flexgrow && !X.hidden && (X.width = X.$width);
    });
  }, []), ke = E(
    (L) => {
      if (!e) {
        const X = bt(L), te = er(L, "data-col-id");
        !(te && re.find((Re) => Re.id == te))?.editor && X && f.exec("show-editor", { id: X });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), Ne = $(
    () => Array.isArray(b) ? b.map((L) => L.id) : [],
    [b]
  ), pe = Y(De);
  pe.current = De, B(() => {
    const L = (te) => {
      if (de.current) {
        const fe = de.current.querySelector(".wx-body");
        fe && (fe.style.top = -((te ?? 0) - (pe.current ?? 0)) + "px");
      }
      Z.current && (Z.current.scrollTop = 0);
    };
    return L(w), f.on("scroll-chart", ({ top: te }) => {
      te !== void 0 && L(te);
    });
  }, [f, w]), B(() => {
    if (de.current) {
      const L = de.current.querySelector(".wx-body");
      L && (L.style.top = -((w ?? 0) - (De ?? 0)) + "px");
    }
  }, [De]), B(() => {
    const L = de.current;
    if (!L) return;
    const X = L.querySelector(".wx-table-box .wx-body");
    if (!X || typeof ResizeObserver > "u") return;
    const te = new ResizeObserver(() => {
      if (de.current) {
        const fe = de.current.querySelector(".wx-body");
        fe && (fe.style.top = -((w ?? 0) - (pe.current ?? 0)) + "px");
      }
    });
    return te.observe(X), () => {
      te.disconnect();
    };
  }, [ge, U, s, ve, ne, w]), B(() => {
    if (!y || !u) return;
    const { id: L } = y, X = u.getState().focusCell;
    X && X.row !== L && de.current && de.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: X.column
    });
  }, [y, u]);
  const Oe = E(
    ({ id: L }) => {
      if (e) return !1;
      f.getTask(L).open && f.exec("open-task", { id: L, mode: !1 });
      const X = f.getState()._tasks.find((te) => te.id === L);
      if (z(X || null), !X) return !1;
    },
    [f, e]
  ), Ue = E(
    ({ id: L, top: X }) => {
      xe.current ? ue({ ...xe.current, onMove: !1 }) : f.exec("drag-task", {
        id: L,
        top: X + (De ?? 0),
        inProgress: !1
      }), z(null);
    },
    [f, ue, De]
  ), Te = E(
    ({ id: L, top: X, detail: te }) => {
      te && ue({ ...te, onMove: !0 }), f.exec("drag-task", {
        id: L,
        top: X + (De ?? 0),
        inProgress: !0
      });
    },
    [f, ue, De]
  );
  B(() => {
    const L = de.current;
    return L ? ic(L, {
      start: Oe,
      end: Ue,
      move: Te,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, Oe, Ue, Te]);
  const Ce = E(
    (L) => {
      const { key: X, isInput: te } = L;
      if (!te && (X === "arrowup" || X === "arrowdown"))
        return L.eventSource = "grid", f.exec("hotkey", L), !1;
      if (X === "enter") {
        const fe = u?.getState().focusCell;
        if (fe) {
          const { row: Re, column: Ee } = fe;
          Ee === "add-task" ? F(Re, "add-task") : Ee === "text" && F(Re, "open-task");
        }
      }
    },
    [f, F, u]
  ), Me = Y(null), Pe = () => {
    Me.current = {
      setTableAPI: h,
      handleHotkey: Ce,
      sortVal: M,
      api: f,
      adjustColumns: V,
      setColumnWidth: be,
      tasks: D,
      calendarVal: G,
      durationUnitVal: C,
      splitTasksVal: H,
      onTableAPIChange: i
    };
  };
  Pe(), B(() => {
    Pe();
  }, [
    h,
    Ce,
    M,
    f,
    V,
    be,
    D,
    G,
    C,
    H,
    i
  ]);
  const Ye = E((L) => {
    h(L), L.intercept("hotkey", (X) => Me.current.handleHotkey(X)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (X) => {
      const te = Me.current.sortVal, { key: fe, add: Re } = X, Ee = te ? te.find((je) => je.key === fe) : null;
      let ze = "asc";
      return Ee && (ze = !Ee || Ee.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: fe,
        order: ze,
        add: Re
      }), !1;
    }), L.on("resize-column", () => {
      Me.current.setColumnWidth(!0);
    }), L.on("hide-column", (X) => {
      X.mode || Me.current.adjustColumns(), Me.current.setColumnWidth();
    }), L.intercept("update-cell", (X) => {
      const { id: te, column: fe, value: Re } = X, Ee = Me.current.tasks.find((ze) => ze.id === te);
      if (Ee) {
        const ze = { ...Ee };
        let je = Re;
        je && !isNaN(je) && !(je instanceof Date) && (je *= 1), ze[fe] = je, yo(
          ze,
          {
            calendar: Me.current.calendarVal,
            durationUnit: Me.current.durationUnitVal,
            splitTasks: Me.current.splitTasksVal
          },
          fe
        ), f.exec("update-task", {
          id: te,
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
      style: { flex: `0 0 ${ve}` },
      ref: Z,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: de,
          style: U,
          className: "wx-rHj6070p wx-table",
          onClick: ae,
          onDoubleClick: ke,
          children: /* @__PURE__ */ p(
            Qc,
            {
              init: Ye,
              sizes: {
                rowHeight: x,
                headerHeight: (Ie ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: ne,
              columns: ge,
              selectedRows: [...Ne],
              sortMarks: Ae
            }
          )
        }
      )
    }
  );
}
function nd({ borders: t = "" }) {
  const e = Se(wt), n = oe(e, "cellWidth"), r = oe(e, "cellHeight"), s = Y(null), [o, i] = K("#e4e4e4");
  B(() => {
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
    background: n != null && r != null ? `url(${dl(n, r, o, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ p("div", { ref: s, style: a });
}
function rd({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = Se(wt), s = oe(r, "_links"), o = oe(r, "criticalPath"), i = Y(null), a = E(
    (l) => {
      const c = l?.target?.classList;
      !c?.contains("wx-line") && !c?.contains("wx-delete-button") && t(null);
    },
    [t]
  );
  return B(() => {
    if (!n && e && i.current) {
      const l = (c) => {
        i.current && !i.current.contains(c.target) && a(c);
      };
      return document.addEventListener("click", l), () => {
        document.removeEventListener("click", l);
      };
    }
  }, [n, e, a]), /* @__PURE__ */ Q("svg", { className: "wx-dkx3NwEn wx-links", children: [
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
function sd(t) {
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
  return /* @__PURE__ */ p("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ Q(
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
let jt = [], qn = null, Ss = null;
const $s = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, i = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, a = Math.floor(t / r), l = new Date(n.getTime() + a * i * o);
  return l.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: a,
    scalesStart: n.toISOString(),
    result: l.toISOString()
  }), l;
}, od = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / i);
}, id = (t, e, n) => {
  if (!n || !t)
    return console.log("[addCells] early return:", { scales: !!n, date: t?.toISOString?.() }), t;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5, a = new Date(t.getTime() + e * i);
  return a.setUTCHours(0, 0, 0, 0), console.log("[addCells]", { date: t.toISOString(), cells: e, lengthUnit: r, result: a.toISOString() }), a;
}, ad = (t, e, n, r) => t < r && e > n;
function ld(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: i = !1,
    allowTaskIntersection: a = !0
  } = t, l = Se(wt), [c, d] = Qt(l, "_tasks"), [u, h] = Qt(l, "_links"), g = oe(l, "area"), m = oe(l, "_scales"), f = oe(l, "taskTypes"), w = $(() => {
    if (!m || !m.start) return m;
    const v = new Date(Date.UTC(
      m.start.getFullYear(),
      m.start.getMonth(),
      m.start.getDate()
    )), N = v.getUTCDay(), R = N === 0 ? -6 : 1 - N, P = new Date(v.getTime() + R * 864e5);
    return P.setUTCHours(0, 0, 0, 0), console.log("[scales-normalize]", {
      raw: m.start.toISOString(),
      utc: v.toISOString(),
      dayOfWeek: N,
      daysToMonday: R,
      monday: P.toISOString()
    }), { ...m, start: P };
  }, [m]), x = oe(l, "baselines"), [y, b] = Qt(l, "_selected"), k = oe(l, "_scrollTask"), T = oe(l, "criticalPath"), S = oe(l, "tasks"), _ = oe(l, "schedule"), M = oe(l, "splitTasks"), G = $(() => {
    if (!g || !Array.isArray(c)) return [];
    const v = g.start ?? 0, N = g.end ?? 0;
    return r && s ? c.map((R) => ({ ...R })) : c.slice(v, N).map((R) => ({ ...R }));
  }, [d, g, r, s]), C = oe(l, "cellHeight"), H = $(() => {
    if (!r || !s || !G.length) return G;
    const v = /* @__PURE__ */ new Map(), N = [];
    return c.forEach((R) => {
      const P = s.taskRows.get(R.id) ?? R.id;
      v.has(P) || (v.set(P, N.length), N.push(P));
    }), G.map((R) => {
      const P = s.taskRows.get(R.id) ?? R.id, W = v.get(P) ?? 0;
      return {
        ...R,
        $y: W * C,
        $y_base: R.$y_base !== void 0 ? W * C : void 0
      };
    });
  }, [G, r, s, c, C]), A = $(
    () => w.lengthUnitWidth,
    [w]
  ), z = $(
    () => w.lengthUnit || "day",
    [w]
  ), D = Y(!1), [F, ae] = K(void 0), [de, Z] = K(null), ce = Y(null), [ye, O] = K(null), [le, xe] = K(void 0), ue = Y(null), [De, Ie] = K(0), [me, U] = K(null), ie = Y(null), [ne, re] = K(null), [ve, Ae] = K(null), [we, ee] = K(null), ge = Y(null);
  ge.current = ve;
  const be = Y(200), V = Y(null), ke = $(() => {
    const v = V.current;
    return !!(y.length && v && v.contains(document.activeElement));
  }, [y, V.current]), Ne = $(() => ke && y[y.length - 1]?.id, [ke, y]);
  B(() => {
    if (k && ke && k) {
      const { id: v } = k, N = V.current?.querySelector(
        `.wx-bar[data-id='${v}']`
      );
      N && N.focus({ preventScroll: !0 });
    }
  }, [k]), B(() => {
    const v = V.current;
    if (v && (Ie(v.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const N = new ResizeObserver((R) => {
        R[0] && Ie(R[0].contentRect.width);
      });
      return N.observe(v), () => N.disconnect();
    }
  }, [V.current]);
  const pe = E(() => {
    document.body.style.userSelect = "none";
  }, []), Oe = E(() => {
    document.body.style.userSelect = "";
  }, []), Ue = E(
    (v, N, R) => {
      if (N.target.classList.contains("wx-line") || (R || (R = l.getTask(kt(v))), R.type === "milestone" || R.type === "summary")) return "";
      const P = Ke(N, "data-segment");
      P && (v = P);
      const { left: W, width: j } = v.getBoundingClientRect(), q = (N.clientX - W) / j;
      let se = 0.2 / (j > 200 ? j / 200 : 1);
      return q < se ? "start" : q > 1 - se ? "end" : "";
    },
    [l]
  ), Te = $(() => {
    const v = /* @__PURE__ */ new Set();
    if (a || !r || !s)
      return v;
    const N = /* @__PURE__ */ new Map();
    return c.forEach((R) => {
      if (R.type === "summary" || R.type === "milestone") return;
      const P = s.taskRows.get(R.id) ?? R.id;
      N.has(P) || N.set(P, []), N.get(P).push(R);
    }), N.forEach((R) => {
      if (!(R.length < 2))
        for (let P = 0; P < R.length; P++)
          for (let W = P + 1; W < R.length; W++) {
            const j = R[P], q = R[W], se = j.$x, he = j.$x + j.$w, $e = q.$x, Le = q.$x + q.$w;
            ad(se, he, $e, Le) && (v.add(j.id), v.add(q.id));
          }
    }), v;
  }, [a, r, s, c, d]), Ce = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return c.forEach((P) => {
        v.set(P.id, P.$y);
      }), v;
    const N = /* @__PURE__ */ new Map(), R = [];
    return c.forEach((P) => {
      const W = s.taskRows.get(P.id) ?? P.id;
      N.has(W) || (N.set(W, R.length), R.push(W));
    }), c.forEach((P) => {
      const W = s.taskRows.get(P.id) ?? P.id, j = N.get(W) ?? 0;
      v.set(P.id, j * C);
    }), v;
  }, [c, r, s, C]), Me = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return c.forEach((P) => {
        v.set(P.id, P.$y), P.row !== void 0 && v.set(P.row, P.$y);
      }), v;
    const N = /* @__PURE__ */ new Map(), R = [];
    return c.forEach((P) => {
      const W = s.taskRows.get(P.id) ?? P.id;
      N.has(W) || (N.set(W, R.length), R.push(W));
    }), N.forEach((P, W) => {
      v.set(W, P * C);
    }), v;
  }, [c, r, s, C]), Pe = E(
    (v) => {
      if (!V.current) return [];
      const R = Math.min(v.startX, v.currentX), P = Math.max(v.startX, v.currentX), W = Math.min(v.startY, v.currentY), j = Math.max(v.startY, v.currentY);
      return c.filter((q) => {
        const se = q.$x, he = q.$x + q.$w, Le = Ce.get(q.id) ?? q.$y, Ve = Le + q.$h;
        return se < P && he > R && Le < j && Ve > W;
      });
    },
    [c, Ce]
  ), Ye = $(() => new Set(y.map((v) => v.id)), [y, b]), L = E(
    (v) => Ye.has(v),
    [Ye]
  ), X = E(
    (v, N) => {
      const { clientX: R } = N, P = kt(v), W = l.getTask(P), j = N.target.classList;
      if (!N.target.closest(".wx-delete-button") && !e) {
        if (j.contains("wx-progress-marker")) {
          const { progress: q } = l.getTask(P);
          ce.current = {
            id: P,
            x: R,
            progress: q,
            dx: 0,
            node: v,
            marker: N.target
          }, N.target.classList.add("wx-progress-in-drag");
        } else {
          const q = Ue(v, N, W) || "move", se = {
            id: P,
            mode: q,
            x: R,
            dx: 0,
            l: W.$x,
            w: W.$w
          };
          if (M && W.segments?.length) {
            const he = Ke(N, "data-segment");
            he && (se.segmentIndex = he.dataset.segment * 1);
          }
          Z(se);
        }
        pe();
      }
    },
    [l, e, Ue, pe, M]
  ), te = E(
    (v) => {
      if (v.button !== 0 || we) return;
      const N = Ke(v);
      if (!N && o && !e) {
        const R = V.current;
        if (!R) return;
        const P = R.getBoundingClientRect(), W = v.clientX - P.left, j = v.clientY - P.top;
        if (i) {
          const se = $s(W, w);
          se && (ge.current = se, Ae(se));
        }
        const q = {
          startX: W,
          startY: j,
          currentX: W,
          currentY: j,
          ctrlKey: v.ctrlKey || v.metaKey
        };
        U(q), ie.current = q, pe();
        return;
      }
      if (N) {
        if (o && !e && y.length > 1) {
          const R = kt(N);
          if (L(R)) {
            const P = v.target.classList;
            if (!P.contains("wx-link") && !P.contains("wx-progress-marker") && !v.target.closest(".wx-delete-button")) {
              const W = l.getTask(R);
              if (!Ue(N, v, W)) {
                const q = /* @__PURE__ */ new Map();
                y.forEach((se) => {
                  const he = l.getTask(se.id);
                  if (he) {
                    if (_?.auto && he.type === "summary") return;
                    q.set(se.id, {
                      $x: he.$x,
                      $w: he.$w,
                      start: he.start,
                      end: he.end
                    });
                  }
                }), re({
                  baseTaskId: R,
                  startX: v.clientX,
                  dx: 0,
                  originalPositions: q
                }), pe();
                return;
              }
            }
          }
        }
        X(N, v);
      }
    },
    [X, o, i, e, y, L, l, Ue, _, pe, w, we]
  ), fe = E(
    (v) => {
      const N = Ke(v);
      N && (ue.current = setTimeout(() => {
        xe(!0), X(N, v.touches[0]);
      }, 300));
    },
    [X]
  ), Re = E(
    (v) => {
      O(v && { ...u.find((N) => N.id === v) });
    },
    [u]
  ), Ee = E(() => {
    const v = ie.current;
    if (v) {
      const N = Pe(v);
      v.ctrlKey ? N.forEach((R) => {
        l.exec("select-task", { id: R.id, toggle: !0, marquee: !0 });
      }) : (y.length > 0 && l.exec("select-task", { id: null, marquee: !0 }), N.forEach((R, P) => {
        l.exec("select-task", {
          id: R.id,
          toggle: P > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), U(null), ie.current = null, Oe(), D.current = !0;
      return;
    }
    if (ne) {
      const { dx: N, originalPositions: R } = ne, P = Math.round(N / A);
      if (P !== 0) {
        let W = !0;
        R.forEach((j, q) => {
          const se = l.getTask(q);
          se && (l.exec("update-task", {
            id: q,
            diff: P,
            task: { start: se.start, end: se.end },
            skipUndo: !W
            // Only first task creates undo entry
          }), W = !1);
        }), D.current = !0;
      } else
        R.forEach((W, j) => {
          l.exec("drag-task", {
            id: j,
            left: W.$x,
            width: W.$w,
            inProgress: !1
          });
        });
      re(null), Oe();
      return;
    }
    if (ce.current) {
      const { dx: N, id: R, marker: P, value: W } = ce.current;
      ce.current = null, typeof W < "u" && N && l.exec("update-task", {
        id: R,
        task: { progress: W },
        inProgress: !1
      }), P.classList.remove("wx-progress-in-drag"), D.current = !0, Oe();
    } else if (de) {
      const { id: N, mode: R, dx: P, l: W, w: j, start: q, segment: se, index: he } = de;
      if (Z(null), q) {
        const $e = Math.round(P / A);
        if (!$e)
          l.exec("drag-task", {
            id: N,
            width: j,
            left: W,
            inProgress: !1,
            ...se && { segmentIndex: he }
          });
        else {
          let Le = {}, Ve = l.getTask(N);
          se && (Ve = Ve.segments[he]);
          const nt = 1440 * 60 * 1e3, We = $e * (z === "week" ? 7 : z === "month" ? 30 : z === "quarter" ? 91 : z === "year" ? 365 : 1) * nt;
          R === "move" ? (Le.start = new Date(Ve.start.getTime() + We), Le.end = new Date(Ve.end.getTime() + We)) : R === "start" ? (Le.start = new Date(Ve.start.getTime() + We), Le.end = Ve.end) : R === "end" && (Le.start = Ve.start, Le.end = new Date(Ve.end.getTime() + We)), l.exec("update-task", {
            id: N,
            task: Le,
            ...se && { segmentIndex: he }
          });
        }
        D.current = !0;
      }
      Oe();
    }
  }, [l, Oe, de, A, z, me, ne, Pe, y]), ze = E(
    (v, N) => {
      const { clientX: R, clientY: P } = N, W = V.current;
      if (W) {
        const j = W.getBoundingClientRect();
        be.current = R - j.left;
      }
      if (we) {
        if (!W) return;
        const j = W.getBoundingClientRect(), q = R - j.left;
        ee((se) => ({ ...se, currentX: q }));
        return;
      }
      if (!e) {
        if (me) {
          const j = V.current;
          if (!j) return;
          const q = j.getBoundingClientRect(), se = R - q.left, he = P - q.top;
          U(($e) => ({
            ...$e,
            currentX: se,
            currentY: he
          })), ie.current && (ie.current.currentX = se, ie.current.currentY = he);
          return;
        }
        if (ne) {
          const j = R - ne.startX;
          ne.originalPositions.forEach((q, se) => {
            const he = q.$x + j;
            l.exec("drag-task", {
              id: se,
              left: he,
              width: q.$w,
              inProgress: !0
            });
          }), re((q) => ({ ...q, dx: j }));
          return;
        }
        if (ce.current) {
          const { node: j, x: q, id: se } = ce.current, he = ce.current.dx = R - q, $e = Math.round(he / j.offsetWidth * 100);
          let Le = ce.current.progress + $e;
          ce.current.value = Le = Math.min(
            Math.max(0, Le),
            100
          ), l.exec("update-task", {
            id: se,
            task: { progress: Le },
            inProgress: !0
          });
        } else if (de) {
          Re(null);
          const { mode: j, l: q, w: se, x: he, id: $e, start: Le, segment: Ve, index: nt } = de, it = l.getTask($e), We = R - he;
          if (!Le && Math.abs(We) < 20 || j === "start" && se - We < A || j === "end" && se + We < A || j === "move" && (We < 0 && q + We < 0 || We > 0 && q + se + We > De) || de.segment)
            return;
          const rt = { ...de, dx: We };
          let yt, lt;
          if (j === "start" ? (yt = q + We, lt = se - We) : j === "end" ? (yt = q, lt = se + We) : j === "move" && (yt = q + We, lt = se), l.exec("drag-task", {
            id: $e,
            width: lt,
            left: yt,
            inProgress: !0,
            ...Ve && { segmentIndex: nt }
          }), !rt.start && (j === "move" && it.$x == q || j !== "move" && it.$w == se)) {
            D.current = !0, Ee();
            return;
          }
          rt.start = !0, Z(rt);
        } else {
          const j = Ke(v);
          if (j) {
            const q = l.getTask(kt(j)), he = Ke(v, "data-segment") || j, $e = Ue(he, N, q);
            he.style.cursor = $e && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      l,
      e,
      de,
      A,
      De,
      Ue,
      Re,
      Ee,
      me,
      ne,
      we
    ]
  ), je = E(
    (v) => {
      ze(v, v);
    },
    [ze]
  ), Yt = E(
    (v) => {
      le ? (v.preventDefault(), ze(v, v.touches[0])) : ue.current && (clearTimeout(ue.current), ue.current = null);
    },
    [le, ze]
  ), ot = E(() => {
    Ee();
  }, [Ee]), On = E(() => {
    xe(null), ue.current && (clearTimeout(ue.current), ue.current = null), Ee();
  }, [Ee]);
  B(() => (window.addEventListener("mouseup", ot), () => {
    window.removeEventListener("mouseup", ot);
  }), [ot]);
  const Nt = E(
    (v) => {
      if (!e) {
        const N = bt(v.target);
        if (N && !v.target.classList.contains("wx-link")) {
          const R = bt(v.target, "data-segment");
          l.exec("show-editor", {
            id: N,
            ...R !== null && { segmentIndex: R }
          });
        }
      }
    },
    [l, e]
  ), Pn = ["e2s", "s2s", "e2e", "s2e"], Mt = E((v, N) => Pn[(v ? 1 : 0) + (N ? 0 : 2)], []), Et = E(
    (v, N) => {
      const R = F.id, P = F.start;
      return v === R ? !0 : !!u.find((W) => W.target == v && W.source == R && W.type === Mt(P, N));
    },
    [F, h, Mt]
  ), cn = E(() => {
    F && ae(null);
  }, [F]), dn = E((v, N, R) => {
    if (!N.length || !v || R == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: v.toISOString(),
      taskCount: N.length,
      parent: R
    });
    const P = 864e5, W = l.getHistory();
    W?.startBatch();
    const j = new Date(v);
    j.setUTCHours(0, 0, 0, 0), console.log("[paste] scalesValue:", {
      start: w?.start?.toISOString?.(),
      lengthUnit: w?.lengthUnit,
      lengthUnitWidth: w?.lengthUnitWidth
    }), N.forEach((q, se) => {
      const he = `task-${Date.now()}-${se}`;
      console.log("[paste] task input:", {
        text: q.text,
        _startCellOffset: q._startCellOffset,
        _startDayOfWeek: q._startDayOfWeek,
        _durationDays: q._durationDays,
        start: q.start?.toISOString?.(),
        end: q.end?.toISOString?.()
      });
      const $e = id(j, q._startCellOffset || 0, w);
      console.log("[paste] cellOffset:", $e?.toISOString?.());
      const Le = new Date($e.getTime() + (q._startDayOfWeek || 0) * P);
      Le.setUTCHours(0, 0, 0, 0);
      const Ve = new Date(Le.getTime() + (q._durationDays || 7) * P);
      Ve.setUTCHours(0, 0, 0, 0), console.log("[paste] task calculated:", {
        text: q.text,
        newStart: Le.toISOString(),
        newEnd: Ve.toISOString(),
        row: q.row
      }), l.exec("add-task", {
        task: {
          id: he,
          text: q.text,
          start: Le,
          end: Ve,
          type: q.type || "task",
          parent: R,
          row: q.row
        },
        target: R,
        mode: "child",
        skipUndo: se > 0
      });
    }), W?.endBatch();
  }, [l, w]), un = E(
    (v) => {
      if (D.current) {
        D.current = !1;
        return;
      }
      if (we && we.currentX != null) {
        const R = $s(we.currentX, w);
        R && dn(R, we.tasks, we.parent), ee(null);
        return;
      }
      const N = bt(v.target);
      if (N) {
        const R = l.getTask(N), P = c.find((j) => j.id === N);
        console.log("[click] task:", R?.text, "id:", N), console.log("[click] api.getTask:", { start: R?.start, end: R?.end, duration: R?.duration }), console.log("[click] rendered:", { start: P?.start, end: P?.end, $w: P?.$w, $x: P?.$x });
        const W = v.target.classList;
        if (W.contains("wx-link")) {
          const j = W.contains("wx-left");
          if (!F) {
            ae({ id: N, start: j });
            return;
          }
          F.id !== N && !Et(N, j) && l.exec("add-link", {
            link: {
              source: F.id,
              target: N,
              type: Mt(F.start, j)
            }
          });
        } else if (W.contains("wx-delete-button-icon"))
          l.exec("delete-link", { id: ye.id }), O(null);
        else {
          let j;
          const q = Ke(v, "data-segment");
          q && (j = q.dataset.segment * 1), l.exec("select-task", {
            id: N,
            toggle: v.ctrlKey || v.metaKey,
            range: v.shiftKey,
            segmentIndex: j
          });
        }
      }
      cn();
    },
    [
      l,
      F,
      h,
      ye,
      Et,
      Mt,
      cn,
      we,
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
  }), []), Vt = E(
    (v) => {
      if (le || ue.current)
        return v.preventDefault(), !1;
    },
    [le]
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
      if (_?.auto) {
        const N = S.getSummaryId(v, !0), R = S.getSummaryId(F.id, !0);
        return F?.id && !(Array.isArray(N) ? N : [N]).includes(
          F.id
        ) && !(Array.isArray(R) ? R : [R]).includes(v);
      }
      return F;
    },
    [_, S, F]
  ), I = E(() => {
    const v = l.getState()._selected;
    if (!v || !v.length) return;
    const N = 864e5, R = v.map((se) => {
      const he = l.getTask(se.id);
      if (!he) return null;
      const $e = c.find((Vo) => Vo.id === se.id);
      if (!$e) return null;
      const { $x: Le, $y: Ve, $h: nt, $w: it, $skip: We, $level: rt, $index: yt, $y_base: lt, $x_base: zn, $w_base: Vd, $h_base: Gd, $skip_baseline: Bd, $critical: Kd, $reorder: jd, ...Yo } = $e, Rr = $e.end && $e.start ? Math.round(($e.end.getTime() - $e.start.getTime()) / N) : 0, Ar = $e.start ? ($e.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: he.id,
        text: he.text,
        start: $e.start?.toISOString?.(),
        end: $e.end?.toISOString?.(),
        durationDays: Rr,
        startDayOfWeek: Ar,
        $w: it,
        $h: nt,
        row: $e.row,
        parent: $e.parent
      }), { ...Yo, _durationDays: Rr, _startDayOfWeek: Ar, _originalWidth: it, _originalHeight: nt };
    }).filter(Boolean);
    if (!R.length) return;
    const W = R[0].parent, j = R.filter((se) => se.parent === W);
    if (j.length === 0) return;
    const q = j.reduce((se, he) => he.start && (!se || he.start < se) ? he.start : se, null);
    jt = j.map((se) => ({
      ...se,
      _startCellOffset: od(se.start, q, w)
    })), Ss = W, qn = q, console.log("[copy] clipboard stored:", {
      taskCount: jt.length,
      baseDate: q?.toISOString?.(),
      parent: W,
      tasks: jt.map((se) => ({
        id: se.id,
        text: se.text,
        _startCellOffset: se._startCellOffset,
        _startDayOfWeek: se._startDayOfWeek,
        _durationDays: se._durationDays
      }))
    });
  }, [l, w]);
  B(() => i ? l.intercept("hotkey", (N) => {
    if (N.key === "ctrl+c" || N.key === "meta+c")
      return I(), !1;
    if (N.key === "ctrl+v" || N.key === "meta+v")
      return !jt.length || !qn || ee({
        tasks: jt,
        baseDate: qn,
        parent: Ss,
        currentX: be.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [i, l, I]), B(() => {
    if (!we) return;
    const v = (N) => {
      N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), ee(null));
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [we]);
  const J = $(() => {
    if (!me) return null;
    const v = Math.min(me.startX, me.currentX), N = Math.min(me.startY, me.currentY), R = Math.abs(me.currentX - me.startX), P = Math.abs(me.currentY - me.startY);
    return {
      left: `${v}px`,
      top: `${N}px`,
      width: `${R}px`,
      height: `${P}px`
    };
  }, [me]);
  return /* @__PURE__ */ Q(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${H.length ? H[0].$h : 0}px` },
      ref: V,
      onContextMenu: Vt,
      onMouseDown: te,
      onMouseMove: je,
      onTouchStart: fe,
      onTouchMove: Yt,
      onTouchEnd: On,
      onClick: un,
      onDoubleClick: Nt,
      onDragStart: (v) => (v.preventDefault(), !1),
      children: [
        /* @__PURE__ */ p(
          rd,
          {
            onSelectLink: Re,
            selectedLink: ye,
            readonly: e
          }
        ),
        H.map((v) => {
          if (v.$skip && v.$skip_baseline) return null;
          const N = Te.has(v.id), R = `wx-bar wx-${Bt(v.type)}` + (v.$css ? ` ${v.$css}` : "") + (le && de && v.id === de.id ? " wx-touch" : "") + (F && F.id === v.id ? " wx-selected" : "") + (Ye.has(v.id) ? " wx-selected" : "") + (It(v.id) ? " wx-critical" : "") + (v.$reorder ? " wx-reorder-task" : "") + (M && v.segments ? " wx-split" : "") + (N ? " wx-collision" : ""), P = "wx-link wx-left" + (F ? " wx-visible" : "") + (!F || !Et(v.id, !0) && fn(v.id) ? " wx-target" : "") + (F && F.id === v.id && F.start ? " wx-selected" : "") + (It(v.id) ? " wx-critical" : ""), W = "wx-link wx-right" + (F ? " wx-visible" : "") + (!F || !Et(v.id, !1) && fn(v.id) ? " wx-target" : "") + (F && F.id === v.id && !F.start ? " wx-selected" : "") + (It(v.id) ? " wx-critical" : "");
          return /* @__PURE__ */ Q(Ds, { children: [
            !v.$skip && /* @__PURE__ */ Q(
              "div",
              {
                className: "wx-GKbcLEGA " + R,
                style: Wn(v),
                "data-tooltip-id": v.id,
                "data-id": v.id,
                tabIndex: Ne === v.id ? 0 : -1,
                children: [
                  e ? null : v.id === ye?.target && ye?.type[2] === "s" ? /* @__PURE__ */ p(
                    ut,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + P, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  v.type !== "milestone" ? /* @__PURE__ */ Q(He, { children: [
                    v.progress && !(M && v.segments) ? /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${v.progress}%` }
                      }
                    ) }) : null,
                    !e && !(M && v.segments) ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${v.progress}% - 10px)` },
                        children: v.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: xt }) : M && v.segments ? /* @__PURE__ */ p(sd, { task: v, type: Bt(v.type) }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.$barText || v.text || "" }),
                    N && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" })
                  ] }) : /* @__PURE__ */ Q(He, { children: [
                    /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ p(n, { data: v, api: l, onAction: xt }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: v.$barText || v.text })
                  ] }),
                  e ? null : v.id === ye?.target && ye?.type[2] === "e" ? /* @__PURE__ */ p(
                    ut,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + W, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) })
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
        me && J && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: J }),
        we && we.currentX != null && we.tasks.map((v, N) => {
          const P = (Math.floor(we.currentX / A) + (v._startCellOffset || 0)) * A, W = v._originalWidth || A, j = v._originalHeight || C, q = Me.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: P, top: q, width: W, height: j },
              children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.$barText || v.text })
            },
            `preview-${N}`
          );
        })
      ]
    }
  );
}
function cd(t) {
  const { highlightTime: e, onScaleClick: n } = t, r = Se(wt), s = oe(r, "_scales");
  return /* @__PURE__ */ p("div", { className: "wx-ZkvhDKir wx-scale", style: { width: s.width }, children: (s?.rows || []).map((o, i) => /* @__PURE__ */ p(
    "div",
    {
      className: "wx-ZkvhDKir wx-row",
      style: { height: `${o.height}px` },
      children: (o.cells || []).map((a, l) => {
        const c = e ? e(a.date, a.unit) : "", d = "wx-cell " + (a.css || "") + " " + (c || ""), u = typeof a.value == "string" && a.value.includes("<");
        return /* @__PURE__ */ p(
          "div",
          {
            className: "wx-ZkvhDKir " + d,
            style: { width: `${a.width}px`, cursor: n ? "pointer" : void 0 },
            onClick: n ? () => n(a.date, a.unit) : void 0,
            ...u ? { dangerouslySetInnerHTML: { __html: a.value } } : { children: a.value }
          },
          l
        );
      })
    },
    i
  )) });
}
const dd = /* @__PURE__ */ new Map();
function ud(t) {
  const e = Y(null), n = Y(0), r = Y(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, B(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        dd.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function fd(t) {
  const {
    readonly: e,
    fullWidth: n,
    fullHeight: r,
    taskTemplate: s,
    cellBorders: o,
    highlightTime: i,
    onScaleClick: a,
    multiTaskRows: l = !1,
    rowMapping: c = null,
    marqueeSelect: d = !1,
    copyPaste: u = !1,
    scrollToCurrentWeek: h = !1,
    currentWeekColor: g = null,
    allowTaskIntersection: m = !0
  } = t, f = Se(wt), [w, x] = Qt(f, "_selected"), y = oe(f, "scrollTop"), b = oe(f, "cellHeight"), k = oe(f, "cellWidth"), T = oe(f, "_scales"), S = oe(f, "_markers"), _ = oe(f, "_scrollTask"), M = oe(f, "zoom"), G = oe(f, "_tasks"), [C, H] = K(), A = Y(null), z = Y(0), D = Y(!1), F = 1 + (T?.rows?.length || 0), ae = $(() => {
    if (!l || !c || !G?.length) return null;
    const U = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), ne = [];
    return G.forEach((re) => {
      const ve = c.taskRows.get(re.id) ?? re.id;
      ie.has(ve) || (ie.set(ve, ne.length), ne.push(ve));
    }), G.forEach((re) => {
      const ve = c.taskRows.get(re.id) ?? re.id, Ae = ie.get(ve) ?? 0;
      U.set(re.id, Ae * b);
    }), U;
  }, [G, l, c, b]), de = $(() => {
    const U = [];
    return w && w.length && b && w.forEach((ie) => {
      const ne = ae?.get(ie.id) ?? ie.$y;
      U.push({ height: `${b}px`, top: `${ne - 3}px` });
    }), U;
  }, [x, b, ae]), Z = $(
    () => Math.max(C || 0, r),
    [C, r]
  );
  B(() => {
    const U = A.current;
    U && typeof y == "number" && (U.scrollTop = y);
  }, [y]);
  const ce = () => {
    ye();
  };
  function ye(U) {
    const ie = A.current;
    if (!ie) return;
    const ne = {};
    ne.left = ie.scrollLeft, f.exec("scroll-chart", ne);
  }
  function O() {
    const U = A.current, ne = Math.ceil((C || 0) / (b || 1)) + 1, re = Math.floor((U && U.scrollTop || 0) / (b || 1)), ve = Math.max(0, re - F), Ae = re + ne + F, we = ve * (b || 0);
    f.exec("render-data", {
      start: ve,
      end: Ae,
      from: we
    });
  }
  B(() => {
    O();
  }, [C, y]);
  const le = E(
    (U) => {
      if (!U) return;
      const { id: ie, mode: ne } = U;
      if (ne.toString().indexOf("x") < 0) return;
      const re = A.current;
      if (!re) return;
      const { clientWidth: ve } = re, Ae = f.getTask(ie);
      if (Ae.$x + Ae.$w < re.scrollLeft)
        f.exec("scroll-chart", { left: Ae.$x - (k || 0) }), re.scrollLeft = Ae.$x - (k || 0);
      else if (Ae.$x >= ve + re.scrollLeft) {
        const we = ve < Ae.$w ? k || 0 : Ae.$w;
        f.exec("scroll-chart", { left: Ae.$x - ve + we }), re.scrollLeft = Ae.$x - ve + we;
      }
    },
    [f, k]
  );
  B(() => {
    le(_);
  }, [_]);
  function xe(U) {
    if (M && (U.ctrlKey || U.metaKey)) {
      U.preventDefault();
      const ie = A.current, ne = U.clientX - (ie ? ie.getBoundingClientRect().left : 0);
      if (z.current += U.deltaY, Math.abs(z.current) >= 150) {
        const ve = -Math.sign(z.current);
        z.current = 0, f.exec("zoom-scale", {
          dir: ve,
          offset: ne
        });
      }
    }
  }
  const ue = E((U) => {
    const ie = i(U.date, U.unit);
    return ie ? {
      css: ie,
      width: U.width
    } : null;
  }, [i]), De = $(() => {
    if (!T || !i || !["hour", "day", "week"].includes(T.minUnit)) return null;
    let ie = 0;
    return T.rows[T.rows.length - 1].cells.map((ne) => {
      const re = ue(ne), ve = ie;
      return ie += ne.width, re ? { ...re, left: ve } : null;
    });
  }, [T, i, ue]), Ie = E(
    (U) => {
      U.eventSource = "chart", f.exec("hotkey", U);
    },
    [f]
  );
  B(() => {
    const U = A.current;
    if (!U) return;
    const ie = () => H(U.clientHeight);
    ie();
    const ne = new ResizeObserver(() => ie());
    return ne.observe(U), () => {
      ne.disconnect();
    };
  }, [A.current]);
  const me = Y(null);
  return B(() => {
    const U = A.current;
    if (U && !me.current)
      return me.current = Mr(U, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (ie) => Ie(ie)
      }), () => {
        me.current?.destroy(), me.current = null;
      };
  }, []), B(() => {
    const U = A.current;
    if (!U) return;
    const ie = xe;
    return U.addEventListener("wheel", ie), () => {
      U.removeEventListener("wheel", ie);
    };
  }, [xe]), B(() => {
    if (!h || D.current || !T || !A.current || !C) return;
    const U = A.current, { clientWidth: ie } = U, ne = /* @__PURE__ */ new Date(), re = T.rows[T.rows.length - 1]?.cells;
    if (!re) return;
    let ve = -1, Ae = 0;
    const we = [];
    for (let ge = 0; ge < re.length; ge++) {
      const be = re[ge];
      we.push({ left: Ae, width: be.width });
      const V = be.date;
      if (be.unit === "week") {
        const ke = new Date(V);
        ke.setUTCDate(ke.getUTCDate() + 7), ne >= V && ne < ke && (ve = ge);
      } else be.unit === "day" && ne.getUTCFullYear() === V.getUTCFullYear() && ne.getUTCMonth() === V.getUTCMonth() && ne.getUTCDate() === V.getUTCDate() && (ve = ge);
      Ae += be.width;
    }
    let ee = ve;
    if (ve > 0 && (ee = ve - 1), ee >= 0 && we[ee]) {
      const ge = we[ee], be = Math.max(0, ge.left);
      U.scrollLeft = be, f.exec("scroll-chart", { left: be }), D.current = !0;
    }
  }, [h, T, C, f]), ud("chart"), /* @__PURE__ */ Q(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: A,
      onScroll: ce,
      children: [
        /* @__PURE__ */ p(cd, { highlightTime: i, onScaleClick: a, scales: T }),
        S && S.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${Z}px` },
            children: S.map((U, ie) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${U.css || ""}`,
                style: { left: `${U.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: U.text })
              },
              ie
            ))
          }
        ) : null,
        /* @__PURE__ */ Q(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${Z}px` },
            children: [
              De ? /* @__PURE__ */ p(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: De.map(
                    (U, ie) => U ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + U.css,
                        style: {
                          width: `${U.width}px`,
                          left: `${U.left}px`
                        }
                      },
                      ie
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(nd, { borders: o }),
              w && w.length ? w.map(
                (U, ie) => U.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": U.id,
                    style: de[ie]
                  },
                  U.id
                ) : null
              ) : null,
              /* @__PURE__ */ p(
                ld,
                {
                  readonly: e,
                  taskTemplate: s,
                  multiTaskRows: l,
                  rowMapping: c,
                  marqueeSelect: d,
                  copyPaste: u,
                  allowTaskIntersection: m
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function hd(t) {
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
  } = t, [d, u] = Fe(t.value ?? 0), [h, g] = Fe(t.display ?? "all");
  function m(Z) {
    let ce = 0;
    e == "center" ? ce = n / 2 : e == "before" && (ce = n);
    const ye = {
      size: [n + "px", "auto"],
      p: [Z - ce + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let O in ye) ye[O] = ye[O].reverse();
    return ye;
  }
  const [f, w] = K(!1), [x, y] = K(null), b = Y(0), k = Y(), T = Y(), S = Y(h);
  B(() => {
    S.current = h;
  }, [h]), B(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function _(Z) {
    return r == "x" ? Z.clientX : Z.clientY;
  }
  const M = E(
    (Z) => {
      const ce = k.current + _(Z) - b.current;
      u(ce);
      let ye;
      ce <= l ? ye = "chart" : a - ce <= c ? ye = "grid" : ye = "all", S.current !== ye && (g(ye), S.current = ye), T.current && clearTimeout(T.current), T.current = setTimeout(() => s && s(ce), 100);
    },
    [a, l, c, s]
  ), G = E(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", G);
  }, [M]), C = $(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), H = E(
    (Z) => {
      !i && (h === "grid" || h === "chart") || (b.current = _(Z), k.current = d, w(!0), document.body.style.cursor = C, document.body.style.userSelect = "none", window.addEventListener("mousemove", M), window.addEventListener("mouseup", G));
    },
    [C, M, G, d, i, h]
  );
  function A() {
    g("all"), x !== null && (u(x), s && s(x));
  }
  function z(Z) {
    if (i) {
      const ce = h === "chart" ? "grid" : "chart";
      g(ce), o(ce);
    } else if (h === "grid" || h === "chart")
      A(), o("all");
    else {
      const ce = Z === "left" ? "chart" : "grid";
      g(ce), o(ce);
    }
  }
  function D() {
    z("left");
  }
  function F() {
    z("right");
  }
  const ae = $(() => m(d), [d, e, n, r]), de = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ Q(
    "div",
    {
      className: "wx-pFykzMlT " + de,
      onMouseDown: H,
      style: { width: ae.size[0], height: ae.size[1], cursor: C },
      children: [
        /* @__PURE__ */ Q("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: D
            }
          ) }),
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: F
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const gd = 650;
function Fo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= gd;
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
function pd(t) {
  const {
    taskTemplate: e,
    readonly: n,
    cellBorders: r,
    highlightTime: s,
    onScaleClick: o,
    onTableAPIChange: i,
    multiTaskRows: a = !1,
    rowMapping: l = null,
    marqueeSelect: c = !1,
    copyPaste: d = !1,
    scrollToCurrentWeek: u = !1,
    currentWeekColor: h = null,
    allowTaskIntersection: g = !0
  } = t, m = Se(wt), f = oe(m, "_tasks"), w = oe(m, "_scales"), x = oe(m, "cellHeight"), y = oe(m, "columns"), b = oe(m, "_scrollTask"), k = oe(m, "undo"), T = $(() => {
    if (!a) return l;
    const ee = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Map();
    return f.forEach((be) => {
      const V = be.row ?? be.id;
      ge.set(be.id, V), ee.has(V) || ee.set(V, []), ee.get(V).push(be.id);
    }), { rowMap: ee, taskRows: ge };
  }, [f, a, l]), [S, _] = K(!1);
  let [M, G] = K(0);
  const [C, H] = K(0), [A, z] = K(0), [D, F] = K(void 0), [ae, de] = K("all"), Z = Y(null), ce = E(
    (ee) => {
      _((ge) => (ee !== ge && (ee ? (Z.current = ae, ae === "all" && de("grid")) : (!Z.current || Z.current === "all") && de("all")), ee));
    },
    [ae]
  );
  B(() => {
    const ee = Fo(ce);
    return ee.observe(), () => {
      ee.disconnect();
    };
  }, [ce]);
  const ye = $(() => {
    let ee;
    return y.every((ge) => ge.width && !ge.flexgrow) ? ee = y.reduce((ge, be) => ge + parseInt(be.width), 0) : S && ae === "chart" ? ee = parseInt(y.find((ge) => ge.id === "action")?.width) || 50 : ee = 440, M = ee, ee;
  }, [y, S, ae]);
  B(() => {
    G(ye);
  }, [ye]);
  const O = $(
    () => (C ?? 0) - (D ?? 0),
    [C, D]
  ), le = $(() => w.width, [w]), xe = $(() => {
    if (!a || !T)
      return f.length * x;
    const ee = /* @__PURE__ */ new Set();
    return f.forEach((ge) => {
      const be = T.taskRows.get(ge.id) ?? ge.id;
      ee.add(be);
    }), ee.size * x;
  }, [f, x, a, T]), ue = $(
    () => w.height + xe + O,
    [w, xe, O]
  ), De = $(
    () => M + le,
    [M, le]
  ), Ie = Y(null), me = E(() => {
    Promise.resolve().then(() => {
      if ((C ?? 0) > (De ?? 0)) {
        const ee = (C ?? 0) - M;
        m.exec("expand-scale", { minWidth: ee });
      }
    });
  }, [C, De, M, m]);
  B(() => {
    let ee;
    return Ie.current && (ee = new ResizeObserver(me), ee.observe(Ie.current)), () => {
      ee && ee.disconnect();
    };
  }, [Ie.current, me]), B(() => {
    me();
  }, [le]);
  const U = Y(null), ie = Y(null), ne = E(() => {
    const ee = U.current;
    ee && m.exec("scroll-chart", {
      top: ee.scrollTop
    });
  }, [m]), re = Y({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  B(() => {
    re.current = {
      rTasks: f,
      rScales: w,
      rCellHeight: x,
      scrollSize: O,
      ganttDiv: U.current,
      ganttHeight: A ?? 0
    };
  }, [f, w, x, O, A]);
  const ve = E(
    (ee) => {
      if (!ee) return;
      const {
        rTasks: ge,
        rScales: be,
        rCellHeight: V,
        scrollSize: ke,
        ganttDiv: Ne,
        ganttHeight: pe
      } = re.current;
      if (!Ne) return;
      const { id: Oe } = ee, Ue = ge.findIndex((Te) => Te.id === Oe);
      if (Ue > -1) {
        const Te = pe - be.height, Ce = Ue * V, Me = Ne.scrollTop;
        let Pe = null;
        Ce < Me ? Pe = Ce : Ce + V > Me + Te && (Pe = Ce - Te + V + ke), Pe !== null && (m.exec("scroll-chart", { top: Math.max(Pe, 0) }), U.current.scrollTop = Math.max(Pe, 0));
      }
    },
    [m]
  );
  B(() => {
    ve(b);
  }, [b]), B(() => {
    const ee = U.current, ge = ie.current;
    if (!ee || !ge) return;
    const be = () => {
      jo(() => {
        z(ee.offsetHeight), H(ee.offsetWidth), F(ge.offsetWidth);
      });
    }, V = new ResizeObserver(be);
    return V.observe(ee), () => V.disconnect();
  }, [U.current]);
  const Ae = Y(null), we = Y(null);
  return B(() => {
    we.current && (we.current.destroy(), we.current = null);
    const ee = Ae.current;
    if (ee)
      return we.current = Mr(ee, {
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
          "ctrl+z": k,
          "ctrl+y": k,
          "meta+z": k,
          "meta+shift+z": k
        },
        exec: (ge) => {
          if (ge.isInput) return;
          const be = ge.key;
          if (be === "ctrl+z" || be === "meta+z") {
            m.exec("undo", {});
            return;
          }
          if (be === "ctrl+y" || be === "meta+shift+z") {
            m.exec("redo", {});
            return;
          }
          m.exec("hotkey", ge);
        }
      }), () => {
        we.current?.destroy(), we.current = null;
      };
  }, [k]), /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-gantt", ref: U, onScroll: ne, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: ue, width: "100%" },
      ref: ie,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: A,
            width: D
          },
          children: /* @__PURE__ */ Q("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Ae, children: [
            y.length ? /* @__PURE__ */ Q(He, { children: [
              /* @__PURE__ */ p(
                td,
                {
                  display: ae,
                  compactMode: S,
                  columnWidth: ye,
                  width: M,
                  readonly: n,
                  fullHeight: xe,
                  onTableAPIChange: i,
                  multiTaskRows: a,
                  rowMapping: T
                }
              ),
              /* @__PURE__ */ p(
                hd,
                {
                  value: M,
                  display: ae,
                  compactMode: S,
                  containerWidth: C,
                  onMove: (ee) => G(ee),
                  onDisplayChange: (ee) => de(ee)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: Ie, children: /* @__PURE__ */ p(
              fd,
              {
                readonly: n,
                fullWidth: le,
                fullHeight: xe,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                onScaleClick: o,
                multiTaskRows: a,
                rowMapping: T,
                marqueeSelect: c,
                copyPaste: d,
                scrollToCurrentWeek: u,
                currentWeekColor: h,
                allowTaskIntersection: g
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function md(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function wd(t, e) {
  return typeof t == "function" ? t : dt(t, e);
}
function Uo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: wd(n, e)
  }));
}
function xd(t, e) {
  const n = md(e);
  for (let r in n)
    n[r] = dt(n[r], t);
  return n;
}
function yd(t, e) {
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
function vd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Uo(n.scales, e)
    }))
  } : t;
}
const kd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), bd = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], Sd = _t(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = $o,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: a = [],
  scales: l = bd,
  columns: c = wo,
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
  onScaleClick: S = null,
  init: _ = null,
  autoScale: M = !0,
  unscheduledTasks: G = !1,
  criticalPath: C = null,
  schedule: H = { type: "forward" },
  projectStart: A = null,
  projectEnd: z = null,
  calendar: D = null,
  undo: F = !1,
  splitTasks: ae = !1,
  multiTaskRows: de = !1,
  marqueeSelect: Z = !1,
  copyPaste: ce = !1,
  currentWeekHighlight: ye = !1,
  currentWeekColor: O = null,
  scrollToCurrentWeek: le = !1,
  allowTaskIntersection: xe = !0,
  ...ue
}, De) {
  const Ie = Y();
  Ie.current = ue;
  const me = $(() => new cl(Rs), []), U = $(() => ({ ...rn, ...Rn }), []), ie = Se(Ze.i18n), ne = $(() => ie ? ie.extend(U, !0) : Dt(U), [ie, U]), re = $(() => ne.getRaw().calendar, [ne]), ve = $(() => {
    let Te = {
      zoom: vd(b, re),
      scales: Uo(l, re),
      columns: yd(c, re),
      links: po(a),
      cellWidth: m
    };
    return Te.zoom && (Te = {
      ...Te,
      ...qa(
        Te.zoom,
        xd(re, ne.getGroup("gantt")),
        Te.scales,
        m
      )
    }), Te;
  }, [b, l, c, a, m, re, ne]), Ae = Y(null);
  Ae.current !== s && (lr(s, { durationUnit: g, calendar: D }), Ae.current = s), B(() => {
    lr(s, { durationUnit: g, calendar: D });
  }, [s, g, D, ae]);
  const we = $(() => {
    if (!de) return null;
    const Te = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Map(), Me = (Pe) => {
      Pe.forEach((Ye) => {
        const L = Ye.row ?? Ye.id;
        Ce.set(Ye.id, L), Te.has(L) || Te.set(L, []), Te.get(L).push(Ye.id), Ye.data && Ye.data.length > 0 && Me(Ye.data);
      });
    };
    return Me(s), { rowMap: Te, taskRows: Ce };
  }, [s, de]), ee = $(() => me.in, [me]), ge = Y(null);
  ge.current === null && (ge.current = new zs((Te, Ce) => {
    const Me = "on" + kd(Te);
    Ie.current && Ie.current[Me] && Ie.current[Me](Ce);
  }), ee.setNext(ge.current));
  const [be, V] = K(null), ke = Y(null);
  ke.current = be;
  const Ne = $(
    () => ({
      getState: me.getState.bind(me),
      getReactiveState: me.getReactive.bind(me),
      getStores: () => ({ data: me }),
      exec: ee.exec,
      setNext: (Te) => (ge.current = ge.current.setNext(Te), ge.current),
      intercept: ee.intercept.bind(ee),
      on: ee.on.bind(ee),
      detach: ee.detach.bind(ee),
      getTask: me.getTask.bind(me),
      serialize: me.serialize.bind(me),
      getTable: (Te) => Te ? new Promise((Ce) => setTimeout(() => Ce(ke.current), 1)) : ke.current,
      getHistory: () => me.getHistory()
    }),
    [me, ee]
  );
  Tt(
    De,
    () => ({
      ...Ne
    }),
    [Ne]
  );
  const pe = Y(0);
  B(() => {
    pe.current ? me.init({
      tasks: s,
      links: ve.links,
      start: d,
      columns: ve.columns,
      end: u,
      lengthUnit: h,
      cellWidth: ve.cellWidth,
      cellHeight: f,
      scaleHeight: w,
      scales: ve.scales,
      taskTypes: r,
      zoom: ve.zoom,
      selected: o,
      activeTask: i,
      baselines: k,
      autoScale: M,
      unscheduledTasks: G,
      markers: n,
      durationUnit: g,
      criticalPath: C,
      schedule: H,
      projectStart: A,
      projectEnd: z,
      calendar: D,
      undo: F,
      _weekStart: re.weekStart,
      splitTasks: ae
    }) : _ && _(Ne), pe.current++;
  }, [
    Ne,
    _,
    s,
    ve,
    d,
    u,
    h,
    f,
    w,
    r,
    o,
    i,
    k,
    M,
    G,
    n,
    g,
    C,
    H,
    A,
    z,
    D,
    F,
    re,
    ae,
    me
  ]), pe.current === 0 && me.init({
    tasks: s,
    links: ve.links,
    start: d,
    columns: ve.columns,
    end: u,
    lengthUnit: h,
    cellWidth: ve.cellWidth,
    cellHeight: f,
    scaleHeight: w,
    scales: ve.scales,
    taskTypes: r,
    zoom: ve.zoom,
    selected: o,
    activeTask: i,
    baselines: k,
    autoScale: M,
    unscheduledTasks: G,
    markers: n,
    durationUnit: g,
    criticalPath: C,
    schedule: H,
    projectStart: A,
    projectEnd: z,
    calendar: D,
    undo: F,
    _weekStart: re.weekStart,
    splitTasks: ae
  });
  const Oe = $(() => {
    const Te = /* @__PURE__ */ new Date(), Ce = re?.weekStart ?? 0, Me = new Date(Date.UTC(Te.getUTCFullYear(), Te.getUTCMonth(), Te.getUTCDate())), Ye = (Me.getUTCDay() - Ce + 7) % 7;
    Me.setUTCDate(Me.getUTCDate() - Ye), Me.setUTCHours(0, 0, 0, 0);
    const L = new Date(Me);
    return L.setUTCDate(L.getUTCDate() + 7), (X) => X >= Me && X < L;
  }, [re]), Ue = $(() => (Te, Ce) => {
    let Me = [];
    if (D)
      Ce == "day" && !D.getDayHours(Te) && Me.push("wx-weekend"), Ce == "hour" && !D.getDayHours(Te) && Me.push("wx-weekend");
    else if (T) {
      const Pe = T(Te, Ce);
      Pe && Me.push(Pe);
    }
    return ye && (Ce === "week" || Ce === "day") && Oe(Te) && Me.push("wx-current-week"), Me.join(" ");
  }, [D, T, ye, Oe]);
  return /* @__PURE__ */ p(Ze.i18n.Provider, { value: ne, children: /* @__PURE__ */ p(wt.Provider, { value: Ne, children: /* @__PURE__ */ p(
    pd,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: Ue,
      onScaleClick: S,
      onTableAPIChange: V,
      multiTaskRows: de,
      rowMapping: we,
      marqueeSelect: Z,
      copyPaste: ce,
      scrollToCurrentWeek: le,
      currentWeekColor: O,
      allowTaskIntersection: xe
    }
  ) }) });
});
function $d({ api: t = null, items: e = [] }) {
  const n = Se(Ze.i18n), r = $(() => n || Dt(Rn), [n]), s = $(() => r.getGroup("gantt"), [r]), o = ct(t, "_selected"), i = ct(t, "undo"), a = ct(t, "history"), l = ct(t, "splitTasks"), c = ["undo", "redo"], d = $(() => {
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
  return n ? /* @__PURE__ */ p(fr, { items: u }) : /* @__PURE__ */ p(Ze.i18n.Provider, { value: r, children: /* @__PURE__ */ p(fr, { items: u }) });
}
const Cd = _t(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: a,
  css: l
}, c) {
  const d = Y(null), u = Y(null), h = Se(Ze.i18n), g = $(() => h || Dt({ ...Rn, ...rn }), [h]), m = $(() => g.getGroup("gantt"), [g]), f = ct(n, "taskTypes"), w = ct(n, "selected"), x = ct(n, "_selected"), y = ct(n, "splitTasks"), b = $(() => cr(), []);
  B(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function k(z) {
    return z.map((D) => (D = { ...D }, D.text && (D.text = m(D.text)), D.subtext && (D.subtext = m(D.subtext)), D.data && (D.data = k(D.data)), D));
  }
  function T() {
    const z = e.length ? e : cr(), D = z.find((F) => F.id === "convert-task");
    return D && (D.data = [], (f || []).forEach((F) => {
      D.data.push(D.dataFactory(F));
    })), k(z);
  }
  const S = $(() => T(), [n, e, f, y, m]), _ = $(
    () => x && x.length ? x : [],
    [x]
  ), M = E(
    (z, D) => {
      let F = z ? n?.getTask(z) : null;
      if (r) {
        const ae = r(z, D);
        F = ae === !0 ? F : ae;
      }
      if (F) {
        const ae = bt(D.target, "data-segment");
        ae !== null ? u.current = { id: F.id, segmentIndex: ae } : u.current = F.id, (!Array.isArray(w) || !w.includes(F.id)) && n && n.exec && n.exec("select-task", { id: F.id });
      }
      return F;
    },
    [n, r, w]
  ), G = E(
    (z) => {
      const D = z.action;
      D && (Dr(b, D.id) && At(n, D.id, u.current, m), a && a(z));
    },
    [n, m, a, b]
  ), C = E(
    (z, D) => {
      const F = _.length ? _ : D ? [D] : [];
      let ae = s ? F.every((de) => s(z, de)) : !0;
      if (ae && (z.isHidden && (ae = !F.some(
        (de) => z.isHidden(de, n.getState(), u.current)
      )), z.isDisabled)) {
        const de = F.some(
          (Z) => z.isDisabled(Z, n.getState(), u.current)
        );
        z.disabled = de;
      }
      return ae;
    },
    [s, _, n]
  );
  Tt(c, () => ({
    show: (z, D) => {
      d.current && d.current.show && d.current.show(z, D);
    }
  }));
  const H = E((z) => {
    d.current && d.current.show && d.current.show(z);
  }, []), A = /* @__PURE__ */ Q(He, { children: [
    /* @__PURE__ */ p(
      Ao,
      {
        filter: C,
        options: S,
        dataKey: "id",
        resolver: M,
        onClick: G,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: H, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && Ze.i18n?.Provider) {
    const z = Ze.i18n.Provider;
    return /* @__PURE__ */ p(z, { value: g, children: A });
  }
  return A;
}), gr = {};
function Cs(t) {
  return typeof t < "u" ? gr[t] || t : gr.text;
}
function tt(t, e) {
  gr[t] = e;
}
const _d = {
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
  } = t, c = Y(null);
  B(() => {
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
  const d = Se(Ze.i18n), u = $(() => d.getGroup("editor"), [d]), h = $(
    () => e.config[0].comp === "readonly" && e.config.every((g) => !Object.keys(n).includes(g.key)),
    [e, n]
  );
  return /* @__PURE__ */ Q("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
    a,
    h ? /* @__PURE__ */ p("div", { className: "wx-s2aE1xdZ wx-overlay", children: u("No data") }) : null,
    e.config.map((g) => {
      if (!g.hidden) {
        const { key: m, onChange: f, ...w } = g;
        if (g.comp === "readonly" || g.comp === "section") {
          const x = Cs(g.comp);
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
          const x = Cs(g.comp);
          return /* @__PURE__ */ Q("div", { children: [
            /* @__PURE__ */ p(
              Jt,
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
function Td(t) {
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
function Dd(t) {
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
function Nd(t) {
  const e = t.map((i) => {
    const a = { ...i };
    return i.config && Object.assign(a, i.config), a.key = i.key || ji(), a.setter = i.setter || Dd(i.key), a.getter = i.getter || Td(i.key), a;
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
function Md({
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
  const y = Se(Ze.i18n).getGroup("editor"), [b, k] = Fe(t), [T, S] = K(null), _ = $(() => {
    const O = Nd(e);
    T && O.config.forEach((ue) => {
      ue.comp === "section" && ue.key === T && (ue.sectionMode === "accordion" ? ue.activeSection || (O.config.forEach((De) => {
        De.comp === "section" && De.key !== ue.key && (De.activeSection = !1);
      }), ue.activeSection = !0) : ue.activeSection = !ue.activeSection);
    });
    let le = /* @__PURE__ */ new Set(), xe = null;
    return O.config.forEach((ue) => {
      ue.sectionMode === "exclusive" && ue.activeSection && (xe = ue.key), ue.activeSection && le.add(ue.key);
    }), O.config.forEach((ue) => {
      ue.hidden = ue.hidden || r && r !== ue.batch || xe && ue.key != xe && ue.section !== xe || ue.section && !le.has(ue.section);
    }), i ? {
      ...O,
      config: O.config.map((ue) => ({ ...ue, comp: "readonly" })),
      diff: () => []
    } : O;
  }, [e, T, r, i]), [M, G] = K({}), [C, H] = K({}), A = b;
  B(() => {
    b !== void 0 && (G($n(b)), H($n(b)), A.errors && (A.errors = ae()));
  }, [b]);
  const [z, D] = K([]);
  B(() => {
    b && D([]);
  }, [b]);
  function F(O) {
    return [...new Set(O)];
  }
  function ae(O) {
    const le = _.validateValues(M, O, y);
    return An(le, A.errors) || w && w({ errors: le, values: M }), le;
  }
  function de(O, le) {
    if (s && !A.errors) {
      const xe = _.setValues(b, le ?? C, O);
      k(xe), m && m({ changes: O, values: xe });
    } else
      D(O);
  }
  function Z({ value: O, key: le, input: xe }) {
    let ue = { ...C || {}, [le]: O };
    const De = {
      key: le,
      value: O,
      update: ue
    };
    if (xe && (De.input = xe), g && g(De), !b) return;
    ue = De.update, H(ue);
    const Ie = _.diff(b, ue), me = _.setValues(
      { ...M || {} },
      ue,
      F([...Ie, le])
    );
    if (G(me), Ie.length) {
      const U = s ? [] : F([...Ie, ...Object.keys(A.errors ?? {}), le]);
      A.errors = ae(U), de(Ie, ue);
    } else {
      const U = Object.keys(A.errors ?? {});
      U.length && (A.errors = ae(U)), D([]);
    }
  }
  function ce() {
    if (z.length && (s || (A.errors = ae()), !A.errors)) {
      m && m({
        changes: z,
        values: M
      });
      const O = _.setValues(b, C, z);
      k(O), D([]), k({ ...M });
    }
  }
  function ye({ item: O }) {
    O.id === "save" ? ce() : O.id === "toggle-section" && S(O.key), f && f({ item: O, values: M, changes: z });
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
      data: C,
      editors: _,
      focus: o,
      hotkeys: x,
      errors: A.errors,
      onClick: ye,
      onKeyDown: ye,
      onChange: Z,
      children: h
    }
  );
}
function Ed(t) {
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
  return r === "columns" ? /* @__PURE__ */ Q("div", { className: "wx-bNrSbszs wx-cols", children: [
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
function _s({
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
const qt = () => ({ comp: "spacer" }), Qn = (t) => ({
  comp: "button",
  text: t("Cancel"),
  id: "cancel"
}), Zn = (t) => ({
  type: "primary",
  comp: "button",
  text: t("Save"),
  id: "save"
}), Ts = () => ({
  comp: "icon",
  icon: "wxi-close",
  id: "close"
});
function Jn(t) {
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
  } = t, x = Se(Ze.i18n), y = $(() => x.getGroup("editor"), [x]), b = $(
    () => o === !0 && i === !0,
    [o, i]
  ), k = $(() => {
    let C = o && o.items ? o.items.map((H) => ({ ...H })) : [];
    return b && (d ? C = [qt(), Ts()] : (u ? C = [qt(), Ts()] : l !== "modal" && (C = [qt(), Qn(y), Zn(y)]), a === "columns" && !C.length && (C = [qt(), Zn(y), Qn(y)]))), C;
  }, [o, b, d, u, l, a, y]), T = $(() => {
    let C = i && i.items ? i.items.map((H) => ({ ...H })) : [];
    return b && (d || (l === "modal" && !u && (C = [qt(), Zn(y), Qn(y)]), a === "columns" && k.length && (C = []))), C;
  }, [i, b, d, l, u, a, k, y]), S = $(() => [...k, ...T], [k, T]), _ = Y(null), M = Y(null);
  M.current = (C, ...H) => {
    const A = S.findIndex((F) => H.includes(F.id));
    if (A === -1) return !1;
    const z = C.target, D = S[A];
    C.key == "Escape" && (z.closest(".wx-combo") || z.closest(".wx-multicombo") || z.closest(".wx-richselect")) || C.key == "Delete" && (z.tagName === "INPUT" || z.tagName === "TEXTAREA") || (C.preventDefault(), m && m({ item: D }));
  };
  const G = $(() => w === !1 ? {} : {
    "ctrl+s": (C) => M.current(C, "save"),
    escape: (C) => M.current(C, "cancel", "close"),
    "ctrl+d": (C) => M.current(C, "delete"),
    ...w || {}
  }, [w]);
  return di(G, _), /* @__PURE__ */ Q("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: _, children: [
    /* @__PURE__ */ p(
      _s,
      {
        ...o && typeof o == "object" ? o : {},
        items: k,
        values: e,
        onClick: g,
        onChange: f
      }
    ),
    /* @__PURE__ */ Q(
      "div",
      {
        className: `wx-85HDaNoA wx-content${a === "columns" ? " wx-layout-columns" : ""}`,
        children: [
          h,
          /* @__PURE__ */ p(
            Ed,
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
            _s,
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
function Id(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ p(Yi, { children: /* @__PURE__ */ p(
    Jn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ p(Vi, { onCancel: o, children: /* @__PURE__ */ p(
    Jn,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : /* @__PURE__ */ p(
    Jn,
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
  return /* @__PURE__ */ p(In, { words: _d, optional: !0, children: /* @__PURE__ */ p(
    Md,
    {
      view: Id,
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
function Ad({ value: t, options: e, label: n }) {
  const r = Se(Ze.i18n).getGroup("editor"), s = $(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(Jt, { label: n, children: s }) : null;
}
function Hd({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ Q(
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
tt("textarea", wi);
tt("checkbox", xi);
tt("readonly", Ad);
tt("section", Hd);
pr(Qe);
function Ld({ api: t, autoSave: e, onLinksChange: n }) {
  const s = Se(Ze.i18n).getGroup("gantt"), o = oe(t, "activeTask"), i = oe(t, "_activeTask"), a = oe(t, "_links"), l = oe(t, "schedule"), c = oe(t, "unscheduledTasks"), [d, u] = K();
  function h() {
    if (o) {
      const w = a.filter((y) => y.target == o).map((y) => ({ link: y, task: t.getTask(y.source) })), x = a.filter((y) => y.source == o).map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s("Predecessors"), data: w },
        { title: s("Successors"), data: x }
      ];
    }
  }
  B(() => {
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
  return /* @__PURE__ */ p(He, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(Jt, { label: w.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: w.data.map((y) => /* @__PURE__ */ Q("tr", { children: [
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
        vi,
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
function Od(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, a = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setUTCHours(e.getUTCHours()), d.setUTCMinutes(e.getUTCMinutes()), a && a({ value: d });
  }
  return /* @__PURE__ */ Q("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ p(
      Li,
      {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ p(Ui, { value: e, onChange: a, format: r }) : null
  ] });
}
tt("select", Ls);
tt("date", Od);
tt("twostate", Os);
tt("slider", nr);
tt("counter", Oi);
tt("links", Ld);
function Pd({
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
  const u = Se(Ze.i18n), h = $(() => u || Dt({ ...Rn, ...rn }), [u]), g = $(() => h.getGroup("gantt"), [h]), m = h.getRaw(), f = $(() => {
    const V = m.gantt?.dateFormat || m.formats?.dateFormat;
    return dt(V, m.calendar);
  }, [m]), w = $(() => {
    if (a === !0 && !s) {
      const V = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: g("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: V } : {
        items: [
          ...V,
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
  }, [a, s, l, g]), [x, y] = K(!1), b = $(
    () => x ? "wx-full-screen" : "",
    [x]
  ), k = E((V) => {
    y(V);
  }, []);
  B(() => {
    const V = Fo(k);
    return V.observe(), () => {
      V.disconnect();
    };
  }, [k]);
  const T = oe(t, "_activeTask"), S = oe(t, "activeTask"), _ = oe(t, "unscheduledTasks"), M = oe(t, "links"), G = oe(t, "splitTasks"), C = $(
    () => G && S?.segmentIndex,
    [G, S]
  ), H = $(
    () => C || C === 0,
    [C]
  ), A = $(
    () => bo(),
    [_]
  ), z = oe(t, "undo"), [D, F] = K({}), [ae, de] = K(null), [Z, ce] = K(), [ye, O] = K(null), le = oe(t, "taskTypes"), xe = $(() => {
    if (!T) return null;
    let V;
    if (H && T.segments ? V = { ...T.segments[C] } : V = { ...T }, s) {
      let ke = { parent: V.parent };
      return A.forEach(({ key: Ne, comp: pe }) => {
        if (pe !== "links") {
          const Oe = V[Ne];
          pe === "date" && Oe instanceof Date ? ke[Ne] = f(Oe) : pe === "slider" && Ne === "progress" ? ke[Ne] = `${Oe}%` : ke[Ne] = Oe;
        }
      }), ke;
    }
    return V || null;
  }, [T, H, C, s, A, f]);
  B(() => {
    ce(xe);
  }, [xe]), B(() => {
    F({}), O(null), de(null);
  }, [S]);
  function ue(V, ke) {
    return V.map((Ne) => {
      const pe = { ...Ne };
      if (Ne.config && (pe.config = { ...pe.config }), pe.comp === "links" && t && (pe.api = t, pe.autoSave = l, pe.onLinksChange = me), pe.comp === "select" && pe.key === "type") {
        const Oe = pe.options ?? (le || []);
        pe.options = Oe.map((Ue) => ({
          ...Ue,
          label: g(Ue.label)
        }));
      }
      return pe.comp === "slider" && pe.key === "progress" && (pe.labelTemplate = (Oe) => `${g(pe.label)} ${Oe}%`), pe.label && (pe.label = g(pe.label)), pe.config?.placeholder && (pe.config.placeholder = g(pe.config.placeholder)), ke && (pe.isDisabled && pe.isDisabled(ke, t.getState()) ? pe.disabled = !0 : delete pe.disabled), pe;
    });
  }
  const De = $(() => {
    let V = e.length ? e : A;
    return V = ue(V, Z), Z ? V.filter(
      (ke) => !ke.isHidden || !ke.isHidden(Z, t.getState())
    ) : V;
  }, [e, A, Z, le, g, t, l]), Ie = $(
    () => De.map((V) => V.key),
    [De]
  );
  function me({ id: V, action: ke, data: Ne }) {
    F((pe) => ({
      ...pe,
      [V]: { action: ke, data: Ne }
    }));
  }
  const U = E(() => {
    for (let V in D)
      if (M.byId(V)) {
        const { action: ke, data: Ne } = D[V];
        t.exec(ke, Ne);
      }
  }, [t, D, M]), ie = E(() => {
    const V = S?.id || S;
    if (H) {
      if (T?.segments) {
        const ke = T.segments.filter(
          (Ne, pe) => pe !== C
        );
        t.exec("update-task", {
          id: V,
          task: { segments: ke }
        });
      }
    } else
      t.exec("delete-task", { id: V });
  }, [t, S, H, T, C]), ne = E(() => {
    t.exec("show-editor", { id: null });
  }, [t]), re = E(
    (V) => {
      const { item: ke, changes: Ne } = V;
      ke.id === "delete" && ie(), ke.id === "save" && (Ne.length ? ne() : U()), ke.comp && ne();
    },
    [t, S, l, U, ie, ne]
  ), ve = E(
    (V, ke, Ne) => (_ && V.type === "summary" && (V.unscheduled = !1), yo(V, t.getState(), ke), Ne || de(!1), V),
    [_, t]
  ), Ae = E(
    (V) => {
      V = {
        ...V,
        unscheduled: _ && V.unscheduled && V.type !== "summary"
      }, delete V.links, delete V.data, (Ie.indexOf("duration") === -1 || V.segments && !V.duration) && delete V.duration;
      const ke = {
        id: S?.id || S,
        task: V,
        ...H && { segmentIndex: C }
      };
      l && ae && (ke.inProgress = ae), t.exec("update-task", ke), l || U();
    },
    [
      t,
      S,
      _,
      l,
      U,
      Ie,
      H,
      C,
      ae
    ]
  ), we = E(
    (V) => {
      let { update: ke, key: Ne, input: pe } = V;
      if (pe && de(!0), V.update = ve({ ...ke }, Ne, pe), !l) ce(V.update);
      else if (!ye && !pe) {
        const Oe = De.find((Ce) => Ce.key === Ne), Ue = ke[Ne];
        (!Oe.validation || Oe.validation(Ue)) && (!Oe.required || Ue) && Ae(V.update);
      }
    },
    [l, ve, ye, De, Ae]
  ), ee = E(
    (V) => {
      l || Ae(V.values);
    },
    [l, Ae]
  ), ge = E((V) => {
    O(V.errors);
  }, []), be = $(
    () => z ? {
      "ctrl+z": (V) => {
        V.preventDefault(), t.exec("undo");
      },
      "ctrl+y": (V) => {
        V.preventDefault(), t.exec("redo");
      }
    } : {},
    [z, t]
  );
  return xe ? /* @__PURE__ */ p(In, { children: /* @__PURE__ */ p(
    Rd,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${b} ${n}`,
      items: De,
      values: xe,
      topBar: w,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: re,
      onSave: ee,
      onValidation: ge,
      onChange: we,
      hotkeys: d && { ...be, ...d }
    }
  ) }) : null;
}
const Wd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = K(null);
  return B(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(Jc, { api: r, columns: e, children: t });
};
function zd(t) {
  const { api: e, content: n, children: r } = t, s = Y(null), o = Y(null), [i, a] = K({}), [l, c] = K(null), [d, u] = K({});
  function h(k) {
    for (; k; ) {
      if (k.getAttribute) {
        const T = k.getAttribute("data-tooltip-id"), S = k.getAttribute("data-tooltip-at"), _ = k.getAttribute("data-tooltip");
        if (T || _) return { id: T, tooltip: _, target: k, at: S };
      }
      k = k.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  B(() => {
    const k = o.current;
    if (k && d && (d.text || n)) {
      const T = k.getBoundingClientRect();
      let S = !1, _ = d.left, M = d.top;
      T.right >= i.right && (_ = i.width - T.width - 5, S = !0), T.bottom >= i.bottom && (M = d.top - (T.bottom - i.bottom + 2), S = !0), S && u((G) => G && { ...G, left: _, top: M });
    }
  }, [d, i, n]);
  const g = Y(null), m = 300, f = (k) => {
    clearTimeout(g.current), g.current = setTimeout(() => {
      k();
    }, m);
  };
  function w(k) {
    let { id: T, tooltip: S, target: _, at: M } = h(k.target);
    if (u(null), c(null), !S)
      if (T)
        S = y(T);
      else {
        clearTimeout(g.current);
        return;
      }
    const G = k.clientX;
    f(() => {
      T && c(x(b(T)));
      const C = _.getBoundingClientRect(), H = s.current, A = H ? H.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let z, D;
      M === "left" ? (z = C.top + 5 - A.top, D = C.right + 5 - A.left) : (z = C.top + C.height - A.top, D = G - A.left), a(A), u({ top: z, left: D, text: S });
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
  return /* @__PURE__ */ Q(
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
function Fd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(jr, { fonts: t, children: e() }) : /* @__PURE__ */ p(jr, { fonts: t });
}
function Ud({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(qr, { fonts: t, children: e }) : /* @__PURE__ */ p(qr, { fonts: t });
}
function Yd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Xr, { fonts: t, children: e }) : /* @__PURE__ */ p(Xr, { fonts: t });
}
const ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: Cd,
  Editor: Pd,
  Gantt: Sd,
  HeaderMenu: Wd,
  Material: Fd,
  Toolbar: $d,
  Tooltip: zd,
  Willow: Ud,
  WillowDark: Yd,
  defaultColumns: wo,
  defaultEditorItems: So,
  defaultMenuOptions: vo,
  defaultTaskTypes: $o,
  defaultToolbarButtons: ko,
  getEditorItems: bo,
  getMenuOptions: cr,
  getToolbarButtons: dr,
  registerEditorItem: tt,
  registerScaleUnit: Ga
}, Symbol.toStringTag, { value: "Module" }));
export {
  ru as default
};
