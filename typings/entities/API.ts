type Category = {
  id: number;
  name: string;
};

type Supplier = {
  id: number;
  firstname: string;
  lastname: string;
};

export type API = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  category: Category;
  supplier_id: number;
  supplier: Supplier;
  status: string;
  created_at: string;
  updated_at: string;
  image: string;
};
