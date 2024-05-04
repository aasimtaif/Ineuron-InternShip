import React, { useState, useEffect } from 'react'
import Featured from '../Components/Featured'
import NewProducts from '../Components/NewProducts';
import { Axios } from '../utils/api';

function Home() {
    const [product, setProduct] = useState();
    const [firstTime, setFirstTime] = useState(true);
    useEffect(() => {
        if (firstTime) {
            fetchFeaturedProduct();
            setFirstTime(false);
        }

        const interval = setInterval(() => {
            fetchFeaturedProduct();
        },  60 * 1000);


        return () => clearInterval(interval);
    }, [firstTime]);
    const fetchFeaturedProduct = async () => {
        try {
            const response = await Axios.get('products/featured')
            setProduct(response.data)
        } catch (error) {
            console.error(error)
        }

    }

    const cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart)
    return (
        <div>
            <Featured product={product} />
            <NewProducts />
        </div>
    )
}

export default Home