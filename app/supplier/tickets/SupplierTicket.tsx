'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@app/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@app/components/ui/avatar';
import { Button } from '@app/components/ui/button';
import { 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, Form } from '@app/components/ui/form';
import { Input } from '@app/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@app/components/ui/select';
import { Textarea } from '@app/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import createTicket from '@services/api/createTicketApi';
import replyToTicket from '@services/api/replyToTicketApi';
import { TicketForm, TicketReplyForm, ticketFormRequest, ticketReplyFormRequest } from '@typings/api/createTicketType';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GiCancel } from 'react-icons/gi';
import { MdDone } from 'react-icons/md';
import { toast } from 'sonner';


const SupplierTicket = ({ title, description, dateCreate, status, solution , id , apiId , user}: {user:{firstname:string , lastname:string} ,  apiId:number ,  title: string; description: string; dateCreate: string; status: string; solution?: string , id:number }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
      const form = useForm<ticketReplyFormRequest>({
        resolver: zodResolver(TicketReplyForm),
        defaultValues: {
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

  const filter = {
    label: "Status du ticket ",
    options: [
      "Open", "Closed", "In progress"
      ]}


      async function onSubmit(values: ticketReplyFormRequest) {
        console.log(values);
        setIsLoading(true);
        const result = await replyToTicket(values , apiId , id );
        console.log('result', result)
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

  const statusColor = (status: string) => {
    if (status === 'open') {
      return 'bg-green-500';
    } else if (status === 'closed') {
      return 'bg-red-500';
    } else if (status === 'In progress') {
      return 'bg-yellow-500';
    }
  };

  return (
    <div className="rounded-sm flex flex-col border-2 h-fit py-4 gap-2 mx-10 relative bg-white">
        
      <div className="flex flex-row gap-4 justify-center items-center px-4">
      <p className="px-6 text-gray-500 text-sm">Created at: {dateCreate}</p>

        <div className="font-semibold text-gray-500">#{id}</div>
        <div className={`w-20 rounded-lg text-center py-1 h-6 text-white font-semibold text-xs ${statusColor(status)}`}>{status}</div>
        <div className="ml-auto flex flex-row gap-2 justify-center items-center">
          <p className="font-normal text-gray-500">{user.firstname} {user.lastname} </p>
        </div>
      </div>

      <div className="flex flex-col px-6 border-b-2 border-b-gray-300 mx-2 pb-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-gray-700 break-words">{description}</p>
      </div>

      <div className="flex flex-row justify-between px-8 items-center">
      </div>

     
        { (status != "closed" ) &&<Accordion type="single" collapsible  className="px-6  ml-6 mt-0">
          <AccordionItem value="item-1">
            <AccordionTrigger  className="text-gray-600 ml-auto">Répondre au ticket</AccordionTrigger>
            <AccordionContent>


            <Form  {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white flex flex-col gap-2 "
      >
        <div>
        </div>

      <FormField
        control={form.control}
        name="response"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Réponse</FormLabel>
            <FormControl>
              <Textarea placeholder="Réponse...." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    
  
      <Button disabled={isLoading} type="submit">
        {isLoading ? "Chargement..." : "Envoyer la reponse "}
      </Button>{" "}
    </form>
  </Form>


            </AccordionContent>
          </AccordionItem>
        </Accordion>
        }
    </div>
  );
};

export default SupplierTicket;
