import React from 'react';
import CategoryColumn from './CategoryColumn'; // Asegúrate de tener este componente

const Wall = ({ categories, tasks, moveTask, addTask }) => {
  return (
    <div className="flex p-4">
      {categories.map(category => (
        <CategoryColumn
          key={category._id}
          category={category}
          tasks={tasks.filter(task => task.category._id === category._id)}
          onDropTask={moveTask}
          onAddTask={addTask}
        />
      ))}
    </div>
  );
};

export default Wall;