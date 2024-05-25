"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAPIVersionRequest,
  createApiVersionFormSchema,
} from "@typings/api/createAPIVersionForm";
import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
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

import { useParams } from "next/navigation";

import { createApiVersion } from "@services/api/createApiVersion";
import { MdDone } from "react-icons/md";
import { Editor } from "@monaco-editor/react";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import getColorByMethod from "@helpers/getColorByMethod";

function CreateApiVersionForm() {
  const params = useParams<{ apiId: string }>();
  const router = useRouter();
  const apiId = params.apiId;
  const [headers, setHeaders] = useState(1);
  const [endpoints, setEndpoints] = useState(1);

  const form = useForm<createAPIVersionRequest>({
    resolver: zodResolver(createApiVersionFormSchema),
    defaultValues: {
      version: "",
      base_url: "",
      headers: Array<{
        key: string;
        value: string;
      }>(),
      endpoints: Array<{
        url: string;
        method: string;
        description: string;
        request_body: string;
        response_body: string;
      }>(),
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const deleteHeader = (index: number) => {
    if (headers > 1) {
      setHeaders(headers - 1);
      form.getValues().headers.filter((_, i) => i !== index);
      form.setValue(
        "headers",
        form.getValues().headers.filter((_, i) => i !== index)
      );
    }
  };

  const deleteEndpoint = (index: number) => {
    if (endpoints > 1) {
      setEndpoints(endpoints - 1);
      form.getValues().endpoints.filter((_, i) => i !== index);
      form.setValue(
        "endpoints",
        form.getValues().endpoints.filter((_, i) => i !== index)
      );
    }
  };
  


  async function onSubmit(values: createAPIVersionRequest) {
    const result = await createApiVersion({
      payload: values,
      id: parseInt(apiId),
    });
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
      form.setValue("headers", new Array(0));
      form.setValue("endpoints", new Array(0));
      form.reset();
      toast.success(result.status, {
        description: "API added successfuly",

        position: "top-right",
        dismissible: true,
        cancel: {
          label: (
            <Button className="bg-green-500 hover:bg-green-700" size={"sm"}>
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

  //creating the header forms dynamically
  const headerFields = Array.from({ length: headers }, (_, index) => (
    <div key={index} className="w-full">
      <div className="  md:text-lg gap-4 mb-4 text-sm  w-full bg-white   flex md:p-6 flex-col px-2 py-4 ">



        <div >
<div className=" border-secondary  md:w-[80%] md:text-lg text-sm w-full bg-white rounded-[20px] shadow-md flex flex-col p-5 border-[1px] lg:mx-auto gap-4 ">
<div className="w-full flex justify-between">
          <h1  className="font-bold text-primary underline text-xl">Header {index + 1} :</h1>
          { index > 0 &&  <Button type="button" onClick={(e) => deleteHeader(index)}>
            Annuler 
          </Button>}
        </div>

   <FormField
  control={form.control}
  name={`headers.${index}.key`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Clé</FormLabel>
      <FormControl>
        <Input placeholder="ex., Authorization" {...field}></Input>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name={`headers.${index}.value`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Valeur</FormLabel>
      <FormControl>
        <Input placeholder="ex., Bearer your-access-token" {...field}></Input>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          </div>
          </div>
      </div>
    </div>
  ));

  //creating the endpoint forms dynamically
  const endpointFields = Array.from({ length: endpoints }, (_, index) => (
    <div key={index} className="w-full">
      <div className="  md:text-lg gap-4 text-sm mb-4  w-full bg-white   flex md:p-6 flex-col px-2 py-4 ">
      <div className="w-full drop-shadow-md">
  <div className="border-secondary md:w-[80%] md:text-lg text-sm w-full bg-white rounded-[20px] shadow-md flex flex-col p-5 border-[1px] lg:mx-auto gap-4">

    <div className="w-full flex justify-between">
      <h2 className="font-bold text-primary underline text-xl">Endpoint {index + 1} :</h2>
      {index > 0 &&
        <Button type="button" onClick={(e) => deleteEndpoint(index)}>
          Annuler
        </Button>
      }
    </div>

    <FormField
      control={form.control}
      name={`endpoints.${index}.url`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Url</FormLabel>
          <FormControl>
            <Input placeholder="Exemple: /api/endpoint" {...field}></Input>
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`endpoints.${index}.method`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Méthode</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la méthode..."></SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`endpoints.${index}.description`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Exemple: Récupère les détails d'un utilisateur" {...field}></Textarea>
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`endpoints.${index}.request_body`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Corps de la requête</FormLabel>
          <FormControl>
            <Editor
              height="250px"
              language="json"
              theme="vs-dark"
              value={field.value}
              options={{
                formatOnType: true,
                minimap: { scale: 10 },
              }}
              onChange={(value, event) => {
                field.onChange(value);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`endpoints.${index}.response_body`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Corps de la réponse</FormLabel>
          <FormControl>
            <Editor
              height="250px"
              language="json"
              theme="vs-dark"
              value={field.value}
              options={{
                formatOnType: true,
                minimap: { scale: 10 },
              }}
              onChange={(value, event) => {
                field.onChange(value);
              }}

            />
          </FormControl>
        </FormItem>
      )}
    />

  </div>
</div>


      </div> 

      <p className="ml-5 font-bold text-primary"> Endpoint {index+1} : <span className="text-gray-600 text-sm font-normal ">voici le endpoint que vous avez ajouté : </span> </p>
      <div className="border-primary border  my-3">


{ form.getValues("endpoints")[index]?.method != "" && <div
        className={form.getValues("endpoints")[index]?.method==="POST" ?
        `w-full bg-[#367BC0] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden py-3`
      : form.getValues("endpoints")[index]?.method==="GET" ?
      `w-full bg-[#184173] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden py-3`
      : form.getValues("endpoints")[index]?.method==="PATCH" ?
      `w-full bg-[#50E3C2] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden py-3`
      : form.getValues("endpoints")[index]?.method==="DELETE" ?
      `w-full bg-[#F93E3E] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden py-3`
      : `w-full bg-[#000000] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden py-3`
     }
      >
          <div  >
          <div className="text-[#184173] font-bold">
           
          <div className="gap-x-5 flex items-center">
           <div className={`w-24 h-8  bg-[${getColorByMethod(form.getValues("endpoints")[index]?.method)}] text-white flex items-center justify-center rounded-[5px]`}>
           {form.watch("endpoints")[index]?.method}
           </div>
           <p>{form.watch("base_url")}{form.watch("endpoints")[index]?.url}  </p>
          </div>

          </div>
          </div>
        </div>}


      </div>
    </div>
  ));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-4 py-12 rounded-lg shadow-md w-full"
      >




<div className="text-center mb-8 bg-white border-b border-b-primary py-5">
  <h1 className="font-bold text-2xl text-primary">Création d'une Version d'API</h1>
  <p className="text-sm text-gray-500">
    Dans ce formulaire, vous allez créer une nouvelle version d'une API en fournissant des informations générales sur la version et en définissant les en-têtes et les endpoints. Veuillez remplir les champs avec attention pour assurer la création correcte de la version d'API.
  </p>
</div>





<div>
<h1  className="font-bold text-primary">Informations generales:</h1>
        <p className="text-sm text-gray-500">Veuillez remplir les détails de base de la version de l'API ci-dessous.</p>
</div>

<div className="w-full p-5 drop-shadow-md">
<div className="border-secondary md:w-[80%] md:text-lg text-sm w-full bg-white rounded-[20px] shadow-md flex flex-col p-5 border-[1px] lg:mx-auto gap-4">
  <FormField
    name="version"
    control={form.control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Version</FormLabel>
        <FormControl>
          <Input placeholder="Exemple: 1.0" {...field}></Input>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    name="base_url"
    control={form.control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Base URL</FormLabel>
        <FormControl>
          <Input placeholder="Exemple: https://api.example.com" {...field}></Input>
        </FormControl>
        <FormMessage className="text-primary">
          Veuillez entrer l'URL de base de votre API. Par exemple, <strong>https://api.example.com</strong>.
        </FormMessage>
      </FormItem>
    )}
  />
</div>

          </div>

        <div className="flex flex-col items-center justify-center md:gap-0 gap-4">
        <div className="flex w-full items-center justify-start mb-2">

  <h1  className="font-bold text-primary">Headers:</h1>
</div>
<div className="text-sm text-gray-500 mb-4 ml-1">
  Les en-têtes HTTP sont des champs clés-valeur utilisés pour spécifier les informations de la requête ou de la réponse. Ajoutez les en-têtes nécessaires pour personnaliser le comportement de votre API.
</div>

          <div className="w-full flex justify-evenly items-center flex-wrap">
            {headerFields}
          </div>

          <div className="flex w-full items-center md:px-6 justify-end">
            <Button
              type="button"
              onClick={() => {
                setHeaders((prev) => prev + 1);
              }}
            >
              Ajouter un header
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center md:gap-0 gap-4">
        <div className="flex w-full items-center justify-start mb-2">
  <h1 className="font-bold text-primary">Endpoints:</h1>
</div>
<div className="text-sm text-gray-500 mb-4 ml-1">
  Les endpoints définissent les URL et les méthodes HTTP que votre API prend en charge. Chaque endpoint représente une fonctionnalité spécifique de votre API. Ajoutez ou supprimez des endpoints selon les besoins de votre application.
</div>

          <div className="w-full flex justify-evenly items-center flex-wrap">
            {endpointFields}
          </div>

 

            
          <div className="flex w-full items-center md:px-6 justify-end">
            <Button
              type="button"
              onClick={() => {
                setEndpoints((prev) => prev + 1);
              }}
            >
              Ajouter un endpoint
            </Button>
          </div>
        </div>


        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting
            ? "Création en cours"
            : "Créer la version"}
        </Button>
      </form>
    </Form>
  );
}

export default CreateApiVersionForm;
