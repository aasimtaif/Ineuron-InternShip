import React, { useEffect, useState } from 'react'
import { Axios } from '../utils/api'
import { useParams } from 'react-router-dom'
function OrderDetails() {
    const [order, setOrder] = useState({})
    const { id } = useParams()

    useEffect(() => {
        Axios.get(`orders/order/${id}`)
            .then((response) => {
                setOrder(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    const orderField = Object.keys(order).filter((key) => {
        const filter = ['products', 'userId', '_id', '__v', 'createdAt', 'paid', 'totalPrice']
        return !filter.includes(key)
    }
    )
    console.log(orderField)
    return (
        <div>
            <h1>Order Details</h1>
            <div>
                <h2 className='font-medium'>Name: {order?.userId?.userName}</h2>
                {orderField.map((key) => {
                    return (
                        <div key={key}>
                            <h3 className='font-medium'>{key}: {order[key]}</h3>
                        </div>
                    )
                })}
                <h3 className='font-medium'>Total Amount: {order?.totalPrice} {order?.paid ? 'Paid' : 'Un-Paid'}</h3>
                <div >
                    {order?.products?.map((product) => {
                        return (
                            <div class="max-w-sm w-2/5 flex flex-col bg-white border border-gray-200 rounded-lg shadow p-2 mt-4 justify-center items-center ">
                                <img class="rounded-t-lg  w-3/4" src={product.product.images[0]} alt="" />
                                <div class="p-2">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                        {product.product.name}
                                    </h5>
                                    <p class="mb-3 font-normal text-gray-700 ">{product.product.price} x {product.quantity}</p> 
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default OrderDetails