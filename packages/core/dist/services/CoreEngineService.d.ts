import { OnboardingContext, OnboardingStep } from '../types'
import { EventManager } from '../engine/EventManager'
import { EngineState, FlowContext } from '../engine/types'
import type { ICoreEngineService } from './interfaces'
/**
 * CoreEngineService manages the engine's internal state and lifecycle.
 *
 * This service is responsible for:
 * - Tracking loading, hydration, error, and completion states
 * - Computing the full engine state including navigation candidates
 * - Notifying listeners of state changes
 * - Providing step utilities for flow navigation
 *
 * @example
 * ```typescript
 * const coreService = new CoreEngineService(eventManager, steps, initialStepId, flowContext)
 *
 * // Get current state
 * const state = coreService.getState(currentStep, context, history)
 *
 * // Update loading state
 * coreService.setLoading(true)
 * ```
 */
export declare class CoreEngineService<
    TContext extends OnboardingContext = OnboardingContext,
> implements ICoreEngineService<TContext> {
    private readonly _eventManager
    private readonly _steps
    private readonly _initialStepId
    private readonly _flowContext
    private _isLoading
    private _isHydrating
    private _error
    private _isCompleted
    private _logger
    constructor(
        _eventManager: EventManager<TContext>,
        _steps: OnboardingStep<TContext>[],
        _initialStepId: string | number | null,
        _flowContext: FlowContext,
        debugMode?: boolean
    )
    get isLoading(): boolean
    get isHydrating(): boolean
    get error(): Error | null
    get isCompleted(): boolean
    get hasError(): boolean
    /**
     * Get the complete engine state snapshot
     */
    getState(currentStep: OnboardingStep<TContext> | null, context: TContext, history: string[]): EngineState<TContext>
    /**
     * Update engine state with a partial update function
     */
    setState(
        updater: (prevState: EngineState<TContext>) => Partial<EngineState<TContext>>,
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onContextChange?: (oldContext: TContext, newContext: TContext) => void
    ): void
    /**
     * Manually trigger state change notification
     */
    notifyStateChange(currentStep: OnboardingStep<TContext> | null, context: TContext, history: string[]): void
    setLoading(loading: boolean): void
    setHydrating(hydrating: boolean): void
    setError(error: Error | null): void
    setCompleted(completed: boolean): void
    /**
     * Get all relevant steps based on current context conditions
     */
    getRelevantSteps(context: TContext): OnboardingStep<TContext>[]
    /**
     * Find a step by ID
     */
    getStepById(stepId: string | number): OnboardingStep<TContext> | undefined
    /**
     * Get all completed steps based on context
     */
    getCompletedSteps(context: TContext): OnboardingStep<TContext>[]
    private _notifyStateChangeListeners
    private _findNextStep
    private _findPreviousStep
}
