import { AnalyticsManager } from '../analytics-manager'
import { AnalyticsProvider } from '../types'
import { AhaTrackerConfig, TrackAhaParams, AhaEvent, AhaUserStats, EngineContext } from './types'
/**
 * Singleton class for tracking aha moments across the application
 */
export declare class AhaTracker {
    private static _instance
    private _logger
    private _config
    private _deduplicationManager
    private _eventBuilder
    private _analyticsManager
    private _customProviders
    private _sessionId
    private _sessionStartTime
    private _engineContext
    private constructor()
    /**
     * Get the singleton instance of AhaTracker
     */
    static getInstance(config?: AhaTrackerConfig): AhaTracker
    /**
     * Reset the singleton instance (useful for testing)
     */
    static resetInstance(): void
    /**
     * Initialize the tracker with an analytics manager
     */
    initialize(analyticsManager: AnalyticsManager): void
    /**
     * Add a custom analytics provider
     */
    addProvider(provider: AnalyticsProvider): void
    /**
     * Link to OnboardingEngine for automatic user/flow detection (client-side only)
     *
     * @example
     * ```typescript
     * // In OnboardingProvider setup
     * const tracker = AhaTracker.getInstance()
     * tracker.linkToEngine({
     *   getUserId: () => engine.getContext().userId,
     *   getFlowData: () => ({
     *     flow_id: engine.config.flowId,
     *     current_step_id: engine.getState().currentStep?.id,
     *     // ...
     *   })
     * })
     * ```
     */
    linkToEngine(context: EngineContext): void
    /**
     * Update tracker configuration
     */
    updateConfig(config: Partial<AhaTrackerConfig>): void
    /**
     * Track an aha moment
     *
     * @param params - Aha tracking parameters
     * @returns The tracked aha event or null if tracking was blocked
     *
     * @example
     * ```typescript
     * // Server-side (must provide user_id)
     * await aha({
     *   aha_type: 'value_demonstration',
     *   user_id: 'user_123', // REQUIRED on server
     *   context: { feature_name: 'video_download' }
     * })
     *
     * // Client-side (user_id auto-detected from linked engine)
     * await aha({
     *   aha_type: 'feature_activation',
     *   context: { feature_name: 'image_upload' }
     * })
     * ```
     */
    track(params: TrackAhaParams): Promise<AhaEvent | null>
    /**
     * Get aha statistics for a user
     */
    getUserAhaStats(userId: string): AhaUserStats
    /**
     * Clear aha tracking data for a user (e.g., on logout)
     */
    clearUserData(userId: string): void
    /**
     * Resolve user_id from params or linked engine context
     * Priority: params.user_id > engineContext.getUserId() > undefined
     */
    private _resolveUserId
    /**
     * Initialize session tracking (client-side only)
     */
    private _initializeSession
    /**
     * Detect if running in client-side environment
     */
    private _isClientSide
    /**
     * Build configuration with defaults
     */
    private _buildConfig
}
