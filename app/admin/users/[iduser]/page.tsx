"use client";

import User from "@typings/entities/User";
import GetSingleSupplier from "@services/api/getSingleSupplier";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import Image from "next/image";
import { Textarea } from "@app/components/ui/textarea";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import { API } from "@typings/entities/API";
import Pagination from "@typings/api/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Select } from "@radix-ui/react-select";
import { Button } from "@app/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/components/ui/carousel";
import { useEffect, useState } from "react";
import getAPIs from "@services/api/getApisByParams";

const UserAccountPage = ({
  params: { iduser },
}: {
  params: { iduser: string };
}) => {

  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetSingleSupplier(Number(iduser));

      setUser(res);
    };
    fetchData();
  }, [iduser]);


  return (
    <div>
      <main className="  flex  flex-col items-center justify-evenly p-4 px-[10%] ">
        <div className="w-full ">
          <h1 className=" text-2xl md:text-4xl mb-6 font-bold">
            {" "}
            <span className="text-primary"> Utilisateur : </span>{" "}
            {user?.lastname} {user?.lastname}
          </h1>
        </div>
        <div className="bg-white border border-secondary lg:px-20 px-8 py-12 rounded-lg shadow-md max-w-full   gap-16   align-top ">
          <div>
            <h1 className="text-primary text-lg lg:text-2xl font-bold align-top mb-9">
              Information personnels :
            </h1>

            <div className="InfoPersonnel lg:grid lg:grid-cols-2 grid gap-5 ">
              <div className="image flex flex-col mx-auto">


<Label htmlFor="prenom"> Image de profile : </Label>
<Avatar className=" w-[200px] h-[200px] border-[3px] border-primary mt-3 ">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="size-full">
                   
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="info flex flex-col gap-5 ">
                <div className="flex gap-5">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="prenom">Prenom</Label>
                    <Input
                      id="prenom"
                      value={user?.firstname ?? ""}
                      placeholder="Prenom"
                      disabled
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      value={user?.lastname ?? ""}
                      placeholder="Nom"
                      disabled
                    />
                  </div>
                </div>

                <div className="others flex flex-col gap-5">
                  <div className="emailEtnumero flex gap-5">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={user?.email ?? ""}
                        placeholder="Email"
                        disabled
                      />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="phone_number">Numero de telephone</Label>
                      <Input
                        id="phone_number"
                        value={user?.phone_number ?? ""}
                        placeholder="phone_number"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="bio">Bio</Label>

                    <Textarea
                      value={user?.bio ?? ""}
                      placeholder="Bio"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAccountPage;
