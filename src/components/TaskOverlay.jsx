import { useState } from 'react';
import './TaskOverlay.css';

function TaskOverlay({ task, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [completed, setCompleted] = useState(task.completed || false);
  const [checklist, setChecklist] = useState(task.checklist || []);
  const [newItemText, setNewItemText] = useState('');

  const handleAddChecklistItem = () => {
    if (!newItemText.trim()) return;
    setChecklist([...checklist, { text: newItemText, done: false }]);
    setNewItemText('');
  };

  const handleItemToggle = (index) => {
    const updated = [...checklist];
    updated[index].done = !updated[index].done;
    setChecklist(updated);
  };

  const handleItemRemove = (index) => {
    const updated = checklist.filter((_, i) => i !== index);
    setChecklist(updated);
  };

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      completed,
      checklist
    });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Tarea</h2>

        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          /> Tarea completada
        </label>

        <div className="checklist-section">
          <h4>Checklist</h4>

          {checklist.map((item, index) => (
            <div key={index} className="checklist-item">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleItemToggle(index)}
              />
              <span className={item.done ? 'done' : ''}>{item.text}</span>
              <button onClick={() => handleItemRemove(index)}>✖</button>
            </div>
          ))}

          <div className="checklist-input">
            <input
              type="text"
              placeholder="Nuevo ítem"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddChecklistItem()}
            />
            <button onClick={handleAddChecklistItem}>Añadir</button>
          </div>
        </div>

        <div className="overlay-actions">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => onDelete(task._id)} className="danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default TaskOverlay;