import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Axios } from '../utils/api';
import styled, { css } from "styled-components";
import Center from '../Components/Center';

const Details = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    `
const Label = styled.h1`
    font-weight: 500;
    
    `
const Data = styled.p`
    font-weight: 300;
    `

const Span = styled.span`
    font-weight: 500;
    ${props => props.paid && css`
        color: green;
        `
    }
    ${props => props.unpaid && css`
        color: red;
        `
    }
    `
const OrderDetails = styled.div`
    display: flex;
    flex-direction: column;
padding: 20px 0px;
    gap: 10px;
    `
const ProductList = styled.div`
    display: grid;
    
    grid-template-columns: repeat(3, 1fr);
    @media screen and (max-width:880px) {
        grid-template-columns: repeat(2, 1fr); /* Display 2 items per row on tablets */
    }
    @media screen and (max-width:880px) {
      grid-template-columns: repeat(2, 1fr); /* Display 2 items per row on tablets */
    }
    @media screen and (max-width: 680px) {
      grid-template-columns: 1fr; /* Display 1 item per row on mobile */
    }
    gap: 20px;
    
    `
const ProductBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1px;
    width: max-content;
    img{
        max-width: 100px;
        max-height: 100px;
    }
    `
const ProductDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    `
function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState({});
    useEffect(() => {
        Axios.get(`orders/order/${id}`).then((response) => {
            setOrder(response.data)
        }).catch((error) => {
            console.error('Error fetching data:', error);
        })
    }, [])
    const orderField = Object.keys(order).filter((key) => {
        const filter = ['products', 'userId', '_id', '__v', 'createdAt', 'paid', 'totalPrice']
        return !filter.includes(key)
    }
    )

    console.log(order.paid)
    return (
        <Center>
            <OrderDetails>
                <Details >
                    <Label>Name</Label>
                    <Data>{order?.userId?.userName}</Data>
                </Details>
                {orderField.map((key) => {
                    return (
                        <Details key={key}>
                            <Label>{key}</Label>
                            <Data>{order[key]}</Data>
                        </Details>
                    )
                })}
                <Details >
                    <Label>Total Amount </Label>
                    <Data>{order?.totalPrice} {order?.paid ?
                        <Span paid>
                            Paid
                        </Span> :
                        <Span unpaid>
                            Un-Paid
                        </Span>}</Data>
                </Details>
                <Label>Products</Label>
                <ProductList>
                    {order?.products?.map((product) => {
                        return (
                            <ProductBox key={product._id}>
                                <img src={product.product.images[0]} alt={product.name} />
                                <ProductDetail>
                                    <Details>
                                        <Label>Product Name</Label>
                                        <Data>{product.product.name}</Data>
                                    </Details>
                                    <Details>
                                        <Label>Quantity</Label>
                                        <Data>{product.quantity}</Data>
                                    </Details>
                                    <Details>
                                        <Label>Price</Label>
                                        <Data>₹{product.product.price}</Data>
                                    </Details>
                                </ProductDetail>
                            </ProductBox>
                        )
                    })}
                </ProductList>
            </OrderDetails>
        </Center>
    )
}

export default OrderDetail