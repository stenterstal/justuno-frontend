import { API_BASE_URL } from "../config";

function normalizeEndpoint(endpoint: string): string {
  let path = endpoint.replace(/^\/+/, "");

  if (!path.startsWith("api/")) {
    path = `api/${path}`;
  }

  return path;
}

function buildUrl(base: string, endpoint: string) {
  const normalizedEndpoint = normalizeEndpoint(endpoint);

  if(!base || base === "/"){
    base = window.location.origin
  }

  const baseUrl = base.replace(/\/+$/, "") + "/";
  const url = new URL(normalizedEndpoint, baseUrl);

  // Force trailing slash on pathname (before ?query)
  if (!url.pathname.endsWith("/")) {
    url.pathname += "/";
  }

  return url.toString();
}

export async function baseFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = buildUrl(API_BASE_URL, endpoint);

  return fetch(url, {
    ...options,
    credentials: "include",
  });
}
