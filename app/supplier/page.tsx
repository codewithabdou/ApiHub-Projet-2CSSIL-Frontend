"use client";

import { Button } from "@app/components/ui/button";
import getApiRevenue from "@services/api/statistics/apiRevenue";
import endpointsCount from "@services/api/statistics/countEndpoints";
import revenu from "@services/api/statistics/revenu";
import getServiceLevel from "@services/api/statistics/serviceLevel";
import avgResponseTime from "@services/api/statistics/sharedApiAvg";
import getPopularity from "@services/api/statistics/sharedPopularity";
import totalApiNumber from "@services/api/statistics/totalApisNumber";
import getUsersByApiCount from "@services/api/statistics/usersByApiCount";
import usersNumber from "@services/api/statistics/usersCount";
import { logout } from "@services/authentication.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProviderDashboard = () => {
  const [stats,setStats]=useState({total:0,revenu:0,usersNumber:0,avg:0,endpoints:0,popularity:0,apiRevenue:0,serviceLevel:0,usersByApiCount:0});
  const getTotalStats=async ()=>{
    const total=await totalApiNumber();
    const totalRevenu=await revenu();
    const nbUsers=await usersNumber();
    const avg=await avgResponseTime(1);
    const endpoints=await endpointsCount(1);
    const popularity=await getPopularity(1);
    const apiRevenue=await getApiRevenue(1);
    const serviceLevel=await getServiceLevel(1);
const usersByApiCount= await getUsersByApiCount(1)

    


   
      setStats({total:total,revenu:totalRevenu,usersNumber:nbUsers,avg:avg,endpoints:endpoints,popularity:popularity,apiRevenue:apiRevenue,serviceLevel:serviceLevel,usersByApiCount:usersByApiCount})
    
  }
  useEffect(()=>{
    getTotalStats()
  },[])
  const router = useRouter();
  return (
    <div>
      <h1>Provider Dashboard</h1>
      <h1>{stats.total}</h1>
      <h1>{stats.revenu}</h1>
      <h1>{stats.usersNumber}</h1>
      <h1>{stats.avg}</h1>
      <h1>{stats.endpoints}</h1>
      <h1>{stats.popularity}</h1>
      <h1>{stats.apiRevenue}</h1>
      <h1>{stats.serviceLevel}</h1>
      <h1>{stats.usersByApiCount}</h1>


      
      <Button
        onClick={() => {
          logout().then(() => {
            router.push("/");
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default ProviderDashboard;
