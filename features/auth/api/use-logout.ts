import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter()
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const res = await client.api.auth.logout["$post"]();
            if (!res.ok) throw new Error("Failed to logout");
            return await res.json();
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: () => {
            toast.error("Failed to logout");
        }
    });

    return mutation;
}