import type { OnboardingContext, OnboardingStep } from '../../types'
import type { EngineState, LoadedData, DataLoadFn, DataPersistFn } from '../../engine/types'
import type { Result } from '../../types/Result'
/**
 * Core state management service interface.
 * Handles engine state, loading, hydration, and state change notifications.
 *
 * Replaces: StateManager
 */
export interface ICoreEngineService<TContext extends OnboardingContext = OnboardingContext> {
    readonly isLoading: boolean
    readonly isHydrating: boolean
    readonly error: Error | null
    readonly isCompleted: boolean
    readonly hasError: boolean
    getState(currentStep: OnboardingStep<TContext> | null, context: TContext, history: string[]): EngineState<TContext>
    setState(
        updater: (prevState: EngineState<TContext>) => Partial<EngineState<TContext>>,
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onContextChange?: (oldContext: TContext, newContext: TContext) => void
    ): void
    notifyStateChange(currentStep: OnboardingStep<TContext> | null, context: TContext, history: string[]): void
    setLoading(loading: boolean): void
    setHydrating(hydrating: boolean): void
    setError(error: Error | null): void
    setCompleted(completed: boolean): void
    getRelevantSteps(context: TContext): OnboardingStep<TContext>[]
    getStepById(stepId: string | number): OnboardingStep<TContext> | undefined
    getCompletedSteps(context: TContext): OnboardingStep<TContext>[]
}
/**
 * Persistence service interface.
 * Handles data loading, persisting, and clearing.
 *
 * Replaces: PersistenceManager (unchanged functionality)
 */
export interface IPersistenceService<TContext extends OnboardingContext = OnboardingContext> {
    loadPersistedData(): Promise<{
        data: LoadedData<TContext> | null
        error: Error | null
    }>
    persistDataIfNeeded(context: TContext, currentStepId: string | number | null, isHydrating: boolean): Promise<void>
    clearData(): Promise<void>
    setDataLoadHandler(handler?: DataLoadFn<TContext>): void
    setDataPersistHandler(handler?: DataPersistFn<TContext>): void
    setClearPersistedDataHandler(handler?: () => Promise<void> | void): void
    getDataLoadHandler(): DataLoadFn<TContext> | undefined
    getDataPersistHandler(): DataPersistFn<TContext> | undefined
    getClearPersistedDataHandler(): (() => Promise<void> | void) | undefined
}
/**
 * Event coordination service interface.
 * Handles event emission, plugin lifecycle, and event handler registration.
 *
 * Replaces: EventManager + PluginManager + EventHandlerRegistry
 */
export interface IEventCoordinator {
    addEventListener<K extends string>(eventType: K, listener: (...args: any[]) => void): () => void
    removeEventListener<K extends string>(eventType: K, listener: (...args: any[]) => void): boolean
    notifyListeners<K extends string>(eventType: K, ...args: any[]): void
    notifyListenersSequential<K extends string>(eventType: K, ...args: any[]): Promise<void>
    getListenerCount(eventType: string): number
    hasListeners(eventType: string): boolean
    installPlugin(plugin: any): Promise<void>
    uninstallPlugin(pluginName: string): Promise<void>
    getInstalledPlugins(): string[]
    isPluginInstalled(pluginName: string): boolean
}
/**
 * Navigation service interface.
 * Handles step navigation, checklist management, and flow progression.
 *
 * Replaces: NavigationManager + ChecklistManager
 */
export interface INavigationService<TContext extends OnboardingContext = OnboardingContext> {
    navigateToStep(
        targetStepId: string | number | null | undefined,
        direction: 'next' | 'previous' | 'skip' | 'goto' | 'initial',
        currentStep: OnboardingStep<TContext> | null,
        context: TContext,
        history: string[],
        onStepChangeCallback?: (
            newStep: OnboardingStep<TContext> | null,
            oldStep: OnboardingStep<TContext> | null,
            context: TContext
        ) => void,
        onFlowComplete?: (context: TContext) => Promise<void> | void
    ): Promise<OnboardingStep<TContext> | null>
    calculateNextStep(currentStep: OnboardingStep<TContext>, context: TContext): OnboardingStep<TContext> | null
    calculatePreviousStep(
        currentStep: OnboardingStep<TContext>,
        context: TContext,
        history: string[]
    ): OnboardingStep<TContext> | null
    getChecklistState(step: OnboardingStep<TContext>, context: TContext): any[]
    isChecklistComplete(step: OnboardingStep<TContext>, context: TContext): boolean
    updateChecklistItem(
        itemId: string,
        isCompleted: boolean,
        step: OnboardingStep<TContext>,
        context: TContext,
        persistCallback?: () => Promise<void>
    ): Promise<void>
}
/**
 * Observability service interface.
 * Handles error management, logging, and basic analytics.
 *
 * Replaces: ErrorHandler (with Result type integration)
 */
export interface IObservabilityService<TContext extends OnboardingContext = OnboardingContext> {
    handleError(error: unknown, operation: string, context: TContext, stepId?: string | number): Error
    safeExecute<T>(
        operation: () => Promise<T>,
        operationName: string,
        context: TContext,
        stepId?: string | number
    ): Promise<Result<T, Error>>
    safeExecuteSync<T>(
        operation: () => T,
        operationName: string,
        context: TContext,
        stepId?: string | number
    ): Result<T, Error>
    getErrorHistory(): Array<{
        error: Error
        context: {
            operation: string
            stepId?: string | number
            timestamp: number
        }
    }>
    clearErrorHistory(): void
}
