import React, { useContext } from "react";
import { GlobalContext } from "../../Utils/Context";
import { Navigate, useLocation } from 'react-router-dom';

function IsUnAuth(props) {
    const auth = useContext(GlobalContext).auth;
    const location = useLocation();

    return (
        auth.email ?
            <Navigate to={location.state.fullPath} />
            :
            props.children
    )

}
export default IsUnAuth;