import React, { useEffect, useState } from 'react'
import Center from "../Components/Center";
import styled from "styled-components";
import WhiteBox from "../Components/WhiteBox";
import ProductImages from '../Components/ProductImages';
import Button from "../Components/Button";
import CartIcon from "../Components/icons/CartIcon";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/store';
import { useParams } from 'react-router-dom';
import Table from '../Components/Table'
import ReactStars from "react-rating-stars-component";
import { Axios } from '../utils/api';
import axios from 'axios';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr;
  }
  gap: 40px;
  margin: 20px 0;
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
const Box = styled.div`

  display: flex;
  justify-content: start;
    flex-direction: row;
    padding: 10px;
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
    background-color: #f9f9f9;

}
`;
const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 10px 0;
    border-top: 2px solid #ccc;
    h1 {
        font-size: 1.5rem;
    border-bottom: 2px solid #ccc;

    }
    `

const Review = styled.div`
width: 100%;
display: grid;
grid-template-columns:1fr 1fr; 
place-items: center;
gap:0px
`

const ButtonDiv = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
align-items: center;
justify-content: center;
text-align: center;
`
const User = styled.p`
font-size: .7rem;
color: #898c8a;`
const Comment = styled.h4`
font-size: 1rem;
color: 1c1c1c;

`


function ProductDetais() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [review, setReview] = useState({ rating: 0, comment: '' });
    const { auth, counter: { cart: cart } } = useSelector(state => state)
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.put(`products/reviews/${id}`, { ...review, userId: auth.user._id })
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
            const response = await Axios.get(`http://localhost:8800/api/products/${id}`);
            setProduct(response.data)
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }
    const cartProduct = cart?.find(item => item._id === product?._id)
    if (isLoading) {
        return <Center>Loading...</Center>
    }
    const ratingChanged = (newRating) => {
        setReview({ ...review, rating: newRating });
    };
    console.log(cart)
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
                            {cartProduct ?
                                <ButtonDiv>
                                    <Button primary onClick={() => dispatch(incrementQuantity(product))}>
                                        +
                                    </Button>
                                    <span>{cartProduct.quantity}</span>
                                    <Button primary onClick={() => dispatch(decrementQuantity(product))}>
                                        -
                                    </Button>
                                </ButtonDiv>
                                :
                                <Button primary onClick={() => dispatch(incrementQuantity(product))}>
                                    <CartIcon />Add to cart
                                </Button>}

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
                <h1>Reviews</h1>
                {product?.review?.length > 0 ?
                    <>
                        {product?.review?.map((review, index) => {
                            return (
                                <Review>
                                    <Comment>{review?.comment}</Comment>
                                    <User>~{review?.userId?.userName}</User>
                                    <ReactStars
                                        count={5}
                                        size={15}
                                        isHalf='true'
                                        activeColor="#ffd700"
                                        value={review.rating}
                                        edit={false}
                                    />
                                </Review>
                            )
                        })}
                    </>
                    :
                    <h4>There are no reviews yet</h4>
                }
            </ReviewList>
        </Center>
    )
}

export default ProductDetais