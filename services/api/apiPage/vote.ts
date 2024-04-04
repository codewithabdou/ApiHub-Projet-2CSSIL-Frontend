"use server"
import { API_INFO } from "@config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface VoteFormData {
    vote: string;
}



interface Response {
    status: string;
    message: string;
}


async function vote(formData: VoteFormData, apiId: number, discussionId: number, answerId: number): Promise<Response> {
    try {
        const formdatajson = JSON.stringify(formData);
        const accessToken = cookies().get("user")?.value;
        const response = await fetch(
            `${API_INFO.API_BASE_URL}${API_INFO.API_ENDPOINTS.GENERAL.GET_APIS}/${apiId}/discussions/${discussionId}/answers/${answerId}/votes`,
            {
                method: "POST",
                body: formdatajson,
                headers: {
                    'Authorization': `${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 204) {
            revalidateTag("getVotes");
            return { status: "success", message: "voted successfully" };
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error: any) {
        return {
            status: "server error",
            message: error.message || "An unexpected server error occurred",
        };
    }
}

export default vote;
