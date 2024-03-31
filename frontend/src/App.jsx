import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Products from './Pages/Products';
import Account from './Pages/Account';
import Cart from './Pages/Cart';
import ProductDetais from './Pages/ProductDetais';
import styled from 'styled-components';



function App() {
  const { cart } = useSelector(state => state.counter);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetais />} />\
        <Route path='/cart' element={<Cart />} />
        {/* <Route path='/category' element={"Category"} /> */}
        <Route path='/account' element={<Account />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </React.Fragment>
  )
}

export default App
