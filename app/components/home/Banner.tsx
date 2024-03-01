import React from "react";
import Image from "next/image";
import { IMAGES } from "@config";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div
      className=" w-full relative bg-primary bg-opacity-80 px-4 py-8 gap-8 md:max-h-96 justify-around  flex md:px-[10%] flex-col md:flex-row "
      style={{
        backgroundImage: `url(${IMAGES.BANNER[0].bannerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="order-2 z-10 md:order-1 w-full  font-extrabold flex flex-col  items-center  md:items-start ">
        <p className=" text-2xl md:text-start max-w-[30ch] text-center md:text-3xl   text-white  ">
          Commencez à enrichir vos projets : découvrez nos APIs dès maintenant
        </p>
        <Button className="bg-secondary  hover:border-white hover:border-[1px] hover:scale-110 text-base my-8 md:my-10 w-56 md:w-60 font-bold">
          Commencez
        </Button>
      </div>
      <div className="flex  order-1 md:order-2  justify-center ">
        <Image
          className=" object-contain scale-110 "
          src={IMAGES.BANNER[0].banner}
          width={291}
          height={385}
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Banner;
