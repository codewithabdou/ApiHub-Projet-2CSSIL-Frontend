import React from "react";
import type { Category } from "@typings/entities/User";
import { ErrorGetUsersResponse } from "@typings/api/getUsers";
import Pagination from "@typings/api/pagination";
import Image from "next/image";
import { IMAGES } from "@config";
import Link from "next/link";
import { Button } from "@app/components/ui/button";
import AdminCategoriesDataTable from "@app/components/Admin/Categories management/dataTable";
import { sucessGetCategoriesResponse } from "@typings/api/createCategoryType";
import getCategories from "@services/api/getCategoriesByParams";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const data = await getCategories();

  let Categories: Category[] = [];
  let pagination: Pagination = {
    page: Number(page),
    per_page: 10,
    total: 1,
    pages: 1,
  };
  if (data.status === "success") {
    const categoriesData = data as sucessGetCategoriesResponse;
    Categories = categoriesData.data as Category[];
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
        <Link href={`/admin/categories`}>
          <Button>Go to first page</Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <AdminCategoriesDataTable data={Categories} pagination={pagination} />
    </div>
  );
};

export default page;
