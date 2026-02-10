// src/api/leaderboardApi.ts
import { apiFetch } from "../lib/apiClient";
import type LeaderboardEntry from "../types/LeaderboardEntry";
import type { ApiResponse } from "../types/ApiReponse";

interface LeaderboardParams {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
}

export function useLeaderboardApi() {
  const getLeaderboard = (
    params: LeaderboardParams
  ): Promise<ApiResponse<LeaderboardEntry[]>> => {
    const query = new URLSearchParams({
      start: params.start,
      end: params.end,
    });

    return apiFetch<LeaderboardEntry[]>(
      `/leaderboard/?${query.toString()}`,
      { method: "GET" }
    );
  };

  const getLeaderboardDates = (): Promise<ApiResponse<{ min: string; max: string }>> => {
    return apiFetch<{ min: string; max: string }>(
      "/games/dates/",
      { method: "GET" }
    );
  };

  return { getLeaderboard, getLeaderboardDates };
}
