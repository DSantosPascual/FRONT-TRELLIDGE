import { useState, useEffect } from 'react';
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

  // Fondo guardado
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

  // Cargar datos del localStorage
  useEffect(() => {
    const storedCats = JSON.parse(localStorage.getItem('categories')) || [];
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setCategories(storedCats);
    setTasks(storedTasks);
  }, []);

  // Guardar datos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const moveTask = (taskId, newCategoryId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, category: { _id: newCategoryId } } : task
      )
    );
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      _id: crypto.randomUUID(),
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task._id !== taskId));
    setSelectedTask(null);
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat._id !== categoryId));
    setTasks(prev => prev.filter(task => task.category?._id !== categoryId));
  };

  const handleCategoryCreated = (newCategory) => {
    const newCat = {
      ...newCategory,
      _id: crypto.randomUUID(),
    };
    setCategories([...categories, newCat]);
  };

  const renameTask = (taskId, newTitle) => {
    setTasks(prev =>
      prev.map(task =>
        task._id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const renameCategory = (categoryId, newName) => {
    setCategories(prev =>
      prev.map(cat =>
        cat._id === categoryId ? { ...cat, name: newName } : cat
      )
    );
  };

  const updateFullTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="wall">

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