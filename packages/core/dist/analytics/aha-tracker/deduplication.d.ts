import { AhaTrackerConfig } from './types'
/**
 * Handles deduplication logic for aha events
 */
export declare class DeduplicationManager {
    private _config
    private _userAhaCount
    private _lastAhaTime
    constructor(config: Required<AhaTrackerConfig>)
    /**
     * Check if an aha event should be tracked for a user
     */
    shouldTrack(userId: string): boolean
    /**
     * Update user state after tracking an aha event
     */
    updateUserState(userId: string): void
    /**
     * Get user aha count
     */
    getUserCount(userId: string): number
    /**
     * Get last aha time for user
     */
    getLastAhaTime(userId: string): number | null
    /**
     * Clear user data
     */
    clearUserData(userId: string): void
    /**
     * Get internal maps for event builder access
     */
    getUserAhaCountMap(): Map<string, number>
}
