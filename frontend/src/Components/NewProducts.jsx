import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from './ProductsGrid';
import { Axios } from '../utils/api';
import axios from 'axios';
const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;
function NewProducts() {
    const [products, setProducts] = useState();
    useEffect(() => {
        Axios.get('products/new-products').then(response => {
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