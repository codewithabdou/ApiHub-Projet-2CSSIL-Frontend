import { z } from "zod";
const createDiscussionSchema = z.object({
  title: z.string().min(2, {
    message: "Please enter a valid title .",
  }),
  question: z.string().min(8, {
    message: "Please enter a valid question.",
  }),
  
});
const createAnswerSchema = z.object({
  answer: z.string().min(2, {
    message: "Please enter a valid title .",
  }),
  
  
});



export type createDisscussionRequest = z.infer<typeof createDiscussionSchema>;
export type createAnswerRequest = z.infer<typeof createAnswerSchema>;


export type successCreateDiscussionResponse = {
  data:{
    id:number,
    title:string,
    question:string,
    user:{
        id:number,
        email:string,
        role:string,
        firstname:string,
        lastname:string,
        status:string,
        created_at: Date,
        updated_at:Date,
        avatar:string,
        phone_number:string,
        bio:string
    },
     created_at:Date,
     api_id:number,
     answers:Answer[]
  }
};
export type Disscussion={
  id:number,
    title:string,
    question:string,
    user:{
        id:number,
        email:string,
        role:string,
        firstname:string,
        lastname:string,
        status:string,
        created_at: Date,
        updated_at:Date,
        avatar:string,
        phone_number:string,
        bio:string
    },
     created_at:Date,
     api_id:number
}
export type Answer={
  id:number,
  discussion_id:number,
  user:{
    id:number,
    email:string,
    role:string,
    firstname:string,
    lastname:string,
    status:string,
    created_at: Date,
    updated_at:Date,
    avatar:string,
    phone_number:string,
    bio:string
},
answer:string,
created_at:Date,
votes:number

}
export type errorCreateDiscussionResponse = {
  errors?: any;
  message: String;
  status?: String;
};



export { createDiscussionSchema };
export { createAnswerSchema };
