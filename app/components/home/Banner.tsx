import React from 'react';
import Image from 'next/image';
import { IMAGES } from '@config';
import { Button } from '../ui/button';

const Banner = () => {
  return (
    <div className=" w-full px-10  flex py-8 flex-col md:flex-row bg-primary" style={{backgroundImage: `url(${IMAGES.BANNER[0].bannerbg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="container mx-12 my-12 font-bold flex flex-col justify-center  md:items-start md:w-1/2">
        <p className="mb-4 md:mb-0 text-3xl md:text-center md:text-4xl   text-white  md:text-left">Commencez à enrichir vos projets :<br/> découvrez nos APIs dès maintenant</p>
        <Button className='bg-secondary text-base my-8 md:my-10 w-56 md:w-60 font-bold'>Commencez</Button>
      </div>
      <div className="flex p-12    justify-center md:justify-end md:w-1/2">
        <Image   className='transform px-5 skew-y-3 hover:-translate-y-1 hover:scale-105 ' src={IMAGES.BANNER[0].banner} width={500} height={300} alt="Banner" />
      </div>
    </div>
  );
};

export default Banner;
