"use server";
import AdminUsersPagination from "@app/components/Admin/Users management/pagination";
import ApiCategoryCard from "@app/components/Shared/ApiCategoryCard";
import MainTitle from "@app/components/Shared/MainTitle";
import getCategories from "@services/api/getCategoriesByParams";
import { sucessGetCategoriesResponse } from "@typings/api/createCategoryType";
import {
  ErrorgetAllCategoriesResponse,
  getAllCategoriesSuccessResponse,
} from "@typings/api/getCategoryTypes";
import Pagination from "@typings/api/pagination";
import Category from "@typings/entities/Category";
import { Link } from "lucide-react";
import React from "react";

const AllCategories = async ({ searchParams }: { searchParams?: any }) => {
  const ITEMS_PER_PAGE = 12;
  const image = "https://github.com/shadcn.png";

  let fetchedCategories: Category[] = [];

  const page = Number(searchParams?.page) || 1;
  let pagination: Pagination = {
    page: Number(page),
    per_page: 0,
    total: 0,
    pages: 0,
  };
  //todo : add pagination after it is added to the backend , and modify the getAllCategores function
  try {
    const data = await getCategories();
    if (data.status === "success") {
      fetchedCategories = (data as sucessGetCategoriesResponse).data as Category[];
    } else {
      const errorData = data as ErrorgetAllCategoriesResponse;
      alert(errorData.message);
    }
  } catch (error: any) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col px-10">
      <section className="flex flex-col justify-center gap-5  px-24">
        <MainTitle title="Toutes les categories:" />
        <p>
          Vous trouvez dans cette section toutes les categories d’APIs
          disponibles sur 1001 API.
        </p>
        <div className="grid grid-cols-1  gap-x-4 gap-y-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-28  min-h-96">
          {fetchedCategories.length > 0 ? (
            fetchedCategories.map((categoriy) => (
              <ApiCategoryCard
                id={categoriy.id}
                detailed={false}
                apiCategory={categoriy.name}
                // apiCategoryImage={categoriy.image || image}
                apiCategoryImage={image}
              />
            ))
          ) : (
            <p className="text-center  col-span-4 row-span-2">
              Aucun résultat trouvé
            </p>
          )}
        </div>
        {/* we can use a reusable general pagination here  */}
        {/* <AdminUsersPagination  /> */}
        <AdminUsersPagination pagination={pagination} />
      </section>
    </div>
  );
};

export default AllCategories;
