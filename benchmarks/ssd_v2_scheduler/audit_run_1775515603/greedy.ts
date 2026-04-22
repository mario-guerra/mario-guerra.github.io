
export interface Task {
    id: string;
    duration: number;
    dependsOn: string[];
    resource: 'burner' | 'oven' | 'prep';
}

export interface ResourceLimits {
    burner: number;
    oven: number;
}

export interface ScheduledTask {
    taskId: string;
    start: number;
    end: number;
}

/**
 * Helper type for tracking the availability of a single resource slot.
 */
interface ResourceSlot {
    freeAt: number; // The earliest time this slot becomes free.
}

export class MealScheduler {
    /**
     * Plans a schedule for a list of tasks, respecting dependencies and resource limits.
     * Tasks must be contiguous.
     *
     * @param tasks The list of tasks to schedule.
     * @param limits The available resource limits for burners and ovens.
     * @returns A promise that resolves to an array of scheduled tasks.
     * @throws Error if a dependency cycle is detected or if a task requires a resource with a 0 limit.
     */
    public async plan(tasks: Task[], limits: ResourceLimits): Promise<ScheduledTask[]> {
        const scheduledTasks: ScheduledTask[] = [];
        const taskMap = new Map<string, Task>();
        const adjList = new Map<string, string[]>(); // Maps a task ID to the IDs of tasks that depend on it.
        
        return scheduledTasks;
    }
}
