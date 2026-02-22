import { OnboardingStepType, OnboardingContext, OnboardingStep } from '@onboardjs/core'
import { EndNode, StepNode, ConditionNode } from '../types'
import { ConditionGroup } from '../parser/condition-parser/types'
import { Edge, Node } from '@xyflow/react'
import { ConditionalFlowEdge } from '../edges/conditional-edge'
export interface FlowState {
    nodes: (EnhancedStepNode | EndNode | EnhancedConditionNode)[]
    edges: ConditionalFlowEdge[]
}
export interface EnhancedStepNodeData extends Record<string, unknown> {
    stepId: string | number
    stepType: OnboardingStepType
    label: string
    description?: string
    isSkippable?: boolean
    hasCondition?: boolean
    isCompleted?: boolean
    errors?: string[]
    payload?: any
    condition?: Function | string
    metadata?: Record<string, any>
    nextStep?: string | number | null | Function
    previousStep?: string | number | null | Function
    skipToStep?: string | number | null | Function
}
export interface EnhancedConditionNodeData extends Record<string, unknown> {
    conditionId: string | number
    expression?: string
    description?: string
    errors?: string[]
    condition?: ConditionGroup[]
    metadata?: Record<string, any>
}
export type EnhancedStepNode = Node<EnhancedStepNodeData, 'stepNode'>
export type EnhancedConditionNode = Node<EnhancedConditionNodeData, 'conditionNode'>
export interface FlowData {
    nodes: (StepNode | EndNode | ConditionNode)[]
    edges: ConditionalFlowEdge[]
}
export declare function stepsToFlowState<TContext extends OnboardingContext = OnboardingContext>(
    steps: OnboardingStep<TContext>[],
    conditionNodes?: ConditionNode[]
): FlowState
/**
 * Convert FlowState to OnboardingStep[] for export
 * This is where we handle the complexity of translating visual flows to linear steps
 */
export declare function exportFlowAsSteps<TContext extends OnboardingContext = OnboardingContext>(
    flowState: FlowState
): OnboardingStep<TContext>[]
/**
 * Generate TypeScript/JavaScript code from FlowState
 * This provides more flexibility than the step format
 */
export declare function exportFlowAsCode(
    flowState: FlowState,
    options?: {
        format?: 'typescript' | 'javascript'
        includeTypes?: boolean
        includeComments?: boolean
        variableName?: string
    }
): string
type ConvertOptions = {
    existingNodes: (StepNode | EndNode | ConditionNode)[]
    autoConnectUndefined?: boolean
}
/**
 * @deprecated Use stepsToFlowState for new implementations
 * Legacy function for converting steps to flow data
 */
export declare function convertStepsToFlow<TContext extends OnboardingContext = OnboardingContext>(
    steps: OnboardingStep<TContext>[],
    options?: ConvertOptions
): FlowData
/**
 * @deprecated Use exportFlowAsSteps for new implementations
 * Legacy function for converting flow to steps
 */
export declare function convertFlowToSteps<TContext extends OnboardingContext = OnboardingContext>(
    nodes: (StepNode | EndNode | ConditionNode)[],
    edges: ConditionalFlowEdge[]
): OnboardingStep<TContext>[]
export declare function flowStateToLegacyFormat(flowState: FlowState): {
    stepNodes: StepNode[]
    conditionNodes: ConditionNode[]
    edges: ConditionalFlowEdge[]
}
export declare function layoutNodes<TNode extends Node, TEdge extends Edge>(
    nodes: TNode[],
    edges: TEdge[],
    direction?: 'TB' | 'LR'
): {
    nodes: TNode[]
    edges: TEdge[]
}
export {}
//# sourceMappingURL=flow-converters.d.ts.map
