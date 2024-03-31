import Header from "../Components/Header";
import styled from "styled-components";
import Center from "../Components/Center";
import Button from "../Components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, resetCart } from '../store/store'
import axios from "axios";
import Table from "../Components/Table";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: .81rem;
  
`;

const ProductImageBox = styled.div`
  width: 100%;
  height: 100px;
  padding: 2px;
  // border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;
const TD = styled.div`
display: flex;
flex-direction: row;
allign-items: center;
text-align: center;
`
const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

export default function CartPage() {
  const { auth, counter: { cart: cart } } = useSelector(state => state)
  const dispatch = useDispatch();
  const [products, setProducts] = useState(cart);
  const [billData, setBillData] = useState({})
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setProducts(cart)
  }, [cart])

  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value })
  }
  function moreOfThisProduct(id) {
    dispatch(incrementQuantity(id));
  }
  function lessOfThisProduct(id) {
    dispatch(decrementQuantity(id));
  }
  const goToPayment = async () => {
    try {
      const response = axios.post(`http://localhost:8800/api/orders`, {
        ...billData,
        products: products.map(product => ({ product: product._id, quantity: product.quantity })),
        userId: auth.user._id,
        totalPrice: total
      })
      setIsSuccess(true)
      console.log(response)
      if (response) {
        dispatch(resetCart())
        setTimeout(() => {
          navigate('/')
        }, 10000)
      };
    } catch (error) {
      console.log(error)
    }


  }
  let total = 0;
  for (const productId of cart) {
    const price = productId.price * productId.quantity;
    total += price;
  }

  if (isSuccess) {
    return (
      <>

        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cart?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.name}
                      </ProductInfoCell>
                      <td>
                        <TD>
                          <Button
                            onClick={() => moreOfThisProduct(product)}>+</Button>
                          <QuantityLabel>
                            {product.quantity}
                          </QuantityLabel>
                          <Button
                            onClick={() => lessOfThisProduct(product)}>-</Button>
                        </TD>
                      </td>
                      <td>
                        ${product.price * product.quantity}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total Price</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cart?.length && (
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                placeholder="Name"
                value={billData?.name}
                name="name"
                onChange={handleChange} />
              <Input type="text"
                placeholder="Email"
                value={billData?.email}
                name="email"
                onChange={handleChange} />
              <CityHolder>
                <Input type="text"
                  placeholder="City"
                  value={billData?.city}
                  name="city"
                  onChange={handleChange} />
                <Input type="text"
                  placeholder="Postal Code"
                  value={billData?.postalCode}
                  name="postalCode"
                  onChange={handleChange} />
              </CityHolder>
              <Input type="text"
                placeholder="Street Address"
                value={billData?.streetAddress}
                name="streetAddress"
                onChange={handleChange} />
              <Input type="text"
                placeholder="Country"
                value={billData?.country}
                name="country"
                onChange={handleChange} />
              <Button black block
                onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}