import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Center from "./Center";
// import ProductsGrid from "./ProductsGrid"
import axios from 'axios'
import ProductsGrid from './ProductsGrid';
const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;
function NewProducts() {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios.get('http://localhost:8800/api/products/new-products').then(response => {
            setProducts(response.data)
        })
    }, [])
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} />
        </Center>
    )
}

export default NewProducts