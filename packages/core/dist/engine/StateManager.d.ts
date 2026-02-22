import { OnboardingContext, OnboardingStep } from '../types'
import { EventManager } from './EventManager'
import { EngineState, FlowContext } from './types'
export declare class StateManager<TContext extends OnboardingContext> {
    private _eventManager
    private _steps
    private _initialStepId
    private _flowContext
    private _isLoadingInternal
    private _isHydratingInternal
    private _errorInternal
    private _isCompletedInternal
    private _logger
    constructor(
        _eventManager: EventManager<TContext>,
        _steps: OnboardingStep<TContext>[],
        _initialStepId: string | number | null,
        _flowContext: FlowContext,
        debugMode?: boolean
    )
    setState(
        updater: (prevState: EngineState<TContext>) => Partial<EngineState<TContext>>,
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onContextChange?: (oldContext: TContext, newContext: TContext) => void
    ): void
    notifyStateChange(currentStep: OnboardingStep<TContext> | null, context: TContext, history: string[]): void
    get hasError(): boolean
    getState(currentStep: OnboardingStep<TContext> | null, context: TContext, history: string[]): EngineState<TContext>
    private _notifyStateChangeListeners
    private _findNextStep
    private _findPreviousStep
    get isLoading(): boolean
    get isHydrating(): boolean
    get error(): Error | null
    get isCompleted(): boolean
    /**
     * Get all relevant steps in the flow based on the current context.
     * @param context The current onboarding context.
     * @returns An array of relevant onboarding steps in the current flow.
     */
    getRelevantSteps(context: TContext): OnboardingStep<TContext>[]
    getStepById(stepId: string | number): OnboardingStep<TContext> | undefined
    getCompletedSteps(context: TContext): OnboardingStep<TContext>[]
    setLoading(loading: boolean): void
    setHydrating(hydrating: boolean): void
    setError(error: Error | null): void
    setCompleted(completed: boolean): void
}
