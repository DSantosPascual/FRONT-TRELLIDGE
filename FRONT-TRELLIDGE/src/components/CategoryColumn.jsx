import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskCard from './TaskCard';  // Asegúrate de tener un componente TaskCard adecuado

const CategoryColumn = ({ category, tasks, moveTask, addTask }) => {
  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, category._id)
  }));

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    await addTask({ title: newTaskTitle, category: category._id });
    setNewTaskTitle('');
  };

  return (
    <div ref={drop} className="w-64 p-4 bg-gray-100 rounded mr-4">
      <h2 className="font-bold mb-2">{category.name}</h2>

      {/* Mostrar tareas de la categoría */}
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} moveTask={moveTask} />
      ))}

      {/* Crear nueva tarea */}
      <div className="mt-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Añadir tarea..."
          className="w-full p-1 rounded border"
        />
        <button
          onClick={handleCreateTask}
          className="mt-1 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default CategoryColumn;
