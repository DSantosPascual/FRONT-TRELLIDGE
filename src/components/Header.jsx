import { useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import './Header.css';

function Header({
  boardTitle,
  setBoardTitle,
  titleColor,
  setTitleColor,
  isEditingTitle,
  setIsEditingTitle,
  showColorPicker,
  setShowColorPicker
}) {
  const pickerRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
      setShowColorPicker(false);
    }
    if (e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  return (
    <header className="app-header">
      <div className="title-edit-wrapper">
        {isEditingTitle ? (
          <>
            <input
              className="title-input"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              autoFocus
              style={{ color: titleColor }}
              onKeyDown={handleKeyDown}
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
            <button onClick={() => setIsEditingTitle(false)} className="save-button">
              Guardar
            </button>
          </>
        ) : (
          <h1
            className="title"
            style={{ color: titleColor }}
            onClick={() => setIsEditingTitle(true)}
          >
            {boardTitle}
          </h1>
        )}
      </div>
    </header>
  );
}

export default Header;
