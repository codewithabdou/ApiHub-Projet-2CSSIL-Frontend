"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  createDiscussionSchema,
  createDisscussionRequest,
} from "@typings/api/disscussionTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import createDisscussion from "@services/api/apiPage/createDisscussion";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { TicketForm, ticketFormRequest } from "@typings/api/createTicketType";
import createTicket from "@services/api/createTicketApi";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
function AddTicketFormPanel(props: any) {

  const filter = {
    label: "type de probleme",
    options: [
      "probleme de retour",
      "probleme de service",
      "probleme de qualité",
      "probleme de connexion",
      "probleme de  livraison",
      "probleme de facturation",
      ]}

  const form = useForm<ticketFormRequest>({
    resolver: zodResolver(TicketForm),
    defaultValues: {
      sujet: "",
      description: "",
    },
  });

  const [isUrgent, setIsUrgent] = React.useState<string>("normal");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: ticketFormRequest) => {
    setIsLoading(true);
    const result = await createTicket(values);
    if (result) {
      form.reset();
      toast("Message", {
        description: "Ticket ajoutée",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else {
      toast("Message", {
        description: result,
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    }
    setIsLoading(false);
  }

  // async function onSubmit(values: createDisscussionRequest) {
  //   console.log(values);

  //   const result: any = await createDisscussion(values, props.id);
  //   if (result.data) {
  //     form.reset();
  //     toast("Message", {
  //       description: "Discussion ajoutée",
  //       action: {
  //         label: "Ok",
  //         onClick: () => null,
  //       },
  //     });
  //   } else {
  //     toast("Message", {
  //       description: result.message,
  //       action: {
  //         label: "Ok",
  //         onClick: () => null,
  //       },
  //     });
  //   }
  // }

  return (
    <div className="flex justify-end">
      <Sheet>
        <SheetTrigger>
          <Button className="sm:w-64 w-48 text-sm bg-red-500 text-white">
            Signaler un probleme
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[200px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Demander un ticket</SheetTitle>

            <SheetDescription>

    <Form  {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white  space-y-4 px-2 py-12 rounded-lg "
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
              <Input placeholder="sujet du ticket"  {...field} />
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
      </Button>
    </form>
  </Form>




            </SheetDescription>

          </SheetHeader>
        </SheetContent>
      </Sheet>{" "}
    </div>
  );
}

export default AddTicketFormPanel;
