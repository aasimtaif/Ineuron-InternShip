import React, { useEffect, useState } from 'react'
import Center from "../Components/Center";
import Header from "../Components/Header";
import styled from "styled-components";
import WhiteBox from "../Components/WhiteBox";
import ProductImages from '../Components/ProductImages';
import Button from "../Components/Button";
import CartIcon from "../Components/icons/CartIcon";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/store';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '../Components/Table'
import ReactStars from "react-rating-stars-component";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr;
  }
  gap: 40px;
  margin: 20px 0;
`;
const ReviewList = styled.div``
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
const Box = styled.div`

  display: flex;
  justify-content: start;
    flex-direction: row;
gap: 20px;
textarea {
    flex: 1; 
    height: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing:border-box;
  }
@media screen and (max-width: 600px) {
    flex-direction: column;
`;




function ProductDetais() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReview] = useState({ rating: 1, comment: '' });
    const { auth } = useSelector(state => state)
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8800/api/products/reviews/${id}`, { ...review, userId: auth.user._id })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
        getProductData()

    }
    const dispatch = useDispatch();
    useEffect(() => {
        getProductData()
    }, []);

    const getProductData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8800/api/products/${id}`);
            setProduct(response.data)
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    if (isLoading) {
        return <Center>Loading...</Center>
    }
    const ratingChanged = (newRating) => {
        setReview({ ...review, rating: newRating });
    };
    console.log(review)
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
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Properties
                            </th>
                            <th>
                                Value
                            </th>
                        </tr>
                    </thead>
                    {product?.properties && <tbody>
                        {Object.keys(product?.properties)?.map((name, index) => (
                            <tr key={index}>
                                <td>{name}</td>
                                <td>{product?.properties[name]}</td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
            </ColWrapper>
            <Box>
                <textarea placeholder="   Write Your review" onChange={(e) => { setReview({ ...review, comment: e.target.value }) }} />
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf='true'
                    activeColor="#ffd700"
                    value={review.rating}
                />
                <Button primary onClick={handleReviewSubmit}>Submit</Button>
            </Box>
            <ReviewList>
                <h2>Reviews</h2>
                <p>There are no reviews yet</p>
            </ReviewList>
        </Center>
    )
}

export default ProductDetais