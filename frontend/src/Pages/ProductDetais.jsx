import React, { useEffect, useState } from 'react'
import Center from "../Components/Center";
import Header from "../Components/Header";
import styled from "styled-components";
import WhiteBox from "../Components/WhiteBox";
import ProductImages from '../Components/ProductImages';
import Button from "../Components/Button";
import CartIcon from "../Components/icons/CartIcon";
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/store';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 10px;
  margin: 40px 0;
`;
const DetailsSection = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    text-align: left;
    gap: 20px;
    width: auto;

`
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
`;
function ProductDetais() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8800/api/products/${id}`).then(response => {
            setProduct(response.data)
        })
        setIsLoading(false)
    }, []);

    if (isLoading) {
        return <Center>Loading...</Center>
    }
    return (

        <Center>
            <ColWrapper>
                <WhiteBox>
                    <ProductImages images={product?.images} />
                </WhiteBox>
                <DetailsSection>
                    <Title>{product?.name}</Title>
                    <p>{product?.description}</p>
                    <PriceRow>
                        <div>
                            <Price>${product?.price}</Price>
                        </div>
                        <div>
                            <Button primary onClick={() => dispatch(incrementQuantity(product))}>
                                <CartIcon />Add to cart
                            </Button>
                        </div>
                    </PriceRow>
                </DetailsSection>
            </ColWrapper>
        </Center>
    )
}

export default ProductDetais