import { OnboardingStep } from '../types'
export interface ValidationIssue {
    level: 'error' | 'warning'
    message: string
    stepId?: string | number
    relatedStepId?: string
}
/**
 * Enhanced validateFlow using StepValidator for comprehensive validation
 * This maintains backward compatibility while leveraging the new StepValidator
 */
export declare function validateFlowWithStepValidator(steps: OnboardingStep[], maxDepth?: number): ValidationIssue[]
export declare function validateFlow(steps: OnboardingStep[]): ValidationIssue[]
