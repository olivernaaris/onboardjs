/**
 * Represents a successful result containing a value
 */
export interface Ok<T> {
    readonly ok: true
    readonly value: T
}
/**
 * Represents a failure result containing an error
 */
export interface Err<E> {
    readonly ok: false
    readonly error: E
}
/**
 * A Result type that can be either Ok (success) or Err (failure)
 * Use this instead of throwing exceptions in hot paths
 */
export type Result<T, E = Error> = Ok<T> | Err<E>
/**
 * Creates a successful Result
 */
export declare function ok<T>(value: T): Ok<T>
/**
 * Creates a failure Result
 */
export declare function err<E>(error: E): Err<E>
/**
 * Type guard to check if a Result is Ok
 */
export declare function isOk<T, E>(result: Result<T, E>): result is Ok<T>
/**
 * Type guard to check if a Result is Err
 */
export declare function isErr<T, E>(result: Result<T, E>): result is Err<E>
/**
 * Unwraps a Result, throwing if it's an error
 * Use sparingly - prefer pattern matching with isOk/isErr
 */
export declare function unwrap<T, E>(result: Result<T, E>): T
/**
 * Unwraps a Result with a default value if it's an error
 */
export declare function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T
/**
 * Maps a Result's success value to a new value
 */
export declare function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>
/**
 * Maps a Result's error to a new error
 */
export declare function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>
/**
 * Chains Result operations (flatMap)
 */
export declare function andThen<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E>
/**
 * Wraps a synchronous function that might throw into a Result
 * Preserves stack traces unlike try-catch-rethrow
 */
export declare function safeSync<T>(fn: () => T): Result<T, Error>
/**
 * Wraps an async function that might throw into a Result
 * Preserves stack traces unlike try-catch-rethrow
 */
export declare function safeAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>>
/**
 * Converts a Promise that might reject to a Promise<Result>
 */
export declare function fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>>
