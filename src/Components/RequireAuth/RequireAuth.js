import React, { useContext } from "react";
import { GlobalContext } from "../../Utils/Context.js";
import { Navigate } from 'react-router-dom';

function RequireAuth(props) {
    const auth = useContext(GlobalContext).auth;
    console.log(auth);
    console.log("in require")

    return (
        <div>
            {auth.registered ?
                props.children
                :
                <Navigate to="/login" />

            }
        </div>
    )

}
export default RequireAuth;