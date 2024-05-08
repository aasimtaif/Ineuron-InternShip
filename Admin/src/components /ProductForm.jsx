import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../utils/api';
import { Rings } from 'react-loader-spinner';
function ProductForm({ method, url, product, images: productImages, propertyName
    , propertyValue }) {
    const [input, setInput] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([]);
    const [categoryList, setCategoryList] = useState()
    const [searchCategory, setSearchCategory] = useState('')
    const [propertyFieldNames, setPropertyFieldNames] = useState(propertyName || []);
    const [propertyFieldValues, setPropertyFieldValues] = useState(propertyValue || [])
    const [showList, setShowList] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {
        if (product) {
            findCategory()
        }
    }, [])
    const findCategory = () => {
        Axios.get(`categories/find/${product.category}`).then((response) => {
            setSearchCategory(response.data.name)

        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        let debounceTimer;
        const delay = 400; // Adjust debounce delay as needed
        if (searchCategory) {
            debounceTimer = setTimeout(async () => {
                try {
                    const response = await Axios.get(`categories/search?name=${searchCategory}`);
                    setCategoryList(response.data);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }, delay);
        }

        return () => clearTimeout(debounceTimer);
    }, [searchCategory]);

    // console.log(categoryList)

    useEffect(() => {
        setInput({ name: product?.name, description: product?.description, price: product?.price, category: product?.category })
        setImages(productImages)

    }, [product])

    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const uploadImages = async (e) => {
        const file = e.target.files[0];
        setIsLoading(true)
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dndmxaxc8/image/upload",
                data
            );

            const { url } = uploadRes.data;
            if (images) {
                setImages([...images, url]);
            } else setImages([url])


        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios[method](`${url}`, {
                ...input, images, properties: {
                    ...propertyFieldNames.reduce((acc, item, index) => {
                        return { ...acc, [item]: propertyFieldValues[index] }
                    }, {})
                }
            })
            if (response.status === 200) navigate('/products')

        } catch (err) {
            console.log(err)
        }

    }
    function updateImagesOrder(images) {
        setImages(images);
    }
    const handleDeleteImage = async (e, imageUrl) => {
        e.preventDefault()
        setImages(images.filter((img) => img !== imageUrl));
        // console.log(imageUrl)
        try {
            const response = await Axios.delete(`products/image/${product._id}`,
                { data: { imageUrl, images } })
            // console.log(response)
        } catch (err) {
            console.log(err)
        }

    }
    const addProperties = () => {
        setPropertyFieldNames([...propertyFieldNames, ''])
        setPropertyFieldValues([...propertyFieldValues, ''])
    }

    const handlePropertyNameChange = (index, property, value) => {
        const newProperties = [...propertyFieldNames]
        newProperties[index] = value
        setPropertyFieldNames(newProperties)
    }
    const handlePropertyValuesChange = (index, property, value) => {
        const newProperties = [...propertyFieldValues]
        newProperties[index] = value
        setPropertyFieldValues(newProperties)
    }

    const removeProperty = (index) => {
        const newProperties = [...propertyFieldNames]
        const newValues = [...propertyFieldValues]
        newProperties.splice(index, 1)
        setPropertyFieldNames(newProperties)
        newValues.splice(index, 1)
        setPropertyFieldValues(newValues)

    }
    const handleCategorySelect = (category) => {
        // console.log(category)
        setInput({ ...input, category: category._id })
        setSearchCategory(category.name)
        setCategoryList([])
        setShowList(false)
        // if (propertyFieldNames.length === 0 && propertyFieldValues.length === 0) {
        AssignProperties(category.properties, category._id)
        // }
    }

    const AssignProperties = (properties, id) => {
        const names = properties.map(obj => obj.name)
            .filter(name => !propertyFieldNames.includes(name));
        const values = []
        names.forEach(() => {
            values.push('')
        })
        // console.log(names, values)
        
        setPropertyFieldNames([...propertyName, ...names])
        setPropertyFieldValues([...propertyValue, ...values])
    }
    // console.log(propertyFieldNames, propertyFieldValues)
    const handleCategoryUpload = async () => {
        try {
            const response = await Axios.post('categories', { name: searchCategory })
            // console.log(response)
            setSearchCategory(response.data.name)
            setCategoryList([])
            setShowList(false)
            setInput({ ...input, category: response.data._id })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label >Product Name</label>
                <input required name='name' value={input?.name} type="text" placeholder="Product name"
                    onChange={handleChange}
                />
                <label >Category</label>
                <div id="dropdownSearch" class="z-0 w-100  mb-5 rounde-lg">
                    <div class="flex gap-2 flex-row justify-center">
                        <input value={searchCategory} name='category' className='flex-3' onChange={(event) => {
                            setSearchCategory(event.target.value)
                            setCategoryList([])
                            setShowList(true)

                        }} />
                        {categoryList?.length === 0 && showList && <button className='flex-1 btn-primary h-10'
                            onClick={handleCategoryUpload}
                            type='button'
                        >+</button>}
                    </div>
                    <ul class="  overflow-y-auto text-sm shadow-xl  ">
                        {categoryList?.length > 0 && showList && categoryList.map(category => (
                            <li className='border-b border-slate-400/50 rounded-sm'>
                                <div class="flex items-center  rounded hover:bg-gray-300  ">
                                    <label class="w-full pl-2 m-2 text-sm font-medium text-neutral-600  "
                                        onClick={() => {
                                            handleCategorySelect(category)
                                        }}
                                    >{category.name}</label>
                                </div>
                            </li>
                        ))}


                    </ul>

                </div>
                <>
                    <label className="block">Properties</label>
                    <button
                        onClick={addProperties}
                        type="button"
                        className="btn-default text-sm mb-2">
                        Add new property
                    </button>
                    {propertyFieldNames.length > 0 && propertyFieldValues.length > 0 && propertyFieldNames.map((property, index) => (
                        <div key={index} className="flex gap-1 mb-2">
                            <input type="text"
                                value={property}
                                className="mb-0"
                                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                                placeholder="property name (example: color)" autoFocus={true} />
                            <input type="text"
                                className="mb-0"
                                onChange={ev =>
                                    handlePropertyValuesChange(
                                        index,
                                        property, ev.target.value
                                    )}
                                value={propertyFieldValues[index]}
                                placeholder="Provide values" />
                            <button
                                onClick={() => removeProperty(index)}
                                type="button"
                                className="btn-red">
                                Remove
                            </button>
                        </div>
                    ))}
                </>

                <br />
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable
                        list={images}
                        className="flex flex-wrap gap-1"
                        setList={updateImagesOrder}>
                        {!!images?.length && images.map(link => (
                            <div key={link} className="w-25 h-24 group  bg-white p-4 shadow-sm rounded-sm border relative border-gray-200">
                                <img src={link} alt="" className="rounded-lg object-cover" />
                                <div class="absolute inset-0 backdrop-filter backdrop-blur-sm  bg-opacity-10 opacity-10 group-hover:opacity-100 hover:bg-gray-200  flex items-center justify-center transition-all">
                                    <button class="  text-white px-4 py-2 rounded-lg"
                                        onClick={(event) => { handleDeleteImage(event, link) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                    {isLoading ? <Rings
                        visible={true}
                        color="#4fa94d"
                        ariaLabel="rings-loading"
                    /> : <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Add image
                        </div>
                        <input type="file" onChange={uploadImages} className="hidden" />
                    </label>}
                </div>
                <label >Description</label>
                <textarea required name='description' value={input?.description} placeholder='Product description'
                className='w-full h-24 p-2 rounded-sm border border-gray-200 shadow-sm mb-2'
                    onChange={handleChange}
                ></textarea>
                <label >Price (in ₹) </label>
                <input required value={input?.price} name='price' type="number" placeholder="Price" onChange={handleChange} />
                <button type='submit' className='btn-primary'>save</button>
            </form>
        </div>
    )
}

export default ProductForm