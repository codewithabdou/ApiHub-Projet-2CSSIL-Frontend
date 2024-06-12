import React from "react";
import AddDisscussionForm from "./AddDisscussionForm";
import DisscussionDetails from "./Disscussion";
import getAllDiscussions from "@services/api/apiPage/getAllDisscussions";
import { Disscussion } from "@typings/api/disscussionTypes";
import { toast } from "sonner";
import { ErrorType } from "@typings/entities/Error";
import { getAllTickets } from "@services/api/apiPage/getAllTickets";
import Ticket from "../Ticket";
import TicketType from "@typings/entities/Ticket";
// import Ticket from "../Ticket";
// import Ticket from "@typings/entities/Ticket";
// import Ticket from "@typings/entities/Ticket";

const TicketsSectionForApi = async (props: any) => {
  let data: TicketType[] = [];

const result:
| { data: TicketType[]; status: string; message: string }
| ErrorType = await getAllTickets(props.id);

if (result.status === "success") {
const res = result as {
  data: TicketType[];
  status: string;
  message: string;
};
data = res.data;

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
        ? data /*slice(startIndex, endIndex)*/
            .map((ticket, key) => (
              <Ticket key={key}
              user={ticket.user}
              id={ticket.id}
              response={ticket.response}
              title={ticket.subject}
              description={ticket.description}
              status= {ticket.status}
              dateCreate= {ticket.created_at}
              />
            ))
        : null}
    </div>
  );
};

export default TicketsSectionForApi;

