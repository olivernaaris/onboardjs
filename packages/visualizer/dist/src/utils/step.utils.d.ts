import { OnboardingStep } from '@onboardjs/core'
export declare const getStepLabel: (step: OnboardingStep<any>) => string
type IdPrefix = 'step' | 'condition' | 'group' | 'rule'
export declare const generateId: (pre: IdPrefix) => string
export declare const getStepDescription: (step: OnboardingStep<any>) => string | undefined
export declare const getDefaultPayload: (stepType: string) => Record<string, any>
export {}
//# sourceMappingURL=step.utils.d.ts.map
