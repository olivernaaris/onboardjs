'use strict'
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
function E(l, e) {
    return typeof l == 'function' ? l(e) : l
}
function y(l, e) {
    if (e != null) return l.find((t) => t.id === e)
}
function ce(l, e) {
    return e == null ? -1 : l.findIndex((t) => t.id === e)
}
const S = class S {
    constructor(e) {
        ;((this._debugEnabled = e?.debugMode ?? !1),
            (this._logPrefix = typeof e?.prefix == 'string' ? `${e.prefix}` : ''),
            this._logPrefix && (this._logPrefix = `${this._logPrefix} `))
    }
    static getInstance(e) {
        if (!e) return (S._instance || (S._instance = new S()), S._instance)
        const t = `${e.debugMode ?? !1}:${e.prefix ?? ''}`
        if (S._instanceCache.has(t)) return S._instanceCache.get(t)
        const i = new S(e)
        return (S._instanceCache.set(t, i), i)
    }
    static clearCache() {
        ;((S._instance = null), S._instanceCache.clear())
    }
    debug(...e) {
        this._debugEnabled && console.log(`${this._logPrefix}[DEBUG]`, ...e)
    }
    info(...e) {
        console.info(`${this._logPrefix}[INFO]`, ...e)
    }
    warn(...e) {
        console.warn(`${this._logPrefix}[WARN]`, ...e)
    }
    error(...e) {
        console.error(`${this._logPrefix}[ERROR]`, ...e)
    }
}
;((S._instance = null), (S._instanceCache = new Map()))
let f = S
class V {
    constructor(e, t, i, n, s) {
        ;((this._eventManager = e),
            (this._steps = t),
            (this._initialStepId = i),
            (this._flowContext = n),
            (this._isLoading = !1),
            (this._isHydrating = !0),
            (this._error = null),
            (this._isCompleted = !1),
            (this._logger = f.getInstance({ debugMode: s ?? !1, prefix: 'CoreEngineService' })))
    }
    get isLoading() {
        return this._isLoading
    }
    get isHydrating() {
        return this._isHydrating
    }
    get error() {
        return this._error
    }
    get isCompleted() {
        return this._isCompleted
    }
    get hasError() {
        return this._error !== null
    }
    getState(e, t, i) {
        let n = null,
            s = null
        e && ((n = this._findNextStep(e, t)), (s = this._findPreviousStep(e, t, i)))
        const r = !!e && e.id === this._initialStepId,
            a = new Set(Object.keys(t.flowData?._internal?.completedSteps || {})),
            o = this._steps.filter((_) => !_.condition || _.condition(t)),
            c = o.length,
            d = o.filter((_) => a.has(String(_.id))).length,
            h = c > 0 ? Math.round((d / c) * 100) : 0,
            p = e ? o.findIndex((_) => _.id === e.id) : -1,
            u = p !== -1 ? p + 1 : 0
        return {
            flowId: this._flowContext.flowId,
            flowName: this._flowContext.flowName,
            flowVersion: this._flowContext.flowVersion,
            flowMetadata: this._flowContext.flowMetadata,
            instanceId: this._flowContext.instanceId,
            currentStep: e,
            context: t,
            isFirstStep: r,
            isLastStep: e ? !n : this._isCompleted,
            canGoPrevious: !r && !!e && !!s && !this._error,
            canGoNext: !!(e && n && !this._error),
            isSkippable: !!(e && e.isSkippable && !this._error),
            isLoading: this._isLoading,
            isHydrating: this._isHydrating,
            error: this._error,
            isCompleted: this._isCompleted,
            previousStepCandidate: s,
            nextStepCandidate: n,
            totalSteps: c,
            completedSteps: d,
            progressPercentage: h,
            currentStepNumber: u,
        }
    }
    setState(e, t, i, n, s) {
        const r = this.getState(t, i, n),
            a = { ...i },
            o = e(r)
        let c = !1,
            d = !1
        ;(o.isLoading !== void 0 && o.isLoading !== this._isLoading && ((this._isLoading = o.isLoading), (d = !0)),
            o.isHydrating !== void 0 &&
                o.isHydrating !== this._isHydrating &&
                ((this._isHydrating = o.isHydrating), (d = !0)),
            o.error !== void 0 && o.error !== this._error && ((this._error = o.error), (d = !0)),
            o.isCompleted !== void 0 &&
                o.isCompleted !== this._isCompleted &&
                ((this._isCompleted = o.isCompleted), (d = !0)),
            o.context &&
                JSON.stringify(i) !== JSON.stringify(o.context) &&
                (Object.assign(i, o.context), (c = !0), (d = !0)),
            d && this._notifyStateChangeListeners(t, i, n),
            c && !this._isHydrating && s && s(a, i))
    }
    notifyStateChange(e, t, i) {
        this._notifyStateChangeListeners(e, t, i)
    }
    setLoading(e) {
        this._isLoading = e
    }
    setHydrating(e) {
        this._isHydrating = e
    }
    setError(e) {
        ;((this._error = e), e && this._logger.error('Error set:', e))
    }
    setCompleted(e) {
        this._isCompleted = e
    }
    getRelevantSteps(e) {
        return this._steps.filter((t) => !t.condition || t.condition(e))
    }
    getStepById(e) {
        return y(this._steps, e)
    }
    getCompletedSteps(e) {
        const t = new Set(Object.keys(e.flowData?._internal?.completedSteps || {}))
        return this._steps.filter((i) => t.has(String(i.id)))
    }
    _notifyStateChangeListeners(e, t, i) {
        const n = this.getState(e, t, i)
        this._eventManager.notifyListeners('stateChange', { state: n })
    }
    _findNextStep(e, t) {
        const i = E(e.nextStep, t)
        if (i) return y(this._steps, i) || null
        if (i === null) return null
        if (i === void 0) {
            const n = this._steps.findIndex((s) => s.id === e.id)
            if (n === -1 || n >= this._steps.length - 1) return null
            for (let s = n + 1; s < this._steps.length; s++) {
                const r = this._steps[s]
                if (!r.condition || r.condition(t)) return r
            }
            return null
        }
        return null
    }
    _findPreviousStep(e, t, i) {
        let n = E(e.previousStep, t)
        if (n === void 0)
            if (i.length > 0) n = i[i.length - 1]
            else {
                const r = this._steps.findIndex((a) => a.id === e.id)
                r > 0 && (n = this._steps[r - 1].id)
            }
        if (!n) return null
        let s = y(this._steps, n)
        for (; s; ) {
            if (!s.condition || s.condition(t)) return s
            const r = E(s.previousStep, t)
            if (!r) return null
            s = y(this._steps, r)
        }
        return null
    }
}
class de {
    constructor(e, t, i, n, s, r) {
        ;((this._errorHandler = n),
            (this._eventManager = s),
            (this._loadData = e),
            (this._persistData = t),
            (this._clearPersistedData = i),
            (this._logger = f.getInstance({ debugMode: r ?? !1, prefix: 'PersistenceService' })))
    }
    async loadPersistedData() {
        if (!this._loadData) return { data: null, error: null }
        try {
            this._logger.debug('Attempting to load persisted data...')
            const e = await this._loadData()
            return (
                this._logger.debug('Data loaded successfully:', {
                    hasFlowData: !!e?.flowData,
                    currentStepId: e?.currentStepId,
                    otherKeys: e ? Object.keys(e).filter((t) => t !== 'flowData' && t !== 'currentStepId') : [],
                }),
                { data: e ?? null, error: null }
            )
        } catch (e) {
            this._logger.error('Error during loadData:', e)
            const t = e instanceof Error ? e : new Error(String(e))
            return { data: null, error: new Error(`Failed to load onboarding state: ${t.message}`) }
        }
    }
    async persistDataIfNeeded(e, t, i) {
        if (i || !this._persistData) return
        const n = Date.now()
        try {
            ;(this._logger.debug('Persisting data for step:', t), await this._persistData(e, t))
            const s = Date.now() - n
            ;(this._eventManager?.notifyListeners('persistenceSuccess', { context: e, persistenceTime: s }),
                this._logger.debug('Data persisted successfully'))
        } catch (s) {
            ;(this._eventManager?.notifyListeners('persistenceFailure', { context: e, error: s }),
                this._logger.error('Error during persistData:', s),
                this._errorHandler && this._errorHandler.handleError(s, 'persistData', e))
        }
    }
    async clearData() {
        if (!this._clearPersistedData) {
            this._logger.debug('No clearPersistedData handler configured')
            return
        }
        try {
            ;(this._logger.debug('Clearing persisted data...'),
                await this._clearPersistedData(),
                this._logger.debug('Persisted data cleared successfully'))
        } catch (e) {
            throw (this._logger.error('Error during clearPersistedData:', e), e)
        }
    }
    setDataLoadHandler(e) {
        this._loadData = e
    }
    setDataPersistHandler(e) {
        this._persistData = e
    }
    setClearPersistedDataHandler(e) {
        this._clearPersistedData = e
    }
    getDataLoadHandler() {
        return this._loadData
    }
    getDataPersistHandler() {
        return this._persistData
    }
    getClearPersistedDataHandler() {
        return this._clearPersistedData
    }
}
class he {
    constructor(e, t) {
        ;((this._steps = e), (this._logger = t ?? f.getInstance({ prefix: 'StepTransitionService' })))
    }
    findNextStepCandidate(e, t) {
        const i = E(e.nextStep, t)
        if (i !== void 0) return i === null ? null : y(this._steps, i) || void 0
        const n = this._steps.findIndex((s) => s.id === e.id)
        if (n !== -1)
            for (let s = n + 1; s < this._steps.length; s++) {
                const r = this._steps[s]
                if (!r.condition || r.condition(t)) return r
            }
    }
    findPreviousStepCandidate(e, t, i) {
        let n = E(e.previousStep, t)
        if (n !== void 0) return y(this._steps, n) || void 0
        if (i.length > 0) return ((n = i[i.length - 1]), y(this._steps, n) || void 0)
        const s = this._steps.findIndex((r) => r.id === e.id)
        if (s > 0)
            for (let r = s - 1; r >= 0; r--) {
                const a = this._steps[r]
                if (!a.condition || a.condition(t)) return a
            }
    }
    calculateSkipTarget(e, t) {
        let i = E(e.skipToStep, t)
        if ((i === void 0 && (i = E(e.nextStep, t)), i !== void 0)) return i
        const n = this._steps.findIndex((s) => s.id === e.id)
        if (n !== -1 && n < this._steps.length - 1)
            for (let s = n + 1; s < this._steps.length; s++) {
                const r = this._steps[s]
                if (!r.condition || r.condition(t))
                    return (
                        this._logger.debug(
                            `[StepTransitionService] calculateSkipTarget(): No explicit skip/next target. Using next valid step: '${r.id}'`
                        ),
                        r.id
                    )
            }
        return null
    }
    skipConditionalSteps(e, t, i = 'next') {
        let n = e
        for (; n && n.condition && !n.condition(t); )
            (this._logger.debug(`[StepTransitionService] Skipping conditional step: ${n.id}`),
                i === 'previous'
                    ? (n = this.findPreviousStepCandidate(n, t, []))
                    : (n = this.findNextStepCandidate(n, t)))
        return n
    }
}
class ue {
    constructor(e, t, i, n) {
        ;((this._eventManager = e),
            (this._stateManager = t),
            (this._errorHandler = i),
            (this._logger = n ?? f.getInstance({ prefix: 'BeforeNavigationHandler' })))
    }
    async handle(e, t, i, n) {
        if (!this._eventManager.hasListeners('beforeStepChange')) return { isCancelled: !1, finalTargetStepId: e }
        let s = !1,
            r = e
        const a = {
            currentStep: i,
            targetStepId: e,
            direction: t,
            cancel: () => {
                ;((s = !0), this._logger.debug('[BeforeNavigationHandler] Navigation cancelled by listener.'))
            },
            redirect: (o) => {
                s || ((r = o), this._logger.debug(`[BeforeNavigationHandler] Navigation redirected to ${o}`))
            },
        }
        try {
            await this._eventManager.notifyListenersSequential('beforeStepChange', a)
        } catch (o) {
            return (
                this._errorHandler.handleError(o, 'beforeStepChange listener', n),
                this._stateManager.setLoading(!1),
                { isCancelled: !0, finalTargetStepId: e }
            )
        }
        return { isCancelled: s, finalTargetStepId: r }
    }
}
class ge {
    constructor(e, t, i) {
        ;((this._eventManager = e),
            (this._errorHandler = t),
            (this._logger = i ?? f.getInstance({ prefix: 'ChecklistNavigationService' })))
    }
    getChecklistState(e, t) {
        return this._getChecklistItemsState(e, t)
    }
    isChecklistComplete(e, t) {
        return this._isChecklistStepComplete(e, t)
    }
    async updateChecklistItem(e, t, i, n, s) {
        await this._updateChecklistItem(e, t, i, n, s)
    }
    getChecklistProgress(e, t) {
        const i = this._getChecklistItemsState(e, t),
            { items: n } = e.payload
        let s = 0,
            r = 0
        for (const c of n) {
            if (c.condition && !c.condition(t)) continue
            ;(s++, i.find((h) => h.id === c.id)?.isCompleted && r++)
        }
        const a = s > 0 ? (r / s) * 100 : 0,
            o = this._isChecklistStepComplete(e, t)
        return { completed: r, total: s, percentage: Math.round(a), isComplete: o }
    }
    initializeChecklistItems(e, t) {
        this._getChecklistItemsState(e, t)
    }
    _getChecklistItemsState(e, t) {
        const { dataKey: i, items: n } = e.payload
        let s = t.flowData[i]
        return (
            (!s || s.length !== n.length) &&
                ((s = n.map((r) => ({ id: r.id, isCompleted: !1 }))), (t.flowData = { ...t.flowData, [i]: [...s] })),
            s
        )
    }
    _isChecklistStepComplete(e, t) {
        const i = this._getChecklistItemsState(e, t),
            { items: n, minItemsToComplete: s } = e.payload
        let r = 0,
            a = 0
        for (const o of n) {
            if (o.condition && !o.condition(t)) continue
            const c = i.find((h) => h.id === o.id),
                d = o.isMandatory !== !1
            c?.isCompleted ? r++ : d && a++
        }
        return typeof s == 'number' ? r >= s : a === 0
    }
    async _updateChecklistItem(e, t, i, n, s) {
        const r = i.payload,
            { dataKey: a } = r
        let o = n.flowData[a] || []
        const c = o.findIndex((u) => u.id === e)
        if (!r.items.some((u) => u.id === e)) {
            this._logger.warn(
                `[ChecklistNavigationService] Attempted to update non-existent checklist item '${e}' for step '${i.id}'.`
            )
            return
        }
        this._eventManager.notifyListeners('checklistItemToggled', { itemId: e, isCompleted: t, step: i, context: n })
        const h = this.getChecklistProgress(i, n)
        if (
            (this._eventManager.notifyListeners('checklistProgressChanged', { step: i, context: n, progress: h }),
            c !== -1)
        ) {
            const u = [...o]
            ;((u[c] = { ...u[c], isCompleted: t }), (o = u))
        } else o = [...o, { id: e, isCompleted: t }]
        const p = JSON.stringify(n.flowData)
        if (((n.flowData = { ...n.flowData, [a]: o }), JSON.stringify(n.flowData) !== p && s))
            try {
                await s()
            } catch (u) {
                this._errorHandler.handleError(u, 'updateChecklistItem persistence', n)
            }
    }
}
class pe {
    constructor(e, t, i, n, s, r) {
        ;((this._steps = e),
            (this._eventManager = t),
            (this._stateManager = i),
            (this._persistenceService = n),
            (this._errorHandler = s),
            (this._logger = r ?? f.getInstance({ prefix: 'NavigationOrchestrator' })),
            (this._stepTransitionService = new he(this._steps, this._logger)),
            (this._beforeNavigationHandler = new ue(
                this._eventManager,
                this._stateManager,
                this._errorHandler,
                this._logger
            )),
            (this._checklistService = new ge(this._eventManager, this._errorHandler, this._logger)))
    }
    async navigateToStep(e, t = 'goto', i, n, s, r, a) {
        ;(this._stateManager.setLoading(!0), this._stateManager.setError(null))
        const { isCancelled: o, finalTargetStepId: c } = await this._beforeNavigationHandler.handle(e, t, i, n)
        if (o)
            return (
                this._logger.debug('[NavigationOrchestrator] Navigation cancelled.'),
                this._stateManager.setLoading(!1),
                i
            )
        let d = y(this._steps, c)
        d = this._stepTransitionService.skipConditionalSteps(d, n, t === 'previous' ? 'previous' : 'next')
        const h = i,
            p = d ?? null
        if (
            (this._emitNavigationEvents(t, i, p, n),
            p ? await this._handleStepActivation(p, h, t, n, s) : await this._handleFlowComplete(h, t, n, a),
            r)
        )
            try {
                r(p, h, n)
            } catch (u) {
                this._errorHandler.handleError(u, 'onStepChangeCallback', n)
            }
        return (
            this._eventManager.notifyListeners('stepChange', { oldStep: h, newStep: p, context: n }),
            this._stateManager.setLoading(!1),
            p
        )
    }
    calculateNextStep(e, t) {
        return this._stepTransitionService.findNextStepCandidate(e, t) ?? null
    }
    calculatePreviousStep(e, t, i) {
        return this._stepTransitionService.findPreviousStepCandidate(e, t, i) ?? null
    }
    getChecklistState(e, t) {
        return e.type !== 'CHECKLIST' ? [] : this._checklistService.getChecklistState(e, t)
    }
    isChecklistComplete(e, t) {
        return e.type !== 'CHECKLIST' ? !0 : this._checklistService.isChecklistComplete(e, t)
    }
    async updateChecklistItem(e, t, i, n, s) {
        if (i.type !== 'CHECKLIST') {
            this._logger.warn(`[NavigationOrchestrator] Cannot update checklist item on non-CHECKLIST step: ${i.id}`)
            return
        }
        await this._checklistService.updateChecklistItem(e, t, i, n, s)
    }
    getStepTransitionService() {
        return this._stepTransitionService
    }
    getChecklistService() {
        return this._checklistService
    }
    _emitNavigationEvents(e, t, i, n) {
        if (t && i && t.id !== i.id)
            switch (e) {
                case 'previous':
                    this._eventManager.notifyListeners('navigationBack', { fromStep: t, toStep: i, context: n })
                    break
                case 'next':
                    this._eventManager.notifyListeners('navigationForward', { fromStep: t, toStep: i, context: n })
                    break
                case 'goto':
                    this._eventManager.notifyListeners('navigationJump', { fromStep: t, toStep: i, context: n })
                    break
            }
    }
    async _handleStepActivation(e, t, i, n, s) {
        const r = Date.now()
        ;((n.flowData._internal.stepStartTimes[String(e.id)] = r),
            this._logger.debug(`[NavigationOrchestrator] Recorded step start time for '${e.id}': ${r}`),
            e.type === 'CHECKLIST' && this._checklistService.initializeChecklistItems(e, n),
            i !== 'previous' && t && t.id !== e.id && s[s.length - 1] !== String(t.id) && s.push(String(t.id)))
        try {
            ;(e.onStepActive && (await e.onStepActive(n)),
                this._eventManager.notifyListeners('stepActive', { step: e, context: n, startTime: r }))
        } catch (a) {
            this._errorHandler.handleError(a, `onStepActive for ${e.id}`, n)
        }
    }
    async _handleFlowComplete(e, t, i, n) {
        this._stateManager.setCompleted(!0)
        const s = i,
            r = s.flowData._internal?.startedAt,
            a = r && r > 0 ? Date.now() - r : 0
        if (n && t !== 'initial' && (!e || !E(e.nextStep, s)))
            try {
                await n(s)
            } catch (o) {
                const c = o instanceof Error ? o : new Error(String(o))
                ;(this._stateManager.setError(c), this._errorHandler.handleError(o, 'onFlowComplete', i))
            }
        ;(this._eventManager.notifyListeners('flowCompleted', { context: s, duration: Math.round(a) }),
            await this._persistenceService.persistDataIfNeeded(i, null, this._stateManager.isHydrating))
    }
}
class K {
    constructor(e, t, i, n, s, r) {
        ;((this._steps = e),
            (this._eventManager = t),
            (this._stateManager = i),
            (this._persistenceService = n),
            (this._errorHandler = s),
            (this._logger = r ?? f.getInstance({ prefix: 'NavigationService' })),
            (this._orchestrator = new pe(
                this._steps,
                this._eventManager,
                this._stateManager,
                this._persistenceService,
                this._errorHandler,
                this._logger
            )),
            (this._checklistService = this._orchestrator.getChecklistService()))
    }
    async navigateToStep(e, t = 'goto', i, n, s, r, a) {
        return this._orchestrator.navigateToStep(e, t, i, n, s, r, a)
    }
    calculateNextStep(e, t) {
        return this._orchestrator.calculateNextStep(e, t)
    }
    calculatePreviousStep(e, t, i) {
        return this._orchestrator.calculatePreviousStep(e, t, i)
    }
    getChecklistState(e, t) {
        return this._orchestrator.getChecklistState(e, t)
    }
    isChecklistComplete(e, t) {
        return this._orchestrator.isChecklistComplete(e, t)
    }
    async updateChecklistItem(e, t, i, n, s) {
        return this._orchestrator.updateChecklistItem(e, t, i, n, s)
    }
    async next(e, t, i, n, s, r) {
        if (!e || this._stateManager.isLoading) return e
        if (e.type === 'CHECKLIST') {
            if (!this._checklistService.isChecklistComplete(e, i)) {
                const o = new Error('Checklist criteria not met.')
                return (
                    this._logger.warn(
                        `[NavigationService] Cannot proceed from checklist step '${e.id}': Not all completion criteria met.`
                    ),
                    this._stateManager.setError(o),
                    this._eventManager.notifyListeners('error', { error: o, context: i }),
                    e
                )
            }
            const a = e.payload
            t = { ...t, [a.dataKey]: i.flowData[a.dataKey] || [] }
        }
        ;(this._stateManager.setLoading(!0), this._stateManager.setError(null))
        try {
            if (t && Object.keys(t).length > 0) {
                const d = { ...i.flowData, ...t }
                JSON.stringify(i.flowData) !== JSON.stringify(d) && (i.flowData = d)
            }
            ;(e.onStepComplete && (await e.onStepComplete(t || {}, i)),
                this._eventManager.notifyListeners('stepCompleted', { step: e, stepData: t || {}, context: i }),
                this._markStepCompleted(e, i))
            const a = this._orchestrator.calculateNextStep(e, i),
                o = a ? a.id : null,
                c = await this.navigateToStep(o, 'next', e, i, n, s, r)
            return (
                await this._persistenceService.persistDataIfNeeded(i, c?.id || null, this._stateManager.isHydrating),
                c
            )
        } catch (a) {
            return (
                this._errorHandler.handleError(a, `next() for step ${e.id}`, i),
                this._stateManager.setLoading(!1),
                e
            )
        }
    }
    async previous(e, t, i, n, s) {
        if (!e || this._stateManager.isLoading) return e
        const r = this._orchestrator.calculatePreviousStep(e, t, i),
            a = r ? r.id : null
        return (
            i.length > 0 && i[i.length - 1] === a && i.pop(),
            a ? this.navigateToStep(a, 'previous', e, t, i, n, s) : e
        )
    }
    async skip(e, t, i, n, s) {
        if (!e || !e.isSkippable || this._stateManager.isLoading)
            return (
                this._logger.debug(
                    `[NavigationService] skip(): Cannot skip from step '${e?.id}'. Not skippable or engine loading.`
                ),
                e
            )
        const r = e.skipToStep ? 'explicit_skip_target' : 'default_skip'
        this._eventManager.notifyListeners('stepSkipped', { step: e, context: t, skipReason: r })
        const o = this._orchestrator.getStepTransitionService().calculateSkipTarget(e, t)
        return await this.navigateToStep(o, 'skip', e, t, i, n, s)
    }
    async goToStep(e, t, i, n, s, r, a) {
        return this._stateManager.isLoading
            ? (this._logger.debug('[NavigationService] goToStep(): Ignoring - engine is loading.'), i)
            : (t &&
                  (n.flowData || (n.flowData = {}),
                  (n.flowData = { ...n.flowData, ...t }),
                  this._logger.debug(
                      '[NavigationService] goToStep(): Context flowData updated with step-specific data.'
                  )),
              await this.navigateToStep(e, 'goto', i, n, s, r, a))
    }
    getChecklistProgress(e, t) {
        return this._checklistService.getChecklistProgress(e, t)
    }
    _markStepCompleted(e, t) {
        ;(t.flowData._internal ||
            (t.flowData._internal = { completedSteps: {}, startedAt: Date.now(), stepStartTimes: {} }),
            (t.flowData._internal.completedSteps = {
                ...(t.flowData._internal.completedSteps || {}),
                [e.id]: Date.now(),
            }))
    }
}
function _e(l) {
    return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l
}
var R = { exports: {} },
    q
function fe() {
    return (
        q ||
            ((q = 1),
            (function (l) {
                var e = Object.prototype.hasOwnProperty,
                    t = '~'
                function i() {}
                Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (t = !1))
                function n(o, c, d) {
                    ;((this.fn = o), (this.context = c), (this.once = d || !1))
                }
                function s(o, c, d, h, p) {
                    if (typeof d != 'function') throw new TypeError('The listener must be a function')
                    var u = new n(d, h || o, p),
                        _ = t ? t + c : c
                    return (
                        o._events[_]
                            ? o._events[_].fn
                                ? (o._events[_] = [o._events[_], u])
                                : o._events[_].push(u)
                            : ((o._events[_] = u), o._eventsCount++),
                        o
                    )
                }
                function r(o, c) {
                    --o._eventsCount === 0 ? (o._events = new i()) : delete o._events[c]
                }
                function a() {
                    ;((this._events = new i()), (this._eventsCount = 0))
                }
                ;((a.prototype.eventNames = function () {
                    var c = [],
                        d,
                        h
                    if (this._eventsCount === 0) return c
                    for (h in (d = this._events)) e.call(d, h) && c.push(t ? h.slice(1) : h)
                    return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c
                }),
                    (a.prototype.listeners = function (c) {
                        var d = t ? t + c : c,
                            h = this._events[d]
                        if (!h) return []
                        if (h.fn) return [h.fn]
                        for (var p = 0, u = h.length, _ = new Array(u); p < u; p++) _[p] = h[p].fn
                        return _
                    }),
                    (a.prototype.listenerCount = function (c) {
                        var d = t ? t + c : c,
                            h = this._events[d]
                        return h ? (h.fn ? 1 : h.length) : 0
                    }),
                    (a.prototype.emit = function (c, d, h, p, u, _) {
                        var v = t ? t + c : c
                        if (!this._events[v]) return !1
                        var g = this._events[v],
                            k = arguments.length,
                            b,
                            m
                        if (g.fn) {
                            switch ((g.once && this.removeListener(c, g.fn, void 0, !0), k)) {
                                case 1:
                                    return (g.fn.call(g.context), !0)
                                case 2:
                                    return (g.fn.call(g.context, d), !0)
                                case 3:
                                    return (g.fn.call(g.context, d, h), !0)
                                case 4:
                                    return (g.fn.call(g.context, d, h, p), !0)
                                case 5:
                                    return (g.fn.call(g.context, d, h, p, u), !0)
                                case 6:
                                    return (g.fn.call(g.context, d, h, p, u, _), !0)
                            }
                            for (m = 1, b = new Array(k - 1); m < k; m++) b[m - 1] = arguments[m]
                            g.fn.apply(g.context, b)
                        } else {
                            var le = g.length,
                                P
                            for (m = 0; m < le; m++)
                                switch ((g[m].once && this.removeListener(c, g[m].fn, void 0, !0), k)) {
                                    case 1:
                                        g[m].fn.call(g[m].context)
                                        break
                                    case 2:
                                        g[m].fn.call(g[m].context, d)
                                        break
                                    case 3:
                                        g[m].fn.call(g[m].context, d, h)
                                        break
                                    case 4:
                                        g[m].fn.call(g[m].context, d, h, p)
                                        break
                                    default:
                                        if (!b) for (P = 1, b = new Array(k - 1); P < k; P++) b[P - 1] = arguments[P]
                                        g[m].fn.apply(g[m].context, b)
                                }
                        }
                        return !0
                    }),
                    (a.prototype.on = function (c, d, h) {
                        return s(this, c, d, h, !1)
                    }),
                    (a.prototype.once = function (c, d, h) {
                        return s(this, c, d, h, !0)
                    }),
                    (a.prototype.removeListener = function (c, d, h, p) {
                        var u = t ? t + c : c
                        if (!this._events[u]) return this
                        if (!d) return (r(this, u), this)
                        var _ = this._events[u]
                        if (_.fn) _.fn === d && (!p || _.once) && (!h || _.context === h) && r(this, u)
                        else {
                            for (var v = 0, g = [], k = _.length; v < k; v++)
                                (_[v].fn !== d || (p && !_[v].once) || (h && _[v].context !== h)) && g.push(_[v])
                            g.length ? (this._events[u] = g.length === 1 ? g[0] : g) : r(this, u)
                        }
                        return this
                    }),
                    (a.prototype.removeAllListeners = function (c) {
                        var d
                        return (
                            c
                                ? ((d = t ? t + c : c), this._events[d] && r(this, d))
                                : ((this._events = new i()), (this._eventsCount = 0)),
                            this
                        )
                    }),
                    (a.prototype.off = a.prototype.removeListener),
                    (a.prototype.addListener = a.prototype.on),
                    (a.prefixed = t),
                    (a.EventEmitter = a),
                    (l.exports = a))
            })(R)),
        R.exports
    )
}
var me = fe()
const ye = _e(me)
class W extends Error {
    constructor(e) {
        ;(super(e), (this.name = 'TimeoutError'))
    }
}
class Se extends Error {
    constructor(e) {
        ;(super(), (this.name = 'AbortError'), (this.message = e))
    }
}
const B = (l) => (globalThis.DOMException === void 0 ? new Se(l) : new DOMException(l)),
    J = (l) => {
        const e = l.reason === void 0 ? B('This operation was aborted.') : l.reason
        return e instanceof Error ? e : B(e)
    }
function ve(l, e) {
    const { milliseconds: t, fallback: i, message: n, customTimers: s = { setTimeout, clearTimeout } } = e
    let r, a
    const c = new Promise((d, h) => {
        if (typeof t != 'number' || Math.sign(t) !== 1)
            throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${t}\``)
        if (e.signal) {
            const { signal: u } = e
            ;(u.aborted && h(J(u)),
                (a = () => {
                    h(J(u))
                }),
                u.addEventListener('abort', a, { once: !0 }))
        }
        if (t === Number.POSITIVE_INFINITY) {
            l.then(d, h)
            return
        }
        const p = new W()
        ;((r = s.setTimeout.call(
            void 0,
            () => {
                if (i) {
                    try {
                        d(i())
                    } catch (u) {
                        h(u)
                    }
                    return
                }
                ;(typeof l.cancel == 'function' && l.cancel(),
                    n === !1
                        ? d()
                        : n instanceof Error
                          ? h(n)
                          : ((p.message = n ?? `Promise timed out after ${t} milliseconds`), h(p)))
            },
            t
        )),
            (async () => {
                try {
                    d(await l)
                } catch (u) {
                    h(u)
                }
            })())
    }).finally(() => {
        ;(c.clear(), a && e.signal && e.signal.removeEventListener('abort', a))
    })
    return (
        (c.clear = () => {
            ;(s.clearTimeout.call(void 0, r), (r = void 0))
        }),
        c
    )
}
function we(l, e, t) {
    let i = 0,
        n = l.length
    for (; n > 0; ) {
        const s = Math.trunc(n / 2)
        let r = i + s
        t(l[r], e) <= 0 ? ((i = ++r), (n -= s + 1)) : (n = s)
    }
    return i
}
class Ce {
    #e = []
    enqueue(e, t) {
        t = { priority: 0, ...t }
        const i = { priority: t.priority, id: t.id, run: e }
        if (this.size === 0 || this.#e[this.size - 1].priority >= t.priority) {
            this.#e.push(i)
            return
        }
        const n = we(this.#e, i, (s, r) => r.priority - s.priority)
        this.#e.splice(n, 0, i)
    }
    setPriority(e, t) {
        const i = this.#e.findIndex((s) => s.id === e)
        if (i === -1) throw new ReferenceError(`No promise function with the id "${e}" exists in the queue.`)
        const [n] = this.#e.splice(i, 1)
        this.enqueue(n.run, { priority: t, id: e })
    }
    dequeue() {
        return this.#e.shift()?.run
    }
    filter(e) {
        return this.#e.filter((t) => t.priority === e.priority).map((t) => t.run)
    }
    get size() {
        return this.#e.length
    }
}
class Ie extends ye {
    #e
    #a
    #r = 0
    #g
    #o
    #p = 0
    #i
    #l
    #t
    #_
    #n = 0
    #c
    #s
    #f
    #S = 1n
    timeout
    constructor(e) {
        if (
            (super(),
            (e = {
                carryoverConcurrencyCount: !1,
                intervalCap: Number.POSITIVE_INFINITY,
                interval: 0,
                concurrency: Number.POSITIVE_INFINITY,
                autoStart: !0,
                queueClass: Ce,
                ...e,
            }),
            !(typeof e.intervalCap == 'number' && e.intervalCap >= 1))
        )
            throw new TypeError(
                `Expected \`intervalCap\` to be a number from 1 and up, got \`${e.intervalCap?.toString() ?? ''}\` (${typeof e.intervalCap})`
            )
        if (e.interval === void 0 || !(Number.isFinite(e.interval) && e.interval >= 0))
            throw new TypeError(
                `Expected \`interval\` to be a finite number >= 0, got \`${e.interval?.toString() ?? ''}\` (${typeof e.interval})`
            )
        ;((this.#e = e.carryoverConcurrencyCount),
            (this.#a = e.intervalCap === Number.POSITIVE_INFINITY || e.interval === 0),
            (this.#g = e.intervalCap),
            (this.#o = e.interval),
            (this.#t = new e.queueClass()),
            (this.#_ = e.queueClass),
            (this.concurrency = e.concurrency),
            (this.timeout = e.timeout),
            (this.#f = e.throwOnTimeout === !0),
            (this.#s = e.autoStart === !1))
    }
    get #v() {
        return this.#a || this.#r < this.#g
    }
    get #w() {
        return this.#n < this.#c
    }
    #C() {
        ;(this.#n--, this.#d(), this.emit('next'))
    }
    #I() {
        ;(this.#y(), this.#m(), (this.#l = void 0))
    }
    get #E() {
        const e = Date.now()
        if (this.#i === void 0) {
            const t = this.#p - e
            if (t < 0) this.#r = this.#e ? this.#n : 0
            else
                return (
                    this.#l === void 0 &&
                        (this.#l = setTimeout(() => {
                            this.#I()
                        }, t)),
                    !0
                )
        }
        return !1
    }
    #d() {
        if (this.#t.size === 0)
            return (
                this.#i && clearInterval(this.#i),
                (this.#i = void 0),
                this.emit('empty'),
                this.#n === 0 && this.emit('idle'),
                !1
            )
        if (!this.#s) {
            const e = !this.#E
            if (this.#v && this.#w) {
                const t = this.#t.dequeue()
                return t ? (this.emit('active'), t(), e && this.#m(), !0) : !1
            }
        }
        return !1
    }
    #m() {
        this.#a ||
            this.#i !== void 0 ||
            ((this.#i = setInterval(() => {
                this.#y()
            }, this.#o)),
            (this.#p = Date.now() + this.#o))
    }
    #y() {
        ;(this.#r === 0 && this.#n === 0 && this.#i && (clearInterval(this.#i), (this.#i = void 0)),
            (this.#r = this.#e ? this.#n : 0),
            this.#h())
    }
    #h() {
        for (; this.#d(); );
    }
    get concurrency() {
        return this.#c
    }
    set concurrency(e) {
        if (!(typeof e == 'number' && e >= 1))
            throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`)
        ;((this.#c = e), this.#h())
    }
    async #k(e) {
        return new Promise((t, i) => {
            e.addEventListener(
                'abort',
                () => {
                    i(e.reason)
                },
                { once: !0 }
            )
        })
    }
    setPriority(e, t) {
        this.#t.setPriority(e, t)
    }
    async add(e, t = {}) {
        return (
            (t.id ??= (this.#S++).toString()),
            (t = { timeout: this.timeout, throwOnTimeout: this.#f, ...t }),
            new Promise((i, n) => {
                ;(this.#t.enqueue(async () => {
                    this.#n++
                    try {
                        ;(t.signal?.throwIfAborted(), this.#r++)
                        let s = e({ signal: t.signal })
                        ;(t.timeout && (s = ve(Promise.resolve(s), { milliseconds: t.timeout })),
                            t.signal && (s = Promise.race([s, this.#k(t.signal)])))
                        const r = await s
                        ;(i(r), this.emit('completed', r))
                    } catch (s) {
                        if (s instanceof W && !t.throwOnTimeout) {
                            i()
                            return
                        }
                        ;(n(s), this.emit('error', s))
                    } finally {
                        this.#C()
                    }
                }, t),
                    this.emit('add'),
                    this.#d())
            })
        )
    }
    async addAll(e, t) {
        return Promise.all(e.map(async (i) => this.add(i, t)))
    }
    start() {
        return this.#s ? ((this.#s = !1), this.#h(), this) : this
    }
    pause() {
        this.#s = !0
    }
    clear() {
        this.#t = new this.#_()
    }
    async onEmpty() {
        this.#t.size !== 0 && (await this.#u('empty'))
    }
    async onSizeLessThan(e) {
        this.#t.size < e || (await this.#u('next', () => this.#t.size < e))
    }
    async onIdle() {
        ;(this.#n === 0 && this.#t.size === 0) || (await this.#u('idle'))
    }
    async #u(e, t) {
        return new Promise((i) => {
            const n = () => {
                ;(t && !t()) || (this.off(e, n), i())
            }
            this.on(e, n)
        })
    }
    get size() {
        return this.#t.size
    }
    sizeBy(e) {
        return this.#t.filter(e).length
    }
    get pending() {
        return this.#n
    }
    get isPaused() {
        return this.#s
    }
}
class Y {
    constructor(e = 1) {
        ;((this._operationCounter = 0),
            (this._trackedOperations = new Map()),
            (this._isPaused = !1),
            (this._queue = new Ie({ concurrency: Math.max(1, e) })))
    }
    enqueue(e, t = 0) {
        const i = `op_${++this._operationCounter}_${Date.now()}`
        return (
            this._trackedOperations.set(i, { id: i, createdAt: Date.now() }),
            this._queue.add(
                async () => {
                    try {
                        return await e()
                    } finally {
                        this._trackedOperations.delete(i)
                    }
                },
                { priority: t }
            )
        )
    }
    enqueueUrgent(e) {
        return this.enqueue(e, Number.MAX_SAFE_INTEGER)
    }
    getStats() {
        const t = Array.from(this._trackedOperations.values()).reduce(
            (i, n) => (!i || n.createdAt < i.createdAt ? n : i),
            void 0
        )
        return {
            queueLength: this._queue.size,
            activeOperations: this._queue.pending,
            isProcessing: this._queue.pending > 0 || this._queue.size > 0,
            isPaused: this._isPaused,
            oldestOperationAge: t ? Date.now() - t.createdAt : null,
        }
    }
    clear() {
        ;(this._queue.clear(), this._trackedOperations.clear())
    }
    async drain() {
        await this._queue.onIdle()
    }
    pause() {
        ;(this._queue.pause(), (this._isPaused = !0))
    }
    resume() {
        ;(this._queue.start(), (this._isPaused = !1))
    }
    setConcurrency(e) {
        this._queue.concurrency = Math.max(1, e)
    }
    get concurrency() {
        return this._queue.concurrency
    }
    get size() {
        return this._queue.size
    }
    get pending() {
        return this._queue.pending
    }
    get isEmpty() {
        return this._queue.size === 0 && this._queue.pending === 0
    }
    async onEmpty() {
        await this._queue.onEmpty()
    }
    async onIdle() {
        await this._queue.onIdle()
    }
}
const $ = f.getInstance({ prefix: '[EventManager]' })
class Ee {
    constructor() {
        ;((this._listeners = new Map()),
            [
                'stateChange',
                'beforeStepChange',
                'stepChange',
                'flowCompleted',
                'stepActive',
                'stepCompleted',
                'contextUpdate',
                'error',
                'flowStarted',
                'flowPaused',
                'flowResumed',
                'flowAbandoned',
                'flowReset',
                'flowRegistered',
                'flowUnregistered',
                'stepSkipped',
                'stepRetried',
                'stepValidationFailed',
                'stepHelpRequested',
                'stepAbandoned',
                'navigationBack',
                'navigationForward',
                'navigationJump',
                'userIdle',
                'userReturned',
                'dataChanged',
                'stepRenderTime',
                'persistenceSuccess',
                'persistenceFailure',
                'checklistItemToggled',
                'checklistProgressChanged',
                'pluginInstalled',
                'pluginError',
            ].forEach((t) => {
                this._listeners.set(t, new Set())
            }))
    }
    addEventListener(e, t) {
        const i = this._listeners.get(e)
        if (!i) throw new Error(`Unknown event type: ${String(e)}`)
        return (i.add(t), () => i.delete(t))
    }
    notifyListeners(e, ...t) {
        const i = this._listeners.get(e)
        i &&
            i.forEach((n) => {
                try {
                    const s = n(...t)
                    s instanceof Promise &&
                        s.catch((r) => {
                            const a = e === 'flowCompleted' ? 'async onFlowHasCompleted' : this._getLegacyEventName(e)
                            $.error(`Error in ${a} listener:`, r)
                        })
                } catch (s) {
                    const r = e === 'flowCompleted' ? 'sync onFlowHasCompleted' : this._getLegacyEventName(e)
                    $.error(`Error in ${r} listener:`, s)
                }
            })
    }
    _getLegacyEventName(e) {
        switch (e) {
            case 'stepChange':
                return 'stepChange'
            case 'stateChange':
                return 'stateChange'
            case 'beforeStepChange':
                return 'beforeStepChange'
            case 'stepActive':
                return 'stepActive'
            case 'stepCompleted':
                return 'stepCompleted'
            case 'contextUpdate':
                return 'contextUpdate'
            case 'error':
                return 'error'
            default:
                return String(e)
        }
    }
    async notifyListenersSequential(e, ...t) {
        const i = this._listeners.get(e)
        if (i)
            for (const n of i)
                try {
                    const s = n(...t)
                    s instanceof Promise && (await s)
                } catch (s) {
                    throw ($.error(`Error in sequential ${String(e)} listener:`, s), s)
                }
    }
    getListenerCount(e) {
        return this._listeners.get(e)?.size || 0
    }
    hasListeners(e) {
        const t = this._listeners.get(e)
        return t !== void 0 && t.size > 0
    }
    hasAnyListeners(...e) {
        return e.some((t) => this.hasListeners(t))
    }
    clearAllListeners() {
        this._listeners.forEach((e) => e.clear())
    }
}
class X {
    constructor(e, t, i) {
        ;((this._eventManager = t),
            (this._plugins = new Map()),
            (this._cleanupFunctions = new Map()),
            (this._engine = e),
            (this._eventManager = t),
            (this._logger = f.getInstance({ debugMode: i ?? !1, prefix: 'PluginManager' })))
    }
    async install(e) {
        if (this._plugins.has(e.name)) throw new Error(`Plugin "${e.name}" is already installed`)
        if (e.dependencies) {
            for (const t of e.dependencies)
                if (!this._plugins.has(t))
                    throw new Error(`Plugin "${e.name}" requires dependency "${t}" which is not installed`)
        }
        try {
            const t = await e.install(this._engine)
            ;(this._plugins.set(e.name, e),
                this._cleanupFunctions.set(e.name, t),
                this._eventManager?.notifyListeners('pluginInstalled', {
                    pluginName: e.name,
                    pluginVersion: e.version,
                }),
                this._logger.debug(`Installed plugin: ${e.name}@${e.version}`))
        } catch (t) {
            throw (
                this._eventManager?.notifyListeners('pluginError', {
                    pluginName: e.name,
                    error: t,
                    context: this._engine.getContext(),
                }),
                this._logger.error(`Failed to install plugin "${e.name}":`, t),
                t
            )
        }
    }
    async uninstall(e) {
        if (!this._plugins.get(e)) throw new Error(`Plugin "${e}" is not installed`)
        const i = Array.from(this._plugins.values()).filter((n) => n.dependencies?.includes(e))
        if (i.length > 0) {
            const n = i.map((s) => s.name).join(', ')
            throw new Error(`Cannot uninstall "${e}" because it is required by: ${n}`)
        }
        try {
            const n = this._cleanupFunctions.get(e)
            ;(n && (await n()), this._logger.debug(`Uninstalled plugin: ${e}`))
        } catch (n) {
            throw (this._logger.error(`Failed to uninstall plugin "${e}":`, n), n)
        } finally {
            ;(this._cleanupFunctions.delete(e), this._plugins.delete(e))
        }
    }
    getPlugin(e) {
        return this._plugins.get(e)
    }
    getInstalledPlugins() {
        return Array.from(this._plugins.values())
    }
    isInstalled(e) {
        return this._plugins.has(e)
    }
    async cleanup() {
        const e = Array.from(this._cleanupFunctions.values()).map((t) => t())
        ;(await Promise.all(e), this._plugins.clear(), this._cleanupFunctions.clear())
    }
}
class ke {
    constructor(e, t) {
        ;((this._eventManager = e),
            (this._errorHandler = t),
            (this._logger = f.getInstance({ prefix: 'ChecklistManager' })))
    }
    _isValidChecklistPayload(e) {
        return (
            e &&
            typeof e == 'object' &&
            'dataKey' in e &&
            typeof e.dataKey == 'string' &&
            'items' in e &&
            Array.isArray(e.items)
        )
    }
    getChecklistItemsState(e, t) {
        const { dataKey: i, items: n } = e.payload
        let s = t.flowData[i]
        return (
            (!s || s.length !== n.length) &&
                ((s = n.map((r) => ({ id: r.id, isCompleted: !1 }))), (t.flowData = { ...t.flowData, [i]: [...s] })),
            s
        )
    }
    isChecklistStepComplete(e, t) {
        const i = this.getChecklistItemsState(e, t),
            { items: n, minItemsToComplete: s } = e.payload
        let r = 0,
            a = 0
        for (const o of n) {
            if (o.condition && !o.condition(t)) continue
            const c = i.find((h) => h.id === o.id),
                d = o.isMandatory !== !1
            c?.isCompleted ? r++ : d && a++
        }
        return typeof s == 'number' ? r >= s : a === 0
    }
    async updateChecklistItem(e, t, i, n, s) {
        if (!i) {
            const u = new Error('Cannot update checklist item: step is null or undefined')
            ;(this._logger.error('Step existence check failed in updateChecklistItem'),
                this._errorHandler.handleError(u, 'updateChecklistItem - step existence', n))
            return
        }
        if (i.type !== 'CHECKLIST') {
            const u = new Error(
                `Cannot update checklist item: step '${i.id}' is not a CHECKLIST step (type: ${i.type})`
            )
            ;(this._logger.error(`Step type validation failed: expected CHECKLIST, got ${i.type}`),
                this._errorHandler.handleError(u, 'updateChecklistItem - step type validation', n))
            return
        }
        if (!this._isValidChecklistPayload(i.payload)) {
            const u = new Error(`Cannot update checklist item: step '${i.id}' has invalid payload structure`)
            ;(this._logger.error('Payload type guard validation failed in updateChecklistItem', {
                stepId: i.id,
                hasPayload: !!i.payload,
                hasDataKey: i.payload && 'dataKey' in i.payload,
                hasItems: i.payload && 'items' in i.payload,
            }),
                this._errorHandler.handleError(u, 'updateChecklistItem - payload validation', n))
            return
        }
        const r = i.payload,
            { dataKey: a } = r
        if (!r.items.some((u) => u.id === e)) {
            const u = new Error(`Cannot update checklist item: item '${e}' does not exist in step '${i.id}'`)
            ;(this._logger.warn(`Item ID validation failed: '${e}' not found in checklist definitions`, {
                stepId: i.id,
                itemId: e,
                availableItems: r.items.map((_) => _.id),
            }),
                this._errorHandler.handleError(u, 'updateChecklistItem - item existence', n))
            return
        }
        let c = n.flowData[a] || []
        const d = c.findIndex((u) => u.id === e)
        this._eventManager.notifyListeners('checklistItemToggled', { itemId: e, isCompleted: t, step: i, context: n })
        const h = this.getChecklistProgress(i, n)
        if (
            (this._eventManager.notifyListeners('checklistProgressChanged', { step: i, context: n, progress: h }),
            d !== -1)
        ) {
            const u = [...c]
            ;((u[d] = { ...u[d], isCompleted: t }), (c = u))
        } else c = [...c, { id: e, isCompleted: t }]
        const p = JSON.stringify(n.flowData)
        if (((n.flowData = { ...n.flowData, [a]: c }), JSON.stringify(n.flowData) !== p && s))
            try {
                await s()
            } catch (u) {
                this._errorHandler.handleError(u, 'updateChecklistItem persistence', n)
            }
    }
    getChecklistProgress(e, t) {
        const i = this.getChecklistItemsState(e, t),
            { items: n } = e.payload
        let s = 0,
            r = 0
        for (const c of n) {
            if (c.condition && !c.condition(t)) continue
            ;(s++, i.find((h) => h.id === c.id)?.isCompleted && r++)
        }
        const a = s > 0 ? (r / s) * 100 : 0,
            o = this.isChecklistStepComplete(e, t)
        return { completed: r, total: s, percentage: Math.round(a), isComplete: o }
    }
}
class Z {
    constructor(e = 100, t = !1) {
        ;((this._maxDepth = e), (this._logger = f.getInstance({ debugMode: t, prefix: 'StepValidator' })))
    }
    validateSteps(e) {
        const t = [],
            i = []
        if (!e || e.length === 0)
            return (
                i.push({ warningType: 'MISSING_PAYLOAD', message: 'No steps defined in the flow' }),
                { isValid: !0, errors: t, warnings: i }
            )
        ;(this._validateIdUniqueness(e, t),
            e.forEach((s) => {
                this._validateStepStructure(s, t)
            }),
            this._detectCircularNavigation(e, t),
            this._validateStaticReferences(e, i),
            this._detectUnreachableSteps(e, i))
        const n = t.length === 0
        return (
            n ||
                (this._logger.error(`Step validation failed with ${t.length} error(s)`),
                t.forEach((s) => this._logger.error(`  - ${s.message}`, s.details))),
            i.length > 0 &&
                (this._logger.warn(`Step validation completed with ${i.length} warning(s)`),
                i.forEach((s) => this._logger.warn(`  - ${s.message}`, s.details))),
            { isValid: n, errors: t, warnings: i }
        )
    }
    _validateIdUniqueness(e, t) {
        const i = new Map()
        e.forEach((n, s) => {
            if (!n.id) {
                t.push({
                    errorType: 'MISSING_ID',
                    message: `Step at index ${s} is missing an 'id' property`,
                    details: { index: s, stepType: n.type },
                })
                return
            }
            const r = i.get(n.id)
            r !== void 0
                ? t.push({
                      stepId: n.id,
                      errorType: 'DUPLICATE_ID',
                      message: `Duplicate step ID '${n.id}' found at indices ${r} and ${s}`,
                      details: { duplicateId: n.id, indices: [r, s] },
                  })
                : i.set(n.id, s)
        })
    }
    _validateStepStructure(e, t) {
        if (
            (e.type === 'CUSTOM_COMPONENT' &&
                (e.payload?.componentKey ||
                    t.push({
                        stepId: e.id,
                        errorType: 'INVALID_PAYLOAD',
                        message: `Step '${e.id}' of type 'CUSTOM_COMPONENT' must have a 'componentKey' in its payload`,
                        details: { stepType: e.type },
                    })),
            e.type === 'SINGLE_CHOICE' || e.type === 'MULTIPLE_CHOICE')
        ) {
            const i = e.payload
            ;(!i?.options || !Array.isArray(i.options) || i.options.length === 0) &&
                t.push({
                    stepId: e.id,
                    errorType: 'INVALID_PAYLOAD',
                    message: `Step '${e.id}' of type '${e.type}' must have a non-empty 'options' array in its payload`,
                    details: { stepType: e.type },
                })
        }
        if (e.type === 'CHECKLIST') {
            const i = e.payload
            ;(i?.dataKey ||
                t.push({
                    stepId: e.id,
                    errorType: 'INVALID_PAYLOAD',
                    message: `Step '${e.id}' of type 'CHECKLIST' must have a 'dataKey' in its payload`,
                    details: { stepType: e.type },
                }),
                (!i?.items || !Array.isArray(i.items) || i.items.length === 0) &&
                    t.push({
                        stepId: e.id,
                        errorType: 'INVALID_PAYLOAD',
                        message: `Step '${e.id}' of type 'CHECKLIST' must have a non-empty 'items' array in its payload`,
                        details: { stepType: e.type },
                    }))
        }
    }
    _detectCircularNavigation(e, t) {
        e.forEach((i) => {
            if (!i.id) return
            const n = new Set(),
                s = []
            this._checkCircularPath(i.id, e, n, s, t)
        })
    }
    _checkCircularPath(e, t, i, n, s) {
        if (n.length >= this._maxDepth) {
            s.push({
                stepId: e,
                errorType: 'CIRCULAR_NAVIGATION',
                message: `Potential circular navigation detected: path depth exceeds ${this._maxDepth} steps`,
                details: { startStep: n[0], currentStep: e, pathLength: n.length, maxDepth: this._maxDepth },
            })
            return
        }
        if (i.has(e)) {
            const a = n.indexOf(e)
            if (a !== -1) {
                const o = [...n.slice(a), e]
                s.push({
                    stepId: e,
                    errorType: 'CIRCULAR_NAVIGATION',
                    message: `Circular navigation detected in path: ${o.join(' → ')}`,
                    details: { cycle: o, cycleLength: o.length - 1 },
                })
            }
            return
        }
        ;(i.add(e), n.push(e))
        const r = y(t, e)
        r &&
            (typeof r.nextStep == 'string' && this._checkCircularPath(r.nextStep, t, new Set(i), [...n], s),
            r.isSkippable &&
                typeof r.skipToStep == 'string' &&
                this._checkCircularPath(r.skipToStep, t, new Set(i), [...n], s))
    }
    _validateStaticReferences(e, t) {
        e.forEach((i) => {
            i.id &&
                (typeof i.nextStep == 'string' &&
                    !y(e, i.nextStep) &&
                    t.push({
                        stepId: i.id,
                        warningType: 'BROKEN_LINK',
                        message: `Step '${i.id}' has a 'nextStep' reference to non-existent step '${i.nextStep}'`,
                        details: { targetStep: i.nextStep },
                    }),
                typeof i.previousStep == 'string' &&
                    !y(e, i.previousStep) &&
                    t.push({
                        stepId: i.id,
                        warningType: 'BROKEN_LINK',
                        message: `Step '${i.id}' has a 'previousStep' reference to non-existent step '${i.previousStep}'`,
                        details: { targetStep: i.previousStep },
                    }),
                i.isSkippable &&
                    typeof i.skipToStep == 'string' &&
                    !y(e, i.skipToStep) &&
                    t.push({
                        stepId: i.id,
                        warningType: 'BROKEN_LINK',
                        message: `Step '${i.id}' has a 'skipToStep' reference to non-existent step '${i.skipToStep}'`,
                        details: { targetStep: i.skipToStep },
                    }))
        })
    }
    _detectUnreachableSteps(e, t) {
        if (
            e.length === 0 ||
            e.some(
                (r) =>
                    typeof r.nextStep == 'function' ||
                    typeof r.previousStep == 'function' ||
                    typeof r.skipToStep == 'function' ||
                    !!r.condition
            )
        )
            return
        const n = new Set(),
            s = [e[0].id]
        for (; s.length > 0; ) {
            const r = s.shift()
            if (n.has(r)) continue
            n.add(r)
            const a = y(e, r)
            a &&
                (typeof a.nextStep == 'string' && !n.has(a.nextStep) && s.push(a.nextStep),
                a.isSkippable && typeof a.skipToStep == 'string' && !n.has(a.skipToStep) && s.push(a.skipToStep))
        }
        e.forEach((r, a) => {
            a !== 0 &&
                (n.has(r.id) ||
                    t.push({
                        stepId: r.id,
                        warningType: 'UNREACHABLE_STEP',
                        message: `Step '${r.id}' may be unreachable from the first step (no static navigation path found)`,
                        details: { stepIndex: a },
                    }))
        })
    }
    isValid(e) {
        return this.validateSteps(e).isValid
    }
    getErrors(e) {
        return this.validateSteps(e).errors
    }
    getWarnings(e) {
        return this.validateSteps(e).warnings
    }
}
class x {
    static buildInitialContext(e) {
        const t = { flowData: {}, ...(e.initialContext || {}) }
        return (
            t.flowData || (t.flowData = {}),
            t.flowData._internal
                ? (t.flowData._internal.stepStartTimes || (t.flowData._internal.stepStartTimes = {}),
                  t.flowData._internal.startedAt || (t.flowData._internal.startedAt = Date.now()))
                : (t.flowData._internal = { completedSteps: {}, startedAt: Date.now(), stepStartTimes: {} }),
            t
        )
    }
    static mergeConfigs(e, t) {
        const i = e.initialContext ?? {},
            n = t.initialContext ?? {},
            s = { ...i, ...n, flowData: { ...(i.flowData || {}), ...(n.flowData || {}) } },
            r = e.plugins || [],
            a = t.plugins || [],
            o = [...r, ...a],
            c = t.steps || e.steps
        return { ...e, ...t, initialContext: s, plugins: o, steps: c }
    }
    static validateConfig(e) {
        const t = [],
            i = []
        if (!e.steps || e.steps.length === 0) i.push('No steps defined in configuration')
        else {
            const s = new Z(100, !1).validateSteps(e.steps)
            ;(s.errors.forEach((r) => {
                t.push(r.message)
            }),
                s.warnings.forEach((r) => {
                    i.push(r.message)
                }))
        }
        if (
            (e.initialStepId &&
                (e.steps.some((s) => s.id === e.initialStepId) ||
                    t.push(`Initial step ID ${e.initialStepId} not found in steps`)),
            e.plugins)
        )
            for (const n of e.plugins)
                (n.name || t.push('Plugin found without name'),
                    (!n.install || typeof n.install != 'function') &&
                        t.push(`Plugin ${n.name} missing install function`))
        return { isValid: t.length === 0, errors: t, warnings: i }
    }
    static createDefaultConfig() {
        return { steps: [], initialContext: { flowData: {} }, plugins: [] }
    }
    static cloneConfig(e) {
        return JSON.parse(JSON.stringify(e))
    }
}
function L(l) {
    return { ok: !0, value: l }
}
function D(l) {
    return { ok: !1, error: l }
}
function ee(l) {
    return l.ok === !0
}
function Te(l) {
    return l.ok === !1
}
function be(l, e) {
    return ee(l) ? L(e(l.value)) : l
}
function Me(l, e) {
    return Te(l) ? D(e(l.error)) : l
}
function xe(l, e) {
    return ee(l) ? e(l.value) : l
}
function Le(l) {
    try {
        return L(l())
    } catch (e) {
        return D(e instanceof Error ? e : new Error(String(e)))
    }
}
async function De(l) {
    try {
        return L(await l())
    } catch (e) {
        return D(e instanceof Error ? e : new Error(String(e)))
    }
}
async function Pe(l) {
    try {
        return L(await l)
    } catch (e) {
        return D(e instanceof Error ? e : new Error(String(e)))
    }
}
class Ae {
    constructor(e, t) {
        ;((this._eventManager = e),
            (this._stateManager = t),
            (this._errorHistory = []),
            (this._maxHistorySize = 50),
            (this._logger = f.getInstance({ prefix: '[ErrorHandler]' })))
    }
    handleError(e, t, i, n) {
        const s = e instanceof Error ? e : new Error(String(e)),
            r = { operation: t, stepId: n, timestamp: Date.now(), stack: s.stack }
        return (
            this._errorHistory.push({ error: s, context: r, engineContext: { ...i } }),
            this._errorHistory.length > this._maxHistorySize && this._errorHistory.shift(),
            this._logger.error(`[OnboardingEngine] ${t}:`, s, r),
            this._stateManager.setError(s),
            this._eventManager.notifyListeners('error', { error: s, context: i }),
            s
        )
    }
    async safeExecute(e, t, i, n) {
        try {
            return L(await e())
        } catch (s) {
            return (this.handleError(s, t, i, n), D(s))
        }
    }
    safeExecuteSync(e, t, i, n) {
        try {
            return L(e())
        } catch (s) {
            return (this.handleError(s, t, i, n), D(s))
        }
    }
    getErrorHistory() {
        return [...this._errorHistory]
    }
    getRecentErrors(e = 10) {
        return e <= 0 ? [] : this._errorHistory.slice(-e)
    }
    clearErrorHistory() {
        this._errorHistory = []
    }
    hasErrors() {
        return this._errorHistory.length > 0
    }
    getErrorsByOperation(e) {
        return this._errorHistory.filter((t) => t.context.operation.includes(e))
    }
    getErrorsByStep(e) {
        return this._errorHistory.filter((t) => t.context.stepId === e)
    }
}
class Fe {
    constructor(e) {
        this._eventManager = e
    }
    addEventListener(e, t) {
        return this._eventManager.addEventListener(e, t)
    }
    onStepChange(e) {
        return this._eventManager.addEventListener('stepChange', e)
    }
    onFlowCompleted(e) {
        return this._eventManager.addEventListener('flowCompleted', e)
    }
    onStepActive(e) {
        return this._eventManager.addEventListener('stepActive', e)
    }
    onStepCompleted(e) {
        return this._eventManager.addEventListener('stepCompleted', e)
    }
    onContextUpdate(e) {
        return this._eventManager.addEventListener('contextUpdate', e)
    }
    onError(e) {
        return this._eventManager.addEventListener('error', e)
    }
    onStateChange(e) {
        return this._eventManager.addEventListener('stateChange', e)
    }
    onBeforeStepChange(e) {
        return this._eventManager.addEventListener('beforeStepChange', e)
    }
    onFlowStarted(e) {
        return this._eventManager.addEventListener('flowStarted', e)
    }
    onFlowPaused(e) {
        return this._eventManager.addEventListener('flowPaused', e)
    }
    onFlowResumed(e) {
        return this._eventManager.addEventListener('flowResumed', e)
    }
    onFlowAbandoned(e) {
        return this._eventManager.addEventListener('flowAbandoned', e)
    }
    onFlowReset(e) {
        return this._eventManager.addEventListener('flowReset', e)
    }
    onStepSkipped(e) {
        return this._eventManager.addEventListener('stepSkipped', e)
    }
    onStepRetried(e) {
        return this._eventManager.addEventListener('stepRetried', e)
    }
    onStepValidationFailed(e) {
        return this._eventManager.addEventListener('stepValidationFailed', e)
    }
    onStepHelpRequested(e) {
        return this._eventManager.addEventListener('stepHelpRequested', e)
    }
    onStepAbandoned(e) {
        return this._eventManager.addEventListener('stepAbandoned', e)
    }
    onNavigationBack(e) {
        return this._eventManager.addEventListener('navigationBack', e)
    }
    onNavigationForward(e) {
        return this._eventManager.addEventListener('navigationForward', e)
    }
    onNavigationJump(e) {
        return this._eventManager.addEventListener('navigationJump', e)
    }
    onUserIdle(e) {
        return this._eventManager.addEventListener('userIdle', e)
    }
    onUserReturned(e) {
        return this._eventManager.addEventListener('userReturned', e)
    }
    onDataChanged(e) {
        return this._eventManager.addEventListener('dataChanged', e)
    }
    onStepRenderTime(e) {
        return this._eventManager.addEventListener('stepRenderTime', e)
    }
    onPersistenceSuccess(e) {
        return this._eventManager.addEventListener('persistenceSuccess', e)
    }
    onPersistenceFailure(e) {
        return this._eventManager.addEventListener('persistenceFailure', e)
    }
    onChecklistItemToggled(e) {
        return this._eventManager.addEventListener('checklistItemToggled', e)
    }
    onChecklistProgressChanged(e) {
        return this._eventManager.addEventListener('checklistProgressChanged', e)
    }
    onPluginInstalled(e) {
        return this._eventManager.addEventListener('pluginInstalled', e)
    }
    onPluginError(e) {
        return this._eventManager.addEventListener('pluginError', e)
    }
    addBeforeStepChangeListener(e) {
        const t = async (i) => {
            i.targetStepId && this._findStepById(i.targetStepId) && (await e(i))
        }
        return this.addEventListener('beforeStepChange', t)
    }
    addAfterStepChangeListener(e) {
        return this.addEventListener('stepChange', e)
    }
    addStepActiveListener(e) {
        return this.addEventListener('stepActive', e)
    }
    addStepCompletedListener(e) {
        return this.addEventListener('stepCompleted', e)
    }
    addFlowCompletedListener(e) {
        return this.addEventListener('flowCompleted', e)
    }
    addContextUpdateListener(e) {
        return this.addEventListener('contextUpdate', e)
    }
    addErrorListener(e) {
        return this.addEventListener('error', e)
    }
    _findStepById(e) {}
    removeAllListeners() {
        this._eventManager.clearAllListeners()
    }
    getListenerCount(e) {
        return this._eventManager.getListenerCount(e)
    }
    hasListeners(e) {
        return this._eventManager.hasListeners(e)
    }
}
const M = class M {
    static findStepById(e, t) {
        if (!t) return
        const i = `${e.length}-${t}`
        if (this._stepCache.has(i)) {
            const s = this._stepCache.get(i)
            return (this._stepCache.delete(i), this._stepCache.set(i, s), s)
        }
        const n = e.find((s) => s.id === t)
        if (n) {
            if (this._stepCache.size >= this._maxCacheSize) {
                const s = this._stepCache.keys().next().value
                s && this._stepCache.delete(s)
            }
            this._stepCache.set(i, n)
        }
        return n
    }
    static memoizeStepEvaluation(e, t, i) {
        if (!e) return i(e, t)
        const n = this._hashContext(t),
            s = `${e}-${n}`
        if (this._evaluationCache.has(s)) return this._evaluationCache.get(s)
        const r = i(e, t)
        if (this._evaluationCache.size >= this._maxCacheSize) {
            const a = this._evaluationCache.keys().next().value
            a && this._evaluationCache.delete(a)
        }
        return (this._evaluationCache.set(s, r), r)
    }
    static debounce(e, t) {
        let i
        return (...n) => {
            ;(clearTimeout(i), (i = setTimeout(() => e(...n), t)))
        }
    }
    static throttle(e, t) {
        let i
        return (...n) => {
            i || (e(...n), (i = !0), setTimeout(() => (i = !1), t))
        }
    }
    static measurePerformance(e, t) {
        const i = performance.now(),
            n = t(),
            r = performance.now() - i
        this._performanceMetrics.has(e) || this._performanceMetrics.set(e, [])
        const a = this._performanceMetrics.get(e)
        return (
            a.push(r),
            a.length > 100 && a.shift(),
            r > 100 && this._logger.warn(`Slow operation detected: ${e} took ${r.toFixed(2)}ms`),
            n
        )
    }
    static async measureAsyncPerformance(e, t) {
        const i = performance.now(),
            n = await t(),
            r = performance.now() - i
        this._performanceMetrics.has(e) || this._performanceMetrics.set(e, [])
        const a = this._performanceMetrics.get(e)
        return (
            a.push(r),
            a.length > 100 && a.shift(),
            r > 200 && this._logger.warn(`Slow async operation detected: ${e} took ${r.toFixed(2)}ms`),
            n
        )
    }
    static getPerformanceStats(e) {
        const t = this._performanceMetrics.get(e)
        if (!t || t.length === 0) return null
        const i = t.length,
            s = t.reduce((c, d) => c + d, 0) / i,
            r = Math.min(...t),
            a = Math.max(...t),
            o = t[t.length - 1]
        return { count: i, average: s, min: r, max: a, recent: o }
    }
    static clearCaches() {
        ;(this._stepCache.clear(), this._evaluationCache.clear(), this._performanceMetrics.clear())
    }
    static getCacheStats() {
        return {
            stepCacheSize: this._stepCache.size,
            evaluationCacheSize: this._evaluationCache.size,
            performanceMetricsCount: this._performanceMetrics.size,
        }
    }
    static _hashContext(e) {
        const t = e.flowData || {},
            i = Object.keys(t).sort(),
            n = {}
        for (const a of i) n[a] = t[a]
        return JSON.stringify({ flowData: n })
    }
    static batchOperations(e, t = 10) {
        const i = []
        for (let n = 0; n < e.length; n += t) {
            const r = e.slice(n, n + t).map((a) => a())
            i.push(...r)
        }
        return i
    }
    static getMemoryUsage() {
        const e = this._stepCache.size * 1e3,
            t = this._evaluationCache.size * 500,
            i = Array.from(this._performanceMetrics.values()).reduce((n, s) => n + s.length, 0) * 8
        return { cacheMemoryEstimate: e + t, performanceMemoryEstimate: i }
    }
}
;((M._stepCache = new Map()),
    (M._evaluationCache = new Map()),
    (M._maxCacheSize = 1e3),
    (M._performanceMetrics = new Map()),
    (M._logger = f.getInstance({ debugMode: !1, prefix: 'PerformanceUtils' })))
let w = M
function te() {
    const l = crypto.getRandomValues(new Uint8Array(16))
    return `session_${Array.from(l)
        .map((e) => e.toString(16).padStart(2, '0'))
        .join('')}`
}
class ie {
    constructor(e = {}, t) {
        ;((this._flowInfo = {}),
            (this._config = e),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'SessionTracker' })),
            (this._sessionId = e.sessionId || te()))
    }
    getSessionId() {
        return this._sessionId
    }
    setUserId(e) {
        ;((this._config.userId = e), this._logger.debug(`Session user ID set: ${e}`))
    }
    setFlowId(e) {
        ;((this._config.flowId = e), (this._flowInfo.flowId = e), this._logger.debug(`Session flow ID set: ${e}`))
    }
    setFlowInfo(e) {
        ;((this._flowInfo = { ...this._flowInfo, ...e }),
            e.flowId && (this._config.flowId = e.flowId),
            this._logger.debug('Session flow info updated', e))
    }
    getFlowInfo() {
        return Object.freeze({ ...this._flowInfo })
    }
    getUserId() {
        return this._config.userId
    }
    getFlowId() {
        return this._config.flowId || this._flowInfo.flowId
    }
    getConfig() {
        return Object.freeze({ ...this._config })
    }
}
const A = class A {
    constructor(e = {}, t) {
        ;((this._renderTimeEntryOrder = []),
            (this._navigationEntryOrder = []),
            (this._config = e),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'PerformanceTracker' })),
            (this._stepRenderTimes = new Map()),
            (this._navigationTimes = new Map()),
            (this._thresholds = {
                slowStepMs: e.performanceThresholds?.slowStepMs || 3e3,
                slowRenderMs: e.performanceThresholds?.slowRenderMs || 2e3,
            }))
    }
    recordStepRenderTime(e, t) {
        if (
            (this._stepRenderTimes.set(e, t),
            this._renderTimeEntryOrder.push(e),
            this._stepRenderTimes.size > A._MAX_ENTRIES)
        ) {
            const i = this._renderTimeEntryOrder.shift()
            i !== void 0 && this._stepRenderTimes.delete(i)
        }
        this._logger.debug(`Recorded step render time: ${e} = ${t}ms`)
    }
    recordNavigationTime(e, t) {
        if (
            (this._navigationTimes.set(`nav_${e}_${Date.now()}`, t),
            this._navigationEntryOrder.push(`nav_${e}_${Date.now()}`),
            this._navigationTimes.size > A._MAX_ENTRIES)
        ) {
            const i = this._navigationEntryOrder.shift()
            i && this._navigationTimes.delete(i)
        }
        this._logger.debug(`Recorded navigation time: ${e} = ${t}ms`)
    }
    getStepRenderTime(e) {
        return this._stepRenderTimes.get(e)
    }
    getNavigationTimes() {
        return new Map(this._navigationTimes)
    }
    getRenderTimeHistory() {
        return Array.from(this._stepRenderTimes.values())
    }
    isSlowRender(e) {
        return e > this._thresholds.slowRenderMs
    }
    isSlowStep(e) {
        return e > this._thresholds.slowStepMs
    }
    clear() {
        ;(this._stepRenderTimes.clear(),
            this._navigationTimes.clear(),
            (this._renderTimeEntryOrder = []),
            (this._navigationEntryOrder = []),
            this._logger.debug('Performance metrics cleared'))
    }
    getMemoryUsage() {
        if (typeof performance < 'u' && performance.memory) return performance.memory.usedJSHeapSize
    }
    getConnectionType() {
        if (typeof navigator < 'u' && 'connection' in navigator) {
            const e = navigator.connection
            return e?.effectiveType || e?.type
        }
    }
}
A._MAX_ENTRIES = 500
let N = A
class ne {
    constructor(e, t) {
        ;((this._isIdle = !1),
            (this._lastActivityTime = Date.now()),
            (this._awayDuration = 0),
            (this._idleThresholdMs = 3e5),
            (this._logger = e || f.getInstance({ prefix: 'ActivityTracker' })),
            t && (this._idleThresholdMs = t))
    }
    recordActivity() {
        const e = this._isIdle
        ;((this._lastActivityTime = Date.now()),
            (this._isIdle = !1),
            e ? this._logger.debug('User returned from idle state') : this._logger.debug('User activity recorded'))
    }
    recordIdleStart(e) {
        ;((this._isIdle = !0), (this._awayDuration = e), this._logger.debug(`User idle for ${e}ms`))
    }
    recordIdleEnd(e) {
        ;((this._isIdle = !1),
            (this._awayDuration = e),
            (this._lastActivityTime = Date.now()),
            this._logger.debug(`User returned after ${e}ms away`))
    }
    isIdle() {
        return this._isIdle
    }
    getLastActivityTime() {
        return this._lastActivityTime
    }
    getAwayDuration() {
        return this._awayDuration
    }
    getTimeSinceLastActivity() {
        return Date.now() - this._lastActivityTime
    }
    shouldBeIdle() {
        return this.getTimeSinceLastActivity() > this._idleThresholdMs
    }
    reset() {
        ;((this._isIdle = !1),
            (this._lastActivityTime = Date.now()),
            (this._awayDuration = 0),
            this._logger.debug('Activity state reset'))
    }
}
class se {
    constructor(e = [25, 50, 75, 100], t) {
        ;((this._progressMilestones = new Set()),
            (this._milestonePercentages = e),
            (this._logger = t || f.getInstance({ prefix: 'ProgressMilestoneTracker' })))
    }
    calculateFlowProgress(e, t) {
        return t <= 0 ? 0 : Math.round((e / t) * 100)
    }
    checkForNewMilestones(e) {
        const t = []
        for (const i of this._milestonePercentages)
            e >= i &&
                !this._progressMilestones.has(i) &&
                (this._progressMilestones.add(i), t.push(i), this._logger.debug(`Progress milestone reached: ${i}%`))
        return t
    }
    hasMilestoneBeenReached(e) {
        return this._progressMilestones.has(e)
    }
    getReachedMilestones() {
        return Array.from(this._progressMilestones).sort((e, t) => e - t)
    }
    getMilestonePercentages() {
        return [...this._milestonePercentages]
    }
    reset() {
        ;(this._progressMilestones.clear(), this._logger.debug('Progress milestones reset'))
    }
    setMilestonePercentages(e) {
        ;((this._milestonePercentages = e),
            this._progressMilestones.clear(),
            this._logger.debug(`Milestone percentages updated: ${e.join(', ')}%`))
    }
}
class re {
    constructor(e = {}, t) {
        ;((this._providers = []),
            (this._config = {
                enabled: !0,
                samplingRate: 1,
                autoTrack: !0,
                enableProgressMilestones: !0,
                enablePerformanceTracking: !0,
                enableChurnDetection: !0,
                milestonePercentages: [25, 50, 75, 100],
                performanceThresholds: { slowStepMs: 3e3, slowRenderMs: 2e3 },
                ...e,
            }),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'AnalyticsCoordinator' })),
            (this._sessionTracker = new ie(this._config, this._logger)),
            (this._performanceTracker = new N(this._config, this._logger)),
            (this._activityTracker = new ne(this._logger)),
            (this._progressMilestoneTracker = new se(
                this._config.milestonePercentages || [25, 50, 75, 100],
                this._logger
            )),
            e.providers && this._providers.push(...e.providers))
    }
    registerProvider(e) {
        ;(this._providers.push(e), this._logger.debug(`Registered analytics provider: ${e.name}`))
    }
    get providerCount() {
        return this._providers.length
    }
    getSessionId() {
        return this._sessionTracker.getSessionId()
    }
    setUserId(e) {
        this._sessionTracker.setUserId(e)
    }
    setFlowId(e) {
        this._sessionTracker.setFlowId(e)
    }
    setFlowInfo(e) {
        this._sessionTracker.setFlowInfo(e)
    }
    getFlowInfo() {
        return this._sessionTracker.getFlowInfo()
    }
    recordStepRenderTime(e, t) {
        this._performanceTracker.recordStepRenderTime(e, t)
    }
    recordNavigationTime(e, t) {
        this._performanceTracker.recordNavigationTime(e, t)
    }
    getPerformanceMetrics() {
        return {
            stepRenderTimes: this._performanceTracker.getRenderTimeHistory(),
            navigationTimes: this._performanceTracker.getNavigationTimes(),
            memoryUsage: this._performanceTracker.getMemoryUsage(),
            connectionType: this._performanceTracker.getConnectionType(),
        }
    }
    recordActivity() {
        this._activityTracker.recordActivity()
    }
    recordIdleStart(e) {
        this._activityTracker.recordIdleStart(e)
    }
    recordIdleEnd(e) {
        this._activityTracker.recordIdleEnd(e)
    }
    isUserIdle() {
        return this._activityTracker.isIdle()
    }
    getAwayDuration() {
        return this._activityTracker.getAwayDuration()
    }
    calculateFlowProgress(e, t) {
        return this._progressMilestoneTracker.calculateFlowProgress(e, t)
    }
    checkForNewMilestones(e) {
        return this._progressMilestoneTracker.checkForNewMilestones(e)
    }
    trackEvent(e, t = {}) {
        const i = { ...t, ...this._sessionTracker.getFlowInfo() }
        ;(typeof window < 'u' && window.location && window.location.href && (i.pageUrl = window.location.href),
            this._enrichEventWithSessionData(i),
            this._enrichEventWithPerformanceData(i))
        const n = {
            type: e,
            timestamp: Date.now(),
            properties: i,
            sessionId: this._sessionTracker.getSessionId(),
            userId: this._sessionTracker.getUserId(),
            flowId: this._sessionTracker.getFlowId(),
        }
        ;(this._logger.debug(`[AnalyticsCoordinator] Event: "${e}"`, n),
            this._logger.debug('[AnalyticsCoordinator] before_send configured:', !!this._config.before_send))
        let s = n
        if (this._config.before_send) {
            this._logger.debug(`[AnalyticsCoordinator] Calling before_send hook for event: "${e}"`)
            try {
                if (
                    ((s = this._config.before_send(n)),
                    this._logger.debug('[AnalyticsCoordinator] before_send returned:', s),
                    s === null)
                ) {
                    this._logger.debug(`[AnalyticsCoordinator] Event "${e}" dropped by before_send hook.`)
                    return
                }
            } catch (r) {
                ;(this._logger.error('[AnalyticsCoordinator] Error in before_send hook:', r), (s = n))
            }
        }
        if (!(!this._config.enabled || this._providers.length === 0)) {
            if (
                this._config.samplingRate !== void 0 &&
                this._config.samplingRate < 1 &&
                Math.random() > this._config.samplingRate
            ) {
                this._logger.debug(`[AnalyticsCoordinator] Event "${e}" skipped due to sampling.`)
                return
            }
            for (const r of this._providers)
                try {
                    r.trackEvent(s)
                } catch (a) {
                    this._logger.error(`[AnalyticsCoordinator] Error in analytics provider "${r.name}":`, a)
                }
        }
    }
    async flush() {
        for (const e of this._providers)
            if (e.flush)
                try {
                    await e.flush()
                } catch (t) {
                    this._logger.error(`Error flushing provider ${e.name}:`, t)
                }
    }
    _enrichEventWithSessionData(e) {
        typeof window < 'u' &&
            (e.sessionData = {
                userAgent: navigator.userAgent,
                screenResolution: `${screen.width}x${screen.height}`,
                viewportSize: `${window.innerWidth}x${window.innerHeight}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                language: navigator.language,
                platform: navigator.platform,
            })
    }
    _enrichEventWithPerformanceData(e) {
        if (this._config.enablePerformanceTracking) {
            const t = this.getPerformanceMetrics()
            e.performanceMetrics = {
                memoryUsage: t.memoryUsage,
                connectionType: t.connectionType,
                renderTimeHistory: t.stepRenderTimes,
            }
        }
    }
}
class ae {
    constructor(e = {}, t) {
        ;((this._stepStartTimes = new Map()),
            (this._config = e),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'AnalyticsManager' })),
            (this._coordinator = new re(e, this._logger)))
    }
    registerProvider(e) {
        this._coordinator.registerProvider(e)
    }
    get providerCount() {
        return this._coordinator.providerCount
    }
    setUserId(e) {
        this._coordinator.setUserId(e)
    }
    setFlowId(e) {
        this._coordinator.setFlowId(e)
    }
    setFlowInfo(e) {
        this._coordinator.setFlowInfo(e)
    }
    async flush() {
        await this._coordinator.flush()
    }
    trackEvent(e, t = {}) {
        this._coordinator.trackEvent(e, t)
    }
    trackStepViewed(e, t) {
        if (
            (this._stepStartTimes.set(e.id, Date.now()),
            this.trackEvent('step_viewed', {
                stepId: e.id,
                stepType: e.type,
                hasCondition: !!e.condition,
                isSkippable: !!e.isSkippable,
                hasValidation: this._hasValidation(e),
                payloadKeys: Object.keys(e.payload || {}),
                payloadSize: JSON.stringify(e.payload || {}).length,
            }),
            this._config.enableProgressMilestones !== !1)
        ) {
            const i = this._getCompletedStepsCount(t),
                n = this._getTotalSteps(t),
                s = n > 0 ? Math.round((i / n) * 100) : 0
            this._coordinator.checkForNewMilestones(s).forEach((a) => {
                this.trackProgressMilestone(t, a)
            })
        }
    }
    trackStepCompleted(e, t, i, n) {
        const s = this._stepStartTimes.get(e.id),
            r = s ? Date.now() - s : i
        ;(this.trackEvent('step_completed', {
            stepId: e.id,
            stepType: e.type,
            duration: r,
            stepData: this._sanitizeStepData(n || {}),
            completionMethod: this._getCompletionMethod(n),
        }),
            r > 3e3 && this.trackSlowStep(e, t, r),
            this._stepStartTimes.delete(e.id))
    }
    trackStepSkipped(e, t, i = 'user_action') {
        this.trackEvent('step_skipped', {
            stepId: e.id,
            stepType: e.type,
            skipReason: i,
            timeOnStep: this._getTimeOnStep(e.id),
        })
    }
    trackStepRetried(e, t, i) {
        this.trackEvent('step_retried', { stepId: e.id, stepType: e.type, retryCount: i, previousAttempts: i - 1 })
    }
    trackStepValidationFailed(e, t, i) {
        this.trackEvent('step_validation_failed', {
            stepId: e.id,
            stepType: e.type,
            validationErrors: i,
            errorCount: i.length,
        })
    }
    trackStepHelpRequested(e, t, i = 'general') {
        this.trackEvent('step_help_requested', {
            stepId: e.id,
            stepType: e.type,
            helpType: i,
            timeOnStep: this._getTimeOnStep(e.id),
        })
    }
    trackStepAbandoned(e, t, i) {
        this.trackEvent('step_abandoned', {
            stepId: e.id,
            stepType: e.type,
            timeOnStep: i,
            churnRiskScore: this._calculateChurnRisk(t, i),
        })
    }
    trackStepRenderTime(e, t, i) {
        ;(this._coordinator.recordStepRenderTime(e.id, i),
            this.trackEvent('step_render_time', {
                stepId: e.id,
                stepType: e.type,
                renderTime: i,
                isSlowRender: i > 2e3,
            }))
    }
    trackSlowStep(e, t, i) {
        this.trackEvent('step_slow', { stepId: e.id, stepType: e.type, duration: i, threshold: 3e3 })
    }
    trackFlowStarted(e, t = 'fresh') {
        this.trackEvent('flow_started', {
            startMethod: t,
            isResumed: t === 'resumed',
            totalSteps: this._getTotalSteps(e),
            initialFlowDataSize: JSON.stringify(e.flowData).length,
            flowData: this._sanitizeContext(e),
        })
    }
    trackFlowCompleted(e) {
        const t = this._getCompletedStepsCount(e),
            i = this._getTotalSteps(e)
        ;(this.trackEvent('flow_completed', {
            totalSteps: i,
            completedSteps: t,
            skippedSteps: i - t,
            completionRate: i > 0 ? Math.round((t / i) * 100) : 0,
            finalFlowDataSize: JSON.stringify(e.flowData).length,
            flowData: this._sanitizeContext(e),
        }),
            this._stepStartTimes.clear())
    }
    trackFlowPaused(e, t = 'user_action') {
        this.trackEvent('flow_paused', {
            reason: t,
            completedSteps: this._getCompletedStepsCount(e),
            totalSteps: this._getTotalSteps(e),
        })
    }
    trackFlowResumed(e, t) {
        this.trackEvent('flow_resumed', {
            resumePoint: t,
            completedSteps: this._getCompletedStepsCount(e),
            totalSteps: this._getTotalSteps(e),
            timeAwayFromFlow: this._coordinator.getAwayDuration(),
        })
    }
    trackFlowAbandoned(e, t = 'unknown') {
        this.trackEvent('flow_abandoned', {
            abandonmentReason: t,
            completedSteps: this._getCompletedStepsCount(e),
            totalSteps: this._getTotalSteps(e),
        })
    }
    trackFlowReset(e, t = 'user_action') {
        ;(this.trackEvent('flow_reset', {
            resetReason: t,
            previousProgress: this._calculateFlowProgress(e),
            completedStepsBeforeReset: this._getCompletedStepsCount(e),
        }),
            this._stepStartTimes.clear())
    }
    trackNavigationBack(e, t) {
        this.trackEvent('navigation_back', {
            fromStepId: e.id,
            toStepId: t.id,
            fromStepType: e.type,
            toStepType: t.type,
        })
    }
    trackNavigationForward(e, t) {
        this.trackEvent('navigation_forward', {
            fromStepId: e.id,
            toStepId: t.id,
            fromStepType: e.type,
            toStepType: t.type,
        })
    }
    trackNavigationJump(e, t) {
        this.trackEvent('navigation_jump', {
            fromStepId: e.id,
            toStepId: t.id,
            fromStepType: e.type,
            toStepType: t.type,
            navigationDistance: 0,
        })
    }
    trackDataChanged(e, t, i, n) {
        this.trackEvent('data_changed', {
            changedFields: t,
            changedFieldCount: t.length,
            dataSizeBefore: JSON.stringify(i).length,
            dataSizeAfter: JSON.stringify(n).length,
        })
    }
    trackPersistenceSuccess(e, t) {
        this.trackEvent('persistence_success', { persistenceTime: t, dataPersisted: JSON.stringify(e.flowData).length })
    }
    trackPersistenceFailure(e, t) {
        this.trackEvent('persistence_failure', { errorMessage: t.message, errorName: t.name })
    }
    trackUserIdle(e, t, i) {
        ;(this._coordinator.recordIdleStart(i),
            this.trackEvent('user_idle', {
                stepId: e.id,
                stepType: e.type,
                idleDuration: i,
                timeOnStep: this._getTimeOnStep(e.id),
            }))
    }
    trackUserReturned(e, t, i) {
        ;(this._coordinator.recordIdleEnd(i),
            this.trackEvent('user_returned', {
                stepId: e.id,
                stepType: e.type,
                awayDuration: i,
                timeOnStep: this._getTimeOnStep(e.id),
            }))
    }
    trackChecklistItemToggled(e, t, i) {
        this.trackEvent('checklist_item_toggled', { itemId: e, isCompleted: t, stepId: i.id, stepType: i.type })
    }
    trackChecklistProgressChanged(e, t) {
        this.trackEvent('checklist_progress_changed', { stepId: e.id, stepType: e.type, ...t })
    }
    trackErrorEncountered(e, t, i) {
        this.trackEvent('error_encountered', {
            errorMessage: e.message,
            errorStack: e.stack,
            errorName: e.name,
            currentStepId: i,
        })
    }
    trackProgressMilestone(e, t) {
        this.trackEvent('progress_milestone', {
            milestonePercentage: t,
            actualProgress: this._calculateFlowProgress(e),
            stepsCompleted: this._getCompletedStepsCount(e),
            totalSteps: this._getTotalSteps(e),
        })
    }
    _hasValidation(e) {
        return !!(
            e.payload &&
            (e.payload.validation || e.payload.required || e.payload.minSelections || e.payload.maxSelections)
        )
    }
    _getCompletionMethod(e) {
        return e?.completionMethod
            ? e.completionMethod
            : e?.buttonClicked
              ? 'button_click'
              : e?.formSubmitted
                ? 'form_submit'
                : e?.keyPressed
                  ? 'keyboard'
                  : 'unknown'
    }
    _getTimeOnStep(e) {
        const t = this._stepStartTimes.get(e)
        return t ? Date.now() - t : 0
    }
    _calculateFlowProgress(e) {
        const t = this._getTotalSteps(e),
            i = this._getCompletedStepsCount(e)
        return t > 0 ? Math.round((i / t) * 100) : 0
    }
    _calculateChurnRisk(e, t) {
        const i = this._calculateFlowProgress(e),
            n = Math.min(t / 6e4, 10),
            s = Math.max(0, 1 - i / 100)
        return Math.min(1, n * 0.1 + s * 0.9)
    }
    _getTotalSteps(e) {
        return Object.keys(e.flowData._internal?.completedSteps || {}).length || 1
    }
    _getCompletedStepsCount(e) {
        return Object.keys(e.flowData._internal?.completedSteps || {}).length
    }
    _sanitizeContext(e) {
        const t = { ...e }
        return (delete t.currentUser, delete t.apiKeys, delete t.tokens, t)
    }
    _sanitizeStepData(e) {
        const t = { ...e }
        return (
            ['password', 'token', 'apiKey', 'secret', 'creditCard'].forEach((n) => {
                t[n] && (t[n] = '[REDACTED]')
            }),
            t
        )
    }
}
class Ne {
    constructor(e) {
        ;((this.name = 'onboardjs-cloud'),
            (this._queue = []),
            (this._isFlushing = !1),
            (this._logger = f.getInstance({ prefix: '[HttpProvider]' })),
            (this._config = { batchSize: 10, batchInterval: 2e3, ...e }),
            typeof window < 'u' && (this._flushTimer = setInterval(() => this.flush(), this._config.batchInterval)))
    }
    trackEvent(e) {
        ;(this._queue.push(e), this._queue.length >= this._config.batchSize && this.flush())
    }
    async flush() {
        if (this._isFlushing || this._queue.length === 0) return
        this._isFlushing = !0
        const e = [...this._queue]
        this._queue = []
        try {
            if (typeof window > 'u') return
            const t = await fetch(`${this._config.apiHost}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-OnboardJS-Key': this._config.publicKey,
                    ...this._config.headers,
                },
                body: JSON.stringify({ events: e }),
            })
            if (!t.ok) throw new Error(`Analytics API error: ${t.status}`)
        } catch (t) {
            ;((this._queue = [...e, ...this._queue]),
                this._config.debug && this._logger.error('Error sending analytics events:', t))
        } finally {
            this._isFlushing = !1
        }
    }
    dispose() {
        ;(this._flushTimer && clearInterval(this._flushTimer), this.flush())
    }
}
let Oe = 0
class He {
    constructor(e) {
        ;((this._currentStepInternal = null),
            (this._history = []),
            (this._registry = null),
            (this.instanceId = ++Oe),
            (this.flowContext = {
                flowId: e.flowId || null,
                flowName: e.flowName || null,
                flowVersion: e.flowVersion || null,
                flowMetadata: e.flowMetadata || null,
                instanceId: this.instanceId,
                createdAt: Date.now(),
            }),
            (this._logger = f.getInstance({
                debugMode: e.debug,
                prefix: `OnboardingEngine[${this.flowContext.flowId || this.instanceId}]`,
            })))
        const t = x.validateConfig(e)
        if (!t.isValid) throw new Error(`Invalid configuration: ${t.errors.join(', ')}`)
        ;(t.warnings.length > 0 && this._logger.warn('Configuration warnings:', t.warnings),
            (this._config = e),
            (this._steps = e.steps))
        const i = this._config.initialStepId || (this._steps.length > 0 ? this._steps[0].id : null)
        ;((this._contextInternal = x.buildInitialContext(e)),
            (this._eventManager = new Ee()),
            (this._coreEngineService = new V(this._eventManager, this._steps, i, this.flowContext, e.debug)),
            (this._errorHandler = new Ae(this._eventManager, this._coreEngineService)),
            (this._persistenceService = new de(
                e.loadData,
                e.persistData,
                e.clearPersistedData,
                this._errorHandler,
                this._eventManager,
                e.debug
            )),
            (this._checklistManager = new ke(this._eventManager, this._errorHandler)),
            (this._operationQueue = new Y(1)),
            (this._navigationService = new K(
                this._steps,
                this._eventManager,
                this._coreEngineService,
                this._persistenceService,
                this._errorHandler,
                this._logger
            )),
            (this._pluginManager = new X(this, this._eventManager, e.debug)),
            (this._eventRegistry = new Fe(this._eventManager)),
            (this._onFlowComplete = e.onFlowComplete),
            (this._onStepChangeCallback = e.onStepChange),
            this._setupInitializationPromise(),
            this._initializeEngine().catch((n) => {
                ;(this._logger.error('Unhandled error during constructor-initiated initialization:', n),
                    this._rejectInitialization ||
                        this._errorHandler.handleError(n, 'constructor initialization', this._contextInternal))
            }),
            (this._analyticsManager = this._initializeAnalytics(e)),
            this._registerWithRegistry(e))
    }
    _registerWithRegistry(e) {
        !this.flowContext.flowId ||
            !e.registry ||
            ((this._registry = e.registry),
            this._registry.register(this.flowContext.flowId, this),
            this._logger.debug(`Engine registered with provided registry: ${this.flowContext.flowId}`),
            this._eventManager.notifyListeners('flowRegistered', {
                flowInfo: this.getFlowInfo(),
                context: this._contextInternal,
            }))
    }
    _unregisterFromRegistry() {
        if (!this.flowContext.flowId || !this._registry) return
        this._registry.get(this.flowContext.flowId) === this &&
            (this._registry.unregister(this.flowContext.flowId),
            this._logger.debug(`Engine unregistered from provided registry: ${this.flowContext.flowId}`))
    }
    _isRegistered() {
        return !this.flowContext.flowId || !this._registry ? !1 : this._registry.get(this.flowContext.flowId) === this
    }
    _registerWithCurrentRegistry() {
        !this.flowContext.flowId || !this._registry || this._registry.register(this.flowContext.flowId, this)
    }
    _setupInitializationPromise() {
        this._initializationPromise = new Promise((e, t) => {
            ;((this._resolveInitialization = e), (this._rejectInitialization = t))
        })
    }
    async _initializeEngine() {
        return w.measureAsyncPerformance('initializeEngine', async () => {
            ;(this._coreEngineService.setHydrating(!0),
                this._coreEngineService.setLoading(!0),
                this._coreEngineService.setError(null))
            try {
                ;(await this._installPlugins(), this._applyConfigurationHandlers())
                const { data: e, error: t } = await this._loadPersistedData(),
                    i = e?.currentStepId ? 'resumed' : 'fresh'
                ;(this._logger.debug(`[OnboardingEngine] Onboarding Flow started: ${i}`),
                    this._eventManager.notifyListeners('flowStarted', {
                        context: this._contextInternal,
                        startMethod: i,
                    }),
                    this._buildContext(e),
                    t
                        ? (this._coreEngineService.setError(t),
                          (this._currentStepInternal = null),
                          this._coreEngineService.setCompleted(!1),
                          this._eventManager.notifyListeners('error', { error: t, context: this._contextInternal }),
                          this._resolveInitialization())
                        : (await this._navigateToInitialStep(e), this._resolveInitialization()))
            } catch (e) {
                throw (this._handleInitializationError(e), e)
            } finally {
                ;(this._coreEngineService.setHydrating(!1),
                    this._updateLoadingState(),
                    this._coreEngineService.notifyStateChange(
                        this._currentStepInternal,
                        this._contextInternal,
                        this._history
                    ))
            }
        })
    }
    async _navigateToInitialStep(e) {
        const t =
            e?.currentStepId !== void 0
                ? e.currentStepId
                : this._config.initialStepId || (this._steps.length > 0 ? this._steps[0].id : null)
        ;(this._logger.debug(
            'Effective initial step ID:',
            t,
            'Available steps:',
            this._steps.map((i) => i.id)
        ),
            t && this._steps.length > 0
                ? this._steps.find((n) => n.id === t)
                    ? ((this._currentStepInternal = await this._navigationService.navigateToStep(
                          t,
                          'initial',
                          this._currentStepInternal,
                          this._contextInternal,
                          this._history,
                          this._onStepChangeCallback,
                          this._onFlowComplete
                      )),
                      this._logger.debug('Navigated to step:', this._currentStepInternal?.id))
                    : (this._logger.warn(`Initial step '${t}' not found. Falling back to first step.`),
                      (this._currentStepInternal = await this._navigationService.navigateToStep(
                          this._steps[0].id,
                          'initial',
                          this._currentStepInternal,
                          this._contextInternal,
                          this._history,
                          this._onStepChangeCallback,
                          this._onFlowComplete
                      )))
                : this._steps.length === 0
                  ? (this._logger.debug('No steps available, marking as completed'),
                    (this._currentStepInternal = null),
                    this._coreEngineService.setCompleted(!0))
                  : e?.currentStepId === null
                    ? (this._logger.debug('Loaded completed flow state. Marking as completed'),
                      (this._currentStepInternal = null),
                      this._coreEngineService.setCompleted(!0))
                    : (this._logger.warn('No effective initial step ID determined'),
                      (this._currentStepInternal = null),
                      this._coreEngineService.setCompleted(!1)))
    }
    async _installPlugins() {
        if (this._config.plugins && this._config.plugins.length > 0)
            for (const e of this._config.plugins)
                try {
                    await this._pluginManager.install(e)
                } catch (t) {
                    const i = t instanceof Error ? t.message : String(t),
                        n = `Plugin installation failed for "${e.name}": ${i}`
                    throw (this._logger.error(n), new Error(n))
                }
    }
    _applyConfigurationHandlers() {
        ;(this._config.loadData !== void 0 &&
            !this._persistenceService.getDataLoadHandler() &&
            this._persistenceService.setDataLoadHandler(this._config.loadData),
            this._config.persistData !== void 0 &&
                !this._persistenceService.getDataPersistHandler() &&
                this._persistenceService.setDataPersistHandler(this._config.persistData),
            this._config.clearPersistedData !== void 0 &&
                !this._persistenceService.getClearPersistedDataHandler() &&
                this._persistenceService.setClearPersistedDataHandler(this._config.clearPersistedData),
            this._config.onFlowComplete !== void 0 &&
                !this._onFlowComplete &&
                (this._onFlowComplete = this._config.onFlowComplete),
            this._config.onStepChange !== void 0 &&
                !this._onStepChangeCallback &&
                (this._onStepChangeCallback = this._config.onStepChange))
    }
    _loadPersistedData() {
        try {
            return this._persistenceService.loadPersistedData()
        } catch (e) {
            throw (this._errorHandler.handleError(e, 'loadPersistedData', this._contextInternal), e)
        }
    }
    _buildContext(e) {
        let t = x.buildInitialContext(this._config)
        if (e) {
            const { flowData: i, currentStepId: n, ...s } = e
            ;((t = { ...t, ...s }),
                (t.flowData = { ...t.flowData, ...(i || {}) }),
                t.flowData._internal
                    ? (t.flowData._internal.completedSteps || (t.flowData._internal.completedSteps = {}),
                      t.flowData._internal.startedAt || (t.flowData._internal.startedAt = Date.now()),
                      t.flowData._internal.stepStartTimes || (t.flowData._internal.stepStartTimes = {}))
                    : (t.flowData._internal = { completedSteps: {}, startedAt: Date.now(), stepStartTimes: {} }))
        }
        this._contextInternal = t
    }
    _handleInitializationError(e) {
        const t = e instanceof Error ? e : new Error(String(e))
        ;(this._logger.error('Critical error during engine initialization:', t),
            this._coreEngineService.setError(t),
            (this._currentStepInternal = null),
            this._rejectInitialization(t))
    }
    _updateLoadingState() {
        ;(this._coreEngineService.error ||
            this._coreEngineService.isCompleted ||
            (!this._currentStepInternal && this._coreEngineService.isLoading)) &&
            this._coreEngineService.setLoading(!1)
    }
    async ready() {
        return this._initializationPromise
    }
    async use(e) {
        try {
            await this._pluginManager.install(e)
        } catch (t) {
            throw (this._logger.error(`Failed to install plugin "${e.name}" via use():`, t), t)
        }
        return this
    }
    getState() {
        return this._coreEngineService.getState(this._currentStepInternal, this._contextInternal, this._history)
    }
    async next(e) {
        return this._operationQueue.enqueue(async () => {
            ;((this._currentStepInternal = await this._navigationService.next(
                this._currentStepInternal,
                e,
                this._contextInternal,
                this._history,
                this._onStepChangeCallback,
                this._onFlowComplete
            )),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        })
    }
    async previous() {
        if (this._coreEngineService.isLoading) {
            this._logger.debug('previous(): Ignoring - engine is loading')
            return
        }
        return this._operationQueue.enqueue(async () => {
            ;((this._currentStepInternal = await this._navigationService.previous(
                this._currentStepInternal,
                this._contextInternal,
                this._history,
                this._onStepChangeCallback,
                this._onFlowComplete
            )),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        })
    }
    async skip() {
        return this._operationQueue.enqueue(async () => {
            ;((this._currentStepInternal = await this._navigationService.skip(
                this._currentStepInternal,
                this._contextInternal,
                this._history,
                this._onStepChangeCallback,
                this._onFlowComplete
            )),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        })
    }
    async goToStep(e, t) {
        return this._operationQueue.enqueue(async () => {
            ;((this._currentStepInternal = await this._navigationService.goToStep(
                e,
                t,
                this._currentStepInternal,
                this._contextInternal,
                this._history,
                this._onStepChangeCallback,
                this._onFlowComplete
            )),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        })
    }
    async updateContext(e) {
        return this._operationQueue.enqueue(async () => {
            const t = { ...this._contextInternal },
                i = JSON.stringify(this._contextInternal),
                { flowData: n, ...s } = e
            ;((this._contextInternal = { ...this._contextInternal, ...s }),
                n && (this._contextInternal.flowData = { ...(this._contextInternal.flowData || {}), ...n }))
            const r = JSON.stringify(this._contextInternal)
            i !== r &&
                (this._logger.debug('Context updated:', i, '=>', r),
                this._eventManager.notifyListeners('contextUpdate', {
                    oldContext: t,
                    newContext: this._contextInternal,
                }),
                await this._persistenceService.persistDataIfNeeded(
                    this._contextInternal,
                    this._currentStepInternal?.id || null,
                    this._coreEngineService.isHydrating
                ),
                this._logger.debug('Notifying full state change after context update.'),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        })
    }
    async updateChecklistItem(e, t, i) {
        return this._operationQueue.enqueue(async () => {
            const n = i ? y(this._steps, i) : this._currentStepInternal
            if (!n || n.type !== 'CHECKLIST') {
                const s = new Error('Target step for checklist item update is invalid.')
                ;(this._logger.error(
                    `Cannot update checklist item: Step '${i || this._currentStepInternal?.id}' not found or not a CHECKLIST step.`
                ),
                    this._coreEngineService.setError(s))
                return
            }
            await this._checklistManager.updateChecklistItem(e, t, n, this._contextInternal, async () => {
                await this._persistenceService.persistDataIfNeeded(
                    this._contextInternal,
                    this._currentStepInternal?.id || null,
                    this._coreEngineService.isHydrating
                )
            })
        })
    }
    async reset(e) {
        this._logger.debug('Resetting engine...')
        const t = e ? 'configuration_change' : 'manual_reset'
        this._eventManager.notifyListeners('flowReset', { context: this._contextInternal, resetReason: t })
        const i = this._persistenceService.getClearPersistedDataHandler()
        if (
            (await this._pluginManager.cleanup(),
            this._operationQueue.clear(),
            e &&
                (this.flowContext.flowId &&
                    e.flowId &&
                    this.flowContext.flowId !== e.flowId &&
                    this._unregisterFromRegistry(),
                (this._config = x.mergeConfigs(this._config, e)),
                e.flowId !== void 0 && (this.flowId = e.flowId),
                e.flowName !== void 0 && (this.flowName = e.flowName),
                e.flowVersion !== void 0 && (this.flowVersion = e.flowVersion),
                e.flowMetadata !== void 0 && (this.flowMetadata = e.flowMetadata)),
            (this._steps = this._config.steps || []),
            i)
        )
            try {
                ;(this._logger.debug('reset: Clearing persisted data using the handler active before reset...'),
                    await i())
            } catch (n) {
                ;(this._logger.error('reset: Error during clearPersistedData:', n),
                    this._errorHandler.handleError(n, 'clearPersistedData', this._contextInternal))
            }
        ;((this._currentStepInternal = null),
            (this._history = []),
            (this._contextInternal = x.buildInitialContext(this._config)),
            (this._coreEngineService = new V(
                this._eventManager,
                this._steps,
                this._config.initialStepId || (this._steps.length > 0 ? this._steps[0].id : null),
                this.flowContext,
                this._config.debug
            )),
            this._coreEngineService.setLoading(!1),
            this._coreEngineService.setHydrating(!1),
            this._coreEngineService.setError(null),
            this._coreEngineService.setCompleted(!1),
            this._persistenceService.setDataLoadHandler(void 0),
            this._persistenceService.setDataPersistHandler(void 0),
            this._persistenceService.setClearPersistedDataHandler(void 0),
            (this._onFlowComplete = void 0),
            (this._onStepChangeCallback = void 0),
            (this._navigationService = new K(
                this._steps,
                this._eventManager,
                this._coreEngineService,
                this._persistenceService,
                this._errorHandler,
                this._logger
            )),
            this.flowContext.flowId &&
                (this._registerWithCurrentRegistry(),
                this._logger.debug(`Engine re-registered with flowId: ${this.flowContext.flowId}`)),
            w.clearCaches(),
            this._setupInitializationPromise())
        try {
            ;(await this._initializeEngine(),
                this._logger.debug('Reset: Re-initialization complete.'),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        } catch (n) {
            this._logger.error("Error during reset's re-initialization:", n)
            const s = n instanceof Error ? n : new Error(String(n))
            ;(this._coreEngineService.setError(s),
                this._coreEngineService.notifyStateChange(
                    this._currentStepInternal,
                    this._contextInternal,
                    this._history
                ))
        }
        this._logger.debug('Engine reset process finished.')
    }
    addEventListener(e, t) {
        return this._eventRegistry.addEventListener(e, t)
    }
    addBeforeStepChangeListener(e) {
        return this._eventRegistry.addBeforeStepChangeListener(e)
    }
    addAfterStepChangeListener(e) {
        return this._eventRegistry.addAfterStepChangeListener(e)
    }
    addStepActiveListener(e) {
        return this._eventRegistry.addStepActiveListener(e)
    }
    addStepCompletedListener(e) {
        return this._eventRegistry.addStepCompletedListener(e)
    }
    addFlowCompletedListener(e) {
        return this._eventRegistry.addFlowCompletedListener(e)
    }
    addContextUpdateListener(e) {
        return this._eventRegistry.addContextUpdateListener(e)
    }
    addErrorListener(e) {
        return this._eventRegistry.addErrorListener(e)
    }
    addFlowRegisteredListener(e) {
        return this.addEventListener('flowRegistered', e)
    }
    addFlowUnregisteredListener(e) {
        return this.addEventListener('flowUnregistered', e)
    }
    getFlowInfo() {
        return { ...this.flowContext }
    }
    getFlowId() {
        return this.flowContext.flowId
    }
    getFlowVersion() {
        return this.flowContext.flowVersion
    }
    getFlowName() {
        return this.flowContext.flowName
    }
    getFlowMetadata() {
        return this.flowContext.flowMetadata
    }
    getInstanceId() {
        return this.instanceId
    }
    generatePersistenceKey(e = 'onboarding') {
        const t = [e]
        return (
            this.flowContext.flowId
                ? t.push(this.flowContext.flowId)
                : this.flowContext.flowName && t.push(this.flowContext.flowName.replace(/\s+/g, '_').toLowerCase()),
            this.flowContext.flowVersion && t.push(`v${this.flowContext.flowVersion}`),
            t.join('_')
        )
    }
    matchesFlow(e) {
        return this.flowContext.flowId === e
    }
    isVersionCompatible(e) {
        if (!this.flowContext.flowVersion) return !1
        const t = this.flowContext.flowVersion.split('.')[0],
            i = e.split('.')[0]
        return t === i
    }
    setDataLoadHandler(e) {
        this._persistenceService.setDataLoadHandler(e)
    }
    setDataPersistHandler(e) {
        this._persistenceService.setDataPersistHandler(e)
    }
    setClearPersistedDataHandler(e) {
        this._persistenceService.setClearPersistedDataHandler(e)
    }
    get stateManager() {
        return (
            this._config.debug &&
                this._logger.warn(
                    'DEPRECATED: Accessing `stateManager` directly is deprecated. The engine now uses `CoreEngineService` internally. This property is provided for backward compatibility and will be removed in v2.0.'
                ),
            this._coreEngineService
        )
    }
    getSteps() {
        return [...this._steps]
    }
    getStepIndex(e) {
        return this._coreEngineService.getRelevantSteps(this._contextInternal).findIndex((t) => t.id === e)
    }
    getRelevantSteps() {
        return this._coreEngineService.getRelevantSteps(this._contextInternal)
    }
    getPerformanceStats() {
        const e = ['initializeEngine', 'navigateToStep', 'next', 'previous', 'skip', 'updateContext'].reduce((t, i) => {
            const n = w.getPerformanceStats(i)
            return (n && (t[i] = n), t)
        }, {})
        return {
            cache: w.getCacheStats(),
            memory: w.getMemoryUsage(),
            queue: this._operationQueue.getStats(),
            operations: e,
        }
    }
    getErrorHistory() {
        return this._errorHandler.getErrorHistory()
    }
    reportError(e, t) {
        this._errorHandler.handleError(e, t, this._contextInternal)
    }
    getChecklistProgress() {
        return !this._currentStepInternal || this._currentStepInternal.type !== 'CHECKLIST'
            ? null
            : this._checklistManager.getChecklistProgress(this._currentStepInternal, this._contextInternal)
    }
    reportStepValidationFailure(e, t) {
        this._eventManager.notifyListeners('stepValidationFailed', {
            step: e,
            context: this._contextInternal,
            validationErrors: t,
        })
    }
    reportHelpRequest(e) {
        this._currentStepInternal &&
            this._eventManager.notifyListeners('stepHelpRequested', {
                step: this._currentStepInternal,
                context: this._contextInternal,
                helpType: e,
            })
    }
    getContext() {
        return { ...this._contextInternal }
    }
    clearCaches() {
        ;(w.clearCaches(), this._errorHandler.clearErrorHistory())
    }
    pauseFlow(e = 'user_action') {
        this._eventManager.notifyListeners('flowPaused', { context: this._contextInternal, reason: e })
    }
    resumeFlow(e = 'current_step') {
        this._eventManager.notifyListeners('flowResumed', { context: this._contextInternal, resumePoint: e })
    }
    abandonFlow(e = 'user_action') {
        this._eventManager.notifyListeners('flowAbandoned', { context: this._contextInternal, abandonmentReason: e })
    }
    abandonStep(e) {
        if (this._currentStepInternal) {
            const t = e || this._getTimeOnCurrentStep()
            this._eventManager.notifyListeners('stepAbandoned', {
                step: this._currentStepInternal,
                context: this._contextInternal,
                timeOnStep: t,
            })
        }
    }
    retryStep(e = 1) {
        this._currentStepInternal &&
            this._eventManager.notifyListeners('stepRetried', {
                step: this._currentStepInternal,
                context: this._contextInternal,
                retryCount: e,
            })
    }
    _getTimeOnCurrentStep() {
        if (!this._currentStepInternal) return 0
        const e = this._contextInternal.flowData._internal?.stepStartTimes?.[this._currentStepInternal.id]
        return e ? Date.now() - e : 0
    }
    _initializeAnalytics(e) {
        let t = { enabled: !1 }
        ;(typeof e.analytics == 'boolean' ? (t.enabled = e.analytics) : e.analytics && (t = e.analytics),
            e.publicKey &&
                e.apiHost &&
                (t.providers || (t.providers = []),
                (t.enabled = !0),
                t.providers.push(new Ne({ publicKey: e.publicKey, apiHost: e.apiHost, debug: e.debug }))))
        const i = new ae(t, this._logger)
        ;(i.setFlowInfo({
            flowId: this.flowContext.flowId || void 0,
            flowName: this.flowContext.flowName || void 0,
            flowVersion: this.flowContext.flowVersion || void 0,
            flowMetadata: this.flowContext.flowMetadata || void 0,
            instanceId: this.instanceId,
        }),
            this._config.userId && i.setUserId(this._config.userId),
            t.enabled &&
                i.providerCount === 0 &&
                this._logger.warn(
                    '[Analytics] Analytics tracking is enabled, but no external analytics providers were configured. Events will be tracked internally (e.g., logged to console in debug mode) but will NOT be sent to any external service. To enable sending, please either: \n1. Provide `config.apiKey` and `config.apiHost` for OnboardJS Cloud integration. \n2. Add custom providers to `config.analytics.providers`'
                ))
        const n = t.autoTrack ?? !0,
            s = t.enabled && (n === !0 || (typeof n == 'object' && n.steps !== !1))
        return (
            this._logger.debug(`[Analytics Init] analyticsConfig.enabled: ${t.enabled}`),
            this._logger.debug(`[Analytics Init] before_send present: ${!!t.before_send}`),
            this._logger.debug(`[Analytics Init] shouldSetupListeners: ${s}`),
            s
                ? (this._logger.debug('[Analytics Init] Setting up analytics event listeners'),
                  this._setupAnalyticsEventListeners(i))
                : this._logger.debug('Auto-tracking analytics events is disabled or analytics is not enabled.'),
            i
        )
    }
    _setupAnalyticsEventListeners(e) {
        ;(this.addEventListener('stepActive', (t) => {
            e.trackStepViewed(t.step, t.context)
        }),
            this.addEventListener('stepCompleted', (t) => {
                const i = t.context.flowData?._internal?.stepStartTimes?.[t.step.id] || 0,
                    n = i ? Date.now() - i : 0
                e.trackStepCompleted(t.step, t.context, n, t.stepData)
            }),
            this.addEventListener('stepSkipped', (t) => {
                e.trackStepSkipped(t.step, t.context, t.skipReason)
            }),
            this.addEventListener('stepValidationFailed', (t) => {
                e.trackStepValidationFailed(t.step, t.context, t.validationErrors)
            }),
            this.addEventListener('stepHelpRequested', (t) => {
                e.trackStepHelpRequested(t.step, t.context, t.helpType)
            }),
            this.addEventListener('flowStarted', (t) => {
                e.trackFlowStarted(t.context, t.startMethod)
            }),
            this.addEventListener('flowCompleted', (t) => {
                ;(e.trackFlowCompleted(t.context), e.flush())
            }),
            this.addEventListener('flowReset', (t) => {
                e.trackFlowReset(t.context, t.resetReason)
            }),
            this.addEventListener('flowPaused', (t) => {
                e.trackFlowPaused(t.context, t.reason)
            }),
            this.addEventListener('flowResumed', (t) => {
                e.trackFlowResumed(t.context, t.resumePoint)
            }),
            this.addEventListener('flowAbandoned', (t) => {
                e.trackFlowAbandoned(t.context, t.abandonmentReason)
            }),
            this.addEventListener('stepAbandoned', (t) => {
                e.trackStepAbandoned(t.step, t.context, t.timeOnStep)
            }),
            this.addEventListener('stepRetried', (t) => {
                e.trackStepRetried(t.step, t.context, t.retryCount)
            }),
            this.addEventListener('navigationBack', (t) => {
                e.trackNavigationBack(t.fromStep, t.toStep)
            }),
            this.addEventListener('navigationForward', (t) => {
                e.trackNavigationForward(t.fromStep, t.toStep)
            }),
            this.addEventListener('navigationJump', (t) => {
                e.trackNavigationJump(t.fromStep, t.toStep)
            }),
            this.addEventListener('contextUpdate', (t) => {
                const i = this._getChangedFields(t.oldContext, t.newContext)
                e.trackDataChanged(t.newContext, i, t.oldContext.flowData, t.newContext.flowData)
            }),
            this.addEventListener('userIdle', (t) => {
                e.trackUserIdle(t.step, t.context, t.idleDuration)
            }),
            this.addEventListener('userReturned', (t) => {
                e.trackUserReturned(t.step, t.context, t.awayDuration)
            }),
            this.addEventListener('persistenceFailure', (t) => {
                e.trackPersistenceFailure(t.context, t.error)
            }),
            this.addEventListener('error', (t) => {
                e.trackErrorEncountered(t.error, t.context)
            }),
            this.addEventListener('flowRegistered', (t) => {
                e.trackEvent('flow_registered', { flowInfo: t.flowInfo, timestamp: Date.now() })
            }),
            this.addEventListener('flowUnregistered', (t) => {
                e.trackEvent('flow_unregistered', { flowInfo: t.flowInfo, timestamp: Date.now() })
            }),
            this.addEventListener('pluginInstalled', (t) => {
                e.trackEvent('plugin_installed', { pluginName: t.pluginName, timestamp: Date.now() })
            }),
            this.addEventListener('pluginError', (t) => {
                e.trackEvent('plugin_error', {
                    pluginName: t.pluginName,
                    errorMessage: t.error.message,
                    timestamp: Date.now(),
                })
            }))
    }
    _getChangedFields(e, t) {
        const i = [],
            n = e.flowData,
            s = t.flowData
        return (
            new Set([...Object.keys(n), ...Object.keys(s)]).forEach((a) => {
                if (a === '_internal') return
                const o = JSON.stringify(n[a]),
                    c = JSON.stringify(s[a])
                o !== c && i.push(a)
            }),
            i
        )
    }
    trackEvent(e, t = {}) {
        this._analyticsManager.trackEvent(e, t)
    }
    trackCustomEvent(e, t = {}, i = {}) {
        const {
                includeStepContext: n = !0,
                includeFlowProgress: s = !0,
                includeContextData: r = !1,
                category: a = 'custom',
                priority: o = 'normal',
            } = i,
            c = { ...t, category: a, priority: o, timestamp: Date.now() }
        if (
            (n &&
                this._currentStepInternal &&
                (c.stepContext = {
                    currentStepId: this._currentStepInternal.id,
                    currentStepType: this._currentStepInternal.type,
                    stepIndex: this.getStepIndex(this._currentStepInternal.id),
                    isFirstStep: this.getStepIndex(this._currentStepInternal.id) === 0,
                    isLastStep: this.getStepIndex(this._currentStepInternal.id) === this.getRelevantSteps().length - 1,
                }),
            s)
        ) {
            const d = this.getRelevantSteps(),
                h = this._currentStepInternal ? this.getStepIndex(this._currentStepInternal.id) : -1
            c.flowProgress = {
                totalSteps: d.length,
                currentStepNumber: h + 1,
                progressPercentage: d.length > 0 ? Math.round(((h + 1) / d.length) * 100) : 0,
                isCompleted: this._coreEngineService.isCompleted,
            }
        }
        ;(r && (c.contextData = this._sanitizeContextForAnalytics(this._contextInternal)),
            this._analyticsManager.trackEvent(`custom.${e}`, c))
    }
    _sanitizeContextForAnalytics(e) {
        const t = { ...e }
        if (
            (delete t.apiKeys, delete t.tokens, delete t.password, delete t.secret, t.flowData && t.flowData._internal)
        ) {
            const i = { ...t.flowData }
            ;(delete i._internal, (t.flowData = i))
        }
        return t
    }
    registerAnalyticsProvider(e) {
        this._analyticsManager.registerProvider(e)
    }
    flushAnalytics() {
        return this._analyticsManager.flush()
    }
    setAnalyticsUserId(e) {
        ;((this._config.userId = e), this._analyticsManager.setUserId(e))
    }
    async destroy() {
        ;(this._logger.debug('Destroying engine...'),
            this.flowContext.flowId &&
                this._isRegistered() &&
                this._eventManager.notifyListeners('flowUnregistered', {
                    flowInfo: this.getFlowInfo(),
                    context: this._contextInternal,
                }),
            this._unregisterFromRegistry(),
            await this._pluginManager.cleanup(),
            this._operationQueue.clear(),
            w.clearCaches(),
            this._logger.debug('Engine destroyed.'))
    }
    getDebugInfo() {
        return {
            flowInfo: this.getFlowInfo(),
            currentStep: this._currentStepInternal,
            context: this._contextInternal,
            history: [...this._history],
            state: this.getState(),
            performance: this.getPerformanceStats(),
            errors: this._errorHandler.getRecentErrors(5),
            config: this._config,
        }
    }
}
class oe {
    constructor() {
        this._engines = new Map()
    }
    register(e, t) {
        ;(this._engines.has(e) &&
            console.warn(
                `[OnboardingEngineRegistry] Overwriting existing engine with flowId: ${e}. Consider using a unique flowId for each engine instance.`
            ),
            this._engines.set(e, t))
    }
    unregister(e) {
        return this._engines.delete(e)
    }
    get(e) {
        return this._engines.get(e)
    }
    has(e) {
        return this._engines.has(e)
    }
    getAll() {
        return Array.from(this._engines.values())
    }
    getFlowIds() {
        return Array.from(this._engines.keys())
    }
    getByVersion(e) {
        return Array.from(this._engines.values()).filter((t) => t.isVersionCompatible(e))
    }
    query(e) {
        let t = Array.from(this._engines.values())
        return (
            e.flowName && (t = t.filter((i) => i.getFlowName() === e.flowName)),
            e.versionPattern && (t = t.filter((i) => i.isVersionCompatible(e.versionPattern))),
            t
        )
    }
    getStats() {
        const e = Array.from(this._engines.values()),
            t = {},
            i = {}
        return (
            e.forEach((n) => {
                const s = n.getFlowName() || 'unnamed',
                    r = n.getFlowVersion() || 'unversioned'
                ;((t[s] = (t[s] || 0) + 1), (i[r] = (i[r] || 0) + 1))
            }),
            { totalEngines: e.length, enginesByFlow: t, enginesByVersion: i }
        )
    }
    clear() {
        this._engines.clear()
    }
    get size() {
        return this._engines.size
    }
    forEach(e) {
        this._engines.forEach((t, i) => e(t, i))
    }
    getAllFlowInfo() {
        return Array.from(this._engines.values()).map((e) => e.getFlowInfo())
    }
}
function Re() {
    return new oe()
}
const T = class T {
    static generatePersistenceKey(e, t = 'onboarding') {
        const i = [t],
            n = e.getFlowId(),
            s = e.getFlowName(),
            r = e.getFlowVersion()
        return (n ? i.push(n) : s && i.push(s.replace(/\s+/g, '_').toLowerCase()), r && i.push(`v${r}`), i.join('_'))
    }
    static getEnginesByPattern(e, t) {
        return t
            .getAll()
            .filter(
                (n) =>
                    !(
                        (e.flowId && n.getFlowId() !== e.flowId) ||
                        (e.flowName && n.getFlowName() !== e.flowName) ||
                        (e.flowVersion && n.getFlowVersion() !== e.flowVersion)
                    )
            )
    }
    static getLatestVersionByFlowName(e, t) {
        const i = T.getEnginesByPattern({ flowName: e }, t)
        return i.length === 0
            ? null
            : (i.sort((n, s) => {
                  const r = n.getFlowVersion() || '0.0.0'
                  return (s.getFlowVersion() || '0.0.0').localeCompare(r)
              }),
              i[0])
    }
    static areFlowsCompatible(e, t) {
        if (
            !(
                (e.getFlowId() && e.getFlowId() === t.getFlowId()) ||
                (e.getFlowName() && e.getFlowName() === t.getFlowName())
            )
        )
            return !1
        const n = e.getFlowVersion(),
            s = t.getFlowVersion()
        if (!n || !s) return !0
        const r = n.split('.')[0],
            a = s.split('.')[0]
        return r === a
    }
    static createFlowAwarePersistence(e) {
        const t = T.generatePersistenceKey(e)
        return {
            async load() {
                try {
                    const i = localStorage.getItem(t)
                    return i ? JSON.parse(i) : null
                } catch (i) {
                    return (T._logger.error(`Error loading data for ${t}:`, i), null)
                }
            },
            async save(i, n) {
                try {
                    const s = { ...i, currentStepId: n, savedAt: Date.now(), flowInfo: e.getFlowInfo() }
                    localStorage.setItem(t, JSON.stringify(s))
                } catch (s) {
                    T._logger.error(`Error saving data for ${t}:`, s)
                }
            },
            async clear() {
                try {
                    localStorage.removeItem(t)
                } catch (i) {
                    T._logger.error(`Error clearing data for ${t}:`, i)
                }
            },
            getKey() {
                return t
            },
        }
    }
}
T._logger = f.getInstance({ prefix: '[FlowUtils]' })
let z = T
class $e {
    constructor(e) {
        ;((this._unsubscribeFunctions = []), (this.config = e))
    }
    async install(e) {
        return (
            (this.engine = e),
            this.setupHooks(),
            await this.onInstall(),
            async () => {
                ;(await this.onUninstall(), this._cleanup())
            }
        )
    }
    setupHooks() {
        const e = this.getHooks(),
            t = {
                beforeStepChange: 'addBeforeStepChangeListener',
                afterStepChange: 'addAfterStepChangeListener',
                onStepActive: 'addStepActiveListener',
                onStepCompleted: 'addStepCompletedListener',
                onFlowCompleted: 'addFlowCompletedListener',
                onContextUpdate: 'addContextUpdateListener',
                onError: 'addErrorListener',
                onFlowStarted: 'addEventListener',
                onFlowPaused: 'addEventListener',
                onFlowResumed: 'addEventListener',
                onFlowAbandoned: 'addEventListener',
                onFlowReset: 'addEventListener',
                onStepStarted: 'addEventListener',
                onStepSkipped: 'addEventListener',
                onStepRetried: 'addEventListener',
                onStepValidationFailed: 'addEventListener',
                onStepHelpRequested: 'addEventListener',
                onStepAbandoned: 'addEventListener',
                onNavigationBack: 'addEventListener',
                onNavigationForward: 'addEventListener',
                onNavigationJump: 'addEventListener',
                onUserIdle: 'addEventListener',
                onUserReturned: 'addEventListener',
                onDataChanged: 'addEventListener',
                onStepRenderTime: 'addEventListener',
                onPersistenceSuccess: 'addEventListener',
                onPersistenceFailure: 'addEventListener',
                onChecklistItemToggled: 'addEventListener',
                onChecklistProgressChanged: 'addEventListener',
                onPluginInstalled: 'addEventListener',
                onPluginError: 'addEventListener',
            }
        for (const [i, n] of Object.entries(e))
            if (typeof n == 'function' && t[i])
                if (t[i] === 'addEventListener') {
                    const s = i.replace(/^on/, ''),
                        r = s.charAt(0).toLowerCase() + s.slice(1),
                        a = this.engine.addEventListener(r, n)
                    this._unsubscribeFunctions.push(a)
                } else {
                    const r = this.engine[t[i]].call(this.engine, n)
                    this._unsubscribeFunctions.push(r)
                }
    }
    _cleanup() {
        ;(this._unsubscribeFunctions.forEach((e) => e()), (this._unsubscribeFunctions = []))
    }
    getHooks() {
        return {}
    }
    async onInstall() {}
    async onUninstall() {}
    getConfig() {
        return this.config
    }
    updateConfig(e) {
        this.config = { ...this.config, ...e }
    }
}
const F = class F {
    static toJSON(e, t = {}) {
        const i = { ...this._DEFAULT_OPTIONS, ...t },
            n = [],
            s = []
        try {
            if (i.validateSteps) {
                const c = this._validateSteps(e)
                if ((n.push(...c.errors), s.push(...c.warnings), c.errors.length > 0 && !i.includeValidationErrors))
                    return { success: !1, errors: n, warnings: s }
            }
            const r = e.map((c, d) => this._serializeStep(c, d, i, n, s)),
                a = {
                    version: this._VERSION,
                    steps: r,
                    metadata: {
                        exportedAt: new Date().toISOString(),
                        totalSteps: e.length,
                        stepTypes: [...new Set(e.map((c) => c.type || 'INFORMATION'))],
                        hasCustomComponents: e.some((c) => c.type === 'CUSTOM_COMPONENT'),
                        hasFunctions: this._hasAnyFunctions(e),
                    },
                },
                o = i.prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a)
            return { success: n.length === 0, data: o, errors: n, warnings: s }
        } catch (r) {
            return (
                n.push(`Serialization failed: ${r instanceof Error ? r.message : String(r)}`),
                { success: !1, errors: n, warnings: s }
            )
        }
    }
    static fromJSON(e, t = {}) {
        const i = { ...this._DEFAULT_OPTIONS, ...t },
            n = [],
            s = []
        try {
            const r = JSON.parse(e),
                a = this._validateSchema(r)
            if ((n.push(...a.errors), s.push(...a.warnings), a.errors.length > 0))
                return { success: !1, errors: n, warnings: s }
            const o = r.steps.map((c, d) => this._deserializeStep(c, d, i, n, s)).filter((c) => c !== null)
            if (i.validateSteps) {
                const c = this._validateSteps(o)
                ;(n.push(...c.errors), s.push(...c.warnings))
            }
            return { success: n.length === 0, data: o, errors: n, warnings: s }
        } catch (r) {
            return (
                n.push(`Deserialization failed: ${r instanceof Error ? r.message : String(r)}`),
                { success: !1, errors: n, warnings: s }
            )
        }
    }
    static _serializeStep(e, t, i, n, s) {
        try {
            const r = { id: e.id }
            return (
                e.type && (r.type = e.type),
                (r.nextStep = this._serializeStepProperty(e.nextStep, 'nextStep', e.id, i)),
                (r.previousStep = this._serializeStepProperty(e.previousStep, 'previousStep', e.id, i)),
                e.isSkippable !== void 0 &&
                    ((r.isSkippable = e.isSkippable),
                    e.isSkippable &&
                        e.skipToStep !== void 0 &&
                        (r.skipToStep = this._serializeStepProperty(e.skipToStep, 'skipToStep', e.id, i))),
                e.onStepActive &&
                    i.functionHandling !== 'omit' &&
                    (r.onStepActive = this._serializeFunction(e.onStepActive, 'onStepActive', e.id, i)),
                e.onStepComplete &&
                    i.functionHandling !== 'omit' &&
                    (r.onStepComplete = this._serializeFunction(e.onStepComplete, 'onStepComplete', e.id, i)),
                e.condition &&
                    i.functionHandling !== 'omit' &&
                    (r.condition = this._serializeFunction(e.condition, 'condition', e.id, i)),
                e.payload && (r.payload = this._serializePayload(e, i, n, s)),
                i.includeMeta && e.meta && (r.meta = { ...e.meta }),
                i.preserveTypes && ((r.__type = e.type || 'INFORMATION'), (r.__version = this._VERSION)),
                r
            )
        } catch (r) {
            return (
                n.push(`Failed to serialize step ${e.id} at index ${t}: ${r instanceof Error ? r.message : String(r)}`),
                { id: e.id, type: e.type }
            )
        }
    }
    static _serializeStepProperty(e, t, i, n) {
        if (e !== void 0)
            return e === null
                ? null
                : typeof e == 'string' || typeof e == 'number'
                  ? e
                  : typeof e == 'function'
                    ? n.functionHandling === 'omit'
                        ? void 0
                        : this._serializeFunction(e, t, i, n)
                    : e
    }
    static _serializeFunction(e, t, i, n) {
        if (n.functionHandling === 'placeholder')
            return { __isFunction: !0, __functionBody: `// Placeholder for ${t} function`, __functionName: e.name || t }
        if (n.customFunctionSerializer)
            return {
                __isFunction: !0,
                __functionBody: n.customFunctionSerializer(e, t, i),
                __functionName: e.name || t,
            }
        const s = e.toString(),
            r = this._extractFunctionParameters(s)
        return { __isFunction: !0, __functionBody: s, __functionName: e.name || t, __parameters: r }
    }
    static _serializePayload(e, t, i, n) {
        if (!e.payload) return
        const s = e.type || 'INFORMATION'
        try {
            switch (s) {
                case 'INFORMATION':
                    return { ...e.payload, __payloadType: 'INFORMATION' }
                case 'MULTIPLE_CHOICE': {
                    const r = e.payload
                    return {
                        ...r,
                        __payloadType: 'MULTIPLE_CHOICE',
                        options: r.options?.map((a) => ({ ...a, value: a.value })) || [],
                    }
                }
                case 'SINGLE_CHOICE': {
                    const r = e.payload
                    return {
                        ...r,
                        __payloadType: 'SINGLE_CHOICE',
                        options: r.options?.map((a) => ({ ...a, value: a.value })) || [],
                    }
                }
                case 'CONFIRMATION':
                    return { ...e.payload, __payloadType: 'CONFIRMATION' }
                case 'CUSTOM_COMPONENT':
                    return { ...e.payload, __payloadType: 'CUSTOM_COMPONENT' }
                case 'CHECKLIST': {
                    const r = e.payload
                    return {
                        ...r,
                        __payloadType: 'CHECKLIST',
                        items:
                            r.items?.map((a) => ({
                                id: a.id,
                                label: a.label,
                                description: a.description,
                                isMandatory: a.isMandatory,
                                condition:
                                    a.condition && t.functionHandling !== 'omit'
                                        ? this._serializeFunction(a.condition, 'condition', e.id, t)
                                        : void 0,
                                meta: a.meta,
                            })) || [],
                    }
                }
                default:
                    return (n.push(`Unknown step type '${s}' for step ${e.id}`), e.payload)
            }
        } catch (r) {
            i.push(`Failed to serialize payload for step ${e.id}: ${r instanceof Error ? r.message : String(r)}`)
            return
        }
    }
    static _deserializeStep(e, t, i, n, s) {
        try {
            const r = { id: e.id }
            return (
                e.type && (r.type = e.type),
                (r.nextStep = this._deserializeStepProperty(e.nextStep, 'nextStep', e.id, i)),
                (r.previousStep = this._deserializeStepProperty(e.previousStep, 'previousStep', e.id, i)),
                e.isSkippable !== void 0 &&
                    ((r.isSkippable = e.isSkippable),
                    e.isSkippable &&
                        e.skipToStep !== void 0 &&
                        (r.skipToStep = this._deserializeStepProperty(e.skipToStep, 'skipToStep', e.id, i))),
                e.onStepActive && (r.onStepActive = this._deserializeFunction(e.onStepActive, 'onStepActive', e.id, i)),
                e.onStepComplete &&
                    (r.onStepComplete = this._deserializeFunction(e.onStepComplete, 'onStepComplete', e.id, i)),
                e.condition && (r.condition = this._deserializeFunction(e.condition, 'condition', e.id, i)),
                e.payload && (r.payload = this._deserializePayload(e.payload, e.type, i, n, s)),
                e.meta && (r.meta = { ...e.meta }),
                r
            )
        } catch (r) {
            return (
                n.push(`Failed to deserialize step at index ${t}: ${r instanceof Error ? r.message : String(r)}`),
                null
            )
        }
    }
    static _deserializeStepProperty(e, t, i, n) {
        return e == null || typeof e == 'string' || typeof e == 'number'
            ? e
            : this._isSerializedFunction(e)
              ? this._deserializeFunction(e, t, i, n)
              : e
    }
    static _deserializeFunction(e, t, i, n) {
        if (n.customFunctionDeserializer) return n.customFunctionDeserializer(e.__functionBody, t, i)
        try {
            return new Function(`return ${e.__functionBody}`)()
        } catch (s) {
            return (this._logger.warn(`Failed to deserialize function ${t} for step ${i}:`, s), () => {})
        }
    }
    static _deserializePayload(e, t, i, n, s) {
        const r = e.__payloadType || t || 'INFORMATION'
        try {
            switch (r) {
                case 'INFORMATION': {
                    const a = { ...e }
                    return (delete a.__payloadType, a)
                }
                case 'MULTIPLE_CHOICE':
                case 'SINGLE_CHOICE': {
                    const a = { ...e }
                    return (
                        delete a.__payloadType,
                        a.options && (a.options = a.options.map((o) => ({ ...o, value: o.value }))),
                        a
                    )
                }
                case 'CONFIRMATION': {
                    const a = { ...e }
                    return (delete a.__payloadType, a)
                }
                case 'CUSTOM_COMPONENT': {
                    const a = { ...e }
                    return (delete a.__payloadType, a)
                }
                case 'CHECKLIST': {
                    const a = { ...e }
                    return (
                        delete a.__payloadType,
                        a.items &&
                            (a.items = a.items.map((o) => ({
                                id: o.id,
                                label: o.label,
                                description: o.description,
                                isMandatory: o.isMandatory,
                                condition:
                                    o.condition && this._isSerializedFunction(o.condition)
                                        ? this._deserializeFunction(o.condition, 'condition', o.id, i)
                                        : void 0,
                                meta: o.meta,
                            }))),
                        a
                    )
                }
                default:
                    return (s?.push(`Unknown payload type '${r}'`), e)
            }
        } catch (a) {
            return (
                n?.push(`Failed to deserialize payload of type '${r}': ${a instanceof Error ? a.message : String(a)}`),
                e
            )
        }
    }
    static _isSerializedFunction(e) {
        return e && typeof e == 'object' && e.__isFunction === !0
    }
    static _extractFunctionParameters(e) {
        try {
            const t = e.match(/\(([^)]*)\)/)
            return !t || !t[1]
                ? []
                : t[1]
                      .split(',')
                      .map((i) => i.trim())
                      .filter((i) => i.length > 0)
        } catch {
            return []
        }
    }
    static _hasAnyFunctions(e) {
        return e.some(
            (t) =>
                typeof t.nextStep == 'function' ||
                typeof t.previousStep == 'function' ||
                typeof t.skipToStep == 'function' ||
                typeof t.onStepActive == 'function' ||
                typeof t.onStepComplete == 'function' ||
                typeof t.condition == 'function' ||
                (t.type === 'CHECKLIST' && t.payload?.items?.some((i) => typeof i.condition == 'function'))
        )
    }
    static _validateSteps(e) {
        const t = [],
            i = [],
            n = new Set()
        return !e || e.length === 0
            ? (i.push('No steps provided'), { errors: t, warnings: i })
            : (e.forEach((s, r) => {
                  if (!s.id) {
                      t.push(`Step at index ${r} is missing required 'id' property`)
                      return
                  }
                  ;(n.has(s.id) && t.push(`Duplicate step ID found: '${s.id}'`), n.add(s.id))
                  const a = [
                      'INFORMATION',
                      'MULTIPLE_CHOICE',
                      'SINGLE_CHOICE',
                      'CONFIRMATION',
                      'CUSTOM_COMPONENT',
                      'CHECKLIST',
                  ]
                  ;(s.type && !a.includes(s.type) && i.push(`Step '${s.id}' has unknown type '${s.type}'`),
                      this._validateStepPayload(s, t, i))
              }),
              { errors: t, warnings: i })
    }
    static _validateStepPayload(e, t, i) {
        if (!e.payload) {
            e.type &&
                !['INFORMATION', 'CONFIRMATION'].includes(e.type) &&
                i.push(`Step '${e.id}' of type '${e.type}' is missing payload`)
            return
        }
        switch (e.type) {
            case 'MULTIPLE_CHOICE':
            case 'SINGLE_CHOICE': {
                const n = e.payload
                ;(!n.options || !Array.isArray(n.options) || n.options.length === 0) &&
                    t.push(`Step '${e.id}' of type '${e.type}' must have non-empty options array`)
                break
            }
            case 'CHECKLIST': {
                const n = e.payload
                ;((!n.items || !Array.isArray(n.items) || n.items.length === 0) &&
                    t.push(`Step '${e.id}' of type 'CHECKLIST' must have non-empty items array`),
                    n.dataKey || t.push(`Step '${e.id}' of type 'CHECKLIST' must have dataKey property`))
                break
            }
            case 'CUSTOM_COMPONENT': {
                e.payload.componentKey || i.push(`Step '${e.id}' of type 'CUSTOM_COMPONENT' should have componentKey`)
                break
            }
        }
    }
    static _validateSchema(e) {
        const t = [],
            i = []
        return e
            ? (e.version || i.push('Schema is missing version information'),
              !e.steps || !Array.isArray(e.steps)
                  ? (t.push("Schema must contain a 'steps' array"), { errors: t, warnings: i })
                  : (e.steps.length === 0 && i.push('Schema contains no steps'), { errors: t, warnings: i }))
            : (t.push('Schema is null or undefined'), { errors: t, warnings: i })
    }
    static serialize(e, t = !1) {
        const i = this.toJSON(e, { prettyPrint: t })
        return i.success ? i.data : null
    }
    static deserialize(e) {
        const t = this.fromJSON(e)
        return t.success ? t.data : null
    }
    static clone(e) {
        const t = this.serialize(e)
        return t ? this.deserialize(t) : null
    }
    static getExportableData(e, t = 'onboarding-steps.json', i = {}) {
        const n = this.toJSON(e, { ...i, prettyPrint: !0 })
        return !n.success || !n.data
            ? { success: !1, errors: n.errors, warnings: n.warnings }
            : {
                  success: !0,
                  data: { filename: t, mimeType: 'application/json', content: n.data },
                  errors: [],
                  warnings: [],
              }
    }
}
;((F._VERSION = '1.0.0'),
    (F._DEFAULT_OPTIONS = {
        functionHandling: 'serialize',
        includeMeta: !0,
        validateSteps: !0,
        preserveTypes: !0,
        prettyPrint: !1,
        includeValidationErrors: !1,
    }),
    (F._logger = f.getInstance({ debugMode: !1, prefix: 'StepJSONParser' })))
let I = F
exports.StepJSONParserUtils = void 0
;((l) => {
    function e(r) {
        try {
            const a = JSON.parse(r)
            return a && typeof a == 'object' && Array.isArray(a.steps) && a.steps.length > 0
        } catch {
            return !1
        }
    }
    l.isValidStepJSON = e
    function t(r) {
        try {
            return JSON.parse(r).steps.map((o) => o.type || 'INFORMATION')
        } catch {
            return []
        }
    }
    l.getStepTypesFromJSON = t
    function i(r) {
        try {
            return JSON.parse(r).steps.map((o) => o.id)
        } catch {
            return []
        }
    }
    l.getStepIdsFromJSON = i
    function n(r) {
        try {
            const a = JSON.parse(r)
            return a.metadata?.hasCustomComponents || a.steps.some((o) => o.type === 'CUSTOM_COMPONENT')
        } catch {
            return !1
        }
    }
    l.hasCustomComponents = n
    function s(r) {
        try {
            const a = JSON.parse(r)
            return (
                a.metadata?.hasFunctions ||
                a.steps.some(
                    (o) =>
                        I._isSerializedFunction(o.nextStep) ||
                        I._isSerializedFunction(o.previousStep) ||
                        I._isSerializedFunction(o.skipToStep) ||
                        I._isSerializedFunction(o.onStepActive) ||
                        I._isSerializedFunction(o.onStepComplete) ||
                        I._isSerializedFunction(o.condition)
                )
            )
        } catch {
            return !1
        }
    }
    l.hasFunctions = s
})(exports.StepJSONParserUtils || (exports.StepJSONParserUtils = {}))
function j() {
    return te()
}
function ze() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch {
        return 'UTC'
    }
}
function Ue() {
    if (typeof window > 'u') return 'desktop'
    const l = window.innerWidth
    return l < 768 ? 'mobile' : l < 1024 ? 'tablet' : 'desktop'
}
function Ve() {
    if (typeof navigator > 'u') return
    const l = navigator.userAgent
    return l.includes('Chrome')
        ? 'Chrome'
        : l.includes('Firefox')
          ? 'Firefox'
          : l.includes('Safari')
            ? 'Safari'
            : l.includes('Edge')
              ? 'Edge'
              : 'Unknown'
}
function Ke() {
    if (typeof navigator > 'u') return
    const l = navigator.platform
    return l.includes('Win')
        ? 'Windows'
        : l.includes('Mac')
          ? 'macOS'
          : l.includes('Linux')
            ? 'Linux'
            : l.includes('iPhone') || l.includes('iPad')
              ? 'iOS'
              : l.includes('Android')
                ? 'Android'
                : 'Unknown'
}
class U {
    static getFlowData(e, t) {
        if (!e || !t) return
        const i = t.get(e)
        if (i) return U.extractFromEngine(i)
    }
    static extractFromEngine(e) {
        const t = e.getState(),
            i = e.getContext()
        return {
            flow_id: e.getFlowId() || void 0,
            flow_version: e.getFlowVersion() || void 0,
            current_step_id: t.currentStep?.id?.toString(),
            current_step_index: void 0,
            total_steps: t.totalSteps,
            steps_completed: i.completedSteps || [],
            steps_skipped: i.skippedSteps || [],
            flow_started_at: i.flowData?._internal?.startedAt
                ? new Date(i.flowData._internal.startedAt).toISOString()
                : void 0,
            custom_flow_data: i.flowData,
        }
    }
}
class Q {
    constructor(e, t) {
        ;((this._config = e), (this._sessionStartTime = e.session_start_time), (this._userAhaCount = t))
    }
    buildEvent(e, t) {
        const i = e.custom_timestamp ? new Date(e.custom_timestamp) : new Date(),
            n = ze(),
            s = this._buildMetrics(e.metrics || {}, t),
            r = this._buildContext(e.context || {}, e.user_id)
        return {
            event_name: 'onboarding_aha_moment',
            event_version: this._config.event_version,
            user_id: e.user_id,
            anonymous_id: e.anonymous_id,
            session_id: this._config.session_id,
            timestamp: i.toISOString(),
            client_timestamp: i.toISOString(),
            timezone: n,
            aha_type: e.aha_type,
            journey_stage: e.journey_stage || 'activation',
            aha_description: e.aha_description,
            metrics: s,
            context: r,
            experiments: e.experiments,
            onboarding_flow: t,
        }
    }
    _buildMetrics(e, t) {
        const i = Date.now()
        return {
            time_to_aha_seconds: e.time_to_aha_seconds ?? Math.floor((i - this._sessionStartTime) / 1e3),
            time_since_signup_seconds:
                e.time_since_signup_seconds ?? Math.floor((i - this._config.user_signup_time) / 1e3),
            session_duration_seconds: e.session_duration_seconds ?? Math.floor((i - this._sessionStartTime) / 1e3),
            actions_before_aha: e.actions_before_aha,
            steps_completed: e.steps_completed ?? t?.steps_completed?.length,
            features_explored: e.features_explored,
            engagement_score: e.engagement_score,
            completion_rate: e.completion_rate,
            retention_likelihood: e.retention_likelihood,
        }
    }
    _buildContext(e, t) {
        const i = {
            ...e,
            first_aha: e.first_aha ?? this._isFirstAha(t || 'anonymous'),
            previous_aha_events: e.previous_aha_events ?? (this._userAhaCount.get(t || 'anonymous') || 0),
        }
        return (
            typeof window < 'u' &&
                !e.platform &&
                ((i.platform = 'web'), (i.device_type = Ue()), (i.browser = Ve()), (i.os = Ke())),
            this._config.exclude_personal_data ? this._config.sanitize_context(i) : i
        )
    }
    _isFirstAha(e) {
        return (this._userAhaCount.get(e) || 0) === 0
    }
}
class G {
    constructor(e) {
        ;((this._config = e), (this._userAhaCount = new Map()), (this._lastAhaTime = new Map()))
    }
    shouldTrack(e) {
        if ((this._userAhaCount.get(e) || 0) >= this._config.max_events_per_user) return !1
        if (this._config.cooldown_seconds > 0) {
            const i = this._lastAhaTime.get(e)
            if (i && Date.now() - i < this._config.cooldown_seconds * 1e3) return !1
        }
        return !0
    }
    updateUserState(e) {
        ;(this._userAhaCount.set(e, (this._userAhaCount.get(e) || 0) + 1), this._lastAhaTime.set(e, Date.now()))
    }
    getUserCount(e) {
        return this._userAhaCount.get(e) || 0
    }
    getLastAhaTime(e) {
        return this._lastAhaTime.get(e) || null
    }
    clearUserData(e) {
        ;(this._userAhaCount.delete(e), this._lastAhaTime.delete(e))
    }
    getUserAhaCountMap() {
        return this._userAhaCount
    }
}
class O {
    static toAnalyticsPayload(e) {
        return {
            event_version: e.event_version,
            user_id: e.user_id,
            anonymous_id: e.anonymous_id,
            aha_type: e.aha_type,
            journey_stage: e.journey_stage,
            aha_description: e.aha_description,
            timezone: e.timezone,
            metrics: e.metrics,
            context: e.context,
            experiments: e.experiments,
            onboarding_flow: e.onboarding_flow,
        }
    }
    static toAnalyticsEvent(e) {
        return {
            type: 'onboarding_aha_moment',
            timestamp: new Date(e.timestamp).getTime(),
            properties: O.toAnalyticsPayload(e),
            sessionId: e.session_id,
            userId: e.user_id,
            flowId: e.onboarding_flow?.flow_id,
            flowName: e.onboarding_flow?.flow_id,
            flowVersion: e.onboarding_flow?.flow_version,
        }
    }
}
const C = class C {
    constructor(e = {}) {
        ;((this._analyticsManager = null),
            (this._customProviders = []),
            (this._sessionId = null),
            (this._sessionStartTime = null),
            (this._engineContext = null),
            (this._config = this._buildConfig(e)),
            (this._customProviders = this._config.custom_providers),
            (this._logger = f.getInstance({ debugMode: this._config.debug, prefix: 'AhaTracker' })),
            (this._deduplicationManager = new G(this._config)),
            (this._eventBuilder = new Q(this._config, this._deduplicationManager.getUserAhaCountMap())),
            this._isClientSide() && this._initializeSession())
    }
    static getInstance(e) {
        return (C._instance ? e && C._instance.updateConfig(e) : (C._instance = new C(e)), C._instance)
    }
    static resetInstance() {
        C._instance = null
    }
    initialize(e) {
        ;((this._analyticsManager = e), this._logger.debug('AhaTracker initialized with AnalyticsManager'))
    }
    addProvider(e) {
        ;(this._customProviders.push(e), this._logger.debug(`Added custom provider: ${e.name}`))
    }
    linkToEngine(e) {
        if (!this._isClientSide()) {
            this._logger.warn('linkToEngine should only be called on client-side')
            return
        }
        ;((this._engineContext = e), this._logger.debug('Linked to OnboardingEngine for auto user detection'))
    }
    updateConfig(e) {
        ;((this._config = { ...this._config, ...this._buildConfig(e) }),
            e.custom_providers && (this._customProviders = e.custom_providers),
            (this._deduplicationManager = new G(this._config)),
            (this._eventBuilder = new Q(this._config, this._deduplicationManager.getUserAhaCountMap())))
    }
    async track(e) {
        try {
            const t = this._resolveUserId(e)
            if (!t && !e.anonymous_id) {
                const a = this._isClientSide() ? 'client-side' : 'server-side'
                throw new Error(
                    `aha() called on ${a} without user_id or anonymous_id. ` +
                        (this._isClientSide()
                            ? 'Did you forget to link the tracker to OnboardingEngine via linkToEngine()?'
                            : 'You must explicitly provide user_id when calling aha() from server-side.')
                )
            }
            const i = t || e.anonymous_id || 'anonymous'
            if (!this._deduplicationManager.shouldTrack(i))
                return (this._logger.debug(`Aha event skipped for user ${i} due to deduplication rules`), null)
            let n = e.flow_id ? U.getFlowData(e.flow_id) : void 0
            !n && this._engineContext && (n = this._engineContext.getFlowData())
            const s = this._eventBuilder.buildEvent(e, n)
            this._analyticsManager &&
                this._analyticsManager.trackEvent('onboarding_aha_moment', O.toAnalyticsPayload(s))
            const r = O.toAnalyticsEvent(s)
            return (
                await Promise.all(this._customProviders.map((a) => a.trackEvent(r))),
                this._deduplicationManager.updateUserState(i),
                this._logger.info(`Aha moment tracked: ${e.aha_type} for user ${i}`),
                s
            )
        } catch (t) {
            throw (this._logger.error('Failed to track aha moment', t), t)
        }
    }
    getUserAhaStats(e) {
        return {
            total_aha_events: this._deduplicationManager.getUserCount(e),
            last_aha_time: this._deduplicationManager.getLastAhaTime(e),
            can_track_aha: this._deduplicationManager.shouldTrack(e),
        }
    }
    clearUserData(e) {
        this._deduplicationManager.clearUserData(e)
    }
    _resolveUserId(e) {
        if (e.user_id) return e.user_id
        if (this._engineContext) {
            const t = this._engineContext.getUserId()
            if (t) return t
        }
    }
    _initializeSession() {
        if (this._isClientSide()) {
            ;((this._sessionId = this._config.session_id || j()),
                (this._sessionStartTime = this._config.session_start_time || Date.now()))
            try {
                if (typeof sessionStorage < 'u') {
                    const e = sessionStorage.getItem('onboardjs_session_id'),
                        t = sessionStorage.getItem('onboardjs_session_start')
                    e && t
                        ? ((this._sessionId = e), (this._sessionStartTime = parseInt(t, 10)))
                        : (sessionStorage.setItem('onboardjs_session_id', this._sessionId),
                          sessionStorage.setItem('onboardjs_session_start', String(this._sessionStartTime)))
                }
            } catch {}
        }
    }
    _isClientSide() {
        return typeof window < 'u' && typeof document < 'u'
    }
    _buildConfig(e) {
        return {
            event_version: e.event_version || '1.0.0',
            max_events_per_user: e.max_events_per_user ?? 1 / 0,
            cooldown_seconds: e.cooldown_seconds ?? 0,
            session_id: e.session_id || j(),
            session_start_time: e.session_start_time || Date.now(),
            user_signup_time: e.user_signup_time || Date.now(),
            debug: e.debug ?? !1,
            exclude_personal_data: e.exclude_personal_data ?? !1,
            sanitize_context: e.sanitize_context || ((t) => t),
            custom_providers: e.custom_providers || [],
        }
    }
}
C._instance = null
let H = C
async function qe(l) {
    return H.getInstance().track(l)
}
exports.ActivityTracker = ne
exports.AhaTracker = H
exports.AnalyticsCoordinator = re
exports.AnalyticsManager = ae
exports.AsyncOperationQueue = Y
exports.BasePlugin = $e
exports.ConfigurationBuilder = x
exports.FlowUtils = z
exports.OnboardingEngine = He
exports.OnboardingEngineRegistry = oe
exports.PerformanceTracker = N
exports.PluginManagerImpl = X
exports.ProgressMilestoneTracker = se
exports.SessionTracker = ie
exports.StepJSONParser = I
exports.StepValidator = Z
exports.aha = qe
exports.andThen = xe
exports.createRegistry = Re
exports.evaluateStepId = E
exports.findStepById = y
exports.fromPromise = Pe
exports.getStepIndex = ce
exports.map = be
exports.mapErr = Me
exports.safeAsync = De
exports.safeSync = Le
