import { useState, useEffect } from 'react';
import Wall from './components/Wall';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [boardTitle, setBoardTitle] = useState(() => localStorage.getItem('boardTitle') || 'Tablero de Tareas');
  const [titleColor, setTitleColor] = useState(() => localStorage.getItem('titleColor') || '#333');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    localStorage.setItem('boardTitle', boardTitle);
  }, [boardTitle]);

  useEffect(() => {
    localStorage.setItem('titleColor', titleColor);
  }, [titleColor]);

  return (
    <div className="app-container">
      <Header
        boardTitle={boardTitle}
        setBoardTitle={setBoardTitle}
        titleColor={titleColor}
        setTitleColor={setTitleColor}
        isEditingTitle={isEditingTitle}
        setIsEditingTitle={setIsEditingTitle}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
      />
      <Wall />
      <Footer />
    </div>
  );
}

export default App;
