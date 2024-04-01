"use client";
import GetSingleSupplier from "@services/api/getSingleSupplier";
import getSupplierAPIs from "@services/api/getSupplierApis";
import User from "@typings/entities/User";
import React, { useEffect, useState } from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import Image from "next/image";
import { Textarea } from "../../../ui/textarea";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";

const SingleUser = ({ idSupplier }: { idSupplier: string }) => {
  const [supplierAPI, setSupplierAPI] = useState<
    SuccessGetAPIsResponse | ErrorGetAPIsResponse
  >();

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getSupplierAPIs("1");

      if (response.status === "success") {
        const UserAPI = response as SuccessGetAPIsResponse;
        console.log(UserAPI.data);
        console.log(UserAPI.pagination);
      } else {
        const errorData = response as ErrorGetAPIsResponse;
        console.log(errorData.message);
        console.log(errorData.status);
      }
    };
    fetchAPI();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data: User | null = await GetSingleSupplier(idSupplier);
      setUser(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="bg-white  lg:px-20 px-8 py-12 rounded-lg shadow-md w-full md:w-1/2 gap-16   align-top ">
        <h1 className="text-primary text-xl lg:text-4xl font-bold align-top mb-9">
          Information personnels :
        </h1>

        <div className="InfoPersonnel lg:grid lg:grid-cols-2 grid gap-5 ">
          <div className="image flex flex-col mx-auto">
            {user && (
              <Image src={user?.avatar} width={200} height={200} alt="Avatar" />
            )}
          </div>

          <div className="info flex flex-col gap-5 ">
            <div className="flex gap-5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="prenom">Prenom</Label>
                <Input
                  id="prenom"
                  value={user?.firstname}
                  placeholder="Prenom"
                  disabled
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={user?.lastname}
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
                    value={user?.email}
                    placeholder="Email"
                    disabled
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="phone_number">Numero de telephone</Label>
                  <Input
                    id="phone_number"
                    value={user?.phone_number}
                    placeholder="phone_number"
                    disabled
                  />
                </div>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="bio">Bio</Label>

                <Textarea value={user?.bio} placeholder="Bio" disabled />
              </div>
            </div>
          </div>
        </div>

        <div className="ApiPublier"></div>
      </div>
    </div>
  );
};

export default SingleUser;
