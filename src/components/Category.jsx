import React, { useState } from 'react';
import './Category.css';

function Category({ category, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(category.title); // Asegúrate que sea "title"

  const handleBlur = () => {
    setIsEditing(false);
    if (title !== category.title) {
      onRename(category._id, title);
    }
  };

  return (
    <div className="category-name">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{category.title}</h2>
      )}
    </div>
  );
}

export default Category;
