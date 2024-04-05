"use client";
import { getLoggedInUser } from "@services/authentication.service";
import User from "@typings/entities/User";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@app/components/ui/form";
import { useForm } from "react-hook-form";
import {
  UpdateAdminProfileRequest,
  UpdateProfileAdminSchema,
} from "@typings/api/AdminProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@app/components/ui/input";
import { Textarea } from "@app/components/ui/textarea";

import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import { UpdateProfile } from "@services/api/updateProfile";
import { toast } from "sonner";
import { Button } from "@app/components/ui/button";
import { GiCancel } from "react-icons/gi";
import { MdDone } from "react-icons/md";

const AdminProfile = () => {
  const formSchema = UpdateProfileAdminSchema;

  let [user, setUser] = useState<User | null>(null);

  const defaultValues = {
    email: user?.email || "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    bio: user?.bio || "",
    phone_number: user?.phone_number || "",
  };

  useEffect(() => {
    (async () => {
      await getLoggedInUser().then((user) => {
        setUser(user);
        if (user !== null) {
          console.log(user);
          form.reset(user);
        }
      });
    })();
  }, []);

  const form = useForm<UpdateAdminProfileRequest>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function handleSubmit(values: UpdateAdminProfileRequest) {
    const result = await UpdateProfile(values);

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
      toast.success(result.status, {
        description: result.message,
        position: "top-right",
        dismissible: true,

        cancel: {
          label: (
            <Button variant={"default"} size={"sm"}>
              OK
            </Button>
          ),
          onClick: () => {
            toast.dismiss();
          },
        },
        icon: (
          <MdDone className=" aspect-square hover:bg-opacity-0 p-[0.5px] rounded-full text-white bg-green-500" />
        ),
      });
    }
  }

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-evenly p-4 lg:p-[10%] ">
        <div className="w-full ">
          <h1 className=" text-2xl md:text-4xl mb-6 font-bold">Profile</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md w-full "
          >
            <div className="col-span-1">
              <div className=" flex flex-col   ">
                <Avatar className=" md:w-45 md:h-45 w-40 h-40   mx-auto">
                  <AvatarImage src={user?.avatar} className="w-full" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="col-span-1">
              <div className="flex flex-col gap-6">
                <div className=" block gap-6 md:flex">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom :</FormLabel>

                        <FormControl>
                          <Input {...field}></Input>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom :</FormLabel>

                        <FormControl>
                          <Input {...field}></Input>
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
                        <FormLabel>Email :</FormLabel>

                        <FormControl>
                          <Input disabled type="email" {...field}></Input>
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
                      <FormLabel>Bio :</FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Votre bio"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numero de telephone :</FormLabel>

                      <FormControl>
                        <Input placeholder="N telephone" {...field}></Input>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="flex mx-auto w-40 md:w-60 mt-6" type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AdminProfile;
