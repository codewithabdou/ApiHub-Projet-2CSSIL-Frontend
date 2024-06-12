export type key = {
    key: string;
    subscription_id: number;
    status: string;
    created_at: string; // Assuming this is a date string in ISO format
}

export type keysResponse = {
    data: key[];
    status:string;
}
