import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../utils/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get('http://localhost:8800/api/orders')
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div>   <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Total</th>

          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 && orders?.map(order => (
            <tr key={order._id} className='border-b-2 cursor-pointer' onClick={() => {
              navigate(`/orders/${order._id}`)
            }}>
              <td>{(new Date(order.createdAt)).toLocaleString().split(',')[0]}
              </td>
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'YES' : 'NO'}
              </td>
              <td>
                {order.email}
              </td>
              <td className='text-left'>
                {order?.products?.map(l => (
                  <div className='text-left flex flex-row gap-2'>
                    <p>
                      {l.product.name}
                    </p>
                    x
                    <p>
                      {l.quantity}
                    </p>
                  </div>
                ))}
              </td>
              <td>
                ₹ {order.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
  )
}

export default Orders