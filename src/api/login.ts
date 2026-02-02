// src/api/players.ts

import { apiFetch } from "../lib/apiClient";
import type LoginResponse from "../types/Login";

export const loginRequest = (username: string, password: string) =>
  apiFetch<LoginResponse>("/api/login/", {
    method: "POST",
    body: { username, password },
  });
