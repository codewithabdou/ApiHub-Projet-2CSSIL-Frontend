import { z } from "zod";
import Ticket from "@typings/entities/Ticket";

export const TicketForm = z.object({
  subject: z.string().min(10, {
      message: "Please enter a valid ticket name.",
    }),
    description: z.string().min(50, {
      message: "Please enter a valid ticket description (50 caracters minimum).",
    }),
    type: z.string().min(10, {
        message: "Please enter your problem's type ",
        }),
  });
export const TicketReplyForm = z.object({

    response: z.string().min(50, {
      message: "Please enter a valid ticket response (50 caracters minimum).",
    }),
  });
export type ticketFormRequest = z.infer<typeof TicketForm>;
export type ticketReplyFormRequest = z.infer<typeof TicketReplyForm>;


export type successtTicketRes = {
  status: String;
  data: Ticket[];
};

export type errortTicketRes = {
  status: String;
  message: String;
};
