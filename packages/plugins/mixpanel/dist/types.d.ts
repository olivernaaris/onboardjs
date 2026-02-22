import { PluginConfig } from '@onboardjs/core'
type Mixpanel = any
export interface MixpanelPluginConfig extends PluginConfig {
    token?: string
    config?: Partial<MixpanelConfig>
    mixpanelInstance?: Mixpanel
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
export interface MixpanelConfig {
    api_host?: string
    cross_subdomain_cookie?: boolean
    persistence?: string
    persistence_name?: string
    cookie_name?: string
    loaded?: (mixpanel: Mixpanel) => void
    store_google?: boolean
    save_referrer?: boolean
    test?: boolean
    verbose?: boolean
    img?: boolean
    debug?: boolean
    track_links_timeout?: number
    cookie_expiration?: number
    upgrade?: boolean
    disable_persistence?: boolean
    disable_cookie?: boolean
    secure_cookie?: boolean
    ip?: boolean
    property_blacklist?: string[]
    xhr_headers?: Record<string, string>
    ignore_dnt?: boolean
    batch_requests?: boolean
    batch_size?: number
    batch_flush_interval_ms?: number
    batch_request_timeout_ms?: number
    hooks?: {
        before_send_events?: (data: any) => any
    }
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
export {}
