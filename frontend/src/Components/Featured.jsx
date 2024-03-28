import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CheckIcon from "./icons/CheckIcon";
import CartIcon from "./icons/CartIcon";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/store'
import AddSubButton from "./AddSubButton";
const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

export default function Featured({ product }) {
  const { cart } = useSelector(state => state.counter)
  const dispatch = useDispatch()
  const cartProduct = cart?.find(({ _id }) => _id === product?._id)
  console.log(cart)
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.name}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  to={'/product/' + product?._id}
                  outline={1} white={1}>Read more</ButtonLink>
                {cartProduct ?
                  <>
                    <AddSubButton white product={product} />
                  </>
                  :
                  <Button white
                    onClick={() => { dispatch(incrementQuantity(product)) }}
                  >

                    <CartIcon />
                    Add to cart
                  </Button>

                }

              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product?.images[0]} alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>

    </Bg>
  );
}