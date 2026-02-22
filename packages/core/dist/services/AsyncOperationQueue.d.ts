/**
 * Statistics about the queue state
 */
export interface QueueStats {
    /** Number of pending operations waiting to be executed */
    queueLength: number
    /** Number of currently executing operations */
    activeOperations: number
    /** Whether the queue is currently processing operations */
    isProcessing: boolean
    /** Whether the queue is currently paused */
    isPaused: boolean
    /** Age of the oldest pending operation in milliseconds, or null if queue is empty */
    oldestOperationAge: number | null
}
/**
 * AsyncOperationQueue provides a reliable async operation queue using p-queue.
 *
 * This is a drop-in replacement for the previous custom OperationQueue,
 * maintaining the same public API while leveraging p-queue's battle-tested
 * implementation for better reliability and features.
 *
 * Features:
 * - Priority-based execution (higher priority operations run first)
 * - Configurable concurrency
 * - Pause/resume support
 * - Timeout support
 * - Proper error handling
 * - Generic return type support (React 19.2 style)
 *
 * @example
 * ```typescript
 * const queue = new AsyncOperationQueue(1) // Sequential operations
 *
 * // Void operation
 * await queue.enqueue(async () => {
 *   await doSomethingAsync()
 * })
 *
 * // Operation with return value
 * const result = await queue.enqueue(async () => {
 *   return await fetchData()
 * })
 *
 * // High-priority operation
 * await queue.enqueueUrgent(async () => {
 *   await doUrgentOperation()
 * })
 * ```
 */
export declare class AsyncOperationQueue {
    private _queue
    private _operationCounter
    private _trackedOperations
    private _isPaused
    constructor(concurrency?: number)
    /**
     * Add an operation to the queue with optional return value
     * @param operation The async function to execute
     * @param priority Priority level (higher = executed sooner). Default is 0.
     * @returns Promise that resolves to the operation's return value when it completes
     *
     * @example
     * ```typescript
     * // Void operation (default)
     * await queue.enqueue(async () => {
     *   console.log('Do something')
     * })
     *
     * // Operation with return value (type-safe)
     * const count = await queue.enqueue<number>(async () => {
     *   return 42
     * })
     * ```
     */
    enqueue<T = void>(operation: () => Promise<T>, priority?: number): Promise<T>
    /**
     * Add a high-priority operation that jumps to the front of the queue
     * @param operation The async function to execute
     * @returns Promise that resolves to the operation's return value when it completes
     *
     * @example
     * ```typescript
     * const result = await queue.enqueueUrgent<string>(async () => {
     *   return 'urgent result'
     * })
     * ```
     */
    enqueueUrgent<T = void>(operation: () => Promise<T>): Promise<T>
    /**
     * Get current queue statistics
     */
    getStats(): QueueStats
    /**
     * Clear all pending operations
     * Note: Already executing operations will continue to completion
     */
    clear(): void
    /**
     * Wait for all operations to complete
     */
    drain(): Promise<void>
    /**
     * Pause the queue (pending operations will wait)
     */
    pause(): void
    /**
     * Resume processing of queued operations
     */
    resume(): void
    /**
     * Set the concurrency level
     * @param concurrency Number of operations that can run in parallel
     */
    setConcurrency(concurrency: number): void
    /**
     * Get the current concurrency level
     */
    get concurrency(): number
    /**
     * Get the number of pending operations
     */
    get size(): number
    /**
     * Get the number of currently running operations
     */
    get pending(): number
    /**
     * Check if the queue is empty (no pending or running operations)
     */
    get isEmpty(): boolean
    /**
     * Wait for the queue to become empty
     */
    onEmpty(): Promise<void>
    /**
     * Wait for the queue to become idle (no running operations)
     */
    onIdle(): Promise<void>
}
