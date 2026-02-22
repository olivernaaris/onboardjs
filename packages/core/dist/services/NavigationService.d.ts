import { Logger } from './Logger'
import { OnboardingContext, OnboardingStep, ChecklistItemState } from '../types'
import { ErrorHandler } from '../engine/ErrorHandler'
import { EventManager } from '../engine/EventManager'
import { StateManager } from '../engine/StateManager'
import type { INavigationService, IPersistenceService } from './interfaces'
/**
 * Checklist progress information
 */
export interface ChecklistProgress {
    completed: number
    total: number
    percentage: number
    isComplete: boolean
}
/**
 * NavigationService provides unified navigation and checklist management.
 * Now delegates to NavigationOrchestrator and specialized services.
 *
 * This refactored version maintains backward compatibility while
 * reducing complexity and improving testability through delegation.
 */
export declare class NavigationService<
    TContext extends OnboardingContext = OnboardingContext,
> implements INavigationService<TContext> {
    private readonly _steps
    private readonly _eventManager
    private readonly _stateManager
    private readonly _persistenceService
    private readonly _errorHandler
    private readonly _logger
    private readonly _orchestrator
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
     * Get checklist item state for a CHECKLIST step.
     */
    getChecklistState(step: OnboardingStep<TContext>, context: TContext): ChecklistItemState[]
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
     * Navigate to the next step with data persistence.
     */
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
    /**
     * Navigate to the previous step.
     */
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
    /**
     * Skip the current step.
     */
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
    /**
     * Navigate directly to a specific step by ID.
     */
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
    /**
     * Get checklist progress for a step.
     */
    getChecklistProgress(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): ChecklistProgress
    private _markStepCompleted
}
