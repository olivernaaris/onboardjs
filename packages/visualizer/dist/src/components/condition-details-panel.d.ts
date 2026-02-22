import { EnhancedConditionNode } from '../types/flow-types'
interface ConditionDetailsPanelProps {
    conditionNode: EnhancedConditionNode | null
    onUpdate: (updatedNode: EnhancedConditionNode) => void
    onClose: () => void
    readonly?: boolean
}
export declare function ConditionDetailsPanel({
    conditionNode,
    onUpdate,
    onClose,
    readonly,
}: ConditionDetailsPanelProps): import('react/jsx-runtime').JSX.Element | null
export {}
//# sourceMappingURL=condition-details-panel.d.ts.map
