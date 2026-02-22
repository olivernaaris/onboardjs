import type { Expression } from 'acorn'
export declare class FunctionExtractor {
    extract(fn: Function): Expression | null
    private _parseFunction
    private _extractFromTopLevel
    private _extractFromArrowFunction
    private _extractFromBlock
    private _extractRoutingConditions
    private _hasReturnInBlock
    private _hasReturnInAlternate
    private _combineConditionsWithOr
    private _fallbackExtraction
    private _isConditionExpression
    private _isComplexCondition
    private _stringFallback
}
//# sourceMappingURL=function-extractor.d.ts.map
