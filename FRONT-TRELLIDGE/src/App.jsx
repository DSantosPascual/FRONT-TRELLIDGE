import { useState, useEffect } from 'react';
import axios from 'axios';
import Wall from './components/Wall.jsx';

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Obtener las categorías y las tareas cuando se carga el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await axios.get('http://localhost:3000/api/categories');
        const tks = await axios.get('http://localhost:3000/api/tasks');
        setCategories(cats.data);
        setTasks(tks.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  // Función para mover una tarea a una nueva categoría
  const moveTask = async (taskId, newCategoryId) => {
    try {
      // Actualiza la tarea en la base de datos
      await axios.put(`http://localhost:3000/api/tasks/id/${taskId}`, { category: newCategoryId });

      // Actualiza la tarea en el estado local
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, category: { _id: newCategoryId } } : task
        )
      );
    } catch (error) {
      console.error('Error al mover la tarea:', error);
    }
  };

  // Función para agregar una nueva tarea
  const addTask = async (taskData) => {
    try {
      const res = await axios.post('http://localhost:3000/api/tasks/create', taskData);
      setTasks(prevTasks => [...prevTasks, res.data]);
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Tablero de Tareas</h1>

      {/* Pasar las categorías, tareas y funciones al componente Wall */}
      <Wall 
        categories={categories} 
        tasks={tasks}
        moveTask={moveTask}
        addTask={addTask} 
      />
    </div>
  );
}

export default App;
