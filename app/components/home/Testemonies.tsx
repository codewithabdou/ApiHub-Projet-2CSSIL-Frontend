import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
function Testemonies() {
    const content=[{"person":"DJOUIMA Ahmed Yanis","avis":"Une trés bonne plateforme, ils offrent des APIs fiables et rapides.","role":"-Ingénieur en génie logiciel-"},{"person":"Habouche Abderrahmane","avis":"1001API est une plateforme exceptionnelle, au tant qu'un e-commerçant,elle m'a aidé à améliorer mes ventes.","role":"-E-commerçant-"},
    {"person":"Mazouz Aimen","avis":"Une plateforme trés utile, rapide,fiable et trés intéréssante. ","role":"-CEO de iTouch-"}
]
    return(
        <div className="w-full my-10 flex flex-col gap-y-[50px] justify-center items-center">
            <div className='flex flex-col'>
                <h1 className='md:text-3xl text-2xl text-[#184173] font-bold z-10'>Témoignages</h1>
                <div className='w-full h-[7px] bg-[#FEC53D] mt-[-7px]'></div>
            </div>
        <div className="md:w-[80%] w-[70%] md:h-[250px] h-[350px] bg-white rounded-[20px] shadow-md shadow-[#979797] flex justify-center items-center border-[1px]">
            <Carousel className='md:w-[90%] w-[80%] h-[90%] flex justify-center items-center '>
                <CarouselContent className='h-fit md:w-[100%] ' >
                    {content.map((e,key)=>(
                       <CarouselItem className='flex justify-center items-center w-[90%]'>
                       <div className='md:w-full md:h-[120px] h-[100%]  bg-white flex flex-col rounded-[20px] shadow-md  border-[2px] items-start justify-around  p-5'>
                       <p className='md:text-xl text-lg font-bold text-[#184173]'>{e.person}</p>
                       <p className='ml-2 md:text-lg text-sm'>{e.avis}</p>
                       <div className='w-full flex justify-end'>
                           <p className='md:text-lg text-sm text-[#184173]'>{e.role}</p>
                       </div>
                       </div>
                   </CarouselItem>
                    ))}
                   
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
      </div>      
    ) ;
}

export default Testemonies