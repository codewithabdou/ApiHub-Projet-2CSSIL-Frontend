import ApiCategoryCard from "@app/components/Shared/ApiCategoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const OurApis = () => {
  const Styles = {
    carouselStyle: " w-[90%] h-[90%] flex items-center ",
    carouselContentStyle: "py-4",
  };
  // this will be replaced later by the real apis from the backend server
  const OurApis = [
    {
      apiCategory: "Sport-API",
      apiCategoryImage: "https://github.com/shadcn.png",
      CategoryDescription:
        "Fournir des donnees en temps reel sur differents sports dans le monde",
    },
    {
      apiCategory: "Language-API",
      apiCategoryImage: "https://github.com/shadcn.png",
      CategoryDescription:
        "Fournir des donnees en temps reel sur differents jcp dans le monde",
    },
    {
      apiCategory: "Spell-API",
      apiCategoryImage: "https://github.com/shadcn.png",
      CategoryDescription:
        "Fournir des donnees en temps reel sur differents karagte dans le monde",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center mx-auto mt-10 p-2 gap-12">
      
      <div className="flex flex-col">
        <h1 className="md:text-3xl text-2xl text-primary font-bold z-10">
          Nos APIs
        </h1>
        <div className="w-full h-[7px] bg-secondary mt-[-7px]"></div>
      </div>

      <section className="  xl:w-[80%]  w-[95%]  bg-white rounded-[20px] shadow-md shadow-[#979797]  border-[2px] px-10  py-5 gap-3 flex-col flex">
        <p className="md:text-xl text-lg font-bold text-primary">
          Catégories populaires:
        </p>

        <div className=" flex justify-center items-center">
          <Carousel
            opts={{
              loop: false,
              align: "start",
            }}
            className={Styles.carouselStyle}
          >
            <CarouselContent className={Styles.carouselContentStyle}>
              {OurApis.map((api, index) => (
                <CarouselItem
                  key={index}
                  className={`md:basis-1/2  space-8 lg:basis-1/3 `}
                >
                  <ApiCategoryCard
                    CategoryDescription={api.CategoryDescription}
                    apiCategoryImage={api.apiCategoryImage}
                    apiCategory={api.apiCategory}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <p className="md:text-xl text-lg font-bold text-primary">
          Catégories recommandées:
        </p>

        <div className=" flex justify-center items-center">
          <Carousel
            opts={{
              loop: false,
              align: "start",
            }}
            className={Styles.carouselStyle}
          >
            <CarouselContent className={Styles.carouselContentStyle}>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className={`md:basis-1/2  space-8 lg:basis-1/3 `}
                >
                  <ApiCategoryCard />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
};



export default OurApis;
