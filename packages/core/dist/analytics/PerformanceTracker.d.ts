import { Logger } from '../services/Logger'
import { AnalyticsConfig } from './types'
/**
 * PerformanceTracker tracks render times, navigation times, and slowness detection.
 * Enforces memory limits with LRU eviction to prevent unbounded map growth.
 */
export declare class PerformanceTracker {
    private static readonly _MAX_ENTRIES
    private _stepRenderTimes
    private _navigationTimes
    private _renderTimeEntryOrder
    private _navigationEntryOrder
    private _config
    private _logger
    private _thresholds
    constructor(config?: AnalyticsConfig, logger?: Logger)
    recordStepRenderTime(stepId: string | number, renderTime: number): void
    recordNavigationTime(direction: string, duration: number): void
    getStepRenderTime(stepId: string | number): number | undefined
    getNavigationTimes(): ReadonlyMap<string, number>
    getRenderTimeHistory(): number[]
    isSlowRender(renderTime: number): boolean
    isSlowStep(duration: number): boolean
    clear(): void
    getMemoryUsage(): number | undefined
    getConnectionType(): string | undefined
}
