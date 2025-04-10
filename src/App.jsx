import { useState, useEffect, useRef } from 'react';
import Wall from './components/Wall';
import { SketchPicker } from 'react-color';
import './App.css';

function App() {
  const [boardTitle, setBoardTitle] = useState(() => localStorage.getItem('boardTitle') || 'Tablero de Tareas');
  const [titleColor, setTitleColor] = useState(() => localStorage.getItem('titleColor') || '#333');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const pickerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('boardTitle', boardTitle);
  }, [boardTitle]);

  useEffect(() => {
    localStorage.setItem('titleColor', titleColor);
  }, [titleColor]);

  // Cerrar el popover si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  const handleSave = () => {
    setIsEditingTitle(false);
    setShowColorPicker(false);
  };

  return (
    <div className="app-container">
      {isEditingTitle ? (
        <div className="title-edit-wrapper">
          <input
            className="title-input"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            autoFocus
            style={{ color: titleColor }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />

          <div className="color-button-wrapper">
            <button
              className="color-circle"
              style={{ backgroundColor: titleColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            ></button>

            {showColorPicker && (
              <div className="popover" ref={pickerRef}>
                <SketchPicker
                  color={titleColor}
                  onChangeComplete={(color) => setTitleColor(color.hex)}
                  disableAlpha
                />
              </div>
            )}
          </div>

          <button onClick={handleSave} className="save-button">Guardar</button>
        </div>
      ) : (
        <h1
          className="title"
          style={{ color: titleColor }}
          onClick={() => setIsEditingTitle(true)}
        >
          {boardTitle}
        </h1>
      )}

      <Wall />
    </div>
  );
}

export default App;
