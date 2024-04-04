import getCategories from "@services/api/getCategoriesByParams";
import {
  errorGetCategoriesResponse,
  sucessGetCategoriesResponse,
} from "@typings/api/createCategoryType";
import Category from "@typings/entities/Category";
import Link from "next/link";
import React from "react";

const HubSideCategories = async () => {
  const data = await getCategories();
  if (data.status === "error") {
    const errorData = data as errorGetCategoriesResponse;
    return <div>{errorData.message}</div>;
  }
  const successData = data as sucessGetCategoriesResponse;
  const categories: Category[] = successData.data as Category[];
  return (
    <aside className="bg-white md:order-1 order-2 md:w-[20%] w-full flex flex-col items-start justify-start     py-8 min-h-[50vh] px-[5%] rounded-lg shadow-md">
      <h3 className="font-semibold">Categories</h3>
      <ul className="mt-4">
        {categories.map((category) => (
          <li className="hover:underline text-blue-600" key={category.id}>
            <Link href="#">{category.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default HubSideCategories;
