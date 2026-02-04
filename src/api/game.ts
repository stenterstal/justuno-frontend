import { useApi } from "../lib/useApiFetch";
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

// Adjust this if your backend returns something specific
type CreateGameResponse = {
  player_count: number;
  leaderboard_mutations: LeaderboardMutation[]
}

export function useGameApi() {
  const apiFetch = useApi();

  const createGame = (
    payload: CreateGamePayload
  ): Promise<ApiResponse<CreateGameResponse>> => {
    return apiFetch<CreateGameResponse>("/games/", {
      method: "POST",
      body: payload,
    });
  };

  return { createGame };
}
