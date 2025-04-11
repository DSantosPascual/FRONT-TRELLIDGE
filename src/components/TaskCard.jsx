import { useState } from 'react';
import { useDrag } from 'react-dnd';
import './TaskCard.css';

function TaskCard({ task, moveTask, onRename, onDelete, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
  });

  const handleBlur = () => {
    setIsEditing(false);
    if (title !== task.title) {
      onRename(task._id, title);
    }
  };

  return (
    <div ref={drag} className="task-card" onClick={() => onClick(task)}>
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
        />
      ) : (
        <div className={task.completed ? 'task-completed' : ''}>
          {task.title}
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task._id);
        }}
        className="delete-task-btn"
      >
        <img src="/icons/borrar.png" alt="Eliminar" />
      </button>
    </div>
  );
}

export default TaskCard;
