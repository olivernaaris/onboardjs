import { BasePlugin, OnboardingContext, PluginHooks } from '@onboardjs/core'
import { PostHogPluginConfig } from './types'
export declare class PostHogPlugin<TContext extends OnboardingContext> extends BasePlugin<
    TContext,
    PostHogPluginConfig
> {
    readonly name = '@onboardjs/plugin-posthog'
    readonly version = '1.0.3'
    readonly description = 'Official PostHog analytics plugin for OnboardJS'
    private _posthog
    private _eventBuilder
    private _churnDetection
    private _performanceTracker
    private _progressMilestones
    private readonly _defaultEventNames
    protected onInstall(): Promise<void>
    protected onUninstall(): Promise<void>
    protected getHooks(): PluginHooks<TContext>
    private _initializePostHog
    /**
     * Set up aha moment tracking integration with PostHog.
     * This registers PostHog as an analytics provider for AhaTracker events.
     *
     * When users call aha(), the events will be captured in PostHog automatically.
     */
    private _setupAhaTracking
    /**
     * Track aha moments in PostHog.
     * This method is called whenever an aha() event is tracked.
     */
    private _trackAhaEvent
    private _getFlowInfo
    private _handleStepActive
    private _handleStepCompleted
    private _handleFlowStarted
    private _handleFlowPaused
    private _handleFlowResumed
    private _handleFlowAbandoned
    private _handleFlowReset
    private _handleStepSkipped
    private _handleStepRetried
    private _handleStepValidationFailed
    private _handleStepHelpRequested
    private _handleStepAbandoned
    private _handleNavigationBack
    private _handleNavigationForward
    private _handleNavigationJump
    private _handleDataChanged
    private _handleStepRenderTime
    private _handlePersistenceSuccess
    private _handlePersistenceFailure
    private _handleChecklistItemToggled
    private _handleChecklistProgressChanged
    private _handlePluginInstalled
    private _handlePluginError
    private _handleFlowCompleted
    private _handleBeforeStepChange
    private _handleAfterStepChange
    private _handleContextUpdate
    private _handleError
    private _handleChurnDetected
    private _getPrimaryRiskFactor
    private _checkProgressMilestones
    private _trackExperimentExposure
    private _trackSlowRender
    private _shouldTrackEvent
    private _captureEvent
    private _getEventName
    private _getStepIndex
    private _isFirstStep
    private _isLastStep
    private _calculateFlowProgress
    private _getTotalSteps
    private _getCompletedStepsCount
    private _getFlowCompletionTime
    private _getPreviousStepId
    private _getCurrentStepId
    private _getCompletionMethod
    private _getNavigationType
    private _getChangedKeys
    private _sanitizeStepData
}
