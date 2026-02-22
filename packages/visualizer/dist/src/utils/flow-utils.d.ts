import { Node, Edge } from '@xyflow/react'
/**
 * Layout nodes using dagre algorithm
 * @param nodes Array of nodes to layout
 * @param edges Array of edges to consider for layout
 * @param direction Layout direction (TB = top-bottom, LR = left-right)
 * @returns Object containing layouted nodes and unchanged edges
 */
export declare function layoutNodes<TNode extends Node, TEdge extends Edge>(
    nodes: TNode[],
    edges: TEdge[],
    direction?: 'TB' | 'LR'
): {
    nodes: TNode[]
    edges: TEdge[]
}
//# sourceMappingURL=flow-utils.d.ts.map
