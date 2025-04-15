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
  const [showBgPanel, setShowBgPanel] = useState(false);

  // Aplica fondo desde localStorage
  useEffect(() => {
    const savedBg = localStorage.getItem("wall-background");
    const isImage = localStorage.getItem("wall-background-is-image");

    if (savedBg) {
      if (isImage === "true") {
        document.body.style.backgroundImage = `url(${savedBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
      } else {
        document.body.style.background = savedBg;
        document.body.style.backgroundImage = '';
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await axios.get('https://back-trellidge.onrender.com/api/categories');
        const tks = await axios.get('https://back-trellidge.onrender.com/api/tasks');
        setCategories(cats.data);
        setTasks(tks.data);
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
  }, []);

  const moveTask = async (taskId, newCategoryId) => {
    await axios.put(`https://back-trellidge.onrender.com/api/tasks/id/${taskId}`, { category: newCategoryId });
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, category: { _id: newCategoryId } } : task
      )
    );
  };

  const addTask = async (taskData) => {
    const res = await axios.post('https://back-trellidge.onrender.com/api/tasks/create', taskData);
    setTasks([...tasks, res.data]);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`https://back-trellidge.onrender.com/api/tasks/id/${taskId}`);
    setTasks(prev => prev.filter(task => task._id !== taskId));
    setSelectedTask(null);
  };

  const deleteCategory = async (categoryId) => {
    await axios.delete(`https://back-trellidge.onrender.com/api/categories/id/${categoryId}`);
    setCategories(prev => prev.filter(cat => cat._id !== categoryId));
    setTasks(prev => prev.filter(task => task.category?._id !== categoryId));
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const renameTask = async (taskId, newTitle) => {
    try {
      const res = await axios.put(`https://back-trellidge.onrender.com/api/tasks/${taskId}`, {
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
      const res = await axios.put(`https://back-trellidge.onrender.com/api/categories/${categoryId}`, {
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
    const res = await axios.put(`https://back-trellidge.onrender.com/api/tasks/${updatedTask._id}`, updatedTask);
    const saved = res.data;
    setTasks(prev => prev.map(t => t._id === saved._id ? saved : t));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="wall">

        {/* Selector de fondo flotante */}
        <button className="toggle-background-btn" onClick={() => setShowBgPanel(!showBgPanel)}>
  ⚙️
</button>

{showBgPanel && (
  <div className="background-fab">
    <label>Fondo:</label>
    <input
      type="color"
      onChange={(e) => {
        const color = e.target.value;
        document.body.style.background = color;
        document.body.style.backgroundImage = '';
        localStorage.setItem("wall-background", color);
        localStorage.setItem("wall-background-is-image", "false");
      }}
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            document.body.style.backgroundImage = `url(${dataUrl})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            localStorage.setItem("wall-background", dataUrl);
            localStorage.setItem("wall-background-is-image", "true");
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  </div>
)}


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
