import { Logger } from '../services/Logger'
import { OnboardingContext, OnboardingStep } from '../types'
import { AnalyticsProvider, AnalyticsConfig } from './types'
/**
 * AnalyticsManager v2 - Refactored facade for analytics operations
 *
 * Delegates to specialized trackers via AnalyticsCoordinator:
 * - SessionTracker: session lifecycle, sessionId, userId, flowId
 * - PerformanceTracker: render times, navigation times (with LRU memory limits)
 * - ActivityTracker: idle detection, user activity state
 * - ProgressMilestoneTracker: progress percentage and milestone tracking
 *
 * Responsibilities:
 * - High-level event tracking (step, flow, navigation events)
 * - Context-dependent metric calculations (step index, progress, churn risk)
 * - Step duration tracking and performance analytics
 */
export declare class AnalyticsManager<TContext extends OnboardingContext = OnboardingContext> {
    private _coordinator
    private _logger
    private _config
    private _stepStartTimes
    constructor(config?: AnalyticsConfig, logger?: Logger)
    registerProvider(provider: AnalyticsProvider): void
    get providerCount(): number
    setUserId(userId: string): void
    setFlowId(flowId: string): void
    setFlowInfo(flowInfo: {
        flowId?: string
        flowName?: string
        flowVersion?: string
        flowMetadata?: Record<string, unknown>
        instanceId?: number
    }): void
    flush(): Promise<void>
    trackEvent(eventType: string, properties?: Record<string, any>): void
    trackStepViewed(step: OnboardingStep<TContext>, context: TContext): void
    trackStepCompleted(
        step: OnboardingStep<TContext>,
        context: TContext,
        duration: number,
        stepData?: Record<string, any>
    ): void
    trackStepSkipped(step: OnboardingStep<TContext>, context: TContext, skipReason?: string): void
    trackStepRetried(step: OnboardingStep<TContext>, context: TContext, retryCount: number): void
    trackStepValidationFailed(step: OnboardingStep<TContext>, context: TContext, validationErrors: string[]): void
    trackStepHelpRequested(step: OnboardingStep<TContext>, context: TContext, helpType?: string): void
    trackStepAbandoned(step: OnboardingStep<TContext>, context: TContext, timeOnStep: number): void
    trackStepRenderTime(step: OnboardingStep<TContext>, context: TContext, renderTime: number): void
    trackSlowStep(step: OnboardingStep<TContext>, context: TContext, duration: number): void
    trackFlowStarted(context: TContext, startMethod?: 'fresh' | 'resumed'): void
    trackFlowCompleted(context: TContext): void
    trackFlowPaused(context: TContext, reason?: string): void
    trackFlowResumed(context: TContext, resumePoint: string): void
    trackFlowAbandoned(context: TContext, abandonmentReason?: string): void
    trackFlowReset(context: TContext, resetReason?: string): void
    trackNavigationBack(fromStep: OnboardingStep<TContext>, toStep: OnboardingStep<TContext>): void
    trackNavigationForward(fromStep: OnboardingStep<TContext>, toStep: OnboardingStep<TContext>): void
    trackNavigationJump(fromStep: OnboardingStep<TContext>, toStep: OnboardingStep<TContext>): void
    trackDataChanged(context: TContext, changedFields: string[], oldData: any, newData: any): void
    trackPersistenceSuccess(context: TContext, persistenceTime: number): void
    trackPersistenceFailure(context: TContext, error: Error): void
    trackUserIdle(step: OnboardingStep<TContext>, context: TContext, idleDuration: number): void
    trackUserReturned(step: OnboardingStep<TContext>, context: TContext, awayDuration: number): void
    trackChecklistItemToggled(itemId: string, isCompleted: boolean, step: OnboardingStep<TContext>): void
    trackChecklistProgressChanged(
        step: OnboardingStep<TContext>,
        progress: {
            completed: number
            total: number
            percentage: number
            isComplete: boolean
        }
    ): void
    trackErrorEncountered(error: Error, context: TContext, stepId?: string | number): void
    trackProgressMilestone(context: TContext, milestone: number): void
    private _hasValidation
    private _getCompletionMethod
    private _getTimeOnStep
    private _calculateFlowProgress
    private _calculateChurnRisk
    private _getTotalSteps
    private _getCompletedStepsCount
    private _sanitizeContext
    private _sanitizeStepData
}
