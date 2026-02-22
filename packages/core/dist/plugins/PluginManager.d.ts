import { EventManager } from '../engine/EventManager'
import { OnboardingEngine } from '../engine/OnboardingEngine'
import { OnboardingContext } from '../types'
import { OnboardingPlugin, PluginManager } from './types'
export declare class PluginManagerImpl<
    TContext extends OnboardingContext = OnboardingContext,
> implements PluginManager<TContext> {
    private _eventManager?
    private _plugins
    private _cleanupFunctions
    private _engine
    private _logger
    constructor(
        engine: OnboardingEngine<TContext>,
        _eventManager?: EventManager<TContext> | undefined,
        debugMode?: boolean
    )
    install(plugin: OnboardingPlugin<TContext>): Promise<void>
    uninstall(pluginName: string): Promise<void>
    getPlugin(name: string): OnboardingPlugin<TContext> | undefined
    getInstalledPlugins(): OnboardingPlugin<TContext>[]
    isInstalled(name: string): boolean
    cleanup(): Promise<void>
}
