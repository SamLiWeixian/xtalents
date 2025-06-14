import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TalentProvider } from './context/TalentContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TalentProvider>
      <App />
    </TalentProvider>
  </StrictMode>,
)
