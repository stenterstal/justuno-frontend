import { useLocation, useNavigate } from "react-router";
import Heading from "../components/Heading";
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import { useState } from "react";
import DraggablePlayer from "../components/DraggablePlayer";
import RankingSlot from "../components/RankingSlot";


export default function Game(){
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedPlayers } = location.state || {};
    // const selectedPlayers = ["Atiye", "Edwin", "Sasha"]

    // Failsafe
    if(selectedPlayers == undefined || selectedPlayers.length < 2){
        alert("Can't start game without players")
        navigate('/new')
    }
    // All players that are not yet ranked
    const [unranked, setUnranked] = useState<string[]>(selectedPlayers);

    // Ranked players go into slots by index
    const [ranked, setRanked] = useState<(string | null)[]>(new Array(selectedPlayers.length).fill(null));

    const saveable = !ranked.includes(null);

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
        console.log(name)
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
            <Heading text="Potje 45" subtitle="Selecteer uitkomst"/>
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
                    <button className={`p4 py-4 w-full text-2xl rounded-2xl transition-all ${
                        saveable
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}>
                        Sla op
                    </button>
                </div>
            </DndContext>
        </>
    )
}