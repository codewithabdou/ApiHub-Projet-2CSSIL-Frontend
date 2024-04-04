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
} from "../ui/form";
import { toast } from "sonner";
import {
  categoryRequest,
  createCategorySchema,
  errorCreateCategoryResponse,
} from "@typings/api/createCategoryType";
import { Textarea } from "@app/components/ui/textarea";
import { MdDone } from "react-icons/md";
import createCategory from "@services/api/createCategory";
import { useState } from "react";
import { Button } from "../ui/button";
import { GiCancel } from "react-icons/gi";
import { Input } from "../ui/input";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export const TicketForm = z.object({
    sujet: z.string().min(10, {
      message: "Please enter a valid category name.",
    }),
    description: z.string().min(50, {
      message: "Please enter a valid category description (50 caracters minimum).",
    }),
    typeDuProbleme: z.string().min(10, {
        message: "Please enter your problem's type ",
        }),
    prioriteDuTicket: z.string().min(2, {
        message: "Please enter the priority of your ticket",
        }),
  });
  export type ticketFormRequest = z.infer<typeof TicketForm>;

const TicketDemandForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<ticketFormRequest>({
        resolver: zodResolver(TicketForm),
        defaultValues: {
          sujet: "",
          description: "",
        },
      });

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
  const [isUrgent, setIsUrgent] = useState("");

  const filter = {
    label: "type de probleme",
    options: [
        "probleme de connexion",
        "probleme de facturation",
        "probleme de service",
        "probleme de livraison",
        "probleme de qualité",
        "probleme de retour",]}


      async function onSubmit(values: ticketFormRequest) {
        console.log(values);
        setIsLoading(true);
        // const result = await createCategory(values);
        const result = {status: "success"};
        if (result.status !== "success") {
          errorToaster(result.status, "error while submitting ticket");
        } else {
          if (result.status === "success") {
            toast.success(result.status, {
              description: "ticket succesfully submitted. ",
              position: "top-right",
              dismissible: true,
      
              icon: (
                <MdDone className=" aspect-square hover:bg-opacity-0 p-[0.5px] rounded-full text-white bg-green-500" />
              ),
            });
            form.reset();
          }
          setIsLoading(false);
          form.reset();
        }
        setIsLoading(false);
      }

  return (<>
    <Form  {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white  space-y-4 px-8 py-12 rounded-lg shadow-md w-full md:w-1/2 mx-auto my-10"
      >
        <div>
        <h2 className="font-semibold">Créer un ticket</h2>
        <p className="font-light">Rédigez et adressez de nouvelles requêtes et problèmes</p>
        </div>
      <FormField
        control={form.control}
        name="sujet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sujet du ticket : </FormLabel>
            <FormControl>
              <Input placeholder="sujet du ticket" {...field} />
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
            <FormLabel>description du probleme </FormLabel>
            <FormControl>
              <Textarea placeholder="description ...." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="typeDuProbleme"
        render={({ field }) => (
          <FormItem>
            <FormLabel>type du probleme </FormLabel>
            <FormControl>
            <Select  onValueChange={(e)=>form.setValue("typeDuProbleme" , e)} >
                    <SelectTrigger className="">
                        <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>{filter.label}</SelectLabel>
                            {filter.options.map(option => (
                                <SelectItem key={option} value={option}>
                                {option}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                        </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="prioriteDuTicket"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priorite du ticket </FormLabel>
            <FormControl>

                <div className="flex flex-row gap-5">
                    <Button variant={isUrgent === "urgent" ? 'destructive' : 'outline'} size="sm" onClick={(e) => {
                        e.preventDefault();
                        setIsUrgent("urgent")
                        form.setValue("prioriteDuTicket", "urgent")
                    }
                    }
                    >Urgent</Button>
                    <Button variant={isUrgent === "normal" ? 'secondary' : 'outline'} size="sm" onClick={(e) => {
                        e.preventDefault();
                        setIsUrgent("normal")
                        form.setValue("prioriteDuTicket", "normal")
                    }
                    
                    
                    }
                        >Normal</Button>
                </div>

            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={isLoading} type="submit">
        {isLoading ? "Chargement..." : "Envoyer le ticket"}
      </Button>{" "}
    </form>
  </Form>
  </>
  )
}

export default TicketDemandForm