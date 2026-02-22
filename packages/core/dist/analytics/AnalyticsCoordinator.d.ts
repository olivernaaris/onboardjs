import { Logger } from '../services/Logger'
import { AnalyticsConfig, AnalyticsProvider } from './types'
import { SessionTracker } from './SessionTracker'
/**
 * AnalyticsCoordinator delegates analytics tracking responsibilities to specialized trackers.
 * It coordinates SessionTracker, PerformanceTracker, ActivityTracker, and ProgressMilestoneTracker.
 */
export declare class AnalyticsCoordinator {
    private _providers
    private _config
    private _logger
    private _sessionTracker
    private _performanceTracker
    private _activityTracker
    private _progressMilestoneTracker
    constructor(config?: AnalyticsConfig, logger?: Logger)
    registerProvider(provider: AnalyticsProvider): void
    get providerCount(): number
    getSessionId(): string
    setUserId(userId: string): void
    setFlowId(flowId: string): void
    setFlowInfo(flowInfo: {
        flowId?: string
        flowName?: string
        flowVersion?: string
        flowMetadata?: Record<string, unknown>
        instanceId?: number
    }): void
    getFlowInfo(): Readonly<ReturnType<SessionTracker['getFlowInfo']>>
    recordStepRenderTime(stepId: string | number, renderTime: number): void
    recordNavigationTime(direction: string, duration: number): void
    getPerformanceMetrics(): {
        stepRenderTimes: number[]
        navigationTimes: ReadonlyMap<string, number>
        memoryUsage: number | undefined
        connectionType: string | undefined
    }
    recordActivity(): void
    recordIdleStart(duration: number): void
    recordIdleEnd(awayDuration: number): void
    isUserIdle(): boolean
    getAwayDuration(): number
    calculateFlowProgress(completedSteps: number, totalSteps: number): number
    checkForNewMilestones(progress: number): number[]
    trackEvent(eventType: string, properties?: Record<string, any>): void
    flush(): Promise<void>
    private _enrichEventWithSessionData
    private _enrichEventWithPerformanceData
}
