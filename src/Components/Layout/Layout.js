import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import { GlobalContext } from "../../../src/Utils/Context";
import { getRequest } from "../../Utils/APIUtils";

const API_KEY = "AIzaSyDYub39l5rplWuw4NHCAwDcaOErMXiU56I";

function Layout() {

    const storedEmail = sessionStorage.getItem('email');
    const storedToken = JSON.parse(sessionStorage.getItem('idToken'));
    const storedExpire = JSON.parse(sessionStorage.getItem('expiresIn'));
    const storedRegistered = JSON.parse(localStorage.getItem('registered'));
    const storedRefreshToken = JSON.parse(sessionStorage.getItem('refreshToken'));
    const storedLogActiveState = JSON.parse(localStorage.getItem('logActiveState'));
    const storedProfileActiveState = JSON.parse(localStorage.getItem('profileActiveState'));

    const [email, setEmail] = useState(storedEmail);
    const [idToken, setIdToken] = useState(storedToken);
    const [registered, setRegistered] = useState(storedRegistered);
    const [expiresIn, setExpiresIn] = useState(storedExpire);
    const [refreshToken, setRefreshToken] = useState(storedRefreshToken);
    const [isRegistered, setIsRegistered] = useState(false);
    const [logActiveState, setLogActiveState] = useState(storedLogActiveState)
    const [profileActiveState, setProfileActiveState] = useState(storedProfileActiveState)

    const auth = {
        email,
        idToken,
        registered,
        isRegistered,
        expiresIn,
        refreshToken,
        signin: async (email, password) => {
            const resp = await getRequest(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, 'POST', {
                "email": email,
                "password": password,
                "returnSecureToken": true
            });

            console.log(resp.data)
            if (resp.status === 200) {
                setEmail(resp.data.email);
                setIdToken(resp.data.idToken);
                setRegistered(resp.data.registered);
                setExpiresIn(resp.data.expiresIn);
                setRefreshToken(resp.data.refreshToken);
                setIsRegistered(true)
                //console.log(isRegistered)
                sessionStorage.setItem('email', resp.data.email)
                sessionStorage.setItem('idToken', JSON.stringify(resp.data.idToken))
                sessionStorage.setItem('expiresIn', JSON.stringify(resp.data.expiresIn))
                localStorage.setItem('registered', JSON.stringify(resp.data.registered))
                sessionStorage.setItem('refreshToken', JSON.stringify(resp.data.refreshToken))


                // console.log(resp.data.idToken)
                // console.log(resp.data.registered)
                // console.log(resp.data.expiresIn)
            }
            return resp
        },
        signup: async (email, password) => {
            const resp = await getRequest(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, 'POST', {
                "email": email,
                "password": password,
                "returnSecureToken": true
            });

            console.log(resp.data)
            if (resp.status === 200) {
                setEmail(resp.data.email);
                setIdToken(resp.data.idToken);
                setExpiresIn(resp.data.expiresIn);
                setRefreshToken(resp.data.refreshToken);
                setRegistered(false);
                setIsRegistered(false);
                sessionStorage.setItem('email', resp.data.email)
                sessionStorage.setItem('idToken', JSON.stringify(resp.data.idToken))
                sessionStorage.setItem('expiresIn', JSON.stringify(resp.data.expiresIn))
                sessionStorage.setItem('refreshToken', JSON.stringify(resp.data.refreshToken))

            }

            return resp
        }
        ,
        logout: () => {
            setEmail("");
            setIdToken("");
            setExpiresIn("");
            setRegistered(false);
            setRefreshToken("");
            //localStorage.clear();
            sessionStorage.clear();
        }
    }
    const changePassowrd = {
        email,
        idToken,
        expiresIn,
        refreshToken,
        profileActiveState,
        logActiveState,
        newPassword: async (idToken, password) => {
            const resp = await getRequest(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, 'POST', {
                "idToken": idToken,
                "password": password,
                "returnSecureToken": true
            });

            console.log(resp.data)
            if (resp.status === 200) {
                setEmail(resp.data.email);
                setIdToken(resp.data.idToken);
                setExpiresIn(resp.data.expiresIn);
                setRegistered(false);
                setRefreshToken(resp.data.refreshToken);
                setLogActiveState(true);
                setProfileActiveState(false);
                sessionStorage.setItem('email', resp.data.email)
                sessionStorage.setItem('idToken', JSON.stringify(resp.data.idToken))
                sessionStorage.setItem('expiresIn', JSON.stringify(resp.data.expiresIn))
                sessionStorage.setItem('refreshToken', JSON.stringify(resp.data.refreshToken))
                localStorage.setItem('logActiveState', JSON.stringify(true))
                localStorage.setItem('profileActiveState', JSON.stringify(false))

            }


            return resp
        }

    }

    return (
        <GlobalContext.Provider value={{ auth, changePassowrd }}>
            <div className="App">
                <NavBar />
                <Outlet />
            </div>
        </GlobalContext.Provider >
        
    )
}
export default Layout;