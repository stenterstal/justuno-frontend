import { useLocation, useNavigate } from "react-router";
import Heading from "../components/Heading";
import MutationCard from "../components/MutationCard";
import type LeaderboardMutation from "../types/LeaderboardMutation";
import { useState } from "react";

export default function GameResult(){
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false)

    const { players, mutations } = location.state || {};

    return (
        <>
            <Heading text="Resultaat" subtitle=""/>
            {mutations &&
                <div>
                    {mutations.map((mutation: LeaderboardMutation) => (
                        <MutationCard mutation={mutation} players={players}/>
                    ))}
                </div>
            }
            <div className="flex gap-2">
                <div className="flex-1">
                    <button
                    onClick={() => navigate('/')}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white py-4 px-6 cursor-pointer">
                    Stand
                    </button>
                </div>
                <div className="relative flex-1">
                    <button
                    onClick={() => setOpen(prev => !prev)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-white py-4 px-6 cursor-pointer flex items-center justify-center gap-1"
                    >
                        Nieuw spel
                        {open ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        }
                    </button>

                    {open && (
                        <div className="absolute z-10 bottom-full mb-2 w-full rounded-xl bg-emerald-500 shadow-lg overflow-hidden">
                            <button
                            onClick={() => {
                                setOpen(false)
                                navigate('/game', {state: {selectedPlayers: players}})
                            }}
                            className="w-full px-4 py-3 text-center text-white hover:bg-emerald-600 cursor-pointer">
                                Dezelfde spelers
                            </button>

                            <button
                            onClick={() => {
                                setOpen(false)
                                navigate('/new', {state: {players: players}})
                            }}
                            className="w-full px-4 py-3 text-center text-white hover:bg-emerald-600 cursor-pointer">
                                Selecteer spelers
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}