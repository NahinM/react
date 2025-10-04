import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Games from './games.tsx'
import TicTacToe from './tictactoe.tsx'
import Ludo from './ludo.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/games" element={<Games />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/ludo" element={<Ludo />} />
    </Routes>
  </BrowserRouter>,
)
