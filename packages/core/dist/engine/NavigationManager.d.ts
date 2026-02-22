import { Logger } from '../services/Logger'
import { OnboardingContext, OnboardingStep } from '../types'
import { ChecklistManager } from './ChecklistManager'
import { ErrorHandler } from './ErrorHandler'
import { EventManager } from './EventManager'
import { PersistenceManager } from './PersistenceManager'
import { StateManager } from './StateManager'
export declare class NavigationManager<TContext extends OnboardingContext> {
    private _steps
    private _eventManager
    private _stateManager
    private _checklistManager
    private _persistenceManager
    private _errorHandler
    private _logger
    constructor(
        _steps: OnboardingStep<TContext>[],
        _eventManager: EventManager<TContext>,
        _stateManager: StateManager<TContext>,
        _checklistManager: ChecklistManager<TContext>,
        _persistenceManager: PersistenceManager<TContext>,
        _errorHandler: ErrorHandler<TContext>,
        _logger: Logger
    )
    navigateToStep(
        requestedTargetStepId: string | number | null | undefined,
        direction: 'next' | 'previous' | 'skip' | 'goto' | 'initial' | undefined,
        currentStep: OnboardingStep<TContext> | null,
        context: TContext, // Context is passed by reference, allowing direct modification
        history: string[],
        onStepChangeCallback?: (
            newStep: OnboardingStep<TContext> | null,
            oldStep: OnboardingStep<TContext> | null,
            context: TContext
        ) => void,
        onFlowComplete?: (context: TContext) => Promise<void> | void
    ): Promise<OnboardingStep<TContext> | null>
    next(
        currentStep: OnboardingStep<TContext> | null,
        stepSpecificData: any,
        context: TContext,
        history: string[],
        onStepChangeCallback?: (
            newStep: OnboardingStep<TContext> | null,
            oldStep: OnboardingStep<TContext> | null,
            context: TContext
        ) => void,
        onFlowComplete?: (context: TContext) => Promise<void> | void
    ): Promise<OnboardingStep<TContext> | null>
    previous(
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onStepChangeCallback?: (
            newStep: OnboardingStep<TContext> | null,
            oldStep: OnboardingStep<TContext> | null,
            context: TContext
        ) => void,
        onFlowComplete?: (context: TContext) => Promise<void> | void
    ): Promise<OnboardingStep<TContext> | null>
    skip(
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onStepChangeCallback?: (
            newStep: OnboardingStep<TContext> | null,
            oldStep: OnboardingStep<TContext> | null,
            context: TContext
        ) => void,
        onFlowComplete?: (context: TContext) => Promise<void> | void
    ): Promise<OnboardingStep<TContext> | null>
    goToStep(
        stepId: string,
        stepSpecificData: unknown,
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onStepChangeCallback?: (
            newStep: OnboardingStep<TContext> | null,
            oldStep: OnboardingStep<TContext> | null,
            context: TContext
        ) => void,
        onFlowComplete?: (context: TContext) => Promise<void> | void
    ): Promise<OnboardingStep<TContext> | null>
    private _findNextStepCandidate
    private _findPreviousStepCandidate
}
