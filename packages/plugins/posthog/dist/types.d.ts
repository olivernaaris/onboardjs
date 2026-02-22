import { PluginConfig } from '@onboardjs/core'
/**
 * Minimal PostHog interface to avoid version incompatibilities.
 * This interface only includes the methods actually used by the plugin,
 * allowing it to work with any reasonably recent PostHog version.
 */
export interface PostHogInstance {
    capture: (event: string, properties?: Record<string, any>) => void
    getFeatureFlag: (flag: string) => string | boolean | null | undefined
}
export interface PostHogPluginConfig extends PluginConfig {
    apiKey?: string
    host?: string
    posthogInstance?: PostHogInstance
    eventPrefix?: string
    customEventNames?: Partial<EventNameMapping>
    includeUserProperties?: boolean
    includeFlowData?: boolean
    includeFlowInfo?: boolean
    includeStepMetadata?: boolean
    includePerformanceMetrics?: boolean
    includeSessionData?: boolean
    excludeEvents?: (keyof EventNameMapping)[]
    includeOnlyEvents?: (keyof EventNameMapping)[]
    stepTypeFilters?: string[]
    sanitizeData?: (data: Record<string, any>) => Record<string, any>
    excludePersonalData?: boolean
    excludeFlowDataKeys?: string[]
    enableChurnDetection?: boolean
    churnTimeoutMs?: number
    churnRiskThreshold?: number
    enableProgressMilestones?: boolean
    milestonePercentages?: number[]
    enableExperimentTracking?: boolean
    experimentFlags?: string[]
    enablePerformanceTracking?: boolean
    performanceThresholds?: {
        slowStepMs?: number
        slowRenderMs?: number
    }
    globalProperties?: Record<string, any>
    stepPropertyEnrichers?: Record<string, StepPropertyEnricher>
    userPropertyMapper?: (user: any) => Record<string, any>
    debug?: boolean
    enableConsoleLogging?: boolean
}
export interface EventNameMapping {
    flowStarted: string
    flowCompleted: string
    flowAbandoned: string
    flowPaused: string
    flowResumed: string
    flowReset: string
    stepActive: string
    stepCompleted: string
    stepSkipped: string
    stepAbandoned: string
    stepRetried: string
    stepValidationFailed: string
    stepHelpRequested: string
    navigationBack: string
    navigationForward: string
    navigationJump: string
    userIdle: string
    userReturned: string
    dataChanged: string
    progressMilestone: string
    highChurnRisk: string
    stepRenderSlow: string
    persistenceSuccess: string
    persistenceFailure: string
    checklistItemToggled: string
    checklistProgress: string
    experimentExposed: string
    errorEncountered: string
    pluginError: string
}
export type StepPropertyEnricher = (step: any, context: any) => Record<string, any>
export interface ChurnRiskFactors {
    timeOnStep: number
    backNavigationCount: number
    errorCount: number
    idleTime: number
    validationFailures: number
}
export interface PerformanceMetrics {
    stepRenderTime?: number
    persistenceTime?: number
    memoryUsage?: number
    navigationTime?: number
}
