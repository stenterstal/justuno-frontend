// src/api/playerApi.ts
import { apiFetch } from "../lib/apiClient";
import type Player from "../types/Player";
import type PlayerGame from "../types/PlayerGame";
import type { ApiResponse } from "../types/ApiReponse";

export function usePlayerApi() {
  const getPlayers = (): Promise<ApiResponse<Player[]>> =>
    apiFetch<Player[]>("/players/", { method: "GET" });

  const getPlayerGames = (
    name: string
  ): Promise<ApiResponse<PlayerGame[]>> =>
    apiFetch<PlayerGame[]>(`/games/${name}`, { method: "GET" });

  const createPlayer = (
    name: string
  ): Promise<ApiResponse<Player>> =>
    apiFetch<Player>("/players/", {
      method: "POST",
      body: { name },
    });

  return {
    getPlayers,
    getPlayerGames,
    createPlayer,
  };
}
