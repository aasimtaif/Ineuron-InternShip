import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createGlobalStyle, styled } from "styled-components";
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/index'
import { Provider } from 'react-redux';
import './index.css'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap')
body{
  background-color: #eee;
  padding:0;
  margin:0;
  font-family: 'Poppins', sans-serif;
}
`


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalStyle />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
)
