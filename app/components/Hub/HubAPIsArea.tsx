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
import getAPIs from "@services/api/getApisByParams";
import { ErrorGetAPIsResponse, SuccessGetAPIsResponse } from "@typings/api/getAPIs";

const HubAPIsArea =async () => {
  const Styles = {
    // carouselStyle: "w-[85%] flex items-center  mx-auto ",
    carouselStyle: " w-[85%] h-[90%] flex items-center justify-center  mx-auto px-10",
    carouselContentStyle: "py-4",
  };

  let sampleData :API[] =[];
  await getAPIs().then((res:SuccessGetAPIsResponse | ErrorGetAPIsResponse)=>{
    if (res) {
      const result = res as SuccessGetAPIsResponse;
      sampleData=result.data;
      sampleData.reverse();
    }
  })
  return (
    <div className="bg-white md:order-2 order-1 md:w-[70%] w-full  md:flex-grow border-secondary  border">
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
            {sampleData.filter((Api) => Api.status === "active").map((Api, index) => (
              <CarouselItem
                key={index}
                className={`lg:basis-1/2  space-8 xl:basis-1/2 `}
              >
                <ApiCard
                  api={{
                    apiId: Api.id.toString(),
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
      
      {/* <div className="py-8">
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
            {sampleData.filter((Api) => Api.status === "active").map((Api, index) => (
              <CarouselItem
                key={index}
                className={`lg:basis-1/2   xl:basis-1/2 `}
              >
                <ApiCard
                  api={{
                    apiId: Api.id.toString(),
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
      </div> */}
    </div>
  );
};

export default HubAPIsArea;
