import { getLeaderboard, getLeaderboardDates } from "../api/leaderboard";
import type LeaderboardEntry from "../types/LeaderboardEntry";
import type { LoaderFunctionArgs } from "react-router";

function getMonthRange(month?: string): { min: string; max: string } {
  let target: Date;

  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const [year, monthIndex] = month.split("-").map(Number);
    target = new Date(year, monthIndex - 1);
  } else {
    target = new Date();
  }

  const year = target.getFullYear();
  const monthIndex = target.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const format = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return { min: format(firstDay), max: format(lastDay) };
}

export async function homepageLoader( { params }: LoaderFunctionArgs): Promise<{
  rankings: LeaderboardEntry[];
  dates: {min: string, max: string}
}> {
  const { min, max } = getMonthRange(params.month);
  const [rankings, dates] = await Promise.all([
    getLeaderboard(min, max),
    getLeaderboardDates()]);

  return { rankings, dates };
}