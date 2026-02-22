import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
export interface TypeScriptExportOptions {
    /** Whether to include imports at the top */
    includeImports: boolean
    /** Whether to include type annotations */
    includeTypes: boolean
    /** Whether to export as const assertion */
    useConstAssertion: boolean
    /** Variable name for the exported steps */
    variableName: string
    /** Whether to include comments */
    includeComments: boolean
    /** Whether to format functions inline or as separate variables */
    inlineFunctions: boolean
    /** Indentation style */
    indentation: 'spaces' | 'tabs'
    /** Number of spaces for indentation (if using spaces) */
    spacesCount: 2 | 4
    /** Whether to include validation helpers */
    includeValidation: boolean
}
export interface TypeScriptExportResult {
    success: boolean
    code?: string
    errors: string[]
    warnings: string[]
}
export declare class TypeScriptExporter {
    private static readonly _DEFAULT_OPTIONS
    static exportToTypeScript<TContext extends OnboardingContext = OnboardingContext>(
        steps: OnboardingStep<TContext>[],
        options?: Partial<TypeScriptExportOptions>
    ): TypeScriptExportResult
    private static _generateImports
    private static _generateFunctionDefinitions
    private static _generateStepsArray
    private static _generateStepObject
    private static _generatePayload
    private static _formatChoiceOption
    private static _formatChecklistItem
    private static _formatFunction
    private static _formatValue
    private static _formatObject
    private static _generateValidationHelpers
}
//# sourceMappingURL=typescript-exporter.d.ts.map
