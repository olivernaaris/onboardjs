import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
import { FlowState, EnhancedStepNode, EndNode, EnhancedConditionNode } from '../types/flow-types'
import { ConditionalFlowEdge } from '../edges/conditional-edge'
export declare function useFlowState<TContext extends OnboardingContext = OnboardingContext>(
    initialSteps: OnboardingStep<TContext>[],
    onStepsChange?: (steps: OnboardingStep<TContext>[]) => void
): {
    flowState: FlowState
    steps: OnboardingStep<TContext>[]
    stepsById: Map<string | number, OnboardingStep<TContext>>
    nodes: (EnhancedStepNode | EndNode | EnhancedConditionNode)[]
    edges: ConditionalFlowEdge[]
    onNodesChange: (changes: any[]) => void
    onEdgesChange: (changes: any[]) => void
    updateFlowState: (newFlowState: FlowState) => void
    updateStepsFromFlow: (
        newNodes?: (EnhancedStepNode | EndNode | EnhancedConditionNode)[],
        newEdges?: ConditionalFlowEdge[]
    ) => {
        updatedSteps: OnboardingStep<TContext>[]
        updatedNodes: (EnhancedStepNode | EndNode | EnhancedConditionNode)[]
        updatedEdges: ConditionalFlowEdge[]
    }
    updateFlowFromSteps: (newSteps: OnboardingStep<TContext>[]) => void
    setNodes: import('react').Dispatch<
        import('react').SetStateAction<(EnhancedStepNode | EndNode | EnhancedConditionNode)[]>
    >
    setEdges: import('react').Dispatch<import('react').SetStateAction<ConditionalFlowEdge[]>>
}
//# sourceMappingURL=use-flow-state.d.ts.map
