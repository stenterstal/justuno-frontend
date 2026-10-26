import { playerApi } from "../api/player";
import type Player from "../types/Player";


export async function createGameLoader(): Promise<Player[]> {
  const response = await playerApi.getPlayers();
  return response.data;
}