import { AhaEvent, TrackAhaParams, OnboardingFlowData, AhaTrackerConfig } from './types'
/**
 * Builds aha event payloads with proper context enrichment
 */
export declare class AhaEventBuilder {
    private _config
    private _sessionStartTime
    private _userAhaCount
    constructor(config: Required<AhaTrackerConfig>, userAhaCount: Map<string, number>)
    /**
     * Build a complete aha event from parameters
     */
    buildEvent(params: TrackAhaParams, flowData?: OnboardingFlowData): AhaEvent
    /**
     * Build metrics with auto-calculation
     */
    private _buildMetrics
    /**
     * Build context with auto-detection and enrichment
     */
    private _buildContext
    /**
     * Check if this is the user's first aha moment
     */
    private _isFirstAha
}
