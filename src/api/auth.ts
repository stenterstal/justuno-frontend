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

// Only refreshes when the access token is no longer valid. Refreshing rotates and
// blacklists the refresh token, so doing it on every navigation logs out other tabs.
export async function checkSession(): Promise<boolean> {
  try {
    const res = await baseFetch("/auth/me/");

    if (res.ok) return true;
    if (res.status === 401) return refreshSession();
    return false;
  } catch {
    return false;
  }
}

// Returns the HTTP status, 0 when the request itself failed
export async function login(username: string, password: string): Promise<number> {
  try {
    const res = await baseFetch("/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username, password }),
    });

    return res.status;
  } catch {
    return 0;
  }
}

export async function logout() {
  await baseFetch("/auth/logout/", {
    method: "POST",
  });
}