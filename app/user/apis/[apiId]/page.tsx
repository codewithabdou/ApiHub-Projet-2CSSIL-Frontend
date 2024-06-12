import { Button } from "@app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@app/components/ui/tabs";
import ApiDetailsSection from "@app/components/user/apiPage/ApiDetailsSection";
import DiscussionsSection from "@app/components/user/apiPage/DiscussionsSection";
import EndpointsSection from "@app/components/user/apiPage/EndpointsSection";

import TicketsSectionForApi from "@app/components/user/apiPage/TicketsSectionForApi";
import SubscriptionDetails from "@app/components/user/apiPage/SubscriptionDetails";
import SubscriptionsSection from "@app/components/user/apiPage/SubscriptionsSection";
import VersionDescription from "@app/components/user/apiPage/versionDescription";
import PlansSection from "@app/components/user/PlansSection";
import AddTicetFormPanel from "@app/components/user/ticketFormSidePanel";
import getAllVersionsByApi from "@services/api/apiPage/getAllversionsByApi";
import getApiById from "@services/api/apiPage/getApiById";
import getSubs from "@services/api/apiPage/getSubscriptions";
import getVersionDetails from "@services/api/apiPage/getVersionDetails";
import {
  errorGetApiByIdResponse,
  successGetApiByIdResponse,
} from "@typings/api/getApiByIdTypes";
import {
  errorGetVersionDetailsResponse,
  successGetVersionDetailsResponse,
} from "@typings/api/getVersionDetailsTypes";
import {
  errorGetVersionsResponse,
  successGetVersionsResponse,
} from "@typings/api/getVersionsTypes";
import { SubscriptionResponse } from "@typings/api/subscriptionTypes";
import Endpoint from "@typings/entities/Endpoint";
import { ErrorType } from "@typings/entities/Error";
import { Version } from "@typings/entities/Versions";
import React from "react";
import AddTicketFormPanel from "@app/components/user/ticketFormSidePanel";
import getPopularity from "@services/api/statistics/sharedPopularity";
import avgResponseTime from "@services/api/statistics/sharedApiAvg";
import getServiceLevel from "@services/api/statistics/serviceLevel";

const ApiDetails = async ({
  params,
}: {
  params: {
    apiId: number;
  };
}) => {
  const apiId = params.apiId;
  let api: successGetApiByIdResponse;
  let plans: {
    name: String;
    description: String;
    price: Number;
    max_requests: Number;
    duration: Number;
  }[];

  let versions: Version[];
  let endpoints: Endpoint[];
  let subscriptions: { id: number; api_id: number; api: { id: number; name: string; supplier_id: number; }; api_plan: string; user_id: number; user: { id: number; firstname: string; lastname: string; }; start_date: string; end_date: string; remaining_requests: number; status: string; expired: boolean; price: number; }[]=[];
  const apiResponse:
    | { data: successGetApiByIdResponse; status: string; message: string }
    | ErrorType = await getApiById(apiId);
  const versionsResponse:
    | { data: successGetVersionsResponse; status: string; message: string }
    | ErrorType = await getAllVersionsByApi(apiId);
  if (apiResponse.status === "success") {
    const data = apiResponse as {
      data: successGetApiByIdResponse;
      status: string;
      message: string;
    };

    api = data.data;
    console.log(api);

    plans = api.data.plans;
  } else {
    const errorData = apiResponse as errorGetApiByIdResponse;
    return errorData;
  }
  if (versionsResponse.status === "success") {
    const data = versionsResponse as {
      data: successGetVersionsResponse;
      status: string;
      message: string;
    };
    versions = data.data.data;
    const defaultVersionEndpointsResponse:
      | {
          data: successGetVersionDetailsResponse;
          status: string;
          message: string;
        }
      | ErrorType = await getVersionDetails(apiId, versions[0].version);
    if (defaultVersionEndpointsResponse.status === "success") {
      const endpointsData = defaultVersionEndpointsResponse as {
        data: successGetVersionDetailsResponse;
        status: string;
        message: string;
      };
      endpoints = endpointsData.data.data.endpoints;
    } else {
      const errorData =
        defaultVersionEndpointsResponse as errorGetVersionDetailsResponse;
      return errorData;
    }
  } else {
    const errorData = versionsResponse as errorGetVersionsResponse;
    return errorData;
  }
 
  
  const availableSubs=await getSubs({api_id:apiId,per_page:100});
      if (availableSubs) {
        
        const result=availableSubs as SubscriptionResponse;
        subscriptions=result.data 
      }else{
        console.log("error subs");
        
      }
  let popularity;
  let latency;
  let service;
  popularity= await getPopularity(apiId);
  latency=await avgResponseTime(apiId);
  service=await getServiceLevel(apiId);
  return (
    <div className="py-8 flex  items-center flex-col  bg-white min-h-[900px] ">
      {api ? (
        <ApiDetailsSection
          image={api?.data.image}
          name={api?.data.name}
          supplier={`${api?.data.supplier.firstname} ${api?.data.supplier.lastname}`}
          updateDate={`${api?.data.updated_at}`}
          category={api?.data.category.name}
          popularity={popularity}
          latency={latency}
          service={service}
        ></ApiDetailsSection>
      ) : null}

      <div className="w-full p-0 flex gap-y-5 justify-center overflow-x-hidden m-0 ">
        <Tabs
          defaultValue="endpoints"
          className="sm:w-4/5 w-full bg-white flex flex-col sm:gap-y-0  gap-y-10 sm:p-2 "
        >
          <div className="w-full bg-white flex items-center border-b-[1px] border-primary    sm:min-h-16 min-h-32 sm:justify-start justify-center ">
            <TabsList className=" flex h-fit bg-white flex-wrap sm:justify-start justify-center w-4/5">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="disscussions">Disscussions</TabsTrigger>
              <TabsTrigger value="plans">Plans d'abonement</TabsTrigger>
              <TabsTrigger value="subscriptions">Abonements</TabsTrigger>
              <TabsTrigger value="tickets" className="">Problèmes</TabsTrigger>

            </TabsList>
            <AddTicketFormPanel apiId={apiId}></AddTicketFormPanel>


          </div>

          <TabsContent className="w-full " value="endpoints">
            <EndpointsSection
              apiId={apiId}
              versions={versions}
              endpoints={endpoints}
            />
          </TabsContent>
          <TabsContent value="description">
           <VersionDescription 
           apiId={apiId}
           versions={versions}
           endpoints={endpoints}
           apiDescription={api.data.description}
            />
          </TabsContent>
          <TabsContent value="disscussions">
            <DiscussionsSection id={apiId}></DiscussionsSection>
          </TabsContent>
          <TabsContent
            className="w-full flex justify-center items-center"
            value="plans"
          >
            <PlansSection plans={plans} apiId={apiId} />
          </TabsContent>
          <TabsContent
            className="w-full flex justify-center items-center"
            value="subscriptions"
          >
            <SubscriptionDetails subs={subscriptions}/>
            
          </TabsContent>

          <TabsContent value="tickets">
            <TicketsSectionForApi id={apiId}></TicketsSectionForApi>
          </TabsContent>

        

        </Tabs>
      </div>
    </div>
  )
};

export default ApiDetails;
