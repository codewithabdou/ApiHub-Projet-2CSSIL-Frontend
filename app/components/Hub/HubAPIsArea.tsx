import React from "react";
import ApiCard from "../Shared/ApiCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { API } from "@typings/entities/API";

const HubAPIsArea = () => {
  const Styles = {
    carouselStyle: "w-[85%] flex items-center justify-center mx-auto ",
    carouselContentStyle: "py-4",
  };

  const sampleData: API[] = [
    {
      id: 1,
      name: "API 1",
      description: "API 1 Description",
      category_id: 1,
      category: {
        id: 1,
        name: "Category 1",
      },
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      image: "https://via.placeholder.com/150",
      status: "active",
      supplier: {
        id: 1,
        firstname: "Supplier 1",
        lastname: "Supplier 1",
      },
      supplier_id: 1,
    },
    {
      id: 2,
      name: "API 2",
      description: "API 2 Description",
      category_id: 2,
      category: {
        id: 2,
        name: "Category 2",
      },
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      image: "https://via.placeholder.com/150",
      status: "active",
      supplier: {
        id: 2,
        firstname: "Supplier 2",
        lastname: "Supplier 2",
      },
      supplier_id: 2,
    },
    {
      id: 3,
      name: "API 3",
      description: "API 3 Description",
      category_id: 3,
      category: {
        id: 3,
        name: "Category 3",
      },
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      image: "https://via.placeholder.com/150",
      status: "active",
      supplier: {
        id: 3,
        firstname: "Supplier 3",
        lastname: "Supplier 3",
      },
      supplier_id: 3,
    },
    {
      id: 4,
      name: "API 4",
      description: "API 4 Description",
      category_id: 4,
      category: {
        id: 4,
        name: "Category 4",
      },
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      image: "https://via.placeholder.com/150",
      status: "active",
      supplier: {
        id: 4,
        firstname: "Supplier 4",
        lastname: "Supplier 4",
      },
      supplier_id: 4,
    },
    {
      id: 5,
      name: "API 5",
      description: "API 5 Description",
      category_id: 5,
      category: {
        id: 5,
        name: "Category 5",
      },
      created_at: "2021-10-10",
      updated_at: "2021-10-10",
      image: "https://via.placeholder.com/150",
      status: "active",
      supplier: {
        id: 5,
        firstname: "Supplier 5",
        lastname: "Supplier 5",
      },
      supplier_id: 5,
    },
  ];
  return (
    <div className="bg-white md:order-2 order-1 md:w-[70%] w-full  md:flex-grow">
      <div className="py-8">
        <h2 className="font-bold text-2xl pl-4 my-2 text-primary">
          TOP 5 APIs
        </h2>
        <Carousel
          opts={{
            loop: false,
            align: "start",
          }}
          className={Styles.carouselStyle}
        >
          <CarouselContent className={Styles.carouselContentStyle}>
            {sampleData.map((Api, index) => (
              <CarouselItem
                key={index}
                className={`lg:basis-1/2  space-8 xl:basis-1/3 `}
              >
                <ApiCard
                  api={{
                    apiName: Api.name,
                    apiDescription: Api.description,
                    apiImage: Api.image,
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:block" />
          <CarouselNext className="hidden lg:block" />
        </Carousel>
      </div>
      <div className="py-8">
        <h2 className="font-bold text-2xl pl-4 my-2 text-primary">
          APIs Recommandées
        </h2>
        <Carousel
          opts={{
            loop: false,
            align: "start",
          }}
          className={Styles.carouselStyle}
        >
          <CarouselContent className={Styles.carouselContentStyle}>
            {sampleData.map((Api, index) => (
              <CarouselItem
                key={index}
                className={`lg:basis-1/2   space-8 xl:basis-1/3 `}
              >
                <ApiCard
                  api={{
                    apiName: Api.name,
                    apiDescription: Api.description,
                    apiImage: Api.image,
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:block" />
          <CarouselNext className="hidden lg:block" />
        </Carousel>
      </div>
    </div>
  );
};

export default HubAPIsArea;
