import { ConditionRule } from '../types'
import { FieldExtractor, LiteralExtractor } from '../extractors'
export declare class BinaryExpressionParser {
    private _fieldExtractor
    private _literalExtractor
    constructor(_fieldExtractor: FieldExtractor, _literalExtractor: LiteralExtractor)
    parse(node: any): ConditionRule
    private _isReversedPattern
    private _reverseOperator
}
//# sourceMappingURL=binary-expression-parser.d.ts.map
