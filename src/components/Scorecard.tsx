import type {Scorecard as ScorecardProps} from "../types/Scorecard";

export default function Scorecard({name, ranking, matches, won, weighted_avg}: ScorecardProps) {
    const borderColorClass = {
        1: "border-yellow-400",
        2: "border-gray-400",
        3: "border-amber-700",
    }[ranking] ?? "border-slate-100";

    return (
        <div className={`p-4 md:p-5 mt-4 mb-4 rounded-2xl bg-slate-100 flex items-center border-l-8 ${borderColorClass}`}>
            <h1 className="text-2xl md:text-3xl pr-6">{name}</h1>
            <div className="flex flex-col flex-1">
                <p className="text-sm md:text-base">Gespeeld: {matches}</p>
                <p className="text-sm md:text-base">Gewonnen: {won}</p>
            </div>
            <p className="text-2xl md:text-3xl">{weighted_avg}</p>
        </div>
    )
}