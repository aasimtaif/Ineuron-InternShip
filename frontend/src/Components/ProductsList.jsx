import React, { useState, useEffect } from 'react'
import CardProducts from './CardProducts'
import {
    Grid,
    Center,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading

} from '@chakra-ui/react'
import axios from 'axios'
import FilterComponent from './FilterComponent'

function ProductsList() {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({ selectedCategory: '', minPrice: 0, maxPrice: Number.MAX_VALUE })
    const categories = [...products].map((item, inddex) => { return item.category }).filter((v, i, self) => { return i == self.indexOf(v) })
    console.log(filter)
    useEffect(() => {
        (async () => {
            const response = await axios.get('https://dummyjson.com/products?limit=25')
            setProducts(response.data.products)
        })();
    }, [])

    return (
        <>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='center'>
                                <Heading size='md'>
                                    Filter Products
                                </Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <FilterComponent categories={categories} filter={filter} setFilter={setFilter} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Grid
                templateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', sm: 'repeat(1, 1fr)', }}
                gap={10}
                sx={{ p: '2rem' }}
            >
                {products.filter((product) => {
                    return product.category.includes(filter.selectedCategory) && (product.price > filter.minPrice && product.price < filter.maxPrice)
                }
                ).map((product) => {
                    return (
                        <React.Fragment key={product.id}>
                            <Center>
                                <CardProducts product={product} />
                            </Center>
                        </React.Fragment>
                    )
                })}
            </Grid>

        </>
    )
}

export default ProductsList