import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../utils/api';
import axios from 'axios';
const SearchDiv = styled.div`
width:min-content;
padding-top: 10px ;
display: block;
input{
    border-radius: 5px;
    padding:2px
}
`
const ProductList = styled.div`
width:100%;

margin-top: 10px;
background-color: #f9f9f9;
border-radius: 5px;
div{
    padding: 10px;
    margin: 10px
    background-color: #fff;
    border-radius: 5px;
}
`
const ProductName = styled.h3`
cursor: pointer;
color: #000;
`
function SearchList() {
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    console.log(search)
    useEffect(() => {
        let debounceTimer;
        const delay = 800; // Adjust debounce delay as needed
        if (search) {
            debounceTimer = setTimeout(async () => {
                try {
                    const response = await Axios.get(`products/search?q=${search}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }, delay);
        }

        return () => clearTimeout(debounceTimer);
    }, [search]);
    console.log(products)
    if (!products) return setProducts([]);
    return (
        <SearchDiv>
            <input value={search} placeHolder="   Search product..." onChange={(e) => { setSearch(e.target.value) }} />
            {products && <div>
                <ProductList>
                    {products?.map((product) => {
                        return (
                            <div onClick={() => {
                                navigate(`/product/${product._id}`)
                                setProducts(null)
                                setSearch('')
                            }} key={product._id}>
                                <ProductName>{product.name}</ProductName>
                            </div>
                        )
                    })}
                </ProductList>
            </div>}
        </SearchDiv>
    )
}

export default SearchList