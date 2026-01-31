import { useApi } from "../lib/useApiFetch";
import type Player from "../types/Player";
import type { ApiResponse } from "../types/ApiReponse";

export function usePlayerApi() {
  const apiFetch = useApi();

  const getPlayers = (): Promise<ApiResponse<Player[]>> => {
    return apiFetch<Player[]>("/players/", {
      method: "GET",
    });
  };

  const createPlayer = (name: string): Promise<ApiResponse<Player>> => {
    return apiFetch<Player>("/players/", {
      method: "POST",
      body: { name },
    });
  };

  return { getPlayers, createPlayer };
}
