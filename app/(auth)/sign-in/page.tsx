import { SigninCard } from '@/features/auth/components/sign-in-card'
import { getCurrent } from '@/features/auth/server/queries';
import { redirect } from 'next/navigation';

export default async function SigninPage() {
  const user = await getCurrent();
  if (user) redirect("/");
  return (
    <div>
        <SigninCard />
    </div>
  )
}
