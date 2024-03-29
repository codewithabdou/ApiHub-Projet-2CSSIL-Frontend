import React from "react";

import Pagination from "@typings/api/pagination";
import Image from "next/image";
import { IMAGES } from "@config";
import Link from "next/link";
import { Button } from "@app/components/ui/button";
import { API } from "@typings/entities/API";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import SupplierAPIsDataTable from "@app/components/Provider/APIs Management/data-table";
import getSupplierAPIs from "@services/api/getSupplierApis";

const MesApi = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const data = await getSupplierAPIs(page);
  let apis: API[] = [];
  let pagination: Pagination = {
    page: Number(page),
    per_page: 10,
    total: 0,
    pages: 0,
  };
  console.log(data)
  if (data) {
    console.log(data)
    const apisData = data as SuccessGetAPIsResponse;
    apis = apisData.data;
    pagination = apisData.pagination;
  } else {
    const errorData = data as ErrorGetAPIsResponse;
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
        <Link href={`/supplier/apis`}>
          <Button>Go to first page</Button>
        </Link>
      </div>
    );
  }
  return <SupplierAPIsDataTable data={apis} pagination={pagination} />;
};

export default MesApi;
