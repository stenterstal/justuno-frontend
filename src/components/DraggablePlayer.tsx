import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggablePlayer: React.FC<{ name: string, onClick: () => void }> = ({ name, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: name,
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={onClick}
      className="px-4 py-2 border rounded-md bg-white mb-2 cursor-grab select-none touch-none"
    >
      {name}
    </div>
  );
};

export default DraggablePlayer;
