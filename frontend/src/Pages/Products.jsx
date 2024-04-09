import React, { useEffect, useState } from 'react'
import Header from "../Components/Header";
import styled from "styled-components";
import Center from "../Components/Center";
import ProductsGrid from "../Components/ProductsGrid";
import axios from 'axios';
import { Axios } from '../utils/api';
const Title = styled.h1`
  font-size: 1.5em;
`;

function Products() {
  const [products, setProducts] = useState();
  useEffect(() => {
    Axios.get('products').then(response => {

      setProducts(response.data)

    })
  }, [])
  console.log(products)
  return (
    <>
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export default Products