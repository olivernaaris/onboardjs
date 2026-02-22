import { OnboardingEngine, EngineState, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
/**
 * Synchronizes engine state to React state via event listeners.
 * Single responsibility: state synchronization only.
 */
export declare function useEngineState<TContext extends OnboardingContextType>(
    engine: OnboardingEngine<TContext> | null,
    isEngineReady: boolean
): EngineState<TContext> | null
