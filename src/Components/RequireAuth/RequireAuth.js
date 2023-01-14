import React from "react";
import { Navigate } from 'react-router-dom';

function RequireAuth(props) {
   
    const storedEmail = localStorage.getItem('email');
    
    
    return (
        <div>
            {storedEmail ?
                props.children
                :
                <Navigate to="/login" />

            }
        </div>
    )

}
export default RequireAuth;