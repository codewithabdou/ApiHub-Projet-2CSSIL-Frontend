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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const filter = {
  label: "Type de problème",
  options: [
    "probleme technique",
    "probleme de paiement",
  ],
};
function AddTicketFormPanel({ apiId }: { apiId: number }) {
  const form = useForm<ticketFormRequest>({
    resolver: zodResolver(TicketForm),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (values: ticketFormRequest) => {
    setIsLoading(true);
    const result = await createTicket(values, apiId);
    if (result) {
      form.reset();
      toast("Message", {
        description: "Problème signalé",
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
  };

  return (
    <div className="flex justify-end">
      <Sheet>
        <SheetTrigger>
          <Button className="sm:w-64 w-48 text-sm bg-red-500 text-white">
            Signaler un problème
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[200px] p-5 sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Signaler un problème</SheetTitle>

            <SheetDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-white  space-y-4 p-5 rounded-lg border border-secondary"
                >
                  <div>
                    <h2 className="font-semibold text-black">Remarque:</h2>
                    <p className="font-light">
                    Veuillez expliquer bien votre problème, votre signalement va etre traité par le fournisseur consérné.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Thème du problème : </FormLabel>
                        <FormControl>
                          <Input placeholder="Thème du problème" {...field} />
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
                        <FormLabel className="text-black">Description du problème </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description ...." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Type du problème </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(e) => form.setValue("type", e)}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>{filter.label}</SelectLabel>
                                {filter.options.map((option) => (
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

                  <Button disabled={isLoading} type="submit">
                    {isLoading ? "Chargement..." : "Envoyer le ticket "}
                  </Button>
                </form>
              </Form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AddTicketFormPanel;
