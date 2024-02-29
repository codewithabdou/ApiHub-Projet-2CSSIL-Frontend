"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import User from "@typings/entities/User";

async function login(role: string) {
  cookies().set("user", role);
  redirect(`/${role}`);
}

async function logout() {
  cookies().set("user", "");
  redirect("/");
}

async function getLoggedInUser(): Promise<User | null> {
  const userCookie = cookies().get("user")?.value;

  if (!userCookie?.length) return null;

  return {
    role: userCookie as string,
    name: "abdou",
    email: "",
  };
}

export { login, logout, getLoggedInUser };
