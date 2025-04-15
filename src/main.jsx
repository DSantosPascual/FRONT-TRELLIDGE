import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👈 importar BrowserRouter
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/FRONT-TRELLIDGE/">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
