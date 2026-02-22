import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
import { FlowState } from '../types/flow-types'
/**
 * Convert FlowState to OnboardingStep[] for export
 */
export declare function exportFlowAsSteps<TContext extends OnboardingContext = OnboardingContext>(
    flowState: FlowState
): OnboardingStep<TContext>[]
//# sourceMappingURL=flow-to-steps.d.ts.map
