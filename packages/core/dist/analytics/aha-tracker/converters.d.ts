import { AnalyticsEvent } from '../types'
import { AhaEvent } from './types'
/**
 * Converts aha events to different analytics formats
 */
export declare class AhaEventConverter {
    /**
     * Convert aha event to analytics payload
     */
    static toAnalyticsPayload(ahaEvent: AhaEvent): Record<string, any>
    /**
     * Convert aha event to standard analytics event
     */
    static toAnalyticsEvent(ahaEvent: AhaEvent): AnalyticsEvent
}
