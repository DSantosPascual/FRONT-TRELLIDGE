import { useState } from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import Category from './Category';
import './CategoryColumn.css';

function CategoryColumn({
  category,
  tasks,
  moveTask,
  addTask,
  renameCategory,
  renameTask,
  onDeleteTask,
  onDeleteCategory,
  onTaskClick
}) {

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    addTask({ title: newTaskTitle, category: { _id: category._id } });
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
      style={isOver ? { backgroundColor: 'lightgreen' } : {}}
    >
      <Category
        category={category}
        onRename={renameCategory}
        onDelete={onDeleteCategory}
      />

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          moveTask={moveTask}
          onRename={renameTask}
          onDelete={onDeleteTask}
          onClick={onTaskClick}
        />
      ))}

      <div className="task-input-container">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
          placeholder="Añadir tarea..."
          className="task-input"
        />
        <button onClick={handleCreateTask} className="task-add-button">Añadir</button>
      </div>
    </div>
  );
}

export default CategoryColumn;
