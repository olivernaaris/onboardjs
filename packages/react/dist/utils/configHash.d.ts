import { OnboardingStep, OnboardingContext as OnboardingContextType, AnalyticsConfig } from '@onboardjs/core'
/**
 * Creates a stable hash for the steps array.
 * This hash only changes when the structural configuration of steps changes,
 * not when callback references change.
 */
export declare function createStepsHash<TContext extends OnboardingContextType>(
    steps: OnboardingStep<TContext>[]
): string
/**
 * Creates a stable configuration identity for engine initialization.
 * Only includes configuration that should trigger engine re-creation.
 */
export declare function createConfigHash<TContext extends OnboardingContextType>(config: {
    steps: OnboardingStep<TContext>[]
    initialStepId?: string | number
    initialContext?: Partial<TContext>
    debug?: boolean
    plugins?: unknown[]
    analytics?: AnalyticsConfig | boolean
    publicKey?: string
    apiHost?: string
    userId?: string | null
}): string
/**
 * Compares two step arrays for structural equality.
 * Returns true if the steps are structurally equivalent.
 */
export declare function areStepsEqual<TContext extends OnboardingContextType>(
    stepsA: OnboardingStep<TContext>[],
    stepsB: OnboardingStep<TContext>[]
): boolean
