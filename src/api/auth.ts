import { baseFetch } from "../lib/baseFetch";

let refreshPromise: Promise<boolean> | null = null;

export async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await baseFetch("/auth/refresh/", {
          method: "POST",
        });

        return res.ok;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

export async function login(username: string, password: string): Promise<boolean> {
  const res = await baseFetch("/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ username, password }),
  });

  return res.ok
}

export async function logout() {
  await fetch("/auth/logout/", {
    method: "POST",
    credentials: "include",
  });
}