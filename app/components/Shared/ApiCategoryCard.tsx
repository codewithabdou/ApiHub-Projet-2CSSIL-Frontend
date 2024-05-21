import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { link } from "fs";


const ApiCategoryCard = ({
  id =0,
  detailed = true,
  apiCategory = "Sport-API",
  apiCategoryImage = "https://github.com/shadcn.png",
  CategoryDescription = "Fournir des donnees en temps reel sur differents sports dans le monde",
}) => {
  return (
  
<Link href={`categories/${id}`} >
    <Card className="shadow-lg  flex flex-col">
      <CardHeader className="p-3">
        <Avatar className="mx-auto w-16 h-16">
          <AvatarImage src={apiCategoryImage} />
          <AvatarFallback>API</AvatarFallback>
        </Avatar>
        <CardTitle className="text-center text-base " >
          <p className=" break-words">{apiCategory} </p>
          </CardTitle>
      </CardHeader>
      { detailed &&
       <CardContent>
       <p className="text-sm text-center">{CategoryDescription}</p> 
      </CardContent>
      }
    </Card>
    </Link>
   
  );
};

export default ApiCategoryCard;
