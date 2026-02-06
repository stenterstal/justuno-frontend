import type PlayerGame from "../types/PlayerGame";

export default function ResultCard({played_at, player_count, position}: PlayerGame) {
    const borderColorClass = {
        1: "border-yellow-400",
        2: "border-gray-400",
        3: "border-amber-700",
    }[position] ?? "border-white";

    return (
        <div className={`p-4 md:p-5 mb-4 rounded-2xl bg-white flex items-center border-l-8 ${borderColorClass}`}>
            <div className="flex items-center flex-1 min-w-0 text-wrap overflow-hidden text-ellipsis">
                <p className="pr-2 md:text-xl">{played_at.split('T')[0]}</p>
                {/* <h1 className="text-2xl md:text-3xl pr-6">{player}</h1> */}
            </div>
            <p className="text-2xl md:text-3xl min-w-16 md:min-w-26 text-end">{position}/{player_count}</p>
        </div>
    )
}