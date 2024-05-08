import { z } from "zod";
import Ticket from "@typings/entities/Ticket";

export const TicketForm = z.object({
    sujet: z.string().min(10, {
      message: "Please enter a valid category name.",
    }),
    description: z.string().min(50, {
      message: "Please enter a valid category description (50 caracters minimum).",
    }),
    typeDuProbleme: z.string().min(10, {
        message: "Please enter your problem's type ",
        }),
    prioriteDuTicket: z.string().min(2, {
        message: "Please enter the priority of your ticket",
        }),
  });
export type ticketFormRequest = z.infer<typeof TicketForm>;


export type successtTicketRes = {
  status: String;
  data: Ticket[];
};

export type errortTicketRes = {
  status: String;
  message: String;
};
