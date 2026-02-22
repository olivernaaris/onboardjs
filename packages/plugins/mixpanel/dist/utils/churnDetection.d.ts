import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
import { ChurnRiskFactors } from '../types'
export declare class ChurnDetectionManager<TContext extends OnboardingContext> {
    private churnTimeoutMs
    private churnRiskThreshold
    private stepStartTimes
    private churnTimeouts
    private userActivity
    constructor(
        churnTimeoutMs?: number, // 5 minutes
        churnRiskThreshold?: number
    )
    startStepTimer(stepId: string | number): void
    setupChurnTimeout(
        step: OnboardingStep<TContext>,
        context: TContext,
        onChurnDetected: (step: OnboardingStep<TContext>, context: TContext, riskFactors: ChurnRiskFactors) => void
    ): void
    clearChurnTimeout(stepId: string): void
    recordBackNavigation(userId: string): void
    recordError(userId: string): void
    recordValidationFailure(userId: string): void
    calculateChurnRisk(step: OnboardingStep<TContext>, context: TContext): number
    /**
     * Checks if a step is considered high churn risk.
     * @param step The onboarding step to evaluate.
     * @param context The onboarding context.
     * @returns True if the step is high churn risk, false otherwise.
     */
    isHighChurnRisk(step: OnboardingStep<TContext>, context: TContext): boolean
    getChurnRiskThreshold(): number
    setChurnRiskThreshold(threshold: number): void
    private calculateChurnRiskFactors
    private getUserActivity
    cleanup(): void
}
