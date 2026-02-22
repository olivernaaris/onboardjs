export type ConditionRule = {
    id: string
    field: string
    operator:
        | 'equals'
        | 'not_equals'
        | 'contains'
        | 'not_contains'
        | 'greater_than'
        | 'less_than'
        | 'exists'
        | 'not_exists'
    value: string | number | boolean
    valueType: 'string' | 'number' | 'boolean'
}
export interface ConditionGroup {
    id: string
    logic: 'AND' | 'OR'
    rules: ConditionRule[]
}
export type ConditionToCodeOptions = {
    wrapInFunction?: boolean
}
export type ParseInput = string | ((context: any) => any) | number
export interface ParseResult {
    conditions: ConditionGroup[]
    thenTarget?: string | null | undefined
    elseTarget?: string | null | undefined
}
export declare const FIELD_ACCESS_PREFIX = 'context.flowData?.'
export declare const LOGIC_OPERATOR_MAP: {
    readonly AND: '&&'
    readonly OR: '||'
}
export declare const JS_OP_TO_RULE_OP: Record<string, ConditionRule['operator']>
export declare const SAFE_MATH_OPERATORS: readonly ['+', '-', '*', '/']
export declare const CONDITION_TYPES: readonly [
    'BinaryExpression',
    'LogicalExpression',
    'CallExpression',
    'UnaryExpression',
    'ConditionalExpression',
    'MemberExpression',
    'ChainExpression',
    'Identifier',
]
export declare const SPECIAL_IDENTIFIERS: readonly ['true', 'false', 'null', 'undefined']
//# sourceMappingURL=types.d.ts.map
