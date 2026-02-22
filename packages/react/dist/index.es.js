'use client'
import { jsxs as N, jsx as m } from 'react/jsx-runtime'
import {
    useState as P,
    useRef as T,
    useMemo as I,
    useEffect as O,
    useCallback as C,
    createElement as Se,
    createContext as he,
    useContext as me,
    Component as Ee,
    Suspense as we,
} from 'react'
import {
    OnboardingEngine as te,
    ConfigurationBuilder as ne,
    AhaTracker as be,
    aha as X,
    BasePlugin as Ce,
} from '@onboardjs/core'
import { BasePlugin as at, PluginManagerImpl as ct } from '@onboardjs/core'
function Re(e) {
    const t = {
        id: e.id,
        type: e.type,
        // Hash the payload structure, but stringify functions to detect if they exist
        payload: e.payload ? JSON.stringify(e.payload, (n, r) => (typeof r == 'function' ? '[function]' : r)) : void 0,
        isSkippable: 'isSkippable' in e ? e.isSkippable : void 0,
        // Check if dynamic navigation exists (not the actual function)
        hasNextStep: e.nextStep !== void 0,
        hasPreviousStep: e.previousStep !== void 0,
        hasCondition: e.condition !== void 0,
        hasOnStepActive: e.onStepActive !== void 0,
        hasOnStepComplete: e.onStepComplete !== void 0,
        // Include meta if it affects rendering
        meta: e.meta ? JSON.stringify(e.meta) : void 0,
    }
    return JSON.stringify(t)
}
function W(e) {
    return !e || e.length === 0 ? 'empty' : e.map(Re).join('|')
}
function re(e) {
    const {
            steps: t,
            initialStepId: n,
            initialContext: r,
            debug: o,
            plugins: s,
            analytics: u,
            publicKey: i,
            apiHost: a,
            userId: c,
        } = e,
        d = {
            stepsHash: W(t),
            initialStepId: n ?? null,
            // Only hash serializable parts of initial context
            initialContextHash: r ? JSON.stringify(r, (g, l) => (typeof l == 'function' ? '[function]' : l)) : null,
            debug: o ?? !1,
            // Count plugins and their types, not their instances
            pluginCount: s?.length ?? 0,
            // Hash analytics config (before_send is a function, so we check for its presence)
            analyticsHash: u ? JSON.stringify(u, (g, l) => (typeof l == 'function' ? '[function]' : l)) : null,
            publicKey: i ?? null,
            apiHost: a ?? null,
            userId: c ?? null,
        }
    return JSON.stringify(d)
}
function qe(e, t) {
    return e.length !== t.length ? !1 : W(e) === W(t)
}
function ve(e) {
    const [t, n] = P(null),
        [r, o] = P(!1),
        [s, u] = P(null),
        i = T(e)
    i.current = e
    const a = I(
        () =>
            re({
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
        O(() => {
            let c = !0
            ;(o(!1), n(null), u(null))
            let d = null
            const g = i.current
            try {
                ;((d = new te(g)),
                    c && n(d),
                    d
                        .ready()
                        .then(() => {
                            c && d && (o(!0), u(null))
                        })
                        .catch((l) => {
                            ;(console.error('[OnboardJS] Engine initialization failed:', l),
                                c && (u(l instanceof Error ? l : new Error(String(l))), o(!1)))
                        }))
            } catch (l) {
                ;(console.error('[OnboardJS] Error creating engine:', l),
                    c && u(l instanceof Error ? l : new Error(String(l))))
            }
            return () => {
                c = !1
            }
        }, [a]),
        { engine: t, isReady: r, error: s }
    )
}
function xe(e, t) {
    const [n, r] = P(null)
    return (
        O(() => {
            if (!e || !t) {
                r(null)
                return
            }
            r(e.getState())
            const o = e.addEventListener('stateChange', (s) => {
                r(s.state)
            })
            return () => {
                o && o()
            }
        }, [e, t]),
        n
    )
}
const A = /* @__PURE__ */ new Map()
function Oe(e) {
    const {
            localStoragePersistence: t,
            customOnDataLoad: n,
            customOnDataPersist: r,
            customOnClearPersistedData: o,
            onPersistenceError: s,
        } = e,
        [u, i] = P(() => (n || r ? 'custom' : t ? 'localStorage' : 'none')),
        [a, c] = P(null),
        d = T(!1),
        g = C(() => {
            ;((d.current = !0), i('memory'), console.warn('[OnboardJS] Switched to memory-only persistence mode'))
        }, []),
        l = C(
            (f) => {
                ;(c(f), s && s(f))
            },
            [s]
        ),
        E = C(async () => {
            if (n)
                try {
                    return await n()
                } catch (p) {
                    const y = p instanceof Error ? p : new Error(String(p))
                    throw (console.error('[OnboardJS] Custom data load failed:', y), l(y), y)
                }
            if (d.current && t) {
                const { key: p } = t,
                    y = A.get(p)
                if (!y) return null
                try {
                    return JSON.parse(y).data
                } catch {
                    return null
                }
            }
            if (!t || typeof window > 'u') return null
            const { key: f, ttl: h } = t
            try {
                const p = window.localStorage.getItem(f)
                if (!p) return null
                const y = JSON.parse(p)
                return h && y.timestamp && Date.now() - y.timestamp > h
                    ? (window.localStorage.removeItem(f), null)
                    : y.data
            } catch (p) {
                const y = p instanceof Error ? p : new Error(String(p))
                ;(console.error(`[OnboardJS] Error loading from localStorage (key: "${f}"):`, y), l(y))
                try {
                    window.localStorage.removeItem(f)
                } catch {}
                return null
            }
        }, [t, n, l]),
        S = C(
            async (f, h) => {
                if (r) {
                    try {
                        await r(f, h)
                    } catch (w) {
                        const x = w instanceof Error ? w : new Error(String(w))
                        throw (console.error('[OnboardJS] Custom data persist failed:', x), l(x), x)
                    }
                    return
                }
                if (!t || typeof window > 'u') return
                const { key: p } = t,
                    y = {
                        flowData: f.flowData,
                        currentStepId: h,
                        // Persist other context properties (excluding non-serializable values)
                        ...Object.fromEntries(Object.entries(f).filter(([w]) => w !== 'flowData')),
                    },
                    R = {
                        timestamp: Date.now(),
                        data: y,
                    },
                    v = JSON.stringify(R)
                if (d.current) {
                    A.set(p, v)
                    return
                }
                try {
                    window.localStorage.setItem(p, v)
                } catch (w) {
                    if (w instanceof Error && w.name === 'QuotaExceededError')
                        (console.warn('[OnboardJS] localStorage quota exceeded. Switching to memory-only persistence.'),
                            l(w),
                            g(),
                            A.set(p, v))
                    else {
                        const x = w instanceof Error ? w : new Error(String(w))
                        ;(console.error(`[OnboardJS] Error persisting to localStorage (key: "${p}"):`, x), l(x))
                    }
                }
            },
            [t, r, l, g]
        ),
        b = C(async () => {
            if (o) {
                try {
                    await o()
                } catch (h) {
                    const p = h instanceof Error ? h : new Error(String(h))
                    ;(console.error('[OnboardJS] Custom clear persisted data failed:', p), l(p))
                }
                return
            }
            if (!t || typeof window > 'u') return
            const { key: f } = t
            if ((A.delete(f), !d.current))
                try {
                    window.localStorage.removeItem(f)
                } catch (h) {
                    const p = h instanceof Error ? h : new Error(String(h))
                    ;(console.error(`[OnboardJS] Error clearing localStorage (key: "${f}"):`, p), l(p))
                }
        }, [t, o, l])
    return {
        onDataLoad: E,
        onDataPersist: S,
        onClearPersistedData: b,
        persistenceMode: u,
        persistenceError: a,
        switchToMemoryMode: g,
    }
}
function Ie(e) {
    const { engine: t, isEngineReady: n, stepData: r, onEngineProcessingChange: o } = e,
        s = C(
            async (g) => {
                if (!t || !n) return
                const l = g !== void 0 ? g : r.data
                if (!r.isValid && g === void 0) {
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
        u = C(async () => {
            if (!(!t || !n)) {
                o(!0)
                try {
                    await t.previous()
                } finally {
                    o(!1)
                }
            }
        }, [t, n, o]),
        i = C(async () => {
            if (!(!t || !n)) {
                o(!0)
                try {
                    await t.skip()
                } finally {
                    o(!1)
                }
            }
        }, [t, n, o]),
        a = C(
            async (g, l) => {
                if (!(!t || !n)) {
                    o(!0)
                    try {
                        await t.goToStep(g, l)
                    } finally {
                        o(!1)
                    }
                }
            },
            [t, n, o]
        ),
        c = C(
            async (g) => {
                if (!(!t || !n)) {
                    o(!0)
                    try {
                        await t.updateContext(g)
                    } finally {
                        o(!1)
                    }
                }
            },
            [t, n, o]
        ),
        d = C(
            async (g) => {
                if (t) {
                    o(!0)
                    try {
                        await t.reset(g)
                    } finally {
                        o(!1)
                    }
                }
            },
            [t, o]
        )
    return {
        next: s,
        previous: u,
        skip: i,
        goToStep: a,
        updateContext: c,
        reset: d,
    }
}
function Ne(e, t) {
    const n = e.component
    if (n && M(n)) return n
    const r = t?.[e.id]
    if (r && M(r)) return r
    const o = e.type === 'CUSTOM_COMPONENT' ? e.payload?.componentKey : e.type
    if (o) {
        const s = t?.[String(o)]
        if (s && M(s)) return s
    }
    return null
}
function M(e) {
    return typeof e == 'function'
}
function Pe(e) {
    const { engineState: t, componentRegistry: n, onDataChange: r } = e
    return C(() => {
        if (!t?.currentStep) return null
        const { currentStep: s, context: u } = t,
            i = Ne(s, n)
        if (!i) {
            const g = s.type === 'CUSTOM_COMPONENT' ? s.payload?.componentKey : s.type,
                l = [s.id, String(g)]
            return /* @__PURE__ */ N('div', {
                style: { padding: '16px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '4px' },
                children: [
                    /* @__PURE__ */ N('strong', { children: ['❌ Component Not Found for Step: "', s.id, '"'] }),
                    /* @__PURE__ */ m('p', {
                        style: { marginTop: '8px', marginBottom: '0', fontSize: '14px' },
                        children:
                            'OnboardJS tried to resolve a component from the registry but none of the following keys matched:',
                    }),
                    /* @__PURE__ */ N('ul', {
                        style: { marginTop: '4px', paddingLeft: '20px', marginBottom: '0' },
                        children: [
                            l.map((E) => /* @__PURE__ */ N('li', { children: ['registry["', E, '"]'] }, E)),
                            /* @__PURE__ */ m('li', { children: 'step.component property' }),
                        ],
                    }),
                    /* @__PURE__ */ N('p', {
                        style: { marginTop: '8px', marginBottom: '0', fontSize: '13px' },
                        children: [
                            'Make sure the component is registered in the ',
                            /* @__PURE__ */ m('code', { children: 'componentRegistry' }),
                            " prop or defined directly in the step's ",
                            /* @__PURE__ */ m('code', { children: 'component' }),
                            ' property.',
                        ],
                    }),
                ],
            })
        }
        const a = s.payload?.dataKey,
            c = a ? u.flowData[String(a)] : void 0,
            d = {
                payload: s.payload,
                coreContext: u,
                // Deprecated but kept for backward compatibility
                context: u,
                onDataChange: r,
                initialData: c,
            }
        return Se(i, d)
    }, [t, n, r])
}
const D = /* @__PURE__ */ new Map()
function Ge(e) {
    e ? D.delete(e) : D.clear()
}
function Qe(e) {
    const t = T(null),
        n = I(
            () =>
                re({
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
    const r = D.get(n)
    if (r)
        switch (r.status) {
            case 'pending':
                throw r.promise
            case 'rejected':
                throw r.error
            case 'resolved':
                return (
                    (t.current = r.engine),
                    {
                        engine: r.engine,
                        isReady: !0,
                        error: null,
                    }
                )
        }
    const o = ne.validateConfig(e)
    if (!o.isValid) {
        const i = new Error(`Invalid Onboarding Configuration: ${o.errors.join(', ')}`)
        throw (D.set(n, { status: 'rejected', error: i }), i)
    }
    let s
    try {
        ;((s = new te(e)), (t.current = s))
    } catch (i) {
        const a = i instanceof Error ? i : new Error(String(i))
        throw (D.set(n, { status: 'rejected', error: a }), a)
    }
    const u = s
        .ready()
        .then(() => {
            D.set(n, { status: 'resolved', engine: s })
        })
        .catch((i) => {
            const a = i instanceof Error ? i : new Error(String(i))
            throw (D.set(n, { status: 'rejected', error: a }), a)
        })
    throw (D.set(n, { status: 'pending', promise: u }), u)
}
function L(e) {
    return String(e)
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase()
}
function ke(e, t) {
    const { basePath: n, urlMapping: r = 'auto' } = e
    let o = n
    for (; o.startsWith('/'); ) o = o.slice(1)
    for (; o.endsWith('/'); ) o = o.slice(0, -1)
    o = '/' + o
    const s = /* @__PURE__ */ new Map(),
        u = /* @__PURE__ */ new Map()
    for (const i of t) {
        const a = i.id
        let c
        ;(r === 'auto' ? (c = L(a)) : r[a] !== void 0 ? (c = r[a]) : (c = L(a)),
            s.set(a, c),
            typeof c == 'string' && u.set(c, a))
    }
    for (const i of t) {
        const a = L(i.id)
        u.has(a) || u.set(a, i.id)
    }
    return {
        stepIdToUrl(i, a) {
            const c = s.get(i)
            let d
            c === void 0 ? (d = L(i)) : typeof c == 'function' ? (d = c(a)) : (d = c)
            const g = o.endsWith('/') ? '' : '/'
            return `${o}${g}${d}`
        },
        urlToStepId(i) {
            if (!i.startsWith(o)) return null
            const c = i.slice(o.length).replace(/^\//, '').split(/[?#]/)[0]
            if (!c) return null
            const d = u.get(c)
            return d !== void 0 ? d : null
        },
        isOnboardingUrl(i) {
            return i.startsWith(o)
        },
        getCompletionUrl() {
            return null
        },
    }
}
function De(e, t, n, r) {
    if (e === t || n.has(e)) return !0
    const o = r.findIndex((u) => u.id === e),
        s = r.findIndex((u) => u.id === t)
    return !(o === -1 || s === -1 || o > s)
}
function Te(e) {
    const { navigatorConfig: t, engine: n, isEngineReady: r, steps: o } = e,
        s = T(!1),
        u = T(null),
        i = T(!1),
        a = I(() => (t ? ke(t, o) : null), [t, o]),
        c = t?.navigator,
        d = t?.syncUrl !== !1,
        g = C(() => {
            if (!c || !n || !a || !d || s.current) return
            const E = n.getState(),
                S = E.currentStep?.id
            if (!(S === void 0 || S === u.current)) {
                s.current = !0
                try {
                    const b = a.stepIdToUrl(S, E.context)
                    ;(c.getCurrentPath() !== b && c.navigate(b, { replace: !1 }), (u.current = S))
                } finally {
                    s.current = !1
                }
            }
        }, [c, n, a, d]),
        l = C(
            async (E) => {
                if (!n || !a || s.current) return
                const S = a.urlToStepId(E)
                if (S === null) return
                const b = n.getState(),
                    f = b.currentStep?.id
                if (S === f) return
                const h = b.context.flowData?._internal?.completedSteps || {},
                    p = /* @__PURE__ */ new Set()
                for (const R of Object.keys(h)) {
                    p.add(R)
                    const v = Number(R)
                    Number.isNaN(v) || p.add(v)
                }
                if (!De(S, f ?? null, p, o)) {
                    if (f !== void 0 && c) {
                        const R = a.stepIdToUrl(f, b.context)
                        c.navigate(R, { replace: !0 })
                    }
                    return
                }
                s.current = !0
                try {
                    ;(await n.goToStep(String(S)), (u.current = S))
                } finally {
                    s.current = !1
                }
            },
            [n, a, o, c]
        )
    return (
        O(() => {
            if (!r || !n || !c || !a || i.current) return
            i.current = !0
            const E = c.getCurrentPath()
            a.isOnboardingUrl(E) ? l(E) : d && g()
        }, [r, n, c, a, l, g, d]),
        O(
            () =>
                !n || !r || !d
                    ? void 0
                    : n.addEventListener('stateChange', (S) => {
                          !s.current && S.state.currentStep?.id !== u.current && g()
                      }),
            [n, r, d, g]
        ),
        O(
            () =>
                !c?.onRouteChange || !r
                    ? void 0
                    : c.onRouteChange((S) => {
                          l(S)
                      }),
            [c, r, l]
        ),
        O(() => {
            ;((i.current = !1), (u.current = null))
        }, [n]),
        {
            syncUrlToStep: g,
            urlMapper: a,
        }
    )
}
function Ye(e) {
    return e.isHydrating
        ? 'hydrating'
        : e.isEngineProcessing
          ? 'engine-processing'
          : e.isComponentProcessing
            ? 'component-processing'
            : null
}
function Fe(e, t, n) {
    return {
        isHydrating: e,
        isEngineProcessing: t,
        isComponentProcessing: n,
        isAnyLoading: e || t || n,
    }
}
function _e() {
    return he(void 0)
}
const oe = _e()
function Ae({
    children: e,
    steps: t,
    initialStepId: n,
    initialContext: r,
    onFlowComplete: o,
    onStepChange: s,
    localStoragePersistence: u,
    customOnDataLoad: i,
    customOnDataPersist: a,
    customOnClearPersistedData: c,
    plugins: d,
    componentRegistry: g,
    debug: l,
    navigator: E,
    // Forwarded engine config fields (not previously passed through)
    flowId: S,
    flowName: b,
    flowVersion: f,
    flowMetadata: h,
    publicKey: p,
    apiHost: y,
    cloudOptions: R,
    analytics: v,
    userId: w,
}) {
    const x = I(
        () =>
            ne.validateConfig({
                steps: t,
                initialStepId: n,
                initialContext: r,
                plugins: d,
                debug: l,
            }),
        [t, n, r, d, l]
    )
    if (!x.isValid)
        throw new Error(`[OnboardJS] Invalid Onboarding Configuration:
${x.errors.join(`
`)}`)
    x.warnings.length > 0 && l && console.warn('[OnboardJS] Configuration warnings:', x.warnings)
    const [se, ie] = P(!1),
        [ae, ce] = P({ data: null, isValid: !0 }),
        {
            onDataLoad: U,
            onDataPersist: H,
            onClearPersistedData: B,
        } = Oe({
            localStoragePersistence: u,
            customOnDataLoad: i,
            customOnDataPersist: a,
            customOnClearPersistedData: c,
        }),
        z = I(
            () => ({
                steps: t,
                initialStepId: n,
                initialContext: r,
                debug: l,
                plugins: d || [],
            }),
            [t, n, r, l, d]
        ),
        K = I(
            () => ({
                onFlowComplete: o,
                onStepChange: s,
                loadData: U,
                persistData: H,
                clearPersistedData: B,
            }),
            [o, s, U, H, B]
        ),
        j = I(
            () => ({
                flowId: S,
                flowName: b,
                flowVersion: f,
                flowMetadata: h,
                publicKey: p,
                apiHost: y,
                cloudOptions: R,
                analytics: v,
                userId: w,
            }),
            [S, b, f, h, p, y, R, v, w]
        ),
        le = I(
            () => ({
                ...z,
                ...K,
                ...j,
            }),
            [z, K, j]
        ),
        { engine: _, isReady: F, error: $ } = ve(le),
        k = xe(_, F),
        [ue, de] = P(!1)
    Te({
        navigatorConfig: E,
        engine: _,
        isEngineReady: F,
        steps: t,
    })
    const pe = C((fe, ye) => {
            ce({ data: fe, isValid: ye })
        }, []),
        V = Pe({
            engineState: k,
            componentRegistry: g,
            onDataChange: pe,
        }),
        Z = Ie({
            engine: _,
            isEngineReady: F,
            stepData: ae,
            onEngineProcessingChange: de,
        }),
        q = k?.isHydrating ?? !1,
        G = ue || (k?.isLoading ?? !1),
        Q = se,
        J = I(() => Fe(q, G, Q), [q, G, Q]),
        Y = J.isAnyLoading,
        ge = I(
            () => ({
                engine: F ? _ : null,
                engineInstanceId: F ? _?.instanceId : void 0,
                state: F ? k : null,
                loading: J,
                isLoading: Y,
                setComponentLoading: ie,
                currentStep: k?.currentStep ?? null,
                isCompleted: k?.isCompleted,
                error: $ ?? k?.error ?? null,
                renderStep: V,
                ...Z,
            }),
            [_, k, J, Y, F, $, Z, V]
        )
    return /* @__PURE__ */ m(oe.Provider, { value: ge, children: e })
}
function Le(e) {
    const t = me(oe)
    if (t === void 0) throw new Error('useOnboarding must be used within an OnboardingProvider')
    const {
            engine: n,
            state: r,
            loading: o,
            isLoading: s,
            skip: u,
            next: i,
            previous: a,
            goToStep: c,
            reset: d,
            setComponentLoading: g,
            updateContext: l,
            error: E,
            renderStep: S,
        } = t,
        b = T(e?.onFlowCompleted),
        f = T(e?.onStepChange)
    ;(O(() => {
        b.current = e?.onFlowCompleted
    }, [e?.onFlowCompleted]),
        O(() => {
            f.current = e?.onStepChange
        }, [e?.onStepChange]),
        O(() => {
            if (!n || !b.current) return
            const y = (v) => {
                    b.current && b.current(v)
                },
                R = n.addFlowCompletedListener(y)
            return () => {
                R && R()
            }
        }, [n]),
        O(() => {
            if (!n || !f.current) return
            const y = n.addAfterStepChangeListener(({ oldStep: R, newStep: v, context: w }) => {
                f.current && f.current(v, R, w)
            })
            return () => {
                y && y()
            }
        }, [n]))
    const h = r?.isCompleted ?? !1,
        p = r?.currentStep
    return {
        engine: n,
        state: r,
        loading: o,
        isLoading: s,
        skip: u,
        next: i,
        previous: a,
        goToStep: c,
        reset: d,
        setComponentLoading: g,
        updateContext: l,
        renderStep: S,
        isCompleted: h,
        currentStep: p,
        error: E,
    }
}
function Xe() {
    const { engine: e } = Le()
    return (
        O(() => {
            if (!e) return
            const n = be.getInstance({
                    debug: !0,
                }),
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
        {
            trackAha: C(async (n) => X(n), []),
            aha: X,
        }
    )
}
class et extends Ce {
    getHooks() {
        return {
            ...super.getHooks(),
            ...this.getReactHooks(),
        }
    }
    /**
     * Override to provide React-specific hooks
     */
    getReactHooks() {
        return {}
    }
    /**
     * Helper method to check if we're in a React environment
     */
    isReactEnvironment() {
        return typeof window < 'u' && typeof document < 'u'
    }
}
function Je(e) {
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
function Me(e) {
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
function ee(e) {
    const t = Je(e)
    return {
        type: t,
        originalError: e,
        message: e.message,
        recoverable: Me(t),
    }
}
function We({ error: e, resetError: t, continueWithoutPersistence: n }) {
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
    return /* @__PURE__ */ N('div', {
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
            /* @__PURE__ */ m('h2', {
                style: {
                    margin: '0 0 8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#991B1B',
                },
                children: r(),
            }),
            /* @__PURE__ */ m('p', {
                style: {
                    margin: '0 0 16px',
                    fontSize: '14px',
                    color: '#7F1D1D',
                },
                children: o(),
            }),
            process.env.NODE_ENV === 'development' &&
                /* @__PURE__ */ N('details', {
                    style: {
                        marginBottom: '16px',
                        fontSize: '12px',
                        color: '#7F1D1D',
                    },
                    children: [
                        /* @__PURE__ */ m('summary', {
                            style: { cursor: 'pointer', marginBottom: '8px' },
                            children: 'Error Details',
                        }),
                        /* @__PURE__ */ m('pre', {
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
            /* @__PURE__ */ N('div', {
                style: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
                children: [
                    /* @__PURE__ */ m('button', {
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
                        /* @__PURE__ */ m('button', {
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
class Ue extends Ee {
    constructor(t) {
        ;(super(t), (this.state = { hasError: !1, error: null }))
    }
    static getDerivedStateFromError(t) {
        return { hasError: !0, error: ee(t) }
    }
    componentDidCatch(t, n) {
        const r = ee(t)
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
            return typeof t == 'function' ? t(n) : t || /* @__PURE__ */ m(We, { ...n })
        }
        return this.props.children
    }
}
function He(e, t) {
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
function Be(e, t) {
    const n = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '500',
    }
    if (t)
        return {
            ...n,
            backgroundColor: '#FEF2F2',
            color: '#991B1B',
            border: '1px solid #FCA5A5',
        }
    switch (e) {
        case 'localStorage':
        case 'custom':
            return {
                ...n,
                backgroundColor: '#F0FDF4',
                color: '#166534',
                border: '1px solid #86EFAC',
            }
        case 'memory':
            return {
                ...n,
                backgroundColor: '#FFFBEB',
                color: '#92400E',
                border: '1px solid #FCD34D',
            }
        case 'none':
            return {
                ...n,
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                border: '1px solid #D1D5DB',
            }
    }
}
function ze(e, t) {
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
function tt({ mode: e, hasError: t = !1, children: n, visible: r = !0, className: o }) {
    if (!r) return null
    const s = He(e, t)
    if (n) return n({ mode: e, hasError: t, statusText: s })
    const u = Be(e, t),
        i = ze(e, t)
    return /* @__PURE__ */ N('div', {
        className: o,
        style: u,
        role: 'status',
        'aria-live': 'polite',
        children: [
            /* @__PURE__ */ m('span', { 'aria-hidden': 'true', children: i }),
            /* @__PURE__ */ m('span', { children: s }),
        ],
    })
}
const Ke = ({ message: e = 'Initializing...' }) =>
    /* @__PURE__ */ m('div', {
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
function nt({
    children: e,
    suspense: t = !1,
    suspenseFallback: n = /* @__PURE__ */ m(Ke, {}),
    errorBoundary: r = !0,
    errorBoundaryProps: o,
    onError: s,
    ...u
}) {
    const i = /* @__PURE__ */ m(Ae, { ...u, children: e }),
        a = r
            ? /* @__PURE__ */ m(Ue, {
                  ...o,
                  onError: s
                      ? (c) => {
                            const d = new Error(c.message)
                            s(d, { componentStack: '' })
                        }
                      : void 0,
                  children: i,
              })
            : i
    return t ? /* @__PURE__ */ m(we, { fallback: n, children: a }) : a
}
function rt(e, t) {
    return {
        navigate(n, r) {
            const o = r?.scroll !== !1
            r?.replace ? e.replace(n, { scroll: o }) : e.push(n, { scroll: o })
        },
        getCurrentPath() {
            return t
        },
        // Note: onRouteChange is not directly available in Next.js App Router.
        // The pathname from usePathname() updates reactively, so the hook
        // will naturally re-run when the pathname changes.
        // If needed, you can use a custom implementation with window.addEventListener('popstate')
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
function ot(e, t) {
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
        // React Router doesn't have built-in prefetch
        // This could be implemented with route loaders if needed
    }
}
export {
    at as BasePlugin,
    nt as OnboardingContainer,
    Ue as OnboardingErrorBoundary,
    Ae as OnboardingProvider,
    tt as PersistenceStatus,
    ct as PluginManagerImpl,
    et as ReactPlugin,
    qe as areStepsEqual,
    De as canAccessStep,
    Ge as clearSuspenseCache,
    re as createConfigHash,
    Fe as createLoadingState,
    rt as createNextNavigator,
    ot as createReactRouterNavigator,
    W as createStepsHash,
    ke as createUrlMapper,
    Ye as getLoadingReason,
    L as toUrlSlug,
    Le as useOnboarding,
    Xe as useOnboardingAnalytics,
    Qe as useSuspenseEngine,
}
