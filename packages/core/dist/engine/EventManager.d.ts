import { OnboardingContext } from '../types'
import { EventListenerMap, UnsubscribeFunction } from './types'
/**
 * Unified event listener handler with consistent error management
 */
export declare class EventManager<TContext extends OnboardingContext = OnboardingContext> {
    private _listeners
    constructor()
    /**
     * Add an event listener with unified error handling
     */
    addEventListener<T extends keyof EventListenerMap<TContext>>(
        eventType: T,
        listener: EventListenerMap<TContext>[T]
    ): UnsubscribeFunction
    /**
     * Notify all listeners for a specific event with consistent error handling
     */
    notifyListeners<T extends keyof EventListenerMap<TContext>>(
        eventType: T,
        ...args: Parameters<EventListenerMap<TContext>[T]>
    ): void
    /**
     * Get legacy event name for error messages to maintain backward compatibility
     */
    private _getLegacyEventName
    /**
     * Notify listeners with promise resolution for sequential execution
     */
    notifyListenersSequential<T extends keyof EventListenerMap<TContext>>(
        eventType: T,
        ...args: Parameters<EventListenerMap<TContext>[T]>
    ): Promise<void>
    /**
     * Get the number of listeners for an event type
     */
    getListenerCount<T extends keyof EventListenerMap<TContext>>(eventType: T): number
    /**
     * Check if an event type has any listeners registered.
     * This is more semantic and robust than checking getListenerCount() === 0.
     * Prefer this method for conditional event emission optimization.
     */
    hasListeners<T extends keyof EventListenerMap<TContext>>(eventType: T): boolean
    /**
     * Check if any of the specified event types have listeners.
     * Useful for checking multiple event types at once.
     */
    hasAnyListeners<T extends keyof EventListenerMap<TContext>>(...eventTypes: T[]): boolean
    /**
     * Clear all listeners
     */
    clearAllListeners(): void
}
