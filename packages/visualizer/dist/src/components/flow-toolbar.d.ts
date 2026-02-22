import { StepJSONParserOptions } from '@onboardjs/core'
import { TypeScriptExportOptions } from '../utils/typescript-exporter'
import { ExportFormat } from '../types'
interface FlowToolbarProps {
    onExport: (format: ExportFormat) => void
    onImport: () => void
    onClear: () => void
    onLayout: (direction?: 'TB' | 'LR') => void
    onToggleSidebar: () => void
    exportOptions: Partial<StepJSONParserOptions>
    onExportOptionsChange: (options: Partial<StepJSONParserOptions>) => void
    typeScriptExportOptions: Partial<TypeScriptExportOptions>
    onTypeScriptExportOptionsChange: (options: Partial<TypeScriptExportOptions>) => void
    readonly?: boolean
    stepCount: number
}
export declare function FlowToolbar({
    onExport,
    onImport,
    onClear,
    onLayout,
    onToggleSidebar,
    exportOptions,
    onExportOptionsChange,
    typeScriptExportOptions,
    onTypeScriptExportOptionsChange,
    readonly,
    stepCount,
}: FlowToolbarProps): import('react/jsx-runtime').JSX.Element
export {}
//# sourceMappingURL=flow-toolbar.d.ts.map
