import { OnboardingContext } from '../types'
import { ErrorHandler } from './ErrorHandler'
import { EventManager } from './EventManager'
import { DataLoadFn, DataPersistFn, LoadedData } from './types'
export declare class PersistenceManager<TContext extends OnboardingContext> {
    private errorHandler?
    private eventManager?
    private loadData?
    private persistData?
    private clearPersistedData?
    private logger
    constructor(
        loadData?: DataLoadFn<TContext>,
        persistData?: DataPersistFn<TContext>,
        clearPersistedData?: () => Promise<void> | void,
        errorHandler?: ErrorHandler<TContext> | undefined,
        eventManager?: EventManager<TContext> | undefined,
        debugMode?: boolean
    )
    loadPersistedData(): Promise<{
        data: LoadedData<TContext> | null
        error: Error | null
    }>
    persistDataIfNeeded(context: TContext, currentStepId: string | number | null, isHydrating: boolean): Promise<void>
    clearData(): Promise<void>
    setDataLoadHandler(handler?: DataLoadFn<TContext> | undefined): void
    setDataPersistHandler(handler?: DataPersistFn<TContext> | undefined): void
    setClearPersistedDataHandler(handler?: (() => Promise<void> | void) | undefined): void
    getDataLoadHandler(): DataLoadFn<TContext> | undefined
    getDataPersistHandler(): DataPersistFn<TContext> | undefined
    getClearPersistedDataHandler(): (() => Promise<void> | void) | undefined
}
