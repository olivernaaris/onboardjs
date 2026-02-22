'use client'
'use strict'
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
const y = require('react/jsx-runtime'),
    s = require('react'),
    O = require('@onboardjs/core')
function Se(e) {
    const t = {
        id: e.id,
        type: e.type,
        payload: e.payload ? JSON.stringify(e.payload, (n, r) => (typeof r == 'function' ? '[function]' : r)) : void 0,
        isSkippable: 'isSkippable' in e ? e.isSkippable : void 0,
        hasNextStep: e.nextStep !== void 0,
        hasPreviousStep: e.previousStep !== void 0,
        hasCondition: e.condition !== void 0,
        hasOnStepActive: e.onStepActive !== void 0,
        hasOnStepComplete: e.onStepComplete !== void 0,
        meta: e.meta ? JSON.stringify(e.meta) : void 0,
    }
    return JSON.stringify(t)
}
function j(e) {
    return !e || e.length === 0 ? 'empty' : e.map(Se).join('|')
}
function A(e) {
    const {
            steps: t,
            initialStepId: n,
            initialContext: r,
            debug: o,
            plugins: a,
            analytics: d,
            publicKey: i,
            apiHost: c,
            userId: u,
        } = e,
        p = {
            stepsHash: j(t),
            initialStepId: n ?? null,
            initialContextHash: r ? JSON.stringify(r, (f, l) => (typeof l == 'function' ? '[function]' : l)) : null,
            debug: o ?? !1,
            pluginCount: a?.length ?? 0,
            analyticsHash: d ? JSON.stringify(d, (f, l) => (typeof l == 'function' ? '[function]' : l)) : null,
            publicKey: i ?? null,
            apiHost: c ?? null,
            userId: u ?? null,
        }
    return JSON.stringify(p)
}
function ye(e, t) {
    return e.length !== t.length ? !1 : j(e) === j(t)
}
function he(e) {
    const [t, n] = s.useState(null),
        [r, o] = s.useState(!1),
        [a, d] = s.useState(null),
        i = s.useRef(e)
    i.current = e
    const c = s.useMemo(
        () =>
            A({
                steps: e.steps,
                initialStepId: e.initialStepId,
                initialContext: e.initialContext,
                debug: e.debug,
                plugins: e.plugins,
                analytics: e.analytics,
                publicKey: e.publicKey,
                apiHost: e.apiHost,
                userId: e.userId,
            }),
        [e.steps, e.initialStepId, e.initialContext, e.debug, e.plugins, e.analytics, e.publicKey, e.apiHost, e.userId]
    )
    return (
        s.useEffect(() => {
            let u = !0
            ;(o(!1), n(null), d(null))
            let p = null
            const f = i.current
            try {
                ;((p = new O.OnboardingEngine(f)),
                    u && n(p),
                    p
                        .ready()
                        .then(() => {
                            u && p && (o(!0), d(null))
                        })
                        .catch((l) => {
                            ;(console.error('[OnboardJS] Engine initialization failed:', l),
                                u && (d(l instanceof Error ? l : new Error(String(l))), o(!1)))
                        }))
            } catch (l) {
                ;(console.error('[OnboardJS] Error creating engine:', l),
                    u && d(l instanceof Error ? l : new Error(String(l))))
            }
            return () => {
                u = !1
            }
        }, [c]),
        { engine: t, isReady: r, error: a }
    )
}
function me(e, t) {
    const [n, r] = s.useState(null)
    return (
        s.useEffect(() => {
            if (!e || !t) {
                r(null)
                return
            }
            r(e.getState())
            const o = e.addEventListener('stateChange', (a) => {
                r(a.state)
            })
            return () => {
                o && o()
            }
        }, [e, t]),
        n
    )
}
const D = new Map()
function Ee(e) {
    const {
            localStoragePersistence: t,
            customOnDataLoad: n,
            customOnDataPersist: r,
            customOnClearPersistedData: o,
            onPersistenceError: a,
        } = e,
        [d, i] = s.useState(() => (n || r ? 'custom' : t ? 'localStorage' : 'none')),
        [c, u] = s.useState(null),
        p = s.useRef(!1),
        f = s.useCallback(() => {
            ;((p.current = !0), i('memory'), console.warn('[OnboardJS] Switched to memory-only persistence mode'))
        }, []),
        l = s.useCallback(
            (S) => {
                ;(u(S), a && a(S))
            },
            [a]
        ),
        b = s.useCallback(async () => {
            if (n)
                try {
                    return await n()
                } catch (g) {
                    const h = g instanceof Error ? g : new Error(String(g))
                    throw (console.error('[OnboardJS] Custom data load failed:', h), l(h), h)
                }
            if (p.current && t) {
                const { key: g } = t,
                    h = D.get(g)
                if (!h) return null
                try {
                    return JSON.parse(h).data
                } catch {
                    return null
                }
            }
            if (!t || typeof window > 'u') return null
            const { key: S, ttl: E } = t
            try {
                const g = window.localStorage.getItem(S)
                if (!g) return null
                const h = JSON.parse(g)
                return E && h.timestamp && Date.now() - h.timestamp > E
                    ? (window.localStorage.removeItem(S), null)
                    : h.data
            } catch (g) {
                const h = g instanceof Error ? g : new Error(String(g))
                ;(console.error(`[OnboardJS] Error loading from localStorage (key: "${S}"):`, h), l(h))
                try {
                    window.localStorage.removeItem(S)
                } catch {}
                return null
            }
        }, [t, n, l]),
        m = s.useCallback(
            async (S, E) => {
                if (r) {
                    try {
                        await r(S, E)
                    } catch (C) {
                        const v = C instanceof Error ? C : new Error(String(C))
                        throw (console.error('[OnboardJS] Custom data persist failed:', v), l(v), v)
                    }
                    return
                }
                if (!t || typeof window > 'u') return
                const { key: g } = t,
                    h = {
                        flowData: S.flowData,
                        currentStepId: E,
                        ...Object.fromEntries(Object.entries(S).filter(([C]) => C !== 'flowData')),
                    },
                    x = { timestamp: Date.now(), data: h },
                    R = JSON.stringify(x)
                if (p.current) {
                    D.set(g, R)
                    return
                }
                try {
                    window.localStorage.setItem(g, R)
                } catch (C) {
                    if (C instanceof Error && C.name === 'QuotaExceededError')
                        (console.warn('[OnboardJS] localStorage quota exceeded. Switching to memory-only persistence.'),
                            l(C),
                            f(),
                            D.set(g, R))
                    else {
                        const v = C instanceof Error ? C : new Error(String(C))
                        ;(console.error(`[OnboardJS] Error persisting to localStorage (key: "${g}"):`, v), l(v))
                    }
                }
            },
            [t, r, l, f]
        ),
        w = s.useCallback(async () => {
            if (o) {
                try {
                    await o()
                } catch (E) {
                    const g = E instanceof Error ? E : new Error(String(E))
                    ;(console.error('[OnboardJS] Custom clear persisted data failed:', g), l(g))
                }
                return
            }
            if (!t || typeof window > 'u') return
            const { key: S } = t
            if ((D.delete(S), !p.current))
                try {
                    window.localStorage.removeItem(S)
                } catch (E) {
                    const g = E instanceof Error ? E : new Error(String(E))
                    ;(console.error(`[OnboardJS] Error clearing localStorage (key: "${S}"):`, g), l(g))
                }
        }, [t, o, l])
    return {
        onDataLoad: b,
        onDataPersist: m,
        onClearPersistedData: w,
        persistenceMode: d,
        persistenceError: c,
        switchToMemoryMode: f,
    }
}
function be(e) {
    const { engine: t, isEngineReady: n, stepData: r, onEngineProcessingChange: o } = e,
        a = s.useCallback(
            async (f) => {
                if (!t || !n) return
                const l = f !== void 0 ? f : r.data
                if (!r.isValid && f === void 0) {
                    console.warn(
                        '[OnboardJS] next() called, but the current step component reports invalid state. Navigation blocked.'
                    )
                    return
                }
                o(!0)
                try {
                    await t.next(l)
                } finally {
                    o(!1)
                }
            },
            [t, n, r, o]
        ),
        d = s.useCallback(async () => {
            if (!(!t || !n)) {
                o(!0)
                try {
                    await t.previous()
                } finally {
                    o(!1)
                }
            }
        }, [t, n, o]),
        i = s.useCallback(async () => {
            if (!(!t || !n)) {
                o(!0)
                try {
                    await t.skip()
                } finally {
                    o(!1)
                }
            }
        }, [t, n, o]),
        c = s.useCallback(
            async (f, l) => {
                if (!(!t || !n)) {
                    o(!0)
                    try {
                        await t.goToStep(f, l)
                    } finally {
                        o(!1)
                    }
                }
            },
            [t, n, o]
        ),
        u = s.useCallback(
            async (f) => {
                if (!(!t || !n)) {
                    o(!0)
                    try {
                        await t.updateContext(f)
                    } finally {
                        o(!1)
                    }
                }
            },
            [t, n, o]
        ),
        p = s.useCallback(
            async (f) => {
                if (t) {
                    o(!0)
                    try {
                        await t.reset(f)
                    } finally {
                        o(!1)
                    }
                }
            },
            [t, o]
        )
    return { next: a, previous: d, skip: i, goToStep: c, updateContext: u, reset: p }
}
function Ce(e, t) {
    const n = e.component
    if (n && M(n)) return n
    const r = t?.[e.id]
    if (r && M(r)) return r
    const o = e.type === 'CUSTOM_COMPONENT' ? e.payload?.componentKey : e.type
    if (o) {
        const a = t?.[String(o)]
        if (a && M(a)) return a
    }
    return null
}
function M(e) {
    return typeof e == 'function'
}
function we(e) {
    const { engineState: t, componentRegistry: n, onDataChange: r } = e
    return s.useCallback(() => {
        if (!t?.currentStep) return null
        const { currentStep: a, context: d } = t,
            i = Ce(a, n)
        if (!i) {
            const f = a.type === 'CUSTOM_COMPONENT' ? a.payload?.componentKey : a.type,
                l = [a.id, String(f)]
            return y.jsxs('div', {
                style: { padding: '16px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '4px' },
                children: [
                    y.jsxs('strong', { children: ['❌ Component Not Found for Step: "', a.id, '"'] }),
                    y.jsx('p', {
                        style: { marginTop: '8px', marginBottom: '0', fontSize: '14px' },
                        children:
                            'OnboardJS tried to resolve a component from the registry but none of the following keys matched:',
                    }),
                    y.jsxs('ul', {
                        style: { marginTop: '4px', paddingLeft: '20px', marginBottom: '0' },
                        children: [
                            l.map((b) => y.jsxs('li', { children: ['registry["', b, '"]'] }, b)),
                            y.jsx('li', { children: 'step.component property' }),
                        ],
                    }),
                    y.jsxs('p', {
                        style: { marginTop: '8px', marginBottom: '0', fontSize: '13px' },
                        children: [
                            'Make sure the component is registered in the ',
                            y.jsx('code', { children: 'componentRegistry' }),
                            " prop or defined directly in the step's ",
                            y.jsx('code', { children: 'component' }),
                            ' property.',
                        ],
                    }),
                ],
            })
        }
        const c = a.payload?.dataKey,
            u = c ? d.flowData[String(c)] : void 0,
            p = { payload: a.payload, coreContext: d, context: d, onDataChange: r, initialData: u }
        return s.createElement(i, p)
    }, [t, n, r])
}
const I = new Map()
function xe(e) {
    e ? I.delete(e) : I.clear()
}
function Re(e) {
    const t = s.useRef(null),
        n = s.useMemo(
            () =>
                A({
                    steps: e.steps,
                    initialStepId: e.initialStepId,
                    initialContext: e.initialContext,
                    debug: e.debug,
                    plugins: e.plugins,
                }),
            [e.steps, e.initialStepId, e.initialContext, e.debug, e.plugins]
        )
    if (typeof window > 'u')
        throw new Error(
            '[OnboardJS] useSuspenseEngine cannot be used during server-side rendering. Wrap your component in a client-side boundary or use the regular useEngineLifecycle hook.'
        )
    const r = I.get(n)
    if (r)
        switch (r.status) {
            case 'pending':
                throw r.promise
            case 'rejected':
                throw r.error
            case 'resolved':
                return ((t.current = r.engine), { engine: r.engine, isReady: !0, error: null })
        }
    const o = O.ConfigurationBuilder.validateConfig(e)
    if (!o.isValid) {
        const i = new Error(`Invalid Onboarding Configuration: ${o.errors.join(', ')}`)
        throw (I.set(n, { status: 'rejected', error: i }), i)
    }
    let a
    try {
        ;((a = new O.OnboardingEngine(e)), (t.current = a))
    } catch (i) {
        const c = i instanceof Error ? i : new Error(String(i))
        throw (I.set(n, { status: 'rejected', error: c }), c)
    }
    const d = a
        .ready()
        .then(() => {
            I.set(n, { status: 'resolved', engine: a })
        })
        .catch((i) => {
            const c = i instanceof Error ? i : new Error(String(i))
            throw (I.set(n, { status: 'rejected', error: c }), c)
        })
    throw (I.set(n, { status: 'pending', promise: d }), d)
}
function T(e) {
    return String(e)
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()
}
function Q(e, t) {
    const { basePath: n, urlMapping: r = 'auto' } = e
    let o = n
    for (; o.startsWith('/'); ) o = o.slice(1)
    for (; o.endsWith('/'); ) o = o.slice(0, -1)
    o = '/' + o
    const a = new Map(),
        d = new Map()
    for (const i of t) {
        const c = i.id
        let u
        ;(r === 'auto' ? (u = T(c)) : r[c] !== void 0 ? (u = r[c]) : (u = T(c)),
            a.set(c, u),
            typeof u == 'string' && d.set(u, c))
    }
    for (const i of t) {
        const c = T(i.id)
        d.has(c) || d.set(c, i.id)
    }
    return {
        stepIdToUrl(i, c) {
            const u = a.get(i)
            let p
            u === void 0 ? (p = T(i)) : typeof u == 'function' ? (p = u(c)) : (p = u)
            const f = o.endsWith('/') ? '' : '/'
            return `${o}${f}${p}`
        },
        urlToStepId(i) {
            if (!i.startsWith(o)) return null
            const u = i.slice(o.length).replace(/^\//, '').split(/[?#]/)[0]
            if (!u) return null
            const p = d.get(u)
            return p !== void 0 ? p : null
        },
        isOnboardingUrl(i) {
            return i.startsWith(o)
        },
        getCompletionUrl() {
            return null
        },
    }
}
function Y(e, t, n, r) {
    if (e === t || n.has(e)) return !0
    const o = r.findIndex((d) => d.id === e),
        a = r.findIndex((d) => d.id === t)
    return !(o === -1 || a === -1 || o > a)
}
function ve(e) {
    const { navigatorConfig: t, engine: n, isEngineReady: r, steps: o } = e,
        a = s.useRef(!1),
        d = s.useRef(null),
        i = s.useRef(!1),
        c = s.useMemo(() => (t ? Q(t, o) : null), [t, o]),
        u = t?.navigator,
        p = t?.syncUrl !== !1,
        f = s.useCallback(() => {
            if (!u || !n || !c || !p || a.current) return
            const b = n.getState(),
                m = b.currentStep?.id
            if (!(m === void 0 || m === d.current)) {
                a.current = !0
                try {
                    const w = c.stepIdToUrl(m, b.context)
                    ;(u.getCurrentPath() !== w && u.navigate(w, { replace: !1 }), (d.current = m))
                } finally {
                    a.current = !1
                }
            }
        }, [u, n, c, p]),
        l = s.useCallback(
            async (b) => {
                if (!n || !c || a.current) return
                const m = c.urlToStepId(b)
                if (m === null) return
                const w = n.getState(),
                    S = w.currentStep?.id
                if (m === S) return
                const E = w.context.flowData?._internal?.completedSteps || {},
                    g = new Set()
                for (const x of Object.keys(E)) {
                    g.add(x)
                    const R = Number(x)
                    Number.isNaN(R) || g.add(R)
                }
                if (!Y(m, S ?? null, g, o)) {
                    if (S !== void 0 && u) {
                        const x = c.stepIdToUrl(S, w.context)
                        u.navigate(x, { replace: !0 })
                    }
                    return
                }
                a.current = !0
                try {
                    ;(await n.goToStep(String(m)), (d.current = m))
                } finally {
                    a.current = !1
                }
            },
            [n, c, o, u]
        )
    return (
        s.useEffect(() => {
            if (!r || !n || !u || !c || i.current) return
            i.current = !0
            const b = u.getCurrentPath()
            c.isOnboardingUrl(b) ? l(b) : p && f()
        }, [r, n, u, c, l, f, p]),
        s.useEffect(
            () =>
                !n || !r || !p
                    ? void 0
                    : n.addEventListener('stateChange', (m) => {
                          !a.current && m.state.currentStep?.id !== d.current && f()
                      }),
            [n, r, p, f]
        ),
        s.useEffect(
            () =>
                !u?.onRouteChange || !r
                    ? void 0
                    : u.onRouteChange((m) => {
                          l(m)
                      }),
            [u, r, l]
        ),
        s.useEffect(() => {
            ;((i.current = !1), (d.current = null))
        }, [n]),
        { syncUrlToStep: f, urlMapper: c }
    )
}
function Oe(e) {
    return e.isHydrating
        ? 'hydrating'
        : e.isEngineProcessing
          ? 'engine-processing'
          : e.isComponentProcessing
            ? 'component-processing'
            : null
}
function X(e, t, n) {
    return { isHydrating: e, isEngineProcessing: t, isComponentProcessing: n, isAnyLoading: e || t || n }
}
function Pe() {
    return s.createContext(void 0)
}
const ee = Pe()
function te({
    children: e,
    steps: t,
    initialStepId: n,
    initialContext: r,
    onFlowComplete: o,
    onStepChange: a,
    localStoragePersistence: d,
    customOnDataLoad: i,
    customOnDataPersist: c,
    customOnClearPersistedData: u,
    plugins: p,
    componentRegistry: f,
    debug: l,
    navigator: b,
    flowId: m,
    flowName: w,
    flowVersion: S,
    flowMetadata: E,
    publicKey: g,
    apiHost: h,
    cloudOptions: x,
    analytics: R,
    userId: C,
}) {
    const v = s.useMemo(
        () =>
            O.ConfigurationBuilder.validateConfig({
                steps: t,
                initialStepId: n,
                initialContext: r,
                plugins: p,
                debug: l,
            }),
        [t, n, r, p, l]
    )
    if (!v.isValid)
        throw new Error(`[OnboardJS] Invalid Onboarding Configuration:
${v.errors.join(`
`)}`)
    v.warnings.length > 0 && l && console.warn('[OnboardJS] Configuration warnings:', v.warnings)
    const [oe, se] = s.useState(!1),
        [ae, ie] = s.useState({ data: null, isValid: !0 }),
        {
            onDataLoad: L,
            onDataPersist: _,
            onClearPersistedData: J,
        } = Ee({
            localStoragePersistence: d,
            customOnDataLoad: i,
            customOnDataPersist: c,
            customOnClearPersistedData: u,
        }),
        U = s.useMemo(
            () => ({ steps: t, initialStepId: n, initialContext: r, debug: l, plugins: p || [] }),
            [t, n, r, l, p]
        ),
        W = s.useMemo(
            () => ({ onFlowComplete: o, onStepChange: a, loadData: L, persistData: _, clearPersistedData: J }),
            [o, a, L, _, J]
        ),
        B = s.useMemo(
            () => ({
                flowId: m,
                flowName: w,
                flowVersion: S,
                flowMetadata: E,
                publicKey: g,
                apiHost: h,
                cloudOptions: x,
                analytics: R,
                userId: C,
            }),
            [m, w, S, E, g, h, x, R, C]
        ),
        ce = s.useMemo(() => ({ ...U, ...W, ...B }), [U, W, B]),
        { engine: N, isReady: k, error: H } = he(ce),
        P = me(N, k),
        [ue, le] = s.useState(!1)
    ve({ navigatorConfig: b, engine: N, isEngineReady: k, steps: t })
    const de = s.useCallback((ge, fe) => {
            ie({ data: ge, isValid: fe })
        }, []),
        z = we({ engineState: P, componentRegistry: f, onDataChange: de }),
        K = be({ engine: N, isEngineReady: k, stepData: ae, onEngineProcessingChange: le }),
        $ = P?.isHydrating ?? !1,
        q = ue || (P?.isLoading ?? !1),
        V = oe,
        F = s.useMemo(() => X($, q, V), [$, q, V]),
        Z = F.isAnyLoading,
        pe = s.useMemo(
            () => ({
                engine: k ? N : null,
                engineInstanceId: k ? N?.instanceId : void 0,
                state: k ? P : null,
                loading: F,
                isLoading: Z,
                setComponentLoading: se,
                currentStep: P?.currentStep ?? null,
                isCompleted: P?.isCompleted,
                error: H ?? P?.error ?? null,
                renderStep: z,
                ...K,
            }),
            [N, P, F, Z, k, H, K, z]
        )
    return y.jsx(ee.Provider, { value: pe, children: e })
}
function ne(e) {
    const t = s.useContext(ee)
    if (t === void 0) throw new Error('useOnboarding must be used within an OnboardingProvider')
    const {
            engine: n,
            state: r,
            loading: o,
            isLoading: a,
            skip: d,
            next: i,
            previous: c,
            goToStep: u,
            reset: p,
            setComponentLoading: f,
            updateContext: l,
            error: b,
            renderStep: m,
        } = t,
        w = s.useRef(e?.onFlowCompleted),
        S = s.useRef(e?.onStepChange)
    ;(s.useEffect(() => {
        w.current = e?.onFlowCompleted
    }, [e?.onFlowCompleted]),
        s.useEffect(() => {
            S.current = e?.onStepChange
        }, [e?.onStepChange]),
        s.useEffect(() => {
            if (!n || !w.current) return
            const h = (R) => {
                    w.current && w.current(R)
                },
                x = n.addFlowCompletedListener(h)
            return () => {
                x && x()
            }
        }, [n]),
        s.useEffect(() => {
            if (!n || !S.current) return
            const h = n.addAfterStepChangeListener(({ oldStep: x, newStep: R, context: C }) => {
                S.current && S.current(R, x, C)
            })
            return () => {
                h && h()
            }
        }, [n]))
    const E = r?.isCompleted ?? !1,
        g = r?.currentStep
    return {
        engine: n,
        state: r,
        loading: o,
        isLoading: a,
        skip: d,
        next: i,
        previous: c,
        goToStep: u,
        reset: p,
        setComponentLoading: f,
        updateContext: l,
        renderStep: m,
        isCompleted: E,
        currentStep: g,
        error: b,
    }
}
function Ie() {
    const { engine: e } = ne()
    return (
        s.useEffect(() => {
            if (!e) return
            const n = O.AhaTracker.getInstance({ debug: !0 }),
                r = e.getContext(),
                o = e.getState()
            n.linkToEngine({
                getUserId: () => r.userId || r.flowData?.userId || void 0,
                getFlowData: () => ({
                    flow_id: e.getFlowId() || void 0,
                    flow_version: e.getFlowVersion() || void 0,
                    current_step_id: o.currentStep?.id?.toString(),
                    current_step_index: o.currentStepNumber,
                    total_steps: e.getRelevantSteps().length,
                }),
            })
        }, [e]),
        { trackAha: s.useCallback(async (n) => O.aha(n), []), aha: O.aha }
    )
}
class ke extends O.BasePlugin {
    getHooks() {
        return { ...super.getHooks(), ...this.getReactHooks() }
    }
    getReactHooks() {
        return {}
    }
    isReactEnvironment() {
        return typeof window < 'u' && typeof document < 'u'
    }
}
function Ne(e) {
    const t = e.message.toLowerCase(),
        n = e.name.toLowerCase()
    return t.includes('initialization') ||
        t.includes('invalid onboarding configuration') ||
        t.includes('engine creation')
        ? 'INITIALIZATION_ERROR'
        : n === 'quotaexceedederror' ||
            t.includes('localstorage') ||
            t.includes('quota') ||
            t.includes('persist') ||
            t.includes('storage')
          ? 'PERSISTENCE_ERROR'
          : t.includes('engine') || t.includes('step') || t.includes('navigation')
            ? 'ENGINE_ERROR'
            : t.includes('render') || t.includes('component') || t.includes('react')
              ? 'COMPONENT_ERROR'
              : 'UNKNOWN'
}
function Te(e) {
    switch (e) {
        case 'PERSISTENCE_ERROR':
            return !0
        case 'COMPONENT_ERROR':
            return !0
        case 'INITIALIZATION_ERROR':
            return !0
        case 'ENGINE_ERROR':
            return !0
        case 'UNKNOWN':
        default:
            return !0
    }
}
function G(e) {
    const t = Ne(e)
    return { type: t, originalError: e, message: e.message, recoverable: Te(t) }
}
function De({ error: e, resetError: t, continueWithoutPersistence: n }) {
    const r = () => {
            switch (e.type) {
                case 'INITIALIZATION_ERROR':
                    return 'Failed to Initialize Onboarding'
                case 'PERSISTENCE_ERROR':
                    return 'Storage Error'
                case 'ENGINE_ERROR':
                    return 'Onboarding Error'
                case 'COMPONENT_ERROR':
                    return 'Display Error'
                case 'UNKNOWN':
                default:
                    return 'Something Went Wrong'
            }
        },
        o = () => {
            switch (e.type) {
                case 'INITIALIZATION_ERROR':
                    return 'We encountered an issue starting the onboarding flow. Please try again.'
                case 'PERSISTENCE_ERROR':
                    return 'Unable to save your progress. You can continue without saving or try again.'
                case 'ENGINE_ERROR':
                    return 'An error occurred during navigation. Please try again.'
                case 'COMPONENT_ERROR':
                    return 'There was a problem displaying this step. Please try again.'
                case 'UNKNOWN':
                default:
                    return 'An unexpected error occurred. Please try again.'
            }
        }
    return y.jsxs('div', {
        role: 'alert',
        style: {
            padding: '24px',
            borderRadius: '8px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            maxWidth: '400px',
            margin: '20px auto',
        },
        children: [
            y.jsx('h2', {
                style: { margin: '0 0 8px', fontSize: '18px', fontWeight: '600', color: '#991B1B' },
                children: r(),
            }),
            y.jsx('p', { style: { margin: '0 0 16px', fontSize: '14px', color: '#7F1D1D' }, children: o() }),
            process.env.NODE_ENV === 'development' &&
                y.jsxs('details', {
                    style: { marginBottom: '16px', fontSize: '12px', color: '#7F1D1D' },
                    children: [
                        y.jsx('summary', {
                            style: { cursor: 'pointer', marginBottom: '8px' },
                            children: 'Error Details',
                        }),
                        y.jsx('pre', {
                            style: {
                                margin: 0,
                                padding: '8px',
                                backgroundColor: '#FEE2E2',
                                borderRadius: '4px',
                                overflow: 'auto',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            },
                            children: e.originalError.stack || e.message,
                        }),
                    ],
                }),
            y.jsxs('div', {
                style: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
                children: [
                    y.jsx('button', {
                        onClick: t,
                        style: {
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'white',
                            backgroundColor: '#DC2626',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        },
                        children: 'Try Again',
                    }),
                    e.type === 'PERSISTENCE_ERROR' &&
                        n &&
                        y.jsx('button', {
                            onClick: n,
                            style: {
                                padding: '8px 16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#7F1D1D',
                                backgroundColor: 'transparent',
                                border: '1px solid #FCA5A5',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            },
                            children: 'Continue Without Saving',
                        }),
                ],
            }),
        ],
    })
}
class re extends s.Component {
    constructor(t) {
        ;(super(t), (this.state = { hasError: !1, error: null }))
    }
    static getDerivedStateFromError(t) {
        return { hasError: !0, error: G(t) }
    }
    componentDidCatch(t, n) {
        const r = G(t)
        ;(console.error('[OnboardJS] Error caught by boundary:', t, n), this.props.onError && this.props.onError(r, n))
    }
    resetError = () => {
        ;(this.setState({ hasError: !1, error: null }), this.props.onReset && this.props.onReset())
    }
    continueWithoutPersistence = () => {
        ;(this.setState({ hasError: !1, error: null }),
            this.props.onContinueWithoutPersistence && this.props.onContinueWithoutPersistence())
    }
    render() {
        if (this.state.hasError && this.state.error) {
            const { fallback: t } = this.props,
                n = {
                    error: this.state.error,
                    resetError: this.resetError,
                    continueWithoutPersistence:
                        this.state.error.type === 'PERSISTENCE_ERROR' ? this.continueWithoutPersistence : void 0,
                }
            return typeof t == 'function' ? t(n) : t || y.jsx(De, { ...n })
        }
        return this.props.children
    }
}
function je(e, t) {
    if (t) return 'Progress not saved'
    switch (e) {
        case 'localStorage':
            return 'Progress saved locally'
        case 'memory':
            return 'Progress saved in memory'
        case 'custom':
            return 'Progress saved'
        case 'none':
            return 'Progress not being saved'
    }
}
function Fe(e, t) {
    const n = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
    }
    if (t) return { ...n, backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FCA5A5' }
    switch (e) {
        case 'localStorage':
        case 'custom':
            return { ...n, backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #86EFAC' }
        case 'memory':
            return { ...n, backgroundColor: '#FFFBEB', color: '#92400E', border: '1px solid #FCD34D' }
        case 'none':
            return { ...n, backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #D1D5DB' }
    }
}
function Me(e, t) {
    if (t) return '⚠️'
    switch (e) {
        case 'localStorage':
        case 'custom':
            return '✓'
        case 'memory':
            return '○'
        case 'none':
            return '○'
    }
}
function Ae({ mode: e, hasError: t = !1, children: n, visible: r = !0, className: o }) {
    if (!r) return null
    const a = je(e, t)
    if (n) return n({ mode: e, hasError: t, statusText: a })
    const d = Fe(e, t),
        i = Me(e, t)
    return y.jsxs('div', {
        className: o,
        style: d,
        role: 'status',
        'aria-live': 'polite',
        children: [y.jsx('span', { 'aria-hidden': 'true', children: i }), y.jsx('span', { children: a })],
    })
}
const Le = ({ message: e = 'Initializing...' }) =>
    y.jsx('div', {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            fontSize: '14px',
            color: '#666',
        },
        children: e,
    })
function _e({
    children: e,
    suspense: t = !1,
    suspenseFallback: n = y.jsx(Le, {}),
    errorBoundary: r = !0,
    errorBoundaryProps: o,
    onError: a,
    ...d
}) {
    const i = y.jsx(te, { ...d, children: e }),
        c = r
            ? y.jsx(re, {
                  ...o,
                  onError: a
                      ? (u) => {
                            const p = new Error(u.message)
                            a(p, { componentStack: '' })
                        }
                      : void 0,
                  children: i,
              })
            : i
    return t ? y.jsx(s.Suspense, { fallback: n, children: c }) : c
}
function Je(e, t) {
    return {
        navigate(n, r) {
            const o = r?.scroll !== !1
            r?.replace ? e.replace(n, { scroll: o }) : e.push(n, { scroll: o })
        },
        getCurrentPath() {
            return t
        },
        onRouteChange(n) {
            const r = () => {
                n(window.location.pathname)
            }
            return (
                window.addEventListener('popstate', r),
                () => {
                    window.removeEventListener('popstate', r)
                }
            )
        },
        back() {
            e.back()
        },
        prefetch(n) {
            e.prefetch(n)
        },
    }
}
function Ue(e, t) {
    return {
        navigate(n, r) {
            e(n, { replace: r?.replace })
        },
        getCurrentPath() {
            return t.pathname
        },
        onRouteChange(n) {
            const r = () => {
                n(window.location.pathname)
            }
            return (
                window.addEventListener('popstate', r),
                () => {
                    window.removeEventListener('popstate', r)
                }
            )
        },
        back() {
            e(-1)
        },
    }
}
Object.defineProperty(exports, 'BasePlugin', { enumerable: !0, get: () => O.BasePlugin })
Object.defineProperty(exports, 'PluginManagerImpl', { enumerable: !0, get: () => O.PluginManagerImpl })
exports.OnboardingContainer = _e
exports.OnboardingErrorBoundary = re
exports.OnboardingProvider = te
exports.PersistenceStatus = Ae
exports.ReactPlugin = ke
exports.areStepsEqual = ye
exports.canAccessStep = Y
exports.clearSuspenseCache = xe
exports.createConfigHash = A
exports.createLoadingState = X
exports.createNextNavigator = Je
exports.createReactRouterNavigator = Ue
exports.createStepsHash = j
exports.createUrlMapper = Q
exports.getLoadingReason = Oe
exports.toUrlSlug = T
exports.useOnboarding = ne
exports.useOnboardingAnalytics = Ie
exports.useSuspenseEngine = Re
