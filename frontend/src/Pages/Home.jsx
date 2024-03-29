import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Featured from '../Components/Featured'
import NewProducts from '../Components/NewProducts';

function Home() {
    const [product, setProduct] = useState();
    useEffect(() => {
        axios.get('http://localhost:8800/api/products/featured').then(response => {
            setProduct(response.data)
        })
    }, [])
    return (
        <div>
            <Featured product={product} />
            <NewProducts />
        </div>
    )
}

export default Home