export interface LoggerConfig {
    /**
     * Enables or disables debug logging.
     * If true, debug messages will be outputted.
     * Defaults to false if not provided.
     */
    debugMode?: boolean
    /**
     * An optional prefix to add to all log messages.
     */
    prefix?: string
}
export declare class Logger {
    private static _instance
    private static _instanceCache
    private _debugEnabled
    private _logPrefix
    /**
     * Creates an instance of Logger.
     * @param config The configuration object for the logger.
     */
    constructor(config?: LoggerConfig)
    /**
     * Gets the singleton instance of Logger with optional configuration.
     * If called without arguments, returns the default singleton instance.
     * If called with a prefix, returns a cached instance for that prefix.
     *
     * @param config Optional configuration for the logger instance
     * @returns A Logger instance (singleton or cached by prefix)
     *
     * @example
     * ```typescript
     * // Get default singleton
     * const logger = Logger.getInstance()
     *
     * // Get or create cached instance with prefix
     * const myLogger = Logger.getInstance({ prefix: 'MyService' })
     *
     * // Same prefix returns the same cached instance
     * const sameLogger = Logger.getInstance({ prefix: 'MyService' })
     * console.log(myLogger === sameLogger) // true
     * ```
     */
    static getInstance(config?: LoggerConfig): Logger
    /**
     * Clears all cached Logger instances.
     * Useful for testing or when you need to reset logger configuration.
     *
     * @example
     * ```typescript
     * // In tests
     * afterEach(() => {
     *   Logger.clearCache()
     * })
     * ```
     */
    static clearCache(): void
    /**
     * Logs a debug message. Only visible if `debugMode` is true.
     * @param messages The messages to log.
     */
    debug(...messages: any[]): void
    /**
     * Logs an informational message.
     * @param messages The messages to log.
     */
    info(...messages: any[]): void
    /**
     * Logs a warning message.
     * @param messages The messages to log.
     */
    warn(...messages: any[]): void
    /**
     * Logs an error message.
     * @param messages The messages to log.
     */
    error(...messages: any[]): void
}
