import { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';  // Importa los hooks y DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend';  // Importa el backend para el drag and drop
import CategoryColumn from './CategoryColumn';
import CreateCategory from './CreateCategory';
import './Wall.css';

function Wall() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await axios.get('http://localhost:3000/api/categories');
      const tks = await axios.get('http://localhost:3000/api/tasks');
      setCategories(cats.data);
      setTasks(tks.data);
    };
    fetchData();
  }, []);

  const moveTask = async (taskId, newCategoryId) => {
    await axios.put(`http://localhost:3000/api/tasks/id/${taskId}`, { category: newCategoryId });
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, category: { _id: newCategoryId } } : task
      )
    );
  };

  const addTask = async (taskData) => {
    const res = await axios.post('http://localhost:3000/api/tasks/create', taskData);
    setTasks([...tasks, res.data]);
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <DndProvider backend={HTML5Backend}> {/* Proporciona el contexto de DND */}
      <div className="wall">
        {/* <h1>Tablero de Tareas</h1> */}
        <CreateCategory onCategoryCreated={handleCategoryCreated} />
        <div className="columns">
  {categories.map(cat => (
    <CategoryColumn
      key={cat._id}
      category={cat}
      tasks={tasks.filter(task => task.category && task.category._id === cat._id)} // Comprobamos que task.category exista
      moveTask={moveTask}
      addTask={addTask}
    />
  ))}
</div>

      </div>
    </DndProvider>
  );
}

export default Wall;
