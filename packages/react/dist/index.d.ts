export { OnboardingProvider } from './context/OnboardingProvider'
export { useOnboarding } from './hooks/useOnboarding'
export { useOnboardingAnalytics } from './hooks/useOnboardingAnalytics'
export {
    BasePlugin,
    PluginManagerImpl,
    type OnboardingPlugin,
    type PluginManager,
    type PluginHooks,
    type PluginConfig,
    type PluginCleanup,
} from '@onboardjs/core'
export { ReactPlugin } from './plugins/ReactPlugin'
export type { ReactPluginConfig, ReactPluginHooks } from './plugins/ReactPlugin'
export {
    OnboardingErrorBoundary,
    OnboardingContainer,
    PersistenceStatus,
    type OnboardingErrorBoundaryProps,
    type OnboardingErrorBoundaryFallbackProps,
    type OnboardingError,
    type OnboardingErrorType,
    type OnboardingContainerProps,
    type PersistenceStatusProps,
    type PersistenceMode,
} from './components'
export { createStepsHash, createConfigHash, areStepsEqual, getLoadingReason, createLoadingState } from './utils'
export type { LoadingState, LoadingReason } from './utils'
export { createUrlMapper, toUrlSlug, canAccessStep, type UrlMapper } from './utils/urlMapping'
export { useSuspenseEngine, clearSuspenseCache, type UseSuspenseEngineResult } from './hooks/internal/useSuspenseEngine'
export { createNextNavigator, type NextAppRouter } from './adapters/next'
export {
    createReactRouterNavigator,
    type ReactRouterNavigateFunction,
    type ReactRouterLocation,
} from './adapters/react-router'
export type {
    StepComponentProps,
    StepComponentRegistry,
    OnboardingStep,
    StepComponent,
    OnboardingNavigator,
    NavigatorOptions,
    NavigatorConfig,
    UrlMappingFunction,
} from './types'
export type { UseOnboardingOptions, UseOnboardingReturn } from './hooks/useOnboarding.types'
export type {
    OnboardingContextValue,
    OnboardingActions,
    LocalStoragePersistenceOptions,
    OnboardingProviderProps,
} from './context/OnboardingProvider'
