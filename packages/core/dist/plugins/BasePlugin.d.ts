import { OnboardingEngine } from '../engine/OnboardingEngine'
import { OnboardingContext } from '../types'
import { OnboardingPlugin, PluginHooks, PluginConfig, PluginCleanup } from './types'
export declare abstract class BasePlugin<
    TContext extends OnboardingContext = OnboardingContext,
    TConfig extends PluginConfig = PluginConfig,
> implements OnboardingPlugin<TContext> {
    abstract readonly name: string
    abstract readonly version: string
    readonly description?: string
    readonly dependencies?: string[]
    protected config: TConfig
    protected engine: OnboardingEngine<TContext>
    private _unsubscribeFunctions
    constructor(config: TConfig)
    install(engine: OnboardingEngine<TContext>): Promise<PluginCleanup>
    protected setupHooks(): void
    private _cleanup
    /** Override to provide plugin hooks */
    protected getHooks(): PluginHooks<TContext>
    /** Override to handle plugin installation */
    protected onInstall(): Promise<void>
    /** Override to handle plugin uninstallation */
    protected onUninstall(): Promise<void>
    /** Get plugin configuration */
    protected getConfig(): TConfig
    /** Update plugin configuration */
    protected updateConfig(newConfig: Partial<TConfig>): void
}
