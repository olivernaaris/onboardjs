import { Connection } from '@xyflow/react'
import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
import { FlowState, EnhancedStepNode, EnhancedConditionNode } from '../types/flow-types'
import { ConditionalFlowEdge } from '../edges/conditional-edge'
export declare function useFlowOperations<TContext extends OnboardingContext = OnboardingContext>(
    flowState: FlowState,
    updateFlowState: (newFlowState: FlowState) => void,
    updateStepsFromFlow: (newNodes?: any[], newEdges?: ConditionalFlowEdge[]) => any,
    readonly?: boolean
): {
    onConnect: (params: Connection) => void
    isValidConnection: (connection: ConditionalFlowEdge | Connection) => boolean
    addStep: (stepType?: OnboardingStep<TContext>['type']) => void
    updateNode: (updatedNode: EnhancedStepNode) => void
    deleteStep: (stepId: string | number) => void
    updateConditionNode: (updatedNode: EnhancedConditionNode) => void
}
//# sourceMappingURL=use-flow-operations.d.ts.map
