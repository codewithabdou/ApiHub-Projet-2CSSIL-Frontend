"use client";

import React from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import Image from "next/image";
import User from "@typings/entities/User";

const Header = ({ user }: { user: User | null }) => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[2.97rem] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <p className="  text-primary text-3xl font-extrabold ">
              1<span className="text-secondary">00</span>1 API
            </p>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 overflow-hidden rounded-full relative bg-zinc-300 flex items-center justify-center text-center">
            {user ? (
              <Image
                alt="user image"
                src={
                  "https://api.dicebear.com/7.x/thumbs/svg?seed=4&amp;backgroundColor=339AF0&amp;eyes=variant2W10,variant2W12,variant2W14,variant2W16,variant3W10,variant3W12,variant3W14,variant3W16,variant4W10,variant4W12,variant4W14,variant4W16,variant5W10,variant5W12,variant5W14,variant5W16,variant6W10,variant6W12,variant6W14,variant6W16,variant7W10,variant7W12,variant7W14,variant7W16,variant8W10,variant8W12,variant8W14,variant8W16,variant9W10,variant9W12,variant9W14,variant9W16&amp;mouth=variant1,variant2,variant3,variant4"
                }
                fill
                objectFit="cover"
              />
            ) : (
              <span className="font-semibold text-sm">HQ</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
