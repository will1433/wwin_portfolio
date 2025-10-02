import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Mount the React app inside the <div id="root"></div> in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
