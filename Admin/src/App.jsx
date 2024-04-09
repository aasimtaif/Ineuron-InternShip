import { useEffect, useState } from 'react'
import Nav from './components /Nav'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Orders from './Pages/Orders'
import Settigns from './Pages/Settings'
import NewProducts from './Pages/NewProducts'
import EditProduct from './Pages/EditProduct'
import Category from './Pages/Category'
import Logo from './components /Logo'
import { useLocation } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { useSelector } from 'react-redux'
function App() {
  const [showNav, setShowNav] = useState(false);
  const pathname = useLocation();
  const { user } = useSelector(state => state)
  console.log(pathname)
  useEffect(() => {
    setShowNav(false)
  }, [pathname])
  console.log(useLocation())
  const ProtectedRoutes = ({ children }) => {
    if (user.isAdmin) {
      console.log(user)
      return children
    }
    else {
      return <Navigate to="/login" />
    }
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
        <div className='flex-grow p-4'>
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
            <Route path={'/settings'} element={
              <ProtectedRoutes>
                <Settigns />
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
            <Route path={'/login'} element={<Login />} exact></Route>
            <Route path={'/register'} element={<Register />} exact></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
