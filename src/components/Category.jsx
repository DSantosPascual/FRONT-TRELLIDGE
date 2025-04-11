import React, { useState } from 'react';
import './Category.css';

function Category({ category, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(category.title);

  const handleBlur = () => {
    setIsEditing(false);
    if (title !== category.title) {
      onRename(category._id, title);
    }
  };

  return (
    <div className="category-title-container">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
        />
      ) : (
        <>
          <h2 onClick={() => setIsEditing(true)}>{category.title}</h2>
          <button
            onClick={() => onDelete(category._id)}
            className="delete-category-btn"
            title="Eliminar categoría"
          >
            <img src="/icons/papelera.png" alt="Eliminar" />
          </button>
        </>
      )}
    </div>
  );
}

export default Category;
