import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
/**
 * A safe parser for OnboardJS step definitions from a string of code.
 * Uses an AST parser (acorn) to avoid code execution.
 */
export declare class OnboardJSParser {
    /**
     * Parses a string containing JS/TS code to extract an array of OnboardingSteps.
     * This method is safe and does not execute any of the input code.
     *
     * @param code The string content of the file.
     * @returns An array of OnboardingStep objects.
     * @throws A ParsingError if the steps array is not found or is malformed.
     */
    static parseSteps<TContext extends OnboardingContext = OnboardingContext>(code: string): OnboardingStep<TContext>[]
    /**
     * Parses a single AST ObjectExpression node into an OnboardingStep.
     */
    private static _parseStepObject
    /**
     * Parses a property that can be a function, a string literal, or null.
     */
    private static _parseStepLink
}
//# sourceMappingURL=onboardjs-parser.d.ts.map
