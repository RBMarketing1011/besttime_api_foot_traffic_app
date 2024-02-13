import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { router } from './routes/router'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
