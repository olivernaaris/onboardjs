import { Logger } from '../services/Logger'
/**
 * ProgressMilestoneTracker tracks milestone achievement and percentage tracking.
 * Manages progress percentage calculation and milestone detection.
 */
export declare class ProgressMilestoneTracker {
    private _progressMilestones
    private _milestonePercentages
    private _logger
    constructor(milestonePercentages?: number[], logger?: Logger)
    calculateFlowProgress(completedSteps: number, totalSteps: number): number
    checkForNewMilestones(progress: number): number[]
    hasMilestoneBeenReached(milestone: number): boolean
    getReachedMilestones(): number[]
    getMilestonePercentages(): ReadonlyArray<number>
    reset(): void
    setMilestonePercentages(percentages: number[]): void
}
