import { Logger } from '../services/Logger'
import { AnalyticsConfig } from './types'
/**
 * SessionTracker manages session lifecycle, sessionId generation and tracking,
 * and session-level metadata.
 */
export declare class SessionTracker {
    private _sessionId
    private _config
    private _logger
    private _flowInfo
    constructor(config?: AnalyticsConfig, logger?: Logger)
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
    getFlowInfo(): Readonly<typeof this._flowInfo>
    getUserId(): string | undefined
    getFlowId(): string | undefined
    getConfig(): Readonly<AnalyticsConfig>
}
