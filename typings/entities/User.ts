type User = {
  id: number;
  email: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  avatar: string;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};
export default User;
