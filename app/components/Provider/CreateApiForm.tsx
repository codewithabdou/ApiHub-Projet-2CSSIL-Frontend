"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createApiFormSchema,
  createApiRequest,
} from "@typings/api/createApiTypes";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import getAllCategories from "@services/api/createCategory";
import {
  ErrorgetAllCategoriesResponse,
  getAllCategoriesSuccessResponse,
} from "@typings/api/getCategoryTypes";
import Category from "@typings/entities/Category";
import createApi from "@services/api/createApi";
import { get } from "http";
import getCategories from "@services/api/getCategoriesByParams";
import {
  errorGetCategoriesResponse,
  sucessGetCategoriesResponse,
} from "@typings/api/createCategoryType";

function CreateApiForm() {
  const router = useRouter();
  const [nbOfPlans, setNbPlans] = useState(1);
  const [durations, setDurations] = useState([
    { value: "Par semaine", duration: 7 },
    { value: "Par mois", duration: 30 },
    { value: "Par an", duration: 365 },
    { value: "Illimitée", duration: 999999 },
  ]);
  const [categories, setCategories] = useState<Category[]>([]);
  const form = useForm<createApiRequest>({
    resolver: zodResolver(createApiFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
      plans: Array(),
    },
  });
  function transformDataToApiStructure(data: any) {
    if (data.category_id !== "") {
      data.category_id = parseInt(data.category_id);
    }
    data.plans = data.plans.map(
      (plan: { price: string; max_requests: string; duration: string }) => {
        return {
          ...plan,
          price: parseFloat(plan.price),
          max_requests: parseInt(plan.max_requests),
          duration: parseInt(plan.duration),
        };
      }
    );
    return data;
  }
  const deletePlan = () => {
    if (nbOfPlans > 1) {
      setNbPlans(nbOfPlans - 1);
      form.getValues().plans.pop();
    }
  };
  //Submit function that uses the backend API
  async function onSubmit(values: createApiRequest) {
    console.log(values);
    const result: any = await createApi(transformDataToApiStructure(values));
    if (result !== 201) {
      toast.error(`result.status`, {
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
      form.reset();
      toast.success(result, {
        description: "API added successfuly",

        position: "top-right",
        dismissible: true,
        duration: 5000,
        cancel: {
          label: (
            <Button
              className="bg-green-500"
              variant={"destructive"}
              size={"sm"}
            >
              OK
            </Button>
          ),
          onClick: () => {
            toast.dismiss();
          },
        },
        icon: <GiCancel className="text-lg text-green-500" />,
      });
    }
  }
  //creating the plan forms dynamically
  const planFields = Array.from({ length: nbOfPlans }, (_, index) => (
    <div key={index} className="w-full p-5">
      <div className=" md:w-[80%] md:text-lg text-sm w-full bg-white rounded-[20px] shadow-md  flex flex-col p-5 border-[1px]">
        <div className="w-full flex justify-between">
          <h1>Plan {index + 1} :</h1>
          <Button type="button" onClick={deletePlan}>
            Annuler
          </Button>
        </div>

        <FormField
          control={form.control}
          name={`plans.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du plan</FormLabel>
              <FormControl>
                <Input placeholder="Nom du plan" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`plans.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description du plan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description du plan"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`plans.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix du plan</FormLabel>
              <FormControl>
                <Input placeholder="Prix du plan" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`plans.${index}.max_requests`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre maximal de requettes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre maximal de requettes"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`plans.${index}.duration`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée du plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Durée du plan" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {durations.map((dur, key) => (
                    <SelectItem key={key} value={`${dur.duration}`}>
                      {dur.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    getCategories().then((Response) => {
      if (Response) {
        const data = Response as sucessGetCategoriesResponse;
        setCategories(data.data);
      } else {
        const errorData = Response as errorGetCategoriesResponse;
        return errorData;
      }
    });
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md w-full"
      >
        <h1 className="font-bold">Informations generales:</h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'Api</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'Api" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie de l'Api</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Categorie de l'Api" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {categories.map((cat, key) => (
                    <SelectItem key={key} value={`${cat.id}`}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de l'Api</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de l'Api"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-start">
          <h1 className="font-bold">Les plans d'utilisation:</h1>
        </div>
        <div className="w-full flex justify-evenly items-center flex-wrap">
          {planFields}
        </div>

        <div className="flex w-full items-center justify-end">
          <Button
            type="button"
            onClick={() => {
              setNbPlans(nbOfPlans + 1);
            }}
          >
            Ajouter un plan
          </Button>
        </div>
        <Button type="submit">Créer l'API</Button>
      </form>
    </Form>
  );
}

export default CreateApiForm;
