import { OnboardingStep, OnboardingContext } from '../types'
/**
 * Evaluates a step ID that can be a string, number or a function.
 */
export declare function evaluateStepId<TContext extends OnboardingContext = OnboardingContext>(
    stepIdOrFn: string | number | ((context: TContext) => string | number | null | undefined) | null | undefined,
    context: TContext
): string | number | null | undefined
/**
 * Finds a step by its ID in an array of steps.
 */
export declare function findStepById<TContext extends OnboardingContext = OnboardingContext>(
    steps: OnboardingStep<TContext>[], // Use generic OnboardingStep
    stepId: string | null | undefined | number
): OnboardingStep<TContext> | undefined
/**
 * Gets the index of a step by its ID in an array of steps.
 *
 * @param steps - Array of onboarding steps
 * @param stepId - The ID of the step to find
 * @returns The 0-based index of the step, or -1 if not found
 *
 * @example
 * const steps = [{ id: 'welcome' }, { id: 'profile' }, { id: 'complete' }]
 * getStepIndex(steps, 'profile') // returns 1
 * getStepIndex(steps, 'unknown') // returns -1
 */
export declare function getStepIndex<TContext extends OnboardingContext = OnboardingContext>(
    steps: OnboardingStep<TContext>[],
    stepId: string | number | null | undefined
): number
