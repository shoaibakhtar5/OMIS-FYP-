import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import ToastProvider from './components/Toast/ToastProvider'
import AppRoutes from './routes/AppRoutes'
import CurrentUserProvider from './routes/CurrentUserProvider'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </CurrentUserProvider>
    </BrowserRouter>
  </StrictMode>,
)
