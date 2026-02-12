import type LeaderboardMutation from "../types/LeaderboardMutation";

function MutationIcon({ delta }: { delta: number }){
    if(delta == 1){ return(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>)}
    if(delta > 1){ return(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>)}
    if(delta == -1){ return(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>)}
    if(delta < -1){ return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 stroke-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>)}
}

function MutationInfo({ delta }: { delta: number }){
    return (
        <>
            <p>{delta === 0 ? "-" : delta}</p>
            <MutationIcon delta={delta}/>
        </>
    )
}

interface MutationCardProps {
    mutation: LeaderboardMutation
    players: string[]
}

export default function MutationCard({mutation, players}: MutationCardProps) {
    const borderColorClass = {
        1: "border-l-8 border-yellow-400",
        2: "border-l-8 border-gray-400",
        3: "border-l-8 border-amber-700",
    }[mutation.new_position] ?? "border-white";

    return (
        <div className={`p-4 md:p-5 mb-4 rounded-2xl flex items-center ${borderColorClass} ${
            players.includes(mutation.player) ? 'bg-white' : 'bg-slate-100'
            }`}>
            <h1 className="text-2xl md:text-3xl pr-6 flex-1 min-w-0 text-wrap overflow-hidden text-ellipsis">{mutation.player}</h1>
            <div className="flex">
                <MutationInfo delta={mutation.delta}/>
                <p className="text-1xl md:text-2xl min-w-18 md:min-w-26 text-end">Plek {mutation.new_position}</p>
            </div>
        </div>
    )
}