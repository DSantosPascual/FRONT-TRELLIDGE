import { useState } from 'react';
import axios from 'axios';
import './CreateCategory.css';

function CreateCategory({ onCategoryCreated }) {
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post('http://localhost:3000/api/categories/create', { title });
      // Llamamos a la función onCategoryCreated pasada como prop para actualizar las categorías en Wall
      onCategoryCreated(res.data); 
      setTitle('');
    } catch (err) {
      console.error('Error al crear categoría', err);
    }
  };

  return (
    <div className="create-category">
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Nombre de la categoría" 
      />
      <button onClick={handleCreate}>Crear categoría</button>
    </div>
  );
}

export default CreateCategory;
