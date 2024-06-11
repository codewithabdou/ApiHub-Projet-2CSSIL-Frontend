import IMAGES from '@config/images'
import React from 'react'
import { Button } from '../ui/button'
import MainTitle from '../Shared/MainTitle'
import Link from 'next/link'

const AboutUs = () => {
  return (
    <div>

<div className="flex mx-auto">
      <div className="flex flex-col mx-auto mt-5">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
         A propos de nous 
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>
    </div>




    <div className='xl:w-[80%] p-6 mt-6  w-[95%] mx-auto   md:h-fill  bg-white rounded-[20px] shadow-md  flex justify-center items-center border-[1px]'>

      <div className="flex flex-col w-1/2 gap-3">




        <p>
          Découvrez notre plateforme, la destination principale pour accéder à une large gamme d'APIs du monde entier. Avec notre plateforme, vous pouvez rechercher et parcourir de nombreuses APIs en un seul endroit, ce qui facilite l'intégration avec vos applications rapidement et efficacement.
        </p>
        <p>
          Utilisez nos outils avancés pour poser des questions spécifiques ou générer des appels d'API sans effort. Notre plateforme est conçue pour être intuitive et intelligente, vous offrant une expérience utilisateur optimale à chaque utilisation.
        </p>
        <p>
          Profitez des mises à jour régulières pour garantir l'accès aux données API les plus récentes et les plus précises. Recherchez facilement des APIs avec notre plateforme et rationalisez votre processus de développement.
        </p>
        <Link href={"/auth/login"}>

        <Button className='w-36 mx-auto font-extrabold text-xl text-white rounded-tr-3xl rounded-bl-3xl mt-4 py-4' variant={'secondary'}>Commencez</Button>
        </Link>
      </div>

      <div className='w-1/3'>
        <img src={IMAGES.ABOUT_US} alt="À propos de nous" />
      </div>

    </div>
    </div>
  )
}

export default AboutUs
