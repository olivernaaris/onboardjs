import { Logger } from './Logger'
import { OnboardingContext, OnboardingStep } from '../types'
import { ErrorHandler } from '../engine/ErrorHandler'
import { EventManager } from '../engine/EventManager'
import { StateManager } from '../engine/StateManager'
export interface BeforeNavigationResult {
    isCancelled: boolean
    finalTargetStepId: string | number | null | undefined
}
/**
 * BeforeNavigationHandler manages beforeStepChange event handling.
 * Responsible for:
 * - Checking listener count efficiently
 * - Notifying listeners sequentially
 * - Handling cancellation
 * - Handling redirection
 * - Error handling during event processing
 */
export declare class BeforeNavigationHandler<TContext extends OnboardingContext = OnboardingContext> {
    private readonly _eventManager
    private readonly _stateManager
    private readonly _errorHandler
    private readonly _logger
    constructor(
        _eventManager: EventManager<TContext>,
        _stateManager: StateManager<TContext>,
        _errorHandler: ErrorHandler<TContext>,
        logger?: Logger
    )
    /**
     * Process beforeStepChange event and return cancellation/redirection result.
     * Returns the final target step ID (which may be different from the requested one).
     * If cancelled, returns the original requestedTargetStepId along with cancellation flag.
     */
    handle(
        requestedTargetStepId: string | number | null | undefined,
        direction: 'next' | 'previous' | 'skip' | 'goto' | 'initial',
        currentStep: OnboardingStep<TContext> | null,
        context: TContext
    ): Promise<BeforeNavigationResult>
}
