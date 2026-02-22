import { OnboardingContext } from '../types'
import { ErrorHandler } from '../engine/ErrorHandler'
import { EventManager } from '../engine/EventManager'
import { DataLoadFn, DataPersistFn, LoadedData } from '../engine/types'
import type { IPersistenceService } from './interfaces'
/**
 * PersistenceService handles data persistence operations for the onboarding flow.
 *
 * This service is responsible for:
 * - Loading persisted state on initialization
 * - Persisting state changes during navigation
 * - Clearing persisted data on reset
 * - Emitting persistence events for monitoring
 *
 * @example
 * ```typescript
 * const persistenceService = new PersistenceService(
 *   async () => localStorage.getItem('onboarding'),
 *   async (context, stepId) => localStorage.setItem('onboarding', JSON.stringify({ context, stepId })),
 *   async () => localStorage.removeItem('onboarding'),
 *   errorHandler,
 *   eventManager
 * )
 *
 * // Load persisted data
 * const { data, error } = await persistenceService.loadPersistedData()
 *
 * // Persist current state
 * await persistenceService.persistDataIfNeeded(context, 'step-1', false)
 * ```
 */
export declare class PersistenceService<
    TContext extends OnboardingContext = OnboardingContext,
> implements IPersistenceService<TContext> {
    private readonly _errorHandler?
    private readonly _eventManager?
    private _loadData?
    private _persistData?
    private _clearPersistedData?
    private _logger
    constructor(
        loadData?: DataLoadFn<TContext>,
        persistData?: DataPersistFn<TContext>,
        clearPersistedData?: () => Promise<void> | void,
        _errorHandler?: ErrorHandler<TContext> | undefined,
        _eventManager?: EventManager<TContext> | undefined,
        debugMode?: boolean
    )
    /**
     * Load persisted data from storage
     */
    loadPersistedData(): Promise<{
        data: LoadedData<TContext> | null
        error: Error | null
    }>
    /**
     * Persist data if persistence is configured and not currently hydrating
     */
    persistDataIfNeeded(context: TContext, currentStepId: string | number | null, isHydrating: boolean): Promise<void>
    /**
     * Clear all persisted data
     */
    clearData(): Promise<void>
    /**
     * Set the data load handler
     */
    setDataLoadHandler(handler?: DataLoadFn<TContext>): void
    /**
     * Set the data persist handler
     */
    setDataPersistHandler(handler?: DataPersistFn<TContext>): void
    /**
     * Set the clear persisted data handler
     */
    setClearPersistedDataHandler(handler?: () => Promise<void> | void): void
    /**
     * Get the current data load handler
     */
    getDataLoadHandler(): DataLoadFn<TContext> | undefined
    /**
     * Get the current data persist handler
     */
    getDataPersistHandler(): DataPersistFn<TContext> | undefined
    /**
     * Get the current clear persisted data handler
     */
    getClearPersistedDataHandler(): (() => Promise<void> | void) | undefined
}
