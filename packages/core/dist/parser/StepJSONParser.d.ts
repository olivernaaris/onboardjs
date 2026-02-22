import { OnboardingStep, OnboardingContext, OnboardingStepType } from '../types'
import { StepJSONParserOptions, ParseResult, ExportData } from './types'
export declare class StepJSONParser {
    private static readonly _VERSION
    private static readonly _DEFAULT_OPTIONS
    private static readonly _logger
    /**
     * Serialize OnboardingStep[] to JSON string
     */
    static toJSON<TContext extends OnboardingContext = OnboardingContext>(
        steps: OnboardingStep<TContext>[],
        options?: Partial<StepJSONParserOptions>
    ): ParseResult<string>
    /**
     * Deserialize JSON string to OnboardingStep[]
     */
    static fromJSON<TContext extends OnboardingContext = OnboardingContext>(
        jsonString: string,
        options?: Partial<StepJSONParserOptions>
    ): ParseResult<OnboardingStep<TContext>[]>
    private static _serializeStep
    private static _serializeStepProperty
    private static _serializeFunction
    private static _serializePayload
    private static _deserializeStep
    private static _deserializeStepProperty
    private static _deserializeFunction
    private static _deserializePayload
    private static _isSerializedFunction
    private static _extractFunctionParameters
    private static _hasAnyFunctions
    private static _validateSteps
    private static _validateStepPayload
    private static _validateSchema
    /**
     * Quick serialize with default options
     */
    static serialize<TContext extends OnboardingContext = OnboardingContext>(
        steps: OnboardingStep<TContext>[],
        prettyPrint?: boolean
    ): string | null
    /**
     * Quick deserialize with default options
     */
    static deserialize<TContext extends OnboardingContext = OnboardingContext>(
        jsonString: string
    ): OnboardingStep<TContext>[] | null
    /**
     * Create a copy of steps (serialize then deserialize)
     */
    static clone<TContext extends OnboardingContext = OnboardingContext>(
        steps: OnboardingStep<TContext>[]
    ): OnboardingStep<TContext>[] | null
    /**
     * Prepares step data for export by serializing it to a JSON string.
     * This method is UI-agnostic and does not perform any DOM operations.
     *
     * @returns A ParseResult containing the data needed to create a file for download.
     */
    static getExportableData<TContext extends OnboardingContext = OnboardingContext>(
        steps: OnboardingStep<TContext>[],
        filename?: string,
        options?: Partial<StepJSONParserOptions>
    ): ParseResult<ExportData>
}
export declare namespace StepJSONParserUtils {
    function isValidStepJSON(json: string): boolean
    function getStepTypesFromJSON(json: string): OnboardingStepType[]
    function getStepIdsFromJSON(json: string): (string | number)[]
    function hasCustomComponents(json: string): boolean
    function hasFunctions(json: string): boolean
}
export default StepJSONParser
