import React from 'react'
import ProductForm from '../components /ProductForm'

function NewProducts() {
  return (
    <div>
      <h1>New Product</h1>
      <ProductForm method='post' url="products"/>
    </div>
  )
}

export default NewProducts