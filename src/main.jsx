import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import cartReducer from './store/cartSlice'
import {CookiesProvider} from "./utils/CookieManager"
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import StepContextProvider from './StepContext'
import ScrollToTop from "./utils/ScrollToTop"

const store = configureStore({
  reducer:{
    cart: cartReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    
    <Provider store={store}>
    <CookiesProvider>
      <StepContextProvider>
        <ScrollToTop />
        <App />
      </StepContextProvider>
    </CookiesProvider>
  </Provider>
  </Router>
)
