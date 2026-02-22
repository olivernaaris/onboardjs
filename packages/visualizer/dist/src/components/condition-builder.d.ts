import type { ConditionGroup } from '../parser/condition-parser/types'
interface ConditionBuilderProps {
    condition?: ConditionGroup[]
    onConditionChange: (condition: ConditionGroup[] | undefined) => void
    readonly?: boolean
}
export declare function ConditionBuilder({
    condition,
    onConditionChange,
    readonly,
}: ConditionBuilderProps): import('react/jsx-runtime').JSX.Element
export {}
//# sourceMappingURL=condition-builder.d.ts.map
