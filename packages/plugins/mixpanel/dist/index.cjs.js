'use strict'
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
const _ = require('@onboardjs/core')
class g {
    constructor(e) {
        this.config = e
    }
    buildEventData(e, t, i, n, s, o) {
        let r = { ...t }
        if (
            ((r.timestamp = new Date().toISOString()),
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
                const d = a(i, n)
                r = { ...r, ...d }
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
                    const d = r.toLowerCase()
                    t.some((p) => d.includes(p)) ? (o[r] = '[REDACTED]') : (o[r] = n(a))
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
class f {
    constructor(e = 3e5, t = 0.7) {
        ;((this.churnTimeoutMs = e), (this.churnRiskThreshold = t))
    }
    stepStartTimes = new Map()
    churnTimeouts = new Map()
    userActivity = new Map()
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
            d = Math.min(i.backNavigationCount / 5, 1),
            p = Math.min(i.errorCount / 3, 1),
            w = Math.min(i.idleTime / 6e4, 1)
        return a * n + d * s + p * o + w * r
    }
    isHighChurnRisk(e, t) {
        return this.calculateChurnRisk(e, t) >= this.churnRiskThreshold
    }
    getChurnRiskThreshold() {
        return this.churnRiskThreshold
    }
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
const c = typeof window < 'u' && typeof performance < 'u'
class m {
    renderStartTimes = new Map()
    persistenceStartTimes = new Map()
    startRenderTimer(e) {
        c && this.renderStartTimes.set(e, performance.now())
    }
    endRenderTimer(e) {
        if (!c) return
        const t = this.renderStartTimes.get(e)
        if (t) {
            const i = performance.now() - t
            return (this.renderStartTimes.delete(e), i)
        }
    }
    startPersistenceTimer(e) {
        c && this.persistenceStartTimes.set(e, performance.now())
    }
    endPersistenceTimer(e) {
        if (!c) return
        const t = this.persistenceStartTimes.get(e)
        if (t) {
            const i = performance.now() - t
            return (this.persistenceStartTimes.delete(e), i)
        }
    }
    getMemoryUsage() {
        if (c && 'memory' in performance) return performance.memory.usedJSHeapSize
    }
    getCurrentMetrics() {
        return { memoryUsage: this.getMemoryUsage(), navigationTime: this.getNavigationTime() }
    }
    getNavigationTime() {
        if (c) {
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
let h
if (typeof window < 'u')
    try {
        h = require('mixpanel-browser')
    } catch {
        ;(console.warn('[MixpanelPlugin] Failed to import mixpanel-browser. Make sure it is installed.'),
            (h = { init: () => {}, track: () => {}, people: { set: () => {} } }))
    }
else h = { init: () => {}, track: () => {}, people: { set: () => {} } }
class v extends _.BasePlugin {
    name = '@onboardjs/plugin-mixpanel'
    version = '1.0.0'
    description = 'Official Mixpanel analytics plugin for OnboardJS'
    _mixpanel
    _eventBuilder
    _churnDetection
    _performanceTracker
    _progressMilestones = new Set()
    _defaultEventNames = {
        flowStarted: 'flow_started',
        flowCompleted: 'flow_completed',
        flowAbandoned: 'flow_abandoned',
        flowPaused: 'flow_paused',
        flowResumed: 'flow_resumed',
        flowReset: 'flow_reset',
        stepActive: 'step_active',
        stepCompleted: 'step_completed',
        stepSkipped: 'step_skipped',
        stepAbandoned: 'step_abandoned',
        stepRetried: 'step_retried',
        stepValidationFailed: 'step_validation_failed',
        stepHelpRequested: 'step_help_requested',
        navigationBack: 'navigation_back',
        navigationForward: 'navigation_forward',
        navigationJump: 'navigation_jump',
        userIdle: 'user_idle',
        userReturned: 'user_returned',
        dataChanged: 'data_changed',
        progressMilestone: 'progress_milestone',
        highChurnRisk: 'high_churn_risk',
        stepRenderSlow: 'step_render_slow',
        persistenceSuccess: 'persistence_success',
        persistenceFailure: 'persistence_failure',
        checklistItemToggled: 'checklist_item_toggled',
        checklistProgress: 'checklist_progress',
        experimentExposed: 'experiment_exposed',
        errorEncountered: 'error_encountered',
        pluginError: 'plugin_error',
    }
    async onInstall() {
        ;(this._initializeMixpanel(),
            (this._eventBuilder = new g(this.config)),
            (this._churnDetection = new f(this.config.churnTimeoutMs, this.config.churnRiskThreshold)),
            (this._performanceTracker = new m()),
            this._setupAhaTracking(),
            this.config.debug &&
                console.info('[MixpanelPlugin] Plugin installed with config:', {
                    token: this.config.token ? '***' : 'not provided',
                    mixpanelInstance: !!this.config.mixpanelInstance,
                    eventPrefix: this.config.eventPrefix,
                }))
    }
    async onUninstall() {
        ;(this._churnDetection.cleanup(),
            this._performanceTracker.cleanup(),
            this._progressMilestones.clear(),
            this.config.debug && console.info('[MixpanelPlugin] Plugin uninstalled'))
    }
    getHooks() {
        return {
            onFlowStarted: this._handleFlowStarted.bind(this),
            onFlowCompleted: this._handleFlowCompleted.bind(this),
            onFlowPaused: this._handleFlowPaused.bind(this),
            onFlowResumed: this._handleFlowResumed.bind(this),
            onFlowAbandoned: this._handleFlowAbandoned.bind(this),
            onFlowReset: this._handleFlowReset.bind(this),
            onStepActive: this._handleStepActive.bind(this),
            onStepCompleted: this._handleStepCompleted.bind(this),
            onStepSkipped: this._handleStepSkipped.bind(this),
            onStepRetried: this._handleStepRetried.bind(this),
            onStepValidationFailed: this._handleStepValidationFailed.bind(this),
            onStepHelpRequested: this._handleStepHelpRequested.bind(this),
            onStepAbandoned: this._handleStepAbandoned.bind(this),
            beforeStepChange: this._handleBeforeStepChange.bind(this),
            afterStepChange: this._handleAfterStepChange.bind(this),
            onNavigationBack: this._handleNavigationBack.bind(this),
            onNavigationForward: this._handleNavigationForward.bind(this),
            onNavigationJump: this._handleNavigationJump.bind(this),
            onContextUpdate: this._handleContextUpdate.bind(this),
            onDataChanged: this._handleDataChanged.bind(this),
            onError: this._handleError.bind(this),
            onStepRenderTime: this._handleStepRenderTime.bind(this),
            onPersistenceSuccess: this._handlePersistenceSuccess.bind(this),
            onPersistenceFailure: this._handlePersistenceFailure.bind(this),
            onChecklistItemToggled: this._handleChecklistItemToggled.bind(this),
            onChecklistProgressChanged: this._handleChecklistProgressChanged.bind(this),
            onPluginInstalled: this._handlePluginInstalled.bind(this),
            onPluginError: this._handlePluginError.bind(this),
        }
    }
    _initializeMixpanel() {
        if (this.config.mixpanelInstance)
            ((this._mixpanel = this.config.mixpanelInstance), this._debugLog('Using provided Mixpanel instance'))
        else if (this.config.token)
            (h.init(this.config.token, this.config.config || {}),
                (this._mixpanel = h),
                this._debugLog('Initialized Mixpanel with token'))
        else throw new Error('MixpanelPlugin requires either a token or a mixpanelInstance to be provided in config')
    }
    _setupAhaTracking() {
        try {
            ;(_.AhaTracker.getInstance().addProvider({
                name: 'mixpanel',
                trackEvent: (t) => {
                    this._trackAhaEvent(t)
                },
            }),
                this.config.debug && console.info('[MixpanelPlugin] Aha tracking integration initialized'))
        } catch (e) {
            this.config.debug &&
                console.warn(
                    '[MixpanelPlugin] Could not set up aha tracking. AhaTracker may not be initialized yet.',
                    e
                )
        }
    }
    _trackAhaEvent(e) {
        try {
            const t = e.properties || e,
                i = t.aha_type || e.aha_type || 'unknown',
                n = 'onboarding_aha',
                s = {
                    aha_type: i,
                    journey_stage: t.journey_stage,
                    timestamp: e.timestamp,
                    session_id: e.sessionId,
                    user_id: e.userId,
                    flow_id: e.flowId,
                    flow_name: e.flowName,
                    flow_version: e.flowVersion,
                    first_aha: t.first_aha,
                    previous_aha_events: t.previous_aha_events,
                    time_to_aha_seconds: t.time_to_aha_seconds,
                    time_since_signup_seconds: t.time_since_signup_seconds,
                    ...(t.context || {}),
                    ...(t.metrics || {}),
                }
            ;(this._mixpanel.track(n, s),
                (this.config.enableConsoleLogging || this.config.debug) &&
                    console.info(`[MixpanelPlugin] Aha event tracked: ${n}`, s))
        } catch (t) {
            console.error('[MixpanelPlugin] Failed to track aha event:', t)
        }
    }
    _getFlowInfo() {
        return this.engine && typeof this.engine.getFlowInfo == 'function' ? this.engine.getFlowInfo() : void 0
    }
    _debugLog(e, t) {
        this.config.debug && console.info(`[MixpanelPlugin] ${e}`, t || '')
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
                flow_progress_percentage: this._calculateFlowProgress(),
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
                flow_progress_percentage: this._calculateFlowProgress(),
                render_time_ms: s,
                completion_method: this._getCompletionMethod(n),
            },
            t,
            i,
            { stepRenderTime: s, ...this._performanceTracker.getCurrentMetrics() },
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
        if ((this._captureEvent('flowStarted', n), t.currentUser && this.config.includeUserProperties)) {
            const s = this._eventBuilder.buildUserProperties(t.currentUser)
            this._mixpanel.people.set(s)
        }
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
        const { step: t, context: i, validationErrors: n } = e
        this.config.enableChurnDetection &&
            i.currentUser &&
            this._churnDetection.recordValidationFailure(i.currentUser.id)
        const s = this._eventBuilder.buildEventData(
            'stepValidationFailed',
            { step_id: t.id, validation_errors: n, error_count: Array.isArray(n) ? n.length : 1 },
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
                { step_id: t.id, time_on_step_ms: n },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('stepAbandoned', s)
    }
    async _handleNavigationBack(e) {
        if (!this._shouldTrackEvent('navigationBack')) return
        const { fromStep: t, toStep: i, context: n } = e
        this.config.enableChurnDetection && n.currentUser && this._churnDetection.recordBackNavigation(n.currentUser.id)
        const s = this._eventBuilder.buildEventData(
            'navigationBack',
            { from_step_id: t.id, to_step_id: i.id, navigation_type: this._getNavigationType(t, i) },
            t,
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
                { from_step_id: t.id, to_step_id: i.id, navigation_type: this._getNavigationType(t, i) },
                t,
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
                {
                    from_step_id: t?.id,
                    to_step_id: i.id,
                    jump_distance: t ? Math.abs(this._getStepIndex(i) - this._getStepIndex(t)) : 0,
                },
                i,
                n,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('navigationJump', s)
    }
    async _handleDataChanged(e) {
        if (!this._shouldTrackEvent('dataChanged')) return
        const { step: t, context: i, changedFields: n } = e,
            s = this._eventBuilder.buildEventData(
                'dataChanged',
                { changed_keys: n, change_count: n.length },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('dataChanged', s)
    }
    async _handleStepRenderTime(e) {
        if (!this._shouldTrackEvent('stepRenderSlow')) return
        const { step: t, context: i, renderTime: n } = e
        this.config.performanceThresholds?.slowRenderMs &&
            n > this.config.performanceThresholds.slowRenderMs &&
            this._trackSlowRender(t, i, n)
    }
    async _handlePersistenceSuccess(e) {
        if (!this._shouldTrackEvent('persistenceSuccess')) return
        const { context: t, persistenceTime: i } = e,
            n = this._eventBuilder.buildEventData(
                'persistenceSuccess',
                { persistence_time_ms: i },
                void 0,
                t,
                { persistenceTime: i },
                this._getFlowInfo()
            )
        this._captureEvent('persistenceSuccess', n)
    }
    async _handlePersistenceFailure(e) {
        if (!this._shouldTrackEvent('persistenceFailure')) return
        const { context: t, error: i } = e,
            n = this._eventBuilder.buildEventData(
                'persistenceFailure',
                { error_message: i.message, error_type: i.name },
                void 0,
                t,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('persistenceFailure', n)
    }
    async _handleChecklistItemToggled(e) {
        if (!this._shouldTrackEvent('checklistItemToggled')) return
        const { step: t, context: i, itemId: n, isCompleted: s } = e,
            o = this._eventBuilder.buildEventData(
                'checklistItemToggled',
                { step_id: t.id, item_id: n, checked: s },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('checklistItemToggled', o)
    }
    async _handleChecklistProgressChanged(e) {
        if (!this._shouldTrackEvent('checklistProgress')) return
        const { step: t, context: i, progress: n } = e,
            s = this._eventBuilder.buildEventData(
                'checklistProgress',
                {
                    step_id: t.id,
                    completed_items: n.completed,
                    total_items: n.total,
                    completion_percentage: n.percentage,
                },
                t,
                i,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('checklistProgress', s)
    }
    async _handlePluginInstalled(e) {
        const { pluginName: t, pluginVersion: i } = e
        if (t === this.name) return
        const n = { plugin_name: t, plugin_version: i, timestamp: new Date().toISOString() }
        try {
            ;(this._mixpanel.track(this._getEventName('flowStarted').replace('flow_started', 'plugin_installed'), n),
                this.config.enableConsoleLogging && this._debugLog('Tracked plugin installation:', n))
        } catch (s) {
            console.error('[MixpanelPlugin] Failed to track plugin installation:', s)
        }
    }
    async _handlePluginError(e) {
        if (!this._shouldTrackEvent('pluginError')) return
        const { pluginName: t, error: i, context: n } = e,
            s = this._eventBuilder.buildEventData(
                'pluginError',
                { plugin_name: t, error_message: i.message, error_type: i.name, error_stack: i.stack },
                void 0,
                n,
                void 0,
                this._getFlowInfo()
            )
        this._captureEvent('pluginError', s)
    }
    async _handleFlowCompleted(e) {
        if (!this._shouldTrackEvent('flowCompleted')) return
        const { context: t, duration: i } = e,
            n = this._eventBuilder.buildEventData(
                'flowCompleted',
                {
                    completion_time_ms: i,
                    total_steps: this._getTotalSteps(),
                    completed_steps: this._getCompletedStepsCount(),
                    flow_completion_time_ms: this._getFlowCompletionTime(t),
                },
                void 0,
                t,
                this._performanceTracker.getCurrentMetrics(),
                this._getFlowInfo()
            )
        this._captureEvent('flowCompleted', n)
    }
    async _handleBeforeStepChange(e) {
        this.config.enablePerformanceTracking &&
            e.fromStep &&
            this._performanceTracker.endRenderTimer(e.fromStep.id.toString())
    }
    async _handleAfterStepChange(e) {
        this.config.enablePerformanceTracking &&
            e.newStep &&
            this._performanceTracker.startRenderTimer(e.newStep.id.toString())
    }
    async _handleContextUpdate(e) {
        if (
            e.newContext.currentUser &&
            this.config.includeUserProperties &&
            JSON.stringify(e.oldContext.currentUser) !== JSON.stringify(e.newContext.currentUser)
        ) {
            const t = this._eventBuilder.buildUserProperties(e.newContext.currentUser)
            this._mixpanel.people.set(t)
        }
    }
    async _handleError(e) {
        if (!this._shouldTrackEvent('errorEncountered')) return
        const { error: t, context: i } = e
        this.config.enableChurnDetection && i.currentUser && this._churnDetection.recordError(i.currentUser.id)
        const n = this._eventBuilder.buildEventData(
            'errorEncountered',
            { error_message: t.message, error_type: t.name, error_stack: t.stack },
            void 0,
            i,
            void 0,
            this._getFlowInfo()
        )
        this._captureEvent('errorEncountered', n)
    }
    _handleChurnDetected(e, t, i) {
        if (!this._shouldTrackEvent('highChurnRisk')) return
        const n = this._eventBuilder.buildEventData(
            'highChurnRisk',
            {
                step_id: e.id,
                risk_score: this._churnDetection.calculateChurnRisk(e, t),
                time_on_step_ms: i.timeOnStep,
                back_navigation_count: i.backNavigationCount,
                error_count: i.errorCount,
                idle_time_ms: i.idleTime,
                validation_failures: i.validationFailures,
                primary_risk_factor: this._getPrimaryRiskFactor(i),
            },
            e,
            t,
            void 0,
            this._getFlowInfo()
        )
        this._captureEvent('highChurnRisk', n)
    }
    _getPrimaryRiskFactor(e) {
        const t = {
            time: e.timeOnStep,
            navigation: e.backNavigationCount * 6e4,
            errors: e.errorCount * 12e4,
            idle: e.idleTime,
            validation: e.validationFailures * 9e4,
        }
        return Object.entries(t).reduce((i, n) => (t[i[0]] > t[n[0]] ? i : n))[0]
    }
    _checkProgressMilestones(e) {
        const t = this._calculateFlowProgress(),
            i = this.config.milestonePercentages || [25, 50, 75, 100]
        for (const n of i)
            if (t >= n && !this._progressMilestones.has(n)) {
                this._progressMilestones.add(n)
                const s = this._eventBuilder.buildEventData(
                    'progressMilestone',
                    {
                        milestone_percentage: n,
                        current_progress: t,
                        steps_completed: this._getCompletedStepsCount(),
                        total_steps: this._getTotalSteps(),
                    },
                    void 0,
                    e,
                    void 0,
                    this._getFlowInfo()
                )
                this._captureEvent('progressMilestone', s)
            }
    }
    _trackExperimentExposure(e) {
        if (this.config.experimentFlags)
            for (const t of this.config.experimentFlags) {
                const i = e.experiments?.[t]
                if (i) {
                    const n = this._eventBuilder.buildEventData(
                        'experimentExposed',
                        { experiment_flag: t, experiment_variant: i.variant, experiment_id: i.id },
                        void 0,
                        e,
                        void 0,
                        this._getFlowInfo()
                    )
                    this._captureEvent('experimentExposed', n)
                }
            }
    }
    _trackSlowRender(e, t, i) {
        const n = this._eventBuilder.buildEventData(
            'stepRenderSlow',
            {
                step_id: e.id,
                render_time_ms: i,
                threshold_ms: this.config.performanceThresholds?.slowRenderMs,
                performance_ratio: i / (this.config.performanceThresholds?.slowRenderMs || 1),
            },
            e,
            t,
            { stepRenderTime: i },
            this._getFlowInfo()
        )
        this._captureEvent('stepRenderSlow', n)
    }
    _shouldTrackEvent(e) {
        return !(
            this.config.excludeEvents?.includes(e) ||
            (this.config.includeOnlyEvents && !this.config.includeOnlyEvents.includes(e))
        )
    }
    _captureEvent(e, t) {
        const i = this._getEventName(e)
        try {
            ;(this._mixpanel.track(i, t),
                this.config.enableConsoleLogging && console.info(`[MixpanelPlugin] Tracked event: ${i}`, t))
        } catch (n) {
            console.error(`[MixpanelPlugin] Failed to track event: ${i}`, n)
        }
    }
    _getEventName(e) {
        const t = this.config.customEventNames?.[e],
            i = this._defaultEventNames[e],
            n = t || i
        return this.config.eventPrefix ? `${this.config.eventPrefix}${n}` : n
    }
    _getStepIndex(e) {
        return this.engine.getStepIndex(e.id)
    }
    _isFirstStep() {
        const e = this.engine.getState().currentStep
        return e ? this._getStepIndex(e) === 0 : !1
    }
    _isLastStep() {
        const e = this._getTotalSteps(),
            t = this.engine.getState().currentStep
        return t ? e > 0 && this._getStepIndex(t) === e - 1 : !1
    }
    _calculateFlowProgress() {
        return this._getEngineState().progressPercentage
    }
    _getTotalSteps() {
        return this.engine.getRelevantSteps().length
    }
    _getCompletedStepsCount() {
        return this._getEngineState().completedSteps ?? 0
    }
    _getFlowCompletionTime(e) {
        const t = e.flowStartTime
        return t ? Date.now() - t : 0
    }
    _getPreviousStepId() {
        return this.engine.getState().previousStepCandidate?.id
    }
    _getCompletionMethod(e) {
        return e?.completionMethod
            ? e.completionMethod
            : e?.skipped
              ? 'skipped'
              : e?.automated
                ? 'automated'
                : 'unknown'
    }
    _getNavigationType(e, t) {
        const i = this._getStepIndex(e),
            n = this._getStepIndex(t)
        return n > i ? 'Forward' : n < i ? 'Back' : 'Jump'
    }
    _sanitizeStepData(e) {
        if (!e) return e
        const t = { ...e }
        return (delete t.password, delete t.token, delete t.apiKey, delete t.secret, t)
    }
    _getEngineState() {
        return this.engine.getState()
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
        enableProgressMilestones: !0,
        milestonePercentages: [25, 50, 75, 100],
        enablePerformanceTracking: !0,
        debug: !1,
        excludeEvents: ['persistenceSuccess', 'dataChanged'],
    },
    S = { ...u, churnTimeoutMs: 18e4, excludePersonalData: !0, enableExperimentTracking: !0 },
    k = { ...u, eventPrefix: 'checkout_onboarding_', churnTimeoutMs: 6e5, milestonePercentages: [20, 40, 60, 80, 100] }
function T(l = {}) {
    return new v({ ...u, ...l })
}
exports.ChurnDetectionManager = f
exports.EventDataBuilder = g
exports.MixpanelPlugin = v
exports.PerformanceTracker = m
exports.createMixpanelPlugin = T
exports.defaultMixpanelConfig = u
exports.ecommerceConfig = k
exports.saasConfig = S
