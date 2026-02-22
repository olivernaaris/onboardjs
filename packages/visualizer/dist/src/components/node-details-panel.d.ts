import type { EnhancedStepNode } from '../types'
interface StepDetailsPanelProps {
    node: EnhancedStepNode
    onNodeUpdate: (node: EnhancedStepNode) => void
    onClose: () => void
    readonly?: boolean
}
export declare function StepDetailsPanel({
    node,
    onNodeUpdate,
    onClose,
    readonly,
}: StepDetailsPanelProps): import('react/jsx-runtime').JSX.Element
export {}
//# sourceMappingURL=node-details-panel.d.ts.map
