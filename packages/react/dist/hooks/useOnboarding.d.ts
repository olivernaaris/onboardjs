import { OnboardingContextValue } from '../context/OnboardingProvider'
import { UseOnboardingOptions } from './useOnboarding.types'
import { OnboardingContext as OnboardingContextType } from '@onboardjs/core'
/**
 * Hook for accessing the onboarding flow state and actions.
 *
 * @template TContext - The type of context used in the onboarding flow
 * @param options - Optional configuration for event handlers
 * @returns The onboarding context value containing state, loading, and actions
 *
 * @example
 * ```tsx
 * const { state, loading, next, previous, renderStep } = useOnboarding()
 *
 * // Access granular loading states
 * if (loading.isHydrating) return <SkeletonLoader />
 * if (loading.isEngineProcessing) return <TransitionSpinner />
 *
 * // Navigate through the flow
 * const handleNext = () => next({ fieldValue: 'user input' })
 *
 * // Render current step
 * return (
 *   <div>
 *     {renderStep()}
 *     <button onClick={handleNext} disabled={loading.isAnyLoading}>
 *       Next
 *     </button>
 *   </div>
 * )
 * ```
 *
 * @throws Error if used outside of an OnboardingProvider
 */
export declare function useOnboarding<TContext extends OnboardingContextType = OnboardingContextType>(
    options?: UseOnboardingOptions<TContext>
): OnboardingContextValue<TContext>
