import React from 'react'
import { Nav, ProductsList } from './Components'
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
function App() {

  return (
    <React.Fragment>
      <Nav />
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<h1>Profile</h1>} />
      </Routes>
    </React.Fragment>
  )
}

export default App
