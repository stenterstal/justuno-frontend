import { refreshSession } from "../api/auth";
import type { ApiResponse } from "../types/ApiReponse";
import { baseFetch } from "./baseFetch";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: any;
}

export async function apiFetch<T>(
  endpoint: string,
  { method = "GET", body }: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const headers: HeadersInit =
    body !== undefined
      ? { "Content-Type": "application/json" }
      : {};

  let response = await baseFetch(endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    const refreshed = await refreshSession();

    if (!refreshed) {
      throw new Error("Session expired");
    }

    response = await baseFetch(endpoint, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  const status = response.status;
  const ok = response.ok;

  if (!ok) {
    let message = "Request failed";
    try {
      const errorData = await response.json();
      message = errorData.detail || message;
    } catch {}
    throw new Error(message);
  }

  const data: T = await response.json();
  return { data, status, ok };
}
