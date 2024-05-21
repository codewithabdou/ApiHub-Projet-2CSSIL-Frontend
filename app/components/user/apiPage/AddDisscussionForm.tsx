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
} from "../../ui/sheet";
import { Button } from "../../ui/button";
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
} from "../../ui/form";
import { Input } from "../../ui/input";
import createDisscussion from "@services/api/apiPage/createDisscussion";
import { toast } from "sonner";
import { Textarea } from "../../ui/textarea";
function AddDisscussionForm(props: any) {
  const form = useForm<createDisscussionRequest>({
    resolver: zodResolver(createDiscussionSchema),
    defaultValues: {
      title: "",
      question: "",
    },
  });
  async function onSubmit(values: createDisscussionRequest) {
    console.log(values);

    const result: any = await createDisscussion(values, props.id);
    if (result.data) {
      form.reset();
      toast("Message", {
        description: "Discussion ajoutée",
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    } else {
      toast("Message", {
        description: result.message,
        action: {
          label: "Ok",
          onClick: () => null,
        },
      });
    }
  }
  return (
    <div className="flex justify-end">
      <Sheet>
        <SheetTrigger>
          <Button className="sm:w-64 w-48 text-sm">
            Ouvrir une disscussion
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[200px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Nouvelle disscussion</SheetTitle>
            <SheetDescription>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md w-full"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Titre de la discussion"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question:</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Question"
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SheetClose>
                    <Button type="submit">Créer la discussion</Button>
                  </SheetClose>
                </form>
              </Form>
              
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>{" "}
    </div>
  );
}

export default AddDisscussionForm;
