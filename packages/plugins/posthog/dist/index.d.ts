import { OnboardingContext } from '@onboardjs/core'
import { PostHogPlugin } from './PostHogPlugin'
import { PostHogPluginConfig } from './types'
export { PostHogPlugin } from './PostHogPlugin'
export type {
    PostHogPluginConfig,
    EventNameMapping,
    StepPropertyEnricher,
    ChurnRiskFactors,
    PerformanceMetrics,
} from './types'
export { EventDataBuilder } from './utils/eventBuilder'
export { ChurnDetectionManager } from './utils/churnDetection'
export { PerformanceTracker } from './utils/performanceMetrics'
export declare const defaultPostHogConfig: Partial<PostHogPluginConfig>
export declare const saasConfig: Partial<PostHogPluginConfig>
export declare const ecommerceConfig: Partial<PostHogPluginConfig>
export declare function createPostHogPlugin<TContext extends OnboardingContext = OnboardingContext>(
    config?: Partial<PostHogPluginConfig>
): PostHogPlugin<TContext>
