import type { OnboardingNavigator } from '../types/navigator'
/**
 * Type for the Next.js App Router's useRouter hook result.
 * We use a minimal interface to avoid requiring next as a dependency.
 */
export interface NextAppRouter {
    push(
        href: string,
        options?: {
            scroll?: boolean
        }
    ): void
    replace(
        href: string,
        options?: {
            scroll?: boolean
        }
    ): void
    back(): void
    prefetch(href: string): void
}
/**
 * Create an OnboardingNavigator for Next.js App Router.
 *
 * @param router The router instance from useRouter()
 * @param pathname The current pathname from usePathname()
 * @returns An OnboardingNavigator instance
 *
 * @example
 * ```tsx
 * 'use client'
 * import { useRouter, usePathname } from 'next/navigation'
 * import { OnboardingProvider, createNextNavigator } from '@onboardjs/react'
 *
 * export default function OnboardingLayout({ children }) {
 *   const router = useRouter()
 *   const pathname = usePathname()
 *   const navigator = useMemo(
 *     () => createNextNavigator(router, pathname),
 *     [router, pathname]
 *   )
 *
 *   return (
 *     <OnboardingProvider
 *       steps={steps}
 *       navigator={{ navigator, basePath: '/onboarding' }}
 *     >
 *       {children}
 *     </OnboardingProvider>
 *   )
 * }
 * ```
 */
export declare function createNextNavigator(router: NextAppRouter, pathname: string): OnboardingNavigator
