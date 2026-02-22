import { BasePlugin as p, AhaTracker as g } from '@onboardjs/core'
class f {
    constructor(e) {
        this.config = e
    }
    buildEventData(e, t, i, n, s, o) {
        let r = { ...t }
        if (
            ((r.timestamp = /* @__PURE__ */ new Date().toISOString()),
            (r.event_type = e),
            this.config.globalProperties && (r = { ...r, ...this.config.globalProperties }),
            this.config.includeFlowInfo && o && (r.flow_info = this.buildFlowInfo(o)),
            this.config.includeUserProperties &&
                n?.currentUser &&
                (r.user_properties = this.buildUserProperties(n.currentUser)),
            this.config.includeFlowData && n?.flowData && (r.flow_data = this.sanitizeFlowData(n.flowData)),
            this.config.includeStepMetadata && i && (r.step_metadata = this.buildStepMetadata(i)),
            this.config.includeSessionData && (r.session_data = this.buildSessionData()),
            this.config.includePerformanceMetrics && s && (r.performance = s),
            i && this.config.stepPropertyEnrichers)
        ) {
            const a = this.config.stepPropertyEnrichers[i.type ?? 'INFORMATION']
            if (a) {
                const l = a(i, n)
                r = { ...r, ...l }
            }
        }
        return (
            this.config.sanitizeData && (r = this.config.sanitizeData(r)),
            this.config.excludePersonalData && (r = this.removePersonalData(r)),
            r
        )
    }
    buildUserProperties(e) {
        return this.config.userPropertyMapper
            ? this.config.userPropertyMapper(e)
            : {
                  user_id: e.id,
                  user_email: e.email,
                  user_name: e.name,
                  user_created_at: e.createdAt,
                  user_plan: e.plan,
                  user_role: e.role,
              }
    }
    sanitizeFlowData(e) {
        const t = { ...e }
        return (
            this.config.excludeFlowDataKeys &&
                this.config.excludeFlowDataKeys.forEach((i) => {
                    delete t[i]
                }),
            delete t._internal,
            t
        )
    }
    buildFlowInfo(e) {
        return {
            flow_id: e.flowId,
            flow_name: e.flowName,
            flow_version: e.flowVersion,
            flow_metadata: e.flowMetadata,
            instance_id: e.instanceId,
            flow_created_at: new Date(e.createdAt).toISOString(),
        }
    }
    buildStepMetadata(e) {
        return {
            step_id: e.id,
            step_type: e.type,
            has_condition: !!e.condition,
            is_skippable: !!e.isSkippable,
            has_validation: this.hasValidation(e),
            payload_keys: Object.keys(e.payload || {}),
            payload_size: JSON.stringify(e.payload || {}).length,
        }
    }
    buildSessionData() {
        return {
            session_id: this.getSessionId(),
            page_url: typeof window < 'u' ? window.location.href : void 0,
            user_agent: typeof navigator < 'u' ? navigator.userAgent : void 0,
            screen_resolution: typeof screen < 'u' ? `${screen.width}x${screen.height}` : void 0,
            viewport_size: typeof window < 'u' ? `${window.innerWidth}x${window.innerHeight}` : void 0,
        }
    }
    hasValidation(e) {
        return !!(
            e.payload &&
            (e.payload.validation || e.payload.required || e.payload.minSelections || e.payload.maxSelections)
        )
    }
    removePersonalData(e) {
        const t = ['email', 'phone', 'address', 'ssn', 'credit_card', 'password', 'token', 'api_key', 'secret'],
            i = { ...e },
            n = (s) => {
                if (typeof s != 'object' || s === null) return s
                if (Array.isArray(s)) return s.map(n)
                const o = {}
                for (const [r, a] of Object.entries(s)) {
                    const l = r.toLowerCase()
                    t.some((h) => l.includes(h)) ? (o[r] = '[REDACTED]') : (o[r] = n(a))
                }
                return o
            }
        return n(i)
    }
    getSessionId() {
        if (typeof window < 'u') {
            let e = sessionStorage.getItem('onboardjs_session_id')
            return (
                e ||
                    ((e = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`),
                    sessionStorage.setItem('onboardjs_session_id', e)),
                e
            )
        }
        return `server_session_${Date.now()}`
    }
}
class v {
    constructor(e = 3e5, t = 0.7) {
        ;((this.churnTimeoutMs = e), (this.churnRiskThreshold = t))
    }
    stepStartTimes = /* @__PURE__ */ new Map()
    churnTimeouts = /* @__PURE__ */ new Map()
    userActivity = /* @__PURE__ */ new Map()
    startStepTimer(e) {
        this.stepStartTimes.set(e.toString(), Date.now())
    }
    setupChurnTimeout(e, t, i) {
        const n = e.id.toString()
        this.clearChurnTimeout(n)
        const s = setTimeout(() => {
            const o = this.calculateChurnRiskFactors(e, t)
            i(e, t, o)
        }, this.churnTimeoutMs)
        this.churnTimeouts.set(n, s)
    }
    clearChurnTimeout(e) {
        const t = this.churnTimeouts.get(e)
        t && (clearTimeout(t), this.churnTimeouts.delete(e))
    }
    recordBackNavigation(e) {
        const t = this.getUserActivity(e)
        ;(t.backNavigationCount++, (t.lastActivity = Date.now()))
    }
    recordError(e) {
        const t = this.getUserActivity(e)
        ;(t.errorCount++, (t.lastActivity = Date.now()))
    }
    recordValidationFailure(e) {
        const t = this.getUserActivity(e)
        ;(t.validationFailures++, (t.lastActivity = Date.now()))
    }
    calculateChurnRisk(e, t) {
        const i = this.calculateChurnRiskFactors(e, t),
            n = 0.3,
            s = 0.2,
            o = 0.3,
            r = 0.2,
            a = Math.min(i.timeOnStep / this.churnTimeoutMs, 1),
            l = Math.min(i.backNavigationCount / 5, 1),
            h = Math.min(i.errorCount / 3, 1),
            _ = Math.min(i.idleTime / 6e4, 1)
        return a * n + l * s + h * o + _ * r
    }
    /**
     * Checks if a step is considered high churn risk.
     * @param step The onboarding step to evaluate.
     * @param context The onboarding context.
     * @returns True if the step is high churn risk, false otherwise.
     */
    isHighChurnRisk(e, t) {
        return this.calculateChurnRisk(e, t) >= this.churnRiskThreshold
    }
    // Method to get the threshold
    getChurnRiskThreshold() {
        return this.churnRiskThreshold
    }
    // Method to update threshold dynamically
    setChurnRiskThreshold(e) {
        this.churnRiskThreshold = Math.max(0, Math.min(1, e))
    }
    calculateChurnRiskFactors(e, t) {
        const i = e.id.toString(),
            n = t.currentUser?.id || 'anonymous',
            s = this.stepStartTimes.get(i) || Date.now(),
            o = this.getUserActivity(n)
        return {
            timeOnStep: Date.now() - s,
            backNavigationCount: o.backNavigationCount,
            errorCount: o.errorCount,
            idleTime: Date.now() - o.lastActivity,
            validationFailures: o.validationFailures,
        }
    }
    getUserActivity(e) {
        return (
            this.userActivity.has(e) ||
                this.userActivity.set(e, {
                    backNavigationCount: 0,
                    errorCount: 0,
                    validationFailures: 0,
                    lastActivity: Date.now(),
                }),
            this.userActivity.get(e)
        )
    }
    cleanup() {
        ;(this.churnTimeouts.forEach((e) => clearTimeout(e)),
            this.churnTimeouts.clear(),
            this.stepStartTimes.clear(),
            this.userActivity.clear())
    }
}
const d = typeof window < 'u' && typeof performance < 'u'
class m {
    renderStartTimes = /* @__PURE__ */ new Map()
    persistenceStartTimes = /* @__PURE__ */ new Map()
    startRenderTimer(e) {
        d && this.renderStartTimes.set(e, performance.now())
    }
    endRenderTimer(e) {
        if (!d) return
        const t = this.renderStartTimes.get(e)
        if (t) {
            const i = performance.now() - t
            return (this.renderStartTimes.delete(e), i)
        }
    }
    startPersistenceTimer(e) {
        d && this.persistenceStartTimes.set(e, performance.now())
    }
    endPersistenceTimer(e) {
        if (!d) return
        const t = this.persistenceStartTimes.get(e)
        if (t) {
            const i = performance.now() - t
            return (this.persistenceStartTimes.delete(e), i)
        }
    }
    getMemoryUsage() {
        if (d && 'memory' in performance) return performance.memory.usedJSHeapSize
    }
    getCurrentMetrics() {
        return {
            memoryUsage: this.getMemoryUsage(),
            navigationTime: this.getNavigationTime(),
        }
    }
    getNavigationTime() {
        if (d) {
            if ('getEntriesByType' in performance) {
                const e = performance.getEntriesByType('navigation')
                if (e.length > 0) return e[0].loadEventEnd
            }
            if ('timing' in performance && performance.timing) {
                const e = performance.timing
                if (e.loadEventEnd > 0 && e.navigationStart > 0) return e.loadEventEnd - e.navigationStart
            }
        }
    }
    cleanup() {
        ;(this.renderStartTimes.clear(), this.persistenceStartTimes.clear())
    }
}
class w extends p {
    name = '@onboardjs/plugin-posthog'
    version = '1.0.3'
    description = 'Official PostHog analytics plugin for OnboardJS'
    _posthog
    _eventBuilder
    _churnDetection
    _performanceTracker
    _progressMilestones = /* @__PURE__ */ new Set()
    _defaultEventNames = {
        // Flow events
        flowStarted: 'flow_started',
        flowCompleted: 'flow_completed',
        flowAbandoned: 'flow_abandoned',
        flowPaused: 'flow_paused',
        flowResumed: 'flow_resumed',
        flowReset: 'flow_reset',
        // Step events
        stepActive: 'step_active',
        stepCompleted: 'step_completed',
        stepSkipped: 'step_skipped',
        stepAbandoned: 'step_abandoned',
        stepRetried: 'step_retried',
        stepValidationFailed: 'step_validation_failed',
        stepHelpRequested: 'step_help_requested',
        // Navigation events
        navigationBack: 'navigation_back',
        navigationForward: 'navigation_forward',
        navigationJump: 'navigation_jump',
        // Interaction events
        userIdle: 'user_idle',
        userReturned: 'user_returned',
        dataChanged: 'data_changed',
        // Progress events
        progressMilestone: 'progress_milestone',
        highChurnRisk: 'high_churn_risk',
        // Performance events
        stepRenderSlow: 'step_render_slow',
        persistenceSuccess: 'persistence_success',
        persistenceFailure: 'persistence_failure',
        // Checklist events
        checklistItemToggled: 'checklist_item_toggled',
        checklistProgress: 'checklist_progress',
        // Experiment events
        experimentExposed: 'experiment_exposed',
        // Error events
        errorEncountered: 'error_encountered',
        pluginError: 'plugin_error',
    }
    async onInstall() {
        ;(this._initializePostHog(),
            (this._eventBuilder = new f(this.config)),
            (this._churnDetection = new v(this.config.churnTimeoutMs, this.config.churnRiskThreshold)),
            (this._performanceTracker = new m()),
            this._setupAhaTracking(),
            this.config.debug && console.info('[PostHogPlugin] Plugin installed successfully'))
    }
    async onUninstall() {
        ;(this._churnDetection.cleanup(),
            this._performanceTracker.cleanup(),
            this._progressMilestones.clear(),
            this.config.debug && console.info('[PostHogPlugin] Plugin uninstalled'))
    }
    getHooks() {
        return {
            // Flow-level events
            onFlowStarted: this._handleFlowStarted.bind(this),
            onFlowCompleted: this._handleFlowCompleted.bind(this),
            onFlowPaused: this._handleFlowPaused.bind(this),
            onFlowResumed: this._handleFlowResumed.bind(this),
            onFlowAbandoned: this._handleFlowAbandoned.bind(this),
            onFlowReset: this._handleFlowReset.bind(this),
            // Step-level events
            onStepActive: this._handleStepActive.bind(this),
            onStepCompleted: this._handleStepCompleted.bind(this),
            onStepSkipped: this._handleStepSkipped.bind(this),
            onStepRetried: this._handleStepRetried.bind(this),
            onStepValidationFailed: this._handleStepValidationFailed.bind(this),
            onStepHelpRequested: this._handleStepHelpRequested.bind(this),
            onStepAbandoned: this._handleStepAbandoned.bind(this),
            // Navigation events
            beforeStepChange: this._handleBeforeStepChange.bind(this),
            afterStepChange: this._handleAfterStepChange.bind(this),
            onNavigationBack: this._handleNavigationBack.bind(this),
            onNavigationForward: this._handleNavigationForward.bind(this),
            onNavigationJump: this._handleNavigationJump.bind(this),
            // Context events
            onContextUpdate: this._handleContextUpdate.bind(this),
            onDataChanged: this._handleDataChanged.bind(this),
            // Error events
            onError: this._handleError.bind(this),
            // Performance events
            onStepRenderTime: this._handleStepRenderTime.bind(this),
            onPersistenceSuccess: this._handlePersistenceSuccess.bind(this),
            onPersistenceFailure: this._handlePersistenceFailure.bind(this),
            // Checklist events
            onChecklistItemToggled: this._handleChecklistItemToggled.bind(this),
            onChecklistProgressChanged: this._handleChecklistProgressChanged.bind(this),
            // Plugin events
            onPluginInstalled: this._handlePluginInstalled.bind(this),
            onPluginError: this._handlePluginError.bind(this),
        }
    }
    _initializePostHog() {
        if (this.config.posthogInstance) this._posthog = this.config.posthogInstance
        else if (this.config.apiKey)
            if (typeof window < 'u') {
                const t = require('posthog-js').init(this.config.apiKey, {
                    api_host: this.config.host || 'https://app.posthog.com',
                })
                this._posthog = t
            } else throw new Error('PostHog instance or API key required')
        else throw new Error('PostHog configuration missing: provide either posthogInstance or apiKey')
    }
    /**
     * Set up aha moment tracking integration with PostHog.
     * This registers PostHog as an analytics provider for AhaTracker events.
     *
     * When users call aha(), the events will be captured in PostHog automatically.
     */
    _setupAhaTracking() {
        try {
            ;(g.getInstance().addProvider({
                name: 'posthog',
                trackEvent: (t) => {
                    this._trackAhaEvent(t)
                },
            }),
                this.config.debug && console.info('[PostHogPlugin] Aha tracking integration initialized'))
        } catch (e) {
            this.config.debug &&
                console.warn('[PostHogPlugin] Could not set up aha tracking. AhaTracker may not be initialized yet.', e)
        }
    }
    /**
     * Track aha moments in PostHog.
     * This method is called whenever an aha() event is tracked.
     */
    _trackAhaEvent(e) {
        try {
            const t = e.properties || e,
                i = t.aha_type || e.aha_type || 'unknown',
                n = 'onboarding_aha',
                s = {
                    // Map event fields to PostHog properties
                    aha_type: i,
                    journey_stage: t.journey_stage,
                    timestamp: e.timestamp,
                    session_id: e.sessionId,
                    user_id: e.userId,
                    flow_id: e.flowId,
                    flow_name: e.flowName,
                    flow_version: e.flowVersion,
                    // Aha-specific metrics (from properties)
                    first_aha: t.first_aha,
                    previous_aha_events: t.previous_aha_events,
                    time_to_aha_seconds: t.time_to_aha_seconds,
                    time_since_signup_seconds: t.time_since_signup_seconds,
                    // Spread any additional context and metrics
                    ...(t.context || {}),
                    ...(t.metrics || {}),
                }
            ;(this._posthog.capture(n, s),
                (this.config.enableConsoleLogging || this.config.debug) &&
                    console.info(`[PostHogPlugin] Aha event tracked: ${n}`, s))
        } catch (t) {
            console.error('[PostHogPlugin] Failed to track aha event:', t)
        }
    }
    _getFlowInfo() {
        return this.engine && typeof this.engine.getFlowInfo == 'function' ? this.engine.getFlowInfo() : void 0
    }
    async _handleStepActive(e) {
        if (!this._shouldTrackEvent('stepActive')) return
        const { step: t, context: i } = e
        ;(this.config.enablePerformanceTracking && this._performanceTracker.startRenderTimer(t.id.toString()),
            this.config.enableChurnDetection &&
                (this._churnDetection.startStepTimer(t.id),
                this._churnDetection.setupChurnTimeout(t, i, this._handleChurnDetected.bind(this))))
        const n = this._eventBuilder.buildEventData(
            'stepActive',
            {
                step_id: t.id,
                step_type: t.type,
                step_index: this._getStepIndex(t),
                is_first_step: this._isFirstStep(t),
                is_last_step: this._isLastStep(t),
                flow_progress_percentage: this._calculateFlowProgress(i),
                previous_step_id: this._getPreviousStepId(),
            },
            t,
            i,
            this._performanceTracker.getCurrentMetrics(),
            this._getFlowInfo()
        )
        ;(this._captureEvent('stepActive', n),
            this.config.enableProgressMilestones && this._checkProgressMilestones(i),
            this.config.enableExperimentTracking && this.config.experimentFlags && this._trackExperimentExposure(i))
    }
    async _handleStepCompleted(e) {
        if (!this._shouldTrackEvent('stepCompleted')) return
        const { step: t, context: i, stepData: n } = e
        this.config.enableChurnDetection && this._churnDetection.clearChurnTimeout(t.id.toString())
        let s
        this.config.enablePerformanceTracking && (s = this._performanceTracker.endRenderTimer(t.id.toString()))
        const o = this._eventBuilder.buildEventData(
            'stepCompleted',
            {
                step_id: t.id,
                step_type: t.type,
                step_data: this._sanitizeStepData(n),
                flow_progress_percentage: this._calculateFlowProgress(i),
                render_time_ms: s,
            },
            t,
            i,
            {
                stepRenderTime: s,
                ...this._performanceTracker.getCurrentMetrics(),
            },
            this._getFlowInfo()
        )
        ;(this._captureEvent('stepCompleted', o),
            s &&
                this.config.performanceThresholds?.slowRenderMs &&
                s > this.config.performanceThresholds.slowRenderMs &&
                this._trackSlowRender(t, i, s))
    }
    async _handleFlowStarted(e) {
        if (!this._shouldTrackEvent('flowStarted')) return
        const { context: t, startMethod: i } = e,
            n = this._eventBuilder.buildEventData(
                'flowStarted',
                {
                    start_method: i,
                    total_steps: this._getTotalSteps(),
                    flow_start_time_ms: Date.now(),
                    initial_flow_data_size: JSON.stringify(t.flowData).length,
                },
                void 0,
                t,
                this._performanceTracker.getCurrentMetrics(),
                this._getFlowInfo()
            )
        this._captureEvent('flowStarted', n)
    }
    async _handleFlowPaused(e) {
        if (!this._shouldTrackEvent('flowPaused')) return
        const { context: t, reason: i } = e,
            n = this._eventBuilder.buildEventData('flowPaused', { reason: i }, void 0, t, void 0, this._getFlowInfo())
        this._captureEvent('flowPaused', n)
    }
    async _handleFlowResumed(e) {
        if (!this._shouldTrackEvent('flowResumed')) return
        const { context: t, resumePoint: i } = e,
            n = this._eventBuilder.buildEventData(
                'flowResumed',
                { resume_point: i },
                void 0,
                t,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('flowResumed', n)
    }
    async _handleFlowAbandoned(e) {
        if (!this._shouldTrackEvent('flowAbandoned')) return
        const { context: t, abandonmentReason: i } = e,
            n = this._eventBuilder.buildEventData(
                'flowAbandoned',
                { abandonment_reason: i },
                void 0,
                t,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('flowAbandoned', n)
    }
    async _handleFlowReset(e) {
        if (!this._shouldTrackEvent('flowReset')) return
        const { context: t, resetReason: i } = e,
            n = this._eventBuilder.buildEventData(
                'flowReset',
                { reset_reason: i },
                void 0,
                t,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('flowReset', n)
    }
    async _handleStepSkipped(e) {
        if (!this._shouldTrackEvent('stepSkipped')) return
        const { step: t, context: i, skipReason: n } = e,
            s = this._eventBuilder.buildEventData(
                'stepSkipped',
                { step_id: t.id, skip_reason: n },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('stepSkipped', s)
    }
    async _handleStepRetried(e) {
        if (!this._shouldTrackEvent('stepRetried')) return
        const { step: t, context: i, retryCount: n } = e,
            s = this._eventBuilder.buildEventData(
                'stepRetried',
                { step_id: t.id, retry_count: n },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('stepRetried', s)
    }
    async _handleStepValidationFailed(e) {
        if (!this._shouldTrackEvent('stepValidationFailed')) return
        const { step: t, context: i, validationErrors: n } = e,
            s = this._eventBuilder.buildEventData(
                'stepValidationFailed',
                { step_id: t.id, validation_errors: n },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('stepValidationFailed', s)
    }
    async _handleStepHelpRequested(e) {
        if (!this._shouldTrackEvent('stepHelpRequested')) return
        const { step: t, context: i, helpType: n } = e,
            s = this._eventBuilder.buildEventData(
                'stepHelpRequested',
                { step_id: t.id, help_type: n },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('stepHelpRequested', s)
    }
    async _handleStepAbandoned(e) {
        if (!this._shouldTrackEvent('stepAbandoned')) return
        const { step: t, context: i, timeOnStep: n } = e,
            s = this._eventBuilder.buildEventData(
                'stepAbandoned',
                { step_id: t.id, time_on_step: n },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('stepAbandoned', s)
    }
    async _handleNavigationBack(e) {
        if (!this._shouldTrackEvent('navigationBack')) return
        const { fromStep: t, toStep: i, context: n } = e,
            s = this._eventBuilder.buildEventData(
                'navigationBack',
                { from_step_id: t.id, to_step_id: i.id },
                i,
                n,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('navigationBack', s)
    }
    async _handleNavigationForward(e) {
        if (!this._shouldTrackEvent('navigationForward')) return
        const { fromStep: t, toStep: i, context: n } = e,
            s = this._eventBuilder.buildEventData(
                'navigationForward',
                { from_step_id: t.id, to_step_id: i.id },
                i,
                n,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('navigationForward', s)
    }
    async _handleNavigationJump(e) {
        if (!this._shouldTrackEvent('navigationJump')) return
        const { fromStep: t, toStep: i, context: n } = e,
            s = this._eventBuilder.buildEventData(
                'navigationJump',
                { from_step_id: t.id, to_step_id: i.id },
                i,
                n,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('navigationJump', s)
    }
    async _handleDataChanged() {
        this._shouldTrackEvent('dataChanged')
    }
    async _handleStepRenderTime(e) {
        this.config.debug && console.info('[PostHogPlugin] stepRenderTime event', e)
    }
    async _handlePersistenceSuccess(e) {
        if (!this._shouldTrackEvent('persistenceSuccess')) return
        const { context: t, persistenceTime: i } = e,
            n = this._eventBuilder.buildEventData(
                'persistenceSuccess',
                { persistence_time: i },
                void 0,
                t,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('persistenceSuccess', n)
    }
    async _handlePersistenceFailure(e) {
        if (!this._shouldTrackEvent('persistenceFailure')) return
        const { context: t, error: i } = e,
            n = this._eventBuilder.buildEventData(
                'persistenceFailure',
                { error_message: i.message },
                void 0,
                t,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('persistenceFailure', n)
    }
    async _handleChecklistItemToggled(e) {
        if (!this._shouldTrackEvent('checklistItemToggled')) return
        const { itemId: t, isCompleted: i, step: n, context: s } = e,
            o = this._eventBuilder.buildEventData(
                'checklistItemToggled',
                { item_id: t, is_completed: i },
                n,
                s,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('checklistItemToggled', o)
    }
    async _handleChecklistProgressChanged(e) {
        if (!this._shouldTrackEvent('checklistProgress')) return
        const { step: t, context: i, progress: n } = e,
            s = this._eventBuilder.buildEventData('checklistProgress', { ...n }, t, i, void 0, this._getFlowInfo())
        this._captureEvent('checklistProgress', s)
    }
    async _handlePluginInstalled(e) {
        this.config.debug && console.info('[PostHogPlugin] pluginInstalled event', e)
    }
    async _handlePluginError(e) {
        if (!this._shouldTrackEvent('pluginError')) return
        const { pluginName: t, error: i, context: n } = e,
            s = this._eventBuilder.buildEventData(
                'pluginError',
                { plugin_name: t, error_message: i.message },
                void 0,
                n,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('pluginError', s)
    }
    async _handleFlowCompleted(e) {
        if (!this._shouldTrackEvent('flowCompleted')) return
        const t = e.context,
            i = this._eventBuilder.buildEventData(
                'flowCompleted',
                {
                    total_steps: this._getTotalSteps(),
                    completion_time_ms: this._getFlowCompletionTime(t),
                    final_flow_data_size: JSON.stringify(t.flowData).length,
                },
                void 0,
                t,
                this._performanceTracker.getCurrentMetrics(),
                this._getFlowInfo()
            )
        ;(this._captureEvent('flowCompleted', i), this._progressMilestones.clear())
    }
    async _handleBeforeStepChange(e) {
        if (e.direction === 'previous') {
            const t = e.currentStep?.context?.currentUser?.id || 'anonymous'
            this._churnDetection.recordBackNavigation(t)
        }
    }
    async _handleAfterStepChange(e) {
        const { oldStep: t, newStep: i, context: n } = e
        if (!t || !i) return
        const s = this._getNavigationType(t, i)
        if (this._shouldTrackEvent(`navigation${s}`)) {
            const o = this._eventBuilder.buildEventData(
                `navigation${s}`,
                {
                    from_step_id: t.id,
                    to_step_id: i.id,
                    from_step_type: t.type,
                    to_step_type: i.type,
                    navigation_time_ms: Date.now(),
                    // Could be more precise
                },
                i,
                n
            )
            this._captureEvent(`navigation${s}`, o)
        }
    }
    async _handleContextUpdate(e) {
        if (!this._shouldTrackEvent('dataChanged')) return
        const { oldContext: t, newContext: i } = e,
            n = this._getChangedKeys(t.flowData, i.flowData)
        if (n.length > 0) {
            const s = this._eventBuilder.buildEventData(
                'dataChanged',
                {
                    changed_keys: n,
                    data_size_before: JSON.stringify(t.flowData).length,
                    data_size_after: JSON.stringify(i.flowData).length,
                },
                void 0,
                i
            )
            this._captureEvent('dataChanged', s)
        }
    }
    async _handleError(e) {
        if (!this._shouldTrackEvent('errorEncountered')) return
        const { error: t, context: i } = e,
            n = i.currentUser?.id || 'anonymous'
        this._churnDetection.recordError(n)
        const s = this._eventBuilder.buildEventData(
            'errorEncountered',
            {
                error_message: t.message,
                error_stack: t.stack,
                error_name: t.name,
                current_step_id: this._getCurrentStepId(i),
            },
            void 0,
            i,
            void 0,
            this._getFlowInfo()
        )
        this._captureEvent('errorEncountered', s)
    }
    _handleChurnDetected(e, t, i) {
        if (!this._shouldTrackEvent('stepAbandoned')) return
        const n = this._churnDetection.calculateChurnRisk(e, t),
            s = this._churnDetection.isHighChurnRisk(e, t),
            o = this._eventBuilder.buildEventData(
                'stepAbandoned',
                {
                    step_id: e.id,
                    step_type: e.type,
                    churn_risk_score: n,
                    is_high_risk: s,
                    // NEW: Boolean flag for easy filtering
                    risk_threshold: this._churnDetection.getChurnRiskThreshold(),
                    // NEW: Include threshold for context
                    time_on_step_ms: i.timeOnStep,
                    back_navigation_count: i.backNavigationCount,
                    error_count: i.errorCount,
                    idle_time_ms: i.idleTime,
                    validation_failures: i.validationFailures,
                },
                e,
                t,
                void 0,
                this._getFlowInfo()
            )
        if ((this._captureEvent('stepAbandoned', o), s)) {
            const r = this._eventBuilder.buildEventData(
                'highChurnRisk',
                {
                    step_id: e.id,
                    churn_risk_score: n,
                    primary_risk_factor: this._getPrimaryRiskFactor(i),
                },
                e,
                t,
                void 0,
                this._getFlowInfo()
            )
            this._captureEvent('highChurnRisk', r)
        }
    }
    // Helper method to identify the primary risk factor
    _getPrimaryRiskFactor(e) {
        const t = {
            timeOnStep: e.timeOnStep / this._churnDetection.getChurnRiskThreshold(),
            backNavigation: e.backNavigationCount,
            errors: e.errorCount,
            idle: e.idleTime / 6e4,
            // Convert to minutes
            validationFailures: e.validationFailures,
        }
        return Object.entries(t).reduce((n, [s, o]) => (o > n.value ? { key: s, value: o } : n), {
            key: 'unknown',
            value: 0,
        }).key
    }
    _checkProgressMilestones(e) {
        const t = this._calculateFlowProgress(e)
        ;(this.config.milestonePercentages || [25, 50, 75, 100]).forEach((n) => {
            if (t >= n && !this._progressMilestones.has(n)) {
                this._progressMilestones.add(n)
                const s = this._eventBuilder.buildEventData(
                    'progressMilestone',
                    {
                        milestone_percentage: n,
                        actual_progress: t,
                        steps_completed: this._getCompletedStepsCount(e),
                    },
                    void 0,
                    e,
                    void 0,
                    this._getFlowInfo()
                )
                this._captureEvent('progressMilestone', s)
            }
        })
    }
    _trackExperimentExposure(e) {
        this.config.experimentFlags &&
            this.config.experimentFlags.forEach((t) => {
                const i = this._posthog.getFeatureFlag(t)
                if (i) {
                    const n = this._eventBuilder.buildEventData(
                        'experimentExposed',
                        {
                            experiment_flag: t,
                            variant: i,
                            user_id: e.currentUser?.id,
                        },
                        void 0,
                        e
                    )
                    this._captureEvent('experimentExposed', n)
                }
            })
    }
    _trackSlowRender(e, t, i) {
        const n = this._eventBuilder.buildEventData(
            'stepRenderSlow',
            {
                step_id: e.id,
                step_type: e.type,
                render_time_ms: i,
                threshold_ms: this.config.performanceThresholds?.slowRenderMs,
            },
            e,
            t
        )
        this._captureEvent('stepRenderSlow', n)
    }
    // Utility methods
    _shouldTrackEvent(e) {
        return this.config.includeOnlyEvents
            ? this.config.includeOnlyEvents.includes(e)
            : this.config.excludeEvents
              ? !this.config.excludeEvents.includes(e)
              : !0
    }
    _captureEvent(e, t) {
        const i = this._getEventName(e)
        try {
            ;(this._posthog.capture(i, t),
                this.config.enableConsoleLogging && console.info(`[PostHogPlugin] Event captured: ${i}`, t))
        } catch (n) {
            ;(console.error(`[PostHogPlugin] Failed to capture event ${i}:`, n),
                this._posthog.capture(this._getEventName('pluginError'), {
                    plugin_name: this.name,
                    error_message: n instanceof Error ? n.message : String(n),
                    failed_event: i,
                }))
        }
    }
    _getEventName(e) {
        const t = this.config.eventPrefix || 'onboarding_',
            i = this.config.customEventNames?.[e],
            n = this._defaultEventNames[e]
        return i || `${t}${n}`
    }
    // Helper methods for data extraction
    _getStepIndex(e) {
        return this.engine.getStepIndex(e.id)
    }
    _isFirstStep(e) {
        return this._getStepIndex(e) === 0
    }
    _isLastStep(e) {
        return this._getStepIndex(e) === this._getTotalSteps() - 1
    }
    _calculateFlowProgress(e) {
        const t = this._getTotalSteps(),
            i = this._getCompletedStepsCount(e)
        return t > 0 ? Math.round((i / t) * 100) : 0
    }
    _getTotalSteps() {
        return this.engine.getRelevantSteps().length
    }
    _getCompletedStepsCount(e) {
        return Object.keys(e.flowData._internal?.completedSteps || {}).length
    }
    _getFlowCompletionTime(e) {
        const t = e.flowData._internal?.startedAt
        return t ? Date.now() - t : 0
    }
    _getPreviousStepId() {
        return this.engine.getState().previousStepCandidate?.id
    }
    _getCurrentStepId(e) {
        return e.currentStep?.id
    }
    _getCompletionMethod() {
        return 'unknown'
    }
    _getNavigationType(e, t) {
        const i = this._getStepIndex(e),
            n = this._getStepIndex(t)
        return n > i ? 'Forward' : n < i ? 'Back' : 'Jump'
    }
    _getChangedKeys(e, t) {
        const i = []
        return (
            /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]).forEach((s) => {
                JSON.stringify(e[s]) !== JSON.stringify(t[s]) && i.push(s)
            }),
            i
        )
    }
    _sanitizeStepData(e) {
        return this.config.sanitizeData ? this.config.sanitizeData(e) : e
    }
}
const u = {
        eventPrefix: 'onboarding_',
        includeUserProperties: !0,
        includeFlowData: !0,
        includeStepMetadata: !0,
        includeFlowInfo: !0,
        enableChurnDetection: !0,
        churnTimeoutMs: 3e5,
        // 5 minutes
        enableProgressMilestones: !0,
        milestonePercentages: [25, 50, 75, 100],
        enablePerformanceTracking: !0,
        debug: !1,
        // These events are excluded by default as they are not relevant for tracking
        excludeEvents: ['persistenceSuccess', 'dataChanged'],
    },
    y = {
        ...u,
        churnTimeoutMs: 18e4,
        // 3 minutes for SaaS
        excludePersonalData: !0,
        enableExperimentTracking: !0,
    },
    k = {
        ...u,
        eventPrefix: 'checkout_onboarding_',
        churnTimeoutMs: 6e5,
        // 10 minutes for e-commerce
        milestonePercentages: [20, 40, 60, 80, 100],
    }
function E(c = {}) {
    return new w({
        ...u,
        ...c,
    })
}
export {
    v as ChurnDetectionManager,
    f as EventDataBuilder,
    m as PerformanceTracker,
    w as PostHogPlugin,
    E as createPostHogPlugin,
    u as defaultPostHogConfig,
    k as ecommerceConfig,
    y as saasConfig,
}
