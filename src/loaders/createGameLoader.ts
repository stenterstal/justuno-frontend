import { playerApi } from "../api/player";
import type Player from "../types/Player";


export async function createGameLoader(): Promise<Player[]> {
  const response = await playerApi.getPlayers();
  if (!response.ok) throw new Response("Failed to fetch players", { status: 500 });
  return response.data;
}