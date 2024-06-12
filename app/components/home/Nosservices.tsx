import React from "react";
import Image from "next/image";
import { IMAGES } from "@config";
import { Wallet } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";

const Nosservices = ()  => {
  return (
    <div className="w-full my-5 flex flex-col gap-y-[50px] justify-center items-center">
      <div className="flex flex-col">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
          Nos services
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>

      <div className="xl:w-[80%] p-6  w-[95%]   md:h-fill  bg-white rounded-[20px] shadow-md  flex justify-center items-center border-[1px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-24">

          {/* begin of card */}
          <div className="max-w-lg md:max-w-xl max-h-md p-4 md:p-4  bg-white  border-gray-200 rounded-xl shadow-sm  flex flex-col items-center border">
            <div className="flex flex-col items-center">
            {/* <Wallet className="float-right " size={60} color="#FFD700" /> */}
            <FaCode  size={60} color="#FFD700" />
            {/* <HiDocument className="float-right " size={60} color="#FFD700" /> */}
   
          
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary dark:text-white">
                Utiliser des APIs
              </h5>
            
            </div>

            <p className=" text-md text-left  ">
              Intégrez aisément des fonctionnalités à vos applications en
              exploitant notre large bibliotheque d’APIs.
            </p>
          </div>
          {/* end of card */}


          <div className="max-w-lg md:max-w-xl max-h-md p-4 md:p-4  bg-white  border-gray-200 rounded-xl shadow-sm  flex flex-col items-center border">
            <div className="flex flex-col items-center">
            {/* <Wallet className="float-right " size={60} color="#FFD700" /> */}
            <HiDocument className="float-right " size={60} color="#FFD700" />
   
          
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary dark:text-white">
              Consulter des API
              </h5>
            
            </div>

            <p className=" text-md text-left  ">
            Explorez et évaluez les différentes API disponibles pour trouver
              celles qui répondent le mieux à vos besoins.
            </p>
          </div>


          <div className="max-w-lg md:max-w-xl max-h-md p-4 md:p-4  bg-white  border-gray-200 rounded-xl shadow-sm  flex flex-col items-center border">
            <div className="flex flex-col items-center">
            <Wallet className="float-right " size={60} color="#FFD700" />
   
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary dark:text-white">
              Vendre vos APIs
              </h5>
            
            </div>

            <p className=" text-md text-left  ">
            Monétisez vos solutions logicielles ou de données en les vendant
              sur notre plateforme.
            </p>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Nosservices;
