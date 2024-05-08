import React from "react";
import AddDisscussionForm from "./AddDisscussionForm";
import DisscussionDetails from "./Disscussion";
import getAllDiscussions from "@services/api/apiPage/getAllDisscussions";
import { Disscussion } from "@typings/api/disscussionTypes";
import { toast } from "sonner";
import { ErrorType } from "@typings/entities/Error";
import { getAllTickets } from "@services/api/apiPage/getAllTickets";
import Ticket from "../Ticket";

const TicketsSectionForApi = async (props: any) => {
//   let data: Disscussion[] = [];

//   const result:
//     | { data: Disscussion[]; status: string; message: string }
//     | ErrorType =  getAllTickets(props.id);
    const data =   getAllTickets(props.id);
//   if (result.status === "success") {
//     console.log(result);

//     const res = result as {
//       data: Disscussion[];
//       status: string;
//       message: string;
//     };
//     data = res.data;
//   } else {
//     toast("Message", {
//       description: result.message,
//       action: {
//         label: "Ok",
//         onClick: () => null,
//       },
//     });
//   }

  return (
    <div className="flex flex-col gap-1">
      {data
        ? data /*slice(startIndex, endIndex)*/
            .map((ticket, key) => (
              <Ticket key={key}
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

export default TicketsSectionForApi;


//! supplier ticket 
//! it has the response button to it , on click it will open a modal with the response form
//! button of changing the status of the ticket , an select to change its status to open , closed , in progress . 
//! the ticket of the supplier has who wrote the shit down ,  the priority , and that' is
