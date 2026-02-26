import { jsx as p, jsxs as te, Fragment as Oe } from "react/jsx-runtime";
import Bo, { useState as j, useEffect as G, useRef as F, createContext as Wt, useContext as _e, useMemo as $, useCallback as I, forwardRef as Dt, useImperativeHandle as Mt, useId as Ko, Fragment as Ds } from "react";
import { createPortal as jo, flushSync as qo } from "react-dom";
function qe(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e))
      return n;
    n = n.parentNode;
  }
  return null;
}
function tr(t, e = "data-id") {
  const n = qe(t, e);
  return n ? n.getAttribute(e) : null;
}
function Ct(t, e = "data-id") {
  const n = qe(t, e);
  return n ? zt(n.getAttribute(e)) : null;
}
function zt(t) {
  if (typeof t == "string") {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Xo() {
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
var Je = Xo();
function mr(t) {
  Object.assign(Je, t);
}
function Lr(t, e, n) {
  function r(s) {
    const o = qe(s);
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
  Lr(t, e, "click"), e.dblclick && Lr(t, e.dblclick, "dblclick");
}
function Qo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var Es = /* @__PURE__ */ new Date(), $n = !1, gn = [], _t = [], Or = (t) => {
  if ($n) {
    $n = !1;
    return;
  }
  for (let e = _t.length - 1; e >= 0; e--) {
    const { node: n, date: r, props: s } = _t[e];
    if (!(r > Es) && !n.contains(t.target) && n !== t.target && (s.callback && s.callback(t), s.modal || t.defaultPrevented))
      break;
  }
}, Zo = (t) => {
  Es = /* @__PURE__ */ new Date(), $n = !0;
  for (let e = _t.length - 1; e >= 0; e--) {
    const { node: n } = _t[e];
    if (!n.contains(t.target) && n !== t.target) {
      $n = !1;
      break;
    }
  }
};
function rn(t, e) {
  gn.length || (gn = [
    Je.addGlobalEvent("click", Or, t),
    Je.addGlobalEvent("contextmenu", Or, t),
    Je.addGlobalEvent("mousedown", Zo, t)
  ]), typeof e != "object" && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return _t.push(n), {
    destroy() {
      Qo(_t, n), _t.length || (gn.forEach((r) => r()), gn = []);
    }
  };
}
var pn = (t) => t.indexOf("bottom") !== -1, mn = (t) => t.indexOf("left") !== -1, wn = (t) => t.indexOf("right") !== -1, Un = (t) => t.indexOf("top") !== -1, Pr = (t) => t.indexOf("fit") !== -1, xn = (t) => t.indexOf("overlap") !== -1, Jo = (t) => t.split("-").every((e) => ["center", "fit"].indexOf(e) > -1), ei = (t) => {
  const e = t.match(/(start|center|end)/);
  return e ? e[0] : null;
};
function ti(t, e) {
  let n = 0;
  const r = Je.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if ((s === "absolute" || s === "relative" || s === "fixed") && (n = parseInt(getComputedStyle(t).zIndex) || 0), t = t.parentNode, t === e) break;
  }
  return n;
}
var Ke, Qe, jt, je;
function ni(t, e, n = "bottom", r = 0, s = 0) {
  if (!t) return null;
  Ke = r, Qe = s, jt = "auto";
  let o = 0, i = 0;
  const a = ri(t), l = xn(n) ? Je.getTopNode(t) : a;
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
    const b = ti(e, a);
    o = Math.max(b + 1, 20);
  }
  if (e) {
    if (je = e.getBoundingClientRect(), Pr(n) && (jt = je.width + "px"), n !== "point")
      if (Jo(n))
        Pr(n) ? Ke = 0 : (Ke = u.width / 2, i = 1), Qe = (u.height - d.height) / 2;
      else {
        const b = xn(n) ? 0 : 1;
        Ke = wn(n) ? je.right + b : je.left - b, Qe = pn(n) ? je.bottom + 1 : je.top;
        const k = ei(n);
        k && (wn(n) || mn(n) ? k === "center" ? Qe -= (d.height - je.height) / 2 : k === "end" && (Qe -= d.height - je.height) : (pn(n) || Un(n)) && (k === "center" ? Ke -= (d.width - je.width) / 2 : k === "end" && (Ke -= d.width - je.width), xn(n) || (Ke += 1)));
      }
  } else je = { left: r, right: r, top: s, bottom: s };
  const m = (mn(n) || wn(n)) && (pn(n) || Un(n));
  mn(n) && (i = 2);
  const f = Ke - d.width - u.left;
  e && mn(n) && !m && f < 0 && (Ke = je.right, i = 0);
  const w = Ke + d.width * (1 - i / 2) - u.right;
  if (w > 0)
    if (!wn(n))
      Ke = u.right - g.right - d.width;
    else {
      const b = je.left - u.x - d.width;
      e && !xn(n) && !m && b >= 0 ? Ke = je.left - d.width : Ke -= w + g.right;
    }
  i && (Ke = Math.round(Ke - d.width * i / 2));
  const x = f < 0 || w > 0 || !m;
  Un(n) && (Qe = je.top - d.height, e && Qe < u.y && x && (Qe = je.bottom));
  const y = Qe + d.height - u.bottom;
  return y > 0 && (e && pn(n) && x ? Qe -= d.height + je.height + 1 : Qe -= y + g.bottom), Ke -= c.left + g.left, Qe -= c.top + g.top, Ke = Math.max(Ke, 0) + l.scrollLeft, Qe = Math.max(Qe, 0) + l.scrollTop, jt = jt || "auto", { x: Ke, y: Qe, z: o, width: jt };
}
function ri(t) {
  const e = Je.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === "relative" || n === "absolute" || n === "fixed")
      return t;
    t = t.parentNode;
  }
  return null;
}
var Wr = (/* @__PURE__ */ new Date()).valueOf();
function wr() {
  return Wr += 1, Wr;
}
var si = class {
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
}, Lt = [], zr = {
  subscribe: (t) => {
    oi();
    const e = new si();
    return Lt.push(e), t(e), () => {
      const n = Lt.findIndex((r) => r === e);
      n >= 0 && Lt.splice(n, 1);
    };
  }
}, Fr = !1;
function oi() {
  Fr || (Fr = !0, document.addEventListener("keydown", (t) => {
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
function Ze(t) {
  return t < 10 ? "0" + t : t.toString();
}
function ii(t) {
  const e = Ze(t);
  return e.length == 2 ? "0" + e : e;
}
function Is(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11
  };
}
function Ur(t, e = 1) {
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
function ai(t, e, n) {
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
      return ((e.getHours() > 11 ? n.pm : n.am) || Yr)[0];
    case "%A":
      return ((e.getHours() > 11 ? n.pm : n.am) || Yr)[1];
    case "%s":
      return Ze(e.getSeconds());
    case "%S":
      return ii(e.getMilliseconds());
    case "%W":
      return Ze(Ur(e));
    case "%w":
      return Ze(Ur(e, n.weekStart ?? 1));
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
var li = /%[a-zA-Z]/g;
function ct(t, e) {
  return typeof t == "function" ? t : function(n) {
    return n ? (n.getMonth || (n = new Date(n)), t.replace(
      li,
      (r) => ai(r, n, e)
    )) : "";
  };
}
function Vr(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function nr(t, e) {
  for (const n in e) {
    const r = e[n];
    Vr(t[n]) && Vr(r) ? t[n] = nr(
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
      return n ? r = nr({ ...e }, t) : r = nr({ ...t }, e), Et(r);
    }
  };
}
function Ue(t) {
  const [e, n] = j(t), r = F(t);
  return G(() => {
    if (r.current !== t) {
      if (Array.isArray(r.current) && Array.isArray(t) && r.current.length === 0 && t.length === 0)
        return;
      r.current = t, n(t);
    }
  }, [t]), [e, n];
}
function ci(t, e, n) {
  const [r, s] = j(() => e);
  return t || console.warn(`Writable ${n} is not defined`), G(() => t ? t.subscribe((i) => {
    s(() => i);
  }) : void 0, [t]), r;
}
function oe(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return ci(r[e], n[e], e);
}
function lt(t, e) {
  const [n, r] = j(() => null);
  return G(() => {
    if (!t) return;
    const s = t.getReactiveState(), o = s ? s[e] : null;
    return o ? o.subscribe((a) => r(() => a)) : void 0;
  }, [t, e]), n;
}
function di(t, e) {
  const n = F(e);
  n.current = e;
  const [r, s] = j(1);
  return G(() => t.subscribe((i) => {
    n.current = i, s((a) => a + 1);
  }), [t]), [n.current, r];
}
function Zt(t, e) {
  const n = t.getState(), r = t.getReactiveState();
  return di(r[e], n[e]);
}
function ui(t, e) {
  G(() => {
    const n = e.current;
    if (n)
      return zr.subscribe((r) => {
        r.configure(t, n);
      });
  }, [zr, e]);
}
function xr(t, e) {
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
function Gr(t, e, n) {
  function r(s) {
    const o = qe(s);
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
function fi(t, e) {
  const n = [Gr(t, e, "click")];
  return e.dblclick && n.push(Gr(t, e.dblclick, "dblclick")), () => {
    n.forEach((r) => r());
  };
}
const hi = "en-US", gi = {
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
}, pi = {
  ok: "OK",
  cancel: "Cancel",
  select: "Select",
  "No data": "No data",
  "Rows per page": "Rows per page",
  "Total pages": "Total pages"
}, mi = {
  timeFormat: "%H:%i",
  dateFormat: "%m/%d/%Y",
  monthYearFormat: "%F %Y",
  yearFormat: "%Y"
}, sn = {
  core: pi,
  calendar: gi,
  formats: mi,
  lang: hi
}, on = Wt("willow"), wi = Wt({}), st = Wt(null), yr = Wt(null), et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fieldId: yr,
  helpers: wi,
  i18n: st,
  theme: on
}, Symbol.toStringTag, { value: "Module" }));
function Ft(t) {
  const e = _e(yr);
  return t || e;
}
function xi({
  value: t = "",
  id: e,
  placeholder: n = "",
  title: r = "",
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: a
}) {
  const l = Ft(e), [c, d] = Ue(t), u = I(
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
function dt({
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
  return /* @__PURE__ */ te(
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
function yi({
  id: t,
  label: e = "",
  inputValue: n = "",
  value: r = !1,
  onChange: s,
  disabled: o = !1
}) {
  const i = Ko(), a = Ft(t) || i, [l, c] = Ue(r);
  return /* @__PURE__ */ te("div", { className: "wx-2IvefP wx-checkbox", children: [
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
    /* @__PURE__ */ te("label", { htmlFor: a, className: "wx-2IvefP wx-label", children: [
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
  const i = F(null), [a, l] = Ue(t), [c, d] = Ue(e);
  return G(() => {
    if (n) {
      const u = i.current;
      if (u) {
        const h = u.getBoundingClientRect(), g = Je.getTopNode(u).getBoundingClientRect();
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
function an() {
  return Et(sn);
}
function vi() {
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
    const u = Ct(d), h = r.findIndex((g) => g.id == u);
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
function In({
  items: t = [],
  children: e,
  onSelect: n,
  onReady: r
}) {
  const s = F(), o = F(vi()), [i, a] = j(null), l = F(i), c = (_e(st) || an()).getGroup("core"), d = (h) => {
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
          children: e ? xr(e, { option: h }) : h.label
        },
        h.id
      )) : /* @__PURE__ */ p("div", { className: "wx-233fr7 wx-no-data", children: c("No data") })
    }
  ) });
}
function ki({
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
  const h = Ft(e), g = F(null), m = F(null), [f, w] = Ue(t), [x, y] = j(!1), [b, k] = j(""), N = F(null), S = F(!1), C = $(() => {
    if (x) return b;
    if (f || f === 0) {
      const se = (r || n).find((ce) => ce.id === f);
      if (se) return se[s];
    }
    return "";
  }, [x, b, f, r, n, s]), A = $(() => !C || !x ? n : n.filter(
    (se) => se[s].toLowerCase().includes(C.toLowerCase())
  ), [C, x, n, s]), V = I(
    () => A.findIndex((se) => se.id === f),
    [A, f]
  ), _ = I((se) => {
    g.current = se.navigate, m.current = se.keydown;
  }, []), E = I(
    (se, ce) => {
      if (se || se === 0) {
        let $e = n.find((O) => O.id === se);
        if (y(!1), ce && g.current(null), $e && f !== $e.id) {
          const O = $e.id;
          w(O), u && u({ value: O });
        }
      }
      !S.current && ce && N.current.focus();
    },
    [n, f, u]
  ), W = I(
    ({ id: se }) => {
      E(se, !0);
    },
    [E]
  ), H = I(
    (se) => {
      se && se.stopPropagation(), w(""), y(!1), u && u({ value: "" });
    },
    [u]
  ), M = I(
    (se) => {
      if (!n.length) return;
      if (se === "" && c) {
        H();
        return;
      }
      let ce = n.find((O) => O[s] === se);
      ce || (ce = n.find(
        (O) => O[s].toLowerCase().includes(se.toLowerCase())
      ));
      const $e = ce ? ce.id : f || n[0].id;
      E($e, !1);
    },
    [n, s, c, f, E, H]
  ), q = I(() => {
    k(N.current.value), y(!0), A.length ? g.current(0) : g.current(null);
  }, [A.length, g]), le = I(() => {
    S.current = !0;
  }, []), X = I(() => {
    S.current = !1, setTimeout(() => {
      S.current || M(C);
    }, 200);
  }, [M, C]);
  return /* @__PURE__ */ te(
    "div",
    {
      className: "wx-1j11Jk wx-combo",
      onClick: () => g.current(V()),
      onKeyDown: (se) => m.current(se, V()),
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
            onFocus: le,
            onBlur: X,
            onInput: q
          }
        ),
        c && !a && f ? /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-close", onClick: H }) : /* @__PURE__ */ p("i", { className: "wx-1j11Jk wx-icon wxi-angle-down" }),
        !a && /* @__PURE__ */ p(In, { items: A, onReady: _, onSelect: W, children: ({ option: se }) => /* @__PURE__ */ p(Oe, { children: d ? d({ option: se }) : se[s] }) })
      ]
    }
  );
}
function ln({
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
  const f = Ft(e), [w, x] = Ue(t), y = F(null), b = $(
    () => h && u.indexOf("wx-icon-left") === -1 ? "wx-icon-right " + u : u,
    [h, u]
  ), k = $(
    () => h && u.indexOf("wx-icon-left") !== -1,
    [h, u]
  );
  G(() => {
    const V = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(V);
  }, [r, s]);
  const N = I(
    (V) => {
      const _ = V.target.value;
      x(_), m && m({ value: _, input: !0 });
    },
    [m]
  ), S = I(
    (V) => m && m({ value: V.target.value }),
    [m]
  );
  function C(V) {
    V.stopPropagation(), x(""), m && m({ value: "" });
  }
  let A = o;
  return o !== "password" && o !== "number" && (A = "text"), G(() => {
    const V = S, _ = y.current;
    return _.addEventListener("change", V), () => {
      _ && _.removeEventListener("change", V);
    };
  }, [S]), /* @__PURE__ */ te(
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
            type: A,
            style: c,
            title: d,
            value: w,
            onInput: N
          }
        ),
        g && !a && w ? /* @__PURE__ */ te(Oe, { children: [
          /* @__PURE__ */ p("i", { className: "wx-hQ64J4 wx-icon wxi-close", onClick: C }),
          k && /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` })
        ] }) : h ? /* @__PURE__ */ p("i", { className: `wx-hQ64J4 wx-icon ${h}` }) : null
      ]
    }
  );
}
function bi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = _e(st).getRaw(), i = t.getFullYear(), a = $(() => {
    switch (e) {
      case "month":
        return ct(o.monthYearFormat, s)(t);
      case "year":
        return ct(o.yearFormat, s)(t);
      case "duodecade": {
        const { start: c, end: d } = Is(i), u = ct(o.yearFormat, s);
        return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
      }
      default:
        return "";
    }
  }, [t, e, i, s, o]);
  function l() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ te("div", { className: "wx-8HQVQV wx-header", children: [
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
function Si({
  value: t,
  current: e,
  part: n = "",
  markers: r = null,
  onCancel: s,
  onChange: o
}) {
  const i = (_e(st) || an()).getRaw().calendar, a = (i.weekStart || 7) % 7, l = i.dayShort.slice(a).concat(i.dayShort.slice(0, a)), c = (k, N, S) => new Date(
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
  const w = $(() => n == "normal" ? [t ? c(t).valueOf() : 0] : t ? [
    t.start ? c(t.start).valueOf() : 0,
    t.end ? c(t.end).valueOf() : 0
  ] : [0, 0], [n, t]), x = $(() => {
    const k = h(), N = g(), S = e.getMonth();
    let C = [];
    for (let A = k; A <= N; A.setDate(A.getDate() + 1)) {
      const V = {
        day: A.getDate(),
        in: A.getMonth() === S,
        date: A.valueOf()
      };
      let _ = "";
      if (_ += V.in ? "" : " wx-inactive", _ += w.indexOf(V.date) > -1 ? " wx-selected" : "", d) {
        const E = V.date == w[0], W = V.date == w[1];
        E && !W ? _ += " wx-left" : W && !E && (_ += " wx-right"), V.date > w[0] && V.date < w[1] && (_ += " wx-inrange");
      }
      if (_ += u(A) ? " wx-weekend" : "", r) {
        const E = r(A);
        E && (_ += " " + E);
      }
      C.push({ ...V, css: _ });
    }
    return C;
  }, [e, w, d, r]), y = F(null);
  let b = F({});
  return b.current.click = f, G(() => {
    Ms(y.current, b.current);
  }, []), /* @__PURE__ */ te("div", { children: [
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
function $i({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o
}) {
  const [i, a] = Ue(t || /* @__PURE__ */ new Date()), [l, c] = Ue(e || /* @__PURE__ */ new Date()), d = _e(st).getRaw().calendar, u = d.monthShort || [], h = $(() => l.getMonth(), [l]), g = I(
    (w, x) => {
      if (w != null) {
        x.stopPropagation();
        const y = new Date(l);
        y.setMonth(w), c(y), o && o({ current: y });
      }
      n === "normal" && a(new Date(l)), r && r();
    },
    [l, n, o, r]
  ), m = I(() => {
    const w = new Date(Hs(i, n) || l);
    w.setMonth(l.getMonth()), w.setFullYear(l.getFullYear()), s && s(w);
  }, [i, l, n, s]), f = I(
    (w) => {
      const x = w.target.closest("[data-id]");
      if (x) {
        const y = parseInt(x.getAttribute("data-id"), 10);
        g(y, w);
      }
    },
    [g]
  );
  return /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-months", onClick: f, children: u.map((w, x) => /* @__PURE__ */ p(
      "div",
      {
        className: "wx-34U8T8 wx-month" + (h === x ? " wx-current" : ""),
        "data-id": x,
        children: w
      },
      x
    )) }),
    /* @__PURE__ */ p("div", { className: "wx-34U8T8 wx-buttons", children: /* @__PURE__ */ p(vr, { onClick: m, children: d.done }) })
  ] });
}
const Yn = "wx-1XEF33", Ci = ({ value: t, current: e, onCancel: n, onChange: r, onShift: s, part: o }) => {
  const i = _e(st).getRaw().calendar, [a, l] = Ue(e), [c, d] = Ue(t), u = $(() => a.getFullYear(), [a]), h = $(() => {
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
    const x = new Date(Hs(c, o) || a);
    x.setFullYear(a.getFullYear()), r && r(x);
  }
  const w = F(null);
  return G(() => {
    w.current && Ms(w.current, g);
  }, []), /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p("div", { className: Yn + " wx-years", ref: w, children: h.map((x, y) => /* @__PURE__ */ p(
      "div",
      {
        className: Yn + ` wx-year ${u == x ? "wx-current" : ""} ${y === 0 ? "wx-prev-decade" : ""} ${y === 11 ? "wx-next-decade" : ""}`,
        "data-id": x,
        children: x
      },
      y
    )) }),
    /* @__PURE__ */ p("div", { className: Yn + " wx-buttons", children: /* @__PURE__ */ p(vr, { onClick: f, children: i.done }) })
  ] });
}, Br = {
  month: {
    component: Si,
    next: Ti,
    prev: _i
  },
  year: {
    component: $i,
    next: Di,
    prev: Ni
  },
  duodecade: {
    component: Ci,
    next: Ei,
    prev: Mi
  }
};
function _i(t) {
  return t = new Date(t), t.setMonth(t.getMonth() - 1), t;
}
function Ti(t) {
  return t = new Date(t), t.setMonth(t.getMonth() + 1), t;
}
function Ni(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 1), t;
}
function Di(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 1), t;
}
function Mi(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() - 10), t;
}
function Ei(t) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + 10), t;
}
function Hs(t, e) {
  let n;
  if (e === "normal") n = t;
  else {
    const { start: r, end: s } = t;
    e === "left" ? n = r : e == "right" ? n = s : n = r && s;
  }
  return n;
}
const Ii = ["clear", "today"];
function Ri(t) {
  if (t === "done") return -1;
  if (t === "clear") return null;
  if (t === "today") return /* @__PURE__ */ new Date();
}
function Ai({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = "normal",
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: a
}) {
  const l = _e(st).getGroup("calendar"), [c, d] = j("month"), u = Array.isArray(o) ? o : o ? Ii : [], h = (x, y) => {
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
      const k = Br[c];
      n(y > 0 ? k.next(e) : k.prev(e));
    } else b && n(b);
    i && i();
  }, f = (x) => {
    d("month"), a && a({ select: !0, value: x });
  }, w = $(() => Br[c].component, [c]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: `wx-2Gr4AS wx-calendar ${r !== "normal" && r !== "both" ? "wx-part" : ""}`,
      children: /* @__PURE__ */ te("div", { className: "wx-2Gr4AS wx-wrap", children: [
        /* @__PURE__ */ p(bi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ te("div", { children: [
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
            vr,
            {
              onClick: (y) => h(y, Ri(x)),
              children: l(x)
            }
          ) }, x)) })
        ] })
      ] })
    }
  );
}
function Rn(t) {
  let { words: e = null, optional: n = !1, children: r } = t, s = _e(st);
  const o = $(() => {
    let i = s;
    return (!i || !i.extend) && (i = Et(sn)), e !== null && (i = i.extend(e, n)), i;
  }, [e, n, s]);
  return /* @__PURE__ */ p(st.Provider, { value: o, children: r });
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
const Hi = ["clear", "today"];
function Ls({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Hi,
  onChange: s
}) {
  const [o, i] = Ue(t), [a, l] = Ue(e);
  G(() => {
    Kr(a, o, l, !1);
  }, [o, a]);
  const c = I(
    (u) => {
      const h = u.value;
      h ? (i(new Date(h)), Kr(a, new Date(h), l, !0)) : i(null), s && s({ value: h ? new Date(h) : null });
    },
    [s, a]
  ), d = I(
    (u) => {
      l(u);
    },
    [l]
  );
  return a ? /* @__PURE__ */ p(Rn, { children: /* @__PURE__ */ p(
    Ai,
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
const Li = ["clear", "today"];
function Oi({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = "unset",
  align: o = "start",
  placeholder: i = "",
  format: a = "",
  buttons: l = Li,
  css: c = "",
  title: d = "",
  editable: u = !1,
  clear: h = !1,
  onChange: g
}) {
  const { calendar: m, formats: f } = (_e(st) || an()).getRaw(), w = a || f?.dateFormat;
  let x = typeof w == "function" ? w : ct(w, m);
  const [y, b] = j(t), [k, N] = j(!1);
  G(() => {
    b(t);
  }, [t]);
  function S() {
    N(!1);
  }
  function C(_) {
    const E = _ === y || _ && y && _.valueOf() === y.valueOf() || !_ && !y;
    b(_), E || g && g({ value: _ }), setTimeout(S, 1);
  }
  const A = $(
    () => y ? x(y) : "",
    [y, x]
  );
  function V({ value: _, input: E }) {
    if (!u && !h || E) return;
    let W = typeof u == "function" ? u(_) : _ ? new Date(_) : null;
    W = isNaN(W) ? y || null : W || null, C(W);
  }
  return G(() => {
    const _ = S;
    return window.addEventListener("scroll", _), () => window.removeEventListener("scroll", _);
  }, []), /* @__PURE__ */ te("div", { className: "wx-1lKOFG wx-datepicker", onClick: () => N(!0), children: [
    /* @__PURE__ */ p(
      ln,
      {
        css: c,
        title: d,
        value: A,
        id: e,
        readonly: !u,
        disabled: n,
        error: r,
        placeholder: i,
        onInput: S,
        onChange: V,
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
          Ls,
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
function Os({
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
  let [g, m] = Ue(t);
  function f(k) {
    u.current = k.navigate, h.current = k.keydown;
  }
  const w = $(() => g || g === 0 ? (n || e).find((k) => k.id === g) : null, [g, n, e]), x = I(
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
  return /* @__PURE__ */ te(
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
        !s && /* @__PURE__ */ p(In, { items: e, onReady: f, onSelect: x, children: ({ option: k }) => c ? c(k) : k[a] })
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
  const d = Ft(t), [u, h] = Ue(o), g = F({ value: u, input: u }), m = $(
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
  const y = F(null);
  return G(() => {
    if (y.current)
      return y.current.addEventListener("change", x), () => {
        y.current && y.current.removeEventListener("change", x);
      };
  }, [y, x]), /* @__PURE__ */ te("div", { className: `wx-2EDJ8G wx-slider ${n}`, title: a, children: [
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
const Pi = ({
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
  const c = Ft(t), [d, u] = Ue(e), h = I(() => {
    if (a || d <= r) return;
    const w = d - n;
    u(w), l && l({ value: w });
  }, [d, a, r, n, l]), g = I(() => {
    if (a || d >= s) return;
    const w = d + n;
    u(w), l && l({ value: w });
  }, [d, a, s, n, l]), m = I(() => {
    if (!a) {
      const w = Math.round(Math.min(s, Math.max(d, r)) / n) * n, x = isNaN(w) ? Math.max(r, 0) : w;
      u(x), l && l({ value: x });
    }
  }, [a, d, s, r, n, l]), f = I(
    (w) => {
      const x = w.target.value * 1;
      u(x), l && l({ value: x, input: !0 });
    },
    [l]
  );
  return /* @__PURE__ */ te(
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
function Wi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ te(
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
function Fi({
  title: t = "",
  buttons: e = ["cancel", "ok"],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i
}) {
  const a = (_e(st) || an()).getGroup("core"), l = F(null);
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
      children: /* @__PURE__ */ te("div", { className: "wx-1FxkZa wx-window", children: [
        n || (t ? /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-header", children: t }) : null),
        /* @__PURE__ */ p("div", { children: r }),
        s || e && /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-buttons", children: e.map((u) => /* @__PURE__ */ p("div", { className: "wx-1FxkZa wx-button", children: /* @__PURE__ */ p(
          dt,
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
function Ui({ children: t }, e) {
  const [n, r] = j(null), [s, o] = j([]);
  return Mt(
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
  ), /* @__PURE__ */ te(Oe, { children: [
    t,
    n && /* @__PURE__ */ p(
      Fi,
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
Dt(Ui);
function en({
  label: t = "",
  position: e = "",
  css: n = "",
  error: r = !1,
  type: s = "",
  required: o = !1,
  children: i
}) {
  const a = $(() => wr(), []);
  return /* @__PURE__ */ p(yr.Provider, { value: a, children: /* @__PURE__ */ te(
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
const Ps = ({
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
  const [g, m] = Ue(t), f = $(() => (g ? "pressed" : "") + (e ? " " + e : ""), [g, e]), w = I(
    (x) => {
      let y = !g;
      o && o(x), x.defaultPrevented || (m(y), h && h({ value: y }));
    },
    [g, o, h]
  );
  return g && u ? /* @__PURE__ */ p(
    dt,
    {
      title: i,
      text: g && c || l,
      css: a,
      type: f,
      icon: g && s || n,
      onClick: w,
      disabled: r,
      children: xr(u, { value: g })
    }
  ) : d ? /* @__PURE__ */ p(
    dt,
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
    dt,
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
}, jr = new Date(0, 0, 0, 0, 0);
function Yi({
  value: t = jr,
  id: e,
  title: n = "",
  css: r = "",
  disabled: s = !1,
  error: o = !1,
  format: i = "",
  onChange: a
}) {
  let [l, c] = Ue(t);
  const { calendar: d, formats: u } = (_e(st) || an()).getRaw(), h = d.clockFormat == 12, g = 23, m = 59, f = $(() => {
    const O = i || u?.timeFormat;
    return typeof O == "function" ? O : ct(O, d);
  }, [i, u, d]), w = $(() => f(new Date(0, 0, 0, 1)).indexOf("01") != -1, [f]), x = (O, ae) => (O < 10 && ae ? `0${O}` : `${O}`).slice(-2), y = (O) => x(O, !0), b = (O) => `${O}`.replace(/[^\d]/g, "") || 0, k = (O) => h && (O = O % 12, O === 0) ? "12" : x(O, w), N = I((O, ae) => (O = b(O), Math.min(O, ae)), []), [S, C] = j(null), A = l || jr, V = N(A.getHours(), g), _ = N(A.getMinutes(), m), E = V > 12, W = k(V), H = y(_), M = $(
    () => f(new Date(0, 0, 0, V, _)),
    [V, _, f]
  ), q = I(() => {
    C(!0);
  }, []), le = I(() => {
    const O = new Date(A);
    O.setHours(O.getHours() + (E ? -12 : 12)), c(O), a && a({ value: O });
  }, [A, E, a]), X = I(
    ({ value: O }) => {
      if (A.getHours() === O) return;
      const ae = new Date(A);
      ae.setHours(O), c(ae), a && a({ value: ae });
    },
    [A, a]
  ), se = I(
    ({ value: O }) => {
      if (A.getMinutes() === O) return;
      const ae = new Date(A);
      ae.setMinutes(O), c(ae), a && a({ value: ae });
    },
    [A, a]
  ), ce = I(
    (O) => (O = N(O, g), h && (O = O * 1, O === 12 && (O = 0), E && (O += 12)), O),
    [N, h, E]
  ), $e = I(() => {
    C(null);
  }, []);
  return /* @__PURE__ */ te(
    "div",
    {
      className: `wx-7f497i wx-timepicker ${o ? "wx-7f497i wx-error" : ""} ${s ? "wx-7f497i wx-disabled" : ""}`,
      onClick: s ? void 0 : q,
      style: { cursor: s ? "default" : "pointer" },
      children: [
        /* @__PURE__ */ p(
          ln,
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
        S && !s && /* @__PURE__ */ p(Ut, { onCancel: $e, width: "unset", children: /* @__PURE__ */ te("div", { className: "wx-7f497i wx-wrapper", children: [
          /* @__PURE__ */ te("div", { className: "wx-7f497i wx-timer", children: [
            /* @__PURE__ */ p(
              "input",
              {
                className: "wx-7f497i wx-digit",
                value: W,
                onChange: (O) => {
                  const ae = ce(O.target.value);
                  X({ value: ae });
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
                  const ae = N(O.target.value, m);
                  se({ value: ae });
                }
              }
            ),
            h && /* @__PURE__ */ p(
              Ps,
              {
                value: E,
                onClick: le,
                active: () => /* @__PURE__ */ p("span", { children: "pm" }),
                children: /* @__PURE__ */ p("span", { children: "am" })
              }
            )
          ] }),
          /* @__PURE__ */ p(en, { width: "unset", children: /* @__PURE__ */ p(
            rr,
            {
              label: d.hours,
              value: V,
              onChange: X,
              max: g
            }
          ) }),
          /* @__PURE__ */ p(en, { width: "unset", children: /* @__PURE__ */ p(
            rr,
            {
              label: d.minutes,
              value: _,
              onChange: se,
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
  const r = F(null);
  return G(() => rn(r.current, n).destroy, []), /* @__PURE__ */ p("div", { ref: r, className: `wx-2L733M wx-sidearea wx-pos-${t}`, children: e });
}
function Ws({ theme: t = "", target: e, children: n }) {
  const r = F(null), s = F(null), [o, i] = j(null);
  r.current || (r.current = document.createElement("div"));
  const a = _e(on);
  return G(() => {
    i(
      e || Bi(s.current) || Je.getTopNode(s.current)
    );
  }, [s.current]), /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p("span", { ref: s, style: { display: "none" } }),
    s.current && o ? jo(
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
function Bi(t) {
  const e = Je.getTopNode(t);
  for (; t && t !== e && !t.getAttribute("data-wx-portal-root"); )
    t = t.parentNode;
  return t;
}
function Ki() {
  return /* @__PURE__ */ p(Oe, {});
}
function qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(on.Provider, { value: "material", children: /* @__PURE__ */ te(Oe, { children: [
    n && /* @__PURE__ */ p("div", { className: "wx-theme wx-material-theme", children: n }),
    e && /* @__PURE__ */ te(Oe, { children: [
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
  return /* @__PURE__ */ p(Oe, {});
}
function Xr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(on.Provider, { value: "willow", children: /* @__PURE__ */ te(Oe, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-theme", children: n }),
    e && /* @__PURE__ */ te(Oe, { children: [
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
function Qr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ p(on.Provider, { value: "willow-dark", children: /* @__PURE__ */ te(Oe, { children: [
    n && n && /* @__PURE__ */ p("div", { className: "wx-theme wx-willow-dark-theme", children: n }),
    e && /* @__PURE__ */ te(Oe, { children: [
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
mr(Je);
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
var ji = (/* @__PURE__ */ new Date()).valueOf(), qi = () => ji++;
function Xi(t, e) {
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
      return Xi(t, e);
  return t === e;
}
function Cn(t) {
  if (typeof t != "object" || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(Cn);
  const e = {};
  for (const n in t)
    e[n] = Cn(t[n]);
  return e;
}
var Fs = class {
  constructor(t) {
    this._nextHandler = null, this._dispatch = t, this.exec = this.exec.bind(this);
  }
  async exec(t, e) {
    return this._dispatch(t, e), this._nextHandler && await this._nextHandler.exec(t, e), e;
  }
  setNext(t) {
    return this._nextHandler = t;
  }
}, Us = (/* @__PURE__ */ new Date()).valueOf(), Qi = () => Us++;
function kr() {
  return "temp://" + Us++;
}
var Zr = class {
  constructor(e) {
    this._data = e, this._pool = /* @__PURE__ */ new Map();
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      this._pool.set(r.id, r);
    }
  }
  add(e) {
    e = { id: Qi(), ...e }, this._data.push(e), this._pool.set(e.id, e);
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
}, Zi = class {
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
    const n = this.byId(e), r = this.byId(n.parent), s = yn(r, n.id) + 1;
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
    const r = this._pool.get(n.parent), s = yn(r, n.id);
    n = { ...n, ...e }, r && s >= 0 && (r.data[s] = n, r.data = [...r.data]), this._pool.set(n.id, n);
  }
  move(t, e, n) {
    const r = this._pool.get(t), s = e === "child", o = this._pool.get(n), i = o.$level + (s ? 1 : 0);
    if (!r || !o) return;
    const a = this._pool.get(r.parent), l = s ? o : this._pool.get(o.parent);
    l.data || (l.data = []);
    const c = yn(a, r.id);
    Ji(a, c);
    const d = s ? l.data.length : yn(l, o.id) + (e === "after" ? 1 : 0);
    if (Jr(l, d, r), a.id === l.id && c === d) return null;
    r.parent = l.id, r.$level !== i && (r.$level = i, this.setLevel(r, i + 1, !0)), this.update(r.id, r), this._clearBranch(a);
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
function Ji(t, e) {
  const n = [...t.data];
  n.splice(e, 1), t.data = n;
}
function Jr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), t.data = r;
}
function yn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var Vs = 2, ea = class {
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
}, ta = class {
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
var na = class {
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
function ra(t, e) {
  return typeof t == "string" ? t.localeCompare(e, void 0, { numeric: !0 }) : typeof t == "object" ? t.getTime() - e.getTime() : (t ?? 0) - (e ?? 0);
}
function sa(t, e) {
  return typeof t == "string" ? -t.localeCompare(e, void 0, { numeric: !0 }) : typeof e == "object" ? e.getTime() - t.getTime() : (e ?? 0) - (t ?? 0);
}
function oa({ key: t, order: e }) {
  const n = e === "asc" ? ra : sa;
  return (r, s) => n(r[t], s[t]);
}
function ia(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => oa(n));
  return t.length === 1 ? e[0] : function(n, r) {
    for (let s = 0; s < e.length; s++) {
      const o = e[s](n, r);
      if (o !== 0) return o;
    }
    return 0;
  };
}
function aa(t, e) {
  return t.sort(ia(e));
}
class la extends Zi {
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
    r && (aa(r, e), r.forEach((s) => {
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
function ft(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Ln(t, e) {
  const n = Te(t);
  return isNaN(e) ? ft(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function br(t, e) {
  const n = Te(t);
  if (isNaN(e)) return ft(t, NaN);
  if (!e) return n;
  const r = n.getDate(), s = ft(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function Ks(t, e) {
  const n = +Te(t);
  return ft(t, n + e);
}
const js = 6048e5, ca = 864e5, qs = 6e4, Xs = 36e5;
function da(t, e) {
  return Ks(t, e * Xs);
}
let ua = {};
function Qs() {
  return ua;
}
function _n(t, e) {
  const n = Qs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Te(t), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function tn(t) {
  return _n(t, { weekStartsOn: 1 });
}
function fa(t) {
  const e = Te(t), n = e.getFullYear(), r = ft(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = tn(r), o = ft(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = tn(o);
  return e.getTime() >= s.getTime() ? n + 1 : e.getTime() >= i.getTime() ? n : n - 1;
}
function Tt(t) {
  const e = Te(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Tn(t) {
  const e = Te(t), n = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Zs(t, e) {
  const n = Tt(t), r = Tt(e), s = +n - Tn(n), o = +r - Tn(r);
  return Math.round((s - o) / ca);
}
function es(t) {
  const e = fa(t), n = ft(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), tn(n);
}
function ha(t, e) {
  return Ks(t, e * qs);
}
function ga(t, e) {
  const n = e * 3;
  return br(t, n);
}
function Js(t, e) {
  const n = e * 7;
  return Ln(t, n);
}
function pa(t, e) {
  return br(t, e * 12);
}
function Jt(t, e) {
  const n = Te(t), r = Te(e), s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ma(t, e) {
  const n = Tt(t), r = Tt(e);
  return +n == +r;
}
function Sr(t, e) {
  const n = tn(t), r = tn(e), s = +n - Tn(n), o = +r - Tn(r);
  return Math.round((s - o) / js);
}
function wa(t, e) {
  const n = Te(t), r = Te(e), s = n.getFullYear() - r.getFullYear(), o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function xa(t, e) {
  const n = Te(t), r = Te(e);
  return n.getFullYear() - r.getFullYear();
}
function $r(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function eo(t, e) {
  return +Te(t) - +Te(e);
}
function ya(t, e, n) {
  const r = eo(t, e) / Xs;
  return $r(n?.roundingMethod)(r);
}
function va(t, e, n) {
  const r = eo(t, e) / qs;
  return $r(n?.roundingMethod)(r);
}
function to(t) {
  const e = Te(t);
  return e.setHours(23, 59, 59, 999), e;
}
function Cr(t) {
  const e = Te(t), n = e.getMonth();
  return e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e;
}
function ka(t) {
  const e = Te(t);
  return +to(e) == +Cr(e);
}
function no(t, e) {
  const n = Te(t), r = Te(e), s = Jt(n, r), o = Math.abs(wa(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30), n.setMonth(n.getMonth() - s * o);
    let a = Jt(n, r) === -s;
    ka(Te(t)) && o === 1 && Jt(t, r) === 1 && (a = !1), i = s * (o - Number(a));
  }
  return i === 0 ? 0 : i;
}
function ba(t, e, n) {
  const r = no(t, e) / 3;
  return $r(n?.roundingMethod)(r);
}
function Sa(t, e) {
  const n = Te(t), r = Te(e), s = Jt(n, r), o = Math.abs(xa(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = Jt(n, r) === -s, a = s * (o - +i);
  return a === 0 ? 0 : a;
}
function nn(t) {
  const e = Te(t), n = e.getMonth(), r = n - n % 3;
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function ro(t) {
  const e = Te(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function $a(t) {
  const e = Te(t), n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function Ca(t) {
  const e = Te(t), n = ft(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function _a(t) {
  const e = Te(t);
  return e.setMinutes(59, 59, 999), e;
}
function Ta(t, e) {
  const n = Qs(), r = e?.weekStartsOn ?? e?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = Te(t), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function _r(t) {
  const e = Te(t), n = e.getMonth(), r = n - n % 3 + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function so(t) {
  const e = Te(t), n = e.getFullYear(), r = e.getMonth(), s = ft(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Na(t) {
  const e = Te(t).getFullYear();
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function oo(t) {
  const e = Te(t);
  return String(new Date(e)) === "Invalid Date" ? NaN : Na(e) ? 366 : 365;
}
function Da(t) {
  const e = es(t), n = +es(Js(e, 60)) - +e;
  return Math.round(n / js);
}
function At(t, e) {
  const n = Te(t), r = Te(e);
  return +n == +r;
}
function Ma(t) {
  const e = Te(t);
  return e.setMinutes(0, 0, 0), e;
}
function Ea(t, e, n) {
  const r = _n(t, n), s = _n(e, n);
  return +r == +s;
}
function Ia(t, e) {
  const n = Te(t), r = Te(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function Ra(t, e) {
  const n = nn(t), r = nn(e);
  return +n == +r;
}
function Aa(t, e) {
  const n = Te(t), r = Te(e);
  return n.getFullYear() === r.getFullYear();
}
const sr = { year: Sa, quarter: ba, month: no, week: Sr, day: Zs, hour: ya, minute: va }, yt = { year: { quarter: 4, month: 12, week: Da, day: Ha, hour: La }, quarter: { month: 3, week: Oa, day: io, hour: Pa }, month: { week: Wa, day: za, hour: Fa }, week: { day: 7, hour: 168 }, day: { hour: 24 }, hour: { minute: 60 } };
function Ha(t) {
  return t ? oo(t) : 365;
}
function La(t) {
  return oo(t) * 24;
}
function Oa(t) {
  const e = nn(t), n = Ln(Tt(_r(t)), 1);
  return Sr(n, e);
}
function io(t) {
  if (t) {
    const e = nn(t), n = _r(t);
    return Zs(n, e) + 1;
  }
  return 91;
}
function Pa(t) {
  return io(t) * 24;
}
function Wa(t) {
  if (t) {
    const e = ro(t), n = Ln(Tt(Cr(t)), 1);
    return Sr(n, e);
  }
  return 5;
}
function za(t) {
  return t ? so(t) : 30;
}
function Fa(t) {
  return so(t) * 24;
}
function Nn(t, e, n) {
  const r = yt[t][e];
  return r ? typeof r == "number" ? r : r(n) : 1;
}
function Ua(t, e) {
  return t === e || !!(yt[t] && yt[t][e]);
}
const Dn = { year: pa, quarter: ga, month: br, week: Js, day: Ln, hour: da, minute: ha };
function Tr(t, e, n) {
  if (e) {
    if (t === "day") return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === "hour") return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) => !yt[t][o] || typeof yt[t][o] == "number" || co(t, r, s, n) ? Qt(t, r, s, o, i, n) : Ya(r, s, t, o, i, n);
}
function Qt(t, e, n, r, s, o) {
  const i = r || t;
  let a = n, l = e;
  if (s && (a = ut(i, n, o), l = ut(i, e, o), l < e && (l = at(i)(l, 1))), t !== i) {
    const c = sr[i](l, a), d = Nn(t, i, n);
    return c / d;
  } else return sr[i](l, a);
}
function Ya(t, e, n, r, s, o) {
  let i = 0;
  const a = ut(n, e, o);
  if (e > a) {
    const c = Dn[n](a, 1);
    i = Qt(n, c, e, r, void 0, o), e = c;
  }
  let l = 0;
  return co(n, e, t, o) || (l = Qt(n, ut(n, t, o), e, void 0, void 0, o), e = Dn[n](e, l)), l += i + Qt(n, t, e, r, void 0, o), !l && s && (l = Qt(n, t, e, r, s, o)), l;
}
function at(t, e) {
  if (e) {
    if (t === "day") return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === "hour") return (n, r) => e.addWorkingHours(n, r);
  }
  return Dn[t];
}
const ao = { year: Ca, quarter: nn, month: ro, week: (t, e) => _n(t, { weekStartsOn: e }), day: Tt, hour: Ma };
function ut(t, e, n) {
  const r = ao[t];
  return r ? r(e, n) : new Date(e);
}
const Va = { year: $a, quarter: _r, month: Cr, week: (t, e) => Ta(t, { weekStartsOn: e }), day: to, hour: _a }, lo = { year: Aa, quarter: Ra, month: Ia, week: (t, e, n) => Ea(t, e, { weekStartsOn: n }), day: ma };
function co(t, e, n, r) {
  const s = lo[t];
  return s ? s(e, n, r) : !1;
}
const Ga = { start: ao, end: Va, add: Dn, isSame: lo, diff: sr, smallerCount: yt }, ts = (t) => typeof t == "function" ? t(/* @__PURE__ */ new Date()) : t;
function Ba(t, e) {
  for (const n in e) {
    if (n === "smallerCount") {
      const r = Object.keys(e[n]).sort((a, l) => it.indexOf(a) - it.indexOf(l)).shift();
      let s = it.indexOf(r);
      const o = e[n][r], i = ts(o);
      for (let a = s - 1; a >= 0; a--) {
        const l = it[a], c = ts(yt[l][r]);
        if (i <= c) break;
        s = a;
      }
      it.splice(s, 0, t);
    }
    if (n === "biggerCount") for (const r in e[n]) yt[r][t] = e[n][r];
    else Ga[n][t] = e[n];
  }
}
function Vn(t, e = 1, n) {
  return n.isWorkingDay(t) || (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)), t;
}
function Ka(t) {
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
const it = ["year", "quarter", "month", "week", "day", "hour"], or = 50, ir = 300;
function ja(t, e, n, r, s) {
  let o = t, i = e, a = !1, l = !1;
  s && s.forEach((d) => {
    (!t || n) && (!o || d.start <= o) && (o = d.start, a = !0);
    const u = d.type === "milestone" ? d.start : d.end;
    (!e || n) && (!i || u >= i) && (i = u, l = !0);
  });
  const c = at(r || "day");
  return o ? a && (o = c(o, -1)) : i ? o = c(i, -30) : o = /* @__PURE__ */ new Date(), i ? l && (i = c(i, 1)) : i = c(o, 30), { _start: o, _end: i };
}
function qa(t, e, n, r, s, o, i) {
  const a = Pt(i).unit, l = Tr(a, void 0, o), c = l(e, t, "", !0), d = ut(a, e, o);
  t = ut(a, t, o), e = d < e ? at(a)(d, 1) : d;
  const u = c * r, h = s * i.length, g = i.map((f) => {
    const w = [], x = at(f.unit);
    let y = ut(f.unit, t, o);
    for (; y < e; ) {
      const b = x(y, f.step), k = y < t ? t : y, N = b > e ? e : b, S = l(N, k, "", !0) * r, C = typeof f.format == "function" ? f.format(y, b) : f.format;
      let A = "";
      f.css && (A += typeof f.css == "function" ? f.css(y) : f.css), w.push({ width: S, value: C, date: k, css: A, unit: f.unit }), y = b;
    }
    return { cells: w, add: x, height: s };
  });
  let m = r;
  return a !== n && (m = Math.round(m / Nn(a, n)) || 1), { rows: g, width: u, height: h, diff: l, start: t, end: e, lengthUnit: n, minUnit: a, lengthUnitWidth: m };
}
function Xa(t, e, n, r) {
  const s = typeof t == "boolean" ? {} : t, o = it.indexOf(Pt(n).unit);
  if (typeof s.level > "u" && (s.level = o), s.levels) s.levels.forEach((l) => {
    l.minCellWidth || (l.minCellWidth = vn(s.minCellWidth, or)), l.maxCellWidth || (l.maxCellWidth = vn(s.maxCellWidth, ir));
  });
  else {
    const l = [], c = n.length || 1, d = vn(s.minCellWidth, or), u = vn(s.maxCellWidth, ir);
    n.forEach((h) => {
      h.format && !e[h.unit] && (e[h.unit] = h.format);
    }), it.forEach((h, g) => {
      if (g === o) l.push({ minCellWidth: d, maxCellWidth: u, scales: n });
      else {
        const m = [];
        if (g) for (let f = c - 1; f > 0; f--) {
          const w = it[g - f];
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
function Qa(t, e, n, r, s, o, i) {
  t.level = n;
  let a;
  const l = r.scales || r, c = Pt(l).unit, d = Za(c, s);
  if (e === -1) {
    const g = Nn(c, s);
    a = i * g;
  } else {
    const g = Nn(Pt(o).unit, c);
    a = Math.round(i / g);
  }
  const u = r.minCellWidth ?? or, h = r.maxCellWidth ?? ir;
  return { scales: l, cellWidth: Math.min(h, Math.max(u, a)), lengthUnit: d, zoom: t };
}
function Za(t, e) {
  const n = it.indexOf(t), r = it.indexOf(e);
  return r >= n ? t === "hour" ? "hour" : "day" : it[r];
}
function vn(t, e) {
  return t ?? e;
}
const ar = 8, uo = 4, Ja = 3, ns = 7, el = ar + uo;
function fo(t, e, n, r) {
  (t.open || t.type != "summary") && t.data?.forEach((s) => {
    typeof s.$x > "u" && go(s, n, r), s.$x += e, fo(s, e, n, r);
  });
}
function lr(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s), i = { xMin: 1 / 0, xMax: 0 };
    ho(o, i, n, r), o.$x = i.xMin, o.$w = i.xMax - i.xMin, lr(t, o, n, r);
  }
}
function ho(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > "u" && go(s, n, r);
      const o = s.type === "milestone" && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const i = s.$x + s.$w - o;
      e.xMax < i && (e.xMax = i);
    }
    s.type !== "summary" && ho(s, e, n, r);
  });
}
function go(t, e, n) {
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
function po(t, e, n) {
  return rs(t, e, n, !1), n.splitTasks && t.segments?.forEach((r) => {
    po(r, e, { ...n, baselines: !1 }), r.$x -= t.$x;
  }), n.baselines && rs(t, e, n, !0), t;
}
function rs(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: a } = n, { start: l, end: c, lengthUnit: d, diff: u } = i, h = (r ? "base_" : "") + "start", g = (r ? "base_" : "") + "end", m = "$x" + (r ? "_base" : ""), f = "$y" + (r ? "_base" : ""), w = "$w" + (r ? "_base" : ""), x = "$h" + (r ? "_base" : ""), y = "$skip" + (r ? "_baseline" : "");
  let b = t[h], k = t[g];
  if (r && !b) {
    t[y] = !0;
    return;
  }
  t[h] < l && (t[g] < l || At(t[g], l)) ? b = k = l : t[h] > c && (b = k = c), t[m] = Math.round(u(b, l, d) * s), t[f] = r ? t.$y + t.$h + uo : o * e + Ja, t[w] = Math.round(u(k, b, d, !0) * s), t[x] = r ? ar : a ? o - ns - el : o - ns, t.type === "milestone" && (t[m] = t[m] - t.$h / 2, t[w] = t.$h, r && (t[f] = t.$y + ar, t[w] = t[x] = t.$h)), n.unscheduledTasks && t.unscheduled && !r ? t.$skip = !0 : t[y] = At(b, k);
}
const Gn = 20, tl = function(t, e, n, r, s) {
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
    const h = rl(l, c + o, d, u + o, i, a, r / 2, s), g = sl(d, u + o, a);
    t.$p = `${h},${g}`, t.$pl = nl(t.$p);
  }
  return t;
};
function nl(t) {
  const e = t.split(",").map(Number), n = [];
  for (let s = 0; s < e.length; s += 2) s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s], [a, l] = n[s + 1];
    r += Math.hypot(a - o, l - i);
  }
  return r;
}
function rl(t, e, n, r, s, o, i, a) {
  const l = Gn * (s ? -1 : 1), c = Gn * (o ? -1 : 1), d = t + l, u = n + c, h = [t, e, d, e, 0, 0, 0, 0, u, r, n, r], g = u - d;
  let m = r - e;
  const f = o === s;
  return f || (u <= t + Gn - 2 && o || u > t && !o) && (m = a ? m - i + 6 : m - i), f && o && d > u || f && !o && d < u ? (h[4] = h[2] + g, h[5] = h[3], h[6] = h[4], h[7] = h[5] + m) : (h[4] = h[2], h[5] = h[3] + m, h[6] = h[4] + g, h[7] = h[5]), h.join(",");
}
function sl(t, e, n) {
  return n ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}` : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function mo(t) {
  return t.map((e) => {
    const n = e.id || kr();
    return { ...e, id: n };
  });
}
const wo = ["start", "end", "duration"];
function ol(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === "summary" ? !wo.includes(e) : n === "milestone" ? !["end", "duration"].includes(e) : !0;
}
function il(t, e) {
  return typeof e == "function" ? e : wo.includes(t) ? (typeof e == "string" && (e = { type: e, config: {} }), e.config || (e.config = {}), e.type === "datepicker" && (e.config.buttons = ["today"]), (n, r) => ol(n, r.id) ? e : null) : e;
}
function al(t) {
  return !t || !t.length ? [] : t.map((e) => {
    const n = e.align || "left", r = e.id === "add-task", s = !r && e.flexgrow ? e.flexgrow : null, o = s ? 1 : e.width || (r ? 50 : 120), i = e.editor && il(e.id, e.editor);
    return { width: o, align: n, header: e.header, id: e.id, template: e.template, _template: e._template, ...s && { flexgrow: s }, cell: e.cell, resize: e.resize ?? !0, sort: e.sort ?? !r, ...i && { editor: i }, ...e.options && { options: e.options } };
  });
}
const xo = [{ id: "text", header: "Task name", flexgrow: 1, sort: !0 }, { id: "start", header: "Start date", align: "center", sort: !0 }, { id: "duration", header: "Duration", width: 100, align: "center", sort: !0 }, { id: "add-task", header: "Add task", width: 50, align: "center", sort: !1, resize: !1 }];
function Ht(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(), i = s.length, a = ["edit-task", "paste-task", "edit-task:task", "edit-task:segment"], l = ["copy-task", "cut-task"], c = ["copy-task", "cut-task", "delete-task", "indent-task:remove", "move-task:down"], d = ["add-task", "undo", "redo"], u = ["indent-task:add", "move-task:down", "move-task:up"], h = { "indent-task:remove": 2 }, g = !i && d.includes(e), m = { parent: u.includes(e), level: h[e] };
  if (n = n || (i ? s[s.length - 1] : null), !(!n && !g)) {
    if (e !== "paste-task" && (t._temp = null), a.includes(e) || g || s.length === 1) ss(t, e, n, r);
    else if (i) {
      const f = l.includes(e) ? s : ll(s, o, m);
      c.includes(e) && f.reverse();
      const w = t.getHistory();
      w && w.startBatch(), f.forEach((x, y) => ss(t, e, x, r, y)), w && w.endBatch();
    }
  }
}
function ll(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return { id: s, level: o.$level, parent: o.parent, index: e.getIndexById(s) };
  });
  return (n.parent || n.level) && (r = r.filter((s) => n.level && s.level <= n.level || !t.includes(s.parent))), r.sort((s, o) => s.level - o.level || s.index - o.index), r.map((s) => s.id);
}
function ss(t, e, n, r, s) {
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
const os = (t, e) => at(t, e), cl = (t, e) => Tr(t, e);
function cr(t, e) {
  Array.isArray(t) && (t.forEach((n) => St(n, e)), t.forEach((n) => {
    if (n.type === "summary" && !(n.start && n.end)) {
      const { start: r, end: s } = Nr(n, t);
      n.start = r, n.end = s, St(n, e);
    }
  }));
}
function St(t, e) {
  t.unscheduled || is(t, e, !1), t.base_start && is(t, e, !0);
}
function is(t, e, n) {
  const { calendar: r, durationUnit: s } = e, o = s || "day", [i, a, l] = yo(n);
  t.type === "milestone" ? (t[l] = 0, t[a] = void 0) : t[i] && (t[l] ? t[a] = os(o, r)(t[i], t[l]) : t[a] ? t[l] = cl(o, r)(t[a], t[i]) : (t[a] = os(o, r)(t[i], 1), t[l] = 1));
}
function yo(t) {
  return t ? ["base_start", "base_end", "base_duration"] : ["start", "end", "duration"];
}
function as(t, e, n) {
  const [r, s, o] = yo(n);
  (e === o || e === r) && (t[s] = null), e === s && (t[o] = 0, t[r] && t[r] >= t[s] && (t[s] = null, t[o] = 1));
}
function vo(t, e, n) {
  as(t, n, !1), t.base_start && as(t, n, !0), St(t, e);
}
class dl extends ea {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }), this._router = new ta(super.setState.bind(this), [{ in: ["tasks", "start", "end", "scales", "autoScale"], out: ["_start", "_end"], exec: (s) => {
      const { _end: o, _start: i, start: a, end: l, tasks: c, scales: d, autoScale: u } = this.getState();
      if (!a || !l || u) {
        const h = Pt(d).unit, g = ja(a, l, u, h, c);
        (g._end != o || g._start != i) && this.setState(g, s);
      } else this.setState({ _start: a, _end: l }, s);
    } }, { in: ["_start", "_end", "cellWidth", "scaleHeight", "scales", "lengthUnit", "_weekStart"], out: ["_scales"], exec: (s) => {
      const o = this.getState();
      let { lengthUnit: i } = o;
      const { _start: a, _end: l, cellWidth: c, scaleHeight: d, scales: u, _weekStart: h } = o, g = Pt(u).unit;
      Ua(g, i) || (i = g);
      const m = qa(a, l, i, c, d, h, u);
      this.setState({ _scales: m }, s);
    } }, { in: ["_scales", "tasks", "cellHeight", "baselines", "unscheduledTasks"], out: ["_tasks"], exec: (s) => {
      const { cellWidth: o, cellHeight: i, tasks: a, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u } = this.getState(), h = a.toArray().map((g, m) => po(g, m, { cellWidth: o, cellHeight: i, _scales: l, baselines: c, splitTasks: d, unscheduledTasks: u }));
      this.setState({ _tasks: h }, s);
    } }, { in: ["_tasks", "links", "cellHeight"], out: ["_links"], exec: (s) => {
      const { tasks: o, links: i, cellHeight: a, baselines: l, criticalPath: c } = this.getState(), d = i.map((u) => {
        const h = o.byId(u.source), g = o.byId(u.target);
        return tl(u, h, g, a, l);
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
    } }], { tasks: (s) => new la(s), links: (s) => new Zr(s), columns: (s) => al(s) });
    const n = this.in = new na();
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
          const x = w[w.length - 1], y = d.findIndex((C) => C.id == x), b = d.findIndex((C) => C.id == s), k = Math.min(y, b), N = Math.max(y, b) + 1, S = d.slice(k, N).map((C) => C.id);
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
      if (typeof m < "u" && (u.$w = m, lr(i, u, c, d)), typeof h < "u") {
        if (u.type === "summary") {
          const x = h - u.$x;
          fo(u, x, c, d);
        }
        u.$x = h, lr(i, u, c, d);
      }
      typeof g < "u" && (u.$y = g + 4, u.$reorder = f), typeof m < "u" && (u.$w = m), typeof h < "u" && (u.$x = h), typeof g < "u" && (u.$y = g + 4, u.$reorder = f), this.setState(w);
    }), n.on("update-task", (s) => {
      const { id: o, segmentIndex: i, diff: a, eventSource: l } = s;
      let { task: c } = s;
      const { tasks: d, _scales: u, durationUnit: h, splitTasks: g, calendar: m } = this.getState(), f = d.byId(o), w = { durationUnit: h, calendar: m };
      if (l === "add-task" || l === "copy-task" || l === "move-task" || l === "update-task" || l === "delete-task" || l === "provide-data") {
        St(c, w), d.update(o, c);
        return;
      }
      const x = u.lengthUnit;
      let y = at(x);
      const b = Tr(x, m);
      if (a && (c.start && (c.start = y(c.start, a)), !i && i !== 0 && (c.start && c.end ? c.duration = f.duration : (c.start ? c.end = f.end : (c.end = y(c.end, a), c.start = f.start, c.duration = b(c.end, c.start)), b(c.end, c.start) || (c.duration = 1)))), c.type = c.type ?? f.type, m && c.start && (c.start = Vn(c.start, a, m)), c.start && c.end && (!At(c.start, f.start) || !At(c.end, f.end)) && c.type === "summary" && f.data?.length) {
        let N = a || b(c.start, f.start);
        m && (N = c.start > f.start ? b(c.start, f.start) : -b(f.start, c.start), y = Ka(m)), this.moveSummaryKids(f, (S) => (S = y(S, N), m ? Vn(S, a, m) : S), "update-task");
      }
      c.start || (c.start = f.start), !c.end && !c.duration && (c.duration = f.duration), St(c, w), d.update(o, c), (m && c.type === "summary" || c.type === "summary" && f.type !== "summary") && this.resetSummaryDates(o, "update-task", !0);
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
            const A = S[S.length - 1];
            if (!A.$skip) {
              const V = new Date(A.start.valueOf());
              i.start <= V && (C = V);
            }
          }
          g.start = C || at(l, d)(i.start, 1);
        }
        g.duration = 1;
      }
      d && (g.start = Vn(g.start, 1, d)), this.getState().baselines && (g.base_start = g.start, g.base_duration = g.duration), St(g, { durationUnit: l, calendar: d });
      const b = o.add(g, w), k = { tasks: o };
      if (x && m) {
        for (; x && x.id; ) n.exec("open-task", { id: x.id, mode: !0 }), x = o.byId(x.parent);
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
      let w = [];
      for (let x = 1; x < f.length; x++) {
        const [y, b] = f[x];
        d.forEach((k) => {
          if (k.source === y) {
            const N = { ...k };
            delete N.target, w.push({ ...N, source: b });
          } else if (k.target === y) {
            const N = { ...k };
            delete N.source, w.push({ ...N, target: b });
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
      d.lazy ? (d.lazy = !1, d.open = !0) : d.data = [], cr(s.data.tasks, { durationUnit: a, calendar: l }), o.parse(s.data.tasks, s.id), d.type == "summary" && this.resetSummaryDates(d.id, "provide-data"), this.setStateAsync({ tasks: o, links: new Zr(i.map((u) => u).concat(mo(s.data.links))) });
    }), n.on("zoom-scale", ({ dir: s, offset: o }) => {
      const { zoom: i, cellWidth: a, _cellWidth: l, scrollLeft: c } = this.getState(), d = o + c, u = this.calcScaleDate(d);
      let h = a;
      s < 0 && (h = l || a);
      const g = h + s * 50, m = i.levels[i.level], f = s < 0 && a > m.maxCellWidth;
      if (g < m.minCellWidth || g > m.maxCellWidth || f) {
        if (!this.changeScale(i, s)) return;
      } else this.setState({ cellWidth: g, _cellWidth: g });
      const { _scales: w, _start: x, cellWidth: y, _weekStart: b } = this.getState(), k = ut(w.minUnit, x, b), N = w.diff(u, k, "hour");
      typeof o > "u" && (o = y);
      let S = Math.round(N * y) - o;
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
      const { cellWidth: o, scales: i, _scales: a } = this.getState(), l = Qa(e, n, r, s, a.lengthUnit, i, o);
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
    return at("hour")(ut(n.minUnit, r, s), Math.floor(e / o));
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
function ul(t, e, n, r) {
  if (typeof document > "u") return "";
  const s = document.createElement("canvas");
  {
    const o = fl(s, t, e, 1, n);
    hl(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function fl(t, e, n, r, s) {
  t.setAttribute("width", (e * r).toString()), t.setAttribute("height", (n * r).toString());
  const o = t.getContext("2d");
  return o.translate(-0.5, -0.5), o.strokeStyle = s, o;
}
function hl(t, e, n, r, s, o) {
  t.beginPath(), t.moveTo(r, s), t.lineTo(r, o), e === "full" && t.lineTo(n, o), t.stroke();
}
function dr(t) {
  return [...ko];
}
function Mr(t) {
  return t.map((e) => {
    switch (e.data && Mr(e.data), e.id) {
      case "add-task:before":
      case "move-task:up":
        e.isDisabled = (n, r) => pl(n, r);
        break;
      case "move-task:down":
        e.isDisabled = (n, r) => ml(n, r);
        break;
      case "indent-task:add":
        e.isDisabled = (n, r) => wl(n, r) === n.parent;
        break;
      case "indent-task:remove":
        e.isDisabled = (n) => gl(n);
        break;
    }
    return e;
  });
}
function gl(t) {
  return t.parent === 0;
}
function pl(t, e) {
  const { _tasks: n } = e;
  return n[0]?.id === t.id;
}
function ml(t, e) {
  const { _tasks: n } = e;
  return n[n.length - 1]?.id === t.id;
}
function wl(t, e) {
  const { _tasks: n } = e, r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function ls(t) {
  return t && typeof t == "object";
}
function xl(t) {
  return !t.selected || t.selected.length < 2;
}
const yl = (t) => (e) => e.type === t, ko = Mr([{ id: "add-task", text: "Add", icon: "wxi-plus", data: [{ id: "add-task:child", text: "Child task" }, { id: "add-task:before", text: "Task above" }, { id: "add-task:after", text: "Task below" }] }, { type: "separator" }, { id: "convert-task", text: "Convert to", icon: "wxi-swap-horizontal", dataFactory: (t) => ({ id: `convert-task:${t.id}`, text: `${t.label}`, isDisabled: yl(t.id) }) }, { id: "edit-task", text: "Edit", icon: "wxi-edit", isHidden: (t, e, n) => ls(n) }, { type: "separator" }, { id: "cut-task", text: "Cut", icon: "wxi-content-cut", subtext: "Ctrl+X" }, { id: "copy-task", text: "Copy", icon: "wxi-content-copy", subtext: "Ctrl+C" }, { id: "paste-task", text: "Paste", icon: "wxi-content-paste", subtext: "Ctrl+V" }, { id: "move-task", text: "Move", icon: "wxi-swap-vertical", data: [{ id: "move-task:up", text: "Up" }, { id: "move-task:down", text: "Down" }] }, { type: "separator" }, { id: "indent-task:add", text: "Indent", icon: "wxi-indent" }, { id: "indent-task:remove", text: "Outdent", icon: "wxi-unindent" }, { type: "separator" }, { id: "delete-task", icon: "wxi-delete", text: "Delete", subtext: "Ctrl+D / BS", isHidden: (t, e, n) => xl(e) && ls(n) }]);
function ur(t) {
  return [...bo];
}
const bo = Mr([{ id: "add-task", comp: "button", icon: "wxi-plus", text: "New task", type: "primary" }, { id: "edit-task", comp: "icon", icon: "wxi-edit", menuText: "Edit", text: "Ctrl+E" }, { id: "delete-task", comp: "icon", icon: "wxi-delete", menuText: "Delete", text: "Ctrl+D, Backspace" }, { comp: "separator" }, { id: "move-task:up", comp: "icon", icon: "wxi-angle-up", menuText: "Move up" }, { id: "move-task:down", comp: "icon", icon: "wxi-angle-down", menuText: "Move down" }, { comp: "separator" }, { id: "copy-task", comp: "icon", icon: "wxi-content-copy", menuText: "Copy", text: "Ctrl+V" }, { id: "cut-task", comp: "icon", icon: "wxi-content-cut", menuText: "Cut", text: "Ctrl+X" }, { id: "paste-task", comp: "icon", icon: "wxi-content-paste", menuText: "Paste", text: "Ctrl+V" }, { comp: "separator" }, { id: "indent-task:add", comp: "icon", icon: "wxi-indent", menuText: "Indent" }, { id: "indent-task:remove", comp: "icon", icon: "wxi-unindent", menuText: "Outdent" }]);
function Bn(t) {
  return t.type === "summary";
}
function Kn(t) {
  return t.type === "milestone";
}
function jn(t) {
  return typeof t.parent > "u";
}
function qn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function So(t) {
  return [...$o];
}
const $o = [{ key: "text", comp: "text", label: "Name", config: { placeholder: "Add task name" } }, { key: "details", comp: "textarea", label: "Description", config: { placeholder: "Add description" } }, { key: "type", comp: "select", label: "Type", isHidden: (t) => jn(t) }, { key: "start", comp: "date", label: "Start date", isHidden: (t) => Bn(t), isDisabled: qn }, { key: "end", comp: "date", label: "End date", isHidden: (t) => Bn(t) || Kn(t), isDisabled: qn }, { key: "duration", comp: "counter", label: "Duration", config: { min: 1 }, isHidden: (t) => Bn(t) || Kn(t), isDisabled: qn }, { key: "progress", comp: "slider", label: "Progress", config: { min: 1, max: 100 }, isHidden: (t) => Kn(t) || jn(t) }, { key: "links", comp: "links", label: "", isHidden: (t) => jn(t) }], Co = [{ id: "task", label: "Task" }, { id: "summary", label: "Summary task" }, { id: "milestone", label: "Milestone" }], kt = Wt(null);
(/* @__PURE__ */ new Date()).valueOf();
function vl(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n], s = e[n];
    if (!cn(r, s)) return !1;
  }
  return !0;
}
function cn(t, e) {
  if (typeof t == "number" || typeof t == "string" || typeof t == "boolean" || t === null) return t === e;
  if (typeof t != typeof e || (t === null || e === null) && t !== e || t instanceof Date && e instanceof Date && t.getTime() !== e.getTime()) return !1;
  if (typeof t == "object") if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    for (let n = t.length - 1; n >= 0; n--) if (!cn(t[n], e[n])) return !1;
    return !0;
  } else return vl(t, e);
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
var _o = 2, kl = class {
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
      l ? (l.__parse(d, u, o, i) && (r[a] = d), i & _o ? o[u] = l.__trigger : l.__trigger()) : (d && d.__reactive ? n[a] = this._wrapNested(d, d, u, o) : n[a] = this._wrapWritable(d), r[a] = d), o[u] = o[u] || null;
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
}, bl = class {
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
      o.length = Math.max(...o.in.map((i) => To(i, this._sources, 1)));
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
function To(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => To(o, e, n + 1));
  return Math.max(...s);
}
var Sl = class {
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
function $l(t) {
  return (e) => e[t];
}
function Cl(t) {
  return (e, n) => e[t] = n;
}
function Nt(t, e) {
  return (e.getter || $l(e.id))(t);
}
function cs(t, e, n) {
  return (e.setter || Cl(e.id))(t, n);
}
function ds(t, e) {
  const n = document.createElement("a");
  n.href = URL.createObjectURL(t), n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function vt(t, e) {
  let n = Nt(t, e) ?? "";
  return e.template && (n = e.template(n, t, e)), e.optionsMap && (Array.isArray(n) ? n = n.map((r) => e.optionsMap.get(r)) : n = e.optionsMap.get(n)), typeof n > "u" ? "" : n + "";
}
function _l(t, e) {
  const n = /\n|"|;|,/;
  let r = "";
  const s = e.rows || `
`, o = e.cols || "	", i = t._columns, a = t.flatData;
  e.header !== !1 && i[0].header && (r = us("header", i, r, o, s));
  for (let l = 0; l < a.length; l++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = vt(a[l], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : "") + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = us("footer", i, r, o, s)), r;
}
function us(t, e, n, r, s) {
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
function Tl(t, e, n) {
  const r = [], s = [], o = [];
  let i = [];
  const a = t._columns, l = t.flatData, c = t._sizes;
  for (const u of a) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 && a[0].header && (fs("header", a, r, s, d, e, n), i = i.concat(c.headerRowHeights.map((u) => ({ height: u }))), d += a[0].header.length);
  for (let u = 0; u < l.length; u++) {
    const h = [];
    for (let g = 0; g < a.length; g++) {
      const m = l[u], f = a[g], w = Nt(m, f) ?? "";
      let x = vt(m, f), y;
      e.cellStyle && (y = e.cellStyle(w, m, f)), e.cellTemplate && (x = e.cellTemplate(w, m, f) ?? x);
      const b = No(x, 2, y, n);
      h.push(b);
    }
    r.push(h), i.push({ height: c.rowHeight });
  }
  return d += l.length, e.footer !== !1 && a[0].footer && (fs("footer", a, r, s, d, e, n), i = i.concat(c.footerRowHeights.map((u) => ({ height: u })))), { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n };
}
function fs(t, e, n, r, s, o, i) {
  for (let a = 0; a < e[0][t].length; a++) {
    const l = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][a], u = d.colspan ? d.colspan - 1 : 0, h = d.rowspan ? d.rowspan - 1 : 0;
      (u || h) && r.push({ from: { row: a + s, column: c }, to: { row: a + s + h, column: c + u } });
      let g = d.text ?? "", m;
      o.headerCellStyle && (m = o.headerCellStyle(g, d, e[c], t)), o.headerCellTemplate && (g = o.headerCellTemplate(g, d, e[c], t) ?? g);
      let f;
      t == "header" ? a == e[0][t].length - 1 ? f = 1 : f = 0 : a ? f = 4 : f = 3;
      const w = No(g, f, m, i);
      l.push(w);
    }
    n.push(l);
  }
}
function No(t, e, n, r) {
  let s = e;
  if (t && t instanceof Date && (t = Dl(t), n = n || {}, n.format = n.format || "dd/mm/yyyy"), n) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => cn(i, n));
    o < 0 ? (r.push(n), s = r.length - 1) : s = o;
  }
  return { v: t + "", s };
}
function Nl(t) {
  const e = { material: "#000000", willow: "#000000", "willow-dark": "#ffffff" }, n = { material: "none", willow: "none", "willow-dark": "#2a2b2d" }, r = { material: "#fafafb", willow: "#f2f3f7", "willow-dark": "#20262b" }, s = { material: "0.5px solid #dfdfdf", willow: "0.5px solid #e6e6e6", "willow-dark": "0.5px solid #384047" }, o = { material: "#dfdfdf", willow: "#e6e6e6", "willow-dark": "#384047" }, i = e[t], a = "0.5px solid " + o[t], l = { verticalAlign: "center", align: "left" }, c = { fontWeight: "bold", color: i, background: r[t], ...l, borderBottom: a, borderRight: a };
  return { cell: { color: i, background: n[t], borderBottom: s[t], borderRight: s[t], ...l }, header: { ...c }, footer: { ...c } };
}
function Dl(t) {
  return t ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3) : null;
}
const Ml = "portrait", El = 100, Il = "a4", Rl = { a3: { width: 11.7, height: 16.5 }, a4: { width: 8.27, height: 11.7 }, letter: { width: 8.5, height: 11 } };
function Al(t, e) {
  const n = [];
  let r = [], s = 0;
  const o = t.filter((a) => !a.hidden), i = Hl(e);
  return o.forEach((a, l) => {
    s + a.width <= i ? (s += a.width, r.push(a)) : (r.length && n.push(r), r = [a], s = a.width), l === o.length - 1 && r.length && n.push(r);
  }), n;
}
function hs(t, e, n) {
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
function Hl(t) {
  const { mode: e, ppi: n, paper: r } = t, { width: s, height: o } = Rl[r];
  return Ll(e === "portrait" ? s : o, n);
}
function Ll(t, e) {
  return t * e;
}
function Ol(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || Ml, ppi: n || El, paper: r || Il };
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
const gs = ["resize-column", "hide-column", "update-cell"], Wl = ["delete-row", "update-row", "update-cell"], zl = ["move-item"], Fl = ["resize-column", "move-item"];
let Ul = class {
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
      const { id: n, column: r } = e, s = this.getRow(n), o = this.getColumn(r), i = Nt(s, o);
      return cn(i, e.value) ? null : { action: "update-cell", data: { id: n, column: r, value: i }, source: { action: "update-cell", data: e } };
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
        if (Fl.includes(n)) {
          (r.inProgress && !this.progress[n] || typeof r.inProgress != "boolean") && (zl.includes(n) && this.setPrev("flatData"), gs.includes(n) && this.setPrev("columns")), this.progress[n] = r.inProgress;
          return;
        }
        Wl.includes(n) && this.setPrev("data"), gs.includes(n) && this.setPrev("columns");
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
function Mo() {
  let t = !0;
  return t = !1, t;
}
function Eo(t, e) {
  return typeof t > "u" || t === null ? -1 : typeof e > "u" || e === null ? 1 : t === e ? 0 : t > e ? 1 : -1;
}
function Yl(t, e) {
  return -Eo(t, e);
}
function Vl(t, e) {
  if (typeof e.sort == "function") return function(r, s) {
    const o = e.sort(r, s);
    return t === "asc" ? o : -o;
  };
  const n = t === "asc" ? Eo : Yl;
  return function(r, s) {
    return n(Nt(r, e), Nt(s, e));
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
      const i = n[o](r, s);
      if (i !== 0) return i;
    }
    return 0;
  };
}
const kn = 28, Bl = 20;
function Kl() {
  if (typeof document > "u") return "willow";
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : "willow";
}
function Mn(t, e, n, r, s) {
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
function ps(t, e, n, r, s) {
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
        if (w += m ? ` ${m}` : "", f = Mn(d, w, s).width, (g > 1 || !a[c + 1]) && n > c + 1) {
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
function jl(t, e, n) {
  const r = [], s = [];
  let o = "wx-measure-cell-body";
  o += t.css ? ` ${t.css}` : "";
  for (let i = 0; i < e.length; i++) {
    const a = e[i], l = vt(a, t);
    l && (r.push(l), t.treetoggle ? s.push(e[i].$level * kn + (e[i].$count ? kn : 0) + (t.draggable ? kn : 0)) : t.draggable && s.push(kn));
  }
  return Mn(r, o, n, s).width;
}
function ql(t, e) {
  const n = "wx-measure-cell-header", r = t.sort ? Bl : 0;
  let s = t.header;
  if (typeof s == "string") return Mn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const a = s[i], l = typeof a == "string" ? a : a.text, c = n + (typeof a == "string" ? "" : ` ${a.css}`);
    let d = Mn(l, c, e).width;
    i === s.length - 1 && (d += r), o = Math.max(o || 0, d);
  }
  return o;
}
const Xl = { text: (t, e) => t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e, richselect: (t, e) => typeof e != "number" && !e ? !0 : t == e };
function Ql(t) {
  return Xl[t];
}
class Zl extends kl {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = { rowHeight: 37, columnWidth: 160, headerHeight: 36, footerHeight: 36 };
    this._router = new bl(super.setState.bind(this), [{ in: ["columns", "sizes", "_skin"], out: ["_columns", "_sizes"], exec: (s) => {
      const { columns: o, sizes: i, _skin: a } = this.getState(), l = this.copyColumns(o), c = l.reduce((h, g) => Math.max(g.header.length, h), 0), d = l.reduce((h, g) => Math.max(g.footer.length, h), 0);
      l.forEach(this.setCollapsibleColumns);
      const u = this.normalizeSizes(l, i, c, d, a);
      for (let h = 0; h < l.length; h++) this.normalizeColumns(l, h, "header", c, u), this.normalizeColumns(l, h, "footer", d, u);
      this.setState({ _columns: l, _sizes: u }, s);
    } }, { in: ["data", "tree", "_filterIds"], out: ["flatData", "_rowHeightFromData"], exec: (s) => {
      const { data: o, tree: i, dynamic: a, _filterIds: l } = this.getState(), c = l && new Set(l), d = i ? this.flattenRows(o, [], l) : c ? o.filter((h) => c.has(h.id)) : o, u = !a && d.some((h) => h.rowHeight);
      this.setState({ flatData: d, _rowHeightFromData: u }, s);
    } }], { sizes: (s) => ({ ...n, ...s }) });
    const r = this.in = new Sl();
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
        i = { column: l.id, id: s, value: Nt(a, l) ?? "", renderedValue: vt(a, l) }, typeof c == "object" && c.config && (i.config = c.config, c.config.options && (i.options = c.config.options)), l.options && !i.options && (i.options = l.options), this.setState({ editor: i });
      }
    }), r.on("editor", ({ value: s }) => {
      const o = this.getState().editor;
      o && (o.value = s, this.setState({ editor: o }));
    }), r.on("add-row", (s) => {
      const o = this.getState();
      let { data: i } = o;
      const { select: a, _filterIds: l } = o, { row: c, before: d, after: u, select: h } = s;
      if (s.id = c.id = s.id || c.id || bn(), d || u) {
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
        cs(h, u, d);
        const g = this.updateTreeRow(h);
        h.$parent === 0 && (i = g);
      } else {
        const h = i.findIndex((m) => m.id == l), g = { ...i[h] };
        cs(g, u, d), i[h] = g;
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
          c = jl(u, f, g);
        }
        if (i == "header" || i === !0) {
          const { _skin: h } = this.getState();
          c = Math.max(ql(u, h), c);
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
      const x = Gl(w, c);
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
      const g = { ...h, id: bn() };
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
        const c = _l(this.getState(), a);
        a.download !== !1 ? ds(new Blob(["\uFEFF" + c], { type: "text/csv" }), l) : s.result = c, o(!0);
      } else if (a.format == "xlsx") {
        let c = a.styles;
        !c && c !== !1 && (c = Nl(this.getState()._skin));
        const d = c, u = d ? [{ ...d.header }, { ...d.lastHeaderCell || d.header }, { ...d.cell }, { ...d.firstFooterCell || d.footer }, { ...d.footer }] : Array(5).fill({}), { cells: h, merged: g, rowSizes: m, colSizes: f, styles: w } = Tl(this.getState(), a, u), x = a.cdn || "https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js";
        this.getXlsxWorker(x).then((y) => {
          y.onmessage = (b) => {
            if (b.data.type == "ready") {
              const k = b.data.blob;
              a.download !== !1 ? ds(k, l) : s.result = k, o(!0);
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
      const o = Ol(s);
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
    }), cn(this.getState().data, e.data) || (e.tree ? (this._branches = { 0: { data: e.data } }, e.data = this.normalizeTreeRows(e.data)) : e.data = this.normalizeRows(e.data), this.setState({ _filterIds: null, filterValues: {}, sortMarks: {}, search: null }), this._historyManager && this._historyManager.resetHistory()), Mo() && (e.tree && (e.undo = !1, e.reorder = !1), e.split?.right && (e.split.right = 0)), e.undo && !this._historyManager && (this._historyManager = new Ul(this.in, this.getState.bind(this), this.setState.bind(this))), this._router.init({ ...e });
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
    for (let n = 0; n < e.length; n++) e[n].id || (e[n].id = bn());
    return e;
  }
  normalizeTreeRows(e, n, r) {
    return e.forEach((s) => {
      s.id || (s.id = bn()), s.$level = n || 0, s.$parent = r || 0, this._branches[s.id] = s, s.data && (s.data.length ? (s.$count = s.data.length, this.normalizeTreeRows(s.data, s.$level + 1, s.id)) : (delete s.data, delete s.$count, delete s.open));
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
      r.push((l) => o?.handler ? o.handler(l[s], a) : Ql(i)(l[s], a));
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
        const d = vt(a, c);
        String(d).toLowerCase().includes(e) && (l[c.id] = !0);
      }), Object.keys(l).length && (r[a.id] = l);
    }), r;
  }
  normalizeSizes(e, n, r, s, o) {
    const i = ps(e, "header", r, n.headerHeight, o), a = ps(e, "footer", s, n.footerHeight, o), l = i.reduce((d, u) => d + u, 0), c = a.reduce((d, u) => d + u, 0);
    return { ...n, headerRowHeights: i, footerRowHeights: a, headerHeight: l, footerHeight: c };
  }
}
let Jl = (/* @__PURE__ */ new Date()).valueOf();
function bn() {
  return "temp://" + Jl++;
}
function ec(t, e = "data-id") {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
(/* @__PURE__ */ new Date()).valueOf();
var tc = class {
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
}, Ot = [], nc = { subscribe: (t) => {
  rc();
  const e = new tc();
  return Ot.push(e), t(e), () => {
    const n = Ot.findIndex((r) => r === e);
    n >= 0 && Ot.splice(n, 1);
  };
} }, ms = !1;
function rc() {
  ms || (ms = !0, document.addEventListener("keydown", (t) => {
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
const sc = { tab: !0, "shift+tab": !0, arrowup: !0, arrowdown: !0, arrowright: !0, arrowleft: !0, enter: !0, escape: !0, f2: !0, home: !0, end: !0, "ctrl+home": !0, "ctrl+end": !0, "ctrl+z": !0, "ctrl+y": !0 };
function Er(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const a = i.target;
    return a.tagName === "INPUT" || a.tagName === "TEXTAREA" || ec(a, "data-header-id")?.classList.contains("wx-filter") || !!a.closest(".wx-cell.wx-editor");
  }
  const s = {};
  for (const i in e) {
    const a = e[i];
    typeof a < "u" && (typeof a == "function" ? s[i] = a : a && (s[i] = (l) => {
      const c = r(l);
      n({ key: i, event: l, isInput: c });
    }));
  }
  const o = nc.subscribe((i) => {
    i.configure(s, t);
  });
  return { destroy: () => {
    o();
  } };
}
function oc(t, e) {
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
function ic(t, e, n) {
  const r = t.getBoundingClientRect(), s = e.querySelector(".wx-body").getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top
  };
}
function ws(t) {
  return t && t.getAttribute("data-context-id");
}
const xs = 5;
function ac(t, e) {
  let n, r, s, o, i, a, l, c, d;
  function u(S) {
    o = S.clientX, i = S.clientY, a = {
      ...ic(n, t, S),
      y: e.getTask(s).$y
    }, document.body.style.userSelect = "none";
  }
  function h(S) {
    n = qe(S), ws(n) && (s = $t(n), d = setTimeout(() => {
      c = !0, e && e.touchStart && e.touchStart(), u(S.touches[0]);
    }, 500), t.addEventListener("touchmove", y), t.addEventListener("contextmenu", g), window.addEventListener("touchend", b));
  }
  function g(S) {
    if (c || d)
      return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 && (n = qe(S), ws(n) && (s = $t(n), t.addEventListener("mousemove", x), window.addEventListener("mouseup", k), u(S)));
  }
  function f(S) {
    t.removeEventListener("mousemove", x), t.removeEventListener("touchmove", y), document.body.removeEventListener("mouseup", k), document.body.removeEventListener("touchend", b), document.body.style.userSelect = "", S && (t.removeEventListener("mousedown", m), t.removeEventListener("touchstart", h));
  }
  function w(S) {
    const C = S.clientX - o, A = S.clientY - i;
    if (!r) {
      if (Math.abs(C) < xs && Math.abs(A) < xs || e && e.start && e.start({ id: s, e: S }) === !1)
        return;
      r = n.cloneNode(!0), r.style.pointerEvents = "none", r.classList.add("wx-reorder-task"), r.style.position = "absolute", r.style.left = a.left + "px", r.style.top = a.top + "px", n.style.visibility = "hidden", n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const V = Math.round(Math.max(0, a.top + A));
      if (e && e.move && e.move({ id: s, top: V, detail: l }) === !1)
        return;
      const _ = e.getTask(s), E = _.$y;
      if (!a.start && a.y == E) return N();
      a.start = !0, a.y = _.$y - 4, r.style.top = V + "px";
      const W = document.elementFromPoint(
        S.clientX,
        S.clientY
      ), H = qe(W);
      if (H && H !== n) {
        const M = $t(H), q = H.getBoundingClientRect(), le = q.top + q.height / 2, X = S.clientY + a.db > le && H.nextElementSibling !== n, se = S.clientY - a.dt < le && H.previousElementSibling !== n;
        l?.after == M || l?.before == M ? l = null : X ? l = { id: s, after: M } : se && (l = { id: s, before: M });
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
const lc = {
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
let cc = 1;
function dc(t) {
  return Io(t, (e) => {
    const n = { ...e, id: e.id || cc++ };
    return n.type && (n.comp = n.type), n;
  });
}
const Ao = {};
function uc(t) {
  return Ao[t] || t;
}
function fc(t, e) {
  Ao[t] = e;
}
function hc({ onClick: t, onShow: e, option: n }) {
  const r = F(null), s = I(() => {
    e(n.data ? n.id : !1, r.current);
  }, [e, n]), o = $(() => n && n.comp ? uc(n.comp) : null, [n]);
  return /* @__PURE__ */ te(
    "div",
    {
      ref: r,
      className: `wx-cDCz9rZQ wx-option ${n.css || ""} ${n.disabled ? "wx-disabled" : ""}`,
      "data-id": n.id,
      onMouseEnter: s,
      onClick: t,
      children: [
        n.icon ? /* @__PURE__ */ p("i", { className: `wx-cDCz9rZQ wx-icon ${n.icon}` }) : null,
        n.comp ? o ? /* @__PURE__ */ p(o, { item: n, option: n }) : null : /* @__PURE__ */ te("span", { className: "wx-cDCz9rZQ wx-value", children: [
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
function Ir({
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
  const [c, d] = j(-1e4), [u, h] = j(-1e4), [g, m] = j(20), [f, w] = j(), x = F(null), [y, b] = j(!1), [k, N] = j(null), S = I(() => {
    const E = ni(x.current, s, r, e, n);
    E && (d(E.x), h(E.y), m(E.z), w(E.width));
  }, [s, r, e, n]);
  G(() => {
    o && o(S);
  }, []);
  const C = I(() => {
    b(!1);
  }, []), A = I(() => {
    l && l({ action: null, option: null });
  }, [l]), V = I((E, W) => {
    b(E), N(W);
  }, []), _ = $(() => dc(t), [t]);
  return G(() => {
    S();
  }, [s, S]), G(() => {
    if (x.current)
      return rn(x.current, { callback: A, modal: !0 }).destroy;
  }, [A]), /* @__PURE__ */ p(
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
      children: _.map((E) => /* @__PURE__ */ te(Ds, { children: [
        E.comp === "separator" ? /* @__PURE__ */ p("div", { className: "wx-XMmAGqVx wx-separator" }) : /* @__PURE__ */ p(
          hc,
          {
            option: E,
            onShow: V,
            onClick: (W) => {
              if (!E.data && !W.defaultPrevented) {
                const H = { context: i, action: E, option: E, event: W };
                E.handler && E.handler(H), l && l(H), W.stopPropagation();
              }
            }
          }
        ),
        E.data && y === E.id ? /* @__PURE__ */ p(
          Ir,
          {
            css: a,
            options: E.data,
            at: "right-overlap",
            parent: k,
            context: i,
            onClick: l
          }
        ) : null
      ] }, E.id))
    }
  );
}
const gc = Dt(function(t, e) {
  const {
    options: n,
    at: r = "bottom",
    resolver: s = null,
    dataKey: o = "contextId",
    filter: i = null,
    css: a = "",
    children: l,
    onClick: c
  } = t, [d, u] = j(null), [h, g] = j(null), [m, f] = j(0), [w, x] = j(0), y = $(() => d !== null && i ? Ro(n, (S) => i(S, d)) : n, [d, i, n]), b = I(
    (S) => {
      g(null), c && c(S);
    },
    [c]
  ), k = I((S, C) => {
    let A = null;
    for (; S && S.dataset && !A; )
      A = S.dataset[C], S = S.parentNode;
    return A ? zt(A) : null;
  }, []), N = I(
    (S, C) => {
      if (!S) {
        g(null);
        return;
      }
      if (S.defaultPrevented) return;
      const A = S.target;
      if (A && A.dataset && A.dataset.menuIgnore) return;
      f(S.clientX + 1), x(S.clientY + 1);
      let V = typeof C < "u" ? C : k(A, o);
      s && (V = s(V, S), !V) || (u(V), g(A), S.preventDefault());
    },
    [o, k, s]
  );
  return Mt(e, () => ({ show: N }), [N]), /* @__PURE__ */ te(Oe, { children: [
    l ? /* @__PURE__ */ p("span", { onClick: N, "data-menu-ignore": "true", children: typeof l == "function" ? l() : l }) : null,
    h ? /* @__PURE__ */ p(Ws, { children: /* @__PURE__ */ p(
      Ir,
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
Dt(function(t, e) {
  const { options: n, at: r = "bottom", css: s = "", children: o, onClick: i } = t, [a, l] = j(null);
  function c(m) {
    l(null), i && i(m);
  }
  const d = I((m) => {
    l(m.target), m.preventDefault();
  }, []);
  Mt(e, () => ({ show: d }), [d]);
  function u(m) {
    let f = m.target;
    for (; !f.dataset.menuIgnore; )
      l(f), f = f.parentNode;
  }
  const h = F(0), g = F(a);
  return G(() => {
    g.current !== a && (h.current += 1, g.current = a);
  }, [a]), /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p("span", { onClick: u, "data-menu-ignore": "true", children: o }),
    a ? /* @__PURE__ */ p(Ws, { children: /* @__PURE__ */ p(
      Ir,
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
const Ho = Dt(function(t, e) {
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
  return Mt(
    e,
    () => ({
      show: u
    }),
    [u]
  ), /* @__PURE__ */ te(Oe, { children: [
    l ? /* @__PURE__ */ p("span", { onContextMenu: u, "data-menu-ignore": "true", children: l }) : null,
    /* @__PURE__ */ p(
      gc,
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
}), Lo = {};
function pc(t) {
  return Lo[t] || t;
}
function Yt(t, e) {
  Lo[t] = e;
}
function Oo({ menu: t = !1 }) {
  return /* @__PURE__ */ p("div", { className: `wx-z1qpqrvg wx-separator${t ? "-menu" : ""}`, children: " " });
}
function Po() {
  return /* @__PURE__ */ p("div", { className: "wx-1IhFzpJV wx-spacer" });
}
const mc = ({ key: t, text: e, ...n }) => n;
function Rr(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t, i = $(
    () => pc(e.comp || "label"),
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
    return /* @__PURE__ */ p(Po, {});
  if (e && e.comp == "separator")
    return /* @__PURE__ */ p(Oo, { menu: n });
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
            ...mc(e)
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
  const [o, i] = j(!0), a = () => i(!0), l = () => i(!1), c = (u) => {
    a(), s && s(u);
  }, d = [
    "wx-wSVFAGym",
    "wx-tb-group",
    t.css || "",
    t.layout == "column" ? "wx-column" : "",
    t.collapsed && !n ? "wx-group-collapsed" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ p("div", { className: d, children: t.collapsed && !n ? /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ te("div", { className: "wx-wSVFAGym wx-collapsed", onClick: l, children: [
      t.icon ? /* @__PURE__ */ p("i", { className: `wx-wSVFAGym icon ${t.icon}` }) : null,
      t.text ? /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-label-text", children: t.text }) : null,
      t.text && !t.icon ? /* @__PURE__ */ p("i", { className: "wx-wSVFAGym wx-label-arrow wxi-angle-down" }) : null
    ] }),
    o ? null : /* @__PURE__ */ p(Ut, { width: "", oncancel: a, children: /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-drop-group", children: /* @__PURE__ */ p(
      En,
      {
        item: { ...t, text: "", collapsed: !1 },
        values: e,
        menu: n,
        onChange: r,
        onClick: c
      }
    ) }) })
  ] }) : /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p("div", { className: "wx-wSVFAGym wx-tb-body", children: t.items.map(
      (u, h) => u.items ? /* @__PURE__ */ p(
        En,
        {
          item: u,
          values: e,
          onClick: c,
          onChange: r
        },
        u.id || h
      ) : /* @__PURE__ */ p(
        Rr,
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
function wc({ items: t = [], css: e, values: n, width: r, onClick: s, onChange: o }) {
  const [i, a] = j(void 0), l = F(null);
  function c() {
    a(null);
  }
  function d() {
    a(!0);
  }
  function u(h) {
    c(), s && s(h);
  }
  return /* @__PURE__ */ te(
    "div",
    {
      className: `wx-Yo6BuX0p wx-menu ${e || ""}`,
      ref: l,
      "data-id": "$menu",
      children: [
        /* @__PURE__ */ p(dt, { icon: "wxi-dots-h", onClick: d }),
        i ? /* @__PURE__ */ p(Ut, { width: `${r}px`, onCancel: c, children: /* @__PURE__ */ p("div", { className: "wx-Yo6BuX0p wx-drop-menu", children: t.map(
          (h, g) => h.items ? /* @__PURE__ */ p(
            En,
            {
              item: h,
              values: n,
              menu: !0,
              onClick: u,
              onChange: o
            },
            h.id || g
          ) : /* @__PURE__ */ p(
            Rr,
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
function xc(t) {
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
  } = t, [l, c] = Ue(e || []), [d, u] = Ue(s || null), h = $(() => xc(l), [l]), g = F(null), m = F(-1), [f, w] = j([]), x = F(h);
  G(() => {
    x.current = h;
  }, [l]);
  const y = F(o);
  G(() => {
    y.current = o;
  }, [o]);
  const b = F(f);
  G(() => {
    b.current = f;
  }, [f]);
  const k = F(!1);
  function N(_) {
    d && (d[_.item.key] = _.value, u({ ...d })), a && a(_);
  }
  function S() {
    const _ = g.current;
    if (!_) return 0;
    const E = _.children, W = x.current || [];
    let H = 0;
    for (let M = 0; M < W.length; M++)
      W[M].comp !== "spacer" && (H += E[M].clientWidth, W[M].comp === "separator" && (H += 8));
    return H;
  }
  function C() {
    const _ = g.current, E = x.current || [];
    if (_) {
      for (let W = E.length - 1; W >= 0; W--)
        if (E[W].items && !E[W].collapsed) {
          E[W].collapsed = !0, E[W].$width = _.children[W].offsetWidth, k.current = !0, c([...E]);
          return;
        }
    }
  }
  function A(_) {
    const E = g.current, W = x.current || [];
    if (E) {
      for (let H = 0; H < W.length; H++)
        if (W[H].collapsed && W[H].$width) {
          W[H].$width - E.children[H].offsetWidth < _ + 10 && (W[H].collapsed = !1, k.current = !0), c([...W]);
          return;
        }
    }
  }
  function V() {
    const _ = g.current;
    if (!_) return;
    const E = x.current || [], W = y.current;
    if (W === "wrap") return;
    const H = _.clientWidth;
    if (_.scrollWidth > H) {
      if (W === "collapse") return C();
      const M = _.children;
      let q = 0;
      for (let le = 0; le < E.length; le++) {
        if (q += M[le].clientWidth, E[le].comp === "separator" && (q += 8), q > H - 40) {
          if (m.current === le) return;
          m.current = le;
          const X = [];
          for (let se = le; se < E.length; se++)
            X.push(E[se]), M[se].style.visibility = "hidden";
          le > 0 && E[le - 1].comp === "separator" && (M[le - 1].style.visibility = "hidden"), w(X);
          break;
        }
        M[le].style.visibility = "";
      }
    } else {
      const M = H - S();
      if (M <= 0) return;
      if (W === "collapse") return A(M);
      if ((b.current || []).length) {
        m.current = null;
        const q = _.children;
        for (let le = 0; le < E.length; le++)
          q[le].style.visibility = "";
        w([]);
      }
    }
  }
  return G(() => {
    k.current && (k.current = !1, V());
  }, [l]), G(() => {
    const _ = new ResizeObserver(() => V());
    return g.current && _.observe(g.current), () => {
      _.disconnect();
    };
  }, []), /* @__PURE__ */ te(
    "div",
    {
      className: `wx-VdPSJj8y wx-toolbar ${r || ""} ${o === "wrap" ? "wx-wrap" : ""}`,
      ref: g,
      children: [
        h.map(
          (_) => _.items ? /* @__PURE__ */ p(
            En,
            {
              item: _,
              values: d,
              onClick: i,
              onChange: N
            },
            _.id
          ) : /* @__PURE__ */ p(
            Rr,
            {
              item: _,
              values: d,
              onClick: i,
              onChange: N
            },
            _.id
          )
        ),
        !!f.length && /* @__PURE__ */ p(
          wc,
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
function yc(t) {
  const { icon: e, text: n = "", css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ te("div", { className: "wx-HXpG4gnx wx-item", onClick: a, children: [
    /* @__PURE__ */ p("i", { className: `wx-HXpG4gnx ${e || "wxi-empty"} ${r || ""}` }),
    n
  ] }) : /* @__PURE__ */ p(
    dt,
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
function vc(t) {
  const { text: e, value: n, children: r } = t;
  return r ? /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: r() }) : /* @__PURE__ */ p("div", { className: "wx-PTEZGYcj wx-label", children: n || e });
}
function kc(t) {
  const { icon: e, text: n, css: r, type: s, disabled: o, menu: i, onClick: a } = t;
  return i ? /* @__PURE__ */ te("div", { className: "wx-3cuSqONJ wx-item", onClick: a, children: [
    e ? /* @__PURE__ */ p("i", { className: `wx-3cuSqONJ ${e || ""} ${r || ""}` }) : null,
    n
  ] }) : /* @__PURE__ */ p(
    dt,
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
function bc({ id: t = "", text: e = "", css: n = "", icon: r = "", onClick: s }) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ te("div", { className: `wx-U0Bx7pIR wx-label ${n}`, onClick: o, children: [
    r ? /* @__PURE__ */ p("i", { className: "wx-U0Bx7pIR " + r }) : null,
    e
  ] });
}
Yt("button", yc);
Yt("separator", Oo);
Yt("spacer", Po);
Yt("label", vc);
Yt("item", bc);
Yt("icon", kc);
const rt = Wt(null);
function Sc(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return n.observe(t.parentNode), {
    destroy() {
      n.disconnect();
    }
  };
}
const ys = 5, $c = 700;
function Cc(t) {
  return zt(t.getAttribute("data-id"));
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
function gr(t, e) {
  const n = Sn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function _c(t, e) {
  const n = e.current;
  let r = null, s, o, i = !1, a = !1;
  const l = document.createElement("DIV");
  l.className = "wx-drag-zone", l.setAttribute("tabindex", -1);
  function c() {
    clearTimeout(s), s = null;
  }
  function d(C) {
    const A = qe(C);
    A && (r = {
      container: l,
      sourceNode: C.target,
      from: Cc(A),
      pos: gr(C, t)
    }, o = r.pos, u(C));
  }
  function u(C) {
    if (!r) return;
    const A = r.pos = gr(C, t);
    if (!i) {
      if (!a && !C?.target?.getAttribute("draggable-data") && Math.abs(o.x - A.x) < ys && Math.abs(o.y - A.y) < ys)
        return;
      if (N(C) === !1) return S();
    }
    if (a) {
      const V = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft, _ = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      r.targetNode = document.elementFromPoint(
        C.pageX - V,
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
    }, $c), k(C);
    function A() {
      s && c(), C.target.removeEventListener("touchmove", x), C.target.removeEventListener("touchend", A), h(C);
    }
    C.target.addEventListener("touchmove", x), C.target.addEventListener("touchend", A), t.addEventListener("contextmenu", y);
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
    const { hasDraggable: A } = n.getDraggableInfo();
    (!A || C.target.getAttribute("draggable-data")) && (document.body.style.userSelect = "none", document.body.style.webkitUserSelect = "none");
  }
  function N(C) {
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
const Tc = 4e-3;
function Nc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1
  };
}
function Dc(t, e, n, r) {
  const { node: s, left: o, top: i, bottom: a, sense: l, xScroll: c, yScroll: d } = r, u = gr(t, s);
  n.scrollState || (n.scrollState = Nc());
  let h = 0, g = 0;
  u.x < o + l ? h = -1 : u.x > e.width - l && (h = 1), u.y < i + Math.round(l / 2) ? g = -1 : u.y > e.height - a - Math.round(l / 2) && (g = 1), (n.scrollState.dirX !== h || n.scrollState.dirY !== g) && (Wo(n), n.scrollState.dirX = h, n.scrollState.dirY = g), (c && n.scrollState.dirX !== 0 || d && n.scrollState.dirY !== 0) && Mc(n, r, {
    x: n.scrollState.dirX,
    y: n.scrollState.dirY
  });
}
function Mc(t, e, n) {
  t.autoScrollTimer || (t.autoScrollTimer = setTimeout(() => {
    t.activeAutoScroll = setInterval(
      Ec,
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
function Ec(t, e, n) {
  const { x: r, y: s } = n;
  t.scrollSpeedFactor += Tc, r !== 0 && Rc(t, e, r), s !== 0 && Ic(t, e, s);
}
function Ic(t, e, n) {
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
function On(t, e, n, r, s, o) {
  const i = {};
  return t && (i.width = `${t}px`, i.minWidth = `${t}px`), e && (i.flexGrow = e), o && (i.height = `${o}px`), n && (i.position = "sticky", n.left && (i.left = `${r}px`), n.right && (i.right = `${s}px`)), i;
}
function Fo(t, e, n) {
  let r = "";
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? "wx-shadow " : "wx-fixed ";
  return r += e.rowspan > 1 ? "wx-rowspan " : "", r += e.colspan > 1 ? "wx-colspan " : "", r += e.vertical ? "wx-vertical " : "", r += n ? n(t) + " " : "", r;
}
function Ac(t) {
  const {
    row: e,
    column: n,
    cellStyle: r = null,
    columnStyle: s = null,
    children: o
  } = t, [i, a] = Ue(t.focusable), l = _e(rt), c = oe(l, "focusCell"), d = oe(l, "search"), u = oe(l, "reorder"), h = $(
    () => d?.rows[e.id] && d.rows[e.id][n.id],
    [d, e.id, n.id]
  ), g = $(
    () => On(
      n.width,
      n.flexgrow,
      n.fixed,
      n.left,
      n.right
    ),
    [n.width, n.flexgrow, n.fixed, n.left, n.right]
  );
  function m(S, C) {
    let A = "wx-cell";
    return A += n.fixed ? " " + (n.fixed === -1 ? "wx-shadow" : "wx-fixed") : "", A += S ? " " + S(n) : "", A += C ? " " + C(e, n) : "", A += n.treetoggle ? " wx-tree-cell" : "", A;
  }
  const f = $(
    () => m(s, r),
    [s, r, n, e]
  ), w = $(() => typeof n.draggable == "function" ? n.draggable(e, n) !== !1 : n.draggable, [n, e]), x = F(null);
  G(() => {
    x.current && i && c?.row === e.id && c?.column === n.id && x.current.focus();
  }, [c, i, e.id, n.id]);
  const y = I(() => {
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
    return String(S).split(C).map((A) => ({ text: A, highlight: C.test(A) }));
  }
  const k = $(() => {
    const S = n.fixed && n.fixed.left === -1 || n.fixed.right === -1, C = n.fixed && n.fixed.right;
    return [
      f,
      S ? "wx-shadow" : "",
      C ? "wx-fixed-right" : ""
    ].filter(Boolean).join(" ");
  }, [f, n]), N = n.cell;
  return /* @__PURE__ */ te(
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
        n.treetoggle ? /* @__PURE__ */ te(Oe, { children: [
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
        ) : o ? o() : h ? /* @__PURE__ */ p("span", { children: b(vt(e, n)).map(
          ({ highlight: S, text: C }, A) => S ? /* @__PURE__ */ p("mark", { className: "wx-TSCaXsGV wx-search", children: C }, A) : /* @__PURE__ */ p("span", { children: C }, A)
        ) }) : vt(e, n)
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
function Hc({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ p(
    ln,
    {
      ...t.config ?? {},
      value: r,
      onChange: s
    }
  );
}
function Lc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = _e(rt), o = oe(s, "flatData"), i = $(
    () => t?.config?.options || e?.options || l(),
    [t, e, o]
  ), a = $(() => t?.config?.template, [t]);
  function l() {
    const u = [];
    return o.forEach((h) => {
      const g = Nt(h, e);
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
    Os,
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
const Oc = {
  text: Hc,
  richselect: Lc
};
function Pc({ filter: t, column: e }) {
  const n = _e(rt), r = oe(n, "filterValues");
  function s(i) {
    n.exec("filter-rows", i);
  }
  const o = $(() => Oc[t.type], [t.type]);
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
    columnStyle: i,
    bodyHeight: a,
    hasSplit: l
  } = t, c = _e(rt), d = oe(c, "sortMarks"), u = $(() => d ? d[n.id] : void 0, [d, n.id]), h = F(), g = I(
    (M) => {
      h.current = e.flexgrow ? M.parentNode.clientWidth : e.width;
    },
    [e.flexgrow, e.width]
  ), m = I(
    (M, q) => {
      c.exec("resize-column", {
        id: e.id,
        width: Math.max(1, (h.current || 0) + M),
        inProgress: q
      });
    },
    [c, e.id]
  ), f = I((M) => m(M, !0), [m]), w = I((M) => m(M, !1), [m]), x = I(
    (M) => {
      if (!n.sort || e.filter) return;
      let q = u?.order;
      q && (q = q === "asc" ? "desc" : "asc"), c.exec("sort-rows", { key: e.id, add: M.ctrlKey, order: q });
    },
    [c, e.id, e.filter, n.sort, u?.order]
  ), y = I(
    (M) => {
      M && M.stopPropagation(), c.exec("collapse-column", { id: e.id, row: r });
    },
    [c, e.id, r]
  ), b = I(
    (M) => {
      M.key === "Enter" && y();
    },
    [y]
  ), k = I(
    (M) => {
      M.key === "Enter" && !e.filter && x(M);
    },
    [x, e.filter]
  ), N = $(
    () => e.collapsed && n.collapsed,
    [e.collapsed, n.collapsed]
  ), S = $(
    () => N && !l && e.collapsible !== "header",
    [N, l, e.collapsible]
  ), C = $(
    () => S ? { top: -a / 2, position: "absolute" } : {},
    [S, a]
  ), A = $(
    () => On(
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
  ), V = $(
    () => Fo(n, e, i),
    [n, e, i]
  ), _ = I(() => Object.fromEntries(
    Object.entries(e).filter(([M]) => M !== "cell")
  ), [e]), E = `wx-cell ${V} ${e.css || ""} wx-collapsed`, W = [
    "wx-cell",
    V,
    e.css || "",
    e.filter ? "wx-filter" : "",
    n.fixed && n.fixed.right ? "wx-fixed-right" : ""
  ].filter(Boolean).join(" "), H = F(null);
  return G(() => {
    const M = H.current;
    if (!M) return;
    const q = vs(M, { down: g, move: f, up: w });
    return () => {
      typeof q == "function" && q();
    };
  }, [g, f, w, vs]), N ? /* @__PURE__ */ p(
    "div",
    {
      className: "wx-RsQD74qC " + E,
      style: A,
      role: "button",
      "aria-label": `Expand column ${e.text || ""}`,
      "aria-expanded": !e.collapsed,
      tabIndex: 0,
      onKeyDown: b,
      onClick: y,
      "data-header-id": n.id,
      children: /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", style: C, children: e.text || "" })
    }
  ) : /* @__PURE__ */ te(
    "div",
    {
      className: "wx-RsQD74qC " + W,
      style: A,
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
          const M = e.cell;
          return /* @__PURE__ */ p(
            M,
            {
              api: c,
              cell: _(),
              column: n,
              row: r,
              onAction: ({ action: q, data: le }) => c.exec(q, le)
            }
          );
        })() : e.filter ? /* @__PURE__ */ p(Pc, { filter: e.filter, column: n }) : /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-text", children: e.text || "" }),
        n.resize && s && !e._hidden ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-RsQD74qC wx-grip",
            role: "presentation",
            "aria-label": "Resize column",
            ref: H,
            onClick: (M) => M.stopPropagation(),
            children: /* @__PURE__ */ p("div", {})
          }
        ) : null,
        o ? /* @__PURE__ */ p("div", { className: "wx-RsQD74qC wx-sort", children: u ? /* @__PURE__ */ te(Oe, { children: [
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
  const s = _e(rt), o = $(
    () => On(
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
    () => Fo(e, t, r),
    [e, t, r]
  ), a = I(() => Object.fromEntries(
    Object.entries(t || {}).filter(([c]) => c !== "cell")
  ), [t]), l = `wx-6Sdi3Dfd wx-cell ${i || ""} ${t?.css || ""}` + (e?.fixed && e?.fixed.right ? " wx-fixed-right" : "");
  return /* @__PURE__ */ p("div", { className: l, style: o, children: !e?.collapsed && !t?.collapsed ? t?.cell ? Bo.createElement(t.cell, {
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
  const i = _e(rt), a = oe(i, "_sizes"), l = oe(i, "split"), c = $(() => a?.[`${r}RowHeights`], [a, r]), d = $(() => {
    let f = [];
    if (n && n.length) {
      const w = n[0][r].length;
      for (let x = 0; x < w; x++) {
        let y = 0;
        f.push([]), n.forEach((b, k) => {
          const N = { ...b[r][x] };
          if (y || f[x].push(N), N.colspan > 1) {
            if (y = N.colspan - 1, !Mo() && b.right) {
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
function Fc({ overlay: t }) {
  const e = _e(rt);
  function n(s) {
    return typeof s == "function";
  }
  const r = t;
  return /* @__PURE__ */ p("div", { className: "wx-1ty666CQ wx-overlay", children: n(t) ? /* @__PURE__ */ p(r, { onAction: ({ action: s, data: o }) => e.exec(s, o) }) : t });
}
function Uc(t) {
  const { actions: e, editor: n } = t, [r, s] = j(n?.value || ""), o = F(null);
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
function Yc({ actions: t, editor: e, onAction: n }) {
  const [r, s] = j(e?.value), [o, i] = j(e?.renderedValue), [a, l] = j(e?.options || []), c = $(() => e?.config?.template, [e]), d = $(() => e?.config?.cell, [e]), u = $(() => (a || []).findIndex((y) => y.id === r), [a, r]), h = F(null), g = F(null), m = I(
    (y) => {
      h.current = y.navigate, g.current = y.keydown, h.current(u);
    },
    [u, h]
  ), f = I(
    (y) => {
      const b = y?.target?.value ?? "";
      i(b);
      const k = b ? (e?.options || []).filter(
        (N) => (N.label || "").toLowerCase().includes(b.toLowerCase())
      ) : e?.options || [];
      l(k), k.length ? h.current(-1 / 0) : h.current(null);
    },
    [e]
  ), w = F(null);
  G(() => {
    w.current && w.current.focus();
  }, []), G(() => {
    s(e?.value), i(e?.renderedValue), l(e?.options || []);
  }, [e]);
  const x = I(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t]
  );
  return /* @__PURE__ */ te(Oe, { children: [
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
      In,
      {
        items: a,
        onReady: m,
        onSelect: x,
        children: ({ option: y }) => c ? c(y) : d ? /* @__PURE__ */ p(d, { data: y, onAction: n }) : y.label
      }
    )
  ] });
}
function Vc({ actions: t, editor: e, onAction: n }) {
  const [r] = j(() => e.value || /* @__PURE__ */ new Date()), [s] = j(() => e.config?.template), [o] = j(() => e.config?.cell);
  function i({ value: l }) {
    t.updateValue(l), t.save();
  }
  const a = F(null);
  return G(() => {
    a.current && a.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ te(Oe, { children: [
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
      Ls,
      {
        value: r,
        onChange: i,
        buttons: e.config?.buttons
      }
    ) })
  ] });
}
function Gc(t) {
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
  const m = F(null);
  return G(() => {
    m.current && m.current.focus(), typeof window < "u" && window.getSelection && window.getSelection().removeAllRanges();
  }, []), /* @__PURE__ */ te(Oe, { children: [
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
    /* @__PURE__ */ p(In, { items: a, onReady: g, onSelect: c, children: ({ option: f }) => s.template ? s.template(f) : s.cell ? (() => {
      const w = s.cell;
      return /* @__PURE__ */ p(w, { data: f, onAction: r });
    })() : f.label })
  ] });
}
const Bc = {
  text: Uc,
  combo: Yc,
  datepicker: Vc,
  richselect: Gc
};
function Kc({ column: t, row: e }) {
  const n = _e(rt), r = oe(n, "editor"), s = I(
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
    () => On(
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
    return Bc[f];
  }, [t, e]), u = F(null);
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
  const { columns: e, type: n, columnStyle: r } = t, s = _e(rt), { filterValues: o, _columns: i, _sizes: a } = s.getState();
  function l(c) {
    return r ? " " + r(c) : "";
  }
  return /* @__PURE__ */ p(Oe, { children: e.map((c, d) => /* @__PURE__ */ p("tr", { children: c.map((u) => {
    const h = i.find((f) => f.id == u.id), g = `wx-print-cell-${n}${l(h)}${u.filter ? " wx-print-cell-filter" : ""}${u.vertical ? " wx-vertical" : ""}`, m = u.cell;
    return /* @__PURE__ */ p(
      "th",
      {
        style: Rs(Do(u, a.columnWidth)),
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
        ) : u.filter ? /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-print-filter", children: Pl(o, i, u) }) : /* @__PURE__ */ p("div", { className: "wx-Gy81xq2u wx-text", children: u.text ?? "" })
      },
      u.id
    );
  }) }, d)) });
}
function jc(t) {
  const { columns: e, rowStyle: n, columnStyle: r, cellStyle: s, header: o, footer: i, reorder: a } = t, l = _e(rt), { flatData: c, _sizes: d } = l.getState(), u = o && hs(e, "header", d.headerRowHeights), h = i && hs(e, "footer", d.footerRowHeights);
  function g(f, w) {
    let x = "";
    return x += r ? " " + r(w) : "", x += s ? " " + s(f, w) : "", x;
  }
  function m(f, w) {
    return typeof w.draggable == "function" ? w.draggable(f, w) !== !1 : w.draggable;
  }
  return /* @__PURE__ */ te(
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
              (x) => x.collapsed ? null : /* @__PURE__ */ te(
                "td",
                {
                  className: `wx-8NTMLH0z wx-print-cell wx-cell ${g(f, x)}`,
                  style: Rs(
                    Do(x, d.columnWidth)
                  ),
                  children: [
                    a && x.draggable ? /* @__PURE__ */ p("span", { className: "wx-8NTMLH0z wx-print-draggable", children: m(f, x) ? /* @__PURE__ */ p("i", { className: "wx-8NTMLH0z wxi-drag" }) : null }) : null,
                    x.treetoggle ? /* @__PURE__ */ te(Oe, { children: [
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
                    })() : /* @__PURE__ */ p("span", { children: vt(f, x) })
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
function qc(t) {
  const { config: e, ...n } = t, r = _e(rt), { _skin: s, _columns: o } = r.getState(), i = $(() => Al(o, e), []), a = F(null);
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
      children: i.map((l, c) => /* @__PURE__ */ p("div", { className: "wx-4zwCKA7C wx-print-grid-wrapper", children: /* @__PURE__ */ p(jc, { columns: l, ...n }) }, c))
    }
  );
}
function Xc(t) {
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
  } = t, f = _e(rt), w = oe(f, "dynamic"), x = oe(f, "_columns"), y = oe(f, "flatData"), b = oe(f, "split"), k = oe(f, "_sizes"), [N, S] = Zt(f, "selectedRows"), C = oe(f, "select"), A = oe(f, "editor"), V = oe(f, "tree"), _ = oe(f, "focusCell"), E = oe(f, "_print"), W = oe(f, "undo"), H = oe(f, "reorder"), M = oe(f, "_rowHeightFromData"), [q, le] = j(0);
  G(() => {
    le(It());
  }, []);
  const [X, se] = j(0), [ce, $e] = j(0), O = $(() => (x || []).some((R) => !R.hidden && R.flexgrow), [x]), ae = $(() => k?.rowHeight || 0, [k]), ve = F(null), [fe, Ne] = j(null), [De, Pe] = j(null), de = $(() => {
    let R = [], ne = 0;
    return b && b.left && (R = (x || []).slice(0, b.left).filter((he) => !he.hidden).map((he) => ({ ...he })), R.forEach((he) => {
      he.fixed = { left: 1 }, he.left = ne, ne += he.width;
    }), R.length && (R[R.length - 1].fixed = { left: -1 })), { columns: R, width: ne };
  }, [b, x]), z = $(() => {
    let R = [], ne = 0;
    if (b && b.right) {
      R = (x || []).slice(b.right * -1).filter((he) => !he.hidden).map((he) => ({ ...he }));
      for (let he = R.length - 1; he >= 0; he--) {
        const Re = R[he];
        Re.fixed = { right: 1 }, Re.right = ne, ne += Re.width;
      }
      R.length && (R[0].fixed = { right: -1 });
    }
    return { columns: R, width: ne };
  }, [b, x]), J = $(() => {
    const R = (x || []).slice(b?.left || 0, (x || []).length - (b?.right ?? 0)).filter((ne) => !ne.hidden);
    return R.forEach((ne) => {
      ne.fixed = 0;
    }), R;
  }, [x, b]), ie = $(() => (x || []).reduce((R, ne) => (ne.hidden || (R += ne.width), R), 0), [x]), xe = 1;
  function ye(R, ne, he) {
    let Re = ne, v = R;
    if (J.length) {
      let D = J.length;
      for (let T = R; T >= 0; T--)
        J[T][he].forEach((P) => {
          P.colspan > 1 && T > R - P.colspan && T < D && (D = T);
        });
      if (D !== J.length && D < R) {
        for (let T = D; T < R; T++)
          Re -= J[T].width;
        v = D;
      }
    }
    return { index: v, delta: Re };
  }
  const Se = $(() => {
    let R, ne, he;
    const Re = X, v = X + (u || 0);
    let D = 0, T = 0, P = 0, Q = 0;
    J.forEach((tt, nt) => {
      Re > P && (D = nt, Q = P), P = P + tt.width, v > P && (T = nt + xe);
    });
    const Z = { header: 0, footer: 0 };
    for (let tt = T; tt >= D; tt--)
      ["header", "footer"].forEach((nt) => {
        J[tt] && J[tt][nt].forEach((Be) => {
          const wt = Be.colspan;
          if (wt && wt > 1) {
            const xt = wt - (T - tt + 1);
            xt > 0 && (Z[nt] = Math.max(Z[nt], xt));
          }
        });
      });
    const Y = ye(D, Q, "header"), re = ye(D, Q, "footer"), be = Y.delta, Ce = Y.index, Ae = re.delta, Fe = re.index;
    return O && ie > (u || 0) ? R = ne = he = [...de.columns, ...J, ...z.columns] : (R = [
      ...de.columns,
      ...J.slice(D, T + 1),
      ...z.columns
    ], ne = [
      ...de.columns,
      ...J.slice(Ce, T + Z.header + 1),
      ...z.columns
    ], he = [
      ...de.columns,
      ...J.slice(Fe, T + Z.footer + 1),
      ...z.columns
    ]), {
      data: R || [],
      header: ne || [],
      footer: he || [],
      d: Q,
      df: Ae,
      dh: be
    };
  }, [
    J,
    de,
    z,
    X,
    u,
    O,
    ie
  ]), He = $(
    () => e && k?.headerHeight || 0,
    [e, k]
  ), B = $(
    () => n && k?.footerHeight || 0,
    [n, k]
  ), pe = $(() => u && h ? ie >= u : !1, [u, h, ie]), U = $(() => (h || 0) - He - B - (pe ? q : 0), [h, He, B, pe, q]), me = $(() => Math.ceil((U || 0) / (ae || 1)) + 1, [U, ae]), ke = F([]), [ge, We] = j(0), [Ve, Xe] = j(void 0), we = $(() => {
    let R = 0, ne = 0;
    const he = 2;
    if (c) {
      let D = ce;
      for (; D > 0; )
        D -= ke.current[R] || ae, R++;
      ne = ce - D;
      for (let T = Math.max(0, R - he - 1); T < R; T++)
        ne -= ke.current[R - T] || ae;
      R = Math.max(0, R - he);
    } else {
      if (M) {
        let D = 0, T = 0;
        for (let Y = 0; Y < (y || []).length; Y++) {
          const re = y[Y].rowHeight || ae;
          if (T + re > ce) {
            D = Y;
            break;
          }
          T += re;
        }
        R = Math.max(0, D - he);
        for (let Y = 0; Y < R; Y++)
          ne += y[Y].rowHeight || ae;
        let P = 0, Q = 0;
        for (let Y = D + 1; Y < (y || []).length; Y++) {
          const re = y[Y].rowHeight || ae;
          if (P++, Q + re > U)
            break;
          Q += re;
        }
        const Z = Math.min(
          w ? w.rowCount : (y || []).length,
          D + P + he
        );
        return { d: ne, start: R, end: Z };
      }
      R = Math.floor(ce / (ae || 1)), R = Math.max(0, R - he), ne = R * (ae || 0);
    }
    const Re = w ? w.rowCount : (y || []).length, v = Math.min(Re, R + (me || 0) + he);
    return { d: ne, start: R, end: v };
  }, [c, M, ce, ae, w, y, me, U]), Ee = $(() => {
    const R = w ? w.rowCount : (y || []).length;
    if (c)
      return ge + we.d + (R - (Ve || 0)) * (ae || 0);
    if (!M)
      return R * (ae || 0);
    let ne = 0;
    for (let he = 0; he < R; he++)
      ne += y[he]?.rowHeight || ae;
    return ne;
  }, [
    w,
    y,
    ae,
    c,
    M,
    ge,
    we.d,
    Ve
  ]), Me = $(() => u && h ? Ee + He + B >= h - (ie >= (u || 0) ? q : 0) : !1, [
    u,
    h,
    Ee,
    He,
    B,
    ie,
    q
  ]), Ye = $(() => O && ie <= (u || 0) ? (u || 0) - 0 - (Me ? q : 0) : ie, [O, ie, u, Me, q, pe]), L = $(() => O && ie <= (u || 0) ? u || 0 : Ye < (u || 0) ? ie + (Me ? q : 0) : -1, [O, ie, u, Ye, Me, q]), K = F({});
  G(() => {
    if (w && (K.current.start !== we.start || K.current.end !== we.end)) {
      const { start: R, end: ne } = we;
      K.current = { start: R, end: ne }, f && f.exec && f.exec("request-data", { row: { start: R, end: ne } });
    }
  }, [w, we, f]);
  const ee = $(() => w ? y || [] : (y || []).slice(we.start, we.end), [w, y, we]), ue = $(() => (N || []).filter(
    (R) => (ee || []).some((ne) => ne.id === R)
  ), [S, ee]), Ie = $(() => we.start, [we.start]), Le = I((R) => {
    $e(R.target.scrollTop), se(R.target.scrollLeft);
  }, []), ze = I((R) => {
    R.shiftKey && R.preventDefault(), ve.current && ve.current.focus && ve.current.focus();
  }, []), Ge = I(() => !!(x || []).find((R) => !!R.draggable), [x]), ht = F(null), gt = F(null), Pn = F({
    dblclick: (R, ne) => {
      const he = { id: R, column: tr(ne, "data-col-id") };
      f.exec("open-editor", he);
    },
    click: (R, ne) => {
      if (ht.current) return;
      const he = tr(ne, "data-col-id");
      if (_?.id !== R && f.exec("focus-cell", {
        row: R,
        column: he,
        eventSource: "click"
      }), C === !1) return;
      const Re = s && ne.ctrlKey, v = s && ne.shiftKey;
      (Re || N.length > 1 || !N.includes(R)) && f.exec("select-row", { id: R, toggle: Re, range: v });
    },
    "toggle-row": (R) => {
      const ne = f.getRow(R);
      f.exec(ne.open !== !1 ? "close-row" : "open-row", { id: R });
    },
    "ignore-click": () => !1
  }), pt = $(() => ({
    top: He,
    bottom: B,
    left: de.width,
    xScroll: pe,
    yScroll: Me,
    sense: c && De ? De.offsetHeight : Math.max(k?.rowHeight || 0, 40),
    node: ve.current && ve.current.firstElementChild
  }), [
    He,
    B,
    de.width,
    pe,
    Me,
    c,
    De,
    k
  ]);
  function Wn(R, ne) {
    const { container: he, sourceNode: Re, from: v } = ne;
    if (Ge() && !Re.getAttribute("draggable-data"))
      return !1;
    Ne(v), f.getRow(v).open && f.exec("close-row", { id: v, nested: !0 });
    const D = qe(Re, "data-id"), T = D.cloneNode(!0);
    T.classList.remove("wx-selected"), T.querySelectorAll("[tabindex]").forEach((Y) => Y.setAttribute("tabindex", "-1")), he.appendChild(T), Pe(T);
    const P = X - Se.d, Q = Me ? q : 0;
    he.style.width = Math.min(
      (u || 0) - Q,
      O && ie <= (u || 0) ? Ye : Ye - Q
    ) + P + "px";
    const Z = Sn(D);
    ne.offset = {
      x: P,
      y: -Math.round(Z.height / 2)
    }, gt.current || (gt.current = R.clientY);
  }
  function zn(R, ne) {
    const { from: he } = ne, Re = ne.pos, v = Sn(ve.current);
    Re.x = v.x;
    const D = pt.top;
    if (Re.y < D) Re.y = D;
    else {
      const T = v.height - (pe && q > 0 ? q : Math.round(pt.sense / 2)) - pt.bottom;
      Re.y > T && (Re.y = T);
    }
    if (ve.current.contains(ne.targetNode)) {
      const T = qe(ne.targetNode, "data-id"), P = zt(T?.getAttribute("data-id"));
      if (P && P !== he) {
        ne.to = P;
        const Q = c ? De?.offsetHeight : k?.rowHeight;
        if (De && (ce === 0 || Re.y > D + Q - 1)) {
          const Z = T.getBoundingClientRect(), Y = Sn(De).y, re = Z.y, be = Y > re ? -1 : 1, Ce = be === 1 ? "after" : "before", Ae = Math.abs(f.getRowIndex(he) - f.getRowIndex(P)), Fe = Ae !== 1 ? Ce === "before" ? "after" : "before" : Ce;
          if (Ae === 1 && (be === -1 && R.clientY > gt.current || be === 1 && R.clientY < gt.current))
            return;
          gt.current = R.clientY, f.exec("move-item", {
            id: he,
            target: P,
            mode: Fe,
            inProgress: !0
          });
        }
      }
      o && o({ event: R, context: ne });
    }
    Dc(R, v, ne, pt);
  }
  function Fn(R, ne) {
    const { from: he, to: Re } = ne;
    f.exec("move-item", {
      id: he,
      target: Re,
      inProgress: !1
    }), ht.current = setTimeout(() => {
      ht.current = 0;
    }, 1), Ne(null), Pe(null), gt.current = null, Wo(ne);
  }
  function It() {
    const R = document.createElement("div");
    R.style.cssText = "position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;", document.body.appendChild(R);
    const ne = R.offsetWidth - R.clientWidth;
    return document.body.removeChild(R), ne;
  }
  const Rt = $(() => L > 0 ? { width: `${L}px` } : void 0, [L]), Vt = F(null);
  function dn() {
    Promise.resolve().then(() => {
      let R = 0, ne = Ie;
      const he = Vt.current;
      he && (Array.from(he.children).forEach((Re, v) => {
        ke.current[Ie + v] = Re.offsetHeight, R += Re.offsetHeight, ne++;
      }), We(R), Xe(ne));
    });
  }
  G(() => {
    ee && c && dn();
  }, [ee, c, Ie]);
  let [mt, Gt] = j();
  G(() => {
    if (_ && (!C || !ue.length || ue.includes(_.row)))
      Gt({ ..._ });
    else if (ee.length && Se.data.length) {
      if (!mt || ue.length && !ue.includes(mt.row) || ee.findIndex((R) => R.id == mt.row) === -1 || Se.data.findIndex(
        (R) => R.id == mt.column && !R.collapsed
      ) === -1) {
        const R = ue[0] || ee[0].id, ne = Se.data.findIndex((he) => !he.collapsed);
        Gt(ne !== -1 ? { row: R, column: Se.data[ne].id } : null);
      }
    } else Gt(null);
  }, [_]);
  const un = F(null);
  G(() => {
    const R = ve.current;
    if (!R) return;
    const ne = Sc(R, d);
    return () => {
      typeof ne == "function" && ne();
    };
  }, [d]);
  const fn = F({});
  Object.assign(fn.current, {
    start: Wn,
    move: zn,
    end: Fn,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: Ge() })
  }), G(() => {
    const R = ve.current;
    return R ? _c(R, fn).destroy : void 0;
  }, [H, ve.current]), G(() => {
    const R = ve.current;
    return R ? Er(R, {
      keys: m !== !1 && {
        ...sc,
        "ctrl+z": W,
        "ctrl+y": W,
        ...m
      },
      exec: (ne) => f.exec("hotkey", ne)
    }).destroy : void 0;
  }, [f, W, m]);
  const bt = F({
    scroll: f.getReactiveState().scroll
  });
  bt.current.getWidth = () => (u || 0) - (Me ? q : 0), bt.current.getHeight = () => U, bt.current.getScrollMargin = () => de.width + z.width, G(() => {
    oc(un.current, bt.current);
  }, []);
  const Bt = F(null);
  G(() => {
    const R = Bt.current;
    if (!R) return;
    const ne = [];
    return ne.push(
      rn(R, () => f.exec("focus-cell", { eventSource: "click" })).destroy
    ), ne.push(fi(R, Pn.current)), () => ne.forEach((he) => he());
  }, []);
  const hn = `wx-grid ${g ? `wx-responsive-${g}` : ""}`;
  return /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        className: "wx-4VuBwK2D " + hn,
        style: {
          "--header-height": `${He}px`,
          "--footer-height": `${B}px`,
          "--split-left-width": `${de.width}px`,
          "--split-right-width": `${z.width}px`
        },
        children: /* @__PURE__ */ p(
          "div",
          {
            ref: ve,
            className: "wx-4VuBwK2D wx-table-box",
            style: Rt,
            role: V ? "treegrid" : "grid",
            "aria-colcount": Se.data.length,
            "aria-rowcount": ee.length,
            "aria-multiselectable": V && s ? !0 : void 0,
            tabIndex: -1,
            children: /* @__PURE__ */ te(
              "div",
              {
                ref: un,
                className: "wx-4VuBwK2D wx-scroll",
                style: {
                  overflowX: pe ? "scroll" : "hidden",
                  overflowY: Me ? "scroll" : "hidden"
                },
                onScroll: Le,
                children: [
                  e ? /* @__PURE__ */ p("div", { className: "wx-4VuBwK2D wx-header-wrapper", children: /* @__PURE__ */ p(
                    ks,
                    {
                      contentWidth: Ye,
                      deltaLeft: Se.dh,
                      columns: Se.header,
                      columnStyle: a,
                      bodyHeight: U - +n
                    }
                  ) }) : null,
                  /* @__PURE__ */ te(
                    "div",
                    {
                      ref: Bt,
                      className: "wx-4VuBwK2D wx-body",
                      style: { width: `${Ye}px`, height: `${Ee}px` },
                      onMouseDown: (R) => ze(R),
                      children: [
                        r ? /* @__PURE__ */ p(Fc, { overlay: r }) : null,
                        /* @__PURE__ */ p(
                          "div",
                          {
                            ref: Vt,
                            className: "wx-4VuBwK2D wx-data",
                            style: {
                              paddingTop: `${we.d}px`,
                              paddingLeft: `${Se.d}px`
                            },
                            children: ee.map((R, ne) => {
                              const he = N.indexOf(R.id) !== -1, Re = fe === R.id, v = "wx-row" + (c ? " wx-autoheight" : "") + (i ? " " + i(R) : "") + (he ? " wx-selected" : "") + (Re ? " wx-inactive" : ""), D = c ? { minHeight: `${R.rowHeight || ae}px` } : { height: `${R.rowHeight || ae}px` };
                              return /* @__PURE__ */ p(
                                "div",
                                {
                                  className: "wx-4VuBwK2D " + v,
                                  "data-id": R.id,
                                  "data-context-id": R.id,
                                  style: D,
                                  role: "row",
                                  "aria-rowindex": ne,
                                  "aria-expanded": R.open,
                                  "aria-level": V ? R.$level + 1 : void 0,
                                  "aria-selected": V ? he : void 0,
                                  tabIndex: -1,
                                  children: Se.data.map((T) => T.collapsed ? /* @__PURE__ */ p(
                                    "div",
                                    {
                                      className: "wx-4VuBwK2D wx-cell wx-collapsed"
                                    },
                                    T.id
                                  ) : A?.id === R.id && A.column == T.id ? /* @__PURE__ */ p(Kc, { row: R, column: T }, T.id) : /* @__PURE__ */ p(
                                    Ac,
                                    {
                                      row: R,
                                      column: T,
                                      columnStyle: a,
                                      cellStyle: l,
                                      reorder: H,
                                      focusable: mt?.row === R.id && mt?.column == T.id
                                    },
                                    T.id
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
                      deltaLeft: Se.df,
                      columns: Se.footer,
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
    E ? /* @__PURE__ */ p(
      qc,
      {
        config: E,
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
const Qc = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Zc = Dt(function({
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
  sortMarks: N,
  undo: S = !1,
  hotkeys: C = null,
  ...A
}, V) {
  const _ = F();
  _.current = A;
  const E = $(() => new Zl(As), []), W = $(() => E.in, [E]), H = F(null);
  H.current === null && (H.current = new Fs((de, z) => {
    const J = "on" + Qc(de);
    _.current && _.current[J] && _.current[J](z);
  }), W.setNext(H.current));
  const M = $(
    () => ({
      getState: E.getState.bind(E),
      getReactiveState: E.getReactive.bind(E),
      getStores: () => ({ data: E }),
      exec: W.exec,
      setNext: (de) => (H.current = H.current.setNext(de), H.current),
      intercept: W.intercept.bind(W),
      on: W.on.bind(W),
      detach: W.detach.bind(W),
      getRow: E.getRow.bind(E),
      getRowIndex: E.getRowIndex.bind(E),
      getColumn: E.getColumn.bind(E)
    }),
    [E, W]
  ), [q, le] = j(0), [X, se] = j(0), [ce, $e] = j(null), [O, ae] = j(null), ve = $(() => {
    if (y && !e.length && t.length) {
      const de = t[0], z = [];
      for (let J in de)
        if (J !== "id" && J[0] !== "$") {
          let ie = {
            id: J,
            header: J[0].toUpperCase() + J.slice(1)
          };
          typeof y == "object" && (ie = { ...ie, ...y }), z.push(ie);
        }
      return z;
    }
    return (O && O.columns) ?? e;
  }, [y, e, t, O]), fe = $(
    () => (O && O.sizes) ?? f,
    [O, f]
  ), Ne = I(
    (de) => {
      if (le(de.width), se(de.height), k) {
        const z = Object.keys(k).map(Number).sort((J, ie) => J - ie).find((J) => de.width <= J) ?? null;
        z !== ce && (ae(k[z]), $e(z));
      }
    },
    [k, ce]
  ), De = _e(et.theme), Pe = F(0);
  return G(() => {
    if (!Pe.current)
      b && b(M);
    else {
      const de = E.getState();
      E.init({
        data: t,
        columns: ve,
        split: w || de.split,
        sizes: fe || de.sizes,
        selectedRows: o || de.selectedRows,
        dynamic: d,
        tree: x,
        sortMarks: N || de.sortMarks,
        undo: S,
        reorder: h,
        _skin: De,
        _select: i
      });
    }
    Pe.current++;
  }, [
    E,
    t,
    ve,
    w,
    fe,
    o,
    d,
    x,
    N,
    S,
    h,
    De,
    i,
    b,
    M
  ]), Pe.current === 0 && E.init({
    data: t,
    columns: ve,
    split: w || { left: 0 },
    sizes: fe || {},
    selectedRows: o || [],
    dynamic: d,
    tree: x,
    sortMarks: N || {},
    undo: S,
    reorder: h,
    _skin: De,
    select: i
  }), Mt(
    V,
    () => ({
      ...M
    }),
    [M]
  ), /* @__PURE__ */ p(rt.Provider, { value: M, children: /* @__PURE__ */ p(Rn, { words: lc, optional: !0, children: /* @__PURE__ */ p(
    Xc,
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
      clientWidth: q,
      clientHeight: X,
      responsiveLevel: ce,
      resize: Ne,
      hotkeys: C
    }
  ) }) });
});
function Jc({ item: t }) {
  return /* @__PURE__ */ te(
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
function ed({ columns: t = null, api: e, children: n }) {
  G(() => {
    fc("table-header", Jc);
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
  const i = lt(e, "_columns"), a = $(() => {
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
    Ho,
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
mr(Je);
function td({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ te("div", { className: "wx-pqc08MHU wx-content", style: n(t, e), children: [
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
function nd(t) {
  const {
    readonly: e,
    compactMode: n,
    width: r = 0,
    display: s = "all",
    columnWidth: o = 0,
    onTableAPIChange: i,
    multiTaskRows: a = !1,
    rowMapping: l = null
  } = t, [c, d] = Ue(o), [u, h] = j(), g = _e(et.i18n), m = $(() => g.getGroup("gantt"), [g]), f = _e(kt), w = oe(f, "scrollTop"), x = oe(f, "cellHeight"), y = oe(f, "_scrollTask"), b = oe(f, "_selected"), k = oe(f, "area"), N = oe(f, "_tasks"), S = oe(f, "_scales"), C = oe(f, "columns"), A = oe(f, "_sort"), V = oe(f, "calendar"), _ = oe(f, "durationUnit"), E = oe(f, "splitTasks"), [W, H] = j(null), M = $(() => !N || !k ? [] : a && l ? N : N.slice(k.start, k.end), [N, k, a, l]), q = I(
    (L, K) => {
      if (K === "add-task")
        f.exec(K, {
          target: L,
          task: { text: m("New Task") },
          mode: "child",
          show: !0
        });
      else if (K === "open-task") {
        const ee = M.find((ue) => ue.id === L);
        (ee?.data || ee?.lazy) && f.exec(K, { id: L, mode: !ee.open });
      }
    },
    [M]
  ), le = I(
    (L) => {
      const K = Ct(L), ee = L.target.dataset.action;
      ee && L.preventDefault(), K ? ee === "add-task" || ee === "open-task" ? q(K, ee) : f.exec("select-task", {
        id: K,
        toggle: L.ctrlKey || L.metaKey,
        range: L.shiftKey,
        show: !0
      }) : ee === "add-task" && q(null, ee);
    },
    [f, q]
  ), X = F(null), se = F(null), [ce, $e] = j(0), [O, ae] = j(!1);
  G(() => {
    const L = se.current;
    if (!L || typeof ResizeObserver > "u") return;
    const K = () => $e(L.clientWidth);
    K();
    const ee = new ResizeObserver(K);
    return ee.observe(L), () => ee.disconnect();
  }, []);
  const ve = F(null), fe = I(
    (L) => {
      const K = L.id, { before: ee, after: ue } = L, Ie = L.onMove;
      let Le = ee || ue, ze = ee ? "before" : "after";
      if (Ie) {
        if (ze === "after") {
          const Ge = f.getTask(Le);
          Ge.data?.length && Ge.open && (ze = "before", Le = Ge.data[0].id);
        }
        ve.current = { id: K, [ze]: Le };
      } else ve.current = null;
      f.exec("move-task", {
        id: K,
        mode: ze,
        target: Le,
        inProgress: Ie
      });
    },
    [f]
  ), Ne = $(() => a && l ? 0 : k?.from ?? 0, [k, a, l]), De = $(() => S?.height ?? 0, [S]), Pe = $(() => !n && s !== "grid" ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (ce ?? 0), [n, s, c, r, ce]), de = $(() => {
    const L = {};
    return Pe && s === "all" || s === "grid" && Pe ? L.width = c : s === "grid" && (L.width = "100%"), L;
  }, [Pe, s, c]), z = $(() => W && !M.find((L) => L.id === W.id) ? [...M, W] : M, [M, W]), J = $(() => {
    if (!a || !l) return z;
    const L = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Set();
    return z.forEach((ee) => {
      const ue = l.taskRows.get(ee.id) ?? ee.id;
      K.has(ue) || (L.set(ue, {
        ...ee,
        $rowTasks: l.rowMap.get(ue) || [ee.id]
      }), K.add(ue));
    }), Array.from(L.values());
  }, [z, a, l]), ie = $(() => {
    let L = (C || []).map((ue) => {
      ue = { ...ue };
      const Ie = ue.header;
      if (typeof Ie == "object") {
        const Le = Ie.text && m(Ie.text);
        ue.header = { ...Ie, text: Le };
      } else ue.header = m(Ie);
      return ue;
    });
    const K = L.findIndex((ue) => ue.id === "text"), ee = L.findIndex((ue) => ue.id === "add-task");
    if (K !== -1 && (L[K].cell && (L[K]._cell = L[K].cell), L[K].cell = td), ee !== -1) {
      L[ee].cell = L[ee].cell || Ss;
      const ue = L[ee].header;
      if (typeof ue != "object" && (L[ee].header = { text: ue }), L[ee].header.cell = ue.cell || Ss, e)
        L.splice(ee, 1);
      else if (n) {
        const [Ie] = L.splice(ee, 1);
        L.unshift(Ie);
      }
    }
    return L.length > 0 && (L[L.length - 1].resize = !1), L;
  }, [C, m, e, n]), xe = $(() => s === "all" ? `${r}px` : s === "grid" ? "calc(100% - 4px)" : ie.find((L) => L.id === "add-task") ? "50px" : "0", [s, r, ie]), ye = $(() => {
    if (J && A?.length) {
      const L = {};
      return A.forEach(({ key: K, order: ee }, ue) => {
        L[K] = {
          order: ee,
          ...A.length > 1 && { index: ue }
        };
      }), L;
    }
    return {};
  }, [J, A]), Se = I(() => ie.some((L) => L.flexgrow && !L.hidden), []), He = $(() => Se(), [Se, O]), B = $(() => {
    let L = s === "chart" ? ie.filter((ee) => ee.id === "add-task") : ie;
    const K = s === "all" ? r : ce;
    if (!He) {
      let ee = c, ue = !1;
      if (ie.some((Ie) => Ie.$width)) {
        let Ie = 0;
        ee = ie.reduce((Le, ze) => (ze.hidden || (Ie += ze.width, Le += ze.$width || ze.width), Le), 0), Ie > ee && ee > K && (ue = !0);
      }
      if (ue || ee < K) {
        let Ie = 1;
        return ue || (Ie = (K - 50) / (ee - 50 || 1)), L.map((Le) => (Le.id !== "add-task" && !Le.hidden && (Le.$width || (Le.$width = Le.width), Le.width = Le.$width * Ie), Le));
      }
    }
    return L;
  }, [s, ie, He, c, r, ce]), pe = I(
    (L) => {
      if (!Se()) {
        const K = B.reduce((ee, ue) => (L && ue.$width && (ue.$width = ue.width), ee + (ue.hidden ? 0 : ue.width)), 0);
        K !== c && d(K);
      }
      ae(!0), ae(!1);
    },
    [Se, B, c, d]
  ), U = I(() => {
    ie.filter((K) => K.flexgrow && !K.hidden).length === 1 && ie.forEach((K) => {
      K.$width && !K.flexgrow && !K.hidden && (K.width = K.$width);
    });
  }, []), me = I(
    (L) => {
      if (!e) {
        const K = Ct(L), ee = tr(L, "data-col-id");
        !(ee && ie.find((Ie) => Ie.id == ee))?.editor && K && f.exec("show-editor", { id: K });
      }
    },
    [f, e]
    // cols is defined later; relies on latest value at call time
  ), ke = $(
    () => Array.isArray(b) ? b.map((L) => L.id) : [],
    [b]
  ), ge = F(Ne);
  ge.current = Ne, G(() => {
    const L = (ee) => {
      if (X.current) {
        const ue = X.current.querySelector(".wx-body");
        ue && (ue.style.top = -((ee ?? 0) - (ge.current ?? 0)) + "px");
      }
      se.current && (se.current.scrollTop = 0);
    };
    return L(w), f.on("scroll-chart", ({ top: ee }) => {
      ee !== void 0 && L(ee);
    });
  }, [f, w]), G(() => {
    if (X.current) {
      const L = X.current.querySelector(".wx-body");
      L && (L.style.top = -((w ?? 0) - (Ne ?? 0)) + "px");
    }
  }, [Ne]), G(() => {
    const L = X.current;
    if (!L) return;
    const K = L.querySelector(".wx-table-box .wx-body");
    if (!K || typeof ResizeObserver > "u") return;
    const ee = new ResizeObserver(() => {
      if (X.current) {
        const ue = X.current.querySelector(".wx-body");
        ue && (ue.style.top = -((w ?? 0) - (ge.current ?? 0)) + "px");
      }
    });
    return ee.observe(K), () => {
      ee.disconnect();
    };
  }, [B, de, s, xe, J, w]), G(() => {
    if (!y || !u) return;
    const { id: L } = y, K = u.getState().focusCell;
    K && K.row !== L && X.current && X.current.contains(document.activeElement) && u.exec("focus-cell", {
      row: L,
      column: K.column
    });
  }, [y, u]);
  const We = I(
    ({ id: L }) => {
      if (e) return !1;
      f.getTask(L).open && f.exec("open-task", { id: L, mode: !1 });
      const K = f.getState()._tasks.find((ee) => ee.id === L);
      if (H(K || null), !K) return !1;
    },
    [f, e]
  ), Ve = I(
    ({ id: L, top: K }) => {
      ve.current ? fe({ ...ve.current, onMove: !1 }) : f.exec("drag-task", {
        id: L,
        top: K + (Ne ?? 0),
        inProgress: !1
      }), H(null);
    },
    [f, fe, Ne]
  ), Xe = I(
    ({ id: L, top: K, detail: ee }) => {
      ee && fe({ ...ee, onMove: !0 }), f.exec("drag-task", {
        id: L,
        top: K + (Ne ?? 0),
        inProgress: !0
      });
    },
    [f, fe, Ne]
  );
  G(() => {
    const L = X.current;
    return L ? ac(L, {
      start: We,
      end: Ve,
      move: Xe,
      getTask: f.getTask
    }).destroy : void 0;
  }, [f, We, Ve, Xe]);
  const we = I(
    (L) => {
      const { key: K, isInput: ee } = L;
      if (!ee && (K === "arrowup" || K === "arrowdown"))
        return L.eventSource = "grid", f.exec("hotkey", L), !1;
      if (K === "enter") {
        const ue = u?.getState().focusCell;
        if (ue) {
          const { row: Ie, column: Le } = ue;
          Le === "add-task" ? q(Ie, "add-task") : Le === "text" && q(Ie, "open-task");
        }
      }
    },
    [f, q, u]
  ), Ee = F(null), Me = () => {
    Ee.current = {
      setTableAPI: h,
      handleHotkey: we,
      sortVal: A,
      api: f,
      adjustColumns: U,
      setColumnWidth: pe,
      tasks: M,
      calendarVal: V,
      durationUnitVal: _,
      splitTasksVal: E,
      onTableAPIChange: i
    };
  };
  Me(), G(() => {
    Me();
  }, [
    h,
    we,
    A,
    f,
    U,
    pe,
    M,
    V,
    _,
    E,
    i
  ]);
  const Ye = I((L) => {
    h(L), L.intercept("hotkey", (K) => Ee.current.handleHotkey(K)), L.intercept("scroll", () => !1), L.intercept("select-row", () => !1), L.intercept("sort-rows", (K) => {
      const ee = Ee.current.sortVal, { key: ue, add: Ie } = K, Le = ee ? ee.find((Ge) => Ge.key === ue) : null;
      let ze = "asc";
      return Le && (ze = !Le || Le.order === "asc" ? "desc" : "asc"), f.exec("sort-tasks", {
        key: ue,
        order: ze,
        add: Ie
      }), !1;
    }), L.on("resize-column", () => {
      Ee.current.setColumnWidth(!0);
    }), L.on("hide-column", (K) => {
      K.mode || Ee.current.adjustColumns(), Ee.current.setColumnWidth();
    }), L.intercept("update-cell", (K) => {
      const { id: ee, column: ue, value: Ie } = K, Le = Ee.current.tasks.find((ze) => ze.id === ee);
      if (Le) {
        const ze = { ...Le };
        let Ge = Ie;
        Ge && !isNaN(Ge) && !(Ge instanceof Date) && (Ge *= 1), ze[ue] = Ge, vo(
          ze,
          {
            calendar: Ee.current.calendarVal,
            durationUnit: Ee.current.durationUnitVal,
            splitTasks: Ee.current.splitTasksVal
          },
          ue
        ), f.exec("update-task", {
          id: ee,
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
      style: { flex: `0 0 ${xe}` },
      ref: se,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: X,
          style: de,
          className: "wx-rHj6070p wx-table",
          onClick: le,
          onDoubleClick: me,
          children: /* @__PURE__ */ p(
            Zc,
            {
              init: Ye,
              sizes: {
                rowHeight: x,
                headerHeight: (De ?? 0) - 1
              },
              rowStyle: (L) => L.$reorder ? "wx-rHj6070p wx-reorder-task" : "wx-rHj6070p",
              columnStyle: (L) => `wx-rHj6070p wx-text-${L.align}${L.id === "add-task" ? " wx-action" : ""}`,
              data: J,
              columns: B,
              selectedRows: [...ke],
              sortMarks: ye
            }
          )
        }
      )
    }
  );
}
function rd({ borders: t = "" }) {
  const e = _e(kt), n = oe(e, "cellWidth"), r = oe(e, "cellHeight"), s = F(null), [o, i] = j("#e4e4e4");
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
    background: n != null && r != null ? `url(${ul(n, r, o, t)})` : void 0,
    position: "absolute",
    pointerEvents: "none"
  };
  return /* @__PURE__ */ p("div", { ref: s, style: a });
}
function sd({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = _e(kt), s = oe(r, "_links"), o = oe(r, "criticalPath"), i = F(null), a = I(
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
  }, [n, e, a]), /* @__PURE__ */ te("svg", { className: "wx-dkx3NwEn wx-links", children: [
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
function od(t) {
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
  return /* @__PURE__ */ p("div", { className: "wx-segments wx-GKbcLEGA", children: e.segments.map((o, i) => /* @__PURE__ */ te(
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
let qt = [], Xn = null, $s = null;
const Cs = (t, e) => {
  if (!e || !e.start) return null;
  const { start: n, lengthUnitWidth: r, lengthUnit: s } = e, o = 864e5, i = s === "week" ? 7 : s === "month" ? 30 : s === "quarter" ? 91 : s === "year" ? 365 : 1, a = Math.floor(t / r), l = new Date(n.getTime() + a * i * o);
  return l.setUTCHours(0, 0, 0, 0), console.log("[pixelToDate]", {
    px: t,
    units: a,
    scalesStart: n.toISOString(),
    result: l.toISOString()
  }), l;
}, id = (t, e, n) => {
  if (!n || !t || !e) return 0;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5;
  return Math.round((t.getTime() - e.getTime()) / i);
}, ad = (t, e, n) => {
  if (!n || !t)
    return console.log("[addCells] early return:", { scales: !!n, date: t?.toISOString?.() }), t;
  const { lengthUnit: r } = n, i = (r === "week" ? 7 : r === "month" ? 30 : r === "quarter" ? 91 : r === "year" ? 365 : 1) * 864e5, a = new Date(t.getTime() + e * i);
  return a.setUTCHours(0, 0, 0, 0), console.log("[addCells]", { date: t.toISOString(), cells: e, lengthUnit: r, result: a.toISOString() }), a;
}, ld = (t, e, n, r) => t < r && e > n;
function cd(t) {
  const {
    readonly: e,
    taskTemplate: n,
    multiTaskRows: r = !1,
    rowMapping: s = null,
    marqueeSelect: o = !1,
    copyPaste: i = !1,
    allowTaskIntersection: a = !0,
    summaryBarCounts: l = !1
  } = t, c = _e(kt), [d, u] = Zt(c, "_tasks"), [h, g] = Zt(c, "_links"), m = oe(c, "area"), f = oe(c, "_scales"), w = oe(c, "taskTypes"), x = $(() => {
    if (!f || !f.start) return f;
    const v = new Date(Date.UTC(
      f.start.getFullYear(),
      f.start.getMonth(),
      f.start.getDate()
    )), D = v.getUTCDay(), T = D === 0 ? -6 : 1 - D, P = new Date(v.getTime() + T * 864e5);
    return P.setUTCHours(0, 0, 0, 0), console.log("[scales-normalize]", {
      raw: f.start.toISOString(),
      utc: v.toISOString(),
      dayOfWeek: D,
      daysToMonday: T,
      monday: P.toISOString()
    }), { ...f, start: P };
  }, [f]), y = oe(c, "baselines"), [b, k] = Zt(c, "_selected"), N = oe(c, "_scrollTask"), S = oe(c, "criticalPath"), C = oe(c, "tasks"), A = oe(c, "schedule"), V = oe(c, "splitTasks"), _ = $(() => {
    if (!m || !Array.isArray(d)) return [];
    const v = m.start ?? 0, D = m.end ?? 0;
    return r && s ? d.map((T) => ({ ...T })) : d.slice(v, D).map((T) => ({ ...T }));
  }, [u, m, r, s]), E = oe(c, "cellHeight"), W = $(() => {
    if (!r || !s || !_.length) return _;
    const v = /* @__PURE__ */ new Map(), D = [];
    return d.forEach((T) => {
      const P = s.taskRows.get(T.id) ?? T.id;
      v.has(P) || (v.set(P, D.length), D.push(P));
    }), _.map((T) => {
      const P = s.taskRows.get(T.id) ?? T.id, Q = v.get(P) ?? 0;
      return {
        ...T,
        $y: Q * E,
        $y_base: T.$y_base !== void 0 ? Q * E : void 0
      };
    });
  }, [_, r, s, d, E]), H = $(
    () => x.lengthUnitWidth,
    [x]
  ), M = $(
    () => x.lengthUnit || "day",
    [x]
  ), q = $(() => {
    if (!l || !d?.length || !H) return null;
    const v = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Set();
    d.forEach((P) => {
      P.type === "summary" && D.add(P.id), P.parent && P.parent !== 0 && P.type !== "summary" && (v.has(P.parent) || v.set(P.parent, []), v.get(P.parent).push(P));
    });
    const T = /* @__PURE__ */ new Map();
    return D.forEach((P) => {
      const Q = v.get(P);
      if (!Q?.length) return;
      const Z = /* @__PURE__ */ new Map();
      Q.forEach((Y) => {
        if (Y.$x == null || Y.$w == null) return;
        const re = Math.floor(Y.$x / H), be = Math.ceil((Y.$x + Y.$w) / H);
        for (let Ce = re; Ce < be; Ce++)
          Z.set(Ce, (Z.get(Ce) || 0) + 1);
      }), Z.size > 0 && T.set(P, Z);
    }), T;
  }, [l, d, H]), le = F(!1), [X, se] = j(void 0), [ce, $e] = j(null), O = F(null), [ae, ve] = j(null), [fe, Ne] = j(void 0), De = F(null), [Pe, de] = j(0), [z, J] = j(null), ie = F(null), [xe, ye] = j(null), [Se, He] = j(null), [B, pe] = j(null), U = F(null);
  U.current = Se;
  const me = F(200), ke = F(null), ge = $(() => {
    const v = ke.current;
    return !!(b.length && v && v.contains(document.activeElement));
  }, [b, ke.current]), We = $(() => ge && b[b.length - 1]?.id, [ge, b]);
  G(() => {
    if (N && ge && N) {
      const { id: v } = N, D = ke.current?.querySelector(
        `.wx-bar[data-id='${v}']`
      );
      D && D.focus({ preventScroll: !0 });
    }
  }, [N]), G(() => {
    const v = ke.current;
    if (v && (de(v.offsetWidth || 0), typeof ResizeObserver < "u")) {
      const D = new ResizeObserver((T) => {
        T[0] && de(T[0].contentRect.width);
      });
      return D.observe(v), () => D.disconnect();
    }
  }, [ke.current]);
  const Ve = I(() => {
    document.body.style.userSelect = "none";
  }, []), Xe = I(() => {
    document.body.style.userSelect = "";
  }, []), we = I(
    (v, D, T) => {
      if (D.target.classList.contains("wx-line") || (T || (T = c.getTask($t(v))), T.type === "milestone" || T.type === "summary")) return "";
      const P = qe(D, "data-segment");
      P && (v = P);
      const { left: Q, width: Z } = v.getBoundingClientRect(), Y = (D.clientX - Q) / Z;
      let re = 0.2 / (Z > 200 ? Z / 200 : 1);
      return Y < re ? "start" : Y > 1 - re ? "end" : "";
    },
    [c]
  ), Ee = $(() => {
    const v = /* @__PURE__ */ new Set();
    if (a || !r || !s)
      return v;
    const D = /* @__PURE__ */ new Map();
    return d.forEach((T) => {
      if (T.type === "summary" || T.type === "milestone") return;
      const P = s.taskRows.get(T.id) ?? T.id;
      D.has(P) || D.set(P, []), D.get(P).push(T);
    }), D.forEach((T) => {
      if (!(T.length < 2))
        for (let P = 0; P < T.length; P++)
          for (let Q = P + 1; Q < T.length; Q++) {
            const Z = T[P], Y = T[Q], re = Z.$x, be = Z.$x + Z.$w, Ce = Y.$x, Ae = Y.$x + Y.$w;
            ld(re, be, Ce, Ae) && (v.add(Z.id), v.add(Y.id));
          }
    }), v;
  }, [a, r, s, d, u]), Me = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return d.forEach((P) => {
        v.set(P.id, P.$y);
      }), v;
    const D = /* @__PURE__ */ new Map(), T = [];
    return d.forEach((P) => {
      const Q = s.taskRows.get(P.id) ?? P.id;
      D.has(Q) || (D.set(Q, T.length), T.push(Q));
    }), d.forEach((P) => {
      const Q = s.taskRows.get(P.id) ?? P.id, Z = D.get(Q) ?? 0;
      v.set(P.id, Z * E);
    }), v;
  }, [d, r, s, E]), Ye = $(() => {
    const v = /* @__PURE__ */ new Map();
    if (!r || !s)
      return d.forEach((P) => {
        v.set(P.id, P.$y), P.row !== void 0 && v.set(P.row, P.$y);
      }), v;
    const D = /* @__PURE__ */ new Map(), T = [];
    return d.forEach((P) => {
      const Q = s.taskRows.get(P.id) ?? P.id;
      D.has(Q) || (D.set(Q, T.length), T.push(Q));
    }), D.forEach((P, Q) => {
      v.set(Q, P * E);
    }), v;
  }, [d, r, s, E]), L = I(
    (v) => {
      if (!ke.current) return [];
      const T = Math.min(v.startX, v.currentX), P = Math.max(v.startX, v.currentX), Q = Math.min(v.startY, v.currentY), Z = Math.max(v.startY, v.currentY);
      return d.filter((Y) => {
        const re = Y.$x, be = Y.$x + Y.$w, Ae = Me.get(Y.id) ?? Y.$y, Fe = Ae + Y.$h;
        return re < P && be > T && Ae < Z && Fe > Q;
      });
    },
    [d, Me]
  ), K = $(() => new Set(b.map((v) => v.id)), [b, k]), ee = I(
    (v) => K.has(v),
    [K]
  ), ue = I(
    (v, D) => {
      const { clientX: T } = D, P = $t(v), Q = c.getTask(P), Z = D.target.classList;
      if (!D.target.closest(".wx-delete-button") && !e) {
        if (Z.contains("wx-progress-marker")) {
          const { progress: Y } = c.getTask(P);
          O.current = {
            id: P,
            x: T,
            progress: Y,
            dx: 0,
            node: v,
            marker: D.target
          }, D.target.classList.add("wx-progress-in-drag");
        } else {
          const Y = we(v, D, Q) || "move", re = {
            id: P,
            mode: Y,
            x: T,
            dx: 0,
            l: Q.$x,
            w: Q.$w
          };
          if (V && Q.segments?.length) {
            const be = qe(D, "data-segment");
            be && (re.segmentIndex = be.dataset.segment * 1);
          }
          $e(re);
        }
        Ve();
      }
    },
    [c, e, we, Ve, V]
  ), Ie = I(
    (v) => {
      if (v.button !== 0 || B) return;
      const D = qe(v);
      if (!D && o && !e) {
        const T = ke.current;
        if (!T) return;
        const P = T.getBoundingClientRect(), Q = v.clientX - P.left, Z = v.clientY - P.top;
        if (i) {
          const re = Cs(Q, x);
          re && (U.current = re, He(re));
        }
        const Y = {
          startX: Q,
          startY: Z,
          currentX: Q,
          currentY: Z,
          ctrlKey: v.ctrlKey || v.metaKey
        };
        J(Y), ie.current = Y, Ve();
        return;
      }
      if (D) {
        if (o && !e && b.length > 1) {
          const T = $t(D);
          if (ee(T)) {
            const P = v.target.classList;
            if (!P.contains("wx-link") && !P.contains("wx-progress-marker") && !v.target.closest(".wx-delete-button")) {
              const Q = c.getTask(T);
              if (!we(D, v, Q)) {
                const Y = /* @__PURE__ */ new Map();
                b.forEach((re) => {
                  const be = c.getTask(re.id);
                  if (be) {
                    if (A?.auto && be.type === "summary") return;
                    Y.set(re.id, {
                      $x: be.$x,
                      $w: be.$w,
                      start: be.start,
                      end: be.end
                    });
                  }
                }), ye({
                  baseTaskId: T,
                  startX: v.clientX,
                  dx: 0,
                  originalPositions: Y
                }), Ve();
                return;
              }
            }
          }
        }
        ue(D, v);
      }
    },
    [ue, o, i, e, b, ee, c, we, A, Ve, x, B]
  ), Le = I(
    (v) => {
      const D = qe(v);
      D && (De.current = setTimeout(() => {
        Ne(!0), ue(D, v.touches[0]);
      }, 300));
    },
    [ue]
  ), ze = I(
    (v) => {
      ve(v && { ...h.find((D) => D.id === v) });
    },
    [h]
  ), Ge = I(() => {
    const v = ie.current;
    if (v) {
      const D = L(v);
      v.ctrlKey ? D.forEach((T) => {
        c.exec("select-task", { id: T.id, toggle: !0, marquee: !0 });
      }) : (b.length > 0 && c.exec("select-task", { id: null, marquee: !0 }), D.forEach((T, P) => {
        c.exec("select-task", {
          id: T.id,
          toggle: P > 0,
          // First one replaces, rest toggle (add)
          marquee: !0
        });
      })), J(null), ie.current = null, Xe(), le.current = !0;
      return;
    }
    if (xe) {
      const { dx: D, originalPositions: T } = xe, P = Math.round(D / H);
      if (P !== 0) {
        let Q = !0;
        T.forEach((Z, Y) => {
          const re = c.getTask(Y);
          re && (c.exec("update-task", {
            id: Y,
            diff: P,
            task: { start: re.start, end: re.end },
            skipUndo: !Q
            // Only first task creates undo entry
          }), Q = !1);
        }), le.current = !0;
      } else
        T.forEach((Q, Z) => {
          c.exec("drag-task", {
            id: Z,
            left: Q.$x,
            width: Q.$w,
            inProgress: !1
          });
        });
      ye(null), Xe();
      return;
    }
    if (O.current) {
      const { dx: D, id: T, marker: P, value: Q } = O.current;
      O.current = null, typeof Q < "u" && D && c.exec("update-task", {
        id: T,
        task: { progress: Q },
        inProgress: !1
      }), P.classList.remove("wx-progress-in-drag"), le.current = !0, Xe();
    } else if (ce) {
      const { id: D, mode: T, dx: P, l: Q, w: Z, start: Y, segment: re, index: be } = ce;
      if ($e(null), Y) {
        const Ce = Math.round(P / H);
        if (!Ce)
          c.exec("drag-task", {
            id: D,
            width: Z,
            left: Q,
            inProgress: !1,
            ...re && { segmentIndex: be }
          });
        else {
          let Ae = {}, Fe = c.getTask(D);
          re && (Fe = Fe.segments[be]);
          const tt = 1440 * 60 * 1e3, Be = Ce * (M === "week" ? 7 : M === "month" ? 30 : M === "quarter" ? 91 : M === "year" ? 365 : 1) * tt;
          T === "move" ? (Ae.start = new Date(Fe.start.getTime() + Be), Ae.end = new Date(Fe.end.getTime() + Be)) : T === "start" ? (Ae.start = new Date(Fe.start.getTime() + Be), Ae.end = Fe.end) : T === "end" && (Ae.start = Fe.start, Ae.end = new Date(Fe.end.getTime() + Be)), c.exec("update-task", {
            id: D,
            task: Ae,
            ...re && { segmentIndex: be }
          });
        }
        le.current = !0;
      }
      Xe();
    }
  }, [c, Xe, ce, H, M, z, xe, L, b]), ht = I(
    (v, D) => {
      const { clientX: T, clientY: P } = D, Q = ke.current;
      if (Q) {
        const Z = Q.getBoundingClientRect();
        me.current = T - Z.left;
      }
      if (B) {
        if (!Q) return;
        const Z = Q.getBoundingClientRect(), Y = T - Z.left;
        pe((re) => ({ ...re, currentX: Y }));
        return;
      }
      if (!e) {
        if (z) {
          const Z = ke.current;
          if (!Z) return;
          const Y = Z.getBoundingClientRect(), re = T - Y.left, be = P - Y.top;
          J((Ce) => ({
            ...Ce,
            currentX: re,
            currentY: be
          })), ie.current && (ie.current.currentX = re, ie.current.currentY = be);
          return;
        }
        if (xe) {
          const Z = T - xe.startX;
          xe.originalPositions.forEach((Y, re) => {
            const be = Y.$x + Z;
            c.exec("drag-task", {
              id: re,
              left: be,
              width: Y.$w,
              inProgress: !0
            });
          }), ye((Y) => ({ ...Y, dx: Z }));
          return;
        }
        if (O.current) {
          const { node: Z, x: Y, id: re } = O.current, be = O.current.dx = T - Y, Ce = Math.round(be / Z.offsetWidth * 100);
          let Ae = O.current.progress + Ce;
          O.current.value = Ae = Math.min(
            Math.max(0, Ae),
            100
          ), c.exec("update-task", {
            id: re,
            task: { progress: Ae },
            inProgress: !0
          });
        } else if (ce) {
          ze(null);
          const { mode: Z, l: Y, w: re, x: be, id: Ce, start: Ae, segment: Fe, index: tt } = ce, nt = c.getTask(Ce), Be = T - be;
          if (!Ae && Math.abs(Be) < 20 || Z === "start" && re - Be < H || Z === "end" && re + Be < H || Z === "move" && (Be < 0 && Y + Be < 0 || Be > 0 && Y + re + Be > Pe) || ce.segment)
            return;
          const wt = { ...ce, dx: Be };
          let xt, Kt;
          if (Z === "start" ? (xt = Y + Be, Kt = re - Be) : Z === "end" ? (xt = Y, Kt = re + Be) : Z === "move" && (xt = Y + Be, Kt = re), c.exec("drag-task", {
            id: Ce,
            width: Kt,
            left: xt,
            inProgress: !0,
            ...Fe && { segmentIndex: tt }
          }), !wt.start && (Z === "move" && nt.$x == Y || Z !== "move" && nt.$w == re)) {
            le.current = !0, Ge();
            return;
          }
          wt.start = !0, $e(wt);
        } else {
          const Z = qe(v);
          if (Z) {
            const Y = c.getTask($t(Z)), be = qe(v, "data-segment") || Z, Ce = we(be, D, Y);
            be.style.cursor = Ce && !e ? "col-resize" : "pointer";
          }
        }
      }
    },
    [
      c,
      e,
      ce,
      H,
      Pe,
      we,
      ze,
      Ge,
      z,
      xe,
      B
    ]
  ), gt = I(
    (v) => {
      ht(v, v);
    },
    [ht]
  ), Pn = I(
    (v) => {
      fe ? (v.preventDefault(), ht(v, v.touches[0])) : De.current && (clearTimeout(De.current), De.current = null);
    },
    [fe, ht]
  ), pt = I(() => {
    Ge();
  }, [Ge]), Wn = I(() => {
    Ne(null), De.current && (clearTimeout(De.current), De.current = null), Ge();
  }, [Ge]);
  G(() => (window.addEventListener("mouseup", pt), () => {
    window.removeEventListener("mouseup", pt);
  }), [pt]);
  const zn = I(
    (v) => {
      if (!e) {
        const D = Ct(v.target);
        if (D && !v.target.classList.contains("wx-link")) {
          const T = Ct(v.target, "data-segment");
          c.exec("show-editor", {
            id: D,
            ...T !== null && { segmentIndex: T }
          });
        }
      }
    },
    [c, e]
  ), Fn = ["e2s", "s2s", "e2e", "s2e"], It = I((v, D) => Fn[(v ? 1 : 0) + (D ? 0 : 2)], []), Rt = I(
    (v, D) => {
      const T = X.id, P = X.start;
      return v === T ? !0 : !!h.find((Q) => Q.target == v && Q.source == T && Q.type === It(P, D));
    },
    [X, g, It]
  ), Vt = I(() => {
    X && se(null);
  }, [X]), dn = I((v, D, T) => {
    if (!D.length || !v || T == null) return;
    console.log("[paste] executePaste called:", {
      targetDate: v.toISOString(),
      taskCount: D.length,
      parent: T
    });
    const P = 864e5, Q = c.getHistory();
    Q?.startBatch();
    const Z = new Date(v);
    Z.setUTCHours(0, 0, 0, 0), console.log("[paste] scalesValue:", {
      start: x?.start?.toISOString?.(),
      lengthUnit: x?.lengthUnit,
      lengthUnitWidth: x?.lengthUnitWidth
    }), D.forEach((Y, re) => {
      const be = `task-${Date.now()}-${re}`;
      console.log("[paste] task input:", {
        text: Y.text,
        _startCellOffset: Y._startCellOffset,
        _startDayOfWeek: Y._startDayOfWeek,
        _durationDays: Y._durationDays,
        start: Y.start?.toISOString?.(),
        end: Y.end?.toISOString?.()
      });
      const Ce = ad(Z, Y._startCellOffset || 0, x);
      console.log("[paste] cellOffset:", Ce?.toISOString?.());
      const Ae = new Date(Ce.getTime() + (Y._startDayOfWeek || 0) * P);
      Ae.setUTCHours(0, 0, 0, 0);
      const Fe = new Date(Ae.getTime() + (Y._durationDays || 7) * P);
      Fe.setUTCHours(0, 0, 0, 0), console.log("[paste] task calculated:", {
        text: Y.text,
        newStart: Ae.toISOString(),
        newEnd: Fe.toISOString(),
        row: Y.row
      }), c.exec("add-task", {
        task: {
          id: be,
          text: Y.text,
          start: Ae,
          end: Fe,
          type: Y.type || "task",
          parent: T,
          row: Y.row
        },
        target: T,
        mode: "child",
        skipUndo: re > 0
      });
    }), Q?.endBatch();
  }, [c, x]), mt = I(
    (v) => {
      if (le.current) {
        le.current = !1;
        return;
      }
      if (B && B.currentX != null) {
        const T = Cs(B.currentX, x);
        T && dn(T, B.tasks, B.parent), pe(null);
        return;
      }
      const D = Ct(v.target);
      if (D) {
        const T = c.getTask(D), P = d.find((Z) => Z.id === D);
        console.log("[click] task:", T?.text, "id:", D), console.log("[click] api.getTask:", { start: T?.start, end: T?.end, duration: T?.duration }), console.log("[click] rendered:", { start: P?.start, end: P?.end, $w: P?.$w, $x: P?.$x });
        const Q = v.target.classList;
        if (Q.contains("wx-link")) {
          const Z = Q.contains("wx-left");
          if (!X) {
            se({ id: D, start: Z });
            return;
          }
          X.id !== D && !Rt(D, Z) && c.exec("add-link", {
            link: {
              source: X.id,
              target: D,
              type: It(X.start, Z)
            }
          });
        } else if (Q.contains("wx-delete-button-icon"))
          c.exec("delete-link", { id: ae.id }), ve(null);
        else {
          let Z;
          const Y = qe(v, "data-segment");
          Y && (Z = Y.dataset.segment * 1), c.exec("select-task", {
            id: D,
            toggle: v.ctrlKey || v.metaKey,
            range: v.shiftKey,
            segmentIndex: Z
          });
        }
      }
      Vt();
    },
    [
      c,
      X,
      g,
      ae,
      Rt,
      It,
      Vt,
      B,
      x,
      dn
    ]
  ), Gt = I((v) => ({
    left: `${v.$x}px`,
    top: `${v.$y}px`,
    width: `${v.$w}px`,
    height: `${v.$h}px`
  }), []), un = I((v) => ({
    left: `${v.$x_base}px`,
    top: `${v.$y_base}px`,
    width: `${v.$w_base}px`,
    height: `${v.$h_base}px`
  }), []), fn = I(
    (v) => {
      if (fe || De.current)
        return v.preventDefault(), !1;
    },
    [fe]
  ), bt = $(
    () => w.map((v) => v.id),
    [w]
  ), Bt = I(
    (v) => {
      let D = bt.includes(v) ? v : "task";
      return ["task", "milestone", "summary"].includes(v) || (D = `task ${D}`), D;
    },
    [bt]
  ), hn = I(
    (v) => {
      c.exec(v.action, v.data);
    },
    [c]
  ), R = I(
    (v) => S && C.byId(v).$critical,
    [S, C]
  ), ne = I(
    (v) => {
      if (A?.auto) {
        const D = C.getSummaryId(v, !0), T = C.getSummaryId(X.id, !0);
        return X?.id && !(Array.isArray(D) ? D : [D]).includes(
          X.id
        ) && !(Array.isArray(T) ? T : [T]).includes(v);
      }
      return X;
    },
    [A, C, X]
  ), he = I(() => {
    const v = c.getState()._selected;
    if (!v || !v.length) return;
    const D = 864e5, T = v.map((re) => {
      const be = c.getTask(re.id);
      if (!be) return null;
      const Ce = d.find((Go) => Go.id === re.id);
      if (!Ce) return null;
      const { $x: Ae, $y: Fe, $h: tt, $w: nt, $skip: Be, $level: wt, $index: xt, $y_base: Kt, $x_base: Gd, $w_base: Bd, $h_base: Kd, $skip_baseline: jd, $critical: qd, $reorder: Xd, ...Vo } = Ce, Ar = Ce.end && Ce.start ? Math.round((Ce.end.getTime() - Ce.start.getTime()) / D) : 0, Hr = Ce.start ? (Ce.start.getUTCDay() + 6) % 7 : 0;
      return console.log("[copy] task:", {
        id: be.id,
        text: be.text,
        start: Ce.start?.toISOString?.(),
        end: Ce.end?.toISOString?.(),
        durationDays: Ar,
        startDayOfWeek: Hr,
        $w: nt,
        $h: tt,
        row: Ce.row,
        parent: Ce.parent
      }), { ...Vo, _durationDays: Ar, _startDayOfWeek: Hr, _originalWidth: nt, _originalHeight: tt };
    }).filter(Boolean);
    if (!T.length) return;
    const Q = T[0].parent, Z = T.filter((re) => re.parent === Q);
    if (Z.length === 0) return;
    const Y = Z.reduce((re, be) => be.start && (!re || be.start < re) ? be.start : re, null);
    qt = Z.map((re) => ({
      ...re,
      _startCellOffset: id(re.start, Y, x)
    })), $s = Q, Xn = Y, console.log("[copy] clipboard stored:", {
      taskCount: qt.length,
      baseDate: Y?.toISOString?.(),
      parent: Q,
      tasks: qt.map((re) => ({
        id: re.id,
        text: re.text,
        _startCellOffset: re._startCellOffset,
        _startDayOfWeek: re._startDayOfWeek,
        _durationDays: re._durationDays
      }))
    });
  }, [c, x]);
  G(() => i ? c.intercept("hotkey", (D) => {
    if (D.key === "ctrl+c" || D.key === "meta+c")
      return he(), !1;
    if (D.key === "ctrl+v" || D.key === "meta+v")
      return !qt.length || !Xn || pe({
        tasks: qt,
        baseDate: Xn,
        parent: $s,
        currentX: me.current
        // Show ghosts at current mouse position
      }), !1;
  }) : void 0, [i, c, he]), G(() => {
    if (!B) return;
    const v = (D) => {
      D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), pe(null));
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [B]);
  const Re = $(() => {
    if (!z) return null;
    const v = Math.min(z.startX, z.currentX), D = Math.min(z.startY, z.currentY), T = Math.abs(z.currentX - z.startX), P = Math.abs(z.currentY - z.startY);
    return {
      left: `${v}px`,
      top: `${D}px`,
      width: `${T}px`,
      height: `${P}px`
    };
  }, [z]);
  return /* @__PURE__ */ te(
    "div",
    {
      className: "wx-GKbcLEGA wx-bars",
      style: { lineHeight: `${W.length ? W[0].$h : 0}px` },
      ref: ke,
      onContextMenu: fn,
      onMouseDown: Ie,
      onMouseMove: gt,
      onTouchStart: Le,
      onTouchMove: Pn,
      onTouchEnd: Wn,
      onClick: mt,
      onDoubleClick: zn,
      onDragStart: (v) => (v.preventDefault(), !1),
      children: [
        /* @__PURE__ */ p(
          sd,
          {
            onSelectLink: ze,
            selectedLink: ae,
            readonly: e
          }
        ),
        W.map((v) => {
          if (v.$skip && v.$skip_baseline) return null;
          const D = Ee.has(v.id), T = `wx-bar wx-${Bt(v.type)}` + (v.$css ? ` ${v.$css}` : "") + (fe && ce && v.id === ce.id ? " wx-touch" : "") + (X && X.id === v.id ? " wx-selected" : "") + (K.has(v.id) ? " wx-selected" : "") + (R(v.id) ? " wx-critical" : "") + (v.$reorder ? " wx-reorder-task" : "") + (V && v.segments ? " wx-split" : "") + (D ? " wx-collision" : ""), P = "wx-link wx-left" + (X ? " wx-visible" : "") + (!X || !Rt(v.id, !0) && ne(v.id) ? " wx-target" : "") + (X && X.id === v.id && X.start ? " wx-selected" : "") + (R(v.id) ? " wx-critical" : ""), Q = "wx-link wx-right" + (X ? " wx-visible" : "") + (!X || !Rt(v.id, !1) && ne(v.id) ? " wx-target" : "") + (X && X.id === v.id && !X.start ? " wx-selected" : "") + (R(v.id) ? " wx-critical" : "");
          return /* @__PURE__ */ te(Ds, { children: [
            !v.$skip && /* @__PURE__ */ te(
              "div",
              {
                className: "wx-GKbcLEGA " + T,
                style: Gt(v),
                "data-tooltip-id": v.id,
                "data-id": v.id,
                tabIndex: We === v.id ? 0 : -1,
                children: [
                  e ? null : v.id === ae?.target && ae?.type[2] === "s" ? /* @__PURE__ */ p(
                    dt,
                    {
                      type: "danger",
                      css: "wx-left wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + P, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) }),
                  v.type !== "milestone" ? /* @__PURE__ */ te(Oe, { children: [
                    v.progress && !(V && v.segments) ? /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-progress-wrapper", children: /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-percent",
                        style: { width: `${v.progress}%` }
                      }
                    ) }) : null,
                    !e && !(V && v.segments) ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-GKbcLEGA wx-progress-marker",
                        style: { left: `calc(${v.progress}% - 10px)` },
                        children: v.progress
                      }
                    ) : null,
                    n ? /* @__PURE__ */ p(n, { data: v, api: c, onAction: hn }) : V && v.segments ? /* @__PURE__ */ p(od, { task: v, type: Bt(v.type) }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: l && v.type === "summary" ? "" : v.$barText || v.text || "" }),
                    D && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-collision-warning", title: "This task overlaps with another task in the same row", children: "!" }),
                    q && v.type === "summary" && (() => {
                      const Z = q.get(v.id), Y = Math.floor(v.$x / H), re = Math.ceil((v.$x + v.$w) / H);
                      return /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-summary-week-counts", children: Array.from({ length: re - Y }, (be, Ce) => {
                        const Ae = Y + Ce, Fe = Z?.get(Ae) || 0;
                        return /* @__PURE__ */ p(
                          "span",
                          {
                            className: `wx-GKbcLEGA wx-week-count${Fe === 0 ? " wx-week-count-zero" : ""}`,
                            style: {
                              position: "absolute",
                              left: `${Ae * H - v.$x}px`,
                              width: `${H}px`,
                              top: 0,
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            },
                            children: Fe
                          },
                          Ae
                        );
                      }) });
                    })()
                  ] }) : /* @__PURE__ */ te(Oe, { children: [
                    /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content" }),
                    n ? /* @__PURE__ */ p(n, { data: v, api: c, onAction: hn }) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-text-out", children: v.$barText || v.text })
                  ] }),
                  e ? null : v.id === ae?.target && ae?.type[2] === "e" ? /* @__PURE__ */ p(
                    dt,
                    {
                      type: "danger",
                      css: "wx-right wx-delete-button wx-delete-link",
                      children: /* @__PURE__ */ p("i", { className: "wxi-close wx-delete-button-icon" })
                    }
                  ) : /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA " + Q, children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-inner" }) })
                ]
              }
            ),
            y && !v.$skip_baseline ? /* @__PURE__ */ p(
              "div",
              {
                className: "wx-GKbcLEGA wx-baseline" + (v.type === "milestone" ? " wx-milestone" : ""),
                style: un(v)
              }
            ) : null
          ] }, v.id);
        }),
        z && Re && /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-marquee-selection", style: Re }),
        B && B.currentX != null && B.tasks.map((v, D) => {
          const P = (Math.floor(B.currentX / H) + (v._startCellOffset || 0)) * H, Q = v._originalWidth || H, Z = v._originalHeight || E, Y = Ye.get(v.row) ?? (v.$y || 0);
          return /* @__PURE__ */ p(
            "div",
            {
              className: "wx-GKbcLEGA wx-bar wx-task wx-paste-preview",
              style: { left: P, top: Y, width: Q, height: Z },
              children: /* @__PURE__ */ p("div", { className: "wx-GKbcLEGA wx-content", children: v.$barText || v.text })
            },
            `preview-${D}`
          );
        })
      ]
    }
  );
}
function dd(t) {
  const { highlightTime: e, onScaleClick: n } = t, r = _e(kt), s = oe(r, "_scales");
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
            onClick: n ? (h) => n(a.date, a.unit, h.nativeEvent) : void 0,
            ...u ? { dangerouslySetInnerHTML: { __html: a.value } } : { children: a.value }
          },
          l
        );
      })
    },
    i
  )) });
}
const ud = /* @__PURE__ */ new Map();
function fd(t) {
  const e = F(null), n = F(0), r = F(null), s = typeof window < "u" && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()), n.current++, G(() => {
    if (s)
      return cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
        const o = {
          label: t,
          time: performance.now() - e.current,
          renders: n.current,
          timestamp: Date.now()
        };
        ud.set(t, o), window.dispatchEvent(
          new CustomEvent("render-metric", { detail: o })
        );
      }), () => cancelAnimationFrame(r.current);
  });
}
function hd(t) {
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
    allowTaskIntersection: m = !0,
    summaryBarCounts: f = !1
  } = t, w = _e(kt), [x, y] = Zt(w, "_selected"), b = oe(w, "scrollTop"), k = oe(w, "cellHeight"), N = oe(w, "cellWidth"), S = oe(w, "_scales"), C = oe(w, "_markers"), A = oe(w, "_scrollTask"), V = oe(w, "zoom"), _ = oe(w, "_tasks"), [E, W] = j(), H = F(null), M = F(0), q = F(!1), le = 1 + (S?.rows?.length || 0), X = $(() => {
    if (!l || !c || !_?.length) return null;
    const z = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Map(), ie = [];
    return _.forEach((xe) => {
      const ye = c.taskRows.get(xe.id) ?? xe.id;
      J.has(ye) || (J.set(ye, ie.length), ie.push(ye));
    }), _.forEach((xe) => {
      const ye = c.taskRows.get(xe.id) ?? xe.id, Se = J.get(ye) ?? 0;
      z.set(xe.id, Se * k);
    }), z;
  }, [_, l, c, k]), se = $(() => {
    const z = [];
    return x && x.length && k && x.forEach((J) => {
      const ie = X?.get(J.id) ?? J.$y;
      z.push({ height: `${k}px`, top: `${ie - 3}px` });
    }), z;
  }, [y, k, X]), ce = $(
    () => Math.max(E || 0, r),
    [E, r]
  );
  G(() => {
    const z = H.current;
    z && typeof b == "number" && (z.scrollTop = b);
  }, [b]);
  const $e = () => {
    O();
  };
  function O(z) {
    const J = H.current;
    if (!J) return;
    const ie = {};
    ie.left = J.scrollLeft, w.exec("scroll-chart", ie);
  }
  function ae() {
    const z = H.current, ie = Math.ceil((E || 0) / (k || 1)) + 1, xe = Math.floor((z && z.scrollTop || 0) / (k || 1)), ye = Math.max(0, xe - le), Se = xe + ie + le, He = ye * (k || 0);
    w.exec("render-data", {
      start: ye,
      end: Se,
      from: He
    });
  }
  G(() => {
    ae();
  }, [E, b]);
  const ve = I(
    (z) => {
      if (!z) return;
      const { id: J, mode: ie } = z;
      if (ie.toString().indexOf("x") < 0) return;
      const xe = H.current;
      if (!xe) return;
      const { clientWidth: ye } = xe, Se = w.getTask(J);
      if (Se.$x + Se.$w < xe.scrollLeft)
        w.exec("scroll-chart", { left: Se.$x - (N || 0) }), xe.scrollLeft = Se.$x - (N || 0);
      else if (Se.$x >= ye + xe.scrollLeft) {
        const He = ye < Se.$w ? N || 0 : Se.$w;
        w.exec("scroll-chart", { left: Se.$x - ye + He }), xe.scrollLeft = Se.$x - ye + He;
      }
    },
    [w, N]
  );
  G(() => {
    ve(A);
  }, [A]);
  function fe(z) {
    if (V && (z.ctrlKey || z.metaKey)) {
      z.preventDefault();
      const J = H.current, ie = z.clientX - (J ? J.getBoundingClientRect().left : 0);
      if (M.current += z.deltaY, Math.abs(M.current) >= 150) {
        const ye = -Math.sign(M.current);
        M.current = 0, w.exec("zoom-scale", {
          dir: ye,
          offset: ie
        });
      }
    }
  }
  const Ne = I((z) => {
    const J = i(z.date, z.unit);
    return J ? {
      css: J,
      width: z.width
    } : null;
  }, [i]), De = $(() => {
    if (!S || !i || !["hour", "day", "week"].includes(S.minUnit)) return null;
    let J = 0;
    return S.rows[S.rows.length - 1].cells.map((ie) => {
      const xe = Ne(ie), ye = J;
      return J += ie.width, xe ? { ...xe, left: ye } : null;
    });
  }, [S, i, Ne]), Pe = I(
    (z) => {
      z.eventSource = "chart", w.exec("hotkey", z);
    },
    [w]
  );
  G(() => {
    const z = H.current;
    if (!z) return;
    const J = () => W(z.clientHeight);
    J();
    const ie = new ResizeObserver(() => J());
    return ie.observe(z), () => {
      ie.disconnect();
    };
  }, [H.current]);
  const de = F(null);
  return G(() => {
    const z = H.current;
    if (z && !de.current)
      return de.current = Er(z, {
        keys: {
          arrowup: !0,
          arrowdown: !0
        },
        exec: (J) => Pe(J)
      }), () => {
        de.current?.destroy(), de.current = null;
      };
  }, []), G(() => {
    const z = H.current;
    if (!z) return;
    const J = fe;
    return z.addEventListener("wheel", J), () => {
      z.removeEventListener("wheel", J);
    };
  }, [fe]), G(() => {
    if (!h || q.current || !S || !H.current || !E) return;
    const z = H.current, { clientWidth: J } = z, ie = /* @__PURE__ */ new Date(), xe = S.rows[S.rows.length - 1]?.cells;
    if (!xe) return;
    let ye = -1, Se = 0;
    const He = [];
    for (let pe = 0; pe < xe.length; pe++) {
      const U = xe[pe];
      He.push({ left: Se, width: U.width });
      const me = U.date;
      if (U.unit === "week") {
        const ke = new Date(me);
        ke.setUTCDate(ke.getUTCDate() + 7), ie >= me && ie < ke && (ye = pe);
      } else U.unit === "day" && ie.getUTCFullYear() === me.getUTCFullYear() && ie.getUTCMonth() === me.getUTCMonth() && ie.getUTCDate() === me.getUTCDate() && (ye = pe);
      Se += U.width;
    }
    let B = ye;
    if (ye > 0 && (B = ye - 1), B >= 0 && He[B]) {
      const pe = He[B], U = Math.max(0, pe.left);
      z.scrollLeft = U, w.exec("scroll-chart", { left: U }), q.current = !0;
    }
  }, [h, S, E, w]), fd("chart"), /* @__PURE__ */ te(
    "div",
    {
      className: "wx-mR7v2Xag wx-chart",
      tabIndex: -1,
      ref: H,
      onScroll: $e,
      children: [
        /* @__PURE__ */ p(dd, { highlightTime: i, onScaleClick: a, scales: S }),
        C && C.length ? /* @__PURE__ */ p(
          "div",
          {
            className: "wx-mR7v2Xag wx-markers",
            style: { height: `${ce}px` },
            children: C.map((z, J) => /* @__PURE__ */ p(
              "div",
              {
                className: `wx-mR7v2Xag wx-marker ${z.css || ""}`,
                style: { left: `${z.left}px` },
                children: /* @__PURE__ */ p("div", { className: "wx-mR7v2Xag wx-content", children: z.text })
              },
              J
            ))
          }
        ) : null,
        /* @__PURE__ */ te(
          "div",
          {
            className: "wx-mR7v2Xag wx-area",
            style: { width: `${n}px`, height: `${ce}px` },
            children: [
              De ? /* @__PURE__ */ p(
                "div",
                {
                  className: "wx-mR7v2Xag wx-gantt-holidays",
                  style: { height: "100%" },
                  children: De.map(
                    (z, J) => z ? /* @__PURE__ */ p(
                      "div",
                      {
                        className: "wx-mR7v2Xag " + z.css,
                        style: {
                          width: `${z.width}px`,
                          left: `${z.left}px`
                        }
                      },
                      J
                    ) : null
                  )
                }
              ) : null,
              /* @__PURE__ */ p(rd, { borders: o }),
              x && x.length ? x.map(
                (z, J) => z.$y ? /* @__PURE__ */ p(
                  "div",
                  {
                    className: "wx-mR7v2Xag wx-selected",
                    "data-id": z.id,
                    style: se[J]
                  },
                  z.id
                ) : null
              ) : null,
              /* @__PURE__ */ p(
                cd,
                {
                  readonly: e,
                  taskTemplate: s,
                  multiTaskRows: l,
                  rowMapping: c,
                  marqueeSelect: d,
                  copyPaste: u,
                  allowTaskIntersection: m,
                  summaryBarCounts: f
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function gd(t) {
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
  function m(se) {
    let ce = 0;
    e == "center" ? ce = n / 2 : e == "before" && (ce = n);
    const $e = {
      size: [n + "px", "auto"],
      p: [se - ce + "px", "0px"],
      p2: ["auto", "0px"]
    };
    if (r != "x")
      for (let O in $e) $e[O] = $e[O].reverse();
    return $e;
  }
  const [f, w] = j(!1), [x, y] = j(null), b = F(0), k = F(), N = F(), S = F(h);
  G(() => {
    S.current = h;
  }, [h]), G(() => {
    x === null && d > 0 && y(d);
  }, [x, d]);
  function C(se) {
    return r == "x" ? se.clientX : se.clientY;
  }
  const A = I(
    (se) => {
      const ce = k.current + C(se) - b.current;
      u(ce);
      let $e;
      ce <= l ? $e = "chart" : a - ce <= c ? $e = "grid" : $e = "all", S.current !== $e && (g($e), S.current = $e), N.current && clearTimeout(N.current), N.current = setTimeout(() => s && s(ce), 100);
    },
    [a, l, c, s]
  ), V = I(() => {
    document.body.style.cursor = "", document.body.style.userSelect = "", w(!1), window.removeEventListener("mousemove", A), window.removeEventListener("mouseup", V);
  }, [A]), _ = $(
    () => h !== "all" ? "auto" : r == "x" ? "ew-resize" : "ns-resize",
    [h, r]
  ), E = I(
    (se) => {
      !i && (h === "grid" || h === "chart") || (b.current = C(se), k.current = d, w(!0), document.body.style.cursor = _, document.body.style.userSelect = "none", window.addEventListener("mousemove", A), window.addEventListener("mouseup", V));
    },
    [_, A, V, d, i, h]
  );
  function W() {
    g("all"), x !== null && (u(x), s && s(x));
  }
  function H(se) {
    if (i) {
      const ce = h === "chart" ? "grid" : "chart";
      g(ce), o(ce);
    } else if (h === "grid" || h === "chart")
      W(), o("all");
    else {
      const ce = se === "left" ? "chart" : "grid";
      g(ce), o(ce);
    }
  }
  function M() {
    H("left");
  }
  function q() {
    H("right");
  }
  const le = $(() => m(d), [d, e, n, r]), X = [
    "wx-resizer",
    `wx-resizer-${r}`,
    `wx-resizer-display-${h}`,
    f ? "wx-resizer-active" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ te(
    "div",
    {
      className: "wx-pFykzMlT " + X,
      onMouseDown: E,
      style: { width: le.size[0], height: le.size[1], cursor: _ },
      children: [
        /* @__PURE__ */ te("div", { className: "wx-pFykzMlT wx-button-expand-box", children: [
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-left", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-left",
              onClick: M
            }
          ) }),
          /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-button-expand-content wx-button-expand-right", children: /* @__PURE__ */ p(
            "i",
            {
              className: "wx-pFykzMlT wxi-menu-right",
              onClick: q
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "wx-pFykzMlT wx-resizer-line" })
      ]
    }
  );
}
const pd = 650;
function Uo(t) {
  let e;
  function n() {
    e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= pd;
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
function md(t) {
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
    allowTaskIntersection: g = !0,
    summaryBarCounts: m = !1
  } = t, f = _e(kt), w = oe(f, "_tasks"), x = oe(f, "_scales"), y = oe(f, "cellHeight"), b = oe(f, "columns"), k = oe(f, "_scrollTask"), N = oe(f, "undo"), S = $(() => {
    if (!a) return l;
    const B = /* @__PURE__ */ new Map(), pe = /* @__PURE__ */ new Map();
    return w.forEach((U) => {
      const me = U.row ?? U.id;
      pe.set(U.id, me), B.has(me) || B.set(me, []), B.get(me).push(U.id);
    }), { rowMap: B, taskRows: pe };
  }, [w, a, l]), [C, A] = j(!1);
  let [V, _] = j(0);
  const [E, W] = j(0), [H, M] = j(0), [q, le] = j(void 0), [X, se] = j("all"), ce = F(null), $e = I(
    (B) => {
      A((pe) => (B !== pe && (B ? (ce.current = X, X === "all" && se("grid")) : (!ce.current || ce.current === "all") && se("all")), B));
    },
    [X]
  );
  G(() => {
    const B = Uo($e);
    return B.observe(), () => {
      B.disconnect();
    };
  }, [$e]);
  const O = $(() => {
    let B;
    return b.every((pe) => pe.width && !pe.flexgrow) ? B = b.reduce((pe, U) => pe + parseInt(U.width), 0) : C && X === "chart" ? B = parseInt(b.find((pe) => pe.id === "action")?.width) || 50 : B = 440, V = B, B;
  }, [b, C, X]);
  G(() => {
    _(O);
  }, [O]);
  const ae = $(
    () => (E ?? 0) - (q ?? 0),
    [E, q]
  ), ve = $(() => x.width, [x]), fe = $(() => {
    if (!a || !S)
      return w.length * y;
    const B = /* @__PURE__ */ new Set();
    return w.forEach((pe) => {
      const U = S.taskRows.get(pe.id) ?? pe.id;
      B.add(U);
    }), B.size * y;
  }, [w, y, a, S]), Ne = $(
    () => x.height + fe + ae,
    [x, fe, ae]
  ), De = $(
    () => V + ve,
    [V, ve]
  ), Pe = F(null), de = I(() => {
    Promise.resolve().then(() => {
      if ((E ?? 0) > (De ?? 0)) {
        const B = (E ?? 0) - V;
        f.exec("expand-scale", { minWidth: B });
      }
    });
  }, [E, De, V, f]);
  G(() => {
    let B;
    return Pe.current && (B = new ResizeObserver(de), B.observe(Pe.current)), () => {
      B && B.disconnect();
    };
  }, [Pe.current, de]), G(() => {
    de();
  }, [ve]);
  const z = F(null), J = F(null), ie = I(() => {
    const B = z.current;
    B && f.exec("scroll-chart", {
      top: B.scrollTop
    });
  }, [f]), xe = F({
    rTasks: [],
    rScales: { height: 0 },
    rCellHeight: 0,
    scrollSize: 0,
    ganttDiv: null,
    ganttHeight: 0
  });
  G(() => {
    xe.current = {
      rTasks: w,
      rScales: x,
      rCellHeight: y,
      scrollSize: ae,
      ganttDiv: z.current,
      ganttHeight: H ?? 0
    };
  }, [w, x, y, ae, H]);
  const ye = I(
    (B) => {
      if (!B) return;
      const {
        rTasks: pe,
        rScales: U,
        rCellHeight: me,
        scrollSize: ke,
        ganttDiv: ge,
        ganttHeight: We
      } = xe.current;
      if (!ge) return;
      const { id: Ve } = B, Xe = pe.findIndex((we) => we.id === Ve);
      if (Xe > -1) {
        const we = We - U.height, Ee = Xe * me, Me = ge.scrollTop;
        let Ye = null;
        Ee < Me ? Ye = Ee : Ee + me > Me + we && (Ye = Ee - we + me + ke), Ye !== null && (f.exec("scroll-chart", { top: Math.max(Ye, 0) }), z.current.scrollTop = Math.max(Ye, 0));
      }
    },
    [f]
  );
  G(() => {
    ye(k);
  }, [k]), G(() => {
    const B = z.current, pe = J.current;
    if (!B || !pe) return;
    const U = () => {
      qo(() => {
        M(B.offsetHeight), W(B.offsetWidth), le(pe.offsetWidth);
      });
    }, me = new ResizeObserver(U);
    return me.observe(B), () => me.disconnect();
  }, [z.current]);
  const Se = F(null), He = F(null);
  return G(() => {
    He.current && (He.current.destroy(), He.current = null);
    const B = Se.current;
    if (B)
      return He.current = Er(B, {
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
          "ctrl+z": N,
          "ctrl+y": N,
          "meta+z": N,
          "meta+shift+z": N
        },
        exec: (pe) => {
          if (pe.isInput) return;
          const U = pe.key;
          if (U === "ctrl+z" || U === "meta+z") {
            f.exec("undo", {});
            return;
          }
          if (U === "ctrl+y" || U === "meta+shift+z") {
            f.exec("redo", {});
            return;
          }
          f.exec("hotkey", pe);
        }
      }), () => {
        He.current?.destroy(), He.current = null;
      };
  }, [N]), /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-gantt", ref: z, onScroll: ie, children: /* @__PURE__ */ p(
    "div",
    {
      className: "wx-jlbQoHOz wx-pseudo-rows",
      style: { height: Ne, width: "100%" },
      ref: J,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "wx-jlbQoHOz wx-stuck",
          style: {
            height: H,
            width: q
          },
          children: /* @__PURE__ */ te("div", { tabIndex: 0, className: "wx-jlbQoHOz wx-layout", ref: Se, children: [
            b.length ? /* @__PURE__ */ te(Oe, { children: [
              /* @__PURE__ */ p(
                nd,
                {
                  display: X,
                  compactMode: C,
                  columnWidth: O,
                  width: V,
                  readonly: n,
                  fullHeight: fe,
                  onTableAPIChange: i,
                  multiTaskRows: a,
                  rowMapping: S
                }
              ),
              /* @__PURE__ */ p(
                gd,
                {
                  value: V,
                  display: X,
                  compactMode: C,
                  containerWidth: E,
                  onMove: (B) => _(B),
                  onDisplayChange: (B) => se(B)
                }
              )
            ] }) : null,
            /* @__PURE__ */ p("div", { className: "wx-jlbQoHOz wx-content", ref: Pe, children: /* @__PURE__ */ p(
              hd,
              {
                readonly: n,
                fullWidth: ve,
                fullHeight: fe,
                taskTemplate: e,
                cellBorders: r,
                highlightTime: s,
                onScaleClick: o,
                multiTaskRows: a,
                rowMapping: S,
                marqueeSelect: c,
                copyPaste: d,
                scrollToCurrentWeek: u,
                currentWeekColor: h,
                allowTaskIntersection: g,
                summaryBarCounts: m
              }
            ) })
          ] })
        }
      )
    }
  ) });
}
function wd(t) {
  return {
    year: "%Y",
    quarter: `${t("Q")} %Q`,
    month: "%M",
    week: `${t("Week")} %w`,
    day: "%M %j",
    hour: "%H:%i"
  };
}
function xd(t, e) {
  return typeof t == "function" ? t : ct(t, e);
}
function Yo(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: xd(n, e)
  }));
}
function yd(t, e) {
  const n = wd(e);
  for (let r in n)
    n[r] = ct(n[r], t);
  return n;
}
function vd(t, e) {
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
function kd(t, e) {
  return t.levels ? {
    ...t,
    levels: t.levels.map((n) => ({
      ...n,
      scales: Yo(n.scales, e)
    }))
  } : t;
}
const bd = (t) => t.split("-").map((e) => e ? e.charAt(0).toUpperCase() + e.slice(1) : "").join(""), Sd = [
  { unit: "month", step: 1, format: "%F %Y" },
  { unit: "day", step: 1, format: "%j" }
], $d = Dt(function({
  taskTemplate: e = null,
  markers: n = [],
  taskTypes: r = Co,
  tasks: s = [],
  selected: o = [],
  activeTask: i = null,
  links: a = [],
  scales: l = Sd,
  columns: c = xo,
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
  highlightTime: N = null,
  onScaleClick: S = null,
  init: C = null,
  autoScale: A = !0,
  unscheduledTasks: V = !1,
  criticalPath: _ = null,
  schedule: E = { type: "forward" },
  projectStart: W = null,
  projectEnd: H = null,
  calendar: M = null,
  undo: q = !1,
  splitTasks: le = !1,
  multiTaskRows: X = !1,
  marqueeSelect: se = !1,
  copyPaste: ce = !1,
  currentWeekHighlight: $e = !1,
  currentWeekColor: O = null,
  scrollToCurrentWeek: ae = !1,
  allowTaskIntersection: ve = !0,
  summaryBarCounts: fe = !1,
  ...Ne
}, De) {
  const Pe = F();
  Pe.current = Ne;
  const de = $(() => new dl(As), []), z = $(() => ({ ...sn, ...An }), []), J = _e(et.i18n), ie = $(() => J ? J.extend(z, !0) : Et(z), [J, z]), xe = $(() => ie.getRaw().calendar, [ie]), ye = $(() => {
    let we = {
      zoom: kd(b, xe),
      scales: Yo(l, xe),
      columns: vd(c, xe),
      links: mo(a),
      cellWidth: m
    };
    return we.zoom && (we = {
      ...we,
      ...Xa(
        we.zoom,
        yd(xe, ie.getGroup("gantt")),
        we.scales,
        m
      )
    }), we;
  }, [b, l, c, a, m, xe, ie]), Se = F(null);
  Se.current !== s && (cr(s, { durationUnit: g, calendar: M }), Se.current = s), G(() => {
    cr(s, { durationUnit: g, calendar: M });
  }, [s, g, M, le]);
  const He = $(() => {
    if (!X) return null;
    const we = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map(), Me = (Ye) => {
      Ye.forEach((L) => {
        const K = L.row ?? L.id;
        Ee.set(L.id, K), we.has(K) || we.set(K, []), we.get(K).push(L.id), L.data && L.data.length > 0 && Me(L.data);
      });
    };
    return Me(s), { rowMap: we, taskRows: Ee };
  }, [s, X]), B = $(() => de.in, [de]), pe = F(null);
  pe.current === null && (pe.current = new Fs((we, Ee) => {
    const Me = "on" + bd(we);
    Pe.current && Pe.current[Me] && Pe.current[Me](Ee);
  }), B.setNext(pe.current));
  const [U, me] = j(null), ke = F(null);
  ke.current = U;
  const ge = $(
    () => ({
      getState: de.getState.bind(de),
      getReactiveState: de.getReactive.bind(de),
      getStores: () => ({ data: de }),
      exec: B.exec,
      setNext: (we) => (pe.current = pe.current.setNext(we), pe.current),
      intercept: B.intercept.bind(B),
      on: B.on.bind(B),
      detach: B.detach.bind(B),
      getTask: de.getTask.bind(de),
      serialize: de.serialize.bind(de),
      getTable: (we) => we ? new Promise((Ee) => setTimeout(() => Ee(ke.current), 1)) : ke.current,
      getHistory: () => de.getHistory()
    }),
    [de, B]
  );
  Mt(
    De,
    () => ({
      ...ge
    }),
    [ge]
  );
  const We = F(0);
  G(() => {
    We.current ? de.init({
      tasks: s,
      links: ye.links,
      start: d,
      columns: ye.columns,
      end: u,
      lengthUnit: h,
      cellWidth: ye.cellWidth,
      cellHeight: f,
      scaleHeight: w,
      scales: ye.scales,
      taskTypes: r,
      zoom: ye.zoom,
      selected: o,
      activeTask: i,
      baselines: k,
      autoScale: A,
      unscheduledTasks: V,
      markers: n,
      durationUnit: g,
      criticalPath: _,
      schedule: E,
      projectStart: W,
      projectEnd: H,
      calendar: M,
      undo: q,
      _weekStart: xe.weekStart,
      splitTasks: le
    }) : C && C(ge), We.current++;
  }, [
    ge,
    C,
    s,
    ye,
    d,
    u,
    h,
    f,
    w,
    r,
    o,
    i,
    k,
    A,
    V,
    n,
    g,
    _,
    E,
    W,
    H,
    M,
    q,
    xe,
    le,
    de
  ]), We.current === 0 && de.init({
    tasks: s,
    links: ye.links,
    start: d,
    columns: ye.columns,
    end: u,
    lengthUnit: h,
    cellWidth: ye.cellWidth,
    cellHeight: f,
    scaleHeight: w,
    scales: ye.scales,
    taskTypes: r,
    zoom: ye.zoom,
    selected: o,
    activeTask: i,
    baselines: k,
    autoScale: A,
    unscheduledTasks: V,
    markers: n,
    durationUnit: g,
    criticalPath: _,
    schedule: E,
    projectStart: W,
    projectEnd: H,
    calendar: M,
    undo: q,
    _weekStart: xe.weekStart,
    splitTasks: le
  });
  const Ve = $(() => {
    const we = /* @__PURE__ */ new Date(), Ee = xe?.weekStart ?? 0, Me = new Date(Date.UTC(we.getUTCFullYear(), we.getUTCMonth(), we.getUTCDate())), L = (Me.getUTCDay() - Ee + 7) % 7;
    Me.setUTCDate(Me.getUTCDate() - L), Me.setUTCHours(0, 0, 0, 0);
    const K = new Date(Me);
    return K.setUTCDate(K.getUTCDate() + 7), (ee) => ee >= Me && ee < K;
  }, [xe]), Xe = $(() => (we, Ee) => {
    let Me = [];
    if (M)
      Ee == "day" && !M.getDayHours(we) && Me.push("wx-weekend"), Ee == "hour" && !M.getDayHours(we) && Me.push("wx-weekend");
    else if (N) {
      const Ye = N(we, Ee);
      Ye && Me.push(Ye);
    }
    return $e && (Ee === "week" || Ee === "day") && Ve(we) && Me.push("wx-current-week"), Me.join(" ");
  }, [M, N, $e, Ve]);
  return /* @__PURE__ */ p(et.i18n.Provider, { value: ie, children: /* @__PURE__ */ p(kt.Provider, { value: ge, children: /* @__PURE__ */ p(
    md,
    {
      taskTemplate: e,
      readonly: x,
      cellBorders: y,
      highlightTime: Xe,
      onScaleClick: S,
      onTableAPIChange: me,
      multiTaskRows: X,
      rowMapping: He,
      marqueeSelect: se,
      copyPaste: ce,
      scrollToCurrentWeek: ae,
      currentWeekColor: O,
      allowTaskIntersection: ve,
      summaryBarCounts: fe
    }
  ) }) });
});
function Cd({ api: t = null, items: e = [] }) {
  const n = _e(et.i18n), r = $(() => n || Et(An), [n]), s = $(() => r.getGroup("gantt"), [r]), o = lt(t, "_selected"), i = lt(t, "undo"), a = lt(t, "history"), l = lt(t, "splitTasks"), c = ["undo", "redo"], d = $(() => {
    const h = ur();
    return (e.length ? e : ur()).map((m) => {
      let f = { ...m, disabled: !1 };
      return f.handler = Dr(h, f.id) ? (w) => Ht(t, w.id, null, s) : f.handler, f.text && (f.text = s(f.text)), f.menuText && (f.menuText = s(f.menuText)), f;
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
  return n ? /* @__PURE__ */ p(hr, { items: u }) : /* @__PURE__ */ p(et.i18n.Provider, { value: r, children: /* @__PURE__ */ p(hr, { items: u }) });
}
const _d = Dt(function({
  options: e = [],
  api: n = null,
  resolver: r = null,
  filter: s = null,
  at: o = "point",
  children: i,
  onClick: a,
  css: l
}, c) {
  const d = F(null), u = F(null), h = _e(et.i18n), g = $(() => h || Et({ ...An, ...sn }), [h]), m = $(() => g.getGroup("gantt"), [g]), f = lt(n, "taskTypes"), w = lt(n, "selected"), x = lt(n, "_selected"), y = lt(n, "splitTasks"), b = $(() => dr(), []);
  G(() => {
    n && (n.on("scroll-chart", () => {
      d.current && d.current.show && d.current.show();
    }), n.on("drag-task", () => {
      d.current && d.current.show && d.current.show();
    }));
  }, [n]);
  function k(H) {
    return H.map((M) => (M = { ...M }, M.text && (M.text = m(M.text)), M.subtext && (M.subtext = m(M.subtext)), M.data && (M.data = k(M.data)), M));
  }
  function N() {
    const H = e.length ? e : dr(), M = H.find((q) => q.id === "convert-task");
    return M && (M.data = [], (f || []).forEach((q) => {
      M.data.push(M.dataFactory(q));
    })), k(H);
  }
  const S = $(() => N(), [n, e, f, y, m]), C = $(
    () => x && x.length ? x : [],
    [x]
  ), A = I(
    (H, M) => {
      let q = H ? n?.getTask(H) : null;
      if (r) {
        const le = r(H, M);
        q = le === !0 ? q : le;
      }
      if (q) {
        const le = Ct(M.target, "data-segment");
        le !== null ? u.current = { id: q.id, segmentIndex: le } : u.current = q.id, (!Array.isArray(w) || !w.includes(q.id)) && n && n.exec && n.exec("select-task", { id: q.id });
      }
      return q;
    },
    [n, r, w]
  ), V = I(
    (H) => {
      const M = H.action;
      M && (Dr(b, M.id) && Ht(n, M.id, u.current, m), a && a(H));
    },
    [n, m, a, b]
  ), _ = I(
    (H, M) => {
      const q = C.length ? C : M ? [M] : [];
      let le = s ? q.every((X) => s(H, X)) : !0;
      if (le && (H.isHidden && (le = !q.some(
        (X) => H.isHidden(X, n.getState(), u.current)
      )), H.isDisabled)) {
        const X = q.some(
          (se) => H.isDisabled(se, n.getState(), u.current)
        );
        H.disabled = X;
      }
      return le;
    },
    [s, C, n]
  );
  Mt(c, () => ({
    show: (H, M) => {
      d.current && d.current.show && d.current.show(H, M);
    }
  }));
  const E = I((H) => {
    d.current && d.current.show && d.current.show(H);
  }, []), W = /* @__PURE__ */ te(Oe, { children: [
    /* @__PURE__ */ p(
      Ho,
      {
        filter: _,
        options: S,
        dataKey: "id",
        resolver: A,
        onClick: V,
        at: o,
        ref: d,
        css: l
      }
    ),
    /* @__PURE__ */ p("span", { onContextMenu: E, "data-menu-ignore": "true", children: typeof i == "function" ? i() : i })
  ] });
  if (!h && et.i18n?.Provider) {
    const H = et.i18n.Provider;
    return /* @__PURE__ */ p(H, { value: g, children: W });
  }
  return W;
}), pr = {};
function _s(t) {
  return typeof t < "u" ? pr[t] || t : pr.text;
}
function ot(t, e) {
  pr[t] = e;
}
const Td = {
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
  const d = _e(et.i18n), u = $(() => d.getGroup("editor"), [d]), h = $(
    () => e.config[0].comp === "readonly" && e.config.every((g) => !Object.keys(n).includes(g.key)),
    [e, n]
  );
  return /* @__PURE__ */ te("div", { className: "wx-s2aE1xdZ wx-sections " + r, ref: c, children: [
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
          return /* @__PURE__ */ te("div", { children: [
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
function Nd(t) {
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
function Md(t) {
  const e = t.map((i) => {
    const a = { ...i };
    return i.config && Object.assign(a, i.config), a.key = i.key || qi(), a.setter = i.setter || Dd(i.key), a.getter = i.getter || Nd(i.key), a;
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
      !Hn(u, h) && (u !== void 0 || h) && c.push(d.key);
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
function Ed({
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
  const y = _e(et.i18n).getGroup("editor"), [b, k] = Ue(t), [N, S] = j(null), C = $(() => {
    const O = Md(e);
    N && O.config.forEach((fe) => {
      fe.comp === "section" && fe.key === N && (fe.sectionMode === "accordion" ? fe.activeSection || (O.config.forEach((Ne) => {
        Ne.comp === "section" && Ne.key !== fe.key && (Ne.activeSection = !1);
      }), fe.activeSection = !0) : fe.activeSection = !fe.activeSection);
    });
    let ae = /* @__PURE__ */ new Set(), ve = null;
    return O.config.forEach((fe) => {
      fe.sectionMode === "exclusive" && fe.activeSection && (ve = fe.key), fe.activeSection && ae.add(fe.key);
    }), O.config.forEach((fe) => {
      fe.hidden = fe.hidden || r && r !== fe.batch || ve && fe.key != ve && fe.section !== ve || fe.section && !ae.has(fe.section);
    }), i ? {
      ...O,
      config: O.config.map((fe) => ({ ...fe, comp: "readonly" })),
      diff: () => []
    } : O;
  }, [e, N, r, i]), [A, V] = j({}), [_, E] = j({}), W = b;
  G(() => {
    b !== void 0 && (V(Cn(b)), E(Cn(b)), W.errors && (W.errors = le()));
  }, [b]);
  const [H, M] = j([]);
  G(() => {
    b && M([]);
  }, [b]);
  function q(O) {
    return [...new Set(O)];
  }
  function le(O) {
    const ae = C.validateValues(A, O, y);
    return Hn(ae, W.errors) || w && w({ errors: ae, values: A }), ae;
  }
  function X(O, ae) {
    if (s && !W.errors) {
      const ve = C.setValues(b, ae ?? _, O);
      k(ve), m && m({ changes: O, values: ve });
    } else
      M(O);
  }
  function se({ value: O, key: ae, input: ve }) {
    let fe = { ..._ || {}, [ae]: O };
    const Ne = {
      key: ae,
      value: O,
      update: fe
    };
    if (ve && (Ne.input = ve), g && g(Ne), !b) return;
    fe = Ne.update, E(fe);
    const De = C.diff(b, fe), Pe = C.setValues(
      { ...A || {} },
      fe,
      q([...De, ae])
    );
    if (V(Pe), De.length) {
      const de = s ? [] : q([...De, ...Object.keys(W.errors ?? {}), ae]);
      W.errors = le(de), X(De, fe);
    } else {
      const de = Object.keys(W.errors ?? {});
      de.length && (W.errors = le(de)), M([]);
    }
  }
  function ce() {
    if (H.length && (s || (W.errors = le()), !W.errors)) {
      m && m({
        changes: H,
        values: A
      });
      const O = C.setValues(b, _, H);
      k(O), M([]), k({ ...A });
    }
  }
  function $e({ item: O }) {
    O.id === "save" ? ce() : O.id === "toggle-section" && S(O.key), f && f({ item: O, values: A, changes: H });
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
      errors: W.errors,
      onClick: $e,
      onKeyDown: $e,
      onChange: se,
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
  return r === "columns" ? /* @__PURE__ */ te("div", { className: "wx-bNrSbszs wx-cols", children: [
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
const Xt = () => ({ comp: "spacer" }), Zn = (t) => ({
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
    hotkeys: w
  } = t, x = _e(et.i18n), y = $(() => x.getGroup("editor"), [x]), b = $(
    () => o === !0 && i === !0,
    [o, i]
  ), k = $(() => {
    let _ = o && o.items ? o.items.map((E) => ({ ...E })) : [];
    return b && (d ? _ = [Xt(), Ns()] : (u ? _ = [Xt(), Ns()] : l !== "modal" && (_ = [Xt(), Zn(y), Jn(y)]), a === "columns" && !_.length && (_ = [Xt(), Jn(y), Zn(y)]))), _;
  }, [o, b, d, u, l, a, y]), N = $(() => {
    let _ = i && i.items ? i.items.map((E) => ({ ...E })) : [];
    return b && (d || (l === "modal" && !u && (_ = [Xt(), Jn(y), Zn(y)]), a === "columns" && k.length && (_ = []))), _;
  }, [i, b, d, l, u, a, k, y]), S = $(() => [...k, ...N], [k, N]), C = F(null), A = F(null);
  A.current = (_, ...E) => {
    const W = S.findIndex((q) => E.includes(q.id));
    if (W === -1) return !1;
    const H = _.target, M = S[W];
    _.key == "Escape" && (H.closest(".wx-combo") || H.closest(".wx-multicombo") || H.closest(".wx-richselect")) || _.key == "Delete" && (H.tagName === "INPUT" || H.tagName === "TEXTAREA") || (_.preventDefault(), m && m({ item: M }));
  };
  const V = $(() => w === !1 ? {} : {
    "ctrl+s": (_) => A.current(_, "save"),
    escape: (_) => A.current(_, "cancel", "close"),
    "ctrl+d": (_) => A.current(_, "delete"),
    ...w || {}
  }, [w]);
  return ui(V, C), /* @__PURE__ */ te("div", { className: s ? "wx-85HDaNoA " + s : "wx-85HDaNoA", ref: C, children: [
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
    /* @__PURE__ */ te(
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
            Ts,
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
function Rd(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: "close" } });
  }
  return r === "modal" ? /* @__PURE__ */ p(Vi, { children: /* @__PURE__ */ p(
    er,
    {
      css: `wx-panel ${e}`,
      onClick: n,
      placement: r,
      ...s
    }
  ) }) : r === "sidebar" ? /* @__PURE__ */ p(Gi, { onCancel: o, children: /* @__PURE__ */ p(
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
function Ad(t) {
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
  return /* @__PURE__ */ p(Rn, { words: Td, optional: !0, children: /* @__PURE__ */ p(
    Ed,
    {
      view: Rd,
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
function Hd({ value: t, options: e, label: n }) {
  const r = _e(et.i18n).getGroup("editor"), s = $(() => {
    let o = t;
    if (typeof t == "boolean" && (o = r(t ? "Yes" : "No")), e) {
      const i = e.find((a) => a.id === t);
      i && (o = i.label);
    }
    return o;
  }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ p(en, { label: n, children: s }) : null;
}
function Ld({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ te(
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
ot("text", ln);
ot("textarea", xi);
ot("checkbox", yi);
ot("readonly", Hd);
ot("section", Ld);
mr(Je);
function Od({ api: t, autoSave: e, onLinksChange: n }) {
  const s = _e(et.i18n).getGroup("gantt"), o = oe(t, "activeTask"), i = oe(t, "_activeTask"), a = oe(t, "_links"), l = oe(t, "schedule"), c = oe(t, "unscheduledTasks"), [d, u] = j();
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
  return /* @__PURE__ */ p(Oe, { children: (d || []).map(
    (w, x) => w.data.length ? /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-links", children: /* @__PURE__ */ p(en, { label: w.title, position: "top", children: /* @__PURE__ */ p("table", { children: /* @__PURE__ */ p("tbody", { children: w.data.map((y) => /* @__PURE__ */ te("tr", { children: [
      /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell", children: /* @__PURE__ */ p("div", { className: "wx-j93aYGQf wx-task-name", children: y.task.text || "" }) }),
      l?.auto && y.link.type === "e2s" ? /* @__PURE__ */ p("td", { className: "wx-j93aYGQf wx-cell wx-link-lag", children: /* @__PURE__ */ p(
        ln,
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
        ki,
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
function Pd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t, a = o ?? s;
  function l(c) {
    const d = new Date(c.value);
    d.setUTCHours(e.getUTCHours()), d.setUTCMinutes(e.getUTCMinutes()), a && a({ value: d });
  }
  return /* @__PURE__ */ te("div", { className: "wx-hFsbgDln date-time-controll", children: [
    /* @__PURE__ */ p(
      Oi,
      {
        ...i,
        value: e,
        onChange: l,
        format: r,
        buttons: ["today"],
        clear: !1
      }
    ),
    n ? /* @__PURE__ */ p(Yi, { value: e, onChange: a, format: r }) : null
  ] });
}
ot("select", Os);
ot("date", Pd);
ot("twostate", Ps);
ot("slider", rr);
ot("counter", Pi);
ot("links", Od);
function Wd({
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
  const u = _e(et.i18n), h = $(() => u || Et({ ...An, ...sn }), [u]), g = $(() => h.getGroup("gantt"), [h]), m = h.getRaw(), f = $(() => {
    const U = m.gantt?.dateFormat || m.formats?.dateFormat;
    return ct(U, m.calendar);
  }, [m]), w = $(() => {
    if (a === !0 && !s) {
      const U = [
        { comp: "icon", icon: "wxi-close", id: "close" },
        { comp: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: g("Delete"),
          id: "delete"
        }
      ];
      return l ? { items: U } : {
        items: [
          ...U,
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
  ), k = I((U) => {
    y(U);
  }, []);
  G(() => {
    const U = Uo(k);
    return U.observe(), () => {
      U.disconnect();
    };
  }, [k]);
  const N = oe(t, "_activeTask"), S = oe(t, "activeTask"), C = oe(t, "unscheduledTasks"), A = oe(t, "links"), V = oe(t, "splitTasks"), _ = $(
    () => V && S?.segmentIndex,
    [V, S]
  ), E = $(
    () => _ || _ === 0,
    [_]
  ), W = $(
    () => So(),
    [C]
  ), H = oe(t, "undo"), [M, q] = j({}), [le, X] = j(null), [se, ce] = j(), [$e, O] = j(null), ae = oe(t, "taskTypes"), ve = $(() => {
    if (!N) return null;
    let U;
    if (E && N.segments ? U = { ...N.segments[_] } : U = { ...N }, s) {
      let me = { parent: U.parent };
      return W.forEach(({ key: ke, comp: ge }) => {
        if (ge !== "links") {
          const We = U[ke];
          ge === "date" && We instanceof Date ? me[ke] = f(We) : ge === "slider" && ke === "progress" ? me[ke] = `${We}%` : me[ke] = We;
        }
      }), me;
    }
    return U || null;
  }, [N, E, _, s, W, f]);
  G(() => {
    ce(ve);
  }, [ve]), G(() => {
    q({}), O(null), X(null);
  }, [S]);
  function fe(U, me) {
    return U.map((ke) => {
      const ge = { ...ke };
      if (ke.config && (ge.config = { ...ge.config }), ge.comp === "links" && t && (ge.api = t, ge.autoSave = l, ge.onLinksChange = Pe), ge.comp === "select" && ge.key === "type") {
        const We = ge.options ?? (ae || []);
        ge.options = We.map((Ve) => ({
          ...Ve,
          label: g(Ve.label)
        }));
      }
      return ge.comp === "slider" && ge.key === "progress" && (ge.labelTemplate = (We) => `${g(ge.label)} ${We}%`), ge.label && (ge.label = g(ge.label)), ge.config?.placeholder && (ge.config.placeholder = g(ge.config.placeholder)), me && (ge.isDisabled && ge.isDisabled(me, t.getState()) ? ge.disabled = !0 : delete ge.disabled), ge;
    });
  }
  const Ne = $(() => {
    let U = e.length ? e : W;
    return U = fe(U, se), se ? U.filter(
      (me) => !me.isHidden || !me.isHidden(se, t.getState())
    ) : U;
  }, [e, W, se, ae, g, t, l]), De = $(
    () => Ne.map((U) => U.key),
    [Ne]
  );
  function Pe({ id: U, action: me, data: ke }) {
    q((ge) => ({
      ...ge,
      [U]: { action: me, data: ke }
    }));
  }
  const de = I(() => {
    for (let U in M)
      if (A.byId(U)) {
        const { action: me, data: ke } = M[U];
        t.exec(me, ke);
      }
  }, [t, M, A]), z = I(() => {
    const U = S?.id || S;
    if (E) {
      if (N?.segments) {
        const me = N.segments.filter(
          (ke, ge) => ge !== _
        );
        t.exec("update-task", {
          id: U,
          task: { segments: me }
        });
      }
    } else
      t.exec("delete-task", { id: U });
  }, [t, S, E, N, _]), J = I(() => {
    t.exec("show-editor", { id: null });
  }, [t]), ie = I(
    (U) => {
      const { item: me, changes: ke } = U;
      me.id === "delete" && z(), me.id === "save" && (ke.length ? J() : de()), me.comp && J();
    },
    [t, S, l, de, z, J]
  ), xe = I(
    (U, me, ke) => (C && U.type === "summary" && (U.unscheduled = !1), vo(U, t.getState(), me), ke || X(!1), U),
    [C, t]
  ), ye = I(
    (U) => {
      U = {
        ...U,
        unscheduled: C && U.unscheduled && U.type !== "summary"
      }, delete U.links, delete U.data, (De.indexOf("duration") === -1 || U.segments && !U.duration) && delete U.duration;
      const me = {
        id: S?.id || S,
        task: U,
        ...E && { segmentIndex: _ }
      };
      l && le && (me.inProgress = le), t.exec("update-task", me), l || de();
    },
    [
      t,
      S,
      C,
      l,
      de,
      De,
      E,
      _,
      le
    ]
  ), Se = I(
    (U) => {
      let { update: me, key: ke, input: ge } = U;
      if (ge && X(!0), U.update = xe({ ...me }, ke, ge), !l) ce(U.update);
      else if (!$e && !ge) {
        const We = Ne.find((we) => we.key === ke), Ve = me[ke];
        (!We.validation || We.validation(Ve)) && (!We.required || Ve) && ye(U.update);
      }
    },
    [l, xe, $e, Ne, ye]
  ), He = I(
    (U) => {
      l || ye(U.values);
    },
    [l, ye]
  ), B = I((U) => {
    O(U.errors);
  }, []), pe = $(
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
  return ve ? /* @__PURE__ */ p(Rn, { children: /* @__PURE__ */ p(
    Ad,
    {
      css: `wx-XkvqDXuw wx-gantt-editor ${b} ${n}`,
      items: Ne,
      values: ve,
      topBar: w,
      bottomBar: i,
      placement: o,
      layout: r,
      readonly: s,
      autoSave: l,
      focus: c,
      onAction: ie,
      onSave: He,
      onValidation: B,
      onChange: Se,
      hotkeys: d && { ...pe, ...d }
    }
  ) }) : null;
}
const zd = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = j(null);
  return G(() => {
    n && n.getTable(!0).then(s);
  }, [n]), /* @__PURE__ */ p(ed, { api: r, columns: e, children: t });
};
function Fd(t) {
  const { api: e, content: n, children: r } = t, s = F(null), o = F(null), [i, a] = j({}), [l, c] = j(null), [d, u] = j({});
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
  G(() => {
    const k = o.current;
    if (k && d && (d.text || n)) {
      const N = k.getBoundingClientRect();
      let S = !1, C = d.left, A = d.top;
      N.right >= i.right && (C = i.width - N.width - 5, S = !0), N.bottom >= i.bottom && (A = d.top - (N.bottom - i.bottom + 2), S = !0), S && u((V) => V && { ...V, left: C, top: A });
    }
  }, [d, i, n]);
  const g = F(null), m = 300, f = (k) => {
    clearTimeout(g.current), g.current = setTimeout(() => {
      k();
    }, m);
  };
  function w(k) {
    let { id: N, tooltip: S, target: C, at: A } = h(k.target);
    if (u(null), c(null), !S)
      if (N)
        S = y(N);
      else {
        clearTimeout(g.current);
        return;
      }
    const V = k.clientX;
    f(() => {
      N && c(x(b(N)));
      const _ = C.getBoundingClientRect(), E = s.current, W = E ? E.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, M;
      A === "left" ? (H = _.top + 5 - W.top, M = _.right + 5 - W.left) : (H = _.top + _.height - W.top, M = V - W.left), a(W), u({ top: H, left: M, text: S });
    });
  }
  function x(k) {
    return e?.getTask(b(k)) || null;
  }
  function y(k) {
    return x(k)?.text || "";
  }
  function b(k) {
    const N = parseInt(k);
    return isNaN(N) ? k : N;
  }
  return /* @__PURE__ */ te(
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
function Ud({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(qr, { fonts: t, children: e() }) : /* @__PURE__ */ p(qr, { fonts: t });
}
function Yd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Xr, { fonts: t, children: e }) : /* @__PURE__ */ p(Xr, { fonts: t });
}
function Vd({ fonts: t = !0, children: e }) {
  return e ? /* @__PURE__ */ p(Qr, { fonts: t, children: e }) : /* @__PURE__ */ p(Qr, { fonts: t });
}
const ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ContextMenu: _d,
  Editor: Wd,
  Gantt: $d,
  HeaderMenu: zd,
  Material: Ud,
  Toolbar: Cd,
  Tooltip: Fd,
  Willow: Yd,
  WillowDark: Vd,
  defaultColumns: xo,
  defaultEditorItems: $o,
  defaultMenuOptions: ko,
  defaultTaskTypes: Co,
  defaultToolbarButtons: bo,
  getEditorItems: So,
  getMenuOptions: dr,
  getToolbarButtons: ur,
  registerEditorItem: ot,
  registerScaleUnit: Ba
}, Symbol.toStringTag, { value: "Module" }));
export {
  ou as default
};
