import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
import { FlowState, ConditionNode } from '../types/flow-types'
/**
 * Convert legacy steps to enhanced flow state
 * This is the preferred method for new implementations
 */
export declare function stepsToFlowState<TContext extends OnboardingContext = OnboardingContext>(
    steps: OnboardingStep<TContext>[],
    conditionNodes?: ConditionNode[]
): FlowState
//# sourceMappingURL=steps-to-flow.d.ts.map
