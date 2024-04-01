"use client"
import Navbar from "@app/components/Shared/Landing page layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/components/ui/tabs"
import ApiDetailsSection from '@app/components/user/apiPage/ApiDetailsSection';
import DiscussionsSection from '@app/components/user/apiPage/DiscussionsSection';
import EndpointsSection from '@app/components/user/apiPage/EndpointsSection';
import PlansSection from '@app/components/user/PlansSection';
import getAllVersionsByApi from "@services/api/apiPage/getAllversionsByApi";
import getApiById from '@services/api/apiPage/getApiById';
import getVersionDetails from '@services/api/apiPage/getVersionDetails';
import { errorGetApiByIdResponse, successGetApiByIdResponse } from '@typings/api/getApiByIdTypes'
import { errorGetVersionDetailsResponse, successGetVersionDetailsResponse } from '@typings/api/getVersionDetailsTypes';
import { errorGetVersionsResponse, successGetVersionsResponse } from '@typings/api/getVersionsTypes';
import Endpoint from '@typings/entities/Endpoint';
import { Version } from '@typings/entities/Versions';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ApiDetails() {
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<successGetApiByIdResponse | null>(null);
    const [plans, setPlans] = useState<{ name: String, description: String, price: Number, max_requests: Number, duration: Number }[]>([]);
    const [versions, setVersions] = useState<Version[]>([]);
    const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
    const params = useParams();
    const apiId = Number(params.apiId);

    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = await getApiById(apiId);
                const versionsResponse = await getAllVersionsByApi(apiId);
                if (apiResponse) {
                    const data = apiResponse as successGetApiByIdResponse;
                    setApi(data);
                    setPlans(data.data.plans);
                } else {
                    const errorData = apiResponse as errorGetApiByIdResponse;
                    return errorData
                }
                if (versionsResponse) {
                    const data = versionsResponse as successGetVersionsResponse;
                    setVersions(data.data);
                     // Fetch endpoints of the default version
                     const defaultVersionEndpointsResponse = await getVersionDetails(apiId, data.data[0].version);
                     if (defaultVersionEndpointsResponse) {
                         const endpointsData = defaultVersionEndpointsResponse as successGetVersionDetailsResponse;
                         setEndpoints(endpointsData.data.endpoints);
                     } else {
                         const errorData = defaultVersionEndpointsResponse as errorGetVersionDetailsResponse;
                         return errorData 
                     }
                } else {
                    const errorData = versionsResponse as errorGetVersionsResponse;
                    return errorData 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        }
        fetchData();
    }, []);

    

    
    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className='w-screen h-screen flex  items-center flex-col  bg-white'>
            <ApiDetailsSection
                image={api?.data.image}
                name={api?.data.name}
                supplier={`${api?.data.supplier.firstname} ${api?.data.supplier.lastname}`}
                updateDate={`${api?.data.updated_at}`}
                category={api?.data.category.name}
            ></ApiDetailsSection>
            
            <div className='w-full p-0 flex gap-y-5 justify-center overflow-x-hidden m-0 '>
                <Tabs defaultValue="endpoints" className="sm:w-4/5 w-full bg-white flex flex-col sm:gap-y-0  gap-y-10 sm:p-2 ">
                    <div className="w-full bg-white flex items-center border-b-[1px] border-primary  sticky top-0 z-50 sm:min-h-16 min-h-32 sm:justify-start justify-center ">
                    <TabsList className=' flex h-fit bg-white flex-wrap sm:justify-start justify-center w-4/5 z-50' >
                        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="disscussions">Disscussions</TabsTrigger>
                        <TabsTrigger value="plans">Plans d'abonement</TabsTrigger>
                    </TabsList>
                    </div>
                    
                    <TabsContent className='w-full ' value="endpoints">
                     <EndpointsSection apiId={apiId} setEndpoints={setEndpoints} versions={versions} endpoints={endpoints}/>
                   </TabsContent>
                    <TabsContent value="description">
                      <p className='text-[#184173]' style={{ whiteSpace: 'pre-line' }}>{api?.data.description}</p>
                    </TabsContent>
                    <TabsContent value="disscussions">
                       <DiscussionsSection id={apiId}></DiscussionsSection>                    
                    </TabsContent>
                    <TabsContent className='w-full flex justify-center items-center' value="plans">
                      <PlansSection plans={plans}/>
                    </TabsContent>

                </Tabs>


            </div>

        </div>
    );
}

export default ApiDetails;
