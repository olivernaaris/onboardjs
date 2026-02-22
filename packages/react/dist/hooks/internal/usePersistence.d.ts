import { DataLoadFn, DataPersistFn, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
import { PersistenceMode } from '../../components/PersistenceStatus'
export interface LocalStoragePersistenceOptions {
    key: string
    ttl?: number
}
export interface UsePersistenceConfig<TContext extends OnboardingContextType> {
    localStoragePersistence?: LocalStoragePersistenceOptions
    customOnDataLoad?: DataLoadFn<TContext>
    customOnDataPersist?: DataPersistFn<TContext>
    customOnClearPersistedData?: () => Promise<unknown> | unknown
    /**
     * Callback fired when a persistence error occurs.
     * Useful for showing user notifications or logging.
     */
    onPersistenceError?: (error: Error) => void
}
export interface UsePersistenceResult<TContext extends OnboardingContextType> {
    onDataLoad: DataLoadFn<TContext>
    onDataPersist: DataPersistFn<TContext>
    onClearPersistedData: () => Promise<void>
    /**
     * The current persistence mode.
     */
    persistenceMode: PersistenceMode
    /**
     * Whether there's been a persistence error.
     */
    persistenceError: Error | null
    /**
     * Switch to memory-only mode (fallback when localStorage fails).
     */
    switchToMemoryMode: () => void
}
/**
 * Handles localStorage operations with proper error recovery.
 * Provides fallback mechanisms for quota and privacy errors.
 */
export declare function usePersistence<TContext extends OnboardingContextType>(
    config: UsePersistenceConfig<TContext>
): UsePersistenceResult<TContext>
