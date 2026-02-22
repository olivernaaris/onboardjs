import { OnboardingStep, OnboardingContext } from '../types'
export interface StepValidationResult {
    isValid: boolean
    errors: StepValidationError[]
    warnings: StepValidationWarning[]
}
export interface StepValidationError {
    stepId?: string | number
    errorType:
        | 'MISSING_ID'
        | 'DUPLICATE_ID'
        | 'CIRCULAR_NAVIGATION'
        | 'INVALID_REFERENCE'
        | 'MISSING_TYPE'
        | 'INVALID_PAYLOAD'
    message: string
    details?: Record<string, any>
}
export interface StepValidationWarning {
    stepId?: string | number
    warningType: 'UNREACHABLE_STEP' | 'MISSING_PAYLOAD' | 'BROKEN_LINK' | 'UNOPTIMIZED_CONDITION'
    message: string
    details?: Record<string, any>
}
export declare class StepValidator<TContext extends OnboardingContext = OnboardingContext> {
    private _logger
    private readonly _maxDepth
    constructor(maxDepth?: number, debugMode?: boolean)
    /**
     * Validates an array of steps for common configuration errors
     */
    validateSteps(steps: OnboardingStep<TContext>[]): StepValidationResult
    /**
     * TASK-031: Validates that all step IDs are unique
     */
    private _validateIdUniqueness
    /**
     * Validates the structure of a single step
     */
    private _validateStepStructure
    /**
     * TASK-032: Detects circular navigation patterns up to maxDepth
     */
    private _detectCircularNavigation
    /**
     * Recursively checks for circular paths using DFS
     */
    private _checkCircularPath
    /**
     * Validates static navigation references
     */
    private _validateStaticReferences
    /**
     * Detects steps that may be unreachable from the first step
     */
    private _detectUnreachableSteps
    /**
     * Quick validation check - returns true if valid, false if errors found
     */
    isValid(steps: OnboardingStep<TContext>[]): boolean
    /**
     * Gets only errors from validation
     */
    getErrors(steps: OnboardingStep<TContext>[]): StepValidationError[]
    /**
     * Gets only warnings from validation
     */
    getWarnings(steps: OnboardingStep<TContext>[]): StepValidationWarning[]
}
