import React from 'react'
import UserForm from '../components /UserForm'
function NewUser() {
    return (
        <div>NewUser
            <UserForm method='post' url="auth/register" />
        </div>
    )
}

export default NewUser