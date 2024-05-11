import React, { useEffect, useState } from 'react'
import ProductForm from '../components /ProductForm'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Axios } from '../utils/api'
function EditProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`products/${id}`)
                setProduct(response.data)
                setImages(response.data.images)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, []);
    if (!product) {
        return <>Wait</>
    }
    return (
        <div>
            <h1>
                Edit Product
            </h1>
            {product._id && <ProductForm method='put' url={`products/${id}`} product={product} images={images} propertyName={Object.keys(product.properties)}
                propertyValue={Object.keys(product.properties)?.map((name, index) => {
                    return product.properties[name]
                })}
            />}
        </div>
    )
}

export default EditProduct