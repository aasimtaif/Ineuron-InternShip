import React from 'react'
import {
    Card,
    Text,
    Stack,
    CardBody,
    Heading,
    Button,
    Image,
    Grid,
    CardFooter,

} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { incremenQuantity, decrementQuantity } from '../store/store'
import { MdOutlineAdd, MdRemove } from "react-icons/md";


function CardProducts({ product }) {

    const dispatch = useDispatch()
    const cartItem = useSelector((state) => state.counter.cart.find((item) => item.id === product.id))
    // console.log(cartItem)
    return (
        <Card maxW='sm' boxShadow='xl'>
            <CardBody>
                {product.images?.length &&
                    <Image
                        src={product.images[0]}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg    '
                    />
                }
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.title} </Heading>
                    <Text fontSize='md'>
                        {product.description}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        ${product.price}
                    </Text>
                    {cartItem &&
                        <Text color='blue.600' fontSize='sm'>
                            Quantity:{cartItem?.quantity}
                        </Text>
                    }
                </Stack>
            </CardBody>
            <CardFooter>
                {!cartItem ?
                    <Button variant='solid' w="50%" colorScheme='purple' onClick={() => dispatch(incremenQuantity(product))}>
                        Add to cart
                    </Button>
                    : <Grid w="full" templateColumns='repeat(2, 1fr)' gap={5}>
                        <Button variant='outline' w="full" colorScheme='purple' size='md' onClick={() => dispatch(incremenQuantity(product))}>
                            <MdOutlineAdd />
                        </Button>
                        <Button variant='outline' colorScheme='purple' size='md' onClick={() => dispatch(decrementQuantity(product))}>
                            <MdRemove />
                        </Button>
                    </Grid>
                }
            </CardFooter>
        </Card>
    )
}

export default CardProducts