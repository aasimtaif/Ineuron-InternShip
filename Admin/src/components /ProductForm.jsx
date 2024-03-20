import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ProductForm({ method, url, product, images }) {
    const [input, setInput] = useState({ images: [] });
    const [files, setFiles] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        setInput({ name: product?.name, description: product?.description, price: product?.price, images: product?.images })
    }, [product])
    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dndmxaxc8/image/upload",
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const response = await axios[method](`http://localhost:8800/api/${url}`, { ...input, images: list })
            if (response.status === 200) navigate('/products')

        } catch (err) {
            console.log(err)
        }

    }
    const handleDeleteImage = async (e, imageUrl) => {
        e.preventDefault()
        console.log(imageUrl)
        try {
            const response = await axios.delete(`http://localhost:8800/api/products/image/${product.id}`,
                { data: { imageUrl,images } })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    // console.log()
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label >Product Name</label>
                <input required name='name' value={input?.name} type="text" placeholder="Product name"
                    onChange={handleChange}
                />
                <div className="mb-2 flex flex-wrap gap-2 flex-col">
                    <div className='grid lg:grid-cols-4  md:grid-cols-2  gap-1 '>
                        {images?.map((link, index) =>
                            <div class="w-fit relative group">
                                <img src={link} alt="" className="rounded-lg object-cover " />
                                <div class="absolute inset-0 backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center">
                                    <button class="bg-red-500 text-white px-4 py-2 rounded-lg"
                                        onClick={(event) => { handleDeleteImage(event, link) }}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-row gap-2'>
                        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-md bg-grey-900 shadow-sm border border-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <div>
                                Add image
                            </div>
                            <input multiple type="file" className="hidden" onChange={(e) => setFiles(e.target.files)} />
                        </label>
                        <div className='flex  justify-evenly  flex-col '>
                            {files && Object.values(files).map((file, index) => {
                                return <div key={index} className='flex gap-2 '>
                                    <div className='flex flex-col gap-1 text-xs'>
                                        <p>
                                            {file.name}
                                        </p>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
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