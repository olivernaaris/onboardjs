import type { OnboardingContext } from '../types'
import type { OnboardingEngine } from './OnboardingEngine'
import type { FlowInfo } from './types'
/**
 * Statistics about the registry contents
 */
export interface RegistryStats {
    totalEngines: number
    enginesByFlow: Record<string, number>
    enginesByVersion: Record<string, number>
}
/**
 * Options for registry iteration and filtering
 */
export interface RegistryQueryOptions {
    flowName?: string
    versionPattern?: string
}
/**
 * OnboardingEngineRegistry provides SSR-safe instance management.
 *
 * Unlike the previous static module-level registry, this class-based approach:
 * - Prevents cross-instance pollution in multi-tenant/SSR environments
 * - Allows explicit lifecycle management
 * - Supports multiple isolated registries for testing
 *
 * @example
 * ```typescript
 * // Create a registry for your application
 * const registry = new OnboardingEngineRegistry()
 *
 * // Register engines with a flow ID
 * const engine = new OnboardingEngine({
 *   flowId: 'user-onboarding',
 *   steps: [...],
 *   registry // Pass the registry to the engine
 * })
 *
 * // Retrieve engine by flow ID
 * const retrieved = registry.get('user-onboarding')
 * ```
 */
export declare class OnboardingEngineRegistry {
    private _engines
    /**
     * Register an engine instance with a flow ID
     */
    register<TContext extends OnboardingContext = OnboardingContext>(
        flowId: string,
        engine: OnboardingEngine<TContext>
    ): void
    /**
     * Unregister an engine by flow ID
     */
    unregister(flowId: string): boolean
    /**
     * Get an engine by flow ID
     */
    get<TContext extends OnboardingContext = OnboardingContext>(flowId: string): OnboardingEngine<TContext> | undefined
    /**
     * Check if an engine exists with the given flow ID
     */
    has(flowId: string): boolean
    /**
     * Get all registered engines
     */
    getAll(): OnboardingEngine<any>[]
    /**
     * Get all registered flow IDs
     */
    getFlowIds(): string[]
    /**
     * Get engines matching a version pattern (semver-style matching)
     */
    getByVersion(versionPattern: string): OnboardingEngine<any>[]
    /**
     * Get engines matching specific query options
     */
    query(options: RegistryQueryOptions): OnboardingEngine<any>[]
    /**
     * Get registry statistics
     */
    getStats(): RegistryStats
    /**
     * Clear all registered engines
     */
    clear(): void
    /**
     * Get the number of registered engines
     */
    get size(): number
    /**
     * Iterate over all engines
     */
    forEach(callback: (engine: OnboardingEngine<any>, flowId: string) => void): void
    /**
     * Get flow info for all registered engines
     */
    getAllFlowInfo(): FlowInfo[]
}
/**
 * Creates a new isolated registry instance
 * Use this in SSR environments or tests where you need isolated state
 */
export declare function createRegistry(): OnboardingEngineRegistry
