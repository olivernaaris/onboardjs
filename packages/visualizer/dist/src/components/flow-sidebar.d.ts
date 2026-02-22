import { OnboardingStep, OnboardingContext, OnboardingStepType } from '@onboardjs/core'
interface FlowSidebarProps<TContext extends OnboardingContext = OnboardingContext> {
    steps: OnboardingStep<TContext>[]
    onStepSelect: (step: OnboardingStep<TContext>) => void
    onStepAdd: (stepType?: OnboardingStepType) => void
    onStepDelete: (stepId: string | number) => void
    onClose: () => void
    readonly?: boolean
}
export declare function FlowSidebar<TContext extends OnboardingContext = OnboardingContext>({
    steps,
    onStepSelect,
    onStepAdd,
    onStepDelete,
    onClose,
    readonly,
}: FlowSidebarProps<TContext>): import('react/jsx-runtime').JSX.Element
export {}
//# sourceMappingURL=flow-sidebar.d.ts.map
