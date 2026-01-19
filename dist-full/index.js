import { jsx as g, jsxs as K, Fragment as ye } from 'react/jsx-runtime';
import zo, {
  useState as B,
  useEffect as P,
  useRef as W,
  createContext as At,
  useContext as ge,
  useMemo as _,
  useCallback as R,
  forwardRef as bt,
  useImperativeHandle as St,
  useId as Fo,
  Fragment as ys,
} from 'react';
import { createPortal as Oo, flushSync as Wo } from 'react-dom';
function We(t, e = 'data-id') {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
function Yn(t, e = 'data-id') {
  const n = We(t, e);
  return n ? n.getAttribute(e) : null;
}
function xt(t, e = 'data-id') {
  const n = We(t, e);
  return n ? Ht(n.getAttribute(e)) : null;
}
function Ht(t) {
  if (typeof t == 'string') {
    const e = t * 1;
    if (!isNaN(e)) return e;
  }
  return t;
}
function Po() {
  return {
    detect: () => !0,
    addEvent: function (t, e, n) {
      return t.addEventListener(e, n), () => t.removeEventListener(e, n);
    },
    addGlobalEvent: function (t, e) {
      return (
        document.addEventListener(t, e),
        () => document.removeEventListener(t, e)
      );
    },
    getTopNode: function () {
      return window.document.body;
    },
  };
}
var je = Po();
function ir(t) {
  Object.assign(je, t);
}
function Tr(t, e, n) {
  function r(s) {
    const o = We(s);
    if (!o) return;
    const i = Ht(o.dataset.id);
    if (typeof e == 'function') return e(i, s);
    let l,
      a = s.target;
    for (; a != o; ) {
      if (((l = a.dataset ? a.dataset.action : null), l && e[l])) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[n] && e[n](i, s);
  }
  je.addEvent(t, n, r);
}
function vs(t, e) {
  Tr(t, e, 'click'), e.dblclick && Tr(t, e.dblclick, 'dblclick');
}
function Vo(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    if (t[n] === e) {
      t.splice(n, 1);
      break;
    }
}
var ks = /* @__PURE__ */ new Date(),
  gn = !1,
  sn = [],
  yt = [],
  Dr = (t) => {
    if (gn) {
      gn = !1;
      return;
    }
    for (let e = yt.length - 1; e >= 0; e--) {
      const { node: n, date: r, props: s } = yt[e];
      if (
        !(r > ks) &&
        !n.contains(t.target) &&
        n !== t.target &&
        (s.callback && s.callback(t), s.modal || t.defaultPrevented)
      )
        break;
    }
  },
  Go = (t) => {
    (ks = /* @__PURE__ */ new Date()), (gn = !0);
    for (let e = yt.length - 1; e >= 0; e--) {
      const { node: n } = yt[e];
      if (!n.contains(t.target) && n !== t.target) {
        gn = !1;
        break;
      }
    }
  };
function Ut(t, e) {
  sn.length ||
    (sn = [
      je.addGlobalEvent('click', Dr, t),
      je.addGlobalEvent('contextmenu', Dr, t),
      je.addGlobalEvent('mousedown', Go, t),
    ]),
    typeof e != 'object' && (e = { callback: e });
  const n = { node: t, date: /* @__PURE__ */ new Date(), props: e };
  return (
    yt.push(n),
    {
      destroy() {
        Vo(yt, n), yt.length || (sn.forEach((r) => r()), (sn = []));
      },
    }
  );
}
var on = (t) => t.indexOf('bottom') !== -1,
  ln = (t) => t.indexOf('left') !== -1,
  an = (t) => t.indexOf('right') !== -1,
  In = (t) => t.indexOf('top') !== -1,
  Mr = (t) => t.indexOf('fit') !== -1,
  cn = (t) => t.indexOf('overlap') !== -1,
  jo = (t) => t.split('-').every((e) => ['center', 'fit'].indexOf(e) > -1),
  Yo = (t) => {
    const e = t.match(/(start|center|end)/);
    return e ? e[0] : null;
  };
function Bo(t, e) {
  let n = 0;
  const r = je.getTopNode(t);
  for (; t && t !== r; ) {
    const s = getComputedStyle(t).position;
    if (
      ((s === 'absolute' || s === 'relative' || s === 'fixed') &&
        (n = parseInt(getComputedStyle(t).zIndex) || 0),
      (t = t.parentNode),
      t === e)
    )
      break;
  }
  return n;
}
var Le, Ve, Pt, Oe;
function Ko(t, e, n = 'bottom', r = 0, s = 0) {
  if (!t) return null;
  (Le = r), (Ve = s), (Pt = 'auto');
  let o = 0,
    i = 0;
  const l = Uo(t),
    a = cn(n) ? je.getTopNode(t) : l;
  if (!l) return null;
  const c = l.getBoundingClientRect(),
    d = t.getBoundingClientRect(),
    u = a.getBoundingClientRect(),
    f = window.getComputedStyle(a),
    p = {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    };
  for (const k in p) {
    const v = `border-${k}-width`;
    p[k] = parseFloat(f.getPropertyValue(v));
  }
  if (e) {
    const k = Bo(e, l);
    o = Math.max(k + 1, 20);
  }
  if (e) {
    if (
      ((Oe = e.getBoundingClientRect()),
      Mr(n) && (Pt = Oe.width + 'px'),
      n !== 'point')
    )
      if (jo(n))
        Mr(n) ? (Le = 0) : ((Le = u.width / 2), (i = 1)),
          (Ve = (u.height - d.height) / 2);
      else {
        const k = cn(n) ? 0 : 1;
        (Le = an(n) ? Oe.right + k : Oe.left - k),
          (Ve = on(n) ? Oe.bottom + 1 : Oe.top);
        const v = Yo(n);
        v &&
          (an(n) || ln(n)
            ? v === 'center'
              ? (Ve -= (d.height - Oe.height) / 2)
              : v === 'end' && (Ve -= d.height - Oe.height)
            : (on(n) || In(n)) &&
              (v === 'center'
                ? (Le -= (d.width - Oe.width) / 2)
                : v === 'end' && (Le -= d.width - Oe.width),
              cn(n) || (Le += 1)));
      }
  } else Oe = { left: r, right: r, top: s, bottom: s };
  const m = (ln(n) || an(n)) && (on(n) || In(n));
  ln(n) && (i = 2);
  const h = Le - d.width - u.left;
  e && ln(n) && !m && h < 0 && ((Le = Oe.right), (i = 0));
  const x = Le + d.width * (1 - i / 2) - u.right;
  if (x > 0)
    if (!an(n)) Le = u.right - p.right - d.width;
    else {
      const k = Oe.left - u.x - d.width;
      e && !cn(n) && !m && k >= 0
        ? (Le = Oe.left - d.width)
        : (Le -= x + p.right);
    }
  i && (Le = Math.round(Le - (d.width * i) / 2));
  const w = h < 0 || x > 0 || !m;
  In(n) && ((Ve = Oe.top - d.height), e && Ve < u.y && w && (Ve = Oe.bottom));
  const y = Ve + d.height - u.bottom;
  return (
    y > 0 &&
      (e && on(n) && w
        ? (Ve -= d.height + Oe.height + 1)
        : (Ve -= y + p.bottom)),
    (Le -= c.left + p.left),
    (Ve -= c.top + p.top),
    (Le = Math.max(Le, 0) + a.scrollLeft),
    (Ve = Math.max(Ve, 0) + a.scrollTop),
    (Pt = Pt || 'auto'),
    { x: Le, y: Ve, z: o, width: Pt }
  );
}
function Uo(t) {
  const e = je.getTopNode(t);
  for (t && (t = t.parentElement); t; ) {
    const n = getComputedStyle(t).position;
    if (t === e || n === 'relative' || n === 'absolute' || n === 'fixed')
      return t;
    t = t.parentNode;
  }
  return null;
}
var Er = /* @__PURE__ */ new Date().valueOf();
function lr() {
  return (Er += 1), Er;
}
var qo = class {
    constructor() {
      this.store = /* @__PURE__ */ new Map();
    }
    configure(t, e) {
      this.node = e;
      for (const n in t)
        if (t[n]) {
          const r = n.toLowerCase().replace(/[ ]/g, ''),
            s = t[n];
          this.store.set(r, s);
        }
    }
  },
  Mt = [],
  Rr = {
    subscribe: (t) => {
      Xo();
      const e = new qo();
      return (
        Mt.push(e),
        t(e),
        () => {
          const n = Mt.findIndex((r) => r === e);
          n >= 0 && Mt.splice(n, 1);
        }
      );
    },
  },
  Ir = !1;
function Xo() {
  Ir ||
    ((Ir = !0),
    document.addEventListener('keydown', (t) => {
      if (
        Mt.length &&
        (t.ctrlKey ||
          t.altKey ||
          t.metaKey ||
          t.shiftKey ||
          t.key.length > 1 ||
          t.key === ' ')
      ) {
        const e = [];
        t.ctrlKey && e.push('ctrl'),
          t.altKey && e.push('alt'),
          t.metaKey && e.push('meta'),
          t.shiftKey && e.push('shift');
        let n = t.code.replace('Key', '').toLocaleLowerCase();
        t.key === ' ' && (n = 'space'), e.push(n);
        const r = e.join('+');
        for (let s = Mt.length - 1; s >= 0; s--) {
          const o = Mt[s],
            i = o.store.get(r) || o.store.get(n);
          i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
        }
      }
    }));
}
function Ge(t) {
  return t < 10 ? '0' + t : t.toString();
}
function Qo(t) {
  const e = Ge(t);
  return e.length == 2 ? '0' + e : e;
}
function bs(t) {
  const e = Math.floor(t / 11) * 11;
  return {
    start: e,
    end: e + 11,
  };
}
function Ar(t, e = 1) {
  let n = t.getDay();
  n === 0 && (n = 7), (n = (n - e + 7) % 7);
  const r = new Date(t.valueOf());
  r.setDate(t.getDate() + (3 - n));
  const s = r.getFullYear(),
    o = Math.floor((r.getTime() - new Date(s, 0, 1).getTime()) / 864e5);
  return 1 + Math.floor(o / 7);
}
var Hr = ['', ''];
function Zo(t, e, n) {
  switch (t) {
    case '%d':
      return Ge(e.getDate());
    case '%m':
      return Ge(e.getMonth() + 1);
    case '%j':
      return e.getDate();
    case '%n':
      return e.getMonth() + 1;
    case '%y':
      return Ge(e.getFullYear() % 100);
    case '%Y':
      return e.getFullYear();
    case '%D':
      return n.dayShort[e.getDay()];
    case '%l':
      return n.dayFull[e.getDay()];
    case '%M':
      return n.monthShort[e.getMonth()];
    case '%F':
      return n.monthFull[e.getMonth()];
    case '%h':
      return Ge(((e.getHours() + 11) % 12) + 1);
    case '%g':
      return ((e.getHours() + 11) % 12) + 1;
    case '%G':
      return e.getHours();
    case '%H':
      return Ge(e.getHours());
    case '%i':
      return Ge(e.getMinutes());
    case '%a':
      return ((e.getHours() > 11 ? n.pm : n.am) || Hr)[0];
    case '%A':
      return ((e.getHours() > 11 ? n.pm : n.am) || Hr)[1];
    case '%s':
      return Ge(e.getSeconds());
    case '%S':
      return Qo(e.getMilliseconds());
    case '%W':
      return Ge(Ar(e));
    case '%w':
      return Ge(Ar(e, n.weekStart ?? 1));
    case '%c': {
      let r = e.getFullYear() + '';
      return (
        (r += '-' + Ge(e.getMonth() + 1)),
        (r += '-' + Ge(e.getDate())),
        (r += 'T'),
        (r += Ge(e.getHours())),
        (r += ':' + Ge(e.getMinutes())),
        (r += ':' + Ge(e.getSeconds())),
        r
      );
    }
    case '%Q':
      return Math.floor(e.getMonth() / 3) + 1;
    default:
      return t;
  }
}
var Jo = /%[a-zA-Z]/g;
function lt(t, e) {
  return typeof t == 'function'
    ? t
    : function (n) {
        return n
          ? (n.getMonth || (n = new Date(n)), t.replace(Jo, (r) => Zo(r, n, e)))
          : '';
      };
}
function Lr(t) {
  return t && typeof t == 'object' && !Array.isArray(t);
}
function Bn(t, e) {
  for (const n in e) {
    const r = e[n];
    Lr(t[n]) && Lr(r) ? (t[n] = Bn({ ...t[n] }, e[n])) : (t[n] = e[n]);
  }
  return t;
}
function $t(t) {
  return {
    getGroup(e) {
      const n = t[e];
      return (r) => (n && n[r]) || r;
    },
    getRaw() {
      return t;
    },
    extend(e, n) {
      if (!e) return this;
      let r;
      return n ? (r = Bn({ ...e }, t)) : (r = Bn({ ...t }, e)), $t(r);
    },
  };
}
function Ce(t) {
  const [e, n] = B(t),
    r = W(t);
  return (
    P(() => {
      if (r.current !== t) {
        if (
          Array.isArray(r.current) &&
          Array.isArray(t) &&
          r.current.length === 0 &&
          t.length === 0
        )
          return;
        (r.current = t), n(t);
      }
    }, [t]),
    [e, n]
  );
}
function ei(t, e, n) {
  const [r, s] = B(() => e);
  return (
    t || console.warn(`Writable ${n} is not defined`),
    P(
      () =>
        t
          ? t.subscribe((i) => {
              s(() => i);
            })
          : void 0,
      [t],
    ),
    r
  );
}
function Z(t, e) {
  const n = t.getState(),
    r = t.getReactiveState();
  return ei(r[e], n[e], e);
}
function it(t, e) {
  const [n, r] = B(() => null);
  return (
    P(() => {
      if (!t) return;
      const s = t.getReactiveState(),
        o = s ? s[e] : null;
      return o ? o.subscribe((l) => r(() => l)) : void 0;
    }, [t, e]),
    n
  );
}
function ti(t, e) {
  const n = W(e);
  n.current = e;
  const [r, s] = B(1);
  return (
    P(
      () =>
        t.subscribe((i) => {
          (n.current = i), s((l) => l + 1);
        }),
      [t],
    ),
    [n.current, r]
  );
}
function mn(t, e) {
  const n = t.getState(),
    r = t.getReactiveState();
  return ti(r[e], n[e]);
}
function ni(t, e) {
  P(() => {
    const n = e.current;
    if (n)
      return Rr.subscribe((r) => {
        r.configure(t, n);
      });
  }, [Rr, e]);
}
function ar(t, e) {
  return typeof t == 'function' ? (typeof e == 'object' ? t(e) : t()) : t;
}
function Ss(t) {
  const e = {};
  return (
    t.split(';').forEach((n) => {
      const [r, s] = n.split(':');
      if (s) {
        let o = r.trim();
        o.indexOf('-') &&
          (o = o.replace(/-([a-z])/g, (i, l) => l.toUpperCase())),
          (e[o] = s.trim());
      }
    }),
    e
  );
}
function $s(t) {
  let e = t,
    n = [];
  return {
    subscribe: (l) => {
      n.push(l), l(e);
    },
    unsubscribe: (l) => {
      n = n.filter((a) => a !== l);
    },
    set: (l) => {
      (e = l), n.forEach((a) => a(e));
    },
    update: (l) => {
      (e = l(e)), n.forEach((a) => a(e));
    },
  };
}
function zr(t, e, n) {
  function r(s) {
    const o = We(s);
    if (!o) return;
    const i = Ht(o.dataset.id);
    if (typeof e == 'function') return e(i, s);
    let l,
      a = s.target;
    for (; a != o; ) {
      if (((l = a.dataset ? a.dataset.action : null), l && e[l])) {
        e[l](i, s);
        return;
      }
      a = a.parentNode;
    }
    e[n] && e[n](i, s);
  }
  return je.addEvent(t, n, r);
}
function ri(t, e) {
  const n = [zr(t, e, 'click')];
  return (
    e.dblclick && n.push(zr(t, e.dblclick, 'dblclick')),
    () => {
      n.forEach((r) => r());
    }
  );
}
const si = 'en-US',
  oi = {
    monthFull: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayFull: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    hours: 'Hours',
    minutes: 'Minutes',
    done: 'Done',
    clear: 'Clear',
    today: 'Today',
    am: ['am', 'AM'],
    pm: ['pm', 'PM'],
    weekStart: 0,
    clockFormat: 24,
  },
  ii = {
    ok: 'OK',
    cancel: 'Cancel',
    select: 'Select',
    'No data': 'No data',
    'Rows per page': 'Rows per page',
    'Total pages': 'Total pages',
  },
  li = {
    timeFormat: '%H:%i',
    dateFormat: '%m/%d/%Y',
    monthYearFormat: '%F %Y',
    yearFormat: '%Y',
  },
  qt = {
    core: ii,
    calendar: oi,
    formats: li,
    lang: si,
  },
  Xt = At('willow'),
  ai = At({}),
  Ze = At(null),
  cr = At(null),
  Ye = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        fieldId: cr,
        helpers: ai,
        i18n: Ze,
        theme: Xt,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  );
function Lt(t) {
  const e = ge(cr);
  return t || e;
}
function ci({
  value: t = '',
  id: e,
  placeholder: n = '',
  title: r = '',
  disabled: s = !1,
  error: o = !1,
  readonly: i = !1,
  onChange: l,
}) {
  const a = Lt(e),
    [c, d] = Ce(t),
    u = R(
      (m) => {
        const h = m.target.value;
        d(h), l && l({ value: h, input: !0 });
      },
      [l],
    ),
    f = R(
      (m) => {
        const h = m.target.value;
        d(h), l && l({ value: h });
      },
      [l],
    ),
    p = W(null);
  return (
    P(() => {
      const m = f,
        h = p.current;
      return (
        h.addEventListener('change', m),
        () => {
          h && h.removeEventListener('change', m);
        }
      );
    }, [f]),
    /* @__PURE__ */ g('textarea', {
      className: `wx-3yFVAC wx-textarea ${o ? 'wx-error' : ''}`,
      id: a,
      disabled: s,
      placeholder: n,
      readOnly: i,
      title: r,
      value: c,
      onInput: u,
      ref: p,
    })
  );
}
function at({
  type: t = '',
  css: e = '',
  icon: n = '',
  disabled: r = !1,
  title: s = '',
  text: o = '',
  children: i,
  onClick: l,
}) {
  const a = _(() => {
      let d = t
        ? t
            .split(' ')
            .filter((u) => u !== '')
            .map((u) => 'wx-' + u)
            .join(' ')
        : '';
      return e + (e ? ' ' : '') + d;
    }, [t, e]),
    c = (d) => {
      l && l(d);
    };
  return /* @__PURE__ */ K('button', {
    title: s,
    className: `wx-2ZWgb4 wx-button ${a} ${n && !i ? 'wx-icon' : ''}`,
    disabled: r,
    onClick: c,
    children: [
      n && /* @__PURE__ */ g('i', { className: 'wx-2ZWgb4 ' + n }),
      i || o || ' ',
    ],
  });
}
function di({
  id: t,
  label: e = '',
  inputValue: n = '',
  value: r = !1,
  onChange: s,
  disabled: o = !1,
}) {
  const i = Fo(),
    l = Lt(t) || i,
    [a, c] = Ce(r);
  return /* @__PURE__ */ K('div', {
    className: 'wx-2IvefP wx-checkbox',
    children: [
      /* @__PURE__ */ g('input', {
        type: 'checkbox',
        id: l,
        disabled: o,
        className: 'wx-2IvefP wx-check',
        checked: a,
        value: n,
        onChange: ({ target: d }) => {
          const u = d.checked;
          c(u), s && s({ value: u, inputValue: n });
        },
      }),
      /* @__PURE__ */ K('label', {
        htmlFor: l,
        className: 'wx-2IvefP wx-label',
        children: [
          /* @__PURE__ */ g('span', { className: 'wx-2IvefP wx-before' }),
          e &&
            /* @__PURE__ */ g('span', {
              className: 'wx-2IvefP wx-after',
              children: e,
            }),
        ],
      }),
    ],
  });
}
function zt({
  position: t = 'bottom',
  align: e = 'start',
  autoFit: n = !0,
  onCancel: r,
  width: s = '100%',
  children: o,
}) {
  const i = W(null),
    [l, a] = Ce(t),
    [c, d] = Ce(e);
  return (
    P(() => {
      if (n) {
        const u = i.current;
        if (u) {
          const f = u.getBoundingClientRect(),
            p = je.getTopNode(u).getBoundingClientRect();
          f.right >= p.right && d('end'), f.bottom >= p.bottom && a('top');
        }
      }
    }, [n]),
    P(() => {
      if (i.current) {
        const u = (f) => {
          r && r(f);
        };
        return Ut(i.current, u).destroy;
      }
    }, [r]),
    /* @__PURE__ */ g('div', {
      ref: i,
      className: `wx-32GZ52 wx-dropdown wx-${l}-${c}`,
      style: { width: s },
      children: o,
    })
  );
}
function Qt() {
  return $t(qt);
}
function ui() {
  let t = null,
    e = !1,
    n,
    r,
    s,
    o;
  const i = (d, u, f, p) => {
      (n = d), (r = u), (s = f), (o = p);
    },
    l = (d) => {
      (t = d), (e = t !== null), s(t);
    },
    a = (d, u) => {
      if (d !== null && n) {
        const f = n.querySelectorAll('.wx-list > .wx-item')[d];
        f && (f.scrollIntoView({ block: 'nearest' }), u && u.preventDefault());
      }
    },
    c = (d, u) => {
      const f = d === null ? null : Math.max(0, Math.min(t + d, r.length - 1));
      f !== t && (l(f), n ? a(f, u) : requestAnimationFrame(() => a(f, u)));
    };
  return {
    move: (d) => {
      const u = xt(d),
        f = r.findIndex((p) => p.id == u);
      f !== t && l(f);
    },
    keydown: (d, u) => {
      switch (d.code) {
        case 'Enter':
          e ? o() : l(0);
          break;
        case 'Space':
          e || l(0);
          break;
        case 'Escape':
          s((t = null));
          break;
        case 'Tab':
          s((t = null));
          break;
        case 'ArrowDown':
          c(e ? 1 : u || 0, d);
          break;
        case 'ArrowUp':
          c(e ? -1 : u || 0, d);
          break;
      }
    },
    init: i,
    navigate: c,
  };
}
function $n({ items: t = [], children: e, onSelect: n, onReady: r }) {
  const s = W(),
    o = W(ui()),
    [i, l] = B(null),
    a = W(i),
    c = (ge(Ze) || Qt()).getGroup('core'),
    d = (f) => {
      f && f.stopPropagation(), n && n({ id: t[a.current]?.id });
    };
  P(() => {
    o.current.init(
      s.current,
      t,
      (f) => {
        l(f), (a.current = f);
      },
      d,
    );
  }, [t, s.current]),
    P(() => {
      r && r(o.current);
    }, []);
  const u = R(() => {
    o.current.navigate(null);
  }, [o]);
  return i === null
    ? null
    : /* @__PURE__ */ g(zt, {
        onCancel: u,
        children: /* @__PURE__ */ g('div', {
          className: 'wx-233fr7 wx-list',
          ref: s,
          onClick: d,
          onMouseMove: o.current.move,
          children: t.length
            ? t.map((f, p) =>
                /* @__PURE__ */ g(
                  'div',
                  {
                    className: `wx-233fr7 wx-item ${p === i ? 'wx-focus' : ''}`,
                    'data-id': f.id,
                    children: e ? ar(e, { option: f }) : f.label,
                  },
                  f.id,
                ),
              )
            : /* @__PURE__ */ g('div', {
                className: 'wx-233fr7 wx-no-data',
                children: c('No data'),
              }),
        }),
      });
}
function fi({
  value: t = '',
  id: e,
  options: n = [],
  textOptions: r = null,
  textField: s = 'label',
  placeholder: o = '',
  title: i = '',
  disabled: l = !1,
  error: a = !1,
  clear: c = !1,
  children: d,
  onChange: u,
}) {
  const f = Lt(e),
    p = W(null),
    m = W(null),
    [h, x] = Ce(t),
    [w, y] = B(!1),
    [k, v] = B(''),
    C = W(null),
    S = W(!1),
    $ = _(() => {
      if (w) return k;
      if (h || h === 0) {
        const A = (r || n).find((j) => j.id === h);
        if (A) return A[s];
      }
      return '';
    }, [w, k, h, r, n, s]),
    D = _(
      () =>
        !$ || !w
          ? n
          : n.filter((A) => A[s].toLowerCase().includes($.toLowerCase())),
      [$, w, n, s],
    ),
    L = R(() => D.findIndex((A) => A.id === h), [D, h]),
    N = R((A) => {
      (p.current = A.navigate), (m.current = A.keydown);
    }, []),
    M = R(
      (A, j) => {
        if (A || A === 0) {
          let te = n.find((E) => E.id === A);
          if ((y(!1), j && p.current(null), te && h !== te.id)) {
            const E = te.id;
            x(E), u && u({ value: E });
          }
        }
        !S.current && j && C.current.focus();
      },
      [n, h, u],
    ),
    O = R(
      ({ id: A }) => {
        M(A, !0);
      },
      [M],
    ),
    H = R(
      (A) => {
        A && A.stopPropagation(), x(''), y(!1), u && u({ value: '' });
      },
      [u],
    ),
    T = R(
      (A) => {
        if (!n.length) return;
        if (A === '' && c) {
          H();
          return;
        }
        let j = n.find((E) => E[s] === A);
        j || (j = n.find((E) => E[s].toLowerCase().includes(A.toLowerCase())));
        const te = j ? j.id : h || n[0].id;
        M(te, !1);
      },
      [n, s, c, h, M, H],
    ),
    V = R(() => {
      v(C.current.value), y(!0), D.length ? p.current(0) : p.current(null);
    }, [D.length, p]),
    ee = R(() => {
      S.current = !0;
    }, []),
    le = R(() => {
      (S.current = !1),
        setTimeout(() => {
          S.current || T($);
        }, 200);
    }, [T, $]);
  return /* @__PURE__ */ K('div', {
    className: 'wx-1j11Jk wx-combo',
    onClick: () => p.current(L()),
    onKeyDown: (A) => m.current(A, L()),
    title: i,
    children: [
      /* @__PURE__ */ g('input', {
        className: 'wx-1j11Jk wx-input ' + (a ? 'wx-error' : ''),
        id: f,
        ref: C,
        value: $,
        disabled: l,
        placeholder: o,
        onFocus: ee,
        onBlur: le,
        onInput: V,
      }),
      c && !l && h
        ? /* @__PURE__ */ g('i', {
            className: 'wx-1j11Jk wx-icon wxi-close',
            onClick: H,
          })
        : /* @__PURE__ */ g('i', {
            className: 'wx-1j11Jk wx-icon wxi-angle-down',
          }),
      !l &&
        /* @__PURE__ */ g($n, {
          items: D,
          onReady: N,
          onSelect: O,
          children: ({ option: A }) =>
            /* @__PURE__ */ g(ye, { children: d ? d({ option: A }) : A[s] }),
        }),
    ],
  });
}
function Zt({
  value: t = '',
  id: e,
  readonly: n = !1,
  focus: r = !1,
  select: s = !1,
  type: o = 'text',
  placeholder: i = '',
  disabled: l = !1,
  error: a = !1,
  inputStyle: c = {},
  title: d = '',
  css: u = '',
  icon: f = '',
  clear: p = !1,
  onChange: m,
}) {
  const h = Lt(e),
    [x, w] = Ce(t),
    y = W(null),
    k = _(
      () => (f && u.indexOf('wx-icon-left') === -1 ? 'wx-icon-right ' + u : u),
      [f, u],
    ),
    v = _(() => f && u.indexOf('wx-icon-left') !== -1, [f, u]);
  P(() => {
    const L = setTimeout(() => {
      r && y.current && y.current.focus(), s && y.current && y.current.select();
    }, 1);
    return () => clearTimeout(L);
  }, [r, s]);
  const C = R(
      (L) => {
        const N = L.target.value;
        w(N), m && m({ value: N, input: !0 });
      },
      [m],
    ),
    S = R((L) => m && m({ value: L.target.value }), [m]);
  function $(L) {
    L.stopPropagation(), w(''), m && m({ value: '' });
  }
  let D = o;
  return (
    o !== 'password' && o !== 'number' && (D = 'text'),
    P(() => {
      const L = S,
        N = y.current;
      return (
        N.addEventListener('change', L),
        () => {
          N && N.removeEventListener('change', L);
        }
      );
    }, [S]),
    /* @__PURE__ */ K('div', {
      className: `wx-hQ64J4 wx-text ${k} ${a ? 'wx-error' : ''} ${l ? 'wx-disabled' : ''} ${p ? 'wx-clear' : ''}`,
      children: [
        /* @__PURE__ */ g('input', {
          className: 'wx-hQ64J4 wx-input',
          ref: y,
          id: h,
          readOnly: n,
          disabled: l,
          placeholder: i,
          type: D,
          style: c,
          title: d,
          value: x,
          onInput: C,
        }),
        p && !l && x
          ? /* @__PURE__ */ K(ye, {
              children: [
                /* @__PURE__ */ g('i', {
                  className: 'wx-hQ64J4 wx-icon wxi-close',
                  onClick: $,
                }),
                v &&
                  /* @__PURE__ */ g('i', {
                    className: `wx-hQ64J4 wx-icon ${f}`,
                  }),
              ],
            })
          : f
            ? /* @__PURE__ */ g('i', { className: `wx-hQ64J4 wx-icon ${f}` })
            : null,
      ],
    })
  );
}
function hi({ date: t, type: e, part: n, onShift: r }) {
  const { calendar: s, formats: o } = ge(Ze).getRaw(),
    i = t.getFullYear(),
    l = _(() => {
      switch (e) {
        case 'month':
          return lt(o.monthYearFormat, s)(t);
        case 'year':
          return lt(o.yearFormat, s)(t);
        case 'duodecade': {
          const { start: c, end: d } = bs(i),
            u = lt(o.yearFormat, s);
          return `${u(new Date(c, 0, 1))} - ${u(new Date(d, 11, 31))}`;
        }
        default:
          return '';
      }
    }, [t, e, i, s, o]);
  function a() {
    r && r({ diff: 0, type: e });
  }
  return /* @__PURE__ */ K('div', {
    className: 'wx-8HQVQV wx-header',
    children: [
      n !== 'right'
        ? /* @__PURE__ */ g('i', {
            className: 'wx-8HQVQV wx-pager wxi-angle-left',
            onClick: () => r && r({ diff: -1, type: e }),
          })
        : /* @__PURE__ */ g('span', { className: 'wx-8HQVQV wx-spacer' }),
      /* @__PURE__ */ g('span', {
        className: 'wx-8HQVQV wx-label',
        onClick: a,
        children: l,
      }),
      n !== 'left'
        ? /* @__PURE__ */ g('i', {
            className: 'wx-8HQVQV wx-pager wxi-angle-right',
            onClick: () => r && r({ diff: 1, type: e }),
          })
        : /* @__PURE__ */ g('span', { className: 'wx-8HQVQV wx-spacer' }),
    ],
  });
}
function dr({ onClick: t, children: e }) {
  return /* @__PURE__ */ g('button', {
    className: 'wx-3s8W4d wx-button',
    onClick: t,
    children: e,
  });
}
function pi({
  value: t,
  current: e,
  part: n = '',
  markers: r = null,
  onCancel: s,
  onChange: o,
}) {
  const i = (ge(Ze) || Qt()).getRaw().calendar,
    l = (i.weekStart || 7) % 7,
    a = i.dayShort.slice(l).concat(i.dayShort.slice(0, l)),
    c = (v, C, S) =>
      new Date(
        v.getFullYear(),
        v.getMonth() + (C || 0),
        v.getDate() + (S || 0),
      );
  let d = n !== 'normal';
  function u(v) {
    const C = v.getDay();
    return C === 0 || C === 6;
  }
  function f() {
    const v = c(e, 0, 1 - e.getDate());
    return v.setDate(v.getDate() - ((v.getDay() - (l - 7)) % 7)), v;
  }
  function p() {
    const v = c(e, 1, -e.getDate());
    return v.setDate(v.getDate() + ((6 - v.getDay() + l) % 7)), v;
  }
  const m = W(0);
  function h(v, C) {
    C.timeStamp !== m.current &&
      ((m.current = C.timeStamp),
      C.stopPropagation(),
      o && o(new Date(new Date(v))),
      s && s());
  }
  const x = _(
      () =>
        n == 'normal'
          ? [t ? c(t).valueOf() : 0]
          : t
            ? [
                t.start ? c(t.start).valueOf() : 0,
                t.end ? c(t.end).valueOf() : 0,
              ]
            : [0, 0],
      [n, t],
    ),
    w = _(() => {
      const v = f(),
        C = p(),
        S = e.getMonth();
      let $ = [];
      for (let D = v; D <= C; D.setDate(D.getDate() + 1)) {
        const L = {
          day: D.getDate(),
          in: D.getMonth() === S,
          date: D.valueOf(),
        };
        let N = '';
        if (
          ((N += L.in ? '' : ' wx-inactive'),
          (N += x.indexOf(L.date) > -1 ? ' wx-selected' : ''),
          d)
        ) {
          const M = L.date == x[0],
            O = L.date == x[1];
          M && !O ? (N += ' wx-left') : O && !M && (N += ' wx-right'),
            L.date > x[0] && L.date < x[1] && (N += ' wx-inrange');
        }
        if (((N += u(D) ? ' wx-weekend' : ''), r)) {
          const M = r(D);
          M && (N += ' ' + M);
        }
        $.push({ ...L, css: N });
      }
      return $;
    }, [e, x, d, r]),
    y = W(null);
  let k = W({});
  return (
    (k.current.click = h),
    P(() => {
      vs(y.current, k.current);
    }, []),
    /* @__PURE__ */ K('div', {
      children: [
        /* @__PURE__ */ g('div', {
          className: 'wx-398RBS wx-weekdays',
          children: a.map((v) =>
            /* @__PURE__ */ g(
              'div',
              { className: 'wx-398RBS wx-weekday', children: v },
              v,
            ),
          ),
        }),
        /* @__PURE__ */ g('div', {
          className: 'wx-398RBS wx-days',
          ref: y,
          children: w.map((v) =>
            /* @__PURE__ */ g(
              'div',
              {
                className: `wx-398RBS wx-day ${v.css} ${v.in ? '' : 'wx-out'}`,
                'data-id': v.date,
                children: v.day,
              },
              v.date,
            ),
          ),
        }),
      ],
    })
  );
}
function gi({
  value: t,
  current: e,
  part: n,
  onCancel: r,
  onChange: s,
  onShift: o,
}) {
  const [i, l] = Ce(t || /* @__PURE__ */ new Date()),
    [a, c] = Ce(e || /* @__PURE__ */ new Date()),
    d = ge(Ze).getRaw().calendar,
    u = d.monthShort || [],
    f = _(() => a.getMonth(), [a]),
    p = R(
      (x, w) => {
        if (x != null) {
          w.stopPropagation();
          const y = new Date(a);
          y.setMonth(x), c(y), o && o({ current: y });
        }
        n === 'normal' && l(new Date(a)), r && r();
      },
      [a, n, o, r],
    ),
    m = R(() => {
      const x = new Date(_s(i, n) || a);
      x.setMonth(a.getMonth()), x.setFullYear(a.getFullYear()), s && s(x);
    }, [i, a, n, s]),
    h = R(
      (x) => {
        const w = x.target.closest('[data-id]');
        if (w) {
          const y = parseInt(w.getAttribute('data-id'), 10);
          p(y, x);
        }
      },
      [p],
    );
  return /* @__PURE__ */ K(ye, {
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-34U8T8 wx-months',
        onClick: h,
        children: u.map((x, w) =>
          /* @__PURE__ */ g(
            'div',
            {
              className: 'wx-34U8T8 wx-month' + (f === w ? ' wx-current' : ''),
              'data-id': w,
              children: x,
            },
            w,
          ),
        ),
      }),
      /* @__PURE__ */ g('div', {
        className: 'wx-34U8T8 wx-buttons',
        children: /* @__PURE__ */ g(dr, { onClick: m, children: d.done }),
      }),
    ],
  });
}
const An = 'wx-1XEF33',
  mi = ({
    value: t,
    current: e,
    onCancel: n,
    onChange: r,
    onShift: s,
    part: o,
  }) => {
    const i = ge(Ze).getRaw().calendar,
      [l, a] = Ce(e),
      [c, d] = Ce(t),
      u = _(() => l.getFullYear(), [l]),
      f = _(() => {
        const { start: w, end: y } = bs(u),
          k = [];
        for (let v = w; v <= y; ++v) k.push(v);
        return k;
      }, [u]),
      p = {
        click: m,
      };
    function m(w, y) {
      if (w) {
        y.stopPropagation();
        const k = new Date(l);
        k.setFullYear(w), a(k), s && s({ current: k });
      }
      o === 'normal' && d(new Date(l)), n && n();
    }
    function h() {
      const w = new Date(_s(c, o) || l);
      w.setFullYear(l.getFullYear()), r && r(w);
    }
    const x = W(null);
    return (
      P(() => {
        x.current && vs(x.current, p);
      }, []),
      /* @__PURE__ */ K(ye, {
        children: [
          /* @__PURE__ */ g('div', {
            className: An + ' wx-years',
            ref: x,
            children: f.map((w, y) =>
              /* @__PURE__ */ g(
                'div',
                {
                  className:
                    An +
                    ` wx-year ${u == w ? 'wx-current' : ''} ${y === 0 ? 'wx-prev-decade' : ''} ${y === 11 ? 'wx-next-decade' : ''}`,
                  'data-id': w,
                  children: w,
                },
                y,
              ),
            ),
          }),
          /* @__PURE__ */ g('div', {
            className: An + ' wx-buttons',
            children: /* @__PURE__ */ g(dr, { onClick: h, children: i.done }),
          }),
        ],
      })
    );
  },
  Fr = {
    month: {
      component: pi,
      next: xi,
      prev: wi,
    },
    year: {
      component: gi,
      next: vi,
      prev: yi,
    },
    duodecade: {
      component: mi,
      next: bi,
      prev: ki,
    },
  };
function wi(t) {
  return (t = new Date(t)), t.setMonth(t.getMonth() - 1), t;
}
function xi(t) {
  return (t = new Date(t)), t.setMonth(t.getMonth() + 1), t;
}
function yi(t) {
  return (t = new Date(t)), t.setFullYear(t.getFullYear() - 1), t;
}
function vi(t) {
  return (t = new Date(t)), t.setFullYear(t.getFullYear() + 1), t;
}
function ki(t) {
  return (t = new Date(t)), t.setFullYear(t.getFullYear() - 10), t;
}
function bi(t) {
  return (t = new Date(t)), t.setFullYear(t.getFullYear() + 10), t;
}
function _s(t, e) {
  let n;
  if (e === 'normal') n = t;
  else {
    const { start: r, end: s } = t;
    e === 'left' ? (n = r) : e == 'right' ? (n = s) : (n = r && s);
  }
  return n;
}
const Si = ['clear', 'today'];
function $i(t) {
  if (t === 'done') return -1;
  if (t === 'clear') return null;
  if (t === 'today') return /* @__PURE__ */ new Date();
}
function _i({
  value: t,
  current: e,
  onCurrentChange: n,
  part: r = 'normal',
  markers: s = null,
  buttons: o,
  onShift: i,
  onChange: l,
}) {
  const a = ge(Ze).getGroup('calendar'),
    [c, d] = B('month'),
    u = Array.isArray(o) ? o : o ? Si : [],
    f = (w, y) => {
      w.preventDefault(), l && l({ value: y });
    },
    p = () => {
      c === 'duodecade' ? d('year') : c === 'year' && d('month');
    },
    m = (w) => {
      const { diff: y, current: k } = w;
      if (y === 0) {
        c === 'month' ? d('year') : c === 'year' && d('duodecade');
        return;
      }
      if (y) {
        const v = Fr[c];
        n(y > 0 ? v.next(e) : v.prev(e));
      } else k && n(k);
      i && i();
    },
    h = (w) => {
      d('month'), l && l({ select: !0, value: w });
    },
    x = _(() => Fr[c].component, [c]);
  return /* @__PURE__ */ g('div', {
    className: `wx-2Gr4AS wx-calendar ${r !== 'normal' && r !== 'both' ? 'wx-part' : ''}`,
    children: /* @__PURE__ */ K('div', {
      className: 'wx-2Gr4AS wx-wrap',
      children: [
        /* @__PURE__ */ g(hi, { date: e, part: r, type: c, onShift: m }),
        /* @__PURE__ */ K('div', {
          children: [
            /* @__PURE__ */ g(x, {
              value: t,
              current: e,
              onCurrentChange: n,
              part: r,
              markers: s,
              onCancel: p,
              onChange: h,
              onShift: m,
            }),
            c === 'month' &&
              u.length > 0 &&
              /* @__PURE__ */ g('div', {
                className: 'wx-2Gr4AS wx-buttons',
                children: u.map((w) =>
                  /* @__PURE__ */ g(
                    'div',
                    {
                      className: 'wx-2Gr4AS wx-button-item',
                      children: /* @__PURE__ */ g(dr, {
                        onClick: (y) => f(y, $i(w)),
                        children: a(w),
                      }),
                    },
                    w,
                  ),
                ),
              }),
          ],
        }),
      ],
    }),
  });
}
function _n(t) {
  let { words: e = null, optional: n = !1, children: r } = t,
    s = ge(Ze);
  const o = _(() => {
    let i = s;
    return (
      (!i || !i.extend) && (i = $t(qt)), e !== null && (i = i.extend(e, n)), i
    );
  }, [e, n, s]);
  return /* @__PURE__ */ g(Ze.Provider, { value: o, children: r });
}
function Or(t, e, n, r) {
  if (!t || r) {
    const s = e ? new Date(e) : /* @__PURE__ */ new Date();
    s.setDate(1), n(s);
  } else if (t.getDate() !== 1) {
    const s = new Date(t);
    s.setDate(1), n(s);
  }
}
const Ci = ['clear', 'today'];
function Cs({
  value: t,
  current: e,
  markers: n = null,
  buttons: r = Ci,
  onChange: s,
}) {
  const [o, i] = Ce(t),
    [l, a] = Ce(e);
  P(() => {
    Or(l, o, a, !1);
  }, [o, l]);
  const c = R(
      (u) => {
        const f = u.value;
        f ? (i(new Date(f)), Or(l, new Date(f), a, !0)) : i(null),
          s && s({ value: f ? new Date(f) : null });
      },
      [s, l],
    ),
    d = R(
      (u) => {
        a(u);
      },
      [a],
    );
  return l
    ? /* @__PURE__ */ g(_n, {
        children: /* @__PURE__ */ g(_i, {
          value: o,
          current: l,
          markers: n,
          buttons: r,
          onChange: c,
          onCurrentChange: d,
        }),
      })
    : null;
}
const Ni = ['clear', 'today'];
function Ti({
  value: t,
  id: e,
  disabled: n = !1,
  error: r = !1,
  width: s = 'unset',
  align: o = 'start',
  placeholder: i = '',
  format: l = '',
  buttons: a = Ni,
  css: c = '',
  title: d = '',
  editable: u = !1,
  clear: f = !1,
  onChange: p,
}) {
  const { calendar: m, formats: h } = (ge(Ze) || Qt()).getRaw(),
    x = l || h?.dateFormat;
  let w = typeof x == 'function' ? x : lt(x, m);
  const [y, k] = B(t),
    [v, C] = B(!1);
  P(() => {
    k(t);
  }, [t]);
  function S() {
    C(!1);
  }
  function $(N) {
    const M = N === y || (N && y && N.valueOf() === y.valueOf()) || (!N && !y);
    k(N), M || (p && p({ value: N })), setTimeout(S, 1);
  }
  const D = _(() => (y ? w(y) : ''), [y, w]);
  function L({ value: N, input: M }) {
    if ((!u && !f) || M) return;
    let O = typeof u == 'function' ? u(N) : N ? new Date(N) : null;
    (O = isNaN(O) ? y || null : O || null), $(O);
  }
  return (
    P(() => {
      const N = S;
      return (
        window.addEventListener('scroll', N),
        () => window.removeEventListener('scroll', N)
      );
    }, []),
    /* @__PURE__ */ K('div', {
      className: 'wx-1lKOFG wx-datepicker',
      onClick: () => C(!0),
      children: [
        /* @__PURE__ */ g(Zt, {
          css: c,
          title: d,
          value: D,
          id: e,
          readonly: !u,
          disabled: n,
          error: r,
          placeholder: i,
          onInput: S,
          onChange: L,
          icon: 'wxi-calendar',
          inputStyle: {
            cursor: 'pointer',
            width: '100%',
            paddingRight:
              'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
          },
          clear: f,
        }),
        v &&
          !n &&
          /* @__PURE__ */ g(zt, {
            onCancel: S,
            width: s,
            align: o,
            autoFit: !!o,
            children: /* @__PURE__ */ g(Cs, {
              buttons: a,
              value: y,
              onChange: (N) => $(N.value),
            }),
          }),
      ],
    })
  );
}
function Ns({
  value: t = '',
  options: e = [],
  textOptions: n = null,
  placeholder: r = '',
  disabled: s = !1,
  error: o = !1,
  title: i = '',
  textField: l = 'label',
  clear: a = !1,
  children: c,
  onChange: d,
}) {
  const u = W(null),
    f = W(null);
  let [p, m] = Ce(t);
  function h(v) {
    (u.current = v.navigate), (f.current = v.keydown);
  }
  const x = _(
      () => (p || p === 0 ? (n || e).find((v) => v.id === p) : null),
      [p, n, e],
    ),
    w = R(
      ({ id: v }) => {
        (v || v === 0) && (m(v), u.current(null), d && d({ value: v }));
      },
      [m, d],
    ),
    y = R(
      (v) => {
        v.stopPropagation(), m(''), d && d({ value: '' });
      },
      [m, d],
    ),
    k = R(() => e.findIndex((v) => v.id === p), [e, p]);
  return /* @__PURE__ */ K('div', {
    className: `wx-2YgblL wx-richselect ${o ? 'wx-2YgblL wx-error' : ''} ${s ? 'wx-2YgblL wx-disabled' : ''} ${c ? '' : 'wx-2YgblL wx-nowrap'}`,
    title: i,
    onClick: () => u.current(k()),
    onKeyDown: (v) => f.current(v, k()),
    tabIndex: 0,
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-2YgblL wx-label',
        children: x
          ? c
            ? c(x)
            : x[l]
          : r
            ? /* @__PURE__ */ g('span', {
                className: 'wx-2YgblL wx-placeholder',
                children: r,
              })
            : ' ',
      }),
      a && !s && p
        ? /* @__PURE__ */ g('i', {
            className: 'wx-2YgblL wx-icon wxi-close',
            onClick: y,
          })
        : /* @__PURE__ */ g('i', {
            className: 'wx-2YgblL wx-icon wxi-angle-down',
          }),
      !s &&
        /* @__PURE__ */ g($n, {
          items: e,
          onReady: h,
          onSelect: w,
          children: ({ option: v }) => (c ? c(v) : v[l]),
        }),
    ],
  });
}
function Kn({
  id: t,
  label: e = '',
  css: n = '',
  min: r = 0,
  max: s = 100,
  value: o = 0,
  step: i = 1,
  title: l = '',
  disabled: a = !1,
  onChange: c,
}) {
  const d = Lt(t),
    [u, f] = Ce(o),
    p = W({ value: u, input: u }),
    m = _(() => ((u - r) / (s - r)) * 100 + '%', [u, r, s]),
    h = _(
      () =>
        a
          ? ''
          : `linear-gradient(90deg, var(--wx-slider-primary) 0% ${m}, var(--wx-slider-background) ${m} 100%)`,
      [a, m],
    );
  function x({ target: k }) {
    const v = k.value * 1;
    f(v),
      c &&
        c({
          value: v,
          previous: p.current.input,
          input: !0,
        }),
      (p.current.input = v);
  }
  function w({ target: k }) {
    const v = k.value * 1;
    f(v),
      c && c({ value: v, previous: p.current.value }),
      (p.current.value = v);
  }
  P(() => {
    f(o);
  }, [o]);
  const y = W(null);
  return (
    P(() => {
      if (y.current)
        return (
          y.current.addEventListener('change', w),
          () => {
            y.current && y.current.removeEventListener('change', w);
          }
        );
    }, [y, w]),
    /* @__PURE__ */ K('div', {
      className: `wx-2EDJ8G wx-slider ${n}`,
      title: l,
      children: [
        e &&
          /* @__PURE__ */ g('label', {
            className: 'wx-2EDJ8G wx-label',
            htmlFor: d,
            children: e,
          }),
        /* @__PURE__ */ g('div', {
          className: 'wx-2EDJ8G wx-inner',
          children: /* @__PURE__ */ g('input', {
            id: d,
            className: 'wx-2EDJ8G wx-input',
            type: 'range',
            min: r,
            max: s,
            step: i,
            disabled: a,
            value: u,
            onInput: x,
            style: { background: h },
            ref: y,
          }),
        }),
      ],
    })
  );
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
  onChange: a,
}) => {
  const c = Lt(t),
    [d, u] = Ce(e),
    f = R(() => {
      if (l || d <= r) return;
      const x = d - n;
      u(x), a && a({ value: x });
    }, [d, l, r, n, a]),
    p = R(() => {
      if (l || d >= s) return;
      const x = d + n;
      u(x), a && a({ value: x });
    }, [d, l, s, n, a]),
    m = R(() => {
      if (!l) {
        const x = Math.round(Math.min(s, Math.max(d, r)) / n) * n,
          w = isNaN(x) ? Math.max(r, 0) : x;
        u(w), a && a({ value: w });
      }
    }, [l, d, s, r, n, a]),
    h = R(
      (x) => {
        const w = x.target.value * 1;
        u(w), a && a({ value: w, input: !0 });
      },
      [a],
    );
  return /* @__PURE__ */ K('div', {
    className: `wx-22t21n wx-counter ${i ? 'wx-disabled' : ''} ${l ? 'wx-readonly' : ''} ${o ? 'wx-error' : ''}`,
    children: [
      /* @__PURE__ */ g('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-dec',
        disabled: i,
        onClick: f,
        children: /* @__PURE__ */ g('svg', {
          className: 'wx-22t21n wx-dec',
          width: '12',
          height: '2',
          viewBox: '0 0 12 2',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          children: /* @__PURE__ */ g('path', {
            d: 'M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z',
          }),
        }),
      }),
      /* @__PURE__ */ g('input', {
        id: c,
        type: 'text',
        className: 'wx-22t21n wx-input',
        disabled: i,
        readOnly: l,
        required: !0,
        value: d,
        onBlur: m,
        onInput: h,
      }),
      /* @__PURE__ */ g('button', {
        'aria-label': '-',
        className: 'wx-22t21n wx-btn wx-btn-inc',
        disabled: i,
        onClick: p,
        children: /* @__PURE__ */ g('svg', {
          className: 'wx-22t21n wx-inc',
          width: '12',
          height: '12',
          viewBox: '0 0 12 12',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          children: /* @__PURE__ */ g('path', {
            d: `M11.2501
								6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z`,
          }),
        }),
      }),
    ],
  });
};
function Mi({ notice: t = {} }) {
  function e() {
    t.remove && t.remove();
  }
  return /* @__PURE__ */ K('div', {
    className: `wx-11sNg5 wx-notice wx-${t.type ? t.type : ''}`,
    role: 'status',
    'aria-live': 'polite',
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-11sNg5 wx-text',
        children: t.text,
      }),
      /* @__PURE__ */ g('div', {
        className: 'wx-11sNg5 wx-button',
        children: /* @__PURE__ */ g('i', {
          className: 'wx-11sNg5 wxi-close',
          onClick: e,
        }),
      }),
    ],
  });
}
function Ei({ data: t = [] }) {
  return /* @__PURE__ */ g('div', {
    className: 'wx-3nwoO9 wx-notices',
    children: t.map((e) => /* @__PURE__ */ g(Mi, { notice: e }, e.id)),
  });
}
function Ri({
  title: t = '',
  buttons: e = ['cancel', 'ok'],
  header: n,
  children: r,
  footer: s,
  onConfirm: o,
  onCancel: i,
}) {
  const l = (ge(Ze) || Qt()).getGroup('core'),
    a = W(null);
  P(() => {
    a.current?.focus();
  }, []);
  function c(u) {
    switch (u.code) {
      case 'Enter': {
        const f = u.target.tagName;
        if (f === 'TEXTAREA' || f === 'BUTTON') return;
        o && o({ event: u });
        break;
      }
      case 'Escape':
        i && i({ event: u });
        break;
    }
  }
  function d(u, f) {
    const p = { event: u, button: f };
    f === 'cancel' ? i && i(p) : o && o(p);
  }
  return /* @__PURE__ */ g('div', {
    className: 'wx-1FxkZa wx-modal',
    ref: a,
    tabIndex: 0,
    onKeyDown: c,
    children: /* @__PURE__ */ K('div', {
      className: 'wx-1FxkZa wx-window',
      children: [
        n ||
          (t
            ? /* @__PURE__ */ g('div', {
                className: 'wx-1FxkZa wx-header',
                children: t,
              })
            : null),
        /* @__PURE__ */ g('div', { children: r }),
        s ||
          (e &&
            /* @__PURE__ */ g('div', {
              className: 'wx-1FxkZa wx-buttons',
              children: e.map((u) =>
                /* @__PURE__ */ g(
                  'div',
                  {
                    className: 'wx-1FxkZa wx-button',
                    children: /* @__PURE__ */ g(at, {
                      type: `block ${u === 'ok' ? 'primary' : 'secondary'}`,
                      onClick: (f) => d(f, u),
                      children: l(u),
                    }),
                  },
                  u,
                ),
              ),
            })),
      ],
    }),
  });
}
function Ii({ children: t }, e) {
  const [n, r] = B(null),
    [s, o] = B([]);
  return (
    St(
      e,
      () => ({
        showModal: (i) => {
          const l = { ...i };
          return (
            r(l),
            new Promise((a, c) => {
              (l.resolve = (d) => {
                r(null), a(d);
              }),
                (l.reject = (d) => {
                  r(null), c(d);
                });
            })
          );
        },
        showNotice: (i) => {
          (i = { ...i }),
            (i.id = i.id || lr()),
            (i.remove = () => o((l) => l.filter((a) => a.id !== i.id))),
            i.expire != -1 && setTimeout(i.remove, i.expire || 5100),
            o((l) => [...l, i]);
        },
      }),
      [],
    ),
    /* @__PURE__ */ K(ye, {
      children: [
        t,
        n &&
          /* @__PURE__ */ g(Ri, {
            title: n.title,
            buttons: n.buttons,
            onConfirm: n.resolve,
            onCancel: n.reject,
            children: n.message,
          }),
        /* @__PURE__ */ g(Ei, { data: s }),
      ],
    })
  );
}
bt(Ii);
function Yt({
  label: t = '',
  position: e = '',
  css: n = '',
  error: r = !1,
  type: s = '',
  required: o = !1,
  children: i,
}) {
  const l = _(() => lr(), []);
  return /* @__PURE__ */ g(cr.Provider, {
    value: l,
    children: /* @__PURE__ */ K('div', {
      className:
        `wx-2oVUvC wx-field wx-${e} ${n} ${r ? 'wx-error' : ''} ${o ? 'wx-required' : ''}`.trim(),
      children: [
        t &&
          /* @__PURE__ */ g('label', {
            className: 'wx-2oVUvC wx-label',
            htmlFor: l,
            children: t,
          }),
        /* @__PURE__ */ g('div', {
          className: `wx-2oVUvC wx-field-control wx-${s}`,
          children: ar(i, { id: l }),
        }),
      ],
    }),
  });
}
const Ts = ({
    value: t = !1,
    type: e = '',
    icon: n = '',
    disabled: r = !1,
    iconActive: s = '',
    onClick: o,
    title: i = '',
    css: l = '',
    text: a = '',
    textActive: c = '',
    children: d,
    active: u,
    onChange: f,
  }) => {
    const [p, m] = Ce(t),
      h = _(() => (p ? 'pressed' : '') + (e ? ' ' + e : ''), [p, e]),
      x = R(
        (w) => {
          let y = !p;
          o && o(w), w.defaultPrevented || (m(y), f && f({ value: y }));
        },
        [p, o, f],
      );
    return p && u
      ? /* @__PURE__ */ g(at, {
          title: i,
          text: (p && c) || a,
          css: l,
          type: h,
          icon: (p && s) || n,
          onClick: x,
          disabled: r,
          children: ar(u, { value: p }),
        })
      : d
        ? /* @__PURE__ */ g(at, {
            title: i,
            text: (p && c) || a,
            css: l,
            type: h,
            icon: (p && s) || n,
            onClick: x,
            disabled: r,
            children: d,
          })
        : /* @__PURE__ */ g(at, {
            title: i,
            text: (p && c) || a,
            css: l,
            type: h,
            icon: (p && s) || n,
            onClick: x,
            disabled: r,
          });
  },
  Wr = new Date(0, 0, 0, 0, 0);
function Ai({
  value: t = Wr,
  id: e,
  title: n = '',
  css: r = '',
  disabled: s = !1,
  error: o = !1,
  format: i = '',
  onChange: l,
}) {
  let [a, c] = Ce(t);
  const { calendar: d, formats: u } = (ge(Ze) || Qt()).getRaw(),
    f = d.clockFormat == 12,
    p = 23,
    m = 59,
    h = _(() => {
      const E = i || u?.timeFormat;
      return typeof E == 'function' ? E : lt(E, d);
    }, [i, u, d]),
    x = _(() => h(new Date(0, 0, 0, 1)).indexOf('01') != -1, [h]),
    w = (E, J) => (E < 10 && J ? `0${E}` : `${E}`).slice(-2),
    y = (E) => w(E, !0),
    k = (E) => `${E}`.replace(/[^\d]/g, '') || 0,
    v = (E) => (f && ((E = E % 12), E === 0) ? '12' : w(E, x)),
    C = R((E, J) => ((E = k(E)), Math.min(E, J)), []),
    [S, $] = B(null),
    D = a || Wr,
    L = C(D.getHours(), p),
    N = C(D.getMinutes(), m),
    M = L > 12,
    O = v(L),
    H = y(N),
    T = _(() => h(new Date(0, 0, 0, L, N)), [L, N, h]),
    V = R(() => {
      $(!0);
    }, []),
    ee = R(() => {
      const E = new Date(D);
      E.setHours(E.getHours() + (M ? -12 : 12)), c(E), l && l({ value: E });
    }, [D, M, l]),
    le = R(
      ({ value: E }) => {
        if (D.getHours() === E) return;
        const J = new Date(D);
        J.setHours(E), c(J), l && l({ value: J });
      },
      [D, l],
    ),
    A = R(
      ({ value: E }) => {
        if (D.getMinutes() === E) return;
        const J = new Date(D);
        J.setMinutes(E), c(J), l && l({ value: J });
      },
      [D, l],
    ),
    j = R(
      (E) => (
        (E = C(E, p)),
        f && ((E = E * 1), E === 12 && (E = 0), M && (E += 12)),
        E
      ),
      [C, f, M],
    ),
    te = R(() => {
      $(null);
    }, []);
  return /* @__PURE__ */ K('div', {
    className: `wx-7f497i wx-timepicker ${o ? 'wx-7f497i wx-error' : ''} ${s ? 'wx-7f497i wx-disabled' : ''}`,
    onClick: s ? void 0 : V,
    style: { cursor: s ? 'default' : 'pointer' },
    children: [
      /* @__PURE__ */ g(Zt, {
        id: e,
        css: r,
        title: n,
        value: T,
        readonly: !0,
        disabled: s,
        error: o,
        icon: 'wxi-clock',
        inputStyle: {
          cursor: 'pointer',
          width: '100%',
          paddingRight:
            'calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2)',
        },
      }),
      S &&
        !s &&
        /* @__PURE__ */ g(zt, {
          onCancel: te,
          width: 'unset',
          children: /* @__PURE__ */ K('div', {
            className: 'wx-7f497i wx-wrapper',
            children: [
              /* @__PURE__ */ K('div', {
                className: 'wx-7f497i wx-timer',
                children: [
                  /* @__PURE__ */ g('input', {
                    className: 'wx-7f497i wx-digit',
                    value: O,
                    onChange: (E) => {
                      const J = j(E.target.value);
                      le({ value: J });
                    },
                  }),
                  /* @__PURE__ */ g('div', {
                    className: 'wx-7f497i wx-separator',
                    children: ':',
                  }),
                  /* @__PURE__ */ g('input', {
                    className: 'wx-7f497i wx-digit',
                    value: H,
                    onChange: (E) => {
                      const J = C(E.target.value, m);
                      A({ value: J });
                    },
                  }),
                  f &&
                    /* @__PURE__ */ g(Ts, {
                      value: M,
                      onClick: ee,
                      active: () =>
                        /* @__PURE__ */ g('span', { children: 'pm' }),
                      children: /* @__PURE__ */ g('span', { children: 'am' }),
                    }),
                ],
              }),
              /* @__PURE__ */ g(Yt, {
                width: 'unset',
                children: /* @__PURE__ */ g(Kn, {
                  label: d.hours,
                  value: L,
                  onChange: le,
                  max: p,
                }),
              }),
              /* @__PURE__ */ g(Yt, {
                width: 'unset',
                children: /* @__PURE__ */ g(Kn, {
                  label: d.minutes,
                  value: N,
                  onChange: A,
                  max: m,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
function Hi({ children: t }) {
  return /* @__PURE__ */ g('div', {
    className: 'wx-KgpO9N wx-modal',
    children: /* @__PURE__ */ g('div', {
      className: 'wx-KgpO9N wx-window',
      children: t,
    }),
  });
}
function Li({ position: t = 'right', children: e, onCancel: n }) {
  const r = W(null);
  return (
    P(() => Ut(r.current, n).destroy, []),
    /* @__PURE__ */ g('div', {
      ref: r,
      className: `wx-2L733M wx-sidearea wx-pos-${t}`,
      children: e,
    })
  );
}
function Ds({ theme: t = '', target: e, children: n }) {
  const r = W(null),
    s = W(null),
    [o, i] = B(null);
  r.current || (r.current = document.createElement('div'));
  const l = ge(Xt);
  return (
    P(() => {
      i(e || zi(s.current) || je.getTopNode(s.current));
    }, [s.current]),
    /* @__PURE__ */ K(ye, {
      children: [
        /* @__PURE__ */ g('span', { ref: s, style: { display: 'none' } }),
        s.current && o
          ? Oo(
              /* @__PURE__ */ g('div', {
                className: `wx-3ZWsT0 wx-${t || l}-theme`,
                children: n,
              }),
              o,
            )
          : null,
      ],
    })
  );
}
function zi(t) {
  const e = je.getTopNode(t);
  for (; t && t !== e && !t.getAttribute('data-wx-portal-root'); )
    t = t.parentNode;
  return t;
}
function Fi() {
  return /* @__PURE__ */ g(ye, {});
}
function Pr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(Xt.Provider, {
    value: 'material',
    children: /* @__PURE__ */ K(ye, {
      children: [
        n &&
          /* @__PURE__ */ g('div', {
            className: 'wx-theme wx-material-theme',
            children: n,
          }),
        e &&
          /* @__PURE__ */ K(ye, {
            children: [
              /* @__PURE__ */ g('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ g(Fi, {}),
              /* @__PURE__ */ g('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
function Ms() {
  return /* @__PURE__ */ g(ye, {});
}
function Vr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(Xt.Provider, {
    value: 'willow',
    children: /* @__PURE__ */ K(ye, {
      children: [
        n &&
          n &&
          /* @__PURE__ */ g('div', {
            className: 'wx-theme wx-willow-theme',
            children: n,
          }),
        e &&
          /* @__PURE__ */ K(ye, {
            children: [
              /* @__PURE__ */ g('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ g(Ms, {}),
              /* @__PURE__ */ g('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
function Gr(t) {
  const { fonts: e = !0, children: n } = t;
  return /* @__PURE__ */ g(Xt.Provider, {
    value: 'willow-dark',
    children: /* @__PURE__ */ K(ye, {
      children: [
        n &&
          n &&
          /* @__PURE__ */ g('div', {
            className: 'wx-theme wx-willow-dark-theme',
            children: n,
          }),
        e &&
          /* @__PURE__ */ K(ye, {
            children: [
              /* @__PURE__ */ g('link', {
                rel: 'preconnect',
                href: 'https://cdn.svar.dev',
                crossOrigin: 'true',
              }),
              /* @__PURE__ */ g(Ms, {}),
              /* @__PURE__ */ g('link', {
                rel: 'stylesheet',
                href: 'https://cdn.svar.dev/fonts/wxi/wx-icons.css',
              }),
            ],
          }),
      ],
    }),
  });
}
ir(je);
const Cn = {
  gantt: {
    // Header / sidebar
    'Task name': 'Task name',
    'Start date': 'Start date',
    'Add task': 'Add task',
    Duration: 'Duration',
    Task: 'Task',
    Milestone: 'Milestone',
    'Summary task': 'Summary task',
    // Sidebar
    Save: 'Save',
    Delete: 'Delete',
    Name: 'Name',
    Description: 'Description',
    'Select type': 'Select type',
    Type: 'Type',
    'End date': 'End date',
    Progress: 'Progress',
    Predecessors: 'Predecessors',
    Successors: 'Successors',
    'Add task name': 'Add task name',
    'Add description': 'Add description',
    'Select link type': 'Select link type',
    'End-to-start': 'End-to-start',
    'Start-to-start': 'Start-to-start',
    'End-to-end': 'End-to-end',
    'Start-to-end': 'Start-to-end',
    // Context menu / toolbar
    Add: 'Add',
    'Child task': 'Child task',
    'Task above': 'Task above',
    'Task below': 'Task below',
    'Convert to': 'Convert to',
    Edit: 'Edit',
    Cut: 'Cut',
    Copy: 'Copy',
    Paste: 'Paste',
    Move: 'Move',
    Up: 'Up',
    Down: 'Down',
    Indent: 'Indent',
    Outdent: 'Outdent',
    'Split task': 'Split task',
    Segment: 'Segment',
    // Toolbar
    'New task': 'New task',
    'Move up': 'Move up',
    'Move down': 'Move down',
    Undo: 'Undo',
    Redo: 'Redo',
    // Formats
    Week: 'Week',
    Q: 'Quarter',
  },
};
var Oi = /* @__PURE__ */ new Date().valueOf(),
  Wi = () => Oi++;
function Pi(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n],
      s = e[n];
    if (!Nn(r, s)) return !1;
  }
  return !0;
}
function Nn(t, e) {
  if (
    typeof t == 'number' ||
    typeof t == 'string' ||
    typeof t == 'boolean' ||
    t === null
  )
    return t === e;
  if (
    typeof t != typeof e ||
    ((t === null || e === null) && t !== e) ||
    (t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
  )
    return !1;
  if (typeof t == 'object')
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let r = t.length - 1; r >= 0; r--) if (!Nn(t[r], e[r])) return !1;
      return !0;
    } else return Pi(t, e);
  return t === e;
}
function wn(t) {
  if (typeof t != 'object' || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(wn);
  const e = {};
  for (const n in t) e[n] = wn(t[n]);
  return e;
}
var Es = class {
    constructor(t) {
      (this._nextHandler = null),
        (this._dispatch = t),
        (this.exec = this.exec.bind(this));
    }
    async exec(t, e) {
      return (
        this._dispatch(t, e),
        this._nextHandler && (await this._nextHandler.exec(t, e)),
        e
      );
    }
    setNext(t) {
      return (this._nextHandler = t);
    }
  },
  Rs = /* @__PURE__ */ new Date().valueOf(),
  Vi = () => Rs++;
function ur() {
  return 'temp://' + Rs++;
}
var jr = class {
    constructor(e) {
      (this._data = e), (this._pool = /* @__PURE__ */ new Map());
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        this._pool.set(r.id, r);
      }
    }
    add(e) {
      (e = { id: Vi(), ...e }), this._data.push(e), this._pool.set(e.id, e);
    }
    update(e, n) {
      const r = this._data.findIndex((o) => o.id == e),
        s = { ...this._data[r], ...n };
      (this._data[r] = s), this._pool.set(s.id, s);
    }
    remove(e) {
      (this._data = this._data.filter((n) => n.id != e)), this._pool.delete(e);
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
  },
  Gi = class {
    constructor(t) {
      const e = { id: 0, $level: 0, data: [], parent: null },
        n = /* @__PURE__ */ new Map();
      n.set(0, e), (this._pool = n), t && t.length && this.parse(t, 0);
    }
    parse(t, e) {
      const n = this._pool;
      for (let s = 0; s < t.length; s++) {
        const o = t[s];
        (o.parent = o.parent || e), (o.data = null), n.set(o.id, o);
      }
      for (let s = 0; s < t.length; s++) {
        const o = t[s],
          i = n.get(o.parent);
        i && (i.data || (i.data = []), i.data.push(o));
      }
      const r = n.get(e);
      this.setLevel(r, r.$level + 1, !1);
    }
    add(t, e) {
      const n = this._pool.get(t.parent || 0);
      (t.$level = n.$level + 1),
        this._pool.set(t.id, t),
        n.data
          ? e === -1
            ? (n.data = [...n.data, t])
            : Yr(n, e, t)
          : (n.data = [t]);
    }
    addAfter(t, e) {
      if (!e) return this.add(t, -1);
      const n = this.byId(e),
        r = this.byId(n.parent),
        s = dn(r, n.id) + 1;
      (t.parent = r.id), (t.$level = r.$level + 1), this.add(t, s);
    }
    remove(t) {
      const e = this._pool.get(t);
      this._remove(e);
      const n = this._pool.get(e.parent);
      (n.data = n.data.filter((r) => r.id != t)), this._clearBranch(n);
    }
    _remove(t) {
      t.data && t.data.forEach((e) => this._remove(e)), this._pool.delete(t.id);
    }
    update(t, e) {
      let n = this._pool.get(t);
      const r = this._pool.get(n.parent),
        s = dn(r, n.id);
      (n = { ...n, ...e }),
        r && s >= 0 && ((r.data[s] = n), (r.data = [...r.data])),
        this._pool.set(n.id, n);
    }
    move(t, e, n) {
      const r = this._pool.get(t),
        s = e === 'child',
        o = this._pool.get(n),
        i = o.$level + (s ? 1 : 0);
      if (!r || !o) return;
      const l = this._pool.get(r.parent),
        a = s ? o : this._pool.get(o.parent);
      a.data || (a.data = []);
      const c = dn(l, r.id);
      ji(l, c);
      const d = s ? a.data.length : dn(a, o.id) + (e === 'after' ? 1 : 0);
      if ((Yr(a, d, r), l.id === a.id && c === d)) return null;
      (r.parent = a.id),
        r.$level !== i && ((r.$level = i), this.setLevel(r, i + 1, !0)),
        this.update(r.id, r),
        this._clearBranch(l);
    }
    _clearBranch(t) {
      t.data &&
        !t.data.length &&
        (t.open && delete t.open, this.update(t.id, { data: null }));
    }
    toArray() {
      const t = [],
        e = this._pool.get(0).data;
      return e && Is(e, t), t;
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
      !n ||
        !n.data ||
        n.data.forEach((r, s) => {
          t(this.byId(r.id), s), this.eachChild(t, r.id);
        });
    }
    setLevel(t, e, n) {
      t.data &&
        (t.data = t.data.map(
          (r) => (
            n && ((r = { ...r }), this._pool.set(r.id, r)),
            (r.$level = e),
            r.data && this.setLevel(r, e + 1, n),
            r
          ),
        ));
    }
  };
function Is(t, e) {
  t.forEach((n) => {
    e.push(n), n.open === !0 && Is(n.data, e);
  });
}
function ji(t, e) {
  const n = [...t.data];
  n.splice(e, 1), (t.data = n);
}
function Yr(t, e, n) {
  const r = [...t.data];
  r.splice(e, 0, n), (t.data = r);
}
function dn(t, e) {
  return t?.data.findIndex((n) => n.id === e);
}
var As = 2,
  Yi = class {
    constructor(t) {
      t && ((this._writable = t.writable), (this._async = t.async)),
        (this._values = {}),
        (this._state = {});
    }
    setState(t, e = 0) {
      const n = {};
      return this._wrapProperties(t, this._state, this._values, '', n, e), n;
    }
    getState() {
      return this._values;
    }
    getReactive() {
      return this._state;
    }
    _wrapProperties(t, e, n, r, s, o) {
      for (const i in t) {
        const l = e[i],
          a = n[i],
          c = t[i];
        if (
          l &&
          ((a === c && typeof c != 'object') ||
            (c instanceof Date &&
              a instanceof Date &&
              a.getTime() === c.getTime()))
        )
          continue;
        const d = r + (r ? '.' : '') + i;
        l
          ? (l.__parse(c, d, s, o) && (n[i] = c),
            o & As ? (s[d] = l.__trigger) : l.__trigger())
          : (c && c.__reactive
              ? (e[i] = this._wrapNested(c, c, d, s))
              : (e[i] = this._wrapWritable(c)),
            (n[i] = c)),
          (s[d] = s[d] || null);
      }
    }
    _wrapNested(t, e, n, r) {
      const s = this._wrapWritable(t);
      return (
        this._wrapProperties(t, s, e, n, r, 0),
        (s.__parse = (o, i, l, a) => (
          this._wrapProperties(o, s, e, i, l, a), !1
        )),
        s
      );
    }
    _wrapWritable(t) {
      const e = [],
        n = function () {
          for (let r = 0; r < e.length; r++) e[r](t);
        };
      return {
        subscribe: (r) => (
          e.push(r),
          this._async ? setTimeout(r, 1, t) : r(t),
          () => {
            const s = e.indexOf(r);
            s >= 0 && e.splice(s, 1);
          }
        ),
        __trigger: () => {
          e.length && (this._async ? setTimeout(n, 1) : n());
        },
        __parse: function (r) {
          return (t = r), !0;
        },
      };
    }
  },
  Bi = class {
    constructor(t, e, n, r) {
      typeof t == 'function'
        ? (this._setter = t)
        : (this._setter = t.setState.bind(t)),
        (this._routes = e),
        (this._parsers = n),
        (this._prev = {}),
        (this._triggers = /* @__PURE__ */ new Map()),
        (this._sources = /* @__PURE__ */ new Map()),
        this._routes.forEach((s) => {
          s.in.forEach((o) => {
            const i = this._triggers.get(o) || [];
            i.push(s), this._triggers.set(o, i);
          }),
            s.out.forEach((o) => {
              const i = this._sources.get(o) || {};
              s.in.forEach((l) => (i[l] = !0)), this._sources.set(o, i);
            });
        }),
        this._routes.forEach((s) => {
          s.length = Math.max(...s.in.map((o) => Hs(o, this._sources, 1)));
        }),
        (this._bus = r);
    }
    init(t) {
      const e = {};
      for (const n in t)
        if (this._prev[n] !== t[n]) {
          const r = this._parsers[n];
          e[n] = r ? r(t[n]) : t[n];
        }
      (this._prev = this._prev ? { ...this._prev, ...t } : { ...t }),
        this.setState(e),
        this._bus && this._bus.exec('init-state', e);
    }
    setStateAsync(t) {
      const e = this._setter(t, As);
      return (
        this._async
          ? Object.assign(this._async.signals, e)
          : (this._async = {
              signals: e,
              timer: setTimeout(this._applyState.bind(this), 1),
            }),
        e
      );
    }
    _applyState() {
      const t = this._async;
      if (t) {
        (this._async = null), this._triggerUpdates(t.signals, []);
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
      const n = Object.keys(t),
        r = !e.length;
      e = e || [];
      for (let s = 0; s < n.length; s++) {
        const o = n[s],
          i = this._triggers.get(o);
        i &&
          i.forEach((l) => {
            e.indexOf(l) == -1 && e.push(l);
          });
      }
      r && this._execNext(e);
    }
    _execNext(t) {
      for (; t.length; ) {
        t.sort((n, r) => (n.length < r.length ? 1 : -1));
        const e = t[t.length - 1];
        t.splice(t.length - 1), e.exec(t);
      }
    }
  };
function Hs(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => Hs(o, e, n + 1));
  return Math.max(...s);
}
var Ki = class {
  constructor() {
    (this._nextHandler = null),
      (this._handlers = {}),
      (this._tag = /* @__PURE__ */ new WeakMap()),
      (this.exec = this.exec.bind(this));
  }
  on(e, n, r) {
    let s = this._handlers[e];
    s
      ? r && r.intercept
        ? s.unshift(n)
        : s.push(n)
      : (s = this._handlers[e] = [n]),
      r && r.tag && this._tag.set(n, r.tag);
  }
  intercept(e, n, r) {
    this.on(e, n, { ...r, intercept: !0 });
  }
  detach(e) {
    for (const n in this._handlers) {
      const r = this._handlers[n];
      for (let s = r.length - 1; s >= 0; s--)
        this._tag.get(r[s]) === e && r.splice(s, 1);
    }
  }
  async exec(e, n) {
    const r = this._handlers[e];
    if (r)
      for (let s = 0; s < r.length; s++) {
        const o = r[s](n);
        if (o === !1 || (o && o.then && (await o) === !1)) return;
      }
    return this._nextHandler && (await this._nextHandler.exec(e, n)), n;
  }
  setNext(e) {
    return (this._nextHandler = e);
  }
};
function Ui(t, e) {
  return typeof t == 'string'
    ? t.localeCompare(e, void 0, { numeric: !0 })
    : typeof t == 'object'
      ? t.getTime() - e.getTime()
      : (t ?? 0) - (e ?? 0);
}
function qi(t, e) {
  return typeof t == 'string'
    ? -t.localeCompare(e, void 0, { numeric: !0 })
    : typeof e == 'object'
      ? e.getTime() - t.getTime()
      : (e ?? 0) - (t ?? 0);
}
function Xi({ key: t, order: e }) {
  const n = e === 'asc' ? Ui : qi;
  return (r, s) => n(r[t], s[t]);
}
function Qi(t) {
  if (!t || !t.length) return;
  const e = t.map((n) => Xi(n));
  return t.length === 1
    ? e[0]
    : function (n, r) {
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
class Ji extends Gi {
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
    if (r)
      for (let o = 0; o < r.length; o++) {
        if (r[o].id === n) {
          s = !0;
          break;
        }
        if (r[o].data && ((s = this.contains(r[o].id, n)), s)) break;
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
    return (
      e.data?.forEach((i, l) => {
        const a = this.copy(i, s.id, l);
        o = o.concat(a);
      }),
      o
    );
  }
  normalizeTask(e) {
    const n = e.id || ur(),
      r = e.parent || 0,
      s = e.text || '',
      o = e.type || 'task',
      i = e.progress || 0,
      l = e.details || '',
      a = { ...e, id: n, text: s, parent: r, progress: i, type: o, details: l };
    return (
      e.segments && (a.segments = e.segments.map((c) => ({ ...c }))),
      e.segments && (a.segments = e.segments.map((c) => ({ ...c }))),
      a
    );
  }
  getSummaryId(e, n = !1) {
    const r = this._pool.get(e);
    if (!r.parent) return null;
    const s = this._pool.get(r.parent);
    if (n) {
      let o = e,
        i = this.getSummaryId(o);
      const l = [];
      for (; i; ) (o = i), l.push(i), (i = this.getSummaryId(o));
      return l;
    }
    return s.type === 'summary' ? s.id : this.getSummaryId(s.id);
  }
  sort(e) {
    (this._sort = e), e && this.sortBranch(e, 0);
  }
  sortBranch(e, n) {
    const r = this._pool.get(n || 0).data;
    r &&
      (Zi(r, e),
      r.forEach((s) => {
        this.sortBranch(e, s.id);
      }));
  }
  serialize() {
    const e = [],
      n = this._pool.get(0).data;
    return n && Ls(n, e), e;
  }
}
function Ls(t, e) {
  t.forEach((n) => {
    e.push(n), n.data && Ls(n.data, e);
  });
}
function we(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || (typeof t == 'object' && e === '[object Date]')
    ? new t.constructor(+t)
    : typeof t == 'number' ||
        e === '[object Number]' ||
        typeof t == 'string' ||
        e === '[object String]'
      ? new Date(t)
      : /* @__PURE__ */ new Date(NaN);
}
function dt(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
function Tn(t, e) {
  const n = we(t);
  return isNaN(e) ? dt(t, NaN) : (e && n.setDate(n.getDate() + e), n);
}
function fr(t, e) {
  const n = we(t);
  if (isNaN(e)) return dt(t, NaN);
  if (!e) return n;
  const r = n.getDate(),
    s = dt(t, n.getTime());
  s.setMonth(n.getMonth() + e + 1, 0);
  const o = s.getDate();
  return r >= o ? s : (n.setFullYear(s.getFullYear(), s.getMonth(), r), n);
}
function zs(t, e) {
  const n = +we(t);
  return dt(t, n + e);
}
const Fs = 6048e5,
  el = 864e5,
  Os = 6e4,
  Ws = 36e5;
function tl(t, e) {
  return zs(t, e * Ws);
}
let nl = {};
function Ps() {
  return nl;
}
function xn(t, e) {
  const n = Ps(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      n.weekStartsOn ??
      n.locale?.options?.weekStartsOn ??
      0,
    s = we(t),
    o = s.getDay(),
    i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function Bt(t) {
  return xn(t, { weekStartsOn: 1 });
}
function rl(t) {
  const e = we(t),
    n = e.getFullYear(),
    r = dt(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const s = Bt(r),
    o = dt(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Bt(o);
  return e.getTime() >= s.getTime()
    ? n + 1
    : e.getTime() >= i.getTime()
      ? n
      : n - 1;
}
function vt(t) {
  const e = we(t);
  return e.setHours(0, 0, 0, 0), e;
}
function yn(t) {
  const e = we(t),
    n = new Date(
      Date.UTC(
        e.getFullYear(),
        e.getMonth(),
        e.getDate(),
        e.getHours(),
        e.getMinutes(),
        e.getSeconds(),
        e.getMilliseconds(),
      ),
    );
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function Vs(t, e) {
  const n = vt(t),
    r = vt(e),
    s = +n - yn(n),
    o = +r - yn(r);
  return Math.round((s - o) / el);
}
function Br(t) {
  const e = rl(t),
    n = dt(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Bt(n);
}
function sl(t, e) {
  return zs(t, e * Os);
}
function ol(t, e) {
  const n = e * 3;
  return fr(t, n);
}
function Gs(t, e) {
  const n = e * 7;
  return Tn(t, n);
}
function il(t, e) {
  return fr(t, e * 12);
}
function jt(t, e) {
  const n = we(t),
    r = we(e),
    s = n.getTime() - r.getTime();
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function ll(t, e) {
  const n = vt(t),
    r = vt(e);
  return +n == +r;
}
function hr(t, e) {
  const n = Bt(t),
    r = Bt(e),
    s = +n - yn(n),
    o = +r - yn(r);
  return Math.round((s - o) / Fs);
}
function al(t, e) {
  const n = we(t),
    r = we(e),
    s = n.getFullYear() - r.getFullYear(),
    o = n.getMonth() - r.getMonth();
  return s * 12 + o;
}
function cl(t, e) {
  const n = we(t),
    r = we(e);
  return n.getFullYear() - r.getFullYear();
}
function pr(t) {
  return (e) => {
    const n = (t ? Math[t] : Math.trunc)(e);
    return n === 0 ? 0 : n;
  };
}
function js(t, e) {
  return +we(t) - +we(e);
}
function dl(t, e, n) {
  const r = js(t, e) / Ws;
  return pr(n?.roundingMethod)(r);
}
function ul(t, e, n) {
  const r = js(t, e) / Os;
  return pr(n?.roundingMethod)(r);
}
function Ys(t) {
  const e = we(t);
  return e.setHours(23, 59, 59, 999), e;
}
function gr(t) {
  const e = we(t),
    n = e.getMonth();
  return (
    e.setFullYear(e.getFullYear(), n + 1, 0), e.setHours(23, 59, 59, 999), e
  );
}
function fl(t) {
  const e = we(t);
  return +Ys(e) == +gr(e);
}
function Bs(t, e) {
  const n = we(t),
    r = we(e),
    s = jt(n, r),
    o = Math.abs(al(n, r));
  let i;
  if (o < 1) i = 0;
  else {
    n.getMonth() === 1 && n.getDate() > 27 && n.setDate(30),
      n.setMonth(n.getMonth() - s * o);
    let l = jt(n, r) === -s;
    fl(we(t)) && o === 1 && jt(t, r) === 1 && (l = !1),
      (i = s * (o - Number(l)));
  }
  return i === 0 ? 0 : i;
}
function hl(t, e, n) {
  const r = Bs(t, e) / 3;
  return pr(n?.roundingMethod)(r);
}
function pl(t, e) {
  const n = we(t),
    r = we(e),
    s = jt(n, r),
    o = Math.abs(cl(n, r));
  n.setFullYear(1584), r.setFullYear(1584);
  const i = jt(n, r) === -s,
    l = s * (o - +i);
  return l === 0 ? 0 : l;
}
function Kt(t) {
  const e = we(t),
    n = e.getMonth(),
    r = n - (n % 3);
  return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
}
function Ks(t) {
  const e = we(t);
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}
function gl(t) {
  const e = we(t),
    n = e.getFullYear();
  return e.setFullYear(n + 1, 0, 0), e.setHours(23, 59, 59, 999), e;
}
function ml(t) {
  const e = we(t),
    n = dt(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function wl(t) {
  const e = we(t);
  return e.setMinutes(59, 59, 999), e;
}
function xl(t, e) {
  const n = Ps(),
    r =
      e?.weekStartsOn ??
      e?.locale?.options?.weekStartsOn ??
      n.weekStartsOn ??
      n.locale?.options?.weekStartsOn ??
      0,
    s = we(t),
    o = s.getDay(),
    i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function mr(t) {
  const e = we(t),
    n = e.getMonth(),
    r = n - (n % 3) + 3;
  return e.setMonth(r, 0), e.setHours(23, 59, 59, 999), e;
}
function Us(t) {
  const e = we(t),
    n = e.getFullYear(),
    r = e.getMonth(),
    s = dt(t, 0);
  return s.setFullYear(n, r + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function yl(t) {
  const e = we(t).getFullYear();
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function qs(t) {
  const e = we(t);
  return String(new Date(e)) === 'Invalid Date' ? NaN : yl(e) ? 366 : 365;
}
function vl(t) {
  const e = Br(t),
    n = +Br(Gs(e, 60)) - +e;
  return Math.round(n / Fs);
}
function Tt(t, e) {
  const n = we(t),
    r = we(e);
  return +n == +r;
}
function kl(t) {
  const e = we(t);
  return e.setMinutes(0, 0, 0), e;
}
function bl(t, e, n) {
  const r = xn(t, n),
    s = xn(e, n);
  return +r == +s;
}
function Sl(t, e) {
  const n = we(t),
    r = we(e);
  return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth();
}
function $l(t, e) {
  const n = Kt(t),
    r = Kt(e);
  return +n == +r;
}
function _l(t, e) {
  const n = we(t),
    r = we(e);
  return n.getFullYear() === r.getFullYear();
}
const Un = {
    year: pl,
    quarter: hl,
    month: Bs,
    week: hr,
    day: Vs,
    hour: dl,
    minute: ul,
  },
  ut = {
    year: { quarter: 4, month: 12, week: vl, day: Cl, hour: Nl },
    quarter: { month: 3, week: Tl, day: Xs, hour: Dl },
    month: { week: Ml, day: El, hour: Rl },
    week: { day: 7, hour: 168 },
    day: { hour: 24 },
    hour: { minute: 60 },
  };
function Cl(t) {
  return t ? qs(t) : 365;
}
function Nl(t) {
  return qs(t) * 24;
}
function Tl(t) {
  const e = Kt(t),
    n = Tn(vt(mr(t)), 1);
  return hr(n, e);
}
function Xs(t) {
  if (t) {
    const e = Kt(t),
      n = mr(t);
    return Vs(n, e) + 1;
  }
  return 91;
}
function Dl(t) {
  return Xs(t) * 24;
}
function Ml(t) {
  if (t) {
    const e = Ks(t),
      n = Tn(vt(gr(t)), 1);
    return hr(n, e);
  }
  return 5;
}
function El(t) {
  return t ? Us(t) : 30;
}
function Rl(t) {
  return Us(t) * 24;
}
function vn(t, e, n) {
  const r = ut[t][e];
  return r ? (typeof r == 'number' ? r : r(n)) : 1;
}
function Il(t, e) {
  return t === e || !!(ut[t] && ut[t][e]);
}
const kn = {
  year: il,
  quarter: ol,
  month: fr,
  week: Gs,
  day: Tn,
  hour: tl,
  minute: sl,
};
function wr(t, e, n) {
  if (e) {
    if (t === 'day') return (r, s) => e.getWorkingDays(s, r, !0);
    if (t === 'hour') return (r, s) => e.getWorkingHours(s, r, !0);
  }
  return (r, s, o, i) =>
    !ut[t][o] || typeof ut[t][o] == 'number' || Js(t, r, s, n)
      ? Gt(t, r, s, o, i, n)
      : Al(r, s, t, o, i, n);
}
function Gt(t, e, n, r, s, o) {
  const i = r || t;
  let l = n,
    a = e;
  if (
    (s && ((l = ct(i, n, o)), (a = ct(i, e, o)), a < e && (a = st(i)(a, 1))),
    t !== i)
  ) {
    const c = Un[i](a, l),
      d = vn(t, i, n);
    return c / d;
  } else return Un[i](a, l);
}
function Al(t, e, n, r, s, o) {
  let i = 0;
  const l = ct(n, e, o);
  if (e > l) {
    const c = kn[n](l, 1);
    (i = Gt(n, c, e, r, void 0, o)), (e = c);
  }
  let a = 0;
  return (
    Js(n, e, t, o) ||
      ((a = Gt(n, ct(n, t, o), e, void 0, void 0, o)), (e = kn[n](e, a))),
    (a += i + Gt(n, t, e, r, void 0, o)),
    !a && s && (a = Gt(n, t, e, r, s, o)),
    a
  );
}
function st(t, e) {
  if (e) {
    if (t === 'day') return (n, r) => e.addWorkingDays(n, r, !0);
    if (t === 'hour') return (n, r) => e.addWorkingHours(n, r);
  }
  return kn[t];
}
const Qs = {
  year: ml,
  quarter: Kt,
  month: Ks,
  week: (t, e) => xn(t, { weekStartsOn: e }),
  day: vt,
  hour: kl,
};
function ct(t, e, n) {
  const r = Qs[t];
  return r ? r(e, n) : new Date(e);
}
const Hl = {
    year: gl,
    quarter: mr,
    month: gr,
    week: (t, e) => xl(t, { weekStartsOn: e }),
    day: Ys,
    hour: wl,
  },
  Zs = {
    year: _l,
    quarter: $l,
    month: Sl,
    week: (t, e, n) => bl(t, e, { weekStartsOn: n }),
    day: ll,
  };
function Js(t, e, n, r) {
  const s = Zs[t];
  return s ? s(e, n, r) : !1;
}
const Ll = {
    start: Qs,
    end: Hl,
    add: kn,
    isSame: Zs,
    diff: Un,
    smallerCount: ut,
  },
  Kr = (t) => (typeof t == 'function' ? t(/* @__PURE__ */ new Date()) : t);
function zl(t, e) {
  for (const n in e) {
    if (n === 'smallerCount') {
      const r = Object.keys(e[n])
        .sort((l, a) => tt.indexOf(l) - tt.indexOf(a))
        .shift();
      let s = tt.indexOf(r);
      const o = e[n][r],
        i = Kr(o);
      for (let l = s - 1; l >= 0; l--) {
        const a = tt[l],
          c = Kr(ut[a][r]);
        if (i <= c) break;
        s = l;
      }
      tt.splice(s, 0, t);
    }
    if (n === 'biggerCount') for (const r in e[n]) ut[r][t] = e[n][r];
    else Ll[n][t] = e[n];
  }
}
function Hn(t, e = 1, n) {
  return (
    n.isWorkingDay(t) ||
      (t = e > 0 ? n.getNextWorkingDay(t) : n.getPreviousWorkingDay(t)),
    t
  );
}
function Fl(t) {
  return (e, n) => {
    if (n > 0) for (let r = 0; r < n; r++) e = t.getNextWorkingDay(e);
    if (n < 0) for (let r = 0; r > n; r--) e = t.getPreviousWorkingDay(e);
    return e;
  };
}
function It(t) {
  const e = /* @__PURE__ */ new Date();
  return t
    .map((n) => ({ item: n, len: st(n.unit)(e, 1) }))
    .sort((n, r) => (n.len < r.len ? -1 : 1))[0].item;
}
const tt = ['year', 'quarter', 'month', 'week', 'day', 'hour'],
  qn = 50,
  Xn = 300;
function Ol(t, e, n, r, s) {
  let o = t,
    i = e,
    l = !1,
    a = !1;
  s &&
    s.forEach((d) => {
      (!t || n) && (!o || d.start <= o) && ((o = d.start), (l = !0));
      const u = d.type === 'milestone' ? d.start : d.end;
      (!e || n) && (!i || u >= i) && ((i = u), (a = !0));
    });
  const c = st(r || 'day');
  return (
    o
      ? l && (o = c(o, -1))
      : i
        ? (o = c(i, -30))
        : (o = /* @__PURE__ */ new Date()),
    i ? a && (i = c(i, 1)) : (i = c(o, 30)),
    { _start: o, _end: i }
  );
}
function Wl(t, e, n, r, s, o, i) {
  const l = It(i).unit,
    a = wr(l, void 0, o),
    c = a(e, t, '', !0),
    d = ct(l, e, o);
  (t = ct(l, t, o)), (e = d < e ? st(l)(d, 1) : d);
  const u = c * r,
    f = s * i.length,
    p = i.map((h) => {
      const x = [],
        w = st(h.unit);
      let y = ct(h.unit, t, o);
      for (; y < e; ) {
        const k = w(y, h.step),
          v = y < t ? t : y,
          C = k > e ? e : k,
          S = a(C, v, '', !0) * r,
          $ = typeof h.format == 'function' ? h.format(y, k) : h.format;
        let D = '';
        h.css && (D += typeof h.css == 'function' ? h.css(y) : h.css),
          x.push({ width: S, value: $, date: v, css: D, unit: h.unit }),
          (y = k);
      }
      return { cells: x, add: w, height: s };
    });
  let m = r;
  return (
    l !== n && (m = Math.round(m / vn(l, n)) || 1),
    {
      rows: p,
      width: u,
      height: f,
      diff: a,
      start: t,
      end: e,
      lengthUnit: n,
      minUnit: l,
      lengthUnitWidth: m,
    }
  );
}
function Pl(t, e, n, r) {
  const s = typeof t == 'boolean' ? {} : t,
    o = tt.indexOf(It(n).unit);
  if ((typeof s.level > 'u' && (s.level = o), s.levels))
    s.levels.forEach((a) => {
      a.minCellWidth || (a.minCellWidth = un(s.minCellWidth, qn)),
        a.maxCellWidth || (a.maxCellWidth = un(s.maxCellWidth, Xn));
    });
  else {
    const a = [],
      c = n.length || 1,
      d = un(s.minCellWidth, qn),
      u = un(s.maxCellWidth, Xn);
    n.forEach((f) => {
      f.format && !e[f.unit] && (e[f.unit] = f.format);
    }),
      tt.forEach((f, p) => {
        if (p === o) a.push({ minCellWidth: d, maxCellWidth: u, scales: n });
        else {
          const m = [];
          if (p)
            for (let h = c - 1; h > 0; h--) {
              const x = tt[p - h];
              x && m.push({ unit: x, step: 1, format: e[x] });
            }
          m.push({ unit: f, step: 1, format: e[f] }),
            a.push({ minCellWidth: d, maxCellWidth: u, scales: m });
        }
      }),
      (s.levels = a);
  }
  s.levels[s.level] || (s.level = 0);
  const i = s.levels[s.level],
    l = Math.min(Math.max(r, i.minCellWidth), i.maxCellWidth);
  return { zoom: s, scales: i.scales, cellWidth: l };
}
function Vl(t, e, n, r, s, o, i) {
  t.level = n;
  let l;
  const a = r.scales || r,
    c = It(a).unit,
    d = Gl(c, s);
  if (e === -1) {
    const p = vn(c, s);
    l = i * p;
  } else {
    const p = vn(It(o).unit, c);
    l = Math.round(i / p);
  }
  const u = r.minCellWidth ?? qn,
    f = r.maxCellWidth ?? Xn;
  return {
    scales: a,
    cellWidth: Math.min(f, Math.max(u, l)),
    lengthUnit: d,
    zoom: t,
  };
}
function Gl(t, e) {
  const n = tt.indexOf(t),
    r = tt.indexOf(e);
  return r >= n ? (t === 'hour' ? 'hour' : 'day') : tt[r];
}
function un(t, e) {
  return t ?? e;
}
const Qn = 8,
  eo = 4,
  jl = 3,
  Ur = 7,
  Yl = Qn + eo;
function to(t, e, n, r) {
  (t.open || t.type != 'summary') &&
    t.data?.forEach((s) => {
      typeof s.$x > 'u' && ro(s, n, r), (s.$x += e), to(s, e, n, r);
    });
}
function Zn(t, e, n, r) {
  const s = t.getSummaryId(e.id);
  if (s) {
    const o = t.byId(s),
      i = { xMin: 1 / 0, xMax: 0 };
    no(o, i, n, r), (o.$x = i.xMin), (o.$w = i.xMax - i.xMin), Zn(t, o, n, r);
  }
}
function no(t, e, n, r) {
  t.data?.forEach((s) => {
    if (!s.unscheduled) {
      typeof s.$x > 'u' && ro(s, n, r);
      const o = s.type === 'milestone' && s.$h ? s.$h / 2 : 0;
      e.xMin > s.$x && (e.xMin = s.$x + o);
      const i = s.$x + s.$w - o;
      e.xMax < i && (e.xMax = i);
    }
    s.type !== 'summary' && no(s, e, n, r);
  });
}
function ro(t, e, n) {
  (t.$x = Math.round(e.diff(t.start, e.start, e.lengthUnit) * n)),
    (t.$w = Math.round(e.diff(t.end, t.start, e.lengthUnit, !0) * n));
}
function xr(t, e) {
  let n;
  e && (n = e.filter((s) => s.parent == t.id));
  const r = { data: n, ...t };
  if (r.data?.length)
    r.data.forEach((s) => {
      if (s.unscheduled && !s.data) return;
      (e || (s.type != 'summary' && s.data)) &&
        (s.unscheduled && (s = { ...s, start: void 0, end: void 0 }),
        (s = xr(s, e))),
        s.start &&
          (!r.start || r.start > s.start) &&
          (r.start = new Date(s.start));
      const o = s.end || s.start;
      o && (!r.end || r.end < o) && (r.end = new Date(o));
    });
  else if (t.type === 'summary')
    throw Error(
      'Summary tasks must have start and end dates if they have no subtasks',
    );
  return r;
}
function so(t, e, n) {
  return (
    qr(t, e, n, !1),
    n.splitTasks &&
      t.segments?.forEach((r) => {
        so(r, e, { ...n, baselines: !1 }), (r.$x -= t.$x);
      }),
    n.baselines && qr(t, e, n, !0),
    t
  );
}
function qr(t, e, n, r) {
  const { cellWidth: s, cellHeight: o, _scales: i, baselines: l } = n,
    { start: a, end: c, lengthUnit: d, diff: u } = i,
    f = (r ? 'base_' : '') + 'start',
    p = (r ? 'base_' : '') + 'end',
    m = '$x' + (r ? '_base' : ''),
    h = '$y' + (r ? '_base' : ''),
    x = '$w' + (r ? '_base' : ''),
    w = '$h' + (r ? '_base' : ''),
    y = '$skip' + (r ? '_baseline' : '');
  let k = t[f],
    v = t[p];
  if (r && !k) {
    t[y] = !0;
    return;
  }
  t[f] < a && (t[p] < a || Tt(t[p], a)) ? (k = v = a) : t[f] > c && (k = v = c),
    (t[m] = Math.round(u(k, a, d) * s)),
    (t[h] = r ? t.$y + t.$h + eo : o * e + jl),
    (t[x] = Math.round(u(v, k, d, !0) * s)),
    (t[w] = r ? Qn : l ? o - Ur - Yl : o - Ur),
    t.type === 'milestone' &&
      ((t[m] = t[m] - t.$h / 2),
      (t[x] = t.$h),
      r && ((t[h] = t.$y + Qn), (t[x] = t[w] = t.$h))),
    n.unscheduledTasks && t.unscheduled && !r
      ? (t.$skip = !0)
      : (t[y] = Tt(k, v));
}
const Ln = 20,
  Bl = function (t, e, n, r, s) {
    const o = Math.round(r / 2) - 3;
    if (!e || !n || !e.$y || !n.$y || e.$skip || n.$skip)
      return (t.$p = ''), (t.$pl = 0), t;
    let i = !1,
      l = !1;
    switch (t.type) {
      case 'e2s':
        l = !0;
        break;
      case 's2s':
        (i = !0), (l = !0);
        break;
      case 's2e':
        i = !0;
        break;
    }
    const a = i ? e.$x : e.$x + e.$w,
      c = s ? e.$y - 7 : e.$y,
      d = l ? n.$x : n.$x + n.$w,
      u = s ? n.$y - 7 : n.$y;
    if (a !== d || c !== u) {
      const f = Ul(a, c + o, d, u + o, i, l, r / 2, s),
        p = ql(d, u + o, l);
      (t.$p = `${f},${p}`), (t.$pl = Kl(t.$p));
    }
    return t;
  };
function Kl(t) {
  const e = t.split(',').map(Number),
    n = [];
  for (let s = 0; s < e.length; s += 2)
    s + 1 < e.length && n.push([e[s], e[s + 1]]);
  let r = 0;
  for (let s = 0; s < n.length - 1; s++) {
    const [o, i] = n[s],
      [l, a] = n[s + 1];
    r += Math.hypot(l - o, a - i);
  }
  return r;
}
function Ul(t, e, n, r, s, o, i, l) {
  const a = Ln * (s ? -1 : 1),
    c = Ln * (o ? -1 : 1),
    d = t + a,
    u = n + c,
    f = [t, e, d, e, 0, 0, 0, 0, u, r, n, r],
    p = u - d;
  let m = r - e;
  const h = o === s;
  return (
    h ||
      (((u <= t + Ln - 2 && o) || (u > t && !o)) &&
        (m = l ? m - i + 6 : m - i)),
    (h && o && d > u) || (h && !o && d < u)
      ? ((f[4] = f[2] + p), (f[5] = f[3]), (f[6] = f[4]), (f[7] = f[5] + m))
      : ((f[4] = f[2]), (f[5] = f[3] + m), (f[6] = f[4] + p), (f[7] = f[5])),
    f.join(',')
  );
}
function ql(t, e, n) {
  return n
    ? `${t - 5},${e - 3},${t - 5},${e + 3},${t},${e}`
    : `${t + 5},${e + 3},${t + 5},${e - 3},${t},${e}`;
}
function oo(t) {
  return t.map((e) => {
    const n = e.id || ur();
    return { ...e, id: n };
  });
}
const io = ['start', 'end', 'duration'];
function Xl(t, e) {
  const { type: n, unscheduled: r } = t;
  return r || n === 'summary'
    ? !io.includes(e)
    : n === 'milestone'
      ? !['end', 'duration'].includes(e)
      : !0;
}
function Ql(t, e) {
  return typeof e == 'function'
    ? e
    : io.includes(t)
      ? (typeof e == 'string' && (e = { type: e, config: {} }),
        e.config || (e.config = {}),
        e.type === 'datepicker' && (e.config.buttons = ['today']),
        (n, r) => (Xl(n, r.id) ? e : null))
      : e;
}
function Zl(t) {
  return !t || !t.length
    ? []
    : t.map((e) => {
        const n = e.align || 'left',
          r = e.id === 'add-task',
          s = !r && e.flexgrow ? e.flexgrow : null,
          o = s ? 1 : e.width || (r ? 50 : 120),
          i = e.editor && Ql(e.id, e.editor);
        return {
          width: o,
          align: n,
          header: e.header,
          id: e.id,
          template: e.template,
          _template: e._template,
          ...(s && { flexgrow: s }),
          cell: e.cell,
          resize: e.resize ?? !0,
          sort: e.sort ?? !r,
          ...(i && { editor: i }),
          ...(e.options && { options: e.options }),
        };
      });
}
const lo = [
  { id: 'text', header: 'Task name', flexgrow: 1, sort: !0 },
  { id: 'start', header: 'Start date', align: 'center', sort: !0 },
  { id: 'duration', header: 'Duration', width: 100, align: 'center', sort: !0 },
  {
    id: 'add-task',
    header: 'Add task',
    width: 50,
    align: 'center',
    sort: !1,
    resize: !1,
  },
];
function Dt(t, e, n, r) {
  const { selected: s, tasks: o } = t.getState(),
    i = s.length,
    l = ['edit-task', 'paste-task', 'edit-task:task', 'edit-task:segment'],
    a = ['copy-task', 'cut-task'],
    c = [
      'copy-task',
      'cut-task',
      'delete-task',
      'indent-task:remove',
      'move-task:down',
    ],
    d = ['add-task', 'undo', 'redo'],
    u = ['indent-task:add', 'move-task:down', 'move-task:up'],
    f = { 'indent-task:remove': 2 },
    p = !i && d.includes(e),
    m = { parent: u.includes(e), level: f[e] };
  if (((n = n || (i ? s[s.length - 1] : null)), !(!n && !p))) {
    if (
      (e !== 'paste-task' && (t._temp = null),
      l.includes(e) || p || s.length === 1)
    )
      Xr(t, e, n, r);
    else if (i) {
      const h = a.includes(e) ? s : Jl(s, o, m);
      c.includes(e) && h.reverse();
      const x = t.getHistory();
      x && x.startBatch(),
        h.forEach((w, y) => Xr(t, e, w, r, y)),
        x && x.endBatch();
    }
  }
}
function Jl(t, e, n) {
  let r = t.map((s) => {
    const o = e.byId(s);
    return {
      id: s,
      level: o.$level,
      parent: o.parent,
      index: e.getIndexById(s),
    };
  });
  return (
    (n.parent || n.level) &&
      (r = r.filter(
        (s) => (n.level && s.level <= n.level) || !t.includes(s.parent),
      )),
    r.sort((s, o) => s.level - o.level || s.index - o.index),
    r.map((s) => s.id)
  );
}
function Xr(t, e, n, r, s) {
  const o = t.exec ? t.exec : t.in.exec;
  let i = e.split(':')[0],
    l = e.split(':')[1];
  const a = n?.id || n;
  let c = { id: a },
    d = {},
    u = !1;
  if (i == 'copy-task' || i == 'cut-task') {
    t._temp || (t._temp = []), t._temp.push({ id: a, cut: i == 'cut-task' });
    return;
  } else if (i == 'paste-task') {
    if (t._temp && t._temp.length) {
      const f = t.getHistory();
      f && f.startBatch();
      const p = /* @__PURE__ */ new Map();
      if (
        (t._temp.forEach((m) => {
          const h = { id: m.id, target: a, mode: 'after' };
          o(m.cut ? 'move-task' : 'copy-task', h), p.set(m.id, h.id);
        }),
        !t._temp[0].cut)
      ) {
        const { links: m } = t.getState(),
          h = t._temp.map((w) => w.id),
          x = [];
        m.forEach((w) => {
          h.includes(w.source) && h.includes(w.target) && x.push(w);
        }),
          x.forEach((w) => {
            o('add-link', {
              link: {
                source: p.get(w.source),
                target: p.get(w.target),
                type: w.type,
              },
            });
          }),
          t._temp.forEach((w, y) => {
            o('select-task', { id: p.get(w.id), toggle: !!y });
          });
      }
      f && f.endBatch(), (t._temp = null);
    }
    return;
  } else
    i === 'add-task'
      ? ((d = {
          task: { type: 'task', text: r('New Task') },
          target: a,
          show: !0,
          select: !1,
        }),
        (c = {}),
        (u = !0))
      : i === 'edit-task'
        ? ((i = 'show-editor'),
          l === 'segment' && typeof n == 'object' && (d = n))
        : i === 'convert-task'
          ? ((i = 'update-task'), (d = { task: { type: l } }), (l = void 0))
          : i === 'indent-task' && (l = l === 'add');
  if (i === 'split-task' && typeof n == 'object') d = n;
  else if (i === 'delete-task' && l === 'segment' && typeof n == 'object') {
    const f = t.getTask(a),
      { segmentIndex: p } = n,
      m = f.segments.filter((h, x) => x !== p);
    o('update-task', { id: a, task: { segments: m } });
    return;
  }
  typeof l < 'u' && (d = { mode: l, ...d }),
    (c = { ...c, ...d }),
    o(i, c),
    u && o('select-task', { id: c.id, toggle: !!s });
}
function yr(t, e) {
  return t.some((n) => (n.data ? yr(n.data, e) : n.id === e));
}
const Qr = (t, e) => st(t, e),
  ea = (t, e) => wr(t, e);
function Jn(t, e) {
  Array.isArray(t) &&
    (t.forEach((n) => wt(n, e)),
    t.forEach((n) => {
      if (n.type === 'summary' && !(n.start && n.end)) {
        const { start: r, end: s } = xr(n, t);
        (n.start = r), (n.end = s), wt(n, e);
      }
    }));
}
function wt(t, e) {
  t.unscheduled || Zr(t, e, !1), t.base_start && Zr(t, e, !0);
}
function Zr(t, e, n) {
  const { calendar: r, durationUnit: s } = e,
    o = s || 'day',
    [i, l, a] = ao(n);
  t.type === 'milestone'
    ? ((t[a] = 0), (t[l] = void 0))
    : t[i] &&
      (t[a]
        ? (t[l] = Qr(o, r)(t[i], t[a]))
        : t[l]
          ? (t[a] = ea(o, r)(t[l], t[i]))
          : ((t[l] = Qr(o, r)(t[i], 1)), (t[a] = 1)));
}
function ao(t) {
  return t
    ? ['base_start', 'base_end', 'base_duration']
    : ['start', 'end', 'duration'];
}
function Jr(t, e, n) {
  const [r, s, o] = ao(n);
  (e === o || e === r) && (t[s] = null),
    e === s &&
      ((t[o] = 0), t[r] && t[r] >= t[s] && ((t[s] = null), (t[o] = 1)));
}
function co(t, e, n) {
  Jr(t, n, !1), t.base_start && Jr(t, n, !0), wt(t, e);
}
class ta extends Yi {
  in;
  _router;
  _modules = /* @__PURE__ */ new Map();
  constructor(e) {
    super({ writable: e, async: !1 }),
      (this._router = new Bi(
        super.setState.bind(this),
        [
          {
            in: ['tasks', 'start', 'end', 'scales', 'autoScale'],
            out: ['_start', '_end'],
            exec: (s) => {
              const {
                _end: o,
                _start: i,
                start: l,
                end: a,
                tasks: c,
                scales: d,
                autoScale: u,
              } = this.getState();
              if (!l || !a || u) {
                const f = It(d).unit,
                  p = Ol(l, a, u, f, c);
                (p._end != o || p._start != i) && this.setState(p, s);
              } else this.setState({ _start: l, _end: a }, s);
            },
          },
          {
            in: [
              '_start',
              '_end',
              'cellWidth',
              'scaleHeight',
              'scales',
              'lengthUnit',
              '_weekStart',
            ],
            out: ['_scales'],
            exec: (s) => {
              const o = this.getState();
              let { lengthUnit: i } = o;
              const {
                  _start: l,
                  _end: a,
                  cellWidth: c,
                  scaleHeight: d,
                  scales: u,
                  _weekStart: f,
                } = o,
                p = It(u).unit;
              Il(p, i) || (i = p);
              const m = Wl(l, a, i, c, d, f, u);
              this.setState({ _scales: m }, s);
            },
          },
          {
            in: [
              '_scales',
              'tasks',
              'cellHeight',
              'baselines',
              'unscheduledTasks',
            ],
            out: ['_tasks'],
            exec: (s) => {
              const {
                  cellWidth: o,
                  cellHeight: i,
                  tasks: l,
                  _scales: a,
                  baselines: c,
                  splitTasks: d,
                  unscheduledTasks: u,
                } = this.getState(),
                f = l
                  .toArray()
                  .map((p, m) =>
                    so(p, m, {
                      cellWidth: o,
                      cellHeight: i,
                      _scales: a,
                      baselines: c,
                      splitTasks: d,
                      unscheduledTasks: u,
                    }),
                  );
              this.setState({ _tasks: f }, s);
            },
          },
          {
            in: ['_tasks', 'links', 'cellHeight'],
            out: ['_links'],
            exec: (s) => {
              const {
                  tasks: o,
                  links: i,
                  cellHeight: l,
                  baselines: a,
                  criticalPath: c,
                } = this.getState(),
                d = i
                  .map((u) => {
                    const f = o.byId(u.source),
                      p = o.byId(u.target);
                    return Bl(u, f, p, l, a);
                  })
                  .toSorted((u, f) =>
                    c
                      ? !!u.$critical == !!f.$critical
                        ? f.$pl - u.$pl
                        : u.$critical
                          ? 1
                          : -1
                      : f.$pl - u.$pl,
                  )
                  .filter((u) => u !== null);
              this.setState({ _links: d }, s);
            },
          },
          {
            in: ['tasks', 'activeTask'],
            out: ['_activeTask'],
            exec: (s) => {
              const o = this.getState();
              let { activeTask: i } = o;
              i && typeof i == 'object' && (i = i.id);
              const l = o.tasks.byId(i);
              this.setState({ _activeTask: l || null }, s);
            },
          },
          {
            in: ['tasks', 'selected'],
            out: ['_selected'],
            exec: (s) => {
              const { tasks: o, selected: i } = this.getState(),
                l = i.map((a) => o.byId(a)).filter((a) => !!a);
              this.setState({ _selected: l }, s);
            },
          },
          {
            in: ['start', 'end'],
            out: ['cellWidth'],
            exec: (s) => {
              const { _cellWidth: o, cellWidth: i } = this.getState();
              o != i && this.setState({ cellWidth: o }, s);
            },
          },
        ],
        {
          tasks: (s) => new Ji(s),
          links: (s) => new jr(s),
          columns: (s) => Zl(s),
        },
      ));
    const n = (this.in = new Ki());
    n.on('show-editor', (s) => {
      const { splitTasks: o } = this.getState();
      if (o) {
        const { id: i, segmentIndex: l } = s;
        if (i && (l || l === 0)) {
          this.setStateAsync({ activeTask: { id: i, segmentIndex: l } });
          return;
        }
      }
      this.setStateAsync({ activeTask: s.id });
    }),
      n.on(
        'select-task',
        ({ id: s, toggle: o, range: i, show: l, segmentIndex: a }) => {
          const {
            selected: c,
            _tasks: d,
            activeTask: u,
            splitTasks: f,
          } = this.getState();
          let p = !1,
            m;
          if (c.length && (o || i)) {
            const x = [...c];
            if (i) {
              const w = x[x.length - 1],
                y = d.findIndex(($) => $.id == w),
                k = d.findIndex(($) => $.id == s),
                v = Math.min(y, k),
                C = Math.max(y, k) + 1,
                S = d.slice(v, C).map(($) => $.id);
              y > k && S.reverse(),
                S.forEach(($) => {
                  x.includes($) || x.push($);
                });
            } else if (o) {
              const w = x.findIndex((y) => y == s);
              w === -1 ? x.push(s) : ((p = !0), x.splice(w, 1));
            }
            m = x;
          } else m = [s];
          const h = { selected: m };
          l && m.length && (h._scrollTask = { id: m[0], mode: l }),
            this.setStateAsync(h),
            !p &&
              u &&
              (u !== s || f) &&
              n.exec('show-editor', { id: s, ...(f && { segmentIndex: a }) });
        },
      ),
      n.on('delete-link', ({ id: s }) => {
        const { links: o } = this.getState();
        o.remove(s), this.setStateAsync({ links: o });
      }),
      n.on('update-link', (s) => {
        const { links: o } = this.getState(),
          i = s.id;
        let l = s.link;
        o.update(i, l),
          (l = o.byId(i)),
          !l.lag && l.lag !== 0 && delete l.lag,
          this.setStateAsync({ links: o }),
          (s.link = l);
      }),
      n.on('add-link', (s) => {
        const { link: o } = s,
          { links: i } = this.getState();
        !o.source ||
          !o.target ||
          (o.type || (o.type = 'e2s'),
          (o.id = o.id || ur()),
          i.add(o),
          this.setStateAsync({ links: i }),
          (s.id = o.id),
          (s.link = i.byId(o.id)));
      });
    let r = null;
    n.on('move-task', (s) => {
      const { tasks: o } = this.getState();
      let { mode: i, target: l } = s;
      const { id: a, inProgress: c } = s,
        d = o.byId(a);
      if (
        (typeof c > 'u'
          ? (s.source = d.parent)
          : (s.source = r = r ?? d.parent),
        c === !1)
      ) {
        o.update(d.id, { $reorder: !1 }),
          this.setState({ tasks: o }),
          (r = null);
        return;
      }
      if (l === a || o.contains(a, l)) {
        s.skipProvider = !0;
        return;
      }
      if (i === 'up' || i === 'down') {
        const u = o.getBranch(a);
        let f = o.getIndexById(a);
        if (i === 'up') {
          const p = d.parent === 0;
          if (f === 0 && p) {
            s.skipProvider = !0;
            return;
          }
          (f -= 1), (i = 'before');
        } else if (i === 'down') {
          const p = f === u.length - 1,
            m = d.parent === 0;
          if (p && m) {
            s.skipProvider = !0;
            return;
          }
          (f += 1), (i = 'after');
        }
        if (((l = (u[f] && u[f].id) || d.parent), l)) {
          const p = o.getBranch(l);
          let m = o.getIndexById(l),
            h = p[m];
          if (h.data) {
            if (i === 'before') {
              if (h.parent === d.parent) {
                for (; h.data; )
                  h.open || n.exec('open-task', { id: h.id, mode: !0 }),
                    (h = h.data[h.data.length - 1]);
                l = h.id;
              }
            } else if (i === 'after') {
              let y;
              h.parent === d.parent
                ? ((y = h), (h = h.data[0]), (l = h.id), (i = 'before'))
                : p.length - 1 !== m &&
                  ((y = h),
                  (m += 1),
                  (h = p[m]),
                  d.$level > h.$level && h.data
                    ? ((y = h), (h = h.data[0]), (l = h.id), (i = 'before'))
                    : (l = h.id)),
                y && !y.open && n.exec('open-task', { id: y.id, mode: !0 });
            }
          }
          const x = o.getSummaryId(d.id);
          o.move(a, i, l);
          const w = o.getSummaryId(a);
          x != w &&
            (x && this.resetSummaryDates(x, 'move-task'),
            w && this.resetSummaryDates(w, 'move-task'));
        }
      } else {
        const u = o.byId(l);
        let f = u,
          p = !1;
        for (; f.$level > d.$level; )
          (f = o.byId(f.parent)), f.id === a && (p = !0);
        if (p) return;
        const m = o.getSummaryId(d.id);
        if ((o.move(a, i, l), i == 'child')) {
          let x = u;
          for (; x.id !== 0 && !x.open; )
            n.exec('open-task', { id: x.id, mode: !0 }), (x = o.byId(x.parent));
        }
        const h = o.getSummaryId(a);
        m != h &&
          (m && this.resetSummaryDates(m, 'move-task'),
          h && this.resetSummaryDates(h, 'move-task'));
      }
      c ? this.setState({ tasks: o }) : this.setStateAsync({ tasks: o }),
        (s.target = l),
        (s.mode = i);
    }),
      n.on('drag-task', (s) => {
        const o = this.getState(),
          { tasks: i, _tasks: l, _selected: a, _scales: c, cellWidth: d } = o,
          u = i.byId(s.id),
          { left: f, top: p, width: m, inProgress: h } = s,
          x = { _tasks: l, _selected: a };
        if ((typeof m < 'u' && ((u.$w = m), Zn(i, u, c, d)), typeof f < 'u')) {
          if (u.type === 'summary') {
            const w = f - u.$x;
            to(u, w, c, d);
          }
          (u.$x = f), Zn(i, u, c, d);
        }
        typeof p < 'u' && ((u.$y = p + 4), (u.$reorder = h)),
          typeof m < 'u' && (u.$w = m),
          typeof f < 'u' && (u.$x = f),
          typeof p < 'u' && ((u.$y = p + 4), (u.$reorder = h)),
          this.setState(x);
      }),
      n.on('update-task', (s) => {
        const { id: o, segmentIndex: i, diff: l, eventSource: a } = s;
        let { task: c } = s;
        const {
            tasks: d,
            _scales: u,
            durationUnit: f,
            splitTasks: p,
            calendar: m,
          } = this.getState(),
          h = d.byId(o),
          x = { durationUnit: f, calendar: m };
        if (
          a === 'add-task' ||
          a === 'copy-task' ||
          a === 'move-task' ||
          a === 'update-task' ||
          a === 'delete-task' ||
          a === 'provide-data'
        ) {
          wt(c, x), d.update(o, c);
          return;
        }
        const w = u.lengthUnit;
        let y = st(w);
        const k = wr(w, m);
        if (
          (l &&
            (c.start && (c.start = y(c.start, l)),
            !i &&
              i !== 0 &&
              (c.start && c.end
                ? (c.duration = h.duration)
                : (c.start
                    ? (c.end = h.end)
                    : ((c.end = y(c.end, l)),
                      (c.start = h.start),
                      (c.duration = k(c.end, c.start))),
                  k(c.end, c.start) || (c.duration = 1)))),
          (c.type = c.type ?? h.type),
          m && c.start && (c.start = Hn(c.start, l, m)),
          c.start &&
            c.end &&
            (!Tt(c.start, h.start) || !Tt(c.end, h.end)) &&
            c.type === 'summary' &&
            h.data?.length)
        ) {
          let C = l || k(c.start, h.start);
          m &&
            ((C =
              c.start > h.start ? k(c.start, h.start) : -k(h.start, c.start)),
            (y = Fl(m))),
            this.moveSummaryKids(
              h,
              (S) => ((S = y(S, C)), m ? Hn(S, l, m) : S),
              'update-task',
            );
        }
        c.start || (c.start = h.start),
          !c.end && !c.duration && (c.duration = h.duration),
          wt(c, x),
          d.update(o, c),
          ((m && c.type === 'summary') ||
            (c.type === 'summary' && h.type !== 'summary')) &&
            this.resetSummaryDates(o, 'update-task', !0);
        const v = d.getSummaryId(o);
        v && this.resetSummaryDates(v, 'update-task'),
          this.setStateAsync({ tasks: d }),
          (s.task = d.byId(o));
      }),
      n.on('add-task', (s) => {
        const {
            tasks: o,
            _scales: i,
            unscheduledTasks: l,
            durationUnit: a,
            splitTasks: c,
            calendar: d,
          } = this.getState(),
          { target: u, mode: f, task: p, show: m, select: h = !0 } = s;
        !s.eventSource && l && (p.unscheduled = !0);
        let x = -1,
          w,
          y;
        if (
          (u
            ? ((y = o.byId(u)),
              f == 'child'
                ? ((w = y), (p.parent = w.id))
                : (y.parent !== null &&
                    ((w = o.byId(y.parent)), (p.parent = w.id)),
                  (x = o.getIndexById(u)),
                  f == 'after' && (x += 1)))
            : p.parent && (w = o.byId(p.parent)),
          !p.start)
        ) {
          if (w?.start) p.start = new Date(w.start.valueOf());
          else if (y) p.start = new Date(y.start.valueOf());
          else {
            const S = o.getBranch(0);
            let $;
            if (S?.length) {
              const D = S[S.length - 1];
              if (!D.$skip) {
                const L = new Date(D.start.valueOf());
                i.start <= L && ($ = L);
              }
            }
            p.start = $ || st(a, d)(i.start, 1);
          }
          p.duration = 1;
        }
        d && (p.start = Hn(p.start, 1, d)),
          this.getState().baselines &&
            ((p.base_start = p.start), (p.base_duration = p.duration)),
          wt(p, { durationUnit: a, calendar: d });
        const k = o.add(p, x),
          v = { tasks: o };
        if (w && m) {
          for (; w && w.id; )
            n.exec('open-task', { id: w.id, mode: !0 }), (w = o.byId(w.parent));
          v._scrollTask = { id: k.id, mode: m };
        }
        s.id = k.id;
        const C = o.getSummaryId(k.id);
        C && this.resetSummaryDates(C, 'add-task'),
          this.setStateAsync(v),
          (s.id = k.id),
          (s.task = k),
          h && n.exec('select-task', { id: k.id });
      }),
      n.on('delete-task', (s) => {
        const { id: o } = s,
          { tasks: i, links: l, selected: a } = this.getState();
        s.source = i.byId(o).parent;
        const c = i.getSummaryId(o),
          d = [o];
        i.eachChild((f) => d.push(f.id), o),
          l.filter((f) => !(d.includes(f.source) || d.includes(f.target)));
        const u = { tasks: i, links: l };
        a.includes(o) && (u.selected = a.filter((f) => f !== o)),
          i.remove(o),
          c && this.resetSummaryDates(c, 'delete-task'),
          this.setStateAsync(u);
      }),
      n.on('indent-task', ({ id: s, mode: o }) => {
        const { tasks: i } = this.getState();
        if (o) {
          const l = i.getBranch(s)[i.getIndexById(s) - 1];
          l && n.exec('move-task', { id: s, mode: 'child', target: l.id });
        } else {
          const l = i.byId(s),
            a = i.byId(l.parent);
          a &&
            a.parent !== null &&
            n.exec('move-task', { id: s, mode: 'after', target: l.parent });
        }
      }),
      n.on('copy-task', (s) => {
        const { id: o, target: i, mode: l, eventSource: a } = s;
        if (a === 'copy-task') return;
        const { tasks: c, links: d } = this.getState();
        if (c.contains(o, i)) {
          s.skipProvider = !0;
          return;
        }
        const u = c.getSummaryId(o),
          f = c.getSummaryId(i);
        let p = c.getIndexById(i);
        l == 'before' && (p -= 1);
        const m = c.byId(o),
          h = c.copy(m, c.byId(i).parent, p + 1);
        (s.source = s.id),
          (s.id = h[0][1]),
          m.lazy && (s.lazy = !0),
          u != f && f && this.resetSummaryDates(f, 'copy-task');
        let x = [];
        for (let w = 1; w < h.length; w++) {
          const [y, k] = h[w];
          d.forEach((v) => {
            if (v.source === y) {
              const C = { ...v };
              delete C.target, x.push({ ...C, source: k });
            } else if (v.target === y) {
              const C = { ...v };
              delete C.source, x.push({ ...C, target: k });
            }
          });
        }
        x = x.reduce((w, y) => {
          const k = w.findIndex((v) => v.id === y.id);
          return k > -1 ? (w[k] = { ...w[k], ...y }) : w.push(y), w;
        }, []);
        for (let w = 1; w < h.length; w++) {
          const [y, k] = h[w],
            v = c.byId(k);
          n.exec('copy-task', {
            source: y,
            id: k,
            lazy: !!v.lazy,
            eventSource: 'copy-task',
            target: v.parent,
            mode: 'child',
            skipUndo: !0,
          });
        }
        x.forEach((w) => {
          n.exec('add-link', {
            link: { source: w.source, target: w.target, type: w.type },
            eventSource: 'copy-task',
            skipUndo: !0,
          });
        }),
          this.setStateAsync({ tasks: c });
      }),
      n.on('open-task', ({ id: s, mode: o }) => {
        const { tasks: i } = this.getState(),
          l = i.byId(s);
        l.lazy
          ? n.exec('request-data', { id: l.id })
          : (i.toArray().forEach((a) => (a.$y = 0)),
            i.update(s, { open: o }),
            this.setState({ tasks: i }));
      }),
      n.on('scroll-chart', ({ left: s, top: o }) => {
        if (!isNaN(s)) {
          const i = this.calcScaleDate(s);
          this.setState({ scrollLeft: s, _scaleDate: i });
        }
        isNaN(o) || this.setState({ scrollTop: o });
      }),
      n.on('render-data', (s) => {
        this.setState({ area: s });
      }),
      n.on('provide-data', (s) => {
        const {
            tasks: o,
            links: i,
            durationUnit: l,
            calendar: a,
            splitTasks: c,
          } = this.getState(),
          d = o.byId(s.id);
        d.lazy ? ((d.lazy = !1), (d.open = !0)) : (d.data = []),
          Jn(s.data.tasks, { durationUnit: l, calendar: a }),
          o.parse(s.data.tasks, s.id),
          d.type == 'summary' && this.resetSummaryDates(d.id, 'provide-data'),
          this.setStateAsync({
            tasks: o,
            links: new jr(i.map((u) => u).concat(oo(s.data.links))),
          });
      }),
      n.on('zoom-scale', ({ dir: s, offset: o }) => {
        const {
            zoom: i,
            cellWidth: l,
            _cellWidth: a,
            scrollLeft: c,
          } = this.getState(),
          d = o + c,
          u = this.calcScaleDate(d);
        let f = l;
        s < 0 && (f = a || l);
        const p = f + s * 50,
          m = i.levels[i.level],
          h = s < 0 && l > m.maxCellWidth;
        if (p < m.minCellWidth || p > m.maxCellWidth || h) {
          if (!this.changeScale(i, s)) return;
        } else this.setState({ cellWidth: p, _cellWidth: p });
        const {
            _scales: x,
            _start: w,
            cellWidth: y,
            _weekStart: k,
          } = this.getState(),
          v = ct(x.minUnit, w, k),
          C = x.diff(u, v, 'hour');
        typeof o > 'u' && (o = y);
        let S = Math.round(C * y) - o;
        S < 0 && (S = 0),
          this.setState({ scrollLeft: S, _scaleDate: u, _zoomOffset: o });
      }),
      n.on('expand-scale', ({ minWidth: s }) => {
        const {
            _start: o,
            _scales: i,
            start: l,
            end: a,
            _end: c,
            cellWidth: d,
            _scaleDate: u,
            _zoomOffset: f,
          } = this.getState(),
          p = st(i.minUnit);
        let m = i.width;
        if (l && a) {
          if (m < s && m) {
            const k = s / m;
            this.setState({ cellWidth: d * k });
          }
          return !0;
        }
        let h = 0;
        for (; m < s; ) (m += d), h++;
        const x = h ? (a ? -h : -1) : 0,
          w = l || p(o, x);
        let y = 0;
        if (u) {
          const k = i.diff(u, w, 'hour');
          y = Math.max(0, Math.round(k * d) - (f || 0));
        }
        this.setState({ _start: w, _end: a || p(c, h), scrollLeft: y });
      }),
      n.on('sort-tasks', ({ key: s, order: o, add: i }) => {
        const l = this.getState(),
          { tasks: a } = l;
        let c = l._sort;
        const d = { key: s, order: o };
        let u = c?.length || 0;
        u && i
          ? (c.forEach((f, p) => {
              f.key === s && (u = p);
            }),
            (c[u] = d))
          : (c = [d]),
          a.sort(c),
          this.setState({ _sort: c, tasks: a });
      }),
      n.on('hotkey', ({ key: s, event: o, eventSource: i }) => {
        switch (s) {
          case 'arrowup':
          case 'arrowdown': {
            const { selected: l, _tasks: a } = this.getState();
            o.preventDefault();
            const c = l.length;
            let d;
            if (
              (s === 'arrowup'
                ? (d = c ? this.getPrevRow(l[c - 1])?.id : a[a.length - 1]?.id)
                : (d = c ? this.getNextRow(l[c - 1])?.id : a[0]?.id),
              d)
            ) {
              const u = i === 'chart' ? 'xy' : !0;
              this.in.exec('select-task', { id: d, show: u });
            }
            break;
          }
          case 'ctrl+c': {
            Dt(this, 'copy-task', null, null);
            break;
          }
          case 'ctrl+x': {
            Dt(this, 'cut-task', null, null);
            break;
          }
          case 'ctrl+v': {
            Dt(this, 'paste-task', null, null);
            break;
          }
          case 'ctrl+d':
          case 'backspace': {
            o.preventDefault(), Dt(this, 'delete-task', null, null);
            break;
          }
          case 'ctrl+z': {
            this.in.exec('undo', {});
            break;
          }
          case 'ctrl+y': {
            this.in.exec('redo', {});
            break;
          }
        }
      });
  }
  init(e) {
    const n = this.getState().area
      ? {}
      : { scrollLeft: 0, scrollTop: 0, area: { from: 0, start: 0, end: 0 } };
    e.cellWidth && (e._cellWidth = e.cellWidth),
      (e._sort = null),
      (e.unscheduledTasks = !1),
      (e.baselines = !1),
      (e.markers = []),
      (e._markers = []),
      (e.undo = !1),
      (e.schedule = {}),
      (e.criticalPath = null),
      (e.splitTasks = !1),
      Array.isArray(e.tasks) && this.getHistory()?.resetHistory(),
      this._router.init({
        _scrollTask: null,
        selected: [],
        markers: [],
        autoScale: !0,
        durationUnit: 'day',
        ...n,
        ...e,
      });
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
    return this.getState().undo ? this._modules.get('historyManager') : null;
  }
  serialize() {
    const { tasks: e } = this.getState();
    return e.serialize();
  }
  changeScale(e, n) {
    const r = e.level + n,
      s = e.levels[r];
    if (s) {
      const { cellWidth: o, scales: i, _scales: l } = this.getState(),
        a = Vl(e, n, r, s, l.lengthUnit, i, o);
      return (a._cellWidth = a.cellWidth), this.setState(a), !0;
    }
    return !1;
  }
  isScheduled(e) {
    return this.getState().unscheduledTasks
      ? e.some((n) => !n.unscheduled || (n.data && this.isScheduled(n.data)))
      : !0;
  }
  resetSummaryDates(e, n, r) {
    const {
        tasks: s,
        durationUnit: o,
        splitTasks: i,
        calendar: l,
      } = this.getState(),
      a = s.byId(e),
      c = a.data;
    if (c?.length && this.isScheduled(c)) {
      const d = xr({ ...a, start: void 0, end: void 0, duration: void 0 });
      if (!Tt(a.start, d.start) || !Tt(a.end, d.end)) {
        r
          ? (wt(d, { durationUnit: o, calendar: l }), s.update(e, d))
          : this.in.exec('update-task', {
              id: e,
              task: d,
              eventSource: n,
              skipUndo: !0,
            });
        const u = s.getSummaryId(e);
        u && this.resetSummaryDates(u, n);
      }
    }
  }
  moveSummaryKids(e, n, r) {
    const { tasks: s } = this.getState();
    e.data.forEach((o) => {
      const i = { ...s.byId(o.id), start: n(o.start) };
      delete i.end,
        delete i.id,
        this.in.exec('update-task', {
          id: o.id,
          task: i,
          eventSource: r,
          skipUndo: !0,
        }),
        o.data?.length && this.moveSummaryKids(o, n, r);
    });
  }
  calcScaleDate(e) {
    const { _scales: n, _start: r, _weekStart: s } = this.getState(),
      o = n.lengthUnit === 'day' ? n.lengthUnitWidth / 24 : n.lengthUnitWidth;
    return st('hour')(ct(n.minUnit, r, s), Math.floor(e / o));
  }
  getNextRow(e) {
    const n = this.getState()._tasks,
      r = n.findIndex((s) => s.id == e);
    return n[r + 1];
  }
  getPrevRow(e) {
    const n = this.getState()._tasks,
      r = n.findIndex((s) => s.id == e);
    return n[r - 1];
  }
}
function na(t, e, n, r) {
  if (typeof document > 'u') return '';
  const s = document.createElement('canvas');
  {
    const o = ra(s, t, e, 1, n);
    sa(o, r, 0, t, 0, e);
  }
  return s.toDataURL();
}
function ra(t, e, n, r, s) {
  t.setAttribute('width', (e * r).toString()),
    t.setAttribute('height', (n * r).toString());
  const o = t.getContext('2d');
  return o.translate(-0.5, -0.5), (o.strokeStyle = s), o;
}
function sa(t, e, n, r, s, o) {
  t.beginPath(),
    t.moveTo(r, s),
    t.lineTo(r, o),
    e === 'full' && t.lineTo(n, o),
    t.stroke();
}
function er(t) {
  return [...uo];
}
function vr(t) {
  return t.map((e) => {
    switch ((e.data && vr(e.data), e.id)) {
      case 'add-task:before':
      case 'move-task:up':
        e.isDisabled = (n, r) => ia(n, r);
        break;
      case 'move-task:down':
        e.isDisabled = (n, r) => la(n, r);
        break;
      case 'indent-task:add':
        e.isDisabled = (n, r) => aa(n, r) === n.parent;
        break;
      case 'indent-task:remove':
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
  const { _tasks: n } = e,
    r = n.findIndex((s) => s.id === t.id);
  return n[r - 1]?.id ?? t.parent;
}
function es(t) {
  return t && typeof t == 'object';
}
function ca(t) {
  return !t.selected || t.selected.length < 2;
}
const da = (t) => (e) => e.type === t,
  uo = vr([
    {
      id: 'add-task',
      text: 'Add',
      icon: 'wxi-plus',
      data: [
        { id: 'add-task:child', text: 'Child task' },
        { id: 'add-task:before', text: 'Task above' },
        { id: 'add-task:after', text: 'Task below' },
      ],
    },
    { type: 'separator' },
    {
      id: 'convert-task',
      text: 'Convert to',
      icon: 'wxi-swap-horizontal',
      dataFactory: (t) => ({
        id: `convert-task:${t.id}`,
        text: `${t.label}`,
        isDisabled: da(t.id),
      }),
    },
    {
      id: 'edit-task',
      text: 'Edit',
      icon: 'wxi-edit',
      isHidden: (t, e, n) => es(n),
    },
    { type: 'separator' },
    { id: 'cut-task', text: 'Cut', icon: 'wxi-content-cut', subtext: 'Ctrl+X' },
    {
      id: 'copy-task',
      text: 'Copy',
      icon: 'wxi-content-copy',
      subtext: 'Ctrl+C',
    },
    {
      id: 'paste-task',
      text: 'Paste',
      icon: 'wxi-content-paste',
      subtext: 'Ctrl+V',
    },
    {
      id: 'move-task',
      text: 'Move',
      icon: 'wxi-swap-vertical',
      data: [
        { id: 'move-task:up', text: 'Up' },
        { id: 'move-task:down', text: 'Down' },
      ],
    },
    { type: 'separator' },
    { id: 'indent-task:add', text: 'Indent', icon: 'wxi-indent' },
    { id: 'indent-task:remove', text: 'Outdent', icon: 'wxi-unindent' },
    { type: 'separator' },
    {
      id: 'delete-task',
      icon: 'wxi-delete',
      text: 'Delete',
      subtext: 'Ctrl+D / BS',
      isHidden: (t, e, n) => ca(e) && es(n),
    },
  ]);
function tr(t) {
  return [...fo];
}
const fo = vr([
  {
    id: 'add-task',
    comp: 'button',
    icon: 'wxi-plus',
    text: 'New task',
    type: 'primary',
  },
  {
    id: 'edit-task',
    comp: 'icon',
    icon: 'wxi-edit',
    menuText: 'Edit',
    text: 'Ctrl+E',
  },
  {
    id: 'delete-task',
    comp: 'icon',
    icon: 'wxi-delete',
    menuText: 'Delete',
    text: 'Ctrl+D, Backspace',
  },
  { comp: 'separator' },
  {
    id: 'move-task:up',
    comp: 'icon',
    icon: 'wxi-angle-up',
    menuText: 'Move up',
  },
  {
    id: 'move-task:down',
    comp: 'icon',
    icon: 'wxi-angle-down',
    menuText: 'Move down',
  },
  { comp: 'separator' },
  {
    id: 'copy-task',
    comp: 'icon',
    icon: 'wxi-content-copy',
    menuText: 'Copy',
    text: 'Ctrl+V',
  },
  {
    id: 'cut-task',
    comp: 'icon',
    icon: 'wxi-content-cut',
    menuText: 'Cut',
    text: 'Ctrl+X',
  },
  {
    id: 'paste-task',
    comp: 'icon',
    icon: 'wxi-content-paste',
    menuText: 'Paste',
    text: 'Ctrl+V',
  },
  { comp: 'separator' },
  {
    id: 'indent-task:add',
    comp: 'icon',
    icon: 'wxi-indent',
    menuText: 'Indent',
  },
  {
    id: 'indent-task:remove',
    comp: 'icon',
    icon: 'wxi-unindent',
    menuText: 'Outdent',
  },
]);
function zn(t) {
  return t.type === 'summary';
}
function Fn(t) {
  return t.type === 'milestone';
}
function On(t) {
  return typeof t.parent > 'u';
}
function Wn(t, e) {
  return e.unscheduledTasks && t.unscheduled;
}
function ho(t) {
  return [...po];
}
const po = [
    {
      key: 'text',
      comp: 'text',
      label: 'Name',
      config: { placeholder: 'Add task name' },
    },
    {
      key: 'details',
      comp: 'textarea',
      label: 'Description',
      config: { placeholder: 'Add description' },
    },
    { key: 'type', comp: 'select', label: 'Type', isHidden: (t) => On(t) },
    {
      key: 'start',
      comp: 'date',
      label: 'Start date',
      isHidden: (t) => zn(t),
      isDisabled: Wn,
    },
    {
      key: 'end',
      comp: 'date',
      label: 'End date',
      isHidden: (t) => zn(t) || Fn(t),
      isDisabled: Wn,
    },
    {
      key: 'duration',
      comp: 'counter',
      label: 'Duration',
      config: { min: 1 },
      isHidden: (t) => zn(t) || Fn(t),
      isDisabled: Wn,
    },
    {
      key: 'progress',
      comp: 'slider',
      label: 'Progress',
      config: { min: 1, max: 100 },
      isHidden: (t) => Fn(t) || On(t),
    },
    { key: 'links', comp: 'links', label: '', isHidden: (t) => On(t) },
  ],
  go = [
    { id: 'task', label: 'Task' },
    { id: 'summary', label: 'Summary task' },
    { id: 'milestone', label: 'Milestone' },
  ],
  ht = At(null);
/* @__PURE__ */ new Date().valueOf();
function ua(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1;
  for (const n in e) {
    const r = t[n],
      s = e[n];
    if (!Jt(r, s)) return !1;
  }
  return !0;
}
function Jt(t, e) {
  if (
    typeof t == 'number' ||
    typeof t == 'string' ||
    typeof t == 'boolean' ||
    t === null
  )
    return t === e;
  if (
    typeof t != typeof e ||
    ((t === null || e === null) && t !== e) ||
    (t instanceof Date && e instanceof Date && t.getTime() !== e.getTime())
  )
    return !1;
  if (typeof t == 'object')
    if (Array.isArray(t) && Array.isArray(e)) {
      if (t.length !== e.length) return !1;
      for (let n = t.length - 1; n >= 0; n--) if (!Jt(t[n], e[n])) return !1;
      return !0;
    } else return ua(t, e);
  return t === e;
}
function nr(t) {
  if (typeof t != 'object' || t === null) return t;
  if (t instanceof Date) return new Date(t);
  if (t instanceof Array) return t.map(nr);
  const e = {};
  for (const n in t) e[n] = nr(t[n]);
  return e;
}
var mo = 2,
  fa = class {
    constructor(e) {
      e && ((this._writable = e.writable), (this._async = e.async)),
        (this._values = {}),
        (this._state = {});
    }
    setState(e, n = 0) {
      const r = {};
      return this._wrapProperties(e, this._state, this._values, '', r, n), r;
    }
    getState() {
      return this._values;
    }
    getReactive() {
      return this._state;
    }
    _wrapProperties(e, n, r, s, o, i) {
      for (const l in e) {
        const a = n[l],
          c = r[l],
          d = e[l];
        if (
          a &&
          ((c === d && typeof d != 'object') ||
            (d instanceof Date &&
              c instanceof Date &&
              c.getTime() === d.getTime()))
        )
          continue;
        const u = s + (s ? '.' : '') + l;
        a
          ? (a.__parse(d, u, o, i) && (r[l] = d),
            i & mo ? (o[u] = a.__trigger) : a.__trigger())
          : (d && d.__reactive
              ? (n[l] = this._wrapNested(d, d, u, o))
              : (n[l] = this._wrapWritable(d)),
            (r[l] = d)),
          (o[u] = o[u] || null);
      }
    }
    _wrapNested(e, n, r, s) {
      const o = this._wrapWritable(e);
      return (
        this._wrapProperties(e, o, n, r, s, 0),
        (o.__parse = (i, l, a, c) => (
          this._wrapProperties(i, o, n, l, a, c), !1
        )),
        o
      );
    }
    _wrapWritable(e) {
      const n = [],
        r = function () {
          for (let s = 0; s < n.length; s++) n[s](e);
        };
      return {
        subscribe: (s) => (
          n.push(s),
          this._async ? setTimeout(s, 1, e) : s(e),
          () => {
            const o = n.indexOf(s);
            o >= 0 && n.splice(o, 1);
          }
        ),
        __trigger: () => {
          n.length && (this._async ? setTimeout(r, 1) : r());
        },
        __parse: function (s) {
          return (e = s), !0;
        },
      };
    }
  },
  ha = class {
    constructor(e, n, r, s) {
      typeof e == 'function'
        ? (this._setter = e)
        : (this._setter = e.setState.bind(e)),
        (this._routes = n),
        (this._parsers = r),
        (this._prev = {}),
        (this._triggers = /* @__PURE__ */ new Map()),
        (this._sources = /* @__PURE__ */ new Map()),
        this._routes.forEach((o) => {
          o.in.forEach((i) => {
            const l = this._triggers.get(i) || [];
            l.push(o), this._triggers.set(i, l);
          }),
            o.out.forEach((i) => {
              const l = this._sources.get(i) || {};
              o.in.forEach((a) => (l[a] = !0)), this._sources.set(i, l);
            });
        }),
        this._routes.forEach((o) => {
          o.length = Math.max(...o.in.map((i) => wo(i, this._sources, 1)));
        }),
        (this._bus = s);
    }
    init(e) {
      const n = {};
      for (const r in e)
        if (this._prev[r] !== e[r]) {
          const s = this._parsers[r];
          n[r] = s ? s(e[r]) : e[r];
        }
      (this._prev = this._prev ? { ...this._prev, ...e } : { ...e }),
        this.setState(n),
        this._bus && this._bus.exec('init-state', n);
    }
    setStateAsync(e) {
      const n = this._setter(e, mo);
      return (
        this._async
          ? Object.assign(this._async.signals, n)
          : (this._async = {
              signals: n,
              timer: setTimeout(this._applyState.bind(this), 1),
            }),
        n
      );
    }
    _applyState() {
      const e = this._async;
      if (e) {
        (this._async = null), this._triggerUpdates(e.signals, []);
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
      const r = Object.keys(e),
        s = !n.length;
      n = n || [];
      for (let o = 0; o < r.length; o++) {
        const i = r[o],
          l = this._triggers.get(i);
        l &&
          l.forEach((a) => {
            n.indexOf(a) == -1 && n.push(a);
          });
      }
      s && this._execNext(n);
    }
    _execNext(e) {
      for (; e.length; ) {
        e.sort((r, s) => (r.length < s.length ? 1 : -1));
        const n = e[e.length - 1];
        e.splice(e.length - 1), n.exec(e);
      }
    }
  };
function wo(t, e, n) {
  const r = e.get(t);
  if (!r) return n;
  const s = Object.keys(r).map((o) => wo(o, e, n + 1));
  return Math.max(...s);
}
var pa = class {
  constructor() {
    (this._nextHandler = null),
      (this._handlers = {}),
      (this._tag = /* @__PURE__ */ new WeakMap()),
      (this.exec = this.exec.bind(this));
  }
  on(t, e, n) {
    let r = this._handlers[t];
    r
      ? n && n.intercept
        ? r.unshift(e)
        : r.push(e)
      : (r = this._handlers[t] = [e]),
      n && n.tag && this._tag.set(e, n.tag);
  }
  intercept(t, e, n) {
    this.on(t, e, { ...n, intercept: !0 });
  }
  detach(t) {
    for (const e in this._handlers) {
      const n = this._handlers[e];
      for (let r = n.length - 1; r >= 0; r--)
        this._tag.get(n[r]) === t && n.splice(r, 1);
    }
  }
  async exec(t, e) {
    const n = this._handlers[t];
    if (n)
      for (let r = 0; r < n.length; r++) {
        const s = n[r](e);
        if (s === !1 || (s && s.then && (await s) === !1)) return;
      }
    return this._nextHandler && (await this._nextHandler.exec(t, e)), e;
  }
  setNext(t) {
    return (this._nextHandler = t);
  }
};
function ga(t) {
  return (e) => e[t];
}
function ma(t) {
  return (e, n) => (e[t] = n);
}
function kt(t, e) {
  return (e.getter || ga(e.id))(t);
}
function ts(t, e, n) {
  return (e.setter || ma(e.id))(t, n);
}
function ns(t, e) {
  const n = document.createElement('a');
  (n.href = URL.createObjectURL(t)),
    (n.download = e),
    document.body.appendChild(n),
    n.click(),
    document.body.removeChild(n);
}
function ft(t, e) {
  let n = kt(t, e) ?? '';
  return (
    e.template && (n = e.template(n, t, e)),
    e.optionsMap &&
      (Array.isArray(n)
        ? (n = n.map((r) => e.optionsMap.get(r)))
        : (n = e.optionsMap.get(n))),
    typeof n > 'u' ? '' : n + ''
  );
}
function wa(t, e) {
  const n = /\n|"|;|,/;
  let r = '';
  const s =
      e.rows ||
      `
`,
    o = e.cols || '	',
    i = t._columns,
    l = t.flatData;
  e.header !== !1 && i[0].header && (r = rs('header', i, r, o, s));
  for (let a = 0; a < l.length; a++) {
    const c = [];
    for (let d = 0; d < i.length; d++) {
      let u = ft(l[a], i[d]);
      n.test(u) && (u = '"' + u.replace(/"/g, '""') + '"'), c.push(u);
    }
    r += (r ? s : '') + c.join(o);
  }
  return e.footer !== !1 && i[0].footer && (r = rs('footer', i, r, o, s)), r;
}
function rs(t, e, n, r, s) {
  const o = /\n|"|;|,/;
  for (let i = 0; i < e[0][t].length; i++) {
    const l = [];
    for (let a = 0; a < e.length; a++) {
      let c = (e[a][t][i].text || '') + '';
      o.test(c) && (c = '"' + c.replace(/"/g, '""') + '"'), l.push(c);
    }
    n += (n ? s : '') + l.join(r);
  }
  return n;
}
function xa(t, e, n) {
  const r = [],
    s = [],
    o = [];
  let i = [];
  const l = t._columns,
    a = t.flatData,
    c = t._sizes;
  for (const u of l) o.push({ width: u.flexgrow ? c.columnWidth : u.width });
  let d = 0;
  e.header !== !1 &&
    l[0].header &&
    (ss('header', l, r, s, d, e, n),
    (i = i.concat(c.headerRowHeights.map((u) => ({ height: u })))),
    (d += l[0].header.length));
  for (let u = 0; u < a.length; u++) {
    const f = [];
    for (let p = 0; p < l.length; p++) {
      const m = a[u],
        h = l[p],
        x = kt(m, h) ?? '';
      let w = ft(m, h),
        y;
      e.cellStyle && (y = e.cellStyle(x, m, h)),
        e.cellTemplate && (w = e.cellTemplate(x, m, h) ?? w);
      const k = xo(w, 2, y, n);
      f.push(k);
    }
    r.push(f), i.push({ height: c.rowHeight });
  }
  return (
    (d += a.length),
    e.footer !== !1 &&
      l[0].footer &&
      (ss('footer', l, r, s, d, e, n),
      (i = i.concat(c.footerRowHeights.map((u) => ({ height: u }))))),
    { cells: r, merged: s, rowSizes: i, colSizes: o, styles: n }
  );
}
function ss(t, e, n, r, s, o, i) {
  for (let l = 0; l < e[0][t].length; l++) {
    const a = [];
    for (let c = 0; c < e.length; c++) {
      const d = e[c][t][l],
        u = d.colspan ? d.colspan - 1 : 0,
        f = d.rowspan ? d.rowspan - 1 : 0;
      (u || f) &&
        r.push({
          from: { row: l + s, column: c },
          to: { row: l + s + f, column: c + u },
        });
      let p = d.text ?? '',
        m;
      o.headerCellStyle && (m = o.headerCellStyle(p, d, e[c], t)),
        o.headerCellTemplate && (p = o.headerCellTemplate(p, d, e[c], t) ?? p);
      let h;
      t == 'header'
        ? l == e[0][t].length - 1
          ? (h = 1)
          : (h = 0)
        : l
          ? (h = 4)
          : (h = 3);
      const x = xo(p, h, m, i);
      a.push(x);
    }
    n.push(a);
  }
}
function xo(t, e, n, r) {
  let s = e;
  if (
    (t &&
      t instanceof Date &&
      ((t = va(t)), (n = n || {}), (n.format = n.format || 'dd/mm/yyyy')),
    n)
  ) {
    n = { ...r[e], ...n };
    const o = r.findIndex((i) => Jt(i, n));
    o < 0 ? (r.push(n), (s = r.length - 1)) : (s = o);
  }
  return { v: t + '', s };
}
function ya(t) {
  const e = {
      material: '#000000',
      willow: '#000000',
      'willow-dark': '#ffffff',
    },
    n = { material: 'none', willow: 'none', 'willow-dark': '#2a2b2d' },
    r = { material: '#fafafb', willow: '#f2f3f7', 'willow-dark': '#20262b' },
    s = {
      material: '0.5px solid #dfdfdf',
      willow: '0.5px solid #e6e6e6',
      'willow-dark': '0.5px solid #384047',
    },
    o = { material: '#dfdfdf', willow: '#e6e6e6', 'willow-dark': '#384047' },
    i = e[t],
    l = '0.5px solid ' + o[t],
    a = { verticalAlign: 'center', align: 'left' },
    c = {
      fontWeight: 'bold',
      color: i,
      background: r[t],
      ...a,
      borderBottom: l,
      borderRight: l,
    };
  return {
    cell: {
      color: i,
      background: n[t],
      borderBottom: s[t],
      borderRight: s[t],
      ...a,
    },
    header: { ...c },
    footer: { ...c },
  };
}
function va(t) {
  return t
    ? 25569 + (t.getTime() - t.getTimezoneOffset() * 6e4) / (86400 * 1e3)
    : null;
}
const ka = 'portrait',
  ba = 100,
  Sa = 'a4',
  $a = {
    a3: { width: 11.7, height: 16.5 },
    a4: { width: 8.27, height: 11.7 },
    letter: { width: 8.5, height: 11 },
  };
function _a(t, e) {
  const n = [];
  let r = [],
    s = 0;
  const o = t.filter((l) => !l.hidden),
    i = Ca(e);
  return (
    o.forEach((l, a) => {
      s + l.width <= i
        ? ((s += l.width), r.push(l))
        : (r.length && n.push(r), (r = [l]), (s = l.width)),
        a === o.length - 1 && r.length && n.push(r);
    }),
    n
  );
}
function os(t, e, n) {
  const r = [];
  return (
    t.forEach((s, o) => {
      const i = s[e];
      for (let l = 0; l < n.length; l++) {
        r[l] || (r[l] = []);
        const a = { ...i[l] };
        if (r[l][o] !== null) {
          if (!o && !a.rowspan && !a.colspan) {
            let c = 1,
              d = t[o + c][e][l],
              u = a.width;
            for (; !d.rowspan && !d.colspan; )
              c++, (d = t[o + c][e][l]), (u += d.width);
            (a.colspan = c), (a.width = u), (a.height = n[l]);
          }
          if ((r[l].push(a), !a.collapsed && a.colspan > 1)) {
            let c = a.colspan - 1;
            if (a.colspan + o > t.length) {
              const d = a.colspan - (a.colspan + o - t.length);
              (a.colspan = d),
                (a.width = t
                  .slice(o, o + c + 1)
                  .reduce((u, f) => u + f.width, 0)),
                d > 1 && (c = d - 1);
            }
            for (let d = 0; d < c; d++) r[l].push(null);
          }
          if (a.rowspan > 1) {
            const c = a.rowspan;
            for (let d = 1; d < c; d++)
              r[l + d] || (r[l + d] = []), r[l + d].push(null);
          }
        }
      }
      if (s.collapsed)
        for (let l = 0; l < r.length; l++) {
          const a = r[l],
            c = a[o];
          if (c && c.collapsed) {
            if (((a[o] = null), !l)) break;
          } else {
            const d = c || a.findLast((u) => u?.colspan >= 1);
            d && ((d.colspan = d.colspan - 1), (d.width = d.width - s.width));
          }
        }
    }),
    r.map((s) => s.filter((o) => o && o.colspan !== 0))
  );
}
function Ca(t) {
  const { mode: e, ppi: n, paper: r } = t,
    { width: s, height: o } = $a[r];
  return Na(e === 'portrait' ? s : o, n);
}
function Na(t, e) {
  return t * e;
}
function Ta(t = {}) {
  const { mode: e, ppi: n, paper: r } = t;
  return { mode: e || ka, ppi: n || ba, paper: r || Sa };
}
function yo(t, e) {
  return t.flexgrow
    ? `min-width:${e}px;width:auto`
    : `width:${t.width}px; max-width:${t.width}px; height:${t.height}px`;
}
function Da(t, e, n) {
  let r = t[n.id];
  if (n.filter.type === 'richselect' && r) {
    const s =
      n.filter.config?.options || e.find(({ id: o }) => o == n.id).options;
    s && (r = s.find(({ id: o }) => o == r).label);
  }
  return r ?? '';
}
const is = ['resize-column', 'hide-column', 'update-cell'],
  Ma = ['delete-row', 'update-row', 'update-cell'],
  Ea = ['move-item'],
  Ra = ['resize-column', 'move-item'];
let Ia = class {
  undo = [];
  redo = [];
  progress = {};
  in;
  getState;
  setState;
  _previousValues = {};
  constructor(e, n, r) {
    (this.in = e),
      (this.getState = n),
      (this.setState = r),
      this.setHandlers(),
      this.resetStateHistory();
  }
  getHandlers() {
    return {
      'add-row': {
        handler: (e) => ({
          action: 'delete-row',
          data: { id: e.id },
          source: { action: 'add-row', data: e },
        }),
      },
      'delete-row': {
        handler: (e) => {
          const { id: n } = e,
            { data: r } = this.getPrev(),
            s = r.findIndex((o) => o.id == n);
          return {
            action: 'add-row',
            data: {
              id: n,
              row: r[s],
              before: s < r.length - 1 ? r[s + 1].id : void 0,
            },
            source: { action: 'delete-row', data: e },
          };
        },
      },
      'update-cell': {
        handler: (e) => {
          const { id: n, column: r } = e,
            s = this.getRow(n),
            o = this.getColumn(r),
            i = kt(s, o);
          return Jt(i, e.value)
            ? null
            : {
                action: 'update-cell',
                data: { id: n, column: r, value: i },
                source: { action: 'update-cell', data: e },
              };
        },
      },
      'update-row': {
        handler: (e) => {
          const { id: n, row: r } = e,
            s = this.getRow(n);
          for (const o in r) Object.keys(s).includes(o) || (s[o] = void 0);
          return {
            action: 'update-row',
            data: { id: n, row: s },
            source: { action: 'update-row', data: e },
          };
        },
      },
      'copy-row': {
        handler: (e) => {
          const { id: n } = e,
            { data: r } = this.getState(),
            s = r.findIndex((i) => i.id == n),
            o = r[s];
          return {
            action: 'delete-row',
            data: { id: n },
            source: {
              action: 'add-row',
              data: {
                id: n,
                row: o,
                before: s < r.length - 1 ? r[s + 1].id : void 0,
              },
            },
          };
        },
      },
      'resize-column': {
        handler: (e) => {
          const { id: n, width: r } = e,
            s = this.getColumn(n),
            { _sizes: o } = this.getState();
          return {
            action: 'resize-column',
            data: { id: n, width: s.width ?? o.columnWidth },
            source: { action: 'resize-column', data: { id: n, width: r } },
          };
        },
      },
      'hide-column': {
        handler: (e) => {
          const { id: n } = e,
            r = this.getColumn(n);
          return {
            action: 'hide-column',
            data: { id: n, mode: r.hidden },
            source: { action: 'hide-column', data: e },
          };
        },
      },
      'collapse-column': {
        handler: (e) => {
          const { id: n, row: r, mode: s } = e;
          return {
            action: 'collapse-column',
            data: { id: n, row: r, mode: typeof s == 'boolean' ? !s : s },
            source: { action: 'collapse-column', data: e },
          };
        },
      },
      'move-item': {
        handler: (e) => {
          const { id: n, target: r, mode: s } = e,
            { flatData: o } = this.getPrev(),
            i = o.findIndex((l) => l.id == n);
          return {
            action: 'move-item',
            data: {
              id: n,
              target: o[i + (i ? -1 : 1)].id,
              mode: i ? 'after' : 'before',
            },
            source: {
              action: 'move-item',
              data: { id: n, target: r, mode: s },
            },
          };
        },
      },
      'open-row': {
        handler: (e) => {
          const { id: n, nested: r } = e;
          return {
            action: 'close-row',
            data: { id: n, nested: r },
            source: { action: 'open-row', data: e },
          };
        },
      },
      'close-row': {
        handler: (e) => {
          const { id: n, nested: r } = e;
          return {
            action: 'open-row',
            data: { id: n, nested: r },
            source: { action: 'close-row', data: e },
          };
        },
      },
    };
  }
  resetHistory() {
    (this.undo = []),
      (this.redo = []),
      (this.progress = {}),
      this.resetStateHistory();
  }
  getPrev() {
    return this._previousValues;
  }
  setHandlers() {
    const e = this.getHandlers();
    for (const n in e)
      this.in.intercept(n, (r) => {
        if (
          !(r.eventSource === 'undo' || r.eventSource === 'redo' || r.skipUndo)
        ) {
          if (Ra.includes(n)) {
            ((r.inProgress && !this.progress[n]) ||
              typeof r.inProgress != 'boolean') &&
              (Ea.includes(n) && this.setPrev('flatData'),
              is.includes(n) && this.setPrev('columns')),
              (this.progress[n] = r.inProgress);
            return;
          }
          Ma.includes(n) && this.setPrev('data'),
            is.includes(n) && this.setPrev('columns');
        }
      }),
        this.in.on(n, (r) => {
          if (
            r.eventSource === 'undo' ||
            r.eventSource === 'redo' ||
            r.skipUndo ||
            r.inProgress
          )
            return;
          const s = e[n].handler(r);
          s && this.addToHistory(s);
        });
  }
  setPrev(e) {
    this._previousValues[e] = nr(this.getState()[e]);
  }
  addToHistory(e) {
    this.undo.push(e), (this.redo = []), this.setStateHistory();
  }
  handleUndo() {
    if (!this.undo.length) return;
    const e = this.undo.pop();
    this.redo.push({ ...e.source, source: e }),
      this.in.exec(e.action, { ...e.data, eventSource: 'undo' }),
      this.setStateHistory();
  }
  handleRedo() {
    if (!this.redo.length) return;
    const e = this.redo.pop();
    this.undo.push({ ...e.source, source: e }),
      this.in.exec(e.action, { ...e.data, eventSource: 'redo' }),
      this.setStateHistory();
  }
  resetStateHistory() {
    this.setState({ history: { undo: 0, redo: 0 } });
  }
  setStateHistory() {
    this.setState({
      history: { undo: this.undo.length, redo: this.redo.length },
    });
  }
  getRow(e) {
    const { data: n } = this.getPrev();
    return this.getState().tree
      ? this.getTreeRow(n, e)
      : n.find((r) => r.id == e);
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
function vo() {
  let t = !0;
  return (t = !1), t;
}
function ko(t, e) {
  return typeof t > 'u' || t === null
    ? -1
    : typeof e > 'u' || e === null
      ? 1
      : t === e
        ? 0
        : t > e
          ? 1
          : -1;
}
function Aa(t, e) {
  return -ko(t, e);
}
function Ha(t, e) {
  if (typeof e.sort == 'function')
    return function (r, s) {
      const o = e.sort(r, s);
      return t === 'asc' ? o : -o;
    };
  const n = t === 'asc' ? ko : Aa;
  return function (r, s) {
    return n(kt(r, e), kt(s, e));
  };
}
function La(t, e) {
  if (!t || !t.length) return;
  const n = t.map((r) => {
    const s = e.find((o) => o.id == r.key);
    return Ha(r.order, s);
  });
  return t.length === 1
    ? n[0]
    : function (r, s) {
        for (let o = 0; o < n.length; o++) {
          const i = n[o](r, s);
          if (i !== 0) return i;
        }
        return 0;
      };
}
const fn = 28,
  za = 20;
function Fa() {
  if (typeof document > 'u') return 'willow';
  const t = document.querySelector('[class^="wx"][class$="theme"]');
  return t ? t.className.substring(3, t.className.length - 6) : 'willow';
}
function bn(t, e, n, r, s) {
  const o = document.createElement('div'),
    i = document.createElement('div'),
    l = document.body;
  s = s ? `${s}px` : 'auto';
  let a, c;
  (i.className = e),
    o.classList.add(`wx-${n}-theme`),
    (o.style.cssText = `height:auto;position:absolute;top:0px;left:100px;overflow:hidden;width=${s};white-space:nowrap;`),
    o.appendChild(i),
    l.appendChild(o),
    typeof t != 'object' && (t = [t]);
  for (let d = 0; d < t.length; d++) {
    i.innerText = t[d] + '';
    const u = o.getBoundingClientRect(),
      f = Math.ceil(u.width) + (r && r.length ? r[d] : 0),
      p = Math.ceil(u.height);
    (a = Math.max(a || 0, f)), (c = Math.max(c || 0, p));
  }
  return o.remove(), { width: a, height: c };
}
function ls(t, e, n, r, s) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i][e],
      a = l.length;
    for (let c = 0; c < a; c++) {
      const { text: d, vertical: u, collapsed: f, rowspan: p, css: m } = l[c];
      if (!d) {
        o[c] = Math.max(o[c] || 0, r);
        continue;
      }
      let h = 0;
      if (u && !f) {
        let x = `wx-measure-cell-${e}`;
        if (
          ((x += m ? ` ${m}` : ''),
          (h = bn(d, x, s).width),
          (p > 1 || !l[c + 1]) && n > c + 1)
        ) {
          const w = p || n - c,
            y = o.slice(c, c + w).reduce((k, v) => k + v, 0);
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
function Oa(t, e, n) {
  const r = [],
    s = [];
  let o = 'wx-measure-cell-body';
  o += t.css ? ` ${t.css}` : '';
  for (let i = 0; i < e.length; i++) {
    const l = e[i],
      a = ft(l, t);
    a &&
      (r.push(a),
      t.treetoggle
        ? s.push(
            e[i].$level * fn + (e[i].$count ? fn : 0) + (t.draggable ? fn : 0),
          )
        : t.draggable && s.push(fn));
  }
  return bn(r, o, n, s).width;
}
function Wa(t, e) {
  const n = 'wx-measure-cell-header',
    r = t.sort ? za : 0;
  let s = t.header;
  if (typeof s == 'string') return bn(s, n, e).width + r;
  let o;
  Array.isArray(s) || (s = [s]);
  for (let i = 0; i < s.length; i++) {
    const l = s[i],
      a = typeof l == 'string' ? l : l.text,
      c = n + (typeof l == 'string' ? '' : ` ${l.css}`);
    let d = bn(a, c, e).width;
    i === s.length - 1 && (d += r), (o = Math.max(o || 0, d));
  }
  return o;
}
const Pa = {
  text: (t, e) => (t ? t.toLowerCase().indexOf(e.toLowerCase()) !== -1 : !e),
  richselect: (t, e) => (typeof e != 'number' && !e ? !0 : t == e),
};
function Va(t) {
  return Pa[t];
}
class Ga extends fa {
  in;
  _router;
  _branches;
  _xlsxWorker;
  _historyManager;
  constructor(e) {
    super({ writable: e, async: !1 });
    const n = {
      rowHeight: 37,
      columnWidth: 160,
      headerHeight: 36,
      footerHeight: 36,
    };
    this._router = new ha(
      super.setState.bind(this),
      [
        {
          in: ['columns', 'sizes', '_skin'],
          out: ['_columns', '_sizes'],
          exec: (s) => {
            const { columns: o, sizes: i, _skin: l } = this.getState(),
              a = this.copyColumns(o),
              c = a.reduce((f, p) => Math.max(p.header.length, f), 0),
              d = a.reduce((f, p) => Math.max(p.footer.length, f), 0);
            a.forEach(this.setCollapsibleColumns);
            const u = this.normalizeSizes(a, i, c, d, l);
            for (let f = 0; f < a.length; f++)
              this.normalizeColumns(a, f, 'header', c, u),
                this.normalizeColumns(a, f, 'footer', d, u);
            this.setState({ _columns: a, _sizes: u }, s);
          },
        },
        {
          in: ['data', 'tree', '_filterIds'],
          out: ['flatData', '_rowHeightFromData'],
          exec: (s) => {
            const {
                data: o,
                tree: i,
                dynamic: l,
                _filterIds: a,
              } = this.getState(),
              c = a && new Set(a),
              d = i
                ? this.flattenRows(o, [], a)
                : c
                  ? o.filter((f) => c.has(f.id))
                  : o,
              u = !l && d.some((f) => f.rowHeight);
            this.setState({ flatData: d, _rowHeightFromData: u }, s);
          },
        },
      ],
      { sizes: (s) => ({ ...n, ...s }) },
    );
    const r = (this.in = new pa());
    r.on('close-editor', ({ ignore: s }) => {
      const { editor: o } = this.getState();
      o && (s || r.exec('update-cell', o), this.setState({ editor: null }));
    }),
      r.on('open-editor', ({ id: s, column: o }) => {
        let i = this.getState().editor;
        i && r.exec('close-editor', {});
        const l = this.getRow(s),
          a = o ? this.getColumn(o) : this.getNextEditor(l);
        if (a?.editor) {
          let c = a.editor;
          if ((typeof c == 'function' && (c = c(l, a)), !c)) return;
          (i = {
            column: a.id,
            id: s,
            value: kt(l, a) ?? '',
            renderedValue: ft(l, a),
          }),
            typeof c == 'object' &&
              c.config &&
              ((i.config = c.config),
              c.config.options && (i.options = c.config.options)),
            a.options && !i.options && (i.options = a.options),
            this.setState({ editor: i });
        }
      }),
      r.on('editor', ({ value: s }) => {
        const o = this.getState().editor;
        o && ((o.value = s), this.setState({ editor: o }));
      }),
      r.on('add-row', (s) => {
        const o = this.getState();
        let { data: i } = o;
        const { select: l, _filterIds: a } = o,
          { row: c, before: d, after: u, select: f } = s;
        if (((s.id = c.id = s.id || c.id || hn()), d || u)) {
          const m = d || u,
            h = i.findIndex((x) => x.id === m);
          (i = [...i]), i.splice(h + (u ? 1 : 0), 0, s.row);
        } else i = [...i, s.row];
        const p = { data: i };
        a && (p._filterIds = [...a, s.id]),
          this.setState(p),
          !(typeof f == 'boolean' && !f) &&
            (f || l) &&
            r.exec('select-row', { id: c.id, show: !0 });
      }),
      r.on('delete-row', (s) => {
        const {
            data: o,
            selectedRows: i,
            focusCell: l,
            editor: a,
          } = this.getState(),
          { id: c } = s,
          d = { data: o.filter((u) => u.id !== c) };
        this.isSelected(c) && (d.selectedRows = i.filter((u) => u !== c)),
          a?.id == c && (d.editor = null),
          this.setState(d),
          l?.row === c &&
            this.in.exec('focus-cell', { eventSource: 'delete-row' });
      }),
      r.on('update-cell', (s) => {
        const o = this.getState();
        let { data: i } = o;
        i = [...i];
        const { tree: l } = o,
          { id: a, column: c, value: d } = s,
          u = this.getColumn(c);
        if (l) {
          const f = { ...this._branches[a] };
          ts(f, u, d);
          const p = this.updateTreeRow(f);
          f.$parent === 0 && (i = p);
        } else {
          const f = i.findIndex((m) => m.id == a),
            p = { ...i[f] };
          ts(p, u, d), (i[f] = p);
        }
        this.setState({ data: i });
      }),
      r.on('update-row', (s) => {
        let { data: o } = this.getState();
        const { id: i, row: l } = s,
          a = o.findIndex((c) => c.id == i);
        (o = [...o]), (o[a] = { ...o[a], ...l }), this.setState({ data: o });
      }),
      r.on(
        'select-row',
        ({ id: s, toggle: o, range: i, mode: l, show: a, column: c }) => {
          const d = this.getState(),
            { focusCell: u } = d;
          let { selectedRows: f } = d;
          if ((f.length || (i = o = !1), i)) {
            const { data: p } = this.getState();
            let m = p.findIndex((x) => x.id == f[f.length - 1]),
              h = p.findIndex((x) => x.id == s);
            m > h && ([m, h] = [h, m]),
              p.slice(m, h + 1).forEach((x) => {
                f.indexOf(x.id) === -1 && f.push(x.id);
              });
          } else if (o && this.isSelected(s)) {
            if (l === !0) return;
            f = f.filter((p) => p !== s);
          } else if (o) {
            if (l === !1) return;
            f.push(s);
          } else f = [s];
          this.setState({ selectedRows: [...f] }),
            u?.row !== s &&
              this.in.exec('focus-cell', { eventSource: 'select-row' }),
            a && this.in.exec('scroll', { row: s, column: c });
        },
      ),
      this.in.on('focus-cell', (s) => {
        const { row: o, column: i, eventSource: l } = s,
          { _columns: a, split: c } = this.getState();
        o && i
          ? (this.setState({ focusCell: { row: o, column: i } }),
            l !== 'click' &&
              ((!c.left || a.findIndex((d) => d.id == s.column) >= c.left) &&
              (!c.right ||
                a.findIndex((d) => d.id == s.column) < a.length - c.right)
                ? this.in.exec('scroll', { row: o, column: i })
                : this.in.exec('scroll', { row: o })))
          : this.setState({ focusCell: null });
      }),
      r.on('resize-column', (s) => {
        const { id: o, auto: i, maxRows: l, inProgress: a } = s;
        if (a === !1) return;
        let c = s.width || 0;
        const d = [...this.getState().columns],
          u = d.find((f) => f.id == o);
        if (i) {
          if (i == 'data' || i === !0) {
            const { flatData: f, _skin: p } = this.getState();
            let m = f.length;
            l && (m = Math.min(l, m));
            const h = f.slice(0, m);
            c = Oa(u, h, p);
          }
          if (i == 'header' || i === !0) {
            const { _skin: f } = this.getState();
            c = Math.max(Wa(u, f), c);
          }
        }
        (u.width = Math.max(17, c)),
          delete u.flexgrow,
          this.setState({ columns: d });
      }),
      r.on('hide-column', (s) => {
        const { id: o, mode: i } = s,
          l = [...this.getState().columns],
          a = l.find((d) => d.id == o),
          c = l.reduce((d, u) => d + (u.hidden ? 0 : 1), 0);
        !i || c > 1
          ? ((a.hidden = !a.hidden), this.setState({ columns: l }))
          : (s.skipUndo = !0);
      }),
      r.on('sort-rows', (s) => {
        const { key: o, add: i, sort: l } = s,
          a = this.getState(),
          { columns: c, data: d, tree: u } = a;
        if (l) {
          const y = [...d];
          y.sort(l), this.setState({ data: y });
          return;
        }
        const { order: f = 'asc' } = s;
        let p = a.sortMarks;
        const m = Object.keys(p),
          h = m.length;
        !i || !h || (h === 1 && p[o])
          ? (p = { [o]: { order: f } })
          : (h === 1 && (p[m[0]] = { ...p[m[0]], index: 0 }),
            (p = {
              ...p,
              [o]: {
                order: f,
                index: typeof i == 'number' ? i : (p[o]?.index ?? h),
              },
            }));
        const x = Object.keys(p)
          .sort((y, k) => p[y].index - p[k].index)
          .map((y) => ({ key: y, order: p[y].order }));
        this.setState({ sortMarks: p });
        const w = La(x, c);
        if (w) {
          const y = [...d];
          u ? this.sortTree(y, w) : y.sort(w), this.setState({ data: y });
        }
      }),
      r.on('filter-rows', (s) => {
        const { value: o, key: i, filter: l } = s;
        if (!Object.keys(s).length) {
          this.setState({ filterValues: {}, _filterIds: null });
          return;
        }
        const a = this.getState(),
          { data: c, tree: d } = a;
        let u = a.filterValues;
        const f = {};
        i && ((u = { ...u, [i]: o }), (f.filterValues = u));
        const p = l ?? this.createFilter(u);
        let m = [];
        d
          ? (m = this.filterTree(c, p, m))
          : c.forEach((h) => {
              p(h) && m.push(h.id);
            }),
          (f._filterIds = m),
          this.setState(f);
      }),
      r.on('collapse-column', (s) => {
        const { id: o, row: i, mode: l } = s,
          a = [...this.getState().columns],
          c = this.getColumn(o).header,
          d = Array.isArray(c) ? c[i] : c;
        typeof d == 'object' &&
          ((d.collapsed = l ?? !d.collapsed), this.setState({ columns: a }));
      }),
      r.on('move-item', (s) => {
        const { id: o, inProgress: i } = s;
        let { target: l, mode: a = 'after' } = s;
        const { data: c, flatData: d, tree: u } = this.getState(),
          f = d.findIndex((h) => h.id == o);
        let p;
        if (a === 'up' || a === 'down') {
          if (a === 'up') {
            if (f === 0) return;
            (p = f - 1), (a = 'before');
          } else if (a === 'down') {
            if (f === d.length - 1) return;
            (p = f + 1), (a = 'after');
          }
          l = d[p] && d[p].id;
        } else p = d.findIndex((h) => h.id == l);
        if (f === -1 || p === -1 || i === !1) return;
        let m;
        u ? (m = this.moveItem(o, l, c, a)) : (m = this.moveItem(o, l, c, a)),
          this.setState({ data: u ? this.normalizeTreeRows(m) : m });
      }),
      r.on('copy-row', (s) => {
        const { id: o, target: i, mode: l = 'after' } = s,
          a = this.getState(),
          { flatData: c, _filterIds: d } = a;
        let { data: u } = a;
        const f = this.getRow(o);
        if (!f) return;
        const p = { ...f, id: hn() };
        s.id = p.id;
        const m = c.findIndex((x) => x.id == i);
        if (m === -1) return;
        u.splice(m + (l === 'after' ? 1 : 0), 0, p), (u = [...u]);
        const h = { data: u };
        d && (h._filterIds = [...d, p.id]), this.setState(h);
      }),
      r.on('open-row', (s) => {
        const { id: o, nested: i } = s;
        this.toggleBranch(o, !0, i);
      }),
      r.on('close-row', (s) => {
        const { id: o, nested: i } = s;
        this.toggleBranch(o, !1, i);
      }),
      r.on(
        'export',
        (s) =>
          new Promise((o, i) => {
            const l = s.options || {},
              a = `${l.fileName || 'data'}.${l.format}`;
            if (l.format == 'csv') {
              const c = wa(this.getState(), l);
              l.download !== !1
                ? ns(new Blob(['\uFEFF' + c], { type: 'text/csv' }), a)
                : (s.result = c),
                o(!0);
            } else if (l.format == 'xlsx') {
              let c = l.styles;
              !c && c !== !1 && (c = ya(this.getState()._skin));
              const d = c,
                u = d
                  ? [
                      { ...d.header },
                      { ...(d.lastHeaderCell || d.header) },
                      { ...d.cell },
                      { ...(d.firstFooterCell || d.footer) },
                      { ...d.footer },
                    ]
                  : Array(5).fill({}),
                {
                  cells: f,
                  merged: p,
                  rowSizes: m,
                  colSizes: h,
                  styles: x,
                } = xa(this.getState(), l, u),
                w =
                  l.cdn ||
                  'https://cdn.dhtmlx.com/libs/json2excel/1.3.2/worker.js';
              this.getXlsxWorker(w).then((y) => {
                (y.onmessage = (k) => {
                  if (k.data.type == 'ready') {
                    const v = k.data.blob;
                    l.download !== !1 ? ns(v, a) : (s.result = v), o(!0);
                  }
                }),
                  y.postMessage({
                    type: 'convert',
                    data: {
                      data: [
                        {
                          name: l.sheetName || 'data',
                          cells: f,
                          cols: h,
                          rows: m,
                          merged: p,
                        },
                      ],
                      styles: x,
                    },
                  });
              });
            } else i();
          }),
      ),
      r.on('search-rows', (s) => {
        const { search: o, columns: i } = s,
          l = this.searchRows(o, i);
        this.setState({ search: { value: o, rows: l } });
      }),
      r.on('hotkey', ({ key: s, event: o, isInput: i }) => {
        switch (s) {
          case 'arrowup': {
            const { flatData: l, focusCell: a, select: c } = this.getState();
            if ((o.preventDefault(), i)) return;
            const d = a ? a.column : this._getFirstVisibleColumn()?.id,
              u = a ? this.getPrevRow(a.row)?.id : l[l.length - 1]?.id;
            d &&
              u &&
              (this.in.exec('focus-cell', {
                row: u,
                column: d,
                eventSource: 'key',
              }),
              c && this.in.exec('select-row', { id: u }));
            break;
          }
          case 'arrowdown': {
            const { flatData: l, focusCell: a, select: c } = this.getState();
            if ((o.preventDefault(), i)) return;
            const d = a ? a.column : this._getFirstVisibleColumn()?.id,
              u = a ? this.getNextRow(a.row)?.id : l[0]?.id;
            d &&
              u &&
              (this.in.exec('focus-cell', {
                row: u,
                column: d,
                eventSource: 'key',
              }),
              c && this.in.exec('select-row', { id: u }));
            break;
          }
          case 'arrowright': {
            const { focusCell: l } = this.getState();
            if (i) return;
            if ((o.preventDefault(), l)) {
              const a = this.getNextColumn(l.column, !0)?.id;
              a &&
                this.in.exec('focus-cell', {
                  row: l.row,
                  column: a,
                  eventSource: 'key',
                });
            }
            break;
          }
          case 'arrowleft': {
            const { focusCell: l } = this.getState();
            if (i) return;
            if ((o.preventDefault(), l)) {
              const a = this.getPrevColumn(l.column, !0)?.id;
              a &&
                this.in.exec('focus-cell', {
                  row: l.row,
                  column: a,
                  eventSource: 'key',
                });
            }
            break;
          }
          case 'tab': {
            const { editor: l, focusCell: a, select: c } = this.getState();
            if (l) {
              o.preventDefault();
              const d = l.column;
              let u = l.id,
                f = this.getNextEditor(this.getRow(u), this.getColumn(d));
              if (!f) {
                const p = this.getNextRow(u);
                p && ((u = p.id), (f = this.getNextEditor(p)));
              }
              f &&
                (this.in.exec('open-editor', { id: u, column: f.id }),
                this.in.exec('focus-cell', {
                  row: u,
                  column: f.id,
                  eventSource: 'key',
                }),
                c &&
                  !this.isSelected(u) &&
                  this.in.exec('select-row', { id: u }));
            } else a && this.in.exec('focus-cell', { eventSource: 'key' });
            break;
          }
          case 'shift+tab': {
            const { editor: l, focusCell: a, select: c } = this.getState();
            if (l) {
              o.preventDefault();
              const d = l.column;
              let u = l.id,
                f = this.getPrevEditor(this.getRow(u), this.getColumn(d));
              if (!f) {
                const p = this.getPrevRow(u);
                p && ((u = p.id), (f = this.getPrevEditor(p)));
              }
              f &&
                (this.in.exec('open-editor', { id: u, column: f.id }),
                this.in.exec('focus-cell', {
                  row: u,
                  column: f.id,
                  eventSource: 'key',
                }),
                c &&
                  !this.isSelected(u) &&
                  this.in.exec('select-row', { id: u }));
            } else a && this.in.exec('focus-cell', { eventSource: 'key' });
            break;
          }
          case 'escape': {
            const { editor: l } = this.getState();
            l &&
              (this.in.exec('close-editor', { ignore: !0 }),
              this.in.exec('focus-cell', {
                row: l.id,
                column: l.column,
                eventSource: 'key',
              }));
            break;
          }
          case 'f2': {
            const { editor: l, focusCell: a } = this.getState();
            !l &&
              a &&
              this.in.exec('open-editor', { id: a.row, column: a.column });
            break;
          }
          case 'enter': {
            const { focusCell: l, tree: a } = this.getState();
            if (!i && a && l && this.getColumn(l.column).treetoggle) {
              const c = this.getRow(l.row);
              if (!c.data) return;
              this.in.exec(c.open ? 'close-row' : 'open-row', {
                id: l.row,
                nested: !0,
              });
            }
            break;
          }
          case 'home': {
            const { editor: l, focusCell: a } = this.getState();
            if (!l && a) {
              o.preventDefault();
              const c = this._getFirstVisibleColumn()?.id;
              this.in.exec('focus-cell', {
                row: a.row,
                column: c,
                eventSource: 'key',
              });
            }
            break;
          }
          case 'ctrl+home': {
            const {
              editor: l,
              focusCell: a,
              flatData: c,
              select: d,
            } = this.getState();
            if (!l && a) {
              o.preventDefault();
              const u = c[0]?.id,
                f = this._getFirstVisibleColumn()?.id;
              u &&
                f &&
                (this.in.exec('focus-cell', {
                  row: u,
                  column: f,
                  eventSource: 'key',
                }),
                d &&
                  !this.isSelected(u) &&
                  this.in.exec('select-row', { id: u }));
            }
            break;
          }
          case 'end': {
            const { editor: l, focusCell: a } = this.getState();
            if (!l && a) {
              o.preventDefault();
              const c = this._getLastVisibleColumn()?.id,
                d = a.row;
              this.in.exec('focus-cell', {
                row: d,
                column: c,
                eventSource: 'key',
              });
            }
            break;
          }
          case 'ctrl+end': {
            const {
              editor: l,
              focusCell: a,
              flatData: c,
              select: d,
            } = this.getState();
            if (!l && a) {
              o.preventDefault();
              const u = c.at(-1).id,
                f = this._getLastVisibleColumn()?.id;
              u &&
                f &&
                (this.in.exec('focus-cell', {
                  row: u,
                  column: f,
                  eventSource: 'key',
                }),
                d &&
                  !this.isSelected(u) &&
                  this.in.exec('select-row', { id: u }));
            }
            break;
          }
          case 'ctrl+z': {
            this.in.exec('undo', {});
            break;
          }
          case 'ctrl+y': {
            this.in.exec('redo', {});
            break;
          }
        }
      }),
      r.on('scroll', (s) => {
        const {
          _columns: o,
          split: i,
          _sizes: l,
          flatData: a,
          dynamic: c,
          _rowHeightFromData: d,
        } = this.getState();
        let u = -1,
          f = -1,
          p = 0,
          m = 0;
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
          h >= 0 &&
            (d
              ? ((f = a
                  .slice(0, h)
                  .reduce((x, w) => x + (w.rowHeight || l.rowHeight), 0)),
                (m = a[h].rowHeight))
              : (f = l.rowHeight * h));
        }
        this.setState({
          scroll: { top: f, left: u, width: p, height: m || l.rowHeight },
        });
      }),
      r.on('print', (s) => {
        const o = Ta(s);
        this.setState({ _print: o }), this.setStateAsync({ _print: null });
      }),
      r.on('undo', () => {
        this._historyManager?.handleUndo();
      }),
      r.on('redo', () => {
        this._historyManager?.handleRedo();
      }),
      this.initOnce();
  }
  getXlsxWorker(e) {
    if (!this._xlsxWorker) {
      const n = window.URL.createObjectURL(
        new Blob([`importScripts('${e}');`], { type: 'text/javascript' }),
      );
      this._xlsxWorker = new Promise((r) => {
        const s = new Worker(n);
        s.addEventListener('message', (o) => {
          o.data.type === 'init' && r(s);
        });
      });
    }
    return this._xlsxWorker;
  }
  initOnce() {
    const e = {
      sortMarks: {},
      _filterIds: null,
      data: [],
      filterValues: {},
      scroll: null,
      editor: null,
      focusCell: null,
      _print: null,
      history: { undo: 0, redo: 0 },
      search: null,
    };
    this._router.init(e);
  }
  init(e) {
    e.hasOwnProperty('_skin') && !e._skin && (e._skin = Fa()),
      e.columns &&
        e.columns.forEach((n) => {
          n.options &&
            (n.optionsMap = new Map(n.options.map((r) => [r.id, r.label])));
        }),
      Jt(this.getState().data, e.data) ||
        (e.tree
          ? ((this._branches = { 0: { data: e.data } }),
            (e.data = this.normalizeTreeRows(e.data)))
          : (e.data = this.normalizeRows(e.data)),
        this.setState({
          _filterIds: null,
          filterValues: {},
          sortMarks: {},
          search: null,
        }),
        this._historyManager && this._historyManager.resetHistory()),
      vo() &&
        (e.tree && ((e.undo = !1), (e.reorder = !1)),
        e.split?.right && (e.split.right = 0)),
      e.undo &&
        !this._historyManager &&
        (this._historyManager = new Ia(
          this.in,
          this.getState.bind(this),
          this.setState.bind(this),
        )),
      this._router.init({ ...e });
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
    const n = this.getState().flatData,
      r = this.getRowIndex(e, n);
    return n[r + 1];
  }
  getPrevRow(e) {
    const n = this.getState().flatData,
      r = this.getRowIndex(e, n);
    return n[r - 1];
  }
  getColumn(e) {
    return this.getState().columns.find((n) => n.id == e);
  }
  getNextColumn(e, n) {
    const r = this.getState()._columns,
      s = r.findIndex((o) => o.id == e);
    return n ? this._getFirstVisibleColumn(s + 1) : r[s + 1];
  }
  getPrevColumn(e, n) {
    const r = this.getState()._columns,
      s = r.findIndex((o) => o.id == e);
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
    return !r || s ? !1 : typeof r == 'function' ? r(e, n) : !0;
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
    let s = this._branches[e],
      { data: o } = this.getState();
    if (((o = [...o]), e !== 0)) {
      s = { ...s, open: n };
      const i = this.updateTreeRow(s);
      s.$parent === 0 && (o = i);
    }
    r &&
      s.data?.length &&
      s.data.forEach((i) => {
        const l = this.toggleKids(i, n, r);
        e === 0 && (o = l);
      }),
      this.setState({ data: o });
  }
  toggleKids(e, n, r) {
    e = { ...e, open: n };
    const s = this.updateTreeRow(e);
    return (
      r &&
        e.data?.length &&
        e.data.forEach((o) => {
          this.toggleKids(o, n, r);
        }),
      s
    );
  }
  updateTreeRow(e) {
    const n = e.id;
    this._branches[n] = e;
    const r = this._branches[e.$parent],
      s = r.data.findIndex((o) => o.id == n);
    return (r.data = [...r.data]), (r.data[s] = e), r.data;
  }
  isSelected(e) {
    return this.getState().selectedRows.indexOf(e) !== -1;
  }
  findAndRemove(e, n) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id == n) return e.splice(r, 1)[0];
      if (e[r].data) {
        const s = [...e[r].data],
          o = this.findAndRemove(s, n);
        if (o) return (e[r] = { ...e[r], data: s }), o;
      }
    }
    return null;
  }
  insertItem(e, n, r, s) {
    for (let o = 0; o < e.length; o++) {
      if (e[o].id == n) {
        const i = e[o],
          l = s === 'before' ? o : o + 1;
        if (i.data) {
          if (s === 'before') {
            const a = o > 0 ? e[o - 1] : null;
            return (
              a?.data && a.open
                ? (e[o - 1] = { ...a, data: [...a.data, r] })
                : e.splice(l, 0, r),
              !0
            );
          } else if (i.open) return (e[o] = { ...i, data: [r, ...i.data] }), !0;
        }
        return e.splice(l, 0, r), !0;
      }
      if (
        e[o].data &&
        ((e[o] = { ...e[o], data: [...e[o].data] }),
        this.insertItem(e[o].data, n, r, s))
      )
        return !0;
    }
    return !1;
  }
  moveItem(e, n, r, s) {
    const o = [...r],
      i = this.findAndRemove(o, e);
    return this.insertItem(o, n, i, s), o;
  }
  copyColumns(e) {
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const s = { ...e[r] };
      this.copyHeaderFooter(s, 'header'),
        this.copyHeaderFooter(s, 'footer'),
        (n[r] = s);
    }
    return n;
  }
  copyHeaderFooter(e, n) {
    let r = e[n];
    (r = Array.isArray(r) ? [...r] : [r]),
      r.forEach((s, o) => {
        r[o] = typeof s == 'string' ? { text: s } : { ...s };
      }),
      (e[n] = r);
  }
  setCollapsibleColumns(e, n, r) {
    let s = e.header;
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      if (i.collapsible && i.collapsed) {
        if (i.collapsible !== 'first') {
          (e.collapsed = !0), (e.width = 36), (i.vertical = !0);
          const a = s.length - o;
          (s = s.slice(0, o + 1)), (s[o].rowspan = a);
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
    i.width || (i.width = i.flexgrow ? 17 : o.columnWidth),
      (i._colindex = n + 1);
    const l = i[r],
      a = o[`${r}RowHeights`];
    for (let c = 0; c < s; c++) {
      const d = l[c];
      (d.id = i.id),
        c === l.length - 1 &&
          (d.rowspan = d.rowspan ? Math.min(d.rowspan, s - c) : s - c);
      for (let u = 1; u < d.rowspan; u++) {
        l.splice(c + u, 0, { _hidden: !0 });
        for (let f = 1; f < d.colspan; f++) e[n + f][r].splice(c + u, 0, {});
      }
      if (d.rowspan) {
        const u = (d.rowspan === s ? a : a.slice(c, d.rowspan + c)).reduce(
          (f, p) => f + p,
          0,
        );
        (d.height = u), c + d.rowspan != s && d.height--;
      }
      if (d.colspan) {
        let u = i.width,
          f = i.flexgrow || 0;
        const p = d.colspan;
        for (let m = 1; m < p; m++) {
          const h = e[n + m];
          h &&
            (h.hidden
              ? (d.colspan -= 1)
              : h.flexgrow
                ? (f += h.flexgrow)
                : (u += h.width || o.columnWidth)),
            f ? (d.flexgrow = f) : (d.width = u);
        }
      } else (d.width = i.width), (d.flexgrow = i.flexgrow);
      r === 'header' &&
        d.filter &&
        typeof d.filter == 'string' &&
        (d.filter = { type: d.filter });
    }
    l.length > s && (l.length = s), (i[r] = l);
  }
  normalizeRows(e) {
    for (let n = 0; n < e.length; n++) e[n].id || (e[n].id = hn());
    return e;
  }
  normalizeTreeRows(e, n, r) {
    return (
      e.forEach((s) => {
        s.id || (s.id = hn()),
          (s.$level = n || 0),
          (s.$parent = r || 0),
          (this._branches[s.id] = s),
          s.data &&
            (s.data.length
              ? ((s.$count = s.data.length),
                this.normalizeTreeRows(s.data, s.$level + 1, s.id))
              : (delete s.data, delete s.$count, delete s.open));
      }),
      e
    );
  }
  sortTree(e, n) {
    e.sort(n),
      e.forEach((r) => {
        r.data && this.sortTree(r.data, n);
      });
  }
  filterTree(e, n, r) {
    return (
      e.forEach((s) => {
        n(s) && r.push(s.id), s.data && this.filterTree(s.data, n, r);
      }),
      r
    );
  }
  flattenRows(e, n, r) {
    const s = n;
    return (
      e.forEach((o) => {
        (!r || r.includes(o.id)) && s.push(o),
          o.data?.length && o.open !== !1 && this.flattenRows(o.data, s, r);
      }),
      s
    );
  }
  createFilter(e) {
    const { _columns: n } = this.getState(),
      r = [];
    for (const s in e) {
      const { config: o, type: i } = n
          .find((a) => a.id == s)
          .header.find((a) => a.filter).filter,
        l = e[s];
      r.push((a) => (o?.handler ? o.handler(a[s], l) : Va(i)(a[s], l)));
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
    const { flatData: s, columns: o } = this.getState(),
      i = n ? o.filter((l) => n[l.id]) : o;
    return (
      s.forEach((l) => {
        const a = {};
        i.forEach((c) => {
          const d = ft(l, c);
          String(d).toLowerCase().includes(e) && (a[c.id] = !0);
        }),
          Object.keys(a).length && (r[l.id] = a);
      }),
      r
    );
  }
  normalizeSizes(e, n, r, s, o) {
    const i = ls(e, 'header', r, n.headerHeight, o),
      l = ls(e, 'footer', s, n.footerHeight, o),
      a = i.reduce((d, u) => d + u, 0),
      c = l.reduce((d, u) => d + u, 0);
    return {
      ...n,
      headerRowHeights: i,
      footerRowHeights: l,
      headerHeight: a,
      footerHeight: c,
    };
  }
}
let ja = /* @__PURE__ */ new Date().valueOf();
function hn() {
  return 'temp://' + ja++;
}
function Ya(t, e = 'data-id') {
  let n = t;
  for (!n.tagName && t.target && (n = t.target); n; ) {
    if (n.getAttribute && n.getAttribute(e)) return n;
    n = n.parentNode;
  }
  return null;
}
/* @__PURE__ */ new Date().valueOf();
var Ba = class {
    constructor() {
      this.store = /* @__PURE__ */ new Map();
    }
    configure(t, e) {
      this.node = e;
      for (const n in t)
        if (t[n]) {
          const r = n.toLowerCase().replace(/[ ]/g, ''),
            s = t[n];
          this.store.set(r, s);
        }
    }
  },
  Et = [],
  Ka = {
    subscribe: (t) => {
      Ua();
      const e = new Ba();
      return (
        Et.push(e),
        t(e),
        () => {
          const n = Et.findIndex((r) => r === e);
          n >= 0 && Et.splice(n, 1);
        }
      );
    },
  },
  as = !1;
function Ua() {
  as ||
    ((as = !0),
    document.addEventListener('keydown', (t) => {
      if (
        Et.length &&
        (t.ctrlKey ||
          t.altKey ||
          t.metaKey ||
          t.shiftKey ||
          t.key.length > 1 ||
          t.key === ' ')
      ) {
        const e = [];
        t.ctrlKey && e.push('ctrl'),
          t.altKey && e.push('alt'),
          t.metaKey && e.push('meta'),
          t.shiftKey && e.push('shift');
        let n = t.code.replace('Key', '').toLocaleLowerCase();
        t.key === ' ' && (n = 'space'), e.push(n);
        const r = e.join('+');
        for (let s = Et.length - 1; s >= 0; s--) {
          const o = Et[s],
            i = o.store.get(r) || o.store.get(n);
          i && o.node.contains(t.target) && i(t, { key: r, evKey: n });
        }
      }
    }));
}
const qa = {
  tab: !0,
  'shift+tab': !0,
  arrowup: !0,
  arrowdown: !0,
  arrowright: !0,
  arrowleft: !0,
  enter: !0,
  escape: !0,
  f2: !0,
  home: !0,
  end: !0,
  'ctrl+home': !0,
  'ctrl+end': !0,
  'ctrl+z': !0,
  'ctrl+y': !0,
};
function kr(t, { keys: e, exec: n }) {
  if (!e) return;
  function r(i) {
    const l = i.target;
    return (
      l.tagName === 'INPUT' ||
      l.tagName === 'TEXTAREA' ||
      Ya(l, 'data-header-id')?.classList.contains('wx-filter') ||
      !!l.closest('.wx-cell.wx-editor')
    );
  }
  const s = {};
  for (const i in e) {
    const l = e[i];
    typeof l < 'u' &&
      (typeof l == 'function'
        ? (s[i] = l)
        : l &&
          (s[i] = (a) => {
            const c = r(a);
            n({ key: i, event: a, isInput: c });
          }));
  }
  const o = Ka.subscribe((i) => {
    i.configure(s, t);
  });
  return {
    destroy: () => {
      o();
    },
  };
}
function Xa(t, e) {
  let n = null;
  e.scroll.subscribe((r) => {
    if (!r || r === n) return;
    n = r;
    const { left: s, top: o, height: i, width: l } = r,
      a = e.getHeight(),
      c = e.getWidth(),
      d = e.getScrollMargin();
    if (o >= 0) {
      const u = t.scrollTop;
      o < u ? (t.scrollTop = o) : o + i > u + a && (t.scrollTop = o - a + i);
    }
    if (s >= 0) {
      const u = t.scrollLeft;
      s < u
        ? (t.scrollLeft = s)
        : s + l > u + c - d && (t.scrollLeft = s - c + l + d);
    }
  });
}
function Rt(t) {
  const e = t.getAttribute('data-id'),
    n = parseInt(e);
  return isNaN(n) || n.toString() != e ? e : n;
}
function Qa(t, e, n) {
  const r = t.getBoundingClientRect(),
    s = e.querySelector('.wx-body').getBoundingClientRect();
  return {
    top: r.top - s.top,
    left: r.left - s.left,
    dt: r.bottom - n.clientY,
    db: n.clientY - r.top,
  };
}
function cs(t) {
  return t && t.getAttribute('data-context-id');
}
const ds = 5;
function Za(t, e) {
  let n, r, s, o, i, l, a, c, d;
  function u(S) {
    (o = S.clientX),
      (i = S.clientY),
      (l = {
        ...Qa(n, t, S),
        y: e.getTask(s).$y,
      }),
      (document.body.style.userSelect = 'none');
  }
  function f(S) {
    (n = We(S)),
      cs(n) &&
        ((s = Rt(n)),
        (d = setTimeout(() => {
          (c = !0), e && e.touchStart && e.touchStart(), u(S.touches[0]);
        }, 500)),
        t.addEventListener('touchmove', y),
        t.addEventListener('contextmenu', p),
        window.addEventListener('touchend', k));
  }
  function p(S) {
    if (c || d) return S.preventDefault(), !1;
  }
  function m(S) {
    S.which === 1 &&
      ((n = We(S)),
      cs(n) &&
        ((s = Rt(n)),
        t.addEventListener('mousemove', w),
        window.addEventListener('mouseup', v),
        u(S)));
  }
  function h(S) {
    t.removeEventListener('mousemove', w),
      t.removeEventListener('touchmove', y),
      document.body.removeEventListener('mouseup', v),
      document.body.removeEventListener('touchend', k),
      (document.body.style.userSelect = ''),
      S &&
        (t.removeEventListener('mousedown', m),
        t.removeEventListener('touchstart', f));
  }
  function x(S) {
    const $ = S.clientX - o,
      D = S.clientY - i;
    if (!r) {
      if (
        (Math.abs($) < ds && Math.abs(D) < ds) ||
        (e && e.start && e.start({ id: s, e: S }) === !1)
      )
        return;
      (r = n.cloneNode(!0)),
        (r.style.pointerEvents = 'none'),
        r.classList.add('wx-reorder-task'),
        (r.style.position = 'absolute'),
        (r.style.left = l.left + 'px'),
        (r.style.top = l.top + 'px'),
        (n.style.visibility = 'hidden'),
        n.parentNode.insertBefore(r, n);
    }
    if (r) {
      const L = Math.round(Math.max(0, l.top + D));
      if (e && e.move && e.move({ id: s, top: L, detail: a }) === !1) return;
      const N = e.getTask(s),
        M = N.$y;
      if (!l.start && l.y == M) return C();
      (l.start = !0), (l.y = N.$y - 4), (r.style.top = L + 'px');
      const O = document.elementFromPoint(S.clientX, S.clientY),
        H = We(O);
      if (H && H !== n) {
        const T = Rt(H),
          V = H.getBoundingClientRect(),
          ee = V.top + V.height / 2,
          le = S.clientY + l.db > ee && H.nextElementSibling !== n,
          A = S.clientY - l.dt < ee && H.previousElementSibling !== n;
        a?.after == T || a?.before == T
          ? (a = null)
          : le
            ? (a = { id: s, after: T })
            : A && (a = { id: s, before: T });
      }
    }
  }
  function w(S) {
    x(S);
  }
  function y(S) {
    c
      ? (S.preventDefault(), x(S.touches[0]))
      : d && (clearTimeout(d), (d = null));
  }
  function k() {
    (c = null), d && (clearTimeout(d), (d = null)), C();
  }
  function v() {
    C();
  }
  function C() {
    n && (n.style.visibility = ''),
      r &&
        (r.parentNode.removeChild(r),
        e && e.end && e.end({ id: s, top: l.top })),
      (s = n = r = l = a = null),
      h();
  }
  return (
    t.style.position !== 'absolute' && (t.style.position = 'relative'),
    t.addEventListener('mousedown', m),
    t.addEventListener('touchstart', f),
    {
      destroy() {
        h(!0);
      },
    }
  );
}
const Ja = {
  grid: {
    'Add before': 'Add before',
    'Add after': 'Add after',
    Copy: 'Copy',
    Cut: 'Cut',
    Paste: 'Paste',
    Delete: 'Delete',
    'New row': 'New row',
    'Move up': 'Move up',
    'Move down': 'Move down',
    Undo: 'Undo',
    Redo: 'Redo',
  },
};
function bo(t, e) {
  return t.map((n) => {
    const r = e(n);
    return n.data && n.data.length && (r.data = bo(n.data, e)), r;
  });
}
function So(t, e) {
  const n = [];
  return (
    t.forEach((r) => {
      if (r.data) {
        const s = So(r.data, e);
        s.length && n.push({ ...r, data: s });
      } else e(r) && n.push(r);
    }),
    n
  );
}
let ec = 1;
function tc(t) {
  return bo(t, (e) => {
    const n = { ...e, id: e.id || ec++ };
    return n.type && (n.comp = n.type), n;
  });
}
const $o = {};
function nc(t) {
  return $o[t] || t;
}
function rc(t, e) {
  $o[t] = e;
}
function sc({ onClick: t, onShow: e, option: n }) {
  const r = W(null),
    s = R(() => {
      e(n.data ? n.id : !1, r.current);
    }, [e, n]),
    o = _(() => (n && n.comp ? nc(n.comp) : null), [n]);
  return /* @__PURE__ */ K('div', {
    ref: r,
    className: `wx-cDCz9rZQ wx-option ${n.css || ''} ${n.disabled ? 'wx-disabled' : ''}`,
    'data-id': n.id,
    onMouseEnter: s,
    onClick: t,
    children: [
      n.icon
        ? /* @__PURE__ */ g('i', { className: `wx-cDCz9rZQ wx-icon ${n.icon}` })
        : null,
      n.comp
        ? o
          ? /* @__PURE__ */ g(o, { item: n, option: n })
          : null
        : /* @__PURE__ */ K('span', {
            className: 'wx-cDCz9rZQ wx-value',
            children: [' ', n.text, ' '],
          }),
      n.subtext
        ? /* @__PURE__ */ g('span', {
            className: 'wx-cDCz9rZQ wx-subtext',
            children: n.subtext,
          })
        : null,
      n.data
        ? /* @__PURE__ */ g('i', {
            className: 'wx-cDCz9rZQ wx-sub-icon wxi-angle-right',
          })
        : null,
    ],
  });
}
function br({
  options: t,
  left: e = 0,
  top: n = 0,
  at: r = 'bottom',
  parent: s = null,
  mount: o = null,
  context: i = null,
  css: l = '',
  onClick: a,
}) {
  const [c, d] = B(-1e4),
    [u, f] = B(-1e4),
    [p, m] = B(20),
    [h, x] = B(),
    w = W(null),
    [y, k] = B(!1),
    [v, C] = B(null),
    S = R(() => {
      const M = Ko(w.current, s, r, e, n);
      M && (d(M.x), f(M.y), m(M.z), x(M.width));
    }, [s, r, e, n]);
  P(() => {
    o && o(S);
  }, []);
  const $ = R(() => {
      k(!1);
    }, []),
    D = R(() => {
      a && a({ action: null, option: null });
    }, [a]),
    L = R((M, O) => {
      k(M), C(O);
    }, []),
    N = _(() => tc(t), [t]);
  return (
    P(() => {
      S();
    }, [s, S]),
    P(() => {
      if (w.current) return Ut(w.current, { callback: D, modal: !0 }).destroy;
    }, [D]),
    /* @__PURE__ */ g('div', {
      ref: w,
      'data-wx-menu': 'true',
      className: `wx-XMmAGqVx wx-menu ${l}`,
      style: {
        position: 'absolute',
        top: u + 'px',
        left: c + 'px',
        width: h,
        zIndex: p,
      },
      onMouseLeave: $,
      children: N.map((M) =>
        /* @__PURE__ */ K(
          ys,
          {
            children: [
              M.comp === 'separator'
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-XMmAGqVx wx-separator',
                  })
                : /* @__PURE__ */ g(sc, {
                    option: M,
                    onShow: L,
                    onClick: (O) => {
                      if (!M.data && !O.defaultPrevented) {
                        const H = {
                          context: i,
                          action: M,
                          option: M,
                          event: O,
                        };
                        M.handler && M.handler(H),
                          a && a(H),
                          O.stopPropagation();
                      }
                    },
                  }),
              M.data && y === M.id
                ? /* @__PURE__ */ g(br, {
                    css: l,
                    options: M.data,
                    at: 'right-overlap',
                    parent: v,
                    context: i,
                    onClick: a,
                  })
                : null,
            ],
          },
          M.id,
        ),
      ),
    })
  );
}
const oc = bt(function (t, e) {
  const {
      options: n,
      at: r = 'bottom',
      resolver: s = null,
      dataKey: o = 'contextId',
      filter: i = null,
      css: l = '',
      children: a,
      onClick: c,
    } = t,
    [d, u] = B(null),
    [f, p] = B(null),
    [m, h] = B(0),
    [x, w] = B(0),
    y = _(() => (d !== null && i ? So(n, (S) => i(S, d)) : n), [d, i, n]),
    k = R(
      (S) => {
        p(null), c && c(S);
      },
      [c],
    ),
    v = R((S, $) => {
      let D = null;
      for (; S && S.dataset && !D; ) (D = S.dataset[$]), (S = S.parentNode);
      return D ? Ht(D) : null;
    }, []),
    C = R(
      (S, $) => {
        if (!S) {
          p(null);
          return;
        }
        if (S.defaultPrevented) return;
        const D = S.target;
        if (D && D.dataset && D.dataset.menuIgnore) return;
        h(S.clientX + 1), w(S.clientY + 1);
        let L = typeof $ < 'u' ? $ : v(D, o);
        (s && ((L = s(L, S)), !L)) || (u(L), p(D), S.preventDefault());
      },
      [o, v, s],
    );
  return (
    St(e, () => ({ show: C }), [C]),
    /* @__PURE__ */ K(ye, {
      children: [
        a
          ? /* @__PURE__ */ g('span', {
              onClick: C,
              'data-menu-ignore': 'true',
              children: typeof a == 'function' ? a() : a,
            })
          : null,
        f
          ? /* @__PURE__ */ g(Ds, {
              children: /* @__PURE__ */ g(
                br,
                {
                  css: l,
                  at: r,
                  top: x,
                  left: m,
                  parent: f,
                  context: d,
                  onClick: k,
                  options: y,
                },
                f,
              ),
            })
          : null,
      ],
    })
  );
});
bt(function (t, e) {
  const {
      options: n,
      at: r = 'bottom',
      css: s = '',
      children: o,
      onClick: i,
    } = t,
    [l, a] = B(null);
  function c(m) {
    a(null), i && i(m);
  }
  const d = R((m) => {
    a(m.target), m.preventDefault();
  }, []);
  St(e, () => ({ show: d }), [d]);
  function u(m) {
    let h = m.target;
    for (; !h.dataset.menuIgnore; ) a(h), (h = h.parentNode);
  }
  const f = W(0),
    p = W(l);
  return (
    P(() => {
      p.current !== l && ((f.current += 1), (p.current = l));
    }, [l]),
    /* @__PURE__ */ K(ye, {
      children: [
        /* @__PURE__ */ g('span', {
          onClick: u,
          'data-menu-ignore': 'true',
          children: o,
        }),
        l
          ? /* @__PURE__ */ g(Ds, {
              children: /* @__PURE__ */ g(
                br,
                {
                  css: s,
                  at: r,
                  parent: l,
                  options: n,
                  onClick: c,
                },
                f.current,
              ),
            })
          : null,
      ],
    })
  );
});
const _o = bt(function (t, e) {
    const {
        options: n,
        at: r = 'bottom',
        resolver: s = null,
        dataKey: o = 'contextId',
        filter: i = null,
        css: l = '',
        children: a,
        onClick: c,
      } = t,
      d = W(null),
      u = R((f, p) => {
        d.current.show(f, p);
      }, []);
    return (
      St(
        e,
        () => ({
          show: u,
        }),
        [u],
      ),
      /* @__PURE__ */ K(ye, {
        children: [
          a
            ? /* @__PURE__ */ g('span', {
                onContextMenu: u,
                'data-menu-ignore': 'true',
                children: a,
              })
            : null,
          /* @__PURE__ */ g(oc, {
            css: l,
            at: r,
            options: n,
            resolver: s,
            dataKey: o,
            filter: i,
            ref: d,
            onClick: c,
          }),
        ],
      })
    );
  }),
  Co = {};
function ic(t) {
  return Co[t] || t;
}
function Ft(t, e) {
  Co[t] = e;
}
function No({ menu: t = !1 }) {
  return /* @__PURE__ */ g('div', {
    className: `wx-z1qpqrvg wx-separator${t ? '-menu' : ''}`,
    children: ' ',
  });
}
function To() {
  return /* @__PURE__ */ g('div', { className: 'wx-1IhFzpJV wx-spacer' });
}
const lc = ({ key: t, text: e, ...n }) => n;
function Sr(t) {
  const { item: e = {}, menu: n = !1, values: r, onClick: s, onChange: o } = t,
    i = _(() => ic(e.comp || 'label'), [e]),
    l = R(() => {
      e && e.handler && e.handler(e), s && s({ item: e });
    }, [e, s]),
    a = _(() => (e && e.key && r ? r[e.key] : void 0), [e, r]),
    c = R(
      ({ value: u }) => {
        e && e.handler && e.handler(e, u), o && o({ value: u, item: e });
      },
      [e, o],
    ),
    d = _(
      () => (n ? (e ? e.menuText || e.text : void 0) : e ? e.text : void 0),
      [n, e],
    );
  if (e && e.comp == 'spacer') return /* @__PURE__ */ g(To, {});
  if (e && e.comp == 'separator') return /* @__PURE__ */ g(No, { menu: n });
  {
    const u = i,
      f = [
        'wx-tb-element',
        e && e.css ? e.css : '',
        e && e.spacer ? 'wx-spacer' : '',
        n ? 'wx-menu' : '',
      ]
        .filter(Boolean)
        .join(' ');
    return /* @__PURE__ */ g('div', {
      className: 'wx-KVAsgMam ' + f,
      'data-id': e ? e.id : void 0,
      children: /* @__PURE__ */ g(u, {
        value: a,
        onChange: c,
        onClick: l,
        text: d,
        menu: n,
        ...lc(e),
      }),
    });
  }
}
function Sn({
  item: t,
  values: e = null,
  menu: n = !1,
  onChange: r,
  onClick: s,
}) {
  const [o, i] = B(!0),
    l = () => i(!0),
    a = () => i(!1),
    c = (u) => {
      l(), s && s(u);
    },
    d = [
      'wx-wSVFAGym',
      'wx-tb-group',
      t.css || '',
      t.layout == 'column' ? 'wx-column' : '',
      t.collapsed && !n ? 'wx-group-collapsed' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ g('div', {
    className: d,
    children:
      t.collapsed && !n
        ? /* @__PURE__ */ K(ye, {
            children: [
              /* @__PURE__ */ K('div', {
                className: 'wx-wSVFAGym wx-collapsed',
                onClick: a,
                children: [
                  t.icon
                    ? /* @__PURE__ */ g('i', {
                        className: `wx-wSVFAGym icon ${t.icon}`,
                      })
                    : null,
                  t.text
                    ? /* @__PURE__ */ g('div', {
                        className: 'wx-wSVFAGym wx-label-text',
                        children: t.text,
                      })
                    : null,
                  t.text && !t.icon
                    ? /* @__PURE__ */ g('i', {
                        className: 'wx-wSVFAGym wx-label-arrow wxi-angle-down',
                      })
                    : null,
                ],
              }),
              o
                ? null
                : /* @__PURE__ */ g(zt, {
                    width: '',
                    oncancel: l,
                    children: /* @__PURE__ */ g('div', {
                      className: 'wx-wSVFAGym wx-drop-group',
                      children: /* @__PURE__ */ g(Sn, {
                        item: { ...t, text: '', collapsed: !1 },
                        values: e,
                        menu: n,
                        onChange: r,
                        onClick: c,
                      }),
                    }),
                  }),
            ],
          })
        : /* @__PURE__ */ K(ye, {
            children: [
              /* @__PURE__ */ g('div', {
                className: 'wx-wSVFAGym wx-tb-body',
                children: t.items.map((u, f) =>
                  u.items
                    ? /* @__PURE__ */ g(
                        Sn,
                        {
                          item: u,
                          values: e,
                          onClick: c,
                          onChange: r,
                        },
                        u.id || f,
                      )
                    : /* @__PURE__ */ g(
                        Sr,
                        {
                          item: u,
                          values: e,
                          onClick: c,
                          onChange: r,
                        },
                        u.id || f,
                      ),
                ),
              }),
              t.text
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-wSVFAGym wx-label',
                    children: t.text,
                  })
                : null,
            ],
          }),
  });
}
function ac({
  items: t = [],
  css: e,
  values: n,
  width: r,
  onClick: s,
  onChange: o,
}) {
  const [i, l] = B(void 0),
    a = W(null);
  function c() {
    l(null);
  }
  function d() {
    l(!0);
  }
  function u(f) {
    c(), s && s(f);
  }
  return /* @__PURE__ */ K('div', {
    className: `wx-Yo6BuX0p wx-menu ${e || ''}`,
    ref: a,
    'data-id': '$menu',
    children: [
      /* @__PURE__ */ g(at, { icon: 'wxi-dots-h', onClick: d }),
      i
        ? /* @__PURE__ */ g(zt, {
            width: `${r}px`,
            onCancel: c,
            children: /* @__PURE__ */ g('div', {
              className: 'wx-Yo6BuX0p wx-drop-menu',
              children: t.map((f, p) =>
                f.items
                  ? /* @__PURE__ */ g(
                      Sn,
                      {
                        item: f,
                        values: n,
                        menu: !0,
                        onClick: u,
                        onChange: o,
                      },
                      f.id || p,
                    )
                  : /* @__PURE__ */ g(
                      Sr,
                      {
                        item: f,
                        values: n,
                        menu: !0,
                        onClick: u,
                        onChange: o,
                      },
                      f.id || p,
                    ),
              ),
            }),
          })
        : null,
    ],
  });
}
function cc(t) {
  return (
    t.forEach((e) => {
      e.id || (e.id = lr());
    }),
    t
  );
}
function rr(t) {
  const {
      items: e,
      menuCss: n = '',
      css: r = '',
      values: s,
      overflow: o = 'menu',
      onClick: i,
      onChange: l,
    } = t,
    [a, c] = Ce(e || []),
    [d, u] = Ce(s || null),
    f = _(() => cc(a), [a]),
    p = W(null),
    m = W(-1),
    [h, x] = B([]),
    w = W(f);
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
  function C(N) {
    d && ((d[N.item.key] = N.value), u({ ...d })), l && l(N);
  }
  function S() {
    const N = p.current;
    if (!N) return 0;
    const M = N.children,
      O = w.current || [];
    let H = 0;
    for (let T = 0; T < O.length; T++)
      O[T].comp !== 'spacer' &&
        ((H += M[T].clientWidth), O[T].comp === 'separator' && (H += 8));
    return H;
  }
  function $() {
    const N = p.current,
      M = w.current || [];
    if (N) {
      for (let O = M.length - 1; O >= 0; O--)
        if (M[O].items && !M[O].collapsed) {
          (M[O].collapsed = !0),
            (M[O].$width = N.children[O].offsetWidth),
            (v.current = !0),
            c([...M]);
          return;
        }
    }
  }
  function D(N) {
    const M = p.current,
      O = w.current || [];
    if (M) {
      for (let H = 0; H < O.length; H++)
        if (O[H].collapsed && O[H].$width) {
          O[H].$width - M.children[H].offsetWidth < N + 10 &&
            ((O[H].collapsed = !1), (v.current = !0)),
            c([...O]);
          return;
        }
    }
  }
  function L() {
    const N = p.current;
    if (!N) return;
    const M = w.current || [],
      O = y.current;
    if (O === 'wrap') return;
    const H = N.clientWidth;
    if (N.scrollWidth > H) {
      if (O === 'collapse') return $();
      const T = N.children;
      let V = 0;
      for (let ee = 0; ee < M.length; ee++) {
        if (
          ((V += T[ee].clientWidth),
          M[ee].comp === 'separator' && (V += 8),
          V > H - 40)
        ) {
          if (m.current === ee) return;
          m.current = ee;
          const le = [];
          for (let A = ee; A < M.length; A++)
            le.push(M[A]), (T[A].style.visibility = 'hidden');
          ee > 0 &&
            M[ee - 1].comp === 'separator' &&
            (T[ee - 1].style.visibility = 'hidden'),
            x(le);
          break;
        }
        T[ee].style.visibility = '';
      }
    } else {
      const T = H - S();
      if (T <= 0) return;
      if (O === 'collapse') return D(T);
      if ((k.current || []).length) {
        m.current = null;
        const V = N.children;
        for (let ee = 0; ee < M.length; ee++) V[ee].style.visibility = '';
        x([]);
      }
    }
  }
  return (
    P(() => {
      v.current && ((v.current = !1), L());
    }, [a]),
    P(() => {
      const N = new ResizeObserver(() => L());
      return (
        p.current && N.observe(p.current),
        () => {
          N.disconnect();
        }
      );
    }, []),
    /* @__PURE__ */ K('div', {
      className: `wx-VdPSJj8y wx-toolbar ${r || ''} ${o === 'wrap' ? 'wx-wrap' : ''}`,
      ref: p,
      children: [
        f.map((N) =>
          N.items
            ? /* @__PURE__ */ g(
                Sn,
                {
                  item: N,
                  values: d,
                  onClick: i,
                  onChange: C,
                },
                N.id,
              )
            : /* @__PURE__ */ g(
                Sr,
                {
                  item: N,
                  values: d,
                  onClick: i,
                  onChange: C,
                },
                N.id,
              ),
        ),
        !!h.length &&
          /* @__PURE__ */ g(ac, {
            items: h,
            css: n,
            values: d,
            onClick: i,
            onChange: C,
          }),
      ],
    })
  );
}
function dc(t) {
  const {
    icon: e,
    text: n = '',
    css: r,
    type: s,
    disabled: o,
    menu: i,
    onClick: l,
  } = t;
  return i
    ? /* @__PURE__ */ K('div', {
        className: 'wx-HXpG4gnx wx-item',
        onClick: l,
        children: [
          /* @__PURE__ */ g('i', {
            className: `wx-HXpG4gnx ${e || 'wxi-empty'} ${r || ''}`,
          }),
          n,
        ],
      })
    : /* @__PURE__ */ g(at, {
        icon: e,
        type: s,
        css: r,
        text: n,
        disabled: o,
        onClick: l,
      });
}
function uc(t) {
  const { text: e, value: n, children: r } = t;
  return r
    ? /* @__PURE__ */ g('div', {
        className: 'wx-PTEZGYcj wx-label',
        children: r(),
      })
    : /* @__PURE__ */ g('div', {
        className: 'wx-PTEZGYcj wx-label',
        children: n || e,
      });
}
function fc(t) {
  const {
    icon: e,
    text: n,
    css: r,
    type: s,
    disabled: o,
    menu: i,
    onClick: l,
  } = t;
  return i
    ? /* @__PURE__ */ K('div', {
        className: 'wx-3cuSqONJ wx-item',
        onClick: l,
        children: [
          e
            ? /* @__PURE__ */ g('i', {
                className: `wx-3cuSqONJ ${e || ''} ${r || ''}`,
              })
            : null,
          n,
        ],
      })
    : /* @__PURE__ */ g(at, {
        icon: e,
        type: s,
        css: r,
        title: n,
        disabled: o,
        onClick: l,
      });
}
function hc({
  id: t = '',
  text: e = '',
  css: n = '',
  icon: r = '',
  onClick: s,
}) {
  function o() {
    s && s({ id: t });
  }
  return /* @__PURE__ */ K('div', {
    className: `wx-U0Bx7pIR wx-label ${n}`,
    onClick: o,
    children: [
      r ? /* @__PURE__ */ g('i', { className: 'wx-U0Bx7pIR ' + r }) : null,
      e,
    ],
  });
}
Ft('button', dc);
Ft('separator', No);
Ft('spacer', To);
Ft('label', uc);
Ft('item', hc);
Ft('icon', fc);
const qe = At(null);
function pc(t, e) {
  const n = new ResizeObserver((r) => {
    requestAnimationFrame(() => e(r[0].contentRect));
  });
  return (
    n.observe(t.parentNode),
    {
      destroy() {
        n.disconnect();
      },
    }
  );
}
const us = 5,
  gc = 700;
function mc(t) {
  return Ht(t.getAttribute('data-id'));
}
function pn(t) {
  const e = t.getBoundingClientRect(),
    n = document.body,
    r = e.top + n.scrollTop - n.clientTop || 0,
    s = e.left + n.scrollLeft - n.clientLeft || 0;
  return {
    y: Math.round(r),
    x: Math.round(s),
    width: t.offsetWidth,
    height: t.offsetHeight,
  };
}
function sr(t, e) {
  const n = pn(e);
  return { x: t.clientX - n.x, y: t.clientY - n.y };
}
function wc(t, e) {
  const n = e.current;
  let r = null,
    s,
    o,
    i = !1,
    l = !1;
  const a = document.createElement('DIV');
  (a.className = 'wx-drag-zone'), a.setAttribute('tabindex', -1);
  function c() {
    clearTimeout(s), (s = null);
  }
  function d($) {
    const D = We($);
    D &&
      ((r = {
        container: a,
        sourceNode: $.target,
        from: mc(D),
        pos: sr($, t),
      }),
      (o = r.pos),
      u($));
  }
  function u($) {
    if (!r) return;
    const D = (r.pos = sr($, t));
    if (!i) {
      if (
        !l &&
        !$?.target?.getAttribute('draggable-data') &&
        Math.abs(o.x - D.x) < us &&
        Math.abs(o.y - D.y) < us
      )
        return;
      if (C($) === !1) return S();
    }
    if (l) {
      const L =
          window.scrollX ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft,
        N =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      r.targetNode = document.elementFromPoint($.pageX - L, $.pageY - N);
    } else r.targetNode = $.target;
    n.move && n.move($, r),
      (a.style.left = -(r.offset ? r.offset.x : 0) + 'px'),
      (a.style.top = r.pos.y + (r.offset ? r.offset.y : 0) + 'px');
  }
  function f($) {
    a.parentNode && a.parentNode.removeChild(a),
      (a.innerHTML = ''),
      i && n.end && n.end($, r),
      (r = o = null),
      S();
  }
  function p($) {
    (n.getReorder && !n.getReorder()) ||
      ($.button === 0 &&
        (v($),
        window.addEventListener('mousemove', m),
        window.addEventListener('mouseup', h),
        d($)));
  }
  function m($) {
    u($);
  }
  function h($) {
    f($);
  }
  function x($) {
    if (n.getReorder && !n.getReorder()) return;
    (s = setTimeout(() => {
      (l = !0), d($.touches[0]);
    }, gc)),
      v($);
    function D() {
      s && c(),
        $.target.removeEventListener('touchmove', w),
        $.target.removeEventListener('touchend', D),
        f($);
    }
    $.target.addEventListener('touchmove', w),
      $.target.addEventListener('touchend', D),
      t.addEventListener('contextmenu', y);
  }
  function w($) {
    i ? ($.preventDefault(), u($.touches[0])) : s && c();
  }
  function y($) {
    if (i || s) return $.preventDefault(), !1;
  }
  function k($) {
    $.preventDefault();
  }
  function v($) {
    if (!n.getDraggableInfo) return;
    const { hasDraggable: D } = n.getDraggableInfo();
    (!D || $.target.getAttribute('draggable-data')) &&
      ((document.body.style.userSelect = 'none'),
      (document.body.style.webkitUserSelect = 'none'));
  }
  function C($) {
    if (((i = !0), n.start)) {
      if (n.start($, r) === !1) return !1;
      t.appendChild(a), (document.body.style.cursor = 'move');
    }
  }
  function S($) {
    (i = l = !1),
      (document.body.style.cursor = ''),
      (document.body.style.userSelect = ''),
      (document.body.style.webkitUserSelect = ''),
      window.removeEventListener('mousemove', m),
      window.removeEventListener('mouseup', h),
      $ &&
        (t.removeEventListener('mousedown', p),
        t.removeEventListener('touchstart', x),
        t.removeEventListener('dragstart', k));
  }
  return (
    t.addEventListener('mousedown', p),
    t.addEventListener('touchstart', x),
    t.addEventListener('dragstart', k),
    {
      destroy() {
        S(!0);
      },
    }
  );
}
const xc = 4e-3;
function yc() {
  return {
    dirX: 0,
    dirY: 0,
    scrollSpeedFactor: 1,
  };
}
function vc(t, e, n, r) {
  const {
      node: s,
      left: o,
      top: i,
      bottom: l,
      sense: a,
      xScroll: c,
      yScroll: d,
    } = r,
    u = sr(t, s);
  n.scrollState || (n.scrollState = yc());
  let f = 0,
    p = 0;
  u.x < o + a ? (f = -1) : u.x > e.width - a && (f = 1),
    u.y < i + Math.round(a / 2)
      ? (p = -1)
      : u.y > e.height - l - Math.round(a / 2) && (p = 1),
    (n.scrollState.dirX !== f || n.scrollState.dirY !== p) &&
      (Do(n), (n.scrollState.dirX = f), (n.scrollState.dirY = p)),
    ((c && n.scrollState.dirX !== 0) || (d && n.scrollState.dirY !== 0)) &&
      kc(n, r, {
        x: n.scrollState.dirX,
        y: n.scrollState.dirY,
      });
}
function kc(t, e, n) {
  t.autoScrollTimer ||
    (t.autoScrollTimer = setTimeout(() => {
      t.activeAutoScroll = setInterval(bc, 15, t, e, n);
    }, 250));
}
function Do(t) {
  (t.scrollSpeedFactor = 1),
    t.autoScrollTimer &&
      ((t.autoScrollTimer = clearTimeout(t.autoScrollTimer)),
      (t.activeAutoScroll = clearInterval(t.activeAutoScroll)));
}
function bc(t, e, n) {
  const { x: r, y: s } = n;
  (t.scrollSpeedFactor += xc), r !== 0 && $c(t, e, r), s !== 0 && Sc(t, e, s);
}
function Sc(t, e, n) {
  const r = e.node.scrollTop;
  Mo(r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n, 'scrollTop', e);
}
function $c(t, e, n) {
  const r = e.node.scrollLeft;
  Mo(r + Math.round(e.sense / 3) * t.scrollSpeedFactor * n, 'scrollLeft', e);
}
function Mo(t, e, n) {
  n.node[e] = t;
}
function Dn(t, e, n, r, s, o) {
  const i = {};
  return (
    t && ((i.width = `${t}px`), (i.minWidth = `${t}px`)),
    e && (i.flexGrow = e),
    o && (i.height = `${o}px`),
    n &&
      ((i.position = 'sticky'),
      n.left && (i.left = `${r}px`),
      n.right && (i.right = `${s}px`)),
    i
  );
}
function Eo(t, e, n) {
  let r = '';
  if (t.fixed)
    for (const s in t.fixed)
      r += t.fixed[s] === -1 ? 'wx-shadow ' : 'wx-fixed ';
  return (
    (r += e.rowspan > 1 ? 'wx-rowspan ' : ''),
    (r += e.colspan > 1 ? 'wx-colspan ' : ''),
    (r += e.vertical ? 'wx-vertical ' : ''),
    (r += n ? n(t) + ' ' : ''),
    r
  );
}
function _c(t) {
  const {
      row: e,
      column: n,
      cellStyle: r = null,
      columnStyle: s = null,
      children: o,
    } = t,
    [i, l] = Ce(t.focusable),
    a = ge(qe),
    c = Z(a, 'focusCell'),
    d = Z(a, 'search'),
    u = Z(a, 'reorder'),
    f = _(() => d?.rows[e.id] && d.rows[e.id][n.id], [d, e.id, n.id]),
    p = _(
      () => Dn(n.width, n.flexgrow, n.fixed, n.left, n.right),
      [n.width, n.flexgrow, n.fixed, n.left, n.right],
    );
  function m(S, $) {
    let D = 'wx-cell';
    return (
      (D += n.fixed ? ' ' + (n.fixed === -1 ? 'wx-shadow' : 'wx-fixed') : ''),
      (D += S ? ' ' + S(n) : ''),
      (D += $ ? ' ' + $(e, n) : ''),
      (D += n.treetoggle ? ' wx-tree-cell' : ''),
      D
    );
  }
  const h = _(() => m(s, r), [s, r, n, e]),
    x = _(
      () =>
        typeof n.draggable == 'function'
          ? n.draggable(e, n) !== !1
          : n.draggable,
      [n, e],
    ),
    w = W(null);
  P(() => {
    w.current &&
      i &&
      c?.row === e.id &&
      c?.column === n.id &&
      w.current.focus();
  }, [c, i, e.id, n.id]);
  const y = R(() => {
    i &&
      !c &&
      a.exec('focus-cell', {
        row: e.id,
        column: n.id,
        eventSource: 'focus',
      });
  }, [a, i, c, e.id, n.id]);
  P(
    () => () => {
      i && c && (a.exec('focus-cell', { eventSource: 'destroy' }), l(!1));
    },
    [a, l],
  );
  function k(S) {
    const $ = new RegExp(`(${d.value.trim()})`, 'gi');
    return String(S)
      .split($)
      .map((D) => ({ text: D, highlight: $.test(D) }));
  }
  const v = _(() => {
      const S = (n.fixed && n.fixed.left === -1) || n.fixed.right === -1,
        $ = n.fixed && n.fixed.right;
      return [h, S ? 'wx-shadow' : '', $ ? 'wx-fixed-right' : '']
        .filter(Boolean)
        .join(' ');
    }, [h, n]),
    C = n.cell;
  return /* @__PURE__ */ K('div', {
    className: 'wx-TSCaXsGV ' + v,
    ref: w,
    onFocus: y,
    style: p,
    'data-row-id': e.id,
    'data-col-id': n.id,
    tabIndex: i ? '0' : '-1',
    role: 'gridcell',
    'aria-colindex': n._colindex,
    'aria-readonly': n.editor ? void 0 : !0,
    children: [
      u && n.draggable
        ? x
          ? /* @__PURE__ */ g('i', {
              'draggable-data': 'true',
              className: 'wx-TSCaXsGV wx-draggable wxi-drag',
            })
          : /* @__PURE__ */ g('i', {
              className: 'wx-TSCaXsGV wx-draggable-stub',
            })
        : null,
      n.treetoggle
        ? /* @__PURE__ */ K(ye, {
            children: [
              /* @__PURE__ */ g('span', {
                style: { marginLeft: `${e.$level * 28}px` },
              }),
              e.$count
                ? /* @__PURE__ */ g('i', {
                    'data-action': 'toggle-row',
                    className: `wx-TSCaXsGV wx-table-tree-toggle wxi-menu-${e.open !== !1 ? 'down' : 'right'}`,
                  })
                : null,
            ],
          })
        : null,
      C
        ? /* @__PURE__ */ g(C, {
            api: a,
            row: e,
            column: n,
            onAction: ({ action: S, data: $ }) => a.exec(S, $),
          })
        : o
          ? o()
          : f
            ? /* @__PURE__ */ g('span', {
                children: k(ft(e, n)).map(({ highlight: S, text: $ }, D) =>
                  S
                    ? /* @__PURE__ */ g(
                        'mark',
                        { className: 'wx-TSCaXsGV wx-search', children: $ },
                        D,
                      )
                    : /* @__PURE__ */ g('span', { children: $ }, D),
                ),
              })
            : ft(e, n),
    ],
  });
}
function fs(t, e) {
  let n, r;
  function s(l) {
    (n = l.clientX),
      (t.style.opacity = 1),
      (document.body.style.cursor = 'ew-resize'),
      (document.body.style.userSelect = 'none'),
      window.addEventListener('mousemove', o),
      window.addEventListener('mouseup', i),
      e && e.down && e.down(t);
  }
  function o(l) {
    (r = l.clientX - n), e && e.move && e.move(r);
  }
  function i() {
    (t.style.opacity = ''),
      (document.body.style.cursor = ''),
      (document.body.style.userSelect = ''),
      e && e.up && e.up(r),
      window.removeEventListener('mousemove', o),
      window.removeEventListener('mouseup', i);
  }
  return (
    t.addEventListener('mousedown', s),
    {
      destroy() {
        t.removeEventListener('mousedown', s);
      },
    }
  );
}
function Cc({ filter: t, column: e, action: n, filterValue: r }) {
  function s({ value: o }) {
    n({ value: o, key: e.id });
  }
  return /* @__PURE__ */ g(Zt, {
    ...(t.config ?? {}),
    value: r,
    onChange: s,
  });
}
function Nc({ filter: t, column: e, action: n, filterValue: r }) {
  const s = ge(qe),
    o = Z(s, 'flatData'),
    i = _(() => t?.config?.options || e?.options || a(), [t, e, o]),
    l = _(() => t?.config?.template, [t]);
  function a() {
    const u = [];
    return (
      o.forEach((f) => {
        const p = kt(f, e);
        u.includes(p) || u.push(p);
      }),
      u.map((f) => ({ id: f, label: f }))
    );
  }
  function c({ value: u }) {
    n({ value: u, key: e.id });
  }
  function d(u) {
    u.key !== 'Tab' && u.preventDefault();
  }
  return /* @__PURE__ */ g('div', {
    style: { width: '100%' },
    onKeyDown: d,
    children: /* @__PURE__ */ g(Ns, {
      placeholder: '',
      clear: !0,
      ...(t?.config ?? {}),
      options: i,
      value: r,
      onChange: c,
      children: (u) => (l ? l(u) : u.label),
    }),
  });
}
const Tc = {
  text: Cc,
  richselect: Nc,
};
function Dc({ filter: t, column: e }) {
  const n = ge(qe),
    r = Z(n, 'filterValues');
  function s(i) {
    n.exec('filter-rows', i);
  }
  const o = _(() => Tc[t.type], [t.type]);
  return /* @__PURE__ */ g(o, {
    filter: t,
    column: e,
    action: s,
    filterValue: r[e.id],
  });
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
      hasSplit: a,
    } = t,
    c = ge(qe),
    d = Z(c, 'sortMarks'),
    u = _(() => (d ? d[n.id] : void 0), [d, n.id]),
    f = W(),
    p = R(
      (T) => {
        f.current = e.flexgrow ? T.parentNode.clientWidth : e.width;
      },
      [e.flexgrow, e.width],
    ),
    m = R(
      (T, V) => {
        c.exec('resize-column', {
          id: e.id,
          width: Math.max(1, (f.current || 0) + T),
          inProgress: V,
        });
      },
      [c, e.id],
    ),
    h = R((T) => m(T, !0), [m]),
    x = R((T) => m(T, !1), [m]),
    w = R(
      (T) => {
        if (!n.sort || e.filter) return;
        let V = u?.order;
        V && (V = V === 'asc' ? 'desc' : 'asc'),
          c.exec('sort-rows', { key: e.id, add: T.ctrlKey, order: V });
      },
      [c, e.id, e.filter, n.sort, u?.order],
    ),
    y = R(
      (T) => {
        T && T.stopPropagation(),
          c.exec('collapse-column', { id: e.id, row: r });
      },
      [c, e.id, r],
    ),
    k = R(
      (T) => {
        T.key === 'Enter' && y();
      },
      [y],
    ),
    v = R(
      (T) => {
        T.key === 'Enter' && !e.filter && w(T);
      },
      [w, e.filter],
    ),
    C = _(() => e.collapsed && n.collapsed, [e.collapsed, n.collapsed]),
    S = _(() => C && !a && e.collapsible !== 'header', [C, a, e.collapsible]),
    $ = _(() => (S ? { top: -l / 2, position: 'absolute' } : {}), [S, l]),
    D = _(
      () =>
        Dn(
          e.width,
          e.flexgrow,
          n.fixed,
          n.left,
          e.right ?? n.right,
          e.height + (C && S ? l : 0),
        ),
      [
        e.width,
        e.flexgrow,
        n.fixed,
        n.left,
        e.right,
        n.right,
        e.height,
        C,
        S,
        l,
      ],
    ),
    L = _(() => Eo(n, e, i), [n, e, i]),
    N = R(
      () => Object.fromEntries(Object.entries(e).filter(([T]) => T !== 'cell')),
      [e],
    ),
    M = `wx-cell ${L} ${e.css || ''} wx-collapsed`,
    O = [
      'wx-cell',
      L,
      e.css || '',
      e.filter ? 'wx-filter' : '',
      n.fixed && n.fixed.right ? 'wx-fixed-right' : '',
    ]
      .filter(Boolean)
      .join(' '),
    H = W(null);
  return (
    P(() => {
      const T = H.current;
      if (!T) return;
      const V = fs(T, { down: p, move: h, up: x });
      return () => {
        typeof V == 'function' && V();
      };
    }, [p, h, x, fs]),
    C
      ? /* @__PURE__ */ g('div', {
          className: 'wx-RsQD74qC ' + M,
          style: D,
          role: 'button',
          'aria-label': `Expand column ${e.text || ''}`,
          'aria-expanded': !e.collapsed,
          tabIndex: 0,
          onKeyDown: k,
          onClick: y,
          'data-header-id': n.id,
          children: /* @__PURE__ */ g('div', {
            className: 'wx-RsQD74qC wx-text',
            style: $,
            children: e.text || '',
          }),
        })
      : /* @__PURE__ */ K('div', {
          className: 'wx-RsQD74qC ' + O,
          style: D,
          onClick: w,
          'data-header-id': n.id,
          tabIndex: !e._hidden && n.sort && !e.filter ? 0 : void 0,
          role: 'columnheader',
          'aria-colindex': e._colindex,
          'aria-colspan': e.colspan > 1 ? e.colspan : void 0,
          'aria-rowspan': e.rowspan > 1 ? e.rowspan : void 0,
          'aria-sort':
            !u?.order || e.filter
              ? 'none'
              : u?.order === 'asc'
                ? 'ascending'
                : 'descending',
          onKeyDown: v,
          children: [
            e.collapsible
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-RsQD74qC wx-collapse',
                  role: 'button',
                  'aria-label': e.collapsed
                    ? 'Expand column'
                    : 'Collapse column',
                  'aria-expanded': !e.collapsed,
                  tabIndex: 0,
                  onKeyDown: k,
                  onClick: y,
                  children: /* @__PURE__ */ g('i', {
                    className: `wx-RsQD74qC wxi-angle-${e.collapsed ? 'down' : 'right'}`,
                  }),
                })
              : null,
            e.cell
              ? (() => {
                  const T = e.cell;
                  return /* @__PURE__ */ g(T, {
                    api: c,
                    cell: N(),
                    column: n,
                    row: r,
                    onAction: ({ action: V, data: ee }) => c.exec(V, ee),
                  });
                })()
              : e.filter
                ? /* @__PURE__ */ g(Dc, { filter: e.filter, column: n })
                : /* @__PURE__ */ g('div', {
                    className: 'wx-RsQD74qC wx-text',
                    children: e.text || '',
                  }),
            n.resize && s && !e._hidden
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-RsQD74qC wx-grip',
                  role: 'presentation',
                  'aria-label': 'Resize column',
                  ref: H,
                  onClick: (T) => T.stopPropagation(),
                  children: /* @__PURE__ */ g('div', {}),
                })
              : null,
            o
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-RsQD74qC wx-sort',
                  children: u
                    ? /* @__PURE__ */ K(ye, {
                        children: [
                          typeof u.index < 'u'
                            ? /* @__PURE__ */ g('div', {
                                className: 'wx-RsQD74qC wx-order',
                                children: u.index + 1,
                              })
                            : null,
                          /* @__PURE__ */ g('i', {
                            className: `wx-RsQD74qC wxi-arrow-${u.order === 'asc' ? 'up' : 'down'}`,
                          }),
                        ],
                      })
                    : null,
                })
              : null,
          ],
        })
  );
}
function Ec({ cell: t, column: e, row: n, columnStyle: r }) {
  const s = ge(qe),
    o = _(
      () =>
        Dn(
          t?.width,
          t?.flexgrow,
          e?.fixed,
          e?.left,
          t?.right ?? e?.right,
          t?.height,
        ),
      [t?.width, t?.flexgrow, e?.fixed, e?.left, t?.right, e?.right, t?.height],
    ),
    i = _(() => Eo(e, t, r), [e, t, r]),
    l = R(
      () =>
        Object.fromEntries(
          Object.entries(t || {}).filter(([c]) => c !== 'cell'),
        ),
      [t],
    ),
    a =
      `wx-6Sdi3Dfd wx-cell ${i || ''} ${t?.css || ''}` +
      (e?.fixed && e?.fixed.right ? ' wx-fixed-right' : '');
  return /* @__PURE__ */ g('div', {
    className: a,
    style: o,
    children:
      !e?.collapsed && !t?.collapsed
        ? t?.cell
          ? zo.createElement(t.cell, {
              api: s,
              cell: l(),
              column: e,
              row: n,
              onAction: ({ action: c, data: d }) => s.exec(c, d),
            })
          : /* @__PURE__ */ g('div', {
              className: 'wx-6Sdi3Dfd wx-text',
              children: t?.text || '',
            })
        : null,
  });
}
function hs({
  deltaLeft: t,
  contentWidth: e,
  columns: n,
  type: r = 'header',
  columnStyle: s,
  bodyHeight: o,
}) {
  const i = ge(qe),
    l = Z(i, '_sizes'),
    a = Z(i, 'split'),
    c = _(() => l?.[`${r}RowHeights`], [l, r]),
    d = _(() => {
      let h = [];
      if (n && n.length) {
        const x = n[0][r].length;
        for (let w = 0; w < x; w++) {
          let y = 0;
          h.push([]),
            n.forEach((k, v) => {
              const C = { ...k[r][w] };
              if ((y || h[w].push(C), C.colspan > 1)) {
                if (((y = C.colspan - 1), !vo() && k.right)) {
                  let S = k.right;
                  for (let $ = 1; $ < C.colspan; $++) S -= n[v + $].width;
                  C.right = S;
                }
              } else y && y--;
            });
        }
      }
      return h;
    }, [n, r]),
    u = _(() => a?.left || a?.right, [a]);
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
  return /* @__PURE__ */ g('div', {
    className: `wx-sAsPVaUK wx-${r}`,
    style: { paddingLeft: `${t}px`, width: `${e}px` },
    role: 'rowgroup',
    children: d.map((h, x) =>
      /* @__PURE__ */ g(
        'div',
        {
          className:
            r === 'header' ? 'wx-sAsPVaUK wx-h-row' : 'wx-sAsPVaUK wx-f-row',
          style: { height: `${c?.[x]}px`, display: 'flex' },
          role: 'row',
          children: h.map((w) => {
            const y = f(w.id);
            return r === 'header'
              ? /* @__PURE__ */ g(
                  Mc,
                  {
                    cell: w,
                    columnStyle: s,
                    column: y,
                    row: x,
                    lastRow: p(w, x),
                    bodyHeight: o,
                    sortRow: m(w, x, y),
                    hasSplit: u,
                  },
                  w.id,
                )
              : /* @__PURE__ */ g(
                  Ec,
                  {
                    cell: w,
                    columnStyle: s,
                    column: f(w.id),
                    row: x,
                  },
                  w.id,
                );
          }),
        },
        x,
      ),
    ),
  });
}
function Rc({ overlay: t }) {
  const e = ge(qe);
  function n(s) {
    return typeof s == 'function';
  }
  const r = t;
  return /* @__PURE__ */ g('div', {
    className: 'wx-1ty666CQ wx-overlay',
    children: n(t)
      ? /* @__PURE__ */ g(r, {
          onAction: ({ action: s, data: o }) => e.exec(s, o),
        })
      : t,
  });
}
function Ic(t) {
  const { actions: e, editor: n } = t,
    [r, s] = B(n?.value || ''),
    o = W(null);
  P(() => {
    o.current && o.current.focus();
  }, []);
  function i() {
    o.current && (s(o.current.value), e.updateValue(o.current.value));
  }
  function l({ key: a }) {
    a === 'Enter' && e.save();
  }
  return /* @__PURE__ */ g('input', {
    className: 'wx-e7Ao5ejY wx-text',
    onInput: i,
    onKeyDown: l,
    ref: o,
    type: 'text',
    value: r,
  });
}
function Ac({ actions: t, editor: e, onAction: n }) {
  const [r, s] = B(e?.value),
    [o, i] = B(e?.renderedValue),
    [l, a] = B(e?.options || []),
    c = _(() => e?.config?.template, [e]),
    d = _(() => e?.config?.cell, [e]),
    u = _(() => (l || []).findIndex((y) => y.id === r), [l, r]),
    f = W(null),
    p = W(null),
    m = R(
      (y) => {
        (f.current = y.navigate), (p.current = y.keydown), f.current(u);
      },
      [u, f],
    ),
    h = R(
      (y) => {
        const k = y?.target?.value ?? '';
        i(k);
        const v = k
          ? (e?.options || []).filter((C) =>
              (C.label || '').toLowerCase().includes(k.toLowerCase()),
            )
          : e?.options || [];
        a(v), v.length ? f.current(-1 / 0) : f.current(null);
      },
      [e],
    ),
    x = W(null);
  P(() => {
    x.current && x.current.focus();
  }, []),
    P(() => {
      s(e?.value), i(e?.renderedValue), a(e?.options || []);
    }, [e]);
  const w = R(
    ({ id: y }) => {
      t.updateValue(y), t.save();
    },
    [t],
  );
  return /* @__PURE__ */ K(ye, {
    children: [
      /* @__PURE__ */ g('input', {
        className: 'wx-0UYfSd1x wx-input',
        ref: x,
        value: o ?? '',
        onChange: h,
        onKeyDown: (y) => (p.current ? p.current(y, u) : void 0),
      }),
      /* @__PURE__ */ g($n, {
        items: l,
        onReady: m,
        onSelect: w,
        children: ({ option: y }) =>
          c
            ? c(y)
            : d
              ? /* @__PURE__ */ g(d, { data: y, onAction: n })
              : y.label,
      }),
    ],
  });
}
function Hc({ actions: t, editor: e, onAction: n }) {
  const [r] = B(() => e.value || /* @__PURE__ */ new Date()),
    [s] = B(() => e.config?.template),
    [o] = B(() => e.config?.cell);
  function i({ value: a }) {
    t.updateValue(a), t.save();
  }
  const l = W(null);
  return (
    P(() => {
      l.current && l.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ K(ye, {
      children: [
        /* @__PURE__ */ g('div', {
          className: 'wx-lNWNYUb6 wx-value',
          ref: l,
          tabIndex: 0,
          onClick: () => t.cancel(),
          onKeyDown: (a) => a.preventDefault(),
          children: s
            ? s(r)
            : o
              ? /* @__PURE__ */ g(o, { data: e.value, onAction: n })
              : /* @__PURE__ */ g('span', {
                  className: 'wx-lNWNYUb6 wx-text',
                  children: e.renderedValue,
                }),
        }),
        /* @__PURE__ */ g(zt, {
          width: 'auto',
          children: /* @__PURE__ */ g(Cs, {
            value: r,
            onChange: i,
            buttons: e.config?.buttons,
          }),
        }),
      ],
    })
  );
}
function Lc(t) {
  const { actions: e, editor: n } = t,
    r = t.onAction ?? t.onaction,
    s = n.config || {},
    [o] = B(n.options.find((h) => h.id === n.value)),
    [i] = B(n.value),
    [l] = B(n.options),
    a = _(() => l.findIndex((h) => h.id === i), [l, i]);
  function c({ id: h }) {
    e.updateValue(h), e.save();
  }
  let d;
  const [u, f] = B();
  function p(h) {
    (d = h.navigate), f(() => h.keydown), d(a);
  }
  const m = W(null);
  return (
    P(() => {
      m.current && m.current.focus(),
        typeof window < 'u' &&
          window.getSelection &&
          window.getSelection().removeAllRanges();
    }, []),
    /* @__PURE__ */ K(ye, {
      children: [
        /* @__PURE__ */ g('div', {
          ref: m,
          className: 'wx-ywGRk611 wx-value',
          tabIndex: 0,
          onClick: () => e.cancel(),
          onKeyDown: (h) => {
            u(h, a), h.preventDefault();
          },
          children: s.template
            ? s.template(o)
            : s.cell
              ? (() => {
                  const h = s.cell;
                  return /* @__PURE__ */ g(h, { data: o, onAction: r });
                })()
              : /* @__PURE__ */ g('span', {
                  className: 'wx-ywGRk611 wx-text',
                  children: n.renderedValue,
                }),
        }),
        /* @__PURE__ */ g($n, {
          items: l,
          onReady: p,
          onSelect: c,
          children: ({ option: h }) =>
            s.template
              ? s.template(h)
              : s.cell
                ? (() => {
                    const x = s.cell;
                    return /* @__PURE__ */ g(x, { data: h, onAction: r });
                  })()
                : h.label,
        }),
      ],
    })
  );
}
const zc = {
  text: Ic,
  combo: Ac,
  datepicker: Hc,
  richselect: Lc,
};
function Fc({ column: t, row: e }) {
  const n = ge(qe),
    r = Z(n, 'editor'),
    s = R(
      (m, h) => {
        n.exec('close-editor', { ignore: m }),
          h &&
            n.exec('focus-cell', {
              ...h,
              eventSource: 'click',
            });
      },
      [n],
    ),
    o = R(
      (m) => {
        const h = m ? null : { row: r?.id, column: r?.column };
        s(!1, h);
      },
      [r, s],
    ),
    i = R(() => {
      s(!0, { row: r?.id, column: r?.column });
    }, [r, s]),
    l = R(
      (m) => {
        n.exec('editor', { value: m });
      },
      [n],
    ),
    a = R(
      (m) => {
        m.key === 'Enter' && r && i();
      },
      [r, i],
    ),
    c = _(
      () => Dn(t.width, t.flexgrow, t.fixed, t.left, t.right),
      [t.width, t.flexgrow, t.fixed, t.left, t.right],
    ),
    d = _(() => {
      let m = t.editor;
      typeof m == 'function' && (m = m(e, t));
      let h = typeof m == 'string' ? m : m.type;
      return zc[h];
    }, [t, e]),
    u = W(null);
  P(() => {
    if (!u.current) return;
    const m = Ut(u.current, () => o(!0));
    return () => {
      typeof m == 'function' && m();
    };
  }, [o]),
    P(() => {
      u.current && typeof c == 'string' && u.current.setAttribute('style', c);
    }, [c]);
  const f = typeof e.$parent < 'u' ? 'gridcell' : 'cell',
    p = typeof e.$parent < 'u' ? !t.editor : void 0;
  return /* @__PURE__ */ g('div', {
    className: 'wx-8l724t2g wx-cell wx-editor',
    ref: u,
    style: typeof c == 'object' && c !== null ? c : void 0,
    role: f,
    'aria-readonly': p,
    tabIndex: -1,
    onClick: (m) => m.stopPropagation(),
    onDoubleClick: (m) => m.stopPropagation(),
    onKeyDown: a,
    children: d
      ? /* @__PURE__ */ g(d, {
          editor: r,
          actions: { save: o, cancel: i, updateValue: l },
          onAction: ({ action: m, data: h }) => n.exec(m, h),
        })
      : null,
  });
}
function ps(t) {
  const { columns: e, type: n, columnStyle: r } = t,
    s = ge(qe),
    { filterValues: o, _columns: i, _sizes: l } = s.getState();
  function a(c) {
    return r ? ' ' + r(c) : '';
  }
  return /* @__PURE__ */ g(ye, {
    children: e.map((c, d) =>
      /* @__PURE__ */ g(
        'tr',
        {
          children: c.map((u) => {
            const f = i.find((h) => h.id == u.id),
              p = `wx-print-cell-${n}${a(f)}${u.filter ? ' wx-print-cell-filter' : ''}${u.vertical ? ' wx-vertical' : ''}`,
              m = u.cell;
            return /* @__PURE__ */ g(
              'th',
              {
                style: Ss(yo(u, l.columnWidth)),
                className: 'wx-Gy81xq2u ' + p,
                rowSpan: u.rowspan,
                colSpan: u.colspan,
                children: m
                  ? /* @__PURE__ */ g(m, {
                      api: s,
                      cell: Object.fromEntries(
                        Object.entries(u).filter(([h]) => h !== 'cell'),
                      ),
                      column: f,
                      row: d,
                    })
                  : u.filter
                    ? /* @__PURE__ */ g('div', {
                        className: 'wx-Gy81xq2u wx-print-filter',
                        children: Da(o, i, u),
                      })
                    : /* @__PURE__ */ g('div', {
                        className: 'wx-Gy81xq2u wx-text',
                        children: u.text ?? '',
                      }),
              },
              u.id,
            );
          }),
        },
        d,
      ),
    ),
  });
}
function Oc(t) {
  const {
      columns: e,
      rowStyle: n,
      columnStyle: r,
      cellStyle: s,
      header: o,
      footer: i,
      reorder: l,
    } = t,
    a = ge(qe),
    { flatData: c, _sizes: d } = a.getState(),
    u = o && os(e, 'header', d.headerRowHeights),
    f = i && os(e, 'footer', d.footerRowHeights);
  function p(h, x) {
    let w = '';
    return (w += r ? ' ' + r(x) : ''), (w += s ? ' ' + s(h, x) : ''), w;
  }
  function m(h, x) {
    return typeof x.draggable == 'function'
      ? x.draggable(h, x) !== !1
      : x.draggable;
  }
  return /* @__PURE__ */ K('table', {
    className: `wx-8NTMLH0z wx-print-grid ${e.some((h) => h.flexgrow) ? 'wx-flex-columns' : ''}`,
    children: [
      o
        ? /* @__PURE__ */ g('thead', {
            children: /* @__PURE__ */ g(ps, {
              columns: u,
              type: 'header',
              columnStyle: r,
            }),
          })
        : null,
      /* @__PURE__ */ g('tbody', {
        children: c.map((h, x) =>
          /* @__PURE__ */ g(
            'tr',
            {
              className: 'wx-8NTMLH0z wx-row' + (n ? ' ' + n(h) : ''),
              style: { height: `${h.rowHeight || d.rowHeight}px` },
              children: e.map((w) =>
                w.collapsed
                  ? null
                  : /* @__PURE__ */ K(
                      'td',
                      {
                        className: `wx-8NTMLH0z wx-print-cell wx-cell ${p(h, w)}`,
                        style: Ss(yo(w, d.columnWidth)),
                        children: [
                          l && w.draggable
                            ? /* @__PURE__ */ g('span', {
                                className: 'wx-8NTMLH0z wx-print-draggable',
                                children: m(h, w)
                                  ? /* @__PURE__ */ g('i', {
                                      className: 'wx-8NTMLH0z wxi-drag',
                                    })
                                  : null,
                              })
                            : null,
                          w.treetoggle
                            ? /* @__PURE__ */ K(ye, {
                                children: [
                                  /* @__PURE__ */ g('span', {
                                    style: { marginLeft: h.$level * 28 + 'px' },
                                  }),
                                  h.$count
                                    ? /* @__PURE__ */ g('i', {
                                        className: `wx-8NTMLH0z wx-print-grid-tree-toggle wxi-menu-${h.open !== !1 ? 'down' : 'right'}`,
                                      })
                                    : null,
                                ],
                              })
                            : null,
                          w.cell
                            ? (() => {
                                const y = w.cell;
                                return /* @__PURE__ */ g(y, {
                                  api: a,
                                  row: h,
                                  column: w,
                                });
                              })()
                            : /* @__PURE__ */ g('span', { children: ft(h, w) }),
                        ],
                      },
                      w.id,
                    ),
              ),
            },
            x,
          ),
        ),
      }),
      i
        ? /* @__PURE__ */ g('tfoot', {
            children: /* @__PURE__ */ g(ps, {
              columns: f,
              type: 'footer',
              columnStyle: r,
            }),
          })
        : null,
    ],
  });
}
function Wc(t) {
  const { config: e, ...n } = t,
    r = ge(qe),
    { _skin: s, _columns: o } = r.getState(),
    i = _(() => _a(o, e), []),
    l = W(null);
  return (
    P(() => {
      const a = document.body;
      a.classList.add('wx-print');
      const c = l.current;
      if (!c) return;
      const d = c.cloneNode(!0);
      a.appendChild(d);
      const u = `@media print { @page { size: ${e.paper} ${e.mode}; }`,
        f = document.createElement('style');
      f.setAttribute('type', 'text/css'),
        f.setAttribute('media', 'print'),
        document.getElementsByTagName('head')[0].appendChild(f),
        f.appendChild(document.createTextNode(u)),
        window.print(),
        f.remove(),
        a.classList.remove('wx-print'),
        d.remove();
    }, []),
    /* @__PURE__ */ g('div', {
      className: `wx-4zwCKA7C wx-${s}-theme wx-print-container`,
      ref: l,
      children: i.map((a, c) =>
        /* @__PURE__ */ g(
          'div',
          {
            className: 'wx-4zwCKA7C wx-print-grid-wrapper',
            children: /* @__PURE__ */ g(Oc, { columns: a, ...n }),
          },
          c,
        ),
      ),
    })
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
      hotkeys: m,
    } = t,
    h = ge(qe),
    x = Z(h, 'dynamic'),
    w = Z(h, '_columns'),
    y = Z(h, 'flatData'),
    k = Z(h, 'split'),
    v = Z(h, '_sizes'),
    [C, S] = mn(h, 'selectedRows'),
    $ = Z(h, 'select'),
    D = Z(h, 'editor'),
    L = Z(h, 'tree'),
    N = Z(h, 'focusCell'),
    M = Z(h, '_print'),
    O = Z(h, 'undo'),
    H = Z(h, 'reorder'),
    T = Z(h, '_rowHeightFromData'),
    [V, ee] = B(0);
  P(() => {
    ee(Ot());
  }, []);
  const [le, A] = B(0),
    [j, te] = B(0),
    E = _(() => (w || []).some((I) => !I.hidden && I.flexgrow), [w]),
    J = _(() => v?.rowHeight || 0, [v]),
    re = W(null),
    [ne, fe] = B(null),
    [ve, $e] = B(null),
    G = _(() => {
      let I = [],
        q = 0;
      return (
        k &&
          k.left &&
          ((I = (w || [])
            .slice(0, k.left)
            .filter((se) => !se.hidden)
            .map((se) => ({ ...se }))),
          I.forEach((se) => {
            (se.fixed = { left: 1 }), (se.left = q), (q += se.width);
          }),
          I.length && (I[I.length - 1].fixed = { left: -1 })),
        { columns: I, width: q }
      );
    }, [k, w]),
    ie = _(() => {
      let I = [],
        q = 0;
      if (k && k.right) {
        I = (w || [])
          .slice(k.right * -1)
          .filter((se) => !se.hidden)
          .map((se) => ({ ...se }));
        for (let se = I.length - 1; se >= 0; se--) {
          const ke = I[se];
          (ke.fixed = { right: 1 }), (ke.right = q), (q += ke.width);
        }
        I.length && (I[0].fixed = { right: -1 });
      }
      return { columns: I, width: q };
    }, [k, w]),
    ae = _(() => {
      const I = (w || [])
        .slice(k?.left || 0, (w || []).length - (k?.right ?? 0))
        .filter((q) => !q.hidden);
      return (
        I.forEach((q) => {
          q.fixed = 0;
        }),
        I
      );
    }, [w, k]),
    de = _(
      () => (w || []).reduce((I, q) => (q.hidden || (I += q.width), I), 0),
      [w],
    ),
    ze = 1;
  function De(I, q, se) {
    let ke = q,
      Ee = I;
    if (ae.length) {
      let be = ae.length;
      for (let he = I; he >= 0; he--)
        ae[he][se].forEach((Re) => {
          Re.colspan > 1 && he > I - Re.colspan && he < be && (be = he);
        });
      if (be !== ae.length && be < I) {
        for (let he = be; he < I; he++) ke -= ae[he].width;
        Ee = be;
      }
    }
    return { index: Ee, delta: ke };
  }
  const _e = _(() => {
      let I, q, se;
      const ke = le,
        Ee = le + (u || 0);
      let be = 0,
        he = 0,
        Re = 0,
        Qe = 0;
      ae.forEach((mt, Nt) => {
        ke > Re && ((be = Nt), (Qe = Re)),
          (Re = Re + mt.width),
          Ee > Re && (he = Nt + ze);
      });
      const nt = { header: 0, footer: 0 };
      for (let mt = he; mt >= be; mt--)
        ['header', 'footer'].forEach((Nt) => {
          ae[mt] &&
            ae[mt][Nt].forEach((Lo) => {
              const Rn = Lo.colspan;
              if (Rn && Rn > 1) {
                const Nr = Rn - (he - mt + 1);
                Nr > 0 && (nt[Nt] = Math.max(nt[Nt], Nr));
              }
            });
        });
      const He = De(be, Qe, 'header'),
        rt = De(be, Qe, 'footer'),
        Wt = He.delta,
        nn = He.index,
        rn = rt.delta,
        En = rt.index;
      return (
        E && de > (u || 0)
          ? (I = q = se = [...G.columns, ...ae, ...ie.columns])
          : ((I = [...G.columns, ...ae.slice(be, he + 1), ...ie.columns]),
            (q = [
              ...G.columns,
              ...ae.slice(nn, he + nt.header + 1),
              ...ie.columns,
            ]),
            (se = [
              ...G.columns,
              ...ae.slice(En, he + nt.footer + 1),
              ...ie.columns,
            ])),
        {
          data: I || [],
          header: q || [],
          footer: se || [],
          d: Qe,
          df: rn,
          dh: Wt,
        }
      );
    }, [ae, G, ie, le, u, E, de]),
    Me = _(() => (e && v?.headerHeight) || 0, [e, v]),
    me = _(() => (n && v?.footerHeight) || 0, [n, v]),
    Se = _(() => (u && f ? de >= u : !1), [u, f, de]),
    Y = _(() => (f || 0) - Me - me - (Se ? V : 0), [f, Me, me, Se, V]),
    pe = _(() => Math.ceil((Y || 0) / (J || 1)) + 1, [Y, J]),
    ue = W([]),
    [oe, Ie] = B(0),
    [Ke, pt] = B(void 0),
    Ae = _(() => {
      let I = 0,
        q = 0;
      const se = 2;
      if (c) {
        let be = j;
        for (; be > 0; ) (be -= ue.current[I] || J), I++;
        q = j - be;
        for (let he = Math.max(0, I - se - 1); he < I; he++)
          q -= ue.current[I - he] || J;
        I = Math.max(0, I - se);
      } else {
        if (T) {
          let be = 0,
            he = 0;
          for (let He = 0; He < (y || []).length; He++) {
            const rt = y[He].rowHeight || J;
            if (he + rt > j) {
              be = He;
              break;
            }
            he += rt;
          }
          I = Math.max(0, be - se);
          for (let He = 0; He < I; He++) q += y[He].rowHeight || J;
          let Re = 0,
            Qe = 0;
          for (let He = be + 1; He < (y || []).length; He++) {
            const rt = y[He].rowHeight || J;
            if ((Re++, Qe + rt > Y)) break;
            Qe += rt;
          }
          const nt = Math.min(x ? x.rowCount : (y || []).length, be + Re + se);
          return { d: q, start: I, end: nt };
        }
        (I = Math.floor(j / (J || 1))),
          (I = Math.max(0, I - se)),
          (q = I * (J || 0));
      }
      const ke = x ? x.rowCount : (y || []).length,
        Ee = Math.min(ke, I + (pe || 0) + se);
      return { d: q, start: I, end: Ee };
    }, [c, T, j, J, x, y, pe, Y]),
    Fe = _(() => {
      const I = x ? x.rowCount : (y || []).length;
      if (c) return oe + Ae.d + (I - (Ke || 0)) * (J || 0);
      if (!T) return I * (J || 0);
      let q = 0;
      for (let se = 0; se < I; se++) q += y[se]?.rowHeight || J;
      return q;
    }, [x, y, J, c, T, oe, Ae.d, Ke]),
    Pe = _(
      () => (u && f ? Fe + Me + me >= f - (de >= (u || 0) ? V : 0) : !1),
      [u, f, Fe, Me, me, de, V],
    ),
    Xe = _(
      () => (E && de <= (u || 0) ? (u || 0) - 0 - (Pe ? V : 0) : de),
      [E, de, u, Pe, V, Se],
    ),
    F = _(
      () =>
        E && de <= (u || 0) ? u || 0 : Xe < (u || 0) ? de + (Pe ? V : 0) : -1,
      [E, de, u, Xe, Pe, V],
    ),
    U = W({});
  P(() => {
    if (x && (U.current.start !== Ae.start || U.current.end !== Ae.end)) {
      const { start: I, end: q } = Ae;
      (U.current = { start: I, end: q }),
        h && h.exec && h.exec('request-data', { row: { start: I, end: q } });
    }
  }, [x, Ae, h]);
  const b = _(
      () => (x ? y || [] : (y || []).slice(Ae.start, Ae.end)),
      [x, y, Ae],
    ),
    z = _(
      () => (C || []).filter((I) => (b || []).some((q) => q.id === I)),
      [S, b],
    ),
    X = _(() => Ae.start, [Ae.start]),
    Q = R((I) => {
      te(I.target.scrollTop), A(I.target.scrollLeft);
    }, []),
    ce = R((I) => {
      I.shiftKey && I.preventDefault(),
        re.current && re.current.focus && re.current.focus();
    }, []),
    xe = R(() => !!(w || []).find((I) => !!I.draggable), [w]),
    Te = W(null),
    Ne = W(null),
    Ue = W({
      dblclick: (I, q) => {
        const se = { id: I, column: Yn(q, 'data-col-id') };
        h.exec('open-editor', se);
      },
      click: (I, q) => {
        if (Te.current) return;
        const se = Yn(q, 'data-col-id');
        if (
          (N?.id !== I &&
            h.exec('focus-cell', {
              row: I,
              column: se,
              eventSource: 'click',
            }),
          $ === !1)
        )
          return;
        const ke = s && q.ctrlKey,
          Ee = s && q.shiftKey;
        (ke || C.length > 1 || !C.includes(I)) &&
          h.exec('select-row', { id: I, toggle: ke, range: Ee });
      },
      'toggle-row': (I) => {
        const q = h.getRow(I);
        h.exec(q.open !== !1 ? 'close-row' : 'open-row', { id: I });
      },
      'ignore-click': () => !1,
    }),
    et = _(
      () => ({
        top: Me,
        bottom: me,
        left: G.width,
        xScroll: Se,
        yScroll: Pe,
        sense: c && ve ? ve.offsetHeight : Math.max(v?.rowHeight || 0, 40),
        node: re.current && re.current.firstElementChild,
      }),
      [Me, me, G.width, Se, Pe, c, ve, v],
    );
  function ot(I, q) {
    const { container: se, sourceNode: ke, from: Ee } = q;
    if (xe() && !ke.getAttribute('draggable-data')) return !1;
    fe(Ee), h.getRow(Ee).open && h.exec('close-row', { id: Ee, nested: !0 });
    const be = We(ke, 'data-id'),
      he = be.cloneNode(!0);
    he.classList.remove('wx-selected'),
      he
        .querySelectorAll('[tabindex]')
        .forEach((He) => He.setAttribute('tabindex', '-1')),
      se.appendChild(he),
      $e(he);
    const Re = le - _e.d,
      Qe = Pe ? V : 0;
    se.style.width =
      Math.min((u || 0) - Qe, E && de <= (u || 0) ? Xe : Xe - Qe) + Re + 'px';
    const nt = pn(be);
    (q.offset = {
      x: Re,
      y: -Math.round(nt.height / 2),
    }),
      Ne.current || (Ne.current = I.clientY);
  }
  function en(I, q) {
    const { from: se } = q,
      ke = q.pos,
      Ee = pn(re.current);
    ke.x = Ee.x;
    const be = et.top;
    if (ke.y < be) ke.y = be;
    else {
      const he =
        Ee.height - (Se && V > 0 ? V : Math.round(et.sense / 2)) - et.bottom;
      ke.y > he && (ke.y = he);
    }
    if (re.current.contains(q.targetNode)) {
      const he = We(q.targetNode, 'data-id'),
        Re = Ht(he?.getAttribute('data-id'));
      if (Re && Re !== se) {
        q.to = Re;
        const Qe = c ? ve?.offsetHeight : v?.rowHeight;
        if (ve && (j === 0 || ke.y > be + Qe - 1)) {
          const nt = he.getBoundingClientRect(),
            He = pn(ve).y,
            rt = nt.y,
            Wt = He > rt ? -1 : 1,
            nn = Wt === 1 ? 'after' : 'before',
            rn = Math.abs(h.getRowIndex(se) - h.getRowIndex(Re)),
            En = rn !== 1 ? (nn === 'before' ? 'after' : 'before') : nn;
          if (
            rn === 1 &&
            ((Wt === -1 && I.clientY > Ne.current) ||
              (Wt === 1 && I.clientY < Ne.current))
          )
            return;
          (Ne.current = I.clientY),
            h.exec('move-item', {
              id: se,
              target: Re,
              mode: En,
              inProgress: !0,
            });
        }
      }
      o && o({ event: I, context: q });
    }
    vc(I, Ee, q, et);
  }
  function Be(I, q) {
    const { from: se, to: ke } = q;
    h.exec('move-item', {
      id: se,
      target: ke,
      inProgress: !1,
    }),
      (Te.current = setTimeout(() => {
        Te.current = 0;
      }, 1)),
      fe(null),
      $e(null),
      (Ne.current = null),
      Do(q);
  }
  function Ot() {
    const I = document.createElement('div');
    (I.style.cssText =
      'position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;min-height:100px;overflow-y:scroll;'),
      document.body.appendChild(I);
    const q = I.offsetWidth - I.clientWidth;
    return document.body.removeChild(I), q;
  }
  const _t = _(() => (F > 0 ? { width: `${F}px` } : void 0), [F]),
    gt = W(null);
  function Ao() {
    Promise.resolve().then(() => {
      let I = 0,
        q = X;
      const se = gt.current;
      se &&
        (Array.from(se.children).forEach((ke, Ee) => {
          (ue.current[X + Ee] = ke.offsetHeight), (I += ke.offsetHeight), q++;
        }),
        Ie(I),
        pt(q));
    });
  }
  P(() => {
    b && c && Ao();
  }, [b, c, X]);
  let [Ct, Mn] = B();
  P(() => {
    if (N && (!$ || !z.length || z.includes(N.row))) Mn({ ...N });
    else if (b.length && _e.data.length) {
      if (
        !Ct ||
        (z.length && !z.includes(Ct.row)) ||
        b.findIndex((I) => I.id == Ct.row) === -1 ||
        _e.data.findIndex((I) => I.id == Ct.column && !I.collapsed) === -1
      ) {
        const I = z[0] || b[0].id,
          q = _e.data.findIndex((se) => !se.collapsed);
        Mn(q !== -1 ? { row: I, column: _e.data[q].id } : null);
      }
    } else Mn(null);
  }, [N]);
  const $r = W(null);
  P(() => {
    const I = re.current;
    if (!I) return;
    const q = pc(I, d);
    return () => {
      typeof q == 'function' && q();
    };
  }, [d]);
  const _r = W({});
  Object.assign(_r.current, {
    start: ot,
    move: en,
    end: Be,
    getReorder: () => H,
    getDraggableInfo: () => ({ hasDraggable: xe() }),
  }),
    P(() => {
      const I = re.current;
      return I ? wc(I, _r).destroy : void 0;
    }, [H, re.current]),
    P(() => {
      const I = re.current;
      return I
        ? kr(I, {
            keys: m !== !1 && {
              ...qa,
              'ctrl+z': O,
              'ctrl+y': O,
              ...m,
            },
            exec: (q) => h.exec('hotkey', q),
          }).destroy
        : void 0;
    }, [h, O, m]);
  const tn = W({
    scroll: h.getReactiveState().scroll,
  });
  (tn.current.getWidth = () => (u || 0) - (Pe ? V : 0)),
    (tn.current.getHeight = () => Y),
    (tn.current.getScrollMargin = () => G.width + ie.width),
    P(() => {
      Xa($r.current, tn.current);
    }, []);
  const Cr = W(null);
  P(() => {
    const I = Cr.current;
    if (!I) return;
    const q = [];
    return (
      q.push(
        Ut(I, () => h.exec('focus-cell', { eventSource: 'click' })).destroy,
      ),
      q.push(ri(I, Ue.current)),
      () => q.forEach((se) => se())
    );
  }, []);
  const Ho = `wx-grid ${p ? `wx-responsive-${p}` : ''}`;
  return /* @__PURE__ */ K(ye, {
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-4VuBwK2D ' + Ho,
        style: {
          '--header-height': `${Me}px`,
          '--footer-height': `${me}px`,
          '--split-left-width': `${G.width}px`,
          '--split-right-width': `${ie.width}px`,
        },
        children: /* @__PURE__ */ g('div', {
          ref: re,
          className: 'wx-4VuBwK2D wx-table-box',
          style: _t,
          role: L ? 'treegrid' : 'grid',
          'aria-colcount': _e.data.length,
          'aria-rowcount': b.length,
          'aria-multiselectable': L && s ? !0 : void 0,
          tabIndex: -1,
          children: /* @__PURE__ */ K('div', {
            ref: $r,
            className: 'wx-4VuBwK2D wx-scroll',
            style: {
              overflowX: Se ? 'scroll' : 'hidden',
              overflowY: Pe ? 'scroll' : 'hidden',
            },
            onScroll: Q,
            children: [
              e
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-4VuBwK2D wx-header-wrapper',
                    children: /* @__PURE__ */ g(hs, {
                      contentWidth: Xe,
                      deltaLeft: _e.dh,
                      columns: _e.header,
                      columnStyle: l,
                      bodyHeight: Y - +n,
                    }),
                  })
                : null,
              /* @__PURE__ */ K('div', {
                ref: Cr,
                className: 'wx-4VuBwK2D wx-body',
                style: { width: `${Xe}px`, height: `${Fe}px` },
                onMouseDown: (I) => ce(I),
                children: [
                  r ? /* @__PURE__ */ g(Rc, { overlay: r }) : null,
                  /* @__PURE__ */ g('div', {
                    ref: gt,
                    className: 'wx-4VuBwK2D wx-data',
                    style: {
                      paddingTop: `${Ae.d}px`,
                      paddingLeft: `${_e.d}px`,
                    },
                    children: b.map((I, q) => {
                      const se = C.indexOf(I.id) !== -1,
                        ke = ne === I.id,
                        Ee =
                          'wx-row' +
                          (c ? ' wx-autoheight' : '') +
                          (i ? ' ' + i(I) : '') +
                          (se ? ' wx-selected' : '') +
                          (ke ? ' wx-inactive' : ''),
                        be = c
                          ? { minHeight: `${I.rowHeight || J}px` }
                          : { height: `${I.rowHeight || J}px` };
                      return /* @__PURE__ */ g(
                        'div',
                        {
                          className: 'wx-4VuBwK2D ' + Ee,
                          'data-id': I.id,
                          'data-context-id': I.id,
                          style: be,
                          role: 'row',
                          'aria-rowindex': q,
                          'aria-expanded': I.open,
                          'aria-level': L ? I.$level + 1 : void 0,
                          'aria-selected': L ? se : void 0,
                          tabIndex: -1,
                          children: _e.data.map((he) =>
                            he.collapsed
                              ? /* @__PURE__ */ g(
                                  'div',
                                  {
                                    className:
                                      'wx-4VuBwK2D wx-cell wx-collapsed',
                                  },
                                  he.id,
                                )
                              : D?.id === I.id && D.column == he.id
                                ? /* @__PURE__ */ g(
                                    Fc,
                                    { row: I, column: he },
                                    he.id,
                                  )
                                : /* @__PURE__ */ g(
                                    _c,
                                    {
                                      row: I,
                                      column: he,
                                      columnStyle: l,
                                      cellStyle: a,
                                      reorder: H,
                                      focusable:
                                        Ct?.row === I.id && Ct?.column == he.id,
                                    },
                                    he.id,
                                  ),
                          ),
                        },
                        I.id,
                      );
                    }),
                  }),
                ],
              }),
              n && (y || []).length
                ? /* @__PURE__ */ g(hs, {
                    type: 'footer',
                    contentWidth: Xe,
                    deltaLeft: _e.df,
                    columns: _e.footer,
                    columnStyle: l,
                  })
                : null,
            ],
          }),
        }),
      }),
      M
        ? /* @__PURE__ */ g(Wc, {
            config: M,
            rowStyle: i,
            columnStyle: l,
            cellStyle: a,
            header: e,
            footer: n,
            reorder: H,
          })
        : null,
    ],
  });
}
const Vc = (t) =>
    t
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  Gc = bt(function (
    {
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
      sortMarks: C,
      undo: S = !1,
      hotkeys: $ = null,
      ...D
    },
    L,
  ) {
    const N = W();
    N.current = D;
    const M = _(() => new Ga($s), []),
      O = _(() => M.in, [M]),
      H = W(null);
    H.current === null &&
      ((H.current = new Es((G, ie) => {
        const ae = 'on' + Vc(G);
        N.current && N.current[ae] && N.current[ae](ie);
      })),
      O.setNext(H.current));
    const T = _(
        () => ({
          getState: M.getState.bind(M),
          getReactiveState: M.getReactive.bind(M),
          getStores: () => ({ data: M }),
          exec: O.exec,
          setNext: (G) => ((H.current = H.current.setNext(G)), H.current),
          intercept: O.intercept.bind(O),
          on: O.on.bind(O),
          detach: O.detach.bind(O),
          getRow: M.getRow.bind(M),
          getRowIndex: M.getRowIndex.bind(M),
          getColumn: M.getColumn.bind(M),
        }),
        [M, O],
      ),
      [V, ee] = B(0),
      [le, A] = B(0),
      [j, te] = B(null),
      [E, J] = B(null),
      re = _(() => {
        if (y && !e.length && t.length) {
          const G = t[0],
            ie = [];
          for (let ae in G)
            if (ae !== 'id' && ae[0] !== '$') {
              let de = {
                id: ae,
                header: ae[0].toUpperCase() + ae.slice(1),
              };
              typeof y == 'object' && (de = { ...de, ...y }), ie.push(de);
            }
          return ie;
        }
        return (E && E.columns) ?? e;
      }, [y, e, t, E]),
      ne = _(() => (E && E.sizes) ?? h, [E, h]),
      fe = R(
        (G) => {
          if ((ee(G.width), A(G.height), v)) {
            const ie =
              Object.keys(v)
                .map(Number)
                .sort((ae, de) => ae - de)
                .find((ae) => G.width <= ae) ?? null;
            ie !== j && (J(v[ie]), te(ie));
          }
        },
        [v, j],
      ),
      ve = ge(Ye.theme),
      $e = W(0);
    return (
      P(() => {
        if (!$e.current) k && k(T);
        else {
          const G = M.getState();
          M.init({
            data: t,
            columns: re,
            split: x || G.split,
            sizes: ne || G.sizes,
            selectedRows: o || G.selectedRows,
            dynamic: d,
            tree: w,
            sortMarks: C || G.sortMarks,
            undo: S,
            reorder: f,
            _skin: ve,
            _select: i,
          });
        }
        $e.current++;
      }, [M, t, re, x, ne, o, d, w, C, S, f, ve, i, k, T]),
      $e.current === 0 &&
        M.init({
          data: t,
          columns: re,
          split: x || { left: 0 },
          sizes: ne || {},
          selectedRows: o || [],
          dynamic: d,
          tree: w,
          sortMarks: C || {},
          undo: S,
          reorder: f,
          _skin: ve,
          select: i,
        }),
      St(
        L,
        () => ({
          ...T,
        }),
        [T],
      ),
      /* @__PURE__ */ g(qe.Provider, {
        value: T,
        children: /* @__PURE__ */ g(_n, {
          words: Ja,
          optional: !0,
          children: /* @__PURE__ */ g(Pc, {
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
            responsiveLevel: j,
            resize: fe,
            hotkeys: $,
          }),
        }),
      })
    );
  });
function jc({ item: t }) {
  return /* @__PURE__ */ K('div', {
    tabIndex: -1,
    role: 'menuitem',
    'aria-label': t.hidden ? `Show ${t.text} column` : `Hide ${t.text} column`,
    children: [
      /* @__PURE__ */ g('div', {
        className: 'wx-v13lZxja wx-icon' + (t.hidden ? ' wx-hidden' : ''),
        children: /* @__PURE__ */ g('i', { className: 'wx-v13lZxja wxi-eye' }),
      }),
      /* @__PURE__ */ g('span', { children: t.text }),
    ],
  });
}
function Yc({ columns: t = null, api: e, children: n }) {
  P(() => {
    rc('table-header', jc);
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
    c && e.exec('hide-column', { id: c.id, mode: !c.hidden });
  }
  function o(a) {
    return a;
  }
  const i = it(e, '_columns'),
    l = _(() => {
      if (e) {
        const a = Array.isArray(i) ? i : [];
        return (t ? a.filter((c) => t[c.id]) : a).map((c) => {
          const d = r(c);
          return {
            id: c.id,
            text: d,
            type: 'table-header',
            hidden: c.hidden,
          };
        });
      } else return [];
    }, [e, t, i]);
  return /* @__PURE__ */ g(_o, {
    dataKey: 'headerId',
    options: l,
    onClick: s,
    at: 'point',
    resolver: o,
    children: typeof n == 'function' ? n() : n,
  });
}
ir(je);
function Bc({ row: t, column: e }) {
  function n(s, o) {
    return {
      justifyContent: o.align,
      paddingLeft: `${(s.$level - 1) * 20}px`,
    };
  }
  const r = e && e._cell;
  return /* @__PURE__ */ K('div', {
    className: 'wx-pqc08MHU wx-content',
    style: n(t, e),
    children: [
      t.data || t.lazy
        ? /* @__PURE__ */ g('i', {
            className: `wx-pqc08MHU wx-toggle-icon wxi-menu-${t.open ? 'down' : 'right'}`,
            'data-action': 'open-task',
          })
        : /* @__PURE__ */ g('i', {
            className: 'wx-pqc08MHU wx-toggle-placeholder',
          }),
      /* @__PURE__ */ g('div', {
        className: 'wx-pqc08MHU wx-text',
        children: r ? /* @__PURE__ */ g(r, { row: t, column: e }) : t.text,
      }),
    ],
  });
}
function gs({ column: t, cell: e }) {
  const n = _(() => t.id, [t?.id]);
  return e || t.id == 'add-task'
    ? /* @__PURE__ */ g('div', {
        style: { textAlign: t.align },
        children: /* @__PURE__ */ g('i', {
          className: 'wx-9DAESAHW wx-action-icon wxi-plus',
          'data-action': n,
        }),
      })
    : null;
}
function Kc(t) {
  const {
      readonly: e,
      compactMode: n,
      width: r = 0,
      display: s = 'all',
      columnWidth: o = 0,
      onTableAPIChange: i,
      multiTaskRows: l = !1,
      rowMapping: a = null,
    } = t,
    [c, d] = Ce(o),
    [u, f] = B(),
    p = ge(Ye.i18n),
    m = _(() => p.getGroup('gantt'), [p]),
    h = ge(ht),
    x = Z(h, 'scrollTop'),
    w = Z(h, 'cellHeight'),
    y = Z(h, '_scrollTask'),
    k = Z(h, '_selected'),
    v = Z(h, 'area'),
    C = Z(h, '_tasks'),
    S = Z(h, '_scales'),
    $ = Z(h, 'columns'),
    D = Z(h, '_sort'),
    L = Z(h, 'calendar'),
    N = Z(h, 'durationUnit'),
    M = Z(h, 'splitTasks'),
    [O, H] = B(null),
    T = _(() => (!C || !v ? [] : C.slice(v.start, v.end)), [C, v]),
    V = R(
      (F, U) => {
        if (U === 'add-task')
          h.exec(U, {
            target: F,
            task: { text: m('New Task') },
            mode: 'child',
            show: !0,
          });
        else if (U === 'open-task') {
          const b = T.find((z) => z.id === F);
          (b?.data || b?.lazy) && h.exec(U, { id: F, mode: !b.open });
        }
      },
      [T],
    ),
    ee = R(
      (F) => {
        const U = xt(F),
          b = F.target.dataset.action;
        b && F.preventDefault(),
          U
            ? b === 'add-task' || b === 'open-task'
              ? V(U, b)
              : h.exec('select-task', {
                  id: U,
                  toggle: F.ctrlKey || F.metaKey,
                  range: F.shiftKey,
                  show: !0,
                })
            : b === 'add-task' && V(null, b);
      },
      [h, V],
    ),
    le = W(null),
    A = W(null),
    [j, te] = B(0),
    [E, J] = B(!1);
  P(() => {
    const F = A.current;
    if (!F || typeof ResizeObserver > 'u') return;
    const U = () => te(F.clientWidth);
    U();
    const b = new ResizeObserver(U);
    return b.observe(F), () => b.disconnect();
  }, []);
  const re = W(null),
    ne = R(
      (F) => {
        const U = F.id,
          { before: b, after: z } = F,
          X = F.onMove;
        let Q = b || z,
          ce = b ? 'before' : 'after';
        if (X) {
          if (ce === 'after') {
            const xe = h.getTask(Q);
            xe.data?.length &&
              xe.open &&
              ((ce = 'before'), (Q = xe.data[0].id));
          }
          re.current = { id: U, [ce]: Q };
        } else re.current = null;
        h.exec('move-task', {
          id: U,
          mode: ce,
          target: Q,
          inProgress: X,
        });
      },
      [h],
    ),
    fe = _(() => v?.from ?? 0, [v]),
    ve = _(() => S?.height ?? 0, [S]),
    $e = _(
      () => (!n && s !== 'grid' ? (c ?? 0) > (r ?? 0) : (c ?? 0) > (j ?? 0)),
      [n, s, c, r, j],
    ),
    G = _(() => {
      const F = {};
      return (
        ($e && s === 'all') || (s === 'grid' && $e)
          ? (F.width = c)
          : s === 'grid' && (F.width = '100%'),
        F
      );
    }, [$e, s, c]),
    ie = _(() => (O && !T.find((F) => F.id === O.id) ? [...T, O] : T), [T, O]),
    ae = _(() => {
      if (!l || !a) return ie;
      const F = /* @__PURE__ */ new Map(),
        U = /* @__PURE__ */ new Set();
      return (
        ie.forEach((b) => {
          const z = a.taskRows.get(b.id) ?? b.id;
          U.has(z) ||
            (F.set(z, {
              ...b,
              $rowTasks: a.rowMap.get(z) || [b.id],
            }),
            U.add(z));
        }),
        Array.from(F.values())
      );
    }, [ie, l, a]),
    de = _(() => {
      let F = ($ || []).map((z) => {
        z = { ...z };
        const X = z.header;
        if (typeof X == 'object') {
          const Q = X.text && m(X.text);
          z.header = { ...X, text: Q };
        } else z.header = m(X);
        return z;
      });
      const U = F.findIndex((z) => z.id === 'text'),
        b = F.findIndex((z) => z.id === 'add-task');
      if (
        (U !== -1 && (F[U].cell && (F[U]._cell = F[U].cell), (F[U].cell = Bc)),
        b !== -1)
      ) {
        F[b].cell = F[b].cell || gs;
        const z = F[b].header;
        if (
          (typeof z != 'object' && (F[b].header = { text: z }),
          (F[b].header.cell = z.cell || gs),
          e)
        )
          F.splice(b, 1);
        else if (n) {
          const [X] = F.splice(b, 1);
          F.unshift(X);
        }
      }
      return F.length > 0 && (F[F.length - 1].resize = !1), F;
    }, [$, m, e, n]),
    ze = _(
      () =>
        s === 'all'
          ? `${r}px`
          : s === 'grid'
            ? 'calc(100% - 4px)'
            : de.find((F) => F.id === 'add-task')
              ? '50px'
              : '0',
      [s, r, de],
    ),
    De = _(() => {
      if (ae && D?.length) {
        const F = {};
        return (
          D.forEach(({ key: U, order: b }, z) => {
            F[U] = {
              order: b,
              ...(D.length > 1 && { index: z }),
            };
          }),
          F
        );
      }
      return {};
    }, [ae, D]),
    _e = R(() => de.some((F) => F.flexgrow && !F.hidden), []),
    Me = _(() => _e(), [_e, E]),
    me = _(() => {
      let F = s === 'chart' ? de.filter((b) => b.id === 'add-task') : de;
      const U = s === 'all' ? r : j;
      if (!Me) {
        let b = c,
          z = !1;
        if (de.some((X) => X.$width)) {
          let X = 0;
          (b = de.reduce(
            (Q, ce) => (
              ce.hidden || ((X += ce.width), (Q += ce.$width || ce.width)), Q
            ),
            0,
          )),
            X > b && b > U && (z = !0);
        }
        if (z || b < U) {
          let X = 1;
          return (
            z || (X = (U - 50) / (b - 50 || 1)),
            F.map(
              (Q) => (
                Q.id !== 'add-task' &&
                  !Q.hidden &&
                  (Q.$width || (Q.$width = Q.width), (Q.width = Q.$width * X)),
                Q
              ),
            )
          );
        }
      }
      return F;
    }, [s, de, Me, c, r, j]),
    Se = R(
      (F) => {
        if (!_e()) {
          const U = me.reduce(
            (b, z) => (
              F && z.$width && (z.$width = z.width),
              b + (z.hidden ? 0 : z.width)
            ),
            0,
          );
          U !== c && d(U);
        }
        J(!0), J(!1);
      },
      [_e, me, c, d],
    ),
    Y = R(() => {
      de.filter((U) => U.flexgrow && !U.hidden).length === 1 &&
        de.forEach((U) => {
          U.$width && !U.flexgrow && !U.hidden && (U.width = U.$width);
        });
    }, []),
    pe = R(
      (F) => {
        if (!e) {
          const U = xt(F),
            b = Yn(F, 'data-col-id');
          !(b && de.find((X) => X.id == b))?.editor &&
            U &&
            h.exec('show-editor', { id: U });
        }
      },
      [h, e],
      // cols is defined later; relies on latest value at call time
    ),
    ue = _(() => (Array.isArray(k) ? k.map((F) => F.id) : []), [k]),
    oe = R(() => {
      if (le.current && ae !== null) {
        const F = le.current.querySelector('.wx-body');
        F && (F.style.top = -((x ?? 0) - (fe ?? 0)) + 'px');
      }
      A.current && (A.current.scrollTop = 0);
    }, [ae, x, fe]);
  P(() => {
    le.current && oe();
  }, [x, fe, oe]),
    P(() => {
      const F = le.current;
      if (!F) return;
      const U = F.querySelector('.wx-table-box .wx-body');
      if (!U || typeof ResizeObserver > 'u') return;
      const b = new ResizeObserver(() => {
        oe();
      });
      return (
        b.observe(U),
        () => {
          b.disconnect();
        }
      );
    }, [me, G, s, ze, ae, oe]),
    P(() => {
      if (!y || !u) return;
      const { id: F } = y,
        U = u.getState().focusCell;
      U &&
        U.row !== F &&
        le.current &&
        le.current.contains(document.activeElement) &&
        u.exec('focus-cell', {
          row: F,
          column: U.column,
        });
    }, [y, u]);
  const Ie = R(
      ({ id: F }) => {
        if (e) return !1;
        h.getTask(F).open && h.exec('open-task', { id: F, mode: !1 });
        const U = h.getState()._tasks.find((b) => b.id === F);
        if ((H(U || null), !U)) return !1;
      },
      [h, e],
    ),
    Ke = R(
      ({ id: F, top: U }) => {
        re.current
          ? ne({ ...re.current, onMove: !1 })
          : h.exec('drag-task', {
              id: F,
              top: U + (fe ?? 0),
              inProgress: !1,
            }),
          H(null);
      },
      [h, ne, fe],
    ),
    pt = R(
      ({ id: F, top: U, detail: b }) => {
        b && ne({ ...b, onMove: !0 }),
          h.exec('drag-task', {
            id: F,
            top: U + (fe ?? 0),
            inProgress: !0,
          });
      },
      [h, ne, fe],
    );
  P(() => {
    const F = le.current;
    return F
      ? Za(F, {
          start: Ie,
          end: Ke,
          move: pt,
          getTask: h.getTask,
        }).destroy
      : void 0;
  }, [h, Ie, Ke, pt]);
  const Ae = R(
      (F) => {
        const { key: U, isInput: b } = F;
        if (!b && (U === 'arrowup' || U === 'arrowdown'))
          return (F.eventSource = 'grid'), h.exec('hotkey', F), !1;
        if (U === 'enter') {
          const z = u?.getState().focusCell;
          if (z) {
            const { row: X, column: Q } = z;
            Q === 'add-task'
              ? V(X, 'add-task')
              : Q === 'text' && V(X, 'open-task');
          }
        }
      },
      [h, V, u],
    ),
    Fe = W(null),
    Pe = () => {
      Fe.current = {
        setTableAPI: f,
        handleHotkey: Ae,
        sortVal: D,
        api: h,
        adjustColumns: Y,
        setColumnWidth: Se,
        tasks: T,
        calendarVal: L,
        durationUnitVal: N,
        splitTasksVal: M,
        onTableAPIChange: i,
      };
    };
  Pe(),
    P(() => {
      Pe();
    }, [f, Ae, D, h, Y, Se, T, L, N, M, i]);
  const Xe = R((F) => {
    f(F),
      F.intercept('hotkey', (U) => Fe.current.handleHotkey(U)),
      F.intercept('scroll', () => !1),
      F.intercept('select-row', () => !1),
      F.intercept('sort-rows', (U) => {
        const b = Fe.current.sortVal,
          { key: z, add: X } = U,
          Q = b ? b.find((xe) => xe.key === z) : null;
        let ce = 'asc';
        return (
          Q && (ce = !Q || Q.order === 'asc' ? 'desc' : 'asc'),
          h.exec('sort-tasks', {
            key: z,
            order: ce,
            add: X,
          }),
          !1
        );
      }),
      F.on('resize-column', () => {
        Fe.current.setColumnWidth(!0);
      }),
      F.on('hide-column', (U) => {
        U.mode || Fe.current.adjustColumns(), Fe.current.setColumnWidth();
      }),
      F.intercept('update-cell', (U) => {
        const { id: b, column: z, value: X } = U,
          Q = Fe.current.tasks.find((ce) => ce.id === b);
        if (Q) {
          const ce = { ...Q };
          let xe = X;
          xe && !isNaN(xe) && !(xe instanceof Date) && (xe *= 1),
            (ce[z] = xe),
            co(
              ce,
              {
                calendar: Fe.current.calendarVal,
                durationUnit: Fe.current.durationUnitVal,
                splitTasks: Fe.current.splitTasksVal,
              },
              z,
            ),
            h.exec('update-task', {
              id: b,
              task: ce,
            });
        }
        return !1;
      }),
      i && i(F);
  }, []);
  return /* @__PURE__ */ g('div', {
    className: 'wx-rHj6070p wx-table-container',
    style: { flex: `0 0 ${ze}` },
    ref: A,
    children: /* @__PURE__ */ g('div', {
      ref: le,
      style: G,
      className: 'wx-rHj6070p wx-table',
      onClick: ee,
      onDoubleClick: pe,
      children: /* @__PURE__ */ g(Gc, {
        init: Xe,
        sizes: {
          rowHeight: w,
          headerHeight: (ve ?? 0) - 1,
        },
        rowStyle: (F) =>
          F.$reorder ? 'wx-rHj6070p wx-reorder-task' : 'wx-rHj6070p',
        columnStyle: (F) =>
          `wx-rHj6070p wx-text-${F.align}${F.id === 'add-task' ? ' wx-action' : ''}`,
        data: ae,
        columns: me,
        selectedRows: [...ue],
        sortMarks: De,
      }),
    }),
  });
}
function Uc({ borders: t = '' }) {
  const e = ge(ht),
    n = Z(e, 'cellWidth'),
    r = Z(e, 'cellHeight'),
    s = W(null),
    [o, i] = B('#e4e4e4');
  P(() => {
    if (typeof getComputedStyle < 'u' && s.current) {
      const a = getComputedStyle(s.current).getPropertyValue(
        '--wx-gantt-border',
      );
      i(a ? a.substring(a.indexOf('#')) : '#1d1e261a');
    }
  }, []);
  const l = {
    width: '100%',
    height: '100%',
    background: n != null && r != null ? `url(${na(n, r, o, t)})` : void 0,
    position: 'absolute',
  };
  return /* @__PURE__ */ g('div', { ref: s, style: l });
}
function qc({ onSelectLink: t, selectedLink: e, readonly: n }) {
  const r = ge(ht),
    s = Z(r, '_links'),
    o = Z(r, 'criticalPath'),
    i = W(null),
    l = R(
      (a) => {
        const c = a?.target?.classList;
        !c?.contains('wx-line') && !c?.contains('wx-delete-button') && t(null);
      },
      [t],
    );
  return (
    P(() => {
      if (!n && e && i.current) {
        const a = (c) => {
          i.current && !i.current.contains(c.target) && l(c);
        };
        return (
          document.addEventListener('click', a),
          () => {
            document.removeEventListener('click', a);
          }
        );
      }
    }, [n, e, l]),
    /* @__PURE__ */ K('svg', {
      className: 'wx-dkx3NwEn wx-links',
      children: [
        (s || []).map((a) => {
          const c =
            'wx-dkx3NwEn wx-line' +
            (o && a.$critical ? ' wx-critical' : '') +
            (n ? '' : ' wx-line-selectable');
          return /* @__PURE__ */ g(
            'polyline',
            {
              className: c,
              points: a.$p,
              onClick: () => !n && t(a.id),
              'data-link-id': a.id,
            },
            a.id,
          );
        }),
        !n &&
          e &&
          /* @__PURE__ */ g('polyline', {
            ref: i,
            className:
              'wx-dkx3NwEn wx-line wx-line-selected wx-line-selectable wx-delete-link',
            points: e.$p,
          }),
      ],
    })
  );
}
function Xc(t) {
  const { task: e, type: n } = t;
  function r(o) {
    const i = e.segments[o];
    return {
      left: `${i.$x}px`,
      top: '0px',
      width: `${i.$w}px`,
      height: '100%',
    };
  }
  function s(o) {
    if (!e.progress) return 0;
    const i = (e.duration * e.progress) / 100,
      l = e.segments;
    let a = 0,
      c = 0,
      d = null;
    do {
      const u = l[c];
      c === o &&
        (a > i ? (d = 0) : (d = Math.min((i - a) / u.duration, 1) * 100)),
        (a += u.duration),
        c++;
    } while (d === null && c < l.length);
    return d || 0;
  }
  return /* @__PURE__ */ g('div', {
    className: 'wx-segments wx-GKbcLEGA',
    children: e.segments.map((o, i) =>
      /* @__PURE__ */ K(
        'div',
        {
          className: `wx-segment wx-bar wx-${n} wx-GKbcLEGA`,
          'data-segment': i,
          style: r(i),
          children: [
            e.progress
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-progress-wrapper',
                  children: /* @__PURE__ */ g('div', {
                    className: 'wx-progress-percent wx-GKbcLEGA',
                    style: { width: `${s(i)}%` },
                  }),
                })
              : null,
            /* @__PURE__ */ g('div', {
              className: 'wx-content',
              children: o.text || '',
            }),
          ],
        },
        i,
      ),
    ),
  });
}
function Qc(t) {
  const {
      readonly: e,
      taskTemplate: n,
      multiTaskRows: r = !1,
      rowMapping: s = null,
    } = t,
    o = ge(ht),
    [i, l] = mn(o, '_tasks'),
    [a, c] = mn(o, '_links'),
    d = Z(o, 'area'),
    u = Z(o, '_scales'),
    f = Z(o, 'taskTypes'),
    p = Z(o, 'baselines'),
    m = Z(o, '_selected'),
    h = Z(o, '_scrollTask'),
    x = Z(o, 'criticalPath'),
    w = Z(o, 'tasks'),
    y = Z(o, 'schedule'),
    k = Z(o, 'splitTasks'),
    v = _(() => {
      if (!d || !Array.isArray(i)) return [];
      const b = d.start ?? 0,
        z = d.end ?? 0;
      return i.slice(b, z).map((X) => ({ ...X }));
    }, [l, d]),
    C = Z(o, 'cellHeight'),
    S = _(() => {
      if (!r || !s || !v.length) return v;
      const b = /* @__PURE__ */ new Map(),
        z = [];
      return (
        i.forEach((X) => {
          const Q = s.taskRows.get(X.id) ?? X.id;
          b.has(Q) || (b.set(Q, z.length), z.push(Q));
        }),
        v.map((X) => {
          const Q = s.taskRows.get(X.id) ?? X.id,
            ce = b.get(Q) ?? 0;
          return {
            ...X,
            $y: ce * C,
            $y_base: X.$y_base !== void 0 ? ce * C : void 0,
          };
        })
      );
    }, [v, r, s, i, C]),
    $ = _(() => u.lengthUnitWidth, [u]),
    D = W(!1),
    [L, N] = B(void 0),
    [M, O] = B(null),
    H = W(null),
    [T, V] = B(null),
    [ee, le] = B(void 0),
    A = W(null),
    [j, te] = B(0),
    E = W(null),
    J = _(() => {
      const b = E.current;
      return !!(m.length && b && b.contains(document.activeElement));
    }, [m, E.current]),
    re = _(() => J && m[m.length - 1]?.id, [J, m]);
  P(() => {
    if (h && J && h) {
      const { id: b } = h,
        z = E.current?.querySelector(`.wx-bar[data-id='${b}']`);
      z && z.focus({ preventScroll: !0 });
    }
  }, [h]),
    P(() => {
      const b = E.current;
      if (b && (te(b.offsetWidth || 0), typeof ResizeObserver < 'u')) {
        const z = new ResizeObserver((X) => {
          X[0] && te(X[0].contentRect.width);
        });
        return z.observe(b), () => z.disconnect();
      }
    }, [E.current]);
  const ne = R(() => {
      document.body.style.userSelect = 'none';
    }, []),
    fe = R(() => {
      document.body.style.userSelect = '';
    }, []),
    ve = R(
      (b, z, X) => {
        if (
          z.target.classList.contains('wx-line') ||
          (X || (X = o.getTask(Rt(b))),
          X.type === 'milestone' || X.type === 'summary')
        )
          return '';
        const Q = We(z, 'data-segment');
        Q && (b = Q);
        const { left: ce, width: xe } = b.getBoundingClientRect(),
          Te = (z.clientX - ce) / xe;
        let Ne = 0.2 / (xe > 200 ? xe / 200 : 1);
        return Te < Ne ? 'start' : Te > 1 - Ne ? 'end' : '';
      },
      [o],
    ),
    $e = R(
      (b, z) => {
        const { clientX: X } = z,
          Q = Rt(b),
          ce = o.getTask(Q),
          xe = z.target.classList;
        if (!z.target.closest('.wx-delete-button') && !e) {
          if (xe.contains('wx-progress-marker')) {
            const { progress: Te } = o.getTask(Q);
            (H.current = {
              id: Q,
              x: X,
              progress: Te,
              dx: 0,
              node: b,
              marker: z.target,
            }),
              z.target.classList.add('wx-progress-in-drag');
          } else {
            const Te = ve(b, z, ce) || 'move',
              Ne = {
                id: Q,
                mode: Te,
                x: X,
                dx: 0,
                l: ce.$x,
                w: ce.$w,
              };
            if (k && ce.segments?.length) {
              const Ue = We(z, 'data-segment');
              Ue && (Ne.segmentIndex = Ue.dataset.segment * 1);
            }
            O(Ne);
          }
          ne();
        }
      },
      [o, e, ve, ne, k],
    ),
    G = R(
      (b) => {
        if (b.button !== 0) return;
        const z = We(b);
        z && $e(z, b);
      },
      [$e],
    ),
    ie = R(
      (b) => {
        const z = We(b);
        z &&
          (A.current = setTimeout(() => {
            le(!0), $e(z, b.touches[0]);
          }, 300));
      },
      [$e],
    ),
    ae = R(
      (b) => {
        V(b && { ...a.find((z) => z.id === b) });
      },
      [a],
    ),
    de = R(() => {
      if (H.current) {
        const { dx: b, id: z, marker: X, value: Q } = H.current;
        (H.current = null),
          typeof Q < 'u' &&
            b &&
            o.exec('update-task', {
              id: z,
              task: { progress: Q },
              inProgress: !1,
            }),
          X.classList.remove('wx-progress-in-drag'),
          (D.current = !0),
          fe();
      } else if (M) {
        const {
          id: b,
          mode: z,
          dx: X,
          l: Q,
          w: ce,
          start: xe,
          segment: Te,
          index: Ne,
        } = M;
        if ((O(null), xe)) {
          const Ue = Math.round(X / $);
          if (!Ue)
            o.exec('drag-task', {
              id: b,
              width: ce,
              left: Q,
              inProgress: !1,
              ...(Te && { segmentIndex: Ne }),
            });
          else {
            let et = {},
              ot = o.getTask(b);
            Te && (ot = ot.segments[Ne]),
              z === 'move'
                ? ((et.start = ot.start), (et.end = ot.end))
                : (et[z] = ot[z]),
              o.exec('update-task', {
                id: b,
                diff: Ue,
                task: et,
                ...(Te && { segmentIndex: Ne }),
              });
          }
          D.current = !0;
        }
        fe();
      }
    }, [o, fe, M, $]),
    ze = R(
      (b, z) => {
        const { clientX: X } = z;
        if (!e)
          if (H.current) {
            const { node: Q, x: ce, id: xe } = H.current,
              Te = (H.current.dx = X - ce),
              Ne = Math.round((Te / Q.offsetWidth) * 100);
            let Ue = H.current.progress + Ne;
            (H.current.value = Ue = Math.min(Math.max(0, Ue), 100)),
              o.exec('update-task', {
                id: xe,
                task: { progress: Ue },
                inProgress: !0,
              });
          } else if (M) {
            ae(null);
            const {
                mode: Q,
                l: ce,
                w: xe,
                x: Te,
                id: Ne,
                start: Ue,
                segment: et,
                index: ot,
              } = M,
              en = o.getTask(Ne),
              Be = X - Te;
            if (
              (!Ue && Math.abs(Be) < 20) ||
              (Q === 'start' && xe - Be < $) ||
              (Q === 'end' && xe + Be < $) ||
              (Q === 'move' &&
                ((Be < 0 && ce + Be < 0) || (Be > 0 && ce + xe + Be > j))) ||
              M.segment
            )
              return;
            const Ot = { ...M, dx: Be };
            let _t, gt;
            if (
              (Q === 'start'
                ? ((_t = ce + Be), (gt = xe - Be))
                : Q === 'end'
                  ? ((_t = ce), (gt = xe + Be))
                  : Q === 'move' && ((_t = ce + Be), (gt = xe)),
              o.exec('drag-task', {
                id: Ne,
                width: gt,
                left: _t,
                inProgress: !0,
                ...(et && { segmentIndex: ot }),
              }),
              !Ot.start &&
                ((Q === 'move' && en.$x == ce) ||
                  (Q !== 'move' && en.$w == xe)))
            ) {
              (D.current = !0), de();
              return;
            }
            (Ot.start = !0), O(Ot);
          } else {
            const Q = We(b);
            if (Q) {
              const ce = o.getTask(Rt(Q)),
                Te = We(b, 'data-segment') || Q,
                Ne = ve(Te, z, ce);
              Te.style.cursor = Ne && !e ? 'col-resize' : 'pointer';
            }
          }
      },
      [o, e, M, $, j, ve, ae, de],
    ),
    De = R(
      (b) => {
        ze(b, b);
      },
      [ze],
    ),
    _e = R(
      (b) => {
        ee
          ? (b.preventDefault(), ze(b, b.touches[0]))
          : A.current && (clearTimeout(A.current), (A.current = null));
      },
      [ee, ze],
    ),
    Me = R(() => {
      de();
    }, [de]),
    me = R(() => {
      le(null),
        A.current && (clearTimeout(A.current), (A.current = null)),
        de();
    }, [de]);
  P(
    () => (
      window.addEventListener('mouseup', Me),
      () => {
        window.removeEventListener('mouseup', Me);
      }
    ),
    [Me],
  );
  const Se = R(
      (b) => {
        if (!e) {
          const z = xt(b.target);
          if (z && !b.target.classList.contains('wx-link')) {
            const X = xt(b.target, 'data-segment');
            o.exec('show-editor', {
              id: z,
              ...(X !== null && { segmentIndex: X }),
            });
          }
        }
      },
      [o, e],
    ),
    Y = ['e2s', 's2s', 'e2e', 's2e'],
    pe = R((b, z) => Y[(b ? 1 : 0) + (z ? 0 : 2)], []),
    ue = R(
      (b, z) => {
        const X = L.id,
          Q = L.start;
        return b === X
          ? !0
          : !!a.find(
              (ce) => ce.target == b && ce.source == X && ce.type === pe(Q, z),
            );
      },
      [L, c, pe],
    ),
    oe = R(() => {
      L && N(null);
    }, [L]),
    Ie = R(
      (b) => {
        if (D.current) {
          D.current = !1;
          return;
        }
        const z = xt(b.target);
        if (z) {
          const X = b.target.classList;
          if (X.contains('wx-link')) {
            const Q = X.contains('wx-left');
            if (!L) {
              N({ id: z, start: Q });
              return;
            }
            L.id !== z &&
              !ue(z, Q) &&
              o.exec('add-link', {
                link: {
                  source: L.id,
                  target: z,
                  type: pe(L.start, Q),
                },
              });
          } else if (X.contains('wx-delete-button-icon'))
            o.exec('delete-link', { id: T.id }), V(null);
          else {
            let Q;
            const ce = We(b, 'data-segment');
            ce && (Q = ce.dataset.segment * 1),
              o.exec('select-task', {
                id: z,
                toggle: b.ctrlKey || b.metaKey,
                range: b.shiftKey,
                segmentIndex: Q,
              });
          }
        }
        oe();
      },
      [o, L, c, T, ue, pe, oe],
    ),
    Ke = R(
      (b) => ({
        left: `${b.$x}px`,
        top: `${b.$y}px`,
        width: `${b.$w}px`,
        height: `${b.$h}px`,
      }),
      [],
    ),
    pt = R(
      (b) => ({
        left: `${b.$x_base}px`,
        top: `${b.$y_base}px`,
        width: `${b.$w_base}px`,
        height: `${b.$h_base}px`,
      }),
      [],
    ),
    Ae = R(
      (b) => {
        if (ee || A.current) return b.preventDefault(), !1;
      },
      [ee],
    ),
    Fe = _(() => f.map((b) => b.id), [f]),
    Pe = R(
      (b) => {
        let z = Fe.includes(b) ? b : 'task';
        return (
          ['task', 'milestone', 'summary'].includes(b) || (z = `task ${z}`), z
        );
      },
      [Fe],
    ),
    Xe = R(
      (b) => {
        o.exec(b.action, b.data);
      },
      [o],
    ),
    F = R((b) => x && w.byId(b).$critical, [x, w]),
    U = R(
      (b) => {
        if (y?.auto) {
          const z = w.getSummaryId(b, !0),
            X = w.getSummaryId(L.id, !0);
          return (
            L?.id &&
            !(Array.isArray(z) ? z : [z]).includes(L.id) &&
            !(Array.isArray(X) ? X : [X]).includes(b)
          );
        }
        return L;
      },
      [y, w, L],
    );
  return /* @__PURE__ */ K('div', {
    className: 'wx-GKbcLEGA wx-bars',
    style: { lineHeight: `${S.length ? S[0].$h : 0}px` },
    ref: E,
    onContextMenu: Ae,
    onMouseDown: G,
    onMouseMove: De,
    onTouchStart: ie,
    onTouchMove: _e,
    onTouchEnd: me,
    onClick: Ie,
    onDoubleClick: Se,
    onDragStart: (b) => (b.preventDefault(), !1),
    children: [
      /* @__PURE__ */ g(qc, {
        onSelectLink: ae,
        selectedLink: T,
        readonly: e,
      }),
      S.map((b) => {
        if (b.$skip && b.$skip_baseline) return null;
        const z =
            `wx-bar wx-${Pe(b.type)}` +
            (ee && M && b.id === M.id ? ' wx-touch' : '') +
            (L && L.id === b.id ? ' wx-selected' : '') +
            (F(b.id) ? ' wx-critical' : '') +
            (b.$reorder ? ' wx-reorder-task' : '') +
            (k && b.segments ? ' wx-split' : ''),
          X =
            'wx-link wx-left' +
            (L ? ' wx-visible' : '') +
            (!L || (!ue(b.id, !0) && U(b.id)) ? ' wx-target' : '') +
            (L && L.id === b.id && L.start ? ' wx-selected' : '') +
            (F(b.id) ? ' wx-critical' : ''),
          Q =
            'wx-link wx-right' +
            (L ? ' wx-visible' : '') +
            (!L || (!ue(b.id, !1) && U(b.id)) ? ' wx-target' : '') +
            (L && L.id === b.id && !L.start ? ' wx-selected' : '') +
            (F(b.id) ? ' wx-critical' : '');
        return /* @__PURE__ */ K(
          ys,
          {
            children: [
              !b.$skip &&
                /* @__PURE__ */ K('div', {
                  className: 'wx-GKbcLEGA ' + z,
                  style: Ke(b),
                  'data-tooltip-id': b.id,
                  'data-id': b.id,
                  tabIndex: re === b.id ? 0 : -1,
                  children: [
                    e
                      ? null
                      : b.id === T?.target && T?.type[2] === 's'
                        ? /* @__PURE__ */ g(at, {
                            type: 'danger',
                            css: 'wx-left wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ g('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ g('div', {
                            className: 'wx-GKbcLEGA ' + X,
                            children: /* @__PURE__ */ g('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                    b.type !== 'milestone'
                      ? /* @__PURE__ */ K(ye, {
                          children: [
                            b.progress && !(k && b.segments)
                              ? /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-progress-wrapper',
                                  children: /* @__PURE__ */ g('div', {
                                    className:
                                      'wx-GKbcLEGA wx-progress-percent',
                                    style: { width: `${b.progress}%` },
                                  }),
                                })
                              : null,
                            !e && !(k && b.segments)
                              ? /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-progress-marker',
                                  style: {
                                    left: `calc(${b.progress}% - 10px)`,
                                  },
                                  children: b.progress,
                                })
                              : null,
                            n
                              ? /* @__PURE__ */ g(n, {
                                  data: b,
                                  api: o,
                                  onAction: Xe,
                                })
                              : k && b.segments
                                ? /* @__PURE__ */ g(Xc, {
                                    task: b,
                                    type: Pe(b.type),
                                  })
                                : /* @__PURE__ */ g('div', {
                                    className: 'wx-GKbcLEGA wx-content',
                                    children: b.text || '',
                                  }),
                          ],
                        })
                      : /* @__PURE__ */ K(ye, {
                          children: [
                            /* @__PURE__ */ g('div', {
                              className: 'wx-GKbcLEGA wx-content',
                            }),
                            n
                              ? /* @__PURE__ */ g(n, {
                                  data: b,
                                  api: o,
                                  onAction: Xe,
                                })
                              : /* @__PURE__ */ g('div', {
                                  className: 'wx-GKbcLEGA wx-text-out',
                                  children: b.text,
                                }),
                          ],
                        }),
                    e
                      ? null
                      : b.id === T?.target && T?.type[2] === 'e'
                        ? /* @__PURE__ */ g(at, {
                            type: 'danger',
                            css: 'wx-right wx-delete-button wx-delete-link',
                            children: /* @__PURE__ */ g('i', {
                              className: 'wxi-close wx-delete-button-icon',
                            }),
                          })
                        : /* @__PURE__ */ g('div', {
                            className: 'wx-GKbcLEGA ' + Q,
                            children: /* @__PURE__ */ g('div', {
                              className: 'wx-GKbcLEGA wx-inner',
                            }),
                          }),
                  ],
                }),
              p && !b.$skip_baseline
                ? /* @__PURE__ */ g('div', {
                    className:
                      'wx-GKbcLEGA wx-baseline' +
                      (b.type === 'milestone' ? ' wx-milestone' : ''),
                    style: pt(b),
                  })
                : null,
            ],
          },
          b.id,
        );
      }),
    ],
  });
}
function Zc(t) {
  const { highlightTime: e } = t,
    n = ge(ht),
    r = Z(n, '_scales');
  return /* @__PURE__ */ g('div', {
    className: 'wx-ZkvhDKir wx-scale',
    style: { width: r.width },
    children: (r?.rows || []).map((s, o) =>
      /* @__PURE__ */ g(
        'div',
        {
          className: 'wx-ZkvhDKir wx-row',
          style: { height: `${s.height}px` },
          children: (s.cells || []).map((i, l) => {
            const a = e ? e(i.date, i.unit) : '',
              c = 'wx-cell ' + (i.css || '') + ' ' + (a || '');
            return /* @__PURE__ */ g(
              'div',
              {
                className: 'wx-ZkvhDKir ' + c,
                style: { width: `${i.width}px` },
                children: i.value,
              },
              l,
            );
          }),
        },
        o,
      ),
    ),
  });
}
const Jc = /* @__PURE__ */ new Map();
function ed(t) {
  const e = W(null),
    n = W(0),
    r = W(null),
    s = typeof window < 'u' && window.__RENDER_METRICS_ENABLED__;
  e.current === null && (e.current = performance.now()),
    n.current++,
    P(() => {
      if (s)
        return (
          cancelAnimationFrame(r.current),
          (r.current = requestAnimationFrame(() => {
            const o = {
              label: t,
              time: performance.now() - e.current,
              renders: n.current,
              timestamp: Date.now(),
            };
            Jc.set(t, o),
              window.dispatchEvent(
                new CustomEvent('render-metric', { detail: o }),
              );
          })),
          () => cancelAnimationFrame(r.current)
        );
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
    } = t,
    c = ge(ht),
    [d, u] = mn(c, '_selected'),
    f = Z(c, 'scrollTop'),
    p = Z(c, 'cellHeight'),
    m = Z(c, 'cellWidth'),
    h = Z(c, '_scales'),
    x = Z(c, '_markers'),
    w = Z(c, '_scrollTask'),
    y = Z(c, 'zoom'),
    [k, v] = B(),
    C = W(null),
    S = 1 + (h?.rows?.length || 0),
    $ = _(() => {
      const A = [];
      return (
        d &&
          d.length &&
          p &&
          d.forEach((j) => {
            A.push({ height: `${p}px`, top: `${j.$y - 3}px` });
          }),
        A
      );
    }, [u, p]),
    D = _(() => Math.max(k || 0, r), [k, r]);
  P(() => {
    const A = C.current;
    A && typeof f == 'number' && (A.scrollTop = f);
  }, [f]);
  const L = () => {
    N();
  };
  function N(A) {
    const j = C.current;
    if (!j) return;
    const te = {};
    (te.left = j.scrollLeft), c.exec('scroll-chart', te);
  }
  function M() {
    const A = C.current,
      te = Math.ceil((k || 0) / (p || 1)) + 1,
      E = Math.floor(((A && A.scrollTop) || 0) / (p || 1)),
      J = Math.max(0, E - S),
      re = E + te + S,
      ne = J * (p || 0);
    c.exec('render-data', {
      start: J,
      end: re,
      from: ne,
    });
  }
  P(() => {
    M();
  }, [k, f]);
  const O = R(
    (A) => {
      if (!A) return;
      const { id: j, mode: te } = A;
      if (te.toString().indexOf('x') < 0) return;
      const E = C.current;
      if (!E) return;
      const { clientWidth: J } = E,
        re = c.getTask(j);
      if (re.$x + re.$w < E.scrollLeft)
        c.exec('scroll-chart', { left: re.$x - (m || 0) }),
          (E.scrollLeft = re.$x - (m || 0));
      else if (re.$x >= J + E.scrollLeft) {
        const ne = J < re.$w ? m || 0 : re.$w;
        c.exec('scroll-chart', { left: re.$x - J + ne }),
          (E.scrollLeft = re.$x - J + ne);
      }
    },
    [c, m],
  );
  P(() => {
    O(w);
  }, [w]);
  function H(A) {
    if (y && (A.ctrlKey || A.metaKey)) {
      A.preventDefault();
      const j = C.current,
        te = -Math.sign(A.deltaY),
        E = A.clientX - (j ? j.getBoundingClientRect().left : 0);
      c.exec('zoom-scale', {
        dir: te,
        offset: E,
      });
    }
  }
  function T(A) {
    const j = i(A.date, A.unit);
    return j
      ? {
          css: j,
          width: A.width,
        }
      : null;
  }
  const V = _(
      () =>
        h && (h.minUnit === 'hour' || h.minUnit === 'day') && i
          ? h.rows[h.rows.length - 1].cells.map(T)
          : null,
      [h, i],
    ),
    ee = R(
      (A) => {
        (A.eventSource = 'chart'), c.exec('hotkey', A);
      },
      [c],
    );
  P(() => {
    const A = C.current;
    if (!A) return;
    const j = () => v(A.clientHeight);
    j();
    const te = new ResizeObserver(() => j());
    return (
      te.observe(A),
      () => {
        te.disconnect();
      }
    );
  }, [C.current]);
  const le = W(null);
  return (
    P(() => {
      const A = C.current;
      if (A && !le.current)
        return (
          (le.current = kr(A, {
            keys: {
              arrowup: !0,
              arrowdown: !0,
            },
            exec: (j) => ee(j),
          })),
          () => {
            le.current?.destroy(), (le.current = null);
          }
        );
    }, []),
    P(() => {
      const A = C.current;
      if (!A) return;
      const j = H;
      return (
        A.addEventListener('wheel', j),
        () => {
          A.removeEventListener('wheel', j);
        }
      );
    }, [H]),
    ed('chart'),
    /* @__PURE__ */ K('div', {
      className: 'wx-mR7v2Xag wx-chart',
      tabIndex: -1,
      ref: C,
      onScroll: L,
      children: [
        /* @__PURE__ */ g(Zc, { highlightTime: i, scales: h }),
        x && x.length
          ? /* @__PURE__ */ g('div', {
              className: 'wx-mR7v2Xag wx-markers',
              style: { height: `${D}px` },
              children: x.map((A, j) =>
                /* @__PURE__ */ g(
                  'div',
                  {
                    className: `wx-mR7v2Xag wx-marker ${A.css || ''}`,
                    style: { left: `${A.left}px` },
                    children: /* @__PURE__ */ g('div', {
                      className: 'wx-mR7v2Xag wx-content',
                      children: A.text,
                    }),
                  },
                  j,
                ),
              ),
            })
          : null,
        /* @__PURE__ */ K('div', {
          className: 'wx-mR7v2Xag wx-area',
          style: { width: `${n}px`, height: `${D}px` },
          children: [
            V
              ? /* @__PURE__ */ g('div', {
                  className: 'wx-mR7v2Xag wx-gantt-holidays',
                  style: { height: '100%' },
                  children: V.map((A, j) =>
                    A
                      ? /* @__PURE__ */ g(
                          'div',
                          {
                            className: 'wx-mR7v2Xag ' + A.css,
                            style: {
                              width: `${A.width}px`,
                              left: `${j * A.width}px`,
                            },
                          },
                          j,
                        )
                      : null,
                  ),
                })
              : null,
            /* @__PURE__ */ g(Uc, { borders: o }),
            d && d.length
              ? d.map((A, j) =>
                  A.$y
                    ? /* @__PURE__ */ g(
                        'div',
                        {
                          className: 'wx-mR7v2Xag wx-selected',
                          'data-id': A.id,
                          style: $[j],
                        },
                        A.id,
                      )
                    : null,
                )
              : null,
            /* @__PURE__ */ g(Qc, {
              readonly: e,
              taskTemplate: s,
              multiTaskRows: l,
              rowMapping: a,
            }),
          ],
        }),
      ],
    })
  );
}
function nd(t) {
  const {
      position: e = 'after',
      size: n = 4,
      dir: r = 'x',
      onMove: s,
      onDisplayChange: o,
      compactMode: i,
      containerWidth: l = 0,
      leftThreshold: a = 50,
      rightThreshold: c = 50,
    } = t,
    [d, u] = Ce(t.value ?? 0),
    [f, p] = Ce(t.display ?? 'all');
  function m(A) {
    let j = 0;
    e == 'center' ? (j = n / 2) : e == 'before' && (j = n);
    const te = {
      size: [n + 'px', 'auto'],
      p: [A - j + 'px', '0px'],
      p2: ['auto', '0px'],
    };
    if (r != 'x') for (let E in te) te[E] = te[E].reverse();
    return te;
  }
  const [h, x] = B(!1),
    [w, y] = B(null),
    k = W(0),
    v = W(),
    C = W(),
    S = W(f);
  P(() => {
    S.current = f;
  }, [f]),
    P(() => {
      w === null && d > 0 && y(d);
    }, [w, d]);
  function $(A) {
    return r == 'x' ? A.clientX : A.clientY;
  }
  const D = R(
      (A) => {
        const j = v.current + $(A) - k.current;
        u(j);
        let te;
        j <= a ? (te = 'chart') : l - j <= c ? (te = 'grid') : (te = 'all'),
          S.current !== te && (p(te), (S.current = te)),
          C.current && clearTimeout(C.current),
          (C.current = setTimeout(() => s && s(j), 100));
      },
      [l, a, c, s],
    ),
    L = R(() => {
      (document.body.style.cursor = ''),
        (document.body.style.userSelect = ''),
        x(!1),
        window.removeEventListener('mousemove', D),
        window.removeEventListener('mouseup', L);
    }, [D]),
    N = _(
      () => (f !== 'all' ? 'auto' : r == 'x' ? 'ew-resize' : 'ns-resize'),
      [f, r],
    ),
    M = R(
      (A) => {
        (!i && (f === 'grid' || f === 'chart')) ||
          ((k.current = $(A)),
          (v.current = d),
          x(!0),
          (document.body.style.cursor = N),
          (document.body.style.userSelect = 'none'),
          window.addEventListener('mousemove', D),
          window.addEventListener('mouseup', L));
      },
      [N, D, L, d, i, f],
    );
  function O() {
    p('all'), w !== null && (u(w), s && s(w));
  }
  function H(A) {
    if (i) {
      const j = f === 'chart' ? 'grid' : 'chart';
      p(j), o(j);
    } else if (f === 'grid' || f === 'chart') O(), o('all');
    else {
      const j = A === 'left' ? 'chart' : 'grid';
      p(j), o(j);
    }
  }
  function T() {
    H('left');
  }
  function V() {
    H('right');
  }
  const ee = _(() => m(d), [d, e, n, r]),
    le = [
      'wx-resizer',
      `wx-resizer-${r}`,
      `wx-resizer-display-${f}`,
      h ? 'wx-resizer-active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  return /* @__PURE__ */ K('div', {
    className: 'wx-pFykzMlT ' + le,
    onMouseDown: M,
    style: { width: ee.size[0], height: ee.size[1], cursor: N },
    children: [
      /* @__PURE__ */ K('div', {
        className: 'wx-pFykzMlT wx-button-expand-box',
        children: [
          /* @__PURE__ */ g('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-left',
            children: /* @__PURE__ */ g('i', {
              className: 'wx-pFykzMlT wxi-menu-left',
              onClick: T,
            }),
          }),
          /* @__PURE__ */ g('div', {
            className:
              'wx-pFykzMlT wx-button-expand-content wx-button-expand-right',
            children: /* @__PURE__ */ g('i', {
              className: 'wx-pFykzMlT wxi-menu-right',
              onClick: V,
            }),
          }),
        ],
      }),
      /* @__PURE__ */ g('div', { className: 'wx-pFykzMlT wx-resizer-line' }),
    ],
  });
}
const rd = 650;
function Ro(t) {
  let e;
  function n() {
    (e = new ResizeObserver((s) => {
      for (let o of s)
        if (o.target === document.body) {
          let i = o.contentRect.width <= rd;
          t(i);
        }
    })),
      e.observe(document.body);
  }
  function r() {
    e && (e.disconnect(), (e = null));
  }
  return {
    observe: n,
    disconnect: r,
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
    } = t,
    a = ge(ht),
    c = Z(a, '_tasks'),
    d = Z(a, '_scales'),
    u = Z(a, 'cellHeight'),
    f = Z(a, 'columns'),
    p = Z(a, '_scrollTask'),
    m = Z(a, 'undo'),
    [h, x] = B(!1);
  let [w, y] = B(0);
  const [k, v] = B(0),
    [C, S] = B(0),
    [$, D] = B(void 0),
    [L, N] = B('all'),
    M = W(null),
    O = R(
      (G) => {
        x(
          (ie) => (
            G !== ie &&
              (G
                ? ((M.current = L), L === 'all' && N('grid'))
                : (!M.current || M.current === 'all') && N('all')),
            G
          ),
        );
      },
      [L],
    );
  P(() => {
    const G = Ro(O);
    return (
      G.observe(),
      () => {
        G.disconnect();
      }
    );
  }, [O]);
  const H = _(() => {
    let G;
    return (
      f.every((ie) => ie.width && !ie.flexgrow)
        ? (G = f.reduce((ie, ae) => ie + parseInt(ae.width), 0))
        : h && L === 'chart'
          ? (G = parseInt(f.find((ie) => ie.id === 'action')?.width) || 50)
          : (G = 440),
      (w = G),
      G
    );
  }, [f, h, L]);
  P(() => {
    y(H);
  }, [H]);
  const T = _(() => (k ?? 0) - ($ ?? 0), [k, $]),
    V = _(() => d.width, [d]),
    ee = _(() => {
      if (!i || !l) return c.length * u;
      const G = /* @__PURE__ */ new Set();
      return (
        c.forEach((ie) => {
          const ae = l.taskRows.get(ie.id) ?? ie.id;
          G.add(ae);
        }),
        G.size * u
      );
    }, [c, u, i, l]),
    le = _(() => d.height + ee + T, [d, ee, T]),
    A = _(() => w + V, [w, V]),
    j = W(null),
    te = R(() => {
      Promise.resolve().then(() => {
        if ((k ?? 0) > (A ?? 0)) {
          const G = (k ?? 0) - w;
          a.exec('expand-scale', { minWidth: G });
        }
      });
    }, [k, A, w, a]);
  P(() => {
    let G;
    return (
      j.current && ((G = new ResizeObserver(te)), G.observe(j.current)),
      () => {
        G && G.disconnect();
      }
    );
  }, [j.current, te]),
    P(() => {
      te();
    }, [V]);
  const E = W(null),
    J = W(null),
    re = R(() => {
      const G = E.current;
      G &&
        a.exec('scroll-chart', {
          top: G.scrollTop,
        });
    }, [a]),
    ne = W({
      rTasks: [],
      rScales: { height: 0 },
      rCellHeight: 0,
      scrollSize: 0,
      ganttDiv: null,
      ganttHeight: 0,
    });
  P(() => {
    ne.current = {
      rTasks: c,
      rScales: d,
      rCellHeight: u,
      scrollSize: T,
      ganttDiv: E.current,
      ganttHeight: C ?? 0,
    };
  }, [c, d, u, T, C]);
  const fe = R(
    (G) => {
      if (!G) return;
      const {
        rTasks: ie,
        rScales: ae,
        rCellHeight: de,
        scrollSize: ze,
        ganttDiv: De,
        ganttHeight: _e,
      } = ne.current;
      if (!De) return;
      const { id: Me } = G,
        me = ie.findIndex((Se) => Se.id === Me);
      if (me > -1) {
        const Se = _e - ae.height,
          Y = me * de,
          pe = De.scrollTop;
        let ue = null;
        Y < pe ? (ue = Y) : Y + de > pe + Se && (ue = Y - Se + de + ze),
          ue !== null &&
            (a.exec('scroll-chart', { top: Math.max(ue, 0) }),
            (E.current.scrollTop = Math.max(ue, 0)));
      }
    },
    [a],
  );
  P(() => {
    fe(p);
  }, [p]),
    P(() => {
      const G = E.current,
        ie = J.current;
      if (!G || !ie) return;
      const ae = () => {
          Wo(() => {
            S(G.offsetHeight), v(G.offsetWidth), D(ie.offsetWidth);
          });
        },
        de = new ResizeObserver(ae);
      return de.observe(G), () => de.disconnect();
    }, [E.current]);
  const ve = W(null),
    $e = W(null);
  return (
    P(() => {
      $e.current && ($e.current.destroy(), ($e.current = null));
      const G = ve.current;
      if (G)
        return (
          ($e.current = kr(G, {
            keys: {
              'ctrl+c': !0,
              'ctrl+v': !0,
              'ctrl+x': !0,
              'ctrl+d': !0,
              backspace: !0,
              'ctrl+z': m,
              'ctrl+y': m,
            },
            exec: (ie) => {
              ie.isInput || a.exec('hotkey', ie);
            },
          })),
          () => {
            $e.current?.destroy(), ($e.current = null);
          }
        );
    }, [m]),
    /* @__PURE__ */ g('div', {
      className: 'wx-jlbQoHOz wx-gantt',
      ref: E,
      onScroll: re,
      children: /* @__PURE__ */ g('div', {
        className: 'wx-jlbQoHOz wx-pseudo-rows',
        style: { height: le, width: '100%' },
        ref: J,
        children: /* @__PURE__ */ g('div', {
          className: 'wx-jlbQoHOz wx-stuck',
          style: {
            height: C,
            width: $,
          },
          children: /* @__PURE__ */ K('div', {
            tabIndex: 0,
            className: 'wx-jlbQoHOz wx-layout',
            ref: ve,
            children: [
              f.length
                ? /* @__PURE__ */ K(ye, {
                    children: [
                      /* @__PURE__ */ g(Kc, {
                        display: L,
                        compactMode: h,
                        columnWidth: H,
                        width: w,
                        readonly: n,
                        fullHeight: ee,
                        onTableAPIChange: o,
                        multiTaskRows: i,
                        rowMapping: l,
                      }),
                      /* @__PURE__ */ g(nd, {
                        value: w,
                        display: L,
                        compactMode: h,
                        containerWidth: k,
                        onMove: (G) => y(G),
                        onDisplayChange: (G) => N(G),
                      }),
                    ],
                  })
                : null,
              /* @__PURE__ */ g('div', {
                className: 'wx-jlbQoHOz wx-content',
                ref: j,
                children: /* @__PURE__ */ g(td, {
                  readonly: n,
                  fullWidth: V,
                  fullHeight: ee,
                  taskTemplate: e,
                  cellBorders: r,
                  highlightTime: s,
                  multiTaskRows: i,
                  rowMapping: l,
                }),
              }),
            ],
          }),
        }),
      }),
    })
  );
}
function od(t) {
  return {
    year: '%Y',
    quarter: `${t('Q')} %Q`,
    month: '%M',
    week: `${t('Week')} %w`,
    day: '%M %j',
    hour: '%H:%i',
  };
}
function id(t, e) {
  return typeof t == 'function' ? t : lt(t, e);
}
function Io(t, e) {
  return t.map(({ format: n, ...r }) => ({
    ...r,
    format: id(n, e),
  }));
}
function ld(t, e) {
  const n = od(e);
  for (let r in n) n[r] = lt(n[r], t);
  return n;
}
function ad(t, e) {
  if (!t || !t.length) return t;
  const n = lt('%d-%m-%Y', e);
  return t.map((r) =>
    r.template
      ? r
      : r.id === 'start' || r.id == 'end'
        ? {
            ...r,
            //store locale template for unscheduled tasks
            _template: (s) => n(s),
            template: (s) => n(s),
          }
        : r.id === 'duration'
          ? {
              ...r,
              _template: (s) => s,
              template: (s) => s,
            }
          : r,
  );
}
function cd(t, e) {
  return t.levels
    ? {
        ...t,
        levels: t.levels.map((n) => ({
          ...n,
          scales: Io(n.scales, e),
        })),
      }
    : t;
}
const dd = (t) =>
    t
      .split('-')
      .map((e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : ''))
      .join(''),
  ud = [
    { unit: 'month', step: 1, format: '%F %Y' },
    { unit: 'day', step: 1, format: '%j' },
  ],
  fd = bt(function (
    {
      taskTemplate: e = null,
      markers: n = [],
      taskTypes: r = go,
      tasks: s = [],
      selected: o = [],
      activeTask: i = null,
      links: l = [],
      scales: a = ud,
      columns: c = lo,
      start: d = null,
      end: u = null,
      lengthUnit: f = 'day',
      durationUnit: p = 'day',
      cellWidth: m = 100,
      cellHeight: h = 38,
      scaleHeight: x = 36,
      readonly: w = !1,
      cellBorders: y = 'full',
      zoom: k = !1,
      baselines: v = !1,
      highlightTime: C = null,
      init: S = null,
      autoScale: $ = !0,
      unscheduledTasks: D = !1,
      criticalPath: L = null,
      schedule: N = { type: 'forward' },
      projectStart: M = null,
      projectEnd: O = null,
      calendar: H = null,
      undo: T = !1,
      splitTasks: V = !1,
      multiTaskRows: ee = !1,
      ...le
    },
    A,
  ) {
    const j = W();
    j.current = le;
    const te = _(() => new ta($s), []),
      E = _(() => ({ ...qt, ...Cn }), []),
      J = ge(Ye.i18n),
      re = _(() => (J ? J.extend(E, !0) : $t(E)), [J, E]),
      ne = _(() => re.getRaw().calendar, [re]),
      fe = _(() => {
        let me = {
          zoom: cd(k, ne),
          scales: Io(a, ne),
          columns: ad(c, ne),
          links: oo(l),
          cellWidth: m,
        };
        return (
          me.zoom &&
            (me = {
              ...me,
              ...Pl(me.zoom, ld(ne, re.getGroup('gantt')), me.scales, m),
            }),
          me
        );
      }, [k, a, c, l, m, ne, re]),
      ve = W(null);
    ve.current !== s &&
      (Jn(s, { durationUnit: p, calendar: H }), (ve.current = s)),
      P(() => {
        Jn(s, { durationUnit: p, calendar: H });
      }, [s, p, H, V]);
    const $e = _(() => {
        if (!ee) return null;
        const me = /* @__PURE__ */ new Map(),
          Se = /* @__PURE__ */ new Map(),
          Y = (pe) => {
            pe.forEach((ue) => {
              const oe = ue.row ?? ue.id;
              Se.set(ue.id, oe),
                me.has(oe) || me.set(oe, []),
                me.get(oe).push(ue.id),
                ue.data && ue.data.length > 0 && Y(ue.data);
            });
          };
        return Y(s), { rowMap: me, taskRows: Se };
      }, [s, ee]),
      G = _(() => te.in, [te]),
      ie = W(null);
    ie.current === null &&
      ((ie.current = new Es((me, Se) => {
        const Y = 'on' + dd(me);
        j.current && j.current[Y] && j.current[Y](Se);
      })),
      G.setNext(ie.current));
    const [ae, de] = B(null),
      ze = W(null);
    ze.current = ae;
    const De = _(
      () => ({
        getState: te.getState.bind(te),
        getReactiveState: te.getReactive.bind(te),
        getStores: () => ({ data: te }),
        exec: G.exec,
        setNext: (me) => ((ie.current = ie.current.setNext(me)), ie.current),
        intercept: G.intercept.bind(G),
        on: G.on.bind(G),
        detach: G.detach.bind(G),
        getTask: te.getTask.bind(te),
        serialize: te.serialize.bind(te),
        getTable: (me) =>
          me
            ? new Promise((Se) => setTimeout(() => Se(ze.current), 1))
            : ze.current,
        getHistory: () => te.getHistory(),
      }),
      [te, G],
    );
    St(
      A,
      () => ({
        ...De,
      }),
      [De],
    );
    const _e = W(0);
    P(() => {
      _e.current
        ? te.init({
            tasks: s,
            links: fe.links,
            start: d,
            columns: fe.columns,
            end: u,
            lengthUnit: f,
            cellWidth: fe.cellWidth,
            cellHeight: h,
            scaleHeight: x,
            scales: fe.scales,
            taskTypes: r,
            zoom: fe.zoom,
            selected: o,
            activeTask: i,
            baselines: v,
            autoScale: $,
            unscheduledTasks: D,
            markers: n,
            durationUnit: p,
            criticalPath: L,
            schedule: N,
            projectStart: M,
            projectEnd: O,
            calendar: H,
            undo: T,
            _weekStart: ne.weekStart,
            splitTasks: V,
          })
        : S && S(De),
        _e.current++;
    }, [
      De,
      S,
      s,
      fe,
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
      D,
      n,
      p,
      L,
      N,
      M,
      O,
      H,
      T,
      ne,
      V,
      te,
    ]),
      _e.current === 0 &&
        te.init({
          tasks: s,
          links: fe.links,
          start: d,
          columns: fe.columns,
          end: u,
          lengthUnit: f,
          cellWidth: fe.cellWidth,
          cellHeight: h,
          scaleHeight: x,
          scales: fe.scales,
          taskTypes: r,
          zoom: fe.zoom,
          selected: o,
          activeTask: i,
          baselines: v,
          autoScale: $,
          unscheduledTasks: D,
          markers: n,
          durationUnit: p,
          criticalPath: L,
          schedule: N,
          projectStart: M,
          projectEnd: O,
          calendar: H,
          undo: T,
          _weekStart: ne.weekStart,
          splitTasks: V,
        });
    const Me = _(
      () =>
        H
          ? (me, Se) =>
              (Se == 'day' && !H.getDayHours(me)) ||
              (Se == 'hour' && !H.getDayHours(me))
                ? 'wx-weekend'
                : ''
          : C,
      [H, C],
    );
    return /* @__PURE__ */ g(Ye.i18n.Provider, {
      value: re,
      children: /* @__PURE__ */ g(ht.Provider, {
        value: De,
        children: /* @__PURE__ */ g(sd, {
          taskTemplate: e,
          readonly: w,
          cellBorders: y,
          highlightTime: Me,
          onTableAPIChange: de,
          multiTaskRows: ee,
          rowMapping: $e,
        }),
      }),
    });
  });
function hd({ api: t = null, items: e = [] }) {
  const n = ge(Ye.i18n),
    r = _(() => n || $t(Cn), [n]),
    s = _(() => r.getGroup('gantt'), [r]),
    o = it(t, '_selected'),
    i = it(t, 'undo'),
    l = it(t, 'history'),
    a = it(t, 'splitTasks'),
    c = ['undo', 'redo'],
    d = _(() => {
      const f = tr();
      return (e.length ? e : tr()).map((m) => {
        let h = { ...m, disabled: !1 };
        return (
          (h.handler = yr(f, h.id) ? (x) => Dt(t, x.id, null, s) : h.handler),
          h.text && (h.text = s(h.text)),
          h.menuText && (h.menuText = s(h.menuText)),
          h
        );
      });
    }, [e, t, s, i, a]),
    u = _(() => {
      const f = [];
      return (
        d.forEach((p) => {
          const m = p.id;
          if (m === 'add-task') f.push(p);
          else if (c.includes(m))
            c.includes(m) &&
              f.push({
                ...p,
                disabled: p.isDisabled(l),
              });
          else {
            if (!o?.length || !t) return;
            f.push({
              ...p,
              disabled:
                p.isDisabled && o.some((h) => p.isDisabled(h, t.getState())),
            });
          }
        }),
        f.filter((p, m) => {
          if (t && p.isHidden)
            return !o.some((h) => p.isHidden(h, t.getState()));
          if (p.comp === 'separator') {
            const h = f[m + 1];
            if (!h || h.comp === 'separator') return !1;
          }
          return !0;
        })
      );
    }, [t, o, l, d]);
  return n
    ? /* @__PURE__ */ g(rr, { items: u })
    : /* @__PURE__ */ g(Ye.i18n.Provider, {
        value: r,
        children: /* @__PURE__ */ g(rr, { items: u }),
      });
}
const pd = bt(function (
    {
      options: e = [],
      api: n = null,
      resolver: r = null,
      filter: s = null,
      at: o = 'point',
      children: i,
      onClick: l,
      css: a,
    },
    c,
  ) {
    const d = W(null),
      u = W(null),
      f = ge(Ye.i18n),
      p = _(() => f || $t({ ...Cn, ...qt }), [f]),
      m = _(() => p.getGroup('gantt'), [p]),
      h = it(n, 'taskTypes'),
      x = it(n, 'selected'),
      w = it(n, '_selected'),
      y = it(n, 'splitTasks'),
      k = _(() => er(), []);
    P(() => {
      n &&
        (n.on('scroll-chart', () => {
          d.current && d.current.show && d.current.show();
        }),
        n.on('drag-task', () => {
          d.current && d.current.show && d.current.show();
        }));
    }, [n]);
    function v(H) {
      return H.map(
        (T) => (
          (T = { ...T }),
          T.text && (T.text = m(T.text)),
          T.subtext && (T.subtext = m(T.subtext)),
          T.data && (T.data = v(T.data)),
          T
        ),
      );
    }
    function C() {
      const H = e.length ? e : er(),
        T = H.find((V) => V.id === 'convert-task');
      return (
        T &&
          ((T.data = []),
          (h || []).forEach((V) => {
            T.data.push(T.dataFactory(V));
          })),
        v(H)
      );
    }
    const S = _(() => C(), [n, e, h, y, m]),
      $ = _(() => (w && w.length ? w : []), [w]),
      D = R(
        (H, T) => {
          let V = H ? n?.getTask(H) : null;
          if (r) {
            const ee = r(H, T);
            V = ee === !0 ? V : ee;
          }
          if (V) {
            const ee = xt(T.target, 'data-segment');
            ee !== null
              ? (u.current = { id: V.id, segmentIndex: ee })
              : (u.current = V.id),
              (!Array.isArray(x) || !x.includes(V.id)) &&
                n &&
                n.exec &&
                n.exec('select-task', { id: V.id });
          }
          return V;
        },
        [n, r, x],
      ),
      L = R(
        (H) => {
          const T = H.action;
          T && (yr(k, T.id) && Dt(n, T.id, u.current, m), l && l(H));
        },
        [n, m, l, k],
      ),
      N = R(
        (H, T) => {
          const V = $.length ? $ : T ? [T] : [];
          let ee = s ? V.every((le) => s(H, le)) : !0;
          if (
            ee &&
            (H.isHidden &&
              (ee = !V.some((le) => H.isHidden(le, n.getState(), u.current))),
            H.isDisabled)
          ) {
            const le = V.some((A) => H.isDisabled(A, n.getState(), u.current));
            H.disabled = le;
          }
          return ee;
        },
        [s, $, n],
      );
    St(c, () => ({
      show: (H, T) => {
        d.current && d.current.show && d.current.show(H, T);
      },
    }));
    const M = R((H) => {
        d.current && d.current.show && d.current.show(H);
      }, []),
      O = /* @__PURE__ */ K(ye, {
        children: [
          /* @__PURE__ */ g(_o, {
            filter: N,
            options: S,
            dataKey: 'id',
            resolver: D,
            onClick: L,
            at: o,
            ref: d,
            css: a,
          }),
          /* @__PURE__ */ g('span', {
            onContextMenu: M,
            'data-menu-ignore': 'true',
            children: typeof i == 'function' ? i() : i,
          }),
        ],
      });
    if (!f && Ye.i18n?.Provider) {
      const H = Ye.i18n.Provider;
      return /* @__PURE__ */ g(H, { value: p, children: O });
    }
    return O;
  }),
  or = {};
function ms(t) {
  return typeof t < 'u' ? or[t] || t : or.text;
}
function Je(t, e) {
  or[t] = e;
}
const gd = {
  editor: {},
};
function Pn(t) {
  const {
      editors: e,
      data: n,
      css: r = '',
      errors: s,
      focus: o = !1,
      onClick: i,
      children: l,
      onChange: a,
    } = t,
    c = W(null);
  P(() => {
    if (o) {
      const p = document.activeElement;
      if (p && c.current && c.current.contains(p)) return;
      const m = c.current
        ? c.current.querySelector(
            'input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
          )
        : null;
      m &&
        setTimeout(() => {
          typeof m.select == 'function' && m.select(),
            typeof m.focus == 'function' && m.focus();
        }, 300);
    }
  }, []);
  const d = ge(Ye.i18n),
    u = _(() => d.getGroup('editor'), [d]),
    f = _(
      () =>
        e.config[0].comp === 'readonly' &&
        e.config.every((p) => !Object.keys(n).includes(p.key)),
      [e, n],
    );
  return /* @__PURE__ */ K('div', {
    className: 'wx-s2aE1xdZ wx-sections ' + r,
    ref: c,
    children: [
      l,
      f
        ? /* @__PURE__ */ g('div', {
            className: 'wx-s2aE1xdZ wx-overlay',
            children: u('No data'),
          })
        : null,
      e.config.map((p) => {
        if (!p.hidden) {
          const { key: m, onChange: h, ...x } = p;
          if (p.comp === 'readonly' || p.comp === 'section') {
            const w = ms(p.comp);
            return /* @__PURE__ */ g(
              w,
              {
                fieldKey: m,
                label: p.label,
                value: n[m],
                ...x,
                onClick: i,
              },
              m,
            );
          } else {
            const w = ms(p.comp);
            return /* @__PURE__ */ K(
              'div',
              {
                children: [
                  /* @__PURE__ */ g(Yt, {
                    label: p.labelTemplate
                      ? p.labelTemplate(n[m])
                      : (p.label ?? ''),
                    required: p.required,
                    children: /* @__PURE__ */ g(
                      w,
                      {
                        fieldKey: m,
                        ...x,
                        onChange:
                          h ||
                          ((y) => {
                            a &&
                              a({
                                value: y.value,
                                key: m,
                                input: y.input,
                              });
                          }),
                        label: void 0,
                        error: s && s[m],
                        value: n[m],
                      },
                      m,
                    ),
                  }),
                  s && s[m] && p.validationMessage
                    ? /* @__PURE__ */ g('div', {
                        className: 'wx-s2aE1xdZ wx-message',
                        children: p.validationMessage,
                      })
                    : null,
                ],
              },
              m,
            );
          }
        }
        return null;
      }),
    ],
  });
}
function md(t) {
  if (typeof t == 'string' && t.includes('.')) {
    const e = t.split('.');
    return (n) => {
      let r = n;
      return (
        e.forEach((s) => {
          r = r[s];
        }),
        r
      );
    };
  }
  return (e) => e[t];
}
function wd(t) {
  if (typeof t == 'string' && t.includes('.')) {
    const e = t.split('.');
    return (n, r) => {
      let s = n;
      e.forEach((o, i) => {
        i === e.length - 1 ? (s[o] = r) : (s = s[o]);
      });
    };
  }
  return (e, n) => (e[t] = n);
}
function xd(t) {
  const e = t.map((i) => {
      const l = { ...i };
      return (
        i.config && Object.assign(l, i.config),
        (l.key = i.key || Wi()),
        (l.setter = i.setter || wd(i.key)),
        (l.getter = i.getter || md(i.key)),
        l
      );
    }),
    n = (i) => {
      const l = {};
      return (
        e.forEach((a) => {
          a.comp !== 'section' &&
            (a.getter ? (l[a.key] = a.getter(i)) : (l[a.key] = i[a.key]));
        }),
        l
      );
    },
    r = (i, l, a) => (
      (a.length ? a.map((c) => e.find((d) => d.key === c)) : e).forEach((c) => {
        c.setter ? c.setter(i, l[c.key]) : (i[c.key] = l[c.key]);
      }),
      i
    ),
    s = (i, l) => {
      const a = n(i),
        c = [];
      return (
        e.forEach((d) => {
          const u = a[d.key],
            f = l[d.key];
          !Nn(u, f) && (u !== void 0 || f) && c.push(d.key);
        }),
        c
      );
    },
    o = (i, l, a) => {
      let c = 0;
      const d = {};
      return (
        (l?.length ? l.map((u) => e.find((f) => f.key === u)) : e).forEach(
          (u) => {
            u.required && !i[u.key]
              ? ((d[u.key] = {
                  errorType: 'required',
                }),
                (u.validationMessage =
                  u.validationMessage ?? a('This field is required')),
                c++)
              : u.validation &&
                !u.validation(i[u.key]) &&
                ((d[u.key] = {
                  errorType: 'validation',
                }),
                (u.validationMessage =
                  u.validationMessage ?? a('Invalid value')),
                c++);
          },
        ),
        c > 0 ? d : null
      );
    };
  return {
    config: e.filter((i) => i.comp !== 'hidden'),
    getValues: n,
    setValues: r,
    diff: s,
    validateValues: o,
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
  layout: c = 'default',
  placement: d = 'inline',
  view: u,
  children: f,
  onChange: p,
  onSave: m,
  onAction: h,
  onValidation: x,
  hotkeys: w,
}) {
  const y = ge(Ye.i18n).getGroup('editor'),
    [k, v] = Ce(t),
    [C, S] = B(null),
    $ = _(() => {
      const E = xd(e);
      C &&
        E.config.forEach((ne) => {
          ne.comp === 'section' &&
            ne.key === C &&
            (ne.sectionMode === 'accordion'
              ? ne.activeSection ||
                (E.config.forEach((fe) => {
                  fe.comp === 'section' &&
                    fe.key !== ne.key &&
                    (fe.activeSection = !1);
                }),
                (ne.activeSection = !0))
              : (ne.activeSection = !ne.activeSection));
        });
      let J = /* @__PURE__ */ new Set(),
        re = null;
      return (
        E.config.forEach((ne) => {
          ne.sectionMode === 'exclusive' && ne.activeSection && (re = ne.key),
            ne.activeSection && J.add(ne.key);
        }),
        E.config.forEach((ne) => {
          ne.hidden =
            ne.hidden ||
            (r && r !== ne.batch) ||
            (re && ne.key != re && ne.section !== re) ||
            (ne.section && !J.has(ne.section));
        }),
        i
          ? {
              ...E,
              config: E.config.map((ne) => ({ ...ne, comp: 'readonly' })),
              diff: () => [],
            }
          : E
      );
    }, [e, C, r, i]),
    [D, L] = B({}),
    [N, M] = B({}),
    O = k;
  P(() => {
    k !== void 0 && (L(wn(k)), M(wn(k)), O.errors && (O.errors = ee()));
  }, [k]);
  const [H, T] = B([]);
  P(() => {
    k && T([]);
  }, [k]);
  function V(E) {
    return [...new Set(E)];
  }
  function ee(E) {
    const J = $.validateValues(D, E, y);
    return Nn(J, O.errors) || (x && x({ errors: J, values: D })), J;
  }
  function le(E, J) {
    if (s && !O.errors) {
      const re = $.setValues(k, J ?? N, E);
      v(re), m && m({ changes: E, values: re });
    } else T(E);
  }
  function A({ value: E, key: J, input: re }) {
    let ne = { ...(N || {}), [J]: E };
    const fe = {
      key: J,
      value: E,
      update: ne,
    };
    if ((re && (fe.input = re), p && p(fe), !k)) return;
    (ne = fe.update), M(ne);
    const ve = $.diff(k, ne),
      $e = $.setValues({ ...(D || {}) }, ne, V([...ve, J]));
    if ((L($e), ve.length)) {
      const G = s ? [] : V([...ve, ...Object.keys(O.errors ?? {}), J]);
      (O.errors = ee(G)), le(ve, ne);
    } else {
      const G = Object.keys(O.errors ?? {});
      G.length && (O.errors = ee(G)), T([]);
    }
  }
  function j() {
    if (H.length && (s || (O.errors = ee()), !O.errors)) {
      m &&
        m({
          changes: H,
          values: D,
        });
      const E = $.setValues(k, N, H);
      v(E), T([]), v({ ...D });
    }
  }
  function te({ item: E }) {
    E.id === 'save' ? j() : E.id === 'toggle-section' && S(E.key),
      h && h({ item: E, values: D, changes: H });
  }
  return /* @__PURE__ */ g(u, {
    topBar: l,
    bottomBar: a,
    placement: d,
    layout: c,
    readonly: i,
    autoSave: s,
    css: n,
    data: N,
    editors: $,
    focus: o,
    hotkeys: w,
    errors: O.errors,
    onClick: te,
    onKeyDown: te,
    onChange: A,
    children: f,
  });
}
function vd(t) {
  const {
      editors: e,
      data: n,
      layout: r,
      errors: s,
      focus: o,
      onClick: i,
      onChange: l,
    } = t,
    a = _(() => {
      let c = [];
      if (
        r === 'columns' &&
        ((c = [
          { ...e, config: [] },
          { ...e, config: [] },
        ]),
        e.config.forEach((d) => {
          const u = d.column === 'left' ? 0 : 1;
          c[u].config.push(d);
        }),
        c[0].config.length)
      ) {
        const d = c[0].config[0];
        d.comp === 'text' &&
          (c[0][0] = {
            ...d,
            css: 'title',
            label: '',
          });
      }
      return c;
    }, [r, e]);
  return r === 'columns'
    ? /* @__PURE__ */ K('div', {
        className: 'wx-bNrSbszs wx-cols',
        children: [
          /* @__PURE__ */ g('div', {
            className: 'wx-bNrSbszs wx-left',
            children: /* @__PURE__ */ g(Pn, {
              editors: a[0],
              data: n,
              errors: s,
              onClick: i,
              onChange: l,
            }),
          }),
          /* @__PURE__ */ g('div', {
            className: 'wx-bNrSbszs wx-right',
            children: /* @__PURE__ */ g(Pn, {
              editors: a[1],
              data: n,
              focus: o,
              errors: s,
              onClick: i,
              onChange: l,
            }),
          }),
        ],
      })
    : /* @__PURE__ */ g(Pn, {
        editors: e,
        data: n,
        focus: o,
        errors: s,
        onClick: i,
        onChange: l,
      });
}
function ws({
  items: t,
  values: e = null,
  top: n = !0,
  onClick: r,
  onChange: s,
}) {
  const o = R(
    ({ item: i, value: l }) => {
      s && s({ key: i.key, value: l });
    },
    [s],
  );
  return t.length
    ? /* @__PURE__ */ g('div', {
        className: `wx-66OW1j0R wx-editor-toolbar ${n ? 'wx-topbar' : 'wx-bottom'}`,
        children: /* @__PURE__ */ g(rr, {
          items: t,
          values: e,
          onClick: r,
          onChange: o,
        }),
      })
    : null;
}
const Vt = () => ({ comp: 'spacer' }),
  Vn = (t) => ({
    comp: 'button',
    text: t('Cancel'),
    id: 'cancel',
  }),
  Gn = (t) => ({
    type: 'primary',
    comp: 'button',
    text: t('Save'),
    id: 'save',
  }),
  xs = () => ({
    comp: 'icon',
    icon: 'wxi-close',
    id: 'close',
  });
function jn(t) {
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
      hotkeys: x,
    } = t,
    w = ge(Ye.i18n),
    y = _(() => w.getGroup('editor'), [w]),
    k = _(() => o === !0 && i === !0, [o, i]),
    v = _(() => {
      let N = o && o.items ? o.items.map((M) => ({ ...M })) : [];
      return (
        k &&
          (d
            ? (N = [Vt(), xs()])
            : (u
                ? (N = [Vt(), xs()])
                : a !== 'modal' && (N = [Vt(), Vn(y), Gn(y)]),
              l === 'columns' && !N.length && (N = [Vt(), Gn(y), Vn(y)]))),
        N
      );
    }, [o, k, d, u, a, l, y]),
    C = _(() => {
      let N = i && i.items ? i.items.map((M) => ({ ...M })) : [];
      return (
        k &&
          (d ||
            (a === 'modal' && !u && (N = [Vt(), Gn(y), Vn(y)]),
            l === 'columns' && v.length && (N = []))),
        N
      );
    }, [i, k, d, a, u, l, v, y]),
    S = _(() => [...v, ...C], [v, C]),
    $ = W(null),
    D = W(null);
  D.current = (N, ...M) => {
    const O = S.findIndex((V) => M.includes(V.id));
    if (O === -1) return !1;
    const H = N.target,
      T = S[O];
    (N.key == 'Escape' &&
      (H.closest('.wx-combo') ||
        H.closest('.wx-multicombo') ||
        H.closest('.wx-richselect'))) ||
      (N.key == 'Delete' &&
        (H.tagName === 'INPUT' || H.tagName === 'TEXTAREA')) ||
      (N.preventDefault(), m && m({ item: T }));
  };
  const L = _(
    () =>
      x === !1
        ? {}
        : {
            'ctrl+s': (N) => D.current(N, 'save'),
            escape: (N) => D.current(N, 'cancel', 'close'),
            'ctrl+d': (N) => D.current(N, 'delete'),
            ...(x || {}),
          },
    [x],
  );
  return (
    ni(L, $),
    /* @__PURE__ */ K('div', {
      className: s ? 'wx-85HDaNoA ' + s : 'wx-85HDaNoA',
      ref: $,
      children: [
        /* @__PURE__ */ g(ws, {
          ...(o && typeof o == 'object' ? o : {}),
          items: v,
          values: e,
          onClick: p,
          onChange: h,
        }),
        /* @__PURE__ */ K('div', {
          className: `wx-85HDaNoA wx-content${l === 'columns' ? ' wx-layout-columns' : ''}`,
          children: [
            f,
            /* @__PURE__ */ g(vd, {
              editors: n,
              layout: l,
              data: e,
              focus: r,
              errors: c,
              onClick: p,
              onChange: h,
            }),
            /* @__PURE__ */ g(ws, {
              ...(i && typeof i == 'object' ? i : {}),
              items: C,
              values: e,
              top: !1,
              onClick: p,
              onChange: h,
            }),
          ],
        }),
      ],
    })
  );
}
function kd(t) {
  const { css: e, onClick: n, placement: r, ...s } = t;
  function o() {
    n && n({ item: { id: 'close' } });
  }
  return r === 'modal'
    ? /* @__PURE__ */ g(Hi, {
        children: /* @__PURE__ */ g(jn, {
          css: `wx-panel ${e}`,
          onClick: n,
          placement: r,
          ...s,
        }),
      })
    : r === 'sidebar'
      ? /* @__PURE__ */ g(Li, {
          onCancel: o,
          children: /* @__PURE__ */ g(jn, {
            css: `wx-panel ${e}`,
            onClick: n,
            placement: r,
            ...s,
          }),
        })
      : /* @__PURE__ */ g(jn, {
          css: `wx-inline-form ${e}`,
          onClick: n,
          placement: r,
          ...s,
        });
}
function bd(t) {
  const {
      values: e = {},
      items: n = [],
      css: r = '',
      activeBatch: s = null,
      topBar: o = !0,
      bottomBar: i = !0,
      focus: l = !1,
      autoSave: a = !1,
      layout: c = 'default',
      readonly: d = !1,
      placement: u = 'inline',
      children: f,
      ...p
    } = t,
    m = Object.keys(p).reduce((h, x) => {
      if (/^on[a-z]/.test(x)) {
        const w = 'on' + x.charAt(2).toUpperCase() + x.slice(3);
        w in p ? (h[x] = p[x]) : (h[w] = p[x]);
      } else h[x] = p[x];
      return h;
    }, {});
  return /* @__PURE__ */ g(_n, {
    words: gd,
    optional: !0,
    children: /* @__PURE__ */ g(yd, {
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
      children: f,
    }),
  });
}
function Sd({ value: t, options: e, label: n }) {
  const r = ge(Ye.i18n).getGroup('editor'),
    s = _(() => {
      let o = t;
      if ((typeof t == 'boolean' && (o = r(t ? 'Yes' : 'No')), e)) {
        const i = e.find((l) => l.id === t);
        i && (o = i.label);
      }
      return o;
    }, [t, e, r]);
  return s || s === 0 ? /* @__PURE__ */ g(Yt, { label: n, children: s }) : null;
}
function $d({ fieldKey: t, label: e, activeSection: n, onClick: r }) {
  return /* @__PURE__ */ K('div', {
    className: `wx-OmgQq65I wx-section${n ? ' wx-section-active' : ''}`,
    onClick: () =>
      r &&
      r({
        item: { id: 'toggle-section', key: n ? null : t },
      }),
    children: [
      /* @__PURE__ */ g('h3', { children: e }),
      /* @__PURE__ */ g('i', {
        className: `wx-OmgQq65I wxi-angle-${n ? 'down' : 'right'} wx-icon`,
      }),
    ],
  });
}
Je('text', Zt);
Je('textarea', ci);
Je('checkbox', di);
Je('readonly', Sd);
Je('section', $d);
ir(je);
function _d({ api: t, autoSave: e, onLinksChange: n }) {
  const s = ge(Ye.i18n).getGroup('gantt'),
    o = Z(t, 'activeTask'),
    i = Z(t, '_activeTask'),
    l = Z(t, '_links'),
    a = Z(t, 'schedule'),
    c = Z(t, 'unscheduledTasks'),
    [d, u] = B();
  function f() {
    if (o) {
      const x = l
          .filter((y) => y.target == o)
          .map((y) => ({ link: y, task: t.getTask(y.source) })),
        w = l
          .filter((y) => y.source == o)
          .map((y) => ({ link: y, task: t.getTask(y.target) }));
      return [
        { title: s('Predecessors'), data: x },
        { title: s('Successors'), data: w },
      ];
    }
  }
  P(() => {
    u(f());
  }, [o, l]);
  const p = _(
    () => [
      { id: 'e2s', label: s('End-to-start') },
      { id: 's2s', label: s('Start-to-start') },
      { id: 'e2e', label: s('End-to-end') },
      { id: 's2e', label: s('Start-to-end') },
    ],
    [s],
  );
  function m(x) {
    e
      ? t.exec('delete-link', { id: x })
      : (u((w) =>
          (w || []).map((y) => ({
            ...y,
            data: y.data.filter((k) => k.link.id !== x),
          })),
        ),
        n &&
          n({
            id: x,
            action: 'delete-link',
            data: { id: x },
          }));
  }
  function h(x, w) {
    e
      ? t.exec('update-link', {
          id: x,
          link: w,
        })
      : (u((y) =>
          (y || []).map((k) => ({
            ...k,
            data: k.data.map((v) =>
              v.link.id === x ? { ...v, link: { ...v.link, ...w } } : v,
            ),
          })),
        ),
        n &&
          n({
            id: x,
            action: 'update-link',
            data: {
              id: x,
              link: w,
            },
          }));
  }
  return /* @__PURE__ */ g(ye, {
    children: (d || []).map((x, w) =>
      x.data.length
        ? /* @__PURE__ */ g(
            'div',
            {
              className: 'wx-j93aYGQf wx-links',
              children: /* @__PURE__ */ g(Yt, {
                label: x.title,
                position: 'top',
                children: /* @__PURE__ */ g('table', {
                  children: /* @__PURE__ */ g('tbody', {
                    children: x.data.map((y) =>
                      /* @__PURE__ */ K(
                        'tr',
                        {
                          children: [
                            /* @__PURE__ */ g('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ g('div', {
                                className: 'wx-j93aYGQf wx-task-name',
                                children: y.task.text || '',
                              }),
                            }),
                            a?.auto && y.link.type === 'e2s'
                              ? /* @__PURE__ */ g('td', {
                                  className: 'wx-j93aYGQf wx-cell wx-link-lag',
                                  children: /* @__PURE__ */ g(Zt, {
                                    type: 'number',
                                    placeholder: s('Lag'),
                                    value: y.link.lag,
                                    disabled: c && i?.unscheduled,
                                    onChange: (k) => {
                                      k.input || h(y.link.id, { lag: k.value });
                                    },
                                  }),
                                })
                              : null,
                            /* @__PURE__ */ g('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ g('div', {
                                className: 'wx-j93aYGQf wx-wrapper',
                                children: /* @__PURE__ */ g(fi, {
                                  value: y.link.type,
                                  placeholder: s('Select link type'),
                                  options: p,
                                  onChange: (k) =>
                                    h(y.link.id, { type: k.value }),
                                  children: ({ option: k }) => k.label,
                                }),
                              }),
                            }),
                            /* @__PURE__ */ g('td', {
                              className: 'wx-j93aYGQf wx-cell',
                              children: /* @__PURE__ */ g('i', {
                                className:
                                  'wx-j93aYGQf wxi-delete wx-delete-icon',
                                onClick: () => m(y.link.id),
                                role: 'button',
                              }),
                            }),
                          ],
                        },
                        y.link.id,
                      ),
                    ),
                  }),
                }),
              }),
            },
            w,
          )
        : null,
    ),
  });
}
function Cd(t) {
  const { value: e, time: n, format: r, onchange: s, onChange: o, ...i } = t,
    l = o ?? s;
  function a(c) {
    const d = new Date(c.value);
    d.setHours(e.getHours()),
      d.setMinutes(e.getMinutes()),
      l && l({ value: d });
  }
  return /* @__PURE__ */ K('div', {
    className: 'wx-hFsbgDln date-time-controll',
    children: [
      /* @__PURE__ */ g(Ti, {
        ...i,
        value: e,
        onChange: a,
        format: r,
        buttons: ['today'],
        clear: !1,
      }),
      n ? /* @__PURE__ */ g(Ai, { value: e, onChange: l, format: r }) : null,
    ],
  });
}
Je('select', Ns);
Je('date', Cd);
Je('twostate', Ts);
Je('slider', Kn);
Je('counter', Di);
Je('links', _d);
function Nd({
  api: t,
  items: e = [],
  css: n = '',
  layout: r = 'default',
  readonly: s = !1,
  placement: o = 'sidebar',
  bottomBar: i = !0,
  topBar: l = !0,
  autoSave: a = !0,
  focus: c = !1,
  hotkeys: d = {},
}) {
  const u = ge(Ye.i18n),
    f = _(() => u || $t({ ...Cn, ...qt }), [u]),
    p = _(() => f.getGroup('gantt'), [f]),
    m = f.getRaw(),
    h = _(() => {
      const Y = m.gantt?.dateFormat || m.formats?.dateFormat;
      return lt(Y, m.calendar);
    }, [m]),
    x = _(() => {
      if (l === !0 && !s) {
        const Y = [
          { comp: 'icon', icon: 'wxi-close', id: 'close' },
          { comp: 'spacer' },
          {
            comp: 'button',
            type: 'danger',
            text: p('Delete'),
            id: 'delete',
          },
        ];
        return a
          ? { items: Y }
          : {
              items: [
                ...Y,
                {
                  comp: 'button',
                  type: 'primary',
                  text: p('Save'),
                  id: 'save',
                },
              ],
            };
      }
      return l;
    }, [l, s, a, p]),
    [w, y] = B(!1),
    k = _(() => (w ? 'wx-full-screen' : ''), [w]),
    v = R((Y) => {
      y(Y);
    }, []);
  P(() => {
    const Y = Ro(v);
    return (
      Y.observe(),
      () => {
        Y.disconnect();
      }
    );
  }, [v]);
  const C = Z(t, '_activeTask'),
    S = Z(t, 'activeTask'),
    $ = Z(t, 'unscheduledTasks'),
    D = Z(t, 'links'),
    L = Z(t, 'splitTasks'),
    N = _(() => L && S?.segmentIndex, [L, S]),
    M = _(() => N || N === 0, [N]),
    O = _(() => ho(), [$]),
    H = Z(t, 'undo'),
    [T, V] = B({}),
    [ee, le] = B(null),
    [A, j] = B(),
    [te, E] = B(null),
    J = Z(t, 'taskTypes'),
    re = _(() => {
      if (!C) return null;
      let Y;
      if ((M && C.segments ? (Y = { ...C.segments[N] }) : (Y = { ...C }), s)) {
        let pe = { parent: Y.parent };
        return (
          O.forEach(({ key: ue, comp: oe }) => {
            if (oe !== 'links') {
              const Ie = Y[ue];
              oe === 'date' && Ie instanceof Date
                ? (pe[ue] = h(Ie))
                : oe === 'slider' && ue === 'progress'
                  ? (pe[ue] = `${Ie}%`)
                  : (pe[ue] = Ie);
            }
          }),
          pe
        );
      }
      return Y || null;
    }, [C, M, N, s, O, h]);
  P(() => {
    j(re);
  }, [re]),
    P(() => {
      V({}), E(null), le(null);
    }, [S]);
  function ne(Y, pe) {
    return Y.map((ue) => {
      const oe = { ...ue };
      if (
        (ue.config && (oe.config = { ...oe.config }),
        oe.comp === 'links' &&
          t &&
          ((oe.api = t), (oe.autoSave = a), (oe.onLinksChange = $e)),
        oe.comp === 'select' && oe.key === 'type')
      ) {
        const Ie = oe.options ?? (J || []);
        oe.options = Ie.map((Ke) => ({
          ...Ke,
          label: p(Ke.label),
        }));
      }
      return (
        oe.comp === 'slider' &&
          oe.key === 'progress' &&
          (oe.labelTemplate = (Ie) => `${p(oe.label)} ${Ie}%`),
        oe.label && (oe.label = p(oe.label)),
        oe.config?.placeholder &&
          (oe.config.placeholder = p(oe.config.placeholder)),
        pe &&
          (oe.isDisabled && oe.isDisabled(pe, t.getState())
            ? (oe.disabled = !0)
            : delete oe.disabled),
        oe
      );
    });
  }
  const fe = _(() => {
      let Y = e.length ? e : O;
      return (
        (Y = ne(Y, A)),
        A ? Y.filter((pe) => !pe.isHidden || !pe.isHidden(A, t.getState())) : Y
      );
    }, [e, O, A, J, p, t, a]),
    ve = _(() => fe.map((Y) => Y.key), [fe]);
  function $e({ id: Y, action: pe, data: ue }) {
    V((oe) => ({
      ...oe,
      [Y]: { action: pe, data: ue },
    }));
  }
  const G = R(() => {
      for (let Y in T)
        if (D.byId(Y)) {
          const { action: pe, data: ue } = T[Y];
          t.exec(pe, ue);
        }
    }, [t, T, D]),
    ie = R(() => {
      const Y = S?.id || S;
      if (M) {
        if (C?.segments) {
          const pe = C.segments.filter((ue, oe) => oe !== N);
          t.exec('update-task', {
            id: Y,
            task: { segments: pe },
          });
        }
      } else t.exec('delete-task', { id: Y });
    }, [t, S, M, C, N]),
    ae = R(() => {
      t.exec('show-editor', { id: null });
    }, [t]),
    de = R(
      (Y) => {
        const { item: pe, changes: ue } = Y;
        pe.id === 'delete' && ie(),
          pe.id === 'save' && (ue.length ? ae() : G()),
          pe.comp && ae();
      },
      [t, S, a, G, ie, ae],
    ),
    ze = R(
      (Y, pe, ue) => (
        $ && Y.type === 'summary' && (Y.unscheduled = !1),
        co(Y, t.getState(), pe),
        ue || le(!1),
        Y
      ),
      [$, t],
    ),
    De = R(
      (Y) => {
        (Y = {
          ...Y,
          unscheduled: $ && Y.unscheduled && Y.type !== 'summary',
        }),
          delete Y.links,
          delete Y.data,
          (ve.indexOf('duration') === -1 || (Y.segments && !Y.duration)) &&
            delete Y.duration;
        const pe = {
          id: S?.id || S,
          task: Y,
          ...(M && { segmentIndex: N }),
        };
        a && ee && (pe.inProgress = ee), t.exec('update-task', pe), a || G();
      },
      [t, S, $, a, G, ve, M, N, ee],
    ),
    _e = R(
      (Y) => {
        let { update: pe, key: ue, input: oe } = Y;
        if ((oe && le(!0), (Y.update = ze({ ...pe }, ue, oe)), !a)) j(Y.update);
        else if (!te && !oe) {
          const Ie = fe.find((Ae) => Ae.key === ue),
            Ke = pe[ue];
          (!Ie.validation || Ie.validation(Ke)) &&
            (!Ie.required || Ke) &&
            De(Y.update);
        }
      },
      [a, ze, te, fe, De],
    ),
    Me = R(
      (Y) => {
        a || De(Y.values);
      },
      [a, De],
    ),
    me = R((Y) => {
      E(Y.errors);
    }, []),
    Se = _(
      () =>
        H
          ? {
              'ctrl+z': (Y) => {
                Y.preventDefault(), t.exec('undo');
              },
              'ctrl+y': (Y) => {
                Y.preventDefault(), t.exec('redo');
              },
            }
          : {},
      [H, t],
    );
  return re
    ? /* @__PURE__ */ g(_n, {
        children: /* @__PURE__ */ g(bd, {
          css: `wx-XkvqDXuw wx-gantt-editor ${k} ${n}`,
          items: fe,
          values: re,
          topBar: x,
          bottomBar: i,
          placement: o,
          layout: r,
          readonly: s,
          autoSave: a,
          focus: c,
          onAction: de,
          onSave: Me,
          onValidation: me,
          onChange: _e,
          hotkeys: d && { ...Se, ...d },
        }),
      })
    : null;
}
const Td = ({ children: t, columns: e = null, api: n }) => {
  const [r, s] = B(null);
  return (
    P(() => {
      n && n.getTable(!0).then(s);
    }, [n]),
    /* @__PURE__ */ g(Yc, { api: r, columns: e, children: t })
  );
};
function Dd(t) {
  const { api: e, content: n, children: r } = t,
    s = W(null),
    o = W(null),
    [i, l] = B({}),
    [a, c] = B(null),
    [d, u] = B({});
  function f(v) {
    for (; v; ) {
      if (v.getAttribute) {
        const C = v.getAttribute('data-tooltip-id'),
          S = v.getAttribute('data-tooltip-at'),
          $ = v.getAttribute('data-tooltip');
        if (C || $) return { id: C, tooltip: $, target: v, at: S };
      }
      v = v.parentNode;
    }
    return { id: null, tooltip: null, target: null, at: null };
  }
  P(() => {
    const v = o.current;
    if (v && d && (d.text || n)) {
      const C = v.getBoundingClientRect();
      let S = !1,
        $ = d.left,
        D = d.top;
      C.right >= i.right && (($ = i.width - C.width - 5), (S = !0)),
        C.bottom >= i.bottom &&
          ((D = d.top - (C.bottom - i.bottom + 2)), (S = !0)),
        S && u((L) => L && { ...L, left: $, top: D });
    }
  }, [d, i, n]);
  const p = W(null),
    m = 300,
    h = (v) => {
      clearTimeout(p.current),
        (p.current = setTimeout(() => {
          v();
        }, m));
    };
  function x(v) {
    let { id: C, tooltip: S, target: $, at: D } = f(v.target);
    if ((u(null), c(null), !S))
      if (C) S = y(C);
      else {
        clearTimeout(p.current);
        return;
      }
    const L = v.clientX;
    h(() => {
      C && c(w(k(C)));
      const N = $.getBoundingClientRect(),
        M = s.current,
        O = M
          ? M.getBoundingClientRect()
          : { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
      let H, T;
      D === 'left'
        ? ((H = N.top + 5 - O.top), (T = N.right + 5 - O.left))
        : ((H = N.top + N.height - O.top), (T = L - O.left)),
        l(O),
        u({ top: H, left: T, text: S });
    });
  }
  function w(v) {
    return e?.getTask(k(v)) || null;
  }
  function y(v) {
    return w(v)?.text || '';
  }
  function k(v) {
    const C = parseInt(v);
    return isNaN(C) ? v : C;
  }
  return /* @__PURE__ */ K('div', {
    className: 'wx-KG0Lwsqo wx-tooltip-area',
    ref: s,
    onMouseMove: x,
    children: [
      d && (d.text || n)
        ? /* @__PURE__ */ g('div', {
            className: 'wx-KG0Lwsqo wx-gantt-tooltip',
            ref: o,
            style: { top: `${d.top}px`, left: `${d.left}px` },
            children: n
              ? /* @__PURE__ */ g(n, { data: a })
              : d.text
                ? /* @__PURE__ */ g('div', {
                    className: 'wx-KG0Lwsqo wx-gantt-tooltip-text',
                    children: d.text,
                  })
                : null,
          })
        : null,
      r,
    ],
  });
}
function Md({ fonts: t = !0, children: e }) {
  return e
    ? /* @__PURE__ */ g(Pr, { fonts: t, children: e() })
    : /* @__PURE__ */ g(Pr, { fonts: t });
}
function Ed({ fonts: t = !0, children: e }) {
  return e
    ? /* @__PURE__ */ g(Vr, { fonts: t, children: e })
    : /* @__PURE__ */ g(Vr, { fonts: t });
}
function Rd({ fonts: t = !0, children: e }) {
  return e
    ? /* @__PURE__ */ g(Gr, { fonts: t, children: e })
    : /* @__PURE__ */ g(Gr, { fonts: t });
}
const Pd = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
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
      defaultColumns: lo,
      defaultEditorItems: po,
      defaultMenuOptions: uo,
      defaultTaskTypes: go,
      defaultToolbarButtons: fo,
      getEditorItems: ho,
      getMenuOptions: er,
      getToolbarButtons: tr,
      registerEditorItem: Je,
      registerScaleUnit: zl,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export { Pd as default };
