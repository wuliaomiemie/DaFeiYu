import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/main.css'

const container = document.getElementById('root')

if (!container) {
  console.error('未找到 #root 挂载节点')
} else {
  ReactDOM.createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
