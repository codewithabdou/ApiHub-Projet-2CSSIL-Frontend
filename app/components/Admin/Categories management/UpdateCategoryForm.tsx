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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
import {
  categoryRequest,
  createCategorySchema,
  errorCreateCategoryResponse,
  sucessGetCategoriesResponse,
} from "@typings/api/createCategoryType";
import { Textarea } from "@app/components/ui/textarea";
import { MdDone } from "react-icons/md";
import createCategory from "@services/api/createCategory";
import { updateCategory } from "@services/api/updateCategory";
import getCategories from "@services/api/getCategoriesByParams";

export default function UpdateCategoryForm({
  categoryId,
}: {
  categoryId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thisCategory, setthisCategory] = useState<{name:string , description:string} >({name:"", description:""});
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
      name: thisCategory.name,
      description: thisCategory.description,
    },
  });

  useEffect(() => {
    (async () => {
      const result = await getCategories({
        category_ids: parseInt(categoryId),
      });
      if (result.status !== "success") {
        errorToaster(result.status, "error while fetching category");
      }
      const category = (result as sucessGetCategoriesResponse).data[0];
      form.setValue("name", category.name);
      form.setValue("description", category.description);
      setthisCategory(category);
    })();
  }, []);

  async function onSubmit(values: categoryRequest) {
    setIsLoading(true);
    const result = await updateCategory(values, categoryId);
    if (result.status !== "success") {
      errorToaster(result.status, "update failed.");
    } else {
      if (result.status === "success") {
        toast.success(result.status, {
          description: "Category succesfully modified. ",
          position: "top-right",
          dismissible: true,

          icon: (
            <MdDone className=" aspect-square hover:bg-opacity-0 p-[0.5px] rounded-full text-white bg-green-500" />
          ),
        });
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto bg-white px-8 py-12 rounded-lg shadow-md w-full md:w-1/2 border border-secondary"
      >
        <FormField
          control={form.control}

          name="name"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Nom du categorie : </FormLabel>
              <FormControl >
                <Input  
                 placeholder="ex. Apis de Sport" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
        //   defaultValue={"test"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input
                // defaultValue={thisCategory?.description}

                  placeholder="ex. Cette catégorie d'APIs permet de gérer les informations des sports..."
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Chargement..." : "enregistrer"}
        </Button>{" "}
      </form>
    </Form>
  );
}
