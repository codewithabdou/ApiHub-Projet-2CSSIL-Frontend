import React from "react";
import Image from "next/image";
import { IMAGES } from "@config";

const HubBanner = () => {
  return (
    <div
      className=" w-full mt-20 relative bg-primary bg-opacity-80 px-4 py-8 gap-8 md:max-h-96 justify-around  flex md:px-[10%] flex-col md:flex-row "
      style={{
        // backgroundImage: `url(${IMAGES.BANNER[0].bannerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="order-2 z-10 space-y-8 md:order-1 w-full   text-white  ">
        <h2 className=" text-2xl md:text-start font-bold max-w-[30ch] text-center md:text-3xl    ">
          Découvrez notre large bibliotheque d’APIs{" "}
        </h2>
        <p className="text-lg  max-w-[40ch]">
          Commencez à consulter,tester et utiliser les meilleurs APIs dans le
          monde dans vos projets.
        </p>
      </div>
      <div className="flex  order-1 md:order-2  justify-center ">
        <Image
          className=" object-contain scale-110 "
          src={IMAGES.HUB_BANNER}
          width={276}
          height={226}
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default HubBanner;
