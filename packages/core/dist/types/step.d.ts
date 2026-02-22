import { BaseOnboardingStep, OnboardingContext } from './common'
import {
    MultipleChoiceStepPayload,
    SingleChoiceStepPayload,
    ConfirmationStepPayload,
    CustomComponentStepPayload,
    ChecklistStepPayload, // This will now be ChecklistStepPayload<TContext>
    InformationStepPayload,
} from './payloads'
export type OnboardingStepType =
    | 'INFORMATION'
    | 'MULTIPLE_CHOICE'
    | 'SINGLE_CHOICE'
    | 'CONFIRMATION'
    | 'CUSTOM_COMPONENT'
    | 'CHECKLIST'
export type OnboardingStep<TContext extends OnboardingContext = OnboardingContext> =
    | (BaseOnboardingStep<'INFORMATION', CustomComponentStepPayload, TContext> & {
          type?: never
          payload?: CustomComponentStepPayload
      })
    | (BaseOnboardingStep<'INFORMATION', InformationStepPayload, TContext> & {
          type: 'INFORMATION'
          payload?: InformationStepPayload
      })
    | (BaseOnboardingStep<'MULTIPLE_CHOICE', MultipleChoiceStepPayload, TContext> & {
          type: 'MULTIPLE_CHOICE'
          payload: MultipleChoiceStepPayload
      })
    | (BaseOnboardingStep<'SINGLE_CHOICE', SingleChoiceStepPayload, TContext> & {
          type: 'SINGLE_CHOICE'
          payload: SingleChoiceStepPayload
      })
    | (BaseOnboardingStep<'CONFIRMATION', ConfirmationStepPayload, TContext> & {
          type: 'CONFIRMATION'
          payload?: ConfirmationStepPayload
      })
    | (BaseOnboardingStep<
          'CHECKLIST',
          ChecklistStepPayload<TContext>, // Use generic ChecklistStepPayload
          TContext
      > & {
          type: 'CHECKLIST'
          payload: ChecklistStepPayload<TContext>
      })
    | (BaseOnboardingStep<'CUSTOM_COMPONENT', CustomComponentStepPayload, TContext> & {
          type: 'CUSTOM_COMPONENT'
          payload?: CustomComponentStepPayload
      })
