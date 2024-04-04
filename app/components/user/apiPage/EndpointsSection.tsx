"use client"
import React, { useState } from 'react'
import { Label } from '@app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@app/components/ui/select';
import EndpointDetails from '@app/components/user/apiPage/EndpointDetails';
import getVersionDetails from '@services/api/apiPage/getVersionDetails';
import { errorGetVersionDetailsResponse, successGetVersionDetailsResponse } from '@typings/api/getVersionDetailsTypes';
import PaginationBar from '../../Shared/Pagination';

function EndpointsSection(props:any) {
    const [startIndex, setStartIndex] = useState(0);
    const rowsPerPage=3;
    const [endIndex, setEndIndex] = useState(rowsPerPage);
    async function handleVersionChange(version: String) {//load current version
        const res = await getVersionDetails(props.apiId, version);
        if (res) {
            const data = res as successGetVersionDetailsResponse;
            props.setEndpoints(data.data.endpoints);
        } else {
            const errorData = res as errorGetVersionDetailsResponse;
            return errorData;
        }
    }
  return (
    <div className='w-full flex flex-col gap-y-5 items-start p-5'>
        <Label>Veuillez choisir une version</Label>
                <Select onValueChange={(e) => {
                    handleVersionChange(e);
                }}
                >
                    <SelectTrigger className='sm:w-80 w-48 border-2 border-[#184173] outline-none'>
                        <SelectValue placeholder={props.versions.length>0 ? `${props.versions[0].version}` : "Cet API n'a pas de versions"} defaultValue={props.versions.length >0 ? `${props.versions[0].version}` : "Cet API n'a pas de versions"} />
                    </SelectTrigger>

                    <SelectContent>
                        {props.versions.map((dur:any, key:number) => (
                            <SelectItem key={key} value={`${dur.version}`}>
                                {dur.version}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                      {props.endpoints ?  props.endpoints.slice(startIndex, endIndex).map((endpoint:any, index:number) => (
                        <EndpointDetails name={endpoint.url} method={endpoint.method} description={endpoint.description} req={endpoint.request_body} res={endpoint.response_body} />
                    )
                       
                    ) : <h1>Cette version n'a pas de endpoints</h1>}
                     {props.endpoints.length ?  (<PaginationBar rowsPerPage={rowsPerPage} startIndex={startIndex} endIndex={endIndex}
              setStartIndex={setStartIndex} setEndIndex={setEndIndex} length={props.endpoints.length ? Math.ceil(props.endpoints.length/ rowsPerPage)*rowsPerPage :0}/>) : null}  
    </div>
  )
}

export default EndpointsSection