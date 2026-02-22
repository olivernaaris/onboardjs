function T(l, e) {
    return typeof l == 'function' ? l(e) : l
}
function v(l, e) {
    if (e != null) return l.find((t) => t.id === e)
}
function Ne(l, e) {
    return e == null ? -1 : l.findIndex((t) => t.id === e)
}
const y = class y {
    /**
     * Creates an instance of Logger.
     * @param config The configuration object for the logger.
     */
    constructor(e) {
        ;((this._debugEnabled = e?.debugMode ?? !1),
            (this._logPrefix = typeof e?.prefix == 'string' ? `${e.prefix}` : ''),
            this._logPrefix && (this._logPrefix = `${this._logPrefix} `))
    }
    /**
     * Gets the singleton instance of Logger with optional configuration.
     * If called without arguments, returns the default singleton instance.
     * If called with a prefix, returns a cached instance for that prefix.
     *
     * @param config Optional configuration for the logger instance
     * @returns A Logger instance (singleton or cached by prefix)
     *
     * @example
     * ```typescript
     * // Get default singleton
     * const logger = Logger.getInstance()
     *
     * // Get or create cached instance with prefix
     * const myLogger = Logger.getInstance({ prefix: 'MyService' })
     *
     * // Same prefix returns the same cached instance
     * const sameLogger = Logger.getInstance({ prefix: 'MyService' })
     * console.log(myLogger === sameLogger) // true
     * ```
     */
    static getInstance(e) {
        if (!e) return (y._instance || (y._instance = new y()), y._instance)
        const t = `${e.debugMode ?? !1}:${e.prefix ?? ''}`
        if (y._instanceCache.has(t)) return y._instanceCache.get(t)
        const i = new y(e)
        return (y._instanceCache.set(t, i), i)
    }
    /**
     * Clears all cached Logger instances.
     * Useful for testing or when you need to reset logger configuration.
     *
     * @example
     * ```typescript
     * // In tests
     * afterEach(() => {
     *   Logger.clearCache()
     * })
     * ```
     */
    static clearCache() {
        ;((y._instance = null), y._instanceCache.clear())
    }
    /**
     * Logs a debug message. Only visible if `debugMode` is true.
     * @param messages The messages to log.
     */
    debug(...e) {
        this._debugEnabled && console.log(`${this._logPrefix}[DEBUG]`, ...e)
    }
    /**
     * Logs an informational message.
     * @param messages The messages to log.
     */
    info(...e) {
        console.info(`${this._logPrefix}[INFO]`, ...e)
    }
    /**
     * Logs a warning message.
     * @param messages The messages to log.
     */
    warn(...e) {
        console.warn(`${this._logPrefix}[WARN]`, ...e)
    }
    /**
     * Logs an error message.
     * @param messages The messages to log.
     */
    error(...e) {
        console.error(`${this._logPrefix}[ERROR]`, ...e)
    }
}
;((y._instance = null), (y._instanceCache = /* @__PURE__ */ new Map()))
let f = y
class U {
    constructor(e, t, i, n, s) {
        ;((this._eventManager = e),
            (this._steps = t),
            (this._initialStepId = i),
            (this._flowContext = n),
            (this._isLoading = !1),
            (this._isHydrating = !0),
            (this._error = null),
            (this._isCompleted = !1),
            (this._logger = f.getInstance({
                debugMode: s ?? !1,
                prefix: 'CoreEngineService',
            })))
    }
    // =============================================================================
    // STATE GETTERS
    // =============================================================================
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
    // =============================================================================
    // STATE MANAGEMENT
    // =============================================================================
    /**
     * Get the complete engine state snapshot
     */
    getState(e, t, i) {
        let n = null,
            s = null
        e && ((n = this._findNextStep(e, t)), (s = this._findPreviousStep(e, t, i)))
        const r = !!e && e.id === this._initialStepId,
            a = new Set(Object.keys(t.flowData?._internal?.completedSteps || {})),
            o = this._steps.filter((p) => !p.condition || p.condition(t)),
            c = o.length,
            d = o.filter((p) => a.has(String(p.id))).length,
            h = c > 0 ? Math.round((d / c) * 100) : 0,
            _ = e ? o.findIndex((p) => p.id === e.id) : -1,
            u = _ !== -1 ? _ + 1 : 0
        return {
            // Flow identification
            flowId: this._flowContext.flowId,
            flowName: this._flowContext.flowName,
            flowVersion: this._flowContext.flowVersion,
            flowMetadata: this._flowContext.flowMetadata,
            instanceId: this._flowContext.instanceId,
            // Current state
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
    /**
     * Update engine state with a partial update function
     */
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
    /**
     * Manually trigger state change notification
     */
    notifyStateChange(e, t, i) {
        this._notifyStateChangeListeners(e, t, i)
    }
    // =============================================================================
    // STATE SETTERS
    // =============================================================================
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
    // =============================================================================
    // STEP UTILITIES
    // =============================================================================
    /**
     * Get all relevant steps based on current context conditions
     */
    getRelevantSteps(e) {
        return this._steps.filter((t) => !t.condition || t.condition(e))
    }
    /**
     * Find a step by ID
     */
    getStepById(e) {
        return v(this._steps, e)
    }
    /**
     * Get all completed steps based on context
     */
    getCompletedSteps(e) {
        const t = new Set(Object.keys(e.flowData?._internal?.completedSteps || {}))
        return this._steps.filter((i) => t.has(String(i.id)))
    }
    // =============================================================================
    // PRIVATE METHODS
    // =============================================================================
    _notifyStateChangeListeners(e, t, i) {
        const n = this.getState(e, t, i)
        this._eventManager.notifyListeners('stateChange', { state: n })
    }
    _findNextStep(e, t) {
        const i = T(e.nextStep, t)
        if (i) return v(this._steps, i) || null
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
        let n = T(e.previousStep, t)
        if (n === void 0)
            if (i.length > 0) n = i[i.length - 1]
            else {
                const r = this._steps.findIndex((a) => a.id === e.id)
                r > 0 && (n = this._steps[r - 1].id)
            }
        if (!n) return null
        let s = v(this._steps, n)
        for (; s; ) {
            if (!s.condition || s.condition(t)) return s
            const r = T(s.previousStep, t)
            if (!r) return null
            s = v(this._steps, r)
        }
        return null
    }
}
class te {
    constructor(e, t, i, n, s, r) {
        ;((this._errorHandler = n),
            (this._eventManager = s),
            (this._loadData = e),
            (this._persistData = t),
            (this._clearPersistedData = i),
            (this._logger = f.getInstance({
                debugMode: r ?? !1,
                prefix: 'PersistenceService',
            })))
    }
    // =============================================================================
    // CORE OPERATIONS
    // =============================================================================
    /**
     * Load persisted data from storage
     */
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
    /**
     * Persist data if persistence is configured and not currently hydrating
     */
    async persistDataIfNeeded(e, t, i) {
        if (i || !this._persistData) return
        const n = Date.now()
        try {
            ;(this._logger.debug('Persisting data for step:', t), await this._persistData(e, t))
            const s = Date.now() - n
            ;(this._eventManager?.notifyListeners('persistenceSuccess', {
                context: e,
                persistenceTime: s,
            }),
                this._logger.debug('Data persisted successfully'))
        } catch (s) {
            ;(this._eventManager?.notifyListeners('persistenceFailure', {
                context: e,
                error: s,
            }),
                this._logger.error('Error during persistData:', s),
                this._errorHandler && this._errorHandler.handleError(s, 'persistData', e))
        }
    }
    /**
     * Clear all persisted data
     */
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
    // =============================================================================
    // HANDLER MANAGEMENT
    // =============================================================================
    /**
     * Set the data load handler
     */
    setDataLoadHandler(e) {
        this._loadData = e
    }
    /**
     * Set the data persist handler
     */
    setDataPersistHandler(e) {
        this._persistData = e
    }
    /**
     * Set the clear persisted data handler
     */
    setClearPersistedDataHandler(e) {
        this._clearPersistedData = e
    }
    // =============================================================================
    // HANDLER GETTERS
    // =============================================================================
    /**
     * Get the current data load handler
     */
    getDataLoadHandler() {
        return this._loadData
    }
    /**
     * Get the current data persist handler
     */
    getDataPersistHandler() {
        return this._persistData
    }
    /**
     * Get the current clear persisted data handler
     */
    getClearPersistedDataHandler() {
        return this._clearPersistedData
    }
}
class ie {
    constructor(e, t) {
        ;((this._steps = e), (this._logger = t ?? f.getInstance({ prefix: 'StepTransitionService' })))
    }
    /**
     * Find the next step candidate based on context.
     * Priority: explicit nextStep → array order
     */
    findNextStepCandidate(e, t) {
        const i = T(e.nextStep, t)
        if (i !== void 0) return i === null ? null : v(this._steps, i) || void 0
        const n = this._steps.findIndex((s) => s.id === e.id)
        if (n !== -1)
            for (let s = n + 1; s < this._steps.length; s++) {
                const r = this._steps[s]
                if (!r.condition || r.condition(t)) return r
            }
    }
    /**
     * Find the previous step candidate based on context and history.
     * Priority: explicit previousStep → history → array order
     */
    findPreviousStepCandidate(e, t, i) {
        let n = T(e.previousStep, t)
        if (n !== void 0) return v(this._steps, n) || void 0
        if (i.length > 0) return ((n = i[i.length - 1]), v(this._steps, n) || void 0)
        const s = this._steps.findIndex((r) => r.id === e.id)
        if (s > 0)
            for (let r = s - 1; r >= 0; r--) {
                const a = this._steps[r]
                if (!a.condition || a.condition(t)) return a
            }
    }
    /**
     * Calculate the skip target step.
     * Priority: skipToStep → nextStep → next in array
     */
    calculateSkipTarget(e, t) {
        let i = T(e.skipToStep, t)
        if ((i === void 0 && (i = T(e.nextStep, t)), i !== void 0)) return i
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
    /**
     * Skip conditional steps that don't meet the current context.
     * Recursively advances through steps while their conditions fail.
     */
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
class ne {
    constructor(e, t, i, n) {
        ;((this._eventManager = e),
            (this._stateManager = t),
            (this._errorHandler = i),
            (this._logger = n ?? f.getInstance({ prefix: 'BeforeNavigationHandler' })))
    }
    /**
     * Process beforeStepChange event and return cancellation/redirection result.
     * Returns the final target step ID (which may be different from the requested one).
     * If cancelled, returns the original requestedTargetStepId along with cancellation flag.
     */
    async handle(e, t, i, n) {
        if (!this._eventManager.hasListeners('beforeStepChange'))
            return {
                isCancelled: !1,
                finalTargetStepId: e,
            }
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
                {
                    isCancelled: !0,
                    finalTargetStepId: e,
                }
            )
        }
        return {
            isCancelled: s,
            finalTargetStepId: r,
        }
    }
}
class se {
    constructor(e, t, i) {
        ;((this._eventManager = e),
            (this._errorHandler = t),
            (this._logger = i ?? f.getInstance({ prefix: 'ChecklistNavigationService' })))
    }
    /**
     * Get checklist item state for a CHECKLIST step.
     * Initializes state if needed.
     */
    getChecklistState(e, t) {
        return this._getChecklistItemsState(e, t)
    }
    /**
     * Check if a checklist step is complete.
     */
    isChecklistComplete(e, t) {
        return this._isChecklistStepComplete(e, t)
    }
    /**
     * Update a checklist item.
     */
    async updateChecklistItem(e, t, i, n, s) {
        await this._updateChecklistItem(e, t, i, n, s)
    }
    /**
     * Get checklist progress for a step.
     */
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
        return {
            completed: r,
            total: s,
            percentage: Math.round(a),
            isComplete: o,
        }
    }
    /**
     * Initialize checklist item states for a step.
     */
    initializeChecklistItems(e, t) {
        this._getChecklistItemsState(e, t)
    }
    // =========================================================================
    // Private Methods
    // =========================================================================
    _getChecklistItemsState(e, t) {
        const { dataKey: i, items: n } = e.payload
        let s = t.flowData[i]
        return (
            (!s || s.length !== n.length) &&
                ((s = n.map((r) => ({
                    id: r.id,
                    isCompleted: !1,
                }))),
                (t.flowData = {
                    ...t.flowData,
                    [i]: [...s],
                })),
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
        this._eventManager.notifyListeners('checklistItemToggled', {
            itemId: e,
            isCompleted: t,
            step: i,
            context: n,
        })
        const h = this.getChecklistProgress(i, n)
        if (
            (this._eventManager.notifyListeners('checklistProgressChanged', {
                step: i,
                context: n,
                progress: h,
            }),
            c !== -1)
        ) {
            const u = [...o]
            ;((u[c] = { ...u[c], isCompleted: t }), (o = u))
        } else o = [...o, { id: e, isCompleted: t }]
        const _ = JSON.stringify(n.flowData)
        if (
            ((n.flowData = {
                ...n.flowData,
                [a]: o,
            }),
            JSON.stringify(n.flowData) !== _ && s)
        )
            try {
                await s()
            } catch (u) {
                this._errorHandler.handleError(u, 'updateChecklistItem persistence', n)
            }
    }
}
class re {
    constructor(e, t, i, n, s, r) {
        ;((this._steps = e),
            (this._eventManager = t),
            (this._stateManager = i),
            (this._persistenceService = n),
            (this._errorHandler = s),
            (this._logger = r ?? f.getInstance({ prefix: 'NavigationOrchestrator' })),
            (this._stepTransitionService = new ie(this._steps, this._logger)),
            (this._beforeNavigationHandler = new ne(
                this._eventManager,
                this._stateManager,
                this._errorHandler,
                this._logger
            )),
            (this._checklistService = new se(this._eventManager, this._errorHandler, this._logger)))
    }
    /**
     * Navigate to a specific step with full event handling.
     * Orchestrates the three services: beforeStepChange → transition → activation.
     */
    async navigateToStep(e, t = 'goto', i, n, s, r, a) {
        ;(this._stateManager.setLoading(!0), this._stateManager.setError(null))
        const { isCancelled: o, finalTargetStepId: c } = await this._beforeNavigationHandler.handle(e, t, i, n)
        if (o)
            return (
                this._logger.debug('[NavigationOrchestrator] Navigation cancelled.'),
                this._stateManager.setLoading(!1),
                i
            )
        let d = v(this._steps, c)
        d = this._stepTransitionService.skipConditionalSteps(d, n, t === 'previous' ? 'previous' : 'next')
        const h = i,
            _ = d ?? null
        if (
            (this._emitNavigationEvents(t, i, _, n),
            _ ? await this._handleStepActivation(_, h, t, n, s) : await this._handleFlowComplete(h, t, n, a),
            r)
        )
            try {
                r(_, h, n)
            } catch (u) {
                this._errorHandler.handleError(u, 'onStepChangeCallback', n)
            }
        return (
            this._eventManager.notifyListeners('stepChange', {
                oldStep: h,
                newStep: _,
                context: n,
            }),
            this._stateManager.setLoading(!1),
            _
        )
    }
    /**
     * Calculate the next step without navigating.
     */
    calculateNextStep(e, t) {
        return this._stepTransitionService.findNextStepCandidate(e, t) ?? null
    }
    /**
     * Calculate the previous step without navigating.
     */
    calculatePreviousStep(e, t, i) {
        return this._stepTransitionService.findPreviousStepCandidate(e, t, i) ?? null
    }
    /**
     * Get checklist state for a CHECKLIST step.
     */
    getChecklistState(e, t) {
        return e.type !== 'CHECKLIST' ? [] : this._checklistService.getChecklistState(e, t)
    }
    /**
     * Check if a checklist step is complete.
     */
    isChecklistComplete(e, t) {
        return e.type !== 'CHECKLIST' ? !0 : this._checklistService.isChecklistComplete(e, t)
    }
    /**
     * Update a checklist item.
     */
    async updateChecklistItem(e, t, i, n, s) {
        if (i.type !== 'CHECKLIST') {
            this._logger.warn(`[NavigationOrchestrator] Cannot update checklist item on non-CHECKLIST step: ${i.id}`)
            return
        }
        await this._checklistService.updateChecklistItem(e, t, i, n, s)
    }
    /**
     * Get exposed services for advanced usage.
     */
    getStepTransitionService() {
        return this._stepTransitionService
    }
    getChecklistService() {
        return this._checklistService
    }
    // =========================================================================
    // Private Helper Methods
    // =========================================================================
    _emitNavigationEvents(e, t, i, n) {
        if (t && i && t.id !== i.id)
            switch (e) {
                case 'previous':
                    this._eventManager.notifyListeners('navigationBack', {
                        fromStep: t,
                        toStep: i,
                        context: n,
                    })
                    break
                case 'next':
                    this._eventManager.notifyListeners('navigationForward', {
                        fromStep: t,
                        toStep: i,
                        context: n,
                    })
                    break
                case 'goto':
                    this._eventManager.notifyListeners('navigationJump', {
                        fromStep: t,
                        toStep: i,
                        context: n,
                    })
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
                this._eventManager.notifyListeners('stepActive', {
                    step: e,
                    context: n,
                    startTime: r,
                }))
        } catch (a) {
            this._errorHandler.handleError(a, `onStepActive for ${e.id}`, n)
        }
    }
    async _handleFlowComplete(e, t, i, n) {
        this._stateManager.setCompleted(!0)
        const s = i,
            r = s.flowData._internal?.startedAt,
            a = r && r > 0 ? Date.now() - r : 0
        if (n && t !== 'initial' && (!e || !T(e.nextStep, s)))
            try {
                await n(s)
            } catch (o) {
                const c = o instanceof Error ? o : new Error(String(o))
                ;(this._stateManager.setError(c), this._errorHandler.handleError(o, 'onFlowComplete', i))
            }
        ;(this._eventManager.notifyListeners('flowCompleted', {
            context: s,
            duration: Math.round(a),
        }),
            await this._persistenceService.persistDataIfNeeded(i, null, this._stateManager.isHydrating))
    }
}
class V {
    constructor(e, t, i, n, s, r) {
        ;((this._steps = e),
            (this._eventManager = t),
            (this._stateManager = i),
            (this._persistenceService = n),
            (this._errorHandler = s),
            (this._logger = r ?? f.getInstance({ prefix: 'NavigationService' })),
            (this._orchestrator = new re(
                this._steps,
                this._eventManager,
                this._stateManager,
                this._persistenceService,
                this._errorHandler,
                this._logger
            )),
            (this._checklistService = this._orchestrator.getChecklistService()))
    }
    // =========================================================================
    // INavigationService Implementation
    // =========================================================================
    /**
     * Navigate to a specific step with full event handling.
     */
    async navigateToStep(e, t = 'goto', i, n, s, r, a) {
        return this._orchestrator.navigateToStep(e, t, i, n, s, r, a)
    }
    /**
     * Calculate the next step without navigating.
     */
    calculateNextStep(e, t) {
        return this._orchestrator.calculateNextStep(e, t)
    }
    /**
     * Calculate the previous step without navigating.
     */
    calculatePreviousStep(e, t, i) {
        return this._orchestrator.calculatePreviousStep(e, t, i)
    }
    /**
     * Get checklist item state for a CHECKLIST step.
     */
    getChecklistState(e, t) {
        return this._orchestrator.getChecklistState(e, t)
    }
    /**
     * Check if a checklist step is complete.
     */
    isChecklistComplete(e, t) {
        return this._orchestrator.isChecklistComplete(e, t)
    }
    /**
     * Update a checklist item.
     */
    async updateChecklistItem(e, t, i, n, s) {
        return this._orchestrator.updateChecklistItem(e, t, i, n, s)
    }
    // =========================================================================
    // High-Level Navigation Methods
    // =========================================================================
    /**
     * Navigate to the next step with data persistence.
     */
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
            t = {
                ...t,
                [a.dataKey]: i.flowData[a.dataKey] || [],
            }
        }
        ;(this._stateManager.setLoading(!0), this._stateManager.setError(null))
        try {
            if (t && Object.keys(t).length > 0) {
                const d = {
                    ...i.flowData,
                    ...t,
                }
                JSON.stringify(i.flowData) !== JSON.stringify(d) && (i.flowData = d)
            }
            ;(e.onStepComplete && (await e.onStepComplete(t || {}, i)),
                this._eventManager.notifyListeners('stepCompleted', {
                    step: e,
                    stepData: t || {},
                    context: i,
                }),
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
    /**
     * Navigate to the previous step.
     */
    async previous(e, t, i, n, s) {
        if (!e || this._stateManager.isLoading) return e
        const r = this._orchestrator.calculatePreviousStep(e, t, i),
            a = r ? r.id : null
        return (
            i.length > 0 && i[i.length - 1] === a && i.pop(),
            a ? this.navigateToStep(a, 'previous', e, t, i, n, s) : e
        )
    }
    /**
     * Skip the current step.
     */
    async skip(e, t, i, n, s) {
        if (!e || !e.isSkippable || this._stateManager.isLoading)
            return (
                this._logger.debug(
                    `[NavigationService] skip(): Cannot skip from step '${e?.id}'. Not skippable or engine loading.`
                ),
                e
            )
        const r = e.skipToStep ? 'explicit_skip_target' : 'default_skip'
        this._eventManager.notifyListeners('stepSkipped', {
            step: e,
            context: t,
            skipReason: r,
        })
        const o = this._orchestrator.getStepTransitionService().calculateSkipTarget(e, t)
        return await this.navigateToStep(o, 'skip', e, t, i, n, s)
    }
    /**
     * Navigate directly to a specific step by ID.
     */
    async goToStep(e, t, i, n, s, r, a) {
        return this._stateManager.isLoading
            ? (this._logger.debug('[NavigationService] goToStep(): Ignoring - engine is loading.'), i)
            : (t &&
                  (n.flowData || (n.flowData = {}),
                  (n.flowData = {
                      ...n.flowData,
                      ...t,
                  }),
                  this._logger.debug(
                      '[NavigationService] goToStep(): Context flowData updated with step-specific data.'
                  )),
              await this.navigateToStep(e, 'goto', i, n, s, r, a))
    }
    // =========================================================================
    // Checklist Methods
    // =========================================================================
    /**
     * Get checklist progress for a step.
     */
    getChecklistProgress(e, t) {
        return this._checklistService.getChecklistProgress(e, t)
    }
    // =========================================================================
    // Private Helper Methods
    // =========================================================================
    _markStepCompleted(e, t) {
        ;(t.flowData._internal ||
            (t.flowData._internal = {
                completedSteps: {},
                startedAt: Date.now(),
                stepStartTimes: {},
            }),
            (t.flowData._internal.completedSteps = {
                ...(t.flowData._internal.completedSteps || {}),
                [e.id]: Date.now(),
            }))
    }
}
function ae(l) {
    return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, 'default') ? l.default : l
}
var O = { exports: {} },
    K
function oe() {
    return (
        K ||
            ((K = 1),
            (function (l) {
                var e = Object.prototype.hasOwnProperty,
                    t = '~'
                function i() {}
                Object.create && ((i.prototype = /* @__PURE__ */ Object.create(null)), new i().__proto__ || (t = !1))
                function n(o, c, d) {
                    ;((this.fn = o), (this.context = c), (this.once = d || !1))
                }
                function s(o, c, d, h, _) {
                    if (typeof d != 'function') throw new TypeError('The listener must be a function')
                    var u = new n(d, h || o, _),
                        p = t ? t + c : c
                    return (
                        o._events[p]
                            ? o._events[p].fn
                                ? (o._events[p] = [o._events[p], u])
                                : o._events[p].push(u)
                            : ((o._events[p] = u), o._eventsCount++),
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
                        for (var _ = 0, u = h.length, p = new Array(u); _ < u; _++) p[_] = h[_].fn
                        return p
                    }),
                    (a.prototype.listenerCount = function (c) {
                        var d = t ? t + c : c,
                            h = this._events[d]
                        return h ? (h.fn ? 1 : h.length) : 0
                    }),
                    (a.prototype.emit = function (c, d, h, _, u, p) {
                        var S = t ? t + c : c
                        if (!this._events[S]) return !1
                        var g = this._events[S],
                            I = arguments.length,
                            b,
                            m
                        if (g.fn) {
                            switch ((g.once && this.removeListener(c, g.fn, void 0, !0), I)) {
                                case 1:
                                    return (g.fn.call(g.context), !0)
                                case 2:
                                    return (g.fn.call(g.context, d), !0)
                                case 3:
                                    return (g.fn.call(g.context, d, h), !0)
                                case 4:
                                    return (g.fn.call(g.context, d, h, _), !0)
                                case 5:
                                    return (g.fn.call(g.context, d, h, _, u), !0)
                                case 6:
                                    return (g.fn.call(g.context, d, h, _, u, p), !0)
                            }
                            for (m = 1, b = new Array(I - 1); m < I; m++) b[m - 1] = arguments[m]
                            g.fn.apply(g.context, b)
                        } else {
                            var ee = g.length,
                                D
                            for (m = 0; m < ee; m++)
                                switch ((g[m].once && this.removeListener(c, g[m].fn, void 0, !0), I)) {
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
                                        g[m].fn.call(g[m].context, d, h, _)
                                        break
                                    default:
                                        if (!b) for (D = 1, b = new Array(I - 1); D < I; D++) b[D - 1] = arguments[D]
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
                    (a.prototype.removeListener = function (c, d, h, _) {
                        var u = t ? t + c : c
                        if (!this._events[u]) return this
                        if (!d) return (r(this, u), this)
                        var p = this._events[u]
                        if (p.fn) p.fn === d && (!_ || p.once) && (!h || p.context === h) && r(this, u)
                        else {
                            for (var S = 0, g = [], I = p.length; S < I; S++)
                                (p[S].fn !== d || (_ && !p[S].once) || (h && p[S].context !== h)) && g.push(p[S])
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
            })(O)),
        O.exports
    )
}
var le = /* @__PURE__ */ oe()
const ce = /* @__PURE__ */ ae(le)
class Y extends Error {
    constructor(e) {
        ;(super(e), (this.name = 'TimeoutError'))
    }
}
class de extends Error {
    constructor(e) {
        ;(super(), (this.name = 'AbortError'), (this.message = e))
    }
}
const q = (l) => (globalThis.DOMException === void 0 ? new de(l) : new DOMException(l)),
    B = (l) => {
        const e = l.reason === void 0 ? q('This operation was aborted.') : l.reason
        return e instanceof Error ? e : q(e)
    }
function he(l, e) {
    const { milliseconds: t, fallback: i, message: n, customTimers: s = { setTimeout, clearTimeout } } = e
    let r, a
    const c = new Promise((d, h) => {
        if (typeof t != 'number' || Math.sign(t) !== 1)
            throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${t}\``)
        if (e.signal) {
            const { signal: u } = e
            ;(u.aborted && h(B(u)),
                (a = () => {
                    h(B(u))
                }),
                u.addEventListener('abort', a, { once: !0 }))
        }
        if (t === Number.POSITIVE_INFINITY) {
            l.then(d, h)
            return
        }
        const _ = new Y()
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
                          : ((_.message = n ?? `Promise timed out after ${t} milliseconds`), h(_)))
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
function ue(l, e, t) {
    let i = 0,
        n = l.length
    for (; n > 0; ) {
        const s = Math.trunc(n / 2)
        let r = i + s
        t(l[r], e) <= 0 ? ((i = ++r), (n -= s + 1)) : (n = s)
    }
    return i
}
class ge {
    #e = []
    enqueue(e, t) {
        t = {
            priority: 0,
            ...t,
        }
        const i = {
            priority: t.priority,
            id: t.id,
            run: e,
        }
        if (this.size === 0 || this.#e[this.size - 1].priority >= t.priority) {
            this.#e.push(i)
            return
        }
        const n = ue(this.#e, i, (s, r) => r.priority - s.priority)
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
class _e extends ce {
    #e
    #a
    #r = 0
    #g
    #o
    #_ = 0
    #i
    #l
    #t
    #p
    #n = 0
    // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
    #c
    #s
    #f
    // Use to assign a unique identifier to a promise function, if not explicitly specified
    #v = 1n
    /**
      Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
  
      Applies to each future operation.
      */
    timeout
    // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
    constructor(e) {
        if (
            (super(),
            (e = {
                carryoverConcurrencyCount: !1,
                intervalCap: Number.POSITIVE_INFINITY,
                interval: 0,
                concurrency: Number.POSITIVE_INFINITY,
                autoStart: !0,
                queueClass: ge,
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
            (this.#p = e.queueClass),
            (this.concurrency = e.concurrency),
            (this.timeout = e.timeout),
            (this.#f = e.throwOnTimeout === !0),
            (this.#s = e.autoStart === !1))
    }
    get #S() {
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
            const t = this.#_ - e
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
            if (this.#S && this.#w) {
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
            (this.#_ = Date.now() + this.#o))
    }
    #y() {
        ;(this.#r === 0 && this.#n === 0 && this.#i && (clearInterval(this.#i), (this.#i = void 0)),
            (this.#r = this.#e ? this.#n : 0),
            this.#h())
    }
    /**
  Executes all queued functions until it reaches the limit.
  */
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
    /**
      Updates the priority of a promise function by its id, affecting its execution order. Requires a defined concurrency limit to take effect.
  
      For example, this can be used to prioritize a promise function to run earlier.
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 1});
  
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦀', {priority: 0, id: '🦀'});
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦄', {priority: 1});
  
      queue.setPriority('🦀', 2);
      ```
  
      In this case, the promise function with `id: '🦀'` runs second.
  
      You can also deprioritize a promise function to delay its execution:
  
      ```js
      import PQueue from 'p-queue';
  
      const queue = new PQueue({concurrency: 1});
  
      queue.add(async () => '🦄', {priority: 1});
      queue.add(async () => '🦀', {priority: 1, id: '🦀'});
      queue.add(async () => '🦄');
      queue.add(async () => '🦄', {priority: 0});
  
      queue.setPriority('🦀', -1);
      ```
      Here, the promise function with `id: '🦀'` executes last.
      */
    setPriority(e, t) {
        this.#t.setPriority(e, t)
    }
    async add(e, t = {}) {
        return (
            (t.id ??= (this.#v++).toString()),
            (t = {
                timeout: this.timeout,
                throwOnTimeout: this.#f,
                ...t,
            }),
            new Promise((i, n) => {
                ;(this.#t.enqueue(async () => {
                    this.#n++
                    try {
                        ;(t.signal?.throwIfAborted(), this.#r++)
                        let s = e({ signal: t.signal })
                        ;(t.timeout && (s = he(Promise.resolve(s), { milliseconds: t.timeout })),
                            t.signal && (s = Promise.race([s, this.#k(t.signal)])))
                        const r = await s
                        ;(i(r), this.emit('completed', r))
                    } catch (s) {
                        if (s instanceof Y && !t.throwOnTimeout) {
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
    /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
    start() {
        return this.#s ? ((this.#s = !1), this.#h(), this) : this
    }
    /**
  Put queue execution on hold.
  */
    pause() {
        this.#s = !0
    }
    /**
  Clear the queue.
  */
    clear() {
        this.#t = new this.#p()
    }
    /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
    async onEmpty() {
        this.#t.size !== 0 && (await this.#u('empty'))
    }
    /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
    async onSizeLessThan(e) {
        this.#t.size < e || (await this.#u('next', () => this.#t.size < e))
    }
    /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
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
    /**
  Size of the queue, the number of queued items waiting to run.
  */
    get size() {
        return this.#t.size
    }
    /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
    sizeBy(e) {
        return this.#t.filter(e).length
    }
    /**
  Number of running items (no longer in the queue).
  */
    get pending() {
        return this.#n
    }
    /**
  Whether the queue is currently paused.
  */
    get isPaused() {
        return this.#s
    }
}
class pe {
    constructor(e = 1) {
        ;((this._operationCounter = 0),
            (this._trackedOperations = /* @__PURE__ */ new Map()),
            (this._isPaused = !1),
            (this._queue = new _e({
                concurrency: Math.max(1, e),
            })))
    }
    /**
     * Add an operation to the queue with optional return value
     * @param operation The async function to execute
     * @param priority Priority level (higher = executed sooner). Default is 0.
     * @returns Promise that resolves to the operation's return value when it completes
     *
     * @example
     * ```typescript
     * // Void operation (default)
     * await queue.enqueue(async () => {
     *   console.log('Do something')
     * })
     *
     * // Operation with return value (type-safe)
     * const count = await queue.enqueue<number>(async () => {
     *   return 42
     * })
     * ```
     */
    enqueue(e, t = 0) {
        const i = `op_${++this._operationCounter}_${Date.now()}`
        return (
            this._trackedOperations.set(i, {
                id: i,
                createdAt: Date.now(),
            }),
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
    /**
     * Add a high-priority operation that jumps to the front of the queue
     * @param operation The async function to execute
     * @returns Promise that resolves to the operation's return value when it completes
     *
     * @example
     * ```typescript
     * const result = await queue.enqueueUrgent<string>(async () => {
     *   return 'urgent result'
     * })
     * ```
     */
    enqueueUrgent(e) {
        return this.enqueue(e, Number.MAX_SAFE_INTEGER)
    }
    /**
     * Get current queue statistics
     */
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
    /**
     * Clear all pending operations
     * Note: Already executing operations will continue to completion
     */
    clear() {
        ;(this._queue.clear(), this._trackedOperations.clear())
    }
    /**
     * Wait for all operations to complete
     */
    async drain() {
        await this._queue.onIdle()
    }
    /**
     * Pause the queue (pending operations will wait)
     */
    pause() {
        ;(this._queue.pause(), (this._isPaused = !0))
    }
    /**
     * Resume processing of queued operations
     */
    resume() {
        ;(this._queue.start(), (this._isPaused = !1))
    }
    /**
     * Set the concurrency level
     * @param concurrency Number of operations that can run in parallel
     */
    setConcurrency(e) {
        this._queue.concurrency = Math.max(1, e)
    }
    /**
     * Get the current concurrency level
     */
    get concurrency() {
        return this._queue.concurrency
    }
    /**
     * Get the number of pending operations
     */
    get size() {
        return this._queue.size
    }
    /**
     * Get the number of currently running operations
     */
    get pending() {
        return this._queue.pending
    }
    /**
     * Check if the queue is empty (no pending or running operations)
     */
    get isEmpty() {
        return this._queue.size === 0 && this._queue.pending === 0
    }
    /**
     * Wait for the queue to become empty
     */
    async onEmpty() {
        await this._queue.onEmpty()
    }
    /**
     * Wait for the queue to become idle (no running operations)
     */
    async onIdle() {
        await this._queue.onIdle()
    }
}
const H = f.getInstance({ prefix: '[EventManager]' })
class fe {
    constructor() {
        ;((this._listeners = /* @__PURE__ */ new Map()),
            [
                'stateChange',
                'beforeStepChange',
                'stepChange',
                'flowCompleted',
                'stepActive',
                'stepCompleted',
                'contextUpdate',
                'error',
                // Flow-level
                'flowStarted',
                'flowPaused',
                'flowResumed',
                'flowAbandoned',
                'flowReset',
                'flowRegistered',
                'flowUnregistered',
                // Step-level
                'stepSkipped',
                'stepRetried',
                'stepValidationFailed',
                'stepHelpRequested',
                'stepAbandoned',
                // Navigation
                'navigationBack',
                'navigationForward',
                'navigationJump',
                // Interaction
                'userIdle',
                'userReturned',
                'dataChanged',
                // Performance
                'stepRenderTime',
                'persistenceSuccess',
                'persistenceFailure',
                // Checklist
                'checklistItemToggled',
                'checklistProgressChanged',
                // Plugin
                'pluginInstalled',
                'pluginError',
            ].forEach((t) => {
                this._listeners.set(t, /* @__PURE__ */ new Set())
            }))
    }
    /**
     * Add an event listener with unified error handling
     */
    addEventListener(e, t) {
        const i = this._listeners.get(e)
        if (!i) throw new Error(`Unknown event type: ${String(e)}`)
        return (i.add(t), () => i.delete(t))
    }
    /**
     * Notify all listeners for a specific event with consistent error handling
     */
    notifyListeners(e, ...t) {
        const i = this._listeners.get(e)
        i &&
            i.forEach((n) => {
                try {
                    const s = n(...t)
                    s instanceof Promise &&
                        s.catch((r) => {
                            const a = e === 'flowCompleted' ? 'async onFlowHasCompleted' : this._getLegacyEventName(e)
                            H.error(`Error in ${a} listener:`, r)
                        })
                } catch (s) {
                    const r = e === 'flowCompleted' ? 'sync onFlowHasCompleted' : this._getLegacyEventName(e)
                    H.error(`Error in ${r} listener:`, s)
                }
            })
    }
    /**
     * Get legacy event name for error messages to maintain backward compatibility
     */
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
    /**
     * Notify listeners with promise resolution for sequential execution
     */
    async notifyListenersSequential(e, ...t) {
        const i = this._listeners.get(e)
        if (i)
            for (const n of i)
                try {
                    const s = n(...t)
                    s instanceof Promise && (await s)
                } catch (s) {
                    throw (H.error(`Error in sequential ${String(e)} listener:`, s), s)
                }
    }
    /**
     * Get the number of listeners for an event type
     */
    getListenerCount(e) {
        return this._listeners.get(e)?.size || 0
    }
    /**
     * Check if an event type has any listeners registered.
     * This is more semantic and robust than checking getListenerCount() === 0.
     * Prefer this method for conditional event emission optimization.
     */
    hasListeners(e) {
        const t = this._listeners.get(e)
        return t !== void 0 && t.size > 0
    }
    /**
     * Check if any of the specified event types have listeners.
     * Useful for checking multiple event types at once.
     */
    hasAnyListeners(...e) {
        return e.some((t) => this.hasListeners(t))
    }
    /**
     * Clear all listeners
     */
    clearAllListeners() {
        this._listeners.forEach((e) => e.clear())
    }
}
class me {
    constructor(e, t, i) {
        ;((this._eventManager = t),
            (this._plugins = /* @__PURE__ */ new Map()),
            (this._cleanupFunctions = /* @__PURE__ */ new Map()),
            (this._engine = e),
            (this._eventManager = t),
            (this._logger = f.getInstance({
                debugMode: i ?? !1,
                prefix: 'PluginManager',
            })))
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
class ye {
    constructor(e, t) {
        ;((this._eventManager = e),
            (this._errorHandler = t),
            (this._logger = f.getInstance({ prefix: 'ChecklistManager' })))
    }
    /**
     * Type guard to verify that a step has a valid ChecklistStepPayload
     */
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
                ((s = n.map((r) => ({
                    id: r.id,
                    isCompleted: !1,
                }))),
                (t.flowData = {
                    ...t.flowData,
                    [i]: [...s],
                })),
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
                availableItems: r.items.map((p) => p.id),
            }),
                this._errorHandler.handleError(u, 'updateChecklistItem - item existence', n))
            return
        }
        let c = n.flowData[a] || []
        const d = c.findIndex((u) => u.id === e)
        this._eventManager.notifyListeners('checklistItemToggled', {
            itemId: e,
            isCompleted: t,
            step: i,
            context: n,
        })
        const h = this.getChecklistProgress(i, n)
        if (
            (this._eventManager.notifyListeners('checklistProgressChanged', {
                step: i,
                context: n,
                progress: h,
            }),
            d !== -1)
        ) {
            const u = [...c]
            ;((u[d] = { ...u[d], isCompleted: t }), (c = u))
        } else c = [...c, { id: e, isCompleted: t }]
        const _ = JSON.stringify(n.flowData)
        if (
            ((n.flowData = {
                ...n.flowData,
                [a]: c,
            }),
            JSON.stringify(n.flowData) !== _ && s)
        )
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
        return {
            completed: r,
            total: s,
            percentage: Math.round(a),
            isComplete: o,
        }
    }
}
class ve {
    constructor(e = 100, t = !1) {
        ;((this._maxDepth = e),
            (this._logger = f.getInstance({
                debugMode: t,
                prefix: 'StepValidator',
            })))
    }
    /**
     * Validates an array of steps for common configuration errors
     */
    validateSteps(e) {
        const t = [],
            i = []
        if (!e || e.length === 0)
            return (
                i.push({
                    warningType: 'MISSING_PAYLOAD',
                    message: 'No steps defined in the flow',
                }),
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
    /**
     * TASK-031: Validates that all step IDs are unique
     */
    _validateIdUniqueness(e, t) {
        const i = /* @__PURE__ */ new Map()
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
    /**
     * Validates the structure of a single step
     */
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
    /**
     * TASK-032: Detects circular navigation patterns up to maxDepth
     */
    _detectCircularNavigation(e, t) {
        e.forEach((i) => {
            if (!i.id) return
            const n = /* @__PURE__ */ new Set(),
                s = []
            this._checkCircularPath(i.id, e, n, s, t)
        })
    }
    /**
     * Recursively checks for circular paths using DFS
     */
    _checkCircularPath(e, t, i, n, s) {
        if (n.length >= this._maxDepth) {
            s.push({
                stepId: e,
                errorType: 'CIRCULAR_NAVIGATION',
                message: `Potential circular navigation detected: path depth exceeds ${this._maxDepth} steps`,
                details: {
                    startStep: n[0],
                    currentStep: e,
                    pathLength: n.length,
                    maxDepth: this._maxDepth,
                },
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
                    details: {
                        cycle: o,
                        cycleLength: o.length - 1,
                    },
                })
            }
            return
        }
        ;(i.add(e), n.push(e))
        const r = v(t, e)
        r &&
            (typeof r.nextStep == 'string' && this._checkCircularPath(r.nextStep, t, new Set(i), [...n], s),
            r.isSkippable &&
                typeof r.skipToStep == 'string' &&
                this._checkCircularPath(r.skipToStep, t, new Set(i), [...n], s))
    }
    /**
     * Validates static navigation references
     */
    _validateStaticReferences(e, t) {
        e.forEach((i) => {
            i.id &&
                (typeof i.nextStep == 'string' &&
                    !v(e, i.nextStep) &&
                    t.push({
                        stepId: i.id,
                        warningType: 'BROKEN_LINK',
                        message: `Step '${i.id}' has a 'nextStep' reference to non-existent step '${i.nextStep}'`,
                        details: { targetStep: i.nextStep },
                    }),
                typeof i.previousStep == 'string' &&
                    !v(e, i.previousStep) &&
                    t.push({
                        stepId: i.id,
                        warningType: 'BROKEN_LINK',
                        message: `Step '${i.id}' has a 'previousStep' reference to non-existent step '${i.previousStep}'`,
                        details: { targetStep: i.previousStep },
                    }),
                i.isSkippable &&
                    typeof i.skipToStep == 'string' &&
                    !v(e, i.skipToStep) &&
                    t.push({
                        stepId: i.id,
                        warningType: 'BROKEN_LINK',
                        message: `Step '${i.id}' has a 'skipToStep' reference to non-existent step '${i.skipToStep}'`,
                        details: { targetStep: i.skipToStep },
                    }))
        })
    }
    /**
     * Detects steps that may be unreachable from the first step
     */
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
        const n = /* @__PURE__ */ new Set(),
            s = [e[0].id]
        for (; s.length > 0; ) {
            const r = s.shift()
            if (n.has(r)) continue
            n.add(r)
            const a = v(e, r)
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
    /**
     * Quick validation check - returns true if valid, false if errors found
     */
    isValid(e) {
        return this.validateSteps(e).isValid
    }
    /**
     * Gets only errors from validation
     */
    getErrors(e) {
        return this.validateSteps(e).errors
    }
    /**
     * Gets only warnings from validation
     */
    getWarnings(e) {
        return this.validateSteps(e).warnings
    }
}
class P {
    static buildInitialContext(e) {
        const t = {
            flowData: {},
            ...(e.initialContext || {}),
        }
        return (
            t.flowData || (t.flowData = {}),
            t.flowData._internal
                ? (t.flowData._internal.stepStartTimes || (t.flowData._internal.stepStartTimes = {}),
                  t.flowData._internal.startedAt || (t.flowData._internal.startedAt = Date.now()))
                : (t.flowData._internal = {
                      completedSteps: {},
                      startedAt: Date.now(),
                      // Sets the flow start time
                      stepStartTimes: {},
                      // Initialize step start times map
                  }),
            t
        )
    }
    static mergeConfigs(e, t) {
        const i = e.initialContext ?? {},
            n = t.initialContext ?? {},
            s = {
                ...i,
                ...n,
                flowData: {
                    ...(i.flowData || {}),
                    ...(n.flowData || {}),
                },
            },
            r = e.plugins || [],
            a = t.plugins || [],
            o = [...r, ...a],
            c = t.steps || e.steps
        return {
            ...e,
            ...t,
            initialContext: s,
            plugins: o,
            steps: c,
        }
    }
    static validateConfig(e) {
        const t = [],
            i = []
        if (!e.steps || e.steps.length === 0) i.push('No steps defined in configuration')
        else {
            const s = new ve(100, !1).validateSteps(e.steps)
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
        return {
            isValid: t.length === 0,
            errors: t,
            warnings: i,
        }
    }
    static createDefaultConfig() {
        return {
            steps: [],
            initialContext: {
                flowData: {},
            },
            plugins: [],
        }
    }
    static cloneConfig(e) {
        return JSON.parse(JSON.stringify(e))
    }
}
function x(l) {
    return { ok: !0, value: l }
}
function L(l) {
    return { ok: !1, error: l }
}
function X(l) {
    return l.ok === !0
}
function Se(l) {
    return l.ok === !1
}
function Oe(l, e) {
    return X(l) ? x(e(l.value)) : l
}
function He(l, e) {
    return Se(l) ? L(e(l.error)) : l
}
function Re(l, e) {
    return X(l) ? e(l.value) : l
}
function $e(l) {
    try {
        return x(l())
    } catch (e) {
        return L(e instanceof Error ? e : new Error(String(e)))
    }
}
async function ze(l) {
    try {
        return x(await l())
    } catch (e) {
        return L(e instanceof Error ? e : new Error(String(e)))
    }
}
async function Ue(l) {
    try {
        return x(await l)
    } catch (e) {
        return L(e instanceof Error ? e : new Error(String(e)))
    }
}
class we {
    constructor(e, t) {
        ;((this._eventManager = e),
            (this._stateManager = t),
            (this._errorHistory = []),
            (this._maxHistorySize = 50),
            (this._logger = f.getInstance({
                prefix: '[ErrorHandler]',
            })))
    }
    handleError(e, t, i, n) {
        const s = e instanceof Error ? e : new Error(String(e)),
            r = {
                operation: t,
                stepId: n,
                timestamp: Date.now(),
                stack: s.stack,
            }
        return (
            this._errorHistory.push({
                error: s,
                context: r,
                engineContext: { ...i },
                // Store a snapshot
            }),
            this._errorHistory.length > this._maxHistorySize && this._errorHistory.shift(),
            this._logger.error(`[OnboardingEngine] ${t}:`, s, r),
            this._stateManager.setError(s),
            this._eventManager.notifyListeners('error', {
                error: s,
                context: i,
            }),
            s
        )
    }
    async safeExecute(e, t, i, n) {
        try {
            return x(await e())
        } catch (s) {
            return (this.handleError(s, t, i, n), L(s))
        }
    }
    safeExecuteSync(e, t, i, n) {
        try {
            return x(e())
        } catch (s) {
            return (this.handleError(s, t, i, n), L(s))
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
class Ce {
    constructor(e) {
        this._eventManager = e
    }
    /**
     * Unified method to register event listeners
     */
    addEventListener(e, t) {
        return this._eventManager.addEventListener(e, t)
    }
    // Convenience methods for common event types
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
    // Flow-level events
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
    // Step-level events
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
    // Navigation events
    onNavigationBack(e) {
        return this._eventManager.addEventListener('navigationBack', e)
    }
    onNavigationForward(e) {
        return this._eventManager.addEventListener('navigationForward', e)
    }
    onNavigationJump(e) {
        return this._eventManager.addEventListener('navigationJump', e)
    }
    // Interaction events
    onUserIdle(e) {
        return this._eventManager.addEventListener('userIdle', e)
    }
    onUserReturned(e) {
        return this._eventManager.addEventListener('userReturned', e)
    }
    onDataChanged(e) {
        return this._eventManager.addEventListener('dataChanged', e)
    }
    // Performance events
    onStepRenderTime(e) {
        return this._eventManager.addEventListener('stepRenderTime', e)
    }
    onPersistenceSuccess(e) {
        return this._eventManager.addEventListener('persistenceSuccess', e)
    }
    onPersistenceFailure(e) {
        return this._eventManager.addEventListener('persistenceFailure', e)
    }
    // Checklist events
    onChecklistItemToggled(e) {
        return this._eventManager.addEventListener('checklistItemToggled', e)
    }
    onChecklistProgressChanged(e) {
        return this._eventManager.addEventListener('checklistProgressChanged', e)
    }
    // Plugin events
    onPluginInstalled(e) {
        return this._eventManager.addEventListener('pluginInstalled', e)
    }
    onPluginError(e) {
        return this._eventManager.addEventListener('pluginError', e)
    }
    // Plugin compatibility methods
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
    // Helper method (would need to be injected or passed from engine)
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    _findStepById(e) {}
    // Utility methods
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
    /**
     * Cached step lookup with LRU eviction
     */
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
    /**
     * Memoized step evaluation
     */
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
    /**
     * Debounce function for frequent operations
     */
    static debounce(e, t) {
        let i
        return (...n) => {
            ;(clearTimeout(i), (i = setTimeout(() => e(...n), t)))
        }
    }
    /**
     * Throttle function for rate limiting
     */
    static throttle(e, t) {
        let i
        return (...n) => {
            i || (e(...n), (i = !0), setTimeout(() => (i = !1), t))
        }
    }
    /**
     * Performance measurement wrapper
     */
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
    /**
     * Async performance measurement wrapper
     */
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
    /**
     * Get performance statistics for an operation
     */
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
    /**
     * Clear all caches
     */
    static clearCaches() {
        ;(this._stepCache.clear(), this._evaluationCache.clear(), this._performanceMetrics.clear())
    }
    /**
     * Get cache statistics
     */
    static getCacheStats() {
        return {
            stepCacheSize: this._stepCache.size,
            evaluationCacheSize: this._evaluationCache.size,
            performanceMetricsCount: this._performanceMetrics.size,
        }
    }
    /**
     * Simple context hashing for cache keys
     */
    static _hashContext(e) {
        const t = e.flowData || {},
            i = Object.keys(t).sort(),
            n = {}
        for (const a of i) n[a] = t[a]
        return JSON.stringify({
            // Example: if context.user?.id affects evaluation, include it:
            // userId: context.user?.id,
            flowData: n,
        })
    }
    /**
     * Batch operations for better performance
     */
    static batchOperations(e, t = 10) {
        const i = []
        for (let n = 0; n < e.length; n += t) {
            const r = e.slice(n, n + t).map((a) => a())
            i.push(...r)
        }
        return i
    }
    /**
     * Memory usage monitoring
     */
    static getMemoryUsage() {
        const e = this._stepCache.size * 1e3,
            t = this._evaluationCache.size * 500,
            i = Array.from(this._performanceMetrics.values()).reduce((n, s) => n + s.length, 0) * 8
        return {
            cacheMemoryEstimate: e + t,
            performanceMemoryEstimate: i,
        }
    }
}
;((M._stepCache = /* @__PURE__ */ new Map()),
    (M._evaluationCache = /* @__PURE__ */ new Map()),
    (M._maxCacheSize = 1e3),
    (M._performanceMetrics = /* @__PURE__ */ new Map()),
    (M._logger = f.getInstance({
        debugMode: !1,
        // Default to false, could be made configurable
        prefix: 'PerformanceUtils',
    })))
let w = M
function Z() {
    const l = crypto.getRandomValues(new Uint8Array(16))
    return `session_${Array.from(l)
        .map((e) => e.toString(16).padStart(2, '0'))
        .join('')}`
}
class Ie {
    constructor(e = {}, t) {
        ;((this._flowInfo = {}),
            (this._config = e),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'SessionTracker' })),
            (this._sessionId = e.sessionId || Z()))
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
            (this._stepRenderTimes = /* @__PURE__ */ new Map()),
            (this._navigationTimes = /* @__PURE__ */ new Map()),
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
let R = A
class Ee {
    // 5 minutes default
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
class ke {
    constructor(e = [25, 50, 75, 100], t) {
        ;((this._progressMilestones = /* @__PURE__ */ new Set()),
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
class Te {
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
                performanceThresholds: {
                    slowStepMs: 3e3,
                    slowRenderMs: 2e3,
                },
                ...e,
            }),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'AnalyticsCoordinator' })),
            (this._sessionTracker = new Ie(this._config, this._logger)),
            (this._performanceTracker = new R(this._config, this._logger)),
            (this._activityTracker = new Ee(this._logger)),
            (this._progressMilestoneTracker = new ke(
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
    // Session delegation
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
    // Performance delegation
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
    // Activity delegation
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
    // Progress milestone delegation
    calculateFlowProgress(e, t) {
        return this._progressMilestoneTracker.calculateFlowProgress(e, t)
    }
    checkForNewMilestones(e) {
        return this._progressMilestoneTracker.checkForNewMilestones(e)
    }
    // Event tracking core
    trackEvent(e, t = {}) {
        const i = {
            ...t,
            ...this._sessionTracker.getFlowInfo(),
        }
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
class be {
    constructor(e = {}, t) {
        ;((this._stepStartTimes = /* @__PURE__ */ new Map()),
            (this._config = e),
            (this._logger = t || f.getInstance({ debugMode: e.debug, prefix: 'AnalyticsManager' })),
            (this._coordinator = new Te(e, this._logger)))
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
    // ==================== Core Tracking Methods ====================
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
        this.trackEvent('step_retried', {
            stepId: e.id,
            stepType: e.type,
            retryCount: i,
            previousAttempts: i - 1,
        })
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
        this.trackEvent('step_slow', {
            stepId: e.id,
            stepType: e.type,
            duration: i,
            threshold: 3e3,
        })
    }
    // ==================== Flow Tracking Methods ====================
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
    // ==================== Navigation Tracking Methods ====================
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
            // Would be calculated based on step indices in full engine
        })
    }
    // ==================== Data & Persistence Tracking ====================
    trackDataChanged(e, t, i, n) {
        this.trackEvent('data_changed', {
            changedFields: t,
            changedFieldCount: t.length,
            dataSizeBefore: JSON.stringify(i).length,
            dataSizeAfter: JSON.stringify(n).length,
        })
    }
    trackPersistenceSuccess(e, t) {
        this.trackEvent('persistence_success', {
            persistenceTime: t,
            dataPersisted: JSON.stringify(e.flowData).length,
        })
    }
    trackPersistenceFailure(e, t) {
        this.trackEvent('persistence_failure', {
            errorMessage: t.message,
            errorName: t.name,
        })
    }
    // ==================== User Activity Tracking ====================
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
    // ==================== Checklist Tracking ====================
    trackChecklistItemToggled(e, t, i) {
        this.trackEvent('checklist_item_toggled', {
            itemId: e,
            isCompleted: t,
            stepId: i.id,
            stepType: i.type,
        })
    }
    trackChecklistProgressChanged(e, t) {
        this.trackEvent('checklist_progress_changed', {
            stepId: e.id,
            stepType: e.type,
            ...t,
        })
    }
    // ==================== Error & Progress Tracking ====================
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
    // ==================== Private Helper Methods ====================
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
class Me {
    constructor(e) {
        ;((this.name = 'onboardjs-cloud'),
            (this._queue = []),
            (this._isFlushing = !1),
            (this._logger = f.getInstance({ prefix: '[HttpProvider]' })),
            (this._config = {
                batchSize: 10,
                batchInterval: 2e3,
                ...e,
            }),
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
let xe = 0
class Ve {
    constructor(e) {
        ;((this._currentStepInternal = null),
            (this._history = []),
            (this._registry = null),
            (this.instanceId = ++xe),
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
        const t = P.validateConfig(e)
        if (!t.isValid) throw new Error(`Invalid configuration: ${t.errors.join(', ')}`)
        ;(t.warnings.length > 0 && this._logger.warn('Configuration warnings:', t.warnings),
            (this._config = e),
            (this._steps = e.steps))
        const i = this._config.initialStepId || (this._steps.length > 0 ? this._steps[0].id : null)
        ;((this._contextInternal = P.buildInitialContext(e)),
            (this._eventManager = new fe()),
            (this._coreEngineService = new U(this._eventManager, this._steps, i, this.flowContext, e.debug)),
            (this._errorHandler = new we(this._eventManager, this._coreEngineService)),
            (this._persistenceService = new te(
                e.loadData,
                e.persistData,
                e.clearPersistedData,
                this._errorHandler,
                this._eventManager,
                e.debug
            )),
            (this._checklistManager = new ye(this._eventManager, this._errorHandler)),
            (this._operationQueue = new pe(1)),
            (this._navigationService = new V(
                this._steps,
                this._eventManager,
                this._coreEngineService,
                this._persistenceService,
                this._errorHandler,
                this._logger
            )),
            (this._pluginManager = new me(this, this._eventManager, e.debug)),
            (this._eventRegistry = new Ce(this._eventManager)),
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
    /**
     * Register engine with the registry if provided in configuration.
     */
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
    /**
     * Unregister engine from its current registry
     */
    _unregisterFromRegistry() {
        if (!this.flowContext.flowId || !this._registry) return
        this._registry.get(this.flowContext.flowId) === this &&
            (this._registry.unregister(this.flowContext.flowId),
            this._logger.debug(`Engine unregistered from provided registry: ${this.flowContext.flowId}`))
    }
    /**
     * Check if this engine is currently registered
     */
    _isRegistered() {
        return !this.flowContext.flowId || !this._registry ? !1 : this._registry.get(this.flowContext.flowId) === this
    }
    /**
     * Re-register engine with its current registry (used during reset)
     */
    _registerWithCurrentRegistry() {
        !this.flowContext.flowId || !this._registry || this._registry.register(this.flowContext.flowId, this)
    }
    _setupInitializationPromise() {
        this._initializationPromise = new Promise((e, t) => {
            ;((this._resolveInitialization = e), (this._rejectInitialization = t))
        })
    }
    /**
     * Core initialization method
     */
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
                          this._eventManager.notifyListeners('error', {
                              error: t,
                              context: this._contextInternal,
                          }),
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
        let t = P.buildInitialContext(this._config)
        if (e) {
            const {
                flowData: i,
                // Exclude currentStepId as it's handled separately for navigation
                // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                currentStepId: n,
                ...s
            } = e
            ;((t = {
                ...t,
                // Preserve the _internal structure from buildInitialContext
                ...s,
                // Overlay with loaded data's top-level properties
            }),
                (t.flowData = {
                    ...t.flowData,
                    // This ensures `_internal` is carried over
                    ...(i || {}),
                    // Add/overwrite with custom data from loadedFlowData
                }),
                t.flowData._internal
                    ? (t.flowData._internal.completedSteps || (t.flowData._internal.completedSteps = {}),
                      t.flowData._internal.startedAt || (t.flowData._internal.startedAt = Date.now()),
                      t.flowData._internal.stepStartTimes || (t.flowData._internal.stepStartTimes = {}))
                    : (t.flowData._internal = {
                          completedSteps: {},
                          startedAt: Date.now(),
                          stepStartTimes: {},
                      }))
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
    // =============================================================================
    // PUBLIC API METHODS (Simplified)
    // =============================================================================
    /**
     * Waits for the onboarding engine to be fully initialized
     */
    async ready() {
        return this._initializationPromise
    }
    /**
     * Install a plugin
     */
    async use(e) {
        try {
            await this._pluginManager.install(e)
        } catch (t) {
            throw (this._logger.error(`Failed to install plugin "${e.name}" via use():`, t), t)
        }
        return this
    }
    /**
     * Get current engine state
     */
    getState() {
        return this._coreEngineService.getState(this._currentStepInternal, this._contextInternal, this._history)
    }
    /**
     * Navigate to next step
     */
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
    /**
     * Navigate to previous step
     */
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
    /**
     * Skip current step
     */
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
    /**
     * Go to specific step
     */
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
    /**
     * Update context
     */
    async updateContext(e) {
        return this._operationQueue.enqueue(async () => {
            const t = { ...this._contextInternal },
                i = JSON.stringify(this._contextInternal),
                { flowData: n, ...s } = e
            ;((this._contextInternal = { ...this._contextInternal, ...s }),
                n &&
                    (this._contextInternal.flowData = {
                        ...(this._contextInternal.flowData || {}),
                        ...n,
                    }))
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
                    // This context now includes the updates
                    this._history
                ))
        })
    }
    /**
     * Update checklist item
     */
    async updateChecklistItem(e, t, i) {
        return this._operationQueue.enqueue(async () => {
            const n = i ? v(this._steps, i) : this._currentStepInternal
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
    /**
     * Reset the engine
     */
    async reset(e) {
        this._logger.debug('Resetting engine...')
        const t = e ? 'configuration_change' : 'manual_reset'
        this._eventManager.notifyListeners('flowReset', {
            context: this._contextInternal,
            resetReason: t,
        })
        const i = this._persistenceService.getClearPersistedDataHandler()
        if (
            (await this._pluginManager.cleanup(),
            this._operationQueue.clear(),
            e &&
                (this.flowContext.flowId &&
                    e.flowId &&
                    this.flowContext.flowId !== e.flowId &&
                    this._unregisterFromRegistry(),
                (this._config = P.mergeConfigs(this._config, e)),
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
            (this._contextInternal = P.buildInitialContext(this._config)),
            (this._coreEngineService = new U(
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
            (this._navigationService = new V(
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
    // =============================================================================
    // EVENT HANDLING (Delegated to EventHandlerRegistry)
    // =============================================================================
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
    /**
     * Get flow identification information
     */
    getFlowInfo() {
        return { ...this.flowContext }
    }
    /**
     * Get the unique identifier for this flow
     */
    getFlowId() {
        return this.flowContext.flowId
    }
    /**
     * Get the version of this flow
     */
    getFlowVersion() {
        return this.flowContext.flowVersion
    }
    /**
     * Get the name of this flow
     */
    getFlowName() {
        return this.flowContext.flowName
    }
    /**
     * Get metadata associated with this flow
     */
    getFlowMetadata() {
        return this.flowContext.flowMetadata
    }
    /**
     * Get the instance ID for this flow
     */
    getInstanceId() {
        return this.instanceId
    }
    /**
     * Generate a namespaced key for persistence based on flow identification
     */
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
    /**
     * Check if this engine instance matches the given flow identifier
     */
    matchesFlow(e) {
        return this.flowContext.flowId === e
    }
    /**
     * Check if this engine instance is compatible with a given version
     * Uses semantic versioning comparison
     */
    isVersionCompatible(e) {
        if (!this.flowContext.flowVersion) return !1
        const t = this.flowContext.flowVersion.split('.')[0],
            i = e.split('.')[0]
        return t === i
    }
    // =============================================================================
    // PLUGIN COMPATIBILITY METHODS
    // =============================================================================
    setDataLoadHandler(e) {
        this._persistenceService.setDataLoadHandler(e)
    }
    setDataPersistHandler(e) {
        this._persistenceService.setDataPersistHandler(e)
    }
    setClearPersistedDataHandler(e) {
        this._persistenceService.setClearPersistedDataHandler(e)
    }
    // =============================================================================
    // BACKWARD COMPATIBILITY LAYER (Deprecated)
    // =============================================================================
    /**
     * @deprecated Use `coreEngineService` or the engine's state management methods directly.
     * This getter is provided for backward compatibility during the v1.0 migration.
     * It will be removed in a future major version.
     */
    get stateManager() {
        return (
            this._config.debug &&
                this._logger.warn(
                    'DEPRECATED: Accessing `stateManager` directly is deprecated. The engine now uses `CoreEngineService` internally. This property is provided for backward compatibility and will be removed in v2.0.'
                ),
            this._coreEngineService
        )
    }
    /**
     * Get all steps in the onboarding flow.
     * This includes all steps defined in the initial configuration.
     * @returns An array of all steps in the onboarding flow.
     */
    getSteps() {
        return [...this._steps]
    }
    /**
     * Get the index of a specific step in the onboarding flow based on relevant steps.
     * @param stepId The ID of the step to find.
     * @returns The index of the step, or -1 if not found.
     */
    getStepIndex(e) {
        return this._coreEngineService.getRelevantSteps(this._contextInternal).findIndex((t) => t.id === e)
    }
    /**
     * Get relevant steps in the flow based on the current context.
     * @returns An array of steps that are relevant to the current context.
     */
    getRelevantSteps() {
        return this._coreEngineService.getRelevantSteps(this._contextInternal)
    }
    // =============================================================================
    // UTILITY AND DEBUG METHODS
    // =============================================================================
    /**
     * Get performance statistics
     */
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
    /**
     * Get error history
     */
    getErrorHistory() {
        return this._errorHandler.getErrorHistory()
    }
    /**
     * Allows plugins or external code to report an error to the engine's
     * centralized error handler.
     * @param error The error object or unknown value.
     * @param operation A string describing the operation that failed (e.g., 'MyPlugin.saveData').
     */
    reportError(e, t) {
        this._errorHandler.handleError(e, t, this._contextInternal)
    }
    /**
     * Get checklist progress for current step
     */
    getChecklistProgress() {
        return !this._currentStepInternal || this._currentStepInternal.type !== 'CHECKLIST'
            ? null
            : this._checklistManager.getChecklistProgress(this._currentStepInternal, this._contextInternal)
    }
    // For plugins to report step validation failures
    reportStepValidationFailure(e, t) {
        this._eventManager.notifyListeners('stepValidationFailed', {
            step: e,
            context: this._contextInternal,
            validationErrors: t,
        })
    }
    // For plugins to report help requests
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
    /**
     * Force garbage collection of caches
     */
    clearCaches() {
        ;(w.clearCaches(), this._errorHandler.clearErrorHistory())
    }
    /**
     * Pause the onboarding flow
     * This emits a flowPaused event for analytics tracking
     */
    pauseFlow(e = 'user_action') {
        this._eventManager.notifyListeners('flowPaused', {
            context: this._contextInternal,
            reason: e,
        })
    }
    /**
     * Resume the onboarding flow
     * This emits a flowResumed event for analytics tracking
     */
    resumeFlow(e = 'current_step') {
        this._eventManager.notifyListeners('flowResumed', {
            context: this._contextInternal,
            resumePoint: e,
        })
    }
    /**
     * Mark the flow as abandoned
     * This emits a flowAbandoned event for analytics tracking
     */
    abandonFlow(e = 'user_action') {
        this._eventManager.notifyListeners('flowAbandoned', {
            context: this._contextInternal,
            abandonmentReason: e,
        })
    }
    /**
     * Mark the current step as abandoned due to timeout or other reasons
     * This emits a stepAbandoned event for analytics tracking
     */
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
    /**
     * Mark the current step as retried
     * This emits a stepRetried event for analytics tracking
     */
    retryStep(e = 1) {
        this._currentStepInternal &&
            this._eventManager.notifyListeners('stepRetried', {
                step: this._currentStepInternal,
                context: this._contextInternal,
                retryCount: e,
            })
    }
    /**
     * Get the time spent on the current step in milliseconds
     */
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
                t.providers.push(
                    new Me({
                        publicKey: e.publicKey,
                        apiHost: e.apiHost,
                        debug: e.debug,
                    })
                )))
        const i = new be(t, this._logger)
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
                e.trackEvent('flow_registered', {
                    flowInfo: t.flowInfo,
                    timestamp: Date.now(),
                })
            }),
            this.addEventListener('flowUnregistered', (t) => {
                e.trackEvent('flow_unregistered', {
                    flowInfo: t.flowInfo,
                    timestamp: Date.now(),
                })
            }),
            this.addEventListener('pluginInstalled', (t) => {
                e.trackEvent('plugin_installed', {
                    pluginName: t.pluginName,
                    timestamp: Date.now(),
                })
            }),
            this.addEventListener('pluginError', (t) => {
                e.trackEvent('plugin_error', {
                    pluginName: t.pluginName,
                    errorMessage: t.error.message,
                    timestamp: Date.now(),
                })
            }))
    }
    /**
     * Helper method to identify changed fields between contexts
     */
    _getChangedFields(e, t) {
        const i = [],
            n = e.flowData,
            s = t.flowData
        return (
            /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(s)]).forEach((a) => {
                if (a === '_internal') return
                const o = JSON.stringify(n[a]),
                    c = JSON.stringify(s[a])
                o !== c && i.push(a)
            }),
            i
        )
    }
    // Public method to track custom events
    trackEvent(e, t = {}) {
        this._analyticsManager.trackEvent(e, t)
    }
    /**
     * Track a custom business event with enhanced context information.
     * This method automatically enriches the event with current flow context.
     *
     * @param eventName The name of the custom event
     * @param properties Additional properties to include with the event
     * @param options Optional configuration for the event
     */
    trackCustomEvent(e, t = {}, i = {}) {
        const {
                includeStepContext: n = !0,
                includeFlowProgress: s = !0,
                includeContextData: r = !1,
                category: a = 'custom',
                priority: o = 'normal',
            } = i,
            c = {
                ...t,
                category: a,
                priority: o,
                timestamp: Date.now(),
            }
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
    /**
     * Sanitize context data for analytics tracking by removing sensitive information
     */
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
    // Public method to register additional analytics providers
    registerAnalyticsProvider(e) {
        this._analyticsManager.registerProvider(e)
    }
    // Method to flush analytics events
    flushAnalytics() {
        return this._analyticsManager.flush()
    }
    // Method to set user ID for analytics
    setAnalyticsUserId(e) {
        ;((this._config.userId = e), this._analyticsManager.setUserId(e))
    }
    /**
     * Cleanup and destroy the engine instance
     */
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
    /**
     * Get detailed engine information for debugging
     */
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
class Le {
    constructor() {
        this._engines = /* @__PURE__ */ new Map()
    }
    /**
     * Register an engine instance with a flow ID
     */
    register(e, t) {
        ;(this._engines.has(e) &&
            console.warn(
                `[OnboardingEngineRegistry] Overwriting existing engine with flowId: ${e}. Consider using a unique flowId for each engine instance.`
            ),
            this._engines.set(e, t))
    }
    /**
     * Unregister an engine by flow ID
     */
    unregister(e) {
        return this._engines.delete(e)
    }
    /**
     * Get an engine by flow ID
     */
    get(e) {
        return this._engines.get(e)
    }
    /**
     * Check if an engine exists with the given flow ID
     */
    has(e) {
        return this._engines.has(e)
    }
    /**
     * Get all registered engines
     */
    getAll() {
        return Array.from(this._engines.values())
    }
    /**
     * Get all registered flow IDs
     */
    getFlowIds() {
        return Array.from(this._engines.keys())
    }
    /**
     * Get engines matching a version pattern (semver-style matching)
     */
    getByVersion(e) {
        return Array.from(this._engines.values()).filter((t) => t.isVersionCompatible(e))
    }
    /**
     * Get engines matching specific query options
     */
    query(e) {
        let t = Array.from(this._engines.values())
        return (
            e.flowName && (t = t.filter((i) => i.getFlowName() === e.flowName)),
            e.versionPattern && (t = t.filter((i) => i.isVersionCompatible(e.versionPattern))),
            t
        )
    }
    /**
     * Get registry statistics
     */
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
            {
                totalEngines: e.length,
                enginesByFlow: t,
                enginesByVersion: i,
            }
        )
    }
    /**
     * Clear all registered engines
     */
    clear() {
        this._engines.clear()
    }
    /**
     * Get the number of registered engines
     */
    get size() {
        return this._engines.size
    }
    /**
     * Iterate over all engines
     */
    forEach(e) {
        this._engines.forEach((t, i) => e(t, i))
    }
    /**
     * Get flow info for all registered engines
     */
    getAllFlowInfo() {
        return Array.from(this._engines.values()).map((e) => e.getFlowInfo())
    }
}
function Ke() {
    return new Le()
}
const k = class k {
    /**
     * Generate a namespaced persistence key based on flow identification
     */
    static generatePersistenceKey(e, t = 'onboarding') {
        const i = [t],
            n = e.getFlowId(),
            s = e.getFlowName(),
            r = e.getFlowVersion()
        return (n ? i.push(n) : s && i.push(s.replace(/\s+/g, '_').toLowerCase()), r && i.push(`v${r}`), i.join('_'))
    }
    /**
     * Get all engines matching a flow pattern
     * @param pattern - Pattern to match engines
     * @param registry - Registry to search in
     */
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
    /**
     * Get the most recent version of a flow by name
     * @param flowName - Name of the flow to find
     * @param registry - Registry to search in
     */
    static getLatestVersionByFlowName(e, t) {
        const i = k.getEnginesByPattern({ flowName: e }, t)
        return i.length === 0
            ? null
            : (i.sort((n, s) => {
                  const r = n.getFlowVersion() || '0.0.0'
                  return (s.getFlowVersion() || '0.0.0').localeCompare(r)
              }),
              i[0])
    }
    /**
     * Check if two engines are compatible versions of the same flow
     */
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
    /**
     * Create a flow-aware data persistence wrapper
     */
    static createFlowAwarePersistence(e) {
        const t = k.generatePersistenceKey(e)
        return {
            async load() {
                try {
                    const i = localStorage.getItem(t)
                    return i ? JSON.parse(i) : null
                } catch (i) {
                    return (k._logger.error(`Error loading data for ${t}:`, i), null)
                }
            },
            async save(i, n) {
                try {
                    const s = {
                        ...i,
                        currentStepId: n,
                        savedAt: Date.now(),
                        flowInfo: e.getFlowInfo(),
                    }
                    localStorage.setItem(t, JSON.stringify(s))
                } catch (s) {
                    k._logger.error(`Error saving data for ${t}:`, s)
                }
            },
            async clear() {
                try {
                    localStorage.removeItem(t)
                } catch (i) {
                    k._logger.error(`Error clearing data for ${t}:`, i)
                }
            },
            getKey() {
                return t
            },
        }
    }
}
k._logger = f.getInstance({ prefix: '[FlowUtils]' })
let J = k
class qe {
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
                // Special: use addEventListener for generic events
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
    /** Override to provide plugin hooks */
    getHooks() {
        return {}
    }
    /** Override to handle plugin installation */
    async onInstall() {}
    /** Override to handle plugin uninstallation */
    async onUninstall() {}
    /** Get plugin configuration */
    getConfig() {
        return this.config
    }
    /** Update plugin configuration */
    updateConfig(e) {
        this.config = { ...this.config, ...e }
    }
}
const F = class F {
    /**
     * Serialize OnboardingStep[] to JSON string
     */
    static toJSON(e, t = {}) {
        const i = { ...this._DEFAULT_OPTIONS, ...t },
            n = [],
            s = []
        try {
            if (i.validateSteps) {
                const c = this._validateSteps(e)
                if ((n.push(...c.errors), s.push(...c.warnings), c.errors.length > 0 && !i.includeValidationErrors))
                    return {
                        success: !1,
                        errors: n,
                        warnings: s,
                    }
            }
            const r = e.map((c, d) => this._serializeStep(c, d, i, n, s)),
                a = {
                    version: this._VERSION,
                    steps: r,
                    metadata: {
                        exportedAt: /* @__PURE__ */ new Date().toISOString(),
                        totalSteps: e.length,
                        stepTypes: [...new Set(e.map((c) => c.type || 'INFORMATION'))],
                        hasCustomComponents: e.some((c) => c.type === 'CUSTOM_COMPONENT'),
                        hasFunctions: this._hasAnyFunctions(e),
                    },
                },
                o = i.prettyPrint ? JSON.stringify(a, null, 2) : JSON.stringify(a)
            return {
                success: n.length === 0,
                data: o,
                errors: n,
                warnings: s,
            }
        } catch (r) {
            return (
                n.push(`Serialization failed: ${r instanceof Error ? r.message : String(r)}`),
                {
                    success: !1,
                    errors: n,
                    warnings: s,
                }
            )
        }
    }
    /**
     * Deserialize JSON string to OnboardingStep[]
     */
    static fromJSON(e, t = {}) {
        const i = { ...this._DEFAULT_OPTIONS, ...t },
            n = [],
            s = []
        try {
            const r = JSON.parse(e),
                a = this._validateSchema(r)
            if ((n.push(...a.errors), s.push(...a.warnings), a.errors.length > 0))
                return {
                    success: !1,
                    errors: n,
                    warnings: s,
                }
            const o = r.steps.map((c, d) => this._deserializeStep(c, d, i, n, s)).filter((c) => c !== null)
            if (i.validateSteps) {
                const c = this._validateSteps(o)
                ;(n.push(...c.errors), s.push(...c.warnings))
            }
            return {
                success: n.length === 0,
                data: o,
                errors: n,
                warnings: s,
            }
        } catch (r) {
            return (
                n.push(`Deserialization failed: ${r instanceof Error ? r.message : String(r)}`),
                {
                    success: !1,
                    errors: n,
                    warnings: s,
                }
            )
        }
    }
    // =============================================================================
    // STEP SERIALIZATION
    // =============================================================================
    static _serializeStep(e, t, i, n, s) {
        try {
            const r = {
                id: e.id,
            }
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
                {
                    id: e.id,
                    type: e.type,
                }
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
            return {
                __isFunction: !0,
                __functionBody: `// Placeholder for ${t} function`,
                __functionName: e.name || t,
            }
        if (n.customFunctionSerializer)
            return {
                __isFunction: !0,
                __functionBody: n.customFunctionSerializer(e, t, i),
                __functionName: e.name || t,
            }
        const s = e.toString(),
            r = this._extractFunctionParameters(s)
        return {
            __isFunction: !0,
            __functionBody: s,
            __functionName: e.name || t,
            __parameters: r,
        }
    }
    static _serializePayload(e, t, i, n) {
        if (!e.payload) return
        const s = e.type || 'INFORMATION'
        try {
            switch (s) {
                case 'INFORMATION':
                    return {
                        ...e.payload,
                        __payloadType: 'INFORMATION',
                    }
                case 'MULTIPLE_CHOICE': {
                    const r = e.payload
                    return {
                        ...r,
                        __payloadType: 'MULTIPLE_CHOICE',
                        options:
                            r.options?.map((a) => ({
                                ...a,
                                value: a.value,
                            })) || [],
                    }
                }
                case 'SINGLE_CHOICE': {
                    const r = e.payload
                    return {
                        ...r,
                        __payloadType: 'SINGLE_CHOICE',
                        options:
                            r.options?.map((a) => ({
                                ...a,
                                value: a.value,
                            })) || [],
                    }
                }
                case 'CONFIRMATION':
                    return {
                        ...e.payload,
                        __payloadType: 'CONFIRMATION',
                    }
                case 'CUSTOM_COMPONENT':
                    return {
                        ...e.payload,
                        __payloadType: 'CUSTOM_COMPONENT',
                    }
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
            const r = {
                id: e.id,
            }
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
                        a.options &&
                            (a.options = a.options.map((o) => ({
                                ...o,
                                value: o.value,
                            }))),
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
            n = /* @__PURE__ */ new Set()
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
    // =============================================================================
    // CONVENIENCE METHODS
    // =============================================================================
    /**
     * Quick serialize with default options
     */
    static serialize(e, t = !1) {
        const i = this.toJSON(e, { prettyPrint: t })
        return i.success ? i.data : null
    }
    /**
     * Quick deserialize with default options
     */
    static deserialize(e) {
        const t = this.fromJSON(e)
        return t.success ? t.data : null
    }
    /**
     * Create a copy of steps (serialize then deserialize)
     */
    static clone(e) {
        const t = this.serialize(e)
        return t ? this.deserialize(t) : null
    }
    /**
     * Prepares step data for export by serializing it to a JSON string.
     * This method is UI-agnostic and does not perform any DOM operations.
     *
     * @returns A ParseResult containing the data needed to create a file for download.
     */
    static getExportableData(e, t = 'onboarding-steps.json', i = {}) {
        const n = this.toJSON(e, { ...i, prettyPrint: !0 })
        return !n.success || !n.data
            ? {
                  success: !1,
                  errors: n.errors,
                  warnings: n.warnings,
              }
            : {
                  success: !0,
                  data: {
                      filename: t,
                      mimeType: 'application/json',
                      content: n.data,
                  },
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
    (F._logger = f.getInstance({
        debugMode: !1,
        // Default to false, could be made configurable
        prefix: 'StepJSONParser',
    })))
let E = F
var j
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
                        E._isSerializedFunction(o.nextStep) ||
                        E._isSerializedFunction(o.previousStep) ||
                        E._isSerializedFunction(o.skipToStep) ||
                        E._isSerializedFunction(o.onStepActive) ||
                        E._isSerializedFunction(o.onStepComplete) ||
                        E._isSerializedFunction(o.condition)
                )
            )
        } catch {
            return !1
        }
    }
    l.hasFunctions = s
})(j || (j = {}))
function G() {
    return Z()
}
function De() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch {
        return 'UTC'
    }
}
function Pe() {
    if (typeof window > 'u') return 'desktop'
    const l = window.innerWidth
    return l < 768 ? 'mobile' : l < 1024 ? 'tablet' : 'desktop'
}
function Ae() {
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
function Fe() {
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
class z {
    /**
     * Get flow data from a specific flow ID
     * @param flowId - The flow ID to get data for
     * @param registry - Optional registry to search for engines (required if flowId is provided)
     */
    static getFlowData(e, t) {
        if (!e || !t) return
        const i = t.get(e)
        if (i) return z.extractFromEngine(i)
    }
    /**
     * Extract flow data from an engine instance
     */
    static extractFromEngine(e) {
        const t = e.getState(),
            i = e.getContext()
        return {
            flow_id: e.getFlowId() || void 0,
            flow_version: e.getFlowVersion() || void 0,
            current_step_id: t.currentStep?.id?.toString(),
            current_step_index: void 0,
            // Not available in current state structure
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
    /**
     * Build a complete aha event from parameters
     */
    buildEvent(e, t) {
        const i = e.custom_timestamp ? new Date(e.custom_timestamp) : /* @__PURE__ */ new Date(),
            n = De(),
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
    /**
     * Build metrics with auto-calculation
     */
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
    /**
     * Build context with auto-detection and enrichment
     */
    _buildContext(e, t) {
        const i = {
            ...e,
            first_aha: e.first_aha ?? this._isFirstAha(t || 'anonymous'),
            previous_aha_events: e.previous_aha_events ?? (this._userAhaCount.get(t || 'anonymous') || 0),
        }
        return (
            typeof window < 'u' &&
                !e.platform &&
                ((i.platform = 'web'), (i.device_type = Pe()), (i.browser = Ae()), (i.os = Fe())),
            this._config.exclude_personal_data ? this._config.sanitize_context(i) : i
        )
    }
    /**
     * Check if this is the user's first aha moment
     */
    _isFirstAha(e) {
        return (this._userAhaCount.get(e) || 0) === 0
    }
}
class W {
    constructor(e) {
        ;((this._config = e),
            (this._userAhaCount = /* @__PURE__ */ new Map()),
            (this._lastAhaTime = /* @__PURE__ */ new Map()))
    }
    /**
     * Check if an aha event should be tracked for a user
     */
    shouldTrack(e) {
        if ((this._userAhaCount.get(e) || 0) >= this._config.max_events_per_user) return !1
        if (this._config.cooldown_seconds > 0) {
            const i = this._lastAhaTime.get(e)
            if (i && Date.now() - i < this._config.cooldown_seconds * 1e3) return !1
        }
        return !0
    }
    /**
     * Update user state after tracking an aha event
     */
    updateUserState(e) {
        ;(this._userAhaCount.set(e, (this._userAhaCount.get(e) || 0) + 1), this._lastAhaTime.set(e, Date.now()))
    }
    /**
     * Get user aha count
     */
    getUserCount(e) {
        return this._userAhaCount.get(e) || 0
    }
    /**
     * Get last aha time for user
     */
    getLastAhaTime(e) {
        return this._lastAhaTime.get(e) || null
    }
    /**
     * Clear user data
     */
    clearUserData(e) {
        ;(this._userAhaCount.delete(e), this._lastAhaTime.delete(e))
    }
    /**
     * Get internal maps for event builder access
     */
    getUserAhaCountMap() {
        return this._userAhaCount
    }
}
class N {
    /**
     * Convert aha event to analytics payload
     */
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
    /**
     * Convert aha event to standard analytics event
     */
    static toAnalyticsEvent(e) {
        return {
            type: 'onboarding_aha_moment',
            timestamp: new Date(e.timestamp).getTime(),
            properties: N.toAnalyticsPayload(e),
            sessionId: e.session_id,
            userId: e.user_id,
            flowId: e.onboarding_flow?.flow_id,
            flowName: e.onboarding_flow?.flow_id,
            // Could be enhanced
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
            (this._deduplicationManager = new W(this._config)),
            (this._eventBuilder = new Q(this._config, this._deduplicationManager.getUserAhaCountMap())),
            this._isClientSide() && this._initializeSession())
    }
    /**
     * Get the singleton instance of AhaTracker
     */
    static getInstance(e) {
        return (C._instance ? e && C._instance.updateConfig(e) : (C._instance = new C(e)), C._instance)
    }
    /**
     * Reset the singleton instance (useful for testing)
     */
    static resetInstance() {
        C._instance = null
    }
    /**
     * Initialize the tracker with an analytics manager
     */
    initialize(e) {
        ;((this._analyticsManager = e), this._logger.debug('AhaTracker initialized with AnalyticsManager'))
    }
    /**
     * Add a custom analytics provider
     */
    addProvider(e) {
        ;(this._customProviders.push(e), this._logger.debug(`Added custom provider: ${e.name}`))
    }
    /**
     * Link to OnboardingEngine for automatic user/flow detection (client-side only)
     *
     * @example
     * ```typescript
     * // In OnboardingProvider setup
     * const tracker = AhaTracker.getInstance()
     * tracker.linkToEngine({
     *   getUserId: () => engine.getContext().userId,
     *   getFlowData: () => ({
     *     flow_id: engine.config.flowId,
     *     current_step_id: engine.getState().currentStep?.id,
     *     // ...
     *   })
     * })
     * ```
     */
    linkToEngine(e) {
        if (!this._isClientSide()) {
            this._logger.warn('linkToEngine should only be called on client-side')
            return
        }
        ;((this._engineContext = e), this._logger.debug('Linked to OnboardingEngine for auto user detection'))
    }
    /**
     * Update tracker configuration
     */
    updateConfig(e) {
        ;((this._config = { ...this._config, ...this._buildConfig(e) }),
            e.custom_providers && (this._customProviders = e.custom_providers),
            (this._deduplicationManager = new W(this._config)),
            (this._eventBuilder = new Q(this._config, this._deduplicationManager.getUserAhaCountMap())))
    }
    /**
     * Track an aha moment
     *
     * @param params - Aha tracking parameters
     * @returns The tracked aha event or null if tracking was blocked
     *
     * @example
     * ```typescript
     * // Server-side (must provide user_id)
     * await aha({
     *   aha_type: 'value_demonstration',
     *   user_id: 'user_123', // REQUIRED on server
     *   context: { feature_name: 'video_download' }
     * })
     *
     * // Client-side (user_id auto-detected from linked engine)
     * await aha({
     *   aha_type: 'feature_activation',
     *   context: { feature_name: 'image_upload' }
     * })
     * ```
     */
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
            let n = e.flow_id ? z.getFlowData(e.flow_id) : void 0
            !n && this._engineContext && (n = this._engineContext.getFlowData())
            const s = this._eventBuilder.buildEvent(e, n)
            this._analyticsManager &&
                this._analyticsManager.trackEvent('onboarding_aha_moment', N.toAnalyticsPayload(s))
            const r = N.toAnalyticsEvent(s)
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
    /**
     * Get aha statistics for a user
     */
    getUserAhaStats(e) {
        return {
            total_aha_events: this._deduplicationManager.getUserCount(e),
            last_aha_time: this._deduplicationManager.getLastAhaTime(e),
            can_track_aha: this._deduplicationManager.shouldTrack(e),
        }
    }
    /**
     * Clear aha tracking data for a user (e.g., on logout)
     */
    clearUserData(e) {
        this._deduplicationManager.clearUserData(e)
    }
    /**
     * Resolve user_id from params or linked engine context
     * Priority: params.user_id > engineContext.getUserId() > undefined
     */
    _resolveUserId(e) {
        if (e.user_id) return e.user_id
        if (this._engineContext) {
            const t = this._engineContext.getUserId()
            if (t) return t
        }
    }
    /**
     * Initialize session tracking (client-side only)
     */
    _initializeSession() {
        if (this._isClientSide()) {
            ;((this._sessionId = this._config.session_id || G()),
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
    /**
     * Detect if running in client-side environment
     */
    _isClientSide() {
        return typeof window < 'u' && typeof document < 'u'
    }
    /**
     * Build configuration with defaults
     */
    _buildConfig(e) {
        return {
            event_version: e.event_version || '1.0.0',
            max_events_per_user: e.max_events_per_user ?? 1 / 0,
            cooldown_seconds: e.cooldown_seconds ?? 0,
            session_id: e.session_id || G(),
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
let $ = C
async function Be(l) {
    return $.getInstance().track(l)
}
export {
    Ee as ActivityTracker,
    $ as AhaTracker,
    Te as AnalyticsCoordinator,
    be as AnalyticsManager,
    pe as AsyncOperationQueue,
    qe as BasePlugin,
    P as ConfigurationBuilder,
    J as FlowUtils,
    Ve as OnboardingEngine,
    Le as OnboardingEngineRegistry,
    R as PerformanceTracker,
    me as PluginManagerImpl,
    ke as ProgressMilestoneTracker,
    Ie as SessionTracker,
    E as StepJSONParser,
    j as StepJSONParserUtils,
    ve as StepValidator,
    Be as aha,
    Re as andThen,
    Ke as createRegistry,
    T as evaluateStepId,
    v as findStepById,
    Ue as fromPromise,
    Ne as getStepIndex,
    Oe as map,
    He as mapErr,
    ze as safeAsync,
    $e as safeSync,
}
