import { TrackAhaParams, aha, type OnboardingContext as OnboardingContextType } from '@onboardjs/core'
/**
 * Hook for accessing analytics operations in the onboarding flow.
 *
 * This is the primary hook for tracking aha moments and custom analytics events.
 * For general event tracking, use `engine.trackCustomEvent()` directly via the `useOnboarding()` hook.
 *
 * The hook automatically:
 * - Links the AhaTracker to the current OnboardingEngine for auto user_id detection
 * - Provides a wrapped `trackAha` function that includes engine context
 * - Handles initialization and cleanup
 *
 * Usage for aha moments:
 * ```tsx
 * const { trackAha } = useOnboardingAnalytics()
 *
 * const handleClick = async () => {
 *   await trackAha({
 *     aha_type: 'value_demonstration',
 *     context: { feature_name: 'my_feature' }
 *   })
 * }
 * ```
 *
 * Usage for custom events:
 * ```tsx
 * const { engine } = useOnboarding()
 *
 * engine.trackCustomEvent('my_event', {
 *   property_name: 'value',
 *   includeStepContext: true,
 *   includeFlowProgress: true
 * })
 * ```
 *
 * @returns Object with `trackAha` function and direct `aha` export
 * @see {@link https://docs.onboardjs.com/api/analytics} For full analytics API documentation
 */
export declare function useOnboardingAnalytics<TContext extends OnboardingContextType = OnboardingContextType>(): {
    trackAha: (params: TrackAhaParams) => Promise<import('@onboardjs/core').AhaEvent | null>
    aha: typeof aha
}
export type { TrackAhaParams }
