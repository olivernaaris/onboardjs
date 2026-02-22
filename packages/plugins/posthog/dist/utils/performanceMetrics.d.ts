import { PerformanceMetrics } from '../types'
export declare class PerformanceTracker {
    private renderStartTimes
    private persistenceStartTimes
    startRenderTimer(stepId: string): void
    endRenderTimer(stepId: string): number | undefined
    startPersistenceTimer(operationId: string): void
    endPersistenceTimer(operationId: string): number | undefined
    getMemoryUsage(): number | undefined
    getCurrentMetrics(): PerformanceMetrics
    private getNavigationTime
    cleanup(): void
}
