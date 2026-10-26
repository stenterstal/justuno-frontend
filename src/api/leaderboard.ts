import { apiFetch } from "../lib/apiClient";
import type LeaderboardEntry from "../types/LeaderboardEntry";

export async function getLeaderboard(start: string, end: string): Promise<LeaderboardEntry[]> {
  const query = new URLSearchParams({ start, end });

  const res = await apiFetch<LeaderboardEntry[]>(`/leaderboard/?${query.toString()}`, { method: "GET" });

  return res.data;
}

export async function getLeaderboardDates(): Promise<{min: string, max: string}> {
  const res = await apiFetch<{ min: string; max: string }>(
    "/games/dates/",
    { method: "GET" }
  );

  return res.data;
}