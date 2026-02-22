import React from 'react'
import { RenderOptions, RenderResult } from '@testing-library/react'
import { OnboardingStep, OnboardingEngineConfig } from '@onboardjs/core'
import { StepComponentRegistry, StepComponentProps } from './types'
export declare const createMockStepComponent: (name: string) => {
    ({ onDataChange }: StepComponentProps): import('react/jsx-runtime').JSX.Element
    displayName: string
}
export declare const mockStepComponents: StepComponentRegistry
export declare const mockSteps: OnboardingStep[]
export declare const mockStepsWithoutCriteria: OnboardingStep[]
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    onboardingConfig?: Partial<
        OnboardingEngineConfig & {
            componentRegistry: StepComponentRegistry
        }
    >
    localStoragePersistence?: any
}
export declare function renderWithOnboardingProvider(
    ui: React.ReactElement,
    options?: CustomRenderOptions
): RenderResult
export declare function renderWithTestUtils(ui: React.ReactElement, options?: RenderOptions): RenderResult
export {}
