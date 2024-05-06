"use server"
import { API_INFO } from "@config";
import { ErrorType } from "@typings/entities/Error";
import { cookies } from "next/headers";

async function testApi(apiId: number, version: string, body: string, url: string, method: string): Promise<any> {
    try {
        const accessToken = cookies().get("user")?.value;
        const requestUrl = `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/test/${apiId}/${version}${url}`;
        console.log("here");

        const requestOptions: RequestInit = {
            method: method,
            headers: {
                'Authorization': ` ${accessToken}`,
                "Content-Type": "application/json",
            },
        };

        if (body !== '') {
            requestOptions.body = body;
        }
            
        const response = await fetch(requestUrl, requestOptions);
        console.log("done");
        
        const data = await response.json();
        return { data: data, status: "success" };
    } catch (error: any) {
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
        } as ErrorType;
    }
}

export default testApi;
