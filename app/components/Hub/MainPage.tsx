import React from "react";
import HubBanner from "./HubBanner";
import HubSideCategories from "./HubSideCategories";
import HubAPIsArea from "./HubAPIsArea";
import NavbarUserActions from "../Shared/Landing page layout/NavbarUserActions";

const MainPage = () => {
  return (
    <>
      {/*<NavbarUserActions />*/}
      <HubBanner />
      <div className="flex  flex-col items-center justify-center py-8">
        <h1 className="text-primary relative font-extrabold text-4xl after:absolute after:h-4 after:bg-secondary after:bottom-0 after:left-0 after:-z-10 after:w-full ">
          Nos APIs
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-start w-full py-8 px-[5%] justify-between">
          <HubSideCategories />
          <HubAPIsArea />
        </div>
      </div>
    </>
  );
};

export default MainPage;
