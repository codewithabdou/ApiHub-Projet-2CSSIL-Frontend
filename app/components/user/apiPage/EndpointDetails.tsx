"use client"
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import testApi from "@services/api/apiTest/testApi";
import getColorByMethod from "@helpers/getColorByMethod";
import { CopyIcon } from "lucide-react";
function EndpointDetails(props: any) {
  const [request,setRequest]=useState(props.method==="GET" ? "" : props.req);
  const [response,setResponse]=useState(props.res);
  const [url,setUrl]=useState(props.name);
  const [isTesting,setIsTesting]=useState(false);
  const [isSending,setIsSending]=useState(false);
  const [color,setColor]=useState("");
  const prettify = (data:any) => {
    return JSON.stringify(data,null,2);
  };
  async function handleTest(){

    setIsSending(true);
        const result = await testApi(props.apiId, props.version, request, url, props.method);   
     if (result.status=="success") {
        setResponse(prettify(result.data))  ;
        setIsSending(false)    
    }
  }
 useEffect( ()=>{
   setColor(getColorByMethod(props.method))
 },[])
  
  return (
    
    <div className="w-full overflow-x-hidden">
      <Accordion
        type="single"
        collapsible
        className={props.method==="POST" ?
        `w-full bg-[#367BC0] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden`
      : props.method==="GET" ?
      `w-full bg-[#184173] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden`
      : props.method==="PATCH" ?
      `w-full bg-[#50E3C2] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden`
      : props.method==="DELETE" ?
      `w-full bg-[#F93E3E] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden`
      : `w-full bg-[#000000] bg-opacity-[10%] border-[2px] border-[#184173] px-2 rounded-[7px]  overflow-x-hidden`
     }
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[#184173] font-bold">
           
          <div className="gap-x-5 flex items-center">
           <div className={`w-24 h-8 bg-[${color}]  text-white flex items-center justify-center rounded-[5px]`}>
           {props.method}
           </div>
           {`${props.name}`}
          </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full flex flex-col gap-y-5 p-2 bg-white">
              <div className="flex justify-between">
              <h1 className="sm:text-xl text-lg font-medium ">
                Méthode: <span className="text-[#048B77]">{props.method}</span>
              </h1>
              <Button className="w-48"
               onClick={()=>{
                setIsTesting(!isTesting);
                setIsSending(false)

              }}>{isTesting ? "Annuler" : "Tester"}</Button>

              </div>
              
              <div className="bg-[#F2F1F1] h-fit p-2 rounded-[5px] flex justify-between px-5  items-center">
                <div>
                <span>http://localhost:5000/apis/call/{props.apiId}/{props.version}</span>
          <input className="outline-none bg-[#F2F1F1] h-fit" disabled={!isTesting} onChange={(e) => { setUrl(e.target.value);}} value={url}/>
                </div>
           
            <CopyIcon className="cursor-pointer hover:text-primary" onClick={()=>{navigator.clipboard.writeText(`http://localhost:5000/apis/call/${props.apiId}/${props.version}${url}`)}}></CopyIcon>
           </div>
             {isTesting && (<h3>Vous pouvez changer l'url pour introduire des paramètres tout en respectant son format.</h3>)} 
              <h1
                className="sm:text-xl text-lg font-medium"
                style={{ whiteSpace: "pre-line" }}
              >
                Déscription:
              </h1>
              <div className="bg-[#F2F1F1] h-fit p-2 rounded-[5px]">{props.description}</div>
              
             
     { props.method!=="GET" && (
      <div>
      <h1 className="sm:text-xl text-lg font-medium">
      Corps de la requette:
    </h1>
      <Editor
      height="250px"
      language="json"
      theme="vs-dark"
      value={request}
      options={{
        formatOnType: true,
        minimap: { scale: 10 },
        readOnly: !isTesting
      }}
      onChange={(value,event)=>{
         setRequest(value)
         
      }}
    /> 
    </div>)
}
          
              <h1 className="sm:text-xl text-lg font-medium">
                Corps de la réponse:
              </h1>
             
               <Editor
               height="250px"
               language="json"
               theme="vs-dark"
               value={response}
               options={{
                 formatOnType: true,
                 minimap: { scale: 10 },
                 readOnly:true,
               }}
               
             /> 
              <div className="flex justify-center">
              {isTesting && (<Button disabled={isSending} className="w-48" onClick={handleTest}>{isSending ? "En cours ..." : "Exécuter"}</Button>)}

              </div>

            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default EndpointDetails;
