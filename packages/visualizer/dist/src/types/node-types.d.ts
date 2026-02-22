import { Node } from '@xyflow/react'
import { OnboardingStepType } from '@onboardjs/core'
import { ConditionGroup } from '../parser/condition-parser/types'
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
export type StepNodeType = Node<StepNodeData, 'stepNode'>
export interface EndNodeData extends Record<string, unknown> {
    label: string
    description?: string
}
export type EndNodeType = Node<EndNodeData, 'endNode'>
export interface ConditionNodeData extends Record<string, unknown> {
    conditionId: string | number
    condition?: ConditionGroup[]
    description?: string
    errors?: string[]
}
export type ConditionNodeType = Node<ConditionNodeData, 'conditionNode'>
export declare const STEP_TYPE_ICONS: {
    readonly INFORMATION: 'InfoIcon'
    readonly SINGLE_CHOICE: 'CheckCircleIcon'
    readonly MULTIPLE_CHOICE: 'ListChecksIcon'
    readonly CHECKLIST: 'ListIcon'
    readonly CONFIRMATION: 'HandIcon'
    readonly CUSTOM_COMPONENT: 'PuzzleIcon'
}
export declare const STEP_TYPE_COLORS: {
    readonly INFORMATION: 'vis:border-blue-500 vis:bg-blue-50'
    readonly SINGLE_CHOICE: 'vis:border-green-500 vis:bg-green-50'
    readonly MULTIPLE_CHOICE: 'vis:border-purple-500 vis:bg-purple-50'
    readonly CHECKLIST: 'vis:border-amber-500 vis:bg-amber-50'
    readonly CONFIRMATION: 'vis:border-orange-500 vis:bg-orange-50'
    readonly CUSTOM_COMPONENT: 'vis:border-gray-500 vis:bg-gray-50'
}
export declare function getStepTypeColor(type: OnboardingStepType): string
//# sourceMappingURL=node-types.d.ts.map
