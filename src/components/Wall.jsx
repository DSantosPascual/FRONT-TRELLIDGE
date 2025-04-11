import { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CategoryColumn from './CategoryColumn';
import CreateCategory from './CreateCategory';
import TaskOverlay from './TaskOverlay';
import './Wall.css';

function Wall() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3000/api/tasks/id/${taskId}`);
    setTasks(prev => prev.filter(task => task._id !== taskId));
    setSelectedTask(null);
  };

  const deleteCategory = async (categoryId) => {
    await axios.delete(`http://localhost:3000/api/categories/id/${categoryId}`);
    setCategories(prev => prev.filter(cat => cat._id !== categoryId));
    setTasks(prev => prev.filter(task => task.category?._id !== categoryId));
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const renameTask = async (taskId, newTitle) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/tasks/${taskId}`, {
        title: newTitle
      });
      const updatedTask = res.data;
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, title: updatedTask.title } : task
        )
      );
    } catch (error) {
      console.error("Error al renombrar tarea:", error);
    }
  };

  const renameCategory = async (categoryId, newName) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/categories/${categoryId}`, {
        name: newName
      });
      const updatedCategory = res.data;
      setCategories(prevCategories =>
        prevCategories.map(cat =>
          cat._id === categoryId ? { ...cat, name: updatedCategory.name } : cat
        )
      );
    } catch (error) {
      console.error("Error al renombrar categoría:", error);
    }
  };

  const updateFullTask = async (updatedTask) => {
    const res = await axios.put(`http://localhost:3000/api/tasks/${updatedTask._id}`, updatedTask);
    const saved = res.data;
    setTasks(prev => prev.map(t => t._id === saved._id ? saved : t));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="wall">
        <CreateCategory onCategoryCreated={handleCategoryCreated} />
        <div className="columns">
          {categories.map(cat => (
            <div key={cat._id} className="category-container">
              <CategoryColumn
                category={cat}
                tasks={tasks.filter(task => task.category && task.category._id === cat._id)}
                moveTask={moveTask}
                addTask={addTask}
                renameTask={renameTask}
                renameCategory={renameCategory}
                onDeleteTask={deleteTask}
                onDeleteCategory={deleteCategory}
                onTaskClick={setSelectedTask}
              />
            </div>
          ))}
        </div>

        {selectedTask && (
          <TaskOverlay
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onSave={updateFullTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default Wall;
