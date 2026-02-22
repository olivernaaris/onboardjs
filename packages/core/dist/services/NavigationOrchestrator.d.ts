import { Logger } from './Logger'
import { OnboardingContext, OnboardingStep } from '../types'
import { ErrorHandler } from '../engine/ErrorHandler'
import { EventManager } from '../engine/EventManager'
import { StateManager } from '../engine/StateManager'
import type { IPersistenceService } from './interfaces'
import { StepTransitionService } from './StepTransitionService'
import { ChecklistNavigationService } from './ChecklistNavigationService'
/**
 * NavigationOrchestrator coordinates the three navigation services:
 * - StepTransitionService: Direction-aware step navigation
 * - BeforeNavigationHandler: Event handling and cancellation
 * - ChecklistNavigationService: Checklist-specific operations
 *
 * This replaces the monolithic NavigationService with a more modular design.
 * It maintains the same public API while delegating to specialized services.
 */
export declare class NavigationOrchestrator<TContext extends OnboardingContext = OnboardingContext> {
    private readonly _steps
    private readonly _eventManager
    private readonly _stateManager
    private readonly _persistenceService
    private readonly _errorHandler
    private readonly _logger
    private readonly _stepTransitionService
    private readonly _beforeNavigationHandler
    private readonly _checklistService
    constructor(
        _steps: OnboardingStep<TContext>[],
        _eventManager: EventManager<TContext>,
        _stateManager: StateManager<TContext>,
        _persistenceService: IPersistenceService<TContext>,
        _errorHandler: ErrorHandler<TContext>,
        logger?: Logger
    )
    /**
     * Navigate to a specific step with full event handling.
     * Orchestrates the three services: beforeStepChange → transition → activation.
     */
    navigateToStep(
        requestedTargetStepId: string | number | null | undefined,
        direction: 'next' | 'previous' | 'skip' | 'goto' | 'initial' | undefined,
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
    /**
     * Calculate the next step without navigating.
     */
    calculateNextStep(currentStep: OnboardingStep<TContext>, context: TContext): OnboardingStep<TContext> | null
    /**
     * Calculate the previous step without navigating.
     */
    calculatePreviousStep(
        currentStep: OnboardingStep<TContext>,
        context: TContext,
        history: string[]
    ): OnboardingStep<TContext> | null
    /**
     * Get checklist state for a CHECKLIST step.
     */
    getChecklistState(
        step: OnboardingStep<TContext>,
        context: TContext
    ): {
        id: string
        isCompleted: boolean
    }[]
    /**
     * Check if a checklist step is complete.
     */
    isChecklistComplete(step: OnboardingStep<TContext>, context: TContext): boolean
    /**
     * Update a checklist item.
     */
    updateChecklistItem(
        itemId: string,
        isCompleted: boolean,
        step: OnboardingStep<TContext>,
        context: TContext,
        persistCallback?: () => Promise<void>
    ): Promise<void>
    /**
     * Get exposed services for advanced usage.
     */
    getStepTransitionService(): StepTransitionService<TContext>
    getChecklistService(): ChecklistNavigationService<TContext>
    private _emitNavigationEvents
    private _handleStepActivation
    private _handleFlowComplete
}
