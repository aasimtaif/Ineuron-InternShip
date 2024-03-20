import { useState } from 'react'
import Nav from './components /Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Orders from './Pages/Orders'
import Settigns from './Pages/Settings'
import NewProducts from './Pages/NewProducts'
import EditProduct from './Pages/EditProduct'
import Category from './Pages/Category'
function App() {

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
        <Routes>

          <Route path={'/'} element={<Home />} exact></Route>
          <Route path={'/products'} element={<Products />} exact></Route>
          <Route path={'/orders'} element={<Orders />} exact></Route>
          <Route path={'/settings'} element={<Settigns />} exact></Route>
          <Route path={'/products/new'} element={<NewProducts />} exact></Route>
          <Route path={'/products/edit/:id'} element={<EditProduct />} exact></Route>
          <Route path={'/category'} element={<Category />} exact></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
