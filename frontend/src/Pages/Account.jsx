import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Axios } from '../utils/api'
import { useParams } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Box = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 10px;
`
const Form = styled.form`
display: flex;
width: 90%;
flex-direction: column;
justify-content: center;
align-items: left;
gap: 10px;
`
const TextArea = styled.textarea`
width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
color: #333;
font-weight: 350;
`
const Label = styled.label`
font-weight: 500;
display: flex;
flex-direction: column;
color: #333;
margin-bottom: 5px;
`
const ButtonDiv = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
gap: 5px;
`
const OrdersContainer = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
align-items:center;
justify-content:center;
width: 100%;

`
const OrderList = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
width: 100%;

@media screen and (max-width:880px) {
    grid-template-columns: repeat(2, 1fr); /* Display 2 items per row on tablets */
}
@media screen and (max-width:880px) {
  grid-template-columns: repeat(2, 1fr); /* Display 2 items per row on tablets */
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr; /* Display 1 item per row on mobile */
}
`

const Title = styled.h2`
font-size: 1.5rem;
font-weight: 500;
color: #333;
`
const OrderDiv = styled(Link)`
display: flex;
flex-direction: column;
padding: 10px;
gap: 5px;
cursor: pointer;
width: 100%;
background-color: #222;
color: #f5f0f0;
font-weight: 500;
font-size: 0.9rem;
border-radius: 5px;
`

const OrderProduct = styled.div`
display: flex;
flex-direction: row;
padding: 5px;
font-weight: 900;
font-size: 0.75rem;
border-bottom: 1px solid #f5f0f0;
padding-top: 5px;
justify-content: space-between;
width: 100%;
`
const ReviewContainer = styled.div`
display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
width: 100%;
@media screen and (max-width:880px) {
    grid-template-columns: repeat(2, 1fr); /* Display 2 items per row on tablets */
}
@media screen and (max-width:880px) {
  grid-template-columns: repeat(2, 1fr); /* Display 2 items per row on tablets */
}
@media screen and (max-width: 576px) {
  grid-template-columns: 1fr; /* Display 1 item per row on mobile */
}
`

function Account() {
  const { user } = useSelector(state => state.auth)
  const [input, setInput] = useState(user)
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders()
  }, [])
  console.log(orders)
  const fetchOrders = async () => {
    try {
      const response = await Axios.get(`orders/${id}`)
      setOrders(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

  }
  const handleDismiss = () => {
    setInput(user);
  }

  if (!user?._id) return navigate('/login')
  console.log(input)
  return (
    <Box>
      <Form>
        <Label>User Name
          <Input value={input?.userName} name="userName" required onChange={handleChange} />
        </Label>
        <Label>
          Email
          <Input value={input?.email} required name="email" onChange={handleChange} />
        </Label>
        <Label>
          Address
          <TextArea value={input?.address}
            name="address" required onChange={handleChange}
          ></TextArea>
        </Label>
        <Label>
          Phone
          <Input value={input?.phone} name="phone" required onChange={handleChange} />
        </Label>
        {Object.keys(user).some(key => user[key] !== input[key]) && (
          <ButtonDiv>
            <Button black block type="submit">Save</Button>
            <Button red={true} block type="button" onClick={handleDismiss}>dismiss</Button>
          </ButtonDiv>

        )}
      </Form>
      {orders.length > 0 &&
        <OrdersContainer>
          <Title>
            Orders
          </Title>
          <OrderList>
            {orders.map(order => (
              <OrderDiv key={order._id} to={`/order/${order._id}`}>
                <h3>Order ID: {order._id}</h3>
                <p>Order Date: {new Date(order.createdAt).toDateString()}</p>
                {order.products.map(product => (
                  <OrderProduct key={product._id}>
                    <p> {product.product.name}</p>
                    <p>{product?.quantity} X ${product.product.price}</p>
                  </OrderProduct>

                ))}
                <p>Order Total: ${order.totalPrice}</p>
              </OrderDiv>
            ))}
          </OrderList>
        </OrdersContainer>
      }
      <ReviewContainer>

      </ReviewContainer>
    </Box>
  )
}

export default Account;