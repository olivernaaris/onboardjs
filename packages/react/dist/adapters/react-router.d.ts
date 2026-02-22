import type { OnboardingNavigator } from '../types/navigator'
/**
 * Type for React Router's navigate function from useNavigate().
 * We use a minimal interface to avoid requiring react-router-dom as a dependency.
 */
export interface ReactRouterNavigateFunction {
    (
        to: string | number,
        options?: {
            replace?: boolean
            state?: unknown
        }
    ): void
}
/**
 * Type for React Router's location object from useLocation().
 */
export interface ReactRouterLocation {
    pathname: string
    search: string
    hash: string
    state: unknown
    key: string
}
/**
 * Create an OnboardingNavigator for React Router v6+.
 *
 * @param navigate The navigate function from useNavigate()
 * @param location The location object from useLocation()
 * @returns An OnboardingNavigator instance
 *
 * @example
 * ```tsx
 * import { useNavigate, useLocation, Outlet } from 'react-router-dom'
 * import { OnboardingProvider, createReactRouterNavigator } from '@onboardjs/react'
 *
 * export function OnboardingLayout() {
 *   const navigate = useNavigate()
 *   const location = useLocation()
 *   const navigator = useMemo(
 *     () => createReactRouterNavigator(navigate, location),
 *     [navigate, location]
 *   )
 *
 *   return (
 *     <OnboardingProvider
 *       steps={steps}
 *       navigator={{ navigator, basePath: '/onboarding' }}
 *     >
 *       <Outlet />
 *     </OnboardingProvider>
 *   )
 * }
 * ```
 */
export declare function createReactRouterNavigator(
    navigate: ReactRouterNavigateFunction,
    location: ReactRouterLocation
): OnboardingNavigator
