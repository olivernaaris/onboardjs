import { OnboardingContext } from '../types'
import { OnboardingEngineConfig } from './types'
export declare class ConfigurationBuilder {
    static buildInitialContext<T extends OnboardingContext>(config: OnboardingEngineConfig<T>): T
    static mergeConfigs<T extends OnboardingContext>(
        current: OnboardingEngineConfig<T>,
        updates: Partial<OnboardingEngineConfig<T>>
    ): OnboardingEngineConfig<T>
    static validateConfig<T extends OnboardingContext>(
        config: OnboardingEngineConfig<T>
    ): {
        isValid: boolean
        errors: string[]
        warnings: string[]
    }
    static createDefaultConfig<T extends OnboardingContext>(): OnboardingEngineConfig<T>
    static cloneConfig<T extends OnboardingContext>(config: OnboardingEngineConfig<T>): OnboardingEngineConfig<T>
}
