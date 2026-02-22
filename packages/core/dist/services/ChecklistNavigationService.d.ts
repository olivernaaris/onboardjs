import { Logger } from './Logger'
import { OnboardingContext, OnboardingStep, ChecklistItemState } from '../types'
import { ErrorHandler } from '../engine/ErrorHandler'
import { EventManager } from '../engine/EventManager'
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
 * ChecklistNavigationService handles all checklist-specific operations.
 * Responsible for:
 * - Checklist state retrieval and initialization
 * - Completion validation
 * - Item updates and persistence
 * - Progress calculation
 *
 * Extracted from NavigationService as part of decomposition.
 */
export declare class ChecklistNavigationService<TContext extends OnboardingContext = OnboardingContext> {
    private readonly _eventManager
    private readonly _errorHandler
    private readonly _logger
    constructor(_eventManager: EventManager<TContext>, _errorHandler: ErrorHandler<TContext>, logger?: Logger)
    /**
     * Get checklist item state for a CHECKLIST step.
     * Initializes state if needed.
     */
    getChecklistState(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): ChecklistItemState[]
    /**
     * Check if a checklist step is complete.
     */
    isChecklistComplete(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): boolean
    /**
     * Update a checklist item.
     */
    updateChecklistItem(
        itemId: string,
        isCompleted: boolean,
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext,
        persistCallback?: () => Promise<void>
    ): Promise<void>
    /**
     * Get checklist progress for a step.
     */
    getChecklistProgress(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): ChecklistProgress
    /**
     * Initialize checklist item states for a step.
     */
    initializeChecklistItems(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): void
    private _getChecklistItemsState
    private _isChecklistStepComplete
    private _updateChecklistItem
}
