import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8800/api/orders')
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
            <tr key={order._id}>
              <td>{(new Date(order.createdAt)).toLocaleString().split(',')[0]}
              </td>
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'YES' : 'NO'}
              </td>
              <td>
                {order.name} {order.email}<br />
                {order.city} {order.postalCode} {order.country}<br />
                {order.streetAddress}
              </td>
              <td>
                {order?.products?.map(l => (
                  <>
                    {l.product.name} x
                    {l.quantity}<br />
                  </>
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