import { OnboardingEngine, OnboardingEngineConfig, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
export interface UseEngineLifecycleResult<TContext extends OnboardingContextType> {
    engine: OnboardingEngine<TContext> | null
    isReady: boolean
    error: Error | null
}
/**
 * Manages engine creation, initialization, and cleanup.
 *
 * IMPORTANT: Configuration validation is now performed at the OnboardingProvider level
 * with fail-fast semantics. This function assumes a valid configuration and focuses
 * solely on engine lifecycle management.
 *
 * Uses configuration hashing to ensure engine is only recreated when meaningful
 * configuration changes occur (not on callback reference changes).
 */
export declare function useEngineLifecycle<TContext extends OnboardingContextType>(
    config: OnboardingEngineConfig<TContext>
): UseEngineLifecycleResult<TContext>
