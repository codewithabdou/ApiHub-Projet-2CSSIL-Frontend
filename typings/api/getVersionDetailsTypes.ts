import Endpoint from "@typings/entities/Endpoint";

export type successGetVersionDetailsResponse = {
    data:{
        version:String,
        api:{
            id:Number,
            name:String
        },
        status:String,
        base_url:String,
        created_at: Date,
        updated_at: Date,
        endpoints:Endpoint[],

    
    }
};

export type errorGetVersionDetailsResponse = {
  errors?: any;
  message: String;
  status?: String;
};