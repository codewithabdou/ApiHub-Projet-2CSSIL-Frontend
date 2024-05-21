"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { register } from "@services/authentication.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MdDone } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { errorAuthResponse, registerRequest } from "@typings/auth/authForms";
import { registerFormSchema } from "@typings/auth/authForms";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = registerFormSchema;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<registerRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: registerRequest) {
    setIsLoading(true);
    const result = await register(values);
    if (result.status !== "success") {
      const resultError = result as errorAuthResponse;
      toast.error(result.status, {
        description: resultError.message,
        position: "top-right",
        dismissible: true,
        cancel: {
          label: (
            <Button variant={"destructive"} size={"sm"}>
              OK
            </Button>
          ),
          onClick: () => {
            toast.dismiss();
            if (resultError.message === "User already exists. Please Log in.")
              router.push("/auth/login");
          },
        },
        icon: <GiCancel className="text-lg text-red-500" />,
      });
    }
    if (result.status === "success") {
      toast.success(result.status, {
        description: "Succefully registered. ",
        position: "top-right",
        dismissible: true,

        cancel: {
          label: (
            <Link href="/auth/login">
              <Button className="bg-green-500" size={"sm"}>
                Se connecter
              </Button>{" "}
            </Link>
          ),
          onClick: () => {
            router.push("/auth/login");
          },
        },
        icon: (
          <MdDone className=" aspect-square hover:bg-opacity-0 p-[0.5px] rounded-full text-white bg-green-500" />
        ),
      });
      form.reset();
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-8 py-6 rounded-lg shadow-md lg:w-4/5 border-secondary border-[1px]"
      >
        <div className="lg:flex-col flex flex-col gap-4">
  
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                  <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" w-full">
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
              <FormItem className="">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="mot de passe" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Confirmer le mot de passe" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isLoading} variant={"secondary"} type="submit">
          {isLoading ? "Chargement..." : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
}
