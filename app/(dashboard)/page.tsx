import { getCurrent } from "@/features/auth/server/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
// import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaces = await getWorkspaces();
  console.log("🚀 ~ Home ~ workspaces:", workspaces)

  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
