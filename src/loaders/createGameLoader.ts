import { getLatestGamePlayers } from "../api/game";
import { playerApi } from "../api/player";
import type Player from "../types/Player";

export interface CreateGameData {
  players: Player[];
  previousPlayers: string[];
}

export async function createGameLoader(): Promise<CreateGameData> {
  const [response, previousPlayers] = await Promise.all([
    playerApi.getPlayers(),
    getLatestGamePlayers(),
  ]);

  return { players: response.data, previousPlayers };
}
