import { BasePlugin, OnboardingContext, PluginConfig, OnboardingEngine } from '@onboardjs/core'
import { PostgrestError, SupabaseClient, User } from '@supabase/supabase-js'
type SupabaseOperation = 'load' | 'persist' | 'clear'
export interface SupabasePersistencePluginConfig extends PluginConfig {
    /** The Supabase client instance provided by the user. */
    client: SupabaseClient<any, any, any>
    /** The name of the table to store onboarding state. Defaults to 'onboarding_state'. */
    tableName?: string
    /** The name of the column to use as the user id for lookup. Defaults to 'user_id'. */
    userIdColumn?: string
    /** The key in the OnboardingContext where the user id's value can be found (e.g., 'currentUser.id'). */
    contextKeyForId?: string
    /** The name of the column where the JSON state will be stored. Defaults to 'state_data'. */
    stateDataColumn?: string
    /**
     * If true, the plugin will automatically use the authenticated Supabase user's ID.
     * The loaded user object will be available in the context at `context.currentUser`.
     * Defaults to `false`.
     */
    useSupabaseAuth?: boolean
    /**
     * Optional callback to handle persistence errors.
     * If provided, this function is called before the error is passed to the engine's global error handler.
     */
    onError?: (error: PostgrestError, operation: SupabaseOperation) => void
}
export declare class SupabasePersistencePlugin<TContext extends OnboardingContext<User>> extends BasePlugin<TContext> {
    readonly name = 'onboardjs-supabase-plugin'
    readonly version = '1.0.0'
    config: SupabasePersistencePluginConfig
    private _tableName
    private _userIdColumn
    private _stateDataColumn
    constructor(config: SupabasePersistencePluginConfig)
    /**
     * Installs the Supabase persistence plugin into the OnboardingEngine.
     * @param engine The OnboardingEngine instance to install the plugin into.
     * @returns A cleanup function to remove the plugin's handlers.
     */
    install(engine: OnboardingEngine<TContext>): Promise<() => Promise<void>>
    private _handleError
}
/**
 * A helper function to create an instance of the SupabasePersistencePlugin.
 * This is the recommended way to instantiate the plugin.
 *
 * @param config The configuration options for the plugin.
 * @returns An instance of SupabasePersistencePlugin.
 */
export declare function createSupabasePlugin<TContext extends OnboardingContext<User>>(
    config: SupabasePersistencePluginConfig
): SupabasePersistencePlugin<TContext>
export {}
