import { useDroppable } from "@dnd-kit/core";

interface RankingSlotProps {
  index: number;
  player: string | null;
  onClick: (index: number) => void;
}

const RankingSlot: React.FC<RankingSlotProps> = ({ index, player, onClick }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div
      ref={setNodeRef}
      onClick={() => player && onClick(index)}
      className={`h-12 flex items-center justify-center border-2 rounded-md mb-2
        ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}`}
    >
      {player ?? index + 1}
    </div>
  );
};

export default RankingSlot;