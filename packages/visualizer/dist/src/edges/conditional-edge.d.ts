import { Edge, EdgeProps } from '@xyflow/react'
export type ConditionalFlowEdge = Edge<
    {
        label?: string
        condition?: string
        edgeType: 'next' | 'previous' | 'skip' | 'conditional' | 'then' | 'else'
    },
    'conditional'
>
export declare function ConditionalEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    label,
    markerEnd,
}: EdgeProps<ConditionalFlowEdge>): import('react/jsx-runtime').JSX.Element
//# sourceMappingURL=conditional-edge.d.ts.map
