import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'



const ApiCategoryCard = ({apiCategory = "Sport-API" , apiCategoryImage ="https://github.com/shadcn.png" , CategoryDescription = "Fournir des donnees en temps reel sur differents sports dans le monde"}) => {
  return (
    <Card className='shadow-lg drop-shadow-lg flex flex-col gap-0 mx-5'>
    <CardHeader className='p-3'>
      <Avatar  className='mx-auto w-16 h-16'>
  <AvatarImage src={apiCategoryImage} />
  <AvatarFallback>API</AvatarFallback>
</Avatar>
      <CardTitle className='text-center text-base'>
        {apiCategory}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-sm text-center'>{CategoryDescription}</p>
    </CardContent>
 
  </Card>
  )
}

export default ApiCategoryCard