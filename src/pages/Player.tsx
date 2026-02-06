import { NavLink, useParams } from 'react-router';
import Heading from '../components/Heading';
import { useEffect, useState } from 'react';
import { usePlayerApi } from '../api/player';
import type PlayerGame from '../types/PlayerGame';
import ResultCard from '../components/ResultCard';

export default function Player(){
    const { id } = useParams();
    const playerApi = usePlayerApi();
    const [games, setGames] = useState<PlayerGame[]>([]);

    useEffect(() => {
        const getPlayerGames = async () => {
            playerApi.getPlayerGames(id as string).then((response) => {
                if(response.ok){
                    setGames(response.data)
                }
            })
        }

        getPlayerGames();
    }, [])

    return (
        <>
            <Heading text={id || "Onbekende speler"} subtitle={`Laatste ${games.length} potjes`} endText={
                <NavLink className='flex items-center gap-1 mr-2 md:mr-4' to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    <p>Terug</p>
                </NavLink>
            }/>
            {games.map((game) => (
                <ResultCard {...game}/>
            ))}
        </>
    )
}