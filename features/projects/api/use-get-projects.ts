import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetProjects = ({ workspaceId }: { workspaceId: string; }) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId],
        queryFn: async () => {
            const res = await client.api.projects.$get({
                query: {
                    workspaceId
                }
            });
            if (!res.ok) throw new Error("Failed to fetch workspaces");
            const { data } = await res.json();
            return data;
        },
    });

    return query;
}