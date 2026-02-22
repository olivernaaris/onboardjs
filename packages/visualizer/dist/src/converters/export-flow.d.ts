import { OnboardingContext } from '@onboardjs/core'
import { FlowState } from '../types/flow-types'
/**
 * Generate TypeScript/JavaScript code from FlowState
 * This provides more flexibility than the step format
 */
export declare function exportFlowAsCode(
    flowState: FlowState,
    options?: {
        format?: 'typescript' | 'javascript'
        includeTypes?: boolean
        includeComments?: boolean
        variableName?: string
    }
): string
/**
 * Export flow as JSON string with customizable formatting
 */
export declare function exportFlowAsJSON<TContext extends OnboardingContext = OnboardingContext>(
    flowState: FlowState,
    options?: {
        prettyPrint?: boolean
        includeMetadata?: boolean
        stepFormat?: boolean
    }
): string
/**
 * Create downloadable content for export
 */
export declare function createDownloadableContent(
    content: string,
    format: 'json' | 'typescript' | 'javascript'
): {
    content: string
    filename: string
    mimeType: string
}
//# sourceMappingURL=export-flow.d.ts.map
