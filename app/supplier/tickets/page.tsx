import TicketsSectionForApi from '@app/components/user/apiPage/TicketsSectionForApi'
import { getAllTickets } from '@services/api/apiPage/getAllTickets';
import React from 'react'
import SupplierTicket from './SupplierTicket';
import Ticket from '@typings/entities/Ticket';
import { toast } from "sonner";
import { ErrorType } from '@typings/entities/Error';

const SupplierTickets =  async ({apiId}:{apiId:number}) => {
  let data: Ticket[] = [];

const result:
| { data: Ticket[]; status: string; message: string }
| ErrorType = await getAllTickets(apiId);

if (result.status === "success") {
const res = result as {
  data: Ticket[];
  status: string;
  message: string;
};
data = res.data;
console.log('data', data)

} else {

toast("Message", {
  description: result.message,
  action: {
    label: "Ok",
    onClick: () => null,
  },
});
}

  return (
    <div className="flex flex-col gap-1">
      {data
        ? data.map((ticket, key) => (
              <SupplierTicket key={key}
              user={ticket.user}
              id={ticket.id}
              apiId={ticket.api_id}
              status= {ticket.status}
              dateCreate= {ticket.created_at}
                title={ticket.subject}
                description={ticket.description}
                solution={ticket.response}
              />
            ))
        : null}
    </div>
  );
};
 
export default SupplierTickets