import { BaseParseStrategy } from './parser-strategy'
import { ParseInput, ConditionGroup } from '../types'
export declare class FunctionParseStrategy extends BaseParseStrategy {
    private _functionExtractor
    private _conditionVisitor
    canParse(input: ParseInput): boolean
    parse(input: ParseInput): ConditionGroup[]
    protected generateId(): string
    private _convertToGroups
}
//# sourceMappingURL=function-parser.d.ts.map
