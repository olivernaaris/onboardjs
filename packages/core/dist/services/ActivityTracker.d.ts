import { EventManager } from '../engine/EventManager'
import { OnboardingContext, OnboardingStep } from '../types'
export declare class ActivityTracker<TContext extends OnboardingContext> {
    private _eventManager
    private _getCurrentStep
    private _getContext
    private _lastActivity
    private _idleTimeout
    private _isIdle
    private readonly _IDLE_THRESHOLD
    constructor(
        _eventManager: EventManager<TContext>,
        _getCurrentStep: () => OnboardingStep<TContext> | null,
        _getContext: () => TContext
    )
    private _setupActivityListeners
    private _handleActivity
    private _resetIdleTimer
    cleanup(): void
}
