import TicketsSectionForApi from '@app/components/user/apiPage/TicketsSectionForApi'
import { getAllTickets } from '@services/api/apiPage/getAllTickets';
import React from 'react'
import SupplierTicket from './SupplierTicket';

const SupplierTickets = () => {
const data =   getAllTickets(1);


  return (
    <div className="flex flex-col gap-1">
      {data
        ? data /*slice(startIndex, endIndex)*/
            .map((ticket, key) => (
              <SupplierTicket key={key}
              status= {ticket.status}
              dateCreate= {ticket.dateCreate}
                title={ticket.title}
                description={ticket.description}
                solution={ticket.solution}
              />
            ))
        : null}
    </div>
  );
};
 
export default SupplierTickets