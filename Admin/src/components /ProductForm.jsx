import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { useNavigate } from 'react-router-dom';
function ProductForm({ method, url, product, images: productImages }) {
    const [input, setInput] = useState({});
    const [images, setImages] = useState([]);
    const [categoryList, setCategoryList] = useState([])
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8800/api/categories`).then((response) => {
            setCategoryList(response.data)
            setProperties(product.properties)

        }).catch((err) => {
            console.log(err)
        })

    }, [])
    useEffect(() => {
        setInput({ name: product?.name, description: product?.description, price: product?.price, category: product?.category })
        setImages(productImages)
        setProperties(product?.properties)


    }, [product])
    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    const uploadImages = async (e) => {
        const file = e.target.files[0];
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

        console.log(images)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios[method](`http://localhost:8800/api/${url}`, { ...input, images, properties })
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
        console.log(imageUrl)
        try {
            const response = await axios.delete(`http://localhost:8800/api/products/image/${product._id}`,
                { data: { imageUrl, images } })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    function setProductProp(propName, value) {
        setProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        });
    }


    const propertiesToFill = [];
    if (categoryList.length > 0 && input.category) {
        let catInfo = categoryList.find(({ _id }) => _id === input.category);
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?._id) {
            const parentCat = categoryList.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }
    console.log(propertiesToFill)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label >Product Name</label>
                <input required name='name' value={input?.name} type="text" placeholder="Product name"
                    onChange={handleChange}
                />
                <label >Category</label>
                <select value={input?.category} name='category' onChange={handleChange}>
                    <option value={''}>None</option>
                    {categoryList.length > 0 && categoryList.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                {propertiesToFill.length > 0 && propertiesToFill?.map((p, index) => (
                    <div key={p.index} className="">
                        <label>{p?.name[0].toUpperCase() + p?.name.substring(1)}</label>
                        <div>
                            <select value={properties?.[p?.name]}
                                onChange={ev =>
                                    setProductProp(p?.name, ev.target.value)
                                }
                            >
                                <option value={''}>None</option>
                                {p?.values.map(v => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
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
                    <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Add image
                        </div>
                        <input type="file" onChange={uploadImages} className="hidden" />
                    </label>
                </div>
                <label >Description</label>
                <textarea required name='description' value={input?.description} placeholder='Product description'
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