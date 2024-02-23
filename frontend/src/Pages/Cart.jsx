import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Center,
  Button,
  Heading,
  VStack,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
} from '@chakra-ui/react'
import CartItem from '../Components/CartItem'
import { resetCart } from '../store/store'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const cart = useSelector((state) => state.counter.cart)
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({});

  if (cart.length == 0) {
    return (
      <Center>
        <Heading mt="5rem">cart is empty</Heading>
      </Center>
    )
  }
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    toast({
      title: 'Order Placed.',
      description: "You have successfully placed the order.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    setTimeout(() => {
      dispatch(resetCart())
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }, 2000)
  }

  return (
    <Box >
      {cart.map((item) => {
        return (
          <CartItem key={item.id} item={item} />
        )
      })}
      <Box w={{lg:"50%",sm:'100%'}} m="auto" p="1rem">
        <form onSubmit={handlePlaceOrder}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Full name"
              size="md"
              onChange={event => setFormInput({ ...formInput, name: event.currentTarget.value })}
            />
            <FormLabel>Address</FormLabel>
            < Textarea
              type="password"
              placeholder="Full Address"
              size="md"
              onChange={event => setFormInput({ ...formInput, address: event.currentTarget.value })}
            />
            <FormLabel>Card Number</FormLabel>
            <Input
              type="Number"
              placeholder="6534XXXXXX"
              size="md"
              onChange={event => setFormInput({ ...formInput, name: event.currentTarget.value })}
            />
            <HStack>
              <FormLabel>
                Expire Date
              </FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
              />
              <Input
                placeholder="CVV"
                size="md"
                type="number"
              />
            </HStack>
          </FormControl>
          <VStack>
            <Text p="1rem" fontSize="lg" w="full" as='b'>
              Total Price :$ {
                cart.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.price), 0)
              }
            </Text>
            <Button colorScheme='teal' w="full" variant='solid' size='md' onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </VStack>
        </form>
      </Box>
    </Box >
  )
}

export default Cart