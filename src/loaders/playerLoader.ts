import type { LoaderFunctionArgs } from "react-router";
import { playerApi } from "../api/player";
import type PlayerGame from "../types/PlayerGame";


export async function playerLoader({params}: LoaderFunctionArgs): Promise<PlayerGame[]> {
    const id = params.id
    if (!id) throw new Response("Player ID not found", { status: 404 });
    const response = await playerApi.getPlayerGames(id);
    if (!response.ok) throw new Response("Failed to fetch players", { status: 500 });
    return response.data;
}