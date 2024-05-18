import React, { useEffect, useState } from 'react'
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
import OrderDetail from './Pages/OrderDetail';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import axios from 'axios';
import styled from 'styled-components';

const Loader = styled.div` 
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
  `

function App() {
  const { auth: { user }, counter: { cart: cart } } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios.get('https://ineuron-internship.onrender.com').then(response => {
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      console.log(error);
    });
  }, []);

  const ProtectedRoutes = ({ children }) => {
    if (user) {
      return children
    }
    else {
      return <Navigate to="/login" />
    }
  }
  if (loading)
    return (
      <Loader>
        <CountdownCircleTimer
          isPlaying
          duration={55}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[37, 50, 22, 10]}
        >
          {({ remainingTime }) => remainingTime}

        </CountdownCircleTimer>
        <h4>Due to free service the server goes to sleep mode after 15 min .Please wait for 55 seconds the server will restart </h4>
      </Loader>
    )
  return (
    <React.Fragment>

      {!loading && <Routes>
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
        <Route path='/order/:id'
          element={
            <>
              <Header />
              <OrderDetail />
            </>
          } />
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
      </Routes>}
    </React.Fragment>
  )
}

export default App
