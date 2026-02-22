import { OnboardingStep, OnboardingContext } from '../types'
import {
    OnboardingEngineConfig,
    UnsubscribeFunction,
    EventListenerMap,
    DataLoadFn,
    DataPersistFn,
    StepActiveEvent,
    StepChangeEvent,
    StepCompletedEvent,
    FlowCompletedEvent,
    ContextUpdateEvent,
    ErrorEvent,
    BeforeStepChangeEvent,
    FlowInfo,
    FlowContext,
    FlowRegisteredEvent,
    FlowUnregisteredEvent,
} from './types'
import { OnboardingPlugin } from '../plugins/types'
import { ChecklistManager } from './ChecklistManager'
import { ErrorHandler } from './ErrorHandler'
import { AsyncOperationQueue } from '../services/AsyncOperationQueue'
import { PerformanceUtils } from '../utils/PerformanceUtils'
import { StateManager } from './StateManager'
import { CoreEngineService } from '../services/CoreEngineService'
import { AnalyticsProvider } from '../analytics/types'
export declare class OnboardingEngine<TContext extends OnboardingContext = OnboardingContext> {
    readonly instanceId: number
    readonly flowContext: FlowContext
    private _steps
    private _currentStepInternal
    private _contextInternal
    private _history
    private _logger
    private _registry
    private _analyticsManager
    private _eventManager
    private _pluginManager
    private _coreEngineService
    private _navigationService
    private _checklistManager
    private _persistenceService
    private _errorHandler
    private _eventRegistry
    private _operationQueue
    private _initializationPromise
    private _resolveInitialization
    private _rejectInitialization
    private _config
    private _onFlowComplete?
    private _onStepChangeCallback?
    constructor(config: OnboardingEngineConfig<TContext>)
    /**
     * Register engine with the registry if provided in configuration.
     */
    private _registerWithRegistry
    /**
     * Unregister engine from its current registry
     */
    private _unregisterFromRegistry
    /**
     * Check if this engine is currently registered
     */
    private _isRegistered
    /**
     * Re-register engine with its current registry (used during reset)
     */
    private _registerWithCurrentRegistry
    private _setupInitializationPromise
    /**
     * Core initialization method
     */
    private _initializeEngine
    private _navigateToInitialStep
    private _installPlugins
    private _applyConfigurationHandlers
    private _loadPersistedData
    private _buildContext
    private _handleInitializationError
    private _updateLoadingState
    /**
     * Waits for the onboarding engine to be fully initialized
     */
    ready(): Promise<void>
    /**
     * Install a plugin
     */
    use(plugin: OnboardingPlugin<TContext>): Promise<this>
    /**
     * Get current engine state
     */
    getState(): import('./types').EngineState<TContext>
    /**
     * Navigate to next step
     */
    next(stepSpecificData?: Record<string, unknown>): Promise<void>
    /**
     * Navigate to previous step
     */
    previous(): Promise<void>
    /**
     * Skip current step
     */
    skip(): Promise<void>
    /**
     * Go to specific step
     */
    goToStep(stepId: string, stepSpecificData?: unknown): Promise<void>
    /**
     * Update context
     */
    updateContext(newContextData: Partial<TContext>): Promise<void>
    /**
     * Update checklist item
     */
    updateChecklistItem(itemId: string, isCompleted: boolean, stepId?: string): Promise<void>
    /**
     * Reset the engine
     */
    reset(newConfigInput?: Partial<OnboardingEngineConfig<TContext>>): Promise<void>
    addEventListener<T extends keyof EventListenerMap<TContext>>(
        eventType: T,
        listener: EventListenerMap<TContext>[T]
    ): UnsubscribeFunction
    addBeforeStepChangeListener(
        listener: (event: BeforeStepChangeEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    addAfterStepChangeListener(
        listener: (event: StepChangeEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    addStepActiveListener(listener: (event: StepActiveEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    addStepCompletedListener(
        listener: (event: StepCompletedEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    addFlowCompletedListener(
        listener: (event: FlowCompletedEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    addContextUpdateListener(
        listener: (event: ContextUpdateEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    addErrorListener(listener: (event: ErrorEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    addFlowRegisteredListener(
        listener: (event: FlowRegisteredEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    addFlowUnregisteredListener(
        listener: (event: FlowUnregisteredEvent<TContext>) => void | Promise<void>
    ): UnsubscribeFunction
    /**
     * Get flow identification information
     */
    getFlowInfo(): FlowInfo
    /**
     * Get the unique identifier for this flow
     */
    getFlowId(): string | null
    /**
     * Get the version of this flow
     */
    getFlowVersion(): string | null
    /**
     * Get the name of this flow
     */
    getFlowName(): string | null
    /**
     * Get metadata associated with this flow
     */
    getFlowMetadata(): Record<string, unknown> | null
    /**
     * Get the instance ID for this flow
     */
    getInstanceId(): number
    /**
     * Generate a namespaced key for persistence based on flow identification
     */
    generatePersistenceKey(baseKey?: string): string
    /**
     * Check if this engine instance matches the given flow identifier
     */
    matchesFlow(flowId: string): boolean
    /**
     * Check if this engine instance is compatible with a given version
     * Uses semantic versioning comparison
     */
    isVersionCompatible(requiredVersion: string): boolean
    setDataLoadHandler(handler: DataLoadFn<TContext> | undefined): void
    setDataPersistHandler(handler: DataPersistFn<TContext> | undefined): void
    setClearPersistedDataHandler(handler: (() => Promise<void> | void) | undefined): void
    /**
     * @deprecated Use `coreEngineService` or the engine's state management methods directly.
     * This getter is provided for backward compatibility during the v1.0 migration.
     * It will be removed in a future major version.
     */
    get stateManager(): StateManager<TContext>
    /**
     * Get all steps in the onboarding flow.
     * This includes all steps defined in the initial configuration.
     * @returns An array of all steps in the onboarding flow.
     */
    getSteps(): OnboardingStep<TContext>[]
    /**
     * Get the index of a specific step in the onboarding flow based on relevant steps.
     * @param stepId The ID of the step to find.
     * @returns The index of the step, or -1 if not found.
     */
    getStepIndex(stepId: string | number): number
    /**
     * Get relevant steps in the flow based on the current context.
     * @returns An array of steps that are relevant to the current context.
     */
    getRelevantSteps(): OnboardingStep<TContext>[]
    /**
     * Get performance statistics
     */
    getPerformanceStats(): {
        cache: ReturnType<typeof PerformanceUtils.getCacheStats>
        memory: ReturnType<typeof PerformanceUtils.getMemoryUsage>
        queue: ReturnType<typeof AsyncOperationQueue.prototype.getStats>
        operations: Record<string, ReturnType<typeof PerformanceUtils.getPerformanceStats>>
    }
    /**
     * Get error history
     */
    getErrorHistory(): ReturnType<ErrorHandler<TContext>['getErrorHistory']>
    /**
     * Allows plugins or external code to report an error to the engine's
     * centralized error handler.
     * @param error The error object or unknown value.
     * @param operation A string describing the operation that failed (e.g., 'MyPlugin.saveData').
     */
    reportError(error: unknown, operation: string): void
    /**
     * Get checklist progress for current step
     */
    getChecklistProgress(): ReturnType<ChecklistManager<TContext>['getChecklistProgress']> | null
    reportStepValidationFailure(step: OnboardingStep<TContext>, validationErrors: string[]): void
    reportHelpRequest(helpType: string): void
    getContext(): TContext
    /**
     * Force garbage collection of caches
     */
    clearCaches(): void
    /**
     * Pause the onboarding flow
     * This emits a flowPaused event for analytics tracking
     */
    pauseFlow(reason?: 'user_action' | 'timeout' | 'error'): void
    /**
     * Resume the onboarding flow
     * This emits a flowResumed event for analytics tracking
     */
    resumeFlow(resumePoint?: string): void
    /**
     * Mark the flow as abandoned
     * This emits a flowAbandoned event for analytics tracking
     */
    abandonFlow(abandonmentReason?: string): void
    /**
     * Mark the current step as abandoned due to timeout or other reasons
     * This emits a stepAbandoned event for analytics tracking
     */
    abandonStep(timeOnStep?: number): void
    /**
     * Mark the current step as retried
     * This emits a stepRetried event for analytics tracking
     */
    retryStep(retryCount?: number): void
    /**
     * Get the time spent on the current step in milliseconds
     */
    private _getTimeOnCurrentStep
    private _initializeAnalytics
    private _setupAnalyticsEventListeners
    /**
     * Helper method to identify changed fields between contexts
     */
    private _getChangedFields
    trackEvent(eventName: string, properties?: Record<string, any>): void
    /**
     * Track a custom business event with enhanced context information.
     * This method automatically enriches the event with current flow context.
     *
     * @param eventName The name of the custom event
     * @param properties Additional properties to include with the event
     * @param options Optional configuration for the event
     */
    trackCustomEvent(
        eventName: string,
        properties?: Record<string, any>,
        options?: {
            /** Include current step information in the event */
            includeStepContext?: boolean
            /** Include current flow progress in the event */
            includeFlowProgress?: boolean
            /** Include current context data (sanitized) */
            includeContextData?: boolean
            /** Custom event category for organization */
            category?: string
            /** Event priority level */
            priority?: 'low' | 'normal' | 'high' | 'critical'
        }
    ): void
    /**
     * Sanitize context data for analytics tracking by removing sensitive information
     */
    private _sanitizeContextForAnalytics
    registerAnalyticsProvider(provider: AnalyticsProvider): void
    flushAnalytics(): Promise<void>
    setAnalyticsUserId(userId: string): void
    /**
     * Cleanup and destroy the engine instance
     */
    destroy(): Promise<void>
    /**
     * Get detailed engine information for debugging
     */
    getDebugInfo(): {
        flowInfo: FlowInfo
        currentStep: OnboardingStep<TContext> | null
        context: TContext
        history: string[]
        state: ReturnType<CoreEngineService<TContext>['getState']>
        performance: ReturnType<OnboardingEngine<TContext>['getPerformanceStats']>
        errors: ReturnType<ErrorHandler<TContext>['getRecentErrors']>
        config: OnboardingEngineConfig<TContext>
    }
}
