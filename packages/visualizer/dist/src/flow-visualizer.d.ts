import '@xyflow/react/dist/style.css'
import { OnboardingStep, OnboardingContext } from '@onboardjs/core'
import { ExportFormat } from './types'
import './flow-visualizer.css'
import '../styles.css'
interface FlowVisualizerProps<TContext extends OnboardingContext = OnboardingContext> {
    initialSteps?: OnboardingStep<TContext>[]
    onStepsChange?: (steps: OnboardingStep<TContext>[]) => void
    onExport?: (content: string, format: ExportFormat, filename: string) => void
    onImport?: (steps: OnboardingStep<TContext>[]) => void
    readonly?: boolean
    className?: string
}
export declare function FlowVisualizer<TContext extends OnboardingContext = OnboardingContext>({
    initialSteps,
    onStepsChange,
    onExport,
    onImport,
    readonly,
    className,
}: FlowVisualizerProps<TContext>): import('react/jsx-runtime').JSX.Element
export {}
//# sourceMappingURL=flow-visualizer.d.ts.map
