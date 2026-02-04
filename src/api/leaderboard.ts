import { useApi } from "../lib/useApiFetch";
import type LeaderboardEntry from "../types/LeaderboardEntry";
import type { ApiResponse } from "../types/ApiReponse";

interface LeaderboardParams {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
}

export function useLeaderboardApi() {
  const apiFetch = useApi();

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

  const getLeaderboardDates = () => {
    return apiFetch<{min: string, max: string}>(
      '/games/dates/',
      { method: "GET" }
    );
  }

  return { getLeaderboard, getLeaderboardDates };
}
