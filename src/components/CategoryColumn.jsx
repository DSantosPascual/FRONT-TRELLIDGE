import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import './CategoryColumn.css';

function CategoryColumn({ category, tasks, moveTask, addTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    await addTask({ title: newTaskTitle, category: category._id });
    setNewTaskTitle('');
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, category._id), // Mueve la tarea al soltarla
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className="category-column"
      ref={drop}  // Asigna el drop area
      style={{ backgroundColor: isOver ? 'lightgreen' : 'transparent' }}  // Cambiar color cuando se esté sobre el área de soltar
    >
      <h2 className="category-title">{category.title}</h2>
      {tasks.map((task, index) => (
        <TaskCard key={task._id} task={task} moveTask={moveTask} />
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
