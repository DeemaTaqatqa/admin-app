import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../../Utils/Context";
import "./Profile.scss";

function Profile() {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const auth = useContext(GlobalContext).auth;
    const idToken = auth.idToken;
    const changePassowrd = useContext(GlobalContext).changePassowrd;
    const navigate = useNavigate();
    

    async function onChangeClicked(e) {
        
        const resp = await changePassowrd.newPassword(idToken, newPassword)
        if (resp.status === 200) {
            auth.logout();
            navigate('/login')
        }
        else {
            const _errormessage = resp.data.error.message.toLowerCase();
            const errormessage = _errormessage.replaceAll("_", " ")
            setError(true)
            setErrorMessage(errormessage)


        }

    }
    return (
        <div>
            <div className="profile-username text-center fw-semibold mt-5">Your User Profile </div>
            <form>
                <div className="text-center mt-5">
                    <label htmlFor="password" className="profile-label form-label fw-semibold ">New Password</label>
                    <div className="col d-flex justify-content-center">
                        <input type="password" onChange={(e) => setNewPassword(e.target.value)} className="profile-input form-control input-sm " id="password" required></input>
                    </div>
                    {error ?
                        <div className="error-message mt-2" >
                            *   {errorMessage}
                        </div>
                        : ""
                    }
                </div>
            </form>
            <div className="col d-flex justify-content-center">
                <button className="profile-btn-change btn  mt-4" onClick={onChangeClicked}>Change Password</button>
            </div>
        </div>
    )
}
export default Profile;