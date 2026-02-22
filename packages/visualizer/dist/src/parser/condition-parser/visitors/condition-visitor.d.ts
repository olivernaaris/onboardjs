import type { Node } from 'acorn'
import { BaseASTVisitor } from './ast-visitor'
import { ConditionRule, ConditionGroup } from '../types'
export declare class ConditionVisitor extends BaseASTVisitor {
    private _fieldExtractor
    private _literalExtractor
    private _binaryParser
    visit(node: Node): ConditionRule | ConditionGroup
    visitBinaryExpression(node: any): ConditionRule
    visitLogicalExpression(node: any): ConditionGroup
    visitMemberExpression(node: any): ConditionRule
    visitConditionalExpression(node: any): ConditionRule | ConditionGroup
    visitIfStatement(node: any): ConditionRule | ConditionGroup
    visitIdentifier(node: any): ConditionRule
    visitLiteral(node: any): ConditionRule
    protected generateId(): string
    private _flattenLogicalTree
}
//# sourceMappingURL=condition-visitor.d.ts.map
