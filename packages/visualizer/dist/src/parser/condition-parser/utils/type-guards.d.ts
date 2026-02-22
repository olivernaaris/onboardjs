import type { Node, BlockStatement, ReturnStatement, IfStatement, Expression } from 'acorn'
export declare function isFunctionDeclaration(node: Node | undefined): node is {
    type: 'FunctionDeclaration'
    body: BlockStatement
    start: number
    end: number
}
export declare function isFunctionExpression(node: Node | undefined): node is {
    type: 'FunctionExpression'
    body: BlockStatement
    start: number
    end: number
}
export declare function isExpressionStatement(node: Node | undefined): node is {
    type: 'ExpressionStatement'
    expression: Expression
    start: number
    end: number
}
export declare function isBlockStatement(node: Node | undefined): node is BlockStatement
export declare function isReturnStatement(node: Node | undefined): node is ReturnStatement
export declare function isArrowFunctionExpression(node: Node | undefined): node is {
    type: 'ArrowFunctionExpression'
    body: any
    start: number
    end: number
}
export declare function isIfStatement(node: Node | undefined): node is IfStatement
//# sourceMappingURL=type-guards.d.ts.map
