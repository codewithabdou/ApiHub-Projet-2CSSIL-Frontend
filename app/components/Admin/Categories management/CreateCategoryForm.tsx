"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
import {
  categoryRequest,
  createCategorySchema,
} from "@typings/api/createCategoryType";
import { createCategory } from "@services/api/categories";
import { Textarea } from "@app/components/ui/textarea";

export default function CreateCategoryForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // this can be exporte0d and reused later ! .
  const errorToaster = (status?: String, message?: String) => {
    toast.error(status, {
      description: message,
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
  };

  const form = useForm<categoryRequest>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function onSubmit(values: categoryRequest) {
    setIsLoading(true);
    const result = await createCategory(values);
    if (result.status !== "success") {
      errorToaster(result.status, result.message);
    } else {
      // redirect to categories admin page
      router.push("/admin/categories");
      form.reset();
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md w-full md:w-1/2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du categorie : </FormLabel>
              <FormControl>
                <Input placeholder="nom du categorie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea placeholder="description ...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Chargement..." : "ajouter"}
        </Button>{" "}
      </form>
    </Form>
  );
}
