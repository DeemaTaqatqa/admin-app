import React, { useState } from "react";
import { useContext } from 'react';
import { GlobalContext } from "../../Utils/Context";
import { useNavigate } from 'react-router-dom';
import "./Login.scss"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("Login")
    const [createBtnLabel, setCreateBtnLabel] = useState("Create New Account")
    const [loginBtnLabel, setLoginBtnLabel] = useState("Login")
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const auth = useContext(GlobalContext).auth;
    //const isRegistered = auth.registered
    //console.log(isRegistered)

    const navigate = useNavigate();

    async function OnCreateClicked(e) {

        e.preventDefault();
        if (createBtnLabel === "Create New Account") {
            setTitle("Sign up")
            setLoginBtnLabel("Create Account")
            setCreateBtnLabel("Login with existing account")
            setEmail("")
            setPassword("")
            setError(false)
        }
        if (createBtnLabel === "Login with existing account") {
            setTitle("Login")
            setLoginBtnLabel("Login")
            setCreateBtnLabel("Create New Account")
            setEmail("")
            setPassword("")
            setError(false)

        }
    }

    async function OnLoginClicked(e) {
        e.preventDefault()

        if (loginBtnLabel === "Login") {
            const resp = await auth.signin(email, password)

            if (resp.status === 200) {

                navigate('/home')

            }
            else {
                const _errormessage =  resp.data.error.message.toLowerCase();
                const errormessage = _errormessage.replaceAll("_", " ")
                setError(true)
                setErrorMessage(errormessage)

            }
        }
        if (loginBtnLabel === "Create Account") {

            const resp = await auth.signup(email, password)
           
            if (resp.status === 200) {
                setTitle("Login")
                setLoginBtnLabel("Login")
                setCreateBtnLabel("Create New Account")
                setEmail("")
                setPassword("")
                setError(false)

            }
        
            else {
                const _errormessage = resp.data.error.message.toLowerCase();
                const errormessage = _errormessage.replaceAll("_", " ")
                setError(true)
                setErrorMessage(errormessage)

            }

        }
    }

    return (
        <div className="main-card col d-flex justify-content-center">
            <div className="card w-25">
                <div className="card-body">
                    <div className="card-title text-white text-center fw-semibold fs-5 mt-3">{title}</div>
                    <form onSubmit={OnLoginClicked}>
                        <div className="text-center">
                            <label
                                htmlFor="email"
                                className="form-label fw-semibold">Your Email</label>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input form-control " id="email"></input>
                        </div>
                        <div className="text-center mt-2">
                            <label
                                htmlFor="password"
                                className="form-label fw-semibold ">Your Password</label>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="password-input form-control" id="password"></input>
                        </div>
                        {error ?
                            <div className="error-message mt-2" >
                                *   {errorMessage}
                            </div>
                            : ""
                        }
                        <div className="col d-flex justify-content-center">
                            <button className="btn-enter btn text-white mt-4 w-50">{loginBtnLabel}</button>
                        </div>
                    </form>
                    <button className="btn-create btn col-md-12 text-center mt-2" onClick={OnCreateClicked}>{createBtnLabel}</button>


                </div>

            </div>

        </div>
    )
}
export default Login;