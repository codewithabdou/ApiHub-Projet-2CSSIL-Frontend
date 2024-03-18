import React from "react";
import AdminUsersDataTable from "@app/components/Admin/Users management/data-table";
import getUsers from "@services/api/getUsers";
import type {Category} from "@typings/entities/User";
import {
  ErrorGetUsersResponse,
  SuccessGetUsersResponse,
} from "@typings/api/getUsers";
import Pagination from "@typings/api/pagination";
import Image from "next/image";
import { IMAGES } from "@config";
import Link from "next/link";
import { Button } from "@app/components/ui/button";
import AdminCategoriesDataTable from "@app/components/Admin/Categories management/dataTable";
import { sucessGetCategoriesResponse } from "@typings/api/createCategoryType";
import { getCategories } from "@services/api/categories";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const data = await getCategories(page);

  let Categories : Category[] = [];
  let pagination: Pagination = {
    page: Number(page),
    per_page: 10,
    total: 0,
    pages: 0,
  };
  if (data.status === "success") {
    const categoriesData = data as sucessGetCategoriesResponse
    Categories = categoriesData.data;
    // pagination = categoriesData.pagination;
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
        <Link href={`/admin/users`}>
          <Button>Go to first page</Button>
        </Link>
      </div>
    );
  }
  return <AdminCategoriesDataTable data={Categories} pagination={pagination} />;
};

export default page;