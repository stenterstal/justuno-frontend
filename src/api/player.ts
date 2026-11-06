import { apiFetch } from "../lib/apiClient";
import type Player from "../types/Player";
import type PlayerGame from "../types/PlayerGame";
import type { ApiResponse } from "../types/ApiReponse";

export const playerApi = {
  getPlayers(): Promise<ApiResponse<Player[]>> {
    return apiFetch<Player[]>("/players/", { method: "GET" });
  },

  getPlayerGames(name: string): Promise<ApiResponse<PlayerGame[]>> {
    return apiFetch<PlayerGame[]>(`/players/${encodeURIComponent(name)}/games`, { method: "GET" });
  },

  createPlayer(name: string): Promise<ApiResponse<Player>> {
    return apiFetch<Player>("/players/", {
      method: "POST",
      body: { name },
    });
  },
};
