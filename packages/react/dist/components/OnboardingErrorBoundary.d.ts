import { Component, ErrorInfo, ReactNode } from 'react'
/**
 * Classification of errors that can occur during onboarding.
 */
export type OnboardingErrorType =
    | 'INITIALIZATION_ERROR'
    | 'PERSISTENCE_ERROR'
    | 'ENGINE_ERROR'
    | 'COMPONENT_ERROR'
    | 'UNKNOWN'
/**
 * Extended error information for onboarding errors.
 */
export interface OnboardingError {
    type: OnboardingErrorType
    originalError: Error
    message: string
    recoverable: boolean
}
/**
 * Props for the Error Boundary component.
 */
export interface OnboardingErrorBoundaryProps {
    children: ReactNode
    /**
     * Custom fallback UI to render when an error occurs.
     * If not provided, a default error UI will be rendered.
     */
    fallback?: ReactNode | ((props: OnboardingErrorBoundaryFallbackProps) => ReactNode)
    /**
     * Callback fired when an error is caught.
     * Useful for error logging/reporting services.
     */
    onError?: (error: OnboardingError, errorInfo: ErrorInfo) => void
    /**
     * Callback fired when the user attempts to reset/retry.
     */
    onReset?: () => void
    /**
     * Callback fired when the user chooses to continue without persistence.
     */
    onContinueWithoutPersistence?: () => void
}
/**
 * Props passed to the fallback render function.
 */
export interface OnboardingErrorBoundaryFallbackProps {
    error: OnboardingError
    resetError: () => void
    continueWithoutPersistence?: () => void
}
interface OnboardingErrorBoundaryState {
    hasError: boolean
    error: OnboardingError | null
}
/**
 * Error Boundary component for catching and handling errors in the onboarding flow.
 *
 * @example
 * ```tsx
 * <OnboardingErrorBoundary
 *   onError={(error, errorInfo) => logError(error, errorInfo)}
 *   onReset={() => window.location.reload()}
 * >
 *   <OnboardingProvider steps={steps}>
 *     <YourOnboardingUI />
 *   </OnboardingProvider>
 * </OnboardingErrorBoundary>
 * ```
 */
export declare class OnboardingErrorBoundary extends Component<
    OnboardingErrorBoundaryProps,
    OnboardingErrorBoundaryState
> {
    constructor(props: OnboardingErrorBoundaryProps)
    static getDerivedStateFromError(error: Error): OnboardingErrorBoundaryState
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void
    resetError: () => void
    continueWithoutPersistence: () => void
    render(): ReactNode
}
export {}
