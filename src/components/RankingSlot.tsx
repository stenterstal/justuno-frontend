import { useDroppable } from "@dnd-kit/core";

interface RankingSlotProps {
  index: number;
  player: string | null;
  onClick: (index: number) => void;
}

const RankingSlot: React.FC<RankingSlotProps> = ({ index, player, onClick }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  const borderColorClass = {
        0: "border-yellow-400",
        1: "border-gray-400",
        2: "border-amber-700",
    }[index] ?? "border-white";

  return (
    <div
      ref={setNodeRef}
      onClick={() => player && onClick(index)}
      className={`h-12 flex items-center justify-center border-2 rounded-2xl mb-2
        ${isOver ? "border-emerald-400 bg-emerald-50" : `${borderColorClass} bg-white`}`}
    >
      {player ?
        <p className="text-xl">{player}</p> 
        : 
        <p className="text-gray-400">{ index + 1}</p>
      }
    </div>
  );
};

export default RankingSlot;