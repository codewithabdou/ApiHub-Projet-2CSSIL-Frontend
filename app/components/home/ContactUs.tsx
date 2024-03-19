'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { ContactUsRequest, SendContactusSchema } from '@typings/api/ContactUs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';
import { IMAGES } from '@config';
import Image from 'next/image';

const ContactUs = () => {

   const formSchema = SendContactusSchema;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<ContactUsRequest>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        NomComplet: "",
        Objet: "",
        Email: "",
        Detail: "",
      },
    });
  
    async function onSubmit(values: ContactUsRequest) {
      setIsLoading(true);
    
     
    }
    return (


        <>
<div className="flex mb-3">

<h1 className="text-3xl font-bold self-end">Contactez nous</h1>

<Image
  className="object-contain scale-110 ml-auto" 
  src={IMAGES.Contactus[0].ContactUs}
  width={291}
  height={385}
  alt="ContactezNous"
/>
</div>
<Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white px-8 py-12 rounded-lg shadow-md w-full md:w-1/2 grid grid-cols-2 gap-6"
          >
            <div className="col-span-1">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="NomComplet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet </FormLabel>
                      <FormControl>
                        <Input placeholder="ex : Jhon Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Objet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objet</FormLabel>
                      <FormControl>
                        <Input placeholder="Objet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email : </FormLabel>
                      <FormControl>
                        <Input placeholder="Votre email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detail: </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Entrer les details ici"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormDescription />
            <Button disabled={isLoading} type="submit" className="col-span1">
              {isLoading ? "Chargement..." : "Envoyer"}
            </Button>{" "}
          </form>
        </Form>
        </>
      );
}

export default ContactUs