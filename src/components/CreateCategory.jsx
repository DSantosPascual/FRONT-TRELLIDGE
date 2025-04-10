import { useState } from 'react';
import axios from 'axios';
import './CreateCategory.css';

function CreateCategory({ onCategoryCreated }) {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      const res = await axios.post('http://localhost:3000/api/categories/create', { name });
      onCategoryCreated(res.data); 
      setName('');
    } catch (err) {
      console.error('Error al crear categoría', err);
    }
  };

  return (
    <div className="create-category">
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nombre de la categoría" 
      />
      <button onClick={handleCreate}>Crear categoría</button>
    </div>
  );
}

export default CreateCategory;
