type User = {
  id: number;
  email: string;
  lastname:string;
  firstname:string;
  role: string;
  status: string;
  "avatar:": string;
  phone_number:string;
  created_at: string;
  updated_at: string;
  bio:string;
  
};



export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};
export default User;
