"use client";

import { Button } from "@app/components/ui/button";
import { useTransition } from "react";
import { logout } from "@services/authentication.service";

const ApiHub = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <h1>ApiHub</h1>
      <Button onClick={() => startTransition(() => logout())}>Logout</Button>
    </div>
  );
};

export default ApiHub;
