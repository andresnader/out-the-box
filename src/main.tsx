import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './presentacion/context/ThemeContext'
import { AuthProvider } from './procesamiento/auth/AuthContext'
import { TenantProvider } from './procesamiento/tenant/TenantContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TenantProvider>
          <App />
        </TenantProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
