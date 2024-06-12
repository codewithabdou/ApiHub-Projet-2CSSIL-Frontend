type User = {
  id: number;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  status: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  phone_number: string;
  bio: string;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  created_by: number;
  updated_at: string;
  image: string;
};


export default User;
