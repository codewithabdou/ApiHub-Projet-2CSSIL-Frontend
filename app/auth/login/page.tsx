"use client";

import { Button } from "@app/components/ui/button";
import { login } from "@services/authentication.service";
import { useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (role: string) => {
    await login(role);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
        <h1 className="text-4xl font-bold text-primary">Login page</h1>
        <div className="flex border-md flex-wrap p-8 gap-4">
          <Button onClick={() => startTransition(() => handleLogin("admin"))}>
            Login as Admin
          </Button>
          <Button onClick={() => startTransition(() => handleLogin("hub"))}>
            Login as user
          </Button>
          <Button
            onClick={() => startTransition(() => handleLogin("provider"))}
          >
            Login as provider
          </Button>
        </div>
      </main>
    </>
  );
}
