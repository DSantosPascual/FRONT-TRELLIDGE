import { useDrag } from 'react-dnd';
import './TaskCard.css';

function TaskCard({ task, moveTask }) {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },  // El `id` de la tarea que será arrastrada
  });

  return (
    <div ref={drag} className="task-card">
      <div>{task.title}</div>
    </div>
  );
}

export default TaskCard;
