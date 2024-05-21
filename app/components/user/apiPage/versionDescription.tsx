"use client"
import { Label } from '@app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@app/components/ui/select';
import { Textarea } from '@app/components/ui/textarea';
import convertToDate from '@helpers/convertToDate';
import getColorByMethod from '@helpers/getColorByMethod';
import getVersionDetails from '@services/api/apiPage/getVersionDetails';
import { errorGetVersionDetailsResponse, successGetVersionDetailsResponse } from '@typings/api/getVersionDetailsTypes';
import Endpoint from '@typings/entities/Endpoint';
import { ErrorType } from '@typings/entities/Error';
import React, { useState } from 'react'

function VersionDescription(props:any) {
const [versionName,setVersionName]=useState(props.versions[0].version);
const [date,setDate]=useState(props.versions[0].updated_at);

const [endpoints, setEndpoints] = useState<Endpoint[]>(props.endpoints);
async function handleVersionChange(version: String) {
    setEndpoints([]);
    const res:
      | {
          data: successGetVersionDetailsResponse;
          status: string;
          message: string;
        }
      | ErrorType = await getVersionDetails(props.apiId, version);
    if (res.status === "success") {
      const result = res as {
        data: successGetVersionDetailsResponse;
        status: string;
        message: string;
      };
      const data = result.data;
      console.log(data);

      setEndpoints(data.data.endpoints);
      setDate(data.data.updated_at)
      console.log(props.endpoints);
    } else {
      const errorData = res as errorGetVersionDetailsResponse;
      return errorData;
    }
  }
  return (
    <div className="w-full flex flex-col gap-y-5 items-start p-5">
        <h1 className='font-bold'>Description:</h1>
    <Textarea style={{ whiteSpace: "pre-line" }}>{props.apiDescription}</Textarea>
    <h1 className='font-bold'>Date de la dernière mise à jour: <span className={`text-[#168004] font-medium`}>{convertToDate(date)}</span></h1>

        <Label className='font-bold'>Veuillez choisir une version</Label>
      <Select
        onValueChange={(e) => {
          handleVersionChange(e);
          setVersionName(e);
        }}
      >
        <SelectTrigger className="sm:w-80 w-48 border-2 border-[#184173] outline-none">
          <SelectValue
            placeholder={
              props.versions.length > 0
                ? `${props.versions[0].version}`
                : "Cet API n'a pas de versions"
            }
            defaultValue={
              props.versions.length > 0
                ? `${props.versions[0].version}`
                : "Cet API n'a pas de versions"
            }
          />
        </SelectTrigger>

        <SelectContent>
          {props.versions.map((dur: any, key: number) => (
            <SelectItem key={key} value={`${dur.version}`}>
              {dur.version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <h1 className='font-bold'>Endpoints:</h1>

      {endpoints ? (
        endpoints /*.slice(startIndex, endIndex)*/
          .map((endpoint: Endpoint, index: number) => (
           <div className='w-4/5 min-h-24 h-fit flex flex-col items-start gap-x-2 p-2 border-2 border-grey rounded-[5px]'>
              <h1 className='font-bold'>Méthode: <span 
              className={endpoint.method==="POST" ?
              ` text-[#367BC0] `
            : endpoint.method==="GET" ?
            ` text-[#184173] `
            : endpoint.method==="PATCH" ?
            ` text-[#50E3C2] `
            : endpoint.method==="DELETE" ?
            ` text-[#F93E3E] `
            : ` text-[#000000] `
           }>{endpoint.method}</span></h1>
              <h1 className='font-bold'>Endpoint: <span className={`font-normal`}>{endpoint.url}</span></h1>
              <h1 className='font-bold'>Description: <span className={`font-light`}>{endpoint.description}</span></h1>
           </div>
          ))
      ) : (
        <h1>Cette version n'a pas de endpoints</h1>
      )}
    </div>
  )
}

export default VersionDescription