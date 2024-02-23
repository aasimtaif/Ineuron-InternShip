import React from 'react'
import {
    Select,
    Input,
    HStack,
    Grid,
    Text,
    GridItem

} from '@chakra-ui/react'
function FilterComponent({ categories, filter, setFilter }) {
    const setPriceRange = (event) => {
        const { name, value } = event.target
        setFilter({ ...filter, [name]: value })
    }
    return (
        <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={6} >
            <GridItem>
                <HStack>

                    <Text>
                        Category:
                    </Text>
                    <Select onChange={(e) => {
                        setFilter({ ...filter, selectedCategory: e.target.value })
                    }}>
                        <option value=''>ALL </option>

                        {categories.map((category, index) => {
                            return <option key={index} value={category}>{category}</option>
                        })}
                    </Select>
                </HStack>
            </GridItem>
            <HStack spacing='10px'>
                <Text>Range:</Text>
                <Input type='number' name='minPrice' placeholder='min price' onChange={setPriceRange} />
                <Input type='number' name="maxPrice" placeholder='max price' onChange={setPriceRange} />
            </HStack >

        </Grid  >
    )
}

export default FilterComponent