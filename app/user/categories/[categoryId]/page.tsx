import ApiCard from "@app/components/Shared/ApiCard";
import { ApiFilters } from "@app/components/Shared/ApiFilters";
import MainTitle from "@app/components/Shared/MainTitle";
import UrlPagination from "@app/components/Shared/UrlPagination";
import { Button } from "@app/components/ui/button";
import getCategories from "@services/api/getCategoriesByParams";
import getAPIs from "@services/api/getApisByParams";
import {
  ErrorGetAPIsResponse,
  SuccessGetAPIsResponse,
} from "@typings/api/getAPIs";
import Pagination from "@typings/api/pagination";

import React from "react";
import Category from "@typings/entities/Category";
import { sucessGetCategoriesResponse } from "@typings/api/createCategoryType";
import HubSideCategories from "@app/components/Hub/HubSideCategories";

const DetailedCategory = async ({
  params,
  searchParams,
}: {
  params: {
    categoryId: number;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const categoryId = params.categoryId;
  const ITEMS_PER_PAGE = 12;
  let category: Category;

  //? call the api to get the category informations.
  const categoryData = await getCategories({
    category_ids: categoryId,
  });

  if (categoryData.status === "success") {
    const successData = categoryData as sucessGetCategoriesResponse;
    category = successData.data[0];
  } else {
    const errorData = categoryData as ErrorGetAPIsResponse;
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <p className="text-center text-sm bg-red-200 rounded-md max-w-[40ch] text-red-600 p-2">
          {errorData.message}
        </p>
      </div>
    );
  }



  let fetchedapis;
  const data = await getAPIs({
    categoryIds: categoryId,
   // page: 1,
   // per_page: ITEMS_PER_PAGE,
  });

  if (data.status === "success") {
    const apiData = data as SuccessGetAPIsResponse;
    fetchedapis = apiData.data;
    // pagination = apiData.pagination;
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


  return (
    <div className="py-12 flex flex-col w-full gap-4 md:px-28 mt-5 px-5">

  <div className="grid w-full grid-cols-4 p-10  rounded-xl min-h-12 bg-white border-secondary border">
    <div className="col-span-4 md:col-span-4">
      <div className="flex flex-row items-center justify-center  mb-4  gap-6 border-b-[1px] pb-4 border-black">
        <p className="my-auto text-lg font-semibold text-center md:text-left md:text-3xl text-primary">
          {category.name} Apis
        </p>

        <img
      src={category.image}
      alt="category img"
      className="hidden rounded-full  md:max-h-9 md:block"
    />
    
        <img
          src={category.image}
          alt="category img"
          className="block w-10 h-10 rounded-full md:hidden md:m-auto"
        />
      </div>

      <p className="md:text-lg md:font-normal text-gray-600">{category.description}</p>
    </div>


  </div>
<div className="flex flex-col md:flex-row gap-4 items-start w-full py-8 px-[5%] md:px-0 justify-between">
      <section className="flex flex-col gap-4  order-2 ">


        <section className="flex flex-col justify-center gap-5">
          

          <div className="flex mx-auto">
      <div className="flex flex-col mx-auto">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
        Toutes les Résultats 
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>
    </div>



          <div className="grid grid-cols-1  gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-16  min-h-96">
            {fetchedapis ? (
              fetchedapis.filter((Api) => Api.status === "active").map((api, index) => (
                <>
                <ApiCard
                  key={index}
                  api={{
                    apiId: api.id.toString(),
                    apiDescription: api.description,
                    apiImage: api.image,
                    apiName: api.name,
                  }}
                />
    
                </>
              ))
            ) : (
              <p className="text-center">Aucun résultat trouvé</p>
            )}
          </div>
        </section>
      </section>
      <HubSideCategories />

        </div>



    </div> // end of page
  );
};

export default DetailedCategory;
