type Api= {
    id: number;
    name: string;
    supplier_id: number;
  }
  
  type User= {
    id: number;
    firstname: string;
    lastname: string;
  }
  
  type SubData= {
    id: number;
    api_id: number;
    api: Api;
    api_plan: string;
    user_id: number;
    user: User;
    start_date: string;
    end_date: string;
    remaining_requests: number;
    status: string;
    expired: boolean;
    price: number;
  }
  
  type Pagination ={
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }
  
  export type SubscriptionResponse= {
    data: SubData[];
    pagination: Pagination;
  }
  
  