import { SignupCard } from '@/features/auth/components/sign-up-card'
import { getCurrent } from '@/features/auth/server/actions';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
  const user = await getCurrent();
  if (user) redirect("/");
  return (
    <div>
        <SignupCard />
    </div>
  )
}
