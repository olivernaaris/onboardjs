import { OnboardingEngine, OnboardingEngineConfig, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
export interface EngineActions<TContext extends OnboardingContextType> {
    next: (stepSpecificData?: Record<string, unknown>) => Promise<void>
    previous: () => Promise<void>
    skip: () => Promise<void>
    goToStep: (stepId: string, stepSpecificData?: Record<string, unknown>) => Promise<void>
    updateContext: (newContextData: Partial<TContext>) => Promise<void>
    reset: (newConfig?: Partial<OnboardingEngineConfig<TContext>>) => Promise<void>
}
export interface UseEngineActionsConfig<TContext extends OnboardingContextType> {
    engine: OnboardingEngine<TContext> | null
    isEngineReady: boolean
    stepData: {
        data: unknown
        isValid: boolean
    }
    /**
     * Callback to update engine processing state.
     * Called with `true` when an engine action starts, `false` when it completes.
     */
    onEngineProcessingChange: (processing: boolean) => void
}
/**
 * Wraps engine methods with loading state management.
 * Single responsibility: action execution with engine processing state.
 *
 * Sets `isEngineProcessing` to true during async operations like:
 * - Navigation (next, previous, skip, goToStep)
 * - Context updates
 * - Engine reset
 */
export declare function useEngineActions<TContext extends OnboardingContextType>(
    config: UseEngineActionsConfig<TContext>
): EngineActions<TContext>
