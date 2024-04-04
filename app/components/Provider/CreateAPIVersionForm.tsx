"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAPIVersionRequest,
  createApiVersionFormSchema,
} from "@typings/api/createAPIVersionForm";
import React, { useState } from "react";
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

import { useParams } from "next/navigation";

import { createApiVersion } from "@services/api/createApiVersion";

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
  //Submit function that uses the backend API
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
      toast.success("Success", {
        description: "La version a été créée avec succès",
        position: "top-right",
        dismissible: true,
        duration: 5000,
        cancel: {
          label: (
            <Button
              onClick={(e) => router.push("/supplier/apis")}
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
      });
      form.reset();
    }
  }

  //creating the header forms dynamically
  const headerFields = Array.from({ length: headers }, (_, index) => (
    <div key={index} className="w-full md:p-6">
      <div className="  md:text-lg gap-4 mb-4 text-sm  w-full bg-white shadow-md  flex md:p-6 flex-col px-2 py-4 border-[1px]">
        <div className="w-full flex justify-between">
          <h1>Header {index + 1} :</h1>
          <Button type="button" onClick={(e) => deleteHeader(index)}>
            Annuler
          </Button>
        </div>

        <FormField
          control={form.control}
          name={`headers.${index}.key`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clé</FormLabel>
              <FormControl>
                <Input placeholder="Clé" {...field}></Input>
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
                <Input placeholder="Valeur" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  ));

  //creating the endpoint forms dynamically
  const endpointFields = Array.from({ length: endpoints }, (_, index) => (
    <div key={index} className="w-full md:p-6">
      <div className="  md:text-lg gap-4 text-sm mb-4  w-full bg-white  shadow-md  flex md:p-6 flex-col px-2 py-4 border-[1px]">
        <div className="w-full flex justify-between">
          <h2>Endpoint {index + 1} :</h2>
          <Button type="button" onClick={(e) => deleteEndpoint(index)}>
            Annuler
          </Button>
        </div>

        <FormField
          control={form.control}
          name={`endpoints.${index}.url`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Url" {...field}></Input>
              </FormControl>
              <FormMessage />
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
                    <SelectValue placeholder="La méthode ..."></SelectValue>
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
              <FormMessage />
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
                <Textarea placeholder="Description" {...field}></Textarea>
              </FormControl>
              <FormMessage />
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
                <Textarea
                  placeholder="Corps de la requête"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
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
                <Textarea
                  placeholder="Corps de la réponse"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  ));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-4 py-12 rounded-lg shadow-md w-full"
      >
        <h1 className="font-bold">Informations generales:</h1>
        <FormField
          name="version"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input placeholder="Version" {...field}></Input>
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
                <Input placeholder="Base URL" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center justify-center md:gap-0 gap-4">
          <div className="flex w-full items-center justify-start">
            <h1 className="font-semibold">Headers:</h1>
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
          <div className="flex w-full items-center justify-start">
            <h1 className="font-semibold">Endpoints:</h1>
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
