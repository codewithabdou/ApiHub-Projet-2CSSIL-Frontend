'use client';
import AdminUsersPagination from '@app/components/Admin/Users management/pagination';
import { ApiFilters } from '@app/components/Shared/ApiFilters';
import MainTitle from '@app/components/Shared/MainTitle'
import { Button } from '@app/components/ui/button';
import Pagination,  from '@typings/api/pagination';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'


    const DetailedCategory = ( ) => {
const categoryName = "Sport"
const description = `Sports APIs can refer to many different categories of APIs in 
                    the world of sports. Some of the more popular APIs fall under umbrellas like sports 
                    odds and betting, top scores, NCAA sports, football, women’s sports, 
                    and top trending sports news.`;

           const cat = {
                        apiCategory: "Sport-API-Worldwide",
                        apiCategoryImage: "https://github.com/shadcn.png",
                        CategoryDescription:
                          "Fournir des donnees en temps reel sur differents sports dans le monde",
                      }

                    //   const [fournisseurOptions, setFournisseurOptions] = useState<string[]>([]);
                    //   const [categorieOptions, setCategorieOptions] = useState<string[]>([]);
                    //   const [orderByOptions, setOrderByOptions] = useState(['Nom', 'Catégorie', 'Tag']); // Example options
                    
                    //   useEffect(() => {
                    //     // Replace with your actual API calls or data fetching logic
                    //     // For demonstration purposes, we'll set some sample options
                    //     setFournisseurOptions(['Fournisseur 1', 'Fournisseur 2', 'Fournisseur 3']);
                    //     setCategorieOptions(['Catégorie 1', 'Catégorie 2', 'Catégorie 3']);
                    //   }, []);


                      const filters = [
                        { label: 'Fournisseur', options: ['Option 1', 'Option 2', 'Option 3'] },
                        { label: 'Catégorie', options: ['Option A', 'Option B', 'Option C'] },
                        { label: 'Trier par', options: ['Option X', 'Option Y', 'Option Z'] }
                      ];


                      const [selectedFilters, setSelectedFilters] = useState({});
                            
                      const handleFilterChange: (filterLabel: string, selectedValue: string) => void = (filterLabel, selectedValue) => {
                        setSelectedFilters(prevState => ({
                          ...prevState,
                          [filterLabel]: selectedValue
                        }));
                      };
                      

                      useEffect(() => {
                        console.log(selectedFilters); // Print the updated selectedFilters state
                      }, [selectedFilters]);
                      
                      const searchParams = useSearchParams();
                    const page =  searchParams.has("page") ? searchParams.get("page") : "1";
                    console.log('page' , page);


                      let pagination: Pagination = {
                        page: Number(page),
                        per_page: 10,
                        total: 0,
                        pages: 0,
                      };
                    const image =  "https://github.com/shadcn.png"
                      const apis = [
                        {
                          apiName: "API 1",
                          apiImage: image,
                            apiDescription: "Description 1",
                        },
                        {
                          apiName: "API 2",
                          apiImage: image , 
                            apiDescription: "Description 2",
                        },
                        {
                          apiName: "API 3",
                          apiImage: image,
                            apiDescription: "Description 3",
                        },
                        {
                          apiName: "API 4",
                          apiImage: image,
                            apiDescription: "Description 4",
                        },
                        {
                          apiName: "API 5",
                          apiImage: image,
                            apiDescription: "Description 5",
                        },
                        {
                          apiName: "API 6",
                          apiImage: image,
                            apiDescription: "Description 6",
                        },
                        {
                          apiName: "API 7",
                          apiImage: image,
                            apiDescription: "Description 7",
                        },
                        {
                          apiName: "API 8",
                          apiImage: image,
                            apiDescription: "Description 8",
                        },
                        {
                          apiName: "API 9",
                          apiImage: image,
                            apiDescription: "Description 9",
                        },
                        {
                          apiName: "API 10",
                          apiImage: image,
                            apiDescription: "Description 10",
                        },
                        ];
                          


                      
  return (
     

    <div className='flex flex-col w-full gap-4 md:px-28'>
        {/* the card */}
        {/* <div className='flex flex-col w-4/5 gap-3 p-4 mx-auto border-b-2 lg:border-2 md:rounded-lg md:flex-row '>
                
               <div className="flex flex-row items-center w-full gap-3">
                    <img src={cat.apiCategoryImage} alt="category img" className='rounded-full w-14 h-14' />
                    
                    <p className="flex-1 text-lg font-bold text-center md:text-3xl text-primary">
                        {cat.apiCategory}
                    </p>

                </div>

                <p>
                    {description}
                </p>

        </div> */}

        {/* the card of the big screen */}

        <div className='grid w-full grid-cols-4 p-10 border-2 rounded-xl min-h-72'>
            <div className='col-span-4 md:col-span-3'>
                <div className='flex flex-row items-center justify-around mb-4 md:block'>
                    <p className="my-auto text-lg font-bold text-center md:text-left md:text-4xl text-primary">
                                    {cat.apiCategory}
                    </p>
                    
                    <img src={cat.apiCategoryImage} alt="category img" className='block w-10 h-10 rounded-full md:hidden md:m-auto' />

                    </div>

                    <p className='md:text-2xl'>
                    {description}
                </p>    
                    
                    </div>

                    <img src={cat.apiCategoryImage} alt="category img" className='hidden rounded-full md:m-auto md:max-h-36 md:block' />

                    
                   
            
        </div>
           

           <MainTitle title='Rechercher des APIs dans Sports APIs:'/>
            

            <section className='flex flex-col gap-4'>
                <div className='flex flex-col items-center gap-2'>
                    {/* <label htmlFor="search" className='text-lg'>Rechercher:</label> */}
                    <input type="text" id='search' className='w-full p-2 border-2 rounded-lg' placeholder='Rechercher une API' />
                </div>
                    {/* <section>
                    <label htmlFor="search" className='text-lg'>Filtrer par:</label>
                <div className='flex flex-row flex-wrap gap-2 items-starts-center'>
                <div>
                    <select name="fournisseur" className="p-2 border-2 rounded-lg">
                    <option value="">Fournisseur</option>
                    {fournisseurOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                    </select>
                    </div>
                   
                       <div>
                                <select name="categorie" className="p-2 border-2 rounded-lg">
                    <option value="">Catégorie</option>
                    {categorieOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                    </select>
                    </div>
                       <div>
                       <select name="orderBy" className="p-2 border-2 rounded-lg">
          <option value="">Trier par</option>
          {orderByOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
                    </div>
                </div>
        </section> */}

        <ApiFilters  filters={filters}  onFilterChange={handleFilterChange}/>

        <Button className='w-32 lg:mx-auto'> Filtrer </Button>


        <section className='flex flex-col justify-center gap-5 px-10'>
            <MainTitle title='Résultats de la recherche:'/>

            <div className='grid grid-cols-1 px-10 border-4 min-h-96'></div>

            {apis.map((api, index) => (
                <div key={index} className='flex flex-row items-center gap-4 p-4 border-2 rounded-lg'>
                    <img src={api.apiImage} alt="api img" className='rounded-full w-14 h-14' />
                    <div>
                        <p className='text-lg font-bold text-primary'>{api.apiName}</p>
                        <p>{api.apiDescription}</p>
                    </div>
                </div>
            ))}
             
             
             
             <AdminUsersPagination pagination={pagination}  />
             
        </section>

        

            </section>
            
                



   

    </div> // end of page
  )
}

export default DetailedCategory