'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@app/components/ui/avatar';
import { Button } from '@app/components/ui/button';
import React ,  { useEffect, useRef, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@app/components/ui/form"
  import { Input } from "@app/components/ui/input"
import { toast } from "sonner";
import { Textarea } from '@app/components/ui/textarea';
import { getLoggedInUser } from '@services/authentication.service';
import User from '@typings/entities/User';
//todo : get the user from the backend , and update it.


  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email : z.string().email(),
    
    location: z.string(),
    bio: z.string(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  
  const ProviderProfile = () => {
      const [image , setImage] = useState<string |undefined>("");
      let [user, setUser] = useState<User | null>(null);
      let [edditing, setEdditing] = useState(false);


      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userData = await getLoggedInUser();
            console.log( userData)
            setUser(userData);
            
            setImage(userData["avatar:"]);
            console.log('userData', userData)
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchUserData(); 
      }, []); 




    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        //   username: "",
        },
      })

      function onSubmit(data: z.infer<typeof FormSchema>) {
        //todo : send data to backend to update it .
        console.log(data)
      }
      const upload = (e : any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
            //@ts-ignore
          setImage(reader.result);
        };
        // Read the selected file as a Data URL
        reader.readAsDataURL(file);
    
      };

    return (
        <div className='flex flex-col h-full p-8 gap-8'>
            <h1 className='text-3xl font-bold'>Mon Profile</h1>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>


            <div className='flex flex-col bg-white xl:px-40 xl:py-10 rounded-xl'>
                <div className='flex flex-col lg:flex-row justify-center gap-8'>
                    {/* //todo : modify the image + add image */}
                    <div className='mx-auto lg:size-1/5 lg:mt-10 flex flex-col gap-3 text-primary'>
                    <Avatar className="size-full border-[3px] border-primary">
                        <AvatarImage src={image}  />
                        <AvatarFallback  className='size-full'>profile image</AvatarFallback>
                    </Avatar>
                        <div className='w-full h-6 relative'>
                        <Input type='file' className='file:hidden opacity-0 absolute top-0' onChange={upload}></Input>

                            <p className='text-center hover:underline'> upload image </p> 
                            <p className='text-center hover:underline'> {user?.avatar} </p> 
                        </div>

                            <div className="card flex justify-content-center">

            </div>  
                         
                            </div>
                    <div className='flex-auto flex-col flex p-5 gap-4'>
                        <div className="lg:flex-row flex-col flex gap-3 w-full">

                          

<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl >
                <Input placeholder="username"  {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="email"  {...field}  defaultValue={user?.email}disabled={ edditing ? false : true} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emplacement</FormLabel>
              <FormControl>
                <Input placeholder="emplacement" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
                     
                                </div> 
                         
<FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                        <Textarea placeholder="bio" {...field}  defaultValue={user?.bio}disabled={ edditing ? false : true} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

<FormField
            control={form.control}  
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
            {edditing ? <div className='flex flex-row gap-2 justify-end'> 
            <Button onClick={() => setEdditing(false)} className='max-w-32 px-5 ' variant={'outline'}> Annuler </Button>
            <Button className='max-w-32 px-5 '> Enregistrer </Button>

             </div> : <Button onClick={() => setEdditing(true)} className='max-w-32 px-5 mx-auto'> Editer </Button> }
                    </div>
                </div>
            </div>
            </form>
                </Form>
        </div>
    );
}

export default ProviderProfile;
