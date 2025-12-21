import { Task } from "../types/entities";

type DateArg = Date | null | undefined

export const isToday = (startDate: DateArg, endDate: DateArg): boolean => {
    if (!startDate) {
        return false;
    }

    const todayStart = new Date();

    const todayEnd = new Date();

    const taskStart = new Date(startDate);

    const taskEnd = endDate ? new Date(endDate) : taskStart;

    return taskStart <= todayEnd && taskEnd >= todayStart;
};

export const isHasDate = (startDate: DateArg, endDate: DateArg): boolean => {
    if (!startDate || !endDate) return false;
    return true
}

export const isTaskActiveOnDate = (task: Task, targetDate: Date): boolean => {
    if (!task.startDate) return false;

    const start = new Date(task.startDate);
    start.setHours(0, 0, 0, 0);

    const end = task.endDate ? new Date(task.endDate) : new Date(start);
    end.setHours(23, 59, 59, 999);

    const current = new Date(targetDate);
    current.setHours(12, 0, 0, 0);

    return current >= start && current <= end;
};