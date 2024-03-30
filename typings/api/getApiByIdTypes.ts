export type successGetApiByIdResponse = {
    data: {
        id: Number,
        name: String,
        description: String,
        category_id: Number,
        category: {
          id: Number,
          name: String
        },
        supplier_id: Number,
        supplier: {
          id: Number,
          firstname: String,
          lastname: String
        },
        status: String,
        created_at: Date,
        updated_at: Date,
        image:string,
        plans: [
          {
            name: String,
            description: String,
            price: Number,
            max_requests: Number,
            duration: Number
          }
        ],
      },
     
     
};

export type errorGetApiByIdResponse = {
  errors?: any;
  message: String;
  status?: String;
};