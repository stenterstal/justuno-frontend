import { getLeaderboard, getLeaderboardDates } from "../api/leaderboard";
import type LeaderboardEntry from "../types/LeaderboardEntry";


export async function homepageLoader(): Promise<{
  rankings: LeaderboardEntry[];
  dates: {min: string, max: string}
}> {
  const [rankings, dates] = await Promise.all([
    getLeaderboard("2026-02-01", "2026-02-28"),
    getLeaderboardDates()]);

  return { rankings, dates };
}