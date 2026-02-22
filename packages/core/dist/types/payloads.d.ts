import { OnboardingContext } from './common'
export interface BasePayload {
    [key: string]: any
}
export type InformationStepPayload = BasePayload
export interface FormFieldOption {
    label: string
    value: string | number
}
export interface FormFieldValidation {
    required?: boolean | string
    minLength?: {
        value: number
        message: string
    }
    maxLength?: {
        value: number
        message: string
    }
    pattern?: {
        value: RegExp
        message: string
    }
    custom?: (value: any, allFormData: Record<string, any>) => string | null | Promise<string | null>
}
export interface FormField {
    id: string
    name: string
    label: string
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio_group'
    placeholder?: string
    defaultValue?: any
    options?: FormFieldOption[]
    validation?: FormFieldValidation
    helperText?: string
}
export interface ChoiceOption<TValue = string | number> {
    id: string
    label: string
    value: TValue
    description?: string
    icon?: string
}
export interface MultipleChoiceStepPayload extends BasePayload {
    options: ChoiceOption[]
    minSelections?: number
    maxSelections?: number
}
export interface SingleChoiceStepPayload extends BasePayload {
    options: ChoiceOption[]
}
/** Defines the structure of an item in a checklist step's payload. */
export interface ChecklistItemDefinition<TContext extends OnboardingContext = OnboardingContext> {
    id: string
    label: string
    description?: string
    isMandatory?: boolean
    /** Optional condition to determine if this item should be shown/considered. */
    condition?: (context: TContext) => boolean
    meta?: Record<string, unknown>
}
/** Payload for a checklist step. */
export interface ChecklistStepPayload<TContext extends OnboardingContext = OnboardingContext> extends BasePayload {
    /** An array of item definitions for the checklist. */
    items: ChecklistItemDefinition<TContext>[]
    /**
     * The key under which the state of checklist items (e.g., Array<{id: string, isCompleted: boolean}>)
     * will be stored in the step's data within `flowData`.
     */
    dataKey: string
    /**
     * Optional: Minimum number of items that must be completed for the step to be considered complete.
     * If not provided, all mandatory items must be completed.
     */
    minItemsToComplete?: number
}
export interface ChecklistItemState {
    id: string
    isCompleted: boolean
}
export type ConfirmationStepPayload = BasePayload
export interface CustomComponentStepPayload extends BasePayload {
    componentKey?: string
}
