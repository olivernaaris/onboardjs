import { OnboardingEngine } from '../../engine/OnboardingEngine'
import { OnboardingEngineRegistry } from '../../engine/OnboardingEngineRegistry'
import { OnboardingFlowData } from './types'
/**
 * Extracts flow data from the OnboardingEngine for aha event context
 */
export declare class FlowDataExtractor {
    /**
     * Get flow data from a specific flow ID
     * @param flowId - The flow ID to get data for
     * @param registry - Optional registry to search for engines (required if flowId is provided)
     */
    static getFlowData(flowId?: string, registry?: OnboardingEngineRegistry): OnboardingFlowData | undefined
    /**
     * Extract flow data from an engine instance
     */
    static extractFromEngine(engine: OnboardingEngine<any>): OnboardingFlowData
}
