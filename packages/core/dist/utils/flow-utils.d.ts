import { OnboardingEngine } from '../engine/OnboardingEngine'
import { OnboardingEngineRegistry } from '../engine/OnboardingEngineRegistry'
import { OnboardingContext } from '../types'
/**
 * Utility functions for working with multiple flows
 */
export declare class FlowUtils {
    private static _logger
    /**
     * Generate a namespaced persistence key based on flow identification
     */
    static generatePersistenceKey(engine: OnboardingEngine<any>, baseKey?: string): string
    /**
     * Get all engines matching a flow pattern
     * @param pattern - Pattern to match engines
     * @param registry - Registry to search in
     */
    static getEnginesByPattern(
        pattern: {
            flowId?: string
            flowName?: string
            flowVersion?: string
        },
        registry: OnboardingEngineRegistry
    ): OnboardingEngine<any>[]
    /**
     * Get the most recent version of a flow by name
     * @param flowName - Name of the flow to find
     * @param registry - Registry to search in
     */
    static getLatestVersionByFlowName(
        flowName: string,
        registry: OnboardingEngineRegistry
    ): OnboardingEngine<any> | null
    /**
     * Check if two engines are compatible versions of the same flow
     */
    static areFlowsCompatible(engine1: OnboardingEngine<any>, engine2: OnboardingEngine<any>): boolean
    /**
     * Create a flow-aware data persistence wrapper
     */
    static createFlowAwarePersistence<TContext extends OnboardingContext>(
        engine: OnboardingEngine<TContext>
    ): {
        load(): Promise<Partial<TContext> | null>
        save(context: TContext, currentStepId: string | number | null): Promise<void>
        clear(): Promise<void>
        getKey(): string
    }
}
