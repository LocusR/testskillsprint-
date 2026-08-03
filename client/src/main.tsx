import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './styles/global.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Не знайдено #root у index.html')

createRoot(rootElement).render(
  <StrictMode>
    {/*
      basename із BASE_URL: на GitHub Pages сайт лежить у підпапці
      (/testskillsprint-/), і без нього роутер не зіставив би маршрути.
      У корені домену BASE_URL дорівнює '/' — поведінка не змінюється.
    */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
