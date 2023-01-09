import React, { useContext } from "react";
import { GlobalContext } from "../../Utils/Context";
import { Navigate } from 'react-router-dom';

function RequireAuth(props) {
    const auth = useContext(GlobalContext).auth;

    return (
        <div>
            {auth.email ?
                props.children
                :
                <Navigate to="/" />

            }
        </div>
    )

}
export default RequireAuth;