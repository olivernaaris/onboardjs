import { OnboardingContext } from '@onboardjs/core'
import { MixpanelPlugin } from './MixpanelPlugin'
import { MixpanelPluginConfig } from './types'
export { MixpanelPlugin } from './MixpanelPlugin'
export type {
    MixpanelPluginConfig,
    EventNameMapping,
    StepPropertyEnricher,
    ChurnRiskFactors,
    PerformanceMetrics,
    MixpanelConfig,
} from './types'
export { EventDataBuilder } from './utils/eventBuilder'
export { ChurnDetectionManager } from './utils/churnDetection'
export { PerformanceTracker } from './utils/performanceMetrics'
export declare const defaultMixpanelConfig: Partial<MixpanelPluginConfig>
export declare const saasConfig: Partial<MixpanelPluginConfig>
export declare const ecommerceConfig: Partial<MixpanelPluginConfig>
export declare function createMixpanelPlugin<TContext extends OnboardingContext = OnboardingContext>(
    config?: Partial<MixpanelPluginConfig>
): MixpanelPlugin<TContext>
