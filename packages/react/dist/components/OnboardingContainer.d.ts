import React, { ReactNode } from 'react'
import { OnboardingContext as OnboardingContextType } from '@onboardjs/core'
import { type OnboardingProviderProps } from '../context/OnboardingProvider'
import { type OnboardingErrorBoundaryProps } from './OnboardingErrorBoundary'
/**
 * Props for OnboardingContainer component
 *
 * @example With analytics before_send hook
 * ```tsx
 * import { AnalyticsBeforeSendHook } from '@onboardjs/core'
 *
 * const beforeSend: AnalyticsBeforeSendHook = (event) => {
 *   // Drop events with sensitive data
 *   if (event.properties.includes_password) {
 *     return null
 *   }
 *   return event
 * }
 *
 * <OnboardingContainer
 *   steps={steps}
 *   analytics={{ enabled: true, before_send: beforeSend }}
 * >
 *   <YourComponent />
 * </OnboardingContainer>
 * ```
 */
export interface OnboardingContainerProps<TContext extends OnboardingContextType> extends Omit<
    OnboardingProviderProps<TContext>,
    'children'
> {
    /**
     * Children to render inside the provider and error boundary
     */
    children: ReactNode
    /**
     * Enable Suspense support for async engine initialization
     * @default false
     */
    suspense?: boolean
    /**
     * Fallback UI shown while Suspense is pending
     */
    suspenseFallback?: ReactNode
    /**
     * Enable the error boundary wrapper
     * @default true
     */
    errorBoundary?: boolean
    /**
     * Props to pass to the error boundary (if enabled)
     */
    errorBoundaryProps?: Omit<OnboardingErrorBoundaryProps, 'children'>
    /**
     * Callback fired when error boundary catches an error
     */
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}
/**
 * All-in-one container component that combines:
 * - OnboardingProvider (engine initialization)
 * - OnboardingErrorBoundary (error handling)
 * - Suspense boundary (async initialization)
 *
 * This is a convenient wrapper for users who want the full onboarding setup
 * without manually composing the components.
 *
 * @example
 * ```tsx
 * <OnboardingContainer
 *   steps={steps}
 *   initialStepId="step1"
 *   suspense={true}
 *   errorBoundary={true}
 * >
 *   <YourOnboardingUI />
 * </OnboardingContainer>
 * ```
 *
 * @example With custom error handling
 * ```tsx
 * <OnboardingContainer
 *   steps={steps}
 *   initialStepId="step1"
 *   errorBoundaryProps={{
 *     fallback: <CustomErrorUI />,
 *     onError: (error) => logToService(error)
 *   }}
 * >
 *   <YourOnboardingUI />
 * </OnboardingContainer>
 * ```
 */
export declare function OnboardingContainer<TContext extends OnboardingContextType = OnboardingContextType>({
    children,
    suspense,
    suspenseFallback,
    errorBoundary,
    errorBoundaryProps,
    onError,
    ...providerProps
}: OnboardingContainerProps<TContext>): React.ReactNode
