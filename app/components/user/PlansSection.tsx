import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@app/components/ui/carousel';
import Plan from './Plan';
function PlansSection(props:any) {
    function duration(duration: Number) { //function to display plan duration
        switch (duration) {
            case 7*24*3600:
                return "Semaine";
            case 30*24*3600:
                return "Mois";
            case 365*24*3600:
                return "An";
            case 999999:
                return "Ilimitée";
            default:
                return "not set";
        }
    }
  return (
    <Carousel
    opts={{
        align: "start",
    }}
    className="sm:w-full w-[75%] bg-white sm:p-3 p-1 rounded-[20px] sm:shadow-md sm:shadow-[#979797]  sm:border-[2px]"
>
    <CarouselContent>
        {props.plans.map((plan:any, index:number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                <div className="sm:p-1 p-0">
                    <Plan name={plan.name}
                        price={plan.price}
                        duration={duration(plan.duration)}
                        nbrRequests={plan.max_requests}
                        apiId={props.apiId} />
                       
                </div>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel>  )
}

export default PlansSection