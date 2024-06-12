import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Ticket = ({ title, description, dateCreate, status, response , id , user}: {user:{firstname:string , lastname:string} , id:number  ,  title: string; description: string; dateCreate: string; status: string; response?: string }) => {
  const statusColor = (status: string) => {
    if (status === 'open') {
      return 'bg-green-500';
    } else if (status === 'closed') {
      return 'bg-red-500';
    } else if (status === 'In progress') {
      return 'bg-yellow-500';
    }
  };

  return (
    <div className="rounded-sm flex flex-col border-2 h-fit py-4 gap-2 mx-10 relative">
        
      <div className="flex flex-row gap-4 justify-center items-center px-4">
        <div className={`w-20 rounded-lg text-center py-1 h-6 text-white font-semibold text-xs ${statusColor(status)}`}>{status}</div>
        <div className="font-semibold text-gray-500">#{id}</div>
        <div className="ml-auto flex flex-row gap-2 justify-center items-center">
       
          <p className="font-normal text-gray-500">signalé par : {user.firstname} {user.lastname} </p>
        </div>
      </div>

      <div className="flex flex-col px-6 border-b-2 border-b-gray-300 mx-2 pb-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-gray-700 text-wrap break-words">{description}</p>
      </div>

      <div className="flex flex-row justify-between px-8 items-center">
        <p className="px-6 text-gray-500 text-sm">Creé à : {dateCreate}</p>
      </div>

      {status === 'closed' && (
        <Accordion type="single" collapsible className="px-6  ml-6 mt-0">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-gray-600">Afficher la réponse du support</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 py-6">{response}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default Ticket;
