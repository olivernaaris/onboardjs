import { BaseParseStrategy } from './parser-strategy'
import { ParseInput, ConditionGroup } from '../types'
export declare class StringParseStrategy extends BaseParseStrategy {
    private _conditionVisitor
    canParse(input: ParseInput): boolean
    parse(input: ParseInput): ConditionGroup[]
    protected generateId(): string
    private _convertToGroups
}
//# sourceMappingURL=string-parser.d.ts.map
