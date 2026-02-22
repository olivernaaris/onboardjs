import { Logger } from './Logger'
import { OnboardingContext, OnboardingStep } from '../types'
/**
 * StepTransitionService handles direction-aware navigation logic.
 * Calculates next/previous steps based on context, conditions, and history.
 * Does NOT handle event emission or beforeStepChange hooks.
 *
 * Extracted from NavigationService as part of decomposition.
 */
export declare class StepTransitionService<TContext extends OnboardingContext = OnboardingContext> {
    private readonly _steps
    private readonly _logger
    constructor(_steps: OnboardingStep<TContext>[], logger?: Logger)
    /**
     * Find the next step candidate based on context.
     * Priority: explicit nextStep → array order
     */
    findNextStepCandidate(
        currentStep: OnboardingStep<TContext>,
        context: TContext
    ): OnboardingStep<TContext> | undefined | null
    /**
     * Find the previous step candidate based on context and history.
     * Priority: explicit previousStep → history → array order
     */
    findPreviousStepCandidate(
        currentStep: OnboardingStep<TContext>,
        context: TContext,
        history: string[]
    ): OnboardingStep<TContext> | undefined
    /**
     * Calculate the skip target step.
     * Priority: skipToStep → nextStep → next in array
     */
    calculateSkipTarget(currentStep: OnboardingStep<TContext>, context: TContext): string | number | null
    /**
     * Skip conditional steps that don't meet the current context.
     * Recursively advances through steps while their conditions fail.
     */
    skipConditionalSteps(
        candidateStep: OnboardingStep<TContext> | undefined | null,
        context: TContext,
        direction?: 'next' | 'previous'
    ): OnboardingStep<TContext> | undefined | null
}
