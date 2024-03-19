"use client";

import { Button } from "@app/components/ui/button";
import { logout } from "@services/authentication.service";
import { useRouter } from "next/navigation";

const ProviderDashboard = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Provider Dashboard</h1>
      <Button
        onClick={() => {
          logout().then(() => {
            router.push("/");
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProviderDashboard;
