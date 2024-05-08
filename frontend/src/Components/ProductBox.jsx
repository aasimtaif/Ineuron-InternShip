import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/store'
import DeleteIcon from "./icons/DeleteIcon";
const ProductWrapper = styled.div`
  border-right: 2px solid #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: 500;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:600;
  text-align: left;
  
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

const CartDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2rem;  
`

function ProductBox({ product }) {
  const quantity = useSelector(state => state.counter.cart?.find(({ _id }) => _id === product?._id)?.quantity)
  const dispatch = useDispatch()

  const addProductToCart = () => {
  
    dispatch(incrementQuantity(product))
  }
  // console.log(product)
  const url = '/product/' + product._id;
  return (
    <ProductWrapper>
      <WhiteBox to={url}>
        <div>
          <img src={product?.images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title to={url}>{product?.name}</Title>
        <PriceRow>
          <Price>
            ₹{product?.price}
          </Price>

          {quantity ? <CartDiv>
            <CartIcon /> {quantity} 

          </CartDiv> :
            <Button block
              onClick={addProductToCart}
              primary outline >
              Add to cart
            </Button>}

        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

export default ProductBox