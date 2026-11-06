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
  // null when this game is the player's first of the month
  old_position: number | null;
  new_position: number;
  delta: number | null;
}

type CreateGameResponse = {
  player_count: number;
  leaderboard_mutations: LeaderboardMutation[];
};

export async function getLatestGamePlayers(): Promise<string[]> {
  const res = await apiFetch<{ players: string[] }>("/games/latest/", { method: "GET" });

  return res.data.players;
}

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
