'use strict'
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
const c = require('@onboardjs/core')
class o extends c.BasePlugin {
    constructor(t) {
        if ((super(t), (this.name = 'onboardjs-supabase-plugin'), (this.version = '1.0.0'), !t.client))
            throw new Error('[Supabase Plugin] Supabase client instance is required.')
        if (!t.useSupabaseAuth && !t.contextKeyForId)
            throw new Error(
                '[Supabase Plugin] Either `useSupabaseAuth` must be true or `contextKeyForId` must be provided.'
            )
        ;((this.config = t),
            (this._tableName = t.tableName ?? 'onboarding_state'),
            (this._userIdColumn = t.userIdColumn ?? 'user_id'),
            (this._stateDataColumn = t.stateDataColumn ?? 'state_data'))
    }
    async install(t) {
        await super.install(t)
        const r = () => {
            const e = t.getState().context,
                s = this.config.useSupabaseAuth ? 'currentUser.id' : this.config.contextKeyForId
            if (!s) return
            const a = s.split('.').reduce((i, n) => (i ? i[n] : void 0), e)
            if (typeof a == 'string') return a
            a !== void 0 &&
                console.warn(`[Supabase Plugin] Expected a string at context key '${s}', but found type '${typeof a}'.`)
        }
        return (
            t.setDataLoadHandler(async () => {
                let e,
                    s = null
                if (this.config.useSupabaseAuth) {
                    const { data: l } = await this.config.client.auth.getUser()
                    ;((s = l.user), (e = s?.id))
                } else e = r()
                if (!e) return null
                const { data: a, error: i } = await this.config.client
                    .from(this._tableName)
                    .select(this._stateDataColumn)
                    .eq(this._userIdColumn, e)
                    .maybeSingle()
                if (i) return (this._handleError(i, 'load'), null)
                const n = (a && typeof a == 'object' ? a[this._stateDataColumn] : {}) || {}
                return (this.config.useSupabaseAuth && s && (n.currentUser = s), n)
            }),
            t.setDataPersistHandler(async (e, s) => {
                const a = r()
                if (!a) return
                const i = { ...e, currentStepId: s },
                    { error: n } = await this.config.client
                        .from(this._tableName)
                        .upsert(
                            { [this._userIdColumn]: a, [this._stateDataColumn]: i },
                            { onConflict: this._userIdColumn }
                        )
                n && this._handleError(n, 'persist')
            }),
            t.setClearPersistedDataHandler(async () => {
                const e = r()
                if (!e) return
                const { error: s } = await this.config.client
                    .from(this._tableName)
                    .update({ [this._stateDataColumn]: null })
                    .eq(this._userIdColumn, e)
                s && this._handleError(s, 'clear')
            }),
            async () => {
                ;(t.setDataLoadHandler(void 0), t.setDataPersistHandler(void 0), t.setClearPersistedDataHandler(void 0))
            }
        )
    }
    _handleError(t, r) {
        if ((this.config.onError && this.config.onError(t, r), this.engine)) {
            const e = new Error(`[Supabase Plugin] Operation '${r}' failed: ${t.message}`)
            ;((e.cause = t), this.engine.reportError(e, `SupabasePlugin.${r}`))
        } else console.error(`[Supabase Plugin] Operation '${r}' failed:`, t)
    }
}
function d(u) {
    return new o(u)
}
exports.SupabasePersistencePlugin = o
exports.createSupabasePlugin = d
