import React, { useContext } from 'react'
import { GlobalContext } from '../../Utils/Context'
import { Navigate } from 'react-router-dom';

function IsUnAuth(props) {
    const auth = useContext(GlobalContext).auth;

    return (
        auth.email ?
            <Navigate to="/" />
            :
            props.children
    )

}


export default IsUnAuth;