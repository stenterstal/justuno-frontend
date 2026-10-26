import { Navigate, useLocation, useNavigate } from "react-router";
import Heading from "../components/Heading";
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import { useState } from "react";
import DraggablePlayer from "../components/DraggablePlayer";
import RankingSlot from "../components/RankingSlot";
import { useGameApi } from "../api/game";


export default function Game(){
    const location = useLocation();
    const selectedPlayers: string[] | undefined = location.state?.selectedPlayers;

    // Failsafe, e.g. when /game is opened directly or after a refresh
    if (!selectedPlayers || selectedPlayers.length < 2) {
        return <Navigate to="/new" replace />;
    }

    return <GameBoard selectedPlayers={selectedPlayers} />;
}

function GameBoard({ selectedPlayers }: { selectedPlayers: string[] }){
    const navigate = useNavigate();
    const { createGame } = useGameApi();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // All players that are not yet ranked
    const [unranked, setUnranked] = useState<string[]>(selectedPlayers);

    // Ranked players go into slots by index
    const [ranked, setRanked] = useState<(string | null)[]>(new Array(selectedPlayers.length).fill(null));

    const saveable = !ranked.includes(null) && !saving;

    const submitGame = async () => {
        if (!saveable) return;
        setSaving(true);
        setError(null);

        const payload = {
            results: ranked.map((player, index) => ({
                player,
                position: index + 1, // index is 0-based, positions are 1-based
            })),
        };

        try {
            const response = await createGame(payload);
            navigate('/result', {state: {
                players: selectedPlayers,
                mutations: response.data.leaderboard_mutations
            }})
        } catch (err) {
            if (err instanceof Response) {
                navigate("/login");
                return;
            }
            console.error(err);
            setError("Opslaan mislukt, probeer het opnieuw");
            setSaving(false);
        }
    }

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) return;

        const playerName = active.id as string;

        // Dropped on a slot
        if (over.id.toString().startsWith("slot-")) {
            const slotIndex = parseInt(over.id.toString().replace("slot-", ""), 10);

            setRanked((prev) => {
            const newRanked = [...prev];
            // If slot is empty, place player there
            if (!newRanked[slotIndex]) {
                newRanked[slotIndex] = playerName;
                setUnranked((prevUnranked) => prevUnranked.filter((p) => p !== playerName));
            }
            return newRanked;
            });
        }
    };

    const handleSlotClick = (index: number) => {
        const player = ranked[index];
        if (!player) return; // empty slot → nothing to do

        // Remove player from ranked
        const newRanked = [...ranked];
        newRanked[index] = null;
        setRanked(newRanked);

        // Add player back to unranked
        setUnranked((prev) => [...prev, player]);
    };

    const rankPlayerInNextSlot = (name: string) => {
        const slotIndex = ranked.findIndex((slot) => slot === null);
        if (slotIndex === -1) return; // all slots filled

        setRanked((prev) => {
            const next = [...prev];
            next[slotIndex] = name;
            return next;
        });

        setUnranked((prev) => prev.filter((p) => p !== name));
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 6, // pixels before drag starts
            },
        })
    );

    return(
        <>
            <Heading text="Selecteer uitkomst"/>
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        {ranked.map((player, index) => (
                            <RankingSlot key={index} index={index} player={player} onClick={handleSlotClick} />
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {unranked.map((name) => (
                            <DraggablePlayer key={name} name={name} onClick={() => rankPlayerInNextSlot(name)}/>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    {error && <p className="text-red-500 ml-2">{error}</p>}
                    <button 
                    onClick={() => submitGame()}
                    disabled={!saveable}
                    className={`p4 py-4 w-full text-2xl rounded-2xl transition-all ${
                        saveable
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}>
                        {saving ? "Opslaan..." : "Sla op"}
                    </button>
                </div>
            </DndContext>
        </>
    )
}