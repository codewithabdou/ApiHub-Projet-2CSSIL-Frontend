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
} from "@app/components/ui/form";
import { MdDone } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { registerRequest } from "@typings/auth/authForms";
import { registerFormSchema } from "@typings/auth/authForms";
import { Input } from "@app/components/ui/input";
import { Button } from "@app/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupplierFormSchema, createSupplierRequest } from "@typings/api/addSupplierForm";
import { createSupplier } from "@services/api/CreatesupplierApi";

const formSchema = createSupplierFormSchema;

export default function CreateSupplierForm() {
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
 
  async function onSubmit(values: createSupplierRequest) {
    setIsLoading(true);
    const result = await createSupplier(values);
    console.log(result);
    if (result.status !== "success") {
      toast.error(result.status, {
        description: result.message,
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
            if (result.message === "User already exists. Please Log in.")
              router.push("/auth/login");
          },
        },
        icon: <GiCancel className="text-lg text-red-500" />,
      });
    }
    if (result.status === "success") {
      toast.success(result.status, {
        description: result.message,
        position: "top-right",
        dismissible: true,

        cancel: {
          label: (
            <Link href="/auth/login">
              <Button className="bg-green-500" size={"sm"}>
                Ok
              </Button>{" "}
            </Link>
          ),
          onClick: () => {
            toast.dismiss();
            router.push("/admin/suppliers");          },
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

    <>

  

    <main className="
    
    flex  flex-col items-center justify-evenly p-4 lg:px-[10%]">


<div className="w-full ">

<h1  className=" text-2xl md:text-4xl font-bold mb-6">Ajouter un fournisseur</h1>
</div>
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border border-secondary bg-white px-8 py-12 rounded-lg shadow-md w-full"
      >
        <div className="lg:flex-row flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="lg:w-1/3 w-full">
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
            name="lastname"
            render={({ field }) => (
              <FormItem className="lg:w-1/3 w-full">
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
            name="email"
            render={({ field }) => (
              <FormItem className="lg:w-1/3 w-full">
                <FormLabel>Adresse mail</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex lg:flex-row flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="lg:w-1/2 ">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="mot de passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="lg:w-1/2 ">
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Confirmer le mot de passe" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Chargement..." : "Ajouter"}
        </Button>
      </form>
    </Form>
    </main>

    </>

  );
}
