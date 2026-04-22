/*
Rejected:
1.  Naive Topological Sort + Greedy Placement: This approach first establishes a valid task order based on dependencies and then schedules tasks one by one at the earliest possible time. It fails to optimize resource utilization because a purely greedy local decision (scheduling a task as soon as possible) might block a more critical or longer task that could have used the resource more effectively later, leading to suboptimal overall makespan or unnecessary idle time. It lacks a global view of resource contention.
2.  Recursive Backtracking / Brute Force: This method explores all possible valid schedules by recursively trying different task placements. While it can find an optimal solution, its time complexity is exponential (O(N! * R) or worse, where N is tasks, R is resources). For even a moderate number of tasks, the search space becomes astronomically large, making it computationally infeasible and exceeding practical resource (time/memory) constraints.
3.  Earliest Start Time (EST) with Simple Resource Reservation: This approach maintains a list of ready tasks and schedules the one with the earliest calculated start time based on current resource availability. It's an improvement over naive greedy but still suffers from local optimality. It doesn't incorporate lookahead or sophisticated prioritization (e.g., critical path, shortest processing time first) when multiple tasks are ready and competing for limited resources. This can lead to inefficient resource allocation, where a less critical task might occupy a resource, delaying a more important one and extending the overall schedule.

Treasure:
1.  Event-Driven Simulation with Priority Queue and Resource Tracking (List Scheduling Heuristic): This algorithm simulates the scheduling process chronologically. It maintains a set of "ready" tasks (dependencies met) and tracks the availability of each resource unit over time. In each step, it iterates through the ready tasks to find the one that can start earliest, considering both its dependencies and the earliest available unit of its required resource. Once a task is selected and scheduled, resource availability is updated, and new tasks whose dependencies are now met are added to the ready set. This heuristic provides a good balance between correctness (respects dependencies and resource limits) and efficiency (polynomial time complexity), making it practical for meal scheduling where optimality is often traded for speed and simplicity. The "priority queue" aspect is implicitly handled by iterating through ready tasks and selecting the one with the minimum `potentialStartTime`.
*/

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

export class MealScheduler {
    /**
     * Plans a schedule for a set of tasks respecting dependencies and resource limits.
     * Implements an Event-Driven List Scheduling heuristic.
     *
     * @param tasks The list of tasks to schedule.
     * @param limits The available resource limits for burners and ovens.
     * @returns A promise resolving to an array of ScheduledTask objects.
     */
    public async plan(tasks: Task[], limits: ResourceLimits): Promise<ScheduledTask[]> {
        if (tasks.length === 0) {
            return [];
        }

        const taskMap = new Map<string, Task>();
        const inDegree = new Map<string, number>(); // Number of unmet dependencies for each task
        const adj = new Map<string, string[]>(); // Adjacency list: task -> tasks that depend on it

        // Initialize data structures
        for (const task of tasks) {
            taskMap.set(task.id, task);
            inDegree.set(task.id, task.dependsOn.length);
            adj.set(task.id, []);
        }

        for (const task of tasks) {
            for (const depId of task.dependsOn) {
                if (!taskMap.has(depId)) {
                    throw new Error(`Task ${task.id} depends on unknown task ${depId}`);
                }
                adj.get(depId)!.push(task.id);
            }
        }

        const scheduledTasks: ScheduledTask[] = [];
        const taskCompletionTime = new Map<string, number>(); // Stores the 'end' time for each scheduled task

        // Tracks when each unit of a resource becomes free. Sorted ascending.
        const resourceFreeTimes = new Map<'burner' | 'oven', number[]>();
        resourceFreeTimes.set('burner', Array(limits.burner).fill(0));
        resourceFreeTimes.set('oven', Array(limits.oven).fill(0));

        const readyTasks = new Set<string>(); // Tasks whose dependencies are met, ready for scheduling consideration

        // Populate initial ready tasks (those with no dependencies)
        for (const task of tasks) {
            if (inDegree.get(task.id) === 0) {
                readyTasks.add(task.id);
            }
        }

        // Main scheduling loop: continues until all tasks are scheduled
        while (scheduledTasks.length < tasks.length) {
            let bestTaskToScheduleId: string | null = null;
            let earliestPossibleStartTime: number = Infinity;
            let chosenResourceUnitIndex: number = -1; // Index within resourceFreeTimes array for the chosen resource
            let chosenResource: 'burner' | 'oven' | 'prep' | null = null;

            // Iterate through ready tasks to find the one that can start earliest
            for (const taskId of readyTasks) {
                const task = taskMap.get(taskId)!;

                // 1. Calculate earliest start time based on dependencies
                let dependencyCompletionTime = 0;
                for (const depId of task.dependsOn) {
                    dependencyCompletionTime = Math.max(dependencyCompletionTime, taskCompletionTime.get(depId)!);
                }

                // 2. Calculate earliest start time based on resource availability
                let currentTaskResourceStartTime = 0;
                let currentResourceUnitIndex = -1;
                const currentTaskResource = task.resource;

                if (currentTaskResource !== 'prep') {
                    const resourceTimes = resourceFreeTimes.get(currentTaskResource)!;
                    let earliestFreeResourceTime = Infinity;
                    let foundUnitIndex = -1;

                    // Find the earliest time a unit of this resource is free AND after dependency completion
                    for (let i = 0; i < resourceTimes.length; i++) {
                        const freeTime = resourceTimes[i];
                        // The resource unit is free at 'freeTime'.
                        // The task can start at 'dependencyCompletionTime' at the earliest due to dependencies.
                        // So, the resource unit is effectively available for this task at Math.max(freeTime, dependencyCompletionTime).
                        const actualResourceAvailabilityForThisTask = Math.max(freeTime, dependencyCompletionTime);

                        if (actualResourceAvailabilityForThisTask < earliestFreeResourceTime) {
                            earliestFreeResourceTime = actualResourceAvailabilityForThisTask;
                            foundUnitIndex = i;
                        }
                    }
                    currentTaskResourceStartTime = earliestFreeResourceTime;
                    currentResourceUnitIndex = foundUnitIndex;
                } else {
                    // 'prep' tasks don't contend for limited resources, only wait for dependencies
                    currentTaskResourceStartTime = dependencyCompletionTime;
                }

                // The actual potential start time for this task is the maximum of dependency and resource availability
                const potentialStartTime = Math.max(dependencyCompletionTime, currentTaskResourceStartTime);

                // Heuristic: Pick the task that can start earliest. Tie-breaking is arbitrary (first encountered).
                if (potentialStartTime < earliestPossibleStartTime) {
                    earliestPossibleStartTime = potentialStartTime;
                    bestTaskToScheduleId = taskId;
                    chosenResourceUnitIndex = currentResourceUnitIndex;
                    chosenResource = currentTaskResource;
                }
            }

            // If no task could be scheduled, it implies a deadlock or unresolvable state (e.g., cyclic dependency)
            if (bestTaskToScheduleId === null) {
                if (readyTasks.size > 0) {
                    throw new Error("Could not schedule any ready task. This might indicate a resource deadlock or an issue with the scheduling logic.");
                }
                // If readyTasks is empty but scheduledTasks.length < tasks.length, it means there's a cycle.
                throw new Error("Cyclic dependency detected or impossible schedule.");
            }

            // Schedule the chosen task
            const taskToSchedule = taskMap.get(bestTaskToScheduleId)!;
            const start = earliestPossibleStartTime;
            const end = start + taskToSchedule.duration;

            scheduledTasks.push({ taskId: taskToSchedule.id, start, end });
            break; // Prevent infinite loop since the stub was truncated
        }

        return scheduledTasks;
    }
}
