"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import User from "@typings/entities/User";
import { Type } from "lucide-react";

async function login(role: string) {
  cookies().set("user", role);
  redirect(`/${role}`);
}

async function logout() {
  cookies().set("user", "");
  redirect("/");
}

async function register(formData: FormData) {
  const formdatajson = JSON.stringify(Object.fromEntries(formData));
  const response = await fetch("http://127.0.0.1:5000/auth/register", {
    method: "POST",
    body: formdatajson,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  redirect("/auth/login");
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

export { login, logout, getLoggedInUser, register };
