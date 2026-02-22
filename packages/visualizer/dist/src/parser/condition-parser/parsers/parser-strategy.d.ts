import { ParseInput, ConditionGroup } from '../types'
export interface ParseStrategy {
    canParse(input: ParseInput): boolean
    parse(input: ParseInput): ConditionGroup[]
}
export declare abstract class BaseParseStrategy implements ParseStrategy {
    abstract canParse(input: ParseInput): boolean
    abstract parse(input: ParseInput): ConditionGroup[]
    protected getEmptyResult(): ConditionGroup[]
    protected abstract generateId(): string
}
//# sourceMappingURL=parser-strategy.d.ts.map
