import { ParseInput, ConditionGroup, ParseResult, ConditionToCodeOptions } from './types'
export declare class ConditionParser {
    private _validator
    private _strategies
    private _codeGenerator
    private _extractor
    parseConditions(input: ParseInput): ParseResult
    generateCode(conditions: ConditionGroup[], options?: ConditionToCodeOptions): string
    clearCache(): void
    private _getEmptyResult
}
//# sourceMappingURL=condition-parser.d.ts.map
