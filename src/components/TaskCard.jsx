import { useState } from 'react';
import { useDrag } from 'react-dnd';
import './TaskCard.css';

function TaskCard({ task, moveTask, onRename }) {
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
    <div ref={drag} className="task-card">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{task.title}</div>
      )}
    </div>
  );
}

export default TaskCard;
