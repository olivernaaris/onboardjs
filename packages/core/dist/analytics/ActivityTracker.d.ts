import { Logger } from '../services/Logger'
/**
 * ActivityTracker monitors idle detection and user activity state.
 */
export declare class ActivityTracker {
    private _isIdle
    private _lastActivityTime
    private _awayDuration
    private _logger
    private _idleThresholdMs
    constructor(logger?: Logger, idleThresholdMs?: number)
    recordActivity(): void
    recordIdleStart(duration: number): void
    recordIdleEnd(awayDuration: number): void
    isIdle(): boolean
    getLastActivityTime(): number
    getAwayDuration(): number
    getTimeSinceLastActivity(): number
    shouldBeIdle(): boolean
    reset(): void
}
