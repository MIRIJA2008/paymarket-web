import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Verifie une nouvelle version a chaque chargement et l'applique immediatement,
// sans attendre la fermeture de tous les onglets ni une action de l'utilisateur.
registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)