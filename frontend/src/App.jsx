import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Products from './Pages/Products';
import Account from './Pages/Account';
import Cart from './Pages/Cart';
import ProductDetais from './Pages/ProductDetais';


function App() {
  const { auth: { user }, counter: { cart: cart } } = useSelector(state => state);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const ProtectedRoutes = ({ children }) => {
    if (user) {
      return children
    }
    else {
      return <Navigate to="/login" />
    }
  }
  return (
    <React.Fragment>
      <Routes>
        <Route path='/'
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path='/login'
          element={<Login />}
        />
        <Route path='/register'
          element={<Register />}
        />
        <Route path='/products'
          element={
            <>
              <Header />
              <Products />
            </>
          }
        />
        <Route path='/product/:id'
          element={
            <>
              <Header />
              <ProductDetais />
            </>
          }
        />
        {/* <Route path='/category'
          element={
            <>
              <Header />
              <Products />
            </>
          } /> */}
        <Route path='/cart'
          element={
            <ProtectedRoutes>
              <Header />
              <Cart />
            </ProtectedRoutes>
          } />
        <Route path='/account/:id'
          element={
            <ProtectedRoutes>
              <Header />
              <Account user={user} />
            </ProtectedRoutes>
          } />
        <Route path='*' element={<div>
          <Header />
          404
          </div>} />
      </Routes>
    </React.Fragment>
  )
}

export default App
