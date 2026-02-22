import { OnboardingContext, OnboardingStep, ChecklistItemState } from '../types'
import { ErrorHandler } from './ErrorHandler'
import { EventManager } from './EventManager'
export declare class ChecklistManager<TContext extends OnboardingContext> {
    private _eventManager
    private _errorHandler
    private _logger
    constructor(_eventManager: EventManager<TContext>, _errorHandler: ErrorHandler<TContext>)
    /**
     * Type guard to verify that a step has a valid ChecklistStepPayload
     */
    private _isValidChecklistPayload
    getChecklistItemsState(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): ChecklistItemState[]
    isChecklistStepComplete(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): boolean
    updateChecklistItem(
        itemId: string,
        isCompleted: boolean,
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext,
        persistCallback?: () => Promise<void>
    ): Promise<void>
    getChecklistProgress(
        step: OnboardingStep<TContext> & {
            type: 'CHECKLIST'
        },
        context: TContext
    ): {
        completed: number
        total: number
        percentage: number
        isComplete: boolean
    }
}
