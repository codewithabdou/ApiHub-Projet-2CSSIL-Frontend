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

const page = ({
  params: { idsupplier },
}: {
  params: { idsupplier: string };
}) => {
  const [supplierAPI, setSupplierAPI] = useState<API[]>();
  const [pagination, setPagination] = useState<Pagination>();

  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetSingleSupplier(Number(idsupplier));

      setUser(res);
    };
    fetchData();
  }, [idsupplier]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAPIs({ supplierId: Number(idsupplier) });

      if (data.status !== "error") {
        const apiData = data as SuccessGetAPIsResponse;
        // fetchedapis  = apiData.data;
        setSupplierAPI(apiData.data);
        let pagination: Pagination = apiData.pagination;
        setPagination(apiData.pagination);
      } else {
        const errorData = data as ErrorGetAPIsResponse;
        return (
          <div className="flex flex-col gap-6 justify-center items-center">
            <p className="text-center text-sm bg-red-200 rounded-md max-w-[40ch] text-red-600 p-2">
              {errorData.message}
            </p>
          </div>
        );
      }
    };

    fetchData();
  }, [idsupplier]);

  return (
    <div>
      <main className="  flex min-h-screen flex-col items-start mt-5 px-4 lg:px-[5%]">
        <div className="w-full ">
          {/* <h1 className=" text-2xl md:text-4xl mb-6 font-bold"> 
            {" "}
            <span className="text-primary"> Fournisseur : </span>{" "}
            {user?.lastname} {user?.lastname}
          </h1> */}
        </div>
        <div className="bg-white  lg:px-20 px-8 py-4 rounded-lg shadow-md max-w-full   gap-16   align-top ">
          <div>
            <h1 className="text-primary text-xl lg:text-4xl font-bold align-top mb-9">
              Information personnels :
            </h1>

            <div className="InfoPersonnel lg:grid lg:grid-cols-2 grid gap-5 ">
              <div className="image flex flex-col mx-auto">
                {user && (
                  <Image
                    src={user?.avatar}
                    width={200}
                    height={200}
                    alt="Avatar"
                  />
                )}
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
            <h1 className="text-primary text-xl lg:text-4xl font-bold align-top mb-9">
              APIs publiées:
            </h1>

            <div className="w-full flex justify-center items-center">
              <Carousel className="w-10/12">
                <CarouselContent>
                  {supplierAPI && supplierAPI?.length ? (
                    supplierAPI.map((api, index) => (
                      <CarouselItem
                        key={index}
                        className="    md:w-1/2 lg:w-1/3 flex   justify-center gap-4 w-full md:pl-4 md:basis-1/2 lg:basis-1/3"
                      >
                        <Card className="w-[250px] h-[300px] flex flex-col justify-between">
                          <CardHeader className="h-[80px] flex flex-row gap-4 items-center">
                            <div>
                              <Avatar>
                                <AvatarImage src={api.image} alt="@api" />
                                <AvatarFallback>Api</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <CardTitle className="text-center ">
                                {api.name}
                              </CardTitle>
                              <CardDescription className="text-center ">
                                {api.category.name}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="h-[120px] overflow-y-auto">
                            <div className="max-w-full text-foreground">
                              {api.description}
                            </div>
                          </CardContent>
                          <CardFooter className="h-[100px] flex justify-center items-center">
                            <Button variant="default">Voir</Button>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))
                  ) : (
                    <div className="text-center w-full">
                      Aucune API publiée par ce fournisseur
                    </div>
                  )}
                </CarouselContent>
                {supplierAPI && supplierAPI.length > 0 && (
                  <div>
                    <CarouselPrevious className="bg-white/50 border-white/50 z-50" />
                    <CarouselNext className="bg-white/50 border-white/50 z-50" />
                  </div>
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
