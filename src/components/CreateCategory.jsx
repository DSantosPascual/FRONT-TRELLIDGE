import { useState } from 'react';
import axios from 'axios';
import './CreateCategory.css';

function CreateCategory({ onCategoryCreated }) {
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post('https://back-trellidge.onrender.com/api/categories/create', { title });
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
        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
        placeholder="Nombre de la categoría"
      />
      <button onClick={handleCreate}>Crear categoría</button>
    </div>
  );
}

export default CreateCategory;
