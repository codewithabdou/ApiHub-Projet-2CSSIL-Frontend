'use client';
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GiCancel } from "react-icons/gi";
import { MdDone } from "react-icons/md";
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
import Category from "@typings/entities/Category";
import createApi from "@services/api/createApi";
import getCategories from "@services/api/getCategoriesByParams";
import {
  createApiFormSchema,
  createApiRequest,
} from "@typings/api/createApiTypes";
import {
  errorGetCategoriesResponse,
  sucessGetCategoriesResponse,
} from "@typings/api/createCategoryType";

function CreateApiForm() {
  const router = useRouter();
  const [nbOfPlans, setNbPlans] = useState(1);
  const [durations, setDurations] = useState([
    { value: "Par semaine", duration: 7 * 24 * 3600 },
    { value: "Par mois", duration: 30 * 24 * 3600 },
    { value: "Par an", duration: 365 * 24 * 3600 },
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

  async function onSubmit(values: createApiRequest) {
    console.log(values);
    const result = await createApi(transformDataToApiStructure(values));
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
      form.reset();
      toast.success(result.status, {
        description: "API ajoutée avec succès",
        position: "top-right",
        dismissible: true,
        cancel: {
          label: (
            <Button
              className="bg-green-500 hover:bg-green-700"
              variant={"destructive"}
              size={"sm"}
            >
              OK
            </Button>
          ),
          onClick: () => {
            toast.dismiss();
            router.push("/supplier/apis");
          },
        },
        icon: <MdDone className="text-lg text-green-500" />,
      });
    }
  }

  const planFields = Array.from({ length: nbOfPlans }, (_, index) => (
    <div key={index} className="w-full p-5 ">
      <div className="md:w-[80%] md:text-lg text-sm w-full border-secondary bg-white rounded-[20px] shadow-md flex flex-col p-5 border-[1px] lg:mx-auto  ">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-primary underline text-xl">Plan {index + 1} :</h1>

         { index > 0 && <Button type="button" onClick={deletePlan}>
            Annuler
          </Button>}
        </div>

        <FormField
          control={form.control}
          name={`plans.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du plan</FormLabel>
              <FormControl>
                <Input placeholder="ex., Plan de base" {...field}></Input>
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
                  placeholder="ex., Convient pour les projets personnels"
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
                <Input placeholder="ex., 9.99" {...field}></Input>
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
              <FormLabel>Nombre maximal de requêtes</FormLabel>
              <FormControl>
                <Input placeholder="ex., 1000" {...field}></Input>
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
        className="space-y-6 bg-white px-8 py-6 rounded-lg shadow-md w-full"
      >
                  <div className="text-center mb-8 bg-white border-b border-b-primary  py-5">
      <h1 className="font-bold text-2xl text-primary">Création d'une API</h1>
      <p className="text-sm text-gray-500">
        Dans ce formulaire, vous allez ajouter une nouvelle API en fournissant des informations générales sur l'API et en définissant différents plans d'utilisation. Veuillez remplir les champs avec attention pour assurer la création correcte de l'API.
      </p>
    </div>
        <div>
        <h1 className="font-bold text-primary">Informations générales: </h1>
<p className="text-sm text-gray-500">Veuillez remplir les détails de base de l'API ci-dessous.</p>
</div>

<div className="w-full p-5 drop-shadow-md">
<div className=" border-secondary  md:w-[80%] md:text-lg text-sm w-full bg-white rounded-[20px] shadow-md flex flex-col p-5 border-[1px] lg:mx-auto gap-4 ">
 
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'API</FormLabel>
              <FormControl>
                <Input placeholder="ex., API météo" {...field}></Input>
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
              <FormLabel>Catégorie de l'API</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie de l'API" />
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
              <FormLabel>Description de l'API</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez ce que fait votre API et ses principales fonctionnalités."
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

</div>
</div>


        <div className="flex w-full items-center justify-start">

        <div >
  <h1 className="font-bold text-primary">Les plans d'utilisation:</h1>
  <p className="text-sm text-gray-500">Définissez les différents plans et leurs caractéristiques.</p>
</div>
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
