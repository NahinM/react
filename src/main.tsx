import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Games from './games.tsx'
import TicTacToe from './tictactoe.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/games" element={<Games />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
    </Routes>
  </BrowserRouter>,
)
