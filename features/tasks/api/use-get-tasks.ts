import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";

interface UseGetTasksProps {
    workspaceId: string;
    projectId?: string | null;
    status?: TaskStatus | null;
    assigneeId?: string | null;
    dueDate?: string | null;
    search?: string | null;
}

export const useGetTasks = ({
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate,
    search
}: UseGetTasksProps) => {
    const query = useQuery({
        queryKey: [
            "tasks",
            workspaceId,
            projectId,
            status,
            assigneeId,
            dueDate,
            search
        ],
        queryFn: async () => {
            const res = await client.api.tasks.$get({
                query: {
                    workspaceId,
                    projectId: projectId ?? undefined,
                    status: status ?? undefined,
                    // @ts-expect-error --don't know
                    assigneeId: assigneeId ?? undefined,
                    dueDate: dueDate ?? undefined,
                    search: search ?? undefined
                }
            });
            if (!res.ok) throw new Error("Failed to fetch workspaces");
            const { data } = await res.json();
            return data;
        },
    });

    return query;
}