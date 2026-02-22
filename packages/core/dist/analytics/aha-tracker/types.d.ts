/**
 * Represents the type of aha moment reached by the user
 */
export type AhaType =
    | 'feature_activation'
    | 'workflow_completion'
    | 'value_demonstration'
    | 'engagement_threshold'
    | 'setup_completion'
    | 'collaboration_start'
    | 'custom'
/**
 * Journey stage when the aha moment occurs
 */
export type JourneyStage = 'activation' | 'adoption' | 'retention' | 'expansion'
/**
 * Metrics tracked for the aha moment
 */
export interface AhaMetrics {
    time_to_aha_seconds: number
    time_since_signup_seconds?: number
    session_duration_seconds?: number
    actions_before_aha?: number
    steps_completed?: number
    features_explored?: number
    engagement_score?: number
    completion_rate?: number
    retention_likelihood?: number
}
/**
 * Context information about the aha moment
 */
export interface AhaContext {
    feature_name?: string
    feature_category?: string
    product_area?: string
    user_role?: string
    user_segment?: string
    plan_type?: string
    is_trial?: boolean
    platform?: 'web' | 'mobile' | 'desktop'
    device_type?: 'mobile' | 'tablet' | 'desktop'
    browser?: string
    os?: string
    app_version?: string
    referral_source?: string
    previous_aha_events?: number
    first_aha?: boolean
    [key: string]: any
}
/**
 * Experiment/A-B test data
 */
export interface ExperimentData {
    experiment_id: string
    experiment_name: string
    variant_id: string
    variant_name: string
    started_at?: string
}
/**
 * Onboarding flow data (if triggered from within a flow)
 */
export interface OnboardingFlowData {
    flow_id?: string
    flow_version?: string
    current_step_id?: string
    current_step_index?: number
    total_steps?: number
    steps_completed?: string[]
    steps_skipped?: string[]
    flow_started_at?: string
    custom_flow_data?: Record<string, unknown>
}
/**
 * Complete aha event payload
 */
export interface AhaEvent {
    event_name: 'onboarding_aha_moment'
    event_version: string
    user_id?: string
    anonymous_id?: string
    session_id?: string
    timestamp: string
    client_timestamp: string
    timezone: string
    aha_type: AhaType
    journey_stage: JourneyStage
    aha_description?: string
    metrics: AhaMetrics
    context: AhaContext
    experiments?: ExperimentData[]
    onboarding_flow?: OnboardingFlowData
}
/**
 * Configuration for aha tracking
 */
export interface AhaTrackerConfig {
    event_version?: string
    max_events_per_user?: number
    cooldown_seconds?: number
    session_id?: string
    session_start_time?: number
    user_signup_time?: number
    debug?: boolean
    exclude_personal_data?: boolean
    sanitize_context?: (context: AhaContext) => AhaContext
    custom_providers?: import('../types').AnalyticsProvider[]
}
/**
 * Engine context for auto-detection (client-side only)
 */
export interface EngineContext {
    getUserId: () => string | undefined
    getFlowData: () => OnboardingFlowData | undefined
}
/**
 * Parameters for tracking an aha moment
 *
 * **Server-side**: `user_id` or `anonymous_id` is REQUIRED
 * **Client-side**: `user_id` is optional if tracker is linked to OnboardingEngine
 */
export interface TrackAhaParams {
    aha_type: AhaType
    journey_stage?: JourneyStage
    aha_description?: string
    /**
     * User identifier
     *
     * **REQUIRED on server-side** (API routes, Server Actions, etc.)
     *
     * **Optional on client-side** if AhaTracker is linked to OnboardingEngine
     * via `tracker.linkToEngine({ getUserId: () => ... })`
     *
     * @example
     * ```typescript
     * // Server-side (Next.js Server Action)
     * await aha({
     *   aha_type: 'value_demonstration',
     *   user_id: session.user.id // REQUIRED
     * })
     *
     * // Client-side with linked engine
     * await aha({
     *   aha_type: 'feature_activation'
     *   // user_id auto-detected from engine
     * })
     * ```
     */
    user_id?: string
    /**
     * Anonymous identifier for pre-auth tracking
     * Can be used instead of user_id for anonymous users
     */
    anonymous_id?: string
    metrics?: Partial<AhaMetrics>
    context?: AhaContext
    experiments?: ExperimentData[]
    custom_timestamp?: Date | string
    flow_id?: string
}
/**
 * User aha statistics
 */
export interface AhaUserStats {
    total_aha_events: number
    last_aha_time: number | null
    can_track_aha: boolean
}
