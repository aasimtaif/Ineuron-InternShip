import React, { useEffect, useState } from 'react'
import UserForm from '../components /UserForm'
import { useParams } from 'react-router-dom'
import {Axios} from '../utils/api'
function EditUser() {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`users/${id}`)
                setUser(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div>EditUser
            <UserForm method='put' url={`users/${id}`} user={user} />
        </div>
    )
}

export default EditUser