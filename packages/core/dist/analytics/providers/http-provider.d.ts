import { AnalyticsEvent, AnalyticsProvider } from '../types'
export interface HttpProviderConfig {
    publicKey: string
    apiHost: string
    batchSize?: number
    batchInterval?: number
    headers?: Record<string, string>
    debug?: boolean
}
export declare class HttpProvider implements AnalyticsProvider {
    readonly name = 'onboardjs-cloud'
    private _config
    private _queue
    private _flushTimer
    private _isFlushing
    private _logger
    constructor(config: HttpProviderConfig)
    trackEvent(event: AnalyticsEvent): void
    flush(): Promise<void>
    dispose(): void
}
