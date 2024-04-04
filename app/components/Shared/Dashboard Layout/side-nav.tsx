"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@services/authentication.service";

import { SideNavItem } from "@typings/domain/sideNavItem";
import { ChevronDown } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { useRouter } from "next/navigation";

const SideNav = ({ items }: { items: SideNavItem[] }) => {
  const router = useRouter();

  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col justify-between space-y-6 w-full">
        <div className="flex flex-col space-y-6 w-full">
          <Link
            href="/admin"
            className="flex  flex-row space-x-3 items-center justify-center md:px-6 border-b border-zinc-200 h-12 w-full"
          >
            <p className="  text-primary text-3xl font-extrabold ">
              1<span className="text-secondary">00</span>1 API
            </p>
          </Link>

          <div className="flex flex-col space-y-2  md:px-6 ">
            {items.map((item, idx) => {
              return <MenuItem key={idx} item={item} />;
            })}
          </div>
        </div>
        <Link className="w-full" href="/">
          <Button
            onClick={async () => {
              await logout();
            }}
            className="rounded-none w-full"
            variant={"outline"}
          >
            Se déconnecter
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <Button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </Button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-gray-600 text-lg flex">
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};
