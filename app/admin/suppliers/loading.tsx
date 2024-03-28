"use client";

import { ThreeDots } from "react-loader-spinner";
const loading = () => {
  return (
    <div className="flex flex-col  justify-center py-[10%] items-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#000"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default loading;
