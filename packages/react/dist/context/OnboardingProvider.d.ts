import React, { ReactNode } from 'react'
import {
    OnboardingEngine,
    EngineState,
    OnboardingEngineConfig,
    OnboardingContext as OnboardingContextType,
} from '@onboardjs/core'
import { OnboardingStep, StepComponentRegistry } from '../types'
import type { NavigatorConfig } from '../types/navigator'
import { type LocalStoragePersistenceOptions, type UsePersistenceConfig } from '../hooks/internal'
import { type LoadingState } from '../utils/loadingState'
export interface OnboardingActions<TContext extends OnboardingContextType = OnboardingContextType> {
    next: (stepSpecificData?: Record<string, unknown>) => Promise<void>
    previous: () => Promise<void>
    skip: () => Promise<void>
    goToStep: (stepId: string, stepSpecificData?: Record<string, unknown>) => Promise<void>
    updateContext: (newContextData: Partial<TContext>) => Promise<void>
    reset: (newConfig?: Partial<OnboardingEngineConfig<TContext>>) => Promise<void>
}
export interface OnboardingContextValue<TContext extends OnboardingContextType> extends OnboardingActions<TContext> {
    engine: OnboardingEngine<TContext> | null
    engineInstanceId?: number | undefined
    state: EngineState<TContext> | null
    /**
     * Granular loading state breakdown for better UX control.
     * Provides visibility into why the UI is blocked.
     *
     * @example
     * ```tsx
     * const { loading } = useOnboarding()
     *
     * if (loading.isHydrating) {
     *   return <InitialLoadScreen />
     * } else if (loading.isEngineProcessing) {
     *   return <NavigationSpinner />
     * } else if (loading.isComponentProcessing) {
     *   return <ValidationSpinner />
     * }
     * ```
     */
    loading: LoadingState
    /**
     * @deprecated Use `loading.isAnyLoading` instead. Will be removed in v2.0.
     * Convenience boolean that is true when any loading is occurring.
     */
    isLoading: boolean
    setComponentLoading: (loading: boolean) => void
    currentStep: OnboardingStep<TContext> | null | undefined
    isCompleted: boolean | undefined
    /** The current error state of the engine, if any. */
    error: Error | null
    /**
     * A convenience method to render the current step's content.
     * This can be used by consumers to render the step UI.
     */
    renderStep: () => React.ReactNode
}
/**
 * Generic context factory function.
 * This approach avoids variance issues by creating a new context for each generic instantiation.
 * @internal This is internal API, use OnboardingContext for the default context.
 */
declare function createOnboardingContext<
    TContext extends OnboardingContextType = OnboardingContextType,
>(): React.Context<OnboardingContextValue<TContext> | undefined>
/**
 * Default onboarding context for the base OnboardingContextType.
 * This is used by providers and consumers to manage state.
 */
export declare const OnboardingContext: React.Context<OnboardingContextValue<OnboardingContextType<any>> | undefined>
/**
 * Create a typed onboarding context for a specific context type.
 * Useful for cases where you need type-safe context with a custom context shape.
 */
export { createOnboardingContext }
export type { LocalStoragePersistenceOptions }
/**
 * Configuration props for OnboardingProvider component.
 * Extends OnboardingEngineConfig to support all engine configuration options.
 *
 * @example
 * ```tsx
 * import { AnalyticsBeforeSendHook } from '@onboardjs/core'
 *
 * const beforeSend: AnalyticsBeforeSendHook = (event) => {
 *   // Filter out sensitive events
 *   if (event.type.includes('password')) {
 *     return null
 *   }
 *   // Modify event
 *   return {
 *     ...event,
 *     properties: {
 *       ...event.properties,
 *       customField: 'value'
 *     }
 *   }
 * }
 *
 * <OnboardingProvider
 *   steps={steps}
 *   analytics={{
 *     enabled: true,
 *     before_send: beforeSend
 *   }}
 * >
 *   <App />
 * </OnboardingProvider>
 * ```
 */
export interface OnboardingProviderProps<TContext extends OnboardingContextType> extends Omit<
    OnboardingEngineConfig<TContext>,
    'loadData' | 'persistData' | 'clearPersistedData' | 'onFlowComplete' | 'steps'
> {
    children: ReactNode
    localStoragePersistence?: LocalStoragePersistenceOptions
    customOnDataLoad?: UsePersistenceConfig<TContext>['customOnDataLoad']
    customOnDataPersist?: UsePersistenceConfig<TContext>['customOnDataPersist']
    customOnClearPersistedData?: UsePersistenceConfig<TContext>['customOnClearPersistedData']
    onFlowComplete?: (context: TContext) => Promise<void> | void
    /**
     * A registry mapping step types and ids to their React components.
     * This allows users to provide their own custom step components.
     * This prop is now optional and will be overridden by the `OnboardingStep.component` property
     * if defined.
     */
    componentRegistry?: StepComponentRegistry<TContext>
    /**
     * The array of steps to initialize the onboarding flow.
     */
    steps: OnboardingStep<TContext>[]
    /**
     * Configuration for URL-based navigation.
     * When provided, step changes will be synchronized with the browser URL,
     * enabling deep linking and browser back/forward navigation.
     *
     * @example
     * ```tsx
     * import { useRouter, usePathname } from 'next/navigation'
     * import { createNextNavigator } from '@onboardjs/react'
     *
     * function OnboardingLayout({ children }) {
     *   const router = useRouter()
     *   const pathname = usePathname()
     *   const navigator = useMemo(
     *     () => createNextNavigator(router, pathname),
     *     [router, pathname]
     *   )
     *
     *   return (
     *     <OnboardingProvider
     *       steps={steps}
     *       navigator={{
     *         navigator,
     *         basePath: '/onboarding',
     *         urlMapping: 'auto' // or custom mapping
     *       }}
     *     >
     *       {children}
     *     </OnboardingProvider>
     *   )
     * }
     * ```
     */
    navigator?: NavigatorConfig<TContext>
}
export declare function OnboardingProvider<TContext extends OnboardingContextType = OnboardingContextType>({
    children,
    steps,
    initialStepId,
    initialContext,
    onFlowComplete: passedOnFlowComplete,
    onStepChange,
    localStoragePersistence,
    customOnDataLoad,
    customOnDataPersist,
    customOnClearPersistedData,
    plugins,
    componentRegistry,
    debug,
    navigator: navigatorConfig,
    flowId,
    flowName,
    flowVersion,
    flowMetadata,
    publicKey,
    apiHost,
    cloudOptions,
    analytics,
    userId,
}: OnboardingProviderProps<TContext>): import('react/jsx-runtime').JSX.Element
