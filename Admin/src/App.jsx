import { useEffect, useState } from 'react'
import Nav from './components /Nav'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Orders from './Pages/Orders'
import NewProducts from './Pages/NewProducts'
import EditProduct from './Pages/EditProduct'
import Category from './Pages/Category'
import Logo from './components /Logo'
import { useLocation } from 'react-router-dom'
import Login from './Pages/Login'
import { useSelector } from 'react-redux'
import Users from './Pages/Users'
import NewUser from './Pages/NewUser'
import EditUser from './Pages/EditUser'
import OrderDetails from './Pages/OrderDetails'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import axios from 'axios'
function App() {
  const [showNav, setShowNav] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const pathname = useLocation();
  const { user } = useSelector(state => state)
  console.log(pathname)
  useEffect(() => {
    setShowNav(false)
  }, [pathname])
  useEffect(() => {
    axios.get('https://ineuron-internship.onrender.com').then(response => {
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      console.log(error);
    });
  }, []);
  const ProtectedRoutes = ({ children }) => {
    if (user.isAdmin) {
      return children
    }
    else {
      return <Navigate to="/login" />
    }
  }
  const UnProtectedRoutes = ({ children }) => {
    if (!user.isAdmin) {
      return children
    }
    else {
      return <Navigate to="/" />
    }
  }
  if (isLoading) {
    return (<div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-20">
      <CountdownCircleTimer
        isPlaying
        duration={65}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => remainingTime}

      </CountdownCircleTimer>
      <h4>Due to free service the server goes to sleep mode after 15 min .Please wait for 65 seconds the server will restart </h4>
    </div>)
  }
  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(!showNav)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav showNav={showNav} setShowNav={setShowNav} />

        {!isLoading && <div className='flex-grow p-4'>
          <Routes>
            <Route path={'/'} element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/products'} element={
              <ProtectedRoutes>
                <Products />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/orders'} element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/users'} element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/users/new'} element={
              <ProtectedRoutes>
                <NewUser />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/users/edit/:id'} element={
              <ProtectedRoutes>
                <EditUser />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/orders/:id'} element={
              <ProtectedRoutes>
                <OrderDetails />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/products/new'} element={
              <ProtectedRoutes>
                <NewProducts />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/products/edit/:id'} element={
              <ProtectedRoutes>
                <EditProduct />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/category'} element={
              <ProtectedRoutes>
                <Category />
              </ProtectedRoutes>
            } exact></Route>
            <Route path={'/login'} element={
              <UnProtectedRoutes>
                <Login />
              </UnProtectedRoutes>
            } exact></Route>
          </Routes>
        </div>}
      </div>
    </div>
  )
}

export default App
