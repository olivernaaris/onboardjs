'use client'
import $i, { memo as Et, useState as ae, useEffect as Qe, useMemo as Xe, useCallback as P, useRef as yt } from 'react'
import {
    Handle as ye,
    Position as Se,
    getSmoothStepPath as zi,
    useNodesState as Wi,
    useEdgesState as Ki,
    useReactFlow as ii,
    MarkerType as Me,
    ReactFlowProvider as Ji,
    ReactFlow as Yi,
    ConnectionLineType as Qi,
    Background as Xi,
    Controls as Zi,
    MiniMap as es,
} from '@xyflow/react'
import { StepJSONParser as Ut } from '@onboardjs/core'
import {
    InfoIcon as St,
    PuzzleIcon as ts,
    HandIcon as is,
    ListIcon as ss,
    ListChecksIcon as rs,
    CheckCircleIcon as as,
    WaypointsIcon as ns,
    GalleryHorizontalIcon as os,
    GalleryVerticalIcon as us,
    CogIcon as ls,
    FileJsonIcon as qt,
    CodeIcon as Ct,
    ImportIcon as cs,
    TrashIcon as Ie,
    XIcon as It,
    PlusIcon as Ge,
    GitBranchIcon as At,
    EyeIcon as hs,
} from 'lucide-react'
import Ze from 'dagre'
var Je = { exports: {} },
    Fe = {}
var Gt
function ps() {
    if (Gt) return Fe
    Gt = 1
    var e = Symbol.for('react.transitional.element'),
        t = Symbol.for('react.fragment')
    function i(s, r, o) {
        var u = null
        if ((o !== void 0 && (u = '' + o), r.key !== void 0 && (u = '' + r.key), 'key' in r)) {
            o = {}
            for (var l in r) l !== 'key' && (o[l] = r[l])
        } else o = r
        return (
            (r = o.ref),
            {
                $$typeof: e,
                type: s,
                key: u,
                ref: r !== void 0 ? r : null,
                props: o,
            }
        )
    }
    return ((Fe.Fragment = t), (Fe.jsx = i), (Fe.jsxs = i), Fe)
}
var De = {}
var Ht
function ds() {
    return (
        Ht ||
            ((Ht = 1),
            process.env.NODE_ENV !== 'production' &&
                (function () {
                    function e(h) {
                        if (h == null) return null
                        if (typeof h == 'function') return h.$$typeof === Ke ? null : h.displayName || h.name || null
                        if (typeof h == 'string') return h
                        switch (h) {
                            case S:
                                return 'Fragment'
                            case R:
                                return 'Profiler'
                            case k:
                                return 'StrictMode'
                            case ce:
                                return 'Suspense'
                            case V:
                                return 'SuspenseList'
                            case W:
                                return 'Activity'
                        }
                        if (typeof h == 'object')
                            switch (
                                (typeof h.tag == 'number' &&
                                    console.error(
                                        'Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.'
                                    ),
                                h.$$typeof)
                            ) {
                                case m:
                                    return 'Portal'
                                case H:
                                    return h.displayName || 'Context'
                                case Y:
                                    return (h._context.displayName || 'Context') + '.Consumer'
                                case ve:
                                    var _ = h.render
                                    return (
                                        (h = h.displayName),
                                        h ||
                                            ((h = _.displayName || _.name || ''),
                                            (h = h !== '' ? 'ForwardRef(' + h + ')' : 'ForwardRef')),
                                        h
                                    )
                                case B:
                                    return ((_ = h.displayName || null), _ !== null ? _ : e(h.type) || 'Memo')
                                case O:
                                    ;((_ = h._payload), (h = h._init))
                                    try {
                                        return e(h(_))
                                    } catch {}
                            }
                        return null
                    }
                    function t(h) {
                        return '' + h
                    }
                    function i(h) {
                        try {
                            t(h)
                            var _ = !1
                        } catch {
                            _ = !0
                        }
                        if (_) {
                            _ = console
                            var A = _.error,
                                F =
                                    (typeof Symbol == 'function' && Symbol.toStringTag && h[Symbol.toStringTag]) ||
                                    h.constructor.name ||
                                    'Object'
                            return (
                                A.call(
                                    _,
                                    'The provided key is an unsupported type %s. This value must be coerced to a string before using it here.',
                                    F
                                ),
                                t(h)
                            )
                        }
                    }
                    function s(h) {
                        if (h === S) return '<>'
                        if (typeof h == 'object' && h !== null && h.$$typeof === O) return '<...>'
                        try {
                            var _ = e(h)
                            return _ ? '<' + _ + '>' : '<...>'
                        } catch {
                            return '<...>'
                        }
                    }
                    function r() {
                        var h = Q.A
                        return h === null ? null : h.getOwner()
                    }
                    function o() {
                        return Error('react-stack-top-frame')
                    }
                    function u(h) {
                        if (xe.call(h, 'key')) {
                            var _ = Object.getOwnPropertyDescriptor(h, 'key').get
                            if (_ && _.isReactWarning) return !1
                        }
                        return h.key !== void 0
                    }
                    function l(h, _) {
                        function A() {
                            Ne ||
                                ((Ne = !0),
                                console.error(
                                    '%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)',
                                    _
                                ))
                        }
                        ;((A.isReactWarning = !0),
                            Object.defineProperty(h, 'key', {
                                get: A,
                                configurable: !0,
                            }))
                    }
                    function c() {
                        var h = e(this.type)
                        return (
                            me[h] ||
                                ((me[h] = !0),
                                console.error(
                                    'Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.'
                                )),
                            (h = this.props.ref),
                            h !== void 0 ? h : null
                        )
                    }
                    function d(h, _, A, F, Ee, Le) {
                        var M = A.ref
                        return (
                            (h = {
                                $$typeof: y,
                                type: h,
                                key: _,
                                props: A,
                                _owner: F,
                            }),
                            (M !== void 0 ? M : null) !== null
                                ? Object.defineProperty(h, 'ref', {
                                      enumerable: !1,
                                      get: c,
                                  })
                                : Object.defineProperty(h, 'ref', { enumerable: !1, value: null }),
                            (h._store = {}),
                            Object.defineProperty(h._store, 'validated', {
                                configurable: !1,
                                enumerable: !1,
                                writable: !0,
                                value: 0,
                            }),
                            Object.defineProperty(h, '_debugInfo', {
                                configurable: !1,
                                enumerable: !1,
                                writable: !0,
                                value: null,
                            }),
                            Object.defineProperty(h, '_debugStack', {
                                configurable: !1,
                                enumerable: !1,
                                writable: !0,
                                value: Ee,
                            }),
                            Object.defineProperty(h, '_debugTask', {
                                configurable: !1,
                                enumerable: !1,
                                writable: !0,
                                value: Le,
                            }),
                            Object.freeze && (Object.freeze(h.props), Object.freeze(h)),
                            h
                        )
                    }
                    function p(h, _, A, F, Ee, Le) {
                        var M = _.children
                        if (M !== void 0)
                            if (F)
                                if (he(M)) {
                                    for (F = 0; F < M.length; F++) f(M[F])
                                    Object.freeze && Object.freeze(M)
                                } else
                                    console.error(
                                        'React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.'
                                    )
                            else f(M)
                        if (xe.call(_, 'key')) {
                            M = e(h)
                            var be = Object.keys(_).filter(function (pt) {
                                return pt !== 'key'
                            })
                            ;((F =
                                0 < be.length ? '{key: someKey, ' + be.join(': ..., ') + ': ...}' : '{key: someKey}'),
                                ge[M + F] ||
                                    ((be = 0 < be.length ? '{' + be.join(': ..., ') + ': ...}' : '{}'),
                                    console.error(
                                        `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                                        F,
                                        M,
                                        be,
                                        M
                                    ),
                                    (ge[M + F] = !0)))
                        }
                        if (
                            ((M = null),
                            A !== void 0 && (i(A), (M = '' + A)),
                            u(_) && (i(_.key), (M = '' + _.key)),
                            'key' in _)
                        ) {
                            A = {}
                            for (var je in _) je !== 'key' && (A[je] = _[je])
                        } else A = _
                        return (
                            M && l(A, typeof h == 'function' ? h.displayName || h.name || 'Unknown' : h),
                            d(h, M, A, r(), Ee, Le)
                        )
                    }
                    function f(h) {
                        v(h)
                            ? h._store && (h._store.validated = 1)
                            : typeof h == 'object' &&
                              h !== null &&
                              h.$$typeof === O &&
                              (h._payload.status === 'fulfilled'
                                  ? v(h._payload.value) &&
                                    h._payload.value._store &&
                                    (h._payload.value._store.validated = 1)
                                  : h._store && (h._store.validated = 1))
                    }
                    function v(h) {
                        return typeof h == 'object' && h !== null && h.$$typeof === y
                    }
                    var x = $i,
                        y = Symbol.for('react.transitional.element'),
                        m = Symbol.for('react.portal'),
                        S = Symbol.for('react.fragment'),
                        k = Symbol.for('react.strict_mode'),
                        R = Symbol.for('react.profiler'),
                        Y = Symbol.for('react.consumer'),
                        H = Symbol.for('react.context'),
                        ve = Symbol.for('react.forward_ref'),
                        ce = Symbol.for('react.suspense'),
                        V = Symbol.for('react.suspense_list'),
                        B = Symbol.for('react.memo'),
                        O = Symbol.for('react.lazy'),
                        W = Symbol.for('react.activity'),
                        Ke = Symbol.for('react.client.reference'),
                        Q = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
                        xe = Object.prototype.hasOwnProperty,
                        he = Array.isArray,
                        ne = console.createTask
                            ? console.createTask
                            : function () {
                                  return null
                              }
                    x = {
                        react_stack_bottom_frame: function (h) {
                            return h()
                        },
                    }
                    var Ne,
                        me = {},
                        ke = x.react_stack_bottom_frame.bind(x, o)(),
                        se = ne(s(o)),
                        ge = {}
                    ;((De.Fragment = S),
                        (De.jsx = function (h, _, A) {
                            var F = 1e4 > Q.recentlyCreatedOwnerStacks++
                            return p(h, _, A, !1, F ? Error('react-stack-top-frame') : ke, F ? ne(s(h)) : se)
                        }),
                        (De.jsxs = function (h, _, A) {
                            var F = 1e4 > Q.recentlyCreatedOwnerStacks++
                            return p(h, _, A, !0, F ? Error('react-stack-top-frame') : ke, F ? ne(s(h)) : se)
                        }))
                })()),
        De
    )
}
var $t
function fs() {
    return (
        $t || (($t = 1), process.env.NODE_ENV === 'production' ? (Je.exports = ps()) : (Je.exports = ds())),
        Je.exports
    )
}
var a = fs()
const zt = {
    INFORMATION: 'vis:border-blue-500 vis:bg-blue-50',
    SINGLE_CHOICE: 'vis:border-green-500 vis:bg-green-50',
    MULTIPLE_CHOICE: 'vis:border-purple-500 vis:bg-purple-50',
    CHECKLIST: 'vis:border-amber-500 vis:bg-amber-50',
    CONFIRMATION: 'vis:border-orange-500 vis:bg-orange-50',
    CUSTOM_COMPONENT: 'vis:border-gray-500 vis:bg-gray-50',
}
function vs(e) {
    return zt[e] || zt.INFORMATION
}
const si = Et(({ data: e, selected: t }) => {
    const {
            stepType: i,
            label: s,
            description: r,
            isSkippable: o,
            hasCondition: u,
            isCompleted: l,
            errors: c = [],
        } = e,
        d = (f) => {
            const v = { className: 'vis:size-5' }
            switch (f) {
                case 'INFORMATION':
                    return /* @__PURE__ */ a.jsx(St, { ...v })
                case 'SINGLE_CHOICE':
                    return /* @__PURE__ */ a.jsx(as, { ...v })
                case 'MULTIPLE_CHOICE':
                    return /* @__PURE__ */ a.jsx(rs, { ...v })
                case 'CHECKLIST':
                    return /* @__PURE__ */ a.jsx(ss, { ...v })
                case 'CONFIRMATION':
                    return /* @__PURE__ */ a.jsx(is, { ...v })
                case 'CUSTOM_COMPONENT':
                    return /* @__PURE__ */ a.jsx(ts, { ...v })
                default:
                    return /* @__PURE__ */ a.jsx(St, { ...v })
            }
        },
        p = (f) => vs(f)
    return /* @__PURE__ */ a.jsxs('div', {
        className: `
        step-node vis:px-4 vis:py-3 vis:shadow-lg vis:rounded-lg vis:border-2 vis:bg-white vis:min-w-[200px] vis:max-w-[300px]
        ${p(i)}
        ${t ? 'vis:ring-2 vis:ring-blue-500 vis:ring-opacity-50' : ''}
        ${c.length > 0 ? 'vis:border-red-500 vis:bg-red-50' : ''}
      `,
        children: [
            /* @__PURE__ */ a.jsx(ye, {
                type: 'target',
                position: Se.Top,
                className: 'vis:w-3 vis:h-3 vis:border-2 vis:bg-white',
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:items-center vis:justify-between vis:mb-2 vis:gap-2',
                children: [
                    /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:flex vis:items-center vis:gap-2',
                        children: [
                            d(i),
                            /* @__PURE__ */ a.jsx('span', {
                                className: 'vis:font-medium vis:text-sm vis:text-gray-700',
                                children: i.replace('_', ' '),
                            }),
                        ],
                    }),
                    /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:flex vis:gap-1',
                        children: [
                            o &&
                                /* @__PURE__ */ a.jsx('span', {
                                    className:
                                        'vis:px-1 vis:py-0.5 vis:bg-yellow-100 vis:text-yellow-700 vis:text-xs vis:rounded',
                                    children: 'Skip',
                                }),
                            u &&
                                /* @__PURE__ */ a.jsx('span', {
                                    className:
                                        'vis:px-1 vis:py-0.5 vis:bg-blue-100 vis:text-blue-700 vis:text-xs vis:rounded',
                                    children: 'Cond',
                                }),
                            l &&
                                /* @__PURE__ */ a.jsx('span', {
                                    className:
                                        'vis:px-1 vis:py-0.5 vis:bg-green-100 vis:text-green-700 vis:text-xs vis:rounded',
                                    children: '✓',
                                }),
                        ],
                    }),
                ],
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:space-y-1',
                children: [
                    /* @__PURE__ */ a.jsx('h3', {
                        className: 'vis:font-semibold vis:text-gray-900 vis:text-sm vis:leading-tight',
                        children: s,
                    }),
                    r &&
                        /* @__PURE__ */ a.jsx('p', {
                            className: 'vis:text-gray-600 vis:text-xs vis:leading-tight vis:line-clamp-2',
                            children: r,
                        }),
                ],
            }),
            c.length > 0 &&
                /* @__PURE__ */ a.jsxs('div', {
                    className: 'vis:mt-2 vis:p-1 vis:bg-red-100 vis:rounded vis:text-xs vis:text-red-700',
                    children: [
                        /* @__PURE__ */ a.jsx('div', { className: 'vis:font-medium', children: 'Errors:' }),
                        /* @__PURE__ */ a.jsx('ul', {
                            className: 'vis:list-disc vis:list-inside',
                            children: c
                                .slice(0, 2)
                                .map((f, v) =>
                                    /* @__PURE__ */ a.jsx('li', { className: 'vis:truncate', children: f }, v)
                                ),
                        }),
                        c.length > 2 &&
                            /* @__PURE__ */ a.jsxs('div', {
                                className: 'vis:text-center',
                                children: ['+ ', c.length - 2, ' more'],
                            }),
                    ],
                }),
            /* @__PURE__ */ a.jsx(ye, {
                type: 'source',
                position: Se.Bottom,
                id: 'next',
                className: 'vis:size-3 vis:border-2 vis:bg-white',
                style: { left: '50%' },
            }),
            /* @__PURE__ */ a.jsx(ye, {
                type: 'source',
                position: Se.Right,
                id: 'skip',
                className: 'vis:size-3 vis:border-2 vis:bg-yellow-400',
            }),
            /* @__PURE__ */ a.jsx(ye, {
                type: 'source',
                position: Se.Left,
                id: 'previous',
                className: 'vis:size-3 vis:border-2 vis:bg-gray-400',
            }),
        ],
    })
})
si.displayName = 'StepNode'
function xs({
    id: e,
    sourceX: t,
    sourceY: i,
    targetX: s,
    targetY: r,
    sourcePosition: o,
    targetPosition: u,
    data: l,
    label: c,
    markerEnd: d,
}) {
    const [p, f, v] = zi({
            sourceX: t,
            sourceY: i,
            sourcePosition: o,
            targetX: s,
            targetY: r,
            targetPosition: u,
        }),
        x = l?.edgeType || 'next',
        y = () => {
            switch (x) {
                case 'skip':
                    return { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5,5' }
                case 'previous':
                    return { stroke: '#6b7280', strokeWidth: 2, strokeDasharray: '3,3' }
                case 'conditional':
                    return { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '8,4' }
                default:
                    return { stroke: '#1f2937', strokeWidth: 2 }
            }
        }
    return /* @__PURE__ */ a.jsxs(a.Fragment, {
        children: [
            /* @__PURE__ */ a.jsx('path', {
                id: e,
                style: y(),
                className: 'react-flow__edge-path',
                d: p,
                markerEnd: d,
            }),
            c &&
                /* @__PURE__ */ a.jsx('text', {
                    x: f,
                    y: v,
                    className: 'react-flow__edge-text',
                    style: { fontSize: '12px', fill: '#374151' },
                    textAnchor: 'middle',
                    dominantBaseline: 'middle',
                    children: /* @__PURE__ */ a.jsx('tspan', {
                        x: f,
                        dy: '0',
                        style: {
                            fill: '#fff',
                            stroke: '#374151',
                            strokeWidth: '3px',
                            paintOrder: 'stroke fill',
                        },
                        children: c,
                    }),
                }),
        ],
    })
}
function ms({
    onExport: e,
    onImport: t,
    onClear: i,
    onLayout: s,
    onToggleSidebar: r,
    exportOptions: o,
    onExportOptionsChange: u,
    typeScriptExportOptions: l,
    onTypeScriptExportOptionsChange: c,
    readonly: d = !1,
    stepCount: p,
}) {
    const [f, v] = ae(!1),
        [x, y] = ae('json')
    return /* @__PURE__ */ a.jsxs('div', {
        className:
            'flow-toolbar vis:bg-white vis:border-b vis:border-gray-200 vis:px-4 vis:py-2 vis:flex vis:items-center vis:justify-between',
        children: [
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:items-center vis:gap-2',
                children: [
                    /* @__PURE__ */ a.jsx('button', {
                        onClick: r,
                        className: 'vis:p-2 vis:hover:bg-gray-100 vis:rounded-md vis:transition-colors',
                        title: 'Toggle Sidebar',
                        children: /* @__PURE__ */ a.jsx(ns, { className: 'vis:w-5 vis:h-5' }),
                    }),
                    /* @__PURE__ */ a.jsx('div', { className: 'vis:h-6 vis:w-px vis:bg-gray-300' }),
                    /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:flex vis:gap-1',
                        children: [
                            /* @__PURE__ */ a.jsx('button', {
                                onClick: () => s('TB'),
                                className: 'vis:p-2 vis:hover:bg-gray-100 vis:rounded-md vis:transition-colors',
                                title: 'Layout Vertically',
                                children: /* @__PURE__ */ a.jsx(os, { className: 'vis:w-5 vis:h-5 vis:rotate-0' }),
                            }),
                            /* @__PURE__ */ a.jsx('button', {
                                onClick: () => s('LR'),
                                className: 'vis:p-2 vis:hover:bg-gray-100 vis:rounded-md vis:transition-colors',
                                title: 'Layout Horizontally',
                                children: /* @__PURE__ */ a.jsx(us, { className: 'vis:w-5 vis:h-5' }),
                            }),
                        ],
                    }),
                ],
            }),
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:flex vis:items-center vis:gap-4',
                children: /* @__PURE__ */ a.jsxs('span', {
                    className: 'vis:text-sm vis:text-gray-600',
                    children: [p, ' step', p !== 1 ? 's' : ''],
                }),
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:items-center vis:gap-2',
                children: [
                    /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:relative',
                        children: [
                            /* @__PURE__ */ a.jsx('button', {
                                onClick: () => v(!f),
                                className: 'vis:p-2 vis:hover:bg-gray-100 vis:rounded-md vis:transition-colors',
                                title: 'Export Options',
                                children: /* @__PURE__ */ a.jsx(ls, { className: 'vis:w-5 vis:h-5' }),
                            }),
                            f &&
                                /* @__PURE__ */ a.jsxs('div', {
                                    className:
                                        'vis:absolute vis:top-full vis:right-0 vis:mt-1 vis:bg-white vis:border vis:border-gray-200 vis:rounded-md vis:shadow-lg vis:z-50 vis:p-4 vis:min-w-[320px]',
                                    children: [
                                        /* @__PURE__ */ a.jsx('h3', {
                                            className: 'vis:font-medium vis:text-sm vis:mb-3',
                                            children: 'Export Options',
                                        }),
                                        /* @__PURE__ */ a.jsx('div', {
                                            className: 'vis:space-y-3 vis:mb-4',
                                            children: /* @__PURE__ */ a.jsxs('div', {
                                                children: [
                                                    /* @__PURE__ */ a.jsx('label', {
                                                        className:
                                                            'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-2',
                                                        children: 'Export Format',
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('div', {
                                                        className: 'vis:flex vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsxs('label', {
                                                                className:
                                                                    'vis:flex vis:items-center vis:gap-2 vis:cursor-pointer',
                                                                children: [
                                                                    /* @__PURE__ */ a.jsx('input', {
                                                                        type: 'radio',
                                                                        value: 'json',
                                                                        checked: x === 'json',
                                                                        onChange: (m) => y(m.target.value),
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx(qt, {
                                                                        className: 'vis:w-4 vis:h-4',
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx('span', {
                                                                        className: 'vis:text-sm',
                                                                        children: 'JSON',
                                                                    }),
                                                                ],
                                                            }),
                                                            /* @__PURE__ */ a.jsxs('label', {
                                                                className:
                                                                    'vis:flex vis:items-center vis:gap-2 vis:cursor-pointer',
                                                                children: [
                                                                    /* @__PURE__ */ a.jsx('input', {
                                                                        type: 'radio',
                                                                        value: 'typescript',
                                                                        checked: x === 'typescript',
                                                                        onChange: (m) => y(m.target.value),
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx(Ct, {
                                                                        className: 'vis:w-4 vis:h-4',
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx('span', {
                                                                        className: 'vis:text-sm',
                                                                        children: 'TypeScript',
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        }),
                                        x === 'json' &&
                                            /* @__PURE__ */ a.jsxs('div', {
                                                className: 'vis:space-y-3 vis:border-t vis:pt-3',
                                                children: [
                                                    /* @__PURE__ */ a.jsx('h4', {
                                                        className: 'vis:text-sm vis:font-medium vis:text-gray-700',
                                                        children: 'JSON Options',
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: o.prettyPrint,
                                                                onChange: (m) =>
                                                                    u({
                                                                        ...o,
                                                                        prettyPrint: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Pretty print JSON',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: o.includeMeta,
                                                                onChange: (m) =>
                                                                    u({
                                                                        ...o,
                                                                        includeMeta: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Include metadata',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('div', {
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('label', {
                                                                className: 'vis:block vis:text-sm vis:mb-1',
                                                                children: 'Function handling:',
                                                            }),
                                                            /* @__PURE__ */ a.jsxs('select', {
                                                                value: o.functionHandling,
                                                                onChange: (m) =>
                                                                    u({
                                                                        ...o,
                                                                        functionHandling: m.target.value,
                                                                    }),
                                                                className:
                                                                    'vis:w-full vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-sm',
                                                                children: [
                                                                    /* @__PURE__ */ a.jsx('option', {
                                                                        value: 'serialize',
                                                                        children: 'Serialize',
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx('option', {
                                                                        value: 'omit',
                                                                        children: 'Omit',
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx('option', {
                                                                        value: 'placeholder',
                                                                        children: 'Placeholder',
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        x === 'typescript' &&
                                            /* @__PURE__ */ a.jsxs('div', {
                                                className: 'vis:space-y-3 vis:border-t vis:pt-3',
                                                children: [
                                                    /* @__PURE__ */ a.jsx('h4', {
                                                        className: 'vis:text-sm vis:font-medium vis:text-gray-700',
                                                        children: 'TypeScript Options',
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('div', {
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('label', {
                                                                className: 'vis:block vis:text-sm vis:mb-1',
                                                                children: 'Variable name:',
                                                            }),
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'text',
                                                                value: l.variableName || 'onboardingSteps',
                                                                onChange: (m) =>
                                                                    c({
                                                                        ...l,
                                                                        variableName: m.target.value,
                                                                    }),
                                                                className:
                                                                    'vis:w-full vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-sm',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: l.includeImports !== !1,
                                                                onChange: (m) =>
                                                                    c({
                                                                        ...l,
                                                                        includeImports: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Include imports',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: l.includeTypes !== !1,
                                                                onChange: (m) =>
                                                                    c({
                                                                        ...l,
                                                                        includeTypes: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Include type annotations',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: l.includeComments !== !1,
                                                                onChange: (m) =>
                                                                    c({
                                                                        ...l,
                                                                        includeComments: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Include comments',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: l.inlineFunctions === !0,
                                                                onChange: (m) =>
                                                                    c({
                                                                        ...l,
                                                                        inlineFunctions: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Inline functions',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('label', {
                                                        className: 'vis:flex vis:items-center vis:gap-2',
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('input', {
                                                                type: 'checkbox',
                                                                checked: l.includeValidation === !0,
                                                                onChange: (m) =>
                                                                    c({
                                                                        ...l,
                                                                        includeValidation: m.target.checked,
                                                                    }),
                                                            }),
                                                            /* @__PURE__ */ a.jsx('span', {
                                                                className: 'vis:text-sm',
                                                                children: 'Include validation helpers',
                                                            }),
                                                        ],
                                                    }),
                                                    /* @__PURE__ */ a.jsxs('div', {
                                                        children: [
                                                            /* @__PURE__ */ a.jsx('label', {
                                                                className: 'vis:block vis:text-sm vis:mb-1',
                                                                children: 'Indentation:',
                                                            }),
                                                            /* @__PURE__ */ a.jsxs('select', {
                                                                value: `${l.indentation || 'spaces'}-${l.spacesCount || 2}`,
                                                                onChange: (m) => {
                                                                    const [S, k] = m.target.value.split('-')
                                                                    c({
                                                                        ...l,
                                                                        indentation: S,
                                                                        spacesCount: parseInt(k),
                                                                    })
                                                                },
                                                                className:
                                                                    'vis:w-full vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-sm',
                                                                children: [
                                                                    /* @__PURE__ */ a.jsx('option', {
                                                                        value: 'spaces-2',
                                                                        children: '2 Spaces',
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx('option', {
                                                                        value: 'spaces-4',
                                                                        children: '4 Spaces',
                                                                    }),
                                                                    /* @__PURE__ */ a.jsx('option', {
                                                                        value: 'tabs-0',
                                                                        children: 'Tabs',
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                    ],
                                }),
                        ],
                    }),
                    /* @__PURE__ */ a.jsxs('button', {
                        onClick: t,
                        className:
                            'vis:flex vis:items-center vis:gap-2 vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:hover:bg-gray-50 vis:transition-colors',
                        title: 'Import Flow',
                        children: [/* @__PURE__ */ a.jsx(cs, { className: 'vis:w-4 vis:h-4' }), 'Import'],
                    }),
                    /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:flex vis:gap-1',
                        children: [
                            /* @__PURE__ */ a.jsxs('button', {
                                onClick: () => e('json'),
                                className:
                                    'vis:flex vis:items-center vis:gap-2 vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:hover:bg-gray-50 vis:transition-colors',
                                title: 'Export as JSON',
                                children: [/* @__PURE__ */ a.jsx(qt, { className: 'vis:w-4 vis:h-4' }), 'JSON'],
                            }),
                            /* @__PURE__ */ a.jsxs('button', {
                                onClick: () => e('typescript'),
                                className:
                                    'vis:flex vis:items-center vis:gap-2 vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:hover:bg-gray-50 vis:transition-colors',
                                title: 'Export as TypeScript',
                                children: [/* @__PURE__ */ a.jsx(Ct, { className: 'vis:w-4 vis:h-4' }), 'TS'],
                            }),
                        ],
                    }),
                    !d &&
                        /* @__PURE__ */ a.jsxs(a.Fragment, {
                            children: [
                                /* @__PURE__ */ a.jsx('div', { className: 'vis:h-6 vis:w-px vis:bg-gray-300' }),
                                /* @__PURE__ */ a.jsxs('button', {
                                    onClick: i,
                                    className:
                                        'vis:flex vis:items-center vis:gap-2 vis:px-3 vis:py-2 vis:text-red-600 vis:border vis:border-red-300 vis:rounded-md vis:hover:bg-red-50 vis:transition-colors',
                                    title: 'Clear Flow',
                                    children: [/* @__PURE__ */ a.jsx(Ie, { className: 'vis:w-4 vis:h-4' }), 'Clear'],
                                }),
                            ],
                        }),
                ],
            }),
        ],
    })
}
function gs({ steps: e, onStepSelect: t, onStepAdd: i, onStepDelete: s, onClose: r, readonly: o = !1 }) {
    return /* @__PURE__ */ a.jsxs('div', {
        className:
            'flow-sidebar vis:bg-white vis:border-l vis:border-gray-200 vis:w-80 vis:h-full vis:overflow-hidden vis:flex vis:flex-col',
        children: [
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:items-center vis:justify-between vis:p-4 vis:border-b vis:border-gray-200',
                children: [
                    /* @__PURE__ */ a.jsx('h2', {
                        className: 'vis:font-semibold vis:text-gray-900',
                        children: 'Steps',
                    }),
                    /* @__PURE__ */ a.jsx('button', {
                        onClick: r,
                        className: 'vis:p-1 hover:vis:bg-gray-100 vis:rounded-md vis:transition-colors',
                        children: /* @__PURE__ */ a.jsx(It, { className: 'vis:w-5 vis:h-5' }),
                    }),
                ],
            }),
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:flex-1 vis:overflow-y-auto',
                children:
                    e.length === 0
                        ? /* @__PURE__ */ a.jsxs('div', {
                              className: 'vis:p-4 vis:text-center vis:text-gray-500',
                              children: [
                                  /* @__PURE__ */ a.jsx('p', { children: 'No steps yet' }),
                                  !o &&
                                      /* @__PURE__ */ a.jsx('button', {
                                          onClick: () => i(),
                                          className: 'vis:mt-2 vis:text-blue-500 vis:hover:text-blue-600',
                                          children: 'Add your first step',
                                      }),
                              ],
                          })
                        : /* @__PURE__ */ a.jsx('div', {
                              className: 'vis:p-2 vis:space-y-1',
                              children: e.map((u, l) =>
                                  /* @__PURE__ */ a.jsxs(
                                      'div',
                                      {
                                          className:
                                              'vis:group vis:flex vis:items-center vis:gap-2 vis:p-3 vis:rounded-lg vis:hover:bg-gray-50 vis:cursor-pointer vis:border vis:border-transparent vis:hover:border-gray-200',
                                          onClick: () => t(u),
                                          children: [
                                              /* @__PURE__ */ a.jsx('div', {
                                                  className:
                                                      'vis:flex-shrink-0 vis:size-8 vis:bg-blue-100 vis:text-blue-600 vis:rounded-full vis:flex vis:items-center vis:justify-center vis:text-sm vis:font-medium',
                                                  children: l + 1,
                                              }),
                                              /* @__PURE__ */ a.jsxs('div', {
                                                  className: 'vis:flex-1 vis:min-w-0',
                                                  children: [
                                                      /* @__PURE__ */ a.jsx('div', {
                                                          className:
                                                              'vis:font-medium vis:text-sm vis:text-gray-900 vis:truncate',
                                                          children: bs(u),
                                                      }),
                                                      /* @__PURE__ */ a.jsxs('div', {
                                                          className: 'vis:text-xs vis:text-gray-500 vis:truncate',
                                                          children: [u.type || 'INFORMATION', ' • ID: ', u.id],
                                                      }),
                                                      u.isSkippable &&
                                                          /* @__PURE__ */ a.jsx('div', {
                                                              className: 'vis:text-xs vis:text-yellow-600',
                                                              children: 'Skippable',
                                                          }),
                                                  ],
                                              }),
                                              !o &&
                                                  /* @__PURE__ */ a.jsx('button', {
                                                      onClick: (c) => {
                                                          ;(c.stopPropagation(), s(u.id))
                                                      },
                                                      className:
                                                          'vis:opacity-0 vis:group-hover:opacity-100 vis:p-1 vis:hover:bg-red-100 vis:text-red-500 vis:rounded vis:transition-all',
                                                      title: 'Delete step',
                                                      children: /* @__PURE__ */ a.jsx(Ie, { className: 'vis:size-4' }),
                                                  }),
                                          ],
                                      },
                                      u.id
                                  )
                              ),
                          }),
            }),
            !o &&
                /* @__PURE__ */ a.jsx('div', {
                    className: 'vis:p-4 vis:border-t vis:border-gray-200',
                    children: /* @__PURE__ */ a.jsxs('button', {
                        onClick: () => i(),
                        className:
                            'vis:w-full vis:flex vis:items-center vis:justify-center vis:gap-2 vis:px-4 vis:py-2 vis:bg-blue-500 vis:text-white vis:rounded-md vis:hover:bg-blue-600 vis:transition-colors',
                        children: [/* @__PURE__ */ a.jsx(Ge, { className: 'vis:w-4 vis:h-4' }), 'Add Step'],
                    }),
                }),
        ],
    })
}
function bs(e) {
    const t = e.payload
    return t?.title
        ? t.title
        : t?.label
          ? t.label
          : t?.question
            ? t.question
            : t?.componentKey
              ? t.componentKey
              : `Step ${e.id}`
}
const ys = [
    {
        type: 'step',
        stepType: 'INFORMATION',
        id: 'information',
        label: 'Step',
        description: 'Basic Step',
        icon: /* @__PURE__ */ a.jsx(St, { className: 'vis:size-5' }),
        color: 'vis:text-blue-600 vis:bg-blue-50 vis:border-blue-200',
    },
    {
        type: 'condition',
        id: 'condition',
        label: 'Condition',
        description: 'Add conditional branching',
        icon: /* @__PURE__ */ a.jsx(At, { className: 'vis:size-5' }),
        color: 'vis:text-indigo-600 vis:bg-indigo-50 vis:border-indigo-200',
    },
]
function Ss() {
    const e = (t, i) => {
        ;(t.dataTransfer.setData(
            'application/reactflow',
            JSON.stringify({
                type: i.type,
                stepType: i.stepType,
                label: i.label,
            })
        ),
            (t.dataTransfer.effectAllowed = 'move'))
    }
    return /* @__PURE__ */ a.jsxs('div', {
        className:
            'node-palette vis:bg-white vis:border-r vis:border-gray-200 vis:w-96 vis:h-full vis:flex vis:flex-col vis:shadow-sm',
        children: [
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:flex vis:items-center vis:justify-between vis:p-4 vis:border-b vis:border-gray-200',
                children: /* @__PURE__ */ a.jsxs('div', {
                    children: [
                        /* @__PURE__ */ a.jsx('h2', {
                            className: 'vis:font-semibold vis:text-gray-900',
                            children: 'Node Palette',
                        }),
                        /* @__PURE__ */ a.jsx('p', {
                            className: 'vis:text-xs vis:text-gray-500 vis:mt-1',
                            children: 'Drag nodes to add them to your flow',
                        }),
                    ],
                }),
            }),
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:flex-1 vis:overflow-y-auto vis:px-3 vis:py-4',
                children: /* @__PURE__ */ a.jsx('div', {
                    className: 'vis:space-y-6',
                    children: ys.map((t) =>
                        /* @__PURE__ */ a.jsx(
                            'div',
                            {
                                draggable: !0,
                                onDragStart: (i) => e(i, t),
                                className: `
                                vis:p-3 vis:rounded-lg vis:border-2 vis:border-dashed vis:cursor-move vis:transition-all
                                vis:hover:shadow-md vis:hover:scale-105 vis:select-none
                                ${t.color}
                            `,
                                title: `Drag to add ${t.label}`,
                                children: /* @__PURE__ */ a.jsxs('div', {
                                    className: 'vis:flex vis:items-start vis:gap-3',
                                    children: [
                                        /* @__PURE__ */ a.jsx('div', {
                                            className: 'vis:flex-shrink-0 vis:mt-0.5',
                                            children: t.icon,
                                        }),
                                        /* @__PURE__ */ a.jsxs('div', {
                                            className: 'vis:flex-1 vis:min-w-0',
                                            children: [
                                                /* @__PURE__ */ a.jsx('div', {
                                                    className: 'vis:font-medium vis:text-sm',
                                                    children: t.label,
                                                }),
                                                /* @__PURE__ */ a.jsx('div', {
                                                    className: 'vis:text-xs vis:opacity-75 vis:mt-1 vis:leading-tight',
                                                    children: t.description,
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            },
                            t.id
                        )
                    ),
                }),
            }),
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:p-4 vis:border-t vis:border-gray-200 vis:bg-gray-50',
                children: /* @__PURE__ */ a.jsxs('div', {
                    className: 'vis:text-xs vis:text-gray-600 vis:space-y-1',
                    children: [
                        /* @__PURE__ */ a.jsxs('div', {
                            className: 'vis:flex vis:items-center vis:gap-2',
                            children: [
                                /* @__PURE__ */ a.jsx('div', {
                                    className: 'vis:w-2 vis:h-2 vis:bg-indigo-500 vis:rounded-full',
                                }),
                                /* @__PURE__ */ a.jsx('span', { children: 'Drag nodes onto the canvas' }),
                            ],
                        }),
                        /* @__PURE__ */ a.jsxs('div', {
                            className: 'vis:flex vis:items-center vis:gap-2',
                            children: [
                                /* @__PURE__ */ a.jsx('div', {
                                    className: 'vis:w-2 vis:h-2 vis:bg-green-500 vis:rounded-full',
                                }),
                                /* @__PURE__ */ a.jsx('span', { children: 'Connect nodes to create flows' }),
                            ],
                        }),
                        /* @__PURE__ */ a.jsxs('div', {
                            className: 'vis:flex vis:items-center vis:gap-2',
                            children: [
                                /* @__PURE__ */ a.jsx('div', {
                                    className: 'vis:w-2 vis:h-2 vis:bg-blue-500 vis:rounded-full',
                                }),
                                /* @__PURE__ */ a.jsx('span', { children: 'Click nodes to edit properties' }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    })
}
function Cs({ options: e, onChange: t, readonly: i }) {
    const s = (u, l, c) => {
            const d = [...e]
            ;((d[u] = { ...d[u], [l]: c }), t(d))
        },
        r = () => {
            const u = `opt_${Date.now()}`
            t([...e, { id: u, label: 'New Option', value: u }])
        },
        o = (u) => {
            t(e.filter((l, c) => c !== u))
        }
    return /* @__PURE__ */ a.jsxs('div', {
        className: 'vis:space-y-3',
        children: [
            /* @__PURE__ */ a.jsxs('label', {
                className: 'vis:block vis:text-sm vis:font-medium vis:text-gray-700',
                children: ['Options (', e.length, ')'],
            }),
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:space-y-2',
                children: e.map((u, l) =>
                    /* @__PURE__ */ a.jsxs(
                        'div',
                        {
                            className: 'vis:p-2 vis:border vis:border-gray-200 vis:rounded-md vis:space-y-2',
                            children: [
                                /* @__PURE__ */ a.jsxs('div', {
                                    className: 'vis:flex vis:items-center vis:gap-2',
                                    children: [
                                        /* @__PURE__ */ a.jsx('input', {
                                            type: 'text',
                                            placeholder: 'Label',
                                            value: u.label,
                                            onChange: (c) => s(l, 'label', c.target.value),
                                            disabled: i,
                                            className:
                                                'vis:flex-1 vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                        }),
                                        /* @__PURE__ */ a.jsx('button', {
                                            onClick: () => o(l),
                                            disabled: i,
                                            className:
                                                'vis:p-1 vis:text-red-500 vis:hover:bg-red-100 vis:rounded-md vis:disabled:opacity-50',
                                            children: /* @__PURE__ */ a.jsx(Ie, { className: 'vis:size-4' }),
                                        }),
                                    ],
                                }),
                                /* @__PURE__ */ a.jsx('input', {
                                    type: 'text',
                                    placeholder: 'Value',
                                    value: String(u.value),
                                    onChange: (c) => s(l, 'value', c.target.value),
                                    disabled: i,
                                    className:
                                        'vis:w-full vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                }),
                            ],
                        },
                        u.id
                    )
                ),
            }),
            !i &&
                /* @__PURE__ */ a.jsxs('button', {
                    onClick: r,
                    className:
                        'vis:w-full vis:flex vis:items-center vis:justify-center vis:gap-2 vis:px-3 vis:py-2 vis:text-sm vis:text-blue-600 vis:border vis:border-dashed vis:border-gray-300 vis:rounded-md vis:hover:bg-blue-50',
                    children: [/* @__PURE__ */ a.jsx(Ge, { className: 'vis:w-4 vis:h-4' }), 'Add Option'],
                }),
        ],
    })
}
function _s({ items: e, onChange: t, readonly: i }) {
    const s = (u, l, c) => {
            const d = [...e]
            ;((d[u] = { ...d[u], [l]: c }), t(d))
        },
        r = () => {
            const u = `item_${Date.now()}`
            t([...e, { id: u, label: 'New Item', isMandatory: !1 }])
        },
        o = (u) => {
            t(e.filter((l, c) => c !== u))
        }
    return /* @__PURE__ */ a.jsxs('div', {
        className: 'vis:space-y-3',
        children: [
            /* @__PURE__ */ a.jsxs('label', {
                className: 'vis:block vis:text-sm vis:font-medium vis:text-gray-700',
                children: ['Items (', e.length, ')'],
            }),
            /* @__PURE__ */ a.jsx('div', {
                className: 'vis:space-y-2',
                children: e.map((u, l) =>
                    /* @__PURE__ */ a.jsxs(
                        'div',
                        {
                            className: 'vis:p-2 vis:border vis:border-gray-200 vis:rounded-md vis:space-y-2',
                            children: [
                                /* @__PURE__ */ a.jsxs('div', {
                                    className: 'vis:flex vis:items-center vis:gap-2',
                                    children: [
                                        /* @__PURE__ */ a.jsx('input', {
                                            type: 'text',
                                            placeholder: 'Label',
                                            value: u.label,
                                            onChange: (c) => s(l, 'label', c.target.value),
                                            disabled: i,
                                            className:
                                                'vis:flex-1 vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                        }),
                                        /* @__PURE__ */ a.jsx('button', {
                                            onClick: () => o(l),
                                            disabled: i,
                                            className:
                                                'vis:p-1 vis:text-red-500 hover:vis:bg-red-100 vis:rounded-md vis:disabled:opacity-50',
                                            children: /* @__PURE__ */ a.jsx(Ie, { className: 'vis:size-4' }),
                                        }),
                                    ],
                                }),
                                /* @__PURE__ */ a.jsxs('label', {
                                    className: 'vis:flex vis:items-center vis:gap-2 vis:text-sm vis:text-gray-600',
                                    children: [
                                        /* @__PURE__ */ a.jsx('input', {
                                            type: 'checkbox',
                                            checked: u.isMandatory,
                                            onChange: (c) => s(l, 'isMandatory', c.target.checked),
                                            disabled: i,
                                        }),
                                        'Mandatory',
                                    ],
                                }),
                            ],
                        },
                        u.id
                    )
                ),
            }),
            !i &&
                /* @__PURE__ */ a.jsxs('button', {
                    onClick: r,
                    className:
                        'vis:w-full vis:flex vis:items-center vis:justify-center vis:gap-2 vis:px-3 vis:py-2 vis:text-sm vis:text-blue-600 vis:border vis:border-dashed vis:border-gray-300 vis:rounded-md hover:vis:bg-blue-50',
                    children: [/* @__PURE__ */ a.jsx(Ge, { className: 'vis:size-4' }), 'Add Item'],
                }),
        ],
    })
}
function ws({ node: e, onNodeUpdate: t, onClose: i, readonly: s = !1 }) {
    const [r, o] = ae(e),
        [u, l] = ae(!1)
    Qe(() => {
        ;(o(e), l(!1))
    }, [e])
    const c = (v) => {
            const x = {
                ...r,
                ...v,
                data: {
                    ...r.data,
                    ...v.data,
                },
            }
            ;(o(x), l(JSON.stringify(x) !== JSON.stringify(e)))
        },
        d = () => {
            ;(t(r), l(!1))
        },
        p = (v) => {
            c({
                data: {
                    ...r.data,
                    payload: {
                        ...(r.data && typeof r.data.payload == 'object' && r.data.payload !== null
                            ? r.data.payload
                            : {}),
                        ...v,
                    },
                },
            })
        },
        f = r.data?.stepType || 'INFORMATION'
    return /* @__PURE__ */ a.jsxs('div', {
        className:
            'step-details-panel vis:bg-white vis:border-l vis:border-gray-200 vis:w-108 vis:h-full vis:overflow-hidden vis:flex vis:flex-col',
        children: [
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:items-center vis:justify-between vis:p-4 vis:border-b vis:border-gray-200',
                children: [
                    /* @__PURE__ */ a.jsx('h2', {
                        className: 'vis:font-semibold vis:text-gray-900',
                        children: 'Step Details',
                    }),
                    /* @__PURE__ */ a.jsx('button', {
                        onClick: i,
                        className: 'vis:p-1 hover:vis:bg-gray-100 vis:rounded-md vis:transition-colors',
                        children: /* @__PURE__ */ a.jsx(It, { className: 'vis:w-5 vis:h-5' }),
                    }),
                ],
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex-1 vis:overflow-y-auto vis:p-4 vis:space-y-6',
                children: [
                    /* @__PURE__ */ a.jsxs('div', {
                        children: [
                            /* @__PURE__ */ a.jsx('h3', {
                                className: 'vis:font-medium vis:text-gray-900 vis:mb-3',
                                children: 'Basic Information',
                            }),
                            /* @__PURE__ */ a.jsxs('div', {
                                className: 'vis:space-y-3',
                                children: [
                                    /* @__PURE__ */ a.jsxs('div', {
                                        children: [
                                            /* @__PURE__ */ a.jsx('label', {
                                                className:
                                                    'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                                children: 'Step ID',
                                            }),
                                            /* @__PURE__ */ a.jsx('input', {
                                                type: 'text',
                                                value: r.id,
                                                onChange: (v) => c({ id: v.target.value }),
                                                disabled: s,
                                                className:
                                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                            }),
                                        ],
                                    }),
                                    /* @__PURE__ */ a.jsxs('div', {
                                        children: [
                                            /* @__PURE__ */ a.jsx('label', {
                                                className:
                                                    'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                                children: 'Step Name',
                                            }),
                                            /* @__PURE__ */ a.jsx('input', {
                                                type: 'text',
                                                value: r.data?.label || '',
                                                onChange: (v) => c({ data: { label: v.target.value } }),
                                                disabled: s,
                                                className:
                                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                            }),
                                        ],
                                    }),
                                    /* @__PURE__ */ a.jsxs('div', {
                                        children: [
                                            /* @__PURE__ */ a.jsx('label', {
                                                className:
                                                    'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                                children: 'Step Type',
                                            }),
                                            /* @__PURE__ */ a.jsxs('select', {
                                                value: f,
                                                onChange: (v) => c({ data: { stepType: v.target.value } }),
                                                disabled: s,
                                                className:
                                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                                children: [
                                                    /* @__PURE__ */ a.jsx('option', {
                                                        value: 'INFORMATION',
                                                        children: 'Information',
                                                    }),
                                                    /* @__PURE__ */ a.jsx('option', {
                                                        value: 'SINGLE_CHOICE',
                                                        children: 'Single Choice',
                                                    }),
                                                    /* @__PURE__ */ a.jsx('option', {
                                                        value: 'MULTIPLE_CHOICE',
                                                        children: 'Multiple Choice',
                                                    }),
                                                    /* @__PURE__ */ a.jsx('option', {
                                                        value: 'CHECKLIST',
                                                        children: 'Checklist',
                                                    }),
                                                    /* @__PURE__ */ a.jsx('option', {
                                                        value: 'CONFIRMATION',
                                                        children: 'Confirmation',
                                                    }),
                                                    /* @__PURE__ */ a.jsx('option', {
                                                        value: 'CUSTOM_COMPONENT',
                                                        children: 'Custom Component',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /* @__PURE__ */ a.jsx('div', {
                                        children: /* @__PURE__ */ a.jsxs('label', {
                                            className: 'vis:flex vis:items-center vis:gap-2',
                                            children: [
                                                /* @__PURE__ */ a.jsx('input', {
                                                    type: 'checkbox',
                                                    checked: r.data.isSkippable || !1,
                                                    onChange: (v) => c({ data: { isSkippable: v.target.checked } }),
                                                    disabled: s,
                                                }),
                                                /* @__PURE__ */ a.jsx('span', {
                                                    className: 'vis:text-sm vis:font-medium vis:text-gray-700',
                                                    children: 'Skippable',
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    f !== 'INFORMATION' &&
                        /* @__PURE__ */ a.jsxs('div', {
                            children: [
                                /* @__PURE__ */ a.jsx('h3', {
                                    className: 'vis:font-medium vis:text-gray-900 vis:mb-3',
                                    children: 'Payload',
                                }),
                                /* @__PURE__ */ a.jsx(Ns, {
                                    stepType: f,
                                    payload: r.data.payload || {},
                                    onChange: p,
                                    readonly: s,
                                }),
                            ],
                        }),
                    /* @__PURE__ */ a.jsxs('div', {
                        children: [
                            /* @__PURE__ */ a.jsx('h3', {
                                className: 'vis:font-medium vis:text-gray-900 vis:mb-3',
                                children: 'Navigation',
                            }),
                            /* @__PURE__ */ a.jsxs('div', {
                                className: 'vis:space-y-3',
                                children: [
                                    /* @__PURE__ */ a.jsxs('div', {
                                        children: [
                                            /* @__PURE__ */ a.jsx('label', {
                                                className:
                                                    'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                                children: 'Next Step ID',
                                            }),
                                            /* @__PURE__ */ a.jsx('input', {
                                                type: 'text',
                                                value:
                                                    typeof r.data.nextStep == 'function'
                                                        ? '[Function]'
                                                        : String(r.data.nextStep || ''),
                                                onChange: (v) => c({ data: { nextStep: v.target.value || void 0 } }),
                                                disabled: s || typeof r.data.nextStep == 'function',
                                                placeholder: 'Auto (next in sequence)',
                                                className:
                                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                            }),
                                        ],
                                    }),
                                    /* @__PURE__ */ a.jsxs('div', {
                                        children: [
                                            /* @__PURE__ */ a.jsx('label', {
                                                className:
                                                    'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                                children: 'Previous Step ID',
                                            }),
                                            /* @__PURE__ */ a.jsx('input', {
                                                type: 'text',
                                                value:
                                                    typeof r.data.previousStep == 'function'
                                                        ? '[Function]'
                                                        : String(r.data.previousStep || ''),
                                                onChange: (v) =>
                                                    c({
                                                        data: { previousStep: v.target.value || void 0 },
                                                    }),
                                                disabled: s || typeof r.data.previousStep == 'function',
                                                placeholder: 'Auto (previous in sequence)',
                                                className:
                                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                            }),
                                        ],
                                    }),
                                    r.data.isSkippable &&
                                        /* @__PURE__ */ a.jsxs('div', {
                                            children: [
                                                /* @__PURE__ */ a.jsx('label', {
                                                    className:
                                                        'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                                    children: 'Skip To Step ID',
                                                }),
                                                /* @__PURE__ */ a.jsx('input', {
                                                    type: 'text',
                                                    value:
                                                        typeof r.data.skipToStep == 'function'
                                                            ? '[Function]'
                                                            : String(r.data.skipToStep),
                                                    onChange: (v) =>
                                                        c({
                                                            data: { skipToStep: v.target.value || void 0 },
                                                        }),
                                                    disabled: s || typeof r.data.skipToStep == 'function',
                                                    placeholder: 'Auto (next step)',
                                                    className:
                                                        'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                                                }),
                                            ],
                                        }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            !s &&
                u &&
                /* @__PURE__ */ a.jsx('div', {
                    className: 'vis:border-t vis:border-gray-200 vis:p-4',
                    children: /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:flex vis:gap-2',
                        children: [
                            /* @__PURE__ */ a.jsx('button', {
                                onClick: d,
                                className:
                                    'vis:flex-1 vis:px-4 vis:py-2 vis:bg-blue-500 vis:text-white vis:rounded-md vis:hover:bg-blue-600 vis:transition-colors',
                                children: 'Save Changes',
                            }),
                            /* @__PURE__ */ a.jsx('button', {
                                onClick: () => {
                                    ;(o(e), l(!1))
                                },
                                className:
                                    'vis:px-4 vis:py-2 vis:border vis:border-gray-300 vis:text-gray-700 vis:rounded-md vis:hover:bg-gray-50 vis:transition-colors',
                                children: 'Cancel',
                            }),
                        ],
                    }),
                }),
        ],
    })
}
function Ns({ stepType: e, payload: t, onChange: i, readonly: s }) {
    switch (e) {
        case 'SINGLE_CHOICE':
        case 'MULTIPLE_CHOICE':
            return /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:space-y-4',
                children: [
                    /* @__PURE__ */ a.jsxs('div', {
                        children: [
                            /* @__PURE__ */ a.jsx('label', {
                                className: 'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                children: 'Data Key',
                            }),
                            /* @__PURE__ */ a.jsx('input', {
                                type: 'text',
                                value: t.dataKey || '',
                                onChange: (r) => i({ dataKey: r.target.value }),
                                disabled: s,
                                className:
                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                            }),
                        ],
                    }),
                    /* @__PURE__ */ a.jsx(Cs, {
                        options: t.options || [],
                        onChange: (r) => i({ options: r }),
                        readonly: s,
                    }),
                ],
            })
        case 'CHECKLIST':
            return /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:space-y-4',
                children: [
                    /* @__PURE__ */ a.jsxs('div', {
                        children: [
                            /* @__PURE__ */ a.jsx('label', {
                                className: 'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                children: 'Data Key',
                            }),
                            /* @__PURE__ */ a.jsx('input', {
                                type: 'text',
                                value: t.dataKey || '',
                                onChange: (r) => i({ dataKey: r.target.value }),
                                disabled: s,
                                className:
                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                            }),
                        ],
                    }),
                    /* @__PURE__ */ a.jsxs('div', {
                        children: [
                            /* @__PURE__ */ a.jsx('label', {
                                className: 'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                                children: 'Min Items to Complete',
                            }),
                            /* @__PURE__ */ a.jsx('input', {
                                type: 'number',
                                value: t.minItemsToComplete || '',
                                onChange: (r) =>
                                    i({
                                        minItemsToComplete: r.target.value ? parseInt(r.target.value) : void 0,
                                    }),
                                disabled: s,
                                className:
                                    'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                            }),
                        ],
                    }),
                    /* @__PURE__ */ a.jsx(_s, {
                        items: t.items || [],
                        onChange: (r) => i({ items: r }),
                        readonly: s,
                    }),
                ],
            })
        case 'CUSTOM_COMPONENT':
            return /* @__PURE__ */ a.jsxs('div', {
                children: [
                    /* @__PURE__ */ a.jsx('label', {
                        className: 'vis:block vis:text-sm vis:font-medium vis:text-gray-700 vis:mb-1',
                        children: 'Component Key',
                    }),
                    /* @__PURE__ */ a.jsx('input', {
                        type: 'text',
                        value: t.componentKey || '',
                        onChange: (r) => i({ componentKey: r.target.value }),
                        disabled: s,
                        className:
                            'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:disabled:bg-gray-50',
                    }),
                ],
            })
        default:
            return /* @__PURE__ */ a.jsx('div', {
                className: 'vis:text-sm vis:text-gray-500',
                children: 'No specific payload configuration for this step type',
            })
    }
}
class Wt {
    validate(t) {
        if (typeof t != 'string') return !1
        const i = t.trim()
        return !i || i.length < 3
            ? !1
            : /[\w.]|===|!==|==|!=|>|<|\?|\(|\)|!/.test(i)
              ? !0
              : (console.warn('Input string appears to be invalid condition syntax'), !1)
    }
    sanitize(t) {
        return t.replace(/eval|Function|setTimeout|setInterval/g, '')
    }
}
class ks {
    validate(t) {
        if (typeof t != 'function') return !1
        const i = t.toString()
        return !i.includes('=>') && !i.includes('function')
            ? (console.warn('Input function appears malformed'), !1)
            : !i.includes('context') && !i.includes('return') && i.length < 10
              ? (console.warn('Function may not contain valid condition logic'), !1)
              : !0
    }
}
class Es {
    validate(t) {
        return typeof t == 'number'
    }
}
class Is {
    _validators = [new Wt(), new ks(), new Es()]
    validate(t) {
        return typeof t > 'u' || t === null ? !1 : this._validators.some((i) => i.validate(t))
    }
    sanitize(t) {
        const i = this._validators.find((s) => s instanceof Wt)
        return i ? i.sanitize(t) : t
    }
}
class ri {
    getEmptyResult() {
        return [
            {
                id: this.generateId(),
                logic: 'AND',
                rules: [],
            },
        ]
    }
}
class As {
    extract(t) {
        if (!t) return ''
        let i = t
        const s = []
        let r = ''
        for (; i; ) {
            if (i.type === 'ChainExpression') {
                i = i.expression
                continue
            }
            if (i.type === 'MemberExpression') {
                if ((this._extractMemberProperty(i, s), (i = i.object), i?.type === 'ThisExpression')) {
                    r = 'this'
                    break
                }
            } else {
                i.type === 'Identifier' && (r = i.name)
                break
            }
        }
        const o = [r, ...s].filter(Boolean).join('.')
        return this._normalizeFieldPath(o)
    }
    _extractMemberProperty(t, i) {
        t.computed && t.property
            ? this._extractComputedProperty(t.property, i)
            : t.property?.type === 'Identifier'
              ? i.unshift(t.property.name)
              : t.property?.type === 'Literal' && i.unshift(String(t.property.value))
    }
    _extractComputedProperty(t, i) {
        if (t.type === 'Literal') i.unshift(`[${t.value}]`)
        else if (t.type === 'Identifier') i.unshift(`['${t.name}']`)
        else if (t.type === 'TemplateLiteral' && t.expressions.length === 0) {
            const s = t.quasis[0].value.cooked
            i.unshift(`['${s}']`)
        }
    }
    _normalizeFieldPath(t) {
        return t.startsWith('context.') ? t.replace('context.', '').replace(/^flowData\./, '') : t
    }
}
const js = 'context.flowData?.',
    Ts = {
        AND: '&&',
        OR: '||',
    },
    Ps = {
        '===': 'equals',
        '!==': 'not_equals',
        '==': 'equals',
        '!=': 'not_equals',
        '>': 'greater_than',
        '<': 'less_than',
        '>=': 'greater_than',
        '<=': 'less_than',
    },
    Rs = ['+', '-', '*', '/'],
    Kt = ['true', 'false', 'null', 'undefined']
class Os {
    extract(t) {
        if (t)
            switch (t.type) {
                case 'Literal':
                    return t.value
                case 'Identifier':
                    return this._handleIdentifier(t)
                case 'TemplateLiteral':
                    return this._handleTemplateLiteral(t)
                case 'BinaryExpression':
                    return this._handleMathExpression(t)
                case 'ArrayExpression':
                    return JSON.stringify(t.elements.map((i) => this.extract(i)))
                case 'ObjectExpression':
                    return this._handleObjectExpression(t)
                default:
                    throw new Error(`Unsupported literal node: ${t.type}`)
            }
    }
    _handleIdentifier(t) {
        const i = t.name
        return Kt.includes(i) ? this._evaluateSpecialValue(i) : i
    }
    _handleTemplateLiteral(t) {
        if (t.expressions.length === 0) return t.quasis[0].value.cooked
        if (t.expressions.length === 1 && t.quasis.length === 2) {
            const i = t.expressions[0]
            if (i.type === 'Identifier' && Kt.includes(i.name))
                return t.quasis[0].value.cooked.replace(
                    /\$\{${expr.name}\}/,
                    String(this._evaluateSpecialValue(i.name))
                )
        }
        return t.quasis.map((i) => i.value.cooked).join('')
    }
    _handleMathExpression(t) {
        if (!Rs.includes(t.operator)) throw new Error(`Unsafe math operator: ${t.operator}`)
        const i = this.extract(t.left),
            s = this.extract(t.right)
        if (i !== void 0 && s !== void 0 && typeof i == 'number' && typeof s == 'number')
            try {
                switch (t.operator) {
                    case '+':
                        return i + s
                    case '-':
                        return i - s
                    case '*':
                        return i * s
                    case '/':
                        return i / s
                }
            } catch {
                throw new Error('Math evaluation failed')
            }
        throw new Error('Invalid operands for math expression')
    }
    _handleObjectExpression(t) {
        const i = {}
        return (
            t.properties.forEach((s) => {
                s.type === 'Property' &&
                    s.key.type === 'Identifier' &&
                    s.value &&
                    (i[s.key.name] = this.extract(s.value))
            }),
            JSON.stringify(i)
        )
    }
    _evaluateSpecialValue(t) {
        switch (t) {
            case 'true':
                return !0
            case 'false':
                return !1
            case 'null':
                return null
            case 'undefined':
                return
            default:
                return t
        }
    }
    getValueType(t) {
        return t === null || typeof t == 'string'
            ? 'string'
            : typeof t == 'number' && !isNaN(t)
              ? 'number'
              : typeof t == 'boolean'
                ? 'boolean'
                : 'string'
    }
}
var Vs = [
        509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80,
        3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13,
        2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4,
        4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16,
        16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6,
        4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1,
        2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27,
        2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3,
        22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2,
        16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759,
        9, 787719, 239,
    ],
    ai = [
        0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35,
        5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51,
        13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1,
        11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18,
        14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47,
        20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0,
        36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0,
        13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3,
        37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95,
        7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29,
        113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110,
        18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3,
        32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2,
        1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1,
        3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2,
        24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19,
        43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0,
        2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3,
        3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16,
        621, 2467, 541, 1507, 4938, 6, 4191,
    ],
    Ls =
        '‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･',
    ni =
        'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ',
    ft = {
        3: 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile',
        5: 'class enum extends super const export import',
        6: 'enum',
        strict: 'implements interface let package private protected public static yield',
        strictBind: 'eval arguments',
    },
    vt =
        'break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this',
    Fs = {
        5: vt,
        '5module': vt + ' export import',
        6: vt + ' const class extends export import super',
    },
    Ds = /^in(stanceof)?$/,
    Bs = new RegExp('[' + ni + ']'),
    Ms = new RegExp('[' + ni + Ls + ']')
function _t(e, t) {
    for (var i = 65536, s = 0; s < t.length; s += 2) {
        if (((i += t[s]), i > e)) return !1
        if (((i += t[s + 1]), i >= e)) return !0
    }
    return !1
}
function oe(e, t) {
    return e < 65
        ? e === 36
        : e < 91
          ? !0
          : e < 97
            ? e === 95
            : e < 123
              ? !0
              : e <= 65535
                ? e >= 170 && Bs.test(String.fromCharCode(e))
                : t === !1
                  ? !1
                  : _t(e, ai)
}
function _e(e, t) {
    return e < 48
        ? e === 36
        : e < 58
          ? !0
          : e < 65
            ? !1
            : e < 91
              ? !0
              : e < 97
                ? e === 95
                : e < 123
                  ? !0
                  : e <= 65535
                    ? e >= 170 && Ms.test(String.fromCharCode(e))
                    : t === !1
                      ? !1
                      : _t(e, ai) || _t(e, Vs)
}
var j = function (t, i) {
    ;(i === void 0 && (i = {}),
        (this.label = t),
        (this.keyword = i.keyword),
        (this.beforeExpr = !!i.beforeExpr),
        (this.startsExpr = !!i.startsExpr),
        (this.isLoop = !!i.isLoop),
        (this.isAssign = !!i.isAssign),
        (this.prefix = !!i.prefix),
        (this.postfix = !!i.postfix),
        (this.binop = i.binop || null),
        (this.updateContext = null))
}
function X(e, t) {
    return new j(e, { beforeExpr: !0, binop: t })
}
var Z = { beforeExpr: !0 },
    K = { startsExpr: !0 },
    jt = {}
function I(e, t) {
    return (t === void 0 && (t = {}), (t.keyword = e), (jt[e] = new j(e, t)))
}
var n = {
        num: new j('num', K),
        regexp: new j('regexp', K),
        string: new j('string', K),
        name: new j('name', K),
        privateId: new j('privateId', K),
        eof: new j('eof'),
        // Punctuation token types.
        bracketL: new j('[', { beforeExpr: !0, startsExpr: !0 }),
        bracketR: new j(']'),
        braceL: new j('{', { beforeExpr: !0, startsExpr: !0 }),
        braceR: new j('}'),
        parenL: new j('(', { beforeExpr: !0, startsExpr: !0 }),
        parenR: new j(')'),
        comma: new j(',', Z),
        semi: new j(';', Z),
        colon: new j(':', Z),
        dot: new j('.'),
        question: new j('?', Z),
        questionDot: new j('?.'),
        arrow: new j('=>', Z),
        template: new j('template'),
        invalidTemplate: new j('invalidTemplate'),
        ellipsis: new j('...', Z),
        backQuote: new j('`', K),
        dollarBraceL: new j('${', { beforeExpr: !0, startsExpr: !0 }),
        // Operators. These carry several kinds of properties to help the
        // parser use them properly (the presence of these properties is
        // what categorizes them as operators).
        //
        // `binop`, when present, specifies that this operator is a binary
        // operator, and will refer to its precedence.
        //
        // `prefix` and `postfix` mark the operator as a prefix or postfix
        // unary operator.
        //
        // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
        // binary operators with a very low precedence, that should result
        // in AssignmentExpression nodes.
        eq: new j('=', { beforeExpr: !0, isAssign: !0 }),
        assign: new j('_=', { beforeExpr: !0, isAssign: !0 }),
        incDec: new j('++/--', { prefix: !0, postfix: !0, startsExpr: !0 }),
        prefix: new j('!/~', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
        logicalOR: X('||', 1),
        logicalAND: X('&&', 2),
        bitwiseOR: X('|', 3),
        bitwiseXOR: X('^', 4),
        bitwiseAND: X('&', 5),
        equality: X('==/!=/===/!==', 6),
        relational: X('</>/<=/>=', 7),
        bitShift: X('<</>>/>>>', 8),
        plusMin: new j('+/-', { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
        modulo: X('%', 10),
        star: X('*', 10),
        slash: X('/', 10),
        starstar: new j('**', { beforeExpr: !0 }),
        coalesce: X('??', 1),
        // Keyword token types.
        _break: I('break'),
        _case: I('case', Z),
        _catch: I('catch'),
        _continue: I('continue'),
        _debugger: I('debugger'),
        _default: I('default', Z),
        _do: I('do', { isLoop: !0, beforeExpr: !0 }),
        _else: I('else', Z),
        _finally: I('finally'),
        _for: I('for', { isLoop: !0 }),
        _function: I('function', K),
        _if: I('if'),
        _return: I('return', Z),
        _switch: I('switch'),
        _throw: I('throw', Z),
        _try: I('try'),
        _var: I('var'),
        _const: I('const'),
        _while: I('while', { isLoop: !0 }),
        _with: I('with'),
        _new: I('new', { beforeExpr: !0, startsExpr: !0 }),
        _this: I('this', K),
        _super: I('super', K),
        _class: I('class', K),
        _extends: I('extends', Z),
        _export: I('export'),
        _import: I('import', K),
        _null: I('null', K),
        _true: I('true', K),
        _false: I('false', K),
        _in: I('in', { beforeExpr: !0, binop: 7 }),
        _instanceof: I('instanceof', { beforeExpr: !0, binop: 7 }),
        _typeof: I('typeof', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
        _void: I('void', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
        _delete: I('delete', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
    },
    J = /\r\n?|\n|\u2028|\u2029/,
    Us = new RegExp(J.source, 'g')
function Pe(e) {
    return e === 10 || e === 13 || e === 8232 || e === 8233
}
function oi(e, t, i) {
    i === void 0 && (i = e.length)
    for (var s = t; s < i; s++) {
        var r = e.charCodeAt(s)
        if (Pe(r)) return s < i - 1 && r === 13 && e.charCodeAt(s + 1) === 10 ? s + 2 : s + 1
    }
    return -1
}
var ui = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
    $ = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
    li = Object.prototype,
    qs = li.hasOwnProperty,
    Gs = li.toString,
    Re =
        Object.hasOwn ||
        function (e, t) {
            return qs.call(e, t)
        },
    Jt =
        Array.isArray ||
        function (e) {
            return Gs.call(e) === '[object Array]'
        },
    Yt = /* @__PURE__ */ Object.create(null)
function Ce(e) {
    return Yt[e] || (Yt[e] = new RegExp('^(?:' + e.replace(/ /g, '|') + ')$'))
}
function pe(e) {
    return e <= 65535
        ? String.fromCharCode(e)
        : ((e -= 65536), String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320))
}
var Hs = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,
    He = function (t, i) {
        ;((this.line = t), (this.column = i))
    }
He.prototype.offset = function (t) {
    return new He(this.line, this.column + t)
}
var nt = function (t, i, s) {
    ;((this.start = i), (this.end = s), t.sourceFile !== null && (this.source = t.sourceFile))
}
function ci(e, t) {
    for (var i = 1, s = 0; ; ) {
        var r = oi(e, s, t)
        if (r < 0) return new He(i, t - s)
        ;(++i, (s = r))
    }
}
var wt = {
        // `ecmaVersion` indicates the ECMAScript version to parse. Must be
        // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
        // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
        // (the latest version the library supports). This influences
        // support for strict mode, the set of reserved words, and support
        // for new syntax features.
        ecmaVersion: null,
        // `sourceType` indicates the mode the code should be parsed in.
        // Can be either `"script"` or `"module"`. This influences global
        // strict mode and parsing of `import` and `export` declarations.
        sourceType: 'script',
        // `onInsertedSemicolon` can be a callback that will be called when
        // a semicolon is automatically inserted. It will be passed the
        // position of the inserted semicolon as an offset, and if
        // `locations` is enabled, it is given the location as a `{line,
        // column}` object as second argument.
        onInsertedSemicolon: null,
        // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
        // trailing commas.
        onTrailingComma: null,
        // By default, reserved words are only enforced if ecmaVersion >= 5.
        // Set `allowReserved` to a boolean value to explicitly turn this on
        // an off. When this option has the value "never", reserved words
        // and keywords can also not be used as property names.
        allowReserved: null,
        // When enabled, a return at the top level is not considered an
        // error.
        allowReturnOutsideFunction: !1,
        // When enabled, import/export statements are not constrained to
        // appearing at the top of the program, and an import.meta expression
        // in a script isn't considered an error.
        allowImportExportEverywhere: !1,
        // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
        // When enabled, await identifiers are allowed to appear at the top-level scope,
        // but they are still not allowed in non-async functions.
        allowAwaitOutsideFunction: null,
        // When enabled, super identifiers are not constrained to
        // appearing in methods and do not raise an error when they appear elsewhere.
        allowSuperOutsideMethod: null,
        // When enabled, hashbang directive in the beginning of file is
        // allowed and treated as a line comment. Enabled by default when
        // `ecmaVersion` >= 2023.
        allowHashBang: !1,
        // By default, the parser will verify that private properties are
        // only used in places where they are valid and have been declared.
        // Set this to false to turn such checks off.
        checkPrivateFields: !0,
        // When `locations` is on, `loc` properties holding objects with
        // `start` and `end` properties in `{line, column}` form (with
        // line being 1-based and column 0-based) will be attached to the
        // nodes.
        locations: !1,
        // A function can be passed as `onToken` option, which will
        // cause Acorn to call that function with object in the same
        // format as tokens returned from `tokenizer().getToken()`. Note
        // that you are not allowed to call the parser from the
        // callback—that will corrupt its internal state.
        onToken: null,
        // A function can be passed as `onComment` option, which will
        // cause Acorn to call that function with `(block, text, start,
        // end)` parameters whenever a comment is skipped. `block` is a
        // boolean indicating whether this is a block (`/* */`) comment,
        // `text` is the content of the comment, and `start` and `end` are
        // character offsets that denote the start and end of the comment.
        // When the `locations` option is on, two more parameters are
        // passed, the full `{line, column}` locations of the start and
        // end of the comments. Note that you are not allowed to call the
        // parser from the callback—that will corrupt its internal state.
        // When this option has an array as value, objects representing the
        // comments are pushed to it.
        onComment: null,
        // Nodes have their start and end characters offsets recorded in
        // `start` and `end` properties (directly on the node, rather than
        // the `loc` object, which holds line/column data. To also add a
        // [semi-standardized][range] `range` property holding a `[start,
        // end]` array with the same numbers, set the `ranges` option to
        // `true`.
        //
        // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
        ranges: !1,
        // It is possible to parse multiple files into a single AST by
        // passing the tree produced by parsing the first file as
        // `program` option in subsequent parses. This will add the
        // toplevel forms of the parsed file to the `Program` (top) node
        // of an existing parse tree.
        program: null,
        // When `locations` is on, you can pass this to record the source
        // file in every node's `loc` object.
        sourceFile: null,
        // This value, if given, is stored in every node, whether
        // `locations` is on or off.
        directSourceFile: null,
        // When enabled, parenthesized expressions are represented by
        // (non-standard) ParenthesizedExpression nodes
        preserveParens: !1,
    },
    Qt = !1
function $s(e) {
    var t = {}
    for (var i in wt) t[i] = e && Re(e, i) ? e[i] : wt[i]
    if (
        (t.ecmaVersion === 'latest'
            ? (t.ecmaVersion = 1e8)
            : t.ecmaVersion == null
              ? (!Qt &&
                    typeof console == 'object' &&
                    console.warn &&
                    ((Qt = !0),
                    console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),
                (t.ecmaVersion = 11))
              : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
        t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5),
        (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14),
        Jt(t.onToken))
    ) {
        var s = t.onToken
        t.onToken = function (r) {
            return s.push(r)
        }
    }
    return (Jt(t.onComment) && (t.onComment = zs(t, t.onComment)), t)
}
function zs(e, t) {
    return function (i, s, r, o, u, l) {
        var c = {
            type: i ? 'Block' : 'Line',
            value: s,
            start: r,
            end: o,
        }
        ;(e.locations && (c.loc = new nt(this, u, l)), e.ranges && (c.range = [r, o]), t.push(c))
    }
}
var $e = 1,
    Oe = 2,
    Tt = 4,
    hi = 8,
    Pt = 16,
    pi = 32,
    ot = 64,
    di = 128,
    Ae = 256,
    ze = 512,
    ut = $e | Oe | Ae
function Rt(e, t) {
    return Oe | (e ? Tt : 0) | (t ? hi : 0)
}
var et = 0,
    Ot = 1,
    fe = 2,
    fi = 3,
    vi = 4,
    xi = 5,
    q = function (t, i, s) {
        ;((this.options = t = $s(t)),
            (this.sourceFile = t.sourceFile),
            (this.keywords = Ce(Fs[t.ecmaVersion >= 6 ? 6 : t.sourceType === 'module' ? '5module' : 5])))
        var r = ''
        ;(t.allowReserved !== !0 &&
            ((r = ft[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3]),
            t.sourceType === 'module' && (r += ' await')),
            (this.reservedWords = Ce(r)))
        var o = (r ? r + ' ' : '') + ft.strict
        ;((this.reservedWordsStrict = Ce(o)),
            (this.reservedWordsStrictBind = Ce(o + ' ' + ft.strictBind)),
            (this.input = String(i)),
            (this.containsEsc = !1),
            s
                ? ((this.pos = s),
                  (this.lineStart =
                      this.input.lastIndexOf(
                          `
`,
                          s - 1
                      ) + 1),
                  (this.curLine = this.input.slice(0, this.lineStart).split(J).length))
                : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
            (this.type = n.eof),
            (this.value = null),
            (this.start = this.end = this.pos),
            (this.startLoc = this.endLoc = this.curPosition()),
            (this.lastTokEndLoc = this.lastTokStartLoc = null),
            (this.lastTokStart = this.lastTokEnd = this.pos),
            (this.context = this.initialContext()),
            (this.exprAllowed = !0),
            (this.inModule = t.sourceType === 'module'),
            (this.strict = this.inModule || this.strictDirective(this.pos)),
            (this.potentialArrowAt = -1),
            (this.potentialArrowInForAwait = !1),
            (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
            (this.labels = []),
            (this.undefinedExports = /* @__PURE__ */ Object.create(null)),
            this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === '#!' && this.skipLineComment(2),
            (this.scopeStack = []),
            this.enterScope($e),
            (this.regexpState = null),
            (this.privateNameStack = []))
    },
    ue = {
        inFunction: { configurable: !0 },
        inGenerator: { configurable: !0 },
        inAsync: { configurable: !0 },
        canAwait: { configurable: !0 },
        allowSuper: { configurable: !0 },
        allowDirectSuper: { configurable: !0 },
        treatFunctionsAsVar: { configurable: !0 },
        allowNewDotTarget: { configurable: !0 },
        inClassStaticBlock: { configurable: !0 },
    }
q.prototype.parse = function () {
    var t = this.options.program || this.startNode()
    return (this.nextToken(), this.parseTopLevel(t))
}
ue.inFunction.get = function () {
    return (this.currentVarScope().flags & Oe) > 0
}
ue.inGenerator.get = function () {
    return (this.currentVarScope().flags & hi) > 0
}
ue.inAsync.get = function () {
    return (this.currentVarScope().flags & Tt) > 0
}
ue.canAwait.get = function () {
    for (var e = this.scopeStack.length - 1; e >= 0; e--) {
        var t = this.scopeStack[e],
            i = t.flags
        if (i & (Ae | ze)) return !1
        if (i & Oe) return (i & Tt) > 0
    }
    return (this.inModule && this.options.ecmaVersion >= 13) || this.options.allowAwaitOutsideFunction
}
ue.allowSuper.get = function () {
    var e = this.currentThisScope(),
        t = e.flags
    return (t & ot) > 0 || this.options.allowSuperOutsideMethod
}
ue.allowDirectSuper.get = function () {
    return (this.currentThisScope().flags & di) > 0
}
ue.treatFunctionsAsVar.get = function () {
    return this.treatFunctionsAsVarInScope(this.currentScope())
}
ue.allowNewDotTarget.get = function () {
    for (var e = this.scopeStack.length - 1; e >= 0; e--) {
        var t = this.scopeStack[e],
            i = t.flags
        if (i & (Ae | ze) || (i & Oe && !(i & Pt))) return !0
    }
    return !1
}
ue.inClassStaticBlock.get = function () {
    return (this.currentVarScope().flags & Ae) > 0
}
q.extend = function () {
    for (var t = [], i = arguments.length; i--; ) t[i] = arguments[i]
    for (var s = this, r = 0; r < t.length; r++) s = t[r](s)
    return s
}
q.parse = function (t, i) {
    return new this(i, t).parse()
}
q.parseExpressionAt = function (t, i, s) {
    var r = new this(s, t, i)
    return (r.nextToken(), r.parseExpression())
}
q.tokenizer = function (t, i) {
    return new this(i, t)
}
Object.defineProperties(q.prototype, ue)
var z = q.prototype,
    Ws = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/
z.strictDirective = function (e) {
    if (this.options.ecmaVersion < 5) return !1
    for (;;) {
        ;(($.lastIndex = e), (e += $.exec(this.input)[0].length))
        var t = Ws.exec(this.input.slice(e))
        if (!t) return !1
        if ((t[1] || t[2]) === 'use strict') {
            $.lastIndex = e + t[0].length
            var i = $.exec(this.input),
                s = i.index + i[0].length,
                r = this.input.charAt(s)
            return (
                r === ';' ||
                r === '}' ||
                (J.test(i[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(r) || (r === '!' && this.input.charAt(s + 1) === '=')))
            )
        }
        ;((e += t[0].length), ($.lastIndex = e), (e += $.exec(this.input)[0].length), this.input[e] === ';' && e++)
    }
}
z.eat = function (e) {
    return this.type === e ? (this.next(), !0) : !1
}
z.isContextual = function (e) {
    return this.type === n.name && this.value === e && !this.containsEsc
}
z.eatContextual = function (e) {
    return this.isContextual(e) ? (this.next(), !0) : !1
}
z.expectContextual = function (e) {
    this.eatContextual(e) || this.unexpected()
}
z.canInsertSemicolon = function () {
    return this.type === n.eof || this.type === n.braceR || J.test(this.input.slice(this.lastTokEnd, this.start))
}
z.insertSemicolon = function () {
    if (this.canInsertSemicolon())
        return (
            this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
            !0
        )
}
z.semicolon = function () {
    !this.eat(n.semi) && !this.insertSemicolon() && this.unexpected()
}
z.afterTrailingComma = function (e, t) {
    if (this.type === e)
        return (
            this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
            t || this.next(),
            !0
        )
}
z.expect = function (e) {
    this.eat(e) || this.unexpected()
}
z.unexpected = function (e) {
    this.raise(e ?? this.start, 'Unexpected token')
}
var lt = function () {
    this.shorthandAssign =
        this.trailingComma =
        this.parenthesizedAssign =
        this.parenthesizedBind =
        this.doubleProto =
            -1
}
z.checkPatternErrors = function (e, t) {
    if (e) {
        e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, 'Comma is not permitted after the rest element')
        var i = t ? e.parenthesizedAssign : e.parenthesizedBind
        i > -1 && this.raiseRecoverable(i, t ? 'Assigning to rvalue' : 'Parenthesized pattern')
    }
}
z.checkExpressionErrors = function (e, t) {
    if (!e) return !1
    var i = e.shorthandAssign,
        s = e.doubleProto
    if (!t) return i >= 0 || s >= 0
    ;(i >= 0 && this.raise(i, 'Shorthand property assignments are valid only in destructuring patterns'),
        s >= 0 && this.raiseRecoverable(s, 'Redefinition of __proto__ property'))
}
z.checkYieldAwaitInDefaultParams = function () {
    ;(this.yieldPos &&
        (!this.awaitPos || this.yieldPos < this.awaitPos) &&
        this.raise(this.yieldPos, 'Yield expression cannot be a default value'),
        this.awaitPos && this.raise(this.awaitPos, 'Await expression cannot be a default value'))
}
z.isSimpleAssignTarget = function (e) {
    return e.type === 'ParenthesizedExpression'
        ? this.isSimpleAssignTarget(e.expression)
        : e.type === 'Identifier' || e.type === 'MemberExpression'
}
var b = q.prototype
b.parseTopLevel = function (e) {
    var t = /* @__PURE__ */ Object.create(null)
    for (e.body || (e.body = []); this.type !== n.eof; ) {
        var i = this.parseStatement(null, !0, t)
        e.body.push(i)
    }
    if (this.inModule)
        for (var s = 0, r = Object.keys(this.undefinedExports); s < r.length; s += 1) {
            var o = r[s]
            this.raiseRecoverable(this.undefinedExports[o].start, "Export '" + o + "' is not defined")
        }
    return (
        this.adaptDirectivePrologue(e.body),
        this.next(),
        (e.sourceType = this.options.sourceType),
        this.finishNode(e, 'Program')
    )
}
var Vt = { kind: 'loop' },
    Ks = { kind: 'switch' }
b.isLet = function (e) {
    if (this.options.ecmaVersion < 6 || !this.isContextual('let')) return !1
    $.lastIndex = this.pos
    var t = $.exec(this.input),
        i = this.pos + t[0].length,
        s = this.input.charCodeAt(i)
    if (s === 91 || s === 92) return !0
    if (e) return !1
    if (s === 123 || (s > 55295 && s < 56320)) return !0
    if (oe(s, !0)) {
        for (var r = i + 1; _e((s = this.input.charCodeAt(r)), !0); ) ++r
        if (s === 92 || (s > 55295 && s < 56320)) return !0
        var o = this.input.slice(i, r)
        if (!Ds.test(o)) return !0
    }
    return !1
}
b.isAsyncFunction = function () {
    if (this.options.ecmaVersion < 8 || !this.isContextual('async')) return !1
    $.lastIndex = this.pos
    var e = $.exec(this.input),
        t = this.pos + e[0].length,
        i
    return (
        !J.test(this.input.slice(this.pos, t)) &&
        this.input.slice(t, t + 8) === 'function' &&
        (t + 8 === this.input.length || !(_e((i = this.input.charCodeAt(t + 8))) || (i > 55295 && i < 56320)))
    )
}
b.isUsingKeyword = function (e, t) {
    if (this.options.ecmaVersion < 17 || !this.isContextual(e ? 'await' : 'using')) return !1
    $.lastIndex = this.pos
    var i = $.exec(this.input),
        s = this.pos + i[0].length
    if (J.test(this.input.slice(this.pos, s))) return !1
    if (e) {
        var r = s + 5,
            o
        if (
            this.input.slice(s, r) !== 'using' ||
            r === this.input.length ||
            _e((o = this.input.charCodeAt(r))) ||
            (o > 55295 && o < 56320)
        )
            return !1
        $.lastIndex = r
        var u = $.exec(this.input)
        if (u && J.test(this.input.slice(r, r + u[0].length))) return !1
    }
    if (t) {
        var l = s + 2,
            c
        if (
            this.input.slice(s, l) === 'of' &&
            (l === this.input.length || (!_e((c = this.input.charCodeAt(l))) && !(c > 55295 && c < 56320)))
        )
            return !1
    }
    var d = this.input.charCodeAt(s)
    return oe(d, !0) || d === 92
}
b.isAwaitUsing = function (e) {
    return this.isUsingKeyword(!0, e)
}
b.isUsing = function (e) {
    return this.isUsingKeyword(!1, e)
}
b.parseStatement = function (e, t, i) {
    var s = this.type,
        r = this.startNode(),
        o
    switch ((this.isLet(e) && ((s = n._var), (o = 'let')), s)) {
        case n._break:
        case n._continue:
            return this.parseBreakContinueStatement(r, s.keyword)
        case n._debugger:
            return this.parseDebuggerStatement(r)
        case n._do:
            return this.parseDoStatement(r)
        case n._for:
            return this.parseForStatement(r)
        case n._function:
            return (
                e &&
                    (this.strict || (e !== 'if' && e !== 'label')) &&
                    this.options.ecmaVersion >= 6 &&
                    this.unexpected(),
                this.parseFunctionStatement(r, !1, !e)
            )
        case n._class:
            return (e && this.unexpected(), this.parseClass(r, !0))
        case n._if:
            return this.parseIfStatement(r)
        case n._return:
            return this.parseReturnStatement(r)
        case n._switch:
            return this.parseSwitchStatement(r)
        case n._throw:
            return this.parseThrowStatement(r)
        case n._try:
            return this.parseTryStatement(r)
        case n._const:
        case n._var:
            return ((o = o || this.value), e && o !== 'var' && this.unexpected(), this.parseVarStatement(r, o))
        case n._while:
            return this.parseWhileStatement(r)
        case n._with:
            return this.parseWithStatement(r)
        case n.braceL:
            return this.parseBlock(!0, r)
        case n.semi:
            return this.parseEmptyStatement(r)
        case n._export:
        case n._import:
            if (this.options.ecmaVersion > 10 && s === n._import) {
                $.lastIndex = this.pos
                var u = $.exec(this.input),
                    l = this.pos + u[0].length,
                    c = this.input.charCodeAt(l)
                if (c === 40 || c === 46) return this.parseExpressionStatement(r, this.parseExpression())
            }
            return (
                this.options.allowImportExportEverywhere ||
                    (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"),
                    this.inModule ||
                        this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")),
                s === n._import ? this.parseImport(r) : this.parseExport(r, i)
            )
        // If the statement does not start with a statement keyword or a
        // brace, it's an ExpressionStatement or LabeledStatement. We
        // simply start parsing an expression, and afterwards, if the
        // next token is a colon and the expression was a simple
        // Identifier node, we switch to interpreting it as a label.
        default:
            if (this.isAsyncFunction())
                return (e && this.unexpected(), this.next(), this.parseFunctionStatement(r, !0, !e))
            var d = this.isAwaitUsing(!1) ? 'await using' : this.isUsing(!1) ? 'using' : null
            if (d)
                return (
                    t &&
                        this.options.sourceType === 'script' &&
                        this.raise(
                            this.start,
                            'Using declaration cannot appear in the top level when source type is `script`'
                        ),
                    d === 'await using' &&
                        (this.canAwait || this.raise(this.start, 'Await using cannot appear outside of async function'),
                        this.next()),
                    this.next(),
                    this.parseVar(r, !1, d),
                    this.semicolon(),
                    this.finishNode(r, 'VariableDeclaration')
                )
            var p = this.value,
                f = this.parseExpression()
            return s === n.name && f.type === 'Identifier' && this.eat(n.colon)
                ? this.parseLabeledStatement(r, p, f, e)
                : this.parseExpressionStatement(r, f)
    }
}
b.parseBreakContinueStatement = function (e, t) {
    var i = t === 'break'
    ;(this.next(),
        this.eat(n.semi) || this.insertSemicolon()
            ? (e.label = null)
            : this.type !== n.name
              ? this.unexpected()
              : ((e.label = this.parseIdent()), this.semicolon()))
    for (var s = 0; s < this.labels.length; ++s) {
        var r = this.labels[s]
        if (
            (e.label == null || r.name === e.label.name) &&
            ((r.kind != null && (i || r.kind === 'loop')) || (e.label && i))
        )
            break
    }
    return (
        s === this.labels.length && this.raise(e.start, 'Unsyntactic ' + t),
        this.finishNode(e, i ? 'BreakStatement' : 'ContinueStatement')
    )
}
b.parseDebuggerStatement = function (e) {
    return (this.next(), this.semicolon(), this.finishNode(e, 'DebuggerStatement'))
}
b.parseDoStatement = function (e) {
    return (
        this.next(),
        this.labels.push(Vt),
        (e.body = this.parseStatement('do')),
        this.labels.pop(),
        this.expect(n._while),
        (e.test = this.parseParenExpression()),
        this.options.ecmaVersion >= 6 ? this.eat(n.semi) : this.semicolon(),
        this.finishNode(e, 'DoWhileStatement')
    )
}
b.parseForStatement = function (e) {
    this.next()
    var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual('await') ? this.lastTokStart : -1
    if ((this.labels.push(Vt), this.enterScope(0), this.expect(n.parenL), this.type === n.semi))
        return (t > -1 && this.unexpected(t), this.parseFor(e, null))
    var i = this.isLet()
    if (this.type === n._var || this.type === n._const || i) {
        var s = this.startNode(),
            r = i ? 'let' : this.value
        return (
            this.next(),
            this.parseVar(s, !0, r),
            this.finishNode(s, 'VariableDeclaration'),
            this.parseForAfterInit(e, s, t)
        )
    }
    var o = this.isContextual('let'),
        u = !1,
        l = this.isUsing(!0) ? 'using' : this.isAwaitUsing(!0) ? 'await using' : null
    if (l) {
        var c = this.startNode()
        return (
            this.next(),
            l === 'await using' && this.next(),
            this.parseVar(c, !0, l),
            this.finishNode(c, 'VariableDeclaration'),
            this.parseForAfterInit(e, c, t)
        )
    }
    var d = this.containsEsc,
        p = new lt(),
        f = this.start,
        v = t > -1 ? this.parseExprSubscripts(p, 'await') : this.parseExpression(!0, p)
    return this.type === n._in || (u = this.options.ecmaVersion >= 6 && this.isContextual('of'))
        ? (t > -1
              ? (this.type === n._in && this.unexpected(t), (e.await = !0))
              : u &&
                this.options.ecmaVersion >= 8 &&
                (v.start === f && !d && v.type === 'Identifier' && v.name === 'async'
                    ? this.unexpected()
                    : this.options.ecmaVersion >= 9 && (e.await = !1)),
          o && u && this.raise(v.start, "The left-hand side of a for-of loop may not start with 'let'."),
          this.toAssignable(v, !1, p),
          this.checkLValPattern(v),
          this.parseForIn(e, v))
        : (this.checkExpressionErrors(p, !0), t > -1 && this.unexpected(t), this.parseFor(e, v))
}
b.parseForAfterInit = function (e, t, i) {
    return (this.type === n._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))) &&
        t.declarations.length === 1
        ? (this.options.ecmaVersion >= 9 && (this.type === n._in ? i > -1 && this.unexpected(i) : (e.await = i > -1)),
          this.parseForIn(e, t))
        : (i > -1 && this.unexpected(i), this.parseFor(e, t))
}
b.parseFunctionStatement = function (e, t, i) {
    return (this.next(), this.parseFunction(e, qe | (i ? 0 : Nt), !1, t))
}
b.parseIfStatement = function (e) {
    return (
        this.next(),
        (e.test = this.parseParenExpression()),
        (e.consequent = this.parseStatement('if')),
        (e.alternate = this.eat(n._else) ? this.parseStatement('if') : null),
        this.finishNode(e, 'IfStatement')
    )
}
b.parseReturnStatement = function (e) {
    return (
        !this.inFunction &&
            !this.options.allowReturnOutsideFunction &&
            this.raise(this.start, "'return' outside of function"),
        this.next(),
        this.eat(n.semi) || this.insertSemicolon()
            ? (e.argument = null)
            : ((e.argument = this.parseExpression()), this.semicolon()),
        this.finishNode(e, 'ReturnStatement')
    )
}
b.parseSwitchStatement = function (e) {
    ;(this.next(),
        (e.discriminant = this.parseParenExpression()),
        (e.cases = []),
        this.expect(n.braceL),
        this.labels.push(Ks),
        this.enterScope(0))
    for (var t, i = !1; this.type !== n.braceR; )
        if (this.type === n._case || this.type === n._default) {
            var s = this.type === n._case
            ;(t && this.finishNode(t, 'SwitchCase'),
                e.cases.push((t = this.startNode())),
                (t.consequent = []),
                this.next(),
                s
                    ? (t.test = this.parseExpression())
                    : (i && this.raiseRecoverable(this.lastTokStart, 'Multiple default clauses'),
                      (i = !0),
                      (t.test = null)),
                this.expect(n.colon))
        } else (t || this.unexpected(), t.consequent.push(this.parseStatement(null)))
    return (
        this.exitScope(),
        t && this.finishNode(t, 'SwitchCase'),
        this.next(),
        this.labels.pop(),
        this.finishNode(e, 'SwitchStatement')
    )
}
b.parseThrowStatement = function (e) {
    return (
        this.next(),
        J.test(this.input.slice(this.lastTokEnd, this.start)) &&
            this.raise(this.lastTokEnd, 'Illegal newline after throw'),
        (e.argument = this.parseExpression()),
        this.semicolon(),
        this.finishNode(e, 'ThrowStatement')
    )
}
var Js = []
b.parseCatchClauseParam = function () {
    var e = this.parseBindingAtom(),
        t = e.type === 'Identifier'
    return (this.enterScope(t ? pi : 0), this.checkLValPattern(e, t ? vi : fe), this.expect(n.parenR), e)
}
b.parseTryStatement = function (e) {
    if ((this.next(), (e.block = this.parseBlock()), (e.handler = null), this.type === n._catch)) {
        var t = this.startNode()
        ;(this.next(),
            this.eat(n.parenL)
                ? (t.param = this.parseCatchClauseParam())
                : (this.options.ecmaVersion < 10 && this.unexpected(), (t.param = null), this.enterScope(0)),
            (t.body = this.parseBlock(!1)),
            this.exitScope(),
            (e.handler = this.finishNode(t, 'CatchClause')))
    }
    return (
        (e.finalizer = this.eat(n._finally) ? this.parseBlock() : null),
        !e.handler && !e.finalizer && this.raise(e.start, 'Missing catch or finally clause'),
        this.finishNode(e, 'TryStatement')
    )
}
b.parseVarStatement = function (e, t, i) {
    return (this.next(), this.parseVar(e, !1, t, i), this.semicolon(), this.finishNode(e, 'VariableDeclaration'))
}
b.parseWhileStatement = function (e) {
    return (
        this.next(),
        (e.test = this.parseParenExpression()),
        this.labels.push(Vt),
        (e.body = this.parseStatement('while')),
        this.labels.pop(),
        this.finishNode(e, 'WhileStatement')
    )
}
b.parseWithStatement = function (e) {
    return (
        this.strict && this.raise(this.start, "'with' in strict mode"),
        this.next(),
        (e.object = this.parseParenExpression()),
        (e.body = this.parseStatement('with')),
        this.finishNode(e, 'WithStatement')
    )
}
b.parseEmptyStatement = function (e) {
    return (this.next(), this.finishNode(e, 'EmptyStatement'))
}
b.parseLabeledStatement = function (e, t, i, s) {
    for (var r = 0, o = this.labels; r < o.length; r += 1) {
        var u = o[r]
        u.name === t && this.raise(i.start, "Label '" + t + "' is already declared")
    }
    for (
        var l = this.type.isLoop ? 'loop' : this.type === n._switch ? 'switch' : null, c = this.labels.length - 1;
        c >= 0;
        c--
    ) {
        var d = this.labels[c]
        if (d.statementStart === e.start) ((d.statementStart = this.start), (d.kind = l))
        else break
    }
    return (
        this.labels.push({ name: t, kind: l, statementStart: this.start }),
        (e.body = this.parseStatement(s ? (s.indexOf('label') === -1 ? s + 'label' : s) : 'label')),
        this.labels.pop(),
        (e.label = i),
        this.finishNode(e, 'LabeledStatement')
    )
}
b.parseExpressionStatement = function (e, t) {
    return ((e.expression = t), this.semicolon(), this.finishNode(e, 'ExpressionStatement'))
}
b.parseBlock = function (e, t, i) {
    for (
        e === void 0 && (e = !0),
            t === void 0 && (t = this.startNode()),
            t.body = [],
            this.expect(n.braceL),
            e && this.enterScope(0);
        this.type !== n.braceR;
    ) {
        var s = this.parseStatement(null)
        t.body.push(s)
    }
    return (i && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, 'BlockStatement'))
}
b.parseFor = function (e, t) {
    return (
        (e.init = t),
        this.expect(n.semi),
        (e.test = this.type === n.semi ? null : this.parseExpression()),
        this.expect(n.semi),
        (e.update = this.type === n.parenR ? null : this.parseExpression()),
        this.expect(n.parenR),
        (e.body = this.parseStatement('for')),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, 'ForStatement')
    )
}
b.parseForIn = function (e, t) {
    var i = this.type === n._in
    return (
        this.next(),
        t.type === 'VariableDeclaration' &&
            t.declarations[0].init != null &&
            (!i ||
                this.options.ecmaVersion < 8 ||
                this.strict ||
                t.kind !== 'var' ||
                t.declarations[0].id.type !== 'Identifier') &&
            this.raise(t.start, (i ? 'for-in' : 'for-of') + ' loop variable declaration may not have an initializer'),
        (e.left = t),
        (e.right = i ? this.parseExpression() : this.parseMaybeAssign()),
        this.expect(n.parenR),
        (e.body = this.parseStatement('for')),
        this.exitScope(),
        this.labels.pop(),
        this.finishNode(e, i ? 'ForInStatement' : 'ForOfStatement')
    )
}
b.parseVar = function (e, t, i, s) {
    for (e.declarations = [], e.kind = i; ; ) {
        var r = this.startNode()
        if (
            (this.parseVarId(r, i),
            this.eat(n.eq)
                ? (r.init = this.parseMaybeAssign(t))
                : !s &&
                    i === 'const' &&
                    !(this.type === n._in || (this.options.ecmaVersion >= 6 && this.isContextual('of')))
                  ? this.unexpected()
                  : !s &&
                      (i === 'using' || i === 'await using') &&
                      this.options.ecmaVersion >= 17 &&
                      this.type !== n._in &&
                      !this.isContextual('of')
                    ? this.raise(this.lastTokEnd, 'Missing initializer in ' + i + ' declaration')
                    : !s && r.id.type !== 'Identifier' && !(t && (this.type === n._in || this.isContextual('of')))
                      ? this.raise(this.lastTokEnd, 'Complex binding patterns require an initialization value')
                      : (r.init = null),
            e.declarations.push(this.finishNode(r, 'VariableDeclarator')),
            !this.eat(n.comma))
        )
            break
    }
    return e
}
b.parseVarId = function (e, t) {
    ;((e.id = t === 'using' || t === 'await using' ? this.parseIdent() : this.parseBindingAtom()),
        this.checkLValPattern(e.id, t === 'var' ? Ot : fe, !1))
}
var qe = 1,
    Nt = 2,
    mi = 4
b.parseFunction = function (e, t, i, s, r) {
    ;(this.initFunction(e),
        (this.options.ecmaVersion >= 9 || (this.options.ecmaVersion >= 6 && !s)) &&
            (this.type === n.star && t & Nt && this.unexpected(), (e.generator = this.eat(n.star))),
        this.options.ecmaVersion >= 8 && (e.async = !!s),
        t & qe &&
            ((e.id = t & mi && this.type !== n.name ? null : this.parseIdent()),
            e.id &&
                !(t & Nt) &&
                this.checkLValSimple(
                    e.id,
                    this.strict || e.generator || e.async ? (this.treatFunctionsAsVar ? Ot : fe) : fi
                )))
    var o = this.yieldPos,
        u = this.awaitPos,
        l = this.awaitIdentPos
    return (
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        this.enterScope(Rt(e.async, e.generator)),
        t & qe || (e.id = this.type === n.name ? this.parseIdent() : null),
        this.parseFunctionParams(e),
        this.parseFunctionBody(e, i, !1, r),
        (this.yieldPos = o),
        (this.awaitPos = u),
        (this.awaitIdentPos = l),
        this.finishNode(e, t & qe ? 'FunctionDeclaration' : 'FunctionExpression')
    )
}
b.parseFunctionParams = function (e) {
    ;(this.expect(n.parenL),
        (e.params = this.parseBindingList(n.parenR, !1, this.options.ecmaVersion >= 8)),
        this.checkYieldAwaitInDefaultParams())
}
b.parseClass = function (e, t) {
    this.next()
    var i = this.strict
    ;((this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e))
    var s = this.enterClassBody(),
        r = this.startNode(),
        o = !1
    for (r.body = [], this.expect(n.braceL); this.type !== n.braceR; ) {
        var u = this.parseClassElement(e.superClass !== null)
        u &&
            (r.body.push(u),
            u.type === 'MethodDefinition' && u.kind === 'constructor'
                ? (o && this.raiseRecoverable(u.start, 'Duplicate constructor in the same class'), (o = !0))
                : u.key &&
                  u.key.type === 'PrivateIdentifier' &&
                  Ys(s, u) &&
                  this.raiseRecoverable(u.key.start, "Identifier '#" + u.key.name + "' has already been declared"))
    }
    return (
        (this.strict = i),
        this.next(),
        (e.body = this.finishNode(r, 'ClassBody')),
        this.exitClassBody(),
        this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression')
    )
}
b.parseClassElement = function (e) {
    if (this.eat(n.semi)) return null
    var t = this.options.ecmaVersion,
        i = this.startNode(),
        s = '',
        r = !1,
        o = !1,
        u = 'method',
        l = !1
    if (this.eatContextual('static')) {
        if (t >= 13 && this.eat(n.braceL)) return (this.parseClassStaticBlock(i), i)
        this.isClassElementNameStart() || this.type === n.star ? (l = !0) : (s = 'static')
    }
    if (
        ((i.static = l),
        !s &&
            t >= 8 &&
            this.eatContextual('async') &&
            ((this.isClassElementNameStart() || this.type === n.star) && !this.canInsertSemicolon()
                ? (o = !0)
                : (s = 'async')),
        !s && (t >= 9 || !o) && this.eat(n.star) && (r = !0),
        !s && !o && !r)
    ) {
        var c = this.value
        ;(this.eatContextual('get') || this.eatContextual('set')) &&
            (this.isClassElementNameStart() ? (u = c) : (s = c))
    }
    if (
        (s
            ? ((i.computed = !1),
              (i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)),
              (i.key.name = s),
              this.finishNode(i.key, 'Identifier'))
            : this.parseClassElementName(i),
        t < 13 || this.type === n.parenL || u !== 'method' || r || o)
    ) {
        var d = !i.static && tt(i, 'constructor'),
            p = d && e
        ;(d && u !== 'method' && this.raise(i.key.start, "Constructor can't have get/set modifier"),
            (i.kind = d ? 'constructor' : u),
            this.parseClassMethod(i, r, o, p))
    } else this.parseClassField(i)
    return i
}
b.isClassElementNameStart = function () {
    return (
        this.type === n.name ||
        this.type === n.privateId ||
        this.type === n.num ||
        this.type === n.string ||
        this.type === n.bracketL ||
        this.type.keyword
    )
}
b.parseClassElementName = function (e) {
    this.type === n.privateId
        ? (this.value === 'constructor' && this.raise(this.start, "Classes can't have an element named '#constructor'"),
          (e.computed = !1),
          (e.key = this.parsePrivateIdent()))
        : this.parsePropertyName(e)
}
b.parseClassMethod = function (e, t, i, s) {
    var r = e.key
    e.kind === 'constructor'
        ? (t && this.raise(r.start, "Constructor can't be a generator"),
          i && this.raise(r.start, "Constructor can't be an async method"))
        : e.static &&
          tt(e, 'prototype') &&
          this.raise(r.start, 'Classes may not have a static property named prototype')
    var o = (e.value = this.parseMethod(t, i, s))
    return (
        e.kind === 'get' && o.params.length !== 0 && this.raiseRecoverable(o.start, 'getter should have no params'),
        e.kind === 'set' &&
            o.params.length !== 1 &&
            this.raiseRecoverable(o.start, 'setter should have exactly one param'),
        e.kind === 'set' &&
            o.params[0].type === 'RestElement' &&
            this.raiseRecoverable(o.params[0].start, 'Setter cannot use rest params'),
        this.finishNode(e, 'MethodDefinition')
    )
}
b.parseClassField = function (e) {
    return (
        tt(e, 'constructor')
            ? this.raise(e.key.start, "Classes can't have a field named 'constructor'")
            : e.static &&
              tt(e, 'prototype') &&
              this.raise(e.key.start, "Classes can't have a static field named 'prototype'"),
        this.eat(n.eq)
            ? (this.enterScope(ze | ot), (e.value = this.parseMaybeAssign()), this.exitScope())
            : (e.value = null),
        this.semicolon(),
        this.finishNode(e, 'PropertyDefinition')
    )
}
b.parseClassStaticBlock = function (e) {
    e.body = []
    var t = this.labels
    for (this.labels = [], this.enterScope(Ae | ot); this.type !== n.braceR; ) {
        var i = this.parseStatement(null)
        e.body.push(i)
    }
    return (this.next(), this.exitScope(), (this.labels = t), this.finishNode(e, 'StaticBlock'))
}
b.parseClassId = function (e, t) {
    this.type === n.name
        ? ((e.id = this.parseIdent()), t && this.checkLValSimple(e.id, fe, !1))
        : (t === !0 && this.unexpected(), (e.id = null))
}
b.parseClassSuper = function (e) {
    e.superClass = this.eat(n._extends) ? this.parseExprSubscripts(null, !1) : null
}
b.enterClassBody = function () {
    var e = { declared: /* @__PURE__ */ Object.create(null), used: [] }
    return (this.privateNameStack.push(e), e.declared)
}
b.exitClassBody = function () {
    var e = this.privateNameStack.pop(),
        t = e.declared,
        i = e.used
    if (this.options.checkPrivateFields)
        for (
            var s = this.privateNameStack.length, r = s === 0 ? null : this.privateNameStack[s - 1], o = 0;
            o < i.length;
            ++o
        ) {
            var u = i[o]
            Re(t, u.name) ||
                (r
                    ? r.used.push(u)
                    : this.raiseRecoverable(
                          u.start,
                          "Private field '#" + u.name + "' must be declared in an enclosing class"
                      ))
        }
}
function Ys(e, t) {
    var i = t.key.name,
        s = e[i],
        r = 'true'
    return (
        t.type === 'MethodDefinition' &&
            (t.kind === 'get' || t.kind === 'set') &&
            (r = (t.static ? 's' : 'i') + t.kind),
        (s === 'iget' && r === 'iset') ||
        (s === 'iset' && r === 'iget') ||
        (s === 'sget' && r === 'sset') ||
        (s === 'sset' && r === 'sget')
            ? ((e[i] = 'true'), !1)
            : s
              ? !0
              : ((e[i] = r), !1)
    )
}
function tt(e, t) {
    var i = e.computed,
        s = e.key
    return !i && ((s.type === 'Identifier' && s.name === t) || (s.type === 'Literal' && s.value === t))
}
b.parseExportAllDeclaration = function (e, t) {
    return (
        this.options.ecmaVersion >= 11 &&
            (this.eatContextual('as')
                ? ((e.exported = this.parseModuleExportName()), this.checkExport(t, e.exported, this.lastTokStart))
                : (e.exported = null)),
        this.expectContextual('from'),
        this.type !== n.string && this.unexpected(),
        (e.source = this.parseExprAtom()),
        this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()),
        this.semicolon(),
        this.finishNode(e, 'ExportAllDeclaration')
    )
}
b.parseExport = function (e, t) {
    if ((this.next(), this.eat(n.star))) return this.parseExportAllDeclaration(e, t)
    if (this.eat(n._default))
        return (
            this.checkExport(t, 'default', this.lastTokStart),
            (e.declaration = this.parseExportDefaultDeclaration()),
            this.finishNode(e, 'ExportDefaultDeclaration')
        )
    if (this.shouldParseExportStatement())
        ((e.declaration = this.parseExportDeclaration(e)),
            e.declaration.type === 'VariableDeclaration'
                ? this.checkVariableExport(t, e.declaration.declarations)
                : this.checkExport(t, e.declaration.id, e.declaration.id.start),
            (e.specifiers = []),
            (e.source = null),
            this.options.ecmaVersion >= 16 && (e.attributes = []))
    else {
        if (((e.declaration = null), (e.specifiers = this.parseExportSpecifiers(t)), this.eatContextual('from')))
            (this.type !== n.string && this.unexpected(),
                (e.source = this.parseExprAtom()),
                this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()))
        else {
            for (var i = 0, s = e.specifiers; i < s.length; i += 1) {
                var r = s[i]
                ;(this.checkUnreserved(r.local),
                    this.checkLocalExport(r.local),
                    r.local.type === 'Literal' &&
                        this.raise(
                            r.local.start,
                            'A string literal cannot be used as an exported binding without `from`.'
                        ))
            }
            ;((e.source = null), this.options.ecmaVersion >= 16 && (e.attributes = []))
        }
        this.semicolon()
    }
    return this.finishNode(e, 'ExportNamedDeclaration')
}
b.parseExportDeclaration = function (e) {
    return this.parseStatement(null)
}
b.parseExportDefaultDeclaration = function () {
    var e
    if (this.type === n._function || (e = this.isAsyncFunction())) {
        var t = this.startNode()
        return (this.next(), e && this.next(), this.parseFunction(t, qe | mi, !1, e))
    } else if (this.type === n._class) {
        var i = this.startNode()
        return this.parseClass(i, 'nullableID')
    } else {
        var s = this.parseMaybeAssign()
        return (this.semicolon(), s)
    }
}
b.checkExport = function (e, t, i) {
    e &&
        (typeof t != 'string' && (t = t.type === 'Identifier' ? t.name : t.value),
        Re(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"),
        (e[t] = !0))
}
b.checkPatternExport = function (e, t) {
    var i = t.type
    if (i === 'Identifier') this.checkExport(e, t, t.start)
    else if (i === 'ObjectPattern')
        for (var s = 0, r = t.properties; s < r.length; s += 1) {
            var o = r[s]
            this.checkPatternExport(e, o)
        }
    else if (i === 'ArrayPattern')
        for (var u = 0, l = t.elements; u < l.length; u += 1) {
            var c = l[u]
            c && this.checkPatternExport(e, c)
        }
    else
        i === 'Property'
            ? this.checkPatternExport(e, t.value)
            : i === 'AssignmentPattern'
              ? this.checkPatternExport(e, t.left)
              : i === 'RestElement' && this.checkPatternExport(e, t.argument)
}
b.checkVariableExport = function (e, t) {
    if (e)
        for (var i = 0, s = t; i < s.length; i += 1) {
            var r = s[i]
            this.checkPatternExport(e, r.id)
        }
}
b.shouldParseExportStatement = function () {
    return (
        this.type.keyword === 'var' ||
        this.type.keyword === 'const' ||
        this.type.keyword === 'class' ||
        this.type.keyword === 'function' ||
        this.isLet() ||
        this.isAsyncFunction()
    )
}
b.parseExportSpecifier = function (e) {
    var t = this.startNode()
    return (
        (t.local = this.parseModuleExportName()),
        (t.exported = this.eatContextual('as') ? this.parseModuleExportName() : t.local),
        this.checkExport(e, t.exported, t.exported.start),
        this.finishNode(t, 'ExportSpecifier')
    )
}
b.parseExportSpecifiers = function (e) {
    var t = [],
        i = !0
    for (this.expect(n.braceL); !this.eat(n.braceR); ) {
        if (i) i = !1
        else if ((this.expect(n.comma), this.afterTrailingComma(n.braceR))) break
        t.push(this.parseExportSpecifier(e))
    }
    return t
}
b.parseImport = function (e) {
    return (
        this.next(),
        this.type === n.string
            ? ((e.specifiers = Js), (e.source = this.parseExprAtom()))
            : ((e.specifiers = this.parseImportSpecifiers()),
              this.expectContextual('from'),
              (e.source = this.type === n.string ? this.parseExprAtom() : this.unexpected())),
        this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()),
        this.semicolon(),
        this.finishNode(e, 'ImportDeclaration')
    )
}
b.parseImportSpecifier = function () {
    var e = this.startNode()
    return (
        (e.imported = this.parseModuleExportName()),
        this.eatContextual('as')
            ? (e.local = this.parseIdent())
            : (this.checkUnreserved(e.imported), (e.local = e.imported)),
        this.checkLValSimple(e.local, fe),
        this.finishNode(e, 'ImportSpecifier')
    )
}
b.parseImportDefaultSpecifier = function () {
    var e = this.startNode()
    return (
        (e.local = this.parseIdent()),
        this.checkLValSimple(e.local, fe),
        this.finishNode(e, 'ImportDefaultSpecifier')
    )
}
b.parseImportNamespaceSpecifier = function () {
    var e = this.startNode()
    return (
        this.next(),
        this.expectContextual('as'),
        (e.local = this.parseIdent()),
        this.checkLValSimple(e.local, fe),
        this.finishNode(e, 'ImportNamespaceSpecifier')
    )
}
b.parseImportSpecifiers = function () {
    var e = [],
        t = !0
    if (this.type === n.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(n.comma))) return e
    if (this.type === n.star) return (e.push(this.parseImportNamespaceSpecifier()), e)
    for (this.expect(n.braceL); !this.eat(n.braceR); ) {
        if (t) t = !1
        else if ((this.expect(n.comma), this.afterTrailingComma(n.braceR))) break
        e.push(this.parseImportSpecifier())
    }
    return e
}
b.parseWithClause = function () {
    var e = []
    if (!this.eat(n._with)) return e
    this.expect(n.braceL)
    for (var t = {}, i = !0; !this.eat(n.braceR); ) {
        if (i) i = !1
        else if ((this.expect(n.comma), this.afterTrailingComma(n.braceR))) break
        var s = this.parseImportAttribute(),
            r = s.key.type === 'Identifier' ? s.key.name : s.key.value
        ;(Re(t, r) && this.raiseRecoverable(s.key.start, "Duplicate attribute key '" + r + "'"), (t[r] = !0), e.push(s))
    }
    return e
}
b.parseImportAttribute = function () {
    var e = this.startNode()
    return (
        (e.key =
            this.type === n.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== 'never')),
        this.expect(n.colon),
        this.type !== n.string && this.unexpected(),
        (e.value = this.parseExprAtom()),
        this.finishNode(e, 'ImportAttribute')
    )
}
b.parseModuleExportName = function () {
    if (this.options.ecmaVersion >= 13 && this.type === n.string) {
        var e = this.parseLiteral(this.value)
        return (Hs.test(e.value) && this.raise(e.start, 'An export name cannot include a lone surrogate.'), e)
    }
    return this.parseIdent(!0)
}
b.adaptDirectivePrologue = function (e) {
    for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
        e[t].directive = e[t].expression.raw.slice(1, -1)
}
b.isDirectiveCandidate = function (e) {
    return (
        this.options.ecmaVersion >= 5 &&
        e.type === 'ExpressionStatement' &&
        e.expression.type === 'Literal' &&
        typeof e.expression.value == 'string' && // Reject parenthesized strings.
        (this.input[e.start] === '"' || this.input[e.start] === "'")
    )
}
var ie = q.prototype
ie.toAssignable = function (e, t, i) {
    if (this.options.ecmaVersion >= 6 && e)
        switch (e.type) {
            case 'Identifier':
                this.inAsync &&
                    e.name === 'await' &&
                    this.raise(e.start, "Cannot use 'await' as identifier inside an async function")
                break
            case 'ObjectPattern':
            case 'ArrayPattern':
            case 'AssignmentPattern':
            case 'RestElement':
                break
            case 'ObjectExpression':
                ;((e.type = 'ObjectPattern'), i && this.checkPatternErrors(i, !0))
                for (var s = 0, r = e.properties; s < r.length; s += 1) {
                    var o = r[s]
                    ;(this.toAssignable(o, t),
                        o.type === 'RestElement' &&
                            (o.argument.type === 'ArrayPattern' || o.argument.type === 'ObjectPattern') &&
                            this.raise(o.argument.start, 'Unexpected token'))
                }
                break
            case 'Property':
                ;(e.kind !== 'init' && this.raise(e.key.start, "Object pattern can't contain getter or setter"),
                    this.toAssignable(e.value, t))
                break
            case 'ArrayExpression':
                ;((e.type = 'ArrayPattern'), i && this.checkPatternErrors(i, !0), this.toAssignableList(e.elements, t))
                break
            case 'SpreadElement':
                ;((e.type = 'RestElement'),
                    this.toAssignable(e.argument, t),
                    e.argument.type === 'AssignmentPattern' &&
                        this.raise(e.argument.start, 'Rest elements cannot have a default value'))
                break
            case 'AssignmentExpression':
                ;(e.operator !== '=' &&
                    this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
                    (e.type = 'AssignmentPattern'),
                    delete e.operator,
                    this.toAssignable(e.left, t))
                break
            case 'ParenthesizedExpression':
                this.toAssignable(e.expression, t, i)
                break
            case 'ChainExpression':
                this.raiseRecoverable(e.start, 'Optional chaining cannot appear in left-hand side')
                break
            case 'MemberExpression':
                if (!t) break
            default:
                this.raise(e.start, 'Assigning to rvalue')
        }
    else i && this.checkPatternErrors(i, !0)
    return e
}
ie.toAssignableList = function (e, t) {
    for (var i = e.length, s = 0; s < i; s++) {
        var r = e[s]
        r && this.toAssignable(r, t)
    }
    if (i) {
        var o = e[i - 1]
        this.options.ecmaVersion === 6 &&
            t &&
            o &&
            o.type === 'RestElement' &&
            o.argument.type !== 'Identifier' &&
            this.unexpected(o.argument.start)
    }
    return e
}
ie.parseSpread = function (e) {
    var t = this.startNode()
    return (this.next(), (t.argument = this.parseMaybeAssign(!1, e)), this.finishNode(t, 'SpreadElement'))
}
ie.parseRestBinding = function () {
    var e = this.startNode()
    return (
        this.next(),
        this.options.ecmaVersion === 6 && this.type !== n.name && this.unexpected(),
        (e.argument = this.parseBindingAtom()),
        this.finishNode(e, 'RestElement')
    )
}
ie.parseBindingAtom = function () {
    if (this.options.ecmaVersion >= 6)
        switch (this.type) {
            case n.bracketL:
                var e = this.startNode()
                return (
                    this.next(),
                    (e.elements = this.parseBindingList(n.bracketR, !0, !0)),
                    this.finishNode(e, 'ArrayPattern')
                )
            case n.braceL:
                return this.parseObj(!0)
        }
    return this.parseIdent()
}
ie.parseBindingList = function (e, t, i, s) {
    for (var r = [], o = !0; !this.eat(e); )
        if ((o ? (o = !1) : this.expect(n.comma), t && this.type === n.comma)) r.push(null)
        else {
            if (i && this.afterTrailingComma(e)) break
            if (this.type === n.ellipsis) {
                var u = this.parseRestBinding()
                ;(this.parseBindingListItem(u),
                    r.push(u),
                    this.type === n.comma &&
                        this.raiseRecoverable(this.start, 'Comma is not permitted after the rest element'),
                    this.expect(e))
                break
            } else r.push(this.parseAssignableListItem(s))
        }
    return r
}
ie.parseAssignableListItem = function (e) {
    var t = this.parseMaybeDefault(this.start, this.startLoc)
    return (this.parseBindingListItem(t), t)
}
ie.parseBindingListItem = function (e) {
    return e
}
ie.parseMaybeDefault = function (e, t, i) {
    if (((i = i || this.parseBindingAtom()), this.options.ecmaVersion < 6 || !this.eat(n.eq))) return i
    var s = this.startNodeAt(e, t)
    return ((s.left = i), (s.right = this.parseMaybeAssign()), this.finishNode(s, 'AssignmentPattern'))
}
ie.checkLValSimple = function (e, t, i) {
    t === void 0 && (t = et)
    var s = t !== et
    switch (e.type) {
        case 'Identifier':
            ;(this.strict &&
                this.reservedWordsStrictBind.test(e.name) &&
                this.raiseRecoverable(e.start, (s ? 'Binding ' : 'Assigning to ') + e.name + ' in strict mode'),
                s &&
                    (t === fe &&
                        e.name === 'let' &&
                        this.raiseRecoverable(e.start, 'let is disallowed as a lexically bound name'),
                    i && (Re(i, e.name) && this.raiseRecoverable(e.start, 'Argument name clash'), (i[e.name] = !0)),
                    t !== xi && this.declareName(e.name, t, e.start)))
            break
        case 'ChainExpression':
            this.raiseRecoverable(e.start, 'Optional chaining cannot appear in left-hand side')
            break
        case 'MemberExpression':
            s && this.raiseRecoverable(e.start, 'Binding member expression')
            break
        case 'ParenthesizedExpression':
            return (
                s && this.raiseRecoverable(e.start, 'Binding parenthesized expression'),
                this.checkLValSimple(e.expression, t, i)
            )
        default:
            this.raise(e.start, (s ? 'Binding' : 'Assigning to') + ' rvalue')
    }
}
ie.checkLValPattern = function (e, t, i) {
    switch ((t === void 0 && (t = et), e.type)) {
        case 'ObjectPattern':
            for (var s = 0, r = e.properties; s < r.length; s += 1) {
                var o = r[s]
                this.checkLValInnerPattern(o, t, i)
            }
            break
        case 'ArrayPattern':
            for (var u = 0, l = e.elements; u < l.length; u += 1) {
                var c = l[u]
                c && this.checkLValInnerPattern(c, t, i)
            }
            break
        default:
            this.checkLValSimple(e, t, i)
    }
}
ie.checkLValInnerPattern = function (e, t, i) {
    switch ((t === void 0 && (t = et), e.type)) {
        case 'Property':
            this.checkLValInnerPattern(e.value, t, i)
            break
        case 'AssignmentPattern':
            this.checkLValPattern(e.left, t, i)
            break
        case 'RestElement':
            this.checkLValPattern(e.argument, t, i)
            break
        default:
            this.checkLValPattern(e, t, i)
    }
}
var re = function (t, i, s, r, o) {
        ;((this.token = t),
            (this.isExpr = !!i),
            (this.preserveSpace = !!s),
            (this.override = r),
            (this.generator = !!o))
    },
    D = {
        b_stat: new re('{', !1),
        b_expr: new re('{', !0),
        b_tmpl: new re('${', !1),
        p_stat: new re('(', !1),
        p_expr: new re('(', !0),
        q_tmpl: new re('`', !0, !0, function (e) {
            return e.tryReadTemplateToken()
        }),
        f_stat: new re('function', !1),
        f_expr: new re('function', !0),
        f_expr_gen: new re('function', !0, !1, null, !0),
        f_gen: new re('function', !1, !1, null, !0),
    },
    Ve = q.prototype
Ve.initialContext = function () {
    return [D.b_stat]
}
Ve.curContext = function () {
    return this.context[this.context.length - 1]
}
Ve.braceIsBlock = function (e) {
    var t = this.curContext()
    return t === D.f_expr || t === D.f_stat
        ? !0
        : e === n.colon && (t === D.b_stat || t === D.b_expr)
          ? !t.isExpr
          : e === n._return || (e === n.name && this.exprAllowed)
            ? J.test(this.input.slice(this.lastTokEnd, this.start))
            : e === n._else || e === n.semi || e === n.eof || e === n.parenR || e === n.arrow
              ? !0
              : e === n.braceL
                ? t === D.b_stat
                : e === n._var || e === n._const || e === n.name
                  ? !1
                  : !this.exprAllowed
}
Ve.inGeneratorContext = function () {
    for (var e = this.context.length - 1; e >= 1; e--) {
        var t = this.context[e]
        if (t.token === 'function') return t.generator
    }
    return !1
}
Ve.updateContext = function (e) {
    var t,
        i = this.type
    i.keyword && e === n.dot
        ? (this.exprAllowed = !1)
        : (t = i.updateContext)
          ? t.call(this, e)
          : (this.exprAllowed = i.beforeExpr)
}
Ve.overrideContext = function (e) {
    this.curContext() !== e && (this.context[this.context.length - 1] = e)
}
n.parenR.updateContext = n.braceR.updateContext = function () {
    if (this.context.length === 1) {
        this.exprAllowed = !0
        return
    }
    var e = this.context.pop()
    ;(e === D.b_stat && this.curContext().token === 'function' && (e = this.context.pop()),
        (this.exprAllowed = !e.isExpr))
}
n.braceL.updateContext = function (e) {
    ;(this.context.push(this.braceIsBlock(e) ? D.b_stat : D.b_expr), (this.exprAllowed = !0))
}
n.dollarBraceL.updateContext = function () {
    ;(this.context.push(D.b_tmpl), (this.exprAllowed = !0))
}
n.parenL.updateContext = function (e) {
    var t = e === n._if || e === n._for || e === n._with || e === n._while
    ;(this.context.push(t ? D.p_stat : D.p_expr), (this.exprAllowed = !0))
}
n.incDec.updateContext = function () {}
n._function.updateContext = n._class.updateContext = function (e) {
    ;(e.beforeExpr &&
    e !== n._else &&
    !(e === n.semi && this.curContext() !== D.p_stat) &&
    !(e === n._return && J.test(this.input.slice(this.lastTokEnd, this.start))) &&
    !((e === n.colon || e === n.braceL) && this.curContext() === D.b_stat)
        ? this.context.push(D.f_expr)
        : this.context.push(D.f_stat),
        (this.exprAllowed = !1))
}
n.colon.updateContext = function () {
    ;(this.curContext().token === 'function' && this.context.pop(), (this.exprAllowed = !0))
}
n.backQuote.updateContext = function () {
    ;(this.curContext() === D.q_tmpl ? this.context.pop() : this.context.push(D.q_tmpl), (this.exprAllowed = !1))
}
n.star.updateContext = function (e) {
    if (e === n._function) {
        var t = this.context.length - 1
        this.context[t] === D.f_expr ? (this.context[t] = D.f_expr_gen) : (this.context[t] = D.f_gen)
    }
    this.exprAllowed = !0
}
n.name.updateContext = function (e) {
    var t = !1
    ;(this.options.ecmaVersion >= 6 &&
        e !== n.dot &&
        ((this.value === 'of' && !this.exprAllowed) || (this.value === 'yield' && this.inGeneratorContext())) &&
        (t = !0),
        (this.exprAllowed = t))
}
var C = q.prototype
C.checkPropClash = function (e, t, i) {
    if (
        !(this.options.ecmaVersion >= 9 && e.type === 'SpreadElement') &&
        !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))
    ) {
        var s = e.key,
            r
        switch (s.type) {
            case 'Identifier':
                r = s.name
                break
            case 'Literal':
                r = String(s.value)
                break
            default:
                return
        }
        var o = e.kind
        if (this.options.ecmaVersion >= 6) {
            r === '__proto__' &&
                o === 'init' &&
                (t.proto &&
                    (i
                        ? i.doubleProto < 0 && (i.doubleProto = s.start)
                        : this.raiseRecoverable(s.start, 'Redefinition of __proto__ property')),
                (t.proto = !0))
            return
        }
        r = '$' + r
        var u = t[r]
        if (u) {
            var l
            ;(o === 'init' ? (l = (this.strict && u.init) || u.get || u.set) : (l = u.init || u[o]),
                l && this.raiseRecoverable(s.start, 'Redefinition of property'))
        } else
            u = t[r] = {
                init: !1,
                get: !1,
                set: !1,
            }
        u[o] = !0
    }
}
C.parseExpression = function (e, t) {
    var i = this.start,
        s = this.startLoc,
        r = this.parseMaybeAssign(e, t)
    if (this.type === n.comma) {
        var o = this.startNodeAt(i, s)
        for (o.expressions = [r]; this.eat(n.comma); ) o.expressions.push(this.parseMaybeAssign(e, t))
        return this.finishNode(o, 'SequenceExpression')
    }
    return r
}
C.parseMaybeAssign = function (e, t, i) {
    if (this.isContextual('yield')) {
        if (this.inGenerator) return this.parseYield(e)
        this.exprAllowed = !1
    }
    var s = !1,
        r = -1,
        o = -1,
        u = -1
    t
        ? ((r = t.parenthesizedAssign),
          (o = t.trailingComma),
          (u = t.doubleProto),
          (t.parenthesizedAssign = t.trailingComma = -1))
        : ((t = new lt()), (s = !0))
    var l = this.start,
        c = this.startLoc
    ;(this.type === n.parenL || this.type === n.name) &&
        ((this.potentialArrowAt = this.start), (this.potentialArrowInForAwait = e === 'await'))
    var d = this.parseMaybeConditional(e, t)
    if ((i && (d = i.call(this, d, l, c)), this.type.isAssign)) {
        var p = this.startNodeAt(l, c)
        return (
            (p.operator = this.value),
            this.type === n.eq && (d = this.toAssignable(d, !1, t)),
            s || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
            t.shorthandAssign >= d.start && (t.shorthandAssign = -1),
            this.type === n.eq ? this.checkLValPattern(d) : this.checkLValSimple(d),
            (p.left = d),
            this.next(),
            (p.right = this.parseMaybeAssign(e)),
            u > -1 && (t.doubleProto = u),
            this.finishNode(p, 'AssignmentExpression')
        )
    } else s && this.checkExpressionErrors(t, !0)
    return (r > -1 && (t.parenthesizedAssign = r), o > -1 && (t.trailingComma = o), d)
}
C.parseMaybeConditional = function (e, t) {
    var i = this.start,
        s = this.startLoc,
        r = this.parseExprOps(e, t)
    if (this.checkExpressionErrors(t)) return r
    if (this.eat(n.question)) {
        var o = this.startNodeAt(i, s)
        return (
            (o.test = r),
            (o.consequent = this.parseMaybeAssign()),
            this.expect(n.colon),
            (o.alternate = this.parseMaybeAssign(e)),
            this.finishNode(o, 'ConditionalExpression')
        )
    }
    return r
}
C.parseExprOps = function (e, t) {
    var i = this.start,
        s = this.startLoc,
        r = this.parseMaybeUnary(t, !1, !1, e)
    return this.checkExpressionErrors(t) || (r.start === i && r.type === 'ArrowFunctionExpression')
        ? r
        : this.parseExprOp(r, i, s, -1, e)
}
C.parseExprOp = function (e, t, i, s, r) {
    var o = this.type.binop
    if (o != null && (!r || this.type !== n._in) && o > s) {
        var u = this.type === n.logicalOR || this.type === n.logicalAND,
            l = this.type === n.coalesce
        l && (o = n.logicalAND.binop)
        var c = this.value
        this.next()
        var d = this.start,
            p = this.startLoc,
            f = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, r), d, p, o, r),
            v = this.buildBinary(t, i, e, f, c, u || l)
        return (
            ((u && this.type === n.coalesce) || (l && (this.type === n.logicalOR || this.type === n.logicalAND))) &&
                this.raiseRecoverable(
                    this.start,
                    'Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses'
                ),
            this.parseExprOp(v, t, i, s, r)
        )
    }
    return e
}
C.buildBinary = function (e, t, i, s, r, o) {
    s.type === 'PrivateIdentifier' &&
        this.raise(s.start, 'Private identifier can only be left side of binary expression')
    var u = this.startNodeAt(e, t)
    return (
        (u.left = i),
        (u.operator = r),
        (u.right = s),
        this.finishNode(u, o ? 'LogicalExpression' : 'BinaryExpression')
    )
}
C.parseMaybeUnary = function (e, t, i, s) {
    var r = this.start,
        o = this.startLoc,
        u
    if (this.isContextual('await') && this.canAwait) ((u = this.parseAwait(s)), (t = !0))
    else if (this.type.prefix) {
        var l = this.startNode(),
            c = this.type === n.incDec
        ;((l.operator = this.value),
            (l.prefix = !0),
            this.next(),
            (l.argument = this.parseMaybeUnary(null, !0, c, s)),
            this.checkExpressionErrors(e, !0),
            c
                ? this.checkLValSimple(l.argument)
                : this.strict && l.operator === 'delete' && gi(l.argument)
                  ? this.raiseRecoverable(l.start, 'Deleting local variable in strict mode')
                  : l.operator === 'delete' && kt(l.argument)
                    ? this.raiseRecoverable(l.start, 'Private fields can not be deleted')
                    : (t = !0),
            (u = this.finishNode(l, c ? 'UpdateExpression' : 'UnaryExpression')))
    } else if (!t && this.type === n.privateId)
        ((s || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(),
            (u = this.parsePrivateIdent()),
            this.type !== n._in && this.unexpected())
    else {
        if (((u = this.parseExprSubscripts(e, s)), this.checkExpressionErrors(e))) return u
        for (; this.type.postfix && !this.canInsertSemicolon(); ) {
            var d = this.startNodeAt(r, o)
            ;((d.operator = this.value),
                (d.prefix = !1),
                (d.argument = u),
                this.checkLValSimple(u),
                this.next(),
                (u = this.finishNode(d, 'UpdateExpression')))
        }
    }
    if (!i && this.eat(n.starstar))
        if (t) this.unexpected(this.lastTokStart)
        else return this.buildBinary(r, o, u, this.parseMaybeUnary(null, !1, !1, s), '**', !1)
    else return u
}
function gi(e) {
    return e.type === 'Identifier' || (e.type === 'ParenthesizedExpression' && gi(e.expression))
}
function kt(e) {
    return (
        (e.type === 'MemberExpression' && e.property.type === 'PrivateIdentifier') ||
        (e.type === 'ChainExpression' && kt(e.expression)) ||
        (e.type === 'ParenthesizedExpression' && kt(e.expression))
    )
}
C.parseExprSubscripts = function (e, t) {
    var i = this.start,
        s = this.startLoc,
        r = this.parseExprAtom(e, t)
    if (r.type === 'ArrowFunctionExpression' && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ')') return r
    var o = this.parseSubscripts(r, i, s, !1, t)
    return (
        e &&
            o.type === 'MemberExpression' &&
            (e.parenthesizedAssign >= o.start && (e.parenthesizedAssign = -1),
            e.parenthesizedBind >= o.start && (e.parenthesizedBind = -1),
            e.trailingComma >= o.start && (e.trailingComma = -1)),
        o
    )
}
C.parseSubscripts = function (e, t, i, s, r) {
    for (
        var o =
                this.options.ecmaVersion >= 8 &&
                e.type === 'Identifier' &&
                e.name === 'async' &&
                this.lastTokEnd === e.end &&
                !this.canInsertSemicolon() &&
                e.end - e.start === 5 &&
                this.potentialArrowAt === e.start,
            u = !1;
        ;
    ) {
        var l = this.parseSubscript(e, t, i, s, o, u, r)
        if ((l.optional && (u = !0), l === e || l.type === 'ArrowFunctionExpression')) {
            if (u) {
                var c = this.startNodeAt(t, i)
                ;((c.expression = l), (l = this.finishNode(c, 'ChainExpression')))
            }
            return l
        }
        e = l
    }
}
C.shouldParseAsyncArrow = function () {
    return !this.canInsertSemicolon() && this.eat(n.arrow)
}
C.parseSubscriptAsyncArrow = function (e, t, i, s) {
    return this.parseArrowExpression(this.startNodeAt(e, t), i, !0, s)
}
C.parseSubscript = function (e, t, i, s, r, o, u) {
    var l = this.options.ecmaVersion >= 11,
        c = l && this.eat(n.questionDot)
    s && c && this.raise(this.lastTokStart, 'Optional chaining cannot appear in the callee of new expressions')
    var d = this.eat(n.bracketL)
    if (d || (c && this.type !== n.parenL && this.type !== n.backQuote) || this.eat(n.dot)) {
        var p = this.startNodeAt(t, i)
        ;((p.object = e),
            d
                ? ((p.property = this.parseExpression()), this.expect(n.bracketR))
                : this.type === n.privateId && e.type !== 'Super'
                  ? (p.property = this.parsePrivateIdent())
                  : (p.property = this.parseIdent(this.options.allowReserved !== 'never')),
            (p.computed = !!d),
            l && (p.optional = c),
            (e = this.finishNode(p, 'MemberExpression')))
    } else if (!s && this.eat(n.parenL)) {
        var f = new lt(),
            v = this.yieldPos,
            x = this.awaitPos,
            y = this.awaitIdentPos
        ;((this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0))
        var m = this.parseExprList(n.parenR, this.options.ecmaVersion >= 8, !1, f)
        if (r && !c && this.shouldParseAsyncArrow())
            return (
                this.checkPatternErrors(f, !1),
                this.checkYieldAwaitInDefaultParams(),
                this.awaitIdentPos > 0 &&
                    this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"),
                (this.yieldPos = v),
                (this.awaitPos = x),
                (this.awaitIdentPos = y),
                this.parseSubscriptAsyncArrow(t, i, m, u)
            )
        ;(this.checkExpressionErrors(f, !0),
            (this.yieldPos = v || this.yieldPos),
            (this.awaitPos = x || this.awaitPos),
            (this.awaitIdentPos = y || this.awaitIdentPos))
        var S = this.startNodeAt(t, i)
        ;((S.callee = e), (S.arguments = m), l && (S.optional = c), (e = this.finishNode(S, 'CallExpression')))
    } else if (this.type === n.backQuote) {
        ;(c || o) && this.raise(this.start, 'Optional chaining cannot appear in the tag of tagged template expressions')
        var k = this.startNodeAt(t, i)
        ;((k.tag = e),
            (k.quasi = this.parseTemplate({ isTagged: !0 })),
            (e = this.finishNode(k, 'TaggedTemplateExpression')))
    }
    return e
}
C.parseExprAtom = function (e, t, i) {
    this.type === n.slash && this.readRegexp()
    var s,
        r = this.potentialArrowAt === this.start
    switch (this.type) {
        case n._super:
            return (
                this.allowSuper || this.raise(this.start, "'super' keyword outside a method"),
                (s = this.startNode()),
                this.next(),
                this.type === n.parenL &&
                    !this.allowDirectSuper &&
                    this.raise(s.start, 'super() call outside constructor of a subclass'),
                this.type !== n.dot && this.type !== n.bracketL && this.type !== n.parenL && this.unexpected(),
                this.finishNode(s, 'Super')
            )
        case n._this:
            return ((s = this.startNode()), this.next(), this.finishNode(s, 'ThisExpression'))
        case n.name:
            var o = this.start,
                u = this.startLoc,
                l = this.containsEsc,
                c = this.parseIdent(!1)
            if (
                this.options.ecmaVersion >= 8 &&
                !l &&
                c.name === 'async' &&
                !this.canInsertSemicolon() &&
                this.eat(n._function)
            )
                return (this.overrideContext(D.f_expr), this.parseFunction(this.startNodeAt(o, u), 0, !1, !0, t))
            if (r && !this.canInsertSemicolon()) {
                if (this.eat(n.arrow)) return this.parseArrowExpression(this.startNodeAt(o, u), [c], !1, t)
                if (
                    this.options.ecmaVersion >= 8 &&
                    c.name === 'async' &&
                    this.type === n.name &&
                    !l &&
                    (!this.potentialArrowInForAwait || this.value !== 'of' || this.containsEsc)
                )
                    return (
                        (c = this.parseIdent(!1)),
                        (this.canInsertSemicolon() || !this.eat(n.arrow)) && this.unexpected(),
                        this.parseArrowExpression(this.startNodeAt(o, u), [c], !0, t)
                    )
            }
            return c
        case n.regexp:
            var d = this.value
            return ((s = this.parseLiteral(d.value)), (s.regex = { pattern: d.pattern, flags: d.flags }), s)
        case n.num:
        case n.string:
            return this.parseLiteral(this.value)
        case n._null:
        case n._true:
        case n._false:
            return (
                (s = this.startNode()),
                (s.value = this.type === n._null ? null : this.type === n._true),
                (s.raw = this.type.keyword),
                this.next(),
                this.finishNode(s, 'Literal')
            )
        case n.parenL:
            var p = this.start,
                f = this.parseParenAndDistinguishExpression(r, t)
            return (
                e &&
                    (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(f) && (e.parenthesizedAssign = p),
                    e.parenthesizedBind < 0 && (e.parenthesizedBind = p)),
                f
            )
        case n.bracketL:
            return (
                (s = this.startNode()),
                this.next(),
                (s.elements = this.parseExprList(n.bracketR, !0, !0, e)),
                this.finishNode(s, 'ArrayExpression')
            )
        case n.braceL:
            return (this.overrideContext(D.b_expr), this.parseObj(!1, e))
        case n._function:
            return ((s = this.startNode()), this.next(), this.parseFunction(s, 0))
        case n._class:
            return this.parseClass(this.startNode(), !1)
        case n._new:
            return this.parseNew()
        case n.backQuote:
            return this.parseTemplate()
        case n._import:
            return this.options.ecmaVersion >= 11 ? this.parseExprImport(i) : this.unexpected()
        default:
            return this.parseExprAtomDefault()
    }
}
C.parseExprAtomDefault = function () {
    this.unexpected()
}
C.parseExprImport = function (e) {
    var t = this.startNode()
    if (
        (this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword import'),
        this.next(),
        this.type === n.parenL && !e)
    )
        return this.parseDynamicImport(t)
    if (this.type === n.dot) {
        var i = this.startNodeAt(t.start, t.loc && t.loc.start)
        return ((i.name = 'import'), (t.meta = this.finishNode(i, 'Identifier')), this.parseImportMeta(t))
    } else this.unexpected()
}
C.parseDynamicImport = function (e) {
    if ((this.next(), (e.source = this.parseMaybeAssign()), this.options.ecmaVersion >= 16))
        this.eat(n.parenR)
            ? (e.options = null)
            : (this.expect(n.comma),
              this.afterTrailingComma(n.parenR)
                  ? (e.options = null)
                  : ((e.options = this.parseMaybeAssign()),
                    this.eat(n.parenR) ||
                        (this.expect(n.comma), this.afterTrailingComma(n.parenR) || this.unexpected())))
    else if (!this.eat(n.parenR)) {
        var t = this.start
        this.eat(n.comma) && this.eat(n.parenR)
            ? this.raiseRecoverable(t, 'Trailing comma is not allowed in import()')
            : this.unexpected(t)
    }
    return this.finishNode(e, 'ImportExpression')
}
C.parseImportMeta = function (e) {
    this.next()
    var t = this.containsEsc
    return (
        (e.property = this.parseIdent(!0)),
        e.property.name !== 'meta' &&
            this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"),
        t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"),
        this.options.sourceType !== 'module' &&
            !this.options.allowImportExportEverywhere &&
            this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"),
        this.finishNode(e, 'MetaProperty')
    )
}
C.parseLiteral = function (e) {
    var t = this.startNode()
    return (
        (t.value = e),
        (t.raw = this.input.slice(this.start, this.end)),
        t.raw.charCodeAt(t.raw.length - 1) === 110 &&
            (t.bigint = t.value != null ? t.value.toString() : t.raw.slice(0, -1).replace(/_/g, '')),
        this.next(),
        this.finishNode(t, 'Literal')
    )
}
C.parseParenExpression = function () {
    this.expect(n.parenL)
    var e = this.parseExpression()
    return (this.expect(n.parenR), e)
}
C.shouldParseArrow = function (e) {
    return !this.canInsertSemicolon()
}
C.parseParenAndDistinguishExpression = function (e, t) {
    var i = this.start,
        s = this.startLoc,
        r,
        o = this.options.ecmaVersion >= 8
    if (this.options.ecmaVersion >= 6) {
        this.next()
        var u = this.start,
            l = this.startLoc,
            c = [],
            d = !0,
            p = !1,
            f = new lt(),
            v = this.yieldPos,
            x = this.awaitPos,
            y
        for (this.yieldPos = 0, this.awaitPos = 0; this.type !== n.parenR; )
            if ((d ? (d = !1) : this.expect(n.comma), o && this.afterTrailingComma(n.parenR, !0))) {
                p = !0
                break
            } else if (this.type === n.ellipsis) {
                ;((y = this.start),
                    c.push(this.parseParenItem(this.parseRestBinding())),
                    this.type === n.comma &&
                        this.raiseRecoverable(this.start, 'Comma is not permitted after the rest element'))
                break
            } else c.push(this.parseMaybeAssign(!1, f, this.parseParenItem))
        var m = this.lastTokEnd,
            S = this.lastTokEndLoc
        if ((this.expect(n.parenR), e && this.shouldParseArrow(c) && this.eat(n.arrow)))
            return (
                this.checkPatternErrors(f, !1),
                this.checkYieldAwaitInDefaultParams(),
                (this.yieldPos = v),
                (this.awaitPos = x),
                this.parseParenArrowList(i, s, c, t)
            )
        ;((!c.length || p) && this.unexpected(this.lastTokStart),
            y && this.unexpected(y),
            this.checkExpressionErrors(f, !0),
            (this.yieldPos = v || this.yieldPos),
            (this.awaitPos = x || this.awaitPos),
            c.length > 1
                ? ((r = this.startNodeAt(u, l)), (r.expressions = c), this.finishNodeAt(r, 'SequenceExpression', m, S))
                : (r = c[0]))
    } else r = this.parseParenExpression()
    if (this.options.preserveParens) {
        var k = this.startNodeAt(i, s)
        return ((k.expression = r), this.finishNode(k, 'ParenthesizedExpression'))
    } else return r
}
C.parseParenItem = function (e) {
    return e
}
C.parseParenArrowList = function (e, t, i, s) {
    return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, s)
}
var Qs = []
C.parseNew = function () {
    this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword new')
    var e = this.startNode()
    if ((this.next(), this.options.ecmaVersion >= 6 && this.type === n.dot)) {
        var t = this.startNodeAt(e.start, e.loc && e.loc.start)
        ;((t.name = 'new'), (e.meta = this.finishNode(t, 'Identifier')), this.next())
        var i = this.containsEsc
        return (
            (e.property = this.parseIdent(!0)),
            e.property.name !== 'target' &&
                this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"),
            i && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"),
            this.allowNewDotTarget ||
                this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"),
            this.finishNode(e, 'MetaProperty')
        )
    }
    var s = this.start,
        r = this.startLoc
    return (
        (e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), s, r, !0, !1)),
        this.eat(n.parenL)
            ? (e.arguments = this.parseExprList(n.parenR, this.options.ecmaVersion >= 8, !1))
            : (e.arguments = Qs),
        this.finishNode(e, 'NewExpression')
    )
}
C.parseTemplateElement = function (e) {
    var t = e.isTagged,
        i = this.startNode()
    return (
        this.type === n.invalidTemplate
            ? (t || this.raiseRecoverable(this.start, 'Bad escape sequence in untagged template literal'),
              (i.value = {
                  raw: this.value.replace(
                      /\r\n?/g,
                      `
`
                  ),
                  cooked: null,
              }))
            : (i.value = {
                  raw: this.input.slice(this.start, this.end).replace(
                      /\r\n?/g,
                      `
`
                  ),
                  cooked: this.value,
              }),
        this.next(),
        (i.tail = this.type === n.backQuote),
        this.finishNode(i, 'TemplateElement')
    )
}
C.parseTemplate = function (e) {
    e === void 0 && (e = {})
    var t = e.isTagged
    t === void 0 && (t = !1)
    var i = this.startNode()
    ;(this.next(), (i.expressions = []))
    var s = this.parseTemplateElement({ isTagged: t })
    for (i.quasis = [s]; !s.tail; )
        (this.type === n.eof && this.raise(this.pos, 'Unterminated template literal'),
            this.expect(n.dollarBraceL),
            i.expressions.push(this.parseExpression()),
            this.expect(n.braceR),
            i.quasis.push((s = this.parseTemplateElement({ isTagged: t }))))
    return (this.next(), this.finishNode(i, 'TemplateLiteral'))
}
C.isAsyncProp = function (e) {
    return (
        !e.computed &&
        e.key.type === 'Identifier' &&
        e.key.name === 'async' &&
        (this.type === n.name ||
            this.type === n.num ||
            this.type === n.string ||
            this.type === n.bracketL ||
            this.type.keyword ||
            (this.options.ecmaVersion >= 9 && this.type === n.star)) &&
        !J.test(this.input.slice(this.lastTokEnd, this.start))
    )
}
C.parseObj = function (e, t) {
    var i = this.startNode(),
        s = !0,
        r = {}
    for (i.properties = [], this.next(); !this.eat(n.braceR); ) {
        if (s) s = !1
        else if ((this.expect(n.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(n.braceR))) break
        var o = this.parseProperty(e, t)
        ;(e || this.checkPropClash(o, r, t), i.properties.push(o))
    }
    return this.finishNode(i, e ? 'ObjectPattern' : 'ObjectExpression')
}
C.parseProperty = function (e, t) {
    var i = this.startNode(),
        s,
        r,
        o,
        u
    if (this.options.ecmaVersion >= 9 && this.eat(n.ellipsis))
        return e
            ? ((i.argument = this.parseIdent(!1)),
              this.type === n.comma &&
                  this.raiseRecoverable(this.start, 'Comma is not permitted after the rest element'),
              this.finishNode(i, 'RestElement'))
            : ((i.argument = this.parseMaybeAssign(!1, t)),
              this.type === n.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start),
              this.finishNode(i, 'SpreadElement'))
    this.options.ecmaVersion >= 6 &&
        ((i.method = !1),
        (i.shorthand = !1),
        (e || t) && ((o = this.start), (u = this.startLoc)),
        e || (s = this.eat(n.star)))
    var l = this.containsEsc
    return (
        this.parsePropertyName(i),
        !e && !l && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(i)
            ? ((r = !0), (s = this.options.ecmaVersion >= 9 && this.eat(n.star)), this.parsePropertyName(i))
            : (r = !1),
        this.parsePropertyValue(i, e, s, r, o, u, t, l),
        this.finishNode(i, 'Property')
    )
}
C.parseGetterSetter = function (e) {
    var t = e.key.name
    ;(this.parsePropertyName(e), (e.value = this.parseMethod(!1)), (e.kind = t))
    var i = e.kind === 'get' ? 0 : 1
    if (e.value.params.length !== i) {
        var s = e.value.start
        e.kind === 'get'
            ? this.raiseRecoverable(s, 'getter should have no params')
            : this.raiseRecoverable(s, 'setter should have exactly one param')
    } else
        e.kind === 'set' &&
            e.value.params[0].type === 'RestElement' &&
            this.raiseRecoverable(e.value.params[0].start, 'Setter cannot use rest params')
}
C.parsePropertyValue = function (e, t, i, s, r, o, u, l) {
    ;((i || s) && this.type === n.colon && this.unexpected(),
        this.eat(n.colon)
            ? ((e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, u)),
              (e.kind = 'init'))
            : this.options.ecmaVersion >= 6 && this.type === n.parenL
              ? (t && this.unexpected(), (e.method = !0), (e.value = this.parseMethod(i, s)), (e.kind = 'init'))
              : !t &&
                  !l &&
                  this.options.ecmaVersion >= 5 &&
                  !e.computed &&
                  e.key.type === 'Identifier' &&
                  (e.key.name === 'get' || e.key.name === 'set') &&
                  this.type !== n.comma &&
                  this.type !== n.braceR &&
                  this.type !== n.eq
                ? ((i || s) && this.unexpected(), this.parseGetterSetter(e))
                : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === 'Identifier'
                  ? ((i || s) && this.unexpected(),
                    this.checkUnreserved(e.key),
                    e.key.name === 'await' && !this.awaitIdentPos && (this.awaitIdentPos = r),
                    t
                        ? (e.value = this.parseMaybeDefault(r, o, this.copyNode(e.key)))
                        : this.type === n.eq && u
                          ? (u.shorthandAssign < 0 && (u.shorthandAssign = this.start),
                            (e.value = this.parseMaybeDefault(r, o, this.copyNode(e.key))))
                          : (e.value = this.copyNode(e.key)),
                    (e.kind = 'init'),
                    (e.shorthand = !0))
                  : this.unexpected())
}
C.parsePropertyName = function (e) {
    if (this.options.ecmaVersion >= 6) {
        if (this.eat(n.bracketL))
            return ((e.computed = !0), (e.key = this.parseMaybeAssign()), this.expect(n.bracketR), e.key)
        e.computed = !1
    }
    return (e.key =
        this.type === n.num || this.type === n.string
            ? this.parseExprAtom()
            : this.parseIdent(this.options.allowReserved !== 'never'))
}
C.initFunction = function (e) {
    ;((e.id = null),
        this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
        this.options.ecmaVersion >= 8 && (e.async = !1))
}
C.parseMethod = function (e, t, i) {
    var s = this.startNode(),
        r = this.yieldPos,
        o = this.awaitPos,
        u = this.awaitIdentPos
    return (
        this.initFunction(s),
        this.options.ecmaVersion >= 6 && (s.generator = e),
        this.options.ecmaVersion >= 8 && (s.async = !!t),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        this.enterScope(Rt(t, s.generator) | ot | (i ? di : 0)),
        this.expect(n.parenL),
        (s.params = this.parseBindingList(n.parenR, !1, this.options.ecmaVersion >= 8)),
        this.checkYieldAwaitInDefaultParams(),
        this.parseFunctionBody(s, !1, !0, !1),
        (this.yieldPos = r),
        (this.awaitPos = o),
        (this.awaitIdentPos = u),
        this.finishNode(s, 'FunctionExpression')
    )
}
C.parseArrowExpression = function (e, t, i, s) {
    var r = this.yieldPos,
        o = this.awaitPos,
        u = this.awaitIdentPos
    return (
        this.enterScope(Rt(i, !1) | Pt),
        this.initFunction(e),
        this.options.ecmaVersion >= 8 && (e.async = !!i),
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        (e.params = this.toAssignableList(t, !0)),
        this.parseFunctionBody(e, !0, !1, s),
        (this.yieldPos = r),
        (this.awaitPos = o),
        (this.awaitIdentPos = u),
        this.finishNode(e, 'ArrowFunctionExpression')
    )
}
C.parseFunctionBody = function (e, t, i, s) {
    var r = t && this.type !== n.braceL,
        o = this.strict,
        u = !1
    if (r) ((e.body = this.parseMaybeAssign(s)), (e.expression = !0), this.checkParams(e, !1))
    else {
        var l = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params)
        ;(!o || l) &&
            ((u = this.strictDirective(this.end)),
            u &&
                l &&
                this.raiseRecoverable(
                    e.start,
                    "Illegal 'use strict' directive in function with non-simple parameter list"
                ))
        var c = this.labels
        ;((this.labels = []),
            u && (this.strict = !0),
            this.checkParams(e, !o && !u && !t && !i && this.isSimpleParamList(e.params)),
            this.strict && e.id && this.checkLValSimple(e.id, xi),
            (e.body = this.parseBlock(!1, void 0, u && !o)),
            (e.expression = !1),
            this.adaptDirectivePrologue(e.body.body),
            (this.labels = c))
    }
    this.exitScope()
}
C.isSimpleParamList = function (e) {
    for (var t = 0, i = e; t < i.length; t += 1) {
        var s = i[t]
        if (s.type !== 'Identifier') return !1
    }
    return !0
}
C.checkParams = function (e, t) {
    for (var i = /* @__PURE__ */ Object.create(null), s = 0, r = e.params; s < r.length; s += 1) {
        var o = r[s]
        this.checkLValInnerPattern(o, Ot, t ? null : i)
    }
}
C.parseExprList = function (e, t, i, s) {
    for (var r = [], o = !0; !this.eat(e); ) {
        if (o) o = !1
        else if ((this.expect(n.comma), t && this.afterTrailingComma(e))) break
        var u = void 0
        ;(i && this.type === n.comma
            ? (u = null)
            : this.type === n.ellipsis
              ? ((u = this.parseSpread(s)),
                s && this.type === n.comma && s.trailingComma < 0 && (s.trailingComma = this.start))
              : (u = this.parseMaybeAssign(!1, s)),
            r.push(u))
    }
    return r
}
C.checkUnreserved = function (e) {
    var t = e.start,
        i = e.end,
        s = e.name
    if (
        (this.inGenerator &&
            s === 'yield' &&
            this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"),
        this.inAsync &&
            s === 'await' &&
            this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"),
        !(this.currentThisScope().flags & ut) &&
            s === 'arguments' &&
            this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"),
        this.inClassStaticBlock &&
            (s === 'arguments' || s === 'await') &&
            this.raise(t, 'Cannot use ' + s + ' in class static initialization block'),
        this.keywords.test(s) && this.raise(t, "Unexpected keyword '" + s + "'"),
        !(this.options.ecmaVersion < 6 && this.input.slice(t, i).indexOf('\\') !== -1))
    ) {
        var r = this.strict ? this.reservedWordsStrict : this.reservedWords
        r.test(s) &&
            (!this.inAsync &&
                s === 'await' &&
                this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"),
            this.raiseRecoverable(t, "The keyword '" + s + "' is reserved"))
    }
}
C.parseIdent = function (e) {
    var t = this.parseIdentNode()
    return (
        this.next(!!e),
        this.finishNode(t, 'Identifier'),
        e || (this.checkUnreserved(t), t.name === 'await' && !this.awaitIdentPos && (this.awaitIdentPos = t.start)),
        t
    )
}
C.parseIdentNode = function () {
    var e = this.startNode()
    return (
        this.type === n.name
            ? (e.name = this.value)
            : this.type.keyword
              ? ((e.name = this.type.keyword),
                (e.name === 'class' || e.name === 'function') &&
                    (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) &&
                    this.context.pop(),
                (this.type = n.name))
              : this.unexpected(),
        e
    )
}
C.parsePrivateIdent = function () {
    var e = this.startNode()
    return (
        this.type === n.privateId ? (e.name = this.value) : this.unexpected(),
        this.next(),
        this.finishNode(e, 'PrivateIdentifier'),
        this.options.checkPrivateFields &&
            (this.privateNameStack.length === 0
                ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class")
                : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)),
        e
    )
}
C.parseYield = function (e) {
    this.yieldPos || (this.yieldPos = this.start)
    var t = this.startNode()
    return (
        this.next(),
        this.type === n.semi || this.canInsertSemicolon() || (this.type !== n.star && !this.type.startsExpr)
            ? ((t.delegate = !1), (t.argument = null))
            : ((t.delegate = this.eat(n.star)), (t.argument = this.parseMaybeAssign(e))),
        this.finishNode(t, 'YieldExpression')
    )
}
C.parseAwait = function (e) {
    this.awaitPos || (this.awaitPos = this.start)
    var t = this.startNode()
    return (this.next(), (t.argument = this.parseMaybeUnary(null, !0, !1, e)), this.finishNode(t, 'AwaitExpression'))
}
var it = q.prototype
it.raise = function (e, t) {
    var i = ci(this.input, e)
    ;((t += ' (' + i.line + ':' + i.column + ')'), this.sourceFile && (t += ' in ' + this.sourceFile))
    var s = new SyntaxError(t)
    throw ((s.pos = e), (s.loc = i), (s.raisedAt = this.pos), s)
}
it.raiseRecoverable = it.raise
it.curPosition = function () {
    if (this.options.locations) return new He(this.curLine, this.pos - this.lineStart)
}
var we = q.prototype,
    Xs = function (t) {
        ;((this.flags = t), (this.var = []), (this.lexical = []), (this.functions = []))
    }
we.enterScope = function (e) {
    this.scopeStack.push(new Xs(e))
}
we.exitScope = function () {
    this.scopeStack.pop()
}
we.treatFunctionsAsVarInScope = function (e) {
    return e.flags & Oe || (!this.inModule && e.flags & $e)
}
we.declareName = function (e, t, i) {
    var s = !1
    if (t === fe) {
        var r = this.currentScope()
        ;((s = r.lexical.indexOf(e) > -1 || r.functions.indexOf(e) > -1 || r.var.indexOf(e) > -1),
            r.lexical.push(e),
            this.inModule && r.flags & $e && delete this.undefinedExports[e])
    } else if (t === vi) {
        var o = this.currentScope()
        o.lexical.push(e)
    } else if (t === fi) {
        var u = this.currentScope()
        ;(this.treatFunctionsAsVar
            ? (s = u.lexical.indexOf(e) > -1)
            : (s = u.lexical.indexOf(e) > -1 || u.var.indexOf(e) > -1),
            u.functions.push(e))
    } else
        for (var l = this.scopeStack.length - 1; l >= 0; --l) {
            var c = this.scopeStack[l]
            if (
                (c.lexical.indexOf(e) > -1 && !(c.flags & pi && c.lexical[0] === e)) ||
                (!this.treatFunctionsAsVarInScope(c) && c.functions.indexOf(e) > -1)
            ) {
                s = !0
                break
            }
            if ((c.var.push(e), this.inModule && c.flags & $e && delete this.undefinedExports[e], c.flags & ut)) break
        }
    s && this.raiseRecoverable(i, "Identifier '" + e + "' has already been declared")
}
we.checkLocalExport = function (e) {
    this.scopeStack[0].lexical.indexOf(e.name) === -1 &&
        this.scopeStack[0].var.indexOf(e.name) === -1 &&
        (this.undefinedExports[e.name] = e)
}
we.currentScope = function () {
    return this.scopeStack[this.scopeStack.length - 1]
}
we.currentVarScope = function () {
    for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e]
        if (t.flags & (ut | ze | Ae)) return t
    }
}
we.currentThisScope = function () {
    for (var e = this.scopeStack.length - 1; ; e--) {
        var t = this.scopeStack[e]
        if (t.flags & (ut | ze | Ae) && !(t.flags & Pt)) return t
    }
}
var ct = function (t, i, s) {
        ;((this.type = ''),
            (this.start = i),
            (this.end = 0),
            t.options.locations && (this.loc = new nt(t, s)),
            t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile),
            t.options.ranges && (this.range = [i, 0]))
    },
    We = q.prototype
We.startNode = function () {
    return new ct(this, this.start, this.startLoc)
}
We.startNodeAt = function (e, t) {
    return new ct(this, e, t)
}
function bi(e, t, i, s) {
    return (
        (e.type = t),
        (e.end = i),
        this.options.locations && (e.loc.end = s),
        this.options.ranges && (e.range[1] = i),
        e
    )
}
We.finishNode = function (e, t) {
    return bi.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
}
We.finishNodeAt = function (e, t, i, s) {
    return bi.call(this, e, t, i, s)
}
We.copyNode = function (e) {
    var t = new ct(this, e.start, this.startLoc)
    for (var i in e) t[i] = e[i]
    return t
}
var Zs =
        'Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz',
    yi =
        'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS',
    Si = yi + ' Extended_Pictographic',
    Ci = Si,
    _i = Ci + ' EBase EComp EMod EPres ExtPict',
    wi = _i,
    er = wi,
    tr = {
        9: yi,
        10: Si,
        11: Ci,
        12: _i,
        13: wi,
        14: er,
    },
    ir =
        'Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji',
    sr = {
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: ir,
    },
    Xt =
        'Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu',
    Ni =
        'Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb',
    ki =
        Ni +
        ' Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd',
    Ei = ki + ' Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho',
    Ii = Ei + ' Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi',
    Ai = Ii + ' Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith',
    rr = Ai + ' ' + Zs,
    ar = {
        9: Ni,
        10: ki,
        11: Ei,
        12: Ii,
        13: Ai,
        14: rr,
    },
    ji = {}
function nr(e) {
    var t = (ji[e] = {
        binary: Ce(tr[e] + ' ' + Xt),
        binaryOfStrings: Ce(sr[e]),
        nonBinary: {
            General_Category: Ce(Xt),
            Script: Ce(ar[e]),
        },
    })
    ;((t.nonBinary.Script_Extensions = t.nonBinary.Script),
        (t.nonBinary.gc = t.nonBinary.General_Category),
        (t.nonBinary.sc = t.nonBinary.Script),
        (t.nonBinary.scx = t.nonBinary.Script_Extensions))
}
for (var xt = 0, Zt = [9, 10, 11, 12, 13, 14]; xt < Zt.length; xt += 1) {
    var or = Zt[xt]
    nr(or)
}
var g = q.prototype,
    st = function (t, i) {
        ;((this.parent = t), (this.base = i || this))
    }
st.prototype.separatedFrom = function (t) {
    for (var i = this; i; i = i.parent) for (var s = t; s; s = s.parent) if (i.base === s.base && i !== s) return !0
    return !1
}
st.prototype.sibling = function () {
    return new st(this.parent, this.base)
}
var le = function (t) {
    ;((this.parser = t),
        (this.validFlags =
            'gim' +
            (t.options.ecmaVersion >= 6 ? 'uy' : '') +
            (t.options.ecmaVersion >= 9 ? 's' : '') +
            (t.options.ecmaVersion >= 13 ? 'd' : '') +
            (t.options.ecmaVersion >= 15 ? 'v' : '')),
        (this.unicodeProperties = ji[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion]),
        (this.source = ''),
        (this.flags = ''),
        (this.start = 0),
        (this.switchU = !1),
        (this.switchV = !1),
        (this.switchN = !1),
        (this.pos = 0),
        (this.lastIntValue = 0),
        (this.lastStringValue = ''),
        (this.lastAssertionIsQuantifiable = !1),
        (this.numCapturingParens = 0),
        (this.maxBackReference = 0),
        (this.groupNames = /* @__PURE__ */ Object.create(null)),
        (this.backReferenceNames = []),
        (this.branchID = null))
}
le.prototype.reset = function (t, i, s) {
    var r = s.indexOf('v') !== -1,
        o = s.indexOf('u') !== -1
    ;((this.start = t | 0),
        (this.source = i + ''),
        (this.flags = s),
        r && this.parser.options.ecmaVersion >= 15
            ? ((this.switchU = !0), (this.switchV = !0), (this.switchN = !0))
            : ((this.switchU = o && this.parser.options.ecmaVersion >= 6),
              (this.switchV = !1),
              (this.switchN = o && this.parser.options.ecmaVersion >= 9)))
}
le.prototype.raise = function (t) {
    this.parser.raiseRecoverable(this.start, 'Invalid regular expression: /' + this.source + '/: ' + t)
}
le.prototype.at = function (t, i) {
    i === void 0 && (i = !1)
    var s = this.source,
        r = s.length
    if (t >= r) return -1
    var o = s.charCodeAt(t)
    if (!(i || this.switchU) || o <= 55295 || o >= 57344 || t + 1 >= r) return o
    var u = s.charCodeAt(t + 1)
    return u >= 56320 && u <= 57343 ? (o << 10) + u - 56613888 : o
}
le.prototype.nextIndex = function (t, i) {
    i === void 0 && (i = !1)
    var s = this.source,
        r = s.length
    if (t >= r) return r
    var o = s.charCodeAt(t),
        u
    return !(i || this.switchU) ||
        o <= 55295 ||
        o >= 57344 ||
        t + 1 >= r ||
        (u = s.charCodeAt(t + 1)) < 56320 ||
        u > 57343
        ? t + 1
        : t + 2
}
le.prototype.current = function (t) {
    return (t === void 0 && (t = !1), this.at(this.pos, t))
}
le.prototype.lookahead = function (t) {
    return (t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t))
}
le.prototype.advance = function (t) {
    ;(t === void 0 && (t = !1), (this.pos = this.nextIndex(this.pos, t)))
}
le.prototype.eat = function (t, i) {
    return (i === void 0 && (i = !1), this.current(i) === t ? (this.advance(i), !0) : !1)
}
le.prototype.eatChars = function (t, i) {
    i === void 0 && (i = !1)
    for (var s = this.pos, r = 0, o = t; r < o.length; r += 1) {
        var u = o[r],
            l = this.at(s, i)
        if (l === -1 || l !== u) return !1
        s = this.nextIndex(s, i)
    }
    return ((this.pos = s), !0)
}
g.validateRegExpFlags = function (e) {
    for (var t = e.validFlags, i = e.flags, s = !1, r = !1, o = 0; o < i.length; o++) {
        var u = i.charAt(o)
        ;(t.indexOf(u) === -1 && this.raise(e.start, 'Invalid regular expression flag'),
            i.indexOf(u, o + 1) > -1 && this.raise(e.start, 'Duplicate regular expression flag'),
            u === 'u' && (s = !0),
            u === 'v' && (r = !0))
    }
    this.options.ecmaVersion >= 15 && s && r && this.raise(e.start, 'Invalid regular expression flag')
}
function ur(e) {
    for (var t in e) return !0
    return !1
}
g.validateRegExpPattern = function (e) {
    ;(this.regexp_pattern(e),
        !e.switchN && this.options.ecmaVersion >= 9 && ur(e.groupNames) && ((e.switchN = !0), this.regexp_pattern(e)))
}
g.regexp_pattern = function (e) {
    ;((e.pos = 0),
        (e.lastIntValue = 0),
        (e.lastStringValue = ''),
        (e.lastAssertionIsQuantifiable = !1),
        (e.numCapturingParens = 0),
        (e.maxBackReference = 0),
        (e.groupNames = /* @__PURE__ */ Object.create(null)),
        (e.backReferenceNames.length = 0),
        (e.branchID = null),
        this.regexp_disjunction(e),
        e.pos !== e.source.length &&
            (e.eat(
                41
                /* ) */
            ) && e.raise("Unmatched ')'"),
            (e.eat(
                93
                /* ] */
            ) ||
                e.eat(
                    125
                    /* } */
                )) &&
                e.raise('Lone quantifier brackets')),
        e.maxBackReference > e.numCapturingParens && e.raise('Invalid escape'))
    for (var t = 0, i = e.backReferenceNames; t < i.length; t += 1) {
        var s = i[t]
        e.groupNames[s] || e.raise('Invalid named capture referenced')
    }
}
g.regexp_disjunction = function (e) {
    var t = this.options.ecmaVersion >= 16
    for (
        t && (e.branchID = new st(e.branchID, null)), this.regexp_alternative(e);
        e.eat(
            124
            /* | */
        );
    )
        (t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e))
    ;(t && (e.branchID = e.branchID.parent),
        this.regexp_eatQuantifier(e, !0) && e.raise('Nothing to repeat'),
        e.eat(
            123
            /* { */
        ) && e.raise('Lone quantifier brackets'))
}
g.regexp_alternative = function (e) {
    for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
}
g.regexp_eatTerm = function (e) {
    return this.regexp_eatAssertion(e)
        ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise('Invalid quantifier'),
          !0)
        : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e))
          ? (this.regexp_eatQuantifier(e), !0)
          : !1
}
g.regexp_eatAssertion = function (e) {
    var t = e.pos
    if (
        ((e.lastAssertionIsQuantifiable = !1),
        e.eat(
            94
            /* ^ */
        ) ||
            e.eat(
                36
                /* $ */
            ))
    )
        return !0
    if (
        e.eat(
            92
            /* \ */
        )
    ) {
        if (
            e.eat(
                66
                /* B */
            ) ||
            e.eat(
                98
                /* b */
            )
        )
            return !0
        e.pos = t
    }
    if (
        e.eat(
            40
            /* ( */
        ) &&
        e.eat(
            63
            /* ? */
        )
    ) {
        var i = !1
        if (
            (this.options.ecmaVersion >= 9 &&
                (i = e.eat(
                    60
                    /* < */
                )),
            e.eat(
                61
                /* = */
            ) ||
                e.eat(
                    33
                    /* ! */
                ))
        )
            return (
                this.regexp_disjunction(e),
                e.eat(
                    41
                    /* ) */
                ) || e.raise('Unterminated group'),
                (e.lastAssertionIsQuantifiable = !i),
                !0
            )
    }
    return ((e.pos = t), !1)
}
g.regexp_eatQuantifier = function (e, t) {
    return (
        t === void 0 && (t = !1),
        this.regexp_eatQuantifierPrefix(e, t)
            ? (e.eat(
                  63
                  /* ? */
              ),
              !0)
            : !1
    )
}
g.regexp_eatQuantifierPrefix = function (e, t) {
    return (
        e.eat(
            42
            /* * */
        ) ||
        e.eat(
            43
            /* + */
        ) ||
        e.eat(
            63
            /* ? */
        ) ||
        this.regexp_eatBracedQuantifier(e, t)
    )
}
g.regexp_eatBracedQuantifier = function (e, t) {
    var i = e.pos
    if (
        e.eat(
            123
            /* { */
        )
    ) {
        var s = 0,
            r = -1
        if (
            this.regexp_eatDecimalDigits(e) &&
            ((s = e.lastIntValue),
            e.eat(
                44
                /* , */
            ) &&
                this.regexp_eatDecimalDigits(e) &&
                (r = e.lastIntValue),
            e.eat(
                125
                /* } */
            ))
        )
            return (r !== -1 && r < s && !t && e.raise('numbers out of order in {} quantifier'), !0)
        ;(e.switchU && !t && e.raise('Incomplete quantifier'), (e.pos = i))
    }
    return !1
}
g.regexp_eatAtom = function (e) {
    return (
        this.regexp_eatPatternCharacters(e) ||
        e.eat(
            46
            /* . */
        ) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e)
    )
}
g.regexp_eatReverseSolidusAtomEscape = function (e) {
    var t = e.pos
    if (
        e.eat(
            92
            /* \ */
        )
    ) {
        if (this.regexp_eatAtomEscape(e)) return !0
        e.pos = t
    }
    return !1
}
g.regexp_eatUncapturingGroup = function (e) {
    var t = e.pos
    if (
        e.eat(
            40
            /* ( */
        )
    ) {
        if (
            e.eat(
                63
                /* ? */
            )
        ) {
            if (this.options.ecmaVersion >= 16) {
                var i = this.regexp_eatModifiers(e),
                    s = e.eat(
                        45
                        /* - */
                    )
                if (i || s) {
                    for (var r = 0; r < i.length; r++) {
                        var o = i.charAt(r)
                        i.indexOf(o, r + 1) > -1 && e.raise('Duplicate regular expression modifiers')
                    }
                    if (s) {
                        var u = this.regexp_eatModifiers(e)
                        !i && !u && e.current() === 58 && e.raise('Invalid regular expression modifiers')
                        for (var l = 0; l < u.length; l++) {
                            var c = u.charAt(l)
                            ;(u.indexOf(c, l + 1) > -1 || i.indexOf(c) > -1) &&
                                e.raise('Duplicate regular expression modifiers')
                        }
                    }
                }
            }
            if (
                e.eat(
                    58
                    /* : */
                )
            ) {
                if (
                    (this.regexp_disjunction(e),
                    e.eat(
                        41
                        /* ) */
                    ))
                )
                    return !0
                e.raise('Unterminated group')
            }
        }
        e.pos = t
    }
    return !1
}
g.regexp_eatCapturingGroup = function (e) {
    if (
        e.eat(
            40
            /* ( */
        )
    ) {
        if (
            (this.options.ecmaVersion >= 9
                ? this.regexp_groupSpecifier(e)
                : e.current() === 63 && e.raise('Invalid group'),
            this.regexp_disjunction(e),
            e.eat(
                41
                /* ) */
            ))
        )
            return ((e.numCapturingParens += 1), !0)
        e.raise('Unterminated group')
    }
    return !1
}
g.regexp_eatModifiers = function (e) {
    for (var t = '', i = 0; (i = e.current()) !== -1 && lr(i); ) ((t += pe(i)), e.advance())
    return t
}
function lr(e) {
    return e === 105 || e === 109 || e === 115
}
g.regexp_eatExtendedAtom = function (e) {
    return (
        e.eat(
            46
            /* . */
        ) ||
        this.regexp_eatReverseSolidusAtomEscape(e) ||
        this.regexp_eatCharacterClass(e) ||
        this.regexp_eatUncapturingGroup(e) ||
        this.regexp_eatCapturingGroup(e) ||
        this.regexp_eatInvalidBracedQuantifier(e) ||
        this.regexp_eatExtendedPatternCharacter(e)
    )
}
g.regexp_eatInvalidBracedQuantifier = function (e) {
    return (this.regexp_eatBracedQuantifier(e, !0) && e.raise('Nothing to repeat'), !1)
}
g.regexp_eatSyntaxCharacter = function (e) {
    var t = e.current()
    return Ti(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1
}
function Ti(e) {
    return e === 36 || (e >= 40 && e <= 43) || e === 46 || e === 63 || (e >= 91 && e <= 94) || (e >= 123 && e <= 125)
}
g.regexp_eatPatternCharacters = function (e) {
    for (var t = e.pos, i = 0; (i = e.current()) !== -1 && !Ti(i); ) e.advance()
    return e.pos !== t
}
g.regexp_eatExtendedPatternCharacter = function (e) {
    var t = e.current()
    return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124
        ? (e.advance(), !0)
        : !1
}
g.regexp_groupSpecifier = function (e) {
    if (
        e.eat(
            63
            /* ? */
        )
    ) {
        this.regexp_eatGroupName(e) || e.raise('Invalid group')
        var t = this.options.ecmaVersion >= 16,
            i = e.groupNames[e.lastStringValue]
        if (i)
            if (t)
                for (var s = 0, r = i; s < r.length; s += 1) {
                    var o = r[s]
                    o.separatedFrom(e.branchID) || e.raise('Duplicate capture group name')
                }
            else e.raise('Duplicate capture group name')
        t ? (i || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : (e.groupNames[e.lastStringValue] = !0)
    }
}
g.regexp_eatGroupName = function (e) {
    if (
        ((e.lastStringValue = ''),
        e.eat(
            60
            /* < */
        ))
    ) {
        if (
            this.regexp_eatRegExpIdentifierName(e) &&
            e.eat(
                62
                /* > */
            )
        )
            return !0
        e.raise('Invalid capture group name')
    }
    return !1
}
g.regexp_eatRegExpIdentifierName = function (e) {
    if (((e.lastStringValue = ''), this.regexp_eatRegExpIdentifierStart(e))) {
        for (e.lastStringValue += pe(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
            e.lastStringValue += pe(e.lastIntValue)
        return !0
    }
    return !1
}
g.regexp_eatRegExpIdentifierStart = function (e) {
    var t = e.pos,
        i = this.options.ecmaVersion >= 11,
        s = e.current(i)
    return (
        e.advance(i),
        s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (s = e.lastIntValue),
        cr(s) ? ((e.lastIntValue = s), !0) : ((e.pos = t), !1)
    )
}
function cr(e) {
    return oe(e, !0) || e === 36 || e === 95
}
g.regexp_eatRegExpIdentifierPart = function (e) {
    var t = e.pos,
        i = this.options.ecmaVersion >= 11,
        s = e.current(i)
    return (
        e.advance(i),
        s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (s = e.lastIntValue),
        hr(s) ? ((e.lastIntValue = s), !0) : ((e.pos = t), !1)
    )
}
function hr(e) {
    return _e(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205
}
g.regexp_eatAtomEscape = function (e) {
    return this.regexp_eatBackReference(e) ||
        this.regexp_eatCharacterClassEscape(e) ||
        this.regexp_eatCharacterEscape(e) ||
        (e.switchN && this.regexp_eatKGroupName(e))
        ? !0
        : (e.switchU && (e.current() === 99 && e.raise('Invalid unicode escape'), e.raise('Invalid escape')), !1)
}
g.regexp_eatBackReference = function (e) {
    var t = e.pos
    if (this.regexp_eatDecimalEscape(e)) {
        var i = e.lastIntValue
        if (e.switchU) return (i > e.maxBackReference && (e.maxBackReference = i), !0)
        if (i <= e.numCapturingParens) return !0
        e.pos = t
    }
    return !1
}
g.regexp_eatKGroupName = function (e) {
    if (
        e.eat(
            107
            /* k */
        )
    ) {
        if (this.regexp_eatGroupName(e)) return (e.backReferenceNames.push(e.lastStringValue), !0)
        e.raise('Invalid named reference')
    }
    return !1
}
g.regexp_eatCharacterEscape = function (e) {
    return (
        this.regexp_eatControlEscape(e) ||
        this.regexp_eatCControlLetter(e) ||
        this.regexp_eatZero(e) ||
        this.regexp_eatHexEscapeSequence(e) ||
        this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) ||
        (!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
        this.regexp_eatIdentityEscape(e)
    )
}
g.regexp_eatCControlLetter = function (e) {
    var t = e.pos
    if (
        e.eat(
            99
            /* c */
        )
    ) {
        if (this.regexp_eatControlLetter(e)) return !0
        e.pos = t
    }
    return !1
}
g.regexp_eatZero = function (e) {
    return e.current() === 48 && !ht(e.lookahead()) ? ((e.lastIntValue = 0), e.advance(), !0) : !1
}
g.regexp_eatControlEscape = function (e) {
    var t = e.current()
    return t === 116
        ? ((e.lastIntValue = 9), e.advance(), !0)
        : t === 110
          ? ((e.lastIntValue = 10), e.advance(), !0)
          : t === 118
            ? ((e.lastIntValue = 11), e.advance(), !0)
            : t === 102
              ? ((e.lastIntValue = 12), e.advance(), !0)
              : t === 114
                ? ((e.lastIntValue = 13), e.advance(), !0)
                : !1
}
g.regexp_eatControlLetter = function (e) {
    var t = e.current()
    return Pi(t) ? ((e.lastIntValue = t % 32), e.advance(), !0) : !1
}
function Pi(e) {
    return (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
}
g.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
    t === void 0 && (t = !1)
    var i = e.pos,
        s = t || e.switchU
    if (
        e.eat(
            117
            /* u */
        )
    ) {
        if (this.regexp_eatFixedHexDigits(e, 4)) {
            var r = e.lastIntValue
            if (s && r >= 55296 && r <= 56319) {
                var o = e.pos
                if (
                    e.eat(
                        92
                        /* \ */
                    ) &&
                    e.eat(
                        117
                        /* u */
                    ) &&
                    this.regexp_eatFixedHexDigits(e, 4)
                ) {
                    var u = e.lastIntValue
                    if (u >= 56320 && u <= 57343)
                        return ((e.lastIntValue = (r - 55296) * 1024 + (u - 56320) + 65536), !0)
                }
                ;((e.pos = o), (e.lastIntValue = r))
            }
            return !0
        }
        if (
            s &&
            e.eat(
                123
                /* { */
            ) &&
            this.regexp_eatHexDigits(e) &&
            e.eat(
                125
                /* } */
            ) &&
            pr(e.lastIntValue)
        )
            return !0
        ;(s && e.raise('Invalid unicode escape'), (e.pos = i))
    }
    return !1
}
function pr(e) {
    return e >= 0 && e <= 1114111
}
g.regexp_eatIdentityEscape = function (e) {
    if (e.switchU)
        return this.regexp_eatSyntaxCharacter(e)
            ? !0
            : e.eat(
                    47
                    /* / */
                )
              ? ((e.lastIntValue = 47), !0)
              : !1
    var t = e.current()
    return t !== 99 && (!e.switchN || t !== 107) ? ((e.lastIntValue = t), e.advance(), !0) : !1
}
g.regexp_eatDecimalEscape = function (e) {
    e.lastIntValue = 0
    var t = e.current()
    if (t >= 49 && t <= 57) {
        do ((e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance())
        while ((t = e.current()) >= 48 && t <= 57)
        return !0
    }
    return !1
}
var Ri = 0,
    de = 1,
    ee = 2
g.regexp_eatCharacterClassEscape = function (e) {
    var t = e.current()
    if (dr(t)) return ((e.lastIntValue = -1), e.advance(), de)
    var i = !1
    if (e.switchU && this.options.ecmaVersion >= 9 && ((i = t === 80) || t === 112)) {
        ;((e.lastIntValue = -1), e.advance())
        var s
        if (
            e.eat(
                123
                /* { */
            ) &&
            (s = this.regexp_eatUnicodePropertyValueExpression(e)) &&
            e.eat(
                125
                /* } */
            )
        )
            return (i && s === ee && e.raise('Invalid property name'), s)
        e.raise('Invalid property name')
    }
    return Ri
}
function dr(e) {
    return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87
}
g.regexp_eatUnicodePropertyValueExpression = function (e) {
    var t = e.pos
    if (
        this.regexp_eatUnicodePropertyName(e) &&
        e.eat(
            61
            /* = */
        )
    ) {
        var i = e.lastStringValue
        if (this.regexp_eatUnicodePropertyValue(e)) {
            var s = e.lastStringValue
            return (this.regexp_validateUnicodePropertyNameAndValue(e, i, s), de)
        }
    }
    if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
        var r = e.lastStringValue
        return this.regexp_validateUnicodePropertyNameOrValue(e, r)
    }
    return Ri
}
g.regexp_validateUnicodePropertyNameAndValue = function (e, t, i) {
    ;(Re(e.unicodeProperties.nonBinary, t) || e.raise('Invalid property name'),
        e.unicodeProperties.nonBinary[t].test(i) || e.raise('Invalid property value'))
}
g.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
    if (e.unicodeProperties.binary.test(t)) return de
    if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return ee
    e.raise('Invalid property name')
}
g.regexp_eatUnicodePropertyName = function (e) {
    var t = 0
    for (e.lastStringValue = ''; Oi((t = e.current())); ) ((e.lastStringValue += pe(t)), e.advance())
    return e.lastStringValue !== ''
}
function Oi(e) {
    return Pi(e) || e === 95
}
g.regexp_eatUnicodePropertyValue = function (e) {
    var t = 0
    for (e.lastStringValue = ''; fr((t = e.current())); ) ((e.lastStringValue += pe(t)), e.advance())
    return e.lastStringValue !== ''
}
function fr(e) {
    return Oi(e) || ht(e)
}
g.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
    return this.regexp_eatUnicodePropertyValue(e)
}
g.regexp_eatCharacterClass = function (e) {
    if (
        e.eat(
            91
            /* [ */
        )
    ) {
        var t = e.eat(
                94
                /* ^ */
            ),
            i = this.regexp_classContents(e)
        return (
            e.eat(
                93
                /* ] */
            ) || e.raise('Unterminated character class'),
            t && i === ee && e.raise('Negated character class may contain strings'),
            !0
        )
    }
    return !1
}
g.regexp_classContents = function (e) {
    return e.current() === 93
        ? de
        : e.switchV
          ? this.regexp_classSetExpression(e)
          : (this.regexp_nonEmptyClassRanges(e), de)
}
g.regexp_nonEmptyClassRanges = function (e) {
    for (; this.regexp_eatClassAtom(e); ) {
        var t = e.lastIntValue
        if (
            e.eat(
                45
                /* - */
            ) &&
            this.regexp_eatClassAtom(e)
        ) {
            var i = e.lastIntValue
            ;(e.switchU && (t === -1 || i === -1) && e.raise('Invalid character class'),
                t !== -1 && i !== -1 && t > i && e.raise('Range out of order in character class'))
        }
    }
}
g.regexp_eatClassAtom = function (e) {
    var t = e.pos
    if (
        e.eat(
            92
            /* \ */
        )
    ) {
        if (this.regexp_eatClassEscape(e)) return !0
        if (e.switchU) {
            var i = e.current()
            ;((i === 99 || Fi(i)) && e.raise('Invalid class escape'), e.raise('Invalid escape'))
        }
        e.pos = t
    }
    var s = e.current()
    return s !== 93 ? ((e.lastIntValue = s), e.advance(), !0) : !1
}
g.regexp_eatClassEscape = function (e) {
    var t = e.pos
    if (
        e.eat(
            98
            /* b */
        )
    )
        return ((e.lastIntValue = 8), !0)
    if (
        e.switchU &&
        e.eat(
            45
            /* - */
        )
    )
        return ((e.lastIntValue = 45), !0)
    if (
        !e.switchU &&
        e.eat(
            99
            /* c */
        )
    ) {
        if (this.regexp_eatClassControlLetter(e)) return !0
        e.pos = t
    }
    return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
}
g.regexp_classSetExpression = function (e) {
    var t = de,
        i
    if (!this.regexp_eatClassSetRange(e))
        if ((i = this.regexp_eatClassSetOperand(e))) {
            i === ee && (t = ee)
            for (
                var s = e.pos;
                e.eatChars(
                    [38, 38]
                    /* && */
                );
            ) {
                if (e.current() !== 38 && (i = this.regexp_eatClassSetOperand(e))) {
                    i !== ee && (t = de)
                    continue
                }
                e.raise('Invalid character in character class')
            }
            if (s !== e.pos) return t
            for (
                ;
                e.eatChars(
                    [45, 45]
                    /* -- */
                );
            )
                this.regexp_eatClassSetOperand(e) || e.raise('Invalid character in character class')
            if (s !== e.pos) return t
        } else e.raise('Invalid character in character class')
    for (;;)
        if (!this.regexp_eatClassSetRange(e)) {
            if (((i = this.regexp_eatClassSetOperand(e)), !i)) return t
            i === ee && (t = ee)
        }
}
g.regexp_eatClassSetRange = function (e) {
    var t = e.pos
    if (this.regexp_eatClassSetCharacter(e)) {
        var i = e.lastIntValue
        if (
            e.eat(
                45
                /* - */
            ) &&
            this.regexp_eatClassSetCharacter(e)
        ) {
            var s = e.lastIntValue
            return (i !== -1 && s !== -1 && i > s && e.raise('Range out of order in character class'), !0)
        }
        e.pos = t
    }
    return !1
}
g.regexp_eatClassSetOperand = function (e) {
    return this.regexp_eatClassSetCharacter(e)
        ? de
        : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e)
}
g.regexp_eatNestedClass = function (e) {
    var t = e.pos
    if (
        e.eat(
            91
            /* [ */
        )
    ) {
        var i = e.eat(
                94
                /* ^ */
            ),
            s = this.regexp_classContents(e)
        if (
            e.eat(
                93
                /* ] */
            )
        )
            return (i && s === ee && e.raise('Negated character class may contain strings'), s)
        e.pos = t
    }
    if (
        e.eat(
            92
            /* \ */
        )
    ) {
        var r = this.regexp_eatCharacterClassEscape(e)
        if (r) return r
        e.pos = t
    }
    return null
}
g.regexp_eatClassStringDisjunction = function (e) {
    var t = e.pos
    if (
        e.eatChars(
            [92, 113]
            /* \q */
        )
    ) {
        if (
            e.eat(
                123
                /* { */
            )
        ) {
            var i = this.regexp_classStringDisjunctionContents(e)
            if (
                e.eat(
                    125
                    /* } */
                )
            )
                return i
        } else e.raise('Invalid escape')
        e.pos = t
    }
    return null
}
g.regexp_classStringDisjunctionContents = function (e) {
    for (
        var t = this.regexp_classString(e);
        e.eat(
            124
            /* | */
        );
    )
        this.regexp_classString(e) === ee && (t = ee)
    return t
}
g.regexp_classString = function (e) {
    for (var t = 0; this.regexp_eatClassSetCharacter(e); ) t++
    return t === 1 ? de : ee
}
g.regexp_eatClassSetCharacter = function (e) {
    var t = e.pos
    if (
        e.eat(
            92
            /* \ */
        )
    )
        return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e)
            ? !0
            : e.eat(
                    98
                    /* b */
                )
              ? ((e.lastIntValue = 8), !0)
              : ((e.pos = t), !1)
    var i = e.current()
    return i < 0 || (i === e.lookahead() && vr(i)) || xr(i) ? !1 : (e.advance(), (e.lastIntValue = i), !0)
}
function vr(e) {
    return (
        e === 33 ||
        (e >= 35 && e <= 38) ||
        (e >= 42 && e <= 44) ||
        e === 46 ||
        (e >= 58 && e <= 64) ||
        e === 94 ||
        e === 96 ||
        e === 126
    )
}
function xr(e) {
    return e === 40 || e === 41 || e === 45 || e === 47 || (e >= 91 && e <= 93) || (e >= 123 && e <= 125)
}
g.regexp_eatClassSetReservedPunctuator = function (e) {
    var t = e.current()
    return mr(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1
}
function mr(e) {
    return (
        e === 33 ||
        e === 35 ||
        e === 37 ||
        e === 38 ||
        e === 44 ||
        e === 45 ||
        (e >= 58 && e <= 62) ||
        e === 64 ||
        e === 96 ||
        e === 126
    )
}
g.regexp_eatClassControlLetter = function (e) {
    var t = e.current()
    return ht(t) || t === 95 ? ((e.lastIntValue = t % 32), e.advance(), !0) : !1
}
g.regexp_eatHexEscapeSequence = function (e) {
    var t = e.pos
    if (
        e.eat(
            120
            /* x */
        )
    ) {
        if (this.regexp_eatFixedHexDigits(e, 2)) return !0
        ;(e.switchU && e.raise('Invalid escape'), (e.pos = t))
    }
    return !1
}
g.regexp_eatDecimalDigits = function (e) {
    var t = e.pos,
        i = 0
    for (e.lastIntValue = 0; ht((i = e.current())); ) ((e.lastIntValue = 10 * e.lastIntValue + (i - 48)), e.advance())
    return e.pos !== t
}
function ht(e) {
    return e >= 48 && e <= 57
}
g.regexp_eatHexDigits = function (e) {
    var t = e.pos,
        i = 0
    for (e.lastIntValue = 0; Vi((i = e.current())); ) ((e.lastIntValue = 16 * e.lastIntValue + Li(i)), e.advance())
    return e.pos !== t
}
function Vi(e) {
    return (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102)
}
function Li(e) {
    return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48
}
g.regexp_eatLegacyOctalEscapeSequence = function (e) {
    if (this.regexp_eatOctalDigit(e)) {
        var t = e.lastIntValue
        if (this.regexp_eatOctalDigit(e)) {
            var i = e.lastIntValue
            t <= 3 && this.regexp_eatOctalDigit(e)
                ? (e.lastIntValue = t * 64 + i * 8 + e.lastIntValue)
                : (e.lastIntValue = t * 8 + i)
        } else e.lastIntValue = t
        return !0
    }
    return !1
}
g.regexp_eatOctalDigit = function (e) {
    var t = e.current()
    return Fi(t) ? ((e.lastIntValue = t - 48), e.advance(), !0) : ((e.lastIntValue = 0), !1)
}
function Fi(e) {
    return e >= 48 && e <= 55
}
g.regexp_eatFixedHexDigits = function (e, t) {
    var i = e.pos
    e.lastIntValue = 0
    for (var s = 0; s < t; ++s) {
        var r = e.current()
        if (!Vi(r)) return ((e.pos = i), !1)
        ;((e.lastIntValue = 16 * e.lastIntValue + Li(r)), e.advance())
    }
    return !0
}
var Lt = function (t) {
        ;((this.type = t.type),
            (this.value = t.value),
            (this.start = t.start),
            (this.end = t.end),
            t.options.locations && (this.loc = new nt(t, t.startLoc, t.endLoc)),
            t.options.ranges && (this.range = [t.start, t.end]))
    },
    E = q.prototype
E.next = function (e) {
    ;(!e &&
        this.type.keyword &&
        this.containsEsc &&
        this.raiseRecoverable(this.start, 'Escape sequence in keyword ' + this.type.keyword),
        this.options.onToken && this.options.onToken(new Lt(this)),
        (this.lastTokEnd = this.end),
        (this.lastTokStart = this.start),
        (this.lastTokEndLoc = this.endLoc),
        (this.lastTokStartLoc = this.startLoc),
        this.nextToken())
}
E.getToken = function () {
    return (this.next(), new Lt(this))
}
typeof Symbol < 'u' &&
    (E[Symbol.iterator] = function () {
        var e = this
        return {
            next: function () {
                var t = e.getToken()
                return {
                    done: t.type === n.eof,
                    value: t,
                }
            },
        }
    })
E.nextToken = function () {
    var e = this.curContext()
    if (
        ((!e || !e.preserveSpace) && this.skipSpace(),
        (this.start = this.pos),
        this.options.locations && (this.startLoc = this.curPosition()),
        this.pos >= this.input.length)
    )
        return this.finishToken(n.eof)
    if (e.override) return e.override(this)
    this.readToken(this.fullCharCodeAtPos())
}
E.readToken = function (e) {
    return oe(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e)
}
E.fullCharCodeAtPos = function () {
    var e = this.input.charCodeAt(this.pos)
    if (e <= 55295 || e >= 56320) return e
    var t = this.input.charCodeAt(this.pos + 1)
    return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888
}
E.skipBlockComment = function () {
    var e = this.options.onComment && this.curPosition(),
        t = this.pos,
        i = this.input.indexOf('*/', (this.pos += 2))
    if ((i === -1 && this.raise(this.pos - 2, 'Unterminated comment'), (this.pos = i + 2), this.options.locations))
        for (var s = void 0, r = t; (s = oi(this.input, r, this.pos)) > -1; ) (++this.curLine, (r = this.lineStart = s))
    this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, i), t, this.pos, e, this.curPosition())
}
E.skipLineComment = function (e) {
    for (
        var t = this.pos, i = this.options.onComment && this.curPosition(), s = this.input.charCodeAt((this.pos += e));
        this.pos < this.input.length && !Pe(s);
    )
        s = this.input.charCodeAt(++this.pos)
    this.options.onComment &&
        this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, i, this.curPosition())
}
E.skipSpace = function () {
    e: for (; this.pos < this.input.length; ) {
        var e = this.input.charCodeAt(this.pos)
        switch (e) {
            case 32:
            case 160:
                ++this.pos
                break
            case 13:
                this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos
            case 10:
            case 8232:
            case 8233:
                ;(++this.pos, this.options.locations && (++this.curLine, (this.lineStart = this.pos)))
                break
            case 47:
                switch (this.input.charCodeAt(this.pos + 1)) {
                    case 42:
                        this.skipBlockComment()
                        break
                    case 47:
                        this.skipLineComment(2)
                        break
                    default:
                        break e
                }
                break
            default:
                if ((e > 8 && e < 14) || (e >= 5760 && ui.test(String.fromCharCode(e)))) ++this.pos
                else break e
        }
    }
}
E.finishToken = function (e, t) {
    ;((this.end = this.pos), this.options.locations && (this.endLoc = this.curPosition()))
    var i = this.type
    ;((this.type = e), (this.value = t), this.updateContext(i))
}
E.readToken_dot = function () {
    var e = this.input.charCodeAt(this.pos + 1)
    if (e >= 48 && e <= 57) return this.readNumber(!0)
    var t = this.input.charCodeAt(this.pos + 2)
    return this.options.ecmaVersion >= 6 && e === 46 && t === 46
        ? ((this.pos += 3), this.finishToken(n.ellipsis))
        : (++this.pos, this.finishToken(n.dot))
}
E.readToken_slash = function () {
    var e = this.input.charCodeAt(this.pos + 1)
    return this.exprAllowed
        ? (++this.pos, this.readRegexp())
        : e === 61
          ? this.finishOp(n.assign, 2)
          : this.finishOp(n.slash, 1)
}
E.readToken_mult_modulo_exp = function (e) {
    var t = this.input.charCodeAt(this.pos + 1),
        i = 1,
        s = e === 42 ? n.star : n.modulo
    return (
        this.options.ecmaVersion >= 7 &&
            e === 42 &&
            t === 42 &&
            (++i, (s = n.starstar), (t = this.input.charCodeAt(this.pos + 2))),
        t === 61 ? this.finishOp(n.assign, i + 1) : this.finishOp(s, i)
    )
}
E.readToken_pipe_amp = function (e) {
    var t = this.input.charCodeAt(this.pos + 1)
    if (t === e) {
        if (this.options.ecmaVersion >= 12) {
            var i = this.input.charCodeAt(this.pos + 2)
            if (i === 61) return this.finishOp(n.assign, 3)
        }
        return this.finishOp(e === 124 ? n.logicalOR : n.logicalAND, 2)
    }
    return t === 61 ? this.finishOp(n.assign, 2) : this.finishOp(e === 124 ? n.bitwiseOR : n.bitwiseAND, 1)
}
E.readToken_caret = function () {
    var e = this.input.charCodeAt(this.pos + 1)
    return e === 61 ? this.finishOp(n.assign, 2) : this.finishOp(n.bitwiseXOR, 1)
}
E.readToken_plus_min = function (e) {
    var t = this.input.charCodeAt(this.pos + 1)
    return t === e
        ? t === 45 &&
          !this.inModule &&
          this.input.charCodeAt(this.pos + 2) === 62 &&
          (this.lastTokEnd === 0 || J.test(this.input.slice(this.lastTokEnd, this.pos)))
            ? (this.skipLineComment(3), this.skipSpace(), this.nextToken())
            : this.finishOp(n.incDec, 2)
        : t === 61
          ? this.finishOp(n.assign, 2)
          : this.finishOp(n.plusMin, 1)
}
E.readToken_lt_gt = function (e) {
    var t = this.input.charCodeAt(this.pos + 1),
        i = 1
    return t === e
        ? ((i = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2),
          this.input.charCodeAt(this.pos + i) === 61 ? this.finishOp(n.assign, i + 1) : this.finishOp(n.bitShift, i))
        : t === 33 &&
            e === 60 &&
            !this.inModule &&
            this.input.charCodeAt(this.pos + 2) === 45 &&
            this.input.charCodeAt(this.pos + 3) === 45
          ? (this.skipLineComment(4), this.skipSpace(), this.nextToken())
          : (t === 61 && (i = 2), this.finishOp(n.relational, i))
}
E.readToken_eq_excl = function (e) {
    var t = this.input.charCodeAt(this.pos + 1)
    return t === 61
        ? this.finishOp(n.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2)
        : e === 61 && t === 62 && this.options.ecmaVersion >= 6
          ? ((this.pos += 2), this.finishToken(n.arrow))
          : this.finishOp(e === 61 ? n.eq : n.prefix, 1)
}
E.readToken_question = function () {
    var e = this.options.ecmaVersion
    if (e >= 11) {
        var t = this.input.charCodeAt(this.pos + 1)
        if (t === 46) {
            var i = this.input.charCodeAt(this.pos + 2)
            if (i < 48 || i > 57) return this.finishOp(n.questionDot, 2)
        }
        if (t === 63) {
            if (e >= 12) {
                var s = this.input.charCodeAt(this.pos + 2)
                if (s === 61) return this.finishOp(n.assign, 3)
            }
            return this.finishOp(n.coalesce, 2)
        }
    }
    return this.finishOp(n.question, 1)
}
E.readToken_numberSign = function () {
    var e = this.options.ecmaVersion,
        t = 35
    if (e >= 13 && (++this.pos, (t = this.fullCharCodeAtPos()), oe(t, !0) || t === 92))
        return this.finishToken(n.privateId, this.readWord1())
    this.raise(this.pos, "Unexpected character '" + pe(t) + "'")
}
E.getTokenFromCode = function (e) {
    switch (e) {
        // The interpretation of a dot depends on whether it is followed
        // by a digit or another two dots.
        case 46:
            return this.readToken_dot()
        // Punctuation tokens.
        case 40:
            return (++this.pos, this.finishToken(n.parenL))
        case 41:
            return (++this.pos, this.finishToken(n.parenR))
        case 59:
            return (++this.pos, this.finishToken(n.semi))
        case 44:
            return (++this.pos, this.finishToken(n.comma))
        case 91:
            return (++this.pos, this.finishToken(n.bracketL))
        case 93:
            return (++this.pos, this.finishToken(n.bracketR))
        case 123:
            return (++this.pos, this.finishToken(n.braceL))
        case 125:
            return (++this.pos, this.finishToken(n.braceR))
        case 58:
            return (++this.pos, this.finishToken(n.colon))
        case 96:
            if (this.options.ecmaVersion < 6) break
            return (++this.pos, this.finishToken(n.backQuote))
        case 48:
            var t = this.input.charCodeAt(this.pos + 1)
            if (t === 120 || t === 88) return this.readRadixNumber(16)
            if (this.options.ecmaVersion >= 6) {
                if (t === 111 || t === 79) return this.readRadixNumber(8)
                if (t === 98 || t === 66) return this.readRadixNumber(2)
            }
        // Anything else beginning with a digit is an integer, octal
        // number, or float.
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            return this.readNumber(!1)
        // Quotes produce strings.
        case 34:
        case 39:
            return this.readString(e)
        // Operators are parsed inline in tiny state machines. '=' (61) is
        // often referred to. `finishOp` simply skips the amount of
        // characters it is given as second argument, and returns a token
        // of the type given by its first argument.
        case 47:
            return this.readToken_slash()
        case 37:
        case 42:
            return this.readToken_mult_modulo_exp(e)
        case 124:
        case 38:
            return this.readToken_pipe_amp(e)
        case 94:
            return this.readToken_caret()
        case 43:
        case 45:
            return this.readToken_plus_min(e)
        case 60:
        case 62:
            return this.readToken_lt_gt(e)
        case 61:
        case 33:
            return this.readToken_eq_excl(e)
        case 63:
            return this.readToken_question()
        case 126:
            return this.finishOp(n.prefix, 1)
        case 35:
            return this.readToken_numberSign()
    }
    this.raise(this.pos, "Unexpected character '" + pe(e) + "'")
}
E.finishOp = function (e, t) {
    var i = this.input.slice(this.pos, this.pos + t)
    return ((this.pos += t), this.finishToken(e, i))
}
E.readRegexp = function () {
    for (var e, t, i = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(i, 'Unterminated regular expression')
        var s = this.input.charAt(this.pos)
        if ((J.test(s) && this.raise(i, 'Unterminated regular expression'), e)) e = !1
        else {
            if (s === '[') t = !0
            else if (s === ']' && t) t = !1
            else if (s === '/' && !t) break
            e = s === '\\'
        }
        ++this.pos
    }
    var r = this.input.slice(i, this.pos)
    ++this.pos
    var o = this.pos,
        u = this.readWord1()
    this.containsEsc && this.unexpected(o)
    var l = this.regexpState || (this.regexpState = new le(this))
    ;(l.reset(i, r, u), this.validateRegExpFlags(l), this.validateRegExpPattern(l))
    var c = null
    try {
        c = new RegExp(r, u)
    } catch {}
    return this.finishToken(n.regexp, { pattern: r, flags: u, value: c })
}
E.readInt = function (e, t, i) {
    for (
        var s = this.options.ecmaVersion >= 12 && t === void 0,
            r = i && this.input.charCodeAt(this.pos) === 48,
            o = this.pos,
            u = 0,
            l = 0,
            c = 0,
            d = t ?? 1 / 0;
        c < d;
        ++c, ++this.pos
    ) {
        var p = this.input.charCodeAt(this.pos),
            f = void 0
        if (s && p === 95) {
            ;(r && this.raiseRecoverable(this.pos, 'Numeric separator is not allowed in legacy octal numeric literals'),
                l === 95 && this.raiseRecoverable(this.pos, 'Numeric separator must be exactly one underscore'),
                c === 0 && this.raiseRecoverable(this.pos, 'Numeric separator is not allowed at the first of digits'),
                (l = p))
            continue
        }
        if (
            (p >= 97
                ? (f = p - 97 + 10)
                : p >= 65
                  ? (f = p - 65 + 10)
                  : p >= 48 && p <= 57
                    ? (f = p - 48)
                    : (f = 1 / 0),
            f >= e)
        )
            break
        ;((l = p), (u = u * e + f))
    }
    return (
        s && l === 95 && this.raiseRecoverable(this.pos - 1, 'Numeric separator is not allowed at the last of digits'),
        this.pos === o || (t != null && this.pos - o !== t) ? null : u
    )
}
function gr(e, t) {
    return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ''))
}
function Di(e) {
    return typeof BigInt != 'function' ? null : BigInt(e.replace(/_/g, ''))
}
E.readRadixNumber = function (e) {
    var t = this.pos
    this.pos += 2
    var i = this.readInt(e)
    return (
        i == null && this.raise(this.start + 2, 'Expected number in radix ' + e),
        this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110
            ? ((i = Di(this.input.slice(t, this.pos))), ++this.pos)
            : oe(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'),
        this.finishToken(n.num, i)
    )
}
E.readNumber = function (e) {
    var t = this.pos
    !e && this.readInt(10, void 0, !0) === null && this.raise(t, 'Invalid number')
    var i = this.pos - t >= 2 && this.input.charCodeAt(t) === 48
    i && this.strict && this.raise(t, 'Invalid number')
    var s = this.input.charCodeAt(this.pos)
    if (!i && !e && this.options.ecmaVersion >= 11 && s === 110) {
        var r = Di(this.input.slice(t, this.pos))
        return (
            ++this.pos,
            oe(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'),
            this.finishToken(n.num, r)
        )
    }
    ;(i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1),
        s === 46 && !i && (++this.pos, this.readInt(10), (s = this.input.charCodeAt(this.pos))),
        (s === 69 || s === 101) &&
            !i &&
            ((s = this.input.charCodeAt(++this.pos)),
            (s === 43 || s === 45) && ++this.pos,
            this.readInt(10) === null && this.raise(t, 'Invalid number')),
        oe(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'))
    var o = gr(this.input.slice(t, this.pos), i)
    return this.finishToken(n.num, o)
}
E.readCodePoint = function () {
    var e = this.input.charCodeAt(this.pos),
        t
    if (e === 123) {
        this.options.ecmaVersion < 6 && this.unexpected()
        var i = ++this.pos
        ;((t = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos)),
            ++this.pos,
            t > 1114111 && this.invalidStringToken(i, 'Code point out of bounds'))
    } else t = this.readHexChar(4)
    return t
}
E.readString = function (e) {
    for (var t = '', i = ++this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, 'Unterminated string constant')
        var s = this.input.charCodeAt(this.pos)
        if (s === e) break
        s === 92
            ? ((t += this.input.slice(i, this.pos)), (t += this.readEscapedChar(!1)), (i = this.pos))
            : s === 8232 || s === 8233
              ? (this.options.ecmaVersion < 10 && this.raise(this.start, 'Unterminated string constant'),
                ++this.pos,
                this.options.locations && (this.curLine++, (this.lineStart = this.pos)))
              : (Pe(s) && this.raise(this.start, 'Unterminated string constant'), ++this.pos)
    }
    return ((t += this.input.slice(i, this.pos++)), this.finishToken(n.string, t))
}
var Bi = {}
E.tryReadTemplateToken = function () {
    this.inTemplateElement = !0
    try {
        this.readTmplToken()
    } catch (e) {
        if (e === Bi) this.readInvalidTemplateToken()
        else throw e
    }
    this.inTemplateElement = !1
}
E.invalidStringToken = function (e, t) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Bi
    this.raise(e, t)
}
E.readTmplToken = function () {
    for (var e = '', t = this.pos; ; ) {
        this.pos >= this.input.length && this.raise(this.start, 'Unterminated template')
        var i = this.input.charCodeAt(this.pos)
        if (i === 96 || (i === 36 && this.input.charCodeAt(this.pos + 1) === 123))
            return this.pos === this.start && (this.type === n.template || this.type === n.invalidTemplate)
                ? i === 36
                    ? ((this.pos += 2), this.finishToken(n.dollarBraceL))
                    : (++this.pos, this.finishToken(n.backQuote))
                : ((e += this.input.slice(t, this.pos)), this.finishToken(n.template, e))
        if (i === 92) ((e += this.input.slice(t, this.pos)), (e += this.readEscapedChar(!0)), (t = this.pos))
        else if (Pe(i)) {
            switch (((e += this.input.slice(t, this.pos)), ++this.pos, i)) {
                case 13:
                    this.input.charCodeAt(this.pos) === 10 && ++this.pos
                case 10:
                    e += `
`
                    break
                default:
                    e += String.fromCharCode(i)
                    break
            }
            ;(this.options.locations && (++this.curLine, (this.lineStart = this.pos)), (t = this.pos))
        } else ++this.pos
    }
}
E.readInvalidTemplateToken = function () {
    for (; this.pos < this.input.length; this.pos++)
        switch (this.input[this.pos]) {
            case '\\':
                ++this.pos
                break
            case '$':
                if (this.input[this.pos + 1] !== '{') break
            // fall through
            case '`':
                return this.finishToken(n.invalidTemplate, this.input.slice(this.start, this.pos))
            case '\r':
                this.input[this.pos + 1] ===
                    `
` && ++this.pos
            // fall through
            case `
`:
            case '\u2028':
            case '\u2029':
                ;(++this.curLine, (this.lineStart = this.pos + 1))
                break
        }
    this.raise(this.start, 'Unterminated template')
}
E.readEscapedChar = function (e) {
    var t = this.input.charCodeAt(++this.pos)
    switch ((++this.pos, t)) {
        case 110:
            return `
`
        // 'n' -> '\n'
        case 114:
            return '\r'
        // 'r' -> '\r'
        case 120:
            return String.fromCharCode(this.readHexChar(2))
        // 'x'
        case 117:
            return pe(this.readCodePoint())
        // 'u'
        case 116:
            return '	'
        // 't' -> '\t'
        case 98:
            return '\b'
        // 'b' -> '\b'
        case 118:
            return '\v'
        // 'v' -> '\u000b'
        case 102:
            return '\f'
        // 'f' -> '\f'
        case 13:
            this.input.charCodeAt(this.pos) === 10 && ++this.pos
        // '\r\n'
        case 10:
            return (this.options.locations && ((this.lineStart = this.pos), ++this.curLine), '')
        case 56:
        case 57:
            if ((this.strict && this.invalidStringToken(this.pos - 1, 'Invalid escape sequence'), e)) {
                var i = this.pos - 1
                this.invalidStringToken(i, 'Invalid escape sequence in template string')
            }
        default:
            if (t >= 48 && t <= 55) {
                var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
                    r = parseInt(s, 8)
                return (
                    r > 255 && ((s = s.slice(0, -1)), (r = parseInt(s, 8))),
                    (this.pos += s.length - 1),
                    (t = this.input.charCodeAt(this.pos)),
                    (s !== '0' || t === 56 || t === 57) &&
                        (this.strict || e) &&
                        this.invalidStringToken(
                            this.pos - 1 - s.length,
                            e ? 'Octal literal in template string' : 'Octal literal in strict mode'
                        ),
                    String.fromCharCode(r)
                )
            }
            return Pe(t)
                ? (this.options.locations && ((this.lineStart = this.pos), ++this.curLine), '')
                : String.fromCharCode(t)
    }
}
E.readHexChar = function (e) {
    var t = this.pos,
        i = this.readInt(16, e)
    return (i === null && this.invalidStringToken(t, 'Bad character escape sequence'), i)
}
E.readWord1 = function () {
    this.containsEsc = !1
    for (var e = '', t = !0, i = this.pos, s = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
        var r = this.fullCharCodeAtPos()
        if (_e(r, s)) this.pos += r <= 65535 ? 1 : 2
        else if (r === 92) {
            ;((this.containsEsc = !0), (e += this.input.slice(i, this.pos)))
            var o = this.pos
            ;(this.input.charCodeAt(++this.pos) !== 117 &&
                this.invalidStringToken(this.pos, 'Expecting Unicode escape sequence \\uXXXX'),
                ++this.pos)
            var u = this.readCodePoint()
            ;((t ? oe : _e)(u, s) || this.invalidStringToken(o, 'Invalid Unicode escape'), (e += pe(u)), (i = this.pos))
        } else break
        t = !1
    }
    return e + this.input.slice(i, this.pos)
}
E.readWord = function () {
    var e = this.readWord1(),
        t = n.name
    return (this.keywords.test(e) && (t = jt[e]), this.finishToken(t, e))
}
var br = '8.15.0'
q.acorn = {
    Parser: q,
    version: br,
    defaultOptions: wt,
    Position: He,
    SourceLocation: nt,
    getLineInfo: ci,
    Node: ct,
    TokenType: j,
    tokTypes: n,
    keywordTypes: jt,
    TokContext: re,
    tokContexts: D,
    isIdentifierChar: _e,
    isIdentifierStart: oe,
    Token: Lt,
    isNewLine: Pe,
    lineBreak: J,
    lineBreakG: Us,
    nonASCIIwhitespace: ui,
}
function rt(e, t) {
    return q.parse(e, t)
}
function ei(e) {
    return e?.type === 'FunctionDeclaration'
}
function yr(e) {
    return e?.type === 'FunctionExpression'
}
function Ue(e) {
    return e?.type === 'ExpressionStatement'
}
function ti(e) {
    return e?.type === 'BlockStatement'
}
function Sr(e) {
    return e?.type === 'ReturnStatement'
}
function Cr(e) {
    return e?.type === 'ArrowFunctionExpression'
}
function _r(e) {
    return e?.type === 'IfStatement'
}
class Mi {
    extract(t) {
        try {
            const i = t.toString(),
                s = this._parseFunction(i)
            if (s.body.length === 0) return null
            const r = s.body[0]
            return this._extractFromTopLevel(r)
        } catch (i) {
            return (console.error('AST extraction failed:', i), this._stringFallback(t.toString()))
        }
    }
    _parseFunction(t) {
        return rt(t, {
            ecmaVersion: 'latest',
            sourceType: 'script',
            allowReturnOutsideFunction: !0,
            locations: !0,
        })
    }
    _extractFromTopLevel(t) {
        if (Ue(t) && t.expression.type === 'ArrowFunctionExpression')
            return this._extractFromArrowFunction(t.expression)
        if (Cr(t)) return this._extractFromArrowFunction(t)
        if (ei(t) || (Ue(t) && yr(t.expression))) {
            const i = ei(t) ? t : t.expression
            if ('body' in i && ti(i.body)) return this._extractFromBlock(i.body)
        }
        return Ue(t) && t.expression ? t.expression : null
    }
    _extractFromArrowFunction(t) {
        return ti(t.body) ? this._extractFromBlock(t.body) : this._isConditionExpression(t.body) ? t.body : null
    }
    _extractFromBlock(t) {
        const i = t.body.filter(_r),
            s = t.body.filter(Sr),
            r = []
        for (const o of i) {
            const u = this._hasReturnInBlock(o.consequent),
                l = this._hasReturnInAlternate(o.alternate)
            ;(u || l) && r.push(o)
        }
        if (r.length > 0) {
            const o = r.map((f) => f.test),
                u = o.length === 1 ? o[0] : this._combineConditionsWithOr(o)
            let l, c
            const d = (f) => {
                    if (f) {
                        if (f.type === 'ReturnStatement') return f.argument
                        if (f.type === 'BlockStatement') {
                            const v = f.body.find((x) => x.type === 'ReturnStatement')
                            return v ? v.argument : void 0
                        }
                        if (f.type === 'IfStatement') return d(f.consequent) || d(f.alternate)
                    }
                },
                p = r.find((f) => this._hasReturnInBlock(f.consequent) || this._hasReturnInAlternate(f.alternate))
            if (p) {
                ;((l = d(p.consequent)), (c = d(p.alternate)))
                const f = t.body.findIndex((v) => v === p)
                if (c === void 0 && f >= 0)
                    for (let v = f + 1; v < t.body.length; v++) {
                        const x = t.body[v]
                        if (x.type === 'ReturnStatement') {
                            c = x.argument
                            break
                        }
                    }
            }
            if (l || c)
                return {
                    type: 'ConditionalExpression',
                    test: u,
                    consequent: l || { type: 'Identifier', name: 'undefined' },
                    alternate: c || { type: 'Identifier', name: 'undefined' },
                    start: u.start || 0,
                    end: u.end || 0,
                    loc: {
                        start: { line: 0, column: 0 },
                        end: { line: 0, column: 0 },
                    },
                }
        }
        for (const o of s) if (o.argument && this._isComplexCondition(o.argument)) return o.argument
        return this._fallbackExtraction(i, s)
    }
    _extractRoutingConditions(t) {
        const i = []
        for (const s of t) {
            const r = this._hasReturnInBlock(s.consequent),
                o = this._hasReturnInAlternate(s.alternate)
            ;(r || o) && i.push(s.test)
        }
        return i
    }
    _hasReturnInBlock(t) {
        return t
            ? t.type === 'ReturnStatement'
                ? !0
                : t.type === 'BlockStatement'
                  ? t.body.some((i) => i.type === 'ReturnStatement')
                  : !1
            : !1
    }
    _hasReturnInAlternate(t) {
        return t
            ? t.type === 'ReturnStatement'
                ? !0
                : t.type === 'IfStatement'
                  ? this._hasReturnInBlock(t.consequent)
                  : t.type === 'BlockStatement'
                    ? this._hasReturnInBlock(t)
                    : !1
            : !1
    }
    _combineConditionsWithOr(t) {
        let i = t[0]
        for (let s = 1; s < t.length; s++)
            i = {
                type: 'LogicalExpression',
                operator: '||',
                left: i,
                right: t[s],
                start: Math.min(i.start || 0, t[s].start || 0),
                end: Math.max(i.end || 0, t[s].end || 0),
                loc: {
                    start: { line: 0, column: 0 },
                    end: { line: 0, column: 0 },
                },
            }
        return i
    }
    _fallbackExtraction(t, i) {
        for (const s of t) if (this._isComplexCondition(s.test) || s.test.type === 'Identifier') return s.test
        return t.length > 0 ? t[0].test : i.length > 0 && i[0].argument ? i[0].argument : null
    }
    _isConditionExpression(t) {
        return this._isComplexCondition(t)
    }
    _isComplexCondition(t) {
        return t
            ? [
                  'BinaryExpression',
                  'LogicalExpression',
                  'CallExpression',
                  'UnaryExpression',
                  'ConditionalExpression',
                  'MemberExpression',
                  'ChainExpression',
              ].includes(t.type)
            : !1
    }
    _stringFallback(t) {
        const i = /if\s*\(\s*([^)]+)\s*\)/,
            s = t.match(i)
        if (s)
            try {
                const r = rt(`(${s[1].trim()})`, {
                    sourceType: 'script',
                    ecmaVersion: 'latest',
                })
                if (r.body.length > 0) return Ue(r.body[0]) ? r.body[0].expression : null
            } catch {}
        return null
    }
}
class wr {
    getEmptyGroup() {
        return {
            id: this.generateId(),
            logic: 'AND',
            rules: [],
        }
    }
}
function Nr(e, t, i = 'TB') {
    const s = new Ze.graphlib.Graph()
    return (
        s.setDefaultEdgeLabel(() => ({})),
        s.setGraph({ rankdir: i }),
        e.forEach((o) => {
            s.setNode(o.id, { width: 250, height: 120 })
        }),
        t.forEach((o) => {
            s.setEdge(o.source, o.target)
        }),
        Ze.layout(s),
        {
            nodes: e.map((o) => {
                const u = s.node(o.id)
                return {
                    ...o,
                    position: {
                        x: u.x - 125,
                        // Adjust for node width
                        y: u.y - 60,
                        // Adjust for node height
                    },
                }
            }),
            edges: t,
        }
    )
}
const Ft = (e) => {
        const t = e.payload
        return t?.title
            ? t.title
            : t?.label
              ? t.label
              : t?.question
                ? t.question
                : t?.componentKey
                  ? t.componentKey
                  : String(e.id)
    },
    te = (e) => `${e}-${Math.random().toString(36).substr(2, 6)}`,
    Dt = (e) => {
        const t = e.payload
        if (t?.description) return t.description
        if (t?.subtitle) return t.subtitle
        if (t?.options && Array.isArray(t.options)) return `${t.options.length} options`
        if (t?.items && Array.isArray(t.items)) return `${t.items.length} items`
    },
    Bt = (e) => {
        switch (e) {
            case 'SINGLE_CHOICE':
            case 'MULTIPLE_CHOICE':
                return { options: [] }
            case 'CHECKLIST':
                return { dataKey: 'checklist_data', items: [] }
            case 'CUSTOM_COMPONENT':
                return { componentKey: 'DefaultComponent' }
            default:
                return {}
        }
    }
class Ui extends wr {
    _fieldExtractor = new As()
    _literalExtractor = new Os()
    _binaryParser = new Ir(this._fieldExtractor, this._literalExtractor)
    visit(t) {
        if (!t) return this.getEmptyGroup()
        switch ((t.type === 'ChainExpression' && (t = t.expression), t.type)) {
            case 'LogicalExpression':
                return this.visitLogicalExpression(t)
            case 'ConditionalExpression':
                return this.visitConditionalExpression(t)
            case 'IfStatement':
                return this.visitIfStatement(t)
            case 'BinaryExpression':
                return this.visitBinaryExpression(t)
            case 'MemberExpression':
                return this.visitMemberExpression(t)
            case 'Identifier':
                return this.visitIdentifier(t)
            case 'Literal':
                return this.visitLiteral(t)
            default:
                return (console.warn(`Unsupported node type: ${t.type}`), this.getEmptyGroup())
        }
    }
    visitBinaryExpression(t) {
        return this._binaryParser.parse(t)
    }
    visitLogicalExpression(t) {
        const i = this.visit(t.left),
            s = this.visit(t.right),
            r = t.operator === '&&' ? 'AND' : 'OR'
        return this._flattenLogicalTree(r, i, s)
    }
    visitMemberExpression(t) {
        const i = this._fieldExtractor.extract(t)
        return {
            id: this.generateId(),
            field: i,
            operator: 'exists',
            value: !0,
            valueType: 'boolean',
        }
    }
    visitConditionalExpression(t) {
        return this.visit(t.test)
    }
    visitIfStatement(t) {
        return this.visit(t.test)
    }
    visitIdentifier(t) {
        if (['true', 'false'].includes(t.name.toLowerCase()))
            return {
                id: this.generateId(),
                field: '',
                operator: t.name.toLowerCase() === 'true' ? 'equals' : 'not_equals',
                value: t.name.toLowerCase() === 'true',
                valueType: 'boolean',
            }
        const i = t.name.toLowerCase().includes('env') ? t.name : `flowData.${t.name}`
        return {
            id: this.generateId(),
            field: i,
            operator: 'exists',
            value: !0,
            valueType: 'boolean',
        }
    }
    visitLiteral(t) {
        return {
            id: this.generateId(),
            field: '',
            operator: 'equals',
            value: t.value,
            valueType: this._literalExtractor.getValueType(t.value),
        }
    }
    generateId() {
        return te('rule')
    }
    _flattenLogicalTree(t, i, s) {
        const r = (u) =>
            'rules' in u && Array.isArray(u.rules) ? u.rules.filter((l) => 'field' in l) : 'field' in u ? [u] : []
        if ('field' in i && 'field' in s)
            return {
                id: this.generateId(),
                logic: t,
                rules: [i, s],
            }
        if ('rules' in i && 'field' in s && i.logic === t)
            return {
                ...i,
                rules: [...i.rules, s].filter((u) => 'field' in u),
            }
        if ('rules' in s && 'field' in i && s.logic === t)
            return {
                ...s,
                rules: [i, ...s.rules].filter((u) => 'field' in u),
            }
        if ('rules' in i && 'rules' in s && i.logic === t && s.logic === t) {
            const u = [...i.rules, ...s.rules].filter((l) => 'field' in l)
            return {
                id: this.generateId(),
                logic: t,
                rules: u,
            }
        }
        const o = [...r(i), ...r(s)]
        return {
            id: this.generateId(),
            logic: t,
            rules: o,
        }
    }
}
class kr extends ri {
    _functionExtractor = new Mi()
    _conditionVisitor = new Ui()
    canParse(t) {
        return typeof t == 'function'
    }
    parse(t) {
        if (!this.canParse(t)) throw new Error('Input is not a function')
        const i = t,
            s = this._functionExtractor.extract(i)
        if (!s) throw new Error('Could not extract expression from function')
        const r = this._conditionVisitor.visit(s)
        return this._convertToGroups(r)
    }
    generateId() {
        return te('condition')
    }
    _convertToGroups(t) {
        if ('rules' in t && Array.isArray(t.rules)) {
            const i = t
            return ((i.rules = i.rules.filter((s) => 'field' in s && !!s.field && typeof s.field == 'string')), [i])
        } else if ('field' in t)
            return [
                {
                    id: this.generateId(),
                    logic: 'AND',
                    rules: [t],
                },
            ]
        return this.getEmptyResult()
    }
}
class Er extends ri {
    _conditionVisitor = new Ui()
    canParse(t) {
        return typeof t == 'string'
    }
    parse(t) {
        if (!this.canParse(t)) throw new Error('Input is not a string')
        const i = String(t).trim()
        try {
            const s = rt(i, {
                sourceType: 'script',
                ecmaVersion: 'latest',
                allowReturnOutsideFunction: !0,
            })
            if (s.body.length > 0) {
                const r = Ue(s.body[0]) ? s.body[0].expression : null
                if (r) {
                    const o = this._conditionVisitor.visit(r)
                    return this._convertToGroups(o)
                }
            }
        } catch (s) {
            console.error('Failed to parse string input:', s)
        }
        return this.getEmptyResult()
    }
    generateId() {
        return te('rule')
    }
    _convertToGroups(t) {
        return 'rules' in t && Array.isArray(t.rules)
            ? [t]
            : 'field' in t
              ? [
                    {
                        id: this.generateId(),
                        logic: 'AND',
                        rules: [t],
                    },
                ]
              : this.getEmptyResult()
    }
}
class Ir {
    constructor(t, i) {
        ;((this._fieldExtractor = t), (this._literalExtractor = i))
    }
    parse(t) {
        let i = t.left,
            s = t.right,
            r = t.operator
        this._isReversedPattern(t) && ((i = t.right), (s = t.left), (r = this._reverseOperator(r)))
        const o = this._fieldExtractor.extract(i)
        if (!o) throw new Error(`Could not extract field from: ${i?.type || 'unknown'}`)
        const u = this._literalExtractor.extract(s)
        if (u === void 0 && s?.type !== 'Identifier')
            throw new Error(`Could not extract value from: ${s?.type || 'unknown'}`)
        const l = this._literalExtractor.getValueType(u),
            c = Ps[r]
        if (!c || c === 'exists' || c === 'not_exists') throw new Error('Unsupported binary operator: ' + r)
        return {
            id: te('rule'),
            field: o,
            operator: c,
            value: u,
            valueType: l,
        }
    }
    _isReversedPattern(t) {
        return (
            (t.right.type === 'MemberExpression' || t.right.type === 'ChainExpression') &&
            (t.left.type === 'Literal' || t.left.type === 'Identifier')
        )
    }
    _reverseOperator(t) {
        return (
            {
                '>': '<',
                '<': '>',
                '>=': '<=',
                '<=': '>=',
                '===': '===',
                '!==': '!==',
                '==': '==',
                '!=': '!=',
            }[t] || t
        )
    }
}
class Ar {
    generate(t, i = { wrapInFunction: !0 }) {
        if (t.length === 0 || t.every((o) => o.rules.length === 0)) return '() => true'
        const r = t.map((o) => this._generateGroupCode(o)).join(' && ')
        return i.wrapInFunction ? `(context) => ${r}` : r
    }
    _generateGroupCode(t) {
        return t.rules.length === 0
            ? 'true'
            : `(${t.rules.map((s) => this._generateRuleCode(s)).join(` ${Ts[t.logic]} `)})`
    }
    _generateRuleCode(t) {
        const i = `${js}${t.field}`,
            s = t.valueType === 'string' ? `'${t.value}'` : t.value
        switch (t.operator) {
            case 'equals':
                return `${i} === ${s}`
            case 'not_equals':
                return `${i} !== ${s}`
            case 'contains':
                return `${i}?.includes(${s})`
            case 'not_contains':
                return `!${i}?.includes(${s})`
            case 'greater_than':
                return `${i} > ${s}`
            case 'less_than':
                return `${i} < ${s}`
            case 'exists':
                return `${i} !== undefined && ${i} !== null`
            case 'not_exists':
                return `${i} === undefined || ${i} === null`
            default:
                return 'true'
        }
    }
}
class jr {
    _cache = /* @__PURE__ */ new Map()
    get(t) {
        return this._cache.get(t)
    }
    set(t, i) {
        this._cache.set(t, i)
    }
    has(t) {
        return this._cache.has(t)
    }
    clear() {
        this._cache.clear()
    }
    createKey(t) {
        return JSON.stringify({
            type: t.type,
            operator: t.operator,
            name: t.name,
            value: t.value,
        })
    }
}
const Tr = new jr()
class Mt {
    _validator = new Is()
    _strategies = [new kr(), new Er()]
    _codeGenerator = new Ar()
    _extractor = new Mi()
    parseConditions(t) {
        if ((typeof t == 'string' && (t = this._validator.sanitize(t)), !this._validator.validate(t)))
            return (console.warn('Invalid input'), { conditions: this._getEmptyResult() })
        const i = typeof t == 'number' ? String(t) : t
        try {
            const s = this._strategies.find((l) => l.canParse(i))
            if (!s) throw new Error('No suitable parser strategy found')
            const r = s.parse(i)
            let o, u
            if (typeof t == 'function')
                try {
                    const l = this._extractor.extract(t),
                        c = (d) => {
                            if (d) {
                                if (d.type === 'Literal') return d.value === null ? 'null' : String(d.value)
                                if (d.type === 'Identifier') return d.name === 'null' ? 'null' : d.name
                            }
                        }
                    if (
                        (l &&
                            (l.type === 'ConditionalExpression'
                                ? ((o = c(l.consequent)), (u = c(l.alternate)))
                                : (l.type === 'Literal' || l.type === 'Identifier') && (o = c(l))),
                        (o === void 0 && u === void 0) || l === null)
                    )
                        try {
                            const d = t.toString(),
                                p = (v) => {
                                    if (!v) return
                                    const x = v.trim()
                                    if (x === 'null') return 'null'
                                    const y = x.match(/^['"`](.+?)['"`]$/)
                                    if (y) return y[1]
                                    const m = x.match(/^([a-zA-Z0-9_$-]+)/)
                                    if (m) return m[1]
                                },
                                f = d.match(/if\s*\([^)]*\)\s*{[\s\S]*?return\s+([^;]+);?[\s\S]*?}/m)
                            if (f) {
                                const v = f[1],
                                    x = p(v)
                                x !== void 0 && (o = x)
                                const y = d.indexOf(f[0]) + f[0].length,
                                    S = d.slice(y).match(/return\s+([^;]+);?/)
                                if (S) {
                                    const k = p(S[1])
                                    k !== void 0 && (u = k)
                                }
                            }
                        } catch {}
                } catch {}
            return { conditions: r, thenTarget: o, elseTarget: u }
        } catch (s) {
            return (console.error('Error in parseConditions:', s), { conditions: this._getEmptyResult() })
        }
    }
    generateCode(t, i) {
        return this._codeGenerator.generate(t, i)
    }
    clearCache() {
        Tr.clear()
    }
    _getEmptyResult() {
        return [
            {
                id: 'empty-condition',
                logic: 'AND',
                rules: [],
            },
        ]
    }
}
const Pr = new Mt()
function Rr({ condition: e, onConditionChange: t, readonly: i = !1 }) {
    const [s, r] = ae(!0),
        [o, u] = ae(
            e && e.length > 0
                ? e
                : [
                      {
                          id: te('group'),
                          logic: 'AND',
                          rules: [],
                      },
                  ]
        ),
        l = Xe(() => Pr.generateCode(o), [o]),
        c = P(
            (y) => {
                i ||
                    u((m) =>
                        m.map((S) =>
                            S.id === y
                                ? {
                                      ...S,
                                      rules: [
                                          ...S.rules,
                                          {
                                              id: te('rule'),
                                              field: '',
                                              operator: 'equals',
                                              value: '',
                                              valueType: 'string',
                                          },
                                      ],
                                  }
                                : S
                        )
                    )
            },
            [i]
        ),
        d = P(
            (y, m) => {
                i ||
                    u((S) =>
                        S.map((k) =>
                            k.id === y
                                ? {
                                      ...k,
                                      rules: k.rules.filter((R) => R.id !== m),
                                  }
                                : k
                        )
                    )
            },
            [i]
        ),
        p = P(
            (y, m, S) => {
                i ||
                    u((k) =>
                        k.map((R) =>
                            R.id === y
                                ? {
                                      ...R,
                                      rules: R.rules.map((Y) => (Y.id === m ? { ...Y, ...S } : Y)),
                                  }
                                : R
                        )
                    )
            },
            [i]
        ),
        f = P(() => {
            i ||
                u((y) => [
                    ...y,
                    {
                        id: te('group'),
                        logic: 'AND',
                        rules: [],
                    },
                ])
        }, [i]),
        v = P(
            (y) => {
                i || o.length <= 1 || u((m) => m.filter((S) => S.id !== y))
            },
            [i, o.length]
        ),
        x = P(() => {
            i ||
                (t(void 0),
                u([
                    {
                        id: te('group'),
                        logic: 'AND',
                        rules: [],
                    },
                ]))
        }, [i, t])
    return /* @__PURE__ */ a.jsxs('div', {
        className: 'condition-builder vis:border vis:border-gray-200 vis:rounded-lg vis:p-4 vis:space-y-4',
        children: [
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:items-center vis:justify-between',
                children: [
                    /* @__PURE__ */ a.jsx('h4', {
                        className: 'vis:font-medium vis:text-gray-900',
                        children: 'Condition',
                    }),
                    /* @__PURE__ */ a.jsxs('div', {
                        className: 'vis:flex vis:items-center vis:gap-2',
                        children: [
                            /* @__PURE__ */ a.jsx('button', {
                                onClick: () => r(!s),
                                className: 'vis:p-1 vis:text-gray-500 hover:vis:text-gray-700 vis:transition-colors',
                                title: s ? 'Switch to Code Mode' : 'Switch to Visual Mode',
                                children: s
                                    ? /* @__PURE__ */ a.jsx(Ct, { className: 'vis:size-4' })
                                    : /* @__PURE__ */ a.jsx(hs, { className: 'vis:w-4 vis:h-4' }),
                            }),
                            !i &&
                                /* @__PURE__ */ a.jsx('button', {
                                    onClick: x,
                                    className: 'vis:p-1 vis:text-red-500 hover:vis:text-red-700 vis:transition-colors',
                                    title: 'Clear Condition',
                                    children: /* @__PURE__ */ a.jsx(Ie, { className: 'vis:w-4 vis:h-4' }),
                                }),
                        ],
                    }),
                ],
            }),
            s
                ? /* @__PURE__ */ a.jsxs('div', {
                      className: 'space-y-3',
                      children: [
                          o.map((y, m) =>
                              /* @__PURE__ */ a.jsxs(
                                  'div',
                                  {
                                      className: 'vis:border vis:border-gray-100 vis:rounded-md vis:p-3 vis:bg-gray-50',
                                      children: [
                                          /* @__PURE__ */ a.jsxs('div', {
                                              className: 'vis:flex vis:items-center vis:justify-between vis:mb-3',
                                              children: [
                                                  /* @__PURE__ */ a.jsxs('div', {
                                                      className: 'vis:flex vis:items-center vis:gap-2',
                                                      children: [
                                                          /* @__PURE__ */ a.jsxs('span', {
                                                              className:
                                                                  'vis:text-sm vis:font-medium vis:text-gray-700',
                                                              children: ['Group ', m + 1],
                                                          }),
                                                          !i &&
                                                              /* @__PURE__ */ a.jsxs('select', {
                                                                  value: y.logic,
                                                                  onChange: (S) => {
                                                                      u((k) =>
                                                                          k.map((R) =>
                                                                              R.id === y.id
                                                                                  ? { ...R, logic: S.target.value }
                                                                                  : R
                                                                          )
                                                                      )
                                                                  },
                                                                  className:
                                                                      'vis:text-xs vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded',
                                                                  children: [
                                                                      /* @__PURE__ */ a.jsx('option', {
                                                                          value: 'AND',
                                                                          children: 'AND',
                                                                      }),
                                                                      /* @__PURE__ */ a.jsx('option', {
                                                                          value: 'OR',
                                                                          children: 'OR',
                                                                      }),
                                                                  ],
                                                              }),
                                                      ],
                                                  }),
                                                  !i &&
                                                      o.length > 1 &&
                                                      /* @__PURE__ */ a.jsx('button', {
                                                          onClick: () => v(y.id),
                                                          className:
                                                              'vis:p-1 vis:text-red-500 hover:vis:text-red-700 vis:transition-colors',
                                                          children: /* @__PURE__ */ a.jsx(Ie, {
                                                              className: 'vis:w-3 vis:h-3',
                                                          }),
                                                      }),
                                              ],
                                          }),
                                          /* @__PURE__ */ a.jsxs('div', {
                                              className: 'vis:space-y-2',
                                              children: [
                                                  y.rules.map((S, k) =>
                                                      /* @__PURE__ */ a.jsxs(
                                                          'div',
                                                          {
                                                              className: 'vis:flex vis:flex-col vis:gap-2 vis:text-sm',
                                                              children: [
                                                                  k > 0 &&
                                                                      /* @__PURE__ */ a.jsx('span', {
                                                                          className: 'vis:text-gray-500 vis:text-xs',
                                                                          children: y.logic,
                                                                      }),
                                                                  /* @__PURE__ */ a.jsx('input', {
                                                                      type: 'text',
                                                                      placeholder: 'field',
                                                                      value: S.field,
                                                                      onChange: (R) =>
                                                                          p(y.id, S.id, { field: R.target.value }),
                                                                      disabled: i,
                                                                      className:
                                                                          'vis:flex-1 vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-xs vis:disabled:bg-gray-100',
                                                                  }),
                                                                  /* @__PURE__ */ a.jsxs('select', {
                                                                      value: S.operator,
                                                                      onChange: (R) =>
                                                                          p(y.id, S.id, { operator: R.target.value }),
                                                                      disabled: i,
                                                                      className:
                                                                          'vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-xs vis:disabled:bg-gray-100',
                                                                      children: [
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'equals',
                                                                              children: 'equals',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'not_equals',
                                                                              children: 'not equals',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'contains',
                                                                              children: 'contains',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'not_contains',
                                                                              children: 'not contains',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'greater_than',
                                                                              children: 'greater than',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'less_than',
                                                                              children: 'less than',
                                                                          }),
                                                                      ],
                                                                  }),
                                                                  /* @__PURE__ */ a.jsx('input', {
                                                                      type: 'text',
                                                                      placeholder: 'value',
                                                                      value: String(S.value),
                                                                      onChange: (R) =>
                                                                          p(y.id, S.id, { value: R.target.value }),
                                                                      disabled: i,
                                                                      className:
                                                                          'vis:flex-1 vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-xs vis:disabled:bg-gray-100',
                                                                  }),
                                                                  /* @__PURE__ */ a.jsxs('select', {
                                                                      value: S.valueType,
                                                                      onChange: (R) =>
                                                                          p(y.id, S.id, {
                                                                              valueType: R.target.value,
                                                                          }),
                                                                      disabled: i,
                                                                      className:
                                                                          'vis:px-2 vis:py-1 vis:border vis:border-gray-300 vis:rounded vis:text-xs vis:disabled:bg-gray-100',
                                                                      children: [
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'string',
                                                                              children: 'string',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'number',
                                                                              children: 'number',
                                                                          }),
                                                                          /* @__PURE__ */ a.jsx('option', {
                                                                              value: 'boolean',
                                                                              children: 'boolean',
                                                                          }),
                                                                      ],
                                                                  }),
                                                                  !i &&
                                                                      /* @__PURE__ */ a.jsx('button', {
                                                                          onClick: () => d(y.id, S.id),
                                                                          className:
                                                                              'vis:p-1 vis:text-red-500 hover:vis:text-red-700 vis:transition-colors',
                                                                          children: /* @__PURE__ */ a.jsx(Ie, {
                                                                              className: 'vis:w-3 vis:h-3',
                                                                          }),
                                                                      }),
                                                              ],
                                                          },
                                                          S.id
                                                      )
                                                  ),
                                                  !i &&
                                                      /* @__PURE__ */ a.jsxs('button', {
                                                          onClick: () => c(y.id),
                                                          className:
                                                              'vis:flex vis:items-center vis:gap-1 vis:text-xs vis:text-blue-600 hover:vis:text-blue-800 vis:transition-colors',
                                                          children: [
                                                              /* @__PURE__ */ a.jsx(Ge, {
                                                                  className: 'vis:w-3 vis:h-3',
                                                              }),
                                                              'Add Rule',
                                                          ],
                                                      }),
                                              ],
                                          }),
                                      ],
                                  },
                                  y.id
                              )
                          ),
                          !i &&
                              /* @__PURE__ */ a.jsxs('button', {
                                  onClick: f,
                                  className:
                                      'vis:flex vis:items-center vis:gap-1 vis:text-sm vis:text-blue-600 hover:vis:text-blue-800 vis:transition-colors',
                                  children: [/* @__PURE__ */ a.jsx(Ge, { className: 'vis:w-4 vis:h-4' }), 'Add Group'],
                              }),
                          !i &&
                              /* @__PURE__ */ a.jsx('button', {
                                  onClick: () => t(o),
                                  className:
                                      'vis:w-full vis:px-3 vis:py-2 vis:bg-blue-500 vis:text-white vis:rounded-md hover:vis:bg-blue-600 vis:transition-colors vis:text-sm',
                                  children: 'Apply Condition',
                              }),
                      ],
                  })
                : /* Code Mode */
                  /* @__PURE__ */ a.jsx('div', {
                      className: 'vis:space-y-3',
                      children: /* @__PURE__ */ a.jsx('textarea', {
                          readOnly: !0,
                          value: l,
                          disabled: i,
                          placeholder: "(context) => context.flowData?.userRole === 'admin'",
                          rows: 6,
                          className:
                              'vis:w-full vis:px-3 vis:py-2 vis:border vis:border-gray-300 vis:rounded-md vis:text-sm vis:font-mono vis:disabled:bg-gray-100',
                      }),
                  }),
            e &&
                /* @__PURE__ */ a.jsxs(a.Fragment, {
                    children: [
                        /* @__PURE__ */ a.jsx('label', {
                            className: 'vis:block vis:text-md vis:font-semibold vis:mb-1',
                            children: 'Current Condition:',
                        }),
                        /* @__PURE__ */ a.jsx('div', {
                            className: 'vis:mt-3 vis:p-3 vis:bg-blue-50 vis:border vis:border-blue-200 vis:rounded-md',
                            children: /* @__PURE__ */ a.jsx('pre', {
                                className:
                                    'vis:text-xs vis:text-blue-800 vis:whitespace-pre-wrap vis:font-mono vis:overflow-x-auto',
                                children: /* @__PURE__ */ a.jsx('code', { children: l }),
                            }),
                        }),
                    ],
                }),
        ],
    })
}
function Or({ conditionNode: e, onUpdate: t, onClose: i, readonly: s = !1 }) {
    const r = P(
        (o) => {
            if (!e || s) return
            const u = {
                ...e,
                data: {
                    ...e.data,
                    ...o,
                },
            }
            t(u)
        },
        [e, t, s]
    )
    return e
        ? /* @__PURE__ */ a.jsxs('div', {
              className:
                  'condition-details-panel vis:bg-white vis:border-l vis:border-gray-200 vis:vis:w-108 vis:h-full vis:overflow-y-auto vis:flex vis:flex-col',
              children: [
                  /* @__PURE__ */ a.jsxs('div', {
                      className:
                          'vis:flex vis:items-center vis:justify-between vis:p-4 vis:border-b vis:border-gray-200',
                      children: [
                          /* @__PURE__ */ a.jsxs('div', {
                              className: 'vis:flex vis:items-center vis:gap-2',
                              children: [
                                  /* @__PURE__ */ a.jsx(At, { className: 'vis:w-5 vis:h-5 vis:text-indigo-600' }),
                                  /* @__PURE__ */ a.jsx('h2', {
                                      className: 'vis:font-semibold vis:text-gray-900',
                                      children: 'Condition Details',
                                  }),
                              ],
                          }),
                          /* @__PURE__ */ a.jsx('button', {
                              onClick: i,
                              className: 'vis:p-1 hover:vis:bg-gray-100 vis:rounded-md vis:transition-colors',
                              children: /* @__PURE__ */ a.jsx(It, { className: 'vis:w-5 vis:h-5' }),
                          }),
                      ],
                  }),
                  /* @__PURE__ */ a.jsxs('div', {
                      className: 'vis:flex-1 vis:p-4 vis:space-y-6',
                      children: [
                          /* @__PURE__ */ a.jsx(Rr, {
                              condition: e.data.condition,
                              onConditionChange: (o) => r({ condition: o }),
                              readonly: s,
                          }),
                          /* @__PURE__ */ a.jsxs('div', {
                              className: 'vis:bg-gray-50 vis:p-4 vis:rounded-lg',
                              children: [
                                  /* @__PURE__ */ a.jsx('h3', {
                                      className: 'vis:font-medium vis:text-gray-900 vis:mb-3',
                                      children: 'Branch Information',
                                  }),
                                  /* @__PURE__ */ a.jsxs('div', {
                                      className: 'vis:space-y-3',
                                      children: [
                                          /* @__PURE__ */ a.jsxs('div', {
                                              className: 'vis:flex vis:items-center vis:gap-3',
                                              children: [
                                                  /* @__PURE__ */ a.jsx('div', {
                                                      className: 'vis:w-4 vis:h-4 vis:bg-green-500 vis:rounded',
                                                  }),
                                                  /* @__PURE__ */ a.jsxs('span', {
                                                      className: 'vis:text-sm vis:text-gray-700',
                                                      children: [
                                                          /* @__PURE__ */ a.jsx('strong', { children: 'Then branch:' }),
                                                          ' Path when condition is true',
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          /* @__PURE__ */ a.jsxs('div', {
                                              className: 'vis:flex vis:items-center vis:gap-3',
                                              children: [
                                                  /* @__PURE__ */ a.jsx('div', {
                                                      className: 'vis:w-4 vis:h-4 vis:bg-red-500 vis:rounded',
                                                  }),
                                                  /* @__PURE__ */ a.jsxs('span', {
                                                      className: 'vis:text-sm vis:text-gray-700',
                                                      children: [
                                                          /* @__PURE__ */ a.jsx('strong', { children: 'Else branch:' }),
                                                          ' Path when condition is false',
                                                      ],
                                                  }),
                                              ],
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                      ],
                  }),
              ],
          })
        : null
}
const Vr = new Mt()
function mt(e, t, i, s, r) {
    if (e !== void 0)
        if (typeof e == 'function')
            try {
                const o = te('condition'),
                    u = Vr.parseConditions(e),
                    l = u.conditions,
                    c = {
                        id: o,
                        type: 'conditionNode',
                        data: {
                            conditionId: o,
                            description: 'Condition',
                            condition: l,
                        },
                        position: { x: 0, y: 0 },
                    }
                ;(s.push(c),
                    r.push({
                        id: `${t}-${i}-${o}`,
                        source: t,
                        target: o,
                        sourceHandle: i,
                        type: 'conditional',
                        data: {
                            edgeType: i === 'previous' ? 'conditional' : i,
                            label: i.charAt(0).toUpperCase() + i.slice(1),
                        },
                    }))
                const { thenTarget: d, elseTarget: p } = u
                if (d !== void 0) {
                    const f = d === null ? 'null' : String(d)
                    r.push({
                        id: `${o}-then-${f}`,
                        source: o,
                        target: f,
                        sourceHandle: 'then',
                        type: 'conditional',
                        data: {
                            edgeType: 'then',
                            label: 'Then',
                        },
                    })
                }
                if (p !== void 0) {
                    const f = p === null ? 'null' : String(p)
                    r.push({
                        id: `${o}-else-${f}`,
                        source: o,
                        target: f,
                        sourceHandle: 'else',
                        type: 'conditional',
                        data: {
                            edgeType: 'else',
                            label: 'Else',
                        },
                    })
                }
            } catch {
                const o = 'null'
                r.push({
                    id: `${t}-${i}-${o}`,
                    source: t,
                    target: o,
                    sourceHandle: i,
                    type: 'conditional',
                    data: {
                        edgeType: i,
                        label: i.charAt(0).toUpperCase() + i.slice(1),
                    },
                })
            }
        else {
            const o = e === null ? 'null' : String(e)
            r.push({
                id: `${t}-${i}-${o}`,
                source: t,
                target: o,
                sourceHandle: i,
                type: 'conditional',
                data: {
                    edgeType: i,
                    label: i.charAt(0).toUpperCase() + i.slice(1),
                },
            })
        }
}
function Ye(e, t = []) {
    const i = [],
        s = []
    ;(e.forEach((o, u) => {
        const l = {
            id: String(o.id),
            type: 'stepNode',
            data: {
                stepId: o.id,
                stepType: o.type ?? 'INFORMATION',
                label: Ft(o),
                description: Dt(o),
                isSkippable: !!o.isSkippable,
                hasCondition: typeof o.condition == 'function',
                payload: o.payload,
                condition: o.condition,
                metadata: o.meta || {},
                nextStep: o.nextStep,
                previousStep: o.previousStep,
                skipToStep: o.skipToStep,
            },
            position: { x: 0, y: u * 150 },
        }
        i.push(l)
    }),
        i.push(...t))
    const r = {
        id: 'null',
        type: 'endNode',
        data: {
            label: 'End',
            description: 'Flow completed',
        },
        position: { x: 0, y: e.length * 150 },
    }
    return (
        i.push(r),
        e.forEach((o) => {
            const u = String(o.id)
            ;(o.isSkippable && mt(o.skipToStep, u, 'skip', i, s),
                mt(o.nextStep, u, 'next', i, s),
                mt(o.previousStep, u, 'previous', i, s))
        }),
        { nodes: i, edges: s }
    )
}
const Lr = new Mt()
function Fr(e, t, i) {
    return `(context) => {
        const condition = ${e.data.condition ? Lr.generateCode(e.data.condition, { wrapInFunction: !1 }) : '() => true'}
        return condition ? ${JSON.stringify(t)} : ${JSON.stringify(i)}
    }`
}
function gt(e, t, i) {
    if (e === 'null') return null
    const s = t.find((r) => r.id === e)
    if (!s) return null
    if (s.type === 'stepNode') return String(s.data.stepId)
    if (s.type === 'conditionNode') {
        const r = s,
            o = i.find((d) => d.source === r.id && d.data?.edgeType === 'then'),
            u = i.find((d) => d.source === r.id && d.data?.edgeType === 'else'),
            l = o?.target ?? null,
            c = u?.target ?? null
        return Fr(r, l, c)
    }
    return null
}
function at(e) {
    const { nodes: t, edges: i } = e,
        s = [],
        r = t.filter((o) => o.type === 'stepNode')
    for (const o of r) {
        const { data: u, id: l } = o,
            c = {
                id: u.stepId,
                type: u.stepType,
                payload: u.payload || Bt(u.stepType),
            }
        typeof u.condition == 'function' && (c.condition = u.condition)
        const d = i.filter((x) => x.source === l),
            p = d.find((x) => x.data?.edgeType === 'next' || x.data?.edgeType === 'conditional'),
            f = d.find((x) => x.data?.edgeType === 'skip'),
            v = d.find((x) => x.data?.edgeType === 'previous')
        ;((c.nextStep = p ? gt(p.target, t, i) : void 0),
            (c.skipToStep = f ? gt(f.target, t, i) : void 0),
            (c.previousStep = v ? gt(v.target, t, i) : void 0),
            u.isSkippable && (c.isSkippable = !0),
            s.push(c))
    }
    return s
}
function Dr(e, t = 2) {
    let i = JSON.stringify(e, null, t)
    return (
        (i = i.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)"\s*:/g, '$1:')),
        (i = i.replace(
            /(nextStep|previousStep|skipToStep):\s*"((?:\\.|[^"\\])*?\(context\)(?:\\.|[^"\\])*)"/g,
            (s, r, o) => {
                let u = o
                    .replace(
                        /\\n/g,
                        `
`
                    )
                    .replace(/\\"/g, '"')
                    .replace(/\\\\/g, '\\')
                return ((u = u.replace(/"\s*null\s*"/g, 'null')), `${r}: ${u}`)
            }
        )),
        i
    )
}
function Br(e, t = {}) {
    const {
            format: i = 'typescript',
            includeTypes: s = !0,
            includeComments: r = !0,
            variableName: o = 'flowSteps',
        } = t,
        u = at(e),
        l = i === 'typescript'
    let c = ''
    ;(r &&
        ((c += `// Generated onboarding flow
`),
        (c += `// Generated on ${/* @__PURE__ */ new Date().toISOString()}

`)),
        l &&
            s &&
            (c += `import type { OnboardingStep } from '@onboardjs/core'

`))
    const d = l && s ? ': OnboardingStep[]' : '',
        p = Dr(u, 2)
    return (
        (c += `export const ${o}${d} = ${p}
`),
        c
    )
}
function Xr(e, t = {}) {
    const { prettyPrint: i = !0, stepFormat: s = !0 } = t
    if (s) {
        const r = at(e)
        return i ? JSON.stringify(r, null, 2) : JSON.stringify(r)
    }
    return i ? JSON.stringify(e, null, 2) : JSON.stringify(e)
}
function Zr(e, t) {
    const i = /* @__PURE__ */ new Date().toISOString().split('T')[0],
        s = {
            json: {
                filename: `onboarding-flow-${i}.json`,
                mimeType: 'application/json',
            },
            typescript: {
                filename: `onboarding-flow-${i}.ts`,
                mimeType: 'text/typescript',
            },
            javascript: {
                filename: `onboarding-flow-${i}.js`,
                mimeType: 'text/javascript',
            },
        },
        { filename: r, mimeType: o } = s[t]
    return {
        content: e,
        filename: r,
        mimeType: o,
    }
}
const Mr = (e) => {
        switch (e) {
            case 'INFORMATION':
                return '#3b82f6'
            case 'SINGLE_CHOICE':
                return '#10b981'
            case 'MULTIPLE_CHOICE':
                return '#8b5cf6'
            case 'CHECKLIST':
                return '#f59e0b'
            case 'CONFIRMATION':
                return '#ef4444'
            case 'CUSTOM_COMPONENT':
                return '#6b7280'
            case 'endNode':
                return '#f59e0b'
            default:
                return '#3b82f6'
        }
    },
    qi = Et(({ selected: e }) =>
        /* @__PURE__ */ a.jsxs('div', {
            className: `
        end-node vis:px-4 vis:py-3 vis:shadow-lg vis:rounded-lg vis:border-2 vis:min-w-[200px] vis:max-w-[300px]
        vis:border-amber-500 vis:bg-amber-50
        ${e ? 'vis:ring-2 vis:ring-amber-800 vis:ring-opacity-50' : ''}
      `,
            children: [
                /* @__PURE__ */ a.jsx(ye, { type: 'target', position: Se.Top }),
                /* @__PURE__ */ a.jsx('div', {
                    className: 'vis:text-center',
                    children: /* @__PURE__ */ a.jsx('p', {
                        className: 'vis:font-semibold vis:text-sm vis:text-amber-700',
                        children: ' End of Flow',
                    }),
                }),
            ],
        })
    )
qi.displayName = 'EndNode'
const Gi = Et(({ data: e, selected: t }) => {
    const { errors: i = [] } = e
    return /* @__PURE__ */ a.jsxs('div', {
        className: `
        condition-node vis:px-4 vis:py-3 vis:shadow-lg vis:rounded-lg vis:border-2 vis:min-w-[250px] vis:max-w-[350px]
        ${i.length > 0 ? 'vis:border-red-500 vis:bg-red-50' : 'vis:border-indigo-500 vis:bg-indigo-50'}
        ${t ? 'vis:ring-2 vis:ring-indigo-500 vis:ring-opacity-50' : ''}
      `,
        children: [
            /* @__PURE__ */ a.jsx(ye, {
                type: 'target',
                position: Se.Top,
                className: 'vis:size-3 vis:border-2 vis:bg-white',
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:space-x-2 vis:flex vis:items-center',
                children: [
                    /* @__PURE__ */ a.jsx(At, { className: 'vis:size-4 vis:text-indigo-600 vis:inline-block' }),
                    /* @__PURE__ */ a.jsx('span', {
                        className: 'vis:font-semibold vis:text-sm vis:text-indigo-700',
                        children: 'Condition',
                    }),
                ],
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'vis:flex vis:justify-between vis:items-center',
                children: [
                    /* @__PURE__ */ a.jsx(ye, {
                        type: 'source',
                        position: Se.Bottom,
                        id: 'then',
                        className: 'vis:w-3 vis:h-3 vis:border-2 vis:bg-green-500',
                        style: { left: '25%' },
                    }),
                    /* @__PURE__ */ a.jsx(ye, {
                        type: 'source',
                        position: Se.Bottom,
                        id: 'else',
                        className: 'vis:w-3 vis:h-3 vis:border-2 vis:bg-red-500',
                        style: { left: '75%' },
                    }),
                ],
            }),
            i.length > 0 &&
                /* @__PURE__ */ a.jsxs('div', {
                    className: 'vis:mt-3 vis:p-2 vis:bg-red-100 vis:rounded vis:text-xs vis:text-red-700',
                    children: [
                        /* @__PURE__ */ a.jsx('div', { className: 'vis:font-medium', children: 'Errors:' }),
                        /* @__PURE__ */ a.jsx('ul', {
                            className: 'vis:list-disc vis:list-inside',
                            children: i
                                .slice(0, 2)
                                .map((s, r) =>
                                    /* @__PURE__ */ a.jsx('li', { className: 'vis:truncate', children: s }, r)
                                ),
                        }),
                        i.length > 2 &&
                            /* @__PURE__ */ a.jsxs('div', {
                                className: 'vis:text-center',
                                children: ['+ ', i.length - 2, ' more'],
                            }),
                    ],
                }),
        ],
    })
})
Gi.displayName = 'ConditionNode'
function bt(e, t, i = 'TB') {
    const s = new Ze.graphlib.Graph()
    return (
        s.setDefaultEdgeLabel(() => ({})),
        s.setGraph({ rankdir: i }),
        e.forEach((o) => {
            s.setNode(o.id, { width: 250, height: 120 })
        }),
        t.forEach((o) => {
            s.setEdge(o.source, o.target)
        }),
        Ze.layout(s),
        {
            nodes: e.map((o) => {
                const u = s.node(o.id)
                return {
                    ...o,
                    position: {
                        x: u.x - 125,
                        // Adjust for node width
                        y: u.y - 60,
                        // Adjust for node height
                    },
                }
            }),
            edges: t,
        }
    )
}
function Ur(e, t) {
    const [i, s] = ae(() => {
            const V = Ye(e)
            try {
                const B = bt(V.nodes, V.edges, 'TB')
                return { nodes: B.nodes, edges: B.edges }
            } catch {
                return V
            }
        }),
        r = Xe(() => at(i), [i]),
        o = Xe(() => new Map(r.map((V) => [V.id, V])), [r]),
        u = yt(!0),
        l = yt(e),
        { nodes: c, edges: d } = i,
        [p, f, v] = Wi(c),
        [x, y, m] = Ki(d),
        { getNodes: S, getEdges: k } = ii(),
        R = P(
            (V) => {
                ;(v(V),
                    setTimeout(() => {
                        const B = S(),
                            O = k()
                        s({ nodes: B, edges: O })
                    }, 0))
            },
            [v, S, k]
        ),
        Y = P(
            (V) => {
                ;(m(V),
                    setTimeout(() => {
                        const B = S(),
                            O = k()
                        s({ nodes: B, edges: O })
                    }, 0))
            },
            [m, S, k]
        )
    Qe(() => {
        t?.(r)
    }, [r, t])
    const H = P(
        (V) => {
            ;(f(V.nodes), y(V.edges), s(V))
        },
        [f, y]
    )
    Qe(() => {
        if (u.current) {
            ;((u.current = !1), (l.current = e))
            return
        }
        if (
            e.length !== l.current.length ||
            e.some((B, O) => {
                const W = l.current[O]
                return !W || JSON.stringify(B) !== JSON.stringify(W)
            })
        ) {
            const B = Ye(e)
            try {
                const O = bt(B.nodes, B.edges, 'TB')
                H({ nodes: O.nodes, edges: O.edges })
            } catch {
                H(B)
            }
            l.current = e
        }
    }, [e, H])
    const ve = P(
            (V, B) => {
                const O = V ?? i.nodes,
                    W = B ?? i.edges,
                    Q = {
                        nodes: O.map((xe) => {
                            if (xe.type !== 'stepNode') return xe
                            const he = xe,
                                ne = W.filter((h) => h.source === he.id),
                                Ne = ne.find(
                                    (h) =>
                                        h.data?.edgeType === 'next' ||
                                        (h.data?.edgeType === 'conditional' && h.sourceHandle !== 'previous') ||
                                        h.data?.edgeType === void 0
                                ),
                                me = ne.find((h) => h.data?.edgeType === 'skip'),
                                ke = ne.find(
                                    (h) =>
                                        h.data?.edgeType === 'previous' ||
                                        (h.data?.edgeType === 'conditional' && h.sourceHandle === 'previous')
                                ),
                                se = { ...he.data },
                                ge = (h) => {
                                    if (!h) return
                                    const _ = h.target,
                                        A = O.find((F) => F.id === String(_))
                                    return A
                                        ? A.type === 'stepNode'
                                            ? (A.data.stepId ?? A.id)
                                            : A.type === 'conditionNode'
                                              ? (A.data.conditionId ?? A.id)
                                              : A.type === 'endNode'
                                                ? null
                                                : _
                                        : String(_) === 'null'
                                          ? null
                                          : _
                                }
                            return (
                                (se.nextStep = ge(Ne)),
                                (se.skipToStep = ge(me)),
                                (se.previousStep = ge(ke)),
                                (se.isSkippable = !!me || !!he.data.isSkippable),
                                {
                                    ...he,
                                    data: se,
                                }
                            )
                        }),
                        edges: W,
                    }
                return (
                    H(Q),
                    {
                        updatedSteps: at(Q),
                        updatedNodes: O,
                        updatedEdges: W,
                    }
                )
            },
            [i, H]
        ),
        ce = P(
            (V) => {
                const B = Ye(V)
                try {
                    const O = bt(B.nodes, B.edges, 'TB')
                    H({ nodes: O.nodes, edges: O.edges })
                } catch {
                    H(B)
                }
            },
            [H]
        )
    return {
        // State
        flowState: i,
        steps: r,
        stepsById: o,
        nodes: p,
        edges: x,
        // Handlers
        onNodesChange: R,
        onEdgesChange: Y,
        updateFlowState: H,
        updateStepsFromFlow: ve,
        updateFlowFromSteps: ce,
        // React Flow state setters
        setNodes: f,
        setEdges: y,
    }
}
function qr(e, t, i, s = !1) {
    const r = P(
            (p) => {
                if (s) return
                let f = 'next',
                    v = 'Next',
                    x = {
                        type: Me.ArrowClosed,
                    },
                    y
                p.sourceHandle === 'skip'
                    ? ((f = 'skip'), (v = 'Skip'))
                    : p.sourceHandle === 'previous'
                      ? ((f = 'previous'), (v = 'Back'), (y = { type: Me.ArrowClosed }), (x = void 0))
                      : p.sourceHandle === 'then'
                        ? ((f = 'then'), (v = 'Then'))
                        : p.sourceHandle === 'else' && ((f = 'else'), (v = 'Else'))
                const m = {
                        id: `edge-${p.source}-${f}-${p.target}`,
                        ...p,
                        markerStart: y,
                        markerEnd: x,
                        type: 'conditional',
                        data: {
                            edgeType: f,
                            label: v,
                        },
                    },
                    S = e.edges.filter((k) => !(k.source === p.source && k.data?.edgeType === f))
                i(void 0, [...S, m])
            },
            [s, e.edges, i]
        ),
        o = P(
            (p) => {
                if (p.source === p.target) return !1
                if (!p.target) return !0
                const f = e.nodes.find((x) => x.id === p.source),
                    v = e.nodes.find((x) => x.id === p.target)
                return !f || !v || f.type === 'endNode'
                    ? !1
                    : (f.type === 'conditionNode' && (p.sourceHandle === 'then' || p.sourceHandle === 'else')) ||
                        p.sourceHandle === 'skip' ||
                        p.sourceHandle === 'previous'
                      ? v.type === 'stepNode' || v.type === 'endNode'
                      : v.type === 'stepNode' || v.type === 'endNode' || v.type === 'conditionNode'
            },
            [e.nodes]
        ),
        u = P(
            (p = 'INFORMATION') => {
                if (s) return
                const f = te('step'),
                    v = {
                        id: f,
                        payload: Bt(p),
                    },
                    x = {
                        id: String(f),
                        type: 'stepNode',
                        data: {
                            stepId: f,
                            stepType: p,
                            label: Ft(v),
                            description: Dt(v),
                            isSkippable: !!v.isSkippable,
                            hasCondition: typeof v.condition == 'function',
                            payload: v.payload,
                            condition: v.condition,
                            metadata: {},
                            nextStep: v.nextStep,
                            previousStep: v.previousStep,
                            skipToStep: v.skipToStep,
                        },
                        position: { x: Math.random() * 300, y: Math.random() * 300 },
                    },
                    y = {
                        nodes: [...e.nodes, x],
                        edges: e.edges,
                    }
                t(y)
            },
            [s, e, t]
        ),
        l = (p) => {
            const f = e.nodes.map((m) => (m.type === 'stepNode' && m.id === p.id ? p : m)),
                x = [
                    ...e.edges.filter((m) => {
                        const S =
                            typeof m.data?.edgeType == 'string' &&
                            ['next', 'skip', 'previous'].includes(m.data.edgeType)
                        return !(m.source === p.id && S)
                    }),
                ],
                y = (m, S) => {
                    if (
                        S === void 0 ||
                        typeof S == 'function' ||
                        !(typeof S == 'string' || typeof S == 'number' || S === null)
                    )
                        return
                    const k = S === null ? 'null' : String(S),
                        R = `edge-${p.id}-${m}-${k}`
                    let Y = { type: Me.ArrowClosed },
                        H
                    m === 'previous' && ((H = { type: Me.ArrowClosed }), (Y = void 0))
                    const ve = {
                            id: R,
                            source: String(p.id),
                            target: k,
                            sourceHandle: m === 'skip' ? 'skip' : m === 'previous' ? 'previous' : void 0,
                            targetHandle: void 0,
                            markerEnd: Y,
                            markerStart: H,
                            type: 'conditional',
                            data: {
                                edgeType: m,
                                label: m === 'next' ? 'Next' : m === 'skip' ? 'Skip' : 'Back',
                            },
                        },
                        ce = x.findIndex((V) => V.id === R)
                    ce !== -1 ? (x[ce] = ve) : x.push(ve)
                }
            ;(y('next', p.data.nextStep), y('skip', p.data.skipToStep), y('previous', p.data.previousStep), i(f, x))
        },
        c = P(
            (p) => {
                if (s) return
                const f = String(p),
                    v = e.nodes.filter((m) => m.id !== f),
                    x = e.edges.filter((m) => m.source !== f && m.target !== f)
                t({
                    nodes: v,
                    edges: x,
                })
            },
            [s, e, t]
        ),
        d = P(
            (p) => {
                if (s) return
                const v = {
                    nodes: e.nodes.map((x) => (x.type === 'conditionNode' && x.id === p.id ? p : x)),
                    edges: e.edges,
                }
                t(v)
            },
            [s, e, t]
        )
    return {
        onConnect: r,
        isValidConnection: o,
        addStep: u,
        updateNode: l,
        deleteStep: c,
        updateConditionNode: d,
    }
}
class Be extends Error {
    constructor(t, i) {
        ;(super(t), (this.error = i), (this.name = 'ParsingError'))
    }
}
function Te(e, t) {
    if (e.type === 'ObjectExpression' && !(!('properties' in e) || !Array.isArray(e.properties)))
        return e.properties.find((i) => i.type === 'Property' && i.key.name === t)
}
class Gr {
    /**
     * Parses a string containing JS/TS code to extract an array of OnboardingSteps.
     * This method is safe and does not execute any of the input code.
     *
     * @param code The string content of the file.
     * @returns An array of OnboardingStep objects.
     * @throws A ParsingError if the steps array is not found or is malformed.
     */
    static parseSteps(t) {
        const i = rt(t, {
            ecmaVersion: 'latest',
            sourceType: 'module',
            locations: !0,
        })
        let s = null
        for (const r of i.body)
            if (r.type === 'ExportNamedDeclaration' && r.declaration?.type === 'VariableDeclaration') {
                const o = r.declaration.declarations.find(
                    (u) => u.id.type === 'Identifier' && u.id.name === 'steps' && u.init?.type === 'ArrayExpression'
                )
                if (o) {
                    s = o.init
                    break
                }
            }
        if (!s) throw new Be("Could not find an exported 'steps' array in the file.")
        return s.elements.map((r) => {
            if (r.type !== 'ObjectExpression') throw new Be('Found a non-object element in the steps array.')
            return this._parseStepObject(r, t)
        })
    }
    /**
     * Parses a single AST ObjectExpression node into an OnboardingStep.
     */
    static _parseStepObject(t, i) {
        const s = {},
            r = Te(t, 'id')
        if (r && r.value.type === 'Literal') s.id = r.value.value
        else throw new Be('Step is missing a valid `id` property.')
        const o = Te(t, 'type')
        ;(o && o.value.type === 'Literal' ? (s.type = o.value.value) : (s.type = 'INFORMATION'), (s.payload = {}))
        const u = Te(t, 'isSkippable')
        u && u.value.type === 'Literal' && (s.isSkippable = u.value.value)
        try {
            ;((s.nextStep = this._parseStepLink(Te(t, 'nextStep'), i)),
                (s.previousStep = this._parseStepLink(Te(t, 'previousStep'), i)),
                (s.skipToStep = this._parseStepLink(Te(t, 'skipToStep'), i)))
        } catch (l) {
            const c = l instanceof Error ? l.message : 'An unknown error occurred'
            throw new Be(`Failed to parse a link property for step "${s.id}": ${c}`, l)
        }
        return s
    }
    /**
     * Parses a property that can be a function, a string literal, or null.
     */
    static _parseStepLink(t, i) {
        if (!t) return
        const s = t.value
        switch (s.type) {
            case 'Literal':
                return s.value
            case 'ArrowFunctionExpression':
            case 'FunctionExpression': {
                const r = i.slice(s.start, s.end)
                try {
                    return new Function('return ' + r)()
                } catch (o) {
                    throw new Be('Could not reconstruct function string.', o)
                }
            }
            default:
                return
        }
    }
}
const Hr = {
        stepNode: si,
        endNode: qi,
        conditionNode: Gi,
    },
    $r = {
        conditional: xs,
    }
function ea({ initialSteps: e = [], onStepsChange: t, onExport: i, onImport: s, readonly: r = !1, className: o = '' }) {
    return /* @__PURE__ */ a.jsx(Ji, {
        children: /* @__PURE__ */ a.jsx(zr, {
            initialSteps: e,
            onStepsChange: t,
            onExport: i,
            onImport: s,
            readonly: r,
            className: o,
        }),
    })
}
function zr({ initialSteps: e = [], onStepsChange: t, onExport: i, onImport: s, readonly: r = !1, className: o = '' }) {
    const {
            flowState: u,
            updateFlowState: l,
            edges: c,
            nodes: d,
            setNodes: p,
            onNodesChange: f,
            onEdgesChange: v,
            steps: x,
            updateStepsFromFlow: y,
            updateFlowFromSteps: m,
        } = Ur(e),
        {
            addStep: S,
            deleteStep: k,
            updateNode: R,
            onConnect: Y,
            updateConditionNode: H,
            isValidConnection: ve,
        } = qr(u, l, y, r),
        [ce, V] = ae(!1),
        [B, O] = ae(!1),
        [W, Ke] = ae({
            prettyPrint: !0,
            functionHandling: 'serialize',
            includeMeta: !0,
            validateSteps: !0,
        }),
        [Q, xe] = ae({
            includeImports: !1,
            includeTypes: !1,
            useConstAssertion: !1,
            variableName: 'steps',
            includeComments: !0,
            inlineFunctions: !0,
            indentation: 'spaces',
            spacesCount: 2,
            includeValidation: !1,
        }),
        he = yt(null),
        { fitView: ne, screenToFlowPosition: Ne } = ii()
    Qe(() => {
        t?.(x)
    }, [x, t])
    const me = Xe(() => d.filter((w) => w.selected), [d]),
        ke = me.find((w) => w.type === 'stepNode'),
        se = me.find((w) => w.type === 'conditionNode'),
        ge = P((w, N) => {
            ;(N.type === 'stepNode' || N.type === 'conditionNode') && O(!0)
        }, []),
        h = P(
            (w) => {
                if (r) return
                const N = new Set(w.map((L) => L.id)),
                    T = u.nodes.filter((L) => !N.has(L.id)),
                    G = u.edges.filter((L) => !N.has(L.source) && !N.has(L.target))
                ;(l({
                    nodes: T,
                    edges: G,
                }),
                    w.some((L) => L.selected) && O(!1))
            },
            [r, u, l]
        ),
        _ = P(
            (w) => {
                if (r) return
                const N = new Set(w.map((G) => G.id)),
                    T = u.edges.filter((G) => !N.has(G.id))
                y(void 0, T)
            },
            [r, u.edges, y]
        ),
        A = P((w) => {
            ;(w.preventDefault(), (w.dataTransfer.dropEffect = 'move'))
        }, []),
        F = P(
            (w) => {
                if ((w.preventDefault(), r)) return
                const N = w.dataTransfer.getData('application/reactflow')
                if (!N) return
                const T = JSON.parse(N),
                    G = Ne({
                        x: w.clientX - 75,
                        y: w.clientY - 50,
                    })
                if (T.type === 'condition') {
                    const U = te('condition'),
                        L = {
                            id: U,
                            type: 'conditionNode',
                            data: {
                                conditionId: U,
                                description: 'When the user is happy!',
                            },
                            position: G,
                        },
                        dt = {
                            nodes: [...u.nodes, L],
                            edges: u.edges,
                        }
                    l(dt)
                } else if (T.type === 'step' && T.stepType) {
                    if (r) return
                    const U = te('step'),
                        L = {
                            id: U,
                            type: T.stepType,
                            payload: Bt(T.stepType),
                        },
                        dt = {
                            id: String(U),
                            type: 'stepNode',
                            data: {
                                stepId: U,
                                stepType: T.stepType,
                                label: Ft(L),
                                description: Dt(L),
                                isSkippable: !!L.isSkippable,
                                hasCondition: typeof L.condition == 'function',
                                payload: L.payload,
                                condition: L.condition,
                                metadata: {},
                                nextStep: L.nextStep,
                                previousStep: L.previousStep,
                                skipToStep: L.skipToStep,
                            },
                            position: G,
                            // Use the dropped position directly
                        },
                        Hi = {
                            nodes: [...u.nodes, dt],
                            edges: u.edges,
                        }
                    l(Hi)
                }
            },
            [r, Ne, u, l, S]
        ),
        Ee = P(
            (w = 'TB') => {
                const N = Nr(u.nodes, u.edges, w),
                    T = {
                        nodes: N.nodes,
                        edges: N.edges,
                    }
                ;(l(T), setTimeout(() => ne(), 100))
            },
            [u, l, ne]
        ),
        Le = P(
            (w) => {
                if (w === 'json') {
                    const N = Ut.toJSON(x, W)
                    if (N.success && N.data) {
                        const T = 'onboarding-flow.json'
                        ;(i?.(N.data, w, T), M(N.data, T, 'application/json'))
                    } else alert(`JSON export failed: ${N.errors.join(', ')}`)
                } else if (w === 'typescript') {
                    const N = Br(u, {
                            format: 'typescript',
                            includeTypes: Q.includeTypes,
                            includeComments: Q.includeComments,
                            variableName: Q.variableName,
                        }),
                        T = 'onboarding-steps.ts'
                    ;(i?.(N, w, T), M(N, T, 'text/typescript'))
                }
            },
            [x, W, Q, u, i]
        ),
        M = P((w, N, T) => {
            const G = new Blob([w], { type: T }),
                U = URL.createObjectURL(G),
                L = document.createElement('a')
            ;((L.href = U),
                (L.download = N),
                document.body.appendChild(L),
                L.click(),
                document.body.removeChild(L),
                URL.revokeObjectURL(U))
        }, []),
        be = P(
            (w) => {
                r || (w ? je(w) : he.current?.click())
            },
            [r]
        ),
        je = P(
            async (w) => {
                try {
                    const N = w.name.toLowerCase().split('.').pop(),
                        T = await w.text()
                    let G = []
                    if (N === 'json') {
                        const U = Ut.fromJSON(T, W)
                        if (U.success && U.data) G = U.data
                        else {
                            alert(`JSON import failed: ${U.errors.join(', ')}`)
                            return
                        }
                    } else if (N === 'ts' || N === 'js')
                        try {
                            const U = Gr.parseSteps(T)
                            if (U.length === 0) {
                                alert(
                                    'No valid onboarding steps found in the file. Please ensure the file contains a properly formatted steps array.'
                                )
                                return
                            }
                            G = U
                        } catch (U) {
                            alert(`TypeScript/JavaScript import failed: ${U instanceof Error ? U.message : String(U)}`)
                            return
                        }
                    else {
                        alert(`Unsupported file type: ${N}. Please use .json, .ts, or .js files.`)
                        return
                    }
                    ;(m(G), s?.(G))
                } catch (N) {
                    alert(`Import failed: ${N instanceof Error ? N.message : String(N)}`)
                }
            },
            [W, l, s, Ee]
        ),
        pt = P(() => {
            if (!r && confirm('Are you sure you want to clear the entire flow?')) {
                const w = Ye([])
                ;(l(w), O(!1))
            }
        }, [r, l])
    return /* @__PURE__ */ a.jsxs('div', {
        id: 'flow-visualizer',
        className: `flow-visualizer ${o}`,
        children: [
            /* @__PURE__ */ a.jsx(ms, {
                onExport: Le,
                onImport: () => be(),
                onClear: pt,
                onLayout: Ee,
                onToggleSidebar: () => V(!ce),
                exportOptions: W,
                onExportOptionsChange: Ke,
                typeScriptExportOptions: Q,
                onTypeScriptExportOptionsChange: xe,
                readonly: r,
                stepCount: x.length,
            }),
            /* @__PURE__ */ a.jsxs('div', {
                className: 'flow-container',
                children: [
                    /* @__PURE__ */ a.jsx(Ss, {}),
                    /* @__PURE__ */ a.jsxs(Yi, {
                        nodes: d,
                        edges: c,
                        onNodesChange: f,
                        onEdgesChange: v,
                        onConnect: Y,
                        isValidConnection: ve,
                        onNodeClick: ge,
                        onNodesDelete: h,
                        onEdgesDelete: _,
                        onDrop: F,
                        onDragOver: A,
                        nodeTypes: Hr,
                        edgeTypes: $r,
                        selectNodesOnDrag: !1,
                        connectionLineType: Qi.Bezier,
                        defaultEdgeOptions: {
                            markerEnd: { type: Me.ArrowClosed },
                            type: 'conditional',
                        },
                        fitView: !0,
                        deleteKeyCode: ['Delete', 'Backspace'],
                        multiSelectionKeyCode: 'Shift',
                        panOnScroll: !0,
                        selectionOnDrag: !0,
                        panOnDrag: [1, 2],
                        proOptions: { hideAttribution: !0 },
                        children: [
                            /* @__PURE__ */ a.jsx(Xi, {}),
                            /* @__PURE__ */ a.jsx(Zi, {}),
                            /* @__PURE__ */ a.jsx(es, {
                                nodeColor: (w) => Mr(w.data.stepType || 'endNode'),
                                nodeStrokeWidth: 3,
                                zoomable: !0,
                                pannable: !0,
                            }),
                        ],
                    }),
                    ce &&
                        /* @__PURE__ */ a.jsx(gs, {
                            steps: x,
                            onStepSelect: (w) => {
                                const N = d.find((T) => T.type === 'stepNode' && T.data.stepId === w.id)
                                if (N) {
                                    const T = d.map((G) => ({
                                        ...G,
                                        selected: G.id === N.id,
                                    }))
                                    ;(p(T), O(!0))
                                }
                            },
                            onStepAdd: S,
                            onStepDelete: k,
                            onClose: () => V(!1),
                            readonly: r,
                        }),
                    B &&
                        ke &&
                        /* @__PURE__ */ a.jsx(ws, {
                            node: ke,
                            onNodeUpdate: R,
                            onClose: () => O(!1),
                            readonly: r,
                        }),
                    B &&
                        se &&
                        /* @__PURE__ */ a.jsx(Or, {
                            conditionNode: se,
                            onUpdate: H,
                            onClose: () => O(!1),
                            readonly: r,
                        }),
                ],
            }),
            /* @__PURE__ */ a.jsx('input', {
                ref: he,
                type: 'file',
                accept: '.json,.ts,.js,.tsx,.jsx',
                style: { display: 'none' },
                onChange: (w) => {
                    const N = w.target.files?.[0]
                    ;(N && je(N), (w.target.value = ''))
                },
            }),
        ],
    })
}
export {
    wr as BaseASTVisitor,
    ri as BaseParseStrategy,
    Ir as BinaryExpressionParser,
    _s as ChecklistItemsEditor,
    Ar as CodeGenerator,
    Is as CompositeInputValidator,
    Or as ConditionDetailsPanel,
    Mt as ConditionParser,
    Ui as ConditionVisitor,
    xs as ConditionalEdge,
    As as FieldExtractor,
    gs as FlowSidebar,
    ms as FlowToolbar,
    ea as FlowVisualizer,
    Mi as FunctionExtractor,
    kr as FunctionParseStrategy,
    ks as FunctionValidator,
    Os as LiteralExtractor,
    Es as NumberValidator,
    Gr as OnboardJSParser,
    Cs as OptionsListEditor,
    jr as ParseCache,
    ws as StepDetailsPanel,
    Er as StringParseStrategy,
    Wt as StringValidator,
    Zr as createDownloadableContent,
    Br as exportFlowAsCode,
    Xr as exportFlowAsJSON,
    at as exportFlowAsSteps,
    te as generateId,
    Bt as getDefaultPayload,
    Dt as getStepDescription,
    Ft as getStepLabel,
    Cr as isArrowFunctionExpression,
    ti as isBlockStatement,
    Ue as isExpressionStatement,
    ei as isFunctionDeclaration,
    yr as isFunctionExpression,
    _r as isIfStatement,
    Sr as isReturnStatement,
    Nr as layoutNodes,
    Tr as parseCache,
    Ye as stepsToFlowState,
    qr as useFlowOperations,
    Ur as useFlowState,
}
