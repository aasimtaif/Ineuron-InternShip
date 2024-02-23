import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Text,
    Button,
    ButtonGroup,
    Grid
} from '@chakra-ui/react'
import { MdOutlineAdd, MdRemove } from "react-icons/md";
import { incremenQuantity, decrementQuantity } from '../store/store'
import { useDispatch } from 'react-redux';

function CartItem({ item }) {
    const dispatch = useDispatch()
    console.log(item)

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            w={{ lg: '70%' }} m="auto" mb="2rem" mt="2rem"
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={item.images[0]}
                alt='Caffe Latte'
            />
            <Stack>
                <CardBody>
                    <Heading size='md'>{item.title}</Heading>
                    <Text py='2'>
                        {item.description}
                    </Text>
                    <Text color='blue.600' fontSize='sm'>
                            Quantity:{item?.quantity}
                        </Text>

                </CardBody>
                <CardFooter>
                    <ButtonGroup>
                        <Grid w="full" templateColumns='repeat(2, 1fr)' gap={5}>
                            <Button variant='outline' colorScheme='purple' size='sm' onClick={() => dispatch(incremenQuantity(item))}>
                                <MdOutlineAdd />
                            </Button>
                            <Button variant='outline' colorScheme='red' size='sm' onClick={() => dispatch(decrementQuantity(item))}>
                                <MdRemove />
                            </Button>
                        </Grid>
                    </ButtonGroup>
                    <Text fontSize='md' as='b' py='2' ml='auto'>
                        Total: ${item.price * item.quantity}
                    </Text>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default CartItem