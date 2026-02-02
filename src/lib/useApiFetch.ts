import { useAuth } from "../auth/AuthProvider";
import { API_BASE_URL } from "../config";
import type { ApiResponse } from "../types/ApiReponse";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: unknown;
}

// Custom hook around apiFetch that can automatically receive token from AuthProvider
export function useApi() {
  const { token } = useAuth();

  // The returned function is your "apiFetch"
  async function apiFetch<T>(
    endpoint: string, // relative to /api
    { method = "GET", body }: ApiOptions = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Token ${token}`;
    }

    // automatically prepend /api
    const url = `${API_BASE_URL}/api${endpoint}`;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

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

    const data: T = (await response.json()) as T;
    return { data, status, ok };
  }

  return apiFetch;
}
