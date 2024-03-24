import React from 'react';

const MainTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
          {title}
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>
    </div>
  );
};

export default MainTitle;
