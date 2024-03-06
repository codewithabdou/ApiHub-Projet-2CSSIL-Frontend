import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { TESTIMONIALS } from "@config";
function Testemonies() {
  return (
    <div className="w-full my-10 flex flex-col gap-y-[50px] justify-center items-center">
      <div className="flex flex-col">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
          Témoignages
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>
      <div className="xl:w-[80%] w-[95%] md:h-[250px] h-[350px] bg-white rounded-[20px] shadow-md  flex justify-center items-center border-[1px]">
        <Carousel className="xl:w-[90%] md:w-[80%]  w-[70%] h-[90%] flex justify-center items-center ">
          <CarouselContent className=" md:w-[100%] ">
            {TESTIMONIALS.map((e, key) => (
              <CarouselItem
                key={key}
                className="flex justify-center items-center  w-[90%]"
              >
                <div className="md:w-full gap-8 py-4  h-[100%]  bg-white flex flex-col rounded-[20px]   border-[2px] items-start justify-around  p-5">
                  <div>
                    <p className="md:text-xl text-lg font-bold text-primary">
                      {e.person}
                    </p>
                    <p className=" md:text-lg text-gray-600  text-sm">
                      " {e.avis} "
                    </p>
                  </div>
                  <div className="w-full flex justify-end">
                    <p className="md:text-lg text-sm text-opacity-60 font-medium text-primary">
                      {e.role}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Testemonies;
