import React from 'react'
import { EngineState, OnboardingContext as OnboardingContextType } from '@onboardjs/core'
import { StepComponentRegistry } from '../../types'
export interface UseStepRendererConfig<TContext extends OnboardingContextType> {
    engineState: EngineState<TContext> | null
    componentRegistry?: StepComponentRegistry<TContext>
    onDataChange: (data: unknown, isValid: boolean) => void
}
/**
 * Handles component registry resolution and step rendering.
 * Single responsibility: UI rendering logic with strict type-safe resolution.
 */
export declare function useStepRenderer<TContext extends OnboardingContextType>(
    config: UseStepRendererConfig<TContext>
): () => React.ReactNode
