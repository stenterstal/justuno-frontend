import { API_BASE_URL } from "../config";
import type { ApiResponse } from "../types/ApiReponse";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
  token?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  { method = "GET", body, token }: ApiOptions = {}
): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Token ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const status = response.status;
    const ok = response.ok;

    if (!response.ok) {
        let message = "Request failed";
        try {
        const errorData = await response.json();
        message = errorData.detail || message;
        } catch {}
        throw new Error(message);
    }

    const data: T = await response.json();
    return {data, status, ok};
}
