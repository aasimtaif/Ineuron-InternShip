import styled from "styled-components";
import Center from "../Components/Center";
import Button from "../Components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity, resetCart } from '../store/store'
import Table from "../Components/Table";
import Input from "../Components/Input";
import { load } from '@cashfreepayments/cashfree-js'
import { Axios } from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const ColumnsWrapper = styled.div`
  display: grid;
    grid-template-columns: 1fr;
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

const notify = (message) => toast.error(message);

export default function CartPage() {
  const { auth: { user }, counter: { cart: cart } } = useSelector(state => state)
  const dispatch = useDispatch();
  const [products, setProducts] = useState(cart);
  const [billData, setBillData] = useState({
    userId: user._id,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    streetAddress: user.address
  })
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();


  let cashfree;

  let insitialzeSDK = async function () {

    cashfree = await load({
      mode: "sandbox",
    })
  }

  insitialzeSDK()

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
  let total = 0;
  for (const productId of cart) {
    const price = productId.price * productId.quantity;
    total += price;
  }

  const getSessionId = async () => {
    try {
      let res = await Axios.post("payments/checkout", {
        email: billData.email,
        name: billData.userName,
        phone: billData.phone,
        userId: billData.userId,
        total: total
      })

      if (res.data && res.data.payment_session_id) {
        return { sessionId: res.data.payment_session_id, orderId: res.data.order_id }
      }
    } catch (error) {
      console.log(error.response)
      notify(error.response.data.message)
    }
  }
  const verifyPayment = async (orderId) => {
    console.log(orderId)
    try {

      let res = await Axios.post("payments/verification", {
        ...billData,
        products: products.map(product => ({ product: product._id, quantity: product.quantity })),
        totalPrice: total,
        orderId: orderId,
      })

      if (res && res.data) {
        setIsSuccess(true)
        setBillData()
        dispatch(resetCart())
        setTimeout(() => {
          navigate('/')
        }, 5000)
      }

    } catch (error) {
      console.log(error.response.data)
    }
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {

      let { sessionId, orderId } = await getSessionId()
      console.log(sessionId)
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      }

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("payment initialized", orderId)
        verifyPayment(orderId)
      })


    } catch (error) {
      console.log(error)
      notify(error.response.data.message)
    }

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
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
          {!!cart?.length && user._id && (
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                placeholder="userName"
                value={billData?.userName}
                name="name"
                onChange={handleChange} />
              <Input type="text"
                placeholder="Email"
                value={billData?.email}
                name="email"
                onChange={handleChange} />
              <Input type="text"
                placeholder="Phone number"
                value={billData?.phone}
                name="phone"
                onChange={handleChange} />
              <CityHolder>
                <Input type="text"
                  placeholder="Country"
                  value={billData?.country}
                  name="country"
                  onChange={handleChange} />
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
              <Button black block
                onClick={handleClick}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}