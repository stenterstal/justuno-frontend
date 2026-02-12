import type PlayerGame from "../types/PlayerGame";

export default function ResultCard({played_at, player_count, position}: PlayerGame) {
    const borderColorClass = {
        1: "border-yellow-400",
        2: "border-gray-400",
        3: "border-amber-700",
    }[position] ?? "border-white";

    const date = new Date(played_at);

    const formatter = new Intl.DateTimeFormat("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "Europe/Amsterdam", // important if you want Dutch local time
    });

    const formattedDate = formatter.format(date)


    return (
        <div className={`p-4 md:p-5 mb-4 rounded-2xl bg-white flex items-center border-l-8 ${borderColorClass}`}>
            <div className="flex items-center flex-1 min-w-0 text-wrap overflow-hidden text-ellipsis">
                <p className="pr-2 md:text-xl">{formattedDate}</p>
                {/* <h1 className="text-2xl md:text-3xl pr-6">{player}</h1> */}
            </div>
            <p className="md:text-xl min-w-16 md:min-w-26 text-end">{position}e van {player_count}</p>
        </div>
    )
}