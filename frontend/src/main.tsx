
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "sonner";
import App from './App.tsx'
import QueryProvider from './provider/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <Toaster/>
    <App />
  </QueryProvider>
)
