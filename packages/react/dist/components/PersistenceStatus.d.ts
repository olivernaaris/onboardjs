import { ReactNode } from 'react'
/**
 * The current persistence mode of the onboarding flow.
 */
export type PersistenceMode = 'localStorage' | 'memory' | 'custom' | 'none'
/**
 * Props for the PersistenceStatus component.
 */
export interface PersistenceStatusProps {
    /**
     * The current persistence mode.
     */
    mode: PersistenceMode
    /**
     * Whether there was an error with persistence.
     */
    hasError?: boolean
    /**
     * Custom render function for the status indicator.
     */
    children?: (props: { mode: PersistenceMode; hasError: boolean; statusText: string }) => ReactNode
    /**
     * Whether to show the status indicator.
     * @default true
     */
    visible?: boolean
    /**
     * Custom class name for styling.
     */
    className?: string
}
/**
 * A component that displays the current persistence status of the onboarding flow.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PersistenceStatus mode="localStorage" />
 *
 * // With error state
 * <PersistenceStatus mode="localStorage" hasError />
 *
 * // Custom render
 * <PersistenceStatus mode="localStorage">
 *   {({ mode, statusText }) => (
 *     <span className="custom-status">{statusText}</span>
 *   )}
 * </PersistenceStatus>
 * ```
 */
export declare function PersistenceStatus({
    mode,
    hasError,
    children,
    visible,
    className,
}: PersistenceStatusProps): ReactNode
