import { NavLink, useLoaderData, useParams } from 'react-router';
import Heading from '../components/Heading';
import ResultCard from '../components/ResultCard';
import type PlayerGame from '../types/PlayerGame';

// Same timezone as the date shown on ResultCard; en-CA formats as YYYY-MM-DD
const dayFormatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" });

function playedOn(game: PlayerGame) {
    return dayFormatter.format(new Date(game.played_at));
}

export default function Player(){
    const { id } = useParams();
    const games = useLoaderData() as PlayerGame[];

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
            {games.map((game, index) => {
                const newDay = index > 0 && playedOn(game) !== playedOn(games[index - 1]);

                return (
                    <div key={game.played_at}>
                        {/* Centered in the gap: card's mb-4 + mt-2 above, mb-6 below */}
                        {newDay && <hr className="mt-2 mb-6 border-slate-300"/>}
                        <ResultCard {...game}/>
                    </div>
                )
            })}
        </>
    )
}