"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@services/authentication.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginRequest, successLoginResponse } from "@typings/auth/authForms";
import { loginFormSchema } from "@typings/auth/authForms";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
const formSchema = loginFormSchema;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<loginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: loginRequest) {
    setIsLoading(true);
    const result = await login(values);
    if (result.status !== "success") {
      toast.error(result.status, {
        description: result.message,
        position: "top-right",
        dismissible: true,
        duration: 5000,
        cancel: {
          label: (
            <Button variant={"destructive"} size={"sm"}>
              OK
            </Button>
          ),
          onClick: () => {
            toast.dismiss();
          },
        },
        icon: <GiCancel className="text-lg text-red-500" />,
      });
    } else {
      router.push(`/${result.message}`);
      form.reset();
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md w-full md:w-1/2"
        className="space-y-8 bg-white px-8 py-6 rounded-lg shadow-md lg:w-4/5 border-secondary border-[1px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse mail</FormLabel>
              <FormControl>
                <Input placeholder="Adresse mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="mot de passe" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" variant={"secondary"}>
          {isLoading ? "Chargement..." : "Se connecter"}
        </Button>{" "}
      </form>
    </Form>
  );
}
