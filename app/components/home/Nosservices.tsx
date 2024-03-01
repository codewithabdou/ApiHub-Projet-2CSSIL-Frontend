import React from 'react';
import Image from 'next/image';
import { IMAGES } from '@config';



const Nosservices = () => {
  return (
  

<div className="w-full my-10 flex flex-col gap-y-[50px] justify-center items-center">


<div className="flex flex-col">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
          Nos services
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>


      <div className="xl:w-[80%] p-4  w-[95%]  h-1/2 md:h-[400px]  bg-white rounded-[20px] shadow-md shadow-[#979797] flex justify-center items-center border-[1px]">

    



      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

      <div className="max-w-md md:max-w-xs max-h-lg p-4  bg-white border border-gray-200 rounded-xl shadow-sm shadow-[#979797] ">
    <Image   className='float-right ' src={IMAGES.Nosservices[0].RestAPI} width={60} height={70} alt="Banner" />
    <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary dark:text-white">Utiliser des  APIs</h5>
    </a>
    <p className="mb-3 text-gray-500 max-w-[26ch] ">Intégrez aisément des fonctionnalités  à vos applications en exploitant notre  large bibliotheque d’APIs.</p>
  
</div>


<div className="max-w-md md:max-w-xs max-h-lg p-4  bg-white border border-gray-200 rounded-xl shadow-sm shadow-[#979797]">
    <Image   className='float-right ' src={IMAGES.Nosservices[0].GoogleDocs} width={60} height={70} alt="Banner" />
    <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary dark:text-white">Consulter des API</h5>
    </a>
    <p className="mb-3  text-gray-500 max-w-[26ch] ">Explorez et évaluez les différentes API disponibles pour trouver celles qui répondent le mieux à vos besoins.</p>
  
</div>

<div className="max-w-md md:max-w-xs max-h-lg p-4  bg-white border border-gray-200 rounded-xl shadow-sm shadow-[#979797]">
    <Image   className='float-right ' src={IMAGES.Nosservices[0].StackofMoney} width={60} height={70} alt="Banner" />
    <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-primary dark:text-white">Vendre vos APIs</h5>
    </a>
    <p className="mb-3 text-gray-500 max-w-[26ch] ">Monétisez vos solutions logicielles ou de données en les vendant sur notre plateforme.</p>
  
</div>



      </div>
    </div>
    </div>
  )
}

export default Nosservices;


