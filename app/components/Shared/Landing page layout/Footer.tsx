import React from "react";
import { IMAGES } from "@config";
import Link from "next/link";
import Image from "next/image";
function Footer() {
  return (
    <div className="flex flex-col w-full  justify-end items-center">
      <div className="w-full  h-[70px] bg-primary text-white md:text-xl text-lg font-bold flex items-center justify-center font-normal ">
        1<span className="text-secondary ">00</span >1 API @{" "}
        {new Date().getFullYear()} All rights reserved
      </div>
      <div className="w-full h-[7px] bg-secondary"></div>
      <div className="w-full h-[70px] bg-primary flex justify-center items-center  ">
        <div className="flex justify-evenly items-center gap-6">
          {IMAGES.SOCIAL_MEDIA.map((e, key) => (
            <Link key={key} href={e.LINK} target="_blank">
              <Image
                alt="social_media_link"
                src={e.IMAGE}
                width={40}
                height={40}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
