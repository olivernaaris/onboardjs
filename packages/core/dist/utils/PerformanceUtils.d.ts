import { OnboardingStep, OnboardingContext } from '../types'
export declare class PerformanceUtils {
    private static _stepCache
    private static _evaluationCache
    private static _maxCacheSize
    private static _performanceMetrics
    private static _logger
    /**
     * Cached step lookup with LRU eviction
     */
    static findStepById<T extends OnboardingContext>(
        steps: OnboardingStep<T>[],
        stepId: string | number | null | undefined
    ): OnboardingStep<T> | undefined
    /**
     * Memoized step evaluation
     */
    static memoizeStepEvaluation<T extends OnboardingContext>(
        stepId: string | number | null | undefined,
        context: T,
        evaluator: (id: string | number | null | undefined, ctx: T) => unknown
    ): any
    /**
     * Debounce function for frequent operations
     */
    static debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void
    /**
     * Throttle function for rate limiting
     */
    static throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void
    /**
     * Performance measurement wrapper
     */
    static measurePerformance<T>(operationName: string, operation: () => T): T
    /**
     * Async performance measurement wrapper
     */
    static measureAsyncPerformance<T>(operationName: string, operation: () => Promise<T>): Promise<T>
    /**
     * Get performance statistics for an operation
     */
    static getPerformanceStats(operationName: string): {
        count: number
        average: number
        min: number
        max: number
        recent: number
    } | null
    /**
     * Clear all caches
     */
    static clearCaches(): void
    /**
     * Get cache statistics
     */
    static getCacheStats(): {
        stepCacheSize: number
        evaluationCacheSize: number
        performanceMetricsCount: number
    }
    /**
     * Simple context hashing for cache keys
     */
    private static _hashContext
    /**
     * Batch operations for better performance
     */
    static batchOperations<T>(operations: Array<() => T>, batchSize?: number): T[]
    /**
     * Memory usage monitoring
     */
    static getMemoryUsage(): {
        cacheMemoryEstimate: number
        performanceMemoryEstimate: number
    }
}
