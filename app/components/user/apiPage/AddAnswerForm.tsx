"use client"
import React from 'react'
import { Button } from '../../ui/button'
import { useForm } from 'react-hook-form';
import { createAnswerSchema, createAnswerRequest } from '@typings/api/disscussionTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Textarea } from '../../ui/textarea';
import createAnswer from '@services/api/apiPage/createAnswer';
import { toast } from 'sonner';
function AddAnswerForm(props:any) {
    const form = useForm<createAnswerRequest>({
        resolver: zodResolver(createAnswerSchema),
        defaultValues: {
          answer: "",
        },
      });
      async function onSubmit(values:createAnswerRequest){
        console.log(values);
           const result:any= await createAnswer(values,props.apiId,props.id);
           if (result.data) {
           form.reset();
           toast("Message", {
            description: "Réponse ajoutée",
            action: {
              label: "Ok",
              onClick: () => null,
            }}
      )
              
          } else {
            toast("Message", {
              description: result.message,
              action: {
                label: "Ok",
                onClick: () => null,
              }}
        )
            
      }}
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md sm:w-2/3 w-full"
    >
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Répondre:</FormLabel>
            <FormControl>
              <Textarea 
                rows={5} // Adjust the number of rows as needed
                cols={50} // Adjust the number of columns as needed
               placeholder="Ecrire une réponse" {...field}></Textarea>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    
      <Button type="submit">Envoyer</Button>
    </form>
    </Form>
  )
}

export default AddAnswerForm