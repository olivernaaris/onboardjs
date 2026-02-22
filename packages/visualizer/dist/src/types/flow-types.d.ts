import { Node } from '@xyflow/react'
import { OnboardingStepType } from '@onboardjs/core'
import type { ConditionalFlowEdge } from '../edges/conditional-edge'
import { ConditionGroup } from '../parser/condition-parser/types'
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
export interface StepNodeData extends Record<string, unknown> {
    stepId: string | number
    stepType: OnboardingStepType
    label: string
    description?: string
    isSkippable?: boolean
    hasCondition?: boolean
    isCompleted?: boolean
    errors?: string[]
}
export interface ConditionNodeData extends Record<string, unknown> {
    conditionId: string | number
    expression?: string
    description?: string
    errors?: string[]
    condition?: ConditionGroup[]
    metadata?: Record<string, any>
}
export interface EndNodeData extends Record<string, unknown> {
    label: string
    description?: string
}
export type StepNode = Node<StepNodeData, 'stepNode'>
export type ConditionNode = Node<ConditionNodeData, 'conditionNode'>
export type EndNode = Node<EndNodeData, 'endNode'>
export interface ExportOptions {
    format: 'typescript' | 'javascript'
    includeTypes: boolean
    includeComments: boolean
    variableName: string
}
export interface StepJSONParserOptions {
    prettyPrint?: boolean
    functionHandling?: 'serialize' | 'omit' | 'error'
    includeMeta?: boolean
    validateSteps?: boolean
}
export interface TypeScriptExportOptions {
    includeImports?: boolean
    includeTypes?: boolean
    useConstAssertion?: boolean
    variableName?: string
    includeComments?: boolean
    inlineFunctions?: boolean
    indentation?: 'spaces' | 'tabs'
    spacesCount?: number
    includeValidation?: boolean
}
export type ConvertOptions = {
    existingNodes: (StepNode | EndNode | ConditionNode)[]
    autoConnectUndefined?: boolean
}
export type ExportFormat = 'json' | 'typescript' | 'javascript'
export interface EdgeVisibility {
    next: boolean
    conditional: boolean
    skip: boolean
    previous: boolean
    then: boolean
    else: boolean
}
//# sourceMappingURL=flow-types.d.ts.map
