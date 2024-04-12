import React, { useEffect, useState } from 'react'
import { Axios } from '../utils/api'
import { useNavigate } from 'react-router-dom'

function UserForm({ method, url, user }) {
    const [input, setInput] = useState(user)
    const navigate = useNavigate()
    useEffect(() => {
        setInput(user)

    }, [user])
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Axios[method](`${url}`, { ...input })
            setTimeout(() => {
                navigate('/users')
            }, 1000)

        } catch (err) {
            console.log(err)
        }

    }
    console.log(input)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label >User Name</label>
                <input required name='userName' defaultValue={input?.userName} type="text" placeholder="Full Name"
                    onChange={handleChange}
                />

                <label >Email</label>
                <input required name='email' defaultValue={input?.email} type="email" placeholder="Email" onChange={handleChange} />
                {!user && <>
                    <label >Password</label>
                    <input required name='password' defaultValue={input?.password} type="passowrd" placeholder="passowrd" onChange={handleChange} />
                </>

                }
                <label >Phone</label>

                <input required name='phone' defaultValue={input?.phone} type="text" placeholder="Phone  number" onChange={handleChange} />

                <label >Admin</label>
                <select name='isAdmin' value={input?.isAdmin} onChange={handleChange}>
                    <option value={false}>False</option>
                    <option value={true}>True</option>

                </select>
                <label >Address</label>


                <textarea name="address" defaultValue={input?.address} cols="5" rows="2" placeholder='full address' onChange={handleChange}></textarea>
                <button type='submit' className='btn-primary'>save</button>
            </form>
        </div>
    )
}

export default UserForm