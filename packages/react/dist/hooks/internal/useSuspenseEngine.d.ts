import { OnboardingEngine, OnboardingEngineConfig, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
/**
 * Clears the suspense cache for a given configuration hash.
 * Useful for testing and manual cache invalidation.
 */
export declare function clearSuspenseCache(configHash?: string): void
export interface UseSuspenseEngineResult<TContext extends OnboardingContextType> {
    engine: OnboardingEngine<TContext>
    isReady: true
    error: null
}
/**
 * Suspense-enabled hook for engine initialization.
 * Throws a Promise during initialization to trigger React Suspense.
 *
 * @throws {Promise} During initialization - caught by Suspense boundary
 * @throws {Error} If initialization fails - caught by Error Boundary
 *
 * @example
 * ```tsx
 * function OnboardingUI() {
 *   // This will suspend until engine is ready
 *   const { engine } = useSuspenseEngine(config);
 *   // Engine is guaranteed to be ready here
 *   return <div>{engine.getState().currentStep?.id}</div>;
 * }
 *
 * function App() {
 *   return (
 *     <Suspense fallback={<Loading />}>
 *       <OnboardingUI />
 *     </Suspense>
 *   );
 * }
 * ```
 */
export declare function useSuspenseEngine<TContext extends OnboardingContextType>(
    config: OnboardingEngineConfig<TContext>
): UseSuspenseEngineResult<TContext>
