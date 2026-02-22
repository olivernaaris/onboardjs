import { OnboardingContext } from '../types'
import { EventManager } from './EventManager'
import {
    UnsubscribeFunction,
    EventListenerMap,
    FlowCompletedEvent,
    StepChangeEvent,
    StepActiveEvent,
    StepCompletedEvent,
    ContextUpdateEvent,
    EngineState,
    ErrorEvent,
    BeforeStepChangeEvent,
    FlowStartedEvent,
} from './types'
export declare class EventHandlerRegistry<TContext extends OnboardingContext> {
    private _eventManager
    constructor(_eventManager: EventManager<TContext>)
    /**
     * Unified method to register event listeners
     */
    addEventListener<T extends keyof EventListenerMap<TContext>>(
        eventType: T,
        listener: EventListenerMap<TContext>[T]
    ): UnsubscribeFunction
    onStepChange(listener: (event: StepChangeEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onFlowCompleted(listener: (event: FlowCompletedEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onStepActive(listener: (event: StepActiveEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onStepCompleted(listener: (event: StepCompletedEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onContextUpdate(listener: (event: ContextUpdateEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onError(listener: (event: ErrorEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onStateChange(listener: (event: { state: EngineState<TContext> }) => void | Promise<void>): UnsubscribeFunction
    onBeforeStepChange(listener: (event: BeforeStepChangeEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onFlowStarted(listener: (event: FlowStartedEvent<TContext>) => void | Promise<void>): UnsubscribeFunction
    onFlowPaused(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onFlowResumed(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onFlowAbandoned(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onFlowReset(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onStepSkipped(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onStepRetried(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onStepValidationFailed(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onStepHelpRequested(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onStepAbandoned(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onNavigationBack(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onNavigationForward(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onNavigationJump(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onUserIdle(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onUserReturned(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onDataChanged(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onStepRenderTime(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onPersistenceSuccess(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onPersistenceFailure(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onChecklistItemToggled(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onChecklistProgressChanged(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onPluginInstalled(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
    onPluginError(listener: (event: any) => void | Promise<void>): UnsubscribeFunction
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
    private _findStepById
    removeAllListeners(): void
    getListenerCount(eventType: keyof EventListenerMap<TContext>): number
    hasListeners(eventType: keyof EventListenerMap<TContext>): boolean
}
