import { OnboardingStep, OnboardingContext, FlowInfo } from '@onboardjs/core'
import { MixpanelPluginConfig, PerformanceMetrics } from '../types'
export declare class EventDataBuilder<TContext extends OnboardingContext> {
    private config
    constructor(config: MixpanelPluginConfig)
    buildEventData(
        eventType: string,
        baseData: Record<string, any>,
        step?: OnboardingStep<TContext>,
        context?: TContext,
        performanceMetrics?: PerformanceMetrics,
        flowInfo?: FlowInfo
    ): Record<string, any>
    private buildUserProperties
    private sanitizeFlowData
    private buildFlowInfo
    private buildStepMetadata
    private buildSessionData
    private hasValidation
    private removePersonalData
    private getSessionId
}
