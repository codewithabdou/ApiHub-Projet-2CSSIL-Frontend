import React from "react";
import getSuppliers from "@services/api/getSuppliers";
import type User from "@typings/entities/User";
import {
  ErrorGetUsersResponse,
  SuccessGetUsersResponse,
} from "@typings/api/getUsers";
import Pagination from "@typings/api/pagination";
import Image from "next/image";
import { IMAGES } from "@config";
import Link from "next/link";
import { Button } from "@app/components/ui/button";
import AdminSuppliersDataTable from "@app/components/Admin/SuppliersManagement/data-table";
import { IoMdAddCircleOutline } from "react-icons/io";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const data = await getSuppliers(page);
  let users: User[] = [];
  let pagination: Pagination = {
    page: Number(page),
    per_page: 10,
    total: 0,
    pages: 0,
  };
  if (data.status === "success") {
    const usersData = data as SuccessGetUsersResponse;
    users = usersData.data;
    pagination = usersData.pagination;
  } else {
    const errorData = data as ErrorGetUsersResponse;
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <Image
          src={IMAGES.SEARCH_ERROR}
          alt="Search error"
          width={300}
          height={300}
        />
        <p className="text-center text-sm bg-red-200 rounded-md max-w-[40ch] text-red-600 p-2">
          {errorData.message}
        </p>
        <Link href={`/admin/suppliers`}>
          <Button>Go to first page</Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      {" "}
      <div className="flex p-4 justify-between">
        <h1 className="font-bold lg:text-3xl text-2xl">
        Gestion des Fournisseurs
        </h1>
        <Link href="/admin/suppliers/addsupplier">
          <Button>
            <IoMdAddCircleOutline size={20} className="mr-2" /> Créer un nouveau
            Fournisseur
          </Button>
        </Link>
      </div>{" "}
      <AdminSuppliersDataTable data={users} pagination={pagination} />
    </div>
  );
};

export default page;
