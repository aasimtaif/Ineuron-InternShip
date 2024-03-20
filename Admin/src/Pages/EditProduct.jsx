import React, { useEffect, useState } from 'react'
import ProductForm from '../components /ProductForm'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function EditProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/products/${id}`)
                setProduct(response.data)
                setImages(response.data.images)
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()

    }, []);
    return (
        <div>
            <h1>
                Edit Product
            </h1>
            <ProductForm method='put' url={`products/${id}`} product={product} images={images} />
        </div>
    )
}

export default EditProduct