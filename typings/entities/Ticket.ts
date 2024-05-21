type Ticket = {
    id: number;
    subject: string;
    description: string;
    api_id: number ; 
    type: string;
    prioriteDuTicket: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
    response : string ;
    user : {lastname : string , firstname:string}
    };

export default Ticket;