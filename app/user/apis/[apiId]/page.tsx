"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@app/components/ui/carousel';
import { Label } from '@app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/components/ui/tabs"
import ApiDetailsSection from '@app/components/user/ApiDetailsSection';
import EndpointDetails from '@app/components/user/EndpointDetails';
import Plan from '@app/components/user/Plan';
import getAllVersionsByApi from '@services/api/getAllversionsByApi';
import getApiById from '@services/api/getApiById';
import getVersionDetails from '@services/api/getVersionDetails';
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

    function calculateDaysSinceUpdate(updateDate: string): number { //calculate days since the last api update
        const updateDateTime = new Date(updateDate);
        const currentDate = new Date();
        const differenceInMs = currentDate.getTime() - updateDateTime.getTime();
        const daysSinceUpdate = differenceInMs / (1000 * 60 * 60 * 24);
        return Math.floor(daysSinceUpdate);
    }

    function duration(duration: Number) { //function to display plan duration
        switch (duration) {
            case 7:
                return "Semaine";
            case 30:
                return "Mois";
            case 365:
                return "An";
            case 999999:
                return "Ilimitée";
            default:
                return "not set";
        }
    }

    async function handleVersionChange(version: String) {//load current version
        const res = await getVersionDetails(apiId, version);
        if (res) {
            const data = res as successGetVersionDetailsResponse;
            setEndpoints(data.data.endpoints);
        } else {
            const errorData = res as errorGetVersionDetailsResponse;
            return errorData;
        }
    }

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className='w-screen flex justify-center items-center flex-col gap-y-10 bg-white'>
            <ApiDetailsSection
                image={api?.data.image}
                name={api?.data.name}
                supplier={`${api?.data.supplier.firstname} ${api?.data.supplier.lastname}`}
                updateDate={calculateDaysSinceUpdate(`${api?.data.updated_at}`)}
                category={api?.data.category.name}
            ></ApiDetailsSection>
            
            <div className='w-full p-5 flex flex-col gap-y-5 items-center overflow-x-hidden'>
                {/* <div className='w-full p-10'>
                    <h1>Base url : <div className='bg-[#F2F1F1] h-fit p-2'> {baseUrl}</div></h1>
                </div>*/}
                <Tabs defaultValue="endpoints" className="sm:w-4/5 w-full border-[1px] flex flex-col sm:gap-y-2  gap-y-10 rounded-[7px] border-[#184173] sm:p-5 ">
                    <TabsList className='flex flex-wrap justify-start w-4/5' >
                        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="disscussions">Disscussions</TabsTrigger>
                        <TabsTrigger value="plans">Plans d'abonement</TabsTrigger>
                    </TabsList>
                    <TabsContent className='w-full flex flex-col gap-y-5 items-start p-5' value="endpoints">
                    <Label>Veuillez choisir une version</Label>
                <Select onValueChange={(e) => {
                    handleVersionChange(e);
                }}
                >
                    <SelectTrigger className='sm:w-80 w-48 border-2 border-[#184173] outline-none'>
                        <SelectValue placeholder={versions.length>0 ? `${versions[0].version}` : "Cet API n'a pas de versions"} defaultValue={versions.length >0 ? `${versions[0].version}` : "Cet API n'a pas de versions"} />
                    </SelectTrigger>

                    <SelectContent>
                        {versions.map((dur, key) => (
                            <SelectItem key={key} value={`${dur.version}`}>
                                {dur.version}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                      {endpoints ? endpoints.map((endpoint, index) => (
                        <EndpointDetails name={endpoint.url} method={endpoint.method} description={endpoint.description} req={endpoint.request_body} res={endpoint.response_body} />
                    )

                    ) : <h1>Cette version n'a pas de endpoints</h1>}</TabsContent>
                    <TabsContent value="description">
                    
                    <p className='text-[#184173]'>{api?.data.description}</p>
                    </TabsContent>
                    <TabsContent value="disscussions">Not done yet</TabsContent>
                    <TabsContent className='w-full flex justify-center items-center' value="plans">
                    <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="sm:w-full w-[70%] bg-white p-5 rounded-[20px] shadow-md shadow-[#979797]  border-[2px]"
                >
                    <CarouselContent>
                        {plans.map((plan, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                                <div className="p-1">
                                    <Plan name={plan.name}
                                        price={plan.price}
                                        duration={duration(plan.duration)}
                                        nbrRequests={plan.max_requests} />
                                       
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                    </TabsContent>

                </Tabs>


            </div>

        </div>
    );
}

export default ApiDetails;
