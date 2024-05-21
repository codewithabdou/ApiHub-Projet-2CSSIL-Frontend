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
  const categories: Category[] = successData.data;
  return (
    <aside className="bg-white md:order-1 order-2 md:w-[20%] w-full flex flex-col items-start justify-start   border-secondary border-[1px]  py-8 min-h-[50vh] px-[5%] rounded-lg shadow-md">
      <h3 className="font-semibold">Categories</h3>
      <ul className="mt-2">
        {categories.map((category) => (
          <>
          <li className="hover:underline hover:decoration-secondary text-primary" key={category.id}>
            <Link href={`/user/categories/${category.id}`}>
              {category.name}
            </Link>
          </li>
          </>
        ))}
      </ul>
    </aside>
  );
};

export default HubSideCategories;
