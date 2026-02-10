import { apiFetch } from "../lib/apiClient";
import type { ApiResponse } from "../types/ApiReponse";

interface GameResult {
  player: string | null;
  position: number;
}

interface CreateGamePayload {
  results: GameResult[];
}

interface LeaderboardMutation {
  player: string;
  old_position: number;
  new_position: number;
  delta: number;
}

type CreateGameResponse = {
  player_count: number;
  leaderboard_mutations: LeaderboardMutation[];
};

export function useGameApi() {
  const createGame = (
    payload: CreateGamePayload
  ): Promise<ApiResponse<CreateGameResponse>> =>
    apiFetch<CreateGameResponse>("/games/", {
      method: "POST",
      body: payload,
    });

  return { createGame };
}
