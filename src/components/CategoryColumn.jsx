import { useState } from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import Category from './Category'; // nuevo
import './CategoryColumn.css';

function CategoryColumn({ category, tasks, moveTask, addTask, renameCategory, renameTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    await addTask({ title: newTaskTitle, category: category._id });
    setNewTaskTitle('');
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, category._id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className="category-column"
      ref={drop}
      style={{ backgroundColor: isOver ? 'lightgreen' : 'transparent' }}
    >
      <Category category={category} onRename={renameCategory} />

      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} moveTask={moveTask} onRename={renameTask} />
      ))}

      <div className="task-input-container">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Añadir tarea..."
          className="task-input"
        />
        <button onClick={handleCreateTask} className="task-add-button">Añadir</button>
      </div>
    </div>
  );
}

export default CategoryColumn;
