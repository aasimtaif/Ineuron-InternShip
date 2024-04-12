import React from 'react'
import { useSelector } from 'react-redux'
function Home() {
  const user = useSelector(state => state.user)
  return (
    <div>

      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{user.userName}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">

          <span className="px-2">
            {user.userName}
          </span>
        </div>

      </div>
      <div className='flex flex-row  rounded-md pt-10 pb-10   bg-gray-100 mt-10 justify-center justify-around '>
        <div className='bg-gray-50 p-4 rounded-lg'>Totol users</div>
        <div className='bg-gray-50 p-4 rounded-lg'>Total Orders</div>
        <div className='bg-gray-50 p-4 rounded-lg'>Total Products</div>

      </div>
    </div>
  )
}

export default Home