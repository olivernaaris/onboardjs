import { OnboardingContext } from '@onboardjs/core'
import type { NavigatorConfig } from '../types/navigator'
import type { OnboardingStep } from '../types'
/**
 * Convert a step ID to a URL-friendly slug.
 *
 * Transformations:
 * - camelCase → kebab-case (userDetails → user-details)
 * - snake_case → kebab-case (user_details → user-details)
 * - Lowercase everything
 * - Numeric IDs are converted to strings
 *
 * @param stepId The step ID to convert
 * @returns A URL-friendly slug
 */
export declare function toUrlSlug(stepId: string | number): string
export interface UrlMapper<TContext extends OnboardingContext = OnboardingContext> {
    /**
     * Convert a step ID to a full URL path.
     * @param stepId The step ID to convert
     * @param context The current onboarding context (for dynamic mappings)
     * @returns The full URL path (e.g., '/onboarding/user-details')
     */
    stepIdToUrl(stepId: string | number, context: TContext): string
    /**
     * Extract a step ID from a URL path.
     * @param path The URL path to parse
     * @returns The step ID if found, or null if the path doesn't match any step
     */
    urlToStepId(path: string): string | number | null
    /**
     * Check if a given path is an onboarding URL.
     * @param path The URL path to check
     * @returns True if the path starts with the basePath
     */
    isOnboardingUrl(path: string): boolean
    /**
     * Get the URL for the completed/finished state.
     * @returns The completion URL or null if not configured
     */
    getCompletionUrl(): string | null
}
/**
 * Create a URL mapper for step-to-URL and URL-to-step conversions.
 *
 * @param config The navigator configuration
 * @param steps The onboarding steps
 * @returns A UrlMapper instance
 */
export declare function createUrlMapper<TContext extends OnboardingContext = OnboardingContext>(
    config: NavigatorConfig<TContext>,
    steps: OnboardingStep<TContext>[]
): UrlMapper<TContext>
/**
 * Check if a step can be accessed based on the current flow state.
 *
 * A step is accessible if:
 * 1. It is the current step
 * 2. It has been completed previously
 * 3. All prerequisite steps have been completed (for linear flows)
 *
 * @param stepId The step ID to check
 * @param currentStepId The currently active step ID
 * @param completedStepIds Set of completed step IDs
 * @param steps The onboarding steps (for determining order)
 * @returns True if the step can be accessed
 */
export declare function canAccessStep<TContext extends OnboardingContext = OnboardingContext>(
    stepId: string | number,
    currentStepId: string | number | null,
    completedStepIds: Set<string | number>,
    steps: OnboardingStep<TContext>[]
): boolean
