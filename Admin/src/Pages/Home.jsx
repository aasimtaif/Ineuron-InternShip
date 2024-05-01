import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Axios } from "../utils/api"
function Home() {
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState()
  const [products, setProducts] = useState()
  const [orders, setOrders] = useState()
  const [sale, setSale] = useState(0)
  const getUser = async () => {
    const res = await Axios.get('users')
    setUsers(res.data.length)
  }
  const getProducts = async () => {
    const res = await Axios.get('products')
    setProducts(res.data.length)
  }
  const getOrders = async () => {
    const res = await Axios.get('orders')
    setOrders(res.data.length)
    setSale(res.data.reduce((acc, item) => acc + item.totalPrice, 0))
  }
  useEffect(() => {
    getProducts()
    getOrders()
    getUser()
  }, [])
  console.log(users, products, orders, sale)
  return (
    <div>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{user.userName}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <div className=" flex flex-row gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-6 text-gray-50 bg-zinc-800 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className='px-2'>
            {user.userName}
            </span>
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-20  rounded-md pt-10 pb-10   bg-gray-100 mt-10 place-items-center'>
        <div className='bg-gray-50 gap-5 flex flex-col p-4 justify-center text-center rounded-lg'>
          <p className='text-s m text-sky-700 font-medium'>Totol users
          </p>
          <span className=' font-bold text-lg '>
            {users}
          </span>
        </div>
        <div className='bg-gray-50 gap-5 flex flex-col p-4 justify-center text-center rounded-lg'>
          <p className='text-sm  text-sky-700 font-medium'>Totol Orders
          </p>
          <span className=' font-bold text-lg '>
            {orders}
          </span>
        </div>
        <div className='bg-gray-50 gap-5 flex flex-col p-4 justify-center text-center rounded-lg'>
          <p className='text-sm  text-sky-700 font-medium'>Totol sales
          </p>
          <span className=' font-bold text-lg '>
            {`₹ ${sale}`}
          </span>
        </div>
        <div className='bg-gray-50 gap-5 flex flex-col p-4 justify-center text-center rounded-lg'>
          <p className='text-s m text-sky-700 font-medium'>Totol products
          </p>
          <span className=' font-bold text-lg '>
            {products}
          </span>
        </div>

      </div>
    </div>
  )
}

export default Home