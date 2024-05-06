"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@app/components/ui/button"
import KeysDataTable from './data-table'
import { key, keysResponse } from '@typings/api/keys';
import getKeys from '@services/api/apiPage/getKeys';
import createKey from '@services/api/apiPage/createKey';
const Keys=  (props:any) =>{
  const [keys, setKeys] = useState<key[]>([]);
  const [created, setCreated] = useState(false);

    useEffect( ()=>{
      const fetchKeys = async () => {
        try {
            const availablekeys = await getKeys(props.id);
            if (availablekeys) {
                const result = availablekeys as keysResponse;
                setKeys(result.data);
            } else {
                console.log("error keys");
            }
        } catch (error) {
            console.error("Error fetching keys:", error);
        }
    };

    fetchKeys();
    },[created])
      
  async function handleCreateKey(){
      const result=await createKey(props.id);
      if (result) {
        setCreated(true);
      }
  }
  return (
<div className="w-full overflow-x-hidden">     
    <div className='w-full flex justify-start p-4'>
    <Button className='text-primary bg-white hover:underline hover:bg-white ' onClick={() => props.setSelectedSub(null)}>
  Retourner vers mes souscriptions
</Button>
    </div>
    <div className='w-full flex justify-end p-4 '>
        <Button className='bg-[#00B69B]' 
        onClick={handleCreateKey}
         >Genérer une clé</Button>
    </div>   
    
    <KeysDataTable data={keys} />
    </div>
  )
}

export default Keys