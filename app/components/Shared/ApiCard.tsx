"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaChartLine, FaCheckCircle, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ApiCard = ({
  api,
}: {
  api: {
    apiId: string;
    apiName: string;
    apiDescription: string;
    apiImage: string;
  };
}) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(`/user/apis/${api.apiId}`);
      }}
      className="shadow-lg cursor-pointer hover:scale-105 hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 flex flex-col max-h-60 self-stretch min-h-60 "
    >
      <CardHeader className="p-3 flex flex-row items-center px-5 gap-2 w-full">
        <Avatar className=" rounded-full w-12 h-12">
          <AvatarImage src={api.apiImage} />
          <AvatarFallback>API</AvatarFallback>
        </Avatar>
        <p className="text-lg font-bold text-center flex-grow">{api.apiName}</p>
      </CardHeader>

      <CardContent className="h-auto">
        <p className="line-clamp-4 text-ellipsis">{api.apiDescription}</p>
      </CardContent>

      <CardFooter className="flex justify-center mt-auto">
        <div className="flex flex-row justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <FaChartLine className="text-primary size-4" />
            <p className="text-xs text-center">1.2k</p>
          </div>
          <div className="flex flex-col items-center justify-center  gap-1">
            <FaClock className="text-primary size-4" />
            <p className="text-xs text-center">325ms</p>
          </div>
          <div className="flex flex-col items-center justify-center  gap-1">
            <FaCheckCircle className="text-primary size-4" />
            <p className="text-xs text-center">99%</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApiCard;
