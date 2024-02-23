import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/index'
import { Provider } from 'react-redux';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ChakraProvider >
          <App />
        </ChakraProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
)
