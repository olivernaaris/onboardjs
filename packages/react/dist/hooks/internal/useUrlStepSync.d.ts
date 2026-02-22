import { OnboardingEngine, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
import type { NavigatorConfig } from '../../types/navigator'
import type { OnboardingStep } from '../../types'
import { type UrlMapper } from '../../utils/urlMapping'
export interface UseUrlStepSyncConfig<TContext extends OnboardingContextType = OnboardingContextType> {
    /** Navigator configuration with router adapter and settings */
    navigatorConfig: NavigatorConfig<TContext> | undefined
    /** The onboarding engine instance */
    engine: OnboardingEngine<TContext> | null
    /** Whether the engine is ready */
    isEngineReady: boolean
    /** The onboarding steps */
    steps: OnboardingStep<TContext>[]
}
export interface UseUrlStepSyncResult {
    /**
     * Sync the URL to match the current step.
     * Call this after navigation actions (next, previous, goToStep).
     */
    syncUrlToStep: () => void
    /**
     * The URL mapper instance for converting between steps and URLs.
     */
    urlMapper: UrlMapper | null
}
/**
 * Hook for bidirectional synchronization between URL and onboarding steps.
 *
 * Responsibilities:
 * 1. On mount: Detect step from URL, validate access, sync engine if needed
 * 2. On step change: Update URL to match current step
 * 3. On URL change (browser back/forward): Sync engine to URL step
 *
 * @param config Configuration for URL-step synchronization
 * @returns Functions and state for URL synchronization
 */
export declare function useUrlStepSync<TContext extends OnboardingContextType = OnboardingContextType>(
    config: UseUrlStepSyncConfig<TContext>
): UseUrlStepSyncResult
