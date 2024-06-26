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
import getCategoryById from "@services/api/getCategoryById";
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
  let successData: Category;

  //? call the api to get the category informations.
  const categoryData = await getCategoryById(categoryId);

  if (categoryData.status === "success") {
    successData = categoryData.data;
    console.log('successData', successData)
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

  // const description = `Sports APIs can refer to many different categories of APIs in 
  //                   the world of sports. Some of the more popular APIs fall under umbrellas like sports 
  //                   odds and betting, top scores, NCAA sports, football, women’s sports, 
  //                   and top trending sports news.`;

  // const cat = {
  //   apiCategory: "Sport-API-Worldwide",
  //   apiCategoryImage: "https://github.com/shadcn.png",
  //   CategoryDescription:
  //     "Fournir des donnees en temps reel sur differents sports dans le monde",
  // };

  // const filters = [
  //   { label: "Fournisseur", options: ["Option 1", "Option 2", "Option 3"] },
  //   { label: "Catégorie", options: ["Option A", "Option B", "Option C"] },
  //   { label: "Trier par", options: ["Option X", "Option Y", "Option Z"] },
  // ];

  // const page = Number(searchParams?.page) || 1;


  let fetchedapis;
  const data = await getAPIs({
    category_ids: categoryId,
    page: 1,
    per_page: ITEMS_PER_PAGE,
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
    <div className="flex flex-col w-full gap-4 md:px-28 mt-5">
      {/* the card of the big screen */}

      <div className="grid w-full grid-cols-4 p-10 border-2 rounded-xl min-h-72 bg-white">
        <div className="col-span-4 md:col-span-3">
          <div className="flex flex-row items-center justify-around mb-4 md:block">
            <p className="my-auto text-lg font-bold text-center md:text-left md:text-4xl text-primary">
              {successData.name}
            </p>
            <img
              src={successData.image}
              alt="category img"
              className="block w-10 h-10 rounded-full md:hidden md:m-auto"
            />
          </div>

          <p className="md:text-2xl">{successData.description}</p>
        </div>

        <img
          src={successData.image}

          alt="category img"
          className="block w-10 h-10 rounded-full md:hidden md:m-auto"
        />
      </div>

      <p className="md:text-2xl">{category.description}</p>
    </div>


  </div>
<div className="flex flex-col md:flex-row gap-4 items-start w-full py-8 px-[5%] md:px-0 justify-between">
      <section className="flex flex-col gap-4  order-2 ">
        {/* <div className="flex flex-col items-center gap-2"> */}
          {/* <label htmlFor="search" className='text-lg'>Rechercher:</label> */}

          {/* <input
            type="text"
            id="search"
            className="w-full p-2 border-2 rounded-lg"
            placeholder="Rechercher une API"
          />
        </div> */}

        {/* <ApiFilters filters={filters} /> */}

        {/* <Button className="w-32 lg:mx-auto"> Filtrer </Button> */}

        <section className="flex flex-col justify-center gap-5">
          <MainTitle title="Toutes les Résultats :" />

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
