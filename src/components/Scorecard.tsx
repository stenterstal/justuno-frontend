import type LeaderboardEntry from "../types/LeaderboardEntry";

export default function Scorecard({player, games_played, games_won, final_score, position}: LeaderboardEntry) {
    const borderColorClass = {
        1: "border-yellow-400",
        2: "border-gray-400",
        3: "border-amber-700",
    }[position] ?? "border-white";

    return (
        <div className={`p-4 md:p-5 mb-4 rounded-2xl bg-white flex items-center border-l-8 ${borderColorClass}`}>
            <div className="flex items-center flex-1 min-w-0 text-wrap overflow-hidden text-ellipsis">
                <p className="pr-2">{position}</p>
                <h1 className="text-2xl md:text-3xl pr-6">{player}</h1>
            </div>
            <div className="flex flex-col min-w-12">
                <p className="text md:text-base">🃏 {games_played}</p>
                <p className="text md:text-base">🏆 {games_won}</p>
            </div>
            <p className="text-2xl md:text-3xl min-w-16 md:min-w-26 text-end">{final_score}</p>
        </div>
    )
}