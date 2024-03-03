"use client";

import { Button } from "@app/components/ui/button";
import { logout } from "@services/authentication.service";
import { useRouter } from "next/navigation";

const ApiHub = () => {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.push("/");
  }
  return (
    <div>
      <h1>ApiHub</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default ApiHub;
