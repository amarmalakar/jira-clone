"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);
  return (
    <div className="">
      <div className="flex gap-4">
        <Button onClick={() => mutate()}>Logout</Button>
      </div>
      <Input />
      <p className="text-red-500 font-semibold">Amar</p>
    </div>
  );
}
