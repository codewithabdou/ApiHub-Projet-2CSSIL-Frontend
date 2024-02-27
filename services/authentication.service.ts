"use server";

import { redirect } from "@navigation";
import { cookies } from "next/headers";

async function login(role: string) {
  cookies().set("user", role);
  redirect(`/${role}`);
}

async function logout() {
  cookies().delete("user");

  redirect("/");
}

export { login, logout };
