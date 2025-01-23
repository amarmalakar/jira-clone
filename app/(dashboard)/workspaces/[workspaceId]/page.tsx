import { getCurrent } from '@/features/auth/server/queries';
import { redirect } from 'next/navigation';

export default async function WorkspaceIdPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div>WorkspaceIdPage</div>
  )
}
