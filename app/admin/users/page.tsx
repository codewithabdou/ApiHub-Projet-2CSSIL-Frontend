import React from "react";
import AdminUsersDataTable from "@app/components/Admin/Users management/data-table";
import getUsers from "@services/api/getUsers";
import type User from "@typings/entities/User";
import { SuccessGetUsersResponse } from "@typings/api/getUsers";
import Pagination from "@typings/api/pagination";
import Image from "next/image";
import { IMAGES } from "@config";
import { Button } from "@app/components/ui/button";
import  Link  from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const data = await getUsers(page);
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
    return (
      <div className="flex flex-col gap-6 justify-center py-[10%] items-center">
        <Image
          src={IMAGES.SEARCH_ERROR}
          alt="Search error"
          width={300}
          height={300}
        />
        <Link href={`?page=1`}>
          <Button>Go to first page</Button>
        </Link>
      </div>
    );
  }
  return <AdminUsersDataTable data={users} pagination={pagination} />;
};

export default page;
