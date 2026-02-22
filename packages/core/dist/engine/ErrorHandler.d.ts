import { OnboardingContext } from '../types'
import { Result } from '../types/Result'
import { EventManager } from './EventManager'
import { StateManager } from './StateManager'
export interface ErrorContext {
    operation: string
    stepId?: string | number
    timestamp: number
    stack?: string
}
export declare class ErrorHandler<TContext extends OnboardingContext> {
    private _eventManager
    private _stateManager
    private _errorHistory
    private _maxHistorySize
    private _logger
    constructor(_eventManager: EventManager<TContext>, _stateManager: StateManager<TContext>)
    handleError(error: unknown, operation: string, engineContext: TContext, stepId?: string | number): Error
    safeExecute<T>(
        operation: () => Promise<T>,
        operationName: string,
        engineContext: TContext,
        stepId?: string | number
    ): Promise<Result<T, Error>>
    safeExecuteSync<T>(
        operation: () => T,
        operationName: string,
        engineContext: TContext,
        stepId?: string | number
    ): Result<T, Error>
    getErrorHistory(): Array<{
        error: Error
        context: ErrorContext
        engineContext: TContext
    }>
    getRecentErrors(count?: number): Array<{
        error: Error
        context: ErrorContext
        engineContext: TContext
    }>
    clearErrorHistory(): void
    hasErrors(): boolean
    getErrorsByOperation(operation: string): Array<{
        error: Error
        context: ErrorContext
        engineContext: TContext
    }>
    getErrorsByStep(stepId: string | number): Array<{
        error: Error
        context: ErrorContext
        engineContext: TContext
    }>
}
