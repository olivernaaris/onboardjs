import { ConditionRule, ConditionGroup } from '../types'
export declare class ParseCache {
    private _cache
    get(key: string): ConditionRule | ConditionGroup | undefined
    set(key: string, value: ConditionRule | ConditionGroup): void
    has(key: string): boolean
    clear(): void
    createKey(node: any): string
}
export declare const parseCache: ParseCache
//# sourceMappingURL=cache.d.ts.map
